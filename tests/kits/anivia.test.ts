import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canTarget, dealDamage, hookContext } from "../../engine/sim/combat";
import { canMove, derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { terrainLimit } from "../../engine/sim/terrain";
import Anivia from "../../kits/champions/Anivia";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compiled = compileKit(championData("Anivia"), records("Anivia"), Anivia, {}, pets("Anivia"), runes());
const ability = (world: World, key: string) => world.units[0].spec.abilities.find((entry) => entry.key === key)!;
const dummy = () => fighter({ base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } });
function worldFor(distance = 300, ap = 100): World {
  const spec = { ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } };
  const world = createWorld({ fighters: [spec, dummy()], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30 } });
  world.units[0].x = 0; world.units[1].x = distance;
  // Hold the synthetic target on the axis so packet tests isolate formulas and clocks.
  applyEffect(world, world.units[1], world.units[1], { type: "cc", cc: "root", duration: 30 }, { scale: 1 });
  return world;
}
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function cast(world: World, key: string, distance?: number, direction: 1 | -1 = 1) { startCast(world, world.units[0], ability(world, key), distance === undefined ? undefined : { direction, distance }); }
function hit(world: World, key: string) { const spell = ability(world, key); abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!); }
function shield(world: World) { applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 }); }
const iced = (world: World) => world.units[1].statuses.find((status) => status.kind === "mark" && status.key === "aniviaIced");
const storm = (world: World) => world.zones.find((zone) => zone.ability === "R" && zone.kind === "field");
const prices = JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")).statPrices as StatPrices;

describe("Anivia audited source and finite metadata", () => {
  it("reads every pinned slot and states unresolved source geometry and clocks", () => {
    expect(compiled.evidence.map((entry) => entry.revid)).toEqual(expect.arrayContaining([3906517, 4026612, 4007565, 4057862, 4006729]));
    expect(compiled.assumptions.join(" ")).toContain("unknown knockback speed");
    expect(compiled.assumptions.join(" ")).toContain("three half");
    for (const spell of compiled.spec.abilities) expect(Number.isFinite(spell.cooldown) && Number.isFinite(spell.castTime)).toBe(true);
  });
  it("rejects changed recurring mana metadata rather than keeping stale constants", () => {
    const changed = structuredClone(records("Anivia")); changed.find((entry) => entry.kind === "R")!.fields.costType = "mana + unknown";
    expect(() => compileKit(championData("Anivia"), changed, Anivia)).toThrow("ongoing R mana");
  });
  it("never values the egg as permanent bonus defenses or guaranteed healing", () => {
    const world = worldFor(); const derived = derive(world.units[0]);
    expect(derived.armor.bonus).toBe(0); expect(derived.mr.bonus).toBe(0);
    expect(compiled.spec.budget?.healing).toBeUndefined();
    expect(Object.values(compiled.spec.budget!.damage!(world.units[0], world.units[1])).every(Number.isFinite)).toBe(true);
  });
});

describe("Anivia Flash Frost flight and independent explosion", () => {
  it("pierces once for 155 and manually explodes from the live point for 245", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 15);
    expect(world.units[1].totals.damageTaken).toBe(155);
    const missile = world.missiles.find((entry) => entry.source === "Q")!;
    expect(missile).toBeDefined(); expect(iced(world)).toBeDefined();
    expect(world.units[1].statuses.find((entry) => entry.key === "slow")?.value).toBe(.4);
    cast(world, "Q2"); expect(world.units[1].totals.damageTaken).toBeCloseTo(400, 8);
    expect(world.units[1].statuses.find((entry) => entry.key === "stun")?.endTick).toBe(world.tick + 45);
    through(world, 50); expect(world.units[1].totals.damageTaken).toBeCloseTo(400, 8);
  });
  it("a shield blocks only the pass; the distinct explosion still stuns and damages", () => {
    const world = worldFor(); shield(world); cast(world, "Q"); through(world, 15);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(iced(world)).toBeUndefined();
    cast(world, "Q2"); expect(world.units[1].totals.damageTaken).toBeCloseTo(245, 8); expect(iced(world)).toBeDefined();
  });
  it("a shield acquired between packets stops the explosion without retroactively removing pass damage", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 15); shield(world); cast(world, "Q2");
    expect(world.units[1].totals.damageTaken).toBe(155); expect(world.units[1].statuses.some((entry) => entry.key === "stun")).toBe(false);
  });
  it("an initially missed pass can still explode on a target entering the real explosion radius", () => {
    const world = worldFor(1500); cast(world, "Q"); through(world, 20);
    const missile = world.missiles.find((entry) => entry.source === "Q")!;
    world.units[1].x = missile.x + 200; cast(world, "Q2");
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(240); expect(world.units[1].totals.damageTaken).toBeLessThanOrEqual(245);
  });
  it("does not explode at a tracked target after it leaves the real projectile point", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 15); world.units[1].x = 1200; cast(world, "Q2");
    expect(world.units[1].totals.damageTaken).toBe(155);
  });
  it("automatically explodes at maximum range and starts its seven-second cooldown there", () => {
    const world = worldFor(1300); cast(world, "Q"); through(world, 41);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].cooldownHeld.Q).toBe("Q");
    through(world, 43); expect(world.units[1].totals.damageTaken).toBeGreaterThan(240); expect(world.units[0].cooldownReady.Q).toBe(253);
    expect(world.log.some((entry) => entry.text === "casts Flash Frost (recast)")).toBe(false);
  });
  it("uses cast-start origin and direction despite displacement during its cast", () => {
    const world = worldFor(600); cast(world, "Q"); world.units[0].x = 300; world.units[1].x = -600; through(world, 8);
    const missile = world.missiles.find((entry) => entry.source === "Q")!;
    expect(missile.x).toBe(0); expect(missile.direction).toBe(1);
  });
  it("a projectile wall destroys flight with no free explosion or Iced mark", () => {
    const world = worldFor(); world.zones.push({ id: 900, owner: 1, kind: "projectileWall", x: 100, radius: 0, startTick: 0, endTick: 90, seenTick: 0 });
    cast(world, "Q"); through(world, 45);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(iced(world)).toBeUndefined(); expect(world.missiles).toHaveLength(0);
    expect(canCast(world, world.units[0], ability(world, "Q2"))).toBe(false);
  });
  it("a parried explosion applies neither damage, slow nor Iced", () => {
    const world = worldFor(); applyEffect(world, world.units[1], world.units[1], { type: "state", state: "parry", duration: 2 }, { scale: 1 });
    cast(world, "Q"); through(world, 15); cast(world, "Q2");
    expect(world.units[1].totals.damageTaken).toBe(0); expect(iced(world)).toBeUndefined();
  });
  it("splashes enemy pets once per pass and once per explosion without using champion defenses", () => {
    const world = worldFor(700); const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Target pet", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 20 }, 300);
    cast(world, "Q"); through(world, 15); expect(pet.hp).toBe(845); cast(world, "Q2"); expect(pet.hp).toBe(600);
  });
});

describe("Anivia Frostbite impact mark and free invalid-cast cancellation", () => {
  it.each([[false, 210], [true, 420]] as const)("deals current Iced=%s damage %s", (marked, expected) => {
    const world = worldFor(); if (marked) hit(world, "Q"); const before = world.units[1].totals.damageTaken; hit(world, "E");
    expect(world.units[1].totals.damageTaken - before).toBe(expected);
  });
  it("doubles a launched E when Iced is acquired after launch", () => {
    const world = worldFor(600); cast(world, "E"); through(world, 8); hit(world, "Q"); const before = world.units[1].totals.damageTaken;
    through(world, 22); expect(world.units[1].totals.damageTaken - before).toBe(420);
  });
  it("loses doubled damage when the Iced mark expires during flight", () => {
    const world = worldFor(600); hit(world, "Q"); iced(world)!.endTick = 10; const before = world.units[1].totals.damageTaken;
    cast(world, "E"); through(world, 22); expect(world.units[1].totals.damageTaken - before).toBe(210);
  });
  it.each([false, true])("forecasts current Iced=%s during E's cast and missile, then updates when the mark changes", (marked) => {
    const world = worldFor(600); world.settings.reactionTime = 0;
    if (marked) hit(world, "Q");
    cast(world, "E");
    expect(perceive(world, 1).threats.find((threat) => threat.source === "E")).toMatchObject({ damage: marked ? 420 : 210, targeted: true, projectile: true });
    through(world, 8);
    const missile = world.missiles.find((entry) => entry.source === "E")!;
    expect(perceive(world, 1).threats.find((threat) => threat.id === missile.id)?.damage).toBe(marked ? 420 : 210);
    if (marked) { iced(world)!.endTick = world.tick; through(world, world.tick); }
    else hit(world, "Q");
    const expected = marked ? 210 : 420;
    expect(perceive(world, 1).threats.find((threat) => threat.id === missile.id)?.damage).toBe(expected);
    const before = world.units[1].totals.damageTaken;
    through(world, 22); expect(world.units[1].totals.damageTaken - before).toBe(expected);
  });
  it.each(["range", "invisible", "untargetable", "dead"] as const)("cancels %s during cast without cost or cooldown", (invalid) => {
    const world = worldFor(600), self = world.units[0], enemy = world.units[1]; const before = self.resource; cast(world, "E");
    if (invalid === "range") enemy.x = 601; else if (invalid === "dead") enemy.alive = false;
    else applyEffect(world, enemy, enemy, { type: "state", state: invalid, duration: 2 }, { scale: 1 });
    through(world, 8); expect(self.resource).toBe(before); expect(self.cooldownReady.E).toBeUndefined(); expect(world.missiles).toHaveLength(0);
  });
  it("a spell shield or projectile wall stops E without further damage", () => {
    for (const wall of [false, true]) {
      const world = worldFor(600); if (wall) world.zones.push({ id: 90, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 90 }); else shield(world);
      cast(world, "E"); through(world, 25); expect(world.units[1].totals.damageTaken).toBe(0);
    }
  });
});

describe("Anivia Glacial Storm separate clocks, geometry and resource shutdown", () => {
  it("deals three half startup packets, then empowered packets only twice a second", () => {
    const world = worldFor(); cast(world, "R", 300);
    expect(world.units[1].totals.damageTaken).toBe(18.125); through(world, 44);
    expect(world.units[1].totals.damageTaken).toBe(54.375); expect(iced(world)).toBeUndefined();
    through(world, 45); expect(world.units[1].totals.damageTaken).toBe(163.125); expect(iced(world)).toBeDefined();
    through(world, 59); expect(world.units[1].totals.damageTaken).toBe(163.125);
    through(world, 60); expect(world.units[1].totals.damageTaken).toBe(271.875);
  });
  it("refreshes mature slow at cumulative 45/53/60/68 ticks without extra damage or Iced pulses", () => {
    const world = worldFor(); cast(world, "R", 300); through(world, 45);
    expect(world.units[1].statuses.filter((entry) => entry.key === "slow" && entry.value === .6).at(-1)?.endTick).toBe(90); expect(iced(world)?.endTick).toBe(135);
    through(world, 53); expect(world.units[1].statuses.filter((entry) => entry.key === "slow" && entry.value === .6).at(-1)?.endTick).toBe(98); expect(iced(world)?.endTick).toBe(135);
    through(world, 60); expect(world.units[1].statuses.filter((entry) => entry.key === "slow" && entry.value === .6).at(-1)?.endTick).toBe(105);
    through(world, 68); expect(world.units[1].statuses.filter((entry) => entry.key === "slow" && entry.value === .6).at(-1)?.endTick).toBe(113);
  });
  it("refreshes an enemy pet's mature slow on tick 53 without dealing another damage packet", () => {
    const world = worldFor();
    const petSpec = { kind: "test", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 };
    const enemyPet = spawnPet(world, world.units[1], petSpec, 300), alliedPet = spawnPet(world, world.units[0], petSpec, 300);
    cast(world, "R", 300); through(world, 45);
    expect(enemyPet.hp).toBe(836.875);
    expect(enemyPet.statuses?.filter((status) => status.key === "slow" && status.value === .6).at(-1)?.endTick).toBe(90);
    through(world, 53);
    expect(enemyPet.hp).toBe(836.875);
    expect(enemyPet.statuses?.filter((status) => status.key === "slow" && status.value === .6).at(-1)?.endTick).toBe(98);
    expect(alliedPet.hp).toBe(1000); expect(alliedPet.statuses).toEqual([]);
  });
  it("uses a fixed center, growing radius, and full boundary inclusive of the target hitbox", () => {
    const world = worldFor(600); cast(world, "R", 300); expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 15); expect(storm(world)?.radius).toBeCloseTo(266.6666666667); expect(world.units[1].totals.damageTaken).toBe(18.125);
    world.units[0].x = -300; through(world, 45); expect(storm(world)?.x).toBe(300); expect(storm(world)?.radius).toBe(400);
  });
  it("pays 60 once and exactly 55 mana over the following second", () => {
    const world = worldFor(), self = world.units[0]; const before = self.resource; cast(world, "R", 300); through(world, 30);
    expect(before - self.resource).toBeCloseTo(115, 10); expect(self.action).toBeUndefined();
    cast(world, "E"); through(world, 39); expect(world.missiles.some((entry) => entry.source === "E")).toBe(true);
  });
  it("does not spend mana already reserved for an overlapping Frostbite cast", () => {
    const world = worldFor(); cast(world, "R", 300); world.units[0].resource = 50; cast(world, "E");
    through(world, 1); expect(storm(world)).toBeUndefined(); expect(world.units[0].resource).toBe(50);
    through(world, 8); expect(world.units[0].resource).toBe(0); through(world, 15); expect(world.units[1].totals.damageTaken).toBeGreaterThanOrEqual(210);
  });
  it("does not consume spell shields and damages enemy pets inside the storm", () => {
    const world = worldFor(); shield(world);
    const pet = spawnPet(world, world.units[1], { kind: "test", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 }, 300);
    cast(world, "R", 300); through(world, 45);
    expect(world.units[1].totals.damageTaken).toBe(163.125); expect(pet.hp).toBe(836.875);
    expect(world.units[1].statuses.some((entry) => entry.key === "spellShield")).toBe(true);
  });
  it.each(["untargetable", "stasis", "invulnerable"] as const)("respects a pet's dynamic %s protection and resumes after it expires", (state) => {
    const world = worldFor();
    const pet = spawnPet(world, world.units[1], { kind: "test", name: "Protected pet", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 }, 300);
    petEffects(world, world.units[1], pet, [{ type: "state", state, duration: 1.6 }]);
    cast(world, "R", 300); through(world, 45);
    expect(pet.hp).toBe(1000);
    expect(pet.statuses?.some((status) => status.key === "slow")).toBe(state === "invulnerable");
    through(world, 53);
    expect(pet.hp).toBe(1000);
    expect(pet.statuses?.filter((status) => status.key === "slow" && status.value === .6).at(-1)?.endTick).toBe(98);
    through(world, 60); expect(pet.hp).toBe(891.25);
  });
  it("uses the static manual-toggle gate, a single final tick, and haste-affected full cooldown", () => {
    const world = worldFor(), self = world.units[0]; self.spec = { ...self.spec, bonus: { ap: 100, abilityHaste: 100 } };
    cast(world, "R", 300); expect(canCast(world, self, ability(world, "Roff"))).toBe(false); through(world, 31);
    const before = world.units[1].totals.damageTaken; cast(world, "Roff"); expect(world.units[1].totals.damageTaken - before).toBe(18.125);
    expect(storm(world)).toBeUndefined(); expect(self.cooldownReady.R).toBe(world.tick + 30);
  });
  it("coalesces nominal and final packets when switched off on the same tick", () => {
    const world = worldFor(); cast(world, "R", 300); through(world, 45); world.tick = 45;
    const before = world.units[1].totals.damageTaken; cast(world, "Roff"); expect(world.units[1].totals.damageTaken).toBe(before);
  });
  it.each(["mana", "distance"] as const)("automatically ends on %s with one final current-tier packet", (cause) => {
    const world = worldFor(); cast(world, "R", 300); through(world, 47);
    const before = world.units[1].totals.damageTaken;
    if (cause === "mana") world.units[0].resource = 0; else world.units[0].x = -701;
    through(world, 48); expect(storm(world)).toBeUndefined(); expect(world.units[1].totals.damageTaken - before).toBe(108.75);
    expect(world.units[0].cooldownReady.R).toBe(108); through(world, 49); expect(world.units[1].totals.damageTaken - before).toBe(108.75);
  });
  it.each(["root", "ground", "blind", "disarm"] as const)("continues through %s", (cc) => {
    const world = worldFor(); cast(world, "R", 300); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 }); through(world, 1); expect(storm(world)).toBeDefined();
  });
  it.each(["silence", "stun", "airborne", "charm", "fear", "suppression"] as const)("ends on accepted %s", (cc) => {
    const world = worldFor(); cast(world, "R", 300); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 }); through(world, 1); expect(storm(world)).toBeUndefined();
  });
  it("an accepted self-displacement ends R and its final packet still targets the opponent", () => {
    const world = worldFor(); cast(world, "R", 300); through(world, 1); const selfHp = world.units[0].hp, before = world.units[1].totals.damageTaken;
    applyEffect(world, world.units[0], world.units[0], { type: "cc", cc: "airborne", duration: 1 / 30 }, { scale: 1 });
    expect(storm(world)).toBeUndefined(); expect(world.units[0].hp).toBe(selfHp); expect(world.units[1].totals.damageTaken - before).toBe(18.125);
  });
  it("Crystallize's actual self-ejection immediately ends R with one final opponent damage packet", () => {
    const world = worldFor(), self = world.units[0], selfHp = self.hp;
    cast(world, "R", 300); cast(world, "W", 100); through(world, 8);
    expect(self.x).toBe(-120); expect(world.terrain).toHaveLength(1); expect(storm(world)).toBeUndefined();
    expect(self.hp).toBe(selfHp); expect(world.units[1].totals.damageTaken).toBe(36.25); expect(self.cooldownReady.R).toBe(68);
    through(world, 15); expect(world.units[1].totals.damageTaken).toBe(36.25);
  });
  it("preserves source-exempt self stasis but ends on hostile stasis", () => {
    const world = worldFor(); cast(world, "R", 300); applyEffect(world, world.units[0], world.units[0], { type: "state", state: "stasis", duration: 1 }, { scale: 1 }); through(world, 1); expect(storm(world)).toBeDefined();
    world.units[0].statuses = []; applyEffect(world, world.units[1], world.units[0], { type: "state", state: "stasis", duration: 1 }, { scale: 1 }); through(world, 2); expect(storm(world)).toBeUndefined();
  });
  it("does not duplicate active storms and clones storm radius, clocks and resources independently", () => {
    const world = worldFor(); cast(world, "R", 300); through(world, 20); const copy = cloneWorld(world);
    expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false);
    through(copy, 45); expect(storm(world)?.radius).toBeLessThan(400); expect(storm(copy)?.radius).toBe(400);
    expect(world.units[0].resource).toBeGreaterThan(copy.units[0].resource);
  });
});

describe("Anivia wall terrain and attackable Rebirth", () => {
  it("raises a five-second wall slab that affects both teams but preserves visibility", () => {
    const world = worldFor(600); cast(world, "W", 300); through(world, 8);
    expect(world.terrain).toEqual([expect.objectContaining({ from: 200, to: 400, endTick: 158 })]);
    expect(terrainLimit(world, world.units[0], 1000)).toBe(165);
    expect(terrainLimit(world, world.units[1], -1000)).toBe(-165); expect(canTarget(world.units[1], world.units[0])).toBe(true);
    through(world, 158); expect(world.terrain).toHaveLength(0);
  });
  it.each([[0, 100], [1200, 1000]] as const)("clamps requested wall-center distance %s to %s", (requested, expected) => {
    const world = worldFor(); cast(world, "W", requested); through(world, 8); expect(world.terrain[0]!.from + 100).toBe(expected);
  });
  it("keeps a chosen wall center fixed when the caster and enemy move during cast", () => {
    const world = worldFor(600); cast(world, "W", 300); world.units[0].x = -200; world.units[1].x = 1000; through(world, 8);
    expect(world.terrain[0]!.from + 100).toBe(300);
  });
  it("ejects an enemy champion from the wall rather than away from Anivia, through spell shields", () => {
    const world = worldFor(300); shield(world); cast(world, "W", 350); through(world, 8);
    expect(world.units[1].x).toBe(180); expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[1].statuses.some((status) => status.key === "spellShield")).toBe(true);
  });
  it("can eject Anivia herself and both friendly and hostile pets", () => {
    const world = worldFor(700);
    const petSpec = { kind: "test", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 };
    const allied = spawnPet(world, world.units[0], petSpec, 150), enemy = spawnPet(world, world.units[1], petSpec, 50);
    cast(world, "W", 100); through(world, 8);
    expect(world.units[0].x).toBe(-120); expect(allied.x).toBe(400); expect(enemy.x).toBe(-200);
  });
  it.each(["ccImmune", "displacementImmune", "untargetable"] as const)("preserves an enemy protected by %s while still raising terrain", (state) => {
    const world = worldFor(300); applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 2 }, { scale: 1 });
    cast(world, "W", 300); through(world, 8); expect(world.units[1].x).toBe(300); expect(world.terrain).toHaveLength(1);
  });
  it("does not eject a champion through existing terrain", () => {
    const world = worldFor(300); world.terrain.push({ id: 900, owner: 1, from: 150, to: 200, endTick: 600 });
    cast(world, "W", 350); through(world, 8); expect(world.units[1].x).toBe(235);
  });
  it("its terrain stops an ordinary dash and provides a wall for wall-stun abilities", () => {
    const world = worldFor(600); cast(world, "W", 300); through(world, 8);
    expect(terrainLimit(world, world.units[0], 1000)).toBe(165);
    applyEffect(world, world.units[0], world.units[1], { type: "displace", direction: "toward", distance: 1000, duration: .25 }, { scale: 1 });
    through(world, 16); expect(world.units[1].x).toBeGreaterThanOrEqual(435);
  });
  it("begins one targetable, damageable egg at full HP with only six seconds of +20/+20", () => {
    const world = worldFor(); const self = world.units[0]; const max = derive(self).maxHp;
    dealDamage(world, world.units[1], self, 100000, "true"); expect(self.hp).toBe(max); expect(self.fallen).toBeFalsy();
    expect(canTarget(self, world.units[1])).toBe(true); expect(derive(self).armor.bonus).toBe(20); expect(derive(self).mr.bonus).toBe(20);
    dealDamage(world, world.units[1], self, 100, "true"); expect(self.hp).toBe(max - 100);
    through(world, 180); expect(derive(self).armor.bonus).toBe(0); expect(derive(self).mr.bonus).toBe(0); expect(self.hp).toBe(max - 100); expect(self.fallen).toBeFalsy();
  });
  it("a second lethal egg hit is final and cannot restart the passive", () => {
    const world = worldFor(); dealDamage(world, world.units[1], world.units[0], 100000, "true");
    dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 0); expect(world.units[0].alive).toBe(false);
  });
  it("locks movement, attacks and future casts through tenacity and cleanse", () => {
    const world = worldFor(); applyEffect(world, world.units[0], world.units[0], { type: "state", state: "tenacity", value: .9, duration: 20 }, { scale: 1 });
    dealDamage(world, world.units[1], world.units[0], 100000, "true"); applyEffect(world, world.units[0], world.units[0], { type: "cleanse" }, { scale: 1 });
    expect(canMove(world.units[0])).toBe(false); expect(canStartAttack(world, world.units[0])).toBe(false);
    for (const key of ["Q", "W", "E", "R"]) expect(canCast(world, world.units[0], ability(world, key))).toBe(false);
  });
  it("preserves an existing cast through egg entry and completes its normal payment/delivery", () => {
    const world = worldFor(); const self = world.units[0]; const before = self.resource; cast(world, "E");
    const action = self.action; dealDamage(world, world.units[1], self, 100000, "true"); expect(self.action).toBe(action);
    through(world, 15); expect(self.resource).toBe(before - 50); expect(world.units[1].totals.damageTaken).toBe(210);
  });
  it("interrupts a conventional channel while preserving no false counted death", () => {
    const world = worldFor(); world.units[0].action = { kind: "channel", ability: "R", startTick: 0, endTick: 100, nextTick: 30, intervalTicks: 30 };
    dealDamage(world, world.units[1], world.units[0], 100000, "true"); expect(world.units[0].action).toBeUndefined(); expect(world.units[0].fallen).toBeFalsy();
  });
  it("clears hostile periodic damage and CC, and a surviving egg reopens future cast declarations at six seconds", () => {
    const world = worldFor();
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 10 }, { scale: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "dot", damageType: "magic", total: { base: 100 }, duration: 10, interval: 1 }, { scale: 1 });
    dealDamage(world, world.units[1], world.units[0], 100000, "true");
    expect(world.units[0].statuses.some((status) => status.source === 1 && ["cc", "dot"].includes(status.kind))).toBe(false);
    through(world, 179); expect(canCast(world, world.units[0], ability(world, "E"))).toBe(false);
    through(world, 180); expect(canCast(world, world.units[0], ability(world, "E"))).toBe(true);
  });
  it("breaks an actual Morgana tether on egg entry without a later completion hit", () => {
    const morgana = kit("Morgana").spec;
    const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0 } }, morgana], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    world.units[0].x = 0; world.units[1].x = 300;
    const r = morgana.abilities.find((spell) => spell.key === "R")!; startCast(world, world.units[1], r); through(world, Math.ceil(r.castTime * 30));
    expect(world.units[1].memory.shacklesUntil).toBeDefined(); dealDamage(world, world.units[1], world.units[0], 100000, "true");
    expect(world.units[1].memory.shacklesUntil).toBeUndefined(); const before = world.units[0].hp;
    through(world, world.tick + 100); expect(world.units[0].hp).toBe(before); expect(world.units[0].statuses.some((status) => status.key === "stun")).toBe(false);
  });
  it("ends its persistent storm on Rebirth entry and keeps cloned eggs independent", () => {
    const world = worldFor(); cast(world, "R", 300); dealDamage(world, world.units[1], world.units[0], 100000, "true");
    expect(storm(world)).toBeUndefined(); const copy = cloneWorld(world); dealDamage(copy, copy.units[1], copy.units[0], 100, "true");
    expect(copy.units[0].hp).toBe(world.units[0].hp - 100); through(copy, 180); expect(world.tick).toBe(0);
  });
});

describe("Anivia ordinary policy and full realistic matchup reflection", () => {
  it.each(["hold", "trade"] as const)("does not use R in %s", (mode) => {
    const world = worldFor(); world.modes[0] = mode; world.units[0].cooldownReady = { Q: Infinity, W: Infinity, E: Infinity };
    expect(compiled.spec.behavior!(perceive(world, 0))).not.toMatchObject({ kind: "cast", ability: "R" });
  });
  it("uses a useful Q detonation in fight, kite, trade and flee modes without ignoring the trade clock", () => {
    for (const mode of ["fight", "kite", "trade", "flee"] as const) {
      const world = worldFor(); cast(world, "Q"); through(world, 15); world.modes[0] = mode;
      expect(compiled.spec.behavior!(perceive(world, 0)), mode).toMatchObject({ kind: "cast", ability: "Q2" });
    }
  });
  it("waits for the Q pass to connect before detonating when both packets are available", () => {
    const world = worldFor(600); cast(world, "Q"); through(world, 21); world.modes[0] = "fight";
    world.units[0].cooldownReady = { ...world.units[0].cooldownReady, W: Infinity, E: Infinity, R: Infinity };
    expect(world.units[1].totals.damageTaken).toBe(0); expect(compiled.spec.behavior!(perceive(world, 0))).not.toMatchObject({ kind: "cast", ability: "Q2" });
    through(world, 22); expect(world.units[1].totals.damageTaken).toBe(155); expect(compiled.spec.behavior!(perceive(world, 0))).toMatchObject({ kind: "cast", ability: "Q2" });
  });
  it("places R in range for fight/kite, and uses W as an escape obstacle while fleeing", () => {
    for (const mode of ["fight", "kite"] as const) {
      const world = worldFor(600); world.modes[0] = mode;
      expect(compiled.spec.behavior!(perceive(world, 0)), mode).toMatchObject({ kind: "cast", ability: "R", aim: { distance: 600 } });
    }
    const world = worldFor(); world.modes[0] = "flee";
    expect(compiled.spec.behavior!(perceive(world, 0))).toMatchObject({ kind: "cast", ability: "W" });
  });
  it("retreats immediately when the shared trade clock has completed", () => {
    const world = worldFor(); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(compiled.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("uses Q, W, E and R during an ordinary duel and actually stuns and damages", () => {
    const self = { ...compiled.spec, bonus: { ap: 350, hp: 2000 } };
    const enemy = { ...dummy(), base: { ...dummy().base, moveSpeed: 350, ad: 60 } };
    const result = fairFight({ fighters: [self, enemy], distance: 500, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 20, maxBranches: 8 } });
    for (const key of ["Q", "W", "E", "R"]) expect(result.timeline.some((entry) => entry.side === 0 && entry.text === `casts ${compiled.spec.abilities.find((entry) => entry.key === key)!.name}`), key).toBe(true);
    expect(result.timeline.some((entry) => entry.text.includes("inflicts stun"))).toBe(true); expect(result.damage.every(Number.isFinite)).toBe(true);
  });
  it("preserves exact 15,000-gold builds and all six scenario scores when swapped with Darius", () => {
    const darius = kit("Darius").spec; const forward = simulateMatchup(compiled.spec, darius, 15000, prices); const reverse = simulateMatchup(darius, compiled.spec, 15000, prices);
    expect(forward.builds[0]).toEqual(reverse.builds[1]); expect(forward.builds[1]).toEqual(reverse.builds[0]);
    const counterpart = { youEngage: "enemyEngages", enemyEngages: "youEngage", brawl: "brawl", shortTrade: "shortTrade", spacing: "spacing", escape: "escape" } as const;
    for (const scenario of forward.scenarios) expect(Math.abs((scenario.score ?? 0) + (reverse.scenarios.find((entry) => entry.id === counterpart[scenario.id])!.score ?? 0)), scenario.id).toBeLessThan(1e-12);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
