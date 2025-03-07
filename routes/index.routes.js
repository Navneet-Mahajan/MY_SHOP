const express = require("express");
const router = express.Router();

const users = require("./users.js");
const products = require("./products.js");

router.use("/api/users", users);
router.use("/api/products", products);

module.exports = router;
