import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, advanceZones, launchAttack, startAttack } from "../../engine/sim/actions";
import { threatsTo } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, attackHit } from "../../engine/sim/combat";
import { spawnPet } from "../../engine/sim/pets";
import { advanceSpecialMissile } from "../../engine/sim/projectiles";
import { createWorld, fork, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Missile, type World } from "../../engine/sim/state";
import { lasting } from "./helpers";
import { ability, fighter, RANGED } from "./kits";
import cassiopeia from "../../kits/champions/Cassiopeia";
import { championData, records } from "../kits/helpers";

const extra: Effect = { type: "damage", damageType: "true", amount: { base: 0, ratios: { AD: .2 } }, canCrit: true };
const onHit: Effect = { type: "damage", damageType: "magic", amount: { base: 10 }, label: "attached on-hit", petDamageCategory: "proc" };
const noWall = () => false;
function arena(self = fighter({ attack: RANGED }), enemy = fighter({ base: { hp: 10000, armor: 0, mr: 0 } })) {
  const w = createWorld({ fighters: [self, enemy], distance: 300, modes: ["idle", "idle"], settings: { reactionTime: 0 } });
  w.units[0].x = 0; w.units[1].x = 300;
  return w;
}
function pet(w: World, x: number, spec: Partial<PetSpec> = {}) {
  return spawnPet(w, w.units[1], { kind: "contract", name: "Actual pet", hp: 1000, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100, ...spec }, x);
}
function bolt(w: World, overrides: Partial<Missile> = {}) {
  const m: Missile = { id: w.nextId++, owner: 0, source: "attack", seenTick: 0, x: 0, perTick: 1000, homing: false, direction: 1, travelLeft: 1000, radius: 10, projectile: true, connects: true, scale: 1, onHit: [], piercing: true, collisionPet: true, attack: { blinded: false, critChance: 1, bonusOnHit: [] }, ...overrides };
  w.missiles.push(m); return m;
}

describe("basic packet ordering and passive damage", () => {
  function corkiLike(enemy?: FighterSpec) {
    return arena(fighter({ attack: { ...RANGED, beforeDamage: [extra], onHit: [onHit], onHitBeforeDamage: true, onHitToPets: true } }), enemy);
  }
  it("applies one on-hit, then the critical true packet, then ordinary physical damage", () => {
    const packets: string[] = [];
    const w = corkiLike(fighter({ base: { hp: 10000, armor: 0, mr: 0 }, hooks: { onDamageTaken: c => { packets.push(c.damageType); } } }));
    attackHit(w, w.units[0], w.units[1], false, [], undefined, false, { critChance: .5 });
    expect(packets).toEqual(["magic", "true", "physical"]);
    expect(w.units[1].totals.damageTaken).toBe(190);
  });
  it("retains the launched critical chance for both packets even after bought stats change", () => {
    const w = corkiLike();
    w.units[0].spec.bonus = { critChance: 1 };
    startAttack(w, w.units[0]); launchAttack(w, w.units[0]);
    w.units[0].spec.bonus = { critChance: 0 };
    for (let i = 0; i < 10; i++) { w.tick++; advanceMissiles(w); }
    expect(w.units[1].totals.damageTaken).toBe(250);
  });
  it.each(["dodgeAttacks", "blockAttacks", "parry"])("respects %s before health damage and never repeats on-hits", state => {
    const w = corkiLike(); w.units[1].statuses.push(lasting("state", state));
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("a declaration-time blind denies all three packets", () => {
    const w = corkiLike(); attackHit(w, w.units[0], w.units[1], true, []);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("values the true passive once in budgets and attack forecasts", () => {
    const w = corkiLike(); startAttack(w, w.units[0]);
    expect(threatsTo(w, 1).find(t => t.source === "attack")!.damage).toBe(130);
    expect(damagePerSecond(w.units[0].spec, w.units[1].spec)).toEqual({ physical: 100 * .625, magic: 10 * .625, true: 20 * .625 });
  });
  it("keeps full packet ordering against a real health pet without champion hit callbacks", () => {
    let championHits = 0, petHits = 0;
    const w = corkiLike(); w.units[0].spec.hooks = { onAttackHit: () => { championHits++; }, onAttackPetHit: () => { petHits++; } };
    const victim = pet(w, 100); startAttack(w, w.units[0], victim); launchAttack(w, w.units[0]);
    for (let i = 0; i < 10; i++) { w.tick++; advanceMissiles(w); }
    expect(victim.hp).toBe(870); expect(championHits).toBe(0); expect(petHits).toBe(1);
  });
  it.each([undefined, "Hextech Munitions"])("classifies a separate passive packet as a proc against fixed-table pets (%s)", label => {
    const w = corkiLike(); w.units[0].spec.attack.beforeDamage = [{ ...extra, label }];
    const victim = pet(w, 100, { hp: 5, fixedDamage: { basic: 1, proc: .25 } });
    startAttack(w, w.units[0], victim); launchAttack(w, w.units[0]);
    for (let i = 0; i < 10; i++) { w.tick++; advanceMissiles(w); }
    expect(victim.hp).toBe(3.5); // One basic, one ordinary on-hit proc and one passive proc.
  });
  it("the passive's pet proc classification retains basic life steal on normal health pets", () => {
    const w = corkiLike(); w.units[0].hp -= 500;
    w.units[0].statuses.push(lasting("stat", "lifeSteal", .2));
    const hp = w.units[0].hp, victim = pet(w, 100);
    startAttack(w, w.units[0], victim); launchAttack(w, w.units[0]);
    for (let i = 0; i < 10; i++) { w.tick++; advanceMissiles(w); }
    expect(w.units[0].hp - hp).toBe(24); // Ordinary AD plus the additional basic true damage.
  });
});

describe("opt-in piercing basic missiles", () => {
  it("replaces the normal launch without changing its declared attack timer", () => {
    const w = arena(fighter({ attack: RANGED, hooks: { onAttackLaunch(c) { bolt(c.world, { x: c.self.x }); return false; } } }));
    startAttack(w, w.units[0]); const ready = w.units[0].attackReadyTick;
    launchAttack(w, w.units[0]);
    expect(w.missiles).toHaveLength(1); expect(w.missiles[0]!.homing).toBe(false);
    expect(w.units[0].attackReadyTick).toBe(ready); expect(w.units[0].action).toBeUndefined();
  });
  it("attenuates ordinary critical damage after a pet but leaves each target's on-hit whole", () => {
    let pets = 0, champions = 0;
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true, onHit: [onHit] }, hooks: {
      onAttackPetHit: () => { pets++; }, onAttackHit: () => { champions++; },
      onMissileContact({ missile }) { missile.attack!.baseDamageScale = .9; },
    } }));
    const victim = pet(w, 100); const m = bolt(w);
    advanceSpecialMissile(w, m, noWall);
    expect(victim.hp).toBe(790); expect(w.units[1].totals.damageTaken).toBe(190);
    expect(pets).toBe(1); expect(champions).toBe(1);
    expect(m.hitPets).toEqual([victim.id]); expect(m.hitTargets).toEqual([1]);
    advanceSpecialMissile(w, m, noWall);
    expect(pets).toBe(1); expect(champions).toBe(1);
  });
  it.each(["dodgeAttacks", "blockAttacks", "parry"])("preserves %s against its champion and pet contacts", state => {
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true, onHit: [onHit] } }));
    const victim = pet(w, 100); victim.statuses = [lasting("state", state)];
    w.units[1].statuses.push(lasting("state", state)); advanceSpecialMissile(w, bolt(w), noWall);
    expect(victim.hp).toBe(1000); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("ordinary spell shields do not absorb a basic piercing bolt", () => {
    const w = arena(); w.units[1].statuses.push(lasting("state", "spellShield"));
    advanceSpecialMissile(w, bolt(w), noWall);
    expect(w.units[1].totals.damageTaken).toBe(200);
    expect(w.units[1].statuses.some(s => s.key === "spellShield")).toBe(true);
  });
  it("explicit untargetable hits reach the shared resolver while stasis remains protected", () => {
    for (const state of ["untargetable", "stasis"] as const) {
      const w = arena(); w.units[1].statuses.push(lasting("state", state));
      advanceSpecialMissile(w, bolt(w, { hitsUntargetable: true }), noWall);
      expect(w.units[1].totals.damageTaken).toBe(state === "stasis" ? 0 : 200);
    }
  });
  it("hits basic-only hit-count pets and still reaches the champion", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true } }));
    const victim = pet(w, 100, { hp: 3, hitPoints: true });
    advanceSpecialMissile(w, bolt(w), noWall);
    expect(victim.hp).toBe(2); expect(w.units[1].totals.damageTaken).toBe(200);
  });
  it("a projectile wall denies the whole flight before the first contact", () => {
    const w = arena(); const victim = pet(w, 100); advanceSpecialMissile(w, bolt(w), () => true);
    expect(victim.hp).toBe(1000); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("branches retain independent contact history and attenuation", () => {
    const w = arena(); const m = bolt(w); m.attack!.baseDamageScale = .9;
    m.hitPets = [17]; const branch = cloneWorld(w); const copy = branch.missiles[0]!;
    copy.attack!.baseDamageScale = .6; copy.hitPets!.push(18);
    expect(m.attack!.baseDamageScale).toBe(.9); expect(m.hitPets).toEqual([17]);
  });
  it("advances stopped projectile phase clocks once per tick after owner death", () => {
    let clocks = 0;
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true }, hooks: { onMissileTick(c) { clocks++; c.missile.perTick = 1000; } } }));
    w.units[0].alive = false; w.units[0].hp = 0;
    const victim = pet(w, 100), m = bolt(w, { perTick: 0 });
    advanceSpecialMissile(w, m, noWall);
    expect(clocks).toBe(1); expect(victim.hp).toBe(800); expect(w.units[1].totals.damageTaken).toBe(200);
  });
  it("expires a projectile before running another phase clock", () => {
    let clocks = 0, ends = 0;
    const w = arena(fighter({ hooks: { onMissileTick() { clocks++; }, onMissileEnd() { ends++; } } }));
    const m = bolt(w, { expiresTick: w.tick });
    expect(advanceSpecialMissile(w, m, noWall)).toBe(false);
    expect(advanceSpecialMissile(w, m, noWall)).toBe(false);
    expect(clocks).toBe(0); expect(ends).toBe(1);
  });
  it("announces a nonhoming skillshot only until that target is contacted", () => {
    const w = arena(); const m = bolt(w);
    const threat = threatsTo(w, 1).find(t => t.id === m.id)!;
    expect(threat.targeted).toBe(false); expect(threat.skillshot).toBe(true); expect(threat.damage).toBe(200);
    m.hitTargets = [1]; expect(threatsTo(w, 1).some(t => t.id === m.id)).toBe(false);
    m.hitTargets = []; m.direction = -1;
    expect(threatsTo(w, 1).some(t => t.id === m.id)).toBe(false);
  });
  it.each([1, 2])("collects replacement-attack splits and respects the finite branch budget (%s)", maxBranches => {
    let hitShare = 0;
    const w = arena(fighter({ attack: { ...RANGED, onHit: [onHit] }, hooks: {
      onAttackLaunch(c) { const m = bolt(c.world); return { missile: m.id, chance: .3 }; },
      onAttackHit(c) { hitShare += c.scale * c.world.weight; },
    } }));
    w.settings.maxBranches = maxBranches;
    startAttack(w, w.units[0]); w.tick = (w.units[0].action as { launchTick: number }).launchTick;
    const splits = step(w, [() => undefined, () => undefined]);
    expect(splits).toHaveLength(1);
    const branches = fork(w, splits); expect(branches).toHaveLength(maxBranches);
    for (const branch of branches) advanceSpecialMissile(branch, branch.missiles[0]!, noWall);
    expect(branches.reduce((sum, b) => sum + b.weight * b.units[1].totals.damageTaken, 0)).toBeCloseTo(63, 12);
    expect(hitShare).toBeCloseTo(.3, 12);
  });
  it("expected hit shares scale all damage, life steal and return damage independently of piercing attenuation", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHit: [onHit] }, hooks: { onAttackHit(c) { expect(c.scale).toBe(.25); } } }),
      fighter({ base: { hp: 10000, armor: 0, mr: 0 }, hooks: { onIncomingOnHit(c) { expect(c.scale).toBe(.25); c.apply({ type: "damage", damageType: "true", amount: { base: 40 } }); } } }));
    w.units[0].hp -= 500; w.units[0].statuses.push(lasting("stat", "lifeSteal", .2));
    w.units[1].statuses.push(lasting("state", "reflectAttacks", 20));
    const hp = w.units[0].hp;
    const m = bolt(w, { scale: .25 }); m.attack!.baseDamageScale = .6;
    expect(threatsTo(w, 1).find(t => t.id === m.id)!.damage).toBe(32.5);
    advanceSpecialMissile(w, m, noWall);
    expect(w.units[1].totals.damageTaken).toBe(32.5);
    expect(w.units[0].totals.healing).toBe(6.5);
    expect(w.units[0].hp - hp).toBe(-6); // +6.5 from basic damage/on-hits -10 true reflection -2.5 mitigated magic reflection.
  });
});

describe("attached primary damage through untargetability", () => {
  it.each([false, true])("requires explicit primary opt-in (%s)", enabled => {
    const w = arena(); w.units[1].statuses.push(lasting("state", "untargetable"));
    abilityHit(w, w.units[0], w.units[1], ability({ key: "bomb", delivery: { kind: "self" }, flags: { hitsUntargetable: enabled } }), [{ type: "damage", damageType: "magic", amount: { base: 90 } }]);
    expect(w.units[1].totals.damageTaken).toBe(enabled ? 90 : 0);
  });
  it("stasis and spell shields retain their separate protection", () => {
    for (const state of ["stasis", "spellShield"] as const) {
      const w = arena(); w.units[1].statuses.push(lasting("state", state));
      abilityHit(w, w.units[0], w.units[1], ability({ key: "bomb", delivery: { kind: "self" }, flags: { hitsUntargetable: true } }), [{ type: "damage", damageType: "magic", amount: { base: 90 } }]);
      expect(w.units[1].totals.damageTaken).toBe(0);
    }
  });
  it("retains both actual-pet and contact-view memory updates in the same packet", () => {
    const packet = ability({ key: "attached", delivery: { kind: "self" }, flags: { petContactHooks: true } });
    const w = arena(fighter({ hooks: { onAbilityHit(c) {
      c.world.pets.find(p => p.id === c.enemy.petId)!.memory.forcedEnd = c.tick + 20;
      c.enemy.memory.contactStack = 4;
    } } }));
    const victim = pet(w, 100);
    abilityHitPet(w, w.units[0], victim, packet, [{ type: "damage", damageType: "true", amount: { base: 10 } }]);
    expect(victim.memory).toEqual({ forcedEnd: 20, contactStack: 4 });
  });
});

describe("opt-in field contacts after caster death", () => {
  it("continuous field refreshes retain due pet DOT pulses just as they do champion pulses", () => {
    const field = ability({ key: "burn", delivery: { kind: "self" }, flags: { petContactHooks: true, spellShield: false }, onHit: [{ type: "dot", damageType: "true", total: { base: 40 }, duration: 1, interval: .5 }] });
    const w = arena(fighter({ abilities: [field] })), victim = pet(w, 100);
    w.zones.push({ id: w.nextId++, owner: 0, kind: "field", seenTick: 0, x: 150, radius: 200, startTick: 0, endTick: 60, nextTick: 0, interval: 1, ability: "burn", onHit: field.onHit });
    while (w.tick <= 15) step(w, [() => undefined, () => undefined]);
    expect(w.units[1].totals.damageTaken).toBe(20);
    expect(victim.hp).toBe(980);
    w.zones = [];
    while (w.tick <= 45) step(w, [() => undefined, () => undefined]);
    expect(w.units[1].totals.damageTaken).toBe(60);
    expect(victim.hp).toBe(940);
  });
  it("continues finite fields with independently defended actual-pet contacts", () => {
    let petContacts = 0;
    const field = ability({ key: "field", persistsAfterDeath: true, delivery: { kind: "self" }, flags: { petContactHooks: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 10 } }] });
    const w = arena(fighter({ abilities: [field], hooks: { onAbilityHit(c) { if (c.enemy.petId !== undefined) petContacts++; } } }));
    const victim = pet(w, 100), protectedPet = pet(w, 120);
    protectedPet.statuses = [lasting("state", "spellShield")];
    w.units[0].alive = false; w.units[0].hp = 0;
    w.zones.push({ id: w.nextId++, owner: 0, kind: "field", seenTick: 0, x: 150, radius: 200, startTick: 0, endTick: 30, nextTick: 0, interval: 15, ability: "field", onHit: field.onHit });
    advanceZones(w);
    expect(victim.hp).toBe(990); expect(protectedPet.hp).toBe(1000); expect(petContacts).toBe(1);
    w.tick = 15; advanceZones(w);
    expect(victim.hp).toBe(980); expect(protectedPet.hp).toBe(990); expect(petContacts).toBe(3);
    w.tick = 30; advanceZones(w); expect(w.zones).toHaveLength(0);
  });
});

describe("explicit poison interoperability", () => {
  it.each(["twitch:poison", "arbitrary:poison", "twitch:poison-expired"])("Twin Fang checks current tagged poison at impact (%s)", key => {
    const spec = compileKit(championData("Cassiopeia"), records("Cassiopeia"), cassiopeia).spec;
    const w = arena({ ...spec, bonus: { ap: 100 } }); w.units[0].hp -= 500;
    w.tick = 30;
    const active = key === "twitch:poison";
    w.units[1].statuses.push(lasting("mark", key.startsWith("twitch:") ? "twitch:poison" : key, 6, { endTick: key.endsWith("expired") ? 30 : 31 }));
    const fang = spec.abilities.find(a => a.key === "E")!;
    abilityHit(w, w.units[0], w.units[1], fang, fang.onHit!);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(active ? 313.235294117647 : 148.235294117647, 9);
    expect(w.units[0].totals.healing).toBe(active ? 16 : 0);
  });
});

describe("hit probability and on-hit effectiveness", () => {
  it.each([1, .25])("incoming reflection and cooldown refunds follow hit share %s independently of reduced outgoing on-hits", share => {
    const w = arena(fighter({ attack: { onHit: [onHit] } }), fighter({ base: { hp: 10000, armor: 0, mr: 0 }, hooks: {
      onIncomingOnHit(c) {
        expect(c.scale).toBe(share);
        c.apply({ type: "damage", damageType: "true", amount: { base: 40 } });
        c.apply({ type: "refund", ability: "E", seconds: 2 }, true);
      },
    } }));
    w.units[1].cooldownReady.E = 300;
    const spell = ability({ key: "Purge", delivery: { kind: "self" }, flags: { appliesOnHit: true }, onHitScale: .5, onHit: [{ type: "damage", damageType: "true", amount: { base: 1 } }] });
    abilityHit(w, w.units[0], w.units[1], spell, spell.onHit!, share);
    expect(w.units[0].totals.damageTaken).toBe(40 * share);
    expect(w.units[1].totals.damageTaken).toBe(6 * share);
    expect(w.units[1].cooldownReady.E).toBe(300 - 60 * share);
  });
});
