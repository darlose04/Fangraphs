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

  test("Returned statistics are ordered by season (ASC) and team (ASC)", async () => {
    const response = await api.get("/api/teambatting");
    let firstItem = response.body[0];
    expect(firstItem.team).toBe("Angels");
    expect(firstItem.season).toBe(2002);
    let itemThirty = response.body[29];
    expect(itemThirty.team).toBe("Yankees");
    expect(itemThirty.season).toBe(2002);
    let lastItem = response.body[response.body.length - 1];
    expect(lastItem.team).toBe("Yankees");
    expect(lastItem.season).toBe(2019);
  });
});

afterAll(() => {
  sequelize.close();
});
