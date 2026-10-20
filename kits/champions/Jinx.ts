/** Jinx's weapon state and launched packets retain independent, branch-copyable identities. */
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor } from "../../engine/rules/defense";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petEffects } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { AttackHitOptions, Unit } from "../../engine/sim/state";
import { attackDamage, between, extraAttacks, scaled, seriesAt, ticks } from "./util";

const ROCKET = "jinx:rocket", REV = "jinx:rev", REV_END = "jinx:revEnd";
const jinx: KitModule = {
  champion: "Jinx",
  options: {
    weaponPolicy: { label: "Weapon policy: 0 switches for range, 1 prefers minigun, 2 prefers rockets", default: 0 },
    revDecayInterval: { label: "Assumed seconds between later Rev'd up stack expiries", default: 1 },
  },
  build(kit, options) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const policy = options.weaponPolicy ?? 0, decay = options.revDecayInterval ?? 1;
    if (![0, 1, 2].includes(policy) || !Number.isFinite(decay) || decay <= 0) throw new Error("Jinx: weaponPolicy must be 0, 1 or 2 and revDecayInterval positive finite");
    const excitedSeconds = p.quoted("decaying over 6 seconds"), excitedMS = p.quoted("175% bonus movement speed") / 100, excitedAS = p.quoted("25% total attack speed") / 100, excitedMax = p.quoted("stacking up to 5 times"), excitedCap = p.quoted("increased to 90.0");
    p.quote("within 3 seconds of damaging them"); p.quote("Only takedowns against enemy champions can grant stacks beyond the first");
    const revSeconds = q.quoted("for 2.5 seconds"), revMaximum = q.quoted("stacking up to 3 times"), laterShare = q.quoted("50% effective") / 100, revAS = q.fraction("Bonus Attack Speed"), fullRev = q.fraction("Maximum Attack Speed"), rocketScale = q.quoted("110% AD") / 100, rocketPenalty = q.quoted("loses 10% of her bonus attack speed") / 100;
    const rocketCost = q.cost(), rangeBonus = q.baseOf("Bonus Range"), splashRadius = q.field("effectRadius"), toggleCooldown = q.field("staticCooldown");
    const minigunSpeed = q.gameQuoted("mSpell.missileSpeed: 2750.0"), rocketSpeed = q.gameQuoted("mSpell.missileSpeed: 2000.0");
    const rocketTotalTime = q.gameQuoted('"mAttackTotalTime":1.600000023841858', 0, "Characters/Jinx/CharacterRecords/Root"), rocketCastTime = q.gameQuoted('"mAttackCastTime":0.27000001072883606', 0, "Characters/Jinx/CharacterRecords/Root");
    q.quote("Only the first attack after switching to Fishbones will benefit from Rev'd up");
    q.quote("The splash damage of Fishbones is based on the pre-mitigation damage done to the primary target"); q.quote("It deals proc damage and thus doesn't apply life steal or on-hit effects"); q.quote("does not affect targets if Jinx's attacks are blocked, dodged, or missed"); q.quote("Both weapons deal basic damage to their primary target");
    const zapDamage = w.formula("Physical Damage"), zapSlow = w.fraction("Slow"), zapSeconds = w.quoted("reveals and slows them for 2 seconds");
    const zapTimes = w.fieldNumbers("castTime"), zapSeries = w.record.fields.castTime?.values[0]?.series;
    if (!zapSeries || zapSeries.kind !== "variable") throw new Error("Jinx: Zap cast-time attack-speed series is missing");
    w.quote("This ability will cast from wherever the caster is at the start of the cast time");
    const eDamage = e.formula("Magic Damage"), eRange = e.field("targetRange"), explosionRadius = e.field("effectRadius"), collisionRadius = e.field("collisionRadius"), eFlight = e.quoted("landing after 0.4 seconds"), armSeconds = e.quoted("arming after 0.5 seconds"), lifeSeconds = e.quoted("exploding after 5 seconds"), rootSeconds = e.quoted("rooting them for 1.5 seconds");
    e.quote("3 Chompers"); e.quote("Enemy champions can be affected by only one Chomper"); e.quote("Spell shield does not negate the explosion"); e.quote("Chompers will halt when encountering Wind Wall and Unbreakable");
    const rMin = r.formula("Minimum Physical Damage"), rMax = r.formula("Maximum Physical Damage"), ramp = r.seriesIn("based on distance traveled"), maxTravelDamage = r.quoted("maximum damage is reached after traveling 1500 units"), speedTravel = r.quoted("after traveling 1350 units"), rInitialSpeed = r.field("speed", "Initial"), rFinalSpeed = r.field("speed", "Increased"), rRadius = r.field("effectRadius", "Explosion radius"), secondary = r.quoted("take 80% damage") / 100, rRange = r.gameQuoted("mSpell.castRange: [25000,25000,25000,25000,25000,25000,25000]");
    r.quote("Spell shield will not prevent the explosion"); r.quote("missing health is based on each unit's own missing health"); r.quote("This ability will cast from wherever the caster is at the start of the cast time");
    const baseRange = kit.champion.forms[0]!.stats.attackRange;
    const rocketDamage = (caster: Unit, target: Unit, distance: number) => evaluate(between(rMin, rMax, (seriesAt(ramp, Math.min(maxTravelDamage, distance), true) - 10) / 90), caster, target);
    const rocketSplash: AbilitySpec = { key: "Rblast", name: `${r.name} (collateral)`, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: scaled(rMax, secondary), amountFor: (caster, target) => rocketDamage(caster, target, Number(caster.memory["jinx:rImpactTravel"] ?? 0)) * secondary }] };
    const controls: AbilitySpec = { key: "Econtrol", name: `${e.name} (snare)`, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "knockdown" }, { type: "cc", cc: "root", duration: rootSeconds }], flags: { spellShield: true } };
    const explosion: AbilitySpec = { key: "Eburst", name: `${e.name} (explosion)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], flags: { spellShield: false, projectile: false } };
    const refreshWeapon = (ctx: HookContext) => {
      let count = Number(ctx.memory[REV] ?? 0), until = Number(ctx.memory[REV_END] ?? -1);
      while (count > 0 && ctx.tick >= until) { count--; until += ticks(decay); }
      ctx.memory[REV] = count; ctx.memory[REV_END] = until;
      if (ctx.memory[ROCKET] && ctx.self.resource < rocketCost) { ctx.memory[ROCKET] = false; ctx.log("returns to Pow-Pow: insufficient rocket mana"); }
      const rev = count > 0 ? revAS * (1 + (count - 1) * laterShare) : 0;
      ctx.buff("jinx:revAS", "attackSpeed", rev, 2 / 30);
      // Remove the old penalty before deriving its replacement, avoiding feedback.
      ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== "buff:jinx:rocketPenalty");
      ctx.buff("jinx:rocketPenalty", "attackSpeed", ctx.memory[ROCKET] ? -derive(ctx.self).bonusAttackSpeed * rocketPenalty : 0, 2 / 30);
      ctx.buff("jinx:range", "attackRange", ctx.memory[ROCKET] ? rangeBonus : 0, 2 / 30);
      const remaining = Number(ctx.memory["jinx:excitedEnd"] ?? -1) - ctx.tick;
      const stacks = remaining > 0 ? Number(ctx.memory["jinx:excitedStacks"] ?? 0) : 0;
      ctx.buff("jinx:excitedMS", "moveSpeedPercent", stacks ? excitedMS * remaining / ticks(excitedSeconds) : 0, 2 / 30);
      ctx.buff("jinx:excitedAS", "attackSpeedMultiplier", stacks * excitedAS, 2 / 30);
      ctx.buff("jinx:excitedCap", "attackSpeedCap", stacks ? excitedCap : 0, 2 / 30);
    };
    const splash = (ctx: HookContext, blocked: boolean, attack: AttackHitOptions) => {
      if (blocked || attack.attackTag !== "jinx:fishbones") return;
      const d = derive(ctx.self), raw = rocketScale * d.ad * averageCritFactor(attack.critChance ?? d.critChance, attack.critMultiplier ?? d.critDamage);
      const packet: Effect = { type: "damage", damageType: "physical", amount: { base: raw }, petDamageCategory: "proc", noLifeSteal: true, label: "Fishbones splash" };
      if (ctx.enemy.petId !== undefined) {
        const rival = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
        if (rival.alive && Math.abs(rival.x - ctx.enemy.x) <= splashRadius + rival.spec.base.radius && !isUntargetable(rival, ctx.self)) applyEffect(ctx.world, ctx.self, rival, packet, { scale: 1 });
      }
      for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.id !== ctx.enemy.petId && Math.abs(pet.x - ctx.enemy.x) <= splashRadius + pet.spec.radius) petEffects(ctx.world, ctx.self, pet, [packet], "proc");
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", activation: "toggle", staticCooldown: true, cooldown: toggleCooldown, castTime: q.castTime(), delivery: { kind: "self" }, roles: [], usable: (self) => !!self.memory[ROCKET] || self.resource >= rocketCost },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: zapTimes[0]!, castTimeFor: (self) => seriesAt(zapSeries, derive(self).bonusAttackSpeed * 100, true), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: w.field("range"), width: w.field("width"), speed: w.field("speed"), collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: zapDamage }, { type: "cc", cc: "slow", strength: zapSlow, duration: zapSeconds }, { type: "mark", key: "jinx:zapSight", duration: zapSeconds }], flags: { projectile: true, spellShield: true }, decisive: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, flags: { spellShield: false, projectile: false }, roles: ["cc", "damage"], usable: (self, world) => Math.abs(world.units[self.side === 0 ? 1 : 0].x - self.x) <= eRange + 1e-6, estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: rRange, width: r.field("width"), speed: rInitialSpeed, piercing: true }, onHit: [{ type: "damage", damageType: "physical", amount: rMax, amountFor: (caster, target) => rocketDamage(caster, target, Number(caster.memory["jinx:rImpactTravel"] ?? Math.abs(target.x - caster.x))) }], flags: { projectile: true, spellShield: true }, roles: ["damage"], decisive: true },
      controls, rocketSplash, explosion,
    ];
    const behavior: Behavior = (view) => {
      const active = view.mode === "fight" || view.mode === "trade" || view.mode === "kite";
      const desired = policy === 2 || (policy === 0 && view.distance > baseRange + 1e-6);
      if (active && desired !== !!view.self.memory[ROCKET] && canCast(view.world, view.self, abilities[0]!)) return { kind: "cast", ability: "Q" };
      return defaultBehavior(view);
    };
    kit.assume("Jinx starts with Pow-Pow, no Rev'd up stacks and no Get Excited! stacks. Weapon policy switches to Fishbones only outside minigun range by default; explicit policies can prefer either weapon. Rocket mana is paid on attack declaration, even if the windup is cancelled; insufficient mana returns to Pow-Pow before the next attack. Toggle declarations retain their sourced static 0.9-second cooldown and are not spell activations for other kits.");
    kit.assume("Pow-Pow gains Rev'd up on launched attacks, including blinded launches, with a shared sourced 2.5-second timer. The pinned text says stacks expire one by one but does not give later intervals; revDecayInterval exposes the assumed one-second interval. Fishbones retains stacks for its first declared attack and consumes them when that attack launches. The 10% penalty applies to bonus attack speed, before total-attack-speed multipliers. Fishbones windup uses the pinned 0.27/1.6 cast/total fraction, relative to the minigun's compiled fraction.");
    kit.assume("Get Excited! is earned only from counted enemy champion deaths in this two-champion arena; ordinary summons, natural expiry and resurrection eggs do not qualify. Epic monsters, structures and summoned Rift Herald are absent. Its 175% movement burst uses an explicit linear six-second decay because the pinned text gives no decay curve. The 25% total attack-speed stacks are additive with one another, refresh together and raise the cap to the sourced 90.");
    kit.assume("Zap!'s sourced cast-time table is linearly interpolated by current bonus attack speed and clamps at 0.6/0.4 seconds. Its reveal is ordinary sight, recorded as a timed mark without exposing invisibility; map fog is absent.");
    kit.assume("The three Chompers are projected as one central 115-radius trigger and one 225-radius explosion per cast, respecting the sourced one-chomper-per-champion limit. Their transverse arrangement is absent, so side-chomper placement and separate pet explosions are not fabricated. The toss takes 0.4 seconds, is stopped by projectile walls, then arms after 0.5 seconds and expires five seconds after landing. A champion trigger explodes immediately, independently checks shielded snare/knockdown, and consumes the whole represented cluster. Natural expiry causes damage without snare. Summons receive explosion damage but never trigger champion-only traps. Sight does not grant true sight.");
    kit.assume("Super Mega Death Rocket uses the pinned finite 25000-unit global range, moves at 1700 then switches to 2200 after 1350 traveled units, and linearly interpolates the sourced distance damage table up to 1500. Only its flat/bonus-AD component ramps; each actual target supplies its own missing health at impact. It collides only with champions; shielded primary contacts still explode onto nearby summons for 80%. No epic-monster missing-health cap is applied to ordinary minion summons. Its launch position and direction are fixed at cast declaration; map sight and lateral geometry are absent.");
    kit.assume("The stat budget values fully stacked minigun attack speed, its sourced normal cap and one actual Chomper explosion per E cooldown, without preloading combat stacks. Death Rocket uses its actual distance callback in the reference state (zero distance), without an invented maximum-range hit. It does not pre-award champion takedown buffs or assume collateral targets. Actual weapon choice, mana, stack timing and destruction remain combat outcomes.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: minigunSpeed, onHitToPets: true }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), gained = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, fullRev)) - d.attackSpeed); return { physical: attackDamage(self) * gained, magic: evaluate(eDamage, self, target) / (abilities[2]!.cooldown / (1 + d.abilityHaste / 100)) }; } },
      hooks: {
        onStart: refreshWeapon,
        onTick: refreshWeapon,
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory[ROCKET] = !ctx.memory[ROCKET]; refreshWeapon(ctx); }
          if (ctx.ability.key === "E") {
            const distance = Math.min(eRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x))), direction = (directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1)) as 1 | -1;
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, seenTick: ctx.tick, x: ctx.self.x + direction * distance, radius: collisionRadius, startTick: ctx.tick, endTick: distance ? Number.POSITIVE_INFINITY : ctx.tick + ticks(eFlight), ability: explosion.key, onHit: explosion.onHit!, connects: true, scale: 1, noPets: true, memory: { "jinx:chomper": true } };
            ctx.world.zones.push(zone);
            if (distance) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "E", seenTick: ctx.tick, x: ctx.self.x, perTick: distance / ticks(eFlight), homing: false, direction, travelLeft: distance, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
          }
        },
        onAttack(ctx) {
          if (!ctx.memory[ROCKET]) { ctx.action.attackTag = "jinx:powpow"; ctx.action.missileSpeed = minigunSpeed; return; }
          ctx.self.resource = Math.max(0, ctx.self.resource - rocketCost);
          ctx.action.attackTag = "jinx:fishbones"; ctx.action.baseDamageScale = rocketScale; ctx.action.missileSpeed = rocketSpeed;
          const compiled = kit.champion.forms[0]!.stats.windup.percent;
          const remaining = ctx.action.launchTick - ctx.tick;
          ctx.action.launchTick = ctx.tick + Math.max(1, Math.ceil(remaining * (rocketCastTime / rocketTotalTime) / compiled - 1e-9));
        },
        onAttackLaunch(ctx) {
          if (ctx.action.attackTag === "jinx:powpow") { ctx.memory[REV] = Math.min(revMaximum, Number(ctx.memory[REV] ?? 0) + 1); ctx.memory[REV_END] = ctx.tick + ticks(revSeconds); }
          else if (ctx.action.attackTag === "jinx:fishbones") { ctx.memory[REV] = 0; ctx.memory[REV_END] = -1; }
          refreshWeapon(ctx);
        },
        onAttackHit(ctx) { splash(ctx, ctx.blocked, ctx.attack); },
        onAttackPetHit(ctx) { splash(ctx, ctx.blocked, ctx.attack); },
        onKill(ctx) {
          if (ctx.pet || "owner" in ctx.victim) return;
          const prior = ctx.tick < Number(ctx.memory["jinx:excitedEnd"] ?? -1) ? Number(ctx.memory["jinx:excitedStacks"] ?? 0) : 0;
          ctx.memory["jinx:excitedStacks"] = Math.min(excitedMax, prior + 1); ctx.memory["jinx:excitedEnd"] = ctx.tick + ticks(excitedSeconds); refreshWeapon(ctx);
        },
        onZoneLand(ctx) {
          if (ctx.zone.memory?.["jinx:chomper"]) {
            ctx.zone.kind = "trap"; ctx.zone.startTick = ctx.tick + ticks(armSeconds); ctx.zone.endTick = ctx.tick + ticks(lifeSeconds);
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.zone.seenTick, x: ctx.zone.x, radius: explosionRadius, startTick: ctx.tick, endTick: ctx.zone.endTick, ability: explosion.key, onHit: explosion.onHit!, connects: true, scale: 1, memory: { "jinx:expiry": ctx.zone.id } });
          } else if (ctx.zone.memory?.["jinx:expiry"] !== undefined) ctx.world.zones = ctx.world.zones.filter((zone) => zone.id !== Number(ctx.zone.memory!["jinx:expiry"]));
        },
        onZoneTrigger(ctx) {
          if (!ctx.zone.memory?.["jinx:chomper"]) return;
          ctx.world.zones = ctx.world.zones.filter((zone) => Number(zone.memory?.["jinx:expiry"] ?? -1) !== ctx.zone.id);
          abilityHit(ctx.world, ctx.self, ctx.enemy, controls, controls.onHit!);
          for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.zone.x) <= explosionRadius + pet.spec.radius) petEffects(ctx.world, ctx.self, pet, [{ type: "damage", damageType: "magic", amount: eDamage }], "area", "E");
        },
        onMissileMove(ctx) {
          if (ctx.missile.source !== "R") return;
          const key = `jinx:rTravel:${ctx.missile.id}`, distance = Number(ctx.memory[key] ?? 0) + Math.abs(ctx.to - ctx.from);
          ctx.memory[key] = distance; ctx.memory["jinx:rImpactTravel"] = distance;
          if (distance >= speedTravel) ctx.missile.perTick = rFinalSpeed / 30;
        },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "R" || ctx.targetPet) return;
          const distance = Number(ctx.memory[`jinx:rTravel:${ctx.missile.id}`] ?? 0); ctx.memory["jinx:rImpactTravel"] = distance;
          for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.enemy.x) <= rRadius + pet.spec.radius) abilityHitPet(ctx.world, ctx.self, pet, rocketSplash, rocketSplash.onHit!, "area", ctx.missile.scale);
          ctx.missile.ended = true;
        },
      },
    };
  },
};
export default jinx;
