const express = require("express");
const cors = require("cors");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
