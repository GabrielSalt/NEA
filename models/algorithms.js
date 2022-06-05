const mongoose = require('mongoose');
var Schema = mongoose.Schema;

delete mongoose.connection.models['algorithm'];

const AlgorithmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pseudocode: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('algorithm', AlgorithmSchema);