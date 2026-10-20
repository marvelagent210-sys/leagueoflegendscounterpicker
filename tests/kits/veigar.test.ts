import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceZones, canCast, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Veigar from "../../kits/champions/Veigar";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compile = (stacks = 0) => compileKit(championData("Veigar"), records("Veigar"), Veigar, { phenomenalEvilStacks: stacks }, pets("Veigar"), runes());
const veigar = compile();
const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
const dummy = () => fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } });
function worldFor(stacks = 0, ap = 100): World {
  const compiled = compile(stacks);
  return createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } }, dummy()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
}
function advanceThrough(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function hit(world: World, key: string, scale = 1): void {
  const [self, enemy] = world.units;
  const spell = ability(self.spec, key);
  abilityHit(world, self, enemy, spell, spell.onHit ?? [], scale);
}
const ap = (world: World) => derive(world.units[0]).ap;
const stacks = (world: World) => world.units[0].memory.phenomenalEvilStacks;
const stun = (world: World) => world.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun");
function castCage(world: World, center = 149.5): void {
  world.units[1].x = 500;
  startCast(world, world.units[0], ability(world.units[0].spec, "E"), { direction: 1, distance: center });
}
function defend(world: World, state: "spellShield" | "parry" | "untargetable" | "ccImmune" | "displacementImmune"): void {
  applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 10 }, { scale: 1 });
}

describe("Veigar source-backed values and Phenomenal Evil", () => {
  it("retains all five pinned ability revisions and explicit unresolved assumptions", () => {
    expect(veigar.spec.abilities.map((a) => a.slot)).toEqual(["Q", "W", "E", "R"]);
    expect(new Set(veigar.evidence.map((e) => e.revid))).toEqual(new Set([3932550, 4050924, 3991312, 4016714, 4004085]));
    expect(veigar.assumptions.join(" ")).toContain("missile speed is absent");
    expect(veigar.assumptions.join(" ")).toContain("discrete 50-stack thresholds");
    expect(veigar.assumptions.join(" ")).toContain("center-based boundary intervals");
    expect(veigar.variants).toEqual([]);
  });

  it("reads Q/W/R max-rank base damage, ratios, and source fields", () => {
    const world = worldFor(0, 0);
    const [self, enemy] = world.units;
    for (const [key, raw] of [["Q", 240], ["W", 305], ["R", 325]] as const) {
      const effect = ability(self.spec, key).onHit![0]!;
      expect(effect.type).toBe("damage");
      if (effect.type === "damage") expect(effect.amountFor?.(self, enemy) ?? evaluate(effect.amount, self, enemy)).toBe(raw);
    }
    expect(ability(self.spec, "Q").delivery).toEqual({ kind: "line", range: 1050, width: 140, speed: 2200 });
    expect(ability(self.spec, "Q").cooldown).toBe(4);
    expect(ability(self.spec, "E").cooldown).toBe(14);
    expect(ability(self.spec, "R").cooldown).toBe(60);
    expect(ability(self.spec, "W").deliveryAtCastStart).toBe(true);
  });

  it("adds configured starting AP through innate effects visible without hooks", () => {
    const spec = compile(150).spec;
    const world = createWorld({ fighters: [{ ...spec, hooks: undefined, bonus: { ap: 100 } }, dummy()], distance: 0, modes: ["idle", "idle"] });
    expect(ap(world)).toBe(250);
    expect(ability(spec, "W").cooldownFor!(world.units[0])).toBeCloseTo(5.832);
    expect(compile(150).variants).toEqual([]);
  });

  it.each([-1, 0.1, NaN, Infinity])("rejects invalid starting stack count %s", (count) => {
    expect(() => compile(count)).toThrow("finite nonnegative integer");
  });

  it("grants AP after damage, affecting the next connected spell", () => {
    const world = worldFor();
    hit(world, "Q");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(310);
    expect(stacks(world)).toBe(1);
    expect(ap(world)).toBe(101);
    hit(world, "W");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(310 + 416.1);
    expect(stacks(world)).toBe(2);
    expect(ap(world)).toBe(102);
  });

  it.each(["spellShield", "parry"] as const)("counts negated %s contact without increasing that packet's damage", (state) => {
    const world = worldFor();
    defend(world, state);
    hit(world, "Q");
    expect(world.units[1].hp).toBe(10000);
    expect(stacks(world)).toBe(1);
    expect(ap(world)).toBe(101);
    if (state === "parry") expect(world.log.some((entry) => entry.text.includes("deals 310 magic damage"))).toBe(true);
  });

  it("untargetability creates no ability contact or passive stack", () => {
    const world = worldFor();
    defend(world, "untargetable");
    hit(world, "Q");
    expect(stacks(world)).toBe(0);
    expect(ap(world)).toBe(100);
  });

  it.each(["dodgeAttacks", "blockAttacks"] as const)("ordinary Q/W/R spells bypass attack-only %s", (state) => {
    for (const key of ["Q", "W", "R"]) {
      const world = worldFor();
      applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 10 }, { scale: 1 });
      applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 10 }, { scale: 1 });
      hit(world, key);
      expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
      expect(stacks(world)).toBe(1);
    }
  });

  it("launches Baleful Strike from its completion position and loses it to a projectile wall", () => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "Q"));
    world.units[0].x = 200;
    advanceThrough(world, 8);
    expect(world.missiles.find((missile) => missile.source === "Q")?.x).toBe(200);
    world.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 100 });
    advanceThrough(world, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(0);
  });

  it("scales AP growth consistently when skillshots fall back to expected-value hits", () => {
    const world = worldFor();
    hit(world, "Q", 0.25);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(77.5);
    expect(stacks(world)).toBe(0.25);
    expect(ap(world)).toBe(100.25);
    defend(world, "spellShield");
    hit(world, "W", 0.5);
    expect(stacks(world)).toBe(0.75);
  });

  it("Q champion takedown grants seven stacks and applies its kill AP next tick", () => {
    const world = worldFor();
    world.units[1].hp = 200;
    hit(world, "Q");
    expect(stacks(world)).toBe(7);
    expect(ap(world)).toBe(106);
    expect(world.units[0].memory.qKillAPTick).toBe(1);
    world.tick = 1;
    world.units[0].spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(ap(world)).toBe(107);
  });

  it("other spell takedowns grant six stacks, while an ordinary attack grants only five", () => {
    const spellWorld = worldFor();
    spellWorld.units[1].hp = 100;
    hit(spellWorld, "R");
    expect(stacks(spellWorld)).toBe(6);
    const attackWorld = worldFor();
    attackWorld.units[1].hp = 50;
    attackHit(attackWorld, attackWorld.units[0], attackWorld.units[1], false, []);
    expect(stacks(attackWorld)).toBe(5);
    expect(attackWorld.units[0].memory.qKillAPTick).toBeUndefined();
  });

  it("deduplicates a champion death continuation and excludes unrelated Q-labeled persistent effects", () => {
    const world = worldFor();
    world.units[1].fallen = true;
    dealDamage(world, world.units[0], world.units[1], 1, "magic", { ability: ability(veigar.spec, "Q").name, persistent: true });
    dealDamage(world, world.units[0], world.units[1], 1, "magic", { ability: "Another effect" });
    expect(stacks(world)).toBe(5);
    expect(world.units[0].memory.qKillAPTick).toBeUndefined();
  });

  it("does not attribute a prior self-inflicted death to an overkilling Q bolt", () => {
    const world = worldFor();
    world.units[1].hp = 50;
    dealDamage(world, world.units[1], world.units[1], 50, "true");
    hit(world, "Q");
    // The generic simultaneous-hit phase still reports contact before death cleanup,
    // but a zero-health-loss bolt cannot gain takedown or Q-kill AP.
    expect(stacks(world)).toBe(1);
    expect(world.units[0].memory.phenomenalEvilTakedown).toBeUndefined();
    expect(world.units[0].memory.qKillAPTick).toBeUndefined();
  });

  it("counts Sion's real death continuation once instead of counting every zombie hit as a takedown", () => {
    const world = createWorld({ fighters: [veigar.spec, kit("Sion").spec], distance: 0, modes: ["idle", "idle"] });
    world.units[1].hp = 1;
    hit(world, "Q");
    expect(world.units[1].fallen).toBe(true);
    expect(stacks(world)).toBe(7);
    advanceThrough(world, Number(world.units[1].memory.risesAt));
    hit(world, "Q");
    expect(stacks(world)).toBe(8);
    expect(world.units[0].memory.phenomenalEvilTakedown).toBe(true);
  });

  it("keeps growing AP and passive memory independent across copied branches", () => {
    const world = worldFor(50);
    const copy = cloneWorld(world);
    hit(copy, "Q");
    expect(stacks(world)).toBe(50);
    expect(ap(world)).toBe(150);
    expect(stacks(copy)).toBe(51);
    expect(ap(copy)).toBe(151);
  });
});

describe("Veigar Dark Matter declaration, stack cooldown and persistent landing", () => {
  it.each([[0, 8], [49, 8], [50, 7.2], [51, 7.2], [100, 6.48], [150, 5.832], [950, 8 * 0.9 ** 19]])("uses documented cooldown thresholds at %s stacks", (count, seconds) => {
    const world = worldFor(count);
    expect(ability(world.units[0].spec, "W").cooldownFor!(world.units[0])).toBeCloseTo(seconds, 12);
  });

  it("applies haste after stack reduction and changes only subsequent cooldown declarations", () => {
    const world = worldFor(49);
    const self = world.units[0];
    self.spec = { ...self.spec, bonus: { ...self.spec.bonus, abilityHaste: 100 } };
    startCast(world, self, ability(self.spec, "W"));
    advanceThrough(world, 8);
    expect(self.cooldownReady.W).toBe(128);
    hit(world, "Q");
    expect(stacks(world)).toBe(50);
    expect(self.cooldownReady.W).toBe(128);
    world.tick = 128;
    startCast(world, self, ability(self.spec, "W"));
    advanceThrough(world, 136);
    expect(self.cooldownReady.W).toBe(244);
  });

  it("lands at absolute tick 37 from declaration and pays the normal completion cost once", () => {
    const world = worldFor();
    world.units[1].x = 600;
    const before = world.units[0].resource;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    expect(world.zones.find((z) => z.ability === "W")?.endTick).toBe(37);
    advanceThrough(world, 36);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].resource).toBe(before - 80);
    advanceThrough(world, 37);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(415);
    expect(world.units[0].resource).toBe(before - 80);
  });

  it("exposes one threat with the real absolute landing time during the active W cast", () => {
    const world = worldFor();
    world.settings.reactionTime = 0;
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    advanceThrough(world, 2);
    const threats = perceive(world, 1).threats.filter((threat) => threat.source === "W");
    expect(threats).toHaveLength(1);
    expect(threats[0]!.eta).toBe(34);
  });

  it("does not throw W at a target protected until after its actual landing tick", () => {
    const world = worldFor();
    world.modes[0] = "fight";
    world.units[1].x = 500;
    world.units[0].cooldownReady = { Q: Infinity, E: Infinity, R: Infinity };
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "untargetable", duration: 40 / 30 }, { scale: 1 });
    expect(veigar.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "W" });
  });

  it("retains its fixed center so leaving the circle avoids damage", () => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    world.units[1].x = 1000;
    advanceThrough(world, 37);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(0);
  });

  it("still falls when Veigar dies during its cast, without ending the fight before the landing", () => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    world.tick = 2;
    dealDamage(world, world.units[1], world.units[0], 10000, "true");
    step(world, [standStill, standStill]);
    expect(world.units[0].alive).toBe(false);
    expect(world.result).toBeUndefined();
    advanceThrough(world, 37);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(415);
    expect(stacks(world)).toBe(1);
    expect(world.result?.reason).toBe("death");
  });

  it("a lethal post-death meteor turns the result into a draw", () => {
    const world = worldFor();
    world.units[1].x = 600;
    world.units[1].hp = 200;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    world.tick = 2;
    dealDamage(world, world.units[1], world.units[0], 10000, "true");
    advanceThrough(world, 37);
    expect(world.result).toEqual({ winner: "draw", reason: "death", tick: 37 });
    expect(stacks(world)).toBe(6);
  });

  it("post-death W splashes a pet without granting champion-hit or takedown AP", () => {
    const world = worldFor();
    world.units[1].x = 600;
    const pet = spawnPet(world, world.units[1], { kind: "test", name: "Test pet", hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 }, 600);
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    world.units[1].x = 1200;
    world.tick = 2;
    dealDamage(world, world.units[1], world.units[0], 10000, "true");
    advanceThrough(world, 37);
    expect(5000 - pet.hp).toBeCloseTo(415);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(0);
  });

  it.each(["untargetable", "parry"] as const)("checks %s acquired while the ground indicator is active", (state) => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    advanceThrough(world, 36);
    defend(world, state);
    advanceThrough(world, 37);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(state === "untargetable" ? 0 : 1);
  });

  it("checks a spell shield acquired before arrival and remains unaffected by projectile walls", () => {
    const world = worldFor();
    world.units[1].x = 600;
    world.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 100 });
    startCast(world, world.units[0], ability(world.units[0].spec, "W"));
    advanceThrough(world, 35);
    defend(world, "spellShield");
    advanceThrough(world, 37);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(1);
    expect(world.log.some((entry) => entry.text.includes("spell shield blocks Dark Matter"))).toBe(true);
  });
});

describe("Veigar Event Horizon boundary geometry and defenses", () => {
  it("keeps the interior safe and uses a fixed explicitly aimed center", () => {
    const world = worldFor();
    castCage(world, 500);
    advanceThrough(world, 23);
    expect(stun(world)).toBeUndefined();
    expect(stacks(world)).toBe(0);
    expect(world.zones.filter((zone) => zone.kind === "trap").map((zone) => zone.x)).toEqual([149.5, 850.5]);
    world.units[0].x = -100;
    world.units[1].x = 800;
    advanceThrough(world, 24);
    expect(stun(world)?.endTick).toBe(99);
    expect(stacks(world)).toBe(1);
  });

  it("retains the chosen center when either champion moves during the cast", () => {
    const world = worldFor();
    castCage(world, 500);
    world.units[0].x = -200;
    world.units[1].x = -500;
    advanceThrough(world, 8);
    expect(world.zones.filter((zone) => zone.kind === "trap").map((zone) => zone.x)).toEqual([149.5, 850.5]);
  });

  it.each([149.5, 850.5])("stuns either cage edge at %s but does not affect the safe center", (edge) => {
    const world = worldFor();
    castCage(world, 500);
    advanceThrough(world, 22);
    world.units[1].x = edge;
    advanceThrough(world, 23);
    expect(stun(world)?.endTick).toBe(98);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it.each([[289.99, false], [290, true], [411, true], [411.01, false]])("checks the disclosed center interval at distance %s", (distance, expected) => {
    const world = worldFor();
    castCage(world, 500);
    advanceThrough(world, 22);
    world.units[1].x = 500 + Number(distance);
    advanceThrough(world, 23);
    expect(stun(world) !== undefined).toBe(expected);
  });

  it("activates after the disclosed completion-relative delay and expires after three active seconds", () => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    expect(stun(world)).toBeUndefined();
    const traps = world.zones.filter((zone) => zone.kind === "trap");
    expect(traps.map((zone) => [zone.startTick, zone.endTick])).toEqual([[23, 113], [23, 113]]);
    world.units[1].x = 5000;
    advanceThrough(world, 113);
    expect(world.zones.some((zone) => zone.kind === "trap")).toBe(false);
  });

  it.each(["spellShield", "parry", "ccImmune"] as const)("consumes negated %s crossing, grants one AP, and cannot reapply at the other edge", (state) => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    defend(world, state);
    advanceThrough(world, 23);
    expect(stun(world)).toBeUndefined();
    expect(stacks(world)).toBe(1);
    world.units[1].statuses = [];
    world.units[1].x = -201;
    advanceThrough(world, 24);
    expect(stun(world)).toBeUndefined();
    expect(stacks(world)).toBe(1);
  });

  it("Black Shield consumes the cage crossing without stunning or knocking down", () => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 100 }, duration: 10, shieldType: "magic", blackShield: true }, { scale: 1 });
    advanceThrough(world, 23);
    expect(stun(world)).toBeUndefined();
    expect(stacks(world)).toBe(1);
  });

  it("a different cage cannot affect the same rival within 4.5 seconds of contact", () => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 23);
    const rival = world.units[1];
    rival.statuses = [];
    world.tick = 60;
    world.units[0].cooldownReady.E = 0;
    castCage(world);
    advanceThrough(world, 83);
    expect(stun(world)).toBeUndefined();
    // Its fresh ability contact still grants passive AP while the CC is negated.
    expect(stacks(world)).toBe(2);
    world.tick = 160;
    world.units[0].cooldownReady.E = 0;
    castCage(world);
    advanceThrough(world, 183);
    expect(stun(world)).toBeDefined();
    expect(stacks(world)).toBe(3);
  });

  it.each([false, true])("knockdown stops an ordinary dash, while displacement immunity=%s preserves it and still permits stun", (immune) => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    if (immune) defend(world, "displacementImmune");
    const rival = world.units[1];
    rival.spec = { ...rival.spec, abilities: [{ key: "dash", name: "Dash", slot: "E", cooldown: 10, castTime: 0, delivery: { kind: "dash", direction: "away", distance: 1000, speed: 500 } }] };
    rival.action = { kind: "dash", ability: "dash", startTick: 22, endTick: 82, perTick: 0, stopAtContact: false, unstoppable: false };
    advanceThrough(world, 23);
    expect(stun(world)?.endTick).toBe(98);
    expect(rival.action?.kind).toBe(immune ? "dash" : undefined);
    expect(rival.statuses.some((status) => status.key === "airborne")).toBe(false);
  });

  it("a one-contact immobilization negate preserves the dash and blocks the cage stun", () => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    const rival = world.units[1];
    applyEffect(world, rival, rival, { type: "state", state: "ccNegate", charges: 1, duration: 10 }, { scale: 1 });
    rival.spec = { ...rival.spec, abilities: [{ key: "dash", name: "Dash", slot: "E", cooldown: 10, castTime: 0, delivery: { kind: "dash", direction: "away", distance: 1000, speed: 500 } }] };
    rival.action = { kind: "dash", ability: "dash", startTick: 22, endTick: 82, perTick: 0, stopAtContact: false, unstoppable: false };
    advanceThrough(world, 23);
    expect(rival.action?.kind).toBe("dash");
    expect(stun(world)).toBeUndefined();
    expect(rival.statuses.some((status) => status.kind === "state" && status.key === "ccNegate")).toBe(false);
    expect(stacks(world)).toBe(1);
  });

  it("tenacity shortens only the stun, without creating an airborne duration", () => {
    const world = worldFor();
    castCage(world);
    advanceThrough(world, 22);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "tenacity", value: 0.4, duration: 10 }, { scale: 1 });
    advanceThrough(world, 23);
    expect(stun(world)?.endTick).toBe(68);
    expect(world.units[1].statuses.some((s) => s.key === "airborne")).toBe(false);
  });

  it("30 Hz boundary sampling permits a sufficiently fast crossing to miss both edges", () => {
    const world = worldFor();
    castCage(world, 500);
    advanceThrough(world, 23);
    world.units[1].x = 1000;
    advanceThrough(world, 24);
    expect(stun(world)).toBeUndefined();
    expect(stacks(world)).toBe(0);
  });

  it("cage traps remain available after their caster dies", () => {
    const world = worldFor();
    castCage(world, 500);
    advanceThrough(world, 8);
    world.units[0].alive = false;
    world.units[1].x = 850.5;
    world.tick = 23;
    advanceZones(world);
    expect(stun(world)).toBeDefined();
    expect(stacks(world)).toBe(1);
  });
});

describe("Veigar Primordial Burst travel, impact scaling and invalid-target cancellation", () => {
  it.each([[0, 400], [1 / 3, 600], [2 / 3, 800], [0.9, 800]])("reads current HP at impact with %s missing share", (missing, damage) => {
    const world = worldFor();
    world.units[1].hp = 10000 * (1 - missing);
    hit(world, "R");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(damage, 10);
    expect(stacks(world)).toBe(1);
  });

  it("uses explicitly assumed homing travel and reads changed HP/AP when the missile arrives", () => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "R"));
    advanceThrough(world, 8);
    expect(world.missiles.find((m) => m.source === "R")?.perTick).toBe(50);
    expect(world.units[1].totals.damageTaken).toBe(0);
    world.units[1].hp = 10000 / 3;
    hit(world, "Q");
    const prior = world.units[1].totals.damageTaken;
    advanceThrough(world, 19);
    expect(world.units[1].totals.damageTaken - prior).toBeCloseTo((325 + 0.75 * 101) * 2);
  });

  it.each(["range", "invisible", "untargetable", "death"] as const)("cancels a cast on target %s without mana or cooldown", (invalid) => {
    const world = worldFor();
    const [self, enemy] = world.units;
    enemy.x = 600;
    const before = self.resource;
    const spell = ability(self.spec, "R");
    expect(canCast(world, self, spell)).toBe(true);
    startCast(world, self, spell);
    if (invalid === "range") enemy.x = 651;
    else if (invalid === "death") enemy.alive = false;
    else applyEffect(world, enemy, enemy, { type: "state", state: invalid, duration: 10 }, { scale: 1 });
    advanceThrough(world, 8);
    expect(self.resource).toBe(before);
    expect(self.cooldownReady.R).toBeUndefined();
    expect(world.missiles.some((m) => m.source === "R")).toBe(false);
  });

  it("a projectile wall destroys the R missile without granting contact AP", () => {
    const world = worldFor();
    world.units[1].x = 600;
    world.zones.push({ id: 100, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 100 });
    startCast(world, world.units[0], ability(world.units[0].spec, "R"));
    advanceThrough(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(stacks(world)).toBe(0);
  });

  it.each(["invisible", "untargetable"] as const)("launched R survives invisibility but drops on untargetability: %s", (state) => {
    const world = worldFor();
    world.units[1].x = 600;
    startCast(world, world.units[0], ability(world.units[0].spec, "R"));
    advanceThrough(world, 8);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 10 }, { scale: 1 });
    advanceThrough(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(state === "invisible" ? 400 : 0);
    expect(stacks(world)).toBe(state === "invisible" ? 1 : 0);
  });
});

describe("Veigar ordinary duel policy and reflection", () => {
  it("aims a cage edge across the rival rather than stunning the safe interior", () => {
    const world = worldFor();
    world.modes[0] = "fight";
    world.units[1].x = 500;
    expect(veigar.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "E", aim: { direction: 1, distance: 149.5 } });
  });

  it.each(["trade", "hold"] as const)("keeps the ordinary no-ultimate policy in %s mode", (mode) => {
    const world = worldFor();
    world.modes[0] = mode;
    world.units[1].hp = 1000;
    world.units[0].cooldownReady = { Q: Infinity, W: Infinity, E: Infinity };
    expect(veigar.spec.behavior!(perceive(world, 0))).not.toEqual({ kind: "cast", ability: "R" });
  });

  it("retreats after a completed trade and avoids offensive meteor/R casts while fleeing", () => {
    const world = worldFor();
    world.modes[0] = "trade";
    world.units[0].memory.tradeDone = true;
    expect(veigar.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    world.modes[0] = "flee";
    world.units[0].cooldownReady.E = Infinity;
    world.units[1].hp = 1000;
    applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "stun", duration: 10 }, { scale: 1 });
    expect(veigar.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });

  it("uses all four abilities in a full fight with actual cage stuns and W damage", () => {
    const self = { ...veigar.spec, bonus: { ap: 350, hp: 2000 } };
    const rival = { ...dummy(), base: { ...dummy().base, moveSpeed: 350, ad: 60 } };
    const result = fairFight({ fighters: [self, rival], distance: 500, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 20, maxBranches: 8 } });
    for (const key of ["Q", "W", "E", "R"]) expect(result.timeline.some((entry) => entry.side === 0 && entry.text === `casts ${ability(self, key).name}`), key).toBe(true);
    expect(result.timeline.some((entry) => entry.text.includes("inflicts stun"))).toBe(true);
    expect(result.timeline.some((entry) => entry.text.includes("Dark Matter deals"))).toBe(true);
    expect(result.damage.every(Number.isFinite)).toBe(true);
    expect(result.hp.every(Number.isFinite)).toBe(true);
  });

  it("preserves win chances, HP and damage when a realistic opponent is swapped", () => {
    const self = { ...compile(150).spec, bonus: { ap: 300, hp: 1500 } };
    const rival = { ...kit("Garen").spec, bonus: { ad: 100, hp: 1000 } };
    const settings = { maxSeconds: 15, maxBranches: 8 };
    const forward = fairFight({ fighters: [self, rival], distance: 500, modes: ["fight", "fight"], settings });
    const reverse = fairFight({ fighters: [rival, self], distance: 500, modes: ["fight", "fight"], settings });
    expect(forward.win[0]).toBeCloseTo(reverse.win[1], 12);
    expect(forward.win[1]).toBeCloseTo(reverse.win[0], 12);
    expect(forward.hp[0]).toBeCloseTo(reverse.hp[1], 12);
    expect(forward.hp[1]).toBeCloseTo(reverse.hp[0], 12);
    expect(forward.damage[0]).toBeCloseTo(reverse.damage[1], 8);
    expect(forward.damage[1]).toBeCloseTo(reverse.damage[0], 8);
  }, 30000);

  it("preserves real 15,000-gold allocations and every default scenario when Veigar and Darius are swapped", () => {
    const darius = kit("Darius").spec;
    const forward = simulateMatchup(veigar.spec, darius, 15000, prices);
    const reverse = simulateMatchup(darius, veigar.spec, 15000, prices);
    expect(forward.builds[0]).toEqual(reverse.builds[1]);
    expect(forward.builds[1]).toEqual(reverse.builds[0]);
    const counterpart = { youEngage: "enemyEngages", enemyEngages: "youEngage", brawl: "brawl", shortTrade: "shortTrade", spacing: "spacing", escape: "escape" } as const;
    for (const scenario of forward.scenarios) {
      const swapped = reverse.scenarios.find((entry) => entry.id === counterpart[scenario.id])!;
      expect(Math.abs((scenario.score ?? 0) + (swapped.score ?? 0)), scenario.id).toBeLessThan(1e-12);
    }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
