var dynamoose = require('dynamoose');

var passwordResetTokenSchema = new dynamoose.Schema({
     uid: {
          type: String
     },
     token: {
          type: String,
          hashKey: true
     },
     expires: {
          type: String,
          default: +new Date()
     }
}, {
     throughput: {
          read: 1,
          write: 1
     }
});
module.exports = dynamoose.model('PasswordResetToken', passwordResetTokenSchema,{
  create: true, // Create table in DB, if it does not exist,
});
