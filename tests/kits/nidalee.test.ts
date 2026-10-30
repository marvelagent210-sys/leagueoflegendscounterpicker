import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Nidalee");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 500, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => {
  const all = [...world.units[0].spec.abilities, ...Object.values(world.units[0].spec.forms ?? {}).flatMap((f) => f.abilities)];
  return all.find((a) => a.key === key)!;
};
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const cougar = (world: World) => world.units[0].spec.form === "Cougar Form";
const toCougar = (world: World) => { cast(world, "R"); expect(cougar(world)).toBe(true); };
const hunt = (world: World) => { onTarget(world, { type: "cc", cc: "stun", duration: 5 }); cast(world, "Q"); settle(world); wait(world, 1.5); };

describe("Nidalee reads the wiki at level 20", () => {
  it("both forms", () => {
    const spec = compiled.spec;
    expect(spec.attack).toMatchObject({ range: 525, ranged: true });
    expect(spec.forms?.["Cougar Form"]?.attack).toMatchObject({ range: 125, ranged: false });
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 6, cost: 70, castTime: 0.25, castOrigin: "start", delivery: { kind: "line", range: 1500, width: 80, speed: 1300 } });
    expect(spec.abilities.find((a) => a.key === "E")?.onSelf).toEqual([{ type: "stat", stat: "attackSpeed", amount: { base: 0.7 }, duration: 7 }]);
    const cougarSpells = spec.forms!["Cougar Form"]!.abilities;
    expect(cougarSpells.find((a) => a.key === "WC")).toMatchObject({ cooldown: 6, delivery: { kind: "dash", distance: 375, time: 0.5, hitRadius: 250 } });
    expect(cougarSpells.find((a) => a.key === "WC")?.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 190, ratios: { bonusAD: 0.5, AP: 0.3 } } });
    expect(cougarSpells.find((a) => a.key === "EC")).toMatchObject({ cooldown: 6, castTime: 0.25, delivery: { kind: "area", near: 0, far: 310 } });
    expect(cougarSpells.find((a) => a.key === "QC")).toMatchObject({ cooldown: 6, cooldownAfter: "empower" });
    expect(cougarSpells.find((a) => a.key === "RC")).toMatchObject({ cooldownKey: "R", cooldown: 3 });
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(500, { ap: 100 });
    expect(w.units[0].spec.budget?.damage?.(w.units[0], w.units[1]).magic).toBeGreaterThan(0);
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Javelin Toss and the Hunt", () => {
  it("deals 150 (+ 50% AP) up to 525 away, up to 225% more by 1300", () => {
    const near = worldFor(500);
    onTarget(near, { type: "cc", cc: "stun", duration: 5 });
    cast(near, "Q");
    settle(near);
    wait(near, 1);
    expect(logged(near, "Javelin Toss deals 150 magic")).toHaveLength(1);
    const far = worldFor(1300);
    onTarget(far, { type: "cc", cc: "stun", duration: 5 });
    cast(far, "Q");
    settle(far);
    wait(far, 1.5);
    expect(logged(far, "Javelin Toss deals 488 magic")).toHaveLength(1);
  });

  it("a hit marks the enemy Hunted for 4 s, reveals it, speeds Nidalee up, and resets Aspect of the Cougar in Human Form", () => {
    const w = worldFor(500);
    w.units[0].cooldownReady.R = 999;
    hunt(w);
    expect(Number(w.units[0].memory["nidalee:huntUntil"])).toBeGreaterThan(w.tick);
    expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(true);
    expect(w.units[0].cooldownReady.R).toBeLessThanOrEqual(w.tick);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:nidalee:hunt")?.value).toBeCloseTo(0.3);
  });
});

describe("Bushwhack and Primal Surge", () => {
  it("a trap arms after 1.5 s, burns 200 (+ 20% AP) over 4 s and Hunts the enemy that steps on it", () => {
    const w = worldFor(300);
    onTarget(w, { type: "cc", cc: "stun", duration: 3 });
    cast(w, "W");
    settle(w);
    wait(w, 1.3);
    expect(logged(w, "Bushwhack deals")).toHaveLength(0);
    wait(w, 5);
    expect(logged(w, "Bushwhack deals")).toHaveLength(4);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(200, 0);
  });

  it("Primal Surge heals 150 (+ 35% AP), more the more health she is missing, up to double", () => {
    const full = worldFor(2000);
    const max = derive(full.units[0]).maxHp;
    full.units[0].hp = max - 1;
    cast(full, "E");
    settle(full);
    expect(logged(full, "heals")).toHaveLength(1);
    const low = worldFor(2000);
    low.units[0].hp = 0.05 * max;
    cast(low, "E");
    settle(low);
    expect(low.units[0].hp - 0.05 * max).toBeCloseTo(300, 0);
  });
});

describe("Cougar Form", () => {
  it("Takedown: 80 (+ 75% AD) magic, 1.75% more per 1% missing health up to 175%", () => {
    const w = worldFor(100);
    toCougar(w);
    w.units[1].hp = HP / 2;
    cast(w, "QC");
    startAttack(w, w.units[0]);
    settle(w);
    const ad = derive(w.units[0]).ad;
    expect(logged(w, "Takedown deals")[0]?.text).toContain(`${Math.round((80 + 0.75 * ad) * (1 + 0.0175 * 50))} magic`);
  });

  it("Takedown deals 30% more on the first hit of a Hunted enemy", () => {
    const w = worldFor(100);
    hunt(w);
    toCougar(w);
    cast(w, "QC");
    startAttack(w, w.units[0]);
    settle(w);
    const ad = derive(w.units[0]).ad;
    const missing = 100 * (HP - (w.units[1].hp + Number(/deals (\d+)/.exec(logged(w, "Takedown deals")[0]!.text)![1]))) / HP;
    expect(Number(/deals (\d+)/.exec(logged(w, "Takedown deals")[0]!.text)![1])).toBeCloseTo((80 + 0.75 * ad) * (1 + 0.0175 * missing) * 1.3, -1);
  });

  it("switching back to Human Form loses an unused Takedown", () => {
    const w = worldFor(100);
    toCougar(w);
    cast(w, "QC");
    wait(w, 3.1);
    cast(w, "RC");
    expect(w.units[0].statuses.some((s) => s.kind === "empower" && s.key === "QC")).toBe(false);
  });

  it("Pounce: 375 leap hitting within 250; onto a Hunted enemy up to 750, then only 1.5 s of cooldown", () => {
    const w = worldFor(700);
    hunt(w);
    toCougar(w);
    w.units[0].memory["nidalee:leap"] = 700 - 130;
    const from = w.units[0].x;
    cast(w, "WC");
    settle(w);
    expect(w.units[0].x - from).toBeGreaterThan(500);
    expect(logged(w, "Pounce deals 190 magic")).toHaveLength(1);
    expect(w.units[0].cooldownReady.WC! - w.tick).toBeLessThanOrEqual(45);
    const plain = worldFor(700);
    plain.units[0].cooldownReady.R = 0;
    cast(plain, "R");
    const start = plain.units[0].x;
    cast(plain, "WC");
    settle(plain);
    expect(plain.units[0].x - start).toBeCloseTo(375, 0);
    expect(castable(plain, "WC")).toBe(false);
  });

  it("Swipe hits within 310 in front of her", () => {
    const w = worldFor(300);
    toCougar(w);
    cast(w, "EC");
    settle(w);
    expect(logged(w, "Swipe deals 250 magic")).toHaveLength(1);
  });
});
