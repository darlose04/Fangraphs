const express = require("express");
const router = express.Router();
const PlayerStarting = require("../models/PlayerStarting");
const Sequelize = require("sequelize");

// get all player starting pitching stats
router.get("/", (req, res) => {
  PlayerStarting.findAll({
    order: [
      ["season", "ASC"],
      ["war", "DESC"]
    ]
  }).then(starters => res.json(starters));
});

// get player starting pitching stats by season
router.get("/:season", (req, res) => {
  PlayerStarting.findAll({
    where: {
      season: req.params.season
    },
    order: [["war", "DESC"]]
  }).then(starters => res.json(starters));
});

module.exports = router;
