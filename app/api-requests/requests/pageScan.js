/**
 * @file File contains the validation and the submission to Rabbit MQ for any page scans
 * @module pageScanRequest
 */

var sh = require('shorthash'),
     q = require('q'),
     publisher = require('../../amqp/publisher'),
     Request = require('../../models/index').request,
     _preFlight = require('../preFlight')._preFlight,
     _log = require('../../debug');
//  notify = require('../../notify');
/**
 * Checks that a user has provided the correct options needed for making a page
 * request, has enough credits and permission for their request, and then
 * publishes it to RabbitMQ to be consumed by the engine.
 * @function
 * @param {options} Object - {options:Object, token:String, url:String, uid:String}
 */

function pageScanRequest(options) {
     var defer = q.defer();
     _log('pageScan.js init');
     _preFlight(options, ['options', 'token', 'url', 'uid'], function () {
          _log('pageScanRequest _preFlight success');
          var message = {
               requestDate: Date.now(),
               uid: options.uid,
               url: options.url,
               options: options.options
          };
          message.requestId = sh.unique(JSON.stringify(message));
          var request = new Request(message);
          request.save(function (err,res) {
               _log('pageScanRequest request saved');
               if (err) {
                    _log('pageScanRequest save error', 'error');
                    defer.reject({
                         success: false,
                         status: 'error',
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

                         defer.resolve({
                              success: true,
                              status: 'success',
                              _debug: 'publisher.publish',
                              type: 'request',
                              message: [{
                                   parent: 'global',
                                   title: 'Whoo!',
                                   requestId: message.requestId,
                                   message: 'Request sent to queue. It should begin shortly.'
                              }]
                         });
                         //  notify({
                         //       message: 'Starting Scan!',
                         //       uid: user.uid,
                         //       page: req.page,
                         //       type: req.type,
                         //       requestDate: requestDate,
                         //       status: 'pending',
                         //       temp_id: req.temp_id,
                         //       i_id: requestId
                         //  });
                    }).catch(function (err) {
                         _log('pagescanrequest publish error', 'error', err);
                         defer.reject({
                              success: false,
                              status: 'error',
                              type: 'global',
                              _debug: 'publisher.publish',
                              _err: err,
                              message: [{
                                   parent: 'global',
                                   title: 'Opps... ',
                                   message: 'Request saved, but there was an error while sending it to the queue.'
                              }]
                         });

                         //  notify({
                         //       message: JSON.stringify(err.message),
                         //       uid: user.uid,
                         //       page: req.page,
                         //       type: req.type,
                         //       status: 'error',
                         //       temp_id: req.temp_id,
                         //       i_id: requestId
                         //  });
                    });
               }
          });

     }, function (err) {
          _log('pageScan.js _prelight failed', 'error', err);
          defer.reject(err);
     });
     return defer.promise;
}

module.exports = pageScanRequest;
