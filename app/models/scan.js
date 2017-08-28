var dynamoose = require('dynamoose');

var scanSchema = new dynamoose.Schema({
     requestId: {
          type: String,
          hashKey: true
     },
     uid: {
          type: String
     },
     htmlResults: {
          type: Object
     },
     softwareSummary:{
       type: Object
     },
     tapTargetCheck: {
       type: Object
     },
     issues: {
          type: Object
     },
     fontInfo: {
          type: Object
     },
     serverInfo:{
      type: Object
     },
     tapTargetCheck: {
       type:Object
     },
     thumb: {
          type: String
     },
     url: {
          type: Object,
          default: {}
     },
     sslEnabled: {
          type: String
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
