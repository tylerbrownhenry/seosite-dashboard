#!/usr/bin/env node

var secret = '530d0C$3cr3T';
var debug = require('debug')('app');
var app = require('./server/index');
var secrets = require('./server/config/secrets');

app.set('port', process.env.PORT || 3000);

app.set('superSecret', secret.apiToken); // secret variable

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
