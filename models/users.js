const mongoose = require('mongoose');
var Schema = mongoose.Schema;

delete mongoose.connection.models['user'];

const UserSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  isTeacher: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  }
});

module.exports = mongoose.model('user', UserSchema);