/**
 * The stat budget (PLAN.md section 10): both champions get the same gold, spent on plain
 * stats priced at their gold values from the wiki (Module:Gold value/data), with no item
 * passives or actives.
 *
 * Each champion spends it in small steps on whichever stat raises
 *
 *   ln(damage per second against the enemy) + ln(reference survival time)
 *
 * the most. Damage per second follows the champion's own ratios: attacks, on-hit effects and
 * damaging abilities over their cooldowns, through the enemy's resistances. Effective health
 * is health plus the shields and heals of its abilities over a reference fight, divided by
 * the share of the enemy's damage (its mix by type) that armor and magic resistance let
 * through. Dividing effective health by the enemy's raw DPS gives survival time, including
 * changes to that DPS from target-stat ratios such as maximum-health damage. Maximizing the
 * sum maximizes damage x survival time in this reference fight; the
 * logarithms make each step weigh offense and defense by how much it adds relative to what
 * the champion already has. This is a build-selection heuristic; the tick simulator, rather
 * than this reference, scores the resulting builds.
 *
 * Each side's damage mix and resistances depend on what the other buys, so the sides answer
 * each other's builds over several rounds (see allocateBoth). Penetration is capped near what
 * items give (PENETRATION_CAPS).
 */
import { effectiveResist, resistMultiplier } from "./rules/damage";
import { averageCritFactor, healingReceived } from "./rules/defense";
import { cooldownAfterHaste } from "./rules/timing";
import { toSeconds, toTicks } from "./rules/time";
import { derive, evaluate } from "./sim/derived";
import { createWorld } from "./sim/simulate";
import { type AbilitySpec, type BonusStats, type DamageByType, type Effect, type FighterSpec, type Formula, cooldownKeyOf } from "./sim/spec";
import { type Unit, newUnit } from "./sim/state";

/** Stats the budget can buy, by their gold value keys. */
export const BUDGET_STATS = ["ad", "ap", "as", "crit", "ah", "lethality", "armpen", "mpenflat", "mpen", "hp", "armor", "mr"] as const;
export type BudgetStat = (typeof BUDGET_STATS)[number];

/** Gold per point of each stat (per 1% for attack speed, critical strike chance and percentage penetration). */
export type StatPrices = Record<BudgetStat, number>;

/**
 * The default budget: about what a top laner has earned when the role quest takes it to
 * level 20, late in a game (about five completed items). PLAN.md section 10.
 */
export const DEFAULT_BUDGET = 15000;

/** Gold spent per step of the allocation. */
export const BUDGET_STEP = 50;

/**
 * The most penetration the budget buys (PLAN.md section 10). At gold value, penetration costs
 * less than the armor it cancels: uncapped, both sides bought up to 138 lethality, more than
 * any item build reaches, and armor stopped mattering. The caps are about what a full build
 * gets from items: Lord Dominik's Regards' 35% armor penetration (the most items give, wiki:
 * "Armor penetration"), Void Staff's 40% magic penetration, Spellslinger's Shoes' 20 flat
 * magic penetration (wiki: "Magic penetration"), and two to three lethality items.
 */
export const PENETRATION_CAPS = { lethality: 40, armorPen: 0.35, magicPen: 20, magicPenPercent: 0.4 } as const;

/** Points of a stat still worth buying before its cap, including a kit's multiplier. */
function availablePoints(spec: FighterSpec, bonus: BonusStats, stat: BudgetStat): number {
  const multiplier = spec.budget?.statMultipliers?.[stat] ?? 1;
  const penetrationPoints = (cap: number) => Math.log1p(-cap) / Math.log(0.99);
  switch (stat) {
    case "crit":
      return Math.max(0, (1 / multiplier - (bonus.critChance ?? 0)) * 100);
    case "lethality":
      return Math.max(0, PENETRATION_CAPS.lethality / multiplier - (bonus.lethality ?? 0));
    case "armpen":
      return Math.max(0, penetrationPoints(PENETRATION_CAPS.armorPen) / multiplier - (bonus.armorPenPoints ?? 0));
    case "mpenflat":
      return Math.max(0, PENETRATION_CAPS.magicPen / multiplier - (bonus.magicPen ?? 0));
    case "mpen":
      return Math.max(0, penetrationPoints(PENETRATION_CAPS.magicPenPercent) / multiplier - (bonus.magicPenPoints ?? 0));
    default:
      return Number.POSITIVE_INFINITY;
  }
}

/** Seconds of fighting over which ability shields and heals count toward effective health. */
export const SUSTAIN_WINDOW = 10;

export interface Allocation {
  gold: number;
  bonus: BonusStats;
  /** Gold spent on each stat. */
  spent: Record<BudgetStat, number>;
}

type DamageMix = DamageByType;

function withBonus(spec: FighterSpec, bonus: BonusStats): FighterSpec {
  return { ...spec, bonus };
}

/** Bought stats as the fight will see them: kits that multiply some (Living Forge) say so. */
function valued(spec: FighterSpec, bonus: BonusStats): FighterSpec {
  const m = spec.budget?.statMultipliers;
  if (!m) return withBonus(spec, bonus);
  const times = (value: number | undefined, factor: number | undefined) => (value === undefined ? undefined : value * (factor ?? 1));
  const scaled: BonusStats = { ...bonus };
  const set = (key: keyof BonusStats, factor: number | undefined) => {
    const v = times(bonus[key], factor);
    if (v !== undefined) scaled[key] = v;
  };
  set("ad", m.ad);
  set("ap", m.ap);
  set("attackSpeed", m.as);
  set("critChance", m.crit);
  set("abilityHaste", m.ah);
  set("lethality", m.lethality);
  set("armorPenPoints", m.armpen);
  set("magicPen", m.mpenflat);
  set("magicPenPoints", m.mpen);
  set("hp", m.hp);
  // Total-resistance hints apply to base and bought stats together during initialization.
  // They take precedence over an older purchased-stat hint for the same resistance.
  if (spec.budget?.totalResistanceMultipliers?.armor === undefined) set("armor", m.armor);
  if (spec.budget?.totalResistanceMultipliers?.mr === undefined) set("mr", m.mr);
  return withBonus(spec, scaled);
}

function addStat(bonus: BonusStats, stat: BudgetStat, points: number): BonusStats {
  const next = { ...bonus };
  switch (stat) {
    case "ad":
      next.ad = (next.ad ?? 0) + points;
      break;
    case "ap":
      next.ap = (next.ap ?? 0) + points;
      break;
    case "as":
      next.attackSpeed = (next.attackSpeed ?? 0) + points / 100;
      break;
    case "crit":
      next.critChance = (next.critChance ?? 0) + points / 100;
      break;
    case "ah":
      next.abilityHaste = (next.abilityHaste ?? 0) + points;
      break;
    case "lethality":
      next.lethality = (next.lethality ?? 0) + points;
      break;
    case "mpenflat":
      next.magicPen = (next.magicPen ?? 0) + points;
      break;
    case "armpen":
      next.armorPenPoints = (next.armorPenPoints ?? 0) + points;
      break;
    case "mpen":
      next.magicPenPoints = (next.magicPenPoints ?? 0) + points;
      break;
    case "hp":
      next.hp = (next.hp ?? 0) + points;
      break;
    case "armor":
      next.armor = (next.armor ?? 0) + points;
      break;
    case "mr":
      next.mr = (next.mr ?? 0) + points;
      break;
  }
  return next;
}

function flatten(effects: Effect[]): Effect[] {
  return effects.flatMap((e) => (e.type === "delayed" ? flatten(e.effects) : e.type === "empower" ? [e, ...flatten(e.onHit)] : [e]));
}

const abilityCache = new WeakMap<NonNullable<FighterSpec["forms"]>, AbilitySpec[]>();

/**
 * The abilities the budget values: every form's (Mega Gnar's as well as Mini Gnar's), with
 * versions that share a cooldown counted as alternatives. Cached per set of forms (which every
 * copy of the spec shares), so the per-list caches below keep working.
 */
function abilitiesOf(spec: FighterSpec): AbilitySpec[] {
  const forms = spec.forms;
  if (!forms) return spec.abilities;
  let list = abilityCache.get(forms);
  if (!list) {
    list = Object.values(forms).flatMap((form) => form.abilities);
    abilityCache.set(forms, list);
  }
  return list;
}

function unitOf(spec: FighterSpec, side: 0 | 1): Unit {
  const total = spec.budget?.totalResistanceMultipliers;
  const extra: Effect[] = [];
  for (const [stat, multiplier] of [["armorPercent", total?.armor], ["mrPercent", total?.mr]] as const) {
    // An innate effect already represents the passive when a kit declares it in start.
    if (multiplier !== undefined && !spec.start?.some((effect) => effect.type === "stat" && effect.stat === stat)) {
      extra.push({ type: "stat", stat, amount: { base: multiplier - 1 }, duration: Infinity });
    }
  }
  if (!spec.start?.length && !extra.length) return newUnit(spec, side, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.resourceStart ?? spec.base.resource);
  // Reuse the combat initialization for innate penetration, stack health, resistances, etc.
  // Hook stat multipliers are already represented by valued(), and damage/healing by hints;
  // running onStart here as well would count those multipliers twice.
  const reference = { ...spec, hooks: undefined, start: [...(spec.start ?? []), ...extra] };
  return createWorld({ fighters: [reference, reference], distance: 0, modes: ["idle", "idle"] }).units[side];
}

/** One damage term of an ability's use: a formula dealt `times` times. */
interface DamageTerm {
  damageType: keyof DamageMix;
  amount: Formula;
  amountFor?: (caster: Unit, target: Unit) => number;
  times: number;
  canCrit?: boolean;
  critMultiplier?: number;
  minimum?: Formula;
  pulseFormula?: Formula;
  attackWindow?: number;
}

/** One use per cooldown: an ability with its recasts. */
interface ReferenceTiming {
  cooldown: number;
  cooldownFor?: AbilitySpec["cooldownFor"];
  staticCooldown?: boolean;
  recharge?: number;
  castTime: number;
  castTimeFor?: AbilitySpec["castTimeFor"];
  held: Held;
}

interface Use extends ReferenceTiming {
  terms: DamageTerm[];
}

/** How long a post-effect cooldown waits after the cast: seconds, plus empowered attacks to spend. */
interface Held {
  seconds: number;
  attacks: number;
}

/** What a post-effect cooldown waits for, in the reference fight (AbilitySpec.cooldownAfter). */
function heldOf(ability: AbilitySpec): Held {
  const d = ability.delivery;
  switch (ability.cooldownAfter) {
    case "empower":
      return { seconds: 0, attacks: (ability.onSelf ?? []).reduce((n, e) => n + (e.type === "empower" ? e.attacks : 0), 0) };
    case "channel":
      return { seconds: ability.channel?.duration ?? 0, attacks: 0 };
    case "dash":
      return { seconds: d.kind === "dash" && d.speed > 0 ? d.distance / d.speed : 0, attacks: 0 };
    case "field":
      return { seconds: d.kind === "field" ? (d.delay ?? 0) + d.duration : 0, attacks: 0 };
    case "state": {
      const states = [...(ability.onCastStart ?? []), ...(ability.onSelf ?? [])].filter((e) => e.type === "state");
      return { seconds: Math.max(0, ...states.map((e) => (e.type === "state" ? e.duration : 0))), attacks: 0 };
    }
    default:
      return { seconds: 0, attacks: 0 };
  }
}

/** Keep dynamic callbacks so every candidate build supplies its own timing stats. */
function timingOf(ability: AbilitySpec): ReferenceTiming {
  return {
    cooldown: ability.cooldown,
    ...(ability.cooldownFor ? { cooldownFor: ability.cooldownFor } : {}),
    ...(ability.staticCooldown ? { staticCooldown: true } : {}),
    ...(ability.charges ? { recharge: ability.charges.recharge } : {}),
    castTime: ability.castTime,
    ...(ability.castTimeFor ? { castTimeFor: ability.castTimeFor } : {}),
    held: heldOf(ability),
  };
}

/** Cast duration for the candidate unit, with dynamic casts quantized as they are in combat. */
function castTimeOf(use: { castTime: number; castTimeFor?: AbilitySpec["castTimeFor"] }, self: Unit): number {
  // Evaluate after the candidate stats are installed; cache the callback, never its result.
  return use.castTimeFor ? toSeconds(toTicks(use.castTimeFor(self))) : use.castTime;
}

/** Seconds from one use to the next: the cooldown after haste, the cast, and any post-effect wait. */
function cycleOf(use: ReferenceTiming, self: Unit): number {
  const d = derive(self);
  const base = use.cooldownFor?.(self) ?? use.cooldown;
  let cooldown = use.staticCooldown ? base : cooldownAfterHaste(base, d.abilityHaste);
  // Static cast cooldowns do not make a separate charge-recharge timer immune to haste.
  if (use.recharge !== undefined) cooldown = Math.max(cooldown, cooldownAfterHaste(use.recharge, d.abilityHaste));
  if (cooldown <= 0) return 0;
  return cooldown + castTimeOf(use, self) + use.held.seconds + (d.attackSpeed > 0 ? use.held.attacks / d.attackSpeed : 0);
}

const termCache = new WeakMap<AbilitySpec, DamageTerm[]>();

/** An ability's damage per use: its hits, channel pulses and empowered attacks (worked out once). */
function damageTerms(ability: AbilitySpec): DamageTerm[] {
  const cached = termCache.get(ability);
  if (cached) return cached;
  const pulses = ability.channel?.interval ? Math.max(1, Math.round(ability.channel.duration / ability.channel.interval)) : 0;
  // A field's effects land on every pulse while the enemy stays inside (every hit of a cluster).
  const d = ability.delivery;
  const hits =
    d.kind !== "field"
      ? 1
      : d.burst
        ? d.burst.count * (Math.floor((d.duration - (d.burst.count - 1) * d.burst.gap) / d.interval + 1e-9) + 1)
        : Math.max(1, Math.round(d.duration / d.interval));
  const groups: Array<[Effect[], number, Formula?, number?]> = [
    [ability.onHit ?? [], hits],
    [ability.channel?.onTick ?? [], pulses, ability.channel?.pulses],
    [ability.channel?.onComplete ?? [], 1],
  ];
  for (const e of ability.onSelf ?? []) if (e.type === "empower") groups.push([e.onHit, e.attacks, undefined, e.window]);
  const terms: DamageTerm[] = [];
  for (const [effects, times, pulseFormula, attackWindow] of groups) {
    for (const e of flatten(effects)) {
      const repeats = { times, ...(pulseFormula ? { pulseFormula } : {}), ...(attackWindow !== undefined ? { attackWindow } : {}) };
      if (e.type === "damage") terms.push({ ...e, ...repeats });
      else if (e.type === "dot") terms.push({ damageType: e.damageType, amount: e.total, ...repeats });
    }
  }
  termCache.set(ability, terms);
  return terms;
}

const useCache = new WeakMap<AbilitySpec[], Use[][]>();

/**
 * A kit's uses, grouped by the cooldown they spend: recasts add to their first stage's use,
 * and versions of a spell that share a cooldown are alternatives (worked out once).
 */
function usesOf(abilities: AbilitySpec[]): Use[][] {
  const cached = useCache.get(abilities);
  if (cached) return cached;
  const byCooldown = new Map<string, Use[]>();
  for (const ability of abilities) {
    if (ability.chain || ability.budgetExcluded) continue;
    const stages = abilities.filter((stage) => !stage.budgetExcluded && stage.chain?.root === ability.key);
    const use: Use = { ...timingOf(ability), terms: [...damageTerms(ability), ...stages.flatMap(damageTerms)] };
    const key = cooldownKeyOf(ability);
    byCooldown.set(key, [...(byCooldown.get(key) ?? []), use]);
  }
  const uses = [...byCooldown.values()];
  useCache.set(abilities, uses);
  return uses;
}

const onHitCache = new WeakMap<Effect[], DamageTerm[]>();

function onHitTerms(effects: Effect[]): DamageTerm[] {
  const cached = onHitCache.get(effects);
  if (cached) return cached;
  const terms: DamageTerm[] = [];
  for (const e of flatten(effects)) if (e.type === "damage") terms.push({ ...e, times: 1 });
  onHitCache.set(effects, terms);
  return terms;
}

/** The same damage floor and expected critical multiplier that a combat effect uses. */
function termDamage(term: DamageTerm, self: Unit, target: Unit): number {
  const d = derive(self);
  const amount = Math.max(term.amountFor?.(self, target) ?? evaluate(term.amount, self, target), term.minimum ? evaluate(term.minimum, self, target) : 0);
  const times = term.pulseFormula ? Math.max(1, Math.floor(evaluate(term.pulseFormula, self) + 1e-6))
    : term.attackWindow !== undefined ? Math.min(term.times, d.attackSpeed * term.attackWindow)
    : term.times;
  return amount * (term.canCrit ? averageCritFactor(d.critChance, term.critMultiplier ?? d.critDamage) : 1) * times;
}

/**
 * Damage per second by type before the target's resistances: attacks with on-hit effects,
 * abilities once per cooldown, and what the kit says its hooks add.
 */
function rawDamage(self: Unit, target: Unit): DamageMix {
  const raw = attackDamage(self, target);
  const extra = self.spec.budget?.damage?.(self, target);
  raw.physical += extra?.physical ?? 0;
  raw.magic += extra?.magic ?? 0;
  raw.true += extra?.true ?? 0;
  return abilityDamage(self, target, raw);
}

/** The basic attacks' damage per second with their on-hit effects, before the target's resistances (a calibrated kit's share of its damage). */
function attackDamage(self: Unit, target: Unit): DamageMix {
  const d = derive(self);
  const hints = self.spec.budget;
  const attacks = hints?.attacks !== false;
  const attackDps = attacks ? d.ad * averageCritFactor(d.critChance, d.critDamage) * d.attackSpeed : 0;
  const split = hints?.attackSplit ?? { physical: 1, magic: 0 };
  const raw: DamageMix = { physical: attackDps * split.physical, magic: attackDps * split.magic, true: attackDps * (split.true ?? 0) };
  if (attacks && self.spec.attack.onHit) {
    for (const term of onHitTerms(self.spec.attack.onHit)) raw[term.damageType] += termDamage(term, self, target) * d.attackSpeed;
  }
  if (attacks && self.spec.attack.beforeDamage) {
    for (const term of onHitTerms(self.spec.attack.beforeDamage)) raw[term.damageType] += termDamage(term, self, target) * d.attackSpeed;
  }
  const share = hints?.calibration?.damage ?? 1;
  if (share !== 1) {
    raw.physical *= share;
    raw.magic *= share;
    raw.true *= share;
  }
  return raw;
}

/** Adds the kit's abilities' damage per second to `raw`: of versions sharing a cooldown, the strongest sustained damage into this target (a calibrated kit's share of it). */
function abilityDamage(self: Unit, target: Unit, raw: DamageMix): DamageMix {
  const mitigation = multipliers(self, target);
  const share = self.spec.budget?.calibration?.damage ?? 1;
  for (const alternatives of usesOf(abilitiesOf(self.spec))) {
    let best: DamageMix | undefined;
    let bestTotal = -1;
    let bestCooldown = 0;
    for (const use of alternatives) {
      const cooldown = cycleOf(use, self);
      if (cooldown <= 0) continue;
      const mix: DamageMix = { physical: 0, magic: 0, true: 0 };
      for (const term of use.terms) mix[term.damageType] += termDamage(term, self, target);
      const total = (mix.physical * mitigation.physical + mix.magic * mitigation.magic + mix.true * mitigation.true) / cooldown;
      if (total > bestTotal) {
        best = mix;
        bestTotal = total;
        bestCooldown = cooldown;
      }
    }
    if (!best) continue;
    raw.physical += (best.physical / bestCooldown) * share;
    raw.magic += (best.magic / bestCooldown) * share;
    raw.true += (best.true / bestCooldown) * share;
  }
  return raw;
}

/**
 * The share of each damage type that reaches the target: its armor and magic resistance after
 * the attacker's penetration, and the damage modifiers both have, as the fight applies them
 * (engine/rules/damage.ts mitigate): damage dealt modifiers add up, damage received modifiers
 * multiply, and true damage only takes increases.
 */
function multipliers(attacker: Unit, target: Unit): DamageMix {
  const a = derive(attacker);
  const t = derive(target);
  const modified = (type: keyof DamageMix, received: number[]) =>
    (1 + a.damageDealt.reduce((sum, m) => sum + (type === "true" ? Math.max(0, m) : m), 0)) * received.reduce((product, m) => product * (1 - (type === "true" ? Math.min(0, m) : m)), 1);
  return {
    physical: resistMultiplier(effectiveResist(t.armor, t.armorReduction, { flat: a.lethality, percent: a.armorPen, bonusPercent: a.bonusArmorPen })) * modified("physical", [...t.damageReduction, ...t.physicalReduction]),
    magic: resistMultiplier(effectiveResist(t.mr, t.mrReduction, { flat: a.magicPen, percent: a.magicPenPercent })) * modified("magic", [...t.damageReduction, ...t.magicReduction]),
    true: modified("true", t.damageReduction),
  };
}

/** Damage per second against the enemy, by type, after its resistances and the attacker's penetration. */
export function damagePerSecond(spec: FighterSpec, enemy: FighterSpec): DamageMix {
  const self = unitOf(valued(spec, spec.bonus ?? {}), 0);
  const target = unitOf(valued(enemy, enemy.bonus ?? {}), 1);
  const raw = rawDamage(self, target);
  const m = multipliers(self, target);
  return { physical: raw.physical * m.physical, magic: raw.magic * m.magic, true: raw.true * m.true };
}

interface SustainUse extends ReferenceTiming {
  effects: Array<Extract<Effect, { type: "shield" | "heal" }>>;
}

const sustainCache = new WeakMap<AbilitySpec[], SustainUse[][]>();

/** Shields and heals abilities give their caster over the reference fight; `heals` scales the heals (healFactor). */
function sustain(self: Unit, incoming: DamageMix, heals = 1): number {
  const abilities = abilitiesOf(self.spec);
  let sources = sustainCache.get(abilities);
  if (!sources) {
    const groups = new Map<string, SustainUse[]>();
    for (const ability of abilities) {
      if (ability.chain || ability.budgetExcluded) continue;
      const stages = [ability, ...abilities.filter((stage) => !stage.budgetExcluded && stage.chain?.root === ability.key)];
      const effects = stages.flatMap((stage) => flatten([...(stage.onCastStart ?? []), ...(stage.onSelf ?? [])]))
        .filter((e): e is Extract<Effect, { type: "shield" | "heal" }> => e.type === "shield" || e.type === "heal");
      if (!effects.length) continue;
      const key = cooldownKeyOf(ability);
      groups.set(key, [...(groups.get(key) ?? []), { effects, ...timingOf(ability) }]);
    }
    sources = [...groups.values()];
    sustainCache.set(abilities, sources);
  }
  let total = 0;
  for (const alternatives of sources) {
    let best = 0;
    for (const source of alternatives) {
      const cooldown = cycleOf(source, self);
      // Ready at the start: a six-second cooldown is available twice in a ten-second fight.
      const window = Math.max(0, SUSTAIN_WINDOW - castTimeOf(source, self));
      const uses = cooldown > 0 ? Math.ceil(window / cooldown) : Number(window > 0);
      let amount = 0;
      for (const effect of source.effects) {
        // A type-specific shield cannot absorb damage of an unrelated type.
        if (effect.type === "shield" && effect.shieldType && effect.shieldType !== "normal" && incoming[effect.shieldType] <= 0) continue;
        amount += evaluate(effect.amount, self) * (effect.type === "heal" ? heals : 1);
      }
      best = Math.max(best, uses * amount);
    }
    total += best;
  }
  return total;
}

/** What heals give the unit, as the fight's heal does: more with healing increases, 40% less under Grievous Wounds. */
function healFactor(self: Unit): number {
  return healingReceived(1 + derive(self).healingIncrease, self.statuses.some((status) => status.kind === "grievousWounds"));
}

/** The health the unit has to lose over the reference fight, before resistances: its maximum health, shields and heals. */
function pool(self: Unit, enemy: Unit, raw: DamageMix): number {
  const hints = self.spec.budget;
  const heals = healFactor(self);
  const hooks = ((hints?.healing?.(self, enemy) ?? 0) * heals + (hints?.shielding?.(self, enemy) ?? 0)) * SUSTAIN_WINDOW;
  return derive(self).maxHp + sustain(self, raw, heals) + hooks;
}

function health(self: Unit, enemy: Unit, raw = rawDamage(enemy, self)): number {
  const total = raw.physical + raw.magic + raw.true;
  const shares = total > 0 ? { physical: raw.physical / total, magic: raw.magic / total, true: raw.true / total } : { physical: 0.5, magic: 0.5, true: 0 };
  const m = multipliers(enemy, self);
  const taken = shares.physical * m.physical + shares.magic * m.magic + shares.true * m.true;
  return pool(self, enemy, raw) / taken;
}

/**
 * Health plus ability shields and heals over the reference fight, divided by the share of the
 * enemy's damage that gets through: its raw damage mix by type, through this side's armor and
 * magic resistance after the enemy's penetration.
 */
export function effectiveHealth(spec: FighterSpec, enemy: FighterSpec): number {
  return health(unitOf(valued(spec, spec.bonus ?? {}), 0), unitOf(valued(enemy, enemy.bonus ?? {}), 1));
}

function value(self: Unit, enemy: Unit): number {
  const raw = rawDamage(self, enemy);
  const m = multipliers(self, enemy);
  const dps = raw.physical * m.physical + raw.magic * m.magic + raw.true * m.true;
  const incoming = rawDamage(enemy, self);
  const incomingDps = incoming.physical + incoming.magic + incoming.true;
  // Survival is effective health / incoming raw DPS. The latter is not constant when the
  // enemy's damage scales with our health or other stats (e.g. % maximum-health damage).
  return Math.log(Math.max(dps, 1e-9)) + Math.log(health(self, enemy, incoming)) - Math.log(Math.max(incomingDps, 1e-9));
}

/**
 * The budget's objective for a unit against the enemy's (see the module comment): what the build
 * search scores item builds with. Units come from budgetUnit.
 */
export function budgetValue(self: Unit, enemy: Unit): number {
  return value(self, enemy);
}

/** A unit as the budget sees it: bought stats through the kit's multipliers, and its innate starts. */
export function budgetUnit(spec: FighterSpec, side: 0 | 1): Unit {
  return unitOf(valued(spec, spec.bonus ?? {}), side);
}

/** The share of each of the attacker's damage types that reaches the target, after resistances and damage modifiers. */
export function budgetMultipliers(attacker: Unit, target: Unit): DamageMix {
  return multipliers(attacker, target);
}

/** The kit's abilities' damage per second against the target, by type, before resistances (what item passives on ability damage scale with). */
export function budgetAbilityDamage(self: Unit, target: Unit): DamageMix {
  return abilityDamage(self, target, { physical: 0, magic: 0, true: 0 });
}

/**
 * The budget's damage per second against the target after resistances, in its three parts: the
 * basic attacks with their on-hit effects, the abilities, and what the kit's hooks add (its
 * `damage` hint). What a kit's calibration compares with its fights.
 */
export function budgetDamageParts(self: Unit, target: Unit): { attacks: number; abilities: number; hooks: number } {
  const m = multipliers(self, target);
  const post = (mix: Partial<DamageMix> | undefined) => (mix?.physical ?? 0) * m.physical + (mix?.magic ?? 0) * m.magic + (mix?.true ?? 0) * m.true;
  return { attacks: post(attackDamage(self, target)), abilities: post(abilityDamage(self, target, { physical: 0, magic: 0, true: 0 })), hooks: post(self.spec.budget?.damage?.(self, target)) };
}

/** The budget's damage per second of a unit against the target, by type, after resistances (what omnivamp heals from). */
export function budgetDamage(self: Unit, target: Unit): DamageMix {
  const raw = rawDamage(self, target);
  const m = multipliers(self, target);
  return { physical: raw.physical * m.physical, magic: raw.magic * m.magic, true: raw.true * m.true };
}

/** The health a unit has to lose over the reference fight against the enemy, before resistances: maximum health, shields and heals. */
export function budgetPool(self: Unit, enemy: Unit): number {
  return pool(self, enemy, rawDamage(enemy, self));
}

interface CastUse {
  ability: AbilitySpec;
  timing: ReferenceTiming;
  /** Casts per use: the ability and its recasts. */
  casts: number;
  damaging: boolean;
}

const castCache = new WeakMap<AbilitySpec[], CastUse[][]>();

/**
 * The kit's ability casts per second in the reference fight, recasts included, and how many of
 * its uses per second deal damage: what item passives that follow casts (Spellblade) or ability
 * damage (Liandry's Torment's burn) count. Abilities are ready when the fight starts, as for
 * sustain: an ability on a fifteen-second cooldown is cast once in the ten seconds. Of versions
 * that share a cooldown, the most casts.
 */
export function budgetCasts(self: Unit): { casts: number; damaging: number } {
  let casts = 0;
  let damaging = 0;
  for (const { casts: count, damaging: hits, perSecond } of budgetUses(self)) {
    casts += count * perSecond;
    if (hits) damaging += perSecond;
  }
  return { casts, damaging };
}

/**
 * Each castable ability's uses per second in the reference fight, as budgetCasts counts them,
 * with its recasts and whether it deals damage: what item passives that follow some abilities
 * count (an ultimate, crowd control, stealth).
 */
export function budgetUses(self: Unit): Array<{ ability: AbilitySpec; perSecond: number; cycle: number; casts: number; damaging: boolean }> {
  const abilities = abilitiesOf(self.spec);
  let groups = castCache.get(abilities);
  if (!groups) {
    const byKey = new Map<string, CastUse[]>();
    for (const ability of abilities) {
      if (ability.chain || ability.activation === "internal" || ability.countsAsCast === false || !["Q", "W", "E", "R"].includes(ability.slot)) continue;
      const stages = abilities.filter((stage) => stage.chain?.root === ability.key && stage.activation !== "internal" && stage.countsAsCast !== false);
      const key = cooldownKeyOf(ability);
      byKey.set(key, [...(byKey.get(key) ?? []), { ability, timing: timingOf(ability), casts: 1 + stages.length, damaging: [ability, ...stages].some((stage) => damageTerms(stage).length > 0) }]);
    }
    groups = [...byKey.values()];
    castCache.set(abilities, groups);
  }
  const uses: Array<{ ability: AbilitySpec; perSecond: number; cycle: number; casts: number; damaging: boolean }> = [];
  const share = self.spec.budget?.calibration?.casts ?? 1;
  for (const alternatives of groups) {
    let best: (typeof uses)[number] | undefined;
    for (const use of alternatives) {
      const cycle = cycleOf(use.timing, self);
      if (cycle <= 0) continue;
      const perSecond = (Math.ceil(SUSTAIN_WINDOW / cycle) / SUSTAIN_WINDOW) * share;
      if (best && use.casts * perSecond <= best.casts * best.perSecond) continue;
      best = { ability: use.ability, perSecond, cycle: cycle / share, casts: use.casts, damaging: use.damaging };
    }
    if (best) uses.push(best);
  }
  return uses;
}

/** The damage of one basic attack's on-hit effects against the target, by type, before resistances (what Guinsoo's Rageblade's Phantom Hit repeats). */
export function budgetOnHit(self: Unit, target: Unit): DamageMix {
  const mix: DamageMix = { physical: 0, magic: 0, true: 0 };
  for (const effects of [self.spec.attack.onHit, self.spec.attack.beforeDamage]) {
    if (effects) for (const term of onHitTerms(effects)) mix[term.damageType] += termDamage(term, self, target);
  }
  return mix;
}

function validateBudget(gold: number, prices: StatPrices): void {
  if (!Number.isFinite(gold) || gold < 0) throw new RangeError("Stat budget must be finite and nonnegative");
  for (const stat of BUDGET_STATS) {
    if (!Number.isFinite(prices[stat]) || prices[stat] <= 0) throw new RangeError(`Stat price for ${stat} must be finite and positive`);
  }
}

/** Spends `gold` on the stats that help `spec` most against `enemy`. */
export function allocate(spec: FighterSpec, enemy: FighterSpec, gold: number, prices: StatPrices, step = BUDGET_STEP): Allocation {
  validateBudget(gold, prices);
  if (!Number.isFinite(step) || step <= 0) throw new RangeError("Allocation step must be finite and positive");
  const foe = unitOf(valued(enemy, enemy.bonus ?? {}), 1);
  const score = (bonus: BonusStats) => value(unitOf(valued(spec, bonus), 0), foe);
  let bonus: BonusStats = {};
  const spent = Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number>;
  let current = score(bonus);
  // Stats the kit gets nothing from (ability power without AP ratios, ...) are never worth a step.
  const per = (stat: BudgetStat) => 1 / prices[stat];
  const useful = BUDGET_STATS.filter((stat) => score(addStat(bonus, stat, 1000 * per(stat))) > current + 1e-12);
  for (let left = gold; left > 1e-9;) {
    let best: { stat: BudgetStat; bonus: BonusStats; value: number; cost: number; gainPerGold: number } | undefined;
    for (const stat of useful) {
      const cost = Math.min(step, left, availablePoints(spec, bonus, stat) * prices[stat]);
      if (cost <= 1e-9) continue;
      const next = addStat(bonus, stat, cost * per(stat));
      const v = score(next);
      const gainPerGold = (v - current) / cost;
      if (!best || gainPerGold > best.gainPerGold + 1e-14) best = { stat, bonus: next, value: v, cost, gainPerGold };
    }
    // Nothing helps any more (stats can't lower the value, but they can stop raising it).
    if (!best || best.value <= current + 1e-12) break;
    bonus = best.bonus;
    spent[best.stat] += best.cost;
    left -= best.cost;
    current = best.value;
  }
  return { gold, bonus, spent };
}

/** Rounds in which both sides answer each other's builds (see allocateBoth). */
export const BUDGET_ROUNDS = 8;

/** The average of several allocations of the same gold: a build that mixes them. */
function average(list: Allocation[]): Allocation {
  const bonus: Record<string, number> = {};
  const spent = Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number>;
  for (const allocation of list) {
    for (const [key, value] of Object.entries(allocation.bonus)) bonus[key] = (bonus[key] ?? 0) + (value ?? 0) / list.length;
    for (const stat of BUDGET_STATS) spent[stat] += allocation.spent[stat] / list.length;
  }
  return { gold: list[0]?.gold ?? 0, bonus: bonus as BonusStats, spent };
}

/**
 * Both sides' builds, each answering the other's. Answering only the other's first build
 * leaves one side unanswered (armor met by penetration that the armor never saw coming), so
 * in every round both sides answer the average of what the other has built so far
 * (fictitious play), which settles toward builds that answer each other; the result is the
 * average of the answers.
 */
export function allocateBoth(a: FighterSpec, b: FighterSpec, gold: number, prices: StatPrices, rounds = BUDGET_ROUNDS): [Allocation, Allocation] {
  validateBudget(gold, prices);
  if (!Number.isInteger(rounds) || rounds < 1) throw new RangeError("Allocation rounds must be a positive integer");
  if (gold <= 0) {
    const none = (): Allocation => ({ gold: 0, bonus: {}, spent: Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number> });
    return [none(), none()];
  }
  // Kits can add gold of their own (Ornn's Masterwork upgrade).
  const goldA = gold + (a.extraGold ?? 0);
  const goldB = gold + (b.extraGold ?? 0);
  // Round 0 answers bare stats; every later round answers the average of the other's answers.
  const builtA: Allocation[] = [allocate(a, b, goldA, prices)];
  const builtB: Allocation[] = [allocate(b, a, goldB, prices)];
  for (let round = 1; round < rounds; round++) {
    const seenA = average(builtA.length > 1 ? builtA.slice(1) : builtA);
    const seenB = average(builtB.length > 1 ? builtB.slice(1) : builtB);
    builtA.push(allocate(a, withBonus(b, seenB.bonus), goldA, prices));
    builtB.push(allocate(b, withBonus(a, seenA.bonus), goldB, prices));
  }
  return [average(builtA.length > 1 ? builtA.slice(1) : builtA), average(builtB.length > 1 ? builtB.slice(1) : builtB)];
}

/** Applies the budget to both fighters. */
export function withBudget(a: FighterSpec, b: FighterSpec, gold: number, prices: StatPrices): [FighterSpec, FighterSpec] {
  const [x, y] = allocateBoth(a, b, gold, prices);
  return [withBonus(a, x.bonus), withBonus(b, y.bonus)];
}
