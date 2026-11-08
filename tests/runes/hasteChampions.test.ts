import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { derive } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";
import { fighter } from "../sim/kits";

const frames = (seconds: number) => Math.ceil(seconds * 30 - 1e-9);
function arena(champion: string, bonus: BonusStats = {}, options: Record<string, number> = {}, distance = 300): World {
  const spec = kit(champion, options).spec;
  return createWorld({
    fighters: [
      { ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ...spec.bonus, ...bonus } },
      fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } }),
    ], distance, modes: ["idle", "idle"], settings: { maxSeconds: 80, log: true },
  });
}
const spell = (world: World, key: string) => world.units[0].spec.abilities.find(ability => ability.key === key)!;
function through(world: World, tick: number): void {
  while (world.tick <= tick && !world.result) step(world, [idle, idle]);
}
function cast(world: World, key: string, distance?: number): void {
  const ability = spell(world, key);
  expect(ability, key).toBeDefined();
  expect(canCast(world, world.units[0], ability), `castable ${key} at ${world.tick}`).toBe(true);
  startCast(world, world.units[0], ability, distance === undefined ? undefined : { direction: 1, distance });
  while (world.units[0].action?.kind === "cast" && !world.result) step(world, [idle, idle]);
}

const selected = { abilityHaste: 40, basicAbilityHaste: 15, ultimateAbilityHaste: 80 };

describe("Udyr's separately qualified stance, global and Awaken clocks", () => {
  it.each(["Q", "W", "E", "R"] as const)("%s remains a basic cooldown even when its slot is R", key => {
    const world = arena("Udyr", selected), self = world.units[0];
    cast(world, key);
    expect(spell(world, key).hasteType).toBe("basic");
    expect(self.cooldownReady[key]).toBe(117); // 6 / (1 + (40 + 15) / 100).
    const others = ["Q", "W", "E", "R"].filter(other => other !== key);
    expect(others.map(other => self.cooldownReady[other])).toEqual([30, 30, 30]);
  });

  it.each([
    [{ abilityHaste: 100, basicAbilityHaste: 15 }, 600],
    [{ abilityHaste: 100, basicAbilityHaste: 15, ultimateAbilityHaste: 100 }, 300],
    [{ ultimateAbilityHaste: 25 }, 480],
    [{ abilityHaste: 100, basicAbilityHaste: 15, ultimateAbilityHaste: 900 }, 100],
  ] as const)("Awaken uses only its explicitly eligible ultimate haste: %j", (bonus, length) => {
    const state: BonusStats = bonus;
    const world = arena("Udyr", state), self = world.units[0];
    cast(world, "Q"); through(world, 8); const at = world.tick;
    cast(world, "Q2");
    expect(self.memory.awakenReady).toBe(at + length);
    expect(self.cooldownReady.Q).toBe(at + frames(6 / (1 + ((state.abilityHaste ?? 0) + (state.basicAbilityHaste ?? 0)) / 100)));
    // The client-only empowered global lock retains its documented fixed interpretation.
    expect(self.cooldownReady.R).toBe(Math.max(frames(1.5 / (1 + ((state.abilityHaste ?? 0) + (state.basicAbilityHaste ?? 0)) / 100)), at + 15));
  });

  it.each([[100, 15], [900, 5]])("Monk Training refunds a source-capped ultimate-only duration on an actual hit at %s haste", (ultimateAbilityHaste, refund) => {
    const world = arena("Udyr", { abilityHaste: 100, basicAbilityHaste: 15, ultimateAbilityHaste }, {}, 0), self = world.units[0];
    cast(world, "Q"); through(world, 8); cast(world, "Q2");
    const before = Number(self.memory.awakenReady);
    startAttack(world, self);
    through(world, world.tick + 35);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(self.memory.monk).toBe(1);
    expect(self.memory.awakenReady).toBe(before - refund);
  });
});

describe("champion-owned basic recharge and held clocks", () => {
  it("Syndra combines generic, basic and her own Q-only haste while keeping intercast spacing static", () => {
    const world = arena("Syndra", selected), self = world.units[0];
    cast(world, "Q", 300);
    expect(self.cooldownReady.Q).toBe(38);
    expect(self.charges.Q?.nextTick).toBe(114); // 7s / (1 + (40 + 15 + 30) / 100).
    through(world, 113); expect(self.charges.Q?.count).toBe(1);
    through(world, 114); expect(self.charges.Q?.count).toBe(2);
  });

  it("Syndra's held W starts the qualified cooldown after throwing its actual sphere", () => {
    const world = arena("Syndra", selected), self = world.units[0];
    cast(world, "Q", 300); through(world, 18);
    cast(world, "W", 300); expect(self.cooldownReady.W).toBe(Infinity);
    cast(world, "W2", 300);
    expect(self.cooldownReady.W).toBe(world.tick + 175); // 9s / 1.55.
  });

  it("Zyra's W real charge timer and a qualifying minion kill use the same qualified interval", () => {
    const world = arena("Zyra", selected), self = world.units[0];
    cast(world, "W", 300);
    const interval = frames(spell(world, "W").charges!.recharge / 1.55);
    expect(self.charges.W?.count).toBe(1);
    expect(self.charges.W?.nextTick).toBe(interval);
    const victim = spawnPet(world, world.units[1], { kind: "haste-minion", name: "Real minion", targetClass: "minion", hp: 100, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 20 }, 0);
    damagePet(world, self, victim, 1000, "true", false);
    expect(self.charges.W?.nextTick).toBeCloseTo(interval * 0.65, 10);
    expect(self.charges.W?.count).toBe(1);
  });

  it("Aatrox's real Q1 start timer includes basic haste with its noncanonical key", () => {
    const world = arena("Aatrox", selected), self = world.units[0];
    const expected = frames(spell(world, "Q1").cooldown / 1.55);
    startCast(world, self, spell(world, "Q1"));
    expect(self.cooldownReady.Q1).toBe(expected);
  });

  it("Aatrox's Q1 custom start retains its equipped noncanonical conditional haste", () => {
    const world = arena("Aatrox", selected), self = world.units[0];
    self.spec = { ...self.spec, abilities: self.spec.abilities.map(ability => ({ ...ability,
      bonusAbilityHaste: ability.key === "Q1" ? 40 : 0,
    })) };
    startCast(world, self, spell(world, "Q1"));
    expect(self.cooldownReady.Q1).toBe(frames(spell(world, "Q1").cooldown / 1.95));
  });

  it("Shyvana restarts Q's qualified cooldown when an actual empowered attack begins", () => {
    const world = arena("Shyvana", selected, {}, 0), self = world.units[0];
    cast(world, "Q"); const at = world.tick;
    startAttack(world, self);
    expect(self.action?.kind).toBe("windup");
    expect(self.cooldownReady.Q).toBe(at + frames(spell(world, "Q").cooldown / 1.55));
  });

  it("Heimerdinger's empowered W retains its shared basic cooldown", () => {
    const world = arena("Heimerdinger", selected), self = world.units[0];
    cast(world, "R"); cast(world, "RW");
    expect(self.cooldownReady.W).toBe(world.tick - 1 + frames(spell(world, "W").cooldown / 1.55));
    expect(self.cooldownReady.RW).toBeUndefined();
  });
});

describe("haste proxy floors, source exceptions and passive scaling", () => {
  it("Sona's earned Accelerando haste adds to generic and basic grants exactly once", () => {
    const world = arena("Sona", selected, { accelerando: 120 }), self = world.units[0];
    const at = world.tick;
    cast(world, "Q");
    expect(self.cooldownReady.Q).toBe(at + frames(spell(world, "Q").cooldown / 2.15));
    expect(derive(self).abilityHaste).toBe(40);
    cast(world, "R");
    expect(self.cooldownReady.R).toBe(world.tick - 1 + frames(spell(world, "R").cooldown / 2.2));
  });

  it.each([["Q", 5], ["W", 15], ["E", 25]] as const)
  ("Sona's %s proxy uses that spell's distinct additional haste", (key, extra) => {
    const world = arena("Sona", selected, { accelerando: 120 }), self = world.units[0];
    self.spec = { ...self.spec, abilities: self.spec.abilities.map(ability => ({ ...ability,
      bonusAbilityHaste: ability.key === "Q" ? 5 : ability.key === "W" ? 15 : ability.key === "E" ? 25 : 0,
    })) };
    self.hp -= 50;
    const at = world.tick;
    cast(world, key);
    expect(self.cooldownReady[key]).toBe(at + frames(spell(world, key).cooldown / (1 + (40 + 15 + extra + 60) / 100)));
  });

  it("Sona's additive basic total respects the sourced 500-haste cap", () => {
    const world = arena("Sona", { abilityHaste: 400, basicAbilityHaste: 50 }, { accelerando: 120 });
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(frames(spell(world, "Q").cooldown / 6));
  });

  it("Taliyah's worked-ground Q retains the 0.75-second floor after combined haste", () => {
    const world = arena("Taliyah", { abilityHaste: 500, basicAbilityHaste: 15 }), self = world.units[0];
    cast(world, "Q", 300); through(world, 60);
    expect(world.zones.some(zone => zone.ability === "Q-ground")).toBe(true);
    self.cooldownReady.Q = 0; const at = world.tick;
    cast(world, "Q-worked", 300);
    expect(self.cooldownReady.Q).toBe(world.tick - 1 + 23);
  });

  it("Taliyah's worked alias preserves its floor with alias-only conditional haste", () => {
    const world = arena("Taliyah"), self = world.units[0];
    self.spec = { ...self.spec, abilities: self.spec.abilities.map(ability => ({ ...ability,
      bonusAbilityHaste: ability.key === "Q-worked" ? 400 : 0,
    })) };
    cast(world, "Q", 300); through(world, 60);
    expect(world.zones.some(zone => zone.ability === "Q-ground")).toBe(true);
    self.cooldownReady.Q = 0;
    cast(world, "Q-worked", 300);
    expect(self.cooldownReady.Q).toBe(world.tick - 1 + 23);
  });

  it("Kindred's ordinary Q shortens, while Q inside the actual Wolf field stays fixed", () => {
    const ordinary = arena("Kindred", selected), field = arena("Kindred", selected);
    cast(ordinary, "Q", 100);
    expect(ordinary.units[0].cooldownReady.Q).toBe(frames(spell(ordinary, "Q").cooldown / 1.55));
    cast(field, "W", 300); const at = field.tick;
    cast(field, "Q", 100);
    expect(field.units[0].cooldownReady.Q).toBe(at + 60);
  });

  it("Fiddlesticks' explicitly haste-affected Terrify lock uses its basic Q haste", () => {
    const world = arena("Fiddlesticks", selected), self = world.units[0];
    cast(world, "Q");
    const until = Number(self.memory["fiddlesticks:fearLock"]);
    expect(until).toBeGreaterThan(world.tick);
    expect(until - (world.tick - 1)).toBe(frames(spell(world, "Q").cooldown / 1.55));
  });

  it("Taric's passive Bravado refund magnitude continues to read only generic haste", () => {
    const reductions: number[] = [];
    for (const basicAbilityHaste of [0, 15]) {
      const world = arena("Taric", { abilityHaste: 40, basicAbilityHaste }, {}, 0), self = world.units[0];
      cast(world, "W"); self.cooldownReady.Q = 1000; self.cooldownReady.E = 1000;
      startAttack(world, self); through(world, world.tick + 35);
      reductions.push(1000 - self.cooldownReady.E!);
    }
    expect(reductions).toEqual([39, 39]);
  });
});
