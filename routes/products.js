const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../Middleware/passport");
const path = require("path");
const multer = require("multer");
const upload = require("../Middleware/multer");
const { updateLocale } = require("moment");
const authorize = require("../Util/authorize");
const {
  registerPro,
  viewProduct,
  listAll,
  updateProduct,
} = require("../controllers/productCon");
const { validate } = require("express-validation");
const { param, body, validationResult } = require("express-validator");
const {
  productRegister,
  productUpdate,
} = require("../validations/productsVal");

// register product - /api/product/
router.post(
  "/",
  authorize.authorize(["merchant"]),
  upload.single("image"),
  validate(productRegister, { context: true }, { abortEarly: false }),
  registerPro
);

//view product - /api/product/:id
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID format")],
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware/route handler
  },
  viewProduct
);

//List all  - api/product/
router.get("/", listAll);

//Update Product - api/product/
router.put(
  "/:id",
  authorize.authorize(["merchant"]),
  upload.single("image"),
  validate(productUpdate, { context: true }, { abortEarly: false }),
  updateProduct
);

module.exports = router;
