/** Explicit Grasp of the Undying for manual plain-stat duels. */
import { toTicks } from "../engine/rules/time";
import { log } from "../engine/sim/combat";
import { derive } from "../engine/sim/derived";
import { grantPermanentBonusHealth } from "../engine/sim/healthGain";
import type { HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Grasp of the Undying";
const PREFIX = "rune:grasp:";
const STACKS = PREFIX + "stacks";
const NEXT_STACK = PREFIX + "next-stack";
const COMBAT_UNTIL = PREFIX + "combat-until";
const READY_UNTIL = PREFIX + "ready-until";
const HEAL_AT = PREFIX + "heal-at";
const RAW_HEAL = PREFIX + "raw-heal";
type Rules = CombatRuneRules["grasp"];

export function checkedGraspRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const positive = (amount: number): boolean => Number.isFinite(amount) && amount > 0;
  const times = [rules.stackInterval, rules.combatWindow, rules.readyWindow, rules.healDelay];
  if (rules.maxStacks !== 4 || !times.every(time => positive(time) && Number.isSafeInteger(toTicks(time)) && toTicks(time) > 0)
    || toTicks(rules.healDelay) >= toTicks(rules.stackInterval) || rules.combatWindow < rules.stackInterval
    || ![rules.meleeDamageRatio, rules.rangedDamageRatio, rules.meleeHealRatio, rules.rangedHealRatio].every(ratio => positive(ratio) && ratio <= 1)
    || rules.rangedDamageRatio > rules.meleeDamageRatio || rules.rangedHealRatio > rules.meleeHealRatio || rules.rangedHealth > rules.meleeHealth
    || ![rules.meleeHealth, rules.rangedHealth].every(health => positive(health) && Number.isSafeInteger(health))) {
    throw new Error(`${LABEL} requires finite health ratios, positive health awards and valid timing for four stacks`);
  }
  return { ...rules };
}

function clearCharge(ctx: HookContext): void {
  delete ctx.memory[STACKS];
  delete ctx.memory[NEXT_STACK];
  delete ctx.memory[COMBAT_UNTIL];
  delete ctx.memory[READY_UNTIL];
}

function clearHeal(ctx: HookContext): void {
  delete ctx.memory[HEAL_AT];
  delete ctx.memory[RAW_HEAL];
}

const isBody = (ctx: HookContext): boolean => ctx.self.petId === undefined
  && ctx.self.spec.unitClass !== "clone" && ctx.world.units[ctx.self.side] === ctx.self;
const active = (ctx: HookContext): boolean => isBody(ctx) && ctx.self.alive && ctx.self.hp > 0
  && !ctx.self.fallen && !ctx.self.deathDefied && !ctx.self.deathNotified;

export function buildGrasp(input: Pick<CombatRuneRules, "grasp">): { hooks: KitHooks; assumptions: string[] } {
  const rules = checkedGraspRules(input?.grasp);
  const interval = toTicks(rules.stackInterval);
  const combatDuration = toTicks(rules.combatWindow);
  const readyDuration = toTicks(rules.readyWindow);
  const healDelay = toTicks(rules.healDelay);

  function ready(ctx: HookContext): boolean {
    const expiry = ctx.memory[READY_UNTIL];
    if (typeof expiry === "number") {
      if (ctx.tick < expiry) return true;
      clearCharge(ctx);
      return false;
    }
    const next = ctx.memory[NEXT_STACK], end = ctx.memory[COMBAT_UNTIL];
    if (typeof next !== "number" || typeof end !== "number") return false;
    const count = typeof ctx.memory[STACKS] === "number" ? ctx.memory[STACKS] : 0;
    const through = Math.min(end, ctx.tick);
    if (through >= next) {
      const gained = Math.floor((through - next) / interval) + 1;
      const missing = rules.maxStacks - count;
      if (gained >= missing) {
        const until = next + (missing - 1) * interval + readyDuration;
        clearCharge(ctx);
        if (ctx.tick >= until) return false;
        ctx.memory[READY_UNTIL] = until;
        log(ctx.world, ctx.self.side, `${LABEL} is ready`);
        return true;
      }
      ctx.memory[STACKS] = count + gained;
      ctx.memory[NEXT_STACK] = next + gained * interval;
    }
    if (ctx.tick > end) clearCharge(ctx);
    return false;
  }

  function contactDamage(ctx: HookContext): void {
    if (ready(ctx)) {
      ctx.memory[READY_UNTIL] = ctx.tick + readyDuration;
      return;
    }
    ctx.memory[NEXT_STACK] ??= ctx.tick + interval;
    ctx.memory[COMBAT_UNTIL] = ctx.tick + combatDuration;
  }

  function upkeep(ctx: HookContext): void {
    if (!isBody(ctx)) return;
    if (!active(ctx)) {
      clearCharge(ctx);
      clearHeal(ctx);
      return;
    }
    ready(ctx);
    const due = ctx.memory[HEAL_AT];
    if (typeof due !== "number" || ctx.tick < due) return;
    const amount = ctx.memory[RAW_HEAL];
    clearHeal(ctx);
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) throw new Error(`${LABEL} requires a positive stored heal`);
    ctx.apply({ type: "heal", amount: { base: amount } }, true);
  }

  return {
    hooks: {
      onCombatActivity(ctx) {
        const event = ctx.combatActivity;
        if (!active(ctx) || event.kind !== "damage" || event.target.kind !== "champion") return;
        const sourceQualifies = event.source.kind === "champion" || event.source.kind === "pet";
        const dealt = event.source.side === ctx.self.side && sourceQualifies;
        const received = event.target.side === ctx.self.side && (sourceQualifies || event.source.kind === "clone");
        if (dealt || received) contactDamage(ctx);
      },
      onDamageObserved(ctx) {
        const pet = ctx.targetPet;
        if (!pet || pet.owner === ctx.self.side || !active(ctx) || ctx.source.side !== ctx.self.side || ctx.source.spec.unitClass === "clone"
          || (ctx.source !== ctx.self && ctx.source.petId === undefined)) return;
        if (pet.spec.targetClass === "champion" || pet.spec.targetClass === "minion" || pet.spec.targetClass === "monster"
          || pet.spec.structureClass === "turret") contactDamage(ctx);
      },
      onResolvedOnHit(ctx) {
        const hit = ctx.onHit;
        if (!active(ctx) || hit.source.kind !== "champion" || hit.source.side !== ctx.self.side
          || hit.target.kind !== "champion" || hit.target.side === ctx.self.side || hit.blocked || hit.protected
          || !Number.isFinite(hit.incomingScale) || hit.incomingScale <= 0 || !ready(ctx)) return;
        const maximum = derive(ctx.self).maxHp;
        if (!Number.isFinite(maximum) || maximum <= 0) throw new Error(`${LABEL} requires positive finite maximum health at contact`);
        const damage = maximum * (hit.ranged ? rules.rangedDamageRatio : rules.meleeDamageRatio);
        const heal = maximum * (hit.ranged ? rules.rangedHealRatio : rules.meleeHealRatio);
        const health = hit.ranged ? rules.rangedHealth : rules.meleeHealth;
        clearCharge(ctx);
        // The connected attack starts a new charge before any nested damage observers run.
        contactDamage(ctx);
        ctx.memory[HEAL_AT] = ctx.tick + healDelay;
        ctx.memory[RAW_HEAL] = heal;
        ctx.apply({ type: "damage", damageType: "magic", amount: { base: damage }, label: LABEL, petDamageCategory: "proc" });
        grantPermanentBonusHealth(ctx, health, PREFIX + hit.sequence, LABEL);
      },
      onTick: upkeep,
      onTickWhileDead: upkeep,
    },
    assumptions: [
      "Grasp starts empty. The first stack matures a second after qualifying damage. Damage renews the three-second charging window and the five-second primed window. A charging pulse at the exact deadline counts; primed stacks expire before contacts on the exact expiry tick. These are local timing policies.",
      "Accepted native champion damage, including shielded and zero damage, and resolved positive damage to classified enemy units keep the clock active. An ordinary pet can credit its controller. A hostile clone can start its victim's clock; its outgoing damage belongs to the clone. Crowd control alone leaves the damage clock untouched.",
      "A positive native on-hit application from the living champion body against the opposing champion body consumes the charge. Blocked, evaded and damage-protected contacts leave it primed. The separate magic proc uses full value on accepted partial-effect applications. Parrrley's on-hit uses the ranged values.",
      "The proc and heal sample maximum health and attack form at contact, before the new permanent award. The award uses normal direct bonus-health scaling and conversion. The heal follows the client missile's 0.4-second flight in this model, using ordinary healing modifiers and caps at delivery. Exact live callback timing remains unmeasured.",
      "Death, a counted death, fallen and death-defied states cancel charging and pending healing. A pending heal does not extend a finished duel. Each duel starts with zero pre-fight Grasp procs. Champion-clone consumption, unclassified summons, and full-page substitutions remain outside this partial effect.",
    ],
  };
}
