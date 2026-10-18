import { describe, expect, it } from "vitest";
import { completeCast } from "../../engine/sim/actions";
import { applyEffect, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { advancePets, areaOnPets, damagePet, nearestPetTarget, petEffects, petHit, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld } from "../../engine/sim/simulate";
import type { Effect, PetDamageCategory, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { lasting } from "./helpers";
import { fighter, RANGED } from "./kits";

const spec = (overrides: Partial<PetSpec> = {}): PetSpec => ({ kind: "typed", name: "Typed pet", hp: 100, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 20, ...overrides });
const effect: Effect = { type: "damage", damageType: "magic", amount: { base: 100 } };
const world = (ranged = false) => createWorld({ fighters: [fighter({ attack: ranged ? RANGED : undefined }), fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 100, modes: ["idle", "idle"], settings: { log: true } });
const clock = (w: World, tick: number) => { while (w.tick <= tick) { advancePets(w); w.tick++; } };

describe("typed pet damage and independent crowd control", () => {
  it.each([["proc", 0], ["persistent", 1], ["area", 3], ["singleTarget", 8]] as const)("uses the fixed %s table independently of damage/resistances", (category, damage) => {
    const w = world();
    const plant = spawnPet(w, w.units[1], spec({ hp: 12, armor: 999, mr: 999, fixedDamage: { proc: 0, persistent: 1, area: 3, singleTarget: 8 } }), 50);
    damagePet(w, w.units[0], plant, 1e6, "true", false, "Spell", category);
    expect(plant.hp).toBe(12 - damage);
  });
  it.each([[false, 8], [true, 4]] as const)("uses fixed melee/ranged basic damage (%s)", (ranged, damage) => {
    const w = world(ranged), plant = spawnPet(w, w.units[1], spec({ hp: 12, fixedDamage: { basic: 99, meleeBasic: 8, rangedBasic: 4 } }), 50);
    damagePet(w, w.units[0], plant, 1, "physical", true);
    expect(plant.hp).toBe(12 - damage);
  });
  it("kills a Voidling from a champion attack but not another pet attack", () => {
    const w = world(), voidling = spawnPet(w, w.units[1], spec({ diesToChampionAttack: true }), 50), attackingPet = spawnPet(w, w.units[0], spec(), 0);
    petHit(w, attackingPet, voidling, [{ type: "damage", damageType: "true", amount: { base: 1 } }], true);
    expect(voidling.hp).toBe(99);
    damagePet(w, w.units[0], voidling, 1, "physical", true);
    expect(w.pets).not.toContain(voidling);
  });
  it("CC and DoTs affect the actual pet and retain source ability identity", () => {
    const w = world(), pet = spawnPet(w, w.units[1], spec(), 50);
    petEffects(w, w.units[0], pet, [{ type: "cc", cc: "blind", duration: 1 }, { type: "dot", damageType: "true", total: { base: 20 }, duration: 1, interval: 0.5 }], "area", "Q");
    expect(pet.statuses?.some((status) => status.key === "blind")).toBe(true);
    expect(w.units[1].statuses).toHaveLength(0);
    clock(w, 30);
    expect(pet.hp).toBe(80);
    expect(pet.statuses?.some((status) => status.key === "blind")).toBe(false);
  });
  it("plant immunity prevents airborne/cripple/silence but not blind or disarm", () => {
    const w = world(), pet = spawnPet(w, w.units[1], spec({ ccImmune: ["airborne", "cripple", "silence"] }), 50);
    for (const cc of ["airborne", "cripple", "silence", "blind", "disarm"] as const) petEffects(w, w.units[0], pet, [{ type: "cc", cc, duration: 1 }]);
    expect(pet.statuses?.map((status) => status.key)).toEqual(["blind", "disarm"]);
  });
  it("executes eligible fixed-HP pets without reducing execute to their damage table", () => {
    const w = world(), pet = spawnPet(w, w.units[1], spec({ hp: 12, fixedDamage: { singleTarget: 8 } }), 50);
    petEffects(w, w.units[0], pet, [{ type: "execute", threshold: { base: 48 } }]);
    expect(w.pets).not.toContain(pet);
  });
  it("keeps dynamic pet formulas on the actual pet health and identity", () => {
    const w = world(), pet = spawnPet(w, w.units[1], spec(), 50);
    expect(petFormulaTarget(pet, w.units[0]).petId).toBe(pet.id);
    petEffects(w, w.units[0], pet, [{ type: "damage", damageType: "true", amount: { base: 0 }, amountFor: (_owner, target) => target.petId === pet.id ? derive(target).maxHp / 2 : 0 }]);
    expect(pet.hp).toBe(50);
  });
  it("weights each fixed-damage category once for a fractional expected packet", () => {
    const dealt: number[] = [], w = world(), pet = spawnPet(w, w.units[1], spec({ hp: 12, fixedDamage: { singleTarget: 8, area: 3 }, onDamaged: (hit) => dealt.push(hit.dealt) }), 50);
    petEffects(w, w.units[0], pet, [effect], "singleTarget", "Q", .75);
    petEffects(w, w.units[0], pet, [effect], "area", "Q", .25);
    expect(dealt).toEqual([6, .75]); expect(pet.hp).toBe(5.25);
  });
  it("uses the pet's resistance debuff before owner penetration and expires it at its exact end", () => {
    const w = world(), pet = spawnPet(w, w.units[1], spec({ hp: 1000, mr: 100 }), 50), caster = w.units[0];
    caster.spec = { ...caster.spec, bonus: { magicPen: 10 } };
    applyEffect(w, caster, caster, { type: "stat", stat: "magicPenPercent", amount: { base: .2 }, duration: 5 }, { scale: 1 });
    petEffects(w, caster, pet, [{ type: "stat", stat: "mrReductionPercent", amount: { base: .25 }, duration: 1 }]);
    damagePet(w, caster, pet, 100, "magic", false);
    expect(1000 - pet.hp).toBeCloseTo(100 / 1.5, 12);
    const before = pet.hp; w.tick = 30; damagePet(w, caster, pet, 100, "magic", false);
    expect(before - pet.hp).toBeCloseTo(100 / 1.7, 12);
  });
  it.each(["untargetable", "stasis", "invulnerable"] as const)("respects actual pet %s for area damage without borrowing its owner's state", (state) => {
    const w = world(), pet = spawnPet(w, w.units[1], spec(), 50);
    petEffects(w, w.units[1], pet, [{ type: "state", state, duration: 1 }]);
    areaOnPets(w, w.units[0], 0, 100, [effect, { type: "cc", cc: "slow", strength: .3, duration: 2 }]);
    expect(pet.hp).toBe(100);
    expect(pet.statuses?.some((status) => status.key === "slow")).toBe(state === "invulnerable");
    expect(w.units[1].statuses).toHaveLength(0);
    w.tick = 30; areaOnPets(w, w.units[0], 0, 100, [{ ...effect, amount: { base: 20 } }]);
    expect(pet.hp).toBe(80);
  });
  it.each([["untargetable", 80], ["stasis", 90], ["invulnerable", 90]] as const)("keeps existing pet DoTs through %s with normal damage protection and exact expiry", (state, expected) => {
    const w = world(), pet = spawnPet(w, w.units[1], spec(), 50);
    petEffects(w, w.units[0], pet, [{ type: "dot", damageType: "true", total: { base: 20 }, duration: 1, interval: .5 }]);
    petEffects(w, w.units[1], pet, [{ type: "state", state, duration: 1 }]);
    clock(w, 30); expect(pet.hp).toBe(expected);
  });
  it("actual enemy pet kills notify once; expiry and own destruction give no kill", () => {
    const kills: string[] = [], caster = fighter({ hooks: { onKill(ctx) { kills.push(ctx.pet?.spec.name ?? "champion"); } } });
    const w = createWorld({ fighters: [caster, fighter()], distance: 100, modes: ["idle", "idle"] });
    const enemy = spawnPet(w, w.units[1], spec(), 50), own = spawnPet(w, w.units[0], spec(), 0), expires = spawnPet(w, w.units[1], spec({ duration: 0 }), 50);
    damagePet(w, w.units[0], enemy, 100, "true", false);
    damagePet(w, w.units[0], enemy, 100, "true", false);
    damagePet(w, w.units[0], own, 100, "true", false);
    advancePets(w);
    expect(w.pets).not.toContain(expires);
    expect(kills).toEqual(["Typed pet"]);
  });
});

describe("pet attacks use independent actors and travel", () => {
  const attack = { range: 500, interval: 1, attackLike: true, effects: [effect] };
  it("does not borrow owner blindness, lifesteal, on-hits or attack hooks", () => {
    let attacks = 0;
    const w = world(); w.units[0].spec = { ...w.units[0].spec, hooks: { onAttackHit() { attacks++; } }, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "true", amount: { base: 9000 } }] } };
    w.units[0].hp = 500; w.units[0].statuses.push(lasting("cc", "blind"), { ...lasting("stat", "lifeSteal"), value: 1 });
    const pet = spawnPet(w, w.units[0], spec({ attack }), 0);
    advancePets(w);
    expect(w.units[1].hp).toBe(9900); expect(w.units[0].hp).toBe(500); expect(attacks).toBe(0);
    petEffects(w, w.units[1], pet, [{ type: "cc", cc: "blind", duration: 1 }]); pet.nextAttackTick = 1; w.tick = 1; advancePets(w);
    expect(w.units[1].hp).toBe(9900);
  });
  it.each(["disarm", "stun", "sleep", "suppression"] as const)("independent %s stops pet attacks", (cc) => {
    const w = world(), pet = spawnPet(w, w.units[0], spec({ attack }), 0);
    petEffects(w, w.units[1], pet, [{ type: "cc", cc, duration: 1 }]); advancePets(w);
    expect(w.units[1].hp).toBe(10000);
  });
  it("keeps stationary pets stationary regardless of the movement-speed minimum", () => {
    const w = world(), pet = spawnPet(w, w.units[0], spec({ attack: { ...attack, range: 0 } }), -1000);
    clock(w, 20); expect(pet.x).toBe(-1000);
  });
  it.each(["invisible", "untargetable", "stasis"] as const)("skips dynamically %s pets when choosing a viable new attack target", (state) => {
    const w = world(), attacker = spawnPet(w, w.units[0], spec({ attack, target: nearestPetTarget }), 0), invalid = spawnPet(w, w.units[1], spec(), 30);
    petEffects(w, w.units[1], invalid, [{ type: "state", state, duration: 1 }]);
    expect(nearestPetTarget(w, attacker)).toBe(w.units[1]);
    advancePets(w); expect(w.units[1].hp).toBe(9900); expect(invalid.hp).toBe(100);
  });
  it("winds up then launches a homing missile; the projectile survives its pet", () => {
    const w = world(), pet = spawnPet(w, w.units[0], spec({ attack: { ...attack, windup: 0.2, missileSpeed: 300 } }), 0);
    clock(w, 5); expect(w.petMissiles ?? []).toHaveLength(0); expect(w.units[1].hp).toBe(10000);
    clock(w, 6); expect(w.petMissiles).toHaveLength(1);
    damagePet(w, w.units[1], pet, 1000, "true", false);
    clock(w, 30); expect(w.units[1].hp).toBe(9900);
  });
  it("launched attacks land through later invisibility but not untargetability", () => {
    for (const state of ["invisible", "untargetable"] as const) {
      const w = world(); spawnPet(w, w.units[0], spec({ attack: { ...attack, missileSpeed: 300 } }), 0); advancePets(w);
      applyEffect(w, w.units[1], w.units[1], { type: "state", state, duration: 2 }, { scale: 1 });
      w.tick = 1; clock(w, 20); expect(w.units[1].hp).toBe(state === "invisible" ? 9900 : 10000);
    }
  });
  it("projectile walls stop a pet missile before impact", () => {
    const w = world(); spawnPet(w, w.units[0], spec({ attack: { ...attack, missileSpeed: 300 } }), 0); advancePets(w);
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 30, radius: 1, startTick: 0, endTick: 100 });
    w.tick = 1; clock(w, 10); expect(w.units[1].hp).toBe(10000); expect(w.petMissiles).toHaveLength(0);
  });
  it("copies independent status, windup and missile clocks across branches", () => {
    const w = world(), pet = spawnPet(w, w.units[0], spec({ attack: { ...attack, windup: 0.2, missileSpeed: 300 } }), 0);
    advancePets(w); const clone = cloneWorld(w); clone.pets[0]!.windup!.launchTick = 90;
    expect(pet.windup!.launchTick).toBe(6);
    w.tick = 6; advancePets(w); const fork = cloneWorld(w); fork.petMissiles![0]!.x += 100;
    expect(w.petMissiles![0]!.x).toBe(0);
  });
  it("Rammus reflects into the attacking pet, including proc immunity for fixed-health plants", () => {
    const ram = kit("Rammus").spec;
    for (const fixedDamage of [undefined, { proc: 0 }]) {
      const w = createWorld({ fighters: [fighter(), ram], distance: 100, modes: ["idle", "idle"] });
      const enemy = w.units[1], curl = ram.abilities.find((ability) => ability.key === "W")!;
      completeCast(w, enemy, curl, 0);
      const pet = spawnPet(w, w.units[0], spec({ hp: 1000, attack, fixedDamage }), 0), before = w.units[0].hp;
      petHit(w, pet, enemy, [effect], true);
      expect(w.units[0].hp).toBe(before);
      if (fixedDamage) expect(pet.hp).toBe(1000);
      if (!fixedDamage) expect(pet.hp).toBeLessThan(1000);
    }
  });
  it("Amumu receives the pet basic event and reduces Tantrum cooldown", () => {
    const amumu = kit("Amumu").spec, w = createWorld({ fighters: [fighter(), amumu], distance: 100, modes: ["idle", "idle"] });
    w.units[1].cooldownReady.E = 100;
    const pet = spawnPet(w, w.units[0], spec({ attack }), 0);
    petHit(w, pet, w.units[1], [effect], true);
    expect(w.units[1].cooldownReady.E).toBeLessThan(100);
  });
});
