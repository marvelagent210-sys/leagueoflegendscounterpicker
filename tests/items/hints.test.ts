/**
 * Item hints (ItemBudget, items/equip.ts): what the build search's quick estimate counts of item
 * hooks and actives. Their shared arithmetic over the stat budget's ten-second reference fight,
 * how the estimate applies them, and the hints of items that deal their own damage against what
 * those items deal in ten-second fights (PLAN.md §13).
 */
import { describe, expect, it } from "vitest";
import { type StatPrices, allocateBoth, budgetDamage, budgetPool } from "../../engine/budget";
import { derive } from "../../engine/sim/derived";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks } from "../../engine/sim/spec";
import { type EquipOptions, composeHooks, equipItems, itemParts, matchupSpecs } from "../../items/equip";
import { estimatePair, estimateSide } from "../../items/estimate";
import { FIGHT, absorbed, averageStacks, overMissingHealth, spellbladeProcs, triggers } from "../../items/hints";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { equipOptions, findItem, loadItemCatalog } from "../../pipeline/itemData";
import { loadSimData } from "../../pipeline/simData";
import { kit } from "../kits/helpers";
import { castWhenReady, idle } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "items.json");
const catalog = await loadItemCatalog(dataset);
const equip = equipOptions(catalog);
const { prices } = (await loadSimData(dataset)) as { prices: StatPrices };
const parts = (spec: FighterSpec, ...names: string[]) => names.map((name) => itemParts(spec, findItem(catalog, name), equip));
const total = (mix: { physical: number; magic: number; true: number }) => mix.physical + mix.magic + mix.true;

describe("the reference fight's arithmetic", () => {
  it("counts what triggers before the fight ends: a ten-second cooldown once, a four-second one three times", () => {
    expect(FIGHT).toBe(10);
    expect(triggers(10) * FIGHT).toBeCloseTo(1, 12);
    expect(triggers(4) * FIGHT).toBeCloseTo(3, 12);
    expect(triggers(30, 2) * FIGHT).toBeCloseTo(1, 12);
    // Every two seconds, from the second second: at 2, 4, 6 and 8.
    expect(triggers(0, 2) * FIGHT).toBeCloseTo(4, 12);
    expect(triggers(5, 12)).toBe(0);
  });

  it("averages stacks gained from none, and a share that grows with missing health", () => {
    // Full after 5 seconds: 2.5 on average over them, then 5.
    expect(averageStacks(5, 1)).toBeCloseTo((2.5 * 5 + 5 * 5) / 10, 12);
    expect(averageStacks(10, 0.5)).toBeCloseTo(2.5, 12);
    expect(overMissingHealth(1)).toBeCloseTo(0.5, 12);
    expect(overMissingHealth(0.5)).toBeCloseTo(0.75, 12);
  });

  it("a shield absorbs what arrives while it lasts, and a decaying one what arrives before it runs out", () => {
    expect(absorbed(300, 3, 200, false)).toBe(300);
    expect(absorbed(300, 3, 50, false)).toBe(150);
    // 300 decaying over 3 seconds against 100 a second: gone after 1.5 seconds, having absorbed 150.
    expect(absorbed(300, 3, 100, true)).toBeCloseTo(150, 12);
  });

  it("Spellblade procs after casts, at most once per cooldown, and needs attacks", () => {
    const caster = (cooldown: number, attackSpeed = 1) =>
      createWorld({ fighters: [fighter({ abilities: [ability({ key: "Q", cooldown, delivery: { kind: "self" } })], base: { attackSpeed: { base: attackSpeed, ratio: attackSpeed, bonus: 0 } } }), fighter()], distance: 0, modes: ["idle", "idle"] }).units[0];
    // A 4-second cooldown is cast 3 times in the fight: 0.3 casts a second, all of them proc.
    expect(spellbladeProcs(caster(4), 1.5)).toBeCloseTo(0.3, 12);
    // Casts every half second: a proc half a second after one, then the 1.5-second cooldown: every fourth cast.
    expect(spellbladeProcs(caster(0.5), 1.5)).toBeCloseTo(1 / 2, 12);
    expect(spellbladeProcs({ ...caster(4), spec: { ...caster(4).spec, budget: { attacks: false } } }, 1.5)).toBe(0);
  });
});

describe("the estimate with item hints", () => {
  const ahri = kit("Ahri").spec;
  const darius = kit("Darius").spec;
  const garen = kit("Garen").spec;

  it("Rabadon's Deathcap adds its share of all the holder's AP", () => {
    const { self } = estimatePair(ahri, parts(ahri, "Rabadon's Deathcap", "Luden's Echo"), estimateSide(garen, [], 1));
    const { self: without } = estimatePair(ahri, parts(ahri, "Luden's Echo").concat({ ...parts(ahri, "Rabadon's Deathcap")[0]!, budget: undefined }), estimateSide(garen, [], 1));
    expect(derive(self).ap).toBeCloseTo(1.3 * derive(without).ap, 9);
  });

  it("Black Cleaver's Carve and Frozen Heart's cripple go on the enemy", () => {
    const { foe } = estimatePair(darius, parts(darius, "Black Cleaver"), estimateSide(garen, [], 1));
    const reduction = derive(foe).armorReduction.percent;
    expect(reduction).toHaveLength(1);
    expect(reduction[0]).toBeGreaterThan(0.2);
    expect(reduction[0]).toBeLessThanOrEqual(0.3);
    const plain = estimatePair(garen, [], estimateSide(darius, [], 1));
    const frozen = estimatePair(garen, parts(garen, "Frozen Heart"), estimateSide(darius, [], 1));
    expect(derive(frozen.foe).attackSpeed).toBeLessThan(derive(plain.foe).attackSpeed);
  });

  it("the order of a build doesn't change its estimate", () => {
    const build = parts(darius, "Terminus", "Yun Tal Wildarrows", "Guinsoo's Rageblade", "Overlord's Bloodmail", "Navori Flickerblade", "Black Cleaver");
    const side = estimateSide(garen, parts(garen, "Sunfire Aegis", "Thornmail"), 1);
    expect(estimatePair(darius, [...build].reverse(), side).value).toBeCloseTo(estimatePair(darius, build, side).value, 12);
  });

  it("life steal heals and Grievous Wounds cut the enemy's heals, which counts against an enemy that heals", () => {
    const healer: FighterSpec = { ...fighter({ id: "healer" }), budget: { healing: () => 100 } };
    const plain = estimatePair(fighter(), [], estimateSide(healer, [], 1));
    // Mortal Reminder's stats without its hint, then with it: Grievous Wounds on the healer, 40% of 1000 health less in its pool.
    const stats = estimatePair(fighter(), [{ ...parts(fighter(), "Mortal Reminder")[0]!, budget: undefined }], estimateSide(healer, [], 1));
    const wounds = estimatePair(fighter(), parts(fighter(), "Mortal Reminder"), estimateSide(healer, [], 1));
    expect(wounds.foe.statuses.some((status) => status.kind === "grievousWounds")).toBe(true);
    expect(budgetPool(stats.foe, stats.self) - budgetPool(wounds.foe, wounds.self)).toBeCloseTo(0.4 * 100 * FIGHT, 6);
    expect(wounds.value - stats.value).toBeCloseTo(Math.log(budgetPool(stats.foe, stats.self)) - Math.log(budgetPool(wounds.foe, wounds.self)), 9);
    expect(stats.value).toBeGreaterThan(plain.value);
    // Life steal on the basic attacks: 15% of their damage after armor, for the ten seconds.
    const thirsty = estimatePair(fighter(), [{ ...parts(fighter(), "Bloodthirster")[0]!, budget: undefined }], estimateSide(fighter(), [], 1));
    const d = derive(thirsty.self);
    expect(d.lifeSteal).toBeCloseTo(0.15, 12);
    expect(budgetPool(thirsty.self, thirsty.foe) - d.maxHp).toBeCloseTo(0.15 * d.ad * d.attackSpeed * 0.5 * FIGHT, 6);
  });

  it("Spirit Visage makes heals larger, not shields", () => {
    const healer: FighterSpec = { ...fighter(), budget: { healing: () => 100, shielding: () => 50 } };
    const plain = estimatePair(healer, parts(healer, "Warmog's Armor"), estimateSide(fighter(), [], 1));
    const visage = estimatePair(healer, parts(healer, "Spirit Visage"), estimateSide(fighter(), [], 1));
    const hp = (unit: typeof plain.self) => derive(unit).maxHp;
    expect(budgetPool(visage.self, visage.foe) - hp(visage.self)).toBeCloseTo((1.25 * 100 + 50) * FIGHT, 6);
    expect(budgetPool(plain.self, plain.foe) - hp(plain.self)).toBeCloseTo((100 + 50) * FIGHT, 6);
  });
});

describe("crowd control from a cast triggers items on the next tick", () => {
  const slowing = fighter({ abilities: [ability({ key: "Q", cooldown: 5, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "slow", duration: 2, strength: 0.3 }] })] });
  const after = (spec: FighterSpec, ticks: number) => {
    const world = createWorld({ fighters: [spec, fighter({ base: { hp: 1e6 } })], distance: 100, modes: ["fight", "idle"] });
    for (let i = 0; i < ticks; i++) step(world, [castWhenReady("Q"), idle]);
    return world.units[0];
  };

  it("Bandlepipes: Fanfare's attack speed after a slow", () => {
    const holder = after(equipItems(slowing, [findItem(catalog, "Bandlepipes")], equip).spec, 3);
    expect(holder.statuses.some((status) => status.kind === "stat" && status.key === "attackSpeed" && status.memoKey?.includes("Bandlepipes"))).toBe(true);
  });

  it("Fimbulwinter: Everlasting's shield after a melee champion's slow", () => {
    const mage: FighterSpec = { ...slowing, resourceType: "Mana", base: { ...slowing.base, resource: 1000 } };
    const holder = after(equipItems(mage, [findItem(catalog, "Fimbulwinter")], equip).spec, 3);
    expect(holder.statuses.some((status) => status.kind === "shield" && status.memoKey?.includes("Fimbulwinter"))).toBe(true);
  });
});

/**
 * The reference fight: the holder, with the stat budget's 12,000 gold of plain stats, holds the
 * item and fights an idle enemy, with its plain stats, for ten seconds; the enemy comes back to
 * full health instead of dying, so that missing health runs from none to all over and over.
 * Averaged over three starting distances.
 */
function itemDamageInFights(holder: FighterSpec, enemy: FighterSpec, item: string, options: EquipOptions): number {
  const revive: KitHooks = { onLethal(ctx) { ctx.self.hp = derive(ctx.self).maxHp; return true; } };
  const mine = equipItems(holder, [findItem(catalog, item)], options);
  const labels = new Set([item, `${item} (item)`, ...mine.spec.abilities.filter((a) => a.key === `item:${item}`).map((a) => a.name)]);
  const distances = [0, 150, 300];
  let dealt = 0;
  for (const distance of distances) {
    const [you, them] = matchupSpecs(mine, equipItems(enemy, [], options));
    const world = createWorld({ fighters: [you, { ...them, hooks: composeHooks(them.hooks, [revive], [], false)! }], distance, modes: ["fight", "idle"], settings: { maxSeconds: FIGHT, maxBranches: 1, log: true } });
    for (const entry of runWorld(world, [undefined, idle]).timeline) {
      const hit = entry.side === 0 ? /^(.*?) deals (\d+)/.exec(entry.text) : null;
      if (hit && labels.has(hit[1]!)) dealt += Number(hit[2]);
    }
  }
  return dealt / FIGHT / distances.length;
}

describe("item hints against their items' damage in fights", () => {
  const darius = kit("Darius").spec;
  const garen = kit("Garen").spec;
  const [a, b] = allocateBoth(darius, garen, 12000, prices, 2);
  const holder = { ...darius, bonus: a.bonus };
  const enemy = { ...garen, bonus: b.bonus };
  const side = estimateSide(enemy, [], 1);

  // Items whose hooks and actives deal damage of their own, labeled with their names. Left out:
  // Zeke's Convergence, whose storm follows an ultimate Darius casts late, as an execute, so that
  // the fight's end cuts it short (35% less than the hint); and the attack resets of Hextech
  // Rocketbelt and Titanic Hydra, whose extra attack is labeled as an attack.
  it.each(["Trinity Force", "Essence Reaver", "Lich Bane", "Dusk and Dawn", "Eclipse", "Kraken Slayer", "Hullbreaker", "Bastionbreaker", "Luden's Echo", "Blackfire Torch", "Malignance", "Stormsurge", "Sunfire Aegis", "Hollow Radiance", "Heartsteel", "Unending Despair", "Dead Man's Plate", "Hextech Gunblade", "Stridebreaker", "Redemption"])(
    "%s: the hint's damage per second is within 25% of the item's in the fights",
    (item) => {
      const [held] = parts(holder, item);
      const hinted = estimatePair(holder, [held!], side);
      const plain = estimatePair(holder, [{ ...held!, budget: undefined, haste: [] }], side);
      const hint = total(budgetDamage(hinted.self, hinted.foe)) - total(budgetDamage(plain.self, plain.foe));
      const fought = itemDamageInFights(holder, enemy, item, equip);
      expect(fought).toBeGreaterThan(0);
      expect(hint / fought).toBeGreaterThan(0.8);
      expect(hint / fought).toBeLessThan(1.25);
    },
  );
});
