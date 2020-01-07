const Sequelize = require("sequelize");
const db = require("../config/database");

const PlayerRelieving = db.define(
  "relievers",
  {
    season: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    team: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wins: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    losses: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    saves: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    games: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ip: {
      type: Sequelize.DECIMAL(5, 1),
      allowNull: false
    },
    hits: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    runs: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    er: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hr: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    so: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ibb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hbp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    gb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ld: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    balls: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    strikes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pitches: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    k_per_9: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false
    },
    bb_per_9: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false
    },
    hr_per_9: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false
    },
    avg: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    babip: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    lob_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gb_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ld_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fb_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hr_per_fb: {
      type: Sequelize.STRING,
      allowNull: false
    },
    era: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false
    },
    whip: {
      type: Sequelize.DECIMAL(5, 3),
      allowNull: false
    },
    fip: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false
    },
    xfip: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false
    },
    war: {
      type: Sequelize.DECIMAL(3, 1),
      allowNull: false
    },
    playerid: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "relievers"
  }
);

module.exports = PlayerRelieving;
