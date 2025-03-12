const path = require("path");
const randomString = require("../Util/enc").generateRandomString;
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  // Allowed file types (e.g., images)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  // Check if the file type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files (JPEG, PNG, GIF) are allowed"), false); // Reject the file
  }
};

//Writing Upload Configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, next) => {
      next(null, "public/images");
    },
    filename: (req, file, next) => {
      next(
        null,
        file.mimetype.split("/")[0].toLowerCase() +
          "_" +
          randomString() +
          "_" +
          Date.now() +
          path.extname(file.originalname).toLowerCase()
      );
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 104857600 },
});

module.exports = upload;
