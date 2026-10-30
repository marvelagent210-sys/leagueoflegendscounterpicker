import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { damagePerSecond, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, attackHit, canSee, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Aim, type World } from "../../engine/sim/state";
import Khazix from "../../kits/champions/Khazix";
import { idle, lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const compiled = (unevolved = 0) => compileKit(championData("Khazix"), records("Khazix"), Khazix, { unevolved });
const ability = (w: World, key: string, side: 0 | 1 = 0) => w.units[side].spec.abilities.find((a) => a.key === key)!;
function arena(distance = 250, unevolved = 0, bonus: FighterSpec["bonus"] = {}): World {
  const spec = compiled(unevolved).spec; spec.bonus = bonus; spec.base = { ...spec.base, hpRegen: 0, resourceRegen: 0 };
  const w = createWorld({ fighters: [spec, fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0, resourceRegen: 0 } })], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 40, environment: { walls: false, minions: false, brush: false, laneSetup: false, wallDistance: 0 } } });
  w.units[0].x = 0; w.units[1].x = distance; return w;
}
const cast = (w: World, key: string, aim?: Aim) => startCast(w, w.units[0], ability(w, key), aim);
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [idle, idle]); }
function drain(w: World, limit = 100) { for (let i = 0; w.missiles.length && i < limit; i++) { w.tick++; advanceMissiles(w); } }
function pet(w: World, x: number, overrides: Partial<PetSpec> = {}, owner: 0 | 1 = 1) { return spawnPet(w, w.units[owner], { kind: "actual", name: "Actual summon", targetClass: "minion", hp: 10000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 100, ...overrides }, x); }
const direct = (w: World, key: string) => { const a = ability(w, key); abilityHit(w, w.units[0], w.units[1], a, a.onHit!); };
const ready = (w: World, key: string) => canCast(w, w.units[0], ability(w, key));

describe("Kha'Zix production scenarios", () => {
  it("uses QWER in default six-scenario 15000-gold fights with reflected builds and scores", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const spec = compiled().spec, opponent = kit("Darius").spec;
    const forward = simulateMatchup(spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    expect(forward.scenarios).toHaveLength(6);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
      expect(scenario.outcomes.every((o) => Number.isFinite(o.seconds) && o.hp.every(Number.isFinite) && o.damage.every(Number.isFinite))).toBe(true);
    }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(spec.abilities.find((a) => a.key === key)!.name))).toBe(true);
  }, 60000);
  it("reflects co-located aimed leap and every spike ray", () => {
    for (const side of [0, 1] as const) {
      const self = compiled().spec, other = fighter({ base: { hp: 100000, armor: 0, mr: 0 } });
      const w = createWorld({ fighters: side ? [other, self] : [self, other], distance: 0, modes: ["idle", "idle"] });
      w.units[0].x = 0; w.units[1].x = 0;
      startCast(w, w.units[side], ability(w, "E", side), { direction: 1, distance: 100 });
      expect(w.units[side].x).toBe(side === 0 ? 100 : -100);
      w.units[0].x = 0; w.units[1].x = 0;
      startCast(w, w.units[side], ability(w, "W", side)); through(w, 8);
      expect(w.missiles).toHaveLength(3); expect(w.missiles.every((m) => m.direction === (side ? -1 : 1))).toBe(true);
    }
  });
});

describe("Kha'Zix source guards and legal evolutions", () => {
  it("consumes all nine pinned primary revisions and exact game SHA", () => {
    const c = compiled();
    expect(new Set(c.evidence.filter((e) => e.revid).map((e) => e.revid))).toEqual(new Set([4072116, 4072117, 4064849, 3994647, 4006997, 3906950, 3969560, 4064850, 3971345]));
    const sources = c.evidence.filter((e) => e.url); expect(sources.length).toBeGreaterThanOrEqual(6);
    expect(sources.every((e) => e.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && e.sourceSha256 === "a245ce53e1b2e489ba9b359b3e6be299f28aeade045b9e1914a013cceb2de931")).toBe(true);
    expect(records("Khazix").every((r) => r.sources?.some((s) => s.page.revid === r.page.revid && s.text.some((t) => t.includes("|notes"))))).toBe(true);
  });
  it("fails closed when consumed source mechanics disappear", () => {
    const rules = records("Khazix"); const q = rules.find((a) => a.name === "Taste Their Fear")!; q.notes = []; q.sources = [];
    expect(() => compileKit(championData("Khazix"), rules, Khazix)).toThrow();
    const game = records("Khazix"); game.find((a) => a.name === "Void Assault")!.gameSources = [];
    expect(() => compileKit(championData("Khazix"), game, Khazix)).toThrow();
  });
  it("offers exactly four three-of-four evolutions and rejects invalid variants", () => {
    expect(compiled().variants).toEqual([1, 2, 3, 4].map((unevolved) => ({ unevolved })));
    for (let n = 1; n <= 4; n++) { const c = compiled(n); expect(c.variants).toEqual([]); expect(c.spec.attack.range).toBe(n === 1 ? 125 : 175); expect(c.spec.abilities.filter((a) => a.slot === "R")).toHaveLength(n === 4 ? 2 : 3); }
    for (const n of [-1, .5, 5, NaN]) expect(() => compiled(n)).toThrow();
    expect(compiled().assumptions.join(" ")).toContain("fourth evolution is not granted");
  });
  it("has finite stat-responsive damage and healing budgets without takedown history", () => {
    const plain = arena(), ad = arena(250, 0, { ad: 100 }), ap = arena(250, 0, { ap: 100 });
    const a = damagePerSecond(plain.units[0].spec, plain.units[1].spec), b = damagePerSecond(ad.units[0].spec, ad.units[1].spec);
    expect(Object.values(a).every(Number.isFinite)).toBe(true); expect(b.physical).toBeGreaterThan(a.physical); expect(b.magic).toBeGreaterThan(a.magic);
    expect(ap.units[0].spec.budget!.healing!(...ap.units)).toBeGreaterThan(plain.units[0].spec.budget!.healing!(...plain.units));
  });
});

describe("Kha'Zix isolation and targeted Q", () => {
  it("uses the exact max-rank isolated and ordinary bonus-AD formulas", () => {
    const w = arena(250, 0, { ad: 100 }); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBeCloseTo(378 + 220.5, 10);
    const n = arena(250, 0, { ad: 100 }); pet(n, 300); cast(n, "Q"); through(n, 8); expect(n.units[1].totals.damageTaken).toBe(285);
  });
  it("samples evolved Q cooldown at declaration and Q damage at completion", () => {
    const w = arena(); cast(w, "Q"); pet(w, 350); through(w, 8);
    expect(w.units[1].totals.damageTaken).toBe(180); expect(w.units[0].cooldownReady.Q).toBe(8 + 66);
    const n = arena(); const ally = pet(n, 350); cast(n, "Q"); ally.x = 1000; through(n, 8);
    expect(n.units[1].totals.damageTaken).toBe(378); expect(n.units[0].cooldownReady.Q).toBe(8 + 120);
  });
  it("uses normal cooldown without Q evolution and hasted reduction when evolved", () => {
    const n = arena(250, 1); cast(n, "Q"); through(n, 8); expect(n.units[0].cooldownReady.Q).toBe(128);
    const h = arena(250, 0, { abilityHaste: 100 }); cast(h, "Q"); through(h, 8); expect(h.units[0].cooldownReady.Q).toBe(41);
  });
  it("enforces center-range325 versus evolved375, without adding hitbox radii", () => {
    expect(ready(arena(325, 1), "Q")).toBe(true); expect(ready(arena(326, 1), "Q")).toBe(false);
    expect(ready(arena(375), "Q")).toBe(true); expect(ready(arena(376), "Q")).toBe(false);
  });
  it.each(["range", "invisible", "untargetable", "dead"])("cancels Q on target %s with no mana/cooldown", (change) => {
    const w = arena(), self = w.units[0], enemy = w.units[1], resource = self.resource; cast(w, "Q");
    if (change === "range") enemy.x = 500;
    else if (change === "dead") { enemy.hp = 0; enemy.alive = false; }
    else enemy.statuses.push(lasting("state", change));
    w.tick = 8; step(w, [idle, idle]);
    expect(self.resource).toBe(resource); expect(self.cooldownReady.Q).toBeUndefined(); expect(enemy.totals.damageTaken).toBe(0);
  });
  it("uses actual ally positions at the375 boundary and ignores allied caster pets", () => {
    for (const [x, expected] of [[625, 180], [626, 378]] as const) { const w = arena(); pet(w, x); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(expected); }
    const own = arena(); pet(own, 300, {}, 0); cast(own, "Q"); through(own, 8); expect(own.units[1].totals.damageTaken).toBe(378);
  });
  it.each(["minion", "champion", "other"] as const)("actual enemy %s pets prevent champion isolation", (targetClass) => {
    const w = arena(); pet(w, 300, { targetClass }); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(180);
  });
  it("hidden/untargetable/stasis allies still prevent isolation", () => {
    const w = arena(); const p = pet(w, 300, { untargetable: true }); p.statuses!.push(lasting("state", "invisible"), lasting("state", "stasis")); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(180);
  });
  it("monster pets do not protect champions but protect other monster targets", () => {
    const w = arena(); pet(w, 300, { targetClass: "monster" }); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(378);
    const n = arena(1500); const target = pet(n, 250, { targetClass: "monster" }); pet(n, 400, { targetClass: "monster" }); cast(n, "Q"); through(n, 8); expect(target.hp).toBe(9820);
    const m = arena(1500); const only = pet(m, 250, { targetClass: "monster" }); cast(m, "Q"); through(m, 8); expect(only.hp).toBe(9622);
  });
  it.each(["Ward", "Powder Keg", "Prophet of an Elder God", "Captive Audience", "Bushwhack", "Tunnel", "Absolution Mist Wraiths", "Noxious Trap", "Sovereign's Domination Mist Wraiths", "Dark Procession"])("%s does not prevent isolation", (name) => {
    const w = arena(); pet(w, 300, { name }); cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(378);
  });
  it("ignores dead/expired allies and uses the explicit minion-wave proxy", () => {
    const w = arena(); const p = pet(w, 300); p.hp = 0; const expired = pet(w, 300); expired.endTick = 0; cast(w, "Q"); through(w, 8); expect(w.units[1].totals.damageTaken).toBe(378);
    const n = arena(); n.settings.environment.minions = true; cast(n, "Q"); through(n, 8); expect(n.units[1].totals.damageTaken).toBe(180);
  });
  it("can select an actual pet by aim and does not transfer Q when that target dies", () => {
    const w = arena(); const p = pet(w, 100); cast(w, "Q", { direction: 1, distance: 100 }); through(w, 8); expect(p.hp).toBe(9820); expect(w.units[1].totals.damageTaken).toBe(0);
    const n = arena(); const target = pet(n, 100); const resource = n.units[0].resource; cast(n, "Q", { direction: 1, distance: 100 }); damagePet(n, n.units[0], target, 10000, "true", false); through(n, 8); expect(n.units[1].totals.damageTaken).toBe(0); expect(n.units[0].resource).toBe(resource); expect(n.units[0].cooldownReady.Q).toBeUndefined();
  });
});

describe("Kha'Zix Void Spike flights and actual explosions", () => {
  it("waits for cast/flight, using current caster location at cast completion", () => {
    const w = arena(600); cast(w, "W"); through(w, 7); expect(w.missiles).toHaveLength(0); w.units[0].x = 100; through(w, 8);
    expect(w.missiles).toHaveLength(3); expect(w.missiles.every((m) => m.x >= 100 && Number.isFinite(m.expiresTick))).toBe(true); expect(w.units[1].totals.damageTaken).toBe(0);
    drain(w); expect(w.units[1].totals.damageTaken).toBe(195);
  });
  it("fires one unevolved or three evolved missiles and damages/heals at most once", () => {
    for (const [variant, count] of [[2, 1], [4, 3]] as const) { const w = arena(100, variant, { ad: 100, ap: 100 }); w.units[0].hp -= 1000; const hp = w.units[0].hp; cast(w, "W"); through(w, 8); expect(w.missiles).toHaveLength(count); expect(w.units[1].totals.damageTaken).toBe(0); drain(w); expect(w.units[1].totals.damageTaken).toBe(295); expect(w.units[0].hp - hp).toBe(185); expect(w.log.filter((e) => e.text.startsWith("heals "))).toHaveLength(1); }
  });
  it("uses first actual pet collision and only its local explosion area", () => {
    const w = arena(900, 2), intercept = pet(w, 250), nearby = pet(w, 450), outside = pet(w, 600); cast(w, "W"); through(w, 8); drain(w);
    expect(intercept.hp).toBe(9805); expect(nearby.hp).toBe(9805); expect(outside.hp).toBe(10000); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("heals only inside actual explosion and not for max-range expiry", () => {
    const far = arena(600, 2); far.units[0].hp -= 1000; const hp = far.units[0].hp; cast(far, "W"); through(far, 8); drain(far); expect(far.units[0].hp).toBe(hp);
    const miss = arena(2000, 2); miss.units[0].hp -= 1000; const before = miss.units[0].hp; cast(miss, "W"); through(miss, 8); drain(miss); expect(miss.units[0].hp).toBe(before); expect(miss.units[1].totals.damageTaken).toBe(0); expect(miss.missiles).toHaveLength(0);
  });
  it("samples evolved slow isolation at actual impact", () => {
    const w = arena(600), ally = pet(w, 700); cast(w, "W"); through(w, 8); ally.x = 1400; drain(w); expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.6);
    const n = arena(600); cast(n, "W"); through(n, 8); pet(n, 700); drain(n); expect(n.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.4);
  });
  it("unevolved W has no slow/reveal and pets receive evolved slow but no champion reveal", () => {
    const w = arena(100, 2); cast(w, "W"); through(w, 8); drain(w); expect(w.units[1].statuses.some((s) => ["slow", "standardSight"].includes(s.key))).toBe(false);
    const n = arena(2000); const p = pet(n, 100); cast(n, "W"); through(n, 8); drain(n); expect(p.statuses!.some((s) => s.key === "slow")).toBe(true); expect(p.statuses!.some((s) => s.key === "standardSight")).toBe(false);
  });
  it("stops every spike ray at an actual projectile wall without explosion or healing", () => {
    const w = arena(600); w.units[0].hp -= 1000; const hp = w.units[0].hp;
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", ability: "wall", x: 100, radius: 0, seenTick: 0, startTick: 0, endTick: 1000, connects: true }); cast(w, "W"); through(w, 8); drain(w);
    expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].hp).toBe(hp); expect(w.missiles).toHaveLength(0);
  });
  it("can hit invisible enemies by area and preserves independent branched flight state", () => {
    const w = arena(500); cast(w, "W"); through(w, 8); const branch = cloneWorld(w); branch.units[1].x = 1500;
    w.units[1].statuses.push(lasting("state", "invisible")); drain(w); drain(branch); expect(w.units[1].totals.damageTaken).toBe(195); expect(branch.units[1].totals.damageTaken).toBe(0);
  });
  it("continues a released spike after caster death without healing the corpse", () => {
    const w = arena(600, 2); cast(w, "W"); through(w, 8);
    w.units[0].alive = false; w.units[0].hp = 0; drain(w);
    expect(w.units[1].totals.damageTaken).toBe(195);
    expect(w.units[0].hp).toBe(0);
    expect(w.missiles).toHaveLength(0);
  });
  it("records standard sight on an invisible champion without exposing stealth", () => {
    const w = arena(100); cast(w, "W"); through(w, 8);
    w.units[1].statuses.push(lasting("state", "invisible", 0, { source: 1 })); drain(w);
    expect(w.units[1].totals.damageTaken).toBe(195);
    expect(w.units[1].statuses.some(s => s.key === "standardSight")).toBe(true);
    expect(w.units[1].statuses.some(s => s.key === "revealed")).toBe(false);
    expect(canSee(w.units[1], w.units[0])).toBe(false);
  });
});

describe("Kha'Zix Leap and packet defenses", () => {
  it("uses700/1000 maximum destinations and damages only at landing", () => {
    const w = arena(1200); const crossed = pet(w, 400), landing = pet(w, 1000); cast(w, "E"); expect(w.units[0].x).toBe(1000); expect(crossed.hp).toBe(10000); expect(landing.hp).toBe(9795); expect(w.units[1].totals.damageTaken).toBe(205);
    const n = arena(1200, 3); cast(n, "E"); expect(n.units[0].x).toBe(700); expect(n.units[1].totals.damageTaken).toBe(0);
  });
  it("uses exact max-rank E scaling and a chosen backward destination", () => {
    const w = arena(250, 0, { ad: 100 }); cast(w, "E", { direction: -1, distance: 100 }); expect(w.units[0].x).toBe(-100); expect(w.units[1].totals.damageTaken).toBe(245);
  });
  it("crosses intervening terrain but clips a destination overlapping terrain", () => {
    const w = arena(1000); w.terrain.push({ id: w.nextId++, owner: 1, from: 200, to: 400, endTick: 1000 }); cast(w, "E"); expect(w.units[0].x).toBe(1000);
    const n = arena(300); n.terrain.push({ id: n.nextId++, owner: 1, from: 280, to: 400, endTick: 1000 }); cast(n, "E"); expect(n.units[0].x).toBe(280 - n.units[0].spec.base.pathingRadius);
  });
  it.each(["root", "ground"])("prevents E under %s", (cc) => { const w = arena(); w.units[0].statuses.push(lasting("cc", cc)); expect(ready(w, "E")).toBe(false); expect(ready(w, "Q")).toBe(true); });
  it("resets evolved E only on an actual champion takedown", () => {
    const w = arena(); cast(w, "E"); const tick = w.tick; dealDamage(w, w.units[0], w.units[1], 200000, "true"); expect(w.units[0].cooldownReady.E).toBe(tick);
    for (const targetClass of ["minion", "champion"] as const) { const n = arena(2000); pet(n, 500, { hp: 1, targetClass, unitClass: targetClass === "champion" ? "clone" : undefined }); cast(n, "E", { direction: 1, distance: 500 }); expect(n.units[0].cooldownReady.E).toBe(360); }
    const no = arena(250, 3); cast(no, "E"); dealDamage(no, no.units[0], no.units[1], 200000, "true"); expect(no.units[0].cooldownReady.E).toBe(360);
  });
  it.each(["Q", "W", "E"])("spell shield/parry guard %s damage without attack guards interfering", (key) => {
    for (const guard of ["spellShield", "parry", "untargetable", "stasis"]) { const w = arena(); w.units[1].statuses.push(lasting("state", guard, 0, { charges: 1 })); direct(w, key); expect(w.units[1].totals.damageTaken).toBe(0); }
    for (const guard of ["blind", "dodgeAttacks", "blockAttacks"]) { const w = arena(); (guard === "blind" ? w.units[0] : w.units[1]).statuses.push(lasting(guard === "blind" ? "cc" : "state", guard)); direct(w, key); expect(w.units[1].totals.damageTaken).toBeGreaterThan(0); }
  });
  it("a spell shield stops W damage/slow but cannot block its evolved champion reveal", () => {
    const w = arena(100); w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); cast(w, "W"); through(w, 8); drain(w);
    expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.some((s) => s.key === "slow")).toBe(false); expect(w.units[1].statuses.some((s) => s.key === "standardSight")).toBe(true);
  });
});

describe("Kha'Zix Unseen Threat and Void Assault clocks", () => {
  it("starts without fabricated passive history, then arms on actual sight loss", () => {
    const w = arena(100); expect(w.units[0].memory["khazix:threat"]).toBe(false); attackHit(w, w.units[0], w.units[1], false, []); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad, 10);
    w.units[1].statuses.push(lasting("cc", "nearsight", 50)); through(w, 0); expect(w.units[0].memory["khazix:threat"]).toBe(true);
    w.units[1].statuses = []; attackHit(w, w.units[0], w.units[1], false, []); expect(w.units[1].totals.damageTaken).toBeCloseTo(2 * derive(w.units[0]).ad + 155, 10); expect(w.units[0].memory["khazix:threat"]).toBe(false);
  });
  it("R grants passive through true sight and exact155+.5bonusAD champion-only damage", () => {
    const w = arena(100, 0, { ad: 100 }); w.units[0].statuses.push(lasting("state", "revealed")); cast(w, "R"); expect(canSee(w.units[0], w.units[1])).toBe(true); expect(w.units[0].memory["khazix:threat"]).toBe(true);
    attackHit(w, w.units[0], w.units[1], false, []); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad + 205, 10); expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.25);
  });
  it.each(["blind", "dodgeAttacks", "blockAttacks", "parry"])("%s prevents passive damage/slow and preserves the armed proc", (guard) => {
    const w = arena(100); cast(w, "R"); (guard === "blind" ? w.units[0] : w.units[1]).statuses.push(lasting(guard === "blind" ? "cc" : "state", guard));
    attackHit(w, w.units[0], w.units[1], guard === "blind", []); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.some((s) => s.key === "slow")).toBe(false); expect(w.units[0].memory["khazix:threat"]).toBe(true);
  });
  it("passive bypasses spell shield and does not give a second magic proc", () => {
    const w = arena(100); cast(w, "R"); w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); attackHit(w, w.units[0], w.units[1], false, []); attackHit(w, w.units[0], w.units[1], false, []); expect(w.units[1].totals.damageTaken).toBeCloseTo(2 * derive(w.units[0]).ad + 155, 10); expect(w.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });
  it.each([1, 4])("an actual champion-class clone receives Unseen Threat in evolution variant%s", (variant) => {
    const w = arena(1500, variant), clone = pet(w, 100, { targetClass: "champion", unitClass: "clone" });
    cast(w, "R"); startAttack(w, w.units[0], clone);
    const action = w.units[0].action;
    if (action?.kind !== "windup") throw new Error("actual pet attack missing");
    through(w, action.launchTick);
    expect(10000 - clone.hp).toBeCloseTo(derive(w.units[0]).ad + 155, 10);
    expect(clone.statuses!.find(s => s.key === "slow")?.value).toBe(.25);
    expect(w.units[0].memory["khazix:threat"]).toBe(false);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["minion", "monster", "other"] as const)("an actual%s summon takes its ordinary basic while preserving Unseen Threat", (targetClass) => {
    const w = arena(1500), target = pet(w, 100, { targetClass });
    cast(w, "R"); startAttack(w, w.units[0], target);
    const action = w.units[0].action;
    if (action?.kind !== "windup") throw new Error("actual pet attack missing");
    through(w, action.launchTick);
    expect(10000 - target.hp).toBeCloseTo(derive(w.units[0]).ad, 10);
    expect(target.statuses!.some(s => s.key === "slow")).toBe(false);
    expect(w.units[0].memory["khazix:threat"]).toBe(true);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("R costs100 only once and begins its70-second hasted cooldown immediately", () => {
    const w = arena(100, 0, { abilityHaste: 100 }), resource = w.units[0].resource; cast(w, "R"); expect(w.units[0].resource).toBe(resource - 100); expect(w.units[0].cooldownReady.R).toBe(1050); expect(ready(w, "R2")).toBe(false); expect(derive(w.units[0]).moveSpeed).toBeGreaterThan(345);
    through(w, 98); expect(ready(w, "R2")).toBe(true); cast(w, "R2"); expect(w.units[0].resource).toBe(resource - 100); expect(w.units[0].cooldownReady.R).toBe(1050); expect(w.units[0].memory["khazix:rUses"]).toBe(2);
  });
  it("opens free recast2 seconds after natural1.25-second stealth exit for twelve seconds", () => {
    const w = arena(); cast(w, "R"); through(w, 37); expect(w.units[0].memory["khazix:rActive"]).toBe(true); through(w, 38); expect(w.units[0].memory["khazix:rNext"]).toBe(98); expect(w.units[0].memory["khazix:rUntil"]).toBe(458); expect(ready(w, "R2")).toBe(false);
    w.tick = 97; expect(ready(w, "R2")).toBe(false); w.tick = 98; expect(ready(w, "R2")).toBe(true); w.tick = 458; expect(ready(w, "R2")).toBe(true); w.tick = 459; expect(ready(w, "R2")).toBe(false); expect(ready(w, "R")).toBe(false);
  });
  it("evolved R permits exactly three two-second stealth casts with independent exits", () => {
    const w = arena(100, 1); cast(w, "R"); through(w, 59); expect(w.units[0].memory["khazix:rActive"]).toBe(true); through(w, 60); expect(w.units[0].memory["khazix:rNext"]).toBe(120);
    w.tick = 120; cast(w, "R2"); through(w, 180); expect(w.units[0].memory["khazix:rNext"]).toBe(240); expect(ready(w, "R3")).toBe(false);
    w.tick = 240; expect(ready(w, "R3")).toBe(true); cast(w, "R3"); through(w, 300); expect(ready(w, "R2")).toBe(false); expect(ready(w, "R3")).toBe(false); expect(w.units[0].memory["khazix:rUses"]).toBe(3);
  });
  it("breaks stealth at basic attack launch and begins the exit lock immediately", () => {
    const w = arena(100); cast(w, "R"); startAttack(w, w.units[0]); expect(w.units[0].statuses.some((s) => s.key === "invisible")).toBe(true);
    const launch = w.units[0].action?.kind === "windup" ? w.units[0].action.launchTick : NaN; expect(Number.isFinite(launch)).toBe(true); through(w, launch - 1); expect(w.units[0].memory["khazix:rActive"]).toBe(true); through(w, launch); expect(w.units[0].memory["khazix:rActive"]).toBe(false); expect(w.units[0].memory["khazix:rNext"]).toBe(launch + 60); expect(w.units[0].statuses.some((s) => s.memoKey === "buff:khazix:rSpeed")).toBe(false);
  });
  it.each(["Q", "W", "E"])("%s declaration ends R stealth and speed without consuming passive", (key) => {
    const w = arena(100); cast(w, "R"); cast(w, key); expect(w.units[0].memory["khazix:rActive"]).toBe(false); expect(w.units[0].memory["khazix:rNext"]).toBe(60); expect(w.units[0].memory["khazix:threat"]).toBe(true); expect(w.units[0].statuses.some((s) => s.key === "invisible")).toBe(false); expect(w.units[0].statuses.some((s) => s.memoKey === "buff:khazix:rSpeed")).toBe(false);
  });
});

describe("Kha'Zix behavior and resource guards", () => {
  it.each(["trade", "hold"] as const)("reserves an actually ready R in %s with QWE unavailable", (mode) => {
    const w = arena(100); w.modes[0] = mode; for (const key of ["Q", "W", "E"]) w.units[0].cooldownReady[key] = 10000;
    expect(ready(w, "R")).toBe(true); expect(w.units[0].spec.behavior!(perceive(w, 0))).toEqual({ kind: "attack" }); expect(w.units[0].cooldownReady.R).toBeUndefined();
  });
  it.each(["trade", "hold"] as const)("reserves an actually ready free recast in %s", (mode) => {
    const w = arena(100, 1); cast(w, "R"); through(w, 120); w.modes[0] = mode; for (const key of ["Q", "W", "E"]) w.units[0].cooldownReady[key] = 10000;
    expect(ready(w, "R2")).toBe(true); expect(w.units[0].spec.behavior!(perceive(w, 0))).toEqual({ kind: "attack" });
  });
  it("retreats after completed trade with all four root spells ready", () => {
    const w = arena(100); w.modes[0] = "trade"; w.units[0].memory.tradeDone = true; for (const key of ["Q", "W", "E", "R"]) expect(ready(w, key)).toBe(true);
    expect(w.units[0].spec.behavior!(perceive(w, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("starts the normal trade clock before its first kit-priority cast", () => {
    const w = arena(100); w.modes[0] = "trade"; expect(w.units[0].spec.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "Q" }); expect(w.units[0].memory.tradeStart).toBe(0);
  });
  it("finishes a real short trade without R and retreats before any renewed spell", () => {
    const w = arena(250); w.modes[0] = "trade"; let retreat: number | undefined;
    for (let n = 0; n < 450 && !w.result; n++) { const tick = w.tick; step(w, [w.units[0].spec.behavior!, idle]); if (w.units[0].memory.tradeDone && retreat === undefined) retreat = tick; }
    expect(w.units[0].memory.tradeDone).toBe(true); expect(w.result?.reason).toBe("disengaged"); expect(retreat).toBeDefined();
    const casts = w.log.filter((r) => r.side === 0 && r.text.startsWith("casts ")); expect(casts.length).toBeGreaterThan(0); expect(casts.every((r) => r.tick < retreat! && !r.text.includes("Void Assault"))).toBe(true);
  });
  it("uses R in all-in when basics are unavailable and preserves idle/flee fallback commands", () => {
    const w = arena(100); w.modes[0] = "fight"; for (const key of ["Q", "W", "E"]) w.units[0].cooldownReady[key] = 10000;
    expect(w.units[0].spec.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "R" });
    for (const mode of ["idle", "flee"] as const) { const n = arena(100); n.modes[0] = mode; n.units[0].cooldownReady.E = 10000; expect(n.units[0].spec.behavior!(perceive(n, 0))).toEqual(mode === "idle" ? undefined : { kind: "move", direction: -1 }); }
  });
  it.each([0, 1] as const)("uses a legal reflected backward Leap while fleeing on side%s", (side) => {
    const spec = compiled().spec, opponent = fighter();
    const w = createWorld({ fighters: side ? [opponent, spec] : [spec, opponent], distance: 100, modes: side ? ["idle", "flee"] : ["flee", "idle"], settings: { environment: { walls: false, minions: false, brush: false, laneSetup: false, wallDistance: 0 } } });
    const self = w.units[side], before = self.x;
    const command = self.spec.behavior!(perceive(w, side));
    expect(command).toEqual({ kind: "cast", ability: "E", aim: { direction: -1, distance: 1000 } });
    step(w, side ? [idle, self.spec.behavior!] : [self.spec.behavior!, idle]);
    // An immediate E leaves the same tick available for ordinary retreat walking.
    expect(self.x - before).toBe((side === 0 ? -1 : 1) * (1000 + derive(self).moveSpeed / 30));
    expect(self.cooldownReady.E).toBe(360);
    expect(self.cooldownReady.R).toBeUndefined();
    expect(w.units[side === 0 ? 1 : 0].totals.damageTaken).toBe(0);
  });
  it("keeps fleeing by ordinary movement when backward Leap is grounded or unnecessary", () => {
    const grounded = arena(100); grounded.modes[0] = "flee"; grounded.units[0].statuses.push(lasting("cc", "ground"));
    expect(grounded.units[0].spec.behavior!(perceive(grounded, 0))).toEqual({ kind: "move", direction: -1 });
    const distant = arena(1400); distant.modes[0] = "flee";
    expect(distant.units[0].spec.behavior!(perceive(distant, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("requires actual mana, respects silence, and charges Q/W/E20/75/50", () => {
    for (const [key, cost] of [["Q", 20], ["W", 75], ["E", 50], ["R", 100]] as const) {
      const w = arena(100); w.units[0].resource = cost - 1; expect(ready(w, key)).toBe(false); w.units[0].resource = cost; expect(ready(w, key)).toBe(true); cast(w, key); through(w, 8); expect(w.units[0].resource).toBe(0);
      const n = arena(100); n.units[0].statuses.push(lasting("cc", "silence")); expect(ready(n, key)).toBe(false);
    }
  });
});
