/** Interception resolves a real collision before terminating the original projectile. */
import { abilityHit, attackHit, hookContext } from "./combat";
import { abilityOf } from "./forms";
import { projectileBlockPoint, projectileInterceptPoint } from "./projectileBlock";
import { other, type Missile, type World } from "./state";

export function interceptProjectile(world: World, missile: Missile, from: number, to: number, exactPoint?: number): boolean {
  if (!missile.projectile || (!missile.connects && missile.pet === undefined && !missile.attack && !missile.interceptable && !missile.landingZone)) return false;
  const harmful = missile.attack || missile.interceptable || missile.landingZone || missile.onHit.some(effect => !["shield", "heal", "stat"].includes(effect.type));
  if (!harmful) return false;
  const owner = world.units[missile.owner], target = world.units[other(missile.owner)];
  const permitted = owner.spec.hooks?.canProjectileIntercept;
  if (permitted && !permitted({ ...hookContext(world, owner, undefined, target), missile, from, to, target, ...(exactPoint !== undefined ? { exactPoint } : {}) })) return false;
  const candidate = projectileInterceptPoint(world, missile.owner, from, to, Math.max(0, missile.radius ?? 0));
  if (candidate === undefined) return false;
  // A custom curve may prove a later two-dimensional contact within this segment.
  // Keep the real approach point for damage provenance and never rewind its impact.
  if (exactPoint !== undefined && (exactPoint < Math.min(from,to)-1e-6 || exactPoint > Math.max(from,to)+1e-6)) return false;
  const point = exactPoint ?? candidate;
  const destroyedAt = projectileBlockPoint(world, missile.owner, from, to);
  if (destroyedAt !== undefined && Math.abs(destroyedAt - from) <= Math.abs(point - from) + 1e-6) return false;
  const overshoot = Math.abs(to - point);
  missile.x = point;
  missile.intercepted = true;
  if (Number.isFinite(missile.travelLeft)) missile.travelLeft += overshoot;
  if (missile.collisionDistanceLeft !== undefined) missile.collisionDistanceLeft += overshoot;
  const claimed = owner.spec.hooks?.onProjectileIntercept?.({ ...hookContext(world, owner, undefined, target), missile, from, to: point, target }) === true;
  if (!claimed) owner.spec.hooks?.onMissileMove?.({ ...hookContext(world, owner), missile, from, to: point });
  const alreadyResolved = claimed || missile.ended;
  if (!alreadyResolved && missile.landingZone) {
    const zone = world.zones.find(candidate => candidate.id === missile.landingZone!.id);
    if (zone) { zone.x = point; zone.endTick = world.tick + missile.landingZone.delayTicks; }
  } else if (!alreadyResolved && missile.attack) {
    attackHit(world, owner, target, missile.attack.blinded, missile.attack.bonusOnHit, missile.attack.split, missile.hitsUntargetable, missile.attack, missile.scale, from);
  } else if (!alreadyResolved && missile.connects) {
    const ability = abilityOf(owner, missile.source);
    if (ability) abilityHit(world, owner, target, ability, missile.onHit, missile.scale, from);
  }
  if (!claimed && !alreadyResolved) {
    (missile.hitTargets ??= []).push(target.side);
    owner.spec.hooks?.onMissileContact?.({ ...hookContext(world, owner, undefined, target), missile });
  }
  missile.ended = true;
  owner.spec.hooks?.onMissileEnd?.({ ...hookContext(world, owner, undefined, target), missile, reason: "intercepted" });
  return true;
}
