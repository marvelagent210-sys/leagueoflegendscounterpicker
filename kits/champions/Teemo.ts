/** Teemo: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import type { Effect } from "../../engine/sim/spec";
import { FOREVER } from "./util";

const teemo: KitModule = {
  champion: "Teemo",
  build(kit) {
    const q = kit.ability("Blinding Dart");
    const w = kit.ability("Move Quick");
    const e = kit.ability("Toxic Shot");
    const r = kit.ability("Noxious Trap");

    const calm = w.quoted("after 5 seconds without taking non-over time damage", 0);
    const passiveSpeed = w.fraction("Bonus Movement Speed");
    const sprintSeconds = w.quoted("for 3 seconds, preventing it from being removed", 0);
    const poisonSeconds = e.quoted("every second over 4 seconds", 0);
    const trapPoison: Effect = {
      type: "dot",
      damageType: "magic",
      total: r.formula("Total Magic Damage"),
      duration: r.quoted("every second over 4 seconds", 0),
      interval: 1,
    };
    const trap: Effect[] = [trapPoison, { type: "cc", cc: "slow", strength: r.fraction("Slow"), duration: r.quoted("slowing them for 4 seconds", 0) }];
    const trigger = r.field("collisionRadius", "Triggering radius");
    const arming = r.quoted("after arming over 1 second", 0);
    kit.assume("With the lane set up, one mushroom lies halfway between Teemo and his enemy when the fight starts.");
    kit.assume("Teemo drops mushrooms at his feet while his enemy chases him; Guerrilla Warfare's stealth isn't modeled.");

    const placeTrap = (world: Parameters<NonNullable<Behavior>>[0]["world"], side: 0 | 1, x: number, armed: boolean) => {
      world.zones.push({ id: world.nextId++, owner: side, kind: "trap", seenTick: world.tick, x, radius: trigger, startTick: world.tick + (armed ? 0 : Math.ceil(arming * 30)), endTick: FOREVER, onHit: trap });
    };

    const behavior: Behavior = (view) => {
      // A mushroom underfoot when the enemy comes after Teemo.
      const shroom = view.self.spec.abilities.find((a) => a.key === "R");
      if (shroom && view.enemy.moved === 1 && view.distance < 450 && view.distance > 150 && canCast(view.world, view.self, shroom)) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    return {
      attack: {
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage On-Hit") },
          { type: "dot", damageType: "magic", total: e.formula("Total Poison Damage"), duration: poisonSeconds, interval: 1 },
        ],
      },
      hooks: {
        onStart(ctx) {
          if (ctx.world.settings.environment.laneSetup) placeTrap(ctx.world, ctx.self.side, (ctx.self.x + ctx.enemy.x) / 2, true);
        },
        onTick(ctx) {
          const calmSince = Number(ctx.memory.hitTick ?? -1e9);
          const sprinting = ctx.tick < Number(ctx.memory.sprintUntil ?? -1);
          ctx.buff("moveQuick", "moveSpeedPercent", sprinting ? 0 : ctx.tick - calmSince >= calm * 30 ? passiveSpeed : 0, 1e9);
        },
        onDamageTaken(ctx) {
          ctx.memory.hitTick = ctx.tick;
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") ctx.memory.sprintUntil = ctx.tick + Math.ceil(sprintSeconds * 30);
          if (ctx.ability.key === "R") placeTrap(ctx.world, ctx.self.side, ctx.self.x, false);
        },
      },
      behavior,
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          delivery: { kind: "target", range: q.field("targetRange"), missileSpeed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") },
            { type: "cc", cc: "blind", duration: q.number("Blind Duration") },
          ],
          flags: { projectile: q.flag("projectile") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: w.fraction("Enhanced Bonus Movement Speed") }, duration: sprintSeconds }],
          roles: ["escape"],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.field("recharge"),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "self" },
          roles: ["defense"],
        },
      ],
    };
  },
};

export default teemo;
