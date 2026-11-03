/** Karma: finite Mantra, first-body explosions and target-owned Resolve tethers. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const MANTRA="karma:mantraUntil",EPSILON=1e-6;
type Body={target:Unit;pet?:Pet};
const karma:KitModule={
 champion:"Karma",
 build(kit){
  const p=kit.ability("Gathering Fire"),q=kit.ability("Inner Flame"),rq=kit.ability("Soulflare").atRank(4),w=kit.ability("Focused Resolve"),rw=kit.ability("Renewal").atRank(4),e=kit.ability("Inspire"),re=kit.ability("Defiance").atRank(4),r=kit.ability("Mantra");
  const refund=p.quoted("current cooldown is reduced by 4 seconds"),mantraTime=r.quoted("within 8 seconds"),rCD=r.cooldown();
  p.quote("per champion hit by either damage instance");p.quote("when initially cast and again after the duration for the tether has expired");r.quote("can be used while affected by cast-inhibiting crowd control");r.textField("cooldownStart");
  const qDamage=q.formula("Magic Damage"),qBonus=rq.formula("Bonus Magic Damage"),rupture=rq.formula("Magic Damage"),qRange=q.fieldNumbers("targetRange")[0]!,qRadius=q.field("effectRadius"),qWidth=q.field("width"),rqWidth=rq.field("width"),qSpeed=q.field("speed"),qCD=q.cooldown(),qCast=q.castTime(),qCost=q.cost();
  const qSlow=q.quoted("slowing them by 40%")/100,qSlowTime=q.quoted("for 1.5 seconds"),fieldTime=rq.quoted("field for 1.5 seconds"),fieldSlow=rq.quoted("slows enemies within by 50%")/100,fieldRadius=rq.field("effectRadius");
  q.quote("explodes on the first enemy hit");q.quote("centered around the location of the missile as it collides");q.quote("wherever the caster is at the end of the cast time");rq.quote("also explodes at maximum range");rq.quote("not block Soulflare's field damage");rq.quote("lingering field will always be created at the impacted enemy's center");
  const wDamage=w.formula("Magic Damage"),wRange=w.field("targetRange"),tetherRange=w.field("tetherRadius"),tetherTime=w.quoted("for 2 seconds"),rootTime=w.number("Root Duration"),rootBonus=rw.number("Root Duration Increase"),wCD=w.cooldown(),wCast=w.castTime(),wCost=w.cost();
  const healWords="17% (+ 1% per 100 AP) of her missing health",healShare=rw.quoted(healWords)/100,healAP=rw.quoted(healWords,1)/100/rw.quoted(healWords,2);
  w.quote("enemy champion, monster or pet");w.quote("not the aftereffects of one already applied");w.quote("becomes untargetable, dies, or is no longer in sight during the cast time");w.quote("still go on cooldown and pay its cost");rw.quote("Karma is still healed on-cast");rw.quote("or the target dies while tethered");
  const eShield=e.formula("Shield Strength"),eBonus=re.formula("Bonus Primary Target Shield"),eSecondary=re.formula("Secondary Target Shield"),eTime=e.quoted("for 2.5 seconds"),eSpeed=e.quoted("40% bonus movement speed")/100,eSpeedTime=e.quoted("for 2 seconds"),eRange=e.field("targetRange"),eForgiveness=e.quoted("forgiveness radius of 175 units"),eCD=e.cooldown(),eCost=e.cost(),reRadius=re.field("effectRadius"),reSpeed=re.quoted("15% bonus movement speed")/100;
  // Game client metadata is checked, but primary damage/cast/range values above remain authoritative.
  q.gameQuote('"castRange":[950.0,950.0,950.0,950.0,950.0,950.0,950.0]',"Characters/Karma/Spells/KarmaQAbility/KarmaQMissile");
  e.gameQuote('"spellCastTime":0.25',"Characters/Karma/Spells/KarmaSolKimShieldAbility/KarmaSolKimShield");r.gameQuote('"spellCastTime":0.25',"Characters/Karma/Spells/KarmaMantraAbility/KarmaMantra");
  const plus=(a:Formula,b:Formula):Formula=>({base:a.base+b.base,ratios:{AP:(a.ratios?.AP??0)+(b.ratios?.AP??0)}});
  const empoweredDamage=plus(qDamage,qBonus);
  const active=(self:Unit,world:World)=>world.tick<Number(self.memory[MANTRA]??0)&&!self.resurrection;
  const consume=(ctx:HookContext)=>{ctx.memory[MANTRA]=0;};
  const eligibleFriendly=(world:World,self:Unit)=>world.pets.filter(pet=>pet.owner===self.side&&pet.spec.targetClass==="champion"&&!pet.spec.hitPoints&&!pet.spec.fixedDamage&&canTargetPet(pet,self,world.tick));
  const eligibleHostile=(world:World,self:Unit)=>world.pets.filter(pet=>pet.owner!==self.side&&!pet.spec.hitPoints&&!pet.spec.fixedDamage&&canTargetPet(pet,self,world.tick));
  const choose=(ctx:HookContext,friendly:boolean,aim?:Aim)=>{const range=friendly?eRange:wRange,cursor=aim?.distance===undefined?ctx.enemy.x:ctx.self.x+directionTo(ctx.self,ctx.enemy)*aim.direction*aim.distance;return(friendly?eligibleFriendly(ctx.world,ctx.self):eligibleHostile(ctx.world,ctx.self)).filter(pet=>Math.abs(pet.x-ctx.self.x)<=range+EPSILON).sort((a,b)=>Math.abs(a.x-cursor)-Math.abs(b.x-cursor)||a.id-b.id)[0];};
  const bodyOf=(ctx:HookContext,id:number):Body|undefined=>{if(id<0)return{target:ctx.enemy};const pet=ctx.world.pets.find(pet=>pet.id===id&&pet.hp>0);return pet?{target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}:undefined;};
  const sync=(body:Body)=>{if(body.pet){body.pet.hp=body.target.hp;body.pet.statuses=body.target.statuses;body.pet.memory=body.target.memory;}};
  const healRenewal=(ctx:HookContext)=>{const d=derive(ctx.self);heal(ctx.world,ctx.self,Math.max(0,d.maxHp-ctx.self.hp)*(healShare+healAP*d.ap));};
  const hit=(amount:Formula):Effect=>({type:"damage",damageType:"magic",amount});
  const qEffects:Effect[]=[hit(qDamage),{type:"cc",cc:"slow",strength:qSlow,duration:qSlowTime}],rqEffects:Effect[]=[hit(empoweredDamage),{type:"cc",cc:"slow",strength:qSlow,duration:qSlowTime}];
  const internal=(key:string,name:string,effects:Effect[],shield=true):AbilitySpec=>({key,name,slot:"other",activation:"internal",countsAsCast:false,budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},flags:{spellShield:shield,projectile:false,petContactHooks:true},onHit:effects,persistsAfterDeath:true,usable:()=>false});
  const impact=internal("Q-impact",q.name,qEffects),empoweredImpact=internal("RQ-impact",rq.name,rqEffects),field=internal("RQ-field",`${rq.name} (rupture)`,[hit(rupture)],false),fieldAura=internal("RQ-field-slow",`${rq.name} (field)`,[{type:"cc",cc:"slow",strength:fieldSlow,duration:1/30}],false);
  const tail=(empowered:boolean)=>internal(empowered?"RW-end":"W-end",`${empowered?rw.name:w.name} (tether completion)`,[hit(wDamage),{type:"cc",cc:"root",duration:rootTime+(empowered?rootBonus:0)},{type:"state",state:"revealed",duration:rootTime+(empowered?rootBonus:0),revealWhileCC:"root"}],false);
  const normalTail=tail(false),renewalTail=tail(true);normalTail.flags={...normalTail.flags,hitsUntargetable:true};renewalTail.flags={...renewalTail.flags,hitsUntargetable:true};
  const qSpec:AbilitySpec={key:"Q",name:q.name,slot:"Q",cooldown:qCD,cost:qCost,castTime:qCast,castDirection:"start",delivery:{kind:"line",range:qRange,width:qWidth,speed:qSpeed,collisionPet:true,radius:qWidth/2},onHit:qEffects,flags:{spellShield:true,projectile:true,petContactHooks:true},budgetExcluded:true,persistsAfterDeath:true,usable:(self,world)=>!active(self,world)};
  const rqSpec:AbilitySpec={...qSpec,key:"RQ",name:rq.name,slot:"other",cooldownKey:"Q",delivery:{kind:"line",range:qRange+fieldRadius,travelRange:qRange,width:rqWidth,speed:qSpeed,collisionPet:true,radius:rqWidth/2},onHit:rqEffects,usable:active};
  const wSpec:AbilitySpec={key:"W",name:w.name,slot:"W",cooldown:wCD,cost:wCost,castTime:wCast,cancelOnInvalidTarget:true,invalidTargetCost:"range",delivery:{kind:"target",range:wRange},onHit:[hit(wDamage)],flags:{spellShield:true,projectile:false,petContactHooks:true},budgetExcluded:true,usable:(self,world)=>!active(self,world)};
  const rwSpec:AbilitySpec={...wSpec,key:"RW",name:rw.name,slot:"other",cooldownKey:"W",usable:active};
  const capturedHostile=(self:Unit,world:World)=>world.pets.find(pet=>pet.id===self.memory["karma:wPet"]&&pet.owner!==self.side);
  const validatePet=(world:World,self:Unit):boolean|"range"=>{const pet=capturedHostile(self,world);if(!pet||!eligibleHostile(world,self).includes(pet))return false;return Math.abs(pet.x-self.x)>wRange+EPSILON?"range":true;};
  const wPet:AbilitySpec={...wSpec,key:"W-pet",name:`${w.name} (actual pet)`,slot:"other",cooldownKey:"W",delivery:{kind:"self"},onHit:[],cancelOnInvalidTarget:false,validTargetAtCompletion:validatePet,usable:(self,world)=>!active(self,world)&&eligibleHostile(world,self).some(pet=>Math.abs(pet.x-self.x)<=wRange+EPSILON)};
  const rwPet:AbilitySpec={...wPet,key:"RW-pet",name:`${rw.name} (actual pet)`,usable:(self,world)=>active(self,world)&&eligibleHostile(world,self).some(pet=>Math.abs(pet.x-self.x)<=wRange+EPSILON)};
  const eSpec:AbilitySpec={key:"E",name:e.name,slot:"E",cooldown:eCD,cost:eCost,castTime:e.castTime(),overlay:true,delivery:{kind:"self"},budgetExcluded:true,roles:["defense","escape"],usable:(self,world)=>!active(self,world)};
  const reSpec:AbilitySpec={...eSpec,key:"RE",name:re.name,slot:"other",cooldownKey:"E",usable:active};
  const eAlly:AbilitySpec={...eSpec,key:"E-ally",name:`${e.name} (actual ally)`,slot:"other",cooldownKey:"E",validTargetAtCompletion:(world,self)=>{const pet=world.pets.find(pet=>pet.id===self.memory["karma:ePet"]);return !!pet&&eligibleFriendly(world,self).includes(pet)&&Math.abs(pet.x-self.x)<=eRange+eForgiveness+EPSILON;},usable:(self,world)=>!active(self,world)&&eligibleFriendly(world,self).some(pet=>Math.abs(pet.x-self.x)<=eRange+EPSILON)};
  const reAlly:AbilitySpec={...eAlly,key:"RE-ally",name:`${re.name} (actual ally)`,usable:(self,world)=>active(self,world)&&eligibleFriendly(world,self).some(pet=>Math.abs(pet.x-self.x)<=eRange+EPSILON)};
  const rSpec:AbilitySpec={key:"R",name:r.name,slot:"R",cooldown:rCD,cost:r.cost(),castTime:r.castTime(),overlay:true,delivery:{kind:"self"},budgetExcluded:true,flags:{usableWhileDisabled:true},usable:(self,world)=>!active(self,world),roles:["buff"]};
  const abilities=[qSpec,wSpec,eSpec,rSpec,rqSpec,rwSpec,reSpec,wPet,rwPet,eAlly,reAlly,impact,empoweredImpact,field,fieldAura,normalTail,renewalTail];
  const get=(key:string)=>abilities.find(a=>a.key===key)!;
  const applyShield=(ctx:HookContext,body:Body,spell:AbilitySpec,amount:Formula,speed:number)=>{body.target.statuses=body.target.statuses.filter(s=>!(s.source===ctx.self.side&&((s.kind==="shield"&&["E","RE","E-ally","RE-ally"].includes(s.key))||(s.kind==="stat"&&s.key==="moveSpeedPercent"&&s.memoKey?.startsWith("karma:shieldSpeed")))));applyEffect(ctx.world,ctx.self,body.target,{type:"shield",amount,duration:eTime},{ability:spell,scale:1});applyEffect(ctx.world,ctx.self,body.target,{type:"stat",stat:"moveSpeedPercent",amount:{base:speed},duration:eSpeedTime},{ability:spell,scale:1});const status=body.target.statuses.at(-1);if(status)status.memoKey=`karma:shieldSpeed:${ctx.self.side}`;sync(body);};
  const startTether=(ctx:HookContext,body:Body,empowered:boolean,scale:number,spell:AbilitySpec)=>{
   const id=ctx.world.nextId++,due=ctx.tick+ticks(tetherTime),end=empowered?renewalTail:normalTail;
   ctx.memory[`karma:tether:${id}`]=JSON.stringify({pet:body.pet?.id??-1,due,empowered,scale});
   applyEffect(ctx.world,ctx.self,body.target,{type:"state",state:"revealed",duration:tetherTime},{ability:spell,scale:1});const reveal=body.target.statuses.at(-1);if(reveal)reveal.memoKey=`karma:tetherReveal:${id}`;sync(body);
   ctx.world.missiles.push({id,owner:ctx.self.side,source:end.key,seenTick:ctx.tick,x:body.target.x,perTick:0,homing:false,direction:directionTo(ctx.self,body.target),travelLeft:Infinity,projectile:false,connects:false,scale,onHit:end.onHit??[],piercing:true,expiresTick:due+1,impactTick:due,...(body.pet?{perceptionHidden:true}:{})});
  };
  const clearReveal=(ctx:HookContext,id:number,body?:Body)=>{if(!body)return;body.target.statuses=body.target.statuses.filter(s=>s.memoKey!==`karma:tetherReveal:${id}`);sync(body);};
  const explode=(ctx:HookContext,m:Missile,body?:Body)=>{
   if(ctx.memory[`karma:exploded:${m.id}`])return;ctx.memory[`karma:exploded:${m.id}`]=true;
   const empowered=m.source==="RQ",spell=empowered?empoweredImpact:impact,scale=body?(body.pet?1:m.scale):1,fieldX=body?.target.x??m.x;
   for(const entry of [{target:ctx.world.units[ctx.self.side===0?1:0]},...ctx.world.pets.filter(pet=>pet.owner!==ctx.self.side&&pet.hp>0&&!pet.spec.hitPoints&&!pet.spec.untargetable).map(pet=>({target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}))]as Body[]){
    if(Math.abs(entry.target.x-m.x)>qRadius+entry.target.spec.base.radius+EPSILON)continue;
    if(entry.pet)abilityHitPet(ctx.world,ctx.self,entry.pet,spell,spell.onHit!,"area",1,m.x);else if(m.connects||body?.pet)abilityHit(ctx.world,ctx.self,entry.target,spell,spell.onHit!,scale,m.x);
   }
   if(empowered){
    ctx.world.zones.push({id:ctx.world.nextId++,owner:ctx.self.side,kind:"field",seenTick:ctx.tick,x:fieldX,radius:fieldRadius,startTick:ctx.tick,endTick:ctx.tick+ticks(fieldTime),interval:1,nextTick:ctx.tick,connects:true,ability:fieldAura.key,onHit:fieldAura.onHit,scale});
    ctx.world.zones.push({id:ctx.world.nextId++,owner:ctx.self.side,kind:"delayedArea",seenTick:ctx.tick,x:fieldX,radius:fieldRadius,startTick:ctx.tick,endTick:ctx.tick+ticks(fieldTime),ability:field.key,onHit:field.onHit,connects:true,scale});
   }
  };
  const behavior:Behavior=view=>{
   // Let standard trade bookkeeping run before deciding any optional spell.
   const normal=defaultBehavior({...view,self:{...view.self,spec:{...view.self.spec,abilities:[qSpec,wSpec]}}});
   const{self,enemy,world,mode}=view;if(mode==="idle")return normal;if(self.memory.tradeDone)return{kind:"move",direction:-1};
   const ready=(spell:AbilitySpec)=>canCast(world,self,spell),danger=view.threats.some(t=>t.eta<=ticks(eTime)&&t.damage>0),gap=Math.abs(self.x-enemy.x),hurt=(derive(self).maxHp-self.hp)/derive(self).maxHp,empowered=active(self,world),shielded=self.statuses.some(s=>s.kind==="shield"&&s.source===self.side&&["E","RE"].includes(s.key));
   if(danger&&!shielded&&ready(empowered?reSpec:eSpec))return{kind:"cast",ability:empowered?"RE":"E"};
   if(self.action)return normal;
   if(mode==="flee"){
    if(!shielded&&ready(empowered?reSpec:eSpec))return{kind:"cast",ability:empowered?"RE":"E"};
    if(gap<=wRange&&canTarget(enemy,self)&&ready(empowered?rwSpec:wSpec))return{kind:"cast",ability:empowered?"RW":"W"};
    return normal;
   }
   if(empowered){if(hurt>=.35&&gap<=wRange&&ready(rwSpec))return{kind:"cast",ability:"RW"};if(ready(rqSpec)&&gap<=qRange+fieldRadius)return{kind:"cast",ability:"RQ"};if(gap<=wRange&&ready(rwSpec))return{kind:"cast",ability:"RW"};}
   const reserves=mode==="hold"||mode==="trade";
   if(!reserves&&!empowered&&ready(rSpec)&&((hurt>=.35&&gap<=wRange&&canCast(world,self,wSpec))||(gap<=qRange+fieldRadius&&canCast(world,self,qSpec,true))))return{kind:"cast",ability:"R"};
   if(!empowered&&gap<=wRange&&ready(wSpec))return{kind:"cast",ability:"W"};
   if(!empowered&&gap<=qRange&&ready(qSpec))return{kind:"cast",ability:"Q"};
   if(canStartAttack(world,self))return{kind:"attack"};return normal;
  };
  kit.assume("Every basic ability is rank 5, while Soulflare/Defiance/Renewal bonus tables explicitly use Mantra rank 4. The four-rank empowered records are read at rank 4 despite their parsed five-rank parent classifications. Mantra starts ready but inactive, lasts eight seconds, is instant/free and is available during cast-inhibiting control. Separate basic/empowered variants share their underlying Q/W/E cooldowns. A successful completed empowered cast consumes its declaration-selected Mantra entitlement; already declared variants retain their selected effect if the eight-second window expires during the cast. Free target invalidation retains a still-live entitlement; disposition on free cancellation is not explicit in the primary and remains an assumption.");
  kit.assume("Inner Flame uses the primary 950 center flight range (the same field lists 890 edge range), 120 full width and 1700 speed; Soulflare uses 160 full width. Real first-body collision, including actual damageable pets, creates one 280-radius explosion at the missile's contact coordinate. The flight itself does not separately spend a spell shield or deal a duplicate packet. Regular Q fizzles at maximum range; empowered Q explodes there. Cast origin is the actual completion position and direction is fixed at declaration. The primary live values override client metadata: Q root castRange 25000/missileSpeed 902 are targeting metadata, while its actual missile object corroborates 950 flight; E and R primary instant casts override each client spellCastTime 0.25. Scalar line-hit probability gates the intended champion's impact/splash together; a real pet detonation uses actual axial area contacts. A Soulflare aimed beyond flight range can explode within its sourced radius. Lateral splash positioning and independent sidesteps cannot be reconstructed in 1D and are not invented.");
  kit.assume("Soulflare creates its 1.5 second 50% slowing field at the actual impacted body's center (or at maximum-range explosion coordinate), separately from initial explosion center. Occupancy is refreshed each simulation tick without inventing damage pulses; the one rupture is separately delayed, spatial and spell-shield-immune. Its location and per-cast scale remain branch-local; released missiles/fields persist after owner death. An expected-value champion-only impact carries that conditional scale to rupture, while an actual pet contact generates its real full field. Continuous lateral dodging of the field is outside the axial geometry.");
  kit.assume("Resolve initially damages and reveals the actual chosen enemy body, then watches its own two-second tether every tick. It breaks on distance beyond the primary 825 center tether radius, caster death/resurrection, target death/resurrection or disappearance; generic untargetability after attachment does not itself erase an existing tether, while stasis denies completion. An intact tether deals its live-AP second packet, roots for 2 seconds (3.25 with Renewal) and reveals only while its own root remains. Completion bypasses newly gained spell shields; new parry still negates it. Initial spell shields/parry deny attachment, but Renewal's completed-cast self heal is independent. Source does not specify AP snapshot or caster-death tether behavior; these remain explicit interpretations.");
  kit.assume("W can manually choose a real hostile damageable pet with its explicit pet variant; no minion wave or pet is fabricated. Completion revalidates the declared body: death/untargetability/vision loss is free, range-only cancellation pays the shared W cooldown and mana. Paid Renewal range cancellation still grants the primary-specified initial heal and consumes Mantra. Healing reads current missing HP at each event and uses 17% plus 0.01% per AP; an attached target's actual death grants the second heal once, without waiting for the tether timer or producing damage/root on a corpse. Runes are not simulated, so the quoted Aery/Conqueror/Electrocute bugs add no phantom damage or stacks.");
  kit.assume("Inspire/Defiance can shield self or an explicitly chosen real allied Champion-class pet; other classes and invented teammates receive nothing. Primary shield 280 + 60% AP is supplemented by 165 + 45% AP for empowered primary, while each actual eligible body within 700 of that primary receives only 165 + 45% AP and 15% speed. The primary keeps 40% speed, all shields last 2.5 seconds and speed lasts 2 seconds; a new own Inspire replaces its own earlier shield/speed rather than stacking duplicate stages. Instant ally declaration uses 800 range with the sourced 175 forgiveness at completion. Ordinary solo AI uses self shields only; missing ally benefits remain zero.");
  kit.assume("Gathering Fire reduces actual remaining R cooldown by four seconds once per accepted damaging ability hit against each real champion or explicit Champion-class clone, including each Q explosion/rupture and each W endpoint. Ordinary attacks, field-only slows, casts, nonchampion pets, misses, spell shields and parry give no refund. Damage-only invulnerability does not fabricate hit avoidance. The reference allocation prices full-contact Q, both W endpoints and self E shielding, with RQ as the sustained Mantra branch and a fixed-point passive-refund cadence; it prices no ally support or Renewal healing. Real fights require target contact, mana, tether survival and actual missing health. AI reserves new R casts in hold/trade, respects completed-trade retreat before optional spells, and chooses Renewal when wounded or Soulflare otherwise.");
  return{abilities,behavior,budget:{damage(self,target){const haste=1+derive(self).abilityHaste/100,qr=1/(qCD/haste+qCast),wr=1/(wCD/haste+wCast),rr=Math.min(qr, (1+refund*(qr+wr*2))/(rCD/haste));return{magic:qr*evaluate(qDamage,self,target)+wr*2*evaluate(wDamage,self,target)+rr*(evaluate(qBonus,self,target)+evaluate(rupture,self,target))};},healing(self){return evaluate(eShield,self)/(eCD/(1+derive(self).abilityHaste/100));}},hooks:{
   onCastStart(ctx){if(["W-pet","RW-pet"].includes(ctx.ability.key))ctx.memory["karma:wPet"]=choose(ctx,false,ctx.aim)?.id??-1;if(["E-ally","RE-ally"].includes(ctx.ability.key))ctx.memory["karma:ePet"]=choose(ctx,true,ctx.aim)?.id??-1;},
   onCast(ctx){const key=ctx.ability.key;if(key==="R"){ctx.memory[MANTRA]=ctx.tick+ticks(mantraTime);return;}
    if(["RQ","RW","RW-pet","RE","RE-ally"].includes(key))consume(ctx);
    if(key==="RW"||key==="RW-pet")healRenewal(ctx);
    if(key==="W-pet"||key==="RW-pet"){const pet=capturedHostile(ctx.self,ctx.world);if(pet)abilityHitPet(ctx.world,ctx.self,pet,ctx.ability,[hit(wDamage)],"singleTarget");}
    if(["E","RE","E-ally","RE-ally"].includes(key)){
     const empowered=key.startsWith("RE"),pet=key.endsWith("ally")?ctx.world.pets.find(pet=>pet.id===ctx.memory["karma:ePet"]):undefined;
     const primary:Body=pet?{target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}:{target:ctx.self};applyShield(ctx,primary,ctx.ability,empowered?plus(eShield,eBonus):eShield,eSpeed);
     if(empowered){const bodies:Body[]=[{target:ctx.self},...eligibleFriendly(ctx.world,ctx.self).map(pet=>({target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}))];for(const body of bodies){if((body.pet?.id??-1)===(primary.pet?.id??-1)||Math.abs(body.target.x-primary.target.x)>reRadius+EPSILON||inStasis(body.target)||isUntargetable(body.target,ctx.self))continue;applyShield(ctx,body,ctx.ability,eSecondary,reSpeed);}}
    }
   },
   onCastCancelled(ctx){if(ctx.paid&&ctx.reason==="range"&&["RW","RW-pet"].includes(ctx.ability.key)){consume(ctx);healRenewal(ctx);}},
   onAbilityContact(ctx){if(ctx.ability.key==="Q"||ctx.ability.key==="RQ")return[];},
   onMissileContact(ctx){if(ctx.missile.source==="Q"||ctx.missile.source==="RQ")explode(ctx,ctx.missile,ctx.targetPet?{target:petFormulaTarget(ctx.targetPet,ctx.self,ctx.tick),pet:ctx.targetPet}:{target:ctx.enemy});},
   onMissileEnd(ctx){if(ctx.missile.source==="RQ"&&ctx.reason==="range")explode(ctx,ctx.missile);},
   onAbilityHit(ctx){const key=ctx.ability.key,pet=ctx.enemy.petId===undefined?undefined:ctx.world.pets.find(pet=>pet.id===ctx.enemy.petId);
    if(["W","RW","W-pet","RW-pet"].includes(key))startTether(ctx,{target:ctx.enemy,...(pet?{pet}:{})},key.startsWith("RW"),ctx.scale,ctx.ability);
    if([impact.key,empoweredImpact.key,field.key,"W","RW","W-pet","RW-pet",normalTail.key,renewalTail.key].includes(key)&&(ctx.enemy.petId===undefined||ctx.enemy.spec.targetClass==="champion"))applyEffect(ctx.world,ctx.self,ctx.self,{type:"refund",ability:"R",seconds:refund*ctx.scale},{scale:1});
   },
   onDeathObserved(ctx){for(const m of ctx.world.missiles){if(m.owner!==ctx.self.side||![normalTail.key,renewalTail.key].includes(m.source)||m.ended)continue;const raw=ctx.memory[`karma:tether:${m.id}`];if(typeof raw!=="string")continue;const t=JSON.parse(raw)as{pet:number;due:number;empowered:boolean;scale:number};const match=ctx.targetPet?ctx.targetPet.id===t.pet:t.pet<0&&ctx.victim===ctx.enemy;if(match){m.ended=true;clearReveal(ctx,m.id,bodyOf(ctx,t.pet));if(t.empowered&&Math.abs(ctx.victim.x-ctx.self.x)<=tetherRange+EPSILON&&!ctx.self.resurrection)healRenewal(ctx);}}
   },
   onMissileTick(ctx){const m=ctx.missile;if(![normalTail.key,renewalTail.key].includes(m.source)||m.ended)return;const raw=ctx.memory[`karma:tether:${m.id}`];if(typeof raw!=="string"){m.ended=true;return;}const t=JSON.parse(raw)as{pet:number;due:number;empowered:boolean;scale:number};const body=bodyOf(ctx,t.pet);
    if(!ctx.self.alive||ctx.self.hp<=0||ctx.self.resurrection||!body||!body.target.alive||body.target.hp<=0||body.target.resurrection||Math.abs(body.target.x-ctx.self.x)>tetherRange+EPSILON){m.ended=true;clearReveal(ctx,m.id,body);return;}
    m.x=body.target.x;if(ctx.tick<t.due)return;m.ended=true;clearReveal(ctx,m.id,body);if(t.empowered)healRenewal(ctx);const spell=t.empowered?renewalTail:normalTail;if(body.pet)abilityHitPet(ctx.world,ctx.self,body.pet,spell,spell.onHit!,"singleTarget",t.scale,ctx.self.x);else abilityHit(ctx.world,ctx.self,body.target,spell,spell.onHit!,t.scale,ctx.self.x);
   },
   onTick(ctx){if(ctx.self.resurrection)ctx.memory[MANTRA]=0;},
  }};
 }
};
export default karma;
