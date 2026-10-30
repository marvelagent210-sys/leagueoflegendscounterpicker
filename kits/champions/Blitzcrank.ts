/** Blitzcrank's pinned five templates, with exact 16.20 game-file attribution. */
import { absorbWithShields } from "../../engine/rules/defense";
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack, inAttackRange, inReach } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const blitzcrank: KitModule = {
  champion: "Blitzcrank",
  build(kit) {
    const passive = kit.ability("Mana Barrier"), q = kit.ability("Rocket Grab"), w = kit.ability("Overdrive"), e = kit.ability("Power Fist"), r = kit.ability("Static Field");
    const pPath = "Characters/Blitzcrank/Spells/ManaBarrierIconAbility/ManaBarrierIcon";
    const qPath = "Characters/Blitzcrank/Spells/RocketGrabAbility/RocketGrabMissile";
    const ePath = "Characters/Blitzcrank/Spells/PowerFistAbility/PowerFist";
    const rPath = "Characters/Blitzcrank/Spells/StaticFieldAbility/StaticField";
    const shieldRatio = passive.quoted("shield equal to 35% of maximum mana") / 100;
    const threshold = passive.quoted("damaged to 30% maximum health") / 100;
    const shieldSeconds = passive.quoted("lasting for up to 10 seconds");
    const shieldCooldown = passive.field("staticCooldown");
    passive.quote("The shield will absorb the portion of incoming damage that would reduce health past 30%");
    passive.gameQuote('"name":"HealthThreshold","values":[0.30000001192092896,0.30000001192092896,0.30000001192092896,0.30000001192092896,0.30000001192092896,0.30000001192092896,0.30000001192092896]', pPath);
    passive.gameQuote('"name":"ManaPercent","values":[0.3499999940395355,0.3499999940395355,0.3499999940395355,0.3499999940395355,0.3499999940395355,0.3499999940395355,0.3499999940395355]', pPath);
    passive.gameQuote('"mCoefficient":0.3499999940395355,"__type":"AbilityResourceByCoefficientCalculationPart"', pPath);
    passive.gameQuote('"name":"ShieldDuration","values":[10.0,10.0,10.0,10.0,10.0,10.0,10.0]', pPath);
    passive.gameQuote('"name":"Cooldown","values":[90.0,90.0,90.0,90.0,90.0,90.0,90.0]', pPath);
    const grabRange = q.field("range", "Missile + rectangle check"), grabSpeed = q.field("speed", "Missile speed"), pullSpeed = q.field("speed", "Pull speed");
    const grabWidth = q.field("width", "Missile collision width");
    const flightRange = q.quoted("a missile with 1080 range");
    const pullOffset = q.quoted("destination lies 75 units in front");
    const grabStun = q.quoted("stunning them for 0.65 seconds");
    const grabTail = q.quoted("for 0.25 seconds after it hits an enemy");
    const maxAirborne = q.quoted("debuff lasts for up-to 1 second");
    q.quote("Displacement immunity will not resist the application of the stun");
    q.quote("at the start of cast time");
    q.quote("If this location would be inside static terrain, the target's destination will end up on Blitzcrank's side");
    q.quote("If the target dies to Rocket Grab's damage, they will not be pulled");
    q.quote("during which they are revealed");
    q.gameQuote('"castRange":[1080.0,1080.0,1080.0,1080.0,1080.0,1080.0,1080.0]', qPath);
    q.gameQuote('"mMissileWidth":70.0', qPath);
    q.gameQuote('"mTracksTarget":false', qPath);
    q.gameQuote('"mSpeed":1800.0', qPath);
    const overdriveSeconds = w.quoted("bonus attack speed for 5 seconds");
    const decaySeconds = w.quoted("over the first 2.9 seconds");
    const decayFloor = w.quoted("decays to 10%") / 100;
    const overdriveAS = w.fraction("Bonus Attack Speed"), overdriveMS = w.fraction("Initial Bonus Movement Speed");
    const slowSeconds = w.quoted("slowed by 30% for 1.5 seconds", 1), slow = w.quoted("slowed by 30% for 1.5 seconds") / 100;
    w.quote("The movement speed boost's decay is linear");
    w.quote("On the first stat update after the buff is gained, the boost does not decay");
    w.quote("The self-slow is affected by slow resist and Tenacity");
    w.gameQuote('"name":"MoveSpeedModMinTime","values":[2.5,2.5,2.5,2.5,2.5,2.5,2.5]');
    w.gameQuote('"name":"AttackSpeedMod","values":[0.20000000298023224,0.30000001192092896,0.4000000059604645,0.5,0.6000000238418579,0.699999988079071,0.800000011920929]');
    const fistWindow = e.quoted("next basic attack within 5 seconds"), fistAir = e.quoted("knock up the target for 1 second");
    const fistAD = e.quoted("deal 100% AD (+ 25% AP)") / 100, fistAP = e.quoted("deal 100% AD (+ 25% AP)", 1) / 100;
    e.quote("This damage is affected by critical strike modifiers");
    e.quote("Spell shield prevents the knockup and the damage, including the damage of the basic attack itself");
    e.quote("The enhanced attack will still complete and hit the target even if they become untargetable during the attack's windup");
    e.quote("Power Fist resets Blitzcrank's basic attack timer");
    e.gameQuote('"mStat":2,"mCoefficient":2.0', ePath);
    e.gameQuote('"mCoefficient":0.25,"__type":"StatByCoefficientCalculationPart"', ePath);
    e.gameQuote('"mCantCancelWhileWindingUp":true', "Characters/Blitzcrank/Spells/PowerFistAbility/PowerFistAttack");
    const boltDamage = r.formula("Magic Damage", 0), activeDamage = r.formula("Magic Damage", 1);
    const boltInterval = r.quoted("one stack is consumed every 1 second"), silence = r.quoted("silences them for 0.5 seconds");
    r.quote("Blitzcrank's attacks do not have to deal damage to apply the mark");
    r.quote("A mark will still be applied if the attack is blocked");
    r.quote("The mark will be consumed even if the target becomes untargetable");
    r.quote("Even if Static Field is blocked by a spell shield, it will still destroy any existing damage shields on the target");
    r.quote("This ability will cast from wherever the caster is at the end of the cast time");
    r.quote("The lightning bolts deal spell damage while the static field applies area damage");
    r.gameQuote('"name":"ZapCountdown","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]', rPath);
    r.gameQuote('"mCoefficient":0.019999999552965164,"__type":"AbilityResourceByCoefficientCalculationPart"', rPath);
    r.gameQuote('"name":"PassiveManaRatio","values":[0.05000000074505806,0.05000000074505806,0.05000000074505806,0.05000000074505806,0.05000000074505806,0.05000000074505806,0.05000000074505806]', rPath);
    kit.assume("Mana Barrier uses 35% maximum mana, as the pinned primary template states; the exact 16.20 resource calculation is retained as evidence. No pre-duel damage or resource spending is invented.");
    kit.assume("Overdrive follows the pinned template's observed 2.9-second linear decay; the exact game file's MoveSpeedModMinTime is 2.5 seconds. The first simulation stat update retains the full initial bonus.");
    kit.assume("Rocket Grab uses its 1080-unit finite missile, 70-unit collision radius and first actual champion or damageable pet body, followed by the pinned 1115-unit center-range end check. Its one-dimensional rectangle has no lateral coordinate.");
    kit.assume("Power Fist's random lateral knockup displacement has no deterministic lane direction, so its one-second airborne uses zero lane displacement. Structures, plants and wards are unavailable duel bodies.");
    kit.assume("The allocator counts Overdrive's average attack-speed uptime, one queued Static Field bolt per second at most, and Mana Barrier shield per 90 seconds; actual fights resolve mana costs, R's passive downtime, health threshold, defenses and shield expiry.");
    kit.assume("Static Field queues one bolt per real connected on-hit, consuming one each second with no invented stack cap. Its 2% maximum-mana scaling follows both the primary text and executable PassiveDamage calculation; the unused 5% PassiveManaRatio data value is retained but not substituted.");
    const fistDamage: Effect = { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: fistAD, AP: fistAP } }, canCrit: true, label: e.name };
    const bolt: AbilitySpec = { key: "R-passive", name: "Static Field lightning", slot: "other", usable: () => false, activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "target", range: Number.POSITIVE_INFINITY }, flags: { petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: boltDamage, label: "Static Field lightning", noLifeSteal: true }], persistsAfterDeath: true };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: grabRange, travelRange: flightRange, width: grabWidth, speed: grabSpeed, radius: grabWidth / 2, collisionPet: true }, flags: { projectile: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage"), petDamageCategory: "singleTarget" }, { type: "cc", cc: "stun", duration: grabStun }], roles: ["damage", "cc", "engage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: overdriveAS }, duration: overdriveSeconds }, { type: "stat", stat: "moveSpeedPercent", amount: { base: overdriveMS }, duration: overdriveSeconds }], roles: ["buff", "engage", "escape"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, cooldownAfter: "empower", delivery: { kind: "self" }, onSelf: [{ type: "empower", attacks: 1, window: fistWindow, resetAttack: true, uncancellable: true, hitsUntargetable: true, spellShield: true, onHit: [fistDamage, { type: "displace", direction: "away", distance: 0, duration: fistAir }] }], roles: ["buff", "damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "aura", radius: r.field("effectRadius") }, flags: { petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: activeDamage, noLifeSteal: true, petDamageCategory: "area" }, { type: "cc", cc: "silence", duration: silence }], roles: ["damage", "cc"] },
      bolt,
    ];
    const qSpec = abilities[0]!, wSpec = abilities[1]!, eSpec = abilities[2]!, rSpec = abilities[3]!;
    const removeLock = (ctx: HookContext) => { ctx.self.statuses = ctx.self.statuses.filter(s => !(s.source === ctx.self.side && s.ability === "Q" && s.kind === "state" && (s.key === "noMovement" || s.key === "noAttacks"))); };
    const markKey = "blitzStatic";
    const addMark = (ctx: HookContext, pet?: Pet) => {
      if ((ctx.self.cooldownReady.R ?? 0) > ctx.tick || !ctx.enemy.alive) return;
      const target = ctx.enemy;
      const last = Number(target.memory[`${markKey}:${ctx.self.side}`] ?? (ctx.tick));
      const due = Math.max(ctx.tick, last) + ticks(boltInterval);
      target.memory[`${markKey}:${ctx.self.side}`] = due;
      if (pet) pet.memory = target.memory;
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: bolt.key, seenTick: ctx.tick, x: target.x, perTick: 0, homing: false, direction: directionTo(ctx.self, target), travelLeft: Number.POSITIVE_INFINITY, projectile: false, connects: false, scale: 1, onHit: bolt.onHit!, piercing: true, impactTick: due, expiresTick: due + 1, ...(pet ? { pet: pet.id } : {}) });
    };
    const behavior: Behavior = view => {
      const command = defaultBehavior(view);
      const { self, world, mode, enemy } = view;
      if (mode === "idle" || !self.alive) return command;
      if (self.memory.tradeDone) return command;
      if (mode === "flee") {
        if (canCast(world, self, wSpec)) return { kind: "cast", ability: "W" };
        return command?.kind === "cast" && command.ability === "R" ? { kind: "move", direction: -1 } : command;
      }
      if (mode === "hold" || mode === "trade") {
        if (command?.kind === "cast" && command.ability === "R") {
          if (canCast(world, self, eSpec) && inAttackRange(self, enemy)) return { kind: "cast", ability: "E" };
          if (canStartAttack(world, self)) return { kind: "attack" };
          return { kind: "move", direction: mode === "hold" ? 0 : 1 };
        }
        return command;
      }
      if (canCast(world, self, rSpec) && inReach(rSpec, self, enemy) && !self.action) return { kind: "cast", ability: "R" };
      return command;
    };
    return {
      abilities, behavior, attack: { onHitToPets: true, blockStopsOnHit: true },
      budget: {
        healing(self) { return shieldRatio * derive(self).maxResource / shieldCooldown; },
        damage(self, target) {
          const d = derive(self), haste = 1 + d.abilityHaste / 100;
          const wUptime = Math.min(1, overdriveSeconds * haste / wSpec.cooldown);
          const attackRate = Math.min(2.5, d.attackSpeed + self.spec.base.attackSpeed.ratio * overdriveAS * wUptime);
          return { physical: d.ad * (1 + d.critChance * (d.critDamage - 1)) * Math.max(0, attackRate - d.attackSpeed), magic: evaluate(boltDamage, self, target) * Math.min(attackRate, 1 / boltInterval) };
        },
      },
      hooks: {
        beforeDamageTaken(ctx) {
          if (ctx.tick < Number(ctx.memory.manaBarrierReady ?? 0)) return;
          const d = derive(ctx.self);
          const projected = absorbWithShields(ctx.amount, ctx.damageType, ctx.self.statuses.filter(s => s.kind === "shield").map(s => ({ amount: s.value, type: s.shieldType ?? "normal", endTick: s.endTick, ...(s.priority ? { priority: true } : {}) })));
          if (projected <= 0 || ctx.self.hp - projected > threshold * d.maxHp) return;
          ctx.apply({ type: "shield", amount: { base: shieldRatio * d.maxResource }, duration: shieldSeconds, firstDamageBypass: Math.max(0, ctx.self.hp - threshold * d.maxHp) }, true);
          ctx.memory.manaBarrierReady = ctx.tick + ticks(shieldCooldown);
        },
        onAttackHit(ctx) { addMark(ctx); },
        onAttackPetHit(ctx) { addMark(ctx, ctx.pet); },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "R" && ctx.enemy.spec.targetClass !== "monster") {
            ctx.enemy.statuses = ctx.enemy.statuses.filter(s => s.kind !== "shield");
            const pet = ctx.world.pets.find(p => p.id === ctx.enemy.petId);
            if (pet) pet.statuses = ctx.enemy.statuses;
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q" || !ctx.enemy.alive || ctx.enemy.hp <= 0) return;
          let destination = Number(ctx.memory.grabDestination ?? ctx.self.x);
          const origin = Number(ctx.memory.grabOrigin ?? ctx.self.x), direction = Number(ctx.memory.grabDirection ?? directionTo(ctx.self, ctx.enemy));
          const radius = ctx.enemy.spec.base.pathingRadius;
          for (const wall of ctx.world.terrain) {
            if (wall.endTick <= ctx.tick || (wall.enemyOnly && wall.owner === ctx.enemy.side)) continue;
            if (destination + radius > wall.from && destination - radius < wall.to) destination = direction > 0 ? Math.max(origin, wall.from - radius) : Math.min(origin, wall.to + radius);
          }
          const distance = Math.abs(ctx.enemy.x - destination), seconds = Math.max(1 / 30, distance / pullSpeed);
          applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "displace", direction: "toward", distance, duration: seconds, airborneDuration: Math.min(maxAirborne, seconds), over: true, originX: destination }, { ability: qSpec, scale: 1 });
          ctx.apply({ type: "state", state: "standardSight", duration: seconds });
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "Q") return;
          ctx.memory.grabOrigin = ctx.self.x; ctx.memory.grabDirection = directionTo(ctx.self, ctx.enemy);
          ctx.memory.grabDestination = ctx.self.x + Number(ctx.memory.grabDirection) * pullOffset;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.grabRelease = Number.POSITIVE_INFINITY;
            ctx.apply({ type: "state", state: "noMovement", duration: flightRange / grabSpeed + grabTail + 1 }, true);
            ctx.apply({ type: "state", state: "noAttacks", duration: flightRange / grabSpeed + grabTail + 1 }, true);
          }
          if (ctx.ability.key === "W") ctx.memory.overdriveStart = ctx.tick;
        },
        onMissileTick(ctx) {
          const missile = ctx.missile;
          if (missile.source !== bolt.key || ctx.tick < (missile.impactTick ?? Number.POSITIVE_INFINITY)) return;
          missile.ended = true;
          if (missile.pet !== undefined) {
            const pet = ctx.world.pets.find(p => p.id === missile.pet);
            if (pet) abilityHitPet(ctx.world, ctx.self, pet, bolt, bolt.onHit!, "singleTarget");
          } else abilityHit(ctx.world, ctx.self, ctx.enemy, bolt, bolt.onHit!);
        },
        onMissileContact(ctx) {
          if (ctx.missile.source === "Q") ctx.memory.grabRelease = ctx.tick + ticks(grabTail);
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "Q") return;
          if (!(ctx.missile.hitTargets?.length || ctx.missile.hitPets?.length) && ctx.reason === "range") {
            // The narrow terminal rectangle checks centers only and retains first-body ordering.
            const candidates: Array<{ x: number; unit?: Unit; pet?: Pet }> = [];
            const forward = (x: number) => ctx.missile.direction * (x - Number(ctx.memory.grabOrigin ?? ctx.self.x));
            if (ctx.missile.connects && ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && forward(ctx.enemy.x) >= flightRange && forward(ctx.enemy.x) <= grabRange) candidates.push({ x: ctx.enemy.x, unit: ctx.enemy });
            for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && forward(pet.x) >= flightRange && forward(pet.x) <= grabRange && !isUntargetable(petFormulaTarget(pet, ctx.self, ctx.tick), ctx.self)) candidates.push({ x: pet.x, pet });
            candidates.sort((a, b) => forward(a.x) - forward(b.x));
            const hit = candidates[0];
            if (hit?.unit) abilityHit(ctx.world, ctx.self, hit.unit, qSpec, qSpec.onHit!, ctx.missile.scale);
            else if (hit?.pet) abilityHitPet(ctx.world, ctx.self, hit.pet, qSpec, qSpec.onHit!, "singleTarget");
            if (hit) ctx.memory.grabRelease = ctx.tick + ticks(grabTail);
          }
          if (ctx.memory.grabRelease === Number.POSITIVE_INFINITY) { ctx.memory.grabRelease = ctx.tick; removeLock(ctx); }
        },
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory.grabRelease ?? Number.POSITIVE_INFINITY)) removeLock(ctx);
          const start = ctx.memory.overdriveStart;
          if (typeof start !== "number") return;
          const elapsed = ctx.tick - start;
          if (elapsed < ticks(overdriveSeconds)) {
            const value = Math.max(decayFloor, overdriveMS - (overdriveMS - decayFloor) * Math.max(0, elapsed - 1) / ticks(decaySeconds));
            const buff = ctx.self.statuses.find(s => s.kind === "stat" && s.key === "moveSpeedPercent" && s.source === ctx.self.side && s.memoKey === "W:moveSpeedPercent");
            if (buff) buff.value = value;
          } else {
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "cc", cc: "slow", duration: slowSeconds, strength: slow }, { ability: wSpec, scale: 1 });
            delete ctx.memory.overdriveStart;
          }
        },
      },
    };
  },
};
export default blitzcrank;
