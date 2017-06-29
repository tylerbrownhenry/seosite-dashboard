var dynamoose = require('dynamoose');

var customerSchema = new dynamoose.Schema({
     customerId: {
          type: String,
          hashKey: true
     },
     subscriptionId: {
          type: String,
     },
     oid: {
          type: String
     }
});

module.exports = dynamoose.model('_Customer', customerSchema, {
     create: true, // Create table in DB, if it does not exist,
});
