import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { applyEffect, attackHit, canSee, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import Diana from "../../kits/champions/Diana";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compiled = compileKit(championData("Diana"), records("Diana"), Diana, {}, pets("Diana"), runes());
const ability = (key: string, spec = compiled.spec): AbilitySpec => spec.abilities.find((a) => a.key === key)!;
function worldFor(x = 300, ap = 100, bonusHealth = 0): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap, hp: bonusHealth } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = x;
  return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(world, world.units[0], ability(key), aim);
function state(world: World, target: Unit, key: StateType, duration = 5): void { applyEffect(world, target, target, { type: "state", state: key, duration }, { scale: 1 }); }
function mark(world: World, target = world.units[1], duration = 3): void { applyEffect(world, world.units[0], target, { type: "mark", key: "diana:moonlight", duration }, { scale: 1 }); }
const shieldTotal = (unit: Unit) => unit.statuses.filter((s) => s.kind === "shield").reduce((sum, s) => sum + s.value, 0);
function summon(world: World, x: number, extra: Partial<PetSpec> = {}): Pet { return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual summon", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, ...extra }, x); }
function basic(world: World): void { attackHit(world, world.units[0], world.units[1], false, []); }
function arm(world: World): void { basic(world); basic(world); }

// Source readers execute during build; malformed records cannot silently use remembered constants.
describe("Diana pinned source and numeric contract", () => {
  it("audits all five pinned revisions and exact versioned Hermite/orbit excerpts", () => {
    expect(new Set(compiled.evidence.filter((row) => row.revid).map((row) => row.revid))).toEqual(new Set(records("Diana").map((row) => row.page.revid)));
    const game = compiled.evidence.filter((row) => row.url);
    expect(game.length).toBeGreaterThanOrEqual(15);
    expect(game.every((row) => row.sourceVersion === "16.21.8342754+branch.releases-16-21.content.release" && row.sourceSha256 === "9b2d999ce53563bd2d0e10838c928ed72d062a53f310a93583692fe6617cefbe")).toBe(true);
    expect(game.some((row) => row.text.includes('"mControlPoint2":[-1.3954554796218872,0.0,0.012537208385765553]'))).toBe(true);
    expect(compiled.assumptions.join(" ")).toContain("earliest30Hz arrival tick");
    expect(compiled.assumptions.join(" ")).toContain("initial phase and sphere collision radius are unpublished");
  });
  it("reads rank-five/three spell values, ratios, costs and cast times", () => {
    const ctx = new KitContext(championData("Diana"), records("Diana"));
    expect(ctx.ability("Q").formula("Magic Damage")).toEqual({ base: 210, ratios: { AP: .7 } });
    expect(ctx.ability("W").formula("Shield Strength")).toEqual({ base: 105, ratios: { AP: .3, bonusHP: .14 } });
    expect(ctx.ability("W").formula("Magic Damage per Orb")).toEqual({ base: 68, ratios: { AP: .18 } });
    expect(ctx.ability("E").formula("Magic Damage")).toEqual({ base: 130, ratios: { AP: .6 } });
    expect(ctx.ability("R").formula("Magic Damage")).toEqual({ base: 400, ratios: { AP: .6 } });
    expect(["Q", "W", "E", "R"].map((key) => [ability(key).cooldown, ability(key).cost, ability(key).castTime])).toEqual([[6, 50, .25], [9, 60, 0], [14, 60, 0], [80, 100, .25]]);
  });
  it("fails closed if the pinned game geometry is missing", () => {
    const altered = structuredClone(records("Diana"));
    delete altered.find((row) => row.kind === "Q")!.gameSources;
    expect(() => compileKit(championData("Diana"), altered, Diana)).toThrow("pinned game data");
  });
  it("extends the exact passive level series to 20 and refreshes one spell-AS buff", () => {
    const world = worldFor(1000), self = world.units[0], before = derive(self).attackSpeed;
    expect(self.statuses.find((s) => s.key === "attackSpeed")!.value).toBeCloseTo(.373529411764706);
    cast(world, "W");
    expect(derive(self).attackSpeed - before).toBeCloseTo(self.spec.base.attackSpeed.ratio * .747058823529412);
    world.tick = 30; cast(world, "Q"); through(world, 38);
    const buffs = self.statuses.filter((s) => s.memoKey === "buff:diana:spellAS");
    expect(buffs).toHaveLength(1); expect(buffs[0]!.endTick).toBe(188);
    through(world, 188); expect(derive(self).attackSpeed).toBeCloseTo(before);
  });
});

describe("Moonsilver Blade real contact and guards", () => {
  it("starts empty and adds 270+50%AP only on the third actual basic", () => {
    const world = worldFor(), self = world.units[0], ad = derive(self).ad;
    basic(world); basic(world); expect(world.units[1].totals.damageTaken).toBeCloseTo(2 * ad);
    basic(world); expect(world.units[1].totals.damageTaken).toBeCloseTo(3 * ad + 320);
    expect(self.memory["diana:blade"]).toBe(0);
  });
  it("expires both stacks exactly at five seconds", () => {
    const world = worldFor(); arm(world); world.tick = 150; basic(world);
    expect(world.units[0].memory["diana:blade"]).toBe(1);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(3 * derive(world.units[0]).ad);
  });
  it.each(["dodgeAttacks", "parry", "blockAttacks"] as const)("%s preserves a ready third strike", (guard) => {
    const world = worldFor(); arm(world); state(world, world.units[1], guard); const before = world.units[1].hp;
    basic(world); expect(world.units[1].hp).toBe(before); expect(world.units[0].memory["diana:blade"]).toBe(2);
  });
  it("blind does not advance the on-hit stack", () => {
    const world = worldFor(); attackHit(world, world.units[0], world.units[1], true, []);
    expect(world.units[0].memory["diana:blade"]).toBeUndefined();
  });
  it("a spell shield guards only the third-strike cleave and is consumed once", () => {
    const world = worldFor(); arm(world); state(world, world.units[1], "spellShield"); basic(world);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(3 * derive(world.units[0]).ad);
    expect(world.units[0].memory["diana:blade"]).toBe(0);
    expect(world.log.filter((row) => row.text.includes("spell shield blocks Moonsilver Blade"))).toHaveLength(1);
  });
  it("a pet primary is hit once and cleaves the nearby champion around that actual recipient", () => {
    const world = worldFor(300), pet = summon(world, 100); arm(world);
    const before = pet.hp, championBefore = world.units[1].hp;
    resolveAttackOnPet(world, world.units[0], pet, false, [], {});
    expect(before - pet.hp).toBeCloseTo(derive(world.units[0]).ad + 320);
    expect(championBefore - world.units[1].hp).toBeCloseTo(320);
  });
  it("only source-classified monsters get 270%, and cleave guards each nearby summon separately", () => {
    const world = worldFor(), monster = summon(world, 310, { targetClass: "monster" }), minion = summon(world, 310, { targetClass: "minion" }), guarded = summon(world, 310);
    guarded.statuses!.push({ kind: "state", key: "spellShield", source: 1, startTick: 0, endTick: 90, value: 0 });
    arm(world); basic(world);
    expect(monster.spec.hp - monster.hp).toBeCloseTo(864); expect(minion.spec.hp - minion.hp).toBeCloseTo(320); expect(guarded.hp).toBe(10000);
  });
});

describe("Crescent Strike finite projected spline physics", () => {
  it("releases after eight ticks from the actual end-of-cast position with two exact initial offsets", () => {
    const world = worldFor(900); cast(world, "Q"); through(world, 7); expect(world.missiles).toHaveLength(0);
    world.units[0].x = 100; through(world, 8);
    expect(world.missiles).toHaveLength(2); expect(world.missiles.map((m) => m.x)).toEqual([181.77568817138672, 181.77568817138672]);
    through(world, 9); expect(world.missiles[0]!.x).toBeCloseTo(193.74154100844248, 5);
  });
  it("moves by arc length rather than straight 1900-speed travel and shares one damage/mark", () => {
    const world = worldFor(900); cast(world, "Q"); through(world, 9);
    expect(world.missiles[0]!.x).toBeCloseTo(92.53754555302474); expect(world.missiles[1]!.x).toBeCloseTo(86.29607759824091);
    through(world, 21); expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 22); expect(world.units[1].totals.damageTaken).toBeCloseTo(280);
    through(world, 40); expect(world.units[1].totals.damageTaken).toBeCloseTo(280); expect(world.missiles).toHaveLength(0);
    expect(world.units[1].statuses.filter((s) => s.key === "diana:moonlight")).toHaveLength(1);
  });
  it("permits a separately guarded endpoint explosion after a spell-shielded bolt, even with an older Moonlight", () => {
    const world = worldFor(900); mark(world); state(world, world.units[1], "spellShield"); cast(world, "Q"); through(world, 22);
    expect(world.units[1].totals.damageTaken).toBe(0); through(world, 25);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(280); expect(world.units[1].statuses.find((s) => s.key === "diana:moonlight")!.startTick).toBe(25);
  });
  it("does not invent a wide endpoint explosion for a shielded target off its point hitbox", () => {
    const world = worldFor(800); state(world, world.units[1], "spellShield"); cast(world, "Q", { direction: 1, distance: 900 }); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("pierces and marks actual summons without duplicating champion damage", () => {
    const world = worldFor(900), pet = summon(world, 400); cast(world, "Q"); through(world, 40);
    expect(pet.spec.hp - pet.hp).toBeCloseTo(280); expect(pet.statuses!.some((s) => s.key === "diana:moonlight")).toBe(true);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(280);
  });
  it.each(["parry", "stasis", "untargetable"] as const)("%s prevents Q damage and Moonlight", (guard) => {
    const world = worldFor(900); state(world, world.units[1], guard); cast(world, "Q"); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("both destructible flights stop at a real wall and create no endpoint packet", () => {
    const world = worldFor(900); world.zones.push({ id: 99, owner: 1, kind: "projectileWall", x: 500, radius: 0, seenTick: 0, startTick: 0, endTick: 90 }); cast(world, "Q"); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.missiles).toHaveLength(0);
  });
  it("a wall behind a contacted hitbox clips each spline at its exact point without erasing the earlier hit", () => {
    const world = worldFor(900), pet = summon(world, 400, { radius: 5 });
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", x: 440, radius: 0, seenTick: 0, startTick: 0, endTick: 90 }); cast(world, "Q"); through(world, 8);
    const flights = [...world.missiles]; through(world, 40);
    expect(pet.spec.hp - pet.hp).toBeCloseTo(280); expect(world.units[1].totals.damageTaken).toBe(0);
    expect(flights.every((m) => m.ended && m.x === 440)).toBe(true);
  });
  it("retains released flights through caster death and standard sight does not reveal invisibility", () => {
    const world = worldFor(900); cast(world, "Q"); through(world, 9); dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(280);
    const visible = worldFor(); mark(visible); state(visible, visible.units[1], "invisible"); expect(canSee(visible.units[1], visible.units[0])).toBe(false);
  });
});

describe("Pale Cascade actual sphere contacts", () => {
  it("grants the sourced AP/bonus-health shield and holds cooldown until expiry without inventing contact", () => {
    const world = worldFor(1000, 100, 500); cast(world, "W");
    expect(shieldTotal(world.units[0])).toBeCloseTo(205); expect(world.units[0].cooldownHeld.W).toBeDefined();
    through(world, 149); expect(world.units[1].totals.damageTaken).toBe(0); expect(canCast(world, world.units[0], ability("W"))).toBe(false);
    through(world, 150); expect(world.units[0].cooldownReady.W).toBe(420); expect(shieldTotal(world.units[0])).toBe(0);
  });
  it("three independent contact packets consume one shield and add one full second shield", () => {
    const world = worldFor(265); state(world, world.units[1], "spellShield"); cast(world, "W");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(172); expect(shieldTotal(world.units[0])).toBeCloseTo(270); expect(world.units[0].cooldownReady.W).toBe(270);
    expect(world.log.filter((row) => row.text.includes("spell shield blocks Pale Cascade"))).toHaveLength(1);
  });
  it("the contact boundary is inclusive and the second shield preserves only the surviving first shield", () => {
    const world = worldFor(265.001); cast(world, "W"); dealDamage(world, world.units[1], world.units[0], 100, "true");
    expect(world.units[1].totals.damageTaken).toBe(0); world.units[1].x = 265; through(world, 0);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(258); expect(shieldTotal(world.units[0])).toBeCloseTo(170);
  });
  it("one actual pet can detonate spheres and independently guard the nearby champion", () => {
    const world = worldFor(390), pet = summon(world, 200); state(world, world.units[1], "spellShield"); cast(world, "W");
    expect(pet.spec.hp - pet.hp).toBeCloseTo(258); expect(world.units[1].totals.damageTaken).toBeCloseTo(172);
  });
  it("projectile destruction consumes all spheres as losses without reapplying shield", () => {
    const world = worldFor(250); world.zones.push({ id: 99, owner: 1, kind: "projectileWall", x: 100, radius: 0, seenTick: 0, startTick: 0, endTick: 90 }); cast(world, "W");
    expect(world.units[1].totals.damageTaken).toBe(0); expect(shieldTotal(world.units[0])).toBeCloseTo(135); expect(world.units[0].memory["diana:orbsLost"]).toBe(3);
  });
  it("caster death ends unspent spheres and starts their held cooldown", () => {
    const world = worldFor(1000); cast(world, "W"); world.tick = 10; dealDamage(world, world.units[1], world.units[0], 100000, "true");
    expect(world.units[0].memory["diana:orbs"]).toBe(0); expect(world.units[0].cooldownReady.W).toBe(280);
  });
  it("untargetable summons and hit-count props do not detonate spheres", () => {
    const world = worldFor(1000), untargetable = summon(world, 100, { untargetable: true }), prop = summon(world, 100, { hitPoints: true }); cast(world, "W"); through(world, 10);
    expect(world.units[0].memory["diana:orbs"]).toBe(3); expect(shieldTotal(world.units[0])).toBeCloseTo(135); expect(untargetable.hp).toBe(10000); expect(prop.hp).toBe(10000);
  });
});

describe("Lunar Rush real earliest-tick dash", () => {
  it.each([[300, 370], [400, 470], [400.001, 330.001], [700, 630]] as const)("distance %s reaches boundary %s on the next tick", (distance, endpoint) => {
    const world = worldFor(distance); cast(world, "E"); expect(world.units[0].action?.kind).toBe("dash"); expect(world.units[0].x).toBe(0); expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 1); expect(world.units[0].x).toBeCloseTo(endpoint); expect(world.units[1].totals.damageTaken).toBeCloseTo(190);
  });
  it("gates range, roots and grounding using actual movement rules", () => {
    const outside = worldFor(825.001); expect(canCast(outside, outside.units[0], ability("E"))).toBe(false);
    for (const cc of ["root", "ground"] as const) { const world = worldFor(); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 5 }, { scale: 1 }); expect(canCast(world, world.units[0], ability("E"))).toBe(false); }
    const edge = worldFor(825); expect(canCast(edge, edge.units[0], ability("E"))).toBe(true);
  });
  it("reads Moonlight at completion, consumes it globally, and resets to static eight ticks despite haste", () => {
    const world = worldFor(700), pet = summon(world, 800); world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100, abilityHaste: 100 } }; cast(world, "E"); mark(world); pet.statuses!.push({ kind: "mark", key: "diana:moonlight", source: 0, startTick: 0, endTick: 90, value: 0 }); through(world, 1);
    expect(world.units[0].cooldownReady.E).toBe(9); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false); expect(pet.statuses!.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("spell shielding consumes Moonlight without reset", () => {
    const world = worldFor(700); mark(world); state(world, world.units[1], "spellShield"); cast(world, "E"); through(world, 1);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].cooldownReady.E).toBe(420); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("still damages ending untargetability but respects stasis", () => {
    for (const guard of ["untargetable", "stasis"] as const) { const world = worldFor(700); mark(world); cast(world, "E"); state(world, world.units[1], guard); through(world, 1); expect(world.units[1].totals.damageTaken).toBeCloseTo(guard === "untargetable" ? 190 : 0); expect(world.units[0].cooldownReady.E).toBe(guard === "untargetable" ? 9 : 420); }
  });
  it("knockdown interrupts travel, consumes all present Moonlight and does not grant damage or reset", () => {
    const world = worldFor(700); mark(world); cast(world, "E"); applyEffect(world, world.units[1], world.units[0], { type: "knockdown" }, { scale: 1 }); through(world, 1);
    expect(world.units[0].x).toBe(0); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].cooldownReady.E).toBe(420); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("a real anti-dash aura intercepts the shared dash before its contact packet", () => {
    const world = worldFor(700); mark(world); applyEffect(world, world.units[1], world.units[1], { type: "state", state: "antiDash", value: 400, duration: 5, effects: [{ type: "damage", damageType: "magic", amount: { base: 1 } }] }, { scale: 1 }); cast(world, "E"); through(world, 1);
    expect(world.units[0].x).toBeCloseTo(235); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "diana:moonlight")).toBe(false);
  });
  it("a marked target death during dash still resets, including a removed real pet", () => {
    const world = worldFor(1000), pet = summon(world, 700); pet.statuses!.push({ kind: "mark", key: "diana:moonlight", source: 0, startTick: 0, endTick: 90, value: 0 }); cast(world, "E", { direction: 1, distance: 700 }); damagePet(world, world.units[0], pet, 100000, "true", false); through(world, 1);
    expect(world.units[0].cooldownReady.E).toBe(9); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].x).toBeCloseTo(630);
  });
  it("accepts a real Q cast during travel and resumes its full cast time after arrival", () => {
    const world = worldFor(700); cast(world, "E"); expect(canCast(world, world.units[0], ability("Q"))).toBe(true); cast(world, "Q"); through(world, 1);
    expect(world.units[0].action?.kind).toBe("cast"); through(world, 8); expect(world.missiles).toHaveLength(2);
  });
  it("chooses an actual aimed pet and uses its separate pathing radius for the boundary", () => {
    const world = worldFor(700), pet = summon(world, 300, { radius: 65, pathingRadius: 20 }); cast(world, "E", { direction: 1, distance: 300 }); through(world, 1);
    expect(world.units[0].x).toBeCloseTo(355); expect(pet.spec.hp - pet.hp).toBeCloseTo(190); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("consumes only Diana's currently present Moonlight, preserving another source's mark", () => {
    const world = worldFor(700); mark(world); world.units[1].statuses.push({ kind: "mark", key: "diana:moonlight", source: 1, startTick: 0, endTick: 90, value: 0 }); cast(world, "E"); through(world, 1);
    expect(world.units[1].statuses.filter((s) => s.key === "diana:moonlight").map((s) => s.source)).toEqual([1]);
  });
});

describe("Moonfall guarded control, actual clone count and following beam", () => {
  it("pulls at most225 over15ticks, slows for60ticks, and lands one beam30ticks after cast completion", () => {
    const world = worldFor(450); cast(world, "R"); through(world, 7); expect(world.units[1].forced).toBeUndefined(); through(world, 8);
    expect(world.units[1].forced?.perTick).toBeCloseTo(-15); expect(world.units[1].statuses.find((s) => s.key === "slow")!.value).toBe(.6); expect(world.units[1].statuses.find((s) => s.key === "slow")!.endTick).toBe(68);
    through(world, 22); expect(world.units[1].x).toBeCloseTo(225); through(world, 37); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 38); expect(world.units[1].totals.damageTaken).toBeCloseTo(460);
  });
  it("initial spell shield prevents beam arming; a later shield independently blocks its beam", () => {
    const blocked = worldFor(); state(blocked, blocked.units[1], "spellShield"); cast(blocked, "R"); through(blocked, 8); expect(blocked.zones).toHaveLength(0);
    const later = worldFor(); cast(later, "R"); through(later, 8); state(later, later.units[1], "spellShield"); through(later, 38); expect(later.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["ccImmune", "displacementImmune"] as const)("%s still counts the accepted champion and arms beam", (guard) => {
    const world = worldFor(); state(world, world.units[1], guard); cast(world, "R"); through(world, 8); expect(world.units[0].memory["diana:rCount"]).toBe(1); through(world, 38); expect(world.units[1].totals.damageTaken).toBeCloseTo(460);
  });
  it("uses real champion-class clone bodies for uncapped amplification and independently damages other summons", () => {
    const world = worldFor(300), clones = Array.from({ length: 5 }, () => summon(world, 310, { targetClass: "champion" })), ordinary = summon(world, 320, { targetClass: "minion" }); cast(world, "R"); through(world, 8);
    expect(world.units[0].memory["diana:rCount"]).toBe(6); through(world, 38);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(960); expect(clones[0]!.spec.hp - clones[0]!.hp).toBeCloseTo(960); expect(ordinary.spec.hp - ordinary.hp).toBeCloseTo(960);
  });
  it("a shielded clone does not amplify the initial count; pets alone do not conjure a beam", () => {
    const world = worldFor(1000), pet = summon(world, 200, { targetClass: "champion" }); pet.statuses!.push({ kind: "state", key: "spellShield", source: 1, startTick: 0, endTick: 90, value: 0 }); cast(world, "R"); through(world, 8); expect(world.zones).toHaveLength(0);
    const ordinary = worldFor(1000); summon(ordinary, 200, { targetClass: "minion" }); cast(ordinary, "R"); through(ordinary, 8); expect(ordinary.zones).toHaveLength(0);
  });
  it("explicit clone classification alone counts as a champion, while a misleading name does not", () => {
    const world = worldFor(1000); summon(world, 200, { unitClass: "clone" }); summon(world, 210, { name: "Clone-looking minion", targetClass: "minion" }); cast(world, "R"); through(world, 8);
    expect(world.units[0].memory["diana:rCount"]).toBe(1); expect(world.zones.some((zone) => zone.ability === "Rbeam")).toBe(true);
  });
  it("the delayed beam follows Diana's current location and persists through her death", () => {
    const moved = worldFor(); cast(moved, "R"); through(moved, 8); moved.units[0].x = 1000; through(moved, 38); expect(moved.units[1].totals.damageTaken).toBe(0);
    const dead = worldFor(); cast(dead, "R"); through(dead, 8); dealDamage(dead, dead.units[1], dead.units[0], 100000, "true"); through(dead, 38); expect(dead.units[1].totals.damageTaken).toBeCloseTo(460);
  });
});

describe("Diana ordinary budgeted duel", () => {
  it("keeps default completed-trade restraint and provides finite source-backed budget hints", () => {
    const world = worldFor(); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(compiled.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    const damage = compiled.spec.budget!.damage!(world.units[0], world.units[1]); expect(damage.magic).toBeGreaterThan(0); expect(Object.values(damage).every(Number.isFinite)).toBe(true);
    const packet = ability("Ehit").onHit![0]!;
    expect(evaluate(packet.type === "damage" ? packet.amount : { base: 0 }, world.units[0])).toBeCloseTo(190);
  });
  it("uses QWER in ordinary 15000-gold scenarios and reflects matchup scores and builds", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices, opponent = kit("Darius").spec;
    const forward = simulateMatchup(compiled.spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled.spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) { const other = reverse.scenarios[reflected[index]!]!; if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12); expect(scenario.outcomes.every((outcome) => Number.isFinite(outcome.seconds) && outcome.hp.every(Number.isFinite))).toBe(true); }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(ability(key).name))).toBe(true);
  }, 60000);
});


describe("Diana co-located target direction", () => {
 it.each([0, 1] as const)("E retains the reflected direction for side %s at exact overlap", side => {
  const enemy = fighter({ base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } });
  const world = createWorld({ fighters: side === 0 ? [compiled.spec, enemy] : [enemy, compiled.spec], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = 0;
  startCast(world, world.units[side], ability("E")); through(world, 1);
  const boundary = world.units[side].spec.base.pathingRadius + world.units[1 - side]!.spec.base.pathingRadius;
  expect(world.units[side].x).toBe(side === 0 ? boundary : -boundary);
  expect(world.units[1 - side]!.totals.damageTaken).toBeGreaterThan(0);
 });
 it.each([0, 1] as const)("Q's independent flights use the reflected direction for side %s at overlap", side => {
  const enemy = fighter({ base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0 } });
  const world = createWorld({ fighters: side === 0 ? [compiled.spec, enemy] : [enemy, compiled.spec], distance: 0, modes: ["idle", "idle"] });
  world.units[0].x = 0; world.units[1].x = 0;
  startCast(world, world.units[side], ability("Q")); through(world, 8);
  expect(world.missiles.filter(m => m.owner === side && m.source === "Qbolt").every(m => m.direction === (side === 0 ? 1 : -1))).toBe(true);
  expect(world.missiles.filter(m => m.owner === side && m.source === "Qbolt")).toHaveLength(2);
 });
});
