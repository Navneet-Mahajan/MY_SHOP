//import mongoose and Env
const path = require("path");
const moment = require("moment");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const { type } = require("os");
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected Successfully!!");
  } catch (error) {
    console.error("Error in Connecting Database :", error);
  }
};

connectDB();
