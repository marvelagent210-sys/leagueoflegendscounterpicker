import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyCC, applyEffect, attackHit, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import ashe from "../../kits/champions/Ashe";
import vayne from "../../kits/champions/Vayne";
import { championData, pets, records, runes } from "./helpers";
import { fighter } from "../sim/kits";

const idle = () => undefined;
const modules = { Ashe: ashe, Vayne: vayne };
const compile = (id: keyof typeof modules) => compileKit(championData(id), records(id), modules[id], {}, pets(id), runes());
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const makeWorld = (id: keyof typeof modules, options: { bonus?: BonusStats; hp?: number; armor?: number; distance?: number; walls?: boolean; wallDistance?: number; attack?: FighterSpec["attack"] } = {}) => {
  const compiled = compile(id);
  const spec: FighterSpec = {
    ...compiled.spec,
    base: { ...compiled.spec.base, hp: 5000, hpRegen: 0, ad: 100, resource: 3000, resourceRegen: 0, moveSpeed: 330, radius: 65, pathingRadius: 35, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: 0.1, modifier: 1 } },
    ...(options.bonus ? { bonus: options.bonus } : {}),
    ...(options.attack ? { attack: options.attack } : {}),
  };
  const enemy = fighter({ id: "target", base: { hp: options.hp ?? 2000, armor: options.armor ?? 0, mr: 0 } });
  return createWorld({ fighters: [spec, enemy], distance: options.distance ?? 100, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 20, maxBranches: 1, environment: { ...DEFAULT_ENVIRONMENT, walls: options.walls ?? false, wallDistance: options.wallDistance ?? 200 } } });
};
const tickUntil = (world: World, tick: number) => { while (world.tick < tick && !world.result) step(world, [idle, idle]); };
const hit = (world: World) => attackHit(world, world.units[0], world.units[1], false, []);
const frost = (world: World) => world.units[1].statuses.find((s) => s.memoKey === "ashe:frost");

describe("Ashe's pinned Frost Shot and Ranger's Focus", () => {
  it("reads the full source kit, including charged vision and the 26.20 unconditional crit-damage wording", () => {
    const built = compile("Ashe");
    expect(new Set(built.evidence.map((e) => e.ability))).toEqual(new Set(["Frost Shot", "Ranger's Focus", "Volley", "Hawkshot", "Enchanted Crystal Arrow"]));
    const world = makeWorld("Ashe");
    expect(ability(world, "Q")).toMatchObject({ cooldown: 0, cost: 30, castTime: 0 });
    expect(ability(world, "E")).toMatchObject({ cost: 0, cooldown: 5, charges: { max: 2, recharge: 50 } });
    expect(ability(world, "R").onHit?.[0]).toMatchObject({ amount: { base: 600, ratios: { AP: 1.2 } } });
    expect(built.evidence.some((e) => e.text.includes("Critical strikes do not deal any additional damage"))).toBe(true);
  });

  it("applies the same deterministic 150 damage to an unfrosted and frosted target at 50% crit", () => {
    const world = makeWorld("Ashe", { bonus: { critChance: 0.5 } });
    hit(world);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(150, 9);
    hit(world);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(300, 9);
    expect(frost(world)?.value).toBeCloseTo(0.311764705882353 * 1.5, 9);
  });

  it("retains the declaring attack's crit chance when it changes before missile contact", () => {
    const world = makeWorld("Ashe", { bonus: { critChance: 0.5 }, distance: 400 });
    startAttack(world, world.units[0]);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "critChance", amount: { base: -0.5 }, duration: 30 }, { scale: 1 });
    expect(derive(world.units[0]).critChance).toBe(0);
    tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(150, 9);
    expect(Number(world.units[0].memory.frostCriticalExtra)).toBeCloseTo(0.311764705882353 * 0.5, 9);
  });

  it("decays critical slow over one second, refreshes ordinary Frost for two seconds, and respects cleanse", () => {
    const world = makeWorld("Ashe", { bonus: { critChance: 1 } });
    hit(world);
    expect(frost(world)?.value).toBeCloseTo(0.623529411764706, 9);
    expect(derive(world.units[1]).moveSpeed).toBeCloseTo(175.882352941176, 9);
    tickUntil(world, 15);
    world.units[0].spec.hooks?.onTick?.(hookContext(world, world.units[0]));
    expect(frost(world)?.value).toBeCloseTo(0.467647058823529, 9);
    expect(derive(world.units[1]).moveSpeed).toBeCloseTo(203.161764705882, 9);
    tickUntil(world, 30);
    world.units[0].spec.hooks?.onTick?.(hookContext(world, world.units[0]));
    expect(frost(world)?.value).toBeCloseTo(0.311764705882353, 9);
    applyEffect(world, world.units[1], world.units[1], { type: "cleanse", types: ["slow"] }, { scale: 1 });
    tickUntil(world, 40);
    expect(frost(world)).toBeUndefined();
  });

  it("generates Focus on declaration even when blinded, requires four stacks, and lets them expire", () => {
    const world = makeWorld("Ashe");
    applyCC(world, world.units[1], world.units[0], "blind", 20);
    for (const at of [0, 20, 40, 60]) {
      world.tick = at;
      startAttack(world, world.units[0]);
      expect(world.units[0].memory.focus).toBe(at / 20 + 1);
      world.units[0].action = undefined;
    }
    expect(canCast(world, world.units[0], ability(world, "Q"))).toBe(true);
    world.tick = 270;
    expect(canCast(world, world.units[0], ability(world, "Q"))).toBe(false);
    startAttack(world, world.units[0]);
    expect(world.units[0].memory.focus).toBe(1);
  });

  it("loses Focus one stack per second after its four-second timer, and attacks refresh surviving stacks", () => {
    const world = makeWorld("Ashe");
    const self = world.units[0];
    for (const at of [0, 20, 40, 60]) {
      world.tick = at;
      startAttack(world, self); self.action = undefined;
    }
    world.tick = 180;
    self.spec.hooks?.onTick?.(hookContext(world, self));
    expect(self.memory.focus).toBe(3);
    expect(self.memory.focusUntil).toBe(210);
    world.tick = 181;
    startAttack(world, self); self.action = undefined;
    expect(self.memory.focus).toBe(4);
    expect(self.memory.focusUntil).toBe(301);
    expect(canCast(world, self, ability(world, "Q"))).toBe(true);
    for (const [at, remaining] of [[301, 3], [331, 2], [361, 1], [391, 0]] as const) {
      world.tick = at;
      self.spec.hooks?.onTick?.(hookContext(world, self));
      expect(self.memory.focus).toBe(remaining);
    }
  });

  it("fires six separate damage packets on the first flurry and five thereafter, with attached on-hit once", () => {
    const world = makeWorld("Ashe");
    const [self, target] = world.units;
    self.memory.focus = 4; self.memory.focusUntil = 120;
    // One ordinary attached effect per flurry, not one per arrow.
    self.spec.attack = { ...self.spec.attack, missileSpeed: 0, onHit: [{ type: "damage", damageType: "true", amount: { base: 7 } }] };
    startCast(world, self, ability(world, "Q"));
    expect(self.memory.focus).toBe(0);
    expect(self.attackReadyTick).toBe(0);
    expect(derive(self).attackSpeed).toBeCloseTo(1.6, 9);
    expect(canCast(world, self, ability(world, "Q"))).toBe(false);
    startAttack(world, self); launchAttack(world, self);
    expect(target.totals.damageTaken).toBeCloseTo(156 + 7, 9);
    expect(world.log.filter((e) => e.side === 0 && e.text.includes("physical damage"))).toHaveLength(6);
    startAttack(world, self); launchAttack(world, self);
    expect(target.totals.damageTaken).toBeCloseTo(156 + 130 + 14, 9);
    expect(world.log.filter((e) => e.side === 0 && e.text.includes("physical damage"))).toHaveLength(11);
    expect(self.memory.focus).toBe(0);
  });

  it("keeps each flurry at declaration-time crit chance and reflects damage only once", () => {
    const world = makeWorld("Ashe", { bonus: { critChance: 0.5 } });
    const [self, target] = world.units;
    self.memory.focus = 4; self.memory.focusUntil = 120;
    self.spec.attack = { ...self.spec.attack, missileSpeed: 0 };
    applyEffect(world, target, target, { type: "state", state: "reflectAttacks", value: 8, duration: 20 }, { scale: 1 });
    startCast(world, self, ability(world, "Q")); startAttack(world, self);
    applyEffect(world, self, self, { type: "stat", stat: "critChance", amount: { base: -0.5 }, duration: 30 }, { scale: 1 });
    launchAttack(world, self);
    expect(target.totals.damageTaken).toBeCloseTo(156 * 1.5, 9);
    expect(world.log.filter((e) => e.text.startsWith("reflected damage deals"))).toHaveLength(1);
  });

  it("a dodged flurry deals no arrow damage and does not apply Frost", () => {
    const world = makeWorld("Ashe");
    const [self, target] = world.units;
    self.memory.focus = 4; self.memory.focusUntil = 120;
    self.spec.attack = { ...self.spec.attack, missileSpeed: 0 };
    applyEffect(world, target, target, { type: "state", state: "dodgeAttacks", duration: 20 }, { scale: 1 });
    startCast(world, self, ability(world, "Q")); startAttack(world, self); launchAttack(world, self);
    expect(target.totals.damageTaken).toBe(0);
    expect(frost(world)).toBeUndefined();
  });

  it("applies flat damage reduction to every arrow rather than the combined flurry", () => {
    const world = makeWorld("Ashe");
    const [self, target] = world.units;
    self.memory.focus = 4; self.memory.focusUntil = 120;
    self.spec.attack = { ...self.spec.attack, missileSpeed: 0 };
    applyEffect(world, target, target, { type: "state", state: "flatDamageReduction", value: 24, duration: 20 }, { scale: 1 });
    startCast(world, self, ability(world, "Q")); startAttack(world, self); launchAttack(world, self);
    // Each 26-damage arrow loses at most 50% of itself, not 24 from the 156 total.
    expect(target.totals.damageTaken).toBeCloseTo(6 * 13, 9);
  });

  it("Volley applies guaranteed critical slow once, with spell-shield counterplay", () => {
    const world = makeWorld("Ashe", { bonus: { ad: 40 } });
    const [self, target] = world.units;
    const volley = ability(world, "W");
    abilityHit(world, self, target, volley, volley.onHit ?? []);
    expect(target.totals.damageTaken).toBeCloseTo(240, 9);
    expect(frost(world)?.value).toBeCloseTo(0.623529411764706, 9);
    const protectedWorld = makeWorld("Ashe");
    applyEffect(protectedWorld, protectedWorld.units[1], protectedWorld.units[1], { type: "state", state: "spellShield", duration: 5, charges: 1 }, { scale: 1 });
    abilityHit(protectedWorld, protectedWorld.units[0], protectedWorld.units[1], ability(protectedWorld, "W"), ability(protectedWorld, "W").onHit ?? []);
    expect(protectedWorld.units[1].totals.damageTaken).toBe(0);
    expect(frost(protectedWorld)).toBeUndefined();
  });

  it("Crystal Arrow's stun grows with actual travel and a spell shield blocks the complete packet", () => {
    for (const [distance, duration] of [[100, 1], [1935, 2.5], [2935, 3.5]] as const) {
      const world = makeWorld("Ashe", { distance });
      world.settings.reactionTime = 100;
      startCast(world, world.units[0], ability(world, "R"));
      tickUntil(world, 80);
      const stunLog = world.log.find((e) => e.text.startsWith("inflicts stun"));
      expect(stunLog?.text).toBe(`inflicts stun for ${duration.toFixed(2)} s`);
      expect(world.units[1].totals.damageTaken).toBeCloseTo(600, 9);
    }
    const world = makeWorld("Ashe");
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 5, charges: 1 }, { scale: 1 });
    startCast(world, world.units[0], ability(world, "R")); tickUntil(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.log.some((e) => e.text.startsWith("inflicts stun"))).toBe(false);
  });

  it("Crystal Arrow retains its cast-start origin if Ashe is displaced during the cast", () => {
    const world = makeWorld("Ashe", { distance: 600 });
    startCast(world, world.units[0], ability(world, "R"));
    world.units[0].x = -100;
    tickUntil(world, 9);
    const missile = world.missiles.find((m) => m.source === "R")!;
    expect(missile.x).toBe(0);
    step(world, [idle, idle]);
    expect(missile.x).toBe(2100 / 30);
  });

  it("Crystal Arrow retains the declared direction if its enemy crosses Ashe during the cast", () => {
    const world = makeWorld("Ashe", { distance: 600 });
    startCast(world, world.units[0], ability(world, "R"));
    world.units[1].x = -730;
    tickUntil(world, 9);
    const missile = world.missiles.find((m) => m.source === "R")!;
    expect(missile.direction).toBe(1);
    expect(missile.x).toBe(0);
    tickUntil(world, 30);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
});

describe("Vayne's pinned Silver Bolts, Tumble and Final Hour", () => {
  it("procs 10% max-health true damage every third attack, with the 100 minimum and no spell-shield consumption", () => {
    for (const [hp, expected] of [[2000, 200], [500, 100]] as const) {
      const world = makeWorld("Vayne", { hp, armor: 100 });
      applyEffect(world, world.units[1], world.units[1], { type: "state", state: "spellShield", duration: 30, charges: 1 }, { scale: 1 });
      hit(world); hit(world);
      expect(world.units[1].totals.damageTaken).toBeCloseTo(100, 9);
      hit(world);
      expect(world.units[1].totals.damageTaken).toBeCloseTo(150 + expected, 9);
      expect(world.units[0].memory.silver).toBe(0);
      expect(hasState(world.units[1], "spellShield")).toBe(true);
    }
  });

  it("lets Silver Bolts expire after 3.5 seconds and prevents stacks on dodged attacks", () => {
    const world = makeWorld("Vayne");
    hit(world); hit(world);
    world.tick = 105;
    hit(world);
    expect(world.units[0].memory.silver).toBe(1);
    expect(world.log.some((e) => e.text.startsWith("Silver Bolts deals"))).toBe(false);
    const protectedWorld = makeWorld("Vayne");
    applyEffect(protectedWorld, protectedWorld.units[1], protectedWorld.units[1], { type: "state", state: "dodgeAttacks", duration: 5 }, { scale: 1 });
    hit(protectedWorld); hit(protectedWorld); hit(protectedWorld);
    expect(protectedWorld.units[0].memory.silver ?? 0).toBe(0);
    expect(protectedWorld.units[1].totals.damageTaken).toBe(0);
  });

  it("a connected damage-blocked attack stacks Silver Bolts and consumes the third mark while denying its true damage", () => {
    const world = makeWorld("Vayne");
    const [self, target] = world.units;
    applyEffect(world, target, target, { type: "state", state: "blockAttacks", duration: 5 }, { scale: 1 });
    hit(world);
    expect(self.memory.silver).toBe(1);
    hit(world);
    expect(self.memory.silver).toBe(2);
    hit(world);
    expect(self.memory.silver).toBe(0);
    expect(target.totals.damageTaken).toBe(0);
    expect(world.log.some((e) => e.text.startsWith("Silver Bolts deals"))).toBe(false);
    target.statuses = target.statuses.filter((s) => s.key !== "blockAttacks");
    hit(world);
    expect(self.memory.silver).toBe(1);
    hit(world); hit(world);
    expect(target.totals.damageTaken).toBe(300 + 200);
    expect(world.log.filter((e) => e.text.startsWith("Silver Bolts deals"))).toHaveLength(1);
  });

  it("Condemn can provide the third Silver Bolts stack; spell shields prevent damage, displacement and stacks", () => {
    const world = makeWorld("Vayne", { bonus: { ad: 40 } });
    world.units[0].memory.silver = 2; world.units[0].memory.silverUntil = 105;
    startCast(world, world.units[0], ability(world, "E")); tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(210 + 200, 9);
    expect(world.units[0].memory.silver).toBe(0);
    expect(world.log.some((e) => e.text.startsWith("inflicts airborne"))).toBe(true);
    const protectedWorld = makeWorld("Vayne");
    applyEffect(protectedWorld, protectedWorld.units[1], protectedWorld.units[1], { type: "state", state: "spellShield", duration: 5, charges: 1 }, { scale: 1 });
    startCast(protectedWorld, protectedWorld.units[0], ability(protectedWorld, "E")); tickUntil(protectedWorld, 20);
    expect(protectedWorld.units[1].totals.damageTaken).toBe(0);
    expect(protectedWorld.units[0].memory.silver ?? 0).toBe(0);
    expect(protectedWorld.units[1].x).toBe(230);
  });

  it("Condemn cancels a target lost during its cast without consuming mana or starting cooldown", () => {
    const world = makeWorld("Vayne");
    const mana = world.units[0].resource;
    startCast(world, world.units[0], ability(world, "E"));
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "untargetable", duration: 5 }, { scale: 1 });
    tickUntil(world, 12);
    expect(world.units[0].resource).toBe(mana);
    expect(world.units[0].cooldownReady.E ?? 0).toBe(0);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("Condemn fails to fire after suppression during its cast, even when cleansed; an ordinary stun does not stop it", () => {
    const world = makeWorld("Vayne", { bonus: { abilityHaste: 100 } });
    const self = world.units[0];
    startCast(world, self, ability(world, "E"));
    applyCC(world, world.units[1], self, "suppression", 1);
    applyEffect(world, self, self, { type: "cleanse", types: ["suppression"] }, { scale: 1 });
    tickUntil(world, 20);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(self.memory.silver ?? 0).toBe(0);
    expect(self.resource).toBe(3000 - 90);
    expect(self.cooldownReady.E).toBe(8 + 180);
    expect(world.log.some((e) => e.text.startsWith("inflicts airborne"))).toBe(false);
    const stunned = makeWorld("Vayne");
    startCast(stunned, stunned.units[0], ability(stunned, "E"));
    applyCC(stunned, stunned.units[1], stunned.units[0], "stun", 1);
    tickUntil(stunned, 20);
    expect(stunned.units[1].totals.damageTaken).toBe(190);
    expect(stunned.units[0].memory.silver).toBe(1);
  });

  it("Condemn deals its additional wall damage and starts the 1.5-second stun on wall collision", () => {
    const world = makeWorld("Vayne", { bonus: { ad: 40 }, walls: true, wallDistance: 100 });
    startCast(world, world.units[0], ability(world, "E")); tickUntil(world, 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(210 + 315, 9);
    const airborne = world.log.find((e) => e.text.startsWith("inflicts airborne"))!;
    const stun = world.log.find((e) => e.text.startsWith("inflicts stun"))!;
    expect(stun.text).toBe("inflicts stun for 1.50 s");
    expect(stun.tick - airborne.tick).toBe(2);
    expect(world.units[1].x).toBeCloseTo(330, 9);
  });

  it("Tumble resets the attack timer, retains uncancellable windup, adds 115% AD without critting the bonus", () => {
    const world = makeWorld("Vayne", { bonus: { critChance: 1 } });
    const self = world.units[0];
    self.attackReadyTick = 100;
    startCast(world, self, ability(world, "Q"), { direction: -1, distance: 300 });
    expect(self.attackReadyTick).toBe(0);
    expect(canStartAttack(world, self)).toBe(false);
    tickUntil(world, 12);
    expect(self.x).toBeCloseTo(-300, 9);
    expect(canStartAttack(world, self)).toBe(true);
    startAttack(world, self);
    expect(self.action).toMatchObject({ kind: "windup", uncancellable: true });
    applyCC(world, world.units[1], self, "stun", 2);
    expect(self.action?.kind).toBe("windup");
    tickUntil(world, 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(200 + 115, 9);
    expect(self.cooldownReady.Q).toBeGreaterThan(30);
  });

  it("Tumble's speed uses current movement speed and is blocked by ground", () => {
    const world = makeWorld("Vayne");
    const q = ability(world, "Q");
    if (q.delivery.kind !== "dash") throw new Error("Tumble must dash");
    expect(q.delivery.speedFor?.(world.units[0])).toBe(500 + 360);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "moveSpeedFlat", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    expect(q.delivery.speedFor?.(world.units[0])).toBe(500 + 451);
    applyCC(world, world.units[1], world.units[0], "ground", 5);
    expect(canCast(world, world.units[0], q)).toBe(false);
  });

  it("Final Hour gives 65 AD, triples chase speed and halves Tumble's post-effect cooldown", () => {
    const world = makeWorld("Vayne");
    const self = world.units[0];
    expect(derive(self).moveSpeed).toBe(360);
    expect(ability(world, "Q").cooldownFor?.(self)).toBe(2);
    startCast(world, self, ability(world, "R"));
    expect(derive(self).ad).toBe(165);
    // Movement soft cap applies above 415: 420 raw becomes 419.
    expect(derive(self).moveSpeed).toBe(419);
    expect(ability(world, "Q").cooldownFor?.(self)).toBe(1);
    expect(self.cooldownReady.R).toBe(2100);
    tickUntil(world, 360);
    step(world, [idle, idle]);
    expect(derive(self).ad).toBe(100);
    expect(ability(world, "Q").cooldownFor?.(self)).toBe(2);
  });

  it("grants invisibility after Tumble rather than during it, then reveals on attack declaration", () => {
    const world = makeWorld("Vayne");
    const self = world.units[0];
    startCast(world, self, ability(world, "R"));
    startCast(world, self, ability(world, "Q"), { direction: -1, distance: 300 });
    expect(hasState(self, "invisible")).toBe(false);
    const dashEnd = self.action?.kind === "dash" ? self.action.endTick : -1;
    tickUntil(world, dashEnd);
    expect(hasState(self, "invisible")).toBe(false);
    tickUntil(world, dashEnd + 2);
    expect(hasState(self, "invisible")).toBe(true);
    const stealth = self.statuses.find((s) => s.key === "invisible")!;
    expect(stealth.startTick).toBe(dashEnd);
    expect(stealth.endTick - stealth.startTick).toBe(30);
    startAttack(world, self);
    expect(hasState(self, "invisible")).toBe(false);
  });

  it("Final Hour can be cast during Tumble without cancelling its movement", () => {
    const world = makeWorld("Vayne");
    const self = world.units[0];
    startCast(world, self, ability(world, "Q"), { direction: -1, distance: 300 });
    expect(canCast(world, self, ability(world, "R"))).toBe(true);
    startCast(world, self, ability(world, "R"));
    expect(self.action).toMatchObject({ kind: "dash", ability: "Q" });
    expect(derive(self).ad).toBe(165);
    tickUntil(world, 14);
    expect(self.x).toBeCloseTo(-300, 9);
    expect(hasState(self, "invisible")).toBe(true);
  });

  it("Tumble starts its Final Hour invisibility when a knockdown ends the dash early", () => {
    const world = makeWorld("Vayne");
    const self = world.units[0];
    startCast(world, self, ability(world, "R"));
    startCast(world, self, ability(world, "Q"), { direction: -1, distance: 300 });
    tickUntil(world, 3);
    expect(hasState(self, "invisible")).toBe(false);
    applyCC(world, world.units[1], self, "airborne", 0.5);
    expect(self.action).toBeUndefined();
    expect(hasState(self, "invisible")).toBe(true);
    expect(self.statuses.find((s) => s.key === "invisible")?.startTick).toBe(3);
  });

  it("Night Hunter follows facing and visibility, retaining sight for two seconds", () => {
    const world = makeWorld("Vayne");
    const self = world.units[0];
    self.memory.hunterFacing = false;
    self.spec.hooks?.onTick?.(hookContext(world, self));
    expect(derive(self).moveSpeed).toBe(330);
    self.memory.hunterFacing = true;
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 10 }, { scale: 1 });
    world.tick = 59;
    self.spec.hooks?.onTick?.(hookContext(world, self));
    expect(derive(self).moveSpeed).toBe(360);
    world.tick = 60;
    self.spec.hooks?.onTick?.(hookContext(world, self));
    expect(derive(self).moveSpeed).toBe(330);
  });

  it("copied worlds retain independent Silver Bolts and Focus counters", () => {
    const original = makeWorld("Vayne");
    hit(original);
    const copy = cloneWorld(original);
    hit(copy); hit(copy);
    expect(original.units[0].memory.silver).toBe(1);
    expect(copy.units[0].memory.silver).toBe(0);
    expect(copy.units[1].totals.damageTaken - original.units[1].totals.damageTaken).toBe(400);
  });
});
