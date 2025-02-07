const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongo connected");
  } catch (error) {
    console.error("mongo connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
