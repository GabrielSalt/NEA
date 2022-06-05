const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  dateSet: {
    type: Date,
    required: true
  },
  dateDue: {
      type: Date,
      required: true
  }
});

module.exports = mongoose.model('assignment', AssignmentSchema);