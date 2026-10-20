/** Smolder: finite flight, independently stacked burns and actual once-per-cast Q target identities. */
import type { AbilityData } from "../../engine/kits/context";
import type { KitModule } from "../../engine/kits/compile";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { EPSILON, attackRange, attackTiming, canCast, missileArrivalTicks, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { exitTerrain } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { flat, scaled, ticks } from "./util";

const STACKS = "smolder:practice", FLIGHT = "smolder:flight", BURN = "smolder:burn";
const identity = (unit: Unit) => unit.petId === undefined ? `champion:${unit.side}` : `pet:${unit.petId}`;
interface QCast { serial: number; stacks: number; hit: string[]; direction: 1 | -1 }
function game(ability: AbilityData, object: string, field: string): unknown {
  const text = ability.record.gameSources?.find((s) => s.object === object)?.text.find((s) => s.startsWith(`mSpell.${field}: `));
  if (!text) throw new Error(`Smolder: missing pinned ${object} ${field}`);
  ability.gameQuote(text, object);
  return JSON.parse(text.slice(text.indexOf(":") + 1));
}
function values(ability: AbilityData, object: string): (name: string) => number {
  const data = game(ability, object, "DataValues") as Array<{ name: string; values: number[] }>;
  return (name) => { const number = data.find((entry) => entry.name === name)?.values[0]; if (number === undefined) throw new Error(`Smolder: missing pinned ${name}`); return Number(number.toPrecision(7)); };
}

const smolder: KitModule = {
  champion: "Smolder",
  options: { dragonPractice: { label: "Dragon Practice stacks collected before the duel", default: 225 } },
  build(kit, options) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    p.quote("each time he hits an enemy champion with an ability"); p.quote("whenever Super Scorcher Breath kills a minion or monster"); p.quote("Achooo! can only grant a stack"); p.quote("Flap, Flap, Flap can only grant one stack"); p.quote("target dies while the initial missile is in flight");
    const pv = values(p, "Characters/Smolder/Spells/SmolderPAbility/SmolderP"), stackQ = pv("QDamagePerStack"), stackW = pv("WDamagePerStack"), stackE = pv("EDamagePerStack"), stackQCrit = pv("QCritRatio");
    const passiveCalc = game(p, "Characters/Smolder/Spells/SmolderPAbility/SmolderP", "mSpellCalculations") as { EBonusDamage: { mMultiplier: { mSubparts: Array<{ mPart1?: { mCoefficient: number } }> } } };
    const stackECrit = passiveCalc.EBonusDamage.mMultiplier.mSubparts[1]!.mPart1!.mCoefficient;
    const attackData = game(p, "Characters/Smolder/Spells/SmolderBasicAttack", "mMissileSpec") as { movementComponent: { mSpeed: number } };
    const qDamage = q.formula("Physical Damage"), qRange = q.field("targetRange"), qSpeed = q.field("speed", "Fireball"), qSplash = q.field("effectRadius", "Tier 1"), qExtraRadius = q.field("effectRadius", "Tier 2"), qExtraRange = q.field("range"), qExtraSpeed = q.field("speed", "Tier 2");
    q.fieldNumbers("castTime");
    const qv = values(q, "Characters/Smolder/Spells/SmolderQAbility/SmolderQ"), tier1 = qv("StackTier1"), tier2 = qv("StackTier2"), tier3 = qv("StackTier3"), qCrit = qv("CritRatio"), qLifeSteal = qv("LifestealMod"), qRefund = qv("ManaRestore"), burnSeconds = qv("Tier3_DotLength"), executeShare = qv("Tier3_ExecuteThresholdStart") / 100, extraShare = qv("Tier2_BlowbackPercentageDamage") / 100;
    const extraRadius = (game(q, "Characters/Smolder/Spells/SmolderQAbility/SmolderQ2BlowbackMissileA", "mMissileSpec") as { mMissileWidth: number }).mMissileWidth;
    game(q, "Characters/Smolder/Spells/SmolderQAbility/SmolderQ", "mSpellCalculations");
    const burnAD = q.quoted("2.5% per 100 bonus AD") / 100 / 100, burnStack = q.quoted("0.5% per 100 Dragon Practice stacks") / 100 / 100;
    q.quote("Subsequent applications of the burn stack"); q.quote("not refreshing the duration of the previous burn"); q.quote("Super Scorcher Breath can only hit enemies once per cast"); q.quote("initial fireball, explosion and extra bolts can all be blocked and dodged"); q.quote("The application of the burn is negated in all cases"); q.quote("does not benefit from the ability's life steal");
    const wDamage = w.formula("Glob Physical Damage"), wExplosion = w.formula("Explosion Physical Damage"), wRange = w.field("range"), wWidth = w.field("width"), wRadius = w.field("effectRadius"), wSlow = w.quoted("slows them by 35%") / 100, wSlowSeconds = w.quoted("for 1.5 seconds");
    w.quote("Spell shield can block either the glob or the explosion, but not both");
    const wMovement = (game(w, "Characters/Smolder/Spells/SmolderWAbility/SmolderW", "mMissileSpec") as { movementComponent: { mInitialSpeed: number; mAcceleration: number; mMinSpeed: number; mMaxSpeed: number } }).movementComponent;
    const flightSeconds = e.quoted("takes flight for 1.25 seconds"), flightMS = e.quoted("75% bonus movement speed") / 100, flightBase = e.quoted("up to 5"), flightStackCount = e.quoted("1 per 100 Dragon Practice stacks", 0) / e.quoted("1 per 100 Dragon Practice stacks", 1), flightDamage = e.formula("Physical Damage per Hit"), flightRange = e.field("range"), flightSpeed = e.field("speed");
    e.quote("number of additional bolts based on Dragon Practice stacks is rounded down"); e.quote("ends immediately if Smolder casts another ability or becomes immobilized"); e.quote("Spell shield will block only one bolt"); e.quote("placed correspondingly to the nearest valid space");
    const rDamage = r.formula("Increased Physical Damage"), rHeal = r.formula("Self Heal"), rForward = r.field("range", "forward"), rBehind = r.field("range", "backwards"), rSpeed = r.field("speed"), rRadius = r.field("width"), rMinion = r.quoted("deals 50% damage against minions and monsters") / 100, rSlow = r.quoted("slowed by 40%") / 100, rSlowSeconds = r.quoted("for 2 seconds");
    r.quote("wherever the caster is at the start of the cast time");
    const rv = values(r, "Characters/Smolder/Spells/SmolderRAbility/SmolderR"), rSpawn = rv("MomSpawnDelay"), rMoveLock = r.quoted("Disabled in the first {{fd|0.4}} seconds");
    const stacks = (unit: Unit) => Math.max(0, Number(unit.memory[STACKS] ?? options.dragonPractice ?? 0));
    const critical = (unit: Unit, ratio: number) => { const d = derive(unit); return 1 + ratio * d.critChance * (d.critDamage - 1); };
    const gain = (ctx: HookContext, amount = 1) => { ctx.memory[STACKS] = stacks(ctx.self) + amount; };
    const inFlight = (self: Unit, tick: number) => tick < Number(self.memory[FLIGHT] ?? -1);
    const endFlight = (ctx: HookContext) => { ctx.memory[FLIGHT] = -1; ctx.self.statuses = ctx.self.statuses.filter((status) => status.ability !== "E"); exitTerrain(ctx.world, ctx.self); };
    const refund = (ctx: HookContext, serial: number) => { const key = `smolder:qRefund:${serial}`; if (ctx.memory[key]) return; ctx.memory[key] = true; ctx.apply({ type: "resource", amount: flat(qRefund) }, true); };
    const castData = (ctx: HookContext, effects: readonly Effect[]): QCast | undefined => {
      const marker = effects.find((effect) => effect.type === "mark" && effect.key.startsWith("smolder:qCast:"));
      if (marker?.type !== "mark") return;
      const text = ctx.memory[marker.key]; return typeof text === "string" ? JSON.parse(text) as QCast : undefined;
    };
    const qTemplate: Effect[] = [{ type: "damage", damageType: "physical", amount: qDamage }];
    const qSplashSpec: AbilitySpec = { key: "Qsplash", name: q.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, persistsAfterDeath: true, delivery: { kind: "self" }, onHit: qTemplate, flags: { projectile: false, spellShield: true, parry: true, appliesOnHit: true, petContactHooks: true } };
    const qBolt: AbilitySpec = { ...qSplashSpec, key: "Qbolt", flags: { ...qSplashSpec.flags, projectile: true } };
    const wBurst: AbilitySpec = { key: "Wburst", name: `${w.name} (explosion)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: wExplosion }], flags: { projectile: false, spellShield: true, petContactHooks: true } };
    const eBolt: AbilitySpec = { key: "Ebolt", persistsAfterDeath: true, name: e.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: flightDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true } };
    const rWave: AbilitySpec = { key: "Rwave", name: r.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, persistsAfterDeath: true, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowSeconds }], flags: { projectile: true, spellShield: true, petContactHooks: true } };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", budgetExcluded: true, cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castTimeFor: (self) => attackTiming(self).windup / 30, cancelOnInvalidTarget: true, persistsAfterDeath: true, delivery: { kind: "target", range: qRange, rangeFor: (self, target) => attackRange(self, target), edge: true, missileSpeed: qSpeed }, onHit: qTemplate, flags: { projectile: true, spellShield: true, parry: true, basicDamage: true, appliesOnHit: true, petContactHooks: true } },
      { key: "W", persistsAfterDeath: true, name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), castDirection: "start", delivery: { kind: "line", range: wRange, width: wWidth, radius: wWidth / 2, speed: wMovement.mInitialSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: wDamage }, { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }], flags: { projectile: true, spellShield: true, petContactHooks: true } },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "ghosted", duration: flightSeconds }, { type: "state", state: "terrainIgnore", duration: flightSeconds }, { type: "state", state: "noAttacks", duration: flightSeconds }, { type: "stat", stat: "moveSpeedPercent", amount: flat(flightMS), duration: flightSeconds }], flags: { grounded: true }, usable: (u, world) => !inFlight(u, world.tick), roles: ["escape", "buff", "damage"], estimate: (self, target) => evaluate(flightDamage, self, target) + stacks(self) * stackE * critical(self, stackECrit) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), castOrigin: "start", castDirection: "start", persistsAfterDeath: true, moveWhileCasting: true, delivery: { kind: "self" }, roles: ["damage", "defense"], estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: (self, target) => rSpawn + Math.max(0, Math.abs(target.x - self.x) + rBehind - target.spec.base.radius) / rSpeed },
      qSplashSpec, qBolt, wBurst, eBolt, rWave,
    ];
    const launchQExtra = (ctx: HookContext, missile: Missile, data: QCast, x: number) => {
      if (data.stacks < tier2) return;
      // One longitudinal corridor represents the arc. A target can take only one hit from this cast.
      const effects: Effect[] = [{ type: "damage", damageType: "physical", amount: scaled(qDamage, extraShare) }, { type: "mark", key: `smolder:qCast:${data.serial}`, duration: 0 }];
      const extra: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Qbolt", seenTick: missile.seenTick, x, perTick: qExtraSpeed / 30, homing: false, direction: data.direction, travelLeft: qExtraRange, projectile: true, connects: missile.connects, scale: missile.scale, onHit: effects, piercing: true, collisionPet: true, radius: extraRadius };
      ctx.memory[`smolder:qMissile:${extra.id}`] = JSON.stringify(data); ctx.world.missiles.push(extra);
    };
    const qSplashAt = (ctx: HookContext, x: number, radius: number, effects: Effect[], data: QCast, scale: number) => {
      if (Math.abs(ctx.enemy.x - x) <= radius + ctx.enemy.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, qSplashSpec, effects, scale);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.hitPoints && !pet.spec.untargetable && Math.abs(pet.x - x) <= radius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, qSplashSpec, effects, "area");
    };
    const prepareMissile = (ctx: HookContext, missile: Missile) => {
      if (missile.source === "Q" && ctx.memory[`smolder:qMissile:${missile.id}`] === undefined) {
        const declared = ctx.memory[`smolder:qDeclared:${missile.seenTick}`];
        if (typeof declared !== "string") return;
        const data = JSON.parse(declared) as QCast;
        missile.onHit = [...qTemplate, { type: "mark", key: `smolder:qCast:${data.serial}`, duration: 0 }];
        ctx.memory[`smolder:qMissile:${missile.id}`] = declared;
      }
      if (missile.source === "W" && !ctx.memory[`smolder:wPrepared:${missile.id}`]) {
        ctx.memory[`smolder:wPrepared:${missile.id}`] = true;
        const serial = Number(ctx.memory[`smolder:wDeclared:${missile.seenTick}`] ?? 0);
        missile.onHit = [...missile.onHit, { type: "mark", key: `smolder:wCast:${serial}`, duration: 0 }];
        missile.acceleration = { perTick: wMovement.mAcceleration / 900, minPerTick: wMovement.mMinSpeed / 30, maxPerTick: wMovement.mMaxSpeed / 30 };
        const eta = missileArrivalTicks(missile, Math.max(0, Math.abs(ctx.enemy.x - missile.x) - ctx.enemy.spec.base.radius - wWidth / 2)) / 30, chance = skillshotChance(ctx.world, ctx.enemy, missile.seenTick, eta, wWidth / 2);
        missile.connects = chance > .02; missile.scale = chance >= .98 ? 1 : chance;
      }
    };
    const discardDeadPrimary = (ctx: HookContext, missile: Missile) => {
      if (missile.source !== "Q" || (ctx.enemy.alive && ctx.enemy.hp > 0 && !ctx.enemy.fallen)) return false;
      const key = `smolder:qDiscarded:${missile.id}`;
      if (!ctx.memory[key]) { ctx.memory[key] = true; gain(ctx); }
      missile.connects = false;
      ctx.world.missiles = ctx.world.missiles.filter((candidate) => candidate.id !== missile.id);
      delete ctx.memory[`smolder:qMissile:${missile.id}`];
      return true;
    };
    const behavior: Behavior = (view) => {
      if (inFlight(view.self, view.world.tick)) {
        const defensive = defaultBehavior(view);
        if (defensive?.kind === "cast" && defensive.ability !== "E" && defensive.dodge !== undefined) return defensive;
        return { kind: "move", direction: view.distance < flightRange / 2 ? -1 : 1 };
      }
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && command.ability === "E" && view.mode === "fight" && canCast(view.world, view.self, abilities[0]!)) return { kind: "cast", ability: "Q" };
      return command;
    };
    kit.assume("Dragon Practice defaults to 225 pre-duel stacks, an explicit changeable farming assumption that unlocks all three Q tiers. It gains one stack per real champion ability contact, with W and E limited to one per cast; ordinary attacks and generic summon damage do not grant hit stacks. Q kills on source-classified minion summons count as minion kills; champion clones and unknown classes do not. No free ambient farming occurs during the duel. The pinned wiki parser loses critical-damage template percentages in the passive text, so separately attributed game calculations supply Q magic 0.25×stacks×[1+1.4×critChance×(critDamage−1)], W magic 0.55×stacks, and E magic 0.08×stacks×[1+0.75×critChance×(critDamage−1)].");
    kit.assume("Q uses the current rounded basic-attack windup and current edge attack range, travels as a 1800-speed targeted projectile, applies one full on-hit packet and 50% life steal only to its physical portion. Its physical critical modifier is 1+0.75×critChance×(critDamage−1); passive magic shares Q damage modifiers but grants no life steal. Block/dodge/spell shield deny the complete packet, including burn; blind does not stop this spell. Actual nearby summons receive the 285-radius tier-one explosion. Each actual target is contacted at most once per cast, even if a later bolt/explosion intersects it again. Q upgrades are fixed from the stack count at cast completion, while damage stats and passive stack damage are read at impact.");
    kit.assume("At 125 stacks the extra arc has ceil(2+0.008×stacks) sourced bolts. The arena represents one forward 900-speed 500-unit corridor with a 150-radius terminal explosion and half physical/passive-magic damage, because it has no lateral coordinates. It neither multiplies damage by the number of bolts nor repeats damage on the primary target. Exact angular coverage, minion-primary targeted Q orders and cone-edge trajectories remain limitations. One cast refunds 15 mana at most once when it actually kills a target. If the initial target dies during flight, its pending Q gains the documented stack when that flight is discarded; extra bolts do not grant this special stack.");
    kit.assume("At 225 stacks each unblocked Q contact creates an independent three-second true burn, ticking once per second for a total(0.00025×bonusAD+0.00005×DragonPractice)×targetMaxHP. New burns stack with separate clocks instead of refreshing old ones. The unused client Tier 3_TrueDamagePercent constant is not added to the explicit current burn calculation. A marked champion is executed below 6.5% max health only after positive damage dealt by Smolder himself, including Q's initial packet and burn ticks. Other actors cannot trigger it; shields and minimum-health floors retain their shared rules. The 300 monster cap does not apply to ordinary champion summons, which are modeled as minions.");
    kit.assume("Achooo is a single piercing projectile, with 2000 initial speed,1600 units/s² deceleration and 400 minimum from the exact versioned movement component. This reaches the minimum after about 1200 traveled units; the wiki instead describes slowing after an estimated 1200 distance, an unresolved timing-wording difference. Champion contact creates a separately spell-shieldable 385-radius explosion even when the glob was shielded. Actual nearby summons receive the explosion; only one enemy champion exists, so no invented chain of extra 75%-falloff champion explosions is added. The initial glob has no passive magic; the explosion has it. The wiki's unspecified post-cast basic lockout is not assigned a guessed duration.");
    kit.assume("Flight lasts 1.25 seconds, prevents ordinary attacks, grants 75% additive movement speed, ghosting and terrain-free voluntary walking, and fires 5+floor(stacks/100) homing 1800-speed spell bolts. The wiki gives 1800 speed, whereas the exact active EAttack movement component gives 2000 (its cosmetic missileSpeed field is 1800); this kit retains the wiki 1800 policy and discloses that unresolved conflict. Absolute evenly spaced shot clocks start immediately; the source does not specify their first phase. Each shot selects a currently visible champion within 700 center units, otherwise the lowest-health-percent eligible summon with deterministic nearest/id ties. Casting any other ability, any immobilization including root/stasis, or death ends flight; ground and silence alone do not. Flight ends inside generated terrain by snapping to the nearest legal one-dimensional edge. Unobstructed map vision, brush and full two-dimensional terrain choices are absent. A single spell shield blocks one bolt and flight grants only one champion-hit stack per cast.");
    kit.assume("R retains the declaration position/direction and creates an independent wave from 600 units behind it. The client MomSpawnDelay is interpreted as one second from declaration; the source does not prove whether this delay is relative to declaration or cast completion. The 0.75-second cast is movable after an explicit first 0.4-second movement lock. The wave travels 1700 speed, heals only when it crosses Smolder's actual current position, and persists after his death. The one-axis aiming line models the 125-radius center sweetspot and its 150% damage/40% two-second slow; outer 300-radius weaker contacts cannot be represented independently by the current lateral sidestep model and remain an explicit limitation. Source-classified minion summons receive 50% damage; champion clones and unknown classes retain full damage and independent spell shields. Ordinary sight does not reveal invisible enemies.");
    kit.assume("The policy finishes its finite flight instead of immediately canceling it with another offensive spell, otherwise follows ordinary defense and spell/attack choices. The budget prices current Q physical/passive magic, one independent burn at 225 stacks, glob plus one W explosion, complete flight at its sourced shot count and one R center wave/heal per cooldown. It uses the configured initial farm stacks, not speculative future stacking, free collateral targets or executions.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: attackData.movementComponent.mSpeed, onHitToPets: true }, abilities, behavior,
      budget: {
        damage(self, target) { const d = derive(self), h = 1 + d.abilityHaste / 100, count = stacks(self), qCycle = abilities[0]!.cooldown / h + attackTiming(self).windup / 30, wCycle = abilities[1]!.cooldown / h + abilities[1]!.castTime, eCycle = abilities[2]!.cooldown / h, rCycle = abilities[3]!.cooldown / h; return { physical: evaluate(qDamage, self, target) * critical(self, qCrit) / qCycle + evaluate(wExplosion, self, target) / wCycle + (flightBase + Math.floor(count * flightStackCount)) * evaluate(flightDamage, self, target) / eCycle + evaluate(rDamage, self, target) / rCycle, magic: count * stackQ * critical(self, stackQCrit) / qCycle + count * stackW / wCycle + (flightBase + Math.floor(count * flightStackCount)) * count * stackE * critical(self, stackECrit) / eCycle, true: count >= tier3 ? (burnAD * d.bonusAd + burnStack * count) * derive(target).maxHp / qCycle : 0 }; },
        healing(self, target) { return evaluate(rHeal, self, target) / (abilities[3]!.cooldown / (1 + derive(self).abilityHaste / 100)); },
      },
      hooks: {
        onStart(ctx) { ctx.memory[STACKS] = Math.max(0, options.dragonPractice ?? 0); },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "W") ctx.memory[`smolder:castStart:${ctx.ability.key}`] = ctx.tick;
          if (ctx.ability.key !== "E" && inFlight(ctx.self, ctx.tick)) endFlight(ctx);
          if (ctx.ability.key !== "R") return;
          ctx.apply({ type: "state", state: "noMovement", duration: rMoveLock }, true);
          const direction = ctx.self.facing ?? directionTo(ctx.self, ctx.enemy), x = ctx.self.x - direction * rBehind, due = ctx.tick + ticks(rSpawn), id = ctx.world.nextId++;
          const eta = rSpawn + Math.max(0, Math.abs(ctx.enemy.x - x) - ctx.enemy.spec.base.radius) / rSpeed, chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, eta, rRadius);
          ctx.memory[`smolder:rDue:${id}`] = due;
          ctx.world.missiles.push({ id, owner: ctx.self.side, source: "Rwave", seenTick: ctx.tick, x, perTick: 0, homing: false, direction, travelLeft: rForward + rBehind, projectile: true, connects: chance > .02, scale: chance >= .98 ? 1 : chance, onHit: rWave.onHit!, piercing: true, radius: rRadius, collisionPet: true });
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const serial = Number(ctx.memory["smolder:qSerial"] ?? 0) + 1; ctx.memory["smolder:qSerial"] = serial;
            const data: QCast = { serial, stacks: stacks(ctx.self), hit: [], direction: directionTo(ctx.self, ctx.enemy) };
            ctx.memory[`smolder:qCast:${serial}`] = JSON.stringify(data);
            ctx.memory[`smolder:qDeclared:${ctx.memory["smolder:castStart:Q"]}`] = JSON.stringify(data);
          }
          if (ctx.ability.key === "W") {
            ctx.memory["smolder:wSerial"] = Number(ctx.memory["smolder:wSerial"] ?? 0) + 1;
            ctx.memory[`smolder:wDeclared:${ctx.memory["smolder:castStart:W"]}`] = ctx.memory["smolder:wSerial"]!;
          }
          if (ctx.ability.key === "E") { ctx.memory[FLIGHT] = ctx.tick + ticks(flightSeconds); ctx.memory["smolder:eStart"] = ctx.tick; ctx.memory["smolder:eCount"] = flightBase + Math.floor(stacks(ctx.self) * flightStackCount + EPSILON); ctx.memory["smolder:eFired"] = 0; ctx.memory["smolder:eSerial"] = Number(ctx.memory["smolder:eSerial"] ?? 0) + 1; }
        },
        onAbilityContact(ctx) {
          if (["W", "Wburst"].includes(ctx.ability.key)) { const marker = ctx.effects.find((effect) => effect.type === "mark" && effect.key.startsWith("smolder:wCast:")); ctx.memory["smolder:wActiveSerial"] = marker?.type === "mark" ? Number(marker.key.slice("smolder:wCast:".length)) : 0; }
          if (["Q", "Qsplash", "Qbolt"].includes(ctx.ability.key)) {
            const data = castData(ctx, ctx.effects), target = identity(ctx.enemy);
            if (data) { if (data.hit.includes(target)) return []; data.hit.push(target); ctx.memory[`smolder:qCast:${data.serial}`] = JSON.stringify(data); }
            // Preserve the shared avoided-attack callback, while denying the entire burn packet.
            if (ctx.defense === "dodge" || ctx.defense === "block") return qTemplate;
            const share = ctx.ability.key === "Qbolt" ? extraShare : ctx.effects.some((effect) => effect.type === "damage" && effect.amount.base === qDamage.base * extraShare) ? extraShare : 1;
            const physical: Effect = { type: "damage", damageType: "physical", amount: scaled(qDamage, critical(ctx.self, qCrit) * share), lifesteal: derive(ctx.self).lifeSteal * qLifeSteal, noLifeSteal: true, petDamageCategory: ctx.ability.key === "Q" ? "singleTarget" : "area" };
            const magic: Effect = { type: "damage", damageType: "magic", amount: flat(stacks(ctx.self) * stackQ * critical(ctx.self, stackQCrit) * share), noLifeSteal: true, label: p.name, petDamageCategory: "proc" };
            const effects: Effect[] = [physical, magic];
            if ((data?.stacks ?? stacks(ctx.self)) >= tier3 && !ctx.defense) {
              const serial = data?.serial ?? 0;
              effects.unshift({ type: "mark", key: BURN, duration: burnSeconds });
              effects.push({ type: "dot", damageType: "true", total: flat((burnAD * derive(ctx.self).bonusAd + burnStack * stacks(ctx.self)) * derive(ctx.enemy).maxHp), duration: burnSeconds, interval: 1, stacks: true, label: `${q.name} (burn #${serial})` });
            }
            if (!ctx.defense) ctx.memory["smolder:qActiveSerial"] = data?.serial ?? 0;
            return effects;
          }
          if (ctx.ability.key === "Wburst") return [...ctx.effects, { type: "damage", damageType: "magic", amount: flat(stacks(ctx.self) * stackW), noLifeSteal: true, label: p.name }];
          if (ctx.ability.key === "Ebolt") return [...ctx.effects, { type: "damage", damageType: "magic", amount: flat(stacks(ctx.self) * stackE * critical(ctx.self, stackECrit)), noLifeSteal: true, label: p.name }];
          if (ctx.ability.key === "Rwave" && ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.targetClass === "minion") return ctx.effects.map((effect) => effect.type === "damage" ? { ...effect, amount: scaled(effect.amount, rMinion) } : effect);
        },
        onAbilityHit(ctx) {
          if (["Q", "Qsplash", "Qbolt"].includes(ctx.ability.key) && hasState(ctx.enemy, "blockAttacks")) { delete ctx.memory["smolder:qActiveSerial"]; return; }
          if (ctx.enemy.petId === undefined) {
            let key: string | undefined;
            if (["W", "Wburst"].includes(ctx.ability.key)) key = `smolder:wStack:${ctx.memory["smolder:wActiveSerial"] ?? 0}`;
            if (ctx.ability.key === "Ebolt") key = `smolder:eStack:${ctx.memory["smolder:eSerial"] ?? 0}`;
            if (!key || !ctx.memory[key]) { gain(ctx, ctx.scale); if (key) ctx.memory[key] = true; }
          }
          if (["Q", "Qsplash", "Qbolt"].includes(ctx.ability.key)) delete ctx.memory["smolder:qActiveSerial"];
        },
        onDamageDealt(ctx) {
          if (ctx.enemy.petId !== undefined || ctx.mitigated <= 0 || ctx.enemy.statuses.some((status) => status.kind === "state" && status.key === "parry")) return;
          if (ctx.enemy.alive && ctx.enemy.hp > 0 && ctx.enemy.statuses.some((status) => ((status.kind === "mark" && status.key === BURN) || (status.kind === "dot" && status.dot?.label?.startsWith(`${q.name} (burn #`))) && status.source === ctx.self.side && status.endTick >= ctx.tick) && ctx.enemy.hp < derive(ctx.enemy).maxHp * executeShare - EPSILON) ctx.apply({ type: "execute", threshold: { base: 0, ratios: { targetMaxHP: executeShare } } });
          if (ctx.enemy.hp > 0 && !ctx.enemy.fallen) return;
          const burn = ctx.ability?.match(/\(burn #(\d+)\)/), direct = ctx.memory["smolder:qActiveSerial"];
          if (burn) refund(ctx, Number(burn[1])); else if (direct !== undefined) refund(ctx, Number(direct));
        },
        onKill(ctx) {
          if (ctx.pet?.spec.targetClass !== "minion") return;
          const burn = ctx.damage?.persistent ? ctx.damage.ability?.match(/\(burn #(\d+)\)/) : undefined;
          const direct = ctx.memory["smolder:qActiveSerial"];
          if (burn) { gain(ctx); refund(ctx, Number(burn[1])); }
          else if (direct !== undefined && (ctx.damage?.ability === q.name || ctx.damage?.ability === p.name)) { gain(ctx); refund(ctx, Number(direct)); }
        },
        onCCApplied(ctx) { if (IMMOBILIZING.has(ctx.cc) && inFlight(ctx.self, ctx.tick)) endFlight(ctx); },
        onLethal(ctx) { if (inFlight(ctx.self, ctx.tick)) endFlight(ctx); return false; },
        onTick(ctx) {
          for (const missile of [...ctx.world.missiles]) if (missile.owner === ctx.self.side && missile.source === "Q") discardDeadPrimary(ctx, missile);
          const until = Number(ctx.memory[FLIGHT] ?? -1);
          if (until >= 0 && ctx.tick >= until) { endFlight(ctx); return; }
          if (!inFlight(ctx.self, ctx.tick)) return;
          const count = Number(ctx.memory["smolder:eCount"]), start = Number(ctx.memory["smolder:eStart"]); let fired = Number(ctx.memory["smolder:eFired"] ?? 0);
          while (fired < count && ctx.tick >= start + Math.floor(fired * ticks(flightSeconds) / count + EPSILON)) {
            const candidates: Array<{ unit: Unit; pet?: Pet }> = [];
            if (ctx.enemy.alive && canSee(ctx.enemy, ctx.self) && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= flightRange + EPSILON) candidates.push({ unit: ctx.enemy });
            if (!candidates.length) for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints && Math.abs(pet.x - ctx.self.x) <= flightRange + EPSILON) { const unit = petFormulaTarget(pet, ctx.self, ctx.tick); if (canSee(unit, ctx.self) && !isUntargetable(unit, ctx.self)) candidates.push({ unit, pet }); }
            candidates.sort((a, b) => a.unit.hp / derive(a.unit).maxHp - b.unit.hp / derive(b.unit).maxHp || Math.abs(a.unit.x - ctx.self.x) - Math.abs(b.unit.x - ctx.self.x) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
            const target = candidates[0];
            if (target) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Ebolt", seenTick: ctx.tick, x: ctx.self.x, perTick: flightSpeed / 30, homing: true, direction: directionTo(ctx.self, target.unit), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: eBolt.onHit!, ...(target.pet ? { pet: target.pet.id } : {}) });
            fired++;
          }
          ctx.memory["smolder:eFired"] = fired;
        },
        onMissileTick(ctx) { prepareMissile(ctx, ctx.missile); if (ctx.missile.source === "Rwave" && ctx.tick >= Number(ctx.memory[`smolder:rDue:${ctx.missile.id}`] ?? Infinity)) { ctx.missile.perTick = rSpeed / 30; delete ctx.memory[`smolder:rDue:${ctx.missile.id}`]; } },
        onMissileMove(ctx) { prepareMissile(ctx, ctx.missile); if (discardDeadPrimary(ctx, ctx.missile)) return; if (ctx.missile.source === "Rwave" && !ctx.memory[`smolder:rHealed:${ctx.missile.id}`] && ctx.self.alive && ctx.self.x + ctx.self.spec.base.radius >= Math.min(ctx.from, ctx.to) - EPSILON && ctx.self.x - ctx.self.spec.base.radius <= Math.max(ctx.from, ctx.to) + EPSILON) { ctx.memory[`smolder:rHealed:${ctx.missile.id}`] = true; ctx.apply({ type: "heal", amount: rHeal }, true); } },
        onMissileContact(ctx) {
          const missile = ctx.missile;
          if (ctx.memory[`smolder:qDiscarded:${missile.id}`]) return;
          if (missile.source === "W" && !ctx.targetPet) {
            const center = ctx.enemy.x, effects = [...wBurst.onHit!, ...missile.onHit.filter((effect) => effect.type === "mark" && effect.key.startsWith("smolder:wCast:"))]; abilityHit(ctx.world, ctx.self, ctx.enemy, wBurst, effects, missile.scale);
            for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && Math.abs(pet.x - center) <= wRadius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, wBurst, effects, "area");
          }
          if (missile.source !== "Q") return;
          const raw = ctx.memory[`smolder:qMissile:${missile.id}`]; if (typeof raw !== "string") return;
          const data = JSON.parse(raw) as QCast, center = ctx.targetPet?.x ?? ctx.enemy.x;
          if (data.stacks >= tier1) qSplashAt(ctx, center, qSplash, missile.onHit, data, missile.scale);
          launchQExtra(ctx, missile, data, center); delete ctx.memory[`smolder:qMissile:${missile.id}`];
        },
        onMissileEnd(ctx) {
          prepareMissile(ctx, ctx.missile);
          const raw = ctx.memory[`smolder:qMissile:${ctx.missile.id}`];
          if (ctx.missile.source === "Q" && ctx.reason === "range" && !ctx.enemy.alive && typeof raw === "string" && !ctx.memory[`smolder:qDiscarded:${ctx.missile.id}`]) { ctx.memory[`smolder:qDiscarded:${ctx.missile.id}`] = true; gain(ctx); }
          if (ctx.missile.source === "Qbolt" && ctx.reason === "range" && typeof raw === "string") qSplashAt(ctx, ctx.missile.x, qExtraRadius, ctx.missile.onHit, JSON.parse(raw) as QCast, ctx.missile.scale);
          delete ctx.memory[`smolder:qMissile:${ctx.missile.id}`]; delete ctx.memory[`smolder:rDue:${ctx.missile.id}`];
        },
      },
    };
  },
};
export default smolder;
