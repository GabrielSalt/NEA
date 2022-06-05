const mongoose = require('mongoose');
var Schema = mongoose.Schema;

delete mongoose.connection.models['problem'];

const ProblemSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  testcases: {
    type: Array,
  },
  datePublished: {
    type: Date,
  },
  difficulty: {
    type: String,
  },
  hints: {
    type: Array,
  },
  prompt: {
    type: String,
  },
  forumpost: {
    type: Schema.Types.ObjectId,
    ref: 'ForumPost'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('problem', ProblemSchema);