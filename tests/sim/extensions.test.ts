import { describe, expect, it } from "vitest";
import { type Behavior, DEFENSIVE_SUSTAIN, LAST_STAND, defaultBehavior, disciplined, perceive } from "../../engine/sim/behavior";
import { canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { ability, fighter, RANGED } from "./kits";
import { castWhenReady, duel, idle, lasting, standStill, ticksOf } from "./helpers";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

/** Casts the given keys in order, each as soon as it can, then stands still. */
function castSequence(keys: string[]): Behavior {
  return (view) => {
    const done = Number(view.self.memory.done ?? 0);
    const key = keys[done];
    if (key === undefined) return { kind: "move", direction: 0 };
    const spec = view.self.spec.abilities.find((a) => a.key === key);
    if (!spec) return undefined;
    view.self.memory.done = done + 1;
    return { kind: "cast", ability: key };
  };
}

describe("recast chains", () => {
  const stages = (cooldown: "first" | "last"): AbilitySpec[] => [
    ability({ key: "Q", cooldown: 10, chainCooldown: cooldown, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(10)] }),
    ability({ key: "Q2", cooldown: 0, chain: { root: "Q", index: 2, window: 2, delay: 0.5 }, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(20)] }),
    ability({ key: "Q3", cooldown: 0, chain: { root: "Q", index: 3, window: 2 }, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(30)] }),
  ];

  it("opens each stage after the previous one, after its delay and within its window", () => {
    // Q2 waits 0.5 s (15 ticks) after Q; Q3 has no delay, so it follows on the same tick.
    const outcome = duel(fighter({ abilities: stages("last") }), fighter(), { behaviors: [castWhenReadyAll(["Q", "Q2", "Q3"]), idle], settings: { maxSeconds: 1 } });
    expect(ticksOf(outcome.timeline, 0, "casts Q")).toEqual([0, 15, 15]);
    expect(outcome.damage[0]).toBe(60);
  });

  it("starts the cooldown after the last stage, or when the window closes", () => {
    const world = createWorld({ fighters: [fighter({ abilities: stages("last") }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const [self] = world.units;
    step(world, [castSequence(["Q"]), idle]);
    expect(self.cooldownReady.Q ?? 0).toBe(0);
    // The Q2 window (2 s = 60 ticks) closes unused: the 10 s cooldown starts then.
    for (let i = 0; i < 62; i++) step(world, [idle, idle]);
    expect(self.chains.Q).toBeUndefined();
    expect(self.cooldownReady.Q).toBe(61 + 300);
    const first = createWorld({ fighters: [fighter({ abilities: stages("first") }), fighter()], distance: 0, modes: ["idle", "idle"] });
    step(first, [castSequence(["Q"]), idle]);
    expect(first.units[0].cooldownReady.Q).toBe(300);
  });
});

/** Casts any of the keys that can be cast, in order. */
function castWhenReadyAll(keys: string[]): Behavior {
  return (view) => {
    for (const key of keys) {
      const spec = view.self.spec.abilities.find((a) => a.key === key);
      if (!spec || view.self.memory[`cast:${key}`]) continue;
      const ready = (view.self.cooldownReady[key] ?? 0) <= view.world.tick;
      const chain = spec.chain ? view.self.chains[spec.chain.root] : undefined;
      const open = !spec.chain || (chain !== undefined && chain.stage === spec.chain.index - 1 && view.world.tick >= chain.castTick + Math.ceil((spec.chain.delay ?? 0) * 30 - 1e-9));
      if (ready && open) {
        view.self.memory[`cast:${key}`] = true;
        return { kind: "cast", ability: key };
      }
    }
    return { kind: "move", direction: 0 };
  };
}

describe("costs and conditions", () => {
  it("pays health costs, and can't pay with its last health", () => {
    const swing = ability({ key: "E", cooldown: 1, cost: 100, costType: "health", delivery: { kind: "target", range: 600 }, onHit: [trueDamage(50)] });
    const world = createWorld({ fighters: [fighter({ abilities: [swing] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    step(world, [castSequence(["E"]), idle]);
    expect(world.units[0].hp).toBe(1900);
    world.units[0].hp = 100;
    for (let i = 0; i < 40; i++) step(world, [castWhenReady("E"), idle]);
    expect(world.units[0].hp).toBe(100);
  });

  it("casts abilities that need an airborne target only on one", () => {
    const lastBreath = ability({ key: "R", cooldown: 50, delivery: { kind: "target", range: 1400 }, requires: { enemyCC: ["airborne"] }, onHit: [trueDamage(300)] });
    const knockUp = ability({ key: "Q", cooldown: 50, delivery: { kind: "target", range: 1400 }, onHit: [{ type: "displace", direction: "away", distance: 0, duration: 1 }] });
    const preferR: Behavior = (view) => {
      const r = view.self.spec.abilities.find((a) => a.key === "R");
      if (r && canCast(view.world, view.self, r)) return { kind: "cast", ability: "R" };
      return view.self.memory.q ? undefined : ((view.self.memory.q = true), { kind: "cast", ability: "Q" });
    };
    const outcome = duel(fighter({ abilities: [lastBreath, knockUp] }), fighter(), { behaviors: [preferR, idle], settings: { maxSeconds: 0.5 } });
    // R can't be cast on a grounded target; right after Q's knock up, on the same tick, it can.
    expect(outcome.timeline.filter((e) => e.side === 0 && e.text.startsWith("casts")).map((e) => `${e.tick} ${e.text}`)).toEqual(["0 casts Q", "0 casts R"]);
  });
});

describe("areas", () => {
  // A ring around the caster that lands 0.75 s after the cast: the inner 240 units deal less.
  const decimate = ability({
    key: "Q",
    cooldown: 20,
    delivery: { kind: "area", near: 0, far: 460, delay: 0.75, anchor: "caster", bands: [{ from: 0, to: 240, onHit: [trueDamage(35)] }] },
    onHit: [trueDamage(100)],
  });

  it("hits with the band the target stands in", () => {
    // 300 units edge to edge is 430 center to center: in the blade.
    const blade = duel(fighter({ abilities: [decimate] }), fighter(), { distance: 300, behaviors: [castSequence(["Q"]), standStill], settings: { maxSeconds: 1 } });
    expect(blade.damage[0]).toBe(100);
    // 50 units edge to edge is 180 center to center: in the handle.
    const handle = duel(fighter({ abilities: [decimate] }), fighter(), { distance: 50, behaviors: [castSequence(["Q"]), standStill], settings: { maxSeconds: 1 } });
    expect(handle.damage[0]).toBe(35);
  });

  it("can be walked out of when the target sees it coming in time", () => {
    // Seen after 0.25 s, 0.5 s left: 350 units per second walks 175 units, enough from 430 to past 525.
    const dodged = duel(fighter({ abilities: [decimate] }), fighter(), { distance: 300, behaviors: [castSequence(["Q"]), undefined], modes: ["fight", "hold"], settings: { maxSeconds: 1 } });
    expect(dodged.damage[0]).toBe(0);
  });

  it("sets off traps when the enemy walks onto them", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 600, modes: ["idle", "fight"] });
    world.zones.push({ id: 99, owner: 0, kind: "trap", seenTick: 0, x: 300, radius: 160, startTick: 0, endTick: 1e9, onHit: [trueDamage(200)] });
    for (let i = 0; i < 40; i++) step(world, [idle, () => ({ kind: "move", direction: 1 })]);
    expect(world.units[1].hp).toBe(1800);
    expect(world.zones).toHaveLength(0);
  });
});

describe("states", () => {
  const dash = (knockdown: boolean) =>
    ability({ key: "E", cooldown: 20, delivery: { kind: "dash", direction: "toward", distance: 600, speed: 1200, hitRadius: 100 }, onHit: [trueDamage(100)], flags: { knockdown } });

  it("stops ordinary dashes within an anti-dash aura and damages unstoppable ones without stopping them", () => {
    const aura = lasting("state", "antiDash", 400, { effects: [trueDamage(70), { type: "cc", cc: "ground", duration: 2 }] });
    const stopped = duel(fighter({ abilities: [dash(true)] }), fighter(), { distance: 600, behaviors: [castSequence(["E"]), idle], settings: { maxSeconds: 1 }, setup: (w) => w.units[1].statuses.push(aura) });
    expect(stopped.damage).toEqual([0, 70]);
    expect(ticksOf(stopped.timeline, 1, "stops the dash").length).toBe(1);
    const through = duel(fighter({ abilities: [dash(false)] }), fighter(), { distance: 600, behaviors: [castSequence(["E"]), idle], settings: { maxSeconds: 1 }, setup: (w) => w.units[1].statuses.push({ ...aura }) });
    // Poppy's recorded notes: an immune/unstoppable dash still triggers and takes damage.
    expect(through.damage).toEqual([100, 70]);
  });

  it("negates the first immobilizing crowd control", () => {
    const stun = ability({ key: "Q", cooldown: 1, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration: 0.5 }] });
    const outcome = duel(fighter({ abilities: [stun] }), fighter(), { behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 1.2 }, setup: (w) => w.units[1].statuses.push(lasting("state", "ccNegate", 0, { charges: 1 })) });
    expect(ticksOf(outcome.timeline, 1, "negates stun")).toEqual([0]);
    expect(ticksOf(outcome.timeline, 0, "stun for")).toEqual([30]);
  });

  it("keeps out enemies outside an area of untargetability", () => {
    const ranged = fighter({ attack: RANGED });
    const outcome = duel(ranged, fighter(), {
      distance: 500,
      behaviors: [undefined, standStill],
      settings: { maxSeconds: 2 },
      setup: (w) => w.units[1].statuses.push(lasting("state", "untargetableFar", 300, { x: w.units[1].x })),
    });
    // The ranged attacker must walk inside 300 units of the mist's center before it can attack.
    expect(outcome.damage[0]).toBeGreaterThan(0);
    const first = ticksOf(outcome.timeline, 0, "attack deals")[0] ?? 0;
    expect(first).toBeGreaterThan(15);
  });

  it("stuns a target knocked back into a wall, only with walls nearby", () => {
    const charge = ability({ key: "E", cooldown: 20, delivery: { kind: "target", range: 600 }, onHit: [{ type: "displace", direction: "away", distance: 400, duration: 0.5, wallStun: 1.5 }] });
    const walls = duel(fighter({ abilities: [charge] }), fighter(), { behaviors: [castSequence(["E"]), idle], settings: { maxSeconds: 2 } });
    expect(ticksOf(walls.timeline, 0, "into a wall")).toEqual([0]);
    // 300 of the 400 units take 11.25 ticks at the original speed; arrival rounds up to tick 12.
    expect(ticksOf(walls.timeline, 0, "stun for")).toEqual([12]);
    const open = duel(fighter({ abilities: [charge] }), fighter(), { behaviors: [castSequence(["E"]), idle], settings: { maxSeconds: 2, environment: { walls: false, wallDistance: 300, minions: true, brush: true, laneSetup: true } } });
    expect(ticksOf(open.timeline, 0, "stun for")).toEqual([]);
  });
});

describe("effects", () => {
  it("refunds cooldowns and changes resources", () => {
    const world = createWorld({ fighters: [fighter({ base: { resource: 100 } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const [self] = world.units;
    self.resource = 0;
    self.cooldownReady.Q = 300;
    world.tick = 60;
    // 2 s (60 ticks) off the 240 left, then half of the 180 left.
    apply(world, { type: "refund", ability: "Q", seconds: 2 });
    expect(self.cooldownReady.Q).toBe(240);
    apply(world, { type: "refund", ability: "Q", fraction: 0.5 });
    expect(self.cooldownReady.Q).toBe(150);
    apply(world, { type: "resource", amount: { base: 30 } }, true);
    expect(self.resource).toBe(30);
    apply(world, { type: "resource", amount: { base: 500 } }, true);
    expect(self.resource).toBe(100);
  });

  it("spins a channel as many times as its pulse formula says", () => {
    // 7 + 1 per 25% bonus attack speed over 3 s: 9 spins with 50% bonus attack speed.
    const spin = ability({
      key: "E",
      cooldown: 20,
      delivery: { kind: "self" },
      channel: { duration: 3, interruptible: false, mobile: true, range: 400, pulses: { base: 7, ratios: { bonusAttackSpeed: 4 } }, onTick: [trueDamage(10)] },
    });
    const outcome = duel(fighter({ abilities: [spin], bonus: { attackSpeed: 0.5 } }), fighter(), { behaviors: [castSequence(["E"]), idle], settings: { maxSeconds: 3.5 } });
    expect(ticksOf(outcome.timeline, 0, "E deals 10 true")).toHaveLength(9);
  });

  it("crits for a custom multiplier and heals from damage dealt", () => {
    const world = createWorld({ fighters: [fighter({ bonus: { critChance: 0.5 } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const [self, target] = world.units;
    self.hp = 1000;
    apply(world, { type: "damage", damageType: "true", amount: { base: 100 }, canCrit: true, critMultiplier: 1.3, lifesteal: 0.5 });
    // 50% x 1.3 + 50% x 1: 115 damage; half of it healed.
    expect(target.hp).toBeCloseTo(2000 - 115, 9);
    expect(self.hp).toBeCloseTo(1000 + 57.5, 9);
  });

  it("heals when maximum health grows and caps health when it shrinks", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    const [self] = world.units;
    apply(world, { type: "stat", stat: "health", amount: { base: 300 }, duration: 1 }, true);
    expect(derive(self).maxHp).toBe(2300);
    expect(self.hp).toBe(2300);
    for (let i = 0; i < 40; i++) step(world, [idle, idle]);
    expect(derive(self).maxHp).toBe(2000);
    expect(self.hp).toBe(2000);
  });

  it("raises total resistances by a share", () => {
    const world = createWorld({ fighters: [fighter({ bonus: { armor: 50 } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    apply(world, { type: "stat", stat: "armorPercent", amount: { base: 0.16 }, duration: 10 }, true);
    // (100 + 50) x 16% = 24 more bonus armor.
    expect(derive(world.units[0]).armor).toEqual({ base: 100, bonus: 74 });
  });
});

describe("kit hooks", () => {
  it("runs start hooks and innate effects before the first tick, and damage hooks on every hit", () => {
    const seen: number[] = [];
    const spec = fighter({
      hooks: {
        onStart: (ctx) => ctx.buff("innate", "AD", 50, 1e9),
        onDamageTaken: (ctx) => seen.push(Math.round(ctx.amount)),
      },
    });
    spec.start = [{ type: "stat", stat: "armor", amount: { base: 100 }, duration: 1e9 }];
    const world = createWorld({ fighters: [spec, fighter()], distance: 0, modes: ["idle", "fight"] });
    expect(derive(world.units[0]).ad).toBe(150);
    expect(derive(world.units[0]).armor.bonus).toBe(100);
    for (let i = 0; i < 20; i++) step(world, [idle, (view) => (view.self.action ? undefined : { kind: "attack" })]);
    // 100 AD into 200 armor: 33 per attack.
    expect(seen).toEqual([33]);
  });

  it("replaces a keyed buff instead of stacking it", () => {
    const world = createWorld({ fighters: [fighter({ hooks: { onTick: (ctx) => ctx.buff("rage", "AD", ctx.tick, 5) } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    for (let i = 0; i < 10; i++) step(world, [idle, idle]);
    expect(world.units[0].statuses.filter((s) => s.memoKey === "buff:rage")).toHaveLength(1);
    expect(derive(world.units[0]).ad).toBe(100 + 9);
  });
});

describe("finishers", () => {
  it("holds a finisher until its damage kills", () => {
    const justice = ability({ key: "R", cooldown: 100, castTime: 0, roles: ["finisher"], delivery: { kind: "target", range: 400 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 200, ratios: { targetMissingHP: 0.3 } } }] });
    const outcome = duel(fighter({ abilities: [justice], base: { ad: 200 } }), fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 60 } });
    // 200 + 30% of missing health kills once health <= (200 + 0.3 x 2000) / 1.3 = 615.
    const cast = ticksOf(outcome.timeline, 0, "casts R")[0];
    expect(cast).toBeDefined();
    expect(outcome.win[0]).toBe(1);
    const hpAtCast = 2000 - 100 * ticksOf(outcome.timeline, 0, "attack deals").filter((t) => t <= (cast ?? 0)).length;
    expect(hpAtCast).toBeLessThanOrEqual(615);
    expect(hpAtCast).toBeGreaterThan(515);
  });

  it("casts a finisher that won't kill once its holder is low on health and behind, rather than dying with it", () => {
    const burst = ability({ key: "R", cooldown: 100, castTime: 0, roles: ["finisher"], delivery: { kind: "target", range: 400 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 300 } }] });
    // The holder hits for 50 and takes 150 a hit: it loses, and its 300 never kills the 2,000-health enemy.
    const outcome = duel(fighter({ abilities: [burst], base: { ad: 50 } }), fighter({ base: { ad: 150 } }), { settings: { maxSeconds: 60 } });
    const cast = ticksOf(outcome.timeline, 0, "casts R")[0];
    expect(cast).toBeDefined();
    expect(outcome.win[1]).toBe(1);
    // Cast at or below half of 2,000 health (LAST_STAND), with the enemy ahead, not before.
    const taken = ticksOf(outcome.timeline, 1, "attack deals").filter((t) => t <= (cast ?? 0)).length * 150 * (100 / 200);
    expect(2000 - taken).toBeLessThanOrEqual(LAST_STAND * 2000 + 1e-9);
    expect(2000 - taken).toBeGreaterThan(LAST_STAND * 2000 - 150);
  });
});

describe("defensive shields", () => {
  it("go up in combat once their holder is below half health, kept for reactions until then", () => {
    const barrier = ability({ key: "W", cooldown: 100, castTime: 0, roles: ["defense"], delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 300 }, duration: 3 }] });
    const outcome = duel(fighter({ abilities: [barrier] }), fighter({ base: { ad: 150 } }), { behaviors: [undefined, undefined], settings: { maxSeconds: 60 } });
    const cast = ticksOf(outcome.timeline, 0, "casts W")[0];
    expect(cast).toBeDefined();
    // Each enemy hit takes 75 of 2,000 health: cast below 1,000, not before.
    const taken = ticksOf(outcome.timeline, 1, "attack deals").filter((t) => t <= (cast ?? 0)).length * 75;
    expect(2000 - taken).toBeLessThan(DEFENSIVE_SUSTAIN * 2000 + 1e-9);
    expect(2000 - taken).toBeGreaterThanOrEqual(DEFENSIVE_SUSTAIN * 2000 - 75);
  });

});

describe("defenses kept for what they answer that also buff", () => {
  // Ragnarok's shape: a cleanse and immunity to crowd control, with bonus attack damage.
  const ragnarok = ability({ key: "R", cooldown: 100, castTime: 0, delivery: { kind: "self" }, onSelf: [{ type: "cleanse", sticky: true }, { type: "state", state: "ccImmune", duration: 3 }, { type: "stat", stat: "AD", amount: { base: 50 }, duration: 3 }] });
  const stun = ability({ key: "Q", cooldown: 100, castTime: 0, delivery: { kind: "target", range: 50 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] });
  const first = (enemy: ReturnType<typeof fighter>) => {
    const world = createWorld({ fighters: [fighter({ abilities: [ragnarok] }), enemy], distance: 0, modes: ["fight", "idle"] });
    return perceive(world, 0);
  };

  it("go up for the buff within attack range when the enemy has nothing they answer", () => {
    expect(defaultBehavior(first(fighter()))).toEqual({ kind: "cast", ability: "R" });
  });

  it("stay kept against an enemy with crowd control, until the holder is below half health", () => {
    const view = first(fighter({ abilities: [stun] }));
    expect(defaultBehavior(view)).not.toEqual({ kind: "cast", ability: "R" });
    view.self.hp = derive(view.self).maxHp * (DEFENSIVE_SUSTAIN - 0.05);
    expect(defaultBehavior(view)).toEqual({ kind: "cast", ability: "R" });
  });
});

describe("crowd control that leaves a choice", () => {
  // The wiki's crowd control table (CC_RULES): a root stops walking, not attacks or casts.
  const rooted = (cc: "root" | "stun") => {
    const world = createWorld({ fighters: [fighter({ abilities: [ability({ key: "Q", cooldown: 10, castTime: 0, delivery: { kind: "target", range: 300 }, onHit: [trueDamage(50)] })] }), fighter()], distance: 50, modes: ["fight", "idle"] });
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 2 }, { scale: 1 });
    return perceive(world, 0);
  };

  it("lets a rooted champion cast and attack", () => {
    const view = rooted("root");
    expect(defaultBehavior(view)).toEqual({ kind: "cast", ability: "Q" });
    view.self.cooldownReady.Q = 1000;
    expect(defaultBehavior(view)).toEqual({ kind: "attack" });
  });

  it("leaves a stunned one none", () => {
    expect(defaultBehavior(rooted("stun"))).toBeUndefined();
  });
});

describe("instant casts during an attack windup", () => {
  // V25.24's December 4th hotfix (the wiki's Basic attack article): "Casting abilities or using
  // item actives with no cast time no longer interrupts attacks."
  const buff = (castTime: number) => ability({ key: "W", cooldown: 10, castTime, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "AD", amount: { base: 10 }, duration: 5 }] });
  const windup = (castTime: number) => {
    const world = createWorld({ fighters: [fighter({ abilities: [buff(castTime)] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const unit = world.units[0];
    startAttack(world, unit);
    const before = unit.action;
    step(world, [idle, idle]);
    startCast(world, unit, unit.spec.abilities[0]!);
    return { world, unit, before };
  };

  it("keep the windup when the cast has no cast time", () => {
    const { unit, before } = windup(0);
    expect(unit.action).toBe(before);
    expect(unit.action?.kind).toBe("windup");
  });

  it("cancel it when the cast has one", () => {
    const { world, unit } = windup(0.25);
    expect(unit.action?.kind).toBe("cast");
    expect(unit.attackReadyTick).toBe(world.tick);
  });
});

describe("attack discipline", () => {
  // A melee fighter (125 range) 10 units inside its range of the enemy, whose behavior asks to attack.
  const near = (enemy = fighter()) => createWorld({ fighters: [fighter(), enemy], distance: 115, modes: ["fight", "fight"] });
  const attack = { kind: "attack" } as const;

  it("lets an attack the enemy can't walk out of go ahead", () => {
    const world = near();
    expect(perceive(world, 0).distance).toBeCloseTo(115);
    expect(disciplined(perceive(world, 0), attack)).toEqual(attack);
  });

  it("closes in instead of starting one an enemy walking away would outrun, whatever behavior asked for it", () => {
    const world = near();
    world.units[1].moved = -1;
    expect(disciplined(perceive(world, 0), attack)).toEqual({ kind: "move", direction: 1 });
  });

  it("counts a feared enemy as walking away until its fear ends", () => {
    const world = near();
    apply(world, { type: "cc", cc: "fear", duration: 1 });
    world.units[1].moved = -1;
    expect(disciplined(perceive(world, 0), attack)).toEqual({ kind: "move", direction: 1 });
    // A fear ending this tick leaves it no time to open the gap.
    world.tick = world.units[1].statuses.find((status) => status.key === "fear")!.endTick;
    expect(disciplined(perceive(world, 0), attack)).toEqual(attack);
  });

  it("expects an enemy that out-ranges it to step back once its own windup ends", () => {
    const world = near(fighter({ attack: RANGED }));
    const kiter = world.units[1];
    startAttack(world, kiter);
    world.tick++;
    // Its windup ends before this one's: it steps back in the time left.
    expect(disciplined(perceive(world, 0), attack)).toEqual({ kind: "move", direction: 1 });
    // From up close, the step it can take doesn't get it out of range.
    world.units[0].x = kiter.x - (kiter.x > world.units[0].x ? 1 : -1) * (world.units[0].spec.base.radius + kiter.spec.base.radius);
    expect(perceive(world, 0).distance).toBeLessThan(1);
    expect(disciplined(perceive(world, 0), attack)).toEqual(attack);
  });

  it("attacks anyway once touching an enemy it can't get closer to, even if the enemy may walk out", () => {
    const world = near();
    world.units[1].moved = -1;
    world.units[0].x = world.units[1].x - (world.units[1].x > world.units[0].x ? 1 : -1) * (world.units[0].spec.base.pathingRadius + world.units[1].spec.base.pathingRadius);
    expect(disciplined(perceive(world, 0), attack)).toEqual(attack);
  });

  it("spaces instead of standing still when asked for an attack it can't start yet", () => {
    const world = createWorld({ fighters: [fighter({ attack: RANGED }), fighter()], distance: 300, modes: ["kite", "fight"] });
    world.units[0].attackReadyTick = world.tick + 20;
    // Kiting a melee enemy that has closed in, between attacks: it steps back.
    world.units[1].x = world.units[0].x + (world.units[1].x > world.units[0].x ? 1 : -1) * (world.units[0].spec.base.radius + world.units[1].spec.base.radius + 100);
    expect(disciplined(perceive(world, 0), attack)).toEqual({ kind: "move", direction: -1 });
    // In a fight, out of range, it closes in.
    world.modes[0] = "fight";
    world.units[0].attackReadyTick = world.tick;
    world.units[1].x = world.units[0].x + (world.units[1].x > world.units[0].x ? 1 : -1) * 2000;
    expect(disciplined(perceive(world, 0), attack)).toEqual({ kind: "move", direction: 1 });
  });

  it("spaces while kiting through a channel it can walk in, rather than walking in", () => {
    const charge = ability({ key: "E", cooldown: 20, delivery: { kind: "self" }, channel: { duration: 1, interruptible: false, mobile: true, range: 400, onTick: [trueDamage(10)] } });
    const world = createWorld({ fighters: [fighter({ attack: RANGED, abilities: [charge] }), fighter()], distance: 100, modes: ["kite", "fight"] });
    startCast(world, world.units[0], charge);
    expect(world.units[0].action?.kind).toBe("channel");
    world.units[0].attackReadyTick = world.tick + 20;
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    world.modes[0] = "fight";
    expect(defaultBehavior(perceive(world, 0))).toEqual({ kind: "move", direction: 1 });
  });

  it("reads an action the enemy started this tick as not started, whichever side decided first", () => {
    const world = near(fighter({ attack: RANGED }));
    startAttack(world, world.units[1]);
    expect(disciplined(perceive(world, 0), attack)).toEqual(attack);
  });

  it("keeps a behavior that attacks whenever it can from cancelling attacks on a kiting enemy", () => {
    const eager: Behavior = (view) => (view.self.action ? undefined : canStartAttack(view.world, view.self) ? { kind: "attack" } : { kind: "move", direction: 1 });
    // A 0.24-second windup, which a 350-speed kiter can't outrun from up close.
    const quick = fighter({ base: { moveSpeed: 400, windup: { percent: 0.15, modifier: 1 } } });
    const outcome = duel(quick, fighter({ attack: RANGED }), { distance: 300, behaviors: [eager, defaultBehavior], settings: { maxSeconds: 10, maxBranches: 1 } });
    const timeline = outcome.timeline ?? [];
    expect(timeline.filter((entry) => entry.side === 0 && entry.text === "attack cancelled: target out of range")).toHaveLength(0);
    expect(timeline.filter((entry) => entry.side === 0 && entry.text.startsWith("attack deals")).length).toBeGreaterThan(5);
  });
});

/** Applies an effect from side 0 to side 1 (or to itself). */
function apply(world: World, effect: Effect, toSelf = false): void {
  const [a, b] = world.units;
  applyEffect(world, a, toSelf ? a : b, effect, { scale: 1 });
}
