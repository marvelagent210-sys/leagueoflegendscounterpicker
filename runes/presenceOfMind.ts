/** Bounded, explicitly selected Presence of Mind resource restoration. */
import { toTicks } from "../engine/rules/time";
import { derive } from "../engine/sim/derived";
import type { FighterSpec, HookContext, KillCreditSnapshot, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const READY = "rune:presence-of-mind:damage-ready";
const ENTITLED = "rune:presence-of-mind:entitled";
const PENDING = "rune:presence-of-mind:pending";
const DUE = "rune:presence-of-mind:due";
const KIND = "rune:presence-of-mind:kind";
type ResourceKind = "Mana" | "Energy";

export interface PresenceOfMindBuild {
  hooks: KitHooks;
  assumptions: string[];
}

const resourceKind = (spec: FighterSpec): ResourceKind | undefined =>
  spec.resourceType === "Mana" || spec.resourceType === "Energy" ? spec.resourceType : undefined;
const positive = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

/** Numeric rules are copied once; every cooldown and entitlement belongs to the actual body. */
export function buildPresenceOfMind(form: FighterSpec, rules: Pick<CombatRuneRules, "presenceOfMind">): PresenceOfMindBuild {
  if (!resourceKind(form)) throw new Error("Presence of Mind requires an explicit Mana or Energy resource type; automatic rune substitution is not implemented");
  const source = rules?.presenceOfMind;
  if (!source || typeof source !== "object") throw new Error("Presence of Mind requires reviewed numeric rules");
  const { modelLevel, manaRestore, rangedManaRatio, energyRestore, damageCooldown,
    takedownResourceRatio, takedownDelay, maximumResourceModel } = source;
  if (modelLevel !== 20 || maximumResourceModel !== "current-at-delivery"
    || ![manaRestore, energyRestore, damageCooldown, takedownDelay].every(positive)
    || !positive(rangedManaRatio) || rangedManaRatio > 1
    || !positive(takedownResourceRatio) || takedownResourceRatio > 1) {
    throw new Error("Presence of Mind requires positive finite numeric rules, fractions at most one, model level 20 and the reviewed delivery policy");
  }
  const cooldownTicks = toTicks(damageCooldown), delayTicks = toTicks(takedownDelay);
  const rangedManaRestore = manaRestore * rangedManaRatio;
  if (![cooldownTicks, delayTicks].every(value => Number.isSafeInteger(value) && value > 0)
    || !positive(rangedManaRestore)) {
    throw new Error("Presence of Mind requires positive safe-integer ticks and a finite positive ranged restoration");
  }
  const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.world.units[ctx.self.side] === ctx.self;
  const checkedTick = (tick: number): void => {
    if (!Number.isSafeInteger(tick) || tick < 0) throw new Error("Presence of Mind requires a nonnegative safe-integer tick");
  };
  const maximum = (ctx: HookContext): number => {
    const cap = derive(ctx.self).maxResource;
    // Cast affordability has an epsilon; a spent pool can be just below zero.
    // The ordinary resource effect performs the actual [0, maximum] clamping.
    if (!positive(cap) || !Number.isFinite(ctx.self.resource)) {
      throw new Error("Presence of Mind requires a finite resource pool and a positive finite derived maximum");
    }
    return cap;
  };
  const creditFrame = (ctx: HookContext & { readonly killCredit?: KillCreditSnapshot }): KillCreditSnapshot => {
    const credit = ctx.killCredit;
    if (!credit || !Object.isFrozen(credit)
      || !Number.isSafeInteger(credit.tick) || credit.tick < 0 || credit.tick !== ctx.tick
      || ![credit.hp, credit.maxHp, credit.missingHp].every(Number.isFinite) || !(credit.maxHp > 0)
      || credit.missingHp !== Math.max(0, credit.maxHp - credit.hp)
      || ![credit.alive, credit.fallen, credit.deathDefied, credit.resurrecting, credit.deathNotified, credit.victimIsEnemyChampionBody]
        .every(value => typeof value === "boolean")) {
      throw new Error("Presence of Mind requires an immutable native kill-credit snapshot; no native resource snapshot is supplied");
    }
    return credit;
  };
  const consume = (ctx: HookContext): void => {
    ctx.memory[PENDING] = false;
    delete ctx.memory[DUE];
    delete ctx.memory[KIND];
  };
  const release = (ctx: HookContext): void => {
    if (!isBody(ctx)) return;
    const pending = ctx.memory[PENDING];
    if (pending !== undefined && typeof pending !== "boolean") throw new Error("Presence of Mind pending state must be boolean");
    if (pending !== true) return;
    checkedTick(ctx.tick);
    const due = ctx.memory[DUE], savedKind = ctx.memory[KIND];
    if (typeof due !== "number" || !Number.isSafeInteger(due) || due < 0
      || (savedKind !== "Mana" && savedKind !== "Energy")) {
      throw new Error("Presence of Mind pending entitlement requires a safe deadline and exact resource kind");
    }
    if (ctx.tick < due) return;
    // Resource restoration is not HP healing. Death does not cancel this local
    // policy, but the existing world end rules never wait for this timer.
    consume(ctx);
    if (resourceKind(ctx.self.spec) !== savedKind) return;
    const amount = takedownResourceRatio * maximum(ctx);
    if (!positive(amount)) throw new Error("Presence of Mind delivery must remain finite and positive");
    ctx.apply({ type: "resource", amount: { base: amount } }, true);
  };
  return {
    hooks: {
      onDamageObserved(ctx) {
        if (!isBody(ctx) || !ctx.self.alive || !(ctx.self.hp > 0)) return;
        const kind = resourceKind(ctx.self.spec);
        if (!kind || ctx.source.spec.unitClass === "clone") return;
        const ownBody = ctx.source === ctx.self && ctx.source.petId === undefined;
        // A native pet actor may come from an already removed pet's missile.
        // Its captured id/side/class remain valid without a live-pet lookup.
        const ownPet = ctx.source.petId !== undefined && Number.isSafeInteger(ctx.source.petId)
          && ctx.source.petId >= 0 && ctx.source.side === ctx.self.side;
        if (!ownBody && !ownPet) return;
        if (ctx.targetPet !== undefined || ctx.target.petId !== undefined
          || ctx.target.side === ctx.self.side || ctx.world.units[ctx.target.side] !== ctx.target) return;
        if (![ctx.amount, ctx.absorbed].every(value => typeof value === "number" && Number.isFinite(value) && value >= 0)
          || !Number.isFinite(ctx.amount + ctx.absorbed)) {
          throw new Error("Presence of Mind requires finite nonnegative health loss and shield absorption");
        }
        if (!(ctx.amount + ctx.absorbed > 0)) return;
        checkedTick(ctx.tick);
        const ready = ctx.memory[READY];
        if (ready !== undefined && (typeof ready !== "number" || !Number.isSafeInteger(ready) || ready < 0)) {
          throw new Error("Presence of Mind damage cooldown must be a nonnegative safe-integer deadline");
        }
        if (typeof ready === "number" && ctx.tick < ready) return;
        maximum(ctx);
        const deadline = ctx.tick + cooldownTicks;
        if (!Number.isSafeInteger(deadline)) throw new Error("Presence of Mind damage cooldown must have a safe deadline");
        const amount = kind === "Energy" ? energyRestore : ctx.self.spec.attack.ranged ? rangedManaRestore : manaRestore;
        // Consume even at a full pool, and before applying a resource effect.
        ctx.memory[READY] = deadline;
        ctx.apply({ type: "resource", amount: { base: amount } }, true);
      },
      onKill(ctx) {
        if (!isBody(ctx)) return;
        const credit = creditFrame(ctx);
        if (!credit.victimIsEnemyChampionBody) return;
        const kind = resourceKind(ctx.self.spec);
        if (!kind) return;
        const entitled = ctx.memory[ENTITLED];
        if (entitled !== undefined && typeof entitled !== "boolean") throw new Error("Presence of Mind entitlement state must be boolean");
        if (entitled === true) return;
        const due = credit.tick + delayTicks;
        if (!Number.isSafeInteger(due)) throw new Error("Presence of Mind takedown must have a safe deadline");
        ctx.memory[ENTITLED] = true;
        ctx.memory[PENDING] = true;
        ctx.memory[DUE] = due;
        ctx.memory[KIND] = kind;
      },
      onTick: release,
      onTickWhileDead: release,
    },
    assumptions: [
      "Presence of Mind is a partial manual effect for the fixed level-20 Mana/Energy model. The detailed source table supplies its Mana amount; the conflicting 6-50 tooltip fields are not interpolated or used as a cap. Unsupported resource types are rejected, without automatic Triumph substitution.",
      "Damage restoration uses actual reported HP loss plus shield absorption greater than zero against the opposing champion body. Zero-effective packets and clone/pet victims are outside this chosen packet policy. The current owner's form selects Mana's ranged factor; Energy is never range-reduced.",
      "One body-local damage cooldown lasts " + damageCooldown + " seconds without ability-haste scaling and is consumed even at full resource. Full-Mana consumption follows a bug-labelled source note; full-Energy consumption and exact callback timing remain unmeasured model policies.",
      "Native reported ordinary pet actors can trigger their owner's effect, including released missiles after pet removal. Actual clone actors are excluded; owner-emitted kit packets with no causal clone marker cannot establish universal clone-origin behavior.",
      "The existing damage observer requires an alive, positive-HP recipient and can include fallen, death-defied or resurrecting bodies. Ordinary dead/zero-HP damage observations and execute-only damage events are unsupported by this partial event surface.",
      "Actual hostile champion-body kill credit creates one body-local delayed resource entitlement, including native owned-pet credit. No assists, farm, starting entitlements or multiplayer pending queues are invented.",
      "After " + takedownDelay + " seconds, the first due upkeep samples the current derived maximum of the same resource kind and applies capped ordinary resource restoration. Cap sampling at delivery and dead/fallen/protected recipient handling are explicit unmeasured resource policies; death does not cancel it. This is not healing or regeneration and never prolongs an otherwise completed duel.",
    ],
  };
}
