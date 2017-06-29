require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('../app/controllers/users-controller').findOrCreateUser,
     _ = require('underscore'),
     Q = require('Q'),
     subscriptionController = require('../app/controllers/subscriptions/subscription-controller'),
     userController = require('../app/controllers/users-controller'),
     utils = require('../app/utils'),
     _console = require('../app/console'),
     Subscription = require('../app/models/subscription'),
     Activity = require('../app/models/activity');

function addACreditCard(user, cardNum, callback) {
     _console.log('addACreditCard: user:', user, 'cardNum:', cardNum);
     var last4 = String(cardNum).substr(String(cardNum).length - 4);
     subscriptionController.setCard({
          customerId: user.customerId,
          object: 'card',
          'card-num': cardNum,
          'card-cvs': 123,
          'card-month': 11,
          'card-year': 19
     }, user.oid, user.email, function (err) {
          if (err === null) {
               _console.log('addACreditCard: Card Added');
               checkIfStripeUserExists(user, function (res) {
                    _console.log('addACreditCard: checkIfStripeUserExists:', res);
                    if (res) {
                         checkIfSubscriptionExists(user, function (res) {
                              _console.log('addACreditCard: checkIfSubscriptionExists:', res);
                              callback(res);
                         },function(res){
                           return last4 === res.last4
                         });
                    } else {
                         callback(false);
                    }
               }, function (res) {
                    return res.sources.data[0].last4 === last4;
               })
          } else {
               _console.log('addACreditCard: Trouble Adding Card err:', err);
               callback(false);
          }
     });
}

function addASubscription(customerId, update, user, newPlan) {
    var promise = Q.defer();
     _console.log('addASubscription: customerId:', customerId);
     utils.findSubscriptionByCustomer(customerId).then(function (res) {
          _console.log('addASubscription: findSubscription', res);
          if (res) {
               var subscription = {
                    last4: res.last4,
                    customerId: customerId
               };
               if (update === true) {
                    subscription.subscriptionId = subscriptionId;
               }
               subscriptionController.setPlan(newPlan, user.oid, user.email, subscription, function (err) {
                    _console.log('addASubscription: setPlan: done!',err,res);
                    if(err === null){
                      promise.resolve(err);
                    } else {
                      promise.reject(err);
                    }
               });
          }
     }).catch(function (err) {
          _console.log('Could Not Find Subscription');
          promise.reject(err);
     });
     return promise.promise;
}

function checkIfStripeUserExists(user, cb, customTest) {
     _console.log('checkIfStripeUserExists', user);
     if (user && user.customerId) {
          _console.log('checkIfStripeUserExists user.customerId: defined');
          subscriptionController.getCustomer(user.customerId, function (err, res) {
               _console.log('checkIfStripeUserExists --> getCustomer err', err, 'res', res);
               if (customTest) {
                    _console.log('checkIfStripeUserExists close!');
                    cb(customTest(res));
               } else {
                    cb(res.deleted !== true);
               }
          });
     } else {
          _console.log('checkIfStripeUserExists user.customerId undefined');
          utils.findUserByUid(user.uid, function (err, res) {
               _console.log('checkIfStripeUserExists: findUserByUid err', err, 'res', res);
               if (typeof res !== 'undefined') {
                    subscriptionController.getCustomer(res.customerId, function (err, res) {
                         _console.log('checkIfStripeUserExists: getCustomer err', err, 'res', res);
                         cb(typeof res !== 'undefined');
                    });
               } else {
                    cb(typeof res !== 'undefined');
               }
          });
     }
}

function checkIfActivityExists(user, cb) {
     utils.checkActivity(user.oid, function (err, res) {
          _console.log('checkIfActivityExists err', err, 'res', res);
          cb(typeof res !== 'undefined');
     });
}

function checkIfSubscriptionExists(user, cb,customTest) {
     utils.findUserByUid(user.uid, function (err, res) {
          _console.log('checkIfSubscriptionExists: findUserByUid res', res);
          if (typeof res !== 'undefined') {
               utils.findSubscription({
                    customerId: res.customerId
               }, function (err, res) {
                    _console.log('checkIfSubscriptionExists: findSubscription err', err, 'res', res, 'user', user);
                    if(typeof customTest === 'function'){
                      cb(customTest(res));
                    } else {
                      cb(typeof res !== 'undefined');
                    }
               });
          } else {
               Subscription.get({
                    customerId: user.customerId
               }, function (err, res) {
                    cb(typeof res !== 'undefined');
               })
          }
     });
}

function checkIfUserExists(user, cb) {
     utils.findUserByUid(user.uid, function (err, res) {
          _console.log('checkIfUserExists err', err, 'res', res);
          cb(typeof res !== 'undefined');
     });
}

function checkIfEmailExists(user, cb) {
     utils.findEmail(user.email, function (err, res) {
          _console.log('checkIfEmailExists err', err, 'res', res);
          cb(typeof res !== 'undefined');
     });
}

function createUser(req, cb, parentOid) {
     _console.log('createUser:');
     findOrCreateUser(req, req.email, 'fakePassword', (parentOid) ? parentOid : null, function (err, res, req) {
          if (err === null && res !== false) {
               _console.log('createUser: New User Created...', res);
               cb(null, res);
          } else {
               _console.log('createUser: Err Creating User...', res, err);
               cb(err, res);
          }
     });
}

function shortHandDeleteUser(req, cb) {
     _console.log('shortHandDeleteUser -->');
     utils.findUserByUid(req.user.uid, function (err, user) {
          _console.log('user', user, req.user);
          userController._deleteAccount(req.user.customerId, req.user, function (err) {
               _console.log('shortHandDeleteUser failed', err);
               cb(err);
          }, function (res) {
               _console.log('shortHandDeleteUser success', res);
               cb();
          })
     });
}

function wrapper(func, input, callback) {
     var promise = Q.defer();
     func(input, function (res) {
          callback(res);
          promise.resolve(res);
     });
     return promise.promise;
}

function validateUser(user, expectedValue, isChild) {
     _console.log('validateUser user:', user);
     var promise = Q.defer();
     Q.all([
          wrapper(checkIfUserExists, user, function (exists) {
               if (exists) {
                    _console.log('User exists.');
               } else {
                    _console.warn('User does not exist.');
               }
          }),
          wrapper(checkIfEmailExists, user, function (exists) {
               if (exists) {
                    _console.log('Email exists.');
               } else {
                    _console.warn('Email does not exist.');
               }
          }),
          wrapper(checkIfSubscriptionExists, user, function (exists) {
               if (exists) {
                    _console.log('Subscription exists.');
               } else {
                    _console.warn('Subscription does not exist.');
               }
          }),
          wrapper(checkIfActivityExists, user, function (exists) {
               if (exists) {
                    _console.log('Activity exists.');
               } else {
                    _console.warn('Activity does not exist.');
               }
          }),
          wrapper(checkIfStripeUserExists, user, function (exists) {
               if (exists) {
                    _console.log('Stripe User exists.');
               } else {
                    _console.warn('Stripe User does not exist.');
               }
          })
     ]).then(function (res) {
          var failed = false;
          _.each(res, function (response) {
               if (response !== expectedValue) {
                    failed = true;
               }
          })
          promise.resolve(!failed);
     });
     return promise.promise;
}

module.exports.shortHandDeleteUser = shortHandDeleteUser;
module.exports.createUser = createUser;
module.exports.wrapper = wrapper;
module.exports.validateUser = validateUser;
module.exports.checkIfUserExists = checkIfUserExists;
module.exports.addACreditCard = addACreditCard;
module.exports.addASubscription = addASubscription;
module.exports.checkIfStripeUserExists = checkIfStripeUserExists;
module.exports.checkIfActivityExists = checkIfActivityExists;
module.exports.checkIfSubscriptionExists = checkIfSubscriptionExists;
