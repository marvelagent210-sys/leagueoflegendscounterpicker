import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { cloneWorld, type World } from "../../engine/sim/state";
import { createWorld, step } from "../../engine/sim/simulate";
import type { PetSpec, StateType } from "../../engine/sim/spec";
import Xerath from "../../kits/champions/Xerath";
import { championData, records } from "./helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const compiled = () => compileKit(championData("Xerath"), records("Xerath"), Xerath);
function arena(distance = 500, ap = 100) {
  const spec = compiled().spec;
  const w = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } }, fighter({ base: { hp: 50000, hpRegen: 0, resourceRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 60, maxBranches: 1 } });
  w.units[0].x = 0; w.units[1].x = distance;
  return w;
}
const spell = (w: World, key: string) => w.units[0].spec.abilities.find(a => a.key === key)!;
const cast = (w: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(w, w.units[0], spell(w, key), aim);
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [standStill, standStill]); }
const cc = (w: World, key: "stun" | "silence" | "root", duration = 1) => applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: key, duration }, { scale: 1 });
const state = (w: World, key: StateType, self = false) => applyEffect(w, w.units[self ? 1 : 0], w.units[self ? 0 : 1], { type: "state", state: key, duration: 30, ...(key === "projectileBlock" ? { value: 500 } : {}) }, { scale: 1 });
const targetPet = (w: World, x: number, override: Partial<PetSpec> = {}) => spawnPet(w, w.units[1], { kind: "minion", name: "Actual minion", targetClass: "minion", hp: 5000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 60, ...override }, x);
const targetHP = (w: World) => w.units[1].hp;
const slow = (w: World, self = false) => w.units[self ? 0 : 1].statuses.find(s => s.kind === "cc" && s.key === "slow");

describe("Xerath pinned source and ordinary setup", () => {
  it("retains all five full primary revisions, nine exact object-scoped sources and the pinned basic speed", () => {
    const b = compiled();
    expect(new Set(b.evidence.filter(e => e.revid).map(e => e.revid))).toEqual(new Set([3881560, 3986753, 4057478, 4002918, 4008622]));
    expect(records("Xerath").every(a => a.sources?.some(s => s.page.revid === a.page.revid && s.text.some(t => t.includes("Ability data"))))).toBe(true);
    expect(records("Xerath").reduce((n, a) => n + (a.gameSources?.length ?? 0), 0)).toBe(9);
    expect(b.spec.attack.missileSpeed).toBe(2000);
    expect(b.evidence.some(e => e.sourceSha256 === "7bf2c884ad79b8fa87b4e393dc6ff51e60a0c4fe3881ce6d7a6a1a55019867d4")).toBe(true);
  });
  it("reads maximum-rank costs, cooldowns and channel restrictions", () => {
    const w = arena();
    expect(["Q", "W", "E", "R"].map(k => spell(w, k).cost)).toEqual([120, 120, 80, 100]);
    expect(["Q", "W", "E", "R"].map(k => spell(w, k).cooldown)).toEqual([5, 10, 11, 100]);
    expect(spell(w, "R2").staticCooldown).toBe(true);
    expect(w.units[0].memory["xerath:charge"]).toBeUndefined();
    expect(w.units[0].memory["xerath:rite"]).toBeUndefined();
  });
  it("exposes finite nominal budget damage without adding free mana or attacks", () => {
    const w = arena(), mana = w.units[0].resource;
    const budget = w.units[0].spec.budget!.damage!(w.units[0], w.units[1]);
    expect(budget?.magic).toBeCloseTo(320 / (1.75 + .528 + 5) + (425.085 - 255) / 10.25 + (6 * 315 + 15 * 35) / (100 + .5 + 5 * .627), 10);
    expect(w.units[0].resource).toBe(mana);
    expect(w.missiles).toHaveLength(0);
  });
});

describe("Xerath actual Mana Surge", () => {
  it("restores the complete level20 champion amount and starts the static16-second timer", () => {
    const w = arena(), self = w.units[0]; self.resource -= 600;
    const before = self.resource;
    attackHit(w, self, w.units[1], false, []);
    expect(self.resource - before).toBe(450);
    expect(self.memory["xerath:surgeReady"]).toBe(480);
    attackHit(w, self, w.units[1], false, []);
    expect(self.resource - before).toBe(450);
  });
  it("does not clip the restoration or consume readiness when less than the full amount is missing", () => {
    const w = arena(), self = w.units[0]; self.resource -= 449;
    attackHit(w, self, w.units[1], false, []);
    expect(self.resource).toBe(derive(self).maxResource - 449);
    expect(self.memory["xerath:surgeReady"]).toBeUndefined();
  });
  it("restores exactly225 against an actual nonchampion body", () => {
    const w = arena(), self = w.units[0], p = targetPet(w, 300); self.resource -= 600;
    const before = self.resource;
    resolveAttackOnPet(w, self, p, false, [], {});
    expect(self.resource - before).toBe(225);
  });
  it("triggers against a damage block but does not trigger on blind", () => {
    const a = arena(), b = arena(); a.units[0].resource -= 600; b.units[0].resource -= 600;
    state(a, "blockAttacks");
    const ma = a.units[0].resource, mb = b.units[0].resource;
    attackHit(a, a.units[0], a.units[1], false, []);
    attackHit(b, b.units[0], b.units[1], true, []);
    expect(a.units[0].resource - ma).toBe(450);
    expect(b.units[0].resource).toBe(mb);
  });
  it("shortens a running passive timer only for a real enemy kill", () => {
    const w = arena(), self = w.units[0]; self.memory["xerath:surgeReady"] = 480;
    const body = targetPet(w, 200, { hp: 10 });
    damagePet(w, self, body, 100, "true", false);
    expect(self.memory["xerath:surgeReady"]).toBe(375);
    through(w, 2);
    expect(self.memory["xerath:surgeReady"]).toBe(375);
  });
  it("does not shorten Mana Surge for an actual minion expiry", () => {
    const w = arena(); w.units[0].memory["xerath:surgeReady"] = 480;
    const body = targetPet(w, 200, { duration: .01 }); through(w, 2);
    expect(w.pets.includes(body)).toBe(false);
    expect(w.units[0].memory["xerath:surgeReady"]).toBe(480);
  });
});

describe("Xerath finite Arcanopulse charge and release", () => {
  it("pays once, opens a real channel, and forbids ordinary spells and basic attacks", () => {
    const w = arena(), self = w.units[0], mana = self.resource;
    cast(w, "Q");
    expect(self.resource).toBe(mana - 120);
    expect(self.action).toMatchObject({ kind: "channel", ability: "Q", endTick: 90 });
    expect(canCast(w, self, spell(w, "W"))).toBe(false);
    expect(canCast(w, self, spell(w, "Q2"))).toBe(true);
    expect(canStartAttack(w, self)).toBe(false);
    expect(self.action?.kind).toBe("channel");
  });
  it("increases the sourced charge slow at quarter-second steps and permits walking", () => {
    const w = arena(); cast(w, "Q");
    through(w, 7); expect(slow(w, true)?.value).toBe(0);
    through(w, 8); expect(slow(w, true)?.value).toBe(0.1);
    through(w, 53); expect(slow(w, true)?.value).toBe(0.4);
    const x = w.units[0].x;
    step(w, [() => ({ kind: "move", direction: -1 }), standStill]);
    expect(w.units[0].x).toBeLessThan(x);
  });
  it("times out with half mana refunded and the ordinary cooldown starting at timeout", () => {
    const w = arena(), self = w.units[0], mana = self.resource;
    cast(w, "Q"); through(w, 90);
    expect(self.resource).toBe(mana - 60);
    expect(self.memory["xerath:charge"]).toBeUndefined();
    expect(self.chains.Q).toBeUndefined();
    expect(self.cooldownReady.Q).toBe(240);
    expect(targetHP(w)).toBe(50000);
    expect(slow(w, true)).toBeUndefined();
  });
  it.each(["stun", "silence"] as const)("refunds half and ends a charge on accepted%s", type => {
    const w = arena(), self = w.units[0], mana = self.resource;
    cast(w, "Q"); w.tick = 10; cc(w, type);
    expect(self.resource).toBe(mana - 60);
    expect(self.memory["xerath:charge"]).toBeUndefined();
    expect(self.cooldownReady.Q).toBe(160);
    expect(self.action).toBeUndefined();
  });
  it("does not cancel its charge for an ordinary root", () => {
    const w = arena(); cast(w, "Q"); cc(w, "root");
    expect(w.units[0].action?.kind).toBe("channel");
    expect(w.units[0].memory["xerath:charge"]).toBe(0);
  });
  it("does not refund or end the charge when CC immunity rejects an interrupt", () => {
    const w = arena(), mana = w.units[0].resource; state(w, "ccImmune", true); cast(w, "Q"); cc(w, "silence");
    expect(w.units[0].action?.kind).toBe("channel");
    expect(w.units[0].resource).toBe(mana - 120);
    expect(w.units[0].memory["xerath:charge"]).toBe(0);
  });
  it("locks movement during the16-tick release and deals constant320 damage at zero charge", () => {
    const w = arena(500), self = w.units[0], mana = self.resource;
    cast(w, "Q"); cast(w, "Q2");
    expect(self.resource).toBe(mana - 120);
    expect(self.memory["xerath:qRange"]).toBe(700);
    expect(slow(w, true)).toBeUndefined();
    through(w, 15); expect(targetHP(w)).toBe(50000);
    through(w, 17); expect(targetHP(w)).toBe(49680);
    expect(self.cooldownReady.Q).toBe(166);
  });
  it("reaches1450 after the conservative1.75-second onset and ignores projectile walls", () => {
    const w = arena(1500); cast(w, "Q"); through(w, 53);
    state(w, "projectileBlock"); cast(w, "Q2"); through(w, 72);
    expect(w.units[0].memory["xerath:qRange"]).toBe(1450);
    expect(targetHP(w)).toBe(49680);
  });
  it("retains the release through an accepted stun but denies damage after caster death", () => {
    const a = arena(), b = arena();
    cast(a, "Q"); cast(a, "Q2"); cc(a, "stun"); through(a, 17);
    expect(targetHP(a)).toBe(49680);
    cast(b, "Q"); cast(b, "Q2"); dealDamage(b, b.units[1], b.units[0], 100000, "true"); through(b, 17);
    expect(targetHP(b)).toBe(50000);
  });
  it("uses its captured declaration direction and current beam origin after displacement", () => {
    const w = arena(500); cast(w, "Q"); cast(w, "Q2", { direction: -1 });
    w.units[0].x = 1000; through(w, 17);
    expect(targetHP(w)).toBe(49680);
  });
  it("hits actual pets on the beam but excludes bodies behind its rear edge", () => {
    const w = arena(500), front = targetPet(w, 300), rear = targetPet(w, -100);
    cast(w, "Q"); cast(w, "Q2"); through(w, 17);
    expect(front.hp).toBe(4680); expect(rear.hp).toBe(5000);
  });
  it("does not refund a released beam that contacts a spell shield", () => {
    const w = arena(), mana = w.units[0].resource; state(w, "spellShield"); cast(w, "Q"); cast(w, "Q2"); through(w, 17);
    expect(targetHP(w)).toBe(50000); expect(w.units[0].resource).toBe(mana - 120);
    expect(w.units[0].cooldownReady.Q).toBe(166);
  });
  it("keeps independent charge age and slow state in cloned branches", () => {
    const w = arena(); cast(w, "Q"); through(w, 8);
    const branch = cloneWorld(w); cast(branch, "Q2");
    expect(branch.units[0].memory["xerath:charge"]).toBeUndefined();
    expect(w.units[0].memory["xerath:charge"]).toBe(0);
    expect(slow(w, true)?.value).toBe(0.1);
  });
});

describe("Xerath Eye of Destruction real landing geometry", () => {
  it("waits for its cast and landing delay then uses the exact center formula", () => {
    const w = arena(); cast(w, "W"); through(w, 23); expect(targetHP(w)).toBe(50000);
    through(w, 24); expect(targetHP(w)).toBeCloseTo(50000 - 425.085, 10);
    expect(slow(w)?.value).toBeCloseTo(0.8, 12);
  });
  it("distinguishes epicenter centers from outer overlaps for each actual recipient", () => {
    const w = arena(), inner = targetPet(w, 625), outer = targetPet(w, 650), edge = targetPet(w, 810), missed = targetPet(w, 811);
    cast(w, "W"); through(w, 24);
    expect(inner.hp).toBeCloseTo(5000 - 425.085, 10);
    expect(outer.hp).toBe(4745); expect(edge.hp).toBe(4745); expect(missed.hp).toBe(5000);
  });
  it("decays its explicitly documented center slow to the ordinary25% floor", () => {
    const w = arena(); cast(w, "W"); through(w, 24); const end = slow(w)!.endTick;
    through(w, 61); expect(slow(w)?.value).toBeCloseTo(0.25 + 0.55 * (end - 61) / 75, 10);
    through(w, end); expect(slow(w)).toBeUndefined();
  });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("preserves%s at the actual landing", defense => {
    const w = arena(); state(w, defense); cast(w, "W"); through(w, 26);
    expect(targetHP(w)).toBe(50000); expect(slow(w)).toBeUndefined();
  });
  it("keeps its ground destination fixed when the target moves out", () => {
    const w = arena(); cast(w, "W"); through(w, 8); w.units[1].x = 1500; through(w, 26);
    expect(targetHP(w)).toBe(50000);
  });
  it("captures the target location before its cast time instead of tracking movement during the cast", () => {
    const w = arena(); cast(w, "W"); w.units[1].x = 1500; through(w, 8);
    expect(w.zones[0]?.x).toBe(500); through(w, 26);
    expect(targetHP(w)).toBe(50000);
  });
  it("retains the absolute declared location through caster displacement during the cast", () => {
    const w = arena(); cast(w, "W"); w.units[0].x = -1000; through(w, 8);
    expect(w.zones[0]?.x).toBe(500); through(w, 26);
    expect(targetHP(w)).toBeCloseTo(50000 - 425.085, 10);
  });
  it("keeps the declared center when both champions move and the real pet stays in the blast", () => {
    const w = arena(), body = targetPet(w, 500);
    cast(w, "W"); w.units[0].x = -1000; w.units[1].x = 2000; through(w, 8);
    expect(w.zones[0]?.x).toBe(500); through(w, 26);
    expect(targetHP(w)).toBe(50000);
    expect(body.hp).toBeCloseTo(5000 - 425.085, 10);
  });
  it("preserves outer damage when slow immunity rejects the center slow", () => {
    const w = arena(); state(w, "slowImmune"); cast(w, "W"); through(w, 26);
    expect(targetHP(w)).toBeCloseTo(50000 - 425.085, 10); expect(slow(w)).toBeUndefined();
  });
  it("retains a released impact after death but does not release from an unfinished cast", () => {
    const a = arena(), b = arena(); cast(a, "W"); through(a, 8); dealDamage(a, a.units[1], a.units[0], 100000, "true"); through(a, 26);
    expect(targetHP(a)).toBeCloseTo(50000 - 425.085, 10);
    cast(b, "W"); dealDamage(b, b.units[1], b.units[0], 100000, "true"); through(b, 26); expect(targetHP(b)).toBe(50000);
  });
  it("reveals the caster only when its declared landing center is within100 of an actual enemy", () => {
    const a = arena(), b = arena(); cast(a, "W"); cast(b, "W", { direction: 1, distance: 300 });
    expect(a.units[0].statuses.find(s => s.key === "standardSight")?.endTick).toBe(135);
    expect(b.units[0].statuses.some(s => s.key === "standardSight")).toBe(false);
  });
  it("checks an actual enemy pet for the declaration reveal when the rival champion is far away", () => {
    const w = arena(4000); targetPet(w, 900);
    cast(w, "W", { direction: 1, distance: 900 });
    expect(w.units[0].statuses.find(s => s.key === "standardSight")?.endTick).toBe(135);
  });
  it.each(["allied", "untargetable", "stasis"] as const)("does not treat an%s pet as a valid hostile declaration-reveal trigger", unavailable => {
    const w = arena(4000), body = targetPet(w, 900, { untargetable: unavailable === "untargetable" });
    if (unavailable === "allied") body.owner = 0;
    if (unavailable === "stasis") body.statuses!.push({ kind: "state", key: "stasis", source: 1, value: 0, startTick: 0, endTick: 30 });
    cast(w, "W", { direction: 1, distance: 900 });
    expect(w.units[0].statuses.some(s => s.key === "standardSight")).toBe(false);
  });
});

describe("Xerath Shocking Orb actual traveled stun", () => {
  it("stuns at the actual leading-edge collision point independently of later caster movement", () => {
    const w = arena(500); cast(w, "E"); through(w, 8); w.units[0].x = -1000; through(w, 20);
    const stun = w.units[1].statuses.find(s => s.key === "stun")!;
    expect(targetHP(w)).toBe(49765);
    expect(stun.endTick - stun.startTick).toBe(Math.ceil((0.75 + 1.5 * 375 / 1050) * 30 - 1e-9));
  });
  it("caps its stun at2.25seconds for a body reached after1050 travel", () => {
    const w = arena(1185); cast(w, "E"); through(w, 38);
    const stun = w.units[1].statuses.find(s => s.key === "stun")!;
    expect(stun.endTick - stun.startTick).toBe(68);
  });
  it("stops on the first actual minion and never reaches the champion behind it", () => {
    const w = arena(500), p = targetPet(w, 250); cast(w, "E"); through(w, 35);
    expect(p.hp).toBe(4765); expect(targetHP(w)).toBe(50000);
    expect(p.statuses?.some(s => s.key === "stun")).toBe(true);
  });
  it("does not collide with a protected minion or fabricate a blocker", () => {
    const w = arena(500); targetPet(w, 250, { untargetable: true }); cast(w, "E"); through(w, 30);
    expect(targetHP(w)).toBe(49765);
  });
  it.each(["spellShield", "parry", "projectileBlock"] as const)("respects%s before damage and control", defense => {
    const w = arena(); state(w, defense); cast(w, "E"); through(w, 40);
    expect(targetHP(w)).toBe(50000); expect(w.units[1].statuses.some(s => s.key === "stun")).toBe(false);
  });
  it("deals its damage through CC immunity without applying a stun", () => {
    const w = arena(); state(w, "ccImmune"); cast(w, "E"); through(w, 30);
    expect(targetHP(w)).toBe(49765); expect(w.units[1].statuses.some(s => s.key === "stun")).toBe(false);
  });
  it("applies tenacity to the distance-scaled stun only after computing actual travel", () => {
    const w = arena(); applyEffect(w, w.units[1], w.units[1], { type: "state", state: "tenacity", duration: 30, value: .5 }, { scale: 1 });
    cast(w, "E"); through(w, 20);
    const stun = w.units[1].statuses.find(s => s.key === "stun")!;
    expect(stun.endTick - stun.startTick).toBe(Math.ceil((0.75 + 1.5 * 375 / 1050) * .5 * 30 - 1e-9));
  });
  it("keeps an already released missile after death", () => {
    const w = arena(); cast(w, "E"); through(w, 8); dealDamage(w, w.units[1], w.units[0], 100000, "true"); through(w, 30);
    expect(targetHP(w)).toBe(49765);
  });
});

describe("Xerath finite Rite of the Arcane", () => {
  it("starts with exactly six available shots, zero stacks and a15-tick initial lock", () => {
    const w = arena(); cast(w, "R");
    expect(w.units[0].memory["xerath:rUsed"]).toBe(0);
    expect(w.units[0].memory["xerath:rStacks"]).toBe(0);
    expect(canCast(w, w.units[0], spell(w, "R2"))).toBe(false);
    through(w, 14); expect(canCast(w, w.units[0], spell(w, "R2"))).toBe(true);
  });
  it("captures one shot's damage before its hit grants a stack to later casts", () => {
    const w = arena(); cast(w, "R"); through(w, 14); cast(w, "R2"); through(w, 33);
    expect(targetHP(w)).toBe(50000);
    through(w, 34); expect(targetHP(w)).toBe(49685); expect(w.units[0].memory["xerath:rStacks"]).toBe(1);
    cast(w, "R2"); through(w, 54); expect(targetHP(w)).toBe(49335); expect(w.units[0].memory["xerath:rStacks"]).toBe(2);
  });
  it("enforces the static19-tick firing cooldown even with100abilityhaste", () => {
    const w = arena(); w.units[0].spec.bonus!.abilityHaste = 100; cast(w, "R"); through(w, 14); cast(w, "R2");
    expect(w.units[0].cooldownReady.R2).toBe(34);
    w.tick = 33; expect(canCast(w, w.units[0], spell(w, "R2"))).toBe(false);
    w.tick = 34; expect(canCast(w, w.units[0], spell(w, "R2"))).toBe(true);
  });
  it("spends only the100activation mana and ends after six real shots", () => {
    const w = arena(), self = w.units[0], mana = self.resource; cast(w, "R");
    for (let i = 0; i < 6; i++) { through(w, 14 + i * 20); cast(w, "R2"); }
    through(w, 116);
    expect(self.resource).toBe(mana - 100);
    expect(self.memory["xerath:rUsed"]).toBe(6);
    expect(self.memory["xerath:rite"]).toBeUndefined();
    expect(canCast(w, self, spell(w, "R2"))).toBe(false);
    through(w, 135); expect(targetHP(w)).toBe(47585);
  });
  it.each(["spellShield", "parry"] as const)("does not grant Arcane Perfection for%s", defense => {
    const w = arena(); state(w, defense); cast(w, "R"); through(w, 14); cast(w, "R2"); through(w, 35);
    expect(w.units[0].memory["xerath:rStacks"]).toBe(0);
    expect(targetHP(w)).toBe(50000);
  });
  it("does not grant champion stacks for ordinary minions or clones", () => {
    const w = arena(4000); const a = targetPet(w, 300), b = targetPet(w, 350, { targetClass: "champion", unitClass: "clone" });
    cast(w, "R"); through(w, 14); cast(w, "R2", { direction: 1, distance: 300 }); through(w, 35);
    expect(a.hp).toBe(4685); expect(b.hp).toBe(4685); expect(w.units[0].memory["xerath:rStacks"]).toBe(0);
  });
  it("grants at most one stack when one impact hits multiple actual champion bodies", () => {
    const w = arena(500); targetPet(w, 500, { targetClass: "champion", kind: "realChampion", name: "Actual additional champion" });
    cast(w, "R"); through(w, 14); cast(w, "R2"); through(w, 35);
    expect(w.units[0].memory["xerath:rStacks"]).toBe(1);
  });
  it("counts a real additional champion when the main rival is outside the blast", () => {
    const w = arena(4000); targetPet(w, 300, { targetClass: "champion", kind: "realChampion", name: "Actual additional champion" });
    cast(w, "R"); through(w, 14); cast(w, "R2", { direction: 1, distance: 300 }); through(w, 35);
    expect(w.units[0].memory["xerath:rStacks"]).toBe(1);
  });
  it.each([false, true])("refreshes channel sight for a real additional champion but not a clone: clone=%s", clone => {
    const w = arena(6000);
    targetPet(w, 300, { targetClass: "champion", ...(clone ? { unitClass: "clone" as const } : {}), kind: "realChampion", name: "Actual additional champion" });
    cast(w, "R"); through(w, 14); cast(w, "R2", { direction: 1, distance: 300 }); through(w, 16);
    expect(w.units[0].statuses.some(s => s.key === "standardSight")).toBe(!clone);
  });
  it("halves only the unused channel's cooldown when cancelled", () => {
    const a = arena(), b = arena(); cast(a, "R"); cast(b, "R"); through(a, 39); through(b, 14); cast(b, "R2"); through(b, 39);
    cast(a, "Rend"); cast(b, "Rend");
    expect(a.units[0].cooldownReady.R).toBe(1540); expect(b.units[0].cooldownReady.R).toBe(3040);
  });
  it("disables movement cancellation until1.25seconds but permits later cancellation", () => {
    const w = arena(); cast(w, "R");
    step(w, [() => ({ kind: "move", direction: -1 }), standStill]); expect(w.units[0].action?.kind).toBe("channel");
    through(w, 38); step(w, [() => ({ kind: "move", direction: -1 }), standStill]);
    expect(w.units[0].action).toBeUndefined(); expect(w.units[0].memory["xerath:rite"]).toBeUndefined();
  });
  it("allows a basic attack to cancel the channel immediately", () => {
    const w = arena(300); cast(w, "R");
    step(w, [() => ({ kind: "attack" }), standStill]);
    expect(w.units[0].action?.kind).toBe("windup"); expect(w.units[0].memory["xerath:rite"]).toBeUndefined();
  });
  it("ends on accepted silence but retains an already declared shot", () => {
    const w = arena(); cast(w, "R"); through(w, 14); cast(w, "R2"); cc(w, "silence");
    expect(w.units[0].memory["xerath:rite"]).toBeUndefined(); through(w, 35);
    expect(targetHP(w)).toBe(49685);
  });
  it("keeps a shot after death and does not create another shot or stack", () => {
    const w = arena(); cast(w, "R"); through(w, 14); cast(w, "R2"); dealDamage(w, w.units[1], w.units[0], 100000, "true"); through(w, 35);
    expect(targetHP(w)).toBe(49685); expect(w.units[0].memory["xerath:rite"]).toBeUndefined();
  });
  it("ends a wholly unused channel after10seconds with a half cooldown", () => {
    const w = arena(); cast(w, "R"); through(w, 300);
    expect(w.units[0].memory["xerath:rite"]).toBeUndefined(); expect(w.units[0].cooldownReady.R).toBe(1800);
  });
});
