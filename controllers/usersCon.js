require("dotenv").config("../.env");
const SECRET_KEY = process.env.SECRET_KEY;
const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Util = require("../Util/enc");
const moment = require("moment");
const passport = require("passport");

//Creating Model
const User = mongoose.model("User", userSchema);

//register user ]

async function registerUser(req, res) {
  try {
    const user = await User.findOne({ email: Util.encrypt(req.body.email) });
    //checking if user already exists or not
    if (user) {
      throw new Error("This email is already Registered , Please login");
    }
    //if not exist , create one
    const result = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      profileImage: req.file.path,
      role: req.body.role
    });
    res.send("User Registered Successfully");
  } catch (error) {
    res.status(422).json({
      message: "error",
      error: error.toString(),
    });
  }
}

//login user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password required");
    }
    //encrypting and hashing the email and password before searching
    const encEmail = Util.encrypt(email);
    const hashedPassword = Util.hashPassword(password);
    const user = await User.findOne({
      email: encEmail,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error("User not Found");
    }
    //generating token if user exists , else error occurs
    const token = jwt.sign({ sub: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });
    if (token) {
      res.send(
        `Congratulations you are logged in ! and your token is ${token}`
      );
    }
  } catch (err) {
    res.status(401).json({ error: "wrong credentials" });
  }
}

//view Profile

async function viewProfile(req, res) {
  try {
    const userProfile = await User.findById(req.user, {
      _id: 1,
      firstName: 1,
      lastName: 1,
      role: 1,
      profileImage: 1,
    });
    if (!userProfile) {
      throw new Error("Not found");
    }
    res.send(userProfile);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err });
  }
}

//updateUser

async function updateUser(req, res) {
  try {
    console.log("authenticated");
    //checking if user has requested to update profileImage and password
    let profileImage = null;
    if (req.file) {
      profileImage = req.file.path;
    }
    let hashedPassword = null;
    if (req.body.password) {
      hashedPassword = Util.hashPassword(req.body.password);
    }
    //finding the pre-existing user
    const user = await User.findById(req.user._id);
    const updateData = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      password: hashedPassword || user.password,
      profileImage: profileImage || user.profileImage,
    };
    //updating the user (req.user contains _id of User)
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }
    res.json({
      message: "User Updated",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      message: "Could not update User",
      error: error,
    });
  }
}

//get OTP
async function getOTP(req, res) {
  try {
    const encEmail = Util.encrypt(req.body.email);
    const user = await User.findOne({ email: encEmail });
    // console.log(user);
    if (!user) {
      throw new Error("Invalid Email");
    }

    const otp = Util.generateOTP();
    await User.updateOne({ email: encEmail }, { $set: { OTP: otp } });
    console.log(otp);

    res.send(otp);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

//Reset Password
async function resetPassword(req, res) {
  try {
    const encEmail = Util.encrypt(req.body.email);
    const user = await User.findOne({ email: encEmail });

    if (!user) {
      throw new Error("Invalid Error");
    }
    if (user.OTP != req.body.OTP) {
      throw new Error("Wrong OTP");
    }
    await User.updateOne(
      { email: encEmail },
      { $set: { password: Util.hashPassword(req.body.newPassword) } }
    );
    res.json({
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error,
    });
  }
}

module.exports = {
  registerUser,
  login,
  viewProfile,
  updateUser,
  getOTP,
  resetPassword,
};
