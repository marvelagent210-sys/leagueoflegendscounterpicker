/** Eight independently sourced stages; real energy, contacts, allies and displacement. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON, inAttackRange } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, heal, inStasis, isUntargetable, notifyDashEnd } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import { terrainGap } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const FLURRY = "leesin:flurry", QMARK = "leesin:sonic", EMARK = "leesin:tempest", VAMP = "leesin:ironWill", SLOW = "leesin:cripple";
type Contact = { target: Unit; pet?: Pet };
const leeSin: KitModule = {
  champion: "LeeSin",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Sonic Wave"), q2 = kit.ability("Resonating Strike"), w = kit.ability("Safeguard"), w2 = kit.ability("Iron Will"), e = kit.ability("Tempest"), e2 = kit.ability("Cripple"), r = kit.ability("R");
    const flurryCount = p.quoted("next 2 basic attacks"), flurryTime = p.quoted("within 3 seconds"), flurryAS = p.quoted("40% bonus attack speed") / 100, firstEnergy = p.levelValue("The first attack restores", 0), secondEnergy = p.levelValue("The first attack restores", 1);
    const qDamage = q.formula("Physical Damage"), qCD = q.cooldown(), qCast = q.castTime(), qRange = q.field("targetRange"), qWidth = q.field("width"), qSpeed = q.field("speed"), qTime = q.quoted("marks them for 3 seconds");
    q.textField("cooldownStart"); q.quote("first enemy hit"); q.quote("wherever the caster is at the start of the cast time"); q.quote("{{tip|true sight|revealed}}");
    const q2Damage = q2.formula("Minimum Physical Damage"), q2Max = q2.formula("Maximum Physical Damage"), q2Range = q2.field("targetRange"), q2Speed = q2.fieldNumbers("speed"), q2Track = q2.quoted("moves beyond 2000 units");
    q2.seriesIn("Upon arrival, he consumes the mark"); q2.quote("will track the target if they change locations"); q2.quote("without consuming the mark"); q2.quote("on top of the target upon arrival"); q2.quote("cannot be cast without the marked target nearby or if the target is untargetable"); q2.quote("damage dealt by Resonating Strike can be negated if the target blinks");
    const wShield = w.formula("Shield Strength"), wCD = w.cooldown(), wRange = w.field("targetRange"), wSpeed = w.fieldNumbers("speed"), wTime = w.quoted("shield for 2 seconds"), wWindow = w.quoted("within the next 3 seconds");
    w.textField("cooldownStart"); w.quote("cannot self-cast Safeguard while grounded or rooted"); w.quote("any targetable allied unit excluding structures"); w.quote("If the target is a minion or ward, Lee Sin also shields himself"); w.quote("will not grant its shield if the dash is interrupted"); w.quote("shield immediately rather than on arrival");
    const wRefund = w.gameQuoted('"name":"W1CooldownRecovered","values":[0.5,0.5,0.5,0.5,0.5,0.5,0.5]'), vamp = w2.fraction("Omnivamp"), vampTime = w2.quoted("for 4 seconds");
    const eDamage = e.formula("Magic Damage"), eCD = e.cooldown(), eCast = e.castTime(), eRadius = e.field("effectRadius"), eTime = e.quoted("marking them for 4 seconds"), eWindow = e.quoted("within the next 3 seconds"), eDelay = e.quoted("after a 0.1-second delay"), e2Radius = e2.field("effectRadius"), eSlow = e2.fraction("Slow"), slowTime = e2.quoted("over 4 seconds");
    e.textField("cooldownStart"); e.quote("if they are not invisible when struck"); e.quote("sight reveal is not removed when Lee Sin casts Cripple"); e.quote("wherever the caster is at the end of the cast time"); e2.quote("A nearby marked enemy is required");
    const rDamage = r.formula("Physical Damage"), rCD = r.cooldown(), rCast = r.castTime(), rRange = r.field("targetRange"), kickDistance = r.quoted("up to 800 units"), kickTime = r.quoted("over 0.8 seconds"), airTime = r.quoted("airborne for 1 second"), collisionRadius = r.field("collisionRadius"), collisionEvery = r.quoted("Checks for collision every 0.25 seconds"), collisionHP = r.quoted("(+ 12 / 15 / 18% of primary target's bonus health)", 2) / 100;
    r.quote("direction is decided at the moment of impact"); r.quote("its ability to collide with enemies is removed"); r.quote("after they reach their destination"); r.quote("corpse to be displaced and collide"); r.quote("this ability will cancel but does not go on cooldown nor pay its cost");
    p.gameQuote('"name":"PassiveAS","values":[40.0,40.0,40.0,40.0,40.0,40.0,40.0]');
    q.gameQuote('"mMissileWidth":60.0'); q.gameQuote('"mSpeed":1800.0'); q.gameQuote('"castRange":[1200.0,1200.0,1200.0,1200.0,1200.0,1200.0,1200.0]'); q2.gameQuote('"castRange":[1250.0,1250.0,1250.0,1250.0,1250.0,1250.0,1250.0]');
    w.gameQuote('"name":"DashSpeed","values":[1350.0,1350.0,1350.0,1350.0,1350.0,1350.0,1350.0]'); w2.gameQuote('"mana":[25.0,25.0,25.0,25.0,25.0,25.0]'); e.gameQuote('"name":"SlowDuration","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]'); e2.gameQuote('"castRange":[575.0,575.0,575.0,575.0,575.0,575.0,575.0]'); r.gameQuote('"name":"KickDistance","values":[800.0,800.0,800.0,800.0,800.0,800.0,800.0]');

    const contacts = (world: World, self: Unit): Contact[] => [
      ...(world.units[1-self.side]!.alive ? [{ target: world.units[1-self.side]! }] : []),
      ...world.pets.filter((pet) => pet.owner !== self.side && pet.hp > 0 && !pet.spec.untargetable).map((pet) => ({ target: petFormulaTarget(pet, self, world.tick), pet })),
    ];
    const marked = (target: Unit, self: Unit, key: string, tick: number) => target.statuses.some((s) => s.key === key && s.source === self.side && s.endTick > tick);
    const valid = (target: Unit, self: Unit) => target.alive && target.hp > 0 && !isUntargetable(target, self) && !inStasis(target);
    const qTarget = (self: Unit, world: World) => contacts(world, self).find(({ target }) => valid(target, self) && canSee(target, self) && marked(target, self, QMARK, world.tick) && Math.abs(target.x-self.x) <= q2Range + EPSILON);
    const crippleTargets = (self: Unit, world: World) => contacts(world, self).filter(({ target }) => valid(target, self) && marked(target, self, EMARK, world.tick) && Math.abs(target.x-self.x) <= e2Radius + EPSILON);
    const fromId = (ctx: HookContext, key: string): Contact | undefined => {
      const id = ctx.memory[key]; if (id === -1) return { target: ctx.world.units[1-ctx.self.side]! };
      const pet = ctx.world.pets.find((body) => body.id === id); return pet ? { target: petFormulaTarget(pet, ctx.self, ctx.tick), pet } : undefined;
    };
    const ordinary = (self: Unit) => !self.action || self.action.kind === "windup";
    const recastMotion = (self: Unit) => ordinary(self) || self.action?.kind === "dash";
    const allies = (world: World, self: Unit) => world.pets.filter((pet) => pet.owner === self.side && canTargetPet(pet, self, world.tick) && Math.abs(pet.x-self.x) <= wRange + EPSILON);
    const anchor = (ctx: HookContext, aim?: Aim): Pet | undefined => {
      if (!aim || aim.distance === undefined) return undefined;
      const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * aim.direction * aim.distance;
      return allies(ctx.world, ctx.self).sort((a,b) => Math.abs(a.x-x)-Math.abs(b.x-x) || a.id-b.id)[0];
    };
    const internal = (key: string, name: string, flags: AbilitySpec["flags"] = {}): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true, ...flags }, usable: () => false });
    const qHit = internal("Q2hit", q2.name), eHit = internal("Ehit", e.name), slow = internal("E2hit", e2.name), root = internal("Rroot", `${r.name} (root)`), body = internal("Rbody", `${r.name} (collision)`); body.persistsAfterDeath = true;
    const qExecute = (self: Unit, target: Unit) => {
      const missing = Math.max(0, Math.min(1, (derive(target).maxHp-target.hp)/derive(target).maxHp));
      return evaluate(q2Damage, self, target) + (evaluate(q2Max, self, target)-evaluate(q2Damage, self, target))*missing;
    };
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects: Effect[], category: "singleTarget" | "area" = "singleTarget") => contact.pet ? abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, category) : abilityHit(ctx.world, ctx.self, contact.target, ability, effects);
    const shield = (ctx: HookContext, pet?: Pet) => {
      if (!pet || pet.spec.targetClass === "minion" || pet.spec.targetClass === "champion") applyEffect(ctx.world, ctx.self, ctx.self, { type: "shield", amount: wShield, duration: wTime }, { scale: 1 });
      if (pet?.spec.targetClass === "champion" && pet.spec.unitClass !== "clone") applyEffect(ctx.world, ctx.self, petFormulaTarget(pet, ctx.self, ctx.tick), { type: "shield", amount: wShield, duration: wTime }, { scale: 1 });
    };
    const endOtherDash = (ctx: HookContext) => {
      const action = ctx.self.action;
      if (action?.kind !== "dash") return;
      if (action.ability === "W") { shield(ctx, fromId(ctx, "leesin:w:anchor")?.pet); ctx.memory["leesin:w:shielded"] = true; }
      ctx.self.action = action.resume; notifyDashEnd(ctx.world, ctx.self, action.ability, true);
    };
    const startDash = (ctx: HookContext, key: string, destination: number, speed: number) => {
      const distance = destination-ctx.self.x, duration = Math.max(1, ticks(Math.abs(distance)/speed));
      ctx.self.action = { kind: "dash", ability: key, startTick: ctx.tick, endTick: ctx.tick+duration, perTick: distance/duration, stopAtContact: false, unstoppable: false, crossTerrain: true };
      ctx.self.move = 0;
    };
    const passive = (ctx: HookContext & { blocked: boolean; scale: number }) => {
      const left = Number(ctx.memory[FLURRY] ?? 0);
      if (ctx.blocked || left <= 0 || ctx.tick >= Number(ctx.memory[`${FLURRY}:until`] ?? 0)) return;
      ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + (left === flurryCount ? firstEnergy : secondEnergy)*ctx.scale);
      ctx.memory[FLURRY] = Math.max(0, left-1);
      if (left <= 1) ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== `buff:${FLURRY}`);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, cooldownAtCastStart: true, castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: qRange, width: qWidth, speed: qSpeed, collisionPet: true }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }, { type: "mark", key: QMARK, duration: qTime }], usable: ordinary, roles: ["damage"], persistsAfterDeath: true, budgetExcluded: true },
      { key: "Q2", name: q2.name, slot: "other", cooldown: 0, cost: q2.cost(), castTime: q2.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, flags: { grounded: true }, usable: (self, world) => recastMotion(self) && !(self.action?.kind === "dash" && self.action.ability === "Q2") && !!qTarget(self, world), roles: ["engage", "damage"], estimate: qExecute, budgetExcluded: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), cooldownAtCastStart: true, overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, flags: { grounded: true }, usable: (self,world) => recastMotion(self) && !(self.action?.kind === "dash" && self.action.ability === "W") && world.tick >= Number(self.memory["leesin:w:until"] ?? 0), roles: ["defense"], budgetExcluded: true },
      { key: "W2", name: w2.name, slot: "other", cooldown: 0, cost: w2.cost(), castTime: w2.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, usable: (self,world) => recastMotion(self) && world.tick < Number(self.memory["leesin:w:until"] ?? 0), roles: ["buff"], budgetExcluded: true },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: eCast, cooldownAtCastStart: true, delivery: { kind: "self" }, usable: ordinary, roles: ["damage"], estimate: (self,target) => evaluate(eDamage,self,target), budgetExcluded: true },
      { key: "E2", name: e2.name, slot: "other", cooldown: 0, cost: e2.cost(), castTime: e2.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, usable: (self,world) => recastMotion(self) && world.tick >= Number(self.memory["leesin:e:ready"] ?? Infinity) && world.tick < Number(self.memory["leesin:e:until"] ?? 0) && crippleTargets(self,world).length > 0, roles: ["cc"], budgetExcluded: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, castTime: rCast, delivery: { kind: "target", range: rRange }, cancelOnInvalidTarget: true, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }, { type: "displace", direction: "away", distance: kickDistance, duration: kickTime, airborneDuration: airTime, stopAtWall: true }], usable: ordinary, roles: ["damage", "cc"], estimate: (self,target) => evaluate(rDamage,self,target), budgetExcluded: true },
      qHit, eHit, slow, root, body,
    ];
    const get = (key: string) => abilities.find((a) => a.key === key)!;
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      const normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [] } } });
      const retreat = mode === "flee" || mode === "trade" && self.memory.tradeDone;
      if (retreat) {
        const ally = allies(world,self).filter((pet) => Math.abs(pet.x-enemy.x) > Math.abs(self.x-enemy.x)).sort((a,b) => Math.abs(b.x-enemy.x)-Math.abs(a.x-enemy.x) || a.id-b.id)[0];
        if (ally && canCast(world,self,get("W"))) return { kind: "cast", ability: "W", aim: { direction: Math.sign((ally.x-self.x)*directionTo(self,enemy)) < 0 ? -1 : 1, distance: Math.abs(ally.x-self.x) } };
        if (view.threats.length && canCast(world,self,get("W"))) return { kind: "cast", ability: "W" };
        if (canCast(world,self,get("E2"))) return { kind: "cast", ability: "E2" };
        return normal ?? { kind: "move", direction: -1 };
      }
      if (self.action && self.action.kind !== "windup") return normal;
      const gap = Math.abs(self.x-enemy.x);
      if (mode !== "hold" && mode !== "trade" && canCast(world,self,get("R"))) return { kind: "cast", ability: "R" };
      // The real two-hit energy cycle takes priority over optional stage spending in melee.
      if (Number(self.memory[FLURRY]) > 0 && world.tick < Number(self.memory[`${FLURRY}:until`]) && inAttackRange(self,enemy) && normal?.kind === "attack") return normal;
      if (canCast(world,self,get("W2")) && self.hp < derive(self).maxHp && gap <= eRadius) return { kind: "cast", ability: "W2" };
      if (canCast(world,self,get("E2"))) return { kind: "cast", ability: "E2" };
      if (canCast(world,self,get("Q2"))) return { kind: "cast", ability: "Q2" };
      if (gap <= eRadius+enemy.spec.base.radius && canCast(world,self,get("E"))) return { kind: "cast", ability: "E" };
      if (canSee(enemy,self) && gap <= qRange+enemy.spec.base.radius && canCast(world,self,get("Q"))) return { kind: "cast", ability: "Q" };
      if ((view.threats.length || self.hp < derive(self).maxHp && gap <= eRadius) && canCast(world,self,get("W"))) return { kind: "cast", ability: "W" };
      return normal;
    };
    kit.assume("Flurry starts empty. Every completed real stage refreshes two unblocked on-hit basic contacts and one three-second 40% AS buff; they restore 40 then 20 energy at level 20, including actual pets. Blind, dodge, block and parry grant no refund. No phantom attacks, preduel energy spending, wards or allied minions are supplied.");
    kit.assume("Q/W/E first stages each cost 50 energy and start their independent haste-scaled cooldown at declaration; each recast costs 25 and owns its own source window. Q marks and true sight last 3 seconds from accepted first-body impact, and Q2 checks the actual marked champion or pet. Q2 tracks at the primary ideal 1350 + 100% movement-speed speed, lands on top, samples missing health at impact, and retains its mark on interruption or tracking loss beyond 2000. Blink-specific server races and distance-dependent dash bugs are unavailable.");
    kit.assume(`Safeguard defaults to self-cast; an explicit aimed endpoint selects a real targetable friendly pet anchor within 700, never a fabricated ward. It dashes to that anchor's declaration position at 1350 + 100% movement speed, grants 240 + 80% AP shield for 2 seconds on valid arrival, and grants the same to explicitly Champion-class non-clone allies. Minion anchors shield Lee; unknown summon classes are allowed as anchors without an invented shield classification. Self/champion casts recover ${Math.round(wRefund * 100)}% of the ${wCD}-second cooldown using the pinned binary; the stale primary blurb's halved rule is not extended to minions. Interrupted travel grants no shield except the source's Q/W dash replacement exception. W2 gains 26% omnivamp for 4 seconds from resolved post-mitigation packets, including shields and damage later negated by Riposte under its explicit vamp rule. Invulnerability and stasis grant no damage-based healing.`);
    kit.assume("Tempest resolves from the completion position in 450 radius, with per-body magic damage 135 + 90% total AD and a 4-second mark. True sight applies only if the target was not invisible on contact; Cripple leaves this reveal intact. At least one accepted hit opens the independent 3-second E2 window after 0.1 seconds. E2 requires an actual marked body within 550 and applies a separately guarded 75% slow decaying linearly over 4 seconds. Area and slow packets retain each pet's own defenses and ID.");
    kit.assume(`Dragon's Rage roots over its 0.25-second cast; an initial spell shield or parry denies the entire activation, while a shield gained later guards the kick. Invalid target cancellation costs no cooldown. Impact decides fixed knockback direction and deals ${rDamage.base} + ${Math.round((rDamage.ratios?.bonusAD ?? 0) * 100)}% bonus AD, moving the actual champion by the intended 800 over the primary estimated 0.8 seconds with 1-second airborne. The source lists an inconsistent radius-dependent distance bug without its exact formula; intended distance is used. Actual secondary pets collide within the estimated 160 radius on the published estimated 0.25-second checks, taking the same damage plus 18% of primary bonus HP and 1-second airborne. Collision follows the body's actual movement and stops when airborne is removed; corpses retain a virtual displacement flight. The two-champion duel may finish before postmortem secondary collisions; no extra opposing champions are fabricated.`);
    kit.assume("All movement is projected onto one line at 30 Hz. Real Q2 and W actions retain knockdown, ground/root and death guards; W2/E2 can overlay their travel. Source-described Q/W interrupted-dash E/R exceptions are omitted because ordinary Q/W do not permit other dash initiations. Reference budgets price ordinary Q/Q2 at full-health minimum, E, R, first W shield and Flurry's cast-limited extra attacks; they grant no free missing-health amplification, collision targets or preduel healing.");
    return {
      abilities, behavior, attack: { onHitToPets: true, blockStopsOnHit: true },
      budget: { damage(self,target) {
        const d=derive(self), haste=1+d.abilityHaste/100, qRate=1/(qCD/haste+qCast), eRate=1/(eCD/haste+eCast), rRate=1/(rCD/haste+rCast), wRate=1/(wCD/haste), casts=qRate*2+eRate*2+rRate+wRate*2;
        const extra=Math.min(d.attackSpeed*flurryAS/(1+d.bonusAttackSpeed), flurryCount*casts*flurryAS/(1+flurryAS));
        return { physical: (evaluate(qDamage,self,target)+evaluate(q2Damage,self,target))*qRate+evaluate(rDamage,self,target)*rRate+d.ad*extra, magic: evaluate(eDamage,self,target)*eRate };
      }, healing: (self) => evaluate(wShield,self)/(wCD*(1-wRefund)/(1+derive(self).abilityHaste/100)) },
      hooks: {
        onAttackHit: passive, onAttackPetHit: passive,
        onCastStart(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory["leesin:r:root"] = false;
            abilityHit(ctx.world,ctx.self,ctx.enemy,root,[{ type: "cc", cc: "root", duration: rCast }]);
          }
        },
        onCast(ctx) {
          if (["Q","Q2","W","W2","E","E2","R"].includes(ctx.ability.key)) { ctx.memory[FLURRY]=flurryCount; ctx.memory[`${FLURRY}:until`]=ctx.tick+ticks(flurryTime); ctx.buff(FLURRY,"attackSpeed",flurryAS,flurryTime); }
          if (ctx.ability.key === "Q2") {
            const target=qTarget(ctx.self,ctx.world); if (!target) return;
            endOtherDash(ctx); ctx.memory["leesin:q:target"]=target.pet?.id ?? -1; ctx.memory["leesin:q:origin"]=ctx.self.x; ctx.memory["leesin:q:last"]=target.target.x; ctx.memory["leesin:q:lost"]=false;
            startDash(ctx,"Q2",target.target.x,q2Speed[0]!+derive(ctx.self).moveSpeed*q2Speed[1]!/100);
          }
          if (ctx.ability.key === "W") {
            const pet=anchor(ctx,ctx.aim), replacedQ=ctx.self.action?.kind === "dash" && ctx.self.action.ability === "Q2"; endOtherDash(ctx); ctx.memory["leesin:w:anchor"]=pet?.id ?? -2; ctx.memory["leesin:w:until"]=ctx.tick+ticks(wWindow); ctx.memory["leesin:w:shielded"]=false;
            if (!pet || pet.spec.targetClass === "champion" && pet.spec.unitClass !== "clone") ctx.self.cooldownReady.W=ctx.tick+ticks(wCD*(1-wRefund)/(1+derive(ctx.self).abilityHaste/100));
            if (!pet || replacedQ) { shield(ctx,pet); ctx.memory["leesin:w:shielded"]=true; }
            if (pet) { ctx.memory["leesin:w:endpoint"]=pet.x; startDash(ctx,"W",pet.x,wSpeed[0]!+derive(ctx.self).moveSpeed*wSpeed[1]!/100); }
          }
          if (ctx.ability.key === "W2") { ctx.memory["leesin:w:until"]=0; ctx.memory[VAMP]=ctx.tick+ticks(vampTime); }
          if (ctx.ability.key === "E") { ctx.memory["leesin:e:until"]=0; for (const target of contacts(ctx.world,ctx.self)) if (Math.abs(target.target.x-ctx.self.x) <= eRadius+target.target.spec.base.radius+EPSILON) hit(ctx,target,eHit,[{ type: "damage", damageType: "magic", amount: eDamage },{ type: "mark", key: EMARK, duration: eTime }],"area"); }
          if (ctx.ability.key === "E2") { ctx.memory["leesin:e:until"]=0; for (const target of crippleTargets(ctx.self,ctx.world)) hit(ctx,target,slow,[{ type: "cc", cc: "slow", duration: slowTime, strength: eSlow }],"area"); }
        },
        onAbilityContact(ctx) {
          if(ctx.ability.key !== "R") return;
          if(!ctx.memory["leesin:r:root"]) return [];
          const origin=ctx.self.x === ctx.enemy.x ? ctx.self.x-directionTo(ctx.self,ctx.enemy)*EPSILON : ctx.self.x;
          return ctx.effects.map((effect)=>effect.type === "displace" ? {...effect,originX:origin} : effect);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Rroot") ctx.memory["leesin:r:root"]=true;
          if (ctx.ability.key === "Q") { applyEffect(ctx.world,ctx.self,ctx.enemy,{ type: "state", state: "revealed", duration: qTime },{ scale: 1 }); const status=ctx.enemy.statuses.findLast((s)=>s.key === "revealed" && s.source === ctx.self.side); if(status) status.memoKey=QMARK; const pet=ctx.world.pets.find((p)=>p.id === ctx.enemy.petId); if(pet) pet.statuses=ctx.enemy.statuses; }
          if (ctx.ability.key === "Ehit") { ctx.memory["leesin:e:ready"]=ctx.tick+ticks(eDelay); ctx.memory["leesin:e:until"]=ctx.tick+ticks(eWindow); if(!hasState(ctx.enemy,"invisible")) applyEffect(ctx.world,ctx.self,ctx.enemy,{ type: "state", state: "revealed", duration: eTime },{scale:1}); }
          if (ctx.ability.key === "E2hit") { const status=ctx.enemy.statuses.findLast((s)=>s.kind === "cc" && s.key === "slow" && s.ability === "E2hit" && s.source === ctx.self.side); if(status) status.memoKey=SLOW; const pet=ctx.world.pets.find((p)=>p.id === ctx.enemy.petId); if(pet) pet.statuses=ctx.enemy.statuses; }
          if (ctx.ability.key === "R" && ctx.memory["leesin:r:root"] && (ctx.enemy.forced || ctx.enemy.hp <= 0)) {
            const id=ctx.world.nextId++;ctx.memory[`leesin:r:${id}:start`]=ctx.tick;ctx.memory[`leesin:r:${id}:x`]=ctx.enemy.x;ctx.memory[`leesin:r:${id}:next`]=1;ctx.memory[`leesin:r:${id}:bonus`]=evaluate({ base: 0, ratios: { bonusHP: 1 } }, ctx.enemy);ctx.memory[`leesin:r:${id}:corpse`]=ctx.enemy.hp <= 0;ctx.memory[`leesin:r:${id}:travel`]=Math.min(kickDistance,ctx.world.settings.environment.walls ? ctx.world.settings.environment.wallDistance : Infinity,terrainGap(ctx.world,ctx.enemy,directionTo(ctx.self,ctx.enemy)));
            ctx.world.missiles.push({id,owner:ctx.self.side,source:"Rbody",seenTick:ctx.tick,x:ctx.enemy.x,perTick:0,direction:directionTo(ctx.self,ctx.enemy),travelLeft:Infinity,homing:false,projectile:false,connects:false,scale:1,onHit:[],expiresTick:ctx.tick+ticks(airTime)});
          }
        },
        onDashTick(ctx) {
          if(ctx.ability.key !== "Q2" && ctx.ability.key !== "W") return;
          let endpoint=Number(ctx.memory["leesin:w:endpoint"]);
          if(ctx.ability.key === "Q2") { const target=fromId(ctx,"leesin:q:target"); if(!target || !valid(target.target,ctx.self) || Math.abs(target.target.x-Number(ctx.memory["leesin:q:origin"])) > q2Track) ctx.memory["leesin:q:lost"]=true; if(!ctx.memory["leesin:q:lost"] && target) ctx.memory["leesin:q:last"]=target.target.x; endpoint=Number(ctx.memory["leesin:q:last"]); }
          const delta=endpoint-ctx.self.x, speed=ctx.ability.key === "Q2" ? q2Speed : wSpeed, perTick=(speed[0]!+derive(ctx.self).moveSpeed*speed[1]!/100)/30;
          ctx.action.perTick=(Math.sign(delta)||directionTo(ctx.self,ctx.enemy))*Math.min(Math.abs(delta),perTick); ctx.action.endTick=ctx.tick+(Math.abs(delta) <= perTick+EPSILON ? 0 : 1);ctx.action.stopAtContact=false;
        },
        onDashEnd(ctx) {
          if(ctx.ability.key === "Q2") { const contact=fromId(ctx,"leesin:q:target"); if(!ctx.interrupted && !ctx.memory["leesin:q:lost"] && contact && valid(contact.target,ctx.self) ) { const effects: Effect[]=[{type:"damage",damageType:"physical",amount:flat(qExecute(ctx.self,contact.target))}]; hit(ctx,contact,qHit,effects); const target=contact.pet ? petFormulaTarget(contact.pet,ctx.self,ctx.tick) : contact.target; target.statuses=target.statuses.filter((s)=> !(s.source === ctx.self.side && (s.key === QMARK || s.memoKey === QMARK)));if(contact.pet)contact.pet.statuses=target.statuses; } }
          if(ctx.ability.key === "W" && !ctx.interrupted && !ctx.memory["leesin:w:shielded"]) { const contact=fromId(ctx,"leesin:w:anchor"); if(contact?.pet && canTargetPet(contact.pet,ctx.self,ctx.tick)) shield(ctx,contact.pet); }
        },
        onDamageObserved(ctx) { if(ctx.source === ctx.self && ctx.tick < Number(ctx.memory[VAMP] ?? 0) && !ctx.targetPet?.spec.hitPoints && !ctx.targetPet?.spec.fixedDamage && !ctx.targetPet?.spec.diesToChampionAttack) heal(ctx.world,ctx.self,ctx.mitigated*vamp,false,true); },
        onTick(ctx) { for(const target of [ctx.enemy,...ctx.world.pets.filter((p)=>p.owner !== ctx.self.side).map((p)=>petFormulaTarget(p,ctx.self,ctx.tick))]) { for(const status of target.statuses) if(status.memoKey === SLOW && status.source === ctx.self.side) status.value=eSlow*Math.max(0,1-(ctx.tick-status.startTick)/ticks(slowTime));const pet=ctx.world.pets.find((p)=>p.id === target.petId);if(pet)pet.statuses=target.statuses; } },
        onMissileTick(ctx) {
          const m=ctx.missile;if(m.source !== "Rbody")return;
          const start=Number(ctx.memory[`leesin:r:${m.id}:start`]),elapsed=(ctx.tick-start)/30,corpse=ctx.memory[`leesin:r:${m.id}:corpse`];
          if(elapsed >= airTime || !corpse && !ctx.enemy.statuses.some((s)=>s.kind === "cc" && s.key === "airborne" && s.source === ctx.self.side && s.endTick > ctx.tick)) {m.ended=true;return;}
          m.x=corpse ? Number(ctx.memory[`leesin:r:${m.id}:x`])+m.direction*Math.min(Number(ctx.memory[`leesin:r:${m.id}:travel`]),kickDistance*Math.min(1,elapsed/kickTime)) : ctx.enemy.x;
          const check=Number(ctx.memory[`leesin:r:${m.id}:next`]);if(ctx.tick < start+ticks(check*collisionEvery))return;ctx.memory[`leesin:r:${m.id}:next`]=check+1;
          for(const pet of [...ctx.world.pets]) { const key=`leesin:r:${m.id}:hit:${pet.id}`;if(pet.owner === ctx.self.side || ctx.memory[key] || Math.abs(pet.x-m.x) > collisionRadius+pet.spec.radius+EPSILON)continue;ctx.memory[key]=true;hit(ctx,{target:petFormulaTarget(pet,ctx.self,ctx.tick),pet},body,[{type:"damage",damageType:"physical",amount:flat(evaluate(rDamage,ctx.self)+collisionHP*Number(ctx.memory[`leesin:r:${m.id}:bonus`]))},{type:"cc",cc:"airborne",duration:airTime}],"area"); }
        },
      },
    };
  },
};
export default leeSin;
