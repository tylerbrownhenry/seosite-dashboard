'use strict';

     var PasswordResetToken = require('../models/passwordResetToken'),
     async = require('async'),
     q = require('Q'),
     _ = require('underscore'),
     crypto = require('crypto'),
     User = require('../models/user'),
     utils = require('../utils'),
     secrets = require('../config/secrets');

// edit password

exports.postNewPassword = function (req, res, next) {
     req.assert('password', 'Password must be at least 6 characters long.').len(6);
     req.assert('confirm', 'Passwords must match.').equals(req.body.password);
     console.log('USER checking if uid exists-', req.user, req.body.password);

     var errors = req.validationErrors();

     if (errors) {
          req.flash('errors', errors);
          return res.redirect(req.redirect.failure);
     }
     utils.encrypt(req.body.password, function (err, hash) {
          if (err) {
               req.flash('errors', err);
               return res.redirect(req.redirect.failure);
          }
          console.log('HASH', hash);
          utils.findUserByUid(req.user.uid, function (err) {
               if (err) {
                    return next(err);
               }
               utils.updateUser({
                    uid: req.user.uid
               }, {
                    $PUT: {
                         password: hash
                    }
               }, function (err) {
                    if (err) {
                         return next(err);
                    }
                    req.flash('success', {
                         msg: 'Success! Your password has been changed.'
                    });
                    res.redirect(req.redirect.success);
               });
          });
     })
};

// show forgot password page

exports.getForgotPassword = function (req, res) {
     if (req.isAuthenticated()) {
          return res.redirect(req.redirect.auth);
     }
     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');

     if (formFlash.length) {
          form.email = formFlash[0].email;
     }
     if (errorFlash.length) {
          error = errorFlash[0];
     }
     console.log('form.email', form.email);
     res.render(req.render, {
          title: 'Forgot Password',
          form: form,
          error: error
     });
};

// post forgot password will create a random token,
// then sends an email with reset instructions

exports.postForgotPassword = function (req, res, next) {
     req.assert('email', 'Please enter a valid email address.').isEmail();

     var errors = req.validationErrors();

     if (errors) {
          req.flash('form', {
               email: req.body.email
          });
          req.flash('errors', errors);
          return res.redirect(req.redirect.failure);
     }

     async.waterfall([
          function (done) {
               crypto.randomBytes(16, function (err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
               });
          },
          function (token, done) {
               utils.findUser({
                    email: req.body.email.toLowerCase()
               }, function (err, user) {
                    if (!user || !user[0]) {
                         req.flash('form', {
                              email: req.body.email
                         });
                         req.flash('error', 'No account with that email address exists.');
                         return res.redirect(req.redirect.failure);
                    }
                    console.log('UPDATE', user[0]);
                    user = user[0];
                    utils.savePasswordResetToken({
                         uid: user.uid,
                         token: token,
                         expires: Date.now() + 3600000
                    }, function (err) {
                         done(err, token, user);
                    });
               });
          },
          function (token, user, done, e) {
               var title = "Password Reset";
               var text = 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.<br><br>' +
                    'Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
                    'http://' + req.headers.host + '/reset/' + token + '/' + user.uid + '<br><br>' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.';

                    console.log('utils',_.keys(utils));
               utils.sendEmail(title,text,user.email,'Reset your password on MySeoDr.com',function (err) {
                    req.flash('info', {
                         msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' + 'http://' + req.headers.host + '/reset/' + token + '/' + user.uid
                    });
                    done(err, 'done');
               });
          }
     ], function (err) {
          if (err) {
               return next(err);
          }
          res.redirect(req.redirect.success);
     });
};

exports.getToken = function (req, res) {
     if (req.isAuthenticated()) {
         console.log('heya!');
          return res.redirect(req.redirect.failure);
     }
     var form = {},
          error = null,
          formFlash = req.flash('form'),
          errorFlash = req.flash('error');

     if (formFlash.length) {
          form.email = formFlash[0].email;
     }
     if (errorFlash.length) {
          error = errorFlash[0];
     }
     console.log('1 getToken',req.params.token);
     utils.findPasswordResetToken(req.params.token, function (err, response) {
          console.log('log',((response.uid !== req.params.uid ) || (Date.now() > response.expires)));
          console.log('Date.now()', Date.now(),response.uid !== req.params.uid,response,response.uid, response.expires,req.params.uid,Date.now() > response.expires);
          console.log(!response);
          console.log(!response || response && ((response.uid !== req.params.uid ) || (Date.now() > response.expires)));
          console.log(response && ((response.uid !== req.params.uid ) || (Date.now() > response.expires)));
          console.log(((response.uid !== req.params.uid ) || (Date.now() > response.expires)));
          if (typeof response === 'undefined' || (response.uid !== req.params.uid ) || (Date.now() > response.expires)) {
            console.log('WHY?')
               if (response) {
                    utils.deleteItem(PasswordResetToken, {
                         token: req.params.token
                    });
               }
               req.flash('error', 'Password reset token is invalid or has expired.');
               return res.redirect(req.redirect.failure);
          }
            // error = "Password reset!";
          // }
          res.render(req.render, {
               title: 'Password Reset',
               token: req.params.token,
               uid: req.params.uid,
               form: form,
               error: error
          });
     });
};

exports.postToken = function (req, res, next) {
     req.assert('password', 'Password must be at least 6 characters long.').len(6);
     req.assert('confirm', 'Passwords must match.').equals(req.body.password);

     var errors = req.validationErrors();

     if (errors) {
          req.flash('errors', errors);
          return res.redirect(req.redirect.failure);
     }
     console.log('req', req);
     async.waterfall([
               function (done) {
                 console.log('2 getToken',req.params.token);

                    utils.findPasswordResetToken(req.params.token, function (err, response) {
                         console.log('1111 -- password-controller');
                          try{

                         if (!response || response && response.uid !== req.params.uid || Date.now() > response.expires) {
                           console.log('tes3t',response.expires, Date.now(),'response.uid !== req.params.uid',response.uid !== req.params.uid,response.uid,req.params.uid,Date.now() > response.expires);
                              req.flash('error', 'Password reset token is invalid or has expired.');
                              return res.redirect(req.redirect.failure);
                         }
                         if (response) {
                           console.log('test4');
                              utils.deleteItem(PasswordResetToken, {
                                   token: req.params.token
                              });
                         }
                       } catch (e) {
                         console.log('e',e);
                       }
                         console.log('test');
                         utils.findUserByUid(req.params.uid, function (err, user) {
                              console.log('2222- password-controller',err,'user',user);
                              if (!user) {
                                   req.flash('error', 'Password reset token is invalid or has expired.');
                                   return res.redirect(req.redirect.failure);
                              }
                              utils.encrypt(req.body.password, function (err, hash) {
                                   if (err) {
                                        req.flash('errors', err);
                                        return res.redirect(req.redirect.failure);
                                   }
                                   console.log('3333- password-controller');
                                   utils.updateUser({
                                             uid: req.params.uid
                                        }, {
                                             password: hash
                                        },
                                        function (err) {
                                          console.log('err',err);
                                             if (err) {
                                                  return next(err);
                                             }
                                             var time = 14 * 24 * 3600000;
                                             req.session.cookie.maxAge = time; //2 weeks
                                             req.session.cookie.expires = new Date(Date.now() + time);
                                             req.session.touch();

                                             req.logIn(user, function (err) {
                                                  done(err, user);
                                             });
                                        });
                              });
                         });
                    });
               },
               function (user, done) {
                 var title = "Your password has been changed";
                 var text = 'Hello,<br><br>' +
                      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.<br><br>';

                 utils.sendEmail(title,text,user.email,title,function (err) {
                      req.flash('success', {
                           msg: 'Success! Your password has been changed.'
                      });
                      done(err);
                 });

               }
          ],
          function (err) {
               if (err) {
                    return next(err);
               }
               res.redirect(req.redirect.success);
          });
};
