const mongoose = require('mongoose');

const db = 'mongodb+srv://Gabriel:Gabby5612@cluster0.adygl.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;