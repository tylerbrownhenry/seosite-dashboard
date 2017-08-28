require('dotenv').config();
var dynamoose = require('dynamoose');
var customizationSchema = new dynamoose.Schema({
  oid: {
    type: String,
    hashKey: true
  },
  logo:{
    type:String
  },
  css:{
    type: String
  },
  emailCss:{
    type: String
  }
}, {
  throughput: {
    read: 15,
    write: 5
  }
});

module.exports = dynamoose.model('Customization', customizationSchema);
