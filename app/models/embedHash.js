require('dotenv').config();
var dynamoose = require('dynamoose');

var embedHashSchema = new dynamoose.Schema({
  _id: {
    type: String,
    hashKey: true
  },
  oid:{
    type:String,
    rangeKey: true
  },
  name:{
    type: String
  },
  active:{
    type: Boolean
  }
}, {
  throughput: {
    read: 15,
    write: 5
  }
});

module.exports = dynamoose.model('EmbedHash', embedHashSchema);
