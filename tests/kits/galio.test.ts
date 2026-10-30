import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type Unit, type World } from "../../engine/sim/state";
import Galio from "../../kits/champions/Galio";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const compiled=compileKit(championData("Galio"),records("Galio"),Galio);
const ability=(key:string):AbilitySpec=>compiled.spec.abilities.find(a=>a.key===key)!;
function worldFor(x=300,ap=100,mr=0,hp=0):World {
 const world=createWorld({fighters:[{...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap,mr,hp}},fighter({base:{hp:20000,armor:0,mr:0,hpRegen:0,moveSpeed:0}})],distance:0,modes:["idle","idle"],settings:{log:true}});
 world.units[0].x=0;world.units[1].x=x;return world;
}
function braumWorld(x=825,side:0|1=0):World {
 const galio={...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap:100}},source=kit("Braum").spec,braum={...source,base:{...source.base,hp:20000,mr:0,hpRegen:0,resourceRegen:0,moveSpeed:0}};
 const world=createWorld({fighters:side===0?[galio,braum]:[braum,galio],distance:0,modes:["idle","idle"],settings:{log:true}});
 world.units[side].x=0;world.units[1-side]!.x=side===0?x:-x;return world;
}
const raiseE=(world:World,side:0|1=1,direction:1|-1=1)=>startCast(world,world.units[side],world.units[side].spec.abilities.find(a=>a.key==="E")!,{direction});
const through=(world:World,tick:number)=>{while(world.tick<=tick&&!world.result)step(world,[standStill,standStill]);};
const cast=(world:World,key:string,aim?:{direction:1|-1;distance?:number})=>startCast(world,world.units[0],ability(key),aim);
const state=(world:World,target:Unit,key:StateType,duration=20)=>applyEffect(world,target,target,{type:"state",state:key,duration},{scale:1});
const basic=(world:World,critChance=0)=>attackHit(world,world.units[0],world.units[1],false,[],undefined,false,{critChance});
function summon(world:World,x:number,extra:Partial<PetSpec>={},friendly=false):Pet{return spawnPet(world,world.units[friendly?0:1],{kind:"fixture",name:"Actual body",hp:10000,armor:0,mr:0,radius:35,moveSpeed:0,duration:20,...extra},x);}
const shield=(unit:Unit)=>unit.statuses.filter(s=>s.kind==="shield").reduce((sum,s)=>sum+s.value,0);
const passiveBase=126.764705882353;

describe("Galio pinned source and numeric contract",()=>{
 it("retains all five primary pins, parsed fields, full templates and exact game objects",()=>{
  const rows=records("Galio");expect(new Set(compiled.evidence.filter(e=>e.revid).map(e=>e.revid))).toEqual(new Set([4016963,4038336,4016962,4017997,3990299]));
  const game=compiled.evidence.filter(e=>e.url);expect(game.length).toBeGreaterThanOrEqual(18);
  expect(game.every(e=>e.sourceVersion==="16.20.8248524+branch.releases-16-20.content.release"&&e.sourceSha256==="2f6af50833ece8ab8541363464cc288a55f40d36c169a70fcaa790056a80f508")).toBe(true);
  for(const row of rows){expect(row.notes.some(note=>note.includes("Ability data"))).toBe(true);expect(row.sources!.some(source=>source.page.revid===row.page.revid&&source.text.join(" ").includes("Ability data"))).toBe(true);expect(row.gameSources!.every(source=>source.object.startsWith("Characters/Galio/")&&source.text.length>0)).toBe(true);}
  const e=rows.find(row=>row.kind==="E")!;expect(e.fields.targetRange!.text).toBe("250 - 650");expect(e.fields.targetRange!.values).toHaveLength(1);
  expect(ability("E").delivery).toMatchObject({kind:"dash",distance:650,minDistance:250,speed:2300});
 });
 it("reads rank-five/three formulas and static passive values during build",()=>{
  const data=new KitContext(championData("Galio"),records("Galio"));
  expect(data.ability("I").levelValue("next basic attack")).toBe(passiveBase);
  expect(data.ability("Q").formula("Magic Damage")).toEqual({base:210,ratios:{AP:.7}});
  expect(data.ability("W").formula("Magic Shield Strength")).toEqual({base:0,ratios:{maxHP:.135}});
  expect(data.ability("E").formula("Magic Damage")).toEqual({base:240,ratios:{AP:1}});
  expect(data.ability("R").formula("Magic Damage")).toEqual({base:350,ratios:{AP:.7,bonusMR:1}});
  expect(["Q","W","E","R"].map(key=>[ability(key).cooldown,ability(key).cost,ability(key).castTime])).toEqual([[7,80,.25],[14,50,0],[7,50,.4],[140,100,0]]);
 });
 it.each(["Q","E","R"])("fails closed without %s exact pinned game evidence",slot=>{const changed=structuredClone(records("Galio"));delete changed.find(row=>row.kind===slot)!.gameSources;expect(()=>compileKit(championData("Galio"),changed,Galio)).toThrow("pinned game data");});
 it("reads full spline endpoints and preserves source disagreements as explicit limits",()=>{
  const text=compiled.assumptions.join(" ");expect(text).toContain("backward displacement/speed");expect(text).toContain("primary150cap");expect(text).toContain("no R damage/shield budget");expect(text).toContain("physical AP ratio differs");
  expect(compiled.evidence.some(e=>e.text.includes('"mControlPoint1":[0.2720096707344055,0.0,1.0743502378463745]'))).toBe(true);
 });
});

describe("Colossal Smash actual on-hit and cooldown",()=>{
 it("starts ready and replaces physical AD with its primary basic magic packet",()=>{const world=worldFor(300,100,50),self=world.units[0];basic(world);expect(world.units[1].totals.damageTaken).toBeCloseTo(passiveBase+derive(self).ad+40+30);expect(self.memory["galio:smash:ready"]).toBe(150);basic(world);expect(world.units[1].totals.damageTaken).toBeCloseTo(passiveBase+2*derive(self).ad+70);});
 it("only the AD ratio critically strikes for200%, regardless of ordinary crit damage",()=>{const world=worldFor();world.units[0].spec={...world.units[0].spec,base:{...world.units[0].spec.base,critDamageModifier:.5}};basic(world,1);expect(world.units[1].totals.damageTaken).toBeCloseTo(passiveBase+2*derive(world.units[0]).ad+40);});
 it("applies attached physical on-hits twice without converting their damage",()=>{const world=worldFor();world.units[0].spec={...world.units[0].spec,attack:{...world.units[0].spec.attack,onHit:[{type:"damage",damageType:"physical",amount:{base:17}}]}};basic(world);expect(world.units[1].totals.damageTaken).toBeCloseTo(passiveBase+derive(world.units[0]).ad+40+34);});
 it.each(["dodgeAttacks","parry","blockAttacks"] as const)("%s preserves the empowered primary",guard=>{const world=worldFor();state(world,world.units[1],guard);basic(world);expect(world.units[0].memory["galio:smash:ready"]).toBeUndefined();expect(world.units[1].totals.damageTaken).toBe(0);});
 it("blind misses preserve the passive and spell shields do not block it",()=>{const world=worldFor();attackHit(world,world.units[0],world.units[1],true,[]);expect(world.units[0].memory["galio:smash:ready"]).toBeUndefined();state(world,world.units[1],"spellShield");basic(world);expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);expect(world.units[1].statuses.some(s=>s.key==="spellShield")).toBe(true);});
 it("marks an actual ready windup uncancellable and removes only its temporary AS on spend",()=>{const world=worldFor(100),self=world.units[0],before=derive(self).attackSpeed;startAttack(world,self);expect(self.action).toMatchObject({kind:"windup",uncancellable:true});basic(world);expect(before-derive(self).attackSpeed).toBeCloseTo(self.spec.base.attackSpeed.ratio*.4);self.action=undefined;world.tick=150;through(world,150);expect(derive(self).attackSpeed).toBeCloseTo(before);});
 it("uses the actual pet primary and independently guarded secondary area",()=>{const world=worldFor(300),pet=summon(world,200),guarded=summon(world,210);guarded.statuses!.push({kind:"state",key:"parry",source:1,startTick:0,endTick:99,value:0});resolveAttackOnPet(world,world.units[0],pet,false,[],{});const amount=passiveBase+derive(world.units[0]).ad+40;expect(10000-pet.hp).toBeCloseTo(amount);expect(world.units[1].totals.damageTaken).toBeCloseTo(amount);expect(guarded.hp).toBe(10000);});
 it("hit-count ward-like props do not consume the passive",()=>{const world=worldFor(),pet=summon(world,100,{hitPoints:true,hp:3});resolveAttackOnPet(world,world.units[0],pet,false,[],{});expect(pet.hp).toBe(2);expect(world.units[0].memory["galio:smash:ready"]).toBeUndefined();});
 it("reduces the current clock by3seconds on real champion contact even through spell shielding, once per cast",()=>{const world=worldFor(825);basic(world);state(world,world.units[1],"spellShield");cast(world,"Q");through(world,50);expect(world.units[0].memory["galio:smash:ready"]).toBe(60);expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);});
 it.each([false,true])("only an explicit actual epic-monster classification supplies the source cooldown reset (epic=%s)",epic=>{
  const world=worldFor(2000),self=world.units[0],pet=summon(world,825,{targetClass:"monster",epicMonster:epic});self.memory["galio:smash:ready"]=150;
  pet.statuses!.push({kind:"state",key:"spellShield",source:1,startTick:0,endTick:200,value:0});cast(world,"Q",{direction:1,distance:825});through(world,120);
  expect(self.memory["galio:smash:ready"]).toBe(epic?60:150);expect(pet.statuses!.some(status=>status.key==="spellShield")).toBe(false);expect(pet.hp).toBeCloseTo(9400);
  expect(Object.keys(self.memory).filter(key=>key.startsWith("galio:smash:reduced:Q:"))).toHaveLength(epic?1:0);
 });
 it("nonchampion bodies and unclassified monsters do not provide champion or epic-monster resets",()=>{const world=worldFor(2000),pet=summon(world,500,{targetClass:"monster"});world.units[0].memory["galio:smash:ready"]=150;cast(world,"Q",{direction:1,distance:500});through(world,50);expect(pet.hp).toBeLessThan(10000);expect(world.units[0].memory["galio:smash:ready"]).toBe(150);});
});

describe("Winds of War paired finite flight and persistent tornado",()=>{
 it("releases two actual off-axis blasts from the end-of-cast position",()=>{const world=worldFor(825);cast(world,"Q");through(world,7);expect(world.missiles).toHaveLength(0);world.units[0].x=100;through(world,8);expect(world.missiles).toHaveLength(2);expect(world.missiles.map(m=>m.x)).toEqual([0,0]);expect(world.missiles.map(m=>world.units[0].memory[`galio:q:${m.id}:lateral`])).toEqual([-250,250]);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("shares gust damage once then creates one actual moving tornado with four half-second hits",()=>{const world=worldFor(825);cast(world,"Q");through(world,50);expect(world.units[1].totals.damageTaken).toBeCloseTo(280+600);const tornado=world.missiles.find(m=>m.source==="Qtornado")!;expect(tornado).toBeDefined();const born=Number(world.units[0].memory[`galio:tornado:${tornado.id}:start`]);expect(tornado.x).toBeCloseTo(825+50*(50-born)/30);through(world,born+60);expect(world.units[1].totals.damageTaken).toBeCloseTo(280+4*600);expect(world.missiles).toHaveLength(0);});
 it("spell shielding blocks the shared gust but leaves persistent damage and the cooldown reduction",()=>{const world=worldFor(825);state(world,world.units[1],"spellShield");cast(world,"Q");through(world,120);expect(world.units[1].totals.damageTaken).toBeCloseTo(2400);expect(world.log.filter(row=>row.text.includes("spell shield blocks Winds of War"))).toHaveLength(1);});
 it("a real projectile wall prevents both arrivals and the tornado",()=>{const world=worldFor(825);world.zones.push({id:999,owner:1,kind:"projectileWall",x:400,radius:0,seenTick:0,startTick:0,endTick:200});cast(world,"Q");through(world,120);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.missiles).toHaveLength(0);expect(world.units[0].memory["galio:q:arrived:1"]).toBeUndefined();});
 it("one independently destroyed flight cannot form a tornado",()=>{const world=worldFor(825);cast(world,"Q");through(world,8);world.missiles[0]!.ended=true;through(world,120);expect(Object.keys(world.units[0].memory).filter(key=>key.startsWith("galio:tornado:"))).toHaveLength(0);});
 it("uses each actual pet's maximum health, monster cap and persistent category",()=>{const world=worldFor(2000),monster=summon(world,825,{targetClass:"monster"}),minion=summon(world,825,{targetClass:"minion",hp:1000}),protectedPet=summon(world,825,{areaTaken:.4});cast(world,"Q",{direction:1,distance:825});through(world,120);expect(10000-monster.hp).toBeCloseTo(280+4*150);expect(1000-minion.hp).toBeCloseTo(280+4*30);expect(10000-protectedPet.hp).toBeCloseTo(280*.4+4*300*.4);});
 it.each(["stasis","untargetable","parry"] as const)("%s guards each actual contact",guard=>{const world=worldFor(825);state(world,world.units[1],guard);cast(world,"Q");through(world,120);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("retains released flight and tornado damage through caster death",()=>{const world=worldFor(825);cast(world,"Q");through(world,9);dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,120);expect(world.units[1].totals.damageTaken).toBeCloseTo(2680);});
 it("keeps flight groups and tornados independent across a cloned branch",()=>{const world=worldFor(825);cast(world,"Q");through(world,9);const branch=cloneWorld(world);branch.units[1].x=2000;through(world,120);through(branch,120);expect(world.units[1].totals.damageTaken).toBeCloseTo(2680);expect(branch.units[1].totals.damageTaken).toBe(0);expect(branch.units[0].memory).not.toBe(world.units[0].memory);});
});

describe("Galio real-cast ground origins",()=>{
 it.each([-1,1] as const)("passive secondary cleave originates at its actual pet primary for Braum facing%s",facing=>{
  const world=braumWorld(50),[self,target]=world.units,pet=summon(world,100,{targetClass:"minion"}),origins:number[]=[],contact=self.spec.hooks!.onAbilityContact;
  self.spec={...self.spec,hooks:{...self.spec.hooks,onAbilityContact(ctx){if(ctx.ability.key==="Icleave")origins.push(ctx.originX);return contact?.(ctx);}}};
  raiseE(world,1,facing===1?-1:1);expect(target.facing).toBe(facing);resolveAttackOnPet(world,self,pet,false,[],{});
  const amount=passiveBase+derive(self).ad+40;expect(10000-pet.hp).toBeCloseTo(amount);expect(target.totals.damageTaken).toBeCloseTo(facing===1?0:amount);expect(target.memory["braum:eFirstTick"]===undefined).toBe(facing!==1);expect(origins).toEqual([100]);
 });
 it.each([-1,1] as const)("tornado damage uses its moving center for Braum facing%s and real pet contacts",facing=>{
  const world=braumWorld(),[self,target]=world.units,observed:Array<{pet?:number;origin:number}>=[],contact=self.spec.hooks!.onAbilityContact;
  self.spec={...self.spec,hooks:{...self.spec.hooks,onAbilityContact(ctx){if(ctx.ability.key==="Qtornado")observed.push({pet:ctx.enemy.petId,origin:ctx.originX});return contact?.(ctx);}}};
  cast(world,"Q");while(!world.missiles.some(m=>m.source==="Qtornado")&&world.tick<70)step(world,[standStill,standStill]);
  const tornado=world.missiles.find(m=>m.source==="Qtornado")!;expect(tornado).toBeDefined();
  const start=Number(self.memory[`galio:tornado:${tornado.id}:start`]),next=Number(self.memory[`galio:tornado:${tornado.id}:next`]),origin=Number(self.memory[`galio:tornado:${tornado.id}:origin`])+50*(next-start)/30;
  target.x=tornado.x-100;const pet=summon(world,target.x,{targetClass:"minion"}),before=target.totals.damageTaken;raiseE(world,1,facing===1?-1:1);expect(target.facing).toBe(facing);
  through(world,next);expect(target.totals.damageTaken-before).toBeCloseTo(facing===1?0:600);expect(target.memory["braum:eFirstTick"]).toBe(facing===1?next:undefined);
  expect(pet.hp).toBeCloseTo(9700);expect(observed).toHaveLength(2);expect(observed.some(row=>row.pet===pet.id)).toBe(true);for(const row of observed)expect(row.origin).toBeCloseTo(origin);
 });
 it.each([-1,1] as const)("terrain-blocked R impact uses its frozen landing center for Braum facing%s and pets",facing=>{
  const world=braumWorld(500),[self,target]=world.units,observed:Array<{pet?:number;origin:number}>=[],contact=self.spec.hooks!.onAbilityContact;
  self.spec={...self.spec,hooks:{...self.spec.hooks,onAbilityContact(ctx){if(ctx.ability.key==="Rlanding")observed.push({pet:ctx.enemy.petId,origin:ctx.originX});return contact?.(ctx);}}};
  summon(world,700,{targetClass:"champion"},true);const pet=summon(world,600,{targetClass:"minion"});world.terrain.push({id:999,owner:1,from:300,to:400,endTick:200});raiseE(world,1,facing===1?-1:1);cast(world,"R");through(world,68);
  expect(self.x).toBeCloseTo(300-self.spec.base.pathingRadius);expect(target.facing).toBe(facing);expect(target.totals.damageTaken).toBeCloseTo(facing===1?0:420);expect(target.memory["braum:eFirstTick"]===undefined).toBe(facing!==1);
  expect(pet.hp).toBeCloseTo(9580);expect(observed).toHaveLength(2);expect(observed.some(row=>row.pet===pet.id)).toBe(true);expect(observed.every(row=>row.origin===700)).toBe(true);
 });
});

describe("Galio curved windblast interception",()=>{
 it.each([0,1] as const)("resolves actual front body contacts once and stops both windblasts before tornado formation for side%s",side=>{
  const world=braumWorld(825,side),self=world.units[side],target=world.units[1-side]!,ended:string[]=[],end=self.spec.hooks?.onMissileEnd;
  self.spec={...self.spec,hooks:{...self.spec.hooks,onMissileEnd(ctx){ended.push(ctx.reason);end?.(ctx);}}};self.memory["galio:smash:ready"]=150;
  raiseE(world,(1-side) as 0|1);startCast(world,self,ability("Q"),{direction:1,distance:825});through(world,8);const gusts=[...world.missiles];expect(gusts).toHaveLength(2);through(world,90);
  expect(gusts.every(m=>m.intercepted&&m.ended)).toBe(true);expect(ended).toEqual(["intercepted","intercepted"]);expect(world.missiles).toHaveLength(0);expect(Object.keys(self.memory).some(key=>key.startsWith("galio:tornado:"))).toBe(false);
  expect(Object.keys(self.memory).filter(key=>key.startsWith("galio:q:hit:")&&key.endsWith(":champion"))).toHaveLength(1);expect(self.memory["galio:smash:ready"]).toBe(60);expect(target.memory["braum:eFirstTick"]).toBeDefined();expect(target.totals.damageTaken).toBe(0);
  for(const gust of gusts)expect(Math.hypot(gust.x-target.x,Number(self.memory[`galio:q:${gust.id}:lateral`]))).toBeCloseTo(gust.radius!+target.spec.base.radius);
 });
 it("does not intercept an off-axis gust merely because its scalar envelope crosses Braum",()=>{
  const world=braumWorld(200),[self,target]=world.units;raiseE(world);cast(world,"Q",{direction:1,distance:825});through(world,8);const gusts=[...world.missiles];through(world,45);
  expect(gusts.every(m=>m.ended&&!m.intercepted)).toBe(true);expect(world.missiles.some(m=>m.source==="Qtornado")).toBe(true);expect(target.totals.damageTaken).toBe(0);expect(target.memory["braum:eFirstTick"]).toBeUndefined();expect(Object.keys(self.memory).some(key=>key.startsWith("galio:q:hit:")&&key.endsWith(":champion"))).toBe(false);
 });
 it("lets rear-side gusts reach their endpoints and form the actual tornado",()=>{
  const world=braumWorld(),[self,target]=world.units;raiseE(world,1,-1);cast(world,"Q");through(world,8);const gusts=[...world.missiles];while(!world.missiles.some(m=>m.source==="Qtornado")&&world.tick<70)step(world,[standStill,standStill]);
  expect(gusts.every(m=>m.ended&&!m.intercepted)).toBe(true);expect(world.missiles.some(m=>m.source==="Qtornado")).toBe(true);expect(target.totals.damageTaken).toBeCloseTo(280);expect(target.memory["braum:eFirstTick"]).toBeUndefined();expect(Object.keys(self.memory).filter(key=>key.startsWith("galio:q:hit:")&&key.endsWith(":champion"))).toHaveLength(1);
 });
 it("keeps shielded collision hooks and denies gust or tornado damage to a body behind Braum",()=>{
  const world=braumWorld(),[self,target]=world.units,protectedPet=summon(world,target.x,{targetClass:"minion"});self.memory["galio:smash:ready"]=150;raiseE(world);state(world,target,"spellShield");cast(world,"Q");through(world,90);
  expect(target.statuses.some(status=>status.key==="spellShield")).toBe(false);expect(target.memory["braum:eFirstTick"]).toBeDefined();expect(self.memory["galio:smash:ready"]).toBe(60);expect(target.totals.damageTaken).toBe(0);expect(protectedPet.hp).toBe(10000);expect(world.log.filter(row=>row.text.includes("spell shield blocks Winds of War"))).toHaveLength(1);expect(Object.keys(self.memory).some(key=>key.startsWith("galio:tornado:"))).toBe(false);
 });
});

describe("Shield of Durand magic shield and charged taunt",()=>{
 it("starts with a magic-only13.5%shield that never absorbs physical or true damage",()=>{const world=worldFor(),self=world.units[0],before=self.hp,total=shield(self),resist=derive(self).mr.base;expect(total).toBeCloseTo(derive(self).maxHp*.135);dealDamage(world,world.units[1],self,100,"true");expect(shield(self)).toBe(total);expect(self.hp).toBe(before-100);dealDamage(world,world.units[1],self,100,"magic");expect(shield(self)).toBeCloseTo(total-100*100/(100+resist));});
 it("recharges a partially depleted shield exactly eight seconds after the last incoming absorbed packet",()=>{const world=worldFor(),self=world.units[0],full=shield(self);dealDamage(world,world.units[1],self,100,"magic");through(world,239);expect(shield(self)).toBeLessThan(full);through(world,240);expect(shield(self)).toBeCloseTo(full);});
 it("physical incoming damage restarts recharge without consuming the magic shield",()=>{const world=worldFor(),self=world.units[0];dealDamage(world,world.units[1],self,100,"magic");through(world,100);dealDamage(world,world.units[1],self,100,"physical");through(world,340);expect(shield(self)).toBeLessThan(derive(self).maxHp*.135);through(world,341);expect(shield(self)).toBeCloseTo(derive(self).maxHp*.135);});
 it("snapshots distinct primary physical/magic reductions with bonusMR and bonusHP scaling",()=>{const world=worldFor(300,100,50,1000),self=world.units[0];cast(world,"W");expect(derive(self).physicalReduction).toEqual([.225+.015+.02+.05]);expect(derive(self).magicReduction).toEqual([.45+.04+.04+.1]);expect(self.action).toMatchObject({kind:"channel",ability:"W"});});
 it("releases a minimum tap and full charge with independently scaled damage, taunt and static60speed",()=>{const tap=worldFor(150);cast(tap,"W");cast(tap,"W2");expect(tap.units[1].totals.damageTaken).toBeCloseTo(90);expect(tap.units[1].statuses.find(s=>s.key==="taunt")!.endTick).toBe(15);expect(derive(tap.units[1]).moveSpeed).toBe(60);const full=worldFor(300);cast(full,"W");through(full,38);cast(full,"W2");expect(full.units[1].totals.damageTaken).toBeCloseTo(270);expect(full.units[1].statuses.find(s=>s.key==="taunt")!.endTick-full.tick).toBe(45);expect(full.units[0].memory.lockedUntil).toBe(full.tick+12);expect(canCast(full,full.units[0],ability("Q"))).toBe(false);});
 it("auto-releases at2seconds and refreshes the reductions for2seconds",()=>{const world=worldFor(300);cast(world,"W");through(world,60);expect(world.units[1].totals.damageTaken).toBeCloseTo(270);expect(world.units[0].action).toBeUndefined();expect(world.units[0].statuses.find(s=>s.memoKey==="galio:charge:magic")!.endTick).toBe(120);through(world,120);expect(derive(world.units[0]).magicReduction).toHaveLength(0);});
 it("only silence interrupts W's channel; stun alone preserves its absolute charge",()=>{const world=worldFor(300);cast(world,"W");applyEffect(world,world.units[1],world.units[0],{type:"cc",cc:"stun",duration:.5},{scale:1});expect(world.units[0].action).toMatchObject({kind:"channel",ability:"W"});through(world,20);applyEffect(world,world.units[1],world.units[0],{type:"cc",cc:"silence",duration:1},{scale:1});expect(world.units[0].action).toBeUndefined();expect(world.units[1].totals.damageTaken).toBeGreaterThan(90);});
 it("damages/taunts actual Champion-class summons, leaving minions untouched",()=>{const world=worldFor(2000),champ=summon(world,150,{targetClass:"champion"}),minion=summon(world,150,{targetClass:"minion"});cast(world,"W");cast(world,"W2");expect(champ.hp).toBeCloseTo(9910);expect(champ.statuses!.some(s=>s.key==="taunt")).toBe(true);expect(minion.hp).toBe(10000);});
 it("spell shielding denies both W damage and taunt, slow immunity denies static speed only",()=>{const world=worldFor(150);state(world,world.units[1],"spellShield");cast(world,"W");cast(world,"W2");expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[1].statuses.some(s=>s.key==="taunt")).toBe(false);const immune=worldFor(150);state(immune,immune.units[1],"slowImmune");cast(immune,"W");cast(immune,"W2");expect(immune.units[1].statuses.some(s=>s.key==="taunt")).toBe(true);expect(immune.units[1].statuses.some(s=>s.key==="moveSpeedOverride")).toBe(false);});
 it("removes static speed when slow immunity is subsequently gained",()=>{const world=worldFor(150);cast(world,"W");cast(world,"W2");state(world,world.units[1],"slowImmune");through(world,0);expect(world.units[1].statuses.some(s=>s.key==="moveSpeedOverride")).toBe(false);});
 it("caster death cancels the unreleased taunt without a free damage packet",()=>{const world=worldFor(150);cast(world,"W");dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,70);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[0].memory["galio:charge"]).toBeUndefined();});
});

describe("Justice Punch actual forward dash contacts",()=>{
 it("keeps the0.4second cast then moves2300units/second and never substitutes250for650",()=>{const world=worldFor(2000);cast(world,"E",{direction:1,distance:650});through(world,11);expect(world.units[0].x).toBe(0);through(world,13);expect(world.units[0].x).toBeCloseTo(2300/30);through(world,30);expect(world.units[0].x).toBeCloseTo(650);});
 it("stops at the first real champion body even through a spell shield",()=>{const world=worldFor(600),pet=summon(world,300,{targetClass:"champion"});pet.statuses!.push({kind:"state",key:"spellShield",source:1,startTick:0,endTick:200,value:0});cast(world,"E",{direction:1,distance:650});through(world,30);expect(world.units[0].x).toBeCloseTo(300-world.units[0].spec.base.pathingRadius-pet.spec.radius);expect(pet.hp).toBe(10000);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("nonchampions take80%once and do not stop the dash or redirect later contacts to their owner",()=>{const world=worldFor(650),pet=summon(world,200,{targetClass:"minion"});cast(world,"E",{direction:1,distance:650});through(world,30);expect(10000-pet.hp).toBeCloseTo(272);expect(world.units[1].totals.damageTaken).toBeCloseTo(340);expect(world.units[0].x).toBeCloseTo(650-world.units[0].spec.base.pathingRadius-world.units[1].spec.base.pathingRadius);expect(pet.statuses!.some(s=>s.key==="airborne")).toBe(true);});
 it("terrain clips the forward dash before a remote enemy",()=>{const world=worldFor(1000);world.terrain.push({id:99,owner:1,from:300,to:400,endTick:200});cast(world,"E",{direction:1,distance:650});through(world,30);expect(world.units[0].x).toBeCloseTo(300-world.units[0].spec.base.pathingRadius);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("uses target-local spell shields, parry and displacement immunity",()=>{const world=worldFor(600),pet=summon(world,200,{targetClass:"minion"});pet.statuses!.push({kind:"state",key:"parry",source:1,startTick:0,endTick:200,value:0});state(world,world.units[1],"displacementImmune");cast(world,"E",{direction:1,distance:650});through(world,30);expect(pet.hp).toBe(10000);expect(world.units[1].totals.damageTaken).toBeCloseTo(340);expect(world.units[1].statuses.some(s=>s.key==="airborne")).toBe(false);});
 it("grounding prevents declaration and anti-dash contact can terminate the actual dash",()=>{const world=worldFor(600);applyEffect(world,world.units[1],world.units[0],{type:"cc",cc:"ground",duration:1},{scale:1});expect(canCast(world,world.units[0],ability("E"))).toBe(false);const stop=worldFor(600);stop.units[1].statuses.push({kind:"state",key:"antiDash",source:1,startTick:0,endTick:200,value:400,effects:[{type:"cc",cc:"airborne",duration:1}]});cast(stop,"E",{direction:1,distance:650});through(stop,30);expect(stop.units[0].x).toBeLessThan(500);expect(stop.units[0].action).toBeUndefined();});
 it.each([0,1] as const)("reflects the source direction at exact overlap for side%s",side=>{const target=fighter({base:{hp:20000,armor:0,mr:0,hpRegen:0,moveSpeed:0}}),world=createWorld({fighters:side===0?[compiled.spec,target]:[target,compiled.spec],distance:0,modes:["idle","idle"]});world.units[0].x=0;world.units[1].x=0;startCast(world,world.units[side],ability("E"));through(world,30);expect(world.units[side].memory["galio:e:direction"]).toBe(side===0?1:-1);expect(world.units[1-side]!.totals.damageTaken).toBeGreaterThan(0);});
});

describe("Hero's Entrance requires an actual friendly Champion-class target",()=>{
 it("cannot cast or budget R in an ordinary1v1, even with allied minions or a clone-looking name",()=>{const world=worldFor();expect(canCast(world,world.units[0],ability("R"))).toBe(false);summon(world,200,{name:"Friendly champion clone",unitClass:"clone",targetClass:"minion"},true);expect(canCast(world,world.units[0],ability("R"))).toBe(false);expect(ability("R").budgetExcluded).toBe(true);});
 it("uses only actual source-classified allied Champion bodies, shields them and freezes the cast location",()=>{const world=worldFor(700),ally=summon(world,700,{targetClass:"champion",unitClass:"clone"},true),minion=summon(world,700,{targetClass:"minion"},true),remote=summon(world,2000,{targetClass:"champion"},true);expect(canCast(world,world.units[0],ability("R"))).toBe(true);cast(world,"R");expect(ally.statuses!.find(s=>s.kind==="shield")!.value).toBeCloseTo(derive(world.units[0]).maxHp*.135);expect(minion.statuses).toHaveLength(0);expect(remote.statuses).toHaveLength(0);ally.x=2000;through(world,68);expect(world.units[0].x).toBeCloseTo(700);expect(world.units[1].totals.damageTaken).toBeCloseTo(420);expect(world.units[1].statuses.some(s=>s.key==="airborne")).toBe(true);expect(world.units[0].statuses.some(s=>s.key==="untargetable")).toBe(false);});
 it("rejects expired, dead, invisible or out-of-range actual allied bodies",()=>{for(const kind of ["expired","dead","hidden","range"]){const world=worldFor(),ally=summon(world,200,{targetClass:"champion"},true);if(kind==="expired")ally.endTick=0;if(kind==="dead")ally.hp=0;if(kind==="range")ally.x=6000;if(kind==="hidden")ally.statuses!.push({kind:"state",key:"invisible",source:0,startTick:0,endTick:200,value:0});expect(canCast(world,world.units[0],ability("R")),kind).toBe(false);}});
 it("root and ground interrupt the initial R channel while its cooldown remains spent",()=>{for(const cc of ["root","ground","silence"] as const){const world=worldFor();summon(world,200,{targetClass:"champion"},true);cast(world,"R");applyEffect(world,world.units[1],world.units[0],{type:"cc",cc,duration:1},{scale:1});expect(world.units[0].action,cc).toBeUndefined();expect(world.units[0].cooldownReady.R).toBe(4200);expect(world.units[0].memory["galio:entrance"]).toBeUndefined();}});
 it("becomes untargetable/CCimmune at1.25seconds and destroys actual enemy homing projectiles",()=>{const world=worldFor();summon(world,700,{targetClass:"champion"},true);cast(world,"R");world.missiles.push({id:999,owner:1,source:"attack",seenTick:0,x:5000,perTick:1,homing:true,direction:-1,travelLeft:Infinity,projectile:true,connects:true,scale:1,onHit:[]});through(world,38);expect(world.units[0].statuses.some(s=>s.key==="untargetable")).toBe(true);expect(world.missiles.some(m=>m.id===999)).toBe(false);applyEffect(world,world.units[1],world.units[0],{type:"cc",cc:"stun",duration:1},{scale:1});expect(world.units[0].action).toMatchObject({kind:"channel",ability:"R"});});
 it("impact still lands at the target's frozen location if terrain blocks Galio's travel",()=>{const world=worldFor(700);summon(world,700,{targetClass:"champion"},true);world.terrain.push({id:99,owner:1,from:300,to:400,endTick:200});cast(world,"R");through(world,68);expect(world.units[0].x).toBeCloseTo(300-world.units[0].spec.base.pathingRadius);expect(world.units[1].totals.damageTaken).toBeCloseTo(420);});
 it("observes the minimum100dash and landing/channel locks then expires immunity",()=>{const world=worldFor(1000);summon(world,0,{targetClass:"champion"},true);cast(world,"R");through(world,68);expect(world.units[0].x).toBeCloseTo(100);expect(canCast(world,world.units[0],ability("Q"))).toBe(false);through(world,83);expect(world.units[0].action).toBeUndefined();expect(world.units[0].statuses.some(s=>s.key==="ccImmune")).toBe(false);});
 it("death/resurrection cannot retain an entrance or charged W in an independently cloned branch",()=>{const world=worldFor(700);summon(world,700,{targetClass:"champion"},true);cast(world,"R");through(world,10);const branch=cloneWorld(world);branch.units[0].resurrection={endTick:50};dealDamage(branch,branch.units[1],branch.units[0],100000,"true");expect(branch.units[0].memory["galio:entrance"]).toBeUndefined();through(world,83);expect(world.units[1].totals.damageTaken).toBeCloseTo(420);expect(branch.units[1].totals.damageTaken).toBe(0);});
});

describe("Galio ordinary15,000gold scenarios and production regression",()=>{
 it("retreats first after a completed trade and keeps R reserved during hold/trade",()=>{const world=worldFor();world.modes[0]="trade";world.units[0].memory.tradeDone=true;expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});for(const mode of ["hold","trade"] as const){world.modes[0]=mode;delete world.units[0].memory.tradeDone;summon(world,200,{targetClass:"champion"},true);expect(compiled.spec.behavior!(perceive(world,0))).not.toEqual({kind:"cast",ability:"R"});}const mix=compiled.spec.budget!.damage!(world.units[0],world.units[1]);expect(Object.values(mix).every(Number.isFinite)).toBe(true);expect(mix.magic).toBeGreaterThan(0);});
 it("production six-scenario Darius reversal preserves exact15,000gold builds and scores",()=>{
  const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices,opponent=kit("Darius").spec;
  const forward=simulateMatchup(compiled.spec,opponent,15000,prices,{settings:{log:true}}),reverse=simulateMatchup(opponent,compiled.spec,15000,prices);
  expect(forward.scenarios).toHaveLength(6);expect(forward.builds).toEqual([reverse.builds[1],reverse.builds[0]]);expect(Math.abs(forward.score+reverse.score)).toBeLessThanOrEqual(1e-10);
  const reflect=[1,0,2,3,4,5];for(const [index,scenario]of forward.scenarios.entries()){const other=reverse.scenarios[reflect[index]!]!;if(scenario.score===undefined)expect(other.score).toBeUndefined();else expect(Math.abs(scenario.score+other.score!)).toBeLessThanOrEqual(1e-10);expect(scenario.outcomes.every(outcome=>Number.isFinite(outcome.seconds)&&outcome.hp.every(Number.isFinite))).toBe(true);}
  const casts=forward.scenarios.flatMap(scenario=>scenario.outcomes.flatMap(outcome=>outcome.timeline.filter(row=>row.side===0&&row.text.startsWith("casts ")).map(row=>row.text)));
  for(const key of ["Q","W","E"])expect(casts.some(text=>text.includes(ability(key).name))).toBe(true);expect(casts.some(text=>text.includes(ability("R").name))).toBe(false);
 },60000);
 it("production60second case contacts actual Heimerdinger pets with finite outcomes",()=>{
  const heimer=kit("Heimerdinger").spec,world=createWorld({fighters:[compiled.spec,heimer],distance:300,modes:["fight","fight"],settings:{maxSeconds:60,log:true}}),result=runWorld(world);
  expect(result.seconds).toBeLessThanOrEqual(60);expect(result.hp.every(Number.isFinite)).toBe(true);expect(result.damage.every(Number.isFinite)).toBe(true);expect(result.timeline.some(row=>row.text.includes("Turret"))).toBe(true);expect(result.timeline.some(row=>row.side===0&&row.text.includes("hits "))).toBe(true);expect(result.timeline.some(row=>row.side===0&&row.text.includes(ability("R").name))).toBe(false);
 },60000);
});
