/** Actual kit routing through equipped PTA, complementary to contact metadata checks. */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, DamageReport, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { composeHooks, mapForms } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const prefix = "rune:press-the-attack:";
function arena(id: string) {
  const reports: DamageReport[] = [];
  const spec = mapForms(kit(id).spec, form => ({ ...form,
    base: { ...form.base, hpRegen: 0, resourceRegen: 0 },
    hooks: composeHooks(form.hooks, [{ onDamageDealt(ctx) {
      if (ctx.ability === "Press the Attack") reports.push(ctx);
    } }], [], false),
  }));
  const other: FighterSpec = fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
  const equipped = equipRuneEffects(spec, [8005], catalog, rules);
  const target = equipRuneEffects(other, [], catalog, rules);
  const world = createWorld({ fighters: runeMatchupSpecs(equipped, target), distance: 100,
    modes: ["idle", "idle"], settings: { maxSeconds: 30, maxBranches: 1, log: true } });
  return { world, reports };
}
function spell(world: World, key: string): AbilitySpec {
  const found = world.units[0].spec.abilities.find(ability => ability.key === key);
  if (!found) throw new Error(`Missing actual ability ${key}`);
  return found;
}
function fire(world: World): void {
  startAttack(world, world.units[0]);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("Expected native attack windup");
  world.tick = action.launchTick;
  launchAttack(world, world.units[0], action);
}
function through(world: World, until: number): void {
  while (!world.result && world.tick <= until) step(world, [idle, idle]);
}

describe("equipped Press the Attack on actual custom champion contacts", () => {
  it.each([false, true])("Renekton's empowered=%s actual W consumes its sourced strike count", empowered => {
    const { world, reports } = arena("Renekton"), self = world.units[0];
    self.resource = empowered ? 50 : 0;
    startCast(world, self, spell(world, empowered ? "Wfury" : "W"));
    fire(world);
    if (!empowered) {
      expect(reports).toHaveLength(0);
      expect(self.memory[prefix + "stacks"]).toBe(2);
      attackHit(world, self, world.units[1], false, []);
    }
    expect(reports).toHaveLength(1);
    expect(reports[0]!.raw).toBeCloseTo(2960 / 17, 12);
    expect(self.memory[prefix + "stacks"]).toBeUndefined();
    expect(self.memory[prefix + "ready"]).toBe(world.tick + 180);
  });

  it("Senna's shielded primary Q supplies the third application and a full unamplified proc", () => {
    const { world, reports } = arena("Senna"), self = world.units[0], target = world.units[1];
    attackHit(world, self, target, false, []);
    attackHit(world, self, target, false, []);
    expect(self.memory[prefix + "stacks"]).toBe(2);
    applyEffect(world, target, target, { type: "state", state: "spellShield", duration: 15 }, { scale: 1 });
    const q = spell(world, "Q");
    abilityHit(world, self, target, q, q.onHit!);
    expect(reports).toHaveLength(1);
    expect(reports[0]!.raw).toBeCloseTo(2960 / 17, 12);
    expect(target.statuses.some(status => status.key === "spellShield")).toBe(false);
    expect(self.memory[prefix + "stacks"]).toBeUndefined();
  });

  it("Bel'Veth's actual reduced-effectiveness E slashes trigger one full proc during their cooldown", () => {
    const { world, reports } = arena("Belveth");
    startCast(world, world.units[0], spell(world, "E"));
    through(world, 44);
    expect(reports).toHaveLength(1);
    expect(reports[0]!.raw).toBeCloseTo(2960 / 17, 12);
    expect(world.units[0].memory[prefix + "ready"]).toBeGreaterThan(world.tick);
  });
});
