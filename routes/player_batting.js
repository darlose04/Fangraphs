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
  }).then(player_batting => res.json(player_batting));
});

// get player batting stats by season
router.get("/:season", (req, res) => {
  PlayerBatting.findAll({
    where: {
      season: req.params.season
    },
    order: [["war", "DESC"]]
  }).then(player_batting => res.json(player_batting));
});

module.exports = router;
