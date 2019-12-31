const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test routes for player batting statistics", () => {
  test("all player hitting stats are returned as json", async () => {
    console.log("Entered test...");
    await api
      .get("/api/playerbatting")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are 25,427 entries returned", async () => {
    const response = await api.get("/api/playerbatting");
    expect(response.body.length).toBe(25427);
  });
});

afterAll(() => {
  sequelize.close();
});
