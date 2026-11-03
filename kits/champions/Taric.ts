/** Taric: real Bravado entitlements, charge clocks and source-bound allied emitters. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const BRAVADO = "taric:bravado", UNTIL = `${BRAVADO}:until`, BOUND = "taric:bastion";
const EPSILON = 1e-6;
type Body={target:Unit;pet?:Pet};
const taric: KitModule = {
  champion: "Taric",
  build(kit) {
    const p=kit.ability("Bravado"),q=kit.ability("Starlight's Touch"),w=kit.ability("Bastion"),e=kit.ability("Dazzle"),r=kit.ability("Cosmic Radiance");
    p.quote("Bravado may only grant up to two empowered attacks");
    const count=2, window=p.quoted("next two basic attacks within 5 seconds"), totalAS=p.quoted("gain 100% total attack speed")/100;
    const procDamage={base:p.levelValue("empowers his next two basic attacks"),ratios:{bonusArmor:p.quoted("(+ 15% bonus armor)")/100}};
    p.quote("The first attack refreshes Bravado's duration");p.quote("Subsequent ability casts will refresh the duration and grant another empowered attack");
    p.quote("it cannot miss if Taric is blinded");p.quote("it does not apply on dodged or blocked Bravado attacks");
    p.quote("The bonus damage will not apply against structures");
    const refundOne=p.gameQuoted('"mNumber":1.0',0,"Characters/Taric/Spells/TaricPassiveAbility/TaricPassive");
    p.gameQuote('"mDataValue":"ArmorDamageValue"');p.gameQuote('"values":[5.0,5.0,5.0,5.0,5.0,5.0,5.0]');
    p.quote("1 + ( Haste / ( Haste + 100 ) )");const hasteConstant=p.quoted("Haste + 100");
    const qCap=q.number("Maximum Charges"),qRecharge=q.field("recharge"),qCD=q.cooldown(),qCast=q.castTime(),qRadius=q.field("effectRadius");
    const healWords="for 25 (+ 15% AP) (+ 1% of his maximum health) per charge";
    const qHeal={base:q.quoted(healWords),ratios:{AP:q.quoted(healWords,1)/100,maxHP:q.quoted(healWords,2)/100}};
    q.quote("Bravado empowered attacks each grant one charge");q.gameQuote('"name":"Recharge","values":[15.0,15.0,15.0,15.0,15.0,15.0,15.0]');
    q.gameQuote('"mAmmoUsed":[0,0,0,0,0,0,0]');
    const armor=w.baseOf("Bonus Armor")/100,shield=w.shareOf("Shield Strength"),wTime=w.quoted("shield for 2.5 seconds"),wRange=w.field("targetRange"),tetherRange=w.field("tetherRadius"),forgiveness=w.quoted("forgiveness radius of 175 units");
    const wCD=w.cooldown(),wCast=w.castTime();w.quote("Only one ally can be bound at a time");w.quote("the effects do not stack");w.quote("The mimicked abilities will still complete even if Taric dies or leaves range");
    w.gameQuote('"name":"LeashBreakActualRange","values":[1300.0,1300.0,1300.0,1300.0,1300.0,1300.0,1300.0]');
    w.gameQuote('"ForgivenessRange":175.0');
    e.field("width");
    const eDelay=e.quoted("winds up over 1 second"),eRange=e.field("range"),eDamage=e.formula("Magic Damage"),eStun=e.quoted("stuns them for 1.5 seconds"),eCD=e.cooldown();
    e.quote("Taric can move during Dazzle");e.quote("target direction on-cast");e.gameQuote('"name":"ChargeDuration","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]');e.gameQuote('"castRangeDisplayOverride":[610.0,610.0,610.0,610.0,610.0,610.0,610.0]');
    const rDelay=r.quoted("descends to him over 2.5 seconds"),rDuration=r.quoted("become invulnerable for 2.5 seconds"),rRadius=r.field("effectRadius");
    r.quote("Cosmic Radiance works on untargetable allies");r.gameQuote('"name":"InitialDelay","values":[2.5,2.5,2.5,2.5,2.5,2.5,2.5]');r.gameQuote('"name":"InvulnDuration","values":[2.5,2.5,2.5,2.5,2.5,2.5,2.5]');
    const eligible=(world:World,self:Unit)=>world.pets.filter(pet=>pet.owner===self.side&&pet.spec.targetClass==="champion"&&!pet.spec.hitPoints&&!pet.spec.fixedDamage&&canTargetPet(pet,self,world.tick));
    const friendly=(world:World,self:Unit)=>world.pets.filter(pet=>pet.owner===self.side&&pet.hp>0&&pet.spec.targetClass==="champion"&&!pet.spec.hitPoints&&!pet.spec.fixedDamage);
    const bound=(world:World,self:Unit,range=true)=>{const pet=friendly(world,self).find(pet=>pet.id===self.memory[BOUND]);return pet&&(!range||Math.abs(pet.x-self.x)<=tetherRange+EPSILON)?pet:undefined;};
    const sync=(pet:Pet,target:Unit)=>{pet.statuses=target.statuses;pet.hp=target.hp;};
    const allies=(ctx:HookContext):Body[]=>[{target:ctx.self},...friendly(ctx.world,ctx.self).map(pet=>({target:petFormulaTarget(pet,ctx.self,ctx.tick),pet}))];
    const applyAlly=(ctx:HookContext,target:Unit,effect:Effect,spell:AbilitySpec,pet?:Pet)=>{if(pet)pet.statuses=target.statuses;applyEffect(ctx.world,ctx.self,target,effect,{ability:spell,scale:1});if(pet)sync(pet,target);};
    const choose=(ctx:HookContext,aim?:Aim)=>{const candidates=eligible(ctx.world,ctx.self).filter(pet=>Math.abs(pet.x-ctx.self.x)<=wRange+EPSILON);if(aim?.distance!==undefined){const x=ctx.self.x+directionTo(ctx.self,ctx.enemy)*aim.direction*aim.distance;return candidates.sort((a,b)=>Math.abs(a.x-x)-Math.abs(b.x-x)||a.id-b.id)[0];}return bound(ctx.world,ctx.self)??candidates.sort((a,b)=>Math.abs(a.x-ctx.self.x)-Math.abs(b.x-ctx.self.x)||a.id-b.id)[0];};
    const setBravado=(ctx:HookContext,n:number)=>{ctx.memory[BRAVADO]=n;ctx.memory[UNTIL]=ctx.tick+ticks(window);ctx.self.statuses=ctx.self.statuses.filter(s=>s.memoKey!==`buff:${BRAVADO}`);if(n>0)ctx.buff(BRAVADO,"attackSpeedMultiplier",totalAS,window);};
    const active=(self:Unit,tick:number)=>tick<Number(self.memory[UNTIL]??0)&&Number(self.memory[BRAVADO]??0)>0;
    const grantCharge=(ctx:HookContext)=>{const stock=ctx.self.charges.Q??={count:qCap,nextTick:Number.POSITIVE_INFINITY};stock.count=Math.min(qCap,stock.count+1);if(stock.count>=qCap)stock.nextTick=Number.POSITIVE_INFINITY;};
    const proc:AbilitySpec={key:"I",name:p.name,slot:"other",activation:"internal",budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},flags:{spellShield:false,petContactHooks:true},onHit:[{type:"damage",damageType:"magic",amount:procDamage,noLifeSteal:true,petDamageCategory:"proc"}],usable:()=>false};
    const beamEffects:Effect[]=[{type:"damage",damageType:"magic",amount:eDamage},{type:"cc",cc:"stun",duration:eStun}];
    const beam:AbilitySpec={key:"E-beam",name:e.name,slot:"E",countsAsCast:false,activation:"internal",budgetExcluded:true,cooldown:0,castTime:0,delivery:{kind:"self"},flags:{spellShield:true,petContactHooks:true,projectile:false},onHit:beamEffects,usable:()=>false,persistsAfterDeath:true};
    const emit=(ctx:HookContext,spell:AbilitySpec,delay:number,ally?:Pet,aim?:Aim)=>{
      const emitter=ally?petFormulaTarget(ally,ctx.self,ctx.tick):ctx.self;
      const cursor=aim?.distance===undefined?ctx.enemy.x:ctx.self.x+directionTo(ctx.self,ctx.enemy)*aim.direction*aim.distance;
      const delta=cursor-emitter.x;
      const direction=(Math.abs(delta)<=EPSILON?directionTo(ctx.self,ctx.enemy)*(aim?.direction??1):Math.sign(delta))as 1|-1;
      const id=ctx.world.nextId++,due=ctx.tick+ticks(delay);
      ctx.memory[`taric:emitter:${id}`]=ally?.id??-1;ctx.memory[`taric:due:${id}`]=due;
      // These stationary carriers are kit clocks, not pet-targeted missiles.
      // Only one live E emitter announces the shared damage/control entitlement.
      ctx.world.missiles.push({id,owner:ctx.self.side,source:spell.key,seenTick:ctx.tick,x:emitter.x,perTick:0,homing:false,direction,travelLeft:Infinity,projectile:false,connects:false,scale:1,onHit:[],piercing:true,expiresTick:due+1});
    };
    const emitterOf=(ctx:HookContext,m:Missile):Unit|undefined=>{
      const id=Number(ctx.memory[`taric:emitter:${m.id}`]??-1);
      if(id<0)return ctx.self.alive&&ctx.self.hp>0&&!ctx.self.resurrection?ctx.self:undefined;
      const pet=friendly(ctx.world,ctx.self).find(pet=>pet.id===id);return pet?petFormulaTarget(pet,ctx.self,ctx.tick):undefined;
    };
    const refreshBeamTelegraphs=(ctx:HookContext)=>{
      const announced=new Set<number|string|boolean>();
      for(const m of ctx.world.missiles){
        if(m.owner!==ctx.self.side||m.source!==beam.key||m.ended)continue;
        delete m.impactTick;m.onHit=[];
        const emitter=emitterOf(ctx,m);if(!emitter)continue;m.x=emitter.x;
        const group=ctx.memory[`taric:beam:${m.id}`],progress=(ctx.enemy.x-emitter.x)*m.direction,radius=ctx.enemy.spec.base.radius;
        if(group===undefined||announced.has(group)||progress < -radius-EPSILON||progress>eRange+radius+EPSILON)continue;
        announced.add(group);m.impactTick=Number(ctx.memory[`taric:due:${m.id}`]);m.onHit=beamEffects;
      }
    };
    const abilities:AbilitySpec[]=[
      {key:"Q",name:q.name,slot:"Q",budgetExcluded:true,cooldown:qCD,cost:q.cost(),castTime:qCast,charges:{max:qCap,recharge:qRecharge},delivery:{kind:"self"},roles:["defense"]},
      {key:"W",name:w.name,slot:"W",budgetExcluded:true,cooldown:wCD,cost:w.cost(),castTime:wCast,delivery:{kind:"self"},roles:["defense","buff"]},
      {key:"E",name:e.name,slot:"E",budgetExcluded:true,cooldown:eCD,cost:e.cost(),castTime:e.castTime(),delivery:{kind:"self"},roles:["damage","cc"],estimate:(self,target)=>evaluate(eDamage,self,target),estimateDelay:()=>eDelay,usable:self=>!self.memory["taric:ePending"]},
      {key:"R",name:r.name,slot:"R",castThreat:false,persistsAfterDeath:true,budgetExcluded:true,cooldown:r.cooldown(),cost:r.cost(),castTime:r.castTime(),delivery:{kind:"self"},roles:["defense"],usable:self=>!self.memory["taric:rPending"]},proc,beam,
    ];
    const byKey=(key:string)=>abilities.find(a=>a.key===key)!;
    const policy:Behavior=view=>{
      const normal=defaultBehavior({...view,self:{...view.self,spec:{...view.self.spec,abilities:[]}}});
      const {self,enemy,world,mode}=view;if(mode==="idle")return normal;if(self.memory.tradeDone)return{kind:"move",direction:-1};
      const ready=(key:string)=>canCast(world,self,byKey(key));const missing=derive(self).maxHp-self.hp;
      if(self.action)return normal;
      if(mode==="fight"&&view.threats.length&&ready("R")&&!hasState(self,"invulnerable")&&self.hp/derive(self).maxHp<.65)return{kind:"cast",ability:"R"};
      if(ready("Q")&&missing>=evaluate(qHeal,self)*Math.max(1,self.charges.Q?.count??qCap)*.5)return{kind:"cast",ability:"Q"};
      if(ready("W")&&view.threats.length&&!self.statuses.some(s=>s.kind==="shield"&&s.key==="W"))return{kind:"cast",ability:"W"};
      if(ready("E")&&Math.abs(enemy.x-self.x)<=eRange+enemy.spec.base.radius)return{kind:"cast",ability:"E"};
      if(mode!=="flee"&&canStartAttack(world,self))return{kind:"attack"};
      if(mode==="fight"&&!active(self,world.tick)&&ready("W")&&Math.abs(enemy.x-self.x)<=eRange)return{kind:"cast",ability:"W"};
      return normal;
    };
    const cadence=(self:Unit)=>{const d=derive(self),haste=1+d.abilityHaste/100,refund=refundOne+d.abilityHaste/(d.abilityHaste+hasteConstant);let empowered=0,qRate=haste/qCD,wRate=haste/wCD,eRate=haste/eCD,rate=d.attackSpeed;for(let i=0;i<12;i++){const clock=1+refund*empowered;qRate=Math.min(clock*haste/qCD,(haste/qRecharge+empowered)/count);wRate=clock*haste/wCD;eRate=clock*haste/eCD;rate=Math.min(2.5,d.attackSpeed*(1+totalAS))/(1+qRate*qCast+wRate*wCast);empowered=Math.min(rate,count*(qRate+wRate+eRate));}return{qRate,wRate,eRate,rate,empowered};};
    kit.assume("Bravado starts empty, grants at most two real attack entitlements for five seconds after a completed cast, and refreshes on the first declaration or another completed cast. Each declared empowered attack retains its sourced doubled total AS timing and spends one entitlement; cancellation follows the common declaration-spent empowerment contract. The bonus on-attack packet and basic-cooldown refund ignore blindness while the ordinary blind basic misses. Dodge, attack block and parry deny the bonus/refund; ordinary invulnerability does not invent attack avoidance. Real pets use their own defenses. No structure is created.");
    kit.assume("Starlight's Touch starts with the normal full five-charge ammunition stock, consumes all charges captured at declaration for one heal at completion, and uses a separate hasted fifteen-second recharge plus three-second cast cooldown. Bravado adds one charge per accepted empowered attack, without changing a running recharge deadline; full stock pauses recharge. Self and actual Champion-class friendly pets can be healed once across overlapping source/tether circles; no allied champion is fabricated. Healing modifiers remain recipient-local.");
    kit.assume("Bastion grants a nonrecursive ten-percent total-armor increase through the shared armor-percent rule. A real living Champion-class pet can be explicitly selected within 800; completion allows the sourced 175 forgiveness. Self-cast shields self and the active bound ally or binds the nearest eligible ally if unbound. Each shield uses its recipient's own maximum HP. One remembered bind has effects only within 1300, and switching replaces the previous armor contribution. Other realm and the specifically named vanish forms lack independent arena metadata and are unsupported boundaries; generic untargetability is not silently equated with every named vanish.");
    kit.assume("Dazzle is an instantaneous declaration followed by a one-second delayed nonprojectile beam, permitting ordinary walking, attacks and other spells during the delay. The direction toward the on-cast cursor is fixed separately from each actual emitter, while the origin follows that body until release. The primary 575-range/140 full width and no cast time override binary 610 display/100 lineWidth/0.25-cast metadata. Targets on the lane axis intersect a forward 575 interval with each target's actual radius; no unsourced endpoint lollipop is added; two overlapping beams share one damage/control entitlement per cast. A released actual ally mimic completes after Taric dies or leaves tether range, provided that real emitter survives; the dead self emitter supplies no beam. Nearby-unit ghosting has no supplied radius, so only each emitter's own collision ghosting is represented. One live beam whose present axial interval covers the actual enemy announces the shared cast damage and stun with a finite impact clock; its origin follows the real emitter and can fall back to an ally emitter after self loss, without duplicating overlap damage in perception. Beneficial R carriers announce no hostile packet.");
    kit.assume("Cosmic Radiance starts its 2.5-second star delay after the real 0.25-second cast completes. The star follows each actual primary emitter, then grants 2.5 seconds of invulnerability to that living primary and nearby real allied champions, untargetable or not (26.21; the duel has no allies); overlapping stars do not stack. No future resurrection inherits a dead primary's star. An already emitted actual ally mimic can finish after owner death/range loss. R is reserved in hold/trade and used proactively against visible threats in fight; completed trades retreat before optional actions. Flee can heal, shield or aim E backward without spending R.");
    kit.assume("Reference allocation estimates a sustained self-only two-Bravado weave, solving capped attack/cast cadence with source refund and charge generation. Actual fights still require missing health, mana, real contacts and availability; no allied heal, shield, duplicated beam, ally stats or R damage is priced. Bastion's nominal self shield and Q healing are the only sustain packets in that estimate.");
    return{abilities,behavior:policy,attack:{onHitToPets:true},budget:{totalResistanceMultipliers:{armor:1+armor},damage(self,target){const c=cadence(self),d=derive(self);return{physical:Math.max(0,c.rate-d.attackSpeed)*d.ad*(1+d.critChance*(d.critDamage-1)),magic:c.empowered*evaluate(procDamage,self,target)+c.eRate*evaluate(eDamage,self,target)};},healing(self){const c=cadence(self),d=derive(self);return Math.min(qCap*c.qRate,(1+d.abilityHaste/100)/qRecharge+c.empowered)*evaluate(qHeal,self)+c.wRate*shield*d.maxHp;}},hooks:{
      onStart(ctx){ctx.self.charges.Q={count:qCap,nextTick:Infinity};ctx.buff("taric:ownArmor","armorPercent",armor,1e9);},
      onCastStart(ctx){if(ctx.ability.key==="Q"){ctx.memory["taric:qStock"]=ctx.self.charges.Q?.count??qCap;ctx.memory["taric:qAlly"]=bound(ctx.world,ctx.self)?.id??-1;}if(ctx.ability.key==="W")ctx.memory["taric:wTarget"]=choose(ctx,ctx.aim)?.id??-1;if(ctx.ability.key==="R")ctx.memory["taric:rAlly"]=bound(ctx.world,ctx.self)?.id??-1;},
      onCast(ctx){
        if(["Q","W","E","R"].includes(ctx.ability.key))setBravado(ctx,count);
        if(ctx.ability.key==="Q"){
          const stock=ctx.self.charges.Q!;stock.count=0;
          const amount=evaluate(qHeal,ctx.self)*Number(ctx.memory["taric:qStock"]??0),ally=friendly(ctx.world,ctx.self).find(pet=>pet.id===ctx.memory["taric:qAlly"]),centers=[ctx.self.x,...(ally?[ally.x]:[])];
          for(const body of allies(ctx))if(centers.some(x=>Math.abs(body.target.x-x)<=qRadius+EPSILON)){heal(ctx.world,body.target,amount);if(body.pet)sync(body.pet,body.target);}
        }
        if(ctx.ability.key==="W"){
          const selected=eligible(ctx.world,ctx.self).find(pet=>pet.id===ctx.memory["taric:wTarget"]),current=bound(ctx.world,ctx.self),ally=selected&&Math.abs(selected.x-ctx.self.x)<=wRange+forgiveness+EPSILON?selected:current;
          if(selected&&ally===selected)ctx.memory[BOUND]=ally.id;
          for(const body of ([{target:ctx.self},...(ally?[{target:petFormulaTarget(ally,ctx.self,ctx.tick),pet:ally}]:[])] as Body[])){
            body.target.statuses=body.target.statuses.filter(s=>!(s.kind==="shield"&&s.key==="W"&&s.source===ctx.self.side));
            applyAlly(ctx,body.target,{type:"shield",amount:{base:shield*derive(body.target).maxHp},duration:wTime},ctx.ability,body.pet);
          }
        }
        if(ctx.ability.key==="E"){
          ctx.memory["taric:ePending"]=true;const serial=ctx.world.nextId;ctx.memory["taric:eGroup"]=serial;emit(ctx,beam,eDelay,undefined,ctx.aim);const ally=bound(ctx.world,ctx.self);if(ally)emit(ctx,beam,eDelay,ally,ctx.aim);
          for(const m of ctx.world.missiles.filter(m=>m.id>=serial&&m.source===beam.key&&m.owner===ctx.self.side))ctx.memory[`taric:beam:${m.id}`]=serial;
          refreshBeamTelegraphs(ctx);
          applyEffect(ctx.world,ctx.self,ctx.self,{type:"state",state:"ghosted",duration:eDelay},{ability:ctx.ability,scale:1});if(ally){const target=petFormulaTarget(ally,ctx.self,ctx.tick);applyAlly(ctx,target,{type:"state",state:"ghosted",duration:eDelay},ctx.ability,ally);}
        }
        if(ctx.ability.key==="R"){
          ctx.memory["taric:rPending"]=true;emit(ctx,ctx.ability,rDelay);const ally=friendly(ctx.world,ctx.self).find(pet=>pet.id===ctx.memory["taric:rAlly"]);if(ally)emit(ctx,ctx.ability,rDelay,ally);
        }
      },
      onAttack(ctx){if(!active(ctx.self,ctx.tick))return;ctx.action.attackTag=BRAVADO;setBravado(ctx,Math.max(0,Number(ctx.memory[BRAVADO])-1));},
      onAttackLaunch(ctx){
        if(ctx.action.attackTag!==BRAVADO)return;
        const target=ctx.targetPet?petFormulaTarget(ctx.targetPet,ctx.self,ctx.tick):ctx.enemy;
        if(!target.alive||target.hp<=0||inStasis(target)||isUntargetable(target,ctx.self)||hasState(target,"dodgeAttacks")||hasState(target,"blockAttacks")||hasState(target,"parry"))return;
        if(ctx.targetPet){if(!ctx.targetPet.spec.hitPoints&&!ctx.targetPet.spec.fixedDamage&&!ctx.targetPet.spec.diesToChampionAttack)abilityHitPet(ctx.world,ctx.self,ctx.targetPet,proc,proc.onHit!,"proc");}else abilityHit(ctx.world,ctx.self,target,proc,proc.onHit!);
        const d=derive(ctx.self),seconds=refundOne+d.abilityHaste/(d.abilityHaste+hasteConstant);
        for(const key of["Q","W","E"])applyEffect(ctx.world,ctx.self,ctx.self,{type:"refund",ability:key,seconds},{scale:1});grantCharge(ctx);
      },
      onMissileTick(ctx){
        const m=ctx.missile;if(![beam.key,"R"].includes(m.source))return;
        if(m.source===beam.key)refreshBeamTelegraphs(ctx);
        const emitter=emitterOf(ctx,m);
        if(!emitter){m.ended=true;ctx.memory[m.source===beam.key?"taric:ePending":"taric:rPending"]=false;return;}
        if(ctx.tick<Number(ctx.memory[`taric:due:${m.id}`]??Infinity))return;m.ended=true;
        const emitterId=Number(ctx.memory[`taric:emitter:${m.id}`]??-1);
        const pet=emitterId<0?undefined:ctx.world.pets.find(p=>p.id===emitterId&&p.owner===ctx.self.side&&p.hp>0&&p.spec.targetClass==="champion");
        if(m.source===beam.key)ctx.memory["taric:ePending"]=false;else ctx.memory["taric:rPending"]=false;
        if(!emitter||!emitter.alive||emitter.hp<=0||emitter.resurrection)return;m.x=emitter.x;
        if(m.source===beam.key){
          const serial=ctx.memory[`taric:beam:${m.id}`],bodies:Body[]=[{target:ctx.enemy},...ctx.world.pets.filter(p=>p.owner!==ctx.self.side&&p.hp>0&&!p.spec.untargetable).map(p=>({target:petFormulaTarget(p,ctx.self,ctx.tick),pet:p}))];
          for(const body of bodies){const progress=(body.target.x-emitter.x)*m.direction,reach=body.target.spec.base.radius,key=`taric:beamHit:${serial}:${body.pet?.id??"champion"}`;
            if(progress < -reach-EPSILON||progress>eRange+reach+EPSILON||ctx.memory[key])continue;ctx.memory[key]=true;
            if(body.pet)abilityHitPet(ctx.world,ctx.self,body.pet,beam,beamEffects,"area",1,emitter.x);else abilityHit(ctx.world,ctx.self,body.target,beam,beamEffects,1,emitter.x);
          }
        }else{
          for(const body of ([{target:ctx.self},...ctx.world.pets.filter(p=>p.owner===ctx.self.side&&p.hp>0&&p.spec.targetClass==="champion").map(p=>({target:petFormulaTarget(p,ctx.self,ctx.tick),pet:p}))] as Body[])){
            const primary=body.pet?.id===pet?.id&&(!!body.pet===!!pet);if(!body.target.alive||body.target.hp<=0||body.target.resurrection||(!primary&&(inStasis(body.target)||isUntargetable(body.target,ctx.self)))||Math.abs(body.target.x-emitter.x)>rRadius+EPSILON)continue;
            body.target.statuses=body.target.statuses.filter(s=>!(s.kind==="state"&&s.key==="invulnerable"&&s.ability==="R"&&s.source===ctx.self.side));
            applyAlly(ctx,body.target,{type:"state",state:"invulnerable",duration:rDuration},byKey("R"),body.pet);
          }
        }
      },
      onTick(ctx){
        refreshBeamTelegraphs(ctx);
        if(!ctx.self.alive||ctx.self.resurrection){setBravado(ctx,0);ctx.memory["taric:ePending"]=false;ctx.memory["taric:rPending"]=false;for(const pet of ctx.world.pets.filter(p=>p.owner===ctx.self.side))pet.statuses=(pet.statuses??[]).filter(s=>s.memoKey!==`taric:armor:${ctx.self.side}`);return;}
        ctx.buff("taric:ownArmor","armorPercent",armor,1e9);
        if(!active(ctx.self,ctx.tick)&&Number(ctx.memory[BRAVADO]??0)>0)setBravado(ctx,0);
        const ally=bound(ctx.world,ctx.self),amount=(derive(ctx.self).armor.base+derive(ctx.self).armor.bonus)*armor;
        for(const pet of ctx.world.pets.filter(p=>p.owner===ctx.self.side)){
          const key=`taric:armor:${ctx.self.side}`;pet.statuses=(pet.statuses??[]).filter(s=>s.memoKey!==key);
          if(pet!==ally)continue;const target=petFormulaTarget(pet,ctx.self,ctx.tick);applyEffect(ctx.world,ctx.self,target,{type:"stat",stat:"armor",amount:{base:amount},duration:1},{ability:byKey("W"),scale:1});const status=target.statuses.at(-1);if(status)status.memoKey=key;pet.statuses=target.statuses;
        }
      },
    }};
  },
};
export default taric;
