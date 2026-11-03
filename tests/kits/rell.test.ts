import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, beginResurrection, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type Unit, type World } from "../../engine/sim/state";
import Rell from "../../kits/champions/Rell";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const compiled=()=>compileKit(championData("Rell"),records("Rell"),Rell,{},pets("Rell"),runes());
const current=compiled(),idle:Behavior=()=>undefined;
const ability=(key:string)=>current.spec.abilities.find(a=>a.key===key)!;
const subject=(bonus:FighterSpec["bonus"]={})=>({...current.spec,bonus,base:{...current.spec.base,hpRegen:0,resourceRegen:0}});
function arena(distance=100,bonus:FighterSpec["bonus"]={}){const world=createWorld({fighters:[subject(bonus),fighter({id:"enemy",base:{hp:100000,hpRegen:0,resourceRegen:0,armor:0,mr:0,moveSpeed:0}})],distance,modes:["idle","idle"],settings:{log:true,maxSeconds:100,maxBranches:1,reactionTime:10}});world.units[0].x=0;world.units[1].x=distance;world.units[1].spec={...world.units[1].spec,hooks:{onDamageObserved(ctx){if(ctx.ability==="Magnet Storm"){ctx.memory["rell:testRaw"]=Number(ctx.memory["rell:testRaw"]??0)+ctx.raw;ctx.memory["rell:testPackets"]=Number(ctx.memory["rell:testPackets"]??0)+1;}}}};return world;}
const through=(world:World,tick:number)=>{while(world.tick<=tick&&!world.result)step(world,[idle,idle]);};
const cast=(world:World,key:string,distance?:number,direction:1|-1=1)=>startCast(world,world.units[0],ability(key),distance===undefined?undefined:{direction,distance});
const state=(world:World,target:Unit,key:StateType,duration=10)=>applyEffect(world,target,target,{type:"state",state:key,duration},{scale:1});
const shield=(world:World,target:Unit,value=500)=>applyEffect(world,target,target,{type:"shield",amount:{base:value},duration:20},{scale:1});
const mark=(target:Unit,key="rell:mold")=>target.statuses.find(s=>s.key===key);
const totalShield=(target:Unit|Pet)=>(target.statuses??[]).filter(s=>s.kind==="shield").reduce((sum,s)=>sum+s.value,0);
function summon(world:World,x:number,extra:Partial<PetSpec>={},friendly=false){return spawnPet(world,world.units[friendly?0:1],{kind:"body",name:"Actual body",hp:10000,armor:200,mr:300,radius:25,moveSpeed:0,duration:100,...extra},x);}
const contact=(world:World,key="Qhit",pet?:Pet)=>pet?abilityHitPet(world,world.units[0],pet,ability(key),ability(key).onHit??[],"area"):abilityHit(world,...world.units,ability(key),ability(key).onHit??[]);
function basic(world:World,pet?:Pet){startAttack(world,world.units[0],pet);const action=world.units[0].action;expect(action?.kind).toBe("windup");if(action?.kind==="windup")through(world,action.launchTick);}
const prices=(JSON.parse(readFileSync(new URL("../../data/16.21/rules.json",import.meta.url),"utf8"))as{statPrices:StatPrices}).statPrices;

describe("Rell unfiltered full-budget production",()=>{
 it("reflects exact15000gold builds, selected options and all six Darius scenarios",()=>{const own=current.spec,enemy=kit("Darius").spec;const a=simulateMatchup(own,enemy,15000,prices,{settings:{log:true}}),b=simulateMatchup(enemy,own,15000,prices);expect(a.builds).toEqual([b.builds[1],b.builds[0]]);for(const build of [...a.builds,...b.builds]){expect(build.gold).toBe(15000);expect(Math.abs(Object.values(build.spent).reduce((sum,value)=>sum+value,0)-15000)).toBeLessThan(1e-10);}expect(current.variants).toEqual([]);expect(kit("Darius").variants).toEqual([]);expect(a.scenarios).toHaveLength(6);expect(Math.abs(a.score+b.score)).toBeLessThan(1e-10);for(const [i,s]of a.scenarios.entries()){const t=b.scenarios[[1,0,2,3,4,5][i]!]!;if(s.score===undefined)expect(t.score).toBeUndefined();else expect(Math.abs(s.score+t.score!)).toBeLessThan(1e-10);for(const o of s.outcomes)expect([o.seconds,...o.hp,...o.damage].every(Number.isFinite)).toBe(true);}},60000);
 it("finishes full15000gold scenarios against actual Heimerdinger summons",()=>{const value=simulateMatchup(current.spec,kit("Heimerdinger",{upgrade:2}).spec,15000,prices);expect(value.scenarios).toHaveLength(6);for(const build of value.builds){expect(build.gold).toBe(15000);expect(Math.abs(Object.values(build.spent).reduce((sum,cost)=>sum+cost,0)-15000)).toBeLessThan(1e-10);}expect(Number.isFinite(value.score)).toBe(true);for(const s of value.scenarios)for(const o of s.outcomes)expect([o.seconds,...o.hp,...o.damage].every(Number.isFinite)).toBe(true);},60000);
});

describe("Rell mechanics source contracts",()=>{
 it("keeps six independent pins including both W forms and complete exact binary objects",()=>{const rows=records("Rell");expect(rows).toHaveLength(6);expect(rows.filter(row=>row.kind==="W").map(row=>row.page.revid).sort()).toEqual([3976244,4007762]);expect(new Set(current.evidence.filter(row=>row.revid).map(row=>row.revid))).toEqual(new Set([4008009,4050368,4008008,4008010,4007762,3976244]));for(const row of rows){expect(row.sources?.some(source=>source.page.revid===row.page.revid&&source.text.join(" ").includes("|champion"))).toBe(true);expect(row.gameSources?.length).toBeGreaterThan(0);for(const source of row.gameSources??[]){expect(source.sha256).toBe("bb72ce258354afcc80ee1327c4bf4a18f259be6e2d02e63881ca624f280f8783");expect(source.version).toBe("16.21.8342754+branch.releases-16-21.content.release");expect(JSON.parse(source.text[0]!).objectPath).toBe(source.object);}}expect(ability("Q")).toMatchObject({cooldown:9,cost:50,castTime:.4});expect(ability("W")).toMatchObject({cooldown:10,cost:40,castTime:.625});expect(ability("W2")).toMatchObject({cooldownKey:"W",cooldown:10,});});
 it.each(["binary","array","primary"])("fails closed if required%s evidence disappears",change=>{const rows=records("Rell"),p=rows.find(r=>r.kind==="I")!;if(change==="binary")delete p.gameSources;if(change==="array")p.gameSources![0]!.text=p.gameSources![0]!.text.map(t=>t.replace('"values":[5.0,5.0,5.0,5.0,5.0,5.0,5.0]','"values":[4.0,5.0,5.0,5.0,5.0,5.0,5.0]'));if(change==="primary"){p.parts=p.parts.map(part=>({...part,text:part.text.replaceAll("snapshot","changed")}));p.notes=p.notes.map(t=>t.replaceAll("snapshot","changed"));p.sources=p.sources?.map(source=>({...source,text:source.text.map(t=>t.replaceAll("snapshot","changed"))}));}expect(()=>compileKit(championData("Rell"),rows,Rell)).toThrow();});
 it("does not mutate primary records while compiling",()=>{const rows=records("Rell"),before=structuredClone(rows);compileKit(championData("Rell"),rows,Rell);expect(rows).toEqual(before);expect(current.variants).toEqual([]);});
 it("starts mounted with no preduel steal, ally or empowerment",()=>{const world=arena(),self=world.units[0];expect(derive(self).rawMoveSpeed).toBe(self.spec.base.moveSpeed+40);expect(self.memory["rell:dismounted"]).toBe(false);expect(world.pets).toHaveLength(0);expect(self.statuses.some(s=>s.memoKey==="buff:rell:stolenArmor")).toBe(false);expect(derive(self).armor.bonus).toBe(0);});
});

describe("Rell mechanics snapshotted resistance theft",()=>{
 it("steals each stack from the first snapshot even after a large target stat change",()=>{const world=arena(),[self,target]=world.units;target.spec={...target.spec,base:{...target.spec.base,armor:200,mr:300}};contact(world);expect(target.statuses.find(s=>s.memoKey==="rell:moldArmor")?.value).toBe(6);expect(derive(self).armor.bonus).toBe(6);applyEffect(world,target,target,{type:"stat",stat:"armor",amount:flat(800),duration:20},{scale:1});contact(world);expect(target.statuses.find(s=>s.memoKey==="rell:moldArmor")?.value).toBe(12);expect(derive(self).armor.bonus).toBe(12);expect(mark(target)?.value).toBe(2);});
 it("caps at five stacks and refreshes the shared duration without duplicate flat debuffs",()=>{const world=arena(),target=world.units[1];target.spec={...target.spec,base:{...target.spec.base,armor:200,mr:300}};for(let i=0;i<7;i++){world.tick=i;contact(world);}expect(mark(target)?.value).toBe(5);expect(target.statuses.filter(s=>s.memoKey==="rell:moldArmor")).toHaveLength(1);expect(derive(world.units[0]).armor.bonus).toBe(30);expect(mark(target)?.endTick).toBe(156);});
 it("uses the explicit level20 floor for low resistances",()=>{const world=arena();contact(world);expect(derive(world.units[0]).armor.bonus).toBeCloseTo(3.17647058823529);expect(derive(world.units[0]).mr.bonus).toBeCloseTo(3.17647058823529);});
 it("expires stolen totals and resnapshots later contact",()=>{const world=arena(),target=world.units[1];target.spec={...target.spec,base:{...target.spec.base,armor:200,mr:300}};contact(world);through(world,150);expect(derive(world.units[0]).armor.bonus).toBe(0);target.spec={...target.spec,base:{...target.spec.base,armor:400,mr:600}};contact(world);expect(derive(world.units[0]).armor.bonus).toBe(12);});
 it("adds independent actual-pet steals and removes a dead body's contribution",()=>{const world=arena(),a=summon(world,100),b=summon(world,120,{armor:400,mr:600});contact(world,"Qhit",a);contact(world,"Qhit",b);expect(derive(world.units[0]).armor.bonus).toBe(18);a.hp=0;world.units[0].spec.hooks!.onTick!(hookContext(world,world.units[0]));expect(derive(world.units[0]).armor.bonus).toBe(12);expect(derive(petFormulaTarget(b,world.units[0])).armor.base).toBe(400);});
 it.each(["spellShield","parry","stasis","untargetable"]as const)("%s denies spell theft",guard=>{const world=arena();state(world,world.units[1],guard);contact(world);expect(mark(world.units[1])).toBeUndefined();});
 it("excludes minion bodies but includes explicit monsters",()=>{const world=arena(),minion=summon(world,100,{targetClass:"minion"}),monster=summon(world,120,{targetClass:"monster"});contact(world,"Qhit",minion);contact(world,"Qhit",monster);expect((minion.statuses??[]).some(s=>s.key==="rell:mold")).toBe(false);expect((monster.statuses??[]).some(s=>s.key==="rell:mold")).toBe(true);});
 it("clones independent snapshots and debuff amounts",()=>{const world=arena();contact(world);const copy=cloneWorld(world);contact(copy);expect(mark(world.units[1])?.value).toBe(1);expect(mark(copy.units[1])?.value).toBe(2);});
});

describe("Rell mechanics Q and independent E explosion",()=>{
 it("covers the source front and rear rectangle once without projectile interception",()=>{const world=arena(500),rear=summon(world,-200,{armor:0,mr:0}),outside=summon(world,-300,{armor:0,mr:0});state(world,world.units[1],"projectileIntercept");cast(world,"Q");through(world,12);expect(world.units[1].totals.damageTaken).toBe(220);expect(rear.hp).toBe(9780);expect(outside.hp).toBe(10000);expect(world.units[0].x).toBe(100);expect(world.units[0].action).toMatchObject({kind:"cast",ability:"Qlock",endTick:23});});
 it("breaks actual typed shields before damage but preserves monster shields",()=>{const world=arena(),monster=summon(world,120,{armor:0,mr:0,targetClass:"monster"}),pet=summon(world,140,{armor:0,mr:0});shield(world,world.units[1]);petEffects(world,world.units[0],monster,[{type:"shield",amount:flat(500),duration:20}]);petEffects(world,world.units[0],pet,[{type:"shield",amount:flat(500),duration:20}]);cast(world,"Q");through(world,12);expect(totalShield(world.units[1])).toBe(0);expect(world.units[1].totals.damageTaken).toBe(220);expect(totalShield(monster)).toBe(280);expect(monster.hp).toBe(10000);expect(totalShield(pet)).toBe(0);expect(pet.hp).toBe(9780);});
 it.each(["spellShield","parry"]as const)("%s retains ordinary shields and denies Q crowd control",guard=>{const world=arena();shield(world,world.units[1]);state(world,world.units[1],guard);cast(world,"Q");through(world,12);expect(totalShield(world.units[1])).toBe(guard==="parry"?280:500);expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(false);});
 it.each(["root","ground","silence","stun"]as const)("%s received during Q suppresses its lunge without erasing impact",cc=>{const world=arena();cast(world,"Q");applyCC(world,world.units[1],world.units[0],cc,.1);through(world,12);expect(world.units[0].x).toBe(0);expect(world.units[1].totals.damageTaken).toBe(220);});
 it.each(["blind","slow"]as const)("nonimmobilizing%s does not suppress Q lunge",cc=>{const world=arena();applyCC(world,world.units[1],world.units[0],cc,2,.2);cast(world,"Q");through(world,12);expect(world.units[0].x).toBe(100);});
 it("clips immediate lunge at real terrain",()=>{const world=arena();world.terrain.push({id:1,owner:1,from:80,to:120,endTick:100});cast(world,"Q");through(world,12);expect(world.units[0].x).toBe(80-world.units[0].spec.base.pathingRadius);});
 it("casts E without fabricating an ally, chooses visible facing MS and explodes once",()=>{const world=arena(),self=world.units[0];cast(world,"E");through(world,0);expect(world.pets).toHaveLength(0);expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.3);self.facing=-1;through(world,1);expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.15);const hp=world.units[1].hp;basic(world);expect(hp-world.units[1].hp).toBeGreaterThan(7000);const before=world.units[1].hp;attackHit(world,...world.units,false,[]);expect(before-world.units[1].hp).toBeLessThan(1000);});
 it("Q chooses the earlier-created champion contact for its E explosion",()=>{const world=arena(300),first=summon(world,0,{armor:0,mr:0}),far=summon(world,600,{armor:0,mr:0});cast(world,"E");cast(world,"Q");through(world,12);expect(first.hp).toBeLessThan(10000-220);expect(far.hp).toBeLessThan(10000);expect(world.units[0].memory["rell:tilt"]).toBe(0);});
 it("caps only actual monster E packets at the source level20 amount",()=>{const world=arena(2000),monster=summon(world,100,{targetClass:"monster",armor:0,mr:0,hp:100000});cast(world,"E");basic(world,monster);const base=derive(world.units[0]).ad+.05*(derive(world.units[0]).armor.base+derive(world.units[0]).armor.bonus+derive(world.units[0]).mr.base+derive(world.units[0]).mr.bonus);expect(100000-monster.hp).toBeCloseTo(317.647058823529+base,6);});
 it("selects and buffs only a real allied champion body",()=>{const world=arena(),ally=summon(world,200,{targetClass:"champion"},true),minion=summon(world,50,{targetClass:"minion"},true);cast(world,"E");through(world,0);expect(world.units[0].memory["rell:tilt:ally"]).toBe(ally.id);expect((ally.statuses??[]).some(s=>s.memoKey==="rell:allyTiltMS")).toBe(true);expect((minion.statuses??[]).some(s=>s.memoKey==="rell:allyTiltMS")).toBe(false);});
});


describe("Rell mechanics E detects actual visible champion bodies",()=>{
 it("detects a visible explicitly Champion-class clone while the duel champion is hidden",()=>{
   const world=arena(250),self=world.units[0];
   state(world,world.units[1],"invisible");
   const clone=summon(world,200,{targetClass:"champion",unitClass:"clone"});
   cast(world,"E");through(world,0);
   expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.3);
   petEffects(world,world.units[1],clone,[{type:"state",state:"invisible",duration:10}]);
   through(world,1);
   expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.15);
 });
 it.each(["minion","monster","other","unclassified","unclassified-clone"])("does not infer a champion from a %s body",kind=>{
   const world=arena(2000),self=world.units[0];
   summon(world,200,{...(kind==="unclassified-clone"?{unitClass:"clone"as const}:{}),...(["minion","monster","other"].includes(kind)?{targetClass:kind as "minion"|"monster"|"other"}:{})});
   cast(world,"E");through(world,0);
   expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.15);
 });
 it.each(["behind","expired","dead","hidden"])("excludes a real Champion-class body that is %s",kind=>{
   const world=arena(2000),self=world.units[0],clone=summon(world,kind==="behind"?-200:200,{targetClass:"champion",unitClass:"clone"});
   if(kind==="expired")clone.endTick=0;
   if(kind==="dead")clone.hp=0;
   if(kind==="hidden")petEffects(world,world.units[1],clone,[{type:"state",state:"invisible",duration:10}]);
   cast(world,"E");through(world,0);
   expect(self.statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.15);
 });
 it("uses source visibility rather than attack targetability for the movement detector",()=>{
   const world=arena(200);
   state(world,world.units[1],"untargetable");cast(world,"E");through(world,0);
   expect(world.units[0].statuses.find(s=>s.memoKey==="buff:rell:tiltMS")?.value).toBe(.3);
 });
 it("updates the actual ally only after its own movement establishes facing toward the real clone",()=>{
   const world=arena(2000),self=world.units[0],ally=summon(world,200,{targetClass:"champion"},true),clone=summon(world,400,{targetClass:"champion",unitClass:"clone"});
   cast(world,"E");through(world,0);
   expect((ally.statuses??[]).find(s=>s.memoKey==="rell:allyTiltMS")?.value).toBe(.15);
   ally.x+=10;through(world,1);
   expect((ally.statuses??[]).find(s=>s.memoKey==="rell:allyTiltMS")?.value).toBe(.3);
   expect(ally.memory["rell:tiltFacing"]).toBe(1);
   petEffects(world,world.units[1],clone,[{type:"state",state:"invisible",duration:10}]);
   through(world,2);
   expect((ally.statuses??[]).find(s=>s.memoKey==="rell:allyTiltMS")?.value).toBe(.15);
   expect(self.x).toBe(0);expect(world.units[1].x).toBe(2000);
 });
});

const flat=(base:number)=>({base});

describe("Rell mechanics shared W forms and actual contact",()=>{
 it("starts shield/form at declaration and travels concurrently with the source cast",()=>{const world=arena(1000),self=world.units[0],armor=derive(self).armor.base;cast(world,"W",400);expect(self.memory["rell:dismounted"]).toBe(true);expect(totalShield(self)).toBeCloseTo(100+.11*derive(self).maxHp);expect(derive(self).armor.base+derive(self).armor.bonus).toBeCloseTo(armor*1.15);expect(derive(self).rawMoveSpeed).toBe(self.spec.base.moveSpeed);expect(self.action).toMatchObject({kind:"dash",resume:{kind:"cast",ability:"W"}});through(world,9);expect(self.x).toBeGreaterThan(0);expect(self.x).toBeLessThan(400);expect(self.totals.damageDealt).toBe(0);through(world,19);expect(self.x).toBeCloseTo(400);expect(self.action).toMatchObject({kind:"dash",ability:"Wslide"});through(world,34);expect(self.x).toBeCloseTo(720);expect(canCast(world,self,ability("W2"))).toBe(false);});
 it("sweeps slide bodies once with independent stun and airborne guards",()=>{const world=arena(1000),near=summon(world,380,{armor:0,mr:0}),far=summon(world,700,{armor:0,mr:0});cast(world,"W",400);through(world,34);expect(near.hp).toBe(9820);expect(far.hp).toBe(9820);expect((far.statuses??[]).some(s=>s.key==="rell:mold")).toBe(true);});
 it("clips the slide while preserving its duration",()=>{const world=arena(1200);world.terrain.push({id:1,owner:1,from:550,to:700,endTick:100});cast(world,"W",400);through(world,34);expect(world.units[0].x).toBeCloseTo(550-world.units[0].spec.base.pathingRadius,9);});
 it("MountUp removes remaining W shield and resets the real attack timer",()=>{const world=arena();cast(world,"W",100);through(world,35);world.units[0].cooldownReady.W=0;world.units[0].attackReadyTick=1000;cast(world,"W2");expect(world.units[0].memory["rell:dismounted"]).toBe(false);expect(totalShield(world.units[0])).toBe(0);expect(world.units[0].attackReadyTick).toBe(world.tick);expect(world.units[0].cooldownReady.W).toBe(world.tick+300);});
 it("retains invalid MountUp attacks and uses the exact0.2windup",()=>{const world=arena(1000);cast(world,"W",100);through(world,35);world.units[0].cooldownReady.W=0;cast(world,"W2");world.units[1].x=world.units[0].x+200;startAttack(world,world.units[0]);expect(world.units[0].action).toMatchObject({kind:"windup",launchTick:world.tick+6});world.units[1].x=5000;through(world,world.tick+7);expect(world.units[0].memory["rell:mountAttack"]).toBeGreaterThan(world.tick);});
 it.each(["root","ground"]as const)("%s preserves empowered attack/control without invented charge relocation",cc=>{const world=arena(1000);cast(world,"W",100);through(world,35);world.units[0].cooldownReady.W=0;cast(world,"W2");world.units[1].x=world.units[0].x+200;const x=world.units[0].x;applyCC(world,world.units[1],world.units[0],cc,2);basic(world);expect(world.units[0].x).toBe(x);expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(true);});
 it("resurrection remounts and resets W without another shield or attack",()=>{const world=arena();cast(world,"W",100);through(world,35);beginResurrection(world,world.units[0],{duration:1});through(world,world.tick+1);expect(world.units[0].memory["rell:dismounted"]).toBe(false);expect(world.units[0].cooldownReady.W).toBeLessThanOrEqual(world.tick);});
});

describe("Rell mechanics independent R scheduler and kinematics",()=>{
 it("delivers eight primary damage ticks across two seconds and snapshots no binary550damage",()=>{const world=arena(100);cast(world,"R");through(world,7);expect(world.units[1].totals.damageTaken).toBe(0);through(world,68);expect(world.units[1].memory["rell:testRaw"]).toBeCloseTo(350);expect(world.units[1].memory["rell:testPackets"]).toBe(8);expect(world.log.filter(row=>row.text.includes("casts Magnet Storm"))).toHaveLength(1);});
 it("initial spellshield blocks pull but leaves later damage and continuous dragging",()=>{const world=arena(400);state(world,world.units[1],"spellShield");cast(world,"R");through(world,8);expect(hasState(world.units[1],"spellShield")).toBe(false);expect(world.units[1].x).toBe(400);world.units[1].x=350;through(world,9);expect(world.units[1].x).toBe(340);expect(world.units[1].totals.damageTaken).toBe(0);through(world,68);expect(world.units[1].memory["rell:testRaw"]).toBeCloseTo(350);expect(world.units[1].memory["rell:testPackets"]).toBe(8);});
 it("a later spellshield cannot block established pulses",()=>{const world=arena();cast(world,"R");through(world,8);state(world,world.units[1],"spellShield");through(world,68);expect(world.units[1].memory["rell:testRaw"]).toBeCloseTo(350);expect(world.units[1].memory["rell:testPackets"]).toBe(8);expect(hasState(world.units[1],"spellShield")).toBe(true);});
 it("continuous dragging preserves the actual attack windup",()=>{const world=arena(350);state(world,world.units[1],"spellShield");cast(world,"R");through(world,8);world.units[1].x=350;const windup={kind:"windup"as const,startTick:world.tick,launchTick:100,uncancellable:false,blinded:false,onHit:[],bonusRange:0};world.units[1].spec={...world.units[1].spec,attack:{...world.units[1].spec.attack,range:1000}};world.units[1].action=windup;through(world,9);expect(world.units[1].x).toBe(340);expect(world.units[1].action).toBe(windup);});
 it.each(["displacementImmune","ccImmune"]as const)("%s excludes initial pull and later dragging",guard=>{const world=arena(350);state(world,world.units[1],guard);cast(world,"R");through(world,20);expect(world.units[1].x).toBe(350);expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);});
 it("moves an actual pet without moving its owner and respects its airborne immunity",()=>{const world=arena(2000),pet=summon(world,350,{armor:0,mr:0,ccImmune:["airborne"]});cast(world,"R");through(world,9);expect(pet.x).toBeLessThan(350);expect(world.units[1].x).toBe(2000);expect(pet.forced).toBeUndefined();});
 it.each(["E-before-R","R-before-E"])("overlays %s during W without replacing leap completion or delivering R early",order=>{const world=arena(400);cast(world,"W",200);through(world,2);if(order==="E-before-R"){cast(world,"E");cast(world,"R");}else{cast(world,"R");cast(world,"E");}expect(world.units[0].action).toMatchObject({kind:"dash",ability:"W",resume:{kind:"cast",ability:"W"}});through(world,9);expect(world.units[0].memory["rell:storm"]).toBeUndefined();through(world,11);expect(world.units[0].memory["rell:storm"]).toBeGreaterThan(world.tick);through(world,19);expect(world.units[0].action).toMatchObject({kind:"dash",ability:"Wslide"});});
 it("knockdown ends the W flight but preserves its independently committed R deadline",()=>{const world=arena(400);cast(world,"W",200);through(world,2);cast(world,"R");applyCC(world,world.units[1],world.units[0],"airborne",.1);const stopped=world.units[0].x;through(world,12);expect(world.units[0].memory["rell:storm"]).toBeGreaterThan(world.tick);through(world,34);expect(world.units[0].x).toBe(stopped);expect(world.units[0].memory["rell:wLanded"]).toBe(false);});
 it.each(["dash","forced","attached"])("continuous dragging skips an actual%s action",kind=>{const world=arena(350);state(world,world.units[1],"spellShield");cast(world,"R");through(world,8);const target=world.units[1];target.x=350;if(kind==="dash")target.action={kind:"dash",ability:"fixture",startTick:0,endTick:100,perTick:0,stopAtContact:false,unstoppable:false};if(kind==="forced")target.forced={endTick:100,perTick:0};if(kind==="attached")target.attached={offset:350,dir:1,endTick:100};world.units[0].spec.hooks!.onTick!(hookContext(world,world.units[0]));expect(target.x).toBe(350);});
 it("terrain clips kinematic movement without changing a real channel",()=>{const world=arena(350);state(world,world.units[1],"spellShield");cast(world,"R");through(world,8);const target=world.units[1];target.x=350;target.action={kind:"channel",ability:"fixture",startTick:0,endTick:100,nextTick:100,intervalTicks:10};world.terrain.push({id:5,owner:0,from:300,to:315,endTick:100});world.units[0].spec.hooks!.onTick!(hookContext(world,world.units[0]));expect(target.x).toBe(350);expect(target.action.kind).toBe("channel");});
 it("death cancels a pending overlay impact",()=>{const world=arena(400);cast(world,"W",200);through(world,2);cast(world,"R");dealDamage(world,world.units[1],world.units[0],1e9,"true");through(world,20);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[0].memory["rell:storm:pending"]).toBeUndefined();});
});

describe("Rell mechanics ordinary behavior and clone state",()=>{
 it.each(["hold","trade"]as const)("%s reserves ready R and completed trades retreat",mode=>{const world=arena();world.modes[0]=mode;expect(canCast(world,world.units[0],ability("R"))).toBe(true);expect(current.spec.behavior!(perceive(world,0))).not.toMatchObject({kind:"cast",ability:"R"});world.units[0].memory.tradeDone=true;expect(current.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});});
 it("flee starts a real E and idle remains idle",()=>{const world=arena();world.modes[0]="flee";expect(current.spec.behavior!(perceive(world,0))).toEqual({kind:"cast",ability:"E"});world.modes[0]="idle";expect(current.spec.behavior!(perceive(world,0))).toBeUndefined();});
 it("keeps cloned form/entitlement/deadline state independent",()=>{const world=arena();cast(world,"E");const copy=cloneWorld(world);copy.units[0].memory["rell:tilt"]=0;expect(world.units[0].memory["rell:tilt"]).toBe(150);});
 it("reflects ordinary mirror geometry without a nonfinite result",()=>{const result=fairFight({fighters:[subject(),subject()],distance:500,modes:["fight","fight"],settings:{maxSeconds:5,maxBranches:1}});expect(result.damage[0]).toBeCloseTo(result.damage[1],8);expect(Number.isFinite(result.seconds)).toBe(true);});
});
