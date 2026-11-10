import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocateBoth } from "../../engine/budget";
import { applyCC, beginDeathDefied, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { createWorld } from "../../engine/sim/simulate";
import { cloneWorld } from "../../engine/sim/state";
import type { FighterSpec, HookContext } from "../../engine/sim/spec";
import { equipBuild, loadItemCatalog } from "../../pipeline/itemData";
import type { RuneCatalog } from "../../runes/catalog";
import type { ShardRules } from "../../runes/shardRules";
import { equipShards, validateShardSelection } from "../../runes/shards";
import { championData, kit } from "../kits/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules: ShardRules = {
  adaptiveForce: 9, adaptiveAdRatio: 0.6, attackSpeed: 0.1, abilityHaste: 8,
  moveSpeed: 0.025, healthPerLevel: 10, health: 65, tenacity: 0.15, slowResist: 0.15,
  evidence: [{ title: "Synthetic shard-rule fixture", revid: 1, text: "Synthetic numeric rules isolate equipment behavior." }],
};
const itemCatalog = await loadItemCatalog("16.21");
const world = (spec: FighterSpec, enemy = fighter()) => createWorld({ fighters: [spec, enemy], distance: 300, modes: ["idle", "idle"] });
const equip = (spec = fighter(), picks = [5005, 5001, 5001], adaptiveType: "Physical" | "Magic" = "Physical", withItems = false) =>
  equipShards(spec, picks, catalog, rules, { adaptiveType, withItems });

describe("source-defined shard selections", () => {
  it("accepts all 27 legal combinations, including the repeated scaling-health shard", () => {
    for (const offense of catalog.shardSlots[0]!) for (const flex of catalog.shardSlots[1]!) for (const defense of catalog.shardSlots[2]!) {
      const picks = [offense, flex, defense];
      expect(validateShardSelection(catalog, picks)).toEqual(picks);
    }
    const input = [5005, 5001, 5001];
    const result = validateShardSelection(catalog, input);
    result[0] = 5008;
    expect(input).toEqual([5005, 5001, 5001]);
  });

  it.each([null, undefined, "5005,5001,5001", [], [5005, 5001], [5005, 5001, 5001, 5011], ["5005", 5001, 5001],
    [NaN, 5001, 5001], [Infinity, 5001, 5001], [5005.1, 5001, 5001], Object.assign(new Array(3), { 0: 5005, 2: 5001 })])
  ("rejects malformed shard choices: %s", (value) => expect(() => validateShardSelection(catalog, value)).toThrow(/exactly three/));

  it.each([[5011, 5001, 5001], [5005, 5013, 5001], [5005, 5001, 5008], [9999, 5001, 5001]])
  ("rejects a shard in the wrong row: %s", (...value) => expect(() => validateShardSelection(catalog, value)).toThrow(/cannot select/));

  it("does not silently ignore a future catalog shard without an implementation", () => {
    const next = structuredClone(catalog);
    next.shards.push({ ...next.shards[0]!, id: 5999 });
    next.shardSlots[0]!.push(5999);
    expect(() => validateShardSelection(next, [5999, 5001, 5001])).toThrow(/no combat implementation/);
  });

  it("rejects inconsistent shard catalogs", () => {
    const duplicate = structuredClone(catalog); duplicate.shards.push(duplicate.shards[0]!);
    expect(() => validateShardSelection(duplicate, [5005, 5001, 5001])).toThrow(/unique positive/);
    const missing = structuredClone(catalog); missing.shards = missing.shards.filter((entry) => entry.id !== 5001);
    expect(() => validateShardSelection(missing, [5005, 5001, 5001])).toThrow(/invalid choices/);
    const row = structuredClone(catalog); row.shardSlots[0] = [];
    expect(() => validateShardSelection(row, [5005, 5001, 5001])).toThrow(/invalid choices/);
    expect(() => validateShardSelection(null as unknown as RuneCatalog, [5005, 5001, 5001])).toThrow(/Invalid shard catalog/);
  });
});

describe("ordinary shard stats at fight initialization", () => {
  it("adds 400 health from two scaling shards at level 20 and starts at full health", () => {
    const unit = world(equip().spec).units[0];
    expect(unit.spec.bonus?.hp).toBe(400);
    expect(derive(unit).maxHp).toBe(2400);
    expect(unit.hp).toBe(2400);
    expect(derive(unit).attackSpeed).toBeCloseTo(0.625 * 1.1, 10);
  });

  it("adds 65 flat health, 8 ability haste and 2.5% movement speed", () => {
    const unit = world(equip(fighter(), [5007, 5010, 5011]).spec).units[0];
    expect(unit.spec.bonus).toMatchObject({ hp: 65, abilityHaste: 8 });
    expect(derive(unit).maxHp).toBe(2065);
    expect(derive(unit).abilityHaste).toBe(8);
    expect(derive(unit).moveSpeed).toBeCloseTo(350 * 1.025, 10);
    const status = unit.statuses.find((entry) => entry.memoKey === "rune-shards:moveSpeedPercent")!;
    expect(status.endTick).toBe(Infinity);
    expect(status.persistThroughDeath).toBe(true);
  });

  it("adds to existing purchased stats without changing the supplied spec or allocation", () => {
    const input = fighter({ bonus: { hp: 700, attackSpeed: 0.25, abilityHaste: 11 } });
    const before = structuredClone(input);
    const built = equip(input, [5005, 5001, 5011]);
    expect(built.spec.bonus).toEqual(input.bonus);
    const unit = world(built.spec).units[0];
    expect(unit.spec.bonus).toEqual({ hp: 965, attackSpeed: 0.35, abilityHaste: 11 });
    expect(unit.spec).not.toBe(built.spec);
    expect(unit.spec.bonus).not.toBe(built.spec.bonus);
    expect(input).toEqual(before);
    expect(built.spec.bonus).toEqual(before.bonus);
  });

  it("reads compiled rules instead of embedding shard numeric values", () => {
    const alternative = { ...rules, healthPerLevel: 11, attackSpeed: 0.12 };
    const built = equipShards(fighter(), [5005, 5001, 5001], catalog, alternative, { adaptiveType: "Physical" });
    const unit = world(built.spec).units[0];
    expect(unit.spec.bonus?.hp).toBe(440);
    expect(derive(unit).attackSpeed).toBeCloseTo(0.625 * 1.12, 10);
  });

  it("takes an immutable numeric/evidence snapshot before combat", () => {
    const input = structuredClone(rules), picks = [5005, 5001, 5001];
    const options = { adaptiveType: "Physical" as const };
    const built = equipShards(fighter(), picks, catalog, input, options);
    input.healthPerLevel = 900; input.evidence[0]!.text = "changed"; picks[1] = 5010;
    built.selection[2] = 5011;
    expect(world(built.spec).units[0].spec.bonus?.hp).toBe(400);
    expect(built.evidence[0]!.text).toContain("Synthetic numeric rules");
  });

  it("does not overwrite an innate health or AD start effect", () => {
    const input: FighterSpec = { ...fighter(), start: [
      { type: "stat", stat: "health", amount: { base: 300 }, duration: Infinity },
      { type: "stat", stat: "AD", amount: { base: 40 }, duration: Infinity },
    ] };
    const unit = world(equip(input, [5008, 5001, 5011]).spec).units[0];
    expect(derive(unit).maxHp).toBe(2000 + 300 + 200 + 65);
    expect(derive(unit).ad).toBeCloseTo(100 + 40 + 5.4, 10);
    expect(unit.statuses.find((entry) => entry.memoKey === "effect:health")?.value).toBe(300);
    expect(unit.statuses.find((entry) => entry.memoKey === "effect:AD")?.value).toBe(40);
  });
});

describe("adaptive force uses purchased raw stat inputs", () => {
  it.each([
    ["Physical", 0, 0, 5.4, 0], ["Magic", 0, 0, 0, 9],
    ["Magic", 20, 19, 25.4, 19], ["Physical", 19, 20, 19, 29],
    ["Physical", 10, 10, 15.4, 10], ["Magic", 10, 10, 10, 19],
    ["Physical", 10, 12, 10, 21],
  ] as const)("resolves %s with purchased AD=%s AP=%s", (type, ad, ap, expectedAd, expectedAp) => {
    const unit = world(equip(fighter({ bonus: { ad, ap } }), [5008, 5001, 5011], type).spec).units[0];
    expect(unit.spec.bonus?.ad ?? 0).toBeCloseTo(expectedAd, 10);
    expect(unit.spec.bonus?.ap ?? 0).toBeCloseTo(expectedAp, 10);
  });

  it("adds two adaptive shards together after one shared choice", () => {
    const unit = world(equip(fighter({ bonus: { ad: 2, ap: 3 } }), [5008, 5008, 5011]).spec).units[0];
    expect(unit.spec.bonus).toMatchObject({ ad: 2, ap: 21 });
    expect(unit.memory["rune-shards:adaptive-type"]).toBe("Magic");
  });

  it("excludes passive AD/AP from both start effects and the kit's setup", () => {
    const input: FighterSpec = { ...fighter({ bonus: { ad: 1, ap: 2 }, hooks: {
      onStart(ctx) { ctx.buff("passiveAD", "AD", 1000, Infinity); },
    } }), start: [{ type: "stat", stat: "AD", amount: { base: 500 }, duration: Infinity }] };
    const unit = world(equip(input, [5008, 5001, 5011], "Physical").spec).units[0];
    expect(unit.spec.bonus?.ap).toBe(11);
    expect(unit.spec.bonus?.ad).toBe(1);
    expect(derive(unit).bonusAd).toBe(1501);
  });

  it("fails rather than guessing adaptive eligibility from item builds", () => {
    expect(() => equip(fighter(), [5008, 5001, 5011], "Physical", true)).toThrow(/eligible item-passive stats/);
    expect(() => equip(fighter(), [5007, 5010, 5011], "Magic", true)).not.toThrow();
  });

  it("supports all Kai'Sa shard selections with separate rune stat origins", () => {
    const kaisa = kit("Kaisa").spec;
    const adaptive = world(equip(kaisa, [5008, 5001, 5011]).spec).units[0];
    expect(adaptive.memory["rune-shards:ad"]).toBeCloseTo(5.4, 10);
    expect(adaptive.memory["rune-shards:ap"]).toBe(0);
    const as = world(equip(kaisa, [5005, 5001, 5011]).spec).units[0];
    expect(as.memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(() => equip(kaisa, [5007, 5010, 5013])).not.toThrow();
    expect(() => equip(kaisa, [5007, 5001, 5011])).not.toThrow();
  });

  it("rejects invalid purchased stats when adaptive force needs a choice", () => {
    for (const bad of [NaN, Infinity, -1]) {
      expect(() => world(equip(fighter({ bonus: { ad: bad } }), [5008, 5001, 5011]).spec)).toThrow(/finite, nonnegative/);
    }
  });
});

describe("tenacity, slow resistance and item composition", () => {
  it("shortens eligible crowd control and weakens a slow by separate 15% effects", () => {
    const w = world(equip(fighter(), [5007, 5010, 5013]).spec), unit = w.units[0];
    applyCC(w, w.units[1], unit, "stun", 1);
    expect(unit.statuses.find((entry) => entry.kind === "cc" && entry.key === "stun")!.endTick).toBe(26);
    applyCC(w, w.units[1], unit, "slow", 2, 0.4);
    const slow = unit.statuses.find((entry) => entry.kind === "cc" && entry.key === "slow")!;
    expect(slow.endTick).toBe(51);
    expect(derive(unit).rawMoveSpeed).toBeCloseTo(350 * 1.025 * (1 - 0.4 * 0.85), 10);
    expect(unit.statuses.filter((entry) => entry.memoKey?.startsWith("rune-shards:")).every((entry) => entry.persistThroughDeath)).toBe(true);
  });

  it("does not shorten airborne displacement, suppression or stasis", () => {
    for (const type of ["airborne", "suppression", "stasis"] as const) {
      const w = world(equip(fighter(), [5007, 5010, 5013]).spec);
      applyCC(w, w.units[1], w.units[0], type, 1);
      expect(w.units[0].statuses.find((entry) => entry.kind === "cc" && entry.key === type)!.endTick).toBe(30);
    }
  });

  it("multiplies with Mercury's Treads to 40.5% tenacity", () => {
    const sharded = equip(fighter(), [5007, 5010, 5013], "Physical", true).spec;
    const held = equipBuild(sharded, ["Mercury's Treads"], itemCatalog);
    const unit = world(held.spec).units[0];
    expect(derive(unit).tenacity).toBeCloseTo(0.405, 10);
    expect(unit.statuses.find((entry) => entry.memoKey === "rune-shards:tenacity")?.tenacityGroup).toBeUndefined();
  });

  it("multiplies slow resistance with Boots of Swiftness", () => {
    const sharded = equip(fighter(), [5007, 5010, 5013], "Physical", true).spec;
    const w = world(equipBuild(sharded, ["Boots of Swiftness"], itemCatalog).spec);
    applyCC(w, w.units[1], w.units[0], "slow", 2, 0.4);
    // The pinned 26.21 boots supply 55 flat movement speed and 25% slow resistance.
    expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo((350 + 55) * 1.025 * (1 - 0.4 * (1 - 0.3625)), 8);
  });

  it("retains the existing newer Courage-specific stacking exception", () => {
    const input = fighter({ hooks: { onStart(ctx) {
      ctx.apply({ type: "state", state: "tenacity", value: 0.6, duration: 1, tenacityGroup: "courage-brittle" }, true);
    } } });
    expect(derive(world(equip(input, [5007, 5010, 5013]).spec).units[0]).tenacity).toBeCloseTo(0.66, 10);
  });
});

describe("kit initialization, forms and runtime isolation", () => {
  it("lets the original hook observe shards and retains its receiver and other hooks", () => {
    const hooks = { label: "original", onStart(this: { label: string }, ctx: HookContext) {
      ctx.memory.seen = ctx.self.spec.bonus?.hp ?? 0; ctx.memory.receiver = this.label;
    }, onTick: () => undefined };
    const input = fighter({ hooks });
    const built = equip(input), w = world(built.spec);
    expect(w.units[0].memory.seen).toBe(400);
    expect(w.units[0].memory.receiver).toBe("original");
    expect(built.spec.hooks?.onTick).toBe(hooks.onTick);
    expect(input.hooks).toBe(hooks);
  });

  it("does not apply again if initialization is invoked twice", () => {
    const input = fighter({ hooks: { onStart(ctx) { ctx.memory.starts = Number(ctx.memory.starts ?? 0) + 1; } } });
    const built = equip(input), w = world(built.spec), unit = w.units[0];
    const before = { ...unit.spec.bonus };
    built.spec.hooks!.onStart!(hookContext(w, unit));
    expect(unit.spec.bonus).toEqual(before);
    expect(unit.memory.starts).toBe(1);
  });

  it("rejects equipment applied twice, including after budget and item spec spreads", () => {
    const built = equip().spec;
    expect(() => equip(built)).toThrow(/already been equipped/);
    expect(() => equip({ ...built, bonus: { hp: 100 } })).toThrow(/already been equipped/);
    const held = equipBuild(equip(fighter(), [5007, 5010, 5013], "Physical", true).spec, ["Mercury's Treads"], itemCatalog);
    expect(() => equip(held.spec)).toThrow(/already been equipped/);
  });

  it("initializes independent worlds from one equipped spec without shared mutations", () => {
    const input = fighter({ bonus: { hp: 100 } }), built = equip(input).spec;
    const first = world(built), second = world(built);
    expect(first.units[0].spec.bonus?.hp).toBe(500);
    expect(second.units[0].spec.bonus?.hp).toBe(500);
    expect(first.units[0].spec.bonus).not.toBe(second.units[0].spec.bonus);
    expect(built.bonus?.hp).toBe(100);
    expect(input.bonus?.hp).toBe(100);
  });

  it("rebuilds a cyclic form graph and carries shard stats without applying them again", () => {
    const small: FighterSpec = { ...fighter({ id: "small" }), form: "small" }, big: FighterSpec = { ...fighter({ id: "big", base: { hp: 3000 } }), form: "big" };
    const forms: Record<string, FighterSpec> = { small, big }; small.forms = forms; big.forms = forms;
    const built = equip(small, [5007, 5010, 5011]).spec;
    expect(built.forms).not.toBe(forms);
    expect(built.forms!.small).toBe(built);
    expect(built.forms!.big!.forms).toBe(built.forms);
    const w = world(built), unit = w.units[0];
    setForm(w, unit, "big");
    expect(derive(unit).maxHp).toBe(3065);
    expect(unit.spec.bonus?.abilityHaste).toBe(8);
    setForm(w, unit, "small");
    expect(derive(unit).maxHp).toBe(2065);
    expect(unit.statuses.filter((entry) => entry.memoKey === "rune-shards:moveSpeedPercent")).toHaveLength(1);
    expect(small.bonus).toBeUndefined(); expect(big.bonus).toBeUndefined();
    expect(() => equip(built.forms!.big!)).toThrow(/already been equipped/);
  });

  it("branches with independent memory/statuses and keeps shard statuses through a protected death", () => {
    const w = world(equip(fighter(), [5007, 5010, 5013]).spec), clone = cloneWorld(w);
    const own = clone.units[0].statuses.find((entry) => entry.memoKey === "rune-shards:slowResist")!;
    own.value = 0.5;
    clone.units[0].memory.extra = true;
    expect(w.units[0].statuses.find((entry) => entry.memoKey === own.memoKey)!.value).toBe(0.15);
    expect(w.units[0].memory.extra).toBeUndefined();
    expect(beginDeathDefied(w, w.units[0], { duration: 3 })).toBe(true);
    expect(w.units[0].statuses.filter((entry) => entry.memoKey?.startsWith("rune-shards:"))).toHaveLength(3);
    expect(derive(w.units[0]).tenacity).toBeCloseTo(0.15, 10);
  });

  it("carries rune-origin amounts through form changes, cloned branches and protected death", () => {
    const small: FighterSpec = { ...fighter({ id: "small" }), form: "small" };
    const big: FighterSpec = { ...fighter({ id: "big" }), form: "big" };
    const forms = { small, big }; small.forms = forms; big.forms = forms;
    const w = world(equip(small, [5005, 5008, 5011]).spec), unit = w.units[0];
    setForm(w, unit, "big");
    expect(unit.memory["rune-shards:ad"]).toBeCloseTo(5.4, 10);
    expect(unit.memory["rune-shards:ap"]).toBe(0);
    expect(unit.memory["rune-shards:attackSpeed"]).toBe(0.1);
    const clone = cloneWorld(w);
    clone.units[0].memory["rune-shards:attackSpeed"] = 0;
    expect(unit.memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(beginDeathDefied(w, unit, { duration: 3 })).toBe(true);
    setForm(w, unit, "small");
    expect(unit.memory["rune-shards:ad"]).toBeCloseTo(5.4, 10);
    expect(unit.memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(unit.spec.bonus?.ad).toBeCloseTo(5.4, 10);
    expect(unit.spec.bonus?.attackSpeed).toBe(0.1);
  });

  it("lets Ornn's setup amplify shard health and Jhin convert the attack-speed shard", () => {
    const ornn = kit("Ornn").spec;
    const beforeOrnn = derive(world(ornn).units[0]).maxHp;
    const afterOrnn = derive(world(equip(ornn).spec).units[0]).maxHp;
    expect(afterOrnn - beforeOrnn).toBeCloseTo(400 * 1.3, 8);
    const jhin = kit("Jhin").spec;
    const beforeJhin = derive(world(jhin).units[0]);
    const afterJhin = derive(world(equip(jhin).spec).units[0]);
    expect(afterJhin.attackSpeed).toBe(beforeJhin.attackSpeed);
    expect(afterJhin.ad).toBeGreaterThan(beforeJhin.ad);
  });

  it("keeps no-shard budget allocations unchanged, then applies shards to actual purchased stats", () => {
    const prices = JSON.parse(readFileSync("data/16.21/rules.json", "utf8")).statPrices;
    const input = fighter(), foe = fighter();
    const bare = allocateBoth(input, foe, 1000, prices);
    const built = equip(input, [5008, 5001, 5011]).spec;
    const sharded = allocateBoth(built, foe, 1000, prices);
    expect(sharded).toEqual(bare);
    const unit = world({ ...built, bonus: sharded[0].bonus }).units[0];
    expect(unit.spec.bonus?.hp).toBe((sharded[0].bonus.hp ?? 0) + 265);
    expect(equip(input).assumptions.join(" ")).toContain("no-shard reference allocation");
  });
});

describe("invalid rule and option inputs", () => {
  it.each(["adaptiveForce", "adaptiveAdRatio", "attackSpeed", "abilityHaste", "moveSpeed", "healthPerLevel", "health", "tenacity", "slowResist"] as const)
  ("rejects a non-finite or nonpositive %s rule", (key) => {
    for (const bad of [NaN, Infinity, -1, 0]) expect(() => equipShards(fighter(), [5005, 5001, 5001], catalog, { ...rules, [key]: bad }, { adaptiveType: "Physical" })).toThrow(/Invalid shard rule/);
  });

  it("rejects percentage-point fractions, missing evidence and invalid options", () => {
    expect(() => equipShards(fighter(), [5005, 5001, 5001], catalog, { ...rules, attackSpeed: 10 }, { adaptiveType: "Physical" })).toThrow(/must be a fraction/);
    expect(() => equipShards(fighter(), [5005, 5001, 5001], catalog, { ...rules, evidence: [] }, { adaptiveType: "Physical" })).toThrow(/pinned source evidence/);
    expect(() => equipShards(fighter(), [5005, 5001, 5001], catalog, rules, { adaptiveType: "True" as "Physical" })).toThrow(/valid adaptive type/);
    expect(championData("Darius").adaptiveType).toBe("Physical");
  });
});
