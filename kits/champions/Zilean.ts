/**
 * Zilean (patch 26.20): Time Bomb sticks to the enemy and explodes 3 s later, and a second
 * bomb on it detonates the first at once, stunning; Rewind takes 10 s off Time Bomb and Time
 * Warp, so the second bomb comes quickly. Time Warp slows the enemy by 99%, or hastens Zilean,
 * and Chronoshift brings him back from fatal damage.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, addStatus, beginResurrection } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const BOMB = "zilean:bomb";

const zilean: KitModule = {
  champion: "Zilean",
  build(kit) {
    const p = kit.ability("Time in a Bottle");
    const q = kit.ability("Time Bomb");
    const w = kit.ability("Rewind");
    const e = kit.ability("Time Warp");
    const r = kit.ability("Chronoshift");

    // Time in a Bottle: experience for allies, nothing at level 20.
    p.quote("becomes disabled when Zilean and his allied champions have reached their maximum level");
    kit.assume("Time in a Bottle is disabled at level 20 (every champion is at its maximum level), so it does nothing in a duel.");

    // Time Bomb: a bomb within 900 that sticks to the enemy at its 140 epicenter and explodes 3 s later for 300 (+ 90% AP) within 350; a second bomb detonates it at once and stuns for 1.5 s.
    const fuse = q.quoted("After 3 seconds, or when the attached unit dies, the bomb explodes to deal magic damage to nearby enemies.", 0);
    const blast = q.formula("Magic Damage");
    const stun = q.number("Stun Duration");
    q.quote("The bomb detonates immediately if another bomb attaches itself to the same unit, stunning nearby enemies for a duration.");
    q.quote("The bomb will attach itself to units that move within the epicenter, or those hit directly at the time of the bomb's landing");
    q.quote("Time Bomb can deal damage to the enemy holder through untargetablility.");
    q.quote("Spell shield will prevent the application of Time Bomb and its detonation damage as well as block the stun");
    const flight = 0.5;
    kit.assume(`Time Bomb lands ${flight} s after it is thrown (the wiki gives no speed) and sticks to the enemy if its center is within the 140 epicenter; one that lands beside the enemy explodes on the ground and is left out. A second bomb detonates the first: one explosion, plus the stun.`);

    // Rewind: 10 s off Time Bomb's and Time Warp's cooldowns; one of them must be on cooldown.
    const rewind = w.quoted("Zilean reduces the remaining cooldowns of Time Bomb and Time Warp by 10 seconds each.", 0);
    w.quote("Either Time Bomb or Time Warp must be on cooldown to cast this ability.");

    // Time Warp: 2.5 s of a 99% slow on the enemy, or 99% movement speed for Zilean.
    const warpSeconds = e.quoted("Zilean applies Time Warp to the target champion which lasts for 2.5 seconds.", 0);
    const warp = e.fraction("Movement Speed Modifier");
    e.quote("If the target is an ally, they gain bonus movement speed. If the target is an enemy, they are slowed.");
    kit.assume("Zilean can be his own ally for Time Warp's movement speed.");

    // Chronoshift: a 5 s rune; fatal damage under it is 3 s of resurrection, then a revival healed for 1100 (+ 200% AP).
    const runeSeconds = r.quoted("Zilean places a protective time rune on the target allied champion or himself for 5 seconds.", 0);
    const reviveSeconds = r.quoted("If the target takes fatal damage within the duration, they enter resurrection for 3 seconds, becoming invulnerable, untargetable, and unable to act.", 0);
    const revive = r.formula("Heal");

    const bombed = (enemy: Unit, self: Unit) => enemy.statuses.some((s) => s.kind === "mark" && s.key === BOMB && s.source === self.side);
    const timeReady = (unit: Unit, key: string, tick: number) => Number(unit.cooldownReady[key] ?? 0) <= tick;

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("collisionRadius"), delay: flight },
      // The mark outlasts the fuse by a moment, so the explosion still finds it.
      onHit: [{ type: "mark", key: BOMB, duration: fuse + 0.1 }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    // The bomb's explosion: it reaches the holder through untargetability, and spell shields block it.
    const explosion: AbilitySpec = {
      key: "QX", name: q.name, slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" },
      flags: { spellShield: true, hitsUntargetable: true },
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      usable: (unit, world) => !timeReady(unit, "Q", world.tick) || !timeReady(unit, "E", world.tick),
      delivery: { kind: "self" },
      onSelf: [{ type: "refund", ability: "Q", seconds: rewind }, { type: "refund", ability: "E", seconds: rewind }],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "target", range: e.field("targetRange") },
      onHit: [{ type: "cc", cc: "slow", strength: warp, duration: warpSeconds }],
      flags: { spellShield: e.flag("spellShield") ?? true, projectile: false },
      roles: ["cc"],
    };
    const esSpec: AbilitySpec = {
      key: "ES", name: `${e.name} (self)`, slot: "E", cooldown: e.cooldown(), cooldownKey: "E", cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: warp }, duration: warpSeconds }],
      roles: ["escape"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "mark", key: "zilean:rune", duration: runeSeconds }],
      roles: ["defense"],
    };

    const explode = (ctx: HookContext, stuns: boolean) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === BOMB && s.source === ctx.self.side));
      delete ctx.memory["zilean:fuse"];
      const effects: Effect[] = [{ type: "damage", damageType: "magic", amount: blast, label: q.name }];
      if (stuns) effects.push({ type: "cc", cc: "stun", duration: stun });
      abilityHit(ctx.world, ctx.self, ctx.enemy, explosion, effects);
    };
    const runed = (unit: Unit, tick: number) => unit.statuses.some((s) => s.kind === "mark" && s.key === "zilean:rune" && s.endTick > tick);

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (view.mode === "idle") return undefined;
      // Chronoshift on himself when the fight has him low.
      if (canCast(world, self, rSpec) && !runed(self, world.tick) && self.hp <= 0.3 * derive(self).maxHp && Math.abs(enemy.x - self.x) <= 1200) return { kind: "cast", ability: "R" };
      // Time Warp on himself to get away.
      if ((view.mode === "flee" || view.mode === "kite") && canCast(world, self, esSpec)) return { kind: "cast", ability: "ES" };
      // Rewind for the second bomb, once the first is on the enemy.
      if (bombed(enemy, self) && !timeReady(self, "Q", world.tick) && canCast(world, self, wSpec)) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, esSpec, rSpec],
      behavior,
      hooks: {
        onAbilityContact(ctx) {
          // A second bomb on the enemy detonates the first at once, stunning.
          if (ctx.ability.key !== "Q" || ctx.enemy.petId !== undefined || !bombed(ctx.enemy, ctx.self) || ctx.defense) return undefined;
          explode(ctx, true);
          return [];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q" && ctx.enemy.petId === undefined) ctx.memory["zilean:fuse"] = ctx.tick + ticks(fuse);
        },
        onTick(ctx) {
          const at = ctx.memory["zilean:fuse"];
          if (at === undefined || ctx.tick < Number(at)) return;
          if (bombed(ctx.enemy, ctx.self)) explode(ctx, false);
          else delete ctx.memory["zilean:fuse"];
        },
        onLethal(ctx) {
          if (!runed(ctx.self, ctx.tick)) return false;
          if (!beginResurrection(ctx.world, ctx.self, { duration: reviveSeconds, ability: "R" })) return false;
          const self = ctx.self;
          self.statuses = self.statuses.filter((s) => !(s.kind === "mark" && s.key === "zilean:rune"));
          const end = self.resurrection!.endTick;
          for (const state of ["untargetable", "invulnerable"] as const) addStatus(self, { kind: "state", key: state, source: self.side, startTick: ctx.tick, endTick: end, value: 0, ability: "engine:resurrection" });
          // He revives with the heal (regeneration is off meanwhile).
          self.hp = Math.min(derive(self).maxHp, evaluate(revive, self));
          ctx.log("enters Chronoshift's resurrection");
          return true;
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { magic: (evaluate(blast, self, target) * haste) / qSpec.cooldown };
        },
        healing(self) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return (evaluate(revive, self) * haste) / rSpec.cooldown;
        },
      },
    };
  },
};

export default zilean;
