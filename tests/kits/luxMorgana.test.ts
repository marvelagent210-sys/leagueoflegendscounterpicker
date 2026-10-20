import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { evaluate } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import Lux from "../../kits/champions/Lux";
import Morgana from "../../kits/champions/Morgana";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, pets, records, runes } from "./helpers";

const compile = (id: string, module: typeof Lux) => compileKit(championData(id), records(id), module, {}, pets(id), runes());
const lux = compile("Lux", Lux);
const morgana = compile("Morgana", Morgana);
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
const dummy = () => fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } });
function worldFor(spec: FighterSpec, ap = 100): World {
  const world = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0 }, bonus: { ...spec.bonus, ap } }, dummy()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  return world;
}
function advanceThrough(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function hit(world: World, key: string): void {
  const [self, enemy] = world.units;
  const spec = ability(self.spec, key);
  abilityHit(world, self, enemy, spec, spec.onHit ?? []);
}
const spell = (onHit: AbilitySpec["onHit"]): AbilitySpec => ({ key: "enemySpell", name: "Enemy spell", slot: "Q", cooldown: 1, castTime: 0, delivery: { kind: "target", range: 1000 }, onHit });
const mark = (world: World) => world.units[1].statuses.find((s) => s.kind === "mark" && s.key === "illumination");

describe("Lux source-backed kit", () => {
  it("compiles all four slots and level-20 Illumination from committed source values", () => {
    expect(lux.spec.abilities.map((a) => a.slot)).toEqual(["Q", "W", "E", "R"]);
    const world = worldFor(lux.spec);
    const qDamage = ability(lux.spec, "Q").onHit![0]!;
    expect(evaluate(qDamage.type === "damage" ? qDamage.amount : { base: 0 }, world.units[0], world.units[1])).toBe(315);
    expect(ability(lux.spec, "Q").delivery).toEqual({ kind: "line", range: 1300, width: 140, speed: 1200 });
    expect(ability(lux.spec, "E").cooldown).toBe(8);
    expect(ability(lux.spec, "R").cooldown).toBe(40);
    hit(world, "Q");
    const before = world.units[1].hp;
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(before - world.units[1].hp - world.units[0].spec.base.ad).toBeCloseTo(255);
    expect(mark(world)).toBeUndefined();
    expect(lux.evidence.some((e) => e.revid === 4059694)).toBe(true);
  });

  it("roots for two seconds and refreshes rather than stacking Illumination", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    expect(world.units[1].statuses.find((s) => s.key === "root")?.endTick).toBe(60);
    world.tick = 90;
    hit(world, "E");
    expect(world.units[1].statuses.filter((s) => s.key === "illumination")).toHaveLength(1);
    expect(mark(world)?.endTick).toBe(270);
  });

  it.each(["blind", "dodge"])("retains the passive mark after an attack misses through %s", (defense) => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    if (defense === "dodge") applyEffect(world, world.units[1], world.units[1], { type: "state", state: "dodgeAttacks", duration: 2 }, { scale: 1 });
    const before = world.units[1].hp;
    attackHit(world, world.units[0], world.units[1], defense === "blind", []);
    expect(world.units[1].hp).toBe(before);
    expect(mark(world)).toBeDefined();
  });

  it("consumes a mark on a blocked attack without dealing its passive damage", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "blockAttacks", duration: 2 }, { scale: 1 });
    const before = world.units[1].hp;
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[1].hp).toBe(before);
    expect(mark(world)).toBeUndefined();
  });

  it("basic-attack Illumination bypasses a spell shield", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 2 }, { scale: 1 });
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(mark(world)).toBeUndefined();
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });

  it("Final Spark detonates an existing mark once and leaves a new six-second mark", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    const before = world.units[1].hp;
    world.tick = 30;
    hit(world, "R");
    expect(before - world.units[1].hp).toBeCloseTo(620 + 255);
    expect(mark(world)?.endTick).toBe(210);
    expect(ability(lux.spec, "R").onHit).toHaveLength(2);
  });

  it("a spell shield blocks Final Spark and leaves the old mark intact", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 2 }, { scale: 1 });
    const marked = mark(world);
    const before = world.units[1].hp;
    hit(world, "R");
    expect(world.units[1].hp).toBe(before);
    expect(mark(world)).toBe(marked);
  });

  it("extends a nearly expired mark at attack declaration and at laser cast start", () => {
    const world = worldFor(lux.spec);
    hit(world, "Q");
    world.tick = 179;
    startAttack(world, world.units[0]);
    expect(mark(world)?.endTick).toBe(187);
    world.units[0].action = undefined;
    mark(world)!.endTick = 190;
    startCast(world, world.units[0], ability(lux.spec, "R"));
    expect(mark(world)?.endTick).toBe(217);
  });

  it("grants the first W shield immediately and preserves its remainder on return", () => {
    const world = worldFor(lux.spec);
    startCast(world, world.units[0], ability(lux.spec, "W"));
    expect(world.units[0].statuses.find((s) => s.kind === "shield")?.value).toBe(140);
    dealDamage(world, world.units[1], world.units[0], 40, "true");
    advanceThrough(world, 29);
    expect(world.units[0].statuses.filter((s) => s.kind === "shield")).toHaveLength(1);
    advanceThrough(world, 30);
    const shields = world.units[0].statuses.filter((s) => s.kind === "shield");
    expect(shields.map((s) => s.value)).toEqual([100, 140]);
    expect(shields.map((s) => s.endTick)).toEqual([105, 105]);
  });

  it("a projectile wall destroys W's wand without removing its first shield", () => {
    const world = worldFor(lux.spec);
    world.zones.push({ id: 10, owner: 1, kind: "projectileWall", seenTick: 0, x: 400, radius: 0, startTick: 0, endTick: 100 });
    startCast(world, world.units[0], ability(lux.spec, "W"));
    advanceThrough(world, 40);
    expect(world.units[0].statuses.filter((s) => s.kind === "shield").map((s) => s.value)).toEqual([140]);
    expect(world.units[0].memory.wandX).toBeUndefined();
  });

  it("E explodes at its ground destination after travel, with a one-second slow", () => {
    const world = worldFor(lux.spec);
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(lux.spec, "E"));
    advanceThrough(world, 22);
    expect(world.units[1].totals.damageTaken).toBe(0);
    advanceThrough(world, 23);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(345);
    expect(world.units[1].statuses.find((s) => s.key === "slow")?.endTick).toBe(53);
  });

  it("a projectile wall stops E before its area is created", () => {
    const world = worldFor(lux.spec);
    world.units[1].x = 600;
    world.zones.push({ id: 10, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 100 });
    startCast(world, world.units[0], ability(lux.spec, "E"));
    advanceThrough(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(mark(world)).toBeUndefined();
  });

  it("the duel behavior casts Prismatic Barrier against a noticed incoming damaging spell", () => {
    const world = worldFor(lux.spec);
    const incoming = { ...spell([{ type: "damage", damageType: "magic", amount: { base: 200 } }]), castTime: 1 };
    world.units[1].spec = { ...world.units[1].spec, abilities: [incoming] };
    world.modes[0] = "fight";
    startCast(world, world.units[1], incoming);
    world.tick = 10;
    expect(lux.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "W" });
  });

  it("Final Spark fires from its original position when Lux is displaced during the cast", () => {
    const world = worldFor(lux.spec);
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(lux.spec, "R"));
    world.units[0].x = 1000;
    advanceThrough(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(620);
    expect(world.units[0].x).toBe(1000);
  });

  it("displacing Lux forward does not extend Final Spark beyond its original range", () => {
    const world = worldFor(lux.spec);
    world.units[1].x = 3200;
    startCast(world, world.units[0], ability(lux.spec, "R"));
    world.units[0].x = 1000;
    world.units[1].x = 3500;
    advanceThrough(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("Final Spark does not reverse direction after the enemy crosses behind its cast origin", () => {
    const world = worldFor(lux.spec);
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(lux.spec, "R"));
    world.units[1].x = -300;
    advanceThrough(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(mark(world)).toBeUndefined();
  });
});

describe("Morgana source-backed kit", () => {
  it("reads Q damage, three-second root, shield and final-rank tether values", () => {
    const world = worldFor(morgana.spec);
    hit(world, "Q");
    expect(world.units[1].totals.damageTaken).toBe(390);
    expect(world.units[1].statuses.find((s) => s.key === "root")?.endTick).toBe(90);
    expect(ability(morgana.spec, "W").delivery).toMatchObject({ kind: "field", duration: 5, interval: 0.5, radius: 280, range: 900 });
    expect(ability(morgana.spec, "R2").onHit).toContainEqual({ type: "cc", cc: "stun", duration: 2 });
    expect(morgana.evidence.some((e) => e.revid === 4050925)).toBe(true);
  });

  it("Soul Siphon heals from shield-absorbed post-mitigation spell damage and refunds W", () => {
    const world = worldFor(morgana.spec);
    world.units[0].hp -= 1000;
    world.units[0].cooldownReady.W = 300;
    world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, mr: 100 } };
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 1000 }, duration: 5 }, { scale: 1 });
    hit(world, "Q");
    expect(world.units[0].totals.healing).toBeCloseTo(195 * 0.18);
    expect(world.units[0].cooldownReady.W).toBe(282);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("basic attacks do not heal or refund W through Soul Siphon", () => {
    const world = worldFor(morgana.spec);
    world.units[0].hp -= 1000;
    world.units[0].cooldownReady.W = 300;
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[0].totals.healing).toBe(0);
    expect(world.units[0].cooldownReady.W).toBe(300);
  });

  it("Tormented Shadow deals ten dynamic missing-health pulses, including on cast", () => {
    const world = worldFor(morgana.spec);
    world.units[1].hp = 5000;
    let expectedHP = 5000;
    for (let i = 0; i < 10; i += 1) expectedHP -= 45 * (1 + 1 - expectedHP / 10000);
    startCast(world, world.units[0], ability(morgana.spec, "W"));
    advanceThrough(world, 157);
    expect(world.units[1].hp).toBeCloseTo(expectedHP, 7);
    expect(world.log.filter((e) => e.text.includes("Tormented Shadow deals"))).toHaveLength(10);
  });

  it("overlapping pools do not damage twice or mutate the shared effect array", () => {
    const world = worldFor(morgana.spec);
    hit(world, "W");
    const before = world.units[1].hp;
    hit(world, "W");
    expect(world.units[1].hp).toBe(before);
    expect(ability(morgana.spec, "W").onHit).toHaveLength(1);
    const other = worldFor(morgana.spec);
    hit(other, "W");
    expect(other.units[1].totals.damageTaken).toBe(45);
  });

  it("Black Shield absorbs magic first while physical and true damage bypass it", () => {
    const world = worldFor(morgana.spec);
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    const shield = world.units[0].statuses.find((s) => s.kind === "shield")!;
    expect(shield.value).toBe(390);
    dealDamage(world, world.units[1], world.units[0], 100, "physical");
    dealDamage(world, world.units[1], world.units[0], 100, "true");
    expect(shield.value).toBe(390);
    const raw = 200 * (1 + world.units[0].spec.base.mr / 100);
    dealDamage(world, world.units[1], world.units[0], raw, "magic");
    expect(shield.value).toBeCloseTo(190);
  });

  it("Black Shield prevents CC from the magic packet that breaks it, then allows the next packet", () => {
    const world = worldFor(morgana.spec);
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    const incoming = spell([{ type: "damage", damageType: "magic", amount: { base: 1000 } }, { type: "cc", cc: "root", duration: 3 }]);
    abilityHit(world, world.units[1], world.units[0], incoming, incoming.onHit!);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(false);
    expect(world.units[0].statuses.some((s) => s.key === "root")).toBe(false);
    const root = spell([{ type: "cc", cc: "root", duration: 3 }]);
    abilityHit(world, world.units[1], world.units[0], root, root.onHit!);
    expect(world.units[0].statuses.some((s) => s.key === "root")).toBe(true);
  });

  it("Black Shield lets nearsight through and shield destruction lets a following stun through", () => {
    const world = worldFor(morgana.spec);
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    const near = spell([{ type: "cc", cc: "nearsight", strength: 350, duration: 2 }]);
    abilityHit(world, world.units[1], world.units[0], near, near.onHit!);
    expect(world.units[0].statuses.some((s) => s.key === "nearsight")).toBe(true);
    attackHit(world, world.units[1], world.units[0], false, [{ type: "cc", cc: "stun", duration: 2 }], undefined, false, { breakShields: true });
    expect(world.units[0].statuses.some((s) => s.key === "stun")).toBe(true);
  });

  it("a spell shield takes priority over Black Shield and leaves its magic shield untouched", () => {
    const world = worldFor(morgana.spec);
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    applyEffect(world, world.units[0], world.units[0], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 });
    const incoming = spell([{ type: "damage", damageType: "magic", amount: { base: 1000 } }, { type: "cc", cc: "root", duration: 3 }]);
    abilityHit(world, world.units[1], world.units[0], incoming, incoming.onHit!);
    expect(world.units[0].statuses.find((s) => s.kind === "shield")?.value).toBe(390);
    expect(world.units[0].statuses.some((s) => s.key === "root" || s.key === "spellShield")).toBe(false);
  });

  it("Black Shield absorbs before an earlier-expiring ordinary shield", () => {
    const world = worldFor(morgana.spec);
    applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: 1000 }, duration: 1 }, { scale: 1 });
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    const raw = 200 * (1 + world.units[0].spec.base.mr / 100);
    dealDamage(world, world.units[1], world.units[0], raw, "magic");
    expect(world.units[0].statuses.find((s) => s.kind === "shield" && s.blackShield)?.value).toBeCloseTo(190);
    expect(world.units[0].statuses.find((s) => s.kind === "shield" && !s.blackShield)?.value).toBe(1000);
  });

  it("its CC immunity expires with Black Shield after five seconds", () => {
    const world = worldFor(morgana.spec);
    startCast(world, world.units[0], ability(morgana.spec, "E"));
    advanceThrough(world, 149);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(true);
    advanceThrough(world, 150);
    const incoming = spell([{ type: "cc", cc: "stun", duration: 2 }]);
    abilityHit(world, world.units[1], world.units[0], incoming, incoming.onHit!);
    expect(world.units[0].statuses.some((s) => s.key === "stun")).toBe(true);
  });

  it("Soul Shackles requires an enemy within 575 and latches from its cast origin", () => {
    const world = worldFor(morgana.spec);
    const r = ability(morgana.spec, "R");
    world.units[1].x = 576;
    expect(canCast(world, world.units[0], r)).toBe(false);
    world.units[1].x = 575;
    expect(canCast(world, world.units[0], r)).toBe(true);
    startCast(world, world.units[0], r);
    world.units[0].x = -300;
    world.units[1].x = 600;
    advanceThrough(world, 11);
    expect(world.units[1].totals.damageTaken).toBe(430);
    expect(world.units[0].memory.shacklesUntil).toBe(101);
  });

  it("the tether deals its second hit and two-second stun after exactly three seconds", () => {
    const world = worldFor(morgana.spec);
    hit(world, "R");
    world.tick = 89;
    morgana.spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(world.units[1].totals.damageTaken).toBe(430);
    world.tick = 90;
    morgana.spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(world.units[1].totals.damageTaken).toBe(860);
    expect(world.units[1].statuses.find((s) => s.key === "stun")?.endTick).toBe(150);
  });

  it("crossing the tether range breaks it permanently and removes its slow and speed", () => {
    const world = worldFor(morgana.spec);
    hit(world, "R");
    world.units[1].x = 626;
    world.tick = 1;
    morgana.spec.hooks!.onTick!(hookContext(world, world.units[0]));
    world.units[1].x = 100;
    world.tick = 90;
    morgana.spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(world.units[1].totals.damageTaken).toBe(430);
    expect(world.units[1].statuses.some((s) => s.key === "slow" && s.ability === "R")).toBe(false);
    expect(world.units[0].statuses.some((s) => s.memoKey === "buff:shacklesSpeed")).toBe(false);
  });

  it("spell shields stop the initial tether but do not stop an already attached completion", () => {
    const world = worldFor(morgana.spec);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 });
    hit(world, "R");
    expect(world.units[0].memory.shacklesUntil).toBeUndefined();
    expect(world.units[1].totals.damageTaken).toBe(0);
    hit(world, "R");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 });
    world.tick = 90;
    morgana.spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(world.units[1].totals.damageTaken).toBe(860);
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });

  it.each(["magic", "physicalCC"])("the duel behavior casts Black Shield against a noticed %s spell", (kind) => {
    const world = worldFor(morgana.spec);
    const incoming = { ...spell(kind === "magic" ? [{ type: "damage", damageType: "magic", amount: { base: 200 } }] : [{ type: "damage", damageType: "physical", amount: { base: 200 } }, { type: "cc", cc: "root", duration: 2 }]), castTime: 1 };
    world.units[1].spec = { ...world.units[1].spec, abilities: [incoming] };
    world.modes[0] = "fight";
    startCast(world, world.units[1], incoming);
    world.tick = 10;
    expect(morgana.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "E" });
  });

  it("the duel behavior saves Black Shield against pure physical damage", () => {
    const world = worldFor(morgana.spec);
    const incoming = { ...spell([{ type: "damage", damageType: "physical", amount: { base: 200 } }]), castTime: 1 };
    world.units[1].spec = { ...world.units[1].spec, abilities: [incoming] };
    world.modes[0] = "fight";
    startCast(world, world.units[1], incoming);
    world.tick = 10;
    expect(morgana.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "E" });
  });
});
