import { describe, expect, it } from "vitest";
import { abilityHit, applyEffect, attackHit, consumeSpellShield } from "../../engine/sim/combat";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { Effect } from "../../engine/sim/spec";
import type { Status, World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

const damage: Effect = { type: "damage", damageType: "true", amount: { base: 100 } };
const shot = ability({ key: "Q", delivery: { kind: "target", range: 1000 }, onHit: [damage] });
function setup(charges = 1) {
  const calls: Array<{ source: number; pet?: number; ability?: string; remaining: number; removed: boolean; shield: string | undefined }> = [];
  const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter({ hooks: {
    onSpellShieldBlock(ctx) { calls.push({ source: ctx.source.side, pet: ctx.source.petId, ability: ctx.ability?.key,
      remaining: ctx.shield.charges!, removed: !ctx.self.statuses.includes(ctx.shield), shield: ctx.shield.ability }); },
  } })], modes: ["idle", "idle"], distance: 100 });
  shield(world.units[1].statuses, charges);
  return { world, calls, caster: world.units[0], target: world.units[1] };
}
function shield(statuses: Status[], charges = 1) {
  statuses.push({ kind: "state", key: "spellShield", source: 1, startTick: 0, endTick: 100, value: 0, charges, ability: "E" });
}
function pet(world: World, owner: 0 | 1 = 0) {
  return spawnPet(world, world.units[owner], { kind: "test", name: "Spell pet", hp: 500, armor: 0, mr: 0,
    radius: 20, moveSpeed: 0, duration: 10 }, 50);
}

describe("successful spell shield consumption callbacks", () => {
  it("reports one ability packet after consumption, with the shield identity and actual attacker", () => {
    const { world, caster, target, calls } = setup();
    abilityHit(world, caster, target, shot, [damage, { type: "cc", cc: "root", duration: 1 }]);
    expect(calls).toEqual([{ source: 0, pet: undefined, ability: "Q", remaining: 0, removed: true, shield: "E" }]);
    expect(target.totals.damageTaken).toBe(0);
    abilityHit(world, caster, target, shot, [damage]);
    expect(calls).toHaveLength(1);
    expect(target.totals.damageTaken).toBe(100);
  });

  it("reports each consumed charge of a multi-charge shield without reporting ordinary expiration", () => {
    const { world, caster, target, calls } = setup(2);
    abilityHit(world, caster, target, shot, [damage]);
    abilityHit(world, caster, target, shot, [damage]);
    expect(calls.map(({ remaining, removed }) => ({ remaining, removed }))).toEqual([
      { remaining: 1, removed: false }, { remaining: 0, removed: true },
    ]);
    shield(target.statuses); target.statuses = [];
    expect(calls).toHaveLength(2);
  });

  it("reports a separately spell-shieldable delayed crowd-control application", () => {
    const { world, caster, target, calls } = setup();
    applyEffect(world, caster, target, { type: "cc", cc: "silence", duration: 1, spellShield: true }, { ability: shot, scale: 1 });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.ability).toBe("Q");
    expect(target.statuses.some((status) => status.kind === "cc")).toBe(false);
  });

  it.each(["spellShield", "spellShieldOnHit"] as const)("reports an empowered attack's %s consumption once", (option) => {
    const { world, caster, target, calls } = setup();
    attackHit(world, caster, target, false, [damage], undefined, false, { [option]: true });
    expect(calls).toHaveLength(1);
    expect(calls[0]?.ability).toBeUndefined();
    expect(target.totals.damageTaken).toBe(option === "spellShield" ? 0 : 50);
  });

  it.each(["parry", "untargetable"] as const)("does not consume or report when %s prevents an incoming ability", (state) => {
    const { world, caster, target, calls } = setup();
    target.statuses.push({ kind: "state", key: state, source: 1, value: 0, startTick: 0, endTick: 100 });
    abilityHit(world, caster, target, shot, [damage]);
    expect(calls).toHaveLength(0);
    expect(target.statuses.some((status) => status.key === "spellShield")).toBe(true);
  });

  it.each(["blind", "dodge", "parry"] as const)("does not consume or report an empowered attack denied by %s", (defense) => {
    const { world, caster, target, calls } = setup();
    if (defense !== "blind") target.statuses.push({ kind: "state", key: defense === "dodge" ? "dodgeAttacks" : "parry", source: 1, value: 0, startTick: 0, endTick: 100 });
    attackHit(world, caster, target, defense === "blind", [damage], undefined, false, { spellShield: true });
    expect(calls).toHaveLength(0);
    expect(target.statuses.some((status) => status.key === "spellShield")).toBe(true);
  });

  it("ignores an ordinary basic attack and an explicitly unshieldable ability", () => {
    const { world, caster, target, calls } = setup();
    attackHit(world, caster, target, false, []);
    abilityHit(world, caster, target, { ...shot, flags: { spellShield: false } }, [damage]);
    expect(calls).toHaveLength(0);
    expect(target.statuses.some((status) => status.key === "spellShield")).toBe(true);
    expect(target.totals.damageTaken).toBe(150);
  });

  it("reports an actual hostile pet source without attributing the packet to its owner's champion", () => {
    const { world, target, calls } = setup();
    const attacker = pet(world);
    expect(petCombatHit(world, attacker, target, [damage], false)).toBe(false);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.pet).toBe(attacker.id);
    expect(target.totals.damageTaken).toBe(0);
  });

  it("never invokes a champion owner's hook for its pet or for a same-side formula proxy", () => {
    const { world, caster, target, calls } = setup();
    const victim = pet(world, 1), proxy = petFormulaTarget(victim, caster, world.tick);
    proxy.spec.hooks = target.spec.hooks;
    shield(proxy.statuses);
    abilityHit(world, caster, proxy, shot, [damage]);
    expect(calls).toHaveLength(0);
    expect(target.statuses.some((status) => status.key === "spellShield")).toBe(true);
    const clone = { ...target, statuses: [...target.statuses] };
    consumeSpellShield(world, caster, clone, shot);
    expect(calls).toHaveLength(0);
  });

  it("does not report a same-side packet as a hostile block", () => {
    const { world, target, calls } = setup();
    expect(consumeSpellShield(world, target, target, shot)).toBe(true);
    expect(calls).toHaveLength(0);
  });
});
