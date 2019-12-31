const express = require("express");
const router = express.Router();
const PlayerBatting = require("../models/PlayerBatting");
const Sequelize = require("sequelize");

// get all player batting statistics
router.get("/", (req, res) => {
  PlayerBatting.findAll({
    order: [["season", "ASC"]]
  }).then(player_batting => res.json(player_batting));
});

module.exports = router;
