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

describe("test route for returning player starting pitching stats according to the season", () => {
  test("make sure each season is returned as json", async () => {
    let year = 2002;
    while (year < 2020) {
      await api
        .get(`/api/playerstarting/${year}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      year++;
    }
  });

  test("returned items are ordered by descending war", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/playerstarting/${year}`);
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
      let response = await api.get(`/api/playerstarting/${year}`);
      let firstItemSeason = response.body[0].season;
      let lastItemSeason = response.body[response.body.length - 1].season;
      expect(firstItemSeason).toEqual(year);
      expect(lastItemSeason).toEqual(year);

      year++;
    }
  });
});

describe("test route for returning individual starting pitching stats", () => {
  test("returned items are json", async () => {
    let name = "Randy Johnson";
    await api
      .get(`/api/playerstarting/players/${name}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned items are ordered by ascending season", async () => {
    let name = "Jon Lester";
    let response = await api.get(`/api/playerstarting/players/${name}`);
    let firstSeason = response.body[0].season;
    let secondSeason = response.body[1].season;
    let lastSeason = response.body[response.body.length - 1].season;

    expect(firstSeason).toBeLessThan(secondSeason);
    expect(secondSeason).toBeLessThan(lastSeason);
  });

  test("check that the returned items are for the correct player", async () => {
    let name = "Clayton Kershaw";
    let response = await api.get(`/api/playerstarting/players/${name}`);

    for (i = 0; i < response.body.length; i++) {
      expect(response.body[i].name).toBe(name);
    }
  });
});

describe("test route for returning player starting pitching stats by team", () => {
  test("stats are returned as json", async () => {
    let team = "Cubs";
    await api
      .get(`/api/playerstarting/teams/${team}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("players stats by team are returned in chronological order by season", async () => {
    let team = "Angels";
    let response = await api.get(`/api/playerstarting/teams/${team}`);

    for (let i = 0; i < response.body.length; i += 25) {
      expect(response.body[i].season).toBeLessThanOrEqual(
        response.body[i + 1].season
      );
    }
  });

  test("team name is the same for all returned items", async () => {
    let team = "Red Sox";
    let response = await api.get(`/api/playerstarting/teams/${team}`);

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i].team).toBe(team);
    }
  });
});

describe("test route for returning player starting pitching stats by team, by season", () => {
  test("stats are returned as json", async () => {
    let team = "Twins";
    let season = 2006;
    await api
      .get(`/api/playerstarting/teams/${team}/${season}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("make sure correct team and season is returned", async () => {
    let team = "Reds";
    let season = 2005;
    let response = await api.get(`/api/playerstarting/teams/${team}/${season}`);

    for (i = 0; i < response.body.length; i++) {
      expect(response.body[i].team).toBe(team);
      expect(response.body[i].season).toBe(season);
    }
  });

  test("make sure player stats are ordered by war", async () => {
    let team = "Phillies";
    let season = 2007;
    let response = await api.get(`/api/playerstarting/teams/${team}/${season}`);

    while (i < response.body.length - 1) {
      expect(response.body[i].war).toBeGreaterThanOrEqual(
        response.body[i + 1].war
      );
    }
  });
});

afterAll(() => {
  sequelize.close();
});
