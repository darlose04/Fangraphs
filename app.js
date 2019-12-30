const express = require("express");
const cors = require("cors");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log(err));

const app = express();
// initialize cors to allow for cross origin resource sharing
app.use(cors());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

// Routes for player batting statistics
app.use("/api/playerbatting", require("./routes/player_batting"));

module.exports = app;
