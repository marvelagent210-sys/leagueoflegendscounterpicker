import { describe, expect, it } from "vitest";
import { applyEffect } from "../../engine/sim/combat";
import { restockCharges } from "../../engine/sim/actions";
import { setForm } from "../../engine/sim/forms";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type World } from "../../engine/sim/state";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import { toTicks } from "../../engine/rules/time";
import { castWhenReady, standStill } from "./helpers";
import { ability, fighter } from "./kits";

const spell = (key: string, extra: Partial<AbilitySpec> = {}) => ability({
  key, slot: key === "RQ" ? "R" : "Q", cooldown: 10,
  delivery: { kind: "self" }, ...extra,
});
const canonical = (extra: Partial<AbilitySpec> = {}) => spell("Q", { bonusAbilityHaste: 20, ...extra });
const alias = (extra: Partial<AbilitySpec> = {}) => spell("RQ", { cooldownKey: "Q", bonusAbilityHaste: 5, ...extra });
const own = (abilities: AbilitySpec[]) => fighter({ abilities,
  bonus: { abilityHaste: 20, basicAbilityHaste: 30, ultimateAbilityHaste: 50 } });
const arena = (input: AbilitySpec[] | FighterSpec): World => createWorld({
  fighters: [Array.isArray(input) ? own(input) : input, fighter()], distance: 1000, modes: ["idle", "idle"],
});
const cast = (world: World, key: string) => {
  let declared = false;
  step(world, [view => {
    if (declared) return { kind: "move", direction: 0 };
    declared = true;
    return castWhenReady(key)(view);
  }, standStill]);
};
const advance = (world: World, tick: number) => {
  while (world.tick < tick) step(world, [standStill, standStill]);
};
const refund = (world: World) => applyEffect(world, world.units[0], world.units[0],
  { type: "refund", ability: "Q", fraction: 0.5, total: true }, { scale: 1 });
const forms = (first: AbilitySpec[], second: AbilitySpec[]): FighterSpec => {
  const current = { ...own(first), form: "first" };
  const next = { ...own(second), form: "second" };
  current.forms = { first: current, second: next };
  next.forms = current.forms;
  return current;
};

describe("native cooldown timer sources", () => {
  it("refunds the alias's actual total instead of the canonical parent's conditional haste", () => {
    const world = arena([canonical(), alias()]), self = world.units[0];
    cast(world, "RQ");
    expect(self.cooldownReady.Q).toBe(194);
    advance(world, 30);
    refund(world);
    expect(self.cooldownReady.Q).toBe(97);
    expect(self.cooldownSources.Q).toMatchObject({ key: "RQ", hasteType: "basic", bonusAbilityHaste: 5 });
  });

  it("retains an alias's different base cooldown as well as its conditional haste", () => {
    const world = arena([canonical({ cooldown: 30 }), alias({ cooldown: 6 })]);
    cast(world, "RQ");
    expect(world.units[0].cooldownReady.Q).toBe(toTicks(6 / 1.55));
    advance(world, 20);
    refund(world);
    expect(world.units[0].cooldownReady.Q).toBe(58);
  });

  it("replaces the cast-timer source when the parent is later cast", () => {
    const world = arena([canonical(), alias()]);
    cast(world, "RQ");
    advance(world, 194);
    cast(world, "Q");
    expect(world.units[0].cooldownSources.Q!.key).toBe("Q");
    advance(world, 220);
    refund(world);
    expect(world.units[0].cooldownReady.Q).toBe(194 + 176 - 88);
  });

  it("captures the original alias classification and metadata across a form change", () => {
    const world = arena(forms([canonical(), alias()], [
      canonical({ cooldown: 30, hasteType: "ultimate", bonusAbilityHaste: 100 }),
      alias({ cooldown: 20, hasteType: "ultimate", bonusAbilityHaste: 100 }),
    ]));
    cast(world, "RQ");
    setForm(world, world.units[0], "second");
    advance(world, 30);
    refund(world);
    expect(world.units[0].cooldownReady.Q).toBe(97);
  });

  it("uses current stats with the retained source rather than retroactively changing a running timer", () => {
    const world = arena([canonical(), alias()]), self = world.units[0];
    cast(world, "RQ");
    self.spec.bonus!.basicAbilityHaste = 80;
    expect(self.cooldownReady.Q).toBe(194);
    advance(world, 30);
    refund(world);
    // Preserve the existing total-refund contract's current-stat evaluation.
    expect(self.cooldownReady.Q).toBe(194 - Math.round(toTicks(10 / 2.05) * 0.5));
  });

  it("releases a held alias using its initiating definition after a form change", () => {
    const held = alias({ cooldownAfter: "state", onSelf: [{ type: "state", state: "ccImmune", duration: 2 },
      { type: "refund", ability: "Q", fraction: 0.5, total: true }] });
    const world = arena(forms([canonical(), held], [canonical(), alias({ cooldown: 30, bonusAbilityHaste: 100 })]));
    cast(world, "RQ");
    expect(world.units[0].cooldownReady.Q).toBe(Infinity);
    setForm(world, world.units[0], "second");
    advance(world, 61);
    expect(world.units[0].cooldownReady.Q).toBe(60 + 97);
  });

  it("copies source maps and mutable source metadata independently when a world branches", () => {
    const world = arena([canonical(), alias({ charges: { max: 2, recharge: 12 } })]);
    cast(world, "RQ");
    const fork = cloneWorld(world), left = world.units[0], right = fork.units[0];
    expect(right.cooldownSources).not.toBe(left.cooldownSources);
    expect(right.cooldownSources.Q).not.toBe(left.cooldownSources.Q);
    expect(right.chargeSources.Q).not.toBe(left.chargeSources.Q);
    expect(right.chargeSources.Q!.charges).not.toBe(left.chargeSources.Q!.charges);
    right.cooldownSources.Q!.bonusAbilityHaste = 100;
    right.chargeSources.Q!.charges!.recharge = 30;
    refund(world);
    refund(fork);
    expect(left.cooldownReady.Q).toBe(97);
    expect(right.cooldownReady.Q).toBe(134);
    expect(left.chargeSources.Q!.charges!.recharge).toBe(12);
  });

  it("records a fixed interruption override even when the alias's cast never completes", () => {
    const world = arena([canonical(), alias({ castTime: 2, interruptible: { cooldown: 3 } })]), self = world.units[0];
    cast(world, "RQ");
    expect(self.cooldownReady.Q).toBeUndefined();
    applyEffect(world, world.units[1], self, { type: "cc", cc: "stun", duration: 1 }, { scale: 1 });
    expect(self.cooldownReady.Q).toBe(91);
    expect(self.cooldownSources.Q).toMatchObject({ key: "RQ", cooldown: 3, staticCooldown: true });
    advance(world, 30);
    refund(world);
    expect(self.cooldownReady.Q).toBe(46);
  });
});

describe("independent recharge timer sources", () => {
  const chargedParent = () => canonical({ cooldown: 0, charges: { max: 2, recharge: 6 } });
  const chargedAlias = () => alias({ cooldown: 0, charges: { max: 2, recharge: 12 } });

  it("keeps the initiating alias for recharge when a later parent cast owns the cast timer", () => {
    const world = arena([chargedParent(), chargedAlias()]), self = world.units[0];
    cast(world, "RQ");
    expect(self.charges.Q!.nextTick).toBe(233);
    cast(world, "Q");
    expect(self.cooldownSources.Q!.key).toBe("Q");
    expect(self.chargeSources.Q!.key).toBe("RQ");
    expect(self.charges.Q!.count).toBe(0);
    advance(world, 234);
    expect(self.charges.Q).toEqual({ count: 1, nextTick: 466 });
  });

  it("does not overwrite a running charged-Q source when an uncharged empowered Q is cast", () => {
    const world = arena([chargedParent(), alias({ cooldown: 0 })]), self = world.units[0];
    cast(world, "Q");
    expect(self.charges.Q!.nextTick).toBe(106);
    cast(world, "RQ");
    expect(self.cooldownSources.Q!.key).toBe("RQ");
    expect(self.chargeSources.Q!.key).toBe("Q");
    expect(self.charges.Q!.nextTick).toBe(106);
    advance(world, 107);
    expect(self.charges.Q).toEqual({ count: 2, nextTick: Infinity });
    expect(self.chargeSources.Q).toBeUndefined();
  });

  it("retains the recharge source across a form change and uses newly gained haste only on the next stock", () => {
    const world = arena(forms([chargedParent(), chargedAlias()], [
      canonical({ cooldown: 0, hasteType: "ultimate", charges: { max: 2, recharge: 3 } }),
    ])), self = world.units[0];
    cast(world, "RQ");
    setForm(world, self, "second");
    cast(world, "Q");
    self.spec.bonus!.basicAbilityHaste = 80;
    expect(self.charges.Q!.nextTick).toBe(233);
    advance(world, 234);
    expect(self.charges.Q).toEqual({ count: 1, nextTick: 233 + toTicks(12 / 2.05) });
    expect(self.chargeSources.Q).toMatchObject({ key: "RQ", hasteType: "basic" });
  });

  it("replaces a stale source when a kit deletes its old stock and a new full stock is spent", () => {
    const world = arena([chargedParent(), chargedAlias()]), self = world.units[0];
    cast(world, "RQ");
    delete self.charges.Q;
    cast(world, "Q");
    expect(self.chargeSources.Q!.key).toBe("Q");
    expect(self.charges.Q).toEqual({ count: 1, nextTick: 1 + 106 });
  });

  it("starts a new source after the preceding charge pool becomes full", () => {
    const world = arena([chargedParent(), chargedAlias()]), self = world.units[0];
    cast(world, "RQ");
    advance(world, 234);
    expect(self.chargeSources.Q).toBeUndefined();
    cast(world, "Q");
    expect(self.chargeSources.Q!.key).toBe("Q");
    expect(self.charges.Q!.nextTick).toBe(234 + 106);
  });

  it("still restocks legacy kit-authored stocks and captures the next interval's definition", () => {
    const world = arena([chargedParent()]), self = world.units[0];
    self.charges.Q = { count: 0, nextTick: 0 };
    restockCharges(world, self);
    expect(self.charges.Q).toEqual({ count: 1, nextTick: 106 });
    expect(self.chargeSources.Q).toMatchObject({ key: "Q", hasteType: "basic" });
  });
});
