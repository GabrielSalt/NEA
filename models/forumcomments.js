const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ForumCommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  likes: {
      type: Number,
  },
  datePosted: {
      type: Date,
      required: true
  }
});

module.exports = mongoose.model('forumcomment', ForumCommentSchema);