/**
 * The lesser runes in fights between synthetic fighters with plain numbers (tests/sim/kits.ts:
 * 2,000 health, 100 armor and magic resistance, 100 AD, an attack every 1.6 seconds whose hit
 * lands 0.48 seconds after it starts), each on a page whose other runes do nothing in them
 * (lesserPage), at level 20.
 */
import { describe, expect, it } from "vitest";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { spellKey } from "../../summoners/equip";
import { castWhenReady, idle, lasting } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";
import { STILL_SHARDS, castingFirst, hits, holding, lesserPage, run, ticks, world } from "./helpers";

/** The enemy with no armor or magic resistance: damage numbers as dealt. */
const bare = () => fighter({ id: "enemy", base: { armor: 0, mr: 0 } });
/** A mana champion with 500 mana. */
const mage = (spec: FighterSpec = fighter({ base: { resource: 500 } })): FighterSpec => ({ ...spec, resourceType: "Mana" });
/** An ability hitting the enemy from up to 700 units with `onHit`. */
const spell = (key: string, onHit: Effect[], extra: Partial<AbilitySpec> = {}) => ability({ key, slot: key as AbilitySpec["slot"], cooldown: 30, delivery: { kind: "target", range: 700 }, onHit, ...extra });
const magic = (amount: number): Effect => ({ type: "damage", damageType: "magic", amount: { base: amount } });
/** The ability's cooldown on the holder after its ability haste (as items/equip.ts's slot haste and the engine's haste give it). */
const cooldownOf = (spec: FighterSpec, key: string) => {
  const w = world(spec);
  const found = w.units[0].spec.abilities.find((a) => a.key === key)!;
  return ((found.cooldownFor?.(w.units[0]) ?? found.cooldown) * 100) / (100 + derive(w.units[0]).abilityHaste);
};
/** The holder casting `key` whenever it is ready, against an idle enemy. */
const casting = (w: World, seconds: number, key = "Q") => run(w, seconds, [castWhenReady(key), idle]);

describe("Precision runes", () => {
  it("Legend: Alacrity, fully stacked, gives 3% + 1.5% a stack for 10 stacks: 18% bonus attack speed", () => {
    expect(derive(world(holding(fighter(), lesserPage("Legend: Alacrity"))).units[0]).bonusAttackSpeed).toBeCloseTo(0.18, 10);
  });

  it("Legend: Haste, fully stacked, gives 15 basic ability haste to Q, W and E only", () => {
    const spec = holding(fighter({ abilities: [spell("Q", []), spell("R", [], { cooldown: 100 })] }), lesserPage("Legend: Haste")).spec;
    // The Ability Haste shard's 8 counts for both.
    expect(cooldownOf(spec, "Q")).toBeCloseTo((30 * 100) / (100 + 8 + 15), 10);
    expect(cooldownOf(spec, "R")).toBeCloseTo((100 * 100) / (100 + 8), 10);
  });

  it("Legend: Bloodline, fully stacked, gives 15 x 0.45% = 6.75% life steal and 85 bonus health", () => {
    const w = world(holding(fighter(), lesserPage("Legend: Bloodline")));
    expect(derive(w.units[0]).maxHp).toBe(2085);
    w.units[0].hp = 1000;
    run(w, 0.6);
    // The attack's 50 through 100 armor.
    expect(w.units[0].hp).toBeCloseTo(1000 + 0.0675 * 50, 6);
  });

  it("Coup de Grace deals 8% more damage to a champion below 40% of its maximum health", () => {
    const low = world(holding(fighter(), lesserPage("Coup de Grace")), bare());
    low.units[1].hp = 780;
    expect(hits(run(low, 0.6), 0, "attack")).toEqual([108]);
    const high = world(holding(fighter(), lesserPage("Coup de Grace")), bare());
    high.units[1].hp = 820;
    expect(hits(run(high, 0.6), 0, "attack")).toEqual([100]);
  });

  it("Cut Down deals 8% more damage to a champion above 60% of its maximum health", () => {
    expect(hits(run(world(holding(fighter(), lesserPage("Cut Down")), bare()), 0.6), 0, "attack")).toEqual([108]);
    const low = world(holding(fighter(), lesserPage("Cut Down")), bare());
    low.units[1].hp = 1180;
    expect(hits(run(low, 0.6), 0, "attack")).toEqual([100]);
  });

  it("Last Stand deals 5% more damage below 60% health, growing evenly to 11% below 30%", () => {
    const at = (hp: number) => {
      const w = world(holding(fighter(), lesserPage("Last Stand")), bare());
      w.units[0].hp = hp;
      return hits(run(w, 0.6), 0, "attack")[0];
    };
    expect(at(1300)).toBe(100);
    // 45% health is halfway from 60% to 30%: 8%.
    expect(at(900)).toBe(108);
    expect(at(500)).toBe(111);
  });

  it("Presence of Mind restores 56 mana to a melee holder at level 20 when it damages the enemy, every 8 seconds", () => {
    const w = world(holding(mage(), lesserPage("Presence of Mind")));
    w.units[0].resource = 100;
    run(w, 0.6);
    expect(w.units[0].resource).toBeCloseTo(156, 6);
    // The second attack, 1.6 seconds later, is within the cooldown.
    run(w, 1.6);
    expect(w.units[0].resource).toBeCloseTo(156, 6);
  });
});

describe("Domination runes", () => {
  it("Cheap Shot deals 49.1 true damage at level 20 to an enemy impaired before the hit, every 4 seconds", () => {
    const slowed = world(holding(fighter(), lesserPage("Cheap Shot")));
    slowed.units[1].statuses.push(lasting("cc", "slow", 0.2));
    // Attacks hit at 0.48, 2.08, 3.68 and 5.28 seconds: the first and the fourth.
    expect(hits(run(slowed, 5), 0, "Cheap Shot")).toEqual([49]);
    expect(hits(run(slowed, 1), 0, "Cheap Shot")).toEqual([49, 49]);
    // Cripple isn't one of its crowd control types.
    const crippled = world(holding(fighter(), lesserPage("Cheap Shot")));
    crippled.units[1].statuses.push(lasting("cc", "cripple", 0.3));
    expect(hits(run(crippled, 3), 0, "Cheap Shot")).toEqual([]);
    // The slow that comes with the hit doesn't count for it; the next attack's does.
    const own = world(holding(fighter({ abilities: [spell("Q", [{ type: "cc", cc: "slow", duration: 2, strength: 0.3 }, magic(10)])] }), lesserPage("Cheap Shot")));
    run(own, 0.2, [castingFirst("Q"), idle]);
    expect(hits(own, 0, "Cheap Shot")).toEqual([]);
    expect(hits(run(own, 0.6, [castingFirst("Q"), idle]), 0, "Cheap Shot")).toEqual([49]);
  });

  it("Taste of Blood heals 42.8 at level 20 when the holder damages the enemy, every 20 seconds, and not at full health", () => {
    const w = world(holding(fighter(), lesserPage("Taste of Blood")));
    run(w, 0.6);
    expect(w.units[0].hp).toBe(2000);
    // The attack at full health didn't start its cooldown.
    w.units[0].hp = 1000;
    run(w, 1.6);
    expect(w.units[0].hp).toBeCloseTo(1042.82, 2);
    run(w, 3.2);
    expect(w.units[0].hp).toBeCloseTo(1042.82, 2);
  });

  it("Sudden Impact deals 80 true damage (its level-18 value at 20) on damage within 4 seconds of a dash", () => {
    const dasher = fighter({ abilities: [ability({ key: "E", slot: "E", cooldown: 30, delivery: { kind: "dash", direction: "toward", distance: 400, speed: 1200, hitRadius: 100 } })] });
    const w = run(world(holding(dasher, lesserPage("Sudden Impact")), fighter({ id: "enemy" }), ["fight", "idle"], 500), 2, [castingFirst("E"), idle]);
    expect(hits(w, 0, "Sudden Impact")).toEqual([80]);
    expect(hits(run(world(holding(fighter(), lesserPage("Sudden Impact"))), 3), 0, "Sudden Impact")).toEqual([]);
  });

  it("Relentless Hunter gives 8 movement speed a Bounty Hunter stack out of combat: 32 for the 4 of a typical game", () => {
    const w = world(holding(fighter(), lesserPage("Relentless Hunter", STILL_SHARDS)));
    ticks(w, 1);
    expect(derive(w.units[0]).rawMoveSpeed).toBe(382);
    run(w, 0.6);
    expect(derive(w.units[0]).rawMoveSpeed).toBe(350);
  });

  it("Ultimate Hunter gives 6 + 5 ultimate haste a Bounty Hunter stack: 26 for 4, 31 at most", () => {
    const holder = fighter({ abilities: [spell("Q", []), spell("R", [], { cooldown: 100 })] });
    expect(cooldownOf(holding(holder, lesserPage("Ultimate Hunter")).spec, "R")).toBeCloseTo((100 * 100) / (100 + 8 + 26), 10);
    expect(cooldownOf(holding(holder, lesserPage("Ultimate Hunter"), [], "Physical", { "Ultimate Hunter": { stacks: 9 } }).spec, "R")).toBeCloseTo((100 * 100) / (100 + 8 + 31), 10);
    expect(cooldownOf(holding(holder, lesserPage("Ultimate Hunter")).spec, "Q")).toBeCloseTo((30 * 100) / (100 + 8), 10);
  });
});

describe("Sorcery runes", () => {
  it("Axiom Arcanist adds 12% to the ultimate's damage, 8% for an area ultimate, and nothing to other abilities", () => {
    const ultimate = (delivery: AbilitySpec["delivery"]) => fighter({ abilities: [spell("R", [magic(100)], { cooldown: 100, delivery })] });
    expect(hits(casting(world(holding(ultimate({ kind: "target", range: 700 }), lesserPage("Axiom Arcanist")), bare(), ["fight", "idle"], 100), 0.2, "R"), 0, "R")).toEqual([112]);
    expect(hits(casting(world(holding(ultimate({ kind: "aura", radius: 300 }), lesserPage("Axiom Arcanist")), bare(), ["fight", "idle"], 100), 0.2, "R"), 0, "R")).toEqual([108]);
    expect(hits(casting(world(holding(fighter({ abilities: [spell("Q", [magic(100)])] }), lesserPage("Axiom Arcanist")), bare(), ["fight", "idle"], 100), 0.2), 0, "Q")).toEqual([100]);
  });

  it("Manaflow Band, fully stacked, gives a mana holder 250 maximum mana and restores 1% of its missing mana every 5 seconds", () => {
    const w = world(holding(mage(), lesserPage("Manaflow Band")));
    expect(derive(w.units[0]).maxResource).toBe(750);
    w.units[0].resource = 50;
    ticks(w, 1, [idle, idle]);
    expect(w.units[0].resource).toBeCloseTo(57, 6);
    ticks(w, 150, [idle, idle]);
    expect(w.units[0].resource).toBeCloseTo(57 + 0.01 * (750 - 57), 6);
  });

  it("Nimbus Cloak gives ghosting and half its bracket's movement speed for 2 seconds after a summoner spell: 35% for Ignite's 180-second cooldown, 45% for Exhaust's 240", () => {
    const after = (name: string) => {
      const w = world(holding(fighter(), lesserPage("Nimbus Cloak", STILL_SHARDS), [], "Physical", undefined, [name]), fighter({ id: "enemy" }), ["fight", "idle"], 100);
      return run(w, 0.1, [castingFirst(spellKey(name)), idle]);
    };
    const ignited = after("Ignite");
    expect(derive(ignited.units[0]).rawMoveSpeed).toBeCloseTo(350 * (1 + 0.35 / 2), 6);
    expect(ignited.units[0].statuses.some((status) => status.kind === "state" && status.key === "ghosted")).toBe(true);
    expect(derive(after("Exhaust").units[0]).rawMoveSpeed).toBeCloseTo(350 * (1 + 0.45 / 2), 6);
    run(ignited, 2, [idle, idle]);
    expect(derive(ignited.units[0]).rawMoveSpeed).toBe(350);
  });

  it("Transcendence gives 5 ability haste at level 5 and 5 more at 8", () => {
    // With the Ability Haste shard's 8.
    expect(derive(world(holding(fighter(), lesserPage("Transcendence"))).units[0]).abilityHaste).toBe(18);
  });

  it("Celerity gives 1% bonus movement speed", () => {
    expect(derive(world(holding(fighter(), lesserPage("Celerity", STILL_SHARDS))).units[0]).rawMoveSpeed).toBeCloseTo(353.5, 6);
  });

  it("Absolute Focus gives 19.9 bonus AD (or 33.2 AP) at level 20 while above 70% of maximum health", () => {
    const w = ticks(world(holding(fighter(), lesserPage("Absolute Focus"))), 1, [idle, idle]);
    expect(derive(w.units[0]).ad).toBeCloseTo(100 + 19.906, 2);
    w.units[0].hp = 1200;
    ticks(w, 1, [idle, idle]);
    expect(derive(w.units[0]).ad).toBe(100);
    const ap = ticks(world(holding(fighter(), lesserPage("Absolute Focus"), [], "Magic")), 1, [idle, idle]);
    expect(derive(ap.units[0]).ap).toBeCloseTo(33.18, 2);
  });

  it("Gathering Storm gives adaptive force by the 10 minutes reached: 28.8 bonus AD or 48 AP at 30 minutes, 14.4 AD at 25", () => {
    expect(holding(fighter(), lesserPage("Gathering Storm")).spec.bonus?.ad).toBeCloseTo(28.8, 10);
    expect(holding(fighter(), lesserPage("Gathering Storm"), [], "Magic").spec.bonus?.ap).toBeCloseTo(48, 10);
    expect(holding(fighter(), lesserPage("Gathering Storm"), [], "Physical", { "Gathering Storm": { minutes: 25 } }).spec.bonus?.ad).toBeCloseTo(14.4, 10);
  });

  it("Scorch deals 42.4 magic damage at level 20 (21 through 100 magic resistance) 1 second after ability damage, every 10 seconds", () => {
    const w = casting(world(holding(fighter({ abilities: [spell("Q", [magic(10)], { cooldown: 4 })] }), lesserPage("Scorch")), fighter({ id: "enemy" }), ["fight", "idle"], 100), 9);
    // Q at 0, 4 and 8 seconds: only the first is Scorched.
    expect(hits(w, 0, "Q").length).toBe(3);
    expect(hits(w, 0, "Scorch")).toEqual([21]);
  });
});

describe("Resolve runes", () => {
  it("Font of Life heals a melee holder for 54.7 at level 20 when it slows or immobilizes the enemy, every 20 seconds", () => {
    const w = world(holding(fighter({ abilities: [spell("Q", [{ type: "cc", cc: "slow", duration: 1, strength: 0.2 }], { cooldown: 4 })] }), lesserPage("Font of Life")), fighter({ id: "enemy" }), ["fight", "idle"], 100);
    w.units[0].hp = 1000;
    casting(w, 5);
    expect(w.units[0].hp).toBeCloseTo(1054.71, 2);
  });

  it("Shield Bash's next attack after a shield deals 32.9 + 15% of the shield as adaptive damage, once a shield", () => {
    const shielder = fighter({ abilities: [ability({ key: "W", slot: "W", cooldown: 30, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 200 }, duration: 2 }] })] });
    const w = run(world(holding(shielder, lesserPage("Shield Bash")), bare()), 3, [castingFirst("W"), idle]);
    expect(hits(w, 0, "Shield Bash")).toEqual([Math.round(32.94 + 0.15 * 200)]);
  });

  it("Conditioning gives 8 bonus armor and magic resistance and 3% total", () => {
    const d = derive(world(holding(fighter(), lesserPage("Conditioning"))).units[0]);
    expect(d.armor.base + d.armor.bonus).toBeCloseTo(108 * 1.03, 6);
    expect(d.mr.base + d.mr.bonus).toBeCloseTo(108 * 1.03, 6);
  });

  it("Second Wind regenerates 4% of missing health over 10 seconds after damage", () => {
    const w = world(holding(fighter(), lesserPage("Second Wind")));
    w.units[0].hp = 1000;
    dealDamage(w, w.units[1], w.units[0], 100, "true", { ability: "Test" });
    ticks(w, 300, [idle, idle]);
    // Missing health falls by 4%/300 a tick: 1,100 x (1 - 0.04/300)^300 is left missing.
    expect(w.units[0].hp).toBeCloseTo(2000 - 1100 * (1 - 0.04 / 300) ** 300, 0);
    const done = w.units[0].hp;
    ticks(w, 60, [idle, idle]);
    expect(w.units[0].hp).toBeCloseTo(done, 0);
  });

  it("Overgrowth gives 3 health a stack, and 3.5% more health from 15 stacks: 30 stacks in a typical game", () => {
    const maxHp = (options?: Record<string, Record<string, number>>) => derive(world(holding(fighter(), lesserPage("Overgrowth"), [], "Physical", options)).units[0]).maxHp;
    expect(maxHp()).toBeCloseTo(2090 * 1.035, 6);
    expect(maxHp({ Overgrowth: { stacks: 14 } })).toBe(2042);
    expect(maxHp({ Overgrowth: { stacks: 15 } })).toBeCloseTo(2045 * 1.035, 6);
  });

  it("Unflinching gives 10 bonus armor and magic resistance under the enemy's crowd control and for 2 seconds after", () => {
    const w = world(holding(fighter(), lesserPage("Unflinching")));
    applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "stun", duration: 1 }, { scale: 1 });
    const bonus = () => [derive(w.units[0]).armor.bonus, derive(w.units[0]).mr.bonus];
    ticks(w, 15, [idle, idle]);
    expect(bonus()).toEqual([10, 10]);
    ticks(w, 70, [idle, idle]);
    expect(bonus()).toEqual([10, 10]);
    ticks(w, 15, [idle, idle]);
    expect(bonus()).toEqual([0, 0]);
  });
});

describe("Inspiration runes", () => {
  it("Magical Footwear's boots give 10 more movement speed", () => {
    const speed = (rune: string, build: string[]) => derive(world(holding(fighter(), lesserPage(rune, STILL_SHARDS), build)).units[0]).rawMoveSpeed;
    expect(speed("Magical Footwear", ["Plated Steelcaps"]) - speed("Cash Back", ["Plated Steelcaps"])).toBeCloseTo(10, 10);
    expect(speed("Magical Footwear", [])).toBe(350);
  });

  it("Biscuit Delivery's three biscuits give 30 maximum health each", () => {
    expect(derive(world(holding(fighter(), lesserPage("Biscuit Delivery"))).units[0]).maxHp).toBe(2090);
  });

  it("Approach Velocity gives 15% movement speed toward an enemy the holder slowed, and 7.5% toward one slowed by others within 1,000 units", () => {
    const slower = fighter({ abilities: [spell("Q", [{ type: "cc", cc: "slow", duration: 2, strength: 0.2 }])] });
    const w = casting(world(holding(slower, lesserPage("Approach Velocity", STILL_SHARDS)), fighter({ id: "enemy" }), ["fight", "idle"], 300), 0.5);
    expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(350 * 1.15, 6);
    casting(w, 2);
    expect(derive(w.units[0]).rawMoveSpeed).toBe(350);
    const other = world(holding(fighter(), lesserPage("Approach Velocity", STILL_SHARDS)), fighter({ id: "enemy" }), ["idle", "idle"], 300);
    other.units[1].statuses.push(lasting("cc", "slow", 0.2, { source: 1 }));
    ticks(other, 1, [idle, idle]);
    expect(derive(other.units[0]).rawMoveSpeed).toBeCloseTo(350 * 1.075, 6);
  });

  it("Jack of All Trades gives 1 ability haste for each stat type of the build, and 4.8 bonus AD at 5 types, 12 at 10", () => {
    const gain = (build: string[]) => {
      const [jack, other] = [holding(fighter(), lesserPage("Jack of All Trades"), build).spec.bonus!, holding(fighter(), lesserPage("Cash Back"), build).spec.bonus!];
      return [(jack.abilityHaste ?? 0) - (other.abilityHaste ?? 0), (jack.ad ?? 0) - (other.ad ?? 0)];
    };
    // Attack damage, critical strike chance and critical strike damage.
    expect(gain(["Infinity Edge"])).toEqual([3, 0]);
    // And armor, flat movement speed and health.
    expect(gain(["Infinity Edge", "Plated Steelcaps", "Thornmail"])).toEqual([6, expect.closeTo(4.8, 10)]);
    // And magic resistance, tenacity, armor penetration, attack speed and movement speed.
    expect(gain(["Infinity Edge", "Mercury's Treads", "Lord Dominik's Regards", "Kraken Slayer", "Thornmail"])).toEqual([11, expect.closeTo(12, 10)]);
  });
});
