import { describe, expect, it } from "vitest";
import { budgetUses, damagePerSecond } from "../../engine/budget";
import { releaseCooldowns, restockCharges } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { abilityForCooldown, abilityHasteFor, hasteTypeFor } from "../../engine/sim/cooldowns";
import { derive } from "../../engine/sim/derived";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type World } from "../../engine/sim/state";
import type { AbilitySpec } from "../../engine/sim/spec";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { toTicks } from "../../engine/rules/time";
import { castWhenReady, lasting, standStill } from "./helpers";
import { ability, fighter } from "./kits";

const spell = (key: string, slot: AbilitySpec["slot"], extra: Partial<AbilitySpec> = {}) =>
  ability({ key, slot, cooldown: 10, delivery: { kind: "self" }, ...extra });

function arena(abilities: AbilitySpec[], generic = 20, basic = 30): World {
  return createWorld({ fighters: [fighter({ abilities, bonus: { abilityHaste: generic, basicAbilityHaste: basic } }), fighter()],
    distance: 1000, modes: ["idle", "idle"] });
}

function cast(world: World, key: string): void {
  step(world, [castWhenReady(key), standStill]);
}

function advance(world: World, tick: number): void {
  while (world.tick < tick) step(world, [standStill, standStill]);
}

describe("ability-qualified haste", () => {
  it.each(["Q", "W", "E"] as const)("adds basic-only haste to an ordinary %s cooldown", slot => {
    const world = arena([spell(slot, slot)]);
    cast(world, slot);
    expect(world.units[0].cooldownReady[slot]).toBe(200);
  });

  it.each(["R", "I", "other"] as const)("keeps %s outside basic-only haste", slot => {
    const world = arena([spell("spell", slot)]);
    cast(world, "spell");
    expect(world.units[0].cooldownReady.spell).toBe(250);
  });

  it("keeps an unclassified internal activation outside basic haste, even with a Q slot", () => {
    const world = arena([spell("packet", "Q", { activation: "internal" })]);
    cast(world, "packet");
    expect(world.units[0].cooldownReady.packet).toBe(250);
  });

  it.each([
    ["basic", "R", 200], ["ultimate", "Q", 250], ["other", "Q", 250],
  ] as const)("honors reviewed %s classification independently of the %s slot", (hasteType, slot, ready) => {
    const world = arena([spell("exception", slot, { hasteType })]);
    cast(world, "exception");
    expect(world.units[0].cooldownReady.exception).toBe(ready);
  });

  it("lets a reviewed internal timer explicitly opt into a basic spell's haste", () => {
    const world = arena([]);
    expect(abilityHasteFor(world.units[0], { slot: "other", activation: "internal", hasteType: "basic" })).toBe(50);
  });

  it("retains a shared parent's classification for an empowered alias", () => {
    const root = spell("Q", "Q");
    const alias = spell("RQ", "R", { cooldownKey: "Q" });
    const world = arena([root, alias]);
    cast(world, "RQ");
    expect(world.units[0].cooldownReady.Q).toBe(200);
    expect(world.units[0].cooldownReady.RQ).toBeUndefined();
  });

  it("retains an ultimate parent's classification for a basic-slot recast", () => {
    const world = arena([spell("R", "R"), spell("R2", "Q", { cooldownKey: "R" })]);
    cast(world, "R2");
    expect(world.units[0].cooldownReady.R).toBe(250);
  });

  it("follows a chain root and a parent across form records", () => {
    const root = spell("R", "R", { hasteType: "basic" });
    const current = fighter({ abilities: [spell("R2", "other", { chain: { root: "R", index: 2, window: 3 } })] });
    current.form = "current";
    current.forms = { current, previous: { ...fighter({ abilities: [root] }), form: "previous" } };
    const world = createWorld({ fighters: [current, fighter()], distance: 1000, modes: ["idle", "idle"] });
    world.units[0].statuses.push(lasting("stat", "basicAbilityHaste", 15));
    expect(abilityHasteFor(world.units[0], current.abilities[0]!)).toBe(15);
  });

  it("terminates malformed cyclic aliases without recursing forever", () => {
    const first = spell("A", "Q", { cooldownKey: "B" });
    const world = arena([first, spell("B", "R", { cooldownKey: "A" })]);
    expect(abilityHasteFor(world.units[0], first)).toBe(20);
  });

  it.each([0, 20, 100, 490, 500])("preserves the old native duration exactly at zero basic haste with %s generic haste", generic => {
    const world = arena([spell("Q", "Q"), spell("R", "R")], generic, 0);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(toTicks(cooldownAfterHaste(10, generic)));
    const ultimate = arena([spell("R", "R")], generic, 0);
    cast(ultimate, "R");
    expect(ultimate.units[0].cooldownReady.R).toBe(toTicks(cooldownAfterHaste(10, generic)));
  });

  it("caps generic and additive basic haste at the source's 500-point limit", () => {
    const world = arena([], 490, 30), self = world.units[0];
    expect(derive(self).abilityHaste).toBe(490);
    expect(abilityHasteFor(self, { slot: "Q" })).toBe(500);
    expect(abilityHasteFor(self, { slot: "R" })).toBe(490);
    self.spec.bonus!.abilityHaste = 510;
    expect(derive(self).abilityHaste).toBe(500);
    expect(abilityHasteFor(self, { slot: "R" })).toBe(500);
  });

  it("keeps generic and basic stats distinct and invalidates a mutated stat cache", () => {
    const world = arena([], 20, 0), self = world.units[0];
    const original = derive(self);
    self.spec.bonus!.basicAbilityHaste = 5;
    expect(derive(self)).not.toBe(original);
    const contribution = lasting("stat", "basicAbilityHaste", 10);
    self.statuses.push(contribution);
    expect(derive(self).abilityHaste).toBe(20);
    expect(derive(self).basicAbilityHaste).toBe(15);
    contribution.value = 20;
    expect(derive(self).basicAbilityHaste).toBe(25);
    self.statuses.pop();
    expect(derive(self).basicAbilityHaste).toBe(5);
    expect(derive(cloneWorld(world).units[0]).basicAbilityHaste).toBe(5);
  });

  it("respects shield and crowd-control dependencies on a basic-haste status", () => {
    const world = arena([], 20, 0), self = world.units[0];
    self.statuses.push(lasting("stat", "basicAbilityHaste", 15, { requiresShield: true, ability: "guard" }));
    expect(abilityHasteFor(self, { slot: "Q" })).toBe(20);
    self.statuses.push(lasting("shield", "guard", 100, { ability: "guard" }));
    expect(abilityHasteFor(self, { slot: "Q" })).toBe(35);
  });

  it("does not change a running timer when basic haste is gained", () => {
    const world = arena([spell("Q", "Q")], 20, 0), self = world.units[0];
    cast(world, "Q");
    advance(world, 60);
    self.statuses.push(lasting("stat", "basicAbilityHaste", 30));
    expect(self.cooldownReady.Q).toBe(250);
    advance(world, 250);
    cast(world, "Q");
    expect(self.cooldownReady.Q).toBe(450);
  });
});

describe("basic haste through native cooldown paths", () => {
  it("starts a cast-start cooldown using qualified haste", () => {
    const world = arena([spell("Q", "Q", { cooldownAtCastStart: true, castTime: 1 })]);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(200);
    advance(world, 31);
    expect(world.units[0].cooldownReady.Q).toBe(200);
  });

  it.each([false, true])("uses qualified haste after an empowerment and its pending refund (static=%s)", staticCooldown => {
    const world = arena([spell("Q", "Q", {
      staticCooldown, cooldownAfter: "empower", onSelf: [
        { type: "empower", attacks: 1, window: 2, onHit: [] },
        { type: "refund", ability: "Q", fraction: 0.25 },
      ],
    })]);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(Infinity);
    advance(world, 61);
    expect(world.units[0].cooldownReady.Q).toBe(60 + (staticCooldown ? 225 : 150));
  });

  it("samples the current qualified haste when a held cooldown actually begins", () => {
    const world = arena([spell("Q", "Q", { cooldownAfter: "empower", onSelf: [{ type: "empower", attacks: 1, window: 2, onHit: [] }] })], 20, 0);
    cast(world, "Q");
    advance(world, 30);
    world.units[0].statuses.push(lasting("stat", "basicAbilityHaste", 30));
    advance(world, 61);
    expect(world.units[0].cooldownReady.Q).toBe(260);
  });

  it("lets a static cast cooldown retain separately hasted charge recharge", () => {
    const world = arena([spell("E", "E", { staticCooldown: true, cooldown: 1, charges: { max: 2, recharge: 6 } })]);
    cast(world, "E");
    expect(world.units[0].cooldownReady.E).toBe(30);
    expect(world.units[0].charges.E!.nextTick).toBe(120);
  });

  it("qualifies ordinary ultimate charge recharge without basic haste", () => {
    const world = arena([spell("R", "R", { cooldown: 1, charges: { max: 2, recharge: 6 } })]);
    cast(world, "R");
    expect(world.units[0].charges.R!.nextTick).toBe(150);
  });

  it("does not rescale an existing recharge but uses new basic haste for the next stock", () => {
    const world = arena([spell("Q", "Q", { cooldown: 0.5, charges: { max: 2, recharge: 6 } })], 20, 0), self = world.units[0];
    cast(world, "Q");
    advance(world, 13);
    cast(world, "Q");
    expect(self.charges.Q!.count).toBe(0);
    self.statuses.push(lasting("stat", "basicAbilityHaste", 30));
    expect(self.charges.Q!.nextTick).toBe(150);
    advance(world, 150);
    restockCharges(world, self);
    expect(self.charges.Q).toEqual({ count: 1, nextTick: 270 });
  });

  it.each([false, true])("retains remaining-versus-total refund meaning (total=%s)", total => {
    const world = arena([spell("Q", "Q")]), self = world.units[0];
    cast(world, "Q");
    advance(world, 60);
    applyEffect(world, self, self, { type: "refund", ability: "Q", fraction: 0.5, total }, { scale: 1 });
    expect(self.cooldownReady.Q).toBe(total ? 100 : 130);
  });

  it("resolves an absent native key to its shared timer owner for a total refund", () => {
    const actual = spell("Qalternate", "Q", { cooldownKey: "sharedQ" });
    const world = arena([actual]), self = world.units[0];
    cast(world, "Qalternate");
    advance(world, 60);
    expect(abilityForCooldown(self, "sharedQ")).toMatchObject({ key: actual.key, cooldown: actual.cooldown, hasteType: "basic" });
    applyEffect(world, self, self, { type: "refund", ability: "sharedQ", fraction: 0.5, total: true }, { scale: 1 });
    expect(self.cooldownReady.sharedQ).toBe(100);
  });

  it("does not give basic haste to an ordinary ultimate's total refund", () => {
    const world = arena([spell("R", "R")]), self = world.units[0];
    cast(world, "R");
    advance(world, 60);
    applyEffect(world, self, self, { type: "refund", ability: "R", fraction: 0.5, total: true }, { scale: 1 });
    expect(self.cooldownReady.R).toBe(125);
  });

  it("schedules static held cooldowns without either kind of haste", () => {
    const q = spell("Q", "Q", { staticCooldown: true, cooldownAfter: "state" });
    const world = arena([q]), self = world.units[0];
    self.cooldownReady.Q = Infinity;
    self.cooldownHeld.Q = "Q";
    releaseCooldowns(world, self);
    expect(self.cooldownReady.Q).toBe(300);
  });

  it("produces an additional real cast in a controlled 18-second scenario", () => {
    const casts = (basic: number) => {
      const q = spell("Q", "Q");
      const own = fighter({ abilities: [q], bonus: { basicAbilityHaste: basic }, hooks: {
        onCast(ctx) { ctx.memory.casts = Number(ctx.memory.casts ?? 0) + 1; },
      } });
      const world = createWorld({ fighters: [own, fighter()], distance: 1000, modes: ["idle", "idle"], settings: { maxSeconds: 18 } });
      runWorld(world, [castWhenReady("Q"), standStill]);
      return world.units[0].memory.casts;
    };
    expect(casts(0)).toBe(2);
    expect(casts(15)).toBe(3);
  });
});

describe("independent basic and ultimate haste", () => {
  it.each([
    ["Q", "basic", 200], ["R", "ultimate", toTicks(10 / 1.7)],
    ["other", "other", 250], ["I", "other", 250],
  ] as const)("uses the correct specialized stat for %s", (slot, kind, ready) => {
    const world = arena([spell("spell", slot)]), self = world.units[0];
    self.spec.bonus!.ultimateAbilityHaste = 50;
    expect(hasteTypeFor(self, self.spec.abilities[0]!)).toBe(kind);
    cast(world, "spell");
    expect(self.cooldownReady.spell).toBe(ready);
  });

  it("keeps a basic-slot internal activation outside both specialized stats", () => {
    const world = arena([spell("packet", "Q", { activation: "internal" })]);
    world.units[0].spec.bonus!.ultimateAbilityHaste = 50;
    cast(world, "packet");
    expect(world.units[0].cooldownReady.packet).toBe(250);
  });

  it("retains explicit basic and ultimate exceptions independently of slot names", () => {
    const world = arena([]), self = world.units[0];
    self.spec.bonus!.ultimateAbilityHaste = 50;
    expect(abilityHasteFor(self, { slot: "R", hasteType: "basic" })).toBe(50);
    expect(abilityHasteFor(self, { slot: "Q", hasteType: "ultimate" })).toBe(70);
    expect(abilityHasteFor(self, { slot: "R", hasteType: "other" })).toBe(20);
  });

  it("does not give ultimate haste to an empowered basic shared with Q", () => {
    const world = arena([spell("Q", "Q"), spell("RQ", "R", { cooldownKey: "Q" })]);
    world.units[0].spec.bonus!.ultimateAbilityHaste = 50;
    cast(world, "RQ");
    expect(world.units[0].cooldownReady.Q).toBe(200);
  });

  it("caps the ultimate total without capping or merging either specialized input", () => {
    const world = arena([], 490, 30), self = world.units[0];
    self.spec.bonus!.ultimateAbilityHaste = 50;
    expect(derive(self).ultimateAbilityHaste).toBe(50);
    expect(abilityHasteFor(self, { slot: "R" })).toBe(500);
    expect(derive(self).basicAbilityHaste).toBe(30);
  });

  it("tracks added, mutated and removed ultimate bonuses and statuses in the derived cache", () => {
    const world = arena([], 20, 0), self = world.units[0];
    derive(self);
    self.spec.bonus!.ultimateAbilityHaste = 10;
    expect(derive(self).ultimateAbilityHaste).toBe(10);
    const status = lasting("stat", "ultimateAbilityHaste", 15);
    self.statuses.push(status);
    expect(derive(self).ultimateAbilityHaste).toBe(25);
    status.value = 20;
    expect(derive(self).ultimateAbilityHaste).toBe(30);
    self.statuses.pop();
    delete self.spec.bonus!.ultimateAbilityHaste;
    expect(derive(self).ultimateAbilityHaste).toBe(0);
    expect(derive(self).basicAbilityHaste).toBe(0);
    expect(derive(self).abilityHaste).toBe(20);
  });

  it("uses ultimate haste for ultimate charge recharge and total refunds", () => {
    const world = arena([spell("R", "R", { charges: { max: 2, recharge: 17 } })]), self = world.units[0];
    self.spec.bonus!.ultimateAbilityHaste = 50;
    cast(world, "R");
    expect(self.charges.R!.nextTick).toBe(300);
    advance(world, 60);
    const whole = toTicks(10 / 1.7);
    applyEffect(world, self, self, { type: "refund", ability: "R", fraction: 0.5, total: true }, { scale: 1 });
    expect(self.cooldownReady.R).toBe(whole - Math.round(whole * 0.5));
  });
});

describe("qualified haste in the reference budget", () => {
  const damage = { type: "damage", damageType: "true", amount: { base: 100 } } as const;

  it("values basic and ultimate casts using their own qualified haste", () => {
    const own = { ...fighter({ abilities: [spell("Q", "Q", { onHit: [damage] }), spell("R", "R", { onHit: [damage] })],
      bonus: { abilityHaste: 20, basicAbilityHaste: 30, ultimateAbilityHaste: 50 } }), budget: { attacks: false } };
    expect(damagePerSecond(own, fighter()).true).toBeCloseTo(100 / (10 / 1.5) + 100 / (10 / 1.7), 12);
    const world = createWorld({ fighters: [own, fighter()], distance: 1000, modes: ["idle", "idle"] });
    const uses = budgetUses(world.units[0]);
    expect(uses.find(use => use.ability.key === "Q")!.cycle).toBeCloseTo(10 / 1.5, 12);
    expect(uses.find(use => use.ability.key === "R")!.cycle).toBeCloseTo(10 / 1.7, 12);
  });

  it("retains separately hasted recharge in the static-cast reference cycle", () => {
    const own = { ...fighter({ abilities: [spell("Q", "Q", { cooldown: 1, staticCooldown: true,
      charges: { max: 2, recharge: 6 }, onHit: [damage] })], bonus: { abilityHaste: 20, basicAbilityHaste: 30 } }),
      budget: { attacks: false } };
    expect(damagePerSecond(own, fighter()).true).toBe(25);
  });

  it("retains a static non-charge reference cooldown despite both haste categories", () => {
    const own = { ...fighter({ abilities: [spell("Q", "Q", { staticCooldown: true, onHit: [damage] })],
      bonus: { abilityHaste: 20, basicAbilityHaste: 30 } }), budget: { attacks: false } };
    expect(damagePerSecond(own, fighter()).true).toBe(10);
  });

  it("does not leak an onStart-only rune grant into the no-rune reference allocation", () => {
    const own = { ...fighter({ abilities: [spell("Q", "Q", { onHit: [damage] })], hooks: {
      onStart(ctx) { ctx.self.statuses.push(lasting("stat", "basicAbilityHaste", 15)); },
    } }), budget: { attacks: false } };
    const world = createWorld({ fighters: [own, fighter()], distance: 1000, modes: ["idle", "idle"] });
    expect(derive(world.units[0]).basicAbilityHaste).toBe(15);
    expect(damagePerSecond(own, fighter()).true).toBe(10);
  });
});

describe("ability-specific conditional haste", () => {
  it("adds an actual ability's conditional haste exactly once", () => {
    const q = spell("Q", "Q", { bonusAbilityHaste: 10 });
    const world = arena([q]);
    expect(abilityHasteFor(world.units[0], q)).toBe(60);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(toTicks(10 / 1.6));
  });

  it("lets keyed and canonical-slot shorthand clocks read their equipped spell's contribution", () => {
    const q = spell("Q", "Q", { bonusAbilityHaste: 10 });
    const e = spell("Ealternate", "E", { bonusAbilityHaste: 7 });
    const world = arena([q, e]), self = world.units[0];
    expect(abilityHasteFor(self, { slot: "Q" })).toBe(60);
    expect(abilityHasteFor(self, { slot: "E", key: "Ealternate" })).toBe(57);
  });

  it("inherits an actual reviewed classification when a shorthand descriptor omits it", () => {
    const q = spell("Q", "Q", { hasteType: "ultimate", bonusAbilityHaste: 10 });
    const world = arena([q]), self = world.units[0];
    self.spec.bonus!.ultimateAbilityHaste = 50;
    expect(hasteTypeFor(self, { slot: "Q" })).toBe("ultimate");
    expect(abilityHasteFor(self, { slot: "Q" })).toBe(80);
    expect(abilityHasteFor(self, { slot: "Q", hasteType: "basic" })).toBe(60);
  });

  it("honors an explicit zero instead of re-reading a conditional bonus", () => {
    const world = arena([spell("Q", "Q", { bonusAbilityHaste: 10 })]);
    expect(abilityHasteFor(world.units[0], { slot: "Q", bonusAbilityHaste: 0 })).toBe(50);
  });

  it("uses the alias's own condition without adding the parent's conditional bonus", () => {
    const root = spell("Q", "Q", { bonusAbilityHaste: 20 });
    const alias = spell("RQ", "R", { cooldownKey: "Q", bonusAbilityHaste: 5 });
    const world = arena([root, alias]), self = world.units[0];
    expect(abilityHasteFor(self, alias)).toBe(55);
    expect(abilityHasteFor(self, { slot: "R", key: "RQ" })).toBe(55);
    expect(abilityHasteFor(self, { slot: "R", key: "RQ", bonusAbilityHaste: 0 })).toBe(50);
  });

  it("does not inherit a parent's condition when an alias has no conditional contribution", () => {
    const root = spell("Q", "Q", { bonusAbilityHaste: 20 });
    const alias = spell("RQ", "R", { cooldownKey: "Q" });
    const world = arena([root, alias]);
    expect(abilityHasteFor(world.units[0], alias)).toBe(50);
    expect(abilityHasteFor(world.units[0], { slot: "R", key: "RQ" })).toBe(50);
  });

  it("caps the whole qualified total after conditional haste", () => {
    const world = arena([spell("Q", "Q", { bonusAbilityHaste: 20 })], 490, 5);
    expect(abilityHasteFor(world.units[0], world.units[0].spec.abilities[0]!)).toBe(500);
  });

  it("applies the same condition to native cast, recharge and total-refund timers", () => {
    const q = spell("Q", "Q", { bonusAbilityHaste: 50, charges: { max: 2, recharge: 6 } });
    const world = arena([q]), self = world.units[0];
    cast(world, "Q");
    expect(self.cooldownReady.Q).toBe(150);
    expect(self.charges.Q!.nextTick).toBe(90);
    advance(world, 30);
    applyEffect(world, self, self, { type: "refund", ability: "Q", fraction: 0.5, total: true }, { scale: 1 });
    expect(self.cooldownReady.Q).toBe(75);
  });

  it("includes a conditional contribution when a held cooldown begins", () => {
    const q = spell("Q", "Q", { bonusAbilityHaste: 50, cooldownAfter: "empower",
      onSelf: [{ type: "empower", attacks: 1, window: 2, onHit: [] }] });
    const world = arena([q]);
    cast(world, "Q");
    advance(world, 61);
    expect(world.units[0].cooldownReady.Q).toBe(210);
  });

  it("preserves the static cast exception while applying the condition to separate recharge", () => {
    const q = spell("Q", "Q", { cooldown: 1, staticCooldown: true, bonusAbilityHaste: 50,
      charges: { max: 2, recharge: 6 } });
    const world = arena([q]);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(30);
    expect(world.units[0].charges.Q!.nextTick).toBe(90);
  });

  it("does not hide an ability's conditional contribution from reference damage or recharge", () => {
    const q = spell("Q", "Q", { bonusAbilityHaste: 50, cooldown: 1, charges: { max: 2, recharge: 6 },
      onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const own = { ...fighter({ abilities: [q], bonus: { abilityHaste: 20, basicAbilityHaste: 30 } }), budget: { attacks: false } };
    expect(damagePerSecond(own, fighter()).true).toBeCloseTo(100 / 3, 12);
  });
});
