import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {damagePerSecond,type StatPrices} from "../../engine/budget";
import {compileKit} from "../../engine/kits/compile";
import {canCast,startAttack,startCast} from "../../engine/sim/actions";
import {perceive} from "../../engine/sim/behavior";
import {applyEffect,attackHit,canTarget,dealDamage} from "../../engine/sim/combat";
import {derive} from "../../engine/sim/derived";
import {simulateMatchup} from "../../engine/sim/matchup";
import {petFormulaTarget} from "../../engine/sim/petTarget";
import {damagePet,petEffects,spawnPet} from "../../engine/sim/pets";
import {createWorld,fork,step} from "../../engine/sim/simulate";
import type {AbilitySpec,PetSpec,StateType} from "../../engine/sim/spec";
import {cloneWorld,type Aim,type Pet,type Unit,type World} from "../../engine/sim/state";
import Orianna from "../../kits/champions/Orianna";
import {standStill} from "../sim/helpers";
import {fighter} from "../sim/kits";
import {championData,kit,pets,records} from "./helpers";

const compiled=compileKit(championData("Orianna"),records("Orianna"),Orianna,{},pets("Orianna"));
const spell=(key:string):AbilitySpec=>compiled.spec.abilities.find(a=>a.key===key)!;
function arena(x=500,ap=100):World{const world=createWorld({fighters:[{...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap}},fighter({base:{hp:50000,hpRegen:0,armor:0,mr:0,moveSpeed:0,radius:35}})],distance:0,modes:["idle","idle"],settings:{log:true,maxSeconds:60,maxBranches:1}});world.units[0].x=0;world.units[1].x=x;return world;}
const through=(world:World,tick:number)=>{while(world.tick<=tick&&!world.result)step(world,[standStill,standStill]);};
const cast=(world:World,key:string,aim?:Aim)=>{expect(canCast(world,world.units[0],spell(key))).toBe(true);return startCast(world,world.units[0],spell(key),aim);};
const ball=(world:World)=>JSON.parse(String(world.units[0].memory["orianna:ball"])) as {mode:string;x:number;host:number;missile?:number};
const pet=(world:World,x:number,owner:0|1=0,extra:Partial<PetSpec>={}):Pet=>spawnPet(world,world.units[owner],{kind:"actual-fixture",name:"Actual champion body",hp:10000,armor:0,mr:0,radius:35,moveSpeed:0,duration:60,targetClass:"champion",...extra},x);
const state=(world:World,key:StateType,target=world.units[1],value?:number)=>applyEffect(world,target,target,{type:"state",state:key,duration:20,...(value===undefined?{}:{value})},{scale:1});
const shield=(unit:Unit)=>unit.statuses.find(s=>s.kind==="shield"&&s.key==="E");
const petState=(world:World,target:Pet,key:StateType)=>{const view=petFormulaTarget(target,world.units[target.owner],world.tick);state(world,key,view);target.statuses=view.statuses;};
const damage=(world:World)=>50000-world.units[1].hp;
function ground(world:World,x=500){cast(world,"Q",{direction:1,distance:x});through(world,Math.ceil(x/1400*30)+2);expect(ball(world).mode).toBe("ground");}

describe("Orianna exact primary and game sources",()=>{
 it("reads all five ability pins and the separately pinned untargetable Ball article",()=>{expect(new Set(compiled.evidence.filter(e=>e.revid).map(e=>e.revid))).toEqual(new Set([3804030,4026443,3995779,4026444,3958109,3892665]));expect(compiled.evidence.filter(e=>e.url).length).toBeGreaterThan(0);expect(compiled.variants).toEqual([]);});
 it("retains full raw revisions and exact object-scoped binary excerpts without altering primary values",()=>{for(const record of records("Orianna")){expect(record.notes.some(n=>n.includes("Ability data"))).toBe(true);for(const source of record.gameSources??[]){expect(source.sha256).toBe("6d24efd8a5dd4beed5c83765e3e045e0bad4a6c9a9f0e2e58b041d0a51992c4c");expect(JSON.parse(source.text[0]!).objectPath).toBe(source.object);}}expect(pets("Orianna")[0]!.text.fullRawRevision).toContain("Collision Immunity");});
 it("fails closed when selected movement/radius proof is removed",()=>{const rows=records("Orianna");delete rows.find(r=>r.kind==="Q")!.gameSources;expect(()=>compileKit(championData("Orianna"),rows,Orianna,{},pets("Orianna"))).toThrow("pinned game data");});
 it("documents the exact leash, blocker, terrain and missing toss-clock boundaries",()=>{const text=compiled.assumptions.join(" ");for(const term of ["1355","pending for test","one simulation tick","through walls","No ally is invented","level20"])expect(text).toContain(term);});
 it("reads reference hints after sealing without late source access or phantom ally bonuses",()=>{const world=arena(),self=world.units[0];expect(compiled.spec.budget!.healing!(self,world.units[1])).toBeCloseTo(240/9);for(let i=0;i<3;i++)expect(Object.values(compiled.spec.budget!.damage!(self,world.units[1])).every(Number.isFinite)).toBe(true);expect(world.pets).toHaveLength(0);});
});

describe("Orianna actual Ball possession and command clocks",()=>{
 it("starts with one utility state and30 actual armor/MR without spawning a hittable pet",()=>{const world=arena();expect(ball(world)).toMatchObject({mode:"self",x:0,host:-1});expect(world.pets).toHaveLength(0);expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor+30);expect((derive(world.units[0]).mr.base+derive(world.units[0]).mr.bonus)).toBe(compiled.spec.base.mr+30);});
 it("loses possession synchronously on Q departure and has exactly a one-tick global lock",()=>{const world=arena();cast(world,"Q");expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor);expect(canCast(world,world.units[0],spell("W-buffer"))).toBe(false);through(world,0);expect(canCast(world,world.units[0],spell("W-buffer"))).toBe(true);expect(canCast(world,world.units[0],spell("E"))).toBe(false);});
 it("keeps E on its already attached host outside the global lock",()=>{const world=arena(),mana=world.units[0].resource;cast(world,"E");expect(shield(world.units[0])?.value).toBe(240);expect(world.units[0].resource).toBe(mana-60);expect(canCast(world,world.units[0],spell("Q"))).toBe(true);});
 it("picks up the actual ground Ball at135center distance",()=>{const world=arena(2000);ground(world,150);world.units[0].x=14;through(world,world.tick);expect(ball(world).mode).toBe("ground");world.units[0].x=15;through(world,world.tick);expect(ball(world).mode).toBe("self");expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor+30);});
 it("snaps at actual ground leash and imposes an independent0.75second R lock",()=>{const world=arena(2000);ground(world,500);world.units[0].x=-791;const tick=world.tick;through(world,tick);expect(ball(world)).toMatchObject({mode:"self",x:-791});expect(world.units[0].cooldownReady.R).toBe(tick+23);expect(canCast(world,world.units[0],spell("R"))).toBe(false);});
 it("does not shorten an already longer R cooldown when snapping",()=>{const world=arena(2000);ground(world,500);world.units[0].cooldownReady.R=2000;world.units[0].x=-800;through(world,world.tick);expect(world.units[0].cooldownReady.R).toBe(2000);});
 it("keeps branch-local Ball and carrier state independent",()=>{const world=arena(2000);cast(world,"Q",{direction:1,distance:800});through(world,2);const copy=cloneWorld(world);copy.units[0].x=-1400;through(copy,copy.tick);expect(ball(copy).mode).toBe("self");expect(ball(world).mode).toBe("Q");expect(world.missiles[0]?.ended).not.toBe(true);});
 it("cancels its declared pending utility commands on owner death without post-death casts",()=>{const world=arena(2000);cast(world,"Q");dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,0);expect(world.units[0].alive).toBe(false);expect(world.missiles.some(m=>m.source==="Q-flight"&&!m.ended)).toBe(false);expect(world.units[0].statuses.some(s=>s.memoKey==="orianna:possession")).toBe(false);});
});

describe("Orianna Q actual transit, ordered contacts and landing",()=>{
 it("pays35 mana and starts3second cooldown once while the Ball actually travels",()=>{const world=arena(),mana=world.units[0].resource;cast(world,"Q");expect(world.units[0].resource).toBe(mana-35);expect(world.units[0].cooldownReady.Q).toBe(90);expect(damage(world)).toBe(0);through(world,0);expect(ball(world).x).toBeCloseTo(1400/30);expect(damage(world)).toBe(0);});
 it("moves at least150 from self even for a zero-length cursor request",()=>{const world=arena(2000);cast(world,"Q",{direction:1,distance:0});through(world,5);expect(ball(world)).toMatchObject({mode:"ground",x:150});});
 it("uses the actual remote Ball origin on a second command",()=>{const world=arena(2000);ground(world,500);world.units[0].cooldownReady.Q=world.tick;cast(world,"Q",{direction:-1,distance:500});through(world,world.tick);expect(ball(world).x).toBeCloseTo(500-1400/30);});
 it("hits one body only once across flight and overlapping landing",()=>{const world=arena(500);cast(world,"Q",{direction:1,distance:650});through(world,20);expect(damage(world)).toBe(235);});
 it("uses175landing radius beyond the narrower flight path",()=>{const world=arena(800);cast(world,"Q",{direction:1,distance:650});through(world,20);expect(damage(world)).toBe(235);});
 it("does not extend landing by more than the real target's hitbox",()=>{const world=arena(861);cast(world,"Q",{direction:1,distance:650});through(world,20);expect(damage(world)).toBe(0);});
 it("orders a real intervening pet before the champion and reduces the later packet to70%",()=>{const world=arena(),front=pet(world,200,1);cast(world,"Q",{direction:1,distance:700});through(world,25);expect(10000-front.hp).toBe(235);expect(damage(world)).toBe(164.5);});
 it("spends first-body entitlement on a spell-shielded earlier champion",()=>{const world=arena(300),later=pet(world,600,1);state(world,"spellShield");cast(world,"Q",{direction:1,distance:700});through(world,25);expect(damage(world)).toBe(0);expect(10000-later.hp).toBe(164.5);});
 it("can damage an invisible actual body with its area path",()=>{const world=arena();state(world,"invisible");cast(world,"Q");through(world,20);expect(damage(world)).toBe(235);});
 it.each(["untargetable","stasis"] as const)("does not consume a Q hit on an actually%s body",key=>{const world=arena();state(world,key);cast(world,"Q");through(world,20);expect(damage(world)).toBe(0);});
 it("drops at an actual wall before a remote victim without a fabricated landing explosion",()=>{const world=arena();world.zones.push({id:world.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:300,radius:0,startTick:0,endTick:100});cast(world,"Q");through(world,20);expect(ball(world)).toMatchObject({mode:"ground",x:300});expect(damage(world)).toBe(0);});
 it.each(["projectileIntercept","projectileBlock"] as const)("retains the documented Q distinction from a%s aura",key=>{const world=arena();state(world,key,world.units[1],10);world.units[1].facing=-1;cast(world,"Q");through(world,20);expect(damage(world)).toBe(235);expect(ball(world).x).toBe(500);});
 it("lets the utility Ball ignore actual intervening terrain",()=>{const world=arena();world.terrain.push({id:world.nextId++,owner:1,from:200,to:300,endTick:100});cast(world,"Q");through(world,20);expect(ball(world).x).toBe(500);expect(damage(world)).toBe(235);});
 it("retargets only its own previous Ball carrier and does not duplicate its old landing",()=>{const world=arena(2000);cast(world,"Q",{direction:1,distance:800});through(world,2);world.units[0].cooldownReady.Q=world.tick;cast(world,"Q",{direction:-1,distance:200});through(world,20);expect(ball(world).x).toBe(-200);expect(world.missiles.filter(m=>m.source==="Q-flight")).toHaveLength(0);});
});

describe("Orianna deferred Q command buffers",()=>{
 it("queues a free W request and pays exactly once only after arrival",()=>{const world=arena(),mana=world.units[0].resource;cast(world,"Q");through(world,0);cast(world,"W-buffer");expect(world.units[0].resource).toBe(mana-35);expect(world.units[0].cooldownReady.W).toBeUndefined();expect(world.zones.some(z=>z.ability==="W-field")).toBe(false);through(world,25);expect(world.units[0].resource).toBe(mana-35-80);expect(damage(world)).toBe(545);expect(world.log.filter(row=>row.text.startsWith("casts ")&&row.text.includes("Dissonance")).length).toBe(1);});
 it("buffers R without starting its0.5second cast or100mana cost in flight",()=>{const world=arena(),mana=world.units[0].resource;cast(world,"Q");through(world,0);cast(world,"R-buffer");expect(world.units[0].action).toBeUndefined();expect(world.units[0].resource).toBe(mana-35);through(world,12);expect(world.units[0].action).toMatchObject({kind:"cast",ability:"R"});expect(world.units[0].resource).toBe(mana-35);through(world,35);expect(world.units[0].resource).toBe(mana-35-100);expect(damage(world)).toBe(820);});
 it("does not fabricate a successful arrival cast when its mana was spent elsewhere",()=>{const world=arena();cast(world,"Q");through(world,0);cast(world,"W-buffer");world.units[0].resource=0;through(world,25);expect(world.zones.some(z=>z.ability==="W-field")).toBe(false);expect(world.units[0].cooldownReady.W).toBeUndefined();});
 it("keeps buffers as explicit non-cast controls and denies all controls during E travel",()=>{const world=arena(2000);ground(world);cast(world,"E");for(const key of ["Q","W","R","W-buffer","R-buffer","E-ally"])expect(canCast(world,world.units[0],spell(key))).toBe(false);expect(spell("W-buffer").countsAsCast).toBe(false);expect(spell("R-buffer").countsAsCast).toBe(false);});
});

describe("Orianna Protect real hosts and arrival",()=>{
 it("grants neither possession nor shield to self while E is still returning",()=>{const world=arena(2000);ground(world,800);const start=world.tick;cast(world,"E");expect(shield(world.units[0])).toBeUndefined();expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor);through(world,start+4);expect(ball(world).mode).toBe("E");expect(shield(world.units[0])).toBeUndefined();through(world,start+20);expect(ball(world).mode).toBe("self");expect(shield(world.units[0])?.value).toBe(240);expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor+30);});
 it("keeps possession after the separately timed shield has expired",()=>{const world=arena();cast(world,"E");through(world,75);expect(shield(world.units[0])).toBeUndefined();expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor+30);});
 it("selects an actual ally, follows it, and starts its shield/resistance only at arrival",()=>{const world=arena(2000),host=pet(world,500);cast(world,"E-ally",{direction:1,distance:500});through(world,2);expect(host.statuses?.some(s=>s.kind==="shield")).toBe(false);host.x=800;through(world,20);expect(ball(world)).toMatchObject({mode:"ally",host:host.id,x:800});expect(host.statuses?.find(s=>s.kind==="shield")?.value).toBe(240);expect((derive(petFormulaTarget(host,world.units[0],world.tick)).armor.base+derive(petFormulaTarget(host,world.units[0],world.tick)).armor.bonus)).toBe(30);expect((derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus)).toBe(compiled.spec.base.armor);});
 it("uses the source-specific permission for an actual invisible ally",()=>{const world=arena(2000),host=pet(world,500);petState(world,host,"invisible");expect(canTarget(petFormulaTarget(host,world.units[0],world.tick),world.units[0])).toBe(false);cast(world,"E-ally",{direction:1,distance:500});through(world,20);expect(ball(world).host).toBe(host.id);expect(host.statuses?.some(s=>s.kind==="shield")).toBe(true);});
 it.each([undefined,"minion","monster","other"] as const)("does not invent a Champion-class ally from%s classification",targetClass=>{const world=arena();pet(world,200,0,{targetClass});expect(canCast(world,world.units[0],spell("E-ally"))).toBe(false);});
 it("does not promote175forgiveness into extra declaration range",()=>{const world=arena(2000);pet(world,1121);expect(canCast(world,world.units[0],spell("E-ally"))).toBe(false);});
 it("does retain the separate175 completion allowance for a captured actual host",()=>{const world=arena(2000),host=pet(world,1120);world.units[0].memory["orianna:E:target"]=host.id;host.x=1295;expect(spell("E-ally").validTargetAtCompletion!(world,world.units[0])).toBe(true);host.x=1296;expect(spell("E-ally").validTargetAtCompletion!(world,world.units[0])).toBe(false);});
 it.each(["death","untargetable","stasis","disappearance"] as const)("snaps without shielding when the chosen host suffers%s before arrival",reason=>{const world=arena(2000),host=pet(world,800);cast(world,"E-ally");through(world,2);if(reason==="death")host.hp=0;else if(reason==="disappearance")world.pets=world.pets.filter(p=>p!==host);else petState(world,host,reason);through(world,10);expect(ball(world).mode).toBe("self");expect(host.statuses?.some(s=>s.kind==="shield")).toBe(false);});
 it("leaves the attached Ball at an actual host's death location",()=>{const world=arena(2000),host=pet(world,800);cast(world,"E-ally");through(world,20);host.x=900;through(world,world.tick);host.hp=0;through(world,world.tick);expect(ball(world)).toMatchObject({mode:"ground",x:900,host:-1});});
 it("uses the primary estimated1355ally leash and removes only its own possession",()=>{const world=arena(2000),host=pet(world,800);cast(world,"E-ally");through(world,20);host.x=1355;through(world,world.tick);expect(ball(world).mode).toBe("ally");host.x=1356;through(world,world.tick);expect(ball(world).mode).toBe("self");expect(host.statuses?.some(s=>s.memoKey==="orianna:possession")).toBe(false);});
 it("an actual wall before the hostile contact snaps E home without damage or arrival shield",()=>{const world=arena(300);ground(world,800);const before=damage(world);world.zones.push({id:world.nextId++,owner:1,kind:"projectileWall",seenTick:world.tick,x:600,radius:0,startTick:world.tick,endTick:1000});cast(world,"E");through(world,world.tick+20);expect(damage(world)).toBe(before);expect(ball(world).mode).toBe("self");expect(shield(world.units[0])).toBeUndefined();});
 it("return-path contacts deal180+30%AP exactly once per actual body",()=>{const world=arena(300);ground(world,800);const before=damage(world);cast(world,"E");through(world,world.tick+20);expect(damage(world)-before).toBe(210);});
});

describe("Orianna Dissonance field contacts and recipient clocks",()=>{
 it("emits damage and a stationary field from the Ball instead of Orianna's body",()=>{const world=arena();ground(world);const before=damage(world);cast(world,"W");through(world,world.tick);expect(damage(world)-before).toBe(310);expect(world.zones.find(z=>z.ability==="W-field")?.x).toBe(500);expect(derive(world.units[0]).rawMoveSpeed).toBe(compiled.spec.base.moveSpeed);expect(world.units[1].statuses.find(s=>s.key==="slow")?.value).toBe(.4);});
 it("does not stretch the225center-radius pulse by a hostile hitbox",()=>{const world=arena(226);cast(world,"W");through(world,1);expect(damage(world)).toBe(0);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);});
 it("keeps the created ground field fixed when a new command moves the Ball",()=>{const world=arena(2000);ground(world);cast(world,"W");through(world,world.tick);world.units[0].cooldownReady.Q=world.tick;cast(world,"Q",{direction:1,distance:800});through(world,world.tick+10);expect(world.zones.find(z=>z.ability==="W-field")?.x).toBe(500);expect(ball(world).x).toBe(800);});
 it("decays the actual hostile slow over2seconds after exit without following it",()=>{const world=arena(100);cast(world,"W");through(world,10);world.units[1].x=500;through(world,40);expect(world.units[1].statuses.find(s=>s.key==="slow")?.value).toBeCloseTo(.2);through(world,71);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);});
 it("retains recipient tenacity in the exit clock rather than reapplying a fresh2seconds",()=>{const world=arena(100);state(world,"tenacity",world.units[1],.5);cast(world,"W");through(world,10);world.units[1].x=500;through(world,25);expect(world.units[1].statuses.find(s=>s.key==="slow")?.value).toBeCloseTo(.2);through(world,41);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);});
 it("does not recreate a dispelled slow after the recipient leaves the field",()=>{const world=arena(100);cast(world,"W");through(world,5);world.units[1].x=500;world.units[1].statuses=[];through(world,15);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);});
 it("gives a real allied body40%speed and a local linear exit tail",()=>{const world=arena(2000),host=pet(world,100);cast(world,"W");through(world,10);expect(host.statuses?.find(s=>s.key==="moveSpeedPercent")?.value).toBe(.4);host.x=500;through(world,40);expect(host.statuses?.find(s=>s.key==="moveSpeedPercent")?.value).toBeCloseTo(.2);expect(world.pets).toHaveLength(1);});
 it("preserves slow immunity while still dealing the separate damage pulse",()=>{const world=arena(100);state(world,"slowImmune");cast(world,"W");through(world,10);expect(damage(world)).toBe(310);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);});
});

describe("Orianna Shockwave completion and independent control",()=>{
 it("waits0.5seconds then damages585 at100AP and moves a near-center victim325over the Ball",()=>{const world=arena(100);cast(world,"R");through(world,14);expect(damage(world)).toBe(0);through(world,20);expect(damage(world)).toBe(585);expect(world.units[1].x).toBe(-225);const stun=world.units[1].statuses.find(s=>s.key==="stun")!;expect(stun.endTick-stun.startTick).toBe(23);});
 it("uses415center radius without extending by a target's hitbox",()=>{const world=arena(416);cast(world,"R");through(world,20);expect(damage(world)).toBe(0);expect(world.units[1].x).toBe(416);});
 it("applies its independent stun when displacement immunity denies the toss",()=>{const world=arena(100);state(world,"displacementImmune");cast(world,"R");through(world,20);expect(world.units[1].x).toBe(100);expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(true);expect(damage(world)).toBe(585);});
 it("follows the documented terrain-blocking choice for actual intervening terrain",()=>{const world=arena(200);world.terrain.push({id:world.nextId++,owner:0,from:100,to:110,endTick:1000});cast(world,"R");through(world,20);expect(world.units[1].x).toBe(145);});
 it.each(["spellShield","parry","untargetable","stasis"] as const)("honors the actual%s recipient during completion",key=>{const world=arena(100);state(world,key);cast(world,"R");through(world,20);expect(damage(world)).toBe(0);expect(world.units[1].x).toBe(100);expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(false);});
 it("casts from an actual attached moving host even after that host breaks the ordinary leash",()=>{const world=arena(1700),host=pet(world,800);cast(world,"E-ally");through(world,20);cast(world,"R");host.x=1500;through(world,world.tick+20);expect(ball(world).mode).toBe("self");expect(damage(world)).toBe(585);expect(world.units[1].x).toBe(1375);});
 it("cancels the unreleased R when owner death occurs before completion",()=>{const world=arena(100);cast(world,"R");through(world,5);dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,20);expect(damage(world)).toBe(0);});
});

describe("Orianna Clockwork Windup actual target-local on-hits",()=>{
 function hit(world:World,blind=false){const before=damage(world),ad=derive(world.units[0]).ad;attackHit(world,world.units[0],world.units[1],blind,[]);return damage(world)-before-(blind?0:ad);}
 it("uses the supplied level20 base and15%AP on the first actual hit",()=>{const world=arena();expect(hit(world)).toBeCloseTo(54.7058823529412+15);});
 it("increases subsequent same-body hits by15%then30% without uncapped stacks",()=>{const world=arena(),base=54.7058823529412+15;expect(hit(world)).toBeCloseTo(base);expect(hit(world)).toBeCloseTo(base*1.15);expect(hit(world)).toBeCloseTo(base*1.3);expect(hit(world)).toBeCloseTo(base*1.3);});
 it("expires the4second target-local stack before the next real hit",()=>{const world=arena();hit(world);hit(world);through(world,120);expect(hit(world)).toBeCloseTo(54.7058823529412+15);});
 it("does not grant stacks from a blinded basic attack",()=>{const world=arena();hit(world,true);expect(Number(world.units[0].memory["orianna:passive:count"]??0)).toBe(0);expect(hit(world)).toBeCloseTo(54.7058823529412+15);});
 it("resets its target-local entitlement after a real attack hits a different pet",()=>{const world=arena(200),target=pet(world,100,1);hit(world);hit(world);startAttack(world,world.units[0],target);through(world,30);expect(world.units[0].memory["orianna:passive:target"]).toBe(`p${target.id}`);expect(hit(world)).toBeCloseTo(54.7058823529412+15);});
});

describe("Orianna production policy and full-budget reflection",()=>{
 it.each(["hold","trade","flee"] as const)("reserves R in%s and respects completed-trade retreat",mode=>{const world=arena(100);world.modes[0]=mode;world.units[0].memory.tradeDone=true;expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});});
 it("runs ordinary15000gold six-scenario production with exact reversed builds and strict scores",()=>{const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices,other=kit("Darius").spec,forward=simulateMatchup(compiled.spec,other,15000,prices),reverse=simulateMatchup(other,compiled.spec,15000,prices);expect(forward.scenarios).toHaveLength(6);expect(forward.builds).toEqual([reverse.builds[1],reverse.builds[0]]);expect(Math.abs(forward.score+reverse.score)).toBeLessThan(1e-10);for(const [i,scenario] of forward.scenarios.entries()){const reflected=reverse.scenarios[[1,0,2,3,4,5][i]!]!;if(scenario.score===undefined)expect(reflected.score).toBeUndefined();else expect(Math.abs(scenario.score+reflected.score!)).toBeLessThan(1e-10);for(const outcome of scenario.outcomes)expect([outcome.seconds,...outcome.hp,...outcome.damage].every(Number.isFinite)).toBe(true);}for(const build of forward.builds)expect(Math.abs(Object.values(build.spent).reduce((a,b)=>a+b,0)-15000)).toBeLessThan(1e-10);},60000);
});


describe("Orianna source boundaries and branch transactions",()=>{
 it("counts the passive baseline once and adds only the maximum30%stack increment in the reference DPS",()=>{
  const world=arena(),d=derive(world.units[0]),expected=(54.7058823529412+15)*1.3*d.attackSpeed+235/(3+825/1400)+310/7+585/80.5;
  expect(damagePerSecond({...compiled.spec,bonus:{ap:100}},world.units[1].spec).magic).toBeCloseTo(expected,10);
 });
 it.each([[825,235],[826,0]])("keeps Q's175center landing boundary at enemy%s",(x,expected)=>{const world=arena(x);cast(world,"Q",{direction:1,distance:650});through(world,20);expect(damage(world)).toBe(expected);});
 it("queues a real finite branch for a large-health-share uncertain Q before its carrier moves",()=>{
  const world=arena(700);world.units[1].hp=100;world.units[1].spec.base.hp=100;world.units[1].spec.base.moveSpeed=600;world.settings.maxBranches=4;world.settings.hitSpread=.25;world.settings.reactionTime=0;cast(world,"Q");
  const pending=world.pendingSplits??[];expect(pending).toHaveLength(1);expect(pending[0]!.missile).toBeDefined();expect(pending[0]!.chance).toBeGreaterThan(0);expect(pending[0]!.chance).toBeLessThan(1);expect(ball(world).x).toBe(0);
  delete world.pendingSplits;const branches=fork(world,pending);expect(branches).toHaveLength(2);expect(branches.map(b=>b.missiles[0]!.connects)).toEqual([true,false]);branches[1]!.units[0].x=-1500;through(branches[1]!,0);expect(ball(branches[0]!).mode).toBe("Q");expect(ball(branches[1]!).mode).toBe("self");
 });
 it("branches uncertain R control while an actual pet keeps its independent full area packet",()=>{
  const world=arena(100),target=pet(world,100,1);world.units[1].spec.base.moveSpeed=1200;world.settings.maxBranches=4;world.settings.hitSpread=.25;world.settings.reactionTime=0;cast(world,"R");through(world,14);const pending=step(world,[standStill,standStill]);expect(pending).toHaveLength(1);expect(pending[0]!.zone).toBeDefined();const branches=fork(world,pending);expect(branches).toHaveLength(2);
  for(const branch of branches)through(branch,20);expect(branches.map(b=>50000-b.units[1].hp)).toEqual([585,0]);for(const branch of branches){const actual=branch.pets.find(p=>p.id===target.id)!;expect(actual.hp).toBe(9415);expect(actual.x).toBe(-225);}expect(branches[1]!.units[1].statuses.some(s=>s.key==="stun")).toBe(false);
 });
 it("lets an actual E directional interception resolve its collision then snaps home",()=>{
  const world=arena(300);ground(world,800);const before=damage(world);state(world,"projectileIntercept");world.units[1].facing=1;cast(world,"E");through(world,world.tick+20);expect(damage(world)-before).toBe(210);expect(ball(world).mode).toBe("self");expect(shield(world.units[0])).toBeUndefined();
 });
 it("a real destruction aura stops E before the hostile body's damage contact",()=>{
  const world=arena(300);ground(world,800);const before=damage(world);state(world,"projectileBlock",world.units[1],200);cast(world,"E");through(world,world.tick+20);expect(damage(world)).toBe(before);expect(ball(world).mode).toBe("self");expect(shield(world.units[0])).toBeUndefined();
 });
 it("keeps the initial stationary W field for3seconds, then decays the final2second exposure",()=>{
  const world=arena(100);cast(world,"W");through(world,89);expect(world.zones.some(z=>z.ability==="W-field")).toBe(true);through(world,90);expect(world.zones.some(z=>z.ability==="W-field")).toBe(false);through(world,119);expect(world.units[1].statuses.find(s=>s.key==="slow")?.value).toBeCloseTo(.2);through(world,150);expect(world.units[1].statuses.some(s=>s.key==="slow")).toBe(false);
 });
 it("restores full field strength on re-entry without accumulating duplicate slow statuses",()=>{
  const world=arena(100);cast(world,"W");through(world,10);world.units[1].x=500;through(world,40);world.units[1].x=100;through(world,41);const own=world.units[1].statuses.filter(s=>s.kind==="cc"&&s.key==="slow"&&s.ability==="W-field");expect(own).toHaveLength(1);expect(own[0]!.value).toBe(.4);
 });
 it("keeps another source's independent slow untouched when maintaining the field",()=>{
  const world=arena(100);world.units[1].statuses.push({kind:"cc",key:"slow",source:1,ability:"other-source",startTick:0,endTick:300,value:.6});cast(world,"W");through(world,20);expect(world.units[1].statuses.find(s=>s.ability==="other-source")).toMatchObject({value:.6,endTick:300});
 });
 it("retains an invisible attached host without borrowing stealth for Orianna",()=>{
  const world=arena(2000),host=pet(world,500);cast(world,"E-ally");through(world,20);petState(world,host,"invisible");through(world,world.tick);expect(ball(world).host).toBe(host.id);expect(canTarget(world.units[0],world.units[1])).toBe(true);
 });
 it("E onto the already attached ally refreshes only its own shield and avoids a new global lock",()=>{
  const world=arena(2000),host=pet(world,500);cast(world,"E-ally");through(world,20);world.units[0].cooldownReady.E=world.tick;cast(world,"E-ally",{direction:1,distance:500});expect(canCast(world,world.units[0],spell("Q"))).toBe(true);expect(host.statuses?.filter(s=>s.kind==="shield"&&s.key==="E")).toHaveLength(1);
 });
 it.each(["parry","dodgeAttacks","blockAttacks"] as const)("a%s basic contact grants no passive stacks",key=>{
  const world=arena();state(world,key);attackHit(world,world.units[0],world.units[1],false,[]);expect(Number(world.units[0].memory["orianna:passive:count"]??0)).toBe(0);
 });
});

describe("Orianna synchronous actual Ball movement",()=>{
 function attachAlly(world:World){const host=pet(world,500);cast(world,"E-ally",{direction:1,distance:500});through(world,20);expect(ball(world)).toMatchObject({mode:"ally",host:host.id,x:500});return host;}
 function forceHost(world:World,host:Pet,step=300){petEffects(world,world.units[1],host,[{type:"displace",direction:"away",distance:step*2,duration:2/30,originX:0,ignoreUnitCollision:true}]);}
 it("emits W from a host moved by actual forced movement earlier in the same tick",()=>{
  const world=arena(800),host=attachAlly(world);forceHost(world,host);step(world,[()=>({kind:"cast",ability:"W"}),standStill]);
  expect(host.x).toBe(800);expect(ball(world).x).toBe(800);expect(world.zones.filter(z=>z.ability==="W-hit"||z.ability==="W-field").map(z=>z.x)).toEqual([800,800]);through(world,world.tick);expect(damage(world)).toBe(310);
 });
 it("starts Q from a host's actual same-tick forced endpoint",()=>{
  const world=arena(2000),host=attachAlly(world);forceHost(world,host);step(world,[()=>({kind:"cast",ability:"Q",aim:{direction:1,distance:200}}),standStill]);
  expect(host.x).toBe(800);expect(ball(world)).toMatchObject({mode:"Q",x:800});expect(world.missiles.find(m=>m.source==="Q-flight")?.x).toBe(800);through(world,world.tick);expect(ball(world).x).toBeCloseTo(800-1400/30);
 });
 it("moves a self-attached Ball synchronously with an actual blink before W",()=>{
  const world=arena(500);applyEffect(world,world.units[0],world.units[0],{type:"reposition",direction:"toward",distance:300},{scale:1});expect(world.units[0].x).toBe(300);expect(ball(world)).toMatchObject({mode:"self",x:300});cast(world,"W");expect(world.zones.find(z=>z.ability==="W-hit")?.x).toBe(300);through(world,0);expect(damage(world)).toBe(310);
 });
 it("starts Q from the self-attached Ball's actual blink endpoint",()=>{
  const world=arena(2000);applyEffect(world,world.units[0],world.units[0],{type:"reposition",direction:"toward",distance:300},{scale:1});cast(world,"Q",{direction:1,distance:200});expect(ball(world)).toMatchObject({mode:"Q",x:300});expect(world.missiles.find(m=>m.source==="Q-flight")?.x).toBe(300);through(world,0);expect(ball(world).x).toBeCloseTo(300+1400/30);
 });
 it("keeps the self-attached Ball at an actual forced movement endpoint without a new tick",()=>{
  const world=arena(1000);applyEffect(world,world.units[1],world.units[0],{type:"displace",direction:"away",distance:600,duration:2/30,originX:-100,ignoreUnitCollision:true},{scale:1});step(world,[standStill,standStill]);expect(world.units[0].x).toBe(300);expect(ball(world)).toMatchObject({mode:"self",x:300});
 });
 it("snaps an actual host past its ally leash before same-tick commands",()=>{
  const world=arena(2000),host=attachAlly(world);forceHost(world,host,900);const tick=world.tick;step(world,[standStill,standStill]);expect(host.x).toBe(1400);expect(ball(world)).toMatchObject({mode:"self",x:0,host:-1});expect(host.statuses?.some(s=>s.memoKey==="orianna:possession")).toBe(false);expect(world.units[0].cooldownReady.R).toBe(tick+23);expect(canCast(world,world.units[0],spell("R"))).toBe(false);
 });
 it("snaps a ground Ball immediately when an actual caster blink breaks its leash",()=>{
  const world=arena(2000);ground(world,500);applyEffect(world,world.units[0],world.units[0],{type:"reposition",direction:"away",distance:791},{scale:1});expect(ball(world)).toMatchObject({mode:"self",x:-791});expect(canCast(world,world.units[0],spell("R"))).toBe(false);
 });
 it("picks up an actual ground Ball on a caster blink into135center range",()=>{
  const world=arena(2000);ground(world,500);applyEffect(world,world.units[0],world.units[0],{type:"reposition",direction:"toward",distance:365},{scale:1});expect(ball(world)).toMatchObject({mode:"self",x:365});expect(derive(world.units[0]).armor.bonus).toBe(30);
 });
 it("retains captured R host movement through a leash snap and same-tick host death",()=>{
  const world=arena(1600),host=attachAlly(world);cast(world,"R");forceHost(world,host,900);step(world,[standStill,standStill]);expect(ball(world).mode).toBe("self");expect(world.units[0].memory["orianna:R:x"]).toBe(1400);damagePet(world,world.units[1],host,100000,"true",false);through(world,world.tick+20);expect(damage(world)).toBe(585);
 });
});
