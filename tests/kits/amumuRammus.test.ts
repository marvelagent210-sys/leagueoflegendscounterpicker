import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { advanceZones, canCast, completeCast, progressDash, releaseCooldowns, startCast } from "../../engine/sim/actions";
import { abilityHit, applyCC, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { defaultBehavior } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, StateType } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import amumuModule from "../../kits/champions/Amumu";
import rammusModule from "../../kits/champions/Rammus";
import { championData, pets, records, runes } from "./helpers";

const compiled = (module: typeof amumuModule) => compileKit(championData(module.champion), records(module.champion), module, {}, pets(module.champion), runes());
const amumu = compiled(amumuModule);
const rammus = compiled(rammusModule);
const target: FighterSpec = {
  ...amumu.spec, id: "Target", name: "Target", hooks: undefined, abilities: [], bonus: {},
  attack: { ...amumu.spec.attack, onHit: [] },
  base: { ...amumu.spec.base, hp: 100000, hpRegen: 0, resourceRegen: 0, armor: 0, mr: 0, ad: 100 },
};
const worldFor = (fighter: FighterSpec, distance = 0, enemy: FighterSpec = target) => createWorld({ fighters: [fighter, enemy], distance, modes: ["idle", "idle"], settings: { log: true } });
const ability = (world: World, key: string) => {
  const found = world.units[0].spec.abilities.find((a) => a.key === key);
  if (!found) throw new Error(key);
  return found;
};
const cast = (world: World, key: string) => {
  const a = ability(world, key);
  const self = world.units[0];
  startCast(world, self, a);
  if (self.action?.kind === "cast" && self.action.ability === key) {
    const action = self.action;
    world.tick = action.endTick;
    completeCast(world, self, a, action.startTick);
  }
};
const state = (world: World, side: 0 | 1, key: StateType) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration: 100 }, { scale: 1 });
const tickHook = (world: World) => world.units[0].spec.hooks?.onTick?.(hookContext(world, world.units[0]));
const markCurse = (world: World) => applyEffect(world, world.units[0], world.units[1], { type: "mark", key: "cursedTouch", duration: 3, value: 0.1 }, { scale: 1 });
const noRegen = (spec: FighterSpec): FighterSpec => ({ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } });

describe("Amumu, pinned reworked mechanics", () => {
  it("reads max-rank QWER and a two-charge bandage from pinned records", () => {
    const world = worldFor(amumu.spec);
    expect(ability(world, "Q").charges).toEqual({ max: 2, recharge: 12 });
    expect(ability(world, "Q").cooldown).toBe(3);
    expect(ability(world, "Q").onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 170, ratios: { AP: 0.85 } } });
    expect(ability(world, "E").cooldown).toBe(5);
    expect(ability(world, "R").onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 400, ratios: { AP: 0.8 } } });
    expect(amumu.evidence.some((e) => e.text.includes("pre-mitigation"))).toBe(true);
  });

  it("Cursed Touch adds 10% of raw magic even against 100 MR", () => {
    const world = worldFor(amumu.spec, 0, { ...target, base: { ...target.base, mr: 100 } });
    markCurse(world);
    const hp = world.units[1].hp;
    dealDamage(world, world.units[0], world.units[1], 200, "magic", { ability: "test magic" });
    expect(hp - world.units[1].hp).toBeCloseTo(120, 8);
  });

  it("the curse proc reaches shields, and physical/true damage do not recurse", () => {
    const world = worldFor(amumu.spec, 0, { ...target, base: { ...target.base, mr: 100 } });
    markCurse(world);
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    const hp = world.units[1].hp;
    dealDamage(world, world.units[0], world.units[1], 200, "magic");
    expect(hp - world.units[1].hp).toBeCloseTo(20, 8);
    dealDamage(world, world.units[0], world.units[1], 50, "physical");
    dealDamage(world, world.units[0], world.units[1], 25, "true");
    expect(hp - world.units[1].hp).toBeCloseTo(95, 8);
  });

  it("the attack applies Curse before its magic on-hit", () => {
    const world = worldFor(amumu.spec, 0, { ...target, base: { ...target.base, mr: 100 } });
    const hp = world.units[1].hp;
    attackHit(world, world.units[0], world.units[1], false, [{ type: "damage", damageType: "magic", amount: { base: 20 } }]);
    expect(hp - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad + 10 + 2, 8);
  });

  it("R applies Curse after its damage and a spell shield prevents the mark", () => {
    const world = worldFor(amumu.spec, 0, { ...target, base: { ...target.base, mr: 100 } });
    const r = ability(world, "R");
    const hp = world.units[1].hp;
    abilityHit(world, world.units[0], world.units[1], r, r.onHit!);
    expect(hp - world.units[1].hp).toBeCloseTo(200, 8);
    abilityHit(world, world.units[0], world.units[1], r, r.onHit!);
    expect(hp - world.units[1].hp).toBeCloseTo(440, 8);
    world.units[1].statuses = [];
    state(world, 1, "spellShield");
    abilityHit(world, world.units[0], world.units[1], r, r.onHit!);
    expect(world.units[1].statuses.some((s) => s.key === "cursedTouch")).toBe(false);
    expect(hp - world.units[1].hp).toBeCloseTo(440, 8);
  });

  it("R stuns for 1.5 seconds and knocks down an ordinary dash without adding airborne", () => {
    const world = worldFor(amumu.spec);
    const r = ability(world, "R");
    world.units[1].action = { kind: "dash", ability: "enemy dash", startTick: 0, endTick: 90, perTick: 10, stopAtContact: false, unstoppable: false };
    abilityHit(world, world.units[0], world.units[1], r, r.onHit!);
    expect(world.units[1].action).toBeUndefined();
    expect(world.units[1].statuses.find((s) => s.kind === "cc" && s.key === "stun")?.endTick).toBe(45);
    expect(world.units[1].statuses.some((s) => s.key === "airborne")).toBe(false);
  });

  it("Despair uses the AP×target-health product, pulses every .5 seconds, and bypasses spell shields", () => {
    const enemy = { ...target, base: { ...target.base, hp: 2000 } };
    const world = worldFor({ ...amumu.spec, bonus: { ap: 200 } }, 0, enemy);
    state(world, 1, "spellShield");
    world.tick = 14;
    tickHook(world);
    expect(world.units[1].hp).toBe(2000);
    world.tick = 15;
    tickHook(world);
    expect(world.units[1].hp).toBeCloseTo(1965, 8);
    expect(hasState(world.units[1], "spellShield")).toBe(true);
    expect(world.units[1].statuses.some((s) => s.key === "cursedTouch")).toBe(false);
  });

  it("Despair refreshes an existing mark but does not create one, and stops when unable to pay", () => {
    const world = worldFor(amumu.spec, 0, { ...target, base: { ...target.base, hp: 2000 } });
    markCurse(world);
    world.tick = 15;
    tickHook(world);
    expect(world.units[1].statuses.find((s) => s.key === "cursedTouch")?.endTick).toBe(105);
    expect(world.units[1].hp).toBeCloseTo(2000 - 25 - 2.5, 8);
    const hp = world.units[1].hp;
    world.units[0].resource = 0;
    world.tick = 30;
    tickHook(world);
    expect(world.units[0].memory.despairOff).toBe(true);
    expect(world.units[1].hp).toBe(hp);
  });

  it("Despair continues during a stun and remains limited to its 350 radius", () => {
    const world = worldFor(amumu.spec, 400);
    applyCC(world, world.units[1], world.units[0], "stun", 2);
    world.tick = 15;
    tickHook(world);
    expect(world.units[1].hp).toBe(target.base.hp);
    world.units[1].x = 300;
    world.tick = 30;
    tickHook(world);
    expect(world.units[1].hp).toBeLessThan(target.base.hp);
  });

  it("Tantrum reduces raw physical damage by 13+.03 bonus armor+.03 bonus MR before armor", () => {
    const world = worldFor({ ...amumu.spec, base: { ...amumu.spec.base, armor: 100 }, bonus: { armor: 50, mr: 100 } });
    const hp = world.units[0].hp;
    dealDamage(world, world.units[1], world.units[0], 100, "physical");
    expect(hp - world.units[0].hp).toBeCloseTo((100 - 17.5) / 2.5, 8);
    dealDamage(world, world.units[1], world.units[0], 20, "physical");
    expect(hp - world.units[0].hp).toBeCloseTo((100 - 17.5 + 10) / 2.5, 8);
  });

  it("Tantrum caps each physical instance separately, including ordinary/critical outcomes", () => {
    const self = { ...amumu.spec, base: { ...amumu.spec.base, armor: 0 } };
    const world = worldFor(self);
    const hp = world.units[0].hp;
    attackHit(world, world.units[1], world.units[0], false, [{ type: "damage", damageType: "physical", amount: { base: 20 } }]);
    expect(hp - world.units[0].hp).toBeCloseTo(87 + 10, 8);
    const critWorld = worldFor(self, 0, { ...target, base: { ...target.base, ad: 20 }, bonus: { critChance: 0.5 } });
    const critHP = critWorld.units[0].hp;
    attackHit(critWorld, critWorld.units[1], critWorld.units[0], false, []);
    expect(critHP - critWorld.units[0].hp).toBeCloseTo((10 + (20 * derive(critWorld.units[1]).critDamage - 13)) / 2, 8);
  });

  it("resistance reductions lower Tantrum's bonus-resistance scaling before penetration", () => {
    const world = worldFor({ ...amumu.spec, base: { ...amumu.spec.base, armor: 0 }, bonus: { armor: 100 } });
    applyEffect(world, world.units[1], world.units[0], { type: "stat", stat: "armorReductionPercent", amount: { base: 0.5 }, duration: 10 }, { scale: 1 });
    const hp = world.units[0].hp;
    dealDamage(world, world.units[1], world.units[0], 100, "physical");
    expect(hp - world.units[0].hp).toBeCloseTo((100 - 13 - 0.03 * 50) / 1.5, 8);
  });

  it("Tantrum refunds once per connected incoming on-hit, even through an attack damage block", () => {
    const world = worldFor(amumu.spec);
    world.units[0].cooldownReady.E = 300;
    state(world, 0, "blockAttacks");
    attackHit(world, world.units[1], world.units[0], false, []);
    expect(world.units[0].cooldownReady.E).toBe(277);
    expect(world.units[0].hp).toBe(amumu.spec.base.hp);
    const onHit: AbilitySpec = { key: "spell", name: "on-hit spell", slot: "Q", cooldown: 1, castTime: 0, delivery: { kind: "target", range: 1000 }, flags: { appliesOnHit: true }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 10 } }] };
    abilityHit(world, world.units[1], world.units[0], onHit, onHit.onHit!);
    expect(world.units[0].cooldownReady.E).toBe(254);
  });

  it.each(["blind", "dodge", "parry"])("Tantrum does not refund a %s attack", (defense) => {
    const world = worldFor(amumu.spec);
    world.units[0].cooldownReady.E = 300;
    if (defense === "dodge") state(world, 0, "dodgeAttacks");
    if (defense === "parry") state(world, 0, "parry");
    attackHit(world, world.units[1], world.units[0], defense === "blind", []);
    expect(world.units[0].cooldownReady.E).toBe(300);
  });

  it("Bandage Toss keeps its static 3-second cast cooldown but haste halves recharge", () => {
    const world = worldFor({ ...amumu.spec, bonus: { abilityHaste: 100 } }, 500);
    cast(world, "Q");
    expect(world.units[0].cooldownReady.Q).toBe(8 + 90);
    expect(world.units[0].charges.Q).toEqual({ count: 1, nextTick: 8 + 180 });
  });

  it("Bandage Toss still starts its pull through a spell shield and while immobilized", () => {
    const world = worldFor(amumu.spec, 500);
    state(world, 1, "spellShield");
    applyCC(world, world.units[1], world.units[0], "root", 2);
    const q = ability(world, "Q");
    expect(canCast(world, world.units[0], q)).toBe(false);
    const hp = world.units[1].hp;
    abilityHit(world, world.units[0], world.units[1], q, q.onHit!);
    expect(world.units[0].action?.kind).toBe("dash");
    expect(world.units[1].hp).toBe(hp);
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    world.tick = 1;
    tickHook(world);
    progressDash(world, world.units[0]);
    expect(world.units[0].x).toBe(60);
  });

  it("the pull tracks a target changing sides and detaches beyond 2000 units", () => {
    const world = worldFor(amumu.spec, 500);
    const q = ability(world, "Q");
    abilityHit(world, world.units[0], world.units[1], q, q.onHit!);
    world.units[1].x = -300;
    world.tick = 1;
    tickHook(world);
    progressDash(world, world.units[0]);
    expect(world.units[0].x).toBe(-60);
    world.units[1].x = 2500;
    world.tick = 2;
    tickHook(world);
    expect(world.units[0].memory.bandageDetached).toBe(true);
    expect(world.units[0].action?.kind === "dash" && world.units[0].action.perTick).toBe(-60);
  });
});

describe("Rammus, pinned resistance/taunt rework", () => {
  it("Spiked Shell grants AD from both total resistances, with no magic on-hit passive", () => {
    const world = worldFor({ ...rammus.spec, bonus: { armor: 100, mr: 50 } });
    expect(derive(world.units[0]).ad).toBeCloseTo(rammus.spec.base.ad + 0.15 * (rammus.spec.base.armor + 100 + rammus.spec.base.mr + 50), 8);
    expect(rammus.spec.attack.onHit ?? []).toEqual([]);
  });

  it("Curl multiplies total resistance including its own flat bonus and updates passive AD", () => {
    const world = worldFor({ ...rammus.spec, bonus: { armor: 100, mr: 50 } });
    const initialSpeed = derive(world.units[0]).moveSpeed;
    cast(world, "W");
    const d = derive(world.units[0]);
    expect(d.armor.base + d.armor.bonus).toBeCloseTo((rammus.spec.base.armor + 100 + 47) * 1.6, 8);
    expect(d.mr.base + d.mr.bonus).toBeCloseTo((rammus.spec.base.mr + 50 + 40) * 1.6, 8);
    expect(d.ad).toBeCloseTo(rammus.spec.base.ad + 0.15 * (d.armor.base + d.armor.bonus + d.mr.base + d.mr.bonus), 8);
    expect(d.moveSpeed).toBe(initialSpeed);
    expect(d.damageReduction).toEqual([]);
  });

  it("Curl reflects one 15+.10 armor+.10 MR hit per incoming basic/on-hit spell", () => {
    const world = worldFor(rammus.spec);
    cast(world, "W");
    const d = derive(world.units[0]);
    const reflect = 15 + 0.1 * (d.armor.base + d.armor.bonus + d.mr.base + d.mr.bonus);
    const hp = world.units[1].hp;
    attackHit(world, world.units[1], world.units[0], false, []);
    expect(hp - world.units[1].hp).toBeCloseTo(reflect, 8);
    const onHit: AbilitySpec = { key: "spell", name: "on-hit spell", slot: "Q", cooldown: 1, castTime: 0, delivery: { kind: "target", range: 1000 }, flags: { appliesOnHit: true }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 10 } }] };
    abilityHit(world, world.units[1], world.units[0], onHit, onHit.onHit!);
    expect(hp - world.units[1].hp).toBeCloseTo(reflect * 2, 8);
  });

  it("Curl recalculates reflection after a resistance change and ignores the attacker's spell shield", () => {
    const world = worldFor(rammus.spec);
    cast(world, "W");
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "armor", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    state(world, 1, "spellShield");
    const d = derive(world.units[0]);
    const hp = world.units[1].hp;
    attackHit(world, world.units[1], world.units[0], false, []);
    expect(hp - world.units[1].hp).toBeCloseTo(15 + 0.1 * (d.armor.base + d.armor.bonus + d.mr.base + d.mr.bonus), 8);
    expect(hasState(world.units[1], "spellShield")).toBe(true);
  });

  it("armor/MR shred reduce passive AD and reflection, while attacker penetration does not", () => {
    const world = worldFor(rammus.spec, 0, { ...target, bonus: { lethality: 40, magicPen: 20 } });
    cast(world, "W");
    const d = derive(world.units[0]);
    const armor = d.armor.base + d.armor.bonus;
    const mr = d.mr.base + d.mr.bonus;
    applyEffect(world, world.units[1], world.units[0], { type: "stat", stat: "armorReductionPercent", amount: { base: 0.4 }, duration: 10 }, { scale: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "stat", stat: "mrReduction", amount: { base: 50 }, duration: 10 }, { scale: 1 });
    tickHook(world);
    expect(derive(world.units[0]).ad).toBeCloseTo(rammus.spec.base.ad + 0.15 * (armor * 0.6 + mr - 50), 8);
    const hp = world.units[1].hp;
    attackHit(world, world.units[1], world.units[0], false, []);
    expect(hp - world.units[1].hp).toBeCloseTo(15 + 0.1 * (armor * 0.6 + mr - 50), 8);
  });

  it.each(["blind", "dodge", "parry", "block"])("Curl counterplay distinguishes %s", (defense) => {
    const world = worldFor(rammus.spec);
    cast(world, "W");
    if (defense === "dodge") state(world, 0, "dodgeAttacks");
    if (defense === "parry") state(world, 0, "parry");
    if (defense === "block") state(world, 0, "blockAttacks");
    const hp = world.units[1].hp;
    attackHit(world, world.units[1], world.units[0], defense === "blind", []);
    expect(world.units[1].hp < hp).toBe(defense === "block");
  });

  it("Curl ends when Q starts, and its cooldown begins after the effect", () => {
    const world = worldFor(rammus.spec, 500);
    cast(world, "W");
    expect(world.units[0].cooldownReady.W).toBe(Infinity);
    world.tick = 30;
    cast(world, "Q");
    expect(derive(world.units[0]).armor.bonus).toBeCloseTo(0, 8);
    releaseCooldowns(world, world.units[0]);
    expect(world.units[0].cooldownReady.W).toBe(30 + 210);
  });

  it("Powerball is a nonmovement channel: root/ground retain it, stun interrupts it", () => {
    const world = worldFor(rammus.spec, 800);
    cast(world, "Q");
    applyCC(world, world.units[1], world.units[0], "root", 1);
    applyCC(world, world.units[1], world.units[0], "ground", 1);
    expect(world.units[0].action?.kind).toBe("channel");
    world.tick = 15;
    tickHook(world);
    expect(world.units[0].memory.powerballActive).toBe(true);
    applyCC(world, world.units[1], world.units[0], "stun", 1);
    expect(world.units[0].action).toBeUndefined();
    tickHook(world);
    releaseCooldowns(world, world.units[0]);
    expect(world.units[0].memory.powerballActive).toBe(false);
    expect(world.units[0].cooldownReady.Q).toBe(15 + 180);
  });

  it("Powerball accelerates multiplicatively with another movement-speed buff", () => {
    const world = worldFor(rammus.spec, 2000);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "moveSpeedPercent", amount: { base: 0.2 }, duration: 10 }, { scale: 1 });
    cast(world, "Q");
    world.tick = 30;
    tickHook(world);
    expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(335 * 1.2 * (1 + 0.408333333333333), 8);
  });

  it("Powerball collides at center-to-edge75, deals 240 magic, and applies knockback/stun/slow", () => {
    const world = worldFor(rammus.spec);
    cast(world, "Q");
    world.units[1].x = 75 + world.units[1].spec.base.radius;
    world.tick = 1;
    tickHook(world);
    expect(world.units[1].hp).toBe(target.base.hp - 240);
    expect(world.units[0].action).toBeUndefined();
    expect(world.units[1].forced).toBeDefined();
    expect(world.units[1].statuses.find((s) => s.key === "stun")?.endTick).toBe(13);
    expect(world.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.8);
  });

  it("Powerball's displacement-immune target takes damage/slow but no stun or knockback", () => {
    const world = worldFor(rammus.spec);
    state(world, 1, "displacementImmune");
    cast(world, "Q");
    world.units[1].x = 100;
    world.tick = 1;
    tickHook(world);
    expect(world.units[1].hp).toBe(target.base.hp - 240);
    expect(world.units[1].forced).toBeUndefined();
    expect(world.units[1].statuses.some((s) => s.key === "stun")).toBe(false);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
  });

  it("Q and W can each be ended manually only after their 1-second recast delay", () => {
    const world = worldFor(rammus.spec, 800);
    cast(world, "Q");
    expect(canCast(world, world.units[0], ability(world, "Q-end"))).toBe(false);
    world.tick = 30;
    expect(canCast(world, world.units[0], ability(world, "Q-end"))).toBe(true);
    cast(world, "Q-end");
    expect(world.units[0].action).toBeUndefined();
    cast(world, "W");
    expect(canCast(world, world.units[0], ability(world, "W-end"))).toBe(false);
    world.tick = 60;
    cast(world, "W-end");
    expect(derive(world.units[0]).armor.bonus).toBeCloseTo(0, 8);
  });

  it("W may end the Q channel, and E taunts champions without monster damage or attack speed", () => {
    const world = worldFor(rammus.spec, 0);
    cast(world, "Q");
    expect(canCast(world, world.units[0], ability(world, "W"))).toBe(true);
    cast(world, "W");
    expect(world.units[0].action).toBeUndefined();
    const speed = derive(world.units[0]).attackSpeed;
    const hp = world.units[1].hp;
    cast(world, "E");
    expect(world.units[1].hp).toBe(hp);
    expect(derive(world.units[0]).attackSpeed).toBe(speed);
    expect(world.units[1].statuses.find((s) => s.key === "taunt")?.endTick).toBe(world.tick + 60);
  });

  it("E cancels an invalid target without spending mana or starting cooldown", () => {
    const world = worldFor(rammus.spec);
    const self = world.units[0];
    const mana = self.resource;
    startCast(world, self, ability(world, "E"));
    world.units[1].x = 500;
    world.tick = 8;
    completeCast(world, self, ability(world, "E"), 0);
    expect(self.resource).toBe(mana);
    expect(self.cooldownReady.E).toBeUndefined();
  });

  it("Soaring Slam may be cast during Q, preserves its cooldown hold through the leap, and adds 240+.75s knockup", () => {
    const world = worldFor(rammus.spec, 400);
    cast(world, "Q");
    expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true);
    cast(world, "R");
    expect(world.units[0].action?.kind).toBe("dash");
    expect(hasState(world.units[0], "ccImmune")).toBe(true);
    applyCC(world, world.units[1], world.units[0], "stun", 2);
    expect(world.units[0].action?.kind).toBe("dash");
    const hp = world.units[1].hp;
    while (world.units[0].action?.kind === "dash") {
      world.tick += 1;
      tickHook(world);
      releaseCooldowns(world, world.units[0]);
      expect(world.units[0].cooldownReady.Q).toBe(Infinity);
      progressDash(world, world.units[0]);
    }
    expect(hp - world.units[1].hp).toBe(350 + 240);
    expect(world.units[1].statuses.find((s) => s.key === "airborne")?.endTick).toBe(world.tick + 23);
    expect(hasState(world.units[0], "ccImmune")).toBe(false);
    expect(world.zones.filter((z) => z.ability === "R-aftershock")).toHaveLength(3);
  });

  it("a spell shield blocks the entire powered slam, while its aftershock slows bypass a new shield", () => {
    const world = worldFor(rammus.spec, 300);
    state(world, 1, "spellShield");
    cast(world, "Q");
    cast(world, "R");
    const hp = world.units[1].hp;
    while (world.units[0].action?.kind === "dash") {
      world.tick += 1;
      tickHook(world);
      progressDash(world, world.units[0]);
    }
    expect(world.units[1].hp).toBe(hp);
    expect(world.units[1].statuses.some((s) => s.kind === "cc")).toBe(false);
    state(world, 1, "spellShield");
    world.tick = world.zones[0]!.endTick;
    advanceZones(world);
    expect(world.units[1].hp).toBe(hp);
    expect(world.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(0.5);
    expect(hasState(world.units[1], "spellShield")).toBe(true);
  });

  it("an unpowered slam deals only 350; a missed landing still creates aftershocks", () => {
    const world = worldFor(rammus.spec, 300);
    cast(world, "R");
    while (world.units[0].action?.kind === "dash") {
      world.tick += 1;
      tickHook(world);
      progressDash(world, world.units[0]);
    }
    expect(world.units[1].hp).toBe(target.base.hp - 350);
    expect(world.units[1].statuses.some((s) => s.key === "airborne")).toBe(false);
    const miss = worldFor(rammus.spec, 1500);
    cast(miss, "R");
    while (miss.units[0].action?.kind === "dash") {
      miss.tick += 1;
      tickHook(miss);
      progressDash(miss, miss.units[0]);
    }
    expect(miss.units[1].hp).toBe(target.base.hp);
    expect(miss.zones.filter((z) => z.ability === "R-aftershock")).toHaveLength(3);
    expect(hasState(miss.units[0], "ccImmune")).toBe(false);
  });

  it("an interrupted slam creates no aftershocks", () => {
    const world = worldFor(rammus.spec, 800);
    cast(world, "R");
    world.tick = 1;
    tickHook(world);
    // Exercise interruption reporting with a synthetic interruptible leap.
    // Rammus's real leap is immune to ordinary crowd control.
    world.units[0].statuses = world.units[0].statuses.filter((s) => !(s.kind === "state" && s.key === "ccImmune"));
    if (world.units[0].action?.kind === "dash") world.units[0].action.unstoppable = false;
    applyCC(world, world.units[1], world.units[0], "airborne", 1);
    world.tick = 2;
    tickHook(world);
    expect(world.zones).toHaveLength(0);
    expect(hasState(world.units[0], "ccImmune")).toBe(false);
  });

  it("both complete kits progress through a short real duel without hanging", () => {
    const world = createWorld({ fighters: [noRegen(amumu.spec), noRegen(rammus.spec)], distance: 500, modes: ["fight", "fight"], settings: { maxSeconds: 3, log: true } });
    for (let i = 0; i < 100 && !world.result; i++) step(world, [world.units[0].spec.behavior ?? defaultBehavior, world.units[1].spec.behavior!]);
    expect(world.tick).toBeGreaterThan(30);
    expect(Number.isFinite(world.units[0].hp)).toBe(true);
    expect(Number.isFinite(world.units[1].hp)).toBe(true);
    expect(world.units[1].resource).toBeLessThan(rammus.spec.base.resource);
  });
});
