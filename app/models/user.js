var dynamoose = require('dynamoose');
var userSchema = require('./schema/user');
var user = dynamoose.model('User', userSchema,{
  create: true, // Create table in DB, if it does not exist,
});
module.exports = user;

// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// var secrets = require('../config/secrets');

// var stripeOptions = secrets.stripeOptions;
// var stripeCustomer = require('./plugins/stripe-customer');
// userSchema.plugin(stripeCustomer, stripeOptions);
