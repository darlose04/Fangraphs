const express = require("express");
const router = express.Router();
const PlayerRelieving = require("../models/PlayerRelieving");
const Sequelize = require("sequelize");

// get all player relief pitching stats
router.get("/", (req, res) => {
  PlayerRelieving.findAll({
    order: [
      ["season", "ASC"],
      ["saves", "DESC"]
    ]
  }).then(relievers => res.json(relievers));
});

// get player relief pitching stats by season
router.get("/:season", (req, res) => {
  PlayerRelieving.findAll({
    where: {
      season: req.params.season
    },
    order: [["saves", "DESC"]]
  }).then(relieving => res.json(relieving));
});

// get individual reliever statistics
router.get("/players/:name", (req, res) => {
  PlayerRelieving.findAll({
    where: {
      name: req.params.name
    },
    order: [["season", "ASC"]]
  }).then(reliever => res.json(reliever));
});

// get reliever stats by team
router.get("/teams/:team", (req, res) => {
  PlayerRelieving.findAll({
    where: {
      team: req.params.team
    },
    order: [["season", "ASC"]]
  }).then(teams => res.json(teams));
});

// get player starting pitching stats by team, by season
router.get("/teams/:team/:season", (req, res) => {
  PlayerRelieving.findAll({
    where: {
      team: req.params.team,
      season: req.params.season
    },
    order: [["saves", "DESC"]]
  }).then(teams => res.json(teams));
});

module.exports = router;
