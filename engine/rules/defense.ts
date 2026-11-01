/**
 * Shields and healing (wiki: "Shield", "Healing", "Critical strike").
 *
 * - Resistances mitigate damage before shields absorb it. Normal shields absorb every
 *   type, magic shields only magic damage, physical shields only physical damage.
 * - With several shields, the one that expires soonest absorbs first, except shields that
 *   take priority over all others (Morgana's Black Shield, Camille's Adaptive Defenses).
 * - Grievous Wounds reduces healing received by 40%.
 * - Critical strikes deal 200% damage by default (back to 200% since V26.01).
 */

export type ShieldType = "normal" | "magic" | "physical";

export interface Shield {
  amount: number;
  type: ShieldType;
  /** Tick it expires on. */
  endTick: number;
  priority?: boolean;
  /** A newly triggered shield lets this much of its first packet reach health first. */
  firstDamageBypass?: number;
}

export const GRIEVOUS_WOUNDS = 0.4;
/** Critical strikes deal 200% damage (wiki "Critical strike": back to 200% from 175% in V26.01). */
export const CRIT_DAMAGE = 2;

function absorbs(shield: Shield, type: "physical" | "magic" | "true"): boolean {
  return shield.type === "normal" || shield.type === type;
}

/**
 * Lets shields absorb a post-mitigation hit. Mutates the shields' amounts and returns the
 * damage left for health.
 */
export function absorbWithShields(damage: number, type: "physical" | "magic" | "true", shields: Shield[]): number {
  const order = shields
    .filter((s) => s.amount > 0 && absorbs(s, type))
    .sort((a, b) => Number(a.firstDamageBypass !== undefined) - Number(b.firstDamageBypass !== undefined) || Number(Boolean(b.priority)) - Number(Boolean(a.priority)) || a.endTick - b.endTick);
  let left = damage;
  for (const shield of order) {
    if (left <= 0) break;
    const taken = Math.min(shield.amount, Math.max(0, left - Math.max(0, shield.firstDamageBypass ?? 0)));
    shield.amount -= taken;
    left -= taken;
    delete shield.firstDamageBypass;
  }
  for (const shield of shields) delete shield.firstDamageBypass;
  return left;
}

/** Healing received after Grievous Wounds. */
export function healingReceived(raw: number, grievousWounds: boolean): number {
  return raw * (grievousWounds ? 1 - GRIEVOUS_WOUNDS : 1);
}

/** Average damage multiplier of attacks that can critically strike. */
export function averageCritFactor(critChance: number, critDamage = CRIT_DAMAGE): number {
  const chance = Math.min(1, Math.max(0, critChance));
  return 1 + chance * (critDamage - 1);
}
