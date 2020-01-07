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
    const response = await api.get("/api/teamstarting");
    expect(response.body.length).toBe(540);
  });

  test("Returned statistics are ordered by season (ASC) and team (ASC)", async () => {
    const response = await api.get("/api/teamstarting");
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

describe("test route for returning team starting pitching stats by season", () => {
  test("check that each season is returned as json", async () => {
    let year = 2002;
    while (year < 2020) {
      await api
        .get(`/api/teamstarting/${year}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      year++;
    }
  });

  test("make sure that 30 teams are being returned", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/teamstarting/${year}`);
      expect(response.body.length).toBe(30);

      year++;
    }
  });

  test("check that the teams are ordered by alphabetical order", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/teamstarting/${year}`);
      let firstItem = response.body[0];
      let lastItem = response.body[response.body.length - 1];
      expect(firstItem.team).toBe("Angels");
      expect(lastItem.team).toBe("Yankees");

      year++;
    }
  });

  test("check that the season equals the year in the url", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/teamstarting/${year}`);

      for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].season).toEqual(year);
      }

      year++;
    }
  });
});

afterAll(() => {
  sequelize.close();
});
