import { describe, expect, it } from "vitest";
import { advanceMissiles } from "../../engine/sim/actions";
import { advanceSpecialMissile } from "../../engine/sim/projectiles";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Missile, type World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { lasting } from "./helpers";

const shot = ability({ key: "Q", delivery: { kind: "line", range: 500, width: 20, speed: 1500 } });
const noWall = () => false;
const damage = { type: "damage" as const, damageType: "true" as const, amount: { base: 50 } };

function setup(hooks?: KitHooks, target?: FighterSpec): World {
  const world = createWorld({ fighters: [fighter({ base: { radius: 10 }, abilities: [shot], hooks }), target ?? fighter({ base: { radius: 10 } })], distance: 100, modes: ["idle", "idle"] });
  world.units[0].x = 0;
  world.units[1].x = 100;
  return world;
}

function missile(world: World, overrides: Partial<Missile> = {}): Missile {
  const m: Missile = { id: world.nextId++, owner: 0, source: "Q", seenTick: 0, x: 0, perTick: 50, homing: false, direction: 1, travelLeft: 300, projectile: true, connects: true, scale: 1, onHit: [damage], piercing: true, ...overrides };
  world.missiles.push(m);
  return m;
}

function pet(world: World, x: number, overrides: Partial<PetSpec> = {}, owner: 0 | 1 = 1) {
  return spawnPet(world, world.units[owner], { kind: "test", name: "Test pet", hp: 100, armor: 0, mr: 0, radius: 5, moveSpeed: 0, duration: Infinity, ...overrides }, x);
}

describe("opt-in piercing and returning missiles", () => {
  it("delivers at the first contact point, then continues the unused tick without duplicate hits", () => {
    const contacts: number[] = [];
    const world = setup({ onMissileContact: ({ missile }) => contacts.push(missile.x) });
    const m = missile(world);
    expect(advanceSpecialMissile(world, m, noWall)).toBe(true);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(advanceSpecialMissile(world, m, noWall)).toBe(true);
    expect(contacts).toEqual([90]);
    expect(m.x).toBe(100);
    expect(m.hitTargets).toEqual([1]);
    advanceSpecialMissile(world, m, noWall);
    m.direction = -1;
    advanceSpecialMissile(world, m, noWall);
    expect(world.units[1].totals.damageTaken).toBe(50);
    expect(contacts).toEqual([90]);
  });

  it("uses explicit missile radius, including exact reflected hitbox boundaries", () => {
    for (const direction of [1, -1] as const) {
      const world = setup();
      world.units[1].x = direction * (75 + 1e-12);
      const m = missile(world, { direction, perTick: 50, radius: 15 });
      advanceSpecialMissile(world, m, noWall);
      expect(world.units[1].totals.damageTaken).toBe(50);
      expect(m.x).toBe(direction * 50);
    }
  });

  it.each(["spellShield", "parry"])("counts a %s contact once even when its damage is negated", (state) => {
    let contacts = 0;
    const world = setup({ onMissileContact: () => { contacts++; } });
    world.units[1].statuses.push(lasting("state", state));
    const m = missile(world, { perTick: 100 });
    advanceSpecialMissile(world, m, noWall);
    advanceSpecialMissile(world, m, noWall);
    expect(contacts).toBe(1);
    expect(m.hitTargets).toEqual([1]);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it.each(["untargetable", "stasis"])("ignores %s hitboxes without consuming the pass", (state) => {
    let contacts = 0;
    const world = setup({ onMissileContact: () => { contacts++; } });
    world.units[1].statuses.push(lasting("state", state));
    const m = missile(world, { perTick: 90 });
    advanceSpecialMissile(world, m, noWall);
    expect(m.hitTargets).toBeUndefined();
    expect(contacts).toBe(0);
    world.units[1].statuses = [];
    advanceSpecialMissile(world, m, noWall);
    expect(contacts).toBe(1);
    expect(world.units[1].totals.damageTaken).toBe(50);
  });

  it("can hit an invisible champion and does not depend on owner survival", () => {
    const world = setup();
    world.units[0].alive = false;
    world.units[1].statuses.push(lasting("state", "invisible"));
    const m = missile(world, { perTick: 100 });
    advanceSpecialMissile(world, m, noWall);
    expect(world.units[1].totals.damageTaken).toBe(50);
  });

  it("missed champion branches keep flying and do not consume a hit ledger", () => {
    let contacts = 0;
    const world = setup({ onMissileContact: () => { contacts++; } });
    const m = missile(world, { perTick: 100, connects: false });
    advanceSpecialMissile(world, m, noWall);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(m.hitTargets).toBeUndefined();
    expect(contacts).toBe(0);
    expect(m.x).toBe(100);
  });

  it("uses separate ledgers for an outward and return pass", () => {
    const world = setup();
    const outward = missile(world, { perTick: 100 });
    advanceSpecialMissile(world, outward, noWall);
    const returning = missile(world, { x: 150, direction: -1, perTick: 100, followOwner: true });
    advanceSpecialMissile(world, returning, noWall);
    expect(world.units[1].totals.damageTaken).toBe(100);
    expect(outward.hitTargets).toEqual([1]);
    expect(returning.hitTargets).toEqual([1]);
  });

  it("damages each enemy pet once in path order, using each pet's area modifier", () => {
    const positions: number[] = [];
    const world = setup({ onMissileContact: ({ missile }) => positions.push(missile.x) });
    const far = pet(world, 80, { areaTaken: 0.4 });
    const near = pet(world, 50);
    const m = missile(world, { perTick: 200, collisionPet: true });
    advanceSpecialMissile(world, m, noWall);
    expect(positions).toEqual([45, 75, 90]);
    expect(near.hp).toBe(50);
    expect(far.hp).toBe(80);
    expect(m.hitPets).toEqual([near.id, far.id]);
    m.direction = -1;
    advanceSpecialMissile(world, m, noWall);
    expect(near.hp).toBe(50);
    expect(far.hp).toBe(80);
  });

  it("excludes allied pets, untargetable pets and hit-count props from spell collision", () => {
    const world = setup();
    const own = pet(world, 20, {}, 0);
    const hidden = pet(world, 30, { untargetable: true });
    const prop = pet(world, 40, { hitPoints: true });
    const m = missile(world, { perTick: 100, collisionPet: true });
    advanceSpecialMissile(world, m, noWall);
    expect([own.hp, hidden.hp, prop.hp]).toEqual([100, 100, 100]);
    expect(m.hitPets).toBeUndefined();
    expect(m.hitTargets).toEqual([1]);
  });

  it("honors amountFor against the actual contacted pet and supplies ability provenance", () => {
    const seen: Array<{ raw: number; ability?: string }> = [];
    const world = setup();
    const victim = pet(world, 50, { hp: 200, mr: 100, areaTaken: 0.5, onDamaged: ({ raw, ability }) => seen.push({ raw, ability }) });
    const m = missile(world, { perTick: 100, collisionPet: true, onHit: [{ type: "damage", damageType: "magic", amount: { base: 9999 }, amountFor: (_, target) => target.spec.base.hp * 0.1 + target.hp * 0.1 }] });
    advanceSpecialMissile(world, m, noWall);
    expect(victim.hp).toBe(190);
    expect(seen).toEqual([{ raw: 20, ability: "Q" }]);
  });

  it("evaluates pet-target formulas and minimums without reading the enemy champion's stats", () => {
    const world = setup();
    const victim = pet(world, 50, { hp: 100, armor: 40 });
    const m = missile(world, { perTick: 100, collisionPet: true, onHit: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { targetMaxHP: 0.1, targetArmor: 0.5 } }, minimum: { base: 35 } }] });
    advanceSpecialMissile(world, m, noWall);
    expect(victim.hp).toBe(65);
  });

  it("stationary pets still collide in a champion miss/expected-value branch", () => {
    const world = setup();
    const victim = pet(world, 50);
    const m = missile(world, { perTick: 100, collisionPet: true, connects: false, scale: 0.1 });
    advanceSpecialMissile(world, m, noWall);
    expect(victim.hp).toBe(50);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("allows shatter to extend remaining range and change speed at the real pet contact", () => {
    const world = setup({ onMissileContact: ({ missile, targetPet }) => {
      if (!targetPet) return;
      missile.piercing = true;
      missile.travelLeft = 90 - missile.x;
      missile.perTick = 20;
    } });
    pet(world, 15);
    const m = missile(world, { perTick: 100, travelLeft: 20, piercing: false, collisionPet: true });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(true);
    expect(m.x).toBe(28);
    expect(m.travelLeft).toBe(62);
    expect(m.hitPets).toHaveLength(1);
  });

  it("can reverse direction at contact using the tick's remaining time", () => {
    const world = setup({ onMissileContact: ({ missile }) => { missile.direction = -1; } });
    const m = missile(world, { perTick: 100 });
    advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(80);
    expect(m.travelLeft).toBe(200);
  });

  it("a contact may widen the remaining flight and replace only its later damage packets", () => {
    const world = setup({ onMissileContact: ({ missile, targetPet }) => {
      if (!targetPet) return;
      missile.radius = 15;
      missile.onHit = [{ ...damage, amount: { base: 25 } }];
    } });
    const first = pet(world, 25);
    const second = pet(world, 70);
    const m = missile(world, { perTick: 100, collisionPet: true });
    advanceSpecialMissile(world, m, noWall);
    expect(first.hp).toBe(50);
    expect(second.hp).toBe(75);
    expect(world.units[1].totals.damageTaken).toBe(25);
    expect(m.hitPets).toEqual([first.id, second.id]);
  });

  it("non-piercing pet collision ends at the first target, before a farther champion", () => {
    const reasons: string[] = [];
    const world = setup({ onMissileEnd: ({ reason }) => reasons.push(reason) });
    const victim = pet(world, 50);
    const m = missile(world, { perTick: 100, piercing: false, collisionPet: true });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(victim.hp).toBe(50);
    expect(m.x).toBe(45);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(reasons).toEqual(["range"]);
  });

  it("checks blockers up to each contact, so a later wall does not erase an earlier hit", () => {
    const reasons: string[] = [];
    const world = setup({ onMissileEnd: ({ reason }) => reasons.push(reason) });
    const victim = pet(world, 50);
    const m = missile(world, { perTick: 150, collisionPet: true });
    const wall = (_: World, __: Missile, from: number, to: number) => from <= 70 && to >= 70;
    expect(advanceSpecialMissile(world, m, wall)).toBe(false);
    expect(victim.hp).toBe(50);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(reasons).toEqual(["blocked"]);
  });

  it("a wall before contact prevents its ledger, damage and contact callback", () => {
    let contacts = 0;
    const world = setup({ onMissileContact: () => { contacts++; } });
    const m = missile(world, { perTick: 100 });
    expect(advanceSpecialMissile(world, m, () => true)).toBe(false);
    expect(contacts).toBe(0);
    expect(m.hitTargets).toBeUndefined();
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("stops exactly at a finite range and emits a single end event", () => {
    const ends: Array<{ x: number; reason: string }> = [];
    const world = setup({ onMissileEnd: ({ missile, reason }) => ends.push({ x: missile.x, reason }) });
    world.units[1].x = 1000;
    const m = missile(world, { perTick: 100, travelLeft: 75 });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(m.x).toBe(75);
    expect(m.travelLeft).toBe(0);
    expect(ends).toEqual([{ x: 75, reason: "range" }]);
  });

  it("contact at the final tick's endpoint does not postpone the end callback", () => {
    const events: string[] = [];
    const world = setup({ onMissileContact: () => events.push("contact"), onMissileEnd: ({ reason }) => events.push(reason) });
    const m = missile(world, { perTick: 90, travelLeft: 90 });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(world.units[1].totals.damageTaken).toBe(50);
    expect(m.x).toBe(90);
    expect(events).toEqual(["contact", "range"]);
  });

  it.each([0, -1])("a zero or spent range (%s) ends without moving", (travelLeft) => {
    let ends = 0;
    const world = setup({ onMissileEnd: () => { ends++; } });
    const m = missile(world, { travelLeft });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(m.x).toBe(0);
    expect(ends).toBe(1);
  });

  it("follows a moving owner's center, can flip axis and survives the owner's death", () => {
    const ends: string[] = [];
    const world = setup({ onMissileEnd: ({ reason }) => ends.push(reason) });
    world.units[1].x = 1000;
    const m = missile(world, { x: 100, direction: -1, perTick: 30, travelLeft: Infinity, followOwner: true });
    advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(70);
    world.units[0].x = 120;
    world.units[0].alive = false;
    advanceSpecialMissile(world, m, noWall);
    expect(m.direction).toBe(1);
    expect(m.x).toBe(100);
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(m.x).toBe(120);
    expect(ends).toEqual(["owner"]);
  });

  it("a return ends at the owner center without overshooting into an enemy farther away", () => {
    const world = setup();
    world.units[0].x = 50;
    world.units[1].x = 120;
    const m = missile(world, { x: 0, perTick: 200, travelLeft: Infinity, followOwner: true });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(m.x).toBe(50);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("caller-supplied expiry ends before further movement and cannot fire twice", () => {
    const reasons: string[] = [];
    const world = setup({ onMissileEnd: ({ reason }) => reasons.push(reason) });
    const m = missile(world, { expiresTick: 2 });
    world.tick = 1;
    expect(advanceSpecialMissile(world, m, noWall)).toBe(true);
    world.tick = 2;
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(advanceSpecialMissile(world, m, noWall)).toBe(false);
    expect(m.x).toBe(50);
    expect(reasons).toEqual(["range"]);
  });

  it("applies supplied positive acceleration after movement and caps the next velocity", () => {
    const world = setup();
    world.units[1].x = 1000;
    const m = missile(world, { perTick: 10, acceleration: { perTick: 8, maxPerTick: 20 } });
    advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(10);
    expect(m.perTick).toBe(18);
    advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(28);
    expect(m.perTick).toBe(20);
  });

  it("applies signed deceleration after movement without crossing its supplied speed floor", () => {
    const world = setup();
    world.units[1].x = 1000;
    const m = missile(world, { perTick: 20, acceleration: { perTick: -8, maxPerTick: 20, minPerTick: 5 } });
    for (let i = 0; i < 3; i++) advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(37);
    expect(m.perTick).toBe(5);
  });

  it("zero initial velocity can accelerate without inventing displacement or lifetime", () => {
    const world = setup();
    const m = missile(world, { perTick: 0, acceleration: { perTick: 5, maxPerTick: 10 } });
    expect(advanceSpecialMissile(world, m, noWall)).toBe(true);
    expect(m.x).toBe(0);
    expect(m.perTick).toBe(5);
    advanceSpecialMissile(world, m, noWall);
    expect(m.x).toBe(5);
  });

  it("branches own independent pass ledgers, acceleration and terminal state", () => {
    const world = setup();
    const victim = pet(world, 25);
    const m = missile(world, { perTick: 30, collisionPet: true, hitTargets: [0], acceleration: { perTick: 5, maxPerTick: 100, minPerTick: 10 } });
    advanceSpecialMissile(world, m, noWall);
    const branch = cloneWorld(world);
    const copied = branch.missiles[0]!;
    expect(copied.hitPets).toEqual([victim.id]);
    expect(copied.hitPets).not.toBe(m.hitPets);
    expect(copied.hitTargets).not.toBe(m.hitTargets);
    expect(copied.acceleration).not.toBe(m.acceleration);
    m.hitPets!.push(999);
    m.hitTargets!.push(1);
    m.acceleration!.perTick = -50;
    m.ended = true;
    expect(copied.hitPets).toEqual([victim.id]);
    expect(copied.hitTargets).toEqual([0]);
    expect(copied.acceleration!.perTick).toBe(5);
    expect(copied.ended).toBeUndefined();
    advanceSpecialMissile(branch, copied, noWall);
    expect(branch.pets[0]!.hp).toBe(50);
  });

  it("actions keep new return missiles for the next tick instead of advancing them immediately", () => {
    const world = setup({ onMissileEnd: ({ world, missile: ended, reason }) => {
      if (reason === "range" && !ended.followOwner) missile(world, { x: ended.x, followOwner: true, perTick: 30, travelLeft: Infinity, onHit: [] });
    } });
    world.units[1].x = 1000;
    missile(world, { perTick: 100, travelLeft: 75 });
    advanceMissiles(world);
    expect(world.missiles).toHaveLength(1);
    expect(world.missiles[0]!.x).toBe(75);
    advanceMissiles(world);
    expect(world.missiles[0]!.x).toBe(45);
  });
});
