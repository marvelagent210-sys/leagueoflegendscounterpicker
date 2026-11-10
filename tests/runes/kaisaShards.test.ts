import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { equipBuild, loadItemCatalog } from "../../pipeline/itemData";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import { equipShards } from "../../runes/shards";
import { championData, kit } from "../kits/helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadShardRules("16.21", catalog);
const items = await loadItemCatalog("16.21");
const kaisa = kit("Kaisa");
const champion = championData("Kaisa");

function purchased(bonus: BonusStats = {}): FighterSpec {
  return { ...kaisa.spec, bonus: { ...bonus } };
}

function sharded(spec: FighterSpec, picks: number[], withItems = false): FighterSpec {
  return equipShards(spec, picks, catalog, rules, { adaptiveType: champion.adaptiveType, withItems }).spec;
}

function arena(spec: FighterSpec): World {
  const world = createWorld({
    fighters: [
      { ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } },
      fighter({ base: { hp: 100000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } }),
    ],
    distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 10 },
  });
  world.units[0].x = 0;
  world.units[1].x = 300;
  return world;
}

const spell = (world: World, key: string) => world.units[0].spec.abilities.find((ability) => ability.key === key)!;
const cast = (world: World, key: string) => startCast(world, world.units[0], spell(world, key));
function hitW(world: World): void {
  const ability = spell(world, "W");
  abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? []);
}
const plasma = (world: World) => world.units[1].statuses.find((status) => status.key === "kaisa:plasma")?.value ?? 0;
const invisible = (world: World) => world.units[0].statuses.some((status) => status.key === "invisible");
function finishQ(world: World): void {
  while (world.tick <= 43 && !world.result) step(world, [standStill, standStill]);
}

describe("Kai'Sa shard stats and Living Weapon eligibility", () => {
  it("uses the current passive source and all source-defined shard combinations", () => {
    expect(kaisa.evidence).toEqual(expect.arrayContaining([expect.objectContaining({ revid: 4089050 })]));
    for (const offense of catalog.shardSlots[0]!) for (const flex of catalog.shardSlots[1]!) for (const defense of catalog.shardSlots[2]!) {
      expect(() => arena(sharded(purchased(), [offense, flex, defense]))).not.toThrow();
    }
  });

  // At level 20, the pinned growth adds 51.129 AD: 48.871 bought AD is required.
  it.each([[48.86, 6, 2.25], [48.871, 12, 3.75]] as const)
  ("AD %s with two adaptive shards retains %s Q missiles and scales every packet", (ad, missiles, scale) => {
    const world = arena(sharded(purchased({ ad }), [5008, 5008, 5011]));
    expect(derive(world.units[0]).bonusAd).toBeCloseTo(ad + 10.8, 10);
    cast(world, "Q");
    expect(world.missiles).toHaveLength(missiles);
    finishQ(world);
    expect(world.units[1].totals.damageTaken).toBeCloseTo((100 + 0.55 * (ad + 10.8)) * scale, 8);
  });

  it.each([[99, 2, 420], [100, 3, 105]] as const)
  ("AP %s with two adaptive shards retains %s W stacks and its evolution-dependent refund", (ap, count, cooldown) => {
    const world = arena(sharded(purchased({ ap }), [5008, 5008, 5011]));
    const d = derive(world.units[0]);
    expect(d.ap).toBe(ap + 18);
    world.units[0].cooldownReady.W = 420;
    hitW(world);
    expect(plasma(world)).toBe(count);
    expect(world.units[0].cooldownReady.W).toBe(cooldown);
    const flat = 33.0588235294118 + 0.12 * d.ap;
    const perStack = 8.82352941176471 + 0.03 * d.ap;
    expect(world.units[1].totals.damageTaken).toBeCloseTo(130 + 1.3 * d.ad + 0.45 * d.ap
      + count * flat + count * (count - 1) / 2 * perStack, 8);
  });

  // The pinned level-20 AS growth is 35.397%; runes cannot supply the remaining 64.603%.
  it.each([[0.64, false], [0.64603, true]] as const)
  ("bought AS %s retains E evolution=%s while its shard shortens the actual charge", (attackSpeed, evolved) => {
    const bare = arena(purchased({ attackSpeed }));
    const world = arena(sharded(purchased({ attackSpeed }), [5005, 5001, 5011]));
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(derive(bare.units[0]).bonusAttackSpeed + 0.1, 10);
    cast(bare, "E");
    cast(world, "E");
    expect(invisible(world)).toBe(evolved);
    expect(invisible(bare)).toBe(evolved);
    const bareCharge = bare.units[0].action;
    const charge = world.units[0].action;
    expect(bareCharge?.kind).toBe("cast");
    expect(charge?.kind).toBe("cast");
    if (bareCharge?.kind !== "cast" || charge?.kind !== "cast") throw new Error("E did not begin charging");
    expect(charge.endTick).toBe(18);
    // The qualifying boundary already reaches the sourced 0.6-second charge floor.
    expect(charge.endTick).toBeLessThanOrEqual(bareCharge.endTick);
    if (!evolved) expect(charge.endTick).toBeLessThan(bareCharge.endTick);
  });

  it.each([
    [["Berserker's Greaves", "Statikk Shiv"], false],
    [["Berserker's Greaves", "Rapid Firecannon"], true],
  ] as const)("fixed items %s keep E evolution=%s with an attack-speed shard", (names, evolved) => {
    const equipped = equipBuild(sharded(purchased(), [5005, 5001, 5011], true), [...names], items);
    const world = arena(equipped.spec);
    // Both builds cross 100% total bonus AS with the shard; only 65% item AS qualifies.
    expect(derive(world.units[0]).bonusAttackSpeed).toBeGreaterThan(1);
    cast(world, "E");
    expect(invisible(world)).toBe(evolved);
  });

  it.each([false, true])("temporary AD/AP/AS still cannot evolve Q/W/E (shards=%s)", (withShards) => {
    const spec = purchased();
    const world = arena(withShards ? sharded(spec, [5005, 5008, 5011]) : spec);
    for (const [stat, amount] of [["AD", 1000], ["AP", 1000], ["attackSpeed", 1]] as const) {
      applyEffect(world, world.units[0], world.units[0], { type: "stat", stat, amount: { base: amount }, duration: 10 }, { scale: 1 });
    }
    expect(derive(world.units[0]).bonusAd).toBeGreaterThanOrEqual(1000);
    expect(derive(world.units[0]).ap).toBeGreaterThanOrEqual(1000);
    cast(world, "Q");
    expect(world.missiles).toHaveLength(6);
    world.units[0].cooldownReady.W = 420;
    hitW(world);
    expect(plasma(world)).toBe(2);
    expect(world.units[0].cooldownReady.W).toBe(420);
    cast(world, "E");
    expect(invisible(world)).toBe(false);
  });

  it("retains origin accounting in branches without sharing source or world mutations", () => {
    const source = purchased({ ad: 48.86 });
    const equipped = sharded(source, [5008, 5008, 5011]);
    const first = arena(equipped), second = arena(equipped), branch = cloneWorld(first);
    branch.units[0].spec = {
      ...branch.units[0].spec,
      bonus: { ...branch.units[0].spec.bonus, ad: branch.units[0].spec.bonus!.ad! + 1 },
    };
    branch.units[0].memory.extra = true;
    expect(first.units[0].memory.extra).toBeUndefined();
    for (const world of [first, second, branch]) cast(world, "Q");
    expect(first.missiles).toHaveLength(6);
    expect(second.missiles).toHaveLength(6);
    expect(branch.missiles).toHaveLength(12);
    expect(source.bonus).toEqual({ ad: 48.86 });
    expect(equipped.bonus).toEqual({ ad: 48.86 });
    expect(first.units[0].spec.bonus).not.toBe(second.units[0].spec.bonus);
    expect(kaisa.spec.bonus?.ad ?? 0).toBe(0);
  });
});
