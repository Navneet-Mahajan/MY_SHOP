const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = require("../Middleware/multer");
const {
  login,
  registerUser,
  getOTP,
  updateUser,
  resetPassword,
  viewProfile,
} = require("../controllers/usersCon");
const passport = require("passport");
const { validate } = require("express-validation");
const {
  authValidate,
  valUpdate,
  valLogin,
  valResetPassword,
  valGetOTP,
} = require("../validations/usersVal");

//register Route - Post/register
router.post(
  "/register",
  upload.single("profileImage"),
  validate(authValidate, { context: true }, { abortEarly: false }),
  registerUser
);

//login route  - post/

router.post(
  "/",
  validate(valLogin, { context: true }, { abortEarly: false }),
  login
);

//profile route -get/

router.get("/", passport.authenticate("jwt", { session: false }), viewProfile);

//update route - put

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("profileImage"),
  validate(valUpdate, { context: true }, { abortEarly: false }),
  updateUser
);

//forget Password

router.post(
  "/send-otp",
  validate(valGetOTP, { context: true }, { abortEarly: false }),
  getOTP
);

//reset password

router.put(
  "/reset-password",
  validate(valResetPassword, { context: true }, { abortEarly: false }),
  resetPassword
);

module.exports = router;
