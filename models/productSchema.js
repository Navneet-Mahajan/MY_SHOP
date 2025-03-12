const express = require("express");
const path = require("path");
const moment = require("moment");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const productSchema = new mongoose.Schema({
  id: { type: Object },
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  createdBy: { type: Object },
  createdAt: { type: Date, default: moment().format() },
  updatedAt: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
});

module.exports = productSchema;
