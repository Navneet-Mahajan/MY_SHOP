require("dotenv").config("./.env");
const express = require("express");
const api = require("./routes/index.routes");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./config/db");
app.use(express.json());

// routes from index.routes.js

app.use("/", api);
app.get("/", (req, res) => {
  res.send("This is the landing page ");
});

//Listening the server

app.listen(PORT, (req, res) => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
