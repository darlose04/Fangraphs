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

  test("the first returned item is Curt Schilling and the 2002 season", async () => {
    const response = await api.get("/api/playerstarting");
    let firstItem = response.body[0];
    expect(firstItem.name).toBe("Curt Schilling");
    expect(firstItem.season).toBe(2002);
  });

  test("the second returned item has a lower war than the first returned item", async () => {
    const response = await api.get("/api/playerstarting");
    let firstItem = response.body[0];
    let secondItem = response.body[1];
    let lastItem = response.body[response.body.length - 1];
    expect(lastItem.war).toBeLessThanOrEqual(secondItem.war);
    expect(secondItem.war).toBeLessThanOrEqual(firstItem.war);
  });
});

afterAll(() => {
  sequelize.close();
});
