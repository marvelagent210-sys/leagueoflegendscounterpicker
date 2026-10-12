import { describe, expect, it } from "vitest";
import { damagePet, petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { defaultBehavior } from "../../engine/sim/behavior";
import type { PetSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { castWhenReady, idle, lasting, standStill, ticksOf } from "./helpers";
import { ability, fighter, RANGED } from "./kits";

const turret = (overrides: Partial<PetSpec> = {}): PetSpec => ({
  kind: "turret",
  name: "Turret",
  hp: 500,
  armor: 0,
  mr: 0,
  radius: 35,
  moveSpeed: 0,
  duration: Number.POSITIVE_INFINITY,
  // 10 true damage plus 10% of its owner's AP, once a second.
  attack: { range: 500, interval: 1, attackLike: false, effects: [{ type: "damage", damageType: "true", amount: { base: 10, ratios: { AP: 0.1 } }, label: "Turret" }] },
  ...overrides,
});

function world(distance: number, log = false): World {
  return createWorld({ fighters: [fighter({ bonus: { ap: 100 } }), fighter()], distance, modes: ["idle", "fight"], settings: { log } });
}

describe("pets", () => {
  it("attack the enemy in reach on their interval, with their owner's stats", () => {
    const w = world(300);
    const [owner, enemy] = w.units;
    spawnPet(w, owner, turret(), owner.x);
    for (let i = 0; i < 61; i++) step(w, [idle, standStill]);
    // Attacks at 0, 1 and 2 s: 20 each.
    expect(2000 - enemy.hp).toBe(60);
  });

  it("walk toward the enemy when they move", () => {
    const w = world(1000);
    const [owner, enemy] = w.units;
    const walker = spawnPet(w, owner, turret({ moveSpeed: 300, attack: { range: 100, interval: 1, attackLike: true, effects: [{ type: "damage", damageType: "true", amount: { base: 5 } }] } }), owner.x);
    for (let i = 0; i < 150; i++) step(w, [idle, standStill]);
    expect(Math.abs(enemy.x - walker.x) - enemy.spec.base.radius).toBeCloseTo(100, 6);
    expect(enemy.hp).toBeLessThan(2000);
  });

  it("are dodged like attacks or blocked like abilities", () => {
    const w = world(300);
    const [owner, enemy] = w.units;
    const pet = spawnPet(w, owner, turret(), owner.x);
    const hit = [{ type: "damage" as const, damageType: "true" as const, amount: { base: 100 } }];
    enemy.statuses.push(lasting("state", "dodgeAttacks"));
    expect(petHit(w, pet, enemy, hit, true)).toBe(false);
    expect(petHit(w, pet, enemy, hit, false)).toBe(true);
    enemy.statuses = [lasting("state", "spellShield")];
    expect(petHit(w, pet, enemy, hit, false)).toBe(false);
    expect(petHit(w, pet, enemy, hit, true)).toBe(true);
    expect(enemy.hp).toBe(1800);
  });

  it("are attacked by the enemy when their owner is out of its reach, melee attacks hitting harder", () => {
    const w = world(800, true);
    const owner = w.units[0];
    // A turret 650 units in front of its owner, next to the enemy, out of the enemy's way.
    const pet = spawnPet(w, owner, turret({ hp: 150, meleeAttackTaken: 1.5, attack: undefined }), owner.x + 650);
    for (let i = 0; i < 90; i++) step(w, [idle, defaultBehavior]);
    // 100 AD against 0 armor, 150% from a melee attack: one hit destroys it.
    expect(w.pets).not.toContain(pet);
    expect(ticksOf(w.log, 1, "hits Turret for 150, destroying it").length).toBe(1);
  });

  it("count hits when they have hit points, and tell their owner when destroyed", () => {
    let destroyed = 0;
    const owner = fighter({ hooks: { onPetDeath: () => void destroyed++ } });
    const w = createWorld({ fighters: [owner, fighter({ attack: RANGED })], distance: 1200, modes: ["idle", "fight"] });
    spawnPet(w, w.units[0], turret({ hp: 2, hitPoints: true, attack: undefined }), w.units[1].x - 400);
    for (let i = 0; i < 150; i++) step(w, [idle, defaultBehavior]);
    expect(w.pets.length).toBe(0);
    expect(destroyed).toBe(1);
  });

  it("are attacked first when urgent", () => {
    const w = world(0);
    const owner = w.units[0];
    const keg = spawnPet(w, owner, turret({ hp: 1, hitPoints: true, attack: undefined, urgent: () => true }), owner.x + 100);
    step(w, [idle, defaultBehavior]);
    expect(w.units[1].action?.kind === "windup" && w.units[1].action.pet).toBe(keg.id);
  });

  it("tell their spec what each hit dealt, before and after resistances (Test of Spirit's echo)", () => {
    const w = world(300);
    const [owner, enemy] = w.units;
    const hits: Array<{ raw: number; dealt: number; before: number; attack: boolean }> = [];
    const pet = spawnPet(w, owner, turret({ armor: 100, onDamaged: ({ raw, dealt, before, attack }) => hits.push({ raw, dealt, before, attack }) }), owner.x);
    damagePet(w, enemy, pet, 200, "physical", false);
    damagePet(w, enemy, pet, 1000, "physical", true);
    // Halved by 100 armor; the second hit finishes it, its health already at 0 or less.
    expect(hits).toEqual([
      { raw: 200, dealt: 100, before: 500, attack: false },
      { raw: 1000, dealt: 500, before: 400, attack: true },
    ]);
    expect(w.pets).toHaveLength(0);
  });

  it("chase no farther than their leash from their owner, and walk back from beyond it", () => {
    const w = world(3000);
    const [owner, enemy] = w.units;
    const walker = spawnPet(w, owner, turret({ moveSpeed: 300, leash: 1000, attack: { range: 100, interval: 1, attackLike: true, effects: [{ type: "damage", damageType: "true", amount: { base: 5 } }] } }), owner.x);
    for (let i = 0; i < 150; i++) step(w, [idle, standStill]);
    // Held at 1000 units from its owner, the enemy out of its reach.
    expect(walker.x - owner.x).toBeCloseTo(1000, 6);
    expect(enemy.hp).toBe(2000);
    // Its owner steps back: it follows to within the leash, 10 units a tick.
    owner.x -= 200;
    step(w, [idle, standStill]);
    expect(walker.x - owner.x).toBeCloseTo(1190, 6);
    for (let i = 0; i < 30; i++) step(w, [idle, standStill]);
    expect(walker.x - owner.x).toBeCloseTo(1000, 6);
  });

  it("take area abilities' damage by their share, unless they count hits or stand outside", () => {
    const blast = ability({ key: "Q", cooldown: 100, delivery: { kind: "aura", radius: 300 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const w = createWorld({ fighters: [fighter({ abilities: [blast] }), fighter()], distance: 1000, modes: ["idle", "idle"] });
    const [caster, enemy] = w.units;
    const walker = spawnPet(w, enemy, turret({ areaTaken: 0.4 }), caster.x + 200);
    const keg = spawnPet(w, enemy, turret({ hitPoints: true, hp: 3 }), caster.x + 100);
    const far = spawnPet(w, enemy, turret(), caster.x + 600);
    const own = spawnPet(w, caster, turret(), caster.x + 50);
    for (let i = 0; i < 2; i++) step(w, [castWhenReady("Q"), standStill]);
    expect([walker.hp, keg.hp, far.hp, own.hp]).toEqual([500 - 40, 3, 500, 500]);
  });

  it("expire, and vanish with their owner", () => {
    const w = world(300);
    const [owner] = w.units;
    spawnPet(w, owner, turret({ duration: 1 }), owner.x);
    spawnPet(w, owner, turret(), owner.x);
    for (let i = 0; i < 31; i++) step(w, [idle, standStill]);
    expect(w.pets.length).toBe(1);
    owner.alive = false;
    step(w, [idle, standStill]);
    expect(w.pets.length).toBe(0);
  });
});
