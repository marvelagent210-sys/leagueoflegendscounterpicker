import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import { abilityHit, attackHit, dealDamage } from "../../engine/sim/combat";
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
import { fighter } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
let rules: CombatRuneRules;
beforeAll(async () => { rules = await loadCombatRuneRules("16.21", catalog); });

const champion = (id: string, bonus: BonusStats = {}): FighterSpec => mapForms(kit(id).spec, form => ({
  ...form, bonus, base: { ...form.base, hpRegen: 0, resourceRegen: 0 },
}));
const equip = (spec: FighterSpec, bloodline = false) => equipRuneEffects(
  spec, bloodline ? [9111, 9103] : [9111], catalog, rules,
  bloodline ? { legendPoints: 1499 } : undefined,
).spec;
const arena = (self: FighterSpec, enemy = champion("Karthus"), distance = 2000): World => createWorld({
  fighters: [self, enemy], distance, modes: ["idle", "idle"],
  settings: { maxSeconds: 20, log: true, maxBranches: 1 },
});
const through = (world: World, tick: number): void => {
  while (!world.result && world.tick <= tick) step(world, [idle, idle]);
};
const spell = (world: World, key: string, side: 0 | 1 = 0) =>
  world.units[side].spec.abilities.find(ability => ability.key === key)!;
const ceiling = (world: World) => world.units[0].statuses.find(status => status.key === "healthCapAbsolute")!.value;
const rawHeal = (maxHp: number, hp: number) => 0.025 * maxHp + 0.05 * (maxHp - hp);
const killKarthus = (world: World): void => {
  dealDamage(world, world.units[0], world.units[1], 1000000, "true");
  expect(world.units[1].fallen).toBe(true);
  expect(world.units[1].deathNotified).toBe(true);
  expect(world.units[1].deathDefied).toBeDefined();
};

// These fixtures verify the declared native pre-onKill frame and delivery-time
// caps. The sources do not establish this frame as exact global live ordering.
describe("Triumph with actual champion health pools and native kit callbacks", () => {
  it.each(["Kled & Skaarl", "Kled"])("uses Kled's combined maximum in %s, then its ordinary healing ceiling", form => {
    const source = champion("Kled"), spec = source.forms![form]!;
    const world = arena(equip(spec)), self = world.units[0], combined = derive(self).maxHp;
    const cap = form === "Kled" ? ceiling(world) : combined;
    self.hp = cap - 20;
    const raw = rawHeal(combined, self.hp);
    killKarthus(world);
    expect(self.memory["rune:triumph:raw"]).toBeCloseTo(raw, 10);
    if (form === "Kled") {
      expect(combined).toBeGreaterThan(cap);
      expect(raw).toBeGreaterThan(rawHeal(cap, cap - 20));
    }
    through(world, 29);
    expect(self.hp).toBe(cap - 20);
    through(world, 30);
    expect(self.hp).toBeCloseTo(cap, 10);
    expect(self.totals.healing).toBeCloseTo(20, 10);
    expect(self.spec.form).toBe(form);
    expect(derive(self).maxHp).toBe(combined);
  });

  it("snapshots both terms before a legal Bloodline cap changes dismounted Kled's missing HP", () => {
    const source = champion("Kled").forms!.Kled!;
    const world = arena(equip(source, true)), self = world.units[0], own = ceiling(world);
    const combined = derive(self).maxHp, hpAtCredit = own - 20;
    self.hp = hpAtCredit;
    killKarthus(world);
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBe(combined + 85);
    expect(self.hp).toBe(own);
    // Only 20 of the direct +85 award fits: missing HP rises by 65.
    expect(derive(self).maxHp - self.hp - (combined - hpAtCredit)).toBeCloseTo(65, 10);
    const nativeRaw = rawHeal(combined, hpAtCredit), lateRaw = rawHeal(combined + 85, own);
    expect(lateRaw - nativeRaw).toBeCloseTo(0.025 * 85 + 0.05 * 65, 10);
    expect(self.memory["rune:triumph:raw"]).toBeCloseTo(nativeRaw, 10);
    dealDamage(world, world.units[1], self, 500, "true");
    through(world, 30);
    expect(self.hp).toBeCloseTo(own - 500 + nativeRaw, 10);
    expect(self.totals.healing).toBeCloseTo(nativeRaw, 10);
    expect(ceiling(world)).toBe(own);
    expect(self.spec.form).toBe("Kled");
  });

  it("retains one equipped timer through Kled's actual dismount without a second credit or heal", () => {
    const world = arena(equip(champion("Kled"))), self = world.units[0];
    self.hp -= 600;
    const raw = rawHeal(derive(self).maxHp, self.hp);
    killKarthus(world);
    const memory = self.memory;
    dealDamage(world, world.units[1], self, 1000000, "true");
    expect(self.spec.form).toBe("Kled");
    expect(self.memory).toBe(memory);
    expect(self.deathNotified).toBeFalsy();
    expect(self.memory["rune:triumph:due"]).toBe(30);
    expect(self.memory["rune:triumph:raw"]).toBeCloseTo(raw, 10);
    through(world, 15); // Dismount's sourced half-second untargetability expires.
    dealDamage(world, world.units[1], self, 500, "true");
    const hp = self.hp;
    through(world, 30);
    expect(self.hp).toBeCloseTo(hp + raw, 10);
    expect(self.totals.healing).toBeCloseTo(raw, 10);
    through(world, 60);
    expect(self.hp).toBeCloseTo(hp + raw, 10);
    expect(self.totals.healing).toBeCloseTo(raw, 10);
  });

  it.each(["above", "below"] as const)("keeps All Out's entry ceiling when Bloodline leaves K'Sante %s it at delivery", position => {
    const world = arena(equip(champion("KSante"), true)), self = world.units[0];
    const entryMax = derive(self).maxHp, r = spell(world, "R");
    abilityHit(world, self, world.units[1], r, r.onHit!);
    through(world, 15); // Resolve R's own delayed strike and its kit omnivamp first.
    self.x = 0; world.units[1].x = 2000;
    const cap = ceiling(world);
    expect(cap).toBeCloseTo(0.65 * entryMax, 10);
    self.hp = cap - 20;
    const raw = rawHeal(entryMax, self.hp), due = world.tick + 30;
    killKarthus(world);
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBe(entryMax + 85);
    expect(self.hp).toBeCloseTo(cap + 65, 10);
    expect(self.memory["rune:triumph:raw"]).toBeCloseTo(raw, 10);
    if (position === "below") self.hp = cap - 20;
    const hp = self.hp, healing = self.totals.healing;
    through(world, due);
    expect(self.hp).toBeCloseTo(position === "below" ? cap : hp, 10);
    expect(self.totals.healing - healing).toBeCloseTo(position === "below" ? 20 : 0, 10);
    expect(ceiling(world)).toBeCloseTo(cap, 10);
    expect(ceiling(world)).not.toBeCloseTo(0.65 * derive(self).maxHp, 10);
  });

  it("uses Renata's pre-Bailout-save health before her kit callback and Bloodline award", () => {
    const world = arena(equip(champion("Renata"), true)), self = world.units[0], w = spell(world, "W");
    expect(canCast(world, self, w)).toBe(true);
    startCast(world, self, w);
    for (let tick = 0; tick < 30 && self.action?.kind === "cast"; tick++) step(world, [idle, idle]);
    expect(self.action?.kind).not.toBe("cast");
    const maxAtCredit = derive(self).maxHp;
    dealDamage(world, world.units[1], self, 1000000, "true");
    expect(self.memory["renata:burnNext"]).toBeDefined();
    expect(self.deathNotified).toBeFalsy();
    for (let tick = 0; tick < 60 && self.hp > 0.7 * maxAtCredit + 1e-8; tick++) step(world, [idle, idle]);
    expect(self.hp).toBeCloseTo(0.7 * maxAtCredit, 10);
    const hpAtCredit = self.hp, due = world.tick + 30;
    killKarthus(world);
    expect(self.memory["renata:burnNext"]).toBeUndefined();
    expect(self.memory["rune:legend-bloodline:points"]).toBe(1500);
    expect(derive(self).maxHp).toBe(maxAtCredit + 85);
    expect(self.hp).toBeCloseTo(0.2 * maxAtCredit + 85, 10);
    const raw = rawHeal(maxAtCredit, hpAtCredit);
    expect(self.memory["rune:triumph:raw"]).toBeCloseTo(raw, 10);
    expect(raw).not.toBeCloseTo(rawHeal(derive(self).maxHp, self.hp), 10);
    through(world, due);
    expect(self.hp).toBeCloseTo(0.2 * maxAtCredit + 85 + raw, 10);
    expect(self.totals.healing).toBeCloseTo(raw, 10);
  });
});

describe("Triumph at genuine duel termination and native packet boundaries", () => {
  it("finishes an ordinary victory immediately with the future heal still unredeemed", () => {
    const world = arena(equip(fighter({ base: { hp: 1000 } })), fighter());
    const self = world.units[0];
    self.hp = 200;
    dealDamage(world, self, world.units[1], 1000000, "true");
    expect(self.memory["rune:triumph:due"]).toBe(30);
    const result = runWorld(world, [idle, idle]);
    expect(world.result).toEqual({ winner: 0, reason: "death", tick: 0 });
    expect(result.seconds).toBe(0);
    expect(self.hp).toBe(200);
    expect(self.totals.healing).toBe(0);
    expect(world.scheduled).toHaveLength(0);
    expect(world.missiles).toHaveLength(0);
    expect(world.zones).toHaveLength(0);
  });

  it("lets actual Twitch venom keep the duel active and makes the due heal affect survival", () => {
    const prepare = (selected: boolean) => {
      const plain = fighter({ base: { hp: 1000, armor: 0, mr: 0 } });
      const world = arena(selected ? equip(plain) : plain, champion("Twitch", { ap: 1000 }));
      const self = world.units[0], twitch = world.units[1];
      attackHit(world, twitch, self, false, []);
      const poison = self.statuses.find(status => status.kind === "dot")!;
      expect(poison.ability).toBe("I");
      expect(spell(world, "I", 1).persistsAfterDeath).toBe(true);
      expect(poison.dot!.nextTick).toBe(30);
      self.hp = 150;
      dealDamage(world, self, twitch, 1000000, "true");
      expect(twitch.hp).toBeLessThanOrEqual(0);
      expect(twitch.deathNotified).toBe(true);
      through(world, 29);
      expect(world.result).toBeUndefined();
      expect(twitch.alive).toBe(false);
      expect(self.hp).toBe(150);
      return { world, totalPoison: poison.dot!.perHit * 6 };
    };
    const without = prepare(false), withTriumph = prepare(true);
    runWorld(without.world, [idle, idle]);
    runWorld(withTriumph.world, [idle, idle]);
    expect(without.world.result?.winner).toBe("draw");
    expect(withTriumph.world.result).toEqual({ winner: 0, reason: "death", tick: 180 });
    expect(withTriumph.world.units[0].totals.healing).toBeCloseTo(67.5, 10);
    expect(withTriumph.world.units[0].hp).toBeCloseTo(150 + 67.5 - withTriumph.totalPoison, 10);
    expect(withTriumph.world.log.filter(entry => entry.side === 0 && entry.text.startsWith("heals ")).map(entry => entry.tick)).toEqual([30]);
  });

  it.each([29, 30, 31])("resolves actual death-defied Karthus Q at tick %s in the existing zone phase", arrival => {
    const world = arena(equip(fighter({ base: { hp: 1000, armor: 0, mr: 0 } })), champion("Karthus"), 600);
    const self = world.units[0], karthus = world.units[1];
    // 730 center distance lies outside Defile and inside Lay Waste range.
    self.hp = 200;
    killKarthus(world);
    const castAt = arrival - 24;
    through(world, castAt - 1);
    const q = spell(world, "Q", 1);
    expect(canCast(world, karthus, q)).toBe(true);
    startCast(world, karthus, q);
    expect(karthus.action).toMatchObject({ kind: "cast", endTick: castAt + 8 });
    through(world, castAt + 8);
    const blast = world.zones.find(zone => zone.owner === 1 && zone.ability === "Q")!;
    expect(blast).toMatchObject({ kind: "delayedArea", endTick: arrival });
    // Pin the actual packet to its native target; do not branch on an AI dodge.
    blast.connects = true;
    blast.scale = 1;
    through(world, arrival);
    if (arrival === 29) {
      expect(world.result).toEqual({ winner: "draw", reason: "death", tick: 29 });
      expect(self.totals.healing).toBe(0);
    } else {
      expect(world.result).toBeUndefined();
      expect(self.hp).toBeCloseTo(200 + 65 - 232, 10);
      expect(self.totals.healing).toBe(65);
      expect(world.log.filter(entry => entry.side === 0 && entry.text.startsWith("heals ")).map(entry => entry.tick)).toEqual([30]);
    }
  });
});
