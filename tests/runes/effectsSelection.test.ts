import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import type { RuneCatalog } from "../../runes/catalog";
import type { CombatRuneRules } from "../../runes/effectRules";
import { FIRST_COMBAT_RUNE_IDS, equipRuneEffects, runeMatchupSpecs, validateCombatRuneSelection } from "../../runes/effects";
import { fighter as baseFighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const allIds = catalog.runes.map((rune) => rune.id);
/** Zero mitigation keeps the packet expectations focused on hook composition. */
const fighter = (options: Parameters<typeof baseFighter>[0] = {}): FighterSpec =>
  baseFighter({ ...options, base: { armor: 0, mr: 0, ...options.base } });
const rules: CombatRuneRules = {
  schema: 1, dataset: "16.21", patch: "26.21",
  overgrowth: { unitsPerStack: 8, healthPerStack: 3, thresholdUnits: 120, healthRatio: 0.035, radius: 1400 },
  shieldBash: { modelLevel: 20, baseDamage: 560 / 17, bonusHealthRatio: 0.025, shieldRatio: 0.15, linger: 2 },
  bonePlating: { modelLevel: 20, reduction: 1080 / 17, charges: 3, duration: 1.5, cooldown: 55 },
  grasp: { maxStacks: 4, stackInterval: 1, combatWindow: 3, readyWindow: 5, healDelay: 0.4,
    meleeDamageRatio: 0.035, rangedDamageRatio: 0.014, meleeHealRatio: 0.013, rangedHealRatio: 0.0052, meleeHealth: 5, rangedHealth: 2 },
  conqueror: { modelLevel: 20, maxStacks: 12, stackDuration: 5, castCooldown: 4,
    meleeBasicStacks: 2, rangedBasicStacks: 1, spellStacks: 2, adaptiveForcePerStack: 362 / 85,
    adaptiveADRatio: 0.6, adaptiveAPRatio: 1, meleeHealingRatio: 0.08, rangedHealingRatio: 0.05 },
  lethalTempo: { modelLevel: 20, maxStacks: 6, stackDuration: 6, decayInterval: 0.3,
    attackSpeedPerStack: 0.06, rangedAttackSpeedRatio: 0.8, boltDamage: 552 / 17,
    rangedBoltRatio: 0.667, bonusAttackSpeedRatio: 1, boltSpeed: 2500,
    boltGate: "max-stacks-before-attack", boltStatModel: "at-launch", boltTravelModel: "fixed-endpoint" },
  fleetFootwork: { modelLevel: 20, healBase: 124257 / 680, bonusADRatio: 0.1, apRatio: 0.05,
    rangedHealRatio: 0.6, minionHealRatio: 0.15, moveSpeedIncrease: 0.2, rangedMoveSpeedRatio: 0.75,
    moveSpeedDuration: 1, maxCharges: 100, attackCharges: 6, unitsPerCharge: 24,
    chargeModel: "current-at-connected-on-hit", chargePrecision: "continuous",
    healDeliveryModel: "immediate-at-consumption", statSamplingModel: "current-at-consumption" },
  pressTheAttack: { modelLevel: 20, damage: 2960 / 17, hitsRequired: 3, stackDuration: 4, cooldown: 6,
    damageIncrease: 0.08, combatDuration: 5, combatExpiryModel: "last-qualified-activity",
    adaptiveDamageModel: "current-derived-bonus-ad-vs-ap", activationFrameModel: "simulation-tick" },
  coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
  cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
  lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
  secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
  absorbLife: { heal: 27 },
  triumph: { maximumHealthRatio: 0.025, missingHealthRatio: 0.05, delay: 1, bonusGold: 20, missingHealthModel: "at-native-kill-credit" },
  presenceOfMind: { modelLevel: 20, manaRestore: 56, rangedManaRatio: 0.8, energyRestore: 6,
    damageCooldown: 8, takedownResourceRatio: 0.15, takedownDelay: 1, maximumResourceModel: "current-at-delivery" },
  legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85 },
  legendAlacrity: { baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  legendHaste: { baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  evidence: [{ title: "Synthetic equipment fixture", revid: 1, text: "Synthetic combat rules isolate equipment and side binding." }],
};
const equip = (spec = fighter(), selected: number[] = []) => equipRuneEffects(spec, selected, catalog, rules);
const arena = (fighters: [FighterSpec, FighterSpec]) => createWorld({ fighters, distance: 300, modes: ["idle", "idle"] });
const damage = (world: World, source: 0 | 1, target: 0 | 1) =>
  applyEffect(world, world.units[source], world.units[target], { type: "damage", damageType: "physical", amount: { base: 100 } }, { scale: 1 });

describe("explicit partial combat-rune selections", () => {
  it("accepts empty equipment without inventing the filler runes used to prove page legality", () => {
    expect(validateCombatRuneSelection(catalog, [])).toEqual([]);
  });

  it("canonicalizes compatible cross-path choices without changing the caller's array", () => {
    const selected = [8444, 8014];
    const result = validateCombatRuneSelection(catalog, selected);
    expect(result).toEqual([8014, 8444]);
    result.push(8017);
    expect(selected).toEqual([8444, 8014]);
  });

  it("accepts precisely 3,718 of the 262,144 subsets of the eighteen implemented effects", () => {
    expect(FIRST_COMBAT_RUNE_IDS).toEqual([8005, 8008, 8009, 8010, 8014, 8017, 8021, 8299, 8401, 8437, 8444, 8451, 8473, 9101, 9103, 9104, 9105, 9111]);
    let accepted = 0;
    let withGrasp = 0;
    let withBone = 0;
    let withShieldBash = 0;
    let withBoth = 0;
    let withOvergrowth = 0;
    for (let mask = 0; mask < 1 << FIRST_COMBAT_RUNE_IDS.length; mask++) {
      const selected = FIRST_COMBAT_RUNE_IDS.filter((_, index) => mask & 1 << index);
      const amps = selected.filter((id) => id === 8014 || id === 8017 || id === 8299);
      const legends = selected.filter((id) => id === 9103 || id === 9104 || id === 9105);
      const precisionRowOne = selected.filter((id) => id === 8009 || id === 9101 || id === 9111);
      const keystones = selected.filter(id => id === 8005 || id === 8008 || id === 8010 || id === 8021);
      const grasp = selected.includes(8437);
      const bone = selected.includes(8473);
      const shield = selected.includes(8401);
      const overgrowth = selected.includes(8451);
      const resolveRowTwo = bone || selected.includes(8444);
      const needsPrimaryResolve = grasp || (shield && resolveRowTwo && overgrowth);
      const rows = [amps.length, legends.length, precisionRowOne.length, keystones.length];
      if (rows.every(count => count <= 1) && !(bone && selected.includes(8444))
        && (!needsPrimaryResolve || (keystones.length === 0 && amps.length + legends.length + precisionRowOne.length <= 2))) {
        expect(validateCombatRuneSelection(catalog, selected)).toEqual([...selected].sort((a, b) => a - b));
        accepted++;
        if (grasp) withGrasp++;
        if (bone) withBone++;
        if (shield) {
          withShieldBash++;
          if (bone) withBoth++;
        }
        if (overgrowth) withOvergrowth++;
      } else expect(() => validateCombatRuneSelection(catalog, selected)).toThrow();
    }
    expect(accepted).toBe(3718);
    expect(withGrasp).toBe(444);
    expect(withBone).toBe(1145);
    expect(withShieldBash).toBe(1576);
    expect(withBoth).toBe(431);
    expect(withOvergrowth).toBe(1576);
  });

  it("makes Grasp primary Resolve with at most two Precision lesser rows", () => {
    expect(validateCombatRuneSelection(catalog, [8444, 8437, 9111, 8014])).toEqual([8014, 8437, 8444, 9111]);
    expect(() => validateCombatRuneSelection(catalog, [8437, 8010])).toThrow(/more than one keystone/);
    expect(() => validateCombatRuneSelection(catalog, [8437, 9111, 9104, 8014])).toThrow(/cannot extend/);
  });

  it("allows Bone Plating with a compatible keystone and shares its Resolve row with Second Wind", () => {
    expect(validateCombatRuneSelection(catalog, [8473, 8437, 9111, 8014])).toEqual([8014, 8437, 8473, 9111]);
    expect(validateCombatRuneSelection(catalog, [8473, 8005])).toEqual([8005, 8473]);
    expect(() => validateCombatRuneSelection(catalog, [8444, 8473])).toThrow(/same path row/);
  });

  it("uses independent Resolve lesser rows for Shield Bash and Bone Plating", () => {
    expect(validateCombatRuneSelection(catalog, [8473, 8401, 8010, 8009, 9104, 8014]))
      .toEqual([8009, 8010, 8014, 8401, 8473, 9104]);
    expect(validateCombatRuneSelection(catalog, [8437, 8401, 8444, 9104, 8014]))
      .toEqual([8014, 8401, 8437, 8444, 9104]);
  });

  it.each([null, undefined, "8014", ["8014"], [NaN], [Infinity], [8014.5],
    Object.assign(new Array(1), {}), [8014, 8439, 8444, 1, 2, 3, 4]])
  ("rejects malformed IDs or incomplete arrays: %s", (selected) => {
    expect(() => validateCombatRuneSelection(catalog, selected)).toThrow(/at most six positive integer IDs/);
  });

  it("does not quietly equip an unsupported rune or a stat-shard ID", () => {
    expect(() => validateCombatRuneSelection(catalog, [8439])).toThrow(/no combat implementation/);
    expect(() => validateCombatRuneSelection(catalog, [5005])).toThrow(/no combat implementation/);
  });

  it("rejects repeated choices and mutually exclusive row-three damage runes", () => {
    expect(() => validateCombatRuneSelection(catalog, [8014, 8014])).toThrow(/cannot repeat/);
    expect(() => validateCombatRuneSelection(catalog, [8014, 8299])).toThrow(/same path row/);
  });

  it("uses Triumph's source row to exclude Absorb Life and permit one Legend", () => {
    expect(validateCombatRuneSelection(catalog, [9111])).toEqual([9111]);
    expect(() => validateCombatRuneSelection(catalog, [9101, 9111])).toThrow(/same path row/);
    for (const id of [9103, 9104, 9105]) {
      expect(validateCombatRuneSelection(catalog, [9111, id, 8444, 8014])).toEqual([8014, 8444, id, 9111]);
    }
  });

  it("uses Presence of Mind's source row to exclude both alternatives and permit one declared Legend", () => {
    expect(validateCombatRuneSelection(catalog, [8009])).toEqual([8009]);
    for (const other of [9101, 9111]) {
      expect(() => validateCombatRuneSelection(catalog, [8009, other])).toThrow(/same path row/);
    }
    const mana = { ...fighter({ base: { resource: 1000 } }), resourceType: "Mana" };
    for (const id of [9103, 9104, 9105]) {
      expect(validateCombatRuneSelection(catalog, [8009, id, 8444, 8014])).toEqual([8009, 8014, 8444, id]);
      expect(() => equipRuneEffects(mana, [8009, id], catalog, rules)).toThrow(/explicit.*legendPoints/);
      expect(equipRuneEffects(mana, [8009, id], catalog, rules, { legendPoints: 0 }).selection).toEqual([8009, id]);
    }
  });

  it("adds a Precision keystone without changing lesser-row exclusivity or page completion", () => {
    expect(validateCombatRuneSelection(catalog, [8005])).toEqual([8005]);
    expect(validateCombatRuneSelection(catalog, [8444, 8014, 9104, 8009, 8005])).toEqual([8005, 8009, 8014, 8444, 9104]);
    expect(() => validateCombatRuneSelection(catalog, [8005, 8009, 9111])).toThrow(/same path row/);
    expect(() => validateCombatRuneSelection(catalog, [8005, 9103, 9104])).toThrow(/same path row/);
    expect(() => validateCombatRuneSelection(catalog, [8005, 8439], allIds)).toThrow(/more than one keystone/);
    expect(() => equipRuneEffects(fighter(), [8005], catalog, rules, { legendPoints: 0 })).toThrow(/requires selecting/);
  });

  it("adds Fleet as an alternative Precision keystone and requires its own starting history", () => {
    expect(validateCombatRuneSelection(catalog, [8021])).toEqual([8021]);
    expect(validateCombatRuneSelection(catalog, [8444, 8014, 9104, 8009, 8021])).toEqual([8009, 8014, 8021, 8444, 9104]);
    expect(() => validateCombatRuneSelection(catalog, [8005, 8021])).toThrow(/same path row|more than one keystone/);
    expect(() => equipRuneEffects(fighter(), [8021], catalog, rules)).toThrow(/Fleet.*energizedCharges|energizedCharges/);
    for (const energizedCharges of [0, 0.5, 99.75, 100]) {
      expect(equipRuneEffects(fighter(), [8021], catalog, rules, { energizedCharges }).selection).toEqual([8021]);
    }
    expect(() => equipRuneEffects(fighter(), [], catalog, rules, { energizedCharges: 0 })).toThrow(/Fleet|8021|selecting/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, rules, { energizedCharges: 100 })).toThrow(/Fleet|8021|selecting/);
    expect(equipRuneEffects(fighter(), [8021, 9104], catalog, rules, { energizedCharges: 99.5, legendPoints: 199 }).selection).toEqual([8021, 9104]);
    expect(() => equipRuneEffects(fighter(), [8021, 9104], catalog, rules, { energizedCharges: 100 })).toThrow(/legendPoints/);
  });

  it.each([-1, 100.0001, NaN, Infinity, -Infinity, "100", null])
  ("rejects malformed or out-of-range Fleet starting charges: %s", energizedCharges => {
    expect(() => equipRuneEffects(fighter(), [8021], catalog, rules, { energizedCharges } as never)).toThrow(/Fleet|energizedCharges/);
  });

  it.each([
    { modelLevel: 18 }, { healBase: 0 }, { bonusADRatio: NaN }, { apRatio: -0.1 },
    { rangedHealRatio: 1.1 }, { minionHealRatio: 0 }, { moveSpeedIncrease: Infinity },
    { rangedMoveSpeedRatio: 0 }, { moveSpeedDuration: 0 }, { maxCharges: 0 },
    { attackCharges: 0 }, { unitsPerCharge: 0 }, { chargeModel: "reserved-at-launch" },
    { chargePrecision: "rounded-each-event" }, { healDeliveryModel: "inferred-vfx-missile" },
    { statSamplingModel: "at-equipment" },
  ])("rejects invalid Fleet rules at equipment time: %s", change => {
    const input = { ...rules, fleetFootwork: { ...rules.fleetFootwork, ...change } } as CombatRuneRules;
    expect(() => equipRuneEffects(fighter(), [8021], catalog, input, { energizedCharges: 100 })).toThrow(/Fleet/);
  });

  it("snapshots Fleet rules and preserves kit contact hooks in independent charge pools", () => {
    const spec = fighter({ base: { hp: 4000 }, hooks: {
      onResolvedOnHit(ctx) { ctx.memory.kitContacts = Number(ctx.memory.kitContacts ?? 0) + 1; },
    } });
    const input = structuredClone(rules);
    const own = equipRuneEffects(spec, [8021], catalog, input, { energizedCharges: 100 });
    const opponent = equip(fighter({ base: { hp: 10000 } }));
    input.fleetFootwork.healBase = 999;
    input.fleetFootwork.moveSpeedIncrease = 0.5;
    const first = arena(runeMatchupSpecs(own, opponent)), second = arena(runeMatchupSpecs(own, opponent));
    first.units[0].hp = 1000; second.units[0].hp = 1000;
    attackHit(first, first.units[0], first.units[1], false, []);
    expect(first.units[0].hp).toBeCloseTo(1000 + 124257 / 680, 10);
    expect(first.units[0].totals.healing).toBeCloseTo(124257 / 680, 10);
    expect(first.units[0].memory.kitContacts).toBe(1);
    expect(second.units[0].hp).toBe(1000);
    attackHit(second, second.units[0], second.units[1], false, []);
    expect(second.units[0].hp).toBeCloseTo(first.units[0].hp, 10);
    expect(spec.hooks).not.toHaveProperty("onBasicAttackLaunched");
    expect(spec.hooks).not.toHaveProperty("onMovementObserved");
  });

  it.each([
    { modelLevel: 18 }, { hitsRequired: 4 }, { damage: NaN }, { damage: 0 },
    { stackDuration: 0 }, { cooldown: Infinity }, { combatDuration: Number.MAX_SAFE_INTEGER },
    { damageIncrease: 1.1 }, { combatExpiryModel: "two-consecutive-five-second-timers" },
    { adaptiveDamageModel: "shard-memory" }, { activationFrameModel: "wall-clock" },
  ])("rejects invalid Press the Attack rules at equipment time: %s", change => {
    const spec: FighterSpec = { ...fighter(), adaptiveType: "Physical" };
    const input = { ...rules, pressTheAttack: { ...rules.pressTheAttack, ...change } } as CombatRuneRules;
    expect(() => equipRuneEffects(spec, [8005], catalog, input)).toThrow(/Press the Attack/);
  });

  it("requires a source champion's adaptive tie type even when no adaptive shard is equipped", () => {
    expect(() => equipRuneEffects(fighter(), [8005], catalog, rules)).toThrow(/adaptive.*tie type/);
    for (const adaptiveType of ["Physical", "Magic"] as const) {
      expect(equipRuneEffects({ ...fighter(), adaptiveType }, [8005], catalog, rules).selection).toEqual([8005]);
    }
  });

  it("snapshots the proc rules and preserves kit hooks across independently paired worlds", () => {
    const spec: FighterSpec = { ...fighter({ base: { hp: 10000 }, hooks: {
      onResolvedOnHit(ctx) { ctx.memory.kitContacts = Number(ctx.memory.kitContacts ?? 0) + 1; },
    } }), adaptiveType: "Physical" };
    const input = structuredClone(rules);
    const own = equipRuneEffects(spec, [8005], catalog, input), opponent = equip(fighter({ base: { hp: 10000 } }));
    input.pressTheAttack.damage = 999;
    input.pressTheAttack.damageIncrease = 0.5;
    const first = arena(runeMatchupSpecs(own, opponent)), second = arena(runeMatchupSpecs(own, opponent));
    for (let at = 0; at < 3; at++) {
      first.tick = at;
      attackHit(first, first.units[0], first.units[1], false, []);
    }
    expect(first.units[1].totals.damageTaken).toBeCloseTo(300 + 2960 / 17, 10);
    expect(first.units[0].memory.kitContacts).toBe(3);
    first.tick = 3;
    expect(dealDamage(first, first.units[0], first.units[1], 100, "true")).toBeCloseTo(108, 10);
    second.tick = 3;
    expect(dealDamage(second, second.units[0], second.units[1], 100, "true")).toBe(100);
    expect(second.units[0].memory.kitContacts).toBeUndefined();
    expect(spec.hooks).not.toHaveProperty("onCombatActivity");
  });

  it("rejects two keystones even when both have registered implementations", () => {
    expect(() => validateCombatRuneSelection(catalog, [8439, 8010], allIds)).toThrow(/more than one keystone/);
  });

  it("rejects a third path even when its rune has an implementation", () => {
    expect(() => validateCombatRuneSelection(catalog, [8439, 8014, 8237], allIds)).toThrow(/at most two paths/);
  });

  it("cannot put three lesser runes in a secondary path when the other path owns the keystone", () => {
    expect(() => validateCombatRuneSelection(catalog, [8439, 9111, 9104, 8014], allIds)).toThrow(/cannot extend/);
    // The same three lesser runes are valid when their own path can be primary.
    expect(validateCombatRuneSelection(catalog, [9111, 9104, 8014, 8444], allIds)).toEqual([8014, 8444, 9104, 9111]);
  });

  it("observes source-defined secondary-path restrictions", () => {
    const changed = structuredClone(catalog);
    changed.paths.find((path) => path.id === 8400)!.allowedSecondaryPathIds = [8100];
    expect(() => validateCombatRuneSelection(changed, [8439, 8014], allIds)).toThrow(/cannot extend/);
  });

  it("rejects incomplete, duplicated or inconsistent source layouts", () => {
    const changed = structuredClone(catalog);
    changed.runes.push({ ...changed.runes[0]! });
    expect(() => validateCombatRuneSelection(changed, [8444])).toThrow(/cannot extend/);
    const missing = structuredClone(catalog);
    missing.runes = missing.runes.filter((rune) => rune.id !== 8444);
    expect(() => validateCombatRuneSelection(missing, [8444])).toThrow(/absent from the source catalog/);
    const shifted = structuredClone(catalog);
    shifted.runes.find((rune) => rune.id === 8444)!.slot = 1;
    expect(() => validateCombatRuneSelection(shifted, [8444])).toThrow(/cannot extend/);
    expect(() => validateCombatRuneSelection(null as unknown as RuneCatalog, [])).toThrow(/complete page layout/);
  });

  it("does not authorize a malformed effect inventory", () => {
    expect(() => validateCombatRuneSelection(catalog, [], [8014, 8014])).toThrow(/effect inventory/);
    expect(() => validateCombatRuneSelection(catalog, [], [NaN])).toThrow(/effect inventory/);
  });
});

describe("combat-rune equipment and opposing-hook composition", () => {
  it("restores each equipped body's own resource without healing or a starting-history flag", () => {
    const mana = { ...fighter({ base: { resource: 1000 } }), resourceType: "Mana" };
    const energy = { ...fighter({ base: { resource: 200 } }), resourceType: "Energy" };
    const own = equip(mana, [8009, 8014]), other = equip(energy, [8009, 8444]);
    const world = arena(runeMatchupSpecs(own, other));
    world.units[0].resource = 0; world.units[1].resource = 0;
    damage(world, 0, 1);
    expect(world.units[0].resource).toBe(56);
    expect(world.units[1].resource).toBe(0);
    damage(world, 1, 0);
    expect(world.units[0].resource).toBe(56);
    expect(world.units[1].resource).toBe(6);
    expect(world.units.map(unit => unit.totals.healing)).toEqual([0, 0]);
    expect(own.selection).toEqual([8009, 8014]);
    expect(() => equipRuneEffects(mana, [8009], catalog, rules, { legendPoints: 0 })).toThrow(/requires selecting/);
  });

  it.each([undefined, "None", "Fury", "Rage"])("rejects manual Presence on unsupported resource type %s without replacing it", resourceType => {
    const input = { ...fighter({ base: { resource: 1000 } }), resourceType };
    expect(() => equip(input, [8009])).toThrow(/Presence of Mind.*Mana.*Energy/);
    expect(input.hooks).toBeUndefined();
    expect(input.bonus).toBeUndefined();
  });

  it("copies Presence numeric rules before reusable equipment can be mutated by its caller", () => {
    const input = structuredClone(rules);
    const spec = { ...fighter({ base: { resource: 1000 } }), resourceType: "Mana" };
    const own = equipRuneEffects(spec, [8009], catalog, input), other = equip();
    input.presenceOfMind.manaRestore = 500;
    input.presenceOfMind.damageCooldown = 1;
    const world = arena(runeMatchupSpecs(own, other));
    world.units[0].resource = 0;
    damage(world, 0, 1); expect(world.units[0].resource).toBe(56);
    world.tick = 30;
    damage(world, 0, 1); expect(world.units[0].resource).toBe(56);
    world.tick = 240;
    damage(world, 0, 1); expect(world.units[0].resource).toBe(112);
  });

  it.each([
    { modelLevel: 18 }, { manaRestore: NaN }, { energyRestore: 0 },
    { rangedManaRatio: 1.1 }, { damageCooldown: 0 }, { takedownResourceRatio: 1.1 },
    { maximumResourceModel: "at-native-kill-credit" },
  ])("rejects unreviewed Presence rule units or model policy: %s", change => {
    const spec = { ...fighter({ base: { resource: 1000 } }), resourceType: "Mana" };
    const input = { ...rules, presenceOfMind: { ...rules.presenceOfMind, ...change } } as CombatRuneRules;
    expect(() => equipRuneEffects(spec, [8009], catalog, input)).toThrow(/Presence|presenceOfMind/);
  });

  it.each([0, 1] as const)("equips side %s's Triumph without Legend history and preserves its delayed native kill credit", (side) => {
    const spec = fighter({ hooks: { onKill(ctx) { ctx.memory.kitKills = Number(ctx.memory.kitKills ?? 0) + 1; } } });
    const a = equip(spec, [8014, 9111]), b = equip(spec, [8444, 9111]);
    const world = arena(runeMatchupSpecs(a, b)), target = side === 0 ? 1 : 0;
    world.units[side].hp = 1000;
    dealDamage(world, world.units[side], world.units[target], 5000, "true");
    expect(world.units[side].hp).toBe(1000);
    expect(world.units[side].memory.kitKills).toBe(1);
    expect(world.units[side].totals.healing).toBe(0);
    world.tick = 29;
    world.units[side].spec.hooks!.onTick!(hookContext(world, world.units[side]));
    expect(world.units[side].hp).toBe(1000);
    world.tick = 30;
    world.units[side].spec.hooks!.onTick!(hookContext(world, world.units[side]));
    expect(world.units[side].hp).toBe(1100);
    expect(world.units[side].totals.healing).toBe(100);
    expect(world.units[target].totals.healing).toBe(0);
    expect(() => equipRuneEffects(spec, [9111], catalog, rules, { legendPoints: 0 })).toThrow(/requires selecting/);
  });

  it("binds Haste history to its fighter and snapshots its separate numeric rules", () => {
    const input = fighter({ hooks: {
      onStart(ctx) { ctx.memory.kitSawBasicHaste = derive(ctx.self).basicAbilityHaste; },
    } });
    expect(() => equipRuneEffects(input, [9105], catalog, rules)).toThrow(/explicit.*legendPoints/);
    const options = { legendPoints: 199 }, suppliedRules = structuredClone(rules);
    const own = equipRuneEffects(input, [9105], catalog, suppliedRules, options);
    const opponent = equipRuneEffects(fighter(), [9104], catalog, rules, { legendPoints: 0 });
    options.legendPoints = 1000;
    suppliedRules.legendHaste.hastePerStack = 100;
    const first = arena(runeMatchupSpecs(own, opponent));
    expect(first.units[0].memory.kitSawBasicHaste).toBe(1.5);
    expect(first.units[0].memory["rune:legend-haste:points"]).toBe(199);
    expect(derive(first.units[0]).bonusAttackSpeed).toBe(0);
    expect(derive(first.units[1]).basicAbilityHaste).toBe(0);
    expect(derive(first.units[1]).bonusAttackSpeed).toBeCloseTo(0.03, 12);
    dealDamage(first, first.units[0], first.units[1], 5000, "true");
    expect(first.units[0].memory["rune:legend-haste:points"]).toBe(299);
    expect(derive(first.units[0]).basicAbilityHaste).toBe(3);
    const second = arena(runeMatchupSpecs(own, opponent));
    expect(second.units[0].memory["rune:legend-haste:points"]).toBe(199);
    expect(derive(second.units[0]).basicAbilityHaste).toBe(1.5);
    expect(input.bonus).toBeUndefined();
  });

  it("requires explicit same-fighter Legend state without changing empty legacy equipment", () => {
    const input = fighter();
    expect(() => equipRuneEffects(input, [9104], catalog, rules)).toThrow(/explicit.*legendPoints/);
    for (const legendPoints of [NaN, Infinity, -1, 1.5, "100", null]) {
      expect(() => equipRuneEffects(input, [9104], catalog, rules, { legendPoints } as never)).toThrow(/legendPoints/);
    }
    expect(() => equipRuneEffects(input, [], catalog, rules, { legendPoints: 0 })).toThrow(/requires selecting/);
    expect(() => equipRuneEffects(input, [8014], catalog, rules, { legendPoints: 0 })).toThrow(/requires selecting/);
    expect(() => equipRuneEffects(input, [9104], catalog, rules, { legendPoints: 0, unrelated: true } as never)).toThrow(/Invalid combat-rune options/);
    expect(equipRuneEffects(input, [], catalog, rules).spec).toBe(input);
  });

  it("snapshots declared Legend state, initializes before the kit, and progresses after its kill callback", () => {
    const input = fighter({ hooks: {
      onStart(ctx) { ctx.memory.kitSawAttackSpeed = derive(ctx.self).bonusAttackSpeed; },
      onKill(ctx) { ctx.memory.kitSawPoints = ctx.memory["rune:legend-alacrity:points"] ?? -1; },
    } });
    const options = { legendPoints: 99 }, suppliedRules = structuredClone(rules);
    const own = equipRuneEffects(input, [9104], catalog, suppliedRules, options), enemy = equip();
    options.legendPoints = 1000; suppliedRules.legendAlacrity.attackSpeedPerStack = 1;
    const first = arena(runeMatchupSpecs(own, enemy));
    expect(first.units[0].memory.kitSawAttackSpeed).toBeCloseTo(0.03, 12);
    expect(first.units[0].memory["rune:legend-alacrity:points"]).toBe(99);
    dealDamage(first, first.units[0], first.units[1], 5000, "true");
    expect(first.units[0].memory.kitSawPoints).toBe(99);
    expect(first.units[0].memory["rune:legend-alacrity:points"]).toBe(199);
    expect(derive(first.units[0]).bonusAttackSpeed).toBeCloseTo(0.045, 12);
    const second = arena(runeMatchupSpecs(own, enemy));
    expect(second.units[0].memory["rune:legend-alacrity:points"]).toBe(99);
    expect(derive(second.units[0]).bonusAttackSpeed).toBeCloseTo(0.03, 12);
    expect(input.start).toBeUndefined();
    expect(input.bonus).toBeUndefined();
  });

  it("keeps an empty loadout and an empty pairing identical to their supplied specs", () => {
    const you = fighter(), enemy = fighter();
    const a = equipRuneEffects(you, [], catalog, null as unknown as CombatRuneRules), b = equip(enemy);
    expect(a).toMatchObject({ spec: you, selection: [], enemyHooks: [], evidence: [], assumptions: [] });
    expect(a.spec).toBe(you);
    const paired = runeMatchupSpecs(a, b);
    expect(paired[0]).toBe(you); expect(paired[1]).toBe(enemy);
  });

  it("binds each side's outgoing rune to its actual opposing fighter", () => {
    const a = equip(fighter(), [8014]), b = equip(fighter(), [8299]);
    const world = arena(runeMatchupSpecs(a, b));
    world.units[0].hp = 1800; world.units[1].hp = 400;
    damage(world, 0, 1);
    damage(world, 1, 0);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(108, 10);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(111, 10);
    expect(a.spec.hooks?.modifyDamageTakenRaw).toBeUndefined();
    expect(b.spec.hooks?.modifyDamageTakenRaw).toBeUndefined();
  });

  it("chains the victim kit's raw adjustment with the opposing rune exactly once", () => {
    const victim = fighter({ hooks: { modifyDamageTakenRaw: (ctx) => ctx.raw * 0.5 } });
    const actor = equip(fighter(), [8014]), target = equip(victim);
    const world = arena(runeMatchupSpecs(actor, target));
    world.units[1].hp = 400;
    damage(world, 0, 1);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(54, 10);
    expect(victim.hooks!.modifyDamageTakenRaw).toBeDefined();
  });

  it("retains the kit's own damage callback beside a selected self-rune callback", () => {
    const input = fighter({ hooks: { onDamageTaken(ctx) { ctx.memory.kitHits = Number(ctx.memory.kitHits ?? 0) + 1; } } });
    const own = equip(input, [8444]), other = equip(fighter());
    const world = arena(runeMatchupSpecs(own, other));
    damage(world, 1, 0);
    expect(world.units[0].memory.kitHits).toBe(1);
    expect(world.units[0].hp).toBe(1900);
    expect(own.spec.hooks!.onDamageTaken).not.toBe(input.hooks!.onDamageTaken);
  });

  it.each([0, 1] as const)("keeps side %s's Absorb Life and kit kill callback together through equipment", (side) => {
    const spec = fighter({ hooks: { onKill(ctx) { ctx.memory.kitKills = Number(ctx.memory.kitKills ?? 0) + 1; } } });
    const a = equip(spec, [8014, 9101]), b = equip(spec, [8444, 9101]);
    const world = arena(runeMatchupSpecs(a, b)), target = side === 0 ? 1 : 0;
    world.units[side].hp = 1000;
    dealDamage(world, world.units[side], world.units[target], 5000, "true");
    expect(world.units[side].hp).toBe(1027);
    expect(world.units[side].totals.healing).toBe(27);
    expect(world.units[side].memory.kitKills).toBe(1);
    expect(world.units[target].totals.healing).toBe(0);
    expect(spec.hooks).not.toHaveProperty("onDamageTaken");
  });

  it("snapshots caller rules, choices and evidence before reuse in multiple worlds", () => {
    const input = structuredClone(rules), choices = [8014];
    const own = equipRuneEffects(fighter(), choices, catalog, input), other = equip(fighter());
    input.coupDeGrace.damageIncrease = 0.9; input.evidence[0]!.text = "changed"; choices[0] = 8017;
    own.selection.push(8444); own.evidence[0]!.text = "changed again";
    const first = arena(runeMatchupSpecs(own, other)), second = arena(runeMatchupSpecs(own, other));
    first.units[1].hp = 400; second.units[1].hp = 400;
    damage(first, 0, 1);
    expect(first.units[1].totals.damageTaken).toBeCloseTo(108, 10);
    expect(second.units[1].hp).toBe(400);
    damage(second, 0, 1);
    expect(second.units[1].totals.damageTaken).toBeCloseTo(108, 10);
  });

  it("rebuilds form graphs without losing a supplied current-form allocation", () => {
    const small: FighterSpec = { ...fighter({ id: "small" }), form: "small" };
    const big: FighterSpec = { ...fighter({ id: "big", base: { hp: 3000 } }), form: "big" };
    const forms = { small, big }; small.forms = forms; big.forms = forms;
    const source = { ...small, bonus: { hp: 500, ad: 123 } };
    const own = equip(source), other = equip(fighter(), [8014]);
    const [paired] = runeMatchupSpecs(own, other);
    expect(paired.forms).not.toBe(forms);
    expect(paired.forms!.small).toBe(paired);
    expect(paired.forms!.big!.forms).toBe(paired.forms);
    expect(paired.bonus).toEqual({ hp: 500, ad: 123 });
    const world = arena([paired, other.spec]);
    setForm(world, world.units[0], "big");
    expect(world.units[0].spec.bonus).toEqual({ hp: 500, ad: 123 });
    world.units[0].hp = 1000;
    damage(world, 1, 0);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(108, 10);
    expect(small.forms).toBe(forms); expect(big.forms).toBe(forms);
    expect(small.bonus).toBeUndefined(); expect(big.bonus).toBeUndefined();
  });

  it("rejects repeated equipment after ordinary spec spreads and on another form", () => {
    const small: FighterSpec = { ...fighter({ id: "small" }), form: "small" };
    const big: FighterSpec = { ...fighter({ id: "big" }), form: "big" };
    const forms = { small, big }; small.forms = forms; big.forms = forms;
    const own = equip(small, [8444]);
    expect(() => equip(own.spec, [8444])).toThrow(/already been equipped/);
    expect(() => equip({ ...own.spec, bonus: { hp: 100 } }, [8444])).toThrow(/already been equipped/);
    expect(() => equip(own.spec.forms!.big!, [8444])).toThrow(/already been equipped/);
  });

  it("rejects a second application of the same outgoing effects to an already paired spec", () => {
    const own = equip(fighter(), [8014]), other = equip(fighter());
    const paired = runeMatchupSpecs(own, other);
    expect(() => runeMatchupSpecs(own, { ...other, spec: paired[1] })).toThrow(/already been applied/);
    // The reusable unpaired source remains valid for another independent fight.
    expect(() => runeMatchupSpecs(own, other)).not.toThrow();
  });

  it("rejects incompatible dataset identities and invalid numeric rule intervals", () => {
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, dataset: "16.22" })).toThrow(/dataset and patch/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, patch: "26.22" })).toThrow(/dataset and patch/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, coupDeGrace: { ...rules.coupDeGrace, damageIncrease: NaN } })).toThrow(/coupDeGrace.damageIncrease/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, lastStand: { ...rules.lastStand, maximumHealthThreshold: 0.7 } })).toThrow(/Last Stand threshold/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, secondWind: { ...rules.secondWind, tickInterval: 11 } })).toThrow(/Second Wind regeneration/);
    expect(() => equipRuneEffects(fighter(), [9101], catalog, { ...rules, absorbLife: { heal: 0 } })).toThrow(/absorbLife.heal/);
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, evidence: [] })).toThrow(/source evidence/);
  });
});
