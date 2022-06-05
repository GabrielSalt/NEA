const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  datePublished: {
    type: Date,
  },
  isPublic: {
    type: Boolean,
  },
  questions: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Question'
      }
  ]
});

module.exports = mongoose.model('quiz', QuizSchema);