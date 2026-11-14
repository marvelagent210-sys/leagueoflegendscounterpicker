import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { canCast, canStartAttack, costOf, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { mapForms } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import type { CombatRuneRules } from "../../runes/effectRules";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
let rules: CombatRuneRules;
beforeAll(async () => { rules = await loadCombatRuneRules("16.21", catalog); });

const champion = (id: string, bonus: BonusStats = {}): FighterSpec => mapForms(kit(id).spec, form => ({
  ...form, bonus, base: { ...form.base, hpRegen: 0, resourceRegen: 0 },
}));
const equip = (spec: FighterSpec): FighterSpec => equipRuneEffects(spec, [8009], catalog, rules).spec;
const arena = (self: FighterSpec, enemy = champion("Karthus"), distance = 2000): World => createWorld({
  fighters: [self, enemy], distance, modes: ["idle", "idle"],
  settings: { maxSeconds: 25, log: true, maxBranches: 1 },
});
const through = (world: World, tick: number): void => {
  while (!world.result && world.tick <= tick) step(world, [idle, idle]);
};
const spell = (world: World, key: string, side: 0 | 1 = 0) => {
  const found = world.units[side].spec.abilities.find(ability => ability.key === key);
  if (!found) throw new Error(`No current ability ${key}`);
  return found;
};
const finishCast = (world: World, key: string): void => {
  const self = world.units[0], ability = spell(world, key);
  expect(canCast(world, self, ability)).toBe(true);
  const end = world.tick + Math.ceil(ability.castTime * 30);
  startCast(world, self, ability);
  through(world, end);
};
const packet = (world: World): void => {
  dealDamage(world, world.units[0], world.units[1], 1, "true");
};
const consumeDamageAtFull = (world: World): void => {
  const self = world.units[0], full = derive(self).maxResource;
  self.resource = full;
  packet(world);
  expect(self.resource).toBe(full);
};
const killKarthus = (world: World): void => {
  expect(world.units[1].spec.id).toBe("karthus");
  dealDamage(world, world.units[0], world.units[1], 1000000, "true");
  expect(world.units[1].fallen).toBe(true);
  expect(world.units[1].deathNotified).toBe(true);
  expect(world.units[1].deathDefied).toBeDefined();
};

// Native champion cases exercise the declared resource/event policies. They
// are not measurements of live server snapshot, modifier or lifecycle phases.
describe("Presence of Mind with real resource pools and conversions", () => {
  it("reads Ryze's changed AP and temporary maximum Mana at delivery without refilling spent Mana", () => {
    const world = arena(equip(champion("Ryze", { ap: 100 }))), self = world.units[0];
    const base = self.spec.base.resource, atCredit = base * 1.1;
    expect(self.spec.resourceType).toBe("Mana");
    expect(derive(self).maxResource).toBeCloseTo(atCredit, 10);
    expect(self.resource).toBeCloseTo(atCredit, 10);
    consumeDamageAtFull(world);
    self.resource = 100;
    killKarthus(world);
    expect(self.resource).toBe(100);
    applyEffect(world, self, self, { type: "stat", stat: "AP", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    applyEffect(world, self, self, { type: "stat", stat: "maxResource", amount: { base: 200 }, duration: 10 }, { scale: 1 });
    const atDelivery = (base + 200) * 1.2;
    expect(derive(self).maxResource).toBeCloseTo(atDelivery, 10);
    expect(self.resource).toBe(100);
    through(world, 29);
    expect(world.result).toBeUndefined();
    expect(self.resource).toBe(100);
    through(world, 30);
    expect(self.resource).toBeCloseTo(100 + 0.15 * atDelivery, 10);
    expect(self.resource).not.toBeCloseTo(100 + 0.15 * atCredit, 10);
    expect(self.totals.healing).toBe(0);
  });

  it.each([
    { id: "Shen", maximum: 400, ranged: false },
    { id: "Kennen", maximum: 200, ranged: true },
  ])("restores six Energy and15% of $id's actual $maximum cap without Mana's ranged reduction", ({ id, maximum, ranged }) => {
    const world = arena(equip(champion(id, { ap: 1000 }))), self = world.units[0];
    expect(self.spec.resourceType).toBe("Energy");
    expect(self.spec.attack.ranged).toBe(ranged);
    expect(derive(self).maxResource).toBe(maximum);
    self.resource = 20;
    // A resolved packet isolates the rune from Shen/Kennen's own on-hit refunds.
    packet(world);
    expect(self.resource).toBe(26);
    killKarthus(world);
    expect(self.resource).toBe(26);
    through(world, 29);
    expect(self.resource).toBe(26);
    through(world, 30);
    expect(self.resource).toBeCloseTo(26 + 0.15 * maximum, 10);
    expect(self.totals.healing).toBe(0);
  });

  it.each([
    { beforeExpiry: 1, maximum: 300, restored: 45 },
    { beforeExpiry: 0, maximum: 200, restored: 30 },
  ])("uses Akali's current $maximum Energy cap when the deadline is $beforeExpiry tick before shroud expiry", ({ beforeExpiry, maximum, restored }) => {
    const world = arena(equip(champion("Akali"))), self = world.units[0];
    world.modes[0] = "fight"; // Native W rejects idle mode; explicit idle behaviors still prevent AI actions.
    expect(derive(self).maxResource).toBe(200);
    finishCast(world, "W");
    const shroud = self.statuses.find(status => status.kind === "stat" && status.key === "maxResource")!;
    expect(shroud.value).toBe(100);
    expect(derive(self).maxResource).toBe(300);
    const due = shroud.endTick - beforeExpiry, credit = due - 30;
    expect(credit).toBeGreaterThan(Number(self.memory.energyUntil));
    through(world, credit - 1);
    expect(world.tick).toBe(credit);
    consumeDamageAtFull(world);
    self.resource = 100;
    killKarthus(world);
    expect(self.resource).toBe(100);
    through(world, due - 1);
    expect(self.resource).toBe(100);
    through(world, due);
    expect(world.result).toBeUndefined();
    expect(derive(self).maxResource).toBe(maximum);
    expect(self.resource).toBeCloseTo(100 + restored, 10);
    expect(self.totals.healing).toBe(0);
  });
});

describe("Presence of Mind with native casts, forms and perk cooldown", () => {
  it("keeps one cooldown through both native Jayce transformations and uses the current form's Mana amount", () => {
    const world = arena(equip(champion("Jayce"))), self = world.units[0];
    self.resource = 100;
    expect(self.spec.form).toBe("Hammer Stance");
    packet(world);
    expect(self.resource).toBe(156);
    const memory = self.memory;
    finishCast(world, "R");
    expect(self.spec.form).toBe("Cannon Stance");
    expect(self.memory).toBe(memory);
    packet(world);
    expect(self.resource).toBe(156);
    through(world, 238);
    packet(world);
    expect(self.resource).toBe(156);
    through(world, 239);
    expect(world.tick).toBe(240);
    packet(world);
    expect(self.resource).toBeCloseTo(200.8, 10);
    finishCast(world, "RH");
    expect(self.spec.form).toBe("Hammer Stance");
    expect(self.memory).toBe(memory);
    packet(world);
    expect(self.resource).toBeCloseTo(200.8, 10);
    through(world, 479);
    packet(world);
    expect(self.resource).toBeCloseTo(256.8, 10);
  });

  it("does not haste the240-tick perk clock with broad, basic or ultimate ability haste", () => {
    const world = arena(equip(champion("Ryze", { abilityHaste: 500, basicAbilityHaste: 500, ultimateAbilityHaste: 500 }))), self = world.units[0];
    self.resource = 100;
    packet(world);
    expect(self.resource).toBeCloseTo(144.8, 10);
    through(world, 238);
    packet(world);
    expect(self.resource).toBeCloseTo(144.8, 10);
    through(world, 239);
    packet(world);
    expect(self.resource).toBeCloseTo(189.6, 10);
  });

  it("consumes the cooldown on Ryze's actual full-Mana attack before a later costly W", () => {
    const world = arena(equip(champion("Ryze")), champion("Karthus"), 100), self = world.units[0];
    const full = derive(self).maxResource;
    expect(self.resource).toBe(full);
    expect(canStartAttack(world, self)).toBe(true);
    startAttack(world, self);
    for (let count = 0; count < 90 && world.units[1].totals.damageTaken === 0; count++) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(world.tick).toBeLessThan(240);
    expect(self.resource).toBe(full);
    const damage = world.units[1].totals.damageTaken, cost = costOf(self, spell(world, "W"));
    expect(cost).toBeGreaterThan(44.8);
    finishCast(world, "W");
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(damage);
    expect(self.resource).toBeCloseTo(full - cost, 10);
  });

  it("restores Mana after Ryze actually pays W and enables a Q that the identical plain caster cannot afford", () => {
    const prepare = (selected: boolean) => {
      const spec = champion("Ryze"), world = arena(selected ? equip(spec) : spec, champion("Karthus"), 100);
      const self = world.units[0], w = spell(world, "W");
      self.resource = costOf(self, w);
      const paid = self.resource;
      expect(paid).toBeGreaterThan(44.8);
      expect(canCast(world, self, w)).toBe(true);
      startCast(world, self, w);
      if (w.castTime > 0) expect(self.resource).toBe(paid);
      through(world, Math.ceil(w.castTime * 30));
      expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
      return world;
    };
    const plain = prepare(false), selected = prepare(true);
    expect(plain.units[0].resource).toBe(0);
    expect(selected.units[0].resource).toBeCloseTo(44.8, 10);
    expect(canCast(plain, plain.units[0], spell(plain, "Q"))).toBe(false);
    expect(canCast(selected, selected.units[0], spell(selected, "Q"))).toBe(true);
    const damage = selected.units[1].totals.damageTaken, qCost = costOf(selected.units[0], spell(selected, "Q"));
    finishCast(selected, "Q");
    for (let count = 0; count < 90 && selected.units[1].totals.damageTaken === damage; count++) step(selected, [idle, idle]);
    expect(selected.units[1].totals.damageTaken).toBeGreaterThan(damage);
    expect(selected.units[0].resource).toBeCloseTo(44.8 - qCost, 10);
  });

  it("lets Kennen's real attack supply the six Energy needed for Q without borrowing his third-mark refund", () => {
    const prepare = (selected: boolean) => {
      const spec = champion("Kennen"), world = arena(selected ? equip(spec) : spec, champion("Karthus"), 100);
      const self = world.units[0], required = costOf(self, spell(world, "Q"));
      expect(required).toBeGreaterThan(6);
      self.resource = required - 6;
      expect(canCast(world, self, spell(world, "Q"))).toBe(false);
      expect(canStartAttack(world, self)).toBe(true);
      startAttack(world, self);
      for (let count = 0; count < 90 && world.units[1].totals.damageTaken === 0; count++) step(world, [idle, idle]);
      expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
      expect(self.memory.marks).toBe(1);
      return { world, required };
    };
    const plain = prepare(false), selected = prepare(true);
    expect(plain.world.units[0].resource).toBe(plain.required - 6);
    expect(selected.world.units[0].resource).toBe(selected.required);
    expect(canCast(plain.world, plain.world.units[0], spell(plain.world, "Q"))).toBe(false);
    expect(canCast(selected.world, selected.world.units[0], spell(selected.world, "Q"))).toBe(true);
    const damage = selected.world.units[1].totals.damageTaken;
    finishCast(selected.world, "Q");
    for (let count = 0; count < 90 && selected.world.units[1].totals.damageTaken === damage; count++) step(selected.world, [idle, idle]);
    expect(selected.world.units[1].totals.damageTaken).toBeGreaterThan(damage);
    expect(selected.world.units[0].memory.marks).toBe(2);
    expect(selected.world.units[0].resource).toBe(0);
  });
});

describe("Presence of Mind during actual counted deaths and duel ending", () => {
  it("delivers capped resource to Karthus's counted-dead positive-HP body while both native death states keep combat active", () => {
    const world = arena(equip(champion("Karthus")), champion("Sion")), self = world.units[0];
    consumeDamageAtFull(world);
    self.resource = 100;
    dealDamage(world, world.units[1], self, 1000000, "true");
    expect(self.fallen).toBe(true);
    expect(self.deathNotified).toBe(true);
    expect(self.hp).toBe(1);
    dealDamage(world, self, world.units[1], 1000000, "true");
    expect(world.units[1].fallen).toBe(true);
    expect(world.units[1].deathNotified).toBe(true);
    // Karthus's own native kill refund precedes the later Presence delivery.
    const afterKitRefund = self.resource, maximum = derive(self).maxResource;
    expect(afterKitRefund).toBeGreaterThan(100);
    through(world, 29);
    expect(world.result).toBeUndefined();
    expect(self.resource).toBe(afterKitRefund);
    through(world, 30);
    expect(self.resource).toBeCloseTo(Math.min(maximum, afterKitRefund + maximum * 0.15), 10);
    expect(self.hp).toBe(1);
    expect(self.totals.healing).toBe(0);
  });

  it("ends an ordinary Ryze victory before its delayed entitlement without fabricating another second", () => {
    const world = arena(equip(champion("Ryze")), champion("Garen")), self = world.units[0];
    consumeDamageAtFull(world);
    self.resource = 100;
    dealDamage(world, self, world.units[1], 1000000, "true");
    expect(self.resource).toBe(100);
    const result = runWorld(world, [idle, idle]);
    expect(result.seconds).toBe(0);
    expect(world.result).toEqual({ winner: 0, reason: "death", tick: 0 });
    expect(self.resource).toBe(100);
    expect(self.totals.healing).toBe(0);
    expect(world.scheduled).toHaveLength(0);
    expect(world.missiles).toHaveLength(0);
    expect(world.zones).toHaveLength(0);
  });
});
