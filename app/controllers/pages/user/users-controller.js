'use strict';
var stripeActions = require('../../../models/plugins/actions-stripe'),
     utils = require('../../../utils'),
     _console = require('../../../debug/console'),
     q = require('Q'),
     messages = require('../../../messages/messages'),
     secrets = require('../../../config/secrets').stripeOptions,
     _ = require('underscore'),
     Stripe = require('stripe'),
     Subscription = require('../../../models/subscription'),
     Activity = require('../../../models/activity'),
     Email = require('../../../models/email'),
     Scan = require('../../../models/scan'),
     Update = require('../../../models/update'),
     PasswordResetToken = require('../../../models/passwordResetToken'),
     Link = require('../../../models/link'),
     Alert = require('../../../models/alert'),
     Capture = require('../../../models/capture'),
     Request = require('../../../models/request'),
     User = require('../../../models/user'),
     stripeActions = require('../../../models/plugins/actions-stripe'),
     sh = require("shorthash"),
     createToken = require("../../../middleware/passport-create-token"),
     subscriptionController = require('../../subscriptions/subscription-controller');

var deleteAllUserData = require('./admin/delete-controller').deleteAllUserData,
     deleteEverything = require('./admin/delete-controller').deleteEverything,
     deleteAll = require('./admin/delete-controller').deleteAll,
     getAll = require('./admin/delete-controller').getAll,
     deleteAccount = require('./admin/delete-controller').deleteAccount,
     _deleteAccount = require('./admin/delete-controller')._deleteAccount;

/** REFACTOR THIS... */
module.exports.deleteAllUserData = deleteAllUserData;
module.exports.deleteEverything = deleteEverything;
module.exports.deleteAll = deleteAll;
module.exports.getAll = getAll;
module.exports.deleteAccount = deleteAccount;
module.exports._deleteAccount = _deleteAccount;

/**
 * renders profile page
 * @param  {Object} req node request object
 * @param  {Object} res node response object
 */
function getProfile(req, res) {
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

/**
 * create a new instance of a dynamoDb model
 * @param  {Object} req      node request object
 * @param  {Object} customer object containing customer data
 * @return {Object}          new instance of dynamoDb User model
 */
function createUser(req, customer) {
    var user = {
       timezone: req.body.timezone,
       name: (req.body.name) ? req.body.name : null,
       location: (req.body.location) ? req.body.location : null,
       website: (req.body.website) ? req.body.website : null,
       email: req.body.email,
       customerId: (customer) ? customer : null,
       uid: sh.unique(req.body.email),
       role: (req.parentOid) ? 'sub_account' : 'org_admin',
       oid: (req.parentOid) ? req.parentOid : sh.unique(req.body.email + "_org"),
       password: req.hash
     }
     if(req.lead === true){
       user.password = 'unset';
       user.role = 'lead';
     }
     return new User(user);
}

/**
 * loops through generic user information, to see if is being changed and adds it
 * @param       {Object} _user object to be saved
 * @param       {Object} input object with changes to be made
 * @return      {Object} modified _user object
 */
function _formatUserInput(_user, input) {
     console.log('_formatUserInput', input);
     var keys = ['name', 'gender', 'location', 'website', 'timezone'];
     _.each(keys, function (key) {
          if (typeof input[key] !== 'undefined') {
               _user[key] = input[key];
          }
     })
     return _user;
}

/**
 * small reused function for completing the request or throwing an error
 * @param       {Object}   err  Error or null
 * @param       {Object}   req  node request object
 * @param       {Function} next
 */
function _finalizeProfileUpdate(err, req, res, next) {
     if (err) {
          return next(err);
     }
     req.flash('success', {
          msg: messages['flash-profile-updated']
     });
     res.redirect(req.redirect.success);
}

/**
 * function for changing an email when it's updateing, everywhere it needs to be updated
 * @param       {Object} user         current user information
 * @param       {Object} subscription input subscription information
 * @param       {Object} input        input (updated) user information
 */
function _updateEmail(user, subscription, input) {
     var promise = q.defer();
     utils.findUserByUid(user.uid, (err, _user) => {
          if (err) {
               return promise.reject(err);
          }
          var oldEmail = _user.email;
          var emailIsNew = (oldEmail !== input.email);
          _user.email = input.email || '';
          _user = _formatUserInput(_user, input);

          utils.deleteEmail(oldEmail, (err) => {
               utils.saveEmail({
                    uid: input.uid,
                    oid: input.oid,
                    customerId: _user.customerId,
                    email: input.email
               }, function (err) {
                    _user.save((err) => {
                         if (err) {
                              return promise.reject(err);
                         }
                         if (_user.role === 'org_admin' && emailIsNew === true) {
                              utils.updateActivityEmail(input.oid, input.email, (err) => {
                                   if (err) {
                                        return promise.reject(err);
                                   }
                                   subscriptionController.updateEmail(subscription.customerId, input.email, (err) => {
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

/**
 * entry point for updating a user, decides if updating an email or not, and then branches off to two behaviors
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 * @param  {Function} next
 */
function postProfile(req, res, next) {
     _console.log('users-controller.js postProfile:', req.user, req.subscription, req.body);
     var user = req.user.identity;
     var subscription = req.user.subscription;
     if (req.body.email !== user.email) {
          _console.log('users-controller.js changing email');
          utils.findEmail(req.body.email, (err, existingUser) => {
               _console.log('users-controller.js postProfile existingUser', existingUser)
               if (existingUser) {
                    req.flash('errors', {
                         msg: messages['flash-email-in-use']
                    });
                    return res.redirect(req.redirect.failure);
               } else {
                    _updateEmail(user, subscription, req.body).then(() => {
                         return _finalizeProfileUpdate(null, req, res, next)
                    }).catch((err) => {
                         next(err);
                    })
               }
          });
     } else {
          _console.log('users-controller.js postProfile not updating email findUserByUid');
          utils.findUserByUid(user.uid, (err, _user) => {
               if (err) {
                    return next(err);
               }
               _formatUserInput(_user, req.body);
               _user.save((err) => {
                    return _finalizeProfileUpdate(err, req, res, next)
               });
          });
     }
};

/**
 * entry point for changing billing information
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 * @param  {Function} next
 */
function postBilling(req, res, next) {

     var user = req.user.identity;
     var subscription = req.user.subscription;
     _console.log('postBilling-->body', req.body);

     var customerInfo = req.body;
     customerInfo.customerId = subscription.customerId;

     subscriptionController.setCard(customerInfo, user.oid, user.email, (err) => {
          if (err) {
               _console.log('user-controller.js postBilling:setCard setCard: err:', err);
               if (err.code && err.code === 'card_declined') {
                    req.flash('errors', {
                         msg: messages['flash-card_declined']
                    });
                    return res.redirect(req.redirect.failure);
               }
               req.flash('errors', {
                    msg: messages['flash-unexpected-error']
               });
               return res.redirect(req.redirect.failure);
          }
          req.flash('success', {
               msg: messages['flash-billing-updated']
          });
          res.redirect(req.redirect.success);
     });
};

/**
 * entry point for changing user plan
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 * @param  {Function} next
 */
function postPlan(req, res, next) {
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
               msg: messages['flash-same-as-current-plan']
          });
          return res.redirect(req.redirect.success);
     }
     if (!subscription.last4 && !req.body['card-num']) {
          _console.log('postPlan -> req.body["card-num"]', req.body['card-num']);
          req.flash('errors', {
               msg: messages['flash-add-card']
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

/**
 * wrapper for changing a user plan
 * @param {String} plan         newPlan id
 * @param {String} oid          user oid
 * @param {String} email        user email
 * @param {Objet} subscription  contains user information
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 */
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

/**
 * creates everything needed for a new account and sends an email confirming it
 * @param  {Object}   req  node request object
 * @param  {Function} done
 */
function createAccount(req, done) {
     subscriptionController.createCustomer(req.body.email, function (err, customerId) {
          _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> response err:', err, 'customerId', customerId);
          if (err) {
               return done(err);
          }
          var user = createUser(req, customerId);

          var activity = new Activity({
               oid: user.oid,
               apiToken: createToken(user.oid),
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

          user.save(function (err) {
               _console.log('findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer --> user save -->');
               if (err) {
                    return done(err, false, req.flash('error', message['flash-error-saving-user']));
               }
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
                              });
                         });
                    });
               });
          });
     });
}

/**
 * add an account as a subaccount
 * @param  {String}   parentOid parent account oid
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 * @param  {Function} done
 */
function createSubAccount(parentOid, req, done) {
     _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt --> success--> create as child');
     utils.checkActivity(parentOid, function (err, res) {
          req.parentOid = parentOid;
          var user = createUser(req, res.customerId);
          var email = new Email({
               uid: user.uid,
               email: user.email,
               oid: parentOid,
               customerId: res.customerId
          });
          email.save(function (err) {
               _console.log('users-controller.js createSubAccount email.save', err);
               if (err) {
                    return done(err);
               }
               user.save(function (err) {
                    _console.log('users-controller.js createSubAccount user.save', err);
                    if (err) {
                         return done(err);
                    }
                    utils.checkActivity(parentOid, function (err, res) {
                         var emailContent = utils.formatEmailContent('sub-account-user-sign-up', user);
                         utils.sendEmail(emailContent.title, emailContent.text, res.email, emailContent.subject, function (err) {})
                    });
                    var emailContent = utils.formatEmailContent('user-sign-up', user);
                    if(typeof req.contactSubAccountUser === 'true'){
                      utils.sendEmail(emailContent.title, emailContent.text, user.email, emailContent.subject, function (err) {
                         return done(null, user, req.flash('success', messages['flash-thanks-for-signing-up']));
                      });
                    } else {
                      return done(null, user, req.flash('success', messages['flash-thanks-for-signing-up']));
                    }
               })
          })
     });
}
/**
 * find if an email is already in use, if it is not create the user
 * @param  {Object}   req  node request object
 * @param  {String}   email     input user email
 * @param  {String}   password  input user password
 * @param  {String}   parentOid input parent account oid
 * @param  {Function} done
 */
function findOrCreateUser(req, email, password, parentOid, done) {
     _console.log('users-controller.js findOrCreateUser-->');
     utils.findEmail(req.body.email,
          function (err, existingUser) {
               _console.log('users-controller.js findOrCreateUser--> findUser response:', err, 'existingUser', existingUser);
               if (existingUser) {
                    _console.log('users-controller.js findOrCreateUser--> findUser found');
                    req.flash('form', {
                         email: req.body.email
                    });
                    return done(null, false, req.flash('error', messages['flash-email-in-use']));
               }
               _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt -->');
               utils.encrypt(req.body.password, function (err, hash) {
                    _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt --> response err:', err, 'hash', hash);
                    if (err) {
                         _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt --> failed');
                         return done(null, false, req.flash('error', messages['flash-error-hashing-password']));
                    }
                    _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt --> success');
                    var uid = sh.unique(req.body.email);
                    req.uid = uid;
                    req.hash = hash;
                    if (parentOid) {
                         return createSubAccount(parentOid, req, done);
                    } else {
                         _console.log('users-controller.js findOrCreateUser--> findUser found --> encrypt --> success--> subscriptionController.createCustomer -->');
                         return createAccount(req, done);
                    }
               });
          });
}

module.exports._updateEmail = _updateEmail;
module.exports.postProfile = postProfile;
module.exports.postBilling = postBilling;
module.exports.postPlan = postPlan;
module.exports.createSubAccount = createSubAccount;
module.exports.setPlan = setPlan;
module.exports.createAccount = createAccount;
module.exports.findOrCreateUser = findOrCreateUser;
module.exports.getProfile = getProfile;
module.exports._finalizeProfileUpdate = _finalizeProfileUpdate;
module.exports._formatUserInput = _formatUserInput;
