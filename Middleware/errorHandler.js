const { ValidationError } = require("express-validation");
const multer = require("multer");
const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    console.log(err);
    const message = [];
    Object.keys(err.details).map((key) => {
      return err.details[key].map((item) => message.push(item.message));
    });

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message || "Validation-Error",
      details: message,
    });
  }

  //Handle the multer error

  if (err instanceof multer.MulterError) {
    let errorMessage = "File upload error";

    // Customize error messages based on Multer error code
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "File size exceeds the allowed limit";
        break;
      case "LIMIT_FILE_COUNT":
        errorMessage = "Too many files uploaded";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        errorMessage = "Unexpected file uploaded";
        break;
      default:
        errorMessage = "File upload failed";
    }

    return res.status(400).json({
      status: "error",
      message: errorMessage,
      details: err.message,
    });
  }
  // Handle Other Errors
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    details: err.message,
  });
};

module.exports = { errorHandler };
