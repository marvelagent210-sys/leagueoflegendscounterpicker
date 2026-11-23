import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import type { CCType } from "../../engine/rules/crowdControl";
import { startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyCC, beginResurrection, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { grantPermanentBonusHealth } from "../../engine/sim/healthGain";
import { petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const ID = 8439;
const CAP = 2690 / 17;
const BURST = 2230 / 17;
const owner = () => fighter({ base: { armor: 100, mr: 80 } });
const enemy = () => fighter({ base: { hp: 12000, armor: 0, mr: 0 } });
const stun: Effect = { type: "cc", cc: "stun", duration: 0.5 };
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

const equip = (spec: FighterSpec, selection = [ID], overgrowthDeaths?: number) =>
  equipRuneEffects(spec, selection, catalog, rules, { overgrowthDeaths }).spec;
const arena = (self = equip(owner()), target = enemy(), distance = 0) =>
  createWorld({ fighters: [self, target], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
const advances = (world: World) => ticksOf(world.log, 0, "Aftershock gains");
const control = (world: World, type: CCType = "stun") => applyCC(world, world.units[0], world.units[1], type, 0.5);
function reach(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

describe("Aftershock's native trigger", () => {
  it.each(["airborne", "berserk", "charm", "fear", "root", "sleep", "stasis", "stun", "suppression", "suspension", "taunt"] as const)
  ("arms on accepted %s", type => {
    const world = arena();
    expect(control(world, type)).toBe(true);
    expect(advances(world)).toEqual([0]);
    const stats = derive(world.units[0]);
    expect(stats.armor.bonus).toBe(45);
    expect(stats.mr.bonus).toBe(45);
  });

  it("waits for immobilization and ignores allied and controlled pet events", () => {
    const world = arena(), [self, target] = world.units;
    for (const type of ["slow", "cripple", "silence", "ground", "nearsight", "drowsy"] as const) {
      expect(control(world, type)).toBe(true);
    }
    expect(applyCC(world, self, self, "stun", 0.5)).toBe(true);
    const pet = spawnPet(world, self, { kind: "test", name: "Test pet", hp: 100,
      armor: 0, mr: 0, radius: 25, moveSpeed: 0, duration: 10 }, self.x);
    expect(petHit(world, pet, target, [stun], false)).toBe(true);
    expect(advances(world)).toEqual([]);
    expect(control(world, "sleep")).toBe(true);
    expect(advances(world)).toEqual([0]);
  });

  it("waits through CC immunity, spell shield and displacement immunity without spending cooldown", () => {
    const world = arena(), [self, target] = world.units;
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 700 } });
    target.statuses.push(lasting("state", "ccImmune"));
    expect(control(world)).toBe(false);
    target.statuses = [lasting("state", "spellShield")];
    abilityHit(world, self, target, spell, [stun]);
    expect(target.statuses.some(status => status.key === "spellShield")).toBe(false);
    target.statuses = [lasting("state", "displacementImmune")];
    expect(control(world, "airborne")).toBe(false);
    expect(control(world, "root")).toBe(true);
    expect(advances(world)).toEqual([]);
    target.statuses = [];
    expect(control(world, "root")).toBe(true);
    expect(advances(world)).toEqual([0]);
  });

  it("uses Leona's native empowered attack when the stun passes its spell shield gate", () => {
    const leona = equip(kit("Leona").spec);
    const daybreak = leona.abilities.find(spell => spell.key === "Q")!;
    for (const shielded of [false, true]) {
      const world = arena(leona), [self, target] = world.units;
      if (shielded) target.statuses.push(lasting("state", "spellShield"));
      startCast(world, self, daybreak);
      startAttack(world, self);
      reach(world, 30);
      expect(advances(world)).toHaveLength(shielded ? 0 : 1);
      expect(target.statuses.some(status => status.key === "stun")).toBe(!shielded);
    }
  });

  it("requires the user to choose Grasp explicitly for Yorick", () => {
    expect(() => equip(kit("Yorick").spec)).toThrow(/substitutes Grasp/);
    expect(() => equip(kit("Yorick").spec, [8437])).not.toThrow();
  });
});

describe("Aftershock's resistance window and shockwave", () => {
  it("snapshots the separate capped grants, expires at tick 75 and can rearm at tick 600", () => {
    const world = arena(equip({ ...owner(), bonus: { armor: 80, mr: 200 } })), [self, target] = world.units;
    control(world);
    expect(derive(self).armor.bonus).toBe(185);
    expect(derive(self).mr.bonus).toBeCloseTo(200 + CAP, 10);
    hookContext(world, self).buff("test:armor", "armor", 100, 25);
    reach(world, 74);
    expect(derive(self).armor.bonus).toBe(285);
    expect(target.totals.damageTaken).toBe(0);
    reach(world, 75);
    step(world, [idle, idle]);
    expect(derive(self).armor.bonus).toBe(180);
    expect(derive(self).mr.bonus).toBe(200);
    expect(target.totals.damageTaken).toBeCloseTo(BURST, 10);
    reach(world, 599);
    control(world);
    expect(advances(world)).toEqual([0]);
    reach(world, 600);
    control(world);
    expect(advances(world)).toEqual([0, 600]);
    expect(derive(self).armor.bonus).toBeCloseTo(180 + CAP, 10);
  });

  it("floors each negative bonus input before calculating its resistance grant", () => {
    const world = arena(equip({ ...owner(), bonus: { armor: -20, mr: 10 } }));
    control(world);
    expect(derive(world.units[0]).armor.bonus).toBe(25);
    expect(derive(world.units[0]).mr.bonus).toBe(62.5);
  });

  it("uses current bonus health and exact center range in independent copies", () => {
    const world = arena(equip({ ...owner(), bonus: { hp: 400 } }, [ID, 8451], 120)), [self, target] = world.units;
    control(world);
    reach(world, 73);
    const copy = cloneWorld(world);
    grantPermanentBonusHealth(hookContext(copy, copy.units[0]), 100, "test:gain", "Test award");
    target.x = self.x + 350.01;
    copy.units[1].x = copy.units[0].x + 350;
    reach(world, 80);
    reach(copy, 80);
    expect(target.totals.damageTaken).toBe(0);
    expect(copy.units[1].totals.damageTaken).toBeCloseTo(BURST + 0.08 * 545 * 1.035, 10);
    expect(derive(self).bonusHp).toBeCloseTo(445 * 1.035, 10);
  });

  it.each(["spellShield", "invisible", "untargetable", "invulnerable", "stasis"])("uses native damage and area rules for %s", protection => {
    const world = arena(), target = world.units[1];
    control(world);
    reach(world, 74);
    target.statuses.push(lasting("state", protection));
    reach(world, 80);
    const hit = protection === "spellShield" || protection === "invisible";
    expect(target.totals.damageTaken).toBeCloseTo(hit ? BURST : 0, 10);
    expect(target.statuses.some(status => status.key === protection)).toBe(true);
  });

  it("creates a damage instance that can spend an active Bone Plating charge", () => {
    const world = arena(equip(owner()), equip(enemy(), [8473])), [self, target] = world.units;
    control(world);
    reach(world, 60);
    dealDamage(world, self, target, 100, "true");
    reach(world, 80);
    expect(target.totals.damageTaken).toBeCloseTo(100 + BURST - 1080 / 17, 10);
    expect(ticksOf(world.log, 1, "Bone Plating blocks")).toEqual([75]);
  });

  it("cancels a pending wave during attackable resurrection and retains its cooldown", () => {
    const world = arena(), [self, target] = world.units;
    control(world);
    reach(world, 10);
    expect(beginResurrection(world, self, { duration: 0.5 })).toBe(true);
    reach(world, 11);
    expect(derive(self).armor.bonus).toBe(0);
    reach(world, 80);
    expect(target.totals.damageTaken).toBe(0);
    control(world);
    expect(advances(world)).toEqual([0]);
    reach(world, 600);
    control(world);
    expect(advances(world)).toEqual([0, 600]);
  });
});
