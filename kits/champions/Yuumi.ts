/**
 * Yuumi (patch 26.20), alone: there is no ally to attach to, so You and Me! does nothing and
 * her spells keep their unattached forms. Feline Friendship periodically empowers an attack
 * that heals her; Prowling Projectile hits and slows; Zoomies shields and speeds her; Final
 * Chapter sends five waves that slow harder with each hit.
 */
import type { KitModule } from "../../engine/kits/compile";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import { FOREVER, ticks } from "./util";

const yuumi: KitModule = {
  champion: "Yuumi",
  build(kit) {
    const p = kit.ability("Feline Friendship");
    const q = kit.ability("Prowling Projectile");
    const w = kit.ability("You and Me!");
    const e = kit.ability("Zoomies");
    const r = kit.ability("Final Chapter");

    // Feline Friendship: every 8 s (20 – 8 by level), her next attack on a champion gains 50 range and an uncancellable windup; it, or Prowling Projectile, heals her for 120.6 (20 – 110 by level) (+ 30% AP).
    const friendshipEvery = p.field("staticCooldown");
    const friendWords = "Periodically, Yuumi's next basic attack against an enemy champion is empowered to have an uncancellable windup, gain 50 bonus range and become non-projectile.";
    const friendRange = p.quoted(friendWords, 0);
    const healWords = "Upon hitting them with the basic attack or Prowling Projectile, or upon a Final Chapter hit on ally champions while attached, the buff is consumed to heal her for 20 – 110 (based on level) (+ 30% AP).";
    const friendHeal: Formula = { base: p.levelValue("Upon hitting them with the basic attack or Prowling Projectile", 0), ratios: { AP: p.quoted(healWords, 2) / 100 } };

    // You and Me!: attaching needs an allied champion.
    w.quote("Yuumi channels for 0.25 seconds, then upon completion dashes to the target allied champion and attaches to them upon arrival");
    kit.assume("A duel has no allied champion for You and Me!, so Yuumi stays unattached: her spells keep their unattached forms and Best Friend bonuses never apply.");

    // Prowling Projectile: a missile (850, 120, 950) for 235 (+ 20% AP) to the first enemy hit, slowing a champion by 20% for 1 s.
    const prowlWords = "If the target is a champion, they are also revealed and slowed by 20% for 1 second.";
    const prowlSlow = q.quoted(prowlWords, 0) / 100;
    const prowlSlowSeconds = q.quoted(prowlWords, 1);

    // Zoomies: a 165 (+ 40% AP) shield and 35% (+ 8% per 100 AP) attack speed for 3 s; 20% movement speed while the shield holds.
    const zoomWords = "Yuumi grants herself a shield and gains bonus attack speed for 3 seconds. She also gains 20% bonus movement speed while the shield holds.";
    const zoomSeconds = e.quoted(zoomWords, 0);
    const zoomMove = e.quoted(zoomWords, 1) / 100;
    const speedWords = "Bonus Attack Speed: 25 / 27.5 / 30 / 32.5 / 35% (+ 8% per 100 AP)";
    const zoomSpeed: Formula = { base: e.baseOf("Bonus Attack Speed") / 100, ratios: { AP: e.quoted(speedWords, 5) / 100 / 100 } };

    // Final Chapter: up to 3.5 s ghosted, walking, sending 5 waves (1100, 450 wide): 175 (+ 25% AP), then 25% of it; each hit slows 10% more (up to 50%) for 1.25 s.
    const chapterWords = "Yuumi and Book channel for up to 3.5 seconds, during which they are ghosted, to launch 5 magical waves in the target direction.";
    const chapterSeconds = r.quoted(chapterWords, 0);
    const waves = r.quoted(chapterWords, 1);
    const slowWords = "Enemies struck by the waves take magic damage and are slowed by 10% for 1.25 seconds. The slow stacks and refreshes on subsequent hits, up to a total strength of 50%. Subsequent waves against enemies hit deal 25% damage.";
    const slowStep = r.quoted(slowWords, 0) / 100;
    const slowSeconds = r.quoted(slowWords, 1);
    const slowMost = r.quoted(slowWords, 2) / 100;
    const firstWave = r.formula("Magic Damage per Hit");
    const laterWave = r.formula("Reduced Damage per Hit");
    r.quote("While not attached, Yuumi can move while channeling Final Chapter.");
    kit.assume("Final Chapter's waves fire evenly over its 3.5 s and reach an enemy within 1100 of Yuumi along the duel's line.");

    const friendly = (ctx: HookContext) => ctx.tick >= Number(ctx.memory["yuumi:friendReady"] ?? 0);
    const consumeFriendship = (ctx: HookContext) => {
      if (!friendly(ctx)) return;
      ctx.memory["yuumi:friendReady"] = ctx.tick + ticks(friendshipEvery);
      ctx.buff("yuumi:friendRange", "attackRange", 0, 0);
      ctx.apply({ type: "heal", amount: { base: evaluate(friendHeal, ctx.self) } }, true);
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed", "Missile speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: prowlSlow, duration: prowlSlowSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "shield", amount: e.formula("Shield"), duration: zoomSeconds }, { type: "stat", stat: "attackSpeed", amount: zoomSpeed, duration: zoomSeconds }],
      // A shield with attack speed: used in the fight, not held back for a threat.
      roles: ["buff"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      onCastStart: [{ type: "state", state: "ghosted", duration: chapterSeconds }],
      delivery: { kind: "self" },
      channel: {
        duration: chapterSeconds, pulses: { base: waves }, interruptible: true, mobile: true, range: r.field("targetRange"),
        onTick: [{ type: "damage", damageType: "magic", amount: firstWave, label: r.name }],
      },
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };

    const behavior: Behavior = (view) => defaultBehavior(view);

    return {
      abilities: [qSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "R") ctx.memory["yuumi:waves"] = 0;
        },
        onAbilityContact(ctx) {
          // Each wave after the first deals 25%, and the slow grows 10% a hit up to 50%.
          if (ctx.ability.key !== "R" || ctx.enemy.petId !== undefined) return undefined;
          const hits = Number(ctx.memory["yuumi:waves"] ?? 0) + 1;
          ctx.memory["yuumi:waves"] = hits;
          return [
            { type: "damage", damageType: "magic", amount: hits === 1 ? firstWave : laterWave, label: r.name },
            { type: "cc", cc: "slow", strength: Math.min(slowMost, slowStep * hits), duration: slowSeconds },
          ];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q" && ctx.enemy.petId === undefined) consumeFriendship(ctx);
        },
        onAttack(ctx) {
          if (friendly(ctx) && ctx.targetPet === undefined) ctx.action.uncancellable = true;
        },
        onAttackHit(ctx) {
          if (!ctx.blocked && ctx.enemy.petId === undefined) consumeFriendship(ctx);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Feline Friendship's 50 range while it is ready; Zoomies' speed while its shield holds.
          ctx.buff("yuumi:friendRange", "attackRange", friendly(ctx) ? friendRange : 0, FOREVER);
          const zooming = self.statuses.some((s) => s.kind === "shield" && s.key === "E" && s.value > 0 && s.endTick > ctx.tick);
          ctx.buff("yuumi:zoom", "moveSpeedPercent", zooming ? zoomMove : 0, FOREVER);
        },
      },
      budget: {
        healing(self) {
          return evaluate(friendHeal, self) / friendshipEvery;
        },
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { magic: ((evaluate(firstWave, self, target) + (waves - 1) * evaluate(laterWave, self, target)) * haste) / rSpec.cooldown };
        },
      },
    };
  },
};

export default yuumi;
