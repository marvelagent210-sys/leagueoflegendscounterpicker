import { describe, expect, it } from "vitest";
import { launchAttack, startAttack } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";
import { lasting } from "./helpers";

function world(a: FighterSpec = fighter(), b: FighterSpec = fighter()) {
  return createWorld({ fighters: [a, b], distance: 0, modes: ["idle", "idle"] });
}

const spell = ability({
  key: "Q", delivery: { kind: "target", range: 500 },
  flags: { parry: true, blockedByDisplacementImmunity: true },
});
const damage: Effect = { type: "damage", damageType: "true", amount: { base: 100 } };

describe("connected ability transaction hooks", () => {
  it.each([
    { state: "none", defense: "none", expected: ["contact:none", "before", "damage:100", "hit"] },
    { state: "parry", defense: "parry", expected: ["contact:parry", "parry", "damage:0"] },
    { state: "spellShield", defense: "spellShield", expected: ["contact:spellShield"] },
    { state: "dodgeAttacks", defense: "dodge", expected: ["contact:dodge"] },
    { state: "blockAttacks", defense: "block", expected: ["contact:block", "before", "hit"] },
    { state: "displacementImmune", defense: "immunity", expected: ["contact:immunity"] },
    { state: "untargetable", defense: "none", expected: [] },
  ])("orders contact, guards, before-hit and effects against $state", ({ state, expected }) => {
    const events: string[] = [];
    const w = world(fighter({ hooks: {
      onAbilityContact(ctx) {
        events.push(`contact:${ctx.defense ?? "none"}`);
        expect(ctx.effects).toEqual([damage]);
        expect(ctx.scale).toBe(1);
      },
      beforeAbilityHit() { events.push("before"); },
      onAbilityHit() { events.push("hit"); },
    } }), fighter({ hooks: {
      onParry() { events.push("parry"); },
      onDamageTaken(ctx) { events.push(`damage:${ctx.amount}`); },
    } }));
    if (state !== "none") w.units[1].statuses.push(lasting("state", state, 0, { charges: 1 }));
    abilityHit(w, w.units[0], w.units[1], spell, [damage]);
    expect(events).toEqual(expected);
  });

  it.each(["ccImmune", "ccNegate"])("aborts the remaining packet when required suppression fails under %s", (state) => {
    let contacts = 0;
    let hitHooks = 0;
    const w = world(fighter({ hooks: {
      onAbilityContact() { contacts += 1; },
      onAbilityHit() { hitHooks += 1; },
    } }));
    const [self, enemy] = w.units;
    enemy.statuses.push(lasting("state", state, 0, { charges: 1 }));
    const packet: Effect[] = [
      { type: "cc", cc: "suppression", duration: 1 },
      { type: "caster", effects: [{ type: "state", state: "invulnerable", duration: 1 }] },
      damage,
    ];
    abilityHit(w, self, enemy, { ...spell, flags: { requiresCC: "suppression" } }, packet);
    expect(contacts).toBe(1);
    expect(hitHooks).toBe(0);
    expect(enemy.hp).toBe(2000);
    expect(enemy.statuses.some((s) => s.key === "suppression")).toBe(false);
    expect(self.statuses.some((s) => s.key === "invulnerable")).toBe(false);
    if (state === "ccNegate") expect(enemy.statuses.some((s) => s.key === "ccNegate")).toBe(false);
  });

  it("applies the rest of a required-CC packet only after suppression takes hold", () => {
    const order: string[] = [];
    const w = world(fighter({ hooks: {
      beforeAbilityHit() { order.push("before"); },
      onDamageDealt(ctx) {
        expect(ctx.enemy.statuses.some((s) => s.key === "suppression")).toBe(true);
        order.push("damage");
      },
      onAbilityHit() { order.push("hit"); },
    } }));
    abilityHit(w, w.units[0], w.units[1], { ...spell, flags: { requiresCC: "suppression" } }, [
      { type: "cc", cc: "suppression", duration: 1 },
      { type: "caster", effects: [{ type: "state", state: "ccImmune", duration: 1 }] },
      damage,
    ]);
    expect(order).toEqual(["before", "damage", "hit"]);
    expect(w.units[0].statuses.some((s) => s.key === "ccImmune")).toBe(true);
    expect(w.units[1].hp).toBe(1900);
  });
});

describe("explicit empowered attack defenses", () => {
  it("captures whole-attack spell shielding and shield breaking, consuming one charge for the complete hit", () => {
    let hitHooks = 0;
    let resolutions = 0;
    const w = world(fighter({ hooks: {
      onAttackHit() { hitHooks += 1; },
      onAttackResolved() { resolutions += 1; },
    } }));
    const [self, enemy] = w.units;
    enemy.statuses.push(lasting("shield", "normal", 500), lasting("state", "spellShield", 0, { charges: 2 }));
    applyEffect(w, self, self, {
      type: "empower", attacks: 1, window: 4, spellShield: true, breakShields: true,
      onHit: [{ type: "damage", damageType: "physical", amount: { base: 100 } }, { type: "cc", cc: "stun", duration: 1 }],
    }, { ability: spell, scale: 1 });
    startAttack(w, self);
    expect(self.action).toMatchObject({ kind: "windup", spellShield: true, breakShields: true });
    w.tick = self.action!.kind === "windup" ? self.action!.launchTick : 0;
    launchAttack(w, self);
    expect(enemy.hp).toBe(2000);
    expect(enemy.statuses.some((s) => s.kind === "shield" || s.key === "stun")).toBe(false);
    expect(enemy.statuses.find((s) => s.key === "spellShield")?.charges).toBe(1);
    expect(enemy.totals.absorbed).toBe(0);
    expect(hitHooks).toBe(0);
    expect(resolutions).toBe(1);
    // An ordinary basic attack does not inherit the consumed empowerment's spell flag.
    attackHit(w, self, enemy, false, []);
    expect(enemy.hp).toBe(1950);
    expect(enemy.statuses.find((s) => s.key === "spellShield")?.charges).toBe(1);
  });

  it.each(["blind", "dodgeAttacks", "parry"])("checks %s before destructive shield breaking or spell-shield charges", (defense) => {
    const w = world();
    const [self, enemy] = w.units;
    enemy.statuses.push(
      lasting("shield", "normal", 1000),
      lasting("shield", "magic", 1000, { shieldType: "magic" }),
      lasting("shield", "physical", 1000, { shieldType: "physical" }),
      lasting("state", "spellShield", 0, { charges: 2 }),
    );
    if (defense !== "blind") enemy.statuses.push(lasting("state", defense));
    attackHit(w, self, enemy, defense === "blind", [{ type: "damage", damageType: "physical", amount: { base: 100 } }], undefined, false, { spellShield: true, breakShields: true });
    expect(enemy.hp).toBe(2000);
    expect(enemy.statuses.filter((s) => s.kind === "shield")).toHaveLength(3);
    expect(enemy.statuses.find((s) => s.key === "normal")?.value).toBe(defense === "parry" ? 900 : 1000);
    expect(enemy.statuses.find((s) => s.key === "spellShield")?.charges).toBe(2);
  });

  it("breaks all damage-shield types before a whole-attack spell shield stops damage", () => {
    const w = world();
    const [self, enemy] = w.units;
    enemy.statuses.push(
      lasting("shield", "normal", 100),
      lasting("shield", "magic", 100, { shieldType: "magic" }),
      lasting("shield", "physical", 100, { shieldType: "physical" }),
      lasting("state", "spellShield", 0, { charges: 1 }),
    );
    attackHit(w, self, enemy, false, [], undefined, false, { spellShield: true, breakShields: true });
    expect(enemy.hp).toBe(2000);
    expect(enemy.statuses.some((s) => s.kind === "shield" || s.key === "spellShield")).toBe(false);
    expect(enemy.totals.absorbed).toBe(0);
  });
});

describe("effect attribution and formula scope", () => {
  it("evaluates a combat callback once against pre-hit health, then resolves crit, mitigation, shields, floor, vamp and hooks once", () => {
    let evaluations = 0;
    let beforeDamage = 0;
    const received: Array<{ amount: number; mitigated: number; raw: number }> = [];
    const dealt: Array<{ amount: number; mitigated: number; raw: number }> = [];
    const w = world(fighter({ bonus: { critChance: 0.5 }, hooks: {
      onDamageDealt(ctx) { dealt.push({ amount: ctx.amount, mitigated: ctx.mitigated, raw: ctx.raw }); },
    } }), fighter({ hooks: {
      beforeDamageTaken(ctx) {
        beforeDamage += 1;
        expect(ctx.self.hp).toBe(60);
        expect(ctx.self.statuses.find((s) => s.kind === "shield")?.value).toBe(30);
        expect(ctx.amount).toBe(90);
      },
      onDamageTaken(ctx) { received.push({ amount: ctx.amount, mitigated: ctx.mitigated, raw: ctx.raw }); },
    } }));
    const [self, enemy] = w.units;
    self.hp = 1000;
    enemy.hp = 60;
    enemy.statuses.push(lasting("shield", "shield", 30), lasting("state", "minimumHealth", 20));
    applyEffect(w, self, enemy, {
      type: "damage", damageType: "physical", amount: { base: 9999 }, canCrit: true, lifesteal: 0.5,
      amountFor: (_caster, victim) => {
        evaluations += 1;
        expect(victim).toBe(enemy);
        expect(victim.hp).toBe(60);
        return victim.hp * 2;
      },
    }, { ability: spell, scale: 1 });
    expect(evaluations).toBe(1);
    expect(beforeDamage).toBe(1);
    // 120 raw * 1.5 average crit / 2 armor = 90; shield absorbs 30, floor limits HP loss to 40.
    expect(enemy.hp).toBe(20);
    expect(enemy.totals.absorbed).toBe(30);
    expect(enemy.totals.damageTaken).toBe(40);
    expect(self.totals.damageDealt).toBe(40);
    expect(self.hp).toBe(1045);
    expect(self.totals.healing).toBe(45);
    expect(received).toEqual([{ amount: 40, mitigated: 90, raw: 180 }]);
    expect(dealt).toEqual(received);
  });

  it("keeps the original victim's stats through nested caster effects", () => {
    const w = world(fighter({ base: { hp: 1000, resource: 1000 } }), fighter({ base: { hp: 4000 } }));
    const [self, enemy] = w.units;
    self.hp = 200;
    self.resource = 0;
    enemy.hp = 2000;
    applyEffect(w, self, enemy, { type: "caster", effects: [{ type: "caster", effects: [
      { type: "heal", amount: { base: 0, ratios: { targetMaxHP: 0.1 } } },
      { type: "stat", stat: "AD", amount: { base: 0, ratios: { targetMaxHP: 0.01 } }, duration: 2 },
      { type: "shield", amount: { base: 0, ratios: { targetMaxHP: 0.2 } }, duration: 2 },
      { type: "resource", amount: { base: 0, ratios: { targetCurrentHP: 0.1 } } },
    ] }] }, { scale: 1 });
    expect(self.hp).toBe(600);
    expect(derive(self).ad).toBe(140);
    expect(self.statuses.find((s) => s.kind === "shield")?.value).toBe(800);
    expect(self.resource).toBe(200);
    expect(enemy.hp).toBe(2000);
    expect(derive(enemy).ad).toBe(100);
  });

  it.each([
    { protection: undefined, override: 1, hp: 0 },
    { protection: 50, override: undefined, hp: 50 },
    { protection: 50, override: 1, hp: 1 },
    { protection: 50, override: 100, hp: 50 },
    { protection: 0, override: 1, hp: 0 },
  ])("only lowers an existing execute protection floor: $protection to $override", ({ protection, override, hp }) => {
    const w = world();
    const [self, enemy] = w.units;
    enemy.hp = 1000;
    if (protection !== undefined) enemy.statuses.push(lasting("state", "minimumHealth", protection));
    applyEffect(w, self, enemy, { type: "execute", threshold: { base: 1500 }, ...(override !== undefined ? { minimumHealthFloor: override } : {}) }, { scale: 1 });
    expect(enemy.hp).toBe(hp);
    expect(self.totals.damageDealt).toBe(1000 - hp);
    expect(enemy.totals.damageTaken).toBe(1000 - hp);
    expect(enemy.statuses.find((s) => s.key === "minimumHealth")?.value).toBe(protection);
  });

  it("reports persistent damage independently to source and target hooks without retaining the flag on later hits", () => {
    const dealt: Array<{ persistent: boolean; attack: boolean; ability?: string; amount: number }> = [];
    const taken: Array<{ persistent: boolean; amount: number }> = [];
    const w = world(fighter({ hooks: {
      onDamageDealt(ctx) { dealt.push({ persistent: ctx.persistent, attack: ctx.attack, ability: ctx.ability, amount: ctx.amount }); },
    } }), fighter({ hooks: {
      onDamageTaken(ctx) { taken.push({ persistent: ctx.persistent, amount: ctx.amount }); },
    } }));
    applyEffect(w, w.units[0], w.units[1], { ...damage, type: "damage", persistent: true, label: "periodic" }, { ability: spell, attack: true, scale: 1 });
    applyEffect(w, w.units[0], w.units[1], damage, { ability: spell, scale: 1 });
    expect(dealt).toEqual([
      { persistent: true, attack: true, ability: "periodic", amount: 100 },
      { persistent: false, attack: false, ability: "Q", amount: 100 },
    ]);
    expect(taken).toEqual([{ persistent: true, amount: 100 }, { persistent: false, amount: 100 }]);
  });
});
