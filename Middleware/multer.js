const path = require("path");
const randomString = require("../Util/enc").generateRandomString;
const multer = require("multer");
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
  limits: { fileSize: 104857600 },
});

module.exports = upload;
