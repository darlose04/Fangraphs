const express = require("express");
const router = express.Router();
const PlayerBatting = require("../models/PlayerBatting");
const Sequelize = require("sequelize");

// get all player batting statistics
router.get("/", (req, res) => {
  PlayerBatting.findAll({
    order: [["season", "ASC"]]
  }).then(batters => res.json(batters));
});

module.exports = router;
