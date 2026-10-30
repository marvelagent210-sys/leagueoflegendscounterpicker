import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocateBoth, damagePerSecond, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { canMove, derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type Unit, type World } from "../../engine/sim/state";
import blitzcrank from "../../kits/champions/Blitzcrank";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compiled = () => compileKit(championData("Blitzcrank"), records("Blitzcrank"), blitzcrank, {}, pets("Blitzcrank"), runes());
const compiledKit = compiled();
const ability = (key: string) => compiledKit.spec.abilities.find(a => a.key === key)!;
const idle: Behavior = () => undefined;
const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
const subject = (bonus: FighterSpec["bonus"] = {}) => ({ ...compiledKit.spec, bonus, base: { ...compiledKit.spec.base, hpRegen: 0, resourceRegen: 0 } });
function worldFor(x = 100, bonus: FighterSpec["bonus"] = {}): World {
  const world = createWorld({ fighters: [subject(bonus), fighter({ id: "target", base: { hp: 100000, hpRegen: 0, resourceRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 100, maxBranches: 1, reactionTime: 10 } });
  world.units[1].x = x; return world;
}
function advance(world: World, tick: number): void { while (world.tick < tick && !world.result) step(world, [idle, idle]); }
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(key));
function state(world: World, target: Unit, key: StateType, seconds = 20): void { applyEffect(world, target, target, { type: "state", state: key, duration: seconds }, { scale: 1 }); }
function shield(world: World, target: Unit, amount: number): void { applyEffect(world, target, target, { type: "shield", amount: { base: amount }, duration: 20 }, { scale: 1 }); }
const totalShield = (target: Unit | Pet) => (target.statuses ?? []).filter(s => s.kind === "shield").reduce((n, s) => n + s.value, 0);
function attack(world: World, pet?: Pet): number {
  startAttack(world, world.units[0], pet);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("Expected a real attack declaration");
  advance(world, action.launchTick + 1); return action.launchTick;
}
function summon(world: World, x: number, extra: Partial<PetSpec> = {}): Pet {
  return spawnPet(world, world.units[1], { kind: "body", name: "Actual enemy summon", hp: 10000, armor: 0, mr: 0, radius: 25, pathingRadius: 25, moveSpeed: 0, duration: 100, ...extra }, x);
}
const bolts = (world: World) => world.missiles.filter(m => m.source === "R-passive");

describe("Blitzcrank source contract", () => {
  it("pins all five raw templates and exact 16.20 objects without altering parsed primary formulas", () => {
    expect(new Set(compiledKit.evidence.filter(row => row.revid).map(row => row.revid))).toEqual(new Set([4041159, 3908089, 4026708, 3956748, 3906572]));
    for (const row of records("Blitzcrank")) {
      expect(row.sources?.some(source => source.page.revid === row.page.revid && source.text.some(text => text.includes("<noinclude>")))).toBe(true);
      expect(row.gameSources?.length).toBeGreaterThan(0);
      for (const source of row.gameSources ?? []) {
        expect(source.url).toBe("https://raw.communitydragon.org/16.20/game/data/characters/blitzcrank/blitzcrank.bin.json");
        expect(source.version).toBe("16.20.8248524+branch.releases-16-20.content.release");
        expect(source.sha256).toBe("290a6b00f9a4615935bc1e8cd58ab6f31c417b76fb6351ce8bd121e429e7d187");
        expect(source.text.join(" ")).toContain(source.object);
      }
    }
    expect(ability("Q")).toMatchObject({ cooldown: 16, cost: 100, castTime: .25, delivery: { kind: "line", range: 1115, travelRange: 1080, width: 140, speed: 1800, radius: 70, collisionPet: true } });
    expect(ability("W")).toMatchObject({ cooldown: 15, cost: 75, castTime: 0 });
    expect(ability("E")).toMatchObject({ cooldown: 5, cooldownAfter: "empower", cost: 25, castTime: 0 });
    expect(ability("R")).toMatchObject({ cooldown: 20, cost: 100, castTime: .25, delivery: { kind: "aura", radius: 600 } });
    expect(records("Blitzcrank").find(row => row.kind === "R")!.parts[0]!.leveling[0]!.amount.scaling.at(-1)!.ratio).toEqual({ kind: "constant", value: 2 });
  });
  it("fails closed if binary evidence, complete arrays, attribution or a primary interaction disappears", () => {
    for (const change of ["binary", "array", "attribution", "interaction"] as const) {
      const data = records("Blitzcrank");
      const p = data.find(row => row.kind === "I")!;
      if (change === "binary") delete p.gameSources;
      if (change === "array") p.gameSources![0]!.text = p.gameSources![0]!.text.map(text => text.replace('"name":"HealthThreshold","values":[0.30000001192092896,', '"name":"HealthThreshold","values":[0.4,'));
      if (change === "attribution") p.gameSources![0]!.sha256 = "invalid";
      if (change === "interaction") {
        const q = data.find(row => row.kind === "Q")!;
        q.notes = []; q.sources = []; q.parts = q.parts.map(part => ({ ...part, text: part.text.replace("during which they are revealed", "") }));
      }
      expect(() => compileKit(championData("Blitzcrank"), data, blitzcrank, {}, pets("Blitzcrank"), runes()), change).toThrow();
    }
  });
  it("captures every runtime quantity before KitContext seals and exposes finite allocator damage", () => {
    const world = worldFor(100, { ap: 100 }); cast(world, "W"); advance(world, 151);
    expect(damagePerSecond(subject({ ap: 100 }), fighter()).magic).toBeGreaterThan(0);
    expect(Object.values(damagePerSecond(subject({ ap: 100 }), fighter())).every(Number.isFinite)).toBe(true);
    expect(compiledKit.assumptions.some(text => text.includes("no invented stack cap"))).toBe(true);
  });
});

describe("Blitzcrank Mana Barrier mechanics", () => {
  it("uses maximum mana at the actual crossing, absorbs only the below-30% portion and starts its 90s clock immediately", () => {
    const world = worldFor(), [self, enemy] = world.units, max = derive(self).maxHp, barrier = .35 * derive(self).maxResource;
    self.resource = 1; self.hp = .3 * max + 100;
    dealDamage(world, enemy, self, 150, "true");
    expect(self.hp).toBeCloseTo(.3 * max, 10);
    expect(totalShield(self)).toBeCloseTo(barrier - 50, 10);
    expect(self.totals.absorbed).toBe(50);
    expect(self.memory.manaBarrierReady).toBe(2700);
    dealDamage(world, enemy, self, 50, "true");
    expect(self.hp).toBeCloseTo(.3 * max, 10);
    expect(totalShield(self)).toBeCloseTo(barrier - 100, 10);
  });
  it("accounts for existing typed shields and actual post-mitigation health damage before triggering", () => {
    const world = worldFor(), [self, enemy] = world.units, max = derive(self).maxHp;
    self.hp = .3 * max + 100; shield(world, self, 200);
    dealDamage(world, enemy, self, 250, "true");
    expect(self.memory.manaBarrierReady).toBeUndefined(); expect(self.hp).toBeCloseTo(.3 * max + 50);
    dealDamage(world, enemy, self, 100, "true");
    expect(self.hp).toBeCloseTo(.3 * max); expect(self.totals.absorbed).toBeCloseTo(250);
    expect(totalShield(self)).toBeCloseTo(.35 * derive(self).maxResource - 50);
    const resisted = worldFor(), [a, b] = resisted.units;
    a.hp = .3 * derive(a).maxHp + 100;
    dealDamage(resisted, b, a, 100, "physical");
    expect(a.memory.manaBarrierReady).toBeUndefined();
  });
  it("expires after ten seconds, cannot retrigger while cooling down, and re-arms at exactly90 seconds", () => {
    const world = worldFor(), [self, enemy] = world.units;
    self.hp = .3 * derive(self).maxHp; dealDamage(world, enemy, self, 1, "true");
    advance(world, 300); step(world, [idle, idle]); expect(totalShield(self)).toBe(0);
    dealDamage(world, enemy, self, 1, "true"); expect(totalShield(self)).toBe(0);
    advance(world, 2700); dealDamage(world, enemy, self, 1, "true");
    expect(totalShield(self)).toBeCloseTo(.35 * derive(self).maxResource - 1); expect(self.memory.manaBarrierReady).toBe(5400);
  });
  it("ignores unrelated typed shields and cannot trigger from an immune packet", () => {
    const world = worldFor(), [self, enemy] = world.units; self.hp = .3 * derive(self).maxHp + 1;
    applyEffect(world, self, self, { type: "shield", amount: { base: 1000 }, duration: 20, shieldType: "magic" }, { scale: 1 });
    dealDamage(world, enemy, self, 2, "true");
    expect(self.hp).toBeCloseTo(.3 * derive(self).maxHp); expect(self.memory.manaBarrierReady).toBe(2700);
    const immune = worldFor(); immune.units[0].hp = 1; state(immune, immune.units[0], "invulnerable"); dealDamage(immune, immune.units[1], immune.units[0], 100, "true");
    expect(immune.units[0].memory.manaBarrierReady).toBeUndefined(); expect(totalShield(immune.units[0])).toBe(0);
  });
  it("stops only its available amount from a lethal crossing and clones its real shield independently", () => {
    const world = worldFor(), [self, enemy] = world.units;
    self.hp = .3 * derive(self).maxHp + 1;
    dealDamage(world, enemy, self, 20, "true");
    const copy = cloneWorld(world); totalShield(copy.units[0]);
    dealDamage(world, enemy, self, 100000, "true");
    expect(self.hp).toBeLessThanOrEqual(0); expect(copy.units[0].hp).toBeGreaterThan(0);
    expect(totalShield(copy.units[0])).toBeGreaterThan(0);
  });
});

describe("Blitzcrank Rocket Grab mechanics", () => {
  it("flies at1800, damages the first body, retains a fixed75-unit destination and a0.65s independent stun", () => {
    const world = worldFor(600, { ap: 100 }), [self, enemy] = world.units;
    cast(world, "Q"); advance(world, 9);
    expect(world.missiles.find(m => m.source === "Q")).toMatchObject({ perTick: 60, travelLeft: 1080, homing: false });
    expect(canMove(self)).toBe(false); expect(canStartAttack(world, self)).toBe(false);
    advance(world, 17); expect(enemy.hp).toBe(99570); expect(enemy.forced).toBeDefined();
    const stun = enemy.statuses.find(row => row.kind === "cc" && row.key === "stun"); expect(stun!.endTick - stun!.startTick).toBe(20);
    self.x = -400;
    advance(world, 50);
    expect(enemy.x).toBeCloseTo(75, 10); expect(canMove(self)).toBe(true);
  });
  it("uses a facing from directionTo at exact overlap and pushes a close target out to its fixed endpoint", () => {
    const world = worldFor(0); cast(world, "Q"); advance(world, 30); expect(world.units[1].x).toBeCloseTo(75);
    // Recreate a reflected world with Blitzcrank on side1 so equal-position facing mirrors.
    const reverse = createWorld({ fighters: [fighter({ base: { hp: 100000, mr: 0, moveSpeed: 0 } }), subject()], distance: 0, modes: ["idle", "idle"], settings: { maxBranches: 1, reactionTime: 10 } });
    reverse.units[0].x = reverse.units[1].x = 0;
    startCast(reverse, reverse.units[1], ability("Q")); advance(reverse, 30); expect(reverse.units[0].x).toBeCloseTo(-75);
  });
  it.each(["spellShield", "parry", "untargetable", "ccImmune", "displacementImmune", "invulnerable"] as const)("resolves %s without replacing independent damage or CC guards", guard => {
    const world = worldFor(500), target = world.units[1]; state(world, target, guard); cast(world, "Q"); advance(world, 50);
    if (["spellShield", "parry", "untargetable"].includes(guard)) { expect(target.hp).toBe(100000); expect(target.x).toBe(500); }
    if (["ccImmune", "displacementImmune"].includes(guard)) { expect(target.hp).toBe(99690); expect(target.x).toBe(500); }
    if (guard === "displacementImmune") expect(world.log.some(row => row.text.includes("stun"))).toBe(true);
    if (guard === "invulnerable") { expect(target.hp).toBe(100000); expect(target.x).toBeCloseTo(75); }
  });
  it("stops on projectile walls, releases a missed lock, never pulls a victim killed by its damage, and has finite range", () => {
    const wall = worldFor(500); wall.zones.push({ id: wall.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 200, radius: 0, startTick: 0, endTick: 100 }); cast(wall, "Q"); advance(wall, 40);
    expect(wall.units[1].hp).toBe(100000); expect(canMove(wall.units[0])).toBe(true);
    const lethal = worldFor(500); lethal.units[1].hp = 10; cast(lethal, "Q"); advance(lethal, 40); expect(lethal.units[1].forced).toBeUndefined();
    const far = worldFor(2000); cast(far, "Q"); advance(far, 60); expect(far.missiles.filter(m => m.source === "Q")).toEqual([]); expect(far.units[1].hp).toBe(100000); expect(canMove(far.units[0])).toBe(true);
  });
  it("crosses intervening terrain, clips a destination inside terrain to the caster side, and does not retarget a later caster move", () => {
    const clear = worldFor(600); clear.terrain.push({ id: clear.nextId++, owner: 1, from: 250, to: 350, endTick: 300 }); cast(clear, "Q"); advance(clear, 50); expect(clear.units[1].x).toBeCloseTo(75);
    const clipped = worldFor(600); clipped.terrain.push({ id: clipped.nextId++, owner: 1, from: 50, to: 150, endTick: 300 }); cast(clipped, "Q"); advance(clipped, 50); expect(clipped.units[1].x).toBeCloseTo(50 - clipped.units[1].spec.base.pathingRadius);
  });
  it("collides with an actual pet before its owner, respects pet-local defenses, and never lends the owner's spell shield", () => {
    for (const guard of [undefined, "spellShield", "displacementImmune"] as const) {
      const world = worldFor(700), pet = summon(world, 300); state(world, world.units[1], "spellShield");
      if (guard) petEffects(world, world.units[1], pet, [{ type: "state", state: guard, duration: 20 }]);
      cast(world, "Q"); advance(world, 45);
      expect(world.units[1].hp).toBe(100000); expect(hasState(world.units[1], "spellShield")).toBe(true);
      if (guard === "spellShield") { expect(pet.hp).toBe(10000); expect(pet.x).toBe(300); expect(pet.statuses?.some(s => s.key === "spellShield")).toBe(false); }
      else { expect(pet.hp).toBe(9690); expect(pet.x).toBeCloseTo(guard === "displacementImmune" ? 300 : 75); }
    }
  });
  it("keeps missile and victim movement independent across copied worlds", () => {
    const world = worldFor(600); cast(world, "Q"); advance(world, 10); const branch = cloneWorld(world);
    branch.units[1].x = 2000; advance(world, 50); advance(branch, 50);
    expect(world.units[1].x).toBeCloseTo(75); expect(branch.units[1].x).toBe(2000);
    expect(branch.units[1].hp).toBe(100000); expect(world.units[1].hp).toBe(99690);
  });
});

describe("Blitzcrank Overdrive and Power Fist mechanics", () => {
  it("decays W linearly after its first stat update, floors at10%, lasts5s and applies a tenacity-adjusted selfslow", () => {
    const world = worldFor(), self = world.units[0]; cast(world, "W");
    const bonus = () => self.statuses.find(s => s.memoKey === "W:moveSpeedPercent" && s.kind === "stat" && s.key === "moveSpeedPercent")?.value;
    advance(world, 2); expect(bonus()).toBe(.8);
    advance(world, 45); expect(bonus()).toBeCloseTo(.8 - .7 * 43 / 87);
    advance(world, 90); expect(bonus()).toBeCloseTo(.1);
    applyEffect(world, self, self, { type: "stat", stat: "slowResist", amount: { base: .5 }, duration: 20 }, { scale: 1 });
    state(world, self, "tenacity"); self.statuses.find(s => s.key === "tenacity")!.value = .5;
    advance(world, 151);
    expect(bonus()).toBeUndefined(); expect(self.statuses.find(s => s.kind === "cc" && s.key === "slow")).toMatchObject({ startTick: 150, endTick: 173, value: .3 });
    expect(derive(self).moveSpeed).toBeCloseTo(self.spec.base.moveSpeed * .85);
  });
  it("resets a real attack timer, doubles AD plus25%AP with critical modifiers, applies onhits and launches a persistent untargetable-proof fist", () => {
    const world = worldFor(100, { critChance: 1, ap: 100 }), [self, target] = world.units;
    self.spec = { ...self.spec, attack: { ...self.spec.attack, onHit: [{ type: "damage", damageType: "true", amount: { base: 17 } }] } };
    self.attackReadyTick = 100; cast(world, "E"); expect(self.attackReadyTick).toBe(0);
    startAttack(world, self); const action = self.action;
    if (action?.kind !== "windup") throw new Error("No empowered windup");
    expect(action.uncancellable).toBe(true); state(world, target, "untargetable");
    advance(world, action.launchTick + 1);
    expect(target.hp).toBeCloseTo(100000 - (2 * derive(self).ad + 25) * derive(self).critDamage - 17);
    expect(self.cooldownReady.E).toBe(action.launchTick + 150);
    expect(target.statuses.some(s => s.kind === "cc" && s.key === "airborne")).toBe(true);
  });
  it.each(["spellShield", "parry", "blockAttacks", "dodgeAttacks"] as const)("%s prevents the enhanced attack's damage and airborne, without restoring its spent buff", guard => {
    const world = worldFor(); state(world, world.units[1], guard); cast(world, "E"); attack(world);
    expect(world.units[1].hp).toBe(100000); expect(world.units[1].statuses.some(s => s.kind === "cc" && s.key === "airborne")).toBe(false);
    expect(world.units[0].statuses.some(s => s.kind === "empower")).toBe(false);
  });
  it("expires an unused fist after5s and resolves empowered attacks on actual pets through their own shields", () => {
    const unused = worldFor(); cast(unused, "E"); advance(unused, 151); expect(unused.units[0].cooldownReady.E).toBe(300);
    const world = worldFor(1000), pet = summon(world, 100); petEffects(world, world.units[1], pet, [{ type: "state", state: "spellShield", duration: 20 }]); cast(world, "E"); attack(world, pet);
    expect(pet.hp).toBe(10000); expect(pet.statuses?.some(s => s.key === "spellShield")).toBe(false); expect(world.units[1].hp).toBe(100000);
  });
});

describe("Blitzcrank Static Field mechanics", () => {
  it("removes shields before damage even through a spell shield and casts from the current end-of-cast position", () => {
    const world = worldFor(800, { ap: 100 }), [self, target] = world.units;
    shield(world, target, 1000); cast(world, "R"); self.x = 300; advance(world, 9);
    expect(totalShield(target)).toBe(0); expect(target.hp).toBe(99375); expect(target.statuses.some(s => s.key === "silence")).toBe(true);
    const blocked = worldFor(); shield(blocked, blocked.units[1], 1000); state(blocked, blocked.units[1], "spellShield"); cast(blocked, "R"); advance(blocked, 9);
    expect(totalShield(blocked.units[1])).toBe(0); expect(blocked.units[1].hp).toBe(100000); expect(hasState(blocked.units[1], "spellShield")).toBe(false);
  });
  it("keeps silence/shield removal independent of damage immunity and grants no life steal from active or passive spell damage", () => {
    const world = worldFor(100, { ap: 100 }), [self, target] = world.units;
    self.hp -= 100; applyEffect(world, self, self, { type: "stat", stat: "lifeSteal", amount: { base: 1 }, duration: 100 }, { scale: 1 }); shield(world, target, 1000); state(world, target, "invulnerable"); cast(world, "R"); advance(world, 9);
    expect(target.hp).toBe(100000); expect(totalShield(target)).toBe(0); expect(target.statuses.some(s => s.key === "silence")).toBe(true); expect(self.hp).toBe(derive(self).maxHp - 100);
    target.statuses = []; world.tick = self.cooldownReady.R!; attackHit(world, self, target, false, []); const afterAttack = self.hp; advance(world, world.tick + 31); expect(self.hp).toBe(afterAttack);
  });
  it("queues three naturally connected basics at nonrefreshing1s intervals, consumes protected marks and disables new marks on R cooldown", () => {
    const world = worldFor(), [self, target] = world.units;
    for (let i = 0; i < 3; i++) attackHit(world, self, target, false, []);
    expect(bolts(world).map(m => m.impactTick)).toEqual([30, 60, 90]);
    const before = target.hp; state(world, target, "untargetable", 1.5); advance(world, 31); expect(target.hp).toBe(before); expect(bolts(world)).toHaveLength(2);
    advance(world, 91); const packet = ability("R-passive").onHit![0]!; if (packet.type !== "damage") throw new Error("Expected lightning damage"); const damage = evaluate(packet.amount, self, target);
    expect(target.hp).toBeCloseTo(before - damage * 2);
    cast(world, "R"); advance(world, 100); attackHit(world, self, target, false, []); expect(bolts(world)).toHaveLength(0);
  });
  it("adds marks on blocked attacks without a fabricated cap, but blind, dodge, parry and fist spell shield prevent onhits", () => {
    const block = worldFor(); state(block, block.units[1], "blockAttacks"); for (let i = 0; i < 5; i++) attackHit(block, block.units[0], block.units[1], false, []); expect(bolts(block)).toHaveLength(5);
    for (const guard of ["dodgeAttacks", "parry"] as const) { const world = worldFor(); state(world, world.units[1], guard); attackHit(world, world.units[0], world.units[1], false, []); expect(bolts(world)).toHaveLength(0); }
    const blind = worldFor(); attackHit(blind, blind.units[0], blind.units[1], true, []); expect(bolts(blind)).toHaveLength(0);
    const fist = worldFor(); state(fist, fist.units[1], "spellShield"); cast(fist, "E"); attack(fist); expect(bolts(fist)).toHaveLength(0);
  });
  it("consumes each due bolt through spellshield, parry and immunity without lending defenses to another queued target", () => {
    for (const guard of ["spellShield", "parry", "invulnerable"] as const) {
      const world = worldFor(), [self, target] = world.units; attackHit(world, self, target, false, []); const before = target.hp;
      state(world, target, guard); advance(world, 31); expect(target.hp).toBe(before); expect(bolts(world)).toHaveLength(0);
      if (guard === "spellShield") expect(hasState(target, "spellShield")).toBe(false);
    }
    const world = worldFor(1000), pet = summon(world, 100); resolveAttackOnPet(world, world.units[0], pet, false, [], {}); const before = pet.hp;
    petEffects(world, world.units[1], pet, [{ type: "state", state: "untargetable", duration: 2 }]); advance(world, 31);
    expect(pet.hp).toBe(before); expect(bolts(world)).toHaveLength(0); expect(world.units[1].hp).toBe(100000);
  });
  it("preserves already queued bolts across R activation and owner death, and copied worlds consume clocks independently", () => {
    const world = worldFor(), [self, target] = world.units; attackHit(world, self, target, false, []); cast(world, "R"); advance(world, 9); const before = target.hp;
    const copy = cloneWorld(world); dealDamage(world, target, self, 100000, "true"); advance(world, 31); expect(target.hp).toBeLessThan(before); expect(bolts(copy)).toHaveLength(1); expect(bolts(world)).toHaveLength(0);
  });
  it("tracks actual pet IDs for delayed bolts and active shield removal, with the monster shield exception", () => {
    const world = worldFor(2000), pet = summon(world, 100), monster = summon(world, 200, { targetClass: "monster" });
    resolveAttackOnPet(world, world.units[0], pet, false, [], {}); const before = pet.hp; pet.x = 500; advance(world, 31); expect(pet.hp).toBeLessThan(before); expect(world.units[1].hp).toBe(100000);
    petEffects(world, world.units[1], pet, [{ type: "shield", amount: { base: 1000 }, duration: 10 }]); petEffects(world, world.units[1], monster, [{ type: "shield", amount: { base: 1000 }, duration: 10 }]);
    abilityHitPet(world, world.units[0], pet, ability("R"), ability("R").onHit!, "area"); expect(totalShield(pet)).toBe(0); expect(pet.hp).toBeLessThan(before - 525);
    abilityHitPet(world, world.units[0], monster, ability("R"), ability("R").onHit!, "area"); expect(totalShield(monster)).toBe(475); expect(monster.hp).toBe(10000);
  });
});

describe("Blitzcrank behavior mechanics", () => {
  it("uses QWER in an ordinary unscripted fight", () => {
    const world = createWorld({ fighters: [subject({ ap: 100 }), fighter({ id: "opponent", base: { hp: 30000, ad: 50 } })], distance: 400, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 15, maxBranches: 1, reactionTime: 10 } }); runWorld(world);
    for (const key of ["Q", "W", "E", "R"]) expect(world.log.some(row => row.side === 0 && row.text === `casts ${ability(key).name}`), key).toBe(true);
  });
  it.each(["hold", "trade"] as const)("reserves a genuinely ready R in%s and returns completed-trade retreat first", mode => {
    const world = worldFor(100); world.modes[0] = mode;
    expect(canCast(world, world.units[0], ability("R"))).toBe(true);
    for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = Infinity;
    expect(compiledKit.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" });
    world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(compiledKit.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("uses W while fleeing and respects the ordinary trade timer", () => {
    const world = worldFor(100); world.modes[0] = "flee"; expect(compiledKit.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "W" });
    world.modes[0] = "trade"; world.units[0].memory.tradeStart = 0; world.tick = world.settings.tradeSeconds * 30 + 1;
    expect(compiledKit.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
});

describe("Blitzcrank production", () => {
  it("preserves exact15000-gold builds and all six full production scenarios under Darius reflection", () => {
    const darius = kit("Darius").spec;
    const forward = simulateMatchup(compiledKit.spec, darius, 15000, prices), reverse = simulateMatchup(darius, compiledKit.spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(forward.scenarios).toHaveLength(6);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThanOrEqual(1e-10);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const reflected = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(reflected.score).toBeUndefined(); else expect(Math.abs(scenario.score + reflected.score!)).toBeLessThanOrEqual(1e-10);
      for (const result of scenario.outcomes) expect([result.seconds, ...result.hp, ...result.damage].every(Number.isFinite)).toBe(true);
    }
  }, 60000);
  it("runs a full60s-limit production duel against Heimerdinger's actual pets using exact15000-gold allocations", () => {
    const heimer = kit("Heimerdinger", { turrets: 3, upgrade: 1 }).spec, builds = allocateBoth(compiledKit.spec, heimer, 15000, prices);
    const matchup = simulateMatchup(compiledKit.spec, heimer, 15000, prices);
    expect(matchup.scenarios).toHaveLength(6);
    for (const build of matchup.builds) { expect(build.gold).toBe(15000); expect(Math.abs(Object.values(build.spent).reduce((a,b) => a+b,0)-15000)).toBeLessThan(1e-10); }
    for (const scenario of matchup.scenarios) for (const outcome of scenario.outcomes) expect([outcome.seconds,...outcome.hp,...outcome.damage].every(Number.isFinite)).toBe(true);
    const world = createWorld({ fighters: [{ ...compiledKit.spec, bonus: builds[0].bonus }, { ...heimer, bonus: builds[1].bonus }], distance: 400, modes: ["fight", "fight"], settings: { maxSeconds: 60, log: true } });
    expect(world.pets.filter(p => p.owner === 1)).toHaveLength(3);
    const result = runWorld(world); expect(result).toBeDefined(); expect(world.units.every(unit => Number.isFinite(unit.hp))).toBe(true);
    expect(world.log.some(row => row.side === 0 && row.text === "casts Rocket Grab")).toBe(true);
    expect(world.log.some(row => row.text.includes("Evolution Turret"))).toBe(true);
  }, 60000);
});
