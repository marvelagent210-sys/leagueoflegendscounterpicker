import { describe, expect, it } from "vitest";
import { interpolateByLevel } from "../engine/levelScaling";
import {
  ATTACK_SPEED_CAP,
  ATTACK_SPEED_FLOOR,
  attackSpeedAtLevel,
  attackWindup,
  growthFactor,
  statAtLevel,
  statsAtLevel,
  windupPercent,
} from "../engine/stats";
import { makeFormStats } from "./helpers";

describe("growthFactor", () => {
  it("applies the game's growth curve", () => {
    expect(growthFactor(1)).toBe(0);
    expect(growthFactor(2)).toBeCloseTo(0.72, 10);
    expect(growthFactor(18)).toBeCloseTo(17, 10);
    expect(growthFactor(20)).toBeCloseTo(19.665, 10);
  });

  it("adds 0.65 + 0.035n of the growth on each level-up", () => {
    for (let level = 2; level <= 20; level++) {
      expect(growthFactor(level) - growthFactor(level - 1)).toBeCloseTo(0.65 + 0.035 * level, 10);
    }
  });

  it("rejects levels outside 1-20", () => {
    expect(() => growthFactor(0)).toThrow(RangeError);
    expect(() => growthFactor(21)).toThrow(RangeError);
    expect(() => growthFactor(1.5)).toThrow(RangeError);
  });
});

describe("statAtLevel", () => {
  it("matches Darius's level-20 health on the wiki", () => {
    expect(statAtLevel({ base: 652, perLevel: 114 }, 20)).toBeCloseTo(2893.81, 6);
  });
});

describe("attack speed", () => {
  const aatrox = { base: 0.651, ratio: 0.651, bonusPerLevel: 2.5 };

  it("scales bonus attack speed from levels by the ratio", () => {
    expect(attackSpeedAtLevel(aatrox, 1)).toBe(0.651);
    expect(attackSpeedAtLevel(aatrox, 20)).toBeCloseTo(0.971, 3);
  });

  it("applies the ratio to extra bonus attack speed", () => {
    const champion = { base: 0.625, ratio: 0.7, bonusPerLevel: 0 };
    expect(attackSpeedAtLevel(champion, 1, 100)).toBeCloseTo(1.325, 10);
  });

  it("clamps to the cap and floor", () => {
    expect(attackSpeedAtLevel(aatrox, 20, 1000)).toBe(ATTACK_SPEED_CAP);
    expect(attackSpeedAtLevel(aatrox, 1, -99)).toBe(ATTACK_SPEED_FLOOR);
  });
});

describe("attack windup", () => {
  it("is a fixed share of the attack time without a windup modifier", () => {
    const stats = makeFormStats({ windup: { percent: 0.25, modifier: 1, source: "offset" } });
    expect(attackWindup(stats, 0.625, 1)).toBeCloseTo(0.4, 10);
    expect(attackWindup(stats, 1.25, 1)).toBeCloseTo(0.2, 10);
  });

  it("shrinks less with bonus attack speed when the modifier is below 1", () => {
    const stats = makeFormStats({ windup: { percent: 0.2, modifier: 0.5, source: "offset" } });
    // baseWindup 0.32 s; at double attack speed the unmodified windup would be 0.16 s.
    expect(attackWindup(stats, 0.625, 1)).toBeCloseTo(0.32, 10);
    expect(attackWindup(stats, 1.25, 1)).toBeCloseTo(0.24, 10);
  });

  it("uses a level-scaled cast time when the game overrides it (Senna)", () => {
    const stats = makeFormStats({
      windup: {
        percent: 0.34375,
        modifier: 0.6,
        source: "castTime",
        castTimeByLevel: { start: 0.5, end: 0.35, scalePastMaxLevel: false },
        attackTotalTime: 1.6,
      },
    });
    expect(windupPercent(stats, 1)).toBeCloseTo(0.3125, 10);
    expect(windupPercent(stats, 18)).toBeCloseTo(0.21875, 10);
    expect(windupPercent(stats, 20)).toBeCloseTo(0.21875, 10);
  });
});

describe("interpolateByLevel", () => {
  it("is linear from level 1 to 18", () => {
    const scaling = { start: 20, end: 70, scalePastMaxLevel: false };
    expect(interpolateByLevel(scaling, 1)).toBe(20);
    expect(interpolateByLevel(scaling, 18)).toBe(70);
    expect(interpolateByLevel(scaling, 20)).toBe(70);
  });

  it("keeps growing past 18 only when flagged (Udyr's Awaken attack speed)", () => {
    const scaling = { start: 20, end: 70, scalePastMaxLevel: true };
    expect(interpolateByLevel(scaling, 20)).toBeCloseTo(75.882, 3);
  });
});

describe("statsAtLevel", () => {
  it("combines the formulas for one form", () => {
    const stats = statsAtLevel(makeFormStats(), 20);
    expect(stats.hp).toBeCloseTo(600 + 100 * 19.665, 10);
    expect(stats.attackTime).toBeCloseTo(1 / stats.attackSpeed, 10);
    expect(stats.attackWindup).toBeLessThan(stats.attackTime);
  });
});
