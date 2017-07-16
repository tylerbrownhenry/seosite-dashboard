'use strict';
require('dotenv').config();
var utils = require('../../utils'),
     q = require('q'),
     _ = require('underscore'),
     filename = 'embed/embed-controller.js',
     EmbedHash = require('../../models/embedHash'),
     subscriptionController = require('../subscriptions/subscription-controller'),
     userController = require('../pages/user/users-controller'),
     Email = require('../../models/email'),
     User = require('../../models/user'),
     Activity = require('../../models/activity'),
     Subscription = require('../../models/subscription');

/**
 * wrapper for checking dynamoDb for a specific hash
 * @param  {Object} req node request Object
 * @param  {Object} res node response Object
 * @return {Object}     promise
 */
function validateHash(hash, oid) {
     var promise = q.defer();
     console.log('hash', hash, 'oid', oid);
     utils.findBy(EmbedHash, {
          _id: hash,
          oid: oid
     }, function (err, data) {

          if (data && err === null) {
               promise.resolve(data);
          } else {
               promise.reject();
          }
     });
     return promise.promise;
}

// /**
//  * redirects based on if hash is valid or not
//  * @param  {Object} req node request Object
//  * @param  {Object} res node response Object
//  */
// exports.validateHash = function(req, res) {
//   q(validateHash(req.params.hash,req.params.oid)).then(function(response) {
//     // var params = JSON.stringify(response.data);
//     // res.redirect(req.redirect.valid + params);
//   }).catch(function() {
//     // return res.redirect(req.redirect.invalid);
//   });
// };

exports._validateHash = validateHash;

/**
 * renders the page with error response
 * @param  {Object} req node request Object
 * @param  {Object} res node response Object
 */
exports.invalidHash = function (req, res) {
     res.render(req.render, {
          message: 'Forbidden',
          embed: false,
          error: 'Invalid Hash Provided'
     });
};

/**
 * wrapper for getting data needed for template to render
 * @param  {Object} req node request Object
 * @param  {Object} res node response Object
 */
exports.render = function (req, res, input, apiKey) {
     res.render('embed/monitor-tile', {
          something: 'goeshere'
     });
};

/**
 * check if email address has been used, or if it has a user connected to it, and if the user is a lead
 * @param  {String}   email an email address
 * @param  {String}   oid   organization id
 * @param  {Function} cb    callback
 */
function validateEmbedEmail(email, oid, cb) {
     utils.findBy(Email, {
          email: (String(email).toLowerCase())
     }, function (err, email) {
          if (err) {
               return cb(false, 'white:label:database:error');
          }
          if (!email) {
               return cb(true, 'white:label:api:internal:email:does:not:exist');
          }
          utils.findBy(User, {
               uid: email.uid
          }, function (err, user) {
               if (err) {
                    return cb(false, 'white:label:database:error');
               }
               if (!user) {
                    return cb(false, 'white:label:data:sync:error');
               }
               if (user.oid === oid) {
                    if (user.role === 'lead') {
                         return cb(false, 'white:label:api:response:email:is:lead:already:scanned')
                    } else {
                         return cb(true, 'white:label:api:internal:email:is:account', user);
                    }
               } else {
                    return cb(false, 'white:label:api:response:email:belongs:diff:org:white:label');
               }
          });
     });
}

function performScan(req, user) {
     if (typeof user !== 'undefined') {
          /**
           * Perform scan as user.
           */
     } else {
          /**
           * Create new user all that fun stuff.
           */
          req.body.password = 'unset'; /* ignored */
          req.lead = true;
          userController.findOrCreateUser(req, req.body.email, 'unset', req.body.oid, function (err,res) {
            if(err !== null){
              res.json({
                   error: true,
                   err: err
              });
            } else {

            }
               console.log('RES WHAAAA',res);
          });

     }
}

function _checkPlanPermission(req, res, plan, subscription) {
  console.log('plan',plan);
     subscriptionController.checkPlanPermissions(plan, 'can:white:label', true, function (resp) {
          console.log('can you do this?', resp);
          if (resp === false) {
               console.log('not allowed');
          } else {
               subscriptionController.checkPlanPermissions(plan, 'can:white:label', true, function (resp) {
                    validateEmbedEmail(req.body.email, req.body.oid, function (resp, message, user) {
                         console.log('validateEmbedEmail', resp, message, user);
                         if (resp !== true) {
                              res.json({
                                   error: true,
                                   err: message
                              });
                         } else {
                              performScan(req, user);
                         }
                    })
               })
          }
     });
}

exports.embedScan = function (req, res) {
     console.log('req.body', req.body);

     validateHash(req.body.hash, req.body.oid).then(function (response) {
          // validateHash(req.body.hash,req.body.oid).then(function(response){
          console.log('response', response);
          utils.findBy(Activity, {
               oid: req.body.oid
          }, function (err, activity) {
               if (err === null) {

                    utils.findBy(Subscription, {
                         customerId: activity.customerId
                    }, function (err, subscription) {
                         if (err === null) {
                              console.log('subscription', subscription);
                              // Work out permissions...
                              utils.getPlans(function (err, plan) {
                                   console.log('GOT PLANS!', plan);
                                   if (err) {
                                        console.log('error getting plans');
                                        res.json({
                                             error: true,
                                             err: err
                                        });
                                   } else {
                                        _checkPlanPermission(req, res, plan, subscription);
                                   }
                              }, false, subscription.plan);
                         } else {
                              console.log('error finding subscription');
                         }
                    });
               } else {
                    console.log('error finding activity');
               }
          });
     }).catch(function (err) {
          console.log('err validating hash', err);
          res.json({
               error: true,
               _id: 'yes'
          });
     })
};

/**
 * generates hash based on input then saves it to dynamoDB
 * @param  {Object} req node request Object
 * @param  {Object} res node response Object
 */
exports.createHash = function (req, res) {
     console.log('req', req.user.identity, 'req.body', req.body);
     /*
     Check if have white label permissions and enough things left.
     */
     var str = '';
     var input = req.body;
     input.date = new Date();

     _.each(_.keys(input), function (param) {
          str += JSON.stringify(input[param]);
     });

     var salt = req.user.identity.oid;

     utils.encrypt(str + salt, function (err, hash) {
          var thisHash = new EmbedHash({
               _id: hash,
               name: input.name,
               oid: req.user.identity.oid,
          });
          thisHash.save(function (err) {
               console.log('err', err);
               if (err === null) {
                    res.json({
                         success: true,
                         _id: hash,
                         oid: req.user.identity.oid
                    });
               } else {
                    res.json({
                         error: true
                    });
               }
          });
     });
};
