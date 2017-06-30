require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/middleware/passport-create-user'),
     postProfile = require('../app/controllers/users-controller').postProfile,
     subscriptionController = require('../app/controllers/subscriptions/subscription-controller'),
     _ = require('underscore'),
     Q = require('Q'),
     _console = require('../app/console'),
     Email = require('../app/models/email'),
     utils = require('../app/utils'),
     shortHandDeleteUser = require('./helper').shortHandDeleteUser,
     createUser = require('./helper').createUser,
     checkIfUserExists = require('./helper').checkIfUserExists,
     addACreditCard = require('./helper').addACreditCard,
     addASubscription = require('./helper').addASubscription,
     checkIfStripeUserExists = require('./helper').checkIfStripeUserExists,
     checkIfActivityExists = require('./helper').checkIfActivityExists,
     checkIfSubscriptionExists = require('./helper').checkIfSubscriptionExists,
     wrapper = require('./helper').wrapper,
     validateUser = require('./helper').validateUser,
     checkIfSubscriptionExists = require('./helper').checkIfSubscriptionExists;

var uid = 'ZBhQwO',
     oid = '1wHzOc',
     newPlan = 'monthlybusiness',
     fakeEmail = 'tyler@milmerry.com',
     subscriptionId = 'sub',
     cardNum = 4242424242424242,
     user = {
          oid: oid,
          uid: uid,
          email: fakeEmail
     },
     req = {
          user: {
               oid: oid,
               uid: uid,
               email: fakeEmail,
               identity: user,
               subscription: {}
          },
          subscription: {},
          body: user,
          session: {
               cookie: {

               },
               touch: function () {

               }
          },
          flash: function (label, msg) {
               console.log('flash:label:', label, 'msg:', label);
          },
          redirect: {
               failure: 'failed',
               success: 'success'
          }
     };
var res = {
     redirect: function () {}
};

var s_res = {
     redirect: function (input) {
          console.log('redirect to:', input);
          utils.findUserByUid(uid, function (err, n_user) {
               utils.findUserByUid('1vxd0V', function (err, new_user) {
                    console.log('new user should exist', new_user);
               });
               console.log('n_user', n_user);
               utils.findEmail(n_user.email, function (err, email) {
                    console.log('should exist, old email', email);
               })
               utils.findEmail(input.email, function (err, email) {
                    console.log('new email should exist', err, email);
               })
               utils.checkActivity(n_user.oid, function (err, activity) {
                    console.log('should not have updated activity email', activity);
               })
               subscriptionController.getCustomer(custId, function (err, subscription) {
                    console.log('should not have updated customer email', subscription);
               })
          });
     }
}
var f_user = {};
/* Updating Subsription WithOut A Credit Card Fails, Then Updating The Card Passes */
shortHandDeleteUser(req, function () {
     _console.log('Updating SubAccount User Email createUser:', user);
     createUser(req, function (err, user) {
          _console.log('Updating SubAccount User Email User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating SubAccount User Email Validate User:', valid);
               if (valid) {
                    utils.findUserByUid(uid, function (err, _user) {
                         console.log('f_user', f_user);
                         f_user = _user;
                         req.body.email = 'tylerbrownhenry@gmail.com';
                         var _req = {
                              flash: function (label, msg) {
                                   console.log('flash:label:', label, 'msg:', label);
                              },
                              redirect: {
                                   failure: 'failed',
                                   success: 'success'
                              },
                              user: {
                                   identity: {
                                        email: 'tylerbrownhenry@gmail.com'
                                   },
                                   subscription: {
                                        customerId: custId
                                   }
                              },
                              body: {
                                   email: 'tylerbrownhenry@gmail.com'
                              }
                         }
                         utils.deleteItem(Email, {
                              email: _req.body.email
                         }, function (err) {
                              if (err) {
                                   return failed(err);
                              }
                              utils.deleteUser('Z2o0PWG', function (err) {
                                   if (err) {
                                        return failed(err);
                                   }

                                   createUser(_req, function (err, user) {
                                        console.log('err', err)
                                        s_res.redirect(_req.body);
                                        console.log('next:', err, user);
                                   }, oid);
                              });
                         });
                    });
               }
          });
     });
});
