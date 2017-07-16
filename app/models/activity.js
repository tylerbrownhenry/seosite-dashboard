var dynamoose = require('dynamoose');

var activitySchema = new dynamoose.Schema({
     "oid": {
          type: String,
          hashKey: true
     },
     "email": {
       type: String,
     },
     "customerId": {
          type: String,
     },
     "site:scan-month-reset": {
          type: String,
          default: +new Date()
     },
     "site:scan-day-reset": {
          type: String,
          default: +new Date()
     },
     "site:scan-all-count": {
       type: Number,
       default: 0
     },
     "site:scan-day-count": {
          type: Number,
          default: 0
     },
     "site:scan-month-count": {
          type: Number,
          default: 0
     },
     "page:scan-month-reset": {
       type: String,
       default: +new Date()
     },
     "page:scan-day-reset": {
       type: String,
       default: +new Date()
     },
     "page:scan-all-count": {
          type: Number,
          default: 0
     },
     "page:scan-day-count": {
          type: Number,
          default: 0
     },
     "page:scan-month-count": {
          type: Number,
          default: 0
     }
}, {
     "throughput": {
          read: 15,
          write: 5
     },
     "timestamps": {
          createdAt: 'createdTs',
          updatedAt: 'updatedTs'
     }
});
module.exports = dynamoose.model('Activity', activitySchema,{
  create: true, // Create table in DB, if it does not exist,
});
