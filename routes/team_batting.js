const express = require("express");
const router = express.Router();
const TeamBatting = require("../models/TeamBatting");
const Sequelize = require("sequelize");

// get all team batting statistics
router.get("/", (req, res) => {
  TeamBatting.findAll({
    order: [
      ["season", "ASC"],
      ["team", "ASC"]
    ]
  }).then(teams => res.json(teams));
});

// find team batting according to the season
router.get("/:season", (req, res) => {
  TeamBatting.findAll({
    where: {
      season: req.params.season
    },
    order: [["team", "ASC"]]
  }).then(teams => res.json(teams));
});

// get team batting according to the team (returns info for that team across all seasons)
router.get("/teams/:team", (req, res) => {
  TeamBatting.findAll({
    where: {
      team: req.params.team
    },
    order: [["season", "ASC"]]
  }).then(teams => res.json(teams));
});

module.exports = router;
