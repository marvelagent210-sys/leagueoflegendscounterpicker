import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { KitHooks } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const charges = (world: World) => world.units[0].memory["rune:fleet-footwork:charges"];
const zeri = kit("Zeri").spec;

function arena(start: number, hooks?: KitHooks, enemyHooks?: KitHooks): World {
  const self = { ...zeri, base: { ...zeri.base, hpRegen: 0 },
    hooks: composeHooks(zeri.hooks, hooks ? [hooks] : [], [], false) };
  const { spec } = equipRuneEffects(self, [8021], catalog, rules, { energizedCharges: start });
  const enemy = fighter({ base: { hp: 10000, moveSpeed: 0, hpRegen: 0 }, hooks: enemyHooks });
  return createWorld({ fighters: [spec, enemy], distance: 300, hp: [.5, 1],
    modes: ["idle", "idle"], settings: { maxSeconds: 20 } });
}

function finishBurst(world: World, direction: 1 | -1 = 1): void {
  const q = zeri.abilities.find(a => a.key === "Q")!;
  startCast(world, world.units[0], q, { direction });
  for (let i = 0; i < 36; i++) step(world, [standStill, standStill]);
}

describe("Zeri's source-qualified Energized attacks", () => {
  it.each([0, 94, 100])("Living Battery zap leaves %s charges unspent and unaugmented", start => {
    const world = arena(start);
    startAttack(world, world.units[0]);
    for (let i = 0; i < 30; i++) step(world, [standStill, standStill]);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(charges(world)).toBe(start);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("gains once for a connected burst, even across seven damaging rounds", () => {
    const world = arena(0);
    finishBurst(world);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(charges(world)).toBe(6);
  });

  it.each([[100, 0, true], [94, 100, false]] as const)(
    "a single connecting round from %s leaves %s charges", (start, after, healed) => {
      const world = arena(start, { onAttackHit(ctx) { ctx.enemy.x += 5000; } });
      finishBurst(world);
      expect(charges(world)).toBe(after);
      expect(world.units[0].totals.healing > 0).toBe(healed);
    });

  it("consumes the pool filled by the opener only after another round connects", () => {
    const atFirst: unknown[] = [], world = arena(94, {
      onAttackHit(ctx) { atFirst.push(charges(ctx.world)); },
    });
    finishBurst(world);
    expect(atFirst).toEqual([100]);
    expect(charges(world)).toBe(0);
    expect(world.units[0].totals.healing).toBeCloseTo(rules.fleetFootwork.healBase * .6, 8);
  });

  it("preserves pending charges when later primary rounds are blocked", () => {
    const world = arena(94, { onAttackHit(ctx) {
      ctx.enemy.statuses.push({ kind: "state", key: "blockAttacks", source: ctx.enemy.side, value: 0,
        startTick: ctx.tick, endTick: ctx.tick + 60 });
    } });
    finishBurst(world);
    expect(charges(world)).toBe(100);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it.each([
    ["dodgeAttacks", 0, 6, false],
    ["dodgeAttacks", 94, 0, true],
    ["blockAttacks", 100, 0, true],
  ] as const)("handles %s on the opener from %s charges", (defense, start, after, healed) => {
    const world = arena(start, undefined, { onAttackAvoided(ctx) {
      ctx.self.statuses = ctx.self.statuses.filter(status => status.key !== defense);
    } });
    world.units[1].statuses.push({ kind: "state", key: defense, source: 1, value: 0, startTick: 0, endTick: 60 });
    finishBurst(world);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(charges(world)).toBe(after);
    expect(world.units[0].totals.healing > 0).toBe(healed);
  });

  it.each([[94, 100, false], [100, 0, true]] as const)(
    "a lethal opener from %s charges leaves %s charges", (start, after, healed) => {
      const world = arena(start);
      world.units[1].hp = 1;
      finishBurst(world);
      expect(world.units[1].alive).toBe(false);
      expect(charges(world)).toBe(after);
      expect(world.units[0].totals.healing > 0).toBe(healed);
    });

  it("gains nothing from a burst aimed away", () => {
    const world = arena(94);
    finishBurst(world, -1);
    expect(charges(world)).toBe(94);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it.each([94, 100])("does not count the collateral champion behind a piercing first pet contact at %s", start => {
    const world = arena(start), [self, enemy] = world.units;
    spawnPet(world, enemy, { kind: "summon", name: "Summon", hp: 5000, armor: 0, mr: 0, radius: 65, moveSpeed: 0, duration: 20 }, (self.x + enemy.x) / 2);
    self.memory["zeri:lightningEnd"] = 200;
    finishBurst(world);
    expect(enemy.totals.damageTaken).toBeGreaterThan(0);
    expect(charges(world)).toBe(start);
    expect(self.totals.healing).toBe(0);
  });
});
