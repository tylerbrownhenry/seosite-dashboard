var dynamoose = require('dynamoose');

var requestSchema = new dynamoose.Schema({
     requestId: {
          type: String,
          hashKey: true
     },
     retries: {
          type: Number
     },
     oid: {
          type: String
     },
     uid: {
          type: String
     },
     requestType:{
       type: String
     },
     source: {
          type: String
     },
     page: {
          type: String
     },
     scanGroup:{
       type: String
     },
     url: {
          type: String
     },
     requestDate: {
          type: String,
          default:+new Date()
     },
     options: {
          type: Object
     },
     processes: {
          type: Number,
          default: 0
     },
     status: {
          type: String,
     },
     failedReason: {
          type: String,
     },
     response: {
          type: Object
     },
}, {
     throughput: {
          read: 15,
          write: 5
     },
     timestamps: {
          createdAt: 'createdTs',
          updatedAt: 'updatedTs'
     }
});
module.exports = dynamoose.model('Request', requestSchema,{
  create: true, // Create table in DB, if it does not exist,
});
