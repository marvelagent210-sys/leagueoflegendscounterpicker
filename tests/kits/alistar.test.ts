import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, beginResurrection, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { destroyPet, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { DEFAULT_SETTINGS, cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Alistar from "../../kits/champions/Alistar";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Alistar"), records("Alistar"), Alistar);
const subject = (bonus: FighterSpec["bonus"] = {}) => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const arena = (distance = 100, bonus: FighterSpec["bonus"] = {}) => {
  const world = createWorld({ fighters: [subject(bonus), fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, maxBranches: 1, environment: { ...DEFAULT_SETTINGS.environment, walls: false } } });
  world.units[0].x = 0; world.units[1].x = distance; return world;
};
const spell = (world: World, key: string) => world.units[0].spec.abilities.find(a => a.key === key)!;
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [idle, idle]); };
const cast = (world: World, key: string, aim?: { direction: -1 | 1; distance?: number }) => startCast(world, world.units[0], spell(world, key), aim);
const finish = (world: World, key: string) => { cast(world, key); const action = world.units[0].action; if (action?.kind === "cast") through(world, action.endTick); };
const state = (world: World, key: StateType, side: 0 | 1 = 1, duration = 20) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration }, { scale: 1 });
const cc = (world: World, kind: string) => world.units[1].statuses.find(s => s.kind === "cc" && s.key === kind);
const stacks = (world: World) => Number(world.units[0].memory["alistar:roarStacks"] ?? 0);
const eStacks = (world: World) => Number(world.units[0].memory["alistar:eStacks"] ?? 0);
const pet = (world: World, x: number, extra: Partial<PetSpec> = {}, allied = false) => spawnPet(world, world.units[allied ? 0 : 1], { kind: "actual", name: "Actual summon", hp: 5000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 30, ...extra }, x);
const basic = (world: World, blinded = false) => attackHit(world, world.units[0], world.units[1], blinded, []);
const charge = (world: World) => { cast(world, "E"); through(world, 75); expect(eStacks(world)).toBe(5); };

 describe("Alistar pinned source and guards", () => {
  it("retains all five primary revision pins and exact versioned game objects", () => {
    const value = compiled();
    expect(new Set(value.evidence.filter(e => e.revid).map(e => e.revid))).toEqual(new Set([4007561, 4075173, 4075174, 4075181, 4075182]));
    const game = value.evidence.filter(e => e.url);
    expect(new Set(game.map(e => e.page)).size).toBe(5);
    expect(game.every(e => e.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && e.sourceSha256 === "dc95c7a923147d8b3eceb0f00755ee24e085611f231a4d3222d463c30d2e1f0a" && e.url === "https://raw.communitydragon.org/16.20/game/data/characters/alistar/alistar.bin.json")).toBe(true);
    expect(value.assumptions.join(" ")).toContain("FullChargeDuration"); expect(value.variants).toEqual([]);
  });
  it.each(["I", "Q", "W", "E", "R"])("fails closed when %s loses its exact game evidence", kind => {
    const changed = records("Alistar"); delete changed.find(row => row.kind === kind)!.gameSources;
    expect(() => compileKit(championData("Alistar"), changed, Alistar)).toThrow("pinned game data");
  });
  it("fails closed if a selected whole array, source attribution or primary immunity rule changes", () => {
    for (const mutate of [
      (data: ReturnType<typeof records>) => { data.find(row => row.kind === "E")!.gameSources![0]!.text = ['"name":"BonusAARange","values":[50.0]']; },
      (data: ReturnType<typeof records>) => { data.find(row => row.kind === "R")!.gameSources![0]!.sha256 = "bad"; },
      (data: ReturnType<typeof records>) => { const row = data.find(row => row.kind === "Q")!; row.notes = []; row.sources = []; },
    ]) { const changed = records("Alistar"); mutate(changed); expect(() => compileKit(championData("Alistar"), changed, Alistar)).toThrow(); }
  });
  it("compiles max rank data with separate same-name buffer and impact stages", () => {
    const world = arena(100, { ap: 100 });
    expect(spell(world, "Q")).toMatchObject({ cooldown: 10, cost: 70, castTime: .25, delivery: { radius: 375 } });
    expect(spell(world, "Qbuffer")).toMatchObject({ name: "Pulverize", cooldownKey: "Q", cost: 70, castTime: 0 });
    expect(spell(world, "Qimpact")).toMatchObject({ name: "Pulverize", cost: 0, castTime: .15 });
    expect(spell(world, "W")).toMatchObject({ cooldown: 10, cost: 70, castTime: 0 });
    expect(spell(world, "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: .25 });
    finish(world, "Q"); expect(world.units[1].hp).toBe(99700); expect(stacks(world)).toBe(1);
  });
 });

 describe("Alistar Pulverize and Headbutt mechanics", () => {
  it("Q applies simultaneous independent one-second stun and airborne once, generating one Roar stack", () => {
    const world = arena(); finish(world, "Q");
    expect(cc(world, "stun")).toMatchObject({ startTick: 8, endTick: 38, ability: "Q" });
    expect(cc(world, "airborne")).toMatchObject({ startTick: 8, endTick: 38, ability: "Q" }); expect(stacks(world)).toBe(1);
  });
  it("Q displacement immunity denies both controls while retaining damage", () => { const world = arena(); state(world, "displacementImmune"); finish(world, "Q"); expect(world.units[1].hp).toBe(99780); expect(cc(world, "stun")).toBeUndefined(); expect(cc(world, "airborne")).toBeUndefined(); expect(stacks(world)).toBe(0); });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("Q respects %s with no false Roar credit", guard => { const world = arena(); state(world, guard); finish(world, "Q"); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("Q checks actual occupancy at cast completion", () => { const world = arena(); cast(world, "Q"); world.units[1].x = 1000; through(world, 8); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("W uses inverse-radius speed, arrives at the fixed center, then independently knocks and stuns", () => {
    const world = arena(650, { ap: 100 }); cast(world, "W");
    const [self, target] = world.units, distance = 650, radii = self.spec.base.radius + target.spec.base.radius;
    const speed = 1200 * distance / (distance - radii), ticks = Math.ceil(distance / speed * 30 - 1e-9);
    expect(self.memory["alistar:wSpeed"]).toBe(speed); expect(self.action).toMatchObject({ kind: "dash", endTick: ticks }); expect(canStartAttack(world, self)).toBe(false);
    through(world, ticks); expect(self.x).toBeCloseTo(650, 10); expect(target.hp).toBe(99625);
    expect(cc(world, "airborne")).toMatchObject({ startTick: ticks, endTick: ticks + 15 }); expect(cc(world, "stun")).toMatchObject({ startTick: ticks, endTick: ticks + 23 }); expect(stacks(world)).toBe(1);
    through(world, ticks + 15); expect(target.x).toBeCloseTo(1350, 8);
  });
  it("overlapping radii use the 1200 speed branch and co-location has a stable outward direction", () => { const world = arena(0); const dir = directionTo(...world.units); cast(world, "W"); expect(world.units[0].memory["alistar:wSpeed"]).toBe(1200); through(world, 1); through(world, 16); expect(world.units[1].x).toBeCloseTo(dir * 700, 8); });
  it("W arrival guard misses a target that moved more than 400 units from the endpoint", () => { const world = arena(650); cast(world, "W"); world.units[1].x = 1200; through(world, 30); expect(world.units[0].x).toBeCloseTo(650, 10); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("W's knockback direction uses cast origin after the enemy crosses Alistar during the dash", () => { const world = arena(650); cast(world, "W"); world.units[1].x = 300; through(world, 30); expect(world.units[1].x).toBeCloseTo(1000, 8); });
  it("W displacement immunity retains its .75-second stun and one Roar credit", () => { const world = arena(500); state(world, "displacementImmune"); cast(world, "W"); through(world, 30); expect(cc(world, "airborne")).toBeUndefined(); expect(cc(world, "stun")).toBeDefined(); expect(world.units[1].x).toBe(500); expect(stacks(world)).toBe(1); });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("W checks %s at arrival independently from its traveled dash", guard => { const world = arena(500); cast(world, "W"); state(world, guard); through(world, 30); expect(world.units[0].x).toBeCloseTo(500, 10); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("a grounded or rooted Alistar cannot declare W, and out-of-range enemies are invalid", () => { const world = arena(651); expect(canCast(world, world.units[0], spell(world, "W"))).toBe(false); world.units[1].x = 500; applyCC(world, world.units[1], world.units[0], "root", 1); expect(canCast(world, world.units[0], spell(world, "W"))).toBe(false); });
  it("buffered Q pays once, reduces W knockback to 200, and casts after the dash at .15 seconds", () => {
    const world = arena(650); const mana = world.units[0].resource; cast(world, "W"); cast(world, "Qbuffer");
    const arrival = world.units[0].action!.kind === "dash" ? world.units[0].action!.endTick : -1;
    expect(world.units[0].resource).toBe(mana - 140); expect(world.units[0].memory["alistar:qBuffered"]).toBe(true);
    through(world, arrival); expect(world.units[0].action).toMatchObject({ kind: "cast", ability: "Qimpact", endTick: arrival + 5 });
    through(world, arrival + 5); expect(world.units[1].hp).toBe(99505); expect(stacks(world)).toBe(2); expect(world.units[0].resource).toBe(mana - 140);
    expect(world.log.filter(row => row.text === "casts Pulverize")).toHaveLength(2);
    expect(world.units[1].x).toBeLessThanOrEqual(850);
  });
  it("an interrupted W never lands or releases buffered Q", () => { const world = arena(650); cast(world, "W"); cast(world, "Qbuffer"); applyCC(world, world.units[1], world.units[0], "airborne", 1); through(world, 45); expect(world.units[1].hp).toBe(100000); expect(world.units[0].memory["alistar:qBuffered"]).toBeUndefined(); });
  it("same-name Qbuffer never triggers an ordinary area hit early", () => { const world = arena(500); cast(world, "W"); cast(world, "Qbuffer"); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
 });

 describe("Alistar Trample persistent ticks and real empowered basics", () => {
  it("starts empty and emits exactly ten 20 + 7% AP persistent pulses at .5-second intervals", () => { const world = arena(100, { ap: 100 }); cast(world, "E"); through(world, 150); const hits = world.log.filter(row => row.text.startsWith("Trample (pulse) deals")); expect(hits.map(row => row.tick)).toEqual([15,30,45,60,75,90,105,120,135,150]); expect(world.units[1].hp).toBe(99730); expect(eStacks(world)).toBe(5); expect(stacks(world)).toBe(0); expect(world.units[0].memory["alistar:chargeUntil"]).toBe(255); });
  it("each pulse uses current occupancy and invulnerability prevents stacks while damage shields permit them", () => { const world = arena(1000); cast(world, "E"); through(world, 30); expect(eStacks(world)).toBe(0); world.units[1].x = 100; state(world, "invulnerable"); through(world, 45); expect(eStacks(world)).toBe(0); world.units[1].statuses = []; applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 1000 }, duration: 20 }, { scale: 1 }); through(world, 60); expect(eStacks(world)).toBe(1); });
  it("periodic Trample ignores spell shields without consuming them", () => { const world = arena(); state(world, "spellShield"); cast(world, "E"); through(world, 15); expect(world.units[1].hp).toBe(99980); expect(hasState(world.units[1], "spellShield")).toBe(true); expect(eStacks(world)).toBe(1); });
  it("five stacks enable a real basic attack with ordinary physical damage, 305 magic damage and a one-second stun once", () => { const world = arena(); charge(world); const hp = world.units[1].hp; basic(world); expect(world.units[1].hp).toBeCloseTo(hp - derive(world.units[0]).ad - 305, 8); expect(cc(world, "stun")).toMatchObject({ startTick: world.tick, endTick: world.tick + 30 }); expect(stacks(world)).toBe(1); const after = world.units[1].hp; basic(world); expect(world.units[1].hp).toBeCloseTo(after - derive(world.units[0]).ad, 8); });
  it("the empowered spell shield preserves ordinary attack damage and consumes the single-use charge", () => { const world = arena(); charge(world); state(world, "spellShield"); const hp = world.units[1].hp; basic(world); expect(world.units[1].hp).toBeCloseTo(hp - derive(world.units[0]).ad, 8); expect(hasState(world.units[1], "spellShield")).toBe(false); expect(cc(world, "stun")).toBeUndefined(); expect(world.units[0].memory["alistar:chargeUntil"]).toBeUndefined(); });
  it.each(["dodgeAttacks", "blind"] as const)("%s preserves the charge without applying its effects", guard => { const world = arena(); charge(world); const until = world.units[0].memory["alistar:chargeUntil"]; if (guard === "dodgeAttacks") state(world, guard); const hp = world.units[1].hp; basic(world, guard === "blind"); expect(world.units[1].hp).toBe(hp); expect(world.units[0].memory["alistar:chargeUntil"]).toBe(until); });
  it("blocking the attack consumes the charge and denies all attack and stun damage", () => { const world = arena(); charge(world); state(world, "blockAttacks"); const hp = world.units[1].hp; basic(world); expect(world.units[1].hp).toBe(hp); expect(world.units[0].memory["alistar:chargeUntil"]).toBeUndefined(); });
  it("the six-second empowered window expires with no fabricated basic", () => { const world = arena(); charge(world); through(world, 255); expect(world.units[0].memory["alistar:chargeUntil"]).toBeUndefined(); expect(world.log.some(row => row.text.startsWith("Trample (empowered attack) deals"))).toBe(false); });
  it("movement between pulses does not turn E into a full-duration guaranteed hit", () => { const world = arena(); cast(world, "E"); through(world, 15); world.units[1].x = 2000; through(world, 150); expect(world.units[1].hp).toBe(99980); expect(eStacks(world)).toBe(1); });
 });

 describe("Alistar actual pet identity, Roar and lifecycle", () => {
  it("Q damages and controls each actual pet through its own guard without changing the owner", () => { const world = arena(2000); const one = pet(world, 100), two = pet(world, 200); petEffects(world, world.units[1], one, [{ type: "state", state: "spellShield", duration: 20 }]); finish(world, "Q"); expect(one.hp).toBe(5000); expect(two.hp).toBe(4780); expect(two.statuses?.some(s => s.key === "stun")).toBe(true); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("minion/monster/unclassified pets take E damage but cannot generate champion-only stacks", () => { const world = arena(2000); for (const targetClass of ["minion", "monster", "other", undefined] as const) pet(world, 100, targetClass ? { targetClass } : {}); cast(world, "E"); through(world, 75); expect(world.pets.map(p => p.hp)).toEqual([4900,4900,4900,4900]); expect(eStacks(world)).toBe(0); expect(world.units[1].hp).toBe(100000); });
  it("multiple champion-class contacts in one pulse credit only one stack and keep real pet HP separate", () => { const world = arena(); const clone = pet(world, 150, { targetClass: "champion", unitClass: "clone" }); cast(world, "E"); through(world, 15); expect(eStacks(world)).toBe(1); expect(clone.hp).toBe(4980); expect(world.units[1].hp).toBe(99980); });
  it("real minion basics do not consume champion-only empowered Trample", () => { const world = arena(); charge(world); const target = pet(world, 100, { targetClass: "minion" }); world.units[0].attackReadyTick = world.tick; startAttack(world, world.units[0], target); const action = world.units[0].action; if (action?.kind !== "windup") throw Error("no windup"); through(world, action.launchTick); expect(world.units[0].memory["alistar:chargeUntil"]).toBeDefined(); expect(target.hp).toBeCloseTo(5000 - derive(world.units[0]).ad, 8); });
  it("an aimed W targets its actual pet and never redirects the hit into the owner", () => { const world = arena(2000); const target = pet(world, 500, { targetClass: "minion" }); cast(world, "W", { direction: 1, distance: 500 }); through(world, 30); expect(target.hp).toBe(4725); expect(target.statuses?.some(s => s.key === "stun")).toBe(true); expect(world.units[1].hp).toBe(100000); expect(stacks(world)).toBe(0); });
  it("seven actual qualifying minion deaths trigger one 5%-max-HP Roar and never grant ambient stacks", () => { const world = arena(2000); const self = world.units[0]; self.hp -= 1000; expect(stacks(world)).toBe(0); for (let n=0;n<7;n++) { const target = pet(world, 100, { targetClass: "minion", hp: 1 }); petEffects(world, self, target, [{ type: "damage", damageType: "true", amount: { base: 1 } }]); } expect(stacks(world)).toBe(0); expect(self.hp).toBeCloseTo(derive(self).maxHp - 1000 + derive(self).maxHp * .05, 8); });
  it("Roar heals actual allied champion-class units simultaneously for 7% but never ordinary allied minions", () => { const world = arena(2000); const ally = pet(world, 100, { targetClass: "champion", unitClass: "clone" }, true), minion = pet(world, 100, { targetClass: "minion" }, true); ally.hp -= 1000; minion.hp -= 1000; world.units[0].hp -= 1000; for (let n=0;n<7;n++) { const target = pet(world, 100, { targetClass: "minion", hp: 1 }); petEffects(world, world.units[0], target, [{ type: "damage", damageType: "true", amount: { base: 1 } }]); } expect(ally.hp).toBeCloseTo(4000 + derive(world.units[0]).maxHp * .07, 8); expect(minion.hp).toBe(4000); });
  it("death range, unclassified deaths and ordinary despawn cannot create Roar stacks", () => { const world = arena(2000); for (const target of [pet(world, 1100, { targetClass: "minion", hp: 1 }), pet(world, 100, { hp: 1 })]) petEffects(world, world.units[0], target, [{ type: "damage", damageType: "true", amount: { base: 1 } }]); const target = pet(world, 100, { targetClass: "minion" }); destroyPet(world, target); expect(stacks(world)).toBe(0); });
  it("Roar stores stacks while on its independent three-second cooldown then heals immediately at expiry", () => { const world = arena(); const self = world.units[0]; self.hp -= 1000; self.memory["alistar:roarStacks"] = 6; finish(world, "Q"); const first = self.hp; self.memory["alistar:roarStacks"] = 7; through(world, 97); expect(self.hp).toBe(first); through(world, 98); expect(self.hp).toBeCloseTo(first + derive(self).maxHp * .05, 8); expect(stacks(world)).toBe(0); });
  it("CC immunity grants no Roar credit and Q stun plus airborne cannot double count", () => { const world = arena(); state(world, "ccImmune"); finish(world, "Q"); expect(stacks(world)).toBe(0); world.units[1].statuses=[]; world.units[0].cooldownReady.Q=0; finish(world, "Q"); expect(stacks(world)).toBe(1); });
  it("death and attackable resurrection clear personal stacks, active pulses and buffered Q", () => { const world = arena(650); world.units[0].memory["alistar:roarStacks"] = 6; cast(world, "E"); cast(world, "W"); cast(world, "Qbuffer"); beginResurrection(world, world.units[0], { duration: 1 }); through(world, 1); expect(stacks(world)).toBe(0); expect(eStacks(world)).toBe(0); expect(world.units[0].memory["alistar:qBuffered"]).toBeUndefined(); through(world, 60); expect(world.units[1].hp).toBe(100000); });
  it("all timed primitive state clones independently without mutating compiled definitions", () => { const world = arena(); cast(world, "E"); through(world, 15); const copy = cloneWorld(world); through(copy, 30); expect(eStacks(world)).toBe(1); expect(eStacks(copy)).toBe(2); copy.units[0].memory["alistar:roarStacks"] = 6; expect(stacks(world)).toBe(0); expect(spell(world, "Q").onHit).toEqual(spell(copy, "Q").onHit); });
 });

 describe("Alistar Unbreakable Will and ordinary policy", () => {
  it("R casts while disabled, cleanses at completion and grants 75% reduction for exactly seven seconds", () => { const world = arena(); applyCC(world, world.units[1], world.units[0], "suppression", 10); expect(canCast(world, world.units[0], spell(world, "R"))).toBe(true); finish(world, "R"); expect(world.units[0].statuses.some(s => s.kind === "cc")).toBe(false); expect(world.units[0].statuses.find(s => s.key === "damageReduction")).toMatchObject({ startTick: 8, endTick: 218, value: .75 }); const before = world.units[0].hp; dealDamage(world, world.units[1], world.units[0], 100, "true"); expect(before-world.units[0].hp).toBe(100); const hp = world.units[0].hp; dealDamage(world, world.units[1], world.units[0], 100, "magic"); expect(hp-world.units[0].hp).toBeCloseTo(25 * 100 / (100 + derive(world.units[0]).mr.base), 8); through(world, 218); expect(hasState(world.units[0], "damageReduction")).toBe(false); });
  it("R remains locked in stasis despite its disabled-cast permission", () => { const world=arena();state(world,"stasis",0);expect(canCast(world,world.units[0],spell(world,"R"))).toBe(false); });
  it("the named real Hemoplague exception adds ten points to R's remaining damage fraction", () => { const world=arena(); world.units[1].spec=kit("Vladimir").spec;finish(world,"R");const infection=world.units[1].spec.abilities.find(a=>a.key==="R")!;abilityHit(world,world.units[1],world.units[0],infection,infection.onHit!);expect(world.units[0].statuses.some(s=>s.memoKey==="vladimir:infectionMagic")).toBe(true);const hp=world.units[0].hp;dealDamage(world,world.units[1],world.units[0],100,"magic");expect(hp-world.units[0].hp).toBeCloseTo(35*100/(100+derive(world.units[0]).mr.base),8); });
  it.each(["trade", "hold"] as const)("reserves a genuinely ready R in %s without an incoming cleanse trigger", mode => { const world = arena(700); world.modes[0] = mode; world.units[0].hp *= .4; for (const ability of world.units[0].spec.abilities) if (ability.slot !== "R") world.units[0].cooldownReady[ability.cooldownKey ?? ability.key] = Infinity; expect(canCast(world, world.units[0], spell(world, "R"))).toBe(true); const command = world.units[0].spec.behavior!(perceive(world, 0)); expect(command?.kind === "cast" && command.ability === "R").toBe(false); });
  it("completed trade retreats before a ready W-Q combo or low-health R", () => { const world = arena(600); world.modes[0]="trade"; world.units[0].memory.tradeDone = true; world.units[0].hp *= .4; expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 }); });
  it("ordinary fight behavior uses all four root abilities and a real empowered attack", () => { const world = createWorld({ fighters: [subject({ hp: 5000 }), fighter({ base: { hp: 100000, ad: 50 } })], distance: 500, hp: [.5, 1], modes: ["fight", "fight"], settings: { log: true, maxSeconds: 12, maxBranches: 1 } }); runWorld(world); for (const name of ["Headbutt", "Pulverize", "Trample", "Unbreakable Will"]) expect(world.log.some(row => row.side === 0 && row.text === `casts ${name}`), name).toBe(true); expect(world.log.some(row=>row.text.startsWith("Trample (empowered attack) deals"))).toBe(true); });
  it.each(["flee", "idle"] as const)("preserves ordinary %s choices", mode => { const world = arena(1000); world.modes[0]=mode; const view=perceive(world,0); expect(world.units[0].spec.behavior!(view)).toEqual(defaultBehavior(view)); });
 });

 describe("Alistar full production matchups", () => {
  it("full15000gold six-scenario Darius scores and exact builds reflect", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const opponent = kit("Darius").spec, forward = simulateMatchup(compiled().spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled().spec, 15000, prices);
    expect(forward.scenarios).toHaveLength(6); expect(forward.builds).toEqual([reverse.builds[1],reverse.builds[0]]); expect(Number.isFinite(forward.score)).toBe(true); expect(Math.abs(forward.score+reverse.score)).toBeLessThanOrEqual(1e-10);
    const reflected=[1,0,2,3,4,5]; for(const [i,scenario] of forward.scenarios.entries()) { const other=reverse.scenarios[reflected[i]!]!; if(scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score+other.score!)).toBeLessThanOrEqual(1e-10); expect(scenario.outcomes.every(o=>Number.isFinite(o.seconds)&&o.hp.every(Number.isFinite))).toBe(true); }
  }, 60000);
  it("full15000gold six-scenario Heimerdinger matchup keeps actual pets and finite outcomes", () => {
    const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices;
    const opponent=kit("Heimerdinger",{upgrade:2}).spec, world=createWorld({fighters:[compiled().spec,opponent],distance:300,modes:["fight","fight"],settings:{maxSeconds:1,log:true}}); expect(world.pets.length).toBeGreaterThan(0);
    const result=simulateMatchup(compiled().spec,opponent,15000,prices); expect(Number.isFinite(result.score)).toBe(true);expect(result.scenarios).toHaveLength(6);for(const scenario of result.scenarios) for(const outcome of scenario.outcomes) expect(Number.isFinite(outcome.seconds)&&outcome.hp.every(Number.isFinite)).toBe(true);
  }, 60000);
 });
