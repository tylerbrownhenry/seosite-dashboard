#!/usr/bin/env node

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

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    apiRequests(socket);
    apiCallbacks(socket);
});

module.exports = io;