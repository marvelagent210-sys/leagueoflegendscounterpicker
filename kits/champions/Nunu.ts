/** Nunu & Willump: actual bite recipients, rolling bodies, independent volleys and a cancelable blizzard. */
import type { AbilityData } from "../../engine/kits/context";
import type { KitModule } from "../../engine/kits/compile";
import { softCap } from "../../engine/rules/movement";
import { canCast, EPSILON, releaseCooldowns, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, edgeDistance, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { petEffects } from "../../engine/sim/pets";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { between, scaled, seriesAt, ticks } from "./util";

const P = "nunu:freljord", W = "nunu:roll", E = "nunu:barrage", R = "nunu:zero";
type Contact = { target: Unit; pet?: Pet };
const nunu: KitModule = {
  champion: "Nunu",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const object = (slot: string, spell: string) => `Characters/Nunu/Spells/Nunu${slot}Ability/${spell}`;
    const array = (data: AbilityData, slot: string, spell: string, name: string, values: string) => data.gameQuoted(`mSpell.DataValues.${name}.values: ${values}`, 0, object(slot, spell));
    const pTime = p.quoted("gain Call of the Freljord for 4 seconds"), pCD = p.field("targetCooldown"), pAS = p.quoted("Gain 20% bonus attack speed") / 100, pMS = p.quoted("10% bonus movement speed") / 100, pAD = p.quoted("30% AD physical damage") / 100, pCap = p.quoted("maximum remaining duration is 44 seconds");
    const pRanges = p.fieldValues("targetRange"), pRadius = p.gameQuoted("mSpell.castRadius: [210.0,210.0,210.0,210.0,210.0,210.0,210.0]", 0, object("Passive", "NunuPassive"));
    array(p,"Passive","NunuPassive","BloodBoilBaseDuration","[4.0,4.0,4.0,4.0,4.0,4.0,4.0]");
    p.quote("will critically strike when the basic attack does, but will not deal any bonus damage"); p.quote("AoE basic damage");
    const qDamage = q.formula("Champion Magic Damage"), qNonChampion = q.formula("Non-Champion True Damage"), qHeal = q.formula("Base Champion Heal"), qPetHeal = q.formula("Base Non-Champion Heal"), qEmpowered = q.formula("Empowered Champion Heal"), qPetEmpowered = q.formula("Empowered Non-Champion Heal");
    const qCD = q.cooldown(), qCast = q.castTime(), qRange = q.field("targetRange"), qCost = q.cost(), qLow = q.quoted("below 50% maximum health") / 100;
    q.quote("Spell shields will block the damage and the heal"); q.quote("stunning and pulling them towards him over the cast time");
    q.gameQuote("mSpell.mCastTime: 0.30000001192092896", object("Q", "NunuQ"));
    q.gameQuote("mSpell.mCantCancelWhileWindingUp: true", object("Q", "NunuQ"));
    const wMin = w.formula("Minimum Magic Damage"), wMax = w.formula("Maximum Magic Damage"), wMinRoll = w.formula("Minimum Minion/Monster Roll Damage"), wMaxRoll = w.formula("Maximum Minion/Monster Roll Damage");
    const wCD = w.cooldown(), wCost = w.cost(), wTime = w.quoted("channels for up to 10 seconds"), wDelay = w.quoted("recast after 0.5 seconds"), wSlow = w.quoted("reduced by 50% for the first 1 second") / 100, wSlowTime = w.quoted("reduced by 50% for the first 1 second", 1), wStep = w.quoted("14 movement speed"), wStepTime = w.quoted("every 0.25 seconds"), wSelfStun = w.quoted("0.1 seconds, but rounded up");
    const wFull = array(w,"W","NunuW","MaxDamageTime","[5.0,5.0,5.0,5.0,5.0,5.0,5.0]"), wMedium = array(w,"W","NunuW","MediumSnowballTime","[2.5,2.5,2.5,2.5,2.5,2.5,2.5]");
    const collisionMin = array(w,"W","NunuW","SmallSnowballMissileWidth","[75.0,75.0,75.0,75.0,75.0,75.0,75.0]"), collisionMax = array(w,"W","NunuW","LargeSnowballMissileWidth","[200.0,200.0,200.0,200.0,200.0,200.0,200.0]");
    const monsterCollision = array(w,"W","NunuW","MonsterCollisionRadiusScalar","[1.25,1.25,1.25,1.25,1.25,1.25,1.25]"), monsterImpact = array(w,"W","NunuW","MonsterImpactRadiusScalar","[1.75,1.75,1.75,1.75,1.75,1.75,1.75]");
    const wMinTravel = array(w,"W","NunuW","MinimumSnowballRollDistance","[750.0,750.0,750.0,750.0,750.0,750.0,750.0]"), wMaxTravel = array(w,"W","NunuW","MaximumSnowballRollDistance","[1750.0,1750.0,1750.0,1750.0,1750.0,1750.0,1750.0]");
    const wSpeed = w.fieldNumbers("speed"), wRadii = w.fieldValues("effectRadius"), wGrow = w.seriesIn("The snowball explodes",0), wAir = w.seriesIn("The snowball explodes",1), wStun = w.seriesIn("The snowball explodes",2);
    const wSpeedCap = w.quoted("{{pp|85 to 255}}",1);
    w.quote("Projectile-interception}} effects will destroy the snowball only after it has been released"); w.quote("interrupts=death, ground, root, silence"); w.quote("Increases linearly after 1 second into the duration"); w.quote("will not grow any larger"); w.quote("will explode upon hitting any enemy"); w.textField("cooldownStart");
    const eDamage = e.formula("Magic Damage Per Hit"), eRootDamage = e.formula("Magic Damage"), eCD = e.cooldown(), eCost = e.cost(), eRange = e.field("targetRange"), eWidth = e.field("width"), eSpeed = e.field("speed"), eSlow = e.fraction("Slow"), eRoot = e.levelValue("After 3 seconds from the first cast");
    const eBalls = e.quoted("volley of 3 snowballs"), eDuration = e.quoted("After 3 seconds from the first cast"), eVolleyCD = e.quoted("1-second cooldown"), eMarkTime = e.quoted("Snowbound for 4 seconds"), eSlowTime = e.quoted("slowed for 1 second");
    const eGap = array(e,"E","NunuE","DelayBetweenSnowballs","[0.15000000596046448,0.15000000596046448,0.15000000596046448,0.15000000596046448,0.15000000596046448,0.15000000596046448,0.15000000596046448]"), eCone = array(e,"E","NunuE","SplashConeLength","[225.0,225.0,225.0,225.0,225.0,225.0,225.0]"), eRootRadius = e.gameQuoted("mSpell.castRadius: [450.0,450.0,450.0,450.0,450.0,450.0,450.0]",0,object("E","NunuE"));
    const eVolleys = array(e,"E","NunuESnowballBurstFire","MaxBursts","[3.0,3.0,3.0,3.0,3.0,3.0,3.0]");
    e.gameQuote('"mSpeed":2000.0',object("E","NunuESnowballMissile")); e.textField("cooldownStart"); e.quote("An enemy may be slowed only once");
    const rDamage = r.formula("Maximum Magic Damage"), rShield = r.formula("Shield Strength"), rCD = r.cooldown(), rCost = r.cost(), rRadius = r.field("effectRadius"), rTime = r.quoted("for up to 3 seconds"), rDelay = r.quoted("recast after 0.5 seconds"), rDecay = r.quoted("shield will decay over 3 seconds"), rSlows = r.seriesIn("channel a blizzard",0);
    const rSlowStep = r.quoted("every 0.25 seconds"), rDamageStep = r.quoted("every 0.03 seconds"), rDamageShare = r.quoted("by 1% of its maximum damage") / 100;
    r.textField("cooldownStart"); r.quote("automatically when the channel ends by any means"); r.quote("cast=interrupts"); r.gameQuote("mSpell.mSpellRevealsChampion: false",object("R","NunuR"));
    const internal = (key: string, name: string, effects: Effect[] = [], spellShield = true): AbilitySpec => ({ key, name, slot:"other", activation:"internal", budgetExcluded:true, cooldown:0, castTime:0, delivery:{kind:"self"}, flags:{spellShield,petContactHooks:true}, onHit:effects, usable:()=>false });
    const bite = internal("Qbite",q.name), devour = internal("Qdevour",`${q.name} (devour)`,[],false), roll = internal("Wroll",w.name), burst = internal("Wburst",w.name), snowball = internal("Eball",e.name), root = internal("Eroot",`${e.name} (Snowbound)`), blizzard = internal("Rburst",r.name), chill = internal("Rchill",r.name), cleave = internal("Icleave",p.name,[],false), rollingThreat = internal("Wapproach",w.name);
    blizzard.onHit=[{type:"damage",damageType:"magic",amount:rDamage,petDamageCategory:"area"}];
    cleave.flags = {...cleave.flags,parry:true,basicDamage:true,appliesLifeSteal:true};
    snowball.flags!.projectile = true; snowball.persistsAfterDeath = true; burst.persistsAfterDeath = true; blizzard.persistsAfterDeath = true;
    const markKey = (self: Unit) => `${E}:snowbound:${self.side}`;
    const contacts = (world: World, self: Unit): Contact[] => {
      const enemy = world.units[1-self.side]!;
      return [...(enemy.alive && enemy.hp>0 ? [{target:enemy}] : []), ...world.pets.filter(pet=>pet.owner!==self.side && pet.hp>0 && pet.endTick>world.tick && !pet.spec.untargetable && !pet.spec.hitPoints).map(pet=>({pet,target:petFormulaTarget(pet,self,world.tick)}))];
    };
    const valid = (self:Unit, target:Unit) => target.alive && target.hp>0 && !inStasis(target) && !isUntargetable(target,self);
    const champion = (contact:Contact) => !contact.pet || contact.pet.spec.targetClass==="champion";
    const largeMonster = (pet?:Pet) => pet?.spec.targetClass==="monster" && (pet.spec.sizeClass==="large" || pet.spec.epicMonster===true);
    const hit = (ctx:HookContext, contact:Contact, ability:AbilitySpec, effects:Effect[], scale=1, origin=ctx.self.x, category:"area"|"singleTarget"="area") => {
      if (!(scale>0)) return;
      if (contact.pet) abilityHitPet(ctx.world,ctx.self,contact.pet,ability,effects,category,scale,origin);
      else abilityHit(ctx.world,ctx.self,contact.target,ability,effects,scale,origin);
    };
    const ownStatus = (ctx:HookContext, effect:Effect, key:string, ability:AbilitySpec) => {
      ctx.self.statuses=ctx.self.statuses.filter(status=>status.memoKey!==key);
      applyEffect(ctx.world,ctx.self,ctx.self,effect,{ability,scale:1}); ctx.self.statuses.at(-1)!.memoKey=key;
    };
    const biteTarget = (world:World,self:Unit) => contacts(world,self).filter(contact=>canTarget(contact.target,self) && edgeDistance(self,contact.target)<=qRange+EPSILON).sort((a,b)=>Number(!!a.pet)-Number(!!b.pet)||edgeDistance(self,a.target)-edgeDistance(self,b.target))[0];
    const grow = (age:number) => Math.max(0,Math.min(1,age/wFull));
    const strength = (age:number) => seriesAt(wGrow,Math.max(0,age),true)/seriesAt(wGrow,wFull,true);
    const radius = (age:number) => wRadii[0]!+(wRadii[2]!-wRadii[0]!)*grow(age);
    const collisionRadius = (age:number) => collisionMin+(collisionMax-collisionMin)*grow(age);
    const along = (from:number,to:number,x:number,reach:number):number|undefined => {
      const direction=to>=from?1:-1,length=Math.abs(to-from),center=direction*(x-from);
      return center+reach < -EPSILON || center-reach > length+EPSILON ? undefined : from+direction*Math.max(0,center-reach);
    };
    const terrainContact = (world:World,self:Unit,from:number,to:number,reach:number) => {
      let first:number|undefined;
      for(const terrain of world.terrain) {
        if(terrain.endTick<=world.tick || terrain.enemyOnly&&terrain.owner===self.side)continue;
        const low=terrain.from-reach,high=terrain.to+reach;
        if(Math.max(from,to)<low-EPSILON||Math.min(from,to)>high+EPSILON)continue;
        const point=from>=low&&from<=high?from:to>from?low:high;
        if(first===undefined||Math.abs(point-from)<Math.abs(first-from))first=point;
      }
      return first;
    };
    const explosion = (ctx:HookContext,x:number,age:number,scale=1) => {
      ctx.memory[`${W}:impactAir`]=seriesAt(wAir,age,true); ctx.memory[`${W}:impactStun`]=seriesAt(wStun,age,true);
      const effects:Effect[]=[{type:"damage",damageType:"magic",amount:between(wMin,wMax,strength(age)),petDamageCategory:"area"},{type:"displace",direction:"away",distance:0,duration:Number(ctx.memory[`${W}:impactAir`])}];
      for(const contact of contacts(ctx.world,ctx.self))if(Math.abs(contact.target.x-x)<=radius(age)*(contact.pet?.spec.targetClass==="monster"?monsterImpact:1)+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,burst,effects,contact.pet?1:scale,x);
    };
    const clearRoll = (ctx:HookContext) => {
      delete ctx.memory[W]; ctx.self.statuses=ctx.self.statuses.filter(status=>!status.memoKey?.startsWith(W));
      if(ctx.self.action?.kind==="channel"&&ctx.self.action.ability==="W")ctx.self.action=undefined;
      ctx.world.missiles=ctx.world.missiles.filter(m=>m.id!==ctx.memory[`${W}:telegraph`]);delete ctx.memory[`${W}:telegraph`];
      ctx.self.move=0; releaseCooldowns(ctx.world,ctx.self);
    };
    const launchRoll = (ctx:HookContext) => {
      if(!ctx.memory[W])return;
      const age=Math.min(wTime,Math.max(0,(ctx.tick-Number(ctx.memory[`${W}:start`]))/30)),direction=Number(ctx.memory[`${W}:direction`]) as 1|-1;
      const speed=(age<wMedium?wSpeed[0]!:age<wFull?wSpeed[1]!+(wSpeed[2]!-wSpeed[1]!)*(age-wMedium)/(wFull-wMedium):wSpeed[3]!)+Math.max(0,Number(ctx.memory[`${W}:speed`])-ctx.self.spec.base.moveSpeed);
      clearRoll(ctx);
      const m:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:burst.key,seenTick:ctx.tick,x:ctx.self.x,perTick:0,direction,homing:false,travelLeft:wMinTravel+(wMaxTravel-wMinTravel)*strength(age),projectile:true,connects:true,interceptable:true,scale:1,onHit:[{type:"damage",damageType:"magic",amount:between(wMin,wMax,strength(age)),petDamageCategory:"area"},{type:"displace",direction:"away",distance:0,duration:seriesAt(wAir,age,true)}],piercing:true,radius:collisionRadius(age)};
      ctx.memory[`${W}:missile:${m.id}:age`]=age;ctx.memory[`${W}:missile:${m.id}:speed`]=speed;
      m.scale=skillshotChance(ctx.world,ctx.enemy,ctx.tick,Math.max(0,Math.abs(ctx.enemy.x-m.x)-ctx.enemy.spec.base.radius-m.radius!)/speed,m.radius!);
      m.impactTick=ctx.tick+ticks(Math.max(0,Math.abs(ctx.enemy.x-m.x)-ctx.enemy.spec.base.radius-m.radius!)/speed);ctx.world.missiles.push(m);
    };
    const endZero = (ctx:HookContext) => {
      if(ctx.memory[R]!==true)return;
      const age=Math.min(rTime,Math.max(0,(ctx.tick-Number(ctx.memory[`${R}:start`]))/30)),ratio=Math.min(1,Math.floor(age/rDamageStep+EPSILON)*rDamageShare),slow=seriesAt(rSlows,age,false)/100;
      delete ctx.memory[R];if(ctx.self.action?.kind==="channel"&&ctx.self.action.ability==="R")ctx.self.action=undefined;
      const shield=ctx.self.statuses.find(status=>status.memoKey===`${R}:shield`);
      if(shield){shield.endTick=ctx.tick+ticks(rDecay);ctx.memory[`${R}:decayRate`]=shield.value/ticks(rDecay);ctx.memory[`${R}:decayTick`]=ctx.tick;}
      for(const contact of contacts(ctx.world,ctx.self))if(Math.abs(contact.target.x-ctx.self.x)<=rRadius+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,blizzard,[{type:"damage",damageType:"magic",amount:scaled(rDamage,ratio),petDamageCategory:"area"},...(age>0&&slow>0?[{type:"cc" as const,cc:"slow" as const,strength:slow,duration:age}]:[])]);
      releaseCooldowns(ctx.world,ctx.self);
    };
    const allyAttackSpeed = (pet:Pet,tick:number) => {
      const attack=pet.spec.attack;if(!attack)return 0;
      const active=(pet.statuses??[]).filter(status=>status.endTick>tick),base=1/attack.interval;
      const bonus=active.reduce((sum,status)=>sum+(status.kind==="stat"&&status.key==="attackSpeed"?status.value:0),0),total=active.reduce((sum,status)=>sum+(status.kind==="stat"&&status.key==="attackSpeedMultiplier"?status.value:0),0);
      const cripple=pet.spec.ignoreOwnAttackSpeedSlows?1:active.filter(status=>status.kind==="cc"&&status.key==="cripple").reduce((factor,status)=>factor*(1-Math.min(1,Math.max(0,status.value))),1);
      const speed=base*Math.max(.01,(1+(attack.attackSpeedRatio??base)/base*bonus)*Math.max(0,1+total)*cripple);
      return attack.attackSpeedCap===undefined?speed:Math.min(speed,Math.max(base*.01,attack.attackSpeedCap));
    };
    const enableFreljord = (ctx:HookContext,target:Contact) => {
      const key=`${P}:target:${target.pet?.id??"champion"}`;
      if(ctx.tick<Number(ctx.memory[key]??0))return;
      ctx.memory[key]=ctx.tick+ticks(pCD);
      const end=Math.min(ctx.tick+ticks(pCap),Math.max(ctx.tick,Number(ctx.memory[`${P}:end`]??ctx.tick))+ticks(pTime));ctx.memory[`${P}:end`]=end;
      ctx.buff(P,"attackSpeed",pAS,(end-ctx.tick)/30);ctx.buff(`${P}:ms`,"moveSpeedPercent",pMS,(end-ctx.tick)/30);
      const shareRange=target.pet?.spec.targetClass==="monster"&&!target.pet.spec.epicMonster?pRanges[1]!:pRanges[0]!;
      const ally=ctx.world.pets.filter(pet=>pet.owner===ctx.self.side&&pet.spec.targetClass==="champion"&&pet.hp>0&&pet.endTick>ctx.tick&&!pet.spec.untargetable&&Math.abs(pet.x-ctx.self.x)<=shareRange+EPSILON).sort((a,b)=>allyAttackSpeed(b,ctx.tick)-allyAttackSpeed(a,ctx.tick)||Math.abs(a.x-ctx.self.x)-Math.abs(b.x-ctx.self.x)||a.id-b.id)[0];
      if(ally){const until=Math.min(ctx.tick+ticks(pCap),Math.max(ctx.tick,Number(ally.memory[`${P}:end`]??ctx.tick))+ticks(pTime));ally.memory[`${P}:end`]=until;ally.statuses=(ally.statuses??[]).filter(status=>status.memoKey!==P);petEffects(ctx.world,ctx.self,ally,[{type:"stat",stat:"attackSpeed",amount:{base:pAS},duration:(until-ctx.tick)/30},{type:"stat",stat:"moveSpeedPercent",amount:{base:pMS},duration:(until-ctx.tick)/30}]);for(const status of ally.statuses??[])if(status.source===ctx.self.side&&status.startTick===ctx.tick&&["attackSpeed","moveSpeedPercent"].includes(status.key))status.memoKey=P;}
    };
    const splash = (ctx:HookContext, primary?:Pet, scale=1) => {
      if(ctx.tick>=Number(ctx.memory[`${P}:end`]??0))return;
      const direction=directionTo(ctx.self,ctx.enemy);
      for(const contact of contacts(ctx.world,ctx.self))if(contact.pet?.id!==primary?.id && (primary!==undefined||contact.pet!==undefined) && direction*(contact.target.x-ctx.self.x)>=-EPSILON && Math.abs(contact.target.x-ctx.self.x)<=pRadius+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,cleave,[{type:"damage",damageType:"physical",amount:{base:0,ratios:{AD:pAD}},petDamageCategory:"area"}],scale);
    };
    const emitBall = (ctx:HookContext, due:number, group:number) => {
      const direction=directionTo(ctx.self,ctx.enemy),m:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:snowball.key,seenTick:due,x:ctx.self.x,perTick:0,direction,homing:false,travelLeft:eRange,projectile:true,connects:true,interceptable:true,scale:1,onHit:[{type:"damage",damageType:"magic",amount:eDamage,petDamageCategory:"area"}],piercing:true,radius:eWidth/2};
      m.impactTick=ctx.tick+ticks(Math.max(0,Math.abs(ctx.enemy.x-m.x)-ctx.enemy.spec.base.radius-eWidth/2)/eSpeed);ctx.memory[`${E}:missile:${m.id}:group`]=group;
      m.scale=skillshotChance(ctx.world,ctx.enemy,due,Math.max(0,Math.abs(ctx.enemy.x-m.x)-ctx.enemy.spec.base.radius)/eSpeed,eWidth/2);ctx.world.missiles.push(m);
    };
    const barrage = (ctx:HookContext, first:boolean) => {
      if(first){ctx.memory[E]=ctx.tick+ticks(eDuration);ctx.memory[`${E}:group`]=Number(ctx.memory[`${E}:group`]??0)+1;ctx.memory[`${E}:volleys`]=0;}
      const volley=Number(ctx.memory[`${E}:volleys`])+1,group=Number(ctx.memory[`${E}:group`]);ctx.memory[`${E}:volleys`]=volley;ctx.memory[`${E}:next`]=ctx.tick+ticks(eVolleyCD/(1+derive(ctx.self).abilityHaste/100));
      emitBall(ctx,ctx.tick,group);
      for(let index=1;index<eBalls;index++)ctx.memory[`${E}:throw:${group}:${volley}:${index}`]=ctx.tick+ticks(eGap*index);
    };
    const abilities:AbilitySpec[]=[
      {key:"Q",name:q.name,slot:"Q",cooldown:qCD,cost:qCost,castTime:qCast,delivery:{kind:"self"},allowedDuringChannel:["R"],roles:["damage","defense"],usable:(self,world)=>!!biteTarget(world,self),estimate:(self,target)=>evaluate(qDamage,self,target)},
      {key:"W",name:w.name,slot:"W",cooldown:wCD,cost:wCost,castTime:0,delivery:{kind:"self"},cooldownAfter:"channel",allowedDuringChannel:["R"],channel:{duration:wTime,mobile:true,interruptible:true,interrupts:["ground","root","silence"]},flags:{grounded:true},roles:["engage","cc"],estimate:(self,target)=>evaluate(wMin,self,target)},
      {key:"W2",name:`${w.name} (release)`,slot:"W",activation:"toggle",budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},allowedDuringChannel:["W"],roles:[],usable:(self,world)=>self.memory[W]===true&&world.tick>=Number(self.memory[`${W}:start`])+ticks(wDelay)},
      {key:"E",name:e.name,slot:"E",cooldown:eCD,cost:eCost,castTime:0,delivery:{kind:"self"},cooldownAfter:"state",onSelf:[{type:"state",state:"lingering",duration:eDuration}],allowedDuringChannel:["R"],roles:["damage","cc"],usable:self=>!self.memory[E],estimate:(self,target)=>evaluate(scaled(eDamage,eBalls*eVolleys),self,target)+evaluate(eRootDamage,self,target)},
      {key:"E2",name:`${e.name} (recast)`,slot:"E",activation:"toggle",budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},roles:[],usable:(self,world)=>world.tick<Number(self.memory[E]??0)&&world.tick>=Number(self.memory[`${E}:next`]??Infinity)&&Number(self.memory[`${E}:volleys`]??0)<eVolleys},
      {key:"R",name:r.name,slot:"R",cooldown:rCD,cost:rCost,castTime:0,delivery:{kind:"self"},cooldownAfter:"channel",channel:{duration:rTime,interruptible:true,cancelAfter:0,cancelAttackAfter:0,completionThreat:blizzard.key},roles:["damage","defense"],usable:(self,world)=>Math.abs(self.x-world.units[1-self.side]!.x)<=rRadius+world.units[1-self.side]!.spec.base.radius+EPSILON,estimate:(self,target)=>evaluate(rDamage,self,target)},
      {key:"R2",name:`${r.name} (release)`,slot:"R",activation:"toggle",budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},allowedDuringChannel:["R"],roles:[],usable:(self,world)=>self.memory[R]===true&&world.tick>=Number(self.memory[`${R}:start`])+ticks(rDelay)},
      bite,devour,roll,burst,snowball,root,blizzard,chill,cleave,rollingThreat,
    ];
    const behavior:Behavior=view=>{
      const normal=defaultBehavior({...view,self:{...view.self,spec:{...view.self.spec,abilities:[]}}});
      const {self,enemy,world,distance,mode}=view, find=(key:string)=>abilities.find(ability=>ability.key===key)!;
      if(mode==="idle"||self.memory.tradeDone)return normal;
      if(self.action?.kind==="channel") {
        if(self.action.ability==="W") {if(world.tick>=Number(self.memory[`${W}:start`])+ticks(wDelay)&&(directionTo(self,enemy)!==Number(self.memory[`${W}:direction`])||mode==="flee"))return{kind:"cast",ability:"W2"};return;}
        if(self.action.ability==="R") {if(world.tick>=Number(self.memory[`${R}:start`])+ticks(rDelay)&&Math.abs(enemy.x-self.x)>rRadius+enemy.spec.base.radius-derive(enemy).moveSpeed/30)return{kind:"cast",ability:"R2"};return;}
      }
      if(canCast(world,self,find("Q"))&&(distance<=qRange+EPSILON||self.hp<derive(self).maxHp))return{kind:"cast",ability:"Q"};
      if(mode!=="flee") {
        if(distance<=eRange&&canCast(world,self,find("E2")))return{kind:"cast",ability:"E2"};
        if(distance<=eRange&&canCast(world,self,find("E")))return{kind:"cast",ability:"E"};
        if((!self.memory[E]||Number(self.memory[`${E}:volleys`])>=eVolleys)&&Math.abs(enemy.x-self.x)<=rRadius&&canCast(world,self,find("R")))return{kind:"cast",ability:"R"};
        if(distance>qRange&&canCast(world,self,find("W")))return{kind:"cast",ability:"W"};
      }
      return normal;
    };
    kit.assume("Call of the Freljord starts inactive. Only actual damage by this champion to a Champion-class body or explicitly large/epic Monster-class pet earns a target-local static10-second trigger. Real absorbed damage counts; parry/invulnerability without HP/shield damage does not. Its20%AS/10%MS lasts4seconds per trigger, extending to at most44remaining seconds. An actual friendly Champion-class pet can receive the buff; none is fabricated. The client passive castRadius210 supplies the forward line extent, while no cone angle is published. Only actual secondary bodies are cleaved for30%AD as area basic damage; the primary is excluded, no on-hits repeat, and the primary source explicitly grants no extra critical damage to that splash.");
    kit.assume("Consume declares one real reachable target, preferring the enemy champion and otherwise the nearest targetable actual pet. The0.3-second cast revalidates that same body's125edge range/targetability, refunding cost/cooldown if it becomes invalid. Champion-class targets take220+65%AP+5%bonusHP magic damage; Minion/Monster-class bodies take1200true damage. Other unclassified pets conservatively receive the champion packet. A connected bite heals111+54%AP+6%bonusHP on champions,185+90%AP+10%bonusHP on minions/monsters, each50%more only strictly below halfHP. Spell shields deny damage and healing. Lethal minion or explicitly small/medium monster targets receive a guarded pull/stun during the actual cast; no food or jungle target is created.");
    kit.assume("W uses a10-second moving channel, cleanses ordinary slows and grants slow immunity/ghosting. The source selectively lists ground/root/silence/death as interruptions; other disables stop its manual movement while their shared CC remains active. The duel has one axis, so steering follows the declared absolute direction without invented turns or circles; the unsourced snowball-to-Willump offset is zero. Cast-time movement is snapshotted, the first second is50%slower, and the wiki's explicitly estimated14-per0.25s steps use its documented total-flat-MS/100 minus10times additive-percent-MS delay, capped at snapshotMS+255 at level20. Collision radius interpolates the exact75-to200 missile widths; primary explosion radius130-to390 takes precedence over client widths. Primary damage grows72+30%AP to360+150%AP after1to5seconds; air0.5to0.75 and subsequent stun0to0.75 use their full source curves. Minions/explicitly small monsters receive33.3%roll damage once per straight pass; only actual Champion-class/largePet/medium-or-large Monster-class bodies or terrain detonate a steered ball. The estimated0.1-second own stun is retained. Released balls freeze growth, use primary425small/435–594medium/595large plus preserved bonusMS, travel750to1750, collide with any actual enemy and become interceptable only after release. A wall destroys flight; an interception first resolves its real explosion. No first15seconds-of-game lock is imposed on a level20 duel that begins later in the match.");
    kit.assume("E throws three separately emitted projectiles per actual volley, at exact client0.15-second absolute boundaries within the primary0.4-second volley window. Each launches from Nunu's current position toward the enemy's current position, has700range/2000speed and primary50full width (client40width differs). First-body shatter uses the sourced225forward cone extent on the duel line; its22.5-degree off-axis cone cannot be expressed here. Each hit deals45+12%AP; the primary aggregate135%AP line disagrees with nine individual12%AP packets and is not substituted. Exactly two optional no-cost recasts fit the original3-second window with haste-scaled1-second gaps. Three hits slow once per target per E; actual Champion-class/large-monster contacts earn independent4-second Snowbound marks. At3seconds, living Willump roots only actually marked bodies within the exact450client radius for the primary level20 duration1.61764705882353 and60+80%AP damage. Marks outside that check cannot later fabricate a root; emitted balls persist after death, unthrown balls and the caster-owned root do not. Post-effect cooldown begins after the original3-second spell window.");
    kit.assume(`Absolute Zero creates its own85+150%AP+50%bonusHP shield at the real cast and channels3seconds in primary650radius (client500radius differs). Its discrete slow starts50%at0.25seconds and grows4.5points per0.25seconds to95%; every real contact retains spell-shield/CC/untargetability rules. Recast after0.5seconds, movement, attacks, permitted other casts, CC, resurrection and death release exactly one explosion using1%of maximum ${rDamage.base} + ${Math.round((rDamage.ratios?.AP ?? 0) * 100)}% AP per0.03seconds, capped100%. The release slow lasts exactly the elapsed channel time. Remaining shield decays linearly from its actual release remainder over3seconds, without replenishing damage already absorbed; the unpublished exact decay curve is an explicit limit. Every area originates at the real moving/contact/explosion center, pets keep their own guards, and no allied buff, monster, precharged snowball or preduel shield is invented. Budget hints count actual maximum-rank packets and channel/post-effect time once; no auxiliary/recast ability is purchased again.`);
    return {abilities,behavior,attack:{onHitToPets:true},budget:{
      damage(self,target){const h=1+derive(self).abilityHaste/100;return{magic:evaluate(qDamage,self,target)/(qCD/h+qCast)+evaluate(wMin,self,target)/(wCD/h+wSlowTime)+(evaluate(scaled(eDamage,eBalls*eVolleys),self,target)+evaluate(eRootDamage,self,target))/(eCD/h+eDuration)+evaluate(rDamage,self,target)/(rCD/h+rTime)};},
      healing(self){const h=1+derive(self).abilityHaste/100;return evaluate(qHeal,self)/(qCD/h+qCast)+evaluate(rShield,self)/(rCD/h+rTime);},
    },hooks:{
      onDamageObserved(ctx){if(ctx.source===ctx.self&&ctx.source.petId===undefined&&(ctx.amount+ctx.absorbed)>0&&(ctx.target.petId===undefined||ctx.targetPet?.spec.targetClass==="champion"||largeMonster(ctx.targetPet)))enableFreljord(ctx,{target:ctx.target,...(ctx.targetPet?{pet:ctx.targetPet}:{})});},
      onAttackHit(ctx){if(!ctx.blocked)splash(ctx,undefined,ctx.scale);},
      onAttackPetHit(ctx){if(!ctx.blocked)splash(ctx,ctx.pet,ctx.scale);},
      onCastStart(ctx){if(ctx.ability.key!=="Q")return;const contact=biteTarget(ctx.world,ctx.self);ctx.memory["nunu:biteTarget"]=contact?.pet?.id??"champion";ctx.memory["nunu:biteReady"]=ctx.self.cooldownReady.Q??0;
        if(contact?.pet&&(contact.pet.spec.targetClass==="minion"||contact.pet.spec.targetClass==="monster"&&["small","medium"].includes(contact.pet.spec.sizeClass??""))&&!contact.target.statuses.some(status=>status.kind==="state"&&["spellShield","invulnerable","minimumHealth"].includes(status.key))&&contact.pet.hp+contact.target.statuses.reduce((sum,status)=>sum+(status.kind==="shield"?status.value:0),0)<=evaluate(qNonChampion,ctx.self,contact.target))hit(ctx,contact,devour,[{type:"cc",cc:"stun",duration:qCast},{type:"displace",direction:"toward",distance:Math.max(0,Math.abs(contact.target.x-ctx.self.x)-ctx.self.spec.base.radius),duration:qCast}],1,ctx.self.x,"singleTarget");
      },
      onCast(ctx){switch(ctx.ability.key){
        case"Q":{const id=ctx.memory["nunu:biteTarget"],contact=id==="champion"?contacts(ctx.world,ctx.self).find(row=>!row.pet):contacts(ctx.world,ctx.self).find(row=>row.pet?.id===id);if(!contact||!canTarget(contact.target,ctx.self)||edgeDistance(ctx.self,contact.target)>qRange+EPSILON){ctx.self.resource=Math.min(derive(ctx.self).maxResource,ctx.self.resource+qCost);ctx.self.cooldownReady.Q=Number(ctx.memory["nunu:biteReady"]??0);ctx.log("Consume cancelled: declared target is unavailable");break;}const nonchampion=contact.pet&&["minion","monster"].includes(contact.pet.spec.targetClass??"");hit(ctx,contact,bite,[{type:"damage",damageType:nonchampion?"true":"magic",amount:nonchampion?qNonChampion:qDamage}],1,ctx.self.x,"singleTarget");break;}
        case"W":{ctx.memory[W]=true;ctx.memory[`${W}:start`]=ctx.tick;ctx.memory[`${W}:direction`]=ctx.self.facing??directionTo(ctx.self,ctx.enemy);ctx.memory[`${W}:group`]=Number(ctx.memory[`${W}:group`]??0)+1;ctx.apply({type:"cleanse",types:["slow"]},true);const d=derive(ctx.self);ctx.memory[`${W}:baseSpeed`]=d.moveSpeed;ctx.memory[`${W}:speed`]=d.moveSpeed;const flat=ctx.self.spec.base.moveSpeed+ctx.self.statuses.reduce((sum,s)=>sum+(s.kind==="stat"&&s.key==="moveSpeedFlat"?s.value:0),0),percent=ctx.self.statuses.reduce((sum,s)=>sum+(s.kind==="stat"&&s.key==="moveSpeedPercent"?s.value:0),0);ctx.memory[`${W}:speedDelay`]=Math.max(0,softCap(flat)/100-percent*10);for(const state of ["ghosted","slowImmune","noMovement"] as const)ownStatus(ctx,{type:"state",state,duration:wTime},`${W}:${state}`,ctx.ability);
          const threat:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:rollingThreat.key,seenTick:ctx.tick,x:ctx.self.x,perTick:0,direction:Number(ctx.memory[`${W}:direction`]) as 1|-1,homing:false,travelLeft:Infinity,projectile:false,connects:true,scale:1,onHit:[],expiresTick:Infinity};ctx.memory[`${W}:telegraph`]=threat.id;ctx.world.missiles.push(threat);break;}
        case"E":barrage(ctx,true);break;case"E2":barrage(ctx,false);break;
        case"R":ctx.memory[R]=true;ctx.memory[`${R}:start`]=ctx.tick;ctx.memory[`${R}:next`]=ctx.tick+ticks(rSlowStep);ownStatus(ctx,{type:"shield",amount:rShield,duration:rTime+rDecay},`${R}:shield`,ctx.ability);break;
      }},
      onAbilityHit(ctx){if(ctx.ability.key===bite.key){const nonchampion=ctx.enemy.petId!==undefined&&["minion","monster"].includes(ctx.enemy.spec.targetClass??"");heal(ctx.world,ctx.self,evaluate(ctx.self.hp<derive(ctx.self).maxHp*qLow?(nonchampion?qPetEmpowered:qEmpowered):(nonchampion?qPetHeal:qHeal),ctx.self)*ctx.scale);}
        if(ctx.ability.key===burst.key){const duration=Number(ctx.memory[`${W}:impactStun`]??0);if(duration>0)ctx.world.scheduled.push({tick:ctx.tick+ticks(Number(ctx.memory[`${W}:impactAir`])),owner:ctx.self.side,target:ctx.enemy.side,...(ctx.enemy.petId!==undefined?{targetPet:ctx.enemy.petId}:{}),effects:[{type:"cc",cc:"stun",duration}],ability:burst.key,scale:ctx.scale});}
        if(ctx.ability.key===snowball.key){const key=`${E}:hit:${ctx.memory[`${E}:contactGroup`]??ctx.memory[`${E}:group`]}`,count=Number(ctx.enemy.memory[key]??0)+1;ctx.enemy.memory[key]=count;if(count>=eBalls&&!ctx.enemy.memory[`${key}:slowed`]){ctx.enemy.memory[`${key}:slowed`]=true;ctx.apply({type:"cc",cc:"slow",duration:eSlowTime,strength:eSlow});}const pet=ctx.enemy.petId===undefined?undefined:ctx.world.pets.find(pet=>pet.id===ctx.enemy.petId);if(ctx.enemy.petId===undefined||pet?.spec.targetClass==="champion"||largeMonster(pet))ctx.apply({type:"mark",key:markKey(ctx.self),duration:eMarkTime,value:Number(ctx.memory[`${E}:contactGroup`]??ctx.memory[`${E}:group`])});}
      },
      onChannelInterrupt(ctx){if(ctx.ability.key==="W")launchRoll(ctx);if(ctx.ability.key==="R")endZero(ctx);},
      onLethal(ctx){launchRoll(ctx);endZero(ctx);delete ctx.memory[E];for(const key of Object.keys(ctx.memory))if(key.startsWith(`${E}:throw:`))delete ctx.memory[key];delete ctx.memory[`${P}:end`];ctx.self.statuses=ctx.self.statuses.filter(status=>status.key!==P&&status.key!==`${P}:ms`);return false;},
      onProjectileIntercept(ctx){if(ctx.missile.source===snowball.key)ctx.memory[`${E}:contactGroup`]=ctx.memory[`${E}:missile:${ctx.missile.id}:group`]??ctx.memory[`${E}:group`]??0;if(ctx.missile.source===burst.key){explosion(ctx,ctx.missile.x,Number(ctx.memory[`${W}:missile:${ctx.missile.id}:age`]),ctx.missile.scale);return true;}if(ctx.missile.source===snowball.key){const m=ctx.missile;for(const contact of contacts(ctx.world,ctx.self))if(valid(ctx.self,contact.target)&&m.direction*(contact.target.x-m.x)>=-contact.target.spec.base.radius-EPSILON&&m.direction*(contact.target.x-m.x)<=eCone+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,snowball,[{type:"damage",damageType:"magic",amount:eDamage,petDamageCategory:"area"}],contact.pet?1:m.scale,ctx.from);return true;}return false;},
      onMissileTick(ctx){const m=ctx.missile;if(m.source!==burst.key&&m.source!==snowball.key)return;if(m.source===snowball.key)ctx.memory[`${E}:contactGroup`]=ctx.memory[`${E}:missile:${m.id}:group`]??ctx.memory[`${E}:group`]??0;
        const speed=m.source===burst.key?Number(ctx.memory[`${W}:missile:${m.id}:speed`]):eSpeed,from=m.x,to=from+m.direction*Math.min(m.travelLeft,speed/30),reach=m.radius??0;
        m.impactTick=ctx.tick+ticks(Math.max(0,Math.abs(ctx.enemy.x-from)-ctx.enemy.spec.base.radius-reach)/speed);
        const collisions=contacts(ctx.world,ctx.self).filter(contact=>valid(ctx.self,contact.target)).flatMap(contact=>{const point=along(from,to,contact.target.x,reach+contact.target.spec.base.radius);return point===undefined?[]:[{contact,point}];}).sort((a,b)=>Math.abs(a.point-from)-Math.abs(b.point-from));
        const terrain=m.source===burst.key?terrainContact(ctx.world,ctx.self,from,to,reach):undefined,contact=collisions[0],endpoint=terrain!==undefined&&(!contact||Math.abs(terrain-from)<=Math.abs(contact.point-from))?terrain:contact?.point??to,block=projectileBlockPoint(ctx.world,ctx.self.side,from,endpoint);
        if(interceptProjectile(ctx.world,m,from,endpoint))return;
        if(block!==undefined){m.x=block;m.ended=true;return;}m.x=endpoint;m.travelLeft-=Math.abs(endpoint-from);
        if(contact&&endpoint===contact.point||terrain!==undefined&&endpoint===terrain){m.ended=true;if(m.source===burst.key)explosion(ctx,endpoint,Number(ctx.memory[`${W}:missile:${m.id}:age`]),m.scale);else if(contact){const center=m.x;for(const target of contacts(ctx.world,ctx.self))if(valid(ctx.self,target.target)&&m.direction*(target.target.x-center)>=-target.target.spec.base.radius-EPSILON&&m.direction*(target.target.x-center)<=eCone+target.target.spec.base.radius+EPSILON)hit(ctx,target,snowball,[{type:"damage",damageType:"magic",amount:eDamage,petDamageCategory:"area"}],target.pet?1:m.scale,from);}return;}
        if(m.travelLeft<=EPSILON)m.ended=true;
      },
      onTick(ctx){
        const shield=ctx.self.statuses.find(status=>status.memoKey===`${R}:shield`);if(shield&&ctx.memory[R]!==true&&ctx.memory[`${R}:decayTick`]!==undefined){const last=Number(ctx.memory[`${R}:decayTick`]);shield.value=Math.max(0,shield.value-Number(ctx.memory[`${R}:decayRate`])*(ctx.tick-last));ctx.memory[`${R}:decayTick`]=ctx.tick;}
        if(ctx.memory[W]){const age=(ctx.tick-Number(ctx.memory[`${W}:start`]))/30;if(age>=wTime){launchRoll(ctx);}else if(ctx.self.action?.kind==="channel"&&ctx.self.action.ability==="W"){
          const base=Number(ctx.memory[`${W}:baseSpeed`]),delay=Number(ctx.memory[`${W}:speedDelay`]),increment=Math.max(0,Math.floor((age-delay)/wStepTime+EPSILON))*wStep,moveSpeed=age<wSlowTime?base*(1-wSlow):Math.min(base+wSpeedCap,base+increment);ctx.memory[`${W}:speed`]=moveSpeed;const threat=ctx.world.missiles.find(m=>m.id===ctx.memory[`${W}:telegraph`]);if(threat){threat.x=ctx.self.x;threat.radius=collisionRadius(age);threat.connects=Number(ctx.memory[`${W}:direction`])*(ctx.enemy.x-ctx.self.x)>=0;threat.impactTick=ctx.tick+ticks(Math.max(0,Math.abs(ctx.enemy.x-ctx.self.x)-threat.radius-ctx.enemy.spec.base.radius)/Math.max(EPSILON,moveSpeed));threat.onHit=[{type:"damage",damageType:"magic",amount:between(wMin,wMax,strength(age)),petDamageCategory:"area"},{type:"displace",direction:"away",distance:0,duration:seriesAt(wAir,age,true)}];}ownStatus(ctx,{type:"state",state:"moveSpeedOverride",value:moveSpeed,duration:2/30},`${W}:speed`,ctx.self.spec.abilities.find(a=>a.key==="W")!);
          const held=[...ccTypes(ctx.self)].some(cc=>["stun","airborne","suppression","stasis","sleep","suspension","charm","fear","taunt","berserk"].includes(cc));if(!held&&!ctx.self.forced){const from=ctx.self.x,direction=Number(ctx.memory[`${W}:direction`]) as 1|-1,to=from+direction*moveSpeed/30,reach=collisionRadius(age),wall=terrainContact(ctx.world,ctx.self,from,to,reach),group=ctx.memory[`${W}:group`];let stop=wall;
            const list=contacts(ctx.world,ctx.self).filter(contact=>valid(ctx.self,contact.target)).flatMap(contact=>{const point=along(from,to,contact.target.x,reach*(contact.pet?.spec.targetClass==="monster"?monsterCollision:1)+contact.target.spec.base.radius);return point===undefined?[]:[{contact,point}];}).sort((a,b)=>Math.abs(a.point-from)-Math.abs(b.point-from));
            for(const {contact,point} of list){if(stop!==undefined&&Math.abs(point-from)>Math.abs(stop-from)+EPSILON)break;const explodes=champion(contact)||contact.pet?.spec.largePet===true||contact.pet?.spec.targetClass==="monster"&&["medium","large"].includes(contact.pet.spec.sizeClass??"")||contact.pet?.spec.epicMonster===true;if(explodes){stop=point;break;}if(contact.pet&&(contact.pet.spec.targetClass==="minion"||contact.pet.spec.targetClass==="monster"&&contact.pet.spec.sizeClass==="small")){const key=`${W}:rolled:${group}:${contact.pet.id}`;if(!ctx.memory[key]){ctx.memory[key]=true;hit(ctx,contact,roll,[{type:"damage",damageType:"magic",amount:between(wMinRoll,wMaxRoll,strength(age)),petDamageCategory:"area"}],1,point);}}}
            ctx.self.x=stop??to;if(stop!==undefined){clearRoll(ctx);explosion(ctx,stop,age);ctx.apply({type:"cc",cc:"stun",duration:wSelfStun},true);}
          }
        }}
        for(const key of Object.keys(ctx.memory).filter(key=>key.startsWith(`${E}:throw:`))){const due=Number(ctx.memory[key]);if(ctx.tick<due)continue;const group=Number(key.slice(`${E}:throw:`.length).split(":")[0]);delete ctx.memory[key];if(!ctx.self.resurrection)emitBall(ctx,due,group);}
        if(ctx.memory[E]){
          if(ctx.tick>=Number(ctx.memory[E])){const group=Number(ctx.memory[`${E}:group`]);delete ctx.memory[E];for(const contact of contacts(ctx.world,ctx.self)){const mark=contact.target.statuses.find(status=>status.kind==="mark"&&status.key===markKey(ctx.self)&&status.value===group&&status.endTick>ctx.tick);if(mark&&Math.abs(contact.target.x-ctx.self.x)<=eRootRadius+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,root,[{type:"damage",damageType:"magic",amount:eRootDamage,petDamageCategory:"area"},{type:"cc",cc:"root",duration:eRoot}]);const statuses=contact.pet?.statuses??contact.target.statuses;const remaining=statuses.filter(status=>!(status.kind==="mark"&&status.key===markKey(ctx.self)&&status.value===group));if(contact.pet)contact.pet.statuses=remaining;else contact.target.statuses=remaining;}releaseCooldowns(ctx.world,ctx.self);}
        }
        if(ctx.memory[R]){const age=(ctx.tick-Number(ctx.memory[`${R}:start`]))/30;if(ctx.tick>=Number(ctx.memory[`${R}:next`])){ctx.memory[`${R}:next`]=Number(ctx.memory[`${R}:start`])+ticks((Math.floor(age/rSlowStep+EPSILON)+1)*rSlowStep);const strength=seriesAt(rSlows,Math.min(rTime,age),false)/100;for(const contact of contacts(ctx.world,ctx.self))if(Math.abs(contact.target.x-ctx.self.x)<=rRadius+contact.target.spec.base.radius+EPSILON)hit(ctx,contact,chill,[{type:"cc",cc:"slow",strength,duration:rSlowStep+1/30}]);}if(age>=rTime)endZero(ctx);}
      },
    }};
  },
};
export default nunu;
