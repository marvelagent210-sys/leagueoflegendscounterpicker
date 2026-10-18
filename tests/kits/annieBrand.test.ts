import { describe, expect, it } from "vitest";
import { compileKit, type KitModule } from "../../engine/kits/compile";
import { completeCast } from "../../engine/sim/actions";
import { defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { cloneWorld } from "../../engine/sim/state";
import annie from "../../kits/champions/Annie";
import brand from "../../kits/champions/Brand";
import { fighter } from "../sim/kits";
import { championData, pets, records, runes } from "./helpers";

function compiled(module: KitModule, ap = 0) {
  const kit = compileKit(championData(module.champion), records(module.champion), module, {}, pets(module.champion), runes());
  kit.spec = { ...kit.spec, bonus: { ap }, base: { ...kit.spec.base, hpRegen: 0, resourceRegen: 0 } };
  return kit;
}

function worldOf(module: KitModule, ap = 0, distance = 300, enemy?: FighterSpec): World {
  return createWorld({ fighters: [compiled(module, ap).spec, enemy ?? fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0 } })], distance, modes: ["idle", "idle"], settings: { log: true, reactionTime: 10, maxSeconds: 20 } });
}
function ability(world: World, key: string): AbilitySpec { return world.units[0].spec.abilities.find((a) => a.key === key)!; }
function cast(world: World, key: string) { return completeCast(world, world.units[0], ability(world, key), world.tick); }
function hit(world: World, key: string) { const a = ability(world, key); abilityHit(world, world.units[0], world.units[1], a, a.onHit!); }
function through(world: World, tick: number) { while (!world.result && world.tick <= tick) step(world, [() => undefined, () => undefined]); }
function protect(world: World, state: "spellShield" | "parry" | "untargetable" | "dodgeAttacks" | "blockAttacks", side: 0 | 1 = 1) {
  applyEffect(world, world.units[side], world.units[side], { type: "state", state, duration: 20, charges: state === "spellShield" ? 1 : undefined }, { scale: 1 });
}
const burns = (world: World) => world.units[1].statuses.filter((s) => s.kind === "dot" && s.key.startsWith("Brand Ablaze:"));

describe("Annie source-backed duel mechanics", () => {
  it("pins maximum-rank damage, costs, penetration, and the actual level-20 shield speed", () => {
    const world = worldOf(annie, 100);
    expect(derive(world.units[0]).magicPenPercent).toBeCloseTo(0.2, 12);
    expect(ability(world, "Q")).toMatchObject({ cost: 80, cooldown: 4, castTime: 0.25, cancelOnInvalidTarget: true });
    expect(ability(world, "W")).toMatchObject({ cost: 90, cooldown: 7, castTime: 0.25 });
    expect(ability(world, "R")).toMatchObject({ cost: 100, cooldown: 100, castTime: 0.25 });
    hit(world, "Q");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(340, 12);
    cast(world, "E");
    expect(world.units[0].statuses.find((s) => s.kind === "shield")?.value).toBe(240);
    expect(world.units[0].statuses.find((s) => s.key === "moveSpeedPercent")?.value).toBeCloseTo(0.535294117647059, 12);
    const kit = compiled(annie);
    expect(new Set(kit.evidence.map((e) => e.revid))).toEqual(new Set([3932255, 3992633, 3952555, 4064223, 4012758, 4033194]));
  });

  it("starts with four stacks and consumes the next damaging cast even when spell-shielded", () => {
    const world = worldOf(annie);
    expect(world.units[0].memory.pyromania).toBe(4);
    protect(world, "spellShield");
    cast(world, "Q");
    expect(world.units[0].memory.pyromania).toBe(0);
    through(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    expect(world.units[0].memory.pyromania).toBe(0);
  });

  it("ordinary Disintegrate grants its stack at contact, including a blocked contact", () => {
    const world = worldOf(annie);
    world.units[0].memory.pyromania = 0;
    cast(world, "Q");
    expect(world.units[0].memory.pyromania).toBe(0);
    protect(world, "spellShield");
    through(world, 30);
    expect(world.units[0].memory.pyromania).toBe(1);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("a Q already in flight does not gain the stun from a later fourth stack", () => {
    const world = worldOf(annie);
    world.units[0].memory.pyromania = 3;
    cast(world, "Q");
    cast(world, "E");
    expect(world.units[0].memory.pyromania).toBe(4);
    through(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(260);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
  });

  it("the empowered Q stuns for 1.75 seconds and a kill refunds mana and cooldown", () => {
    const world = worldOf(annie, 0, 300, fighter({ base: { hp: 200, armor: 0, mr: 0 } }));
    const original = world.units[0].resource;
    cast(world, "Q");
    through(world, 30);
    expect(world.units[1].hp).toBeLessThanOrEqual(0);
    expect(world.units[0].resource).toBe(original);
    expect(world.units[0].cooldownReady.Q).toBeLessThan(120);
    const surviving = worldOf(annie);
    cast(surviving, "Q");
    through(surviving, 15);
    const stun = surviving.units[1].statuses.find((s) => s.key === "stun");
    expect(stun!.endTick - stun!.startTick).toBe(53);
  });

  it("Molten Shield absorbs 240 and retaliates once per cast with 105 magic damage", () => {
    const world = worldOf(annie, 100);
    cast(world, "E");
    const [self, enemy] = world.units;
    const hp = self.hp;
    dealDamage(world, enemy, self, 200, "true");
    expect(self.hp).toBe(hp);
    expect(self.totals.absorbed).toBe(200);
    expect(enemy.totals.damageTaken).toBe(105);
    dealDamage(world, enemy, self, 100, "true");
    expect(self.hp).toBe(hp - 60);
    expect(enemy.totals.damageTaken).toBe(105);
    cast(world, "E");
    dealDamage(world, enemy, self, 1, "true");
    expect(enemy.totals.damageTaken).toBe(210);
  });

  it("the compiled default behavior casts Molten Shield against a real incoming spell", () => {
    const enemy = fighter({ base: { hp: 10000, ad: 0, armor: 0, mr: 0, moveSpeed: 0 }, abilities: [{ key: "Q", name: "Incoming Spell", slot: "Q", cooldown: 100, castTime: 0, delivery: { kind: "target", range: 1000, missileSpeed: 400 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 600 } }] }] });
    const world = worldOf(annie, 100, 300, enemy);
    world.settings.reactionTime = 0.25;
    world.modes = ["hold", "fight"];
    world.units[0].spec.base.moveSpeed = 0; // Hold the target in place to measure absorption.
    const resistance = derive(world.units[0]).mr;
    const incoming = 600 / (1 + (resistance.base + resistance.bonus) / 100);
    for (const key of ["Q", "W", "R"]) world.units[0].cooldownReady[key] = 100000;
    while (world.tick <= 60 && !world.result) step(world, [world.units[0].spec.behavior ?? defaultBehavior, defaultBehavior]);
    expect(world.log.some((entry) => entry.side === 0 && entry.text === "casts Molten Shield")).toBe(true);
    expect(world.units[0].totals.absorbed).toBe(240);
    expect(world.units[0].totals.damageTaken).toBeCloseTo(incoming - 240, 12);
    expect(world.log.filter((entry) => entry.text.startsWith("Molten Shield deals"))).toHaveLength(1);
  });

  it("the compiled default behavior also shields Tibbers against an incoming pet attack", () => {
    const world = worldOf(annie, 100, 300, fighter({ base: { hp: 10000, ad: 100, armor: 0, mr: 0 }, attack: { range: 1000, ranged: true, projectile: true, missileSpeed: 1000 } }));
    world.settings.reactionTime = 0.25;
    world.modes = ["hold", "fight"];
    protect(world, "spellShield");
    cast(world, "R");
    through(world, 0);
    const bear = world.pets[0]!;
    const initialHP = bear.hp;
    for (const key of ["Q", "W", "R"]) world.units[0].cooldownReady[key] = 100000;
    const once = (view: Parameters<typeof defaultBehavior>[0]) => view.world.tick === 1 ? { kind: "attack" as const, pet: bear.id } : undefined;
    while (world.tick <= 30 && !world.result) step(world, [world.units[0].spec.behavior ?? defaultBehavior, once]);
    expect(world.log.some((entry) => entry.side === 0 && entry.text === "casts Molten Shield")).toBe(true);
    expect(bear.hp).toBe(initialHP);
    expect(Number(bear.memory.shield)).toBeLessThan(240);
    expect(world.log.filter((entry) => entry.text.startsWith("Molten Shield deals"))).toHaveLength(1);
  });

  it.each(["Noxious Trap", "Jack in the Box"])("Molten Shield absorbs %s damage without retaliating or spending its later retaliation", (source) => {
    const world = worldOf(annie, 100);
    cast(world, "E");
    const [self, enemy] = world.units;
    const hp = self.hp;
    dealDamage(world, enemy, self, 100, "true", { ability: source, persistent: true });
    expect(self.hp).toBe(hp);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(self.totals.absorbed).toBe(100);
    dealDamage(world, enemy, self, 200, "true", { ability: "Ordinary spell" });
    expect(self.hp).toBe(hp - 60);
    expect(self.totals.absorbed).toBe(240);
    expect(enemy.totals.damageTaken).toBe(105);
    dealDamage(world, enemy, self, 1, "true", { ability: "Ordinary spell" });
    expect(enemy.totals.damageTaken).toBe(105);
  });

  it.each(["Noxious Trap", "Jack in the Box"])("Tibbers independently absorbs %s damage without retaliating", (source) => {
    const world = worldOf(annie, 100);
    cast(world, "R");
    cast(world, "E");
    const bear = world.pets[0]!;
    const hp = bear.hp;
    damagePet(world, world.units[1], bear, 100, "true", false, source);
    expect(bear.hp).toBe(hp);
    expect(bear.memory.shield).toBe(140);
    expect(world.units[1].totals.damageTaken).toBe(0);
    damagePet(world, world.units[1], bear, 200, "true", false, "Ordinary spell");
    expect(bear.hp).toBe(hp - 60);
    expect(world.units[1].totals.damageTaken).toBe(105);
    damagePet(world, world.units[1], bear, 1, "true", false, "Ordinary spell");
    expect(world.units[1].totals.damageTaken).toBe(105);
  });

  it("scheduled Noxious Trap poison preserves the source exception on every damage tick", () => {
    const world = worldOf(annie, 100);
    cast(world, "E");
    applyEffect(world, world.units[1], world.units[0], { type: "dot", damageType: "magic", total: { base: 100 }, duration: 1, interval: 0.25, label: "Noxious Trap" }, { scale: 1 });
    through(world, 32);
    expect(world.units[0].totals.absorbed).toBeGreaterThan(0);
    expect(world.units[0].totals.damageTaken).toBe(0);
    expect(world.units[1].totals.damageTaken).toBe(0);
    dealDamage(world, world.units[1], world.units[0], 1, "true", { ability: "Toxic Shot", persistent: true });
    expect(world.units[1].totals.damageTaken).toBe(105);
  });

  it("decays shield movement speed to half at 0.75 seconds and expires it at 1.5", () => {
    const world = worldOf(annie);
    cast(world, "E");
    through(world, 22);
    const speed = world.units[0].statuses.find((s) => s.key === "moveSpeedPercent")!.value;
    expect(speed).toBeCloseTo(0.535294117647059 * (1 - 22 / 45), 12);
    through(world, 45);
    expect(world.units[0].statuses.some((s) => s.key === "moveSpeedPercent")).toBe(false);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(true);
    through(world, 90);
    expect(world.units[0].statuses.some((s) => s.kind === "shield")).toBe(false);
  });

  it("a blocked attack retaliates, while dodged and blinded attacks do not", () => {
    const block = worldOf(annie, 100);
    cast(block, "E");
    protect(block, "blockAttacks", 0);
    attackHit(block, block.units[1], block.units[0], false, []);
    expect(block.units[1].totals.damageTaken).toBe(105);
    expect(block.units[0].totals.absorbed).toBe(0);
    const dodge = worldOf(annie, 100);
    cast(dodge, "E");
    protect(dodge, "dodgeAttacks", 0);
    attackHit(dodge, dodge.units[1], dodge.units[0], false, []);
    attackHit(dodge, dodge.units[1], dodge.units[0], true, []);
    expect(dodge.units[1].totals.damageTaken).toBe(0);
  });

  it("summons a real 4150-HP Tibbers, even when the 475-damage summon is shielded", () => {
    const world = worldOf(annie, 100);
    protect(world, "spellShield");
    cast(world, "R");
    through(world, 0);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.pets).toHaveLength(1);
    expect(world.pets[0]).toMatchObject({ hp: 4150, endTick: 1350, spec: { armor: 100, mr: 100, radius: 80 } });
    through(world, 8);
    expect(world.log.some((e) => e.text === "Tibbers deals 70 magic damage")).toBe(true);
    expect(world.log.some((e) => e.text === "Tibbers Flame Aura deals 5 magic damage")).toBe(true);
  });

  it("Tibbers attacks respect dodges, while his persistent aura continues and does not consume a shield", () => {
    const world = worldOf(annie, 100);
    protect(world, "spellShield");
    cast(world, "R");
    through(world, 0);
    protect(world, "dodgeAttacks");
    protect(world, "spellShield");
    through(world, 30);
    expect(world.log.filter((e) => e.text.startsWith("Tibbers deals"))).toHaveLength(0);
    expect(world.log.filter((e) => e.text.startsWith("Tibbers Flame Aura deals"))).toHaveLength(4);
    expect(world.units[1].totals.damageTaken).toBe(20);
    expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });

  it("the aura uses its quoted pulse clock and also reaches nearby enemy pets", () => {
    const world = worldOf(annie, 100);
    protect(world, "spellShield");
    cast(world, "R");
    through(world, 0);
    const enemyPet = spawnPet(world, world.units[1], { kind: "target", name: "Target pet", hp: 1000, armor: 0, mr: 100, radius: 20, moveSpeed: 0, duration: 10 }, world.pets[0]!.x);
    through(world, 30);
    expect(world.log.filter((e) => e.text.startsWith("Tibbers Flame Aura deals")).map((e) => e.tick)).toEqual([8, 15, 23, 30]);
    expect(enemyPet.hp).toBeCloseTo(1000 - 4 * 5 / 1.8, 12); // Annie's passive R penetration also applies.
  });

  it("Enrage slows down successive attack intervals and returns to the quoted ordinary speed", () => {
    const world = worldOf(annie);
    protect(world, "spellShield");
    cast(world, "R");
    through(world, 170);
    const attacks = world.log.filter((e) => e.text.startsWith("Tibbers deals")).map((e) => e.tick);
    expect(attacks.slice(0, 4)).toEqual([1, 1 + Math.ceil(30 / 1.5362732), 1 + Math.ceil(30 / 1.5362732) + Math.ceil(30 / 1.3070344), 1 + Math.ceil(30 / 1.5362732) + Math.ceil(30 / 1.3070344) + Math.ceil(30 / 1.0430756)]);
    expect(attacks.at(-1)! - attacks.at(-2)!).toBe(48); // 0.625 attacks/second after Enrage.
  });

  it("the bear's independent shield can absorb a lethal hit and retaliates separately from Annie", () => {
    const world = worldOf(annie, 100);
    cast(world, "R");
    cast(world, "E");
    const bear = world.pets[0]!;
    bear.hp = 100;
    const before = world.units[1].totals.damageTaken;
    damagePet(world, world.units[1], bear, 300, "magic", false);
    // Tibbers has 100 MR: 150 damage is wholly absorbed by his separate 240 shield.
    expect(bear.hp).toBe(100);
    expect(bear.memory.shield).toBe(90);
    expect(world.pets).toContain(bear);
    expect(world.units[1].totals.damageTaken - before).toBe(105);
    damagePet(world, world.units[1], bear, 100, "magic", false);
    expect(world.units[1].totals.damageTaken - before).toBe(105);
    dealDamage(world, world.units[1], world.units[0], 1, "true");
    expect(world.units[1].totals.damageTaken - before).toBe(210);
  });

  it("a real Pyromania stun enrages the bear again, but an immune target does not", () => {
    const world = worldOf(annie);
    cast(world, "R");
    through(world, 95);
    const bear = world.pets[0]!;
    const oldUntil = bear.memory.enrageUntil;
    world.units[0].memory.pyromania = 4;
    cast(world, "W");
    through(world, world.tick);
    expect(bear.memory.enrageUntil).toBeGreaterThan(Number(oldUntil));
    const again = bear.memory.enrageUntil;
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "ccImmune", duration: 10 }, { scale: 1 });
    world.units[0].memory.pyromania = 4;
    cast(world, "W");
    through(world, world.tick);
    expect(bear.memory.enrageUntil).toBe(again);
  });
});

describe("Brand source-backed duel mechanics", () => {
  it("uses pinned maximum-rank formulas/costs and keeps the Pillar delay after the cast", () => {
    const world = worldOf(brand, 100);
    expect(ability(world, "Q")).toMatchObject({ cooldown: 6, cost: 70, castTime: 0.25 });
    expect(ability(world, "W")).toMatchObject({ cooldown: 8, cost: 100, castTime: 0.25, delivery: { delay: 0.627 } });
    expect(ability(world, "E")).toMatchObject({ cooldown: 9, cost: 90, cancelOnInvalidTarget: true });
    expect(ability(world, "R")).toMatchObject({ cooldown: 80, cost: 100, delivery: { missileSpeed: 750 } });
    hit(world, "Q");
    expect(world.units[1].totals.damageTaken).toBe(255);
    expect(new Set(compiled(brand).evidence.map((e) => e.revid))).toEqual(new Set([4052621, 4007576, 3955084, 4034693, 3955099]));
  });

  it("one Ablaze stack burns exactly 2% maximum HP over four seconds", () => {
    const world = worldOf(brand);
    hit(world, "E");
    const direct = world.units[1].totals.damageTaken;
    through(world, 119);
    expect(world.units[1].totals.damageTaken - direct).toBeCloseTo(187.5, 12);
    through(world, 120);
    expect(world.units[1].totals.damageTaken - direct).toBeCloseTo(200, 12);
    expect(world.log.filter((e) => e.text.startsWith("Blaze deals"))).toHaveLength(16);
    expect(burns(world)).toHaveLength(0);
  });

  it("refreshes both stacks' lifetime while preserving their staggered tick clocks", () => {
    const world = worldOf(brand);
    hit(world, "E");
    through(world, 9);
    hit(world, "E");
    const live = burns(world);
    expect(live).toHaveLength(2);
    expect(live.map((s) => s.endTick)).toEqual([130, 130]);
    expect(live.map((s) => s.dot!.nextTick)).toEqual([15, 18]);
    through(world, 22);
    expect(world.log.filter((e) => e.text.startsWith("Blaze deals")).map((e) => e.tick)).toEqual([8, 15, 18]);
  });

  it("stuns with Sear only when Ablaze already exists at impact", () => {
    const world = worldOf(brand);
    hit(world, "Q");
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    hit(world, "Q");
    const stun = world.units[1].statuses.find((s) => s.key === "stun")!;
    expect(stun.endTick - stun.startTick).toBe(53);
    const inFlight = worldOf(brand);
    cast(inFlight, "Q");
    hit(inFlight, "E");
    through(inFlight, 20);
    expect(inFlight.units[1].statuses.some((s) => s.key === "stun")).toBe(true);
  });

  it("Pillar of Flame reads the 25% Ablaze bonus at eruption, including a later E", () => {
    const bare = worldOf(brand, 100);
    cast(bare, "W");
    through(bare, 19);
    expect(bare.units[1].totals.damageTaken).toBe(325);
    const primed = worldOf(brand, 100);
    cast(primed, "W");
    hit(primed, "E");
    through(primed, 19);
    const pillar = primed.log.find((e) => e.text.startsWith("Pillar of Flame deals"))!;
    expect(pillar.text).toBe("Pillar of Flame deals 406 magic damage");
  });

  it("three stacks detonate two seconds later for the level-20 health/AP product", () => {
    const world = worldOf(brand, 100);
    hit(world, "E"); hit(world, "E"); hit(world, "E");
    expect(burns(world)).toHaveLength(3);
    through(world, 59);
    expect(world.log.some((e) => e.text.startsWith("Blaze explosion deals"))).toBe(false);
    through(world, 60);
    // The committed wiki extrapolates 12% at level 18 to 12.7058823529412% at level 20.
    expect(world.log.find((e) => e.text.startsWith("Blaze explosion deals"))?.text).toBe("Blaze explosion deals 1471 magic damage");
    expect(burns(world)).toHaveLength(1);
    hit(world, "E"); hit(world, "E");
    expect(burns(world)).toHaveLength(1);
    through(world, 180);
    expect(world.log.filter((e) => e.text.startsWith("Blaze explosion deals"))).toHaveLength(1);
  });

  it("spell shields/parries prevent new stacks and untargetability prevents the explosion", () => {
    const shielded = worldOf(brand);
    protect(shielded, "spellShield");
    hit(shielded, "E");
    expect(burns(shielded)).toHaveLength(0);
    protect(shielded, "parry");
    hit(shielded, "E");
    expect(burns(shielded)).toHaveLength(0);
    const ring = worldOf(brand);
    hit(ring, "E"); hit(ring, "E"); hit(ring, "E");
    protect(ring, "untargetable");
    through(ring, 60);
    expect(ring.log.some((e) => e.text.startsWith("Blaze explosion deals"))).toBe(false);
    expect(burns(ring)).toHaveLength(0);
  });

  it("Pyroclasm makes three actual champion hits through two return legs", () => {
    const world = worldOf(brand, 100);
    cast(world, "R");
    through(world, 120);
    const hits = world.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"));
    expect(hits).toHaveLength(3);
    expect(hits.map((e) => e.text)).toEqual(["Pyroclasm deals 280 magic damage", "Pyroclasm (bounce) deals 280 magic damage", "Pyroclasm (bounce) deals 280 magic damage"]);
    expect(hits[1]!.tick - hits[0]!.tick).toBeGreaterThan(10);
    expect(hits[2]!.tick - hits[1]!.tick).toBeGreaterThan(10);
    expect(world.log.filter((e) => e.text.startsWith("inflicts slow"))).toHaveLength(2);
  });

  it("Pyroclasm pins and applies its 500-unit acceleration after each movement step", () => {
    const world = worldOf(brand, 0, 600);
    cast(world, "R");
    through(world, 0);
    const missile = world.missiles.find((entry) => entry.source === "R")!;
    expect(missile.acceleration).toEqual({ perTick: 500 / 900, maxPerTick: 3000 / 30 });
    expect(missile.x).toBe(750 / 30);
    expect(missile.perTick).toBeCloseTo(750 / 30 + 500 / 900, 12);
    through(world, 1);
    expect(missile.x).toBeCloseTo(2 * 750 / 30 + 500 / 900, 12);
    expect(compiled(brand).evidence.some((entry) => entry.text.includes("Acceleration 500u/s"))).toBe(true);
  });

  it("Pyroclasm caps at 3000 units/second rather than accelerating without limit", () => {
    const world = worldOf(brand, 0, 600);
    cast(world, "R");
    world.units[1].x = 20000; // A target that moved after the completed targeted cast.
    through(world, 134);
    const missile = world.missiles.find((entry) => entry.source === "R")!;
    expect(missile.perTick).toBe(100);
    expect(missile.x).toBeCloseTo(8400, 8);
    through(world, 135);
    expect(missile.perTick).toBe(100);
    expect(missile.x).toBeCloseTo(8500, 8);
  });

  it("return legs and subsequent enemy legs reset to 750 and use the same acceleration", () => {
    const world = worldOf(brand);
    cast(world, "R");
    while (!world.log.some((entry) => entry.text === "Pyroclasm deals 250 magic damage")) step(world, [() => undefined, () => undefined]);
    const origin = Number(world.units[0].memory.pyroX);
    const starts = Number(world.units[0].memory.pyroAt);
    through(world, starts);
    expect(Number(world.units[0].memory.pyroX)).toBeCloseTo(origin - 25, 12);
    expect(Number(world.units[0].memory.pyroReturnSpeed)).toBeCloseTo(25 + 500 / 900, 12);
    through(world, starts + 1);
    expect(Number(world.units[0].memory.pyroX)).toBeCloseTo(origin - 50 - 500 / 900, 12);
    while (world.units[0].memory.pyroPhase !== "waitEnemy") step(world, [() => undefined, () => undefined]);
    through(world, Number(world.units[0].memory.pyroAt));
    const missile = world.missiles.find((entry) => entry.source === "RB")!;
    expect(missile.acceleration).toEqual({ perTick: 500 / 900, maxPerTick: 100 });
    expect(missile.x).toBe(25);
    expect(missile.perTick).toBeCloseTo(25 + 500 / 900, 12);
  });

  it("a target outside bounce range receives only the initial Pyroclasm hit", () => {
    const world = worldOf(brand, 0, 600);
    cast(world, "R");
    through(world, 120);
    expect(world.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"))).toHaveLength(1);
    expect(burns(world)).toHaveLength(1);
  });

  it("an initial spell shield ends Pyroclasm, while a shield on the second hit permits the third", () => {
    const blocked = worldOf(brand);
    protect(blocked, "spellShield");
    cast(blocked, "R");
    through(blocked, 120);
    expect(blocked.units[1].totals.damageTaken).toBe(0);
    expect(burns(blocked)).toHaveLength(0);
    expect(blocked.log.filter((e) => e.text.includes("spell shield blocks Pyroclasm"))).toHaveLength(1);
    const bounce = worldOf(brand);
    cast(bounce, "R");
    while (!bounce.log.some((e) => e.text === "Pyroclasm deals 250 magic damage")) step(bounce, [() => undefined, () => undefined]);
    protect(bounce, "spellShield");
    through(bounce, 120);
    expect(bounce.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"))).toHaveLength(2);
    expect(bounce.log.filter((e) => e.text.includes("spell shield blocks Pyroclasm (bounce)"))).toHaveLength(1);
    expect(burns(bounce)).toHaveLength(2);
    expect(bounce.log.some((e) => e.text.startsWith("Blaze explosion deals"))).toBe(false);
  });

  it("an untargetable inbound enemy reforms the bounce without damage or a Blaze stack", () => {
    const world = worldOf(brand);
    cast(world, "R");
    protect(world, "untargetable");
    through(world, 10);
    expect(burns(world)).toHaveLength(0);
    expect(world.units[1].totals.damageTaken).toBe(0);
    world.units[1].statuses = world.units[1].statuses.filter((s) => s.key !== "untargetable");
    through(world, 120);
    const hits = world.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"));
    expect(hits).toHaveLength(2);
    expect(hits.every((e) => e.text.startsWith("Pyroclasm (bounce)"))).toBe(true);
    expect(burns(world)).toHaveLength(2);
  });

  it("untargetability cannot reform a missile with no valid bounce target at destruction", () => {
    const world = worldOf(brand, 0, 600);
    cast(world, "R");
    protect(world, "untargetable");
    through(world, 0); // Brand is outside the sourced 600-unit bounce acquisition radius.
    world.units[0].x = world.units[1].x - 300;
    world.units[1].statuses = world.units[1].statuses.filter((status) => status.key !== "untargetable");
    through(world, 120);
    expect(world.log.some((entry) => entry.text.startsWith("Pyroclasm") && entry.text.includes("deals"))).toBe(false);
    expect(burns(world)).toHaveLength(0);
  });

  it("a projectile wall destroys the return leg and its remaining bounces", () => {
    const world = worldOf(brand);
    cast(world, "R");
    while (!world.log.some((e) => e.text === "Pyroclasm deals 250 magic damage")) step(world, [() => undefined, () => undefined]);
    world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", seenTick: world.tick, x: 200, radius: 0, startTick: world.tick, endTick: 300 });
    through(world, 120);
    expect(world.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"))).toHaveLength(1);
  });

  it("branch copies preserve independent burn clocks and the in-flight bounce state", () => {
    const world = worldOf(brand);
    cast(world, "R");
    through(world, 25);
    const copy = cloneWorld(world);
    through(world, 120);
    through(copy, 120);
    expect(copy.units.map((u) => u.hp)).toEqual(world.units.map((u) => u.hp));
    expect(copy.log).toEqual(world.log);
    expect(copy.units[1].statuses).not.toBe(world.units[1].statuses);
    expect(copy.units[0].memory).not.toBe(world.units[0].memory);
  });

  it("a moving Brand can break the return bounce by leaving its acquisition range", () => {
    const world = worldOf(brand);
    cast(world, "R");
    while (!world.log.some((e) => e.text === "Pyroclasm deals 250 magic damage")) step(world, [() => undefined, () => undefined]);
    world.units[0].x = -1000;
    through(world, 100);
    expect(world.log.filter((e) => e.text.startsWith("Pyroclasm") && e.text.includes("deals"))).toHaveLength(1);
  });

  it("Brand restores 40 mana once on an ability kill", () => {
    const world = worldOf(brand, 0, 300, fighter({ base: { hp: 100, armor: 0, mr: 0 } }));
    world.units[0].resource = 100;
    hit(world, "E");
    expect(world.units[0].resource).toBe(140);
  });

  it("Brand also restores mana when an ordinary attack kills an Ablaze target", () => {
    const world = worldOf(brand);
    hit(world, "E");
    world.units[0].resource = 100;
    world.units[1].hp = 20;
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[1].hp).toBeLessThanOrEqual(0);
    expect(world.units[0].resource).toBe(140);
  });

  it("a detonation-boundary burn tick is independent of the side that has first upkeep", () => {
    const worlds = [worldOf(brand), worldOf(brand)];
    worlds[1]!.settings.firstMover = 1;
    for (const world of worlds) {
      hit(world, "E"); hit(world, "E"); hit(world, "E");
      through(world, 60);
    }
    expect(worlds[0]!.units[1].hp).toBe(worlds[1]!.units[1].hp);
    expect(worlds[0]!.log.filter((e) => e.tick === 60 && e.text.startsWith("Blaze deals"))).toHaveLength(3);
    expect(worlds[1]!.log.filter((e) => e.tick === 60 && e.text.startsWith("Blaze deals"))).toHaveLength(3);
  });
});
