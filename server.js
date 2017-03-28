#!/usr/bin/env node

require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var amqpConnection = require('./app/amqp/amqp'),
     debug = require('debug')('app'),
     app = require('./app/index'),
     apiRequests = require('./app/api-requests/requests'),
     apiCallbacks = require('./app/api-requests/callbacks').callbacks,
     secrets = require('./app/config/secrets');

app.set('port', process.env.PORT || 3000);
app.set('superSecret', secrets.apiToken); // secret variable

var server = app.listen(app.get('port'), function () {
     console.log('Express server listening on port ' + server.address().port);
});

process.on('uncaughtException', function (err) {
     console.log('Error', err);
});

var io = require('socket.io').listen(server);

if (process.env.NODE_ENV !== 'dev') {
    //  io.set('transports', ['xhr-polling']);
    //  io.set('polling duration', 10);
}

io.sockets.on('connection', function (socket) {
     apiRequests(socket);
     apiCallbacks(socket);
     amqpConnection();
});

module.exports = io;
