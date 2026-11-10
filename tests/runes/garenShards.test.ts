import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocateBoth, damagePerSecond, type StatPrices } from "../../engine/budget";
import { attackTiming, startCast } from "../../engine/sim/actions";
import { channelPulseCount } from "../../engine/sim/channelPulses";
import { applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { equipBuild, loadItemCatalog } from "../../pipeline/itemData";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import { equipShards } from "../../runes/shards";
import { championData, kit } from "../kits/helpers";
import { idle, ticksOf } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadShardRules("16.21", catalog);
const items = await loadItemCatalog("16.21");
const prices = JSON.parse(readFileSync("data/16.21/rules.json", "utf8")).statPrices as StatPrices;
const garen = kit("Garen");
const champion = championData("Garen");
const purchased = (bonus: BonusStats = {}): FighterSpec => ({ ...garen.spec, bonus: { ...bonus } });
const sharded = (spec: FighterSpec, withItems = false): FighterSpec =>
  equipShards(spec, [5005, 5001, 5011], catalog, rules, { adaptiveType: champion.adaptiveType, withItems }).spec;

function arena(spec = purchased()): World {
  return createWorld({
    fighters: [
      { ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } },
      fighter({ base: { hp: 100000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } }),
    ],
    distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true },
  });
}
const judgment = (world: World) => world.units[0].spec.abilities.find(ability => ability.key === "E")!;
function cast(world: World): number {
  const spell = judgment(world);
  expect(spell.channel?.pulsesFor).toBeTypeOf("function");
  startCast(world, world.units[0], spell);
  const action = world.units[0].action;
  expect(action?.kind).toBe("channel");
  if (action?.kind !== "channel" || action.pulseCount === undefined) throw new Error("Judgment did not start a counted channel");
  return action.pulseCount;
}
function through(world: World, tick: number): void {
  while (world.tick <= tick && !world.result) step(world, [idle, idle]);
}
const pulseTicks = (world: World) => ticksOf(world.log, 0, "Judgment deals ");

describe("Garen Judgment rune attack-speed eligibility", () => {
  it("binds the item-and-growth eligibility rule to the retained Judgment revision", () => {
    expect(garen.evidence).toEqual(expect.arrayContaining([expect.objectContaining({
      page: "Template:Data Garen/Judgment", revid: 4009435,
      text: "Judgment only scales with bonus attack speed from items and growth (per level).",
    })]));
    expect(garen.spec.base.attackSpeed.bonus).toBeCloseTo(0.7177725, 10);
  });

  it.each([
    [0, 9], [0.0322, 9], [0.0322275, 10],
    [0.2822, 10], [0.2822275, 11],
    [0.5322, 11], [0.5322275, 12], [2.0322275, 18],
  ] as const)("purchased AS %s retains %s spins with or without the AS shard", (attackSpeed, spins) => {
    const bare = arena(purchased({ attackSpeed })), withRune = arena(sharded(purchased({ attackSpeed })));
    expect(derive(withRune.units[0]).bonusAttackSpeed).toBeCloseTo(derive(bare.units[0]).bonusAttackSpeed + 0.1, 10);
    expect(withRune.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(cast(bare)).toBe(spins);
    expect(cast(withRune)).toBe(spins);
    through(bare, 90); through(withRune, 90);
    const expectedTicks = Array.from({ length: spins }, (_, index) => Math.ceil(90 * (index + 1) / spins));
    expect(pulseTicks(bare)).toEqual(expectedTicks);
    expect(pulseTicks(withRune)).toEqual(expectedTicks);
    expect(withRune.units[1].totals.damageTaken).toBeCloseTo(bare.units[1].totals.damageTaken, 8);
  });

  it("regresses the old level-20 false tenth spin while preserving faster basic attacks", () => {
    const bare = arena(), withRune = arena(sharded(purchased()));
    // Growth alone is below75%; the shard crosses75% in combat, but does not qualify for E.
    expect(derive(bare.units[0]).bonusAttackSpeed).toBeLessThan(0.75);
    expect(derive(withRune.units[0]).bonusAttackSpeed).toBeGreaterThan(0.75);
    expect(derive(withRune.units[0]).attackSpeed).toBeGreaterThan(derive(bare.units[0]).attackSpeed);
    expect(attackTiming(withRune.units[0]).total).toBeLessThan(attackTiming(bare.units[0]).total);
    expect(cast(withRune)).toBe(9);
    through(withRune, 90);
    expect(pulseTicks(withRune)).toHaveLength(9);
  });

  it("does not let an attack-speed slow remove qualifying spins", () => {
    const bare = arena(sharded(purchased({ attackSpeed: 0.2822275 })));
    const slowed = arena(sharded(purchased({ attackSpeed: 0.2822275 })));
    applyEffect(slowed, slowed.units[1], slowed.units[0], { type: "cc", cc: "cripple", strength: 0.5, duration: 10 }, { scale: 1 });
    expect(derive(slowed.units[0]).attackSpeed).toBeLessThan(derive(bare.units[0]).attackSpeed);
    expect(cast(bare)).toBe(11);
    expect(cast(slowed)).toBe(11);
    through(bare, 90); through(slowed, 90);
    expect(pulseTicks(slowed)).toEqual(pulseTicks(bare));
    expect(slowed.units[1].totals.damageTaken).toBeCloseTo(bare.units[1].totals.damageTaken, 8);
  });

  it.each([
    [["Kraken Slayer"], 0.4, 11],
    [["Phantom Dancer"], 0.65, 12],
    [["Kraken Slayer", "Phantom Dancer"], 1.05, 14],
  ] as const)("retains the direct item stats from %s as eligible AS", (names, attackSpeed, spins) => {
    const bare = arena(equipBuild(purchased(), [...names], items).spec);
    const withRune = arena(equipBuild(sharded(purchased(), true), [...names], items).spec);
    expect(bare.units[0].spec.bonus?.attackSpeed).toBeCloseTo(attackSpeed, 10);
    expect(withRune.units[0].spec.bonus?.attackSpeed).toBeCloseTo(attackSpeed + 0.1, 10);
    expect(cast(bare)).toBe(spins);
    expect(cast(withRune)).toBe(spins);
    through(bare, 90); through(withRune, 90);
    expect(pulseTicks(withRune)).toEqual(pulseTicks(bare));
  });

  it("retains crit averaging and the sixth-hit armor shred after excluding rune AS", () => {
    const world = arena(sharded(purchased({ critChance: 0.5 })));
    const damage = judgment(world).channel!.onTick![0]!;
    if (damage.type !== "damage") throw new Error("Judgment has no damage pulse");
    const raw = evaluate(damage.amount, world.units[0], world.units[1]);
    expect(cast(world)).toBe(9);
    through(world, 50);
    expect(world.units[0].memory.judgmentHits).toBe(5);
    expect(world.units[1].statuses.some(status => status.key === "armorReductionPercent")).toBe(false);
    through(world, 60);
    expect(world.units[0].memory.judgmentHits).toBe(6);
    expect(world.units[1].statuses.find(status => status.key === "armorReductionPercent")).toMatchObject({ value: 0.25, startTick: 60, endTick: 240 });
    through(world, 70);
    expect(world.units[1].statuses.find(status => status.key === "armorReductionPercent")).toMatchObject({ startTick: 70, endTick: 250 });
    through(world, 90);
    expect(pulseTicks(world)).toHaveLength(9);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(raw * 1.15 * 9, 8);
  });

  it("keeps the committed count through later stats, then reevaluates the next cast", () => {
    const world = arena(sharded(purchased()));
    expect(cast(world)).toBe(9);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ...world.units[0].spec.bonus, attackSpeed: 0.35 } };
    expect(channelPulseCount(judgment(world).channel!, world.units[0])).toBe(10);
    expect(world.units[0].action).toMatchObject({ pulseCount: 9 });
    through(world, 90);
    expect(pulseTicks(world)).toHaveLength(9);
    world.units[0].cooldownReady.E = world.tick;
    expect(cast(world)).toBe(10);
    through(world, 181);
    expect(pulseTicks(world)).toHaveLength(19);
  });

  it("preserves origin accounting and committed channel counts independently in branches", () => {
    const source = purchased(), withRune = sharded(source), world = arena(withRune);
    expect(cast(world)).toBe(9);
    const branch = cloneWorld(world);
    branch.units[0].spec = { ...branch.units[0].spec, bonus: { ...branch.units[0].spec.bonus, attackSpeed: 0.35 } };
    through(world, 90); through(branch, 90);
    expect(pulseTicks(world)).toHaveLength(9);
    expect(pulseTicks(branch)).toHaveLength(9);
    for (const duel of [world, branch]) duel.units[0].cooldownReady.E = duel.tick;
    expect(cast(world)).toBe(9);
    expect(cast(branch)).toBe(10);
    expect(world.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(branch.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(source.bonus).toEqual({});
    expect(withRune.bonus).toEqual({});
  });

  it("keeps the no-shard budget allocation and applies the source-qualified count in actual fights", () => {
    const source = purchased(), foe = fighter(), withRune = sharded(source);
    const baseline = allocateBoth(source, foe, 1000, prices);
    const selected = allocateBoth(withRune, foe, 1000, prices);
    expect(selected).toEqual(baseline);
    expect(damagePerSecond(withRune, foe)).toEqual(damagePerSecond(source, foe));
    const bare = arena({ ...source, bonus: baseline[0].bonus });
    const actual = arena({ ...withRune, bonus: selected[0].bonus });
    expect(cast(actual)).toBe(cast(bare));
    expect(derive(actual.units[0]).attackSpeed).toBeGreaterThan(derive(bare.units[0]).attackSpeed);
  });
});
