/**
 * @file File contains the validation and the submission to Rabbit MQ for any page scans
 * @module pageScan
 */
var sh = require('shorthash'),
     q = require('q'),
     publisher = require('../../amqp/publisher'),
     Request = require('../../models/index').request,
     utils = require('../../utils'),
     Activity = require('../../models/index').activity,
     permissions = {
       free: require('../permissions/free'),
       paid: require('../permissions/paid')
     },
     _preFlight = require('../preFlight')._preFlight,
     _log = require('../../debug');

/**
 * Checks that a user has provided the correct options needed for making a page
 * request, has enough credits and permission for their request, and then
 * publishes it to RabbitMQ to be consumed by the engine.
 * @function
 * @param {options} Object - {options:Object, token:String, url:String, uid:String}
 */
function pageScan(options) {
     var defer = q.defer();
     _log('pageScan.js init options:', options);
     _preFlight(options, ['options', 'token', 'url', 'uid'], function (user) {
       console.log('PREFLIGHT USER',user)
          // utils.findUser({
          //      uid: options.uid,
          //      apiToken: options.token
          // }, function (err, user) {
          //      if (err) {
          //           console.log('err', err);
          //      }
              //  console.log('permissions[user.plan]',permissions[user.plan]);
              //  console.log('options.options',options.options);
              //  var validateOptions(options.options,permissions[user.plan]);
              //  utils.findSomeBy(Permission, {
              //       label: user.plan
              //  }, function (err, permissions) {
                    // console.log('Permission queryOne -->', permissions, err);
                    // if (err) {
                        //  console.log('err', err);
                    // }

                    _log('pageScanRequest _preFlight success');
                    var message = {
                         requestDate: +new Date(),
                         uid: options.uid,
                         url: options.url,
                         page: options.page,
                         options: options.options
                    };
                    message.requestId = sh.unique(JSON.stringify(message));
                    var request = new Request(message);
                    request.save(function (err, res) {
                         _log('pageScanRequest request saved');
                         if (err) {
                              _log('pageScanRequest save error', 'error');
                              defer.reject({
                                   page: options.page,
                                   success: false,
                                   status: 'error',
                                   statusType: 'failed',
                                   type: 'global',
                                   _debug: 'request.save',
                                   message: [{
                                        parent: 'global',
                                        title: 'Opps... ',
                                        message: 'Trouble saving request'
                                   }]
                              });
                         } else {

                              _log('pageScanRequest saved', 'success');
                              publisher.publish("", "summary", new Buffer(JSON.stringify(message))).then(function (e) {
                                   _log('pagescanrequest publish success', 'success');
                                   utils.updateActivity(user.oid, 'request',function(err,data){
                                      console.log('UPDATE ACTIVITY',err,data);
                                   });

                                   defer.resolve({
                                        page: options.page,
                                        success: true,
                                        status: 'success',
                                        statusType: 'update',
                                        _debug: 'publisher.publish',
                                        type: 'request',
                                        message: [{
                                             parent: 'global',
                                             status: 'success',
                                             requestId: message.requestId,
                                             message: 'Request sent to queue. It should begin shortly.'
                                        }]
                                   });
                              }).catch(function (err) {
                                   _log('pagescanrequest publish error', 'error', err);
                                   defer.reject({
                                        page: options.page,
                                        success: false,
                                        status: 'error',
                                        statusType: 'failed',
                                        type: 'global',
                                        _debug: 'publisher.publish',
                                        _err: err,
                                        message: [{
                                             requestId: message.requestId,
                                             parent: 'global',
                                             title: 'Opps... ',
                                             message: 'Request saved, but there was an error while sending it to the queue.'
                                        }]
                                   });
                              });
                         }
                    // });
              //  });
          });
     }, function (err) {
          _log('pageScan.js _prelight failed', 'error', err);
          defer.reject(err);
     });
     return defer.promise;
}

module.exports = pageScan;
