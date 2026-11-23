/** One actual hostile champion-body takedown and a body-local delayed heal. */
import { toTicks } from "../engine/rules/time";
import type { HookContext, KillCreditSnapshot, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const ENTITLED = "rune:triumph:entitled";
const PENDING = "rune:triumph:pending";
const DUE = "rune:triumph:due";
const RAW = "rune:triumph:raw";

export interface TriumphBuild {
  hooks: KitHooks;
  assumptions: string[];
}

/** Snapshot numeric rules once; all pending state belongs to the actual Unit. */
export function buildTriumph(rules: Pick<CombatRuneRules, "triumph">): TriumphBuild {
  const source = rules?.triumph;
  if (!source || typeof source !== "object") throw new Error("Triumph requires reviewed numeric rules");
  const { maximumHealthRatio, missingHealthRatio, delay, bonusGold, missingHealthModel } = source;
  if (![maximumHealthRatio, missingHealthRatio].every(value => typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 1)
    || typeof delay !== "number" || !Number.isFinite(delay) || delay <= 0
    || !Number.isSafeInteger(bonusGold) || bonusGold <= 0 || missingHealthModel !== "at-native-kill-credit") {
    throw new Error("Triumph requires positive finite health fractions and delay, a positive safe-integer economic reference and the reviewed snapshot policy");
  }
  const delayTicks = toTicks(delay);
  if (!Number.isSafeInteger(delayTicks) || delayTicks <= 0) throw new Error("Triumph delay must resolve to positive safe-integer ticks");
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  const eligibleNow = (ctx: HookContext) => ctx.self.alive && ctx.self.hp > 0
    && !ctx.self.fallen && !ctx.self.deathDefied && !ctx.self.deathNotified;
  const consume = (ctx: HookContext): void => {
    ctx.memory[PENDING] = false;
    delete ctx.memory[DUE];
    delete ctx.memory[RAW];
  };
  const checkedCredit = (ctx: HookContext & { readonly killCredit?: KillCreditSnapshot }): KillCreditSnapshot => {
    const credit = ctx.killCredit;
    if (!credit || !Object.isFrozen(credit)
      || !Number.isSafeInteger(credit.tick) || credit.tick < 0 || credit.tick !== ctx.tick
      || ![credit.hp, credit.maxHp, credit.missingHp].every(Number.isFinite) || !(credit.maxHp > 0)
      || credit.missingHp !== Math.max(0, credit.maxHp - credit.hp)
      || ![credit.alive, credit.fallen, credit.deathDefied, credit.resurrecting, credit.deathNotified, credit.victimIsEnemyChampionBody]
        .every(value => typeof value === "boolean")) {
      throw new Error("Triumph requires an immutable native kill-credit snapshot; mutable callback health is not a substitute");
    }
    return credit;
  };
  const release = (ctx: HookContext): void => {
    if (!isBody(ctx) || ctx.memory[PENDING] !== true) return;
    // A counted death is sticky even when a fixture restores HP before upkeep.
    // Positive-HP attackable resurrection remains on ordinary healing rules.
    if (!eligibleNow(ctx)) { consume(ctx); return; }
    const due = ctx.memory[DUE], raw = ctx.memory[RAW];
    if (typeof due !== "number" || !Number.isSafeInteger(due) || due < 0
      || typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) {
      throw new Error("Triumph pending entitlement must have a finite heal and safe deadline");
    }
    if (ctx.tick < due) return;
    consume(ctx);
    ctx.apply({ type: "heal", amount: { base: raw } }, true);
  };
  return {
    hooks: {
      onKill(ctx) {
        if (!isBody(ctx)) return;
        const credit = checkedCredit(ctx);
        if (!credit.victimIsEnemyChampionBody || !credit.alive || !(credit.hp > 0)
          || credit.fallen || credit.deathDefied || credit.deathNotified || !eligibleNow(ctx)) return;
        // Current duels contain one hostile champion body and native dispatch
        // credits it once. This is not a multiplayer pending-heal queue.
        if (ctx.memory[ENTITLED] === true) return;
        const raw = maximumHealthRatio * credit.maxHp + missingHealthRatio * credit.missingHp;
        const due = credit.tick + delayTicks;
        if (!Number.isFinite(raw) || raw <= 0 || !Number.isSafeInteger(due)) {
          throw new Error("Triumph entitlement must remain finite with a safe deadline");
        }
        ctx.memory[ENTITLED] = true;
        ctx.memory[PENDING] = true;
        ctx.memory[DUE] = due;
        ctx.memory[RAW] = raw;
      },
      onTick: release,
      onTickWhileDead: release,
    },
    assumptions: [
      "Triumph triggers only on an actual hostile champion-body kill credited by the simulator, including native owned-pet credit. No assists, farm, summon-victim takedowns or pre-fight entitlements are invented.",
      "Missing health is snapshotted at native kill credit before composed onKill callbacks; the maximum-health term uses the same frame. This is an explicit simulation phase policy, not source proof of global live ordering or maximum-health snapshot timing.",
      `Triumph's raw heal is delivered on the first due upkeep tick after ${delay} seconds, using current ordinary healing modifiers and health ceilings. Modifier timing is a model assumption; the pending heal does not prolong an otherwise completed duel.`,
      "Dead, zero-HP, counted-dead, fallen or death-defied owners receive no new entitlement and cancel a pending entitlement. Positive-HP attackable resurrection uses ordinary healing, and stasis alone does not cancel it. Exact Triumph-specific lifecycle handling remains unmeasured.",
      `The sourced ${bonusGold} extra gold is economic and remains unmodeled: it is neither awarded nor added to the duel's fixed stat budget or loadout.`,
      "This partial timer supports the current single-hostile-body duel, not a general queue or the documented repeat-takedown pending-heal update bug. It does not model the visual missile's unintended friendly missile-destruction exceptions.",
    ],
  };
}
