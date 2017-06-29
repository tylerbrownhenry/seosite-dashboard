'use strict';
var stripeActions = require('../models/plugins/actions-stripe'),
     utils = require('../utils'),
     _console = require('../console'),
     q = require('Q'),
     messages = require('../messages'),
     secrets = require('../config/secrets').stripeOptions,
     _ = require('underscore'),
     Stripe = require('stripe'),
     Subscription = require('../models/subscription'),
     Activity = require('../models/activity'),
     Email = require('../models/email'),
     Scan = require('../models/scan'),
     Update = require('../models/update'),
     PasswordResetToken = require('../models/passwordResetToken'),
     Link = require('../models/link'),
     Alert = require('../models/alert'),
     Capture = require('../models/capture'),
     Request = require('../models/request'),
     User = require('../models/user'),
     stripeActions = require('../models/plugins/actions-stripe'),
     sh = require("shorthash"),
     createToken = require("../middleware/passport-create-token"),
     subscriptionController = require('./subscriptions/subscription-controller');

exports.getProfile = function (req, res) {
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
     res.render(req.render, {
          user: req.user,
          form: form,
          error: error
     });
};

// Updates generic profile information
function _formatUserInput(_user) {
     _user.name = (typeof req.body.name !== 'undefined')?req.body.name || '';
     _user.gender = (typeof req.body.gender !== 'undefined')?req.body.gender || '';
     _user.location = (typeof req.body.location !== 'undefined')?req.body.location || '';
     _user.website = (typeof req.body.website !== 'undefined')?req.body.website || '';
     return _user;
}

function _finalizeProfileUpdate(err,req,next){
       if (err) {
            return next(err);
       }
       req.flash('success', {
            msg: messages['flash-profile-updated']
       });
       res.redirect(req.redirect.success);
}

module.exports._finalizeProfileUpdate = _finalizeProfileUpdate
module.exports._formatUserInput = _formatUserInput
module.exports._performSaveUser = _performSaveUser

function _postProfile(user, subscription, input) {
     var promise = q.defer();

     utils.findUserByUid(user.uid, function (err,_user) {
          if (err) {
               return promise.reject(err);
          }
          var oldEmail = _user.email;
          var emailIsNew = (oldEmail !== input.email);
          _user.email = input.email || '';
          _user = _formatUserInput(_user,input);

          utils.deleteEmail(oldEmail, function (err) {
               utils.saveEmail({
                    uid: input.uid,
                    oid: input.oid,
                    customerId: existingUser.customerId,
                    email: input.email
               }, function (err) {
                    _user.save(function (err) {
                         if (err) {
                              return promise.reject(err);
                         }
                         if (_user.role === 'org_admin' && emailIsNew === true) {
                              utils.updateActivityEmail(input.oid, input.email, function (err) {
                                   if (err) {
                                        return promise.reject(err);
                                   }
                                   subscriptionController.updateEmail(subscription.customerId, input.email, function (err) {
                                        if (err) {
                                             return promise.reject(err);
                                        }
                                        return promise.resolve();
                                   });
                              });
                         }
                    });
               });
          });
     })

     return promise.promise;
}

exports._postProfile = _postProfile;

exports.postProfile = function (req, res, next) {
     _console.log('users-controller.js postProfile:', req.user, req.subscription, req.body);
     var user = req.user.identity;
     var subscription = req.user.subscription;
     if (req.body.email !== user.email) {
          utils.findEmail(req.body.email, function (err, existingUser) {
               _console.log('users-controller.js postProfile existingUser', existingUser)
               if (existingUser) {
                    req.flash('errors', {
                         msg: messages['flash-email-in-use']
                    });
                    return res.redirect(req.redirect.failure);
               } else {
                    _postProfile(user, subscription, req.body).then(function() {
                         return _finalizeProfileUpdate(null,req,next)
                    }).catch(function (err) {
                         next(err);
                    })
               }
          });
     } else {
          utils.findUserByUid(user.uid, function (err, _user) {
               _console.log('users-controller.js postProfile not updating email findUserByUid', _user);
               if (err) {
                    return next(err);
               }
               _formatUserInput(_user,req.body);
               _user.save(function(err){
                 return _finalizeProfileUpdate(err.req,next)
               });
          });
     }
};

// Removes account

exports.deleteAccount = function (req, res, next) {
     _deleteAccount(req.user.customerId, req.user, next, function () {
          req.logout();
          req.flash('info', {
               msg: 'Your account has been deleted.'
          });
          res.redirect(req.redirect.success);
     });
}

function getAll(uid, model, cb) {
     utils.getAllItems(model, {
          uid: uid
     }, function (err, res) {
          if (err === null) {
               _console.log('Got All...', res, err);
               cb(res);
          } else {
               _console.log('Err Getting...', err, res);
          }
     })
}

function deleteAll(model, items) {
     utils.deleteItems(model, items, function (err, res) {
          if (err === null) {
               _console.log('Deleted All...', res);
          } else {
               _console.log('Err Deleting...', err, res);
          }
     })
}

function deleteEverything(uid, cb) {
     var arr = [Email, Alert, Scan, Request, Link, Update, PasswordResetToken, Capture];
     _.each(arr, function (item) {
          getAll(uid, item, function (res) {
               deleteAll(item, res);
          });
     });
     cb();
}

exports.deleteAllUserData = function (user, failed, passed) {
     _console.log('user', user);
     utils.deleteItem(Subscription, {
          customerId: user.customerId
     }, function (err) {
          if (err) {
               return failed(err);
          }
          utils.deleteItem(Activity, {
               oid: user.oid
          }, function (err) {
               if (err) {
                    return failed(err);
               }
               utils.deleteItem(Email, {
                    email: user.email
               }, function (err) {
                    if (err) {
                         return failed(err);
                    }
                    utils.deleteUser(user.uid, function (err) {
                         if (err) {
                              return failed(err);
                         }
                         deleteEverything(user.uid, function () {
                              passed();
                         })
                    });
               });
          });
     });
}

exports._deleteAccount = function (customerId, user, failed, passed) {
     _console.log('_deleteAccount', user, 'customerId', customerId);
     utils.findBy(Subscription, {
               customerId: customerId
          },
          function (err, subscription) {
               if (err || typeof subscription === 'undefined') {
                    exports.deleteAllUserData(user, failed, passed);
               }
               _console.log('_deleteAccount:err', err, 'subscription:', subscription, 'customerId', customerId);
               if (subscription)
                    subscriptionController.cancelStripe(customerId, function (err) {
                         _console.log('_deleteAccount err:', err);
                         if (err !== null) {
                              return failed(err);
                         }
                         exports.deleteAllUserData(user, failed, passed);
                    });
          });
};

// Adds or updates a users card.

exports.postBilling = function (req, res, next) {

     var user = req.user.identity;
     var subscription = req.user.subscription;
     _console.log('postBilling-->body', req.body);

     var customerInfo = req.body;
     customerInfo.customerId = subscription.customerId;

     subscriptionController.setCard(customerInfo, user.oid, user.email, function (err) {
          if (err) {
               _console.log('postBilling:setCard setCard: err:', err);
               if (err.code && err.code === 'card_declined') {
                    req.flash('errors', {
                         msg: 'Your card was declined. Please provide a valid card.'
                    });
                    return res.redirect(req.redirect.failure);
               }
               req.flash('errors', {
                    msg: 'An unexpected error occurred.'
               });
               return res.redirect(req.redirect.failure);
          }
          req.flash('success', {
               msg: 'Billing has been updated.'
          });
          res.redirect(req.redirect.success);
     });
};

exports.postPlan = function (req, res, next) {
     _console.log('postPlan -> req.body.plan', req.body.plan, 'user', req.user.identity, 'subscription', req.user.subscription, 'req.body', req.body);
     var user = req.user.identity;
     var subscription = req.user.subscription;
     var plan = req.body.plan;
     if (plan) {
          plan = plan.toLowerCase();
     }
     if (subscription.plan === plan) {
          _console.log('postPlan -> subscription.plan', plan);
          req.flash('errors', {
               msg: 'The selected plan is the same as the current plan.'
          });
          return res.redirect(req.redirect.success);
     }
     if (!subscription.last4 && !req.body['card-num']) {
          _console.log('postPlan -> req.body["card-num"]', req.body['card-num']);
          req.flash('errors', {
               msg: 'Please add a card to your account before choosing a plan.'
          });
          return res.redirect(req.redirect.failure);
     } else if (!subscription.last4 && req.body['card-num']) {
          _console.log('no card');
          var customerInfo = req.body;
          customerInfo.customerId = subscription.customerId;
          subscriptionController.setCard(customerInfo, user.oid, user.email, function (err) {
               _console.log('err', err, plan, user.oid, user.email);
               setPlan(plan, user.oid, user.email, subscription, req, res);
          });
     } else {
          _console.log('no card setPlan');
          setPlan(plan, user.oid, user.email, subscription, req, res);
     }
};

function setPlan(plan, oid, email, subscription, req, res) {
     subscriptionController.setPlan(plan, oid, email, subscription, function (err) {
          _console.log('postPlan -> stripeActions.setPlan:err', err);
          var msg;
          if (err) {
               if (err.code && err.code === 'card_declined') {
                    msg = 'Your card was declined. Please provide a valid card.';
               } else if (err && err.message) {
                    msg = err.message;
               } else {
                    msg = 'An unexpected error occurred.';
               }
               req.flash('errors', {
                    msg: msg
               });
               return res.redirect(req.redirect.failure);
          }
          req.flash('success', {
               msg: 'Plan has been updated.'
          });
          res.redirect(req.redirect.success);
     });
}

exports.findOrCreateUser = function (req, email, password, parentOid, done) {
     _console.log('findOrCreateUser-->');
     utils.findEmail(req.body.email,
          function (err, existingUser) {
               _console.log('findOrCreateUser--> findUser response:', err, 'existingUser', existingUser);
               if (existingUser) {
                    _console.log('findOrCreateUser--> findUser found');
                    req.flash('form', {
                         email: req.body.email
                    });
                    return done(null, false, req.flash('error', messages['flash-email-in-use']));
               }
               _console.log('findOrCreateUser--> findUser found --> encrypt -->');
               utils.encrypt(req.body.password, function (err, hash) {
                    _console.log('findOrCreateUser--> findUser found --> encrypt --> response err:', err, 'hash', hash);
                    if (err) {
                         _console.log('findOrCreateUser--> findUser found --> encrypt --> failed');
                         return done(null, false, req.flash('error', messages['flash-error-hashing-password']));
                    }
                    _console.log('findOrCreateUser--> findUser found --> encrypt --> success');
                    var uid = sh.unique(req.body.email);

                    function createUser(req, customer) {
                         return new User({
                              timezone: req.body.timezone,
                              apiToken: createToken(uid),
                              email: req.body.email,
                              customerId: (customer) ? customer : null,
                              uid: sh.unique(req.body.email),
                              role: (parentOid !== null) ? 'sub_account' : 'org_admin',
                              oid: (parentOid !== null) ? parentOid : sh.unique(req.body.email + "_org"),
                              password: hash
                         });
                    }

                    if (parentOid) {
                         _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> create as child');
                         utils.checkActivity(parentOid, function (err, res) {
                              console.log('+++res', res);
                              var user = createUser(req, res.customerId);
                              var email = new Email({
                                   uid: user.uid,
                                   email: user.email,
                                   oid: parentOid,
                                   customerId: res.customerId
                              });
                              email.save(function (err) {
                                   if (err) {
                                        return done(err);
                                   }
                                   user.save(function (err) {
                                        if (err) {
                                             return done(err);
                                        }
                                        return done(null, user, req.flash('success', messages['flash-user-created']));
                                   })
                              })
                         });
                         return;
                    }

                    _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer -->');
                    subscriptionController.createCustomer(req.body.email, function (err, customerId) {
                         _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> response err:', err, 'customerId', customerId);
                         if (err) {
                              return done(err);
                         }
                         var user = createUser(req, customerId);

                         user.save(function (err) {
                              _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> user save -->');
                              if (err) {
                                   return done(err, false, req.flash('error', message['flash-error-saving-user']));
                              }

                              var activity = new Activity({
                                   oid: user.oid,
                                   email: user.email,
                                   customerId: customerId
                              });

                              var email = new Email({
                                   uid: user.uid,
                                   email: user.email,
                                   oid: user.oid,
                                   customerId: customerId
                              });

                              var subscription = new Subscription({
                                   customerId: customerId,
                                   oid: user.oid,
                                   subscriptionId: 0,
                                   activeUntil: null
                              });

                              email.save(function (err) {
                                   if (err) {
                                        return done(err, false, req.flash('error', messages['flash-error-saving-email']));
                                   }
                                   subscription.save(function (err) {
                                        _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> user save --> subscription saved -->', err);
                                        if (err) {
                                             return done(err, false, req.flash('error', messages['flash-error-saving-subscription']));
                                        }
                                        activity.save(function (err) {
                                             _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> user save --> subscription saved --> activity saved -->');
                                             if (err) {
                                                  return done(err, false, req.flash('error', messages['flash-error-saving-activty']));
                                             }
                                             var time = 14 * 24 * 3600000;
                                             req.session.cookie.maxAge = time; //2 weeks
                                             req.session.cookie.expires = new Date(Date.now() + time);
                                             req.session.touch();

                                             var emailContent = utils.formatEmailContent('user-sign-up', user);
                                             utils.sendEmail(emailContent.title, emailContent.text, activity.email, emailContent.subject, function (err) {
                                                  return done(null, user, req.flash('success', messages['flash-thanks-for-signing-up']));
                                                  // cb(err)
                                             });

                                        });
                                   });
                              });
                         });
                    })
               })
          });
}
