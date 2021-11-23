const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uri = process.env.mongoDB_URI

const connectMongo = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Mongo is Connected")
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectMongo;