/** Master Yi: four Alpha marks, Double Strike and the two phases of Meditate. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, canStartAttack, startAttack } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, dealDamage, directionTo, inStasis, isUntargetable, log, notifyIncomingOnHit } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { attackDamage, extraAttacks, missingShare, seriesAt, ticks } from "./util";

const yi: KitModule = {
  champion: "MasterYi",
  build(kit) {
    const passive = kit.ability("Double Strike");
    const q = kit.ability("Alpha Strike");
    const w = kit.ability("Meditate");
    const e = kit.ability("Wuju Style");
    const r = kit.ability("Highlander");
    const stackWindow = passive.quoted("generate a stack of Double Strike for 4 seconds", 0);
    const stacksMax = passive.quoted("stacking up to 3 times", 0);
    const secondShare = passive.quoted("the second strike dealing 50% AD physical damage", 0) / 100;
    const markGap = q.quoted("After 0.231", 0);
    const marks = q.quoted("recurring every 0.231 up to 3 times", 1) + 1;
    const exitOffset = q.quoted("Master Yi reappears 75 units", 0);
    const exitLock = q.quoted("becomes able to act again after 0.165", 0);
    const followLimit = q.quoted("Alpha Strike can only follow up-to 2000 units", 0);
    const primary = q.formula("Primary Physical Damage");
    const lesser = q.formula("Reduced Damage per hit");
    const alphaCrit = q.quoted("can critically strike for 200% damage", 0) / 100;
    const firstOnHit = q.quoted("with on-hit damage reduced to 75% effectiveness", 0) / 100;
    const laterOnHit = q.quoted("with on-hit damage reduced to 18.75% effectiveness", 0) / 100;
    const refund = q.quoted("reduce Alpha Strike's current cooldown by 1 second", 0);
    q.quote("Each time Alpha Strike hits a target, the current durations of Wuju Style and Highlander are refreshed");
    q.quote("does not trigger its cooldown reduction nor grant a stack of Double Strike");
    q.quote("On-hit damage applied by Alpha Strike will be negated by dodge and block, but not while Master Yi is blinded");
    const meditateSeconds = w.quoted("channels for up to 4 seconds", 0);
    const healEvery = w.quoted("healing himself every 0.5 seconds", 0);
    const healMinimum = w.formula("Minimum Heal Per Tick");
    const missingHealing = w.seriesIn("based on missing health");
    const reductionEarly = w.quoted("gains 70% damage reduction for the first 0.5 seconds", 0) / 100;
    const earlySeconds = w.quoted("gains 70% damage reduction for the first 0.5 seconds", 1);
    const reductionLater = w.fraction("Modified Damage Reduction");
    const reductionLinger = w.quoted("lingers for 0.5 seconds after the channel ends", 0);
    const wujuSeconds = e.quoted("within the next 5 seconds", 0);
    const wuju = e.formula("Bonus True Damage");
    const highlanderSeconds = r.quoted("For the next 7 seconds", 0);
    const highlanderSpeed = r.fraction("Bonus Attack Speed");
    const highlanderMove = r.fraction("Bonus Movement Speed");
    const takedownRefund = r.quoted("by 70%", 0) / 100;
    const takedownExtension = r.quoted("extends Highlander's duration by 7 seconds", 0);
    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown();
    // The structured cost contains only the initial 40. The continuing drain is in the
    // committed field text, which is checked rather than inferred from the champion's mana.
    const costType = w.record.fields.costType;
    if (typeof costType !== "string") throw new Error("Meditate has no resource cost type");
    const continuingCost = /\(\+ ([\d.]+)% maximum mana per second\)/.exec(costType);
    if (!continuingCost?.[1]) throw new Error("Meditate's continuing mana cost changed");
    const manaPerSecond = Number(continuingCost[1]) / 100;
    kit.evidence.push({ ability: w.name, page: w.record.page.title, revid: w.record.page.revid, text: `costType: ${costType}` });
    w.quote("grants one stack of Double Strike per second during the channel");
    kit.assume("Alpha Strike marks the opposing champion four times; summoned units are not selected as extra bounce targets in this 1v1 model.");
    kit.assume("Alpha Strike exits 75 units on the near side of its primary target, without a player-selected exit direction.");
    kit.assume("Double Strike's second hit resolves immediately after the first; its unspecified animation delay and retargeting after a champion kill are not simulated.");
    kit.assume("Meditate's first heal occurs after 0.5 seconds; the wiki allows a variable first-tick phase, so an instant cancel never guarantees a heal here.");
    kit.assume("Highlander's takedown rewards apply on lethal champion damage; the engine does not expose a separate takedown event when a champion immediately enters a post-death fighting form.");

    const remaining = (ctx: HookContext) => ctx.tick < Number(ctx.memory.doubleUntil ?? -1) ? Number(ctx.memory.doubleStacks ?? 0) : 0;
    const gainStack = (ctx: HookContext) => {
      ctx.memory.doubleStacks = Math.min(stacksMax, remaining(ctx) + 1);
      ctx.memory.doubleUntil = ctx.tick + ticks(stackWindow);
    };
    const extendOwn = (ctx: HookContext, ability: string, until: number) => {
      for (const status of ctx.self.statuses) if (status.source === ctx.self.side && (status.ability === ability || status.memoKey?.startsWith(`${ability}:`))) status.endTick = until;
    };
    const refreshCombatBuffs = (ctx: HookContext) => {
      if (ctx.tick < Number(ctx.memory.wujuUntil ?? -1)) ctx.memory.wujuUntil = ctx.tick + ticks(wujuSeconds);
      if (ctx.tick < Number(ctx.memory.highlanderUntil ?? -1)) {
        ctx.memory.highlanderUntil = ctx.tick + ticks(highlanderSeconds);
        extendOwn(ctx, "R", Number(ctx.memory.highlanderUntil));
      }
    };
    const onHitDamage = (ctx: HookContext, scale = 1) => {
      if (ctx.tick < Number(ctx.memory.wujuUntil ?? -1)) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "true", amount: wuju, noLifeSteal: true, label: e.name }, { attack: true, scale });
    };
    const setReduction = (ctx: HookContext, value: number, until: number) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "yi:meditateReduction");
      if (until > ctx.tick) ctx.self.statuses.push({ kind: "state", key: "damageReduction", source: ctx.self.side, startTick: ctx.tick, endTick: until, value, memoKey: "yi:meditateReduction" });
    };
    const finishMeditate = (ctx: HookContext) => {
      if (!ctx.memory.meditating) return;
      ctx.memory.meditating = false;
      setReduction(ctx, Number(ctx.memory.meditateReduction ?? reductionEarly), ctx.tick + ticks(reductionLinger));
    };
    const takedown = (ctx: HookContext) => {
      if (ctx.enemy.hp > 0 || ctx.memory.takedownPaid) return;
      ctx.memory.takedownPaid = true;
      for (const key of ["Q", "W", "E"]) ctx.apply({ type: "refund", ability: key, fraction: takedownRefund }, true);
      if (ctx.tick < Number(ctx.memory.highlanderUntil ?? -1)) {
        ctx.memory.highlanderUntil = Number(ctx.memory.highlanderUntil) + ticks(takedownExtension);
        extendOwn(ctx, "R", Number(ctx.memory.highlanderUntil));
      }
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), delivery: { kind: "target", range: q.field("targetRange") }, flags: { grounded: true, spellShield: true }, channel: { duration: marks * markGap + exitLock, interruptible: false, manualStart: true }, roles: ["damage", "defense"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, onSelf: [{ type: "resetAttack" }], channel: { duration: meditateSeconds, interruptible: true }, roles: ["defense"] },
      { key: "W2", name: `${w.name} (cancel)`, slot: "W", cooldown: 0, castTime: 0, delivery: { kind: "self" }, chain: { root: "W", index: 2, window: meditateSeconds }, usable: (unit) => unit.action?.kind === "channel" && unit.action.ability === "W", roles: ["defense"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, overlay: true, overlayChannels: ["Q"], preserveAttackWindup: true, usable: (unit, world) => world.tick >= Number(unit.memory.wujuUntil ?? -1), roles: ["damage"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, overlay: true, overlayChannels: ["Q"], preserveAttackWindup: true, onSelf: [{ type: "cleanse", types: ["slow", "cripple"], sticky: true }, { type: "state", state: "slowImmune", duration: highlanderSeconds }, { type: "state", state: "crippleImmune", duration: highlanderSeconds }, { type: "state", state: "ghosted", duration: highlanderSeconds }, { type: "stat", stat: "attackSpeed", amount: { base: highlanderSpeed }, duration: highlanderSeconds }, { type: "stat", stat: "moveSpeedPercent", amount: { base: highlanderMove }, duration: highlanderSeconds }], roles: ["damage", "engage"] },
    ];
    // Read every formula while building, never from the fight's estimate or hooks.
    const maximumAlpha = q.formula("Maximum Single-Target Damage");
    abilities[0]!.estimate = (self, target) => evaluate(maximumAlpha, self, target) * (1 + derive(self).critChance * (alphaCrit - 1));
    const alpha = abilities[0]!;
    const incomingOnHit = (ctx: HookContext, spell = false) => notifyIncomingOnHit(ctx.world, ctx.enemy, spell ? alpha : undefined);
    const alphaStrike = (ctx: HookContext, amount: number, chance: number, scale: number) => {
      const appliesIncoming = ctx.enemy.hp > 0 && !isUntargetable(ctx.enemy, ctx.self) && !hasState(ctx.enemy, "spellShield") && !hasState(ctx.enemy, "parry") && !hasState(ctx.enemy, "dodgeAttacks");
      const packet: Effect[] = [{ type: "damage", damageType: "physical", amount: { base: amount * (1 + chance * (alphaCrit - 1)) }, label: q.name }];
      if (!hasState(ctx.enemy, "dodgeAttacks") && !hasState(ctx.enemy, "blockAttacks")) {
        for (const effect of ctx.self.spec.attack.onHit ?? []) packet.push(effect.type === "damage" ? { ...effect, amount: { base: evaluate(effect.amount, ctx.self, ctx.enemy) * scale } } : effect);
        if (ctx.tick < Number(ctx.memory.wujuUntil ?? -1)) packet.push({ type: "damage", damageType: "true", amount: { base: evaluate(wuju, ctx.self, ctx.enemy) * scale }, noLifeSteal: true, label: e.name });
      }
      abilityHit(ctx.world, ctx.self, ctx.enemy, alpha, packet);
      if (appliesIncoming) incomingOnHit(ctx, true);
      refreshCombatBuffs(ctx);
    };
    const behavior: Behavior = (view) => {
      const { self, world } = view;
      if (view.mode === "idle") return undefined;
      const ready = (key: string) => canCast(world, self, abilities.find((a) => a.key === key)!);
      if (self.action?.kind === "channel" && self.action.ability === "Q") {
        if (ready("E")) return { kind: "cast", ability: "E" };
        if (ready("R")) return { kind: "cast", ability: "R" };
        return undefined;
      }
      if (self.action?.kind === "channel" && self.action.ability === "W") {
        if (self.hp >= 0.85 * derive(self).maxHp && ready("W2")) return { kind: "cast", ability: "W2" };
        return undefined;
      }
      if (self.action && self.action.kind !== "windup") return undefined;
      if (self.hp < 0.35 * derive(self).maxHp && ready("W")) return { kind: "cast", ability: "W" };
      if (ready("R") && (view.distance < 600 || view.mode === "flee")) return { kind: "cast", ability: "R" };
      if (ready("E") && view.distance <= self.spec.attack.range + 100) return { kind: "cast", ability: "E" };
      // Avoid dropping a viable attack windup merely to use Alpha Strike.
      if (!self.action && ready("Q")) return { kind: "cast", ability: "Q" };
      return defaultBehavior(view);
    };
    return {
      abilities, behavior,
      budget: { damage: (self, target) => {
        const d = derive(self);
        const attacks = d.attackSpeed + extraAttacks(self, highlanderSpeed * highlanderSeconds / cooldownAfterHaste(rCooldown, d.abilityHaste));
        const alphaLock = marks * markGap + exitLock;
        const alphaCycle = alphaLock + Math.max(0, cooldownAfterHaste(qCooldown, d.abilityHaste) - alphaLock) / (1 + refund * attacks * (1 + 1 / stacksMax));
        const wujuUptime = Math.min(1, wujuSeconds / cooldownAfterHaste(eCooldown, d.abilityHaste));
        return {
          physical: attackDamage(self) * (attacks / stacksMax * secondShare + (attacks - d.attackSpeed)) + evaluate(maximumAlpha, self, target) * (1 + d.critChance * (alphaCrit - 1)) / alphaCycle,
          true: evaluate(wuju, self, target) * wujuUptime * (attacks * (1 + 1 / stacksMax) + (firstOnHit + laterOnHit * (marks - 1)) / alphaCycle),
        };
      }, healing: (self) => evaluate(healMinimum, self, self) * meditateSeconds / healEvery / cooldownAfterHaste(wCooldown, derive(self).abilityHaste) },
      hooks: {
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.alphaStart = ctx.tick;
            ctx.memory.alphaOrigin = ctx.self.x;
            ctx.memory.alphaNext = 1;
            ctx.memory.alphaActive = true;
            ctx.apply({ type: "state", state: "untargetable", duration: marks * markGap }, true);
            ctx.self.action = { kind: "channel", ability: "Q", startTick: ctx.tick, endTick: ctx.tick + ticks(marks * markGap + exitLock), nextTick: Infinity, intervalTicks: Infinity };
          }
          if (ctx.ability.key === "E") ctx.memory.wujuUntil = ctx.tick + ticks(wujuSeconds);
          if (ctx.ability.key === "R") ctx.memory.highlanderUntil = ctx.tick + ticks(highlanderSeconds);
          if (ctx.ability.key === "W") {
            ctx.memory.meditating = true;
            ctx.memory.meditateStart = ctx.tick;
            ctx.memory.meditateLastTick = ctx.tick;
            ctx.memory.meditateHealNext = ctx.tick + ticks(healEvery);
            ctx.memory.meditateStackNext = ctx.tick + ticks(1);
            ctx.memory.meditateReduction = reductionEarly;
            setReduction(ctx, reductionEarly, ctx.tick + ticks(earlySeconds));
          }
          if (ctx.ability.key === "W2") finishMeditate(ctx);
        },
        onTick(ctx) {
          if (ctx.memory.doubleArmed && remaining(ctx) === 0 && ctx.self.action?.kind === "windup") {
            ctx.self.action = undefined;
            ctx.self.attackReadyTick = ctx.tick;
            ctx.memory.doubleArmed = false;
            if (canStartAttack(ctx.world, ctx.self)) startAttack(ctx.world, ctx.self);
          }
          if (ctx.memory.alphaActive) {
            const n = Number(ctx.memory.alphaNext);
            if (!ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)) {
              ctx.memory.alphaActive = false;
              ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "untargetable" && s.source === ctx.self.side));
              if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "Q") ctx.self.action.endTick = ctx.tick + ticks(exitLock);
            } else if (ctx.tick >= Number(ctx.memory.alphaStart) + ticks(n * markGap)) {
              if (n === 1) {
                ctx.memory.alphaPrimary = evaluate(primary, ctx.self, ctx.enemy);
                ctx.memory.alphaPrimaryCrit = derive(ctx.self).critChance;
              } else alphaStrike(ctx, evaluate(lesser, ctx.self, ctx.enemy), derive(ctx.self).critChance, laterOnHit);
              if (n === marks) {
                ctx.memory.alphaActive = false;
                ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "untargetable" && s.source === ctx.self.side));
                if (ctx.enemy.alive && Math.abs(ctx.enemy.x - Number(ctx.memory.alphaOrigin)) <= followLimit) {
                  ctx.self.x = ctx.enemy.x - directionTo(ctx.self, ctx.enemy) * exitOffset;
                  log(ctx.world, ctx.self.side, "reappears from Alpha Strike");
                } else ctx.self.x = Number(ctx.memory.alphaOrigin);
                if (ctx.enemy.alive) alphaStrike(ctx, Number(ctx.memory.alphaPrimary), Number(ctx.memory.alphaPrimaryCrit), firstOnHit);
              } else ctx.memory.alphaNext = n + 1;
            }
          }
          if (ctx.memory.meditating) {
            const channel = ctx.self.action?.kind === "channel" && ctx.self.action.ability === "W";
            if (!channel) finishMeditate(ctx);
            else {
              const elapsed = ctx.tick - Number(ctx.memory.meditateLastTick);
              ctx.memory.meditateLastTick = ctx.tick;
              const drain = derive(ctx.self).maxResource * manaPerSecond * elapsed / 30;
              if (ctx.self.resource < drain) { ctx.self.resource = 0; ctx.self.action = undefined; finishMeditate(ctx); return; }
              ctx.self.resource -= drain;
              for (const key of ["wujuUntil", "highlanderUntil"]) if (Number(ctx.memory[key] ?? -1) > ctx.tick - elapsed) ctx.memory[key] = Number(ctx.memory[key]) + elapsed;
              if (Number(ctx.memory.highlanderUntil ?? -1) > ctx.tick) extendOwn(ctx, "R", Number(ctx.memory.highlanderUntil));
              const reduction = ctx.tick < Number(ctx.memory.meditateStart) + ticks(earlySeconds) ? reductionEarly : reductionLater;
              ctx.memory.meditateReduction = reduction;
              setReduction(ctx, reduction, ctx.tick + ticks(reductionLinger));
              if (ctx.tick >= Number(ctx.memory.meditateHealNext)) {
                ctx.memory.meditateHealNext = Number(ctx.memory.meditateHealNext) + ticks(healEvery);
                ctx.apply({ type: "heal", amount: { base: evaluate(healMinimum, ctx.self, ctx.self) * (1 + seriesAt(missingHealing, missingShare(ctx.self) * 100, true) / 100) } }, true);
              }
              if (ctx.tick >= Number(ctx.memory.meditateStackNext)) { gainStack(ctx); ctx.memory.meditateStackNext = Number(ctx.memory.meditateStackNext) + ticks(1); }
              if (ctx.tick >= Number(ctx.memory.meditateStart) + ticks(meditateSeconds)) finishMeditate(ctx);
            }
          }
          takedown(ctx);
        },
        onDamageDealt(ctx) { takedown(ctx); },
        onAttack(ctx) {
          ctx.memory.doubleArmed = remaining(ctx) >= stacksMax;
          ctx.memory.doubleBlind = ctx.self.action?.kind === "windup" ? ctx.self.action.blinded : ctx.self.statuses.some((s) => s.kind === "cc" && s.key === "blind");
        },
        onAttackHit(ctx) {
          onHitDamage(ctx);
          if (!ctx.blocked) ctx.apply({ type: "refund", ability: "Q", seconds: refund }, true);
          if (ctx.memory.doubleArmed && remaining(ctx) >= stacksMax) {
            ctx.memory.doubleArmed = false;
            if (!ctx.blocked) ctx.memory.doubleStacks = 0;
            const secondTarget = ctx.enemy.alive && ctx.enemy.hp > 0 && !inStasis(ctx.enemy);
            if (!ctx.blocked && secondTarget) {
              const d = derive(ctx.self);
              dealDamage(ctx.world, ctx.self, ctx.enemy, d.ad * secondShare, "physical", { attack: true, ability: passive.name, crit: { chance: d.critChance, multiplier: d.critDamage } });
              for (const effect of ctx.self.spec.attack.onHit ?? []) applyEffect(ctx.world, ctx.self, ctx.enemy, effect, { attack: true, scale: 1, critChance: d.critChance });
              gainStack(ctx);
              ctx.apply({ type: "refund", ability: "Q", seconds: refund }, true);
            }
            // Wuju Style itself cannot be blocked; the second strike also applies it.
            if (secondTarget) { onHitDamage(ctx); incomingOnHit(ctx); }
          } else if (!ctx.blocked) gainStack(ctx);
        },
        onAttackResolved(ctx) {
          if (ctx.missed && ctx.memory.doubleArmed && (ctx.memory.doubleBlind || !hasState(ctx.enemy, "dodgeAttacks"))) ctx.memory.doubleStacks = 0;
          ctx.memory.doubleArmed = false;
        },
      },
    };
  },
};
export default yi;
