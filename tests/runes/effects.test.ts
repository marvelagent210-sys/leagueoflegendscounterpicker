/**
 * Rune pages on fighters (runes/): the page's rules and substitutions, adaptive force, the stat
 * shards, and the runes' effects in fights between synthetic fighters with plain numbers
 * (tests/sim/kits.ts: 2,000 health, 100 armor and magic resistance, 100 AD). Each page's other
 * runes are ones that do nothing in these fights.
 */
import { describe, expect, it } from "vitest";
import { defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Mode, World } from "../../engine/sim/state";
import { matchupSpecs } from "../../items/equip";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { type LoadoutFighter, equipBuild, loadItemCatalog, loadRuneCatalog } from "../../pipeline/itemData";
import { RuneContext } from "../../runes/context";
import { type RunePage, pageProblems, substitutePage } from "../../runes/equip";
import { RUNE_MODULES } from "../../runes/modules/index";
import { castWhenReady, idle } from "../sim/helpers";
import { RANGED, ability, fighter } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "rune-catalog.json");
const [items, catalog] = await Promise.all([loadItemCatalog(dataset), loadRuneCatalog(dataset)]);

/** Lesser runes and shards that do nothing in these fights, by path and row. */
const QUIET: Record<string, string[]> = {
  Precision: ["Triumph", "Legend: Haste", "Last Stand"],
  Domination: ["Sudden Impact", "Sixth Sense", "Treasure Hunter"],
  Sorcery: ["Nimbus Cloak", "Transcendence", "Waterwalking"],
  Resolve: ["Demolish", "Conditioning", "Revitalize"],
  Inspiration: ["Cash Back", "Time Warp Tonic", "Cosmic Insight"],
};
const QUIET_SHARDS = ["Ability Haste", "Move Speed", "Tenacity and Slow Resist"];
const pathOf = (name: string) => catalog.runes.find((entry) => entry.name === name)!.path;

/** A page with `keystone` and quiet runes, and `lesser` runes in their rows (of the keystone's path, or else of the secondary path). */
function pageWith(keystone: string, lesser: string[] = [], shards = QUIET_SHARDS): RunePage {
  const path = pathOf(keystone);
  const primary = [...QUIET[path]!];
  const secondaryPath = path === "Domination" ? "Inspiration" : "Domination";
  const secondary = QUIET[secondaryPath]!.slice(path === "Domination" ? 0 : 1);
  for (const name of lesser) {
    const entry = catalog.runes.find((rune) => rune.name === name)!;
    if (entry.path === path) primary[entry.row - 1] = name;
    else secondary[0] = name;
  }
  return { keystone, primary, secondary: secondary.slice(0, 2), shards };
}

const holding = (spec: FighterSpec, page: RunePage, build: string[] = [], adaptiveType: "Physical" | "Magic" = "Physical", options?: Record<string, Record<string, number>>): LoadoutFighter =>
  equipBuild(spec, build, items, { runes: { page, catalog, adaptiveType, ...(options ? { options } : {}) } });

function world(a: LoadoutFighter | FighterSpec, b: LoadoutFighter | FighterSpec = fighter({ id: "enemy" }), modes: [Mode, Mode] = ["fight", "idle"], distance = 0): World {
  const spec = (x: LoadoutFighter | FighterSpec) => ("spec" in x ? x.spec : x);
  const [left, right] = "spec" in a && "spec" in b ? matchupSpecs(a as LoadoutFighter, b as LoadoutFighter) : [spec(a), spec(b)];
  return createWorld({ fighters: [left, right], distance, modes, settings: { log: true } });
}

/** Steps the fight; the default behavior plays each side's mode ("idle" does nothing). */
function run(w: World, seconds: number, behaviors: Parameters<typeof step>[1] = [defaultBehavior, defaultBehavior]): World {
  for (let tick = 0; tick < seconds * 30 && w.units.every((unit) => unit.alive); tick++) step(w, behaviors);
  return w;
}

/** A side's damage numbers from a source, as the log shows them. */
const hits = (w: World, side: 0 | 1, source: string) => w.log.filter((entry) => entry.side === side && entry.text.startsWith(`${source} deals `)).map((entry) => Number(/deals (\d+)/.exec(entry.text)?.[1]));

describe("rune modules", () => {
  it("cover every rune and shard of the catalog, and build from it for melee and ranged, attack damage and ability power holders", () => {
    const names = [...catalog.runes.map((entry) => entry.name), ...catalog.shards.flatMap((slot) => slot.options.map((option) => `Shard: ${option.name}`))];
    expect(Object.keys(RUNE_MODULES).sort()).toEqual([...new Set(names)].sort());
    const combat = { inCombat: () => true, seconds: () => 0, idle: () => 0, hooks: {} };
    const energized = { rule: { full: 100, perAttack: 6, unitsPerCharge: 24 }, add: () => {}, hooks: {}, spend: () => false };
    for (const [ranged, adaptive] of [[false, "ad"], [true, "ap"]] as const) {
      const spec = fighter({ attack: ranged ? RANGED : {} });
      const holder = { spec, ranged, mana: false, adaptive, bonus: {}, items: { combat: () => combat, energized: () => energized, build: [], isAbilityDamage: () => true }, spells: [] } as never;
      const context = new RuneContext(catalog);
      for (const entry of catalog.runes) expect(() => RUNE_MODULES[entry.name]!.build(context.rune(entry), holder, {}), entry.name).not.toThrow();
      for (const option of catalog.shards.flatMap((slot) => slot.options)) expect(() => RUNE_MODULES[`Shard: ${option.name}`]!.build(context.shard(option), holder, {})).not.toThrow();
    }
  });
});

describe("a rune page", () => {
  const legal: RunePage = { keystone: "Conqueror", primary: ["Triumph", "Legend: Alacrity", "Last Stand"], secondary: ["Second Wind", "Unflinching"], shards: ["Adaptive Force", "Adaptive Force", "Health Scaling"] };

  it("follows the wiki's rules: a keystone and a lesser rune from each row of its path, two runes from two rows of another, a shard per slot", () => {
    expect(pageProblems(legal, catalog)).toEqual([]);
    expect(pageProblems({ ...legal, keystone: "Triumph" }, catalog)[0]).toBe("Triumph isn't a keystone");
    expect(pageProblems({ ...legal, primary: ["Triumph", "Absorb Life", "Last Stand"] }, catalog)[0]).toMatch(/^the primary path \(Precision\) takes one lesser rune from each of its three rows/);
    expect(pageProblems({ ...legal, secondary: ["Second Wind", "Bone Plating"] }, catalog)[0]).toMatch(/^the secondary path takes two lesser runes from two different rows/);
    expect(pageProblems({ ...legal, secondary: ["Triumph", "Cut Down"] }, catalog)[0]).toMatch(/of a path other than Precision/);
    expect(pageProblems({ ...legal, shards: ["Health", "Adaptive Force", "Health"] }, catalog)[0]).toMatch(/^No shard "Health" in the Offense slot/);
    expect(() => holding(fighter(), { ...legal, keystone: "Triumph" })).toThrow(/rune page breaks the rules: Triumph isn't a keystone/);
  });

  it("gets the runes the wiki's Rune article lists in place of those its champion can't use", () => {
    const facts = { champion: "Dummy", resourceType: "None", immobilizes: false, spells: ["Ignite"] };
    const swapped = substitutePage({ keystone: "Aftershock", primary: ["Demolish", "Conditioning", "Revitalize"], secondary: ["Manaflow Band", "Cosmic Insight"], shards: QUIET_SHARDS }, catalog, facts);
    expect(swapped.page.keystone).toBe("Grasp of the Undying");
    expect(swapped.page.secondary).toEqual(["Axiom Arcanist", "Cosmic Insight"]);
    expect(swapped.made).toEqual([
      'Aftershock is Grasp of the Undying: "For champions without immobilizing effects, Aftershock is exchanged with Grasp of the Undying and Glacial Augment is exchanged with First Strike." (the wiki\'s Rune article)',
      'Manaflow Band is Axiom Arcanist: "For champions without mana, Manaflow Band is exchanged with Axiom Arcanist." (the wiki\'s Rune article)',
    ]);
    expect(substitutePage({ ...legal, secondary: ["Hextech Flashtraption", "Cosmic Insight"] }, catalog, facts).page.secondary[0]).toBe("Cash Back");
    expect(substitutePage({ ...legal, secondary: ["Hextech Flashtraption", "Cosmic Insight"] }, catalog, { ...facts, spells: ["Flash"] }).page.secondary[0]).toBe("Hextech Flashtraption");
    // A kit that stuns keeps Aftershock.
    const stunner = fighter({ abilities: [ability({ key: "Q", delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] })] });
    expect(holding(stunner, pageWith("Aftershock")).runes!.played.keystone).toBe("Aftershock");
    expect(holding(fighter(), pageWith("Aftershock")).runes!.played.keystone).toBe("Grasp of the Undying");
  });

  it("gives adaptive force as bonus AD or AP by the items' bonus stats, and the champion's adaptive type on a tie", () => {
    const shards = ["Adaptive Force", "Adaptive Force", "Tenacity and Slow Resist"];
    expect(holding(fighter(), pageWith("Conqueror", [], shards), [], "Magic").spec.bonus).toEqual({ ap: 18 });
    expect(holding(fighter(), pageWith("Conqueror", [], shards), [], "Physical").spec.bonus).toEqual({ ad: 10.8 });
    const mage = holding(fighter(), pageWith("Conqueror", [], shards), ["Rabadon's Deathcap"], "Physical");
    expect(mage.spec.bonus.ap).toBe(items.items.find((record) => record.name === "Rabadon's Deathcap")!.stats.ap! + 18);
    expect(mage.runes!.assumptions).toContain("Adaptive force: Dummy has 0 bonus AD and 130 AP from items, so adaptive force gives AP and adaptive damage is magic.");
  });

  it("adds the stat shards' stats", () => {
    const w = world(holding(fighter(), pageWith("Conqueror", [], ["Attack Speed", "Health Scaling", "Health"])), fighter({ id: "enemy" }), ["idle", "idle"]);
    expect(w.units[0].spec.bonus).toEqual({ attackSpeed: 0.1, hp: 265 });
    const other = world(holding(fighter(), pageWith("Conqueror", [], ["Ability Haste", "Move Speed", "Tenacity and Slow Resist"])), fighter({ id: "enemy" }), ["idle", "idle"]);
    step(other, [idle, idle]);
    const d = derive(other.units[0]);
    expect([d.abilityHaste, d.tenacity]).toEqual([8, expect.closeTo(0.15, 10)]);
    expect(d.rawMoveSpeed).toBeCloseTo(350 * 1.025, 6);
  });

  it("records each rune's evidence and its options, and what it leaves out", () => {
    const harvest = holding(fighter(), pageWith("Dark Harvest"), [], "Physical", { "Dark Harvest": { souls: 20 } }).runes!;
    expect(harvest.options["Dark Harvest"]).toEqual({ souls: 20 });
    expect(harvest.assumptions).toContain("Dark Harvest: Souls reaped before the fight: 20.");
    expect(harvest.evidence.some((entry) => entry.rune === "Dark Harvest" && entry.page === "Template:Rune data Dark Harvest")).toBe(true);
    expect(harvest.coverage.find((entry) => entry.rune === "Treasure Hunter")).toEqual({ rune: "Treasure Hunter", modeled: false, unmodeled: ["It gives gold for takedowns, and a duel's builds are bought whole."] });
    const resolve = holding(fighter(), pageWith("Grasp of the Undying")).runes!;
    expect(resolve.coverage.find((entry) => entry.rune === "Revitalize")).toEqual({ rune: "Revitalize", modeled: false, unmodeled: ["Its heal and shield power: the simulator has none yet."] });
  });
});

describe("Precision keystones", () => {
  it("Conqueror stacks twice a melee hit to 12, for 2.56 bonus AD a stack at level 20, and heals for 8% of the damage at full stacks", () => {
    const w = world(holding(fighter(), pageWith("Conqueror")));
    w.units[0].hp = 1000;
    // Six hits at 1.6 seconds apart.
    run(w, 10);
    expect(derive(w.units[0]).ad - 100).toBeCloseTo(12 * (1.8 + (2.2 / 17) * 19) * 0.6, 6);
    expect(w.units[0].hp).toBeGreaterThan(1000);
  });

  it("Press the Attack's third hit deals 174 adaptive damage (87 through 100 armor) and then 8% more damage", () => {
    const w = run(world(holding(fighter(), pageWith("Press the Attack"))), 8);
    expect(hits(w, 0, "Press the Attack")).toEqual([87]);
    const attacks = hits(w, 0, "attack");
    expect(attacks.slice(0, 3)).toEqual([50, 50, 50]);
    expect(attacks[3]).toBe(54);
  });

  it("Lethal Tempo gives a melee holder 6% bonus attack speed an attack, to 36% at six, when its bolts start", () => {
    const w = run(world(holding(fighter(), pageWith("Lethal Tempo"))), 10);
    expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(0.36, 6);
    expect(hits(w, 0, "Lethal Tempo").length).toBeGreaterThan(0);
  });
});

describe("Domination keystones", () => {
  it("Electrocute strikes after three hits within 3 seconds: 260 magic damage (130 through 100 magic resistance), then waits 20 seconds", () => {
    const w = run(world(holding(fighter({ bonus: { attackSpeed: 0.5 } }), pageWith("Electrocute"))), 8);
    expect(hits(w, 0, "Electrocute")).toEqual([130]);
  });

  it("Dark Harvest hits a champion below half health for 30 (+ 11 a soul) adaptive damage", () => {
    const w = world(holding(fighter(), pageWith("Dark Harvest"), [], "Physical", { "Dark Harvest": { souls: 10 } }));
    w.units[1].hp = 900;
    run(w, 3);
    expect(hits(w, 0, "Dark Harvest")).toEqual([70]);
  });

  it("Hail of Blades' two attacks deal 22 bonus true damage each, with 90% bonus attack speed", () => {
    const w = run(world(holding(fighter(), pageWith("Hail of Blades"))), 3);
    expect(hits(w, 0, "Hail of Blades")).toEqual([22, 22]);
  });
});

describe("Resolve keystones and runes", () => {
  it("Grasp of the Undying's attack after 4 seconds in combat deals 3.5% of maximum health as magic damage and gives 5 bonus health", () => {
    const w = run(world(holding(fighter(), pageWith("Grasp of the Undying"))), 6);
    expect(hits(w, 0, "Grasp of the Undying")[0]).toBe(Math.round((0.035 * 2000) / 2));
    expect(derive(w.units[0]).maxHp).toBe(2005);
  });

  it("Aftershock gives 45 armor and magic resistance for 2.5 seconds on an immobilize, then a 120 magic damage shockwave", () => {
    const stunner = fighter({ abilities: [ability({ key: "Q", cooldown: 30, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] })] });
    const w = world(holding(stunner, pageWith("Aftershock")), fighter({ id: "enemy" }), ["idle", "idle"]);
    step(w, [castWhenReady("Q"), idle]);
    // Conditioning (a quiet rune here) gives 8 bonus armor and 3% total armor: Aftershock adds 45 and 75% of that bonus armor.
    const conditioned = 8 + 0.03 * 108;
    expect(derive(w.units[0]).armor.bonus).toBeCloseTo((108 + 45 + 0.75 * conditioned) * 1.03 - 100, 6);
    run(w, 3, [idle, idle]);
    expect(hits(w, 0, "Aftershock")).toEqual([60]);
  });

  it("Guardian shields for 163 just before the hit that brings 2.5 seconds of damage to 178", () => {
    const w = run(world(holding(fighter(), pageWith("Guardian")), fighter({ id: "enemy", bonus: { ad: 300 } }), ["idle", "fight"]), 1);
    expect(w.log.some((entry) => entry.side === 1 && /attack deals \d+ physical damage \(163 absorbed\)/.test(entry.text))).toBe(true);
  });

  it("Bone Plating takes 63.5 off each of the next hits after the first, for 1.5 seconds", () => {
    const w = run(world(holding(fighter(), pageWith("Grasp of the Undying", ["Bone Plating"])), fighter({ id: "enemy", bonus: { attackSpeed: 1 } }), ["idle", "fight"]), 2);
    // 100 AD into 100 armor is 50; the second hit, 0.8 seconds later, is within Bone Plating's 1.5 seconds; the third isn't.
    expect(hits(w, 1, "attack").slice(0, 3)).toEqual([50, 0, 50]);
  });
});

describe("Inspiration keystones", () => {
  it("First Strike, striking first, adds 7% of its damage as true damage for 3 seconds", () => {
    const w = run(world(holding(fighter(), pageWith("First Strike"))), 3);
    expect(hits(w, 0, "First Strike")[0]).toBe(Math.round(0.07 * 50));
  });

  it("First Strike, struck first, goes on cooldown without its effect", () => {
    const w = run(world(holding(fighter(), pageWith("First Strike")), fighter({ id: "enemy" }), ["fight", "fight"], 400), 3);
    const first = w.log.find((entry) => / deals /.test(entry.text));
    expect(hits(w, 0, "First Strike").length > 0).toBe(first?.side === 0);
  });
});
