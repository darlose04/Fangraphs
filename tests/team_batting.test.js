const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test route for all team batting statistics", () => {
  test("all team batting stats are returned as json", async () => {
    console.log("Entered test...");
    await api
      .get("/api/teambatting")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are 540 entries returned", async () => {
    const response = await api.get("/api/teambatting");
    expect(response.body.length).toBe(540);
  });
});

afterAll(() => {
  sequelize.close();
});
