/** Rammus: the pinned 26.20 rework has resistance-derived AD and no E attack-speed buff. */
import type { KitModule } from "../../engine/kits/compile";
import { effectiveResist } from "../../engine/rules/damage";
import { canCast, canStartAttack, inAttackRange, inReach } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit } from "../../engine/sim/combat";
import { canMove, derive, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { areaAt, flat, FOREVER, ticks } from "./util";

const rammus: KitModule = {
  champion: "Rammus",
  build(kit) {
    const innate = kit.ability("Spiked Shell");
    const q = kit.ability("Powerball");
    const w = kit.ability("Defensive Ball Curl");
    const e = kit.ability("Frenzying Taunt");
    const r = kit.ability("Soaring Slam");
    const armorAD = innate.quoted("15% total armor and 15% total magic resistance", 0) / 100;
    const mrAD = innate.quoted("15% total armor and 15% total magic resistance", 1) / 100;
    const resistanceTotal = (unit: Unit) => {
      const d = derive(unit);
      return { armor: effectiveResist(d.armor, d.armorReduction), mr: effectiveResist(d.mr, d.mrReduction) };
    };
    const shellAmount = (unit: Unit) => {
      const resistance = resistanceTotal(unit);
      return armorAD * resistance.armor + mrAD * resistance.mr;
    };
    const qSeconds = q.quoted("channeling for up to 6 seconds");
    const qRecastDelay = q.quoted("Powerball can be recast after 1 second");
    const qRamp = q.levelValue("bonus total movement speed per second", 0) / 100;
    const qMaximum = q.levelValue("bonus total movement speed per second", 1) / 100;
    const qCollision = q.field("collisionRadius");
    const qRadius = q.field("effectRadius");
    const qDamage = q.formula("Magic Damage");
    const qKnockback = q.quoted("knocking them back 125 units");
    const qStun = q.quoted("stunned and revealed for 0.4 seconds");
    const qSlowSeconds = q.quoted("slowed for 1 second");
    const wSeconds = w.quoted("a defensive stance for 7 seconds");
    const wRecastDelay = w.quoted("Defensive Ball Curl can be recast after 1 second");
    const wArmor = w.baseOf("Bonus Armor");
    const wMR = w.baseOf("Bonus Magic Resistance");
    const wArmorShare = w.quoted("30 / 35 / 40 / 45 / 50% total armor", 4) / 100;
    const wMRShare = w.quoted("30 / 35 / 40 / 45 / 50% total magic resistance", 4) / 100;
    const reflectBase = w.quoted("are dealt 15 (+ 10% total armor) (+ 10% total magic resistance) magic damage", 0);
    const reflectArmor = w.quoted("are dealt 15 (+ 10% total armor) (+ 10% total magic resistance) magic damage", 1) / 100;
    const reflectMR = w.quoted("are dealt 15 (+ 10% total armor) (+ 10% total magic resistance) magic damage", 2) / 100;
    const reflected = { base: reflectBase, ratios: { armor: reflectArmor, MR: reflectMR } };
    const reflectionAmount = (unit: Unit) => {
      const resistance = resistanceTotal(unit);
      return reflectBase + reflectArmor * resistance.armor + reflectMR * resistance.mr;
    };
    const tauntRange = e.field("targetRange");
    const rRange = r.field("targetRange");
    const rRadius = r.field("effectRadius", "Impact radius");
    const rEpicenter = r.field("innerRadius");
    const rSpeed = r.field("speed", "Minimum dash speed");
    const rKnockup = r.quoted("knocked up for 0.75 seconds");
    const rSlowSeconds = r.quoted("slows them for 1.5 seconds");
    const aftershocks = r.quoted("3 aftershocks to burst from the area over 3.5 seconds", 0);
    const aftershockSeconds = r.quoted("3 aftershocks to burst from the area over 3.5 seconds", 1);
    const aftershockRadius = r.field("effectRadius", "Aftershock radius");
    const slow: Effect = { type: "cc", cc: "slow", strength: r.fraction("Slow"), duration: rSlowSeconds };
    q.quote("Powerball is not a movement channel, and so will not be interrupted by root and ground");
    q.quote("The bonus movement speed stacks multiplicatively with other sources of movement speed boosts");
    q.quote("Displacement immunity will also resist the application of the stun");
    // The percentage scales total resistances, the ability's own flat bonus included, recalculated as they change (26.21's notes).
    w.quote("combined with the total resists (excluding the stats from Mountainous Vigor) multiplied by the ability's percentage total resistances increase");
    w.quote("The resistances gained from Defensive Ball Curl's will recalculate over the duration");
    w.quote("Defensive Ball Curl will return damage from attacks and/or abilities that apply on-hit effects");
    e.quote("Monsters are additionally dealt magic damage");
    r.quote("Spell shield will block the impact (including with Powerball) but not each aftershock");
    r.quote("Soaring Slam will not impact nor generate aftershocks if the dash is interrupted");
    kit.assume("Powerball is a mobile channel, paths straight toward the only enemy in one dimension, and accelerates continuously using the wiki's level-20 40.8333% bonus total movement speed per second, capped at 245%. The game-file MinimumMoveSpeed extension differs slightly (40.7588% at level 20); the pinned wiki progression is used.");
    kit.assume("Powerball's 125-unit knockback takes 0.25 seconds because the source does not specify travel duration; its recorded estimated 0.4-second stun begins with the collision. Displacement immunity prevents this stun as well as the knockback, but leaves damage and slow intact.");
    kit.assume("Soaring Slam uses the source's base 800 range and minimum 900 dash speed. The source also lists movement-speed-dependent range and 2000 maximum speed without a complete dash-speed formula; those extensions are not inferred. The three aftershocks are evenly spaced across 3.5 seconds and refresh only the slow, as the pinned source specifies.");
    kit.assume("Soaring Slam's impact and aftershocks resolve at its landing location. All three aftershocks are created on landing even if the impact misses or is spell-shielded; an interrupted leap creates no aftershocks.");
    kit.assume("Frenzying Taunt affects an enemy champion, so its monster-only damage is excluded. The pinned reworked kit has no attack-speed steroid on E, no magic on-hit passive, and no Defensive Ball Curl self-slow or percentage damage reduction.");
    kit.assume("The behavior uses Powerball to engage and casts Soaring Slam during Powerball when available, then Defensive Ball Curl and Frenzying Taunt at close range. It preserves Defensive Ball Curl while fighting at attack range instead of immediately cancelling it for another Powerball.");
    kit.assume("The stat budget estimates Defensive Ball Curl at its 7/(7+7) uptime for resistance multiplication and reflected basic-attack damage. Its flat resistance gains and damage returned by the opponent's on-hit spells are resolved in the duel; those terms are not separately estimated by the stat budget.");

    const rolling = (unit: Unit) => unit.memory.powerballActive === true;
    const curling = (unit: Unit) => unit.statuses.some((s) => s.kind === "state" && s.key === "lingering" && s.ability === "W");
    const shell = (ctx: HookContext) => ctx.buff("spikedShell", "AD", shellAmount(ctx.self), FOREVER);
    const endCurl = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && ((s.kind === "stat" && s.memoKey?.startsWith("W:")) || (s.kind === "state" && s.ability === "W"))));
      shell(ctx);
    };
    const endBall = (ctx: HookContext) => {
      ctx.memory.powerballActive = false;
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "Q") ctx.self.action = undefined;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.ability === "Q"));
      ctx.buff("powerballSpeed", "moveSpeedPercent", 0, 0);
    };
    const finishSlam = (ctx: HookContext, landed: boolean) => {
      if (!ctx.memory.slamPending) return;
      ctx.memory.slamPending = false;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "ccImmune" && s.ability === "R"));
      endBall(ctx);
      if (landed) for (let i = 1; i <= aftershocks; i++) areaAt(ctx, "R-aftershock", ctx.self.x, aftershockRadius, i * aftershockSeconds / aftershocks, [slow]);
    };

    const powerball: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAfter: "state", chainCooldown: "first", cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "self" },
      channel: { duration: qSeconds, manualStart: true, interruptible: true, mobile: true },
      onSelf: [{ type: "state", state: "lingering", duration: qSeconds }],
      onHit: [
        { type: "damage", damageType: "magic", amount: qDamage },
        { type: "displace", direction: "away", distance: qKnockback, duration: 0.25 },
        { type: "cc", cc: "stun", duration: qStun },
        { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: qSlowSeconds },
      ],
      flags: { grounded: false }, roles: ["engage", "cc", "damage"],
    };
    const curl: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cooldownAfter: "state", chainCooldown: "first", cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" }, allowedDuringChannel: ["Q"],
      onSelf: [
        { type: "stat", stat: "armor", amount: flat(wArmor), duration: wSeconds },
        { type: "stat", stat: "MR", amount: flat(wMR), duration: wSeconds },
        { type: "stat", stat: "armorPercent", amount: flat(wArmorShare), duration: wSeconds },
        { type: "stat", stat: "mrPercent", amount: flat(wMRShare), duration: wSeconds },
        { type: "state", state: "lingering", duration: wSeconds },
      ],
      roles: ["buff", "defense"],
    };
    const taunt: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cancelOnInvalidTarget: true,
      delivery: { kind: "target", range: tauntRange },
      onHit: [{ type: "cc", cc: "taunt", duration: e.number("Taunt Duration") }],
    };
    const slam: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), allowedDuringChannel: ["Q"],
      delivery: { kind: "dash", direction: "toward", distance: rRange, speed: rSpeed, hitRadius: rRadius },
      onSelf: [{ type: "state", state: "ccImmune", duration: FOREVER }],
      onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }, slow],
      flags: { grounded: true, knockdown: false }, roles: ["engage", "damage", "cc"],
    };
    const abilities = [powerball, curl, taunt, slam, {
      key: "R-aftershock", name: `${r.name} (aftershock)`, slot: "R", cooldown: 0, castTime: 0,
      delivery: { kind: "self" }, usable: () => false, flags: { spellShield: false },
    } satisfies AbilitySpec, {
      key: "Q-end", name: `${q.name} (recast)`, slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" },
      chain: { root: "Q", index: 2, window: qSeconds, delay: qRecastDelay }, usable: rolling,
    } satisfies AbilitySpec, {
      key: "W-end", name: `${w.name} (recast)`, slot: "W", cooldown: 0, castTime: 0, delivery: { kind: "self" },
      chain: { root: "W", index: 2, window: wSeconds, delay: wRecastDelay }, usable: curling,
    } satisfies AbilitySpec];
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (mode === "idle") return undefined;
      const gap = Math.abs(self.x - enemy.x);
      if (rolling(self) && self.action?.kind === "channel" && self.action.ability === "Q") {
        if (mode === "fight" && canCast(world, self, slam) && gap <= rRange) return { kind: "cast", ability: "R" };
        return { kind: "move", direction: canMove(self) ? mode === "flee" ? -1 : 1 : 0 };
      }
      if (self.action && self.action.kind !== "windup") return defaultBehavior(view);
      if (mode === "fight" || mode === "trade") {
        if (canCast(world, self, powerball) && (!curling(self) || gap > tauntRange) && gap > qCollision + enemy.spec.base.radius) return { kind: "cast", ability: "Q" };
        if (canCast(world, self, curl) && gap <= qRadius + enemy.spec.base.radius) return { kind: "cast", ability: "W" };
        if (canCast(world, self, taunt)) return { kind: "cast", ability: "E" };
        if (canCast(world, self, slam) && inReach(slam, self, enemy)) return { kind: "cast", ability: "R" };
      }
      // The default must not activate Q merely because its delivery is self-targeted.
      const fallback = defaultBehavior(view);
      if (fallback?.kind === "cast" && fallback.ability === "Q" && curling(self)) {
        if (inAttackRange(self, enemy) && canStartAttack(world, self)) return { kind: "attack" };
        return { kind: "move", direction: canMove(self) ? mode === "flee" ? -1 : 1 : 0 };
      }
      return fallback;
    };
    const wUptime = wSeconds / (wSeconds + w.cooldown());
    return {
      abilities, behavior,
      budget: {
        totalResistanceMultipliers: { armor: 1 + wArmorShare * wUptime, mr: 1 + wMRShare * wUptime },
        damage(self, target) {
          const d = derive(self);
          return { physical: shellAmount(self) * d.attackSpeed * (1 + d.critChance * (d.critDamage - 1)), magic: reflectionAmount(self) * derive(target).attackSpeed * wUptime };
        },
      },
      hooks: {
        onStart: shell,
        onAttackLaunch: shell,
        onTick(ctx) {
          shell(ctx);
          const action = ctx.self.action;
          if (!rolling(ctx.self)) return;
          const channeling = action?.kind === "channel" && action.ability === "Q";
          const leaping = action?.kind === "dash" && action.ability === "R" && ctx.memory.slamPowered;
          if (!channeling && !leaping) {
            endBall(ctx);
            return;
          }
          const elapsed = (ctx.tick - Number(ctx.memory.powerballStart)) / 30;
          const share = Math.min(qMaximum, qRamp * elapsed);
          const otherBoost = ctx.self.statuses.filter((s) => s.kind === "stat" && s.key === "moveSpeedPercent" && s.memoKey !== "buff:powerballSpeed").reduce((sum, s) => sum + s.value, 0);
          ctx.buff("powerballSpeed", "moveSpeedPercent", share * (1 + otherBoost), qSeconds);
          if (channeling && Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= qCollision + 1e-9) {
            endBall(ctx);
            abilityHit(ctx.world, ctx.self, ctx.enemy, powerball, powerball.onHit!);
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "R") ctx.memory.slamPowered = rolling(ctx.self);
          if (ctx.ability.key === "Q" || ctx.ability.key === "R") endCurl(ctx);
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q-end") endBall(ctx);
          if (ctx.ability.key === "W-end") endCurl(ctx);
          if (ctx.ability.key === "Q") {
            ctx.memory.powerballActive = true;
            ctx.memory.powerballStart = ctx.tick;
            ctx.self.action = { kind: "channel", ability: "Q", startTick: ctx.tick, endTick: ctx.tick + ticks(qSeconds), nextTick: Infinity, intervalTicks: Infinity };
          }
          if (ctx.ability.key === "W") {
            endBall(ctx);
            shell(ctx);
          }
          if (ctx.ability.key === "R") {
            ctx.memory.slamPending = true;
            if (ctx.memory.slamPowered) {
              // Keep Q's post-effect cooldown held through the leap.
              for (const status of ctx.self.statuses) if (status.kind === "state" && status.ability === "Q") status.endTick = ctx.tick + ticks(rRange / rSpeed + 1 / 30);
            }
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q" && hasState(ctx.enemy, "displacementImmune")) return ctx.effects.filter((effect) => effect.type !== "displace" && !(effect.type === "cc" && effect.cc === "stun"));
          if (ctx.ability.key !== "R") return;
          const powered = ctx.memory.slamPowered;
          if (powered && Math.abs(ctx.self.x - ctx.enemy.x) <= rEpicenter + ctx.enemy.spec.base.radius + 1e-9) return [...ctx.effects, { type: "damage", damageType: "magic", amount: qDamage }, { type: "displace", direction: "away", distance: 0, duration: rKnockup }];
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "R") finishSlam(ctx, !ctx.interrupted);
        },
        onIncomingOnHit(ctx) {
          if (!curling(ctx.self)) return;
          ctx.apply({ type: "damage", damageType: "magic", amount: reflected, amountFor: reflectionAmount, label: w.name });
        },
        onDamageTaken: shell,
      },
    };
  },
};

export default rammus;
