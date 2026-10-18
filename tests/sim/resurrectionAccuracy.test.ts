import { describe, expect, it } from "vitest";
import { advanceMissiles, advanceZones, canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { applyCC, applyEffect, beginDeathDefied, beginResurrection, canSee, dealDamage, immediateDisplace } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { defaultBehavior, perceive } from "../../engine/sim/behavior";
import { spawnPet, damagePet, destroyPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { ability, fighter } from "./kits";

const make = () => createWorld({ fighters: [fighter({ base: { armor: 0, mr: 0 } }), fighter({ base: { armor: 0, mr: 0 } })], distance: 300, modes: ["idle", "idle"] });
const advance = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [idle, idle]); };

describe("attackable resurrection and counted deaths", () => {
  it("preserves a pending cast, locks new actions, and removes only hostile debuffs", () => {
    const q = ability({ key: "Q", castTime: 1, delivery: { kind: "aura", radius: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [q] }), fighter()], distance: 300, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    startCast(world, self, q);
    const pending = self.action;
    applyCC(world, enemy, self, "root", 10);
    applyEffect(world, enemy, self, { type: "dot", damageType: "true", total: { base: 900 }, interval: 1, duration: 9 }, { scale: 1 });
    applyEffect(world, self, self, { type: "shield", amount: { base: 50 }, duration: 10 }, { scale: 1 });
    self.hp = -10;
    expect(beginResurrection(world, self, { duration: 6, armor: 20, mr: 20 })).toBe(true);
    expect(self.hp).toBe(2000);
    expect(derive(self).armor.bonus).toBe(20);
    expect(derive(self).mr.bonus).toBe(20);
    expect(self.action).toBe(pending);
    expect(self.statuses.some((s) => s.kind === "cc" || s.kind === "dot")).toBe(false);
    expect(self.statuses.some((s) => s.kind === "shield")).toBe(true);
    expect(canCast(world, self, { ...q, flags: { usableWhileDisabled: true }, overlay: true })).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);
    advance(world, 30);
    expect(enemy.hp).toBe(1900);
    dealDamage(world, enemy, self, 350, "true");
    advance(world, 179);
    expect(self.resurrection?.endTick).toBe(180);
    expect(self.hp).toBe(1700);
    step(world, [idle, idle]);
    expect(self.resurrection).toBeUndefined();
    expect(self.hp).toBe(1700);
    expect(derive(self).armor.bonus).toBe(0);
    expect(derive(self).mr.bonus).toBe(0);
  });

  it("cancels a channel immediately with its own reason and clones lifecycle clocks", () => {
    const reasons: string[] = [];
    const r = ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 4, interruptible: true } });
    const world = createWorld({ fighters: [fighter({ abilities: [r], hooks: { onChannelInterrupt: ({ reason }) => reasons.push(reason) } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    startCast(world, world.units[0], r);
    beginResurrection(world, world.units[0], { duration: 6 });
    expect(world.units[0].action).toBeUndefined();
    expect(reasons).toEqual(["resurrection"]);
    const branch = cloneWorld(world);
    branch.units[0].resurrection!.endTick = 60;
    advance(branch, 60);
    expect(branch.units[0].resurrection).toBeUndefined();
    expect(world.units[0].resurrection?.endTick).toBe(180);
  });

  it("does not announce an egg as a kill, then announces its actual destruction once", () => {
    const kills: string[] = [];
    const target = fighter({ hooks: { onLethal: ({ world, self }) => beginResurrection(world, self, { duration: 6 }) } });
    const source = fighter({ hooks: { onKill: ({ victim }) => kills.push("side" in victim ? victim.spec.id : victim.spec.kind) } });
    const world = createWorld({ fighters: [source, target], distance: 0, modes: ["idle", "idle"] });
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(kills).toEqual([]);
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(kills).toEqual(["dummy"]);
    dealDamage(world, world.units[0], world.units[1], 1, "true");
    expect(kills).toHaveLength(1);
  });

  it("counts a post-death caster once and ends its window before casts due on its expiry", () => {
    let kills = 0;
    const q = ability({ key: "Q", castTime: 1, delivery: { kind: "aura", radius: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const zombie = fighter({ abilities: [q], hooks: { onLethal: ({ world, self }) => beginDeathDefied(world, self, { duration: 7 }) } });
    const world = createWorld({ fighters: [fighter({ hooks: { onKill: () => { kills++; } } }), zombie], distance: 300, modes: ["idle", "idle"] });
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(kills).toBe(1);
    expect(world.units[1].fallen).toBe(true);
    expect(world.units[1].hp).toBe(1);
    expect(hasState(world.units[1], "ccImmune")).toBe(true);
    expect(hasState(world.units[1], "noHealing")).toBe(false);
    world.tick = 180;
    startCast(world, world.units[1], q);
    advance(world, 210);
    expect(world.units[0].hp).toBe(2000);
    expect(world.units[1].alive).toBe(false);
    expect(world.units[1].hp).toBe(0);
    expect(kills).toBe(1);
  });

  it("retains an already launched inbound missile until it arrives, without damaging the fallen caster", () => {
    const world = make();
    world.units[0].x = 0; world.units[1].x = 300;
    world.missiles.push({ id: 50, owner: 0, source: "attack", seenTick: 0, x: 0, perTick: 50, homing: true, direction: 1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: [], attack: { blinded: false, bonusOnHit: [] } });
    beginDeathDefied(world, world.units[1], { duration: 7 });
    advanceMissiles(world);
    expect(world.missiles).toHaveLength(1);
    for (let i = 0; i < 6; i++) advanceMissiles(world);
    expect(world.missiles).toHaveLength(0);
    expect(world.units[1].hp).toBe(1);
  });

  it("only enemy destruction of a pet emits a kill, excluding owner removal and expiration", () => {
    let kills = 0;
    const world = createWorld({ fighters: [fighter({ hooks: { onKill: () => { kills++; } } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const spec = { kind: "summon", name: "Summon", hp: 10, armor: 0, mr: 0, radius: 10, duration: 1, moveSpeed: 0 };
    const killed = spawnPet(world, world.units[1], spec, 0);
    damagePet(world, world.units[0], killed, 20, "true", false);
    damagePet(world, world.units[0], killed, 20, "true", false);
    destroyPet(world, spawnPet(world, world.units[1], spec, 0));
    spawnPet(world, world.units[1], spec, 0);
    advance(world, 31);
    expect(kills).toBe(1);
  });
});

describe("caster hit ordering and control-point callbacks", () => {
  it.each([false, true])("pet contact has its own opt-in hook with the actual target (projectile=%s)", (projectile) => {
    let legacyHits = 0, contacts = 0;
    const world = createWorld({ fighters: [fighter({ attack: { ranged: projectile, projectile, ...(projectile ? { missileSpeed: 6000 } : {}) }, hooks: { onAttackHit: () => { legacyHits++; }, onAttackPetHit: ({ enemy, pet }) => { expect(enemy.petId).toBe(pet.id); expect(enemy.hp).toBe(pet.hp); contacts++; } } }), fighter()], distance: 300, modes: ["idle", "idle"] });
    const pet = spawnPet(world, world.units[1], { kind: "summon", name: "Summon", hp: 1000, armor: 0, mr: 0, radius: 10, duration: 10, moveSpeed: 0 }, world.units[0].x + 100);
    startAttack(world, world.units[0], pet);
    launchAttack(world, world.units[0]);
    if (projectile) advanceMissiles(world);
    expect(pet.hp).toBe(900);
    expect(contacts).toBe(1);
    expect(legacyHits).toBe(0);
  });

  it.each(["cast", "attack"] as const)("a valid ranged %s starts the trade clock even beyond the enemy's attack reach", (kind) => {
    const q = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 10 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [q], attack: { range: 600, ranged: true } }), fighter()], distance: 500, modes: ["trade", "idle"] });
    expect(world.units[0].memory.tradeStart).toBeUndefined();
    step(world, [() => kind === "cast" ? ({ kind, ability: "Q" }) : ({ kind }), idle]);
    expect(world.units[0].memory.tradeStart).toBe(0);
    advance(world, 200);
    expect(world.units[0].memory.tradeStart).toBe(0);
  });

  it("unaffordable casts and self-defense setup do not start an out-of-combat trade", () => {
    const q = ability({ key: "Q", cost: 100, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 10 } }] });
    const e = ability({ key: "E", delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 100 }, duration: 1 }] });
    const world = createWorld({ fighters: [fighter({ abilities: [q, e], attack: { range: 600, ranged: true } }), fighter()], distance: 500, modes: ["trade", "idle"] });
    step(world, [() => ({ kind: "cast", ability: "Q" }), idle]);
    expect(world.units[0].memory.tradeStart).toBeUndefined();
    step(world, [() => ({ kind: "cast", ability: "E" }), idle]);
    expect(world.units[0].memory.tradeStart).toBeUndefined();
  });

  it.each([475 - 1e-12, 475 + 1e-12, 500 - 1e-12, 500 + 1e-12])("holds an attack-spacing boundary at %s despite reflected floating-point noise", (gap) => {
    const world = createWorld({ fighters: [fighter({ attack: { range: 500, ranged: true } }), fighter()], distance: gap, modes: ["fight", "idle"] });
    world.units[0].attackReadyTick = 100;
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: 0 });
    for (const unit of world.units) unit.x = 2000 - unit.x;
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: 0 });
  });

  it("locks movement for the first half second of an opted-in channel, then cancels on a real move command", () => {
    const reasons: string[] = [];
    const r = ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 2.5, interruptible: true, cancelAfter: 0.5 } });
    const world = createWorld({ fighters: [fighter({ abilities: [r], hooks: { onChannelInterrupt: ({ reason }) => reasons.push(reason) } }), fighter()], distance: 300, modes: ["idle", "idle"] });
    startCast(world, world.units[0], r);
    const origin = world.units[0].x;
    world.tick = 14;
    step(world, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(world.units[0].action?.kind).toBe("channel");
    expect(world.units[0].x).toBe(origin);
    step(world, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(world.units[0].action).toBeUndefined();
    expect(world.units[0].x).toBeGreaterThan(origin);
    expect(reasons).toEqual(["move"]);
  });

  it("only cancels an opted-in channel for an available different attack target after its lockout", () => {
    const reasons: string[] = [];
    const r = ability({ key: "R", delivery: { kind: "self" }, channel: { duration: 2.5, interruptible: true, cancelAttackOtherAfter: 0.5 } });
    const world = createWorld({ fighters: [fighter({ abilities: [r], hooks: { onChannelInterrupt: ({ reason }) => reasons.push(reason) } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const pet = spawnPet(world, world.units[1], { kind: "summon", name: "Summon", hp: 200, armor: 0, mr: 0, radius: 10, duration: 10, moveSpeed: 0 }, world.units[0].x);
    startCast(world, world.units[0], r);
    world.tick = 14;
    step(world, [() => ({ kind: "attack", pet: pet.id }), idle]);
    expect(world.units[0].action?.kind).toBe("channel");
    pet.x += 1000;
    step(world, [() => ({ kind: "attack", pet: pet.id }), idle]);
    expect(world.units[0].action?.kind).toBe("channel");
    pet.x = world.units[0].x;
    step(world, [() => ({ kind: "attack" }), idle]);
    expect(world.units[0].action?.kind).toBe("channel");
    step(world, [() => ({ kind: "attack", pet: pet.id }), idle]);
    expect(world.units[0].action?.kind).toBe("windup");
    expect(reasons).toEqual(["attack"]);
  });

  it("spends ordinary shields before post-shield reduction, and reports and steals the reduced damage", () => {
    const reports: Array<{ amount: number; absorbed: number; mitigated: number }> = [];
    const world = createWorld({ fighters: [fighter({ base: { armor: 0, mr: 0 } }), fighter({ base: { armor: 0, mr: 0 }, hooks: { modifyDamageAfterShields: ({ amount }) => amount * 0.1, onDamageTaken: (report) => reports.push(report) } })], distance: 0, modes: ["idle", "idle"] });
    const [source, target] = world.units;
    source.hp = 1000;
    applyEffect(world, target, target, { type: "shield", amount: { base: 60 }, duration: 5 }, { scale: 1 });
    expect(dealDamage(world, source, target, 200, "magic", { lifesteal: 0.1 })).toBe(14);
    expect(source.hp).toBeCloseTo(1007.4, 10);
    expect(target.totals.absorbed).toBe(60);
    expect(reports[0]).toMatchObject({ amount: 14, absorbed: 60, mitigated: 74 });
  });

  it("notifies a CC attempt before immunity, and only accepted crowd control after interruption", () => {
    const events: string[] = [];
    const world = make();
    world.units[1].spec = { ...world.units[1].spec, hooks: { onCCAttempt: () => events.push("attempt"), onCCApplied: ({ self }) => events.push(self.action ? "still busy" : "applied") } };
    world.units[1].statuses.push(lasting("state", "ccImmune"));
    expect(applyCC(world, world.units[0], world.units[1], "stun", 1)).toBe(false);
    expect(events).toEqual(["attempt"]);
    world.units[1].statuses = [];
    world.units[1].action = { kind: "channel", ability: "R", startTick: 0, endTick: 90, nextTick: 90, intervalTicks: 90 };
    expect(applyCC(world, world.units[0], world.units[1], "stun", 1)).toBe(true);
    expect(events).toEqual(["attempt", "attempt", "applied"]);
  });

  it("a grounded displacement uses its ground origin and stops against terrain on that side", () => {
    const world = make();
    world.units[0].x = 0; world.units[1].x = 500;
    world.terrain.push({ id: 10, owner: 0, from: 300, to: 320, endTick: 90 });
    applyEffect(world, world.units[0], world.units[1], { type: "displace", direction: "away", originX: 600, distance: 400, duration: 1, stopAtWall: true }, { scale: 1 });
    advance(world, 31);
    expect(world.units[1].x).toBeCloseTo(355, 10);
    expect(world.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(false);
  });

  it("a zero-time ejection respects immunity and terrain without creating a lasting airborne status", () => {
    const world = make();
    world.units[1].x = 500;
    world.terrain.push({ id: 10, owner: 0, from: 600, to: 620, endTick: 90 });
    expect(immediateDisplace(world, world.units[0], world.units[1], 200)).toBe(true);
    expect(world.units[1].x).toBe(565);
    expect(world.units[1].statuses.some((s) => s.kind === "cc")).toBe(false);
    world.units[1].statuses.push(lasting("state", "displacementImmune"));
    expect(immediateDisplace(world, world.units[0], world.units[1], -100)).toBe(false);
    expect(world.units[1].x).toBe(565);
  });

  it("retains newly appended zones and honors cancellations made by an earlier landing callback", () => {
    const world = make();
    world.units[0].spec = { ...world.units[0].spec, hooks: { onZoneLand: ({ world }) => {
      world.zones = world.zones.filter((zone) => zone.id !== 2);
      world.zones.push({ id: 3, owner: 0, kind: "trap", seenTick: 0, x: -1000, radius: 10, startTick: 0, endTick: 90, memory: { count: 1 } });
    } } };
    world.zones.push({ id: 1, owner: 0, kind: "delayedArea", seenTick: 0, x: 0, radius: 10, startTick: 0, endTick: 0 });
    world.zones.push({ id: 2, owner: 0, kind: "trap", seenTick: 0, x: 0, radius: 10, startTick: 0, endTick: 90 });
    advanceZones(world);
    expect(world.zones.map((zone) => zone.id)).toEqual([3]);
    const branch = cloneWorld(world);
    branch.zones[0]!.memory!.count = 2;
    expect(world.zones[0]!.memory!.count).toBe(1);
  });

  it("leaves a contact trap armed when an untargetable unit crosses it", () => {
    const world = make();
    world.zones.push({ id: 1, owner: 0, kind: "trap", seenTick: 0, x: world.units[1].x, radius: 100, startTick: 0, endTick: 90 });
    world.units[1].statuses.push(lasting("state", "untargetable"));
    advanceZones(world);
    expect(world.zones).toHaveLength(1);
    world.units[1].statuses = [];
    advanceZones(world);
    expect(world.zones).toHaveLength(0);
  });

  it("a reveal exposes invisibility while retaining the observer's nearsight limit", () => {
    const world = make();
    world.units[1].statuses.push(lasting("state", "invisible"));
    expect(canSee(world.units[1], world.units[0])).toBe(false);
    world.units[1].statuses.push(lasting("state", "revealed"));
    expect(canSee(world.units[1], world.units[0])).toBe(true);
    world.units[0].statuses.push(lasting("cc", "nearsight", 10));
    expect(canSee(world.units[1], world.units[0])).toBe(false);
  });

  it.each(["Aatrox", "Kled", "Morgana"])("resurrection breaks %s's existing tether immediately", (id) => {
    const spec = kit(id).spec;
    const world = createWorld({ fighters: [spec, fighter()], distance: 0, modes: ["idle", "idle"] });
    world.units[0].memory.trapAt = 0;
    world.units[0].memory.shacklesUntil = 90;
    world.zones.push({ id: 20, owner: 0, kind: "delayedArea", ability: "Wtether", seenTick: 0, x: world.units[1].x, radius: 500, startTick: 0, endTick: 45 });
    beginResurrection(world, world.units[1], { duration: 6 });
    if (id === "Aatrox") expect(world.zones).toHaveLength(0);
    if (id === "Kled") expect(world.units[0].memory.trapAt).toBeUndefined();
    if (id === "Morgana") expect(world.units[0].memory.shacklesUntil).toBeUndefined();
  });
});
