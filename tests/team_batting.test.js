const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("test initial team batting route", async () => {
  await api.get("/api/teambatting").expect(200);
});

afterAll(() => {
  sequelize.close();
});
