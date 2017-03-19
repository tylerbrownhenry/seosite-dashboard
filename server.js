#!/usr/bin/env node

require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

// var AWS = require("aws-sdk");
//
// AWS.config.update({
//      region: "us-west-2",
//      endpoint: process.env.AWS_DYNAMODB_ENDPOINT
// });
//
// var dynamodb = new AWS.DynamoDB();
//
// var params = {
//      TableName: "User"
// };
//
// dynamodb.deleteTable(params, function (err, data) {
//      if (err) {
//           console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//      } else {
//           console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//      }
// })
// dynamodb.createTable(params);

var amqpConnection = require('./app/amqp/amqp');
var debug = require('debug')('app');
var app = require('./app/index');
var apiRequests = require('./app/api-requests/requests');
var apiCallbacks = require('./app/api-requests/callbacks').callbacks;
var secrets = require('./app/config/secrets');

app.set('port', process.env.PORT || 3000);
app.set('superSecret', secrets.apiToken); // secret variable

var server = app.listen(app.get('port'), function () {
     console.log('Express server listening on port ' + server.address().port);
});
amqpConnection();
process.on('uncaughtException', function (err) {
     console.log('Error', err);
});

var io = require('socket.io').listen(server);

if (process.env.NODE_ENV !== 'dev') {
     console.log('here');
     /* If local do not use */
     io.set('transports', ['xhr-polling']);
     io.set('polling duration', 10);
}

console.log('here');
io.sockets.on('connection', function (socket) {
     console.log('here socket');
     apiRequests(socket);
     apiCallbacks(socket);
});

module.exports = io;
