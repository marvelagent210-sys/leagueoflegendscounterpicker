import { describe, expect, it } from "vitest";
import { dealDamage } from "../../engine/sim/combat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { thresholdEnemyHooks } from "../../runes/thresholdEffects";
import { fighter } from "../sim/kits";

const rules: CombatRuneRules = {
  schema: 1, dataset: "16.21", patch: "26.21",
  coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
  cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
  lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
  secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
  absorbLife: { heal: 27 },
  triumph: { maximumHealthRatio: 0.025, missingHealthRatio: 0.05, delay: 1, bonusGold: 20, missingHealthModel: "at-native-kill-credit" },
  legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85 },
  legendAlacrity: { baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  legendHaste: { baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  evidence: [{ title: "Synthetic threshold fixture", revid: 1, text: "Fixed percentages isolate actual damage-path behavior." }],
};

function arena(selection: number[], defender: FighterSpec = fighter({ base: { armor: 0, mr: 0 } })) {
  return createWorld({
    fighters: [fighter({ base: { armor: 0, mr: 0 } }), {
      ...defender, hooks: composeHooks(defender.hooks, thresholdEnemyHooks(selection, rules), [], false),
    }],
    distance: 300, modes: ["idle", "idle"],
  });
}

function addOutgoing(source: Unit, ...modifiers: number[]) {
  for (const value of modifiers) source.statuses.push({
    kind: "stat", key: "damageDealt", value, source: source.side, startTick: 0, endTick: Infinity,
  });
}

describe("packet-time health-threshold rune amplification", () => {
  it.each(["physical", "magic", "true"] as const)("Coup de Grace amplifies %s champion damage below 40%%", (type) => {
    const world = arena([8014]); world.units[1].hp = 790;
    expect(dealDamage(world, world.units[0], world.units[1], 100, type)).toBeCloseTo(108, 10);
  });

  it.each([[799, 108], [800, 100], [801, 100]])("Coup de Grace at %s health deals %s", (health, expected) => {
    const world = arena([8014]); world.units[1].hp = health;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(expected, 10);
  });

  it("Coup de Grace starts on the next packet after the threshold is crossed", () => {
    const world = arena([8014]); world.units[1].hp = 810;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBe(100);
    expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBeCloseTo(108, 10);
    expect(world.units[1].hp).toBeCloseTo(602, 10);
  });

  it.each([[1199, 100], [1200, 100], [1201, 108]])("Cut Down at %s health deals %s", (health, expected) => {
    const world = arena([8017]); world.units[1].hp = health;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(expected, 10);
  });

  it("Cut Down applies once to its crossing packet and stops before the next packet", () => {
    const world = arena([8017]); world.units[1].hp = 1220;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "true")).toBeCloseTo(108, 10);
    expect(dealDamage(world, world.units[0], world.units[1], 100, "true")).toBe(100);
    expect(world.units[1].hp).toBeCloseTo(1012, 10);
  });

  it.each([[1201, 100], [1200, 100], [1199, 105.01], [1000, 107], [800, 109], [600, 111], [200, 111]])
  ("Last Stand with %s owner health deals %s", (health, expected) => {
    const world = arena([8299]); world.units[0].hp = health;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(expected, 10);
  });

  it("Last Stand re-evaluates owner health after incoming damage, without a passive-tick delay", () => {
    const world = arena([8299]); world.units[0].hp = 1200;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBe(100);
    dealDamage(world, world.units[1], world.units[0], 200, "true");
    expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBeCloseTo(107, 10);
  });

  it("amplifies before resistances and normal shields", () => {
    const world = arena([8014], fighter({ base: { armor: 100, mr: 100 } }));
    world.units[1].hp = 790;
    world.units[1].statuses.push({ kind: "shield", key: "test", value: 25, shieldType: "normal", source: 1, startTick: 0, endTick: 100 });
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(29, 10);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(29, 10);
  });

  it("critical averaging does not mutate state or amplify twice", () => {
    let events = 0;
    const world = arena([8014], fighter({ base: { armor: 0, mr: 0 }, hooks: { onDamageTaken() { events++; } } }));
    world.units[1].hp = 790;
    const before = { ...world.units[1].memory };
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical", { attack: true, crit: { chance: 0.5, multiplier: 2 } })).toBeCloseTo(162, 10);
    expect(events).toBe(1);
    expect(world.units[1].memory).toEqual(before);
  });

  it("persistent damage checks the current threshold on every packet", () => {
    const world = arena([8014]); world.units[1].hp = 805;
    expect(dealDamage(world, world.units[0], world.units[1], 10, "magic", { persistent: true })).toBe(10);
    expect(dealDamage(world, world.units[0], world.units[1], 10, "magic", { persistent: true })).toBeCloseTo(10.8, 10);
  });

  it("owned-pet damage uses Last Stand's champion health, not the pet health", () => {
    const world = arena([8299]); world.units[0].hp = 600;
    const pet = spawnPet(world, world.units[0], { kind: "source", name: "Source pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 }, 0);
    const source = petFormulaTarget(pet, world.units[0], world.tick);
    expect(source.hp).toBe(1000);
    expect(dealDamage(world, source, world.units[1], 100, "magic")).toBeCloseTo(111, 10);
  });

  it("does not amplify damage against actual pets", () => {
    const world = arena([8014]);
    const pet = spawnPet(world, world.units[1], { kind: "victim", name: "Victim pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 }, 300);
    pet.hp = 300;
    const victim = petFormulaTarget(pet, world.units[1], world.tick);
    expect(dealDamage(world, world.units[0], victim, 100, "magic")).toBe(100);
    expect(pet.hp).toBe(200);
  });

  it("does not amplify self damage", () => {
    const world = arena([8014]); world.units[1].hp = 790;
    expect(dealDamage(world, world.units[1], world.units[1], 100, "true")).toBe(100);
  });

  it.each(["Smite", "Ignite"])("preserves the canonical %s true-damage exception", (ability) => {
    const world = arena([8014]); world.units[1].hp = 790;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "true", { ability })).toBe(100);
  });

  it("preserves an existing victim raw-damage hook", () => {
    const world = arena([8014], fighter({ base: { armor: 0, mr: 0 }, hooks: { modifyDamageTakenRaw: (ctx) => ctx.raw * 0.5 } }));
    world.units[1].hp = 790;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(54, 10);
  });

  it("keeps independent opposing rune choices symmetric when both sides are exchanged", () => {
    const make = (reverse: boolean) => {
      const a = fighter({ base: { armor: 0, mr: 0 }, hooks: composeHooks(undefined, thresholdEnemyHooks([8299], rules), [], false) });
      const b = fighter({ base: { armor: 0, mr: 0 }, hooks: composeHooks(undefined, thresholdEnemyHooks([8014], rules), [], false) });
      const world = createWorld({ fighters: reverse ? [b, a] : [a, b], distance: 0, modes: ["idle", "idle"] });
      world.units[reverse ? 1 : 0].hp = 700;
      world.units[reverse ? 0 : 1].hp = 500;
      return world;
    };
    const normal = make(false), reflected = make(true);
    const forward = dealDamage(normal, normal.units[0], normal.units[1], 100, "magic");
    const mirroredForward = dealDamage(reflected, reflected.units[1], reflected.units[0], 100, "magic");
    const back = dealDamage(normal, normal.units[1], normal.units[0], 100, "magic");
    const mirroredBack = dealDamage(reflected, reflected.units[0], reflected.units[1], 100, "magic");
    expect(forward).toBeCloseTo(108, 10);
    expect(back).toBeCloseTo(111, 10);
    expect(mirroredForward).toBe(forward);
    expect(mirroredBack).toBe(back);
    expect(normal.units[0].hp).toBe(reflected.units[1].hp);
    expect(normal.units[1].hp).toBe(reflected.units[0].hp);
  });

  it("takes independent numeric rules before equipment starts", () => {
    const mutable = structuredClone(rules);
    mutable.coupDeGrace.damageIncrease = 0.2;
    const hooks = thresholdEnemyHooks([8014], mutable);
    mutable.coupDeGrace.damageIncrease = 100;
    const world = createWorld({ fighters: [fighter(), fighter({ base: { armor: 0, mr: 0 }, hooks: composeHooks(undefined, hooks, [], false) })], distance: 0, modes: ["idle", "idle"] });
    world.units[1].hp = 790;
    expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBeCloseTo(120, 10);
  });

  it("adds no hooks for a selection without a threshold rune", () => {
    expect(thresholdEnemyHooks([], rules)).toEqual([]);
    expect(thresholdEnemyHooks([8444], rules)).toEqual([]);
  });

  describe("the engine's additive outgoing-damage bucket", () => {
    it.each([
      [8014, 790, 2000, 128],
      [8017, 1400, 2000, 128],
      [8299, 2000, 600, 131],
    ])("rune %s adds to an existing 20%% outgoing amplifier", (id, targetHp, ownerHp, expected) => {
      for (const type of ["physical", "magic", "true"] as const) {
        const world = arena([id]);
        world.units[1].hp = targetHp; world.units[0].hp = ownerHp;
        addOutgoing(world.units[0], 0.2);
        expect(dealDamage(world, world.units[0], world.units[1], 100, type)).toBeCloseTo(expected, 10);
      }
    });

    it("adds to multiple existing outgoing amplifiers without multiplying them", () => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], 0.2, 0.1);
      expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBeCloseTo(138, 10);
    });

    it.each([["physical", 88], ["magic", 88], ["true", 128]] as const)
    ("preserves the engine's outgoing reduction filtering for %s damage", (type, expected) => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], 0.2, -0.4);
      expect(dealDamage(world, world.units[0], world.units[1], 100, type)).toBeCloseTo(expected, 10);
    });

    it("keeps additive stacking through critical branches without mutating source statuses", () => {
      let events = 0;
      const world = arena([8014], fighter({ base: { armor: 0, mr: 0 }, hooks: { onDamageTaken() { events++; } } }));
      world.units[1].hp = 790;
      addOutgoing(world.units[0], 0.2);
      const before = structuredClone(world.units[0].statuses);
      expect(dealDamage(world, world.units[0], world.units[1], 100, "physical", { attack: true, crit: { chance: 0.5, multiplier: 2 } })).toBeCloseTo(192, 10);
      expect(events).toBe(1);
      expect(world.units[0].statuses).toEqual(before);
    });

    it("applies the combined outgoing bucket before resistances and normal shields", () => {
      const world = arena([8014], fighter({ base: { armor: 100, mr: 100 } }));
      world.units[1].hp = 790;
      addOutgoing(world.units[0], 0.2);
      world.units[1].statuses.push({ kind: "shield", key: "test", value: 25, shieldType: "normal", source: 1, startTick: 0, endTick: 100 });
      expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo(39, 10);
    });

    it("uses a pet's outgoing modifiers with its champion owner's Last Stand health", () => {
      const world = arena([8299]); world.units[0].hp = 600;
      addOutgoing(world.units[0], 0.6);
      const pet = spawnPet(world, world.units[0], { kind: "source", name: "Source pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 }, 0);
      const source = petFormulaTarget(pet, world.units[0], world.tick);
      addOutgoing(source, 0.2);
      expect(dealDamage(world, source, world.units[1], 100, "magic")).toBeCloseTo(131, 10);
    });

    it("retains the engine's current raw flat-reduction and victim-hook order", () => {
      const world = arena([8014], fighter({ base: { armor: 0, mr: 0 }, hooks: { modifyDamageTakenRaw: (ctx) => ctx.raw * 0.5 } }));
      world.units[1].hp = 790;
      addOutgoing(world.units[0], 0.2);
      world.units[1].statuses.push({ kind: "state", key: "flatDamageReduction", value: 10, source: 1, startTick: 0, endTick: 100 });
      expect(dealDamage(world, world.units[0], world.units[1], 100, "physical")).toBeCloseTo((100 - 10) * 0.5 * 1.28, 10);
    });

    it.each([-1, -1.04])("rejects an active rune that would restore damage through a %s outgoing modifier", (modifier) => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], modifier);
      expect(() => dealDamage(world, world.units[0], world.units[1], 100, "magic"))
        .toThrow("Health-threshold runes cannot amplify a nonpositive existing outgoing damage multiplier");
      expect(world.units[1].hp).toBe(790);
      expect(world.units[0].totals.damageDealt).toBe(0);
    });

    it("allows a zero outgoing multiplier when the threshold rune is inactive", () => {
      const world = arena([8014]); world.units[1].hp = 1000;
      addOutgoing(world.units[0], -1);
      expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBe(0);
    });

    it("allows a zero outgoing multiplier when the packet already deals zero raw damage", () => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], -1);
      expect(dealDamage(world, world.units[0], world.units[1], 0, "magic")).toBe(0);
    });

    it("keeps damage at zero when the combined outgoing bucket is still nonpositive", () => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], -1.2);
      expect(dealDamage(world, world.units[0], world.units[1], 100, "magic")).toBe(0);
    });

    it("ignores a complete outgoing reduction for amplified champion true damage", () => {
      const world = arena([8014]); world.units[1].hp = 790;
      addOutgoing(world.units[0], -1);
      expect(dealDamage(world, world.units[0], world.units[1], 100, "true")).toBeCloseTo(108, 10);
    });
  });
});
