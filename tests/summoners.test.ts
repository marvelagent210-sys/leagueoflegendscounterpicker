/** The summoner spell catalog (M8's loadouts): which spells it holds, how the wiki's spell data and articles are read, and the committed catalog. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Series } from "../engine/abilities";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { readJson } from "../pipeline/lib/files";
import type { DDragonSummoners } from "../pipeline/sources/ddragon";
import type { WikiPage } from "../pipeline/sources/wiki";
import { type SpellCatalog, type SpellRecord, buildSpellCatalog, classicSpells } from "../pipeline/summoners/records";

const spell = (id: string, name: string, cooldown: number, range: number, modes: string[]) => ({ id, name, description: `${name}'s description.`, cooldown: [cooldown], range: [range], modes });

/** Data Dragon's list, cut down: two spells Summoner's Rift offers and two it doesn't. */
const DDRAGON: DDragonSummoners = {
  version: "16.21.1",
  data: {
    SummonerFlash: spell("SummonerFlash", "Flash", 300, 425, ["ARAM", "CLASSIC"]),
    SummonerSmite: spell("SummonerSmite", "Smite", 15, 500, ["CLASSIC", "URF"]),
    SummonerMana: spell("SummonerMana", "Clarity", 240, 600, ["ARAM"]),
    SummonerSnowball: spell("SummonerSnowball", "Mark", 80, 1600, ["ARAM", "ARSR"]),
  },
};

const MODULE = `-- The wiki's spell data module, cut down.
return {
  ["Flash"] = { ["cooldown"] = "300", ["range"] = "400 ([[Quick cast]])", ["maps"] = { ["sr"] = true, ["ha"] = true },
    ["effect"] = "[[Blink]]s your [[champion]] a short distance toward the target location." },
  ["Smite"] = { ["cooldown"] = "15", ["recharge"] = "90", ["charges"] = "2", ["range"] = "{{tip|Edge range|nolink=true|500}}", ["maps"] = { ["sr"] = true },
    ["effect"] = "Deals {{as|600 true damage}} to the target monster. Removes {{ccib|Summoner spell icon.png|summoner spell}} debuffs.",
    ["effect2"] = "Grows by {{pp|10 + (20-10)/17*(x-1)|1 to 20 by 1}} damage." },
  ["Clarity"] = { ["cooldown"] = "240", ["range"] = "600", ["maps"] = { ["sr"] = false, ["ha"] = true }, ["effect"] = "Restores mana." },
}`;

const page = (title: string, content: string, revid = 1): WikiPage => ({ title, pageid: revid, revid, timestamp: "2026-11-01T00:00:00Z", content });

const ARTICLES = [
  page("Flash", "{{Spell info|Flash}}\n\n== Notes ==\n* '''Flash''' cannot be used while {{tip|root|rooted}}.\n** It casts at {{pp|100 to 200}} range at most.\n{{safesubst:unexpected|desc=\n* A bug that the notes leave out.|pagename=Flash\n}}\n\n== Strategy ==\n* Not a note.", 11),
  page("Smite", "{{Spell info|Smite}}\n\n== Patch History ==\n* Not a note either.", 12),
];

const championData = { name: () => undefined, get: () => undefined, apiname: () => undefined } as never;

/** The rule pages the spell effects quote, cut down to a sentence each. */
const GLOSSARY = [
  page("Template:Tip data/Cast-inhibiting crowd control", "{{Tip data|description = {{tip|Stasis}} and {{tip|Suppression}} disable all {{ccib|Summoner spell icon.png|summoner spells}}.}}", 21),
  page("Template:Tip data/Spell shield", "{{Tip data|description = A spell shield blocks almost none from [[summoner spell]]s.}}", 22),
  page("Stealth", "Exhaust and Ignite break stealth.", 23),
  page("Damage", "* '''Item:''' this includes [[summoner spell]] damage against champions.", 24),
];

function catalog(ddragon = DDRAGON, articles = ARTICLES): SpellCatalog {
  return buildSpellCatalog({ dataset: "16.21", patch: "26.21", ddragon, spellData: page("Module:SpellData/data", MODULE, 10), articles, glossary: GLOSSARY, championData });
}

/** A series' value at a champion level: one value a level, or values at listed levels ("1 to 20 by 1"). */
function atLevel(series: Series, level: number): number {
  const value = series.kind === "level" ? series.values[level - 1] : series.kind === "variable" && series.variable === "level" ? series.values[series.points.indexOf(level)] : undefined;
  if (typeof value !== "number") throw new Error(`No value at level ${level}`);
  return value;
}

describe("summoner spell selection", () => {
  it("keeps the spells in Data Dragon's CLASSIC game mode (Summoner's Rift), by name", () => {
    expect(classicSpells(DDRAGON).map((entry) => entry.name)).toEqual(["Flash", "Smite"]);
  });

  it("refuses a spell the wiki's data module lacks", () => {
    const extra = { ...DDRAGON, data: { ...DDRAGON.data, SummonerNew: spell("SummonerNew", "Newcomer", 100, 100, ["CLASSIC"]) } };
    expect(() => catalog(extra)).toThrow("Newcomer (SummonerNew) has no entry in Module:SpellData/data");
  });

  it("refuses a spell without its article", () => {
    expect(() => catalog(DDRAGON, ARTICLES.slice(0, 1))).toThrow("Smite has no article in the downloads");
  });
});

describe("summoner spell records", () => {
  const records = new Map(catalog().spells.map((record) => [record.name, record]));
  const flash = records.get("Flash")!;
  const smite = records.get("Smite")!;

  it("reads cooldowns, charges and ranges as the wiki shows them", () => {
    expect([flash.cooldown, flash.charges, flash.range]).toEqual([300, undefined, "400 (Quick cast)"]);
    expect([smite.cooldown, smite.charges, smite.range]).toEqual([15, { count: 2, recharge: 90 }, "500"]);
  });

  it("reads the effect paragraph by paragraph, with its values by level", () => {
    expect(smite.text).toBe("Deals 600 true damage to the target monster. Removes summoner spell debuffs.\nGrows by 10 – 21.1764705882 (based on level) damage.");
    expect(smite.wikitext.split("\n")).toHaveLength(2);
    expect(smite.values).toHaveLength(1);
    expect(atLevel(smite.values[0]!.series, 20)).toBeCloseTo(10 + (10 / 17) * 19, 6);
  });

  it("reads the article's notes, nested bullets indented, editor templates and other sections left out", () => {
    expect(flash.notes).toEqual(["Flash cannot be used while rooted.", "  It casts at 100 – 200 (based on level) range at most."]);
    expect(flash.noteValues.map((value) => value.context)).toEqual(["It casts at 100 – 200 (based on level) range at most."]);
    expect(atLevel(flash.noteValues[0]!.series, 18)).toBe(200);
    expect(smite.notes).toEqual([]);
    expect(flash.article).toEqual({ title: "Flash", revid: 11 });
  });

  it("compares cooldowns and numeric ranges with Data Dragon", () => {
    expect(catalog().checks).toEqual({ compared: 4, differences: ["Flash: the range is 400 on the wiki, 425 in Data Dragon"] });
  });

  it("keeps the rule pages the spell effects quote, with their revisions", () => {
    expect(catalog().rulePages.map((rule) => [rule.title, rule.revid, rule.text])).toEqual([
      ["Template:Tip data/Cast-inhibiting crowd control", 21, "Stasis and Suppression disable all summoner spells."],
      ["Template:Tip data/Spell shield", 22, "A spell shield blocks almost none from summoner spells."],
      ["Stealth", 23, "Exhaust and Ignite break stealth."],
      ["Damage", 24, "* Item: this includes summoner spell damage against champions."],
    ]);
    expect(() => buildSpellCatalog({ dataset: "16.21", patch: "26.21", ddragon: DDRAGON, spellData: page("Module:SpellData/data", MODULE, 10), articles: ARTICLES, glossary: GLOSSARY.slice(1), championData })).toThrow("The glossary downloads lack Template:Tip data/Cast-inhibiting crowd control");
  });
});

describe("the committed summoner spell catalog", async () => {
  const dataset = await latestDataset(DATA_DIR, "summoners.json");
  const committed = await readJson<SpellCatalog>(path.join(DATA_DIR, dataset, "summoners.json"));
  const named = (name: string): SpellRecord => {
    const found = committed.spells.find((record) => record.name === name);
    if (!found) throw new Error(`No spell ${name}`);
    return found;
  };
  const levelValue = (record: SpellRecord, context: RegExp, values = record.values) => {
    const found = values.find((value) => context.test(value.context));
    if (!found) throw new Error(`${record.name}: no value in a sentence like ${context}`);
    return atLevel(found.series, 20);
  };

  it("holds the nine spells Summoner's Rift offers", () => {
    expect(committed.spells.map((record) => `${record.name} (${record.id})`)).toEqual([
      "Barrier (SummonerBarrier)",
      "Cleanse (SummonerBoost)",
      "Exhaust (SummonerExhaust)",
      "Flash (SummonerFlash)",
      "Ghost (SummonerHaste)",
      "Heal (SummonerHeal)",
      "Ignite (SummonerDot)",
      "Smite (SummonerSmite)",
      "Teleport (SummonerTeleport)",
    ]);
  });

  it("differs from Data Dragon only in Flash's and Heal's ranges", () => {
    expect(committed.checks.differences).toEqual(["Flash: the range is 400 on the wiki, 425 in Data Dragon", "Heal: the range is 900 on the wiki, 875 in Data Dragon"]);
  });

  it("gives Barrier a 2.5-second shield of 502 at level 20, every 180 seconds", () => {
    const barrier = named("Barrier");
    expect(barrier.cooldown).toBe(180);
    expect(barrier.text).toContain("shield that absorbs 100 – 502.352941176 (based on level) damage for 2.5 seconds");
    expect(levelValue(barrier, /shield that absorbs/)).toBeCloseTo(100 + (360 / 17) * 19, 6);
  });

  it("gives Ghost 50.8% bonus movement speed at level 20 for 10 seconds, every 240 seconds", () => {
    const ghost = named("Ghost");
    expect(ghost.cooldown).toBe(240);
    expect(ghost.text).toContain("bonus movement speed for 10 seconds");
    expect(levelValue(ghost, /bonus movement speed/)).toBeCloseTo(24 + (24 / 17) * 19, 6);
  });

  it("heals 346 at level 20 with 30% bonus movement speed for a second, every 240 seconds", () => {
    const heal = named("Heal");
    expect([heal.cooldown, heal.range]).toEqual([240, "900"]);
    expect(heal.text).toContain("30% bonus total movement speed for 1 second");
    expect(levelValue(heal, /Heals your champion/)).toBe(346);
  });

  it("burns for 525 true damage over 5 seconds at level 20 in ticks of 105, with Grievous Wounds, every 180 seconds", () => {
    const ignite = named("Ignite");
    expect([ignite.cooldown, ignite.range]).toEqual([180, "600"]);
    expect(ignite.text).toContain("on fire for 5 seconds");
    expect(ignite.text).toContain("subsequent ticks occurring every 1.056 seconds after the previous");
    expect(ignite.text).toContain("The target is also inflicted with Grievous Wounds for the same duration.");
    expect(levelValue(ignite, /true damage over the duration/)).toBe(525);
    expect(levelValue(ignite, /Each tick of Ignite deals/, ignite.noteValues)).toBe(105);
    expect(ignite.notes).toContain("Ignite's damage cannot be amplified by damage amplifiers.");
    expect(ignite.notes).toContain("Cleanse removes the damage over time and reveal components of Ignite, but the healing reduction debuff will persist.");
  });

  it("slows by 40% and cuts damage dealt by 35% for 3 seconds, every 240 seconds", () => {
    const exhaust = named("Exhaust");
    expect([exhaust.cooldown, exhaust.range]).toEqual([240, "650"]);
    expect(exhaust.text).toBe("Weakens the target enemy champion for 3 seconds, slowing them by 40% and reducing their damage dealt by 35%.");
    expect(exhaust.notes).toContain("Exhaust will not reduce true damage.");
    expect(exhaust.notes).toContain("  Cleanse, however, removes both the slow and the damage reduction.");
  });

  it("cleanses all but airborne, nearsight and suppression and grants 75% tenacity for 3 seconds, every 240 seconds", () => {
    const cleanse = named("Cleanse");
    expect(cleanse.cooldown).toBe(240);
    expect(cleanse.text).toBe("Removes all disables (excluding Airborne, Nearsight, and Suppression) and summoner spell debuffs (excluding Mark) affecting your champion, and grants you 75% tenacity for 3 seconds.");
    expect(cleanse.notes).toContain("  Summoner spells:");
    expect(cleanse.notes).toContain("Cleanse cannot be activated while under the effects of suppression or stasis (both disable all summoner spells from use).");
  });

  it("blinks 400 units every 300 seconds, though not while rooted or grounded", () => {
    const flash = named("Flash");
    expect([flash.cooldown, flash.range, flash.ddragon.range]).toEqual([300, "400 (Quick cast)", 425]);
    expect(flash.notes).toContain("Flash cannot be used while rooted, grounded, or unable to cast.");
  });

  it("binds Smite to the jungle role, and Teleport travels to allied units", () => {
    const smite = named("Smite");
    expect(smite.charges).toEqual({ count: 2, recharge: 90 });
    expect(smite.notes[0]).toMatch(/^Role Binding: In Summoner's Rift permanent queues, Smite is only available to players drafted in the Jungle role/);
    expect(named("Teleport").text).toContain("dash to the location of the target allied turret, minion, or ward");
  });
});
