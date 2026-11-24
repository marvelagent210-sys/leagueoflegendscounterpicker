/**
 * Summoner spells on fighters (summoners/): their effects, read from the committed spell catalog
 * at level 20, which crowd control stops them, when the default behavior casts them, and how
 * they sit with the kit and the items. Synthetic fighters with plain numbers (tests/sim/kits.ts:
 * 2,000 health, 100 armor, 100 AD).
 */
import { describe, expect, it } from "vitest";
import type { CCType } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { defaultBehavior } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, KitHooks } from "../../engine/sim/spec";
import type { Mode, World } from "../../engine/sim/state";
import { activeKey } from "../../items/runtime";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { type LoadoutFighter, equipBuild, loadItemCatalog, loadSpellCatalog } from "../../pipeline/itemData";
import { spellKey } from "../../summoners/equip";
import { castWhenReady, duel, idle, lasting, ticksOf } from "../sim/helpers";
import { RANGED, ability, fighter } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "summoners.json");
const [items, spells] = await Promise.all([loadItemCatalog(dataset), loadSpellCatalog(dataset)]);
const holding = (spec: FighterSpec, names: string[], build: string[] = []): LoadoutFighter => equipBuild(spec, build, items, { spells: { names, catalog: spells } });
const spec = (...names: string[]) => holding(fighter(), names).spec;
const world = (a: FighterSpec, b: FighterSpec = fighter({ id: "enemy" }), modes: [Mode, Mode] = ["idle", "idle"]): World => createWorld({ fighters: [a, b], distance: 0, modes });
const active = (s: FighterSpec, key: string): AbilitySpec => {
  const found = s.abilities.find((candidate) => candidate.key === key);
  if (!found) throw new Error(`No ability ${key} (has ${s.abilities.map((a) => a.key).join(", ")})`);
  return found;
};
/** A fighter with one channel of its own, holding Ignite. */
const holdingSpin = (spin: AbilitySpec) => holding(fighter({ abilities: [spin] }), ["Ignite"]).spec;
/** The damage numbers a side's log shows for a source. */
const hits = (log: Array<{ side: number; text: string }>, side: 0 | 1, source: string) =>
  log.filter((entry) => entry.side === side && entry.text.startsWith(`${source} deals `)).map((entry) => Number(/deals (\d+)/.exec(entry.text)?.[1]));

describe("summoner spells on a fighter", () => {
  it("are actives apart from the kit's: no cast time, a static cooldown, not a champion cast, past spell shields", () => {
    const ignite = active(spec("Ignite"), spellKey("Ignite"));
    expect(ignite).toMatchObject({ name: "Ignite", slot: "other", castTime: 0, cooldown: 180, staticCooldown: true, countsAsCast: false, budgetExcluded: true, delivery: { kind: "target", range: 600 } });
    expect(ignite.flags?.spellShield).toBe(false);
  });

  it("are two at most, each once, by their catalog names", () => {
    expect(() => spec("Flash", "Ignite", "Heal")).toThrow("A champion holds 2 summoner spells, not 3");
    expect(() => spec("Flash", "flash")).toThrow("A champion can't hold Flash twice");
    expect(() => spec("Clarity")).toThrow(/No summoner spell "Clarity" \(Summoner's Rift has Barrier, Cleanse/);
  });

  it("record what they read from the wiki, with its revision, and what they assume", () => {
    const fighterSpells = holding(fighter(), ["Ignite", "Exhaust"]).spells!;
    const pages = new Set(fighterSpells.evidence.map((entry) => `${entry.page} ${entry.revid}`));
    expect(pages).toContain(`Module:SpellData/data ${spells.sources.spellData.revid}`);
    expect(pages).toContain(`Ignite ${spells.spells.find((record) => record.name === "Ignite")!.article.revid}`);
    expect([...pages].some((page) => page.startsWith("Template:Tip data/Cast-inhibiting crowd control "))).toBe(true);
    expect(fighterSpells.evidence).toContainEqual(expect.objectContaining({ spell: "Ignite", page: "Module:SpellData/data", text: "cooldown: 180" }));
    expect(fighterSpells.assumptions).toContain("Summoner spells but Flash are cast during the champion's own casts, channels, dashes and attack windups without interrupting them (the wiki says channels may allow or forbid summoner spells, and lists none that forbid them); Flash waits for them, as movement does.");
    expect(fighterSpells.coverage.map((entry) => [entry.spell, entry.modeled])).toEqual([["Ignite", true], ["Exhaust", true]]);
  });

  it("leave Smite and Teleport out of duels, saying why", () => {
    const outside = holding(fighter(), ["Smite", "Teleport"]);
    expect(outside.spec.abilities).toEqual([]);
    expect(outside.spells!.coverage).toEqual([
      { spell: "Smite", modeled: false, unmodeled: ["A jungler's spell (Role Binding): it hits monsters and minions, and champions only once a jungle pet makes it Unleashed Smite. A duel has neither jungle nor roles."] },
      { spell: "Teleport", modeled: false, unmodeled: ["It travels to an allied turret, minion or ward, and a duel has none."] },
    ]);
  });

  it("are hidden from the kit's cast hooks but not from the items', and their damage isn't the kit's ability damage", () => {
    const seen: string[] = [];
    const kit = fighter({ hooks: { onCast: (ctx) => seen.push(`kit ${ctx.ability.key}`) } satisfies KitHooks });
    const w = world(holding(kit, ["Ignite"], ["Liandry's Torment"]).spec);
    const [holder, enemy] = w.units;
    holder.spec.hooks!.onCast!({ world: w, self: holder, enemy, tick: 0, memory: holder.memory, ability: active(holder.spec, spellKey("Ignite")) } as never);
    expect(seen).toEqual([]);
    // Liandry's Torment burns on ability damage: Ignite's isn't.
    dealDamage(w, holder, enemy, 100, "true", { ability: "Ignite", persistent: true });
    expect(enemy.statuses.some((status) => status.kind === "dot" && status.key !== spellKey("Ignite"))).toBe(false);
  });
});

describe("which crowd control stops summoner spells", () => {
  it("stasis and suppression stop all of them; the other crowd control that stops casting stops only Flash, and root and ground stop Flash too", () => {
    const w = world(spec("Flash", "Barrier"));
    const [holder, enemy] = w.units;
    const usable = (key: string) => canCast(w, holder, active(holder.spec, key), true);
    const under = (cc: CCType) => {
      holder.statuses = holder.statuses.filter((status) => status.kind !== "cc");
      applyEffect(w, enemy, holder, { type: "cc", cc, duration: 5 }, { scale: 1 });
      return [cc, usable(spellKey("Flash")), usable(spellKey("Barrier"))];
    };
    for (const cc of ["slow", "blind", "disarm", "cripple", "nearsight", "drowsy"] as const) expect(under(cc)).toEqual([cc, true, true]);
    for (const cc of ["root", "ground", "airborne", "suspension", "stun", "sleep", "silence", "polymorph", "charm", "fear", "taunt", "berserk"] as const) expect(under(cc)).toEqual([cc, false, true]);
    for (const cc of ["suppression", "stasis"] as const) expect(under(cc)).toEqual([cc, false, false]);
    holder.statuses = [lasting("state", "stasis")];
    expect([usable(spellKey("Flash")), usable(spellKey("Barrier"))]).toEqual([false, false]);
  });
});

describe("Ignite", () => {
  it("burns for 525 true damage in five ticks of 105, the first with the cast, then every 1.056 seconds, with Grievous Wounds for 5 seconds", () => {
    const outcome = duel(spec("Ignite"), fighter(), { distance: 400, behaviors: [castWhenReady(spellKey("Ignite")), idle], settings: { maxSeconds: 6 } });
    expect(hits(outcome.timeline, 0, "Ignite")).toEqual([105, 105, 105, 105, 105]);
    // Ticks of 1/30 s: 1.056 seconds round to 32.
    expect(ticksOf(outcome.timeline, 0, "Ignite deals")).toEqual([0, 32, 64, 96, 128]);
    const w = world(spec("Ignite"));
    const [holder, enemy] = w.units;
    applyEffect(w, holder, enemy, active(holder.spec, spellKey("Ignite")).onHit![2]!, { scale: 1 });
    expect(enemy.statuses.find((status) => status.kind === "grievousWounds")?.endTick).toBe(150);
  });

  it("isn't raised by damage amplifiers on either side, as the wiki says", () => {
    const outcome = duel(spec("Ignite"), fighter(), {
      distance: 400,
      behaviors: [castWhenReady(spellKey("Ignite")), idle],
      settings: { maxSeconds: 6 },
      setup: (w) => {
        // The holder deals 20% more damage, and its target takes 20% more.
        w.units[0].statuses.push(lasting("stat", "damageDealt", 0.2));
        w.units[1].statuses.push(lasting("state", "damageReduction", -0.2));
      },
    });
    expect(hits(outcome.timeline, 0, "Ignite")).toEqual([105, 105, 105, 105, 105]);
  });

  it("is cast during the champion's own channel, which goes on", () => {
    const spin = ability({ key: "E", cooldown: 100, delivery: { kind: "self" }, channel: { duration: 3, interruptible: false, mobile: true } });
    const w = createWorld({ fighters: [holdingSpin(spin), fighter({ id: "enemy" })], distance: 300, modes: ["fight", "idle"] });
    step(w, [castWhenReady("E"), idle]);
    expect(w.units[0].action?.kind).toBe("channel");
    for (let i = 0; i < 5; i++) step(w, [defaultBehavior, idle]);
    expect(w.units[0].cooldownReady[spellKey("Ignite")]).toBeGreaterThan(w.tick);
    expect(w.units[0].action?.kind).toBe("channel");
  });

  it("is kept while its holder is stealthed", () => {
    const w = world(spec("Ignite"));
    const [holder] = w.units;
    holder.statuses.push(lasting("state", "invisible"));
    expect(canCast(w, holder, active(holder.spec, spellKey("Ignite")), true)).toBe(false);
  });
});

describe("Exhaust", () => {
  it("slows by 40% and cuts the target's damage by 35% for 3 seconds, but not its true damage", () => {
    const w = world(spec("Exhaust"));
    const [holder, enemy] = w.units;
    for (const effect of active(holder.spec, spellKey("Exhaust")).onHit!) applyEffect(w, holder, enemy, effect, { scale: 1, ability: active(holder.spec, spellKey("Exhaust")) });
    // 40% off 350 is 210, which the soft cap below 220 raises to 215.
    expect(derive(enemy).rawMoveSpeed).toBeCloseTo(350 * 0.6, 6);
    expect(derive(enemy).moveSpeed).toBeCloseTo(215, 6);
    const before = holder.hp;
    dealDamage(w, enemy, holder, 200, "physical");
    // 200 into 100 armor is 100, then 35% less.
    expect(before - holder.hp).toBeCloseTo(65, 6);
    const left = holder.hp;
    dealDamage(w, enemy, holder, 100, "true");
    expect(left - holder.hp).toBeCloseTo(100, 6);
  });
});

describe("Cleanse", () => {
  it("removes the crowd control it lists but not airborne, and gives 75% tenacity for 3 seconds", () => {
    const w = world(spec("Cleanse"));
    const [holder, enemy] = w.units;
    for (const cc of ["stun", "root", "slow", "airborne"] as const) applyEffect(w, enemy, holder, { type: "cc", cc, duration: 5 }, { scale: 1 });
    for (const effect of active(holder.spec, spellKey("Cleanse")).onSelf!) applyEffect(w, holder, holder, effect, { scale: 1 });
    expect(holder.statuses.filter((status) => status.kind === "cc").map((status) => status.key)).toEqual(["airborne"]);
    expect(derive(holder).tenacity).toBeCloseTo(0.75, 10);
  });

  it("is cast under a stun, and removes the stun, the enemy's Ignite burn and both parts of Exhaust, keeping Grievous Wounds", () => {
    const w = createWorld({ fighters: [spec("Cleanse"), spec("Ignite", "Exhaust")], distance: 400, modes: ["hold", "idle"] });
    const [holder, enemy] = w.units;
    for (const key of [spellKey("Ignite"), spellKey("Exhaust")]) {
      const cast = active(enemy.spec, key);
      for (const effect of cast.onHit!) applyEffect(w, enemy, holder, effect, { scale: 1, ability: cast });
    }
    applyEffect(w, enemy, holder, { type: "cc", cc: "stun", duration: 2 }, { scale: 1 });
    const kinds = () => holder.statuses.filter((status) => status.source === 1).map((status) => `${status.kind} ${status.key}`).sort();
    expect(kinds()).toEqual(["cc slow", "cc stun", "dot summoner:Ignite", "grievousWounds grievousWounds", "stat damageDealt"]);
    step(w, [defaultBehavior, idle]);
    expect(holder.cooldownReady[spellKey("Cleanse")]).toBeGreaterThan(w.tick);
    expect(kinds()).toEqual(["grievousWounds grievousWounds"]);
  });

  it("strips Exhaust's damage reduction, which other cleanses leave", () => {
    const w = world(spec("Cleanse"), spec("Exhaust"));
    const [holder, enemy] = w.units;
    const exhaust = active(enemy.spec, spellKey("Exhaust"));
    for (const effect of exhaust.onHit!) applyEffect(w, enemy, holder, effect, { scale: 1, ability: exhaust });
    applyEffect(w, enemy, holder, { type: "grievousWounds", duration: 5 }, { scale: 1 });
    expect(derive(holder).damageDealt).toEqual([-0.35]);
    const cleanse = active(holder.spec, spellKey("Cleanse"));
    for (const effect of cleanse.onSelf!) applyEffect(w, holder, holder, effect, { scale: 1, ability: cleanse });
    expect(derive(holder).damageDealt).toEqual([-0.35]);
    holder.spec.hooks!.onCast!({ world: w, self: holder, enemy, tick: 0, memory: holder.memory, ability: cleanse } as never);
    expect(derive(holder).damageDealt).toEqual([]);
    expect(holder.statuses.some((status) => status.kind === "grievousWounds")).toBe(true);
  });
});

describe("Barrier, Heal and Ghost", () => {
  it("Barrier shields for 502 for 2.5 seconds, cast in combat below 90% health", () => {
    const shield = active(spec("Barrier"), spellKey("Barrier")).onSelf![0]!;
    expect(shield).toMatchObject({ type: "shield", duration: 2.5 });
    expect(shield.type === "shield" && shield.amount.base).toBeCloseTo(100 + (360 / 17) * 19, 6);
    const outcome = duel(spec("Barrier"), fighter({ id: "enemy", bonus: { ad: 100 } }), { settings: { maxSeconds: 8 } });
    const cast = ticksOf(outcome.timeline, 0, "casts Barrier");
    expect(cast).toHaveLength(1);
    expect(outcome.timeline.some((entry) => entry.side === 1 && entry.tick >= cast[0]! && /absorbed/.test(entry.text))).toBe(true);
  });

  it("Heal restores 346 with 30% bonus movement speed for a second, once it would restore all of it", () => {
    const heal = active(spec("Heal"), spellKey("Heal"));
    expect(heal.onSelf).toEqual([{ type: "heal", amount: { base: 346 } }, { type: "stat", stat: "moveSpeedPercent", amount: { base: 0.3 }, duration: 1 }]);
    const w = world(spec("Heal"));
    const [holder] = w.units;
    holder.hp = 2000 - 300;
    expect(canCast(w, holder, active(holder.spec, spellKey("Heal")), true)).toBe(false);
    holder.hp = 2000 - 346;
    expect(canCast(w, holder, active(holder.spec, spellKey("Heal")), true)).toBe(true);
  });

  it("Ghost gives 50.8% bonus movement speed and ghosting for 10 seconds, cast to close the gap", () => {
    const ghost = active(spec("Ghost"), spellKey("Ghost"));
    expect(ghost.onSelf![0]).toMatchObject({ type: "stat", stat: "moveSpeedPercent", duration: 10 });
    expect(ghost.onSelf![1]).toEqual({ type: "state", state: "ghosted", duration: 10 });
    const outcome = duel(spec("Ghost"), fighter({ id: "enemy", attack: RANGED }), { distance: 700, modes: ["fight", "kite"], settings: { maxSeconds: 2 } });
    expect(ticksOf(outcome.timeline, 0, "casts Ghost")).toEqual([0]);
  });
});

describe("Flash", () => {
  it("blinks 400 units, toward the enemy for the side that doesn't out-range it, and away for the one that does, on one cooldown", () => {
    const melee = world(spec("Flash"), fighter({ id: "enemy", attack: RANGED }), ["fight", "fight"]);
    const [holder] = melee.units;
    const [toward, away] = [active(holder.spec, spellKey("Flash")), active(holder.spec, spellKey("Flash", "away"))];
    expect([toward.delivery, away.delivery]).toEqual([{ kind: "blink", direction: "toward", distance: 400 }, { kind: "blink", direction: "away", distance: 400 }]);
    expect(away.cooldownKey).toBe(spellKey("Flash"));
    expect([canCast(melee, holder, toward, true), canCast(melee, holder, away, true)]).toEqual([true, false]);
    const ranged = world(holding(fighter({ attack: RANGED }), ["Flash"]).spec, fighter({ id: "enemy" }), ["fight", "fight"]);
    expect([canCast(ranged, ranged.units[0], toward, true), canCast(ranged, ranged.units[0], away, true)]).toEqual([false, true]);
    // Fleeing, either side flashes away.
    const fleeing = world(spec("Flash"), fighter({ id: "enemy", attack: RANGED }), ["flee", "fight"]);
    expect([canCast(fleeing, fleeing.units[0], toward, true), canCast(fleeing, fleeing.units[0], away, true)]).toEqual([false, true]);
  });

  it("dodges a decisive skillshot, and isn't spent closing the gap", () => {
    const stun = ability({ key: "Q", cooldown: 30, castTime: 0.25, delivery: { kind: "line", range: 1100, width: 140, speed: 1200 }, onHit: [{ type: "cc", cc: "stun", duration: 2 }] });
    const outcome = duel(fighter({ id: "enemy", abilities: [stun], attack: RANGED }), spec("Flash"), { distance: 600, behaviors: [castWhenReady("Q"), undefined], settings: { maxSeconds: 1.5 } });
    expect(ticksOf(outcome.timeline, 1, "dodges with Flash")).toHaveLength(1);
    expect(outcome.timeline.some((entry) => entry.side === 0 && entry.text.startsWith("inflicts stun"))).toBe(false);
    const chase = duel(spec("Flash"), fighter({ id: "enemy", attack: RANGED }), { distance: 600, modes: ["fight", "kite"], settings: { maxSeconds: 4 } });
    expect(ticksOf(chase.timeline, 0, "casts Flash")).toEqual([]);
  });
});

describe("items and summoner spells together", () => {
  it("keep each other's actives: an item's key and a spell's", () => {
    const both = holding(fighter(), ["Flash"], ["Zhonya's Hourglass"]).spec;
    expect(both.abilities.map((a) => a.key)).toEqual([activeKey("Zhonya's Hourglass"), spellKey("Flash"), spellKey("Flash", "away")]);
  });
});
