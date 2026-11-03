/** Senna: sourced Mist, attack-speed-scaled beams and independently defended contacts. */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, EPSILON } from "../../engine/sim/actions";
import { abilityHit, abilityHitPet, applyEffect, canSee, inStasis, isUntargetable, notifyIncomingOnHit } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { damagePet } from "../../engine/sim/pets";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { ticks } from "./util";
import { levelBonusAttackSpeed, TOP_LANE_MAX_LEVEL } from "../../engine/stats";
import { CRIT_DAMAGE } from "../../engine/rules/defense";

const MARK = "senna:weakenedSoul", IMMUNE = "senna:soulImmunity", SOULS = "senna:mist", MIST = "senna:blackMist", CAMO = "senna:camouflage";
const senna: KitModule = {
  champion: "Senna",
  options: { mist: { label: "Mist stacks collected before the duel (explicit scenario assumption)", default: 0 } },
  build(kit, options) {
    const a = kit.ability("Basic Attack"), p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    a.quote("non-projectile beam"); const critical = a.quoted("critical strikes deal only 160% AD") / 100;
    const windup = a.levelValue("base attack windup is reduced to 31.25 – 21.875 (based on level)%") / 100, windupModifier = a.quoted("only reduced by 60%") / 100;
    a.quote("capped at level 18"); const attackRatio = a.quoted("attack ratio of 0.4");
    const markSeconds = p.quoted("mark enemy champions hit for 4 seconds"), soulDamage = p.levelValue("1 – 10 (based on level)% of the target's current health") / 100, immuneSeconds = p.field("targetCooldown");
    const adPerSoul = p.quoted("gains 0.75 bonus attack damage"), soulBand = p.quoted("For every 20 stacks"), rangePerBand = p.quoted("gains 20 bonus attack range"), critPerBand = p.quoted("and 10% critical strike chance") / 100, excessSteal = p.quoted("converted into 0.35% life steal") / 100 * 100;
    const relicRatio = p.quoted("deal 20% AD bonus physical damage") / 100, moveShare = p.quoted("10 / 15 / 20 (based on level)%", 2) / 100, moveSeconds = p.quoted("bonus movement speed for 0.5 seconds");
    const extendAt = p.quoted("remaining duration less than 0.25 seconds"), extendSeconds = p.quoted("modified to 0.75 seconds");
    p.quote("Dealing 0 damage is valid for marking and collecting Mist from champions"); p.quote("Dodge prevents marking and collecting a Mist via Senna's basic attacks and Q"); p.quote("Mist traveling to Senna can be destroyed as a projectile"); p.quote("only applied if the attack deals more than 0 damage");
    const qDamage = q.formula("Physical Damage"), qHeal = q.formula("Healing"), qSlowSeconds = q.number("Slow Duration"), qSlow = q.quoted("slows them by 15%") / 100, qSlowAD = q.quoted("(+ 15% per 100 bonus AD)") / 10000, qSlowAP = q.quoted("(+ 7% per 100 AP)") / 10000;
    const qCastShare = q.fieldNumbers("castTime")[0]! / 100, qRange = q.field("range"), qWidth = q.field("width", "Shadow"), qLightWidth = q.field("width", "Light"), qMaxTarget = q.fieldNumbers("targetRange").at(-1)!, qRefund = q.quoted("reduced by 1 second on-attack");
    q.quote("Applies spell damage to the same champion it applies on-attack effects to and area damage to all other targets"); q.quote("considered to trigger a single basic attack"); q.quote("applies on-hit effects against champions and turrets hit"); q.quote("Spell shield will not prevent on-hit effects from being applied"); q.quote("not either explicitly untargetable or herself");
    const wDelay = w.quoted("attaches to them for 1 second"), wRootSeconds = w.number("Root Duration"), wRadius = w.field("effectRadius"); w.quote("After the duration or when the target dies"); w.quote("will not root the primary target if they are untargetable");
    const eSeconds = e.number("Effect Duration"), eRearm = e.quoted("regains it after 1.75 seconds"), eDetection = e.quoted("Detection Radius: 400"), eMove = e.quoted("gain 20%") / 100, eAP = e.quoted("(+ 5% per 100 AP)") / 10000;
    e.quote("can move during Curse of the Black Mist's cast time"); e.quote("basic attack breaks the stealth at the start of the attack windup"); e.textField("cooldownStart"); e.quote("will not activate if Senna enters resurrection during the cast time");
    const eClientRearm = e.gameQuoted('"name":"DurationBeforeRestealth","values":[1.5');
    const rDamage = r.formula("Physical Damage"), rShieldBase = r.baseOf("Shield Strength"), rShieldAP = r.quoted("(+ 50% AP)") / 100, rShieldMist = r.quoted("(+ 150% Mist)") / 100, rShieldSeconds = r.quoted("shield to Senna and allied champions hit for 3 seconds"), rSightSeconds = r.quoted("reveals}} them for 3 seconds");
    r.quote("{{tip|standard sight|reveals}}"); r.quote("broad wave is a singular projectile"); r.quote("narrow wave will be destroyed with it"); r.quote("reveals herself during the cast time"); r.quote("wherever the caster is at the start of the cast time");
    const rWidth = r.field("width", "Shadow"), rLightWidth = r.field("width", "Light");
    const rSpeed = r.gameQuoted('"mSpeed":20000.0'); r.gameQuote('"mMissileWidth":1200.0', "Characters/Senna/Spells/SennaRAbility/SennaRAlly");
    p.gameQuote('"name":"ADPerStack","values":[0.75'); q.gameQuote('"name":"RectangleWidthEnemy","values":[100.0'); w.gameQuote('"name":"DelayTime","values":[0.0,1.0');
    const preSouls = Math.max(0, Math.floor(options.mist ?? 0));
    const count = (self: Unit) => Number(self.memory[SOULS] ?? preSouls);
    const championTarget = (ctx: Pick<HookContext, "world" | "enemy">) => ctx.enemy.petId === undefined || (ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.targetClass ?? (ctx.enemy.memory["senna:championClass"] === true ? "champion" : undefined)) === "champion";
    const qCast = (self: Unit) => { const d = derive(self), baseSeconds = windup / self.spec.base.attackSpeed.base; return qCastShare * (baseSeconds + windupModifier * (windup / d.attackSpeed - baseSeconds)); };
    const stats = (ctx: HookContext) => {
      const souls = count(ctx.self), bands = Math.floor(souls / soulBand), previousBands = Math.floor(preSouls / soulBand);
      ctx.buff("senna:collectedAD", "AD", (souls - preSouls) * adPerSoul, Infinity);
      ctx.buff("senna:collectedRange", "attackRange", (bands - previousBands) * rangePerBand, Infinity);
      ctx.buff("senna:collectedCrit", "critChance", (bands - previousBands) * critPerBand, Infinity);
      ctx.buff("senna:excessCritSteal", "lifeSteal", Math.max(0, (ctx.self.spec.bonus?.critChance ?? 0) + bands * critPerBand - 1) * excessSteal, Infinity);
    };
    const passive: AbilitySpec = { key: "Relic", name: p.name, slot: "I", activation: "internal", budgetExcluded: true, usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { appliesLifeSteal: true, spellShield: false } };
    const relic = (ctx: HookContext, scale: number) => { applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: relicRatio } }, label: "Relic Cannon", petDamageCategory: "proc" }, { ability: passive, scale }); };
    const haste = (ctx: HookContext) => ctx.buff("senna:relicHaste", "moveSpeedFlat", derive(ctx.enemy).moveSpeed * moveShare, moveSeconds);
    const soul = (ctx: HookContext, scale: number) => {
      if (!championTarget(ctx) || ctx.enemy.statuses.some((s) => s.key === IMMUNE && s.source === ctx.self.side && s.endTick > ctx.tick)) return;
      const mark = ctx.enemy.statuses.find((s) => s.key === MARK && s.source === ctx.self.side && s.endTick > ctx.tick);
      if (!mark) { applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: MARK, duration: markSeconds, value: scale }, { scale: 1 }); return; }
      const extractionScale = Math.min(Math.max(0, mark.value), scale);
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== mark);
      if (ctx.enemy.petId !== undefined) { const pet = ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId); if (pet) pet.statuses = ctx.enemy.statuses; }
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: IMMUNE, duration: immuneSeconds }, { scale: 1 });
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetCurrentHP: soulDamage } }, label: "Weakened Soul" }, { ability: passive, scale: extractionScale });
      if (ctx.self.alive && !projectileBlocked(ctx.world, ctx.self.side, ctx.enemy.x, ctx.self.x)) { ctx.memory[SOULS] = count(ctx.self) + extractionScale; stats(ctx); }
    };
    const qPrimary = (ctx: HookContext) => !ctx.memory["senna:qRay"] || Number(ctx.memory["senna:qPrimary"]) === (ctx.enemy.petId ?? -1);
    const qProcs = (ctx: HookContext & { ability: AbilitySpec }, scale: number) => { for (const effect of ctx.self.spec.attack.onHit ?? []) applyEffect(ctx.world, ctx.self, ctx.enemy, effect, { ability: ctx.ability, scale }); notifyIncomingOnHit(ctx.world, ctx.enemy, ctx.ability, ctx.self, scale); relic(ctx, scale); haste(ctx); soul(ctx, scale); if (qPrimary(ctx) && (!ctx.memory["senna:qRay"] || !ctx.memory["senna:qRefunded"])) { ctx.apply({ type: "refund", ability: "Q", seconds: qRefund * scale }, true); if (ctx.memory["senna:qRay"]) ctx.memory["senna:qRefunded"] = true; } };
    const qTargets = (ctx: Pick<HookContext, "self" | "world">) => {
      const found: Array<{ unit: Unit; pet?: Pet }> = [], enemy = ctx.world.units[1 - ctx.self.side]!;
      if (enemy.alive && canSee(enemy, ctx.self) && !isUntargetable(enemy, ctx.self) && !inStasis(enemy) && Math.abs(enemy.x - ctx.self.x) - enemy.spec.base.radius - ctx.self.spec.base.radius <= Math.min(qMaxTarget, attackRange(ctx.self, enemy)) + EPSILON) found.push({ unit: enemy });
      for (const pet of ctx.world.pets) if (pet.hp > 0 && !pet.spec.untargetable) {
        const unit = petFormulaTarget(pet, ctx.self, ctx.world.tick);
        if (canSee(unit, ctx.self) && !isUntargetable(unit, ctx.self) && !inStasis(unit) && Math.abs(unit.x - ctx.self.x) - unit.spec.base.radius - ctx.self.spec.base.radius <= Math.min(qMaxTarget, attackRange(ctx.self, unit)) + EPSILON) found.push({ unit, pet });
      }
      return found;
    };
    const wRoot: AbilitySpec = { key: "Wroot", name: `${w.name} (spread)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "cc", cc: "root", duration: wRootSeconds }], persistsAfterDeath: true };
    const spread = (ctx: HookContext, m: Missile) => {
      const key = `senna:w:${m.id}:`, id = ctx.memory[`${key}pet`], pet = typeof id === "number" ? ctx.world.pets.find((p) => p.id === id) : undefined;
      const x = pet?.x ?? (id === undefined ? ctx.enemy.x : m.x);
      const enemies = [ctx.world.units[1 - ctx.self.side]!];
      for (const target of enemies) if (Math.abs(target.x - x) <= wRadius + EPSILON) abilityHit(ctx.world, ctx.self, target, wRoot, wRoot.onHit!, m.scale);
      for (const target of [...ctx.world.pets]) if (target.owner !== ctx.self.side && Math.abs(target.x - x) <= wRadius + EPSILON) abilityHitPet(ctx.world, ctx.self, target, wRoot, wRoot.onHit!, "area", m.scale);
      m.ended = true; delete ctx.memory[`${key}pet`];
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: qCastShare * windup / kit.champion.forms[0]!.stats.attackSpeed.base, castTimeFor: qCast, delivery: { kind: "self" }, onSelf: [{ type: "heal", amount: qHeal }], usable: (self, world) => qTargets({ self, world }).length > 0, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }, { type: "cc", cc: "slow", duration: qSlowSeconds, strength: qSlow }], flags: { projectile: false, spellShield: true, appliesLifeSteal: true, appliesOnHit: false, petContactHooks: true }, roles: ["damage", "defense"], estimate: (self, target) => evaluate(qDamage, self, target) + derive(self).ad * relicRatio },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "line", range: w.field("targetRange"), width: w.field("width"), speed: w.field("speed"), collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Physical Damage"), petDamageCategory: "singleTarget" }], flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage", "cc"], decisive: true, persistsAfterDeath: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cooldownAfter: "state", cost: e.cost(), castTime: e.castTime(), moveWhileCasting: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "lingering", duration: eSeconds }], roles: ["escape", "engage"], usable: (self, world) => world.tick >= Number(self.memory[MIST] ?? -1) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: Infinity, width: rWidth, speed: rSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }, { type: "mark", key: "senna:standardSight", duration: rSightSeconds }], flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage", "defense"], decisive: true, persistsAfterDeath: true }, passive, wRoot,
    ];
    const breakStealth = (ctx: HookContext) => { ctx.memory["senna:rearm"] = ctx.tick + ticks(eRearm); ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== CAMO); };
    kit.assume(`Preduel Mist is an explicit nonnegative whole-stack option, default zero. No lane farm, allied champions, gold, quest rewards or corpse pickups are invented. Actual champions and pets explicitly classified as Champion by their pinned summon source share target-local extraction; minion/monster/unknown pets do not. Two-hit extraction adds real in-duel Mist; its return path is checked immediately against projectile walls because the pinned source does not supply a travel speed. Fractional fallback extraction uses the lesser of the first mark weight and second hit weight for both proc damage and Mist; that bounded scalar approximation consumes the whole mark and starts ordinary target-local immunity without inventing residual branches. Permanent Mist grants 0.75 AD per stack and 20-range/10% crit per 20; excess purchased-plus-Mist crit converts to 35% life steal per unit excess chance.`);
    kit.assume(`Senna's nonprojectile basic uses the level 18-capped 21.875% windup and 60% attack-speed scaling at level 20,0.4 AS ratio and 160% AD critical damage. Relic Cannon is a separate noncritical 20% AD life-stealing packet only after positive ordinary basic damage, followed by the target-current-health extraction. Immunity lasts 4 seconds; a mark near expiry extends to 0.75 seconds when a windup starts. Invulnerable champions can still be marked/extracted; dodge/parry/blind deny ordinary basic contact.`);
    kit.assume(`Q uses 80% of the continuous sourced windup formula before tick rounding. It selects the visible champion in attack range (capped 1100), otherwise a real targetable pet; an aimed endpoint selects the closest actual unit. It then fires 1300 units along that target ray with 100-unit shadow and 280-unit light widths. The one-dimensional model cannot distinguish transverse ray positions. It heals only Senna in this solo duel. Real enemy summons take area damage, and hit-count objects receive one actual basic interaction; Source-classified Champion pets receive champion Q life steal/on-hits; minion/monster/unknown pets do not. The acquired target, if classified Champion, receives the single-target spell packet and sole on-attack cooldown refund. Otherwise the first struck eligible champion is selected in stable real-champion then pet-ID order. Other targets take area packets; every eligible champion still receives its own on-hits. Spell shields deny Q damage/slow but preserve its champion on-hits and on-attack cooldown refund. The source leaves Q block/blind interactions pending test: its spell damage/slow are independent of blind/block, dodge denies its on-hit packet, and parry denies all contact bonuses. An accepted Q resolves spell damage, then Relic Cannon, then current-health Absolution; the shielded exception applies its retained on-hits before spell-shield consumption. Each accepted champion Q procs Relic Cannon and Absolution once, while its on-attack refunds one actual second of current Q cooldown; ordinary attack declarations refund independently of later avoidance.`);
    kit.assume(`W attaches to the actual first contacted champion or summon, then roots all real enemy centers within 280 after 1 second or immediately on that target's death. The attachment follows a living target and survives Senna's death; untargetability, stasis, spell shields, CC immunity and tenacity are checked at the root's separate contact. W's root is crowd control without a second Absolution hit.`);
    kit.assume(`E is a mobile one-second cast followed by eight seconds of camouflage with 400-unit champion detection and 20% + 5%/100 AP movement speed. Basic windup declarations and other spell declarations break camouflage; it returns after 1.75 seconds without such actions. The client data says ${eClientRearm} seconds; the exact wiki 1.75-second rule is used and the conflict remains recorded. Movement speed remains while detected or broken, and true sight exposes camouflage while independent invisibility retains its own rules. Post-effect cooldown starts after the aura. No allies receive fictitious Wraith buffs.`);
    kit.assume(`R retains its cast-start origin/direction, reveals Senna during the one-second cast, shields herself once on release for 3 seconds at 200 + 50% AP+1.5 per current Mist, and sends a 20000-speed global projectile. The 320-unit enemy shadow and 2400-unit light wave share one destructible flight; actual enemy champions and source-classified Champion summons take damage; other summons only register passage without damage, sight or Absolution. In this solo one-dimensional duel the broad wave supplies Senna's selfshield and no allied shields. Its enemy reveal is explicitly standard sight, recorded as a sight mark; it never reveals invisibility or camouflage as true sight would. Path sight has no extra effect without fog/brush.`);
    kit.assume("The budget includes direct Q/W/R formulas, Q's attack-refunded effective cycle, average Relic Cannon/basic and Q procs, a half-health target extraction every immunity-plus-two-hit cycle, Q selfhealing and the R selfshield. Runtime souls, target selection, shields and delayed W controls remain simulated.");
    void qWidth; void qLightWidth; void rLightWidth;
    return {
      base: { critDamageModifier: critical / CRIT_DAMAGE, windup: { percent: windup, modifier: windupModifier }, attackSpeed: { ...kit.champion.forms[0]!.stats.attackSpeed, bonus: levelBonusAttackSpeed(kit.champion.forms[0]!.stats.attackSpeed, TOP_LANE_MAX_LEVEL) / 100, ratio: attackRatio } },
      attack: { range: a.field("attackRange"), projectile: false, missileSpeed: 0, onHitToPets: true }, abilities,
      start: [{ type: "stat", stat: "AD", amount: { base: preSouls * adPerSoul }, duration: Infinity }, { type: "stat", stat: "attackRange", amount: { base: Math.floor(preSouls / soulBand) * rangePerBand }, duration: Infinity }, { type: "stat", stat: "critChance", amount: { base: Math.floor(preSouls / soulBand) * critPerBand }, duration: Infinity }],
      budget: {
        damage(self, target) { const d = derive(self), cast = qCast(self), original = abilities[0]!.cooldown / (1 + d.abilityHaste / 100) + cast, cycle = abilities[0]!.cooldown / (1 + d.abilityHaste / 100) / (1 + d.attackSpeed * qRefund) + cast; return { physical: relicRatio * d.ad * (d.attackSpeed + 1 / cycle) + evaluate(qDamage, self, target) * (1 / cycle - 1 / original) + derive(target).maxHp * .5 * soulDamage / (immuneSeconds + 2 / Math.max(EPSILON, d.attackSpeed + 1 / cycle)) }; },
        healing(self) { const d = derive(self), cast = qCast(self), original = abilities[0]!.cooldown / (1 + d.abilityHaste / 100) + cast, cycle = abilities[0]!.cooldown / (1 + d.abilityHaste / 100) / (1 + d.attackSpeed * qRefund) + cast; return evaluate(qHeal, self) * (1 / cycle - 1 / original) + (rShieldBase + rShieldAP * d.ap + rShieldMist * preSouls) / (abilities[3]!.cooldown / (1 + d.abilityHaste / 100) + abilities[3]!.castTime); },
      },
      hooks: {
        onStart(ctx) { ctx.memory[SOULS] = preSouls; stats(ctx); },
        onDamageDealt(ctx) { if (ctx.attack && !ctx.ability && ctx.mitigated > 0 && !ctx.memory["senna:relicHandled"] && !hasState(ctx.enemy, "parry")) { ctx.memory["senna:relicHandled"] = true; relic(ctx, Number(ctx.memory["senna:basicScale"] ?? 1)); } },
        onAttackBeforeDamage(ctx) { if (ctx.pet) ctx.enemy.memory["senna:championClass"] = ctx.pet.spec.targetClass === "champion"; ctx.memory["senna:relicHandled"] = false; ctx.memory["senna:basicScale"] = ctx.scale; if (ctx.pet) ctx.memory["senna:petBefore"] = ctx.pet.hp; },
        onAttackHit(ctx) { if (!ctx.blocked) { haste(ctx); soul(ctx, ctx.scale); } },
        onAttackPetHit(ctx) { if (!ctx.blocked) { if (ctx.pet.hp < Number(ctx.memory["senna:petBefore"] ?? ctx.pet.hp)) relic(ctx, ctx.scale); haste(ctx); soul(ctx, ctx.scale); } },
        onAttack(ctx) {
          ctx.apply({ type: "refund", ability: "Q", seconds: qRefund }, true); breakStealth(ctx);
          const mark = ctx.enemy.statuses.find((s) => s.key === MARK && s.source === ctx.self.side && s.endTick > ctx.tick);
          if (mark && mark.endTick - ctx.tick < ticks(extendAt)) { mark.endTick = ctx.tick + ticks(extendSeconds); if (ctx.targetPet) ctx.targetPet.statuses = ctx.enemy.statuses; }
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "E") breakStealth(ctx);
          if (ctx.ability.key === "R") ctx.apply({ type: "state", state: "revealed", duration: ctx.ability.castTime }, true);
          if (ctx.ability.key === "Q") { const possible = qTargets(ctx); const wanted = ctx.aim ? ctx.self.x + (ctx.enemy.x >= ctx.self.x ? 1 : -1) * ctx.aim.direction * (ctx.aim.distance ?? 0) : undefined; const target = wanted === undefined ? possible[0] : possible.sort((a, b) => Math.abs(a.unit.x - wanted) - Math.abs(b.unit.x - wanted))[0]; ctx.memory["senna:qTarget"] = target?.pet?.id ?? -1; }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E" && ctx.self.resurrection) ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "lingering" && s.ability === "E" && s.source === ctx.self.side));
          if (ctx.ability.key === "E" && !ctx.self.resurrection) { ctx.memory[MIST] = ctx.tick + ticks(eSeconds); ctx.memory["senna:rearm"] = ctx.tick; ctx.buff("senna:mistSpeed", "moveSpeedPercent", eMove + eAP * derive(ctx.self).ap, eSeconds); ctx.self.statuses.push({ kind: "state", key: "camouflage", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(eSeconds), value: eDetection, memoKey: CAMO }); }
          if (ctx.ability.key === "R") ctx.apply({ type: "shield", amount: { base: rShieldBase + rShieldAP * derive(ctx.self).ap + rShieldMist * count(ctx.self) }, duration: rShieldSeconds }, true);
          if (ctx.ability.key !== "Q") return;
          ctx.memory["senna:qRay"] = true; ctx.memory["senna:qRefunded"] = false;
          const id = Number(ctx.memory["senna:qTarget"]), locked = id < 0 ? ctx.enemy : ctx.world.pets.find((p) => p.id === id), targetX = locked?.x;
          if (targetX === undefined) { delete ctx.memory["senna:qRay"]; return; }
          const direction = targetX >= ctx.self.x ? 1 : -1, onRay = (x: number, radius: number) => direction * (x - ctx.self.x) >= -radius && direction * (x - ctx.self.x) <= qRange + radius + EPSILON;
          const struckChampions = [{ unit: ctx.enemy, id: -1 }, ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.spec.targetClass === "champion" && !pet.spec.untargetable).sort((a, b) => a.id - b.id).map((pet) => ({ unit: petFormulaTarget(pet, ctx.self, ctx.tick), id: pet.id }))].filter(({ unit }) => unit.alive && !inStasis(unit) && !isUntargetable(unit, ctx.self) && onRay(unit.x, unit.spec.base.radius));
          ctx.memory["senna:qPrimary"] = (struckChampions.find((target) => target.id === id) ?? struckChampions[0])?.id ?? -2;
          if (onRay(ctx.enemy.x, ctx.enemy.spec.base.radius)) abilityHit(ctx.world, ctx.self, ctx.enemy, ctx.ability, ctx.ability.onHit!);
          for (const pet of [...ctx.world.pets].sort((a, b) => a.id - b.id)) if (pet.owner !== ctx.self.side && onRay(pet.x, pet.spec.radius)) { if (pet.spec.hitPoints) { const view = petFormulaTarget(pet, ctx.self, ctx.tick); if (!pet.spec.untargetable && !inStasis(view) && !isUntargetable(view, ctx.self) && !hasState(view, "parry") && !hasState(view, "dodgeAttacks") && !hasState(view, "blockAttacks")) damagePet(ctx.world, ctx.self, pet, derive(ctx.self).ad, "physical", true, "Q"); } else abilityHitPet(ctx.world, ctx.self, pet, { ...ctx.ability, flags: { ...ctx.ability.flags, appliesLifeSteal: pet.spec.targetClass === "champion", appliesOnHit: false } }, ctx.ability.onHit!, "area"); }
          delete ctx.memory["senna:qRay"]; delete ctx.memory["senna:qRefunded"]; delete ctx.memory["senna:qPrimary"];
        },
        onAbilityContact(ctx) {
          if (ctx.enemy.petId !== undefined) ctx.enemy.memory["senna:championClass"] = ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.targetClass === "champion";
          if (ctx.ability.key === "R" && !championTarget(ctx)) return [];
          if (ctx.ability.key !== "Q") return;
          if (championTarget(ctx) && ctx.defense === "spellShield" && !hasState(ctx.enemy, "dodgeAttacks")) qProcs(ctx, ctx.scale);
          const d = derive(ctx.self); return ctx.effects.map((effect) => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: qSlow + qSlowAD * d.bonusAd + qSlowAP * d.ap } : effect.type === "damage" ? { ...effect, noLifeSteal: !championTarget(ctx), petDamageCategory: championTarget(ctx) && qPrimary(ctx) ? "singleTarget" : "area" } : { ...effect });
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q" && championTarget(ctx) && !hasState(ctx.enemy, "dodgeAttacks")) qProcs(ctx, ctx.scale);
          if (ctx.ability.key === "R" || ctx.ability.key === "W") soul(ctx, ctx.scale);
          if (ctx.ability.key !== "W") return;
          const id = ctx.world.nextId++, prefix = `senna:w:${id}:`;
          if (ctx.enemy.petId !== undefined) ctx.memory[`${prefix}pet`] = ctx.enemy.petId;
          const m: Missile = { id, owner: ctx.self.side, source: "Wroot", seenTick: ctx.tick, x: ctx.enemy.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, projectile: false, connects: false, scale: ctx.scale, onHit: wRoot.onHit!, impactTick: ctx.tick + ticks(wDelay), expiresTick: ctx.tick + ticks(wDelay) + 1 };
          ctx.world.missiles.push(m); if (!ctx.enemy.alive || ctx.enemy.hp <= 0) spread(ctx, m);
        },
        onMissileTick(ctx) { if (ctx.missile.source !== "Wroot") return; const id = ctx.memory[`senna:w:${ctx.missile.id}:pet`], pet = typeof id === "number" ? ctx.world.pets.find((p) => p.id === id) : undefined; if (pet) ctx.missile.x = pet.x; if (ctx.tick >= (ctx.missile.impactTick ?? Infinity) || (id === undefined ? ctx.enemy.hp <= 0 : !pet || pet.hp <= 0)) spread(ctx, ctx.missile); },
        onKill(ctx) { for (const m of ctx.world.missiles) if (m.owner === ctx.self.side && m.source === "Wroot" && !m.ended && (ctx.pet ? ctx.memory[`senna:w:${m.id}:pet`] === ctx.pet.id : ctx.memory[`senna:w:${m.id}:pet`] === undefined)) { m.x = ctx.victim.x; spread(ctx, m); } },
        onTick(ctx) { const until = Number(ctx.memory[MIST] ?? -1); if (ctx.tick < until && ctx.tick >= Number(ctx.memory["senna:rearm"] ?? -1) && !ctx.self.statuses.some((s) => s.memoKey === CAMO)) ctx.self.statuses.push({ kind: "state", key: "camouflage", source: ctx.self.side, startTick: ctx.tick, endTick: until, value: eDetection, memoKey: CAMO }); },
      },
    };
  },
};
export default senna;
