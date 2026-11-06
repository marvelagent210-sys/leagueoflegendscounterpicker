import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { startCast } from "../../engine/sim/actions";
import { channelPulseCount } from "../../engine/sim/channelPulses";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { describeAbility } from "../../engine/sim/describe";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, ChannelSpec, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type Unit } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { castWhenReady, duel, idle, ticksOf } from "./helpers";

const hit = { type: "damage", damageType: "true", amount: { base: 10 } } as const;
const spin = (channel: Partial<ChannelSpec> = {}): AbilitySpec => ability({
  key: "E", cooldown: 100, delivery: { kind: "self" },
  channel: { duration: 3, interruptible: false, range: 400, onTick: [hit], ...channel },
});
const arena = (ability: AbilitySpec, bonus: FighterSpec["bonus"] = {}) => createWorld({
  fighters: [fighter({ abilities: [ability], bonus }), fighter()], distance: 0, modes: ["idle", "idle"], settings: { log: true },
});

describe("source-qualified channel pulse counts", () => {
  it("evaluates a callback once at launch, ahead of formula and interval fallbacks", () => {
    let calls = 0;
    const skill = spin({ pulses: { base: 99 }, interval: 0.1, pulsesFor(self) { calls++; return 7 + 4 * (self.spec.bonus?.attackSpeed ?? 0); } });
    const world = arena(skill, { attackSpeed: 0.49 });
    startCast(world, world.units[0], skill);
    expect(calls).toBe(1);
    expect(world.units[0].action).toMatchObject({ kind: "channel", startTick: 0, endTick: 90, pulseCount: 8, pulsesDone: 0, nextTick: 12, intervalTicks: 11 });
    for (let tick = 0; tick <= 90; tick++) step(world, [idle, idle]);
    expect(calls).toBe(1);
    expect(world.units[1].totals.damageTaken).toBe(80);
    expect(ticksOf(world.log, 0, "E deals 10 true")).toEqual([12, 23, 34, 45, 57, 68, 79, 90]);
  });

  it("keeps the cast snapshot through later stat changes, then reevaluates the next cast", () => {
    let calls = 0;
    const skill = spin({ pulsesFor(self) { calls++; return 7 + 4 * derive(self).bonusAttackSpeed; } });
    const world = arena(skill);
    startCast(world, world.units[0], skill);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "attackSpeed", amount: { base: 0.5 }, duration: 100 }, { scale: 1 });
    expect(world.units[0].action).toMatchObject({ pulseCount: 7, nextTick: 13 });
    for (let tick = 0; tick <= 90; tick++) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBe(70);
    expect(calls).toBe(1);
    world.units[0].cooldownReady.E = world.tick;
    startCast(world, world.units[0], skill);
    expect(world.units[0].action).toMatchObject({ pulseCount: 9, nextTick: world.tick + 10 });
    expect(calls).toBe(2);
  });

  it("copies the resolved pulse count into independent outcome branches", () => {
    let calls = 0;
    const skill = spin({ pulsesFor() { calls++; return 19; } });
    const world = arena(skill); startCast(world, world.units[0], skill);
    const branch = cloneWorld(world);
    for (let tick = 0; tick <= 90; tick++) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBe(190);
    expect(branch.units[1].totals.damageTaken).toBe(0);
    for (let tick = 0; tick <= 90; tick++) step(branch, [idle, idle]);
    expect(branch.units[1].totals.damageTaken).toBe(190);
    expect(calls).toBe(1);
  });

  it("leaves manually started channels to their owning kit", () => {
    let calls = 0;
    const skill = spin({ manualStart: true, pulsesFor() { calls++; return 8; } });
    const world = arena(skill); startCast(world, world.units[0], skill);
    expect(calls).toBe(0);
    expect(world.units[0].action).toBeUndefined();
  });

  it.each([NaN, Infinity, -Infinity, 0, -1])("rejects invalid callback count %s instead of scheduling a broken channel", (count) => {
    const skill = spin({ pulsesFor: () => count }), world = arena(skill);
    expect(() => startCast(world, world.units[0], skill)).toThrow(/finite positive count/);
  });

  it("floors positive callback results with the existing pulse-boundary tolerance", () => {
    const world = arena(spin());
    const unit = world.units[0];
    expect(channelPulseCount({ pulsesFor: () => 8.49 }, unit)).toBe(8);
    expect(channelPulseCount({ pulsesFor: () => 8.9999999999 }, unit)).toBe(9);
    expect(channelPulseCount({ pulsesFor: () => 0.5 }, unit)).toBe(1);
  });

  it.each([7, 14, 19, 31])("preserves legacy Formula channels with %s pulses", (pulses) => {
    const outcome = duel(fighter({ abilities: [spin({ pulses: { base: pulses } })] }), fighter(), {
      behaviors: [castWhenReady("E"), idle], settings: { maxSeconds: 3.1 },
    });
    expect(ticksOf(outcome.timeline, 0, "E deals 10 true")).toEqual(Array.from({ length: pulses }, (_, index) => Math.ceil(90 * (index + 1) / pulses)));
    expect(outcome.damage[0]).toBe(pulses * 10);
  });

  it("preserves legacy interval channels", () => {
    const skill = spin({ duration: 1, interval: 0.25 }), world = arena(skill);
    startCast(world, world.units[0], skill);
    expect(world.units[0].action).toMatchObject({ nextTick: 8, intervalTicks: 8 });
    expect(world.units[0].action).not.toHaveProperty("pulseCount");
    for (let tick = 0; tick <= 30; tick++) step(world, [idle, idle]);
    expect(ticksOf(world.log, 0, "E deals 10 true")).toEqual([8, 16, 24]);
  });

  it("describes callback counts without presenting the overridden generic formula", () => {
    const description = describeAbility(spin({ pulses: { base: 999 }, pulsesFor: () => 8 }));
    expect(description.delivery).toContain("source-qualified pulses at cast");
    expect(description.delivery).not.toContain("999");
  });
});

describe("budget channel callback valuation", () => {
  const valued = (skill: AbilitySpec, bonus: FighterSpec["bonus"] = {}): FighterSpec => ({
    ...fighter({ abilities: [skill], bonus }), budget: { attacks: false },
  });

  it("retains the callback in cached terms and reevaluates each candidate unit", () => {
    const skill = spin({ pulses: { base: 999 }, pulsesFor: (self) => 7 + 4 * (self.spec.bonus?.attackSpeed ?? 0) });
    const spec = valued(skill, { attackSpeed: 0.49 });
    expect(damagePerSecond(spec, fighter()).true).toBeCloseTo(0.8, 10);
    expect(damagePerSecond({ ...spec, bonus: { attackSpeed: 0.5 } }, fighter()).true).toBeCloseTo(0.9, 10);
    expect(damagePerSecond(spec, fighter()).true).toBeCloseTo(0.8, 10);
  });

  it("uses the same callback rounding as combat and keeps repeated valuation pure", () => {
    const skill = spin({ pulsesFor: (self: Unit) => 7 + (self.spec.bonus?.ap ?? 0) / 100 });
    const spec = valued(skill, { ap: 199.99999999 });
    expect(damagePerSecond(spec, fighter()).true).toBeCloseTo(0.9, 10);
    expect(damagePerSecond({ ...spec, bonus: { ap: 99 } }, fighter()).true).toBeCloseTo(0.7, 10);
    expect(damagePerSecond(spec, fighter()).true).toBeCloseTo(0.9, 10);
  });

  it("rejects an invalid callback in the budget instead of keeping the reference formula", () => {
    expect(() => damagePerSecond(valued(spin({ pulses: { base: 8 }, pulsesFor: () => NaN })), fighter())).toThrow(/finite positive count/);
  });
});
