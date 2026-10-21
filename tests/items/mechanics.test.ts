/**
 * Item mechanics shared by several items, and the items with the most rules, against
 * synthetic fighters (tests/sim/kits.ts: 2000 health, 100 AD, 100 armor and magic resistance).
 */
import { describe, expect, it } from "vitest";
import type { CCType } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { applyEffect, consumeSpellShield, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { matchupSpecs } from "../../items/equip";
import { activeKey } from "../../items/runtime";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { equipBuild, loadItemCatalog } from "../../pipeline/itemData";
import { castWhenReady, duel, idle, ticksOf } from "../sim/helpers";
import { fighter } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "items.json");
const catalog = await loadItemCatalog(dataset);
const equip = (spec: FighterSpec, ...names: string[]) => equipBuild(spec, names, catalog);
const world = (a: FighterSpec, b: FighterSpec = fighter({ id: "enemy" })): World => createWorld({ fighters: [a, b], distance: 0, modes: ["idle", "idle"] });
/** Runs a unit's onTick from `from` to `to`, as the fight would. */
const tickThrough = (w: World, side: 0 | 1, from: number, to: number) => {
  for (w.tick = from; w.tick <= to; w.tick++) w.units[side].spec.hooks?.onTick?.(hookContext(w, w.units[side]));
};
const hits = (log: Array<{ side: number; text: string }>, side: 0 | 1, source: string) =>
  log.filter((entry) => entry.side === side && entry.text.startsWith(`${source} deals `)).map((entry) => Number(/deals (\d+)/.exec(entry.text)?.[1]));
const spell = (extra: Partial<AbilitySpec> = {}): AbilitySpec => ({ key: "Q", name: "Test Spell", slot: "Q", cooldown: 10, castTime: 0, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }], ...extra });

describe("Energized", () => {
  it("starts full, empowers the next attack, and refills by 6 charges an attack, 15 with Statikk Shiv, all Energized items firing together", () => {
    const outcome = duel(equip(fighter(), "Stormrazor", "Statikk Shiv").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 20 } });
    const attacks = ticksOf(outcome.timeline, 0, "attack deals");
    const storm = ticksOf(outcome.timeline, 0, "Stormrazor deals");
    const shiv = ticksOf(outcome.timeline, 0, "Statikk Shiv deals");
    // The first attack, then the ninth: seven attacks of 15 charges fill 100.
    expect(storm).toEqual([attacks[0], attacks[8]]);
    expect(shiv).toEqual(storm);
    // 100 and 60 magic damage, halved by 100 magic resistance.
    expect(hits(outcome.timeline, 0, "Stormrazor")[0]).toBe(50);
    expect(hits(outcome.timeline, 0, "Statikk Shiv")[0]).toBe(30);
  });

  it("refills one charge for every 24 units moved", () => {
    const w = world(equip(fighter(), "Stormrazor").spec);
    const holder = w.units[0];
    holder.memory["item:energized"] = 0;
    holder.memory["item:energized:x"] = holder.x;
    holder.x += 24 * 50;
    tickThrough(w, 0, 1, 1);
    expect(holder.memory["item:energized"]).toBeCloseTo(50, 10);
  });
});

describe("damage the enemy takes from the holder's items", () => {
  it("Shadowflame: the holder's magic damage deals 120% to an enemy below 40% health", () => {
    const [you, enemy] = matchupSpecs(equip(fighter(), "Shadowflame"), equip(fighter({ id: "enemy" })));
    const at = (share: number) => {
      const w = world(you, enemy);
      w.units[1].hp = share * 2000;
      const before = w.units[1].hp;
      dealDamage(w, w.units[0], w.units[1], 100, "magic", { ability: "Test Spell" });
      return before - w.units[1].hp;
    };
    expect(at(0.3) / at(0.5)).toBeCloseTo(1.2, 10);
  });

  it("Abyssal Mask: an enemy within 700 units takes 12% more magic damage", () => {
    const w = world(equip(fighter(), "Abyssal Mask").spec);
    tickThrough(w, 0, 0, 0);
    expect(derive(w.units[1]).magicReduction).toEqual([-0.12]);
    w.units[1].x += 2000;
    tickThrough(w, 0, 1, 1);
    expect(derive(w.units[1]).magicReduction).toEqual([]);
  });

  it("Frozen Heart: an enemy within 700 units attacks 20% slower", () => {
    const w = world(equip(fighter(), "Frozen Heart").spec);
    tickThrough(w, 0, 0, 0);
    expect(derive(w.units[1]).attackSpeed).toBeCloseTo(0.625 * 0.8, 10);
  });

  it("Lord Dominik's Regards: 1% more damage for each 100 of the enemy's bonus health, up to 15%", () => {
    const w = world(equip(fighter(), "Lord Dominik's Regards").spec, fighter({ id: "enemy", bonus: { hp: 1000 } }));
    tickThrough(w, 0, 0, 0);
    expect(derive(w.units[0]).damageDealt).toEqual([expect.closeTo(0.1, 10)]);
  });
});

describe("defensive passives", () => {
  it("Annul: a spell shield when the fight starts, back 40 seconds after the holder last took damage", () => {
    const w = world(equip(fighter(), "Banshee's Veil").spec);
    const [holder, enemy] = w.units;
    const shields = () => holder.statuses.filter((status) => status.key === "spellShield").length;
    expect(shields()).toBe(1);
    consumeSpellShield(w, enemy, holder);
    expect(shields()).toBe(0);
    w.tick = 300;
    holder.spec.hooks!.onDamageTaken!({ ...hookContext(w, holder), amount: 10, absorbed: 0, mitigated: 10, raw: 20, damageType: "physical", persistent: false });
    tickThrough(w, 0, 301, 300 + 1199);
    expect(shields()).toBe(0);
    tickThrough(w, 0, 300 + 1200, 300 + 1200);
    expect(shields()).toBe(1);
  });

  it("Guardian Angel: lethal damage puts the holder in stasis for 4 seconds, then heals it for half its base health", () => {
    const w = world(equip(fighter(), "Guardian Angel").spec);
    const [holder, enemy] = w.units;
    holder.hp = 10;
    dealDamage(w, enemy, holder, 1000, "physical", { attack: true });
    expect(holder.alive).toBe(true);
    expect(holder.hp).toBe(1);
    expect(holder.statuses.some((status) => status.kind === "state" && status.key === "stasis")).toBe(true);
    tickThrough(w, 0, 1, 120);
    expect(holder.hp).toBe(1 + 1000);
    // Only once (the fight's tick loop ends the stasis).
    holder.statuses = holder.statuses.filter((status) => status.endTick > w.tick);
    holder.hp = 10;
    dealDamage(w, enemy, holder, 10000, "physical", { attack: true });
    expect(holder.hp).toBeLessThanOrEqual(0);
  });

  it("Death's Dance: a melee holder takes 30% of each physical or magic hit later, as true damage over 3 seconds", () => {
    const w = world(equip(fighter(), "Death's Dance").spec);
    const [holder, enemy] = w.units;
    const before = holder.hp;
    // 200 physical into the holder's 150 armor (100 + 50) is 80.
    dealDamage(w, enemy, holder, 200, "physical", { attack: true });
    expect(before - holder.hp).toBeCloseTo(80 * 0.7, 6);
    const bleed = holder.statuses.find((status) => status.kind === "dot");
    expect(bleed?.dot).toMatchObject({ damageType: "true", label: "Death's Dance", intervalTicks: 30 });
    expect(bleed!.dot!.perHit * 3).toBeCloseTo(80 * 0.3, 6);
  });

  it("Kaenic Rookern: a shield against magic damage of 15% of maximum health when the fight starts", () => {
    const w = world(equip(fighter(), "Kaenic Rookern").spec);
    const shield = w.units[0].statuses.find((status) => status.kind === "shield");
    expect(shield).toMatchObject({ shieldType: "magic", value: 0.15 * 2400 });
  });

  it("Thornmail: an attacker's basic attacks cost it magic damage and inflict Grievous Wounds", () => {
    const outcome = duel(equip(fighter(), "Thornmail").spec, fighter({ id: "enemy" }), { behaviors: [idle, undefined], settings: { maxSeconds: 2 } });
    // 20 + 10% of 75 bonus armor, halved by 100 magic resistance.
    expect(hits(outcome.timeline, 0, "Thornmail")[0]).toBe(Math.round(27.5 / 2));
  });
});

describe("item haste", () => {
  const ultimate: AbilitySpec = { key: "R", name: "Ultimate", slot: "R", cooldown: 100, castTime: 0, delivery: { kind: "self" } };
  const stun: AbilitySpec = spell({ key: "E", slot: "E", onHit: [{ type: "cc", cc: "stun", duration: 1 }] });
  const cooldownOf = (spec: FighterSpec, key: string) => {
    const w = world(spec);
    const ability = spec.abilities.find((a) => a.key === key)!;
    const ah = derive(w.units[0]).abilityHaste;
    return (ability.cooldownFor?.(w.units[0]) ?? ability.cooldown) * 100 / (100 + ah);
  };

  it("adds ultimate haste to the ultimate only (Experimental Hexplate's 30)", () => {
    const spec = equip(fighter({ abilities: [ultimate, spell()] }), "Experimental Hexplate").spec;
    expect(cooldownOf(spec, "R")).toBeCloseTo(100 * 100 / 130, 10);
    expect(cooldownOf(spec, "Q")).toBeCloseTo(10, 10);
  });

  it("adds basic ability haste to Q, W and E (Spear of Shojin's 25), and Imperial Mandate's 20 to immobilizing abilities", () => {
    expect(cooldownOf(equip(fighter({ abilities: [ultimate, spell()] }), "Spear of Shojin").spec, "Q")).toBeCloseTo(10 * 100 / 125, 10);
    const mandate = equip(fighter({ abilities: [spell(), stun] }), "Imperial Mandate").spec;
    // Its 15 ability haste for both, and 20 more for the stun.
    expect(cooldownOf(mandate, "Q")).toBeCloseTo(10 * 100 / 115, 10);
    expect(cooldownOf(mandate, "E")).toBeCloseTo(10 * 100 / 135, 10);
  });
});

describe("items in combat", () => {
  it("Liandry's Torment burns 1% of maximum health every 0.5 seconds for 3 seconds on ability damage", () => {
    const w = world(equip(fighter(), "Liandry's Torment").spec);
    const [holder, enemy] = w.units;
    dealDamage(w, holder, enemy, 100, "magic", { ability: "Test Spell" });
    const burn = enemy.statuses.find((status) => status.kind === "dot" && status.key === activeKey("Liandry's Torment"));
    expect(burn?.dot?.perHit).toBeCloseTo(0.01 * 2000, 10);
    expect(burn?.dot?.intervalTicks).toBe(15);
    // Its own damage doesn't light it again, nor do basic attacks.
    enemy.statuses = enemy.statuses.filter((status) => status !== burn);
    dealDamage(w, holder, enemy, 100, "physical", { attack: true });
    dealDamage(w, holder, enemy, 100, "magic", { ability: "Liandry's Torment", persistent: true });
    expect(enemy.statuses.some((status) => status.kind === "dot")).toBe(false);
  });

  it("Sunfire Aegis: once it takes or deals damage, 20 + 1.5% bonus health magic damage every second to an enemy within 325 units", () => {
    const outcome = duel(equip(fighter(), "Sunfire Aegis").spec, fighter({ id: "enemy" }), { behaviors: [idle, undefined], settings: { maxSeconds: 4 } });
    const burns = ticksOf(outcome.timeline, 0, "Sunfire Aegis deals");
    expect(burns.length).toBeGreaterThanOrEqual(2);
    expect(burns[1]! - burns[0]!).toBe(30);
    expect(hits(outcome.timeline, 0, "Sunfire Aegis")[0]).toBe(Math.round((20 + 0.015 * 350) / 2));
  });

  it("Hollow Radiance: killing a pet erupts where it died, for 30 + 2% bonus health magic damage to an enemy within 350 units", () => {
    const eruption = (offset: number) => {
      const w = world(equip(fighter(), "Hollow Radiance").spec);
      const [holder, enemy] = w.units;
      const pet = spawnPet(w, enemy, { kind: "test", name: "Test pet", hp: 1, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100 }, enemy.x + offset);
      const before = enemy.hp;
      damagePet(w, holder, pet, 100, "physical", true);
      return before - enemy.hp;
    };
    // 30 + 2% of its 400 bonus health, halved by 100 magic resistance; the 350 units reach the enemy's edge (65).
    expect(eruption(415)).toBeCloseTo(19, 10);
    expect(eruption(416)).toBe(0);
  });

  it("Jak'Sho: after 5 seconds in combat, 30% more bonus armor and magic resistance", () => {
    const w = world(equip(fighter(), "Jak'Sho, The Protean").spec);
    const [holder, enemy] = w.units;
    const bonus = derive(holder).armor.bonus;
    dealDamage(w, enemy, holder, 10, "physical", { attack: true });
    for (let t = 30; t <= 150; t += 30) {
      w.tick = t;
      dealDamage(w, enemy, holder, 10, "physical", { attack: true });
      holder.spec.hooks!.onTick!(hookContext(w, holder));
    }
    expect(derive(holder).armor.bonus).toBeCloseTo(bonus * 1.3, 6);
  });

  it("The Collector: a hit that leaves the enemy below 5% of its maximum health executes it", () => {
    const w = world(equip(fighter(), "The Collector").spec);
    const [holder, enemy] = w.units;
    enemy.hp = 140;
    // 100 raw physical into 100 armor less 10 lethality: about 52.6, leaving under 100 (5%).
    dealDamage(w, holder, enemy, 100, "physical", { attack: true });
    expect(enemy.hp).toBe(0);
  });
});

describe("when item actives can be used", () => {
  it("under any crowd control but knock-ups, stuns and suppression, and the cleanse item under all but knock-ups; a dash not while rooted or grounded", () => {
    const w = world(equip(fighter({ abilities: [spell()] }), "Zhonya's Hourglass", "Mercurial Scimitar", "Hextech Rocketbelt").spec);
    const [holder, enemy] = w.units;
    const usable = (key: string) => canCast(w, holder, holder.spec.abilities.find((ability) => ability.key === key)!, true);
    const under = (cc: CCType) => {
      holder.statuses = holder.statuses.filter((status) => status.kind !== "cc");
      applyEffect(w, enemy, holder, { type: "cc", cc, duration: 5 }, { scale: 1 });
      return [cc, usable(activeKey("Zhonya's Hourglass")), usable(activeKey("Mercurial Scimitar")), usable(activeKey("Hextech Rocketbelt")), usable("Q")];
    };
    // Zhonya's Hourglass, Mercurial Scimitar, Hextech Rocketbelt, and the kit's own spell (the wiki's rule).
    expect(under("slow")).toEqual(["slow", true, true, true, true]);
    for (const cc of ["silence", "polymorph", "charm", "fear", "taunt", "berserk"] as const) expect(under(cc)).toEqual([cc, true, true, true, false]);
    for (const cc of ["root", "ground"] as const) expect(under(cc)).toEqual([cc, true, true, false, true]);
    for (const cc of ["stun", "suppression", "sleep"] as const) expect(under(cc)).toEqual([cc, false, true, false, false]);
    for (const cc of ["airborne", "suspension"] as const) expect(under(cc)).toEqual([cc, false, false, false, false]);
  });
});

describe("Tear items and stasis", () => {
  it("are fully stacked by default: Manamune is Muramana, said in the assumptions", () => {
    const mage = { ...fighter({ base: { resource: 1000 } }), resourceType: "Mana" };
    const stacked = equip(mage, "Manamune");
    expect(stacked.items.map((record) => record.name)).toEqual(["Muramana"]);
    expect(stacked.spec.base.resource).toBe(2000);
    expect(stacked.assumptions[0]).toBe("The Tear items are fully stacked: Manamune is Muramana.");
    expect(equipBuild(mage, ["Manamune"], catalog, { stacked: false }).items.map((record) => record.name)).toEqual(["Manamune"]);
  });

  it("Zhonya's Hourglass: the holder can't cast or attack during the stasis", () => {
    const outcome = duel(equip(fighter({ abilities: [spell()] }), "Zhonya's Hourglass").spec, fighter({ id: "enemy" }), {
      behaviors: [(view) => (view.world.tick === 0 ? { kind: "cast", ability: activeKey("Zhonya's Hourglass") } : castWhenReady("Q")(view)), idle],
      settings: { maxSeconds: 4 },
    });
    expect(ticksOf(outcome.timeline, 0, "casts Time Stop")).toEqual([0]);
    expect(ticksOf(outcome.timeline, 0, "casts Test Spell")[0]).toBeGreaterThanOrEqual(75);
  });
});
