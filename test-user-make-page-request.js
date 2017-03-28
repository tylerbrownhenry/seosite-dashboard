var args = process.argv.slice(2);

require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});
var amqpConnection = require('./app/amqp/amqp');
amqpConnection(function () {

     var utils = require('./app/utils');
     var Request = require('./app/models/request');

     var pageScan = require('./app/api-requests/requests/pageScan');
     var PageScanOptions = require('./app/api-requests/requests/pageScanOptions');

     utils.findOneUser({
          email: 'me@tylerbrownhenry.com'
     }, function (err, user) {
          utils.checkActivity(user.oid, function (err, _activity) {
              //  console.log('_activity before', _activity['page-day-count']);
               var data = {
                    uid: user.uid,
                    url: args[0],
                    page: 'summary',
                    type: 'page',
                    temp_id: '1',
                    token: user.apiToken
               }
               var options = new PageScanOptions(data);
               pageScan(options).then(function (res) {
                    var requestId = res.message[0].requestId;
                    utils.findBy(Request, {
                         requestId: requestId
                    }, function (err, request) {
                         console.log('request', request.requestId);
                    });
                    utils.checkActivity(user.oid, function (err, _activity) {
                        //  console.log('_activity after', _activity['page-day-count']);
                   });
               }).catch(function (err) {
                    console.log('err', err);
               })
          });
     });
});
