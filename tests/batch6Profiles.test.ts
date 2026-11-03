import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import type { KitProfile } from "../engine/profiles";

it("uses physical Hail of Arrows damage in fallback counters despite the contradictory raw template tag", () => {
  const profile = JSON.parse(readFileSync(new URL("../data/16.21/profiles/Varus.json", import.meta.url), "utf8")) as KitProfile;
  expect(profile.abilities.find(ability => ability.kind === "E")?.damageTypes).toEqual(["physical"]);
});
