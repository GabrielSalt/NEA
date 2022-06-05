const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
  },
  year: {
    type: Number,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    }
  ],
});

module.exports = mongoose.model('class', ClassSchema);