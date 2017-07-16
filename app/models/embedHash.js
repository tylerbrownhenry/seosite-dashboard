require('dotenv').config();
var dynamoose = require('dynamoose');
var embedHashSchema = new dynamoose.Schema({
  _id: {
    type: String,
    rangeKey: true,
  },
  oid: {
    type: String,
    hashKey: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  name: {
    type: String
  },
  status: {
    type:String,
    default: 'active:embed'
  }
}, {
  throughput: {
    read: 15,
    write: 5
  }
});

module.exports = dynamoose.model('EmbedHash', embedHashSchema);
