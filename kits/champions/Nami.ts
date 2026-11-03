/** Nami: actual alternating recipients, one real blessing stock and traveling control. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const EPSILON=1e-6,P="nami:tides",E="nami:blessing";
type Body={target:Unit;pet?:Pet};
const nami:KitModule={
 champion:"Nami",
 build(kit){
  const p=kit.ability("Surging Tides"),q=kit.ability("Aqua Prison"),w=kit.ability("Ebb and Flow"),e=kit.ability("Tidecaller's Blessing"),r=kit.ability("Tidal Wave");
  const pText="grant 100 (+ 25% AP) bonus movement speed",pFlat=p.quoted(pText),pAP=p.quoted(pText,1)/100,pTime=p.quoted("decaying over 1.5 seconds");
  p.quote("bonus is doubled from Tidal Wave");p.quote("separate empowered buff that has priority");p.quote("begin with full strength and completely decay over its remaining duration");
  const qRange=q.field("targetRange"),qRadius=q.field("effectRadius","enemies"),qAllyRadius=q.field("effectRadius","allies"),qDelay=q.quoted("lands after 0.726"),qTime=q.quoted("suspending them for 1.5 seconds"),qDamage=q.formula("Magic Damage");
  q.quote("0.264 + 0.726 = 0.99");q.quote("allows Last Breath to be cast");q.gameQuote('"name":"StunDuration","values":[1.5,1.5,1.5,1.5,1.5,1.5,1.5]');
  const wRange=w.field("targetRange"),wBounce=w.field("effectRadius"),wSpeed=w.field("speed","Initial"),wBounceSpeed=w.field("speed","Bounce"),wDamage=w.formula("Magic Damage"),wHeal=w.formula("Heal");
  const bounceText="-20% (+ 15% per 100 AP)",bounceBase=w.quoted(bounceText)/100,bounceAP=w.quoted(bounceText,1)/10000,maxTargets=w.gameQuoted('"name":"MaxTargets","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]',0,"Characters/Nami/Spells/NamiWAbility/NamiW");
  w.quote("Minimum Heal");w.quote("target who blocked the ability may be targeted again by the final bounce");w.quote("does not go on cooldown nor pay its cost");
  w.gameQuote('"mSpeed":1500.0',"Characters/Nami/Spells/NamiWAbility/NamiWMissileAlly");w.gameQuote('"mSpeed":2500.0',"Characters/Nami/Spells/NamiWAbility/NamiWEnemy");
  const eTime=e.quoted("for 6 seconds"),eCount=e.quoted("next 3 basic attacks"),eSlowTime=e.quoted("slow enemies for 1 second"),eDamage=e.formula("Bonus Magic Damage Per Hit"),eRange=e.field("targetRange"),eForgive=e.quoted("forgiveness radius of 175 units"),eSlow=e.baseOf("Slow")/100,eSlowAP=e.quoted("(+ 5% per 100 AP)")/10000;
  const eArea=e.levelValue("Empowered abilities that apply")/100;
  e.quote("effect will not trigger against structures nor wards");e.quote("enchantment redirection");
  const rRange=r.field("targetRange"),rWidth=r.field("width"),rSpeed=r.field("speed"),rDamage=r.formula("Magic Damage"),rUp=r.quoted("knocking them up for 0.5 seconds"),rSlow=r.quoted("slowing them by 70%")/100;
  const qCD=q.cooldown(),wCD=w.cooldown(),eCD=e.cooldown(),rCD=r.cooldown(),rCast=r.castTime();
  const rSlowSeries=r.seriesIn("based on distance traveled");
  if(rSlowSeries.kind!=="variable")throw new Error("Nami Tidal Wave requires its pinned distance-based slow series");
  const rMin=Number(rSlowSeries.values[0]),rMax=Number(rSlowSeries.values.at(-1));
  if(!Number.isFinite(rMin)||!Number.isFinite(rMax))throw new Error("Nami Tidal Wave slow endpoints must be numeric");
  r.quote("trigger immediately on Nami on-cast");r.quote("wave travels over 3.267");r.field("effectRadius","vision");r.gameQuote('"mSpeed":850.0');
  const champion=(target:Unit)=>target.petId===undefined||target.spec.targetClass==="champion";
  const bodyId=(body:Body)=>body.pet?`p${body.pet.id}`:`u${body.target.side}`;
  const bodyOf=(world:World,self:Unit,id:string):Body|undefined=>{
   if(id.startsWith("u")){const target=world.units[Number(id.slice(1))as 0|1];return target?{target}:undefined;}
   const pet=world.pets.find(pet=>pet.id===Number(id.slice(1)));return pet?{target:petFormulaTarget(pet,self,world.tick),pet}:undefined;
  };
  const bodies=(world:World,self:Unit):Body[]=>[...world.units.map(target=>({target})),...world.pets.filter(pet=>pet.spec.targetClass==="champion"&&!pet.spec.hitPoints&&!pet.spec.fixedDamage).map(pet=>({target:petFormulaTarget(pet,self,world.tick),pet}))];
  const live=(world:World,self:Unit,body:Body)=>body.target.alive&&body.target.hp>0&&!body.target.resurrection&&!inStasis(body.target)&&!isUntargetable(body.target,self)&&(!body.pet||canTargetPet(body.pet,self,world.tick));
  const allies=(world:World,self:Unit)=>bodies(world,self).filter(body=>body.target.side===self.side&&live(world,self,body));
  const sync=(body:Body)=>{if(body.pet){body.pet.statuses=body.target.statuses;body.pet.hp=body.target.hp;}};
  const apply=(ctx:HookContext,body:Body,effects:Effect[],spell:AbilitySpec)=>{for(const effect of effects)applyEffect(ctx.world,ctx.self,body.target,effect,{ability:spell,scale:1});sync(body);};
  const chooseAlly=(world:World,self:Unit,range:number,aim?:Aim)=>{
   const candidates=allies(world,self).filter(body=>body.pet&&Math.abs(body.target.x-self.x)<=range+EPSILON);
   const cursor=aim?.distance===undefined?self.x:self.x+directionTo(self,world.units[self.side===0?1:0])*aim.direction*aim.distance;
   return candidates.sort((a,b)=>Math.abs(a.target.x-cursor)-Math.abs(b.target.x-cursor)||a.pet!.id-b.pet!.id)[0];
  };
  const tides=(ctx:HookContext,body:Body,empowered=false)=>{
   const key=`${P}:${empowered?"wave":"normal"}`;
   const memory=body.pet?body.pet.memory:body.target.memory;
   memory[`${key}:start`]=ctx.tick;memory[`${key}:end`]=ctx.tick+ticks(pTime);memory[`${key}:amount`]=(pFlat+pAP*derive(ctx.self).ap)*(empowered?2:1);
   updateTides(ctx,body);
  };
  const updateTides=(ctx:HookContext,body:Body)=>{
   const memory=body.pet?body.pet.memory:body.target.memory;
   body.target.statuses=body.target.statuses.filter(status=>status.memoKey!==P||status.source!==ctx.self.side);
   const waveEnd=Number(memory[`${P}:wave:end`]??0),normalEnd=Number(memory[`${P}:normal:end`]??0);
   let amount=0,end=0;
   if(ctx.tick<waveEnd){end=waveEnd;amount=Number(memory[`${P}:wave:amount`]??0)*(waveEnd-ctx.tick)/ticks(pTime);}
   else if(ctx.tick<normalEnd){
    end=normalEnd;
    const start=Math.max(Number(memory[`${P}:normal:start`]??0),waveEnd);
    amount=Number(memory[`${P}:normal:amount`]??0)*(normalEnd-ctx.tick)/Math.max(1,normalEnd-start);
   }
   if(amount>0)body.target.statuses.push({kind:"stat",key:"moveSpeedFlat",memoKey:P,source:ctx.self.side,startTick:ctx.tick,endTick:end,value:amount,ability:"I"});
   sync(body);
  };
  const blessing=(ctx:HookContext,body:Body)=>{
   const memory=body.pet?body.pet.memory:body.target.memory;
   memory[`${E}:${ctx.self.side}:count`]=eCount;memory[`${E}:${ctx.self.side}:end`]=ctx.tick+ticks(eTime);
   tides(ctx,body);
  };
  const takeBlessing=(ctx:HookContext,actor:Body,group?:string)=>{
   const granted=group?`${E}:grant:${group}`:undefined;
   if(granted&&ctx.memory[granted])return true;
   const memory=actor.pet?actor.pet.memory:actor.target.memory,key=`${E}:${ctx.self.side}`;
   if(ctx.tick>=Number(memory[`${key}:end`]??0)||Number(memory[`${key}:count`]??0)<=0)return false;
   memory[`${key}:count`]=Number(memory[`${key}:count`])-1;
   if(granted)ctx.memory[granted]=true;
   return true;
  };
  const procEffects=(ctx:HookContext,target:Unit,area=false):Effect[]=>[
   {type:"damage",damageType:"magic",amount:{base:evaluate(eDamage,ctx.self)*(area&&!champion(target)?eArea:1)},noLifeSteal:true,petDamageCategory:"proc"},
   {type:"cc",cc:"slow",duration:eSlowTime,strength:Math.min(1,eSlow+eSlowAP*derive(ctx.self).ap)},
  ];
  const proc:AbilitySpec={key:"E-proc",name:e.name,slot:"other",activation:"internal",countsAsCast:false,budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},flags:{spellShield:false,parry:true,petContactHooks:true},usable:()=>false};
  const wHit:AbilitySpec={key:"W-bounce",name:w.name,slot:"W",activation:"internal",countsAsCast:false,budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},flags:{projectile:true,spellShield:true,petContactHooks:true},usable:()=>false};
  let abilities:AbilitySpec[];
  const group=(self:Unit,key:string)=>Number(self.memory[`nami:cast:${key}`]??0);
  const markGroup=(effect:Effect,key:string,serial:number)=>effect.type==="damage"?{...effect,label:`nami:${key}:${serial}`}:effect;
  const wLeg=(ctx:HookContext,body:Body,x:number,serial:number,step:number)=>{
   if(!live(ctx.world,ctx.self,body))return;
   const hostile=body.target.side!==ctx.self.side,scale=Math.max(0,1+step*(bounceBase+bounceAP*derive(ctx.self).ap));
   const missile:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:wHit.key,seenTick:ctx.tick,x,perTick:wBounceSpeed/30,direction:(body.target.x>x?1:-1),homing:true,travelLeft:Infinity,projectile:true,connects:hostile,scale:1,onHit:hostile?[{type:"damage",damageType:"magic",amount:{base:evaluate(wDamage,ctx.self)*scale},label:`nami:W:${serial}`,petDamageCategory:"area"}]:[{type:"heal",amount:{base:evaluate(wHeal,ctx.self)*scale}}],...(body.pet&&hostile?{pet:body.pet.id}:{}),...(!hostile?{perceptionHidden:true,piercing:true,perTick:0,expiresTick:ctx.tick+ticks(ctx.world.settings.maxSeconds+1)}:{})};
   ctx.memory[`nami:w:${missile.id}:serial`]=serial;ctx.memory[`nami:w:${missile.id}:step`]=step;ctx.memory[`nami:w:${missile.id}:target`]=bodyId(body);
   if(!hostile)ctx.memory[`nami:w:${missile.id}:speed`]=wBounceSpeed;
   ctx.world.missiles.push(missile);
  };
  const nextBounce=(ctx:HookContext,current:Body,serial:number,step:number)=>{
   if(step+1>=maxTargets)return;
   const candidates=bodies(ctx.world,ctx.self).filter(body=>body.target.side!==current.target.side&&live(ctx.world,ctx.self,body)&&canSee(body.target,ctx.self)&&Math.abs(body.target.x-current.target.x)<=wBounce+EPSILON&&!ctx.memory[`nami:w:${serial}:visited:${bodyId(body)}`]);
   // Source gives alternating unaffected champions but no tie ordering. Distance and
   // actual stable body identity make the explicit arena policy deterministic.
   const selected=candidates.sort((a,b)=>Math.abs(a.target.x-current.target.x)-Math.abs(b.target.x-current.target.x)||bodyId(a).localeCompare(bodyId(b)))[0];
   if(selected)wLeg(ctx,selected,current.target.x,serial,step+1);
  };
  const healBody=(ctx:HookContext,body:Body,serial:number,step:number)=>{
   const scale=Math.max(0,1+step*(bounceBase+bounceAP*derive(ctx.self).ap));
   heal(ctx.world,body.target,evaluate(wHeal,ctx.self)*scale);sync(body);tides(ctx,body);
   ctx.memory[`nami:w:${serial}:visited:${bodyId(body)}`]=true;nextBounce(ctx,body,serial,step);
  };
  const readyAlly=(world:World,self:Unit,key:string,range:number)=>{
   const body=bodyOf(world,self,String(self.memory[`nami:target:${key}`]??""));
   return !!body&&body.target.side===self.side&&live(world,self,body)&&Math.abs(body.target.x-self.x)<=range+EPSILON;
  };
  abilities=[
   {key:"Q",name:q.name,slot:"Q",cooldown:q.cooldown(),cost:q.cost(),castTime:q.castTime(),delivery:{kind:"circle",range:qRange,radius:qRadius,delay:qDelay,centered:true},flags:{projectile:true,spellShield:true,petContactHooks:true},onHit:[{type:"damage",damageType:"magic",amount:qDamage},{type:"cc",cc:"suspension",duration:qTime},{type:"state",state:"standardSight",duration:qTime,revealWhileCC:"suspension"}],roles:["damage","cc"],persistsAfterDeath:true},
   {key:"W",name:w.name,slot:"W",cooldown:w.cooldown(),cost:w.cost(),castTime:w.castTime(),delivery:{kind:"target",range:wRange,missileSpeed:wSpeed},cancelOnInvalidTarget:true,flags:{projectile:true,spellShield:true,petContactHooks:true},onHit:[{type:"damage",damageType:"magic",amount:wDamage,petDamageCategory:"area"}],roles:["damage"],persistsAfterDeath:true},
   {key:"W-self",name:`${w.name} (self)`,slot:"W",cooldown:w.cooldown(),cooldownKey:"W",cost:w.cost(),castTime:w.castTime(),delivery:{kind:"self"},castThreat:false,budgetExcluded:true,roles:["defense"]},
   {key:"W-ally",name:`${w.name} (ally)`,slot:"W",cooldown:w.cooldown(),cooldownKey:"W",cost:w.cost(),castTime:w.castTime(),delivery:{kind:"self"},castThreat:false,budgetExcluded:true,roles:["defense"],usable:(self,world)=>!!chooseAlly(world,self,wRange),validTargetAtCompletion:(world,self)=>readyAlly(world,self,"W",wRange)},
   {key:"E",name:e.name,slot:"E",cooldown:e.cooldown(),cost:e.cost(),castTime:e.castTime(),delivery:{kind:"self"},castThreat:false,budgetExcluded:true,roles:["buff"]},
   {key:"E-ally",name:`${e.name} (ally)`,slot:"E",cooldown:e.cooldown(),cooldownKey:"E",cost:e.cost(),castTime:e.castTime(),delivery:{kind:"self"},castThreat:false,budgetExcluded:true,roles:["buff"],usable:(self,world)=>!!chooseAlly(world,self,eRange)},
   {key:"R",name:r.name,slot:"R",cooldown:r.cooldown(),cost:r.cost(),castTime:r.castTime(),delivery:{kind:"line",range:rRange,width:rWidth,speed:rSpeed,piercing:true,collisionPet:true,radius:rWidth/2},flags:{projectile:true,spellShield:true,petContactHooks:true},onHit:[{type:"damage",damageType:"magic",amount:rDamage},{type:"displace",direction:"away",distance:0,duration:rUp},{type:"cc",cc:"slow",duration:rMin,strength:rSlow}],roles:["damage","cc"],persistsAfterDeath:true},proc,wHit,
  ];
  const spell=(key:string)=>abilities.find(ability=>ability.key===key)!;
  const updateRecipients=(ctx:HookContext)=>{
   for(const body of bodies(ctx.world,ctx.self).filter(body=>body.target.side===ctx.self.side&&body.target.alive&&body.target.hp>0))updateTides(ctx,body);
  };
  const policy:Behavior=view=>{
   const {self,enemy,world,mode}=view,normal=defaultBehavior({...view,self:{...self,spec:{...self.spec,abilities:[]}}});
   if(mode==="idle")return normal;if(self.memory.tradeDone)return{kind:"move",direction:-1};
   if(self.action)return normal;
   const ready=(key:string)=>canCast(world,self,spell(key));
   const blessed=world.tick<Number(self.memory[`${E}:${self.side}:end`]??0)&&Number(self.memory[`${E}:${self.side}:count`]??0)>0;
   const missing=derive(self).maxHp-self.hp,distance=Math.abs(self.x-enemy.x);
   if(ready("W-self")&&missing>=evaluate(wHeal,self)*.5&&(distance>wRange||mode==="flee"||missing>evaluate(wHeal,self)))return{kind:"cast",ability:"W-self"};
   if(mode!=="flee"&&ready("E")&&distance<=wRange&&!blessed)return{kind:"cast",ability:"E"};
   if(ready("Q")&&distance<=qRange+qRadius+enemy.spec.base.radius)return{kind:"cast",ability:"Q"};
   if(mode!=="flee"&&ready("W"))return{kind:"cast",ability:"W"};
   if(mode==="fight"&&ready("R")&&distance<=rRange+enemy.spec.base.radius&&!enemy.statuses.some(status=>status.kind==="cc"&&["suspension","airborne"].includes(status.key)&&status.endTick-world.tick>ticks(rCast+distance/rSpeed)))return{kind:"cast",ability:"R"};
   if(mode==="flee"&&ready("E")&&!blessed)return{kind:"cast",ability:"E"};
   if(mode!=="flee"&&canStartAttack(world,self))return{kind:"attack"};return normal;
  };
  kit.assume("Surging Tides uses actual allied Champion-class bodies, including self, with a recipient-local 100 + 25% AP flat bonus decaying linearly over 1.5 seconds. Tidal Wave's separate doubled buff has priority even when weaker; an overlapping normal buff resumes at full strength and decays over its remaining lifetime. Buff source/AP are Nami's, while recipient movement modifiers and soft caps remain local. No allied body is fabricated.");
  kit.assume("Aqua Prison retains the primary 0.25-second cast plus 0.726-second post-cast flight; the raw note's 0.264+0.726=0.99 and binary metadata conflict are explicit rather than replacing the primary cast. Its 200 center-distance enemy radius and 1.5-second tenacity-sensitive suspension remain distinct from the 225 ally threshold. Suspension supplies Last Breath's existing entitlement and the associated standard sight does not expose invisibility or camouflage. The primary ally radius is explicitly pending a source test and remains uncertain. The bubble follows a fixed-time axial projectile path to its declared ground point, so projectile destruction removes the landing. Missing vertical trajectory is not invented.");
  kit.assume("Ebb and Flow has one initial 2500-speed flight and up to two 1500-speed bounces among real unaffected Champion-class bodies, alternating teams and admitting Nami. Source minimum 60% after two bounces establishes additive signed 20%-per-bounce reduction, with 15% per 100 AP scaling, rather than compounded 64%. Each launch snapshots its own damage/heal/AP multiplier; real recipient defenses and healing modifiers remain local. A spell-shielded enemy is not marked visited and may be the final bounce again; parried recipients remain visited. Equal-choice priority is unsourced: nearest current center then actual stable identity is the explicit deterministic arena policy. Invalid declared enemy/ally targets cancel before cost and cooldown. No imaginary third champion or minion bounce is supplied.");
  kit.assume("Tidecaller's Blessing starts empty and grants exactly three six-second entitlements to self or one actual allied Champion-class body. Own connected basics and damaging Q/W/R contacts, and actual allied connected basics, consume the real stock. One source cast shares an entitlement across its multiple actual recipients; defended root spell contacts do not consume stock, an explicit interpretation where the source does not resolve root/proc defense ordering. The separate proc retains its own parry/dodge/block restrictions without making the parent area spell dodgeable. Ability-instance identity is retained in each launched missile/zone instead of deducing it from damage packets. Proc damage uses current NamiAP, slows use recipient immunity/tenacity, and area procs against actual nonchampions use the primary extrapolated level 20 rate 69.8824%, rather than the level 18 endpoint 66%. No allied spell actor without supplied ability identity, item/rune activation, structure or ward is invented; enchantment redirection is outside the item-free arena.");
  kit.assume("Tidal Wave retains 2750-range/500 full width/850 speed and primary estimated 0.5-second knockup. The distance-based 70% slow interpolates the retained 2-to-4-second series against actual axial flight distance and stays separate from airborne. Primary travel note 3.267 conflicts with 2750/850 and remains recorded. Moving wave crossings grant the doubled passive once per real ally, while Nami receives it on actual completed cast. Trajectory sight has a sourced 750 radius but arena vision has no ground-vision geometry; it is not equated with true sight or a target reveal. Hold/trade reserve R, completed trades retreat, and flee can heal, speed self or aim Q for peel.");
  kit.assume("Reference allocation prices ordinary Q/W/R damage plus at most three self Blessing procs per hasted E cooldown and one actual self-heal on W's first bounce. It adds no fabricated allied targets, damage bounces or ally stats. Actual casts still require resources, real target availability, incoming damage for healing and real contacts.");
  return{abilities,attack:{onHitToPets:true},behavior:policy,budget:{damage(self,target){const haste=1+derive(self).abilityHaste/100,rate=derive(self).attackSpeed+haste/qCD+haste/wCD+haste/rCD;return{magic:Math.min(rate,eCount*haste/eCD)*evaluate(eDamage,self,target)};},healing(self){return evaluate(wHeal,self)*Math.max(0,1+bounceBase+bounceAP*derive(self).ap)*(1+derive(self).abilityHaste/100)/wCD;}},hooks:{
   ownedPetEventsAfterDeath:true,
   onCastStart(ctx){
    const root=ctx.ability.key.split("-")[0]!;
    if(["Q","W","R"].includes(root))ctx.memory[`nami:cast:${root}`]=ctx.world.nextId++;
    if(ctx.ability.key==="W-ally"||ctx.ability.key==="E-ally")ctx.memory[`nami:target:${root}`]=chooseAlly(ctx.world,ctx.self,root==="W"?wRange:eRange,ctx.aim)?bodyId(chooseAlly(ctx.world,ctx.self,root==="W"?wRange:eRange,ctx.aim)!):"";
   },
   onCast(ctx){
    if(ctx.ability.key==="W-self")healBody(ctx,{target:ctx.self},group(ctx.self,"W"),0);
    if(ctx.ability.key==="W-ally"){
     const target=bodyOf(ctx.world,ctx.self,String(ctx.memory["nami:target:W"]));if(target){wLeg(ctx,target,ctx.self.x,group(ctx.self,"W"),0);const missile=ctx.world.missiles.at(-1)!;ctx.memory[`nami:w:${missile.id}:speed`]=wSpeed;}
    }
    if(ctx.ability.key==="E")blessing(ctx,{target:ctx.self});
    if(ctx.ability.key==="E-ally"){const target=bodyOf(ctx.world,ctx.self,String(ctx.memory["nami:target:E"]));if(target&&live(ctx.world,ctx.self,target)&&Math.abs(target.target.x-ctx.self.x)<=eRange+eForgive+EPSILON)blessing(ctx,target);}
    if(ctx.ability.key==="R")tides(ctx,{target:ctx.self},true);
   },
   onMissileCreated(ctx){
    if(ctx.ability.key==="W"){
     const serial=group(ctx.self,"W");ctx.missile.onHit=ctx.missile.onHit.map(effect=>markGroup(effect,"W",serial));ctx.memory[`nami:w:${ctx.missile.id}:serial`]=serial;ctx.memory[`nami:w:${ctx.missile.id}:step`]=0;ctx.memory[`nami:w:${ctx.missile.id}:target`]=`u${ctx.enemy.side}`;
    }
    if(ctx.ability.key==="R"){const serial=group(ctx.self,"R");ctx.missile.onHit=ctx.missile.onHit.map(effect=>markGroup(effect,"R",serial));ctx.memory[`nami:r:${ctx.missile.id}:origin`]=ctx.missile.x;ctx.memory[`nami:r:${ctx.missile.id}:serial`]=serial;ctx.memory[`nami:r:${serial}:ally:u${ctx.self.side}`]=true;}
   },
   onZoneCreated(ctx){
    if(ctx.ability.key!=="Q")return;
    const zone=ctx.zone;
    zone.onHit=zone.onHit?.map(effect=>markGroup(effect,"Q",group(ctx.self,"Q")));
    const distance=Math.abs(zone.x-ctx.self.x);
    if(distance>EPSILON){
     const missile:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:"Q-flight",seenTick:zone.seenTick,x:ctx.self.x,perTick:distance/ticks(qDelay),homing:false,direction:zone.x>ctx.self.x?1:-1,travelLeft:distance,projectile:true,connects:false,scale:1,onHit:[],landingZone:{id:zone.id,delayTicks:0}};
     // The generic resolver still branches on this zone. Flight only supplies its
     // actual arrival and cancellation clock, without applying a second chance.
     zone.endTick=Infinity;ctx.world.missiles.push(missile);
    }
   },
   onMissileTick(ctx){
    const {missile}=ctx;
    if(missile.source!==wHit.key||!missile.perceptionHidden)return;
    const body=bodyOf(ctx.world,ctx.self,String(ctx.memory[`nami:w:${missile.id}:target`]));
    if(!body||!live(ctx.world,ctx.self,body)){missile.ended=true;return;}
    const from=missile.x,speed=Number(ctx.memory[`nami:w:${missile.id}:speed`]??wBounceSpeed)/30;
    missile.x+=Math.sign(body.target.x-missile.x)*Math.min(speed,Math.abs(body.target.x-missile.x));
    if(projectileBlockPoint(ctx.world,missile.owner,from,missile.x)!==undefined){missile.ended=true;return;}
    if(Math.abs(missile.x-body.target.x)<=body.target.spec.base.radius+EPSILON){missile.ended=true;healBody(ctx,body,Number(ctx.memory[`nami:w:${missile.id}:serial`]),Number(ctx.memory[`nami:w:${missile.id}:step`]));}
   },
   onMissileMove(ctx){
    if(ctx.missile.source!=="R")return;
    const serial=Number(ctx.memory[`nami:r:${ctx.missile.id}:serial`]),origin=Number(ctx.memory[`nami:r:${ctx.missile.id}:origin`]);
    ctx.memory[`nami:r:${serial}:distance`]=Math.abs(ctx.to-origin);
    for(const body of allies(ctx.world,ctx.self))if(!ctx.memory[`nami:r:${serial}:ally:${bodyId(body)}`]&&body.target.x>=Math.min(ctx.from,ctx.to)-body.target.spec.base.radius-rWidth/2-EPSILON&&body.target.x<=Math.max(ctx.from,ctx.to)+body.target.spec.base.radius+rWidth/2+EPSILON){ctx.memory[`nami:r:${serial}:ally:${bodyId(body)}`]=true;tides(ctx,body,true);}
   },
   onMissileContact(ctx){
    if(ctx.missile.source!=="W"&&ctx.missile.source!==wHit.key)return;
    const serial=Number(ctx.memory[`nami:w:${ctx.missile.id}:serial`]),step=Number(ctx.memory[`nami:w:${ctx.missile.id}:step`]);
    const body:Body={target:ctx.enemy,...(ctx.targetPet?{pet:ctx.targetPet}:{})};nextBounce(ctx,body,serial,step);
   },
   onZoneLand(ctx){if(ctx.zone.ability==="Q")for(const body of allies(ctx.world,ctx.self))if(Math.abs(body.target.x-ctx.zone.x)<=qAllyRadius+EPSILON)tides(ctx,body);},
   onAbilityContact(ctx){
    const label=ctx.effects.find(effect=>effect.type==="damage")?.label,match=label?.match(/^nami:([QWR]):(\d+)$/);
    if(!match)return;
    if(match[1]==="W"&&ctx.defense!=="spellShield")ctx.memory[`nami:w:${match[2]}:visited:${ctx.enemy.petId===undefined?`u${ctx.enemy.side}`:`p${ctx.enemy.petId}`}`]=true;
    return ctx.effects.map(effect=>effect.type==="cc"&&effect.cc==="slow"&&match[1]==="R"?{...effect,duration:rMin+(rMax-rMin)*Math.min(1,Number(ctx.memory[`nami:r:${match[2]}:distance`]??0)/rRange)}:effect);
   },
   beforeAbilityHit(ctx){
    const label=ctx.effects.find(effect=>effect.type==="damage")?.label,match=label?.match(/^nami:([QWR]):(\d+)$/);
    if(match&&takeBlessing(ctx,{target:ctx.self},`${match[1]}:${match[2]}`))ctx.memory[`nami:pending:${ctx.ability.key}:${ctx.enemy.petId??`u${ctx.enemy.side}`}`]=true;
   },
   onAbilityHit(ctx){
    const key=`nami:pending:${ctx.ability.key}:${ctx.enemy.petId??`u${ctx.enemy.side}`}`;
    if(!ctx.memory[key])return;delete ctx.memory[key];
    const targetPet=ctx.enemy.petId===undefined?undefined:ctx.world.pets.find(pet=>pet.id===ctx.enemy.petId);
    if(targetPet)abilityHitPet(ctx.world,ctx.self,targetPet,proc,procEffects(ctx,ctx.enemy,true),"proc",ctx.scale);
    else abilityHit(ctx.world,ctx.self,ctx.enemy,proc,procEffects(ctx,ctx.enemy,true),ctx.scale);
   },
   onAttackHit(ctx){if(takeBlessing(ctx,{target:ctx.self}))abilityHit(ctx.world,ctx.self,ctx.enemy,proc,procEffects(ctx,ctx.enemy),ctx.scale);},
   onAttackPetHit(ctx){if(takeBlessing(ctx,{target:ctx.self}))abilityHitPet(ctx.world,ctx.self,ctx.pet,proc,procEffects(ctx,ctx.enemy),"proc",ctx.scale);},
   onOwnedPetBasicHit(ctx){if(ctx.pet.spec.targetClass!=="champion"||!takeBlessing(ctx,{target:petFormulaTarget(ctx.pet,ctx.self,ctx.tick),pet:ctx.pet}))return;if(ctx.targetPet)abilityHitPet(ctx.world,ctx.self,ctx.targetPet,proc,procEffects(ctx,ctx.target),"proc");else abilityHit(ctx.world,ctx.self,ctx.target,proc,procEffects(ctx,ctx.target));},
   onTick:updateRecipients,
   onTickWhileDead:updateRecipients,
   onTargetResurrection(ctx){if(ctx.target===ctx.self){ctx.memory[`${E}:${ctx.self.side}:count`]=0;ctx.memory[`${P}:normal:end`]=0;ctx.memory[`${P}:wave:end`]=0;}},
  }};
 },
};
export default nami;
