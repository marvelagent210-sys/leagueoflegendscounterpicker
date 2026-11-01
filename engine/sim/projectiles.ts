/**
 * Opt-in missiles that keep flying through contacts or return to their owner. Ordinary
 * missiles retain their existing path in actions.ts. Distances and velocity curves here
 * are supplied by the kit; the shared mover supplies no champion-specific numbers.
 */
import { abilityHit, abilityHitPet, attackHit, hookContext, inStasis, isUntargetable, log } from "./combat";
import { abilityOf } from "./forms";
import { resolveAttackOnPet } from "./attackPet";
import { petEffects } from "./pets";
import { petFormulaTarget } from "./petTarget";
import { interceptProjectile } from "./projectileIntercept";
import type { Effect } from "./spec";
import { other, type Missile, type Pet, type Unit, type World } from "./state";

const EPSILON = 1e-6;
type EndReason = "range" | "owner" | "blocked";
type Blocked = (world: World, missile: Missile, from: number, to: number) => boolean;
type Contact = { distance: number; target: Unit } | { distance: number; pet: Pet };

function end(world: World, missile: Missile, reason: EndReason): false {
  if (!missile.ended) {
    missile.ended = true;
    const owner = world.units[missile.owner];
    owner.spec.hooks?.onMissileEnd?.({ ...hookContext(world, owner), missile, reason });
  }
  return false;
}

/** Earliest point on this directed segment that touches a target's hitbox. */
function contactDistance(from: number, direction: 1 | -1, x: number, radius: number, length: number): number | undefined {
  const center = direction * (x - from);
  if (center + radius < -EPSILON || center - radius > length + EPSILON) return undefined;
  return Math.max(0, center - radius);
}

function nextContact(world: World, missile: Missile, length: number): Contact | undefined {
  const owner = world.units[missile.owner];
  const target = world.units[other(missile.owner)];
  const radius = Math.max(0, missile.radius ?? 0);
  let closest: Contact | undefined;
  if (missile.connects && target.alive && !inStasis(target) && (missile.hitsUntargetable || !isUntargetable(target, owner)) && !missile.hitTargets?.includes(target.side)) {
    const distance = contactDistance(missile.x, missile.direction, target.x, target.spec.base.radius + radius, length);
    if (distance !== undefined) closest = { distance, target };
  }
  if (missile.collisionPet) {
    for (const pet of world.pets) {
      // The simulator's area-damage targets: untargetable objects and hit-count props
      // (kegs/tentacles) are not damageable spell targets and do not absorb this flight.
      if (pet.owner === missile.owner || pet.spec.untargetable || (!missile.attack && pet.spec.hitPoints) || pet.hp <= 0 || missile.hitPets?.includes(pet.id) || isUntargetable(petFormulaTarget(pet, owner, world.tick), owner)) continue;
      const distance = contactDistance(missile.x, missile.direction, pet.x, pet.spec.radius + radius, length);
      if (distance !== undefined && (!closest || distance < closest.distance - EPSILON)) closest = { distance, pet };
    }
  }
  return closest;
}

/** Area-damage policy, applied to exactly the contacted pet (not nearby pets twice). */
function hitPet(world: World, missile: Missile, pet: Pet, effects: Effect[]): void {
  const owner = world.units[missile.owner];
  // Champion sidestep branches do not make a stationary pet miss or reduce its packet.
  const ability = abilityOf(owner, missile.source);
  if (ability?.flags?.petContactHooks) abilityHitPet(world, owner, pet, ability, effects, "area");
  else petEffects(world, owner, pet, effects, "area", missile.source);
}

function accelerate(missile: Missile): void {
  const acceleration = missile.acceleration;
  if (acceleration) missile.perTick = Math.max(acceleration.minPerTick ?? 0, Math.min(acceleration.maxPerTick, missile.perTick + acceleration.perTick));
}

/**
 * Advance one opt-in missile for one tick. Each contact is resolved at its actual point
 * on the path before continuing with the unused time; a kit may change the flight there.
 * Returning missiles follow the current owner position and remain valid after owner death.
 * End hooks may append another leg to world.missiles; actions.ts schedules it next tick.
 */
export function advanceSpecialMissile(world: World, missile: Missile, blocked: Blocked): boolean {
  if (missile.ended) return false;
  if (missile.expiresTick !== undefined && world.tick >= missile.expiresTick) return end(world, missile, "range");
  const owner = world.units[missile.owner];
  owner.spec.hooks?.onMissileTick?.({ ...hookContext(world, owner), missile });
  if (missile.ended) return false;
  let timeLeft = 1;
  while (timeLeft > EPSILON) {
    if (missile.followOwner && Math.abs(owner.x - missile.x) <= EPSILON) {
      missile.x = owner.x;
      return end(world, missile, "owner");
    }
    if (missile.travelLeft <= EPSILON) return end(world, missile, "range");
    if (missile.followOwner) missile.direction = owner.x > missile.x ? 1 : -1;
    const speed = Math.max(0, missile.perTick);
    if (speed <= 0) break;
    const ownerDistance = missile.followOwner ? Math.abs(owner.x - missile.x) : Number.POSITIVE_INFINITY;
    const distance = Math.min(speed * timeLeft, Math.max(0, missile.travelLeft), ownerDistance);
    const collisionLeft = missile.collisionDistanceLeft;
    const contact = collisionLeft === undefined || collisionLeft > EPSILON ? nextContact(world, missile, Math.min(distance, collisionLeft ?? distance)) : undefined;
    const traveled = contact ? Math.min(distance, contact.distance) : distance;
    const from = missile.x;
    missile.x += missile.direction * traveled;
    missile.travelLeft = Math.max(0, missile.travelLeft - traveled);
    if (missile.collisionDistanceLeft !== undefined) missile.collisionDistanceLeft = Math.max(0, missile.collisionDistanceLeft - traveled);
    timeLeft = Math.max(0, timeLeft - traveled / speed);
    if (interceptProjectile(world, missile, from, missile.x)) return false;
    if (blocked(world, missile, from, missile.x)) {
      log(world, other(missile.owner), `blocks a projectile (${missile.source})`);
      return end(world, missile, "blocked");
    }
    owner.spec.hooks?.onMissileMove?.({ ...hookContext(world, owner), missile, from, to: missile.x });
    // A kit can resolve its endpoint or replace this flight in the movement hook.
    // That claimed ending invalidates a contact captured before the callback.
    if (missile.ended) return false;
    if (contact) {
      const effects = missile.onHit;
      if ("target" in contact) {
        (missile.hitTargets ??= []).push(contact.target.side);
        const ability = abilityOf(owner, missile.source);
        if (missile.attack) attackHit(world, owner, contact.target, missile.attack.blinded, missile.attack.bonusOnHit, missile.attack.split, missile.hitsUntargetable, missile.attack, missile.scale, from);
        else if (ability) abilityHit(world, owner, contact.target, ability, effects, missile.scale, from);
        owner.spec.hooks?.onMissileContact?.({ ...hookContext(world, owner), missile });
      } else {
        (missile.hitPets ??= []).push(contact.pet.id);
        // This actual spatial contact is independent of the champion's sidestep
        // probability. Conditional homing follow-ups keep their share in actions.ts.
        if (missile.attack) resolveAttackOnPet(world, owner, contact.pet, missile.attack.blinded, missile.attack.bonusOnHit, missile.attack, missile.attack.split);
        else hitPet(world, missile, contact.pet, effects);
        owner.spec.hooks?.onMissileContact?.({ ...hookContext(world, owner, undefined, petFormulaTarget(contact.pet, owner, world.tick)), missile, targetPet: contact.pet });
      }
      if (missile.ended) return false;
      // A shattering kit can set piercing and extend travelLeft in its contact hook.
      if (!missile.piercing) return end(world, missile, "range");
      if (missile.followOwner && Math.abs(owner.x - missile.x) <= EPSILON) {
        missile.x = owner.x;
        return end(world, missile, "owner");
      }
      if (missile.travelLeft <= EPSILON) return end(world, missile, "range");
      continue;
    }
    if (missile.followOwner && Math.abs(owner.x - missile.x) <= EPSILON) {
      missile.x = owner.x;
      return end(world, missile, "owner");
    }
    if (missile.travelLeft <= EPSILON) return end(world, missile, "range");
    break;
  }
  accelerate(missile);
  return true;
}
