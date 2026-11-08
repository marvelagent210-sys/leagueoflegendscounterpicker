import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { startCast } from "../../engine/sim/actions";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import type { BaseStats, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Ahri from "../../kits/champions/Ahri";
import { championData, pets, records, runes } from "../kits/helpers";
import { lasting } from "./helpers";
import { fighter } from "./kits";

const bonus: Required<BonusStats> = {
  ad: 40, ap: 100, hp: 300, armor: 40, mr: 30, attackSpeed: 0.25,
  critChance: 0.2, abilityHaste: 40, basicAbilityHaste: 0, ultimateAbilityHaste: 0, lethality: 10, magicPen: 10,
  armorPenPoints: 10, magicPenPoints: 10,
};
// The final movement override has separate add/mutate/remove coverage in batch9CombatContracts.
const conversions: Required<Omit<NonNullable<FighterSpec["statConversions"]>, "totalMoveSpeedOverride" | "apToManaPercent" | "minimumMoveSpeed">> = {
  healthToAP: 0.03333, apToHealth: 1.6, moveSpeedBonusEffectiveness: 1.4,
  attackDamageMultiplier: { base: 0, critChance: 0, bonusAttackSpeed: 0 }, fixedAttackSpeed: false,
};

function world(): World {
  const spec: FighterSpec = {
    ...fighter({ bonus: { ...bonus }, base: { attackSpeed: { base: 0.7, ratio: 0.7, bonus: 0.3 } } }),
    statConversions: { ...conversions, attackDamageMultiplier: { ...conversions.attackDamageMultiplier } },
  };
  return createWorld({ fighters: [spec, fighter()], distance: 0, modes: ["idle", "idle"] });
}

/** A newly cloned unit has no cache entry, while retaining the exact current inputs. */
const fresh = (w: World) => derive(cloneWorld(w).units[0]);

describe("derived-stat cache freshness", () => {
  it("reuses an unchanged result without treating status expiry timestamps as stats", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "AP", 20));
    const before = derive(self);
    expect(derive(self)).toBe(before);
    self.statuses[0]!.endTick += 30;
    expect(derive(self)).toBe(before);
  });

  it("reflects in-place decay of a real Fox-Fire speed buff", () => {
    const ahri = compileKit(championData("Ahri"), records("Ahri"), Ahri, {}, pets("Ahri"), runes());
    const w = createWorld({ fighters: [ahri.spec, fighter()], distance: 0, modes: ["idle", "idle"] });
    const self = w.units[0];
    startCast(w, self, self.spec.abilities.find((ability) => ability.key === "W")!);
    const status = self.statuses.find((status) => status.memoKey === "buff:foxFireSpeed")!;
    const statuses = self.statuses;
    expect(derive(self).moveSpeed).toBeCloseTo(452.6, 10);
    status.value = 0.2;
    expect(self.statuses).toBe(statuses);
    expect(derive(self).moveSpeed).toBe(396);
    expect(derive(self)).toEqual(fresh(w));
    status.value = 0;
    expect(derive(self).moveSpeed).toBe(330);
  });

  it.each(Object.keys(bonus) as Array<keyof BonusStats>)("reflects an in-place bought %s change", (key) => {
    const w = world(), self = w.units[0];
    const before = derive(self);
    self.spec.bonus![key]! += key === "critChance" || key === "attackSpeed" ? 0.1 : 20;
    expect(derive(self)).not.toEqual(before);
    expect(derive(self)).toEqual(fresh(w));
  });

  const baseMutations = {
    hp: (base) => { base.hp += 100; },
    hpRegen: (base) => { base.hpRegen += 10; },
    resource: (base) => { base.resource += 100; },
    resourceRegen: (base) => { base.resourceRegen += 10; },
    armor: (base) => { base.armor += 10; },
    mr: (base) => { base.mr += 10; },
    ad: (base) => { base.ad += 10; },
    attackSpeed: (base) => { base.attackSpeed.base += 0.1; },
    windup: (base) => { base.windup.percent += 0.1; },
    moveSpeed: (base) => { base.moveSpeed += 10; },
    radius: (base) => { base.radius += 10; },
    pathingRadius: (base) => { base.pathingRadius += 10; },
    critDamageModifier: (base) => { base.critDamageModifier += 0.1; },
  } satisfies Record<keyof BaseStats, (base: BaseStats) => void>;

  it.each(Object.keys(baseMutations) as Array<keyof BaseStats>)("matches fresh computation after an in-place base %s change", (key) => {
    const w = world(), self = w.units[0];
    derive(self);
    baseMutations[key](self.spec.base);
    expect(derive(self)).toEqual(fresh(w));
  });

  it.each(["ratio", "bonus"] as const)("tracks nested attack-speed %s changes", (key) => {
    const w = world(), self = w.units[0];
    const before = derive(self).attackSpeed;
    self.spec.base.attackSpeed[key] += 0.1;
    expect(derive(self).attackSpeed).toBeGreaterThan(before);
    expect(derive(self)).toEqual(fresh(w));
  });

  it.each(["healthToAP", "apToHealth", "moveSpeedBonusEffectiveness"] as const)("tracks in-place %s conversion changes", (key) => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "moveSpeedPercent", 0.2));
    const before = derive(self);
    self.spec.statConversions![key]! += 0.2;
    expect(derive(self)).not.toEqual(before);
    expect(derive(self)).toEqual(fresh(w));
  });

  it.each(["base", "critChance", "bonusAttackSpeed"] as const)("tracks an in-place AD multiplier %s change", (key) => {
    const w = world(), self = w.units[0];
    const before = derive(self);
    self.spec.statConversions!.attackDamageMultiplier![key] += 0.2;
    expect(derive(self).ad).toBeGreaterThan(before.ad);
    expect(derive(self).bonusAd).toBeGreaterThan(before.bonusAd);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("tracks in-place fixed attack speed changes without losing bonus AS formulas", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("cc", "cripple", 0.8));
    derive(self);
    self.spec.statConversions!.fixedAttackSpeed = true;
    expect(derive(self).attackSpeed).toBeCloseTo(0.7 + 0.7 * 0.3, 12);
    expect(derive(self).bonusAttackSpeed).toBe(0.55);
    expect(derive(self)).toEqual(fresh(w));
    delete self.spec.statConversions!.attackDamageMultiplier;
    expect(derive(self)).toEqual(fresh(w));
    self.spec.statConversions!.attackDamageMultiplier = { base: 0.44, critChance: 0.35, bonusAttackSpeed: 0.3 };
    expect(derive(self)).toEqual(fresh(w));
  });

  it("tracks optional input removal and addition on the same spec object", () => {
    const w = world(), self = w.units[0];
    derive(self);
    delete self.spec.bonus;
    delete self.spec.statConversions;
    expect(derive(self).ap).toBe(0);
    expect(derive(self).maxHp).toBe(2000);
    self.spec.bonus = { ap: 50 };
    self.spec.statConversions = { apToHealth: 2 };
    expect(derive(self).maxHp).toBe(2100);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("detects a replacement status at the same array length", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "AP", 20));
    const before = derive(self);
    self.statuses[0] = lasting("stat", "health", 100);
    expect(derive(self).ap).toBeLessThan(before.ap);
    expect(derive(self).maxHp).toBeGreaterThan(before.maxHp);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("detects in-place status kind and key changes", () => {
    const w = world(), self = w.units[0];
    const status = lasting("stat", "AP", 20);
    self.statuses.push(status);
    const before = derive(self).ap;
    status.kind = "mark";
    expect(derive(self).ap).toBe(before - 20);
    status.kind = "stat";
    status.key = "AD";
    expect(derive(self).bonusAd).toBe(60);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("retains status ordering when a list is reordered in place", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "damageDealt", 0.2), lasting("stat", "damageDealt", 0.3));
    expect(derive(self).damageDealt).toEqual([0.2, 0.3]);
    self.statuses.reverse();
    expect(derive(self).damageDealt).toEqual([0.3, 0.2]);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("retains floating-point addition order when equal-key statuses are reordered", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "AD", 1e16), lasting("stat", "AD", -1e16), lasting("stat", "AD", 1));
    expect(derive(self).bonusAd).toBe(41);
    [self.statuses[1], self.statuses[2]] = [self.statuses[2]!, self.statuses[1]!];
    expect(derive(self).bonusAd).toBe(40);
    expect(derive(self)).toEqual(fresh(w));
  });

  it.each(["source", "ability"] as const)("tracks a cripple's %s when deciding whether two slows stack", (key) => {
    const w = world(), self = w.units[0];
    self.spec.base.attackSpeed = { base: 1, ratio: 0, bonus: 0 };
    self.statuses.push(lasting("cc", "cripple", 0.2, { ability: "Q" }), lasting("cc", "cripple", 0.3, { ability: "Q" }));
    expect(derive(self).attackSpeed).toBeCloseTo(0.7, 12);
    if (key === "source") self.statuses[1]!.source = 1;
    else self.statuses[1]!.ability = "E";
    expect(derive(self).attackSpeed).toBeCloseTo(0.56, 12);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("tracks tenacity-group changes", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("state", "tenacity", 0.2, { tenacityGroup: "same" }), lasting("state", "tenacity", 0.3, { tenacityGroup: "same" }));
    expect(derive(self).tenacity).toBe(0.5);
    self.statuses[1]!.tenacityGroup = "other";
    expect(derive(self).tenacity).toBeCloseTo(0.44, 12);
    expect(derive(self)).toEqual(fresh(w));
  });

  it("allows only exceptional slows through slow immunity and tracks an in-place exception flag", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("state", "slowImmune"), lasting("cc", "slow", 0.9), lasting("cc", "slow", 0.5));
    expect(derive(self).moveSpeed).toBe(350);
    self.statuses[2]!.bypassSlowImmune = true;
    expect(derive(self).moveSpeed).toBe(197.5);
    expect(derive(self)).toEqual(fresh(w));
    self.statuses.push(lasting("cc", "drowsy", 0.7, { bypassSlowImmune: true }));
    expect(derive(self).moveSpeed).toBe(162.5);
    self.statuses[2]!.bypassSlowImmune = false;
    self.statuses[3]!.bypassSlowImmune = false;
    expect(derive(self).moveSpeed).toBe(350);
  });

  it("keeps cloned status changes separate and sees shared spec mutations in both branches", () => {
    const w = world(), self = w.units[0];
    self.statuses.push(lasting("stat", "AP", 20));
    derive(self);
    const branch = cloneWorld(w);
    derive(branch.units[0]);
    branch.units[0].statuses[0]!.value = 100;
    expect(derive(branch.units[0]).ap - derive(self).ap).toBe(80);
    self.spec.bonus!.ap = 200;
    expect(derive(self).ap).toBeCloseTo(229.999, 12);
    expect(derive(branch.units[0]).ap).toBeCloseTo(309.999, 12);
    expect(derive(self)).toEqual(fresh(w));
    expect(derive(branch.units[0])).toEqual(fresh(branch));
  });
});
