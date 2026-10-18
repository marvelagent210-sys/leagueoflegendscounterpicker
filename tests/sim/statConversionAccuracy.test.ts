import { describe, expect, it } from "vitest";
import { applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld } from "../../engine/sim/state";
import { context } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const conversionFighter = (): FighterSpec => ({
  ...fighter({ bonus: { hp: 600, ap: 100 } }),
  statConversions: { healthToAP: 0.03333, apToHealth: 1.6 },
});

function conversionWorld(spec = conversionFighter()) {
  return createWorld({ fighters: [spec, fighter()], distance: 0, modes: ["idle", "idle"] });
}

describe("simultaneous health and ability-power conversions", () => {
  it("uses the pinned Crimson Pact coefficients and its nonrecursive rule", () => {
    const innate = context("Vladimir").ability("Crimson Pact");
    expect(innate.quoted("(3.333% bonus health)")).toBe(3.333);
    expect(innate.quoted("(160% AP)")).toBe(160);
    expect(innate.quote("These two bonuses do not stack with each other.")).toContain("do not stack");
    const world = conversionWorld();
    expect(derive(world.units[0]).maxHp).toBe(2760);
    expect(derive(world.units[0]).ap).toBeCloseTo(119.998, 12);
    expect(world.units[0].hp).toBe(2760);
  });

  it("reads unconverted stat buffs for both conversions without feeding converted AP back into health", () => {
    const world = conversionWorld();
    const self = world.units[0];
    self.statuses.push(lasting("stat", "health", 300), lasting("stat", "AP", 50));
    expect(derive(self).maxHp).toBe(3140);
    expect(derive(self).ap).toBeCloseTo(179.997, 12);
    expect(evaluate({ base: 0, ratios: { bonusHP: 1 } }, self)).toBe(1140);
    expect(self.hp).toBe(2760);
  });

  it("gaining AP raises maximum health without healing current health", () => {
    const world = conversionWorld();
    const self = world.units[0];
    self.hp = 1000;
    applyEffect(world, self, self, { type: "stat", stat: "AP", amount: { base: 50 }, duration: 1 }, { scale: 1 });
    expect(derive(self).maxHp).toBe(2840);
    expect(derive(self).ap).toBeCloseTo(169.998, 12);
    expect(self.hp).toBe(1000);
    expect(self.totals.healing).toBe(0);
  });

  it("an ordinary health buff heals only its health amount and its converted AP produces no additional HP", () => {
    const world = conversionWorld();
    const self = world.units[0];
    self.hp = 1000;
    applyEffect(world, self, self, { type: "stat", stat: "health", amount: { base: 100 }, duration: 1 }, { scale: 1 });
    expect(derive(self).maxHp).toBe(2860);
    expect(derive(self).ap).toBeCloseTo(123.331, 12);
    expect(self.hp).toBe(1100);
  });

  it("expires AP-derived maximum health with the existing current-health cap", () => {
    const world = conversionWorld();
    const self = world.units[0];
    applyEffect(world, self, self, { type: "stat", stat: "AP", amount: { base: 50 }, duration: 1 }, { scale: 1 });
    applyEffect(world, self, self, { type: "heal", amount: { base: 80 } }, { scale: 1 });
    expect(self.hp).toBe(2840);
    world.tick = 30;
    step(world, [idle, idle]);
    expect(derive(self).maxHp).toBe(2760);
    expect(self.hp).toBe(2760);
    expect(self.totals.healing).toBe(80);
  });

  it("recomputes conversions after a spec change and keeps a cloned branch independent", () => {
    const world = conversionWorld();
    expect(derive(world.units[0]).maxHp).toBe(2760);
    const branch = cloneWorld(world);
    branch.units[0].spec = { ...branch.units[0].spec, bonus: { hp: 300, ap: 200 } };
    expect(derive(branch.units[0]).maxHp).toBe(2620);
    expect(derive(branch.units[0]).ap).toBeCloseTo(209.999, 12);
    expect(derive(world.units[0]).maxHp).toBe(2760);
    expect(derive(world.units[0]).ap).toBeCloseTo(119.998, 12);
    expect(branch.units[0].hp).toBe(2760);
  });
});

describe("movement-speed bonus effectiveness", () => {
  const speedWorld = () => conversionWorld({
    ...fighter({ base: { moveSpeed: 335 } }),
    statConversions: { moveSpeedBonusEffectiveness: 2 },
  });

  it("reads the current pinned Serpentine Grace level-20 effectiveness", () => {
    const innate = context("Cassiopeia").ability("Serpentine Grace");
    expect(innate.levelValue("increases the effectiveness of all movement speed bonuses")).toBeCloseTo(39.6470588235294, 12);
  });

  it("does not amplify base movement speed", () => {
    const self = speedWorld().units[0];
    expect(derive(self).rawMoveSpeed).toBe(335);
    expect(derive(self).moveSpeed).toBe(335);
  });

  it("amplifies positive flat and percent bonuses separately before the soft cap", () => {
    const self = speedWorld().units[0];
    self.statuses.push(lasting("stat", "moveSpeedFlat", 30), lasting("stat", "moveSpeedPercent", 0.4));
    // (335 + 60) * 1.8 = 711, then the >490 soft cap gives 585.5.
    expect(derive(self).rawMoveSpeed).toBe(711);
    expect(derive(self).moveSpeed).toBe(585.5);
  });

  it("leaves negative flat/percent modifiers and slow strengths unchanged when mixed with bonuses", () => {
    const self = speedWorld().units[0];
    self.statuses.push(
      lasting("stat", "moveSpeedFlat", 30), lasting("stat", "moveSpeedFlat", -10),
      lasting("stat", "moveSpeedPercent", 0.2), lasting("stat", "moveSpeedPercent", -0.1),
      lasting("cc", "slow", 0.5), lasting("stat", "slowResist", 0.5),
    );
    // (335 + 60 - 10) * (1 + .4 - .1) * (1 - .5 * .5).
    expect(derive(self).rawMoveSpeed).toBeCloseTo(375.375, 12);
    expect(derive(self).moveSpeed).toBeCloseTo(375.375, 12);
  });

  it("does not amplify negative modifiers when there are no positive bonuses", () => {
    const self = speedWorld().units[0];
    self.statuses.push(lasting("stat", "moveSpeedFlat", -30), lasting("stat", "moveSpeedPercent", -0.2));
    expect(derive(self).rawMoveSpeed).toBe(244);
    expect(derive(self).moveSpeed).toBe(244);
  });

  it("still respects slow immunity and applies soft caps afterward", () => {
    const self = speedWorld().units[0];
    self.statuses.push(lasting("stat", "moveSpeedPercent", 0.2), lasting("cc", "slow", 0.5), lasting("state", "slowImmune"));
    expect(derive(self).rawMoveSpeed).toBeCloseTo(469, 12);
    expect(derive(self).moveSpeed).toBeCloseTo(458.2, 12);
  });

  it("retains the complete baseline derived stats when no conversions are configured", () => {
    const a = fighter({ bonus: { hp: 123.456, ap: 78.9 }, base: { moveSpeed: 335 } });
    const world = createWorld({ fighters: [a, { ...a, statConversions: {} }], distance: 0, modes: ["idle", "idle"] });
    for (const self of world.units) self.statuses.push(lasting("stat", "health", 123.456), lasting("stat", "moveSpeedFlat", 30), lasting("stat", "moveSpeedPercent", 0.4), lasting("cc", "slow", 0.15));
    expect(derive(world.units[0])).toEqual(derive(world.units[1]));
  });
});
