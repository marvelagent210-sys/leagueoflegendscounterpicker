import { describe, expect, it } from "vitest";
import { startAttack } from "../../engine/sim/actions";
import { abilityHit, applyCC, applyEffect, attackHit, captureResolvedOnHit, dealDamage, notifyIncomingOnHit, notifyResolvedOnHit } from "../../engine/sim/combat";
import { baseFighter } from "../../engine/sim/fromChampion";
import { petAttackActor, petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { CombatActivitySnapshot, FighterSpec, KitHooks, PetSpec, ResolvedOnHitSnapshot } from "../../engine/sim/spec";
import { cloneWorld, newUnit, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import { championData } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { ability, fighter } from "./kits";

const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: Infinity };
const damage = (amount: number) => ({ type: "damage" as const, damageType: "true" as const, amount: { base: amount } });
const arena = (hooks?: KitHooks, enemyHooks?: KitHooks): World => createWorld({
  fighters: [fighter({ id: "source", base: { hp: 10000, armor: 0, mr: 0 }, hooks }), fighter({ id: "target", base: { hp: 10000, armor: 0, mr: 0 }, hooks: enemyHooks })],
  distance: 0, modes: ["idle", "idle"],
});
const basic = (world: World, options: Parameters<typeof attackHit>[7] = {}) => attackHit(world, world.units[0], world.units[1], false, [], undefined, false, options);

describe("native resolved on-hit observations", () => {
  it("observes an application once, independently of declarations and multiple damage packets", () => {
    const events: ResolvedOnHitSnapshot[] = [], order: string[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); order.push("resolved-on-hit"); }, onAttackHit() { order.push("attack-hit"); } }, {
      onIncomingOnHit() { order.push("incoming-on-hit"); },
    });
    startAttack(world, world.units[0]);
    expect(events).toHaveLength(0);
    world.units[0].action = undefined;
    world.units[0].spec.attack.onHit = [damage(7), damage(11)];
    attackHit(world, world.units[0], world.units[1], false, [damage(13)], { physical: 0.5, magic: 0.5 });
    expect(world.units[1].totals.damageTaken).toBe(131);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ tick: 0, sequence: 1, attack: true, blocked: false, scale: 1, incomingScale: 1, pressTheAttackEligible: true,
      source: { side: 0, fighterId: "source", kind: "champion" }, target: { side: 1, fighterId: "target", kind: "champion" } });
    expect(order).toEqual(["incoming-on-hit", "resolved-on-hit", "attack-hit"]);
  });

  it.each([false, true])("retains connected zero-damage and blocked hits (before damage: %s)", before => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    world.units[0].spec.base.ad = 0;
    world.units[0].spec.attack.onHitBeforeDamage = before;
    basic(world, { pressTheAttack: false });
    world.units[1].statuses.push(lasting("state", "blockAttacks"));
    basic(world);
    expect(events.map(event => [event.blocked, event.pressTheAttackEligible])).toEqual([[false, false], [true, true]]);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it.each(["blind", "dodgeAttacks", "parry", "spellShield", "stasis", "untargetable"])("denies %s contact", defense => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    if (defense !== "blind") world.units[1].statuses.push(lasting("state", defense));
    attackHit(world, world.units[0], world.units[1], defense === "blind", [], undefined, false, { spellShield: defense === "spellShield" });
    expect(events).toHaveLength(0);
    expect(world.combatEventSequence).toBeUndefined();
  });

  it("captures ability identity, flags and scale before on-hit effects and victim mutation", () => {
    const events: ResolvedOnHitSnapshot[] = [];
    const spell = ability({ key: "Q-real", name: "Untrusted display label", delivery: { kind: "target", range: 1000 },
      onHit: [{ type: "state", state: "ghosted", duration: 1 }], onHitScale: 0.5, flags: { appliesOnHit: true, pressTheAttack: true, spellShield: false } });
    const hooks = composeHooks({ onDamageDealt(ctx) {
      ctx.self.spec = { ...ctx.self.spec, id: "changed-source" };
      spell.key = "changed-key";
      spell.flags!.pressTheAttack = false;
    }, onResolvedOnHit(ctx) {
      expect(Object.isFrozen(ctx.onHit)).toBe(true);
      expect(Object.isFrozen(ctx.onHit.source)).toBe(true);
      expect(Object.isFrozen(ctx.onHit.ability!.flags)).toBe(true);
      expect(Reflect.set(ctx, "onHit", {})).toBe(false);
      expect(Reflect.set(ctx.onHit.ability!.flags, "pressTheAttack", false)).toBe(false);
      ctx.memory.kitMutation = true;
      events.push(ctx.onHit);
    } }, [{ onResolvedOnHit(ctx) { expect(ctx.memory.kitMutation).toBe(true); events.push(ctx.onHit); } }], [], false);
    const world = arena(hooks, { onIncomingOnHit(ctx) {
      ctx.self.spec = { ...ctx.self.spec, id: "changed-target", unitClass: "clone" };
      ctx.world.tick = 77;
    } });
    world.tick = 9;
    world.units[0].spec.attack.onHit = [damage(10)];
    abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!, 0.4);
    expect(events).toHaveLength(2);
    expect(events[0]).toBe(events[1]);
    expect(events[0]).toMatchObject({ tick: 9, attack: false, scale: 0.2, incomingScale: 0.4, pressTheAttackEligible: true,
      source: { fighterId: "source", kind: "champion" }, target: { fighterId: "target", kind: "champion" },
      ability: { key: "Q-real", name: "Untrusted display label", slot: "Q", flags: { appliesOnHit: true, pressTheAttack: true, spellShield: false }, onHitScale: 0.5 } });
  });

  it("requires explicit ability eligibility regardless of on-hit and basic-damage flags", () => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    for (const pressTheAttack of [undefined, false, true]) {
      const spell = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [damage(1)],
        flags: { appliesOnHit: true, basicDamage: true, ...(pressTheAttack !== undefined ? { pressTheAttack } : {}) } });
      abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!);
    }
    expect(events.map(event => event.pressTheAttackEligible)).toEqual([false, false, true]);
  });

  it.each(["parry", "spellShield", "dodgeAttacks"])("denies an ability on-hit through %s even when legacy damage/effects may resolve", defense => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [damage(1)],
      flags: { appliesOnHit: true, pressTheAttack: true, parry: true, dodgeKeepsEffects: true } });
    world.units[1].statuses.push(lasting("state", defense));
    abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!);
    expect(events).toHaveLength(0);
    expect(world.combatEventSequence).toBeUndefined();
  });

  it("counts explicit strikes separately while retaining the legacy attached-effect phase", () => {
    const events: ResolvedOnHitSnapshot[] = [], order: string[] = [];
    const world = arena({ onResolvedOnHit(ctx) {
      events.push(ctx.onHit); order.push("resolved");
      ctx.self.spec = { ...ctx.self.spec, id: "changed-by-first-strike-observer" };
      ctx.world.tick = 99;
    } }, { onIncomingOnHit() { order.push("incoming"); } });
    world.units[0].spec.attack.onHit = [damage(7)];
    basic(world, { onHitApplications: 3 });
    expect(world.units[1].totals.damageTaken).toBe(107);
    expect(events.map(event => event.sequence)).toEqual([1, 2, 3]);
    expect(events.every(event => event.tick === 0 && event.source.fighterId === "source")).toBe(true);
    expect(new Set(events).size).toBe(3);
    expect(order).toEqual(["incoming", "resolved", "resolved", "resolved"]);
  });

  it.each([0, -1, 1.5, NaN, Infinity, 33])("rejects malformed observed application count %s", count => {
    const world = arena({ onResolvedOnHit() {} });
    expect(() => basic(world, { onHitApplications: count })).toThrow("onHitApplications must be an integer from 1 to 32");
  });

  it("keeps no-observer math and gameplay IDs unchanged without allocating observer history", () => {
    const world = arena(), id = world.nextId;
    basic(world, { onHitApplications: Infinity });
    dealDamage(world, world.units[0], world.units[1], 0, "true");
    expect(world.units[1].totals.damageTaken).toBe(100);
    expect(world.nextId).toBe(id);
    expect(world.combatEventSequence).toBeUndefined();
  });

  it("distinguishes actual champion bodies, pet/clone contacts and detached views", () => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    const pet = spawnPet(world, world.units[1], petSpec, 50);
    const clone = spawnPet(world, world.units[1], { ...petSpec, targetClass: "champion", unitClass: "clone" }, 60);
    for (const target of [world.units[1], petFormulaTarget(pet, world.units[1]), petFormulaTarget(clone, world.units[1]), newUnit(fighter(), 1, 0, 1000, 0)]) {
      attackHit(world, world.units[0], target, false, []);
    }
    expect(events.map(event => event.target.kind)).toEqual(["champion", "pet", "clone", "other"]);
    expect(events[1]!.target.petId).toBe(pet.id);
    expect(events[2]!.target.petId).toBe(clone.id);
    const actor = petAttackActor(clone, world.units[1]);
    actor.spec.hooks = { onResolvedOnHit(ctx) { events.push(ctx.onHit); } };
    attackHit(world, actor, world.units[0], false, []);
    expect(events.at(-1)!.source).toMatchObject({ side: 1, kind: "clone", petId: clone.id });
  });

  it("offers capture/dispatch for guarded kit-owned applications without inventing damage", () => {
    const events: ResolvedOnHitSnapshot[] = [], order: string[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); order.push("resolved"); } }, { onIncomingOnHit() { order.push("incoming"); } });
    const hit = captureResolvedOnHit(world, world.units[0], world.units[1], { blocked: false, scale: 0.5 });
    notifyIncomingOnHit(world, world.units[1], undefined, world.units[0], 0.5);
    notifyResolvedOnHit(world, world.units[0], world.units[1], hit);
    expect(events).toEqual([hit]);
    expect(order).toEqual(["incoming", "resolved"]);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("copies branch-local sequence history independently and never consumes gameplay IDs", () => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    basic(world);
    const branch = cloneWorld(world), gameplayId = world.nextId;
    basic(world);
    basic(world);
    basic(branch);
    expect(events.map(event => event.sequence)).toEqual([1, 2, 3, 2]);
    expect(world.combatEventSequence).toBe(3);
    expect(branch.combatEventSequence).toBe(2);
    expect(events[1]).not.toBe(events[3]);
    expect(world.nextId).toBe(gameplayId);
    expect(branch.nextId).toBe(gameplayId);
  });

  it.each([-1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER])("rejects invalid or exhausted subscribed sequence %s", sequence => {
    const world = arena({ onResolvedOnHit() {} });
    world.combatEventSequence = sequence;
    expect(() => basic(world)).toThrow("combatEventSequence must be a nonnegative safe integer below Number.MAX_SAFE_INTEGER");
    const withoutObserver = arena();
    withoutObserver.combatEventSequence = sequence;
    expect(() => basic(withoutObserver)).not.toThrow();
    expect(withoutObserver.units[1].totals.damageTaken).toBe(100);
  });

  it("carries explicit strike metadata from empowerment through declaration and launch", () => {
    const events: ResolvedOnHitSnapshot[] = [];
    const world = arena({ onResolvedOnHit(ctx) { events.push(ctx.onHit); } });
    applyEffect(world, world.units[0], world.units[0], { type: "empower", attacks: 1, window: 5, onHit: [damage(7)], onHitApplications: 2 }, { scale: 1 });
    startAttack(world, world.units[0]);
    expect(world.units[0].action).toMatchObject({ kind: "windup", onHitApplications: 2 });
    while (events.length === 0 && world.tick < 40) step(world, [idle, idle]);
    expect(events).toHaveLength(2);
    expect(world.units[1].totals.damageTaken).toBe(107);
  });
});

describe("accepted native combat activity", () => {
  it("includes zero and fully damage-shielded packets after old callbacks, with immutable initial identities", () => {
    const events: CombatActivitySnapshot[] = [], order: string[] = [];
    const world = arena({ onDamageDealt(ctx) { order.push("dealt"); ctx.self.spec = { ...ctx.self.spec, id: "mutated" }; },
      onDamageObserved() { order.push("observed"); }, onCombatActivity(ctx) {
        expect(Object.isFrozen(ctx.combatActivity)).toBe(true);
        expect(Object.isFrozen(ctx.combatActivity.target)).toBe(true);
        expect(Reflect.set(ctx, "combatActivity", {})).toBe(false);
        events.push(ctx.combatActivity); order.push("activity");
      } }, { onDamageTaken() { order.push("taken"); } });
    world.tick = 13;
    dealDamage(world, world.units[0], world.units[1], 0, "magic", { ability: "Zero" });
    world.units[1].statuses.push(lasting("shield", "normal", 100));
    dealDamage(world, world.units[0], world.units[1], 25, "true", { attack: true });
    expect(order).toEqual(["activity", "taken", "dealt", "observed", "activity"]);
    expect(events[0]).toMatchObject({ tick: 13, kind: "damage", raw: 0, damageType: "magic", ability: "Zero", source: { fighterId: "source" } });
    expect(events[1]).toMatchObject({ raw: 25, attack: true, source: { fighterId: "source" } });
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it.each(["invulnerable", "stasis", "parry"])("excludes damage denied by native %s guard", defense => {
    const events: CombatActivitySnapshot[] = [];
    const world = arena({ onCombatActivity(ctx) { events.push(ctx.combatActivity); } });
    world.units[1].statuses.push(lasting("state", defense));
    dealDamage(world, world.units[0], world.units[1], 0, "true");
    dealDamage(world, world.units[0], world.units[1], 25, "true");
    expect(events).toHaveLength(0);
  });

  it("preserves zero-damage exclusion in the separate hit-count pet pipeline", () => {
    const events: CombatActivitySnapshot[] = [];
    const world = arena({ onCombatActivity(ctx) { events.push(ctx.combatActivity); } });
    const pet = spawnPet(world, world.units[1], { ...petSpec, hp: 3, hitPoints: true }, 50);
    dealDamage(world, world.units[0], petFormulaTarget(pet, world.units[1]), 0, "true", { attack: true });
    expect(pet.hp).toBe(3);
    expect(events).toHaveLength(0);
    expect(world.combatEventSequence).toBeUndefined();
  });

  it("includes accepted CC after legacy callbacks but excludes immunity, zero duration and spell-shield prevention", () => {
    const events: CombatActivitySnapshot[] = [], order: string[] = [];
    const world = arena({ onEnemyCCApplied() { order.push("enemy"); }, onCombatActivity(ctx) { order.push("activity"); events.push(ctx.combatActivity); } }, {
      onCCApplied(ctx) { order.push("target"); ctx.source.spec = { ...ctx.source.spec, id: "mutated" }; },
    });
    expect(applyCC(world, world.units[0], world.units[1], "stun", 1, 0, false, "Q")).toBe(true);
    expect(order).toEqual(["target", "enemy", "activity"]);
    expect(events[0]).toMatchObject({ kind: "cc", cc: "stun", ability: "Q", source: { fighterId: "source" } });
    world.units[1].statuses.push(lasting("state", "ccImmune"));
    expect(applyCC(world, world.units[0], world.units[1], "stun", 1)).toBe(false);
    world.units[1].statuses = [];
    expect(applyCC(world, world.units[0], world.units[1], "slow", 0)).toBe(false);
    world.units[1].statuses.push(lasting("state", "spellShield"));
    applyEffect(world, world.units[0], world.units[1], { type: "cc", cc: "silence", duration: 1, spellShield: true }, { scale: 1 });
    expect(events).toHaveLength(1);
  });

  it("excludes full spell-shielded abilities and misses while retaining incoming activity observers", () => {
    const events: CombatActivitySnapshot[] = [];
    const world = arena(undefined, { onCombatActivity(ctx) { events.push(ctx.combatActivity); } });
    const spell = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [damage(0), { type: "cc", cc: "stun", duration: 1 }] });
    world.units[1].statuses.push(lasting("state", "spellShield"));
    abilityHit(world, world.units[0], world.units[1], spell, spell.onHit!);
    attackHit(world, world.units[0], world.units[1], true, []);
    expect(events).toHaveLength(0);
    dealDamage(world, world.units[0], world.units[1], 0, "true");
    expect(events).toHaveLength(1);
    expect(events[0]!.target.kind).toBe("champion");
  });

  it("retains actual owned pet/clone source identity and leaves observer lifecycle policy to consumers", () => {
    const events: CombatActivitySnapshot[] = [];
    const world = arena({ onCombatActivity(ctx) { events.push(ctx.combatActivity); } });
    for (const unitClass of [undefined, "clone"] as const) {
      const pet = spawnPet(world, world.units[0], { ...petSpec, ...(unitClass ? { unitClass } : {}) }, 0);
      petCombatHit(world, pet, world.units[1], [damage(0)], false);
      petCombatHit(world, pet, world.units[1], [damage(1)], false);
    }
    expect(events.map(event => event.source.kind)).toEqual(["pet", "pet", "clone", "clone"]);
    expect(events.every(event => event.source.side === 0 && event.source.petId !== undefined && event.target.kind === "champion")).toBe(true);
    world.units[0].alive = false;
    world.units[0].hp = 0;
    dealDamage(world, world.units[1], world.units[1], 0, "true");
    expect(events).toHaveLength(4);
    const actor = petAttackActor(world.pets[0]!, world.units[0]);
    dealDamage(world, actor, world.units[1], 0, "true");
    expect(events).toHaveLength(5);
  });
});

describe("champion adaptive tie metadata", () => {
  it("copies the exact pinned preference to every form independently of shard memory", () => {
    for (const id of ["Jayce", "Nidalee"]) {
      const champion = championData(id);
      for (const form of champion.forms) expect(baseFighter(champion, form).adaptiveType).toBe(champion.adaptiveType);
    }
    const synthetic: FighterSpec = fighter();
    expect(synthetic.adaptiveType).toBeUndefined();
  });
});
