var dynamoose = require('dynamoose');

var linkSchema = new dynamoose.Schema({
     url: {
          type: String
     },
     site: {
          type: String
     },
     queueId: {
          type: String
     },
     found: {
          type: String,
          default:+new Date()
     },
     _id: {
          type: String,
          hashKey: true
     },
     linkId: {
          type: String
     },
     uid: {
          type: String
     },
     requestId: {
          type: String
     },
     status: {
          type: String,
          default: 'pending'
     },
     __link: {
          type: Object
     },
     results: {
          type: Object
     }
});

module.exports = dynamoose.model('Link', linkSchema,{
  create: true, // Create table in DB, if it does not exist,
});
