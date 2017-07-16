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

/* Updating Account With Credit Card, Then Updating The Card*/
shortHandDeleteUser(req, function () {
     createUser(req, function (err, user) {
          _console.log('Updating Account User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating Account Validate User:', valid);
               if (valid) {
                 _console.log('Updating Account addACreditCard');
                    addACreditCard(user, cardNum, function (res) {
                          _console.log('addACreditCard res');
                         if (res === true) {
                              _console.warn('createUser addACreditCard success');
                                addACreditCard(user, 4000000000000341, function (res) {
                                      if (res === true) {
                                        _console.log('passed!');
                                      } else {
                                        _console.log('failed!');
                                      }
                                });
                         } else {
                              _console.warn('createUser addACreditCard failed');
                         }
                    });
               }
          });
     });
});
