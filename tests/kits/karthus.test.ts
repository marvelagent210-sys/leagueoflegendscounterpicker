import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { damagePerSecond, effectiveHealth, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, canStartAttack, costOf, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { applyEffect, beginResurrection, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { damagePet, petEffects, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Karthus from "../../kits/champions/Karthus";
import { ability as syntheticAbility, fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Karthus"), records("Karthus"), Karthus, {}, pets("Karthus"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}) => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const worldFor = (distance = 0, bonus: FighterSpec["bonus"] = {}, enemy = dummy()) => {
  const world = createWorld({ fighters: [subject(bonus), enemy], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, reactionTime: 10, maxBranches: 1 } });
  // The assertions below use center distances; createWorld accepts edge distances.
  world.units[0].x = 0; world.units[1].x = distance;
  world.units[0].memory.wallPreviousEnemyX = distance;
  return world;
};
const ability = (world: World, key: string, side: 0 | 1 = 0) => world.units[side].spec.abilities.find((value) => value.key === key)!;
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
function cast(world: World, key: string, distance?: number): void { startCast(world, world.units[0], ability(world, key), distance === undefined ? undefined : { direction: 1, distance }); }
function finish(world: World, key: string, distance?: number): void { cast(world, key, distance); const action = world.units[0].action; if (action?.kind === "cast") advance(world, action.endTick); }
const state = (world: World, side: 0 | 1, state: StateType, duration = 30) => applyEffect(world, world.units[side], world.units[side], { type: "state", state, duration }, { scale: 1 });
const die = (world: World) => dealDamage(world, world.units[1], world.units[0], 1000000, "true", {});
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Test pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: Infinity, ...changes });
const slow = (world: World) => world.units[1].statuses.filter((status) => status.kind === "cc" && status.key === "slow" && status.ability === "W").at(-1);

describe("Karthus source contract", () => {
  it("retains all five pinned revisions and explicit delay/geometry/lifecycle assumptions", () => {
    const value = compiled();
    expect(new Set(value.evidence.map((entry) => entry.revid))).toEqual(new Set([3985387, 4011136, 3990033, 4006733, 4015394]));
    expect(value.spec.abilities.map((spell) => spell.key)).toEqual(["Q", "W", "E", "R"]);
    expect(value.assumptions.join(" ")).toContain("0.528–0.759");
    expect(value.assumptions.join(" ")).toContain("zero-thickness");
    expect(value.assumptions.join(" ")).toContain("strictly before four seconds");
    expect(value.assumptions.join(" ")).toContain("ten-second opening resource window");
    expect(value.variants).toEqual([]);
  });

  it("uses the sourced max-rank values, literal global range, and finite ability clocks", () => {
    const world = worldFor(0, { ap: 100 });
    expect(ability(world, "Q")).toMatchObject({ cooldown: 1, cost: 40, castTime: .25, delivery: { kind: "circle", range: 875, radius: 160, delay: .528 }, persistsAfterDeath: true });
    expect(ability(world, "W")).toMatchObject({ cooldown: 15, cost: 70, castTime: .25 });
    expect(ability(world, "E")).toMatchObject({ activation: "toggle", cooldown: .5, staticCooldown: true, castTime: 0 });
    expect(ability(world, "R")).toMatchObject({ cooldown: 160, cooldownAtCastStart: true, cost: 100, castTime: .25, delivery: { kind: "self" }, channel: { duration: 3, interruptible: true } });
    const hit = ability(world, "R").channel!.onComplete![0]!;
    expect(hit.type === "damage" && evaluate(hit.amount, ...world.units)).toBe(570);
    for (const spell of world.units[0].spec.abilities) expect(Number.isFinite(spell.cooldown)).toBe(true);
  });
});

describe("Lay Waste detonation and isolation", () => {
  it("lands at cast completion plus the declared lower delay bound and reads AP then", () => {
    const world = worldFor(200, { ap: 100 });
    finish(world, "Q");
    const zone = world.zones.find((zone) => zone.ability === "Q")!;
    expect(zone.endTick).toBe(24);
    advance(world, 23);
    expect(world.units[1].hp).toBe(100000);
    world.units[0].spec.bonus = { ap: 200 };
    advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(372, 10);
  });

  it("halves champion and pet damage when a health-based pet also overlaps the blast", () => {
    const world = worldFor(100, { ap: 100 });
    const pet = spawnPet(world, world.units[1], petSpec(), 100);
    finish(world, "Q"); advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(151, 10);
    expect(10000 - pet.hp).toBeCloseTo(151, 10);
  });

  it("uses each health pet's area mitigation and target hitbox when counting isolation", () => {
    const world = worldFor(100);
    const inside = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 295);
    const outside = spawnPet(world, world.units[1], petSpec(), 295.001);
    finish(world, "Q"); advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(116, 10);
    expect(10000 - inside.hp).toBeCloseTo(46.4, 10);
    expect(outside.hp).toBe(10000);
  });

  it("does not count untargetable or hit-point pets under the declared policy", () => {
    const world = worldFor(100);
    const hidden = spawnPet(world, world.units[1], petSpec({ untargetable: true }), 100);
    const hp = spawnPet(world, world.units[1], petSpec({ hitPoints: true }), 100);
    finish(world, "Q"); advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(232, 10);
    expect(hidden.hp).toBe(10000); expect(hp.hp).toBe(10000);
  });

  it.each(["spellShield", "parry", "invulnerable"] as const)("a %s champion still prevents the overlapping pet from being isolated", (defense) => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec(), 100);
    state(world, 1, defense);
    finish(world, "Q"); advance(world, 24);
    expect(world.units[1].hp).toBe(100000);
    expect(10000 - pet.hp).toBeCloseTo(116, 10);
  });

  it("an untargetable champion does not prevent an eligible pet from being isolated", () => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec(), 100);
    state(world, 1, "untargetable");
    finish(world, "Q"); advance(world, 24);
    expect(world.units[1].hp).toBe(100000);
    expect(10000 - pet.hp).toBeCloseTo(232, 10);
  });

  it("classifies a sole pet hit as spell damage, preserving its isolated damage through AoE-only resistance", () => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 100);
    state(world, 1, "untargetable");
    finish(world, "Q"); advance(world, 24);
    expect(10000 - pet.hp).toBeCloseTo(232, 10);
  });

  it.each(["untargetable", "stasis"] as const)("excludes a dynamically %s pet from both the isolation count and the actual hit", (state) => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec(), 100);
    petEffects(world, world.units[1], pet, [{ type: "state", state, duration: 10 }]);
    finish(world, "Q"); advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(232, 10);
    expect(pet.hp).toBe(10000);
  });

  it("mixes the lone pet's isolated and area damage when the champion hit is resolved by expected value", () => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 100);
    finish(world, "Q");
    const zone = world.zones.find((entry) => entry.ability === "Q")!;
    zone.connects = true; zone.scale = .25;
    advance(world, 24);
    expect(100000 - world.units[1].hp).toBeCloseTo(116 * .25, 10);
    expect(10000 - pet.hp).toBeCloseTo(116 * .4 * .25 + 232 * .75, 10);
  });

  it("preserves the same expected mixture for pets with category-specific fixed damage", () => {
    const world = worldFor(100);
    const pet = spawnPet(world, world.units[1], petSpec({ hp: 2, fixedDamage: { area: .5, singleTarget: 1 } }), 100);
    finish(world, "Q");
    const zone = world.zones.find((entry) => entry.ability === "Q")!;
    zone.connects = true; zone.scale = .25;
    advance(world, 24);
    expect(pet.hp).toBeCloseTo(2 - (.5 * .25 + .75), 10);
  });

  it("keeps its location after declaration completes and misses an enemy that leaves the blast", () => {
    const world = worldFor(100);
    finish(world, "Q"); world.units[1].x = 326;
    advance(world, 24);
    expect(world.units[1].hp).toBe(100000);
  });

  it("continues an already-created blast through Death Defied and through mandatory final death", () => {
    const world = worldFor(100);
    die(world); world.tick = 200;
    finish(world, "Q");
    expect(world.zones.some((zone) => zone.ability === "Q")).toBe(true);
    advance(world, 224);
    expect(100000 - world.units[1].hp).toBeGreaterThanOrEqual(232);
    expect(world.units[0].alive).toBe(false);
  });
});

describe("Wall of Pain contact and independent debuffs", () => {
  it("applies 25% MR reduction and an 80% slow once, then decays toward 40%", () => {
    const world = worldFor(300);
    world.units[1].spec.base.mr = 100;
    finish(world, "W");
    expect(slow(world)?.value).toBeCloseTo(.8);
    expect(derive(world.units[1]).mrReduction.percent).toEqual([.25]);
    const end = slow(world)!.endTick;
    advance(world, 83);
    expect(slow(world)?.value).toBeCloseTo(.6, 10);
    world.units[1].x += 100; advance(world, 100); world.units[1].x -= 100; advance(world, 101);
    expect(slow(world)?.endTick).toBe(end);
    advance(world, 158);
    expect(slow(world)).toBeUndefined();
    expect(derive(world.units[1]).mrReduction.percent).toEqual([]);
  });

  it("gives full debuff duration to a late contact, after the wall itself expires", () => {
    const world = worldFor(500);
    finish(world, "W", 250);
    advance(world, 150);
    world.units[1].x = 250;
    advance(world, 151);
    expect(slow(world)).toMatchObject({ startTick: 151, endTick: 301 });
    advance(world, 160);
    expect(slow(world)).toBeDefined();
  });

  it("catches a movement segment that crosses the zero-thickness wall between ticks", () => {
    const world = worldFor(500);
    finish(world, "W", 250);
    world.units[1].x = 100;
    advance(world, 9);
    expect(slow(world)).toBeDefined();
  });

  it.each(["slowImmune", "ccImmune"] as const)("%s blocks only the slow while MR reduction still applies", (defense) => {
    const world = worldFor(300);
    state(world, 1, defense); finish(world, "W");
    expect(slow(world)).toBeUndefined();
    expect(derive(world.units[1]).mrReduction.percent).toEqual([.25]);
  });

  it("does not consume a spell shield and grants each new wall an independent contact", () => {
    const world = worldFor(300);
    state(world, 1, "spellShield"); finish(world, "W");
    expect(hasState(world.units[1], "spellShield")).toBe(true);
    expect(slow(world)).toBeDefined();
    advance(world, 100);
    world.units[0].cooldownReady.W = 0;
    finish(world, "W");
    expect(slow(world)!.startTick).toBe(109);
  });

  it("locks the wall center at declaration and does not consume it on untargetable contact", () => {
    const world = worldFor(300);
    cast(world, "W"); world.units[1].x = 500;
    advance(world, 9);
    expect(world.zones.find((zone) => zone.kind === "trap")?.x).toBe(300);
    state(world, 1, "untargetable", 1);
    world.units[1].x = 300; advance(world, 20);
    expect(slow(world)).toBeUndefined();
    expect(world.zones.some((zone) => zone.kind === "trap")).toBe(true);
    advance(world, 40);
    expect(slow(world)).toBeDefined();
  });

  it("keeps each pet's late contact independent of the champion and never refreshes the same cast", () => {
    const world = worldFor(300);
    const pet = spawnPet(world, world.units[1], petSpec({ mr: 100 }), 600);
    finish(world, "W");
    expect(slow(world)).toBeDefined();
    expect(pet.statuses).toEqual([]);
    pet.x = 300; advance(world, 9);
    const petSlow = () => pet.statuses!.find((status) => status.kind === "cc" && status.key === "slow" && status.ability === "W");
    expect(petSlow()).toMatchObject({ startTick: 9, endTick: 159, value: .8 });
    expect(derive(petFormulaTarget(pet, world.units[0])).mrReduction.percent).toEqual([.25]);
    pet.x = 600; advance(world, 10); pet.x = 300; advance(world, 11);
    expect(petSlow()?.startTick).toBe(9);
    advance(world, 84);
    expect(petSlow()?.value).toBeCloseTo(.6, 10);
  });

  it("applies a pet's wall MR reduction before percentage and flat penetration on the next Q", () => {
    const world = worldFor(300, { magicPen: 10 });
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "magicPenPercent", amount: { base: .2 }, duration: 30 }, { scale: 1 });
    const pet = spawnPet(world, world.units[1], petSpec({ mr: 100 }), 300);
    finish(world, "W"); finish(world, "Q"); advance(world, 33);
    // 100 MR * (1 - .25 wall) * (1 - .2 penetration) - 10 = 50 MR.
    expect(10000 - pet.hp).toBeCloseTo(116 * 100 / 150, 10);
  });
});

describe("Defile's independent toggle, clock, mana and kills", () => {
  it("starts off, pulses immediately, then at cumulative 0.25-second boundaries with dynamic AP", () => {
    const world = worldFor(100, { ap: 100 });
    advance(world, 0);
    expect(world.units[1].hp).toBe(100000);
    cast(world, "E");
    expect(100000 - world.units[1].hp).toBeCloseTo(32.5, 10);
    advance(world, 9);
    expect(100000 - world.units[1].hp).toBeCloseTo(65, 10);
    world.units[0].spec.bonus = { ap: 200 };
    advance(world, 16);
    expect(100000 - world.units[1].hp).toBeCloseTo(102.5, 10);
    const pulseTicks = world.log.filter((entry) => entry.text.startsWith("Defile deals")).map((entry) => entry.tick);
    expect(pulseTicks).toEqual([1, 9, 16]);
  });

  it("drains exactly 78 mana per second independently of Q and its cast", () => {
    const world = worldFor(100);
    const mana = world.units[0].resource;
    cast(world, "E"); cast(world, "Q"); advance(world, 29);
    expect(mana - world.units[0].resource).toBeCloseTo(78 + 40, 10);
    expect(world.units[1].hp).toBeLessThan(100000 - 232);
  });

  it("does not spend a pending Q's reserved mana, and emits the final packet when unaffordable", () => {
    const world = worldFor(100);
    world.units[0].resource = 40;
    cast(world, "E"); cast(world, "Q");
    advance(world, 0);
    expect(world.units[0].memory.defileOn).toBe(false);
    expect(100000 - world.units[1].hp).toBeCloseTo(55, 10);
    advance(world, 8);
    expect(world.units[0].resource).toBe(0);
  });

  it("uses a static 0.5-second lockout under haste and adds a final manual-off packet", () => {
    const world = worldFor(100, { abilityHaste: 100 });
    cast(world, "E");
    expect(world.units[0].cooldownReady.E).toBe(15);
    expect(canCast(world, world.units[0], ability(world, "E"))).toBe(false);
    advance(world, 15);
    const hp = world.units[1].hp;
    expect(canCast(world, world.units[0], ability(world, "E"))).toBe(true);
    cast(world, "E");
    expect(hp - world.units[1].hp).toBeCloseTo(27.5, 10);
    advance(world, 29);
    expect(world.units[0].memory.defileOn).toBe(false);
  });

  it("checks radius on every packet and continues through Requiem's channel", () => {
    const world = worldFor(100);
    cast(world, "E"); finish(world, "R");
    world.units[1].x = 616; advance(world, 15);
    const hp = world.units[1].hp;
    advance(world, 22); expect(world.units[1].hp).toBe(hp);
    world.units[1].x = 615; advance(world, 23);
    expect(hp - world.units[1].hp).toBeCloseTo(27.5, 10);
    expect(world.units[0].action?.kind).toBe("channel");
  });

  it("restores 50 mana once for a genuine enemy pet kill, never an expiry or own destruction", () => {
    const world = worldFor(100);
    world.units[0].resource = 0;
    const enemy = spawnPet(world, world.units[1], petSpec({ hp: 10 }), 100);
    damagePet(world, world.units[0], enemy, 20, "true", false);
    expect(world.units[0].resource).toBe(50);
    damagePet(world, world.units[0], enemy, 20, "true", false);
    expect(world.units[0].resource).toBe(50);
    spawnPet(world, world.units[1], petSpec({ duration: .01 }), 100);
    advance(world, 1);
    expect(world.units[0].resource).toBe(50);
    const own = spawnPet(world, world.units[0], petSpec({ hp: 10 }), 0);
    damagePet(world, world.units[0], own, 20, "true", false);
    expect(world.units[0].resource).toBe(50);
  });

  it("restores on an opponent's initial post-death transition once, rather than its mandatory final death", () => {
    const enemy = subject(); enemy.id = "other-karthus";
    const world = worldFor(5000, {}, enemy);
    world.units[0].resource = 0;
    dealDamage(world, world.units[0], world.units[1], 100000, "true", {});
    expect(world.units[0].resource).toBe(50);
    advance(world, 210);
    expect(world.units[0].resource).toBe(50);
  });

  it("switches Defile off without a final packet or drain on entering resurrection", () => {
    const world = worldFor(100);
    cast(world, "E");
    const hp = world.units[1].hp; const mana = world.units[0].resource;
    beginResurrection(world, world.units[0], { duration: 6 });
    advance(world, 30);
    expect(world.units[0].memory.defileOn).toBe(false);
    expect(world.units[1].hp).toBe(hp);
    expect(world.units[0].resource).toBe(mana);
  });
});

describe("Requiem's normal channel and targetability", () => {
  it("starts its 160-second cooldown at declaration and deals 500 + 70% AP only after 0.25 + 3 seconds", () => {
    const world = worldFor(5000, { ap: 100 });
    cast(world, "R");
    expect(world.units[0].cooldownReady.R).toBe(4800);
    advance(world, 97); expect(world.units[1].hp).toBe(100000);
    advance(world, 98); expect(100000 - world.units[1].hp).toBeCloseTo(570, 10);
    expect(world.units[0].resource).toBeCloseTo(world.units[0].spec.base.resource - 100);
  });

  it.each(["stun", "silence", "airborne", "suppression", "sleep", "fear"] as const)("%s interrupts the active channel without damage or refund", (cc) => {
    const world = worldFor(5000);
    finish(world, "R");
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 });
    advance(world, 100);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[0].cooldownReady.R).toBe(4800);
    expect(world.units[0].resource).toBeCloseTo(world.units[0].spec.base.resource - 100);
  });

  it.each(["root", "ground", "slow"] as const)("%s leaves the normal stationary channel intact", (cc) => {
    const world = worldFor(5000);
    finish(world, "R");
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 5, strength: .5 }, { scale: 1 });
    advance(world, 98);
    expect(100000 - world.units[1].hp).toBeCloseTo(500, 10);
  });

  it("can begin while the enemy is untargetable and hits only if targetable at completion", () => {
    const world = worldFor(5000);
    state(world, 1, "untargetable", 1);
    expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true);
    finish(world, "R"); advance(world, 98);
    expect(100000 - world.units[1].hp).toBeCloseTo(500, 10);
    const other = worldFor(5000); finish(other, "R"); state(other, 1, "untargetable"); advance(other, 98);
    expect(other.units[1].hp).toBe(100000);
  });

  it("hits an invisible enemy globally without unit targeting or projectile travel", () => {
    const world = worldFor(5000); state(world, 1, "invisible");
    finish(world, "R"); advance(world, 98);
    expect(100000 - world.units[1].hp).toBeCloseTo(500, 10);
  });

  it.each(["spellShield", "parry", "stasis"] as const)("respects %s at completion", (defense) => {
    const world = worldFor(5000);
    finish(world, "R"); state(world, 1, defense); advance(world, 98);
    expect(world.units[1].hp).toBe(100000);
  });

  it("ignores projectile walls and never damages ordinary summons", () => {
    const world = worldFor(5000);
    const pet = spawnPet(world, world.units[1], petSpec(), 5000);
    applyEffect(world, world.units[1], world.units[1], { type: "projectileWall", distance: 30, duration: 10 }, { scale: 1 });
    finish(world, "R"); advance(world, 98);
    expect(100000 - world.units[1].hp).toBeCloseTo(500, 10);
    expect(pet.hp).toBe(10000);
  });

  it("telegraphs its complete damage and cast-plus-channel ETA before the channel begins", () => {
    const world = worldFor(5000);
    world.settings.reactionTime = 0;
    cast(world, "R");
    expect(perceive(world, 1).threats.find((threat) => threat.source === "R" && threat.damage > 0)).toMatchObject({ eta: 98, damage: 500, projectile: false });
  });
});

describe("Death Defied's seven-second lifecycle", () => {
  it("records the initial death, sets one HP and prevents attacks, movement, damage and crowd control", () => {
    const world = worldFor(100);
    cast(world, "R"); die(world);
    const self = world.units[0];
    expect(self.hp).toBe(1); expect(self.fallen).toBe(true); expect(self.alive).toBe(true);
    expect(self.deathDefied).toMatchObject({ endTick: 210 });
    expect(self.action).toBeUndefined(); expect(canStartAttack(world, self)).toBe(false);
    for (const value of ["untargetable", "invulnerable", "ccImmune", "noMovement", "noAttacks"] as const) expect(hasState(self, value)).toBe(true);
    dealDamage(world, world.units[1], self, 100, "true", { persistent: true });
    applyEffect(world, world.units[1], self, { type: "cc", cc: "stun", duration: 10 }, { scale: 1 });
    expect(self.hp).toBe(1); expect(self.statuses.some((status) => status.kind === "cc")).toBe(false);
    advance(world, 209); expect(self.alive).toBe(true);
    advance(world, 210); expect(self.alive).toBe(false);
    expect(world.result?.winner).toBe(1);
  });

  it("forces Defile on without mana and permits free Q/W/R while forbidding E-off", () => {
    const world = worldFor(100);
    world.units[0].resource = 0;
    die(world);
    expect(world.units[0].memory.defileOn).toBe(true);
    expect(canCast(world, world.units[0], ability(world, "E"))).toBe(false);
    for (const key of ["Q", "W", "R"]) expect(costOf(world.units[0], ability(world, key))).toBe(0);
    finish(world, "Q"); finish(world, "W"); finish(world, "R");
    expect(world.units[0].resource).toBe(0);
    advance(world, 120);
    expect(world.units[0].memory.defileOn).toBe(true);
    expect(world.units[0].resource).toBe(0);
  });

  it("disables R at four seconds, and final death prevents a late declared channel from completing", () => {
    const world = worldFor(5000);
    die(world); world.tick = 119;
    expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true);
    cast(world, "R"); advance(world, 210);
    expect(world.units[1].hp).toBe(100000);
    const other = worldFor(5000); die(other); other.tick = 120;
    expect(canCast(other, other.units[0], ability(other, "R"))).toBe(false);
  });

  it("retains existing homing missiles but denies fresh enemy unit-targeted casts", () => {
    const hostile = fighter({ abilities: [syntheticAbility({ key: "Q", delivery: { kind: "target", range: 2000, missileSpeed: 100 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] })] });
    const world = worldFor(500, {}, hostile);
    startCast(world, world.units[1], ability(world, "Q", 1));
    expect(world.missiles).toHaveLength(1);
    const id = world.missiles[0]!.id;
    die(world);
    expect(world.missiles.some((missile) => missile.id === id)).toBe(true);
    world.units[1].cooldownReady.Q = 0;
    expect(canCast(world, world.units[1], ability(world, "Q", 1))).toBe(false);
    world.tick = 1; advanceMissiles(world);
    expect(world.missiles.some((missile) => missile.id === id)).toBe(true);
    expect(world.units[0].hp).toBe(1);
  });

  it("allows regeneration but still dies exactly at expiry even with extra HP and protection", () => {
    const world = worldFor(5000);
    world.units[0].spec.base.hpRegen = 50;
    die(world); advance(world, 29);
    expect(world.units[0].hp).toBeGreaterThan(1);
    state(world, 0, "minimumHealth");
    world.units[0].hp = 1000;
    advance(world, 210);
    expect(world.units[0].alive).toBe(false);
  });

  it("a post-death kill produces a draw and copied branches keep independent clocks and aura state", () => {
    const world = worldFor(100);
    die(world);
    const copied = cloneWorld(world);
    world.units[1].hp = 1;
    advance(world, 8);
    expect(world.result?.winner).toBe("draw");
    expect(copied.units[1].hp).toBe(100000 - 27.5);
    expect(copied.units[0].deathDefied).not.toBe(world.units[0].deathDefied);
    copied.units[0].memory.defilePulses = 100;
    expect(world.units[0].memory.defilePulses).not.toBe(100);
  });
});

describe("Karthus behavior, allocation and mirrored matchups", () => {
  it("uses all four spells in an ordinary unscripted duel", () => {
    const world = createWorld({ fighters: [subject({ ap: 100 }), fighter({ id: "opponent", base: { hp: 30000, ad: 50 } })], distance: 400, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 15, maxBranches: 1, reactionTime: 10 } });
    runWorld(world);
    for (const spell of world.units[0].spec.abilities) expect(world.log.some((entry) => entry.side === 0 && entry.text === `casts ${spell.name}`), spell.key).toBe(true);
    expect(world.units[0].resource).toBeGreaterThanOrEqual(0);
  });

  it.each(["hold", "trade", "flee"] as const)("does not select offensive Requiem in %s mode", (mode) => {
    const world = worldFor(5000); world.modes[0] = mode;
    for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = Infinity;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).not.toMatchObject({ kind: "cast", ability: "R" });
  });

  it("respects the completed trade and lets the ordinary trade clock expire", () => {
    const world = worldFor(100); world.modes[0] = "trade";
    world.units[0].memory.tradeDone = true;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    delete world.units[0].memory.tradeDone;
    world.units[0].memory.tradeStart = 0; world.tick = world.settings.tradeSeconds * 30 + 1;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    expect(world.units[0].memory.tradeDone).toBe(true);
  });

  it("prioritizes R early during a fighting zombie window, rather than waiting for a guaranteed execute", () => {
    const world = worldFor(100); world.modes[0] = "fight";
    die(world);
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "R" });
  });

  it("does not begin the living channel in range of a ready interrupt", () => {
    const enemy = fighter({ abilities: [syntheticAbility({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] })] });
    const world = worldFor(500, {}, enemy); world.modes[0] = "fight";
    for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = Infinity;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).not.toMatchObject({ kind: "cast", ability: "R" });
  });

  it("keeps allocator damage finite, mana-limits the aura, and adds no fake survival health for Death Defied", () => {
    const spec = subject({ ap: 100 });
    const raw = damagePerSecond(spec, dummy());
    expect(raw.magic).toBeGreaterThan(0);
    expect(raw.magic).toBeLessThan(302 / 1.25 + 130 + 570 / 163.25);
    expect(Number.isFinite(raw.magic)).toBe(true);
    expect(effectiveHealth(spec, dummy())).toBeCloseTo(effectiveHealth({ ...spec, hooks: undefined }, dummy()), 10);
  });

  it("preserves both 15,000-gold builds and each of the six scenarios under Darius reflection", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const spec = compiled().spec; const darius = kit("Darius").spec;
    const forward = simulateMatchup(spec, darius, 15000, prices);
    const reverse = simulateMatchup(darius, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
    }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
