const { Joi } = require("express-validation");

//validation user's Information before Registration
exports.authValidate = {
  body: Joi.object({
    firstName: Joi.string().trim().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    lastName: Joi.string().trim().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
    email: Joi.string()
      .trim()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/)
      .required()
      .messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
        "string.email": "Please enter a valid email address",
      }),
    password: Joi.string().min(8).max(20).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 20 characters",
    }),
    role: Joi.string().valid("user", "merchant").required().messages({
      "any.required": "Role is required",
      "any.only": "Role must be one of 'admin', 'user', or 'guest'",
    }),
  }),
};

//validating login credentials
exports.valLogin = {
  body: Joi.object({
    email: Joi.string().trim().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().trim().required().messages({
      "any.required": "Password is required",
    }),
  }),
};

//validation Update information Before Updation
exports.valUpdate = {
  body: Joi.object({
    firstName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().optional(),
    password: Joi.string().min(8).max(20).optional().messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 20 characters",
    }),
  }),
};

//validation email before sending otp
exports.valGetOTP = {
  body: Joi.object({
    email: Joi.string().trim().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  }),
};

//validating the email and OTP before resetting the password
exports.valResetPassword = {
  body: Joi.object({
    OTP: Joi.string().trim().required().messages({
      "any.required": "OTP is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    newPassword: Joi.string().min(8).max(20).required().messages({
      "any.required": "New password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 20 characters",
    }),
  }),
};
