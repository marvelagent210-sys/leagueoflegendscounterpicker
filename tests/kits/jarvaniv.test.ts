import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { abilityHitPet, applyEffect, attackHit, canSee, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { terrainLimit } from "../../engine/sim/terrain";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import JarvanIV from "../../kits/champions/JarvanIV";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const compiled = compileKit(championData("JarvanIV"), records("JarvanIV"), JarvanIV);
const ability = (key: string): AbilitySpec => compiled.spec.abilities.find((a) => a.key === key)!;
function worldFor(x = 300, bonusAD = 100, ap = 100): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ad: bonusAD, ap } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = x; return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(world, world.units[0], ability(key), aim);
const basic = (world: World, blind = false) => attackHit(world, world.units[0], world.units[1], blind, [], undefined, false, { critChance: 0 });
function state(world: World, target: Unit, key: StateType, duration = 5): void { applyEffect(world, target, target, { type: "state", state: key, duration }, { scale: 1 }); }
function summon(world: World, x: number, extra: Partial<PetSpec> = {}): Pet { return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual summon", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, ...extra }, x); }
const petBasic = (world: World, pet: Pet, blind = false) => resolveAttackOnPet(world, world.units[0], pet, blind, [], { critChance: 0 });
const shield = (unit: Unit) => unit.statuses.filter((s) => s.kind === "shield").reduce((sum, s) => sum + s.value, 0);

// Run the ordinary production budget/scenarios before mechanical fixtures.
describe("Jarvan IV ordinary production matchup", () => {
  it("spends15000 per side, reflects six production scenarios and uses QWER", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const opponent = kit("Darius").spec, forward = simulateMatchup(compiled.spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled.spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    for (const build of forward.builds) { expect(build.gold).toBe(15000); expect(Object.values(build.spent).reduce((a, b) => a + b, 0)).toBeCloseTo(15000, 8); }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-10); expect(forward.scenarios).toHaveLength(6);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-10);
      expect(scenario.outcomes.every((outcome) => Number.isFinite(outcome.seconds) && outcome.hp.every(Number.isFinite))).toBe(true);
    }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(ability(key).name))).toBe(true);
  }, 60000);
});

describe("Jarvan IV exact pinned source contract", () => {
  it("retains all raw templates and complete versioned spell objects", () => {
    expect(new Set(compiled.evidence.filter((row) => row.revid).map((row) => row.revid))).toEqual(new Set(records("JarvanIV").map((row) => row.page.revid)));
    for (const row of records("JarvanIV")) { expect(row.sources?.[0]?.text[0]).toContain("|notes"); expect(row.gameSources?.every((source) => source.text[0]?.startsWith("objectPath:") && source.text[1]?.startsWith("{"))).toBe(true); }
    const game = compiled.evidence.filter((row) => row.url); expect(game).toHaveLength(6);
    expect(game.every((row) => row.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && row.sourceSha256 === "824a62dd0e1fe6e67e9ac1c7d4dfa4e256c4485f02315347270a68b67f3ae845")).toBe(true);
  });
  it("fails closed without the pinned exact seven-value dash array", () => {
    const altered = structuredClone(records("JarvanIV")); delete altered.find((row) => row.kind === "E")!.gameSources;
    expect(() => compileKit(championData("JarvanIV"), altered, JarvanIV)).toThrow("pinned game data");
  });
  it("reads all max-rank formulas, three-second static target cooldown and primary cast times", () => {
    const ctx = new KitContext(championData("JarvanIV"), records("JarvanIV"));
    expect(ctx.ability("I").field("targetCooldown")).toBe(3);
    expect(ctx.ability("Q").formula("Physical Damage")).toEqual({ base: 250, ratios: { bonusAD: 1.45 } });
    expect(ctx.ability("W").formula("Shield Strength")).toEqual({ base: 140, ratios: { bonusAD: .7 } });
    expect(ctx.ability("E").formula("Magic Damage")).toEqual({ base: 240, ratios: { AP: .8 } });
    expect(ctx.ability("R").formula("Physical Damage")).toEqual({ base: 450, ratios: { bonusAD: 1.8 } });
    expect(["Q", "W", "E", "R"].map((key) => [ability(key).cooldown, ability(key).cost, ability(key).castTime])).toEqual([[6, 65, .4], [9, 30, 0], [10, 55, 0], [90, 100, 0]]);
  });
});

describe("Martial Cadence actual body contacts", () => {
  it("snapshots8%before the basic then deals separately after it", () => {
    const world = worldFor(), ad = derive(world.units[0]).ad; basic(world);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(ad + 1600);
    const rows = world.log.filter((r) => r.text.includes("damage")); expect(rows.at(-1)?.text).toContain("Martial Cadence");
    basic(world); expect(world.units[1].totals.damageTaken).toBeCloseTo(2 * ad + 1600);
    world.tick = 90; const before = world.units[1].hp; basic(world); expect(before - world.units[1].hp).toBeCloseTo(ad + before * .08);
  });
  it("has a20minimum and never damages after a lethal ordinary basic", () => {
    const low = worldFor(); low.units[1].hp = 100; low.units[0].spec = { ...low.units[0].spec, base: { ...low.units[0].spec.base, ad: 1 }, bonus: {} }; basic(low); expect(low.units[1].hp).toBe(79);
    const killed = worldFor(); killed.units[1].hp = 1; basic(killed); expect(killed.log.some((row) => row.text.includes("Martial Cadence"))).toBe(false);
  });
  it.each(["dodgeAttacks", "parry", "blockAttacks"] as const)("%s preserves the target's readiness", (guard) => {
    const world = worldFor(); state(world, world.units[1], guard); basic(world); expect(world.units[1].memory["jarvan:cadence:0"]).toBeUndefined(); world.units[1].statuses = []; basic(world); expect(world.units[1].totals.damageTaken).toBeGreaterThan(1600);
  });
  it("blind preserves readiness while ordinary spell shield does not block Cadence", () => {
    const world = worldFor(); basic(world, true); expect(world.units[1].memory["jarvan:cadence:0"]).toBeUndefined(); state(world, world.units[1], "spellShield"); basic(world); expect(world.units[1].totals.damageTaken).toBeGreaterThan(1600); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });
  it.each([undefined, "minion", "monster", "champion", "other"] as const)("uses actual%sclassification and independent IDs", (targetClass) => {
    const world = worldFor(), a = summon(world, 100, { targetClass }), b = summon(world, 100, { targetClass }), ad = derive(world.units[0]).ad;
    petBasic(world, a); petBasic(world, b);
    const bonus = targetClass === "other" ? 0 : targetClass === "champion" ? 800 : 400;
    expect(10000 - a.hp).toBeCloseTo(ad + bonus); expect(a.hp).toBe(b.hp); expect(a.id).not.toBe(b.id);
    petBasic(world, a); expect(10000 - a.hp).toBeCloseTo(2 * ad + bonus);
  });
  it("explicit clones count as champions, names alone do not; hit-count props take one ordinary hit", () => {
    const world = worldFor(), clone = summon(world, 100, { unitClass: "clone" }), named = summon(world, 100, { name: "Champion Clone" }), prop = summon(world, 100, { hitPoints: true, hp: 3 });
    petBasic(world, clone); petBasic(world, named); petBasic(world, prop);
    expect(named.hp - clone.hp).toBeCloseTo(400); expect(prop.hp).toBe(2); expect(prop.memory["jarvan:cadence:0"]).toBeUndefined();
  });
  it("actual pet guards survive status synchronization before the bonus packet", () => {
    const world = worldFor(), pet = summon(world, 100);
    pet.statuses!.push({ kind: "state", key: "invulnerable", source: 1, startTick: 0, endTick: 90, value: 0 }); petBasic(world, pet);
    expect(pet.hp).toBe(10000); expect(pet.statuses?.some((s) => s.key === "invulnerable")).toBe(true); expect(pet.memory["jarvan:cadence:0"]).toBe(90);
  });
});

describe("Golden Aegis actual champion counts", () => {
  it("grants only base+bonusADshield with no actual champion in600", () => { const world = worldFor(601); cast(world, "W"); expect(shield(world.units[0])).toBe(210); expect(world.units[0].memory["jarvan:wCount"]).toBe(0); });
  it("counts actual champion-class/clone bodies without assuming minions are champions", () => {
    const world = worldFor(600), clone = summon(world, 200, { unitClass: "clone" }); summon(world, 250, { targetClass: "champion" }); const minion = summon(world, 300, { targetClass: "minion" }); summon(world, 250, { hitPoints: true }); cast(world, "W");
    expect(world.units[0].memory["jarvan:wCount"]).toBe(3); expect(shield(world.units[0])).toBeCloseTo(210 + .039 * derive(world.units[0]).maxHp); expect(clone.statuses?.some((s) => s.key === "slow")).toBe(true); expect(minion.statuses?.some((s) => s.key === "slow")).toBe(true); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["spellShield", "parry", "stasis", "untargetable"] as const)("%s denies the actual counted champion contact", (guard) => { const world = worldFor(); state(world, world.units[1], guard); cast(world, "W"); expect(world.units[0].memory["jarvan:wCount"]).toBe(0); expect(shield(world.units[0])).toBe(210); });
  it("counts CC-immune accepted champions and gives exactly4seconds shield/2seconds slow", () => { const world = worldFor(); state(world, world.units[1], "ccImmune"); cast(world, "W"); expect(world.units[0].memory["jarvan:wCount"]).toBe(1); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false); expect(world.units[0].statuses.find((s) => s.kind === "shield")!.endTick).toBe(120); });
});

describe("Demacian Standard actual lifecycle and aura", () => {
  it("starts with passive30%ASand no flag, then adds one actual8second untargetable Minion body", () => {
    const world = worldFor(), before = derive(world.units[0]).attackSpeed; expect(world.pets).toHaveLength(0); expect(world.units[0].statuses[0]!.value).toBe(.3); cast(world, "E");
    const flag = world.pets[0]!; expect(flag.spec.targetClass).toBe("minion"); expect(flag.spec.radius).toBe(65); expect(flag.spec.pathingRadius).toBe(13.6); expect(flag.spec.untargetable).toBe(true); expect(flag.endTick).toBe(240); expect(derive(world.units[0]).attackSpeed - before).toBeCloseTo(world.units[0].spec.base.attackSpeed.ratio * .3); expect(world.units[1].totals.damageTaken).toBe(320);
    through(world, 240); expect(world.pets).toHaveLength(0); expect(derive(world.units[0]).attackSpeed).toBeCloseTo(before);
  });
  it("non-stacking aura follows current1000membership and standard sight does not reveal stealth", () => {
    const world = worldFor(), before = derive(world.units[0]).attackSpeed; cast(world, "E"); world.units[0].cooldownReady.E = 0; cast(world, "E"); expect(world.pets).toHaveLength(2); expect(derive(world.units[0]).attackSpeed - before).toBeCloseTo(world.units[0].spec.base.attackSpeed.ratio * .3);
    world.units[0].x = 1300.001; through(world, 0); expect(derive(world.units[0]).attackSpeed).toBeCloseTo(before); state(world, world.units[1], "invisible"); expect(canSee(world.units[1], world.units[0])).toBe(false);
  });
  it("aim clamps to860, independently guards damage on real pets and ignores projectile walls", () => {
    const world = worldFor(1000), pet = summon(world, 860); world.zones.push({ id: 99, owner: 1, kind: "projectileWall", x: 400, radius: 0, seenTick: 0, startTick: 0, endTick: 90 }); cast(world, "E", { direction: 1, distance: 2000 }); expect(world.pets.find((p) => p.owner === 0)!.x).toBe(860); expect(10000 - pet.hp).toBe(320); expect(world.units[1].totals.damageTaken).toBe(320);
  });
  it("death removes real flags with ordinary pet lifecycle", () => { const world = worldFor(); cast(world, "E"); dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 0); expect(world.pets.filter((p) => p.owner === 0)).toHaveLength(0); });
});

describe("Dragon Strike source geometry, armor and finite flag pull", () => {
  it("hits at cast completion and shreds only after damage, including actual pets", () => {
    const world = worldFor(300), pet = summon(world, 400, { armor: 100 }); world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, armor: 100 } }; cast(world, "Q"); through(world, 11); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 12);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(197.5); expect(10000 - pet.hp).toBeCloseTo(197.5); expect(derive(world.units[1]).armorReduction.percent).toEqual([.26]); expect(pet.statuses?.find((s) => s.key === "armorReductionPercent")!.endTick).toBe(102);
  });
  it("uses caster position at cast end with original aimed direction and minimum65", () => { const world = worldFor(300); cast(world, "Q"); world.units[0].x = 400; through(world, 12); expect(world.units[1].totals.damageTaken).toBe(0); const close = worldFor(0); cast(close, "Q"); through(close, 12); expect(close.units[1].totals.damageTaken).toBeCloseTo(395); });
  it("requires a real flag and pulls to the furthest flag at1400units/sec", () => {
    const world = worldFor(300); cast(world, "E", { direction: 1, distance: 400 }); world.units[0].cooldownReady.E = 0; cast(world, "E", { direction: 1, distance: 800 }); cast(world, "Q"); through(world, 12); expect(world.units[0].x).toBe(0); expect(world.units[0].action?.kind).toBe("dash"); through(world, 13); expect(world.units[0].x).toBeCloseTo(1400 / 30); through(world, 30); expect(world.units[0].x).toBeCloseTo(800); expect(world.units[1].statuses.filter((s) => s.key === "airborne")).toHaveLength(1);
    const absent = worldFor(); cast(absent, "Q"); through(absent, 20); expect(absent.units[0].x).toBe(0);
  });
  it.each(["root", "ground"] as const)("%s does not prevent Q or the sourced flag pull", (cc) => { const world = worldFor(); cast(world, "E"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 5 }, { scale: 1 }); expect(canCast(world, world.units[0], ability("Q"))).toBe(true); cast(world, "Q"); through(world, 19); expect(world.units[0].x).toBeCloseTo(300); });
  it("crosses intervening walls with clear endpoint but clips an endpoint inside terrain", () => {
    const world = worldFor(700); world.terrain.push({ id: 99, owner: 1, from: 200, to: 400, endTick: 500 }); cast(world, "E"); cast(world, "Q"); through(world, 30); expect(world.units[0].x).toBeCloseTo(700);
    const blocked = worldFor(300); blocked.terrain.push({ id: 99, owner: 1, from: 200, to: 400, endTick: 500 }); cast(blocked, "E"); cast(blocked, "Q"); through(blocked, 30); expect(blocked.units[0].x).toBeCloseTo(165);
  });
  it("knockdown stops travel and each real body has one knockup attempt", () => {
    const world = worldFor(600), pet = summon(world, 100); cast(world, "E"); cast(world, "Q"); through(world, 13); applyEffect(world, world.units[1], world.units[0], { type: "knockdown" }, { scale: 1 }); const position = world.units[0].x; through(world, 30); expect(world.units[0].x).toBe(position); expect(pet.statuses?.filter((s) => s.key === "airborne")).toHaveLength(1);
  });
  it("spell shield guards lance/shred and projectile walls cannot stop a lance", () => { const world = worldFor(); state(world, world.units[1], "spellShield"); cast(world, "Q"); through(world, 12); expect(world.units[1].totals.damageTaken).toBe(0); expect(derive(world.units[1]).armorReduction).toEqual({ flat: 0, percent: [] }); const wall = worldFor(); wall.zones.push({ id: 99, owner: 1, kind: "projectileWall", x: 100, radius: 0, seenTick: 0, startTick: 0, endTick: 90 }); cast(wall, "Q"); through(wall, 12); expect(wall.units[1].totals.damageTaken).toBeCloseTo(395); });
});

describe("Cataclysm tracking, protection, terrain and dismissal", () => {
  it.each(["untargetable", "invisible", "stasis"] as const)("denies initial%s targets", (guard) => { const world = worldFor(); state(world, world.units[1], guard); expect(canCast(world, world.units[0], ability("R"))).toBe(false); });
  it("rejects out-of-range/dead targets and root/ground casts", () => { const world = worldFor(650.001); expect(canCast(world, world.units[0], ability("R"))).toBe(false); for (const cc of ["root", "ground", "stun", "silence"] as const) { const stopped = worldFor(); applyEffect(stopped, stopped.units[1], stopped.units[0], { type: "cc", cc, duration: 5 }, { scale: 1 }); expect(canCast(stopped, stopped.units[0], ability("R"))).toBe(false); } });
  it("tracks actual target motion for11ticks with displacement immunity and passes walls", () => {
    const world = worldFor(600); world.terrain.push({ id: 99, owner: 1, from: 200, to: 400, endTick: 500 }); cast(world, "R"); through(world, 4); world.units[1].x = 700;
    applyEffect(world, world.units[1], world.units[0], { type: "displace", direction: "away", distance: 100, duration: .2 }, { scale: 1 }); expect(world.units[0].forced).toBeUndefined(); through(world, 10); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 11); expect(world.units[0].x).toBeCloseTo(700); expect(world.units[1].totals.damageTaken).toBeCloseTo(630); expect(world.terrain).toHaveLength(3);
  });
  it("spell shield blocks damage while terrain still forms; untargetability after declaration guards damage", () => {
    for (const guard of ["spellShield", "untargetable", "stasis"] as const) { const world = worldFor(); cast(world, "R"); state(world, world.units[1], guard); through(world, 11); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.terrain).toHaveLength(2); }
  });
  it("creates255–445 walls on both sides and starts90second cooldown only after dismissal", () => {
    const world = worldFor(); cast(world, "R"); through(world, 11); expect(world.terrain.map((t) => [t.from, t.to])).toEqual([[-145, 45], [555, 745]]); expect(terrainLimit(world, world.units[0], 1000)).toBe(220); expect(canCast(world, world.units[0], ability("R2"))).toBe(false); through(world, 34); expect(canCast(world, world.units[0], ability("R2"))).toBe(true); cast(world, "R2"); expect(world.terrain).toHaveLength(0); expect(world.units[0].cooldownReady.R).toBe(world.tick + 2700);
  });
  it("natural3.5second expiry removes walls without another cast activation", () => { const world = worldFor(); cast(world, "R"); through(world, 116); expect(world.terrain).toHaveLength(0); expect(world.units[0].cooldownReady.R).toBe(2816); expect(world.log.filter((row) => row.text.startsWith("casts Cataclysm"))).toHaveLength(1); });
  it("actual perimeter pets receive guarded airborne without invented forced movement", () => {
    const world = worldFor(300), pet = summon(world, 600, { targetClass: "champion" }), immune = summon(world, 700, { targetClass: "minion" }), prop = summon(world, 600, { hitPoints: true });
    immune.statuses!.push({ kind: "state", key: "displacementImmune", source: 1, startTick: 0, endTick: 90, value: 0 });
    cast(world, "R"); through(world, 11);
    expect(pet.statuses?.find((s) => s.key === "airborne")!.endTick).toBe(16); expect(pet.x).toBe(600); expect(immune.statuses?.some((s) => s.key === "airborne")).toBe(false); expect(prop.statuses).toHaveLength(0);
  });
  it.each([[300, 220], [400, 480], [-300, -220], [-400, -480]] as const)("real landing at0pushes champion at%s to%s over0.15seconds", (x, landing) => {
    const world = worldFor(x); compiled.spec.hooks!.onDashEnd!({ ...hookContext(world, world.units[0]), ability: ability("R"), interrupted: false });
    expect(world.units[1].forced?.endTick).toBe(5); through(world, 4); expect(world.units[1].x).toBeCloseTo(landing);
  });
  it.each(["spellShield", "displacementImmune", "ccImmune"] as const)("terrain knock-aside independently handles%s", (guard) => {
    const world = worldFor(300); state(world, world.units[1], guard); compiled.spec.hooks!.onDashEnd!({ ...hookContext(world, world.units[0]), ability: ability("R"), interrupted: false });
    expect(world.terrain).toHaveLength(2); expect(!!world.units[1].forced).toBe(guard === "spellShield");
  });
  it("death during leap grants no damage/terrain/refund", () => { const world = worldFor(); cast(world, "R"); through(world, 3); const died = world.tick; dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.terrain).toHaveLength(0); expect(world.units[0].cooldownReady.R).toBe(died + 2700); });
});

describe("Jarvan IV ordinary restraint and reflected co-location", () => {
  it.each(["trade", "hold"] as const)("reserves a genuinely readyRin%s", (mode) => { const world = worldFor(); world.modes[0] = mode; world.units[0].cooldownReady.Q = world.units[0].cooldownReady.W = world.units[0].cooldownReady.E = 999; expect(canCast(world, world.units[0], ability("R"))).toBe(true); expect(compiled.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" }); });
  it("completed trade retreats before a fresh offensive spell", () => { const world = worldFor(); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true; expect(compiled.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 }); });
  it.each([0, 1] as const)("side%suses directionTo for E/Q from exact overlap", (side) => {
    const enemy = fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } }), world = createWorld({ fighters: side === 0 ? [compiled.spec, enemy] : [enemy, compiled.spec], distance: 0, modes: ["idle", "idle"] });
    world.units[0].x = world.units[1].x = 0; startCast(world, world.units[side], ability("E"), { direction: 1, distance: 500 }); expect(world.pets[0]!.x).toBe(side === 0 ? 500 : -500); startCast(world, world.units[side], ability("Q")); through(world, 24); expect(world.units[side].x).toBe(side === 0 ? 500 : -500);
  });
});


describe("Jarvan IV retained actions and source boundaries", () => {
  it("W and E can overlay an actual flag dash without cancelling its finite travel", () => {
    const world = worldFor(700); cast(world, "E"); cast(world, "Q"); through(world, 13); const dash = world.units[0].action;
    expect(canCast(world, world.units[0], ability("W"))).toBe(true); cast(world, "W"); expect(world.units[0].action).toBe(dash);
    world.units[0].cooldownReady.E = 0; cast(world, "E", { direction: -1, distance: 100 }); expect(world.units[0].action).toBe(dash); through(world, 27); expect(world.units[0].x).toBe(700);
  });
  it("an actual anti-dash aura stops the flag dash and cannot interrupt protected R", () => {
    const stopped = worldFor(700); applyEffect(stopped, stopped.units[1], stopped.units[1], { type: "state", state: "antiDash", value: 400, duration: 5, effects: [{ type: "cc", cc: "airborne", duration: .5 }] }, { scale: 1 }); cast(stopped, "E"); cast(stopped, "Q"); through(stopped, 28); expect(stopped.units[0].x).toBeLessThan(400);
    const protectedWorld = worldFor(600); applyEffect(protectedWorld, protectedWorld.units[1], protectedWorld.units[1], { type: "state", state: "antiDash", value: 400, duration: 5, effects: [{ type: "cc", cc: "airborne", duration: .5 }] }, { scale: 1 }); cast(protectedWorld, "R"); through(protectedWorld, 11); expect(protectedWorld.units[0].x).toBe(600); expect(protectedWorld.units[1].totals.damageTaken).toBeCloseTo(630);
  });
  it("expired actual flags do not pull and source root/ground exceptions do not override silence", () => {
    const world = worldFor(1000); cast(world, "E", { direction: 1, distance: 800 }); through(world, 240); cast(world, "Q"); through(world, 253); expect(world.units[0].x).toBe(0);
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "silence", duration: 5 }, { scale: 1 }); world.units[0].cooldownReady.Q = 0; expect(canCast(world, world.units[0], ability("Q"))).toBe(false);
  });
  it("parry/stasis/untargetability guard actual pet spell contacts and hit-count props remain untouched", () => {
    for (const guard of ["parry", "stasis", "untargetable"] as const) {
      const world = worldFor(1000), pet = summon(world, 300); pet.statuses!.push({ kind: "state", key: guard, source: 1, startTick: 0, endTick: 90, value: 0 }); cast(world, "E", { direction: 1, distance: 300 }); cast(world, "Q"); through(world, 12); expect(pet.hp).toBe(10000); expect(pet.statuses?.some((s) => ["armorReductionPercent", "airborne"].includes(s.key))).toBe(false);
    }
  });
  it("accepted actual pet spell shields consume their own guard without shielding the owner", () => {
    const world = worldFor(300), pet = summon(world, 300); pet.statuses!.push({ kind: "state", key: "spellShield", source: 1, startTick: 0, endTick: 90, value: 0 }); cast(world, "E"); expect(pet.hp).toBe(10000); expect(world.units[1].totals.damageTaken).toBe(320); expect(pet.statuses?.some((s) => s.key === "spellShield")).toBe(false);
  });
  it("a connected pet packet snapshots actual HP before damage and preserves actual independent readiness under haste", () => {
    const world = worldFor(), pet = summon(world, 100, { hp: 2500, targetClass: "minion" }); world.units[0].spec = { ...world.units[0].spec, bonus: { abilityHaste: 500 } }; const ad = derive(world.units[0]).ad; petBasic(world, pet); expect(2500 - pet.hp).toBeCloseTo(ad + 200); expect(pet.memory["jarvan:cadence:0"]).toBe(90);
  });
  it("a slain caster cannot finish an unreleased Q or spawn an impact after death", () => {
    const world = worldFor(); cast(world, "Q"); through(world, 4); dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 30); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.pets).toHaveLength(0);
  });
});


describe("Cataclysm actual summoned champion identities", () => {
  it("can target an aimed actual clone while an ordinary minion never enables the cast", () => {
    const world = worldFor(1000); summon(world, 100, { targetClass: "minion", name: "Champion-looking minion" }); expect(canCast(world, world.units[0], ability("R"))).toBe(false);
    const clone = summon(world, 300, { unitClass: "clone" }); expect(canCast(world, world.units[0], ability("R"))).toBe(true); cast(world, "R", { direction: 1, distance: 300 }); clone.x = 400; through(world, 11); expect(world.units[0].x).toBe(400); expect(10000 - clone.hp).toBe(630); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("removal of the actual tracked pet preserves its last location without retargeting its owner", () => {
    const world = worldFor(1000), clone = summon(world, 300, { targetClass: "champion" }); cast(world, "R", { direction: 1, distance: 300 }); through(world, 3); world.pets = world.pets.filter((pet) => pet !== clone); through(world, 11); expect(world.units[0].x).toBe(300); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.terrain).toHaveLength(2);
  });
  it("ordinary stun during R keeps its protected leap and cannot create a second impact", () => {
    const world = worldFor(); cast(world, "R"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 2 }, { scale: 1 }); through(world, 30); expect(world.units[0].x).toBe(300); expect(world.units[1].totals.damageTaken).toBe(630); expect(world.terrain).toHaveLength(2);
  });
});
