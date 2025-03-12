const express = require("express");
const router = express.Router();

//Importing route files
const users = require("./users.js");
const products = require("./products.js");
const cart = require("./cart.js");

//using file on routes
router.use("/api/users", users);
router.use("/api/products", products);
router.use("/api/cart", cart);
module.exports = router;
