const express = require("express");
const router = express.Router();
const PlayerBatting = require("../models/PlayerBatting");
const Sequelize = require("sequelize");

// get all player batting statistics
router.get("/", (req, res) => {
  PlayerBatting.findAll({
    order: [
      ["season", "ASC"],
      ["war", "DESC"]
    ]
  }).then(batters => res.json(batters));
});

// get player batting stats by season
router.get("/:season", (req, res) => {
  PlayerBatting.findAll({
    where: {
      season: req.params.season
    },
    order: [["war", "DESC"]]
  }).then(batters => res.json(batters));
});

// get individual player statistics
router.get("/players/:name", (req, res) => {
  PlayerBatting.findAll({
    where: {
      name: req.params.name
    },
    order: [["season", "ASC"]]
  }).then(batter => res.json(batter));
});

// get player stats by team
router.get("/teams/:team", (req, res) => {
  PlayerBatting.findAll({
    where: {
      team: req.params.team
    },
    order: [["season", "ASC"]]
  }).then(teams => res.json(teams));
});

module.exports = router;
