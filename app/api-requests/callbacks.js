var socket = {};
// var Alert = require('../../app/models/alert');
var Scan = require('../models/scan');
// var Link = require('../../server/models/link');
// var Request = require('../../server/models/request');
var _ = require('underscore');
var utils = require('../utils');

function sendStatus(req) {
     console.log('req', req.body);
     console.log('request/complate/' + req.body.uid);

     socket.emit('alert/' + req.body.uid, req.body);

}

function broadcastAll(message) {
     socket.emit('broadcastAll', message);
}

function callbacks(_socket) {
     console.log('it has begun!');

     socket = _socket;

     socket.on('get:scan', function (e) {
          console.log('e', e);

          // e { uid: '17PmsI',
          //   page: '/dashboard',
          //   message: 'Scan complete!',
          //   type: 'request',
          //   status: 'complete',
          //   progress: 'init',
          //   loadingSelector: '.js_temp_request_null',
          //   alertSelector: '.js_request_2jgEfQ',
          //   saved: true,
          //   i_id: '2jgEfQ' }
          utils.findBy(Scan, {
               uid: e.uid,
               requestId: e.message.i_id
          }, function (err, data) {
               console.log('found');
               if (err) {
                    socket.emit('render:scan:' + e.uid + '/' + e.apiToken, {
                         data: {
                              message: 'Could not located scan information.'
                         },
                         selector: e.alertSelector
                    });
               } else {
                    socket.emit('render:scan:' + e.uid + '/' + e.apiToken, {
                         data: data,
                         selector: e.alertSelector
                    });
               }
               console.log('data',data);
               // var scans = {message: '', list: []};
               // if(err === null){
               //     scans.message = 'Request found!';
               //     scans.list = data;
               // } else {
               //     scans.message = err;
               // }
               //     console.log('YESSSSSSSS3',req.user);
               //     res.render(req.render, {templates: templates, user: req.user, form: form, error: error, plans: plans, scans: scans});
          });

     });

     function bulkDelete(links) {
          var commands = [];
          _.each(links, function (link) {
               commands.push({
                    deleteOne: {
                         "filter": {
                              "_id": link._id
                         }
                    }
               });
          });
          return commands;
     }

     socket.on('handleScan', function (e) {
          utils.findBy(Scan, {
               uid: e.uid,
               requestId: e.requestId
          }, function (err, data) {
               if (data) {
                    socket.emit('deleteCallBack', {
                         captures: data.captures,
                         data: e
                    });
                    utils.deleteBy(Scan, {
                         uid: e.uid,
                         requestId: e.requestId
                    });

                    utils.deleteBy(Request, {
                         uid: e.uid,
                         requestId: e.requestId
                    });
                    utils.findBy(Link, {
                         uid: e.uid,
                         requestId: e.requestId
                    }, function (err, r) {
                         console.log('Scan data', err, r.length);
                         var commands = bulkDelete(r);
                         Link.collection.bulkWrite(commands, {}, function (err, e) {
                              console.log('Error/Success pageScanner...3', err, e);
                         });

                    });
               }
          })
     });

     socket.on('getScanData', function (e) {
          console.log('huh?', e);
          utils.findBy(Link, {
               uid: e.uid,
               requestId: e.requestId
          }, function (err, links) {
               console.log('huh?!!');
               // Resources.find({uid:e.uid,requestId:e.requestId}).lean().exec(function(err,resources){
               socket.emit('scanData/' + e.uid + '/' + e.apiToken + '/' + e.requestId, links);
               // });
          });
     });

     socket.on('getScans', function (e) {
          utils.findBy(Request, {
               uid: e.uid
          }, function (err, data) {
               console.log('Request data');
               var requests = data;
               utils.findBy(Scan, {
                    uid: e.uid
               }, function (err, data) {
                    console.log('Scan data', data);
                    var scans = {
                         message: '',
                         list: []
                    };
                    if (err === null) {
                         scans.message = 'Request found!';
                         scans.list = _.uniq(_.union(data, requests), false, function (item) {
                              return item.requestId;
                         });
                    } else {
                         scans.message = err;
                    }
                    console.log('scans!!!!');
                    socket.emit('setScans/' + e.uid + '/' + e.apiToken, scans);
               });
          });
     });

     socket.on('getAlerts', function (e) {
          console.log('e', e);
          if (!e || !e.uid) {
               return;
          }
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          console.log('FETCHING ALERTS DISABLED UNTIL RESTRUCTURED');
          return
          /* was originally findOne */
          /* was originally findOne */
          /* was originally findOne */
          /* was originally findOne add limit?*/
          utils.findBy(Alert, {
               uid: e.uid
          }, function (err, r) {
               if (typeof r === 'undefined') {
                    console.log('err', err, 'r', r);
                    return;
               }
               var messages = r.messages;
               console.log('messages', r, _.keys(r));
               var showMessages = [];
               var keepingMessages = [];
               _.each(messages, function (message) {
                    console.log('message', message.page, e.currentPage, message.page === e.currentPage);
                    if (message.page === e.currentPage) {
                         showMessages.push(message);
                    } else {
                         keepingMessages.push(message);
                    }
               });
               socket.emit('alerts/' + e.uid, {
                    page: showMessages,
                    app: keepingMessages
               });
               /* Erase 'read' messages */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* Erase 'read' messages */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* Erase 'read' messages */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               /* this will need to be addressed... */
               // Alert.collection.update({
               //      uid: e.uid
               // }, {
               //      $set: {
               //           "messages": keepingMessages
               //      }
               // });
          });
     });
}

module.exports.callbacks = callbacks;
module.exports.sendStatus = sendStatus;
module.exports.broadcastAll = broadcastAll;
