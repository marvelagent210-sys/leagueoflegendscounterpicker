import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, beginResurrection, dealDamage, directionTo, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Maokai from "../../kits/champions/Maokai";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compile = (data = records("Maokai")) => compileKit(championData("Maokai"), data, Maokai, {}, pets("Maokai"), runes());
const compiled = compile();
const spec = (bonus: FighterSpec["bonus"] = {}) => ({ ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } });
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const world = (distance = 300, bonus: FighterSpec["bonus"] = {}, brush = false) => {
  const value = createWorld({ fighters: [spec(bonus), dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 80, maxBranches: 1, reactionTime: 10, environment: { brush, walls: false, wallDistance: 400, minions: false, laneSetup: false } } });
  value.units[0].x = 0; value.units[1].x = distance; return value;
};
const ability = (value: World, key: string) => value.units[0].spec.abilities.find(spell => spell.key === key)!;
const cast = (value: World, key: string, distance?: number) => startCast(value, value.units[0], ability(value, key), distance === undefined ? undefined : { direction: 1, distance });
const advance = (value: World, through: number) => { while (value.tick <= through && !value.result) step(value, [idle, idle]); };
const state = (value: World, side: 0 | 1, key: StateType, duration = 30) => applyEffect(value, value.units[side], value.units[side], { type: "state", state: key, duration }, { scale: 1 });
const enemyPet = (value: World, x: number, changes: Partial<PetSpec> = {}) => spawnPet(value, value.units[1], { kind: "test", name: "Actual enemy pet", targetClass: "minion", hp: 10000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 80, ...changes }, x);
const saplings = (value: World) => value.pets.filter(pet => pet.owner === 0 && pet.spec.kind === "maokai-sapling");
const basic = (value: World, pet?: Pet) => { startAttack(value, value.units[0], pet); const action = value.units[0].action; expect(action?.kind).toBe("windup"); if (action?.kind === "windup") advance(value, action.launchTick); };
function plant(value: World, x = 300): Pet {
  value.units[1].x = 5000; cast(value, "E", x); advance(value, value.tick + 49);
  const pet = saplings(value).at(-1); if (!pet) throw new Error("Sapling did not land"); return pet;
}
function burst(value: World, pet: Pet, targetX = pet.x): number {
  value.units[1].x = targetX; pet.memory.armed = value.tick; pet.memory.phase = "waiting";
  const before = value.units[1].hp; compiled.spec.hooks!.onTick!(hookContext(value, value.units[0])); return before - value.units[1].hp;
}

// These production tests intentionally retain the full budget, scenario set and tolerance.
describe("Maokai production", () => {
  const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
  it("reflects exact 15000-gold builds and all six Darius scenarios", () => {
    const forward = simulateMatchup(compiled.spec, kit("Darius").spec, 15000, prices, { settings: { log: true } });
    const reverse = simulateMatchup(kit("Darius").spec, compiled.spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(forward.scenarios).toHaveLength(6);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThanOrEqual(1e-10);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const reflected = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(reflected.score).toBeUndefined(); else expect(Math.abs(scenario.score + reflected.score!)).toBeLessThanOrEqual(1e-10);
      for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
    }
    const casts = forward.scenarios.flatMap(scenario => scenario.outcomes.flatMap(outcome => outcome.timeline.filter(row => row.side === 0 && row.text.startsWith("casts ")).map(row => row.text)));
    for (const name of ["Bramble Smash", "Twisted Advance", "Sapling Toss", "Nature's Grasp"]) expect(casts.some(text => text.includes(name))).toBe(true);
  }, 60000);
  it("finishes all six 15000-gold scenarios against actual Heimerdinger pets", () => {
    const result = simulateMatchup(compiled.spec, kit("Heimerdinger", { upgrade: 2 }).spec, 15000, prices, { settings: { log: true } });
    expect(result.scenarios).toHaveLength(6); expect(Number.isFinite(result.score)).toBe(true);
    const timeline = result.scenarios.flatMap(scenario => scenario.outcomes.flatMap(outcome => outcome.timeline));
    expect(timeline.some(row => /deploys an H-28G Evolution Turret/.test(row.text))).toBe(true);
    expect(timeline.some(row => /hits H-28G Evolution Turret/.test(row.text))).toBe(true);
    for (const scenario of result.scenarios) for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
  }, 60000);
});

describe("Maokai mechanics: pinned sources", () => {
  it("retains all five primary revisions, full raw, pet article and exact binary attribution", () => {
    const data = records("Maokai"); expect(data.map(row => row.page.revid).sort()).toEqual([3681487, 3946300, 4007687, 4038409, 4046583]);
    expect(data.every(row => row.sources?.some(source => source.page.revid === row.page.revid && source.text.some(text => text.includes("|champion") && text.includes("|notes"))))).toBe(true);
    expect(pets("Maokai")[0]!.page.revid).toBe(4067454); expect(pets("Maokai")[0]!.text.sourceNotes).toContain("== Pets ==");
    expect(data.find(row => row.kind === "E")!.notes.join(" ")).toContain("50*2/3 to 150*2/3");
    const binary = compiled.evidence.filter(row => row.url); expect(binary.length).toBeGreaterThan(5);
    for (const row of binary) expect(row).toMatchObject({ url: "https://raw.communitydragon.org/16.20/game/data/characters/maokai/maokai.bin.json", sourceVersion: "16.20.8248524+branch.releases-16-20.content.release", sourceSha256: "c4ccffe1b0de1c846d5eb8b66ecd00f5dd4522410adea5d39f6329a6bff58229" });
    expect(compiled.assumptions.join(" ")).toContain("central one of five lateral brambles"); expect(compiled.assumptions.join(" ")).toContain("550"); expect(compiled.variants).toEqual([]);
  });
  it("fails closed on missing exact binary movement or incomplete attribution", () => {
    const missing = records("Maokai"); missing.find(row => row.kind === "E")!.gameSources = [];
    expect(() => compile(missing)).toThrow("pinned game data");
    const bad = records("Maokai"); for (const row of bad) for (const source of row.gameSources ?? []) source.sha256 = "wrong";
    expect(() => compile(bad)).toThrow("incomplete game source attribution");
  });
  it("reads formulas during build without changing the parsed primary", () => {
    const data = records("Maokai"), before = structuredClone(data); compile(data); expect(data).toEqual(before);
    const row = data.find(row => row.kind === "E")!; expect(row.parts[2]!.leveling[0]!.amount.base).toMatchObject({ values: [33.3333333333333, 49.99999999999997, 66.66666666666666, 83.33333333333333, 100] });
  });
});

describe("Maokai mechanics: Sap Magic actual basic attacks", () => {
  it("starts ready with zero stacks, refuses full-health attacks and heals only an eligible contact", () => {
    const value = world(100), self = value.units[0]; expect(self.memory["maokai:sapStacks"]).toBe(0); basic(value); expect(self.totals.healing).toBe(0);
    self.hp -= 1000; self.attackReadyTick = value.tick; basic(value);
    expect(self.totals.healing).toBeCloseTo(derive(self).maxHp * .141); expect(Number(self.memory["maokai:sap"])).toBe(value.tick - 1 + Math.ceil(18.8235294117647 * 30 - 1e-9));
    expect(self.attackReadyTick).toBe(value.tick - 1);
  });
  it.each(["blockAttacks", "dodgeAttacks", "parry"] as const)("handles %s on the actual target", guard => {
    const value = world(100); value.units[0].hp -= 1000; state(value, 1, guard); basic(value);
    expect(value.units[0].totals.healing > 0).toBe(guard === "blockAttacks");
  });
  it("does not arm retrospectively when its cooldown expires during the windup", () => {
    const value = world(100); value.units[0].hp -= 1000; value.units[0].memory["maokai:sap"] = 1; basic(value); expect(value.units[0].totals.healing).toBe(0);
  });
  it("heals from an actual minion pet independently of its distant owner's dodge", () => {
    const value = world(3000), pet = enemyPet(value, 100); value.units[0].hp -= 1000; state(value, 1, "dodgeAttacks"); basic(value, pet);
    expect(value.units[0].totals.healing).toBeCloseTo(derive(value.units[0]).maxHp * .141); expect(pet.hp).toBeLessThan(10000); expect(value.units[1].hp).toBe(100000);
  });
  it("does not borrow a target classification for an unclassified pet", () => {
    const value = world(3000), pet = enemyPet(value, 100, { targetClass: undefined }); value.units[0].hp -= 1000; basic(value, pet); expect(value.units[0].totals.healing).toBe(0);
  });
  it("reduces its static cooldown on its casts, enemy spell damage and consumed spell shields", () => {
    const value = world(400), self = value.units[0], enemy = value.units[1]; self.memory["maokai:sap"] = 1000;
    cast(value, "W"); expect(self.memory["maokai:sap"]).toBe(880);
    self.action = undefined; self.statuses = [];
    const spell = { key: "enemy-spell", name: "Enemy spell", slot: "Q" as const, cooldown: 0, castTime: 0, delivery: { kind: "self" as const }, onHit: [{ type: "damage" as const, damageType: "magic" as const, amount: { base: 10 } }] };
    enemy.spec = { ...enemy.spec, abilities: [spell] };
    abilityHit(value, enemy, self, spell, spell.onHit); expect(self.memory["maokai:sap"]).toBe(760);
    value.tick++; state(value, 0, "spellShield"); abilityHit(value, enemy, self, spell, spell.onHit); expect(self.memory["maokai:sap"]).toBe(640);
    dealDamage(value, enemy, self, 10, "magic", { attack: true }); expect(self.memory["maokai:sap"]).toBe(640);
  });
});

describe("Maokai mechanics: Q circle and traveling shockwave", () => {
  it("separates nearby damage/control from the projectile and never deals double damage", () => {
    const value = world(200); cast(value, "Q"); advance(value, 9); expect(100000 - value.units[1].hp).toBe(4255); expect(value.units[1].statuses.some(status => status.key === "stun")).toBe(true);
    advance(value, 30); expect(100000 - value.units[1].hp).toBe(4255); expect(value.units[1].x).toBeGreaterThan(200);
    expect(value.units[0].memory["maokai:lock"]).toBe(12);
  });
  it("knocks a nearby enemy behind the declared shockwave direction", () => {
    const value = world(500); cast(value, "Q"); value.units[1].x = -200; advance(value, 9);
    expect(value.units[1].hp).toBeLessThan(100000); expect(value.missiles[0]!.direction).toBe(1); expect(value.units[1].forced).toBeDefined(); advance(value, 25); expect(value.units[1].x).toBeLessThan(-200);
  });
  it("projectile walls stop its distant wave while its nearby circle still connects", () => {
    for (const distance of [200, 500]) {
      const value = world(distance); value.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 100 }); cast(value, "Q"); advance(value, 30);
      expect(value.units[1].hp < 100000).toBe(distance === 200);
    }
  });
  it("displacement immunity rejects nearby stun and knockback but permits damage", () => {
    const value = world(200); state(value, 1, "displacementImmune"); cast(value, "Q"); advance(value, 9);
    expect(value.units[1].hp).toBe(95745); expect(value.units[1].forced).toBeUndefined(); expect(value.units[1].statuses.some(status => status.key === "stun")).toBe(false);
  });
  it("hits actual pet health, caps its target-health term and respects monster identity", () => {
    const value = world(3000), pet = enemyPet(value, 150, { hp: 1000000, targetClass: "monster" }); cast(value, "Q"); advance(value, 9);
    expect(1000000 - pet.hp).toBe(255 + 9999 + 190); expect(pet.forced).toBeDefined(); advance(value, 25); expect(pet.x).toBeGreaterThan(150); expect(value.units[1].hp).toBe(100000); expect(value.units[1].statuses).toEqual([]);
  });
});

describe("Maokai mechanics: W target tracking and interruption", () => {
  it("becomes untargetable and tracks a relocation until actual rooted arrival", () => {
    const value = world(500); cast(value, "W"); expect(hasState(value.units[0], "untargetable")).toBe(true); advance(value, 3); value.units[1].x = 800; advance(value, 22);
    expect(value.units[0].x).toBeCloseTo(800 - value.units[0].spec.base.pathingRadius - value.units[1].spec.base.pathingRadius); expect(100000 - value.units[1].hp).toBe(160); expect(value.units[1].statuses.some(status => status.key === "root")).toBe(true); expect(hasState(value.units[0], "untargetable")).toBe(false);
  });
  it("releases its previous location without damage when the target relocates over 2000", () => {
    const value = world(500); cast(value, "W"); advance(value, 2); value.units[1].x = 3000; advance(value, 30);
    expect(value.units[1].hp).toBe(100000); expect(value.units[0].x).toBeLessThanOrEqual(500); expect(hasState(value.units[0], "untargetable")).toBe(false);
  });
  it.each(["spellShield", "untargetable", "parry"] as const)("revalidates %s at arrival", guard => {
    const value = world(500); cast(value, "W"); state(value, 1, guard); advance(value, 20); expect(value.units[1].hp).toBe(100000); expect(value.units[1].statuses.some(status => status.key === "root")).toBe(false); expect(hasState(value.units[0], "untargetable")).toBe(false);
  });
  it("resurrection interrupts its dash and removes its own untargetability", () => { const value = world(500); cast(value, "W"); beginResurrection(value, value.units[0], { duration: 1 }); advance(value, 35); expect(value.units[1].hp).toBe(100000); expect(hasState(value.units[0], "untargetable")).toBe(false); });
  it.each(["root", "ground"] as const)("%s prevents declaration without spending mana", cc => { const value = world(500), before = value.units[0].resource; applyEffect(value, value.units[1], value.units[0], { type: "cc", cc, duration: 3 }, { scale: 1 }); expect(canCast(value, value.units[0], ability(value, "W"))).toBe(false); expect(value.units[0].resource).toBe(before); });
});

describe("Maokai mechanics: real sapling lifecycle and attached packets", () => {
  it("starts with none, flies for finite time and arms only after landing", () => {
    const value = world(300); expect(saplings(value)).toHaveLength(0); cast(value, "E", 300); advance(value, 8); expect(value.missiles.filter(missile => missile.source === "E")).toHaveLength(1); expect(saplings(value)).toHaveLength(0);
    advance(value, 33); expect(saplings(value)).toHaveLength(0); advance(value, 34); expect(saplings(value)).toHaveLength(1); const pet = saplings(value)[0]!;
    expect(pet.memory.armed).toBe(49); expect(pet.endTick).toBe(934); expect(value.units[1].hp).toBe(100000); advance(value, 48); expect(pet.memory.phase).toBe("arming"); advance(value, 49); expect(saplings(value)).toHaveLength(0); expect(100000 - value.units[1].hp).toBe(150);
  });
  it("projectile interception destroys the fling before any real pet exists", () => {
    const value = world(300); value.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 100 }); cast(value, "E"); advance(value, 70); expect(saplings(value)).toHaveLength(0); expect(value.units[1].hp).toBe(100000);
  });
  it("snapshots actual brush at landing and scales its finite life with bonus health", () => {
    const value = world(500, { hp: 1000 }, false); cast(value, "E", 300); advance(value, 20); value.settings.environment.brush = true; advance(value, 34);
    const pet = saplings(value)[0]!; expect(pet.memory.brush).toBe(true); expect(pet.endTick).toBe(34 + 45 * 30); const before = pet.hp; damagePet(value, value.units[1], pet, 1e9, "true", false); expect(pet.hp).toBe(before);
  });
  it("empowered non-minions receive the retained 2/3 impact and two exact ordinal packets", () => {
    const value = world(500, {}, true), pet = plant(value); expect(burst(value, pet)).toBeCloseTo(100); const start = value.tick;
    advance(value, start + 22); expect(100000 - value.units[1].hp).toBeCloseTo(100); advance(value, start + 23); expect(100000 - value.units[1].hp).toBeCloseTo(200); advance(value, start + 45); expect(100000 - value.units[1].hp).toBeCloseTo(300);
    expect(value.units[1].statuses.some(status => status.key === "standardSight")).toBe(true);
  });
  it("actual minion pets receive one normal impact, without champion attached damage", () => {
    const value = world(500, {}, true), pet = plant(value), minion = enemyPet(value, pet.x); const before = minion.hp;
    compiled.spec.hooks!.onTick!(hookContext(value, value.units[0])); expect(before - minion.hp).toBe(150); const hp = minion.hp; advance(value, value.tick + 50); expect(minion.hp).toBe(hp); expect(value.units[1].hp).toBe(100000);
  });
  it("caps each actual monster body before its own area resistance", () => {
    const value = world(500, { ap: 10000 }, true), pet = plant(value), monster = enemyPet(value, pet.x, { targetClass: "monster", areaTaken: .4 }); const start = value.tick;
    compiled.spec.hooks!.onTick!(hookContext(value, value.units[0])); expect(10000 - monster.hp).toBeCloseTo(80); advance(value, start + 45); expect(10000 - monster.hp).toBeCloseTo(240);
  });
  it("uses per-body slots, keeps owner state independent and clones every primitive clock", () => {
    const value = world(500, {}, true), pet = plant(value), monster = enemyPet(value, pet.x, { targetClass: "monster" }); value.units[1].x = pet.x; compiled.spec.hooks!.onTick!(hookContext(value, value.units[0]));
    const key = "maokai:attached:0:a"; expect(value.units[1].memory[key]).toBeDefined(); expect(monster.memory[key]).toBeDefined(); expect(value.units[0].memory[key]).toBeUndefined();
    const fork = cloneWorld(value); fork.units[1].memory[key] = 999; fork.pets.find(body => body.id === monster.id)!.memory[key] = 888; expect(value.units[1].memory[key]).not.toBe(999); expect(monster.memory[key]).not.toBe(888);
  });
  it("keeps at most two attached slots and refreshes without multiplying an immediate burst", () => {
    const value = world(500, {}, true), pet = plant(value); burst(value, pet); const key = "maokai:attached:0"; const firstA = value.units[1].memory[`${key}:a`], firstB = value.units[1].memory[`${key}:b`];
    const second = spawnPet(value, value.units[0], { ...pet.spec }, value.units[1].x); second.memory = { ...pet.memory, phase: "waiting", armed: value.tick }; value.tick += 5; compiled.spec.hooks!.onTick!(hookContext(value, value.units[0]));
    expect(100000 - value.units[1].hp).toBeCloseTo(200); expect(value.units[1].memory[`${key}:a`]).toBe(firstA); expect(value.units[1].memory[`${key}:b`]).toBe(firstB); expect(Object.keys(value.units[1].memory).filter(name => /^maokai:attached:0:[ab]$/.test(name))).toHaveLength(2);
  });
  it("tracks a chosen enemy through lost vision and expires the chase independently", () => {
    const value = world(500), pet = plant(value); value.units[1].x = pet.x + 240; pet.memory.armed = value.tick; compiled.spec.hooks!.onTick!(hookContext(value, value.units[0])); expect(pet.memory.phase).toBe("chasing");
    const x = pet.x; state(value, 1, "invisible"); value.units[1].x += 2000; advance(value, value.tick + 3); expect(pet.x).toBeGreaterThan(x); advance(value, Number(pet.memory.chaseUntil)); expect(saplings(value)).toHaveLength(0); expect(value.units[1].hp).toBe(100000);
  });
  it("natural expiry explodes at the exact boundary and ordinary death removes actual saplings", () => {
    const value = world(500), pet = plant(value); pet.endTick = value.tick + 2; value.units[1].x = pet.x; pet.memory.armed = value.tick + 100; advance(value, value.tick + 1); expect(saplings(value)).toHaveLength(1); advance(value, pet.endTick); expect(saplings(value)).toHaveLength(0); expect(100000 - value.units[1].hp).toBe(150);
    const dead = world(500), another = plant(dead); dealDamage(dead, dead.units[1], dead.units[0], 1e9, "true"); advance(dead, dead.tick + 1); expect(dead.pets).not.toContain(another);
  });
  it("resurrection clears attached slots before the next burn and untargetability retains existing burn", () => {
    const value = world(500, {}, true), pet = plant(value); burst(value, pet); const start = value.tick; state(value, 1, "untargetable"); advance(value, start + 23); expect(100000 - value.units[1].hp).toBeCloseTo(200);
    beginResurrection(value, value.units[1], { duration: 1 }); const hp = value.units[1].hp; advance(value, start + 46); expect(value.units[1].hp).toBe(hp); expect(value.units[1].memory["maokai:attached:0:b"]).toBeUndefined();
  });
  it.each(["spellShield", "parry", "invulnerable", "untargetable", "stasis"] as const)("%s denies a new brush attachment", guard => {
    const value = world(500, {}, true), pet = plant(value); value.units[1].x = pet.x; state(value, 1, guard); pet.endTick = value.tick; compiled.spec.hooks!.onTick!(hookContext(value, value.units[0]));
    expect(value.units[1].hp).toBe(100000); expect(value.units[1].memory["maokai:attached:0:a"]).toBeUndefined();
  });
});

describe("Maokai mechanics: accelerating central bramble and lateral reduction", () => {
  it("releases four trailers of one central branch with sourced spacing and acceleration", () => {
    const value = world(2000); cast(value, "R"); expect(value.missiles).toHaveLength(4); expect(value.missiles.map(missile => missile.x)).toEqual([0, -100, -200, -300]); advance(value, 0); expect(value.missiles[0]!.perTick).toBeCloseTo(100 / 30 + 300 / 900); advance(value, 80); expect(value.missiles[0]!.perTick).toBe(750 / 30);
  });
  it("stops all remaining central trailers at first champion contact and roots by traveled distance", () => {
    const value = world(1000); cast(value, "R"); advance(value, 90); expect(100000 - value.units[1].hp).toBe(300); expect(value.missiles).toHaveLength(0);
    const root = value.units[1].statuses.find(status => status.key === "root")!; expect((root.endTick - root.startTick) / 30).toBeCloseTo(Math.ceil((.75 + (1000 - value.units[1].spec.base.radius - 120) / 1000 * 1.5) * 30) / 30);
  });
  it("hits actual pets once and continues until its first actual champion-class body", () => {
    const value = world(1000), pet = enemyPet(value, 300); cast(value, "R"); advance(value, 90); expect(10000 - pet.hp).toBe(300); expect(100000 - value.units[1].hp).toBe(300); expect(value.units[1].memory).not.toBe(pet.memory);
  });
  it("an actual champion-class pet stops the branch before its distant owner", () => {
    const value = world(1000), clone = enemyPet(value, 300, { targetClass: "champion", unitClass: "clone" }); cast(value, "R"); advance(value, 90); expect(10000 - clone.hp).toBe(300); expect(value.units[1].hp).toBe(100000); expect(value.missiles).toHaveLength(0);
  });
  it("spell-shield contact still consumes the whole branch without damage or root", () => {
    const value = world(500); state(value, 1, "spellShield"); cast(value, "R"); advance(value, 80); expect(value.units[1].hp).toBe(100000); expect(value.missiles).toHaveLength(0); expect(value.units[1].statuses.some(status => status.key === "root")).toBe(false);
  });
  it("a short wall destroys only the front missile and a surviving trailer can still connect", () => {
    const value = world(500); value.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 18 }); cast(value, "R"); advance(value, 18); expect(value.missiles.length).toBeLessThan(4); expect(value.missiles.length).toBeGreaterThan(0); advance(value, 90); expect(100000 - value.units[1].hp).toBe(300);
  });
  it("already-released missiles continue after owner death and movement haste decays", () => {
    const value = world(500); cast(value, "R"); dealDamage(value, value.units[1], value.units[0], 1e9, "true"); value.units[0].alive = false;
    for (let tick = 0; tick < 90; tick++) { value.tick = tick; advanceMissiles(value); } expect(100000 - value.units[1].hp).toBe(300);
    const alive = world(500); cast(alive, "R"); advance(alive, 60); const haste = derive(alive.units[0]).rawMoveSpeed; advance(alive, 120); expect(derive(alive.units[0]).rawMoveSpeed).toBeLessThan(haste);
  });
  it.each([0, 1] as const)("uses directionTo at exact overlap for side %s", side => {
    const value = createWorld({ fighters: side === 0 ? [spec(), dummy()] : [dummy(), spec()], distance: 0, modes: ["idle", "idle"] }); value.units[0].x = value.units[1].x = 0;
    const self = value.units[side]; startCast(value, self, self.spec.abilities.find(spell => spell.key === "R")!); expect(value.missiles[0]!.direction).toBe(directionTo(self, value.units[1 - side]!));
  });
});
