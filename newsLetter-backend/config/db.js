const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

module.exports = connectDB;
