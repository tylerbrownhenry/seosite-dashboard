var dynamoose = require('dynamoose');

var scanSchema = new dynamoose.Schema({
     requestId: {
          type: String,
          hashKey: true
     },
     uid: {
          type: String
     },
     meta: {
          type: Object
     },
     resources: {
          type: Object
     },
     issues: {
          type: Object
     },
     emails: {
          type: Object
     },
     linkCount: {
          type: Number
     },
     thumb: {
          type: String
     },
     url: {
          type: Object,
          default: {}
     },
     redirects: {
          type: Number
     },
     completedTime: {
          type: String,
          default: +new Date()
     },
     message: {
          type: String
     },
     status: {
          type: String
     },
     thumb: String
});

module.exports = dynamoose.model('Scan', scanSchema,{
  create: true, // Create table in DB, if it does not exist,
});
