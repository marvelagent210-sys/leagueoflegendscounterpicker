/** The item catalog (PLAN.md §13, M8): which items it holds, how the wiki's item data is read, and the committed catalog. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { type DDragonItem, type DDragonItems, catalogItems } from "../pipeline/items/catalog";
import { type ItemCatalog, buildItemCatalog, spellOutRanged } from "../pipeline/items/records";
import { REVIEWED_GROUPS, buildProblems, countBuilds, unknownItems } from "../pipeline/items/rules";
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
      "3004": item("Manamune", 2900, { from: ["1038"] }),
      "3042": { ...item("Muramana", 2900), gold: { base: 2900, total: 2900, purchasable: false } },
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
    expect(kept).toEqual(["boots: Berserker's Greaves", "legendary: Infinity Edge", "legendary: Manamune", "legendary: Mejai's Soulstealer", "boots: Plated Steelcaps"]);
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
  ["Manamune"] = { ["id"] = 3004, ["tags"] = {"HasOnHit"}, ["stats"] = { ["ad"] = 35, ["mana"] = 500 }, ["buy"] = 2900,
    ["effects"] = { ["pass"] = { ["name"] = "Awe", ["unique"] = true, ["description"] = "Grants {{as|'''bonus''' attack damage}} equal to {{as|2% '''maximum''' mana}}." },
      ["pass2"] = { ["description"] = "Transforms into [[Muramana]] at {{as|360 '''bonus''' mana}}." },
      ["act"] = { ["name"] = "Shock", ["description"] = "Deal {{pp|100 to 200}} magic damage.", ["description2"] = "''Shock'' resets the attack timer.", ["range"] = "{{tip|er|icononly=true}} 700", ["cd"] = "60" } } },
  ["Muramana"] = { ["id"] = 3042, ["tags"] = {"OnHitAppliesLifeSteal"}, ["stats"] = { ["ad"] = "=>Manamune", ["mana"] = 1000 }, ["buy"] = "=>Manamune",
    ["effects"] = { ["pass"] = "=>Manamune" }, ["recipe"] = {"Manamune"} },
}`;

const GAME_FILE = {
  "Items/3031": { mFlatPhysicalDamageMod: 75, mFlatCritChanceMod: 0.25000001, mItemGroups: ["{default}", "{ie}"] },
  "Items/3041": { mFlatMagicDamageMod: 20, mItemGroups: ["{default}"] },
  "Items/3047": { mFlatArmorMod: 25, mItemGroups: ["{boots}", "{bootsQuiet}"] },
  "Items/3006": { mPercentAttackSpeedMod: 0.35, mFlatMovementSpeedMod: 45, mItemGroups: ["{boots}", "{bootsQuiet}"] },
  "Items/3004": { mFlatPhysicalDamageMod: 35, flatMPPoolMod: 500, mItemGroups: ["{default}"] },
  "Items/3042": { mFlatPhysicalDamageMod: 35, flatMPPoolMod: 1000, mItemGroups: ["{default}", "{ie}"] },
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

  it("keeps an effect's notes, value series, range and the item's tags", () => {
    const manamune = sampleCatalog().items.find((record) => record.name === "Manamune");
    expect(manamune?.tags).toEqual(["HasOnHit"]);
    const shock = manamune?.effects.find((effect) => effect.slot === "act");
    expect(shock).toMatchObject({
      name: "Shock",
      text: "Deal 100 – 200 (based on level) magic damage.\nShock resets the attack timer.",
      wikitext: "Deal {{pp|100 to 200}} magic damage.\n''Shock'' resets the attack timer.",
      range: "700",
      cooldown: "60",
    });
    const [value] = shock?.values ?? [];
    expect(value?.context).toBe("Deal 100 – 200 (based on level) magic damage.");
    expect(value?.series.kind === "level" && [value.series.values[0], value.series.values.at(-1), value.series.values.length]).toEqual([100, 200, 18]);
  });

  it("adds what a stacked item transforms into, with the fields it shares with the item written out", () => {
    const catalog = sampleCatalog();
    expect(catalog.items.find((record) => record.name === "Manamune")?.transformsInto).toBe("Muramana");
    expect(catalog.transforms).toHaveLength(1);
    expect(catalog.transforms[0]).toMatchObject({ id: 3042, name: "Muramana", gold: 2900, stats: { ad: 35, mana: 1000 }, transformsFrom: "Manamune", tags: ["OnHitAppliesLifeSteal"], recipe: ["Manamune"] });
    expect(catalog.transforms[0]?.effects.map((effect) => effect.name)).toEqual(["Awe"]);
    // The transform isn't sold, so the game file's cap on it doesn't make a one-per-build group.
    expect(catalog.groups.map((group) => group.id)).toEqual(["Boots, BootsWithoutActives"]);
  });

  it("fails when a transform refers to a field its item doesn't have", () => {
    expect(() => sampleCatalog(MODULE.replace('["ad"] = "=>Manamune"', '["hp"] = "=>Manamune"'))).toThrow(/Muramana: stats\.hp refers to Manamune, which has no such field/);
  });

  it("reports every stat the game file disagrees on, but not its float noise, and the wiki's gold against Data Dragon's", () => {
    const { checks } = sampleCatalog();
    expect(checks.stats).toBe(9);
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

  it("says what breaks the build rules, counting a transformed Tear item as its item, and what a build format doesn't hold", () => {
    const legendary = (name: string, transformsFrom?: string) => ({ name, kind: "legendary", ...(transformsFrom ? { transformsFrom } : {}) });
    const boots = (name: string) => ({ name, kind: "boots" });
    const six = ["Manamune", "Archangel's Staff", "Winter's Approach", "Black Cleaver", "Void Staff", "Sterak's Gage"].map((name) => legendary(name));
    // The Tear items can be combined, and five items go with one pair of boots.
    expect(buildProblems(six)).toEqual([]);
    expect(buildProblems([...six.slice(0, 5), boots("Plated Steelcaps")])).toEqual([]);
    expect(buildProblems([...six, legendary("Thornmail")])).toEqual(["7 items: a build holds 6 at most"]);
    expect(buildProblems([boots("Plated Steelcaps"), boots("Mercury's Treads")])).toEqual(["more than one pair of boots"]);
    expect(buildProblems([legendary("Manamune"), legendary("Muramana", "Manamune")])).toEqual(["Manamune twice"]);
    expect(buildProblems([legendary("Void Staff"), legendary("Terminus"), legendary("Sterak's Gage"), legendary("Maw of Malmortius")])).toEqual([
      "Void Staff and Terminus: one %pen item per build",
      "Sterak's Gage and Maw of Malmortius: one Lifeline item per build",
    ]);
    // The format toggle: six items hold no boots, and five items and boots hold five finished items.
    const withBoots = [...six.slice(0, 5), boots("Plated Steelcaps")];
    expect(buildProblems(withBoots, REVIEWED_GROUPS, "sixItems")).toEqual(["boots in a build of six items"]);
    expect(buildProblems(six, REVIEWED_GROUPS, "fiveItemsWithBoots")).toEqual(["6 finished items: a build of five items and boots holds 5"]);
    expect([buildProblems(six, REVIEWED_GROUPS, "sixItems"), buildProblems(withBoots, REVIEWED_GROUPS, "fiveItemsWithBoots")]).toEqual([[], []]);
    expect(buildProblems([boots("Plated Steelcaps"), boots("Mercury's Treads")], REVIEWED_GROUPS, "fiveItemsWithBoots")).toEqual(["more than one pair of boots"]);
    // Mortal Reminder is in two groups: with Morellonomicon it breaks one, with Void Staff the other.
    expect(buildProblems([legendary("Mortal Reminder"), legendary("Morellonomicon"), legendary("Void Staff")])).toEqual([
      "Mortal Reminder and Void Staff: one %pen item per build",
      "Mortal Reminder and Morellonomicon: one Grievous Wounds item per build",
    ]);
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

  it("holds the rule pages item effects quote, at the revisions recorded for the dataset", () => {
    expect(catalog.rulePages.map((page) => page.title)).toEqual(["Combat status", "Critical strike", "Template:Critical damage", "Template:Tip data/Energized", "Vamp"]);
    for (const page of catalog.rulePages) expect(revisions[page.title], page.title).toBe(page.revid);
    const energized = catalog.rulePages.find((page) => page.title === "Template:Tip data/Energized")?.text;
    expect(energized).toContain("Champions with Energized gain 6 Charges per basic attack and 1 Charge for every 24 units travelled by any means.");
  });

  it("holds the three transformed Tear items, checked against the game file like the rest", () => {
    expect(catalog.transforms.map((record) => [record.name, record.transformsFrom, record.stats])).toEqual([
      ["Seraph's Embrace", "Archangel's Staff", { ap: 70, ah: 25, mana: 1000 }],
      ["Muramana", "Manamune", { ad: 35, ah: 15, mana: 1000 }],
      ["Fimbulwinter", "Winter's Approach", { hp: 550, ah: 15, mana: 1000 }],
    ]);
    expect(catalog.items.filter((record) => record.transformsInto).map((record) => record.name)).toEqual(["Archangel's Staff", "Manamune", "Winter's Approach"]);
  });

  it("keeps the active ranges, the on-hit tags and the level values the effects read", () => {
    const byName = new Map(catalog.items.map((record) => [record.name, record]));
    expect(byName.get("Hextech Gunblade")?.effects[0]?.range).toBe("700");
    expect(byName.get("Blade of the Ruined King")?.tags).toContain("OnHitAppliesLifeSteal");
    const kraken = byName.get("Kraken Slayer")?.effects[0];
    expect(kraken?.text.split("\n")[1]).toBe("Abilities that do not trigger on-attack effects, will always grant stacks on-hit.");
    expect(kraken?.values[0]?.series).toEqual({ kind: "variable", variable: "level", points: [1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], values: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210] });
  });

  it("renders every effect without wiki markup, with both melee and ranged values", () => {
    const texts = [...catalog.items, ...catalog.transforms].flatMap((record) => [...record.effects.map((effect) => effect.text), ...(record.restriction ? [record.restriction] : [])]);
    expect(texts.filter((text) => /\{\{|\}\}|\[\[|\]\]|\(x-1\)|<[a-z/]/i.test(text))).toEqual([]);
    const kraken = catalog.items.find((record) => record.name === "Kraken Slayer")?.effects[0]?.text;
    expect(kraken).toContain("150 – 210 (based on level) (melee) / 120 – 168 (based on level) (ranged) bonus physical damage");
  });
});
