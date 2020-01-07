const sequelize = require("../config/database");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test route for returning all player relief pitching statistics", () => {
  test("all player relief pitching stats are returned as json", async () => {
    console.log("Entered test...");
    await api
      .get("/api/playerrelieving")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are 10,459 entries returned", async () => {
    const response = await api.get("/api/playerrelieving");
    expect(response.body.length).toBe(10459);
  });

  test("the first returned item is John Smoltz and the 2002 season", async () => {
    const response = await api.get("/api/playerrelieving");
    let firstItem = response.body[0];
    expect(firstItem.name).toBe("John Smoltz");
    expect(firstItem.season).toBe(2002);
  });

  test("the second returned item has fewer saves than the first returned item", async () => {
    const response = await api.get("/api/playerrelieving");
    let firstItem = response.body[0];
    let secondItem = response.body[1];
    let lastItem = response.body[response.body.length - 1];
    expect(lastItem.saves).toBeLessThanOrEqual(secondItem.saves);
    expect(secondItem.saves).toBeLessThanOrEqual(firstItem.saves);
  });
});

describe("test route for returning player relief pitching stats according to the season", () => {
  test("make sure each season is returned as json", async () => {
    let year = 2002;
    while (year < 2020) {
      await api
        .get(`/api/playerrelieving/${year}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      year++;
    }
  });

  test("returned items are ordered by descending saves", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/playerrelieving/${year}`);
      let firstItem = response.body[0];
      let secondItem = response.body[1];
      let length = response.body.length;
      let lastItem = response.body[length - 1];
      expect(lastItem.saves).toBeLessThanOrEqual(secondItem.saves);
      expect(secondItem.saves).toBeLessThanOrEqual(firstItem.saves);

      year++;
    }
  });

  test("returned items have the correct season", async () => {
    let year = 2002;
    while (year < 2020) {
      let response = await api.get(`/api/playerrelieving/${year}`);
      let firstItemSeason = response.body[0].season;
      let lastItemSeason = response.body[response.body.length - 1].season;
      expect(firstItemSeason).toEqual(year);
      expect(lastItemSeason).toEqual(year);

      year++;
    }
  });
});

describe("test route for returning individual relief pitching stats", () => {
  test("returned items are json", async () => {
    let name = "Pedro Strop";
    await api
      .get(`/api/playerrelieving/players/${name}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned items are ordered by ascending season", async () => {
    let name = "Kenley Jansen";
    let response = await api.get(`/api/playerrelieving/players/${name}`);
    let firstSeason = response.body[0].season;
    let secondSeason = response.body[1].season;
    let lastSeason = response.body[response.body.length - 1].season;

    expect(firstSeason).toBeLessThan(secondSeason);
    expect(secondSeason).toBeLessThan(lastSeason);
  });

  test("check that the returned items are for the correct player", async () => {
    let name = "Zach Britton";
    let response = await api.get(`/api/playerrelieving/players/${name}`);

    for (i = 0; i < response.body.length; i++) {
      expect(response.body[i].name).toBe(name);
    }
  });
});

describe("test route for returning player relief pitching stats by team", () => {
  test("stats are returned as json", async () => {
    let team = "Athletics";
    await api
      .get(`/api/playerrelieving/teams/${team}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("players stats by team are returned in chronological order by season", async () => {
    let team = "Angels";
    let response = await api.get(`/api/playerrelieving/teams/${team}`);

    for (let i = 0; i < response.body.length; i += 25) {
      expect(response.body[i].season).toBeLessThanOrEqual(
        response.body[i + 1].season
      );
    }
  });

  test("team name is the same for all returned items", async () => {
    let team = "Mariners";
    let response = await api.get(`/api/playerrelieving/teams/${team}`);

    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i].team).toBe(team);
    }
  });
});

describe("test route for returning player relief pitching stats by team, by season", () => {
  test("stats are returned as json", async () => {
    let team = "Twins";
    let season = 2006;
    await api
      .get(`/api/playerrelieving/teams/${team}/${season}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("make sure correct team and season is returned", async () => {
    let team = "Reds";
    let season = 2005;
    let response = await api.get(
      `/api/playerrelieving/teams/${team}/${season}`
    );

    for (i = 0; i < response.body.length; i++) {
      expect(response.body[i].team).toBe(team);
      expect(response.body[i].season).toBe(season);
    }
  });

  test("make sure player stats are ordered by saves", async () => {
    let team = "Phillies";
    let season = 2007;
    let response = await api.get(
      `/api/playerrelieving/teams/${team}/${season}`
    );

    while (i < response.body.length - 1) {
      expect(response.body[i].saves).toBeGreaterThanOrEqual(
        response.body[i + 1].saves
      );
    }
  });
});

afterAll(() => {
  sequelize.close();
});
