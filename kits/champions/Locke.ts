/**
 * Locke (patch 26.20): Silver Stake's on-hit magic damage grows with the enemy's missing health;
 * Ritual Nails is thrown three times, stacking Soul Nails that slow harder and that his next
 * attack consumes for bonus damage; Soul Ignition speeds him up; Ashen Pursuit blinks and turns
 * his next attack into a long-range dash strike; Purgatory's totem marks the enemy to execute.
 */
import type { KitModule } from "../../engine/kits/compile";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, seriesAt, ticks } from "./util";

const NAILS = "locke:nails";
const PURGATORY = "locke:purgatory";

const locke: KitModule = {
  champion: "Locke",
  build(kit) {
    const p = kit.ability("Silver Stake");
    const q = kit.ability("Ritual Nails");
    const w = kit.ability("Soul Ignition");
    const e = kit.ability("Ashen Pursuit");
    const r = kit.ability("Purgatory");

    // Silver Stake: 44.1 (5 – 40 by level, 44.1 at 20) (+ 10% AP) magic on hit, up to double at 70% missing health.
    const stakeWords = "Locke's basic attacks deal 5 – 40 (based on level) (+ 10% AP) bonus magic damage on-hit";
    const stake: Formula = { base: p.levelValue(stakeWords, 0), ratios: { AP: p.quoted(stakeWords, 2) / 100 } };
    const stakeGrowth = p.seriesIn(stakeWords, 1);
    p.quote("up to 10 – 80 (based on level) (+ 20% AP)");
    const missingPercent = (target: Unit) => {
      const max = derive(target).maxHp;
      return max > 0 ? (100 * (max - target.hp)) / max : 0;
    };
    const stakeHit: Effect = {
      type: "damage", damageType: "magic", amount: stake, label: p.name,
      amountFor: (caster, target) => evaluate(stake, caster, target) * (1 + seriesAt(stakeGrowth, missingPercent(target), true) / 100),
    };

    // Ritual Nails: three nails within 4 s (0.5 s apart), each 72 (+ 20% AP), a 25% slow for 1 s (60% for 2 s from two Soul Nails) and a Soul Nail (4 s, up to 3).
    const nailWords = "Locke hurls a nail in the target direction that deals magic damage to enemies hit, slows them by 25% for 1 second, and applies a stack of Soul Nails for 4 seconds, refreshing on subsequent applications and stacking up to 3 times. Against targets with at least 2 stacks, the slow is increased to 60% and lasts for 2 seconds.";
    const nailSlow = q.quoted(nailWords, 0) / 100;
    const nailSlowSeconds = q.quoted(nailWords, 1);
    const nailSeconds = q.quoted(nailWords, 2);
    const maxNails = q.quoted(nailWords, 3);
    const heavyAt = q.quoted(nailWords, 4);
    const heavySlow = q.quoted(nailWords, 5) / 100;
    const heavySeconds = q.quoted(nailWords, 6);
    const recastWords = "Ritual Nails can be recast twice more within 4 seconds of the activation at no additional cost, with a 0.5-second static cooldown between casts.";
    const recastWindow = q.quoted(recastWords, 0);
    const recastDelay = q.quoted(recastWords, 1);
    const nail = q.formula("Magic Damage per Nail");
    // Unused recasts refund 35% (at 18; 36.8% at 20) of the cooldown and cost each.
    const refundShare = q.levelValue("For each recast not used when Ritual Nails ends", 0) / 100;
    // His next damaging attack or Ashen Pursuit consumes the Soul Nails for bonus magic damage.
    const consume: Formula[] = [q.formula("One Stack Bonus Damage"), q.formula("Two Stacks Bonus Damage"), q.formula("Three Stacks Bonus Damage")];
    q.quote("Locke's next damaging basic attack or Ashen Pursuit against an enemy with Soul Nails stacks consumes them all to deal bonus magic damage based on the amount of stacks.");

    // Soul Ignition: 6 s ghosted, 73.5% (40 – 70 by level, 73.5 at 20) attack speed and 40% (+ 2% per 100 AP) movement speed, decaying to 20% over 1 s after 1.5 s.
    const igniteWords = "Locke ignites his soul for 6 seconds, becoming ghosted and gaining 40 – 70 (based on level)% bonus attack speed and 40% (+ 2% per 100 AP) bonus movement speed, with the latter decaying to 20% over 1 second after 1.5 seconds have elapsed.";
    const igniteSeconds = w.quoted(igniteWords, 0);
    const igniteSpeed = w.levelValue(igniteWords, 0) / 100;
    const igniteMove: Formula = { base: w.quoted(igniteWords, 3) / 100, ratios: { AP: w.quoted(igniteWords, 4) / 100 / 100 } };
    const igniteFloor = w.quoted(igniteWords, 6) / 100;
    const igniteDecay = w.quoted(igniteWords, 7);
    const igniteHold = w.quoted(igniteWords, 8);

    // Ashen Pursuit: a blink of up to 375 for 80 (+ 40% AP) around him; 0.1 s later his next attack within 4 s gains 275 range and becomes a dash strike for 120 (+ 40% AP), with on-hit effects.
    const blinkRange = e.field("targetRange");
    const pursuitWords = "After a 0.1-second delay, he empowers his next attack command within 4 seconds to gain 275 bonus range and cause him to dash in the target's direction, dealing magic damage to nearby enemies along the way, and applying on-hit effects to the primary target hit.";
    const pursuitDelay = e.quoted(pursuitWords, 0);
    const pursuitWindow = e.quoted(pursuitWords, 1);
    const pursuitRange = e.quoted(pursuitWords, 2);
    const pursuitStrike = e.formula("Dash Magic Damage");
    e.quote("Does not count as a basic attack and will not trigger any basic attack-specific interactions");
    const blinkRadius = 250;
    kit.assume(`Ashen Pursuit's blink strikes within ${blinkRadius} of where Locke lands (the wiki gives no radius). Its dash strike replaces his next attack's damage and ends beside the enemy; it keeps that attack's timing.`);

    // Purgatory: a totem within 950 that lands after 0.5 s and 0.25 s later nails enemies within 400: 300 (+ 60% AP), a 99% slow decaying over 2 s, and a 5 s mark that executes below 12% of maximum health.
    const totemWords = "Locke throws a totem artifact that travels to the target location over 0.5 seconds. After landing for 0.25 seconds, the totem fires latching nails at nearby enemies";
    const totemDelay = r.quoted(totemWords, 0) + r.quoted(totemWords, 1);
    const markWords = "slowing them by 99% decaying over 2 seconds, revealing them for 1 second, and marking enemy champions hit for 5 seconds";
    const totemSlow = r.quoted(markWords, 0) / 100;
    const totemSlowSeconds = r.quoted(markWords, 1);
    const markSeconds = r.quoted(markWords, 3);
    const threshold: Formula = { base: 0, ratios: { targetMaxHP: r.baseOf("Execute Threshold") / 100 } };
    r.quote("Marked enemies are executed below a portion of their health.");
    kit.assume("Purgatory's slow decays in four steps over its 2 s, and no champion has been sealed before the duel (no Sealed Champion stacks).");

    const nailsOn = (enemy: Unit, self: Unit) => enemy.statuses.find((s) => s.kind === "mark" && s.key === NAILS && s.source === self.side && s.endTick > 0);
    const pursuing = (unit: Unit, tick: number) => tick >= Number(unit.memory["locke:pursuitFrom"] ?? Number.POSITIVE_INFINITY) && tick < Number(unit.memory["locke:pursuitUntil"] ?? -1);

    const nailSpec = (index: number): AbilitySpec => ({
      key: index === 1 ? "Q" : `Q${index}`, name: index === 1 ? q.name : `${q.name} (${index === 2 ? "second" : "third"} nail)`, slot: "Q",
      cooldown: index === 1 ? q.cooldown() : 0, cost: index === 1 ? q.cost() : 0, castTime: q.castTime(),
      ...(index === 1 ? { chainCooldown: "first" as const } : { chain: { root: "Q", index, window: recastWindow, delay: recastDelay } }),
      delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: nail, label: q.name }, { type: "cc", cc: "slow", strength: nailSlow, duration: nailSlowSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    });
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "state", state: "ghosted", duration: igniteSeconds }, { type: "stat", stat: "attackSpeed", amount: { base: igniteSpeed }, duration: igniteSeconds }],
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "blink", direction: "toward", distance: blinkRange, minDistance: 0, hitRadius: blinkRadius, hitCentered: true },
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Blink Magic Damage") }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["engage", "damage"],
    };
    const decaying: Effect[] = [0, 1, 2, 3].map((step): Effect => ({ type: "delayed", delay: (step * totemSlowSeconds) / 4, effects: [{ type: "cc", cc: "slow", strength: totemSlow * (1 - step / 4), duration: totemSlowSeconds / 4 }] }));
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "circle", range: r.field("targetRange"), radius: r.field("effectRadius"), delay: totemDelay },
      onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }, ...decaying, { type: "mark", key: PURGATORY, duration: markSeconds }],
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    const abilities = [nailSpec(1), nailSpec(2), nailSpec(3), wSpec, eSpec, rSpec];

    // His damaging attack (or dash strike) consumes the Soul Nails.
    const consumeNails = (ctx: HookContext) => {
      const stacks = nailsOn(ctx.enemy, ctx.self);
      if (!stacks) return;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== stacks);
      const formula = consume[Math.min(consume.length, Math.max(1, stacks.value)) - 1]!;
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: formula, label: `${q.name} (Soul Nails)` }, { scale: 1 });
    };

    const behavior: Behavior = (view) => defaultBehavior(view);

    return {
      abilities,
      attack: { onHit: [stakeHit] },
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory["locke:qFrom"] = ctx.tick;
            ctx.memory["locke:qCasts"] = 1;
          }
          if (key === "Q2" || key === "Q3") ctx.memory["locke:qCasts"] = Number(ctx.memory["locke:qCasts"] ?? 1) + 1;
          if (key === "W") ctx.memory["locke:igniteFrom"] = ctx.tick;
          if (key === "E") {
            ctx.memory["locke:pursuitFrom"] = ctx.tick + ticks(pursuitDelay);
            ctx.memory["locke:pursuitUntil"] = ctx.tick + ticks(pursuitDelay + pursuitWindow);
            ctx.buff("locke:pursuitRange", "attackRange", pursuitRange, pursuitDelay + pursuitWindow);
          }
        },
        onAbilityContact(ctx) {
          // A nail on an enemy that will hold two Soul Nails slows by 60% for 2 s.
          if (!ctx.ability.key.startsWith("Q") || ctx.enemy.petId !== undefined) return undefined;
          const after = Math.min(maxNails, (nailsOn(ctx.enemy, ctx.self)?.value ?? 0) + 1);
          if (after < heavyAt) return undefined;
          return ctx.effects.map((effect) => (effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: heavySlow, duration: heavySeconds } : effect));
        },
        onAbilityHit(ctx) {
          if (!ctx.ability.key.startsWith("Q") || ctx.enemy.petId !== undefined) return;
          const before = nailsOn(ctx.enemy, ctx.self);
          ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== before);
          ctx.apply({ type: "mark", key: NAILS, duration: nailSeconds, value: Math.min(maxNails, (before?.value ?? 0) + 1) });
        },
        onAttack(ctx) {
          // Ashen Pursuit's dash strike: its own magic damage in place of the attack's.
          if (!pursuing(ctx.self, ctx.tick)) return;
          ctx.action.baseDamage = { damageType: "magic", amount: pursuitStrike, label: `${e.name} (dash)` };
          ctx.action.attackTag = "locke:pursuit";
        },
        onAttackLaunch(ctx) {
          if (ctx.action.attackTag !== "locke:pursuit") return;
          delete ctx.memory["locke:pursuitUntil"];
          ctx.buff("locke:pursuitRange", "attackRange", 0, 0);
          // He dashes to the enemy's side.
          const from = ctx.self.x;
          const gap = Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius;
          if (gap > 0) {
            ctx.self.x += directionTo(ctx.self, ctx.enemy) * gap;
            notifyActualMovement(ctx.world, ctx.self, from, { kind: "dash", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "E" });
          }
        },
        onAttackHit(ctx) {
          if (ctx.blocked || ctx.enemy.petId !== undefined) return;
          consumeNails(ctx);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Soul Ignition's movement speed: 40% (+ 2% per 100 AP), decaying to 20% over 1 s after 1.5 s.
          const ignited = ctx.memory["locke:igniteFrom"];
          if (ignited !== undefined) {
            const age = (ctx.tick - Number(ignited)) / 30;
            const full = evaluate(igniteMove, self);
            const speed = age >= igniteSeconds ? 0 : age <= igniteHold ? full : full - (full - igniteFloor) * Math.min(1, (age - igniteHold) / igniteDecay);
            ctx.buff("locke:ignite", "moveSpeedPercent", speed, FOREVER);
            if (age >= igniteSeconds) delete ctx.memory["locke:igniteFrom"];
          }
          // Unused nails refund part of the cooldown and cost when the window closes.
          const from = ctx.memory["locke:qFrom"];
          if (from !== undefined && ctx.tick > Number(from) + ticks(recastWindow)) {
            const unused = 3 - Number(ctx.memory["locke:qCasts"] ?? 3);
            delete ctx.memory["locke:qFrom"];
            if (unused > 0) {
              applyEffect(ctx.world, self, self, { type: "refund", ability: "Q", fraction: refundShare * unused, total: true }, { scale: 1 });
              self.resource = Math.min(derive(self).maxResource, self.resource + refundShare * unused * Number(abilities[0]!.cost ?? 0));
            }
          }
          // Purgatory executes a marked enemy below 12% of its maximum health.
          const enemy = ctx.enemy;
          if (enemy.alive && enemy.statuses.some((s) => s.kind === "mark" && s.key === PURGATORY && s.source === self.side && s.endTick > ctx.tick)) {
            applyEffect(ctx.world, self, enemy, { type: "execute", threshold }, { scale: 1 });
          }
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          const haste = 1 + d.abilityHaste / 100;
          return { magic: (evaluate(consume[2]!, self, target) * haste) / abilities[0]!.cooldown + 0.5 * evaluate(stake, self, target) * d.attackSpeed };
        },
      },
    };
  },
};

export default locke;
