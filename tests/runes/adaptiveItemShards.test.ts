import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import { abilityHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { equipBuild, loadItemCatalog, type BuildOptions } from "../../pipeline/itemData";
import { reviewAdaptiveItemBuild } from "../../pipeline/runes/itemEligibility";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import { equipShards } from "../../runes/shards";
import { championData, kit } from "../kits/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadShardRules("16.21", catalog);
const items = await loadItemCatalog("16.21");

function arena(spec: FighterSpec): World {
  return createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
}

async function equipped(
  spec: FighterSpec,
  names: string[],
  adaptiveType: "Physical" | "Magic" = "Physical",
  build: BuildOptions = {},
): Promise<FighterSpec> {
  const eligibility = await reviewAdaptiveItemBuild(items, names, { stacked: build.stacked });
  const sharded = equipShards(spec, [5008, 5008, 5011], catalog, rules, {
    adaptiveType, withItems: true, adaptiveItemEligibility: eligibility,
  });
  return equipBuild(sharded.spec, names, items, build).spec;
}

const manaUser = () => ({ ...fighter({ base: { resource: 10000 } }), resourceType: "Mana" });
const runeType = (world: World) => world.units[0].memory["rune-shards:adaptive-type"];
const spell = (world: World, key: string) => world.units[0].spec.abilities.find((ability) => ability.key === key)!;
const hitW = (world: World) => {
  const ability = spell(world, "W");
  abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? []);
};

describe("adaptive shards on reviewed fixed item builds", () => {
  it("compares raw item AD and AP before either adaptive shard is added", async () => {
    // 75 raw AD loses to 80 AP. Converting AD into adaptive-force units first
    // would choose incorrectly.
    const world = arena(await equipped(fighter(), ["Infinity Edge", "Nashor's Tooth"]));
    expect(runeType(world)).toBe("Magic");
    expect(world.units[0].spec.bonus).toMatchObject({ ad: 75, ap: 98 });
    expect(world.units[0].memory["rune-shards:ad"]).toBe(0);
    expect(world.units[0].memory["rune-shards:ap"]).toBe(18);
  });

  it.each(["Physical", "Magic"] as const)("uses the %s champion preference for an equal 30 AD / 30 AP item pool", async (type) => {
    const world = arena(await equipped(fighter(), ["Guinsoo's Rageblade"], type));
    expect(runeType(world)).toBe(type);
    expect(world.units[0].spec.bonus?.ad).toBeCloseTo(type === "Physical" ? 40.8 : 30, 10);
    expect(world.units[0].spec.bonus?.ap).toBe(type === "Magic" ? 48 : 30);
  });

  it.each(["Physical", "Magic"] as const)("keeps an empty fixed build's %s fallback without inventing item stats", async (type) => {
    const world = arena(await equipped(fighter(), [], type));
    expect(runeType(world)).toBe(type);
    expect(derive(world.units[0]).bonusAd).toBeCloseTo(type === "Physical" ? 10.8 : 0, 10);
    expect(derive(world.units[0]).ap).toBe(type === "Magic" ? 18 : 0);
  });

  it("counts Sterak's fixed Claws AD when the shop stats alone would prefer AP", async () => {
    const world = arena(await equipped(fighter(), ["Sterak's Gage", "Guinsoo's Rageblade"], "Magic"));
    expect(runeType(world)).toBe("Physical");
    // 100 base AD grants 50 Claws AD, in addition to Rageblade's 30.
    expect(world.units[0].spec.bonus?.ad).toBeCloseTo(80 + 10.8, 10);
    expect(world.units[0].spec.bonus?.ap).toBe(30);
  });

  it.each([0, 12])("rejects Mejai's dynamic Glory even with %s pre-fight stacks", async (stacks) => {
    // Zero starting stacks can still gain AP after killing a protected-death
    // opponent; nonzero stacks can also lose AP while launched packets remain.
    await expect(equipped(fighter(), ["Mejai's Soulstealer", "Infinity Edge"], "Physical", {
      options: { "Mejai's Soulstealer": { stacks } },
    })).rejects.toThrow(/Mejai.*not supported/);
  });

  it.each([[9, "Physical", 72], [10, "Magic", 75]] as const)
  ("counts Rod of Ages' Timeless at %s minutes and selects %s", async (minutes, expected, itemAp) => {
    const world = arena(await equipped(fighter(), ["Rod of Ages", "Infinity Edge"], "Magic", {
      options: { "Rod of Ages": { minutes } },
    }));
    expect(runeType(world)).toBe(expected);
    expect(world.units[0].spec.bonus?.ap).toBe(itemAp + (expected === "Magic" ? 18 : 0));
  });

  it("counts Dawncore's First Light from the whole fixed build's mana regeneration", async () => {
    // The shop pool ties at 75 AD / 75 AP. First Light adds 30 AP from
    // Dawncore's and Redemption's combined 200% base mana regeneration.
    const world = arena(await equipped(manaUser(), ["Dawncore", "Redemption", "Infinity Edge"]));
    expect(runeType(world)).toBe("Magic");
    expect(world.units[0].spec.bonus?.ap).toBe(45 + 30 + 30 + 18);
    expect(world.units[0].spec.bonus?.ad).toBe(75);
  });

  it.each([false, true])("excludes Manamune/Muramana Awe AD while retaining its shop AD (stacked=%s)", async (stacked) => {
    const world = arena(await equipped(manaUser(), ["Manamune", "Nashor's Tooth"], "Physical", { stacked }));
    expect(runeType(world)).toBe("Magic");
    expect(world.units[0].spec.bonus).toMatchObject({ ad: 35, ap: 98 });
    expect(derive(world.units[0]).bonusAd).toBeGreaterThan(derive(world.units[0]).ap);
  });

  it.each([false, true])("excludes Archangel/Seraph Awe AP while retaining its shop AP (stacked=%s)", async (stacked) => {
    const world = arena(await equipped(manaUser(), ["Archangel's Staff", "Infinity Edge"], "Magic", { stacked }));
    expect(runeType(world)).toBe("Physical");
    expect(world.units[0].spec.bonus?.ad).toBeCloseTo(75 + 10.8, 10);
    expect(world.units[0].spec.bonus?.ap).toBe(70);
    expect(derive(world.units[0]).ap).toBeGreaterThan(75);
  });

  it("excludes Riftmaker's Void Infusion even when rune health makes its derived AP exceed the eligible AD", async () => {
    const world = arena(await equipped(fighter(), ["Riftmaker", "Infinity Edge"], "Magic"));
    expect(runeType(world)).toBe("Physical");
    expect(world.units[0].spec.bonus?.ap).toBe(70);
    expect(derive(world.units[0]).ap).toBeCloseTo(70 + 0.02 * (350 + 65), 10);
    expect(derive(world.units[0]).ap).toBeGreaterThan(75);
  });

  it("keeps Ornn's champion health amplification out of an excluded Riftmaker comparison", async () => {
    const world = arena(await equipped(kit("Ornn").spec, ["Riftmaker", "Infinity Edge"], "Magic"));
    expect(runeType(world)).toBe("Physical");
    expect(derive(world.units[0]).ap).toBeCloseTo(70 + 0.02 * (350 + 65) * 1.3, 10);
    expect(world.units[0].memory["rune-shards:ad"]).toBeCloseTo(10.8, 10);
  });

  it("excludes Jhin's passive conversion AD while applying the adaptive AP to his actual combat stats", async () => {
    const world = arena(await equipped(kit("Jhin").spec, ["Infinity Edge", "Nashor's Tooth"], "Physical"));
    expect(runeType(world)).toBe("Magic");
    expect(world.units[0].spec.bonus).toMatchObject({ ad: 75, ap: 98 });
    expect(derive(world.units[0]).bonusAd).toBeGreaterThan(derive(world.units[0]).ap);
  });

  it("does not evolve Kai'Sa Q from adaptive rune stats on a fixed item build", async () => {
    const world = arena(await equipped(kit("Kaisa").spec, ["Kraken Slayer"], championData("Kaisa").adaptiveType));
    // 45 item AD + 51.129 growth AD does not reach 100; 10.8 rune AD must
    // improve damage without supplying the missing permanent evolution stats.
    expect(runeType(world)).toBe("Physical");
    expect(world.units[0].spec.bonus?.ad).toBeCloseTo(55.8, 10);
    startCast(world, world.units[0], spell(world, "Q"));
    expect(world.missiles).toHaveLength(6);
  });

  it.each([
    [["Void Staff"], 95, 2],
    [["Lich Bane"], 100, 3],
  ] as const)("Kai'Sa W retains %s item stats' %s AP eligibility and %s Plasma stacks", async (names, ap, stacks) => {
    const world = arena(await equipped(kit("Kaisa").spec, [...names], championData("Kaisa").adaptiveType));
    expect(runeType(world)).toBe("Magic");
    expect(derive(world.units[0]).ap).toBe(ap + 18);
    hitW(world);
    expect(world.units[1].statuses.find((status) => status.key === "kaisa:plasma")?.value).toBe(stacks);
  });

  it("retains the reviewed static pool and rune origins through an ordinary form change", async () => {
    const input = kit("Gnar").spec;
    const sourceBonus = input.bonus;
    const spec = await equipped(input, ["Nashor's Tooth"], "Physical");
    const world = arena(spec), unit = world.units[0];
    const otherForm = Object.keys(unit.spec.forms!).find((form) => form !== unit.spec.form)!;
    expect(runeType(world)).toBe("Magic");
    setForm(world, unit, otherForm);
    expect(unit.spec.bonus?.ap).toBe(98);
    expect(unit.memory["rune-shards:ap"]).toBe(18);
    expect(unit.memory["rune-shards:adaptive-type"]).toBe("Magic");
    expect(input.bonus).toBe(sourceBonus);
    expect(spec.bonus?.ap).toBe(80);
  });

  it("rejects Sterak on changing-base-AD forms until adaptive eligibility follows those changes", async () => {
    const review = await reviewAdaptiveItemBuild(items, ["Sterak's Gage"]);
    expect(() => equipShards(kit("Gnar").spec, [5008, 5008, 5011], catalog, rules, {
      adaptiveType: "Physical", withItems: true, adaptiveItemEligibility: review,
    })).toThrow(/Sterak.*different base AD.*dynamic form-aware/);
  });
});
