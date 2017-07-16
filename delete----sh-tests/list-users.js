require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var listUsers = require('./app/utils').getAllUsers;


listUsers(function (res) {
     console.log('done',res);
});
