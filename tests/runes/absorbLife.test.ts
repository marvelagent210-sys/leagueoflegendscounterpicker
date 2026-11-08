import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, dealDamage, hookContext, notifyKill } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, destroyPet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { ABSORB_LIFE_ASSUMPTIONS, absorbLifeHooks } from "../../runes/absorbLife";
import { lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";

const rules: CombatRuneRules = {
  schema: 1, dataset: "16.21", patch: "26.21",
  coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
  cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
  lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
  secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
  absorbLife: { heal: 27 },
  legendAlacrity: { baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  legendHaste: { baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  evidence: [{ title: "Synthetic Absorb Life fixture", revid: 1, text: "Numeric rules isolate actual kill healing." }],
};
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };
const equipped = () => fighter({ hooks: absorbLifeHooks(rules) });
function arena(spec = equipped(), enemy = fighter()): World {
  const world = createWorld({ fighters: [spec, enemy], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].hp = 1000;
  return world;
}
function killPet(world: World, spec: Partial<PetSpec> = {}): void {
  const victim = spawnPet(world, world.units[1], { ...petSpec, ...spec }, 300);
  damagePet(world, world.units[0], victim, 1000, "true", false);
}

describe("Absorb Life actual kill eligibility", () => {
  it("heals27 on a real champion kill, with healing accounting", () => {
    const world = arena();
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(world.units[0].hp).toBe(1027);
    expect(world.units[0].totals.healing).toBe(27);
    expect(world.log.filter(entry => entry.text === "heals 27")).toHaveLength(1);
  });

  it("heals the credited owner on the opposite side without lending it to the victim", () => {
    const world = arena(fighter(), equipped()); world.units[1].hp = 1000;
    dealDamage(world, world.units[1], world.units[0], 5000, "true");
    expect(world.units[1].hp).toBe(1027);
    expect(world.units[1].totals.healing).toBe(27);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("requires a kill rather than a hit, shield depletion or zero damage", () => {
    const world = arena();
    world.units[1].statuses.push(lasting("shield", "fixture", 100));
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    dealDamage(world, world.units[0], world.units[1], 0, "true");
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    expect(world.units[0].hp).toBe(1000);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("accepts an actual hostile summoned-unit kill classified%s under the generic unit rule", (targetClass) => {
    const world = arena(); killPet(world, { ...(targetClass ? { targetClass } : {}) });
    expect(world.units[0].hp).toBe(1027);
    expect(world.units[1].hp).toBe(2000);
    expect(world.pets).toHaveLength(0);
  });

  it("credits a pet's champion kill to its owner without healing the pet", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0);
    pet.hp = 50;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(world.units[0].hp).toBe(1027);
    expect(world.units[0].totals.healing).toBe(27);
    expect(pet.hp).toBe(50);
  });

  it("credits an actual pet killing an enemy clone to its owner once", () => {
    const world = arena(), source = spawnPet(world, world.units[0], petSpec, 0);
    const clone = spawnPet(world, world.units[1], { ...petSpec, targetClass: "champion", unitClass: "clone" }, 300);
    petCombatHit(world, source, clone, [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    notifyKill(world, world.units[0], clone);
    expect(world.units[0].hp).toBe(1027);
    expect(world.units[0].totals.healing).toBe(27);
    expect(world.pets).toEqual([source]);
  });

  it("does not duplicate a counted champion death on later packets or repeated notifications", () => {
    const world = arena();
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    notifyKill(world, world.units[0], world.units[1]);
    expect(world.units[0].hp).toBe(1027);
  });

  it("does not trigger for self damage or destruction of its own summon", () => {
    const world = arena(), own = spawnPet(world, world.units[0], petSpec, 0);
    damagePet(world, world.units[0], own, 5000, "true", false);
    dealDamage(world, world.units[0], world.units[0], 50, "true");
    expect(world.units[0].hp).toBe(950);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("does not treat natural expiry or scripted replacement as a combat kill", () => {
    const world = arena(), expiring = spawnPet(world, world.units[1], { ...petSpec, duration: 1 }, 300);
    const replaced = spawnPet(world, world.units[1], petSpec, 300);
    destroyPet(world, replaced);
    world.tick = 30; advancePets(world);
    expect(world.pets).not.toContain(expiring);
    expect(world.units[0].hp).toBe(1000);
  });

  it("does not heal for protected resurrection entry, then heals for actual destruction", () => {
    const target = fighter({ hooks: { onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); } } });
    const world = arena(equipped(), target);
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(world.units[1].resurrection).toBeDefined();
    expect(world.units[0].hp).toBe(1000);
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(world.units[0].hp).toBe(1027);
  });

  it("heals once for a counted death-defied champion without another heal at window expiry", () => {
    const target = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); } } });
    const world = arena(equipped(), target);
    dealDamage(world, world.units[0], world.units[1], 5000, "true");
    expect(world.units[1].fallen).toBe(true);
    expect(world.units[0].hp).toBe(1027);
    notifyKill(world, world.units[0], world.units[1]);
    expect(world.units[0].hp).toBe(1027);
  });
});

describe("Absorb Life healing modifiers and lifecycle", () => {
  it("respects Grievous Wounds and ordinary healing increases", () => {
    const world = arena();
    world.units[0].statuses.push(lasting("grievousWounds", "grievous", 0), lasting("stat", "healingIncrease", 0.5));
    killPet(world);
    expect(world.units[0].hp).toBeCloseTo(1000 + 27 * 1.5 * 0.6, 10);
    expect(world.units[0].totals.healing).toBeCloseTo(24.3, 10);
  });

  it("caps effective healing at actual maximum health", () => {
    const world = arena(); world.units[0].hp = 1990; killPet(world);
    expect(world.units[0].hp).toBe(2000);
    expect(world.units[0].totals.healing).toBe(10);
  });

  it("respects a lower health cap", () => {
    const world = arena();
    world.units[0].hp = 990; world.units[0].statuses.push(lasting("state", "healthCap", 0.5));
    killPet(world);
    expect(world.units[0].hp).toBe(1000);
    expect(world.units[0].totals.healing).toBe(10);
  });

  it("does not bypass noHealing as vamp or regeneration", () => {
    const world = arena(); world.units[0].statuses.push(lasting("state", "noHealing"));
    killPet(world);
    expect(world.units[0].hp).toBe(1000);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it.each([false, true])("does not revive an owner with lethal HP when alive flag%s", (alive) => {
    const world = arena(), source = spawnPet(world, world.units[0], petSpec, 0);
    world.units[0].hp = 0; world.units[0].alive = alive;
    petCombatHit(world, source, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(world.units[0].hp).toBe(0);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("does not heal a counted-dead owner whose post-death window retains positive health", () => {
    const world = arena(), source = spawnPet(world, world.units[0], petSpec, 0);
    expect(beginDeathDefied(world, world.units[0], { duration: 3 })).toBe(true);
    expect(world.units[0].alive).toBe(true); expect(world.units[0].hp).toBe(1);
    petCombatHit(world, source, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(world.units[0].hp).toBe(1);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("allows the standard heal on an attackable living resurrection body", () => {
    const world = arena(), source = spawnPet(world, world.units[0], petSpec, 0);
    expect(beginResurrection(world, world.units[0], { duration: 3 })).toBe(true);
    world.units[0].hp = 1000;
    petCombatHit(world, source, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(world.units[0].hp).toBe(1027);
    expect(world.units[0].totals.healing).toBe(27);
  });

  it("continues to compose the champion's own kill callback", () => {
    const hooks = composeHooks({ onKill(ctx) { ctx.memory.kills = Number(ctx.memory.kills ?? 0) + 1; } }, [absorbLifeHooks(rules)], [], false);
    const world = arena(fighter({ hooks })); killPet(world); killPet(world);
    expect(world.units[0].memory.kills).toBe(2);
    expect(world.units[0].hp).toBe(1054);
  });

  it("keeps distinct healing entitlements when the kit's kill callback causes another real kill", () => {
    const hooks = composeHooks({ onKill(ctx) {
      if (ctx.memory.chained) return;
      ctx.memory.chained = true;
      const victim = ctx.world.pets.find(pet => pet.owner !== ctx.self.side && pet.hp > 0);
      if (victim) damagePet(ctx.world, ctx.self, victim, 1000, "true", false);
    } }, [absorbLifeHooks(rules)], [], false);
    const world = arena(fighter({ hooks }));
    const first = spawnPet(world, world.units[1], petSpec, 300);
    spawnPet(world, world.units[1], petSpec, 300);
    damagePet(world, world.units[0], first, 1000, "true", false);
    expect(world.pets).toHaveLength(0);
    expect(world.units[0].hp).toBe(1054);
    expect(world.units[0].totals.healing).toBe(54);
  });

  it("retains one heal through a real form change without modifying the source specs", () => {
    const hooks = absorbLifeHooks(rules), small: FighterSpec = { ...fighter({ hooks }), form: "small" };
    const big: FighterSpec = { ...fighter({ hooks, base: { hp: 3000 } }), form: "big" };
    small.forms = big.forms = { small, big };
    const world = arena(small); setForm(world, world.units[0], "big"); killPet(world);
    expect(world.units[0].hp).toBe(1527);
    expect(small.base.hp).toBe(2000); expect(big.base.hp).toBe(3000);
  });

  it("does not share heal totals or victim deduplication between cloned worlds", () => {
    const world = arena(), target = spawnPet(world, world.units[1], petSpec, 300), branch = cloneWorld(world);
    damagePet(branch, branch.units[0], branch.pets.find(pet => pet.id === target.id)!, 1000, "true", false);
    expect(branch.units[0].hp).toBe(1027); expect(world.units[0].hp).toBe(1000);
    damagePet(world, world.units[0], target, 1000, "true", false);
    expect(world.units[0].hp).toBe(1027); expect(branch.units[0].totals.healing).toBe(27);
  });

  it("does not run a copied hook on a pet recipient", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0);
    const view = petFormulaTarget(pet, world.units[0]), victim = spawnPet(world, world.units[1], petSpec, 300);
    pet.hp = view.hp = 50; victim.hp = 0;
    absorbLifeHooks(rules).onKill!({ ...hookContext(world, view), victim, pet: victim });
    expect(pet.hp).toBe(50); expect(world.units[0].hp).toBe(1000);
  });

  it("copies the reviewed heal number rather than reading mutable rules during a kill", () => {
    const changed = structuredClone(rules), world = arena(fighter({ hooks: absorbLifeHooks(changed) }));
    changed.absorbLife.heal = 1000; killPet(world);
    expect(world.units[0].hp).toBe(1027);
  });

  it.each([0, -1, NaN, Infinity, undefined, "27"])("rejects invalid heal amount%s", (heal) => {
    expect(() => absorbLifeHooks({ absorbLife: { heal } } as Pick<CombatRuneRules, "absorbLife">)).toThrow(/finite positive/);
  });

  it("states the limited modeled kill population and measured-eligibility gap", () => {
    expect(ABSORB_LIFE_ASSUMPTIONS.join(" ")).toContain("No farm");
    expect(ABSORB_LIFE_ASSUMPTIONS.join(" ")).toContain("not been independently measured");
  });
});
