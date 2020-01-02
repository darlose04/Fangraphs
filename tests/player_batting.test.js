const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test route for all player batting statistics", () => {
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

  test("the second returned item has a lower war than the first returned item", async () => {
    const response = await api.get("/api/playerbatting");
    let firstItem = response.body[0];
    let secondItem = response.body[1];
    let lastItem = response.body[response.body.length - 1];
    expect(lastItem.war).toBeLessThanOrEqual(secondItem.war);
    expect(secondItem.war).toBeLessThanOrEqual(firstItem.war);
  });
});

describe("test route for returning player stats according to the season", () => {
  test("make sure each season is returned as json", async () => {
    let year = 2002;
    while (year < 2020) {
      await api
        .get(`/api/playerbatting/${year}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      year++;
    }
  });

  test("returned items are ordered by descending war", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/playerbatting/${year}`);
      let firstItem = response.body[0];
      let secondItem = response.body[1];
      let length = response.body.length;
      let lastItem = response.body[length - 1];
      expect(lastItem.war).toBeLessThanOrEqual(secondItem.war);
      expect(secondItem.war).toBeLessThanOrEqual(firstItem.war);

      year++;
    }
  });

  test("returned items have the correct season", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/playerbatting/${year}`);
      let firstItemSeason = response.body[0].season;
      let lastItemSeason = response.body[response.body.length - 1].season;
      expect(firstItemSeason).toEqual(year);
      expect(lastItemSeason).toEqual(year);

      year++;
    }
  });
});

describe("test route for returning individual player statistics", () => {
  test("returned items are json", async () => {
    await api
      .get("/api/playerbatting/players/Albert Pujols")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned items are ordered by ascending season", async () => {
    let response = await api.get("/api/playerbatting/players/Albert Pujols");
    let firstSeason = response.body[0].season;
    let secondSeason = response.body[1].season;
    let lastSeason = response.body[response.body.length - 1].season;

    expect(firstSeason).toBeLessThan(secondSeason);
    expect(secondSeason).toBeLessThan(lastSeason);
  });
});

afterAll(() => {
  sequelize.close();
});
