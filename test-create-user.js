require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var sh = require("shorthash"),
     findOrCreateUser = require('./app/middleware/passport-create-user');

var fakeEmail = sh.unique(String(new Date())) + '@email.com';
console.log('fake', fakeEmail);
var req = {
     body: {
          email: fakeEmail
     },
     session: {
          cookie: {

          },
          touch: function () {

          }
     },
     flash: function(){

     }
};

findOrCreateUser(req, fakeEmail, 'fakePassword', function () {
     console.log('done');
}, console);
