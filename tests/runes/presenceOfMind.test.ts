import { describe, expect, it } from "vitest";
import { abilityHit, applyEffect, beginDeathDefied, beginResurrection, dealDamage, hookContext, notifyKill, observeDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, destroyPet, spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { DamageReport, Effect, FighterSpec, KillCreditSnapshot, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, newUnit, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { buildPresenceOfMind } from "../../runes/presenceOfMind";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const rules = { presenceOfMind: { modelLevel: 20, manaRestore: 56, rangedManaRatio: 0.8,
  energyRestore: 6, damageCooldown: 8, takedownResourceRatio: 0.15, takedownDelay: 1,
  maximumResourceModel: "current-at-delivery" } } satisfies Pick<CombatRuneRules, "presenceOfMind">;
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0,
  radius: 30, moveSpeed: 0, duration: Infinity };
const packet: Effect = { type: "damage", damageType: "true", amount: { base: 10 } };
const report = { amount: 10, absorbed: 0, mitigated: 10, raw: 10, damageType: "true", persistent: false } satisfies DamageReport;
const prefix = "rune:presence-of-mind:";

function form(resourceType: string = "Mana", ranged = false): FighterSpec {
  return { ...fighter({ base: { hp: 10000, armor: 0, mr: 0, resource: 1000 }, attack: { ranged } }), resourceType };
}
function equipped(resourceType = "Mana", ranged = false, hooks?: KitHooks,
  input: Pick<CombatRuneRules, "presenceOfMind"> = rules): FighterSpec {
  const spec = form(resourceType, ranged);
  return { ...spec, hooks: composeHooks(hooks, [buildPresenceOfMind(spec, input).hooks], [], false) };
}
function arena(spec = equipped(), enemy: FighterSpec = fighter({ base: { hp: 10000, armor: 0, mr: 0 } })): World {
  const world = createWorld({ fighters: [spec, enemy], distance: 300, modes: ["idle", "idle"], settings: { maxSeconds: 10, log: true } });
  world.units[0].resource = 0;
  return world;
}
function hit(world: World, amount = 10): void {
  dealDamage(world, world.units[0], world.units[1], amount, "true");
}
function kill(world: World, side: 0 | 1 = 0): void {
  dealDamage(world, world.units[side], world.units[side === 0 ? 1 : 0], 50000, "true");
}
// Direct upkeep isolates eligibility and due-time semantics. It does not imply
// that an ended duel runs another second; the runWorld test checks that separately.
function upkeep(world: World, tick: number, side: 0 | 1 = 0): void {
  world.tick = tick;
  const unit = world.units[side];
  (unit.alive ? unit.spec.hooks?.onTick : unit.spec.hooks?.onTickWhileDead)?.(hookContext(world, unit));
}
function through(world: World, tick: number): void {
  while (!world.result && world.tick <= tick) step(world, [idle, idle]);
}
function retainedVictim(): FighterSpec {
  return fighter({ base: { hp: 10000, armor: 0, mr: 0 }, hooks: {
    onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); },
  } });
}

describe("Presence of Mind actual damage resource restoration", () => {
  it.each([
    ["Mana", false, 56], ["Mana", true, 56 * 0.8], ["Energy", false, 6], ["Energy", true, 6],
  ] as const)("restores the model's %s amount with ranged=%s", (kind, ranged, expected) => {
    const world = arena(equipped(kind, ranged)); hit(world);
    expect(world.units[0].resource).toBe(expected);
    expect(world.units[0].hp).toBe(10000);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("uses native persistent packets and shares one cooldown across their damage types", () => {
    const world = arena();
    dealDamage(world, world.units[0], world.units[1], 10, "magic", { persistent: true, ability: "Fixture DoT" });
    dealDamage(world, world.units[0], world.units[1], 10, "physical", { ability: "Fixture proc" });
    hit(world); expect(world.units[0].resource).toBe(56);
    world.tick = 240; hit(world); expect(world.units[0].resource).toBe(112);
  });

  it("clips fractional deficits without rounding or increasing the maximum", () => {
    const world = arena(); world.units[0].resource = 999.75;
    hit(world); expect(world.units[0].resource).toBe(1000);
    expect(derive(world.units[0]).maxResource).toBe(1000);
  });

  it.each(["Mana", "Energy"])("consumes the shared cooldown at full %s", kind => {
    const world = arena(equipped(kind)); world.units[0].resource = 1000;
    hit(world); expect(world.units[0].resource).toBe(1000);
    world.units[0].resource = 0;
    world.tick = 239; hit(world); expect(world.units[0].resource).toBe(0);
    world.tick = 240; hit(world); expect(world.units[0].resource).toBe(kind === "Mana" ? 56 : 6);
  });

  it("makes the exact 240-tick deadline relative to the first accepted packet", () => {
    const world = arena(); world.tick = 17; hit(world);
    world.tick = 256; hit(world); expect(world.units[0].resource).toBe(56);
    world.tick = 257; hit(world); expect(world.units[0].resource).toBe(112);
    world.tick = 258; hit(world); expect(world.units[0].resource).toBe(112);
  });

  it("does not turn ability haste into a shorter perk cooldown", () => {
    const spec = equipped(); spec.bonus = { abilityHaste: 500, basicAbilityHaste: 1000, ultimateAbilityHaste: 1000 };
    const world = arena(spec); hit(world);
    world.tick = 239; hit(world); expect(world.units[0].resource).toBe(56);
    world.tick = 240; hit(world); expect(world.units[0].resource).toBe(112);
  });

  it("restores resource through noHealing and healing modifiers without awarding HP", () => {
    const world = arena(), self = world.units[0]; self.hp = 100;
    self.statuses.push(lasting("state", "noHealing"), lasting("grievousWounds", "grievous"), lasting("stat", "healingIncrease", 1));
    hit(world); expect(self.resource).toBe(56); expect(self.hp).toBe(100);
    expect(self.totals.healing).toBe(0);
  });

  it("accepts the finite tiny negative balance permitted by cast-cost affordability", () => {
    const world = arena(); world.units[0].resource = -1e-9; hit(world);
    expect(world.units[0].resource).toBe(56 - 1e-9);
  });
});

describe("Presence of Mind actual HP/shield packet policy", () => {
  it("qualifies shield-only damage without demanding health loss", () => {
    const world = arena(); world.units[1].statuses.push(lasting("shield", "fixture", 100));
    hit(world); expect(world.units[1].hp).toBe(10000);
    expect(world.units[1].totals.absorbed).toBe(10);
    expect(world.units[0].resource).toBe(56);
  });

  it.each(["zero", "invulnerable", "stasis", "parry"] as const)("does not consume a cooldown for an ineffective %s packet", defense => {
    const world = arena();
    if (defense !== "zero") world.units[1].statuses.push(lasting("state", defense));
    hit(world, defense === "zero" ? 0 : 10);
    expect(world.units[0].resource).toBe(0);
    world.units[1].statuses = []; hit(world); expect(world.units[0].resource).toBe(56);
  });

  it("qualifies actual shield absorption before a late parry negates HP damage", () => {
    const world = arena(); world.units[1].statuses.push(lasting("shield", "fixture", 100), lasting("state", "parry"));
    hit(world); expect(world.units[1].hp).toBe(10000);
    expect(world.units[0].resource).toBe(56);
  });

  it("waits through a whole-ability spell shield for the next accepted packet", () => {
    const world = arena(), spell = ability({ key: "Q", delivery: { kind: "target", range: 500 }, onHit: [packet] });
    world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!);
    expect(world.units[0].resource).toBe(0);
    abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!);
    expect(world.units[0].resource).toBe(56);
  });

  it("ignores hostile incoming damage, self damage and a same-side foreign body", () => {
    const world = arena(), self = world.units[0], other = newUnit(form(), 0, 0, 10000, 1000);
    dealDamage(world, world.units[1], self, 10, "true");
    dealDamage(world, self, self, 10, "true");
    dealDamage(world, other, world.units[1], 10, "true");
    expect(self.resource).toBe(0); hit(world); expect(self.resource).toBe(56);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("does not treat a pet of targeting class %s as the actual champion body", targetClass => {
    const world = arena(), target = spawnPet(world, world.units[1], { ...petSpec, ...(targetClass ? { targetClass } : {}) }, 300);
    damagePet(world, world.units[0], target, 50000, "true", false);
    expect(world.units[0].resource).toBe(0); hit(world); expect(world.units[0].resource).toBe(56);
  });
});

describe("Presence of Mind native pet ownership and body locality", () => {
  it.each([true, false])("credits an ordinary owned pet with attackLike=%s once across multipacket hits", attackLike => {
    const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0);
    petCombatHit(world, pet, world.units[1], [packet, packet], attackLike);
    expect(world.units[0].resource).toBe(56);
    expect(world.units[1].hp).toBe(9980);
    expect(Object.keys(pet.memory).some(key => key.startsWith(prefix))).toBe(false);
  });

  it("keeps one owner cooldown across two pets and the champion's packet", () => {
    const world = arena(), pets = [spawnPet(world, world.units[0], petSpec, 0), spawnPet(world, world.units[0], petSpec, 0)];
    for (const pet of pets) petCombatHit(world, pet, world.units[1], [packet], false);
    hit(world); expect(world.units[0].resource).toBe(56);
  });

  it("does not mistake an enemy pet's native packet for an owned pet proc", () => {
    const world = arena(), enemyPet = spawnPet(world, world.units[1], petSpec, 300);
    petCombatHit(world, enemyPet, world.units[0], [packet], false);
    expect(world.units[0].resource).toBe(0);
    const ownPet = spawnPet(world, world.units[0], petSpec, 0);
    petCombatHit(world, ownPet, world.units[1], [packet], false);
    expect(world.units[0].resource).toBe(56);
  });

  it("uses a real launched pet snapshot after pet removal and current owner range type", () => {
    const world = arena(equipped("Mana", true));
    const pet = spawnPet(world, world.units[0], { ...petSpec, attack: {
      range: 500, interval: 1, attackLike: true, missileSpeed: 300, effects: [packet],
    } }, 0);
    advancePets(world); expect(world.petMissiles).toHaveLength(1);
    destroyPet(world, pet); expect(world.pets).not.toContain(pet);
    for (let tick = 1; tick <= 60; tick++) { world.tick = tick; advancePets(world); }
    expect(world.petMissiles).toHaveLength(0);
    expect(world.units[1].hp).toBe(9990);
    expect(world.units[0].resource).toBe(56 * 0.8);
  });

  it("excludes an actually reported clone actor without excluding native clone kill credit", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...petSpec, targetClass: "champion", unitClass: "clone" }, 0);
    petCombatHit(world, pet, world.units[1], [packet], false);
    expect(world.units[0].resource).toBe(0);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 50000 } }], false);
    upkeep(world, 30); expect(world.units[0].resource).toBe(150);
  });

  it("does not lend resource or pending state to a pet contact view", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0), view = petFormulaTarget(pet, world.units[0]);
    const hooks = buildPresenceOfMind(form(), rules).hooks;
    expect(() => hooks.onKill!({ ...hookContext(world, view), victim: world.units[1] })).not.toThrow();
    hooks.onTick!(hookContext(world, view));
    expect(Object.keys(view.memory).some(key => key.startsWith(prefix))).toBe(false);
    expect(world.units[0].resource).toBe(0);
  });

  it("isolates cooldowns and due restores across cloned worlds sharing a reusable spec", () => {
    const world = arena(undefined, retainedVictim()); kill(world);
    const branch = cloneWorld(world); branch.units[0].statuses.push(lasting("stat", "maxResource", 1000));
    upkeep(branch, 30); expect(branch.units[0].resource).toBe(356);
    expect(world.units[0].resource).toBe(56);
    upkeep(world, 30); expect(world.units[0].resource).toBe(206);
    upkeep(branch, 60); expect(branch.units[0].resource).toBe(356);
    const second = arena(); hit(second); expect(second.units[0].resource).toBe(56);
  });

  it("cannot transfer an old body's state into a replacement unit on the same side", () => {
    const world = arena(undefined, retainedVictim()); kill(world);
    const old = world.units[0], replacement = arena().units[0]; world.units[0] = replacement;
    upkeep(world, 30); old.spec.hooks!.onTick!(hookContext(world, old));
    expect(replacement.resource).toBe(0); expect(old.resource).toBe(56);
  });

  it("retains one cooldown through same-body forms and samples current Mana range", () => {
    const melee = { ...equipped(), form: "melee" }, ranged = { ...equipped("Mana", true), form: "ranged" };
    melee.forms = ranged.forms = { melee, ranged };
    const world = arena(melee); hit(world); setForm(world, world.units[0], "ranged");
    world.tick = 239; hit(world); expect(world.units[0].resource).toBe(56);
    world.tick = 240; hit(world); expect(world.units[0].resource).toBe(56 + 56 * 0.8);
  });
});

describe("Presence of Mind native takedown and delayed resource policies", () => {
  it("combines independent damage and takedown arms at the first due upkeep", () => {
    const world = arena(undefined, retainedVictim()); world.tick = 17; kill(world);
    expect(world.units[1].hp).toBe(1); expect(world.units[1].fallen).toBe(true);
    expect(world.units[0].resource).toBe(56);
    upkeep(world, 46); expect(world.units[0].resource).toBe(56);
    upkeep(world, 47); expect(world.units[0].resource).toBe(206);
    notifyKill(world, world.units[0], world.units[1]); upkeep(world, 100);
    expect(world.units[0].resource).toBe(206);
  });

  it("reads the changed maximum at delivery rather than fabricating a credit resource snapshot", () => {
    const world = arena(undefined, retainedVictim()); kill(world);
    world.units[0].statuses.push(lasting("stat", "maxResource", 1000));
    expect(world.units[0].resource).toBe(56);
    through(world, 29); expect(world.units[0].resource).toBe(56);
    through(world, 30); expect(world.units[0].resource).toBe(356);
  });

  it("does not make the damage cooldown suppress a native takedown restoration", () => {
    const world = arena(undefined, retainedVictim()); hit(world);
    world.tick = 1; kill(world); expect(world.units[0].resource).toBe(56);
    upkeep(world, 30); expect(world.units[0].resource).toBe(56);
    upkeep(world, 31); expect(world.units[0].resource).toBe(206);
  });

  it("schedules a native execute kill without inventing a postdamage observation", () => {
    const world = arena(undefined, retainedVictim());
    applyEffect(world, world.units[0], world.units[1], { type: "execute", threshold: { base: 50000 } }, { scale: 1 });
    expect(world.units[0].resource).toBe(0);
    upkeep(world, 30); expect(world.units[0].resource).toBe(150);
  });

  it.each(["dead", "zero-HP", "fallen", "counted-dead", "resurrection", "stasis"] as const)
  ("allows isolated capped resource delivery for a %s recipient without healing it", life => {
    const world = arena(undefined, retainedVictim()), self = world.units[0]; kill(world);
    if (life === "dead") { self.alive = false; self.hp = 0; }
    if (life === "zero-HP") self.hp = 0;
    if (life === "fallen") beginDeathDefied(world, self, { duration: 3 });
    if (life === "counted-dead") self.deathNotified = true;
    if (life === "resurrection") beginResurrection(world, self, { duration: 3 });
    if (life === "stasis") self.statuses.push(lasting("state", "stasis"));
    const hp = self.hp; upkeep(world, 30);
    expect(self.resource).toBe(206); expect(self.hp).toBe(hp); expect(self.totals.healing).toBe(0);
  });

  it("can create the resource entitlement from native pet credit while the owner is already dead", () => {
    const world = arena(), self = world.units[0], pet = spawnPet(world, self, petSpec, 0);
    self.hp = 0; self.alive = false; self.deathNotified = true;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 50000 } }], false);
    expect(self.resource).toBe(0); upkeep(world, 30); expect(self.resource).toBe(150);
    expect(self.hp).toBe(0); expect(self.alive).toBe(false);
  });

  it("does not observe ordinary dead or zero-HP owner damage, including pet packets", () => {
    for (const alive of [false, true]) {
      const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0);
      world.units[0].hp = 0; world.units[0].alive = alive;
      petCombatHit(world, pet, world.units[1], [packet], false);
      expect(world.units[0].resource).toBe(0);
    }
  });

  it("uses the existing positive-HP observer for fallen, counted-dead and protected owners", () => {
    for (const state of ["fallen", "counted-dead", "resurrection", "stasis"] as const) {
      const world = arena(), self = world.units[0], pet = spawnPet(world, self, petSpec, 0);
      if (state === "fallen") beginDeathDefied(world, self, { duration: 3 });
      if (state === "counted-dead") self.deathNotified = true;
      if (state === "resurrection") beginResurrection(world, self, { duration: 3 });
      if (state === "stasis") self.statuses.push(lasting("state", "stasis"));
      petCombatHit(world, pet, world.units[1], [packet], false);
      expect(self.resource).toBe(56);
    }
  });

  it("waits through resurrection interception and restores only on the later counted kill", () => {
    const enemy = fighter({ base: { hp: 10000, armor: 0, mr: 0 }, hooks: {
      onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 3 }); },
    } });
    const world = arena(undefined, enemy); kill(world);
    expect(world.units[1].deathNotified).toBeUndefined(); expect(world.units[0].resource).toBe(56);
    upkeep(world, 30); expect(world.units[0].resource).toBe(56);
    kill(world); upkeep(world, 59); expect(world.units[0].resource).toBe(56);
    upkeep(world, 60); expect(world.units[0].resource).toBe(206);
  });

  it("consumes a due entitlement at full resource rather than banking it after spending", () => {
    const world = arena(undefined, retainedVictim()); kill(world); world.units[0].resource = 1000;
    upkeep(world, 30); expect(world.units[0].resource).toBe(1000);
    world.units[0].resource = 0; upkeep(world, 60); expect(world.units[0].resource).toBe(0);
  });

  it("consumes rather than transfers a pending Mana entitlement through a resource-kind change", () => {
    const mana: FighterSpec = { ...equipped(), form: "mana" }, energy: FighterSpec = { ...equipped("Energy"), form: "energy" };
    mana.forms = energy.forms = { mana, energy };
    const world = arena(mana, retainedVictim()); kill(world); setForm(world, world.units[0], "energy");
    world.units[0].resource = 0; upkeep(world, 30); expect(world.units[0].resource).toBe(0);
    setForm(world, world.units[0], "mana"); upkeep(world, 60); expect(world.units[0].resource).toBe(0);
  });

  it("does not let the pending timer keep an ordinary completed duel alive", () => {
    const world = arena(); kill(world);
    expect(world.units[0].resource).toBe(56);
    const result = runWorld(world, [idle, idle]);
    expect(result.win).toEqual([1, 0]); expect(world.result?.tick).toBe(0);
    expect(world.units[0].resource).toBe(56);
  });
});

describe("Presence of Mind fail-closed rule and state contracts", () => {
  it.each(["Fury", "None", "mana", "energy", "Rage", ""])("rejects unsupported resource type %s rather than substituting a rune", kind => {
    expect(() => buildPresenceOfMind(form(kind), rules)).toThrow(/Mana|Energy|resource/);
  });

  it("rejects a missing resource type even when the numerical pool is positive", () => {
    const spec = form(); delete spec.resourceType;
    expect(() => buildPresenceOfMind(spec, rules)).toThrow(/Mana|Energy|resource/);
  });

  it.each(["manaRestore", "energyRestore", "damageCooldown", "takedownDelay"] as const)("rejects invalid positive numeric rule %s", field => {
    for (const value of [0, -1, NaN, Infinity]) {
      expect(() => buildPresenceOfMind(form(), { presenceOfMind: { ...rules.presenceOfMind, [field]: value } })).toThrow();
    }
  });

  it.each(["rangedManaRatio", "takedownResourceRatio"] as const)("rejects invalid fraction rule %s", field => {
    for (const value of [0, -1, NaN, Infinity, 1.1]) {
      expect(() => buildPresenceOfMind(form(), { presenceOfMind: { ...rules.presenceOfMind, [field]: value } })).toThrow();
    }
  });

  it("rejects absent rules, a different model level, wrong sampling model and unsafe tick durations", () => {
    expect(() => buildPresenceOfMind(form(), {} as Pick<CombatRuneRules, "presenceOfMind">)).toThrow();
    expect(() => buildPresenceOfMind(form(), { presenceOfMind: { ...rules.presenceOfMind, modelLevel: 18 } } as unknown as Pick<CombatRuneRules, "presenceOfMind">)).toThrow();
    expect(() => buildPresenceOfMind(form(), { presenceOfMind: { ...rules.presenceOfMind, maximumResourceModel: "at-credit" } } as unknown as Pick<CombatRuneRules, "presenceOfMind">)).toThrow();
    for (const field of ["damageCooldown", "takedownDelay"] as const) for (const value of [Number.MIN_VALUE, Number.MAX_VALUE]) {
      expect(() => buildPresenceOfMind(form(), { presenceOfMind: { ...rules.presenceOfMind, [field]: value } })).toThrow();
    }
  });

  it("snapshots independent reviewed scalars without hardcoding the production amounts", () => {
    const input = { presenceOfMind: { ...rules.presenceOfMind, manaRestore: 20, rangedManaRatio: 0.5,
      energyRestore: 3, damageCooldown: 2, takedownDelay: 2, takedownResourceRatio: 0.2 } };
    const spec = equipped("Mana", true, undefined, input);
    input.presenceOfMind.manaRestore = 900; input.presenceOfMind.damageCooldown = 100;
    input.presenceOfMind.takedownDelay = 100; input.presenceOfMind.takedownResourceRatio = 0.9;
    const world = arena(spec, retainedVictim()); hit(world); expect(world.units[0].resource).toBe(10);
    world.tick = 60; kill(world); expect(world.units[0].resource).toBe(20);
    upkeep(world, 119); expect(world.units[0].resource).toBe(20);
    upkeep(world, 120); expect(world.units[0].resource).toBe(220);
  });

  it("requires immutable native credit rather than reconstructing absent resource facts", () => {
    const world = arena(), hooks = buildPresenceOfMind(form(), rules).hooks;
    const base = { ...hookContext(world, world.units[0]), victim: world.units[1] };
    expect(() => hooks.onKill!(base)).toThrow(/native|immutable|credit/);
    const credit: KillCreditSnapshot = { tick: 0, hp: 10000, maxHp: 10000, missingHp: 0, alive: true,
      fallen: false, deathDefied: false, resurrecting: false, deathNotified: false, victimIsEnemyChampionBody: true };
    expect(() => hooks.onKill!({ ...base, killCredit: credit })).toThrow(/native|immutable|credit/);
    expect(() => hooks.onKill!({ ...base, killCredit: Object.freeze({ ...credit, missingHp: 1 }) })).toThrow(/native|immutable|credit/);
    expect(() => hooks.onKill!({ ...base, killCredit: Object.freeze({ ...credit, tick: 1 }) })).toThrow(/native|immutable|credit/);
  });

  it.each([NaN, Infinity])("rejects a corrupted current resource %s on a real accepted packet", value => {
    const world = arena(); world.units[0].resource = value;
    expect(() => hit(world)).toThrow(/resource|finite/);
  });

  it.each([0, -1, NaN, Infinity])("rejects a corrupted derived resource cap %s", value => {
    const world = arena(); world.units[0].spec = { ...world.units[0].spec, base: { ...world.units[0].spec.base, resource: value } };
    expect(() => hit(world)).toThrow(/resource|finite|positive/);
  });

  it("rejects malformed HP/shield reports individually rather than accepting a positive sum", () => {
    for (const patch of [{ amount: -1, absorbed: 10 }, { amount: 10, absorbed: -1 }, { amount: NaN }, { absorbed: Infinity }, { amount: Number.MAX_VALUE, absorbed: Number.MAX_VALUE }]) {
      const world = arena();
      expect(() => observeDamage(world, world.units[0], world.units[1], { ...report, ...patch }, false)).toThrow();
    }
  });

  it("rejects unsafe clock/deadline arithmetic for damage and native takedown arms", () => {
    for (const tick of [-1, 0.5, NaN, Number.MAX_SAFE_INTEGER - 100]) {
      const world = arena(); world.tick = tick;
      expect(() => hit(world)).toThrow(/tick|clock|safe|deadline/);
    }
    const world = arena(); world.tick = Number.MAX_SAFE_INTEGER - 10;
    expect(() => kill(world)).toThrow(/tick|clock|safe|deadline/);
  });

  it("rejects corrupted primitive cooldown and pending deadline state instead of banking it", () => {
    const damageWorld = arena(); hit(damageWorld); damageWorld.units[0].memory[prefix + "damage-ready"] = NaN;
    expect(() => hit(damageWorld)).toThrow(/cooldown|tick|safe|deadline/);
    const pendingWorld = arena(undefined, retainedVictim()); kill(pendingWorld);
    pendingWorld.units[0].memory[prefix + "due"] = Infinity;
    expect(() => upkeep(pendingWorld, 30)).toThrow(/tick|safe|deadline|pending/);
  });

  it("rejects malformed pending booleans, kinds and negative deadlines", () => {
    for (const [field, value] of [["pending", "yes"], ["kind", false], ["due", -1]] as const) {
      const world = arena(undefined, retainedVictim()); kill(world);
      world.units[0].memory[prefix + field] = value;
      expect(() => upkeep(world, 30)).toThrow(/boolean|kind|deadline|pending/);
    }
  });

  it("consumes a due entitlement before a malformed delivery cap fails closed", () => {
    const world = arena(undefined, retainedVictim()); kill(world);
    const self = world.units[0];
    self.spec = { ...self.spec, base: { ...self.spec.base, resource: Infinity } };
    expect(() => upkeep(world, 29)).not.toThrow();
    expect(() => upkeep(world, 30)).toThrow(/resource|finite|maximum/);
    self.spec = { ...self.spec, base: { ...self.spec.base, resource: 1000 } };
    upkeep(world, 60); expect(self.resource).toBe(56);
  });

  it("states the bounded resource policies and does not promise full page, execute or after-death damage parity", () => {
    const text = buildPresenceOfMind(form(), rules).assumptions.join(" ");
    expect(text).toMatch(/level.?20|level 20/i); expect(text).toMatch(/current.*maximum|maximum.*delivery|derived.*delivery/i);
    expect(text).toMatch(/policy|assumption|unmeasured/i); expect(text).toMatch(/not prolong|never prolong|does not extend|never extend/i);
    expect(text).toMatch(/execute/i); expect(text).toMatch(/clone/i); expect(text).toMatch(/after.death|post.death|dead.*damage/i);
  });
});
