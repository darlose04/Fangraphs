const express = require("express");
const router = express.Router();
const TeamRelieving = require("../models/TeamRelieving");
const Sequelize = require("sequelize");

// get all team relieving pitching stats
router.get("/", (req, res) => {
  TeamRelieving.findAll({
    order: [
      ["season", "ASC"],
      ["team", "ASC"]
    ]
  }).then(teams => res.json(teams));
});

// get team relieving pitching stats by season
router.get("/:season", (req, res) => {
  TeamRelieving.findAll({
    where: {
      season: req.params.season
    },
    order: [["team", "ASC"]]
  }).then(teams => res.json(teams));
});

// get team relieving pitching stats by team (returns info for that team across all seasons)
router.get("/teams/:team", (req, res) => {
  TeamRelieving.findAll({
    where: {
      team: req.params.team
    },
    order: [["season", "ASC"]]
  }).then(teams => res.json(teams));
});

module.exports = router;
