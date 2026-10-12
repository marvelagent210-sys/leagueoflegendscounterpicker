/**
 * Plain-language descriptions of simulator kits (formulas, effects, deliveries, abilities),
 * for kit pages and the web app.
 */
import type { AbilitySpec, AttackSpec, Delivery, Effect, Formula, StatRef } from "./spec";

export const STAT_NAMES: Record<StatRef, string> = {
  AD: "AD",
  baseAD: "base AD",
  bonusAD: "bonus AD",
  AP: "AP",
  maxHP: "maximum health",
  bonusHP: "bonus health",
  currentHP: "current health",
  missingHP: "missing health",
  armor: "armor",
  bonusArmor: "bonus armor",
  MR: "magic resistance",
  bonusMR: "bonus magic resistance",
  attackSpeed: "attack speed",
  bonusAttackSpeed: "bonus attack speed",
  critChance: "crit chance",
  moveSpeed: "movement speed",
  bonusMoveSpeed: "bonus movement speed",
  lethality: "lethality",
  targetMoveSpeed: "target's movement speed",
  targetAD: "target's AD",
  targetBonusAD: "target's bonus AD",
  targetAP: "target's AP",
  targetMaxHP: "target's maximum health",
  targetCurrentHP: "target's current health",
  targetMissingHP: "target's missing health",
  targetBonusHP: "target's bonus health",
  targetArmor: "target's armor",
  targetBonusArmor: "target's bonus armor",
  targetMR: "target's magic resistance",
  targetBonusMR: "target's bonus magic resistance",
};

/** Up to three decimals, without trailing zeros. */
export function num(value: number): string {
  return String(Math.round(value * 1000) / 1000);
}

export function pct(fraction: number): string {
  return `${num(fraction * 100)}%`;
}

export function formulaText(formula: Formula): string {
  const parts: string[] = [];
  for (const [stat, ratio] of Object.entries(formula.ratios ?? {})) {
    if (ratio) parts.push(`${pct(ratio)} ${STAT_NAMES[stat as StatRef]}`);
  }
  for (const product of formula.products ?? []) {
    const [per, of, ...rest] = product.stats;
    if (per && of && rest.length === 0) parts.push(`${num(product.ratio * 1e4)}% of ${STAT_NAMES[of]} per 100 ${STAT_NAMES[per]}`);
    else parts.push(`${num(product.ratio)} × ${product.stats.map((s) => STAT_NAMES[s]).join(" × ")}`);
  }
  if (formula.base !== 0 || parts.length === 0) parts.unshift(num(formula.base));
  return parts.join(" + ");
}

export function effectText(effect: Effect): string {
  switch (effect.type) {
    case "damage": {
      const extras = [effect.canCrit ? "can crit" : "", effect.minimum ? `at least ${formulaText(effect.minimum)}` : "", effect.lifesteal ? `heals ${pct(effect.lifesteal)} of it` : ""].filter(Boolean);
      return `${formulaText(effect.amount)} ${effect.damageType} damage${effect.label ? ` (${effect.label})` : ""}${extras.length ? `, ${extras.join(", ")}` : ""}`;
    }
    case "cc":
      if (effect.cc === "nearsight") return `nearsight to ${num(effect.strength ?? 0)} units for ${num(effect.duration)} s`;
      return `${effect.cc}${effect.strength ? ` ${pct(effect.strength)}` : ""} for ${num(effect.duration)} s`;
    case "displace": {
      const kind = effect.direction === "toward" ? "pull" : effect.distance === 0 ? "knock up" : "knock back";
      return `${kind}${effect.distance ? ` ${num(effect.distance)} units` : ""} over ${num(effect.duration)} s${effect.wallStun ? `, stun ${num(effect.wallStun)} s into a wall` : ""}`;
    }
    case "shield":
      return `${effect.shieldType && effect.shieldType !== "normal" ? `${effect.shieldType} ` : ""}shield of ${formulaText(effect.amount)} for ${num(effect.duration)} s`;
    case "heal":
      return `heal ${formulaText(effect.amount)}`;
    case "state":
      return `${effect.state}${effect.value !== undefined ? ` ${num(effect.value)}` : ""} for ${num(effect.duration)} s${effect.charges ? ` (${effect.charges} charge${effect.charges === 1 ? "" : "s"})` : ""}`;
    case "stat":
      return `${effect.stat} ${formulaText(effect.amount)} for ${num(effect.duration)} s`;
    case "dot":
      return `${formulaText(effect.total)} ${effect.damageType} damage over ${num(effect.duration)} s${effect.stacks ? " (stacking)" : ""}`;
    case "grievousWounds":
      return `Grievous Wounds for ${num(effect.duration)} s`;
    case "cleanse":
      return effect.types ? `cleanses ${effect.types.join(", ")}` : "cleanses crowd control";
    case "empower": {
      const extras = [effect.bonusRange ? `+${num(effect.bonusRange)} range` : "", effect.resetAttack ? "resets the attack timer" : "", effect.uncancellable ? "uncancellable" : ""].filter(Boolean);
      const hits = effect.onHit.map(effectText).join("; ");
      return `next ${effect.attacks} attack${effect.attacks === 1 ? "" : "s"} within ${num(effect.window)} s${hits ? `: ${hits}` : ""}${extras.length ? ` (${extras.join(", ")})` : ""}`;
    }
    case "execute":
      return `executes at ${formulaText(effect.threshold)} health or less`;
    case "resetAttack":
      return "resets the attack timer";
    case "projectileWall":
      return `projectile wall ${num(effect.distance)} units ahead for ${num(effect.duration)} s`;
    case "delayed":
      return `after ${num(effect.delay)} s: ${effect.effects.map(effectText).join("; ")}`;
    case "resource":
      return `${formulaText(effect.amount)} resource`;
    case "refund":
      return `cuts ${effect.ability}'s cooldown by ${effect.seconds !== undefined ? `${num(effect.seconds)} s` : pct(effect.fraction ?? 0)}`;
    case "mark":
      return `marks it "${effect.key}" for ${num(effect.duration)} s`;
    case "reposition":
      return `reappears ${num(effect.distance)} units ${effect.direction === "away" ? "away" : "closer"}`;
    case "attach":
      return `carried ${num(effect.offset)} units from the caster for ${num(effect.duration)} s`;
    case "caster":
      return `to itself: ${effect.effects.map(effectText).join("; ")}`;
  }
}

export function deliveryText(delivery: Delivery): string {
  switch (delivery.kind) {
    case "self":
      return "self";
    case "aura":
      return `around itself, ${num(delivery.radius)} units`;
    case "target":
      return `targeted, ${num(delivery.range)} ${delivery.edge ? "edge " : ""}range${delivery.missileSpeed ? `, missile at ${num(delivery.missileSpeed)}/s` : ""}`;
    case "line":
      return `skillshot ${num(delivery.range)} long, ${num(delivery.width)} wide, ${delivery.speed ? `at ${num(delivery.speed)}/s` : "instant"}`;
    case "circle":
      return `circle of ${num(delivery.radius)} radius${delivery.centered ? " (to the target's center)" : ""} up to ${num(delivery.range)} away, lands after ${num(delivery.delay)} s`;
    case "dash":
      return `dash ${delivery.direction} ${delivery.minDistance !== undefined ? `${num(delivery.minDistance)}–` : ""}${num(delivery.distance)} units ${delivery.time !== undefined ? `in ${num(delivery.time)} s` : `at ${num(delivery.speed)}/s`}${delivery.lockOn ? `, at ${num(delivery.lockOn.speed)}/s within ${num(delivery.lockOn.within)} of the enemy` : ""}${delivery.hitRadius !== undefined ? `, hits within ${num(delivery.hitRadius)}` : ""}${delivery.through ? ", through the enemy" : ""}`;
    case "blink":
      return `blink ${delivery.direction} ${num(delivery.distance)} units`;
    case "field": {
      const where = delivery.attached
        ? `around itself${delivery.offset ? `, ${num(delivery.offset)} units ahead` : ""}`
        : delivery.chase
          ? `moving toward the enemy at ${num(delivery.chase)}/s`
          : `up to ${num(delivery.range)} away`;
      const burst = delivery.burst ? ` (${num(delivery.burst.count)} hits ${num(delivery.burst.gap)} s apart)` : "";
      const timing = `${delivery.delay ? `after ${num(delivery.delay)} s, ` : ""}for ${num(delivery.duration)} s, pulsing every ${num(delivery.interval)} s${burst}`;
      return `field of ${num(delivery.radius)} radius ${where}, ${timing}${delivery.onOwner?.length ? `; on itself inside: ${effectsText(delivery.onOwner)}` : ""}`;
    }
    case "area": {
      const bands = (delivery.bands ?? []).map((b) => `${num(b.from)}–${num(b.to)}: ${b.onHit.map(effectText).join("; ")}`);
      return `area ${num(delivery.near)} to ${num(delivery.far)} units ahead${delivery.centered ? " (by the enemy's center)" : ""}, lands after ${num(delivery.delay)} s${bands.length ? `; bands ${bands.join(" / ")}` : ""}`;
    }
  }
}

/** Effects joined in one line, or "–" when there are none. */
export function effectsText(effects: Effect[] | undefined): string {
  return effects && effects.length > 0 ? effects.map(effectText).join("; ") : "–";
}

/** When a post-effect cooldown starts. */
const COOLDOWN_AFTER: Record<NonNullable<AbilitySpec["cooldownAfter"]>, string> = {
  empower: "starts after the empowered attacks",
  channel: "starts after the channel",
  dash: "starts after the dash",
  field: "starts when the area fades",
  state: "starts when its effect on the caster ends",
};

/** One simulator ability, described column by column. */
export interface AbilityDescription {
  key: string;
  name: string;
  cooldown: string;
  castTime: string;
  cost: string;
  delivery: string;
  onEnemy: string;
  onSelf: string;
}

export function describeAbility(ability: AbilitySpec): AbilityDescription {
  const channel = ability.channel;
  const timing = [
    ability.chain ? `recast of ${ability.chain.root} within ${num(ability.chain.window)} s${ability.chain.delay ? `, after ${num(ability.chain.delay)} s` : ""}${ability.chain.auto ? ", automatic" : ""}` : "",
    channel ? `channel ${num(channel.duration)} s${channel.pulses ? `, ${formulaText(channel.pulses)} pulses` : channel.interval ? `, pulses every ${num(channel.interval)} s` : ""}` : "",
  ].filter(Boolean);
  const onHit = [effectsText(ability.onHit)];
  if (channel?.onTick) onHit.push(`each pulse: ${effectsText(channel.onTick)}`);
  if (channel?.onComplete) onHit.push(`at the end: ${effectsText(channel.onComplete)}`);
  const falloff = ability.falloff;
  if (falloff) onHit.push(`${num(falloff.per * 100)}% less damage for each hit it took from these in the last ${num(falloff.window)} s, down to ${num(falloff.floor * 100)}%`);
  const onSelf = [
    ability.onCastStart?.length ? `as the cast starts: ${effectsText(ability.onCastStart)}` : "",
    ability.onSelf?.length ? effectsText(ability.onSelf) : "",
    channel?.onCompleteSelf?.length ? `when the channel completes: ${effectsText(channel.onCompleteSelf)}` : "",
  ].filter(Boolean);
  const paidWith = ability.costType === "health" ? " health" : "";
  return {
    key: ability.key,
    name: ability.name,
    cooldown: ability.charges
      ? `${ability.charges.max} charges, one every ${num(ability.charges.recharge)} s (${num(ability.cooldown)} s between casts)`
      : `${num(ability.cooldown)}${ability.cooldownAfter ? ` (${COOLDOWN_AFTER[ability.cooldownAfter]})` : ""}`,
    castTime: num(ability.castTime),
    cost: ability.cost === undefined ? "–" : `${typeof ability.cost === "number" ? num(ability.cost) : formulaText(ability.cost)}${paidWith}`,
    delivery: [deliveryText(ability.delivery), ...timing].join("; "),
    onEnemy: onHit.filter((t) => t !== "–").join("; ") || "–",
    onSelf: onSelf.join("; ") || "–",
  };
}

export function attackText(attack: AttackSpec): string {
  const parts = [`range ${num(attack.range)}`, attack.missileSpeed ? `missile at ${num(attack.missileSpeed)}/s` : "melee"];
  if (attack.onHit?.length) parts.push(`on hit: ${effectsText(attack.onHit)}`);
  return parts.join(", ");
}
