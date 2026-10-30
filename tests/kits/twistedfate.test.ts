import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { applyCC, applyEffect, canSee, hookContext, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { BonusStats, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Aim, type World } from "../../engine/sim/state";
import TwistedFate from "../../kits/champions/TwistedFate";
import { ability, fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const idle: Behavior = () => undefined;
const compile = (firstCard = 0, deckStacks = 0) => compileKit(championData("TwistedFate"), records("TwistedFate"), TwistedFate, { firstCard, deckStacks });
const compiled = compile();
const arena = (firstCard = 0, deckStacks = 0, bonus: BonusStats = {}, distance = 400) => {
  const c = firstCard || deckStacks ? compile(firstCard, deckStacks) : compiled;
  const w = createWorld({ fighters: [{ ...c.spec, base: { ...c.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus }, fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, reactionTime: 1, maxSeconds: 120 } });
  w.units[0].x = 0; w.units[1].x = distance;
  return w;
};
const spell = (w: World, key: string) => w.units[0].spec.abilities.find(a => a.key === key)!;
const through = (w: World, end: number) => { while (w.tick <= end && !w.result) step(w, [idle, idle]); };
const cast = (w: World, key: string, aim?: Aim) => { expect(canCast(w, w.units[0], spell(w, key))).toBe(true); startCast(w, w.units[0], spell(w, key), aim); };
const state = (w: World, key: StateType) => applyEffect(w, w.units[1], w.units[1], { type: "state", state: key, duration: 30 }, { scale: 1 });
const select = (w: World) => { cast(w, "W"); cast(w, "W-lock"); };
const hit = (w: World, pet?: ReturnType<typeof spawnPet>) => { startAttack(w, w.units[0], pet); through(w, w.tick + 35); };
const body = (w: World, x: number, changes: Partial<PetSpec> = {}) => spawnPet(w, w.units[1], { kind: "actual-minion", name: "Actual minion", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 120, targetClass: "minion", ...changes }, x);

describe("Twisted Fate source contracts and explicit histories", () => {
  it("compiles all five primary abilities and exact binary support", () => {
    expect(new Set(compiled.evidence.filter(e => e.revid > 0).map(e => e.ability))).toEqual(new Set(["Loaded Dice", "Wild Cards", "Pick a Card", "Stacked Deck", "Destiny"]));
    expect(compiled.evidence.filter(e => e.revid === 0).length).toBeGreaterThan(2);
    expect(spell(arena(), "Q").cooldown).toBe(5); expect(spell(arena(), "W").cost).toBe(70);
    expect(spell(arena(), "R").cost).toBe(100); expect(spell(arena(), "Gate").castTime).toBe(1.5);
  });
  it.each([-1, 3, .5, NaN, Infinity])("rejects impossible first-card phase %s", phase => expect(() => compile(phase)).toThrow());
  it.each([-1, 4, .5, NaN, Infinity])("rejects impossible Stacked Deck history %s", stacks => expect(() => compile(0, stacks)).toThrow());
  it("starts without invented farming, respawn stacks or summoned victims", () => {
    const w = arena(); through(w, 120);
    expect(w.units[0].memory["tf:deck"]).toBe(0); expect(w.units[0].memory["tf:loadedDiceExpectedGold"]).toBeUndefined(); expect(w.pets).toEqual([]);
  });
  it("applies exactly the permanent55% bonus attack speed", () => {
    const w = arena(), self = w.units[0];
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(self.spec.base.attackSpeed.bonus + .55, 12);
  });
  it("keeps budget and cycling behavior valid after source context closes", () => {
    const w = arena(), self = w.units[0];
    expect(Number.isFinite(compiled.spec.budget!.damage!(self, w.units[1]).magic!)).toBe(true);
    cast(w, "W"); w.modes[0] = "fight";
    expect(() => compiled.spec.behavior!(perceive(w, 0))).not.toThrow();
  });
});

describe("Pick a Card absolute clocks and captured replacements", () => {
  it("pays once, locks the current card for free, and records one activation", () => {
    const w = arena(), self = w.units[0], mana = self.resource; let casts = 0;
    w.units[1].spec.hooks = { onEnemyCast() { casts++; } };
    select(w);
    expect(self.resource).toBe(mana - 70); expect(casts).toBe(1);
    expect(self.memory["tf:card"]).toBe(0); expect(self.memory["tf:cardUntil"]).toBe(180); expect(self.cooldownReady.W).toBe(Infinity);
  });
  it.each([[0, 0], [15, 0], [16, 1], [31, 1], [32, 2], [48, 0]] as const)("locks the actual hovered card at tick%s as%s", (tick, selected) => {
    const w = arena(); cast(w, "W"); w.tick = tick; cast(w, "W-lock"); expect(w.units[0].memory["tf:card"]).toBe(selected);
  });
  it("can lock a card under accepted silence without starting another cast", () => {
    const w = arena(); cast(w, "W"); applyCC(w, w.units[1], w.units[0], "silence", 2); cast(w, "W-lock"); expect(w.units[0].memory["tf:card"]).toBe(0);
  });
  it("expires the cycling window and starts the hasted cooldown only then", () => {
    const w = arena(0, 0, { abilityHaste: 100 }); cast(w, "W"); through(w, 180);
    expect(w.units[0].memory["tf:cycle"]).toBe(-1); expect(w.units[0].cooldownReady.W).toBe(270);
  });
  it("selected-card expiry is independent of the original shuffling deadline", () => {
    const w = arena(); cast(w, "W"); w.tick = 100; cast(w, "W-lock"); through(w, 180);
    expect(w.units[0].memory["tf:cardUntil"]).toBe(280); expect(w.units[0].cooldownReady.W).toBe(Infinity);
    through(w, 280); expect(w.units[0].memory["tf:card"]).toBe(-1); expect(w.units[0].cooldownReady.W).toBe(460);
  });
  it.each([[0, 120, 1, .575], [1, 90, .7, .35], [2, 45, .5, .25]] as const)("card%s replaces ordinary AD/critical damage with its one captured magic packet", (card, base, ratio, critMultiplier) => {
    const w = arena(card, 0, { ap: 200, ad: 50, critChance: .5 }); const ad = derive(w.units[0]).ad;
    select(w); hit(w);
    expect(w.units[1].totals.damageTaken).toBeCloseTo((base + ad + 200 * ratio) * (1 + .5 * critMultiplier), 9);
    expect(w.log.filter(row => /deals.*physical/.test(row.text))).toEqual([]);
  });
  it("uses the fixed eight-tick windup and1500-speed missile independent of attack speed", () => {
    const w = arena(0, 0, { attackSpeed: 2 }); select(w); startAttack(w, w.units[0]);
    expect(w.units[0].action).toMatchObject({ kind: "windup", launchTick: 8 });
    through(w, 8); expect(w.missiles[0]?.perTick).toBe(50); expect(w.units[0].cooldownReady.W).toBe(188); expect(w.units[0].memory["tf:card"]).toBe(-1);
  });
  it("retains the launched card's critical snapshot across later critical-chance changes", () => {
    const w = arena(0, 0, { ap: 100, critChance: 1 }); select(w); startAttack(w, w.units[0]); through(w, 8);
    const base = w.missiles[0]!.attack!.baseDamage!.amount;
    const capturedCritFactor = base.base / 120;
    expect(capturedCritFactor).toBeCloseTo(1.575, 12);
    w.units[0].spec.bonus!.critChance = 0;
    through(w, 35); expect(w.units[1].totals.damageTaken).toBeCloseTo((120 + derive(w.units[0]).ad + 100) * 1.575, 9);
  });
  it.each(["untargetable", "stasis", "range"] as const)("keeps a selected card when%s cancels its unlaunched windup", condition => {
    const w = arena(), mana = w.units[0].resource; select(w); startAttack(w, w.units[0]);
    if (condition === "range") w.units[1].x = 2000; else state(w, condition);
    through(w, 10);
    expect(w.missiles).toEqual([]); expect(w.units[0].memory["tf:card"]).toBe(0);
    expect(w.units[0].memory["tf:deck"]).toBe(0); expect(w.units[0].resource).toBe(mana - 70); expect(w.units[0].cooldownReady.W).toBe(Infinity);
  });
  it("does not transfer a selected card when an actual pet disappears during windup", () => {
    const w = arena(), pet = body(w, 350); select(w); startAttack(w, w.units[0], pet); w.pets = [];
    through(w, 10); expect(w.missiles).toEqual([]); expect(w.units[0].memory["tf:card"]).toBe(0); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("preserves the committed missile when the selection clock expires in flight", () => {
    const w = arena(0, 0, {}, 600); select(w); w.tick = 175; startAttack(w, w.units[0]); through(w, 210);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + derive(w.units[0]).ad, 9);
  });
  it("starts the cooldown once when the selection expires during its already declared windup", () => {
    const w = arena(); select(w); w.tick = 179; startAttack(w, w.units[0]); through(w, 210);
    expect(w.units[0].cooldownReady.W).toBe(360);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + derive(w.units[0]).ad, 9);
  });
  it.each(["blind", "dodgeAttacks", "parry", "spellShield"] as const)("%s denies the connected card effects and Stacked Deck entitlement", condition => {
    const w = arena(0, 3); select(w);
    if (condition === "blind") applyCC(w, w.units[1], w.units[0], "blind", 2); else state(w, condition);
    const mana = w.units[0].resource; hit(w);
    expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].resource).toBe(mana); expect(w.units[0].memory["tf:deck"]).toBe(3); expect(w.units[0].memory["tf:card"]).toBe(-1);
  });
  it("restores onlyBlue's sourced150mana and caps it at the actual maximum", () => {
    const w = arena(); select(w); w.units[0].resource = 100; hit(w); expect(w.units[0].resource).toBe(250);
    const capped = arena(); select(capped); hit(capped); expect(capped.units[0].resource).toBe(derive(capped.units[0]).maxResource);
  });
  it("keeps a launched card branch-local without mutating reusable formulas", () => {
    const w = arena(); select(w); startAttack(w, w.units[0]); through(w, 8);
    const branch = cloneWorld(w); branch.missiles[0]!.attack!.baseDamage!.amount.base = 999;
    expect(w.missiles[0]!.attack!.baseDamage!.amount.base).toBe(120);
  });
});

describe("real Red Card recipients and Stacked Deck", () => {
  it("damages andslows only actual bodies around the real primary, retaining pet state", () => {
    const w = arena(1), near = body(w, 500), far = body(w, 900); select(w); hit(w);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(90 + derive(w.units[0]).ad, 9);
    expect(near.hp).toBeCloseTo(10000 - 90 - derive(w.units[0]).ad, 9); expect(near.statuses?.some(s => s.key === "slow")).toBe(true); expect(far.hp).toBe(10000);
    expect(w.units[0].memory["tf:deck"]).toBe(1);
  });
  it("uses an actual pet's location as the primary splash origin and never duplicates it", () => {
    const w = arena(1), primary = body(w, 300), near = body(w, 550), far = body(w, -200); select(w); hit(w, primary);
    const damage = 90 + derive(w.units[0]).ad;
    expect(primary.hp).toBeCloseTo(10000 - damage, 9); expect(near.hp).toBeCloseTo(10000 - damage, 9); expect(far.hp).toBe(10000);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(damage, 9); expect(w.units[0].memory["tf:deck"]).toBe(1);
  });
  it("consumes a real splash recipient's shield without resurrecting its stale status", () => {
    const w = arena(1), pet = body(w, 500); petEffects(w, w.units[1], pet, [{ type: "state", state: "spellShield", duration: 10 }]);
    select(w); hit(w); expect(pet.hp).toBe(10000); expect(pet.statuses?.some(s => s.key === "spellShield")).toBe(false); expect(pet.statuses?.some(s => s.key === "slow")).toBe(false);
  });
  it("one primary spell shield prevents the card and its splash rather than fabricating a secondary hit", () => {
    const w = arena(1), pet = body(w, 500); state(w, "spellShield"); select(w); hit(w); expect(pet.hp).toBe(10000); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("Gold applies its sourcedtwo-second stun to the actual pet target", () => {
    const w = arena(2), pet = body(w, 350); select(w); hit(w, pet);
    const stun = pet.statuses?.find(s => s.key === "stun"); expect(stun).toBeDefined(); expect(stun!.endTick - stun!.startTick).toBe(60); expect(w.units[1].statuses.some(s => s.key === "stun")).toBe(false);
  });
  it("earns exactlythree connected stacks then spends them on the fourth actual basic", () => {
    const w = arena(); let basic = 0;
    for (let i = 0; i < 4; i++) { w.units[0].attackReadyTick = w.tick; const before = w.units[1].totals.damageTaken; hit(w); basic = w.units[1].totals.damageTaken - before; expect(w.units[0].memory["tf:deck"]).toBe((i + 1) % 4); }
    expect(basic).toBeCloseTo(derive(w.units[0]).ad + 165, 9);
  });
  it("adds E's noncritical AP/bonusAD proc once to a card, rather than replacing it", () => {
    const w = arena(0, 3, { ap: 100, ad: 50, critChance: 1 }); select(w); hit(w);
    expect(w.units[1].totals.damageTaken).toBeCloseTo((120 + derive(w.units[0]).ad + 100) * 1.575 + 165 + 10 + 40, 9);
  });
  it("damage-only blocking spares the ordinary basic but still consumes and deals Stacked Deck", () => {
    const w = arena(0, 3); state(w, "blockAttacks"); hit(w); expect(w.units[1].totals.damageTaken).toBe(165); expect(w.units[0].memory["tf:deck"]).toBe(0);
  });
  it("does not consume a loaded Deck proc on a represented ward", () => {
    const w = arena(0, 3), ward = body(w, 350, { kind: "ward", name: "Actual ward", targetClass: "other", hitPoints: true }); hit(w, ward); expect(w.units[0].memory["tf:deck"]).toBe(3);
  });
  it.each([false, true])("uses actual structure metadata for Stacked Deck's reduction: %s", structure => {
    const w = arena(0, 3, { ap: 100, ad: 50 });
    const target = body(w, 350, { kind: "turret-shaped-body", name: "Turret", targetClass: "other", ...(structure ? { structureClass: "turret" as const } : {}) });
    hit(w, target);
    const passive = 165 + 0.2 * 50 + 0.4 * 100;
    expect(10000 - target.hp).toBeCloseTo(derive(w.units[0]).ad + passive * (structure ? 0.5 : 1), 9);
    expect(w.units[0].memory["tf:deck"]).toBe(0);
  });
  it("records expected Loaded Dice gold once per actual kill without changing stat spending", () => {
    const w = arena(0, 0, { critChance: .5 }), self = w.units[0], before = structuredClone(self.spec.bonus); notifyKill(w, self, w.units[1]); notifyKill(w, self, w.units[1]);
    expect(self.memory["tf:loadedDiceExpectedGold"]).toBe(5.5); expect(self.spec.bonus).toEqual(before);
  });
});

describe("Wild Cards and Destiny with real Gate lifecycles", () => {
  it("launches Wild Cards from completion position along its declared direction", () => {
    const w = arena(), near = body(w, 300); cast(w, "Q"); w.units[0].x = 200; through(w, 8); expect(w.missiles[0]?.x).toBe(200); through(w, 50);
    expect(w.units[1].totals.damageTaken).toBe(240); expect(near.hp).toBe(9760);
  });
  it("a projectile wall prevents Wild Cards from reaching later bodies", () => {
    const w = arena(); w.zones.push({ id: 9999, owner: 1, kind: "projectileWall", seenTick: 0, x: 200, radius: 0, startTick: 0, endTick: 300 }); cast(w, "Q"); through(w, 60); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("Destinyreveal obeys its actual spell-shield flag and does not damage the target", () => {
    const w = arena(); state(w, "spellShield"); cast(w, "R"); expect(w.units[1].statuses.some(s => s.key === "revealed")).toBe(false); expect(w.units[1].statuses.some(s => s.key === "spellShield")).toBe(false); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("reveals actual invisible targetablechampions but nearsight still restricts sight", () => {
    const w = arena(); state(w, "invisible"); cast(w, "R"); expect(canSee(w.units[1], w.units[0])).toBe(true); applyCC(w, w.units[1], w.units[0], "nearsight", 3, 100); expect(canSee(w.units[1], w.units[0])).toBe(false);
  });
  it("leaves an untargetable champion unmarked and creates no fake ally", () => {
    const w = arena(); state(w, "untargetable"); cast(w, "R"); expect(w.units[1].statuses.some(s => s.key === "revealed")).toBe(false); expect(w.pets).toEqual([]);
  });
  it("unlocks Gate onlyafter15ticks and expires Destiny into its post-effect cooldown", () => {
    const w = arena(); cast(w, "R"); expect(canCast(w, w.units[0], spell(w, "Gate"))).toBe(false); w.tick = 14; expect(canCast(w, w.units[0], spell(w, "Gate"))).toBe(false); w.tick = 15; expect(canCast(w, w.units[0], spell(w, "Gate"))).toBe(true);
    through(w, 300); expect(canCast(w, w.units[0], spell(w, "Gate"))).toBe(false); expect(w.units[0].cooldownReady.R).toBe(3600);
  });
  it.each(["root", "ground", "silence"] as const)("%s prevents a new Gate declaration", cc => {
    const w = arena(); cast(w, "R"); w.tick = 15; applyCC(w, w.units[1], w.units[0], cc, 2); expect(canCast(w, w.units[0], spell(w, "Gate"))).toBe(false);
  });
  it.each(["root", "ground", "silence", "stun"] as const)("accepted%s interrupts an existing Gate and retains its spent ultimate cooldown", cc => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 }); const cooldown = w.units[0].cooldownReady.R;
    applyCC(w, w.units[1], w.units[0], cc, 2); through(w, 70); expect(w.units[0].x).toBe(0); expect(w.units[0].cooldownReady.R).toBe(cooldown);
  });
  it.each(["root", "ground", "silence", "stun"] as const)("honors actual execution order when%s and Gate complete on the same tick", cc => {
    for (const firstMover of [0, 1] as const) {
      const w = arena(); w.settings.firstMover = firstMover; cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 });
      const interrupt = ability({ key: "actual-interrupt", castTime: 1.5, delivery: { kind: "target", range: 10000 }, onHit: [{ type: "cc", cc, duration: 2 }] });
      w.units[1].spec.abilities.push(interrupt); startCast(w, w.units[1], interrupt); through(w, 60);
      expect(w.units[0].x).toBe(firstMover === 1 ? 0 : -1000);
    }
  });
  it("a rejected root cannot cancel an actual protected Gate", () => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 });
    applyEffect(w, w.units[0], w.units[0], { type: "state", state: "ccImmune", duration: 2 }, { scale: 1 });
    expect(applyCC(w, w.units[1], w.units[0], "root", 2)).toBe(false); through(w, 60); expect(w.units[0].x).toBe(-1000);
  });
  it("death during Gate prevents its blink and does not destroy unrelated live projectiles", () => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 });
    w.units[0].hp = 0; w.units[0].alive = false;
    w.tick = 60; w.units[0].spec.hooks!.onCast!({ ...hookContext(w, w.units[0], spell(w, "Gate")), ability: spell(w, "Gate") });
    expect(w.units[0].x).toBe(0); expect(w.units[0].cooldownReady.R).toBe(3315);
  });
  it("W may overlay Gate while Q and basic attacks remain disabled", () => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 }); const action = w.units[0].action; cast(w, "W"); cast(w, "W-lock");
    expect(w.units[0].action).toBe(action); expect(canCast(w, w.units[0], spell(w, "Q"))).toBe(false); expect(canStartAttack(w, w.units[0])).toBe(false); through(w, 60); expect(w.units[0].x).toBe(-1000);
  });
  it("keeps an absolute destination through later enemycrossing and caps it at5500", () => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 9000 }); w.units[1].x = -400; through(w, 60); expect(w.units[0].x).toBe(-5500);
  });
  it("destroys only actual incoming champion homing missiles and incoming pet missiles at the real blink", () => {
    const w = arena(); cast(w, "R"); w.tick = 15; cast(w, "Gate", { direction: -1, distance: 1000 });
    const base = { owner: 1 as const, source: "incoming", x: 2000, seenTick: 0, perTick: 0, direction: -1 as const, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: [] };
    w.missiles.push({ ...base, id: 800, homing: true }, { ...base, id: 801, homing: true, pet: 999 }, { ...base, id: 802, homing: false });
    w.petMissiles = [{ id: 803, owner: 1, pet: 123, target: 0, x: 2000, perTick: 0, projectile: true, effects: [], blinded: false }, { id: 804, owner: 1, pet: 123, target: { pet: 999 }, x: 2000, perTick: 0, projectile: true, effects: [], blinded: false }];
    // Calling the completion hook directly isolates which packets this actual blink destroys.
    w.tick = 60; w.units[0].spec.hooks!.onCast!({ ...hookContext(w, w.units[0], spell(w, "Gate")), ability: spell(w, "Gate") });
    expect(w.missiles.map(m => m.id)).toEqual([801, 802]); expect(w.petMissiles.map(m => m.id)).toEqual([804]); expect(w.units[0].x).toBe(-1000);
  });
  it.each(["hold", "trade"] as const)("reserves Destiny in%s and honors a finished trade", mode => {
    const w = arena(); w.modes[0] = mode; expect(compiled.spec.behavior!(perceive(w, 0))).not.toMatchObject({ kind: "cast", ability: "R" }); w.units[0].memory.tradeDone = true; expect(compiled.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: -1 });
  });
});

describe("Twisted Fate production model", () => {
  it("runs six15000gold scenarios with strictly reflected scores and identical spending", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const a = simulateMatchup(compiled.spec, kit("Darius").spec, 15000, prices), b = simulateMatchup(kit("Darius").spec, compiled.spec, 15000, prices);
    expect(a.scenarios).toHaveLength(6); expect(a.builds).toEqual([b.builds[1], b.builds[0]]); expect(Math.abs(a.score + b.score)).toBeLessThan(1e-10);
    for (const [i, s] of a.scenarios.entries()) { const r = b.scenarios[[1, 0, 2, 3, 4, 5][i]!]!; if (s.score === undefined) expect(r.score).toBeUndefined(); else expect(Math.abs(s.score + r.score!)).toBeLessThan(1e-10); }
  }, 60000);
});
