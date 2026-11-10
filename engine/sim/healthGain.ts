/** Permanent external maximum-health awards, separate from healing and passive conversion. */
import { derive } from "./derived";
import type { HookContext } from "./spec";

/**
 * Install one direct bonus-health award on the actual champion body. The caller's
 * key identifies the award across form changes, copied branches and repeated setup.
 *
 * Dead/fallen and resurrection-window owners keep the permanent stats without
 * current-health restoration. That conservative window policy is not live proof.
 */
export function grantPermanentBonusHealth(ctx: HookContext, amount: number, memoKey: string, ability: string): void {
  const self = ctx.self;
  if (self.petId !== undefined || ctx.world.units[self.side] !== self) return;
  if (!Number.isFinite(amount) || amount <= 0 || !memoKey || !ability) {
    throw new Error("A permanent bonus-health award requires a positive finite amount and an identity");
  }
  const awarded = `engine:maximumHealthAward:${memoKey}`;
  if (self.memory[awarded] === true) return;
  const conversion = self.spec.statConversions;
  const multiplier = conversion?.directBonusHealthMultiplier ?? 1;
  const adPerHealth = conversion?.directBonusHealthToAD;
  if (!Number.isFinite(multiplier) || multiplier <= 0
    || (adPerHealth !== undefined && (!Number.isFinite(adPerHealth) || adPerHealth < 0))) {
    throw new Error("A permanent bonus-health award requires finite champion conversion rules");
  }
  const health = adPerHealth === undefined ? amount * multiplier : 0;
  const value = adPerHealth === undefined ? health : amount * multiplier * adPerHealth;
  if (!Number.isFinite(value)) throw new Error("A permanent bonus-health award must remain finite");
  self.memory[awarded] = true;
  self.statuses.push({
    kind: "stat", key: adPerHealth === undefined ? "health" : "AD", source: self.side,
    startTick: ctx.tick, endTick: Infinity, value, memoKey, ability, persistThroughDeath: true,
  });
  if (!(health > 0) || !self.alive || !(self.hp > 0) || self.fallen || self.deathDefied || self.resurrection) return;
  // Kled's own-health ceiling applies to direct restoration; All Out's healing
  // ceiling does not. Passive AP-to-health output never adds to this direct gain.
  const caps = self.statuses.filter(status => status.kind === "state" && status.key === "maximumHealthGainCap");
  const most = Math.min(derive(self).maxHp, ...caps.map(status => status.value));
  self.hp = Math.min(most, self.hp + health);
}
