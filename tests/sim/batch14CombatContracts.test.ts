import { describe, expect, it } from "vitest";
import { launchAttack, progressDash, startAttack, startCast } from "../../engine/sim/actions";
import { applyCC, applyEffect, attackHit, immediateDisplace } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { ActualMovement, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld } from "../../engine/sim/state";
import { idle, lasting } from "./helpers";
import { ability, fighter } from "./kits";

const clock = (world: ReturnType<typeof createWorld>, count: number) => {
  for (let i = 0; i < count; i++) step(world, [idle, idle]);
};
const manaSpec = (ap = 200): FighterSpec => ({ ...fighter({ base: { resource: 1000 }, bonus: { ap } }), resourceType: "Mana", statConversions: { apToManaPercent: 0.001 } });
const worldFor = (spec = fighter(), rival = fighter()) => createWorld({ fighters: [spec, rival], distance: 300, modes: ["idle", "idle"] });
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Actual minion", targetClass: "minion", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 300, duration: 30, ...changes });

describe("batch14 AP and mana contracts", () => {
  it("initializes AP-converted mana once and exposes true bonus mana on both bodies", () => {
    const w = worldFor(manaSpec(), manaSpec(400));
    expect(w.units[0].resource).toBe(1200);
    expect(w.units[1].resource).toBe(1400);
    expect(evaluate({ base: 0, ratios: { bonusMana: 1, targetBonusMana: 1 } }, w.units[0], w.units[1])).toBe(600);
  });
  it("preserves explicitly supplied starting mana", () => {
    const w = worldFor({ ...manaSpec(), resourceStart: 17 });
    expect(derive(w.units[0]).maxResource).toBe(1200);
    expect(w.units[0].resource).toBe(17);
  });
  it("does not refill spent mana when AP increases and caps mana when AP disappears", () => {
    const w = worldFor(manaSpec()), u = w.units[0];
    u.resource = 1100;
    u.spec.bonus!.ap = 400;
    expect(derive(u).maxResource).toBe(1400);
    clock(w, 1);
    expect(u.resource).toBe(1100);
    u.spec.bonus!.ap = 0;
    clock(w, 1);
    expect(u.resource).toBe(1000);
  });
  it("tracks in-place conversion, AP-buff, and maximum-resource mutations", () => {
    const w = worldFor(manaSpec()), u = w.units[0];
    derive(u);
    u.spec.statConversions!.apToManaPercent = 0.002;
    expect(derive(u).maxResource).toBe(1400);
    u.statuses.push(lasting("stat", "AP", 100), lasting("stat", "maxResource", 200));
    expect(derive(u).maxResource).toBe(1920);
    expect(derive(u)).toEqual(derive(cloneWorld(w).units[0]));
    delete u.spec.statConversions!.apToManaPercent;
    expect(derive(u).maxResource).toBe(1200);
  });
  it.each([undefined, "Energy", "Fury"])("does not reinterpret %s resource as mana", resourceType => {
    const w = worldFor({ ...manaSpec(), resourceType }), u = w.units[0];
    expect(derive(u).maxResource).toBe(1000);
    expect(evaluate({ base: 0, ratios: { bonusMana: 1, maxMana: 1, targetBonusMana: 1 } }, u, w.units[1])).toBe(0);
  });
  it("multiplies total AP synchronously, without recursive health conversion", () => {
    const spec = manaSpec();
    spec.bonus!.hp = 1000;
    spec.statConversions!.healthToAP = 0.1;
    spec.statConversions!.apToHealth = 2;
    const w = worldFor(spec), u = w.units[0];
    u.statuses.push(lasting("stat", "APMultiplier", 0.15));
    expect(derive(u).ap).toBeCloseTo(345, 12);
    expect(derive(u).maxHp).toBeCloseTo(3460, 12);
    expect(derive(u).maxResource).toBeCloseTo(1345, 12);
    u.statuses[0]!.value = 0.2;
    expect(derive(u).ap).toBe(360);
    expect(derive(u)).toEqual(derive(cloneWorld(w).units[0]));
  });
});

describe("explicit same-source slow groups", () => {
  const slow = (abilityName: string, value: number, source: 0 | 1 = 1, group: string | null = "hwei") => lasting("cc", "slow", value, { source, ability: abilityName, ...(group ? { slowStackGroup: group } : {}) });
  it("compounds distinct spells, deduplicates refreshes, and competes with ordinary slows", () => {
    const w = worldFor(), u = w.units[0];
    u.statuses.push(slow("QE", 0.3), slow("QE", 0.3), slow("EE", 0.4), slow("ordinary", 0.5, 1, null));
    expect(derive(u).rawMoveSpeed).toBeCloseTo(147, 12);
    expect(derive(u).moveSpeed).toBeCloseTo(183.5, 12);
    u.statuses.push(slow("stronger", 0.7, 1, null));
    expect(derive(u).rawMoveSpeed).toBeCloseTo(105, 12);
  });
  it("keeps different sources and groups independent", () => {
    const w = worldFor(), u = w.units[0];
    u.statuses.push(slow("QE", 0.3), slow("EE", 0.4, 0), slow("other", 0.2, 1, "another"));
    expect(derive(u).rawMoveSpeed).toBe(210);
  });
  it("applies slow resistance once and observes in-place dependency changes", () => {
    const w = worldFor(), u = w.units[0];
    u.statuses.push(slow("QE", 0.3), slow("EE", 0.4), lasting("stat", "slowResist", 0.5));
    expect(derive(u).rawMoveSpeed).toBeCloseTo(248.5, 12);
    delete u.statuses[1]!.slowStackGroup;
    expect(derive(u).rawMoveSpeed).toBe(280);
    expect(derive(u)).toEqual(derive(cloneWorld(w).units[0]));
  });
  it("respects slow immunity before grouping and propagates only accepted effect metadata", () => {
    const w = worldFor(), [u, enemy] = w.units;
    u.statuses.push(lasting("state", "slowImmune"));
    expect(applyCC(w, enemy, u, "slow", 1, 0.3, false, "QE", false, "hwei")).toBe(false);
    applyEffect(w, enemy, u, { type: "cc", cc: "slow", duration: 1, strength: 0.4, bypassSlowImmune: true, slowStackGroup: "hwei" }, { scale: 1, ability: ability({ key: "EQ", delivery: { kind: "self" } }) });
    expect(derive(u).rawMoveSpeed).toBe(210);
    expect(u.statuses.find(s => s.kind === "cc")?.slowStackGroup).toBe("hwei");
  });
});

describe("actual movement observations", () => {
  const observedWorld = (spells: FighterSpec["abilities"] = []) => {
    const events: Array<ActualMovement & { pet?: number }> = [];
    const observer = fighter({ hooks: { onActualMovement(c) { events.push({ ...c.movement, ...(c.targetPet ? { pet: c.targetPet.id } : {}) }); } } });
    return { w: worldFor(fighter({ abilities: spells }), observer), events };
  };
  it("reports actual walking endpoints without inventing movement at contact", () => {
    const { w, events } = observedWorld();
    step(w, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ kind: "walk", from: 0, to: 350 / 30 });
    w.units[0].x = w.units[1].x - 70;
    step(w, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(events).toHaveLength(1);
  });
  it("reports both swept dash steps and the real zero-length knockdown endpoint", () => {
    const dash = ability({ key: "dash", delivery: { kind: "dash", direction: "away", distance: 60, speed: 900 } });
    const { w, events } = observedWorld([dash]);
    startCast(w, w.units[0], dash);
    w.tick = 1; progressDash(w, w.units[0]);
    expect(events.at(-1)).toMatchObject({ kind: "dash", from: 0, to: -30, ended: false, startTick: 0 });
    applyEffect(w, w.units[1], w.units[0], { type: "knockdown" }, { scale: 1 });
    expect(events.at(-1)).toMatchObject({ kind: "dash", from: -30, to: -30, ended: true, endTick: 1 });
    expect(w.units[0].action).toBeUndefined();
  });
  it("identifies blinks and zero-duration guarded forced movement separately", () => {
    const blink = ability({ key: "blink", delivery: { kind: "blink", direction: "away", distance: 150 } });
    const { w, events } = observedWorld([blink]);
    startCast(w, w.units[0], blink);
    expect(events.at(-1)).toMatchObject({ kind: "blink", from: 0, to: -150, ended: true });
    immediateDisplace(w, w.units[1], w.units[0], -75, "pull");
    expect(events.at(-1)).toMatchObject({ kind: "forced", from: -150, to: -225, ended: true, ability: "pull" });
  });
  it("retains the actual pet identity on a swept forced path and its expiration", () => {
    const { w, events } = observedWorld();
    const pet = spawnPet(w, w.units[0], petSpec({ moveSpeed: 0 }), 0);
    petEffects(w, w.units[1], pet, [{ type: "displace", direction: "away", distance: 90, duration: 0.1 }]);
    advancePets(w);
    expect(events.at(-1)).toMatchObject({ kind: "forced", pet: pet.id, from: 0, to: -30 });
    w.tick = 3; advancePets(w);
    expect(events.at(-1)).toMatchObject({ kind: "forced", pet: pet.id, from: -30, to: -30, ended: true });
  });
  it("observes after-death movement only with a released-effect opt-in", () => {
    const { w, events } = observedWorld();
    w.units[1].alive = false;
    immediateDisplace(w, w.units[1], w.units[0], -30);
    expect(events).toHaveLength(0);
    w.units[1].spec.hooks!.movementEventsAfterDeath = true;
    immediateDisplace(w, w.units[1], w.units[0], -30);
    expect(events).toHaveLength(1);
  });
});

describe("actual carried pets and stasis", () => {
  const attack = { range: 800, interval: 1, attackLike: true, effects: [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 } }] };
  it("keeps identity and health, cancels an unlaunched windup, and follows actual carrier movement", () => {
    const w = worldFor(), pet = spawnPet(w, w.units[0], petSpec({ attack: { ...attack, windup: 0.5 } }), 0);
    advancePets(w);
    expect(pet.windup).toBeDefined();
    petEffects(w, w.units[1], pet, [{ type: "state", state: "stasis", duration: 10 }]);
    pet.carriedBy = 1;
    const hp = pet.hp, id = pet.id;
    step(w, [idle, () => ({ kind: "move", direction: -1 })]);
    expect(w.pets[0]).toBe(pet);
    expect(pet).toMatchObject({ id, hp, owner: 0 });
    expect(pet.x).toBe(w.units[1].x);
    expect(pet.windup).toBeUndefined();
    expect(w.units[1].hp).toBe(2000);
  });
  it("lets already launched pet missiles finish through later stasis", () => {
    const w = worldFor(), pet = spawnPet(w, w.units[0], petSpec({ moveSpeed: 0, attack: { ...attack, missileSpeed: 600 } }), 0);
    advancePets(w);
    expect(w.petMissiles).toHaveLength(1);
    petEffects(w, w.units[1], pet, [{ type: "state", state: "stasis", duration: 10 }]);
    pet.carriedBy = 1;
    for (let tick = 1; tick <= 30; tick++) { w.tick = tick; advancePets(w); }
    expect(w.units[1].hp).toBe(1900);
    expect(w.petMissiles).toHaveLength(0);
    expect(pet.windup).toBeUndefined();
  });
});

describe("captured basic replacements, disruption and released effects", () => {
  it("replaces the entire base packet without critting and remains a magic basic", () => {
    const packets: Array<{ attack: boolean; damageType: string; amount: number }> = [];
    const a = fighter({ bonus: { ap: 200, critChance: 1 }, hooks: { onDamageDealt(c) { packets.push({ attack: c.attack, damageType: c.damageType, amount: c.amount }); } } });
    const w = worldFor(a, fighter({ base: { armor: 0, mr: 0 } }));
    attackHit(w, w.units[0], w.units[1], false, [], undefined, false, { baseDamage: { damageType: "magic", amount: { base: 120, ratios: { AD: 1, AP: 0.5 } } } });
    expect(w.units[1].hp).toBe(1680);
    expect(packets).toEqual([{ attack: true, damageType: "magic", amount: 320 }]);
  });
  it.each(["blind", "dodgeAttacks", "blockAttacks"] as const)("keeps %s avoidance for replacement damage", state => {
    const w = worldFor(fighter(), fighter({ base: { armor: 0, mr: 0 } }));
    if (state !== "blind") w.units[1].statuses.push(lasting("state", state));
    attackHit(w, w.units[0], w.units[1], state === "blind", [], undefined, false, { baseDamage: { damageType: "magic", amount: { base: 320 } } });
    expect(w.units[1].hp).toBe(2000);
  });
  it("preserves replacements independently across cloned windups and launched missiles", () => {
    const a = fighter({ attack: { ranged: true, missileSpeed: 1000, projectile: true }, hooks: { onAttack(c) { c.action.baseDamage = { damageType: "magic", amount: { base: 120, ratios: { AP: 0.5 } } }; } } });
    const w = worldFor(a);
    startAttack(w, w.units[0]);
    const branch = cloneWorld(w);
    if (branch.units[0].action?.kind !== "windup" || w.units[0].action?.kind !== "windup") throw new Error("windup missing");
    branch.units[0].action.baseDamage!.amount.base = 999;
    expect(w.units[0].action.baseDamage!.amount.base).toBe(120);
    launchAttack(w, w.units[0]);
    const launched = cloneWorld(w);
    launched.missiles[0]!.attack!.baseDamage!.amount.ratios!.AP = 2;
    expect(w.missiles[0]!.attack!.baseDamage!.amount.ratios!.AP).toBe(0.5);
  });
  it("notifies an accepted disruption without a generic channel and honors its guards", () => {
    let interruptions = 0;
    const w = worldFor(fighter({ hooks: { onDisrupted() { interruptions++; } } }));
    expect(w.units[0].action).toBeUndefined();
    applyEffect(w, w.units[1], w.units[0], { type: "disrupt" }, { scale: 1 });
    expect(interruptions).toBe(1);
    w.units[0].statuses.push(lasting("state", "ccImmune"));
    applyEffect(w, w.units[1], w.units[0], { type: "disrupt" }, { scale: 1 });
    expect(interruptions).toBe(1);
  });
  it.each([true, false])("waits for a real hook-owned released zone only with persistsAfterDeath=%s", persistsAfterDeath => {
    const spell = ability({ key: "released", delivery: { kind: "self" }, persistsAfterDeath });
    const owner = fighter({ abilities: [spell], hooks: { onTickWhileDead(c) { if (c.tick === 2) c.apply({ type: "damage", damageType: "true", amount: { base: 150 } }); } } });
    const w = worldFor(owner);
    w.zones.push({ id: w.nextId++, owner: 0, kind: "field", seenTick: 0, x: 0, radius: 100, startTick: 0, endTick: 4, pendingAfterDeath: true, ability: spell.key, connects: true, scale: 1 });
    w.units[0].hp = 0; w.units[0].alive = false;
    step(w, [idle, idle]);
    expect(w.result !== undefined).toBe(!persistsAfterDeath);
    if (persistsAfterDeath) { clock(w, 5); expect(w.units[1].hp).toBe(1850); expect(w.result?.winner).toBe(1); }
  });
});
