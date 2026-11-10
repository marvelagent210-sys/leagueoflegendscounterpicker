/** Rakan's real contact identities, independent healing/shield clocks and selective R lock. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import type { CCType } from "../../engine/rules/crowdControl";
import { canCast, canStartAttack, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, heal, inStasis, isUntargetable, notifyDashEnd } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext, KitHooks } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { dashDistance } from "../../engine/sim/terrain";
import { ticks } from "./util";

const P = "rakan:feathers", LAST = "rakan:combat", READY = "rakan:shieldReady", HEAL = "rakan:heal", R = "rakan:quickness";
type Body = { target: Unit; pet?: Pet };
const champion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion";
const id = (target: Unit) => target.petId ?? -1;
const rakan: KitModule = {
  champion: "Rakan",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pShield = { base: p.levelValue("Innate: Periodically"), ratios: { AP: p.quoted("(+ 95% AP)") / 100 } }, pCD = p.cooldown(), pRestore = p.quoted("out of combat for 5 seconds"), pRefund = p.quoted("cooldown by 1 second");
    p.quote("lasts until broken"); p.quote("even if the ability is blocked by a spell shield or Riposte"); p.quote("even if the attack is blocked, dodged, or misses due to blind");
    const pObject = "Characters/Rakan/Spells/RakanPassiveAbility/RakanPassive";
    p.gameQuote('"name":"HitCooldown","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]', pObject);
    p.gameQuote('"mLevel1Value":40.0,"mInitialBonusPerLevel":-1.5,"mBreakpoints":[{"mLevel":19,"mBonusPerLevelAtAndAfter":-0.875,"__type":"Breakpoint"}]', pObject);
    const qDamage = q.formula("Magic Damage"), qHeal = { base: q.levelValue("After 3 seconds"), ratios: { AP: q.quoted("(+ 55% AP)") / 100 } }, qDelay = q.quoted("After 3 seconds"), qRadius = q.field("effectRadius"), qCD = q.cooldown(), qCast = q.castTime(), qRange = q.field("targetRange"), qWidth = q.field("width"), qSpeed = q.field("speed");
    q.quote("Spell shield will not prevent the marked area from being formed"); q.quote("heal will trigger and affect Rakan even if he is untargetable"); q.quote("trigger radius is slightly smaller than the heal radius"); q.quote("blurb3       = If '''Rakan''' collides with an allied champion"); q.textField("cooldownStart");
    const qObject = "Characters/Rakan/Spells/RakanQAbility/RakanQMis";
    q.gameQuote('"castRange":[900.0,900.0,900.0,900.0,900.0,900.0,900.0]', qObject); q.gameQuote('"mMissileWidth":65.0', qObject); q.gameQuote('"mSpeed":1850.0', qObject);
    const wDamage = w.formula("Magic Damage"), wRange = w.field("targetRange"), wRadius = w.field("effectRadius"), wSpeed = w.field("speed"), wDelay = w.quoted("After a 0.35-second delay"), wAir = w.quoted("knocks them up for 1 second"), wCD = w.cooldown();
    w.quote("no minimum dash range"); w.quote("Sleep does not count for knocking the dash down");
    w.gameQuote('"name":"BaseDashSpeed","values":[1700.0,1700.0,1700.0,1700.0,1700.0,1700.0,1700.0]', "Characters/Rakan/Spells/RakanWAbility/RakanW");
    w.gameQuote('"spellCastTime":0.3499999940395355', "Characters/Rakan/Spells/RakanWAbility/RakanWCast");
    const eShield = e.formula("Shield Strength"), eDuration = e.quoted("for 3 seconds"), eWindow = e.quoted("within 5 seconds"), eRange = e.field("targetRange", "Standard"), xRange = e.field("targetRange", "Enhanced"), eSpeed = e.field("speed"), eSpeedMS = e.fieldNumbers("speed")[1]! / 100, eCD = e.cooldown(), forgiveness = e.quoted("forgiveness radius of 175 units");
    e.quote("shields do not stack"); e.quote("Only the duration and shield amount is refreshed"); e.quote("Sleep does not count for knocking the dash down");
    e.gameQuote('"name":"BonusDashSpeed","values":[1150.0,1150.0,1150.0,1150.0,1150.0,1150.0,1150.0]', "Characters/Rakan/Spells/RakanEAbility/RakanE");
    e.gameQuote('"ForgivenessRange":175.0', "Characters/Rakan/Spells/RakanEAbility/RakanERecast");
    const rDamage = r.formula("Magic Damage"), rTime = r.quoted("sprint for 4 seconds"), rMS = r.quoted("75% bonus movement speed") / 100, rRadius = r.field("collisionRadius"), rDuration = r.baseOf("Disable Duration"), rSlow = r.quoted("slows them by 75%") / 100, rExtend = r.quoted("duration by 0.25 seconds"), rStep = r.quoted("after 0.5 seconds by 20% every 0.5 seconds"), rDecay = r.quoted("after 0.5 seconds by 20% every 0.5 seconds", 1) / 100, rCD = r.cooldown(), rLock = r.castTime();
    r.quote("cannot affect the same enemy more than once"); r.quote("unless the attack command was inputted before the ability was activated"); r.quote("Gleaming Quill'' and [[File: Battle Dance.png");
    r.gameQuote('"name":"TouchSpeed","values":[150.0,150.0,150.0,150.0,150.0,150.0,150.0]', "Characters/Rakan/Spells/RakanRAbility/RakanR");

    const bodies = (world: World, self: Unit): Body[] => [
      ...(world.units[1-self.side]!.alive ? [{ target: world.units[1-self.side]! }] : []),
      ...world.pets.filter(pet => pet.owner !== self.side && pet.hp > 0 && pet.endTick > world.tick && !pet.spec.untargetable && !pet.spec.hitPoints).map(pet => ({ target: petFormulaTarget(pet,self,world.tick), pet })),
    ];
    const alliedBodies = (world: World, self: Unit) => world.pets.filter(pet => pet.owner === self.side && pet.spec.targetClass === "champion" && pet.hp > 0 && pet.endTick > world.tick && !pet.spec.hitPoints && !pet.spec.fixedDamage);
    const allies = (world: World, self: Unit) => alliedBodies(world,self).filter(pet=>canTargetPet(pet,self,world.tick));
    const rangeE = (pet: Pet) => pet.spec.name === "Xayah" ? xRange : eRange;
    const eligible = (world: World, self: Unit) => allies(world,self).filter(pet => Math.abs(pet.x-self.x) <= rangeE(pet)+EPSILON);
    const chooseAlly = (world: World, self: Unit, aim?: Aim) => {
      const x = aim?.distance === undefined ? self.x : self.x + directionTo(self,world.units[1-self.side]!) * aim.direction * aim.distance;
      return eligible(world,self).filter(pet => aim?.distance === undefined || Math.abs(pet.x-x) <= forgiveness+EPSILON).sort((a,b) => Math.abs(a.x-x)-Math.abs(b.x-x) || a.id-b.id)[0];
    };
    const spellEffects: Effect[] = [{ type:"damage", damageType:"magic", amount:wDamage }, { type:"cc", cc:"airborne", duration:wAir }];
    const rEffects: Effect[] = [{ type:"damage", damageType:"magic", amount:rDamage }, { type:"cc", cc:"charm", duration:rDuration }, { type:"cc", cc:"slow", duration:rDuration, strength:rSlow }];
    const impact: AbilitySpec = { key:"Wimpact", name:w.name, slot:"other", activation:"internal", budgetExcluded:true, cooldown:0, castTime:0, delivery:{kind:"self"}, onHit:spellEffects, flags:{spellShield:true,petContactHooks:true}, persistsAfterDeath:true, usable:()=>false };
    const activeR = (self: Unit, tick: number) => self.alive && !self.resurrection && tick < Number(self.memory[`${R}:end`] ?? 0);
    const keyR = (self: Unit, target: Unit) => `${R}:hit:${Number(self.memory[`${R}:serial`] ?? 0)}:${id(target)}`;
    const shield = (self: Unit) => self.statuses.find(status => status.kind === "shield" && status.memoKey === P && status.value > 0);
    const newShield = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== P);
      applyEffect(ctx.world,ctx.self,ctx.self,{type:"shield",amount:pShield,duration:ctx.world.settings.maxSeconds+1},{scale:1});
      ctx.self.statuses.at(-1)!.memoKey=P; delete ctx.memory[READY];
    };
    const refund = (ctx: HookContext, target: Unit, scale = 1) => {
      if (champion(target) && typeof ctx.memory[READY] === "number") ctx.memory[READY] = Math.max(ctx.tick,Number(ctx.memory[READY])-ticks(pRefund)*scale);
    };
    const healNow = (ctx: HookContext) => {
      const amount = evaluate(qHeal,ctx.self)*Number(ctx.memory[`${HEAL}:scale`] ?? 1);
      heal(ctx.world,ctx.self,amount);
      for (const pet of alliedBodies(ctx.world,ctx.self)) if (Math.abs(pet.x-ctx.self.x) <= qRadius+EPSILON) heal(ctx.world,petFormulaTarget(pet,ctx.self,ctx.tick),amount);
      delete ctx.memory[HEAL]; delete ctx.memory[`${HEAL}:scale`];
    };
    const maybeHeal = (ctx: HookContext) => {
      if (typeof ctx.memory[HEAL] !== "number" || !ctx.self.alive || ctx.self.resurrection) return;
      // The exact early-trigger radius is unpublished; literal allied body contact is sourced.
      if (ctx.tick >= Number(ctx.memory[HEAL]) || alliedBodies(ctx.world,ctx.self).some(pet => Math.abs(pet.x-ctx.self.x) <= ctx.self.spec.base.radius+pet.spec.radius+EPSILON)) healNow(ctx);
    };
    const hit = (ctx: HookContext, body: Body, ability: AbilitySpec, effects: Effect[], originX: number) => body.pet ? abilityHitPet(ctx.world,ctx.self,body.pet,ability,effects,"area",1,originX) : abilityHit(ctx.world,ctx.self,body.target,ability,effects,1,originX);
    const touch = (ctx: HookContext, from: number, to: number) => {
      if (!activeR(ctx.self,ctx.tick) || inStasis(ctx.self)) return;
      const direction = Math.sign(to-from);
      const encounters = bodies(ctx.world,ctx.self).filter(body => !ctx.memory[keyR(ctx.self,body.target)] && !inStasis(body.target) && !isUntargetable(body.target,ctx.self)).map(body => {
        const reach = rRadius+body.target.spec.base.radius, low=body.target.x-reach, high=body.target.x+reach;
        const x = direction > 0 ? Math.max(from,low) : direction < 0 ? Math.min(from,high) : from;
        return {body,x,valid:Math.min(from,to)<=high+EPSILON && Math.max(from,to)>=low-EPSILON};
      }).filter(row=>row.valid).sort((a,b)=>Math.abs(a.x-from)-Math.abs(b.x-from) || id(a.body.target)-id(b.body.target));
      for (const {body,x} of encounters) {
        ctx.memory[keyR(ctx.self,body.target)] = true;
        if (champion(body.target)) {
          ctx.memory[`${R}:end`] = Number(ctx.memory[`${R}:end`])+ticks(rExtend);
          if (ctx.memory[`${R}:burst`] === undefined) ctx.memory[`${R}:burst`] = ctx.tick;
        }
        hit(ctx,body,abilities[4]!,rEffects,x);
      }
    };
    const moveBuff = (ctx: HookContext) => {
      if (!activeR(ctx.self,ctx.tick)) { ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==`buff:${R}:speed` && status.memoKey!==`${R}:ghost`); return; }
      const burst = ctx.memory[`${R}:burst`], steps = typeof burst === "number" ? Math.floor((ctx.tick-burst)/ticks(rStep)) : Infinity;
      const extra = Number.isFinite(steps) ? Math.max(0,rMS-rDecay*steps) : 0;
      const until = (Number(ctx.memory[`${R}:end`])-ctx.tick)/30;
      ctx.buff(`${R}:speed`,"moveSpeedPercent",rMS+extra,until);
      ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==`${R}:ghost`);
      ctx.self.statuses.push({kind:"state",key:"ghosted",memoKey:`${R}:ghost`,source:ctx.self.side,startTick:ctx.tick,endTick:Number(ctx.memory[`${R}:end`]),value:0,ability:"R"});
    };
    const blast = (ctx: HookContext) => ctx.world.zones.push({id:ctx.world.nextId++,owner:ctx.self.side,ability:impact.key,kind:"delayedArea",seenTick:ctx.tick,x:ctx.self.x,radius:wRadius,startTick:ctx.tick,endTick:ctx.tick+ticks(wDelay),connects:true,onHit:spellEffects});
    const clearTransient = (ctx: HookContext) => {
      delete ctx.memory[HEAL]; delete ctx.memory[`${HEAL}:scale`]; delete ctx.memory[`${R}:end`]; delete ctx.memory[`${R}:burst`]; delete ctx.memory["rakan:dashAlly"];
      ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==`${R}:ghost` && status.memoKey!==`buff:${R}:speed`);
    };
    const abilities: AbilitySpec[] = [
      {key:"Q",name:q.name,slot:"Q",cooldown:qCD,cooldownAfter:"state",cost:q.cost(),castTime:qCast,overlay:true,delivery:{kind:"line",range:qRange,width:qWidth,speed:qSpeed,radius:qWidth/2,collisionPet:true},flags:{projectile:true,spellShield:true,petContactHooks:true},onHit:[{type:"damage",damageType:"magic",amount:qDamage}],roles:["damage"],persistsAfterDeath:true},
      {key:"W",name:w.name,slot:"W",cooldown:wCD,cooldownAtCastStart:true,cost:w.cost(),castTime:w.castTime(),delivery:{kind:"self"},flags:{grounded:true,knockdown:true},onHit:spellEffects,roles:["damage","cc","engage","escape"],usable:(self,world)=>world.tick>=Number(self.memory[`${R}:lock`]??0)},
      {key:"E",name:e.name,slot:"E",cooldown:eCD,cooldownAtCastStart:true,cost:e.cost(),castTime:e.castTime(),overlay:true,delivery:{kind:"self"},flags:{grounded:true,knockdown:true},budgetExcluded:true,chainCooldown:"first",usable:(self,world)=>!!chooseAlly(world,self),roles:["escape"]},
      {key:"E2",name:`${e.name} (recast)`,slot:"E",cooldown:0,cost:0,castTime:0,overlay:true,delivery:{kind:"self"},flags:{grounded:true,knockdown:true},budgetExcluded:true,chain:{root:"E",index:2,window:eWindow},usable:(self,world)=>!!chooseAlly(world,self),roles:["escape"]},
      // The source's half-second phase locks W alone; Q/E, movement and old attacks remain usable.
      {key:"R",name:r.name,slot:"R",cooldown:rCD,cooldownAtCastStart:true,cost:r.cost(),castTime:rLock,castTimeFor:()=>0,preserveAttackWindup:true,overlay:true,delivery:{kind:"self"},flags:{spellShield:true,petContactHooks:true},onHit:rEffects,roles:["damage","cc","engage","escape"],usable:(self,world)=>!activeR(self,world.tick)},
      impact,
    ];
    const hooks: KitHooks = {
      onStart(ctx) { ctx.memory[LAST]=ctx.tick; newShield(ctx); },
      canAttackTarget(ctx) { return !activeR(ctx.self,ctx.tick) || !champion(ctx.target) || !!ctx.memory[keyR(ctx.self,ctx.target)]; },
      onAttackResolved(ctx) { refund(ctx,ctx.enemy); },
      onAttackPetResolved(ctx) { refund(ctx,ctx.enemy); },
      onAbilityContact(ctx) {
        refund(ctx,ctx.enemy,ctx.scale);
        if (ctx.ability.key === "Q" && ctx.self.alive && !ctx.self.resurrection && (champion(ctx.enemy) || ctx.world.pets.some(pet=>pet.id===ctx.enemy.petId && pet.spec.epicMonster))) {
          ctx.memory[HEAL]=ctx.tick+ticks(qDelay); ctx.memory[`${HEAL}:scale`]=ctx.scale; maybeHeal(ctx);
        }
      },
      onCastStart(ctx) {
        if (ctx.ability.key === "E" || ctx.ability.key === "E2") ctx.memory["rakan:dashAlly"]=chooseAlly(ctx.world,ctx.self,ctx.aim)?.id ?? -1;
      },
      onCast(ctx) {
        if (ctx.ability.key === "Q") applyEffect(ctx.world,ctx.self,ctx.self,{type:"state",state:"lingering",duration:ctx.world.settings.maxSeconds+1},{ability:ctx.ability,scale:1});
        if (ctx.ability.key === "W") {
          const direction=directionTo(ctx.self,ctx.enemy)*(ctx.aim?.direction??1), requested=Math.min(wRange,Math.max(0,ctx.aim?.distance??Math.abs(ctx.enemy.x-ctx.self.x))), distance=dashDistance(ctx.world,ctx.self,direction*requested);
          if (Math.abs(distance)<=EPSILON) { blast(ctx); return; }
          const duration=Math.max(1,Math.ceil(Math.abs(distance)/(wSpeed/30)-EPSILON)); ctx.memory["rakan:dashEnd"]=ctx.self.x+distance;
          ctx.self.action={kind:"dash",ability:"W",startTick:ctx.tick,endTick:ctx.tick+duration,perTick:distance/duration,stopAtContact:false,unstoppable:false,crossTerrain:true};
        }
        if (ctx.ability.key === "E" || ctx.ability.key === "E2") {
          const pet=ctx.world.pets.find(candidate=>candidate.id===ctx.memory["rakan:dashAlly"] && eligible(ctx.world,ctx.self).includes(candidate));
          if (!pet) return;
          pet.statuses=(pet.statuses??[]).filter(status=>status.memoKey!=="rakan:eShield" || status.source!==ctx.self.side);
          const target=petFormulaTarget(pet,ctx.self,ctx.tick); applyEffect(ctx.world,ctx.self,target,{type:"shield",amount:eShield,duration:eDuration},{ability:ctx.ability,scale:1}); pet.statuses=target.statuses; pet.statuses.at(-1)!.memoKey="rakan:eShield";
          const speed=eSpeed+eSpeedMS*derive(ctx.self).moveSpeed, distance=dashDistance(ctx.world,ctx.self,pet.x-ctx.self.x), duration=Math.max(1,Math.ceil(Math.abs(distance)/(speed/30)-EPSILON)), resume=ctx.self.action;
          ctx.memory["rakan:dashSpeed"]=speed;
          ctx.self.action={kind:"dash",ability:ctx.ability.key,startTick:ctx.tick,endTick:ctx.tick+duration,perTick:distance/duration,stopAtContact:false,unstoppable:false,crossTerrain:true,...(resume?{resume}:{})};
        }
        if (ctx.ability.key === "R") {
          ctx.memory[`${R}:serial`]=Number(ctx.memory[`${R}:serial`]??0)+1; ctx.memory[`${R}:end`]=ctx.tick+ticks(rTime); ctx.memory[`${R}:lock`]=ctx.tick+ticks(rLock); ctx.memory[`${R}:lastX`]=ctx.self.x; delete ctx.memory[`${R}:burst`]; touch(ctx,ctx.self.x,ctx.self.x); moveBuff(ctx);
        }
      },
      onDashTick(ctx) {
        if (ctx.ability.key === "W") { const left=Number(ctx.memory["rakan:dashEnd"])-ctx.self.x; ctx.action.perTick=Math.sign(left)*Math.min(Math.abs(left),wSpeed/30); return; }
        if (ctx.ability.key !== "E" && ctx.ability.key !== "E2") return;
        const pet=ctx.world.pets.find(candidate=>candidate.id===ctx.memory["rakan:dashAlly"] && allies(ctx.world,ctx.self).includes(candidate));
        if (!pet) { ctx.self.action=ctx.action.resume; notifyDashEnd(ctx.world,ctx.self,ctx.ability.key,true); return; }
        const distance=dashDistance(ctx.world,ctx.self,pet.x-ctx.self.x), speed=Number(ctx.memory["rakan:dashSpeed"])/30;
        ctx.action.perTick=Math.sign(distance)*Math.min(Math.abs(distance),speed); ctx.action.endTick=ctx.tick+Math.max(0,Math.ceil(Math.abs(distance)/speed-EPSILON)-1);
      },
      onDashEnd(ctx) { if (ctx.ability.key === "W" && !ctx.interrupted && ctx.self.alive && !ctx.self.resurrection) blast(ctx); if (ctx.ability.key === "E" || ctx.ability.key === "E2") { delete ctx.memory["rakan:dashAlly"]; maybeHeal(ctx); } },
      onCCApplied(ctx) {
        const stops: CCType[]=["airborne","berserk","charm","fear","polymorph","root","stun","suppression","suspension","taunt"];
        const action=ctx.self.action;
        if (stops.includes(ctx.cc) && action?.kind === "dash" && ["W","E","E2"].includes(action.ability)) { ctx.self.action=action.resume; notifyDashEnd(ctx.world,ctx.self,action.ability,true); }
      },
      onMissileEnd(ctx) { if (ctx.missile.source === "Q") { ctx.self.statuses=ctx.self.statuses.filter(status=>!(status.kind==="state"&&status.ability==="Q")); delete ctx.self.cooldownHeld.Q; ctx.self.cooldownReady.Q=ctx.tick+ticks(qCD/(1+abilityHasteFor(ctx.self, { slot: "Q" })/100)); } },
      onDamageTaken(ctx) { if (ctx.amount>0||ctx.absorbed>0) { ctx.memory[LAST]=ctx.tick; if (!shield(ctx.self) && ctx.memory[READY]===undefined) ctx.memory[READY]=ctx.tick+ticks(pCD); } },
      onDamageDealt(ctx) { if (ctx.amount>0||ctx.absorbed>0) ctx.memory[LAST]=ctx.tick; },
      onTick(ctx) {
        if (ctx.self.resurrection) { clearTransient(ctx); ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==P); if(ctx.memory[READY]===undefined)ctx.memory[READY]=ctx.tick+ticks(pCD); return; }
        const current=shield(ctx.self);
        if (!current && typeof ctx.memory[READY]==="number" && ctx.tick>=Number(ctx.memory[READY])) newShield(ctx);
        else if (current && ctx.tick>=Number(ctx.memory[LAST]??ctx.tick)+ticks(pRestore)) current.value=evaluate(pShield,ctx.self);
        maybeHeal(ctx); touch(ctx,Number(ctx.memory[`${R}:lastX`]??ctx.self.x),ctx.self.x); ctx.memory[`${R}:lastX`]=ctx.self.x; moveBuff(ctx);
      },
      onLethal(ctx) { clearTransient(ctx); if (ctx.memory[READY]===undefined)ctx.memory[READY]=ctx.tick+ticks(pCD); return false; },
    };
    const behavior: Behavior = view => {
      const {self,enemy,world,mode}=view, normal=defaultBehavior({...view,self:{...self,spec:{...self.spec,abilities:self.spec.abilities.filter(spell=>spell.key!=="E"&&spell.key!=="E2"&&(!(mode==="trade"||mode==="hold")||spell.key!=="R"))}}});
      if(mode==="idle")return undefined; if(self.memory.tradeDone)return{kind:"move",direction:-1}; if(self.action)return normal;
      const ready=(key:string)=>canCast(world,self,abilities.find(spell=>spell.key===key)!);
      if(mode==="flee") {
        const ally=eligible(world,self).filter(pet=>Math.abs(pet.x-enemy.x)>Math.abs(self.x-enemy.x)).sort((a,b)=>Math.abs(b.x-enemy.x)-Math.abs(a.x-enemy.x)||a.id-b.id)[0], key=ready("E")?"E":ready("E2")?"E2":undefined;
        if(ally&&key)return{kind:"cast",ability:key,aim:{direction:Math.sign((ally.x-self.x)*directionTo(self,enemy))<0?-1:1,distance:Math.abs(ally.x-self.x)}};
        if(ready("W")&&view.distance<=wRange+wRadius)return{kind:"cast",ability:"W",aim:{direction:-1,distance:wRange}};
        if(ready("R")&&view.distance<=wRange+wRadius)return{kind:"cast",ability:"R"}; return{kind:"move",direction:-1};
      }
      if(mode!=="hold"&&mode!=="trade"&&ready("R")&&view.distance<=wRange+wRadius)return{kind:"cast",ability:"R"};
      if(ready("W")&&view.distance<=wRange+wRadius+enemy.spec.base.radius)return{kind:"cast",ability:"W",aim:{direction:1,distance:Math.min(wRange,Math.abs(enemy.x-self.x))}};
      if(ready("Q")&&view.distance<=qRange+enemy.spec.base.radius)return{kind:"cast",ability:"Q"};
      if(canStartAttack(world,self))return{kind:"attack"}; return normal;
    };
    kit.assume("Fey Feathers begins naturally ready, granting its level 20 247.941176470588 + 95% AP persistent shield. Only a broken shield starts the static 12.75-second regeneration clock; each actual champion basic resolution refunds one second even blind/dodge/block, and each real champion ability contact refunds through spell shields/Riposte. Ordinary minions do not refund. Actual outgoing/incoming health or shield damage restarts the five-second out-of-combat residual-shield restoration clock. No recalled or pre-attacked state is supplied.");
    kit.assume("Gleaming Quill is one first-body 900-range 130-width projectile at 1850 speed, cast from completion position. Its seven-second hasted cooldown starts exactly when that projectile disappears, including wall destruction or Braum interception. Real champion or explicitly Epic Monster contact arms a three-second 230 + 55% AP heal even through spell shield. The healing-return animation is cosmetic. Rakan can heal while untargetable under the shared healing rules; death cancels the pending heal. Only actual allied Champion-class bodies receive the 200-center-radius heal, independently of their visibility. The primary says the early ally trigger is slightly smaller but supplies no exact radius; binary castRadius 175 is not identified as that trigger. Literal allied-body collision from the pinned blurb triggers early; the unresolved outer early-trigger band is omitted. A new successful Q refreshes its one pending mark; expected-value contacts retain their probability in healing.");
    kit.assume("Grand Entrance uses a real interruptible 1700-speed location dash up to 650, including zero-distance activation, then an independent 0.35-second ground-centered 275-radius 270 + 80% AP impact and one-second knockup. It crosses intervening projected terrain only when its endpoint is legal. Accepted immobilization/polymorph knocks down travel, except the explicitly sourced sleep exception; an interrupted flight creates no landing packet. The committed landing packet can persist after death, and retains each actual body's spell shield/parry/airborne immunity.");
    kit.assume("Battle Dance is unavailable and excluded from the ordinary 1v 1 budget unless a real visible allied Champion-class body exists. Minions, turrets, wards and a clone-looking name alone do not qualify. Exact Xayah identity receives 1000 range; others 700. Cursor forgiveness 175 selects a nearby real legal target and does not extend cast range. Shield 150 + 70% AP is granted to that ally before travel for 3 seconds, replacing only Rakan's previous E shield on the same body. The free second activation remains available for 5 seconds and the first cast starts the 12-second cooldown. Dash speed follows primary 1250 + 80% current MS, overriding conflicting binary BonusDashSpeed 1150. It follows the actual ally and ends if that body becomes invalid; the unsized around-ally landing offset is omitted rather than invented. The pinned sources do not specify whether resurrection cancels the recast; the model retains its existing five-second chain clock across resurrection as an unresolved boundary.");
    kit.assume("The Quickness activates a four-second ghosted 75% MS sprint and retains the source's 0.5-second selective opening window: W is locked while movement, Q/E and a previously declared basic remain available. Its nominal castTime is retained for audit and an immediate runtime activation plus independent W deadline represents that selective cast table. Swept 150-radius collisions affect each actual enemy once, including ordinary pets, for 300 + 50% AP with guarded 1.5-second charm/75% slow. Every actual champion collision extends 0.25 seconds, even when its packet is guarded; the first grants an additional 75% MS decaying to 55/35/15/0% at 0.5/1/1.5/2 seconds. Untouched enemy champions cannot receive new basics; ordinary nonchampion pets remain attackable and old attacks continue. Per-recipient cast memory is cloned with the world, and death/resurrection clears active sprint/heal/dash memory.");
    kit.assume("Fight uses Q/W, the real R sprint and ordinary basics; hold/trade reserve R, and completed trades retreat first. Flee can use an actual farther allied E anchor, backward W or R speed. No allied champion, Xayah, epic monster, minion wave, recall, item effect or prefight buff is fabricated. Reference damage prices ordinary Q/W/R once per cadence; healing values Q and the naturally cycling passive with contact-limited refunds. Allied E shielding contributes nothing to an ordinary duel's budget.");
    return { abilities, hooks, behavior, attack:{onHitToPets:true}, budget:{healing(self) { const haste=1+derive(self).abilityHaste/100, qCycle=qCD/haste+qCast+qRange/qSpeed, contacts=derive(self).attackSpeed+1/qCycle+haste/wCD+haste/rCD;return evaluate(qHeal,self)/qCycle+evaluate(pShield,self)*(1+contacts*pRefund)/pCD; }} };
  },
};
export default rakan;
