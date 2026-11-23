import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, dealDamage, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { petCombatHit } from "../../engine/sim/petCombat";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { KillCreditSnapshot, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, newUnit, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import { lasting } from "./helpers";
import { fighter } from "./kits";

const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: Infinity };

function arena(hooks?: KitHooks, enemyHooks?: KitHooks): World {
  return createWorld({
    fighters: [fighter({ base: { hp: 1000, armor: 0, mr: 0 }, hooks }), fighter({ base: { hp: 1000, armor: 0, mr: 0 }, hooks: enemyHooks })],
    distance: 100,
    modes: ["idle", "idle"],
  });
}

function kill(world: World): void {
  dealDamage(world, world.units[0], world.units[1], 2000, "true");
}

describe("native kill-credit event facts", () => {
  it("keeps pre-callback health, lifecycle and victim facts through composed mutations", () => {
    const seen: KillCreditSnapshot[] = [];
    const hooks = composeHooks({ onKill(ctx) {
      const credit = ctx.killCredit!;
      expect(Object.isFrozen(credit)).toBe(true);
      expect(Reflect.set(credit, "hp", 999)).toBe(false);
      expect(Reflect.set(ctx, "killCredit", { ...credit, hp: 999 })).toBe(false);
      expect(Reflect.deleteProperty(ctx, "killCredit")).toBe(false);
      expect(Object.getOwnPropertyDescriptor(ctx, "killCredit")).toMatchObject({ enumerable: true, writable: false, configurable: false });
      expect(Object.isFrozen(ctx)).toBe(false);
      ctx.memory.kitChanged = true;
      ctx.self.hp = 400;
      ctx.self.statuses.push(lasting("stat", "health", 85));
      ctx.self.alive = false;
      ctx.self.fallen = true;
      ctx.self.deathDefied = { endTick: 100 };
      ctx.self.resurrection = { endTick: 100 };
      ctx.self.deathNotified = true;
      ctx.victim.hp = 500;
    } }, [{ onKill(ctx) {
      expect(ctx.memory.kitChanged).toBe(true);
      expect(ctx.self.hp).toBe(400);
      expect(derive(ctx.self).maxHp).toBe(1085);
      seen.push(ctx.killCredit!);
      ctx.self.hp = 700;
    } }, { onKill(ctx) { seen.push(ctx.killCredit!); } }], [], false);
    const world = arena(hooks);
    world.tick = 17;
    world.units[0].hp = 200;
    kill(world);
    expect(seen).toHaveLength(2);
    expect(seen[0]).toBe(seen[1]);
    expect(seen[0]).toEqual({
      tick: 17, hp: 200, maxHp: 1000, missingHp: 800,
      alive: true, fallen: false, deathDefied: false, resurrecting: false, deathNotified: false,
      victimIsEnemyChampionBody: true,
    });
  });

  it("captures after the victim's lethal transition and before killing-packet life steal", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } }, { onLethal(ctx) {
      ctx.enemy.hp = 150;
      ctx.enemy.statuses.push(lasting("stat", "health", 50));
      return beginDeathDefied(ctx.world, ctx.self, { duration: 7 });
    } });
    world.units[0].hp = 200;
    world.units[0].statuses.push(lasting("stat", "lifeSteal", 0.5));
    world.units[1].hp = 50;
    dealDamage(world, world.units[0], world.units[1], 100, "true", { attack: true });
    expect(credits).toHaveLength(1);
    expect(credits[0]).toMatchObject({ hp: 150, maxHp: 1050, missingHp: 900, victimIsEnemyChampionBody: true });
    expect(world.units[0].hp).toBe(200);
    expect(world.units[1].hp).toBe(1);
    expect(world.units[1].fallen).toBe(true);
    expect(world.units[1].deathNotified).toBe(true);
  });

  it("emits no premature credit for protected resurrection, then counts the destroyed body once", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } }, {
      onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); },
    });
    kill(world);
    expect(credits).toHaveLength(0);
    expect(world.units[1].deathNotified).toBeUndefined();
    kill(world);
    kill(world);
    notifyKill(world, world.units[0], world.units[1]);
    expect(credits).toHaveLength(1);
    expect(credits[0]!.victimIsEnemyChampionBody).toBe(true);
  });

  it("distinguishes actual enemy bodies from champion-class pets and unrelated unit views", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } });
    const clone = spawnPet(world, world.units[1], { ...petSpec, targetClass: "champion" }, 50);
    damagePet(world, world.units[0], clone, 200, "true", false);
    notifyKill(world, world.units[0], clone);
    const detached = newUnit(fighter(), 1, 50, 1000, 0);
    detached.hp = 0;
    notifyKill(world, world.units[0], detached);
    kill(world);
    notifyKill(world, world.units[0], world.units[1]);
    expect(credits.map(credit => credit.victimIsEnemyChampionBody)).toEqual([false, false, true]);
  });

  it("does not classify a positive-health notification or a pet view as a dead champion body", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } });
    notifyKill(world, world.units[0], world.units[1]);
    const other = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } });
    other.units[1].petId = 99;
    other.units[1].hp = 0;
    notifyKill(other, other.units[0], other.units[1]);
    expect(credits.map(credit => credit.victimIsEnemyChampionBody)).toEqual([false, false]);
  });

  it("uses the champion owner's health for an actual owned-pet kill without changing death observers", () => {
    const credits: KillCreditSnapshot[] = [];
    const observedPets: Array<number | undefined> = [];
    const world = arena({
      onKill(ctx) { expect(ctx.self).toBe(ctx.world.units[0]); credits.push(ctx.killCredit!); },
      onDeathObserved(ctx) {
        expect("killCredit" in ctx).toBe(false);
        observedPets.push(ctx.source.petId);
      },
    });
    world.units[0].hp = 200;
    world.units[1].hp = 50;
    const pet = spawnPet(world, world.units[0], petSpec, 0);
    pet.hp = 20;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 100 } }], false);
    expect(credits).toHaveLength(1);
    expect(credits[0]).toMatchObject({ hp: 200, maxHp: 1000, missingHp: 800, victimIsEnemyChampionBody: true });
    expect(observedPets).toEqual([pet.id]);
  });

  it("retains pet damage metadata and excludes friendly kills from native notifications", () => {
    const events: Array<Parameters<NonNullable<KitHooks["onKill"]>>[0]> = [];
    const world = arena({ onKill(ctx) { events.push(ctx); } });
    const enemy = spawnPet(world, world.units[1], petSpec, 50);
    const own = spawnPet(world, world.units[0], petSpec, 0);
    damagePet(world, world.units[0], enemy, 200, "true", false, "Burn", "persistent");
    damagePet(world, world.units[0], own, 200, "true", false);
    notifyKill(world, world.units[0], world.units[0]);
    expect(events).toHaveLength(1);
    expect(events[0]!.pet).toBe(enemy);
    expect(events[0]!.damage).toEqual({ ability: "Burn", persistent: true });
    expect(events[0]!.killCredit!.victimIsEnemyChampionBody).toBe(false);
  });

  it("keeps nested native notifications independent while the outer composition resumes", () => {
    const seen: Array<{ pet: boolean; credit: KillCreditSnapshot }> = [];
    const hooks = composeHooks({ onKill(ctx) {
      if (ctx.pet) return;
      ctx.self.hp = 350;
      ctx.self.statuses.push(lasting("stat", "health", 100));
      damagePet(ctx.world, ctx.self, ctx.world.pets[0]!, 200, "true", false);
    } }, [{ onKill(ctx) { seen.push({ pet: ctx.pet !== undefined, credit: ctx.killCredit! }); } }], [], false);
    const world = arena(hooks);
    world.units[0].hp = 200;
    spawnPet(world, world.units[1], petSpec, 50);
    kill(world);
    expect(seen.map(event => event.pet)).toEqual([true, false]);
    expect(seen[0]!.credit).toMatchObject({ hp: 350, maxHp: 1100, missingHp: 750, victimIsEnemyChampionBody: false });
    expect(seen[1]!.credit).toMatchObject({ hp: 200, maxHp: 1000, missingHp: 800, victimIsEnemyChampionBody: true });
    expect(seen[0]!.credit).not.toBe(seen[1]!.credit);
  });

  it("creates independent facts and scalar history in branched worlds", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) {
      credits.push(ctx.killCredit!);
      ctx.memory.hpAtCredit = ctx.killCredit!.hp;
    } });
    world.units[0].hp = 200;
    const branch = cloneWorld(world);
    branch.units[0].hp = 400;
    branch.units[0].statuses.push(lasting("stat", "health", 100));
    branch.tick = 9;
    kill(world);
    kill(branch);
    expect(credits[0]).toMatchObject({ tick: 0, hp: 200, maxHp: 1000, missingHp: 800, victimIsEnemyChampionBody: true });
    expect(credits[1]).toMatchObject({ tick: 9, hp: 400, maxHp: 1100, missingHp: 700, victimIsEnemyChampionBody: true });
    expect(credits[0]).not.toBe(credits[1]);
    expect(world.units[0].memory.hpAtCredit).toBe(200);
    expect(branch.units[0].memory.hpAtCredit).toBe(400);
    const afterCredit = cloneWorld(world);
    afterCredit.units[0].memory.hpAtCredit = 1;
    expect(world.units[0].memory.hpAtCredit).toBe(200);
  });

  it("records a dead credited owner without silently changing native owner credit", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } });
    const owner = world.units[0];
    owner.hp = 0;
    owner.alive = false;
    owner.fallen = true;
    owner.deathDefied = { endTick: 100 };
    owner.deathNotified = true;
    world.units[1].hp = 50;
    const pet = spawnPet(world, owner, petSpec, 0);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 100 } }], false);
    expect(credits).toHaveLength(1);
    expect(credits[0]).toMatchObject({ hp: 0, alive: false, fallen: true, deathDefied: true, deathNotified: true, victimIsEnemyChampionBody: true });
    expect(owner.hp).toBe(0);
  });

  it("records positive-health attackable resurrection and does not reject stasis", () => {
    const credits: KillCreditSnapshot[] = [];
    const world = arena({ onKill(ctx) { credits.push(ctx.killCredit!); } });
    beginResurrection(world, world.units[0], { duration: 6 });
    world.units[0].hp = 200;
    world.units[0].statuses.push(lasting("state", "stasis"));
    kill(world);
    expect(credits).toHaveLength(1);
    expect(credits[0]).toMatchObject({ hp: 200, alive: true, fallen: false, deathDefied: false, resurrecting: true, deathNotified: false });
  });
});
