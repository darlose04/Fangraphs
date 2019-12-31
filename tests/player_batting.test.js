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

  test("the first returned item is Barry Bonds and the 2002 season", async () => {
    const response = await api.get("/api/playerbatting");
    let firstItem = response.body[0];
    expect(firstItem.name).toBe("Barry Bonds");
    expect(firstItem.season).toBe(2002);
  });
});

afterAll(() => {
  sequelize.close();
});
