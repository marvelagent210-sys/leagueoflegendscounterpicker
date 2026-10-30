import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { applyCC, beginDeathDefied, beginResurrection, canSee } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { advancePets, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld, step } from "../../engine/sim/simulate";
import type { PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Status } from "../../engine/sim/state";
import { idle } from "./helpers";
import { ability, fighter } from "./kits";

const status = (key: string, value: number): Status => ({ kind: "stat", key, value, source: 0, startTick: 0, endTick: 60 });
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 1 };
const world = () => createWorld({ fighters: [fighter(), fighter()], distance: 100, modes: ["idle", "idle"] });

describe("batch9 shared combat contracts", () => {
  it("multiplies independent total movement bonuses before slows and soft caps", () => {
    const w = world(), self = w.units[0];
    self.statuses = [status("moveSpeedPercent", .2), status("moveSpeedMultiplier", .4), status("moveSpeedMultiplier", .1), { ...status("slow", .25), kind: "cc" }];
    const raw = 350 * 1.2 * 1.4 * 1.1 * .75;
    expect(derive(self).rawMoveSpeed).toBeCloseTo(raw, 12);
    expect(derive(self).moveSpeed).toBeCloseTo(raw * .8 + 83, 12);
    self.statuses[1]!.value = .5;
    expect(derive(self).rawMoveSpeed).toBeCloseTo(350 * 1.2 * 1.5 * 1.1 * .75, 12);
  });

  it("respects positive bonus effectiveness for independent total movement bonuses", () => {
    const w = world(), self = w.units[0];
    self.spec = { ...self.spec, statConversions: { moveSpeedBonusEffectiveness: .5 } };
    self.statuses = [status("moveSpeedPercent", .2), status("moveSpeedMultiplier", .4), status("moveSpeedMultiplier", -.1)];
    expect(derive(self).rawMoveSpeed).toBeCloseTo(350 * 1.1 * 1.2 * .9, 12);
  });

  it("keeps standard sight distinct from true sight and neither overrides nearsight", () => {
    const w = world(), [self, enemy] = w.units;
    enemy.statuses = [{ ...status("invisible", 0), kind: "state", source: 1 }, { ...status("standardSight", 0), kind: "state" }];
    expect(canSee(enemy, self)).toBe(false);
    enemy.statuses.push({ ...status("revealed", 0), kind: "state" });
    expect(canSee(enemy, self)).toBe(true);
    self.statuses.push({ ...status("nearsight", 50), kind: "cc" });
    expect(canSee(enemy, self)).toBe(false);
  });

  it("keeps inherited final pet speed identical in actual movement and formula views without erasing own CC", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 2000, modes: ["idle", "idle"] });
    const pet = spawnPet(w, w.units[0], { ...petSpec, moveSpeed: 600, ignoreOwnMoveSpeedModifiers: true }, w.units[0].x);
    pet.statuses = [{ ...status("slow", .5), kind: "cc" }, status("moveSpeedPercent", .4)];
    const start = pet.x;
    advancePets(w);
    expect(pet.x - start).toBe(20);
    expect(derive(petFormulaTarget(pet, w.units[0], w.tick)).moveSpeed).toBe(600);
    expect(pet.statuses.some(s => s.key === "slow")).toBe(true);
    pet.statuses.push({ ...status("root", 0), kind: "cc" });
    advancePets(w);
    expect(pet.x - start).toBe(20);
    expect(petFormulaTarget(pet, w.units[0], w.tick).statuses.some(s => s.key === "root")).toBe(true);
  });

  it("tracks an effective speed override being added, mutated, cloned and removed", () => {
    const w = world(), self = w.units[0];
    const normal = derive(self).moveSpeed;
    self.spec.statConversions = { totalMoveSpeedOverride: 600 };
    expect(derive(self).moveSpeed).toBe(600);
    expect(derive(self).rawMoveSpeed).toBe(600);
    self.spec.statConversions.totalMoveSpeedOverride = 650;
    expect(derive(self).moveSpeed).toBe(650);
    expect(derive(cloneWorld(w).units[0]).moveSpeed).toBe(650);
    delete self.spec.statConversions.totalMoveSpeedOverride;
    expect(derive(self).moveSpeed).toBe(normal);
  });

  for (const override of [false, true]) {
    it(`keeps pet attack-speed slows ${override ? "out of an explicit inherited interval" : "active normally"} while retaining attack-disabling CC`, () => {
      const w = world(), self = w.units[0];
      const pet = spawnPet(w, self, { ...petSpec, ignoreOwnAttackSpeedSlows: override, attack: { range: 1000, interval: 1, effects: [], attackLike: true } }, self.x);
      pet.statuses = [{ ...status("cripple", .5), kind: "cc" }];
      advancePets(w);
      expect(pet.nextAttackTick).toBe(override ? 30 : 60);
      pet.nextAttackTick = 0;
      pet.statuses.push({ ...status("stun", 0), kind: "cc" });
      advancePets(w);
      expect(pet.nextAttackTick).toBe(0);
      expect(pet.statuses.some(s => s.key === "cripple")).toBe(true);
    });
  }

  for (const lifecycle of ["resurrection", "deathDefied"] as const) {
    it(`retains only explicitly death-persistent hostile effects through ${lifecycle} and expires them normally`, () => {
      const w = world(), self = w.units[0], enemy = w.units[1];
      self.statuses = [
        { ...status("nearsight", 50), kind: "cc", source: 1, persistThroughDeath: true },
        { ...status("root", 0), kind: "cc", source: 1 },
      ];
      expect(canSee(enemy, self)).toBe(false);
      if (lifecycle === "resurrection") beginResurrection(w, self, { duration: .5 });
      else beginDeathDefied(w, self, { duration: 4 });
      expect(self.statuses.some(s => s.key === "root")).toBe(false);
      expect(self.statuses.some(s => s.key === "nearsight")).toBe(true);
      expect(canSee(enemy, self)).toBe(false);
      const branch = cloneWorld(w);
      branch.units[0].statuses.find(s => s.key === "nearsight")!.endTick = 1;
      expect(self.statuses.find(s => s.key === "nearsight")!.endTick).toBe(60);
      while (w.tick <= 60) step(w, [idle, idle]);
      expect(self.statuses.some(s => s.key === "nearsight")).toBe(false);
      expect(canSee(enemy, self)).toBe(true);
    });
  }

  it("preserves only opted-in pets after owner death and still expires them on time", () => {
    const w = world(), self = w.units[0];
    const ordinary = spawnPet(w, self, petSpec, self.x);
    const persistent = spawnPet(w, self, { ...petSpec, persistsAfterOwnerDeath: true }, self.x);
    self.alive = false; self.hp = 0;
    advancePets(w);
    expect(w.pets).not.toContain(ordinary);
    expect(w.pets).toContain(persistent);
    w.tick = 29; advancePets(w);
    expect(w.pets).toContain(persistent);
    w.tick = 30; advancePets(w);
    expect(w.pets).toHaveLength(0);
  });

  for (const side of [0, 1] as const) {
    for (const target of ["champion", "pet"] as const) {
      it(`keeps side ${side} basic facing reflected at co-location against a ${target}`, () => {
        const w = world(), self = w.units[side], enemy = w.units[side === 0 ? 1 : 0];
        self.x = enemy.x = 0;
        const pet = target === "pet" ? spawnPet(w, enemy, petSpec, 0) : undefined;
        startAttack(w, self, pet);
        expect(self.facing).toBe(side === 0 ? 1 : -1);
      });
    }
  }

  for (const interrupt of [false, true]) {
    it(`retains an independent cast deadline alongside its declaration dash${interrupt ? " when interrupted" : ""}`, () => {
      const q = ability({ key: "Q", castTime: .5, cost: 20, preserveCastStartDash: true, cancelOnInvalidTarget: true, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
      const w = createWorld({ fighters: [fighter({ base: { resource: 100 }, abilities: [q], hooks: { onCastStart({ world, self }) { self.action = { kind: "dash", ability: "Q", startTick: world.tick, endTick: world.tick + 30, perTick: 1, stopAtContact: false, unstoppable: false }; } } }), fighter()], distance: 100, modes: ["idle", "idle"] });
      const self = w.units[0], enemy = w.units[1];
      startCast(w, self, q);
      expect(self.action?.kind).toBe("dash");
      if (self.action?.kind !== "dash") throw new Error("declaration dash lost");
      expect(self.action.resume?.kind).toBe("cast");
      if (interrupt) applyCC(w, enemy, self, "airborne", .2);
      while (w.tick < 15) step(w, [idle, idle]);
      expect(enemy.hp).toBe(2000);
      expect(self.resource).toBe(100);
      step(w, [idle, idle]);
      expect(enemy.hp).toBe(1900);
      expect(self.resource).toBe(80);
      expect(self.cooldownReady.Q).toBe(315);
      while (w.tick <= 32) step(w, [idle, idle]);
      expect(enemy.hp).toBe(1900);
    });
  }

  it("permits only opted-in instant overlays on a dash holding a cast, reserving its cost", () => {
    const q = ability({ key: "Q", castTime: .5, cost: 80, preserveCastStartDash: true, delivery: { kind: "target", range: 500 } });
    const r = ability({ key: "R", cost: 20, overlay: true, overlayResumedDash: true, delivery: { kind: "self" } });
    const w = createWorld({ fighters: [fighter({ base: { resource: 100 }, abilities: [q, r], hooks: { onCastStart({ world, self, ability }) { if (ability.key === "Q") self.action = { kind: "dash", ability: "Q", startTick: world.tick, endTick: world.tick + 30, perTick: 1, stopAtContact: false, unstoppable: false }; } } }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const self = w.units[0];
    startCast(w, self, q);
    const dash = self.action;
    if (dash?.kind !== "dash") throw new Error("dash lost");
    const held = dash.resume;
    expect(canCast(w, self, { ...r, cost: 21 })).toBe(false);
    expect(canCast(w, self, { ...r, overlayResumedDash: false })).toBe(false);
    expect(canCast(w, self, { ...r, castTime: .1 })).toBe(false);
    expect(canCast(w, self, { ...r, delivery: { kind: "dash", distance: 100, speed: 1000, direction: "target" } })).toBe(false);
    expect(canCast(w, self, r)).toBe(true);
    startCast(w, self, r);
    expect(self.action).toBe(dash);
    expect(dash.resume).toBe(held);
    expect(self.resource).toBe(80);
    while (w.tick <= 15) step(w, [idle, idle]);
    expect(self.resource).toBe(0);
    expect(dash.resume).toBeUndefined();
  });

  it("cancels invalid target completion without charging the cast running beside a dash", () => {
    const q = ability({ key: "Q", castTime: .5, cost: 20, preserveCastStartDash: true, cancelOnInvalidTarget: true, delivery: { kind: "target", range: 200 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const w = createWorld({ fighters: [fighter({ base: { resource: 100 }, abilities: [q], hooks: { onCastStart({ world, self }) { self.action = { kind: "dash", ability: "Q", startTick: world.tick, endTick: world.tick + 30, perTick: 1, stopAtContact: false, unstoppable: false }; } } }), fighter()], distance: 100, modes: ["idle", "idle"] });
    startCast(w, w.units[0], q);
    w.units[1].x = 1000;
    while (w.tick <= 15) step(w, [idle, idle]);
    expect(w.units[0].resource).toBe(100);
    expect(w.units[0].cooldownReady.Q).toBeUndefined();
    expect(w.units[1].hp).toBe(2000);
  });

  it("releases an explicitly declaration-timed line once while retaining completion cost and cast lock", () => {
    const q = ability({ key: "Q", castTime: .5, cost: 20, deliveryAtCastStart: true, delivery: { kind: "line", range: 500, speed: 1000, width: 60, piercing: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const w = createWorld({ fighters: [fighter({ base: { resource: 100 }, abilities: [q] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    applyCC(w, w.units[0], w.units[1], "root", 2);
    startCast(w, w.units[0], q);
    expect(w.missiles).toHaveLength(1);
    expect(w.units[0].action?.kind).toBe("cast");
    expect(w.units[0].resource).toBe(100);
    while (w.tick < 15) step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1900);
    expect(w.units[0].resource).toBe(100);
    step(w, [idle, idle]);
    expect(w.units[0].resource).toBe(80);
    expect(w.units[0].action).toBeUndefined();
    expect(w.units[0].cooldownReady.Q).toBe(315);
    while (w.tick <= 35) step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1900);
    expect(w.missiles).toHaveLength(0);
  });
});
