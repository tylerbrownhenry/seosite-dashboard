require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/middleware/passport-create-user'),
     postProfile = require('../app/controllers/pags/user/users-controller').postProfile,
     webhooks = require('../app/controllers/stripe/stripe-webhooks-consumer'),
     subscriptionController = require('../app/controllers/subscriptions/subscription-controller'),
     cancelSubscription = require('../app/controllers/subscriptions/subscription-controller').cancelSubscription,
     _ = require('underscore'),
     Q = require('Q'),
     _console = require('../app/debug/console'),
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

          });
     }
}
var f_user = {},cacheUser;

function repeat(cb) {
     shortHandDeleteUser(req, function () {
          _console.log('Manually Calling Webhooks User Email createUser:', user);
          createUser(req, function (err, user) {
               _console.log('Manually Calling Webhooks User Email User:', user);
               custId = user.customerId;
              cacheUser = user;
               validateUser(user, true).then(function (valid) {
                    _console.log('Manually Calling Webhooks User Email Validate User:', valid);
                    addACreditCard(user, cardNum, function (res) {
                         _console.log('Manually Calling Webhooks addACreditCard res', res);
                         if (res === true) {
                              addASubscription(custId, false, user, newPlan).then(function (err) {
                                   utils.findSubscription({
                                        customerId: custId
                                   }, function (err, res) {
                                        if (err === null) {
                                             _console.log('Manually Calling Webhooks credit card succeeds res', err, res);
                                             cb(custId, res.subscriptionId);
                                        }
                                   });
                              })
                         }
                    });
               });
          });
     });
}

repeat(function (custId, subscriptionId) {

     webhooks({
          stripeEvent: {
               subscription: subscriptionId,
               type: 'invoice.payment_succeeded',
               data: {
                    object: {
                         subscription: subscriptionId,
                         customer: custId,
                         period_start: 1111111,
                         period_end: 2222222
                    }
               }
          }
     }, function () {
          utils.findSubscription({
               customerId: custId
          }, function (err, res) {
               if (err === null) {
                    _console.log('Manually Calling Webhooks credit card succeeds res', err, res);
                    _console.log('subscription was updated?:', res.periodEnd === 2222222);

                    webhooks({
                         stripeEvent: {
                              subscription: subscriptionId,
                              type: 'invoice.payment_failed',
                              data: {
                                   object: {
                                     subscription: subscriptionId,
                                     customer: custId,
                                     attempted: true,
                                      paid: false,
                                      attempt_count: 1,
                                      next_payment_attempt: 1433978643
                                   }
                              }
                         }
                    }, function () {
                         utils.findSubscription({
                              customerId: custId
                         }, function (err, res) {
                              if (err === null) {
                                   _console.log('Manually Calling Webhooks inovice.payment_failed', err, res);
                                   webhooks({
                                        stripeEvent: {
                                             subscription: subscriptionId,
                                             type: 'invoice.payment_failed',
                                             data: {
                                                  object: {
                                                    subscription: subscriptionId,
                                                    customer: custId,
                                                    attempted: true,
                                                     paid: false,
                                                     attempt_count: 3,
                                                     next_payment_attempt: null
                                                  }
                                             }
                                        }
                                   }, function () {
                                        utils.findSubscription(custId, function (err, res) {
                                             if (err === null) {
                                                  _console.log('Manually Calling Webhooks invoice.payment_failed_last', res.status === 'inactive',res);
                                                  addACreditCard(cacheUser, cardNum, function (res) {
                                                       _console.log('Manually Calling Webhooks re addACreditCard res', res);
                                                       if (res === true) {
                                                            addASubscription(custId, false, user, newPlan).then(function (err) {
                                                              console.log('122',custId);
                                                                 utils.findSubscription(custId, function (err, res) {
                                                                      if (err === null) {
                                                                           _console.log('Manually Calling Webhooks re adding credit card succeeds res', res.status === 'active');
                                                                      }
                                                                 });
                                                            })
                                                       }
                                                  });
                                             }
                                        });
                                   })


                              }
                         });
                    })


               }
          });
     })
});
