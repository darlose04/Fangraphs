const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test route for returning all team starting pitching statistics", () => {
  test("all team starting pitching stats are returned as json", async () => {
    console.log("Entered test...");
    await api
      .get("/api/teamstarting")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are 540 entries returned", async () => {
    const response = await api.get("/api/teampitching");
    expect(response.body.length).toBe(540);
  });
});

afterAll(() => {
  sequelize.close();
});
