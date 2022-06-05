const mongoose = require('mongoose');
var Schema = mongoose.Schema;

delete mongoose.connection.models['forumpost'];

const ForumPostSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: {
      type: Number,
  },
  comments: [
      {
          type: Schema.Types.ObjectId,
          ref: 'forumcomment'
      }
  ],
  datePosted: {
      type: Date,
  }
});

module.exports = mongoose.model('forumpost', ForumPostSchema);