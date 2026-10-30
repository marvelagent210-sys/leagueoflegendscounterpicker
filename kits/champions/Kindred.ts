/** Kindred's hunted targets, individual arrows, real Wolf and shared sacred ground. */
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, EPSILON } from "../../engine/sim/actions";
import { applyEffect, canSee, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { healthProtectionEligible } from "../../engine/sim/healthProtection";
import { derive, evaluate } from "../../engine/sim/derived";
import { terrainLimit } from "../../engine/sim/terrain";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { destroyPet, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, FOREVER, missingShare, seriesAt, ticks } from "./util";

const MARKS = "kindred:marks", DREAD = "kindred:dread", VIGOR = "kindred:vigor", WSTART = "kindred:wStart", WEND = "kindred:wEnd", LAST = "kindred:lastTarget";
const kindred: KitModule = {
  champion: "Kindred",
  options: {
    marks: { label: "Marks of the Kindred collected before the duel (explicit farm/takedown history)", default: 0 },
    targetMarked: { label: "Enemy champion already hunted before the duel (0/1)", default: 0 },
  },
  build(kit, options) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const ranges = p.seriesIn("bonus range on her basic attacks"), firstMark = p.quoted("formula=+75 at 4 stacks", 1), huntDelay = p.quoted("after an 8-second delay"), huntWait = p.quoted("every 75 seconds"), combatWait = p.quoted("last 6 seconds"), huntLock = p.field("targetCooldown");
    p.quote("Scoring a takedown against a hunted target collects a stack"); p.quote("Only killing the large monster is required");
    const qDamage = q.formula("Physical Damage"), qAS = q.quoted("gaining 35% (+ 5% per mark)") / 100, qMarkAS = q.quoted("gaining 35% (+ 5% per mark)", 1) / 100, qSeconds = q.quoted("bonus attack speed for 4 seconds"), qTargets = q.quoted("up to 3 nearby"), qDash = q.field("targetRange", "Maximum dash distance"), qDashBaseSpeed = q.field("speed"), qSpeedRatio = q.fieldNumbers("speed")[1]! / 100, qInnerCD = q.number("Static Cooldown"), qCD = q.cooldown(), qMissileSpeed = q.gameQuoted('"missileSpeed":1600.0');
    q.quote("resets Lamb's basic attack timer"); q.quote("cast any of her abilities during the dash"); q.quote("current attack target within any proximity"); q.quote("The cooldown will not be modified if it cannot be reduced"); q.field("effectRadius");
    const wDuration = w.quoted("next 8.5 seconds"), wRadius = w.field("effectRadius"), wRange = w.field("targetRange"), wDashSpeed = w.field("speed"), wCD = w.cooldown(), wScale = w.quoted("25% of Kindred's bonus attack speed") / 100, wFlat = w.formulaPart("Magic Damage", ["bonusAD", "AP"]), wHealth = w.quoted("(+ 1.5% (+ 1% per mark)") / 100, wMarkHealth = w.quoted("(+ 1.5% (+ 1% per mark)", 1) / 100;
    const wMonsterFlat = w.formulaPart("Monster Damage", ["bonusAD", "AP"]), wMonsterScale = w.quoted("deal 165% damage") / 100, wMonsterCap = w.quoted("capped at 112.5 (+ 15 per mark)"), wMonsterMarkCap = w.quoted("capped at 112.5 (+ 15 per mark)", 1), wMonsterSlow = w.quoted("by 50% for 2 seconds") / 100, wMonsterSlowTime = w.quoted("by 50% for 2 seconds", 1);
    const vigorMove = w.quoted("every 27 units"), vigorAttack = w.quoted("5 stacks on-attack"), vigorMax = w.quoted("maximum of 100 stacks"), vigorHeal = w.at20(w.seriesIn("of 47 – 81", 1), "Hunter's Vigor heal"), vigorMissingCap = w.quoted("capped at 80%") / 100;
    w.quote("Wolf's Frenzy ends immediately if Lamb leaves the area or dies"); w.quote("prioritizing the last enemy Lamb has attacked, then enemy champions, then non-champions"); w.quote("Wolf is untargetable and ghosted"); w.quote("applies ability haste to its cooldown post-effect");
    const wolfAS = w.gameQuoted('"attackSpeedModifiable":{"baseValue":0.5580000281333923'), wolfRange = w.gameQuoted('"attackRangeModifiable":{"baseValue":200.0'), wolfMove = w.gameQuoted('"baseMoveSpeedModifiable":{"baseValue":275.0'), wolfHP = w.gameQuoted('"baseHPModifiable":{"baseValue":300.0'), wolfArmor = w.gameQuoted('"baseArmorModifiable":{"baseValue":13.0'), wolfMR = w.gameQuoted('"baseMR":{"baseValue":30.0'), wolfRadius = w.gameQuoted('"selectionRadius":0.0'), wolfWindup = w.gameQuoted('"spellCastTime":0.31610000133514404');
    const eBase = e.formulaPart("Additional Physical Damage", ["bonusAD"]), eMissing = e.quoted("(+ 5% (+ 0.5% per Mark)") / 100, eMarkMissing = e.quoted("(+ 5% (+ 0.5% per Mark)", 1) / 100, eStacks = e.quoted("stacking up to 3 times"), eSeconds = e.quoted("marks them for 4 seconds"), eSlowSeconds = e.quoted("for 1.5 seconds"), eSlow = e.quoted("slows them by 30% (+ 5% per 100 AP)") / 100, eSlowAP = e.quoted("slows them by 30% (+ 5% per 100 AP)", 1) / 10000, eCrit = e.quoted("{{critical damage|0 to 50|critScaling=true}}", 1) / 100, eSpeed = e.gameQuoted('"missileSpeed":1600.0', 0, "Characters/Kindred/Spells/KindredEWrapperAbility/KindredE"), eBiteSpeed = e.gameQuoted('"missileSpeed":2000.0'), eMonsterCap = e.quoted("capped at 200 against monsters");
    e.gameQuote('"mStat":8,"mDataValue":"CritMod"'); e.gameQuote('"mStat":9,"mCoefficient":1.0'); e.quote("This ability cannot target a unit with Mounting Dread stacks");
    const rDuration = r.quoted("lasts for 4 seconds"), rFloor = r.quoted("equal to 10% of their maximum health") / 100, rRadius = r.field("effectRadius"), rHeal = r.formula("Heal");
    r.quote("cannot be healed, but can still regenerate health"); r.quote("All targetable units within the zone are healed when the blessing ends"); r.quote("effects are applied before the cast time"); r.quote("Health costs will ignore"); r.quote("no effect on zombie state or clone units"); r.quote("affect untargetable units"); r.textField("cooldownStart");
    const marks = (self: Unit) => Number(self.memory[MARKS] ?? Math.max(0, Math.floor(options.marks!)));
    const rangeBonus = (n: number) => n < firstMark ? 0 : seriesAt(ranges, n, false);
    const activeWolf = (self: Unit, world: HookContext["world"]) => world.pets.find((pet) => pet.owner === self.side && pet.spec.kind === "kindredWolf" && pet.endTick > world.tick);
    const inWolf = (self: Unit, world: HookContext["world"]) => { const pet = activeWolf(self, world); return !!pet && Math.abs(self.x - Number(pet.memory.center)) <= wRadius + EPSILON; };
    const wDamage = (self: Unit, target: Unit) => evaluate(wFlat, self, target) + (wHealth + wMarkHealth * marks(self)) * target.hp;
    const biteDamage = (self: Unit, target: Unit, monster = false) => (evaluate(eBase, self, target) + Math.min(monster ? eMonsterCap : Infinity, (eMissing + eMarkMissing * marks(self)) * Math.max(0, derive(target).maxHp - target.hp))) * (1 + derive(self).critChance * eCrit * (derive(self).critDamage - 1));
    const targetVisible = (target: Unit, self: Unit) => target.alive && canSee(target, self) && !isUntargetable(target, self) && !inStasis(target);
    const contacts = (ctx: HookContext) => [
      ...(targetVisible(ctx.enemy, ctx.self) ? [{ target: ctx.enemy, id: -1, pet: undefined as Pet | undefined }] : []),
      ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), id: pet.id, pet })).filter(({ target }) => targetVisible(target, ctx.self)),
    ];
    const arrow: AbilitySpec = { key: "Qarrow", name: `${q.name} (arrow)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage, petDamageCategory: "area" }], usable: () => false, budgetExcluded: true, persistsAfterDeath: true };
    const bite: AbilitySpec = { key: "Ebite", name: `${e.name} (Wolf's pounce)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: eBase, amountFor: biteDamage, petDamageCategory: "singleTarget" }], usable: () => false, budgetExcluded: true, persistsAfterDeath: true };
    const launch = (ctx: HookContext, ability: AbilitySpec, target: Unit, pet: Pet | undefined, speed: number) => ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: ability.key, seenTick: ctx.tick, x: ctx.self.x, perTick: speed / 30, homing: true, direction: target.x >= ctx.self.x ? 1 : -1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: ability.onHit ?? [], ...(pet ? { pet: pet.id } : {}) });
    const arrows = (ctx: HookContext) => { const preferred = Number(ctx.memory[LAST] ?? -1), range = attackRange(ctx.self); for (const hit of contacts(ctx).filter(({ target }) => Math.abs(target.x - ctx.self.x) <= range + ctx.self.spec.base.radius + target.spec.base.radius + EPSILON).sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred) || Math.abs(a.target.x - ctx.self.x) - Math.abs(b.target.x - ctx.self.x) || a.id - b.id).slice(0, qTargets)) launch(ctx, arrow, hit.target, hit.pet, qMissileSpeed); };
    const dread = (ctx: HookContext & { blocked: boolean; scale: number }, pet?: Pet) => {
      ctx.memory[LAST] = pet?.id ?? -1;
      if (!pet) ctx.memory["kindred:lastCombat"] = ctx.tick;
      if (ctx.blocked) return;
      const mark = ctx.enemy.statuses.find((s) => s.kind === "mark" && s.key === DREAD && s.source === ctx.self.side && s.endTick > ctx.tick);
      if (!mark) return;
      mark.value += ctx.scale; mark.endTick = ctx.tick + ticks(eSeconds);
      if (mark.value + EPSILON >= eStacks) { ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== mark); if (pet) pet.statuses = ctx.enemy.statuses; launch(ctx, bite, ctx.enemy, pet, eBiteSpeed); }
    };
    const endWolf = (ctx: HookContext, pet: Pet) => {
      destroyPet(ctx.world, pet); const elapsed = (ctx.tick - Number(ctx.memory[WSTART] ?? ctx.tick)) / 30;
      ctx.self.cooldownReady.W = ctx.tick + ticks(Math.max(0, wCD - elapsed) / (1 + derive(ctx.self).abilityHaste / 100)); delete ctx.memory[WEND];
    };
    const abilities: AbilitySpec[] = [
      { key: "I", name: `${p.name} (select hunt)`, slot: "I", countsAsCast: false, cooldown: huntWait, staticCooldown: true, castTime: 0, delivery: { kind: "self" }, usable: (self, world) => world.tick >= Number(self.memory["kindred:lastCombat"] ?? -Infinity) + ticks(combatWait) && self.memory["kindred:huntAt"] === undefined && world.tick >= Number(self.memory["kindred:huntLock"] ?? 0), roles: ["buff"], budgetExcluded: true },
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: q.castTime(), overlay: true, usable: (self) => self.action?.kind !== "cast", delivery: { kind: "dash", direction: "toward", distance: qDash, minDistance: 0, speed: qDashBaseSpeed, speedFor: (self) => qDashBaseSpeed + qSpeedRatio * derive(self).moveSpeed, crossTerrain: true }, onSelf: [{ type: "resetAttack" }], flags: { grounded: true, knockdown: true }, roles: ["damage", "engage", "escape"], budgetExcluded: true, estimate: (self, target) => evaluate(qDamage, self, target) },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, usable: (self, world) => self.action?.kind !== "cast" && !activeWolf(self, world), roles: ["damage", "buff"], budgetExcluded: true, estimate: wDamage },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cooldownAtCastStart: true, cancelOnInvalidTarget: true, overlay: true, delivery: { kind: "target", range: e.fieldNumbers("targetRange")[0]!, rangeFor: (self) => self.spec.attack.range + rangeBonus(marks(self)), edge: true, missileSpeed: eSpeed }, flags: { projectile: true, spellShield: true, parry: true, petContactHooks: true }, onHit: [{ type: "mark", key: DREAD, duration: eSeconds, value: 0 }], usable: (self, world) => self.action?.kind !== "cast" && !world.units[1 - self.side]!.statuses.some((s) => s.kind === "mark" && s.key === DREAD && s.source === self.side && s.endTick > world.tick), roles: ["damage", "cc"], estimate: biteDamage, budgetExcluded: true },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "self" }, usable: (self) => self.action?.kind !== "cast" && !isUntargetable(self, self), roles: ["defense"], persistsAfterDeath: true }, arrow, bite,
    ];
    kit.assume("Before-duel marks and an already-hunted opponent are explicit options, both zero by default. Selecting a hunt is an actual non-cast HUD action with its75-second selection clock and8-second arming delay, permitted only after6 seconds out of champion combat. Only killing the genuinely hunted champion adds one mark; no jungle, farm kills or allied takedowns are created. Range follows the pinned4/7/.../25-mark breakpoints and caps at250.");
    kit.assume("Dance of Arrows dashes up to300 units using the wiki's estimated500+100%movement-speed travel rate, grants35%+5%per-mark AS for4 seconds and resets attacks at declaration. Each of at most three distinct visible nearby real targets gets one1600-speed homing area arrow after the dash; an isolated champion receives exactly one arrow. Current basic target is preferred. The wiki's400-unit wall extension has no automatic endpoint search in the one-dimensional terrain model. Q inside a real Wolf territory uses a2-second static cooldown; W only lowers an existing longer Q cooldown to2 seconds.");
    kit.assume("Wolf occupies a real fixed800-radius territory after the1400-speed initial dash to a caller-selected point up to500 units away. The exact16.20 companion CharacterRecord supplies0.5580000281 baseAS,200 reach,275 walk speed and0.3161000013-second base attack cast. His attack rate is baseAS*(1+25%Lamb bonusAS), with proportional windup scaling. No player level-growth stats are invented for this temporary unit. Target priority is Lamb's most recent basic target, champion, then nearest real summon. Wolf's untargetable attacks are area spell packets and do not trigger Lamb on-hits; explicit monster summons alone take165% damage, a capped health component and50% slow for2 seconds; terrain blocks his ordinary walking. Leaving territory or death ends him and starts(max(0,14-elapsed))/haste seconds of remaining W cooldown.");
    kit.assume("Hunter's Vigor begins empty, earns fractional movement progress at the wiki's estimated27 units/stack and5 stacks on declared attack, and heals on an accepted ordinary hit when capped. Its heal is85 at level20 times min(1,missingShare/0.8); it is not spent at full health. No structures or wards are supplied as healing targets.");
    kit.assume("Mounting Dread's initial projectile applies the slow and a target-local4-second mark; three accepted damaging basics refresh then consume it, releasing a separate2000-speed Wolf pounce. Each pounce reads the contacted unit's actual missing health. The current pinned4078261 template replaced the old low-health execute-critical rule with continuous critical scaling: full bite*(1+critChance*0.5*(critDamage-1)), confirmed by BaseBiteDamage/PercentBiteDamage in16.20. No obsolete health execute threshold is invented. Real pets use single-target bite damage; Only summons explicitly sourced as monsters receive the200 missing-health cap; ordinary summons keep the full ratio. The initial cast revalidates visibility, targetability and range; invalidation spends no mana but retains its normal cooldown.");
    kit.assume("Lamb's Respite creates a fixed535-radius shared zone at declaration for4 seconds, before its0.25-second cast lock. All eligible units on either side receive a10%maxHP floor before lethal processing and cannot receive healing at the floor, including lifesteal, while regeneration remains allowed. Final375 healing goes only to targetable units still inside after protection expires. Source conflict: the primary wiki radius535 differs from game AoERadius530; the pinned wiki is used. Zombie/clone units are excluded; neither allies nor resurrection are fabricated. The engine conservatively leaves hit-count props outside R protection/healing because their special health requires prop-specific evidence; the primary source excludes wards, structural turrets and plants but does not establish a blanket exception for every hit-count summon.");
    return {
      attack: { onHitToPets: true }, abilities,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, as = qAS + qMarkAS * marks(self), wUptime = Math.min(1, wDuration / (wDuration + Math.max(0, wCD - wDuration) / haste)), qRate = wUptime / qInnerCD + (1 - wUptime) / (qCD / haste), uptime = Math.min(1, qSeconds * qRate), added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, as)) - d.attackSpeed) * uptime, frequency = Math.min((d.attackSpeed + added) / eStacks, 1 / (abilities[3]!.cooldown / haste + eStacks / Math.max(1, d.attackSpeed + added))); return { physical: evaluate(qDamage, self, target) * qRate + attackDamage(self) * added + biteDamage(self, target) * frequency, magic: wDamage(self, target) * wolfAS * (1 + wScale * (d.bonusAttackSpeed + as * uptime)) * wUptime }; } },
      hooks: {
        onStart(ctx) { ctx.memory[MARKS] = Math.max(0, Math.floor(options.marks!)); ctx.memory[VIGOR] = 0; ctx.memory["kindred:lastX"] = ctx.self.x; ctx.memory["kindred:now"] = ctx.tick; if (rangeBonus(marks(ctx.self))) ctx.buff("kindred:range", "attackRange", rangeBonus(marks(ctx.self)), FOREVER); if (options.targetMarked) ctx.memory["kindred:huntAt"] = ctx.tick; },
        onAttack(ctx) { ctx.memory[LAST] = ctx.targetPet?.id ?? -1; ctx.memory[VIGOR] = Math.min(vigorMax, Number(ctx.memory[VIGOR] ?? 0) + vigorAttack); },
        onAttackHit(ctx) { dread(ctx); if (!ctx.blocked && Number(ctx.memory[VIGOR] ?? 0) >= vigorMax && missingShare(ctx.self) > 0) { heal(ctx.world, ctx.self, vigorHeal * Math.min(1, missingShare(ctx.self) / vigorMissingCap)); ctx.memory[VIGOR] = 0; } },
        onAttackPetHit(ctx) { dread(ctx, ctx.pet); if (!ctx.blocked && Number(ctx.memory[VIGOR] ?? 0) >= vigorMax && missingShare(ctx.self) > 0 && !ctx.pet.spec.hitPoints) { heal(ctx.world, ctx.self, vigorHeal * Math.min(1, missingShare(ctx.self) / vigorMissingCap)); ctx.memory[VIGOR] = 0; } },
        onCastStart(ctx) {
          if (ctx.ability.key === "E") ctx.self.cooldownReady.E = ctx.tick + ticks(ctx.ability.castTime + ctx.ability.cooldown / (1 + derive(ctx.self).abilityHaste / 100));
          if (ctx.ability.key === "R") {
          // The engine queries this actual spatial zone during damage/execute/heal transactions.
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", seenTick: ctx.tick, x: ctx.self.x, radius: rRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(rDuration), ability: "R", onHit: [], connects: true, scale: 1, centered: true, noPets: true, healthProtection: { minimumHealthFraction: rFloor, preventHealingAtFloor: true } });
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.self.x, radius: rRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(rDuration), ability: "R", onHit: [], noPets: true, centered: true, memory: { finalHeal: true } });
        } },
        onCast(ctx) {
          if (ctx.ability.key === "I") ctx.memory["kindred:huntAt"] = ctx.tick + ticks(huntDelay);
          if (ctx.ability.key === "Q") { ctx.buff("kindred:qAS", "attackSpeed", qAS + qMarkAS * marks(ctx.self), qSeconds); ctx.self.cooldownReady.Q = ctx.tick + ticks(inWolf(ctx.self, ctx.world) ? qInnerCD : qCD / (1 + derive(ctx.self).abilityHaste / 100)); }
          if (ctx.ability.key !== "W") return;
          const direction = ctx.enemy.x >= ctx.self.x ? 1 : -1, distance = Math.min(wRange, Math.max(0, ctx.aim?.distance ?? Math.min(wRange, Math.abs(ctx.enemy.x - ctx.self.x)))), center = ctx.self.x + direction * (ctx.aim?.direction ?? 1) * distance, arrive = ctx.tick + ticks(distance / wDashSpeed);
          const spec: PetSpec = { onAttackHit: ({ world, pet, target }) => { if (!("owner" in target)) world.units[pet.owner].memory["kindred:lastCombat"] = world.tick; }, effectsForHit: ({ world, pet, target }) => {
            if (!("owner" in target) || target.spec.targetClass !== "monster") return pet.spec.attack?.effects ?? [];
            const self = world.units[pet.owner], victim = petFormulaTarget(target, self, world.tick), amount = evaluate(wMonsterFlat, self, victim) + Math.min(wMonsterCap + wMonsterMarkCap * marks(self), (wHealth + wMarkHealth * marks(self)) * victim.hp * wMonsterScale);
            return [{ type: "damage", damageType: "magic", amount: { base: amount }, petDamageCategory: "area" }, { type: "cc", cc: "slow", strength: wMonsterSlow, duration: wMonsterSlowTime }];
          }, kind: "kindredWolf", name: "Wolf", hp: wolfHP, armor: wolfArmor, mr: wolfMR, radius: wolfRadius, moveSpeed: 0, duration: (arrive - ctx.tick) / 30 + wDuration, untargetable: true, target(world, pet) { if (world.tick < Number(pet.memory.arrive)) return undefined; const owner = world.units[pet.owner], enemy = world.units[1 - pet.owner]!, preferred = Number(owner.memory[LAST] ?? -1), center = Number(pet.memory.center), candidates: Array<Unit | Pet> = []; if (targetVisible(enemy, owner) && Math.abs(enemy.x - center) <= wRadius + enemy.spec.base.radius) candidates.push(enemy); for (const target of world.pets) if (target.owner !== pet.owner && !target.spec.untargetable && !target.spec.hitPoints && target.hp > 0 && Math.abs(target.x - center) <= wRadius + target.spec.radius && targetVisible(petFormulaTarget(target, owner, world.tick), owner)) candidates.push(target); return candidates.sort((a, b) => Number(("owner" in b ? b.id : -1) === preferred) - Number(("owner" in a ? a.id : -1) === preferred) || Number("owner" in a && a.spec.targetClass !== "champion") - Number("owner" in b && b.spec.targetClass !== "champion") || Math.abs(a.x - pet.x) - Math.abs(b.x - pet.x))[0]; }, attack: { range: wolfRange, interval: 1 / wolfAS, windup: wolfWindup, attackLike: false, category: "area", effects: [{ type: "damage", damageType: "magic", amount: wFlat, amountFor: wDamage, petDamageCategory: "area" }] } };
          const pet = spawnPet(ctx.world, ctx.self, spec, ctx.self.x); pet.memory = { center, arrive, origin: ctx.self.x, cast: ctx.tick }; pet.nextAttackTick = arrive; ctx.memory[WSTART] = ctx.tick; ctx.memory[WEND] = pet.endTick; ctx.self.cooldownReady.W = Infinity;
          if ((ctx.self.cooldownReady.Q ?? 0) > ctx.tick + ticks(qInnerCD)) ctx.self.cooldownReady.Q = ctx.tick + ticks(qInnerCD);
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "R" || !ctx.zone.memory?.finalHeal) return;
          // Querying protection uses [start,end), so every expired field is already inactive.
          ctx.world.zones = ctx.world.zones.filter((zone) => !(zone.owner === ctx.self.side && zone.ability === "R" && zone.healthProtection && zone.endTick <= ctx.tick));
          for (const target of ctx.world.units) if (healthProtectionEligible(ctx.world, target) && Math.abs(target.x - ctx.zone.x) <= rRadius + EPSILON && !isUntargetable(target)) heal(ctx.world, target, evaluate(rHeal, ctx.self, target));
          for (const pet of ctx.world.pets) if (healthProtectionEligible(ctx.world, pet) && !pet.spec.untargetable && Math.abs(pet.x - ctx.zone.x) <= rRadius + EPSILON) { const target = petFormulaTarget(pet, ctx.self, ctx.tick); if (!isUntargetable(target)) heal(ctx.world, target, evaluate(rHeal, ctx.self, target)); }
        },
        onDashEnd(ctx) { if (ctx.ability.key === "Q") arrows(ctx); },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "Ebite" || !ctx.world.pets.some((pet) => pet.id === ctx.enemy.petId && pet.spec.targetClass === "monster")) return;
          return ctx.effects.map((effect) => effect.type === "damage" ? { ...effect, amountFor: (self, target) => biteDamage(self, target, true) } : effect);
        },
        onAbilityHit(ctx) { if (ctx.enemy.petId === undefined) ctx.memory["kindred:lastCombat"] = ctx.tick; if (ctx.ability.key === "E") { applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "cc", cc: "slow", duration: eSlowSeconds, strength: eSlow + eSlowAP * derive(ctx.self).ap }, { scale: ctx.scale }); } },
        onDamageDealt(ctx) { if (ctx.enemy.petId === undefined && ctx.amount > 0) ctx.memory["kindred:lastCombat"] = ctx.tick; },
        onDamageTaken(ctx) { if (ctx.enemy.side !== ctx.self.side && ctx.amount > 0) ctx.memory["kindred:lastCombat"] = ctx.tick; },
        onKill(ctx) { if ("owner" in ctx.victim || ctx.victim.side === ctx.self.side || ctx.tick < Number(ctx.memory["kindred:huntAt"] ?? Infinity)) return; ctx.memory[MARKS] = marks(ctx.self) + 1; ctx.memory["kindred:huntLock"] = ctx.tick + ticks(huntLock); delete ctx.memory["kindred:huntAt"]; ctx.buff("kindred:range", "attackRange", rangeBonus(marks(ctx.self)), FOREVER); },
        onTick(ctx) {
          ctx.memory["kindred:now"] = ctx.tick;
          if (inWolf(ctx.self, ctx.world) && (ctx.self.cooldownReady.Q ?? 0) > ctx.tick + ticks(qInnerCD)) ctx.self.cooldownReady.Q = ctx.tick + ticks(qInnerCD);
          ctx.memory[VIGOR] = Math.min(vigorMax, Number(ctx.memory[VIGOR] ?? 0) + Math.abs(ctx.self.x - Number(ctx.memory["kindred:lastX"] ?? ctx.self.x)) / vigorMove); ctx.memory["kindred:lastX"] = ctx.self.x;
          const pet = ctx.world.pets.find((candidate) => candidate.owner === ctx.self.side && candidate.spec.kind === "kindredWolf");
          if (!pet) { if (ctx.memory[WEND] !== undefined) { const elapsed = (ctx.tick - Number(ctx.memory[WSTART])) / 30; ctx.self.cooldownReady.W = ctx.tick + ticks(Math.max(0, wCD - elapsed) / (1 + derive(ctx.self).abilityHaste / 100)); delete ctx.memory[WEND]; } return; }
          if (ctx.tick >= pet.endTick || Math.abs(ctx.self.x - Number(pet.memory.center)) > wRadius + EPSILON) { endWolf(ctx, pet); return; }
          if (ctx.tick < Number(pet.memory.arrive)) { const share = (ctx.tick - Number(pet.memory.cast)) / Math.max(1, Number(pet.memory.arrive) - Number(pet.memory.cast)); pet.x = Number(pet.memory.origin) + (Number(pet.memory.center) - Number(pet.memory.origin)) * share; return; }
          if (!pet.memory.arrived) { pet.x = Number(pet.memory.center); pet.memory.arrived = true; }
          const multiplier = 1 + wScale * derive(ctx.self).bonusAttackSpeed;
          const target = pet.spec.target?.(ctx.world, pet);
          if (target) { const radius = "owner" in target ? target.spec.radius : target.spec.base.radius, gap = Math.abs(target.x - pet.x) - radius - wolfRange; if (gap > 0) { const actor = petFormulaTarget(pet, ctx.self, ctx.tick); pet.x += terrainLimit(ctx.world, actor, Math.sign(target.x - pet.x) * Math.min(wolfMove / 30, gap)); } }
          pet.spec = { ...pet.spec, moveSpeed: 0, attack: { ...pet.spec.attack!, interval: 1 / (wolfAS * multiplier), windup: wolfWindup / multiplier } };
        },
      },
    };
  },
};
export default kindred;
