/**
 * Kits calibrated to their own fights for the build search's quick estimate
 * (pipeline/items/calibrate.ts): the shares a fight gives, and how the estimate's terms scale by
 * them. The stat budget never calibrates, so its results don't change.
 */
import { describe, expect, it } from "vitest";
import { type StatPrices, budgetCasts, budgetDamage, budgetDamageParts, budgetUnit } from "../../engine/budget";
import type { FighterSpec } from "../../engine/sim/spec";
import { itemParts } from "../../items/equip";
import { estimateUnit } from "../../items/estimate";
import { attacks } from "../../items/hints";
import { equipOptions, findItem, loadItemCatalog } from "../../pipeline/itemData";
import { fighter } from "../sim/kits";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { calibrate, calibrated } from "../../pipeline/items/calibrate";
import { loadSimData } from "../../pipeline/simData";
import { kit } from "../kits/helpers";

const dataset = await latestDataset(DATA_DIR, "items.json");
const { prices } = (await loadSimData(dataset)) as { prices: StatPrices };
const ahri = kit("Ahri").spec;
const malphite = kit("Malphite").spec;
const darius = kit("Darius").spec;
const garen = kit("Garen").spec;

describe("a kit's calibration fight", () => {
  it("gives the fight's shares of the reference's damage, attacks and casts, within a quarter and four times", () => {
    const shares = calibrate(ahri, malphite, prices);
    for (const share of [shares.damage, shares.attacks, shares.casts]) {
      expect(share).toBeGreaterThanOrEqual(0.25);
      expect(share).toBeLessThanOrEqual(4);
    }
    // Ahri casts about half as often as each ability once per cooldown: her ultimate's three dashes don't all go out.
    expect(shares.casts).toBeLessThan(0.8);
    expect(shares.fought.casts).toBeGreaterThan(0);
    expect(shares.casts).toBeCloseTo(shares.fought.casts / shares.reference.casts, 12);
    // Darius's fights deal more than the reference counts: his empowered attacks and Hemorrhage.
    expect(calibrate(darius, garen, prices).damage).toBeGreaterThan(1.2);
  });

  it("is the same every time: fights are deterministic", () => {
    expect(calibrate(darius, garen, prices)).toEqual(calibrate(darius, garen, prices));
  });
});

describe("a calibrated kit in the estimate", () => {
  const shares = { damage: 1.5, attacks: 0.8, casts: 0.5 };
  const unit = (spec: FighterSpec, side: 0 | 1) => budgetUnit({ ...spec, bonus: { ad: 100, ap: 100, attackSpeed: 0.5 } }, side);

  it("scales the kit's damage, its casts and its attacks by its shares", () => {
    const plain = unit(darius, 0);
    const scaled = unit(calibrated(darius, shares), 0);
    const foe = unit(garen, 1);
    const before = budgetDamageParts(plain, foe);
    const after = budgetDamageParts(scaled, foe);
    expect(after.attacks).toBeCloseTo(before.attacks * 1.5, 9);
    expect(after.abilities).toBeCloseTo(before.abilities * 1.5, 9);
    expect(budgetCasts(scaled).casts).toBeCloseTo(budgetCasts(plain).casts * 0.5, 9);
    expect(attacks(scaled)).toBeCloseTo(attacks(plain) * 0.8, 12);
  });
});

describe("a calibrated kit's own damage hint", () => {
  it("takes its share with items and without: an empty build is valued as builds are", async () => {
    const catalog = await loadItemCatalog(dataset);
    const passive: FighterSpec = { ...fighter(), budget: { attacks: false, damage: () => ({ true: 100 }) } };
    const spec = calibrated(passive, { damage: 0.5, attacks: 1, casts: 1 });
    const foe = budgetUnit(fighter(), 1);
    // A hundred true damage a second from its hooks, half of it in its fights, with or without items.
    expect(budgetDamage(estimateUnit(spec, [], 0), foe).true).toBeCloseTo(50, 9);
    const held = itemParts(spec, findItem(catalog, "Rabadon's Deathcap"), equipOptions(catalog));
    expect(budgetDamage(estimateUnit(spec, [held], 0), foe).true).toBeCloseTo(50, 9);
  });
});
