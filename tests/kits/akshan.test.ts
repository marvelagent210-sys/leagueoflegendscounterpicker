import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { AbilityRecord } from "../../engine/abilities";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import type { ChampionDataset } from "../../engine/types";
import { advanceMissiles, attackTiming, canCast, launchAttack, launchBonusAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, abilityHitPet, applyEffect, attackHit, canTarget } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type World } from "../../engine/sim/state";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import akshan from "../../kits/champions/Akshan";
import { fighter } from "../sim/kits";
import { idle, lasting } from "../sim/helpers";

const directory = new URL("../../data/16.20/", import.meta.url);
const champion = (JSON.parse(readFileSync(new URL("champions.json", directory), "utf8")) as ChampionDataset).champions.find((c) => c.id === "Akshan")!;
const records = () => JSON.parse(readFileSync(new URL("abilities/Akshan.json", directory), "utf8")) as AbilityRecord[];
const compiled = () => compileKit(champion, records(), akshan);
const ability = (self: FighterSpec, key: string) => self.abilities.find((a) => a.key === key)!;
function arena(distance = 300, bonus: FighterSpec["bonus"] = {}): World {
  const spec = compiled().spec; spec.bonus = bonus;
  const world = createWorld({ fighters: [spec, fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, resourceRegen: 0 } })], distance, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = distance; world.settings.environment.brush = false;
  return world;
}
function advance(world: World, until: number) { while (world.tick <= until && !world.result) step(world, [idle, idle]); }
const cast = (world: World, key: string, aim?: { direction: -1 | 1; distance?: number }) => startCast(world, world.units[0], ability(world.units[0].spec, key), aim);
function pet(world: World, x = 200, overrides: Partial<PetSpec> = {}) {
  return spawnPet(world, world.units[1], { kind: "test", name: "actual summon", hp: 10000, armor: 0, mr: 0, moveSpeed: 0, radius: 20, duration: 100, ...overrides }, x);
}
function rootEnemy(world: World) { world.units[1].statuses.push(lasting("cc", "root")); }
function markCount(world: World, target = world.units[1]) { return target.statuses.find((s) => s.key === "akshan:dirty" && s.endTick > world.tick)?.value ?? 0; }
function wall(world: World, from = 500, to = 550, endTick = 1000) { world.terrain.push({ id: world.nextId++, owner: 1, from, to, endTick }); }
function attach(world: World) { cast(world, "E"); advance(world, 8); expect(world.units[0].memory["akshan:swing:phase"]).toBe("attached"); }
function drain(world: World, limit = 150) { for (let i = 0; world.missiles.length && i < limit; i++) { world.tick++; advanceMissiles(world); } }

describe("Akshan pinned sources and level-20 passive", () => {
  it("compiles thirteen source-backed stages with the exact game version and SHA", () => {
    const kit = compiled(); expect(kit.spec.abilities).toHaveLength(13);
    const source = kit.evidence.filter((e) => e.url);
    expect(source.length).toBeGreaterThan(5);
    expect(source.every((e) => e.sourceSha256 === "1110fe2b5c8eac649768b6c08b662bd7d85fd3947b593a30d7394485926ca128" && e.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release")).toBe(true);
  });
  it("fails closed when a consumed rule or pinned numeric excerpt changes", () => {
    const changed = records(); changed.find((a) => a.kind === "I")!.notes = [];
    expect(() => compileKit(champion, changed, akshan)).toThrow();
  });
  it("consumes the third target-local stack before the physical basic and grants the extrapolated level-20 shield", () => {
    const w = arena(300, { ap: 100, ad: 100 }), [self, enemy] = w.units;
    const packets: string[] = []; self.spec.hooks = { ...self.spec.hooks, onDamageDealt(ctx) { packets.push(ctx.damageType); } };
    for (let i = 0; i < 3; i++) attackHit(w, self, enemy, false, []);
    expect(enemy.totals.damageTaken).toBeCloseTo(3 * derive(self).ad + 210, 10);
    expect(packets.slice(-2)).toEqual(["magic", "physical"]); expect(markCount(w)).toBe(0);
    const shield = self.statuses.find((s) => s.memoKey === "akshan:shield")!;
    expect(shield.value).toBeCloseTo(40 + 240 / 17 * 19 * (.7025 + .0175 * 19) + 35, 10);
    expect(shield.endTick).toBe(60);
  });
  it("starts the four-second static shield cooldown on destruction, independent of haste", () => {
    const w = arena(300, { abilityHaste: 200 }), [self, enemy] = w.units;
    for (let i = 0; i < 3; i++) attackHit(w, self, enemy, false, []);
    applyEffect(w, enemy, self, { type: "damage", damageType: "true", amount: { base: 500 } }, { scale: 1 });
    step(w, [idle, idle]); expect(self.memory["akshan:shield:ready"]).toBe(120);
    for (let i = 0; i < 3; i++) attackHit(w, self, enemy, false, []);
    expect(self.statuses.some((s) => s.memoKey === "akshan:shield")).toBe(false);
    advance(w, 120); for (let i = 0; i < 3; i++) attackHit(w, self, enemy, false, []);
    expect(self.statuses.some((s) => s.memoKey === "akshan:shield")).toBe(true);
  });
  it("expires marks after five seconds and does not pool champion and actual-pet stacks", () => {
    const w = arena(), [self, enemy] = w.units, target = pet(w);
    attackHit(w, self, enemy, false, []); launchBonusAttack(w, self, target); drain(w);
    expect(markCount(w)).toBe(1); expect(target.statuses?.find((s) => s.key === "akshan:dirty")?.value).toBe(1);
    advance(w, 155); attackHit(w, self, enemy, false, []); expect(markCount(w)).toBe(1);
  });
  it("lets a pet proc its own magic damage without granting the champion shield", () => {
    const w = arena(), [self] = w.units, target = pet(w);
    for (let i = 0; i < 6; i++) { launchBonusAttack(w, self, target); drain(w); }
    expect(10000 - target.hp).toBeCloseTo(6 * derive(self).ad + 300, 10);
    expect(target.statuses?.some((s) => s.key === "akshan:dirty")).toBe(false);
    expect(self.statuses.some((s) => s.memoKey === "akshan:shield")).toBe(false);
  });
  it("applies champion-only shield and Q contact effects to an explicitly champion-class clone", () => {
    const w = arena(), [self] = w.units, clone = pet(w, 200, { targetClass: "champion" });
    for (let i = 0; i < 3; i++) { launchBonusAttack(w, self, clone); drain(w); }
    expect(self.statuses.some((s) => s.memoKey === "akshan:shield")).toBe(true);
    const q = ability(self.spec, "Qout"), before = clone.hp; abilityHitPet(w, self, clone, q, q.onHit!);
    expect(before - clone.hp).toBeCloseTo(165, 10); expect(self.memory["akshan:q:ms"]).toBeCloseTo(.2, 10);
  });
  it.each(["blind", "dodgeAttacks", "blockAttacks", "parry"])("denies passive stacks from a basic stopped by %s", (guard) => {
    const w = arena(), [self, enemy] = w.units;
    if (guard === "blind") self.statuses.push(lasting("cc", guard)); else enemy.statuses.push(lasting("state", guard));
    attackHit(w, self, enemy, guard === "blind", []); expect(markCount(w)).toBe(0);
  });
});

describe("Akshan two-part basic and cancellation policy", () => {
  it("launches a separate half-AD critical shot and begins its attack cooldown at that launch", () => {
    const w = arena(300, { critChance: 1 }), [self, enemy] = w.units;
    startAttack(w, self); const windup = self.action!; launchAttack(w, self, windup);
    const due = Number(self.memory["akshan:second:due"]); expect(self.attackReadyTick).toBe(Infinity);
    advance(w, due);
    expect(self.attackReadyTick).toBe(due + Math.ceil(30 / derive(self).attackSpeed - 1e-9));
    advance(w, due + 15); expect(enemy.totals.damageTaken).toBeCloseTo(derive(self).ad * 3, 10);
    expect(markCount(w)).toBe(2);
  });
  it("cancels the second shot on a cast and grants the level-20 AS-scaled decaying movement bonus", () => {
    const w = arena(), [self] = w.units;
    startAttack(w, self); const originalReady = self.attackReadyTick; launchAttack(w, self);
    cast(w, "W"); expect(self.memory["akshan:second:pending"]).toBe(false); expect(self.attackReadyTick).toBe(originalReady);
    step(w, [idle, idle]);
    const full = Number(self.memory["akshan:second:ms"]);
    expect(full).toBeCloseTo((20 + 55 * 19 / 17) * (1 + derive(self).bonusAttackSpeed), 10);
    expect(self.statuses.find((s) => s.memoKey === "buff:akshan:second:decay")?.value).toBeCloseTo(full, 10);
    advance(w, 15); expect(self.statuses.find((s) => s.memoKey === "buff:akshan:second:decay")?.value).toBeCloseTo(full / 2, 10);
    advance(w, 31); expect(self.statuses.some((s) => s.memoKey === "buff:akshan:second:decay")).toBe(false);
  });
  it.each(["minion", "champion", "other"] as const)("uses explicit %s pet classification for the second shot", (targetClass) => {
    const w = arena(), [self] = w.units, target = pet(w, 200, { targetClass });
    startAttack(w, self, target); launchAttack(w, self); advance(w, 30);
    expect(10000 - target.hp).toBeCloseTo(derive(self).ad * (targetClass === "minion" ? 2 : 1.5), 10);
  });
  it("retargets the second shot to the visible champion when the first kills its actual-pet target", () => {
    const w = arena(300), [self, enemy] = w.units, target = pet(w, 100, { hp: 1, targetClass: "minion" });
    startAttack(w, self, target); launchAttack(w, self); advance(w, 20);
    expect(target.hp).toBeLessThanOrEqual(0); expect(enemy.totals.damageTaken).toBeCloseTo(derive(self).ad * .5, 10);
  });
  it("keeps cloned pending-shot state independent", () => {
    const w = arena(); startAttack(w, w.units[0]); launchAttack(w, w.units[0]); const copy = cloneWorld(w);
    cast(copy, "W"); expect(copy.units[0].memory["akshan:second:pending"]).toBe(false); expect(w.units[0].memory["akshan:second:pending"]).toBe(true);
    advance(w, 20); expect(markCount(w)).toBe(2); expect(markCount(copy)).toBe(0);
  });
});

describe("Akshan Avengerang actual outbound and return flight", () => {
  it("hits once per pass and starts cooldown only after returning to the current caster", () => {
    const w = arena(300); rootEnemy(w); cast(w, "Q"); advance(w, 15);
    expect(markCount(w)).toBe(1); expect(w.units[0].cooldownReady.Q).toBe(Infinity);
    w.units[0].x = -100; advance(w, 60);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(330, 10); expect(markCount(w)).toBe(2);
    expect(w.missiles.filter((m) => m.source.startsWith("Q"))).toHaveLength(0);
    expect(Number.isFinite(w.units[0].cooldownReady.Q)).toBe(true);
  });
  it("extends through an actual summon and applies sourced non-champion damage on each pass", () => {
    const w = arena(1100); rootEnemy(w); const target = pet(w, 800); cast(w, "Q"); advance(w, 75);
    expect(target.hp).toBeCloseTo(10000 - 2 * 165 * .8, 10);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(330, 10);
  });
  it("extends through a spell-shielded outbound contact while the return can still hit", () => {
    const w = arena(800); rootEnemy(w); w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })); cast(w, "Q"); advance(w, 70);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(165, 10); expect(markCount(w)).toBe(1);
    expect(w.log.filter((e) => e.text.includes("spell shield blocks Avengerang"))).toHaveLength(1);
  });
  it("reveals a hit target for one second and scales the decaying champion-hit movement buff with AP", () => {
    const w = arena(200, { ap: 100 }); rootEnemy(w); cast(w, "Q"); advance(w, 11);
    expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(true);
    expect(w.units[0].memory["akshan:q:ms"]).toBeCloseTo(.25, 10);
  });
  it("projectile interception destroys the outbound flight and prevents its return", () => {
    const w = arena(); w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 100 });
    cast(w, "Q"); advance(w, 45); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.missiles).toHaveLength(0); expect(Number.isFinite(w.units[0].cooldownReady.Q)).toBe(true);
  });
});

describe("Akshan Going Rogue solo restrictions", () => {
  it("prepares W during an ordinary brush retreat, walks during its cast, then hides beyond detection without repeated casts", () => {
    const w = arena(300), [self, enemy] = w.units; w.settings.environment.brush = true; w.modes = ["flee", "idle"];
    const retreat = () => step(w, [self.spec.behavior!, idle]);
    retreat(); expect(self.action?.kind).toBe("cast");
    retreat(); expect(self.x).toBeLessThan(0); expect(self.action?.kind).toBe("cast");
    while (w.tick < 20 && !w.result) retreat();
    expect(self.memory["akshan:rogue"]).toBe(true); expect(canTarget(self, enemy)).toBe(true);
    while (w.tick < 300 && !w.result) retreat();
    expect(w.result?.reason).toBe("escaped"); expect(canTarget(self, enemy)).toBe(false);
    expect(w.log.filter((entry) => entry.side === 0 && entry.text.startsWith("casts ")).map((entry) => entry.text)).toEqual(["casts Going Rogue"]);
    expect(w.terrain).toHaveLength(0); expect(w.missiles).toHaveLength(0);
    expect([self.x, self.hp, self.resource, w.tick].every(Number.isFinite)).toBe(true);
  });
  it("does not spend W on a detected open-ground retreat without sustaining terrain or brush", () => {
    const w = arena(300), [self] = w.units; w.modes = ["flee", "idle"];
    for (let i = 0; i < 20; i++) step(w, [self.spec.behavior!, idle]);
    expect(self.x).toBeLessThan(0); expect(self.memory["akshan:rogue"]).not.toBe(true);
    expect(w.log.some((entry) => entry.text === "casts Going Rogue")).toBe(false);
  });
  it("camouflages outside detection, reveals within 800, and ends immediately when attacking", () => {
    const w = arena(1000); cast(w, "W"); advance(w, 16); expect(canTarget(w.units[0], w.units[1])).toBe(false);
    w.units[1].x = 700; step(w, [idle, idle]); expect(canTarget(w.units[0], w.units[1])).toBe(true);
    w.units[1].x = 1000; step(w, [idle, idle]); expect(canTarget(w.units[0], w.units[1])).toBe(false);
    startAttack(w, w.units[0]); expect(canTarget(w.units[0], w.units[1])).toBe(true); expect(w.units[0].memory["akshan:rogue"]).toBe(false);
  });
  it("refreshes near real terrain and expires two seconds after leaving it", () => {
    const w = arena(1500); wall(w, -150, -100); cast(w, "W"); advance(w, 100); expect(w.units[0].memory["akshan:rogue"]).toBe(true);
    w.units[0].x = 500; advance(w, 162); expect(w.units[0].memory["akshan:rogue"]).toBe(false);
  });
  it("does not grant Scoundrel chase mana, movement, gold, or resurrection in a solo duel", () => {
    const w = arena(1000), [self] = w.units; self.resource = 0; self.spec.base.resourceRegen = 0;
    cast(w, "W"); advance(w, 30); expect(self.resource).toBe(0); expect(derive(self).moveSpeed).toBe(self.spec.base.moveSpeed);
    expect(compiled().assumptions.some((s) => s.includes("solo duel has no allied champion deaths"))).toBe(true);
  });
});

describe("Akshan Heroic Swing real anchors, contacts, and counterplay", () => {
  it("never invents an E anchor from the scenario walls flag", () => {
    const w = arena(); w.settings.environment.walls = true;
    expect(canCast(w, w.units[0], ability(w.units[0].spec, "E"))).toBe(false);
  });
  it("waits for the actual hook flight then swings on a clipped sourced-speed circular projection", () => {
    const w = arena(200); wall(w); cast(w, "E"); advance(w, 4); expect(w.units[0].memory["akshan:swing:phase"]).toBe("hook");
    advance(w, 8); cast(w, "E2"); advance(w, 10);
    const elapsed = (w.tick - 1 - 9) / 30;
    expect(w.units[0].x).toBeCloseTo(500 - 500 * Math.cos(1200 * elapsed / 500), 10);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);
    advance(w, 30); expect(w.units[0].x).toBeLessThanOrEqual(200 - 65 - 50 + 1e-10); expect(w.units[0].memory["akshan:swing:phase"]).toBe("");
  });
  it("cancels a hook when its real terrain disappears", () => {
    const w = arena(); wall(w, 500, 550, 5); cast(w, "E"); advance(w, 8); expect(w.units[0].memory["akshan:swing:phase"]).toBe("");
  });
  it("enforces the half-second third-cast delay and clips dismount to real terrain", () => {
    const w = arena(-300); wall(w); attach(w); cast(w, "E2");
    expect(canCast(w, w.units[0], ability(w.units[0].spec, "E3"))).toBe(false); advance(w, 23);
    expect(canCast(w, w.units[0], ability(w.units[0].spec, "E3"))).toBe(true);
    cast(w, "E3", { direction: -1, distance: 350 }); expect(w.units[0].x).toBeLessThanOrEqual(465); expect(w.units[0].memory["akshan:swing:phase"]).toBe("");
  });
  it.each(["root", "ground", "polymorph"])("cancels hook preparation on %s", (cc) => {
    const w = arena(); wall(w); cast(w, "E"); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: cc as "root", duration: 1 }, { scale: 1 });
    expect(w.units[0].memory["akshan:swing:phase"]).toBe("");
  });
  it.each(["blind", "dodgeAttacks", "blockAttacks", "spellShield", "parry"])("a real E projectile respects %s", (guard) => {
    const w = arena(300); if (guard === "blind") w.units[0].statuses.push(lasting("cc", guard)); else w.units[1].statuses.push(lasting("state", guard, 0, { charges: 1 }));
    wall(w); attach(w); cast(w, "E2"); advance(w, 11); expect(w.units[1].totals.damageTaken).toBe(0); expect(markCount(w)).toBe(0);
  });
  it("overlays R on the real swing without losing its channel and suppresses new E shots", () => {
    const w = arena(-300); wall(w); attach(w); cast(w, "E2"); cast(w, "R"); advance(w, 25);
    expect(w.units[0].memory["akshan:r:phase"]).toBe("charge");
    expect(w.units[0].memory["akshan:swing:shots"]).toBeGreaterThanOrEqual(1);
    const dash = w.units[0].action; expect(dash?.kind).toBe("dash");
    if (dash?.kind === "dash") expect(dash.resume?.kind).toBe("channel");
    expect(w.log.filter((e) => e.text.startsWith("Heroic Swing (shot) deals"))).toHaveLength(1);
  });
  it("resets E only on an actual champion takedown", () => {
    const w = arena(), [self, enemy] = w.units, target = pet(w, 100, { hp: 1, targetClass: "champion" }); self.cooldownReady.E = 1000;
    launchBonusAttack(w, self, target); drain(w); expect(self.cooldownReady.E).toBe(1000);
    applyEffect(w, self, enemy, { type: "damage", damageType: "true", amount: { base: 100000 } }, { scale: 1 }); expect(self.cooldownReady.E).toBe(w.tick + 15);
  });
  it("an E shot launched while blind still misses after blind is removed before impact", () => {
    const w = arena(300); wall(w); attach(w); w.units[0].statuses.push(lasting("cc", "blind")); cast(w, "E2");
    expect(w.missiles.find((m) => m.source === "Eshot")?.connects).toBe(false);
    w.units[0].statuses = w.units[0].statuses.filter((s) => s.key !== "blind"); advance(w, 11);
    expect(w.units[1].totals.damageTaken).toBe(0); expect(markCount(w)).toBe(0);
  });
  it("an E shot launched before blind still connects after blind is added before impact", () => {
    const w = arena(300); wall(w); attach(w); cast(w, "E2");
    expect(w.missiles.find((m) => m.source === "Eshot")?.connects).toBe(true);
    w.units[0].statuses.push(lasting("cc", "blind")); advance(w, 11);
    const d = derive(w.units[0]); expect(w.units[1].totals.damageTaken).toBeCloseTo((40 + .25 * d.ad) * (1 + .3 * d.bonusAttackSpeed), 10); expect(markCount(w)).toBe(1);
  });
  it("an E shot resolves one actual basic hit against a hit-count prop without inventing a health packet or mark", () => {
    const w = arena(1000, { critChance: 1, ap: 1000 }), target = pet(w, 100, { hp: 3, hitPoints: true, targetClass: "minion" }); wall(w); attach(w); cast(w, "E2"); advance(w, 11);
    expect(target.hp).toBe(2); expect(target.statuses?.some((s) => s.key === "akshan:dirty")).toBe(false); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["blind", "dodgeAttacks", "blockAttacks", "parry", "spellShield"])("actual-prop E shots retain %s defenses", (guard) => {
    const w = arena(1000), target = pet(w, 100, { hp: 3, hitPoints: true, targetClass: "minion" });
    if (guard === "blind") w.units[0].statuses.push(lasting("cc", "blind")); else target.statuses!.push(lasting("state", guard, 0, { charges: 1 }));
    wall(w); attach(w); cast(w, "E2"); advance(w, 11); expect(target.hp).toBe(3); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("scales each E shot by bonus AS, uses its critical modifier, and can hit an actual pet", () => {
    const w = arena(1000, { attackSpeed: 1, critChance: 1 }), target = pet(w, 100); wall(w); attach(w); cast(w, "E2"); advance(w, 11);
    const self = w.units[0], d = derive(self); expect(10000 - target.hp).toBeCloseTo((40 + .25 * d.ad) * (1 + .3 * d.bonusAttackSpeed) * 1.5, 10);
  });
});

describe("Akshan Comeuppance storage, cancellation, bodies and defenses", () => {
  it("stores seven bullets, fires on the sourced 0.15-second clock, and keeps cooldown held through firing", () => {
    const w = arena(1000); cast(w, "R"); advance(w, 74); expect(w.missiles).toHaveLength(0); expect(w.units[0].cooldownReady.R).toBe(Infinity);
    advance(w, 79); expect(w.units[0].memory["akshan:r:fired"]).toBe(0);
    advance(w, 80); expect(w.units[0].memory["akshan:r:fired"]).toBe(1);
    advance(w, 107); expect(w.units[0].memory["akshan:r:fired"]).toBe(7); expect(Number.isFinite(w.units[0].cooldownReady.R)).toBe(true);
  });
  it("allows early release after half a second with two stored bullets", () => {
    const w = arena(); cast(w, "R"); expect(canCast(w, w.units[0], ability(w.units[0].spec, "Rrelease"))).toBe(false);
    advance(w, 14); expect(canCast(w, w.units[0], ability(w.units[0].spec, "Rrelease"))).toBe(true); cast(w, "Rrelease");
    expect(w.units[0].memory["akshan:r:count"]).toBe(2);
  });
  it("calculates each impact from the actual victim's current missing health and critical stats", () => {
    const w = arena(300, { critChance: .5 }), [self, enemy] = w.units; enemy.hp = 50000;
    const bullet = ability(self.spec, "Rbullet"), base = 45 + .15 * derive(self).ad;
    abilityHit(w, self, enemy, bullet, bullet.onHit!); expect(enemy.totals.damageTaken).toBeCloseTo(base * 2 * 1.15, 10);
    const expected = base * (1 + 2 * (1 - enemy.hp / 100000)) * 1.15;
    const prior = enemy.totals.damageTaken; abilityHit(w, self, enemy, bullet, bullet.onHit!); expect(enemy.totals.damageTaken - prior).toBeCloseTo(expected, 10);
  });
  it.each(["untargetable", "silence"])("cancels charging for the five-second cooldown on %s", (guard) => {
    const w = arena(); cast(w, "R"); advance(w, 10);
    if (guard === "silence") applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "silence", duration: 1 }, { scale: 1 });
    else { applyEffect(w, w.units[1], w.units[1], { type: "state", state: "untargetable", duration: 1 }, { scale: 1 }); step(w, [idle, idle]); }
    expect(w.units[0].memory["akshan:r:phase"]).toBe(""); expect(w.units[0].cooldownReady.R).toBeLessThanOrEqual(w.tick + 150); expect(w.missiles).toHaveLength(0);
  });
  it("keeps the normal ultimate cooldown when Akshan dies during charge", () => {
    const w = arena(), [self, enemy] = w.units; cast(w, "R"); advance(w, 10);
    applyEffect(w, enemy, self, { type: "damage", damageType: "true", amount: { base: 100000 } }, { scale: 1 }); step(w, [idle, idle]);
    expect(self.cooldownReady.R).toBeGreaterThanOrEqual(2100);
  });
  it("refreshes target marks during charging and applies life steal from a connected bullet", () => {
    const w = arena(), [self, enemy] = w.units; attackHit(w, self, enemy, false, []); cast(w, "R"); advance(w, 32);
    expect(enemy.statuses.find((s) => s.key === "akshan:dirty")!.endTick).toBeGreaterThan(150);
    self.hp -= 500; self.statuses.push(lasting("stat", "lifeSteal", .2)); const before = self.hp, bullet = ability(self.spec, "Rbullet");
    const raw = (45 + .15 * derive(self).ad) * (1 + 2 * (1 - enemy.hp / 100000));
    abilityHit(w, self, enemy, bullet, bullet.onHit!); expect(self.hp - before).toBeCloseTo(raw * .2, 10);
  });
  it("true-sight reveal preserves lock through invisibility and root does not cancel the mobile channel", () => {
    const w = arena(); cast(w, "R"); applyEffect(w, w.units[1], w.units[1], { type: "state", state: "invisible", duration: 10 }, { scale: 1 });
    applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); advance(w, 25);
    expect(w.units[0].memory["akshan:r:phase"]).toBe("charge"); expect(canTarget(w.units[1], w.units[0])).toBe(true);
  });
  it.each(["minion", "champion", "other"] as const)("uses actual %s bodies and executes only sourced minions", (targetClass) => {
    const w = arena(1000), target = pet(w, 300, { targetClass }); cast(w, "R"); advance(w, 90);
    if (targetClass === "minion") expect(w.pets.some((p) => p.id === target.id)).toBe(false);
    else { expect(target.hp).toBeLessThan(10000); expect(target.hp).toBeGreaterThan(9000); }
  });
  it("spell shield blocks one bullet, while a projectile wall prevents all intercepted bullets", () => {
    const w = arena(300), [self, enemy] = w.units, bullet = ability(self.spec, "Rbullet"); enemy.statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    abilityHit(w, self, enemy, bullet, bullet.onHit!); expect(enemy.totals.damageTaken).toBe(0); abilityHit(w, self, enemy, bullet, bullet.onHit!); expect(enemy.totals.damageTaken).toBeGreaterThan(0);
    const blocked = arena(1000); blocked.zones.push({ id: blocked.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 200 }); cast(blocked, "R"); advance(blocked, 120); expect(blocked.units[1].totals.damageTaken).toBe(0);
  });
});

describe("Akshan isolation, reflection, ordinary policy and finite budgets", () => {
  it("preserves branch isolation of marks and a returning projectile", () => {
    const w = arena(); rootEnemy(w); cast(w, "Q"); advance(w, 15); const copy = cloneWorld(w);
    copy.units[1].statuses.find((s) => s.key === "akshan:dirty")!.value = 2; copy.missiles[0]!.travelLeft = 0;
    expect(markCount(w)).toBe(1); expect(w.missiles[0]!.travelLeft).toBeGreaterThan(0);
  });
  it("reflects exact projectile and terrain trajectories to 1e-10", () => {
    const left = arena(300), right = arena(-300); wall(left); wall(right, -550, -500); rootEnemy(left); rootEnemy(right);
    cast(left, "Q"); cast(right, "Q"); advance(left, 50); advance(right, 50);
    expect(Math.abs(left.units[1].totals.damageTaken - right.units[1].totals.damageTaken)).toBeLessThan(1e-10);
    const a = arena(-300), b = arena(300); wall(a); wall(b, -550, -500); attach(a); attach(b); cast(a, "E2"); cast(b, "E2"); advance(a, 18); advance(b, 18);
    expect(Math.abs(a.units[0].x + b.units[0].x)).toBeLessThan(1e-10);
  });
  it("runs the ordinary fight policy without inventing terrain or invoking unavailable Scoundrel effects", () => {
    const w = arena(600); w.modes = ["fight", "fight"];
    for (let i = 0; i < 250 && !w.result; i++) step(w, [w.units[0].spec.behavior!, idle]);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(0); expect(w.log.some((e) => e.text === "casts Heroic Swing")).toBe(false);
    expect(Number.isFinite(w.units[0].x)).toBe(true);
  });
  it.each([{ critChance: 1 }, { attackSpeed: 3, abilityHaste: 200 }, { ap: 1000, ad: 300 }])("has finite source-derived damage and sustain at %j", (bonus) => {
    const w = arena(300, bonus), [self, enemy] = w.units;
    const budget = damagePerSecond(self.spec, enemy.spec); expect(Object.values(budget).every(Number.isFinite)).toBe(true);
    expect(Number.isFinite(self.spec.budget!.healing!(self, enemy))).toBe(true);
  });
});
