import { describe, expect, it } from "vitest";
import { mitigate } from "../../engine/rules/damage";
import { abilityHit, applyCC, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { createWorld } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";
import { lasting } from "./helpers";

function world(a: FighterSpec = fighter(), b: FighterSpec = fighter()) {
  return createWorld({ fighters: [a, b], distance: 0, modes: ["idle", "idle"] });
}

const strike = (extra: Partial<AbilitySpec> = {}) => ability({
  key: "Q",
  delivery: { kind: "target", range: 500 },
  onHit: [{ type: "damage", damageType: "physical", amount: { base: 200 } }],
  ...extra,
});

describe("damage accuracy against documented mechanics", () => {
  it("ignores damage reductions for true damage while retaining amplifiers", () => {
    // Wiki "True damage" rev 4052642: reductions are ignored; amplifiers apply since V25.S1.3.
    expect(mitigate(100, "true", 500, { dealt: [-0.4], received: [0.5], flatReduction: 200 })).toBe(100);
    expect(mitigate(100, "true", 500, { dealt: [0.1, -0.4], received: [0.5, -0.2] })).toBeCloseTo(132, 10);
    expect(mitigate(100, "physical", 100, { received: [0.5] })).toBe(25);
  });

  it("still applies shields and explicit invulnerability to true damage", () => {
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "damageReduction", 0.5), lasting("shield", "shield", 40));
    expect(dealDamage(w, a, b, 100, "true")).toBe(60);
    expect(b.totals.absorbed).toBe(40);
    b.statuses.push(lasting("state", "invulnerable"));
    expect(dealDamage(w, a, b, 100, "true")).toBe(0);
  });

  it("heals from post-mitigation attack damage absorbed by shields", () => {
    // Wiki "Life steal" rev 4060425 defines healing by post-mitigation damage, rather than HP loss.
    const w = world();
    const [a, b] = w.units;
    a.hp = 1000;
    a.statuses.push(lasting("stat", "lifeSteal", 0.2));
    b.statuses.push(lasting("shield", "shield", 100));
    expect(dealDamage(w, a, b, 200, "physical", { attack: true })).toBe(0);
    expect(a.hp).toBe(1020);
    expect(b.hp).toBe(2000);
    expect(a.totals.damageDealt).toBe(0);
    expect(b.totals.absorbed).toBe(100);
  });

  it("retains no-life-steal exceptions and applies Grievous Wounds to vamp", () => {
    const w = world();
    const [a, b] = w.units;
    a.hp = 1000;
    a.statuses.push(lasting("stat", "lifeSteal", 0.2), lasting("grievousWounds", "grievousWounds"));
    dealDamage(w, a, b, 100, "true", { attack: true, noLifeSteal: true });
    expect(a.hp).toBe(1000);
    dealDamage(w, a, b, 100, "true", { lifesteal: 0.5 });
    expect(a.hp).toBe(1030);
  });

  it("lets explicitly eligible basic-damage spells apply life steal", () => {
    const w = world();
    const [a, b] = w.units;
    a.hp = 1000;
    a.statuses.push(lasting("stat", "lifeSteal", 0.2));
    const hit = strike({ flags: { appliesLifeSteal: true } });
    abilityHit(w, a, b, hit, hit.onHit!);
    expect(a.hp).toBe(1020);
    const spell = strike();
    abilityHit(w, a, b, spell, spell.onHit!);
    expect(a.hp).toBe(1020);
  });

  it("scales attached on-hit damage with expected-value hits and ability-specific scaling", () => {
    const w = world(fighter({ attack: { onHit: [{ type: "damage", damageType: "true", amount: { base: 80 } }] } }));
    const [a, b] = w.units;
    const hit = strike({ flags: { appliesOnHit: true }, onHitScale: 0.5 });
    abilityHit(w, a, b, hit, hit.onHit!, 0.5);
    // Main physical hit: 200 / 2 armor * .5. Attached true hit: 80 * .5 expected * .5 Purge scaling.
    expect(b.hp).toBe(1930);
  });

  it("marks periodic direct damage as persistent without waking sleep", () => {
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("cc", "sleep"));
    applyEffect(w, a, b, { type: "damage", damageType: "true", amount: { base: 100 }, persistent: true }, { scale: 1 });
    expect(b.statuses.some((s) => s.key === "sleep")).toBe(true);
    dealDamage(w, a, b, 100, "true");
    expect(b.statuses.some((s) => s.key === "sleep")).toBe(false);
  });
});

describe("Riposte ordering from committed Fiora ability notes", () => {
  it("negates before spell shields, spends shields, permits vamp, and reports empowerment without an instant stun", () => {
    const w = world(fighter(), fighter({ hooks: {
      onParry(ctx) { ctx.memory.empowered = ctx.immobilizing; },
      onDamageTaken(ctx) { ctx.memory.empoweredWhenDamaged = ctx.memory.empowered === true; },
    } }));
    const [a, b] = w.units;
    a.hp = 1000;
    a.statuses.push(lasting("stat", "lifeSteal", 0.2));
    b.statuses.push(lasting("state", "parry"), lasting("state", "spellShield", 0, { charges: 1 }), lasting("shield", "shield", 100));
    const hit = strike({ flags: { appliesLifeSteal: true }, onHit: [
      { type: "damage", damageType: "physical", amount: { base: 200 } },
      { type: "cc", cc: "stun", duration: 2 },
    ] });
    abilityHit(w, a, b, hit, hit.onHit!);
    expect(b.hp).toBe(2000);
    expect(a.hp).toBe(1020);
    expect(b.totals.absorbed).toBe(100);
    expect(b.statuses.find((s) => s.key === "spellShield")?.charges).toBe(1);
    expect(b.memory.empowered).toBe(true);
    expect(b.memory.empoweredWhenDamaged).toBe(true);
    expect(a.statuses.some((s) => s.key === "stun")).toBe(false);
    expect(b.statuses.some((s) => s.kind === "cc")).toBe(false);
  });

  it("does not empower the shock when independent crowd-control immunity already answers the immobilize", () => {
    const w = world(fighter(), fighter({ hooks: { onParry(ctx) { ctx.memory.empowered = ctx.immobilizing; } } }));
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "parry"), lasting("state", "ccImmune"));
    const hit = strike({ onHit: [{ type: "cc", cc: "stun", duration: 2 }] });
    abilityHit(w, a, b, hit, hit.onHit!);
    expect(b.memory.empowered).toBe(false);
  });

  it("processes attack shields and life steal before parrying attack health damage and on-hit debuffs", () => {
    const w = world();
    const [a, b] = w.units;
    a.hp = 1000;
    a.statuses.push(lasting("stat", "lifeSteal", 0.2));
    b.statuses.push(lasting("state", "parry"), lasting("shield", "shield", 100));
    attackHit(w, a, b, false, [
      { type: "damage", damageType: "physical", amount: { base: 50 } },
      { type: "cc", cc: "stun", duration: 1 },
    ]);
    expect(b.hp).toBe(2000);
    expect(b.statuses.find((s) => s.kind === "shield")?.value).toBe(25);
    expect(a.hp).toBe(1015);
    expect(b.statuses.some((s) => s.kind === "cc")).toBe(false);
  });

  it("also negates health damage from persistent effects already running", () => {
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "parry"));
    expect(dealDamage(w, a, b, 100, "true", { persistent: true })).toBe(0);
    expect(b.hp).toBe(2000);
  });
});

describe("attack-like abilities and crowd-control attribution", () => {
  it.each(["connect", "blind", "dodgeAttacks", "blockAttacks", "parry"])("reports attack resolution after %s", (defense) => {
    const w = world(fighter({ hooks: { onAttackResolved(ctx) { ctx.memory.resolvedHp = ctx.enemy.hp; } } }));
    const [a, b] = w.units;
    if (defense !== "connect" && defense !== "blind") b.statuses.push(lasting("state", defense));
    attackHit(w, a, b, defense === "blind", []);
    expect(a.memory.resolvedHp).toBe(defense === "connect" ? 1950 : 2000);
  });

  it("does not resolve an attack after its target vanishes", () => {
    const w = world(fighter({ hooks: { onAttackResolved(ctx) { ctx.memory.resolved = true; } } }));
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "untargetable"));
    attackHit(w, a, b, false, []);
    expect(a.memory.resolved).toBeUndefined();
  });

  it("notifies avoided-attack hooks for dodged on-hit abilities and applies no damage", () => {
    const w = world(fighter(), fighter({ hooks: { onAttackAvoided(ctx) { ctx.memory.avoided = Number(ctx.memory.avoided ?? 0) + 1; } } }));
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "dodgeAttacks"));
    const hit = strike({ flags: { parry: true, appliesOnHit: true } });
    abilityHit(w, a, b, hit, hit.onHit!);
    expect(b.hp).toBe(2000);
    expect(b.memory.avoided).toBe(1);
  });

  it("blocks attack-like damage while allowing its other on-hit effects", () => {
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "blockAttacks"));
    const hit = strike({ flags: { parry: true }, onHit: [
      { type: "damage", damageType: "physical", amount: { base: 200 } },
      { type: "cc", cc: "slow", duration: 2, strength: 0.3 },
    ] });
    abilityHit(w, a, b, hit, hit.onHit!);
    expect(b.hp).toBe(2000);
    expect(b.statuses.find((s) => s.key === "slow")?.ability).toBe("Q");
  });

  it("spell-shields only explicitly shieldable on-hit crowd control, preserving attack damage", () => {
    // Garen Decisive Strike's committed notes: "Spell shield will only negate the silence."
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    attackHit(w, a, b, false, [
      { type: "damage", damageType: "physical", amount: { base: 100 } },
      { type: "cc", cc: "silence", duration: 1.5, spellShield: true },
    ]);
    expect(b.hp).toBe(1900);
    expect(b.statuses.some((s) => s.key === "silence" || s.key === "spellShield")).toBe(false);
  });

  it("reports connected blocked attacks so kits can distinguish effects that still trigger", () => {
    const w = world(fighter({ hooks: { onAttackHit(ctx) { ctx.memory.blocked = ctx.blocked; } } }));
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "blockAttacks"));
    attackHit(w, a, b, false, []);
    expect(a.memory.blocked).toBe(true);
    expect(b.hp).toBe(2000);
  });

  it("distinguishes slow immunity from cripple immunity and preserves sleep", () => {
    const w = world();
    const [a, b] = w.units;
    b.statuses.push(lasting("state", "slowImmune"));
    expect(applyCC(w, a, b, "slow", 2, 0.5)).toBe(false);
    expect(applyCC(w, a, b, "drowsy", 2, 0.5)).toBe(false);
    expect(applyCC(w, a, b, "cripple", 2, 0.5, false, "E")).toBe(true);
    expect(applyCC(w, a, b, "sleep", 2)).toBe(true);
    expect(b.statuses.find((s) => s.key === "cripple")?.ability).toBe("E");
  });
});
