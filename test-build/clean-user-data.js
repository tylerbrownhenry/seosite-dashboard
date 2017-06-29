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

/* Creating and Deleting User */

     shortHandDeleteUser(req, function () {
          _console.log('Create/Delete User: deleteUser')
          createUser(req, function (err, user) {
               _console.log('Create/Delete User: user', user)
               validateUser(user, true).then(function (valid) {
                    if (valid) {
                         _console.log('Create/Delete User: ValidateUser Success');
                         createUser(req, function (err, _user) {
                              _console.log('Create/Delete User: createUser Again Fail', err, _user);
                              if (_user === false) {
                                   utils.findSubscription({
                                        customerId: user.customerId
                                   }, function (err, res) {
                                        _console.log('Create/Delete User: findSubscription res:', res, 'err', err);
                                        req.user.customerId = res.customerId;
                                        shortHandDeleteUser(req, function () {
                                             validateUser(user, false).then(function (valid) {
                                                  if (valid) {
                                                       console.log('Create/Delete User: Successfully created and deleted a user');
                                                  } else {
                                                       _console.warn('Create/Delete User: Shucks, he\'s still here...');
                                                  }
                                             })
                                        });
                                   })
                              };
                         });
                    } else {
                         _console.warn('Create/Delete User: There was something missing after creating a user');
                    }
               });
          });
     });
}
