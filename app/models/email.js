
var dynamoose = require('dynamoose');

var emailSchema = new dynamoose.Schema({
     email: {
          type: String,
          hashKey: true
     },
     uid: {
          type: String,
     },
     customerId: {
          type: String,
     },
     oid: {
          type: String
     }
});

module.exports = dynamoose.model('_Email', emailSchema, {
     create: true, // Create table in DB, if it does not exist,
});
