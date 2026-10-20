/** Lux's level-20 kit, compiled from the committed ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { Status, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const markOf = (target: Unit, side: Unit["side"]): Status | undefined => target.statuses.find((s) => s.kind === "mark" && s.key === "illumination" && s.source === side);

/** The wand shares the ordinary missiles' wall/aura checks but never hits the enemy. */
function wandBlocked(world: World, enemy: Unit, from: number, to: number): boolean {
  for (const zone of world.zones) {
    if (zone.kind === "projectileWall" && zone.owner === enemy.side && zone.startTick <= world.tick && world.tick < zone.endTick && (from - zone.x) * (to - zone.x) <= 0) return true;
  }
  return enemy.statuses.some((s) => s.kind === "state" && s.key === "projectileBlock" && s.endTick > world.tick && Math.abs(enemy.x - to) <= enemy.spec.base.radius + s.value);
}

const lux: KitModule = {
  champion: "Lux",
  build(kit) {
    const passive = kit.ability("I");
    const q = kit.ability("Q");
    const w = kit.ability("W");
    const e = kit.ability("E");
    const r = kit.ability("R");
    const markSeconds = passive.quoted("apply a mark to enemies hit for 6 seconds");
    const passiveBase = passive.levelValue("bonus magic damage");
    const passiveRatio = passive.quoted("(+ 35% AP) bonus magic damage") / 100;
    const illumination = { base: passiveBase, ratios: { AP: passiveRatio } };
    const windupGrace = passive.quoted("refreshes its duration to 0.25 seconds");
    const laserGrace = passive.quoted("refreshes the marks of all marked enemies to 1.25 seconds");
    const laserGraceRange = passive.quoted("within 5000 units");
    const laserGraceThreshold = passive.quoted("remaining duration of less than 1 second");
    passive.quote("Illumination will be consumed but not deal any damage if the basic attack is blocked");
    passive.quote("Illumination will not be consumed if the basic attack misses due to blind");
    passive.quote("Illumination will not be consumed if the basic attack misses due to dodge");
    passive.quote("Spell shield prevents Final Spark from consuming the mark");

    const shield = w.formula("Shield Strength");
    const shieldSeconds = w.quoted("gain a shield for 2.5 seconds");
    const wandRange = w.field("range");
    const wandSpeed = w.field("speed", "Original speed");
    w.quote("Lux gains the shield upon throwing and upon retrieving the wand");
    w.quote("stacking with the previous shield and refreshing its duration");
    w.quote("Lux's wand decelerates on the way out and accelerates on the way back");
    w.quote("Prismatic Barrier is destroyed by Wind Wall, Blade Whirl, and Rebuttal but not Unbreakable");
    e.quote("If Lucent Singularity was recast while in flight, it will detonate upon arrival");
    r.quote("This ability will cast from wherever the caster is at the start of the cast time");
    r.quote("a massive light beam in a line in the target direction");
    kit.assume("Prismatic Barrier protects Lux herself; the duel has no allied champions. Its wand travels at the recorded original speed of 2400 units/s on both passes because the committed source does not give the acceleration curve.");
    kit.assume("Lux immediately recasts Lucent Singularity while it is in flight, so its explosion and 1-second slow occur on arrival; she does not hold the 5-second field in this duel policy.");
    kit.assume("Light Binding hits the opposing champion without minion collision; its second-target allowance is irrelevant in a champion-only duel. Its range field has unlabeled values 1300 and 1240; the first is used for cast and missile range.");
    kit.assume("Vision is not modeled. Final Spark retains its cast-start position and firing direction on the simulator's line.");

    const mark: Effect = { type: "mark", key: "illumination", duration: markSeconds };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "line", range: q.fieldValues("range")[0]!, width: q.field("width"), speed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "root", duration: q.quoted("roots them for 2 seconds") }, mark],
        flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, decisive: true,
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        delivery: { kind: "self" }, roles: ["defense"],
        onCastStart: [{ type: "shield", amount: shield, duration: shieldSeconds }],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cooldownAtCastStart: true, cost: e.cost(), castTime: e.castTime(),
        delivery: { kind: "circle", range: e.field("targetRange"), radius: e.field("effectRadius", "Singularity radius"), delay: 0, speed: e.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: e.fraction("Slow"), duration: e.quoted("also slowed by the same amount for 1 second") }, mark],
        flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") }, decisive: true,
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
        castOrigin: "start", castDirection: "start",
        delivery: { kind: "line", range: r.field("range"), width: r.field("width") },
        onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }, mark],
        flags: { projectile: r.flag("projectile"), spellShield: r.flag("spellShield") }, decisive: true,
      },
    ];
    const wand = abilities.find((a) => a.key === "W")!;
    const behavior: Behavior = (view) => {
      const shielded = view.self.statuses.some((s) => s.kind === "shield" && s.key === "W" && s.source === view.self.side && s.value > 0 && s.endTick > view.world.tick);
      if (view.mode !== "idle" && !shielded && canCast(view.world, view.self, wand) && view.threats.some((t) => t.damage > 0 && t.eta > 0 && t.eta < ticks(shieldSeconds))) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };
    return {
      abilities,
      behavior,
      attack: { onHit: [{ type: "damage", damageType: "magic", amount: illumination, amountFor: (self, target) => markOf(target, self.side) ? evaluate(illumination, self, target) : 0, noLifeSteal: true, label: passive.name }] },
      budget: {
        // The conditional on-hit is zero on an unmarked budgeting target. Value procs from
        // each damaging cast, bounded by the attack/laser opportunities to consume them.
        damage: (self, target) => {
          const haste = 1 + derive(self).abilityHaste / 100;
          const casts = abilities.filter((a) => a.key !== "W").reduce((sum, a) => sum + 1 / (a.cooldown / haste + a.castTime), 0);
          const laser = abilities.find((a) => a.key === "R")!;
          const laserRate = 1 / (laser.cooldown / haste + laser.castTime);
          return { magic: evaluate(illumination, self, target) * Math.min(casts, derive(self).attackSpeed + laserRate) };
        },
        healing: (self) => 2 * evaluate(shield, self) / (wand.cooldown / (1 + derive(self).abilityHaste / 100) + wand.castTime),
      },
      hooks: {
        onAttack(ctx) {
          const marked = markOf(ctx.enemy, ctx.self.side);
          if (marked && marked.endTick > ctx.tick) marked.endTick = Math.max(marked.endTick, ctx.tick + ticks(windupGrace));
        },
        onAttackResolved(ctx) {
          if (!ctx.missed) ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== markOf(ctx.enemy, ctx.self.side));
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "R" && markOf(ctx.enemy, ctx.self.side)) return [{ type: "damage", damageType: "magic", amount: illumination, label: passive.name }, ...ctx.effects];
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key === "R") ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== markOf(ctx.enemy, ctx.self.side));
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "R") {
            const marked = markOf(ctx.enemy, ctx.self.side);
            if (marked && marked.endTick > ctx.tick && marked.endTick - ctx.tick < ticks(laserGraceThreshold) && Math.abs(ctx.enemy.x - ctx.self.x) <= laserGraceRange) marked.endTick = ctx.tick + ticks(laserGrace);
          }
          if (ctx.ability.key === "W") {
            ctx.memory.wandX = ctx.self.x;
            ctx.memory.wandOrigin = ctx.self.x;
            ctx.memory.wandDirection = directionTo(ctx.self, ctx.enemy);
            ctx.memory.wandReturn = false;
            ctx.memory.wandTick = ctx.tick;
          }
        },
        onTick(ctx) {
          if (ctx.memory.wandX === undefined || ctx.tick <= Number(ctx.memory.wandTick)) return;
          const from = Number(ctx.memory.wandX);
          const returning = ctx.memory.wandReturn === true;
          const destination = returning ? ctx.self.x : Number(ctx.memory.wandOrigin) + Number(ctx.memory.wandDirection) * wandRange;
          const to = from + Math.sign(destination - from) * Math.min(wandSpeed / 30, Math.abs(destination - from));
          if (wandBlocked(ctx.world, ctx.enemy, from, to)) {
            delete ctx.memory.wandX;
            ctx.log("Prismatic Barrier's wand is destroyed");
            return;
          }
          ctx.memory.wandX = to;
          if (to !== destination) return;
          if (!returning) { ctx.memory.wandReturn = true; return; }
          // The second pass preserves any remaining first-pass shield and refreshes both.
          for (const status of ctx.self.statuses) if (status.kind === "shield" && status.key === "W" && status.source === ctx.self.side) status.endTick = ctx.tick + ticks(shieldSeconds);
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "shield", amount: shield, duration: shieldSeconds }, { ability: wand, scale: 1 });
          delete ctx.memory.wandX;
          ctx.log("Prismatic Barrier's wand returns");
        },
      },
    };
  },
};

export default lux;
