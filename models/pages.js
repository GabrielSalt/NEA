const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  description: {
    type: Date,
  },
});

module.exports = mongoose.model('page', PageSchema);