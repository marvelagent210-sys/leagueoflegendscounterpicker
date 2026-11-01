import { describe, expect, it } from "vitest";
import { advanceMissiles, canCast, launchBonusAttack, notifyEnemyCast, startCast } from "../../engine/sim/actions";
import { abilityHitPet, applyEffect, canSee, dealDamage, heal } from "../../engine/sim/combat";
import { healthProtection, healthProtectionEligible } from "../../engine/sim/healthProtection";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { idle } from "./helpers";
import type { AbilitySpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { fighter } from "./kits";

function world(): World {
  const spec = fighter({ base: { hp: 1000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
  const w = createWorld({ fighters: [spec, spec], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxBranches: 1 } });
  w.units[0].x = 0; w.units[1].x = 100;
  return w;
}
function zone(w: World) {
  const z = { id: w.nextId++, owner: 0 as const, kind: "field" as const, seenTick: 0, startTick: 0, endTick: 120, x: 0, radius: 535, centered: true, noPets: true, healthProtection: { minimumHealthFraction: .1, preventHealingAtFloor: true } };
  w.zones.push(z); return z;
}
function summon(w: World, targetClass?: PetSpec["targetClass"]) {
  return spawnPet(w, w.units[1], { kind: "fixture", name: "Fixture", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 30, ...(targetClass ? { targetClass } : {}) }, 100);
}

describe("shared spatial health protection", () => {
  it.each([0, 1] as const)("clamps side %s to its own current maximum-health fraction", side => {
    const w = world(); zone(w); const target = w.units[side], source = w.units[1 - side]!;
    expect(dealDamage(w, source, target, 2000, "true")).toBe(900);
    expect(target.hp).toBe(100); expect(target.alive).toBe(true);
    expect(dealDamage(w, source, target, 2000, "true")).toBe(0);
  });
  it("denies subsequent packets before consuming shields at the threshold", () => {
    const w = world(); zone(w); const u = w.units[1]; u.hp = 100;
    applyEffect(w, u, u, { type: "shield", amount: { base: 50 }, duration: 3 }, { scale: 1 });
    expect(dealDamage(w, w.units[0], u, 100, "true")).toBe(0);
    expect(u.statuses.find(s => s.kind === "shield")?.value).toBe(50);
  });
  it("uses same-packet positions rather than a stale invulnerability status", () => {
    const w = world(); zone(w); const u = w.units[1]; u.hp = 100; u.x = 536;
    expect(healthProtection(w, u).invulnerable).toBe(false);
    expect(dealDamage(w, w.units[0], u, 500, "true")).toBe(100);
    expect(u.hp).toBeLessThanOrEqual(0);
  });
  it("has inclusive spatial endpoints and exclusive time endpoints", () => {
    const w = world(), z = zone(w); const u = w.units[1]; u.x = 535; u.hp = 100;
    expect(healthProtection(w, u).invulnerable).toBe(true);
    w.tick = 120; expect(healthProtection(w, u).minimumHealth).toBe(0);
    w.tick = -1; expect(healthProtection(w, u).minimumHealth).toBe(0);
    w.tick = 0; z.centered = false; u.x = 535 + u.spec.base.radius;
    expect(healthProtection(w, u).invulnerable).toBe(true);
  });
  it("blocks healing and life steal at the threshold but permits regeneration", () => {
    const w = world(); zone(w); const u = w.units[1]; u.hp = 100;
    heal(w, u, 100); heal(w, u, 100, false, true); expect(u.hp).toBe(100);
    heal(w, u, 10, true); expect(u.hp).toBe(110);
    heal(w, u, 20); expect(u.hp).toBe(130); expect(u.totals.healing).toBe(20);
  });
  it("does not alter Glory in Death's different healing exception", () => {
    const w = world(), u = w.units[1]; u.hp = 100;
    applyEffect(w, u, u, { type: "state", state: "noHealing", duration: 5 }, { scale: 1 });
    heal(w, u, 10, true); expect(u.hp).toBe(100);
    heal(w, u, 10, false, true); expect(u.hp).toBe(110);
    zone(w); u.hp = 100; heal(w, u, 10, false, true); expect(u.hp).toBe(100);
  });
  it("keeps zone floors against executes that override a legacy threshold", () => {
    const w = world(); zone(w); const u = w.units[1]; u.hp = 500;
    applyEffect(w, w.units[0], u, { type: "execute", threshold: { base: 1000 }, minimumHealthFloor: 0 }, { scale: 1 });
    expect(u.hp).toBe(100); expect(u.alive).toBe(true);
  });
  it("excludes resurrection and zombie/death-defied phases", () => {
    const w = world(); zone(w); const u = w.units[1];
    u.resurrection = { endTick: 30 }; expect(healthProtection(w, u).minimumHealth).toBe(0);
    delete u.resurrection; u.deathDefied = { endTick: 30 }; expect(healthProtection(w, u).minimumHealth).toBe(0);
    delete u.deathDefied; u.fallen = true; expect(healthProtectionEligible(w, u)).toBe(false);
  });
  it("does not exclude living untargetable units from protection", () => {
    const w = world(); zone(w); const u = w.units[1]; u.hp = 100;
    applyEffect(w, u, u, { type: "state", state: "untargetable", duration: 2 }, { scale: 1 });
    expect(healthProtection(w, u).invulnerable).toBe(true);
  });
  it("keeps spatial metadata independent when a probabilistic world forks", () => {
    const w = world(); zone(w); const copy = cloneWorld(w);
    copy.zones[0]!.healthProtection!.minimumHealthFraction = .2;
    expect(healthProtection(w, w.units[1]).minimumHealth).toBe(100);
    expect(healthProtection(copy, copy.units[1]).minimumHealth).toBe(200);
  });
  it.each(["minion", "monster"] as const)("protects a real %s pet against damage and executes", targetClass => {
    const w = world(); zone(w); const p = summon(w, targetClass);
    expect(damagePet(w, w.units[0], p, 5000, "true", false)).toBe(900); expect(p.hp).toBe(100);
    petEffects(w, w.units[0], p, [{ type: "execute", threshold: { base: 5000 }, minimumHealthFloor: 0 }]);
    expect(p.hp).toBe(100); expect(w.pets.includes(p)).toBe(true);
    p.x = 536; damagePet(w, w.units[0], p, 5000, "true", false); expect(w.pets.includes(p)).toBe(false);
  });
  it.each([undefined, "champion", "other"] as const)("does not invent protection for %s-class summons", targetClass => {
    const w = world(); zone(w); const p = summon(w, targetClass);
    expect(healthProtectionEligible(w, p)).toBe(false);
    damagePet(w, w.units[0], p, 5000, "true", false); expect(w.pets.includes(p)).toBe(false);
  });
  it("does not protect hit-count props even when given a minion class", () => {
    const w = world(); zone(w); const p = summon(w, "minion"); p.spec = { ...p.spec, hitPoints: true }; p.hp = 1;
    expect(healthProtectionEligible(w, p)).toBe(false);
    damagePet(w, w.units[0], p, 5000, "true", true); expect(w.pets.includes(p)).toBe(false);
  });
  it("writes healing back to the actual pet and respects its actual threshold", () => {
    const w = world(); zone(w); const p = summon(w, "minion"); p.hp = 100;
    const view = petFormulaTarget(p, w.units[0], w.tick);
    heal(w, view, 50); expect(p.hp).toBe(100);
    heal(w, view, 10, true); expect(p.hp).toBe(110);
    petEffects(w, w.units[1], p, [{ type: "heal", amount: { base: 50 } }]); expect(p.hp).toBe(160);
    w.tick = 120; p.hp = 100; heal(w, view, 50); expect(p.hp).toBe(150);
  });
  it("waives health costs only below the threshold, with ordinary payment at it", () => {
    const w = world(); zone(w); const u = w.units[0];
    const a: AbilitySpec = { key: "Q", name: "Health cost", slot: "Q", costType: "health", cost: 30, cooldown: 0, castTime: 0, delivery: { kind: "self" } };
    u.spec = { ...u.spec, abilities: [a] }; u.hp = 100;
    expect(canCast(w, u, a)).toBe(true); startCast(w, u, a); expect(u.hp).toBe(70);
    startCast(w, u, a); expect(u.hp).toBe(70);
    u.hp = 10; expect(canCast(w, u, a)).toBe(true); startCast(w, u, a); expect(u.hp).toBe(10);
    u.x = 536; expect(canCast(w, u, a)).toBe(false);
  });
  it.each([70, 100, 120])("applies the same strict health-cost rule when a cast is interrupted at %s HP", hp => {
    const w = world(); zone(w); const u = w.units[0]; u.hp = hp;
    const a: AbilitySpec = { key: "Q", name: "Interrupted health cost", slot: "Q", costType: "health", cost: 30, cooldown: 1, castTime: 1, delivery: { kind: "self" }, interruptible: {} };
    u.spec = { ...u.spec, abilities: [a] }; startCast(w, u, a);
    applyEffect(w, w.units[1], u, { type: "cc", cc: "stun", duration: 1 }, { scale: 1 });
    expect(u.hp).toBe(hp < 100 ? hp : hp - 30); expect(u.action).toBeUndefined();
  });
});

describe("selective activation and sight rules", () => {
  it("allows silence alone without bypassing polymorph, stun, suppression, root or ground", () => {
    const w = world(), u = w.units[0];
    const a: AbilitySpec = { key: "Q", name: "Activation", slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { usableWhileSilenced: true } };
    applyEffect(w, w.units[1], u, { type: "cc", cc: "silence", duration: 2 }, { scale: 1 });
    expect(canCast(w, u, a)).toBe(true); expect(canCast(w, u, { ...a, flags: {} })).toBe(false);
    for (const cc of ["polymorph", "stun", "suppression"] as const) {
      u.statuses = u.statuses.filter(s => s.key === "silence");
      applyEffect(w, w.units[1], u, { type: "cc", cc, duration: 2 }, { scale: 1 }); expect(canCast(w, u, a)).toBe(false);
    }
    for (const cc of ["root", "ground"] as const) {
      u.statuses = []; applyEffect(w, w.units[1], u, { type: "cc", cc, duration: 2 }, { scale: 1 });
      expect(canCast(w, u, { ...a, flags: { ...a.flags, grounded: true } })).toBe(false);
      expect(canCast(w, u, a)).toBe(true);
    }
  });
  it("reports a manual activation exactly once without inventing another cast", () => {
    const w = world(), u = w.units[0], v = w.units[1];
    const a: AbilitySpec = { key: "Q", name: "Activation", slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" } };
    u.spec = { ...u.spec, abilities: [a], hooks: { onCast: c => { c.memory.own = Number(c.memory.own ?? 0) + 1; } } };
    v.spec = { ...v.spec, hooks: { onEnemyCast: c => { c.memory.seen = Number(c.memory.seen ?? 0) + 1; expect(c.caster).toBe(u); } } };
    notifyEnemyCast(w, u, a); expect(v.memory.seen).toBe(1); expect(u.memory.own).toBeUndefined();
    startCast(w, u, a); expect(v.memory.seen).toBe(2); expect(u.memory.own).toBe(1);
    startCast(w, u, { ...a, countsAsCast: false }); expect(v.memory.seen).toBe(2); expect(u.memory.own).toBe(2);
  });
  it("limits sight around the field anchor even through CC immunity and cleanse", () => {
    const w = world(), viewer = w.units[0], target = w.units[1];
    applyEffect(w, viewer, viewer, { type: "state", state: "ccImmune", duration: 5 }, { scale: 1 });
    applyEffect(w, w.units[1], viewer, { type: "state", state: "sightLimit", value: 250, duration: 5 }, { scale: 1 });
    viewer.statuses.find(s => s.key === "sightLimit")!.x = 100;
    viewer.x = -100; target.x = 345; expect(canSee(target, viewer)).toBe(true);
    target.x = 351; expect(canSee(target, viewer)).toBe(false);
    applyEffect(w, viewer, viewer, { type: "cleanse" }, { scale: 1 }); expect(canSee(target, viewer)).toBe(false);
    viewer.statuses = []; expect(canSee(target, viewer)).toBe(true);
  });
  it("keeps anchored nearsight consistent with smoke while retaining ordinary viewer-centered sight", () => {
    const w = world(), viewer = w.units[0], target = w.units[1];
    applyEffect(w, target, viewer, { type: "cc", cc: "nearsight", duration: 5, strength: 250 }, { scale: 1 });
    const sight = viewer.statuses.find(s => s.key === "nearsight")!;
    viewer.x = 400; target.x = 800; sight.x = 600;
    expect(canSee(target, viewer)).toBe(true);
    target.x = 851; expect(canSee(target, viewer)).toBe(false);
    delete sight.x; target.x = 650; expect(canSee(target, viewer)).toBe(true);
    target.x = 651; expect(canSee(target, viewer)).toBe(false);
  });
  it("detects camouflage only within the actual champion radius and preserves independent sight restrictions", () => {
    const w = world(), viewer = w.units[0], target = w.units[1];
    applyEffect(w, target, target, { type: "state", state: "camouflage", value: 400, duration: 5 }, { scale: 1 });
    target.x = 400; expect(canSee(target, viewer)).toBe(true);
    target.x = 401; expect(canSee(target, viewer)).toBe(false);
    target.x = 50; const pet = summon(w, "champion"), actor = petFormulaTarget(pet, viewer, w.tick); actor.side = viewer.side;
    expect(canSee(target, actor)).toBe(false);
    applyEffect(w, target, target, { type: "state", state: "revealed", duration: 5 }, { scale: 1 });
    target.x = 500; expect(canSee(target, viewer)).toBe(true); expect(canSee(target, actor)).toBe(true);
    applyEffect(w, target, viewer, { type: "cc", cc: "nearsight", duration: 5, strength: 250 }, { scale: 1 });
    expect(canSee(target, viewer)).toBe(false);
    viewer.statuses = []; target.statuses = target.statuses.filter(s => s.key !== "revealed"); target.x = 100;
    applyEffect(w, target, target, { type: "state", state: "invisible", duration: 5 }, { scale: 1 });
    expect(canSee(target, viewer)).toBe(false);
  });
  it("requires explicit alternative-attack support before damaging a hit-count prop", () => {
    const w = world(), p = summon(w, "minion"); p.spec = { ...p.spec, hitPoints: true }; p.hp = 3;
    const a: AbilitySpec = { key: "Q", name: "Alternative attack", slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "target", range: 500 }, flags: { basicDamage: true, petContactHooks: true, parry: true } };
    const effects = [{ type: "damage" as const, damageType: "physical" as const, amount: { base: 1000 } }];
    abilityHitPet(w, w.units[0], p, a, effects); expect(p.hp).toBe(3);
    abilityHitPet(w, w.units[0], p, { ...a, flags: { ...a.flags, petBasicAttack: true } }, effects); expect(p.hp).toBe(2);
    p.statuses = [{ kind: "state", key: "dodgeAttacks", value: 1, source: 1, startTick: 0, endTick: 100 }];
    abilityHitPet(w, w.units[0], p, { ...a, flags: { ...a.flags, appliesOnHit: true, petBasicAttack: true } }, effects); expect(p.hp).toBe(2);
    p.statuses[0]!.key = "parry";
    abilityHitPet(w, w.units[0], p, { ...a, flags: { ...a.flags, petBasicAttack: true } }, effects); expect(p.hp).toBe(2);
  });
  it("lets an actual pet use its champion owner's camouflage detection without detecting by itself", () => {
    const w = world(), owner = w.units[0], target = w.units[1]; target.x = 500;
    applyEffect(w, target, target, { type: "state", state: "camouflage", value: 400, duration: 5 }, { scale: 1 });
    const p = spawnPet(w, owner, { kind: "detectorFixture", name: "Detector fixture", hp: 100, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10, attack: { range: 100, interval: 1, windup: 0, attackLike: true, effects: [{ type: "damage", damageType: "true", amount: { base: 10 } }] } }, 450);
    advancePets(w); expect(target.hp).toBe(1000); expect(p.nextAttackTick).toBe(0);
    owner.x = 100; advancePets(w); expect(target.hp).toBe(990);
    target.statuses.push({ kind: "state", key: "invisible", source: 1, value: 1, startTick: 0, endTick: 100 }); p.nextAttackTick = 0;
    advancePets(w); expect(target.hp).toBe(990);
  });
});

describe("committed pet projectiles", () => {
  it.each([0, 1] as const)("resolves side %s's launched missile after its owner and pet die", side => {
    const w = world(), owner = w.units[side], target = w.units[1 - side]!;
    const p = spawnPet(w, owner, { kind: "sentry", name: "Sentry", hp: 100, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10 }, owner.x);
    target.x = owner.x + (side === 0 ? 500 : -500); target.hp = 5;
    w.petMissiles = [{ id: w.nextId++, owner: side, pet: p.id, target: target.side, x: p.x, perTick: 20, projectile: true, effects: [{ type: "damage", damageType: "true", amount: { base: 10 } }], blinded: false, attackLike: true, sourcePet: { ...p, memory: {} } }];
    w.pets = []; dealDamage(w, target, owner, 5000, "true");
    step(w, [idle, idle]); expect(w.result).toBeUndefined();
    while (!w.result && w.tick < 60) step(w, [idle, idle]);
    expect(w.result?.winner).toBe("draw"); expect(target.hp).toBeLessThanOrEqual(0); expect(w.petMissiles).toHaveLength(0);
  });
  it("delays escape only for pet projectiles targeting the fleeing champion", () => {
    const w = world(), owner = w.units[0], target = w.units[1];
    const p = spawnPet(w, owner, { kind: "sentry", name: "Sentry", hp: 100, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10 }, owner.x);
    w.modes[1] = "flee"; target.x = 2000;
    w.petMissiles = [{ id: w.nextId++, owner: 0, pet: p.id, target: 1, x: p.x, perTick: 20, projectile: true, effects: [{ type: "damage", damageType: "true", amount: { base: 10 } }], blinded: false, attackLike: true, sourcePet: { ...p, memory: {} } }];
    step(w, [idle, idle]); expect(w.result).toBeUndefined();
    w.petMissiles[0]!.target = { pet: p.id };
    step(w, [idle, idle]); expect(w.result?.reason).toBe("escaped");
  });
});

describe("independent overlay cast and dash clocks", () => {
  it.each([0, 1] as const)("delivers side %s's cast on its own clock while preserving the moving dash", side => {
    const w = world(), u = w.units[side]; w.units[1 - side]!.x = u.x + (side === 0 ? 1000 : -1000);
    const dash: AbilitySpec = { key: "E", name: "Dash", slot: "E", cooldown: 1, castTime: 0, delivery: { kind: "dash", direction: "away", distance: 300, speed: 300 } };
    const spell: AbilitySpec = { key: "Q", name: "Overlay", slot: "Q", cooldown: 1, castTime: .25, deliveryDuringCastAt: .2, overlay: true, cost: 20, delivery: { kind: "line", range: 2000, width: 10, speed: 300 }, flags: { projectile: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 10 } }] };
    u.spec = { ...u.spec, base: { ...u.spec.base, resource: 100, resourceRegen: 0 }, abilities: [dash, spell], hooks: { onCast: c => { c.memory[`done:${c.ability.key}`] = Number(c.memory[`done:${c.ability.key}`] ?? 0) + 1; } } }; u.resource = 100;
    const startX = u.x; startCast(w, u, dash); const movement = u.action;
    expect(canCast(w, u, spell)).toBe(true); startCast(w, u, spell);
    while (w.tick <= 5) step(w, [idle, idle]); expect(w.missiles).toHaveLength(0);
    step(w, [idle, idle]); expect(w.missiles).toHaveLength(1); expect(u.action).toBe(movement); expect(u.resource).toBe(100);
    while (w.tick <= 8) step(w, [idle, idle]); expect(u.action).toBe(movement); expect(u.resource).toBe(80); expect(u.memory['done:Q']).toBe(1);
    expect(u.action?.kind === 'dash' && u.action.resume).toBeUndefined(); expect(u.x).not.toBe(startX);
    while (w.tick <= 31) step(w, [idle, idle]); expect(u.action).toBeUndefined(); expect(u.memory['done:Q']).toBe(1); expect(u.resource).toBe(80);
  });
});

describe("conditional packets and deterministic spatial pet contacts", () => {
  it.each([[false, false], [true, false], [false, true], [true, true]])("keeps their independent shares for onHitToPets=%s, piercing=%s", (onHitToPets, piercing) => {
    const w = world(), u = w.units[0]; w.units[1].x = 1000;
    u.spec = { ...u.spec, base: { ...u.spec.base, ad: 100 }, attack: { range: 500, ranged: true, projectile: true, missileSpeed: 600, onHitToPets, onHit: [{ type: "damage", damageType: "magic", amount: { base: 20 } }] }, hooks: { onAttackPetHit: c => { c.memory.weight = c.scale; } } };
    const p = summon(w, "champion"); launchBonusAttack(w, u, p);
    const missile = w.missiles[0]!; missile.scale = .25;
    if (piercing) { missile.homing = false; missile.piercing = true; missile.collisionPet = true; missile.travelLeft = 200; }
    for (let i = 0; i < 12; i++) { advanceMissiles(w); w.tick++; }
    const share = piercing ? 1 : .25;
    expect(p.hp).toBe(1000 - (onHitToPets ? 120 : 100) * share); expect(u.memory.weight).toBe(share);
  });
});
