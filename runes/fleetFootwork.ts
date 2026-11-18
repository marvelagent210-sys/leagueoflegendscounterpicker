/** Fleet Footwork for an explicitly equipped champion in a manual duel. */
import { toTicks } from "../engine/rules/time";
import { derive } from "../engine/sim/derived";
import type { CombatIdentity, HookContext } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";
import type { RuneEffectBuild } from "./effectRuntime";

type Rules = CombatRuneRules["fleetFootwork"];
const CHARGES = "rune:fleet-footwork:charges";
const ROUNDING = "rune:fleet-footwork:rounding";
const BURST = "rune:fleet-footwork:pendingBurst";
const BURST_CONTACT = "rune:fleet-footwork:burstContact:";
const SPEED = "rune:fleet-footwork:speed";

export function checkedEnergizedCharges(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error("Fleet Footwork requires explicit finite starting energizedCharges from 0 through 100");
  }
  return value;
}

export function checkedFleetFootworkRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Fleet Footwork requires reviewed numeric rules");
  const rule = value as Rules;
  const ratios = [rule.bonusADRatio, rule.apRatio, rule.rangedHealRatio, rule.minionHealRatio, rule.moveSpeedIncrease, rule.rangedMoveSpeedRatio];
  if (rule.modelLevel !== 20 || rule.chargeModel !== "current-at-connected-on-hit" || rule.chargePrecision !== "continuous"
    || rule.healDeliveryModel !== "immediate-at-consumption" || rule.statSamplingModel !== "current-at-consumption"
    || rule.maxCharges !== 100 || !Number.isSafeInteger(rule.attackCharges) || rule.attackCharges <= 0 || rule.attackCharges > rule.maxCharges
    || !Number.isFinite(rule.unitsPerCharge) || rule.unitsPerCharge <= 0
    || !Number.isFinite(rule.healBase) || rule.healBase <= 0
    || !ratios.every(ratio => Number.isFinite(ratio) && ratio > 0 && ratio <= 1)
    || !Number.isFinite(rule.moveSpeedDuration) || !Number.isSafeInteger(toTicks(rule.moveSpeedDuration)) || toTicks(rule.moveSpeedDuration) <= 0) {
    throw new Error("Invalid Fleet Footwork numeric rules or Energized, healing or stat sampling model");
  }
  return { ...rule };
}

function isBody(ctx: HookContext): boolean {
  return ctx.self.petId === undefined && ctx.self.spec.unitClass !== "clone" && ctx.world.units[ctx.self.side] === ctx.self;
}

function observesSelf(ctx: HookContext, body: CombatIdentity): boolean {
  return body.kind === "champion" && body.side === ctx.self.side && isBody(ctx) && ctx.self.alive && ctx.self.hp > 0;
}

export function buildFleetFootwork(input: Pick<CombatRuneRules, "fleetFootwork">, startingCharges: number): RuneEffectBuild {
  const rules = checkedFleetFootworkRules(input?.fleetFootwork);
  const initial = checkedEnergizedCharges(startingCharges);

  // An opponent's start hook can move this body before its own start hook runs.
  function charges(ctx: HookContext): number {
    const value = ctx.memory[CHARGES];
    return value === undefined ? initial : checkedEnergizedCharges(value);
  }
  function gain(ctx: HookContext, amount: number): void {
    const previous = charges(ctx);
    const rounding = ctx.memory[ROUNDING] ?? 0;
    if (typeof rounding !== "number" || !Number.isFinite(rounding)) throw new Error("Invalid Fleet Footwork charge remainder");
    // Compensated addition keeps repeated short segments from falling just
    // below an exact threshold (e.g. 300 segments of eight units).
    const increment = amount - rounding;
    const next = previous + increment;
    ctx.memory[CHARGES] = Math.min(rules.maxCharges, next);
    ctx.memory[ROUNDING] = next >= rules.maxCharges ? 0 : (next - previous) - increment;
  }
  function spend(ctx: HookContext): void {
    const { bonusAd, ap } = derive(ctx.self);
    const ranged = ctx.self.spec.attack.ranged;
    const heal = (rules.healBase + bonusAd * rules.bonusADRatio + ap * rules.apRatio) * (ranged ? rules.rangedHealRatio : 1);
    if (!Number.isFinite(heal)) throw new Error("Fleet Footwork needs finite current healing stats");
    // Spend before applying either effect, including when the heal is capped.
    ctx.memory[CHARGES] = 0;
    ctx.memory[ROUNDING] = 0;
    delete ctx.memory[BURST];
    ctx.apply({ type: "heal", amount: { base: Math.max(0, heal) } }, true);
    ctx.buff(SPEED, "moveSpeedPercent", rules.moveSpeedIncrease * (ranged ? rules.rangedMoveSpeedRatio : 1), rules.moveSpeedDuration);
  }
  function burstContact(ctx: HookContext, burst: number): void {
    const contact = BURST_CONTACT + burst;
    if (ctx.memory[contact]) {
      if (ctx.memory[BURST] === burst && charges(ctx) === rules.maxCharges) spend(ctx);
      return;
    }
    // Track accepted contact independently of the kit's legacy first damage
    // packet, which can be denied even when a later round connects.
    ctx.memory[contact] = true;
    const wasFull = charges(ctx) === rules.maxCharges;
    gain(ctx, rules.attackCharges);
    if (wasFull) spend(ctx);
    else if (charges(ctx) === rules.maxCharges) ctx.memory[BURST] = burst;
  }
  return {
    beforeStart(ctx) {
      if (isBody(ctx)) ctx.memory[CHARGES] = charges(ctx);
    },
    hooks: {
      onBasicAttackLaunched(ctx) {
        if (ctx.launch.triggersOnAttack && observesSelf(ctx, ctx.launch.source)) gain(ctx, rules.attackCharges);
      },
      onMovementObserved(ctx) {
        const { body, from, to } = ctx.movementEvent;
        if (!observesSelf(ctx, body)) return;
        const distance = Math.abs(to - from);
        if (!Number.isFinite(distance)) throw new Error("Fleet Footwork needs a finite movement segment");
        if (distance > 0) gain(ctx, distance / rules.unitsPerCharge);
      },
      onEnergizedFollowUp(ctx) {
        if (!isBody(ctx) || !ctx.self.alive || ctx.self.hp <= 0
          || ctx.enemy === ctx.self || ctx.enemy.petId !== undefined || ctx.enemy.spec.unitClass === "clone"
          || ctx.world.units[ctx.enemy.side] !== ctx.enemy) return;
        burstContact(ctx, ctx.burst);
      },
      onResolvedOnHit(ctx) {
        const hit = ctx.onHit;
        if (!observesSelf(ctx, hit.source) || hit.target.kind !== "champion" || hit.target.side === ctx.self.side
          || hit.blocked || !Number.isFinite(hit.incomingScale) || hit.incomingScale <= 0) return;
        if (hit.attack ? hit.energizedOnHit === false : hit.ability?.flags.fleetFootwork !== true) return;
        if (hit.energizedBurst !== undefined) {
          burstContact(ctx, hit.energizedBurst);
          return;
        }
        if (!hit.attack || hit.energizedOnHit) gain(ctx, rules.attackCharges);
        if (charges(ctx) < rules.maxCharges) return;
        spend(ctx);
      },
    },
    assumptions: [
      `Fleet Footwork begins with the declared ${initial} Energized charges. The model accumulates fractional charges for each observed one-dimensional movement segment, including dashes, blinks and displacement.`,
      "A completed basic windup that triggers on-attack effects grants six charges even when its target avoids contact. Designated extra shots gain charges on accepted contact. Zeri gains from the first connected Burst Fire round and can spend a pool filled by that round on a later primary round. Each qualifying ability on-hit grants six charges before checking the current pool. The first connected hit at 100 spends the pool and leaves zero, including when movement filled it after launch.",
      "Only a living champion body gains charges or procs Fleet. Consumption requires an unblocked on-hit against the opposing champion body. Marked abilities count each positive native application at full effect, including fractional expected-hit applications. Pet, clone, minion, ward, plant, monster and structure targets are outside this manual model. The source minion healing factor is retained for reference.",
      "The ordinary self-heal samples current bonus AD, AP and attack form immediately after the native on-hit callbacks. Full health and healing prevention still consume charges and grant the one-second speed buff. The level-20 base follows the source growth formula. Exact charge ordering, rounding, heal delivery time, death retention and protected-state interactions are local simulation assumptions.",
      "Charges persist in the body's memory through ordinary death and form changes. Fleet uses the normal movement-speed buff and expiry. Shared Energized state with items and rune-aware build search remain unfinished.",
    ],
  };
}
