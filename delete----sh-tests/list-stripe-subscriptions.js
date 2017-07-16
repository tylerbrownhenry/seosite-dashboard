require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var subscriptionController = require('./app/controllers/subscriptions/subscription-controller');
subscriptionController.listSubscriptions(function(err,res){
  console.log('err',err,'res',res);
})
