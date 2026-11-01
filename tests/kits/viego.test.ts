import { describe, expect, it } from "vitest";
import { attackTiming, canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Viego");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const marked = (world: World) => world.units[1].statuses.some((s) => s.kind === "mark" && s.key === "viego:mark");
const view = (w: World, mode: "fight" | "flee" = "fight") => ({ world: w, self: w.units[0], enemy: w.units[1], mode, distance: Math.abs(w.units[1].x - w.units[0].x) - 130, threats: [] });

describe("Viego reads the wiki at level 20", () => {
  it("Blade of the Ruined King, Spectral Maw, Harrowed Path and Heartbreaker", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 3, castTime: 0.349936, delivery: { kind: "line", range: 600, width: 125 } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 8, castTime: 1, moveWhileCasting: true, delivery: { kind: "line", range: 900, width: 120, speed: 1300 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 6, castTime: 0, overlay: true });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, castTime: 0.5, delivery: { kind: "blink", direction: "toward", distance: 500, hitRadius: 300 }, flags: { appliesOnHit: true, dodge: true, block: true } });
    expect(spec.attack.onHit?.[0]).toMatchObject({ amount: { base: 0, ratios: { targetCurrentHP: 0.06 } }, minimum: { base: 30 }, canCrit: true, critMultiplier: 1.7 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { ad: 100, critChance: 0.5 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).physical).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Blade of the Ruined King's passive", () => {
  it("his attacks deal 6% of the target's current health, at least 30, critically striking for 170%", () => {
    const w = worldFor(150);
    attackHit(w, w.units[0], w.units[1], false, []);
    // The attack lands first: 6% of what is left.
    expect(amount(w, "Blade of the Ruined King deals")).toBe(Math.round(0.06 * (HP - amount(w, "attack deals"))));
    w.units[1].hp = 300;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Blade of the Ruined King deals", 1)).toBe(30);
    const crit = worldFor(150, { critChance: 1 });
    attackHit(crit, crit.units[0], crit.units[1], false, []);
    expect(amount(crit, "Blade of the Ruined King deals")).toBe(Math.round(0.06 * 1.7 * (HP - amount(crit, "attack deals"))));
  });

  it("an ability's hit marks the enemy for 4 s; his next attack strikes again for 20% AD (+ 15% AP), with on-hit effects, and heals 150% of it", () => {
    const w = worldFor(300, { ad: 100, ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "Q");
    settle(w);
    expect(marked(w)).toBe(true);
    w.units[0].hp = 1000;
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(marked(w)).toBe(false);
    const strike = amount(w, "Blade of the Ruined King (second strike) deals");
    expect(strike).toBe(Math.round(0.2 * derive(w.units[0]).ad + 0.15 * 100));
    // The second strike applies on-hit effects: a second 6% of current health.
    expect(logged(w, "Blade of the Ruined King deals")).toHaveLength(3);
    expect(w.units[0].hp - 1000).toBeCloseTo(1.5 * strike, -1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Blade of the Ruined King (second strike)")).toHaveLength(1);
  });

  it("the second strike critically strikes for 200%; a blocked attack keeps the mark", () => {
    const w = worldFor(300, { critChance: 1 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "Q");
    settle(w);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(amount(w, "Blade of the Ruined King (second strike) deals")).toBe(Math.round(2 * 0.2 * derive(w.units[0]).ad));
    const blocked = worldFor(300);
    step(blocked, idle);
    onTarget(blocked, { type: "cc", cc: "stun", duration: 3 });
    cast(blocked, "Q");
    settle(blocked);
    onTarget(blocked, { type: "state", state: "blockAttacks", duration: 1 });
    attackHit(blocked, blocked.units[0], blocked.units[1], false, []);
    expect(logged(blocked, "Blade of the Ruined King (second strike)")).toHaveLength(0);
    expect(marked(blocked)).toBe(true);
  });
});

describe("Blade of the Ruined King", () => {
  it("thrusts 600 for 85 (+ 70% AD), increased by critical strikes, after 140% of his attack windup", () => {
    const w = worldFor(300, { critChance: 0.5 });
    step(w, idle);
    const castTime = ability(w, "Q").castTimeFor!(w.units[0]);
    expect(castTime).toBeCloseTo((1.4 * attackTiming(w.units[0]).windup) / 30, 1);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "Q");
    settle(w);
    const d = derive(w.units[0]);
    expect(amount(w, "Blade of the Ruined King deals")).toBe(Math.round((85 + 0.7 * d.ad) * (1 + 0.5 * (d.critDamage - 1))));
  });
});

describe("Spectral Maw", () => {
  it("a quick release reaches 500 and stuns for 0.25 s; then Viego dashes 300 after it", () => {
    const w = worldFor(400, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    w.units[0].memory["viego:charge"] = 0;
    const x = w.units[0].x;
    cast(w, "W");
    wait(w, 0.5);
    expect(amount(w, "Spectral Maw deals")).toBe(400);
    const stun = w.units[1].statuses.find((s) => s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(0.25, 1);
    expect(w.units[0].x - x).toBeCloseTo(300);
    expect(marked(w)).toBe(true);
  });

  it("charged for a full second it stuns for 1.25 s, while he is slowed by 10%", () => {
    const w = worldFor(800);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    w.units[0].memory["viego:charge"] = 1;
    cast(w, "W");
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:charging")?.value).toBeCloseTo(-0.1);
    wait(w, 1.8);
    const stun = w.units[1].statuses.find((s) => s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(1.25, 1);
  });

  it("resets his attack timer", () => {
    const w = worldFor(300);
    step(w, idle);
    w.units[0].memory["viego:charge"] = 0;
    w.units[0].attackReadyTick = w.tick + 90;
    cast(w, "W");
    expect(w.units[0].attackReadyTick).toBeLessThanOrEqual(w.tick);
  });
});

describe("Harrowed Path", () => {
  it("in the mist: 50% attack speed, and after 1 s without attacking or casting, 35% (+ 4% per 100 AP) movement speed", () => {
    const w = worldFor(300, { ap: 100 });
    step(w, idle);
    cast(w, "E");
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistSpeed")?.value).toBeCloseTo(0.5);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistMove")?.value ?? 0).toBe(0);
    wait(w, 1.1);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistMove")?.value).toBeCloseTo(0.39);
  });

  it("the mist lasts 8 s and only where it lies", () => {
    const w = worldFor(300);
    step(w, idle);
    cast(w, "E");
    w.units[0].x -= 50;
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistSpeed")?.value ?? 0).toBe(0);
    w.units[0].x += 50;
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistSpeed")?.value).toBeCloseTo(0.5);
    wait(w, 8.1);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:viego:mistSpeed")?.value ?? 0).toBe(0);
  });

  it("can be cast during his other abilities", () => {
    const w = worldFor(800);
    step(w, idle);
    w.units[0].memory["viego:charge"] = 1;
    cast(w, "W");
    expect(castable(w, "E")).toBe(true);
  });
});

describe("Heartbreaker", () => {
  it("blinks in for 20% (+ 5% per 100 bonus AD) of missing health plus 120% AD, slowing by 99% for 0.25 s; displacement immune while casting", () => {
    const w = worldFor(600, { ad: 100 });
    step(w, idle);
    w.units[1].hp = HP / 2;
    cast(w, "R");
    expect(hasState(w.units[0], "displacementImmune")).toBe(true);
    wait(w, 0.6);
    const bonusAD = derive(w.units[0]).ad - w.units[0].spec.base.ad;
    expect(amount(w, "Heartbreaker deals")).toBe(Math.round((0.2 + 0.0005 * bonusAD) * (HP / 2)));
    expect(amount(w, "Heartbreaker deals", 1)).toBe(Math.round(1.2 * derive(w.units[0]).ad));
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBeCloseTo(0.99);
    expect(Math.abs(w.units[1].x - w.units[0].x)).toBeLessThan(300);
  });

  it("strikes like an attack: it consumes the mark", () => {
    const w = worldFor(300);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "Q");
    settle(w);
    cast(w, "R");
    wait(w, 0.6);
    expect(logged(w, "Blade of the Ruined King (second strike)")).toHaveLength(1);
    expect(marked(w)).toBe(false);
  });
});

describe("Viego's behavior", () => {
  it("lays the mist toward the enemy first, and saves Heartbreaker until the enemy is below half health", () => {
    const w = worldFor(300);
    step(w, idle);
    expect(w.units[0].spec.behavior!(view(w))).toEqual({ kind: "cast", ability: "E" });
    cast(w, "E");
    step(w, idle);
    w.units[0].cooldownReady.Q = w.units[0].cooldownReady.W = 1e9;
    expect(w.units[0].spec.behavior!(view(w))).not.toEqual({ kind: "cast", ability: "R" });
    w.units[1].hp = HP * 0.45;
    expect(w.units[0].spec.behavior!(view(w))).toEqual({ kind: "cast", ability: "R" });
  });

  it("charges Spectral Maw just long enough to reach", () => {
    const w = worldFor(700);
    step(w, idle);
    w.units[0].cooldownReady.E = 1e9;
    w.units[0].spec.behavior!(view(w));
    expect(Number(w.units[0].memory["viego:charge"])).toBeCloseTo(0.6, 1);
  });
});
