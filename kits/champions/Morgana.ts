/** Morgana: magic-only Black Shield, source-timed ground damage and a breakable tether. */
import type { KitModule } from "../../engine/kits/compile";
import { effectiveResist, resistMultiplier } from "../../engine/rules/damage";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, enemyEffects } from "../../engine/sim/behavior";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import { missingShare, seriesAt, ticks } from "./util";

const morgana: KitModule = {
  champion: "Morgana",
  build(kit) {
    const passive = kit.ability("I");
    const q = kit.ability("Q");
    const w = kit.ability("W");
    const e = kit.ability("E");
    const r = kit.ability("R");
    const siphon = passive.quoted("heals herself for 18% of the post-mitigation damage") / 100;
    const refund = w.quoted("reduced by 5% of its total cooldown") / 100;
    const fieldSeconds = w.quoted("desecrated for 5 seconds");
    const interval = w.quoted("every 0.5 seconds thereafter");
    const missingMultiplier = w.seriesIn("based on target's missing health");
    const perTick = w.formula("Minimum Damage Per Tick");
    const qDamage = q.formula("Magic Damage");
    const perTickAt = (self: Parameters<typeof evaluate>[1], target: Parameters<typeof missingShare>[0]) => evaluate(perTick, self, target) * (1 + seriesAt(missingMultiplier, missingShare(target) * 100, true) / 100);
    w.quote("Damage from multiple Tormented Shadows does not stack");
    const shieldSeconds = e.quoted("for 5 seconds");
    e.quote("absorbs incoming magic damage and grants crowd control immunity while it holds");
    e.quote("Black Shield will not resist nearsight");
    e.quote("Black Shield negates crowd control effects before any magic damage is absorbed");
    e.quote("Shield-destroying effects bypass this however");
    e.quote("Black Shield will always take priority over regular shields");
    const tetherSeconds = r.quoted("for 3 seconds");
    const castRadius = r.quoted("within 575 units is required to cast");
    const latchRadius = r.field("effectRadius", "Latch-on range");
    const tetherRadius = r.field("tetherRadius");
    const slow = r.quoted("slowed by 20%") / 100;
    const rDamage = r.formula("Magic Damage");
    const rSpeed = r.fraction("Bonus Movement Speed");
    r.quote("targets are revealed");
    r.quote("Spell shield will block the tether's application and initial damage but not the aftereffects of one already applied");
    r.quote("Morgana's exact location at the start of the cast time");
    kit.assume("Black Shield is self-cast in the champion-only duel. Soul Siphon heals from champion damage; minion and monster targets are absent.");
    kit.assume("Dark Binding's first-enemy collision resolves against the opposing champion; intervening minions and targetable pets are not modeled as projectile blockers.");
    kit.assume("Soul Shackles' cast requirement, latch and tether radii use champion centers on the simulator's line. Its reveal exposes invisible enemies while the tether or completion stun lasts; nearsight still limits vision.");
    kit.assume("Tormented Shadow's missing-health damage bonus is linearly interpolated from its committed 0–100% source series. Its field deals ten pulses including the on-cast pulse, and overlapping pools from this Morgana do not stack.");

    const poolDamage: Effect = { type: "damage", damageType: "magic", amount: perTick, amountFor: perTickAt, persistent: true };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "line", range: q.field("range"), width: q.field("width"), speed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "root", duration: q.number("Root Duration") }],
        flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, decisive: true,
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        delivery: { kind: "field", range: w.field("targetRange"), radius: w.field("effectRadius"), duration: fieldSeconds, interval },
        onHit: [poolDamage], flags: { projectile: false, spellShield: w.flag("spellShield") },
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true,
        delivery: { kind: "self" },
        onSelf: [{ type: "shield", shieldType: "magic", priority: true, blackShield: true, amount: e.formula("Magic Shield Strength"), duration: shieldSeconds }],
        roles: ["defense"],
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
        delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "slow", strength: slow, duration: tetherSeconds }, { type: "state", state: "revealed", duration: tetherSeconds }],
        roles: ["damage", "cc"], usable: (self, world) => Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= castRadius,
      },
      {
        key: "R2", name: `${r.name} (tether completion)`, slot: "other", cooldown: 0, castTime: 0,
        delivery: { kind: "self" }, chain: { root: "R", index: 1, window: tetherSeconds }, usable: () => false,
        onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "stun", duration: r.number("Stun Duration") }, { type: "state", state: "revealed", duration: r.number("Stun Duration") }],
        flags: { spellShield: false },
      },
    ];
    const qSpec = abilities.find((a) => a.key === "Q")!;
    const wSpec = abilities.find((a) => a.key === "W")!;
    const eSpec = abilities.find((a) => a.key === "E")!;
    const rSpec = abilities.find((a) => a.key === "R")!;
    const completion = abilities.find((a) => a.key === "R2")!;
    const behavior: Behavior = (view) => {
      const shielded = view.self.statuses.some((s) => s.kind === "shield" && s.blackShield && s.value > 0 && s.endTick > view.world.tick);
      const relevant = view.threats.some((threat) => {
        if (threat.eta <= 0 || threat.eta >= ticks(shieldSeconds)) return false;
        const effects = threat.ability ? enemyEffects(threat.ability) : view.enemy.spec.attack.onHit ?? [];
        return effects.some((effect) => effect.type === "displace" || (effect.type === "cc" && effect.cc !== "nearsight") || ((effect.type === "damage" || effect.type === "dot") && effect.damageType === "magic"));
      });
      if (view.mode !== "idle" && !shielded && relevant && canCast(view.world, view.self, eSpec)) return { kind: "cast", ability: "E" };
      return defaultBehavior(view);
    };
    return {
      abilities,
      behavior,
      budget: {
        healing: (self, target) => {
          const d = derive(self);
          const t = derive(target);
          const resistance = effectiveResist(t.mr, t.mrReduction, { flat: d.magicPen, percent: d.magicPenPercent });
          const haste = 1 + d.abilityHaste / 100;
          const raw = evaluate(qDamage, self, target) / (qSpec.cooldown / haste + qSpec.castTime)
            + perTickAt(self, target) * (fieldSeconds / interval) / (wSpec.cooldown / haste + wSpec.castTime)
            + 2 * evaluate(rDamage, self, target) / (rSpec.cooldown / haste + rSpec.castTime);
          return siphon * raw * resistMultiplier(resistance);
        },
      },
      hooks: {
        onTargetResurrection(ctx) {
          delete ctx.memory.shacklesUntil;
          ctx.buff("shacklesSpeed", "moveSpeedPercent", 0, 0);
          ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "R" && (s.key === "slow" || s.key === "revealed")));
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "R") ctx.memory.shacklesOrigin = ctx.self.x;
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") {
            if (Math.abs(ctx.enemy.x - Number(ctx.memory.shacklesOrigin)) <= latchRadius) abilityHit(ctx.world, ctx.self, ctx.enemy, rSpec, rSpec.onHit!);
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && ctx.tick - Number(ctx.memory.poolHitTick ?? -1e9) < ticks(interval)) return [];
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key !== "W") return;
          // Several fields may exist once Soul Siphon refunds enough cooldown. One pool
          // damages this target per interval without mutating the shared effect template.
          if (ctx.effects.length > 0) ctx.memory.poolHitTick = ctx.tick;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "R") return;
          ctx.memory.shacklesUntil = ctx.tick + ticks(tetherSeconds);
          ctx.buff("shacklesSpeed", "moveSpeedPercent", rSpeed, tetherSeconds);
        },
        onTick(ctx) {
          if (ctx.memory.shacklesUntil === undefined) return;
          const until = Number(ctx.memory.shacklesUntil);
          if (!ctx.enemy.alive || ctx.enemy.resurrection || Math.abs(ctx.self.x - ctx.enemy.x) > tetherRadius) {
            delete ctx.memory.shacklesUntil;
            ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.ability === "R" && s.source === ctx.self.side && (s.key === "slow" || s.key === "revealed")));
            ctx.buff("shacklesSpeed", "moveSpeedPercent", 0, 0);
            ctx.log("Soul Shackles' tether breaks");
          } else if (ctx.tick >= until) {
            delete ctx.memory.shacklesUntil;
            abilityHit(ctx.world, ctx.self, ctx.enemy, completion, completion.onHit!);
          }
        },
        onDamageDealt(ctx) {
          if (ctx.attack || ![q.name, w.name, r.name, completion.name].includes(ctx.ability ?? "")) return;
          ctx.apply({ type: "heal", amount: { base: ctx.mitigated * siphon } }, true);
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "refund", ability: "W", fraction: refund, total: true }, { scale: 1 });
        },
      },
    };
  },
};

export default morgana;
