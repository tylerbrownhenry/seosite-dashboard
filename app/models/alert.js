var dynamoose = require('dynamoose');

var alertSchema = new dynamoose.Schema({
     uid: {
          type: String
     },
     message: []
});

module.exports = dynamoose.model('Alert', alertSchema);
