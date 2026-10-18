import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Gragas");
const ENEMY_HP = 6000;
const worldFor = (bonus: BonusStats = {}, distance = 100, enemy: Partial<FighterSpec["base"]> = {}, walls = true): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  return createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: ENEMY_HP, armor: 0, mr: 0, hpRegen: 0, ...enemy } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true, environment: { ...DEFAULT_ENVIRONMENT, walls } } });
};
/** Held in place for the whole test: a skillshot can't miss it, so its hit counts in full. */
const rooted = (world: World) => applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "root", duration: 20 }, { scale: 1 });
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance: number }) => startCast(world, world.units[0], ability(world, key), aim);
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, idle); };
/** Steps until `done`, failing after 10 s of fight rather than hanging when it never comes. */
const until = (world: World, done: () => boolean, limit = 300) => {
  for (let i = 0; i < limit && !done(); i++) step(world, idle);
  expect(done(), "the awaited event never happened").toBe(true);
};
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const damageOf = (world: World, name: string) => logged(world, `${name} deals`).map((e) => Number(/deals (\d+(?:\.\d+)?)/.exec(e.text)?.[1]));
const landed = (world: World) => Number(world.units[0].memory.caskLanded ?? -1);
const cc = (world: World, key: string) => world.units[1].statuses.find((s) => s.kind === "cc" && s.key === key);

describe("Gragas reads the wiki at level 20", () => {
  it("Happy Hour, Barrel Roll, Drunken Rage, Body Slam and Explosive Cask", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 80, castTime: 0.25, cooldownAtCastStart: true, delivery: { kind: "circle", range: 850, radius: 250, delay: 0, speed: 1000 }, flags: { projectile: true, spellShield: true } });
    const w = spec.abilities.find((a) => a.key === "W")!;
    expect(w).toMatchObject({ cooldown: 5, cost: 30, castTime: 0, channel: { duration: 0.75, interruptible: true } });
    expect(w.channel?.onCompleteSelf).toEqual([{ type: "empower", attacks: 1, window: 5, bonusRange: 50, uncancellable: true, spellShieldOnHit: true, onHit: [{ type: "damage", damageType: "magic", amount: { base: 140, ratios: { targetMaxHP: 0.07, AP: 0.7 } }, label: "Drunken Rage" }] }]);
    const e = spec.abilities.find((a) => a.key === "E")!;
    expect(e).toMatchObject({ cooldown: 12, cost: 50, castTime: 0, delivery: { kind: "dash", direction: "toward", distance: 600, speed: 910, hitRadius: 180, hitCentered: true } });
    expect(e.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 260, ratios: { AP: 0.6 } } }, { type: "cc", cc: "stun", duration: 1 }]);
    const r = spec.abilities.find((a) => a.key === "R")!;
    expect(r).toMatchObject({ cooldown: 70, cost: 100, castTime: 0.25, delivery: { kind: "circle", range: 1000, radius: 400, delay: 0, flight: 0.5 }, flags: { projectile: true, spellShield: true } });
    expect(r.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 400, ratios: { AP: 0.8 } } }, { type: "displace", direction: "away", distance: 900, duration: 0.5, stopAtWall: true }]);
    expect(compiled.assumptions.filter((a) => a.includes("knock back"))).toHaveLength(2);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor({ ap: 100, abilityHaste: 20 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target)?.magic).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Happy Hour", () => {
  it("heals 5.5% of his maximum health after an ability's cast, then not again for 6 s however much ability haste he has", () => {
    const w = worldFor({ abilityHaste: 100 }, 2000);
    const self = w.units[0];
    self.hp = 0.5 * derive(self).maxHp;
    cast(w, "W");
    expect(self.hp).toBeCloseTo(0.555 * derive(self).maxHp, 6);
    through(w, 100);
    const hp = self.hp;
    cast(w, "E");
    expect(self.hp).toBe(hp);
    through(w, 180);
    cast(w, "W");
    expect(self.hp).toBeCloseTo(hp + 0.055 * derive(self).maxHp, 6);
  });

  it("detonating Barrel Roll isn't an ability's cast: it doesn't heal", () => {
    const w = worldFor({}, 300);
    const self = w.units[0];
    cast(w, "Q");
    until(w, () => landed(w) >= 0);
    // Happy Hour ready again, as if 6 s had passed.
    self.memory.happyReady = 0;
    self.hp = 0.5 * derive(self).maxHp;
    cast(w, "Q2");
    expect(logged(w, "Barrel Roll goes off")).toHaveLength(1);
    expect(self.hp).toBe(0.5 * derive(self).maxHp);
  });
});

describe("Barrel Roll", () => {
  it("can't be set off before the cask stops rolling", () => {
    const w = worldFor({}, 600);
    const self = w.units[0];
    cast(w, "Q");
    through(w, 12);
    expect(landed(w)).toBe(-1);
    expect(canCast(w, self, ability(w, "Q2"))).toBe(false);
    until(w, () => landed(w) >= 0);
    expect(canCast(w, self, ability(w, "Q2"))).toBe(true);
  });

  it("ferments from where it lands, not from the cast: set off 1 s after landing it deals 125% and slows 75%", () => {
    const w = worldFor({}, 700);
    rooted(w);
    cast(w, "Q");
    until(w, () => landed(w) >= 0);
    through(w, landed(w) + 29);
    cast(w, "Q2");
    expect(damageOf(w, "Barrel Roll")).toEqual([300]);
    expect(cc(w, "slow")?.value).toBeCloseTo(0.75, 9);
  });

  it("goes off by itself after 4 s, fully fermented: 150% of its damage and slow", () => {
    const w = worldFor({}, 300);
    rooted(w);
    cast(w, "Q");
    until(w, () => landed(w) >= 0);
    const land = landed(w);
    through(w, land + 119);
    expect(logged(w, "Barrel Roll goes off")).toHaveLength(0);
    through(w, land + 120);
    expect(logged(w, "Barrel Roll goes off (150%)")).toHaveLength(1);
    expect(damageOf(w, "Barrel Roll")).toEqual([360]);
    expect(cc(w, "slow")?.value).toBeCloseTo(0.9, 9);
  });

  it("misses an enemy no longer within 250 units of the cask", () => {
    const w = worldFor({}, 300);
    const target = w.units[1];
    cast(w, "Q");
    until(w, () => landed(w) >= 0);
    target.x += 500;
    cast(w, "Q2");
    expect(damageOf(w, "Barrel Roll")).toEqual([]);
  });
});

describe("Drunken Rage", () => {
  it("reduces damage by 26% for 2.5 s at once; after the 0.75 s channel the next attack deals 140 (+ 7% maximum health) more magic damage", () => {
    const w = worldFor({}, 100);
    const [self, target] = w.units;
    cast(w, "W");
    expect(self.statuses.find((s) => s.memoKey === "gragas:rage")?.value).toBeCloseTo(0.26, 9);
    expect(self.statuses.find((s) => s.memoKey === "gragas:rage")!.endTick).toBe(75);
    through(w, 23);
    expect(self.statuses.some((s) => s.kind === "empower")).toBe(true);
    startAttack(w, self);
    through(w, 60);
    expect(damageOf(w, "Drunken Rage")).toEqual([140 + 0.07 * ENEMY_HP]);
    expect(target.totals.damageTaken).toBeCloseTo(derive(self).ad + 140 + 0.07 * ENEMY_HP, 6);
  });

  it("empowers nothing when the channel is interrupted", () => {
    const w = worldFor({}, 100);
    const [self, target] = w.units;
    cast(w, "W");
    through(w, 10);
    applyEffect(w, target, self, { type: "cc", cc: "stun", duration: 0.5 }, { scale: 1 });
    through(w, 40);
    expect(self.statuses.some((s) => s.kind === "empower")).toBe(false);
    // The damage reduction stays.
    expect(self.statuses.some((s) => s.memoKey === "gragas:rage")).toBe(true);
  });
});

describe("Body Slam", () => {
  it("charges until it meets the enemy, stuns it 1 s and cuts 40% off its remaining cooldown", () => {
    const w = worldFor({}, 300);
    const self = w.units[0];
    cast(w, "E");
    until(w, () => logged(w, "Body Slam deals").length > 0);
    expect(cc(w, "stun")).toBeDefined();
    expect(cc(w, "stun")!.endTick - w.tick).toBe(30 - 1);
    const left = self.cooldownReady.E! - w.tick;
    // 12 s from the cast, less 40% of what was left when it hit.
    expect(left).toBeLessThan(0.6 * 12 * 30 + 2);
  });

  it("stuns an enemy immune to displacement", () => {
    const w = worldFor({}, 300);
    const target = w.units[1];
    applyEffect(w, target, target, { type: "state", state: "displacementImmune", duration: 10 }, { scale: 1 });
    cast(w, "E");
    until(w, () => logged(w, "Body Slam deals").length > 0);
    expect(cc(w, "stun")).toBeDefined();
  });

  it("Barrel Roll and Explosive Cask can be cast during the charge", () => {
    for (const key of ["Q", "R"]) {
      const w = worldFor({}, 500);
      const self = w.units[0];
      cast(w, "E");
      through(w, 3);
      expect(self.action?.kind).toBe("dash");
      expect(canCast(w, self, ability(w, key)), key).toBe(true);
    }
  });
});

describe("Explosive Cask", () => {
  it("lands 0.5 s after it is thrown, however far", () => {
    for (const distance of [200, 800]) {
      const w = worldFor({}, distance);
      cast(w, "R");
      through(w, 60);
      const hit = logged(w, "Explosive Cask deals");
      expect(hit, String(distance)).toHaveLength(1);
      expect(hit[0]!.tick).toBe(8 + 15);
    }
  });

  it("knocks the enemy 900 units away from where it lands: toward Gragas from behind it, away from him in front of it", () => {
    // No lane walls, so nothing stops the knock back short.
    const behind = worldFor({}, 600, {}, false);
    const [gragas, enemy] = behind.units;
    const start = enemy.x - gragas.x;
    cast(behind, "R", { direction: 1, distance: start + 300 });
    through(behind, 60);
    expect(enemy.x - gragas.x).toBeLessThan(start - 400);
    const front = worldFor({}, 300, {}, false);
    const [g2, e2] = front.units;
    const before = e2.x - g2.x;
    cast(front, "R", { direction: 1, distance: before - 300 });
    through(front, 60);
    expect(e2.x - g2.x).toBeCloseTo(before + 900, 0);
  });

  it("doesn't knock the enemy through terrain: a lane wall 300 units away, or terrain raised in its path", () => {
    const lane = worldFor({}, 300);
    const enemyStart = lane.units[1].x;
    cast(lane, "R", { direction: 1, distance: Math.abs(lane.units[1].x - lane.units[0].x) - 300 });
    through(lane, 60);
    expect(lane.units[1].x - enemyStart).toBeCloseTo(300, 6);
    const w = worldFor({}, 300, {}, false);
    const [self, enemy] = w.units;
    const wall = enemy.x + 200;
    w.terrain.push({ id: w.nextId++, owner: 0, from: wall, to: wall + 200, endTick: Number.POSITIVE_INFINITY });
    cast(w, "R", { direction: 1, distance: Math.abs(enemy.x - self.x) - 300 });
    through(w, 60);
    expect(enemy.x + enemy.spec.base.pathingRadius).toBeLessThanOrEqual(wall + 1e-6);
  });

  it("is a projectile: a projectile wall stops it", () => {
    const w = worldFor({}, 600);
    const [self, enemy] = w.units;
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: (self.x + enemy.x) / 2, radius: 0, startTick: 0, endTick: 600 });
    cast(w, "R");
    through(w, 60);
    expect(logged(w, "Explosive Cask deals")).toHaveLength(0);
    expect(hasState(enemy, "displacementImmune")).toBe(false);
  });
});

describe("Gragas fights", () => {
  it("against a dummy: Body Slam, Barrel Roll, Drunken Rage and Explosive Cask all come out", () => {
    const enemy = fighter({ id: "dummy", base: { hp: 4000, armor: 60, mr: 40, ad: 100 } });
    const spec: FighterSpec = { ...compiled.spec, bonus: { ap: 200, hp: 1000 } };
    const world = createWorld({ fighters: [spec, enemy], distance: 500, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 25 } });
    while (!world.result) step(world, [spec.behavior ?? defaultBehavior, defaultBehavior]);
    for (const name of ["Body Slam", "Barrel Roll", "Drunken Rage"]) expect(world.log.some((e) => e.side === 0 && e.text === `casts ${name}`), name).toBe(true);
    expect(world.result?.winner).toBe(0);
  });
});
