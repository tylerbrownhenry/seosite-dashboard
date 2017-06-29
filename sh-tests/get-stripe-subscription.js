require('dotenv').config();
var dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
     region: "us-west-2",
     endpoint: process.env.AWS_DYNAMODB_ENDPOINT
});

// var sh = require("shorthash"),
//  findOrCreateUser = require('./app/middleware/passport-create-user');
var subscriptionController = require('./app/controllers/subscriptions/subscription-controller');


// subscriptionController.switchSubscription('sub_Anqa9qyh6A3kxz','monthlypersonal',function(err,res){
//   console.log('post update',res)
// });
subscriptionController.getSubscription('sub_Anqa9qyh6A3kxz', function (err, res) {
     // subscribed on 853pm june 7 2017
    // current sub scription;

    console.log('currentPlan', res);

  });
     subscriptionController.getUpcomingInvoice('cus_AnU8pgHMiaQGMc', function (err, res) {
    //
          console.log('nextInvoice', res);
    //       subscriptionController.projectUpgradeCost('cus_AnU8pgHMiaQGMc', 'sub_Anqa9qyh6A3kxz', 'monthlypersonal', function (err, res) {
    //            console.log('ifUpdaded...', res);
    //       });
     });

     // }

     // Current Subscription:
     // Price Frequency:
     // Next Bill Date:
     // Cancelled On:
     // Will Expire On:
     // Upgrade Options:
     //   -- Annually
     //   -- Hire Plan -> Frequency
     // --------------------
     // Supplment:
     //   -- Price
     // Auto Supplement
     // --------------------

     // current_period_end
     // current_period_start
     // canceled_at
     // cancel_at_period_end
     // if(res.cancel_at_period_end === true){
     //
     // }
// });
//
//
// { id: 'sub_AnT86wCZllSooD',
//   object: 'subscription',
//   application_fee_percent: null,
//   cancel_at_period_end: true,
//   canceled_at: 1496881241,
//   created: 1496795953,
//   current_period_end: 1499387953,
//   current_period_start: 1496795953,
//   customer: 'cus_An9vjsYdJuIPww',
//   discount: null,
//   ended_at: null,
//   items:
//    { object: 'list',
//      data: [ [Object] ],
//      has_more: false,
//      total_count: 1,
//      url: '/v1/subscription_items?subscription=sub_AnT86wCZllSooD' },
//   livemode: false,
//   metadata: {},
//   plan:
//    { id: 'gold',
//      object: 'plan',
//      amount: 1900,
//      created: 1483929064,
//      currency: 'usd',
//      interval: 'month',
//      interval_count: 1,
//      livemode: false,
//      metadata: {},
//      name: 'Gold',
//      statement_descriptor: null,
//      trial_period_days: null },
//   quantity: 1,
//   start: 1496795953,
//   status: 'active',
//   tax_percent: null,
//   trial_end: null,
//   trial_start: null }
