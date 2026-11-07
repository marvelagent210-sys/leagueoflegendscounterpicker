import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocateBoth, damagePerSecond, type StatPrices } from "../../engine/budget";
import { attackTiming, startAttack, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { channelPulseCount } from "../../engine/sim/channelPulses";
import { derive } from "../../engine/sim/derived";
import { runScenarios } from "../../engine/sim/scenarios";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type Status, type World } from "../../engine/sim/state";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects } from "../../runes/effects";
import { equipShards } from "../../runes/shards";
import { championData, kit } from "../kits/helpers";
import { idle, lasting, ticksOf } from "../sim/helpers";
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const shardRules = await loadShardRules("16.21", catalog);
const prices = JSON.parse(readFileSync("data/16.21/rules.json", "utf8")).statPrices as StatPrices;
const garen = kit("Garen").spec, kaisa = kit("Kaisa").spec, jhin = kit("Jhin").spec;
const ALC_AS = "rune-effects:attackSpeed:9104";

const purchased = (spec: FighterSpec, bonus: BonusStats = {}): FighterSpec => ({ ...spec, bonus: { ...bonus } });
const alacrity = (spec: FighterSpec, legendPoints = 1000): FighterSpec =>
  equipRuneEffects(spec, [9104], catalog, rules, { legendPoints }).spec;
const asShard = (spec: FighterSpec, champion: string): FighterSpec =>
  equipShards(spec, [5005, 5001, 5011], catalog, shardRules, { adaptiveType: championData(champion).adaptiveType }).spec;

function arena(spec: FighterSpec): World {
  return createWorld({
    fighters: [
      { ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } },
      fighter({ base: { hp: 100000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } }),
    ],
    distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true },
  });
}
const spell = (world: World, key: string) => world.units[0].spec.abilities.find(ability => ability.key === key)!;
const spins = (world: World) => channelPulseCount(spell(world, "E").channel!, world.units[0]);
function castJudgment(world: World): number {
  startCast(world, world.units[0], spell(world, "E"));
  const action = world.units[0].action;
  if (action?.kind !== "channel" || action.pulseCount === undefined) throw new Error("Judgment did not start a counted channel");
  return action.pulseCount;
}
function through(world: World, tick: number): void {
  while (world.tick <= tick && !world.result) step(world, [idle, idle]);
}
const taggedAs = (value: number, extra: Partial<Status> = {}): Status => lasting("stat", "attackSpeed", value, {
  source: 0, memoKey: "rune-effects:attackSpeed:conditional-fixture", ability: "Rune dependency", ...extra,
});

describe("Legend: Alacrity and Garen's spin eligibility", () => {
  it.each([[0, 9], [0.0322275, 10], [0.2822275, 11]] as const)
  ("purchased AS %s keeps %s spins despite Alacrity increasing actual attack speed", (attackSpeed, count) => {
    const source = purchased(garen, { attackSpeed }), bare = arena(source), selected = arena(alacrity(source));
    expect(derive(selected.units[0]).bonusAttackSpeed).toBeCloseTo(derive(bare.units[0]).bonusAttackSpeed + 0.18, 10);
    expect(attackTiming(selected.units[0]).total).toBeLessThan(attackTiming(bare.units[0]).total);
    expect(castJudgment(bare)).toBe(count);
    expect(castJudgment(selected)).toBe(count);
  });

  it("excludes both the direct shard and status rune origin from actual Judgment hits", () => {
    const source = purchased(garen), bare = arena(source), selected = arena(alacrity(asShard(source, "Garen")));
    expect(selected.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(selected.units[0].spec.bonus?.attackSpeed).toBeCloseTo(0.1, 10);
    expect(selected.units[0].statuses.find(status => status.memoKey === ALC_AS)?.value).toBeCloseTo(0.18, 10);
    expect(derive(selected.units[0]).bonusAttackSpeed).toBeCloseTo(derive(bare.units[0]).bonusAttackSpeed + 0.28, 10);
    expect(castJudgment(bare)).toBe(9);
    expect(castJudgment(selected)).toBe(9);
    through(bare, 90); through(selected, 90);
    expect(ticksOf(selected.log, 0, "Judgment deals ")).toEqual(ticksOf(bare.log, 0, "Judgment deals "));
    expect(ticksOf(selected.log, 0, "Judgment deals ")).toHaveLength(9);
    expect(selected.units[1].totals.damageTaken).toBeCloseTo(bare.units[1].totals.damageTaken, 8);
    expect(source.bonus).toEqual({});
  });

  it("subtracts a shield-dependent rune grant only while derive considers it active", () => {
    const world = arena(purchased(garen)), self = world.units[0], baseline = derive(self).bonusAttackSpeed;
    self.statuses.push(taggedAs(0.5, { requiresShield: true }));
    expect(derive(self).bonusAttackSpeed).toBe(baseline);
    expect(spins(world)).toBe(9);
    const shield = lasting("shield", "Rune dependency", 100, { source: 0, ability: "Rune dependency" });
    self.statuses.push(shield);
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(baseline + 0.5, 10);
    expect(spins(world)).toBe(9);
    shield.value = 0;
    expect(derive(self).bonusAttackSpeed).toBe(baseline);
    expect(spins(world)).toBe(9);
  });

  it("uses matching CC dependencies rather than subtracting every tagged status", () => {
    const world = arena(purchased(garen)), self = world.units[0], baseline = derive(self).bonusAttackSpeed;
    self.statuses.push(taggedAs(0.5, { whileCC: "stun" }));
    const wrong = lasting("cc", "stun", 0, { source: 0, ability: "Different effect" });
    self.statuses.push(wrong);
    expect(derive(self).bonusAttackSpeed).toBe(baseline);
    expect(spins(world)).toBe(9);
    wrong.ability = "Rune dependency";
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(baseline + 0.5, 10);
    expect(spins(world)).toBe(9);
    self.statuses = self.statuses.filter(status => status !== wrong);
    expect(derive(self).bonusAttackSpeed).toBe(baseline);
    expect(spins(world)).toBe(9);
  });

  it.each(["removed", "expired"] as const)("does not retain an origin subtraction after a rune status is %s", (change) => {
    // Eligible AS is exactly 75%; subtracting a stale 18% origin would incorrectly lose a spin.
    const world = arena(alacrity(purchased(garen, { attackSpeed: 0.0322275 }))), self = world.units[0];
    expect(spins(world)).toBe(10);
    const status = self.statuses.find(candidate => candidate.memoKey === ALC_AS)!;
    expect(status).toBeDefined();
    if (change === "removed") self.statuses = self.statuses.filter(candidate => candidate !== status);
    else { status.endTick = 2; through(world, 2); }
    expect(self.statuses.some(candidate => candidate.memoKey === ALC_AS)).toBe(false);
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(0.75, 10);
    expect(spins(world)).toBe(10);
  });

  it("preserves the existing treatment of an ordinary item AS status outside the rune namespace", () => {
    const world = arena(alacrity(purchased(garen)));
    world.units[0].statuses.push(lasting("stat", "attackSpeed", 0.5, { memoKey: "item:attackSpeed:fixture" }));
    expect(spins(world)).toBe(11);
    expect(world.units[0].statuses.find(status => status.memoKey === ALC_AS)?.value).toBeCloseTo(0.18, 10);
  });

  it.each(["AP", "attackSpeedMultiplier", "attackSpeedCap"] as const)
  ("does not subtract an unrelated tagged %s stat from eligible AS", (key) => {
    const world = arena(alacrity(purchased(garen)));
    world.units[0].statuses.push(lasting("stat", key, 0.5, { memoKey: "rune-effects:attackSpeed:unrelated-fixture" }));
    expect(spins(world)).toBe(9);
  });

  it("keeps tagged statuses and eligible purchased stats independent in cloned worlds", () => {
    const source = purchased(garen, { attackSpeed: 0.0322275 }), world = arena(alacrity(asShard(source, "Garen"))), branch = cloneWorld(world);
    const originalStatus = world.units[0].statuses.find(status => status.memoKey === ALC_AS)!;
    const branchStatus = branch.units[0].statuses.find(status => status.memoKey === ALC_AS)!;
    expect(branchStatus).not.toBe(originalStatus);
    branch.units[0].statuses = branch.units[0].statuses.filter(status => status !== branchStatus);
    expect(spins(world)).toBe(10);
    expect(spins(branch)).toBe(10);
    branch.units[0].spec = { ...branch.units[0].spec, bonus: { ...branch.units[0].spec.bonus, attackSpeed: branch.units[0].spec.bonus!.attackSpeed! + 0.25 } };
    expect(spins(branch)).toBe(11);
    expect(spins(world)).toBe(10);
    expect(originalStatus.value).toBeCloseTo(0.18, 10);
    expect(source.bonus).toEqual({ attackSpeed: 0.0322275 });
  });
});

describe("Legend: Alacrity and Kai'Sa's Living Weapon", () => {
  it.each([[0.64, false], [0.64603, true]] as const)
  ("purchased AS %s keeps E evolution=%s even when combat AS crosses 100%%", (attackSpeed, evolved) => {
    const source = purchased(kaisa, { attackSpeed }), bare = arena(source), selected = arena(alacrity(source));
    expect(derive(selected.units[0]).bonusAttackSpeed).toBeGreaterThan(1);
    expect(selected.units[0].spec.bonus?.attackSpeed).toBe(attackSpeed);
    for (const world of [bare, selected]) {
      startCast(world, world.units[0], spell(world, "E"));
      expect(world.units[0].statuses.some(status => status.key === "invisible")).toBe(evolved);
    }
  });

  it("shortens the actual Supercharge windup without adding to permanent evolution stats", () => {
    const source = purchased(kaisa, { attackSpeed: 0.1 }), bare = arena(source), selected = arena(alacrity(source));
    for (const world of [bare, selected]) startCast(world, world.units[0], spell(world, "E"));
    const ordinary = bare.units[0].action, withRune = selected.units[0].action;
    if (ordinary?.kind !== "cast" || withRune?.kind !== "cast") throw new Error("Supercharge did not start its real windup");
    expect(withRune.endTick).toBeLessThan(ordinary.endTick);
    expect(selected.units[0].statuses.some(status => status.key === "invisible")).toBe(false);
    expect(selected.units[0].spec.bonus?.attackSpeed).toBe(0.1);
  });

  it("keeps the direct shard origin separate from status-only Alacrity near E's evolution boundary", () => {
    const source = purchased(kaisa, { attackSpeed: 0.64 }), selected = arena(alacrity(asShard(source, "Kaisa")));
    expect(selected.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
    expect(selected.units[0].spec.bonus?.attackSpeed).toBeCloseTo(0.74, 10);
    expect(derive(selected.units[0]).bonusAttackSpeed).toBeGreaterThan(1.2);
    startCast(selected, selected.units[0], spell(selected, "E"));
    expect(selected.units[0].statuses.some(status => status.key === "invisible")).toBe(false);
    expect(source.bonus).toEqual({ attackSpeed: 0.64 });
  });
});

describe("Legend: Alacrity and Jhin's fixed attack speed", () => {
  it("converts the rune AS into the expected AD without increasing the fixed attack rate", () => {
    const source = purchased(jhin, { ad: 120, attackSpeed: 0.2, critChance: 0.4 }), bare = arena(source), selected = arena(alacrity(source));
    expect(source.statConversions?.attackDamageMultiplier?.bonusAttackSpeed).toBe(0.3);
    const before = derive(bare.units[0]), after = derive(selected.units[0]);
    expect(after.bonusAttackSpeed - before.bonusAttackSpeed).toBeCloseTo(0.18, 10);
    expect(after.ad - before.ad).toBeCloseTo((source.base.ad + 120) * 0.3 * 0.18, 8);
    expect(after.attackSpeed).toBe(before.attackSpeed);
    expect(attackTiming(selected.units[0]).total).toBe(attackTiming(bare.units[0]).total);
    expect(selected.units[0].spec.bonus?.attackSpeed).toBe(0.2);
  });

  it("uses the converted AD in a real first basic shot", () => {
    const source = purchased(jhin, { ad: 120 }), bare = arena(source), selected = arena(alacrity(source));
    for (const world of [bare, selected]) { startAttack(world, world.units[0]); through(world, 30); }
    expect(bare.units[1].totals.damageTaken).toBeCloseTo(derive(bare.units[0]).ad, 8);
    expect(selected.units[1].totals.damageTaken - bare.units[1].totals.damageTaken)
      .toBeCloseTo((source.base.ad + 120) * 0.3 * 0.18, 8);
  });
});

describe("Alacrity initialization, allocation reference and actual scenarios", () => {
  it.each([["Garen", garen], ["Kai'Sa", kaisa], ["Jhin", jhin]] as const)
  ("makes the rune visible before %s's kit start callback and retains that callback", (_name, compiled) => {
    const original = compiled.hooks?.onStart, seen: number[] = [];
    const source: FighterSpec = { ...purchased(compiled), hooks: { ...compiled.hooks, onStart(ctx) {
      seen.push(derive(ctx.self).bonusAttackSpeed);
      original?.call(compiled.hooks, ctx);
    } } };
    const bare = arena(purchased(compiled)), selected = arena(alacrity(source));
    expect(seen).toHaveLength(1);
    expect(seen[0]).toBeCloseTo(derive(bare.units[0]).bonusAttackSpeed + 0.18, 10);
    if (compiled === jhin) expect(selected.units[0].memory.jhinAmmo).toBe(4);
    expect(source.bonus).toEqual({});
    expect(compiled.hooks?.onStart).toBe(original);
  });

  it("keeps the no-rune purchased-stat allocation while actual combat receives the grant", () => {
    const source = purchased(garen), selected = alacrity(source), foe = fighter();
    const baseline = allocateBoth(source, foe, 1000, prices), withRune = allocateBoth(selected, foe, 1000, prices);
    expect(withRune).toEqual(baseline);
    expect(damagePerSecond(selected, foe)).toEqual(damagePerSecond(source, foe));
    const bareWorld = arena({ ...source, bonus: baseline[0].bonus }), actual = arena({ ...selected, bonus: withRune[0].bonus });
    expect(derive(actual.units[0]).bonusAttackSpeed).toBeCloseTo(derive(bareWorld.units[0]).bonusAttackSpeed + 0.18, 10);
    expect(spins(actual)).toBe(spins(bareWorld));
  });

  it("changes actual scenario outcomes and starts every repeated comparison from its declared state", () => {
    const source = purchased(garen), selected = alacrity(source), foe = fighter({ base: { hp: 100000, armor: 0, mr: 0, hpRegen: 0 } });
    const attacks: Behavior = () => ({ kind: "attack" });
    // At three seconds the rune's fourth basic hit has landed (tick 85), while the
    // baseline fourth hit is still pending (tick 91). Enemy idling isolates attack timing.
    const options = { settings: { maxSeconds: 3 }, behaviors: [attacks, idle] as [Behavior, Behavior] };
    const bare = runScenarios(source, foe, options), actual = runScenarios(selected, foe, options);
    const bareBrawl = bare.scenarios.find(scenario => scenario.id === "brawl")!;
    const actualBrawl = actual.scenarios.find(scenario => scenario.id === "brawl")!;
    expect(bareBrawl.outcomes[0]!.hp[1] - actualBrawl.outcomes[0]!.hp[1])
      .toBeCloseTo(derive(arena(source).units[0]).ad / foe.base.hp, 10);
    expect(actualBrawl.score).toBeGreaterThan(bareBrawl.score!);
    expect(runScenarios(selected, foe, options)).toEqual(actual);
    expect(selected.bonus).toEqual({});
    expect(source.bonus).toEqual({});
  });
});
