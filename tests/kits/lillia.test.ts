import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Lillia");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}, moveSpeed = 0): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const taken = (world: World) => world.units[1].totals.damageTaken;
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const dustDamage = (ap = 0) => HP * (0.05 + 0.000125 * ap);
const dusted = (world: World) => { cast(world, "Q"); wait(world, 0.3); };

describe("Lillia reads the wiki at level 20", () => {
  it("Blooming Blows, Watch Out! Eep!, Swirlseed and Lilting Lullaby", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 4, cost: 65, castTime: 0.25, moveWhileCasting: true, delivery: { kind: "area", near: -485, far: 485, anchor: "caster", bands: [{ from: -225, to: 225 }] } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 75, ratios: { AP: 0.35 } } },
      { type: "damage", damageType: "true", amount: { base: 75, ratios: { AP: 0.35 } }, label: "Blooming Blows (outer edge)" },
    ]);
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 10, cost: 50, castTime: 0, delivery: { kind: "dash", distance: 350, minDistance: 0, time: 0.759 }, flags: { grounded: true, knockdown: true } });
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 12, cost: 70, castTime: 0.4, castOrigin: "start", delivery: { kind: "line", width: 120, speed: 5000 } });
    expect(spec.abilities.find((a) => a.key === "E")?.onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 160, ratios: { AP: 0.5 } } },
      { type: "cc", cc: "slow", strength: 0.4, duration: 3 },
      { type: "state", state: "revealed", duration: 2 },
    ]);
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 110, cost: 50, castTime: 0.4, moveWhileCasting: true });
    expect(compiled.assumptions.some((a) => a.includes("DotTicks"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { ap: 100 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target).magic).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Dream Dust", () => {
  it("an ability that hits burns 5% (+ 1.25% per 100 AP) of maximum health over 3 s, in 6 ticks", () => {
    const w = worldFor(300, { ap: 100 });
    dusted(w);
    const before = taken(w);
    wait(w, 3.2);
    expect(logged(w, "Dream Dust deals")).toHaveLength(6);
    expect(taken(w) - before).toBeCloseTo(dustDamage(100), 0);
  });

  it("a second ability refreshes it rather than adding a second one", () => {
    const w = worldFor(300);
    dusted(w);
    wait(w, 1);
    cast(w, "E");
    wait(w, 4);
    const ticksSeen = logged(w, "Dream Dust deals").length;
    expect(ticksSeen).toBeLessThanOrEqual(9);
    expect(ticksSeen).toBeGreaterThanOrEqual(8);
  });

  it("heals Lillia for 103.2 (+ 30% AP) over its duration", () => {
    const w = worldFor(300, { ap: 100 });
    w.units[0].hp = 1000;
    dusted(w);
    wait(w, 3.2);
    // The wiki's level-20 value of its 6 – 90 (based on level) series is 103.17.
    expect(w.units[0].hp - 1000).toBeCloseTo(103.168 + 30, 0);
  });

  it("is applied through a shield that takes the damage, but not through a spell shield", () => {
    const shielded = worldFor();
    onTarget(shielded, { type: "shield", amount: { base: 5000 }, duration: 10 });
    dusted(shielded);
    wait(shielded, 1);
    expect(logged(shielded, "Dream Dust deals").length).toBeGreaterThan(0);
    const spellShield = worldFor();
    onTarget(spellShield, { type: "state", state: "spellShield", duration: 10 });
    dusted(spellShield);
    wait(spellShield, 1);
    expect(logged(spellShield, "Dream Dust deals")).toHaveLength(0);
  });
});

describe("Prance", () => {
  it("a stack per ability that hits, up to 4, for 6.5 s, then one by one every 1.5 s", () => {
    const w = worldFor(300, { ap: 100 });
    const prance = () => Number(w.units[0].memory["lillia:prance"] ?? 0);
    for (let i = 0; i < 5; i++) { w.units[0].cooldownReady.Q = 0; dusted(w); }
    expect(prance()).toBe(4);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:lillia:prance")?.value).toBeCloseTo(4 * (0.07 + 0.0003 * 100));
    wait(w, 6.6);
    expect(prance()).toBe(3);
    wait(w, 1.5);
    expect(prance()).toBe(2);
  });

  it("a spell shield doesn't stop the stack", () => {
    const w = worldFor();
    onTarget(w, { type: "state", state: "spellShield", duration: 10 });
    dusted(w);
    expect(w.units[0].memory["lillia:prance"]).toBe(1);
    expect(taken(w)).toBe(0);
  });
});

describe("Blooming Blows", () => {
  it("magic damage within the inner circle; the outer edge adds the same again as true damage", () => {
    const close = worldFor(150);
    dusted(close);
    expect(logged(close, "Blooming Blows deals")).toHaveLength(1);
    expect(logged(close, "Blooming Blows (outer edge)")).toHaveLength(0);
    const edge = worldFor(400);
    dusted(edge);
    expect(logged(edge, "Blooming Blows (outer edge) deals 75 true")).toHaveLength(1);
  });

  it("Lillia can move while casting it", () => {
    const w = worldFor();
    cast(w, "Q");
    const x = w.units[0].x;
    step(w, [() => ({ kind: "move", direction: -1 }), () => undefined]);
    expect(w.units[0].x).toBeLessThan(x);
  });
});

describe("Watch Out! Eep!", () => {
  it("strikes 0.767 s after the cast, three times as hard within the epicenter, and Lillia can't move or attack until then", () => {
    const w = worldFor(300);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "W", { direction: 1, distance: 150 });
    expect(hasState(w.units[0], "noMovement")).toBe(true);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    wait(w, 0.7);
    expect(taken(w)).toBe(0);
    wait(w, 0.2);
    expect(taken(w)).toBeCloseTo(160 * 3, 0);
    expect(hasState(w.units[0], "noMovement")).toBe(false);
  });

  it("hops toward the strike, landing short of it", () => {
    const w = worldFor(450);
    const from = w.units[0].x;
    cast(w, "W", { direction: 1, distance: 300 });
    wait(w, 1);
    expect(w.units[0].x - from).toBeCloseTo(300, 0);
  });

  it("isn't cast at an enemy out of the strike's reach", () => {
    expect(castable(worldFor(500), "W")).toBe(true);
    expect(castable(worldFor(800), "W")).toBe(false);
  });
});

describe("Swirlseed", () => {
  it("lobs 700 units at 5000 speed, then rolls at 1400 until it hits", () => {
    const w = worldFor(1500);
    cast(w, "E");
    wait(w, 0.65);
    const seed = w.missiles.find((m) => m.source === "E")!;
    expect(seed.perTick).toBeCloseTo(1400 / 30);
    wait(w, 1);
    expect(logged(w, "Swirlseed deals 160 magic")).toHaveLength(1);
    expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(true);
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.4);
  });
});

describe("Lilting Lullaby", () => {
  it("needs an enemy with Dream Dust", () => {
    const w = worldFor();
    expect(castable(w, "R")).toBe(false);
    dusted(w);
    expect(castable(w, "R")).toBe(true);
  });

  it("arrives 0.3 s after its cast, makes the enemy drowsy (10% slower) for 1.5 s, then puts it to sleep for 3 s", () => {
    const w = worldFor();
    dusted(w);
    cast(w, "R");
    wait(w, 0.6);
    expect(w.units[1].statuses.some((s) => s.key === "drowsy")).toBe(false);
    wait(w, 0.2);
    expect(w.units[1].statuses.find((s) => s.key === "drowsy")?.value).toBe(0.1);
    wait(w, 1.5);
    const sleep = w.units[1].statuses.find((s) => s.key === "sleep");
    expect(sleep).toBeDefined();
    expect((sleep!.endTick - sleep!.startTick) / 30).toBeCloseTo(3);
  });

  it("Dream Dust doesn't wake the enemy; the next hit does, for 200 (+ 40% AP) more, once", () => {
    const w = worldFor(300, { ap: 100 });
    dusted(w);
    cast(w, "R");
    wait(w, 2.3);
    w.units[0].cooldownReady.Q = 0;
    cast(w, "E");
    wait(w, 0.2);
    expect(w.units[1].statuses.some((s) => s.key === "sleep")).toBe(true);
    wait(w, 0.5);
    expect(logged(w, "Lilting Lullaby (wake-up) deals 240 magic")).toHaveLength(1);
    expect(w.units[1].statuses.some((s) => s.key === "sleep")).toBe(false);
    dealDamage(w, w.units[0], w.units[1], 100, "physical", {});
    expect(logged(w, "Lilting Lullaby (wake-up)")).toHaveLength(1);
  });

  it("a spell shield blocks the drowsiness, not the sleep", () => {
    const w = worldFor();
    dusted(w);
    onTarget(w, { type: "state", state: "spellShield", duration: 10 });
    cast(w, "R");
    wait(w, 0.8);
    expect(w.units[1].statuses.some((s) => s.key === "drowsy")).toBe(false);
    wait(w, 1.5);
    expect(w.units[1].statuses.some((s) => s.key === "sleep")).toBe(true);
  });

  it("misses an enemy that becomes untargetable while it travels", () => {
    const w = worldFor();
    dusted(w);
    cast(w, "R");
    wait(w, 0.4);
    onTarget(w, { type: "state", state: "untargetable", duration: 0.5 });
    wait(w, 2.5);
    expect(w.units[1].statuses.some((s) => s.key === "drowsy" || s.key === "sleep")).toBe(false);
  });

  it("a cleansed drowsiness never becomes sleep", () => {
    const w = worldFor();
    dusted(w);
    cast(w, "R");
    wait(w, 0.8);
    onTarget(w, { type: "cleanse" });
    wait(w, 2);
    expect(w.units[1].statuses.some((s) => s.key === "sleep")).toBe(false);
  });

  it("Watch Out! Eep! is held while the lullaby is on its way", () => {
    const w = worldFor();
    dusted(w);
    cast(w, "R");
    wait(w, 0.5);
    expect(castable(w, "W")).toBe(false);
    wait(w, 1.8);
    expect(castable(w, "W")).toBe(true);
  });
});

describe("Lillia's behavior", () => {
  it("doesn't wake a sleeping enemy before Watch Out! Eep! lands on it", () => {
    const w = worldFor(300);
    dusted(w);
    w.units[1].statuses.push({ kind: "cc", key: "sleep", source: 0, startTick: w.tick, endTick: w.tick + 90, value: 0, ability: "R" });
    const behavior = w.units[0].spec.behavior!;
    const view = { world: w, self: w.units[0], enemy: w.units[1], mode: "fight" as const, distance: 300 - 130, threats: [] };
    expect(behavior(view)).toMatchObject({ kind: "cast", ability: "W" });
    cast(w, "W", { direction: 1, distance: 150 });
    expect(behavior({ ...view, distance: Math.abs(w.units[1].x - w.units[0].x) - 130 })).toEqual({ kind: "move", direction: 0 });
    expect(derive(w.units[0]).moveSpeed).toBeGreaterThan(0);
  });
});
