require("dotenv").config("./.env");
const express = require("express");
const appRoutes = require("../routes/index.routes.js");

const PORT = process.env.PORT;
const app = express();

//Import Routes here
// routes from index.routes.js

app.use("/", appRoutes);

//Listening the server

app.listen(PORT, (req, res) => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
