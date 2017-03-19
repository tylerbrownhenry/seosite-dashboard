var Activity = require('./../models/activity'),
     User = require('./../models/user'),
     utils = require('./../utils'),
     stripeActions = require('./../models/plugins/actions-stripe'),
     sh = require("shorthash"),
     secrets = require('../config/secrets'),
     createToken = require("./passport-create-token");

/**
 * wrapper for tasks to do in stripe when saving a user
 * @param  {Object}   user user object
 * @param  {Function} cb   callback function
 */
function _pre(user, cb) {
     stripeActions.preSave(secrets.stripeOptions, user, function (err, user) {
          if (err !== null) {
               console.log('handle this error')
          } else {
               cb(user)
          }
     })
}

/**
 * checks if a user exists with the input email if not then it creates the user
 * @param  {Object}   req      page request object
 * @param  {String}   email    an email address as a string
 * @param  {String}   password plain text password
 * @param  {Function} done     callback function
 * @return {Function}          callback
 */
function findOrCreateUser(req, email, password, done, console) {
     utils.findUser({
               email: req.body.email
          },
          function (err, existingUser) {
               console.log('existingUser', existingUser);
               if (existingUser && existingUser.uid) {
                    req.flash('form', {
                         email: req.body.email
                    });
                    return done(null, false, req.flash('error', 'An account with that email address already exists.'));
               }
               // edit this portion to accept other properties when creating a user.
               utils.encrypt(req.body.password, function (err, hash) {
                    console.log('hash', hash);
                    if (err) {
                         return done(null, false, req.flash('error', 'Error hashing password.'));
                    }
                    var uid = sh.unique(req.body.email);
                    var user = new User({
                         apiToken: createToken(uid),
                         email: req.body.email,
                         uid: sh.unique(req.body.email),
                         oid: sh.unique(req.body.email),
                         password: hash
                    });

                    _pre(user, function (user) {
                         user.save(function (err) {
                              if (err) {
                                   return next(err);
                              }
                              var activity = new Activity({
                                   oid: user.oid
                              });
                              activity.save(function (err) {
                                   if (err) {
                                        return next(err);
                                   }
                                   if (err) {
                                        return done(err, false, req.flash('error', 'Error saving user.'));
                                   }
                                   var time = 14 * 24 * 3600000;
                                   req.session.cookie.maxAge = time; //2 weeks
                                   req.session.cookie.expires = new Date(Date.now() + time);
                                   console.log('user saved!', req.session);
                                   req.session.touch();
                                   return done(null, user, req.flash('success', 'Thanks for signing up!!'));
                              });
                         });
                    })
               })
          });
};
module.exports = findOrCreateUser;
