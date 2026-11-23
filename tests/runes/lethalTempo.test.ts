import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { advanceMissiles, cancelOutOfRange, launchAttack, launchBonusAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, attackHit } from "../../engine/sim/combat";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter, RANGED } from "../sim/kits";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadCombatRuneRules("16.21", catalog);
const stackKey = "rune-effects:attackSpeed:8008";
const boltKey = "rune:lethal-tempo:bolt";
const stacks = (world: World) => world.units[0].statuses.filter(status => status.memoKey === stackKey);
const bolts = (world: World) => world.missiles.filter(missile => missile.source === boltKey);
const base = 552 / 17;

function arena(self = fighter({ base: { ad: 0 } }), enemy = fighter({ base: { hp: 20000, armor: 0, mr: 0 } })): World {
  const own = equipRuneEffects({ adaptiveType: "Physical", ...self }, [8008], catalog, rules);
  const world = createWorld({ fighters: [own.spec, enemy], distance: 0, modes: ["idle", "idle"],
    settings: { maxSeconds: 60 } });
  world.units[0].x = 0;
  world.units[1].x = 100;
  return world;
}

function launch(world: World, count = 1, pet?: Pet): void {
  for (let i = 0; i < count; i++) {
    const unit = world.units[0];
    startAttack(world, unit, pet);
    const action = unit.action;
    if (action?.kind !== "windup") throw new Error("Expected native attack windup");
    world.tick = action.launchTick;
    launchAttack(world, unit, action);
  }
}

function advance(world: World, ticks = 1): void {
  for (let tick = 0; tick < ticks; tick++) {
    world.tick++;
    advanceMissiles(world);
  }
}

function packet(world: World) {
  expect(bolts(world)).toHaveLength(1);
  const record = bolts(world)[0]!.onHit[0]!;
  if (record.type !== "damage") throw new Error("Expected separate proc damage");
  return record;
}

describe("Lethal Tempo stacks and expiration", () => {
  it("counts completed windups, including an attack whose contact is blocked, and fires beginning with the seventh", () => {
    const world = arena();
    startAttack(world, world.units[0]);
    expect(stacks(world)).toHaveLength(0);
    world.units[1].x = 5000;
    cancelOutOfRange(world, world.units[0]);
    launchAttack(world, world.units[0]);
    expect(stacks(world)).toHaveLength(0);
    world.units[1].x = 100;
    world.units[1].statuses.push(lasting("state", "blockAttacks"));
    launch(world, 6);
    expect(stacks(world)).toHaveLength(6);
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(0.36, 10);
    expect(bolts(world)).toHaveLength(0);
    launch(world);
    expect(packet(world).amount.base).toBeCloseTo(base * 1.36, 10);
  });

  it("refreshes held stacks and expires one exactly at 180 ticks, then another each nine ticks", () => {
    const world = arena();
    launch(world, 6);
    const last = world.tick;
    expect(stacks(world).map(row => row.endTick - last)).toEqual([180, 189, 198, 207, 216, 225]);
    world.tick = last + 179;
    step(world, [idle, idle]);
    expect(stacks(world)).toHaveLength(6);
    for (let i = 0; i < 6; i++) {
      world.tick = last + 180 + i * 9;
      step(world, [idle, idle]);
      expect(stacks(world)).toHaveLength(5 - i);
    }
    launch(world, 2);
    const before = world.tick;
    world.tick = before + 170;
    launch(world);
    expect(stacks(world)).toHaveLength(2);
    expect(stacks(world)[0]?.endTick).toBe(world.tick + 180);
  });

  it("expires a stack before deciding whether the next attack gets a bolt", () => {
    const world = arena();
    launch(world, 6);
    const until = stacks(world)[0]!.endTick;
    startAttack(world, world.units[0]);
    world.tick = until;
    launchAttack(world, world.units[0]);
    expect(stacks(world)).toHaveLength(6);
    expect(bolts(world)).toHaveLength(0);
  });

  it("resizes held stacks immediately on form change and preserves an independent branch", () => {
    const melee: FighterSpec = { ...fighter(), adaptiveType: "Physical", form: "melee" };
    const ranged: FighterSpec = { ...melee, attack: RANGED, form: "ranged" };
    const forms = { melee, ranged };
    melee.forms = forms;
    ranged.forms = forms;
    const world = arena(melee);
    launch(world, 3);
    const copy = cloneWorld(world);
    const expiry = stacks(world).map(row => row.endTick);
    setForm(copy, copy.units[0], "ranged");
    expect(stacks(copy).map(row => row.endTick)).toEqual(expiry);
    expect(derive(copy.units[0]).bonusAttackSpeed).toBeCloseTo(3 * 0.048, 10);
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(3 * 0.06, 10);
    setForm(copy, copy.units[0], "melee");
    expect(derive(copy.units[0]).bonusAttackSpeed).toBeCloseTo(3 * 0.06, 10);
  });

  it("grants stacks from champion clones and leaves ordinary pets and classified clone bolts out", () => {
    const world = arena();
    const spec = { kind: "test", name: "Unit", hp: 5000, armor: 0, mr: 0, radius: 25, moveSpeed: 0, duration: Infinity };
    const pet = spawnPet(world, world.units[1], spec, 100);
    launch(world, 1, pet);
    expect(stacks(world)).toHaveLength(0);
    const clone = spawnPet(world, world.units[1], { ...spec, unitClass: "clone", targetClass: "champion" }, 125);
    launch(world, 7, clone);
    expect(stacks(world)).toHaveLength(6);
    expect(bolts(world)).toHaveLength(0);
  });

  it.each(["none", "self"] as const)("honors an ordinary windup scope of %s", scope => {
    const world = arena(fighter({ hooks: { onAttack(ctx) { ctx.action.onAttackEffects = scope; } } }));
    launch(world, 7);
    expect(stacks(world)).toHaveLength(scope === "self" ? 6 : 0);
    expect(bolts(world)).toHaveLength(0);
  });
});

describe("Lethal Tempo bolt flight and damage", () => {
  it("uses launch attack speed above the native cap and keeps the spell shield for later spells", () => {
    let incoming = 0, casts = 0;
    const enemy = fighter({ base: { hp: 20000, armor: 100, mr: 0 }, hooks: { onIncomingOnHit() { incoming++; } } });
    const world = arena(fighter({ attack: { ...RANGED, missileSpeed: 0 }, base: { ad: 0 }, bonus: { attackSpeed: 5, ap: 1 },
      hooks: { onAbilityHit() { casts++; } } }), enemy);
    world.units[1].x = 250;
    world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    launch(world, 7);
    const source = world.units[0], target = world.units[1];
    expect(derive(source).attackSpeed).toBeCloseTo(ATTACK_SPEED_CAP, 10);
    expect(packet(world).damageType).toBe("magic");
    const expected = base * 0.667 * 6.288;
    expect(packet(world).amount.base).toBeCloseTo(expected, 10);
    source.statuses.push(lasting("stat", "AD", 600));
    source.statuses.push(lasting("stat", "attackSpeed", 3));
    const before = target.totals.damageTaken, nativeHits = incoming;
    advance(world, 2);
    expect(target.totals.damageTaken).toBe(before);
    advance(world);
    expect(target.totals.damageTaken - before).toBeCloseTo(expected, 10);
    expect(target.statuses.some(status => status.key === "spellShield")).toBe(true);
    expect(incoming).toBe(nativeHits);
    expect(casts).toBe(0);
    expect(bolts(world)).toHaveLength(0);
  });

  it.each(["move", "stasis"] as const)("denies a fixed-endpoint bolt when the target uses %s before arrival", mode => {
    const world = arena();
    launch(world, 7);
    expect(bolts(world)).toHaveLength(1);
    const target = world.units[1], before = target.totals.damageTaken;
    if (mode === "move") target.x += 300;
    else target.statuses.push(lasting("state", "stasis"));
    advance(world, 5);
    expect(target.totals.damageTaken).toBe(before);
    expect(bolts(world)).toHaveLength(0);
  });

  it("follows a real projectile wall and keeps concurrent bolts distinct across a copied world", () => {
    const world = arena();
    launch(world, 6);
    for (let i = 0; i < 2; i++) launchBonusAttack(world, world.units[0], world.units[1], { onAttackScale: 1 });
    expect(bolts(world)).toHaveLength(2);
    const copy = cloneWorld(world);
    copy.zones.push({ id: copy.nextId++, owner: 1, x: 50, radius: 5, kind: "projectileWall",
      startTick: 0, seenTick: 0, endTick: 300 });
    const before = world.units[1].totals.damageTaken;
    advance(copy, 5);
    expect(copy.units[1].totals.damageTaken).toBe(before);
    expect(bolts(copy)).toHaveLength(0);
    expect(bolts(world)).toHaveLength(2);
    advance(world, 5);
    expect(world.units[1].totals.damageTaken - before).toBeCloseTo(2 * base * 1.36, 10);
  });

  it("uses the sourced adaptive tie and the victim's current resistance", () => {
    const owner = { ...fighter({ base: { ad: 0 } }), adaptiveType: "Magic" as const };
    const world = arena(owner, fighter({ base: { hp: 10000, armor: 0, mr: 100 } }));
    launch(world, 7);
    expect(packet(world).damageType).toBe("magic");
    advance(world, 2);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(base * 1.36 / 2, 10);
  });
});

describe("source-qualified contacts", () => {
  it("does not treat Fleet or PTA eligibility and bonus basics as ordinary on-attack events", () => {
    const world = arena();
    const source = world.units[0], target = world.units[1];
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 500 },
      flags: { appliesOnHit: true, fleetFootwork: true, pressTheAttack: true } });
    abilityHit(world, source, target, spell, [{ type: "damage", damageType: "true", amount: { base: 10 } }]);
    launchBonusAttack(world, source, target, { energizedOnHit: true });
    expect(stacks(world)).toHaveLength(0);
  });

  it("grants one full stack on a positive expected contact and scales the bolt by both damage factors", () => {
    const world = arena();
    const source = world.units[0], target = world.units[1];
    const effect = { type: "damage", damageType: "true", amount: { base: 10 } } as const;
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 500 },
      flags: { appliesOnHit: true, parry: true }, onHitScale: 0.9, onAttackScale: 0.5 });
    target.statuses.push(lasting("state", "blockAttacks"));
    abilityHit(world, source, target, spell, [effect]);
    target.statuses = [];
    abilityHit(world, source, target, spell, [effect], 0);
    expect(stacks(world)).toHaveLength(0);
    for (let i = 0; i < 6; i++) abilityHit(world, source, target, spell, [effect], 0.4);
    expect(stacks(world)).toHaveLength(6);
    expect(bolts(world)).toHaveLength(0);
    abilityHit(world, source, target, spell, [effect], 0.4);
    expect(bolts(world)[0]?.scale).toBeCloseTo(0.2, 10);
    expect(packet(world).amount.base).toBeCloseTo(base * 1.36, 10);
  });

  it("keeps an explicitly ordinary secondary basic distinct from a normal hit", () => {
    const world = arena();
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(stacks(world)).toHaveLength(0);
    launchBonusAttack(world, world.units[0], world.units[1], { onAttackScale: 1 });
    expect(stacks(world)).toHaveLength(1);
  });

  it.each([false, true])("counts Zeri's first accepted primary round once with opener denied=%s", denied => {
    const zeri = kit("Zeri").spec;
    const onAttackAvoided: KitHooks["onAttackAvoided"] = ctx => {
      ctx.self.statuses = ctx.self.statuses.filter(status => status.key !== "dodgeAttacks");
    };
    const world = arena(zeri, fighter({ base: { hp: 20000 }, hooks: { onAttackAvoided } }));
    world.units[1].x = 350;
    const q = zeri.abilities.find(ability => ability.key === "Q")!;
    if (denied) world.units[1].statuses.push(lasting("state", "dodgeAttacks"));
    startCast(world, world.units[0], q, { direction: 1 });
    for (let i = 0; i < 36; i++) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(stacks(world)).toHaveLength(1);
    launch(world);
    expect(stacks(world)).toHaveLength(1);
  });

  it("builds stacks with Azir's soldier commands and saves the bolt for a personal attack", () => {
    const world = arena(kit("Azir").spec);
    world.units[1].x = 400;
    const self = world.units[0];
    step(world, [idle, idle]);
    startCast(world, self, self.spec.abilities.find(ability => ability.key === "W")!);
    for (let i = 0; i < 16; i++) step(world, [idle, idle]);
    expect(world.pets.length).toBeGreaterThan(0);
    launch(world, 7);
    expect(stacks(world)).toHaveLength(6);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(bolts(world)).toHaveLength(0);
    world.pets = [];
    launch(world);
    expect(packet(world).damageType).toMatch(/physical|magic/);
  });

  it("uses Urgot's real 50% on-attack damage scale while granting each shot one stack", () => {
    const world = arena(kit("Urgot").spec);
    for (let i = 0; i < 100 && bolts(world).length === 0; i++) step(world, [idle, idle]);
    expect(stacks(world)).toHaveLength(6);
    expect(bolts(world)).toHaveLength(1);
    expect(bolts(world)[0]?.scale).toBe(0.5);
  });
});
