'use strict';
var AWS = require('aws-sdk');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
// var secrets = require('./../config/secrets');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

// var MongoStore = require('connect-mongo')({
//  session: session
// });
// var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var compress = require('compression')();
var lodash = require('lodash');
var expressValidator = require('express-validator');
var errorHandler = require(path.join(__dirname + '/middleware/error'));
var viewHelper = require(path.join(__dirname + '/middleware/view-helper'));
var flash = require('express-flash');
var cors = require('cors');
var corsOptions = {
     origin: '*'
};
var staticDir;

// setup db
// mongoose.connect(secrets.db);
// mongoose.connection.on('error', function (e) {
//      console.error('MongoDB Connection Error. Make sure MongoDB is running.', e);
// });

var corsOptions = {
     origin: '*'
};

// express setup
var app = express();

if (app.get('env') === 'production') {
     app.locals.production = true;
     staticDir = path.join(__dirname + '/../public');
} else {
     app.locals.production = false;
     staticDir = path.join(__dirname + '/../public');
}

// This is where all the magic happens!
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.locals._ = lodash;
app.locals.stripePubKey = process.env.STRIPE_PUB_KEY;
app.locals.CURRENT_HOST = process.env.CURRENT_HOST;

// app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));
app.use(logger('dev'));

app.use(compress);
app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(cookieParser());

app.use(express.static(staticDir));
// if (app.get('env') !== 'production') {
//  app.use('/styles', express.static(__dirname + '/tmp/styles'));
// }
var DynamoDBStore = require('connect-dynamodb')({
     session: session
});

var options = {
     AWSConfigJSON: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
     },
     client: new AWS.DynamoDB({
          endpoint: new AWS.Endpoint(process.env.AWS_DYNAMODB_ENDPOINT)
     })
};

app.use(session({
     resave: true,
     saveUninitialized: true,
     cookie: {
          expiresIn: '14d',
          maxAge: 60 * 1000 // 1 minute
     },
     secret: process.env.SESSION_SECRET,
     store: new DynamoDBStore(options)
}));

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

// other
app.use(flash());
app.use(cors(corsOptions));

var passportMiddleware = require('./middleware/passport');
passportMiddleware(passport);

// setup view helper
app.use(viewHelper);

// setup routes
var routes = require('./routes');
routes(app, passport);

/// catch 404 and forwarding to error handler
app.use(errorHandler.notFound);

/// error handlers
if (app.get('env') === 'development') {
     app.use(errorHandler.development);
} else {
     app.use(errorHandler.production);
}

module.exports = app;
