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
  redirect:function(){}
};

  var s_res = {
     redirect: function (input) {
          console.log('redirect to:', input);
          utils.findUserByUid(uid, function (err, n_user) {
            console.log('n_user',n_user);
            utils.findEmail(n_user.email,function(err,email){
              console.log('should exist, new email',email);
            })
            utils.findEmail(f_user.email,function(err,email){
              console.log('should no longer exist, old email ',err,email);
            })
            utils.checkActivity(n_user.oid,function(err,activity){
              console.log('should have updated activity email',activity);
            })
            subscriptionController.getCustomer(custId,function(err,subscription){
              console.log('should have updated customer email',subscription);
            })
          });
     }
}
var f_user = {};
/* Updating Subsription WithOut A Credit Card Fails, Then Updating The Card Passes */
shortHandDeleteUser(req, function () {
     _console.log('Updating User Email createUser:', user);
     createUser(req, function (err, user) {
          _console.log('Updating User Email User:', user);
          custId = user.customerId;
          validateUser(user, true).then(function (valid) {
               _console.log('Updating User Email Validate User:', valid);
               if (valid) {
                    utils.findUserByUid(uid, function (err, _user) {
                         console.log('f_user', f_user);
                         f_user = _user;
                         req.body.email = 'newemail@yahoo.com';
                         req.body.email = 'newemail@yahoo.com';
                         var _req = {
                           flash: function (label, msg) {
                                console.log('flash:label:', label, 'msg:', label);
                           },
                           redirect: {
                                failure: 'failed',
                                success: 'success'
                           },
                           user: {
                             identity:{
                               uid: uid,
                               email:'tyler@milmerry.com'
                             },
                             subscription:{
                               customerId:custId
                             }
                           },
                           body:{
                             uid: uid,
                             oid:oid,
                             customerId:custId,
                             email:'new@email.com'
                           }
                         }
                         postProfile(_req, s_res, function (e) {
                              console.log('next:', e);
                         });
                    });
               }
          });
     });
});
