//importing env and Passport configurations
require("dotenv").config("./.env");
require("./Middleware/passport");

//Initializing express app
const express = require("express");
const app = express();

//routes
const api = require("./routes/index.routes");
const { errorHandler } = require("./Middleware/errorHandler");
const db = require("./config/db");
const PORT = process.env.PORT || 3000;

//app.use
const passport = require("passport");
app.use(express.json());
app.use(express.static("public/"));
app.use([passport.initialize()]);
const { path } = require("./models/userSchema");

// routes from index.routes.js
app.use("/", api);
app.get("/", (req, res) => {
  res.send("This is the landing page ");
});

// Not Found Error..
app.use((req, res) => {
  res.status(404).json({ message: "This is the landing page " });
});

//error Handler Middleware
app.use(errorHandler);

//Listening the server
app.listen(PORT, (req, res) => {
  console.clear();
  console.log(`The server is running at http://localhost:${PORT}`);
});
