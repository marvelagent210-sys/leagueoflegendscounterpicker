import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, advanceZones, canCast, chargesLeft, completeCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { advancePets, damagePet, destroyPet, petEffects, petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Zyra from "../../kits/champions/Zyra";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compile = (options: Record<string, number> = {}) => compileKit(championData("Zyra"), records("Zyra"), Zyra, options, pets("Zyra"), runes());
const compiled = compile();
const ability = (w: World, key: string) => w.units[0].spec.abilities.find((spell) => spell.key === key)!;
const dummy = () => fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
function world(options: Record<string, number> = {}, ap = 0, distance = 300): World {
  const spec = compile(options).spec;
  return createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } }, dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 80 } });
}
const cast = (w: World, key: string, distance?: number) => completeCast(w, w.units[0], ability(w, key), w.tick, distance === undefined ? undefined : { direction: 1, distance });
const ownSeeds = (w: World) => w.pets.filter((pet) => pet.owner === 0 && pet.spec.kind === "zyra-seed");
const ownPlants = (w: World) => w.pets.filter((pet) => pet.owner === 0 && pet.spec.kind !== "zyra-seed");
const enemyPet = (w: World, x: number) => spawnPet(w, w.units[1], { kind: "enemy", name: "Enemy pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 30 }, x);
function through(w: World, tick: number): void { while (w.tick <= tick && !w.result) step(w, [standStill, standStill]); }
function grow(w: World, kind: "Q" | "E" = "Q", x = w.units[1].x): Pet {
  const prior = new Set(ownPlants(w).map((pet) => pet.id));
  cast(w, "W", Math.abs(x - w.units[0].x));
  if (kind === "Q") { cast(w, "Q", Math.abs(x - w.units[0].x)); w.tick += 19; advanceZones(w); }
  else { cast(w, "E"); for (let index = 0; index < 40 && !ownPlants(w).some((pet) => !prior.has(pet.id)); index++) { advanceMissiles(w); w.tick++; } }
  const plant = ownPlants(w).find((pet) => !prior.has(pet.id));
  if (!plant) throw new Error(`No new ${kind} plant grew`);
  return plant;
}

describe("Zyra pinned mechanics and seed availability", () => {
  it("compiles all slots with both plant evidence and explicit spatial/timing reductions", () => {
    expect(compiled.spec.abilities.map((spell) => spell.key)).toEqual(["Q", "W", "E", "R"]);
    expect(compiled.evidence.map((entry) => entry.revid)).toEqual(expect.arrayContaining([3986877, 4013461, 4044057, 4013460, 3945317, 4002566]));
    expect(compiled.assumptions.join(" ")).toContain("server mapping is not explicit");
    expect(compiled.assumptions.join(" ")).toContain("probability pending");
    expect(compiled.assumptions.join(" ")).toContain("one basic-attack notification");
    expect(compiled.variants).toEqual([]);
  });
  it.each<Record<string, number>>([{ passiveSeeds: 0 }, { passiveSeeds: 3 }, { initialSeeds: 9 }, { initialSeeds: 0.5 }, { qHalfExtent: 0 }, { qSeedHalfExtent: NaN }])("rejects invalid model options %j", (options) => { expect(() => compile(options)).toThrow("Zyra:"); });
  it("starts without free passive seeds and with two mana-free W charges", () => {
    const w = world(); expect(ownSeeds(w)).toHaveLength(0); expect(chargesLeft(w, w.units[0], ability(w, "W"))).toBe(2);
    const mana = w.units[0].resource; cast(w, "W"); cast(w, "W");
    expect(w.units[0].resource).toBe(mana); expect(w.units[0].charges.W!.count).toBe(0); expect(ownSeeds(w)).toHaveLength(2);
    expect(w.units[0].charges.W!.nextTick).toBe(300);
  });
  it("uses ordinal extended level-20 passive cadence without accumulating ceil drift", () => {
    const w = world({ passiveSeeds: 2 }); w.units[1].x = 2000;
    through(w, 255); expect(ownSeeds(w)).toHaveLength(0);
    through(w, 256); expect(ownSeeds(w)).toHaveLength(2);
    expect(w.units[0].memory.nextSeed).toBe(511);
    through(w, 511); expect(ownSeeds(w)).toHaveLength(4); expect(w.units[0].memory.nextSeed).toBe(767);
  });
  it("passive cap never displaces W seeds and a W displaces the oldest passive seed", () => {
    const w = world({ initialSeeds: 8 }); const first = ownSeeds(w)[0]!.id;
    cast(w, "W", 700); expect(ownSeeds(w)).toHaveLength(8); expect(ownSeeds(w).some((seed) => seed.id === first)).toBe(false);
    expect(ownSeeds(w).filter((seed) => seed.memory.source === "W")).toHaveLength(1);
    for (const seed of ownSeeds(w)) seed.memory.source = "W";
    w.units[0].memory.nextSeed = w.tick; compiled.spec.hooks!.onTick!(hookContext(w, w.units[0]));
    expect(ownSeeds(w)).toHaveLength(8); expect(ownSeeds(w).every((seed) => seed.memory.source === "W")).toBe(true);
  });
  it("uses P/W expiry and step-immunity clocks independently", () => {
    const w = world({ initialSeeds: 1 }); const passive = ownSeeds(w)[0]!;
    expect(passive.endTick).toBe(900); expect(passive.memory.stepAt).toBe(30);
    cast(w, "W"); const seed = ownSeeds(w).find((entry) => entry.memory.source === "W")!;
    expect(seed.endTick).toBe(1800); expect(seed.memory.stepAt).toBe(45);
    w.units[1].x = seed.x; w.tick = 44; compiled.spec.hooks!.onTick!(hookContext(w, w.units[0])); expect(ownSeeds(w)).toContain(seed);
    w.tick = 45; compiled.spec.hooks!.onTick!(hookContext(w, w.units[0])); expect(ownSeeds(w)).not.toContain(seed);
    expect(w.units[1].statuses.find((status) => status.key === "revealed")?.endTick).toBe(105);
  });
  it("partial minion-pet kills advance 35% recharge and champion takedowns advance 100%", () => {
    const w = world(); cast(w, "W"); cast(w, "W");
    const enemy = spawnPet(w, w.units[1], { kind: "minion", name: "Minion", hp: 1, armor: 0, mr: 0, radius: 1, moveSpeed: 0, duration: 10 }, 500);
    damagePet(w, w.units[0], enemy, 1, "true", false); expect(w.units[0].charges.W!.nextTick).toBe(195);
    dealDamage(w, w.units[0], w.units[1], 100000, "true"); expect(w.units[0].charges.W!.count).toBe(1); expect(w.units[0].charges.W!.nextTick).toBe(195);
  });
  it("branch copies keep seed source, charge clock and passive phase independent", () => {
    const w = world({ initialSeeds: 1 }); cast(w, "W"); const fork = cloneWorld(w);
    fork.pets[0]!.memory.source = "W"; fork.units[0].charges.W!.nextTick = 9; fork.units[0].memory.nextSeed = 9;
    expect(w.pets[0]!.memory.source).toBe("P"); expect(w.units[0].charges.W!.nextTick).toBe(300); expect(w.units[0].memory.nextSeed).toBe(256);
  });
});

describe("Zyra fixed spell geometry, growth and ultimate stages", () => {
  it("Q grows seeds from its wider fixed targeter even when the champion is shielded", () => {
    const w = world(); const enemy = w.units[1];
    cast(w, "W", 500); cast(w, "Q", 300);
    applyEffect(w, enemy, enemy, { type: "state", state: "spellShield", duration: 3 }, { scale: 1 });
    enemy.x = 300; w.tick = 18; advanceZones(w); expect(ownPlants(w)).toHaveLength(0);
    w.tick = 19; advanceZones(w); expect(ownPlants(w)).toHaveLength(1); expect(ownPlants(w)[0]!.x).toBe(w.units[0].x + 500);
    expect(enemy.hp).toBe(100000);
  });
  it("Q's center stays fixed if its target moves before impact", () => {
    const w = world(); cast(w, "Q"); const center = w.zones[0]!.x; w.units[1].x += 500; w.tick = 19; advanceZones(w);
    expect(w.zones).toHaveLength(0); expect(center).not.toBe(w.units[1].x); expect(w.units[1].hp).toBe(100000);
  });
  it("E flies through its champion hit and grows a seed in the 1100–1200 tail", () => {
    const w = world(); cast(w, "W", 850); const seed = ownSeeds(w)[0]!; seed.x = w.units[0].x + 1190;
    cast(w, "E"); for (let index = 0; index < 35; index++) { advanceMissiles(w); w.tick++; }
    expect(w.units[1].statuses.some((status) => status.key === "root")).toBe(true);
    expect(ownPlants(w)).toHaveLength(1); expect(ownPlants(w)[0]!.spec.kind).toBe("zyra-lasher"); expect(ownPlants(w)[0]!.x).toBe(seed.x);
  });
  it("E's seed-only tail never damages a champion beyond 1100", () => {
    const w = world(); w.units[1].x = w.units[0].x + 1200; cast(w, "E");
    for (let index = 0; index < 35; index++) { advanceMissiles(w); w.tick++; }
    expect(w.units[1].hp).toBe(100000); expect(w.units[1].statuses.some((status) => status.key === "root")).toBe(false);
  });
  it("a projectile wall prevents downstream E growth", () => {
    const w = world(); cast(w, "W", 500); cast(w, "E");
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: w.units[0].x + 200, radius: 1, startTick: 0, endTick: 100 });
    for (let index = 0; index < 40; index++) { advanceMissiles(w); w.tick++; }
    expect(ownSeeds(w)).toHaveLength(1); expect(ownPlants(w)).toHaveLength(0);
  });
  it("E launches from cast-end position, retaining declared direction and a separate action lock", () => {
    const w = world(); startCast(w, w.units[0], ability(w, "E")); w.units[0].x -= 100; through(w, 8);
    expect(w.missiles[0]!.x).toBe(w.units[0].x);
    expect(w.missiles[0]!.direction).toBe(1);
    through(w, 9); expect(w.missiles[0]!.x).toBeCloseTo(w.units[0].x + 1150 / 30);
    expect(w.units[0].memory.zyraLockUntil).toBe(13); expect(canCast(w, w.units[0], ability(w, "Q"))).toBe(false);
    w.tick = 13; expect(canCast(w, w.units[0], ability(w, "Q"))).toBe(true);
  });
  it("R has immediate damage and an independent late knock-up at the fixed center", () => {
    const w = world(); cast(w, "R"); advanceZones(w); expect(w.units[1].hp).toBe(99600); expect(w.units[1].statuses.some((status) => status.key === "airborne")).toBe(false);
    w.units[1].x += 1000; w.tick = 60; advanceZones(w); expect(w.units[1].statuses.some((status) => status.key === "airborne")).toBe(false);
  });
  it("R knocks up an enemy entering after its damage and checks a new shield separately", () => {
    for (const shield of [false, true]) {
      const w = world(); cast(w, "R", 0); advanceZones(w); w.units[1].x = w.units[0].x + 1000;
      w.tick = 59; if (shield) applyEffect(w, w.units[1], w.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 });
      w.units[1].x = w.units[0].x + 500; w.tick = 60; advanceZones(w);
      expect(w.units[1].statuses.some((status) => status.key === "airborne")).toBe(!shield);
    }
  });
  it("enrage restores current HP, increases maximum only once and refreshes each plant's own duration", () => {
    const w = world(), plant = grow(w); plant.hp = 2; w.tick = 30; cast(w, "R");
    expect(plant.hp).toBe(3); expect(plant.spec.hp).toBe(12); expect(plant.spec.radius).toBe(25); expect(plant.endTick).toBe(270);
    w.tick = 40; cast(w, "R"); expect(plant.hp).toBe(3); expect(plant.spec.hp).toBe(12); expect(plant.endTick).toBe(280);
    w.tick = 45; const late = grow(w); expect(late.memory.enraged).toBe(true); expect(late.endTick).toBe(w.tick + 240);
  });
});

describe("Zyra independent plants, damage snapshots and target identity", () => {
  it("snapshots AP at growth and uses sourced ranges, windup and projectile speed", () => {
    const w = world({}, 100), plant = grow(w);
    expect(plant.memory.damage).toBeCloseTo(82.0588235294118 + 20); expect(plant.spec.attack!.range).toBe(575); expect(plant.spec.attack!.missileSpeed).toBe(1200);
    expect(plant.spec.attack!.windup).toBeCloseTo((0.3 - 0.08070175349712372) / 0.8);
    w.units[0].spec = { ...w.units[0].spec, bonus: { ap: 500 } }; const before = w.units[1].hp;
    petHit(w, plant, w.units[1], plant.spec.attack!.effects, true); expect(before - w.units[1].hp).toBeCloseTo(102.0588235294118);
  });
  it("first successful contact chooses primary across plant families; misses do not", () => {
    const w = world(), spitter = grow(w), lasher = grow(w, "E"); expect(lasher).toBeDefined();
    applyEffect(w, w.units[1], w.units[1], { type: "state", state: "dodgeAttacks", duration: 1 }, { scale: 1 });
    petHit(w, spitter, w.units[1], spitter.spec.attack!.effects, true); expect(w.units[0].memory["zyra-primary:champion:1"]).toBeUndefined();
    w.units[1].statuses = []; const before = w.units[1].hp;
    petHit(w, lasher, w.units[1], lasher.spec.attack!.effects, true); petHit(w, spitter, w.units[1], spitter.spec.attack!.effects, true);
    expect(before - w.units[1].hp).toBeCloseTo(82.0588235294118 * 1.5);
    destroyPet(w, lasher); const next = w.units[1].hp; petHit(w, spitter, w.units[1], spitter.spec.attack!.effects, true);
    expect(next - w.units[1].hp).toBeCloseTo(82.0588235294118);
  });
  it("keeps primary identities separate when plants switch between actual pet targets", () => {
    const w = world(), first = grow(w), second = grow(w), a = enemyPet(w, 100), b = enemyPet(w, 200);
    const hit = (plant: Pet, target: Pet) => petHit(w, plant, target, plant.spec.attack!.effects, true);
    hit(first, a); hit(second, b); hit(second, a); hit(first, b);
    expect(1000 - a.hp).toBeCloseTo(82.0588235294118 * 1.5); expect(1000 - b.hp).toBeCloseTo(82.0588235294118 * 1.5);
    expect(w.units[0].memory[`zyra-primary:pet:${a.id}`]).toBe(first.id); expect(w.units[0].memory[`zyra-primary:pet:${b.id}`]).toBe(second.id);
  });
  it("shares nonrefreshing lesser marks across plants and keeps them for their full target duration", () => {
    const w = world(), first = grow(w), second = grow(w), marked = enemyPet(w, 100), nearer = enemyPet(w, 200);
    second.x = 200; petHit(w, first, marked, first.spec.attack!.effects, true);
    const end = marked.statuses!.find((status) => status.key === "zyra-plant-mark")!.endTick;
    expect(second.spec.target!(w, second)).toBe(marked);
    w.tick += 30; petHit(w, second, marked, second.spec.attack!.effects, true);
    expect(marked.statuses!.find((status) => status.key === "zyra-plant-mark")!.endTick).toBe(end);
    destroyPet(w, first); expect(second.spec.target!(w, second)).toBe(marked);
    w.tick = end; expect(second.spec.target!(w, second)).toBe(nearer);
  });
  it.each([false, true])("records actual owner pet attack contact (%s ranged) without giving a champion mark", (ranged) => {
    const w = world(), plant = grow(w), target = enemyPet(w, w.units[0].x + 200), nearer = enemyPet(w, w.units[0].x + 100);
    plant.x = w.units[0].x;
    if (!ranged) w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, ranged: false, missileSpeed: undefined } };
    startAttack(w, w.units[0], target); launchAttack(w, w.units[0]);
    if (ranged) {
      expect(w.units[0].memory.zyraLastPet).toBeUndefined();
      for (let index = 0; index < 10; index++) { advanceMissiles(w); w.tick++; }
    }
    expect(target.hp).toBeLessThan(1000); expect(w.units[0].memory.zyraLastPet).toBe(target.id);
    expect(w.units[0].memory.zyraMarkUntil).toBeUndefined(); expect(plant.spec.target!(w, plant)).toBe(target);
    petEffects(w, w.units[1], target, [{ type: "state", state: "invisible", duration: 2 }]);
    expect(plant.spec.target!(w, plant)).toBe(nearer);
  });
  it("one Lasher remains 30%, two identities reach 60%, and death removes only its share", () => {
    const w = world(), first = grow(w, "E"), second = grow(w, "E");
    const hit = (pet: Pet) => petHit(w, pet, w.units[1], pet.spec.attack!.effects, true);
    hit(first); hit(first); expect(w.units[1].statuses.find((status) => status.memoKey === "zyra-vine-slow")!.value).toBe(0.3);
    hit(second); expect(w.units[1].statuses.find((status) => status.memoKey === "zyra-vine-slow")!.value).toBe(0.6);
    destroyPet(w, first); compiled.spec.hooks!.onTick!(hookContext(w, w.units[0])); expect(w.units[1].statuses.find((status) => status.memoKey === "zyra-vine-slow")!.value).toBe(0.3);
    destroyPet(w, second); compiled.spec.hooks!.onTick!(hookContext(w, w.units[0])); expect(w.units[1].statuses.some((status) => status.memoKey === "zyra-vine-slow")).toBe(false);
  });
  it.each([["zyra-spitter", 4], ["zyra-lasher", 5]] as const)("keeps %s ranged damage distinct at enlarged 12 HP", (kind, expected) => {
    const w = world(), plant = grow(w, kind === "zyra-spitter" ? "Q" : "E"); cast(w, "R");
    w.units[1].spec = { ...w.units[1].spec, attack: { ...w.units[1].spec.attack, ranged: true } };
    damagePet(w, w.units[1], plant, 1e6, "true", true); expect(plant.hp).toBe(12 - expected);
  });
  it("flurries resolve two 75% packets and in-flight attacks update at enrage/death", () => {
    const w = world(), plant = grow(w); const target = w.units[1];
    const packet = () => plant.spec.effectsForHit!({ world: w, pet: plant, target, effects: plant.spec.attack!.effects });
    expect(packet()).toHaveLength(1); cast(w, "R"); expect(packet()).toHaveLength(2);
    const before = target.hp; petHit(w, plant, target, plant.spec.attack!.effects, true); expect(before - target.hp).toBeCloseTo(82.0588235294118 * 1.5);
    destroyPet(w, plant); expect(packet()).toHaveLength(1);
  });
  it.each(["normal", "enrage", "enrageThenDeath"] as const)("updates an actual launched Spitter missile at %s while retaining spawn AP", (change) => {
    const w = world(), plant = grow(w), target = w.units[1];
    plant.x = w.units[0].x + 100; target.x = w.units[0].x + 600;
    advancePets(w); const launch = plant.windup!.launchTick;
    while (w.tick <= launch) { advancePets(w); w.tick++; }
    expect(w.petMissiles).toHaveLength(1);
    w.units[0].spec = { ...w.units[0].spec, bonus: { ap: 500 } };
    if (change !== "normal") cast(w, "R");
    if (change === "enrageThenDeath") destroyPet(w, plant);
    const before = target.hp;
    for (let index = 0; index < 20 && w.petMissiles!.length; index++) { advancePets(w); w.tick++; }
    expect(w.petMissiles).toHaveLength(0);
    expect(before - target.hp).toBeCloseTo(82.0588235294118 * (change === "enrage" ? 1.5 : 1));
  });
  it("removes in-flight enrage at the exact natural-expiry boundary before pet cleanup", () => {
    const w = world(), plant = grow(w), target = w.units[1];
    plant.x = w.units[0].x + 100; target.x = w.units[0].x + 600; cast(w, "R");
    advancePets(w); const launch = plant.windup!.launchTick;
    while (w.tick <= launch) { advancePets(w); w.tick++; }
    const missile = w.petMissiles![0]!;
    missile.x = target.x - target.spec.base.radius - 40; missile.perTick = 40;
    plant.endTick = w.tick; const before = target.hp; advancePets(w);
    expect(w.pets).not.toContain(plant); expect(w.petMissiles).toHaveLength(0);
    expect(before - target.hp).toBeCloseTo(82.0588235294118);
  });
  it("blind and disarm are independent while airborne/cripple/silence are resisted", () => {
    const w = world(), plant = grow(w);
    for (const cc of ["airborne", "cripple", "silence", "blind", "disarm"] as const) petEffects(w, w.units[1], plant, [{ type: "cc", cc, duration: 1 }]);
    expect(plant.statuses!.map((status) => status.key)).toEqual(["blind", "disarm"]); expect(w.units[0].statuses).toHaveLength(0);
  });
});

describe("Zyra ordinary policies and budget symmetry", () => {
  it.each(["fight", "kite", "hold", "trade", "flee"] as const)("keeps finite seed/pet/resource state in %s mode", (mode) => {
    const w = world(); w.modes[0] = mode;
    for (let tick = 0; tick < 450 && !w.result; tick++) step(w, [w.units[0].spec.behavior!, standStill]);
    expect(w.units[0].resource).toBeGreaterThanOrEqual(0); expect(w.pets.length).toBeLessThan(30); expect(ownSeeds(w).length).toBeLessThanOrEqual(8);
    if (mode !== "flee") {
      for (const name of ["Rampant Growth", "Grasping Roots", "Deadly Spines"]) expect(w.log.some((entry) => entry.side === 0 && entry.text === `casts ${name}`), name).toBe(true);
      expect(w.log.some((entry) => entry.side === 0 && /^places (Thorn Spitter|Vine Lasher)$/.test(entry.text))).toBe(true);
    }
    if (mode === "fight" || mode === "kite") expect(w.log.some((entry) => entry.side === 0 && entry.text === "casts Stranglethorns")).toBe(true);
  });
  it("does not spend setup spells after a trade completes or force R in hold", () => {
    const w = world(); w.modes[0] = "trade"; w.units[0].memory.tradeDone = true;
    expect(w.units[0].spec.behavior!(perceive(w, 0))?.kind).toBe("move");
    w.modes[0] = "hold"; delete w.units[0].memory.tradeDone; w.units[0].cooldownReady.Q = Infinity; w.units[0].cooldownReady.E = Infinity; cast(w, "W"); cast(w, "W");
    expect(w.units[0].spec.behavior!(perceive(w, 0))).not.toMatchObject({ kind: "cast", ability: "R" });
  });
  it("values AP-sensitive plants once and preserves a full-budget reflected Darius matchup", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const spec = compiled.spec, darius = kit("Darius").spec;
    const w = world({}, 0), before = spec.budget!.damage!(w.units[0], w.units[1]).magic!;
    w.units[0].spec = { ...w.units[0].spec, bonus: { ap: 100 } }; expect(spec.budget!.damage!(w.units[0], w.units[1]).magic!).toBeGreaterThan(before);
    const forward = simulateMatchup(spec, darius, 15000, prices), reverse = simulateMatchup(darius, spec, 15000, prices);
    expect(forward.builds[0]).toEqual(reverse.builds[1]); expect(forward.builds[1]).toEqual(reverse.builds[0]);
    const counterpart = { youEngage: "enemyEngages", enemyEngages: "youEngage", brawl: "brawl", shortTrade: "shortTrade", spacing: "spacing", escape: "escape" } as const;
    for (const scenario of forward.scenarios) expect(Math.abs((scenario.score ?? 0) + (reverse.scenarios.find((entry) => entry.id === counterpart[scenario.id])!.score ?? 0)), scenario.id).toBeLessThan(1e-12);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12); expect(Number.isFinite(forward.score)).toBe(true);
  }, 60000);
});
