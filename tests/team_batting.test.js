const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

afterAll(() => {
  sequelize.close();
});
