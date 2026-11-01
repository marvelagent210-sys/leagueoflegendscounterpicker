/**
 * Item effects on fighters (items/): stats, hooks and actives, against synthetic fighters with
 * plain numbers (tests/sim/kits.ts: 100 AD into 100 armor is 50 damage an attack).
 */
import { describe, expect, it } from "vitest";
import { dealDamage, hookContext } from "../../engine/sim/combat";
import { createWorld } from "../../engine/sim/simulate";
import { derive } from "../../engine/sim/derived";
import type { FighterSpec, KitHooks } from "../../engine/sim/spec";
import { ItemContext } from "../../items/context";
import { type EquippedFighter, composeHooks, equipItems, matchupSpecs } from "../../items/equip";
import { ITEM_MODULES } from "../../items/modules/index";
import { activeKey } from "../../items/runtime";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { equipBuild, findItem, loadItemCatalog } from "../../pipeline/itemData";
import type { ItemRecord } from "../../pipeline/items/records";
import { castWhenReady, duel, idle, ticksOf } from "../sim/helpers";
import { fighter, RANGED } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "items.json");
const catalog = await loadItemCatalog(dataset);
const equip = (spec: FighterSpec, ...names: string[]) => equipBuild(spec, names, catalog);
const world = (a: FighterSpec, b: FighterSpec = fighter()) => createWorld({ fighters: [a, b], distance: 0, modes: ["idle", "idle"] });
/** The damage numbers a side's log shows for a source ("attack", an item's name). */
const hits = (log: Array<{ side: number; text: string }>, side: 0 | 1, source: string) =>
  log.filter((entry) => entry.side === side && entry.text.startsWith(`${source} deals `)).map((entry) => Number(/deals (\d+)/.exec(entry.text)?.[1]));

describe("item stats", () => {
  it("adds shop stats to bought stats, and Infinity Edge's crit damage to the 200%, times the champion's own modifier", () => {
    const edge = equip(fighter(), "Infinity Edge").spec;
    expect(edge.bonus).toEqual({ ad: 75, critChance: 0.25 });
    expect(derive(world(edge).units[0]).critDamage).toBeCloseTo(2.3, 10);
    // Yasuo's critical strikes deal 95% of everyone else's: (200% + 30%) x 0.95.
    expect(derive(world(equip(fighter({ base: { critDamageModifier: 0.95 } }), "Infinity Edge").spec).units[0]).critDamage).toBeCloseTo(2.185, 10);
  });

  it("keeps each item's percentage penetration a source of its own, next to the kit's", () => {
    const kit = fighter({ hooks: { onStart: (ctx) => ctx.buff("innate", "armorPen", 0.1, 1e6) } });
    const unit = world(equip(kit, "Lord Dominik's Regards", "Void Staff", "Sorcerer's Shoes").spec).units[0];
    expect(derive(unit).armorPen.sort()).toEqual([0.1, 0.35]);
    expect(derive(unit).magicPenPercent).toEqual([0.4]);
    expect(derive(unit).magicPen).toBe(12);
  });

  it("gives movement speed, life steal and tenacity as permanent statuses", () => {
    const unit = world(equip(fighter(), "Mercury's Treads", "Phantom Dancer", "Bloodthirster").spec).units[0];
    const d = derive(unit);
    expect(d.tenacity).toBeCloseTo(0.3, 10);
    expect(d.lifeSteal).toBeCloseTo(0.15, 10);
    // (350 + 45) x (1 + 10%), before the soft cap above 415.
    expect(d.rawMoveSpeed).toBeCloseTo(395 * 1.1, 6);
    expect(unit.statuses.some((status) => status.kind === "state" && status.key === "ghosted")).toBe(true);
  });

  it("gives mana and its regeneration to mana champions only, and base health regeneration by its percent", () => {
    const mage = equipBuild(fighter({ base: { resource: 1000, resourceRegen: 10 } }), ["Manamune", "Warmog's Armor"], catalog, { stacked: false });
    expect({ ...mage.spec, resourceType: "Mana" }.base.resource).toBe(1000);
    const manaUser = equipBuild({ ...fighter({ base: { resource: 1000, resourceRegen: 10, hpRegen: 20 } }), resourceType: "Mana" }, ["Manamune", "Warmog's Armor", "Mikael's Blessing"], catalog, { stacked: false });
    expect(manaUser.spec.base.resource).toBe(1500);
    expect(manaUser.spec.base.resourceRegen).toBeCloseTo(20, 10);
    expect(manaUser.spec.base.hpRegen).toBeCloseTo(40, 10);
    expect(mage.coverage.find((entry) => entry.item === "Manamune")?.unmodeled).toContain("Mana: no effect, Dummy doesn't use mana.");
  });

  it("refuses a build holding an item twice, or a ranged-only item on a melee champion", () => {
    expect(() => equip(fighter(), "Infinity Edge", "Infinity Edge")).toThrow(/can't hold Infinity Edge twice/);
    expect(() => equip(fighter(), "Runaan's Hurricane")).toThrow(/Can only be purchased on ranged champions/);
    expect(() => equip(fighter({ attack: RANGED }), "Runaan's Hurricane")).not.toThrow();
  });
});

describe("item hooks", () => {
  it("runs the kit's hooks first, chains damage adjustments, and keeps item actives from the kit's cast hooks", () => {
    const seen: string[] = [];
    const kit: KitHooks = { onCast: (ctx) => seen.push(`kit ${ctx.ability.key}`), modifyDamageTakenRaw: (ctx) => ctx.raw - 10 };
    const item: KitHooks = { onCast: (ctx) => seen.push(`item ${ctx.ability.key}`), modifyDamageTakenRaw: (ctx) => ctx.raw / 2 };
    const hooks = composeHooks(kit, [item])!;
    const ctx = (key: string) => ({ ability: { key } }) as never;
    hooks.onCast!(ctx("Q"));
    hooks.onCast!(ctx(activeKey("Zhonya's Hourglass")));
    expect(seen).toEqual(["kit Q", "item Q", "item item:Zhonya's Hourglass"]);
    expect(hooks.modifyDamageTakenRaw!({ raw: 110 } as never)).toBe(50);
  });

  it("puts the hooks an item has on the enemy's side on the enemy", () => {
    const enemyHook: KitHooks = { onTick: () => undefined };
    const holder: EquippedFighter = { ...equip(fighter(), "Infinity Edge"), enemyHooks: [enemyHook] };
    const [you, enemy] = matchupSpecs(holder, equip(fighter({ id: "enemy" })));
    expect(you.hooks?.onTick).toBeUndefined();
    expect(enemy.hooks?.onTick).toBeDefined();
  });

  it("labels an item's damage with its name, or \"Name (item)\" when the kit has an ability of that name (Leona's Eclipse)", () => {
    const eclipse = { key: "W", name: "Eclipse", slot: "W" as const, cooldown: 10, castTime: 0, delivery: { kind: "target" as const, range: 600 }, onHit: [{ type: "damage" as const, damageType: "magic" as const, amount: { base: 100 } }] };
    const outcome = duel(equip(fighter({ abilities: [eclipse] }), "Eclipse").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 3 } });
    // The kit's Eclipse is ability damage that stacks Ever Rising Moon: with an attack, 8% of
    // the target's 2000 maximum health, halved by armor.
    expect(hits(outcome.timeline, 0, "Eclipse")[0]).toBe(50);
    expect(hits(outcome.timeline, 0, "Eclipse (item)")[0]).toBe(80);
  });

  it("reads each item from the wiki while it is built, never during a fight", () => {
    const context = new ItemContext({ page: "Module:ItemData/data", revid: 1 });
    const item = context.item(findItem(catalog, "Nashor's Tooth"));
    context.seal();
    expect(() => item.stat("ap")).toThrow(/during a fight/);
  });

  it("fails when an item's quoted words are no longer on the wiki", () => {
    const record: ItemRecord = structuredClone(findItem(catalog, "Nashor's Tooth"));
    record.effects[0]!.text = record.effects[0]!.text.replace("15 (+ 15% AP)", "20 (+ 20% AP)");
    expect(() => equipItems(fighter(), [record], { modules: ITEM_MODULES, source: { page: "Module:ItemData/data", revid: 1 } })).toThrow(/Nashor's Tooth: Icathian Bite: the wiki no longer says "Basic attacks deal 15 \(\+ 15% AP\) bonus magic damage on-hit\."/);
  });
});

describe("item effects in fights", () => {
  it("Blade of the Ruined King: 9% of current health on-hit for melee, and a slow on the third hit, then 15 seconds of cooldown", () => {
    const outcome = duel(equip(fighter(), "Blade of the Ruined King").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 20 } });
    // 140 AD into 100 armor is 70; then 9% of the 1930 health left, halved by armor.
    expect(hits(outcome.timeline, 0, "attack")[0]).toBe(70);
    expect(hits(outcome.timeline, 0, "Blade of the Ruined King")[0]).toBe(Math.round(0.09 * 1930 * 0.5));
    const slows = ticksOf(outcome.timeline, 0, "inflicts slow 30% for 1.00 s");
    const attacks = ticksOf(outcome.timeline, 0, "attack deals");
    expect(slows[0]).toBe(attacks[2]);
    // Attacks don't stack while it cools down: the target dies before the next slow.
    expect(attacks.filter((tick) => tick > slows[0]!).length).toBeGreaterThan(3);
    expect(slows).toHaveLength(1);
  });

  it("Nashor's Tooth and Wit's End: their magic damage on-hit, Nashor's with 15% AP", () => {
    const outcome = duel(equip(fighter(), "Nashor's Tooth", "Wit's End").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 3 } });
    // 15 + 15% of 80 AP = 27, and 45, both halved by 100 magic resistance.
    expect(hits(outcome.timeline, 0, "Nashor's Tooth")[0]).toBe(14);
    expect(hits(outcome.timeline, 0, "Wit's End")[0]).toBe(23);
  });

  it("Rabadon's Deathcap: 30% more of all the holder's ability power", () => {
    expect(derive(world(equip(fighter(), "Rabadon's Deathcap").spec).units[0]).ap).toBeCloseTo(130 * 1.3, 0);
    expect(derive(world(equip(fighter(), "Rabadon's Deathcap", "Nashor's Tooth").spec).units[0]).ap).toBeCloseTo(210 * 1.3, 0);
  });

  it("Sterak's Gage: half its base AD as bonus AD, and a shield of 60% bonus health that decays over 4.5 seconds when a hit would take it below 30%", () => {
    const sterak = equip(fighter(), "Sterak's Gage").spec;
    expect(sterak.bonus?.ad).toBe(50);
    const outcome = duel(sterak, fighter({ base: { ad: 600 } }), { behaviors: [idle, undefined], settings: { maxSeconds: 2 }, setup: (w) => (w.units[0].hp = 1000) });
    // 300 damage an attack would take 1000 health to 700, below 30% of 2400 (720): a shield of 60% of 400 bonus health takes 240 of it.
    expect(outcome.timeline.find((entry) => entry.side === 1 && entry.text.startsWith("attack deals"))?.text).toBe("attack deals 300 physical damage (240 absorbed)");
    // A smaller hit leaves some of it, which decays at 240 over 4.5 seconds (135 ticks).
    const w = world(sterak);
    const [holder, enemy] = w.units;
    holder.hp = 750;
    dealDamage(w, enemy, holder, 200, "physical", { attack: true });
    const shield = () => holder.statuses.find((status) => status.kind === "shield")?.value ?? 0;
    expect(shield()).toBeCloseTo(240 - 100, 6);
    for (w.tick = 1; w.tick <= 30; w.tick++) holder.spec.hooks!.onTick!(hookContext(w, holder));
    expect(shield()).toBeCloseTo(140 - 30 * (240 / 135), 6);
    for (; w.tick <= 90; w.tick++) holder.spec.hooks!.onTick!(hookContext(w, holder));
    expect(shield()).toBe(0);
  });

  it("Zhonya's Hourglass: the active puts its holder in stasis for 2.5 seconds, out of the kit's cast hooks", () => {
    let kitCasts = 0;
    const holder = equip(fighter({ hooks: { onCast: () => kitCasts++ } }), "Zhonya's Hourglass").spec;
    const outcome = duel(holder, fighter(), { behaviors: [castWhenReady(activeKey("Zhonya's Hourglass")), undefined], settings: { maxSeconds: 4 } });
    expect(ticksOf(outcome.timeline, 0, "casts Time Stop")).toEqual([0]);
    // In stasis it can't be targeted: the enemy's first attack starts once the 2.5 seconds (75 ticks) are over.
    const taken = ticksOf(outcome.timeline, 1, "attack deals");
    expect(taken[0]).toBeGreaterThanOrEqual(75);
    expect(taken[0]).toBeLessThanOrEqual(75 + 16);
    expect(kitCasts).toBe(0);
  });

  it("Black Cleaver: physical damage stacks 6% armor reduction on the enemy, up to 30%", () => {
    const w = world(equip(fighter(), "Black Cleaver").spec);
    const [holder, enemy] = w.units;
    for (let i = 0; i < 7; i++) holder.spec.hooks!.onDamageDealt!({ ...hookContext(w, holder), tick: i, amount: 50, absorbed: 0, mitigated: 50, raw: 100, damageType: "physical", persistent: false, attack: true });
    expect(derive(enemy).armorReduction.percent).toEqual([expect.closeTo(0.3, 10)]);
  });

  it("Mortal Reminder: physical damage inflicts Grievous Wounds, refreshed rather than stacked", () => {
    const w = world(equip(fighter(), "Mortal Reminder").spec);
    const [holder, enemy] = w.units;
    const ctx = { ...hookContext(w, holder), amount: 50, absorbed: 0, mitigated: 50, raw: 100, persistent: false, attack: true };
    holder.spec.hooks!.onDamageDealt!({ ...ctx, tick: 0, damageType: "magic" });
    expect(enemy.statuses.filter((status) => status.kind === "grievousWounds")).toHaveLength(0);
    holder.spec.hooks!.onDamageDealt!({ ...ctx, tick: 0, damageType: "physical" });
    w.tick = 30;
    holder.spec.hooks!.onDamageDealt!({ ...ctx, tick: 30, damageType: "physical" });
    expect(enemy.statuses.filter((status) => status.kind === "grievousWounds").map((status) => status.endTick)).toEqual([30 + 90]);
  });

  it("Kraken Slayer: every third attack of a melee champion deals 210 bonus physical damage, more against a hurt target", () => {
    const outcome = duel(equip(fighter(), "Kraken Slayer").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 8 } });
    const blows = hits(outcome.timeline, 0, "Kraken Slayer");
    expect(blows.length).toBeGreaterThanOrEqual(1);
    const attacks = ticksOf(outcome.timeline, 0, "attack deals");
    expect(ticksOf(outcome.timeline, 0, "Kraken Slayer deals")[0]).toBe(attacks[2]);
    // 145 AD into 100 armor is 72.5 an attack: after two, the target has lost 145 of 2000 (7.25%).
    const missing = (2 * 72.5 + 72.5) / 2000;
    expect(blows[0]).toBe(Math.round(210 * (1 + 0.75 * missing) * 0.5));
  });

  it("Trinity Force: after an ability, the next attack deals 200% base AD more, then 1.5 seconds of cooldown", () => {
    const spell = { key: "Q", name: "Q", slot: "Q" as const, cooldown: 1, castTime: 0, delivery: { kind: "self" as const }, roles: ["buff" as const] };
    const outcome = duel(equip(fighter({ abilities: [spell] }), "Trinity Force").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 6 } });
    // 200 bonus physical damage, halved by armor.
    expect(hits(outcome.timeline, 0, "Trinity Force")[0]).toBe(100);
    const procs = ticksOf(outcome.timeline, 0, "Trinity Force deals");
    for (let i = 1; i < procs.length; i++) expect(procs[i]! - procs[i - 1]!).toBeGreaterThanOrEqual(45);
  });

  it("Guinsoo's Rageblade: attack speed stacks to 32%, then every third attack repeats its on-hit effects", () => {
    const outcome = duel(equip(fighter(), "Guinsoo's Rageblade").spec, fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 10 } });
    // Wrath's 30 magic damage, halved: once an attack, and once more on each Phantom Hit.
    const wrath = ticksOf(outcome.timeline, 0, "Guinsoo's Rageblade deals");
    const attacks = ticksOf(outcome.timeline, 0, "attack deals");
    expect(wrath.length).toBeGreaterThan(attacks.length);
    // The first Phantom Hit: on the seventh attack, 0.15 seconds (5 ticks) after it lands.
    expect(wrath.filter((tick) => !attacks.includes(tick))[0]).toBe(attacks[6]! + 5);
  });
});

describe("the item modules", () => {
  const champions = [fighter({ id: "melee" }), { ...fighter({ id: "ranged", attack: RANGED }), resourceType: "Mana" }];

  it("are all catalog items and still read their words from the committed wiki data, for melee and ranged champions", () => {
    for (const name of Object.keys(ITEM_MODULES)) {
      expect([...catalog.items, ...catalog.transforms].map((record) => record.name)).toContain(name);
      const rangedOnly = /only be purchased on ranged champions/.test(findItem(catalog, name).restriction ?? "");
      for (const spec of champions) if (spec.attack.ranged || !rangedOnly) expect(() => equip(spec, name), `${spec.id}: ${name}`).not.toThrow();
    }
  });

  it("say what each item's model leaves out", () => {
    const covered = catalog.items.map((record) => equip(fighter({ attack: RANGED }), record.name).coverage[0]!);
    for (const entry of covered) {
      const record = findItem(catalog, entry.item);
      // Every effect is either modeled or left out with a reason.
      for (const effect of record.effects) {
        const name = effect.name ?? effect.slot;
        expect(entry.modeled.includes(name) || entry.unmodeled.some((text) => text.startsWith(`${name}:`)), `${entry.item}: ${name}`).toBe(true);
      }
    }
  });
});
