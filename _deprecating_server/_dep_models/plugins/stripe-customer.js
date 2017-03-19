'use strict';

var Stripe = require('stripe'),
     stripe;

module.exports = exports = function stripeCustomer(schema, options) {
     stripe = new Stripe(options.apiKey);

     schema.add({
          stripe: {
               customerId: String,
               subscriptionId: String,
               last4: String,
               plan: {
                    type: String,
                    default: options.defaultPlan
               }
          }
     });

     schema.pre('save', function (next) {
          var user = this;
          if (!user.isNew || user.customerId) {
               return next();
          }
          user.createCustomer(function (err) {
               if (err) {
                    return next(err);
               }
               next();
          });
     });

     schema.statics.getPlans = function () {
          return options.planData;
     };

     schema.methods.createCustomer = function (cb) {
          var user = this;

          stripe.customers.create({
               email: user.email
          }, function (err, customer) {
               if (err) {
                    return cb(err);
               }

               user.customerId = customer.id;
               return cb();
          });
     };

     schema.methods.setCard = function (stripe_token, cb) {
          var user = this;

          var cardHandler = function (err, customer) {
               if (err) {
                    return cb(err);
               }

               if (!user.customerId) {
                    user.customerId = customer.id;
               }

               var card = customer.cards ? customer.cards.data[0] : customer.sources.data[0];

               user.last4 = card.last4;
               user.save(function (err) {
                    if (err) {
                         return cb(err);
                    }
                    return cb(null);
               });
          };

          if (user.customerId) {
               stripe.customers.update(user.customerId, {
                    card: stripe_token
               }, cardHandler);
          } else {
               stripe.customers.create({
                    email: user.email,
                    card: stripe_token
               }, cardHandler);
          }
     };

     schema.methods.setPlan = function (plan, stripe_token, cb) {
          var user = this;

          var subscriptionHandler = function (err, subscription) {
               if (err) {
                    return cb(err);
               }

               user.plan = plan;
               user.subscriptionId = subscription.id;
               user.save(function (err) {
                    if (err) {
                         return cb(err);
                    }
                    return cb(null);
               });
          };

          var createSubscription = function () {
               stripe.customers.createSubscription(
                    user.customerId, {
                         plan: plan
                    },
                    subscriptionHandler
               );
          };

          if (stripe_token) {
               user.setCard(stripe_token, function (err) {
                    if (err) {
                         return cb(err);
                    }
                    createSubscription();
               });

          } else {
               if (user.subscriptionId) {
                    // update subscription
                    stripe.customers.updateSubscription(
                         user.customerId,
                         user.subscriptionId, {
                              plan: plan
                         },
                         subscriptionHandler
                    );
               } else {
                    createSubscription();
               }
          }
     };

     schema.methods.updateStripeEmail = function (cb) {
          var user = this;

          if (!user.customerId) {
               return cb();

          }

          stripe.customers.update(user.customerId, {
               email: user.email
          }, function (err) {
               cb(err);
          });
     };

     schema.methods.cancelStripe = function (cb) {
          var user = this;

          if (user.customerId) {
               stripe.customers.del(
                    user.customerId
               ).then(function () {
                    cb();
               }, function (err) {
                    return cb(err);
               });
          } else {
               cb();
          }
     };
};
