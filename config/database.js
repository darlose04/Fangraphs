require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("baseballstats", "zach", process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    timezone: "Etc/GMT+6"
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
});

module.exports = sequelize;
