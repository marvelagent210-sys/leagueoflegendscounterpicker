import { describe, expect, it } from "vitest";
import { attackTiming, canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { petEffects, petsOf, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, Effect, FighterSpec } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("MonkeyKing");
const worldFor = (bonus: BonusStats = {}, distance = 100, enemy: Partial<FighterSpec["base"]> = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  return createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, ...enemy } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, idle); };
/** Steps until `done`, failing after 10 s of fight rather than hanging when it never comes. */
const until = (world: World, done: () => boolean, limit = 300) => {
  for (let i = 0; i < limit && !done(); i++) step(world, idle);
  expect(done(), "the awaited event never happened").toBe(true);
};
const hit = (world: World) => attackHit(world, world.units[0], world.units[1], false, []);
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const state = (unit: Unit, key: string, duration: number) => applyEffect({ tick: 0 } as World, unit, unit, { type: "state", state: key as never, duration }, { scale: 1 });
const onTarget = (world: World, effect: Effect) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const clone = (world: World): Pet | undefined => petsOf(world, 0, "decoy")[0];
const bonusArmor = (unit: Unit) => derive(unit).armor.bonus;
/** Stone Skin's armor at level 20: 6 to 10 over levels 1-18, carried on to 20. */
const STONE = 6 + (4 / 17) * 19;
const AD = compiled.spec.base.ad;
/** A Cyclone pulse on the 20000-health, armorless target: 2% of its maximum health + 34.375% AD. */
const PULSE = 0.02 * 20000 + 0.34375 * AD;

describe("Wukong reads the wiki at level 20", () => {
  it("Stone Skin, Crushing Blow, Warrior Trickster, Nimbus Strike and Cyclone", () => {
    const spec = compiled.spec;
    expect(spec.start).toEqual([{ type: "stat", stat: "armor", amount: { base: expect.closeTo(STONE, 9) }, duration: Number.POSITIVE_INFINITY }]);
    const q = spec.abilities.find((a) => a.key === "Q")!;
    expect(q).toMatchObject({ cooldown: 6, cost: 20, castTime: 0, cooldownAfter: "empower", overlay: true, allowedDuringChannel: ["R", "R3"], preserveAttackWindup: "uncancellable" });
    expect(q.onSelf).toEqual([{
      type: "empower", attacks: 1, window: 5, bonusRange: 175, uncancellable: true, resetAttack: true, spellShieldOnHit: true,
      onHit: [{ type: "damage", damageType: "physical", amount: { base: 120, ratios: { bonusAD: 0.5 } }, label: "Crushing Blow" }, { type: "stat", stat: "armorReductionPercent", amount: { base: 0.3 }, duration: 3 }],
    }]);
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 18, cost: 40, delivery: { kind: "dash", distance: 300, minDistance: 100, speed: 900 }, onSelf: [{ type: "state", state: "invisible", duration: 1 }] });
    const e = spec.abilities.find((a) => a.key === "E")!;
    expect(e).toMatchObject({ cooldown: 7, cost: 50, delivery: { kind: "dash", direction: "target", distance: 650, speed: 1050, hitRadius: 187.5 } });
    expect(e.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 240, ratios: { AP: 1 } }, label: "Nimbus Strike" }]);
    // The dash speed is in no wiki text: the pinned game file.
    expect(compiled.evidence.find((x) => x.ability === "Nimbus Strike" && x.text.includes("DashSpeed"))).toMatchObject({ url: "https://raw.communitydragon.org/16.20/game/data/characters/monkeyking/monkeyking.bin.json" });
    const r = spec.abilities.find((a) => a.key === "R")!;
    expect(r).toMatchObject({ cooldown: 90, cost: 100, cooldownAfter: "state", channel: { duration: 2, interruptible: false, mobile: true, range: 315, pulses: { base: 8 } } });
    expect(r.channel?.onTick).toEqual([{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: 0.02, AD: 0.34375 } }, label: "Cyclone" }]);
    expect(r.onSelf).toEqual([{ type: "state", state: "ghosted", duration: 2 }, { type: "stat", stat: "moveSpeedPercent", amount: { base: 0.2 }, duration: 2 }, { type: "state", state: "lingering", duration: 8 }]);
    expect(spec.abilities.find((a) => a.key === "R2")?.chain).toEqual({ root: "R", index: 2, window: 2, delay: 0.5, auto: true });
    expect(spec.abilities.find((a) => a.key === "R3")?.chain).toEqual({ root: "R", index: 3, window: 8, delay: 1 });
    expect(spec.abilities.find((a) => a.key === "R4")?.chain).toEqual({ root: "R", index: 4, window: 2, delay: 0.5, auto: true });
    expect(compiled.assumptions.some((a) => a.includes("once per cast"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor({ ad: 100, attackSpeed: 0.5, abilityHaste: 20 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target).physical).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Stone Skin", () => {
  it("a stack for each hit, up to five, each another 100% of its armor; they last 5 s after the last hit, then go one a second", () => {
    const w = worldFor();
    const self = w.units[0];
    expect(bonusArmor(self)).toBeCloseTo(STONE, 9);
    hit(w);
    expect(bonusArmor(self)).toBeCloseTo(2 * STONE, 9);
    for (let i = 0; i < 5; i++) hit(w);
    expect(bonusArmor(self)).toBeCloseTo(6 * STONE, 9);
    // Hits at tick 0: the stacks are whole until tick 150, then one goes every 30 ticks.
    through(w, 149);
    expect(bonusArmor(self)).toBeCloseTo(6 * STONE, 9);
    through(w, 150);
    expect(bonusArmor(self)).toBeCloseTo(5 * STONE, 9);
    through(w, 179);
    expect(bonusArmor(self)).toBeCloseTo(5 * STONE, 9);
    through(w, 180);
    expect(bonusArmor(self)).toBeCloseTo(4 * STONE, 9);
    // A hit adds one and refreshes them all (at tick 181).
    hit(w);
    expect(bonusArmor(self)).toBeCloseTo(5 * STONE, 9);
    through(w, 181 + 149);
    expect(bonusArmor(self)).toBeCloseTo(5 * STONE, 9);
    through(w, 181 + 150);
    expect(bonusArmor(self)).toBeCloseTo(4 * STONE, 9);
    through(w, 181 + 150 + 3 * 30);
    expect(bonusArmor(self)).toBeCloseTo(STONE, 9);
  });

  it("regenerates 0.35% of maximum health every 5 s, and 100% more with each stack", () => {
    for (const stacks of [0, 5]) {
      const w = worldFor();
      const self = w.units[0];
      for (let i = 0; i < stacks; i++) hit(w);
      self.hp = 1000;
      through(w, 149);
      expect(self.hp - 1000).toBeCloseTo(derive(self).maxHp * 0.0035 * (1 + stacks), 6);
    }
  });

  it("no stack from a hit on an invulnerable enemy; a blocked attack still gives one (on-hit)", () => {
    const shielded = worldFor();
    onTarget(shielded, { type: "state", state: "invulnerable", duration: 5 });
    hit(shielded);
    expect(bonusArmor(shielded.units[0])).toBeCloseTo(STONE, 9);
    const blocked = worldFor();
    onTarget(blocked, { type: "state", state: "blockAttacks", duration: 5 });
    hit(blocked);
    expect(bonusArmor(blocked.units[0])).toBeCloseTo(2 * STONE, 9);
  });

  it("ability damage gives a stack", () => {
    const w = worldFor();
    applyEffect(w, w.units[0], w.units[1], { type: "damage", damageType: "magic", amount: { base: 10 }, label: "Nimbus Strike" }, { scale: 1, ability: ability(w, "E") });
    expect(bonusArmor(w.units[0])).toBeCloseTo(2 * STONE, 9);
  });
});

describe("Crushing Blow", () => {
  it("its cooldown starts as its attack lands and each hit cuts 0.5 s off it; hits while its attack waits cut nothing", () => {
    const w = worldFor();
    const self = w.units[0];
    cast(w, "Q");
    expect(self.cooldownReady.Q).toBe(Number.POSITIVE_INFINITY);
    applyEffect(w, self, w.units[1], { type: "damage", damageType: "magic", amount: { base: 10 }, label: "test" }, { scale: 1, ability: ability(w, "E") });
    startAttack(w, self);
    const launch = self.action?.kind === "windup" ? self.action.launchTick : -1;
    until(w, () => self.action === undefined);
    // 6 s from the launch, less the 0.5 s its own hit cuts.
    expect(self.cooldownReady.Q).toBe(launch + 180 - 15);
    hit(w);
    expect(self.cooldownReady.Q).toBe(launch + 180 - 30);
    // An ability's hit too.
    applyEffect(w, self, w.units[1], { type: "damage", damageType: "magic", amount: { base: 10 }, label: "test" }, { scale: 1, ability: ability(w, "E") });
    expect(self.cooldownReady.Q).toBe(launch + 180 - 45);
  });

  it("reaches 175 farther, deals 120 (+ 50% bonus AD), then 30% armor reduction for 3 s", () => {
    // 330 units apart: beyond his 175 range, within 350.
    const w = worldFor({}, 330, { armor: 100 });
    const [self, target] = w.units;
    expect(canStartAttack(w, self)).toBe(false);
    cast(w, "Q");
    expect(canStartAttack(w, self)).toBe(true);
    startAttack(w, self);
    until(w, () => logged(w, "Crushing Blow deals").length > 0);
    // Dealt against the armor before its reduction: 120 x 100/200.
    expect(logged(w, "Crushing Blow deals")[0]?.text).toBe("Crushing Blow deals 60 physical damage");
    const shred = target.statuses.find((s) => s.kind === "stat" && s.key === "armorReductionPercent");
    expect(shred).toMatchObject({ value: 0.3, endTick: w.tick - 1 + 90 });
  });

  it("its windup can't be cancelled: it lands through a cast and on a target that steps out of range; a plain windup is cancelled", () => {
    const empowered = worldFor();
    const self = empowered.units[0];
    cast(empowered, "Q");
    startAttack(empowered, self);
    cast(empowered, "W", { direction: -1, distance: 300 });
    until(empowered, () => logged(empowered, "Crushing Blow deals").length > 0, 30);
    const plain = worldFor();
    startAttack(plain, plain.units[0]);
    cast(plain, "W", { direction: -1, distance: 300 });
    through(plain, 30);
    expect(logged(plain, "attack deals")).toHaveLength(0);
  });

  it("ends a spin only after Cyclone's first 0.3 s", () => {
    const w = worldFor();
    cast(w, "R");
    through(w, 7);
    expect(castable(w, "Q")).toBe(false);
    through(w, 8);
    expect(castable(w, "Q")).toBe(true);
    cast(w, "Q");
    expect(w.units[0].action).toBeUndefined();
  });

  it("can be cast during Nimbus Strike's dash", () => {
    const w = worldFor({}, 400);
    cast(w, "E");
    through(w, 0);
    expect(w.units[0].action?.kind).toBe("dash");
    expect(castable(w, "Q")).toBe(true);
    cast(w, "Q");
    expect(w.units[0].action?.kind).toBe("dash");
  });
});

describe("Warrior Trickster", () => {
  it("leaves a clone where he stood for 4 s, with his current health, armor and magic resistance; he dashes 100 to 300 units in invisibility for 1 s", () => {
    const w = worldFor({}, 400);
    const self = w.units[0];
    self.hp = 1500;
    const armor = derive(self).armor.base + derive(self).armor.bonus;
    cast(w, "W", { direction: -1, distance: 200 });
    const decoy = clone(w)!;
    expect(decoy).toMatchObject({ x: 0, hp: 1500 });
    expect(decoy.spec).toMatchObject({ armor, mr: derive(self).mr.base + derive(self).mr.bonus, radius: 65, moveSpeed: 0 });
    expect(hasState(self, "invisible")).toBe(true);
    until(w, () => self.action === undefined);
    // 200 units at 900 a second.
    expect(self.x).toBeCloseTo(-200, 6);
    expect(w.tick).toBe(Math.ceil(200 / 30) + 1);
    through(w, 29);
    expect(hasState(self, "invisible")).toBe(true);
    through(w, 30);
    expect(hasState(self, "invisible")).toBe(false);
    through(w, 119);
    expect(clone(w)).toBeDefined();
    through(w, 120);
    expect(clone(w)).toBeUndefined();
    // Never shorter than 100.
    const short = worldFor({}, 400);
    cast(short, "W", { direction: -1, distance: 20 });
    until(short, () => short.units[0].action === undefined);
    expect(short.units[0].x).toBeCloseTo(-100, 6);
  });

  it("an attack breaks the invisibility as its windup ends", () => {
    const w = worldFor();
    const self = w.units[0];
    cast(w, "W", { direction: 1, distance: 100 });
    until(w, () => self.action === undefined);
    startAttack(w, self);
    const launch = self.action?.kind === "windup" ? self.action.launchTick : -1;
    through(w, launch - 1);
    expect(hasState(self, "invisible")).toBe(true);
    through(w, launch);
    expect(hasState(self, "invisible")).toBe(false);
  });

  it("the clone attacks on its own for 60% of his attack damage, at his attack speed (Nimbus Strike's bonus as he gets it), standing still", () => {
    const w = worldFor();
    const self = w.units[0];
    cast(w, "W", { direction: -1, distance: 300 });
    const plain = attackTiming(self);
    until(w, () => logged(w, "Decoy deals").length >= 2);
    // Nimbus Strike's attack speed after its second attack: the third already started its timer
    // (its windup, timed as it starts, is shorter), the fourth comes faster.
    hookContext(w, self).buff("wukong:nimbus", "attackSpeed", 0.6, 5);
    const faster = attackTiming(self);
    expect(faster.total).toBeLessThan(plain.total);
    until(w, () => logged(w, "Decoy deals").length >= 4);
    const ticksOf = logged(w, "Decoy deals").map((e) => e.tick);
    expect(logged(w, "Decoy deals")[0]?.text).toBe(`Decoy deals ${Math.round(0.6 * AD)} physical damage`);
    expect([ticksOf[1]! - ticksOf[0]!, ticksOf[2]! - ticksOf[1]!, ticksOf[3]! - ticksOf[2]!]).toEqual([plain.total, plain.total - plain.windup + faster.windup, faster.total]);
    expect(clone(w)?.x).toBe(0);
  });

  it("the clone's attacks crit as his would, by expected value (an assumption)", () => {
    const w = worldFor({ critChance: 0.5 });
    const self = w.units[0];
    cast(w, "W", { direction: -1, distance: 300 });
    until(w, () => logged(w, "Decoy deals").length >= 1);
    const d = derive(self);
    expect(logged(w, "Decoy deals")[0]?.text).toBe(`Decoy deals ${Math.round(0.6 * d.ad * (1 + 0.5 * (d.critDamage - 1)))} physical damage`);
  });

  it("the clone's attacks are basic attacks: a dodge stops them, and so does disarming it", () => {
    const dodged = worldFor();
    onTarget(dodged, { type: "state", state: "dodgeAttacks", duration: 10 });
    cast(dodged, "W", { direction: -1, distance: 300 });
    through(dodged, 90);
    expect(logged(dodged, "Decoy deals")).toHaveLength(0);
    const disarmed = worldFor();
    cast(disarmed, "W", { direction: -1, distance: 300 });
    petEffects(disarmed, disarmed.units[1], clone(disarmed)!, [{ type: "cc", cc: "disarm", duration: 3 }]);
    through(disarmed, 60);
    expect(logged(disarmed, "Decoy deals")).toHaveLength(0);
  });

  it("the clone's hits give Strength of Stone and cut Crushing Blow's cooldown", () => {
    const w = worldFor();
    const self = w.units[0];
    self.cooldownReady.Q = 600;
    cast(w, "W", { direction: -1, distance: 300 });
    until(w, () => logged(w, "Decoy deals").length === 1);
    expect(bonusArmor(self)).toBeCloseTo(2 * STONE, 9);
    expect(self.cooldownReady.Q).toBe(600 - 15);
  });

  it("the clone's hits on an enemy pet cut Crushing Blow's cooldown but give no Strength of Stone (champions and monsters only)", () => {
    // The champion out of the clone's reach, an enemy pet within it.
    const w = worldFor({}, 600);
    const self = w.units[0];
    spawnPet(w, w.units[1], { kind: "minion", name: "Minion", hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Number.POSITIVE_INFINITY }, 200);
    self.cooldownReady.Q = 600;
    cast(w, "W", { direction: -1, distance: 300 });
    until(w, () => w.log.some((e) => e.side === 0 && e.text.startsWith("hits Minion")));
    expect(bonusArmor(self)).toBeCloseTo(STONE, 9);
    expect(self.cooldownReady.Q).toBe(600 - 15);
  });

  it("Crushing Blow resets the clone's attack timer: its empowered attack comes at once", () => {
    const w = worldFor();
    cast(w, "W", { direction: -1, distance: 300 });
    until(w, () => logged(w, "Decoy deals").length >= 1);
    // Just after an attack, its next is most of an attack away; Crushing Blow makes it start now.
    const tick = w.tick;
    cast(w, "Q");
    until(w, () => logged(w, "Crushing Blow (clone) deals").length > 0, 30);
    expect(logged(w, "Crushing Blow (clone) deals")[0]!.tick).toBe(tick + attackTiming(w.units[0]).windup);
  });

  it("a spell shield negates the clone's Crushing Blow packet but not its attack", () => {
    const w = worldFor({}, 265);
    cast(w, "W", { direction: -1, distance: 300 });
    onTarget(w, { type: "state", state: "spellShield", duration: 10 });
    cast(w, "Q");
    until(w, () => logged(w, "Decoy deals").length > 0, 30);
    through(w, w.tick + 5);
    expect(logged(w, "Crushing Blow (clone) deals")).toHaveLength(0);
    expect(hasState(w.units[1], "spellShield")).toBe(false);
    expect(w.units[1].statuses.some((st) => st.key === "armorReductionPercent")).toBe(false);
  });

  it("Crushing Blow resets the clone's attack timer and empowers its next attack: 175 more reach, 60% of the bonus damage", () => {
    // The target 330 from the clone's center: out of its 275 reach, within 450.
    const w = worldFor({}, 265);
    cast(w, "W", { direction: -1, distance: 300 });
    through(w, 60);
    expect(logged(w, "Decoy deals")).toHaveLength(0);
    cast(w, "Q");
    until(w, () => logged(w, "Crushing Blow (clone) deals").length > 0, 30);
    expect(logged(w, "Crushing Blow (clone) deals")[0]?.text).toBe(`Crushing Blow (clone) deals ${Math.round(0.6 * 120)} physical damage`);
    through(w, w.tick + 60);
    expect(logged(w, "Decoy deals")).toHaveLength(1);
  });

  it("cast during a spin, the clone spins on for the time left, and Crushing Blow can stop it; a clone spinning with him can't be stopped", () => {
    const handed = worldFor();
    cast(handed, "R");
    through(handed, 15);
    expect(logged(handed, "Cyclone deals")).toHaveLength(2);
    cast(handed, "W", { direction: -1, distance: 100 });
    expect(handed.units[0].action?.kind).toBe("dash");
    through(handed, 30);
    // Wukong's pulses at 8 and 15, then the clone's at 23 and 30: the same clock.
    expect(logged(handed, "Cyclone deals")).toHaveLength(2);
    expect(logged(handed, "Cyclone (clone) deals").map((e) => e.tick)).toEqual([23, 30]);
    cast(handed, "Q");
    through(handed, 60);
    expect(logged(handed, "Cyclone (clone) deals")).toHaveLength(2);

    const along = worldFor();
    cast(along, "W", { direction: -1, distance: 100 });
    until(along, () => along.units[0].action === undefined);
    cast(along, "R");
    const start = along.tick;
    through(along, start + 15);
    cast(along, "Q");
    through(along, start + 60);
    expect(logged(along, "Cyclone (clone) deals")).toHaveLength(8);
  });
});

describe("Nimbus Strike", () => {
  it("dashes at 1050 to an enemy within 650 and strikes for 240 magic damage; then 60% attack speed for 5 s", () => {
    const far = worldFor({}, 650 - 130 + 1);
    expect(castable(far, "E")).toBe(false);
    const w = worldFor({}, 650 - 130);
    const self = w.units[0];
    const speed = derive(self).attackSpeed;
    cast(w, "E");
    until(w, () => self.action === undefined);
    // To the enemy's side (their pathing radii): 650 - 70 units at 35 a tick.
    expect(w.tick - 1).toBe(Math.ceil((650 - 70) / 35));
    expect(logged(w, "Nimbus Strike deals")[0]?.text).toBe("Nimbus Strike deals 240 magic damage");
    expect(derive(self).attackSpeed).toBeCloseTo(speed + 0.6 * self.spec.base.attackSpeed.ratio, 9);
    const arrived = w.tick - 1;
    through(w, arrived + 149);
    expect(derive(self).attackSpeed).toBeGreaterThan(speed);
    through(w, arrived + 150);
    expect(derive(self).attackSpeed).toBeCloseTo(speed, 9);
  });

  it("no attack speed when the dash is knocked down before it arrives", () => {
    const w = worldFor({}, 650 - 130);
    const self = w.units[0];
    const speed = derive(self).attackSpeed;
    cast(w, "E");
    through(w, 4);
    applyEffect(w, w.units[1], self, { type: "displace", direction: "away", distance: 0, duration: 0.5 }, { scale: 1 });
    expect(self.action?.kind).not.toBe("dash");
    through(w, 30);
    expect(derive(self).attackSpeed).toBeCloseTo(speed, 9);
  });

  it("interrupts the windup of an enemy attack on Wukong, unless it is uncancellable", () => {
    for (const uncancellable of [false, true]) {
      const w = worldFor();
      const enemy = w.units[1];
      startAttack(w, enemy);
      if (enemy.action?.kind === "windup") enemy.action.uncancellable = uncancellable;
      cast(w, "E");
      expect(enemy.action?.kind === "windup").toBe(uncancellable);
      if (!uncancellable) expect(enemy.attackReadyTick).toBe(0);
    }
  });

  it("strikes up to two enemy pets near the target as well", () => {
    const w = worldFor({}, 300);
    const target = w.units[1];
    const minion = { kind: "minion", name: "Minion", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Number.POSITIVE_INFINITY };
    const pets = [50, 120, 180].map((offset) => spawnPet(w, target, minion, target.x + offset));
    cast(w, "E");
    until(w, () => w.units[0].action === undefined);
    expect(pets.map((p) => p.hp)).toEqual([760, 760, 1000]);
  });

  it("its attack speed lasts while he spins", () => {
    const w = worldFor();
    const self = w.units[0];
    const speed = derive(self).attackSpeed;
    cast(w, "E");
    until(w, () => self.action === undefined);
    const arrived = w.tick - 1;
    through(w, arrived + 140);
    cast(w, "R");
    // The spin ends at arrived + 200 with the bonus refreshed to 5 s: it outlasts its first 5 s.
    through(w, arrived + 340);
    expect(derive(self).attackSpeed).toBeGreaterThan(speed);
  });
});

describe("Cyclone", () => {
  it("spins for 2 s, 8 pulses of 2% maximum health (+ 34.375% AD) within 315, ghosted and 20% faster; crowd control doesn't stop it, and he can't attack", () => {
    const w = worldFor();
    const self = w.units[0];
    cast(w, "R");
    expect(hasState(self, "ghosted")).toBe(true);
    expect(derive(self).moveSpeed).toBeCloseTo(340 * 1.2, 6);
    expect(canStartAttack(w, self)).toBe(false);
    through(w, 20);
    applyEffect(w, w.units[1], self, { type: "cc", cc: "stun", duration: 1 }, { scale: 1 });
    through(w, 60);
    const pulses = logged(w, "Cyclone deals");
    expect(pulses.map((e) => e.tick)).toEqual([8, 15, 23, 30, 38, 45, 53, 60]);
    expect(pulses[0]?.text).toBe(`Cyclone deals ${Math.round(PULSE)} physical damage`);
    // Out of reach, nothing.
    const out = worldFor({}, 315 + 1);
    cast(out, "R");
    through(out, 60);
    expect(logged(out, "Cyclone deals")).toHaveLength(0);
  });

  it("knocks up for 0.6 s once a cast, shared with the clone; a pulse a spell shield blocks uses it up", () => {
    const w = worldFor();
    cast(w, "W", { direction: -1, distance: 100 });
    until(w, () => w.units[0].action === undefined);
    cast(w, "R");
    through(w, w.tick + 60);
    const knocks = logged(w, "inflicts airborne");
    expect(knocks.map((e) => e.text)).toEqual(["inflicts airborne for 0.60 s"]);
    expect(logged(w, "Cyclone (clone) deals").length).toBeGreaterThan(0);

    const shielded = worldFor();
    onTarget(shielded, { type: "state", state: "spellShield", duration: 10 });
    cast(shielded, "R");
    through(shielded, 60);
    expect(logged(shielded, "inflicts airborne")).toHaveLength(0);
    expect(logged(shielded, "Cyclone deals")).toHaveLength(7);
    // The second cast knocks up again.
    until(shielded, () => castable(shielded, "R3"), 60);
    cast(shielded, "R3");
    through(shielded, shielded.tick + 10);
    expect(logged(shielded, "inflicts airborne")).toHaveLength(1);
  });

  it("the clone's knock-up and Wukong's are one: once the clone's lands, his pulses don't knock up again", () => {
    // Wukong 300 back after the dash, the clone where he stood next to the enemy: only its spin reaches.
    const w = worldFor();
    cast(w, "W", { direction: -1, distance: 300 });
    until(w, () => w.units[0].action === undefined);
    cast(w, "R");
    const start = w.tick;
    // The clone's first pulse (8 ticks in) knocks up until 26 ticks in.
    through(w, start + 26);
    expect(logged(w, "inflicts airborne")).toHaveLength(1);
    expect(logged(w, "Cyclone deals")).toHaveLength(0);
    expect(w.units[1].statuses.some((st) => st.kind === "cc" && st.key === "airborne" && st.endTick > w.tick)).toBe(false);
    // He comes in after that knock-up has ended: his pulses reach without another.
    w.units[0].x = w.units[1].x - 200;
    through(w, start + 60);
    expect(logged(w, "Cyclone deals").length).toBeGreaterThan(0);
    expect(logged(w, "inflicts airborne")).toHaveLength(1);
  });

  it("recast after 0.5 s ends it; it recasts itself at the end; the second cast comes 1 s later, within 8 s of the first", () => {
    const w = worldFor();
    cast(w, "R");
    through(w, 13);
    expect(castable(w, "R2")).toBe(false);
    through(w, 14);
    expect(castable(w, "R2")).toBe(true);
    cast(w, "R2");
    expect(w.units[0].action).toBeUndefined();
    through(w, 15 + 28);
    expect(castable(w, "R3")).toBe(false);
    through(w, 15 + 29);
    expect(castable(w, "R3")).toBe(true);

    const auto = worldFor();
    cast(auto, "R");
    through(auto, 61);
    expect(logged(auto, "Cyclone (recast) fires").map((e) => e.tick)).toEqual([61]);
    // Through tick 240, 8 s after the first cast.
    through(auto, 239);
    expect(castable(auto, "R3")).toBe(true);
    through(auto, 240);
    expect(castable(auto, "R3")).toBe(false);
  });

  it("another ability ends a spin as its recast would, opening the second cast 1 s later", () => {
    const w = worldFor();
    cast(w, "R");
    through(w, 11);
    cast(w, "Q");
    expect(w.units[0].chains.R?.stage).toBe(2);
    through(w, 12 + 28);
    expect(castable(w, "R3")).toBe(false);
    through(w, 12 + 29);
    expect(castable(w, "R3")).toBe(true);
  });

  it("its cooldown waits for the second spin to end, or for 8 s without one", () => {
    const twice = worldFor();
    const self = twice.units[0];
    cast(twice, "R");
    through(twice, 60);
    until(twice, () => castable(twice, "R3"));
    cast(twice, "R3");
    const second = twice.tick;
    through(twice, second + 59);
    expect(self.cooldownReady.R).toBe(Number.POSITIVE_INFINITY);
    through(twice, second + 61);
    expect(self.cooldownReady.R).toBe(second + 60 + 90 * 30);

    const once = worldFor();
    cast(once, "R");
    through(once, 239);
    expect(once.units[0].cooldownReady.R).toBe(Number.POSITIVE_INFINITY);
    through(once, 241);
    expect(once.units[0].cooldownReady.R).toBe(240 + 90 * 30);
  });

  it("the clone spins too, for 60% of Wukong's damage", () => {
    const w = worldFor();
    cast(w, "W", { direction: -1, distance: 100 });
    until(w, () => w.units[0].action === undefined);
    cast(w, "R");
    through(w, w.tick + 10);
    expect(logged(w, "Cyclone (clone) deals")[0]?.text).toBe(`Cyclone (clone) deals ${Math.round(0.6 * PULSE)} physical damage`);
  });
});
