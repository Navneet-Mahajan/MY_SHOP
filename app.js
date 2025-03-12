//importing env and Passport configurations
require("dotenv").config("./.env");
require("./Middleware/passport");

//Initializing express app
const express = require("express");
const app = express();

//routes
const api = require("./routes/index.routes");
const db = require("./config/db");
const PORT = process.env.PORT || 3000;

//app.use
const passport = require("passport");
app.use(express.json());
app.use(express.static("public/"));
app.use([passport.initialize()]);

//validation of data
const { ValidationError } = require("express-validation");
const { path } = require("./models/userSchema");
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const details = err.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
      type: detail.type,
    }));

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message || "Validation-Error",
      details: err.details,
    });
  }
  next(err); // Pass other errors to the next middleware
});

// routes from index.routes.js
app.use("/", api);
app.get("/", (req, res) => {
  res.send("This is the landing page ");
});
//Listening the server

app.listen(PORT, (req, res) => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
