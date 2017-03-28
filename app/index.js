'use strict';
// var secrets = require('./../config/secrets');
// var favicon = require('serve-favicon');
require('dotenv').config();
var AWS = require('aws-sdk'),
     express = require('express'),
     expressLayouts = require('express-ejs-layouts'),
     path = require('path'),
     logger = require('morgan'),
     cookieParser = require('cookie-parser'),
     session = require('express-session'),
     passport = require('passport'),
     bodyParser = require('body-parser'),
     compress = require('compression')(),
     lodash = require('lodash'),
     expressValidator = require('express-validator'),
     errorHandler = require(path.join(__dirname + '/middleware/error')),
     viewHelper = require(path.join(__dirname + '/middleware/view-helper')),
     flash = require('express-flash'),
     cors = require('cors'),
     corsOptions = {
          origin: '*'
     },
     staticDir,
     corsOptions = {
          origin: '*'
     };

var app = express();
// setup db
// mongoose.connect(secrets.db);
// mongoose.connection.on('error', function (e) {
//      console.error('MongoDB Connection Error. Make sure MongoDB is running.', e);
// });

// express setup

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
