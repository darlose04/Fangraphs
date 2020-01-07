const express = require("express");
const router = express.Router();
const TeamStarting = require("../models/TeamStarting");
const Sequelize = require("sequelize");

// get all team starting pitching stats
router.get("/", (req, res) => {
  TeamStarting.findAll({
    order: [
      ["season", "ASC"],
      ["team", "ASC"]
    ]
  }).then(teams => res.json(teams));
});

// get team starting pitching stats by season
router.get("/:season", (req, res) => {
  TeamStarting.findAll({
    where: {
      season: req.params.season
    },
    order: [["team", "ASC"]]
  }).then(teams => res.json(teams));
});

// get team starting pitching stats by team (returns info for that team across all seasons)

module.exports = router;
