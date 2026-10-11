import { describe, expect, it } from "vitest";
import { type Route, parseRoute, routeHash } from "../../web/src/routes";

describe("web routes", () => {
  it("reads each page from the hash", () => {
    expect(parseRoute("")).toEqual({ page: "picker" });
    expect(parseRoute("#/")).toEqual({ page: "picker" });
    expect(parseRoute("#/vs/Darius")).toEqual({ page: "picker", enemy: "Darius" });
    expect(parseRoute("#/matchup/Fiora/Darius")).toEqual({ page: "matchup", you: "Fiora", enemy: "Darius" });
    expect(parseRoute("#/kit/Garen")).toEqual({ page: "kit", champion: "Garen" });
    expect(parseRoute("#/settings")).toEqual({ page: "settings" });
  });

  it("falls back to the picker on anything it doesn't know", () => {
    expect(parseRoute("#/nowhere")).toEqual({ page: "picker" });
    expect(parseRoute("#/matchup/Fiora")).toEqual({ page: "picker" });
    expect(parseRoute("#/kit")).toEqual({ page: "picker" });
  });

  it("round-trips every page, names with any characters included", () => {
    const routes: Route[] = [
      { page: "picker" },
      { page: "picker", enemy: "KSante" },
      { page: "matchup", you: "Kog'Maw", enemy: "Dr. Mundo" },
      { page: "kit", champion: "Nunu & Willump" },
      { page: "settings" },
    ];
    for (const route of routes) expect(parseRoute(routeHash(route))).toEqual(route);
  });
});
