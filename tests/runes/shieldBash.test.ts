import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import type { ShieldType } from "../../engine/rules/defense";
import { startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect, attackHit, beginResurrection, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type AttackHitOptions, type World } from "../../engine/sim/state";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const BASE = 560 / 17;
const dummy = () => ({ ...fighter(), adaptiveType: "Physical" as const });
const recipient = () => fighter({ base: { hp: 12000, armor: 0, mr: 0 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});

const equipped = (spec: FighterSpec, id = 8401) => equipRuneEffects(spec, [id], catalog, rules).spec;
const arena = (owner: FighterSpec = dummy(), enemy = recipient()): World => createWorld({
  fighters: [equipped(owner), enemy], distance: 0, modes: ["idle", "idle"], settings: { log: true },
});
const shield = (world: World, amount: number, duration: number, shieldType: ShieldType = "normal") =>
  applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: amount }, duration, shieldType }, { scale: 1 });
const procs = (world: World) => world.log.filter(event => event.text.startsWith("Shield Bash deals"));
const activeShields = (world: World) => world.units[0].statuses.filter(status => status.kind === "shield");

function advanceTo(world: World, tick: number): void {
  while (world.tick < tick && !world.result) step(world, [idle, idle]);
  expect(world.tick).toBe(tick);
}

function basic(world: World, options: AttackHitOptions = {}): number {
  const [source, target] = world.units;
  const before = target.hp;
  attackHit(world, source, target, false, [], undefined, false, options);
  return before - target.hp;
}

describe("Shield Bash in native damage resolution", () => {
  it.each(["normal", "physical", "magic"] as const)("uses the level-20 formula with a %s shield", kind => {
    const world = arena({ ...dummy(), bonus: { hp: 400 } });
    shield(world, 200, 5, kind);
    expect(world.units[0].statuses.at(-1)?.kind).toBe("shield");
    expect(basic(world)).toBeCloseTo(100 + BASE + 10 + 30, 9);
    expect(basic(world)).toBe(100);
    expect(procs(world)).toHaveLength(1);
  });

  it("remembers the highest grown amount after damage shrinks the shield", () => {
    const world = arena(), [owner, enemy] = world.units;
    shield(world, 200, 5);
    const [first] = activeShields(world);
    first!.value = 400;
    dealDamage(world, enemy, owner, 380, "true");
    expect(first!.value).toBe(20);
    expect(basic(world)).toBeCloseTo(100 + BASE + 60, 9);
    first!.value = 500;
    expect(basic(world)).toBe(100);
    shield(world, 100, 5);
    expect(basic(world)).toBeCloseTo(100 + BASE + 15, 9);
    expect(procs(world)).toHaveLength(2);
  });

  it("chooses the largest eligible shield across overlaps and spends every older shield", () => {
    const world = arena();
    shield(world, 300, 1);
    shield(world, 140, 10, "magic");
    advanceTo(world, 89);
    expect(basic(world)).toBeCloseTo(100 + BASE + 45, 9);
    expect(activeShields(world)).toHaveLength(1);
    expect(basic(world)).toBe(100);
  });

  it("falls back to a smaller active shield on the stronger one's exact grace deadline", () => {
    const world = arena();
    shield(world, 300, 1);
    shield(world, 140, 10, "magic");
    advanceTo(world, 90);
    expect(basic(world)).toBeCloseTo(100 + BASE + 21, 9);
  });

  it("starts grace on actual depletion and copies eligibility independently", () => {
    const world = arena(), [owner, enemy] = world.units;
    shield(world, 200, 20);
    advanceTo(world, 5);
    dealDamage(world, enemy, owner, 200, "true");
    expect(activeShields(world)).toHaveLength(0);
    const copied = cloneWorld(world);
    advanceTo(copied, 64);
    expect(basic(copied)).toBeCloseTo(100 + BASE + 30, 9);
    expect(procs(world)).toHaveLength(0);
    advanceTo(world, 65);
    expect(basic(world)).toBe(100);
  });

  it("keeps a growing active shield's peak local to its copied world", () => {
    const world = arena();
    shield(world, 100, 5);
    const copied = cloneWorld(world);
    activeShields(copied)[0]!.value = 400;
    expect(basic(copied)).toBeCloseTo(100 + BASE + 60, 9);
    expect(basic(world)).toBeCloseTo(100 + BASE + 15, 9);
  });

  it("keeps shield identities optional in a duel without a shield observer", () => {
    const world = createWorld({ fighters: [dummy(), recipient()], distance: 0, modes: ["idle", "idle"] });
    shield(world, 200, 5);
    advanceTo(world, 1);
    expect(activeShields(world)[0]?.shieldInstance).toBeUndefined();
    expect(world.units[0].observedHealthShields).toBeUndefined();
    expect(world.combatEventSequence).toBeUndefined();
  });

  it("starts grace when a shield-breaking attack removes the remaining shield", () => {
    const world = arena(), [owner, enemy] = world.units;
    shield(world, 200, 20);
    advanceTo(world, 5);
    attackHit(world, enemy, owner, false, [], undefined, false, { breakShields: true });
    expect(activeShields(world)).toHaveLength(0);
    advanceTo(world, 65);
    expect(basic(world)).toBe(100);
  });

  it("keeps an unspent proc through denied attacks and grants it only once across repeated on-hits", () => {
    const world = arena(), target = world.units[1];
    shield(world, 200, 5);
    for (const protection of ["blockAttacks", "dodgeAttacks", "parry", "invulnerable"]) {
      target.statuses = [lasting("state", protection)];
      expect(basic(world)).toBe(0);
      expect(procs(world)).toHaveLength(0);
    }
    target.statuses = [];
    expect(basic(world, { onHitApplications: 3 })).toBeCloseTo(100 + BASE + 30, 9);
    expect(procs(world)).toHaveLength(1);
  });

  it("does not use a shield granted after a resolved on-hit was captured", () => {
    const target = { ...recipient(), hooks: { onIncomingOnHit(ctx) {
      if (ctx.memory.gifted) return;
      ctx.memory.gifted = true;
      ctx.apply({ type: "shield", amount: { base: 300 }, duration: 5 });
    } } } satisfies FighterSpec;
    const world = arena(dummy(), target);
    shield(world, 120, 5);
    expect(basic(world)).toBeCloseTo(100 + BASE + 18, 9);
    expect(basic(world)).toBeCloseTo(100 + BASE + 45, 9);
    expect(procs(world)).toHaveLength(2);
  });

  it("uses the native on-hit scale and keeps the proc outside ordinary spell callbacks", () => {
    const q = ability({ key: "Q", delivery: { kind: "target", range: 600 }, onHitScale: 0.5,
      flags: { appliesOnHit: true }, onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
    const owner = { ...dummy(), abilities: [q], hooks: { onAbilityHit(ctx) { ctx.memory.hits = Number(ctx.memory.hits ?? 0) + 1; } } } satisfies FighterSpec;
    const world = arena(owner), [source, enemy] = world.units;
    shield(world, 200, 5);
    const before = enemy.hp;
    startCast(world, source, q);
    expect(before - enemy.hp).toBeCloseTo(40 + (BASE + 30) / 2, 9);
    expect(source.memory.hits).toBe(1);
    expect(procs(world)).toHaveLength(1);
  });

  it("samples current adaptive stats and leaves life steal on the ordinary attack", () => {
    const world = arena(), owner = world.units[0];
    owner.hp = 1000;
    owner.statuses.push(lasting("stat", "AP", 100), lasting("stat", "lifeSteal", 1));
    shield(world, 200, 5);
    expect(basic(world)).toBeCloseTo(100 + BASE + 30, 9);
    expect(procs(world)[0]?.text).toMatch(/magic damage/);
    expect(owner.hp).toBe(1100);
  });

  it("drops prior shield eligibility during native resurrection", () => {
    const world = arena(), owner = world.units[0];
    shield(world, 200, 5);
    expect(beginResurrection(world, owner, { duration: 1 })).toBe(true);
    advanceTo(world, 31);
    expect(owner.resurrection).toBeUndefined();
    expect(basic(world)).toBe(100);
    shield(world, 200, 5);
    expect(basic(world)).toBeCloseTo(100 + BASE + 30, 9);
  });

  it("arms from Camille's native Adaptive Defenses for the following hit", () => {
    const world = arena(kit("Camille").spec), owner = world.units[0];
    expect(basic(world)).toBeCloseTo(derive(owner).ad, 9);
    expect(procs(world)).toHaveLength(0);
    const [passive] = activeShields(world);
    expect(passive?.value).toBeGreaterThan(0);
    const stats = derive(owner);
    expect(basic(world)).toBeCloseTo(stats.ad + BASE + 0.025 * (stats.maxHp - owner.spec.base.hp) + 0.15 * passive!.value, 9);
    expect(procs(world)).toHaveLength(1);
  });

  it("preserves a charge if the target gains parry during an incoming on-hit callback", () => {
    const target = { ...recipient(), hooks: { onIncomingOnHit(ctx) {
      if (ctx.memory.parried) return;
      ctx.memory.parried = true;
      ctx.apply({ type: "state", state: "parry", duration: 1 }, true);
    } } } satisfies FighterSpec;
    const world = arena(dummy(), target);
    shield(world, 200, 5);
    expect(basic(world)).toBe(100);
    expect(procs(world)).toHaveLength(0);
    world.units[1].statuses = [];
    expect(basic(world)).toBeCloseTo(100 + BASE + 30, 9);
  });

  it("tracks the refresh, growth and depleted remainder of Hwei's native pool shield", () => {
    const world = arena(kit("Hwei").spec), [owner, enemy] = world.units;
    const cast = (key: string) => startCast(world, owner, owner.spec.abilities.find(spell => spell.key === key)!);
    cast("W");
    cast("WW");
    const [pool] = activeShields(world);
    expect(pool?.value).toBeGreaterThan(0);
    const initial = pool!.value;
    advanceTo(world, 35);
    const peak = pool!.value;
    expect(peak).toBeGreaterThan(initial);
    dealDamage(world, enemy, owner, peak - 10, "true");
    expect(pool!.value).toBe(10);
    const stats = derive(owner);
    expect(basic(world)).toBeCloseTo(stats.ad + BASE + 0.025 * (stats.maxHp - owner.spec.base.hp) + 0.15 * peak, 9);
  });

  it("starts grace when Mordekaiser converts his shield into healing", () => {
    const world = arena(kit("Mordekaiser").spec), owner = world.units[0];
    const cast = (key: string) => startCast(world, owner, owner.spec.abilities.find(spell => spell.key === key)!);
    owner.memory.potential = 200;
    cast("W");
    advanceTo(world, 20);
    expect(activeShields(world)[0]?.value).toBe(200);
    cast("W2");
    expect(activeShields(world)).toHaveLength(0);
    advanceTo(world, 21);
    const copied = cloneWorld(world);
    advanceTo(copied, 79);
    basic(copied);
    expect(procs(copied)).toHaveLength(1);
    advanceTo(world, 80);
    basic(world);
    expect(procs(world)).toHaveLength(0);
  });

  it("uses Nunu's shortened shield deadline after releasing Absolute Zero early", () => {
    const world = arena(kit("Nunu").spec), owner = world.units[0];
    const cast = (key: string) => startCast(world, owner, owner.spec.abilities.find(spell => spell.key === key)!);
    cast("R");
    const [absoluteZero] = activeShields(world);
    expect(absoluteZero?.value).toBeGreaterThan(0);
    const originalEnd = absoluteZero!.endTick;
    advanceTo(world, 20);
    cast("R2");
    expect(absoluteZero!.endTick).toBeLessThan(originalEnd);
    const deadline = absoluteZero!.endTick + 60;
    const copied = cloneWorld(world);
    advanceTo(copied, deadline - 1);
    basic(copied);
    expect(procs(copied)).toHaveLength(1);
    advanceTo(world, deadline);
    basic(world);
    expect(procs(world)).toHaveLength(0);
  });

  it("delivers its separate packet within one native attack for opposing Bone Plating", () => {
    const world = arena(dummy(), equipped(recipient(), 8473));
    shield(world, 100, 5);
    const [source, target] = world.units;
    const before = target.hp;
    startAttack(world, source);
    expect(source.action?.kind).toBe("windup");
    while (source.action?.kind === "windup") step(world, [idle, idle]);
    expect(before - target.hp).toBe(100);
    expect(world.log.some(event => event.text.startsWith("Bone Plating blocks"))).toBe(true);
    expect(procs(world)[0]?.text).toBe("Shield Bash deals 0 physical damage");
  });
});
