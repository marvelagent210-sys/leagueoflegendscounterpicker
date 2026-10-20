import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import type { StatPrices } from "../../engine/budget";
import { canCast, canStartAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyCC, applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { createWorld, fight, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import vladimir from "../../kits/champions/Vladimir";
import cassiopeia from "../../kits/champions/Cassiopeia";
import { championData, kit, records } from "./helpers";
import { fighter } from "../sim/kits";

const modules = { Vladimir: vladimir, Cassiopeia: cassiopeia };
const compile = (id: keyof typeof modules) => compileKit(championData(id), records(id), modules[id]);
const idle = () => undefined;
const makeWorld = (id: keyof typeof modules, options: { bonus?: BonusStats; hp?: number; distance?: number; mr?: number; targetHP?: number } = {}) => {
  const compiled = compile(id);
  const spec: FighterSpec = { ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resource: 3000, resourceRegen: 0 }, bonus: options.bonus };
  const target = fighter({ id: "target", base: { hp: options.targetHP ?? 10000, mr: options.mr ?? 0, armor: 0, hpRegen: 0, resourceRegen: 0 } });
  return createWorld({ fighters: [spec, target], distance: options.distance ?? 100, hp: [options.hp ?? 0.5, 1], modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, maxBranches: 1, reactionTime: 100, environment: { walls: false, minions: false, brush: false, laneSetup: false, wallDistance: 300 } } });
};
const ability = (world: World, key: string) => world.units[0].spec.abilities.find((candidate) => candidate.key === key)!;
const tickUntil = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, [idle, idle]); };
const hit = (world: World, key: string) => { const a = ability(world, key); abilityHit(world, world.units[0], world.units[1], a, a.onHit ?? []); };
const pulse = (world: World) => world.units[0].spec.hooks!.onTick!(hookContext(world, world.units[0]));
const protectedTarget = (world: World, state: "spellShield" | "parry" | "untargetable", seconds = 10) => applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: seconds, ...(state === "spellShield" ? { charges: 1 } : {}) }, { scale: 1 });
const tagPoison = (world: World, seconds = 3.25) => applyEffect(world, world.units[0], world.units[1], { type: "mark", key: "cassiopeia:poison", duration: seconds }, { scale: 1 });

describe("Vladimir's pinned passive and Transfusion", () => {
  it("reads all five pinned revisions and seals every numeric read", () => {
    const manifest = JSON.parse(readFileSync(new URL("../../data/16.20/wiki-revisions.json", import.meta.url), "utf8"));
    for (const id of ["Vladimir", "Cassiopeia"] as const) {
      const built = compile(id);
      expect(new Set(built.evidence.map((entry) => entry.ability)).size).toBe(5);
      for (const entry of built.evidence) expect(manifest[entry.page]).toBe(entry.revid);
      const world = makeWorld(id);
      pulse(world);
      expect(() => built.spec.budget?.damage?.(world.units[0], world.units[1])).not.toThrow();
      expect(() => built.spec.budget?.healing?.(world.units[0], world.units[1])).not.toThrow();
    }
  });

  it("converts only external AP and HP, without recursive gains", () => {
    const world = makeWorld("Vladimir", { bonus: { ap: 100, hp: 1000 }, hp: 1 });
    const self = world.units[0], d = derive(self);
    expect(d.ap).toBeCloseTo(133.33, 10);
    expect(d.maxHp).toBeCloseTo(self.spec.base.hp + 1000 + 160, 10);
    expect(self.hp).toBe(d.maxHp);
  });

  it("dynamic AP gives max-health without healing, and losing it caps current HP", () => {
    const world = makeWorld("Vladimir", { hp: 1 });
    const self = world.units[0], initial = self.hp;
    applyEffect(world, self, self, { type: "stat", stat: "AP", amount: { base: 100 }, duration: 0.1 }, { scale: 1 });
    expect(derive(self).maxHp).toBe(initial + 160);
    expect(self.hp).toBe(initial);
    self.hp = initial + 100;
    tickUntil(world, 4);
    expect(self.hp).toBe(initial);
  });

  it("normal Q deals 160+.60AP and heals40+.35AP exactly at cast completion", () => {
    const world = makeWorld("Vladimir", { bonus: { ap: 100 } });
    const [self, target] = world.units, before = self.hp;
    startCast(world, self, ability(world, "Q"));
    tickUntil(world, 8);
    expect(self.hp).toBe(before);
    expect(target.totals.damageTaken).toBe(0);
    tickUntil(world, 9);
    expect(target.totals.damageTaken).toBe(220);
    expect(self.hp - before).toBe(75);
    expect(world.missiles).toHaveLength(0);
  });

  it("empowered Q includes the level20 additional220 and missing-health/AP product", () => {
    const world = makeWorld("Vladimir", { bonus: { ap: 100 } });
    const [self, target] = world.units, before = self.hp, missing = derive(self).maxHp - before;
    self.memory.rushRemaining = 75;
    startCast(world, self, ability(world, "Q"));
    expect(self.memory.rushRemaining).toBe(0);
    tickUntil(world, 9);
    expect(target.totals.damageTaken).toBe(407);
    expect(self.hp - before).toBeCloseTo(75 + 220 + 0.09 * missing, 9);
  });

  it("Grievous Wounds reduces both normal and additional heals", () => {
    const world = makeWorld("Vladimir", { bonus: { ap: 100 } });
    const self = world.units[0], before = self.hp, missing = derive(self).maxHp - before;
    applyEffect(world, world.units[1], self, { type: "grievousWounds", duration: 5 }, { scale: 1 });
    self.memory.rushRemaining = 75;
    startCast(world, self, ability(world, "Q")); tickUntil(world, 9);
    expect(self.hp - before).toBeCloseTo((75 + 220 + 0.09 * missing) * 0.6, 9);
  });

  it.each(["untargetable", "invisible"] as const)("Q survives target %s and heals without its damage", (state) => {
    const world = makeWorld("Vladimir"), self = world.units[0], before = self.hp;
    startCast(world, self, ability(world, "Q"));
    applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 5 }, { scale: 1 });
    expect(self.action?.kind).toBe("cast");
    tickUntil(world, 9);
    expect(self.hp - before).toBe(40);
    expect(world.units[1].totals.damageTaken).toBe(state === "untargetable" ? 0 : 160);
    expect(self.cooldownReady.Q).toBe(146);
  });

  it("Q retains declared target across range exit", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "Q")); world.units[1].x = 2000;
    tickUntil(world, 9);
    expect(world.units[1].totals.damageTaken).toBe(160);
    expect(self.totals.healing).toBe(40);
  });

  it("spell shield denies Q damage while its independently modeled completion heal remains", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    protectedTarget(world, "spellShield");
    startCast(world, self, ability(world, "Q")); tickUntil(world, 9);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(self.totals.healing).toBe(40);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
  });

  it("generates Rush over two actual cooldowns, retaining the first point indefinitely", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "Q")); tickUntil(world, 147);
    expect(self.memory.rushStacks).toBe(1);
    tickUntil(world, 300);
    expect(self.memory.rushStacks).toBe(1);
    startCast(world, self, ability(world, "Q")); tickUntil(world, 447);
    expect(Number(self.memory.rushRemaining)).toBeGreaterThan(0);
    expect(self.memory.rushStacks).toBe(0);
  });

  it("resets the empowered cast to an empty Rush cycle, giving one empowerment per three casts", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    expect(self.resource).toBe(0);
    const empowered: boolean[] = [];
    for (let cast = 0; cast < 6; cast++) {
      startCast(world, self, ability(world, "Q"));
      empowered.push(Boolean(self.memory.qEmpowered));
      tickUntil(world, (self.action?.kind === "cast" ? self.action.endTick : world.tick) + 1);
      tickUntil(world, self.cooldownReady.Q! + 1);
    }
    expect(empowered).toEqual([false, false, true, false, false, true]);
  });

  it.each(["pool", "charge", "stasis"])("Rush uses quarter-speed depletion during %s", (state) => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    self.memory.rushRemaining = 75; self.memory.rushStart = 0;
    if (state === "pool") self.memory.poolUntil = 100;
    if (state === "charge") { self.memory.bloodChargeStart = 0; self.memory.bloodNextCost = 4; self.action = { kind: "channel", ability: "E", startTick: 0, endTick: 45, intervalTicks: Infinity, nextTick: Infinity }; }
    if (state === "stasis") applyEffect(world, self, self, { type: "state", state: "stasis", duration: 5 }, { scale: 1 });
    pulse(world);
    expect(self.memory.rushRemaining).toBe(74.75);
  });

  it("W and R overlay Q without changing its completion, then Pool forbids new abilities", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "Q"));
    startCast(world, self, ability(world, "R"));
    startCast(world, self, ability(world, "W"));
    expect(self.action).toMatchObject({ kind: "cast", ability: "Q", endTick: 8 });
    expect(canCast(world, self, ability(world, "E"))).toBe(false);
    expect(canCast(world, self, ability(world, "R"))).toBe(false);
    tickUntil(world, 9);
    expect(world.log.some((entry) => entry.text.startsWith("Transfusion deals"))).toBe(true);
  });
});

describe("Sanguine Pool, Tides of Blood and Hemoplague", () => {
  it("Pool spends15% currentHP and emits exactly four raw-healing packets", () => {
    const world = makeWorld("Vladimir", { mr: 100 }), self = world.units[0], before = self.hp;
    startCast(world, self, ability(world, "W"));
    expect(before - self.hp).toBeCloseTo(before * 0.15 - 75 * 0.3, 9);
    tickUntil(world, 61);
    expect(world.units[1].totals.damageTaken).toBe(150);
    expect(self.totals.healing).toBe(90);
    expect(world.log.filter((entry) => entry.text.startsWith("Sanguine Pool deals"))).toHaveLength(4);
    expect(hasState(self, "untargetable")).toBe(false);
  });

  it("Pool heals raw damage despite normal shields, permits movement but denies basic attacks", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 1000 }, duration: 5 }, { scale: 1 });
    startCast(world, self, ability(world, "W"));
    expect(world.units[1].totals.absorbed).toBe(75);
    expect(self.totals.healing).toBe(22.5);
    expect(canStartAttack(world, self)).toBe(false);
    step(world, [() => ({ kind: "move", direction: -1 }), idle]);
    expect(self.x).toBeLessThan(0);
  });

  it("Pool slow is removed immediately on range exit and an attached DOT can still damage Vlad", () => {
    const world = makeWorld("Vladimir"), [self, target] = world.units;
    startCast(world, self, ability(world, "W")); pulse(world);
    expect(target.statuses.some((status) => status.ability === "WP" && status.key === "slow")).toBe(true);
    target.x = 1000; pulse(world);
    expect(target.statuses.some((status) => status.ability === "WP" && status.key === "slow")).toBe(false);
    const before = self.hp;
    dealDamage(world, target, self, 100, "true", { persistent: true });
    expect(before - self.hp).toBe(100);
  });

  it("charge spends2% at0/.25/.5/.75 seconds, not cumulative2+4+6+8", () => {
    const world = makeWorld("Vladimir", { hp: 1 }), self = world.units[0], max = derive(self).maxHp;
    startCast(world, self, ability(world, "E"));
    expect(self.hp).toBeCloseTo(max * 0.98, 9);
    tickUntil(world, 24);
    expect(self.hp).toBeCloseTo(max * 0.92, 9);
  });

  it.each([[0.11, 0.11], [0.12, 0.10], [0.13, 0.11]] as const)("E at %s maxHP stops later cost ticks below12%", (hp, remaining) => {
    const world = makeWorld("Vladimir", { hp }), self = world.units[0], max = derive(self).maxHp;
    startCast(world, self, ability(world, "E")); tickUntil(world, 24);
    expect(self.hp / max).toBeCloseTo(remaining, 9);
  });

  it.each([0, 8, 23, 30, 45])("E release at tick%d uses bounded charge scaling", (at) => {
    const world = makeWorld("Vladimir"), self = world.units[0], target = world.units[1];
    startCast(world, self, ability(world, "E"));
    tickUntil(world, at);
    if (self.memory.bloodChargeStart !== undefined) startCast(world, self, ability(world, "E2"));
    const share = Math.min(1, at / 30), d = derive(self);
    const expected = 90 + 90 * share + d.maxHp * (0.015 + 0.045 * share) + d.ap * (0.35 + 0.45 * share);
    tickUntil(world, Math.max(at + 5, 50));
    expect(target.totals.damageTaken).toBeCloseTo(expected, 8);
    expect(world.log.some((entry) => entry.text.startsWith("inflicts slow"))).toBe(at >= 30);
  });

  it.each(["stun", "silence", "airborne"] as const)("%s interrupts charge by releasing rather than deleting its damage", (cc) => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "E")); tickUntil(world, 15);
    applyCC(world, world.units[1], self, cc, 1);
    expect(world.missiles.some((missile) => missile.source === "E2")).toBe(true);
    expect(self.memory.bloodChargeStart).toBeUndefined();
    tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
  });

  it("root does not interrupt the non-movement charge, and W preserves its clock/recast", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "E"));
    applyCC(world, world.units[1], self, "root", 0.2);
    expect(self.action?.kind).toBe("channel");
    tickUntil(world, 8);
    startCast(world, self, ability(world, "W"));
    expect(self.action).toMatchObject({ kind: "channel", ability: "E", endTick: 45 });
    expect(canCast(world, self, ability(world, "E2"))).toBe(true);
    startCast(world, self, ability(world, "E2"));
    expect(world.missiles.some((missile) => missile.source === "E2")).toBe(true);
  });

  it("E's late self-slow multiplies active movement bonuses and disappears on release", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    applyEffect(world, self, self, { type: "stat", stat: "moveSpeedPercent", amount: { base: 0.4 }, duration: 5 }, { scale: 1 });
    startCast(world, self, ability(world, "E")); tickUntil(world, 32);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(330 * 1.4 * 0.8, 9);
    startCast(world, self, ability(world, "E2"));
    expect(derive(self).rawMoveSpeed).toBeCloseTo(330 * 1.4, 9);
  });

  it("projectile walls block blood release", () => {
    const world = makeWorld("Vladimir", { distance: 400 }), self = world.units[0];
    startCast(world, self, ability(world, "E")); startCast(world, self, ability(world, "E2"));
    world.zones.push({ id: 99, kind: "projectileWall", owner: 1, x: 100, radius: 0, startTick: 0, seenTick: 0, endTick: 100 });
    tickUntil(world, 10);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("Hemoplague amplifiesphysical/magic10%, true0%, includes its own burst, then heals0.4slater", () => {
    const world = makeWorld("Vladimir"), [self, target] = world.units;
    hit(world, "R");
    dealDamage(world, self, target, 100, "physical");
    dealDamage(world, self, target, 100, "magic");
    dealDamage(world, self, target, 100, "true");
    expect(target.totals.damageTaken).toBeCloseTo(320, 9);
    tickUntil(world, 120);
    expect(target.totals.damageTaken).toBeCloseTo(320, 9);
    tickUntil(world, 121);
    expect(target.totals.damageTaken).toBeCloseTo(705, 9);
    expect(self.totals.healing).toBe(0);
    tickUntil(world, 133);
    expect(self.totals.healing).toBe(350);
    dealDamage(world, self, target, 100, "magic");
    expect(target.totals.damageTaken).toBeCloseTo(805, 9);
  });

  it("shield at infection blocks it, while a late spell shield does not block detonation", () => {
    const blocked = makeWorld("Vladimir"); protectedTarget(blocked, "spellShield"); hit(blocked, "R"); tickUntil(blocked, 140);
    expect(blocked.units[1].totals.damageTaken).toBe(0);
    expect(blocked.units[0].totals.healing).toBe(0);
    const late = makeWorld("Vladimir"); hit(late, "R"); protectedTarget(late, "spellShield"); tickUntil(late, 133);
    expect(late.units[1].totals.damageTaken).toBeCloseTo(385, 9);
    expect(hasState(late.units[1], "spellShield")).toBe(true);
  });

  it("late untargetability guards burst but leaves the explicit living-infected heal policy", () => {
    const world = makeWorld("Vladimir"); hit(world, "R"); protectedTarget(world, "untargetable"); tickUntil(world, 133);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].totals.healing).toBe(350);
  });
});

describe("Cassiopeia's current movement and poison", () => {
  it("retains base335 and amplifies externalflat/percentage bonuses before slow/softcaps", () => {
    const world = makeWorld("Cassiopeia"), self = world.units[0];
    expect(derive(self).moveSpeed).toBe(335);
    applyEffect(world, self, self, { type: "stat", stat: "moveSpeedFlat", amount: { base: 20 }, duration: 5 }, { scale: 1 });
    expect(derive(self).rawMoveSpeed).toBeCloseTo(335 + 20 * 1.396470588235294, 9);
    applyEffect(world, self, self, { type: "stat", stat: "moveSpeedPercent", amount: { base: 0.1 }, duration: 5 }, { scale: 1 });
    const raw = (335 + 20 * 1.396470588235294) * (1 + 0.1 * 1.396470588235294);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(raw, 9);
    applyCC(world, world.units[1], self, "slow", 5, 0.5);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(raw * 0.5, 9);
  });

  it("Q detonatesafter0.25cast+.4delay, sevenabsoluteinteger packets total205", () => {
    const world = makeWorld("Cassiopeia");
    startCast(world, world.units[0], ability(world, "Q")); tickUntil(world, 20);
    expect(world.units[1].statuses.some((status) => status.key.startsWith("cassiopeia:poison"))).toBe(false);
    tickUntil(world, 21);
    const schedule = world.scheduled.filter((entry) => entry.ability === "QP");
    expect(schedule.map((entry) => entry.tick)).toEqual([33, 46, 59, 72, 85, 98, 110]);
    expect(schedule.map((entry) => entry.effects[0]!.type === "damage" ? entry.effects[0]!.amount.base : 0)).toEqual([29, 29, 29, 30, 29, 29, 30]);
    tickUntil(world, 111);
    expect(world.units[1].totals.damageTaken).toBe(205);
  });

  it("Q floorsfractional total and refresh replaces future pulses", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 1 } });
    hit(world, "Q"); tickUntil(world, 14);
    const first = world.units[1].totals.damageTaken;
    hit(world, "Q");
    expect(world.scheduled.filter((entry) => entry.ability === "QP")).toHaveLength(7);
    tickUntil(world, 105);
    expect(world.units[1].totals.damageTaken).toBe(first + 205);
  });

  it("Q reward uses amplified50% bonus, linear decay and no shielded reward", () => {
    const world = makeWorld("Cassiopeia"); hit(world, "Q");
    expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(335 * (1 + 0.5 * 1.396470588235294), 9);
    world.tick = 45; pulse(world);
    expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(335 * (1 + 0.25 * 1.396470588235294), 9);
    const shielded = makeWorld("Cassiopeia"); protectedTarget(shielded, "spellShield"); hit(shielded, "Q");
    expect(derive(shielded.units[0]).moveSpeed).toBe(335);
    expect(shielded.scheduled).toHaveLength(0);
  });

  it("Miasma lands aftertravel, emits19packets nottooltip20 and usesfieldage slow", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 }, distance: 400 });
    startCast(world, world.units[0], ability(world, "W"));
    tickUntil(world, 14);
    expect(world.units[1].totals.damageTaken).toBe(0);
    tickUntil(world, 15);
    const zone = world.zones.find((candidate) => candidate.ability === "W" && candidate.kind === "field")!;
    expect(zone.startTick).toBe(14);
    tickUntil(world, 165);
    expect(world.units[1].totals.damageTaken).toBe(237.5);
    expect(world.log.filter((entry) => entry.text.startsWith("Miasma deals"))).toHaveLength(19);
  });

  it("Miasma sticky ground survivesnormalcleanse but immunitycleanse removes it", () => {
    const world = makeWorld("Cassiopeia"); startCast(world, world.units[0], ability(world, "W")); tickUntil(world, 15);
    const target = world.units[1];
    expect(target.statuses.some((status) => status.key === "ground" && status.sticky)).toBe(true);
    applyEffect(world, target, target, { type: "cleanse" }, { scale: 1 });
    expect(target.statuses.some((status) => status.key === "ground")).toBe(true);
    applyEffect(world, target, target, { type: "cleanse", sticky: true }, { scale: 1 });
    applyEffect(world, target, target, { type: "state", state: "ccImmune", duration: 3 }, { scale: 1 });
    tickUntil(world, 30);
    expect(target.statuses.some((status) => status.key === "ground")).toBe(false);
  });

  it("Miasma refreshesexisting ground0.25s duringuntargetability and wall removeslandingportion", () => {
    const world = makeWorld("Cassiopeia"); startCast(world, world.units[0], ability(world, "W")); tickUntil(world, 15);
    protectedTarget(world, "untargetable"); pulse(world);
    expect(world.units[1].statuses.find((status) => status.key === "ground")!.endTick).toBe(world.tick + 8);
    const blocked = makeWorld("Cassiopeia", { distance: 400 });
    blocked.zones.push({ id: 99, kind: "projectileWall", owner: 1, x: 100, radius: 0, startTick: 0, seenTick: 0, endTick: 100 });
    startCast(blocked, blocked.units[0], ability(blocked, "W")); tickUntil(blocked, 30);
    expect(blocked.zones.some((zone) => zone.ability === "W")).toBe(false);
    expect(blocked.units[1].totals.damageTaken).toBe(0);
  });

  it("Miasma producesitsfield evenwhen initial target isoutside oruntargetable", () => {
    const world = makeWorld("Cassiopeia"); startCast(world, world.units[0], ability(world, "W"));
    protectedTarget(world, "untargetable"); tickUntil(world, 15);
    expect(world.zones.some((zone) => zone.ability === "W" && zone.kind === "field")).toBe(true);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("Miasma's aged slow survives exit/re-entry without restarting its decay", () => {
    const world = makeWorld("Cassiopeia"); startCast(world, world.units[0], ability(world, "W")); tickUntil(world, 15);
    const zone = world.zones.find((candidate) => candidate.ability === "W")!, target = world.units[1];
    target.x = zone.x + 1000; tickUntil(world, 90);
    expect(target.statuses.some((status) => status.key === "ground")).toBe(false);
    target.x = zone.x;
    pulse(world);
    expect(target.statuses.find((status) => status.key === "slow")!.value).toBeCloseTo(0.8 * (1 - (world.tick - zone.startTick) / 150), 9);
    expect(target.statuses.find((status) => status.key === "slow")!.value).toBeLessThan(0.4);
  });

  it("brief Miasma contact does not shorten independent Q poison eligibility", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 } }); hit(world, "Q");
    startCast(world, world.units[0], ability(world, "W")); tickUntil(world, 15);
    world.units[1].x = 1000;
    tickUntil(world, 40);
    const before = world.units[1].totals.damageTaken;
    world.units[1].x = 230;
    hit(world, "E");
    expect(world.units[1].totals.damageTaken - before).toBeCloseTo(313.235294117647, 9);
  });
});

describe("Twin Fang and Petrifying Gaze", () => {
  it("E unpoisoned128.235+.20AP versuspoisoned248.235+.65AP/AP-onlyheal", () => {
    for (const poison of [false, true]) {
      const world = makeWorld("Cassiopeia", { bonus: { ap: 100 } });
      if (poison) tagPoison(world);
      hit(world, "E");
      expect(world.units[1].totals.damageTaken).toBeCloseTo(poison ? 313.235294117647 : 148.235294117647, 9);
      expect(world.units[0].totals.healing).toBe(poison ? 16 : 0);
    }
  });

  it("arbitraryburn DOT doesnotqualify and poison expiry duringflight usesimpactstate", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 }, distance: 500 });
    tagPoison(world, 0.1);
    applyEffect(world, world.units[0], world.units[1], { type: "dot", damageType: "magic", total: { base: 0 }, duration: 5, interval: 1, label: "burn" }, { scale: 1 });
    startCast(world, world.units[0], ability(world, "E")); tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(148.235294117647, 9);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("poison acquiredaftercast grantsenhancement and ordinaryshields still grantheal", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 }, distance: 500 });
    startCast(world, world.units[0], ability(world, "E")); tickUntil(world, 5); tagPoison(world);
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 1000 }, duration: 5 }, { scale: 1 });
    tickUntil(world, 20);
    expect(world.units[1].totals.absorbed).toBeCloseTo(313.235294117647, 9);
    expect(world.units[0].totals.healing).toBe(16);
  });

  it("E waitsattarget forpendingQ then uses newlyappliedpoison", () => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 } });
    world.zones.push({ id: 77, owner: 0, kind: "delayedArea", seenTick: 0, x: world.units[1].x, radius: 200, startTick: 0, endTick: 20, ability: "Q", onHit: ability(world, "Q").onHit, connects: true, scale: 1 });
    startCast(world, world.units[0], ability(world, "E")); tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.missiles.find((missile) => missile.source === "E")!.perTick).toBe(0);
    tickUntil(world, 22);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(313.235294117647, 9);
    expect(world.units[0].totals.healing).toBe(16);
  });

  it("spellshield deniesEheal andkillrefund while connected lethal hit refunds exactly45mana", () => {
    const shielded = makeWorld("Cassiopeia", { bonus: { ap: 100 } }); tagPoison(shielded); protectedTarget(shielded, "spellShield");
    startCast(shielded, shielded.units[0], ability(shielded, "E")); tickUntil(shielded, 15);
    expect(shielded.units[0].totals.healing).toBe(0);
    expect(shielded.units[0].resource).toBe(2955);
    const killed = makeWorld("Cassiopeia", { targetHP: 100 });
    startCast(killed, killed.units[0], ability(killed, "E")); tickUntil(killed, 15);
    expect(killed.units[0].resource).toBe(3000);
  });

  it.each(["untargetable", "invisible", "range"] as const)("E cancelslosttarget(%s) withoutcost/CD and hastrue700center range", (lost) => {
    const world = makeWorld("Cassiopeia"), self = world.units[0];
    world.units[1].x = 701;
    expect(canCast(world, self, ability(world, "E"))).toBe(false);
    world.units[1].x = 700;
    expect(canCast(world, self, ability(world, "E"))).toBe(true);
    startCast(world, self, ability(world, "E"));
    if (lost === "range") world.units[1].x = 701;
    else applyEffect(world, world.units[1], world.units[1], { type: "state", state: lost, duration: 5 }, { scale: 1 });
    tickUntil(world, 10);
    expect(self.resource).toBe(3000);
    expect(self.cooldownReady.E ?? 0).toBe(0);
  });

  it.each([[true, "stun"], [false, "slow"]] as const)("R targetfacing%s chooses%s while retaining325+.75APdamage", (faces, cc) => {
    const world = makeWorld("Cassiopeia", { bonus: { ap: 100 } });
    world.units[1].facing = faces ? -1 : 1;
    hit(world, "R");
    expect(world.units[1].totals.damageTaken).toBe(400);
    expect(world.units[1].statuses.find((status) => status.kind === "cc")!.key).toBe(cc);
  });

  it("R usescastcompletionposition/facing, ignoresbackwardsand preservesdamageagainstslowimmune", () => {
    const world = makeWorld("Cassiopeia"); startCast(world, world.units[0], ability(world, "R"));
    world.units[0].x = 50; world.units[1].facing = 1;
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "slowImmune", duration: 5 }, { scale: 1 });
    tickUntil(world, 16);
    expect(world.units[1].totals.damageTaken).toBe(325);
    expect(world.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
    const back = makeWorld("Cassiopeia"); back.units[0].facing = -1; hit(back, "R");
    expect(back.units[1].totals.damageTaken).toBe(0);
  });

  it.each([[-165.001, false], [-165, true], [-80, true], [915, true], [915.001, false]] as const)("R's rear-offset cone at center %s preserves the exact axial hitbox boundary", (x, connects) => {
    const world = makeWorld("Cassiopeia"), target = world.units[1];
    target.x = x;
    target.facing = -1;
    hit(world, "R");
    expect(target.totals.damageTaken).toBe(connects ? 325 : 0);
    expect(target.statuses.some((status) => status.key === "stun")).toBe(connects);
  });

  it.each([[-1, "stun"], [1, "slow"]] as const)("a target crossing into R's rear overlap uses retained cast-facing and target-facing %s", (facing, control) => {
    const world = makeWorld("Cassiopeia"), [self, target] = world.units;
    startCast(world, self, ability(world, "R"));
    expect(self.facing).toBe(1);
    target.x = -80;
    target.facing = facing;
    tickUntil(world, 16);
    expect(self.facing).toBe(1);
    expect(target.totals.damageTaken).toBe(325);
    expect(target.statuses.find((status) => status.kind === "cc")!.key).toBe(control);
  });

  it("R spellshieldnegatesthepacket and BlackShieldbreakkeepsCCprotection", () => {
    const shielded = makeWorld("Cassiopeia"); protectedTarget(shielded, "spellShield"); hit(shielded, "R");
    expect(shielded.units[1].totals.damageTaken).toBe(0);
    expect(shielded.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
    const black = makeWorld("Cassiopeia");
    applyEffect(black, black.units[1], black.units[1], { type: "shield", amount: { base: 50 }, duration: 5, shieldType: "magic", blackShield: true }, { scale: 1 });
    hit(black, "R");
    expect(black.units[1].totals.damageTaken).toBe(275);
    expect(black.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
  });

  it("branchcopieskeepindependent poisonpulses and Rush/charge clocks", () => {
    const world = makeWorld("Cassiopeia"); hit(world, "Q");
    const copy = cloneWorld(world); tickUntil(copy, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(copy.units[1].totals.damageTaken).toBe(29);
    const blood = makeWorld("Vladimir"); startCast(blood, blood.units[0], ability(blood, "E"));
    const bloodCopy = cloneWorld(blood); startCast(bloodCopy, bloodCopy.units[0], ability(bloodCopy, "E2"));
    expect(blood.units[0].memory.bloodChargeStart).toBe(0);
    expect(bloodCopy.units[0].memory.bloodChargeStart).toBeUndefined();
  });
});

describe("normal behavior and reflection", () => {
  it.each(["Vladimir", "Cassiopeia"] as const)("%s keeps the shared trade clock running while selecting its own combo", (id) => {
    const world = makeWorld(id), self = world.units[0];
    world.modes[0] = "trade";
    const first = self.spec.behavior!(perceive(world, 0));
    expect(first?.kind).toBe("cast");
    expect(self.memory.tradeStart).toBe(0);
    world.tick = 121;
    const afterDeadline = self.spec.behavior!(perceive(world, 0));
    expect(self.memory.tradeDone).toBe(true);
    expect(afterDeadline).toEqual({ kind: "move", direction: -1 });
  });

  it.each(["Vladimir", "Cassiopeia"] as const)("%s retreats after a completed trade despite ready offensive skills", (id) => {
    const world = makeWorld(id), self = world.units[0];
    world.modes[0] = "trade";
    self.memory.tradeDone = true;
    if (id === "Cassiopeia") tagPoison(world);
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });

  it("Vladimir can finish his existing charge after the trade ends, then retreats", () => {
    const world = makeWorld("Vladimir"), self = world.units[0];
    startCast(world, self, ability(world, "E")); tickUntil(world, 30);
    world.modes[0] = "trade"; self.memory.tradeDone = true;
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "E2" });
    startCast(world, self, ability(world, "E2"));
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });

  it("a completed trade still permits Vladimir's existing defensive Pool reaction", () => {
    const world = makeWorld("Vladimir"), [self, target] = world.units;
    const pressure: AbilitySpec = { key: "P", name: "Noticed burst", slot: "Q", cooldown: 1, castTime: 1, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 1500 } }] };
    target.spec = { ...target.spec, abilities: [pressure] };
    startCast(world, target, pressure);
    world.tick = 10; world.settings.reactionTime = 0.25;
    world.modes[0] = "trade"; self.memory.tradeDone = true;
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "W" });
  });

  it.each(["W", "E"])("Vladimir's hold mode does not pursue while %s is active", (key) => {
    const world = makeWorld("Vladimir", { distance: 800 }), self = world.units[0];
    startCast(world, self, ability(world, key));
    world.modes[0] = "hold";
    expect(self.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: 0 });
  });

  it.each(["Vladimir", "Cassiopeia"] as const)("%s's ordinary AI casts allfouractualskills and finite damage", (id) => {
    const built = compile(id).spec;
    const target = fighter({ id: "durableTarget", base: { hp: 30000, armor: 100, mr: 100, hpRegen: 0 }, attack: { range: 100, ranged: false, projectile: false }, abilities: [{ key: "P", name: "pressure", slot: "Q", castTime: 0.5, cooldown: 5, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 1500 } }] }] });
    const result = fight({ fighters: [{ ...built, bonus: { ap: 200, hp: 1000 } }, target], distance: 200, modes: ["fight", "fight"], settings: { maxSeconds: 20, maxBranches: 1, log: true, reactionTime: 0.25 } });
    expect(result.seconds).toBeGreaterThan(0);
    expect(Number.isFinite(result.damage[0])).toBe(true);
    const names = records(id).filter((record) => record.kind !== "I").map((record) => record.name);
    for (const name of names) expect(result.timeline.some((entry) => entry.side === 0 && entry.text === `casts ${name}`), name).toBe(true);
  });

  it.each(["Vladimir", "Cassiopeia"] as const)("%s preserves15,000gold allocations and allsixscores onside swap", (id) => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const built = compile(id).spec, darius = kit("Darius").spec;
    const forward = simulateMatchup(built, darius, 15000, prices);
    const reverse = simulateMatchup(darius, built, 15000, prices);
    expect(forward.builds[0]).toEqual(reverse.builds[1]);
    expect(forward.builds[1]).toEqual(reverse.builds[0]);
    const counterpart = { youEngage: "enemyEngages", enemyEngages: "youEngage", brawl: "brawl", shortTrade: "shortTrade", spacing: "spacing", escape: "escape" } as const;
    for (const scenario of forward.scenarios) {
      const swapped = reverse.scenarios.find((entry) => entry.id === counterpart[scenario.id])!;
      expect(Math.abs((scenario.score ?? 0) + (swapped.score ?? 0)), scenario.id).toBeLessThan(1e-12);
    }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
