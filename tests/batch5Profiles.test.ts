import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildProfiles } from "../pipeline/profiles/build";
import { championData, context, records } from "./kits/helpers";

const ids = ["Corki", "Draven", "KogMaw", "Sivir", "Tristana", "Twitch"];
const json = (file: string) => JSON.parse(readFileSync(new URL(`../data/16.20/${file}`, import.meta.url), "utf8"));
const built = buildProfiles(ids.map(championData), ids.flatMap(records), json("glossary.json"));

describe("reviewed batch-five fallback profiles", () => {
  it.each(ids)("keeps %s's committed fallback consistent with its reviewed current records", id => {
    expect(built.staleOverrides).toEqual([]);
    expect(built.kits.find(k => k.champion === id)).toEqual(json(`profiles/${id}.json`));
  });
  it("retains the retired Corki template as an attributed archive without advertising it as an active W", () => {
    const archived = records("Corki").find(r => r.name === "Special Delivery")!;
    expect(archived.historical).toBe(true);
    expect(archived.page).toEqual({ title: "Template:Data Corki/Special Delivery", revid: 3906612 });
    const source = archived.gameSources!.find(s => s.object === "Characters/Corki/CharacterRecords/Root")!;
    expect(source.sha256).toBe("a97cf1a9b02fa58cfe6902f37343774c55d104853e5f287e70b0c54e9088a222");
    const spells = JSON.parse(source.text.find(t => t.startsWith("spells: "))!.slice("spells: ".length));
    expect(spells).toEqual([
      "Characters/Corki/Spells/PhosphorusBombAbility/PhosphorusBomb",
      "Characters/Corki/Spells/CarpetBombAbility/CarpetBomb",
      "Characters/Corki/Spells/GGunAbility/GGun",
      "Characters/Corki/Spells/MissileBarrageAbility/MissileBarrage",
    ]);
    const kit = built.kits.find(k => k.champion === "Corki")!;
    expect(kit.abilities.filter(a => a.kind === "W").map(a => a.name)).toEqual(["Valkyrie"]);
    expect(context("Corki").ability("W").name).toBe("Valkyrie");
    expect(() => context("Corki").ability("Special Delivery")).toThrow("no such ability");
  });
  it("does not attribute Draven's two-second slow duration to his independently timed knock-aside", () => {
    const spell = built.kits.find(k => k.champion === "Draven")!.abilities.find(a => a.kind === "E")!;
    expect(spell.applies.find(a => a.type === "airborne")?.duration).toBeUndefined();
    expect(spell.applies.find(a => a.type === "slow")?.duration).toBe(2);
  });
  it("keeps the upstream uncertainty qualifier on Kog'Maw's ooze spacing", () => {
    const spell = built.kits.find(k => k.champion === "KogMaw")!.abilities.find(a => a.kind === "E")!;
    expect(spell.notes?.some(note => note.startsWith("Pending for test:") && note.includes("125 units"))).toBe(true);
  });
});
