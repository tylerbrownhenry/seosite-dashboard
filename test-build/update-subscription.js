require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/middleware/passport-create-user'),
     _ = require('underscore'),
     Q = require('Q'),
     _console = require('../app/console'),
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
          user: user,
          body: user,
          session: {
               cookie: {

               },
               touch: function () {

               }
          },
          flash: function () {

          }
     };

/* Updating Subsription WithOut A Credit Card Fails, Then Updating The Card Passes */
shortHandDeleteUser(req, function () {
     createUser(req, function (err, user) {
          _console.log('Updating Subscription User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating Subscription Validate User:', valid);
               if (valid) {
                    addASubscription(custId, false, user, newPlan).catch(function (err) {
                         if (err) {
                              _console.log('Updating Subscription Fails Because No Card On Account', err);
                              addACreditCard(user, cardNum, function (res) {
                                   _console.log('Updating Subscription addACreditCard res', res);
                                   if (res === true) {
                                        addASubscription(custId, false, user, newPlan).then(function (err) {
                                             if (err === null) {
                                                  _console.log('Updating Subscription with credit card succeeds res', err);
                                             }
                                        });
                                   }
                              });
                         }
                    });
               }
          });
     });
});
