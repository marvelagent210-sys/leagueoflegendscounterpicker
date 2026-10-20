/** The item catalog (PLAN.md §13, M8): which items it holds, how the wiki's item data is read, and the committed catalog. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { type DDragonItem, type DDragonItems, catalogItems } from "../pipeline/items/catalog";
import { type ItemCatalog, buildItemCatalog, spellOutRanged } from "../pipeline/items/records";
import { REVIEWED_GROUPS, countBuilds, unknownItems } from "../pipeline/items/rules";
import { readJson } from "../pipeline/lib/files";

const gold = (total: number) => ({ base: 0, total, purchasable: true });
const item = (name: string, total: number, extra: Partial<DDragonItem> = {}): DDragonItem => ({ name, maps: { "11": true }, gold: gold(total), ...extra });

/** A small shop with one of each kind the catalog keeps or leaves out. */
function shop(): DDragonItems {
  return {
    version: "16.20.1",
    data: {
      "1001": item("Boots", 300, { tags: ["Boots"], into: ["3047", "3006"] }),
      "1029": item("Cloth Armor", 300, { into: ["3047"] }),
      "1038": item("B. F. Sword", 1300, { into: ["3031"] }),
      "1082": item("Dark Seal", 350, { into: ["3041"] }),
      "1056": item("Doran's Ring", 400),
      "2003": item("Health Potion", 50, { tags: ["Consumable"], consumed: true }),
      "3340": item("Stealth Ward", 0, { tags: ["Trinket"] }),
      "3006": item("Berserker's Greaves", 1100, { tags: ["Boots"], from: ["1001"], into: ["3172"] }),
      "3047": item("Plated Steelcaps", 1200, { tags: ["Boots"], from: ["1001", "1029"], into: ["3174"] }),
      "3174": item("Armored Advance", 1200, { tags: ["Boots"], from: ["3047"] }),
      // A tier-3 boot that Data Dragon doesn't tag as boots.
      "3172": item("Gunmetal Greaves", 1100, { from: ["3006"] }),
      "3031": item("Infinity Edge", 3500, { from: ["1038"] }),
      "3041": item("Mejai's Soulstealer", 1500, { from: ["1082"] }),
      "3867": item("Bounty of Worlds", 400, { from: ["3866"], into: ["3870"] }),
      "3870": item("Dream Maker", 400, { from: ["3867"] }),
      "3600": item("Kalista's Black Spear", 0, { requiredChampion: "Kalista", from: ["1038"] }),
      "323031": item("Infinity Edge", 3500, { from: ["1038"] }),
      "3032": item("Arena Blade", 3000, { maps: { "11": false, "30": true }, from: ["1038"] }),
    },
  };
}

describe("item catalog selection", () => {
  it("keeps the finished items and tier-2 boots and leaves everything else out", () => {
    const kept = catalogItems(shop()).map(({ kind, item: { name } }) => `${kind}: ${name}`);
    expect(kept).toEqual(["boots: Berserker's Greaves", "legendary: Infinity Edge", "legendary: Mejai's Soulstealer", "boots: Plated Steelcaps"]);
  });
});

describe("item effect text", () => {
  it("spells out melee and ranged values, as level progressions when they are ones", () => {
    expect(spellOutRanged("{{rd|20|10}} bonus movement speed")).toBe("20 (melee) / 10 (ranged) bonus movement speed");
    expect(spellOutRanged("{{as|(+ {{rd|5%|{{ap|5*0.7}}%}} health)}}")).toBe("{{as|(+ 5% (melee) / {{ap|5*0.7}}% (ranged) health)}}");
    expect(spellOutRanged("{{rd|70 to 130 for 11|35 to 65 for 11|levels=1;9 to 18|pp=true}}")).toBe("{{pp|70 to 130 for 11|1;9 to 18}} (melee) / {{pp|35 to 65 for 11|1;9 to 18}} (ranged)");
    expect(spellOutRanged("{{rd|30|30}}")).toBe("30");
  });
});

const MODULE = `-- The wiki's item data module, cut down.
return {
  ["Infinity Edge"] = { ["id"] = 3031, ["type"] = {"Legendary"}, ["stats"] = { ["ad"] = 75, ["crit"] = 25 }, ["recipe"] = {"B. F. Sword"}, ["buy"] = 3500 },
  ["Mejai's Soulstealer"] = { ["id"] = 3041, ["type"] = {"Legendary"}, ["itemlimit"] = "Glory", ["stats"] = { ["ap"] = 20 },
    ["effects"] = { ["pass"] = { ["name"] = "Glory", ["unique"] = true, ["description"] = "Gain {{as|5 '''bonus''' ability power}} per stack.", ["cd"] = "10" } }, ["buy"] = 1500 },
  ["Plated Steelcaps"] = { ["id"] = 3047, ["type"] = {"Boots"}, ["stats"] = { ["armor"] = 25 }, ["buy"] = 1150 },
  ["Berserker's Greaves"] = { ["id"] = 3006, ["type"] = {"Boots"}, ["stats"] = { ["as"] = 30 }, ["limit"] = "Can only be bought {{tip|once}}.", ["buy"] = 1100 },
}`;

const GAME_FILE = {
  "Items/3031": { mFlatPhysicalDamageMod: 75, mFlatCritChanceMod: 0.25000001, mItemGroups: ["{default}", "{ie}"] },
  "Items/3041": { mFlatMagicDamageMod: 20, mItemGroups: ["{default}"] },
  "Items/3047": { mFlatArmorMod: 25, mItemGroups: ["{boots}", "{bootsQuiet}"] },
  "Items/3006": { mPercentAttackSpeedMod: 0.35, mFlatMovementSpeedMod: 45, mItemGroups: ["{boots}", "{bootsQuiet}"] },
  "{default}": { __type: "ItemGroup", mItemGroupID: "Default" },
  "{ie}": { __type: "ItemGroup", mItemGroupID: "3031", mMaxGroupOwnable: 1 },
  "{boots}": { __type: "ItemGroup", mItemGroupID: "Boots", mMaxGroupOwnable: 1 },
  "{bootsQuiet}": { __type: "ItemGroup", mItemGroupID: "BootsWithoutActives", mMaxGroupOwnable: 1 },
};

function sampleCatalog(module = MODULE): ItemCatalog {
  return buildItemCatalog({
    dataset: "16.20",
    patch: "26.20",
    ddragon: shop(),
    gameFile: GAME_FILE,
    cdragonVersion: "16.20.1",
    itemData: { title: "Module:ItemData/data", pageid: 1, revid: 4082420, timestamp: "", content: module },
    championData: () => undefined,
  });
}

describe("item records", () => {
  it("reads stats, effects, limits and restrictions from the wiki module", () => {
    const catalog = sampleCatalog();
    const byName = new Map(catalog.items.map((record) => [record.name, record]));
    expect(byName.get("Infinity Edge")).toMatchObject({ id: 3031, kind: "legendary", gold: 3500, stats: { ad: 75, crit: 25 }, recipe: ["B. F. Sword"], effects: [] });
    expect(byName.get("Mejai's Soulstealer")).toMatchObject({ limits: ["Glory"], effects: [{ slot: "pass", name: "Glory", unique: true, text: "Gain 5 bonus ability power per stack.", cooldown: "10" }] });
    expect(byName.get("Berserker's Greaves")?.restriction).toBe("Can only be bought once.");
  });

  it("reports every stat the game file disagrees on, but not its float noise, and the wiki's gold against Data Dragon's", () => {
    const { checks } = sampleCatalog();
    expect(checks.stats).toBe(5);
    expect(checks.differences).toEqual([
      "Berserker's Greaves: as is 30 on the wiki, 35 in the game file",
      "Berserker's Greaves: the game file's mFlatMovementSpeedMod (45) has no msflat on the wiki",
      "Plated Steelcaps: costs 1,150 gold on the wiki, 1,200 in Data Dragon",
    ]);
    expect(sampleCatalog().items.find((record) => record.name === "Plated Steelcaps")?.wikiGold).toBe(1150);
  });

  it("keeps the game file's caps that bind two or more catalog items, merging caps with the same items", () => {
    const catalog = sampleCatalog();
    expect(catalog.groups).toEqual([{ id: "Boots, BootsWithoutActives", max: 1, items: ["Berserker's Greaves", "Plated Steelcaps"] }]);
    expect(catalog.items.find((record) => record.name === "Plated Steelcaps")?.groups).toEqual(["Boots, BootsWithoutActives"]);
    expect(catalog.items.find((record) => record.name === "Infinity Edge")?.groups).toEqual([]);
  });

  it("fails when a catalog item has no entry in the wiki module", () => {
    const withoutBoots = MODULE.replace(/\s*\["Plated Steelcaps"\][^\n]*/, "");
    expect(() => sampleCatalog(withoutBoots)).toThrow(/3047 \(Plated Steelcaps\) has no entry/);
  });
});

describe("build counting", () => {
  it("counts builds as sets with at most one item from each group, groups sharing items included", () => {
    const items = ["A", "B", "C", "D", "E"];
    expect(countBuilds(items, {}, 2)).toBe(10);
    // {A, B} is the one pair a single group forbids.
    expect(countBuilds(items, { g: ["A", "B"] }, 2)).toBe(9);
    // B is in both groups: {A, B} and {B, C} are out, {A, C} is fine.
    expect(countBuilds(items, { g1: ["A", "B"], g2: ["B", "C"] }, 2)).toBe(8);
    expect(countBuilds(items, { g1: ["A", "B"], g2: ["B", "C"] }, 3)).toBe(5);
    // Names outside the item list don't restrict anything.
    expect(countBuilds(items, { g: ["A", "Z"] }, 2)).toBe(10);
  });

  it("names the rules' items that aren't catalog items", () => {
    expect(unknownItems({ g: ["A", "Typo"] }, ["A", "B"])).toEqual(["Typo"]);
  });
});

describe("the committed item catalog", async () => {
  const dataset = await latestDataset(DATA_DIR, "items.json");
  const catalog = await readJson<ItemCatalog>(path.join(DATA_DIR, dataset, "items.json"));
  const revisions = await readJson<Record<string, number>>(path.join(DATA_DIR, dataset, "wiki-revisions.json"));
  const names = (kind: string) => catalog.items.filter((record) => record.kind === kind).map((record) => record.name);

  it("holds the 106 finished items and 7 tier-2 boots of patch 26.20", () => {
    expect(names("legendary")).toHaveLength(106);
    expect(names("boots").sort()).toEqual(["Berserker's Greaves", "Boots of Swiftness", "Gluttonous Greaves", "Ionian Boots of Lucidity", "Mercury's Treads", "Plated Steelcaps", "Sorcerer's Shoes"]);
    expect(names("legendary")).toContain("Mejai's Soulstealer");
    for (const left of ["Gunmetal Greaves", "Spellslinger's Shoes", "Boots", "Dream Maker", "Doran's Ring", "Tear of the Goddess", "Kalista's Black Spear"]) {
      expect(catalog.items.map((record) => record.name)).not.toContain(left);
    }
  });

  it("pins its sources: Data Dragon 16.20.1, the dataset's game files, and the wiki revision recorded for the dataset", () => {
    expect(catalog.sources.ddragon).toBe("16.20.1");
    expect(catalog.sources.cdragon).toMatch(/^16\.20\./);
    expect(revisions[catalog.sources.itemData.title]).toBe(catalog.sources.itemData.revid);
  });

  it("agrees with the game file on every stat, and differs from Data Dragon on Redemption's gold only", () => {
    expect(catalog.checks.stats).toBeGreaterThanOrEqual(300);
    expect(catalog.checks.differences).toEqual(["Redemption: costs 2,250 gold on the wiki, 2,300 in Data Dragon"]);
    expect(catalog.items.find((record) => record.name === "Infinity Edge")?.stats).toEqual({ ad: 75, crit: 25, critdamage: 30 });
  });

  it("lists the game file's one-per-build groups", () => {
    const groups = Object.fromEntries(catalog.groups.map((group) => [group.wiki ?? group.id, group.items]));
    expect(groups).toEqual({
      Lifeline: ["Archangel's Staff", "Immortal Shieldbow", "Maw of Malmortius", "Protoplasm Harness", "Sterak's Gage"],
      Manaflow: ["Archangel's Staff", "Manamune", "Winter's Approach"],
      Annul: ["Banshee's Veil", "Edge of Night"],
      "Boots, BootsWithoutActives": ["Berserker's Greaves", "Boots of Swiftness", "Gluttonous Greaves", "Ionian Boots of Lucidity", "Mercury's Treads", "Plated Steelcaps", "Sorcerer's Shoes"],
      Fatality: ["Black Cleaver", "Lord Dominik's Regards", "Mortal Reminder", "Serylda's Grudge", "Terminus"],
      Blight: ["Bloodletter's Curse", "Cryptbloom", "Terminus", "Void Staff"],
      Spellblade: ["Dusk and Dawn", "Essence Reaver", "Iceborn Gauntlet", "Lich Bane", "Trinity Force"],
      Immolate: ["Hollow Radiance", "Sunfire Aegis"],
      Hydra: ["Profane Hydra", "Ravenous Hydra", "Stridebreaker", "Titanic Hydra"],
    });
    expect(catalog.groups.every((group) => group.max === 1)).toBe(true);
  });

  it("keeps the build search's rules confirmed on review, and counts the builds PLAN.md gives", () => {
    expect(catalog.search?.groups).toEqual(REVIEWED_GROUPS);
    expect(catalog.search?.builds).toEqual({ sixItems: 1_538_705_768, fiveItemsWithBoots: 661_723_587 });
    expect(catalog.search?.gameFileBuilds).toEqual({ sixItems: 1_510_649_782, fiveItemsWithBoots: 653_589_622 });
  });

  it("renders every effect without wiki markup, with both melee and ranged values", () => {
    const texts = catalog.items.flatMap((record) => [...record.effects.map((effect) => effect.text), ...(record.restriction ? [record.restriction] : [])]);
    expect(texts.filter((text) => /\{\{|\}\}|\[\[|\]\]|\(x-1\)|<[a-z/]/i.test(text))).toEqual([]);
    const kraken = catalog.items.find((record) => record.name === "Kraken Slayer")?.effects[0]?.text;
    expect(kraken).toContain("150 – 210 (based on level) (melee) / 120 – 168 (based on level) (ranged) bonus physical damage");
  });
});
