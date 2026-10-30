/** Aphelios: finite weapon queues, actual off-hand attacks and independently defended contacts. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { averageCritFactor, healingReceived } from "../../engine/rules/defense";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { canCast, inReach } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, canTarget, directionTo, heal, hookContext, isUntargetable } from "../../engine/sim/combat";
import { healthProtection } from "../../engine/sim/healthProtection";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { nearestPetTarget, petEffects, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlocked, projectileBlockPoint, projectileInterceptPoint } from "../../engine/sim/projectileBlock";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { AttackHitOptions, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const WEAPONS = ["Calibrum", "Severum", "Gravitum", "Infernum", "Crescendum"] as const;
const PAIRS = WEAPONS.flatMap((_, a) => WEAPONS.flatMap((__, b) => a < b ? [[a, b] as const] : []));
const CAL = "aphelios:calibrum", GRAV = "aphelios:gravitum", LOCK = "aphelios:weaponLock";
const main = (u: Unit) => Number(u.memory["aph:main"] ?? 0);
const off = (u: Unit) => Number(u.memory["aph:off"] ?? 1);
const marked = (u: Unit, source: Unit, key: string, tick: number) => u.statuses.find((s) => s.kind === "mark" && s.key === key && s.source === source.side && s.endTick > tick);
const aphelios: KitModule = {
  champion: "Aphelios",
  options: { startingWeapons: { label: "Starting weapon pair (-1 searches ten unordered full-ammunition pairs; 0 is Calibrum/Severum)", default: -1 } },
  variants(options) { return options.startingWeapons! < 0 ? PAIRS.map((_, startingWeapons) => ({ startingWeapons })) : []; },
  build(kit, options) {
    const p = kit.ability("The Hitman and the Seer"), queue = kit.ability("Weapon Queue System"), faithful = kit.ability("Weapons of the Faithful"), phase = kit.ability("Phase");
    const [cal, sev, grav, inf, cres] = WEAPONS.map((name) => kit.ability(name));
    const moon = kit.ability("Moonshot"), onslaught = kit.ability("Onslaught"), binding = kit.ability("Binding Eclipse"), dusk = kit.ability("Duskwave"), sentry = kit.ability("Sentry"), r = kit.ability("Moonlight Vigil");
    const ammo = p.quoted("have 50 Moonlight"), assembly = p.quoted("over 1 second"), assemblyLock = p.quoted("on a 1.5-second cooldown");
    p.quote("ammunition, which is consumed upon basic attacking on-attack"); p.quote("will not consume additional Moonlight"); p.quote("they can be rearranged based on their usage"); p.quote("Aphelios cannot cast Phase during the assembly");
    queue.quote("reflects the next weapon that is in reserve"); faithful.quote("The individual actives do not share a cooldown");
    const statAD = p.quoted("4 / 8 / 12 / 16 / 20 / 24", 5), statAS = p.quoted("9 / 18 / 27 / 36 / 45 / 54%", 5) / 100, lethality = p.quoted("4.5 / 9 / 13.5 / 18 / 22.5 / 27", 5);
    const switchSeconds = phase.quoted("over 0.25 seconds"), switchCooldown = phase.field("staticCooldown"); phase.quote("Switching does not interrupt any commands"); phase.quote("Toggled abilities do not count as ability activations");
    const basicAmmo = cal!.cost();
    const qAmmo = moon.fieldNumbers("cost")[0]!, mana = moon.fieldNumbers("cost")[1]!;
    p.quote("instead consume all the remaining points");
    const calRange = cal!.quoted("100 bonus attack range"), markRange = cal!.quoted("1800 range"), markSeconds = cal!.quoted("marked for 4.5 seconds");
    const markBase = cal!.quoted("15 (+ 15% bonus AD)"), markRatio = cal!.quoted("15 (+ 15% bonus AD)", 1) / 100;
    cal!.quote("If Calibrum is the current off-hand weapon, the main weapon is used"); cal!.quote("The mark will not be triggered by Onslaught attacks"); cal!.quote("no other on-attack effects");
    const gravStrength = grav!.quoted("by 30%") / 100, gravSeconds = grav!.quoted("for 2.5 seconds"), gravDecay = grav!.quoted("after 0.7 seconds"), gravResidual = grav!.quoted("to 15%") / 100;
    grav!.quote("debuff applies even if the target is immune to slows"); grav!.quote("The only exception is {{cai|E|Skarner}}, which is special cased to negate the debuff with its slow-immunity.");
    const infMultiplier = inf!.quoted("110% AD") / 100;
    inf!.quote("Secondary targets hit by any bolt are dealt 75 / 100 (based on level)% of the triggering attack's damage");
    inf!.quote("This will not prevent the missile from dealing damage to secondary targets");
    const sevBasic = sev!.quoted("2 – 8 (based on level)%", 1) / 100, sevAbility = sev!.quoted("5 – 20 (based on level)%", 1) / 100;
    const sevShieldBase = sev!.levelValue("Healing from Severum"), sevShieldRatio = sev!.quoted("(+ 6% maximum health)") / 100, sevShieldSeconds = sev!.quoted("up to 30 seconds");
    sev!.quote("non-projectile and have an uncancellable windup");
    const cresSeries = cres!.seriesIn("based on number of Chakrams"); if (cresSeries.kind !== "variable") throw new Error("Aphelios Chakram table changed");
    const cresTable = cresSeries.values, cresMaximum = cres!.quoted("up to 20"), cresSeconds = cres!.quoted("last for 5 seconds"), cresLinger = cres!.quoted("for 0.2 seconds");
    const cresWindup = cres!.levelValue("based on number of Chakrams", 1) / 100, cresCritWindup = cres!.levelValue("based on number of Chakrams", 2) / 100;
    cres!.quote("attack timer is reset once caught"); cres!.quote("All Chakram stacks are lost if the Crescendum projectile is destroyed");
    const cresInitial = cres!.quoted("5000 u/s initial speed"), cresAcceleration = cres!.quoted("-6000 u/s² acceleration"), cresMinimum = cres!.quoted("minimum speed of 1700");
    const cresReturn = cres!.quoted("600 {{as|(+ 75 per 10% '''bonus''' attack speed)}}"), cresReturnRatio = cres!.quoted("600 {{as|(+ 75 per 10% '''bonus''' attack speed)}}", 1) / (cres!.quoted("600 {{as|(+ 75 per 10% '''bonus''' attack speed)}}", 2) / 100);
    const speed = [cal!.gameQuoted('"mSpeed":3000.0'), 0, grav!.gameQuoted('"mSpeed":1500.0'), inf!.gameQuoted('"mSpeed":1700.0'), cresInitial];
    const markCast = Math.round(cal!.gameQuoted('"mCastTime":0.30000001192092896') * 1e6) / 1e6;
    const rootSeconds = binding.quoted("for 1 second"), rRootSeconds = r.quoted("for 1.35 seconds"), rSlow = r.quoted("slow to 99%") / 100;
    binding.quote("In-flight projectiles will be empowered"); binding.quote("cannot expunge enemies affected by Gravitum that are untargetable");
    // Each maximum level-band endpoint is read from its pinned primary description.
    const bandFormula = (a: typeof moon, phrase: string, baseIndex: number, ratioIndex: number, apIndex: number): Formula => ({ base: a.quoted(phrase, baseIndex), ratios: { bonusAD: a.quoted(phrase, ratioIndex) / 100, AP: a.quoted(phrase, apIndex) / 100 } });
    const moonDamage = bandFormula(moon, "80 / 95 / 110 / 125 / 140 / 155 / 170 (based on level) (+ 42 / 45 / 48 / 51 / 54 / 57 / 60 (based on level)% bonus AD) (+ 100% AP)", 6, 13, 14);
    const bindingDamage = bandFormula(binding, "50 / 65 / 80 / 95 / 110 / 125 / 140 (based on level) (+ 32 / 35 / 38 / 41 / 44 / 47 / 50 (based on level)% bonus AD) (+ 70% AP)", 6, 13, 14);
    const duskDamage = bandFormula(dusk, "20 / 35 / 50 / 65 / 80 / 95 / 110 (based on level) (+ 15 / 16 / 17 / 18 / 19 / 20 / 21 (based on level)% bonus AD) (+ 70% AP)", 6, 13, 14);
    const sentryDamage = bandFormula(sentry, "35 / 50 / 65 / 80 / 95 / 110 / 125 (based on level) (+ 34 / 37 / 40 / 43 / 46 / 49 / 52 (based on level)% bonus AD) (+ 50% AP)", 6, 13, 14);
    const onslaughtSeconds = onslaught.quoted("for 1.75 seconds"), onslaughtBase = onslaught.quoted("up to 6 (+ 2 per 100% bonus attack speed)"), onslaughtAS = onslaught.quoted("up to 6 (+ 2 per 100% bonus attack speed)", 1);
    const onslaughtDamage = onslaught.quoted("20 / 23.5 / 27 / 30.5 / 34 / 37.5 / 41 (based on level)% AD", 6) / 100;
    const onslaughtHitScale = onslaught.quoted("25% effectiveness") / 100, onslaughtRange = onslaught.field("effectRadius"), onslaughtCommandRange = onslaught.quoted("reduced to 410"), onslaughtMove = onslaught.quoted("25% (+ 10% per 100 AP)") / 100, onslaughtAP = onslaught.quoted("25% (+ 10% per 100 AP)", 1) / 10000;
    onslaught.quote("Onslaught begins firing with Aphelios off-hand weapon"); onslaught.quote("cannot cast Phase nor Moonlight Vigil during Onslaught"); onslaught.quote("Crescendum will not deal damage if blocked by Wind Wall, but the stacks will still be gained");
    const duskDelay = dusk.quoted("After 0.25 seconds"), rDelay = r.quoted("After 0.3 seconds"), duskRange = dusk.field("targetRange");
    dusk.quote("Aphelios is locked out of declaring attacks until the volley of attacks has resolved");
    const sentryArm = sentry.quoted("after 0.35 seconds"), sentryDuration = sentry.quoted("up to 20 seconds"), sentryActive = sentry.quoted("duration to 4 seconds"), sentryRange = sentry.field("targetRange"), sentryHP = sentry.quoted("have 6 health"), sentryBasicTaken = sentry.quoted("take 3 damage"), sentrySpellTaken = sentry.quoted("4 damage per hit"), sentryCrit = sentry.quoted("for 200% damage") / 100;
    const pet = kit.pet("Sentry"), turretRange = pet.stat("range"), turretAS = pet.stat("attackspeed"), turretRadius = pet.stat("radius");
    pet.quote("* 6 damage from turret basic attacks"); pet.quote("Minion"); sentry.quote("can be dodged and blocked, but not missed from being blinded");
    const rDamage: Formula = { base: r.quoted("125 / 175 / 225 (based on level)", 2), ratios: { bonusAD: r.quoted("(+ 20% bonus AD)") / 100, AP: r.quoted("(+ 100% AP)") / 100 } };
    const rInfDamage: Formula = { base: r.levelValue("The initial blast deals"), ratios: { bonusAD: r.quoted("(+ 25% bonus AD)") / 100 } };
    const rMark = r.levelValue("Applies an empowered mark"), rHeal = r.levelValue("Heals Aphelios for"), rChakrams = r.quoted("Generates 5 additional spectral Chakrams") + 1;
    r.gameQuote('"mDataValue":"CritDamageMod"'); r.gameQuote('"mStat":9,"mCoefficient":1.0'); r.gameQuote('"mNumber":-1.0,"__type":"NumberCalculationPart"');
    const rCritBonus = r.quoted("{{critical damage|100 to 130|0 to 30|critScaling=true}}", 3) / 100;
    const rSplashRadius = r.quoted("400-radius circle"), rSplashShare = r.levelValue("The attack instead deals") / 100;
    r.quote("secondary targets are dealt 90% of ''Infernum's'' regular bolt damage");
    const rWidth = r.gameQuoted('"mMissileWidth":125.0') * 2;
    r.quote("Changing weapons while Moonlight Vigil is in flight does not change the effect"); r.quote("does not prevent the attacks from locking-on"); r.quote("won't be prevented if Aphelios is blinded"); r.quote("Attacks do not apply on-attack effects");
    const choose = Number(options.startingWeapons); if (!Number.isInteger(choose) || choose < -1 || choose >= PAIRS.length) throw new Error("Aphelios startingWeapons must be -1 or a pair index 0..9");
    const starting = PAIRS[Math.max(0, choose)]!;
    const allTargets = (ctx: HookContext) => [ctx.world.units[1 - ctx.self.side]!, ...ctx.world.pets.filter((z) => z.owner !== ctx.self.side).map((z) => petFormulaTarget(z, ctx.self, ctx.tick))];
    const shieldHeal = (ctx: HookContext, amount: number) => {
      if (!ctx.self.alive || ctx.self.hp <= 0 || hasState(ctx.self, "noHealing") || healthProtection(ctx.world, ctx.self).preventHealing) return;
      const d = derive(ctx.self), actual = healingReceived(amount * (1 + d.healingIncrease), ctx.self.statuses.some((s) => s.kind === "grievousWounds"));
      const excess = Math.max(0, actual - Math.max(0, d.maxHp - ctx.self.hp)); heal(ctx.world, ctx.self, amount);
      if (excess <= 0) return;
      const previous = ctx.self.statuses.find((s) => s.kind === "shield" && s.memoKey === "aph:severumShield")?.value ?? 0;
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "aph:severumShield");
      ctx.apply({ type: "shield", amount: { base: Math.min(sevShieldBase + sevShieldRatio * d.maxHp, previous + excess) }, duration: sevShieldSeconds }, true);
      const status = ctx.self.statuses.at(-1); if (status?.kind === "shield") status.memoKey = "aph:severumShield";
    };
    const sync = (ctx: HookContext) => {
      const weapon = main(ctx.self), waiting = Number(ctx.memory["aph:assembly"] ?? -1) > ctx.tick || weapon === 4 && !!ctx.memory["aph:crescWaiting"];
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== LOCK);
      if (waiting) { ctx.apply({ type: "state", state: "noAttacks", duration: Infinity }, true); ctx.self.statuses.at(-1)!.memoKey = LOCK; }
    };
    const spend = (ctx: HookContext, weapon: number, amount: number) => {
      const key = `aph:ammo:${weapon}`; ctx.memory[key] = Math.max(0, Number(ctx.memory[key] ?? ammo) - amount);
      if (Number(ctx.memory[key]) > 0 || ctx.memory["aph:assembly"] !== undefined) return;
      const reserve = JSON.parse(String(ctx.memory["aph:queue"])) as number[], next = reserve.shift()!; reserve.push(weapon);
      ctx.memory["aph:queue"] = JSON.stringify(reserve); ctx.memory["aph:next"] = next; ctx.memory["aph:assembly"] = ctx.tick + ticks(assembly);
      ctx.self.cooldownReady[`Q${WEAPONS[next]}`] = Math.max(ctx.self.cooldownReady[`Q${WEAPONS[next]}`] ?? 0, ctx.tick + ticks(assemblyLock));
      if (weapon === 4) { ctx.memory["aph:chakrams"] = 0; delete ctx.memory["aph:crescWaiting"]; }
      sync(ctx);
    };
    const addChakrams = (ctx: HookContext, count: number) => { if (Number(ctx.memory["aph:ammo:4"]) <= 0) return; ctx.memory["aph:chakrams"] = Math.min(cresMaximum, Number(ctx.memory["aph:chakrams"] ?? 0) + count); ctx.memory["aph:chakramUntil"] = ctx.tick + ticks(cresSeconds); };
    const applyMark = (ctx: HookContext, weapon: number, ultimate = false) => {
      if (weapon === 0) { ctx.apply({ type: "mark", key: CAL, duration: markSeconds }); const m = marked(ctx.enemy, ctx.self, CAL, ctx.tick); if (m) m.value = ultimate ? rMark : markBase; }
      if (weapon === 2) { if (ctx.enemy.spec.id === "Skarner" && hasState(ctx.enemy, "slowImmune") && ctx.enemy.action && "ability" in ctx.enemy.action && ctx.enemy.action.ability === "E") return; ctx.apply({ type: "mark", key: GRAV, duration: gravSeconds }); const m = marked(ctx.enemy, ctx.self, GRAV, ctx.tick); if (m) m.value = ultimate ? rRootSeconds : rootSeconds; ctx.apply({ type: "cc", cc: "slow", strength: ultimate ? rSlow : gravStrength, duration: gravSeconds }); const s = ctx.enemy.statuses.at(-1); if (s?.kind === "cc" && s.key === "slow") s.memoKey = "aph:gravSlow"; }
    };
    const parseTag = (attack?: AttackHitOptions) => (attack?.attackTag ?? "").split(":");
    const weaponEffects = (ctx: HookContext, attack: AttackHitOptions, blocked: boolean, hitScale = 1) => {
      if (blocked || hasState(ctx.enemy, "invulnerable")) return;
      const tag = parseTag(attack); if (tag[0] !== "aph") return;
      const weapon = Number(tag[1]), kind = tag[2];
      if (weapon === 4) ctx.memory[`aph:accepted:${attack.attackTag}`] = true;
      if (weapon === 2 || weapon === 0 && kind !== "basic" && kind !== "mark") applyMark(ctx, weapon, kind === "R");
      
      
      if (weapon === 3 && kind === "R") {
        for (const target of allTargets(ctx)) {
          if (target.petId === ctx.enemy.petId && target.side === ctx.enemy.side || !target.alive || Math.abs(target.x - ctx.enemy.x) > rSplashRadius + target.spec.base.radius || isUntargetable(target, ctx.self)) continue;
          const effects: Effect[] = [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: rSplashShare } }, amountFor: (u) => derive(u).ad * rSplashShare * (1 + rCritBonus * derive(u).critChance * (derive(u).critDamage - 1)), canCrit: false }];
          if (target.petId !== undefined) { const z = ctx.world.pets.find((z) => z.id === target.petId); if (z) petEffects(ctx.world, ctx.self, z, effects, "area", undefined, hitScale); }
          else for (const effect of effects) applyEffect(ctx.world, ctx.self, target, effect, { scale: hitScale });
        }
      }
      if (tag.includes("eclipse") && marked(ctx.enemy, ctx.self, GRAV, ctx.tick)) expunge(ctx);
    };
    const qCooldowns = [moon, onslaught, binding, dusk, sentry].map((a) => a.cooldown());
    const rCooldown = r.cooldown(), rCastTime = r.castTime(), rRadius = r.field("effectRadius"), petArmor = pet.stat("armor"), petMR = pet.stat("magicresist");
    const severumSpeed = sev!.quoted("92400");
    const shots: AbilitySpec[] = [];
    const dormant: AbilitySpec = { key: "Aphpending", name: "Weapon follow-up", slot: "other", cooldown: 0, castTime: 0, activation: "internal", usable: () => false, delivery: { kind: "self" }, onHit: [], roles: [], persistsAfterDeath: true };
    const bonusOnHit = (self: Unit, scale: number) => scale === 1 ? undefined : (self.spec.attack.onHit ?? []).map((e): Effect => e.type === "damage" ? { ...e, amount: { base: 0 }, amountFor: (u, v) => (e.amountFor?.(u, v) ?? evaluate(e.amount, u, v)) * scale } : e);
    const fire = (ctx: HookContext, target: Unit | Pet, weapon: number, kind: string, multiplier = 1, ultimate = false, mirrorCount = 0, origin = ctx.self.x, hitScale = 1) => {
      const isPet = "owner" in target, victim = isPet ? petFormulaTarget(target, ctx.self, ctx.tick) : target;
      const options: AttackHitOptions = { attackTag: `aph:${weapon}:${kind}:${mirrorCount}:${ctx.world.nextId}`, baseDamageScale: multiplier * (weapon === 3 ? infMultiplier : 1), critChance: derive(ctx.self).critChance, ...(ultimate ? { critMultiplier: 1 + rCritBonus * (derive(ctx.self).critDamage - 1) } : {}), ...(kind === "onslaught" ? { attackOnHitReplacement: bonusOnHit(ctx.self, onslaughtHitScale) } : {}) };
      const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "attack", seenTick: ctx.tick, x: origin, direction: victim.x >= origin ? 1 : -1, perTick: speed[weapon]! / 30, homing: true, travelLeft: Infinity, projectile: weapon !== 1 && (weapon !== 4 || kind !== "basic" && kind !== "mark"), connects: true, scale: hitScale, onHit: [], attack: { ...options, blinded: kind === "R" ? false : ctx.self.statuses.some((s) => s.kind === "cc" && s.key === "blind"), bonusOnHit: [] }, ...(isPet ? { pet: target.id } : {}) };
      if (weapon === 1) { if (isPet) { m.perTick = severumSpeed / 30; m.projectile = false; ctx.world.missiles.push(m); } else attackHit(ctx.world, ctx.self, victim, m.attack!.blinded, [], undefined, false, options, hitScale); }
      else { if (weapon === 4) m.acceleration = { perTick: cresAcceleration / 900, maxPerTick: cresInitial / 30, minPerTick: cresMinimum / 30 }; ctx.world.missiles.push(m); }
    };
    const pending = (ctx: HookContext, target: Unit | Pet | undefined, delay: number, kind: "dusk" | "R", weapon = -1, mirrors = 0, origin = ctx.self.x, hitScale = 1) => {
      // The initial spell packet may have killed and removed this pet before its
      // contact hook runs. A follow-up needs an actual surviving target.
      if (!target || ("owner" in target ? !ctx.world.pets.includes(target) || target.hp <= 0 : !target.alive)) return;
      const id = ctx.world.nextId++, isPet = "owner" in target;
      ctx.memory[`aph:pending:${id}`] = JSON.stringify({ kind, weapon, mirrors, origin, hitScale, target: isPet ? target.id : -1, due: ctx.tick + ticks(delay) });
      ctx.world.missiles.push({ id, owner: ctx.self.side, source: dormant.key, seenTick: ctx.tick, x: target.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, projectile: false, connects: false, scale: 1, onHit: [], expiresTick: ctx.tick + ticks(delay) + 1, impactTick: ctx.tick + ticks(delay), collisionDistanceLeft: 0 });
    };
    const expunge = (ctx: HookContext) => {
      const m = marked(ctx.enemy, ctx.self, GRAV, ctx.tick); if (!m || isUntargetable(ctx.enemy, ctx.self)) return;
      const duration = m.value; ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.source === ctx.self.side && (s.key === GRAV || s.memoKey === "aph:gravSlow")));
      const a = shots.find((a) => a.key === "QGravitum")!, effects: Effect[] = [{ type: "damage", damageType: "magic", amount: bindingDamage }, { type: "cc", cc: "root", duration }];
      if (ctx.enemy.petId !== undefined) { const z = ctx.world.pets.find((z) => z.id === ctx.enemy.petId); if (z) { z.statuses = ctx.enemy.statuses; abilityHitPet(ctx.world, ctx.self, z, a, effects); } }
      else abilityHit(ctx.world, ctx.self, ctx.enemy, a, effects);
    };
    const qData = [moon, onslaught, binding, dusk, sentry];
    const qRanges = [moon.field("targetRange"), onslaughtRange, Infinity, duskRange, sentryRange];
    const available = (self: Unit, world: World, weapon: number) => main(self) === weapon && self.memory["aph:assembly"] === undefined && Number(self.memory[`aph:ammo:${weapon}`]) > 0 && (weapon !== 2 || [world.units[1 - self.side]!, ...world.pets.filter((z) => z.owner !== self.side).map((z) => petFormulaTarget(z, self, world.tick))].some((u) => !!marked(u, self, GRAV, world.tick)) || world.missiles.some((m) => m.owner === self.side && parseTag(m.attack)[1] === "2"));
    for (let weapon = 0; weapon < WEAPONS.length; weapon++) {
      const a = qData[weapon]!;
      shots.push({ key: `Q${WEAPONS[weapon]}`, name: a.name, slot: "Q", budgetExcluded: true, cooldown: a.cooldown(), cost: mana, castTime: a.castTime(), ...(weapon === 1 ? { cooldownAfter: "channel" as const, channel: { duration: onslaughtSeconds, interruptible: false, mobile: true, cancelAfter: Infinity, cancelAttackOtherAfter: Infinity } } : {}), ...(weapon === 3 ? { castOrigin: "start" as const } : {}), delivery: weapon === 0 ? { kind: "line", range: qRanges[weapon]!, width: moon.field("width"), radius: moon.field("width") / 2, speed: moon.field("speed"), collisionPet: true } : weapon === 3 ? { kind: "area", near: 0, far: duskRange, delay: 0, anchor: "ground" } : { kind: "self" }, onHit: weapon === 0 ? [{ type: "damage", damageType: "physical", amount: moonDamage }] : weapon === 3 ? [{ type: "damage", damageType: "physical", amount: duskDamage }] : [], flags: { projectile: weapon === 0 || weapon === 3, spellShield: true, petContactHooks: true }, usable: (self, world) => available(self, world, weapon) && (weapon === 0 || weapon === 2 || Math.abs(world.units[1 - self.side]!.x - self.x) <= qRanges[weapon]! + world.units[1 - self.side]!.spec.base.radius), roles: weapon === 2 ? ["cc"] : ["damage"], estimate: weapon === 1 ? (self) => derive(self).ad * onslaughtDamage * Math.floor(onslaughtBase + onslaughtAS * derive(self).bonusAttackSpeed) : weapon === 4 ? (self, target) => evaluate(sentryDamage, self, target) : undefined, persistsAfterDeath: weapon === 0 || weapon === 3 });
    }
    const phaseSpec: AbilitySpec = { key: "W", name: phase.name, slot: "W", cooldown: switchCooldown, staticCooldown: true, castTime: 0, delivery: { kind: "self" }, onHit: [], roles: [], countsAsCast: false, activation: "toggle", overlay: true, preserveAttackWindup: true, usable: (self) => self.memory["aph:assembly"] === undefined && self.memory["aph:switch"] === undefined && !(self.action?.kind === "channel" && self.action.ability === "QSeverum") };
    for (let weapon = 0; weapon < WEAPONS.length; weapon++) {
      const initial: Formula = weapon === 3 ? { base: rDamage.base + rInfDamage.base, ratios: { ...rDamage.ratios, bonusAD: rDamage.ratios!.bonusAD! + rInfDamage.ratios!.bonusAD! } } : rDamage;
      shots.push({ key: `R${WEAPONS[weapon]}`, name: r.name, slot: "R", budgetExcluded: true, cooldownKey: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), castOrigin: "start", delivery: { kind: "line", range: r.field("targetRange"), width: rWidth, radius: rWidth / 2, speed: r.field("speed"), piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: initial }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: (self) => main(self) === weapon && !(self.action?.kind === "channel" && self.action.ability === "QSeverum"), roles: ["damage"], persistsAfterDeath: true, estimate: (self, target) => evaluate(initial, self, target) + derive(self).ad * (weapon === 3 ? infMultiplier : 1) * (1 + rCritBonus * derive(self).critChance * (derive(self).critDamage - 1)), estimateDelay: () => rDelay });
    }
    shots.push(phaseSpec, dormant, { ...dormant, key: "Aphreturn", name: "Returning Chakram" });
    const returning = (ctx: HookContext, missile: Missile, count: number, ordinary = false, guaranteedReturn = false) => {
      if (missile.intercepted) return;
      const id = ctx.world.nextId++; ctx.memory[`aph:return:${id}`] = JSON.stringify({ count, ordinary, start: ctx.tick + ticks(cresLinger), launch: Number(ctx.memory["aph:crescLaunch"] ?? ctx.tick), generation: Number(ctx.memory["aph:crescGeneration"] ?? 0) });
      ctx.world.missiles.push({ id, owner: ctx.self.side, source: "Aphreturn", seenTick: ctx.tick, x: missile.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, projectile: !guaranteedReturn, interceptable: !guaranteedReturn, connects: false, scale: 1, onHit: [], followOwner: true, collisionDistanceLeft: 0 });
    };
    const placeSentry = (ctx: HookContext, aim?: { direction: -1 | 1; distance?: number }) => {
      const direction = directionTo(ctx.self, ctx.enemy) * (aim?.direction ?? 1), wanted = ctx.self.x + direction * Math.min(sentryRange, aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x));
      // Placement is projectile-interceptible; no unpinned throw speed is invented.
      let x = wanted;
      const wall = ctx.world.zones.filter((z) => z.owner !== ctx.self.side && z.kind === "projectileWall" && z.startTick <= ctx.tick && z.endTick > ctx.tick && direction * (z.x - ctx.self.x) >= 0 && direction * (z.x - wanted) <= 0).sort((a, b) => direction * (a.x - b.x))[0];
      if (wall) x = wall.x - direction * turretRadius;
      if (!wall && projectileBlocked(ctx.world, ctx.self.side, ctx.self.x, wanted)) x = ctx.self.x;
      const intercept = projectileInterceptPoint(ctx.world, ctx.self.side, ctx.self.x, wanted);
      const destroyed = projectileBlockPoint(ctx.world, ctx.self.side, ctx.self.x, wanted);
      if (intercept !== undefined && (destroyed === undefined || Math.abs(intercept - ctx.self.x) < Math.abs(destroyed - ctx.self.x))) x = intercept - direction * turretRadius;
      const weapon = off(ctx.self);
      const spec: PetSpec = { kind: "sentry", name: pet.name, hp: sentryHP, armor: petArmor, mr: petMR, radius: turretRadius, moveSpeed: 0, duration: sentryDuration, untargetable: true, targetClass: "minion", fixedDamage: { rangedBasic: sentryBasicTaken, meleeBasic: sentryHP, singleTarget: sentrySpellTaken, area: sentrySpellTaken, persistent: sentrySpellTaken, proc: sentrySpellTaken, pet: sentryHP }, ccImmune: ["cripple", "silence", "slow", "root", "blind"],
        target: nearestPetTarget,
        effectsForHit({ world, pet: turret, target, effects }) { turret.memory.before = "owner" in target ? target.hp + (target.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0) : target.totals.damageTaken + target.totals.absorbed; return [...effects]; },
        onAttackHit({ world, pet: turret, target, blocked }) {
          if (blocked) return;
          const owner = world.units[turret.owner], victim = "owner" in target ? petFormulaTarget(target, owner, world.tick) : target, context = hookContext(world, owner, undefined, victim);
          const dealt = "owner" in target ? Math.max(0, Number(turret.memory.before ?? target.hp) - target.hp - (target.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0)) : Math.max(0, target.totals.damageTaken + target.totals.absorbed - Number(turret.memory.before ?? target.totals.damageTaken + target.totals.absorbed));
          if (weapon === 2 || weapon === 0 && dealt > 0) applyMark(context, weapon);
          if (weapon === 1 && dealt > 0) shieldHeal(context, dealt * sevAbility);
          if ("owner" in target) target.statuses = victim.statuses;
        },
      };
      const turret = spawnPet(ctx.world, ctx.self, spec, x); turret.memory.weapon = weapon; turret.memory.arm = ctx.tick + ticks(sentryArm);
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return undefined;
      const reaction = react(view); if (reaction) return reaction;
      if (view.self.action?.kind === "channel" && view.self.action.ability === "QSeverum") return view.distance > onslaughtCommandRange ? { kind: "move", direction: 1 } : undefined;
      const ordinary = defaultBehavior(view);
      if (view.mode === "flee" || view.self.memory.tradeDone || view.self.action && view.self.action.kind !== "windup") return ordinary;
      const current = shots.find((a) => a.key === `Q${WEAPONS[main(view.self)]}`)!;
      if (canCast(view.world, view.self, current) && (main(view.self) === 2 || inReach(current, view.self, view.enemy))) return { kind: "cast", ability: current.key };
      const alternate = shots.find((a) => a.key === `Q${WEAPONS[off(view.self)]}`)!;
      if (canCast(view.world, view.self, phaseSpec) && (view.self.cooldownReady[current.key] ?? 0) > view.world.tick && (view.self.cooldownReady[alternate.key] ?? 0) <= view.world.tick && Math.abs(view.enemy.x - view.self.x) <= qRanges[off(view.self)]! && !(off(view.self) === 2 && !marked(view.enemy, view.self, GRAV, view.world.tick))) return { kind: "cast", ability: "W" };
      return ordinary;
    };
    kit.assume("The finite starting policy searches the ten unordered full-50-Moonlight pairs (or pins startingWeapons 0..9), starts the lower listed index in the main hand, and keeps the canonical order of the other three reserves. All pairs are an explicit preduel weapon-preparation assumption permitted by usage-based rearrangement; no ammo-history Cartesian search, preduel marks, shields or mirror Chakrams are granted. Phase makes either held weapon accessible. Each depleted weapon joins the reserve tail and returns with full ammo.");
    kit.assume("All 18 stat skill points maximize the three six-rank passive tracks. Ability level bands cap at their last stated level; Severum healing explicitly caps at 18, while its listed shield table continues through 20. The five Q cooldowns remain independent; Onslaught starts its cooldown after its mobile attack channel. Ammunition is spent on basic declaration, including canceled windups, and each Q spends at most the remaining Moonlight.");
    kit.assume("Calibrum marks are actual-target and require a connected ability or replica hit. Consuming a mark uses the current off hand (main hand when Calibrum is off), consumes every actual enemy mark and spends no on-attack ammunition. Its distance-shortened cast formula is unavailable, so the pinned 0.3-second client override is used conservatively. Its invalid-target firing bug is not treated as permission to damage untargetable units. Mark reveal is ordinary sight, not true sight.");
    kit.assume("Crescendum outbound attacks bypass projectile interception, as pinned by Calibrum's special interaction note; returning blades are interceptible and loss clears all mirror stacks. The exact outbound deceleration and bonus-AS return speed are retained. The uncertain wiki attack-speed-limit note is enforced using the engine's shared attack-speed cap. Phase releases the ordinary return lock and catch resets apply only while Crescendum remains main. Returned ability Chakrams generate stacks only when caught; Onslaught's explicit blocked-Crescendum exception still returns a mirror.");
    kit.assume("Sentry uses the primary ability's 125 +52% bonus AD +50% AP maximum-level damage, superseding the conflicting older pet-infobox 100 +60% bonus AD. It snapshots the off hand at placement, arms for 0.35 seconds, activates for four seconds on the nearest actual visible enemy, and otherwise expires at twenty seconds. An unspecified melee basic is modeled as destroying its six-health body, matching ordinary level-20 melee attack damage rather than inventing a fractional hit. Its unpinned windup/throw flight is zero; its weapon projectile flight, fixed damage taken, block/dodge and owner-local healing are real. Sentries disappear on owner death under the shared pet lifecycle; launched sentry shots persist.");
    kit.assume("Infernum primary attacks receive the listed 110% AD. Its multi-bolt fan has no pinned transverse bolt directions or reliable lesser-bolt range; ordinary fan collateral is omitted rather than awarding every fan a guaranteed hit. Moonlight Vigil uses its separately specified 400-radius explosion once per actually connected primary attack; actual secondary targets may receive overlapping explosions, each with independently averaged ultimate critical damage. Duskwave's one-dimensional cone reaches actual forward targets once, testing interception along the cast-origin-to-target segment without an invented wave speed, and schedules their independently guarded off-hand attacks. R illuminates enemy champions and actual champion-class clones, snapshots its weapon at cast, and preserves shield-independent follow-up lock-on. Neither ordinary minion-class pets nor imaginary allied champions add R contacts or Chakrams.");
    kit.assume("A champion-initiated uncertain illumination carries its hit share through secondary initial blasts, delayed attacks, flat Severum healing and Infernum collateral. A first actual pet/clone collision is deterministic under the shared missile policy and normalizes the whole R illumination to one. Duskwave follows the contact share supplied by its actual champion/pet transaction. Calibrum Sentry marks require real HP or shield damage; zero-damage immunity and stale parried attack reports do not produce marks or Severum healing.");
    kit.assume("All manual weapon abilities are excluded from generic damage terms to avoid double-counting. The reference budget averages five Q packets and one base R over their real cooldowns, ordinary Infernum's extra tenth of AD, and Severum's basic healing. It never grants pre-existing Chakram DPS or guaranteed fan/collateral hits; finite duel combat retains actual ammunition, reserve assembly, mana, attack guards and missile defenses.");
    return {
      abilities: shots, behavior,
      start: [{ type: "stat", stat: "AD", amount: { base: statAD }, duration: Infinity }, { type: "stat", stat: "attackSpeed", amount: { base: statAS }, duration: Infinity }, { type: "stat", stat: "lethality", amount: { base: lethality }, duration: Infinity }],
      attack: { onHitToPets: true, bonusRangeFor: (self, target) => marked(target, self, CAL, Number(self.memory["aph:tick"] ?? 0)) ? markRange - self.spec.attack.range : main(self) === 0 ? calRange : 0 },
      budget: { attacks: false, damage(self, target) { const d = derive(self), critical = averageCritFactor(d.critChance, d.critDamage); const qDamage = evaluate(moonDamage, self, target) / cooldownAfterHaste(qCooldowns[0]!, d.abilityHaste) + evaluate(bindingDamage, self, target) / cooldownAfterHaste(qCooldowns[2]!, d.abilityHaste) + (evaluate(duskDamage, self, target) + d.ad * critical) / cooldownAfterHaste(qCooldowns[3]!, d.abilityHaste) + d.ad * onslaughtDamage * Math.floor(onslaughtBase + onslaughtAS * d.bonusAttackSpeed) * critical / (cooldownAfterHaste(qCooldowns[1]!, d.abilityHaste) + onslaughtSeconds) + evaluate(sentryDamage, self, target) / cooldownAfterHaste(qCooldowns[4]!, d.abilityHaste); return { physical: d.ad * d.attackSpeed * critical * (1 + (infMultiplier - 1) / WEAPONS.length) + (qDamage - evaluate(bindingDamage, self, target) / cooldownAfterHaste(qCooldowns[2]!, d.abilityHaste)) / WEAPONS.length + (evaluate(rDamage, self, target) + d.ad * (1 + rCritBonus * d.critChance * (d.critDamage - 1))) / (cooldownAfterHaste(rCooldown, d.abilityHaste) + rCastTime), magic: evaluate(bindingDamage, self, target) / cooldownAfterHaste(qCooldowns[2]!, d.abilityHaste) / WEAPONS.length }; }, healing(self) { const d = derive(self); return d.ad * d.attackSpeed * averageCritFactor(d.critChance, d.critDamage) * sevBasic / WEAPONS.length; } },
      hooks: {
        onStart(ctx) { ctx.memory["aph:main"] = starting[0]; ctx.memory["aph:off"] = starting[1]; ctx.memory["aph:queue"] = JSON.stringify(WEAPONS.map((_, i) => i).filter((i) => !starting.includes(i))); for (const i of WEAPONS.keys()) ctx.memory[`aph:ammo:${i}`] = ammo; ctx.memory["aph:chakrams"] = 0; ctx.memory["aph:tick"] = ctx.tick; },
        onTick(ctx) {
          ctx.memory["aph:tick"] = ctx.tick;
          if (ctx.memory["aph:assembly"] !== undefined && ctx.tick >= Number(ctx.memory["aph:assembly"])) { const weapon = Number(ctx.memory["aph:next"]); ctx.memory["aph:main"] = weapon; ctx.memory[`aph:ammo:${weapon}`] = ammo; delete ctx.memory["aph:assembly"]; delete ctx.memory["aph:next"]; }
          if (ctx.memory["aph:switch"] !== undefined && ctx.tick >= Number(ctx.memory["aph:switch"])) { const old = main(ctx.self); ctx.memory["aph:main"] = off(ctx.self); ctx.memory["aph:off"] = old; delete ctx.memory["aph:switch"]; delete ctx.memory["aph:crescWaiting"]; ctx.memory["aph:crescGeneration"] = Number(ctx.memory["aph:crescGeneration"] ?? 0) + 1; }
          if (ctx.tick >= Number(ctx.memory["aph:chakramUntil"] ?? Infinity)) ctx.memory["aph:chakrams"] = 0;
          sync(ctx);
          if (ctx.memory["aph:duskLock"] && !ctx.world.missiles.some((m) => m.owner === ctx.self.side && (parseTag(m.attack)[2] === "dusk" || typeof ctx.memory[`aph:pending:${m.id}`] === "string" && String(ctx.memory[`aph:pending:${m.id}`]).includes('"kind":"dusk"')))) { delete ctx.memory["aph:duskLock"]; ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "aph:duskLock"); }
          for (const target of allTargets(ctx)) {
            const mark = marked(target, ctx.self, GRAV, ctx.tick); if (!mark) continue;
            if (!target.statuses.some((s) => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.memoKey === "aph:gravSlow") && ctx.tick - mark.startTick > 0 && !hasState(target, "slowImmune") && !hasState(target, "ccImmune")) { applyEffect(ctx.world, ctx.self, target, { type: "cc", cc: "slow", strength: ctx.tick - mark.startTick < ticks(gravDecay) ? (mark.value === rRootSeconds ? rSlow : gravStrength) : gravResidual, duration: (mark.endTick - ctx.tick) / 30 }, { scale: 1 }); const s = target.statuses.at(-1); if (s?.key === "slow") s.memoKey = "aph:gravSlow"; }
            if (ctx.tick - mark.startTick >= ticks(gravDecay)) for (const s of target.statuses) if (s.memoKey === "aph:gravSlow" && s.source === ctx.self.side) s.value = gravResidual;
            if (target.petId !== undefined) { const actual = ctx.world.pets.find((z) => z.id === target.petId); if (actual) actual.statuses = target.statuses; }
          }
          const channel = ctx.self.action;
          if (channel?.kind === "channel" && channel.ability === "QSeverum") {
            const total = Number(ctx.memory["aph:onslaughtTotal"]), done = Number(ctx.memory["aph:onslaughtDone"] ?? 0);
            if (done < total && ctx.tick >= channel.startTick + Math.floor(done * ticks(onslaughtSeconds) / total)) {
              ctx.memory["aph:onslaughtDone"] = done + 1;
              const disabled = ctx.self.statuses.some((s) => s.kind === "cc" && CC_RULES[s.key as keyof typeof CC_RULES]?.attacking === "disabled" || s.kind === "state" && s.key === "noAttacks" && s.memoKey !== "aph:onslaughtLock" && s.memoKey !== LOCK);
              const target = ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= onslaughtRange + ctx.enemy.spec.base.radius ? ctx.enemy : ctx.world.pets.filter((z) => z.owner !== ctx.self.side && !z.spec.untargetable && canTarget(petFormulaTarget(z, ctx.self, ctx.tick), ctx.self) && Math.abs(z.x - ctx.self.x) <= onslaughtRange + z.spec.radius).sort((a, b) => Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x) || a.id - b.id)[0];
              if (!disabled && target) { const weapon = done % 2 === 0 ? off(ctx.self) : 1; fire(ctx, target, weapon, "onslaught", onslaughtDamage);  }
            }
          }
          for (const turret of ctx.world.pets.filter((z) => z.owner === ctx.self.side && z.spec.kind === "sentry")) {
            const target = nearestPetTarget(ctx.world, turret); if (ctx.tick < Number(turret.memory.arm) || !target || Math.abs(target.x - turret.x) > turretRange + ("owner" in target ? target.spec.radius : target.spec.base.radius)) continue;
            if (turret.spec.untargetable) { turret.spec = { ...turret.spec, untargetable: false }; turret.endTick = Math.min(turret.endTick, ctx.tick + ticks(sentryActive)); }
            const weapon = Number(turret.memory.weapon), d = derive(ctx.self);
            turret.spec = { ...turret.spec, attack: { range: turretRange, interval: 1 / (turretAS * (1 + d.bonusAttackSpeed)), attackLike: true, projectile: weapon !== 1 && weapon !== 4, ...(weapon === 1 ? {} : { missileSpeed: speed[weapon] }), effects: [{ type: "damage", damageType: "physical", amount: sentryDamage, amountFor: (u, v) => evaluate(sentryDamage, u, v) * averageCritFactor(derive(u).critChance, sentryCrit) * (weapon === 3 ? infMultiplier : 1) }] } };
          }
        },
        onAttack(ctx) {
          const markedTarget = marked(ctx.enemy, ctx.self, CAL, ctx.tick), weapon = markedTarget ? (off(ctx.self) === 0 ? main(ctx.self) : off(ctx.self)) : main(ctx.self), action = ctx.action;
          action.attackTag = `aph:${weapon}:${markedTarget ? "mark" : "basic"}`;
          action.missileSpeed = markedTarget ? speed[0] : speed[weapon]; action.baseDamageScale = weapon === 3 ? infMultiplier : 1;
          if (markedTarget) {
            let base = 0, normal = 0;
            for (const target of allTargets(ctx)) { const mark = marked(target, ctx.self, CAL, ctx.tick); if (!mark) continue; if (mark.value === rMark) base += rMark; else { base += markBase; normal++; } target.statuses = target.statuses.filter((s) => s !== mark); if (target.petId !== undefined) { const z = ctx.world.pets.find((z) => z.id === target.petId); if (z) z.statuses = target.statuses; } }
            action.bonusPhysical = { base, ratios: { bonusAD: normal * markRatio } }; action.uncancellable = true; action.launchTick = ctx.tick + ticks(markCast);
          } else spend(ctx, weapon, basicAmmo);
          if (weapon === 1) { action.missileSpeed = 0; action.uncancellable = true; }
          if (weapon === 4) { if (ctx.enemy.petId === undefined) ctx.memory["aph:chakramUntil"] = ctx.tick + ticks(cresSeconds); const chance = action.critChance ?? derive(ctx.self).critChance, share = cresWindup + (cresCritWindup - cresWindup) * chance; action.launchTick = ctx.tick + Math.max(1, Math.round(30 * share / derive(ctx.self).attackSpeed)); const stacks = Math.min(cresMaximum, Number(ctx.memory["aph:chakrams"] ?? 0)); action.baseDamageScale = 1 + Number(cresTable[stacks] ?? 0) / 100; }
        },
        onAttackLaunch(ctx) {
          const tag = parseTag(ctx.action); if (tag[1] !== "4") return;
          if (tag[2] === "basic") ctx.memory["aph:crescWaiting"] = true; ctx.memory["aph:crescLaunch"] = ctx.tick; sync(ctx);
          const target = ctx.targetPet ?? ctx.enemy, before = ctx.world.nextId;
          fire(ctx, target, 4, tag[2]!, ctx.action.baseDamageScale ?? 1);
          const missile = ctx.world.missiles.find((m) => m.id === before); if (missile?.attack) { missile.attack = { ...missile.attack, critChance: ctx.action.critChance, baseDamageScale: ctx.action.baseDamageScale, bonusPhysical: ctx.action.bonusPhysical, critMultiplier: ctx.action.critMultiplier, attackTag: ctx.action.attackTag, spellShield: ctx.action.spellShield, attackOnHitReplacement: ctx.action.attackOnHitReplacement, blinded: ctx.action.blinded, bonusOnHit: ctx.action.onHit }; }
          return false;
        },
        onAttackBeforeDamage(ctx) { if (ctx.pet) ctx.memory[`aph:severumPetBefore:${ctx.pet.id}`] = ctx.pet.hp + (ctx.pet.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0); const tag = parseTag(ctx.attack); ctx.memory["aph:packetWeapon"] = tag[0] === "aph" ? Number(tag[1]) : -1; ctx.memory["aph:packetAbility"] = tag[2] !== "basic"; },
        onAttackHit(ctx) { weaponEffects(ctx, ctx.attack, ctx.blocked, ctx.scale); },
        onAttackPetHit(ctx) {
          const tag = parseTag(ctx.attack), key = `aph:severumPetBefore:${ctx.pet.id}`, before = ctx.memory[key]; delete ctx.memory[key];
          if (tag[0] === "aph" && tag[1] === "1" && !ctx.blocked && typeof before === "number") { const after = ctx.pet.hp + (ctx.enemy.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0); shieldHeal(ctx, Math.max(0, before - after) * (tag[2] === "basic" ? sevBasic : sevAbility)); }
          weaponEffects(ctx, ctx.attack, ctx.blocked, ctx.scale);
        },
        onAttackResolved(ctx) { ctx.memory["aph:packetWeapon"] = -1; },
        onDamageDealt(ctx) { if (ctx.amount + ctx.absorbed > 0 && Number(ctx.memory["aph:packetWeapon"]) === 1 && (ctx.attack || ctx.ability === r.name) && !ctx.petSource) shieldHeal(ctx, ctx.mitigated * (ctx.memory["aph:packetAbility"] ? sevAbility : sevBasic)); },
        onCastStart(ctx) { if (ctx.ability.key === "QInfernum") ctx.memory["aph:duskOrigin"] = ctx.self.x; if (ctx.ability.key.startsWith("Q")) spend(ctx, main(ctx.self), qAmmo); },
        onCast(ctx) {
          if (ctx.ability.key === "W") ctx.memory["aph:switch"] = ctx.tick + ticks(switchSeconds);
          if (ctx.ability.key === "QCrescendum") placeSentry(ctx, ctx.aim);
          if (ctx.ability.key === "QSeverum") { ctx.memory["aph:onslaughtTotal"] = Math.floor(onslaughtBase + onslaughtAS * derive(ctx.self).bonusAttackSpeed); ctx.memory["aph:onslaughtDone"] = 0; ctx.apply({ type: "state", state: "noAttacks", duration: onslaughtSeconds }, true); ctx.self.statuses.at(-1)!.memoKey = "aph:onslaughtLock"; ctx.buff("aph:onslaughtRange", "attackRange", onslaughtCommandRange - ctx.self.spec.attack.range, onslaughtSeconds); ctx.buff("aph:onslaughtMS", "moveSpeedPercent", onslaughtMove + onslaughtAP * derive(ctx.self).ap, onslaughtSeconds); }
          if (ctx.ability.key === "QGravitum") { for (const target of allTargets(ctx)) expunge(hookContext(ctx.world, ctx.self, undefined, target)); for (const m of ctx.world.missiles) if (m.owner === ctx.self.side && parseTag(m.attack)[1] === "2" && m.attack) m.attack.attackTag += ":eclipse"; }
          if (ctx.ability.key === "QInfernum") { ctx.apply({ type: "state", state: "noAttacks", duration: Infinity }, true); ctx.self.statuses.at(-1)!.memoKey = "aph:duskLock"; ctx.memory["aph:duskLock"] = true; }
        },
        onAbilityContact(ctx) { if (ctx.ability.key === "QInfernum" && projectileBlocked(ctx.world, ctx.self.side, Number(ctx.memory["aph:duskOrigin"] ?? ctx.self.x), ctx.enemy.x)) return []; if (ctx.ability.key.startsWith("R")) { const weapon = WEAPONS.findIndex((name) => ctx.ability.key === `R${name}`); if (ctx.enemy.petId !== undefined && ctx.world.pets.find((z) => z.id === ctx.enemy.petId)?.spec.targetClass !== "champion") return []; ctx.memory["aph:packetWeapon"] = weapon; ctx.memory["aph:packetAbility"] = true; } },
        beforeAbilityHit(ctx) { if (ctx.ability.key === "RSeverum" && ctx.enemy.petId !== undefined) { const target = ctx.world.pets.find((p) => p.id === ctx.enemy.petId); if (target) ctx.memory[`aph:severumBlastBefore:${target.id}`] = target.hp + (target.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0); } },
        onAbilityHit(ctx) { if (ctx.ability.key === "RSeverum" && ctx.enemy.petId !== undefined) { const key = `aph:severumBlastBefore:${ctx.enemy.petId}`, before = ctx.memory[key]; delete ctx.memory[key]; const target = ctx.world.pets.find((p) => p.id === ctx.enemy.petId); const after = target ? target.hp + (target.statuses ?? []).reduce((n, s) => n + (s.kind === "shield" ? s.value : 0), 0) : ctx.enemy.hp; if (typeof before === "number") shieldHeal(ctx, Math.max(0, before - after) * sevAbility); } if (ctx.ability.key === "QCalibrum" && !hasState(ctx.enemy, "invulnerable")) applyMark(ctx, 0); if (ctx.ability.key === "QInfernum") pending(ctx, ctx.enemy.petId === undefined ? ctx.enemy : ctx.world.pets.find((z) => z.id === ctx.enemy.petId), duskDelay, "dusk", -1, 0, ctx.self.x, ctx.scale); },
        onMissileContact(ctx) {
          const m = ctx.missile, tag = parseTag(m.attack);
          if (tag[0] === "aph" && tag[1] === "4") { const accepted = ctx.memory[`aph:accepted:${m.attack?.attackTag}`]; delete ctx.memory[`aph:accepted:${m.attack?.attackTag}`]; returning(ctx, m, tag[2] === "basic" ? 0 : accepted ? tag[2] === "R" ? Number(tag[3]) : 1 : 0, tag[2] === "basic"); }
          if (!m.source.startsWith("R")) return;
          if (ctx.targetPet && ctx.targetPet.spec.targetClass !== "champion") return;
          m.ended = true; const weapon = WEAPONS.findIndex((name) => m.source === `R${name}`); if (weapon < 0) return;
          const illuminationScale = ctx.targetPet ? 1 : m.scale;
          const champion = ctx.world.units[1 - ctx.self.side]!;
          const targets: Array<Unit | Pet> = [...(champion.alive && Math.abs(champion.x - m.x) <= rRadius + champion.spec.base.radius ? [champion] : []), ...ctx.world.pets.filter((z) => z.owner !== ctx.self.side && z.spec.targetClass === "champion" && Math.abs(z.x - m.x) <= rRadius + z.spec.radius)];
          // The real collided champion is always included, including a clone.
          if (ctx.targetPet && !targets.includes(ctx.targetPet)) targets.push(ctx.targetPet);
          if (ctx.targetPet) targets.sort((a, b) => a === ctx.targetPet ? -1 : b === ctx.targetPet ? 1 : 0);
          for (const [index, target] of targets.entries()) {
            if (target !== ctx.targetPet && !("side" in target && ctx.enemy.petId === undefined)) { const a = shots.find((a) => a.key === m.source)!; if ("owner" in target) abilityHitPet(ctx.world, ctx.self, target, a, a.onHit!, "area", illuminationScale); else abilityHit(ctx.world, ctx.self, target, a, a.onHit!, illuminationScale); }
            if ("owner" in target ? target.hp > 0 : target.alive) pending(ctx, target, rDelay, "R", weapon, index === 0 ? rChakrams : 1, m.x, illuminationScale);
          }
          if (weapon === 1 && targets.length) shieldHeal(ctx, rHeal * illuminationScale);
        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source === "Aphpending") { const raw = ctx.memory[`aph:pending:${m.id}`]; if (typeof raw !== "string") { m.ended = true; return; } const task = JSON.parse(raw) as { due: number; target: number; kind: "dusk" | "R"; weapon: number; mirrors: number; origin: number; hitScale: number }; if (ctx.tick < task.due) return; delete ctx.memory[`aph:pending:${m.id}`]; m.ended = true; const target = task.target < 0 ? ctx.world.units[1 - ctx.self.side]! : ctx.world.pets.find((z) => z.id === task.target); if (target && ("alive" in target ? target.alive : target.hp > 0)) fire(ctx, target, task.kind === "dusk" ? off(ctx.self) : task.weapon, task.kind, 1, task.kind === "R", task.mirrors, task.kind === "R" ? task.origin : ctx.self.x, task.hitScale); }
          if (m.source === "Aphreturn") { const raw = ctx.memory[`aph:return:${m.id}`]; if (typeof raw !== "string") return; const task = JSON.parse(raw) as { start: number }; if (ctx.tick >= task.start) m.perTick = (cresReturn + cresReturnRatio * derive(ctx.self).bonusAttackSpeed) / 30; }
        },
        onMissileEnd(ctx) {
          const m = ctx.missile, tag = parseTag(m.attack);
          if (ctx.reason === "blocked" && tag[1] === "4" && tag[2] === "onslaught") returning(ctx, m, 1, false, true);
          if ((ctx.reason === "blocked" || ctx.reason === "intercepted") && (m.source === "Aphreturn" || tag[1] === "4" && tag[2] !== "onslaught")) { ctx.memory["aph:chakrams"] = 0; delete ctx.memory["aph:crescWaiting"]; sync(ctx); }
          if (m.source !== "Aphreturn") return;
          const raw = ctx.memory[`aph:return:${m.id}`]; delete ctx.memory[`aph:return:${m.id}`]; if (ctx.reason !== "owner" || typeof raw !== "string") return;
          const task = JSON.parse(raw) as { count: number; ordinary: boolean; launch: number; generation: number }; if (task.count) addChakrams(ctx, task.count);
          if (task.ordinary && main(ctx.self) === 4 && task.generation === Number(ctx.memory["aph:crescGeneration"] ?? 0)) { delete ctx.memory["aph:crescWaiting"]; ctx.self.attackReadyTick = Math.max(ctx.tick, task.launch + ticks(1 / Math.max(ATTACK_SPEED_CAP, ...ctx.self.statuses.filter((s) => s.kind === "stat" && s.key === "attackSpeedCap").map((s) => s.value)))); sync(ctx); }
        },
      },
    };
  },
};
export default aphelios;
