const express = require("express");
const router = express.Router();
const TeamBatting = require("../models/TeamBatting");
const Sequelize = require("sequelize");

router.get("/", (req, res) => {
  TeamBatting.findAll({
    order: [
      ["season", "ASC"],
      ["team", "ASC"]
    ]
  }).then(teams => res.json(teams));
});

module.exports = router;
