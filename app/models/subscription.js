var dynamoose = require('dynamoose'),
     secrets = require('../config/secrets');

var subscriptionSchema = new dynamoose.Schema({
     customerId: {
          type: String,
          hashKey: true
     },
     subscriptionId: {
          type: String,
     },
     oid: {
          type: String,
     },
     plan: {
          type: String,
          default: secrets.stripeOptions.defaultPlan
     },
     last4: {
          type: String
     },
     apiToken: {
          type: String
     },
     activeUntil: {
          type: Date
     },
     created: {
          type: Date,
     },
     frequency: {
          type: String
     },
     cancelAtPeriodEnd: {
          type: Boolean
     },
     canceledAt: {
          type: Number
     },
     status: {
          type: String
     },
     periodStart: {
          type: Number
     },
     periodEnd: {
          type: Number
     }
});

module.exports = dynamoose.model('__Subscription', subscriptionSchema, {
     create: true, // Create table in DB, if it does not exist,
});
