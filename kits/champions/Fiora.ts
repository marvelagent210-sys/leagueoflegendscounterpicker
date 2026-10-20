/** Fiora: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const fiora: KitModule = {
  champion: "Fiora",
  build(kit) {
    const innate = kit.ability("Duelist's Dance");
    const q = kit.ability("Lunge");
    const w = kit.ability("Riposte");
    const e = kit.ability("Bladework");
    const r = kit.ability("Grand Challenge");
    q.quote("Fiora can cast any of her abilities during the dash");
    // Lunge permits these casts; the permission does not extend to other casts/dashes.
    const castDuringLunge = (unit: Unit) => !unit.action || unit.action.kind === "windup" || (unit.action.kind === "dash" && unit.action.ability === "Q" && !unit.action.resume);

    // Duelist's Dance: a Vital becomes targetable 1.75 s after it is identified.
    const vitalDelay = innate.quoted("Vitals take 1.75 seconds to become targetable", 0);
    const vitalShare = innate.quoted("bonus true damage equal to 3% (+ 4% per 100 bonus AD) of target's maximum health", 0) / 100;
    const vitalPer100 = innate.quoted("bonus true damage equal to 3% (+ 4% per 100 bonus AD) of target's maximum health", 1) / 100;
    const vitalHeal = innate.levelValue("heal Fiora for 35 – 100 (based on level)");
    // At Grand Challenge's rank 3, the fourth of these values.
    const vitalSpeed = innate.quoted("grant her 20 / 30 / 40 / 50 (based on Grand Challenge's Rank)% bonus movement speed", 3) / 100;
    const speedSeconds = innate.quoted("that decays over 1.85 seconds", 0);
    // In one dimension Fiora walks around her target to reach a Vital's side.
    const reposition = 0.5;
    kit.assume(`Fiora needs ${reposition} seconds to step around her target to a Vital's side; Lunge reaches it at once.`);
    kit.assume("A Vital's movement speed is kept for its full duration rather than decaying.");
    kit.assume("Bladework's guaranteed critical strike adds its critical damage minus the attack's average critical damage.");
    const vitalDamage: Formula = { base: 0, ratios: { targetMaxHP: vitalShare }, products: [{ ratio: vitalPer100 / 100, stats: ["bonusAD", "targetMaxHP"] }] };
    const vital: Effect = { type: "damage", damageType: "true", amount: vitalDamage, label: "Vital" };
    const challengeVitals = 4;
    const challengeDelay = r.quoted("highlighting all four of their Vitals after a 0.5-second delay", 0);
    const victoryPerSecond = r.formula("Heal per Second");
    const victoryPerTick = r.formula("Heal per Tick");
    const victoryInterval = r.quoted("heals Fiora and all allies within the area every 0.25 seconds", 0);
    const challengeSpeedRadius = r.field("effectRadius", "Movement speed radius");
    const victoryRadius = r.field("effectRadius", "Heal zone radius");
    const victorySeconds = r.quoted("a Victory Zone is created on their death location for 5 seconds", 0);
    const challengeSeconds = r.quoted("challenges the target enemy champion for 8 seconds", 0);
    const bladeworkSlow = e.quoted("The first attack slows the target by 30% for 1 second", 0) / 100;
    const bladeworkSlowSeconds = e.quoted("The first attack slows the target by 30% for 1 second", 1);
    const bladeworkCrit = e.number("Critical damage") / 100;
    e.quote("The first attack slows the target by 30% for 1 second but cannot critically strike");
    const bladeworkSeconds = e.quoted("next two basic attacks on-attack within 4 seconds", 0);
    const stabRefund = q.quoted("Stabbing a target reduces Lunge's cooldown by 50%", 0) / 100;
    const riposteSeconds = w.quoted("enters a defensive stance for 0.75 seconds", 0);
    const riposteCast = w.quoted("over the first 0.5 seconds of the duration", 0);
    const riposteControl = w.quoted("slowed and crippled by 25% for 2 seconds", 1);

    // In an all-in: a passive Vital about every 3 seconds, and Grand Challenge's four.
    const vitalsPerSecond = 1 / 3 + challengeVitals / 10;
    const proc = (ctx: HookContext) => {
      ctx.apply(vital);
      ctx.apply({ type: "heal", amount: flat(vitalHeal) }, true);
      ctx.apply({ type: "stat", stat: "moveSpeedPercent", amount: flat(vitalSpeed), duration: speedSeconds }, true);
    };
    // Each damaging hit triggers a ready Vital: Grand Challenge's four first, then the passive's.
    const onHitVital = (ctx: HookContext, lunge: boolean) => {
      // One damage event can contain several components (a Bladework attack, for example).
      // They cannot strike different sides of the target at the same instant.
      if (ctx.memory.vitalHitTick === ctx.tick) return;
      if (ctx.tick >= Number(ctx.memory.challengeUntil ?? -1)) ctx.memory.challengeVitals = 0;
      const left = Number(ctx.memory.challengeVitals ?? 0);
      if (left > 0 && ctx.tick >= Number(ctx.memory.challengeReady ?? 0)) {
        proc(ctx);
        ctx.memory.vitalHitTick = ctx.tick;
        ctx.memory.challengeVitals = left - 1;
        ctx.memory.challengeReady = ctx.tick + (lunge ? 0 : ticks(reposition));
        if (left - 1 === 0) {
          // All four: the Victory Zone heals Fiora while she fights on in it.
          ctx.memory.victoryAt = ctx.tick;
          ctx.memory.victoryX = ctx.enemy.x;
          ctx.memory.victoryPulse = 1;
          ctx.log("Victory Zone");
        }
        return;
      }
      // Grand Challenge's target gets no new Vitals from Duelist's Dance while challenged.
      if (ctx.tick < Number(ctx.memory.challengeUntil ?? -1)) return;
      if (ctx.tick < Number(ctx.memory.vitalReady ?? ticks(vitalDelay))) return;
      if (!lunge && ctx.tick < Number(ctx.memory.vitalReady ?? 0) + ticks(reposition)) return;
      proc(ctx);
      ctx.memory.vitalHitTick = ctx.tick;
      ctx.memory.vitalReady = ctx.tick + ticks(vitalDelay);
    };

    const clearRiposteControl = (ctx: HookContext) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "cc" && s.source === ctx.self.side && (s.key === "slow" || s.key === "cripple") && s.startTick === Number(ctx.memory.riposteHitAt ?? -1)));
    };

    return {
      budget: {
        damage: (self, target) => ({ true: vitalsPerSecond * evaluate(vitalDamage, self, target) }),
        // Each Vital heals; the Victory Zone heals for its 5 seconds about half the time.
        healing: (self) => vitalsPerSecond * vitalHeal + (0.5 * victorySeconds * evaluate(victoryPerSecond, self)) / 10,
      },
      hooks: {
        onTick(ctx) {
          const active = ctx.tick < Number(ctx.memory.challengeUntil ?? -1);
          if (!active) ctx.memory.challengeVitals = 0;
          const near = Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= challengeSpeedRadius;
          ctx.buff("grandChallengeSpeed", "moveSpeedPercent", active && near ? vitalSpeed : 0, 1);
          const pulse = Number(ctx.memory.victoryPulse ?? 0);
          const victoryAt = Number(ctx.memory.victoryAt ?? -1);
          if (pulse > 0 && pulse <= victorySeconds / victoryInterval && ctx.tick >= victoryAt + ticks(pulse * victoryInterval)) {
            ctx.memory.victoryPulse = pulse + 1;
            if (Math.abs(ctx.self.x - Number(ctx.memory.victoryX)) <= victoryRadius && !hasState(ctx.self, "untargetable") && !hasState(ctx.self, "stasis")) ctx.apply({ type: "heal", amount: victoryPerTick }, true);
          }
        },
        onParry(ctx) {
          if (!ctx.immobilizing || ctx.tick >= Number(ctx.memory.riposteUntil ?? -1)) return;
          ctx.memory.riposteEmpowered = true;
          const remaining = Number(ctx.memory.riposteHitUntil ?? -1) - ctx.tick;
          if (remaining <= 0) return;
          // An immobilize negated in the last 0.25 s converts a shock already landed.
          clearRiposteControl(ctx);
          ctx.apply({ type: "cc", cc: "stun", duration: remaining / 30 });
          ctx.memory.riposteHitUntil = -1;
        },
        onDamageDealt(ctx) {
          if (ctx.amount <= 0 || ctx.ability === "Vital") return;
          onHitVital(ctx, ctx.ability === q.name);
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "W") return;
          ctx.memory.riposteUntil = ctx.tick + ticks(riposteSeconds);
          ctx.memory.riposteEmpowered = false;
          ctx.memory.riposteHitUntil = -1;
        },
        onAttack(ctx) {
          const left = ctx.tick < Number(ctx.memory.bladeworkUntil ?? -1) ? Number(ctx.memory.bladework ?? 0) : 0;
          if (left <= 0) return;
          ctx.memory.bladework = left - 1;
          ctx.memory.bladeworkHit = left;
          if (left === 2 && ctx.self.action?.kind === "windup") ctx.self.action.critChance = 0;
          if (left === 1) ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "E:attackSpeed");
        },
        onAttackHit(ctx) {
          // Blocking basic damage does not prevent the attack from triggering a Vital.
          onHitVital(ctx, false);
          const which = Number(ctx.memory.bladeworkHit ?? 0);
          ctx.memory.bladeworkHit = 0;
          if (which === 2) ctx.apply({ type: "cc", cc: "slow", strength: bladeworkSlow, duration: bladeworkSlowSeconds });
          if (which === 1 && !ctx.blocked) {
            // The second attack critically strikes for Bladework's critical damage.
            const d = derive(ctx.self);
            const average = 1 + ctx.critChance * (d.critDamage - 1);
            const extra = Math.max(0, bladeworkCrit - average);
            ctx.apply({ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: extra } }, label: "Bladework (critical strike)" });
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") {
            ctx.memory.bladework = 2;
            ctx.memory.bladeworkUntil = ctx.tick + ticks(bladeworkSeconds);
          }
          if (ctx.ability.key === "R") {
            ctx.memory.challengeVitals = challengeVitals;
            ctx.memory.challengeReady = ctx.tick + ticks(challengeDelay);
            ctx.memory.challengeUntil = ctx.tick + ticks(challengeSeconds);
            ctx.memory.vitalReady = ctx.tick + ticks(challengeSeconds + vitalDelay);
          }
        },
        onAbilityHit(ctx) {
          // A stab refunds half of Lunge's cooldown.
          if (ctx.ability.key === "Q") {
            ctx.apply({ type: "refund", ability: "Q", fraction: stabRefund });
            onHitVital(ctx, true);
          }
          if (ctx.ability.key === "W") {
            ctx.memory.riposteHitAt = ctx.tick;
            if (ctx.memory.riposteEmpowered) {
              clearRiposteControl(ctx);
              ctx.apply({ type: "cc", cc: "stun", duration: riposteControl });
            } else {
              const slow = ctx.enemy.statuses.find((s) => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.startTick === ctx.tick);
              ctx.memory.riposteHitUntil = slow?.endTick ?? -1;
            }
          }
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          // Dash up to 400 units, then search the recorded center-based stab radius.
          delivery: { kind: "dash", direction: "toward", distance: Math.max(...q.fieldNumbers("targetRange")), speed: q.field("speed"), hitRadius: q.field("range", "Stab range"), hitCentered: true },
          onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage") }],
          flags: { appliesOnHit: true, appliesLifeSteal: true, parry: true, grounded: true, knockdown: q.flag("knockdown") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          overlay: true,
          usable: castDuringLunge,
          // Over the first 0.5 s Fiora poises, then the shock flies; the parry lasts 0.75 s from the start.
          castTime: riposteCast,
          onCastStart: [{ type: "state", state: "parry", duration: riposteSeconds }],
          delivery: { kind: "line", range: w.field("targetRange"), width: w.field("width"), speed: w.field("speed") },
          channel: { duration: riposteSeconds - riposteCast, interruptible: false },
          onHit: [
            { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: w.quoted("slowed and crippled by 25% for 2 seconds", 0) / 100, duration: w.quoted("slowed and crippled by 25% for 2 seconds", 1) },
            { type: "cc", cc: "cripple", strength: w.quoted("slowed and crippled by 25% for 2 seconds", 0) / 100, duration: w.quoted("slowed and crippled by 25% for 2 seconds", 1) },
          ],
          flags: { projectile: w.flag("projectile") ?? true },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          overlay: true,
          usable: castDuringLunge,
          castTime: e.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            { type: "empower", attacks: 2, window: bladeworkSeconds, bonusRange: e.quoted("to gain 25 bonus range", 0), onHit: [] },
            { type: "stat", stat: "attackSpeed", amount: flat(e.fraction("Bonus Attack Speed")), duration: bladeworkSeconds },
            { type: "resetAttack" },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          overlay: true,
          usable: castDuringLunge,
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [{ type: "mark", key: "grandChallenge", duration: challengeSeconds }],
          roles: ["buff"],
          flags: { spellShield: false },
        },
      ],
    };
  },
};

export default fiora;
