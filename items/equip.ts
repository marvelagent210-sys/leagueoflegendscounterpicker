/**
 * Items on a fighter (PLAN.md §13, M8): a build's stats, passives and actives added to a
 * champion's compiled kit, for the duel simulator.
 *
 * - Stats go where the simulator keeps them: bought stats (`bonus`), permanent statuses for
 *   the ones it keeps as statuses (percentage penetration, movement speed, life steal,
 *   tenacity), and base stats for crit damage, mana and regeneration.
 * - An item module (items/modules/) models an item's passives and actives from its wiki text:
 *   on-hit effects, hooks, and actives that the default behavior casts like abilities.
 * - Item hooks run after the kit's. The kit's cast and ability-hit hooks don't see item
 *   actives: Zhonya's Hourglass isn't an ability, so it doesn't trigger a kit's "after using
 *   an ability" passive. Some items act on the enemy's side (how much damage it takes from
 *   the holder); `matchupSpecs` puts those hooks on the enemy.
 *
 * Nothing here changes the engine or the kits: items only use their extension points.
 */
import type { KitOption } from "../engine/kits/compile";
import type { CCType } from "../engine/rules/crowdControl";
import { CRIT_DAMAGE } from "../engine/rules/defense";
import { traitsOf } from "../engine/sim/behavior";
import { addStatus } from "../engine/sim/combat";
import { ccTypes, derive } from "../engine/sim/derived";
import type { AbilitySpec, BaseStats, BonusStats, BuffStat, DamageByType, Effect, FighterSpec, HookContext, KitHooks, StateType } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import type { ItemRecord } from "../pipeline/items/records";
import { ItemContext, type ItemData, ItemDataError, type ItemEvidence, type ItemSource } from "./context";
import { activeBudget } from "./hints";
import { type CombatStatus, type Energized, type Hit, activeKey, combatStatus, energizedPool, inItemStasis, isAbilityDamage, isItemActive, memo, omnivampHooks, setStat } from "./runtime";

/** What an item knows about its holder while it is built: one form of the champion, before items. */
export interface ItemFighter {
  spec: FighterSpec;
  /** Whether this form attacks at range: the wiki's "(melee) / (ranged)" values follow it. */
  ranged: boolean;
  /** A mana champion: mana stats do nothing for the others. */
  mana: boolean;
  /** Maximum mana before items, for "bonus mana". */
  baseMana: number;
  /** What the build's items label their damage with (their names, but for a clash with an ability's). */
  itemNames: ReadonlySet<string>;
  /** The build's items, for passives that count what the others give (Warmog's Vitality). */
  build: readonly ItemRecord[];
  /** Whether a hit was the kit's ability damage (not a basic attack's, not an item's). */
  isAbilityDamage(hit: Hit): boolean;
  /** The holder's combat status (wiki "Combat status"); asking for it keeps it during fights. */
  combat(): CombatStatus;
  /** The holder's Energized charges (wiki "Energized"), shared by every Energized item it holds. */
  energized(): Energized;
}

/** What an item module adds to its holder, besides the shop stats. */
export interface ItemDefinition {
  /** Stats from passives that are fixed for the fight (Sterak's Gage: 50% base AD as bonus AD). */
  bonus?: BonusStats;
  /** Bonus maximum mana from passives (Rod of Ages' stacks), for mana champions. */
  mana?: number;
  /**
   * Statuses the holder has from the start, under the item's own key (a stat effect in a
   * kit's `start` would replace another of the same stat): Phantom Dancer's ghosting.
   */
  permanent?: Permanent[];
  /** Effects every basic attack applies on hit. */
  onHit?: Effect[];
  hooks?: KitHooks;
  /** Hooks on the enemy's side: what the enemy takes from the holder (Shadowflame's critical magic damage). */
  enemyHooks?: KitHooks;
  /**
   * Actives, without their key: the default behavior casts them like the kit's abilities.
   * `usableWhileStunned` marks the cleanse item's (Mercurial Scimitar's Quicksilver).
   */
  actives?: Array<Omit<AbilitySpec, "key" | "slot" | "castTime"> & Partial<Pick<AbilitySpec, "castTime">> & { usableWhileStunned?: boolean }>;
  /** The item grants timed omnivamp (an OMNIVAMP status of runtime.ts). */
  omnivamp?: boolean;
  /**
   * Ability haste for some abilities only: ultimate haste ("R"), basic ability haste ("Q", "W",
   * "E"), or haste for abilities that immobilize (Imperial Mandate's Control).
   */
  haste?: Array<{ slots: Array<"Q" | "W" | "E" | "R">; haste: number; immobilizing?: boolean }>;
  /** It puts its holder in stasis (Zhonya's Hourglass): no casting then, as the wiki's stasis forbids. */
  stasis?: boolean;
  /** What the item does that the simulator leaves out, each with why. */
  unmodeled?: string[];
  /** What the build search's quick estimate counts of the hooks and actives, which it doesn't play. */
  budget?: ItemBudget;
}

/** A permanent stat or state. */
export type Permanent = { stat: BuffStat; value: number } | { state: StateType; value?: number; charges?: number };

/** A stat or state the quick estimate gives a unit, or Grievous Wounds. */
export type EstimateStatus = Permanent | { grievousWounds: true };

/**
 * What the build search's quick estimate (items/estimate.ts) counts of an item's hooks and
 * actives: their average over the stat budget's ten-second reference fight (engine/budget.ts),
 * given the holder and the enemy with their whole builds on. Fights play the hooks themselves;
 * these only rank builds, and tests/items/hints.test.ts checks each against a fight.
 */
export interface ItemBudget {
  /** Stats the holder has on average from the hooks (Rabadon's Deathcap's AP, Liandry's Torment's Suffering). */
  stats?: (self: Unit, enemy: Unit) => Permanent[];
  /** Its stats read the other items' hook stats, so they come last (Rabadon's Deathcap's share of all AP). */
  late?: boolean;
  /** Statuses the hooks give the enemy on average (Black Cleaver's armor reduction, Grievous Wounds). */
  enemyStats?: (self: Unit, enemy: Unit) => EstimateStatus[];
  /** Damage per second the hooks and actives deal, by type, before the enemy's resistances. */
  damage?: (self: Unit, enemy: Unit) => Partial<DamageByType>;
  /** Healing per second: healing increases and Grievous Wounds change it. */
  healing?: (self: Unit, enemy: Unit) => number;
  /** Shielding per second, and damage the hooks keep from landing (Sterak's Gage's Lifeline: its shield over the ten seconds). */
  shielding?: (self: Unit, enemy: Unit) => number;
  /** The kit's ability as the hooks change it (Navori Flickerblade's shorter cooldowns), the same object when they don't. */
  ability?: (ability: AbilitySpec) => AbilitySpec;
}

export interface ItemModule {
  /** The item's name in the catalog. */
  item: string;
  /** Assumptions the user can change (stacks collected before the fight). */
  options?: Record<string, KitOption>;
  build(item: ItemData, fighter: ItemFighter, options: Record<string, number>): ItemDefinition;
}

/** How much of an item the simulator models. */
export interface ItemCoverage {
  item: string;
  /** Effects modeled from the wiki's text, by name. */
  modeled: string[];
  /** Effects or stats left out, with why. */
  unmodeled: string[];
}

export interface EquippedFighter {
  spec: FighterSpec;
  /** Hooks the holder's items put on the enemy (matchupSpecs adds them). */
  enemyHooks: KitHooks[];
  items: ItemRecord[];
  options: Record<string, Record<string, number>>;
  evidence: ItemEvidence[];
  assumptions: string[];
  coverage: ItemCoverage[];
}

export interface EquipOptions {
  /** The item modules by item name (items/modules/index.ts). */
  modules: Readonly<Record<string, ItemModule>>;
  /** The catalog's wiki source, for the evidence. */
  source: ItemSource;
  /** Option overrides, by item name and option. */
  options?: Record<string, Record<string, number>>;
  /**
   * The rest of the loadout (summoner spells, the rune page), built for each form of the
   * champion after its items, with the bonus stats they give and what they know of the holder.
   */
  extras?: (form: FighterSpec, items: { bonus: BonusStats; fighter: ItemFighter }) => LoadoutPart;
}

/**
 * What a loadout adds besides its items (summoners/equip.ts), equipped in the same pass: like
 * item actives, its actives are kept from the kit's cast hooks and its damage isn't the kit's
 * ability damage; its hooks run after the items'.
 */
export interface LoadoutPart {
  /** Actives, complete: keyed apart from the kit's abilities ("summoner:Flash"). */
  abilities: AbilitySpec[];
  hooks: KitHooks[];
  /** Hooks on the enemy's side. */
  enemyHooks: KitHooks[];
  /** The names its effects label their damage with. */
  labels: string[];
  /** Stats fixed for the fight (a shard's adaptive force). */
  bonus?: BonusStats;
  /** Statuses from the start, set before the kit's onStart (permanentHooks). */
  first?: KitHooks[];
  /** Ability haste for some abilities only (Ultimate Hunter's ultimate haste). */
  haste?: NonNullable<ItemDefinition["haste"]>;
  /** Bonus maximum mana, for mana champions (Manaflow Band). */
  mana?: number;
  /** Effects every basic attack applies on hit. */
  onHit?: Effect[];
}

/** Several loadout parts as one (summoner spells and a rune page): their lists joined, their stats and mana added. */
export function joinParts(parts: ReadonlyArray<LoadoutPart | undefined>): LoadoutPart {
  const joined: LoadoutPart = { abilities: [], hooks: [], first: [], enemyHooks: [], labels: [], bonus: {}, haste: [], mana: 0, onHit: [] };
  for (const part of parts) {
    if (!part) continue;
    joined.abilities.push(...part.abilities);
    joined.hooks.push(...part.hooks);
    joined.first!.push(...(part.first ?? []));
    joined.enemyHooks.push(...part.enemyHooks);
    for (const label of part.labels) if (!joined.labels.includes(label)) joined.labels.push(label);
    addBonus(joined.bonus!, part.bonus);
    joined.haste!.push(...(part.haste ?? []));
    joined.mana! += part.mana ?? 0;
    joined.onHit!.push(...(part.onHit ?? []));
  }
  return joined;
}

// ---------------------------------------------------------------------------------------
// Stats

/** Wiki stat keys the simulator reads, and where each goes, with what the wiki's number is divided by (percent points to fractions). */
const BONUS_STATS: Record<string, [keyof BonusStats, number]> = {
  ad: ["ad", 1],
  ap: ["ap", 1],
  hp: ["hp", 1],
  armor: ["armor", 1],
  mr: ["mr", 1],
  as: ["attackSpeed", 100],
  crit: ["critChance", 100],
  ah: ["abilityHaste", 1],
  lethality: ["lethality", 1],
  mpenflat: ["magicPen", 1],
};

/** Stats the simulator keeps as statuses: each item's is a status of its own (two penetration items are two sources). */
const STATUS_STATS: Record<string, { stat: "armorPen" | "magicPenPercent" | "moveSpeedPercent" | "moveSpeedFlat" | "lifeSteal"; per: number }> = {
  armpen: { stat: "armorPen", per: 100 },
  mpen: { stat: "magicPenPercent", per: 100 },
  ms: { stat: "moveSpeedPercent", per: 100 },
  msflat: { stat: "moveSpeedFlat", per: 1 },
  lifesteal: { stat: "lifeSteal", per: 100 },
};

/** Stats changed in the base stats or by hooks, or not modeled. */
const OTHER_STATS = new Set(["critdamage", "mana", "mp5", "hp5", "omnivamp", "tenacity", "hsp"]);

function addBonus(into: BonusStats, more: BonusStats | undefined): void {
  for (const [key, value] of Object.entries(more ?? {}) as Array<[keyof BonusStats, number]>) into[key] = (into[key] ?? 0) + value;
}

// ---------------------------------------------------------------------------------------
// Hooks

/** Kit hooks about the unit's own casts and ability hits: item actives don't trigger them. */
const ABILITY_HOOKS = new Set(["onCastStart", "onCast", "onAbilityHit", "beforeAbilityHit", "onAbilityContact", "onDashEnd", "onBlinkEnd"]);

type AnyHook = (ctx: HookContext & Record<string, unknown>) => unknown;

/**
 * The kit's hooks, then each item's (`first` before the kit's). Hooks that return a value chain:
 * damage adjustments pass their amount on, onLethal stops at the first that keeps the unit
 * alive, and the kit's launch replacement and contact packet stand. With `kit` the kit's own
 * hooks, its cast and ability-hit hooks don't see item actives (`hideActives`).
 */
export function composeHooks(kit: KitHooks | undefined, extra: KitHooks[], first: KitHooks[] = [], hideActives = true): KitHooks | undefined {
  const all = [...first, ...extra];
  if (all.length === 0 && !hideActives) return kit;
  const names = new Set([...Object.keys(kit ?? {}), ...all.flatMap((hooks) => Object.keys(hooks))]);
  const composed: Record<string, AnyHook> = {};
  const call = (hooks: KitHooks | undefined, name: string) => {
    const fn = (hooks as Record<string, AnyHook | undefined> | undefined)?.[name];
    return fn ? (ctx: HookContext & Record<string, unknown>) => fn.call(hooks, ctx) : undefined;
  };
  for (const name of names) {
    const own = call(kit, name);
    const before = first.map((hooks) => call(hooks, name)).filter((fn) => fn !== undefined);
    const after = extra.map((hooks) => call(hooks, name)).filter((fn) => fn !== undefined);
    const kitSees = (ctx: { ability?: AbilitySpec }) => own !== undefined && !(hideActives && ABILITY_HOOKS.has(name) && isItemActive(ctx.ability));
    if (before.length === 0 && after.length === 0) {
      if (own && hideActives && ABILITY_HOOKS.has(name)) composed[name] = (ctx) => (kitSees(ctx as { ability?: AbilitySpec }) ? own(ctx) : undefined);
      else if (own) composed[name] = own;
      continue;
    }
    switch (name) {
      case "modifyDamageAfterShields":
      case "modifyDamageTakenRaw": {
        const field = name === "modifyDamageTakenRaw" ? "raw" : "amount";
        composed[name] = (ctx) => {
          let value = Number(ctx[field]);
          for (const fn of [...before, ...(own ? [own] : []), ...after]) value = Number(fn({ ...ctx, [field]: value }));
          return value;
        };
        break;
      }
      case "onLethal":
        composed[name] = (ctx) => [...before, ...(own ? [own] : []), ...after].some((fn) => fn(ctx) === true);
        break;
      case "onAttackLaunch":
        composed[name] = (ctx) => {
          for (const fn of before) fn(ctx);
          const result = own?.(ctx);
          for (const fn of after) fn(ctx);
          return result;
        };
        break;
      case "onAbilityContact":
        composed[name] = (ctx) => {
          let packet = kitSees(ctx as { ability?: AbilitySpec }) ? (own?.(ctx) as Effect[] | undefined) : undefined;
          for (const fn of [...before, ...after]) {
            const replaced = fn(packet ? { ...ctx, effects: packet } : ctx) as Effect[] | undefined;
            if (replaced) packet = replaced;
          }
          return packet;
        };
        break;
      default:
        composed[name] = (ctx) => {
          for (const fn of before) fn(ctx);
          if (kitSees(ctx as { ability?: AbilitySpec })) own?.(ctx);
          for (const fn of after) fn(ctx);
        };
    }
  }
  return composed as KitHooks;
}

/** The spec with each of its forms changed the same way, the forms' map rebuilt to point at the new ones. */
export function mapForms(spec: FighterSpec, change: (form: FighterSpec) => FighterSpec): FighterSpec {
  if (!spec.forms) return change(spec);
  const changed: Record<string, FighterSpec> = {};
  for (const [name, form] of Object.entries(spec.forms)) changed[name] = change(form);
  for (const form of Object.values(changed)) form.forms = changed;
  const main = spec.form ? changed[spec.form] : undefined;
  if (!main) throw new Error(`${spec.name}: no form "${spec.form ?? ""}" among its forms`);
  return main;
}

// ---------------------------------------------------------------------------------------
// Equipping

interface Built {
  record: ItemRecord;
  definition: ItemDefinition;
}

/**
 * Hooks about dealing damage ignore damage the holder does to itself (Death's Dance's stored
 * damage): the kit's and the items' alike, since no kit damages itself.
 */
function ownDamageOnly(hooks: KitHooks): KitHooks {
  const dealt = hooks.onDamageDealt;
  return dealt ? { ...hooks, onDamageDealt: (ctx) => (ctx.enemy.side === ctx.self.side ? undefined : dealt.call(hooks, ctx)) } : hooks;
}

/**
 * Item haste for some abilities: the engine divides the cooldown by 1 + haste / 100 of all
 * ability haste, so the cooldown it reads is scaled to come out as divided by the sum.
 */
export function withItemHaste(ability: AbilitySpec, haste: NonNullable<ItemDefinition["haste"]>): AbilitySpec {
  if (ability.staticCooldown || isItemActive(ability)) return ability;
  let extra = 0;
  for (const entry of haste) {
    const slot = entry.slots.includes(ability.slot as "Q");
    if (entry.immobilizing ? traitsOf(ability).immobilizes && (entry.slots.length === 0 || slot) : slot) extra += entry.haste;
  }
  if (extra === 0) return ability;
  const own = ability.cooldownFor;
  return {
    ...ability,
    cooldownFor: (unit) => {
      const ah = derive(unit).abilityHaste;
      return (own?.(unit) ?? ability.cooldown) * (100 + ah) / (100 + ah + extra);
    },
  };
}

/**
 * Crowd control that stops item actives, as confirmed on review: knock-ups and stuns (20
 * October), with suppression counting as a stun (1 November). Sleep and stasis stop a champion
 * at least as fully as a stun, so they stop items too. The wiki's "Cast-inhibiting crowd
 * control" page says every cast-inhibiting type stops items, silence included; the review's
 * rule is the one used. Kit abilities keep the wiki's rule (the engine's `canCastUnderCC`).
 */
export const STOPS_ITEMS: ReadonlySet<CCType> = new Set(["airborne", "suspension", "stun", "suppression", "sleep", "stasis"]);
/** What stops the cleanse item, which works under stuns: knock-ups (suspension keeps one up), and stasis. */
export const STOPS_CLEANSE: ReadonlySet<CCType> = new Set(["airborne", "suspension", "stasis"]);

/** An item active, usable under any crowd control but `stops`; a dash or blink not while rooted or grounded either. */
function itemActive(ability: AbilitySpec, stops: ReadonlySet<CCType>): AbilitySpec {
  const own = ability.usable;
  const movement = ability.delivery.kind === "dash" || ability.delivery.kind === "blink" || ability.flags?.grounded === true;
  return {
    ...ability,
    flags: { ...ability.flags, usableWhileDisabled: true },
    usable: (unit, world) => {
      const types = ccTypes(unit);
      if ([...types].some((type) => stops.has(type)) || (movement && (types.has("root") || types.has("ground")))) return false;
      return own?.(unit, world) ?? true;
    },
  };
}

/** No casting while an item holds its holder in stasis. */
function lockedInStasis(ability: AbilitySpec): AbilitySpec {
  const own = ability.usable;
  return { ...ability, usable: (unit, world) => !inItemStasis(unit) && (own?.(unit, world) ?? true) };
}

/** Permanent statuses of an item (or rune), added before the fight (and the kit's onStart) under its own keys. */
export function permanentHooks(item: string, statuses: Permanent[]): KitHooks {
  return {
    onStart(ctx) {
      for (const status of statuses) {
        if ("stat" in status) setStat(ctx.self, memo(item, status.stat), status.stat, status.value, ctx.tick);
        else addStatus(ctx.self, { kind: "state", key: status.state, source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: status.value ?? 0, ...(status.charges ? { charges: status.charges } : {}), memoKey: memo(item, status.state) });
      }
    },
  };
}

/** An item's shop stats, sorted by where the simulator keeps them. */
interface ShopStats {
  bonus: BonusStats;
  /** Stats kept as statuses (percentage penetration, movement speed, life steal) and tenacity, in the stats' order. */
  statuses: Permanent[];
  critDamage: number;
  omnivamp: number;
  hp5: number;
  mana: number;
  mp5: number;
  unmodeled: string[];
}

function shopStats(record: ItemRecord, form: FighterSpec): ShopStats {
  const stats: ShopStats = { bonus: {}, statuses: [], critDamage: 0, omnivamp: 0, hp5: 0, mana: 0, mp5: 0, unmodeled: [] };
  const usesMana = form.resourceType === "Mana";
  for (const [key, value] of Object.entries(record.stats)) {
    const bought = BONUS_STATS[key];
    const status = STATUS_STATS[key];
    if (bought) stats.bonus[bought[0]] = (stats.bonus[bought[0]] ?? 0) + value / bought[1];
    else if (status) stats.statuses.push({ stat: status.stat, value: value / status.per });
    else if (key === "critdamage") stats.critDamage += value / 100;
    else if (key === "tenacity") stats.statuses.push({ state: "tenacity", value: value / 100 });
    else if (key === "omnivamp") stats.omnivamp += value / 100;
    else if (key === "hp5") stats.hp5 += value / 100;
    else if (key === "mana" || key === "mp5") {
      if (!usesMana) stats.unmodeled.push(`${key === "mana" ? "Mana" : "Mana regeneration"}: no effect, ${form.name} doesn't use mana.`);
      else if (key === "mana") stats.mana += value;
      else stats.mp5 += value / 100;
    } else if (key === "hsp") stats.unmodeled.push("Heal and shield power: not modeled yet.");
    else if (!OTHER_STATS.has(key)) throw new ItemDataError(record.name, `the simulator doesn't know the stat "${key}"`);
  }
  return stats;
}

/** What a build's items know about their holder, with the combat status and Energized pool they share once asked for. */
function itemFighter(form: FighterSpec, build: ItemRecord[], context: ItemContext, itemNames: ReadonlySet<string>): { fighter: ItemFighter; shared: () => { combat?: CombatStatus; energized?: Energized } } {
  let combat: CombatStatus | undefined;
  let energized: Energized | undefined;
  const fighter: ItemFighter = {
    spec: form,
    ranged: form.attack.ranged,
    mana: form.resourceType === "Mana",
    baseMana: form.base.resource,
    itemNames,
    build,
    isAbilityDamage: (hit) => isAbilityDamage(hit, itemNames),
    combat: () => (combat ??= combatStatus(context.rule("Combat status", "Combat status").quoted("Most out-of-combat effects trigger 5 seconds after being in-combat"))),
    energized: () => {
      if (energized) return energized;
      const rule = context.rule("Template:Tip data/Energized", "Energized");
      const gain = "Champions with Energized gain 6 Charges per basic attack and 1 Charge for every 24 units travelled by any means.";
      rule.quote("At 100 charges, they become fully Energized, empowering their next basic attack to consume the charges on-hit to trigger bonus effects. All sources of Energized stack with each other");
      context.assume("Energized: the holder is fully Energized when the fight starts, from walking to it. An Energized attack on a pet spends the charges, but its effects don't hit the pet.");
      return (energized = energizedPool({ full: rule.quoted("Energized is an effect of certain items and runes that grants Charges, up to 100."), perAttack: rule.quoted(gain), unitsPerCharge: rule.quoted(gain, 2) }));
    },
  };
  return { fighter, shared: () => ({ ...(combat ? { combat } : {}), ...(energized ? { energized } : {}) }) };
}

/** The kit's ability names, in every form: an item of the same name labels its damage apart. */
function reservedNames(form: FighterSpec): Set<string> {
  return new Set(Object.values(form.forms ?? { [form.name]: form }).flatMap((f) => f.abilities.map((ability) => ability.name)));
}

/** An item module's options: its defaults, then the given choices. */
function chosenOptions(module: ItemModule, given: Record<string, number> | undefined): Record<string, number> {
  return { ...Object.fromEntries(Object.entries(module.options ?? {}).map(([key, option]) => [key, option.default])), ...given };
}

function equipForm(form: FighterSpec, build: ItemRecord[], context: ItemContext, equip: EquipOptions, options: Record<string, Record<string, number>>, coverage: Map<string, ItemCoverage>): { spec: FighterSpec; enemyHooks: KitHooks[] } {
  const reserved = reservedNames(form);
  const items = build.map((record) => context.item(record, reserved));
  // What isn't the kit's ability damage: the items', and the rest of the loadout's (added once it's built).
  const itemNames = new Set(items.map((item) => item.label));
  const { fighter, shared } = itemFighter(form, build, context, itemNames);
  const bonus: BonusStats = { ...form.bonus };
  const base: BaseStats = { ...form.base, attackSpeed: { ...form.base.attackSpeed }, windup: { ...form.base.windup } };
  const first: KitHooks[] = [];
  const hooks: KitHooks[] = [];
  const enemyHooks: KitHooks[] = [];
  const onHit: Effect[] = [];
  const actives: AbilitySpec[] = [];
  let critDamage = 0;
  let omnivamp = 0;
  const regen = { hp5: 0, mp5: 0 };
  const built: Built[] = [];
  for (const [index, record] of build.entries()) {
    const notes = coverage.get(record.name) ?? { item: record.name, modeled: [], unmodeled: [] };
    coverage.set(record.name, notes);
    const leaveOut = (text: string) => {
      if (!notes.unmodeled.includes(text)) notes.unmodeled.push(text);
    };
    const stats = shopStats(record, form);
    addBonus(bonus, stats.bonus);
    for (const status of stats.statuses) first.push(permanentHooks(record.name, [status]));
    critDamage += stats.critDamage;
    omnivamp += stats.omnivamp;
    regen.hp5 += stats.hp5;
    base.resource += stats.mana;
    regen.mp5 += stats.mp5;
    for (const text of stats.unmodeled) leaveOut(text);
    const module = equip.modules[record.name];
    if (!module) {
      for (const effect of record.effects) leaveOut(`${effect.name ?? effect.slot}: not modeled yet.`);
      continue;
    }
    const chosen = chosenOptions(module, options[record.name]);
    for (const [key, option] of Object.entries(module.options ?? {})) context.assume(`${record.name}: ${option.label}: ${chosen[key]}.`);
    options[record.name] = chosen;
    const definition = module.build(items[index]!, fighter, chosen);
    built.push({ record, definition });
    for (const text of definition.unmodeled ?? []) leaveOut(text);
    for (const effect of record.effects) {
      const name = effect.name ?? effect.slot;
      if (!notes.unmodeled.some((text) => text.startsWith(`${name}:`)) && !notes.modeled.includes(name)) notes.modeled.push(name);
    }
    addBonus(bonus, definition.bonus);
    if (definition.mana && fighter.mana) base.resource += definition.mana;
    if (definition.permanent?.length) first.push(permanentHooks(record.name, definition.permanent));
    onHit.push(...(definition.onHit ?? []));
    if (definition.hooks) hooks.push(definition.hooks);
    if (definition.enemyHooks) enemyHooks.push(definition.enemyHooks);
    for (const { usableWhileStunned, ...active } of definition.actives ?? []) {
      actives.push(itemActive({ castTime: 0, staticCooldown: true, countsAsCast: false, budgetExcluded: true, ...active, key: activeKey(record.name), slot: "other" }, usableWhileStunned ? STOPS_CLEANSE : STOPS_ITEMS));
    }
  }
  // Bonus critical strike damage adds to the 200%, and a champion's own modifier scales the
  // total: the wiki's critical damage template multiplies both its main and its Infinity Edge
  // part by the modifier.
  if (critDamage) {
    context.rule("Critical strike", "Critical strike").quote("In most cases, critical strike damage stacks additively.");
    const template = context.rule("Template:Critical damage", "Critical strike");
    template.quote("{{#vardefine:mainDmg|{{#expr:({{{1|0}}}){{#if:{{{mod|}}}|*({{{mod}}})}}-({{{base|0}}})}}}}");
    template.quote("{{#vardefine:IEdmg|{{#expr:({{{2|{{{1|0}}}}}}) * {{#if:{{{ie|}}}|({{{ie}}})/100|{{#var:ie_mod}}}}{{#if:{{{mod|}}}|*({{{mod}}})}}}}}}");
    base.critDamageModifier = form.base.critDamageModifier * (CRIT_DAMAGE + critDamage) / CRIT_DAMAGE;
  }
  // "% base health regeneration" and "% base mana regeneration".
  if (regen.hp5) base.hpRegen = form.base.hpRegen * (1 + regen.hp5);
  if (regen.mp5) base.resourceRegen = form.base.resourceRegen * (1 + regen.mp5);
  if (omnivamp > 0 || built.some(({ definition }) => definition.omnivamp)) {
    context.rule("Vamp", "Omnivamp").quote("Omnivamp is a stat which grants healing equal to a percentage of the post-mitigation physical damage, magic damage, and true damage dealt. It stacks additively and does not benefit from heal and shield power.");
    hooks.unshift(omnivampHooks(omnivamp));
  }
  const extra = equip.extras?.(form, { bonus: { ...bonus }, fighter });
  if (extra) {
    for (const label of extra.labels) itemNames.add(label);
    addBonus(bonus, extra.bonus);
    first.push(...(extra.first ?? []));
    hooks.push(...extra.hooks);
    enemyHooks.push(...extra.enemyHooks);
    if (extra.mana && fighter.mana) base.resource += extra.mana;
    onHit.push(...(extra.onHit ?? []));
  }
  const { combat, energized } = shared();
  if (combat) hooks.unshift(combat.hooks);
  if (energized) hooks.push(energized.hooks);
  const haste = [...built.flatMap(({ definition }) => definition.haste ?? []), ...(extra?.haste ?? [])];
  const stasis = built.some(({ definition }) => definition.stasis);
  const others = [...actives, ...(extra?.abilities ?? [])];
  const abilities = [...form.abilities.map((ability) => withItemHaste(ability, haste)), ...others].map((ability) => (stasis ? lockedInStasis(ability) : ability));
  const spec: FighterSpec = {
    ...form,
    base,
    bonus,
    attack: { ...form.attack, ...(onHit.length ? { onHit: [...(form.attack.onHit ?? []), ...onHit] } : {}) },
    abilities,
  };
  const composed = composeHooks(form.hooks, hooks, first, others.length > 0);
  if (composed) spec.hooks = ownDamageOnly(composed);
  return { spec, enemyHooks };
}

/**
 * A fighter holding a build. Each item's module is built for each form of the champion (a
 * form's melee or ranged values), and what it reads from the wiki is checked as it is built.
 */
export function equipItems(spec: FighterSpec, build: ItemRecord[], equip: EquipOptions): EquippedFighter {
  const seen = new Set<string>();
  for (const record of build) {
    if (seen.has(record.name)) throw new Error(`${spec.name}: a build can't hold ${record.name} twice`);
    seen.add(record.name);
    if (record.restriction && /only be purchased on ranged champions/i.test(record.restriction) && !spec.attack.ranged) throw new Error(`${spec.name}: ${record.name}: ${record.restriction}`);
  }
  const context = new ItemContext(equip.source);
  const options: Record<string, Record<string, number>> = { ...equip.options };
  const coverage = new Map<string, ItemCoverage>();
  let enemyHooks: KitHooks[] = [];
  const main = spec.form;
  const equipped = mapForms(spec, (form) => {
    const result = equipForm(form, build, context, equip, options, coverage);
    if (form.form === main || !spec.forms) enemyHooks = result.enemyHooks;
    return result.spec;
  });
  context.seal();
  const evidence = context.evidence.filter((entry, i, all) => all.findIndex((other) => other.item === entry.item && other.effect === entry.effect && other.text === entry.text) === i);
  return { spec: equipped, enemyHooks, items: build, options, evidence, assumptions: context.assumptions, coverage: build.map((record) => coverage.get(record.name)!) };
}

/**
 * What one item adds that the build search's quick estimate (items/estimate.ts) values: its shop
 * stats and fixed passive stats, the stats it keeps as statuses of its own, its critical strike
 * damage and its on-hit effects. Built for the item alone, so a passive that counts the rest of
 * the build (Warmog's Vitality) sees only itself.
 */
export interface ItemParts {
  item: string;
  bonus: BonusStats;
  statuses: Array<{ stat: BuffStat; value: number }>;
  critDamage: number;
  onHit: Effect[];
  /** Omnivamp from its shop stats, as a fraction. */
  omnivamp: number;
  /** Bonus maximum mana from its shop stats and passives, for mana champions. */
  mana: number;
  /** Ability haste for some abilities (ItemDefinition.haste). */
  haste: NonNullable<ItemDefinition["haste"]>;
  /** Its hint, with what its actives deal and shield per use over the reference fight. */
  budget?: ItemBudget;
}

export function itemParts(spec: FighterSpec, record: ItemRecord, equip: EquipOptions): ItemParts {
  const context = new ItemContext(equip.source);
  const item = context.item(record, reservedNames(spec));
  const stats = shopStats(record, spec);
  const parts: ItemParts = { item: record.name, bonus: { ...stats.bonus }, statuses: [], critDamage: stats.critDamage, onHit: [], omnivamp: stats.omnivamp, mana: stats.mana, haste: [] };
  const stat = (status: Permanent): status is { stat: BuffStat; value: number } => "stat" in status;
  parts.statuses.push(...stats.statuses.filter(stat));
  const module = equip.modules[record.name];
  if (!module) return parts;
  const fighter = itemFighter(spec, [record], context, new Set([item.label])).fighter;
  const definition = module.build(item, fighter, chosenOptions(module, equip.options?.[record.name]));
  addBonus(parts.bonus, definition.bonus);
  parts.statuses.push(...(definition.permanent ?? []).filter(stat));
  parts.onHit.push(...(definition.onHit ?? []).map(atHalfHealth));
  if (definition.mana && fighter.mana) parts.mana += definition.mana;
  parts.haste.push(...(definition.haste ?? []));
  const budget = joinBudgets(definition.budget, activeBudget(definition.actives ?? []));
  if (budget) parts.budget = budget;
  return parts;
}

/**
 * An on-hit effect as the estimate values it: a share of the target's current health is a share
 * of half its maximum, the target's average over a fight from full health to none (Blade of the
 * Ruined King's Mist's Edge). The estimate's target is always at full health.
 */
function atHalfHealth(effect: Effect): Effect {
  if (effect.type !== "damage" || !effect.amount.ratios?.targetCurrentHP) return effect;
  const { targetCurrentHP, ...ratios } = effect.amount.ratios;
  return { ...effect, amount: { ...effect.amount, ratios: { ...ratios, targetMaxHP: (ratios.targetMaxHP ?? 0) + targetCurrentHP / 2 } } };
}

/** Two hints as one: their stats and statuses together, their damage, healing and shields added. */
export function joinBudgets(a: ItemBudget | undefined, b: ItemBudget | undefined): ItemBudget | undefined {
  if (!a || !b) return a ?? b;
  const both = <T>(f: ((self: Unit, enemy: Unit) => T[]) | undefined, g: ((self: Unit, enemy: Unit) => T[]) | undefined) =>
    f && g ? (self: Unit, enemy: Unit) => [...f(self, enemy), ...g(self, enemy)] : (f ?? g);
  const sum = (f: ((self: Unit, enemy: Unit) => number) | undefined, g: ((self: Unit, enemy: Unit) => number) | undefined) =>
    f && g ? (self: Unit, enemy: Unit) => f(self, enemy) + g(self, enemy) : (f ?? g);
  const damage = a.damage && b.damage
    ? (self: Unit, enemy: Unit) => {
        const x = a.damage!(self, enemy);
        const y = b.damage!(self, enemy);
        return { physical: (x.physical ?? 0) + (y.physical ?? 0), magic: (x.magic ?? 0) + (y.magic ?? 0), true: (x.true ?? 0) + (y.true ?? 0) };
      }
    : (a.damage ?? b.damage);
  const joined: ItemBudget = {};
  const stats = both(a.stats, b.stats);
  const enemyStats = both(a.enemyStats, b.enemyStats);
  const healing = sum(a.healing, b.healing);
  const shielding = sum(a.shielding, b.shielding);
  if (stats) joined.stats = stats;
  if (a.late || b.late) joined.late = true;
  const ability = a.ability && b.ability ? (spec: AbilitySpec) => b.ability!(a.ability!(spec)) : (a.ability ?? b.ability);
  if (ability) joined.ability = ability;
  if (enemyStats) joined.enemyStats = enemyStats;
  if (damage) joined.damage = damage;
  if (healing) joined.healing = healing;
  if (shielding) joined.shielding = shielding;
  return joined;
}

/** Both sides of a matchup, each with the hooks the other's items put on it. */
export function matchupSpecs(you: EquippedFighter, enemy: EquippedFighter): [FighterSpec, FighterSpec] {
  const withHooks = (spec: FighterSpec, extra: KitHooks[]) =>
    extra.length === 0 ? spec : mapForms(spec, (form) => ({ ...form, hooks: composeHooks(form.hooks, extra, [], false)! }));
  return [withHooks(you.spec, enemy.enemyHooks), withHooks(enemy.spec, you.enemyHooks)];
}
