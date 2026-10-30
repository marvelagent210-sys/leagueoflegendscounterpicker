import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { Aim, World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Belveth");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 150, bonus: BonusStats = {}, options: Record<string, number> = {}): World => {
  const source = Object.keys(options).length > 0 ? kit("Belveth", options).spec : compiled.spec;
  const spec: FighterSpec = { ...source, bonus, base: { ...source.base, hpRegen: 0 } };
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
const bonusAD = (world: World) => derive(world.units[0]).ad - world.units[0].spec.base.ad;

describe("Bel'Veth reads the wiki at level 20", () => {
  it("Void Surge, Above and Below and Royal Maelstrom", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 1, delivery: { kind: "dash", distance: 400, speed: 850, through: true, hitRadius: 100 }, flags: { appliesOnHit: true, appliesLifeSteal: true } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 20, ratios: { AD: 1.05 } }, canCrit: true, critMultiplier: 2 });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 8, castTime: 0.5, castOrigin: "start", delivery: { kind: "line", range: 660, width: 200 } });
    expect(spec.abilities.find((a) => a.key === "W")?.onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 320, ratios: { AP: 1.5 } } },
      { type: "displace", direction: "away", distance: 0, duration: 1 },
      { type: "cc", cc: "slow", strength: 0.3, duration: 2 },
    ]);
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 12 });
    expect(spec.abilities.some((a) => a.slot === "R")).toBe(false);
    expect(compiled.assumptions.some((a) => a.includes("PerSideCooldown"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(150, { ad: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).true).toBeGreaterThan(0);
  });
});

describe("Death in Lavender", () => {
  it("2.3% bonus attack speed per Lavender stack, with no attack speed cap", () => {
    const none = worldFor(150, {}, { lavender: 0 });
    const some = worldFor(150, {}, { lavender: 40 });
    expect(derive(some.units[0]).bonusAttackSpeed - derive(none.units[0]).bonusAttackSpeed).toBeCloseTo(0.92);
    const fast = worldFor(150, { attackSpeed: 5 });
    expect(derive(fast.units[0]).attackSpeed).toBeGreaterThan(2.5);
  });

  it("every cast grants ghosting and 20% attack speed for 3 s", () => {
    const w = worldFor(2000);
    cast(w, "W");
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:belveth:cast")?.value).toBeCloseTo(0.2);
  });
});

describe("Endless Banquet", () => {
  it("the first hit marks the enemy for 5 s; each later hit deals 6 (+ 3% bonus AD) true damage per stack", () => {
    const w = worldFor(150, { ad: 100 });
    const per = 6 + 0.03 * bonusAD(w);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Endless Banquet deals")).toHaveLength(0);
    attackHit(w, w.units[0], w.units[1], false, []);
    attackHit(w, w.units[0], w.units[1], false, []);
    const hits = logged(w, "Endless Banquet deals").map((e) => Number(/deals (\d+)/.exec(e.text)![1]));
    expect(hits).toEqual([Math.round(per), Math.round(2 * per)]);
    wait(w, 5.1);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(logged(w, "Endless Banquet deals")).toHaveLength(2);
  });

  it("its active needs a Void Coral, which a duel never has; True Form only by option", () => {
    const w = worldFor(150, { ad: 100 }, { trueForm: 1 });
    step(w, idle);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:belveth:trueForm")?.value).toBeCloseTo(400 + 1.5 * bonusAD(w));
    expect(w.units[0].statuses.some((s) => s.kind === "stat" && s.key === "attackRange" && s.value === 125)).toBe(true);
    expect(w.units[0].statuses.some((s) => s.kind === "stat" && s.key === "attackSpeedMultiplier" && Math.abs(s.value - 0.2) < 1e-9)).toBe(true);
  });
});

describe("Void Surge", () => {
  it("dashes 400 through the enemy, the first hit crits for 200% and applies on-hit", () => {
    const w = worldFor(150, { critChance: 1 });
    const from = w.units[0].x;
    cast(w, "Q", { direction: 1, distance: 400 });
    settle(w);
    expect(w.units[0].x - from).toBeCloseTo(400, 0);
    expect(logged(w, "Void Surge deals")[0]?.text).toContain(`${Math.round((20 + 1.05 * derive(w.units[0]).ad) * 2)} physical`);
  });

  it("four directions, each with its own cooldown, 1 s apart", () => {
    const w = worldFor(2000);
    for (let i = 0; i < 4; i++) { expect(castable(w, "Q")).toBe(true); cast(w, "Q", { direction: -1, distance: 400 }); settle(w); wait(w, 1.05); }
    expect(castable(w, "Q")).toBe(false);
  });

  it("Above and Below on a champion resets a direction", () => {
    const w = worldFor(300);
    for (let i = 0; i < 4; i++) { cast(w, "Q", { direction: -1, distance: 400 }); settle(w); wait(w, 1.05); }
    expect(castable(w, "Q")).toBe(false);
    w.units[0].x = w.units[1].x - 300;
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "stun", duration: 2 }, { scale: 1 });
    cast(w, "W");
    settle(w);
    expect(castable(w, "Q")).toBe(true);
  });
});

describe("Royal Maelstrom", () => {
  it("1.5 s rooted with 60% damage reduction and 40% life steal, slashing 6 (+ 1 per 40% bonus attack speed) times", () => {
    const w = worldFor(150, {}, { lavender: 0 });
    cast(w, "E");
    expect(w.units[0].statuses.find((s) => s.kind === "state" && s.key === "damageReduction")?.value).toBe(0.6);
    expect(hasState(w.units[0], "noMovement")).toBe(true);
    wait(w, 1.6);
    // The cast itself grants 20% bonus attack speed: still 6 slashes.
    expect(logged(w, "Royal Maelstrom deals")).toHaveLength(6);
    const fast = worldFor(150, { attackSpeed: 0.8 }, { lavender: 0 });
    cast(fast, "E");
    wait(fast, 1.6);
    expect(logged(fast, "Royal Maelstrom deals")).toHaveLength(8);
  });

  it("slashes grow with the target's missing health, up to double", () => {
    const full = worldFor(150, {}, { lavender: 0 });
    cast(full, "E");
    wait(full, 0.1);
    const slash = 18 + 0.12 * derive(full.units[0]).ad;
    expect(Number(/deals (\d+)/.exec(logged(full, "Royal Maelstrom deals")[0]!.text)![1])).toBe(Math.round(slash));
    const low = worldFor(150, {}, { lavender: 0 });
    low.units[1].hp = HP * 0.02;
    cast(low, "E");
    wait(low, 0.1);
    expect(Number(/deals (\d+)/.exec(logged(low, "Royal Maelstrom deals")[0]!.text)![1])).toBeCloseTo(slash * 1.98, -1);
  });

  it("no slashes while she can't cast", () => {
    const w = worldFor(150, {}, { lavender: 0 });
    cast(w, "E");
    applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "stun", duration: 2 }, { scale: 1 });
    wait(w, 1.6);
    expect(logged(w, "Royal Maelstrom deals").length).toBeLessThanOrEqual(1);
  });

  it("casting another ability ends it", () => {
    const w = worldFor(300, {}, { lavender: 0 });
    cast(w, "E");
    wait(w, 0.3);
    cast(w, "W");
    expect(w.units[0].statuses.some((s) => s.memoKey === "belveth:storm")).toBe(false);
  });
});
