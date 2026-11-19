/** Conqueror's source-qualified stacking and full-stack healing in manual duels. */
import { toTicks } from "../engine/rules/time";
import { applyEffect, damageProtected } from "../engine/sim/combat";
import { currentCastInstance } from "../engine/sim/castInstance";
import type { CombatIdentity, FighterSpec, HookContext } from "../engine/sim/spec";
import { other, type Status } from "../engine/sim/state";
import type { CombatRuneRules } from "./effectRules";
import type { RuneEffectBuild } from "./effectRuntime";

type Rules = CombatRuneRules["conqueror"];
const STACKS = "rune-effects:conqueror:8010";
const CAST = "rune:conqueror:cast:";
const BURST = "rune:conqueror:burst:";
const LABEL = "Conqueror";

export function checkedConquerorRules(input: unknown): Rules {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Conqueror requires reviewed numeric rules");
  const rules = input as Rules;
  const ticks = [rules.stackDuration, rules.castCooldown].map(toTicks);
  if (rules.modelLevel !== 20 || rules.maxStacks !== 12 || rules.meleeBasicStacks !== 2 || rules.rangedBasicStacks !== 1
    || rules.spellStacks !== 2 || !ticks.every(t => Number.isSafeInteger(t) && t > 0) || ticks[1]! >= ticks[0]!
    || !Number.isFinite(rules.adaptiveForcePerStack * rules.maxStacks) || rules.adaptiveForcePerStack <= 0
    || rules.adaptiveADRatio !== 0.6 || rules.adaptiveAPRatio !== 1
    || ![rules.meleeHealingRatio, rules.rangedHealingRatio].every(n => Number.isFinite(n) && n > 0 && n <= 1)
    || rules.rangedHealingRatio > rules.meleeHealingRatio) throw new Error("Invalid Conqueror stack, adaptive force or healing rules");
  return { ...rules };
}

function livingChampion(ctx: HookContext): boolean {
  return ctx.world.units[ctx.self.side] === ctx.self && ctx.self.petId === undefined
    && ctx.self.spec.unitClass !== "clone" && ctx.self.alive && ctx.self.hp > 0;
}

function isOpponent(ctx: HookContext, target: CombatIdentity): boolean {
  return target.kind === "champion" && target.side !== ctx.self.side;
}

export function buildConqueror(form: FighterSpec, input: Pick<CombatRuneRules, "conqueror">): RuneEffectBuild {
  if (form.adaptiveType !== "Physical" && form.adaptiveType !== "Magic") {
    throw new Error("Conqueror requires the champion's explicit adaptive force tie type");
  }
  const rules = checkedConquerorRules(input.conqueror);
  const duration = toTicks(rules.stackDuration);
  const cooldown = toTicks(rules.castCooldown);
  const active = (ctx: HookContext) => ctx.self.statuses.find(status => status.memoKey === STACKS && status.endTick > ctx.tick);
  const basicStacks = (ranged: boolean) => ranged ? rules.rangedBasicStacks : rules.meleeBasicStacks;

  function setStats(ctx: HookContext, status: Status): void {
    const ad = ctx.self.spec.bonus?.ad ?? 0;
    const ap = ctx.self.spec.bonus?.ap ?? 0;
    const tie = ctx.self.spec.adaptiveType;
    if (!Number.isFinite(ad) || !Number.isFinite(ap) || (tie !== "Physical" && tie !== "Magic")) {
      throw new Error("Conqueror needs finite plain-stat purchases and an explicit adaptive force tie type");
    }
    const physical = ad > ap || (ad === ap && tie === "Physical");
    status.key = physical ? "AD" : "AP";
    status.value = (status.charges ?? 0) * rules.adaptiveForcePerStack * (physical ? rules.adaptiveADRatio : rules.adaptiveAPRatio);
  }

  function gain(ctx: HookContext, added: number): void {
    const previous = active(ctx);
    const held = previous?.charges ?? 0;
    const stacks = Math.min(rules.maxStacks, held + added);
    if (stacks === held && !previous) return;
    const status: Status = previous ?? {
      kind: "stat", key: "AD", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick,
      value: 0, memoKey: STACKS, ability: LABEL,
    };
    status.charges = stacks;
    status.endTick = ctx.tick + duration;
    setStats(ctx, status);
    if (!previous) {
      ctx.self.statuses = ctx.self.statuses.filter(row => row.memoKey !== STACKS);
      ctx.self.statuses.push(status);
    }
    if (stacks > held) ctx.log(`gains Conqueror stacks (${stacks}/${rules.maxStacks})`);
  }

  function claim(ctx: HookContext, key: string): boolean {
    if (ctx.self.statuses.some(status => status.memoKey === key && status.endTick > ctx.tick)) return false;
    ctx.self.statuses.push({
      kind: "mark", key, memoKey: key, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + cooldown, value: 0,
    });
    return true;
  }

  function basic(ctx: HookContext, count: number, cast?: number, burst?: number): void {
    if (burst !== undefined && !claim(ctx, BURST + burst)) return;
    if (cast !== undefined) claim(ctx, CAST + cast);
    gain(ctx, count);
  }

  return {
    hooks: {
      onFormChanged(ctx) {
        const status = active(ctx);
        ctx.self.statuses = ctx.self.statuses.filter(row => row.memoKey !== STACKS || row === status);
        if (status) setStats(ctx, status);
      },
      onResolvedOnHit(ctx) {
        const { onHit: hit } = ctx;
        const contact = hit.damageContact;
        if (!livingChampion(ctx) || hit.source.kind !== "champion" || !isOpponent(ctx, hit.target) || !contact || contact.protected
          || !Number.isFinite(hit.incomingScale) || hit.incomingScale <= 0) return;
        const flags = hit.ability?.flags;
        if (hit.attack || flags?.basicDamage || contact.basicStacks) {
          basic(ctx, contact.basicStacks ?? basicStacks(contact.ranged), contact.castInstance, hit.attackBurst);
        }
      },
      onPrimaryBurstRound(ctx) {
        if (!livingChampion(ctx) || ctx.enemy !== ctx.world.units[other(ctx.self.side)] || ctx.enemy.spec.unitClass === "clone"
          || damageProtected(ctx.world, ctx.self, ctx.enemy)) return;
        basic(ctx, basicStacks(ctx.self.spec.attack.ranged), currentCastInstance(ctx.world, ctx.self), ctx.burst);
      },
      onOwnedPetBasicHit(ctx) {
        const stacks = ctx.pet.spec.conquerorOwnerOnHit;
        if (!livingChampion(ctx) || stacks === undefined || ctx.blocked || ctx.targetPet
          || ctx.target !== ctx.world.units[other(ctx.self.side)] || ctx.target.spec.unitClass === "clone"
          || damageProtected(ctx.world, { ...ctx.self, x: ctx.pet.x }, ctx.target)) return;
        gain(ctx, stacks);
      },
      onDamageResolved(ctx) {
        const { damage } = ctx;
        const petDamage = damage.source.kind === "pet" && damage.kind === "pet" && damage.castInstance !== undefined;
        if (!livingChampion(ctx) || (damage.source.kind !== "champion" && !petDamage) || !isOpponent(ctx, damage.target)
          || !Number.isFinite(damage.mitigated) || damage.mitigated <= 0) return;
        if (active(ctx)?.charges === rules.maxStacks) {
          const ratio = damage.ranged ? rules.rangedHealingRatio : rules.meleeHealingRatio;
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "heal", amount: { base: damage.mitigated * ratio } }, { scale: 1 });
        }
        if ((damage.kind === "spell" || damage.kind === "default" || petDamage) && damage.castInstance !== undefined) {
          const earned = damage.conquerorPerPacket || claim(ctx, CAST + damage.castInstance);
          gain(ctx, earned ? rules.spellStacks : 0);
        }
      },
    },
    assumptions: [
      "Conqueror begins with zero stacks. Qualified basic contacts, including damage blocks, grant two melee or one ranged stack unless an ability has its own reviewed amount. Eligible positive spell and default damage grants two stacks per cast at intervals of at least four seconds. Qualifying repeat damage during that lockout refreshes held stacks. The five-second stack timer expires before same-tick contacts.",
      "Adaptive force compares the current plain-stat purchases and explicit shard bonuses, using the champion's adaptive type on a tie. Champion passive and temporary stats are excluded from that comparison. Its own stat buff carries across form changes and uses the native stat and expiry rules.",
      "Full-stack healing uses the positive native post-mitigation damage, including absorption and before health floors or overkill. The packet which raises stacks to twelve does not receive the new heal. The current attack form supplies the melee or ranged healing factor. Ordinary healing modifiers and caps apply.",
      "This partial model qualifies the opposing champion body, native cast deliveries and reviewed attached hit exceptions. Some source-qualified summoned attacks carry their own cast identities. Custom periodic and summoned damage needs an explicit source tag and cast identity. Clone targets, general pet ownership rules and unclassified stack triggers remain outside this model.",
    ],
  };
}
