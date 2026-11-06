import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { applyEffect } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
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
  coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
  cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
  lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
  secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
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

  it("accepts precisely the eight legal subsets of the initial four implemented effects", () => {
    let accepted = 0;
    for (let mask = 0; mask < 1 << FIRST_COMBAT_RUNE_IDS.length; mask++) {
      const selected = FIRST_COMBAT_RUNE_IDS.filter((_, index) => mask & 1 << index);
      const amps = selected.filter((id) => id === 8014 || id === 8017 || id === 8299);
      if (amps.length <= 1) {
        expect(validateCombatRuneSelection(catalog, selected)).toEqual([...selected].sort((a, b) => a - b));
        accepted++;
      } else expect(() => validateCombatRuneSelection(catalog, selected)).toThrow(/same path row/);
    }
    expect(accepted).toBe(8);
  });

  it.each([null, undefined, "8014", ["8014"], [NaN], [Infinity], [8014.5],
    Object.assign(new Array(1), {}), [8014, 8439, 8444, 1, 2, 3, 4]])
  ("rejects malformed IDs or incomplete arrays: %s", (selected) => {
    expect(() => validateCombatRuneSelection(catalog, selected)).toThrow(/at most six positive integer IDs/);
  });

  it("does not quietly equip an unsupported rune or a stat-shard ID", () => {
    expect(() => validateCombatRuneSelection(catalog, [8010])).toThrow(/no combat implementation/);
    expect(() => validateCombatRuneSelection(catalog, [8439])).toThrow(/no combat implementation/);
    expect(() => validateCombatRuneSelection(catalog, [5005])).toThrow(/no combat implementation/);
  });

  it("rejects repeated choices and mutually exclusive row-three damage runes", () => {
    expect(() => validateCombatRuneSelection(catalog, [8014, 8014])).toThrow(/cannot repeat/);
    expect(() => validateCombatRuneSelection(catalog, [8014, 8299])).toThrow(/same path row/);
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
    expect(() => equipRuneEffects(fighter(), [8014], catalog, { ...rules, evidence: [] })).toThrow(/source evidence/);
  });
});
