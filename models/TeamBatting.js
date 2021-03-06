const Sequelize = require("sequelize");
const db = require("../config/database");

const TeamBatting = db.define(
  "team_batting",
  {
    season: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    team: {
      type: Sequelize.STRING,
      allowNull: false
    },
    games: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    plate_appearances: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    at_bats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hits: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    singles: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    doubles: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    triples: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    home_runs: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    runs: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rbi: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ibb: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    so: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hbp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sf: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    sh: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    gdp: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bb_per_k: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bb_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    k_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gb_per_fb: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false
    },
    ld_perc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gb_perc: {
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
    iso: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    babip: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    avg: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    obp: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    slg: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    ops: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    woba: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    wrc_plus: {
      type: Sequelize.DECIMAL(4, 3),
      allowNull: false
    },
    bsr: {
      type: Sequelize.DECIMAL(3, 1),
      allowNull: false
    },
    off: {
      type: Sequelize.DECIMAL(4, 1),
      allowNull: false
    },
    def: {
      type: Sequelize.DECIMAL(4, 1),
      allowNull: false
    },
    war: {
      type: Sequelize.DECIMAL(3, 1),
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "team_batting"
  }
);

module.exports = TeamBatting;
