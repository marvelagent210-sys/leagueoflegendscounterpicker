import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { damagePet, petsOf } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Zac");
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const HP = 20000;
const worldFor = (distance = 300, bonus: BonusStats = {}): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0 } };
  const world = createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: HP, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, log: true } });
  world.units[1].x = world.units[0].x + distance;
  return world;
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, idle); };
const wait = (world: World, seconds: number) => through(world, world.tick + Math.round(seconds * 30));
const settle = (world: World) => { while (world.units[0].action && !world.result) step(world, idle); };
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const onTarget = (world: World, effect: Parameters<typeof applyEffect>[3]) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const chunks = (world: World) => String(world.units[0].memory["zac:chunks"] ?? "").split(";").filter(Boolean);
const maxHp = (world: World) => derive(world.units[0]).maxHp;
const heal = 4 + 4 / 17 * 19;

describe("Zac reads the wiki at level 20", () => {
  it("Stretching Strikes, Unstable Matter, Elastic Slingshot and Let's Bounce!", () => {
    const spec = compiled.spec;
    expect(spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 8, cost: { base: 0, ratios: { currentHP: 0.08 } }, costType: "health", castTime: 0.33, delivery: { kind: "line", range: 800, width: 160, speed: 2800 } });
    expect(spec.abilities.find((a) => a.key === "Q")?.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 180, ratios: { AP: 0.3, bonusHP: 0.03 } } });
    expect(spec.abilities.find((a) => a.key === "W")).toMatchObject({ cooldown: 5, cost: { base: 0, ratios: { currentHP: 0.04 } }, delivery: { kind: "aura", radius: 350 } });
    const w = spec.abilities.find((a) => a.key === "W")!.onHit![0]!;
    expect(w).toMatchObject({ type: "damage", damageType: "magic", amount: { base: 80, ratios: { targetMaxHP: 0.08 } } });
    expect(w.type === "damage" ? w.amount.products?.[0]?.ratio : 0).toBeCloseTo(0.0003, 10);
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 9, cost: { base: 0, ratios: { currentHP: 0.04 } }, delivery: { kind: "dash", distance: 1800, speed: 1350, hitRadius: 265 } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 90, castTime: 0.3 });
    expect(compiled.assumptions.some((a) => a.includes("KnockbackDistance"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor(300, { hp: 1000 });
    expect(w.units[0].spec.budget?.healing?.(w.units[0], w.units[1])).toBeGreaterThan(0);
  });
});

describe("Goo", () => {
  it("a hit sheds a chunk between Zac and the enemy that he can take after 0.25 s, healing 8.47% of his maximum health", () => {
    const w = worldFor(150);
    w.units[0].hp = 1000;
    cast(w, "W");
    // Unstable Matter itself costs 4% of his current health.
    expect(w.units[0].hp).toBeCloseTo(960);
    expect(chunks(w)).toHaveLength(1);
    step(w, idle);
    expect(w.units[0].hp).toBeCloseTo(960);
    wait(w, 0.3);
    expect(chunks(w)).toHaveLength(0);
    expect(w.units[0].hp - 960).toBeCloseTo((heal / 100) * maxHp(w), 0);
  });

  it("the enemy destroys a chunk it reaches first", () => {
    const w = worldFor(150);
    w.units[0].hp = 1000;
    cast(w, "W");
    w.units[0].x -= 400;
    wait(w, 0.3);
    expect(chunks(w)).toHaveLength(0);
    expect(w.units[0].hp).toBeCloseTo(960);
  });

  it("a chunk takes 1 s off Unstable Matter's cooldown", () => {
    const w = worldFor(150);
    cast(w, "W");
    const ready = w.units[0].cooldownReady.W!;
    wait(w, 0.3);
    expect(w.units[0].cooldownReady.W).toBe(ready - 30);
  });
});

describe("Cell Division", () => {
  const kill = (w: World) => dealDamage(w, w.units[1], w.units[0], 1e6, "true", {});

  it("fatal damage: 4 s of resurrection at 50% health, untargetable, split into four bloblets of 12% each", () => {
    const w = worldFor(300);
    kill(w);
    expect(w.units[0].alive).toBe(true);
    expect(w.units[0].resurrection).toBeDefined();
    expect(w.units[0].hp).toBeCloseTo(maxHp(w) / 2);
    expect(hasState(w.units[0], "untargetable")).toBe(true);
    const blobs = petsOf(w, 0, "bloblet");
    expect(blobs).toHaveLength(4);
    expect(blobs[0]!.hp).toBeCloseTo(0.12 * maxHp(w));
    expect(blobs[0]!.spec.armor).toBeCloseTo(0.5 * (derive(w.units[0]).armor.base + derive(w.units[0]).armor.bonus));
    wait(w, 4.1);
    expect(w.units[0].resurrection).toBeUndefined();
    expect(petsOf(w, 0, "bloblet")).toHaveLength(0);
    expect(w.units[0].hp).toBeCloseTo(maxHp(w) / 2);
  });

  it("the bloblets can't be hit for 1.5 s, then return to Zac; their damage is echoed to him", () => {
    const w = worldFor(300);
    kill(w);
    const blob = petsOf(w, 0, "bloblet")[0]!;
    const x = blob.x;
    wait(w, 1);
    expect(blob.x).toBe(x);
    expect(blob.statuses?.some((s) => s.key === "untargetable" && s.endTick > w.tick)).toBe(true);
    wait(w, 0.6);
    const before = w.units[0].hp;
    damagePet(w, w.units[1], blob, 200, "true", false);
    expect(before - w.units[0].hp).toBeCloseTo(200);
    wait(w, 0.5);
    expect(Math.abs(blob.x - w.units[0].x)).toBeLessThan(Math.abs(x - w.units[0].x));
  });

  it("Zac is executed once every bloblet is dead", () => {
    const w = worldFor(300);
    kill(w);
    wait(w, 1.6);
    for (const blob of petsOf(w, 0, "bloblet")) damagePet(w, w.units[1], blob, 1e6, "true", false);
    step(w, idle);
    expect(w.units[0].alive).toBe(false);
  });

  it("only once every 300 s", () => {
    const w = worldFor(300);
    kill(w);
    wait(w, 4.1);
    kill(w);
    step(w, idle);
    expect(w.units[0].alive).toBe(false);
  });
});

describe("Stretching Strikes", () => {
  it("catches the enemy for 180 (+ 3% bonus health), slows it, and Zac can't move or attack while his arm is out", () => {
    const w = worldFor(700, { hp: 1000 });
    cast(w, "Q");
    settle(w);
    expect(hasState(w.units[0], "noMovement")).toBe(true);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    wait(w, 0.4);
    expect(logged(w, "Stretching Strikes deals")[0]?.text).toContain(`${Math.round(180 + 0.03 * 1000)} magic`);
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.4);
  });

  it("the tether makes the next attack a second strike: 0.25 s windup, 25 more range, the same magic damage, no critical strike", () => {
    const w = worldFor(150, { critChance: 1 });
    cast(w, "Q");
    wait(w, 0.5);
    startAttack(w, w.units[0]);
    const windup = w.units[0].action;
    expect(windup?.kind === "windup" ? windup.launchTick - windup.startTick : 0).toBe(8);
    settle(w);
    expect(logged(w, "Stretching Strikes (second strike) deals 180 magic")).toHaveLength(1);
    expect(logged(w, "attack deals")).toHaveLength(0);
  });

  it("a spell shield blocks the first strike's tether, so there is no second strike", () => {
    const w = worldFor(150);
    onTarget(w, { type: "state", state: "spellShield", duration: 5 });
    cast(w, "Q");
    wait(w, 0.5);
    expect(w.units[0].statuses.some((s) => s.kind === "empower" && s.key === "Q2")).toBe(false);
  });

  it("the tether breaks beyond 900", () => {
    const w = worldFor(150);
    cast(w, "Q");
    wait(w, 0.5);
    w.units[1].x += 1000;
    step(w, idle);
    expect(w.units[0].statuses.some((s) => s.kind === "empower" && s.key === "Q2")).toBe(false);
  });
});

describe("Elastic Slingshot", () => {
  it("charged over 1 s: knocks up and stuns for 1 s; charged less, for 0.5 s", () => {
    const long = worldFor(500);
    onTarget(long, { type: "cc", cc: "root", duration: 5 });
    long.units[0].memory["zac:eCharge"] = 1.1;
    cast(long, "E");
    settle(long);
    wait(long, 0.1);
    const stun = long.units[1].statuses.find((s) => s.key === "stun")!;
    expect((stun.endTick - stun.startTick) / 30).toBeCloseTo(1);
    const short = worldFor(500);
    onTarget(short, { type: "cc", cc: "root", duration: 5 });
    short.units[0].memory["zac:eCharge"] = 0.6;
    cast(short, "E");
    settle(short);
    wait(short, 0.1);
    const brief = short.units[1].statuses.find((s) => s.key === "stun")!;
    expect((brief.endTick - brief.startTick) / 30).toBeCloseTo(0.5);
  });

  it("displacement immunity resists the stun as well", () => {
    const w = worldFor(500);
    onTarget(w, { type: "state", state: "displacementImmune", duration: 5 });
    onTarget(w, { type: "cc", cc: "root", duration: 5 });
    cast(w, "E");
    settle(w);
    wait(w, 0.1);
    expect(w.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    expect(logged(w, "Elastic Slingshot deals 240 magic")).toHaveLength(1);
  });

  it("reaches farther the longer it charges, up to 1800 at 1.3 s", () => {
    const w = worldFor(1500);
    w.units[0].memory["zac:eCharge"] = 0.5;
    cast(w, "E");
    wait(w, 0.45);
    expect(Number(w.units[0].memory["zac:eDistance"])).toBeCloseTo(1800 * (14 / 30) / 1.3, -1);
  });
});

describe("Let's Bounce!", () => {
  it("four bounces a second apart: the first knocks back 250 and slows by 20%, later ones deal 50%", () => {
    // Close enough that the knocked-back enemy is still within the later bounces.
    const w = worldFor(100);
    onTarget(w, { type: "cc", cc: "root", duration: 10 });
    const x = w.units[1].x;
    cast(w, "R");
    settle(w);
    wait(w, 0.1);
    expect(logged(w, "Let's Bounce! deals 260 magic")).toHaveLength(1);
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.2);
    wait(w, 1.2);
    expect(w.units[1].x - x).toBeCloseTo(250, -1);
    wait(w, 2.5);
    expect(logged(w, "Let's Bounce! deals 130 magic")).toHaveLength(3);
  });

  it("no attacks, Stretching Strikes or Elastic Slingshot while bouncing; ghosting and growing movement speed", () => {
    const w = worldFor(200);
    cast(w, "R");
    settle(w);
    expect(castable(w, "Q")).toBe(false);
    expect(castable(w, "E")).toBe(false);
    expect(hasState(w.units[0], "noAttacks")).toBe(true);
    expect(hasState(w.units[0], "ghosted")).toBe(true);
    step(w, idle);
    const early = Number(w.units[0].statuses.find((s) => s.memoKey === "buff:zac:bounceSpeed")?.value);
    wait(w, 2);
    expect(Number(w.units[0].statuses.find((s) => s.memoKey === "buff:zac:bounceSpeed")?.value)).toBeGreaterThan(early);
    expect(early).toBeCloseTo(0.2, 1);
  });

  it("picks up the chunks around Zac as it bounces", () => {
    const w = worldFor(5000);
    w.units[0].hp = 1000;
    w.units[0].memory["zac:chunks"] = `${w.units[0].x + 200}@0@9999`;
    cast(w, "R");
    settle(w);
    step(w, idle);
    expect(chunks(w)).toHaveLength(0);
    expect(w.units[0].hp).toBeGreaterThan(1000);
  });
});

describe("Zac's attacks", () => {
  it("a plain attack sheds no chunk", () => {
    const w = worldFor(150);
    attackHit(w, w.units[0], w.units[1], false, []);
    expect(chunks(w)).toHaveLength(0);
  });
});
