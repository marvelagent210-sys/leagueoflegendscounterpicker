import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import { simulateMatchup } from "../../engine/sim/matchup";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import Ahri from "../../kits/champions/Ahri";
import Lissandra from "../../kits/champions/Lissandra";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, pets, records, runes, kit } from "./helpers";

const compile = (id: string, module: typeof Ahri) => compileKit(championData(id), records(id), module, {}, pets(id), runes());
const ahri = compile("Ahri", Ahri), lissandra = compile("Lissandra", Lissandra);
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
const dummy = () => fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } });
function worldFor(spec: FighterSpec, x = 300, ap = 100): World {
  const world = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0 }, bonus: { ap } }, dummy()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = x;
  return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function cast(world: World, key: string): void { startCast(world, world.units[0], ability(world.units[0].spec, key)); }
function shield(world: World): void { applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 5 }, { scale: 1 }); }
function againstSion(spec: FighterSpec): World {
  const world = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0 }, bonus: { ap: 100 } }, kit("Sion").spec], distance: 1000, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].hp -= 500;
  return world;
}

describe("Ahri source-backed kit", () => {
  it("audits all pinned slots and level-20 passive extensions without pre-fight farm healing", () => {
    expect(ahri.evidence.map((row) => row.revid)).toEqual(expect.arrayContaining([4038191, 4074380, 4074423, 4074445, 4074438]));
    expect(ahri.assumptions.join(" ")).toContain("102.058823529412");
    expect(ahri.assumptions.join(" ")).toContain("175.588235294118");
    const world = worldFor(ahri.spec);
    world.units[0].hp -= 500; through(world, 90);
    expect(world.units[0].totals.healing).toBe(0);
  });
  it("Sion's first champion death grants Essence Theft while his zombie continuation keeps the duel alive", () => {
    const world = againstSion(ahri.spec), [self, enemy] = world.units;
    cast(world, "R"); world.tick = 30; self.action = undefined;
    dealDamage(world, self, enemy, 100000, "true");
    expect(enemy.fallen).toBe(true); expect(enemy.hp).toBe(1);
    expect(self.totals.healing).toBeCloseTo(205.588235294118);
    expect(self.memory.rushStock).toBe(3);
    expect(self.memory.rushUntil).toBe(450);
    expect(self.cooldownReady.R).toBe(3030);
    expect(world.result).toBeUndefined();
  });
  it("a late Spirit Rush takedown grants one stock and extends only to ten seconds from the grant", () => {
    const world = againstSion(ahri.spec), [self, enemy] = world.units;
    self.spec = { ...self.spec, bonus: { ap: 100, abilityHaste: 100 } };
    cast(world, "R"); self.action = undefined; self.memory.rushStock = 0; world.tick = 420;
    dealDamage(world, self, enemy, 100000, "true");
    expect(self.memory.rushStock).toBe(1);
    expect(self.memory.rushUntil).toBe(720);
    expect(self.cooldownReady.R).toBe(1920);
  });
  it("Essence Theft does not exceed three stocks or grant a second essence from Sion's final zombie death", () => {
    const world = againstSion(ahri.spec), [self, enemy] = world.units;
    cast(world, "R"); self.action = undefined; self.memory.rushStock = 3;
    dealDamage(world, self, enemy, 100000, "true");
    const healing = self.totals.healing;
    expect(self.memory.rushStock).toBe(3);
    through(world, 45);
    expect(enemy.spec.form).toBe("Glory in Death");
    dealDamage(world, self, enemy, 100000, "true");
    expect(self.totals.healing).toBe(healing);
    expect(self.memory.rushStock).toBe(3);
  });
  it.each([[90, true], [91, false]] as const)("Essence Theft's three-second damage eligibility at tick %i is %s", (deathTick, eligible) => {
    const world = againstSion(ahri.spec), [self, enemy] = world.units;
    dealDamage(world, self, enemy, 1, "true");
    world.tick = deathTick;
    // An actual first death that Ahri assisted: the canonical fallen flag is observed
    // during upkeep even though this lethal packet does not come from Ahri herself.
    dealDamage(world, enemy, enemy, 100000, "true");
    through(world, deathTick);
    expect(self.totals.healing).toBeCloseTo(eligible ? 205.588235294118 : 0);
    through(world, deathTick + 45);
    dealDamage(world, self, enemy, 1, "true");
    expect(self.totals.healing).toBeCloseTo(eligible ? 205.588235294118 : 0);
  });
  it("destroying a champion-owned pet is not a champion takedown or a minion-fragment shortcut", () => {
    const world = worldFor(ahri.spec), self = world.units[0]; self.hp -= 500;
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 100, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 150);
    damagePet(world, self, pet, 1000, "true", false, "Q");
    expect(self.totals.healing).toBe(0);
    expect(self.memory.essenceDeathSeen).toBeUndefined();
    expect(self.memory.lastChampionDamage).toBeUndefined();
  });
  it("Fox-Fire launches three independent 160/64/64 magic hits after the champion-priority delay", () => {
    const world = worldFor(ahri.spec);
    cast(world, "W"); through(world, 7);
    expect(world.missiles.filter((m) => m.source === "W")).toHaveLength(0);
    through(world, 8);
    expect(world.missiles.filter((m) => m.source === "W")).toHaveLength(3);
    through(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(288);
    expect(world.log.filter((row) => row.text.includes("foxFire deals")).map((row) => row.text)).toEqual(["foxFire deals 160 magic damage", "foxFire deals 64 magic damage", "foxFire deals 64 magic damage"]);
  });
  it("counts a shielded first flame contact for subsequent reductions", () => {
    const world = worldFor(ahri.spec); shield(world); cast(world, "W"); through(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(128);
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false);
  });
  it("Fox-Fire waits for a visible champion and can acquire one after activation", () => {
    const world = worldFor(ahri.spec);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 1 }, { scale: 1 });
    cast(world, "W"); through(world, 29);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].memory.flamesLeft).toBe(3);
    through(world, 45);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(288);
  });
  it("unused flames expire and start their post-effect cooldown once", () => {
    const world = worldFor(ahri.spec, 1000); cast(world, "W");
    expect(world.units[0].cooldownHeld.W).toBe("W");
    through(world, 75);
    expect(world.units[0].memory.flamesLeft).toBe(0);
    expect(world.units[0].cooldownHeld.W).toBeUndefined();
    expect(world.units[0].cooldownReady.W).toBe(225);
    through(world, 85);
    expect(world.units[0].cooldownReady.W).toBe(225);
  });
  it("Fox-Fire's movement speed decays without stale derived-stat cache", () => {
    const world = worldFor(ahri.spec); cast(world, "W");
    const initial = derive(world.units[0]).moveSpeed;
    through(world, 30);
    const middle = derive(world.units[0]).moveSpeed;
    through(world, 60);
    expect(initial).toBeGreaterThan(middle);
    expect(middle).toBeGreaterThan(330);
    expect(derive(world.units[0]).moveSpeed).toBe(330);
  });
  it("Fox-Fire can overlay Spirit Rush without replacing its dash clock", () => {
    const world = worldFor(ahri.spec, 600); cast(world, "R");
    const action = world.units[0].action;
    cast(world, "W");
    expect(world.units[0].action).toBe(action);
    expect(world.units[0].action?.kind).toBe("dash");
    expect(world.units[0].memory.flamesLeft).toBe(3);
  });
  it("instant Fox-Fire preserves an already-declared attack's launch time", () => {
    const world = worldFor(ahri.spec, 300), self = world.units[0];
    startAttack(world, self); const windup = self.action; cast(world, "W");
    expect(windup?.kind).toBe("windup"); expect(self.action).toBe(windup);
  });
  it("Spirit Rush pays only its first cost, enforces static spacing, and retains fixed expiry", () => {
    const world = worldFor(ahri.spec, 600), self = world.units[0];
    self.spec = { ...self.spec, bonus: { ap: 100, abilityHaste: 100 } };
    const initialResource = self.resource;
    cast(world, "R");
    expect(self.resource).toBeCloseTo(initialResource - 100);
    expect(self.memory.rushUntil).toBe(450);
    expect(canCast(world, self, ability(self.spec, "R2"))).toBe(false);
    through(world, 30);
    const before = self.resource; cast(world, "R2");
    expect(self.resource).toBe(before);
    expect(self.memory.rushStock).toBe(1);
    expect(self.memory.rushUntil).toBe(450);
    through(world, 60); cast(world, "R2");
    expect(self.memory.rushStock).toBe(0);
    expect(self.memory.rushUntil).toBe(450);
    expect(self.cooldownReady.R).toBe(1500);
  });
  it("a sole visible target receives one Spirit Rush bolt per dash, not three", () => {
    const world = worldFor(ahri.spec, 600); cast(world, "R"); through(world, 25);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(210);
    expect(world.log.filter((row) => row.text.includes("Spirit Rush bolt deals"))).toHaveLength(1);
  });
  it("Spirit Rush checks visibility at actual dash end", () => {
    const world = worldFor(ahri.spec, 600); cast(world, "R");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 2 }, { scale: 1 });
    through(world, 25); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("projectile walls stop Fox-Fire independently of its speed buff", () => {
    const world = worldFor(ahri.spec);
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 90 });
    cast(world, "W"); through(world, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(derive(world.units[0]).moveSpeed).toBeGreaterThan(330);
  });
  it("Orb of Deception continues after contact and damages exactly once on each differently mitigated pass", () => {
    const world = worldFor(ahri.spec);
    applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "root", duration: 5 }, { scale: 1 });
    world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, mr: 100 } };
    cast(world, "Q"); through(world, 20);
    expect(world.missiles.some((m) => m.source === "Q" && m.x > 300)).toBe(true);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(92.5);
    through(world, 75);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(92.5 + 185);
    expect(world.log.filter((row) => row.text.includes("Orb of Deception deals"))).toHaveLength(1);
    expect(world.log.filter((row) => row.text.includes("Orb of Deception (return) deals"))).toHaveLength(1);
  });
  it("a shielded outbound pass does not silently erase the separate true return", () => {
    const world = worldFor(ahri.spec);
    applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "root", duration: 5 }, { scale: 1 });
    shield(world); cast(world, "Q"); through(world, 75);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(185);
  });
  it("the deduplicated turn circle can hit on both passes outside the line's actual endpoint", () => {
    const world = worldFor(ahri.spec, 1000); cast(world, "Q"); through(world, 26);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(370);
    through(world, 75); expect(world.units[1].totals.damageTaken).toBeCloseTo(370);
  });
  it("the returning orb starts slow, accelerates, and follows Ahri rather than the enemy", () => {
    const world = worldFor(ahri.spec); cast(world, "Q"); through(world, 26);
    const returning = world.missiles.find((m) => m.source === "Qreturn")!;
    expect(returning.x).toBeCloseTo(900); expect(returning.perTick).toBe(2);
    world.units[0].x = 500; through(world, 27);
    expect(returning.x).toBeCloseTo(898);
    expect(returning.perTick).toBeCloseTo(2 + 1900 / 900);
    through(world, 75);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(185);
    expect(world.missiles.some((m) => m.source === "Qreturn")).toBe(false);
  });
  it("return sidesteps are recomputed independently after a blocked outbound pass", () => {
    const world = worldFor(ahri.spec); shield(world); cast(world, "Q"); through(world, 75);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(world.units[1].totals.damageTaken).toBeLessThan(185);
    expect(world.log.some((row) => row.text.includes("spell shield blocks Orb of Deception"))).toBe(true);
  });
  it.each(["outbound", "return"])("a pending %s orb can kill after Ahri dies and produce a draw", (leg) => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    applyEffect(world, self, enemy, { type: "cc", cc: "root", duration: 5 }, { scale: 1 });
    enemy.hp = leg === "outbound" ? 100 : 300;
    cast(world, "Q"); through(world, leg === "outbound" ? 8 : 26);
    expect(world.missiles.some((m) => m.source === (leg === "outbound" ? "Q" : "Qreturn"))).toBe(true);
    dealDamage(world, enemy, self, 100000, "true"); through(world, 75);
    expect(world.result?.winner).toBe("draw"); expect(world.result?.reason).toBe("death");
    expect(self.hp).toBeLessThanOrEqual(0); expect(enemy.hp).toBeLessThanOrEqual(0);
    expect(self.totals.healing).toBe(0);
  });
  it.each(["outbound", "return"])("a projectile wall on the %s leg destroys the orb without a later phantom hit", (leg) => {
    const world = worldFor(ahri.spec); cast(world, "Q");
    if (leg === "return") through(world, 26);
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: world.tick, x: leg === "outbound" ? 150 : 500, radius: 0, startTick: world.tick, endTick: 100 });
    through(world, 90);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(leg === "outbound" ? 0 : 185);
    expect(world.missiles.filter((m) => m.source === "Q" || m.source === "Qreturn")).toHaveLength(0);
  });
  it("Charm slows a slow-immune target only after its charm succeeds, without stripping immunity to other slows", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    enemy.spec = { ...enemy.spec, base: { ...enemy.spec.base, moveSpeed: 350 } };
    applyEffect(world, enemy, enemy, { type: "state", state: "slowImmune", duration: 10 }, { scale: 1 });
    applyEffect(world, self, enemy, { type: "cc", cc: "slow", strength: .9, duration: 3 }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(350);
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.statuses.find((s) => s.key === "slow")?.value).toBe(.65);
    expect(derive(enemy).moveSpeed).toBeLessThan(350);
    expect(enemy.statuses.some((s) => s.key === "slowImmune")).toBe(true);
    through(world, 54); expect(derive(enemy).moveSpeed).toBe(350);
    applyEffect(world, self, enemy, { type: "cc", cc: "slow", strength: .9, duration: 3 }, { scale: 1 });
    expect(derive(enemy).moveSpeed).toBe(350);
  });
  it("Charm and its exceptional slow have matching tenacity-shortened durations", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "state", state: "tenacity", value: .3, duration: 5 }, { scale: 1 });
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.statuses.find((s) => s.key === "charm")?.endTick).toBe(38);
    expect(enemy.statuses.find((s) => s.key === "slow")?.endTick).toBe(38);
  });
  it.each(["ccImmune", "spellShield"] as const)("a %s target does not receive Charm's exceptional slow", (state) => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "state", state: "slowImmune", duration: 5 }, { scale: 1 });
    applyEffect(world, enemy, enemy, { type: "state", state, duration: 5 }, { scale: 1 });
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.statuses.some((s) => s.key === "charm" || s.key === "slow")).toBe(false);
  });
  it("a magic shield broken by Charm protects against the whole same-packet charm and slow", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    applyEffect(world, enemy, enemy, { type: "shield", shieldType: "magic", blackShield: true, amount: { base: 100 }, duration: 5 }, { scale: 1 });
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.totals.damageTaken).toBeCloseTo(225);
    expect(enemy.statuses.some((s) => s.key === "charm" || s.key === "slow")).toBe(false);
  });
  it("Charm knocks down an eligible dash exactly once, with no invented airborne duration", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    enemy.spec = { ...enemy.spec, abilities: [{ key: "dash", name: "Dash", slot: "E", cooldown: 1, castTime: 0, delivery: { kind: "dash", direction: "toward", distance: 500, speed: 1000 } }], hooks: { onDashEnd: (ctx) => { ctx.memory.ends = Number(ctx.memory.ends ?? 0) + 1; } } };
    enemy.action = { kind: "dash", ability: "dash", startTick: -1, endTick: 20, perTick: -30, stopAtContact: true, unstoppable: false };
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.action).toBeUndefined(); expect(enemy.memory.ends).toBe(1);
    expect(enemy.statuses.some((s) => s.key === "airborne")).toBe(false);
    expect(enemy.statuses.some((s) => s.key === "charm")).toBe(true);
  });
  it("a charmed target walks toward Ahri despite its idle voluntary command", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    enemy.spec = { ...enemy.spec, base: { ...enemy.spec.base, moveSpeed: 350 } };
    const charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    step(world, [standStill, standStill]); expect(enemy.x).toBeLessThan(300);
  });
  it("Charm does not interrupt an unstoppable dash or fabricate airborne control", () => {
    const world = worldFor(ahri.spec), [self, enemy] = world.units;
    enemy.spec = { ...enemy.spec, abilities: [{ key: "dash", name: "Dash", slot: "E", cooldown: 1, castTime: 0, delivery: { kind: "dash", direction: "toward", distance: 500, speed: 1000 }, flags: { knockdown: false } }] };
    enemy.action = { kind: "dash", ability: "dash", startTick: -1, endTick: 20, perTick: -30, stopAtContact: true, unstoppable: true };
    const action = enemy.action, charm = ability(ahri.spec, "E"); abilityHit(world, self, enemy, charm, charm.onHit!);
    expect(enemy.action).toBe(action);
    expect(enemy.statuses.some((s) => s.key === "airborne")).toBe(false);
  });
  it("a damageable enemy pet intercepts Charm before the opposing champion", () => {
    const world = worldFor(ahri.spec);
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 150);
    cast(world, "E"); through(world, 30);
    expect(pet.hp).toBeCloseTo(675); expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[1].statuses.some((s) => s.key === "charm")).toBe(false);
  });
});

describe("Lissandra source-backed kit", () => {
  it("audits every slot including terminal Thrall values without granting default pets", () => {
    expect(lissandra.evidence.map((row) => row.revid)).toEqual(expect.arrayContaining([4038403, 4007664, 3936419, 4050877, 4017996]));
    expect(lissandra.assumptions.join(" ")).toContain("580");
    expect(worldFor(lissandra.spec).pets).toHaveLength(0);
  });
  it("Sion entering a zombie state does not grant an early Frozen Thrall", () => {
    const world = againstSion(lissandra.spec), [self, enemy] = world.units;
    dealDamage(world, self, enemy, 100000, "true");
    expect(enemy.fallen).toBe(true); through(world, 45);
    expect(enemy.spec.form).toBe("Glory in Death"); expect(world.pets).toHaveLength(0);
  });
  it("Ring of Frost uses its center boundary, correct damage, and tenacity-scaled root", () => {
    const world = worldFor(lissandra.spec, 275);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "tenacity", value: .3, duration: 5 }, { scale: 1 });
    cast(world, "W");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(280);
    expect(world.units[1].statuses.find((s) => s.key === "root")?.endTick).toBe(35);
    const outside = worldFor(lissandra.spec, 275.001); cast(outside, "W");
    expect(outside.units[1].totals.damageTaken).toBe(0);
  });
  it("spell shields negate the whole Ring of Frost damage/root packet", () => {
    const world = worldFor(lissandra.spec, 250); shield(world); cast(world, "W");
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[1].statuses.some((s) => s.key === "root")).toBe(false);
  });
  it("enemy Frozen Tomb creates one field hit and persistent slow while sharing cooldown with self cast", () => {
    const world = worldFor(lissandra.spec); cast(world, "R"); through(world, 90);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
    expect(world.log.filter((row) => row.text.includes("Frozen Tomb deals"))).toHaveLength(1);
    expect(world.log.find((row) => row.text.includes("Frozen Tomb deals"))?.tick).toBe(12);
    expect(canCast(world, world.units[0], ability(world.units[0].spec, "Rself"))).toBe(false);
    expect(world.units[0].cooldownReady.R).toBe(2412);
  });
  it("the direct spell shield also protects this cast's ice damage while the field spreads", () => {
    const world = worldFor(lissandra.spec); shield(world); cast(world, "R"); through(world, 90);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].memory.iceBlocked).toBe(true);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
  });
  it("self Frozen Tomb freezes missing-health scaling and emits exactly ten healing pulses", () => {
    const world = worldFor(lissandra.spec, 1000), self = world.units[0];
    self.hp = derive(self).maxHp / 2;
    cast(world, "Rself");
    expect(self.statuses.some((s) => s.key === "stasis")).toBe(true);
    expect(self.memory.healAmount).toBeCloseTo(38.25);
    through(world, 75);
    expect(self.totals.healing).toBeCloseTo(382.5);
    expect(world.log.filter((row) => row.text.startsWith("heals"))).toHaveLength(10);
    through(world, 90); expect(self.totals.healing).toBeCloseTo(382.5);
    expect(canCast(world, self, ability(self.spec, "R"))).toBe(false);
  });
  it("self stasis destroys targeted projectiles and prevents damage, with Grievous Wounds reducing its heals", () => {
    const world = worldFor(lissandra.spec, 1000), self = world.units[0]; self.hp /= 2;
    world.missiles.push({ id: 10, owner: 1, source: "attack", seenTick: 0, x: 800, perTick: 20, homing: true, direction: -1, travelLeft: 1000, projectile: true, connects: true, scale: 1, onHit: [], attack: { blinded: false, bonusOnHit: [] } });
    applyEffect(world, world.units[1], self, { type: "grievousWounds", duration: 5 }, { scale: 1 });
    cast(world, "Rself"); expect(world.missiles).toHaveLength(0);
    dealDamage(world, world.units[1], self, 1000, "true");
    expect(self.totals.damageTaken).toBe(0);
    through(world, 75); expect(self.totals.healing).toBeCloseTo(382.5 * .6);
  });
  it("self field grows before reaching its outer edge instead of dealing repeated pulse damage", () => {
    const world = worldFor(lissandra.spec, 450), self = world.units[0]; self.hp /= 2;
    cast(world, "Rself"); through(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 31); expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 32); expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
    through(world, 50); expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
    through(world, 90); expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
  });
  it("Frozen Tomb's field damages a pet once instead of once per slow pulse", () => {
    const world = worldFor(lissandra.spec), self = world.units[0]; self.hp /= 2;
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 2000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 250);
    cast(world, "Rself"); through(world, 90);
    expect(pet.hp).toBeCloseTo(1575);
  });
  it("a newly gained spell shield at first field entry blocks that cast's field damage", () => {
    const world = worldFor(lissandra.spec, 500), self = world.units[0]; self.hp /= 2;
    cast(world, "Rself"); through(world, 15); shield(world); through(world, 90);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].memory.iceBlocked).toBe(true);
  });
  it.each(["R", "Rself"])("%s does not retry a parried field hit after parry expires", (key) => {
    const world = worldFor(lissandra.spec, key === "R" ? 300 : 450);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "parry", duration: 1.5 }, { scale: 1 });
    cast(world, key); through(world, 90);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[0].memory.iceDamaged).toBe(true);
  });
  it("Frozen Tomb slow refreshes preserve quarter-second phases instead of drifting by eight ticks each time", () => {
    const world = worldFor(lissandra.spec); cast(world, "R"); through(world, 19);
    const slowEnd = () => Math.max(...world.units[1].statuses.filter((s) => s.key === "slow").map((s) => s.endTick));
    expect(slowEnd()).toBe(27);
    through(world, 20); expect(slowEnd()).toBe(35);
    through(world, 26); expect(slowEnd()).toBe(35);
    through(world, 27); expect(slowEnd()).toBe(42);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
  });
  it("enemy cast cancels without payment or cooldown when its target moves out of range", () => {
    const world = worldFor(lissandra.spec), self = world.units[0], initial = self.resource;
    cast(world, "R"); world.units[1].x = 700; through(world, 12);
    expect(self.cooldownReady.R).toBeUndefined();
    expect(self.resource).toBeGreaterThanOrEqual(initial);
    expect(world.zones).toHaveLength(0);
  });
  it("Ice Shard uses a 700-unit flight followed by its 725-center endpoint circle", () => {
    const world = worldFor(lissandra.spec, 800); cast(world, "Q"); through(world, 17);
    expect(world.units[1].totals.damageTaken).toBe(0);
    through(world, 18); expect(world.units[1].totals.damageTaken).toBeCloseTo(295);
    through(world, 35); expect(world.units[1].totals.damageTaken).toBeCloseTo(295);
    const outside = worldFor(lissandra.spec, 890.001); cast(outside, "Q"); through(outside, 35);
    expect(outside.units[1].totals.damageTaken).toBe(0);
  });
  it("a real enemy pet can shatter Ice Shard and extend champion reach to the fixed endpoint", () => {
    const world = worldFor(lissandra.spec, 940);
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 300);
    cast(world, "Q"); through(world, 30);
    expect(pet.hp).toBeCloseTo(705);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(295);
  });
  it("a shielded initial target still shatters Ice Shard without receiving a duplicate second hit", () => {
    const world = worldFor(lissandra.spec, 300); shield(world);
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 600);
    cast(world, "Q"); through(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(pet.hp).toBeCloseTo(705);
  });
  it("a destroyed initial Ice Shard never conjures a shattered projectile", () => {
    const world = worldFor(lissandra.spec, 800);
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 90 });
    cast(world, "Q"); through(world, 35);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.missiles).toHaveLength(0);
  });
  it("Glacial Path's half-second recast teleports to the actual decelerating claw, pays no extra mana, and ends flight", () => {
    const world = worldFor(lissandra.spec, 1000), self = world.units[0]; cast(world, "E"); through(world, 14);
    const claw = world.missiles.find((m) => m.source === "E")!;
    expect(claw.x).toBeCloseTo(232.53333333333333);
    expect(claw.perTick).toBeCloseTo(40 - 6 * (560 / 1.25 / 900));
    expect(canCast(world, self, ability(self.spec, "E2"))).toBe(true);
    const current = claw.x, resource = self.resource; cast(world, "E2");
    expect(self.x).toBe(current); expect(self.resource).toBe(resource);
    expect(self.cooldownReady.E).toBe(360); expect(self.memory.clawX).toBeUndefined();
    expect(world.missiles.some((m) => m.source === "E")).toBe(false);
    through(world, 50); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["root", "ground"] as const)("%s permits first Glacial Path but prevents its blink recast", (cc) => {
    const world = worldFor(lissandra.spec), [self, enemy] = world.units;
    applyEffect(world, enemy, self, { type: "cc", cc, duration: 5 }, { scale: 1 });
    expect(canCast(world, self, ability(self.spec, "E"))).toBe(true);
    cast(world, "E"); through(world, 20);
    expect(canCast(world, self, ability(self.spec, "E2"))).toBe(false);
  });
  it("Glacial Path pierces its initial target and damages that champion only once", () => {
    const world = worldFor(lissandra.spec); cast(world, "E"); through(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(270);
    expect(world.missiles.some((m) => m.source === "E" && m.x > 300)).toBe(true);
    through(world, 60); expect(world.units[1].totals.damageTaken).toBeCloseTo(270);
  });
  it("a projectile wall destroys Glacial Path and invalidates its recast", () => {
    const world = worldFor(lissandra.spec, 1000);
    world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 90 });
    cast(world, "E"); through(world, 25);
    expect(world.units[0].memory.clawX).toBeUndefined();
    expect(canCast(world, world.units[0], ability(lissandra.spec, "E2"))).toBe(false);
  });
  it("the claw's documented sinking grace permits one late endpoint hit and expires", () => {
    const world = worldFor(lissandra.spec, 1100); cast(world, "E");
    while (world.units[0].memory.clawUntil === Infinity || world.units[0].memory.clawUntil === undefined) step(world, [standStill, standStill]);
    expect(world.units[1].totals.damageTaken).toBe(0);
    world.units[1].x = 1040; through(world, world.tick + 2);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(270);
    through(world, 75); expect(world.units[1].totals.damageTaken).toBeCloseTo(270);
    expect(canCast(world, world.units[0], ability(lissandra.spec, "E2"))).toBe(false);
  });
  it("a shielded sinking-claw contact consumes the hit opportunity instead of retrying after shield removal", () => {
    const world = worldFor(lissandra.spec, 1100); cast(world, "E");
    while (world.units[0].memory.clawUntil === Infinity || world.units[0].memory.clawUntil === undefined) step(world, [standStill, standStill]);
    world.units[1].x = 1040; shield(world); through(world, 75);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false);
    expect(world.log.filter((row) => row.text.includes("spell shield blocks Glacial Path"))).toHaveLength(1);
  });
  it("enemy Frozen Tomb retains its cast through loss of sight", () => {
    const world = worldFor(lissandra.spec); cast(world, "R");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 3 }, { scale: 1 });
    expect(world.units[0].action?.kind).toBe("cast");
    through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(425);
    expect(world.units[0].cooldownReady.R).toBe(2412);
  });
  it("enemy Frozen Tomb cancels through untargetability with no mana or cooldown", () => {
    const world = worldFor(lissandra.spec), self = world.units[0], resource = self.resource; cast(world, "R");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "untargetable", duration: 3 }, { scale: 1 });
    through(world, 30); expect(world.units[1].totals.damageTaken).toBe(0);
    expect(self.resource).toBeGreaterThanOrEqual(resource); expect(self.cooldownReady.R).toBeUndefined();
    expect(world.zones).toHaveLength(0);
  });
  it("the ordinary behavior chooses self Frozen Tomb under noticed lethal pressure", () => {
    const world = worldFor(lissandra.spec), [self, enemy] = world.units; self.hp *= .3; world.modes[0] = "fight";
    const threat = { key: "threat", name: "Incoming burst", slot: "Q" as const, cooldown: 1, castTime: 1, delivery: { kind: "target" as const, range: 1000 }, onHit: [{ type: "damage" as const, damageType: "magic" as const, amount: { base: 1000 } }] };
    enemy.spec = { ...enemy.spec, abilities: [threat] }; startCast(world, enemy, threat); world.tick = 10;
    expect(lissandra.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "Rself" });
  });
  it("the fleeing behavior sends Glacial Path away and recasts to its actual retreat position", () => {
    const world = worldFor(lissandra.spec, 1000), self = world.units[0]; world.modes[0] = "flee";
    const initial = lissandra.spec.behavior!(perceive(world, 0));
    expect(initial).toEqual({ kind: "cast", ability: "E", aim: { direction: -1, distance: 1025 } });
    if (initial?.kind !== "cast") throw new Error("No initial escape command");
    startCast(world, self, ability(self.spec, initial.ability), initial.aim); through(world, 20);
    expect(world.missiles.find((m) => m.source === "E")!.x).toBeLessThan(0);
    expect(lissandra.spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "E2" });
    cast(world, "E2"); expect(self.x).toBeLessThan(0);
  });
});

describe("Ahri and Lissandra ordinary budgeted duels", () => {
  const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
  it.each([["Ahri", ahri.spec], ["Lissandra", lissandra.spec]] as const)("%s stops extending a completed short trade", (_name, spec) => {
    const world = worldFor(spec); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it.each([["Ahri", ahri.spec], ["Lissandra", lissandra.spec]] as const)("%s starts the common short-trade clock before a custom opening command", (name, spec) => {
    const world = worldFor(spec); world.modes[0] = "trade";
    const self = world.units[0];
    if (name === "Lissandra") { self.memory.clawX = 100; self.memory.clawUntil = 90; self.memory.clawUnlock = 0; }
    const command = spec.behavior!(perceive(world, 0));
    expect(command).toEqual(expect.objectContaining({ kind: "cast", ability: name === "Ahri" ? "W" : "E2" }));
    expect(self.memory.tradeStart).toBe(0);
  });
  it("Spirit Rush recasts retain the R slot's short-trade and hold restraint", () => {
    for (const mode of ["trade", "hold"] as const) {
      const world = worldFor(ahri.spec); world.modes[0] = mode;
      const self = world.units[0]; self.memory.rushUntil = 450; self.memory.rushStock = 2; self.memory.rushNext = 0;
      self.cooldownReady.Q = Infinity; self.cooldownReady.W = Infinity; self.cooldownReady.E = Infinity; self.cooldownReady.R = Infinity;
      expect(ahri.spec.behavior!(perceive(world, 0))).not.toEqual(expect.objectContaining({ kind: "cast", ability: "R2" }));
    }
  });
  it.each([["Ahri", ahri.spec], ["Lissandra", lissandra.spec]] as const)("%s uses its real kit and preserves 15,000-gold matchup reflection", (_name, spec) => {
    const opponent = kit("Darius").spec;
    const forward = simulateMatchup(spec, opponent, 15000, prices, { settings: { log: true } });
    const reverse = simulateMatchup(opponent, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
      expect(scenario.outcomes.every((outcome) => Number.isFinite(outcome.seconds) && outcome.hp.every(Number.isFinite))).toBe(true);
    }
    const casts = forward.scenarios.flatMap((scenario) => scenario.outcomes.flatMap((outcome) => outcome.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(ability(spec, key).name))).toBe(true);
  }, 60000);
});
