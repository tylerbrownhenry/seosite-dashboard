#!/usr/bin/env node
require('dotenv').config();

var debug = require('debug')('app');
var app = require('./server/index');
var apiRequests = require('./api-requests/requests');
var apiCallbacks = require('./api-requests/callbacks').callbacks;
var secrets = require('./server/config/secrets');


app.set('port', process.env.PORT || 3000);

app.set('superSecret', secrets.apiToken); // secret variable

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

process.on('uncaughtException', function (err) {
    console.log('Error',err);
});

var io = require('socket.io').listen(server);

if(process.env.NODE_ENV !== 'dev'){
    /* If local do not use */
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
}

io.sockets.on('connection', function (socket) {
    apiRequests(socket);
    apiCallbacks(socket);
});


module.exports = io;

