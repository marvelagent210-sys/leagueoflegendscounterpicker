import { readFileSync } from "node:fs";
import { damagePerSecond, type StatPrices } from "../../engine/budget";
import { simulateMatchup } from "../../engine/sim/matchup";
import { flat } from "../../kits/champions/util";
import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { attackRange, canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canSee, hookContext } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Caitlyn from "../../kits/champions/Caitlyn";
import Jhin from "../../kits/champions/Jhin";
import { championData, kit, records, pets } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";

const compiled = Object.fromEntries([Caitlyn, Jhin].map((module) => [module.champion, compileKit(championData(module.champion), records(module.champion), module, {}, pets(module.champion))]));
const spell = (world: World, key: string) => world.units[0].spec.abilities.find((ability) => ability.key === key)!;
function worldFor(champion: "Caitlyn" | "Jhin", distance = 300, bonus: FighterSpec["bonus"] = {}) {
  const original = compiled[champion]!.spec;
  const self: FighterSpec = { ...original, base: { ...original.base, hp: 3000, hpRegen: 0, ad: 100, armor: 0, mr: 0, resource: 10000, resourceRegen: 0, attackSpeed: { ...original.base.attackSpeed, bonus: 0 } }, bonus: { ap: 100, ...bonus } };
  const world = createWorld({ fighters: [self, fighter({ base: { hp: 20000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 40, log: true } });
  world.units[0].x = 0; world.units[1].x = distance;
  applyEffect(world, world.units[1], world.units[1], { type: "cc", cc: "root", duration: 40 }, { scale: 1 });
  return world;
}
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function cast(world: World, key: string, distance?: number) { return startCast(world, world.units[0], spell(world, key), distance === undefined ? undefined : { direction: 1, distance }); }
function hit(world: World, key: string) { const ability = spell(world, key); abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? []); }
function attack(world: World) { const self = world.units[0]; self.attackReadyTick = world.tick; startAttack(world, self); launchAttack(world, self); through(world, world.tick + 8); }
function state(world: World, key: "spellShield" | "parry" | "dodgeAttacks" | "blockAttacks" | "untargetable" | "invulnerable" | "invisible", seconds = 5, self = false) { const target = world.units[self ? 0 : 1]; applyEffect(world, target, target, { type: "state", state: key, duration: seconds }, { scale: 1 }); }
function pet(world: World, x: number, hp = 5000) { return spawnPet(world, world.units[1], { kind: "dummy", name: "Target pet", hp, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 40 }, x); }

describe("Caitlyn and Jhin pinned numeric/evidence contracts", () => {
  it.each(["Caitlyn", "Jhin"] as const)("%s builds all five pinned slots with finite metadata and explicit assumptions", (champion) => {
    const kit = compiled[champion]!; expect(kit.evidence.length).toBeGreaterThan(60); expect(kit.assumptions.length).toBeGreaterThan(3);
    expect(new Set(kit.spec.abilities.filter((ability) => ability.slot !== "other").map((ability) => ability.slot))).toEqual(new Set(["Q", "W", "E", "R"]));
    for (const ability of kit.spec.abilities) expect(Number.isFinite(ability.cooldown) && Number.isFinite(ability.castTime)).toBe(true);
  });
  it.each([
    ["Caitlyn", "Q", 6, 75, .625], ["Caitlyn", "W", .5, 20, .25], ["Caitlyn", "E", 8, 75, .15], ["Caitlyn", "R", 90, 100, .375],
    ["Jhin", "Q", 5, 60, .25], ["Jhin", "W", 12, 70, .75], ["Jhin", "E", 2, 30, .25], ["Jhin", "R", 90, 100, 1],
  ] as const)("%s %s retains cooldown %s, cost %s and cast %s", (champion, key, cooldown, cost, castTime) => {
    const ability = compiled[champion]!.spec.abilities.find((entry) => entry.key === key)!; expect(ability).toMatchObject({ cooldown, cost, castTime });
  });
  it("retains independently attributed pinned game continuation and rejects changed raw critical templates", () => {
    expect(compiled.Jhin!.evidence.some((entry) => entry.revid === 0 && entry.sourceVersion?.startsWith("16.21.") && entry.url?.includes("/16.21/"))).toBe(true);
    const changed = structuredClone(records("Caitlyn")); changed.find((entry) => entry.kind === "I")!.sources = [];
    expect(() => compileKit(championData("Caitlyn"), changed, Caitlyn)).toThrow("critical damage|0 to 80");
  });
});

describe("Caitlyn Headshot single attack packet and target grants", () => {
  it("fires the sixth ordinary attack as Headshot and resets Count on declaration", () => {
    const world = worldFor("Caitlyn");
    for (let index = 0; index < 5; index++) attack(world);
    expect(world.units[1].totals.damageTaken).toBe(500); expect(world.units[0].memory.caitlynCount).toBe(5);
    attack(world); expect(world.units[1].totals.damageTaken).toBe(680); expect(world.units[0].memory.caitlynCount).toBe(0);
  });
  it.each([[0, 180], [.25, 225], [1, 360]])("averages crit=%s once in ordinary AD plus additive Headshot =>%s", (critChance, expected) => {
    const world = worldFor("Caitlyn", 300, { critChance }); world.units[0].memory.caitlynCount = 5;
    attack(world); expect(world.units[1].totals.damageTaken).toBeCloseTo(expected, 9);
    expect(world.log.filter((entry) => entry.text.includes("physical damage"))).toHaveLength(1);
  });
  it("snapshots crit chance, uses a 3000 missile and keeps an uncancellable windup", () => {
    const world = worldFor("Caitlyn", 300, { critChance: .5 }), self = world.units[0]; self.memory.caitlynCount = 5;
    startAttack(world, self); expect(self.action).toMatchObject({ kind: "windup", uncancellable: true, missileSpeed: 3000 });
    applyEffect(world, world.units[1], self, { type: "cc", cc: "stun", duration: .5 }, { scale: 1 }); expect(self.action?.kind).toBe("windup");
    self.spec = { ...self.spec, bonus: { ap: 100, critChance: 0 } }; launchAttack(world, self); through(world, 8);
    expect(world.units[1].totals.damageTaken).toBe(270);
  });
  it.each(["dodgeAttacks", "parry", "blockAttacks"] as const)("%s prevents the complete Headshot packet", (defense) => {
    const world = worldFor("Caitlyn"); world.units[0].memory.caitlynCount = 5; state(world, defense); attack(world); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("nets and traps grant independent Headshots preserving Count and champion-only extended range", () => {
    const world = worldFor("Caitlyn", 1000); hit(world, "W"); hit(world, "E"); world.units[0].memory.caitlynCount = 2;
    expect(attackRange(world.units[0], world.units[1])).toBe(1300);
    const summon = pet(world, 1000); expect(attackRange(world.units[0], petFormulaTarget(summon, world.units[0]))).toBe(650);
    const before = world.units[1].totals.damageTaken; attack(world); through(world, world.tick + 12);
    expect(world.units[1].totals.damageTaken - before).toBe(395); expect(world.units[0].memory.caitlynCount).toBe(3);
    attack(world); through(world, world.tick + 12); expect(world.units[0].memory.caitlynCount).toBe(4); expect(attackRange(world.units[0], world.units[1])).toBe(650);
  });
  it("expires net's extra Headshot exactly after 1.8 seconds", () => {
    const world = worldFor("Caitlyn", 1000); hit(world, "E"); through(world, 53); expect(attackRange(world.units[0], world.units[1])).toBe(1300);
    through(world, 54); expect(attackRange(world.units[0], world.units[1])).toBe(650);
  });
  it("uses the 110% nonchampion Headshot in a real pet basic attack", () => {
    const world = worldFor("Caitlyn", 800), summon = pet(world, 300); world.units[0].memory.caitlynCount = 5;
    startAttack(world, world.units[0], summon); launchAttack(world, world.units[0]); through(world, 10); expect(summon.hp).toBe(4790);
  });
});

describe("Caitlyn Q, net, finite traps and channel", () => {
  it("Q damages the first pet fully and the following champion for 60%, expanding the missile", () => {
    const world = worldFor("Caitlyn", 600), summon = pet(world, 250); cast(world, "Q"); through(world, 35);
    expect(summon.hp).toBe(4565); expect(world.units[1].totals.damageTaken).toBe(261);
  });
  it("Q deals full damage to a champion still trap-revealed after an earlier pet collision", () => {
    const world = worldFor("Caitlyn", 600); pet(world, 250); hit(world, "W"); cast(world, "Q"); through(world, 35); expect(world.units[1].totals.damageTaken).toBe(435);
  });
  it("Q retains cast-start origin while net retains completion origin", () => {
    const world = worldFor("Caitlyn", 1000); cast(world, "Q"); world.units[0].x = 300; through(world, 19); expect(world.missiles.find((missile) => missile.source === "Q")?.x).toBe(0);
  });
  it("Q does not reset the attack timer from an invulnerable pet", () => {
    const world = worldFor("Caitlyn", 1000), summon = pet(world, 250); summon.statuses = [{ kind: "state", key: "invulnerable", source: 1, startTick: 0, endTick: 100, value: 1 }];
    world.units[0].attackReadyTick = 900; cast(world, "Q"); world.units[0].attackReadyTick = 900; through(world, 27); expect(world.units[0].attackReadyTick).toBe(900);
  });
  it("net damages/slows, marks for Headshot and recoils 390 in 0.4 quantized seconds", () => {
    const world = worldFor("Caitlyn", 300); cast(world, "E"); through(world, 19);
    expect(world.units[0].x).toBeCloseTo(-390, 8); expect(world.units[1].totals.damageTaken).toBe(360);
    expect(world.units[1].statuses.some((status) => status.key === "slow" && status.value === .5)).toBe(true);
    expect(attackRange(world.units[0], world.units[1])).toBe(1300);
  });
  it("immobilization during net cast prevents recoil while preserving the fired net", () => {
    const world = worldFor("Caitlyn", 300); cast(world, "E"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); through(world, 20);
    expect(world.units[0].x).toBe(0); expect(world.units[1].totals.damageTaken).toBe(360);
  });
  it("suppression during net cast prevents both missile and recoil while still charging mana", () => {
    const world = worldFor("Caitlyn", 300), before = world.units[0].resource; cast(world, "E"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "suppression", duration: 1 }, { scale: 1 }); through(world, 20);
    expect(world.units[0].x).toBe(0); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].resource).toBe(before - 75);
  });
  it("traps arm after a second, root/reveal on contact and spend one of five charges", () => {
    const world = worldFor("Caitlyn", 300); cast(world, "W"); through(world, 37); expect(world.units[1].statuses.some((status) => status.key === "caitlyn:trap")).toBe(false);
    through(world, 38); expect(world.units[1].statuses.some((status) => status.key === "caitlyn:trap")).toBe(true); expect(world.units[0].charges.W?.count).toBe(4);
  });
  it("a sprung trap makes its champion immune to every trap for three seconds, wherever it lies (26.21)", () => {
    const world = worldFor("Caitlyn", 300); cast(world, "W"); through(world, 38);
    expect(world.units[1].statuses.some((status) => status.key === "caitlyn:trap")).toBe(true);
    const until = Number(world.units[0].memory.caitlynTrapImmuneUntil);
    expect(until).toBe(38 + 90); // sprung at tick 38, immune for 3 s
    cast(world, "W", 600); through(world, world.tick + 45);
    world.units[1].x = 600;
    const second = () => world.zones.some((zone) => zone.ability === "W" && zone.x === 600);
    through(world, until - 2); expect(second()).toBe(true);
    through(world, until + 5); expect(second()).toBe(false);
  });
  it("limits persistent traps to five, removing the oldest without a destruction kill", () => {
    const world = worldFor("Caitlyn", 800); world.units[1].x = 3000;
    for (let i = 0; i < 6; i++) { cast(world, "W", 200 + i * 30); through(world, world.tick + 9); }
    const traps = world.zones.filter((zone) => zone.ability === "W"); expect(traps).toHaveLength(5); expect(Math.min(...traps.map((zone) => zone.x))).toBe(230);
  });
  it("spell shield consumes a trap without root, true sight or extra Headshot", () => {
    const world = worldFor("Caitlyn"); state(world, "spellShield"); hit(world, "W"); expect(world.units[1].statuses.some((status) => status.key === "caitlyn:trap")).toBe(false); expect(hasState(world.units[1], "revealed")).toBe(false);
  });
  it("R waits for its cast plus channel, launches a homing bullet and scales by 30% at full crit", () => {
    const world = worldFor("Caitlyn", 1000, { critChance: 1 }); cast(world, "R"); through(world, 41); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].action?.kind).toBe("channel");
    through(world, 42); expect(world.missiles.some((missile) => missile.source === "Rshot")).toBe(true); through(world, 55); expect(world.units[1].totals.damageTaken).toBe(845);
  });
  it("R interruption spends mana, starts its five-second cooldown and leaves one-second target reveal", () => {
    const world = worldFor("Caitlyn", 1000); cast(world, "R"); through(world, 15); const now = world.tick;
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: .5 }, { scale: 1 });
    expect(world.units[0].action).toBeUndefined(); expect(world.units[0].resource).toBe(9900); expect(world.units[0].cooldownReady.R).toBe(now + 150);
    expect(world.units[1].statuses.find((status) => status.memoKey === "caitlyn:Rreveal")?.endTick).toBe(now + 30);
  });
  it("R target true sight exposes invisibility without giving Caitlyn herself true sight", () => {
    const world = worldFor("Caitlyn", 1000); state(world, "invisible"); state(world, "invisible", 5, true); cast(world, "R");
    expect(canSee(world.units[1], world.units[0])).toBe(true); expect(canSee(world.units[0], world.units[1])).toBe(false);
  });
  it("target untargetability during channel cancels R instead of damaging a replacement target", () => {
    const world = worldFor("Caitlyn", 1000); cast(world, "R"); through(world, 15); state(world, "untargetable"); through(world, 50);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.missiles.some((missile) => missile.source === "Rshot")).toBe(false); expect(world.units[0].cooldownReady.R).toBe(166);
  });
});

describe("Jhin stat conversions, ammunition and reload", () => {
  it.each([[0, 0, 152], [1, 0, 187], [0, 1, 182], [1, 1, 217]])("level20 AD conversion crit=%s bonusAS=%s =>%s", (critChance, attackSpeed, expected) => {
    const world = worldFor("Jhin", 300, { critChance, attackSpeed }); expect(derive(world.units[0]).ad).toBeCloseTo(expected, 9); expect(derive(world.units[0]).attackSpeed).toBe(.625);
  });
  it("applies AD reduction before the multiplier and ignores cripples without losing their AS conversion", () => {
    const world = worldFor("Jhin", 300, { attackSpeed: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "stat", stat: "totalADReduction", amount: flat(20), duration: 2 }, { scale: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "cripple", strength: .9, duration: 2 }, { scale: 1 });
    expect(derive(world.units[0]).ad).toBeCloseTo(145.6, 9); expect(derive(world.units[0]).attackSpeed).toBe(.625);
  });
  it("three ordinary rounds precede a guaranteed critical fourth with current missing-health bonus", () => {
    const world = worldFor("Jhin"); for (let i = 0; i < 3; i++) attack(world); expect(world.units[1].totals.damageTaken).toBe(456);
    attack(world); expect(world.units[1].totals.damageTaken).toBe(456 + 228 + .25 * 456); expect(world.units[0].memory.jhinAmmo).toBe(0); expect(hasState(world.units[0], "noAttacks")).toBe(true);
  });
  it("does not spend ammunition from a canceled ordinary windup", () => {
    const world = worldFor("Jhin"); startAttack(world, world.units[0]); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 1 }, { scale: 1 }); through(world, 20);
    expect(world.units[0].memory.jhinAmmo).toBe(4); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("finishes an uncancellable fourth under stun and reloads exactly 2.5 seconds after launch", () => {
    const world = worldFor("Jhin"); world.units[0].memory.jhinAmmo = 1; startAttack(world, world.units[0]); expect(world.units[0].action).toMatchObject({ uncancellable: true, critChance: 1, missileSpeed: 3000 });
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 1 }, { scale: 1 }); launchAttack(world, world.units[0]); expect(canStartAttack(world, world.units[0])).toBe(false);
    through(world, 74); expect(world.units[0].memory.jhinAmmo).toBe(0); through(world, 75); expect(world.units[0].memory.jhinAmmo).toBe(4); expect(hasState(world.units[0], "noAttacks")).toBe(false);
  });
  it("casts Q during a hard reload without refilling ammunition", () => {
    const world = worldFor("Jhin"); world.units[0].memory.jhinAmmo = 1; attack(world); expect(canCast(world, world.units[0], spell(world, "Q"))).toBe(true); cast(world, "Q"); through(world, 30); expect(world.units[0].memory.jhinAmmo).toBe(0); expect(world.units[1].totals.damageTaken).toBeGreaterThan(228);
  });
  it("idle partial reload begins at ten seconds and can be canceled by an announced spell", () => {
    const world = worldFor("Jhin"); world.units[0].memory.jhinAmmo = 3; through(world, 299); expect(world.units[0].memory.jhinSoftReload).toBeUndefined(); through(world, 300); expect(world.units[0].memory.jhinSoftReload).toBe(true);
    cast(world, "W"); expect(world.units[0].memory.jhinSoftReload).toBeUndefined(); expect(world.units[0].memory.jhinAmmo).toBe(3);
  });
  it("ordinary expected critical movement and missile speed use the declared crit chance", () => {
    const world = worldFor("Jhin", 300, { critChance: .5, attackSpeed: 1 }); startAttack(world, world.units[0]); expect(world.units[0].action).toMatchObject({ missileSpeed: 2800 }); launchAttack(world, world.units[0]); through(world, 10);
    expect(world.units[0].statuses.find((status) => status.memoKey === "buff:jhin:criticalMove")?.value).toBeCloseTo(.29, 9);
  });
});

describe("Jhin actual grenade bounces, instant W and Lotus traps", () => {
  it("Q deals its full numeric packet and cannot bounce back to the same champion", () => {
    const world = worldFor("Jhin"); cast(world, "Q"); through(world, 60); expect(world.units[1].totals.damageTaken).toBeCloseTo(316.48, 9); expect(world.missiles).toHaveLength(0);
  });
  it("Q continues after a spell shield to an actual pet, without double hitting the champion", () => {
    const world = worldFor("Jhin"), summon = pet(world, 500); state(world, "spellShield"); cast(world, "Q"); through(world, 60);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(summon.hp).toBeCloseTo(4683.52, 9);
  });
  it("Q adds 35% per preceding killed pet while visiting at most four enemies", () => {
    const world = worldFor("Jhin"), first = pet(world, 400, 100), second = pet(world, 500, 100), third = pet(world, 600), fourth = pet(world, 700);
    cast(world, "Q"); through(world, 70);
    expect(world.pets.includes(first)).toBe(false); expect(world.pets.includes(second)).toBe(false); expect(third.hp).toBeCloseTo(5000 - 316.48 * 1.7, 9); expect(fourth.hp).toBe(5000);
  });
  it("an untargetable original Q target makes the grenade fizzle without a free pet bounce", () => {
    const world = worldFor("Jhin"), summon = pet(world, 500); cast(world, "Q"); through(world, 8); state(world, "untargetable"); through(world, 50); expect(summon.hp).toBe(5000); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("the first unmarked W deals damage but only a later marked W roots", () => {
    const world = worldFor("Jhin"); hit(world, "W"); expect(world.units[1].totals.damageTaken).toBe(286); expect(world.units[1].statuses.filter((status) => status.key === "root")).toHaveLength(1);
    hit(world, "W"); expect(world.units[1].statuses.filter((status) => status.key === "root")).toHaveLength(2); expect(world.units[0].statuses.some((status) => status.key === "moveSpeedPercent")).toBe(true);
  });
  it("W damages a pet before the champion at 75% and leaves a pet behind the champion untouched", () => {
    const world = worldFor("Jhin", 700), front = pet(world, 300), behind = pet(world, 1000); cast(world, "W"); through(world, 23);
    expect(front.hp).toBeCloseTo(4785.5, 9); expect(behind.hp).toBe(5000); expect(world.units[1].totals.damageTaken).toBe(286);
  });
  it("an intervening wall blocks instantaneous W and its farther pet damage", () => {
    const world = worldFor("Jhin", 700), summon = pet(world, 400); world.zones.push({ id: 900, kind: "projectileWall", owner: 1, x: 200, radius: 0, startTick: 0, endTick: 100, seenTick: 0 }); cast(world, "W"); through(world, 23);
    expect(summon.hp).toBe(5000); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("a nearby pet blooms an armed trap while a distant champion remains outside its damage", () => {
    const world = worldFor("Jhin", 900), summon = pet(world, 300); cast(world, "E", 300); through(world, 38);
    expect(world.zones.some((zone) => zone.ability === "Ebloom")).toBe(true); expect(world.pets.some((entry) => entry.spec.kind === "lotus")).toBe(false); through(world, 99);
    expect(summon.hp).toBeCloseTo(5000 - 542.4 * .65, 8); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("trap slow stops on leaving its fixed bloom and an explosion can be dodged spatially", () => {
    const world = worldFor("Jhin"); cast(world, "E"); through(world, 39); expect(world.units[1].statuses.some((status) => status.key === "slow")).toBe(true);
    world.units[1].x = 1000; through(world, 41); expect(world.units[1].statuses.some((status) => status.key === "slow")).toBe(false); through(world, 100); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("trap ordinary reveal marks for W but does not expose invisibility", () => {
    const world = worldFor("Jhin"); cast(world, "E"); through(world, 38); state(world, "invisible"); expect(world.units[1].statuses.some((status) => status.key === "jhin:caught")).toBe(true); expect(canSee(world.units[1], world.units[0])).toBe(false);
  });
  it("an unarmed Lotus body takes three champion attacks, then cannot bloom", () => {
    const world = worldFor("Jhin"); cast(world, "E"); through(world, 8); const trap = world.pets.find((entry) => entry.spec.kind === "lotus")!;
    expect(trap.hp).toBe(3); trap.hp = 0; world.pets = world.pets.filter((entry) => entry !== trap); through(world, 100); expect(world.zones.some((zone) => zone.ability === "Ebloom")).toBe(false); expect(world.units[1].totals.damageTaken).toBe(0);
  });
});

describe("Jhin Curtain Call exact channel/recast/projectile transactions", () => {
  it.each([1, 2, 3, 4])("shot %s retains .25 lock, .2 emission and one-second static cooldown", (round) => {
    const ability = compiled.Jhin!.spec.abilities.find((entry) => entry.key === `R${round}`)!; expect(ability).toMatchObject({ castTime: .25, deliveryDuringCastAt: .2, cooldown: 1, staticCooldown: true, cooldownAtCastStart: true, preserveChannel: true });
  });
  it("the opening channels without spending any basic round or immediately damaging", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); expect(world.units[0].action).toMatchObject({ kind: "channel", ability: "R", endTick: 330 }); expect(world.units[0].memory.jhinAmmo).toBe(4); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("shot one emits at .2, preserves its original absolute channel end and locks through .25", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); const start = world.tick; cast(world, "R1"); through(world, start + 5); expect(world.missiles.some((missile) => missile.source === "R1")).toBe(false);
    through(world, start + 6); expect(world.missiles.some((missile) => missile.source === "R1")).toBe(true); expect(world.units[0].action?.kind).toBe("cast"); through(world, start + 8); expect(world.units[0].action).toMatchObject({ kind: "channel", endTick: 330 }); expect(world.units[0].cooldownReady.Rshot).toBe(start + 30);
  });
  it.each([[1, 1], [4, 2]])("shot %s multiplies impact missing health and fourth factor %s", (round, factor) => {
    const world = worldFor("Jhin", 1000); world.units[1].hp = 10000; const ability = spell(world, `R${round}`); abilityHit(world, world.units[0], world.units[1], ability, ability.onHit!);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(230 * 2.5 * factor, 9);
  });
  it("a shot pierces pets without slowing them and stops at a shielded champion", () => {
    const world = worldFor("Jhin", 1000), front = pet(world, 400), behind = pet(world, 1400); state(world, "spellShield", 10); cast(world, "R"); through(world, 30); cast(world, "R1"); through(world, 55);
    expect(front.hp).toBe(4770); expect(front.statuses?.some((status) => status.key === "slow")).toBe(false); expect(world.units[1].totals.damageTaken).toBe(0); expect(behind.hp).toBe(5000);
  });
  it("a target crossing behind after announcement cannot turn the shot through the fixed cone", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); cast(world, "R1"); world.units[1].x = -1000; through(world, 45);
    expect(world.missiles.find((missile) => missile.source === "R1")?.direction).toBe(1); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("CC during a shot drops its parent channel while completing the announced shot once", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); cast(world, "R1"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 1 }, { scale: 1 }); through(world, 55);
    expect(world.units[1].totals.damageTaken).toBe(230); expect(world.units[0].action).toBeUndefined(); expect(world.units[0].memory.jhinRround).toBe(1); expect(canCast(world, world.units[0], spell(world, "R2"))).toBe(false);
  });
  it("fourth completion ends the channel without granting a fifth shot or reloading basics", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); world.units[0].memory.jhinRround = 3; cast(world, "R4"); through(world, 42);
    expect(world.units[0].action).toBeUndefined(); expect(world.units[0].memory.jhinAmmo).toBe(4); expect(world.units[0].cooldownHeld.R).toBeUndefined(); expect(Number.isFinite(world.units[0].cooldownReady.R)).toBe(true);
  });
  it("world cloning preserves independent ammo, marks, traps and retained recast channel", () => {
    const world = worldFor("Jhin", 1000); cast(world, "R"); through(world, 30); cast(world, "R1"); const copy = cloneWorld(world); copy.units[0].memory.jhinAmmo = 1;
    expect(world.units[0].memory.jhinAmmo).toBe(4); expect(copy.units[0].action).not.toBe(world.units[0].action); through(copy, 55); through(world, 55); expect(copy.units[1].totals.damageTaken).toBe(world.units[1].totals.damageTaken);
  });
});


describe("Caitlyn/Jhin policy, delayed prediction and budget contracts", () => {
  it("Jhin's actual level-20 zero-ratio record keeps growth while external AS and cripples cannot change its rhythm", () => {
    const world = createWorld({ fighters: [compiled.Jhin!.spec, fighter()], distance: 500, modes: ["idle", "idle"] });
    const self = world.units[0];
    expect(self.spec.base.attackSpeed.ratio).toBe(0);
    expect(self.spec.base.attackSpeed.bonus).toBeCloseTo(.03 * 19.665, 12);
    expect(derive(self).attackSpeed).toBeCloseTo(.99371875, 12);
    self.spec = { ...self.spec, bonus: { attackSpeed: 2 } };
    applyEffect(world, world.units[1], self, { type: "cc", cc: "cripple", strength: .9, duration: 5 }, { scale: 1 });
    expect(derive(self).attackSpeed).toBeCloseTo(.99371875, 12);
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(2.58995, 12);
  });
  it("Caitlyn's cast/channel preserves a spell shield until the real homing shot arrives", () => {
    const world = worldFor("Caitlyn", 1000); world.settings.reactionTime = 0;
    state(world, "spellShield"); cast(world, "R"); through(world, 12);
    expect(hasState(world.units[1], "spellShield")).toBe(true);
    expect(perceive(world, 1).threats.find((entry) => entry.source === "Rshot"))
      .toMatchObject({ damage: 650, projectile: true, spellShieldable: true });
    expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 65);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("Jhin's ordinary policy fires all four separately timed shots when its channel is uninterrupted", () => {
    const world = worldFor("Jhin", 1000); world.modes[0] = "fight";
    for (; world.tick <= 130;) step(world, [world.units[0].spec.behavior!, standStill]);
    const shots = world.log.filter((entry) => entry.side === 0 && entry.text.startsWith("casts Curtain Call: shot"));
    expect(shots.map((entry) => [entry.tick, entry.text])).toEqual([
      [30, "casts Curtain Call: shot 1"], [60, "casts Curtain Call: shot 2"],
      [90, "casts Curtain Call: shot 3"], [120, "casts Curtain Call: shot 4"],
    ]);
    expect(world.units[0].action?.kind).not.toBe("channel");
    expect(world.log.some((entry) => entry.text.includes("Curtain Call interrupted"))).toBe(false);
  });
  it.each([["Caitlyn", 650, 51], ["Jhin", 230, 42]] as const)("%s predicts only its next R hit at the full launch-plus-flight delay", (champion, damage, eta) => {
    const world = worldFor(champion, 1000); world.settings.reactionTime = 0; cast(world, "R");
    const threat = perceive(world, 1).threats.find((entry) => entry.source === (champion === "Caitlyn" ? "Rshot" : "R"))!;
    expect(threat).toMatchObject({ damage, eta, projectile: true, spellShieldable: true });
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("Caitlyn's normal policy fires R at a distant lethal target and saves it against full health", () => {
    const world = worldFor("Caitlyn", 1800); world.modes[0] = "fight";
    expect(compiled.Caitlyn!.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" });
    world.units[1].hp = 600; expect(compiled.Caitlyn!.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "R" });
    through(world, 60); // Fixture behaviors stand still; the decision itself must not execute the cast.
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("Caitlyn's lethal R policy accounts for shields and resists", () => {
    const world = worldFor("Caitlyn", 1800); world.modes[0] = "fight"; world.units[1].hp = 600;
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    expect(compiled.Caitlyn!.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" });
    world.units[1].statuses = []; world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, armor: 100 } };
    expect(compiled.Caitlyn!.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" });
  });
  it.each([[0, 650], [1, 845]])("Caitlyn's hook budget includes exactly one crit-scaled R per parent cycle at crit=%s", (critChance, bullet) => {
    const world = worldFor("Caitlyn", 1000, { critChance }); const [self, target] = world.units;
    const hint = self.spec.budget!.damage!(self, target)!;
    expect(hint.physical).toBeCloseTo(100 * (1 + critChance) * .681 * .8 / 6 + bullet / 90.375, 10);
  });
  it("Jhin's four manual recasts never become a spammable one-second budget spell", () => {
    const world = worldFor("Jhin"), [self, target] = world.units;
    const shots = self.spec.abilities.filter((ability) => /^R[1-4]$/.test(ability.key));
    expect(shots).toHaveLength(4); expect(shots.every((ability) => ability.budgetExcluded)).toBe(true);
    expect(damagePerSecond({ ...self.spec, abilities: shots, budget: { attacks: false } }, target.spec).physical).toBe(0);
    const cycle = 3 / .625 + 2.5 + Math.ceil(30 * (.15625 / .625)) / 30;
    expect(self.spec.budget!.damage!(self, target)!.physical).toBeCloseTo((3 * 152 + 228) / cycle + 5 * 230 / 94.25, 9);
  });
  it("Caitlyn net crosses intervening terrain when its endpoint is clear", () => {
    const world = worldFor("Caitlyn"); world.terrain.push({ id: 900, owner: 1, from: -220, to: -150, endTick: 100 });
    cast(world, "E"); through(world, 20); expect(world.units[0].x).toBeCloseTo(-390, 9);
  });
  it("Caitlyn net clips a wall-overlapping endpoint to the near edge", () => {
    const world = worldFor("Caitlyn"); world.terrain.push({ id: 900, owner: 1, from: -450, to: -350, endTick: 100 });
    cast(world, "E"); through(world, 20); expect(world.units[0].x).toBeCloseTo(-350 + world.units[0].spec.base.pathingRadius, 9);
  });
  it.each(["Caitlyn", "Jhin"] as const)("%s spends 15000 on actual stats and reflects every scenario through the normal policy", (champion) => {
    const spec = compiled[champion]!.spec, darius = kit("Darius").spec;
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const forward = simulateMatchup(spec, darius, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(darius, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    for (const build of forward.builds) expect(Object.values(build.spent).reduce((sum, cost) => sum + cost, 0)).toBeCloseTo(15000, 8);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
    }
    const casts = forward.scenarios.flatMap((scenario) => scenario.outcomes.flatMap((outcome) => outcome.timeline.filter((entry) => entry.side === 0 && entry.text.startsWith("casts ")).map((entry) => entry.text)));
    for (const key of ["Q", "W", "E"]) expect(casts).toContain(`casts ${spec.abilities.find((ability) => ability.key === key)!.name}`);
    if (champion === "Jhin") {
      expect(casts).toContain("casts Curtain Call: shot 3");
      expect(forward.scenarios.flatMap((scenario) => scenario.outcomes.flatMap((outcome) => outcome.timeline))
        .some((entry) => entry.side === 0 && entry.text === "Curtain Call interrupted by airborne")).toBe(true);
    }
  }, 60000);
});
