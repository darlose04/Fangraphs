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

  test("there are 5,762 entries returned", async () => {
    const response = await api.get("/api/playerstarting");
    expect(response.body.length).toBe(5762);
  });
});

afterAll(() => {
  sequelize.close();
});
