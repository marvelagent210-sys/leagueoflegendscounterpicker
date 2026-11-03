/** Galio: independent curving gusts, a magic bulwark, charged taunt and real body contacts. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { terrainLimit } from "../../engine/sim/terrain";
import { attackDamage, scaled, seriesAt, ticks } from "./util";

const P = "galio:smash", SHIELD = "galio:bulwark", W = "galio:charge", R = "galio:entrance";
type Contact = { target: Unit; pet?: Pet };
const galio: KitModule = {
  champion: "Galio",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const smashBase = p.levelValue("next basic attack"), smashAD = p.quoted("(+ 100% AD)") / 100, smashAP = p.quoted("(+ 40% AP)") / 100, smashMR = p.quoted("(+ 60% bonus magic resistance)") / 100;
    const pCD = p.field("staticCooldown"), pReduction = p.quoted("reduced by 3 seconds"), pAS = p.quoted("gain 40% bonus attack speed") / 100, pRadius = p.field("effectRadius"), pCrit = p.quoted("critically strike for 200% damage") / 100;
    p.quote("uncancellable windup"); p.quote("This may occur only once per cast"); p.quote("Even if the ability hit is"); p.quote("basic damage"); p.quote("epic {{tip|monster}}"); p.quote("proc damage"); p.quote("on-hit}} effects to its primary target twice"); p.quote("will not trigger against"); p.gameQuote('"mCooldownNotAffectedByCDR":true');
    const qDamage = q.formula("Magic Damage"), qRange = q.field("targetRange"), qRadius = q.field("effectRadius"), qSpeed = q.field("speed", "Curving missile speed"), tornadoSpeed = q.field("speed", "Tornado speed, estimated"), qCD = q.cooldown(), qCast = q.castTime();
    const tornadoTime = q.quoted("persists for 2 seconds"), tornadoInterval = q.quoted("every 0.5 seconds"), tornadoMax = q.quoted("capped at 150 per tick"), tornadoPct = q.quoted("equal to 2%") / 100, tornadoAP = q.quoted("(+ 1% per 100 AP)") / 10000;
    q.quote("will block the gusts damage but not the tornado's"); q.quote("The tornado will not form if only one windblast reaches the target location"); q.quote("Effect at cast time end");
    const paths = ["GalioQMissile", "GalioQMissileR"].map((name, index) => {
      const object = `Characters/Galio/Spells/GalioQAbility/${name}`;
      const start = index === 0 ? '"mStartPositionOffset":[-250.0,0.0,-100.0]' : '"mStartPositionOffset":[250.0,0.0,-100.0]';
      const a = index === 0 ? '"mControlPoint1":[-0.2678755223751068,0.0,1.0750534534454346]' : '"mControlPoint1":[0.2720096707344055,0.0,1.0743502378463745]';
      const b = index === 0 ? '"mControlPoint2":[0.8422044515609741,0.0,0.13945454359054565]' : '"mControlPoint2":[-0.8407477736473083,0.0,0.14737896621227264]';
      return { start: [q.gameQuoted(start, 0, object), q.gameQuoted(start, 2, object)], a: [q.gameQuoted(a, 0, object), q.gameQuoted(a, 2, object)], b: [q.gameQuoted(b, 0, object), q.gameQuoted(b, 2, object)], radius: q.gameQuoted('"mMissileWidth":60.0', 0, object) };
    });
    const shieldFormula = w.formula("Magic Shield Strength"), shieldRecharge = w.levelValue("restores it after"), wCD = w.cooldown(), wCast = w.castTime(), wTime = w.quoted("charges for up to 2 seconds"), wFull = w.quoted("over the first 1.25 seconds"), selfSlow = w.quoted("slowing himself by 15%") / 100, wLinger = w.quoted("refreshes the damage reduction for 2 seconds"), wLock = w.quoted("for 0.4 seconds after the recast"), staticMS = w.quoted("static 60");
    const wMin = w.formula("Minimum Magic Damage"), wTaunts = w.seriesIn("Recast: Galio refreshes", 1), wAmplification = w.seriesIn("Recast: Galio refreshes", 0);
    if (wTaunts.kind !== "variable") throw new Error("Galio W must retain its pinned channel-time series");
    const wRadii = { kind: "variable" as const, variable: "channel time", points: wTaunts.points, values: w.fieldNumbers("effectRadius") };
    // These are percentage-valued quantities, not damage formulas; the parser preserves per100 terms.
    const physicalDR: Formula = { base: w.baseOf("Physical Damage Reduction") / 100, ratios: { AP: w.quoted("(+ 1.5% per 100 AP)") / 10000, bonusMR: w.quoted("(+ 4% per 100 bonus magic resistance)") / 10000, bonusHP: w.quoted("(+ 0.5% per 100 bonus health)") / 10000 } };
    const magicDR: Formula = { base: w.baseOf("Magic Damage Reduction") / 100, ratios: { AP: w.quoted("(+ 4% per 100 AP)") / 10000, bonusMR: w.quoted("(+ 8% per 100 bonus magic resistance)") / 10000, bonusHP: w.quoted("(+ 1% per 100 bonus health)") / 10000 } };
    w.quote("automatically afterwards or if it is interrupted"); w.quote("interrupts=death, silence"); w.quote("The modifier is not applied if the target is");
    const eDamage = e.formula("Magic Damage"), eNonChampion = e.formula("Non-Champion Damage"), eCast = e.castTime(), eCD = e.cooldown(), eMin = e.field("targetRange"), eRange = e.gameQuoted('"castRangeDisplayOverride":[650.0,650.0,650.0,650.0,650.0,650.0,650.0]'), eSpeed = e.field("speed"), eRadius = e.field("width") / 2, eCC = e.quoted("knocks them up for 0.75 seconds");
    e.quote("steps back in the opposite direction over the cast time"); e.quote("until he hits an enemy champion or terrain"); e.quote("will initiate the"); e.quote("Having the step backwards cut short has no effect on the total distance gained");
    const rDamage = r.formula("Magic Damage"), rRange = r.field("targetRange"), rRadius = r.field("effectRadius"), rCD = r.cooldown(), rCast = r.castTime(), rTime = r.quoted("channeling for 2.75 seconds"), rImmune = r.quoted("After channeling for 1.25 seconds"), rAir = r.quoted("for 0.8 seconds"), rTravel = r.quoted("over 0.2 seconds"), rLock = r.quoted("in place for 0.5 seconds"), rShieldTime = r.quoted("within the area for 5 seconds"), rKnock = r.quoted("back 100 units"), rCC = r.quoted("over 0.75 seconds"), rMinDash = r.quoted("dash 100 units minimum");
    r.quote("target allied champion's location at the time of cast"); r.quote("resets Shield of Durand passive shield for himself"); r.quote("does not resist allied"); r.quote("interrupts=death, root, silence, ground"); r.quote("When becoming"); r.quote("will still cause an impact to occur at the destination"); r.gameQuote('"mAffectsTypeFlags":16385'); r.gameQuote('"mRequiredUnitTags":{"mObjectTagList":["{ea595ca6}"]');
    const contacts = (ctx: Pick<HookContext, "world" | "self">): Contact[] => {
      const enemy = ctx.world.units[1 - ctx.self.side]!;
      return [...(enemy.alive ? [{ target: enemy }] : []), ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && pet.endTick > ctx.world.tick && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.world.tick), pet }))];
    };
    const champion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion";
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects: Effect[], category: "area" | "persistent" = "area", scale = 1, originX?: number) => {
      if (contact.pet) abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, category, scale, originX);
      else abilityHit(ctx.world, ctx.self, contact.target, ability, effects, scale, originX);
    };
    const internal = (key: string, name: string, effects: Effect[], flags: AbilitySpec["flags"] = {}): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true, ...flags }, onHit: effects, usable: () => false });
    const smash = internal("Ismash", p.name, [], { spellShield: false, parry: true, appliesOnHit: true, appliesLifeSteal: true, basicDamage: true, petBasicAttack: true });
    const cleave = internal("Icleave", `${p.name} (area)`, [], { spellShield: false });
    const gust = internal("Qgust", q.name, [{ type: "damage", damageType: "magic", amount: qDamage }], { projectile: true }); gust.persistsAfterDeath = true;
    const tornadoDamage: Formula = { base: 0, ratios: { targetMaxHP: tornadoPct }, products: [{ ratio: tornadoAP, stats: ["AP", "targetMaxHP"] }] };
    const tornado = internal("Qtornado", `${q.name} (tornado)`, [{ type: "damage", damageType: "magic", amount: tornadoDamage, persistent: true, noLifeSteal: true, petDamageCategory: "persistent" }], { spellShield: false }); tornado.persistsAfterDeath = true;
    const taunt = internal("Wtaunt", w.name, []), punch = internal("Ehit", e.name, []), landing = internal("Rlanding", r.name, [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "displace", direction: "away", distance: rKnock, duration: rCC }]);
    const readySmash = (self: Unit, tick: number) => tick >= Number(self.memory[`${P}:ready`] ?? 0);
    const syncSmash = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.resurrection) return;
      ctx.buff(P, "attackSpeed", readySmash(ctx.self, ctx.tick) ? pAS : 0, Infinity);
    };
    const bulwark = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== SHIELD);
      ctx.apply({ type: "shield", shieldType: "magic", amount: shieldFormula, duration: Infinity }, true);
      ctx.self.statuses.at(-1)!.memoKey = SHIELD;
      ctx.memory[`${SHIELD}:full`] = true;
    };
    const reductions = (ctx: HookContext, seconds: number) => {
      ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== `${W}:physical` && status.memoKey !== `${W}:magic`);
      for (const [kind, formula] of [["physicalReduction", physicalDR], ["magicReduction", magicDR]] as const) {
        ctx.apply({ type: "state", state: kind, value: Math.min(1, evaluate(formula, ctx.self)), duration: seconds }, true);
        ctx.self.statuses.at(-1)!.memoKey = `${W}:${kind === "physicalReduction" ? "physical" : "magic"}`;
      }
    };
    const lock = (ctx: HookContext, seconds: number) => {
      ctx.apply({ type: "state", state: "noAttacks", duration: seconds }, true);
      ctx.memory["lockedUntil"] = Math.max(Number(ctx.memory["lockedUntil"] ?? 0), ctx.tick + ticks(seconds));
    };
    const releaseW = (ctx: HookContext) => {
      if (!ctx.memory[W]) return;
      const elapsed = Math.min(wFull, Math.max(0, (ctx.tick - Number(ctx.memory[`${W}:start`])) / 30)), radius = seriesAt(wRadii, elapsed, false), duration = seriesAt(wTaunts, elapsed, false);
      delete ctx.memory[W]; ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== `${W}:slow`);
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "W") ctx.self.action = undefined;
      if (!ctx.self.alive || ctx.self.resurrection) return;
      reductions(ctx, wLinger); lock(ctx, wLock);
      for (const contact of contacts(ctx)) if (champion(contact.target) && Math.abs(contact.target.x - ctx.self.x) <= radius + contact.target.spec.base.radius + EPSILON) {
        hit(ctx, contact, taunt, [{ type: "damage", damageType: "magic", amount: scaled(wMin, 1 + seriesAt(wAmplification, elapsed, false) / 100) }, { type: "cc", cc: "taunt", duration }]);
      }
    };
    const friendlyChampions = (self: Unit, world: World) => world.pets.filter((pet) => pet.owner === self.side && pet.hp > 0 && pet.endTick > world.tick && pet.spec.targetClass === "champion" && !pet.spec.untargetable && canTarget(petFormulaTarget(pet, self, world.tick), self));
    const chooseAlly = (self: Unit, world: World, aim?: { direction: -1 | 1; distance?: number }) => {
      const list = friendlyChampions(self, world).filter((pet) => Math.abs(pet.x - self.x) <= rRange + EPSILON), enemy = world.units[1 - self.side]!;
      const point = aim?.distance === undefined ? enemy.x : self.x + directionTo(self, enemy) * aim.direction * aim.distance;
      return list.sort((a, b) => Math.abs(a.x - point) - Math.abs(b.x - point) || a.id - b.id)[0];
    };
    const activeLock = (self: Unit, world: World) => world.tick < Number(self.memory.lockedUntil ?? 0);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, delivery: { kind: "self" }, roles: ["damage"], usable: (self, world) => !activeLock(self, world), estimate: (self, target) => evaluate(qDamage, self, target), estimateDelay: (self, target) => Math.abs(target.x-self.x)/qSpeed },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cooldownAtCastStart: true, cost: w.cost(), castTime: wCast, delivery: { kind: "self" }, roles: ["defense", "damage", "cc"], usable: (self, world) => !activeLock(self, world), channel: { duration: wTime, mobile: true, interruptible: true, interrupts: ["silence"] }, estimate: (self, target) => evaluate(scaled(wMin, 1 + seriesAt(wAmplification, wFull, false) / 100), self, target) },
      { key: "W2", name: `${w.name} (release)`, slot: "other", budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, allowedDuringChannel: ["W"], usable: (self) => !!self.memory[W] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: eCast, delivery: { kind: "dash", direction: "toward", distance: eRange, minDistance: eMin, speed: eSpeed }, flags: { grounded: e.flag("grounded"), knockdown: true }, roles: ["engage", "escape", "damage", "cc"], usable: (self, world) => !activeLock(self, world), estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cooldownAtCastStart: true, budgetExcluded: true, cost: r.cost(), castTime: rCast, delivery: { kind: "self" }, flags: { grounded: r.flag("grounded") }, channel: { duration: rTime, interruptible: true, interrupts: ["root", "silence", "ground"] }, roles: ["damage", "engage", "defense"], usable: (self, world) => !activeLock(self, world) && !!chooseAlly(self, world), estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: () => rTime },
      smash, cleave, gust, tornado, taunt, punch, landing,
    ];
    const behavior: Behavior = (view) => {
      if (view.self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (view.self.action?.kind === "channel" && view.self.action.ability === "W") {
        const elapsed = (view.world.tick - Number(view.self.memory[`${W}:start`])) / 30, radius = seriesAt(wRadii, Math.min(elapsed, wFull), false);
        if ((elapsed >= wFull || (Math.abs(view.enemy.x-view.self.x) > radius + view.enemy.spec.base.radius && elapsed > 0 && view.mode === "flee")) && canCast(view.world, view.self, abilities[2]!)) return { kind: "cast", ability: "W2" };
      }
      const command = defaultBehavior(view);
      if (command?.kind !== "cast") return command;
      if (command.ability === "R" && view.mode !== "fight") return { kind: "move", direction: view.mode === "flee" ? -1 : 0 };
      if (command.ability === "Q" && Math.abs(view.enemy.x-view.self.x) > qRange + view.enemy.spec.base.radius) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      if (command.ability === "W" && Math.abs(view.enemy.x-view.self.x) > seriesAt(wRadii, wFull, false) + view.enemy.spec.base.radius && !view.threats.length) return { kind: "move", direction: view.mode === "hold" ? 0 : view.mode === "flee" ? -1 : 1 };
      return command;
    };
    // Pure geometry caches contain no world state and are safe across cloned simulation branches.
    const curves = new Map<string, Array<{ arc: number; lateral: number; forward: number }>>();
    const curve = (index: number, length: number) => {
      const cacheKey = `${index}:${length}`, cached = curves.get(cacheKey); if (cached) return cached;
      const path = paths[index]!, points: Array<{ arc: number; lateral: number; forward: number }> = [];
      for (let i = 0; i <= 128; i++) {
        const t = i/128, h00 = 2*t*t*t-3*t*t+1, h10=t*t*t-2*t*t+t, h01=-2*t*t*t+3*t*t, h11=t*t*t-t*t;
        const lateral=h00*path.start[0]!+h10*length*path.a[0]!+h11*length*path.b[0]!, forward=h00*path.start[1]!+h10*length*path.a[1]!+h01*length+h11*length*path.b[1]!, previous=points.at(-1);
        points.push({ arc: (previous?.arc??0)+(previous?Math.hypot(lateral-previous.lateral, forward-previous.forward):0), lateral, forward });
      }
      // Bound pure memoization during long production searches over different aimed distances.
      if (curves.size >= 256) curves.clear(); curves.set(cacheKey, points); return points;
    };
    kit.assume("Colossal Smash begins ready with40%bonusAS, a static5second clock and the exact level20 wiki126.764705882353base. The empowered primary replaces ordinary AD with basic magic damage; only its AD component crits for the pinned200%, while AP and bonusMR do not crit. The primary applies its ordinary on-hit packet twice; Spellblade remains its own physical packet. Cleave is separately guarded area proc damage around the real recipient. Ward/plant hit-count props cannot consume the passive. Only actual Champion-class or explicitly sourced epic-monster ability contacts reduce the current cooldown by3seconds once per cast, even spell shielding; unclassified monsters are not invented epic monsters.");
    kit.assume("Q uses both exact Hermite splines and1400arc-length speed, with250lateral/-100forward initial offsets and60collision radius (120full width). Curves are sampled128times, retaining their lateral distance against targets on the duel axis, and each cast shares one gust contact per real body. Each flight can be independently destroyed and both must reach the actual aimed endpoint before a tornado forms. The merged tornado moves forward at the primary estimated50speed and applies four half-second persistent packets over2seconds. Its2%+1%per100AP maximum-health damage ignores spell shields; only explicitly Monster-class pets receive the primary150cap. Binary monster cap50, tornado speed60 and radius225 disagree with the pinned primary and are not substituted. Released gusts and tornados persist through death.");
    kit.assume("W starts with its rank-five13.5%maximum-health magic-only shield and restores one full shield after8seconds without any incoming damage, including absorbed damage. Charge moves at15%self-slow and snapshots primary physical22.5%+1.5%per100AP+4%per100bonusMR+0.5%per100bonusHP and magic45%+4%per100AP+8%per100bonusMR+1%per100bonusHP reductions, capped at100%. The physical AP ratio differs from the binary and the pinned primary takes precedence. Recast or silence releases current charge in the nine sourced0.15625second steps up to1.25seconds, refreshes reductions2seconds and locks attacks/casts0.4seconds. Only real enemy champions are taunted/damaged. Static60movement is tied to accepted taunt and slow immunity; its unpublished brief delay and slightly longer duration are conservatively omitted.");
    kit.assume("E retains the primary0.4second backward-step cast window, then performs an interruptible2300speed forwarddash with250minimum/650maximum aimed displacement, sourced from the full raw template and exact display array rather than the parser's truncated250range. Neither pinned source publishes backward displacement/speed; that distance and backward-step contacts are omitted rather than fabricated. The forward swept200radius damages each actual body once, nonchampions at80%, applies0.75second knockup/standard sight, and stops at the first real Champion-class pathing body or terrain independently of spell shielding. There is no second damage packet on the forward leg. Anti-dash and forced interruption use shared dash rules.");
    kit.assume("R requires an actual living visible friendly Champion-class body; ordinary1v1 worlds provide none. Actual allied pets only qualify with explicit sourced targetClass champion; clone names or unitClass clone alone do not establish eligibility. No ally is created and no R damage/shield budget is assigned. Conditional R freezes that ally's cast position, resets Galio's own W shield, and grants five-second magic shields to actual allied champions in650radius. The2.75second channel is vulnerable for its first1.25seconds, then untargetable/CCimmune; source estimated0.8air/0.2travel leave the published remaining0.5second landing lock. Impact deals350+70%AP+100%bonusMR with100knockback/0.75airborne at the frozen landing spot even if terrain stops Galio's travel. The ordinary engine has only two champion sides: additional real allied champion units, vision teams and allied-source crowd-control during R are limited to the available explicit body representation.");
    return {
      abilities, behavior, attack: { onHitToPets: true },
      budget: {
        damage(self, target) {
          const d=derive(self), haste=1+d.abilityHaste/100, rate=Math.min(d.attackSpeed, 1/pCD + pReduction/pCD*(haste/qCD+haste/eCD+haste/wCD)), raw=smashBase+smashAP*d.ap+smashMR*d.mr.bonus+smashAD*d.ad*(1+d.critChance*(pCrit-1));
          return { physical: -rate*attackDamage(self), magic: rate*raw + evaluate(qDamage,self,target)/(qCD/haste+qCast) + evaluate(scaled(wMin,1+seriesAt(wAmplification,wFull,false)/100),self,target)/(wCD/haste+wFull) + evaluate(eDamage,self,target)/(eCD/haste+eCast) };
        },
      },
      hooks: {
        onStart(ctx) { bulwark(ctx); syncSmash(ctx); },
        onAttack(ctx) { if (readySmash(ctx.self,ctx.tick) && !ctx.targetPet?.spec.hitPoints) ctx.action.uncancellable=true; },
        onAttackBeforeDamage(ctx) {
          if (ctx.blocked || !readySmash(ctx.self,ctx.tick) || ctx.pet?.spec.hitPoints) return;
          const d=derive(ctx.self), amount: Formula={ base: smashBase+smashAD*d.ad*(1+ctx.critChance*(pCrit-1)), ratios:{AP:smashAP,bonusMR:smashMR} }, origin=ctx.enemy.x;
          ctx.attack.baseDamageScale=0; ctx.memory[`${P}:ready`]=ctx.tick+ticks(pCD); syncSmash(ctx);
          // Primary is still basic damage, independent of area-specific pet reductions.
          if (ctx.pet) abilityHitPet(ctx.world,ctx.self,ctx.pet,smash,[{type:"damage",damageType:"magic",amount}],"basic",ctx.scale);
          else abilityHit(ctx.world,ctx.self,ctx.enemy,smash,[{type:"damage",damageType:"magic",amount}],ctx.scale);
          for (const contact of contacts(ctx)) if ((ctx.pet ? contact.pet?.id!==ctx.pet.id : !!contact.pet) && Math.abs(contact.target.x-origin)<=pRadius+contact.target.spec.base.radius+EPSILON) hit(ctx,contact,cleave,[{type:"damage",damageType:"magic",amount,noLifeSteal:true,petDamageCategory:"proc"}],"area",ctx.scale,origin);
        },
        onAbilityContact(ctx) {
          const root=ctx.ability.key.startsWith("Q")?"Q":ctx.ability.key==="Wtaunt"?"W":ctx.ability.key==="Ehit"?"E":ctx.ability.key==="Rlanding"?"R":undefined;
          if (!root || (!champion(ctx.enemy) && !ctx.world.pets.some(pet=>pet.id===ctx.enemy.petId&&pet.spec.epicMonster))) return;
          const group=ctx.ability.key.startsWith("Q")?Number(ctx.memory["galio:contactGroup"]):Number(ctx.memory[`galio:cast:${root}`]), key=`${P}:reduced:${root}:${group}`;
          if (ctx.memory[key]) return; ctx.memory[key]=true; ctx.memory[`${P}:ready`]=Math.max(ctx.tick,Number(ctx.memory[`${P}:ready`]??0)-ticks(pReduction)); syncSmash(ctx);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key!=="Wtaunt" || !ctx.enemy.statuses.some(status=>status.key==="taunt"&&status.source===ctx.self.side&&status.endTick>ctx.tick) || hasState(ctx.enemy,"slowImmune")) return;
          const taunted=ctx.enemy.statuses.find(status=>status.key==="taunt"&&status.source===ctx.self.side)!;
          const effect: Effect={type:"state",state:"moveSpeedOverride",value:staticMS,duration:(taunted.endTick-ctx.tick)/30};
          ctx.apply(effect);
          const override=ctx.enemy.statuses.findLast(status=>status.kind==="state"&&status.key==="moveSpeedOverride"&&status.source===ctx.self.side); if(override)override.memoKey="galio:tauntSpeed";
        },
        onDamageTaken(ctx) { if (ctx.amount>0||ctx.absorbed>0) { ctx.memory[`${SHIELD}:damaged`]=ctx.tick; ctx.memory[`${SHIELD}:full`]=false; } },
        onCastStart(ctx) {
          if (["Q","W","E","R"].includes(ctx.ability.key)) ctx.memory[`galio:cast:${ctx.ability.key}`]=ctx.world.nextId++;
          if (ctx.ability.key==="E") { ctx.memory["galio:e:direction"]=directionTo(ctx.self,ctx.enemy)*(ctx.aim?.direction??1); ctx.memory["galio:e:distance"]=Math.max(eMin,Math.min(eRange,ctx.aim?.distance??Math.abs(ctx.enemy.x-ctx.self.x))); }
          if (ctx.ability.key==="R") { const ally=chooseAlly(ctx.self,ctx.world,ctx.aim); ctx.memory[`${R}:target`]=ally?.id??-1; if (ally) ctx.memory[`${R}:x`]=ally.x; }
        },
        onCast(ctx) {
          if (ctx.ability.key==="Q") {
            const direction=(directionTo(ctx.self,ctx.enemy)*(ctx.aim?.direction??1)) as -1|1, distance=Math.max(0,Math.min(qRange,ctx.aim?.distance??Math.abs(ctx.enemy.x-ctx.self.x))), group=Number(ctx.memory["galio:cast:Q"]);
            for(let index=0;index<paths.length;index++) {
              const m:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:gust.key,seenTick:ctx.tick-ticks(qCast),x:ctx.self.x+direction*paths[index]!.start[1]!,perTick:0,direction,travelLeft:Infinity,homing:false,projectile:true,interceptable:true,radius:paths[index]!.radius,connects:false,scale:1,onHit:gust.onHit!,expiresTick:ctx.tick+ticks(curve(index,distance).at(-1)!.arc/qSpeed)+2};
              const key=`galio:q:${m.id}:`; ctx.memory[`${key}path`]=index;ctx.memory[`${key}start`]=ctx.tick;ctx.memory[`${key}origin`]=ctx.self.x;ctx.memory[`${key}distance`]=distance;ctx.memory[`${key}group`]=group;ctx.memory[`${key}lateral`]=paths[index]!.start[0]!;ctx.world.missiles.push(m);
            }
          }
          if(ctx.ability.key==="W") { ctx.memory[W]=true;ctx.memory[`${W}:start`]=ctx.tick;reductions(ctx,wTime);ctx.apply({type:"cc",cc:"slow",strength:selfSlow,duration:wTime},true);ctx.self.statuses.at(-1)!.memoKey=`${W}:slow`; }
          if(ctx.ability.key==="W2") releaseW(ctx);
          if(ctx.ability.key==="E") {
            ctx.memory["galio:e:end"]=ctx.self.x+Number(ctx.memory["galio:e:direction"])*Number(ctx.memory["galio:e:distance"]);
          }
          if(ctx.ability.key==="R") {
            const ally=ctx.world.pets.find(pet=>pet.id===ctx.memory[`${R}:target`]&&pet.hp>0&&pet.spec.targetClass==="champion");
            if(!ally) { ctx.self.action=undefined;return; }
            ctx.memory[R]=true;ctx.memory[`${R}:start`]=ctx.tick;ctx.memory[`${R}:origin`]=ctx.self.x;bulwark(ctx);
            for(const recipient of friendlyChampions(ctx.self,ctx.world)) if(Math.abs(recipient.x-Number(ctx.memory[`${R}:x`]))<=rRadius+recipient.spec.radius+EPSILON) {
              recipient.statuses=(recipient.statuses??[]).filter(status=>status.memoKey!==`${R}:shield`);
              recipient.statuses.push({kind:"shield",key:"R",memoKey:`${R}:shield`,source:ctx.self.side,startTick:ctx.tick,endTick:ctx.tick+ticks(rShieldTime),value:evaluate(shieldFormula,ctx.self),shieldType:"magic"});
            }
          }
        },
        onChannelInterrupt(ctx) { if(ctx.ability.key==="W") { if(ctx.reason==="death"||ctx.reason==="resurrection") delete ctx.memory[W]; else releaseW(ctx); } if(ctx.ability.key==="R") delete ctx.memory[R]; },
        onTick(ctx) {
          syncSmash(ctx);
          for(const contact of contacts(ctx)) if(hasState(contact.target,"slowImmune")) { const statuses=contact.target.statuses.filter(status=>status.memoKey!=="galio:tauntSpeed"); if(contact.pet)contact.pet.statuses=statuses;else contact.target.statuses=statuses; }
          if(!ctx.self.resurrection && !ctx.memory[`${SHIELD}:full`] && ctx.tick>=Number(ctx.memory[`${SHIELD}:damaged`]??0)+ticks(shieldRecharge)) bulwark(ctx);
          if(ctx.memory[W]&&ctx.tick>=Number(ctx.memory[`${W}:start`])+ticks(wTime)) releaseW(ctx);
          if(ctx.memory[R]) {
            const start=Number(ctx.memory[`${R}:start`]), airTick=start+ticks(rImmune), dashTick=airTick+ticks(rAir), landTick=dashTick+ticks(rTravel), finish=start+ticks(rTime), destination=Number(ctx.memory[`${R}:x`]);
            if(ctx.tick===airTick) { for(const state of ["ccImmune","untargetable"] as const) { ctx.apply({type:"state",state,duration:(finish-ctx.tick)/30},true); ctx.self.statuses.at(-1)!.memoKey=`${R}:${state}`; }
              ctx.world.missiles=ctx.world.missiles.filter(missile=>!(missile.owner!==ctx.self.side&&missile.homing&&missile.pet===undefined&&!missile.hitsUntargetable));
              if(ctx.world.petMissiles) ctx.world.petMissiles=ctx.world.petMissiles.filter(missile=>!(missile.owner!==ctx.self.side&&missile.target===ctx.self.side));
            }
            if(ctx.tick>=dashTick&&ctx.tick<=landTick) { const origin=Number(ctx.memory[`${R}:origin`]), direction=(destination===origin?directionTo(ctx.self,ctx.enemy):Math.sign(destination-origin)), endpoint=origin+direction*Math.max(rMinDash,Math.abs(destination-origin)), proposed=origin+(endpoint-origin)*Math.min(1,(ctx.tick-dashTick)/Math.max(1,landTick-dashTick));ctx.self.x+=terrainLimit(ctx.world,ctx.self,proposed-ctx.self.x); }
            if(ctx.tick>=landTick&&!ctx.memory[`${R}:landed`]) {
              ctx.memory[`${R}:landed`]=true;ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==`${R}:untargetable`);lock(ctx,rLock);
              for(const contact of contacts(ctx)) if(Math.abs(contact.target.x-destination)<=rRadius+contact.target.spec.base.radius+EPSILON) hit(ctx,contact,landing,landing.onHit!.map(effect=>effect.type==="displace"?{...effect,originX:destination}:effect),"area",1,destination);
            }
            if(ctx.tick>=finish) { delete ctx.memory[R];delete ctx.memory[`${R}:landed`]; }
          }
        },
        onDashTick(ctx) {
          if(ctx.ability.key!=="E")return;
          const from=ctx.self.x,direction=Number(ctx.memory["galio:e:direction"]),requested=direction*Math.min(eSpeed/30,Math.max(0,(Number(ctx.memory["galio:e:end"])-from)*direction));
          let step=terrainLimit(ctx.world,ctx.self,requested);
          const list=contacts(ctx).filter(contact=>!isUntargetable(contact.target,ctx.self)&&!inStasis(contact.target));
          for(const contact of list) if(champion(contact.target)) { const distance=Math.max(0,(contact.target.x-from)*direction-ctx.self.spec.base.pathingRadius-contact.target.spec.base.pathingRadius); if((contact.target.x-from)*direction>=-EPSILON&&distance<=Math.abs(step)+EPSILON) step=direction*Math.min(Math.abs(step),distance); }
          const end=from+step,group=Number(ctx.memory["galio:cast:E"]);
          for(const contact of list) {
            const key=`galio:e:hit:${group}:${contact.pet?.id??"champion"}`;
            if(ctx.memory[key]||contact.target.x<Math.min(from,end)-eRadius-contact.target.spec.base.radius-EPSILON||contact.target.x>Math.max(from,end)+eRadius+contact.target.spec.base.radius+EPSILON)continue;
            ctx.memory[key]=true;hit(ctx,contact,punch,[{type:"damage",damageType:"magic",amount:champion(contact.target)?eDamage:eNonChampion},{type:"displace",direction:"away",distance:0,duration:eCC},{type:"state",state:"standardSight",duration:eCC}]);
          }
          ctx.action.stopAtContact=false;ctx.action.perTick=step;
          if(step!==requested||Math.abs(Number(ctx.memory["galio:e:end"])-end)<=EPSILON||step===0)ctx.action.endTick=ctx.tick;
        },
        onLethal(ctx) { delete ctx.memory[W];delete ctx.memory[R];ctx.memory[`${SHIELD}:full`]=false;ctx.memory[`${SHIELD}:damaged`]=ctx.tick;return false; },
        onProjectileIntercept(ctx) {
          if(ctx.missile.source!==gust.key)return false;
          const group=Number(ctx.memory[`galio:q:${ctx.missile.id}:group`]),seen=`galio:q:hit:${group}:champion`;
          ctx.memory["galio:contactGroup"]=group;
          if(!ctx.memory[seen]) {ctx.memory[seen]=true;hit(ctx,{target:ctx.target},gust,gust.onHit!,"area",ctx.missile.scale,ctx.from);}
          (ctx.missile.hitTargets??=[]).push(ctx.target.side);
          return true;
        },
        onMissileTick(ctx) {
          const m=ctx.missile;
          if(m.source===tornado.key) {
            const key=`galio:tornado:${m.id}:`,start=Number(ctx.memory[`${key}start`]);m.x=Number(ctx.memory[`${key}origin`])+m.direction*tornadoSpeed*(ctx.tick-start)/30;
            if(ctx.tick>=Number(ctx.memory[`${key}next`])) {ctx.memory[`${key}next`]=Number(ctx.memory[`${key}next`])+ticks(tornadoInterval);ctx.memory["galio:contactGroup"]=Number(ctx.memory[`${key}group`]);for(const contact of contacts(ctx))if(Math.abs(contact.target.x-m.x)<=qRadius+contact.target.spec.base.radius+EPSILON){const raw=evaluate(tornadoDamage,ctx.self,contact.target),amount=contact.target.spec.targetClass==="monster"?Math.min(tornadoMax,raw):raw;hit(ctx,contact,tornado,[{type:"damage",damageType:"magic",amount:{base:amount},persistent:true,noLifeSteal:true,petDamageCategory:"persistent"}],"persistent",1,m.x);}}
            if(ctx.tick>=start+ticks(tornadoTime))m.ended=true;return;
          }
          if(m.source!==gust.key)return;
          const key=`galio:q:${m.id}:`,index=Number(ctx.memory[`${key}path`]),length=Number(ctx.memory[`${key}distance`]),origin=Number(ctx.memory[`${key}origin`]),group=Number(ctx.memory[`${key}group`]),points=curve(index,length),traveled=(ctx.tick-Number(ctx.memory[`${key}start`]))/30*qSpeed,last=points.at(-1)!;
          let low=0,high=points.length-1;while(low+1<high){const mid=(low+high)>>1;if(points[mid]!.arc<traveled)low=mid;else high=mid;}
          const a=points[low]!,b=points[high]!,share=Math.min(1,Math.max(0,(traveled-a.arc)/(b.arc-a.arc||1))),lateral=a.lateral+(b.lateral-a.lateral)*share,forward=a.forward+(b.forward-a.forward)*share,from=m.x,oldLateral=Number(ctx.memory[`${key}lateral`]),proposed=origin+m.direction*forward,block=projectileBlockPoint(ctx.world,ctx.self.side,from,proposed),to=block??proposed,clip=proposed===from?1:(to-from)/(proposed-from),newLateral=oldLateral+(lateral-oldLateral)*clip;
          m.x=to;ctx.memory[`${key}lateral`]=newLateral;ctx.memory["galio:contactGroup"]=group;
          const dx=to-from,dy=newLateral-oldLateral,segmentSquared=dx*dx+dy*dy;
          const collisions=contacts(ctx).flatMap(contact=>{
            if(isUntargetable(contact.target,ctx.self)||inStasis(contact.target))return [];
            const offset=from-contact.target.x,radius=paths[index]!.radius+contact.target.spec.base.radius,projection=Math.min(1,Math.max(0,(-offset*dx-oldLateral*dy)/(segmentSquared||1)));
            if(Math.hypot(offset+dx*projection,oldLateral+dy*projection)>radius+EPSILON)return [];
            // First entry into the real 2D body circle, not the earlier scalar x envelope.
            const c=offset*offset+oldLateral*oldLateral-radius*radius,b=2*(offset*dx+oldLateral*dy),entry=c<=0||segmentSquared===0?0:Math.min(1,Math.max(0,(-b-Math.sqrt(Math.max(0,b*b-4*segmentSquared*c)))/(2*segmentSquared)));
            return [{contact,entry}];
          }).sort((a,b)=>a.entry-b.entry);
          for(const {contact,entry} of collisions) {
            const seen=`galio:q:hit:${group}:${contact.pet?.id??"champion"}`;
            if(!contact.pet&&interceptProjectile(ctx.world,m,from,to,from+dx*entry)) {ctx.memory[`${key}lateral`]=oldLateral+dy*entry;return;}
            if(ctx.memory[seen])continue;
            ctx.memory[seen]=true;hit(ctx,contact,gust,gust.onHit!,"area",1,from);
          }
          if(block!==undefined){m.ended=true;return;}if(traveled<last.arc-EPSILON)return;
          m.ended=true;const arrived=`galio:q:arrived:${group}`;ctx.memory[arrived]=Number(ctx.memory[arrived]??0)+1;
          if(ctx.memory[arrived]!==paths.length)return;
          const t:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:tornado.key,seenTick:ctx.tick,x:origin+m.direction*length,perTick:0,direction:m.direction,travelLeft:Infinity,homing:false,projectile:false,connects:false,scale:1,onHit:tornado.onHit!,expiresTick:ctx.tick+ticks(tornadoTime)+1};
          const tk=`galio:tornado:${t.id}:`;ctx.memory[`${tk}start`]=ctx.tick;ctx.memory[`${tk}origin`]=t.x;ctx.memory[`${tk}group`]=group;ctx.memory[`${tk}next`]=ctx.tick+ticks(tornadoInterval);ctx.world.missiles.push(t);
        },
      },
    };
  },
};
export default galio;
