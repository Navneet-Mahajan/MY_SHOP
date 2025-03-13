const path = require("path");
const moment = require("moment");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const { type } = require("os");
const encrypt = require("../Util/enc").encrypt;
const hashPassword = require("../Util/enc").hashPassword;
const uri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  id: { type: Object },
  firstName: { type: String },
  lastName: { type: String }, // "Required can be added"
  email: { type: String, required: true },
  password: { type: String },
  profileImage: { type: String },
  role: { type: String },
  createdAt: { type: Date ,default : moment().format() },
  UpdatedAt: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
  deleteAt: { type: Date, default: null },
  OTP: { type: Number, default: null },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.password) {
      this.password = hashPassword(this.password);
    }

    if (this.email) {
      this.email = encrypt(this.email);
    }
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = userSchema;
