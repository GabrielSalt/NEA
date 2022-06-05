const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const LessonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: Date,
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page',
    }
  ]
});

module.exports = mongoose.model('lesson', LessonSchema);