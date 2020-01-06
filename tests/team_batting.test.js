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

describe("test route for returning stats by season", () => {
  test("check that each season is returned as json", async () => {
    let year = 2002;
    while (year < 2020) {
      await api
        .get(`/api/teambatting/${year}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      year++;
    }
  });

  test("check that the teams are ordered by alphabetical order", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/teambatting/${year}`);
      let firstItem = response.body[0];
      let lastItem = response.body[response.body.length - 1];
      expect(firstItem.team).toBe("Angels");
      expect(lastItem.team).toBe("Yankees");
    }
  });

  // check that 30 items always get returned
});

afterAll(() => {
  sequelize.close();
});
