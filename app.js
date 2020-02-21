const express = require("express");
const cors = require("cors");
const compression = require("compression");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log(err));

const app = express();
// initialize cors to allow for cross origin resource sharing
app.use(cors());
app.use(compression());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/glossary", (req, res) => {
  res.render("glossary");
});

// Routes for player batting statistics
app.use("/api/playerbatting", require("./routes/player_batting"));

// Routes for team batting statistics
app.use("/api/teambatting", require("./routes/team_batting"));

// Routes for team pitching statistics
app.use("/api/teampitching", require("./routes/team_pitching"));

// Routes for team starting pitching statistics
app.use("/api/teamstarting", require("./routes/team_starting"));

// Routes for team relieving pitching statistics
app.use("/api/teamrelieving", require("./routes/team_relieving"));

// Routes for player starting pitching statistics
app.use("/api/playerstarting", require("./routes/player_starting"));

// Routes for player relief pitching statistics
app.use("/api/playerrelieving", require("./routes/player_relieving"));

module.exports = app;
