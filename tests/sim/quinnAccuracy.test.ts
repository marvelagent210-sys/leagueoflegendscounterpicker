import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { context, kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const dummy = () => fighter({ base: { hp: 10000, armor: 0, mr: 0, hpRegen: 0 } });
const spell = (spec: FighterSpec, key: string) => {
  const found = spec.abilities.find((a) => a.key === key);
  if (!found) throw new Error(`${spec.id}: no ${key}`);
  return found;
};
const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};
const harrierDamage = (world: World) => {
  const innate = context("Quinn").ability("Harrier");
  return innate.levelValue("Quinn's basic attacks on-hit against Harrier targets are empowered to consume the mark") + 0.4 * (derive(world.units[0]).ad - world.units[0].spec.base.ad);
};

describe("Quinn's Harrier mark cooldowns", () => {
  it("an ability-applied mark permits Valor's next mark after one second when no cooldown is running", () => {
    const quinn = kit("Quinn").spec;
    const world = createWorld({ fighters: [quinn, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const q = spell(quinn, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    attackHit(world, self, enemy, false, []);
    advance(world, 28);
    const early = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - early).toBeCloseTo(derive(self).ad, 6);
    advance(world, 30);
    const ready = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - ready).toBeCloseTo(derive(self).ad + harrierDamage(world), 6);
  });

  it("an ability-applied mark does not replace or restart Valor's existing cooldown", () => {
    const quinn = kit("Quinn").spec;
    const world = createWorld({ fighters: [quinn, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    // The first passive mark starts Valor's seven-second cooldown when consumed.
    step(world, [idle, idle]);
    attackHit(world, self, enemy, false, []);
    const readyTick = world.tick + 210;
    advance(world, 60);
    const q = spell(quinn, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    attackHit(world, self, enemy, false, []);
    advance(world, readyTick - 2);
    const early = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - early).toBeCloseTo(derive(self).ad, 6);
    advance(world, readyTick);
    const ready = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - ready).toBeCloseTo(derive(self).ad + harrierDamage(world), 6);
  });

  it("an expired ability mark starts its one-second cooldown", () => {
    const quinn = kit("Quinn").spec;
    const world = createWorld({ fighters: [quinn, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const q = spell(quinn, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    advance(world, 148);
    const early = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - early).toBeCloseTo(derive(self).ad, 6);
    advance(world, 150);
    const ready = enemy.totals.damageTaken;
    attackHit(world, self, enemy, false, []);
    expect(enemy.totals.damageTaken - ready).toBeCloseTo(derive(self).ad + harrierDamage(world), 6);
  });
});

describe("Quinn's Vault completion and reset", () => {
  it.each([0, 400])("anchors the bounce and attack reset to first-dash completion from %i units", (distance) => {
    const quinn = kit("Quinn").spec;
    const world = createWorld({ fighters: [quinn, dummy()], distance, modes: ["idle", "idle"], settings: { log: true } });
    const self = world.units[0];
    startCast(world, self, spell(quinn, "E"));
    self.attackReadyTick = 1000;
    while (!world.log.some((e) => e.side === 0 && e.text.startsWith("Vault deals")) && world.tick < 30) step(world, [idle, idle]);
    const impact = world.log.find((e) => e.side === 0 && e.text.startsWith("Vault deals"))?.tick;
    expect(impact).toBeDefined();
    advance(world, (impact ?? 0) + 7);
    expect(self.attackReadyTick).toBe(1000);
    expect(world.log.some((e) => e.text === "Vault (bounce) fires")).toBe(false);
    advance(world, (impact ?? 0) + 9);
    const bounce = world.log.find((e) => e.text === "Vault (bounce) fires")?.tick;
    expect((bounce ?? 0) - (impact ?? 0)).toBeGreaterThanOrEqual(Math.ceil(0.25 * 30));
    expect((bounce ?? 0) - (impact ?? 0)).toBeLessThanOrEqual(0.5 * 30);
    expect(self.attackReadyTick).toBe(bounce);
  });

  it("uses the same delay when a spell shield denies the initial impact", () => {
    const quinn = kit("Quinn").spec;
    const world = createWorld({ fighters: [quinn, dummy()], distance: 400, modes: ["idle", "idle"], settings: { log: true } });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    startCast(world, self, spell(quinn, "E"));
    self.attackReadyTick = 1000;
    advance(world, 40);
    const impact = world.log.find((e) => e.text === "spell shield blocks Vault")?.tick;
    const bounce = world.log.find((e) => e.text === "Vault (bounce) fires")?.tick;
    expect(impact).toBeDefined();
    expect(bounce).toBeDefined();
    expect((bounce ?? 0) - (impact ?? 0)).toBeGreaterThanOrEqual(Math.ceil(0.25 * 30));
    expect((bounce ?? 0) - (impact ?? 0)).toBeLessThanOrEqual(0.5 * 30);
    expect(self.attackReadyTick).toBe(bounce);
  });

  it("interrupts Garen's already-declared uncancellable Q windup", () => {
    const quinn = kit("Quinn").spec;
    const garen = kit("Garen").spec;
    const world = createWorld({ fighters: [quinn, garen], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    const [self, enemy] = world.units;
    startCast(world, enemy, spell(garen, "Q"));
    startAttack(world, enemy);
    expect(enemy.action?.kind).toBe("windup");
    const vault = spell(quinn, "E");
    abilityHit(world, self, enemy, vault, vault.onHit ?? []);
    expect(enemy.action).toBeUndefined();
    advance(world, 30);
    expect(self.totals.damageTaken).toBe(0);
    expect(world.log.some((e) => e.side === 1 && e.text.includes("attack windup interrupted"))).toBe(true);
  });
});
