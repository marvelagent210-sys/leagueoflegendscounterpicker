/** Explicitly selected, bounded Press the Attack combat effect. */
import { toTicks } from "../engine/rules/time";
import { derive } from "../engine/sim/derived";
import type { CombatIdentity, FighterSpec, HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";
import { outgoingRuneHooks, type RuneDamageIncrease } from "./outgoingAmplifiers";

const PREFIX = "rune:press-the-attack:";
const STACKS = PREFIX + "stacks", TARGET = PREFIX + "target", EXPIRY = PREFIX + "expiry";
const READY = PREFIX + "ready", ACTIVE = PREFIX + "active", ACTIVITY = PREFIX + "activity";
type Rules = CombatRuneRules["pressTheAttack"];

/** Copy the reviewed decision so caller mutation cannot change a running fight. */
export function checkedPressTheAttackRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Press the Attack requires reviewed numeric rules");
  const rule = value as Rules;
  if (rule.modelLevel !== 20 || rule.hitsRequired !== 3
    || rule.combatExpiryModel !== "last-qualified-activity"
    || rule.adaptiveDamageModel !== "current-derived-bonus-ad-vs-ap"
    || rule.activationFrameModel !== "simulation-tick"
    || ![rule.damage, rule.stackDuration, rule.cooldown, rule.damageIncrease, rule.combatDuration]
      .every(n => typeof n === "number" && Number.isFinite(n) && n > 0)
    || rule.damageIncrease > 1
    || ![rule.stackDuration, rule.cooldown, rule.combatDuration].every(n => Number.isSafeInteger(toTicks(n)) && toTicks(n) > 0)) {
    throw new Error("Press the Attack requires positive finite rules, three hits, model level 20 and the reviewed adaptive, frame and combat policies");
  }
  return { ...rule };
}

const isBody = (ctx: HookContext): boolean => ctx.self.petId === undefined
  && ctx.self.spec.unitClass !== "clone" && ctx.world.units[ctx.self.side] === ctx.self;
const aliveBody = (ctx: HookContext): boolean => isBody(ctx) && ctx.self.alive && ctx.self.hp > 0;
function tick(value: number): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("Press the Attack requires a nonnegative safe-integer tick");
}
function stored(ctx: HookContext, key: string): number | undefined {
  const value = ctx.memory[key];
  if (value === undefined) return undefined;
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Press the Attack state requires nonnegative safe integers");
  return value;
}
function deadline(now: number, duration: number): number {
  const due = now + duration;
  if (!Number.isSafeInteger(due)) throw new Error("Press the Attack deadline must be a safe integer");
  return due;
}
function frame(ctx: HookContext, event: { tick: number; sequence: number; source: CombatIdentity; target: CombatIdentity }): void {
  if (!event || !Object.isFrozen(event) || !Object.isFrozen(event.source) || !Object.isFrozen(event.target)
    || event.tick !== ctx.tick || !Number.isSafeInteger(event.sequence) || event.sequence <= 0) {
    throw new Error("Press the Attack requires an immutable native event snapshot");
  }
  tick(event.tick);
}
function clearStacks(ctx: HookContext): void {
  delete ctx.memory[STACKS]; delete ctx.memory[TARGET]; delete ctx.memory[EXPIRY];
}
function clearBuff(ctx: HookContext): void { delete ctx.memory[ACTIVE]; }

export function buildPressTheAttack(form: FighterSpec, input: Pick<CombatRuneRules, "pressTheAttack">): {
  hooks: KitHooks; enemyHooks: KitHooks[]; enemyDamageIncrease: RuneDamageIncrease; assumptions: string[];
} {
  if (form.adaptiveType !== "Physical" && form.adaptiveType !== "Magic") {
    throw new Error("Press the Attack requires the champion's explicit adaptive damage tie type");
  }
  const rules = checkedPressTheAttackRules(input?.pressTheAttack);
  const stackTicks = toTicks(rules.stackDuration), cooldownTicks = toTicks(rules.cooldown), combatTicks = toTicks(rules.combatDuration);
  const expire = (ctx: HookContext): void => {
    tick(ctx.tick);
    const expiry = stored(ctx, EXPIRY);
    if (expiry !== undefined && ctx.tick >= expiry) clearStacks(ctx);
    const active = stored(ctx, ACTIVE), activity = stored(ctx, ACTIVITY);
    if (active !== undefined && (activity === undefined || ctx.tick >= deadline(activity, combatTicks))) clearBuff(ctx);
  };
  const activity = (ctx: HookContext): void => {
    // Expire before refreshing, so a late event cannot revive an expired buff.
    expire(ctx);
    ctx.memory[ACTIVITY] = ctx.tick;
  };
  const enemyDamageIncrease: RuneDamageIncrease = (ctx) => {
    if (ctx.self.petId !== undefined || ctx.self.spec.unitClass === "clone" || ctx.world.units[ctx.self.side] !== ctx.self
      || ctx.enemy.side === ctx.self.side || ctx.enemy.petId !== undefined || ctx.enemy.spec.unitClass === "clone"
      || ctx.world.units[ctx.enemy.side] !== ctx.enemy || !ctx.enemy.alive || !(ctx.enemy.hp > 0)) return 0;
    // Current PTA history excludes Smite, not Ignite. Exact labels remain a
    // bounded adapter; this does not establish every summoner classification.
    if (ctx.damageType === "true" && ctx.ability === "Smite") return 0;
    tick(ctx.tick);
    const owner = { ...ctx, self: ctx.enemy, memory: ctx.enemy.memory };
    const active = stored(owner, ACTIVE), last = stored(owner, ACTIVITY);
    if (active === undefined || last === undefined || ctx.tick <= active || ctx.tick >= deadline(last, combatTicks)) return 0;
    return rules.damageIncrease;
  };
  const reset = (ctx: HookContext): void => { clearStacks(ctx); clearBuff(ctx); delete ctx.memory[ACTIVITY]; };
  return {
    hooks: {
      onResolvedOnHit(ctx) {
        if (!aliveBody(ctx)) return;
        const hit = ctx.onHit;
        frame(ctx, hit);
        if (!hit.pressTheAttackEligible || hit.source.kind !== "champion" || hit.source.side !== ctx.self.side
          || hit.target.kind !== "champion" || hit.target.side === ctx.self.side) return;
        activity(ctx);
        const ready = stored(ctx, READY);
        if (ready !== undefined && ctx.tick < ready) return;
        // Side identifies the single actual opposing champion body across forms.
        // Pet/clone targets never enter this bounded stack state.
        const target = "champion:" + hit.target.side;
        const count = stored(ctx, STACKS) ?? 0;
        if (count >= rules.hitsRequired) throw new Error("Press the Attack stack state must be below its consumption threshold");
        const next = (ctx.memory[TARGET] === target ? count : 0) + 1;
        if (next < rules.hitsRequired) {
          ctx.memory[TARGET] = target; ctx.memory[STACKS] = next; ctx.memory[EXPIRY] = deadline(ctx.tick, stackTicks);
          return;
        }
        clearStacks(ctx);
        ctx.memory[READY] = deadline(ctx.tick, cooldownTicks);
        // A later proc while the buff remains active keeps its original frame;
        // resetting it here would incorrectly suppress that proc's amplification.
        if (stored(ctx, ACTIVE) === undefined) ctx.memory[ACTIVE] = ctx.tick;
        const stats = derive(ctx.self), tie = ctx.self.spec.adaptiveType;
        if (!Number.isFinite(stats.bonusAd) || !Number.isFinite(stats.ap) || (tie !== "Physical" && tie !== "Magic")) {
          throw new Error("Press the Attack requires finite current bonus AD/AP and an explicit adaptive tie type");
        }
        const damageType = stats.bonusAd > stats.ap ? "physical" : stats.ap > stats.bonusAd ? "magic" : tie === "Magic" ? "magic" : "physical";
        // No ability context or on-hit scale: this is a separate proc, not a spell
        // effect and not reduced by an ability's partial on-hit effectiveness.
        ctx.apply({ type: "damage", damageType, amount: { base: rules.damage }, label: "Press the Attack", petDamageCategory: "proc" });
      },
      onCombatActivity(ctx) {
        if (!aliveBody(ctx)) return;
        const event = ctx.combatActivity;
        frame(ctx, event);
        if (event.source.side === event.target.side || event.source.kind === "clone" || event.target.kind === "clone") return;
        const ownSource = event.source.side === ctx.self.side && (event.source.kind === "champion" || event.source.kind === "pet");
        const ownTarget = event.target.side === ctx.self.side && event.target.kind === "champion";
        const enemySource = event.source.side !== ctx.self.side && (event.source.kind === "champion" || event.source.kind === "pet");
        if ((ownSource && event.target.kind === "champion" && event.target.side !== ctx.self.side) || (ownTarget && enemySource)) activity(ctx);
      },
      onTick(ctx) { if (isBody(ctx)) { if (aliveBody(ctx)) expire(ctx); else reset(ctx); } },
      onTickWhileDead(ctx) { if (isBody(ctx)) reset(ctx); },
    },
    enemyHooks: outgoingRuneHooks([enemyDamageIncrease]),
    enemyDamageIncrease,
    assumptions: [
      "Press the Attack is a partial manual level-20 effect. The explicit source formula gives 2960/17 damage; client MinDamage/MaxDamage endpoint names do not prove a level-20 cap or reveal the hidden live formula.",
      "Stacks use accepted native on-hit applications from the actual living champion body against the opposing actual champion body. Multiple explicitly declared applications count separately; split damage packets do not. Ability contacts require reviewed eligibility metadata; unclassified contacts, pet/clone stacking and clone-victim resets remain unsupported.",
      "Stack expiry is inclusive at " + rules.stackDuration + " seconds and cooldown readiness inclusive at " + rules.cooldown + " seconds after consumption, without haste. The native post-on-hit callback phase and these equality boundaries are local policies. Other Renekton attached on-hit effects retain their existing once-per-attack approximation despite explicit per-strike rune events.",
      "New amplification excludes the whole activation simulation tick (30 Hz), including the third attack, triggering proc and same-tick follow-ups. Later procs retain an already active buff's activation tick and can be amplified. This is a local frame mapping and aggregate callback phase, not measured live ordering.",
      "Adaptive damage samples current derived bonus AD versus AP at proc delivery and uses the current form's source champion tie type. It does not reuse adaptive-force shard selection or its stat-origin rules. The proc ignores on-hit effectiveness and does not trigger ability-hit hooks.",
      "A single " + rules.combatDuration + "-second clock since qualified accepted champion damage, CC or connected eligible on-hit contact controls buff expiry. Zero native damage and ordinary pet-to-champion activity qualify; actual classified clone actors do not. Owner-emitted packets without causal clone metadata cannot establish universal clone-origin behavior. Expiry occurs before a late event refreshes the clock, without adding a second five-second timer. Native invulnerability/stasis/parry guards, pet-victim paths and source-specific modern combat exceptions remain outside this bounded activity surface.",
      "Amplification applies to actual living champion-body source damage against the opposing champion body, including true damage except exact Smite labels. Pet/clone amplification inheritance and universal summoner classification are unsupported. The first dead-body upkeep clears stacks and buff; post-death stacking, lethal/reflection priority and protected-state parity are unmeasured. No rune timer prolongs an ended duel.",
      "The amplifier uses the existing additive outgoing damage bucket through a pure target-qualified raw hook. V26.09 separate amplifier instances, pre-modifier interaction parity and composition with item raw hooks are not implemented by this bounded aggregate approximation.",
    ],
  };
}
