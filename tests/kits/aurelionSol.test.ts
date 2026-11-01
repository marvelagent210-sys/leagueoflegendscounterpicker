import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import { channelIn } from "../../engine/sim/channelState";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { ccTypes } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("AurelionSol");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 600, bonus: BonusStats = {}, stardust?: number): World => {
  const source = stardust === undefined ? compiled.spec : kit("AurelionSol", { stardust }).spec;
  const spec: FighterSpec = { ...source, bonus, base: { ...source.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const amount = (world: World, start: string, i = 0) => Number(/deals (\d+)/.exec(logged(world, start)[i]!.text)![1]);
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });

describe("Aurelion Sol reads the wiki at level 20, with 200 Stardust", () => {
  it("Breath of Light, Astral Flight, Singularity and The Skies Descend", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 3, cost: 0, cooldownAfter: "channel", channel: { duration: 160, interval: 0.125, cancelAfter: 0, range: 940 } });
    expect(spec.abilities.find((a) => a.key === "Q")!.channel?.mobile).toBeUndefined();
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 14, cost: 70, castTime: 0.4, delivery: { kind: "dash", distance: 1500 + 7.5 * 200 } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 12, cost: 90, castTime: 0.2, delivery: { kind: "circle", range: 940 } });
    expect((spec.abilities.find((a) => a.key === "E")!.delivery as { radius: number }).radius).toBeCloseTo(Math.sqrt(275 ** 2 + 16.93 ** 2 * 200));
    const r = spec.abilities.find((a) => a.key === "R")!;
    expect(r).toMatchObject({ name: "The Skies Descend", cooldown: 100, cost: 100, delivery: { kind: "circle", range: 1250, delay: 2 } });
    expect((r.delivery as { radius: number }).radius).toBeCloseTo(Math.sqrt(388.91 ** 2 + 21.85 ** 2 * 200));
  });

  it("under 75 Stardust, Falling Star", () => {
    const r = kit("AurelionSol", { stardust: 0 }).spec.abilities.find((a) => a.key === "R")!;
    expect(r).toMatchObject({ name: "Falling Star", delivery: { kind: "circle", radius: 275, delay: 1.25 } });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(600, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
  });
});

describe("Breath of Light", () => {
  it("burns for 13.125 (+ 6.875% AP) every 0.125 s, bursting each full second for 100 (+ 30% AP) (+ 6.2% of maximum health at 200 Stardust), draining 50 mana a second", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    const mana = w.units[0].resource;
    const start = w.tick;
    cast(w, "Q");
    // Pulses land on whole ticks (every 4 ticks), so the eighth, with the burst, lands just past a second.
    wait(w, 1.15);
    expect(amount(w, "Breath of Light deals")).toBe(Math.round(13.125 + 6.875));
    expect(logged(w, "Breath of Light (burst) deals")).toHaveLength(1);
    expect(amount(w, "Breath of Light (burst) deals")).toBeCloseTo(100 + 30 + 0.062 * HP, -1);
    expect(mana - w.units[0].resource).toBeCloseTo((50 * (w.tick - start)) / 30, -1);
  });

  it("stands still: moving ends it, and so does casting Singularity, The Skies Descend or Astral Flight", () => {
    const w = worldFor(600);
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.5);
    expect(channelIn(w.units[0].action)?.ability).toBe("Q");
    const x = w.units[0].x;
    step(w, [() => ({ kind: "move", direction: -1 }), () => undefined]);
    expect(channelIn(w.units[0].action)).toBeUndefined();
    expect(w.units[0].x).not.toBe(x);
    for (const key of ["E", "R", "W"]) {
      const v = worldFor(600);
      step(v, idle);
      cast(v, "Q");
      wait(v, 0.5);
      expect(canCast(v, v.units[0], ability(v, key)), key).toBe(true);
    }
  });

  it("ends a second after the enemy leaves its reach", () => {
    const w = worldFor(600);
    step(w, idle);
    cast(w, "Q");
    wait(w, 0.5);
    w.units[1].x = w.units[0].x + 2000;
    wait(w, 1.2);
    expect(w.units[0].action).toBeUndefined();
  });
});

describe("Singularity", () => {
  it("0.5 s later, 5 s of 7.5 (+ 3% AP) every 0.25 s, executing in its center below 10.2% (5% + 2.6% per 100 Stardust)", () => {
    const w = worldFor(600, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 10 });
    cast(w, "E");
    wait(w, 1.5);
    expect(amount(w, "Singularity deals")).toBe(Math.round(7.5 + 3));
    w.units[1].hp = 0.11 * HP;
    step(w, idle);
    expect(w.units[1].alive).toBe(true);
    w.units[1].hp = 0.1 * HP;
    step(w, idle);
    expect(w.units[1].alive && w.units[1].hp > 0).toBe(false);
  });
});

describe("Falling Star and The Skies Descend", () => {
  it("The Skies Descend: 2 s later, 437.5 (+ 93.75% AP) and a 1 s knock up", () => {
    const w = worldFor(800, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "R");
    wait(w, 2.1);
    expect(amount(w, "The Skies Descend deals")).toBe(Math.round(437.5 + 93.75));
    expect(ccTypes(w.units[1]).has("airborne")).toBe(true);
    wait(w, 3);
    expect(logged(w, "The Skies Descend (shockwave)")).toHaveLength(0);
  });

  it("an enemy the star missed takes the shockwave: 315 (+ 67.5% AP) and a 50% slow for 1 s", () => {
    const w = worldFor(800, { ap: 100 });
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 1 });
    cast(w, "R");
    step(w, idle);
    w.units[1].x += 1200;
    wait(w, 4);
    expect(logged(w, "The Skies Descend deals")).toHaveLength(0);
    expect(amount(w, "The Skies Descend (shockwave) deals")).toBe(Math.round(315 + 67.5));
  });

  it("Falling Star, under 75 Stardust: 1.25 s later, 350 (+ 75% AP) and a 1 s stun", () => {
    const w = worldFor(800, { ap: 100 }, 0);
    step(w, idle);
    onTarget(w, { type: "cc", cc: "root", duration: 3 });
    cast(w, "R");
    wait(w, 1.35);
    expect(amount(w, "Falling Star deals")).toBe(350 + 75);
    expect(ccTypes(w.units[1]).has("stun")).toBe(true);
  });
});
