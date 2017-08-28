require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var generate = require('./app/controllers/pages/scan/scan-controller').generateReport;

generate('Z1l3BO9','embed:scan','success');
