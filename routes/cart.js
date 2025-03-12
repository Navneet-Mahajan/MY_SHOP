require("dotenv").config({ path: "../.env" });
const express = require("express");
const passport = require("passport");
const { route } = require("./users");
const router = express.Router();
const cartMethods = require("../controllers/cartCon");
const { body, validationResult } = require("express-validator");
//add to Cart
router.post(
  "/",
  [body("productId").isMongoId().withMessage("Invalid product ID format")],
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware/route handler
  },
  passport.authenticate("jwt", { session: false }),
  cartMethods.addToCart
);

//view Cart

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartMethods.viewCart
);
module.exports = router;
