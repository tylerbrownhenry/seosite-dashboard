'use strict';

var User = require('../models/user'),
     utils = require('../utils').findUser;
var findUser = utils.findUser,
     updateUser = utils.updateUser,
     knownEvents = {}

var eventNames = [
     'account.updated',
     'account.application.deauthorized',
     'application_fee.created',
     'application_fee.refunded',
     'balance.available',
     'charge.succeeded',
     'charge.failed',
     'charge.refunded',
     'charge.captured',
     'charge.updated',
     'charge.dispute.created',
     'charge.dispute.updated',
     'charge.dispute.closed',
     'customer.created',
     'customer.updated',
     'customer.deleted',
     'customer.card.created',
     'customer.card.updated',
     'customer.card.deleted',
     'customer.subscription.created',
     'customer.subscription.updated',
     'customer.subscription.trial_will_end',
     'customer.discount.created',
     'customer.discount.updated',
     'customer.discount.deleted',
     'invoice.created',
     'invoice.updated',
     'invoice.payment_succeeded',
     'invoice.payment_failed ',
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

knownEvents['customer.subscription.deleted'] = function (req, res, next) {
     if (req.stripeEvent.data && req.stripeEvent.data.object && req.stripeEvent.data.object.customer) {
          // find user where stripeEvent.data.object.customer
          findUser({
                    resetPasswordToken: req.params.token
               },
               function (err, user) {
                    if (err) {
                         return next(err);
                    }
                    if (!user) {
                         // user does not exist, no need to process
                         return res.status(200).end();
                    } else {

                         updateUser({
                              uid: req.user.id
                         }, {
                              $PUT: {
                                   last4: '',
                                   plan: 'free',
                                   subscriptionId: ''
                              }
                         }, function (err) {
                              if (err) {
                                   return next(err);
                              }
                              console.log('user: ' + user.email + ' subscription was successfully cancelled.');
                              return res.status(200).end();
                         });
                    }
               });
     } else {
          return next(new Error('stripeEvent.data.object.customer is undefined'));
     }
}

module.exports = function (req, res, next) {
     if (req.stripeEvent && req.stripeEvent.type && knownEvents[req.stripeEvent.type]) {
          knownEvents[req.stripeEvent.type](req, res, next);
     } else {
          return next(new Error('Stripe Event not found'));
     }
}
