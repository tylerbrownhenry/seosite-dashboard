require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/middleware/passport-create-user'),
     postProfile = require('../app/controllers/pags/user/users-controller').postProfile,
     _ = require('underscore'),
     Q = require('Q'),
     _console = require('../app/debug/console'),
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
     redirect: function (input) {
          console.log('redirect to:', input);
          utils.findUserByUid(uid, function (err, n_user) {
               console.log('n_user', n_user);
               if (f_user.name !== n_user.name) {
                    if (f_user.website !== n_user.website) {
                         if (f_user.timezone !== n_user.timezone) {
                           console.log('user updated!');
                         }
                    }
               }
          });
     }
}
var f_user = {};
/* Updating Subsription WithOut A Credit Card Fails, Then Updating The Card Passes */
shortHandDeleteUser(req, function () {
     _console.log('Updating User createUser:', user);
     createUser(req, function (err, user) {
          _console.log('Updating Subscription User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating Subscription Validate User:', valid);
               if (valid) {
                    utils.findUserByUid(uid, function (err, _user) {
                         console.log('f_user', f_user);
                         f_user = _user;
                         req.body.name = 'Tyler';
                         req.body.website = 'http://www.mysite.com';
                         req.body.timezone = 'EST';
                         postProfile(req, res, function (e) {
                              console.log('next:', e);
                         });
                    });
               }
          });
     });
});
