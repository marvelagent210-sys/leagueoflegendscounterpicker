import { describe, expect, it } from "vitest";
import { applyCC, applyEffect, dealDamage } from "../../engine/sim/combat";
import { advanceMissiles, advanceZones, startCast } from "../../engine/sim/actions";
import { advancePets, damagePet, petEffects, spawnPet } from "../../engine/sim/pets";
import { petAttackActor } from "../../engine/sim/petCombat";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld } from "../../engine/sim/state";
import { derive } from "../../engine/sim/derived";
import type { PetSpec } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";
import { idle, lasting } from "./helpers";

// Setup distance is edge-to-edge; two 65-radius bodies have centers 400 apart.
const world = () => createWorld({ fighters: [fighter(), fighter()], distance: 270, modes: ["idle", "idle"] });
const petSpec: PetSpec = { kind: "real-minion", name: "Real minion", targetClass: "minion", hp: 500, armor: 100, mr: 100, radius: 30, moveSpeed: 300, duration: 30 };

describe("captured circle cast origins", () => {
  it.each([0, 1] as const)("launches side %s from its declaration position and clamps its aim there", side => {
    const w = world(), caster = w.units[side];
    const from = caster.x, direction = side === 0 ? 1 : -1;
    const spell = ability({ key: "lob", castTime: 0.1, castOrigin: "start", castDirection: "start", delivery: { kind: "circle", range: 300, radius: 100, speed: 300, delay: 0.2 } });
    caster.spec.abilities.push(spell);
    startCast(w, caster, spell, { direction: 1, distance: 500 });
    caster.x += direction * 100;
    w.tick = 3;
    step(w, [idle, idle]);
    expect(w.zones[0]?.x).toBe(from + direction * 300);
    expect(w.missiles[0]?.x).toBe(from);
    expect(w.missiles[0]?.travelLeft).toBe(300);
  });
  it("clamps an unaimed landing from the captured origin after caster movement", () => {
    const w = world(), caster = w.units[0];
    const spell = ability({ key: "lob", castTime: 0.1, castOrigin: "start", castDirection: "start", delivery: { kind: "circle", range: 300, radius: 100, speed: 300, delay: 0.2 } });
    caster.spec.abilities.push(spell);
    startCast(w, caster, spell);
    caster.x = 150;
    w.tick = 3; step(w, [idle, idle]);
    expect(w.zones[0]?.x).toBe(300);
    expect(w.missiles[0]?.travelLeft).toBe(300);
  });
  it.each([false, true])("retains a delayed area's actual origin and probability weight on pets with contact hooks: %s", petContactHooks => {
    const w = world(), [caster, owner] = w.units;
    const origins: number[] = [];
    const spell = ability({ key: "ground", delivery: { kind: "circle", range: 500, radius: 100, delay: 1 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }], flags: { petContactHooks } });
    caster.spec.abilities.push(spell);
    caster.spec.hooks = { onAbilityContact(c) { if (c.enemy.petId !== undefined) origins.push(c.originX); } };
    const pet = spawnPet(w, owner, { ...petSpec, moveSpeed: 0 }, 400);
    startCast(w, caster, spell, { direction: 1, distance: 400 });
    w.zones[0]!.scale = 0.25;
    w.tick = 30; advanceZones(w);
    expect(pet.hp).toBe(487.5);
    expect(origins).toEqual(petContactHooks ? [400] : []);
  });
  it.each([0, 1] as const)("retains side %s's declared ground point after both bodies move", side => {
    const w = world(), caster = w.units[side], enemy = w.units[1 - side]!;
    const from = caster.x, dir = side === 0 ? 1 : -1;
    const spell = ability({ key: "declared-ground", castTime: 0.1, captureGroundAim: "start", castOrigin: "start", delivery: { kind: "circle", range: 300, radius: 100, delay: 0.2, speed: 300 } });
    caster.spec.abilities.push(spell);
    startCast(w, caster, spell);
    caster.x += dir * 50; enemy.x += dir * 300;
    w.tick = 3; step(w, [idle, idle]);
    expect(w.zones[0]?.x).toBe(from + dir * 300);
    expect(w.missiles[0]?.x).toBe(from);
    expect(w.missiles[0]?.travelLeft).toBe(300);
  });
  it("flies toward an explicitly selected backward ground point", () => {
    const w = world(), caster = w.units[0];
    const spell = ability({ key: "backward", delivery: { kind: "circle", range: 300, radius: 100, delay: 0, speed: 300 } });
    caster.spec.abilities.push(spell);
    startCast(w, caster, spell, { direction: -1, distance: 200 });
    expect(w.zones[0]?.x).toBe(-200);
    expect(w.missiles[0]?.direction).toBe(-1);
    expect(w.missiles[0]?.travelLeft).toBe(200);
  });
  it("uses a dynamic circle radius for the probability decision and actual zone", () => {
    const w = world(), caster = w.units[0];
    const spell = ability({ key: "small-ground", delivery: { kind: "circle", range: 100, radius: 400, radiusFor: () => 50, delay: 1 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    caster.spec.abilities.push(spell);
    const split = startCast(w, caster, spell);
    expect(w.zones[0]?.radius).toBe(50);
    expect(w.zones[0]?.connects).toBe(false);
    expect(split).toBeUndefined();
    w.tick = 30; advanceZones(w);
    expect(w.units[1].hp).toBe(2000);
  });
  it.each([0, 1] as const)("keeps side %s's uncaptured ground target in range if the enemy crosses its captured facing", side => {
    const w = world(), caster = w.units[side], enemy = w.units[1 - side]!;
    const origin = caster.x, facing = side === 0 ? 1 : -1;
    const shot = ability({ key: "crossed-ground", castTime: 0.1, castOrigin: "start", castDirection: "start", delivery: { kind: "circle", range: 300, radius: 100, speed: 300, delay: 0 } });
    caster.spec.abilities.push(shot);
    startCast(w, caster, shot);
    enemy.x = origin - facing * 1000;
    w.tick = 3; step(w, [idle, idle]);
    expect(w.zones[0]?.x).toBe(origin - facing * 300);
    expect(w.missiles[0]?.direction).toBe(-facing);
    expect(w.missiles[0]?.travelLeft).toBe(300);
  });
});

describe("placed fear origins", () => {
  it.each([0, 1] as const)("moves side %s away from its placed epicenter even when that approaches the caster", side => {
    const w = world(), target = w.units[side], caster = w.units[1 - side]!;
    const origin = target.x + (side === 0 ? -100 : 100);
    applyEffect(w, caster, target, { type: "cc", cc: "fear", duration: 1, fearOriginX: origin }, { scale: 1 });
    const from = target.x;
    step(w, [idle, idle]);
    expect(target.x - from).toBeCloseTo((side === 0 ? 1 : -1) * 350 / 30, 10);
  });
  it("keeps a zero epicenter fixed when the caster moves", () => {
    const w = world(), [caster, target] = w.units;
    target.x = 200;
    applyEffect(w, caster, target, { type: "cc", cc: "fear", duration: 1, fearOriginX: 0 }, { scale: 1 });
    caster.x = 500;
    step(w, [idle, idle]);
    expect(target.x).toBeCloseTo(200 + 350 / 30, 10);
    expect(target.statuses.find(s => s.key === "fear")?.fearOriginX).toBe(0);
  });
  it("retains ordinary caster-relative fear without an epicenter", () => {
    const w = world(), [caster, target] = w.units;
    applyCC(w, caster, target, "fear", 1);
    caster.x = 600;
    step(w, [idle, idle]);
    expect(target.x).toBeCloseTo(400 - 350 / 30, 10);
  });
  it("does not attach metadata to rejected control or to an unrelated control type", () => {
    const w = world(), [caster, target] = w.units;
    target.statuses.push(lasting("state", "ccImmune"));
    expect(applyCC(w, caster, target, "fear", 1, 0, false, "E", false, undefined, 1000)).toBe(false);
    expect(target.statuses.some(s => s.key === "fear")).toBe(false);
    target.statuses = [];
    applyCC(w, caster, target, "root", 1, 0, false, "E", false, undefined, 1000);
    expect(target.statuses[0]?.fearOriginX).toBeUndefined();
  });
  it("keeps fixed origins branch-local and stronger movement holds effective", () => {
    const w = world(), [caster, target] = w.units;
    applyCC(w, caster, target, "fear", 1, 0, false, "E", false, undefined, 1000);
    const fork = cloneWorld(w);
    fork.units[1].statuses[0]!.fearOriginX = 0;
    target.statuses.push(lasting("cc", "root"));
    step(w, [idle, idle]);
    step(fork, [idle, idle]);
    expect(target.x).toBe(400);
    expect(fork.units[1].x).toBeGreaterThan(400);
    expect(target.statuses[0]?.fearOriginX).toBe(1000);
  });
  it("does not dispel a placed fear when its source dies during a continuing tick", () => {
    const w = world(), [caster, target] = w.units;
    applyCC(w, caster, target, "fear", 1, 0, false, "E", false, undefined, 1000);
    caster.alive = false; caster.hp = 0;
    step(w, [idle, idle]);
    expect(target.x).toBeLessThan(400);
    expect(target.statuses.some(s => s.key === "fear")).toBe(true);
  });
  it("moves a feared pet away from the real source instead of chasing or respecting its normal leash", () => {
    const w = world(), [caster, owner] = w.units;
    const pet = spawnPet(w, owner, { ...petSpec, leash: 10 }, 200);
    petEffects(w, caster, pet, [{ type: "cc", cc: "fear", duration: 1 }]);
    advancePets(w);
    expect(pet.x).toBe(210);
  });
  it("uses the placed origin on an actual pet and honors a simultaneous root", () => {
    const w = world(), [caster, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    petEffects(w, caster, pet, [{ type: "cc", cc: "fear", duration: 1, fearOriginX: 500 }]);
    advancePets(w);
    expect(pet.x).toBe(190);
    petEffects(w, caster, pet, [{ type: "cc", cc: "root", duration: 1 }]);
    advancePets(w);
    expect(pet.x).toBe(190);
  });
  it("cannot make a stationary placed body walk through movement-speed soft caps", () => {
    const w = world(), [caster, owner] = w.units;
    const turret = spawnPet(w, owner, { ...petSpec, moveSpeed: 0 }, 200);
    petEffects(w, caster, turret, [{ type: "cc", cc: "fear", duration: 1, fearOriginX: 500 }]);
    advancePets(w);
    expect(turret.x).toBe(200);
  });
});

describe("damage observers before the triggering packet", () => {
  it("captures post-mitigation damage once and resolves a consumed proc before shields and the base packet", () => {
    const order: string[] = [];
    const w = world(), [source, target] = w.units;
    let entitled = true;
    source.spec.hooks = {
      onBeforeDamageObserved(c) {
        order.push(`before:${c.ability}:${c.amount}:${c.target.hp}`);
        if (!entitled) return;
        entitled = false;
        expect(c.target.statuses.some(s => s.key === "sleep")).toBe(true);
        // Removing MR reduction after capture cannot change the initiating hit.
        c.target.statuses = c.target.statuses.filter(s => s.key !== "mrReductionPercent");
        dealDamage(c.world, c.self, c.target, 40, "true", { ability: "proc" });
      },
      onDamageObserved(c) { order.push(`after:${c.ability}:${c.amount}:${c.absorbed}`); },
    };
    target.statuses.push(lasting("cc", "sleep"), lasting("stat", "mrReductionPercent", 0.5), lasting("shield", "shield", 50));
    expect(dealDamage(w, source, target, 150, "magic", { ability: "trigger" })).toBe(90);
    expect(target.hp).toBe(1910);
    expect(order).toEqual(["before:trigger:100:2000", "before:proc:40:2000", "after:proc:0:40", "after:trigger:90:10"]);
    expect(target.statuses.some(s => s.key === "sleep")).toBe(false);
  });
  it("attributes a lethal preceding proc to its own source and stops the initiating packet", () => {
    const w = world(), [source, target] = w.units;
    const kills: string[] = [];
    let entitled = true;
    source.spec.hooks = { onBeforeDamageObserved(c) { if (entitled) { entitled = false; dealDamage(w, source, target, 100, "true", { ability: "prior" }); } }, onKill() { kills.push("prior"); } };
    target.hp = 30;
    expect(dealDamage(w, source, target, 200, "magic", { ability: "trigger" })).toBe(0);
    expect(source.totals.damageDealt).toBe(30);
    expect(kills).toEqual(["prior"]);
  });
  it("averages critical damage before the observer and exposes real packet identities", () => {
    const w = world(), [source, target] = w.units;
    let observed = 0;
    target.spec.hooks = { onBeforeDamageObserved(c) {
      observed++;
      expect(c.source).toBe(source); expect(c.target).toBe(target);
      expect(c.amount).toBe(75); expect(c.raw).toBe(150);
      expect(c.attack).toBe(true); expect(c.persistent).toBe(false);
      expect(c.targetPet).toBeUndefined();
    } };
    dealDamage(w, source, target, 100, "physical", { attack: true, crit: { chance: 0.5, multiplier: 2 } });
    expect(observed).toBe(1);
  });
  it.each(["invulnerable", "stasis"] as const)("does not emit damage through %s", state => {
    const w = world(), [source, target] = w.units;
    let observed = 0;
    source.spec.hooks = { onBeforeDamageObserved() { observed++; } };
    target.statuses.push(lasting("state", state));
    dealDamage(w, source, target, 100, "magic");
    expect(observed).toBe(0);
  });
  it("exposes persistent packets without waking ordinary sleep, and excludes dead observers", () => {
    const w = world(), [source, target] = w.units;
    const packets: boolean[] = [];
    source.spec.hooks = { onBeforeDamageObserved(c) { packets.push(c.persistent); } };
    target.statuses.push(lasting("cc", "sleep"));
    dealDamage(w, source, target, 100, "magic", { persistent: true });
    expect(packets).toEqual([true]);
    expect(target.statuses.some(s => s.key === "sleep")).toBe(true);
    source.alive = false;
    dealDamage(w, source, target, 100, "magic");
    expect(packets).toEqual([true]);
  });
  it("resolves before real pet shields and preserves their identity and changed health", () => {
    const w = world(), [source, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    let entitled = true;
    pet.statuses!.push(lasting("shield", "shield", 40));
    source.spec.hooks = { onBeforeDamageObserved(c) {
      expect(c.targetPet).toBe(pet);
      expect(c.target.petId).toBe(pet.id);
      if (!entitled) return;
      entitled = false;
      expect(c.amount).toBe(100);
      damagePet(w, source, pet, 60, "true", false, "prior");
    } };
    damagePet(w, source, pet, 200, "magic", false, "trigger");
    expect(pet.hp).toBe(380);
    expect(pet.statuses).toEqual([]);
  });
  it("stops an original pet packet after the preceding proc removes that pet", () => {
    const w = world(), [source, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    let entitled = true, deaths = 0;
    source.spec.hooks = { onBeforeDamageObserved() { if (entitled) { entitled = false; damagePet(w, source, pet, 600, "true", false, "prior"); } }, onKill() { deaths++; } };
    expect(damagePet(w, source, pet, 100, "magic", false, "trigger")).toBe(0);
    expect(w.pets).toHaveLength(0);
    expect(deaths).toBe(1);
  });
  it("refreshes the real pet state between observers after a preceding proc", () => {
    const w = world(), [source, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    const seen: number[] = [];
    source.spec.hooks = { onBeforeDamageObserved(c) {
      if (c.ability === "trigger") damagePet(w, source, pet, 20, "true", false, "prior");
    } };
    owner.spec.hooks = { onBeforeDamageObserved(c) {
      if (c.ability === "trigger") seen.push(c.target.hp);
    } };
    damagePet(w, source, pet, 100, "magic", false, "trigger");
    expect(seen).toEqual([480]);
    expect(pet.hp).toBe(430);
  });
  it.each([false, true])("requires explicit permission to observe an already released hit after source death: %s", enabled => {
    const w = world(), [source, target] = w.units;
    let observed = 0;
    source.spec.hooks = { beforeDamageEventsAfterDeath: enabled, onBeforeDamageObserved() { observed++; } };
    source.alive = false; source.hp = 0;
    dealDamage(w, source, target, 100, "magic", { ability: "released-hit" });
    expect(observed).toBe(enabled ? 1 : 0);
    expect(target.hp).toBe(1950);
    expect(w.result).toBeUndefined();
    expect(w.scheduled).toHaveLength(0);
  });
});

describe("ordinary sleep on actual pet victims", () => {
  it.each([
    { raw: 20, category: "singleTarget" as const, wakes: false },
    { raw: 22, category: "singleTarget" as const, wakes: true },
    { raw: 100, category: "persistent" as const, wakes: false },
  ])("resolves a $raw $category packet using mitigated damage and the persistent exception", ({ raw, category, wakes }) => {
    const w = world(), [source, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    pet.statuses!.push(lasting("cc", "sleep"), lasting("shield", "shield", 100));
    damagePet(w, source, pet, raw, "magic", false, "packet", category);
    expect(pet.statuses!.some(status => status.key === "sleep")).toBe(!wakes);
    expect(pet.hp).toBe(500);
  });
  it("does not wake a pet through actual invulnerability", () => {
    const w = world(), [source, owner] = w.units;
    const pet = spawnPet(w, owner, petSpec, 200);
    pet.statuses!.push(lasting("cc", "sleep"), lasting("state", "invulnerable"));
    damagePet(w, source, pet, 100, "magic", false);
    expect(pet.statuses!.some(status => status.key === "sleep")).toBe(true);
    expect(pet.hp).toBe(500);
  });
});

describe("fear-dependent slows", () => {
  it("stops the slow synchronously when its exact fear is cleansed, including cached speed", () => {
    const w = world(), [source, target] = w.units;
    const spell = ability({ key: "placed-fear", delivery: { kind: "self" } });
    applyEffect(w, source, target, { type: "cc", cc: "fear", duration: 1 }, { scale: 1, ability: spell });
    applyEffect(w, source, target, { type: "cc", cc: "slow", duration: 1, strength: 0.5, whileCC: "fear" }, { scale: 1, ability: spell });
    expect(derive(target).rawMoveSpeed).toBe(175);
    target.statuses = target.statuses.filter(s => s.key !== "fear");
    expect(derive(target).rawMoveSpeed).toBe(350);
    expect(derive(target)).toEqual(derive(cloneWorld(w).units[1]));
  });
  it.each(["source", "ability"] as const)("does not acquire an unrelated %s's fear entitlement", different => {
    const w = world(), [source, target] = w.units;
    target.statuses.push(lasting("cc", "fear", 0, { source: different === "source" ? 1 : 0, ability: different === "ability" ? "other" : "placed-fear" }));
    applyEffect(w, source, target, { type: "cc", cc: "slow", duration: 1, strength: 0.5, whileCC: "fear" }, { scale: 1, ability: ability({ key: "placed-fear", delivery: { kind: "self" } }) });
    expect(derive(target).rawMoveSpeed).toBe(350);
  });
  it("preserves slow immunity and resistance independently of the accepted fear", () => {
    const w = world(), [source, target] = w.units;
    const spell = ability({ key: "fear", delivery: { kind: "self" } });
    applyEffect(w, source, target, { type: "cc", cc: "fear", duration: 1 }, { scale: 1, ability: spell });
    target.statuses.push(lasting("stat", "slowResist", 0.5));
    applyEffect(w, source, target, { type: "cc", cc: "slow", duration: 1, strength: 0.6, whileCC: "fear" }, { scale: 1, ability: spell });
    expect(derive(target).rawMoveSpeed).toBeCloseTo(245, 12);
    target.statuses.push(lasting("state", "slowImmune"));
    expect(derive(target).rawMoveSpeed).toBe(350);
    expect(target.statuses.some(s => s.key === "fear")).toBe(true);
  });
});

describe("explicit final movement-speed floors", () => {
  it("floors final speed after slows and soft caps without rewriting the raw value", () => {
    const w = world(), self = w.units[0];
    self.spec = { ...self.spec, statConversions: { minimumMoveSpeed: 200 } };
    self.statuses.push(lasting("cc", "slow", 0.9));
    expect(derive(self).rawMoveSpeed).toBeCloseTo(35, 12);
    expect(derive(self).moveSpeed).toBe(200);
    delete self.spec.statConversions!.minimumMoveSpeed;
    expect(derive(self).moveSpeed).toBeCloseTo(127.5, 12);
  });
  it("observes in-place floor changes and keeps a replaced branch specification independent", () => {
    const w = world(), self = w.units[0];
    self.spec = { ...self.spec, statConversions: { minimumMoveSpeed: 400 } };
    expect(derive(self).moveSpeed).toBe(400);
    self.spec.statConversions!.minimumMoveSpeed = 450;
    expect(derive(self).moveSpeed).toBe(450);
    const branch = cloneWorld(w);
    branch.units[0].spec = { ...self.spec, statConversions: { ...self.spec.statConversions, minimumMoveSpeed: 500 } };
    expect(derive(branch.units[0]).moveSpeed).toBe(500);
    expect(derive(self).moveSpeed).toBe(450);
    expect(derive(self)).toEqual(derive(cloneWorld(w).units[0]));
  });
  it("floors a sourced final override while retaining faster ordinary movement", () => {
    const w = world(), self = w.units[0];
    self.spec = { ...self.spec, statConversions: { totalMoveSpeedOverride: 100, minimumMoveSpeed: 200 } };
    expect(derive(self).moveSpeed).toBe(200);
    expect(derive(self).rawMoveSpeed).toBe(100);
    self.statuses.push(lasting("state", "moveSpeedOverride", 150));
    expect(derive(self).moveSpeed).toBe(200);
    delete self.spec.statConversions!.totalMoveSpeedOverride;
    self.statuses = [];
    self.spec.base = { ...self.spec.base, moveSpeed: 500 };
    expect(derive(self).moveSpeed).toBe(480);
  });
});

describe("a movement hook's claimed projectile ending", () => {
  it.each(["special", "ordinary", "pet"] as const)("cancels a captured %s contact before its payload and contact callback", kind => {
    const w = world(), [source, owner] = w.units;
    const shot = ability({ key: "claimed", delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    source.spec.abilities.push(shot);
    let contacts = 0, ends = 0, moves = 0;
    source.spec.hooks = { onMissileMove(c) { moves++; c.missile.ended = true; }, onMissileContact() { contacts++; }, onMissileEnd() { ends++; } };
    const pet = kind === "pet" ? spawnPet(w, owner, petSpec, 400) : undefined;
    w.missiles.push({ id: w.nextId++, owner: 0, source: shot.key, seenTick: 0, x: 0, perTick: 400, direction: 1, homing: kind === "pet", travelLeft: 500, connects: true, scale: 1, projectile: true, onHit: shot.onHit!, ...(kind === "special" ? { piercing: true } : {}), ...(pet ? { pet: pet.id } : {}) });
    advanceMissiles(w);
    expect(moves).toBe(1);
    expect(contacts).toBe(0);
    expect(ends).toBe(0);
    expect(owner.hp).toBe(2000);
    if (pet) expect(pet.hp).toBe(500);
    expect(w.missiles).toHaveLength(0);
  });
  it("removes an undelivered ground zone when its carrier is claimed before arrival", () => {
    const w = world(), [source, owner] = w.units;
    const shot = ability({ key: "claimed-lob", delivery: { kind: "circle", range: 500, radius: 100, delay: 0, speed: 12000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    source.spec.abilities.push(shot);
    source.spec.hooks = { onMissileMove(c) { c.missile.ended = true; } };
    startCast(w, source, shot);
    expect(w.zones).toHaveLength(1);
    advanceMissiles(w); advanceZones(w);
    expect(w.zones).toHaveLength(0);
    expect(w.missiles).toHaveLength(0);
    expect(owner.hp).toBe(2000);
  });
});

describe("actual source classification retained by launched pet actors", () => {
  it.each([
    { targetClass: "monster" as const, sizeClass: "large" as const },
    { targetClass: "other" as const, structureClass: "turret" as const },
  ])("retains explicit $targetClass metadata after the launching body is removed", metadata => {
    const w = world(), [owner, target] = w.units;
    const pet = spawnPet(w, owner, { ...petSpec, ...metadata }, 0);
    const actor = petAttackActor(pet, owner, w.tick);
    w.pets = [];
    let observations = 0;
    owner.spec.hooks = { onBeforeDamageObserved(c) {
      observations++;
      expect(c.source.petId).toBe(pet.id);
      expect(c.petSource).toBe(true);
      expect(c.source.spec.targetClass).toBe(metadata.targetClass);
      expect(c.source.spec.sizeClass).toBe("sizeClass" in metadata ? metadata.sizeClass : undefined);
      expect(c.source.spec.structureClass).toBe("structureClass" in metadata ? metadata.structureClass : undefined);
    } };
    dealDamage(w, actor, target, 100, "true", { attack: true });
    expect(observations).toBe(1);
    expect(target.hp).toBe(1900);
  });
  it("does not infer structure or monster size from an evocative name or a large radius", () => {
    const w = world(), owner = w.units[0];
    const pet = spawnPet(w, owner, { ...petSpec, name: "Large turret", radius: 500, targetClass: "other" }, 0);
    const actor = petAttackActor(pet, owner, w.tick);
    expect(actor.spec.structureClass).toBeUndefined();
    expect(actor.spec.sizeClass).toBeUndefined();
  });
});

describe("interruptible cast completion ties", () => {
  it.each(["stun", "silence"] as const)("honors actual execution order when %s lands on the completion tick", cc => {
    for (const interruptsFirst of [false, true]) {
      const w = world(), [caster, enemy] = w.units;
      const charge = ability({ key: "charge", castTime: 0.1, interruptible: { cooldown: 2 }, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
      const disable = ability({ key: "disable", castTime: 0.1, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "cc", cc, duration: 1 }] });
      caster.spec.abilities.push(charge); enemy.spec.abilities.push(disable);
      // At tick3 firstMover0 resolves side1 before side0, firstMover1 reverses it.
      w.settings.firstMover = interruptsFirst ? 0 : 1;
      startCast(w, caster, charge); startCast(w, enemy, disable);
      w.tick = 3; step(w, [idle, idle]);
      expect(enemy.hp).toBe(interruptsFirst ? 2000 : 1900);
      expect(caster.statuses.some(status => status.key === cc)).toBe(true);
      expect(caster.cooldownReady.charge).toBe(interruptsFirst ? 63 : 303);
    }
  });
});
