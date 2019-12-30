require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("baseballstats", "zach", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mariadb"
});

module.exports = sequelize;
