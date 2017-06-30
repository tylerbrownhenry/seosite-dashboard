'use strict';

var User = require('../models/user'),
     stripeWebhooksConsumer = require('../controllers/stripe/stripe-webhooks-consumer'),
     utils = require('../utils').findUser,
     publisher = require('../amqp/publisher'),
     findUser = utils.findUser,
     updateUser = utils.updateUser,
     knownEvents = {}

var eventNames = [
     'account.updated',
     'account.application.deauthorized',
     'application_fee.created',
     'application_fee.refunded',
     'balance.available',
     /* Charges */
     'charge.succeeded',
     'charge.failed',
     'charge.refunded',
     'charge.captured',
     'charge.updated',
     'charge.dispute.created',
     'charge.dispute.updated',
     'charge.dispute.closed',
     /* Customer Events */
     'customer.created',
     'customer.updated',
     'customer.deleted',
     'customer.card.created',
     'customer.card.updated',
     'customer.card.deleted',
     'customer.source.created',
     'customer.subscription.created',
     'customer.subscription.deleted',
     'customer.subscription.updated',
     'customer.subscription.trial_will_end',
     'customer.discount.created',
     'customer.discount.updated',
     'customer.discount.deleted',
     /* Payments */
     'invoice.created',
     'invoice.updated',
     'invoice.payment_succeeded',
     'invoice.payment_failed',
     'invoiceitem.created',
     'invoiceitem.updated',
     'invoiceitem.deleted',
     'plan.created',
     'plan.updated',
     'plan.deleted',
     'coupon.created',
     'coupon.deleted',
     'recipient.created',
     'recipient.updated',
     'recipient.deleted',
     'transfer.created',
     'transfer.updated',
     'transfer.paid',
     'transfer.failed',
     'ping'
];

for (var i = 0, leng = eventNames.length; i < leng; i++) {
     knownEvents[eventNames[i]] = function (req, res) {
          console.log(req.stripeEvent.type + ': event processed');
          res.status(200).end();
     }
}
//
//
// knownEvents['customer.subscription.created'] = function (req, res, next) {
//     console.log('ref.data.object.plan',ref.data.object.plan);
//     var subObj = req.stripeEvent.data.object;
//     var message = {
//          subscriptionId: subObj.subscription,
//          customerId: subObj.customer,
//          type: 'customer.subscription.created',
//          data: subObj
//     };
//     stripeWebhooksConsumer(message);
//        return res.status(200).end();
// }
//
// knownEvents['customer.source.created'] = function (req, res, next) {
//     console.log('customer.source.created');
//     var subObj = req.stripeEvent.data.object;
//     var message = {
//          subscriptionId: subObj.subscription,
//          customerId: subObj.customer,
//          type: 'customer.source.created',
//          data: subObj
//     };
//     stripeWebhooksConsumer(message);
//        return res.status(200).end();
// }
//
// knownEvents['invoice.payment_succeeded'] = function (req, res, next) {
//     console.log('invoice.payment_succeeded');
//     var subObj = req.stripeEvent.data.object;
//     var message = {
//          subscriptionId: subObj.subscription,
//          customerId: subObj.customer,
//          type: 'invoice.payment_succeeded',
//          data: subObj
//     };
//     stripeWebhooksConsumer(message);
//        return res.status(200).end();
// }
//
// // Payment succeeded
// knownEvents['invoice.payment_succeeded'] = function (req, res, next) {
//   console.log('invoice.payment_succeeded');
//      // Find the customer subscription using the Stripe identifier (included in the event payload).
//      // Retrieve the subscription details from the Stripe API.
//      // Update our subscription's CurrentPeriodStart and CurrentPeriodEnd with the Stripe subscription's period_start and period_end.
//      // Create a customer invoice using the details from the Stripe event.
//
//      var subObj = req.stripeEvent.data.object;
//      var message = {
//           subscriptionId: subObj.subscription,
//           customerId: subObj.customer,
//           type: 'invoice.payment_succeeded',
//           data: {
//                periodStart: subObj.period_start,
//                periodEnd: subObj.period_end
//           }
//      };
//       stripeWebhooksConsumer(message);
//          return res.status(200).end();
//     //  publisher.publish("", "subscriptionUpdate", new Buffer(JSON.stringify(message))).then(function (e) {
//           // console.log('published');
//           // return res.status(200).end();
//     //  });
//      /* Broadcast send email */
//
// };
//
//
// var buildObj = function(req){
//   var subObj = req.stripeEvent.data.object;
//   var message = {
//        subscriptionId: subObj.subscription,
//        customerId: subObj.customer,
//        type: 'invoice.payment_succeeded',
//        data: {
//             periodStart: subObj.period_start,
//             periodEnd: subObj.period_end
//        }
//   }
//   return message;
// }
//
// knownEvents['customer.source.updated'] = function (req, res, next) {
//
//    stripeWebhooksConsumer(message);
//       return res.status(200).end();
//   /* Check if last four is still valid */
//   /* Check if last four is still valid */
//   /* Check if last four is still valid */
//   /* Check if last four is still valid */
//   /* Check if last four is still valid */
//      return res.status(200).end();
//      /* Broadcast send email */
//
// };
//
// // Payment failed
//
// // Subscription update
// knownEvents['charge.succeeded'] = function (req, res, next) {
//      return res.status(200).end();
//      /* Broadcast send email */
// };
//
// // Subscription update
// knownEvents['charge.failed'] = function (req, res, next) {
//      return res.status(200).end();
//      /* Broadcast send email */
// };
//
// // Subscription update
// knownEvents['customer.subscription.updated'] = function (req, res, next) {
//      return res.status(200).end();
//      /* Broadcast send email */
// };

/* Complete / Tested */

// Invoice.created
knownEvents['invoice.created'] = function (req, res, next) {
      /* About to charge a customer for a renewal */
     console.log('stripe-events.js - > invoice.created');
     stripeWebhooksConsumer(req);
     return res.status(200).end();
};

knownEvents['invoice.payment_succeeded'] = function (req, res, next) {
      /* Updated Subscription Start / End Dates / Email Customer */
     console.log('stripe-events.js - > invoice.payment_succeeded');
     stripeWebhooksConsumer(req);
     return res.status(200).end();
};

knownEvents['invoice.payment_failed'] = function (req, res, next) {
      /* Email Customer */
     console.log('stripe-events.js - > invoice.payment_failed');
     stripeWebhooksConsumer(req);
     return res.status(200).end();
};



module.exports = function (req, res, next) {
     console.log('req.stripeEvent', req.stripeEvent.type);
     if (req.stripeEvent && req.stripeEvent.type && knownEvents[req.stripeEvent.type]) {
          knownEvents[req.stripeEvent.type](req, res, next);
     } else {
          return next(new Error('Stripe Event not found'));
     }
}
