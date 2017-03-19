var User = require('./../models/user'),
     q = require('q'),
     _log = require('./../debug'),
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

function pageRequestValidate(usr, request) {
     console.log('user', usr[0], 'request', request, 'permissions', permissions);
     var promise = q.defer();
     var user = usr[0];
     var perm = permissions[user.plan];
     var problems = [];
     if (perm.restrictions.type[request.type] === false) {
          problems.push({
               parent: 'type',
               hint: 'upgrade',
               message: 'Your current plan does not allow requests of this type: ' + request.type + '.'
          });
     }
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
     if (request.filterLevel >= perm.restrictions.filterLimit) {
          problems.push({
               parent: 'filterLimit',
               hint: 'upgrade',
               message: 'You have selected a filter level of "' + request.filterLevel + '". Your current plan allows a maximum filter level of "' + perm.restictions.filterLimit + '".'
          });
     }
     if (request.digDepth >= perm.restrictions.digDepth) {
          problems.push({
               parent: 'digDepth',
               hint: 'upgrade',
               message: 'You have selected a dig depth of "' + request.digDepth + '". Your current plan allows a maximum dig depth of "' + perm.restictions.digLimit + '".'
          });
     }
     if (request.honorRobotExclusions === false && perm.restrictions.honorRobotExclusions.canDisable === false) {
          problems.push({
               parent: 'honorRobotExclusions',
               hint: 'upgrade',
               message: 'Your current plan does not allow disabling honor robot exclusions '
          });
     }
     if (request.excludeExternalLinks === true && perm.restrictions.excludeExternalLinks.canDisable === false) {
          problems.push({
               parent: 'excludeExternalLinks',
               hint: 'upgrade',
               message: 'Your current plan does not allow enabling of including external links.'
          });
     }
     // if(typeof request.excludedSchemes !== 'undefined' && perm.restrictions.excludedSchemes.canUse === false){
     //     problems.push({response: false, selection: 'excludeExternalLinks', message:'Your current plan does not allow change excluded schemas.'});
     // }

     if (request.acceptedSchemes.indexOf('https') !== -1 && perm.restrictions.acceptedSchemes['https'] === false) {
          problems.push({
               parent: 'acceptedSchemes',
               hint: 'upgrade',
               message: 'Your current plan does not allow acceptedSchemes ' + request.acceptedSchemes + '.'
          });
     }
     var failed = false;
     var linkInfo = [];
     _.each(_.keys(request.linkInformation), function (infoSelect) {
          if (perm.restrictions.linkInformation[infoSelect] === false && request.linkInformation[infoSelect] === true) {
               failed = true;
               linkInfo.push(infoSelect);
          }
     });
     if (failed === true) {
          problems.push({
               parent: 'linkInformation',
               hint: 'upgrade',
               subSelections: linkInfo,
               message: 'Your current plan does not allow fetching this link information.'
          });
     }
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
               if (typeof _e.subSelections !== 'undefined') {
                    _.each(_e.subSelections, function (__e) {
                         subSelections.push({
                              parent: _e.parent,
                              selection: __e,
                              message: _e.message
                         });
                    });
               }
          });
          promise.reject({
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'pageRequestValidate',
               subSelections: subSelections,
               message: messages
          });
     } else {
          promise.resolve(true);
     }
     return promise.promise;
}

var approvedRequestTypes = {
     site: siteRequestValidate,
     page: pageRequestValidate,
     summary: pageRequestValidate,
     freeSummary: pageRequestValidate,
     link: linkRequestValidate,
     capture: captureRequestValidate
};

function validate(user, request, permissions) {
     if (typeof approvedRequestTypes[request.type] !== 'undefined') {
          return approvedRequestTypes[request.type](user, request, permissions);
     } else {
          var promise = q.defer();
          promise.reject({
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'validate',
               message: [{
                    parent: 'form',
                    message: 'Cannot make a request of this type:' + request.type
               }]
          });
          return promise.promise;
     }
}

function _authorize(req) {
     var promise = q.defer();
     try {
          //  User.queryOne("label").eq(user.plan).exec(function (err, permissions) {

          console.log('testauthorisse', User.scan);
          User.scan({
               uid: req.uid,
               apiToken: req.token
          }, function (err, user) {
               console.log('scan response: ', err, 'user', user, typeof user);
               //  if (user !== null) {
               // console.log('1213')
               // user = JSON.puser.toJSON();
               //  }
               if (err) {
                    console.log('1213');
                    promise.reject({
                         success: false,
                         status: 'error',
                         _debug: 'User.findOne',
                         type: 'global',
                         message: [{
                              parent: 'form',
                              title: 'Rats... ',
                              message: 'Failed to authenticate token.'
                         }]
                    });
               } else {
                    console.log('1223');
                    if (typeof user === 'undefined' || user === null) {
                         promise.reject({
                              success: false,
                              status: 'error',
                              type: 'global',
                              _debug: 'User.findOne',
                              message: [{
                                   parent: 'form',
                                   title: 'Shucks... ',
                                   message: 'Invalid user/token combination.'
                              }]
                         });
                    } else {
                         console.log('123');
                         promise.resolve(user);
                    }
               }
          });
     } catch (e) {
          console.log('test', e);
          promise.reject({
               success: false,
               status: 'error',
               type: 'global',
               _debug: 'User.findOne',
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
               success: false,
               status: 'error',
               type: 'userInput',
               _debug: 'checkOptions',
               message: [{
                    parent: 'options',
                    title: 'Doh! ',
                    message: 'Empty request'
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
               _authorize(req).then(function (user) {
                    _log('server.js _authorize success');
                    var options = req.options;
                    validate(user, options, permissions[user.plan]).then(function () {
                         _log('server.js checkRequestPermissions success');
                         promise.resolve(user, options);
                    }).catch(function (err) {
                         _log('server.js checkApiCall checkRequestPermissions err', err);
                         promise.reject(err);
                    });
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
     console.log('test22');
     checkApiCall(req, needs).then(function (user) {
          callback(user);
     }).catch(function (err) {
          errCallback(err);
          // notify({
          //      message: JSON.stringify(err.message),
          //      title: 'Validation Error',
          //      uid: req.body.uid,
          //      page: req.body.page,
          //      type: req.body.type,
          //      temp_id: req.body.temp_id,
          //      i_id: null,
          //      status: 'error',
          // });
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
