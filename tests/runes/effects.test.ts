/**
 * Rune pages on fighters (runes/): the page's rules and substitutions, adaptive force, the stat
 * shards, and the runes' effects in fights between synthetic fighters with plain numbers
 * (tests/sim/kits.ts: 2,000 health, 100 armor and magic resistance, 100 AD). Each page's other
 * runes are ones that do nothing in these fights.
 */
import { describe, expect, it } from "vitest";
import { defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { step } from "../../engine/sim/simulate";
import { RuneContext } from "../../runes/context";
import { type NamedRunePage, pageProblems, substitutePage } from "../../runes/equip";
import { RUNE_MODULES } from "../../runes/modules/index";
import { castWhenReady, idle } from "../sim/helpers";
import { RANGED, ability, fighter } from "../sim/kits";
import { QUIET_SHARDS, STILL_SHARDS, castingFirst, catalog, hits, holding, items, pageWith, run, world } from "./helpers";

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
  const legal: NamedRunePage = { keystone: "Conqueror", primary: ["Triumph", "Legend: Alacrity", "Last Stand"], secondary: ["Second Wind", "Unflinching"], shards: ["Adaptive Force", "Adaptive Force", "Health Scaling"] };

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
    expect(mage.spec.bonus?.ap).toBe(items.items.find((record) => record.name === "Rabadon's Deathcap")!.stats.ap! + 18);
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
    const harvest = holding(fighter(), pageWith("Dark Harvest"), [], "Physical", { "Dark Harvest": { souls: 25 } }).runes!;
    expect(harvest.options["Dark Harvest"]).toEqual({ souls: 25 });
    expect(harvest.assumptions).toContain("Dark Harvest: Souls reaped before the fight: 25.");
    expect(harvest.evidence.some((entry) => entry.rune === "Dark Harvest" && entry.page === "Template:Rune data Dark Harvest")).toBe(true);
    expect(harvest.coverage.find((entry) => entry.rune === "Treasure Hunter")).toEqual({ rune: "Treasure Hunter", modeled: false, unmodeled: ["It gives gold for takedowns, and a duel's builds are bought whole."] });
    const resolve = holding(fighter(), pageWith("Grasp of the Undying")).runes!;
    expect(resolve.coverage.find((entry) => entry.rune === "Revitalize")).toEqual({ rune: "Revitalize", modeled: false, unmodeled: ["Its heal and shield power: the simulator has none yet."] });
  });
});

describe("what runes collect before a fight", () => {
  it("defaults to a typical 30-minute game, the stacks labeled as estimates for it", () => {
    const harvest = holding(fighter(), pageWith("Dark Harvest", ["Ultimate Hunter"])).runes!;
    expect(harvest.options).toMatchObject({ "Dark Harvest": { souls: 20 }, "Ultimate Hunter": { stacks: 4 } });
    expect(harvest.assumptions).toContain("Dark Harvest: Souls reaped before the fight: 20 (an estimate for a typical 30-minute game).");
    expect(harvest.assumptions).toContain("Ultimate Hunter: Bounty Hunter stacks before the fight (one per enemy champion taken down, 5 at most): 4 (an estimate for a typical 30-minute game).");
    const grasp = holding(fighter(), pageWith("Grasp of the Undying", ["Overgrowth"])).runes!;
    expect(grasp.options).toMatchObject({ "Grasp of the Undying": { procs: 30 }, Overgrowth: { stacks: 30 } });
    const storm = holding(fighter(), pageWith("Arcane Comet", ["Gathering Storm"])).runes!;
    expect(storm.options["Gathering Storm"]).toEqual({ minutes: 30 });
    expect(storm.assumptions).toContain("Gathering Storm: Minutes of game time before the fight: 30 (a typical 30-minute game).");
  });

  it("Grasp of the Undying's procs before the fight give their bonus health: 30 melee procs of 5", () => {
    expect(derive(world(holding(fighter(), pageWith("Grasp of the Undying"))).units[0]).maxHp).toBe(2150);
    expect(derive(world(holding(fighter({ attack: RANGED }), pageWith("Grasp of the Undying"))).units[0]).maxHp).toBe(2060);
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

  it("Fleet Footwork's Energized attack, the first, heals a melee holder for 182.7 at level 20 and gives 20% movement speed for 1 second", () => {
    const w = world(holding(fighter(), pageWith("Fleet Footwork", [], STILL_SHARDS)));
    w.units[0].hp = 1000;
    // The first attack hits at 0.48 seconds; the next, at 2.08, isn't Energized.
    run(w, 0.6);
    expect(w.units[0].hp).toBeCloseTo(1182.73, 1);
    expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(350 * 1.2, 6);
    run(w, 2);
    expect(derive(w.units[0]).rawMoveSpeed).toBe(350);
    expect(w.units[0].hp).toBeCloseTo(1182.73, 1);
  });
});

describe("Domination keystones", () => {
  it("Electrocute strikes after three hits within 3 seconds: 260 magic damage (130 through 100 magic resistance), then waits 20 seconds", () => {
    const w = run(world(holding(fighter({ bonus: { attackSpeed: 0.5 } }), pageWith("Electrocute"))), 8);
    expect(hits(w, 0, "Electrocute")).toEqual([130]);
  });

  it("Electrocute counts crowd control of any type as a stack: a slow and two attacks within 3 seconds", () => {
    // Attacks alone, at 0.48, 2.08 and 3.68 seconds, are too far apart.
    expect(hits(run(world(holding(fighter(), pageWith("Electrocute"))), 4), 0, "Electrocute")).toEqual([]);
    const slower = fighter({ abilities: [ability({ key: "Q", cooldown: 30, delivery: { kind: "target", range: 700 }, onHit: [{ type: "cc", cc: "slow", duration: 1, strength: 0.2 }] })] });
    const w = run(world(holding(slower, pageWith("Electrocute"))), 3, [castingFirst("Q"), defaultBehavior]);
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

/** A fighter whose Q hits the enemy for `amount` magic damage from up to 700 units, after `cc` (none by default). */
const caster = (amount: number, cc: Array<{ type: "cc"; cc: "stun" | "slow"; duration: number; strength?: number }> = [], delivery: Parameters<typeof ability>[0]["delivery"] = { kind: "target", range: 700 }) =>
  fighter({ abilities: [ability({ key: "Q", cooldown: 30, delivery, onHit: [...cc, ...(amount > 0 ? [{ type: "damage" as const, damageType: "magic" as const, amount: { base: amount } }] : [])] })] });
/** The enemy with no magic resistance: magic damage numbers as dealt. */
const unwarded = () => fighter({ id: "enemy", base: { mr: 0 } });
/** `w` played with the holder casting Q whenever it is ready, against an idle enemy. */
const casting = (w: ReturnType<typeof world>, seconds: number) => run(w, seconds, [castWhenReady("Q"), idle]);

describe("Sorcery keystones", () => {
  it("Summon Aery strikes 0.45 seconds after a damaging attack for 54.7 adaptive damage (27 through 100 armor), and again only once she is back", () => {
    // Attacks hit at 0.48, 2.08, 3.68 and 5.28 seconds; she is back 3.45 seconds after the first (2 seconds lingering, her return assumed 1).
    const w = run(world(holding(fighter(), pageWith("Summon Aery"))), 6);
    expect(hits(w, 0, "Summon Aery")).toEqual([27, 27]);
  });

  it("Arcane Comet lands 0.825 seconds after ability damage for 110 magic damage, 80% more from 600 units away (99 through 100 magic resistance)", () => {
    // 600 units center to center: 470 edge to edge. The stun holds the enemy in place, so the comet lands.
    const w = casting(world(holding(caster(100, [{ type: "cc", cc: "stun", duration: 2 }]), pageWith("Arcane Comet")), fighter({ id: "enemy" }), ["fight", "idle"], 470), 1.5);
    expect(hits(w, 0, "Arcane Comet")).toEqual([99]);
    // Basic attacks don't hurl it.
    expect(hits(run(world(holding(fighter(), pageWith("Arcane Comet"))), 3), 0, "Arcane Comet")).toEqual([]);
  });

  it("Stormraider's Surge gives 48% movement speed and 50% slow resist for 4 seconds once 25% of the enemy's maximum health is dealt within 3 seconds", () => {
    // 1,000 magic damage through 100 magic resistance is 500, a quarter of 2,000.
    const w = casting(world(holding(caster(1000), pageWith("Stormraider's Surge", [], STILL_SHARDS)), fighter({ id: "enemy" }), ["fight", "idle"], 300), 0.2);
    expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(350 * 1.48, 6);
    w.units[0].statuses.push({ kind: "cc", key: "slow", source: 1, startTick: w.tick, endTick: w.tick + 30, value: 0.5 });
    expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(350 * 1.48 * (1 - 0.5 * 0.5), 6);
    casting(w, 4);
    expect(derive(w.units[0]).rawMoveSpeed).toBe(350);
    // 450 is short of it.
    const short = casting(world(holding(caster(900), pageWith("Stormraider's Surge", [], STILL_SHARDS)), fighter({ id: "enemy" }), ["fight", "idle"], 300), 0.2);
    expect(derive(short.units[0]).rawMoveSpeed).toBe(350);
  });

  it("Deathfire Touch burns for 6.53 magic damage every 0.5 seconds, 4 seconds after spell damage and 2 after area damage, 75% more once it has lingered 3 seconds", () => {
    const w = casting(world(holding(caster(10), pageWith("Deathfire Touch")), unwarded(), ["fight", "idle"], 300), 5);
    expect(hits(w, 0, "Deathfire Touch")).toEqual([7, 7, 7, 7, 7, 11, 11, 11]);
    const area = casting(world(holding(caster(10, [], { kind: "aura", radius: 300 }), pageWith("Deathfire Touch")), unwarded(), ["fight", "idle"], 100), 5);
    expect(hits(area, 0, "Deathfire Touch")).toEqual([7, 7, 7, 7]);
  });
});

describe("Resolve keystones and runes", () => {
  it("Grasp of the Undying's attack after 4 seconds in combat deals 3.5% of maximum health as magic damage and gives 5 bonus health", () => {
    const w = run(world(holding(fighter(), pageWith("Grasp of the Undying"), [], "Physical", { "Grasp of the Undying": { procs: 0 } })), 6);
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
  it("Glacial Augment slows an immobilized enemy by 20% in its ray toward the holder, for 3 seconds and the immobilize's 1", () => {
    const w = casting(world(holding(caster(0, [{ type: "cc", cc: "stun", duration: 1 }]), pageWith("Glacial Augment")), fighter({ id: "enemy" }), ["fight", "idle"], 300), 2);
    expect(derive(w.units[1]).rawMoveSpeed).toBeCloseTo(350 * 0.8, 6);
    casting(w, 2.3);
    expect(derive(w.units[1]).rawMoveSpeed).toBe(350);
  });

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
