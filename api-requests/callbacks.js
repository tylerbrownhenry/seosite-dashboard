var socket = {};
var Alert = require('../server/models/alert');
var Scan = require('../server/models/scan');
var Link = require('../server/models/link');
var Request = require('../server/models/request');
var _ = require('underscore');

function sendStatus(req, res, next) {
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
          console.log('e', e)

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

          Scan.findOne({
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
               // // console.log('data',data);
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
          Scan.findOne({
               uid: e.uid,
               requestId: e.requestId
          }).lean().exec(function (err, data) {
               if (data) {
                    socket.emit('deleteCallBack', {
                         captures: data.captures,
                         data: e
                    });
                    Scan.collection.remove({
                         uid: e.uid,
                         requestId: e.requestId
                    });
                    Request.collection.remove({
                         uid: e.uid,
                         requestId: e.requestId
                    });
                    Link.find({
                         uid: e.uid,
                         requestId: e.requestId
                    }).lean().exec(
                         function (err, r) {
                              console.log('Scan data', err, r.length);
                              var commands = bulkDelete(r);
                              Link.collection.bulkWrite(commands, {}, function (err, e) {
                                   console.log('Error/Success pageScanner...3', err, e);
                              });

                         });
               }
          });
     });

     socket.on('getScanData', function (e) {
          console.log('huh?', e);
          Link.find({
               uid: e.uid,
               requestId: e.requestId
          }).lean().exec(function (err, links) {
               console.log('huh?!!');
               // Resources.find({uid:e.uid,requestId:e.requestId}).lean().exec(function(err,resources){
               socket.emit('scanData/' + e.uid + '/' + e.apiToken + '/' + e.requestId, links);
               // });
          });
     });

     socket.on('getScans', function (e) {
          Request.find({
               uid: e.uid
          }, function (err, data) {
               console.log('Request data');
               var requests = data;
               Scan.find({
                    uid: e.uid
               }, function (err, data) {
                    console.log('Scan data', data);
                    var scans = {
                         message: '',
                         list: []
                    };
                    if (err === null) {
                         scans.message = 'Request found!';
                         scans.list = _.uniq(_.union(data, requests), false, function (item, key, a) {
                              return item.requestId;
                         });
                    } else {
                         scans.message = err;
                    }
                    console.log('scans!!!!');
                    socket.emit('setScans/' + e.uid + '/' + e.apiToken, scans);
               });
          });
     })

     socket.on('getAlerts', function (e) {
          console.log('e', e);
          if (!e || !e.uid) {
               return;
          }
          /* There is a cleaner way of doing this but couldnt get it to work
          after 3 hours so doing it this way... */
          Alert.findOne({
               uid: e.uid
          }).lean().exec(
               function (err, r) {
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
                    Alert.collection.update({
                         uid: e.uid
                    }, {
                         $set: {
                              "messages": keepingMessages
                         }
                    })
               }
          );
     });
}

module.exports.callbacks = callbacks;
module.exports.sendStatus = sendStatus;
module.exports.broadcastAll = broadcastAll;
