import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, completeCast, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Aim, type World } from "../../engine/sim/state";
import Katarina from "../../kits/champions/Katarina";
import { idle, lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const compiled = () => compileKit(championData("Katarina"), records("Katarina"), Katarina);
const spell = (w: World, key: string) => w.units[0].spec.abilities.find((a) => a.key === key)!;
function arena(distance = 300, bonus: FighterSpec["bonus"] = {}, enemy?: FighterSpec): World {
  const spec = compiled().spec; spec.bonus = bonus; spec.base = { ...spec.base, hpRegen: 0, resourceRegen: 0 };
  const w = createWorld({ fighters: [spec, enemy ?? fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, resourceRegen: 0 } })], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 40, environment: { walls: false, minions: false, brush: false, laneSetup: false, wallDistance: 0 } } });
  w.units[0].x = 0; w.units[1].x = distance; return w;
}
const cast = (w: World, key: string, aim?: Aim) => startCast(w, w.units[0], spell(w, key), aim);
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [idle, idle]); }
function drain(w: World, limit = 150) { for (let n = 0; w.missiles.length && n < limit; n++) { w.tick++; advanceMissiles(w); } }
function pet(w: World, x = 200, overrides: Partial<PetSpec> = {}, owner: 0 | 1 = 1) { return spawnPet(w, w.units[owner], { kind: "actual", name: "Actual summon", hp: 10000, armor: 0, mr: 0, moveSpeed: 0, radius: 20, duration: 100, ...overrides }, x); }
const daggers = (w: World): Array<{ x: number; lands: number; expires: number }> => JSON.parse(String(w.units[0].memory["kat:daggers"] ?? "[]"));
const direct = (w: World, key: string) => { const a = spell(w, key); abilityHit(w, w.units[0], w.units[1], a, a.onHit!); };
const addOnHit = (w: World, amount = 100) => { w.units[0].spec.attack.onHit = [{ type: "damage", damageType: "true", amount: { base: amount } }]; };

describe("Katarina scenario behavior", () => {
  it.each(["trade", "hold"] as const)("reserves Death Lotus in %s even when Q/W/E are unavailable", (mode) => {
    const w = arena(100), self = w.units[0]; w.modes[0] = mode;
    for (const key of ["Q", "W", "E"]) self.cooldownReady[key] = 1000;
    expect(canCast(w, self, spell(w, "R"))).toBe(true);
    expect(self.spec.behavior!(perceive(w, 0))).toEqual({ kind: "attack" });
    expect(self.cooldownReady.R).toBeUndefined();
  });
  it("retreats after a finished trade with every spell ready", () => {
    const w = arena(100), self = w.units[0]; w.modes[0] = "trade"; self.memory.tradeDone = true;
    for (const key of ["Q", "W", "E", "R"]) expect(canCast(w, self, spell(w, key))).toBe(true);
    expect(self.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("starts the normal trade clock before choosing an available dagger cast", () => {
    const w = arena(100), self = w.units[0]; w.modes[0] = "trade";
    expect(self.spec.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "Q" });
    expect(self.memory.tradeStart).toBe(0);
    w.tick = Math.ceil(w.settings.tradeSeconds * 30);
    expect(self.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: -1 });
    expect(self.memory.tradeDone).toBe(true);
  });
  it("uses Death Lotus in an all-in and holds its active channel", () => {
    const w = arena(100), self = w.units[0]; w.modes[0] = "fight";
    for (const key of ["Q", "W", "E"]) self.cooldownReady[key] = 1000;
    expect(self.spec.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "R" });
    cast(w, "R");
    for (const key of ["Q", "W", "E"]) delete self.cooldownReady[key];
    expect(canCast(w, self, spell(w, "Q"))).toBe(true);
    expect(self.spec.behavior!(perceive(w, 0))).toBeUndefined();
    expect(self.action?.kind).toBe("channel");
  });
  it.each(["idle", "flee"] as const)("preserves %s behavior with offensive spells ready", (mode) => {
    const w = arena(100), self = w.units[0]; w.modes[0] = mode;
    expect(self.spec.behavior!(perceive(w, 0))).toEqual(mode === "idle" ? undefined : { kind: "move", direction: -1 });
  });
  it("finishes a real short trade without R or renewed casts during retreat", () => {
    const w = arena(250), self = w.units[0]; w.modes[0] = "trade";
    let retreatTick: number | undefined;
    for (let n = 0; n < 450 && !w.result; n++) {
      const tick = w.tick;
      step(w, [self.spec.behavior!, idle]);
      if (self.memory.tradeDone && retreatTick === undefined) retreatTick = tick;
    }
    expect(self.memory.tradeStart).toBeTypeOf("number");
    expect(retreatTick).toBeDefined();
    expect(w.result?.reason).toBe("disengaged");
    expect(w.result!.tick).toBeLessThan(450);
    const casts = w.log.filter((entry) => entry.side === 0 && entry.text.startsWith("casts "));
    expect(casts.map((entry) => entry.text)).toEqual(["casts Bouncing Blade", "casts Shunpo", "casts Preparation"]);
    expect(casts.every((entry) => entry.tick < retreatTick!)).toBe(true);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);
  });
});

// Compile directly: these checks also work before registry/profile generation.
describe("Katarina pinned mechanics and formulas", () => {
  it("consumes the five pinned revisions and exact versioned game objects", () => {
    const c = compiled(); expect(c.spec.abilities.map((a) => a.key)).toEqual(["Q", "W", "E", "R"]);
    expect(new Set(c.evidence.filter((e) => e.revid > 0).map((e) => e.revid))).toEqual(new Set([4007625, 4038392, 4015158, 4044343, 3845920]));
    const game = c.evidence.filter((e) => e.url); expect(game.length).toBeGreaterThanOrEqual(4);
    expect(game.every((e) => e.sourceSha256 === "1e7fb45a5b9f9864e3327074489e5e685971da1190f9d8a0d7ba86c4bb0da066" && e.sourceVersion === "16.21.8342754+branch.releases-16-21.content.release")).toBe(true);
    expect(c.assumptions.join(" ")).toContain("pickup trigger radius");
  });
  it("fails closed if a consumed primary rule or game excerpt disappears", () => {
    const primary = records("Katarina"); primary.find((a) => a.kind === "E")!.notes = [];
    expect(() => compileKit(championData("Katarina"), primary, Katarina)).toThrow();
    const game = records("Katarina"); game.find((a) => a.kind === "R")!.gameSources = [];
    expect(() => compileKit(championData("Katarina"), game, Katarina)).toThrow();
  });
  it("uses exact maximum-rank Q/E and mixed bonus-AS R formulas", () => {
    const w = arena(300, { ap: 100, ad: 100, attackSpeed: .5 }), [self, enemy] = w.units;
    const qDamage = spell(w, "Q").onHit![0]!; if (qDamage.type !== "damage") throw new Error("Q damage absent");
    expect(evaluate(qDamage.amount, self, enemy)).toBe(260);
    direct(w, "E"); expect(enemy.totals.damageTaken).toBeCloseTo(60 + .4 * derive(self).ad + 25, 10);
    const before = enemy.totals.damageTaken; direct(w, "R");
    expect(enemy.totals.damageTaken - before).toBeCloseTo(69 + 100 * (.16 + .5 * derive(self).bonusAttackSpeed), 10);
    expect(spell(w, "R").onHitScale).toBe(.35);
  });
  it("has finite reference budgets without fictional kill resets", () => {
    const w = arena(300, { ad: 100, ap: 100 }), result = damagePerSecond(w.units[0].spec, w.units[1].spec);
    expect(Object.values(result).every(Number.isFinite)).toBe(true); expect(result.magic + result.physical).toBeGreaterThan(0);
  });
});

describe("Katarina actual dagger clocks and Shunpo", () => {
  it("starts without daggers and W lands after 1.25 seconds before its only spin", () => {
    const w = arena(); expect(daggers(w)).toEqual([]); cast(w, "W");
    expect(daggers(w)).toMatchObject([{ x: 0, lands: 38, expires: 158 }]);
    through(w, 37); expect(w.units[1].totals.damageTaken).toBe(0);
    through(w, 38); expect(w.units[1].totals.damageTaken).toBe(275); expect(daggers(w)).toEqual([]);
    through(w, 50); expect(w.units[1].totals.damageTaken).toBe(275);
  });
  it("uses 340 solely as spin radius and requires crossing the dagger center for pickup", () => {
    const w = arena(); cast(w, "W"); w.units[0].x = 100; through(w, 38);
    expect(daggers(w)).toHaveLength(1); expect(w.units[1].totals.damageTaken).toBe(0);
    w.units[0].x = -1; through(w, 39); expect(daggers(w)).toHaveLength(0); expect(w.units[1].totals.damageTaken).toBe(275);
  });
  it("expires a ground dagger after four seconds and cannot recover it later", () => {
    const w = arena(); cast(w, "W"); w.units[0].x = 100; through(w, 157); expect(daggers(w)).toHaveLength(1);
    through(w, 158); expect(daggers(w)).toHaveLength(0); w.units[0].x = 0; through(w, 159); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("preserves independent dagger and flight state in a world branch", () => {
    const w = arena(); cast(w, "W"); cast(w, "Q"); through(w, 8); const branch = cloneWorld(w);
    branch.units[0].x = 100; through(branch, 40); through(w, 40);
    expect(daggers(branch)).toHaveLength(2); expect(daggers(w)).toHaveLength(1);
    expect(w.units[1].totals.damageTaken - branch.units[1].totals.damageTaken).toBe(275);
  });
  it("Shunpo blinks and damages before its 0.15-second cast, resetting a surviving target's attack timer", () => {
    const w = arena(), [self, enemy] = w.units; self.attackReadyTick = 900; cast(w, "E");
    expect(self.x).toBe(300); expect(self.action).toMatchObject({ kind: "cast", endTick: 5 });
    expect(enemy.totals.damageTaken).toBeCloseTo(60 + .4 * derive(self).ad, 10); expect(self.attackReadyTick).toBe(0);
    const before = enemy.totals.damageTaken; through(w, 5); expect(enemy.totals.damageTaken).toBe(before);
  });
  it("does not reset attacks if E kills and refunds fifteen seconds even on a lethal first hit", () => {
    const w = arena(), [self, enemy] = w.units; enemy.hp = 1; self.attackReadyTick = 900; self.cooldownReady.R = 1800; cast(w, "E");
    expect(self.attackReadyTick).toBe(900); expect(self.cooldownReady.R).toBe(1350); expect(self.cooldownReady.E).toBe(0);
  });
  it("uses airborne daggers as anchors without an early spin or sweeping across the blink path", () => {
    const w = arena(); cast(w, "W"); w.units[0].x = 500; w.tick = 10;
    cast(w, "E", { direction: 1, distance: 500 }); expect(w.units[0].x).toBe(0); expect(w.units[1].totals.damageTaken).toBe(0);
    through(w, 37); expect(daggers(w)).toHaveLength(1); through(w, 38); expect(w.units[1].totals.damageTaken).toBe(275);
  });
  it("reduces current E cooldown by 96% of its hasted total at level 20", () => {
    const w = arena(300, { abilityHaste: 100 }); cast(w, "W"); w.units[0].x = 100; through(w, 38);
    w.units[0].cooldownReady.E = 200; w.units[0].x = 0; through(w, 39);
    expect(w.units[0].cooldownReady.E).toBe(200 - Math.round(8 / 2 * .96 * 30));
  });
  it("prioritizes a champion at E's landing point over a closer ordinary summon", () => {
    const w = arena(300), target = pet(w, 250); cast(w, "E", { direction: 1, distance: 250 });
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0); expect(target.hp).toBe(10000);
  });
  it("can anchor E on a real allied summon and enforces 725 versus 775 dagger ranges", () => {
    const w = arena(1000); expect(canCast(w, w.units[0], spell(w, "E"))).toBe(false);
    pet(w, 725, {}, 0); expect(canCast(w, w.units[0], spell(w, "E"))).toBe(true); cast(w, "E", { direction: 1, distance: 725 }); expect(w.units[0].x).toBe(725);
    const d = arena(1000); cast(d, "W"); d.units[0].x = 775; expect(canCast(d, d.units[0], spell(d, "E"))).toBe(true);
    d.units[1].x = 2000; d.units[0].x = 776; expect(canCast(d, d.units[0], spell(d, "E"))).toBe(false);
  });
  it.each(["ground", "root"])("cannot Shunpo under %s", (cc) => { const w = arena(); w.units[0].statuses.push(lasting("cc", cc)); expect(canCast(w, w.units[0], spell(w, "E"))).toBe(false); });
  it("never awards champion takedown refunds for a killed actual summon or champion clone", () => {
    for (const targetClass of ["minion", "champion"] as const) { const w = arena(1000), target = pet(w, 200, { hp: 1, targetClass }); w.units[0].cooldownReady.R = 1800; cast(w, "E"); expect(target.hp).toBeLessThanOrEqual(0); expect(w.units[0].cooldownReady.R).toBe(1800); }
  });
  it("decays W movement speed and ghosting until the landing clock", () => {
    const w = arena(); cast(w, "W"); through(w, 0); expect(w.units[0].statuses.some((s) => s.key === "ghosted")).toBe(true);
    const initial = w.units[0].statuses.find((s) => s.memoKey === "buff:kat:haste")!.value; expect(initial).toBe(.9);
    through(w, 19); expect(w.units[0].statuses.find((s) => s.memoKey === "buff:kat:haste")!.value).toBeCloseTo(.9 * (1 - 19 / 37.5), 10);
    through(w, 40); expect(w.units[0].statuses.some((s) => s.key === "ghosted" || s.memoKey === "buff:kat:haste")).toBe(false);
  });
});

describe("Katarina real Bouncing Blade flights", () => {
  it("waits for cast and finite primary flight, then creates its fixed first-contact dagger clock", () => {
    const w = arena(); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.missiles).toHaveLength(1);
    expect(Number.isFinite(w.missiles[0]!.impactTick)).toBe(true); through(w, 13);
    expect(w.units[1].totals.damageTaken).toBe(220); expect(daggers(w)).toMatchObject([{ x: 650, lands: 44, expires: 164 }]);
  });
  it("bounces over separate 0.15-second legs to two actual unhit summons inside the primary radius", () => {
    const w = arena(), first = pet(w, 400), second = pet(w, 700), outside = pet(w, 760); cast(w, "Q"); through(w, 13);
    expect(first.hp).toBe(10000); through(w, 18); expect(first.hp).toBe(9780); expect(second.hp).toBe(10000);
    through(w, 23); expect(second.hp).toBe(9780); expect(outside.hp).toBe(10000); expect(w.units[1].totals.damageTaken).toBe(220);
  });
  it("reselects the next valid bounce after each contact", () => {
    const w = arena(), first = pet(w, 400), hidden = pet(w, 700); hidden.statuses!.push(lasting("state", "invisible")); cast(w, "Q"); through(w, 14);
    hidden.statuses = []; through(w, 24); expect(first.hp).toBe(9780); expect(hidden.hp).toBe(9780);
  });
  it("cancels an invalid cast target without a cooldown", () => { const w = arena(); cast(w, "Q"); w.units[1].x = 700; through(w, 8); expect(w.missiles).toHaveLength(0); expect(w.units[0].cooldownReady.Q ?? 0).toBe(0); });
  it("continues toward a dead target but drops a naturally expired champion clone", () => {
    const w = arena(); cast(w, "Q"); through(w, 8); w.units[1].alive = false; w.units[1].hp = 0; drain(w); expect(daggers(w)).toHaveLength(1);
    const c = arena(1000); const clone = pet(c, 300, { targetClass: "champion" }); cast(c, "Q"); through(c, 8); c.pets = c.pets.filter((p) => p.id !== clone.id); drain(c); expect(daggers(c)).toHaveLength(0);
  });
  it("keeps a real killed clone flight distinct from natural expiry", () => {
    const w = arena(1000), clone = pet(w, 300, { targetClass: "champion" }); cast(w, "Q"); through(w, 8); damagePet(w, w.units[0], clone, 10000, "true", false); drain(w); expect(daggers(w)).toHaveLength(1);
  });
  it("continues dagger formation and bounces through a spell shield", () => { const w = arena(), target = pet(w, 400); w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); cast(w, "Q"); through(w, 24); expect(w.units[1].totals.damageTaken).toBe(0); expect(target.hp).toBe(9780); expect(daggers(w)).toHaveLength(1); });
  it("moves a Q dagger out of real terrain without using champion radius", () => {
    const w = arena(); w.terrain.push({ id: w.nextId++, owner: 1, from: 640, to: 700, endTick: 1000 }); cast(w, "Q"); through(w, 14); expect(daggers(w)[0]!.x).toBeLessThanOrEqual(640); expect(daggers(w)[0]!.x).toBeGreaterThan(639);
  });
});

describe("Katarina packet guards and Death Lotus", () => {
  it.each(["blind", "blockAttacks"])("E damage and on-hit survive %s", (guard) => {
    const w = arena(); addOnHit(w); (guard === "blind" ? w.units[0] : w.units[1]).statuses.push(lasting(guard === "blind" ? "cc" : "state", guard)); direct(w, "E"); expect(w.units[1].totals.damageTaken).toBeCloseTo(60 + .4 * derive(w.units[0]).ad + 100, 10);
  });
  it("dodge prevents E's on-hit alone while its spell damage still connects", () => { const w = arena(); addOnHit(w); w.units[1].statuses.push(lasting("state", "dodgeAttacks")); direct(w, "E"); expect(w.units[1].totals.damageTaken).toBeCloseTo(60 + .4 * derive(w.units[0]).ad, 10); });
  it("dodge prevents a picked dagger's on-hit alone", () => { const w = arena(); addOnHit(w); w.units[1].statuses.push(lasting("state", "dodgeAttacks")); cast(w, "W"); through(w, 38); expect(w.units[1].totals.damageTaken).toBe(275); });
  it.each(["spellShield", "parry", "untargetable", "stasis"])("%s guards the complete R magic/physical/on-hit/wounds packet", (guard) => {
    const w = arena(300, { ad: 100, ap: 100 }); addOnHit(w); w.units[1].statuses.push(lasting("state", guard, 0, { charges: 1 })); direct(w, "R"); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.some((s) => s.kind === "grievousWounds")).toBe(false);
  });
  it("has no immediate R damage and launches exactly fifteen separate finite knives", () => {
    const w = arena(); addOnHit(w); cast(w, "R"); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 4); expect(w.missiles).toHaveLength(0);
    through(w, 5); expect(w.missiles).toHaveLength(1); expect(w.missiles[0]!.impactTick).toBeGreaterThan(w.tick - 1); through(w, 85);
    const perKnife = 50 + 100 * .35; expect(w.units[1].totals.damageTaken).toBeCloseTo(15 * perKnife, 10);
    expect(w.log.filter((e) => e.text.includes("Death Lotus deals") && e.text.includes("magic"))).toHaveLength(15); expect(w.missiles).toHaveLength(0);
    expect(Math.max(...w.units[1].statuses.filter((s) => s.kind === "grievousWounds").map((s) => s.endTick))).toBeGreaterThan(150);
  });
  it("consumes a spell shield for only one knife", () => { const w = arena(); w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); cast(w, "R"); through(w, 85); expect(w.units[1].totals.damageTaken).toBe(14 * 50); });
  it("casts at an invisible champion inside 500 and does not end when all targets leave", () => {
    const w = arena(500); w.units[1].statuses.push(lasting("state", "invisible")); expect(canCast(w, w.units[0], spell(w, "R"))).toBe(true); cast(w, "R"); through(w, 5);
    w.units[1].x = 1000; through(w, 30); expect(w.units[0].action?.kind).toBe("channel"); expect(Number(w.units[0].memory["kat:rDone"])).toBe(6);
    const outside = arena(501); expect(canCast(outside, outside.units[0], spell(outside, "R"))).toBe(false);
  });
  it("selects at most three real champion-class targets and ignores ordinary pets", () => {
    const w = arena(), ordinary = pet(w, 100), clones = [pet(w, 200, { targetClass: "champion" }), pet(w, 400, { targetClass: "champion" }), pet(w, 450, { targetClass: "champion" })];
    cast(w, "R"); through(w, 85); expect(ordinary.hp).toBe(10000); expect(clones.map((p) => p.hp)).toEqual([9250, 9250, 10000]); expect(w.units[1].totals.damageTaken).toBe(750);
  });
  it.each(["stun", "silence", "airborne"] as const)("%s interrupts R and leaves launched knives alive", (cc) => {
    const w = arena(); cast(w, "R"); through(w, 5); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 }); through(w, 85);
    expect(w.units[1].totals.damageTaken).toBe(50); expect(w.units[0].memory["kat:rDone"]).toBe(1);
  });
  it.each(["Q", "W", "E"])("an explicit %s cast interrupts R", (key) => {
    const w = arena(); cast(w, "R"); through(w, 10); expect(canCast(w, w.units[0], spell(w, key))).toBe(true); cast(w, key); expect(w.units[0].action?.kind).not.toBe("channel"); const done = w.units[0].memory["kat:rDone"]; through(w, 20); expect(w.units[0].memory["kat:rDone"]).toBe(done);
  });
  it("locks voluntary movement during the first and last quarter-second but allows middle cancellation", () => {
    const early = arena(); cast(early, "R"); for (let i = 0; i < 8; i++) step(early, [() => ({ kind: "move", direction: -1 }), idle]); expect(early.units[0].action?.kind).toBe("channel"); expect(early.units[0].x).toBe(0);
    step(early, [() => ({ kind: "move", direction: -1 }), idle]); expect(early.units[0].action).toBeUndefined();
    const late = arena(); cast(late, "R"); through(late, 67); step(late, [() => ({ kind: "move", direction: -1 }), idle]); expect(late.units[0].action?.kind).toBe("channel"); expect(late.units[0].x).toBe(0);
  });
  it("locks champion basic attack cancellation at either end and allows it in the middle", () => {
    const w = arena(100); cast(w, "R"); step(w, [() => ({ kind: "attack" }), idle]); expect(w.units[0].action?.kind).toBe("channel"); through(w, 8); step(w, [() => ({ kind: "attack" }), idle]); expect(w.units[0].action?.kind).toBe("windup");
    const late = arena(100); cast(late, "R"); through(late, 67); step(late, [() => ({ kind: "attack" }), idle]); expect(late.units[0].action?.kind).toBe("channel");
  });
  it("applies the same early, middle and final cancellation windows to a real pet attack order", () => {
    const w = arena(100), target = pet(w, 80); cast(w, "R"); step(w, [() => ({ kind: "attack", pet: target.id }), idle]); expect(w.units[0].action?.kind).toBe("channel");
    through(w, 8); step(w, [() => ({ kind: "attack", pet: target.id }), idle]); expect(w.units[0].action?.kind).toBe("windup");
    const late = arena(100), last = pet(late, 80); cast(late, "R"); through(late, 67); step(late, [() => ({ kind: "attack", pet: last.id }), idle]); expect(late.units[0].action?.kind).toBe("channel");
  });
  it("caster death stops future knives but a launched knife still arrives", () => {
    const w = arena(); cast(w, "R"); through(w, 5); dealDamage(w, w.units[1], w.units[0], 100000, "true"); through(w, 85);
    expect(w.units[1].totals.damageTaken).toBe(50); expect(w.units[0].memory["kat:rDone"]).toBe(1); expect(w.result?.reason).toBe("death");
  });
  it("a posthumous Q kill still refunds fifteen seconds from the real champion takedown", () => {
    const w = arena(), [self, enemy] = w.units; enemy.hp = 1; self.cooldownReady.R = 1800; cast(w, "Q"); through(w, 8); dealDamage(w, enemy, self, 100000, "true"); through(w, 30);
    expect(enemy.hp).toBeLessThanOrEqual(0); expect(self.cooldownReady.R).toBe(1350); expect(w.result?.winner).toBe("draw");
  });
  it("root preserves the stationary R channel and CC interrupts even in its final lock", () => {
    const w = arena(); cast(w, "R"); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "root", duration: 4 }, { scale: 1 }); through(w, 67); expect(w.units[0].action?.kind).toBe("channel");
    applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "silence", duration: 1 }, { scale: 1 }); expect(w.units[0].action).toBeUndefined(); through(w, 85); expect(w.units[1].totals.damageTaken).toBe(13 * 50);
  });
  it("stops mirrored manual missiles at the actual wall and aura boundaries", () => {
    for (const direction of [1, -1] as const) {
      const w = arena(300 * direction); w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", x: 101 * direction, radius: 0, seenTick: 0, startTick: 0, endTick: 1000 }); cast(w, "Q"); through(w, 8); const m = w.missiles[0]!; through(w, 12); expect(m.x).toBeCloseTo(101 * direction, 10); expect(m.ended).toBe(true);
      const aura = arena(300 * direction); aura.units[1].statuses.push(lasting("state", "projectileBlock", 100)); cast(aura, "Q"); through(aura, 8); const knife = aura.missiles[0]!; through(aura, 12); expect(knife.x).toBeCloseTo(135 * direction, 10); expect(knife.ended).toBe(true);
    }
  });
  it("a lethal reflected on-hit callback stops further launch clocks", () => {
    const w = arena(); w.units[1].spec.hooks = { onIncomingOnHit(ctx) { ctx.apply({ type: "damage", damageType: "true", amount: { base: 100000 } }); } }; cast(w, "R"); through(w, 85);
    expect(w.units[0].hp).toBeLessThanOrEqual(0); expect(Number(w.units[0].memory["kat:rDone"])).toBeLessThan(15); expect(w.missiles).toHaveLength(0);
  });
  it("projectile walls destroy Q before dagger formation and independently destroy R knives", () => {
    for (const key of ["Q", "R"]) { const w = arena(); w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", x: 100, radius: 0, seenTick: 0, startTick: 0, endTick: 1000 }); cast(w, key); through(w, 90); expect(w.units[1].totals.damageTaken).toBe(0); expect(daggers(w)).toHaveLength(0); expect(w.missiles).toHaveLength(0); }
  });
  it("mirrors projectile paths, damage and dagger centers to 1e-10", () => {
    const a = arena(300), b = arena(-300); cast(a, "Q"); cast(b, "Q");
    for (let i = 0; i < 30; i++) { step(a, [idle, idle]); step(b, [idle, idle]); expect(a.missiles.length).toBe(b.missiles.length); for (let j = 0; j < a.missiles.length; j++) expect(a.missiles[j]!.x).toBeCloseTo(-b.missiles[j]!.x, 10); }
    expect(a.units[1].totals.damageTaken).toBe(b.units[1].totals.damageTaken); expect(daggers(a)[0]!.x).toBeCloseTo(-daggers(b)[0]!.x, 10);
  });
});

describe("Katarina production summons retain their own identity", () => {
  it("Shunpo damages actual Tibbers using its own resistances without borrowing Annie's shield", () => {
    const w = arena(1000, {}, kit("Annie").spec), [self, annie] = w.units;
    const r = annie.spec.abilities.find((a) => a.key === "R")!; completeCast(w, annie, r, w.tick); const tibbers = w.pets.find((p) => p.owner === 1)!;
    tibbers.x = 200; annie.statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); const before = tibbers.hp; cast(w, "E");
    expect(before - tibbers.hp).toBeCloseTo((60 + .4 * derive(self).ad) * 100 / (100 + tibbers.spec.mr), 10); expect(annie.statuses.some((s) => s.key === "spellShield")).toBe(true);
  });
  it("Q contacts Tibbers then bounces to its champion owner without sharing their spell shields", () => {
    const w = arena(500, {}, kit("Annie").spec), [self, annie] = w.units; annie.memory.pyromania = 0;
    completeCast(w, annie, annie.spec.abilities.find((a) => a.key === "R")!, w.tick); const bear = w.pets.find((p) => p.owner === 1)!; bear.x = 200;
    bear.statuses!.push(lasting("state", "spellShield", 0, { charges: 1 })); cast(w, "Q", { direction: 1, distance: 200 }); through(w, 20);
    expect(bear.hp).toBe(bear.spec.hp); expect(bear.statuses!.some((s) => s.key === "spellShield")).toBe(false); expect(annie.totals.damageTaken).toBeGreaterThan(0); expect(self.cooldownReady.R ?? 0).toBe(0);
  });
  it("a spin damages Tibbers as an area packet without applying champion-only on-hits", () => {
    const w = arena(1000, {}, kit("Annie").spec), annie = w.units[1]; completeCast(w, annie, annie.spec.abilities.find((a) => a.key === "R")!, w.tick); const bear = w.pets.find((p) => p.owner === 1)!;
    bear.x = 200; bear.spec = { ...bear.spec, attack: undefined, moveSpeed: 0 }; const before = bear.hp; addOnHit(w); cast(w, "W"); through(w, 38);
    expect(before - bear.hp).toBeCloseTo(275 * 100 / (100 + bear.spec.mr) * (bear.spec.areaTaken ?? 1), 10); expect(w.units[0].cooldownReady.R ?? 0).toBe(0);
  });
});
