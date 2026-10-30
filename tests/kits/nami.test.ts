import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startCast } from "../../engine/sim/actions";
import { perceive, threatsTo } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, attackHit, canSee, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { petCombatHit } from "../../engine/sim/petCombat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Nami from "../../kits/champions/Nami";
import { championData, records } from "./helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";

const compiled=compileKit(championData("Nami"),records("Nami"),Nami);
const ability=(key:string):AbilitySpec=>compiled.spec.abilities.find(spell=>spell.key===key)!;
function arena(x=500,ap=100):World{
 const world=createWorld({fighters:[{...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap}},fighter({base:{hp:50000,armor:0,mr:0,hpRegen:0,moveSpeed:0}})],distance:0,modes:["idle","idle"],settings:{maxSeconds:60,maxBranches:1,log:true}});
 world.units[0].x=0;world.units[1].x=x;return world;
}
function through(world:World,tick:number){while(world.tick<=tick&&!world.result)step(world,[standStill,standStill]);}
function cast(world:World,key:string,aim?:{direction:1|-1;distance?:number}){return startCast(world,world.units[0],ability(key),aim);}
function state(world:World,key:StateType,seconds=10,self=false){applyEffect(world,world.units[self?0:1],world.units[self?0:1],{type:"state",state:key,duration:seconds},{scale:1});}
function pet(world:World,x:number,owner:0|1=0,overrides:Partial<PetSpec>={}):Pet{return spawnPet(world,world.units[owner],{kind:"actual-body",name:"Actual champion",targetClass:"champion",hp:10000,armor:0,mr:0,radius:35,moveSpeed:0,duration:60,...overrides},x);}
const count=(world:World,body?:Pet)=>Number((body?.memory??world.units[0].memory)["nami:blessing:0:count"]??0);
const rawMove=(world:World)=>derive(world.units[0]).rawMoveSpeed;

describe("Nami pinned source and reference allocation",()=>{
 it("retains all five exact raw primary revisions and exact binary attribution",()=>{
  expect(new Set(compiled.evidence.filter(row=>row.revid).map(row=>row.revid))).toEqual(new Set([3985614,4007696,4007697,4042884,3712330]));
  expect(compiled.evidence.filter(row=>row.url).length).toBeGreaterThan(0);
  for(const row of records("Nami")){expect(row.notes.some(note=>note.includes("Ability data"))).toBe(true);expect(row.gameSources?.every(source=>source.object.startsWith("Characters/Nami/")&&source.text.length>0)).toBe(true);}
 });
 it("reads maximum-rank damage, resource costs and separate proc restrictions",()=>{
  const world=arena(),damage=ability("Q").onHit![0]!;if(damage.type!=="damage")throw new Error("Missing source Q damage");expect(evaluate(damage.amount,world.units[0])).toBe(360);
  expect(ability("W").cost).toBe(90);expect(ability("E").cost).toBe(75);expect(ability("R").cost).toBe(100);
  expect(ability("E-proc").flags).toMatchObject({spellShield:false,parry:true,petContactHooks:true});
 });
 it("prices real self procs and one self-heal without inventing allied stats",()=>{
  const world=arena(),self=world.units[0],hint=compiled.spec.budget!;
  expect(hint.damage!(self,world.units[1])!.magic).toBeGreaterThan(0);
  expect(hint.healing!(self,world.units[1])).toBeCloseTo(195*.95/10);
  expect(compiled.assumptions.join(" ")).toContain("69.8824%");expect(compiled.assumptions.join(" ")).toContain("No imaginary third champion");
 });
});

describe("Nami Surging Tides",()=>{
 it("starts without free movement or blessing history",()=>{const world=arena();expect(rawMove(world)).toBe(335);expect(count(world)).toBe(0);});
 it("grants a sourced125 flat bonus and decays over45 actual ticks",()=>{
  const world=arena();cast(world,"E");expect(rawMove(world)).toBe(460);through(world,15);expect(rawMove(world)).toBeCloseTo(335+125*30/45);through(world,45);expect(rawMove(world)).toBe(335);
 });
 it("keeps recipient soft caps after the flat bonus",()=>{const world=arena();cast(world,"E");expect(derive(world.units[0]).moveSpeed).toBeLessThan(rawMove(world));expect(derive(world.units[0]).moveSpeed).toBeGreaterThan(400);});
 it("uses empowered-wave priority even when a fresh ordinary buff is stronger",()=>{
  const world=arena(1000);cast(world,"R");through(world,55);const due=Number(world.units[0].memory["nami:tides:wave:end"]);cast(world,"E");expect(rawMove(world)).toBeCloseTo(335+250*(due-world.tick)/45);expect(rawMove(world)).toBeLessThan(460);
 });
 it("resumes an overlapping ordinary buff at full strength after the wave expires",()=>{
  const world=arena(2000);cast(world,"R");through(world,44);cast(world,"E");through(world,60);expect(rawMove(world)).toBe(460);through(world,75);expect(rawMove(world)).toBeCloseTo(335+125*.5);through(world,90);expect(rawMove(world)).toBe(335);
 });
 it("grants E movement only to the actual chosen allied champion body",()=>{
  const world=arena(),body=pet(world,200);cast(world,"E-ally");expect(count(world,body)).toBe(3);expect(count(world)).toBe(0);expect(body.statuses?.some(status=>status.key==="moveSpeedFlat")).toBe(true);expect(rawMove(world)).toBe(335);
 });
 it.each([undefined,"minion","monster","other"] as const)("does not fabricate an eligible ally from%s classification",targetClass=>{
  const world=arena();pet(world,200,0,{targetClass});expect(canCast(world,world.units[0],ability("E-ally"))).toBe(false);expect(canCast(world,world.units[0],ability("W-ally"))).toBe(false);
 });
});

describe("Nami Aqua Prison",()=>{
 it("uses the primary cast and0.726 fixed-time flight before a centered landing",()=>{
  const world=arena(500);cast(world,"Q");through(world,7);expect(world.zones).toHaveLength(0);through(world,8);expect(world.zones).toHaveLength(1);expect(world.missiles.some(m=>m.source==="Q-flight")).toBe(true);
  expect(world.units[1].hp).toBe(50000);through(world,29);expect(world.units[1].hp).toBe(50000);through(world,30);expect(world.units[1].hp).toBe(49640);expect(world.units[1].statuses.find(status=>status.key==="suspension")?.endTick).toBe(75);
 });
 it("keeps standard sight from exposing an invisible victim",()=>{
  const world=arena();cast(world,"Q");through(world,8);state(world,"invisible");through(world,30);expect(world.units[1].statuses.some(status=>status.key==="standardSight")).toBe(true);expect(world.units[1].statuses.some(status=>status.key==="revealed")).toBe(false);expect(canSee(world.units[1],world.units[0])).toBe(false);
 });
 it("shortens suspension with tenacity without shortening the initial flight",()=>{
  const world=arena();applyEffect(world,world.units[1],world.units[1],{type:"state",state:"tenacity",value:.5,duration:10},{scale:1});cast(world,"Q");through(world,30);expect(world.units[1].statuses.find(status=>status.key==="suspension")?.endTick).toBe(53);
 });
 it("leaves a center more than200 from the ground point untouched despite its edge",()=>{
  const world=arena(1001);cast(world,"Q",{direction:1,distance:800});through(world,35);expect(world.units[1].hp).toBe(50000);expect(world.units[1].statuses.some(status=>status.key==="suspension")).toBe(false);
 });
 it("lets an actual projectile wall destroy the bubble and its associated landing",()=>{
  const world=arena();world.zones.push({id:world.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:250,radius:10,startTick:0,endTick:100});cast(world,"Q");through(world,40);expect(world.units[1].hp).toBe(50000);expect(world.zones.some(zone=>zone.ability==="Q")).toBe(false);
 });
 it("still supplies ally movement when the hostile recipient spell-shields the landing",()=>{
  const world=arena();const body=pet(world,500);state(world,"spellShield");cast(world,"Q");through(world,30);expect(world.units[1].hp).toBe(50000);expect(body.statuses?.some(status=>status.key==="moveSpeedFlat")).toBe(true);
 });
 it("grants ally movement in the explicitly uncertain225center radius",()=>{
  const world=arena(500),inside=pet(world,724),outside=pet(world,726);cast(world,"Q");through(world,30);expect(inside.statuses?.some(status=>status.key==="moveSpeedFlat")).toBe(true);expect(outside.statuses?.some(status=>status.key==="moveSpeedFlat")).toBe(false);
 });
 it("an already released bubble can land after Nami dies",()=>{
  const world=arena();cast(world,"Q");through(world,8);dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,35);expect(world.units[0].alive).toBe(false);expect(world.units[1].hp).toBe(49640);
 });
});

describe("Nami Ebb and Flow actual alternating recipients",()=>{
 it("pays90mana once and damages the actual initial target before one self-heal bounce",()=>{
  const world=arena(),self=world.units[0];self.hp-=500;const mana=self.resource;cast(world,"W");through(world,14);expect(world.units[1].hp).toBe(49750);expect(self.hp).toBeCloseTo(derive(self).maxHp-500);through(world,25);expect(self.hp).toBeCloseTo(derive(self).maxHp-500+185.25);expect(self.resource).toBe(mana-90);
 });
 it("self-cast heals first and supplies exactly one real hostile bounce",()=>{
  const world=arena(),self=world.units[0];self.hp-=500;cast(world,"W-self");through(world,8);expect(self.hp).toBeCloseTo(derive(self).maxHp-305);through(world,25);expect(world.units[1].hp).toBeCloseTo(50000-237.5);expect(world.missiles.filter(m=>m.source==="W-bounce")).toHaveLength(0);
 });
 it("does not invent the third recipient in an ordinary solo duel",()=>{
  const world=arena();cast(world,"W");through(world,80);expect(world.units[1].hp).toBe(49750);expect(world.missiles).toHaveLength(0);
 });
 it("uses additive60%third-bounce effectiveness with actual third ally at0AP",()=>{
  const world=arena(500,0),body=pet(world,500);body.hp-=500;world.units[0].hp-=500;cast(world,"W-self");through(world,40);expect(body.hp).toBeCloseTo(9500+155*.6);expect(world.units[1].hp).toBe(49840);
 });
 it("permits a shielded first enemy to become the actual final recipient again",()=>{
  const world=arena();state(world,"spellShield");cast(world,"W");through(world,40);expect(world.units[1].hp).toBeCloseTo(50000-250*.9);expect(world.units[1].statuses.some(status=>status.key==="spellShield")).toBe(false);
 });
 it("keeps a parried recipient visited so it cannot receive the final bounce again",()=>{
  const world=arena();state(world,"parry",.8);cast(world,"W");through(world,50);expect(world.units[1].hp).toBe(50000);expect(world.missiles).toHaveLength(0);
 });
 it("uses current spatial bounce range rather than inventing a remote ally",()=>{
  const world=arena(900);world.units[0].hp-=500;cast(world,"W-self");through(world,35);expect(world.units[1].hp).toBe(50000);expect(world.missiles).toHaveLength(0);
 });
 it.each(["range","visibility","death","untargetable"] as const)("cancels invalid initial%s enemy for free",reason=>{
  const world=arena(),self=world.units[0],enemy=world.units[1],mana=self.resource;cast(world,"W");if(reason==="range")enemy.x=900;if(reason==="visibility")state(world,"invisible");if(reason==="death")enemy.alive=false;if(reason==="untargetable")state(world,"untargetable");through(world,8);expect(self.resource).toBe(mana);expect(self.cooldownReady.W).toBeUndefined();expect(world.missiles).toHaveLength(0);
 });
 it("cancels an actual ally that leaves the declared cast range for free",()=>{
  const world=arena(),self=world.units[0],body=pet(world,200),mana=self.resource;cast(world,"W-ally");body.x=900;through(world,8);expect(self.resource).toBe(mana);expect(self.cooldownReady.W).toBeUndefined();expect(world.missiles).toHaveLength(0);
 });
 it("initial ally flight uses2500speed and heals only its captured actual body",()=>{
  const world=arena(2000),first=pet(world,500),second=pet(world,400);first.hp-=500;second.hp-=500;cast(world,"W-ally",{direction:1,distance:500});through(world,12);expect(first.hp).toBe(9500);through(world,15);expect(first.hp).toBeCloseTo(9695);expect(second.hp).toBe(9500);
 });
 it("an intercepted ally flight supplies no heal or subsequent bounce",()=>{
  const world=arena(2000),body=pet(world,500);body.hp-=500;world.zones.push({id:world.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:250,radius:10,startTick:0,endTick:100});cast(world,"W-ally");through(world,25);expect(body.hp).toBe(9500);expect(world.missiles).toHaveLength(0);
 });
});

describe("Nami Tidecaller's Blessing real stock and proc defenses",()=>{
 it("grants three hits and consumes exactly one per connected basic",()=>{
  const world=arena();cast(world,"E");for(let i=0;i<4;i++)attackHit(world,world.units[0],world.units[1],false,[]);expect(count(world)).toBe(0);expect(world.units[1].hp).toBeCloseTo(50000-4*derive(world.units[0]).ad-300);
 });
 it("uses current NamiAP and40%slow without critical scaling",()=>{
  const world=arena();cast(world,"E");world.units[0].spec={...world.units[0].spec,bonus:{ap:200,critChance:1}};attackHit(world,world.units[0],world.units[1],false,[]);expect(world.units[1].statuses.find(status=>status.key==="slow")?.value).toBeCloseTo(.45);expect(world.units[1].hp).toBeCloseTo(50000-derive(world.units[0]).ad*2-120);
 });
 it.each(["blind","dodgeAttacks","parry"] as const)("a%s avoided basic spends no connected entitlement",guard=>{
  const world=arena();cast(world,"E");if(guard!=="blind")state(world,guard);attackHit(world,world.units[0],world.units[1],guard==="blind",[]);expect(count(world)).toBe(3);
 });
 it("a damage-only block consumes the basic entitlement while denying its distinct proc",()=>{
  const world=arena();cast(world,"E");state(world,"blockAttacks");attackHit(world,world.units[0],world.units[1],false,[]);expect(count(world)).toBe(2);expect(world.units[1].hp).toBe(50000);
 });
 it("spell shield does not consume or stop a separate basic proc",()=>{
  const world=arena();cast(world,"E");state(world,"spellShield");attackHit(world,world.units[0],world.units[1],false,[]);expect(count(world)).toBe(2);expect(world.units[1].statuses.some(status=>status.key==="spellShield")).toBe(true);expect(world.units[1].hp).toBeCloseTo(50000-derive(world.units[0]).ad-100);
 });
 it("one Q cast proc covers multiple real victims but costs one stock",()=>{
  const world=arena(),body=pet(world,500,1,{targetClass:"minion"});cast(world,"E");cast(world,"Q");through(world,30);expect(count(world)).toBe(2);expect(world.units[1].hp).toBe(49540);expect(body.hp).toBeCloseTo(10000-360-69.8824);
 });
 it("a defended root spell keeps stock and root defense ordering explicit",()=>{
  const world=arena();cast(world,"E");state(world,"spellShield");cast(world,"Q");through(world,30);expect(count(world)).toBe(3);expect(world.units[1].hp).toBe(50000);
 });
 it("Jax-style dodge denies proc without making the parent Q area dodgeable",()=>{
  const world=arena();cast(world,"E");state(world,"dodgeAttacks");cast(world,"Q");through(world,30);expect(count(world)).toBe(2);expect(world.units[1].hp).toBe(49640);expect(world.units[1].statuses.some(status=>status.key==="suspension")).toBe(true);
 });
 it("uses one stock for a real allied whole basic rather than each damage packet",()=>{
  const world=arena(),body=pet(world,100,0,{attack:{range:125,interval:1,attackLike:true,effects:[]}});cast(world,"E-ally");petCombatHit(world,body,world.units[1],[{type:"damage",damageType:"true",amount:{base:10}},{type:"damage",damageType:"true",amount:{base:20}}],true);expect(count(world,body)).toBe(2);expect(world.units[1].hp).toBe(49870);
 });
 it("an allied nonbasic pet packet has no fabricated cast entitlement",()=>{
  const world=arena(),body=pet(world,100);cast(world,"E-ally");petCombatHit(world,body,world.units[1],[{type:"damage",damageType:"true",amount:{base:10}}],false);expect(count(world,body)).toBe(3);expect(world.units[1].hp).toBe(49990);
 });
 it("expires at the exactsix-second boundary and branches keep independent stock",()=>{
  const world=arena();cast(world,"E");const branch=cloneWorld(world);attackHit(branch,branch.units[0],branch.units[1],false,[]);expect(count(branch)).toBe(2);expect(count(world)).toBe(3);world.tick=180;attackHit(world,world.units[0],world.units[1],false,[]);expect(world.units[1].hp).toBeCloseTo(50000-derive(world.units[0]).ad);
 });
 it("a previously blessed actual ally retains its real stock after Nami dies",()=>{
  const world=arena(),body=pet(world,100,0,{persistsAfterOwnerDeath:true,attack:{range:125,interval:1,attackLike:true,effects:[]}});cast(world,"E-ally");dealDamage(world,world.units[1],world.units[0],100000,"true");
  petCombatHit(world,body,world.units[1],[{type:"damage",damageType:"true",amount:{base:10}}],true);expect(count(world,body)).toBe(2);expect(world.units[1].hp).toBe(49890);expect(world.units[0].hp).toBeLessThanOrEqual(0);
 });
 it("continues an actual ally's released passive decay during post-death aftermath",()=>{
  const world=arena(),body=pet(world,100,0,{persistsAfterOwnerDeath:true});cast(world,"E-ally");cast(world,"Q");through(world,8);const mana=world.units[0].resource;dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,15);
  expect(body.statuses?.find(status=>status.key==="moveSpeedFlat")?.value).toBeCloseTo(125*30/45);expect(world.units[0].resource).toBe(mana);expect(world.units[0].alive).toBe(false);
 });
});

describe("Nami Tidal Wave and ordinary policy",()=>{
 it("announces the actual first-frame wave payload and grants self double movement at completion",()=>{
  const world=arena(1500);cast(world,"R");through(world,15);expect(rawMove(world)).toBe(585);expect(world.missiles.find(m=>m.source==="R")?.onHit.some(effect=>effect.type==="damage"&&effect.label?.startsWith("nami:R:"))).toBe(true);expect(threatsTo(world,1).some(threat=>threat.ability?.key==="R")).toBe(true);
 });
 it("uses actual wave travel for the separate slow and retains half-second airborne",()=>{
  const world=arena(1000);cast(world,"R");through(world,50);const airborne=world.units[1].statuses.find(status=>status.key==="airborne"),slow=world.units[1].statuses.find(status=>status.key==="slow");expect(airborne).toBeDefined();expect(slow).toBeDefined();expect(airborne!.endTick-airborne!.startTick).toBe(15);expect(slow!.value).toBe(.7);expect(slow!.endTick-slow!.startTick).toBe(Math.round((2+2*(1000-65-250)/2750)*30));
 });
 it("wave crossings grant the doubled passive once to the actual ally",()=>{
  const world=arena(2000),body=pet(world,600);cast(world,"R");through(world,45);expect(body.memory["nami:tides:wave:amount"]).toBe(250);const start=body.memory["nami:tides:wave:start"];through(world,50);expect(body.memory["nami:tides:wave:start"]).toBe(start);
 });
 it("does not confuse trajectory vision with stealth revelation",()=>{
  const world=arena();state(world,"invisible");cast(world,"R");through(world,40);expect(world.units[1].hp).toBe(49590);expect(canSee(world.units[1],world.units[0])).toBe(false);
 });
 it("ordinary fight policy activates blessing and uses real Q/W/R while respecting resources",()=>{
  const world=arena(),behavior=compiled.spec.behavior!,view=perceive(world,0);world.modes[0]="fight";expect(behavior(perceive(world,0))).toEqual({kind:"cast",ability:"E"});world.units[0].resource=0;expect(behavior(perceive(world,0))?.kind).not.toBe("cast");expect(view.self).toBe(world.units[0]);
 });
 it.each(["hold","trade"] as const)("%s reserves the long ultimate",mode=>{const world=arena();world.modes[0]=mode;world.units[0].cooldownReady.E=1000;world.units[0].cooldownReady.Q=1000;world.units[0].cooldownReady.W=1000;expect(compiled.spec.behavior!(perceive(world,0))).not.toEqual({kind:"cast",ability:"R"});});
 it("completed trades retreat before starting another spell",()=>{const world=arena();world.modes[0]="trade";world.units[0].memory.tradeDone=true;expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});});
 it("renews an expired but unused blessing instead of treating old stock as permanently active",()=>{
  const world=arena();cast(world,"E");world.tick=330;world.modes[0]="fight";expect(count(world)).toBe(3);expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"cast",ability:"E"});
 });
 it("ordinary autonomous combat executes all four roots without reading sealed source objects",()=>{
  const world=arena();world.modes[0]="fight";for(let tick=0;tick<150&&!world.result;tick++)step(world,[compiled.spec.behavior!,standStill]);
  for(const key of ["Q","W","E","R"])expect(Number(world.units[0].cooldownReady[key])).toBeGreaterThan(0);
  expect(world.units[1].hp).toBeLessThan(49000);expect(Number.isFinite(world.units[0].resource)).toBe(true);
 });
 it("keeps autonomous travel, control, stock and damage mirrored across the arena",()=>{
  const forward=arena(),reverse=createWorld({fighters:[fighter({base:{hp:50000,armor:0,mr:0,hpRegen:0,moveSpeed:0}}),{...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus:{ap:100}}],distance:0,modes:["idle","fight"],settings:{maxSeconds:60,maxBranches:1,log:true,firstMover:1}});
  forward.modes[0]="fight";reverse.units[0].x=0;reverse.units[1].x=500;
  for(let tick=0;tick<150;tick++){step(forward,[compiled.spec.behavior!,standStill]);step(reverse,[standStill,compiled.spec.behavior!]);}
  expect(forward.units[1].hp).toBeCloseTo(reverse.units[0].hp,9);expect(forward.units[0].hp).toBeCloseTo(reverse.units[1].hp,9);expect(forward.units[0].resource).toBeCloseTo(reverse.units[1].resource,9);expect(count(forward)).toBe(Number(reverse.units[1].memory["nami:blessing:1:count"]));
 });
});
