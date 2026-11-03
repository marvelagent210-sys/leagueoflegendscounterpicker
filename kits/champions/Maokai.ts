/** Maokai: pinned primary wiki rules, actual sapling bodies and independent spell stages. */
import type { KitModule } from "../../engine/kits/compile";
import { skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, heal, hookContext, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { destroyPet, spawnPet } from "../../engine/sim/pets";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { seriesAt, ticks } from "./util";

const PASSIVE = "maokai:sap";
const SAPLING = "maokai-sapling";
const BURN = "maokai:attached";
const FLIGHT = "maokai:flight:";
const ROOT = "maokai:root:";
type Body = { target: Unit; pet?: Pet };

const maokai: KitModule = {
  champion: "Maokai",
  build(kit) {
    const p = kit.ability("Sap Magic"), q = kit.ability("Bramble Smash"), w = kit.ability("Twisted Advance"), e = kit.ability("Sapling Toss"), r = kit.ability("Nature's Grasp"), sapling = kit.pet("Sapling");
    const passiveCD = p.field("staticCooldown"), passiveHeal = p.at20(p.seriesIn("empowers his next basic attack"), "Sap Magic healing") / 100;
    const passiveThreshold = p.quoted("will not trigger if he is above 95% maximum health") / 100;
    const passiveDelay = p.quoted("after a 0.25-second delay");
    const passiveRefund = p.quoted("cooldown is reduced by 4 seconds"), monsterRefund = p.quoted("modified to 1.5 if he is hit by a large monster's basic attack or ability");
    p.quote("does not occur if Maokai begins his attack windup before its cooldown has elapsed");
    p.quote("It will occur if it is blocked"); p.quote("The empowered attack will not trigger against structures nor wards");
    p.quote("If Maokai possesses a spell shield and it consumes an enemy ability, he will still receive the cooldown reduction");
    p.quote("The striking ability has to trigger spell effects");
    const qDamage = q.formula("Magic Damage"), qMonster = q.number("Bonus Monster Damage"), qCap = q.quoted("health ratio is capped at 9999 against non-champions");
    const qRange = q.field("targetRange"), qRadius = q.field("effectRadius"), qSpeed = q.field("speed");
    const qSlow = q.quoted("slows them by 99% for 0.25 seconds") / 100, qSlowTime = q.quoted("slows them by 99% for 0.25 seconds", 1);
    const qStun = q.quoted("stunned for 0.5 seconds"), qPush = q.quoted("knocked back up to 300 units");
    const qLock = q.quoted("locked out from the cast time for another 0.075 seconds");
    q.quote("Displacement immunity will also resist the application of the stun");
    const qMissilePath = "Characters/Maokai/Spells/MaokaiQAbility/MaokaiQMissile";
    const qHalfWidth = q.gameQuoted("mSpell.mMissileSpec.mMissileWidth: 110", 0, qMissilePath);
    const pushSpeed = q.gameQuoted('"name":"KnockbackSpeed","values":[950.0,950.0,950.0,950.0,950.0,950.0,950.0]');
    const wRange = w.field("targetRange"), wSpeed = w.field("speed"), wDamage = w.formula("Magic Damage"), wRoot = w.number("Root Duration");
    const wTrack = w.quoted("moves beyond 2000 units");
    w.quote("Maokai will track the target if they change locations"); w.quote("will fail to deal damage and apply the root if the target is untargetable upon arrival");
    const eRange = e.field("targetRange"), eRadius = e.field("effectRadius", "explosion"), eDetect = e.field("effectRadius", "detection");
    const eLife = e.quoted("remains stationary for 30 seconds"), eChase = e.quoted("chasing them for up to 2.5 seconds");
    const eBrushLife = e.quoted("lasts 30 (+ 1.5% bonus health) seconds", 1) / 100;
    const eSlow = e.quoted("slowing them by 45% for 2 seconds") / 100, eSlowTime = e.quoted("slowing them by 45% for 2 seconds", 1);
    const eSlowBonus = e.quoted("45% (+ 1% per 100 bonus health) (+ 1% per 100 AP)", 1) / (100 * e.quoted("45% (+ 1% per 100 bonus health) (+ 1% per 100 AP)", 2));
    const eReveal = e.quoted("reveal them for 3 seconds"), eGap = e.quoted("every 0.75 seconds"), eBurnTime = e.quoted("attaches two Saplings to them for 1.5 seconds");
    e.quote("Targets can only be attached by two Saplings at a time"); e.quote("subsequent empowered Sapling explosions on a target will refresh the duration and only attach a Sapling if one has exploded on them already");
    const eStacks = Math.round(eBurnTime / eGap);
    const eDamage = e.formula("Magic Damage"), ePacket = e.formula("Magic Damage per Instance");
    // 26.21 gives no minion row: only non-minions take the empowered explosion's reduced share, so minions take its ordinary damage.
    e.quote("Against non-minion targets, the explosion deals 66.7% damage");
    const eMinion = eDamage;
    e.formula("Total Attached Sapling Damage"); e.formula("Non-Minion Total Magic Damage");
    const eCap = e.quoted("capped at 300 against non-champions"), eBrushCap = e.quoted("The total damage cap is increased to 600 against non-champions");
    const eFlightPath = "Characters/Maokai/Spells/MaokaiEAbility/MaokaiEMissile";
    const eFlight = e.gameQuoted("mSpell.mMissileSpec.movementComponent.mTravelTime: 0.8500000238418579", 0, eFlightPath);
    const eArm = e.gameQuoted('"name":"GrowthDuration","values":[0.5,0.5,0.5,0.5,0.5,0.5,0.5]');
    e.gameQuote('"name":"SaplingDetectionRadius","values":[550.0,550.0,550.0,550.0,550.0,550.0,550.0]');
    e.gameQuote('"name":"EmpoweredDoTDuration","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');
    e.quote("The Saplings will continue to chase their target even if they lose sight of them");
    e.quote("Saplings cannot be stacked on top of each other");
    e.quote("Sapling Toss's cast does not initially fling the actual Sapling unit");
    sapling.quote("Minion (untargetable)"); sapling.quote("untargetable and invulnerable"); sapling.quote("double damage to non-minions struck by them over 1.5 seconds");
    const eMove = sapling.stat("movespeed");
    const rDamage = r.formula("Magic Damage"), rRange = r.field("targetRange"), rHalfWidth = r.field("width") / 2;
    const rRoot = r.seriesIn("Each bramble deals magic damage"), rMove = r.fraction("Bonus Movement Speed"), rMoveTime = r.quoted("decaying over 2 seconds");
    r.quote("wall of five thorny brambles"); r.quote("each stopping when they collide with an enemy champion");
    const rTrails = r.quoted("made up of 4 missiles each"), rTrailGap = r.quoted("trail 100 units behind one another");
    const rPath = "Characters/Maokai/Spells/MaokaiRAbility/MaokaiRMis";
    const rInitial = r.gameQuoted("mSpell.mMissileSpec.movementComponent.mInitialSpeed: 100", 0, rPath);
    const rAcceleration = r.gameQuoted("mSpell.mMissileSpec.movementComponent.mAcceleration: 300", 0, rPath);
    const rMax = r.gameQuoted("mSpell.mMissileSpec.movementComponent.mMaxSpeed: 750", 0, rPath);
    kit.assume("Sap Magic starts ready with zero stored stacks. The source's level-20 series gives 14.1% maximum-health healing and an 18.8235294117647-second static cooldown. Readiness is captured at basic-attack declaration; its sourced 0.25-second delay is its attack-speed-scaled windup, and a connected blocked attack can heal. Wards, structures and unclassified pet targets do not qualify. Large versus epic monsters cannot be distinguished by the arena's monster class, so large-monster refunds and epic-monster Sapling refunds are omitted rather than assigned to every monster.");
    kit.assume("Bramble Smash deals one damage packet per body across its nearby circle and traveling shockwave. Its nearby control applies in every direction, independently of projectile interception. The source specifies up to 300 knockback by proximity without a curve: the model linearly reduces 300 to zero over the sourced 325 center-radius. Champion and actual-pet pushes travel independently at the binary's 950 speed. Primary 600 range and 300 knockback override binary 650/400; a separate 0.075-second action lock follows the primary 0.3 cast.");
    kit.assume("Twisted Advance tracks its actual target at 1300 speed while untargetable, updating its endpoint each tick. The primary instant cast overrides the binary's 0.25 cast. A relocation over the source's estimated 2000 limit releases the chase toward the previous position without damage/root. Knockdown, displacement, death and resurrection release its untargetability; an untargetable arrival receives no packet.");
    kit.assume("Sapling Toss begins without pre-duel saplings. A real finite projectile flies for the exact binary 0.8500000238418579 seconds, then creates an untargetable invulnerable minion pet, with 0.5-second GrowthDuration arming. The arena brush flag describes actual brush availability at landing, not Maokai's buffs or starting position; when true every legal placement in this abstract lane is in brush. The arena has no individual bush coordinates. Saplings use a point body because no pet collision radius or HP is provided; HP 1 is an invulnerable bookkeeping value. Same-point placements shift by one detection radius toward the owner, a disclosed spacing rule because the source gives no exact offset. The normal owner-death pet cleanup remains; these sources do not grant a persistence exception.");
    kit.assume("Primary E detection radius 250 and empowered duration 1.5 seconds override binary SaplingDetectionRadius 550 and EmpoweredDoTDuration 2. The full raw primary explicitly uses 50*2/3 and corresponding ratios for each empowered packet; the pet article's 'double damage over 1.5 seconds' specifies the same total without its three-packet distribution. The parsed 66.7% formula is retained unchanged: one impact and two attached packets on non-minions, normal impact only on minions. Per-body attached slots cap at two and refresh their common expiry without replacing pending ticks; the next missing slot is refilled. The 300/600 non-champion caps apply before area resistance. Existing attached packets persist through untargetability but ordinary death/resurrection clears them. Burn packets retain the explosion's owner-stat snapshot.");
    kit.assume("Nature's Grasp represents the central one of five lateral brambles, with its four sourced missiles spaced 100 apart and accelerating continuously from 100 at 300 units/s² to 750. Four lateral brambles are omitted: source-bound lateral offsets are unavailable, so they are not superimposed into five damage hits. The central branch hits each actual body once; its first actual champion-class contact destroys its remaining missiles even when a spell shield or parry blocks effects. Projectile destruction removes only the intercepted missile, retaining the sourced invisible-trailer counterplay. Root duration uses that missile's actual traveled distance, interpolated on the pinned distance series. Successful champion contact grants a linearly decaying two-second movement buff; already-released missiles continue after owner death, while cast interruption prevents unreleased packets.");

    const reducePassive = (self: Unit, tick: number, seconds = passiveRefund) => { self.memory[PASSIVE] = Math.max(tick, Number(self.memory[PASSIVE] ?? tick) - ticks(seconds)); };
    const contacts = (world: World, self: Unit): Body[] => [
      { target: world.units[1 - self.side]! },
      ...world.pets.filter(pet => pet.owner !== self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet })),
    ];
    const bodyKey = (target: Unit) => target.petId === undefined ? `champion:${target.side}` : `pet:${target.petId}`;
    const isChampion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion";
    const isMinion = (target: Unit) => target.petId !== undefined && target.spec.targetClass === "minion";
    const hit = (ctx: HookContext, body: Body, spell: AbilitySpec, effects = spell.onHit ?? [], originX?: number) => {
      if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, spell, effects, "area", 1, originX);
      else abilityHit(ctx.world, ctx.self, body.target, spell, effects, 1, originX);
    };
    const passiveAttack = (ctx: HookContext & { attack: { attackTag?: string } }) => {
      if (ctx.attack.attackTag !== PASSIVE || !ctx.self.alive || ctx.self.resurrection || ctx.self.hp > passiveThreshold * derive(ctx.self).maxHp) return;
      ctx.memory[PASSIVE] = ctx.tick + ticks(passiveCD);
      ctx.self.attackReadyTick = ctx.tick;
      heal(ctx.world, ctx.self, derive(ctx.self).maxHp * passiveHeal);
    };
    const qPacket: Effect[] = [{ type: "damage", damageType: "magic", amount: qDamage, label: q.name, amountFor: (self, target) => {
      const base = qDamage.base + (qDamage.ratios?.AP ?? 0) * derive(self).ap;
      return base + Math.min((qDamage.ratios?.targetMaxHP ?? 0) * derive(target).maxHp, isChampion(target) ? Infinity : qCap) + (target.petId !== undefined && target.spec.targetClass === "monster" ? qMonster : 0);
    } }, { type: "cc", cc: "slow", duration: qSlowTime, strength: qSlow }];
    const contactFlags = { spellShield: true, petContactHooks: true };
    const qCircle: AbilitySpec = { key: "Q-near", name: q.name, slot: "Q", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: contactFlags, onHit: qPacket, usable: () => false };
    const explosion: AbilitySpec = { key: "E-explosion", name: e.name, slot: "E", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: contactFlags, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], usable: () => false };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: "start", delivery: { kind: "self" }, onHit: qPacket, roles: ["damage", "cc"], flags: { ...contactFlags, projectile: true }, usable: (self, world) => world.tick >= Number(self.memory["maokai:lock"] ?? 0) && (Math.abs(world.units[1 - self.side]!.x - self.x) <= qRange + world.units[1 - self.side]!.spec.base.radius || contacts(world, self).some(body => body.pet && Math.abs(body.target.x - self.x) <= qRadius + body.target.spec.base.radius)) },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "dash", direction: "target", distance: wRange, speed: wSpeed, hitRadius: 0 }, flags: { ...contactFlags, grounded: true, knockdown: true }, roles: ["damage", "cc", "engage"], onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "root", duration: wRoot }], usable: (self, world) => world.tick >= Number(self.memory["maokai:lock"] ?? 0) && canTarget(world.units[1 - self.side]!, self) && Math.abs(world.units[1 - self.side]!.x - self.x) <= wRange },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, flags: { projectile: true }, roles: ["damage"], estimate: (self, target) => evaluate(eDamage, self, target), usable: (self, world) => world.tick >= Number(self.memory["maokai:lock"] ?? 0) && Math.abs(world.units[1 - self.side]!.x - self.x) <= eRange + world.units[1 - self.side]!.spec.base.radius },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, flags: { ...contactFlags, projectile: true }, persistsAfterDeath: true, roles: ["damage", "cc"], onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "root", duration: seriesAt(rRoot, 0, true) }], usable: (self, world) => world.tick >= Number(self.memory["maokai:lock"] ?? 0) && Math.abs(world.units[1 - self.side]!.x - self.x) <= rRange },
      qCircle, explosion,
    ];
    const saplingSpec: PetSpec = { kind: SAPLING, name: sapling.name, targetClass: "minion", hp: 1, armor: 0, mr: 0, radius: 0, moveSpeed: 0, duration: eLife, untargetable: true };
    const attachBurn = (ctx: HookContext, target: Unit, perHit: number) => {
      const memory = target.memory, key = `${BURN}:${ctx.self.side}`;
      // A marker supplies ordinary hostile-debuff death/resurrection cleanup.
      const marked = target.statuses.some(status => status.key === key && status.source === ctx.self.side && status.endTick > ctx.tick);
      if (!marked) { delete memory[`${key}:a`]; delete memory[`${key}:b`]; }
      const until = ctx.tick + ticks(eBurnTime);
      applyEffect(ctx.world, ctx.self, target, { type: "mark", key, duration: (ticks(eBurnTime) + 1) / 30 }, { scale: 1, ability: explosion });
      for (const slot of ["a", "b"].slice(0, eStacks)) {
        if (typeof memory[`${key}:${slot}`] !== "number") { memory[`${key}:${slot}`] = ctx.tick + ticks(eGap * (slot === "a" ? 1 : 2)); memory[`${key}:${slot}:damage`] = perHit; }
      }
      memory[`${key}:until`] = until;
      if (target.petId !== undefined) { const pet = ctx.world.pets.find(pet => pet.id === target.petId); if (pet) pet.memory = memory; }
    };
    const explode = (ctx: HookContext, pet: Pet) => {
      ctx.memory["maokai:exploding"] = pet.id;
      ctx.memory["maokai:explosionRefund"] = false;
      for (const body of contacts(ctx.world, ctx.self)) if (Math.abs(body.target.x - pet.x) <= eRadius + body.target.spec.base.radius) hit(ctx, body, explosion, explosion.onHit ?? [], pet.x);
      delete ctx.memory["maokai:exploding"];
      destroyPet(ctx.world, pet);
    };
    const land = (ctx: HookContext, missile: Missile) => {
      const prefix = `${FLIGHT}${missile.id}:`, brush = ctx.world.settings.environment.brush;
      let x = Number(ctx.memory[`${prefix}to`]);
      for (const own of ctx.world.pets.filter(pet => pet.owner === ctx.self.side && pet.spec.kind === SAPLING)) if (Math.abs(own.x - x) < 1e-6) x -= missile.direction * eDetect;
      const life = eLife + (brush ? eBrushLife * (derive(ctx.self).maxHp - ctx.self.spec.base.hp) : 0);
      const pet = spawnPet(ctx.world, ctx.self, { ...saplingSpec, duration: life }, x);
      pet.memory.brush = brush; pet.memory.armed = ctx.tick + ticks(eArm); pet.memory.phase = "arming";
      pet.statuses!.push({ kind: "state", key: "invulnerable", source: ctx.self.side, startTick: ctx.tick, endTick: pet.endTick, value: 0 });
      for (const key of Object.keys(ctx.memory)) if (key.startsWith(prefix)) delete ctx.memory[key];
    };
    const rootTravel = (distance: number) => { const rampTime = (rMax - rInitial) / rAcceleration, rampDistance = rInitial * rampTime + rAcceleration * rampTime * rampTime / 2; return distance <= rampDistance ? (Math.sqrt(rInitial * rInitial + 2 * rAcceleration * distance) - rInitial) / rAcceleration : rampTime + (distance - rampDistance) / rMax; };
    const launchRoot = (ctx: HookContext, direction: 1 | -1) => {
      const group = ctx.world.nextId++, prefix = `${ROOT}${group}:`;
      ctx.memory[`${prefix}origin`] = ctx.self.x;
      for (let index = 0; index < rTrails; index++) {
        const id = ctx.world.nextId++;
        ctx.memory[`${ROOT}missile:${id}`] = group;
        ctx.world.missiles.push({ id, owner: ctx.self.side, source: "R", seenTick: ctx.tick, x: ctx.self.x - direction * rTrailGap * index, perTick: rInitial / 30, acceleration: { perTick: rAcceleration / 900, maxPerTick: rMax / 30 }, piercing: true, hitTargets: [], hitPets: [], collisionPet: true, radius: rHalfWidth, homing: false, direction, travelLeft: rRange, projectile: true, connects: true, scale: skillshotChance(ctx.world, ctx.enemy, ctx.tick, rootTravel(Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius - rHalfWidth)), rHalfWidth), onHit: abilities[3]!.onHit ?? [] });
      }
    };
    return {
      abilities,
      attack: { onHitToPets: true },
      behavior(view) {
        const command = defaultBehavior(view);
        if (command?.kind === "cast" && command.ability === "R" && view.mode !== "fight") {
          const shadow = { ...view.self, cooldownReady: { ...view.self.cooldownReady, R: Infinity } };
          return defaultBehavior({ ...view, self: shadow });
        }
        return command;
      },
      hooks: {
        onStart(ctx) { ctx.memory[PASSIVE] = 0; ctx.memory["maokai:sapStacks"] = 0; },
        onAttack(ctx) {
          const qualifies = !ctx.targetPet || ["minion", "monster", "champion"].includes(ctx.targetPet.spec.targetClass ?? "");
          if (!qualifies || ctx.tick < Number(ctx.memory[PASSIVE] ?? 0) || ctx.self.hp > passiveThreshold * derive(ctx.self).maxHp) return;
          ctx.action.attackTag = PASSIVE; ctx.action.uncancellable = true;
          ctx.action.launchTick = ctx.tick + ticks(passiveDelay / Math.max(derive(ctx.self).attackSpeed, 1e-6));
        },
        onAttackHit: passiveAttack,
        onAttackPetHit: passiveAttack,
        onSpellShieldBlock(ctx) { if (ctx.ability) reducePassive(ctx.self, ctx.tick); },
        onDamageObserved(ctx) {
          if (ctx.target !== ctx.self || ctx.source.side === ctx.self.side || ctx.attack || !ctx.ability || !(ctx.amount + ctx.absorbed > 0)) return;
          const source = ctx.world.units[ctx.source.side];
          if (!source.spec.abilities.some(spell => spell.key === ctx.ability || spell.name === ctx.ability)) return;
          const stamp = `${ctx.source.petId === undefined ? "champion" : `pet:${ctx.source.petId}`}:${ctx.ability}:${ctx.tick}`;
          if (ctx.memory["maokai:lastSpell"] !== stamp) { reducePassive(ctx.self, ctx.tick); ctx.memory["maokai:lastSpell"] = stamp; }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") ctx.memory["maokai:qDirection"] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1);
          if (ctx.ability.key === "R") launchRoot(ctx, (directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1)) as 1 | -1);
        },
        onCast(ctx) {
          if (["Q", "W", "E", "R"].includes(ctx.ability.key)) reducePassive(ctx.self, ctx.tick);
          if (ctx.ability.key === "Q") {
            ctx.memory["maokai:lock"] = ctx.tick + ticks(qLock);
            const seen = ctx.self.action?.kind === "cast" ? ctx.self.action.startTick : ctx.tick;
            const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Q", seenTick: seen, x: ctx.self.x, perTick: qSpeed / 30, piercing: true, collisionPet: true, radius: qHalfWidth, homing: false, direction: Number(ctx.memory["maokai:qDirection"] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1, travelLeft: qRange, projectile: true, connects: true, scale: skillshotChance(ctx.world, ctx.enemy, seen, Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - qHalfWidth - ctx.enemy.spec.base.radius) / qSpeed, qHalfWidth), hitTargets: [], hitPets: [], onHit: qPacket };
            for (const body of contacts(ctx.world, ctx.self)) if (Math.abs(body.target.x - ctx.self.x) <= qRadius + body.target.spec.base.radius) {
              if (body.pet) missile.hitPets!.push(body.pet.id); else missile.hitTargets!.push(body.target.side);
              hit(ctx, body, qCircle);
            }
            ctx.world.missiles.push(missile);
          }
          if (ctx.ability.key === "W") {
            ctx.memory["maokai:wLast"] = ctx.enemy.x;
            ctx.memory["maokai:wValid"] = true;
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "untargetable", duration: wTrack / wSpeed }, { scale: 1, ability: ctx.ability });
          }
          if (ctx.ability.key === "E") {
            const direction = (directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1)) as 1 | -1;
            const distance = Math.max(0, Math.min(eRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            const id = ctx.world.nextId++, prefix = `${FLIGHT}${id}:`;
            ctx.memory[`${prefix}from`] = ctx.self.x; ctx.memory[`${prefix}to`] = ctx.self.x + direction * distance; ctx.memory[`${prefix}start`] = ctx.tick;
            ctx.world.missiles.push({ id, owner: ctx.self.side, source: "E", interceptable: true, seenTick: ctx.tick, x: ctx.self.x, perTick: 0, piercing: true, homing: false, direction, travelLeft: 1, projectile: true, connects: false, scale: 1, onHit: [], impactTick: ctx.tick + ticks(eFlight) });
          }
        },
        onDashTick(ctx) {
          if (ctx.ability.key !== "W") return;
          const previous = Number(ctx.memory["maokai:wLast"] ?? ctx.enemy.x);
          if (ctx.memory["maokai:wValid"] && Math.abs(ctx.enemy.x - ctx.self.x) > wTrack) ctx.memory["maokai:wValid"] = false;
          if (ctx.memory["maokai:wValid"]) ctx.memory["maokai:wLast"] = ctx.enemy.x;
          const target = ctx.memory["maokai:wValid"] ? ctx.enemy.x : previous;
          const delta = target - ctx.self.x, direction = delta === 0 ? directionTo(ctx.self, ctx.enemy) : Math.sign(delta);
          const gap = Math.max(0, Math.abs(delta) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
          ctx.action.perTick = direction * Math.min(wSpeed / 30, gap);
          ctx.action.endTick = gap <= wSpeed / 30 ? ctx.tick : ctx.tick + 1;
          ctx.action.stopAtContact = Boolean(ctx.memory["maokai:wValid"]);
          const veil = ctx.self.statuses.find(status => status.ability === "W" && status.key === "untargetable" && status.source === ctx.self.side);
          if (veil) veil.endTick = ctx.tick + 2;
        },
        onDashEnd(ctx) { if (ctx.ability.key === "W") { ctx.self.statuses = ctx.self.statuses.filter(status => !(status.ability === "W" && status.key === "untargetable" && status.source === ctx.self.side)); delete ctx.memory["maokai:wValid"]; } },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && ctx.memory["maokai:wValid"] === false) return [];
          if (ctx.ability.key === "R") {
            const group = Number(ctx.memory["maokai:activeRoot"]), prefix = `${ROOT}${group}:`;
            if (ctx.memory[`${prefix}hit:${bodyKey(ctx.enemy)}`]) return [];
            return [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "root", duration: seriesAt(rRoot, Number(ctx.memory["maokai:rootDistance"] ?? 0), true) }];
          }
          if (ctx.ability.key !== explosion.key) return;
          const pet = ctx.world.pets.find(pet => pet.id === ctx.memory["maokai:exploding"]);
          if (!pet) return [];
          const brush = Boolean(pet.memory.brush), minion = isMinion(ctx.enemy), formula = brush && !minion ? ePacket : minion ? eMinion : eDamage;
          let damage = evaluate(formula, ctx.self, ctx.enemy);
          if (!isChampion(ctx.enemy)) damage = Math.min(damage, brush && !minion ? eBrushCap / (eStacks + 1) : eCap);
          const slow = eSlow + (brush ? eSlowBonus * ((derive(ctx.self).maxHp - ctx.self.spec.base.hp) + derive(ctx.self).ap) : 0);
          return [{ type: "damage", damageType: "magic", amount: { base: damage }, label: e.name }, { type: "cc", cc: "slow", duration: eSlowTime, strength: slow }, ...(brush ? [{ type: "state" as const, state: "standardSight" as const, duration: eReveal }] : [])];
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key === qCircle.key && !hasState(ctx.enemy, "displacementImmune")) {
            const distance = qPush * Math.max(0, 1 - Math.abs(ctx.enemy.x - ctx.self.x) / qRadius);
            if (distance > 0) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "displace", direction: "away", distance, duration: distance / pushSpeed }, { scale: 1, ability: qCircle });
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "cc", cc: "stun", duration: qStun }, { scale: 1, ability: qCircle });
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R" && isChampion(ctx.enemy)) ctx.memory["maokai:hasteUntil"] = ctx.tick + ticks(rMoveTime);
          if (ctx.ability.key !== explosion.key) return;
          const pet = ctx.world.pets.find(pet => pet.id === ctx.memory["maokai:exploding"]);
          if (!pet) return;
          if (isChampion(ctx.enemy) && !ctx.memory["maokai:explosionRefund"]) { reducePassive(ctx.self, ctx.tick); ctx.memory["maokai:explosionRefund"] = true; }
          if (pet.memory.brush && !isMinion(ctx.enemy) && !hasState(ctx.enemy, "invulnerable")) {
            const damage = evaluate(ePacket, ctx.self, ctx.enemy);
            attachBurn(ctx, ctx.enemy, isChampion(ctx.enemy) ? damage : Math.min(damage, eBrushCap / (eStacks + 1)));
          }
        },
        onMissileTick(ctx) {
          if (ctx.missile.source === "R") {
            ctx.memory["maokai:activeRoot"] = Number(ctx.memory[`${ROOT}missile:${ctx.missile.id}`]);
            ctx.memory["maokai:rootDistance"] = rRange - ctx.missile.travelLeft;
          }
          if (ctx.missile.source !== "E") return;
          const missile = ctx.missile, prefix = `${FLIGHT}${missile.id}:`;
          if (!ctx.self.alive || ctx.self.hp <= 0) { missile.ended = true; return; }
          const from = Number(ctx.memory[`${prefix}from`]), to = Number(ctx.memory[`${prefix}to`]), start = Number(ctx.memory[`${prefix}start`]);
          const x = from + (to - from) * Math.min(1, (ctx.tick - start) / (eFlight * 30));
          if (interceptProjectile(ctx.world, missile, missile.x, x)) return;
          if (projectileBlockPoint(ctx.world, ctx.self.side, missile.x, x) !== undefined) { missile.ended = true; return; }
          missile.x = x;
          if (ctx.tick >= start + ticks(eFlight)) { missile.ended = true; land(ctx, missile); }
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "E" || ctx.reason !== "range" && ctx.reason !== "intercepted") return;
          const prefix = `${FLIGHT}${ctx.missile.id}:`;
          if (ctx.memory[`${prefix}to`] === undefined) return;
          ctx.memory[`${prefix}to`] = ctx.missile.x;
          land(ctx, ctx.missile);
        },
        onMissileMove(ctx) { if (ctx.missile.source === "R") ctx.memory["maokai:rootDistance"] = rRange - ctx.missile.travelLeft; },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "R") return;
          const group = Number(ctx.memory[`${ROOT}missile:${ctx.missile.id}`]), prefix = `${ROOT}${group}:`;
          ctx.memory[`${prefix}hit:${bodyKey(ctx.enemy)}`] = true;
          if (isChampion(ctx.enemy)) for (const missile of ctx.world.missiles) if (ctx.memory[`${ROOT}missile:${missile.id}`] === group) missile.ended = true;
        },
        onLethal(ctx) {
          for (const pet of [...ctx.world.pets]) if (pet.owner === ctx.self.side && pet.spec.kind === SAPLING) destroyPet(ctx.world, pet);
          ctx.world.missiles = ctx.world.missiles.filter(missile => !(missile.owner === ctx.self.side && missile.source === "E"));
          ctx.self.statuses = ctx.self.statuses.filter(status => !(status.ability === "W" && status.key === "untargetable"));
          return false;
        },
        onTargetResurrection(ctx) {
          for (const key of Object.keys(ctx.target.memory)) if (key.startsWith(`${BURN}:${ctx.self.side}`)) delete ctx.target.memory[key];
        },
        onTick(ctx) {
          const hasteUntil = Number(ctx.memory["maokai:hasteUntil"] ?? 0);
          ctx.buff("maokai:rHaste", "moveSpeedPercent", ctx.self.resurrection ? 0 : rMove * Math.max(0, (hasteUntil - ctx.tick) / ticks(rMoveTime)), 2 / 30);
          if (ctx.self.resurrection) { ctx.self.statuses = ctx.self.statuses.filter(status => !(status.ability === "W" && status.key === "untargetable")); }
          for (const pet of [...ctx.world.pets]) {
            if (pet.owner !== ctx.self.side || pet.spec.kind !== SAPLING) continue;
            if (pet.endTick <= ctx.tick) { explode(ctx, pet); continue; }
            if (ctx.tick < Number(pet.memory.armed)) continue;
            if (pet.memory.phase === "arming") pet.memory.phase = "waiting";
            let target: Unit | undefined;
            if (pet.memory.phase === "waiting") {
              const nearby = contacts(ctx.world, ctx.self).filter(body => canTarget(body.target, ctx.self) && Math.abs(body.target.x - pet.x) <= eDetect + body.target.spec.base.radius).sort((a, b) => Math.abs(a.target.x - pet.x) - Math.abs(b.target.x - pet.x) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
              const first = nearby[0];
              if (first) { pet.memory.phase = "chasing"; pet.memory.target = first.pet ? `pet:${first.pet.id}` : `champion:${first.target.side}`; pet.memory.chaseUntil = ctx.tick + ticks(eChase); target = first.target; }
            } else target = contacts(ctx.world, ctx.self).find(body => bodyKey(body.target) === pet.memory.target)?.target;
            if (pet.memory.phase !== "chasing") continue;
            if (ctx.tick >= Number(pet.memory.chaseUntil) || !target || !target.alive) { explode(ctx, pet); continue; }
            const delta = target.x - pet.x;
            pet.x += Math.sign(delta) * Math.min(Math.abs(delta), eMove / 30);
            const contact = contacts(ctx.world, ctx.self).some(body => !inStasis(body.target) && !isUntargetable(body.target, ctx.self) && Math.abs(body.target.x - pet.x) <= body.target.spec.base.radius);
            if (contact) explode(ctx, pet);
          }
          const key = `${BURN}:${ctx.self.side}`;
          for (const body of contacts(ctx.world, ctx.self)) {
            const memory = body.pet?.memory ?? body.target.memory, statuses = body.pet?.statuses ?? body.target.statuses;
            const marked = statuses.some(status => status.key === key && status.source === ctx.self.side && status.endTick >= ctx.tick);
            if (!marked || body.target.resurrection || !body.target.alive) { for (const name of Object.keys(memory)) if (name.startsWith(key)) delete memory[name]; continue; }
            for (const slot of ["a", "b"].slice(0, eStacks)) {
              const at = memory[`${key}:${slot}`];
              if (typeof at !== "number" || ctx.tick < at || ctx.tick > Number(memory[`${key}:until`])) continue;
              delete memory[`${key}:${slot}`];
              const effect: Effect = { type: "damage", damageType: "magic", amount: { base: Number(memory[`${key}:${slot}:damage`]) }, persistent: true, label: e.name };
              if (body.pet) applyEffect(ctx.world, ctx.self, petFormulaTarget(body.pet, ctx.self, ctx.tick), effect, { scale: 1, ability: explosion });
              else applyEffect(ctx.world, ctx.self, body.target, effect, { scale: 1, ability: explosion });
            }
          }
        },
      },
    };
  },
};
export default maokai;
