var mongoose = require('mongoose');

var alertSchema = new mongoose.Schema({
     uid: {
          type: String
     },
     message: []
});

module.exports = mongoose.model('Alert', alertSchema, 'alerts');
