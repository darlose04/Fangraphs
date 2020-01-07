const express = require("express");
const router = express.Router();
const TeamPitching = require("../models/TeamPitching");
const Sequelize = require("sequelize");

// get all team pitching stats
router.get("/", (req, res) => {
  TeamPitching.findAll({
    order: [
      ["season", "ASC"],
      ["team", "ASC"]
    ]
  }).then(teams => res.json(teams));
});

// find team pitching according to the season

// find team pitching according to the team (returns info for that team across all seasons)

module.exports = router;
