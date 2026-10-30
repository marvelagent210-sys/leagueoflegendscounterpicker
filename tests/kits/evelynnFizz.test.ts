import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, dealDamage, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Annie from "../../kits/champions/Annie";
import Evelynn from "../../kits/champions/Evelynn";
import Fizz from "../../kits/champions/Fizz";
import { championData, pets, records } from "./helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const eve = compileKit(championData("Evelynn"), records("Evelynn"), Evelynn);
const fizz = compileKit(championData("Fizz"), records("Fizz"), Fizz);
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
function arena(spec: FighterSpec, distance = 150, bonus: FighterSpec["bonus"] = { ap: 100 }) {
  const world = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus }, fighter({ base: { hp: 50000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 60 } });
  world.units[0].x = 0; world.units[1].x = distance; return world;
}
function through(world: World, tick: number) { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function cast(world: World, key: string, aim?: { direction: 1 | -1; distance: number }) { startCast(world, world.units[0], ability(world.units[0].spec, key), aim); }
function hit(world: World, key: string) { const a = ability(world.units[0].spec, key); abilityHit(world, world.units[0], world.units[1], a, a.onHit ?? []); }
function state(world: World, key: StateType, self = false, duration = 20) { const unit = world.units[self ? 0 : 1]; applyEffect(world, unit, unit, { type: "state", state: key, duration }, { scale: 1 }); }
function targetPet(world: World, x = 150) { return spawnPet(world, world.units[1], { kind: "dummy", name: "Target", hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, x); }
function allure(world: World, age: number) { world.units[1].statuses.push({ kind: "mark", key: "allure", source: 0, startTick: world.tick - age, endTick: world.tick + 150, value: 0 }); }
function wAttack(world: World, pet = false) { cast(world, "W"); const target = pet ? targetPet(world) : undefined; startAttack(world, world.units[0], target); through(world, world.tick + 30); return target; }

describe("Evelynn exact pins and target-local contacts", () => {
  it("retains all six exact wiki revisions and independently attributed game evidence", () => {
    expect(new Set(eve.evidence.map((e) => e.revid))).toEqual(new Set([0, 3984296, 3909221, 4038334, 4012756, 4006700, 4064061]));
    expect(eve.evidence.some((e) => e.sourceSha256 === "c424d7a6b41894f8f817e49748c860d41e0531ed7d331193d4326ab52939b328")).toBe(true);
  });
  it("fails closed when an exact raw source quote is missing", () => {
    const changed = structuredClone(records("Evelynn")); changed.find((a) => a.name === "Whiplash")!.notes = [];
    expect(() => compileKit(championData("Evelynn"), changed, Evelynn)).toThrow();
  });
  it("starts without shade, empowered E, marks or spike stock", () => { const w = arena(eve.spec); expect(w.units[0].memory.shade).toBeUndefined(); expect(canCast(w, w.units[0], ability(eve.spec, "E2"))).toBe(false); expect(canCast(w, w.units[0], ability(eve.spec, "Q2"))).toBe(false); });
  it("enters shade at four seconds, resets E and uses the actual observer's 700-unit detection", () => { const w = arena(eve.spec, 900); w.units[0].cooldownReady.E = 999; through(w, 119); expect(canSee(w.units[0], w.units[1])).toBe(true); through(w, 120); expect(w.units[0].memory.empoweredE).toBe(true); expect(w.units[0].cooldownReady.E).toBe(120); expect(canSee(w.units[0], w.units[1])).toBe(false); w.units[1].x = 699; expect(canSee(w.units[0], w.units[1])).toBe(true); });
  it("regenerates against the dynamic level-20 630 + 250% AP ceiling without removing health", () => { const w = arena(eve.spec, 900); w.units[0].hp = 879; through(w, 120); expect(w.units[0].hp).toBe(880); applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "AP", amount: { base: 100 }, duration: 10 }, { scale: 1 }); through(w, 121); expect(w.units[0].hp).toBeGreaterThan(880); w.units[0].hp = 1200; through(w, 122); expect(w.units[0].hp).toBe(1200); });
  it("regeneration obeys Grievous Wounds and does not count as healing", () => { const w = arena(eve.spec, 900); w.units[0].hp = 200; applyEffect(w, w.units[1], w.units[0], { type: "grievousWounds", duration: 10 }, { scale: 1 }); through(w, 120); expect(w.units[0].hp - 200).toBeCloseTo(165.882352941176 / 30 * .6); expect(w.units[0].totals.healing).toBe(0); });
  it("an attack breaks stealth on declaration and W leaves it intact", () => { const w = arena(eve.spec, 150); through(w, 120); cast(w, "W"); expect(w.units[0].memory.shade).toBe(true); through(w, 130); startAttack(w, w.units[0]); expect(w.units[0].memory.shade).toBe(false); expect(w.units[0].statuses.some((s) => s.key === "camouflage")).toBe(false); });
  it("damage interrupts shade for the sourced 1.5 seconds", () => { const w = arena(eve.spec, 900); through(w, 120); dealDamage(w, w.units[1], w.units[0], 20, "true"); const at = w.tick + 45; through(w, at - 1); expect(w.units[0].memory.shade).toBe(false); through(w, at); expect(w.units[0].memory.shade).toBe(true); });
  it("the first dart deals 70 and creates three charges without consuming its new mark", () => { const w = arena(eve.spec); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBe(70); expect(w.units[1].statuses.find((s) => s.key === "hateSpike")?.value).toBe(3); });
  it("later Q spikes consume only three marked procs", () => { const w = arena(eve.spec); hit(w, "Q"); for (let i = 0; i < 4; i++) hit(w, "Q2"); expect(w.units[1].totals.damageTaken).toBe(70 + 4 * 70 + 3 * 80); expect(w.units[1].statuses.find((s) => s.key === "hateSpike")?.value).toBe(0); });
  it("actual cast stocks exactly three recasts with a half-second haste-adjusted spacing", () => { const w = arena(eve.spec, 300, { abilityHaste: 100 }); cast(w, "Q"); through(w, 10); expect(w.units[0].memory.spikes).toBe(3); expect(w.units[0].cooldownReady.Q2).toBe(17); through(w, 16); cast(w, "Q2"); expect(w.units[0].memory.spikes).toBe(2); expect(w.units[0].cooldownReady.Q2).toBe(w.tick + 8); });
  it("recasts require visibility and may select a real visible pet behind Evelynn", () => { const w = arena(eve.spec, 1000); w.units[0].memory.spikes = 1; w.units[0].cooldownReady.Q = 300; expect(canCast(w, w.units[0], ability(eve.spec, "Q2"))).toBe(false); const target = targetPet(w, -150); cast(w, "Q2"); through(w, 20); expect(target.hp).toBe(4930); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("a dart intercepted by a pet marks that pet without leaking to the champion", () => { const w = arena(eve.spec, 500), target = targetPet(w, 200); cast(w, "Q"); through(w, 30); expect(target.hp).toBe(4930); expect(target.statuses?.find((s) => s.key === "hateSpike")?.value).toBe(3); expect(w.units[1].statuses.some((s) => s.key === "hateSpike")).toBe(false); });
  it("a piercing spike damages champion and pet once with independent mark stocks", () => { const w = arena(eve.spec, 300), target = targetPet(w, 150), q = ability(eve.spec, "Q"); abilityHitPet(w, w.units[0], target, q, q.onHit!); w.units[0].memory.spikes = 1; w.units[0].cooldownReady.Q = 300; cast(w, "Q2"); through(w, 30); expect(target.hp).toBe(4780); expect(target.statuses?.find((s) => s.key === "hateSpike")?.value).toBe(2); expect(w.units[1].totals.damageTaken).toBe(70); });
  it("Q recast uses the exact accelerating missile evidence", () => { const w = arena(eve.spec, 600); w.units[0].memory.spikes = 1; w.units[0].cooldownReady.Q = 300; cast(w, "Q2"); through(w, 0); expect(w.missiles[0]?.acceleration).toEqual({ perTick: -4200 / 900, minPerTick: 800 / 30, maxPerTick: 100 }); });
  it("Allure application crosses a spell shield while a blocked damaging spell preserves the mark", () => { const w = arena(eve.spec); state(w, "spellShield"); hit(w, "W"); expect(w.units[1].statuses.some((s) => s.key === "allure")).toBe(true); hit(w, "Q"); expect(w.units[1].statuses.some((s) => s.key === "allure")).toBe(true); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("an immature Allure refunds mana, slows and restarts its cooldown", () => { const w = arena(eve.spec); w.units[0].resource -= 100; const before = w.units[0].resource; allure(w, 74); hit(w, "Q"); expect(w.units[0].resource - before).toBe(100); expect(w.units[1].statuses.find((s) => s.key === "slow")).toMatchObject({ value: .45, endTick: 23 }); expect(w.units[1].statuses.some((s) => s.key === "charm")).toBe(false); expect(w.units[0].cooldownReady.W).toBe(330); });
  it("a mature Allure reduces MR before the triggering packet independently of CC immunity", () => { const w = arena(eve.spec); w.units[1].spec = { ...w.units[1].spec, base: { ...w.units[1].spec.base, mr: 100 } }; state(w, "ccImmune"); allure(w, 75); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBeCloseTo(70 / 1.55); expect(w.units[1].statuses.find((s) => s.key === "mrReductionPercent")).toMatchObject({ value: .45, endTick: 120 }); expect(w.units[1].statuses.some((s) => s.key === "charm")).toBe(false); });
  it("Allure natural expiry also restarts its cooldown", () => { const w = arena(eve.spec); cast(w, "W"); through(w, 160); expect(w.units[0].cooldownReady.W).toBe(488); expect(w.units[0].memory.allureTarget).toBeUndefined(); });
  it.each(["E", "E2"])("%s ignores blind, still procs on-hits and respects attack blocks", (key) => { const w = arena(eve.spec); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 20 }, { scale: 1 }); w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "true", amount: { base: 7 } }] } }; hit(w, key); expect(w.units[1].totals.damageTaken).toBeGreaterThan(7); const blocked = arena(eve.spec); state(blocked, "blockAttacks"); hit(blocked, key); expect(blocked.units[1].totals.damageTaken).toBe(0); });
  it("normal E is dodged while empowered E cannot be dodged", () => { const w = arena(eve.spec); state(w, "dodgeAttacks"); hit(w, "E"); expect(w.units[1].totals.damageTaken).toBe(0); hit(w, "E2"); expect(w.units[1].totals.damageTaken).toBe(240 + .065 * 50000); });
  it.each(["spellShield", "parry", "untargetable", "invulnerable"] as const)("%s guards both E versions", (guard) => { for (const key of ["E", "E2"]) { const w = arena(eve.spec); state(w, guard); hit(w, key); expect(w.units[1].totals.damageTaken).toBe(0); } });
  it("empowered E is a finite earliest-tick dash that damages path pets without on-hits", () => { const w = arena(eve.spec, 250), target = targetPet(w, 120); w.units[0].memory.empoweredE = true; w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "true", amount: { base: 7 } }] } }; cast(w, "E2"); through(w, 9); expect(Number.isFinite(w.units[0].x)).toBe(true); expect(w.units[1].totals.damageTaken).toBe(240 + .065 * 50000 + 7); expect(target.hp).toBe(5000 - 240 - .065 * 5000); expect(w.units[0].memory.empoweredE).toBe(false); });
  it.each([[.3, 450], [.299, 1080]])("R health share %s selects exactly %s magic damage", (share, damage) => { const w = arena(eve.spec); w.units[1].hp = 50000 * share; hit(w, "R"); expect(w.units[1].totals.damageTaken).toBe(damage); });
  it("Last Caress keeps untargetability until the separate delayed backwards blink", () => { const w = arena(eve.spec); cast(w, "R"); expect(isUntargetable(w.units[0], w.units[1])).toBe(true); through(w, 25); expect(w.units[0].x).toBe(0); expect(isUntargetable(w.units[0], w.units[1])).toBe(true); through(w, 26); expect(w.units[0].x).toBe(-700); expect(isUntargetable(w.units[0], w.units[1])).toBe(false); expect(w.units[1].totals.damageTaken).toBe(450); });
  it("R's damage direction and reverse blink retain declaration aim", () => { const w = arena(eve.spec); cast(w, "R", { direction: -1, distance: 0 }); w.units[1].x = -150; through(w, 26); expect(w.units[0].x).toBe(700); expect(w.units[1].totals.damageTaken).toBe(450); });
  it("R shortens the initial shade clock to 1.25 seconds", () => { const w = arena(eve.spec, 900); cast(w, "R"); through(w, 37); expect(w.units[0].memory.shade).toBe(false); through(w, 38); expect(w.units[0].memory.shade).toBe(true); });
});

describe("Fizz pinned damage and empowered contact clocks", () => {
  it("retains six exact revisions and the lure radius from the versioned binary", () => { expect(new Set(fizz.evidence.map((e) => e.revid))).toEqual(new Set([0, ...records("Fizz").map((r) => r.page.revid)])); expect(fizz.evidence.some((e) => e.sourceSha256 === "7c1dc9f12bb637c53976e52efcf969ab311c70cadcfe1d0975fc101860e121dc")).toBe(true); expect(ability(fizz.spec, "R").delivery).toMatchObject({ radius: 80, speed: 1300 }); });
  it.each([[100, "magic", 95], [6, "physical", 3], [100, "true", 100]] as const)("passive reduces incoming %s %s to %s before resistances", (raw, type, expected) => { const w = arena(fizz.spec); w.units[0].spec = { ...w.units[0].spec, base: { ...w.units[0].spec.base, armor: 0, mr: 0 } }; const before = w.units[0].hp; dealDamage(w, w.units[1], w.units[0], raw, type); expect(before - w.units[0].hp).toBe(expected); });
  it("passive reduction follows actual AP at damage time", () => { const w = arena(fizz.spec); w.units[0].spec = { ...w.units[0].spec, base: { ...w.units[0].spec.base, mr: 0 } }; applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "AP", amount: { base: 100 }, duration: 5 }, { scale: 1 }); const before = w.units[0].hp; dealDamage(w, w.units[1], w.units[0], 100, "magic"); expect(before - w.units[0].hp).toBe(94); });
  it("Q retains fixed 550 movement, deals physical + magic once and applies bleed", () => { const w = arena(fizz.spec, 300); cast(w, "Q"); expect(w.units[0].action?.kind).toBe("dash"); through(w, 1); expect(w.units[0].x).toBe(550); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 125); expect(w.units[1].statuses.some((s) => s.kind === "dot")).toBe(true); });
  it("Q tests the target's current position against its original location at dash completion", () => { const w = arena(fizz.spec, 300); cast(w, "Q"); w.units[1].x = 501; through(w, 1); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("Q's damage is absent along the dash path and the result position remains finite", () => { const w = arena(fizz.spec, 300), target = targetPet(w, 150); cast(w, "Q"); through(w, 1); expect(target.hp).toBe(5000); expect(Number.isFinite(w.units[0].x)).toBe(true); });
  it("Q's physical component alone grants life steal", () => { const w = arena(fizz.spec, 300); applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 }); w.units[0].hp -= 500; const before = w.units[0].hp; cast(w, "Q"); through(w, 1); expect(w.units[0].hp - before).toBeCloseTo(derive(w.units[0]).ad * .2); });
  it.each(["dodgeAttacks", "blockAttacks", "parry", "spellShield", "untargetable"] as const)("%s guards Q's actual contact", (guard) => { const w = arena(fizz.spec, 300); state(w, guard); cast(w, "Q"); through(w, 2); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("W and R may overlay Q while E respects the sourced half-second lockout", () => { const w = arena(fizz.spec, 300); cast(w, "Q"); expect(canCast(w, w.units[0], ability(fizz.spec, "W"))).toBe(true); expect(canCast(w, w.units[0], ability(fizz.spec, "R"))).toBe(true); expect(canCast(w, w.units[0], ability(fizz.spec, "E"))).toBe(false); through(w, 13); expect(canCast(w, w.units[0], ability(fizz.spec, "E"))).toBe(false); through(w, 15); expect(canCast(w, w.units[0], ability(fizz.spec, "E"))).toBe(true); });
  it("W has one spell-damage packet, six refreshing bleed pulses and no prepared damage", () => { const w = arena(fizz.spec); wAttack(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 195 + 115 / 6); through(w, 110); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 195 + 115); });
  it.each(["blind", "dodgeAttacks"] as const)("%s preserves W without extending its original four-second expiration", (guard) => { const w = arena(fizz.spec); if (guard === "blind") applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 10 }, { scale: 1 }); else state(w, guard); wAttack(w); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].statuses.find((s) => s.kind === "empower")?.endTick).toBe(120); expect(w.units[0].cooldownReady.W).toBe(Infinity); through(w, 120); expect(w.units[0].cooldownReady.W).toBe(210); });
  it.each(["blind", "dodgeAttacks"] as const)("a real pet's %s result also restores W within the original clock", (guard) => { const w = arena(fizz.spec); cast(w, "W"); const target = targetPet(w); if (guard === "blind") applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 10 }, { scale: 1 }); else target.statuses = [{ kind: "state", key: guard, source: 1, startTick: 0, endTick: 999, value: 1 }]; startAttack(w, w.units[0], target); through(w, 30); expect(target.hp).toBe(5000); expect(w.units[0].statuses.find((s) => s.kind === "empower")?.endTick).toBe(120); expect(w.units[0].cooldownReady.W).toBe(Infinity); });
  it("a blocked W is consumed but applies its sourced passive bleed", () => { const w = arena(fizz.spec); state(w, "blockAttacks"); wAttack(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(115 / 6); expect(w.units[0].statuses.some((s) => s.kind === "empower")).toBe(false); expect(w.units[0].memory.wBuffUntil).toBeGreaterThan(w.tick); });
  it("a spell shield absorbs W's active packet without absorbing physical damage or bleed", () => { const w = arena(fizz.spec); state(w, "spellShield"); wAttack(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 115 / 6); expect(w.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false); });
  it("a follow-up within five seconds adds proc damage once", () => { const w = arena(fizz.spec); wAttack(w); const before = w.units[1].totals.damageTaken; w.units[0].attackReadyTick = w.tick; startAttack(w, w.units[0]); through(w, w.tick + 13); expect(w.units[1].totals.damageTaken - before).toBeCloseTo(derive(w.units[0]).ad + 70 + 115 / 6); });
  it("W's kill reduces cooldown to exactly one second and refunds the paid mana", () => { const w = arena(fizz.spec); w.units[1].hp = 1; const before = w.units[0].resource; cast(w, "W"); startAttack(w, w.units[0]); through(w, 30); expect(w.units[0].resource).toBe(before); expect(w.units[0].cooldownReady.W).toBe(w.result!.tick + 30); });
  it("a real pet kill also refunds W without borrowing champion-only resolved callbacks", () => { const w = arena(fizz.spec); const target = targetPet(w); target.hp = 1; const before = w.units[0].resource; cast(w, "W"); startAttack(w, w.units[0], target); through(w, 30); expect(w.units[0].resource).toBe(before); expect(w.units[0].cooldownReady.W).toBeGreaterThan(30); expect(w.units[0].cooldownReady.W).toBeLessThan(60); });
  it("a guarded Q contact preserves a prepared W; a connected Q consumes it", () => { const w = arena(fizz.spec, 300); cast(w, "W"); state(w, "spellShield"); cast(w, "Q"); through(w, 1); expect(w.units[0].statuses.some((s) => s.kind === "empower")).toBe(true); w.units[0].cooldownReady.Q = 0; w.units[0].x = 0; cast(w, "Q"); through(w, 3); expect(w.units[0].statuses.some((s) => s.kind === "empower")).toBe(false); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 125 + 195); });
});

describe("Fizz two-hop and delayed shark state", () => {
  it("Playful retains untargetability for balance plus hop and lands with slow", () => { const w = arena(fizz.spec, 400); cast(w, "E", { direction: 1, distance: 200 }); expect(isUntargetable(w.units[0], w.units[1])).toBe(true); through(w, 22); expect(w.units[0].memory.ePhase).toBe(1); through(w, 23); expect(w.units[0].memory.ePhase).toBe(2); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 38); expect(w.units[1].totals.damageTaken).toBe(375); expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.6); expect(isUntargetable(w.units[0], w.units[1])).toBe(false); expect(w.units[0].cooldownReady.E).toBe(278); });
  it("Trickster is available after .15 seconds and lands with smaller radius and no slow", () => { const w = arena(fizz.spec, 400); cast(w, "E", { direction: 1, distance: 200 }); through(w, 3); expect(canCast(w, w.units[0], ability(fizz.spec, "E2"))).toBe(false); through(w, 5); expect(canCast(w, w.units[0], ability(fizz.spec, "E2"))).toBe(true); cast(w, "E2", { direction: 1, distance: 200 }); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(375); expect(w.units[1].statuses.some((s) => s.key === "slow")).toBe(false); });
  it("the natural hop permits directed movement with the sourced movement speed bonus", () => { const w = arena(fizz.spec, 1500); cast(w, "E", { direction: -1, distance: 25 }); through(w, 23); const x = w.units[0].x; step(w, [() => ({ kind: "move", direction: -1 }), standStill]); expect(w.units[0].x).toBeLessThan(x); });
  it("the natural splash waits until stasis ends", () => { const w = arena(fizz.spec, 400); cast(w, "E", { direction: 1, distance: 200 }); through(w, 23); state(w, "stasis", true, 1); through(w, 45); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 54); expect(w.units[1].totals.damageTaken).toBe(375); });
  it("the second hop's splash also waits until stasis ends", () => { const w = arena(fizz.spec, 400); cast(w, "E", { direction: 1, distance: 200 }); through(w, 5); cast(w, "E2", { direction: 1, distance: 200 }); state(w, "stasis", true, 1); through(w, 20); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 37); expect(w.units[1].totals.damageTaken).toBe(375); });
  it("the first dash interruption begins a targetable hop, whereas second interruption cancels splash", () => { const a = arena(fizz.spec, 400); cast(a, "E", { direction: 1, distance: 200 }); applyEffect(a, a.units[1], a.units[0], { type: "displace", direction: "away", distance: 0, duration: .1 }, { scale: 1 }); expect(a.units[0].memory.ePhase).toBe(2); expect(isUntargetable(a.units[0], a.units[1])).toBe(false); const b = arena(fizz.spec, 400); cast(b, "E", { direction: 1, distance: 200 }); through(b, 5); cast(b, "E2", { direction: 1, distance: 200 }); applyEffect(b, b.units[1], b.units[0], { type: "displace", direction: "away", distance: 0, duration: .1 }, { scale: 1 }); through(b, 50); expect(b.units[1].totals.damageTaken).toBe(0); expect(b.units[0].memory.ePhase).toBe(0); });
  it("landing damages an actual health-based pet once as area damage", () => { const w = arena(fizz.spec, 400), target = targetPet(w, 400); cast(w, "E", { direction: 1, distance: 200 }); through(w, 40); expect(target.hp).toBe(4625); expect(target.statuses?.find((s) => s.key === "slow")?.value).toBe(.6); });
  it.each([[400, 480, 200], [700, 600, 325], [1200, 720, 450]])("a lure intercepted near %s uses damage %s and radius %s", (distance, damage, radius) => { const w = arena(fizz.spec, distance); cast(w, "R"); through(w, 40); const zone = w.zones.find((z) => z.ability === "Rshark")!; expect(zone.radius).toBe(radius); expect(zone.memory?.attached).toBe(true); const due = zone.endTick; through(w, due - 1); expect(w.units[1].totals.damageTaken).toBe(0); through(w, due); expect(w.units[1].totals.damageTaken).toBe(damage); expect(w.units[1].statuses.find((s) => s.key === "airborne")?.endTick).toBe(due + 30); });
  it("an attached lure follows the holder and reveals actual invisibility", () => { const w = arena(fizz.spec, 400); cast(w, "R"); through(w, 20); state(w, "invisible"); expect(canSee(w.units[1], w.units[0])).toBe(true); w.units[1].x = 1000; const due = w.zones.find((z) => z.ability === "Rshark")!.endTick; through(w, due); expect(w.units[1].totals.damageTaken).toBe(480); });
  it("spell shield blocks attachment while leaving an independent ground eruption", () => { const w = arena(fizz.spec, 400); state(w, "spellShield"); cast(w, "R"); through(w, 20); const zone = w.zones.find((z) => z.ability === "Rshark")!; expect(zone.memory?.attached).toBe(false); w.units[1].x = 2000; through(w, zone.endTick); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("a shield applied after attachment blocks the shark damage and displacement", () => { const w = arena(fizz.spec, 400); cast(w, "R"); through(w, 20); state(w, "spellShield"); through(w, 100); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.some((s) => s.key === "airborne")).toBe(false); });
  it("pets do not attach a lure, but receive nearby shark damage as actual area targets", () => { const w = arena(fizz.spec, 400), target = targetPet(w, 300); cast(w, "R"); through(w, 30); expect(target.hp).toBe(5000); expect(target.statuses?.some((s) => s.key === "fizzLure")).toBeFalsy(); through(w, 100); expect(target.hp).toBe(4520); expect(target.statuses?.some((s) => s.key === "airborne")).toBe(false); });
  it("a wind wall stops the initial flight and creates an eruption at the exact wall", () => { const w = arena(fizz.spec, 1500); w.zones.push({ id: 999, owner: 1, kind: "projectileWall", x: 201, radius: 0, seenTick: 0, startTick: 0, endTick: 100 }); cast(w, "R"); through(w, 25); const zone = w.zones.find((z) => z.ability === "Rshark")!; expect(zone.x).toBe(201); expect(zone.memory?.distance).toBe(201); expect(zone.radius).toBe(200); expect(w.missiles.some((m) => m.source === "R")).toBe(false); });
  it("a projectile-blocking aura creates a ground eruption at its exact entry boundary", () => { const w = arena(fizz.spec, 700); state(w, "projectileBlock"); w.units[1].statuses.find((s) => s.key === "projectileBlock")!.value = 350; cast(w, "R"); through(w, 30); const zone = w.zones.find((z) => z.ability === "Rshark")!; expect(zone.x).toBe(285); expect(zone.memory?.attached).toBe(false); expect(zone.radius).toBe(200); });
  it("an un-intercepted lure erupts at its finite aimed range", () => { const w = arena(fizz.spec, 1500); cast(w, "R", { direction: 1, distance: 455 }); through(w, 30); const zone = w.zones.find((z) => z.ability === "Rshark")!; expect(zone.x).toBeCloseTo(455); expect(zone.radius).toBe(325); expect(zone.memory?.attached).toBe(false); });
  it("R originates from the end-of-cast position", () => { const w = arena(fizz.spec, 1500); cast(w, "R"); w.units[0].x = 100; through(w, 8); expect(w.units[0].memory.rOrigin).toBe(100); expect(w.missiles[0]!.x).toBe(100); });
  it("the independent lure and shark finish after Fizz dies", () => { const w = arena(fizz.spec, 400); cast(w, "R"); through(w, 20); w.units[0].hp = 0; w.units[0].alive = false; through(w, 110); expect(w.units[1].totals.damageTaken).toBe(480); expect(w.result?.winner).toBe(1); expect(w.result!.tick).toBeLessThan(110); });
  it("the delayed shark and empowered W clone without shared mutable state", () => { const w = arena(fizz.spec, 400); cast(w, "W"); cast(w, "R"); through(w, 20); const branch = cloneWorld(w); branch.units[1].x = 1000; through(branch, 100); expect(branch.units[1].totals.damageTaken).toBe(480); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.zones.find((z) => z.ability === "Rshark")!.x).toBe(400); expect(w.units[0].statuses.find((s) => s.kind === "empower")?.endTick).toBe(120); });
});

describe("Evelynn and Fizz production contracts", () => {
  it.each([eve, fizz])("$champion keeps hidden packets non-castable", (compiled) => { const w = arena(compiled.spec); for (const a of compiled.spec.abilities.filter((a) => a.activation === "internal")) expect(canCast(w, w.units[0], a)).toBe(false); });
  it.each([eve, fizz])("$champion values extra AD/AP/attack speed with finite reference damage", (compiled) => { const base = damagePerSecond(compiled.spec, fighter()), upgraded = damagePerSecond({ ...compiled.spec, bonus: { ad: 100, ap: 100, attackSpeed: .5 } }, fighter()); expect(Object.values(base).every(Number.isFinite)).toBe(true); expect(Object.values(upgraded).reduce((a, b) => a + b, 0)).toBeGreaterThan(Object.values(base).reduce((a, b) => a + b, 0)); });
  it.each([eve, fizz])("$champion's ordinary combat policy makes finite progress", (compiled) => { const w = arena(compiled.spec, 350); w.modes[0] = "fight"; while (w.tick < 350 && !w.result) step(w, [compiled.spec.behavior!, standStill]); expect(w.units[1].totals.damageTaken).toBeGreaterThan(300); expect(Number.isFinite(w.units[0].x)).toBe(true); expect(w.log.filter((l) => l.side === 0 && l.text.includes("casts")).length).toBeLessThan(50); });
  it("Evelynn policy waits for a mature Allure before breaking it", () => { const w = arena(eve.spec, 400); allure(w, 30); w.modes[0] = "fight"; expect(eve.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: 1 }); });
  it("Fizz's W restored after dodging is retained on a production Tibbers attack", () => {
    const annie = compileKit(championData("Annie"), records("Annie"), Annie, {}, pets("Annie"));
    const w = createWorld({ fighters: [fizz.spec, annie.spec], distance: 400, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30 } });
    startCast(w, w.units[1], ability(annie.spec, "R")); through(w, 10); const bear = w.pets.find((p) => p.spec.kind === "tibbers")!; expect(bear).toBeDefined();
    w.units[0].statuses = []; w.units[0].x = bear.x - 100; cast(w, "W"); const until = Number(w.units[0].memory.wUntil); bear.statuses = [{ kind: "state", key: "dodgeAttacks", source: 1, startTick: w.tick, endTick: w.tick + 100, value: 1 }]; startAttack(w, w.units[0], bear); through(w, 40);
    expect(w.units[0].statuses.find((s) => s.kind === "empower")?.endTick).toBe(until); expect(w.units[0].cooldownReady.W).toBe(Infinity);
  });
});


describe("Evelynn live dash tracking and selective stealth breaks", () => {
  it.each([600, -500, 1900])("empowered E follows an actual relocation to %s before arrival", x => {
    const w = arena(eve.spec, 250); w.units[0].memory.empoweredE = true; cast(w, "E2"); through(w, 8);
    expect(w.units[0].action?.kind).toBe("dash"); w.units[1].x = x; through(w, 9);
    const radii = w.units[0].spec.base.pathingRadius + w.units[1].spec.base.pathingRadius;
    expect(w.units[0].x).toBeCloseTo(x - Math.sign(x) * radii);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);
  });
  it("a 2000-unit target jump instead ends at its previous location without a remote hit", () => {
    const w = arena(eve.spec, 250); w.units[0].memory.empoweredE = true; cast(w, "E2"); through(w, 8);
    w.units[1].x = 2250; through(w, 9);
    expect(w.units[0].x).toBeCloseTo(250 - w.units[0].spec.base.pathingRadius - w.units[1].spec.base.pathingRadius);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("tracking observes an enemy blink completed on the same simulation tick", () => {
    const w = arena(eve.spec, 250); w.units[0].memory.empoweredE = true; cast(w, "E2"); through(w, 7);
    const blink = { key: "blink", name: "Blink fixture", slot: "E" as const, cooldown: 10, castTime: 1 / 30, delivery: { kind: "blink" as const, direction: "away" as const, distance: 500 } };
    w.units[1].spec = { ...w.units[1].spec, abilities: [blink] }; startCast(w, w.units[1], blink); through(w, 9);
    expect(w.units[1].x).toBe(750);
    expect(w.units[0].x).toBeCloseTo(750 - w.units[0].spec.base.pathingRadius - w.units[1].spec.base.pathingRadius);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);
  });
  it("an invalid target during the cast preserves mana, cooldown and empowerment", () => {
    const w = arena(eve.spec, 250); w.units[0].memory.empoweredE = true; const mana = w.units[0].resource;
    cast(w, "E2"); state(w, "untargetable"); through(w, 9);
    expect(w.units[0].resource).toBe(mana); expect(w.units[0].cooldownReady.E ?? 0).toBe(0);
    expect(w.units[0].memory.empoweredE).toBe(true); expect(w.units[0].action).toBeUndefined(); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("a blink completed just before E2 commits cancels without paying or consuming empowerment", () => {
    const w = arena(eve.spec, 250); w.settings.firstMover = 1; w.units[0].memory.empoweredE = true;
    const mana = w.units[0].resource; cast(w, "E2"); through(w, 6);
    const blink = { key: "blink", name: "Blink fixture", slot: "E" as const, cooldown: 10, castTime: 1 / 30, delivery: { kind: "blink" as const, direction: "away" as const, distance: 500 } };
    w.units[1].spec = { ...w.units[1].spec, abilities: [blink] }; startCast(w, w.units[1], blink); through(w, 9);
    expect(w.units[1].x).toBe(750); expect(w.units[0].x).toBe(0); expect(w.units[1].totals.damageTaken).toBe(0);
    expect(w.units[0].resource).toBe(mana); expect(w.units[0].cooldownReady.E ?? 0).toBe(0); expect(w.units[0].memory.empoweredE).toBe(true);
  });
  it("a target lost after commitment prevents contact without refunding its paid cost", () => {
    const w = arena(eve.spec, 250); w.units[0].memory.empoweredE = true; const mana = w.units[0].resource;
    cast(w, "E2"); through(w, 8); state(w, "untargetable"); through(w, 9);
    expect(w.units[0].resource).toBeLessThan(mana); expect(w.units[0].cooldownReady.E).toBeGreaterThan(w.tick);
    expect(w.units[0].action).toBeUndefined(); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["minion", "monster", "champion"] as const)("%s-class actual pet damage respects the shade restriction", targetClass => {
    const w = arena(eve.spec, 900); through(w, 120); const p = targetPet(w); p.spec = { ...p.spec, targetClass };
    dealDamage(w, petFormulaTarget(p, w.units[1], w.tick), w.units[0], 20, "true");
    expect(w.units[0].memory.shade).toBe(targetClass !== "champion");
  });
});


describe("co-located cast directions reflect with the caster", () => {
 it.each([0, 1] as const)("Evelynn R's backwards blink reflects for side %s", side => {
  const dummy = fighter({ base: { hp: 50000, armor: 0, mr: 0, hpRegen: 0 } });
  const w = createWorld({ fighters: side === 0 ? [eve.spec, dummy] : [dummy, eve.spec], distance: 0, modes: ["idle", "idle"] }); w.units[0].x = 0; w.units[1].x = 0;
  startCast(w, w.units[side], ability(eve.spec, "R")); through(w, 26); expect(w.units[side].x).toBe(side === 0 ? -700 : 700);
 });
 it.each([0, 1] as const)("Fizz R's aimed lure reflects for side %s", side => {
  const dummy = fighter({ base: { hp: 50000, armor: 0, mr: 0, hpRegen: 0 } });
  const w = createWorld({ fighters: side === 0 ? [fizz.spec, dummy] : [dummy, fizz.spec], distance: 0, modes: ["idle", "idle"] }); w.units[0].x = 0; w.units[1].x = 0;
  startCast(w, w.units[side], ability(fizz.spec, "R"), { direction: 1, distance: 600 }); through(w, 8);
  expect(w.units[side].memory.rAimDirection).toBe(side === 0 ? 1 : -1);
 });
});


describe("Evelynn and Fizz ordinary scenario modes", () => {
 for (const compiled of [eve, fizz]) it.each(["fight", "hold", "trade"] as const)(`${compiled.spec.name} %s mode respects offensive ultimate reservation`, mode => {
  const w = arena(compiled.spec, compiled === eve ? 300 : 700); w.modes[0] = mode;
  if (compiled === eve) w.units[1].hp = 5000;
  for (const a of compiled.spec.abilities) if (a.slot !== "R") w.units[0].cooldownReady[a.cooldownKey ?? a.key] = Infinity;
  expect(canCast(w, w.units[0], ability(compiled.spec, "R"))).toBe(true);
  const command = compiled.spec.behavior!(perceive(w, 0));
  expect(command?.kind === "cast" && command.ability === "R").toBe(mode === "fight");
 });
 it.each([eve, fizz])("$champion completed trade retreats despite every spell being ready", compiled => {
  const w = arena(compiled.spec, 300); w.modes[0] = "trade"; w.units[0].memory.tradeDone = true;
  expect(compiled.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: -1 });
 });
 it("Evelynn waits in place for a charged Allure in hold mode", () => {
  const w = arena(eve.spec, 600); w.modes[0] = "hold"; allure(w, 30);
  expect(eve.spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: 0 });
 });
});
