/** Zoe: real finite stars, bubbles, sleep entitlements and a returning portal. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, EPSILON, resolveSkillshot, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, canSee, directionTo, inStasis, isUntargetable, notifyActualMovement } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { dashDistance } from "../../engine/sim/terrain";
import { scaled, seriesAt, ticks } from "./util";

const P = "zoe:sparkles", Q = "zoe:star", E = "zoe:bubble", R = "zoe:portal", W = "zoe:shard";
const zoe: KitModule = {
  champion: "Zoe",
  options: { spellShard: { label: "Explicit collected spell shard (0 none; 1 Flash, held for at most 60 seconds)", default: 0 } },
  build(kit, options) {
    if (![0, 1].includes(options.spellShard!)) throw new Error("Zoe spellShard must be 0 (none) or 1 (one collected Flash)");
    const p=kit.ability("I"),q=kit.ability("Q"),w=kit.ability("W"),e=kit.ability("E"),r=kit.ability("R");
    const pSeconds=p.quoted("within 5 seconds"), pDamage:Formula={base:p.levelValue("After casting an ability"),ratios:{AP:p.quoted("(+ 20% AP)")/100}};
    p.quote("The empowered attack will trigger but not be consumed against wards");
    const qBase=q.formulaPart("Minimum Magic Damage",["AP"]);qBase.base+=q.quoted("(+ 50 / 80 / 110 / 140 / 170)",4);
    const qRange=q.field("range","Initial missile"),qReach=q.field("range","Redirected missile range"),qRadius=q.field("effectRadius"),qWidth=q.field("width","Initial width"),qWidth2=q.field("width","after redirection"),qSpeed=q.field("speed","Initial missile"),qSpeed2=q.field("speed","after redirection"),qLinger=q.quoted("lingers at maximum range for 1 second"),qRecast=q.quoted("after 0.25 seconds"),qScale=q.seriesIn("total damage is increased");
    const qCap=Number(q.quote("146,6%").replace(",",".").replace("%",""))/100;
    q.quote("resetting its damage modifier on cast");q.quote("can be used while affected by cast-inhibiting crowd control");
    const eDamage=e.formula("Magic Damage"),eCap=e.formula("Bonus Damage Cap"),eRange=e.fieldNumbers("range")[0]!,eBounce=e.fieldNumbers("range")[1]!,eRadius=e.field("effectRadius"),eWidth=e.field("width","Initial missile"),eLollipop=e.field("width","Lollipop")/2,eSpeed=e.field("speed"),eBounceSeconds=e.quoted("over 1 second"),eTrapSeconds=e.quoted("trap for 5 seconds"),eDrowsy=e.quoted("drowsy for 1.4 seconds"),eSleep=e.quoted("asleep for 2.25 seconds"),eSlow=e.fraction("Maximum Slow"),eShred=e.quoted("30% magic resistance reduction")/100,eTail=e.quoted("within 1 second of the sleep ending"),eRefund=e.fraction("Cooldown Refund");
    e.quote("Spell shield will not prevent falling asleep nor block the wake-up damage");e.quote("damage and drowsy application will be blocked");e.quote("before any triggering damage");e.quote("can interact with player-generated terrain");
    const wSpeed=w.fraction("Bonus Movement Speed"),wSeconds=w.number("Bonus Movement Speed Duration"),wBolts=w.quoted("conjures 3 orbiting bolts");
    const wLife=w.quoted("next 10 seconds"),wHeld=w.quoted("up to 60 seconds"),wRange=w.field("effectRadius","Bolt lock-on"),wDamage=w.formula("Magic Damage Per Bolt"),wMissile=w.gameQuoted("mSpell.missileSpeed: 1400.0");
    const flashRange=w.quoted('400 ([[Quick cast]])');
    w.quote("nearest non-sleeping enemy");w.quote("prioritizing her attack target");w.quote("can collect a Spell Shard by moving directly onto it");
    const rRange=r.field("range"),rDelay=r.quoted("After a 0.15-second delay"),rStay=r.quoted("0.95 seconds to 1.25 seconds"),rInitialLock=r.quoted("~0.55-0.75 seconds",0),rReturnLock=r.quoted("~0.3-0.5 seconds",0),rReturnShift=r.quoted("shifted by 25 units"),rCD=r.cooldown();
    const qCD=q.cooldown(),qCast=q.castTime("First cast"),eCD=e.cooldown(),rCast=r.castTime();
    r.quote("maximum range location, or end position, is determined at the start");r.quote("always cause Zoe to blink back to her casting position");r.quote("resets Zoe's basic attack timer");
    const hidden=(key:string,name:string,effects:Effect[],shield=true):AbilitySpec=>({key,name,slot:"other",activation:"internal",cooldown:0,castTime:0,delivery:{kind:"self"},onHit:effects,flags:{spellShield:shield,petContactHooks:true},usable:()=>false,budgetExcluded:true,persistsAfterDeath:true,roles:[]});
    const star=hidden("Qstar",q.name,[{type:"damage",damageType:"magic",amount:qBase}]),star2=hidden("Qstar2",`${q.name} (redirected)`,star.onHit!);
    const bubble={...hidden("Ebubble",e.name,[{type:"damage",damageType:"magic",amount:eDamage}]),decisive:true};
    const sleep=hidden("Esleep",`${e.name} (sleep)`,[],false),wake=hidden("Ewake",`${e.name} (wake-up)`,[],false);
    const bolt=hidden("Wbolt",`${w.name} (bolt)`,[{type:"damage",damageType:"magic",amount:wDamage}]);
    const passive=hidden("Sparkles",p.name,[{type:"damage",damageType:"magic",amount:pDamage}],false);
    const pendingStar=(self:Unit,world:HookContext["world"])=>world.missiles.find(m=>m.owner===self.side&&m.source==="Qstar"&&!m.ended);
    const portalActive=(self:Unit)=>self.memory[`${R}:return`]!==undefined;
    const portalLocked=(self:Unit)=>self.action?.kind==="cast"&&["R","Rlock"].includes(self.action.ability);
    const abilities:AbilitySpec[]=[
      {key:"Q",name:q.name,slot:"Q",cooldown:q.cooldown(),cooldownAtCastStart:true,cost:q.cost(),castTime:q.castTime("First cast"),castDirection:"start",delivery:{kind:"self"},usable:(self,world)=>!world.missiles.some(m=>m.owner===self.side&&["Qstar","Qstar2"].includes(m.source)&&!m.ended),estimate:(self,target)=>evaluate(qBase,self,target)*(1+qCap),roles:["damage"]},
      {key:"Q2",name:`${q.name} (redirect)`,slot:"Q",cooldown:0,cost:0,castTime:0,delivery:{kind:"self"},activation:"internal",overlay:true,preserveAttackWindup:true,flags:{usableWhileDisabled:true},usable:(self,world)=>!portalLocked(self)&&!!pendingStar(self,world)&&world.tick>=Number(self.memory[`${Q}:recast`]??Infinity),budgetExcluded:true,roles:[]},
      {key:"W",name:`${w.name} (collected Flash)`,slot:"W",cooldown:w.cooldown(),staticCooldown:true,cost:0,castTime:0,delivery:{kind:"blink",direction:"toward",distance:flashRange,minDistance:0},usable:(self,world)=>self.memory[W]===1&&world.tick<Number(self.memory[`${W}:until`]??0),budgetExcluded:true,roles:["escape","engage","buff"]},
      {key:"E",name:e.name,slot:"E",cooldown:e.cooldown(),cooldownAtCastStart:true,cost:e.cost(),castTime:e.castTime(),delivery:{kind:"self"},estimate:(self,target)=>evaluate(eDamage,self,target),roles:["damage","cc"]},
      {key:"R",name:r.name,slot:"R",cooldown:rCD,cooldownAfter:"state",cost:r.cost(),castTime:r.castTime(),delivery:{kind:"self"},flags:{grounded:true},usable:self=>!portalActive(self),roles:["engage"]},
      star,star2,bubble,sleep,wake,bolt,passive,hidden("Rlock",`${r.name} (lockout)`,[]),
    ];
    const get=(key:string)=>abilities.find(a=>a.key===key)!;
    const realTarget=(ctx:HookContext,target:Unit,pet?:Pet)=>pet?pet.hp>0&&!pet.spec.hitPoints&&!pet.spec.untargetable:target.alive&&target.hp>0;
    const sync=(target:Unit,pet?:Pet)=>{if(pet){pet.statuses=target.statuses;pet.memory=target.memory;}};
    const hit=(ctx:HookContext,target:Unit,pet:Pet|undefined,ability:AbilitySpec,effects:Effect[],scale=1)=>{if(pet)abilityHitPet(ctx.world,ctx.self,pet,ability,effects,"area",scale);else abilityHit(ctx.world,ctx.self,target,ability,effects,scale);};
    const recipients=(ctx:HookContext)=>[{target:ctx.world.units[ctx.self.side===0?1:0],pet:undefined as Pet|undefined},...ctx.world.pets.filter(body=>body.owner!==ctx.self.side).map(pet=>({target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}))];
    const starEffects=(distance:number):Effect[]=>[{type:"damage",damageType:"magic",amount:scaled(qBase,1+Math.min(qCap,seriesAt(qScale,distance,true)/100))}];
    const setSparkles=(ctx:HookContext)=>{ctx.memory[`${P}:serial`]=Number(ctx.memory[`${P}:serial`]??0)+1;ctx.memory[P]=ctx.tick+ticks(pSeconds);};
    const blink=(ctx:HookContext,to:number,ability:string)=>{const from=ctx.self.x,attached=ctx.self.attached&&ctx.tick<ctx.self.attached.endTick&&ctx.enemy.alive;if(!attached)ctx.self.x=to;notifyActualMovement(ctx.world,ctx.self,from,{kind:"blink",startTick:ctx.tick,endTick:ctx.tick,ended:true,ability});};
    const clearPortal=(ctx:HookContext)=>{
      delete ctx.memory[`${R}:return`];delete ctx.memory[`${R}:blink`];
      ctx.self.statuses=ctx.self.statuses.filter(s=>s.memoKey!==R&&s.memoKey!==`${R}:speed`&&s.memoKey!==`${R}:walk`);
      delete ctx.self.cooldownHeld.R;delete ctx.self.pendingRefunds.R;
      ctx.self.cooldownReady.R=ctx.tick+ticks(cooldownAfterHaste(rCD,derive(ctx.self).abilityHaste));
    };
    const startSleep=(ctx:HookContext,target:Unit,pet?:Pet)=>{
      const key=`${E}:${ctx.self.side}`,mark=target.statuses.find(s=>s.key===key&&s.kind==="mark");
      if(!mark||ctx.tick<mark.value||target.memory[`${key}:sleepStarted`])return;
      // The retained status bridges expiry into this paired transition only;
      // its gameplay drowsy phase ends at the captured deadline, right now.
      target.statuses=target.statuses.filter(s=>!(s.kind==="cc"&&s.key==="drowsy"&&s.ability===bubble.key&&s.source===ctx.self.side));
      // A cleanse before the natural drowsy boundary cancels the pending sleep.
      if(!target.memory[`${key}:valid`]){target.statuses=target.statuses.filter(s=>s!==mark);sync(target,pet);return;}
      target.memory[`${key}:sleepStarted`]=true;
      if(applyCC(ctx.world,ctx.self,target,"sleep",eSleep,0,false,sleep.key)){
        const status=target.statuses.findLast(s=>s.kind==="cc"&&s.key==="sleep"&&s.source===ctx.self.side&&s.ability===sleep.key)!;
        mark.endTick=status.endTick+ticks(eTail);target.memory[`${key}:sleepEnd`]=status.endTick;
        target.statuses.push({kind:"stat",key:"mrReductionPercent",source:ctx.self.side,startTick:ctx.tick,endTick:status.endTick,value:eShred,ability:sleep.key,whileCC:"sleep",memoKey:`${key}:shred`});
        target.statuses.push({kind:"state",key:"standardSight",source:ctx.self.side,startTick:ctx.tick,endTick:status.endTick,value:0,ability:sleep.key,revealWhileCC:"sleep",memoKey:`${key}:sight`});
      }else target.statuses=target.statuses.filter(s=>s!==mark);
      sync(target,pet);
    };
    const upkeepBubble=(ctx:HookContext)=>{
      for(const {target,pet}of recipients(ctx)){
        const key=`${E}:${ctx.self.side}`,mark=target.statuses.find(s=>s.kind==="mark"&&s.key===key);
        if(!mark)continue;
        if(!target.memory[`${key}:sleepStarted`]){
          const drowsy=target.statuses.find(s=>s.kind==="cc"&&s.key==="drowsy"&&s.ability===bubble.key&&s.source===ctx.self.side);
          // Scheduled cleanses run before upkeep, including this exact boundary.
          if(ctx.tick<=mark.value&&!drowsy)target.memory[`${key}:valid`]=false;
          if(drowsy)drowsy.value=eSlow*Math.min(1,(ctx.tick-drowsy.startTick)/Math.max(1,ticks(eDrowsy)));
          startSleep(ctx,target,pet);
        }else{
          const sleeping=target.statuses.some(s=>s.kind==="cc"&&s.key==="sleep"&&s.ability===sleep.key&&s.source===ctx.self.side&&s.endTick>ctx.tick);
          if(!sleeping&&!target.memory[`${key}:tailStarted`]){target.memory[`${key}:tailStarted`]=true;mark.endTick=Math.min(mark.endTick,ctx.tick+ticks(eTail));}
        }
        sync(target,pet);
      }
      // Generic ground traps target the opposing champion. Resolve a real pet
      // that enters this bubble first without inventing an owner contact.
      for(const zone of [...ctx.world.zones]){
        if(zone.owner!==ctx.self.side||zone.ability!==bubble.key||zone.kind!=="trap"||ctx.tick<zone.startTick||ctx.tick>=zone.endTick)continue;
        const actual=recipients(ctx).filter(({target,pet})=>realTarget(ctx,target,pet)&&!inStasis(target)&&!isUntargetable(target,ctx.self)&&Math.abs(target.x-zone.x)<=zone.radius+target.spec.base.radius+EPSILON).sort((a,b)=>Math.abs(a.target.x-zone.x)-Math.abs(b.target.x-zone.x));
        const first=actual[0];if(!first?.pet)continue;
        ctx.world.zones=ctx.world.zones.filter(candidate=>candidate!==zone);hit(ctx,first.target,first.pet,bubble,bubble.onHit!);
      }
    };
    const makeBubble=(ctx:HookContext)=>{
      const endpoint=Number(ctx.memory[`${E}:end`]),direction=(endpoint>=ctx.self.x?1:-1)as 1|-1;
      let range=Math.abs(endpoint-ctx.self.x),crossed=false;
      for(const wall of [...ctx.world.terrain].filter(t=>t.endTick>ctx.tick).sort((a,b)=>direction*(a.from-b.from))){
        const near=direction>0?wall.from:wall.to,far=direction>0?wall.to:wall.from,front=(near-ctx.self.x)*direction;
        if(front<0||front>range+EPSILON)continue;
        if(crossed){range=Math.max(0,front);break;}range+=Math.abs(far-near);crossed=true;
      }
      const decision=resolveSkillshot(ctx.world,ctx.self,ctx.enemy,bubble,Number(ctx.memory[`${E}:seen`]),Math.max(0,Math.abs(ctx.enemy.x-ctx.self.x)-ctx.enemy.spec.base.radius)/eSpeed,eWidth/2);
      const missile:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:bubble.key,seenTick:Number(ctx.memory[`${E}:seen`]),x:ctx.self.x,perTick:eSpeed/30,direction,homing:false,travelLeft:range,projectile:true,collisionPet:true,radius:eWidth/2,connects:decision.connects,scale:decision.scale,onHit:bubble.onHit!};
      ctx.memory[`${E}:phase:${missile.id}`]=0;ctx.world.missiles.push(missile);
      if(decision.split!==undefined)ctx.queueSplit({missile:missile.id,chance:decision.split});
    };
    const launchBolts=(ctx:HookContext)=>{
      if(ctx.tick>=Number(ctx.memory[`${W}:boltsUntil`]??0)||Number(ctx.memory[`${W}:bolts`]??0)<=0)return;
      if(inStasis(ctx.self)||[...ccTypes(ctx.self)].some(cc=>CC_RULES[cc].attacking==="disabled"&&CC_RULES[cc].abilities==="disabled"))return;
      if(ctx.world.missiles.some(m=>m.owner===ctx.self.side&&m.source===bolt.key&&!m.ended))return;
      const candidates=recipients(ctx).filter(({target,pet})=>realTarget(ctx,target,pet)&&!inStasis(target)&&!isUntargetable(target,ctx.self)&&canSee(target,ctx.self)&&!target.statuses.some(s=>s.kind==="cc"&&s.key==="sleep")&&Math.abs(target.x-ctx.self.x)<=wRange+target.spec.base.radius+EPSILON);
      const attackPet=ctx.self.action?.kind==="windup"?ctx.self.action.pet:undefined;
      candidates.sort((a,b)=>{const priority=(x:typeof a)=>(attackPet!==undefined?x.pet?.id===attackPet:!x.pet&&ctx.self.action?.kind==="windup")?0:1;return priority(a)-priority(b)||Math.abs(a.target.x-ctx.self.x)-Math.abs(b.target.x-ctx.self.x);});
      const victim=candidates[0];if(!victim)return;
      ctx.memory[`${W}:bolts`]=Number(ctx.memory[`${W}:bolts`])-1;
      const sparked=ctx.tick<Number(ctx.memory[P]??0),effects=[...bolt.onHit!,...(sparked?passive.onHit!:[])];if(sparked)ctx.memory[P]=0;
      const missile:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:bolt.key,seenTick:ctx.tick,x:ctx.self.x,perTick:wMissile/30,direction:directionTo(ctx.self,victim.target),homing:true,travelLeft:Infinity,projectile:!sparked,connects:true,scale:1,onHit:effects,...(victim.pet?{pet:victim.pet.id}:{})};
      ctx.world.missiles.push(missile);
    };
    const behavior:Behavior=view=>{
      const ordinary=defaultBehavior(view);if(view.mode==="idle")return ordinary;
      const self=view.self,active=pendingStar(self,view.world);
      if(active&&canCast(view.world,self,get("Q2"))){
        const holding=Number(self.memory[`${Q}:phase:${active.id}`])===1;
        if(holding){if(view.distance>qReach&&view.distance<=qReach+rRange&&!portalActive(self)&&canCast(view.world,self,get("R")))return{kind:"cast",ability:"R"};
          if(!portalActive(self)||self.memory[`${R}:blink`]===undefined)return{kind:"cast",ability:"Q2"};}
      }
      if(!self.action&&!self.memory.tradeDone&&["fight","kite","trade","hold"].includes(view.mode)){
        if(view.distance<=eRange+eLollipop&&canCast(view.world,self,get("E")))return{kind:"cast",ability:"E"};
        if(view.distance<=qReach+rRange&&canCast(view.world,self,get("Q")))return{kind:"cast",ability:"Q",aim:{direction:-1}};
      }
      if(ordinary?.kind==="cast"&&["Q","E","R"].includes(ordinary.ability))return{kind:"move",direction:view.mode==="flee"?-1:1};
      return ordinary;
    };
    kit.assume("More Sparkles! uses its explicit level20 continuation150+20%AP, starts unearned, and expires five seconds after the latest completed ability activation, including bothQcasts. An empowered basic retains ordinary AD/critical/basic defenses and adds one nonprojectile magicproc. It is spent at actual attack launch, with a newer activation retained independently; wards do not consume it. A SpellThief bolt can consume the same entitlement once.");
    kit.assume("PaddleStar uses real initial/redirected missiles, first-bodycollision, captured directions,1200/2500speed,100/140width and180explosionradius(the primary labels180estimated). The first star can be redirected after0.25seconds and lingers one second at its800endpoint. Redirect resets the travel accumulator, and its outbound limit follows Zoe's actual position at800, so PortalJump can extend a committed flight. Damage interpolates the exact published breakpoints and caps at the separately documented146.6%increase bug. The primary 'resetting its damage modifier' is interpreted as measuring the redirectedleg from its own launch point; aggregate initialleg distance is excluded. The one-axis policy casts backward, waits for its realendpoint, then redirects; it uses Portal only when needed to extend reach. Ordinary sidestep chance is captured perleg and shared by collateral champion explosion, while actual pets retain spatial contacts.");
    kit.assume("SleepyTroubleBubble has a declaration-fixed endpoint and completion-origin flight. It gains the projected length of its first crossedterrain and stops at a second wall; the exceptionallyclose-to-wall undetectedcrossing bug and unsourced terrain-depth cap are not invented. At initialendpoint the sourced100radius lollipop checks real bodies, followed by50units over one second and a five-second250radius trap. The shortbounce uses zero extra collisionradius because the primary only says verysmallornegative; this remains unresolved. Damage,drowsy,sleep and wake are independent guarded phases. Drowsy gradually reaches30%; slowimmunity suppresses only its slow. Cleanse cancels pendingdrowsy/sleep. Accepted sleep has30%MRreduction only while sleeping and an independent one-second post-sleep wake entitlement. The first qualifying nonpersistent champion/large-monster/turret packet consumes the entitlement before its own damage, dealing capped postmitigationtrue damage attributed toZoe; ordinary pet/miniondamage does not trigger it. Spellshields only block bubble/drowsy. Existing shared sleep10damage wake semantics still govern unrelatedsleep. Actual enemychampion bubble contact refunds30%remainingEcooldown.");
    kit.assume("SpellThief starts empty bydefault. spellShard=1 explicitly supplies one alreadycollected Flash, usable once before its60second heldexpiry; it is not free randomfarm. Only Flash is supported: other summoner/item actives, minionballoons and enemy summoner/item drop events are excluded because this duel has no such casts/inventory. Flash obeys grounded/root/cast restrictions and real terrain-aware destination. Its activation creates exactlythree finite55+10%AP bolts for10seconds and70%movement for3seconds. Nearest actual nonsleeping targets are selected, preferring a declared basicattack target; completeCC delays firing. The exact interlaunch interval is absent from primary/binary, so only one bolt is in flight at a time and the next is eligible after its predecessor resolves. Normalbolt missile uses pinned1400speed. MoreSparkles makes its entitledbolt nonprojectile; followingbolts remain projectiles. Orbitingbolts expire without fabricateddamage, while releasedbolts survive death.");
    kit.assume("PortalJump captures its575maximumdestination and returnorigin atdeclaration, blinks after0.25cast+0.15delay, resets attack, then returns25units towardits originalcastdirection. Published dwell/lockouts are inconsistent ranges; this deterministic model uses their explicit lowerbounds0.95destination,0.55initiallock and0.3returnlock. It holds movement speed atstaticzero betweenblinks without granting immunity, untargetability or CC; forced movement may relocate Zoe but cannot rewrite her returnpoint. Neither Qredirect nor another activation bypasses the explicit Portal action locks. An actual active attachment prevents relocation while still reporting the sourced blink event at the retained position. Existing terrain endpointclipping applies; dynamictarget positioning is never substituted for capturedpoints. Posteffectcooldown starts uponactualreturn or death. These timingbounds are assumptions, not claimed precise serverclocks.");
    kit.assume("The statbudget prices one redirectedstar at its actual nominal backward800then forward800reference, one bubble and one prospective cappedwake per cooldown, and Sparkles at the lower of attackcadence and actualQ/E/Rcastcadence. It excludes conditionalSpellThief damage/mobility and imaginary enemyallies,farm,shards or repeatedfreecasts. It does not value the exact stochastic returnclock or full 2D angles.");
    return{abilities,behavior,attack:{onHitToPets:true},budget:{damage(self,target){const haste=1+derive(self).abilityHaste/100,qCycle=qCD/haste+qCast+qRange/qSpeed,erate=haste/eCD,prate=Math.min(derive(self).attackSpeed,2/qCycle+erate+1/(rCD/haste+rStay));return{magic:evaluate(qBase,self,target)*(1+Math.min(qCap,seriesAt(qScale,qReach+qRange,true)/100))/qCycle+evaluate(eDamage,self,target)*erate+evaluate(pDamage,self,target)*prate,true:evaluate(eCap,self,target)*erate};}},hooks:{
      beforeDamageEventsAfterDeath:true,
      onStart(ctx){ctx.memory[W]=options.spellShard!;ctx.memory[`${W}:until`]=ticks(wHeld);ctx.memory[P]=0;},
      onCastStart(ctx){
        if(ctx.ability.key==="Q")ctx.memory[`${Q}:seen`]=ctx.tick;
        if(ctx.ability.key==="E"){ctx.memory[`${E}:seen`]=ctx.tick;ctx.memory[`${E}:end`]=ctx.self.x+directionTo(ctx.self,ctx.enemy)*(ctx.aim?.direction??1)*eRange;}
        if(ctx.ability.key==="R"){const direction=directionTo(ctx.self,ctx.enemy)*(ctx.aim?.direction??1),requested=Math.min(rRange,Math.max(0,ctx.aim?.distance??rRange));ctx.memory[`${R}:origin`]=ctx.self.x+direction*rReturnShift;ctx.memory[`${R}:target`]=ctx.self.x+dashDistance(ctx.world,ctx.self,direction*requested);ctx.memory[`${R}:direction`]=direction;ctx.memory[`${R}:declared`]=ctx.tick;}
      },
      onCast(ctx){
        if(["Q","Q2","W","E","R"].includes(ctx.ability.key))setSparkles(ctx);
        if(ctx.ability.key==="Q"){
          const direction=(Number(ctx.memory["castDirection:Q"]??directionTo(ctx.self,ctx.enemy))*(ctx.aim?.direction??1))as 1|-1,chance=skillshotChance(ctx.world,ctx.enemy,Number(ctx.memory[`${Q}:seen`]),Math.max(0,Math.abs(ctx.enemy.x-ctx.self.x)-ctx.enemy.spec.base.radius)/qSpeed,qWidth/2);
          const missile:Missile={id:ctx.world.nextId++,owner:ctx.self.side,source:star.key,seenTick:Number(ctx.memory[`${Q}:seen`]),x:ctx.self.x,perTick:qSpeed/30,direction,homing:false,travelLeft:qRange,projectile:true,collisionPet:true,radius:qWidth/2,connects:chance>.02,scale:chance>=.98?1:chance,onHit:starEffects(0)};
          ctx.memory[`${Q}:distance:${missile.id}`]=0;ctx.memory[`${Q}:phase:${missile.id}`]=0;ctx.memory[`${Q}:recast`]=ctx.tick+ticks(qRecast);ctx.world.missiles.push(missile);
        }
        if(ctx.ability.key==="Q2"){
          const missile=pendingStar(ctx.self,ctx.world);if(missile){const direction=(ctx.aim?directionTo(ctx.self,ctx.enemy)*ctx.aim.direction:directionTo({x:missile.x}as Unit,ctx.enemy))as 1|-1,chance=skillshotChance(ctx.world,ctx.enemy,ctx.tick,Math.max(0,(ctx.enemy.x-missile.x)*direction-ctx.enemy.spec.base.radius)/qSpeed2,qWidth2/2);missile.source=star2.key;missile.direction=direction;missile.perTick=qSpeed2/30;missile.radius=qWidth2/2;missile.travelLeft=Math.max(0,(ctx.self.x+direction*qReach-missile.x)*direction);missile.seenTick=ctx.tick;missile.connects=chance>.02;missile.scale=chance>=.98?1:chance;delete missile.expiresTick;ctx.memory[`${Q}:distance:${missile.id}`]=0;ctx.memory[`${Q}:phase:${missile.id}`]=2;missile.onHit=starEffects(0);}
        }
        if(ctx.ability.key==="E")makeBubble(ctx);
        if(ctx.ability.key==="W"){ctx.memory[W]=0;ctx.memory[`${W}:bolts`]=wBolts;ctx.memory[`${W}:boltsUntil`]=ctx.tick+ticks(wLife);ctx.buff(`${W}:speed`,"moveSpeedPercent",wSpeed,wSeconds);}
        if(ctx.ability.key==="R"){
          const at=Math.max(ctx.tick,Number(ctx.memory[`${R}:declared`])+ticks(rCast+rDelay)),until=at+ticks(rStay);ctx.memory[`${R}:blink`]=at;ctx.memory[`${R}:return`]=until;ctx.self.attackReadyTick=ctx.tick;
          ctx.self.statuses.push({kind:"state",key:"lingering",ability:"R",memoKey:R,source:ctx.self.side,startTick:ctx.tick,endTick:until+1,value:0});
          const lock=Number(ctx.memory[`${R}:declared`])+ticks(rInitialLock);if(lock>ctx.tick)ctx.self.action={kind:"cast",ability:"Rlock",startTick:ctx.tick,endTick:lock};
        }
      },
      onAttack(ctx){if(ctx.tick>=Number(ctx.memory[P]??0))return;ctx.action.missileSpeed=0;ctx.action.attackTag=`${P}:${ctx.memory[`${P}:serial`]}`;ctx.action.onHit.push({type:"damage",damageType:"magic",amount:pDamage,noLifeSteal:true,petDamageCategory:"proc"});},
      onAttackLaunch(ctx){if(!ctx.action.attackTag?.startsWith(P))return;const ward=ctx.targetPet?.spec.kind==="ward";if(!ward&&ctx.action.attackTag===`${P}:${ctx.memory[`${P}:serial`]}`)ctx.memory[P]=0;},
      onAbilityHit(ctx){if(ctx.ability.key!==bubble.key)return;
        const pet=ctx.enemy.petId===undefined?undefined:ctx.world.pets.find(body=>body.id===ctx.enemy.petId),target=ctx.enemy;if(!realTarget(ctx,target,pet))return;
        if(!pet||pet.spec.targetClass==="champion")applyEffect(ctx.world,ctx.self,ctx.self,{type:"refund",ability:"E",fraction:eRefund},{scale:1});
        if(!applyCC(ctx.world,ctx.self,target,"drowsy",eDrowsy,0,false,bubble.key,true)){sync(target,pet);return;}
        // Slow immunity must spare the scheduled sleep while suppressing the
        // ramp synchronously, including immunity gained or lost in this packet.
        // Bypass only the declaration guard; ordinary derived slow rules apply.
        const drowsy=target.statuses.findLast(s=>s.kind==="cc"&&s.key==="drowsy"&&s.source===ctx.self.side&&s.ability===bubble.key);
        if(!drowsy){sync(target,pet);return;}
        delete drowsy.bypassSlowImmune;
        // Expiry precedes scheduled effects and upkeep. Preserve the accepted
        // status into that transfer phase, so cleanses can remove it, without
        // extending gameplay: startSleep removes it at this original deadline.
        const sleepAt=drowsy.endTick;drowsy.endTick=sleepAt+1;
        const key=`${E}:${ctx.self.side}`;target.statuses=target.statuses.filter(s=>!(s.kind==="mark"&&s.key===key));target.statuses.push({kind:"mark",key,source:ctx.self.side,startTick:ctx.tick,endTick:sleepAt+ticks(eSleep)+ticks(eTail),value:sleepAt});target.memory[`${key}:valid`]=true;target.memory[`${key}:sleepStarted`]=false;target.memory[`${key}:tailStarted`]=false;target.memory[`${key}:cap`]=evaluate(eCap,ctx.self,target);sync(target,pet);
      },
      onBeforeDamageObserved(ctx){
        if(ctx.target.side===ctx.self.side||ctx.source.side!==ctx.self.side||ctx.persistent||ctx.ability===wake.key||ctx.ability===wake.name||ctx.amount<=0||hasState(ctx.target,"parry"))return;
        const key=`${E}:${ctx.self.side}`,mark=ctx.target.statuses.find(s=>s.kind==="mark"&&s.key===key&&s.endTick>ctx.tick);if(!mark||!ctx.target.memory[`${key}:sleepStarted`])return;
        const qualifying=ctx.source.spec.targetClass==="champion"||ctx.source.petId===undefined&&ctx.source.spec.targetClass===undefined||ctx.source.spec.targetClass==="monster"&&ctx.source.spec.sizeClass==="large"||ctx.source.spec.structureClass==="turret";if(!qualifying)return;
        const amount=Math.min(ctx.amount,Number(ctx.target.memory[`${key}:cap`]??0));
        ctx.target.statuses=ctx.target.statuses.filter(s=>!(s.kind==="mark"&&s.key===key)&&!(s.source===ctx.self.side&&s.ability===sleep.key&&(s.key==="sleep"||s.memoKey===`${key}:shred`||s.memoKey===`${key}:sight`)));sync(ctx.target,ctx.targetPet);
        hit(ctx,ctx.target,ctx.targetPet,wake,[{type:"damage",damageType:"true",amount:{base:amount}}]);
      },
      onTick(ctx){
        upkeepBubble(ctx);launchBolts(ctx);
        if(ctx.tick>=Number(ctx.memory[`${W}:until`]??Infinity))ctx.memory[W]=0;
        const at=ctx.memory[`${R}:blink`];if(at!==undefined&&ctx.tick>=Number(at)){
          delete ctx.memory[`${R}:blink`];blink(ctx,Number(ctx.memory[`${R}:target`]),"R");const until=Number(ctx.memory[`${R}:return`]);
          ctx.self.statuses.push({kind:"state",key:"moveSpeedOverride",source:ctx.self.side,startTick:ctx.tick,endTick:until,value:0,memoKey:`${R}:speed`},{kind:"state",key:"noMovement",source:ctx.self.side,startTick:ctx.tick,endTick:until,value:0,memoKey:`${R}:walk`});
        }
        if(ctx.memory[`${R}:return`]!==undefined&&ctx.tick>=Number(ctx.memory[`${R}:return`])){blink(ctx,Number(ctx.memory[`${R}:origin`]),"R");clearPortal(ctx);if(!inStasis(ctx.self))ctx.self.action={kind:"cast",ability:"Rlock",startTick:ctx.tick,endTick:ctx.tick+ticks(rReturnLock)};}
      },
      onTickWhileDead(ctx){upkeepBubble(ctx);},
      onLethal(ctx){if(portalActive(ctx.self))clearPortal(ctx);return false;},
      onMissileTick(ctx){const m=ctx.missile;if(m.source===star2.key)m.travelLeft=Math.max(0,(ctx.self.x+m.direction*qReach-m.x)*m.direction);},
      onMissileMove(ctx){const m=ctx.missile;if([star.key,star2.key].includes(m.source)){
          const distance=Number(ctx.memory[`${Q}:distance:${m.id}`]??0)+Math.abs(ctx.to-ctx.from);ctx.memory[`${Q}:distance:${m.id}`]=distance;m.onHit=starEffects(distance);
          if(m.source===star.key&&m.travelLeft<=EPSILON){ctx.memory[`${Q}:phase:${m.id}`]=1;m.perTick=0;m.travelLeft=Infinity;m.expiresTick=ctx.tick+ticks(qLinger);}
        }
        if(m.source===bubble.key&&m.travelLeft<=EPSILON){const phase=Number(ctx.memory[`${E}:phase:${m.id}`]);if(phase===0){ctx.memory[`${E}:phase:${m.id}`]=1;
            const bodies=recipients(ctx).filter(({target,pet})=>realTarget(ctx,target,pet)&&(!!pet||m.connects)&&!inStasis(target)&&!isUntargetable(target,ctx.self)&&Math.abs(target.x-m.x)<=eLollipop+target.spec.base.radius+EPSILON).sort((a,b)=>Math.abs(a.target.x-m.x)-Math.abs(b.target.x-m.x));const first=bodies[0];if(first){hit(ctx,first.target,first.pet,bubble,bubble.onHit!,first.pet?1:m.scale);m.ended=true;return;}
            m.travelLeft=eBounce;m.perTick=eBounce/eBounceSeconds/30;m.radius=0;
          }else if(phase===1){ctx.memory[`${E}:phase:${m.id}`]=2;ctx.world.zones.push({id:ctx.world.nextId++,owner:ctx.self.side,kind:"trap",seenTick:ctx.tick,x:m.x,radius:eRadius,startTick:ctx.tick,endTick:ctx.tick+ticks(eTrapSeconds),ability:bubble.key,onHit:bubble.onHit,connects:true,scale:1});}}
      },
      onMissileContact(ctx){const m=ctx.missile;if(![star.key,star2.key].includes(m.source)||m.intercepted)return;
        const bodies=recipients(ctx).filter(({target,pet})=>realTarget(ctx,target,pet)&&(!!pet||m.connects)&&(!ctx.targetPet?!!pet:!pet||pet.id!==ctx.targetPet.id)&&!inStasis(target)&&!isUntargetable(target,ctx.self)&&Math.abs(target.x-m.x)<=qRadius+target.spec.base.radius+EPSILON);
        for(const {target,pet}of bodies)hit(ctx,target,pet,get(m.source),m.onHit,pet?1:m.scale);
      },
    }};
  },
};
export default zoe;
