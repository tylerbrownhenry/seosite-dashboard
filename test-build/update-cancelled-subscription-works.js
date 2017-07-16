require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/middleware/passport-create-user'),
     postProfile = require('../app/controllers/pags/user/users-controller').postProfile,
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
var f_user = {};
shortHandDeleteUser(req, function () {
     _console.log('Updating SubAccount User Email createUser:', user);
     createUser(req, function (err, user) {
          _console.log('Updating SubAccount User Email User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating SubAccount User Email Validate User:', valid);
               addACreditCard(user, cardNum, function (res) {
                    _console.log('Updating Subscription addACreditCard res', res);
                    if (res === true) {
                         addASubscription(custId, false, user, newPlan).then(function (err) {
                              if (err === null) {
                                   _console.log('Updating Subscription with credit card succeeds res', err);
                                   utils.findSubscription({customerId:custId},function(err,res){
                                      _console.log('found it!',res);
                                       cancelSubscription(res.subscriptionId, function (err,confirmation) {
                                         utils.findSubscription({customerId:custId},function(err,res){
                                            _console.log('final found it!',res);
                                            _console.log('res.canceledAt should be a date',res.canceledAt);
                                            _console.log('res.cancelAtPeriodEnd should be true',res.cancelAtPeriodEnd);
                                          });
                                       },true,res.plan,fakeEmail,res.periodEnd);
                                   });
                              }
                         });
                    }
               });
          });
     });
});
