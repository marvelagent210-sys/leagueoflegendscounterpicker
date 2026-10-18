/** Global game rules, checked against the worked examples on the wiki pages they come from. */
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { Glossary } from "../engine/glossary";
import { CC_RULES, type CCType, ccDuration, combineTenacity } from "../engine/rules/crowdControl";
import { effectiveResist, mitigate, resistMultiplier } from "../engine/rules/damage";
import { absorbWithShields, averageCritFactor, healingReceived, type Shield } from "../engine/rules/defense";
import { movementSpeed, softCap } from "../engine/rules/movement";
import { toTicks } from "../engine/rules/time";
import { capAttackSpeed, cooldownAfterHaste } from "../engine/rules/timing";
import { DATA_DIR } from "../pipeline/config";
import { latestDataset } from "../pipeline/datasets";
import { readJson } from "../pipeline/lib/files";

describe("damage mitigation (Armor, Armor penetration)", () => {
  it("reduces damage by 100 / (100 + R), and amplifies it for negative resistance", () => {
    expect(resistMultiplier(0)).toBe(1);
    expect(resistMultiplier(25)).toBeCloseTo(0.8, 12);
    expect(resistMultiplier(100)).toBeCloseTo(0.5, 12);
    expect(resistMultiplier(200)).toBeCloseTo(1 / 3, 12);
    // "A unit with -100 armor has 66.67% of nominal health."
    expect(1 / resistMultiplier(-100)).toBeCloseTo(0.6667, 4);
  });

  it("applies reductions and penetration in the wiki's order (its worked example)", () => {
    const reduction = { flat: 30, percent: [0.3] };
    const pen = { bonusPercent: [0.45], flat: 10 };
    expect(effectiveResist({ base: 100, bonus: 200 }, reduction, pen)).toBeCloseTo(122.3, 9);
    // Target B: 18 armor goes to -12, and nothing after flat reduction applies below 0.
    expect(effectiveResist({ base: 18, bonus: 0 }, reduction, pen)).toBeCloseTo(-12, 9);
  });

  it("spreads flat reduction over base and bonus resistance in proportion", () => {
    // 15 reduction against 20 base and 40 bonus armor leaves 45 (the wiki's example).
    expect(effectiveResist({ base: 20, bonus: 40 }, { flat: 15 })).toBeCloseTo(45, 9);
    // 30% armor reduction then 30% penetration multiply: 60 x 0.7 x 0.7.
    expect(effectiveResist({ base: 20, bonus: 40 }, { percent: [0.3] }, { percent: [0.3] })).toBeCloseTo(29.4, 9);
    // Lethality can't take armor below 0.
    expect(effectiveResist({ base: 10, bonus: 0 }, {}, { flat: 25 })).toBe(0);
  });

  it("adds damage dealt modifiers and multiplies damage received modifiers", () => {
    expect(mitigate(1000, "physical", 100)).toBeCloseTo(500, 9);
    expect(mitigate(1000, "true", 100)).toBe(1000);
    expect(mitigate(1000, "magic", 0, { dealt: [0.1, 0.05], received: [0.25, 0.1] })).toBeCloseTo(1000 * 1.15 * 0.75 * 0.9, 9);
    expect(mitigate(100, "physical", 0, { flatReduction: 120 })).toBe(0);
  });
});

describe("shields, healing and crits", () => {
  const shields = (): Shield[] => [
    { amount: 100, type: "normal", endTick: 90 },
    { amount: 50, type: "magic", endTick: 30 },
    { amount: 40, type: "normal", endTick: 60, priority: true },
  ];

  it("absorbs with the priority shield, then the one that expires soonest, by damage type", () => {
    const magic = shields();
    expect(absorbWithShields(150, "magic", magic)).toBe(0);
    expect(magic.map((s) => s.amount)).toEqual([40, 0, 0]);
    const physical = shields();
    expect(absorbWithShields(200, "physical", physical)).toBe(60);
    expect(physical.map((s) => s.amount)).toEqual([0, 50, 0]);
  });

  it("cuts healing by 40% under Grievous Wounds and averages crits at 200%", () => {
    expect(healingReceived(100, true)).toBeCloseTo(60, 9);
    expect(healingReceived(100, false)).toBe(100);
    expect(averageCritFactor(0.5)).toBeCloseTo(1.5, 9);
    expect(averageCritFactor(1.4)).toBe(2);
  });
});

describe("movement speed (Movement speed)", () => {
  it("applies the soft caps from the wiki's examples", () => {
    expect(softCap(600)).toBeCloseTo(530, 9);
    expect(softCap(450)).toBeCloseTo(443, 9);
    expect(softCap(180)).toBeCloseTo(200, 9);
    expect(softCap(0)).toBeCloseTo(110, 9);
    expect(softCap(-10000)).toBeCloseTo(10, 9);
    expect(softCap(345)).toBe(345);
  });

  it("counts only the strongest slow, weakened by slow resist", () => {
    expect(movementSpeed(400, { slows: [0.2, 0.4] })).toBeCloseTo(240, 9);
    // 50% slow resist turns a 40% slow into a 20% slow.
    expect(movementSpeed(400, { slows: [0.4], slowResist: 0.5 })).toBeCloseTo(320, 9);
    expect(movementSpeed(340, { flat: 25, additive: [0.1, 0.05] })).toBeCloseTo(softCap(365 * 1.15), 9);
  });
});

describe("crowd control and tenacity (Tenacity, Types of Crowd Control)", () => {
  it("stacks tenacity multiplicatively within a group and additively across groups", () => {
    // Mercury's Treads (30%) and Wit's End (20%) plus Brittle (-30%): 0.44 - 0.3.
    expect(combineTenacity([[0.3, 0.2], [-0.3]])).toBeCloseTo(0.14, 9);
  });

  it("shortens only the types tenacity affects", () => {
    expect(ccDuration(2, "stun", 0.3)).toBeCloseTo(1.4, 9);
    expect(ccDuration(1, "airborne", 0.3)).toBe(1);
    expect(ccDuration(1.5, "suppression", 0.5)).toBe(1.5);
  });

  it("matches the crowd control table the build reads from the wiki", async () => {
    const dataset = await latestDataset(DATA_DIR, "glossary.json");
    const glossary = await readJson<Glossary>(path.join(DATA_DIR, dataset, "glossary.json"));
    const interrupts = { yes: "yes", no: "no", "see notes": "movement" } as Record<string, string>;
    for (const row of glossary.crowdControl) {
      for (const type of row.types) {
        const rule = CC_RULES[type as CCType];
        expect(rule, type).toBeDefined();
        expect(rule.movement, `${type} movement`).toBe(row.movement);
        // The forced-action row reads "disabled / uncontrollable": charm and fear disable attacks, berserk and taunt force them.
        expect(row.attacking.split(" / "), `${type} attacking`).toContain(rule.attacking);
        expect(rule.abilities, `${type} abilities`).toBe(row.abilities);
        expect(rule.interruptsChannels, `${type} interrupts`).toBe(interrupts[row.interruptsChannels]);
        expect(rule.tenacity, `${type} tenacity`).toBe(row.tenacity);
      }
    }
  });
});

describe("timing (Haste, Attack speed, ticks)", () => {
  it("applies haste and the attack speed cap and floor", () => {
    expect(cooldownAfterHaste(10, 100)).toBeCloseTo(5, 9);
    expect(cooldownAfterHaste(10, 0)).toBe(10);
    // Attack speed rev 4073067: the former 2.5 cap changed to 1 / 0.333 in V25.S1.3.
    expect(capAttackSpeed(2.8)).toBe(2.8);
    expect(capAttackSpeed(5)).toBeCloseTo(3.003, 3);
    expect(capAttackSpeed(0.1)).toBe(0.2);
  });

  it("rounds durations up to the next 1/30 s tick", () => {
    expect(toTicks(0.25)).toBe(8);
    expect(toTicks(1)).toBe(30);
    expect(toTicks(0)).toBe(0);
    expect(toTicks(1 / 30)).toBe(1);
  });
});
