import { describe, expect, it } from "vitest";
import { KitDataError, numbersIn } from "../../engine/kits/context";
import { context } from "./helpers";

describe("reading wiki ability data at level 20", () => {
  it("reads leveling values at max rank with their ratios", () => {
    const garen = context("Garen");
    expect(garen.ability("Demacian Justice").formula("True Damage")).toEqual({ base: 275, ratios: { targetMissingHP: 0.35 } });
    expect(garen.ability("Decisive Strike").formula("Bonus Physical Damage")).toEqual({ base: 150, ratios: { AD: 0.5 } });
    expect(garen.ability("Courage").fraction("Damage Reduction")).toBeCloseTo(0.41, 12);
    expect(garen.ability("Decisive Strike").number("Movement Speed Duration")).toBe(3.6);
  });

  it("reads percentages of a stat as ratios, and per-100 modifiers as products", () => {
    const nasus = context("Nasus");
    const tick = nasus.ability("Fury of the Sands").formula("Magic Damage Per Tick");
    expect(tick.base).toBe(0);
    expect(tick.ratios?.targetMaxHP).toBeCloseTo(0.025, 12);
    expect(tick.products).toEqual([{ ratio: 0.00005, stats: ["AP", "targetMaxHP"] }]);
    const gwen = context("Gwen").ability("Snip Snip!").formula("Center Damage per Snip");
    expect(gwen.base).toBe(26);
    expect(gwen.ratios?.AP).toBeCloseTo(0.05, 12);
    expect(gwen.ratios?.targetMaxHP).toBeCloseTo(0.01, 12);
    expect(gwen.products?.[0]?.ratio).toBeCloseTo(0.00006, 12);
  });

  it("reads fields, by label when there are several", () => {
    const riven = context("Riven").ability("Broken Wings");
    expect(() => riven.field("effectRadius")).toThrow(KitDataError);
    expect(riven.field("effectRadius", "Third cast standard radius")).toBe(250);
    expect(riven.cooldown()).toBe(13);
    expect(context("Garen").ability("Decisive Strike").castTime()).toBe(0);
    expect(context("Garen").ability("Demacian Justice").castTime()).toBe(0.435);
  });

  it("reads level-based numbers in descriptions at level 20, from the game files past 18", () => {
    const darius = context("Darius");
    expect(darius.ability("Hemorrhage").levelValue("For each stack, the target is dealt")).toBe(32);
    expect(darius.ability("Hemorrhage").levelValue("Darius gains 30 – 230 (based on level) bonus attack damage")).toBe(280);
  });

  it("reads numbers from quoted words, and fails when the words are gone", () => {
    const q = context("Garen").ability("Decisive Strike");
    expect(q.quoted("gains 35% bonus movement speed")).toBe(35);
    expect(q.quoted("silence them for 1.5 seconds")).toBe(1.5);
    expect(() => q.quote("gains 40% bonus movement speed")).toThrow(/no longer says/);
    expect(() => q.number("Bonus Physical Damage")).toThrow(/scales with stats/);
    expect(() => q.number("Nonexistent")).toThrow(/Movement Speed Duration, Bonus Physical Damage/);
  });

  it("records evidence and assumptions", () => {
    const kit = context("Camille");
    kit.ability("Precision Protocol").levelValue("If Precision Protocol is recast after 1.5 seconds");
    expect(kit.assumptions[0]).toMatch(/no value past level 16/);
    expect(kit.evidence.at(-1)?.page).toBe("Template:Data Camille/Precision Protocol");
  });

  it("tells apart records that share a name by their template page", () => {
    const kayn = context("Kayn");
    expect(() => kayn.ability("The Darkin Scythe")).toThrow(/ambiguous/);
    expect(() => kayn.ability("I")).toThrow(/ambiguous/);
    expect(kayn.ability("Template:Data Kayn/The Darkin Scythe").record.page.revid).toBe(4053172);
    expect(kayn.ability("Template:Data Rhaast/The Darkin Scythe").record.page.revid).toBe(3249284);
    expect(() => kayn.ability("Template:Data Kayn/No Such Page")).toThrow(/no such ability/);
  });

  it("finds every number in a phrase", () => {
    expect(numbersIn("deals 1,050 damage over 2.5 seconds, -50 units")).toEqual([1050, 2.5, -50]);
  });
});
