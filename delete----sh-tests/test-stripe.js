require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

// var sh = require("shorthash"),
    //  findOrCreateUser = require('./app/middleware/passport-create-user');
var subscriptionController = require('./app/controllers/subscriptions/subscription-controller');
subscriptionController.createCustomer({email:'001@tylerbrownhenry.com'},function(err,res){
  console.log('err',err,'res',res);
})
