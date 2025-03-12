const mongoose = require("mongoose");
const path = require("path");

const cartSchema = new mongoose.Schema({
  userId: { type: Object },
  products: [
    {
      type: Object,
    },
  ],
});

module.exports = cartSchema;
