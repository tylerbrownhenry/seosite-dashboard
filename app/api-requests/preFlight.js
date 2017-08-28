var User = require('./../models/user'),
     Activity = require('./../models/activity'),
     q = require('q'),
     _log = require('./../debug/debug'),
     utils = require('../utils'),
     _ = require('underscore');

var permissions = {
     free: require('./permissions/free'),
     paid: require('./permissions/paid')
};
/**
 * validation process for make a site api request
 * @return {promise} promise with a boolean or an object with an error message
 */
function siteRequestValidate() {
     var promise = q.defer();
     promise.resolve();
     return promise.promise;
}
/**
 * [linkRequestValidate description]
 * @return {[type]} [description]
 */
function linkRequestValidate() {
     var promise = q.defer();
     promise.resolve();
     return promise.promise;
}

function captureRequestValidate() {
     var promise = q.defer();
     promise.resolve();
     return promise.promise;
}

function pageRequestValidate(activity, request) {
     var promise = q.defer();
     var perm = permissions[activity.plan];
     _log('activity', activity, 'request', request, 'perm', perm);
     var problems = [];
     //  if (perm.restrictions.type[request.type] === false) {
     //       problems.push({
     //            parent: 'type',
     //            hint: 'upgrade',
     //            message: 'Your current plan does not allow requests of this type: ' + request.type + '.'
     //       });
     //  }
     //  if (user.activity[request.type + 's'].daily.count >= perm.limits.daily[request.type]) {
     //       problems.push({
     //            parent: 'form',
     //            hint: 'upgrade',
     //            message: 'Your have performed the maximum number of ' + [request.type] + ' requests (' + user.activity[request.type + 's'].daily.count + ') your current plan allows for the day.'
     //       });
     //  }
     //  if (user.activity[request.type + 's'].monthly.count >= perm.limits.monthly[request.type]) {
     //       problems.push({
     //            parent: 'form',
     //            hint: 'upgrade',
     //            message: 'Your have performed the maximum number of ' + [request.type] + ' requests (' + user.activity[request.type + 's'].monthly.count + ') your current plan allows for the month.'
     //       });
     //  }
     //  if (user.activity.requests.monthly.count >= perm.limits.monthly.requests) {
     //       problems.push({
     //            parent: 'form',
     //            hint: 'upgrade',
     //            message: 'Your have performed the maximum number of requests (' + perm.limits.monthly.requests + ') your current plan allows for the month.'
     //       });
     //  }
     //  if (user.activity.requests.daily.count >= perm.limits.daily.requests) {
     //       problems.push({
     //            parent: 'form',
     //            hint: 'upgrade',
     //            message: 'Your have performed the maximum number of requests (' + perm.limits.daily.requests + ') your current plan allows for the day.'
     //       });
     //  }
     //  if (request.filterLevel >= perm.restrictions.filterLimit) {
     //       problems.push({
     //            parent: 'filterLimit',
     //            hint: 'upgrade',
     //            message: 'You have selected a filter level of "' + request.filterLevel + '". Your current plan allows a maximum filter level of "' + perm.restictions.filterLimit + '".'
     //       });
     //  }
     //  if (request.digDepth >= perm.restrictions.digDepth) {
     //       problems.push({
     //            parent: 'digDepth',
     //            hint: 'upgrade',
     //            message: 'You have selected a dig depth of "' + request.digDepth + '". Your current plan allows a maximum dig depth of "' + perm.restictions.digLimit + '".'
     //       });
     //  }
     //  if (request.honorRobotExclusions === false && perm.restrictions.honorRobotExclusions.canDisable === false) {
     //       problems.push({
     //            parent: 'honorRobotExclusions',
     //            hint: 'upgrade',
     //            message: 'Your current plan does not allow disabling honor robot exclusions '
     //       });
     //  }
     //  if (request.excludeExternalLinks === true && perm.restrictions.excludeExternalLinks.canDisable === false) {
     //       problems.push({
     //            parent: 'excludeExternalLinks',
     //            hint: 'upgrade',
     //            message: 'Your current plan does not allow enabling of including external links.'
     //       });
     //  }
     // if(typeof request.excludedSchemes !== 'undefined' && perm.restrictions.excludedSchemes.canUse === false){
     //     problems.push({response: false, selection: 'excludeExternalLinks', message:'Your current plan does not allow change excluded schemas.'});
     // }

     //  if (request.acceptedSchemes.indexOf('https') !== -1 && perm.restrictions.acceptedSchemes['https'] === false) {
     //       problems.push({
     //            parent: 'acceptedSchemes',
     //            hint: 'upgrade',
     //            message: 'Your current plan does not allow acceptedSchemes ' + request.acceptedSchemes + '.'
     //       });
     //  }
     //  var failed = false;
     //  var linkInfo = [];
     //  _.each(_.keys(request.linkInformation), function (infoSelect) {
     //       if (perm.restrictions.linkInformation[infoSelect] === false && request.linkInformation[infoSelect] === true) {
     //            failed = true;
     //            linkInfo.push(infoSelect);
     //       }
     //  });
     //  if (failed === true) {
     //       problems.push({
     //            parent: 'linkInformation',
     //            hint: 'upgrade',
     //            subSelections: linkInfo,
     //            message: 'Your current plan does not allow fetching this link information.'
     //       });
     //  }
     if (problems.length > 0) {
          var subSelections = [];
          var messages = [];
          _.each(problems, function (_e) {
               messages.push({
                    parent: _e.parent,
                    message: _e.message,
                    hint: _e.hint,
                    title: _e.title
               });
               //  if (typeof _e.subSelections !== 'undefined') {
               //       _.each(_e.subSelections, function (__e) {
               //            subSelections.push({
               //                 parent: _e.parent,
               //                 selection: __e,
               //                 message: _e.message
               //            });
               //       });
               //  }
          });
          promise.reject({
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'pageRequestValidate',
               message: messages
          });
     } else {
          promise.resolve(true);
     }
     return promise.promise;
}

var approvedRequestTypes = {
     //  site: siteRequestValidate,
     //  page: pageRequestValidate,
     //  summary: pageRequestValidate,
     'page:scan': pageRequestValidate,
     //  freeSummary: pageRequestValidate,
     //  link: linkRequestValidate,
     //  capture: captureRequestValidate
};

function validate(activity, request) {
     if (typeof approvedRequestTypes[request.type] !== 'undefined') {
          return approvedRequestTypes[request.type](activity, request);
     } else {
          var promise = q.defer();
          promise.reject({
               source: request.source,
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'validate',
               message: [{
                    parent: 'form',
                    message: 'denied:request:type'
               }]
          });
          return promise.promise;
     }
}

function _authorize(req) {
     var promise = q.defer();
     try {
          Activity.get({
               oid: req.oid,
               apiToken: req.token
          }, function (err, activity) {
               console.log('scan response: ', err, 'activity', activity, typeof activity);
               //  if (activity !== null) {
               console.log('1213')
               // activity = JSON.activity.toJSON();
               //  }
               if (err) {
                    console.log('1213');
                    promise.reject({
                         source: req.source,
                         success: false,
                         status: 'error',
                         _debug: 'Activity.get',
                         type: 'global',
                         message: [{
                              parent: 'form',
                              title: 'Invalid Token',
                              message: 'Failed to authenticate token.'
                         }]
                    });
               } else {
                    console.log('1223');
                    if (typeof activity === 'undefined' || activity === null) {
                         promise.reject({
                              source: req.source,
                              success: false,
                              status: 'error',
                              type: 'global',
                              _debug: 'Activity.get',
                              message: [{
                                   parent: 'form',
                                   title: 'Invalid Token',
                                   message: 'Invalid activity/token combination.'
                              }]
                         });
                    } else {
                         console.log('123');
                         promise.resolve(activity);
                    }
               }
          });
     } catch (e) {
          console.log('test', e);
          promise.reject({
               source: req.source,
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'activity.get',
               message: [{
                    parent: 'database',
                    title: 'Uh oh!',
                    message: 'Database Connection Issue',
                    _message: e
               }]
          });
     }
     return promise.promise;
}

function checkOptions(req) {
     var promise = q.defer();
     if (typeof req === 'undefined' || !req) {
          promise.reject({
               source: null,
               success: false,
               status: 'error',
               type: 'userInput',
               _debug: 'checkOptions',
               message: [{
                    parent: 'options',
                    title: 'Empty Request',
                    message: 'We need more information for this request'
               }]
          });
     } else {
          promise.resolve();
     }
     return promise.promise;
}

function checkRequirements(requirements, input) {
     var promise = q.defer();
     var _params = [];
     var passed = true;
     _.each(requirements, function (key) {
          if (typeof input[key] === 'undefined' || input[key] === '') {
               passed = false;
               _params.push(key);
          }
     });
     if (passed === true) {
          promise.resolve();
     } else {
          var messages = [];
          _.each(_params, function (param) {
               messages.push({
                    parent: param,
                    title: 'Oops!',
                    message: 'Missing required parameter: ' + param + '.'
               });
          });
          promise.reject({
               source: input.source,
               status: 'error',
               type: 'global',
               _debug: 'checkRequirements',
               success: false,
               message: messages
          });
     }
     return promise.promise;
}

function checkApiCall(req, params) {
     console.log('test');
     var promise = q.defer();
     checkOptions(req).then(function () {
          _log('server.js checkOptions success');
          checkRequirements(params, req).then(function () {
               _log('server.js checkRequirements success');
               _authorize(req).then(function (activity) {
                    _log('server.js _authorize success', permissions, activity, req.options.type);
                    var options = req.options;
                    utils.findSubscriptionByCustomer(activity.customerId).then(function (subscription) {
                         if (typeof subscription === undefined) {
                              promise.reject({
                                   source: req.source,
                                   status: 'error',
                                   type: 'global',
                                   _debug: 'findSubscriptionByCustomer',
                                   success: false,
                                   message: [{
                                        title: 'Subscription Error',
                                        message: 'Error fetching subscription.'
                                   }]
                              });
                              return
                         }
                         console.log('options.type',options);
                         utils._checkPlanActivity(options.type, activity, subscription.plan, function (err, decision) {
                              console.log('checkAvailActivity--', decision);
                              if (err) {
                                   promise.reject({
                                        source: req.source,
                                        status: 'error',
                                        type: 'global',
                                        _debug: 'checkRequirements',
                                        success: false,
                                        message: [{
                                             title: 'Activity Error',
                                             message: 'Error fetching activity history.'
                                        }]
                                   });
                                   return
                              } else if (decision === false) {
                                   promise.reject({
                                        source: req.source,
                                        status: 'error',
                                        type: 'global',
                                        _debug: 'checkRequirements',
                                        success: false,
                                        message: [{
                                             title: 'Activity',
                                             message: 'You have reached your usage limit. For the day or month.'
                                        }]
                                   });
                                   return
                              }
                              validate(activity, options).then(function () {
                                   _log('server.js checkRequestPermissions success');
                                   promise.resolve(activity, options);
                              }).catch(function (err) {
                                   _log('server.js checkApiCall checkRequestPermissions err', err);
                                   promise.reject(err);
                              });
                         });
                    }).catch(function (err) {
                         _log('server.js checkApiCall findSubscriptionByCustomer err', err);
                         promise.reject(err);
                    })
               }).catch(function (err) {
                    _log('server.js checkApiCall _authorize err', err);
                    promise.reject(err);
               });
          }).catch(function (err) {
               _log('server.js checkApiCall checkRequirements err', err);
               promise.reject(err);
          });
     }).catch(function (err) {
          _log('server.js checkApiCall checkOptions err', err);
          promise.reject(err);
     });
     return promise.promise;
}

function _preFlight(req, needs, callback, errCallback) {
     checkApiCall(req, needs).then(function (activity) {
          callback(activity);
     }).catch(function (err) {
          errCallback(err);
     });
}

module.exports = {
     _preFlight: _preFlight,
     checkApiCall: checkApiCall,
     checkRequirements: checkRequirements,
     checkOptions: checkOptions,
     validate: validate,
     _authorize: _authorize,
     siteRequestValidate: siteRequestValidate,
     linkRequestValidate: linkRequestValidate,
     captureRequestValidate: captureRequestValidate,
     pageRequestValidate: pageRequestValidate
};
