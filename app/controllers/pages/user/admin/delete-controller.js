
'use strict';
var stripeActions = require('../../../../models/plugins/actions-stripe'),
  utils = require('../../../../utils'),
  _console = require('../../../../debug/console'),
  q = require('Q'),
  messages = require('../../../../messages/messages'),
  secrets = require('../../../../config/secrets').stripeOptions,
  _ = require('underscore'),
  Stripe = require('stripe'),
  Subscription = require('../../../../models/subscription'),
  Activity = require('../../../../models/activity'),
  Email = require('../../../../models/email'),
  Scan = require('../../../../models/scan'),
  Update = require('../../../../models/update'),
  PasswordResetToken = require('../../../../models/passwordResetToken'),
  Link = require('../../../../models/link'),
  Alert = require('../../../../models/alert'),
  Capture = require('../../../../models/capture'),
  Request = require('../../../../models/request'),
  User = require('../../../../models/user'),
  stripeActions = require('../../../../models/plugins/actions-stripe'),
  sh = require("shorthash"),
  createToken = require("../../../../middleware/passport-create-token"),
  subscriptionController = require('../../../subscriptions/subscription-controller');

/**
 * cancels a user's stripe account
 * @param       {String} customerId id from stripe for user
 * @param       {Object} user       object container user information
 * @param       {Function} failed   callback function for failures
 * @param       {Function} passed   callback function for passes
 */
function _deleteAccount(customerId, user, failed, passed) {
  _console.log('_deleteAccount', user, 'customerId', customerId);
  utils.findBy(Subscription, {
      customerId: customerId
    },
    function(err, subscription) {
      if (err || typeof subscription === 'undefined') {
        exports.deleteAllUserData(user, failed, passed);
      }
      _console.log('_deleteAccount:err', err, 'subscription:', subscription, 'customerId', customerId);
      if (subscription)
        subscriptionController.cancelStripe(customerId, function(err) {
          _console.log('_deleteAccount err:', err);
          if (err !== null) {
            return failed(err);
          }
          exports.deleteAllUserData(user, failed, passed);
        });
    });
};

/**
 * wrapper for _deleteAccount
 * @param  {Object}   req  node request object
 * @param  {Object}   res  node response object
 * @param  {Function} next [description]
 */
function deleteAccount(req, res, next) {
  _deleteAccount(req.user.customerId, req.user, next, function() {
    req.logout();
    req.flash('info', {
      msg: 'Your account has been deleted.'
    });
    res.redirect(req.redirect.success);
  });
}

/**
 * wrapper for getting everything related to a user
 * @param  {String}   uid   id for a user
 * @param  {Object}   model dynamoDb model
 * @param  {Function} cb    callback function
 */
function getAll(uid, model, cb) {
  utils.getAllItems(model, {
    uid: uid
  }, function(err, res) {
    if (err === null) {
      _console.log('Got All...', res, err);
      cb(res);
    } else {
      _console.log('Err Getting...', err, res);
    }
  })
}

/**
 * wrapper to delete every entry passed in
 * @param  {Object} model dynamoDb model
 * @param  {Array} items  array of database objects
 */
function deleteAll(model, items) {
  utils.deleteItems(model, items, function(err, res) {
    if (err === null) {
      _console.log('Deleted All...', res);
    } else {
      _console.log('Err Deleting...', err, res);
    }
  })
}

/**
 * deleteEverything, function to find every database entry connected to a user and deleting them.
 * @param  {String}   uid id for a user
 * @param  {Function} cb  callback function
 */
function deleteEverything(uid, cb) {
  var arr = [Email, Alert, Scan, Request, Link, Update, PasswordResetToken, Capture];
  _.each(arr, function(item) {
    getAll(uid, item, function(res) {
      deleteAll(item, res);
    });
  });
  cb();
}

/**
 * function to find and delete eveything related to a user
 * @param  {Object} user   object containing a user's information
 * @param  {Function} failed callback function for failures
 * @param  {Function} passed callback function for passes
 */
function deleteAllUserData(user, failed, passed) {
  _console.log('user', user);
  utils.deleteItem(Subscription, {
    customerId: user.customerId
  }, function(err) {
    if (err) {
      return failed(err);
    }
    utils.deleteItem(Activity, {
      oid: user.oid
    }, function(err) {
      if (err) {
        return failed(err);
      }
      utils.deleteItem(Email, {
        email: user.email
      }, function(err) {
        if (err) {
          return failed(err);
        }
        utils.deleteUser(user.uid, function(err) {
          if (err) {
            return failed(err);
          }
          deleteEverything(user.uid, function() {
            passed();
          })
        });
      });
    });
  });
}

module.exports.deleteAllUserData = deleteAllUserData;
module.exports.deleteEverything = deleteEverything;
module.exports.deleteAll = deleteAll;
module.exports.getAll = getAll;
module.exports.deleteAccount = deleteAccount;
module.exports._deleteAccount = _deleteAccount;
