'use strict';

var subscriptionController = require('../../controllers/subscriptions/subscription-controller');
/**
 * handles creating and updating User plans on stripe
 * @param {object}   user         instance of a User
 * @param {String}   plan         label for plan
 * @param {String}   uid          user's unique ID
 * @param {String}   stripe_token unique token for talking with stripe
 * @param {Function} cb           what to do after saving or having an error
 */
function setPlan(plan, oid, email, subscription, stripe_token, cb) {
     subscriptionController.setPlan(plan, oid, email, subscription, stripe_token, cb);
};

function updateStripeEmail(customerId, email, cb) {
     subscriptionController.updateStripeEmail(customerId, email, cb);
};

function setCard(customer, oid, email, subscription, cb) {
     subscriptionController.setCard(customer, oid, email, subscription, cb);
};

function cancelStripe(customerId, cb) {
     subscriptionController.cancelStripe(customerId, cb);
};

module.exports.cancelStripe = cancelStripe;
module.exports.setCard = setCard;
module.exports.updateStripeEmail = updateStripeEmail;
module.exports.setPlan = setPlan;
