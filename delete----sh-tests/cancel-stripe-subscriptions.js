require('dotenv').config();
var dynamoose = require('dynamoose');
var _ = require('underscore');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

var subscriptionController = require('./app/controllers/subscriptions/subscription-controller');
subscriptionController.listSubscriptions(function (err, res) {
     console.log('err', err, 'res', res);
     _.each(res.data, function (subscription) {
          subscriptionController.cancelSubscription(subscription.id, function (err, res) {
               console.log('cancelled: res', res, subscription.id);
          }, true);
     });
})
