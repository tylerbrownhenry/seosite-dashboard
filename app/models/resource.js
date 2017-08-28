var dynamoose = require('dynamoose');

var resourceSchema = new dynamoose.Schema({
     url: {
          type: String
     },
     hostname: {
          type: String
     },
     timings: {
          type: Object
     },
     mainPage:{
       type:Boolean
     },
     css:{
       type:Object
     },
     server: {
       type:String
     },
     start: {
          type: String,
          default: +new Date()
     },
     duration: {
          type: Number,
          default: 0
     },
     cached: {
       type:Boolean,
       default:false,
     },
     gzip: {
       type:Boolean,
       default:false,
     },
     minified: {
       type:Boolean,
       default:false,
     },
     bodySize: {
       type:String
     },
     type: {
       type:String,
     },
     cleanType: {
       type:String,
     },
     _id: {
          type: String,
          rangeKey: true
     },
     requestId: {
       type: String,
       hashKey: true,
     },
     status: {
          type: Number,
     },
});

module.exports = dynamoose.model('Resource', resourceSchema);
