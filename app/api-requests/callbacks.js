var socket = {},
     Scan = require('../models/scan'),
     Update = require('../models/update'),
     Request = require('../models/request'),
     Link = require('../models/link'),
     _ = require('underscore'),
     utils = require('../utils');
     // var Request = require('../../server/models/request');

// function sendStatus(req) {
//      socket.emit('alert/' + req.uid);
// }

function sendStatus(req) {
     console.log('callbacks -> sendStatus req',req);
     socket.emit('statusUpdate/' + req.uid);
}

function broadcastAll(message) {
     socket.emit('broadcastAll', message);
}

function callbacks(_socket) {
     console.log('it has begun!');

     socket = _socket;

     socket.on('get:scan', function (e) {
          console.log('e', e);
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
               console.log('data', data);
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
          console.log('e');
          if (!e || !e.uid) {
               return;
          }
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
          utils.findSomeBy(Link, {
               uid: e.uid,
               requestId: e.requestId
          }, function (err, links) {
               socket.emit('scanData/' + e.uid + '/' + e.apiToken + '/' + e.requestId, links);
          });
     });

     socket.on('getScans', function (e) {
          // console.log('e');
          // if (!e || !e.uid) {
              //  return;
          // }
          // utils.getScans(Request,Scan,e,function(err,scans){
          //   if(err){
          //     /* Emit an error or something */
          //   } else {
          //     socket.emit('setScans/' + e.uid + '/' + e.apiToken, scans);
          //   }
          // });
     });

     socket.on('getUpdates', function (e) {
          console.log('callbacks --> getUpdates e', e);
          if (!e || !e.uid) {
               return;
          }
          utils.findSomeBy(Update, {
               uid: e.uid
              //  apiToken:e.apiToken
          }, function (err, r) {
               console.log('err', err, 'r', r);
               if (typeof r === 'undefined') {
                    console.log('err', err, 'r', r);
                    return;
               }
               var messages = r;
               console.log('messages', r);
               var currentPageMessages = [];
               var appMessages = [];
               var messageToDelete = []
               _.each(messages, function (message) {
                    console.log('message', message.page, e.currentPage, message.page === e.currentPage);
                    if (message.page === e.currentPage) {
                      console.log('this page');
                         currentPageMessages.push(message);
                         messageToDelete.push({
                              id: message.id
                         });
                    } else {
                         appMessages.push(message);
                    }
               });
               /**
                * Clears out messages that have been delivered
                */
               Update.batchDelete(messageToDelete, function (err) {
                    if (err) {
                         return console.log(err);
                    }
                    console.log('callbacks message successfully deleted');
               });

               socket.emit('updates/' + e.uid + '/' + e.apiToken, {
                    page: currentPageMessages,
                    app: appMessages
               });
          });
     });
}

module.exports.callbacks = callbacks;
module.exports.sendStatus = sendStatus;
module.exports.broadcastAll = broadcastAll;
