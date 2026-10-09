/**
 * The stat budget (PLAN.md section 10): both champions get the same gold, spent on plain
 * stats priced at their gold values from the wiki (Module:Gold value/data), with no item
 * passives or actives.
 *
 * Each champion spends it in small steps on whichever stat raises
 *
 *   ln(damage per second against the enemy) + ln(effective health against the enemy's damage)
 *
 * the most. Damage per second follows the champion's own ratios: attacks, on-hit effects and
 * damaging abilities over their cooldowns, through the enemy's resistances. Effective health
 * is health plus the shields and heals of its abilities over a reference fight, divided by
 * the share of the enemy's damage (its mix by type) that armor and magic resistance let
 * through. Maximizing the sum maximizes damage x survival time, which decides a duel; the
 * logarithms make each step weigh offense and defense by how much it adds relative to what
 * the champion already has.
 *
 * Each side's damage mix and resistances depend on what the other buys, so the sides answer
 * each other's builds over several rounds (see allocateBoth).
 */
import { effectiveResist, resistMultiplier } from "./rules/damage";
import { averageCritFactor } from "./rules/defense";
import { cooldownAfterHaste } from "./rules/timing";
import { derive, evaluate } from "./sim/derived";
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
  set("armor", m.armor);
  set("mr", m.mr);
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

function unitOf(spec: FighterSpec, side: 0 | 1): Unit {
  return newUnit(spec, side, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.base.resource);
}

/** One damage term of an ability's use: a formula dealt `times` times. */
interface DamageTerm {
  damageType: keyof DamageMix;
  amount: Formula;
  times: number;
}

/** One use per cooldown: an ability with its recasts. */
interface Use {
  cooldown: number;
  castTime: number;
  terms: DamageTerm[];
}

const termCache = new WeakMap<AbilitySpec, DamageTerm[]>();

/** An ability's damage per use: its hits, channel pulses and empowered attacks (worked out once). */
function damageTerms(ability: AbilitySpec): DamageTerm[] {
  const cached = termCache.get(ability);
  if (cached) return cached;
  const pulses = ability.channel?.interval ? Math.max(1, Math.round(ability.channel.duration / ability.channel.interval)) : 0;
  const groups: Array<[Effect[], number]> = [
    [ability.onHit ?? [], 1],
    [ability.channel?.onTick ?? [], pulses],
    [ability.channel?.onComplete ?? [], 1],
  ];
  for (const e of ability.onSelf ?? []) if (e.type === "empower") groups.push([e.onHit, e.attacks]);
  const terms: DamageTerm[] = [];
  for (const [effects, times] of groups) {
    for (const e of flatten(effects)) {
      if (e.type === "damage") terms.push({ damageType: e.damageType, amount: e.amount, times });
      else if (e.type === "dot") terms.push({ damageType: e.damageType, amount: e.total, times });
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
    if (ability.chain) continue;
    const stages = abilities.filter((stage) => stage.chain?.root === ability.key);
    const use: Use = { cooldown: ability.cooldown, castTime: ability.castTime, terms: [...damageTerms(ability), ...stages.flatMap(damageTerms)] };
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
  for (const e of flatten(effects)) if (e.type === "damage") terms.push({ damageType: e.damageType, amount: e.amount, times: 1 });
  onHitCache.set(effects, terms);
  return terms;
}

/**
 * Damage per second by type before the target's resistances: attacks with on-hit effects,
 * abilities once per cooldown, and what the kit says its hooks add.
 */
function rawDamage(self: Unit, target: Unit): DamageMix {
  const d = derive(self);
  const hints = self.spec.budget;
  const attacks = hints?.attacks !== false;
  const raw: DamageMix = { physical: attacks ? d.ad * averageCritFactor(d.critChance, d.critDamage) * d.attackSpeed : 0, magic: 0, true: 0 };
  if (attacks && self.spec.attack.onHit) {
    for (const term of onHitTerms(self.spec.attack.onHit)) raw[term.damageType] += evaluate(term.amount, self, target) * d.attackSpeed;
  }
  const extra = hints?.damage?.(self, target);
  raw.physical += extra?.physical ?? 0;
  raw.magic += extra?.magic ?? 0;
  raw.true += extra?.true ?? 0;
  // Of versions sharing a cooldown, the strongest.
  for (const alternatives of usesOf(self.spec.abilities)) {
    let best: DamageMix | undefined;
    let bestTotal = -1;
    let bestCooldown = 0;
    for (const use of alternatives) {
      const cooldown = cooldownAfterHaste(use.cooldown, d.abilityHaste) + use.castTime;
      if (cooldown <= 0) continue;
      const mix: DamageMix = { physical: 0, magic: 0, true: 0 };
      for (const term of use.terms) mix[term.damageType] += term.times * evaluate(term.amount, self, target);
      const total = mix.physical + mix.magic + mix.true;
      if (total > bestTotal) {
        best = mix;
        bestTotal = total;
        bestCooldown = cooldown;
      }
    }
    if (!best) continue;
    raw.physical += best.physical / bestCooldown;
    raw.magic += best.magic / bestCooldown;
    raw.true += best.true / bestCooldown;
  }
  return raw;
}

/** The target's armor and magic resistance multipliers against the attacker, after its penetration. */
function multipliers(attacker: Unit, target: Unit): { physical: number; magic: number } {
  const a = derive(attacker);
  const t = derive(target);
  return {
    physical: resistMultiplier(effectiveResist(t.armor, {}, { flat: a.lethality, percent: a.armorPen })),
    magic: resistMultiplier(effectiveResist(t.mr, {}, { flat: a.magicPen, percent: a.magicPenPercent })),
  };
}

/** Damage per second against the enemy, by type, after its resistances and the attacker's penetration. */
export function damagePerSecond(spec: FighterSpec, enemy: FighterSpec): DamageMix {
  const self = unitOf(spec, 0);
  const target = unitOf(enemy, 1);
  const raw = rawDamage(self, target);
  const m = multipliers(self, target);
  return { physical: raw.physical * m.physical, magic: raw.magic * m.magic, true: raw.true };
}

const sustainCache = new WeakMap<AbilitySpec[], Array<{ amount: Formula; cooldown: number; castTime: number }>>();

/** Shields and heals abilities give their caster over the reference fight. */
function sustain(self: Unit): number {
  const abilities = self.spec.abilities;
  let sources = sustainCache.get(abilities);
  if (!sources) {
    sources = abilities.flatMap((ability) =>
      flatten(ability.onSelf ?? [])
        .filter((e): e is Extract<Effect, { type: "shield" | "heal" }> => e.type === "shield" || e.type === "heal")
        .map((e) => ({ amount: e.amount, cooldown: ability.cooldown, castTime: ability.castTime })),
    );
    sustainCache.set(abilities, sources);
  }
  const d = derive(self);
  let total = 0;
  for (const source of sources) {
    const cooldown = cooldownAfterHaste(source.cooldown, d.abilityHaste) + source.castTime;
    const uses = cooldown > 0 ? Math.max(1, Math.floor(SUSTAIN_WINDOW / cooldown)) : 1;
    total += uses * evaluate(source.amount, self);
  }
  return total;
}

function health(self: Unit, enemy: Unit): number {
  const raw = rawDamage(enemy, self);
  const total = raw.physical + raw.magic + raw.true;
  const shares = total > 0 ? { physical: raw.physical / total, magic: raw.magic / total, true: raw.true / total } : { physical: 0.5, magic: 0.5, true: 0 };
  const m = multipliers(enemy, self);
  const taken = shares.physical * m.physical + shares.magic * m.magic + shares.true;
  const healing = (self.spec.budget?.healing?.(self, enemy) ?? 0) * SUSTAIN_WINDOW;
  return (derive(self).maxHp + sustain(self) + healing) / taken;
}

/**
 * Health plus ability shields and heals over the reference fight, divided by the share of the
 * enemy's damage that gets through: its raw damage mix by type, through this side's armor and
 * magic resistance after the enemy's penetration.
 */
export function effectiveHealth(spec: FighterSpec, enemy: FighterSpec): number {
  return health(unitOf(spec, 0), unitOf(enemy, 1));
}

function value(self: Unit, enemy: Unit): number {
  const raw = rawDamage(self, enemy);
  const m = multipliers(self, enemy);
  const dps = raw.physical * m.physical + raw.magic * m.magic + raw.true;
  return Math.log(Math.max(dps, 1e-9)) + Math.log(health(self, enemy));
}

/** Spends `gold` on the stats that help `spec` most against `enemy`. */
export function allocate(spec: FighterSpec, enemy: FighterSpec, gold: number, prices: StatPrices, step = BUDGET_STEP): Allocation {
  const foe = unitOf(valued(enemy, enemy.bonus ?? {}), 1);
  const score = (bonus: BonusStats) => value(unitOf(valued(spec, bonus), 0), foe);
  let bonus: BonusStats = {};
  const spent = Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number>;
  let current = score(bonus);
  // Stats the kit gets nothing from (ability power without AP ratios, ...) are never worth a step.
  const per = (stat: BudgetStat) => 1 / prices[stat];
  const useful = BUDGET_STATS.filter((stat) => score(addStat(bonus, stat, 1000 * per(stat))) > current + 1e-12);
  for (let left = gold; left >= step; left -= step) {
    let best: { stat: BudgetStat; bonus: BonusStats; value: number } | undefined;
    for (const stat of useful) {
      if (stat === "crit" && (bonus.critChance ?? 0) >= 1) continue;
      const next = addStat(bonus, stat, step * per(stat));
      const v = score(next);
      if (!best || v > best.value + 1e-12) best = { stat, bonus: next, value: v };
    }
    // Nothing helps any more (stats can't lower the value, but they can stop raising it).
    if (!best || best.value <= current + 1e-12) break;
    bonus = best.bonus;
    spent[best.stat] += step;
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
