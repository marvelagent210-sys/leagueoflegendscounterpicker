import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { petAttackActor } from "../../engine/sim/petCombat";
import { advancePets, spawnPet } from "../../engine/sim/pets";
import { createWorld, fork, step } from "../../engine/sim/simulate";
import type { PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Zoe from "../../kits/champions/Zoe";
import { championData, records } from "./helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const compile=(options:Record<string,number>={})=>compileKit(championData("Zoe"),records("Zoe"),Zoe,options);
const compiled=compile();
function arena(distance=400,options:Record<string,number>={},ap=100){const c=compile(options);const w=createWorld({fighters:[{...c.spec,base:{...c.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap}},fighter({base:{hp:50000,armor:0,mr:0,hpRegen:0,moveSpeed:0}})],distance:0,modes:["idle","idle"],settings:{maxSeconds:120,maxBranches:1,log:true}});w.units[0].x=0;w.units[1].x=distance;return w;}
const spell=(w:World,key:string)=>w.units[0].spec.abilities.find(a=>a.key===key)!;
const cast=(w:World,key:string,aim?:{direction:1|-1;distance?:number})=>startCast(w,w.units[0],spell(w,key),aim);
const packet=(w:World,key:string)=>abilityHit(w,w.units[0],w.units[1],spell(w,key),spell(w,key).onHit??[]);
function through(w:World,tick:number){while(w.tick<=tick&&!w.result)step(w,[standStill,standStill]);}
function state(w:World,key:StateType,self=false){applyEffect(w,w.units[self?1:0],w.units[self?0:1],{type:"state",state:key,duration:30},{scale:1});}
function body(w:World,x:number,extra:Partial<PetSpec>={},owner:0|1=1){return spawnPet(w,w.units[owner],{kind:"actual-minion",name:"Actual minion",targetClass:"minion",hp:5000,armor:0,mr:0,radius:35,moveSpeed:0,duration:120,...extra},x);}
const marked=(w:World)=>w.units[1].statuses.find(s=>s.kind==="mark"&&s.key==="zoe:bubble:0");
function sleeping(w:World){packet(w,"Ebubble");through(w,42);expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(true);}

describe("Zoe exact sources and explicit shard setup",()=>{
 it("retains five complete pinned ability revisions and eight exact game objects",()=>{expect(records("Zoe").every(r=>r.notes.some(n=>n.includes("Ability data")))).toBe(true);expect(records("Zoe").reduce((n,r)=>n+(r.gameSources?.length??0),0)).toBe(8);expect(compiled.evidence.some(r=>r.page==="Module:SpellData/data"&&r.revid===4089805)).toBe(true);});
 it("uses rank5/3 costs, cooldowns and explicit empty history",()=>{const w=arena();expect(["Q","W","E","R"].map(k=>spell(w,k).cost)).toEqual([60,0,80,40]);expect(["Q","W","E","R"].map(k=>spell(w,k).cooldown)).toEqual([6.5,.25,14,5]);expect(w.units[0].memory["zoe:shard"]).toBe(0);expect(w.units[0].memory["zoe:sparkles"]).toBe(0);expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);});
 it.each([-1,.5,2,Infinity,NaN])("rejects unsupported shard setup%s",spellShard=>{expect(()=>compile({spellShard})).toThrow();});
 it("prices finite spell cycles and excludes conditional shard resources",()=>{const a=arena(),b=arena(400,{spellShard:1});expect(a.units[0].spec.budget!.damage!(...a.units)).toEqual(b.units[0].spec.budget!.damage!(...b.units));expect(a.units[0].spec.budget!.damage!(...a.units).true).toBeCloseTo(275/14,12);});
});

describe("More Sparkles actual empowered basics",()=>{
 it("starts unearned and gains level20 damage150+20%AP only on a real activation",()=>{const w=arena();cast(w,"E");through(w,8);expect(w.units[0].memory["zoe:sparkles"]).toBe(158);const before=w.units[1].hp;startAttack(w,w.units[0]);launchAttack(w,w.units[0]);expect(w.units[1].hp).toBeCloseTo(before-derive(w.units[0]).ad-170,10);expect(w.units[0].memory["zoe:sparkles"]).toBe(0);expect(w.missiles.filter(m=>m.source==="attack")).toHaveLength(0);});
 it("expires exactly five seconds after activation",()=>{const w=arena();cast(w,"E");through(w,158);startAttack(w,w.units[0]);expect(w.units[0].action?.kind).toBe("windup");if(w.units[0].action?.kind==="windup")expect(w.units[0].action.attackTag).toBeUndefined();});
 it("does not consume an empowerment merely because a windup begins",()=>{const w=arena();cast(w,"E");through(w,8);startAttack(w,w.units[0]);expect(w.units[0].memory["zoe:sparkles"]).toBe(158);applyCC(w,w.units[1],w.units[0],"stun",1);expect(w.units[0].memory["zoe:sparkles"]).toBe(158);});
 it("retains a newer activation after an older empowered attack launches",()=>{const w=arena();cast(w,"E");through(w,8);startAttack(w,w.units[0]);const action=w.units[0].action;if(action?.kind!=="windup")throw Error("missing attack");w.units[0].spec.hooks!.onCast!({...hookContext(w,w.units[0],spell(w,"Q2")),ability:spell(w,"Q2")});launchAttack(w,w.units[0],action);expect(Number(w.units[0].memory["zoe:sparkles"])).toBeGreaterThan(w.tick);});
 it.each(["dodgeAttacks","blockAttacks"] as const)("retains normal%s defenses for an empowered attack",guard=>{const w=arena();cast(w,"E");through(w,8);state(w,guard);const before=w.units[1].hp;startAttack(w,w.units[0]);launchAttack(w,w.units[0]);expect(w.units[1].hp).toBe(before);});
 it("does not consume the empowered attack against an actual ward",()=>{const w=arena(1000),ward=body(w,300,{kind:"ward",name:"Actual ward"});cast(w,"E");through(w,8);startAttack(w,w.units[0],ward);launchAttack(w,w.units[0]);expect(Number(w.units[0].memory["zoe:sparkles"])).toBeGreaterThan(w.tick);});
});

describe("Paddle Star actual flight and redirection",()=>{
 it("launches from completion position with the declared mana and cooldown",()=>{const w=arena();const mana=w.units[0].resource;cast(w,"Q");w.units[0].x=100;through(w,8);expect(w.missiles[0]).toMatchObject({source:"Qstar",x:100,perTick:40,travelLeft:800});expect(w.units[0].resource).toBe(mana-60);expect(w.units[0].cooldownReady.Q).toBe(195);});
 it("has one real initial missile and cannot create a second one while it remains",()=>{const w=arena();cast(w,"Q",{direction:-1});through(w,8);expect(canCast(w,w.units[0],spell(w,"Q"))).toBe(false);expect(w.missiles.filter(m=>m.source==="Qstar")).toHaveLength(1);});
 it("enforces the quarter-second redirect delay then permits a cast under silence",()=>{const w=arena();cast(w,"Q",{direction:-1});through(w,8);expect(canCast(w,w.units[0],spell(w,"Q2"))).toBe(false);through(w,16);applyCC(w,w.units[1],w.units[0],"silence",1);expect(canCast(w,w.units[0],spell(w,"Q2"))).toBe(true);cast(w,"Q2");expect(w.missiles[0]).toMatchObject({source:"Qstar2",perTick:2500/30,radius:70});});
 it("reaches its actual backward endpoint and lingers for exactly one second",()=>{const w=arena();cast(w,"Q",{direction:-1});through(w,28);expect(w.missiles[0]).toMatchObject({x:-800,perTick:0,expiresTick:58});through(w,57);expect(w.missiles).toHaveLength(1);through(w,58);expect(w.missiles).toHaveLength(0);});
 it("measures the redirected leg and interpolates its published distance breakpoints",()=>{const w=arena();cast(w,"Q",{direction:-1});through(w,28);cast(w,"Q2");through(w,50);const distance=1065,scale=1+.25+(distance-950)/400*.25;expect(w.units[1].totals.damageTaken).toBeCloseTo(288*scale,10);});
 it("updates the redirected outbound limit when Zoe really moves",()=>{const w=arena(1800);cast(w,"Q",{direction:-1});through(w,28);cast(w,"Q2");w.units[0].x=500;through(w,29);expect(w.missiles[0]?.travelLeft).toBeCloseTo(2100-2500/30,9);});
 it("retains projectile blocking and creates no hit or splash through a wall",()=>{const w=arena();w.zones.push({id:9000,owner:1,kind:"projectileWall",seenTick:0,x:200,radius:0,startTick:0,endTick:500});cast(w,"Q");through(w,30);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.missiles).toHaveLength(0);});
 it("explodes at first actual body contact, hitting only nearby real recipients once",()=>{const w=arena(),near=body(w,470),far=body(w,700);cast(w,"Q");through(w,30);expect(w.units[1].totals.damageTaken).toBe(288);expect(near.hp).toBe(5000-288);expect(far.hp).toBe(5000);});
 it("a real minion intercepts a star and keeps its owner's health untouched outside splash",()=>{const w=arena(1000),minion=body(w,250);cast(w,"Q");through(w,30);expect(minion.hp).toBe(5000-288);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("keeps redirected flight independent across branches",()=>{const w=arena(1600);cast(w,"Q",{direction:-1});through(w,28);cast(w,"Q2");const clone=cloneWorld(w);clone.units[0].x=1000;through(w,60);through(clone,60);expect(w.units[1].totals.damageTaken).toBe(0);expect(clone.units[1].totals.damageTaken).toBeGreaterThan(0);});
});

describe("Bubble declaration, bounce and real trap contacts",()=>{
 it("fixes the maximum endpoint at declaration but flies from completion position",()=>{const w=arena(1500);cast(w,"E");w.units[0].x=100;through(w,8);expect(w.missiles[0]).toMatchObject({x:100,travelLeft:700,perTick:1850/30,radius:50});});
 it("extends the first wall by its actual projected thickness and stops at a second wall",()=>{const w=arena(2000);w.terrain.push({id:9000,owner:1,from:200,to:400,endTick:1000},{id:9001,owner:1,from:950,to:1050,endTick:1000});cast(w,"E");through(w,8);expect(w.missiles[0]?.travelLeft).toBe(950);});
 it("retains a real one-second50unit bounce then a five-second trap",()=>{const w=arena(2000);cast(w,"E");through(w,23);expect(w.missiles[0]).toMatchObject({perTick:50/30,radius:0});through(w,54);expect(w.missiles).toHaveLength(0);expect(w.zones.find(z=>z.kind==="trap")?.x).toBeCloseTo(850,10);expect(w.zones.find(z=>z.kind==="trap")?.radius).toBe(250);});
 it("the initialendpoint lollipop can catch a real body outside the narrow missile",()=>{const w=arena(960);cast(w,"E");through(w,24);expect(w.units[1].totals.damageTaken).toBe(275);expect(marked(w)).toBeDefined();});
 it("a trap is consumed by the actual pet entering it without fabricated champion damage",()=>{const w=arena(2000);cast(w,"E");through(w,54);const minion=body(w,850);through(w,55);expect(minion.hp).toBe(4725);expect(minion.statuses?.some(s=>s.key==="drowsy")).toBe(true);expect(w.zones).toHaveLength(0);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("does not refund on an ordinary minion contact but refunds a real champion",()=>{const a=arena(),b=arena(1000),minion=body(b,200);a.units[0].cooldownReady.E=420;b.units[0].cooldownReady.E=420;packet(a,"Ebubble");abilityHitPet(b,b.units[0],minion,spell(b,"Ebubble"),spell(b,"Ebubble").onHit!);expect(a.units[0].cooldownReady.E).toBe(294);expect(b.units[0].cooldownReady.E).toBe(420);});
 it.each(["spellShield","parry"]as const)("%s blocks bubble damage and pending drowsy/sleep",guard=>{const w=arena();state(w,guard);packet(w,"Ebubble");through(w,42);expect(w.units[1].totals.damageTaken).toBe(0);expect(marked(w)).toBeUndefined();expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(false);});
 it("uses normal production branching for uncertain decisive bubble contacts",()=>{const w=arena(700);w.units[1].spec.base.moveSpeed=350;w.settings.maxBranches=16;cast(w,"E");let splits:ReturnType<typeof step>=[];while(w.tick<=8){const next=step(w,[standStill,standStill]);splits.push(...next);}expect(splits).toHaveLength(1);expect(splits[0]!.chance).toBeGreaterThan(0);expect(splits[0]!.chance).toBeLessThan(1);const worlds=fork(w,splits);expect(worlds).toHaveLength(2);expect(worlds.reduce((n,b)=>n+b.weight,0)).toBeCloseTo(1,12);expect(worlds.map(b=>b.missiles[0]?.connects).sort()).toEqual([false,true]);});
});

describe("Actual drowsy, sleep and pre-trigger wake entitlement",()=>{
 it("uses42drowsyticks then68sleepticks, with gradual slow and active-only MRreduction",()=>{const w=arena();w.units[1].spec.base.mr=100;packet(w,"Ebubble");through(w,21);expect(w.units[1].statuses.find(s=>s.key==="drowsy")?.value).toBeCloseTo(.15,12);through(w,42);const sleep=w.units[1].statuses.find(s=>s.key==="sleep")!;expect(sleep.startTick).toBe(42);expect(sleep.endTick-sleep.startTick).toBe(68);expect(w.units[1].statuses.some(s=>s.key==="drowsy")).toBe(false);expect(derive(w.units[1]).mrReduction.percent).toContain(.3);through(w,110);expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(false);expect(derive(w.units[1]).mrReduction.percent).not.toContain(.3);expect(marked(w)?.endTick).toBe(140);});
 it("slow immunity suppresses drowsy's slow while preserving the scheduled sleep",()=>{const w=arena();w.units[1].spec.base.moveSpeed=350;state(w,"slowImmune");packet(w,"Ebubble");through(w,21);expect(w.units[1].statuses.find(s=>s.key==="drowsy")?.value).toBeCloseTo(.15,12);expect(derive(w.units[1]).rawMoveSpeed).toBe(350);through(w,42);expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(true);});
 it("a real drowsy cleanse cancels pending sleep and future bonus entitlement",()=>{const w=arena();packet(w,"Ebubble");through(w,20);applyEffect(w,w.units[1],w.units[1],{type:"cleanse"},{scale:1});through(w,42);expect(marked(w)).toBeUndefined();expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(false);});
 it("tenacity shortens sleep while retaining its independent one-second wake tail",()=>{const w=arena();state(w,"tenacity");w.units[1].statuses.find(s=>s.key==="tenacity")!.value=.5;sleeping(w);const sleep=w.units[1].statuses.find(s=>s.key==="sleep")!;expect(sleep.endTick).toBe(76);expect(marked(w)?.endTick).toBe(106);});
 it("a new spellshield after bubble contact does not prevent the scheduled sleep or wake bonus",()=>{const w=arena();packet(w,"Ebubble");state(w,"spellShield");through(w,42);const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],100,"magic");expect(before-w.units[1].hp).toBe(200);expect(w.units[1].statuses.some(s=>s.key==="spellShield")).toBe(true);});
 it("resolves capped post-mitigation true damage before its triggering packet",()=>{const w=arena();w.units[1].spec.base.mr=100;sleeping(w);const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],170,"magic",{ability:"trigger"});expect(before-w.units[1].hp).toBeCloseTo(200,12);const labels=w.log.filter(l=>l.text.includes("deals")&&l.tick===w.tick).map(l=>l.text);expect(labels[0]).toContain("wake-up");expect(labels[1]).toContain("trigger");expect(marked(w)).toBeUndefined();});
 it("caps the wake packet at275rather than duplicating a larger triggering hit",()=>{const w=arena();sleeping(w);const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],1000,"true");expect(before-w.units[1].hp).toBe(1275);});
 it("consumes entitlement before recursion and attributes a lethal bonus to Zoe",()=>{const w=arena();sleeping(w);w.units[1].hp=50;let kills=0;const previous=w.units[0].spec.hooks!.onKill;w.units[0].spec.hooks!.onKill=c=>{kills++;previous?.(c);};dealDamage(w,w.units[0],w.units[1],100,"true",{ability:"trigger"});expect(kills).toBe(1);expect(marked(w)).toBeUndefined();expect(w.log.some(l=>l.text.includes("trigger deals"))).toBe(false);expect(w.log.filter(l=>l.text.includes("wake-up")&&l.text.includes("deals"))).toHaveLength(1);});
 it("does not consume the bonus on persistent damage or hostile selfdamage",()=>{const w=arena();sleeping(w);dealDamage(w,w.units[0],w.units[1],100,"magic",{persistent:true});expect(marked(w)).toBeDefined();dealDamage(w,w.units[1],w.units[1],100,"true");expect(marked(w)).toBeDefined();});
 it("ordinary allied minion damage wakes sleep without consuming its source-qualified entitlement",()=>{const w=arena();sleeping(w);const minion=body(w,100,{},0),actor=petAttackActor(minion,w.units[0],w.tick);dealDamage(w,actor,w.units[1],100,"true");expect(marked(w)).toBeDefined();expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(false);through(w,w.tick);expect(marked(w)?.endTick).toBe(w.tick-1+30);});
 it("an explicit allied large monster qualifies while an ordinary monster does not",()=>{for(const sizeClass of [undefined,"large"]as const){const w=arena();sleeping(w);const monster=body(w,100,{targetClass:"monster",sizeClass},0),actor=petAttackActor(monster,w.units[0],w.tick);dealDamage(w,actor,w.units[1],100,"true");expect(marked(w)===undefined).toBe(sizeClass==="large");}});
 it("retains a one-second tail after early sleep removal and expires at its actual boundary",()=>{const w=arena();sleeping(w);applyEffect(w,w.units[1],w.units[1],{type:"cleanse"},{scale:1});through(w,43);expect(marked(w)?.endTick).toBe(73);through(w,73);const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],100,"true");expect(before-w.units[1].hp).toBe(100);});
 it("does not consume a tail entitlement on an actually parried direct packet",()=>{const w=arena();sleeping(w);applyEffect(w,w.units[1],w.units[1],{type:"cleanse"},{scale:1});through(w,43);state(w,"parry");const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],100,"true");expect(w.units[1].hp).toBe(before);expect(marked(w)).toBeDefined();});
 it("allows a committed wake proc after Zoe dies without extending the run for the mark alone",()=>{const w=arena();sleeping(w);w.units[0].alive=false;w.units[0].hp=0;const before=w.units[1].hp;dealDamage(w,w.units[0],w.units[1],100,"true",{ability:"committed"});expect(before-w.units[1].hp).toBe(200);expect(marked(w)).toBeUndefined();});
 it("applies sleep and wake to an actual pet without borrowing its owner's state",()=>{const w=arena(2000),minion=body(w,400);abilityHitPet(w,w.units[0],minion,spell(w,"Ebubble"),spell(w,"Ebubble").onHit!);through(w,42);expect(minion.statuses?.some(s=>s.key==="sleep")).toBe(true);const before=minion.hp;const target={...w.units[1]}; // The real body is addressed through abilityHitPet.
   expect(target.hp).toBe(50000);abilityHitPet(w,w.units[0],minion,spell(w,"Qstar"),[{type:"damage",damageType:"true",amount:{base:100}}]);expect(before-minion.hp).toBe(200);expect(minion.statuses?.some(s=>s.key==="sleep"||s.kind==="mark")).toBe(false);expect(w.units[1].hp).toBe(50000);});
});

describe("Explicit collected Flash and finite Wheeeee bolts",()=>{
 it("uses one collected Flash, real400range, and exactlythree finite bolts",()=>{const w=arena(1000,{spellShard:1});cast(w,"W",{direction:-1});expect(w.units[0].x).toBe(-400);expect(w.units[0].memory["zoe:shard"]).toBe(0);expect(w.units[0].memory["zoe:shard:bolts"]).toBe(3);expect(w.units[0].memory["zoe:shard:boltsUntil"]).toBe(300);expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);});
 it("expires a held shard at60seconds without a fabricated activation",()=>{const w=arena(1000,{spellShard:1});w.tick=1800;step(w,[standStill,standStill]);expect(w.units[0].memory["zoe:shard"]).toBe(0);expect(w.units[0].memory["zoe:shard:bolts"]).toBeUndefined();});
 it.each(["root","ground","silence","stun"]as const)("obeys%s before a collectedFlash can be cast",cc=>{const w=arena(400,{spellShard:1});applyCC(w,w.units[1],w.units[0],cc,1);expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);});
 it("fires at nearest actual awake targets and spends Sparkles on one bolt only",()=>{const w=arena(1000,{spellShard:1}),near=body(w,300);cast(w,"W",{direction:1,distance:0});through(w,20);expect(near.hp).toBe(5000-3*65-170);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[0].memory["zoe:shard:bolts"]).toBe(0);});
 it("does not target sleeping bodies and expires unfired bolts without damage",()=>{const w=arena(400,{spellShard:1});applyCC(w,w.units[0],w.units[1],"sleep",20);cast(w,"W",{direction:1,distance:0});through(w,301);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.missiles.filter(m=>m.source==="Wbolt")).toHaveLength(0);});
 it("pauses bolt declaration through complete control",()=>{const w=arena(400,{spellShard:1});cast(w,"W",{direction:1,distance:0});applyCC(w,w.units[1],w.units[0],"stun",1);through(w,20);expect(w.missiles).toHaveLength(0);expect(w.units[0].memory["zoe:shard:bolts"]).toBe(3);through(w,40);expect(Number(w.units[0].memory["zoe:shard:bolts"])).toBeLessThan(3);});
});

describe("Portal Jump captured positions and visible locks",()=>{
 it("captures575destination and25shiftedreturn despite movement during the cast",()=>{const w=arena(1000);cast(w,"R",{direction:1});w.units[0].x=100;through(w,11);expect(w.units[0].x).toBe(100);through(w,12);expect(w.units[0].x).toBe(575);expect(derive(w.units[0]).moveSpeed).toBe(0);expect(w.units[0].statuses.some(s=>s.key==="untargetable"||s.key==="invulnerable")).toBe(false);through(w,41);expect(w.units[0].x).toBe(25);expect(w.units[0].cooldownReady.R).toBe(191);});
 it("locks initialactions until17ticks and permits spells while at the destination",()=>{const w=arena(1000);cast(w,"R");through(w,12);expect(canCast(w,w.units[0],spell(w,"E"))).toBe(false);through(w,17);expect(canCast(w,w.units[0],spell(w,"E"))).toBe(true);});
 it("returns to the captured point after real displacement at the destination",()=>{const w=arena(1000);cast(w,"R",{direction:-1});through(w,12);w.units[0].x=1000;through(w,41);expect(w.units[0].x).toBe(-25);});
 it("resets the attack timer but cancels the portal on actual death",()=>{const w=arena(1000);w.units[0].attackReadyTick=999;cast(w,"R");through(w,8);expect(w.units[0].attackReadyTick).toBe(8);dealDamage(w,w.units[1],w.units[0],100000,"true");expect(w.units[0].memory["zoe:portal:return"]).toBeUndefined();expect(w.units[0].cooldownReady.R).toBe(159);});
 it.each(["root","ground"]as const)("%s prevents a new portal but cannot rewrite an already captured return",cc=>{const w=arena(1000);applyCC(w,w.units[1],w.units[0],cc,1);expect(canCast(w,w.units[0],spell(w,"R"))).toBe(false);w.units[0].statuses=[];cast(w,"R");through(w,12);applyCC(w,w.units[1],w.units[0],cc,5);through(w,41);expect(w.units[0].x).toBe(25);});
 it("keeps branch-local portal endpoints independent",()=>{const w=arena(1000);cast(w,"R");const clone=cloneWorld(w);clone.units[0].memory["zoe:portal:target"]=-575;through(w,12);through(clone,12);expect(w.units[0].x).toBe(575);expect(clone.units[0].x).toBe(-575);});
 it("chooses a real backward star in fight mode and no action in idle",()=>{const w=arena(1300);expect(compiled.spec.behavior!(perceive(w,0))).toBeUndefined();w.modes[0]="fight";expect(compiled.spec.behavior!(perceive(w,0))).toEqual({kind:"cast",ability:"Q",aim:{direction:-1}});});
});

describe("Zoe independent source review regressions",()=>{
 it("keeps the first star's declared world direction when its enemy crosses during the cast",()=>{
  const w=arena();cast(w,"Q");w.units[1].x=-400;through(w,8);
  expect(w.missiles.find(m=>m.source==="Qstar")?.direction).toBe(1);
 });
 it("cannot redirect a pending star through Portal's explicit inability-to-act lock",()=>{
  const w=arena(1000);cast(w,"Q",{direction:-1});through(w,8);cast(w,"R");through(w,17);
  expect(w.units[0].action?.kind).toBe("cast");
  expect(canCast(w,w.units[0],spell(w,"Q2"))).toBe(false);
  through(w,26);expect(canCast(w,w.units[0],spell(w,"Q2"))).toBe(true);
 });
 it("applies an endpoint lollipop only once when ordinary collision reaches the same exact point",()=>{
  const w=arena(915);cast(w,"E");through(w,30);
  expect(w.units[1].totals.damageTaken).toBe(275);
  expect(w.log.filter(l=>l.text.includes("Sleepy Trouble Bubble deals"))).toHaveLength(1);
 });
 it("reports an attached Portal blink without briefly teleporting away from its carrier",()=>{
  const w=arena(1000),movements:Array<{from:number;to:number}>=[];
  w.units[1].spec.hooks={onActualMovement(c){if(c.target===w.units[0]&&c.movement.kind==="blink")movements.push({from:c.movement.from,to:c.movement.to});}};
  cast(w,"R");through(w,10);w.units[0].attached={endTick:100,dir:-1,offset:30};through(w,12);
  expect(movements).toEqual([{from:970,to:970}]);
  expect(w.units[0].x).toBe(970);
  through(w,41);expect(movements).toEqual([{from:970,to:970},{from:970,to:970}]);
  expect(w.units[0].x).toBe(970);
 });
 it("does not declare orbiting bolts during actual stasis",()=>{
  const w=arena(400,{spellShard:1});cast(w,"W",{direction:1,distance:0});state(w,"stasis",true);through(w,20);
  expect(w.missiles.filter(m=>m.source==="Wbolt")).toHaveLength(0);
  expect(w.units[0].memory["zoe:shard:bolts"]).toBe(3);
  expect(w.units[1].totals.damageTaken).toBe(0);
 });
 it("suppresses a ramped drowsy slow immediately when immunity is gained in the same tick",()=>{
  const w=arena();w.units[1].spec.base.moveSpeed=350;packet(w,"Ebubble");through(w,21);
  expect(derive(w.units[1]).rawMoveSpeed).toBeCloseTo(297.5,12);
  state(w,"slowImmune");
  expect(derive(w.units[1]).rawMoveSpeed).toBe(350);
  expect(marked(w)).toBeDefined();
 });
 it("restores the current ramp immediately when drowsy slow immunity is removed in the same tick",()=>{
  const w=arena();w.units[1].spec.base.moveSpeed=350;state(w,"slowImmune");packet(w,"Ebubble");through(w,21);
  expect(derive(w.units[1]).rawMoveSpeed).toBe(350);
  w.units[1].statuses=w.units[1].statuses.filter(s=>s.key!=="slowImmune");
  expect(derive(w.units[1]).rawMoveSpeed).toBeCloseTo(297.5,12);
  through(w,42);expect(w.units[1].statuses.some(s=>s.key==="sleep")).toBe(true);
 });
 it.each([false,true])("requires explicit structure metadata for a turret wake source: %s",classified=>{
  const w=arena();sleeping(w);
  const turret=body(w,100,{kind:classified?"native-structure":"turret",name:classified?"Actual native structure":"Turret-shaped ward",targetClass:"other",...(classified?{structureClass:"turret"as const}:{})},0);
  const actor=petAttackActor(turret,w.units[0],w.tick),before=w.units[1].hp;
  dealDamage(w,actor,w.units[1],100,"true");
  expect(before-w.units[1].hp).toBe(classified?200:100);
  expect(marked(w)===undefined).toBe(classified);
 });
 it.each([undefined,"large"]as const)("retains a launched %s monster's source classification after the real launcher is removed",sizeClass=>{
  const w=arena();sleeping(w);
  const monster=body(w,100,{kind:"native-monster",targetClass:"monster",sizeClass,attack:{range:1000,interval:10,missileSpeed:900,projectile:true,attackLike:true,effects:[{type:"damage",damageType:"true",amount:{base:100}}]}},0);
  advancePets(w);
  expect(w.petMissiles).toHaveLength(1);
  expect(w.petMissiles![0]!.sourcePet?.spec.sizeClass).toBe(sizeClass);
  w.pets=w.pets.filter(p=>p!==monster);
  const before=w.units[1].hp;
  through(w,60);
  expect(w.petMissiles).toHaveLength(0);
  expect(before-w.units[1].hp).toBe(sizeClass==="large"?200:100);
  expect(marked(w)===undefined).toBe(sizeClass==="large");
 });
 it.each([false,true])("cancels pending sleep when a real cleanse resolves before upkeep on its boundary tick (pet=%s)",petTarget=>{
  const w=arena(petTarget?2000:400),pet=petTarget?body(w,400):undefined;
  if(pet)abilityHitPet(w,w.units[0],pet,spell(w,"Ebubble"),spell(w,"Ebubble").onHit!);else packet(w,"Ebubble");
  w.scheduled.push({tick:42,owner:1,target:1,...(pet?{targetPet:pet.id}:{}),effects:[{type:"cleanse"}],scale:1});
  through(w,42);
  const statuses=pet?pet.statuses!:w.units[1].statuses;
  expect(statuses.some(s=>s.key==="sleep")).toBe(false);
  expect(statuses.some(s=>s.kind==="mark"&&s.key==="zoe:bubble:0")).toBe(false);
 });
 it("does not confuse an actual pet shield at the drowsy boundary with a cleanse",()=>{
  const w=arena(2000),pet=body(w,400);
  abilityHitPet(w,w.units[0],pet,spell(w,"Ebubble"),spell(w,"Ebubble").onHit!);
  w.scheduled.push({tick:42,owner:1,target:1,targetPet:pet.id,effects:[{type:"shield",amount:{base:100},duration:2}],scale:1});
  through(w,42);
  expect(pet.statuses!.some(s=>s.key==="sleep")).toBe(true);
  expect(pet.statuses!.some(s=>s.key==="drowsy")).toBe(false);
  expect(pet.statuses!.find(s=>s.key==="sleep")).toMatchObject({startTick:42,endTick:110});
  expect(pet.statuses!.filter(s=>s.kind==="shield").map(s=>s.value)).toEqual([100]);
 });
 it("does not recreate pending sleep if the accepted drowsy callback immediately cleanses it",()=>{
  const w=arena();
  w.units[1].spec.hooks={onCCApplied(c){if(c.cc==="drowsy")applyEffect(c.world,c.self,c.self,{type:"cleanse"},{scale:1});}};
  expect(()=>packet(w,"Ebubble")).not.toThrow();
  through(w,42);
  expect(marked(w)).toBeUndefined();
  expect(w.units[1].statuses.some(s=>s.key==="drowsy"||s.key==="sleep")).toBe(false);
 });
});
