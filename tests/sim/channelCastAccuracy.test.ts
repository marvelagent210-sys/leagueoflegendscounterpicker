import { describe, expect, it } from "vitest";
import { canCast, progressChannel, releaseCooldowns, startCast } from "../../engine/sim/actions";
import { threatsTo } from "../../engine/sim/behavior";
import { applyCC, beginDeathDefied, beginResurrection, immediateDisplace } from "../../engine/sim/combat";
import { channelIn } from "../../engine/sim/channelState";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { idle, lasting } from "./helpers";

function setup() {
  const channel = ability({ key: "R", delivery: { kind: "self" }, cooldownAfter: "channel",
    channel: { duration: 2, interval: 0.25, interruptible: true, onTick: [{ type: "damage", damageType: "true", amount: { base: 1 } }] } });
  const shot = ability({ key: "R2", castTime: 0.25, deliveryDuringCastAt: 0.2, cost: 20,
    preserveChannel: true, allowedDuringChannel: ["R"],
    chain: { root: "R", index: 2, window: 2 },
    delivery: { kind: "line", range: 1000, width: 80, speed: 300 }, flags: { projectile: true },
    onHit: [{ type: "damage", damageType: "true", amount: { base: 40 } }] });
  const world = createWorld({ fighters: [fighter({ abilities: [channel, shot], base: { resource: 100 }, hooks: {
    onCast: ({ ability, memory }) => { memory[`completed:${ability.key}`] = Number(memory[`completed:${ability.key}`] ?? 0) + 1; },
    onChannelInterrupt: ({ memory }) => { memory.interrupts = Number(memory.interrupts ?? 0) + 1; },
  } }), fighter()], distance: 500, modes: ["idle", "idle"], settings: { log: true, reactionTime: 10 } });
  startCast(world, world.units[0], channel);
  return { world, channel, shot };
}

function through(world: World, tick: number) { while (world.tick <= tick) step(world, [idle, idle]); }

describe("timed casts that preserve a channel", () => {
  it("launches once at 0.2s, retains the 0.25s lock, then restores the original channel clocks", () => {
    const { world, shot } = setup(), self = world.units[0];
    const original = channelIn(self.action)!;
    expect(canCast(world, self, shot)).toBe(true);
    startCast(world, self, shot);
    through(world, 5);
    expect(world.missiles).toHaveLength(0);
    through(world, 6);
    expect(world.missiles).toHaveLength(1);
    expect(world.missiles[0]).toMatchObject({ source: "R2", seenTick: 0, x: 0 });
    expect(self.action).toMatchObject({ kind: "cast", endTick: 8, delivered: true, resume: original });
    expect(self.resource).toBe(100);
    expect(self.memory["completed:R2"]).toBeUndefined();
    through(world, 8);
    expect(self.action).toBe(original);
    expect(original.startTick).toBe(0);
    expect(original.endTick).toBe(60);
    expect(self.resource).toBe(80);
    expect(self.memory["completed:R2"]).toBe(1);
    expect(world.missiles).toHaveLength(1);
    through(world, 9);
    expect(world.missiles).toHaveLength(1);
  });

  it("advertises the launch clock before delivery and only the real missile afterward", () => {
    const { world, shot } = setup();
    world.settings.reactionTime = 0;
    world.units[1].statuses.push(lasting("cc", "root"));
    startCast(world, world.units[0], shot);
    expect(threatsTo(world, 1).find((threat) => threat.source === "R2")?.eta).toBe(6 + 57);
    through(world, 6);
    const shots = threatsTo(world, 1).filter((threat) => threat.source === "R2");
    expect(shots).toHaveLength(1);
    expect(shots[0]?.id).toBe(world.missiles[0]!.id);
  });

  it.each(["stun", "silence", "airborne"] as const)("%s interrupts the held channel but preserves the announced cast and launched bullet", (cc) => {
    const { world, shot } = setup(), self = world.units[0];
    startCast(world, self, shot);
    world.tick = 2;
    expect(applyCC(world, world.units[1], self, cc, 1)).toBe(true);
    expect(self.action).toMatchObject({ kind: "cast", endTick: 8 });
    expect(channelIn(self.action)).toBeUndefined();
    expect(self.memory.interrupts).toBe(1);
    through(world, 8);
    expect(world.missiles).toHaveLength(1);
    expect(self.action).toBeUndefined();
    expect(self.resource).toBe(80);
  });

  it("continues generic channel pulses under a long permitted cast and clears the channel alone on expiry", () => {
    const { world, shot } = setup(), self = world.units[0];
    const long = { ...shot, castTime: 3, deliveryDuringCastAt: 2.5 };
    self.spec = { ...self.spec, abilities: [self.spec.abilities[0]!, long] };
    startCast(world, self, long);
    through(world, 60);
    expect(world.units[1].totals.damageTaken).toBe(7); // Quantized .25s pulses: 8,16,...,56.
    expect(self.action).toMatchObject({ kind: "cast", endTick: 90 });
    expect(channelIn(self.action)).toBeUndefined();
    expect(self.cooldownReady.R).toBe(360); // Channel's original 60-tick end + 10s cooldown.
    expect(self.memory.interrupts).toBeUndefined();
  });

  it("keeps post-channel cooldown held during a permitted cast", () => {
    const { world, shot } = setup(), self = world.units[0];
    startCast(world, self, shot);
    world.tick = 4;
    releaseCooldowns(world, self);
    expect(self.cooldownReady.R).toBe(Infinity);
    expect(self.cooldownHeld.R).toBe("R");
  });

  it("clones the held channel independently through a cast and nested dash", () => {
    const { world, shot } = setup(), self = world.units[0];
    startCast(world, self, shot);
    self.action = { kind: "dash", ability: "E", startTick: 0, endTick: 5, perTick: 10,
      stopAtContact: false, unstoppable: false, resume: self.action };
    const branch = cloneWorld(world);
    const original = channelIn(self.action)!;
    const copied = channelIn(branch.units[0].action)!;
    expect(copied).toEqual(original);
    expect(copied).not.toBe(original);
    branch.tick = 8;
    progressChannel(branch, branch.units[0]);
    expect(copied.nextTick).toBe(16);
    expect(original.nextTick).toBe(8);
    applyCC(branch, branch.units[1], branch.units[0], "stun", 1);
    expect(channelIn(branch.units[0].action)).toBeUndefined();
    expect(channelIn(self.action)).toBe(original);
  });

  it("ends a held channel on resurrection while retaining the declared cast", () => {
    const { world, shot } = setup(), self = world.units[0];
    startCast(world, self, shot);
    expect(beginResurrection(world, self, { duration: 6 })).toBe(true);
    expect(self.action).toMatchObject({ kind: "cast", endTick: 8 });
    expect(channelIn(self.action)).toBeUndefined();
    expect(self.memory.interrupts).toBe(1);
    through(world, 8);
    expect(world.missiles).toHaveLength(1);
  });

  it("ends a held channel and cancels its cast on counted death", () => {
    const { world, shot } = setup(), self = world.units[0];
    startCast(world, self, shot);
    expect(beginDeathDefied(world, self, { duration: 7 })).toBe(true);
    expect(self.action).toBeUndefined();
    expect(self.memory.interrupts).toBe(1);
    through(world, 8);
    expect(world.missiles).toHaveLength(0);
  });
});

describe("accepted hostile champion immobilization observers", () => {
  it("reports the actual source, victim and ability once after accepted CC, including zero-time ejection", () => {
    const events: Array<{ cc: string; source: unknown; target: unknown; ability?: string }> = [];
    const world = createWorld({ fighters: [fighter({ hooks: { onEnemyCCApplied: ({ cc, source, target, ability }) => events.push({ cc, source, target, ability }) } }), fighter()], distance: 100, modes: ["idle", "idle"] });
    expect(applyCC(world, world.units[0], world.units[1], "root", 1, 0, false, "Q")).toBe(true);
    expect(immediateDisplace(world, world.units[0], world.units[1], 1, "W")).toBe(true);
    expect(events.map(({ cc, ability }) => [cc, ability])).toEqual([["root", "Q"], ["airborne", "W"]]);
    expect(events.every((event) => event.source === world.units[0] && event.target === world.units[1])).toBe(true);
  });

  it("excludes rejected CC, slows, friendly CC and pet proxies", () => {
    let count = 0;
    const world = createWorld({ fighters: [fighter({ hooks: { onEnemyCCApplied: () => { count++; } } }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", "ccImmune"));
    expect(applyCC(world, self, enemy, "root", 1)).toBe(false);
    enemy.statuses = [];
    applyCC(world, self, enemy, "slow", 1, 0.5);
    applyCC(world, enemy, enemy, "root", 1);
    const pet = spawnPet(world, enemy, { kind: "test", name: "Pet", hp: 100, armor: 0, mr: 0,
      radius: 10, moveSpeed: 0, duration: 10 }, 100);
    petEffects(world, self, pet, [{ type: "cc", cc: "root", duration: 1 }]);
    expect(count).toBe(0);
  });
});

describe("hook-delivered impact forecasts", () => {
  it("announces one real completion packet throughout cast and channel without delivering a phantom hit", () => {
    const packet = ability({ key: "shot", delivery: { kind: "target", range: 2000, missileSpeed: 1000 },
      onHit: [{ type: "damage", damageType: "true", amount: { base: 500 } }], flags: { projectile: true, spellShield: true } });
    const root = ability({ key: "R", castTime: 0.375, delivery: { kind: "self" }, estimate: () => 9999,
      channel: { duration: 1, interruptible: true, completionThreat: "shot" }, flags: { projectile: false, spellShield: false } });
    const world = createWorld({ fighters: [fighter({ abilities: [root, packet] }), fighter()],
      distance: 935, modes: ["idle", "idle"], settings: { reactionTime: 0 } });
    startCast(world, world.units[0], root);
    expect(threatsTo(world, 1).filter((threat) => threat.source === "R" || threat.source === "shot"))
      .toMatchObject([{ source: "shot", eta: 72, damage: 500, projectile: true, spellShieldable: true }]);
    through(world, 12);
    expect(threatsTo(world, 1).filter((threat) => threat.source === "shot"))
      .toMatchObject([{ eta: 59, damage: 500, projectile: true, spellShieldable: true }]);
    through(world, 42);
    expect(threatsTo(world, 1).filter((threat) => threat.source === "shot")).toHaveLength(0);
    expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.missiles).toHaveLength(0);
  });

  it("includes the channel and actual flight delay in a hook-only forecast", () => {
    const shot = ability({ key: "R", castTime: 0.375, delivery: { kind: "target", range: 2000 },
      estimate: () => 500, estimateDelay: (caster, target) => 1 + Math.max(0, Math.abs(target.x - caster.x) - target.spec.base.radius) / 1000 });
    const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter()],
      distance: 935, modes: ["idle", "idle"], settings: { reactionTime: 0 } });
    startCast(world, world.units[0], shot);
    expect(threatsTo(world, 1).find((threat) => threat.source === "R")).toMatchObject({ eta: 72, damage: 500 });
  });

  it("retains ordinary cast timing without an explicit hook delay", () => {
    const shot = ability({ key: "Q", castTime: 0.375, delivery: { kind: "self" }, estimate: () => 40 });
    const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter()], distance: 100,
      modes: ["idle", "idle"], settings: { reactionTime: 0 } });
    startCast(world, world.units[0], shot);
    expect(threatsTo(world, 1).find((threat) => threat.source === "Q")).toMatchObject({ eta: 12, damage: 40 });
  });
});
