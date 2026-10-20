import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { advanceMissiles, attackRange, canStartAttack, canStartAttackOnPet, launchAttack, launchBonusAttack, progressDash, startAttack, startCast } from "../../engine/sim/actions";
import { threatsTo } from "../../engine/sim/behavior";
import { abilityHitPet, applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, fight } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type AttackHitOptions, type World } from "../../engine/sim/state";
import { dashDistance } from "../../engine/sim/terrain";
import { petCombatHit } from "../../engine/sim/petCombat";
import { lasting } from "./helpers";
import { ability, fighter, RANGED } from "./kits";

function arena(self: FighterSpec = fighter({ attack: RANGED }), enemy: FighterSpec = fighter({ base: { hp: 10000, armor: 0, mr: 0 } })): World {
  const world = createWorld({ fighters: [self, enemy], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = 500;
  return world;
}

function targetPet(world: World, overrides: Partial<PetSpec> = {}, x = 200) {
  return spawnPet(world, world.units[1], { kind: "contract", name: "Contract pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 100, ...overrides }, x);
}

function arrive(world: World): void {
  for (let i = 0; world.missiles.length > 0 && i < 100; i++) { world.tick++; advanceMissiles(world); }
  expect(world.missiles).toHaveLength(0);
}

describe("actual pet-to-pet contact callbacks", () => {
  it.each([false, true])("reports a connected pet hit once when damage block is %s", (blocked) => {
    const world = arena(), reports: boolean[] = [];
    const attacker = spawnPet(world, world.units[0], { kind: "attacker", name: "Attacking summon", hp: 500,
      armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10,
      onAttackHit: ({ blocked }) => reports.push(blocked) }, 100);
    const victim = targetPet(world);
    if (blocked) victim.statuses = [lasting("state", "blockAttacks")];
    expect(petCombatHit(world, attacker, victim, [{ type: "damage", damageType: "magic", amount: { base: 80 } }], true)).toBe(true);
    expect(reports).toEqual([blocked]);
    expect(victim.hp).toBe(blocked ? 1000 : 920);
  });

  it.each(["parry", "dodgeAttacks", "blind"])("does not report a pet contact denied by %s", (guard) => {
    const world = arena(); let hits = 0;
    const attacker = spawnPet(world, world.units[0], { kind: "attacker", name: "Attacking summon", hp: 500,
      armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10, onAttackHit: () => { hits++; } }, 100);
    const victim = targetPet(world);
    if (guard !== "blind") victim.statuses = [lasting("state", guard)];
    expect(petCombatHit(world, attacker, victim, [{ type: "damage", damageType: "magic", amount: { base: 80 } }], true, guard === "blind")).toBe(false);
    expect(hits).toBe(0); expect(victim.hp).toBe(1000);
  });
});

describe("basic damage snapshots and one-packet modifiers", () => {
  it("adds noncritical bonus physical damage inside one basic packet, with one flat reduction and shield/life steal report", () => {
    const reports: Array<{ amount: number; absorbed: number; raw: number }> = [];
    const w = arena(fighter({ bonus: { critChance: .5 }, hooks: { onDamageDealt: (ctx) => reports.push(ctx) } }));
    const [self, enemy] = w.units;
    self.hp = 1000;
    self.statuses.push(lasting("stat", "lifeSteal", .2));
    enemy.statuses.push(lasting("state", "flatDamageReduction", 10), lasting("shield", "shield", 30));
    attackHit(w, self, enemy, false, [], undefined, false, { critChance: .5, baseDamageScale: .7, bonusPhysical: { base: 50 } });
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({ amount: 115, absorbed: 30, raw: 155 });
    expect(self.hp).toBe(1029);
    expect(enemy.totals.damageTaken).toBe(115);
    expect(enemy.totals.absorbed).toBe(30);
  });

  it("evaluates the flat-reduction half-damage cap independently for ordinary and critical outcomes", () => {
    const w = arena(fighter({ base: { ad: 10 } }));
    w.units[1].statuses.push(lasting("state", "flatDamageReduction", 100));
    attackHit(w, w.units[0], w.units[1], false, [], undefined, false, { critChance: .5, bonusPhysical: { base: 50 } });
    // The two total packets are 60 and 70 before the 50% reduction cap.
    expect(w.units[1].totals.damageTaken).toBe(32.5);
  });

  it("keeps critical chance, speed and attack identity on the launched missile while formulas read actual impact health", () => {
    let launched = "";
    const w = arena(fighter({ attack: RANGED, hooks: {
      onAttack(ctx) {
        ctx.action.critChance = 1;
        ctx.action.missileSpeed = 3000;
        ctx.action.attackTag = "fourth";
        ctx.action.bonusPhysical = { base: 0, ratios: { targetMissingHP: .25 }, products: [{ ratio: 1, stats: ["AD", "critChance"] }] };
      },
      onAttackLaunch(ctx) { launched = ctx.action.attackTag!; expect(ctx.self.action).toBeUndefined(); },
      onAttackHit(ctx) { expect(ctx.attack.attackTag).toBe("fourth"); expect(ctx.critChance).toBe(1); },
    } }));
    startAttack(w, w.units[0]);
    const action = w.units[0].action!;
    launchAttack(w, w.units[0]);
    expect(launched).toBe("fourth");
    expect(w.missiles[0]!.perTick).toBe(100);
    if (action.kind === "windup") action.attackTag = "changed after launch";
    w.units[0].spec.bonus = { critChance: 0 };
    w.units[1].hp -= 400;
    arrive(w);
    expect(w.units[1].totals.damageTaken).toBe(400); // 200 critical + 100 captured-crit formula + 100 missing HP.
  });

  it("forecasts the exact base scale, critical multiplier, additive damage and full on-hit packet", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHit: [{ type: "damage", damageType: "magic", amount: { base: 20 } }] }, hooks: {
      onAttack(ctx) { ctx.action.critChance = .5; ctx.action.baseDamageScale = .7; ctx.action.critMultiplier = 2; ctx.action.bonusPhysical = { base: 50 }; },
    } }));
    startAttack(w, w.units[0]);
    w.settings.reactionTime = 0;
    expect(threatsTo(w, 1).find((threat) => threat.source === "attack")!.damage).toBe(175);
  });

  it("selects target-dependent physical additions at impact when two attacks were already in flight", () => {
    const w = arena(fighter({ attack: { ...RANGED, bonusPhysicalFor: (self, target) => self.memory.last !== target.side ? 100 : 0 }, hooks: {
      onAttackHit(ctx) { ctx.memory.last = ctx.enemy.side; },
    } }));
    launchBonusAttack(w, w.units[0], w.units[1]);
    launchBonusAttack(w, w.units[0], w.units[1]);
    arrive(w);
    expect(w.units[1].totals.damageTaken).toBe(300);
  });
});

describe("independent extra attacks", () => {
  it("launches without consuming a windup or attack timer, keeps full on-hits and exposes its own tag", () => {
    let declarations = 0, launches = 0, contacts = 0;
    const w = arena(fighter({ attack: { ...RANGED, onHit: [{ type: "damage", damageType: "magic", amount: { base: 20 } }] }, hooks: {
      onAttack() { declarations++; }, onAttackLaunch() { launches++; },
      onAttackHit(ctx) { contacts++; expect(ctx.attack.attackTag).toBe("second"); },
    } }));
    w.units[0].attackReadyTick = 100;
    launchBonusAttack(w, w.units[0], w.units[1], { baseDamageScale: .7, critChance: 1, attackTag: "second" });
    expect(w.units[0].attackReadyTick).toBe(100);
    expect(w.units[0].action).toBeUndefined();
    arrive(w);
    expect([declarations, launches, contacts]).toEqual([0, 0, 1]);
    expect(w.units[1].totals.damageTaken).toBe(160);
  });

  it.each(["blind", "dodgeAttacks", "blockAttacks", "stasis", "untargetable"])("respects %s on independently launched basics", (guard) => {
    const w = arena();
    if (guard === "blind") w.units[0].statuses.push(lasting("cc", "blind"));
    else w.units[1].statuses.push(lasting("state", guard));
    launchBonusAttack(w, w.units[0], w.units[1], { baseDamageScale: .7, critChance: 1 });
    arrive(w);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
});

describe("actual-pet basic attack parity is opt in", () => {
  it("retains declaration/launch target identity and resolves scaled critical basic damage plus full on-hits", () => {
    let championHits = 0, petHits = 0, petId = -1;
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true, onHit: [{ type: "damage", damageType: "magic", amount: { base: 20 } }] }, hooks: {
      onAttack(ctx) { petId = ctx.targetPet!.id; expect(ctx.enemy.petId).toBe(petId); ctx.action.baseDamageScale = .7; ctx.action.critChance = 1; ctx.action.bonusPhysical = { base: 50 }; ctx.action.attackTag = "pet packet"; },
      onAttackLaunch(ctx) { expect(ctx.targetPet!.id).toBe(petId); expect(ctx.enemy.petId).toBe(petId); },
      onAttackHit() { championHits++; },
      onAttackPetHit(ctx) { petHits++; expect(ctx.enemy.petId).toBe(ctx.pet.id); expect(ctx.attack.attackTag).toBe("pet packet"); expect(ctx.critChance).toBe(1); },
    } }));
    const pet = targetPet(w, { armor: 100 });
    startAttack(w, w.units[0], pet); launchAttack(w, w.units[0]); arrive(w);
    expect(pet.hp).toBe(885); // (140 + 50)/2 physical + 20 magic.
    expect([championHits, petHits]).toEqual([0, 1]);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });

  it("uses fixed pet damage categories once for the main basic and separately for an on-hit proc", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true, onHit: [{ type: "damage", damageType: "magic", amount: { base: 200 } }] } }));
    const pet = targetPet(w, { hp: 5, fixedDamage: { basic: 1, proc: .25 } });
    launchBonusAttack(w, w.units[0], pet, { baseDamageScale: 1.1, critChance: 1, bonusPhysical: { base: 500 } }); arrive(w);
    expect(pet.hp).toBe(3.75);
  });

  it("keeps legacy pet basics free of previously unsupported champion on-hit packets", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHit: [{ type: "damage", damageType: "magic", amount: { base: 200 } }] } }));
    const pet = targetPet(w);
    launchBonusAttack(w, w.units[0], pet); arrive(w);
    expect(pet.hp).toBe(900);
  });

  it.each(["blind", "dodgeAttacks", "parry", "blockAttacks", "invulnerable", "untargetable", "stasis"])("honors %s against opted-in pet basics", (guard) => {
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true } }));
    const pet = targetPet(w);
    if (guard === "blind") w.units[0].statuses.push(lasting("cc", "blind"));
    else pet.statuses!.push(lasting("state", guard));
    launchBonusAttack(w, w.units[0], pet, { baseDamageScale: 1.1, critChance: 1, bonusPhysical: { base: 100 } }); arrive(w);
    expect(pet.hp).toBe(1000);
  });

  it("lets a projectile wall intercept an actual-pet homing basic", () => {
    const w = arena(fighter({ attack: { ...RANGED, onHitToPets: true } }));
    const pet = targetPet(w);
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 100 });
    launchBonusAttack(w, w.units[0], pet); arrive(w);
    expect(pet.hp).toBe(1000);
  });

  it("adds target-specific range only for the marked champion, including start/cancel checks", () => {
    const w = arena(fighter({ attack: { ...RANGED, bonusRangeFor: (_, target) => target.petId === undefined ? 650 : 0 } }));
    w.units[1].x = 1200;
    const pet = targetPet(w, {}, 1200);
    expect(attackRange(w.units[0], w.units[1])).toBe(1200);
    expect(canStartAttack(w, w.units[0])).toBe(true);
    expect(canStartAttackOnPet(w, w.units[0], pet)).toBe(false);
  });
});

describe("actual-pet spell contact and after-blink targeting", () => {
  it("keeps a basic-damage spell distinct from an actual champion basic for fixed-health pets", () => {
    const q = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, flags: { petContactHooks: true, basicDamage: true }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 500 }, petDamageCategory: "singleTarget" }] });
    const w = arena(fighter({ abilities: [q], attack: { ...RANGED, onHitToPets: true } }));
    const pet = targetPet(w, { hp: 10, diesToChampionAttack: true, fixedDamage: { rangedBasic: 2, singleTarget: 4 } });
    abilityHitPet(w, w.units[0], pet, q, q.onHit!);
    expect(pet.hp).toBe(6);
    expect(w.pets).toContain(pet);
    launchBonusAttack(w, w.units[0], pet); arrive(w);
    expect(w.pets).not.toContain(pet);
  });

  it.each([false, true])("resolves an actual pet spell with pre-defense contact hooks and spell shield=%s", (shielded) => {
    let contacts = 0, hits = 0, launches = 0;
    const q = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, flags: { petContactHooks: true, basicDamage: true, appliesOnHit: true }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 50 } }] });
    const w = arena(fighter({ abilities: [q], attack: { onHit: [{ type: "damage", damageType: "magic", amount: { base: 20 } }] }, hooks: {
      onAbilityContact(ctx) { contacts++; expect(ctx.enemy.petId).toBeDefined(); expect(ctx.defense).toBe(shielded ? "spellShield" : undefined); },
      onAbilityHit(ctx) { hits++; expect(ctx.enemy.petId).toBeDefined(); },
      onMissileContact(ctx) { launches++; expect(ctx.targetPet!.id).toBe(ctx.enemy.petId); },
    } }));
    const pet = targetPet(w);
    if (shielded) pet.statuses!.push(lasting("state", "spellShield", 0, { charges: 1 }));
    w.missiles.push({ id: w.nextId++, owner: 0, source: "Q", seenTick: 0, x: 0, perTick: 100, homing: true, direction: 1, travelLeft: 1000, projectile: true, connects: true, scale: 1, onHit: q.onHit!, pet: pet.id });
    arrive(w);
    expect([contacts, hits, launches]).toEqual([1, shielded ? 0 : 1, 1]);
    expect(pet.hp).toBe(shielded ? 1000 : 930);
    expect(pet.statuses!.some((status) => status.key === "spellShield")).toBe(false);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });

  it("runs onBlinkEnd after the exact displacement and before landing damage", () => {
    let at = -1, hpBefore = -1;
    const e = ability({ key: "E", delivery: { kind: "blink", distance: 300, direction: "toward", hitRadius: 500 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 25 } }] });
    const w = arena(fighter({ base: { resource: 100 }, abilities: [e], hooks: { onBlinkEnd(ctx) { at = ctx.self.x; hpBefore = ctx.enemy.hp; expect(ctx.ability.key).toBe("E"); } } }));
    startCast(w, w.units[0], e);
    expect(at).toBe(300);
    expect(hpBefore).toBe(10000);
    expect(w.units[1].totals.damageTaken).toBe(25);
  });
});

describe("champion and pet target locks stay independent", () => {
  it("retains an actual pet's flying attack and windup when the owner champion becomes untargetable", () => {
    const w = arena(), self = w.units[0], enemy = w.units[1], pet = targetPet(w);
    launchBonusAttack(w, self, pet);
    startAttack(w, self, pet);
    applyEffect(w, enemy, enemy, { type: "state", state: "untargetable", duration: 1 }, { scale: 1 });
    expect(w.missiles).toHaveLength(1);
    expect(self.action?.kind).toBe("windup");
    arrive(w);
    expect(pet.hp).toBe(900);
  });

  it("does not drop owner-directed missiles or windups while applying an actual pet's protection", () => {
    const w = arena(), self = w.units[0], enemy = w.units[1], pet = targetPet(w);
    launchBonusAttack(w, self, enemy);
    startAttack(w, self);
    petEffects(w, enemy, pet, [{ type: "state", state: "untargetable", duration: 1 }]);
    expect(w.missiles).toHaveLength(1);
    expect(self.action?.kind).toBe("windup");
    arrive(w);
    expect(enemy.totals.damageTaken).toBe(100);
  });

  it.each(["untargetable", "stasis"] as const)("immediately drops only an actual pet's homing attacks and windups on %s", (state) => {
    const w = arena(), self = w.units[0], enemy = w.units[1], pet = targetPet(w);
    launchBonusAttack(w, self, enemy);
    launchBonusAttack(w, self, pet);
    startAttack(w, self, pet);
    petEffects(w, enemy, pet, [{ type: "state", state, duration: .01 }]);
    expect(w.missiles).toHaveLength(1);
    expect(w.missiles[0]!.pet).toBeUndefined();
    expect(self.action).toBeUndefined();
    pet.statuses = [];
    arrive(w);
    expect(pet.hp).toBe(1000);
    expect(enemy.totals.damageTaken).toBe(100);
  });

  it("invisibility drops a pet-directed windup while retaining its already launched attack", () => {
    const w = arena(), self = w.units[0], pet = targetPet(w);
    launchBonusAttack(w, self, pet); startAttack(w, self, pet);
    petEffects(w, w.units[1], pet, [{ type: "state", state: "invisible", duration: 10 }]);
    expect(self.action).toBeUndefined();
    expect(w.missiles).toHaveLength(1);
    arrive(w);
    expect(pet.hp).toBe(900);
  });

  it("does not resurrect an earlier queued pet missile removed by another contact during the same movement phase", () => {
    let petId = -1;
    const w = arena(fighter({ attack: RANGED, hooks: { onAttackHit(ctx) {
      const pet = ctx.world.pets.find((entry) => entry.id === petId)!;
      petEffects(ctx.world, ctx.enemy, pet, [{ type: "state", state: "untargetable", duration: 1 }]);
    } } }));
    const pet = targetPet(w, {}, 400); petId = pet.id;
    launchBonusAttack(w, w.units[0], pet, { missileSpeed: 300 });
    launchBonusAttack(w, w.units[0], w.units[1], { missileSpeed: 30000 });
    advanceMissiles(w);
    expect(w.missiles).toHaveLength(0);
    pet.statuses = [];
    arrive(w);
    expect(pet.hp).toBe(1000);
  });

  it.each([false, true])("drops pet-fired missiles during the same phase even when protection resolves first=%s", (protectionFirst) => {
    const w = arena(), target = targetPet(w, {}, 400);
    const source = spawnPet(w, w.units[0], { kind: "source", name: "Source pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 100,
      onAttackHit(ctx) { if (!("owner" in ctx.target)) petEffects(w, w.units[1], target, [{ type: "state", state: "untargetable", duration: 1 }]); },
    }, 0);
    const packet = [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 } }];
    const slow = { id: w.nextId++, owner: 0 as const, pet: source.id, target: { pet: target.id }, x: 0, perTick: 10, projectile: true, effects: packet, blinded: false };
    const fast = { ...slow, id: w.nextId++, target: 1 as const, perTick: 1000 };
    w.petMissiles = protectionFirst ? [fast, slow] : [slow, fast];
    advancePets(w);
    expect(w.petMissiles).toHaveLength(0);
    target.statuses = [];
    for (let i = 0; i < 50; i++) { w.tick++; advancePets(w); }
    expect(target.hp).toBe(1000);
    expect(w.units[1].totals.damageTaken).toBe(100);
  });

  it("retains a pet missile launched by a contact callback for movement on the following tick", () => {
    const w = arena(), target = targetPet(w, {}, 400);
    const packet = [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 } }];
    const source = spawnPet(w, w.units[0], { kind: "source", name: "Source pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 100,
      onAttackHit(ctx) {
        if (!("owner" in ctx.target)) (w.petMissiles ??= []).push({ id: w.nextId++, owner: 0, pet: ctx.pet.id, target: { pet: target.id }, x: 0, perTick: 1000, projectile: true, effects: packet, blinded: false });
      },
    }, 0);
    w.petMissiles = [{ id: w.nextId++, owner: 0, pet: source.id, target: 1, x: 0, perTick: 1000, projectile: true, effects: packet, blinded: false }];
    advancePets(w);
    expect(w.petMissiles).toHaveLength(1);
    expect(w.petMissiles![0]!.x).toBe(0);
    expect(target.hp).toBe(1000);
    w.tick++; advancePets(w);
    expect(w.petMissiles).toHaveLength(0);
    expect(target.hp).toBe(900);
  });
});

describe("opted-in dashes cross only walls with clear endpoints", () => {
  function terrainWorld() {
    const w = arena();
    w.terrain.push({ id: w.nextId++, owner: 1, from: 100, to: 200, endTick: 100 });
    return w;
  }

  it("crosses an intervening wall when the entire endpoint body is beyond it", () => {
    const w = terrainWorld();
    expect(dashDistance(w, w.units[0], 425)).toBe(425);
  });

  it.each([100, 150, 200, 220])("shortens a requested endpoint at %s to the near wall edge instead of extending it", (distance) => {
    const w = terrainWorld();
    expect(dashDistance(w, w.units[0], distance)).toBe(65);
  });

  it("reflects the endpoint clipping exactly and ignores expired or allied-only walls", () => {
    const w = terrainWorld();
    w.units[0].x = 300;
    expect(dashDistance(w, w.units[0], -150)).toBe(-65);
    w.terrain[0]!.endTick = 0;
    expect(dashDistance(w, w.units[0], -150)).toBe(-150);
    w.terrain[0]!.endTick = 100; w.terrain[0]!.owner = 0; w.terrain[0]!.enemyOnly = true;
    expect(dashDistance(w, w.units[0], -150)).toBe(-150);
  });

  it.each([1, -1])("completes the real dash in direction %s over terrain and clips an obstructed endpoint", (direction) => {
    for (const [requested, expected] of [[425, 425], [150, 65]]) {
      const e = ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: requested!, speed: 1000, crossTerrain: true } });
      const w = terrainWorld();
      const origin = direction === 1 ? 0 : 300;
      w.units[0].x = origin; w.units[1].x = origin + direction * 500;
      w.units[0].spec = { ...w.units[0].spec, abilities: [e] };
      startCast(w, w.units[0], e);
      for (let i = 0; w.units[0].action?.kind === "dash" && i < 100; i++) { w.tick++; progressDash(w, w.units[0]); }
      expect(w.units[0].x).toBeCloseTo(origin + direction * expected!, 10);
      expect(w.units[0].action).toBeUndefined();
    }
  });
});

describe("fixed attack speed, stat conversion and finite allocation inputs", () => {
  const conversion = { fixedAttackSpeed: true, attackDamageMultiplier: { base: .44, critChance: .35, bonusAttackSpeed: .3 } };

  it("retains growth when a fixed-speed fighter's external attack-speed ratio is zero", () => {
    const spec = fighter({ base: { attackSpeed: { base: .625, ratio: 0, bonus: .2 } }, bonus: { attackSpeed: 1 } });
    spec.statConversions = conversion;
    const w = arena(spec), self = w.units[0];
    self.statuses.push(lasting("cc", "cripple", .9));
    expect(derive(self).attackSpeed).toBe(.75);
    self.spec.base.attackSpeed.bonus = .4;
    expect(derive(self).attackSpeed).toBe(.875);
    expect(derive(self).bonusAttackSpeed).toBe(1.4);
  });

  it("converts crit and all bonus AS into total/bonus AD, with no extra attack speed or cripple loss", () => {
    const spec = fighter({ base: { attackSpeed: { base: .625, ratio: .625, bonus: .2 } }, bonus: { ad: 100, attackSpeed: .5, critChance: .5 } });
    spec.statConversions = conversion;
    const w = arena(spec), self = w.units[0];
    self.statuses.push(lasting("cc", "cripple", .9));
    expect(derive(self).ad).toBeCloseTo(365, 12);
    expect(derive(self).bonusAd).toBeCloseTo(265, 12);
    expect(derive(self).attackSpeed).toBe(.75);
    expect(derive(self).bonusAttackSpeed).toBe(.7);
    self.statuses.push(lasting("stat", "totalADReduction", 50));
    expect(derive(self).ad).toBeCloseTo(273.75, 12);
    expect(derive(self).bonusAd).toBeCloseTo(173.75, 12);
  });

  it("values bought AS as AD even when the fight attack speed is fixed", () => {
    const spec = fighter({ base: { attackSpeed: { base: .625, ratio: .625, bonus: .2 } }, bonus: { ad: 100, attackSpeed: .5, critChance: .5 } });
    spec.statConversions = conversion;
    const enemy = fighter({ base: { armor: 0, mr: 0 } });
    expect(damagePerSecond(spec, enemy).physical).toBeCloseTo(365 * 1.5 * .75, 10);
    expect(damagePerSecond({ ...spec, bonus: { ...spec.bonus, attackSpeed: 1 } }, enemy).physical).toBeGreaterThan(damagePerSecond(spec, enemy).physical);
  });

  it("multiplies total AS and raises its cap without summing separate caps", () => {
    const w = arena(fighter({ base: { attackSpeed: { base: 2, ratio: 1, bonus: 2 } } }));
    w.units[0].statuses.push(lasting("stat", "attackSpeedMultiplier", .25), lasting("stat", "attackSpeedCap", 90), lasting("stat", "attackSpeedCap", 10));
    expect(derive(w.units[0]).attackSpeed).toBe(5);
    w.units[0].statuses.push(lasting("stat", "attackSpeed", 200));
    expect(derive(w.units[0]).attackSpeed).toBe(90);
    const branch = cloneWorld(w);
    branch.units[0].statuses[0]!.value = .5;
    expect(derive(w.units[0]).attackSpeed).toBe(90);
    expect(Object.values(derive(branch.units[0])).filter((v) => typeof v === "number").every(Number.isFinite)).toBe(true);
  });

  it("reflects a converted ranged attacker with critical/basic modifiers and finite clocks", () => {
    const source = fighter({ id: "marksman", attack: { ...RANGED, onHitToPets: true }, bonus: { ad: 50, critChance: .5, attackSpeed: .5 }, hooks: { onAttack(ctx) { ctx.action.baseDamageScale = 1.1; ctx.action.bonusPhysical = { base: 30 }; ctx.action.missileSpeed = 3000; } } });
    source.statConversions = conversion;
    const enemy = fighter({ id: "opponent", base: { armor: 70, hp: 3000 } });
    const options = { distance: 400, modes: ["fight", "fight"] as ["fight", "fight"], settings: { maxSeconds: 30 } };
    const ab = fight({ ...options, fighters: [source, enemy] });
    const ba = fight({ ...options, fighters: [enemy, source] });
    expect(ab.win[0]).toBeCloseTo(ba.win[1], 12);
    expect(ab.hp[0]).toBeCloseTo(ba.hp[1], 12);
    expect(ab.damage[0]).toBeCloseTo(ba.damage[1], 10);
    expect(ab.seconds).toBeCloseTo(ba.seconds, 12);
    expect([ab.seconds, ...ab.hp, ...ab.damage]).toSatisfy((values: number[]) => values.every(Number.isFinite));
  });
});
