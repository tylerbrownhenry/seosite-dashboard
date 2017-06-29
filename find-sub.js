require('dotenv').config();
var dynamoose = require('dynamoose');

dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});
var utils = require('./app/utils'),
     Subscription = require('./app/models/subscription');

// utils.findSubscription({
//      customerIdIndex: 'cus_AuOpdDK9yMNdXU'
// }, function (err, res) {
//      console.log('res', res);
//
// });

// Subscription.scan().exec(function (err, subscription) {
//      console.log('scan Subscriptions', subscription)
//
// });
//
// Subscription.scan({
//      subscriptionId: 'sub_AuymlvcnHpluR3'
// }).exec(function (err, subscription) {
//      console.log('scan Subscription', subscription)
// });

// Subscription.query('subscriptionId').eq('sub_AuymlvcnHpluR3').exec(function (err, subscription) {
//      console.log('Subscription', subscription)
// });

utils.findSubscriptionByCustomer('cus_Av1YQmIRGhP9J4').then(function (subscription) {
     console.log('subObj', subscription);
    //  utils.updateSubscription({
    //       oid: subscription.oid
    //  }, {
    //       periodStart: new Date(),
    //       periodEnd: new Date()
    //  }, function (err) {
    //       console.log('test', err);
    //  });
});
// Subscription.query('customerIdIndex').eq('cus_AuymGtskJUlkCq').exec(function (err, subscription) {
//   console.log('Subscription',subscription)
// });
