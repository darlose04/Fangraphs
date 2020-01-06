const express = require("express");
const router = express.Router();
const TeamBatting = require("../models/TeamBatting");
const Sequelize = require("sequelize");

router.get("/", (req, res) => {
  res.send("This is the initial team batting page");
});

module.exports = router;
