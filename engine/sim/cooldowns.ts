/** Ability-qualified haste. Haste revision 4070414 caps the additive total at 500. */
import { derive } from "./derived";
import { abilityOf, allAbilities } from "./forms";
import type { AbilitySpec } from "./spec";
import type { Unit } from "./state";

/** Kit-owned clocks may provide their reviewed ability class without inventing a spell. */
export type AbilityHasteSource = Pick<AbilitySpec, "slot"> & Partial<Pick<AbilitySpec,
  "key" | "hasteType" | "activation" | "cooldownKey" | "chain" | "bonusAbilityHaste">>;

/** Full definitions are authoritative; shorthand clocks inherit their equipped spell's metadata. */
function resolvedSource(unit: Unit, source: AbilityHasteSource): AbilityHasteSource {
  if ("cooldown" in source) return source;
  const own = abilityOf(unit, source.key ?? source.slot);
  if (!own) return source;
  return {
    slot: source.slot, key: source.key ?? own.key,
    hasteType: source.hasteType ?? own.hasteType,
    activation: source.activation ?? own.activation,
    cooldownKey: source.cooldownKey ?? own.cooldownKey,
    chain: source.chain ?? own.chain,
    bonusAbilityHaste: source.bonusAbilityHaste ?? own.bonusAbilityHaste,
  };
}

function typeOf(unit: Unit, source: AbilityHasteSource, seen = new Set<string>()): NonNullable<AbilitySpec["hasteType"]> {
  if (source.hasteType !== undefined) return source.hasteType;
  if (source.activation === "internal") return "other";
  if (source.key !== undefined) seen.add(source.key);
  // Empowered versions and recast stages retain the parent spell's classification.
  const parentKey = source.cooldownKey !== source.key ? source.cooldownKey : undefined;
  const root = parentKey ?? source.chain?.root;
  if (root !== undefined && !seen.has(root)) {
    const parent = abilityOf(unit, root);
    if (parent) return typeOf(unit, parent, seen);
  }
  return source.slot === "Q" || source.slot === "W" || source.slot === "E" ? "basic"
    : source.slot === "R" ? "ultimate" : "other";
}

/** Parent aliases and reviewed exceptions determine which specialized haste can apply. */
export function hasteTypeFor(unit: Unit, source: AbilityHasteSource): NonNullable<AbilitySpec["hasteType"]> {
  return typeOf(unit, resolvedSource(unit, source));
}

/** Generic haste combines only with the specialized stat eligible for this ability. */
export function abilityHasteFor(unit: Unit, source: AbilityHasteSource): number {
  const stats = derive(unit);
  const resolved = resolvedSource(unit, source);
  const kind = typeOf(unit, resolved);
  const specialized = kind === "basic" ? stats.basicAbilityHaste : kind === "ultimate" ? stats.ultimateAbilityHaste : 0;
  return Math.min(500, stats.abilityHaste + specialized + (resolved.bonusAbilityHaste ?? 0));
}

/** Preserve the initiating spell and its reviewed class, not its current haste value. */
export function cooldownSourceSnapshot(unit: Unit, ability: AbilitySpec): AbilitySpec {
  return {
    ...ability,
    hasteType: hasteTypeFor(unit, ability),
    ...(ability.charges ? { charges: { ...ability.charges } } : {}),
  };
}

/** A stored timer can belong to a shared key absent from the kit's actual spell keys. */
export function abilityForCooldown(unit: Unit, key: string): AbilitySpec | undefined {
  return unit.cooldownSources[key] ?? abilityOf(unit, key)
    ?? allAbilities(unit.spec).find(ability => ability.cooldownKey === key);
}
