var utils = require('../../utils'),
    _console = require('../../console'),
     secrets = require('../../config/secrets').stripeOptions,
     Stripe = require('stripe'),
     stripe;

function createCustomer(email, cb) {
     stripe = new Stripe(secrets.apiKey);
     _console.log('subscription-controller.js createCustomer :user', email);
     stripe.customers.create({
          email: email
     }, function (err, customer) {
          _console.log('subscription-controller.js createCustomer:create err', err, 'customer', customer);
          if (err) {
               return cb(err);
          }
          return cb(null, customer.id);
     });
}

function setCard(customer, oid, email, cb) {
     _console.log('subscription-controller.js setCard --> customer', customer,oid);
     stripe = new Stripe(secrets.apiKey);
     var cardHandler = function (err, _customer) {
       _console.log('subscription-controller.js cardHandler: customer:',_customer);
          if (err) {
               return cb(err);
          }
          var card = _customer.cards ? _customer.cards.data[0] : _customer.sources.data[0];
          utils.updateSubscription(customer.customerId, {
               last4: card.last4
          }, function (err) {
              _console.log('subscription-controller.js cardHandler updateSubscription: err',err);
               if (err) {
                    return cb(err);
               }
               return cb(null);
          });
     };

     stripe.customers.update(customer.customerId, {
          source: {
               object: 'card',
               number: customer['card-num'],
               cvc: customer['card-cvs'],
               exp_month: customer['card-month'],
               exp_year: customer['card-year'],
               email: email
          }
     }, cardHandler);
}

module.exports = {
     setCard: setCard,
     cancelStripe: function (customerId, cb) {
          _console.log('subscription-controller.js: cancelStripe: customerId',customerId);
          stripe = new Stripe(secrets.apiKey);
          if (customerId) {
               stripe.customers.del(
                    customerId
               ).then(function () {
                    _console.log('subscription-controller.js: cancelStripe: success');
                    cb(null);
               }, function (err) {
                    _console.log('subscription-controller.js: cancelStripe: rr', err);
                    return cb(err);
               });
          } else {
               cb();
          }
     },
     updateEmail: function (customerId, email, cb) {
          stripe = new Stripe(secrets.apiKey);
          if (!customerId) {
               return cb();
          }
          stripe.customers.update(customerId, {
               email: email
          }, function (err) {
               cb(err);
          });
     },
     findUserPlan: function (oid) {

     },
     getCustomer: function(customerId,cb){
       _console.log('subscription-controller.js getCustomer: customerId',customerId);
       stripe = new Stripe(secrets.apiKey);
       stripe.customers.retrieve(customerId, function (err,res) {
            _console.log('subscription-controller.js getCustomer retrieve: err',err,'res',res);
            cb(err,res);
       });
     },
     createCustomer: function (user, next) {
          createCustomer(user, function (err, user) {
               if (err) {
                    return next(err);
               }
               next(null, user);
          });
     },
     listPlans: function (cb) {
          stripe = new Stripe(secrets.apiKey);
          stripe.plans.list({
                    limit: 100
               },
               function (err, plans) {
                    cb(err, plans);
               }
          );
     },
     switchSubscription: function(currentSubscriptionId,newPlan,cb){
       stripe = new Stripe(secrets.apiKey);
       stripe.subscriptions.update(
         currentSubscriptionId,
         { plan:newPlan},
         function(err, res) {
           _console.log('subscription-controller.js switchSubscription: res',res);
           if(!err){
             cb(null,res);
           } else {
             cb(err);
           }
         }
       );
     },
     projectUpgradeCost: function (custumerId, subscriptionId, plan, cb) {
          stripe = new Stripe(secrets.apiKey);
          var proration_date = Math.floor(Date.now() / 1000);
          stripe.invoices.retrieveUpcoming(
               custumerId,
               subscriptionId, {
                    subscription_plan: plan, // Switch to new plan
                    subscription_proration_date: proration_date
               },
               function (err, res) {
                    if (!err) {
                         cb(null, {
                              nextPaymentAttempt: (res.next_payment_attempt) ? res.next_payment_attempt : null,
                              amountDue: (res.amount_due) ? res.amount_due : null,
                         });
                    } else {
                         cb(err);
                    }
               }
          );
     },
     getUpcomingInvoice: function (id, cb) {
          stripe = new Stripe(secrets.apiKey);
          stripe.invoices.retrieveUpcoming(
               id,
               function (err, res) {
                    _console.log('subscription-controller.js getUpcomingInvoice: res',res);
                    if (!err) {
                         cb(null, {
                              nextPaymentAttempt: (res.next_payment_attempt) ? res.next_payment_attempt : null,
                              amount: (res.amount) ? res.amount_due : null,
                              attempted: (res.attempted) ? res.attempted : null,
                              attemptCount: (res.attempt_count) ? res.attempt_count : null,
                              paid: (res.paid) ? res.paid : null
                         });
                    } else {
                         cb(err);
                    }
               }
          );
     },
     getSubscription: function (id, cb) {
          stripe = new Stripe(secrets.apiKey);
          stripe.subscriptions.retrieve(id,
               function (err, res) {
                    _console.log('subscription-controller.js: getSubscription: retrieve res:',res);
                    if (!err) {
                         cb(null, {
                              plan: (res.plan) ? res.plan.id : null,
                              frequency: (res.plan && res.plan.interval) ? res.plan.interval : null,
                              planAmount: (res.plan && res.plan.amount) ? res.plan.amount : null,
                              planName: (res.plan && res.plan.name) ? res.plan.name : null,
                              periodEnd: (res.current_period_end) ? res.current_period_end : null,
                              periodStart: (res.current_period_start) ? res.current_period_start : null,
                              status: (res.status) ? res.status : null,
                              created: (res.created) ? res.created : null,
                              cancelAtPeriodEnd: (typeof res.cancel_at_period_end !== 'undefined') ? res.cancel_at_period_end : null,
                              canceledAt: (res.canceled_at) ? res.canceled_at : null,
                         });
                    } else {
                         cb(err);
                    }
               });
     },
     cancelSubscription: function (id, cb, at_period_end) {
          stripe = new Stripe(secrets.apiKey);
          if (typeof at_period_end === 'undefined') {
               at_period_end = true
          }
          stripe.subscriptions.del(id, {
                    at_period_end: at_period_end
               },
               function (err, confirmation) {
                    cb(err, confirmation);
               }
          );
     },
     listSubscriptions: function (cb) {
          stripe = new Stripe(secrets.apiKey);
          stripe.subscriptions.list({
                    limit: 100
               },
               function (err, subscriptions) {
                    cb(err, subscriptions);
               });
     },
     setPlan: function (plan, oid, email, subscription, cb) {
          _console.log('subscription-controller.js setPlan plan:', plan, 'oid', oid, 'email', email, 'subscription', subscription);
          stripe = new Stripe(secrets.apiKey);
          /**
           * updates the User's information with changes to account
           * @param  {error||null} err           error message
           * @param  {string} subscription       unique Id for new subscription
           * @return {function}                  what to do after saving or having an error
           */
          function subscriptionHandler(err, res) {
               _console.log('subscription-controller.js setPlan subscriptionHandler err', err, res);
               if (err) {
                    return cb(err);
               }
               utils.updateSubscription(res.customer, {
                    plan: plan,
                    subscriptionId: subscription.id
               }, function (err) {
                    _console.log('subscription-controller.js subscriptionHandler callback err', err);
                    if (err) {
                         return cb(err);
                    }
                    return cb(null);
               });
          };

          function createSubscription(subscription, plan) {
               _console.log('subscription-controller.js setPlan createSubscription', subscription.customerId, plan);
               stripe.subscriptions.create({
                    customer: subscription.customerId,
                    plan: plan,
               }, subscriptionHandler);
          };

          if (!subscription.last4) {
               _console.log('subscription-controller.js setPlan no last4', subscription);
               setCard(subscription, oid, email, function (err) {
                    if (err) {
                         return cb(err);
                    }
                    createSubscription(subscription, plan);
               });
          } else {
               _console.log('subscription-controller.js setPlan yes last4', subscription);
               if (subscription.subscriptionId) {
                    // update subscription
                    stripe.customers.updateSubscription(
                         subscription.customerId,
                         subscription.subscriptionId, {
                              plan: plan
                         },
                         subscriptionHandler
                    );
               } else {
                    _console.log('subscription-controller.js yes last 4, no subscription', subscription, 'plan', plan);
                    createSubscription(subscription, plan);
               }
          }
     }

}
