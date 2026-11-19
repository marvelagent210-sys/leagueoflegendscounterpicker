/** Shield Bash for explicit manual plain-stat duels. */
import { toTicks } from "../engine/rules/time";
import { applyEffect, damageProtected } from "../engine/sim/combat";
import { derive, hasState } from "../engine/sim/derived";
import type { FighterSpec, HookContext, KitHooks } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Shield Bash";
const PEAK = "rune:shield-bash:peak:";
const UNTIL = "rune:shield-bash:until:";
const SPENT_THROUGH = "rune:shield-bash:spent-through";
type Rules = CombatRuneRules["shieldBash"];

export function checkedShieldBashRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const lingerTicks = toTicks(rules.linger);
  if (rules.modelLevel !== 20 || ![rules.baseDamage, rules.bonusHealthRatio, rules.shieldRatio].every(n => Number.isFinite(n) && n > 0)
    || rules.bonusHealthRatio > 1 || rules.shieldRatio > 1 || !Number.isSafeInteger(lingerTicks) || lingerTicks <= 0) {
    throw new Error(`${LABEL} requires positive finite level-20 damage and a valid linger timer`);
  }
  return { ...rules };
}

const eligible = (unit: Unit) => unit.alive && unit.hp > 0 && !unit.fallen && !unit.resurrection
  && !unit.deathDefied && !unit.deathNotified;

export function buildShieldBash(form: FighterSpec, input: Pick<CombatRuneRules, "shieldBash">): { hooks: KitHooks; assumptions: string[] } {
  if (form.adaptiveType !== "Physical" && form.adaptiveType !== "Magic") throw new Error(`${LABEL} requires the champion's adaptive damage type`);
  const { baseDamage, bonusHealthRatio, shieldRatio, linger } = checkedShieldBashRules(input?.shieldBash);
  const lingerTicks = toTicks(linger);

  function clearOnDeath(ctx: HookContext): void {
    if (eligible(ctx.self)) return;
    for (const key of Object.keys(ctx.memory)) {
      if (key.startsWith(PEAK) || key.startsWith(UNTIL)) delete ctx.memory[key];
    }
    ctx.memory[SPENT_THROUGH] = ctx.world.combatEventSequence ?? 0;
  }

  return {
    hooks: {
      onHealthShieldChanged({ self, tick, shield }) {
        if (!eligible(self) || shield.instance <= Number(self.memory[SPENT_THROUGH] ?? 0)) return;
        const { memory } = self;
        for (const key of Object.keys(memory)) {
          if (!key.startsWith(UNTIL) || key === UNTIL + shield.instance || Number(memory[key]) > tick) continue;
          delete memory[PEAK + key.slice(UNTIL.length)];
          delete memory[key];
        }
        const peakKey = PEAK + shield.instance, untilKey = UNTIL + shield.instance;
        if (shield.endedAt !== undefined) {
          if (memory[peakKey] !== undefined) memory[untilKey] = shield.endedAt + lingerTicks;
          return;
        }
        memory[peakKey] = Math.max(Number(memory[peakKey] ?? 0), shield.amount);
        memory[untilKey] = shield.endTick + lingerTicks;
      },
      onResolvedOnHit(ctx) {
        const hit = ctx.onHit;
        if (!eligible(ctx.self) || hit.source.kind !== "champion" || hit.source.side !== ctx.self.side
          || hit.target.kind !== "champion" || hit.target.side === ctx.self.side || hit.blocked || hit.protected
          || !ctx.enemy.alive || ctx.enemy.hp <= 0 || hasState(ctx.enemy, "parry") || damageProtected(ctx.world, ctx.self, ctx.enemy)
          || !Number.isFinite(hit.scale) || hit.scale <= 0) return;
        const { memory } = ctx;
        let strongest = 0;
        // All shields gained before this on-hit lose eligibility together. A
        // shield granted by a later on-hit callback is eligible on the next hit.
        for (const key of Object.keys(memory)) {
          if (!key.startsWith(PEAK)) continue;
          const instance = key.slice(PEAK.length), untilKey = UNTIL + instance;
          const active = Number(memory[untilKey]) > ctx.tick;
          const prior = Number(instance) < hit.sequence;
          if (active && prior) strongest = Math.max(strongest, Number(memory[key]));
          if (!active || prior) {
            delete memory[key];
            delete memory[untilKey];
          }
        }
        if (strongest <= 0) return;
        memory[SPENT_THROUGH] = Math.max(Number(memory[SPENT_THROUGH] ?? 0), hit.sequence);
        const stats = derive(ctx.self);
        const physical = stats.bonusAd === stats.ap ? ctx.self.spec.adaptiveType === "Physical" : stats.bonusAd > stats.ap;
        const bonusHealth = stats.maxHp - ctx.self.spec.base.hp;
        applyEffect(ctx.world, ctx.self, ctx.enemy, {
          type: "damage", damageType: physical ? "physical" : "magic", label: LABEL,
          amount: { base: baseDamage + bonusHealthRatio * bonusHealth + shieldRatio * strongest },
          noLifeSteal: true, observedDamageKind: "proc",
        }, { scale: hit.scale });
      },
      onTick: clearOnDeath,
      onTickWhileDead: clearOnDeath,
    },
    assumptions: [
      "Shield Bash uses the largest peak from a positive native health shield on the champion body. Ordinary, physical and magic shields qualify. Its two-second grace period begins at expiration, depletion or removal.",
      "A qualified native on-hit against the opposing champion consumes eligibility for every shield granted before that on-hit. A later growth of a spent shield cannot arm the rune again. A shield gained after the on-hit snapshot waits for another hit.",
      "The separate proc samples current bonus health and adaptive damage at application, uses the native on-hit effectiveness and has no spell-hit or life-steal entitlement. These sampling and effectiveness choices are simulator policies.",
      "Attack denial and protected targets preserve the proc. Falling, death and resurrection clear eligible shields. The partial manual effect uses actual champion bodies.",
    ],
  };
}
