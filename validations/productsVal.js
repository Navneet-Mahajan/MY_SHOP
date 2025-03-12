const { Joi } = require("express-validation");

//validating the Product info before Registering the Product
exports.productRegister = {
  body: Joi.object({
    name: Joi.string().trim().required().messages({
      "any.required": "Name is required",
      "string.empty": "Name cannot be empty",
    }),
    price: Joi.number().positive().required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a valid number",
      "number.positive": "Price must be greater than zero",
    }),
  }),
};

//validation product info before updating the product
exports.productUpdate = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Product ID is required",
        "string.pattern.base": "Invalid product ID format",
      }),
  }),
  body: Joi.object({
    name: Joi.string().trim().optional(),
    price: Joi.number().positive().optional().messages({
      "number.base": "Price must be a valid number",
      "number.positive": "Price must be greater than zero",
    }),
  }),
};
