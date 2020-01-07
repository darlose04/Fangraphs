const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test route for returning all player starting pitching statistics", () => {
  test("all player starting pitching stats are returned as json", async () => {
    console.log("Entered test...");
    await api
      .get("/api/playerstarting")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  sequelize.close();
});
