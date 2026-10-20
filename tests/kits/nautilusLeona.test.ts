import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { canMove, derive, hasState } from "../../engine/sim/derived";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import nautilus from "../../kits/champions/Nautilus";
import leona from "../../kits/champions/Leona";
import { fighter } from "../sim/kits";
import { championData, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const modules = { Nautilus: nautilus, Leona: leona };
const compiled = (id: keyof typeof modules) => compileKit(championData(id), records(id), modules[id], {}, pets(id), runes());
const subject = (id: keyof typeof modules, bonus: FighterSpec["bonus"] = {}) => {
  const spec = compiled(id).spec;
  return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } };
};
const makeWorld = (id: keyof typeof modules, distance = 0, bonus: FighterSpec["bonus"] = {}) => createWorld({
  fighters: [subject(id, bonus), fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 100, mr: 100 } })],
  distance, modes: ["fight", "idle"], settings: { maxSeconds: 20, reactionTime: 10, maxBranches: 1, log: true },
});
const advance = (world: World, until: number) => {
  while (world.tick < until && !world.result) step(world, [idle, idle]);
};
const cast = (world: World, key: string) => {
  const unit = world.units[0];
  const ability = unit.spec.abilities.find((a) => a.key === key);
  if (!ability) throw new Error(`Missing ${key}`);
  startCast(world, unit, ability);
};
const state = (world: World, side: 0 | 1, key: "spellShield" | "blockAttacks" | "dodgeAttacks" | "parry" | "displacementImmune" | "untargetable", seconds = 20) => {
  const target = world.units[side];
  applyEffect(world, target, target, { type: "state", state: key, duration: seconds }, { scale: 1 });
};
const attack = (world: World) => {
  startAttack(world, world.units[0]);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("No attack windup");
  const launch = action.launchTick;
  advance(world, launch + 1);
  return launch;
};
const damageTicks = (world: World, label: string) => world.log.filter((entry) => entry.side === 0 && entry.text.startsWith(`${label} deals`)).map((entry) => entry.tick);

describe.each(["Nautilus", "Leona"] as const)("%s normal combat", (id) => {
  it("uses all four abilities, including its defensive W, with the default duel behavior", () => {
    const world = createWorld({
      fighters: [subject(id), fighter({ id: "attacker", base: { hp: 30000, ad: 300 } })],
      distance: 300, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 10, maxBranches: 1, reactionTime: 10 },
    });
    runWorld(world);
    for (const ability of world.units[0].spec.abilities) expect(world.log.some((entry) => entry.side === 0 && entry.text === `casts ${ability.name}`), ability.key).toBe(true);
    if (id === "Nautilus") expect(world.units[0].totals.absorbed).toBeGreaterThan(0);
    else expect(Number(world.units[0].memory.guardEnd)).toBeGreaterThan(90);
  });
});

describe("Nautilus's pinned level-20 mechanics", () => {
  it("compiles QWER with source evidence independently of the champion registry", () => {
    const kit = compiled("Nautilus");
    expect(kit.spec.abilities.map((a) => a.key)).toEqual(["Q", "W", "E", "R"]);
    expect(kit.spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 10, cost: 60, castTime: 0.25, delivery: { kind: "line", range: 1122, width: 180, speed: 2000 } });
    expect(kit.spec.abilities.find((a) => a.key === "W")?.onSelf?.[0]).toEqual({ type: "shield", amount: { base: 90, ratios: { maxHP: 0.12 } }, duration: 6 });
    expect(kit.spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 5, cost: 90, castTime: 0.25 });
    expect(kit.spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 80, cost: 100, castTime: 0.46, delivery: { kind: "target", range: 825 } });
    expect(new Set(kit.evidence.map((entry) => entry.revid))).toEqual(new Set([4072880, 4060365, 3981480, 4007701, 4007702]));
    expect(kit.assumptions.some((text) => text.includes("split the available gap equally"))).toBe(true);
  });

  it("Staggering Blow deals 128 bonus physical damage, roots for 1.5 seconds, and waits six seconds on this target", () => {
    const world = makeWorld("Nautilus");
    const [self, target] = world.units;
    const launch = attack(world);
    expect(target.hp).toBeCloseTo(100000 - derive(self).ad / 2 - 128 / 2, 8);
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "root")).toMatchObject({ startTick: launch, endTick: launch + 45 });
    expect(self.memory.staggerReady).toBe(launch + 180);
    attack(world);
    expect(damageTicks(world, "Staggering Blow")).toEqual([launch]);
    advance(world, launch + 180);
    const next = attack(world);
    expect(damageTicks(world, "Staggering Blow")).toEqual([launch, next]);
  });

  it("a spell shield stops only Staggering Blow's root, preserving its 128 damage", () => {
    const world = makeWorld("Nautilus");
    state(world, 1, "spellShield");
    attack(world);
    expect(world.units[1].hp).toBeCloseTo(100000 - derive(world.units[0]).ad / 2 - 64, 8);
    expect(world.units[1].statuses.some((s) => s.kind === "cc" && s.key === "root")).toBe(false);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
  });

  it.each(["blockAttacks", "dodgeAttacks"] as const)("%s suppresses Staggering Blow but spends its on-target cooldown", (defense) => {
    const world = makeWorld("Nautilus");
    state(world, 1, defense);
    const launch = attack(world);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[1].statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(world.units[0].memory.staggerReady).toBe(launch + 180);
    world.units[1].statuses = [];
    attack(world);
    expect(damageTicks(world, "Staggering Blow")).toEqual([]);
  });

  it("blind neither deals Staggering Blow damage nor spends its target cooldown; parry sees its immobilizing root", () => {
    const world = makeWorld("Nautilus");
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 20 }, { scale: 1 });
    attack(world);
    expect(world.units[0].memory.staggerReady).toBeUndefined();
    expect(world.units[1].hp).toBe(100000);
    world.units[0].statuses = [];
    world.units[1].spec = { ...world.units[1].spec, hooks: { onParry(ctx) { ctx.memory.immobilizing = ctx.immobilizing; } } };
    state(world, 1, "parry");
    attack(world);
    expect(world.units[1].memory.immobilizing).toBe(true);
    expect(world.units[1].hp).toBe(100000);
  });

  it("Titan's Wrath shields for 90 + 12% maximum health and resets the attack timer", () => {
    const world = makeWorld("Nautilus", 0, { hp: 1000 });
    world.units[0].attackReadyTick = 100;
    cast(world, "W");
    expect(world.units[0].statuses.find((s) => s.kind === "shield" && s.key === "W")).toMatchObject({ value: 523.5, endTick: 180 });
    expect(world.units[0].attackReadyTick).toBe(0);
  });

  it("Pain of Wrath is captured at attack declaration, survives a shield ending in windup, and ticks after 1.25 seconds", () => {
    const world = makeWorld("Nautilus", 0, { ap: 100 });
    cast(world, "W");
    startAttack(world, world.units[0]);
    const action = world.units[0].action;
    if (action?.kind !== "windup") throw new Error("No windup");
    world.units[0].statuses = world.units[0].statuses.filter((s) => s.kind !== "shield");
    advance(world, action.launchTick + 1);
    const afterImmediate = world.units[1].hp;
    expect(damageTicks(world, "Pain of Wrath")).toEqual([action.launchTick]);
    expect(world.log.find((entry) => entry.text.startsWith("Pain of Wrath deals"))?.text).toBe("Pain of Wrath deals 28 magic damage");
    advance(world, action.launchTick + 38);
    expect(world.units[1].hp).toBe(afterImmediate);
    advance(world, action.launchTick + 39);
    expect(world.units[1].hp).toBeCloseTo(afterImmediate - 55 / 2, 8);
    expect(damageTicks(world, "Pain of Wrath (persistent)")).toEqual([action.launchTick + 38]);
  });

  it("reapplying Pain of Wrath adds an immediate hit without refreshing or duplicating the delayed hit", () => {
    const world = makeWorld("Nautilus");
    cast(world, "W");
    const first = attack(world);
    const original = world.scheduled.find((entry) => entry.ability === "W");
    const second = attack(world);
    expect(world.scheduled.filter((entry) => entry.ability === "W")).toHaveLength(1);
    expect(world.scheduled.find((entry) => entry.ability === "W")?.tick).toBe(original?.tick);
    advance(world, first + 39);
    expect(damageTicks(world, "Pain of Wrath")).toEqual([first, second]);
    expect(damageTicks(world, "Pain of Wrath (persistent)")).toEqual([first + 38]);
  });

  it.each(["blockAttacks", "dodgeAttacks"] as const)("%s prevents Pain of Wrath application", (defense) => {
    const world = makeWorld("Nautilus");
    cast(world, "W");
    state(world, 1, defense);
    attack(world);
    expect(damageTicks(world, "Pain of Wrath")).toEqual([]);
    expect(world.scheduled).toEqual([]);
  });

  it("a blinded attack still applies Pain of Wrath, and a spell shield blocks one Pain application", () => {
    const world = makeWorld("Nautilus");
    cast(world, "W");
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 20 }, { scale: 1 });
    state(world, 1, "spellShield");
    attack(world);
    expect(world.units[1].hp).toBe(100000);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
    expect(world.scheduled).toEqual([]);
    const launch = attack(world);
    expect(world.units[1].hp).toBeCloseTo(100000 - 35 / 2, 8);
    expect(damageTicks(world, "Pain of Wrath")).toEqual([launch]);
    expect(world.units[0].memory.staggerReady).toBeUndefined();
  });

  it("Dredge Line deals 245 magic damage and pulls both champions through half the gap over 0.9 seconds", () => {
    const world = makeWorld("Nautilus", 500);
    const [self, target] = world.units;
    const gap = target.x - self.x - self.spec.base.pathingRadius - target.spec.base.pathingRadius;
    const targetStart = target.x;
    cast(world, "Q");
    advance(world, 10);
    expect(canMove(self)).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);
    expect(canCast(world, self, self.spec.abilities.find((a) => a.key === "W")!)).toBe(true);
    advance(world, 60);
    expect(target.hp).toBeCloseTo(100000 - 245 / 2, 8);
    expect(self.x).toBeCloseTo(gap / 2, 8);
    expect(target.x).toBeCloseTo(targetStart - gap / 2, 8);
    expect(target.x - self.x).toBeCloseTo(self.spec.base.pathingRadius + target.spec.base.pathingRadius, 8);
    expect(hasState(self, "noMovement")).toBe(false);
    expect(world.log.some((entry) => entry.text.includes("stun") && entry.text.includes("1.00 s"))).toBe(true);
  });

  it("Dredge Line's spell shield negates its hit while Nautilus still dashes halfway", () => {
    const world = makeWorld("Nautilus", 500);
    const [self, target] = world.units;
    const original = target.x;
    const gap = original - self.spec.base.pathingRadius - target.spec.base.pathingRadius;
    state(world, 1, "spellShield");
    cast(world, "Q");
    advance(world, 60);
    expect(target.hp).toBe(100000);
    expect(target.x).toBe(original);
    expect(self.x).toBeCloseTo(gap / 2, 8);
    expect(target.statuses.some((s) => s.kind === "cc")).toBe(false);
  });

  it("displacement immunity prevents the anchor pull while preserving its stun and Nautilus's full dash", () => {
    const world = makeWorld("Nautilus", 500);
    const [self, target] = world.units;
    const original = target.x;
    state(world, 1, "displacementImmune");
    cast(world, "Q");
    advance(world, 25);
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "airborne")).toBe(false);
    advance(world, 60);
    expect(target.x).toBe(original);
    expect(self.x).toBeCloseTo(original - self.spec.base.pathingRadius - target.spec.base.pathingRadius, 8);
  });

  it("a projectile wall stops the anchor and releases its movement lock without a dash", () => {
    const world = makeWorld("Nautilus", 500);
    world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 200, radius: 0, startTick: 0, endTick: 180 });
    cast(world, "Q");
    advance(world, 25);
    expect(world.units[0].x).toBe(0);
    expect(world.units[1].hp).toBe(100000);
    expect(canMove(world.units[0])).toBe(true);
  });

  it("Riptide's three real annuli strike at ticks 8, 17 and 25 with half damage after the first wave", () => {
    const world = makeWorld("Nautilus");
    world.units[1].x = 350;
    cast(world, "E");
    advance(world, 26);
    expect(damageTicks(world, "Riptide")).toEqual([8, 17, 25]);
    expect(world.units[1].hp).toBeCloseTo(100000 - (195 + 97.5 + 97.5) / 2, 8);
    advance(world, 41);
    const latest = world.units[1].statuses.filter((s) => s.kind === "cc" && s.key === "slow").at(-1);
    expect(latest?.value).toBeCloseTo(0.5 * 30 / 45, 8);
  });

  it("a shielded first Riptide wave does not cause later waves to use reduced damage, and a close target cannot be hit by outer rings", () => {
    const shielded = makeWorld("Nautilus");
    shielded.units[1].x = 350;
    state(shielded, 1, "spellShield");
    cast(shielded, "E");
    advance(shielded, 26);
    expect(shielded.units[1].hp).toBeCloseTo(100000 - (195 + 97.5) / 2, 8);
    const close = makeWorld("Nautilus");
    close.units[1].x = 100;
    cast(close, "E");
    advance(close, 26);
    expect(damageTicks(close, "Riptide")).toEqual([8]);
  });

  it("Depth Charge accelerates from 275 by 466.67 per second, follows its target, and is not stopped by projectile walls", () => {
    const world = makeWorld("Nautilus", 500, { ap: 100 });
    const [self, target] = world.units;
    world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 200, radius: 0, startTick: 0, endTick: 180 });
    cast(world, "R");
    advance(world, 15);
    const charge = world.missiles.find((m) => m.source === "R");
    expect(charge).toMatchObject({ x: 0, perTick: 275 / 30, projectile: false, homing: true, hitsUntargetable: true });
    advance(world, 16);
    expect(world.missiles.find((m) => m.source === "R")?.x).toBeCloseTo((275 + 466.67 / 30) / 30, 8);
    let flightTicks = 1;
    while (flightTicks * 275 / 30 + 466.67 * flightTicks * (flightTicks + 1) / (2 * 900) < target.x - target.spec.base.radius) flightTicks += 1;
    advance(world, 14 + flightTicks + 1);
    expect(damageTicks(world, "Depth Charge")).toEqual([14 + flightTicks]);
    expect(target.hp).toBeCloseTo(100000 - (400 + 0.8 * 100) / 2, 8);
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "airborne")).toMatchObject({ endTick: 14 + flightTicks + 60 });
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "stun")).toMatchObject({ endTick: 14 + flightTicks + 60 });
    expect(self.resource).toBe(self.spec.base.resource - 100);
  });

  it("Depth Charge retains its seeking missile during temporary untargetability but respects protection on arrival", () => {
    const temporary = makeWorld("Nautilus", 500);
    cast(temporary, "R");
    advance(temporary, 15);
    state(temporary, 1, "untargetable", 0.3);
    expect(temporary.missiles.some((m) => m.source === "R")).toBe(true);
    advance(temporary, 100);
    expect(temporary.units[1].hp).toBe(99800);
    const protectedWorld = makeWorld("Nautilus", 500);
    cast(protectedWorld, "R");
    advance(protectedWorld, 15);
    state(protectedWorld, 1, "untargetable", 2);
    advance(protectedWorld, 100);
    expect(protectedWorld.units[1].hp).toBe(100000);
    expect(protectedWorld.log.some((entry) => entry.text === "is untargetable: Depth Charge misses")).toBe(true);
  });

  it("Depth Charge's displacement immunity interaction retains its stun, and invalid targets cancel its cast without paying", () => {
    const immune = makeWorld("Nautilus", 500);
    state(immune, 1, "displacementImmune");
    cast(immune, "R");
    advance(immune, 55);
    expect(immune.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
    expect(immune.units[1].statuses.some((s) => s.kind === "cc" && s.key === "airborne")).toBe(false);
    const canceled = makeWorld("Nautilus", 500);
    const resource = canceled.units[0].resource;
    cast(canceled, "R");
    canceled.units[1].x = 2000;
    advance(canceled, 16);
    expect(canceled.units[0].resource).toBe(resource);
    expect(canceled.units[0].cooldownReady.R ?? 0).toBe(0);
    expect(canceled.missiles).toEqual([]);
  });
});

describe("Leona's pinned solo-duel mechanics", () => {
  it("compiles QWER, preserves the real R radii and documents Sunlight's unavailable ally trigger", () => {
    const kit = compiled("Leona");
    expect(kit.spec.abilities.map((a) => a.key)).toEqual(["Q", "W", "E", "R"]);
    expect(kit.spec.abilities.find((a) => a.key === "Q")).toMatchObject({ cooldown: 5, cooldownAfter: "empower", cost: 50, castTime: 0 });
    expect(kit.spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 6, cost: 60, castTime: 0.25, delivery: { kind: "line", range: 900, width: 140, speed: 2000 } });
    expect(kit.spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 60, cost: 100, delivery: { kind: "circle", range: 1200, radius: 325, delay: 0.625 } });
    expect(kit.assumptions.some((text) => text.includes("never consumed in a solo duel"))).toBe(true);
    expect(new Set(kit.evidence.map((entry) => entry.revid))).toEqual(new Set([4038401, 4001219, 4042253, 4007645, 4007649]));
  });

  it("Shield of Daybreak resets before and after the empowered attack, stuns for a second, and never procs Sunlight itself", () => {
    const world = makeWorld("Leona");
    const [self, target] = world.units;
    attack(world);
    cast(world, "Q");
    expect(self.attackReadyTick).toBe(world.tick);
    const empowered = attack(world);
    expect(self.attackReadyTick).toBe(empowered);
    expect(self.cooldownReady.Q).toBe(empowered + 150);
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "stun")).toMatchObject({ startTick: empowered, endTick: empowered + 30 });
    expect(target.statuses.find((s) => s.kind === "mark" && s.key === "sunlight")).toMatchObject({ endTick: empowered + 75 });
    expect(canStartAttack(world, self)).toBe(true);
    attack(world);
    expect(target.hp).toBeCloseTo(100000 - 3 * derive(self).ad / 2 - 110 / 2, 8);
    expect(world.log.some((entry) => entry.text.includes("Sunlight deals"))).toBe(false);
  });

  it("critical attacks do not multiply Daybreak's 110 + 30% AP bonus damage", () => {
    const world = makeWorld("Leona", 0, { critChance: 1, ap: 100 });
    cast(world, "Q");
    attack(world);
    expect(world.units[1].hp).toBeCloseTo(100000 - derive(world.units[0]).ad * derive(world.units[0]).critDamage / 2 - 140 / 2, 8);
  });

  it("a spell shield blocks Daybreak's bonus damage, stun and Sunlight while preserving the ordinary attack", () => {
    const world = makeWorld("Leona", 0, { ap: 100 });
    state(world, 1, "spellShield");
    cast(world, "Q");
    const launch = attack(world);
    expect(world.units[1].hp).toBeCloseTo(100000 - derive(world.units[0]).ad / 2, 8);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
    expect(world.units[1].statuses.some((s) => s.kind === "cc" || s.kind === "mark")).toBe(false);
    expect(world.units[0].attackReadyTick).toBe(launch);
    expect(world.units[0].cooldownReady.Q).toBe(launch + 150);
  });

  it.each(["blockAttacks", "dodgeAttacks"] as const)("%s negates Daybreak's damage and stun", (defense) => {
    const world = makeWorld("Leona");
    state(world, 1, defense);
    cast(world, "Q");
    attack(world);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[1].statuses.some((s) => s.kind === "cc" || s.kind === "mark")).toBe(false);
  });

  it("Eclipse grants 50 + 20% other bonus resistances, recalculates them, and does not grant a damage shield", () => {
    const world = makeWorld("Leona", 0, { armor: 150, mr: 80 });
    cast(world, "W");
    const self = world.units[0];
    expect(derive(self).armor.bonus).toBe(230);
    expect(derive(self).mr.bonus).toBe(146);
    expect(self.statuses.some((s) => s.kind === "shield")).toBe(false);
    hookContext(world, self).buff("externalArmor", "armor", 100, 20);
    hookContext(world, self).buff("externalMR", "MR", 100, 20);
    advance(world, 2);
    expect(derive(self).armor.bonus).toBe(350);
    expect(derive(self).mr.bonus).toBe(266);
  });

  it("Eclipse reduces each non-true raw packet by 24 capped at half its damage before resistances", () => {
    const world = makeWorld("Leona");
    cast(world, "W");
    const [self, target] = world.units;
    const armor = derive(self).armor.base + derive(self).armor.bonus;
    const mr = derive(self).mr.base + derive(self).mr.bonus;
    const start = self.hp;
    dealDamage(world, target, self, 10, "physical");
    expect(start - self.hp).toBeCloseTo(5 * 100 / (100 + armor), 8);
    const beforeMagic = self.hp;
    dealDamage(world, target, self, 100, "magic");
    expect(beforeMagic - self.hp).toBeCloseTo(76 * 100 / (100 + mr), 8);
    const beforeTrue = self.hp;
    dealDamage(world, target, self, 100, "true");
    expect(beforeTrue - self.hp).toBe(100);
    const beforeCrit = self.hp;
    dealDamage(world, target, self, 30, "physical", { crit: { chance: 0.5, multiplier: 1.75 } });
    expect(beforeCrit - self.hp).toBeCloseTo((15 + 52.5 - 24) / 2 * 100 / (100 + armor), 8);
  });

  it("Eclipse preserves an existing windup and detonates after exactly three seconds", () => {
    const world = makeWorld("Leona", 0, { ap: 100 });
    startAttack(world, world.units[0]);
    const original = world.units[0].action;
    cast(world, "W");
    expect(world.units[0].action).toBe(original);
    advance(world, 90);
    expect(damageTicks(world, "Eclipse")).toEqual([]);
    advance(world, 91);
    expect(damageTicks(world, "Eclipse")).toEqual([90]);
    expect(world.units[0].memory.guardEnd).toBe(180);
    expect(world.log.find((entry) => entry.text.startsWith("Eclipse deals"))?.text).toBe("Eclipse deals 108 magic damage");
    advance(world, 181);
    expect(hasState(world.units[0], "flatDamageReduction")).toBe(false);
    expect(derive(world.units[0]).armor.bonus).toBe(0);
  });

  it("a spell shield blocks Eclipse's detonation damage while preserving the three-second guard extension", () => {
    const world = makeWorld("Leona");
    state(world, 1, "spellShield");
    cast(world, "W");
    advance(world, 91);
    expect(world.units[1].hp).toBe(100000);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
    expect(world.units[0].memory.guardEnd).toBe(180);
    expect(hasState(world.units[0], "flatDamageReduction")).toBe(true);
    expect(derive(world.units[0]).armor.bonus).toBe(50);
  });

  it("Eclipse expires after three seconds without extending when its detonation hits nobody", () => {
    const world = makeWorld("Leona", 500);
    cast(world, "W");
    advance(world, 91);
    expect(world.units[0].memory.guardEnd).toBe(90);
    expect(derive(world.units[0]).armor.bonus).toBe(0);
    expect(hasState(world.units[0], "flatDamageReduction")).toBe(false);
    expect(world.units[1].hp).toBe(100000);
  });

  it("Zenith Blade damages on contact, waits for full missile range, then roots and lands 225 units beyond the target", () => {
    const world = makeWorld("Leona", 300, { ap: 100 });
    const [self, target] = world.units;
    cast(world, "E");
    advance(world, 16);
    expect(target.hp).toBeCloseTo(100000 - 250 / 2, 8);
    expect(self.x).toBe(0);
    expect(target.statuses.some((s) => s.kind === "cc" && s.key === "root")).toBe(false);
    expect(canMove(self)).toBe(false);
    advance(world, 23);
    expect(self.action).toMatchObject({ kind: "dash", ability: "E", startTick: 22 });
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "root")).toMatchObject({ startTick: 22, endTick: 37 });
    advance(world, 40);
    expect(self.x).toBeCloseTo(target.x + 225, 8);
    expect(hasState(self, "noMovement")).toBe(false);
  });

  it("Zenith Blade fixes the landing position when its dash starts, and Eclipse casts during the dash without cancelling it", () => {
    const world = makeWorld("Leona", 300);
    cast(world, "E");
    advance(world, 23);
    const [self, target] = world.units;
    const original = self.action;
    const landing = target.x + 225;
    expect(canCast(world, self, self.spec.abilities.find((a) => a.key === "W")!)).toBe(true);
    cast(world, "W");
    expect(self.action).toBe(original);
    target.x = 800;
    advance(world, 40);
    expect(self.x).toBeCloseTo(landing, 8);
  });

  it("Zenith Blade's spell shield stops its damage, root and dash", () => {
    const world = makeWorld("Leona", 300);
    state(world, 1, "spellShield");
    cast(world, "E");
    advance(world, 40);
    expect(world.units[0].x).toBe(0);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[1].statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(canMove(world.units[0])).toBe(true);
  });

  it.each([{ offset: 0, stun: true }, { offset: 175, stun: true }, { offset: 200, stun: false }])("Solar Flare's $offset-unit impact offset gives stun=$stun while retaining damage and slow", ({ offset, stun }) => {
    const world = makeWorld("Leona", 300, { ap: 100 });
    cast(world, "R");
    advance(world, 10);
    const zone = world.zones.find((z) => z.ability === "R");
    expect(zone?.radius).toBe(325);
    expect(zone?.bands?.[0]).toMatchObject({ from: world.units[1].x - 175, to: world.units[1].x + 175 });
    world.units[1].x += offset;
    advance(world, 28);
    expect(damageTicks(world, "Solar Flare")).toEqual([27]);
    expect(world.units[1].hp).toBe(99810);
    expect(world.units[1].statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(stun);
    expect(world.units[1].statuses.find((s) => s.kind === "cc" && s.key === "slow")).toMatchObject({ value: 0.8, startTick: 27, endTick: 80 });
    expect(world.units[1].statuses.find((s) => s.kind === "mark" && s.key === "sunlight")).toMatchObject({ endTick: 102 });
  });

  it("Solar Flare can be walked out of or spell-shielded", () => {
    const escaped = makeWorld("Leona", 300);
    cast(escaped, "R");
    advance(escaped, 10);
    escaped.units[1].x += 400;
    advance(escaped, 28);
    expect(escaped.units[1].hp).toBe(100000);
    const shielded = makeWorld("Leona", 300);
    state(shielded, 1, "spellShield");
    cast(shielded, "R");
    advance(shielded, 28);
    expect(shielded.units[1].hp).toBe(100000);
    expect(shielded.units[1].statuses.some((s) => s.kind === "cc" || s.kind === "mark")).toBe(false);
  });
});
