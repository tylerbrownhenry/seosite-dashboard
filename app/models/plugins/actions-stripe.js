'use strict';

var secrets = require('../../config/secrets').stripeOptions,
     utils = require('../../utils'),
     Stripe = require('stripe'),
     stripe;
/**
 * handles creating and updating User plans on stripe
 * @param {object}   user         instance of a User
 * @param {String}   plan         label for plan
 * @param {String}   uid          user's unique ID
 * @param {String}   stripe_token unique token for talking with stripe
 * @param {Function} cb           what to do after saving or having an error
 */
function setPlan(user, plan, uid, stripe_token, cb) {
     console.log('setPlan user', user, 'stripe_token', stripe_token);
     stripe = new Stripe(secrets.apiKey);
     /**
      * updates the User's information with changes to account
      * @param  {error||null} err           error message
      * @param  {string} subscription       unique Id for new subscription
      * @return {function}                  what to do after saving or having an error
      */
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
          console.log('FAILS HERE1', user);
          stripe.customers.createSubscription(
               user.customerId, {
                    plan: plan
               },
               subscriptionHandler
          );
     };

     if (stripe_token) {
          console.log('FAILS HERE2', user);

          setCard(user.customerId, user.email, uid, stripe_token, function (err) {
               if (err) {
                    return cb(err);
               }
               createSubscription();
          });

     } else {
          console.log('FAILS HERE3');

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

function createCustomer(user, cb) {
     stripe.customers.create({
          email: user.email
     }, function (err, customer) {
          if (err) {
               return cb(err);
          }

          user.customerId = customer.id;
          return cb(null, user);
     });
};

function preSave(options, user, next) {
     stripe = new Stripe(options.apiKey);
     if (!user.isNew || user.customerId) {
          return next(null, user);
     }
     user.createCustomer(user, function (err) {
          if (err) {
               return next(err);
          }
          next(null);
     });
};

function updateStripeEmail(customerId, email, cb) {
     stripe = new Stripe(secrets.apiKey);
     if (!customerId) {
          return cb();

     }
     stripe.customers.update(customerId, {
          email: email
     }, function (err) {
          cb(err);
     });
};

function setCard(customerId, email, uid, stripe_token, cb) {
     console.log('customerId', customerId, 'uid', uid, 'stripe_token', stripe_token);
     stripe = new Stripe(secrets.apiKey);
     var cardHandler = function (err, customer) {
          console.log('err', err, customer);
          if (err) {
               return cb(err);
          }

          if (!customerId) {
               console.log('NO CUSTOMER ID!!');
               customerId = customer.id;
          }
          console.log('NO CUSTOMER ID!!');

          var card = customer.cards ? customer.cards.data[0] : customer.sources.data[0];

          utils.updateUser({
                    uid: uid
               }, {
                    $PUT: {
                         customerId: customerId,
                         last4: card.last4
                    }
               },
               function (err) {
                    if (err) {
                         return cb(err);
                    }
                    return cb(null);
               });
     };
     if (customerId) {
          stripe.customers.update(customerId, {
               card: stripe_token
          }, cardHandler);
     } else {
          stripe.customers.create({
               email: email,
               card: stripe_token
          }, cardHandler);
     }
};

function cancelStripe(customerId, cb) {
     stripe = new Stripe(secrets.apiKey);
     if (customerId) {
          stripe.customers.del(
               customerId
          ).then(function () {
               console.log('success');
               cb();
          }, function (err) {
               console.log('err', err);
               return cb(err);
          });
     } else {
          cb();
     }
};

module.exports.preSave = preSave;
module.exports.cancelStripe = cancelStripe;
module.exports.setCard = setCard;
module.exports.updateStripeEmail = updateStripeEmail;
module.exports.setPlan = setPlan;
