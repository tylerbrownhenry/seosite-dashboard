var dynamoose = require('dynamoose');

var issueSchema = new dynamoose.Schema({
     tooManyLinks: {
          type: Number
          default: 0
     },
     links: {
          type: Number,
          default: 0
     },
     resources: {
          type: Number,
          default: 0
     },
     security: {
          type: Number,
          default: 0
     },
     meta: {
          type: Number,
          default: 0
     },
     requestId: {
          type: String,
          hashKey: true,
     }
});

module.exports = dynamoose.model('Issues', issueSchema);
