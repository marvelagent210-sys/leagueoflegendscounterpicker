import { describe, expect, it } from "vitest";
import { canCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { createWorld, fight, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const spell = (world: World, key: string) => {
  const ability = world.units[0].spec.abilities.find((a) => a.key === key);
  if (!ability) throw new Error(`Missing ${key}`);
  return ability;
};
const worldFor = (id: string, bonus: FighterSpec["bonus"] = {}, distance = 0) => createWorld({
  fighters: [{ ...kit(id).spec, bonus }, fighter({ base: { hp: 20000, armor: 0, mr: 0 } })],
  distance, modes: ["idle", "idle"], settings: { log: true },
});
const advance = (world: World, until: number) => { while (world.tick <= until && !world.result) step(world, [idle, idle]); };
const attack = (world: World) => {
  const self = world.units[0];
  startAttack(world, self);
  if (self.action?.kind !== "windup") throw new Error("No windup");
  world.tick = self.action.launchTick;
  launchAttack(world, self);
};
const hit = (world: World, key: string) => {
  const ability = spell(world, key);
  abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? []);
};

describe("Aatrox recast clocks and passive contacts", () => {
  it("starts the Q cooldown on activation and restarts it on each recast", () => {
    const world = worldFor("Aatrox", {}, 1500);
    startCast(world, world.units[0], spell(world, "Q1"));
    expect(world.units[0].cooldownReady.Q1).toBe(180);
    advance(world, 18);
    world.tick = 29;
    expect(canCast(world, world.units[0], spell(world, "Q2"))).toBe(false);
    world.tick = 30;
    expect(canCast(world, world.units[0], spell(world, "Q2"))).toBe(true);
    startCast(world, world.units[0], spell(world, "Q2"));
    expect(world.units[0].cooldownReady.Q1).toBe(210);
  });

  it("does not restart Q's cooldown when an unused recast window expires", () => {
    const world = worldFor("Aatrox", {}, 1500);
    startCast(world, world.units[0], spell(world, "Q1"));
    advance(world, 121);
    expect(world.units[0].chains.Q1).toBeUndefined();
    expect(world.units[0].cooldownReady.Q1).toBe(180);
  });

  it.each([[false, 2], [true, 4]])("reduces the stance cooldown through a spell shield (sweet=%s)", (sweet, seconds) => {
    const world = worldFor("Aatrox");
    const q = spell(world, "Q1");
    world.units[0].memory.stanceReady = 300;
    world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    const effects = sweet && q.delivery.kind === "area" ? q.delivery.bands![0]!.onHit : q.onHit!;
    abilityHit(world, world.units[0], world.units[1], q, effects);
    expect(world.units[0].memory.stanceReady).toBe(300 - seconds * 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
});

describe("Darius stacks, shields, resources and executions", () => {
  it("applies one Hemorrhage stack for the full empowered attack", () => {
    const world = worldFor("Darius");
    startCast(world, world.units[0], spell(world, "W"));
    attack(world);
    expect(world.units[0].memory.bleedStacks).toBe(1);
  });

  it("applies Hemorrhage to shielded enemies, while invulnerability prevents it", () => {
    const shielded = worldFor("Darius");
    shielded.units[1].statuses.push(lasting("shield", "shield", 10000));
    attack(shielded);
    expect(shielded.units[1].totals.damageTaken).toBe(0);
    expect(shielded.units[0].memory.bleedStacks).toBe(1);
    const immune = worldFor("Darius");
    immune.units[1].statuses.push(lasting("state", "invulnerable"));
    attack(immune);
    expect(immune.units[0].memory.bleedStacks).toBeUndefined();
  });

  it("blocks Crippling Strike's whole attack with one spell shield", () => {
    const world = worldFor("Darius");
    world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    startCast(world, world.units[0], spell(world, "W"));
    attack(world);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].memory.bleedStacks).toBeUndefined();
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false);
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false);
  });

  it("preserves W's original impact tick while Decimate cancels its animation", () => {
    const world = worldFor("Darius");
    const self = world.units[0];
    startCast(world, self, spell(world, "W"));
    startAttack(world, self);
    if (self.action?.kind !== "windup") throw new Error("No windup");
    const impactTick = self.action.launchTick;
    startCast(world, self, spell(world, "Q"));
    expect(self.pendingAttack?.launchTick).toBe(impactTick);
    expect(world.units[1].totals.damageTaken).toBe(0);
    advance(world, impactTick);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(1.6 * derive(self).ad, 8);
    expect(self.action).toMatchObject({ kind: "cast", ability: "Q" });
  });

  it("respects Apprehend's post-cast Q/R lockout while permitting W", () => {
    const world = worldFor("Darius");
    const self = world.units[0];
    startCast(world, self, spell(world, "E"));
    advance(world, 8);
    expect(canCast(world, self, spell(world, "Q"))).toBe(false);
    expect(canCast(world, self, spell(world, "R"))).toBe(false);
    expect(canCast(world, self, spell(world, "W"))).toBe(true);
    advance(world, 20);
    expect(canCast(world, self, spell(world, "Q"))).toBe(true);
  });

  it.each([0, 1, 4, 5])("uses %i pre-hit stacks for one ultimate damage event, then adds one stack", (stacks) => {
    const world = worldFor("Darius");
    const self = world.units[0];
    self.memory.bleedStacks = stacks;
    self.memory.bleedUntil = 150;
    const ability = spell(world, "R");
    const damage = ability.onHit?.find((e) => e.type === "damage");
    if (!damage || damage.type !== "damage") throw new Error("No damage");
    const base = evaluate(damage.amount, self, world.units[1]);
    hit(world, "R");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(base * (1 + 0.2 * stacks), 8);
    expect(self.memory.bleedStacks).toBe(Math.min(5, stacks + 1));
    expect(world.log.filter((e) => e.text.includes("Noxian Guillotine deals"))).toHaveLength(1);
  });

  it("charges the three basic mana costs and refunds W's cost and half cooldown on a kill", () => {
    const world = worldFor("Darius");
    expect(spell(world, "Q").cost).toBe(45);
    expect(spell(world, "E").cost).toBe(30);
    const before = world.units[0].resource;
    world.units[1].hp = 10;
    startCast(world, world.units[0], spell(world, "W"));
    expect(world.units[0].resource).toBe(before - 40);
    attack(world);
    expect(world.units[0].resource).toBe(before);
    expect((world.units[0].cooldownReady.W ?? Number.NaN) - world.tick).toBe(75);
  });

  it("resets rank-three Guillotine and grants Noxian Might on a champion kill", () => {
    const world = worldFor("Darius");
    world.units[1].hp = 1;
    startCast(world, world.units[0], spell(world, "R"));
    advance(world, 12);
    expect(world.units[0].cooldownReady.R).toBeLessThanOrEqual(world.tick);
    expect(world.units[0].memory.might).toBe(true);
  });
});

describe("Renekton empowered damage and resource rules", () => {
  it("deals enhanced Dice damage once and applies armor reduction", () => {
    const world = worldFor("Renekton", { ad: 100 });
    hit(world, "E2fury");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(250 + 1.35 * 100, 8);
    expect(world.units[1].statuses.find((s) => s.key === "armorReductionPercent")?.value).toBe(0.35);
  });

  it.each([[false, 2, 20], [true, 3, 0]])("uses separate W strikes, one critical bonus and correct Fury (empowered=%s)", (empowered, strikes, furyGain) => {
    const world = worldFor("Renekton", { critChance: 1 });
    const self = world.units[0];
    self.resource = empowered ? 50 : 0;
    startCast(world, self, spell(world, empowered ? "Wfury" : "W"));
    attack(world);
    const ad = derive(self).ad;
    expect(world.units[1].totals.damageTaken).toBeCloseTo(strikes * (65 + 0.75 * ad) + ad, 8);
    expect(self.resource).toBe(furyGain);
    expect(world.log.filter((e) => e.text.startsWith("Ruthless Predator deals"))).toHaveLength(strikes);
  });

  it.each([0, 1])("retains W's declared %i critical chance when it reverses during the windup", (declared) => {
    const world = worldFor("Renekton", { critChance: declared });
    const self = world.units[0];
    startCast(world, self, spell(world, "W"));
    startAttack(world, self);
    if (self.action?.kind !== "windup") throw new Error("No windup");
    expect(self.action.critChance).toBe(declared);
    applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: 1 - 2 * declared }, duration: 5 }, { scale: 1 });
    world.tick = self.action.launchTick;
    launchAttack(world, self);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(130 + (1.5 + declared) * derive(self).ad, 8);
  });

  it("breaks ordinary shields even when the empowered W is spell-shielded", () => {
    const world = worldFor("Renekton");
    world.units[0].resource = 50;
    world.units[1].statuses.push(lasting("shield", "ordinary", 10000), lasting("state", "spellShield", 0, { charges: 1 }));
    startCast(world, world.units[0], spell(world, "Wfury"));
    attack(world);
    expect(world.units[1].statuses.some((s) => s.kind === "shield" || s.key === "spellShield")).toBe(false);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].resource).toBe(0);
  });

  it("does not grant Dice until Slice connects", () => {
    const world = worldFor("Renekton", {}, 2000);
    startCast(world, world.units[0], spell(world, "E"));
    expect(canCast(world, world.units[0], spell(world, "E2"))).toBe(false);
    advance(world, 20);
    expect(canCast(world, world.units[0], spell(world, "E2"))).toBe(false);
    hit(world, "E");
    expect(canCast(world, world.units[0], spell(world, "E2"))).toBe(true);
  });

  it("caps Q healing before modifiers", () => {
    const world = worldFor("Renekton", { ad: 2000 });
    world.units[0].hp -= 1500;
    hit(world, "Q");
    expect(world.units[0].totals.healing).toBe(150);
    hit(world, "Qfury");
    expect(world.units[0].totals.healing).toBe(750);
  });

  it("applies Dominus's increased Q radius locally and generates its full timed Fury", () => {
    const compiled = kit("Renekton").spec;
    const world = createWorld({ fighters: [compiled, fighter()], distance: 2000, modes: ["idle", "idle"] });
    startCast(world, world.units[0], spell(world, "R"));
    advance(world, 8);
    expect(spell(world, "Q").delivery).toMatchObject({ radius: 480 });
    expect(compiled.abilities.find((a) => a.key === "Q")?.delivery).toMatchObject({ radius: 400 });
    advance(world, 458);
    expect(world.units[0].resource).toBe(95);
    expect(spell(world, "Q").delivery).toMatchObject({ radius: 400 });
  });
});

describe("Riven passive and Exile timing", () => {
  it("blocks Runic Blade with its attack and applies life steal to unblocked passive damage", () => {
    const blocked = worldFor("Riven");
    blocked.units[0].memory.runic = 1;
    blocked.units[0].memory.runicUntil = 180;
    blocked.units[1].statuses.push(lasting("state", "blockAttacks"));
    attack(blocked);
    expect(blocked.units[1].totals.damageTaken).toBe(0);
    const world = worldFor("Riven");
    const self = world.units[0];
    self.hp -= 1000;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    self.memory.runic = 1;
    self.memory.runicUntil = 180;
    startAttack(world, self);
    if (self.action?.kind !== "windup") throw new Error("No windup");
    const passive = self.action.onHit.find((e) => e.type === "damage" && e.label === "Runic Blade");
    if (!passive || passive.type !== "damage") throw new Error("No passive damage");
    const damage = derive(self).ad + evaluate(passive.amount, self, world.units[1]);
    world.tick = self.action.launchTick;
    launchAttack(world, self);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(damage, 8);
    expect(self.totals.healing).toBeCloseTo(0.5 * damage, 8);
  });

  it("calculates Wind Slash from pre-hit missing health in one damage event", () => {
    const world = worldFor("Riven");
    world.units[1].hp = 10000;
    hit(world, "R2");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(200 * (1 + 2 * 0.5 / 0.75), 8);
    expect(world.log.filter((e) => e.text.includes("Wind Slash deals"))).toHaveLength(1);
  });

  it("delays and snapshots Exile's bonus, increases radii, and holds cooldown after early Wind Slash", () => {
    const world = worldFor("Riven");
    const self = world.units[0];
    const compiled = self.spec;
    const ad = derive(self).ad;
    startCast(world, self, spell(world, "R"));
    advance(world, 8);
    expect(derive(self).ad).toBe(ad);
    self.statuses.push(lasting("stat", "AD", 100));
    advance(world, 16);
    expect(derive(self).ad).toBeCloseTo(ad * 1.2 + 100, 8);
    expect(spell(world, "Q").delivery).toMatchObject({ hitRadius: 200 });
    expect(spell(world, "Q3").delivery).toMatchObject({ hitRadius: 300 });
    expect(spell(world, "W").delivery).toMatchObject({ radius: 360 });
    expect(compiled.abilities.find((a) => a.key === "Q")?.delivery).toMatchObject({ hitRadius: 150 });
    startCast(world, self, spell(world, "R2"));
    advance(world, 25);
    expect(self.cooldownReady.R).toBe(Infinity);
    advance(world, 465);
    expect(self.cooldownReady.R).toBe(465 + 60 * 30);
    expect(spell(world, "Q3").delivery).toMatchObject({ hitRadius: 250 });
  });
});

describe("audited kits execute their full fight paths", () => {
  it.each(["Aatrox", "Darius", "Renekton", "Riven"])("%s runs real hooks and combat with sealed source readers", (id) => {
    const outcome = fight({ fighters: [kit(id).spec, kit("Garen").spec], distance: 150, modes: ["fight", "fight"], settings: { maxSeconds: 10, maxBranches: 2 } });
    expect(outcome.seconds).toBeGreaterThan(0);
    expect(outcome.hp.every(Number.isFinite)).toBe(true);
  });
});
