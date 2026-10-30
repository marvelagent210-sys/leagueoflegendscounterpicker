import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, beginResurrection, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Aim, type Pet, type Unit, type World } from "../../engine/sim/state";
import Braum from "../../kits/champions/Braum";
import { ability as fixtureAbility, fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const idle: Behavior = () => undefined;
const compile = (data=records("Braum")) => compileKit(championData("Braum"),data,Braum);
const compiled = compile();
const ability = (key:string):AbilitySpec => compiled.spec.abilities.find(a=>a.key===key)!;
const worldFor = (distance=300,bonus:FighterSpec["bonus"]={}) => {
 const world=createWorld({fighters:[{...compiled.spec,base:{...compiled.spec.base,hpRegen:0,resourceRegen:0},bonus},fighter({base:{hp:20000,hpRegen:0,armor:0,mr:0,moveSpeed:0}})],distance:0,modes:["idle","idle"],settings:{log:true,maxSeconds:30}});
 world.units[0].x=0;world.units[1].x=distance;return world;
};
const through=(world:World,tick:number)=>{while(world.tick<=tick&&!world.result)step(world,[idle,idle]);};
const cast=(world:World,key:string,aim?:Aim)=>startCast(world,world.units[0],ability(key),aim);
const state=(world:World,target:Unit,key:StateType,duration=10)=>applyEffect(world,target,target,{type:"state",state:key,duration},{scale:1});
const basic=(world:World,blinded=false)=>attackHit(world,world.units[0],world.units[1],blinded,[]);
const mark=(target:Unit,key="braum:concussive")=>target.statuses.find(s=>s.key===key&&s.source===0);
const summon=(world:World,x:number,owner:0|1=1,extra:Partial<PetSpec>={}):Pet=>spawnPet(world,world.units[owner],{kind:"fixture",name:"Actual fixture body",hp:10000,armor:0,mr:0,radius:35,moveSpeed:0,duration:30,...extra},x);

describe("Braum unfiltered full-budget production",()=>{
 it("runs six scenarios with exact reversed builds and strict scores against Darius",()=>{
  const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8"))as{statPrices:StatPrices}).statPrices;
  const forward=simulateMatchup(compiled.spec,kit("Darius").spec,15000,prices),reverse=simulateMatchup(kit("Darius").spec,compiled.spec,15000,prices);
  expect(forward.scenarios).toHaveLength(6);expect(forward.builds).toEqual([reverse.builds[1],reverse.builds[0]]);expect(Math.abs(forward.score+reverse.score)).toBeLessThan(1e-10);
  for(const[i,s]of forward.scenarios.entries()){const other=reverse.scenarios[[1,0,2,3,4,5][i]!]!;if(s.score===undefined)expect(other.score).toBeUndefined();else expect(Math.abs(s.score+other.score!)).toBeLessThan(1e-10);expect(s.outcomes.every(o=>[o.seconds,...o.hp,...o.damage].every(Number.isFinite))).toBe(true);}
  for(const build of forward.builds){expect(build.gold).toBe(15000);expect(Math.abs(Object.values(build.spent).reduce((a,b)=>a+b,0)-15000)).toBeLessThan(1e-10);}
 },60000);
 it("runs ordinary six-scenario production against actual Heimerdinger pets",()=>{
  const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8"))as{statPrices:StatPrices}).statPrices,result=simulateMatchup(compiled.spec,kit("Heimerdinger").spec,15000,prices);
  expect(result.scenarios).toHaveLength(6);for(const s of result.scenarios)for(const o of s.outcomes)expect([o.seconds,...o.hp,...o.damage].every(Number.isFinite)).toBe(true);
 },60000);
});

describe("Braum source contract",()=>{
 it("retains all five exact pins and complete attributed binary arrays",()=>{
  const rows=records("Braum");expect(rows.map(r=>r.page.revid).sort()).toEqual([4012056,4038222,4007579,4007580,3906582].sort());
  for(const row of rows){expect(row.sources?.some(s=>s.page.revid===row.page.revid&&s.text.some(t=>t.includes("|champion     = Braum")&&t.includes("|notes")))).toBe(true);for(const source of row.gameSources!){expect(source.url).toBe("https://raw.communitydragon.org/16.20/game/data/characters/braum/braum.bin.json");expect(source.version).toBe("16.20.8248524+branch.releases-16-20.content.release");expect(source.sha256).toBe("021c833daa1083bad73c9be385ccbb98c8c89498a15d8a6fc7511ff6b58bc0e6");expect(JSON.parse(source.text[0]!).objectPath).toBe(source.object);}}
  expect(rows.flatMap(r=>r.gameSources??[])).toHaveLength(7);expect(compiled.assumptions.join(" ")).toContain("unsupported boundary");
 });
 it("fails closed if exact game evidence is missing",()=>{const rows=records("Braum");delete rows[0]!.gameSources;expect(()=>compile(rows)).toThrow("pinned game data");});
 it("reads primary level20 formulas without mutating source records",()=>{const rows=records("Braum"),before=structuredClone(rows);const value=compile(rows);expect(rows).toEqual(before);expect(ability("Q").cooldown).toBe(6);expect(ability("W").cooldown).toBe(8);expect(ability("E").cooldown).toBe(8);expect(ability("R").cooldown).toBe(100);expect(value.variants).toEqual([]);});
});

describe("Braum target-local Concussive Blows",()=>{
 it("starts empty and the fourth real basic procs216 magic and1.75second stun",()=>{const world=worldFor(100),target=world.units[1];expect(mark(target)).toBeUndefined();for(let i=0;i<3;i++)basic(world);expect(mark(target)?.value).toBe(3);basic(world);expect(mark(target)).toBeUndefined();expect(mark(target,"braum:concussiveImmune")?.endTick).toBe(120);expect(target.statuses.find(s=>s.key==="stun")?.endTick).toBe(53);expect(target.totals.damageTaken).toBeCloseTo(derive(world.units[0]).ad*4+216);});
 it("adds only basic40% damage during each recipient's immunity and no Q bonus",()=>{const world=worldFor(100),target=world.units[1];for(let i=0;i<4;i++)basic(world);const before=target.totals.damageTaken;basic(world);expect(target.totals.damageTaken-before).toBeCloseTo(derive(world.units[0]).ad+86.4);const hp=target.hp;abilityHit(world,world.units[0],target,ability("Q"),ability("Q").onHit!);expect(hp-target.hp).toBeCloseTo(255+.025*derive(world.units[0]).maxHp);expect(mark(target)).toBeUndefined();});
 it("expires stacks after4seconds and refreshes their own duration",()=>{const world=worldFor(100),target=world.units[1];basic(world);world.tick=90;basic(world);expect(mark(target)?.endTick).toBe(210);world.tick=210;basic(world);expect(mark(target)?.value).toBe(1);});
 it.each(["dodgeAttacks","blockAttacks","parry"]as const)("%s denies own passive stacks",guard=>{const world=worldFor(100);state(world,world.units[1],guard);basic(world);expect(mark(world.units[1])).toBeUndefined();});
 it("blind misses deny stacks while invulnerability preserves a valid nonblocked onhit",()=>{const world=worldFor(100);basic(world,true);expect(mark(world.units[1])).toBeUndefined();state(world,world.units[1],"invulnerable");basic(world);expect(mark(world.units[1])?.value).toBe(1);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("spell shield guards the fourth proc without negating the ordinary basic",()=>{const world=worldFor(100);for(let i=0;i<3;i++)basic(world);state(world,world.units[1],"spellShield");const before=world.units[1].hp;basic(world);expect(before-world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad);expect(hasState(world.units[1],"spellShield")).toBe(false);expect(mark(world.units[1],"braum:concussiveImmune")).toBeDefined();expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(false);});
 it("stun immunity prevents control without deleting proc damage or cooldown",()=>{const world=worldFor(100);state(world,world.units[1],"ccImmune");for(let i=0;i<4;i++)basic(world);expect(world.units[1].totals.damageTaken).toBeCloseTo(derive(world.units[0]).ad*4+216);expect(world.units[1].statuses.some(s=>s.key==="stun")).toBe(false);expect(mark(world.units[1],"braum:concussiveImmune")).toBeDefined();});
 it("keeps actual pet stacks and proc recipient separate from the owner",()=>{const world=worldFor(2000),pet=summon(world,100),target=petFormulaTarget(pet,world.units[0],world.tick);for(let i=0;i<4;i++)attackHit(world,world.units[0],target,false,[]);expect(pet.hp).toBeCloseTo(10000-derive(world.units[0]).ad*4-216);expect(pet.statuses?.some(s=>s.key==="braum:concussiveImmune")).toBe(true);expect(pet.statuses?.some(s=>s.key==="braum:concussive")).toBe(false);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[1].statuses).toHaveLength(0);});
 it("does not invent stacks or damage against a health counter",()=>{const world=worldFor(2000),pet=summon(world,100,1,{hp:10,hitPoints:true}),target=petFormulaTarget(pet,world.units[0],world.tick);attackHit(world,world.units[0],target,false,[]);expect(pet.hp).toBe(9);expect(pet.statuses??[]).toHaveLength(0);});
 it("cloned world branches retain independent target stacks",()=>{const world=worldFor(100);basic(world);const copy=cloneWorld(world);basic(copy);expect(mark(world.units[1])?.value).toBe(1);expect(mark(copy.units[1])?.value).toBe(2);});
});

describe("Braum Winter's Bite actual flight",()=>{
 it("uses255+2.5%ownHP damage, finite1700speed and source linear slow",()=>{const world=worldFor(500,{hp:1000});cast(world,"Q");through(world,7);expect(world.units[1].totals.damageTaken).toBe(0);through(world,20);expect(world.units[1].totals.damageTaken).toBeCloseTo(255+.025*derive(world.units[0]).maxHp);const slow=world.units[1].statuses.find(s=>s.memoKey==="braum:qSlow")!;expect(mark(world.units[1])?.value).toBe(1);world.tick=slow.startTick+30;through(world,world.tick);expect(slow.value).toBeCloseTo(.35);});
 it("contacts the actual first body and leaves the distant champion untouched",()=>{const world=worldFor(700),pet=summon(world,200);cast(world,"Q");through(world,35);expect(pet.hp).toBeCloseTo(10000-255-.025*derive(world.units[0]).maxHp);expect(pet.statuses?.some(s=>s.key==="braum:concussive")).toBe(true);expect(world.units[1].totals.damageTaken).toBe(0);});
 it.each(["spellShield","parry","stasis","untargetable"]as const)("actual recipient%s denies Q damage and stacks",guard=>{const world=worldFor(200);state(world,world.units[1],guard);cast(world,"Q");through(world,25);expect(world.units[1].totals.damageTaken).toBe(0);expect(mark(world.units[1])).toBeUndefined();});
 it("a projectile wall destroys the launched Q before contact",()=>{const world=worldFor(500);world.zones.push({id:99,owner:1,kind:"projectileWall",seenTick:0,x:200,radius:0,startTick:0,endTick:100});cast(world,"Q");through(world,30);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.missiles).toHaveLength(0);});
 it("launched Q survives caster death without granting dead-caster healing",()=>{const world=worldFor(500);cast(world,"Q");through(world,8);world.units[0].hp=0;world.units[0].alive=false;world.tick=20;advanceMissiles(world);for(let t=21;t<35;t++){world.tick=t;advanceMissiles(world);}expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);expect(world.units[0].hp).toBe(0);});
});

describe("Braum Stand Behind Me self and actual allies",()=>{
 it("self-casts40+36%bonusresists for3seconds with real cost and cooldown",()=>{const world=worldFor(300,{armor:100,mr:100}),self=world.units[0],x=self.x;cast(world,"W");expect(derive(self).armor.bonus).toBeCloseTo(176);expect(derive(self).mr.bonus).toBeCloseTo(176);expect(self.x).toBe(x);expect(self.resource).toBe(self.spec.base.resource-40);expect(self.cooldownReady.W).toBe(240);through(world,90);expect(derive(self).armor.bonus).toBe(100);expect(derive(self).mr.bonus).toBe(100);});
 it("uses the real eligible ally and actual nearest visible champion landing side",()=>{const world=worldFor(800,{armor:100,mr:100}),ally=summon(world,400,0,{targetClass:"minion"});cast(world,"W",{direction:1,distance:400});expect(world.units[0].x).toBe(550);const target=petFormulaTarget(ally,world.units[0],world.tick);expect(derive(target).armor.bonus).toBeCloseTo(52);expect(derive(target).mr.bonus).toBeCloseTo(52);expect(derive(world.units[0]).armor.bonus).toBeCloseTo(176);});
 it("a blocked terrain endpoint grants neither recipient resists",()=>{const world=worldFor(800,{armor:100}),ally=summon(world,400,0,{targetClass:"minion"});world.terrain.push({id:9,owner:1,from:520,to:580,endTick:100});cast(world,"W",{direction:1,distance:400});expect(world.units[0].x).toBe(0);expect(derive(world.units[0]).armor.bonus).toBe(100);expect(ally.statuses??[]).toHaveLength(0);});
 it.each(["root","ground"]as const)("%s prevents initiating W including self-cast",cc=>{const world=worldFor();applyEffect(world,world.units[1],world.units[0],{type:"cc",cc,duration:2},{scale:1});expect(canCast(world,world.units[0],ability("W"))).toBe(false);});
 it("does not give a fabricated ward or unknown prop the ally buff",()=>{const world=worldFor(),ward=summon(world,200,0,{targetClass:"other",hitPoints:true});cast(world,"W",{direction:1,distance:200});expect(world.units[0].x).toBe(0);expect(ward.statuses??[]).toHaveLength(0);});
 it("refreshes one own contribution without compounding the old W bonus",()=>{const world=worldFor(300,{armor:100,mr:100});cast(world,"W");world.units[0].cooldownReady.W=0;cast(world,"W");expect(derive(world.units[0]).armor.bonus).toBeCloseTo(176);expect(derive(world.units[0]).mr.bonus).toBeCloseTo(176);});
});

describe("Braum Unbreakable damage transaction",()=>{
 it("intercepts a real ally-targeted projectile, retains its debuff and denies pre-reduction vamp",()=>{
  const world=worldFor(500),[self,enemy]=world.units,ally=summon(world,-200,0,{targetClass:"minion"});
  const spell=fixtureAbility({key:"incoming",delivery:{kind:"self"},onHit:[{type:"damage",damageType:"magic",amount:{base:100},lifesteal:.5},{type:"cc",cc:"slow",strength:.5,duration:1}]});enemy.spec={...enemy.spec,abilities:[spell]};enemy.hp-=1000;cast(world,"E");
  const launch=()=>world.missiles.push({id:world.nextId++,owner:1,source:spell.key,seenTick:world.tick,x:500,perTick:1000,homing:true,pet:ally.id,direction:-1,travelLeft:1000,projectile:true,connects:true,scale:1,onHit:spell.onHit!});
  launch();advanceMissiles(world);expect(self.totals.damageTaken).toBe(0);expect(enemy.totals.healing).toBe(0);expect(self.statuses.some(s=>s.key==="slow")).toBe(true);expect(ally.hp).toBe(10000);expect(world.missiles).toHaveLength(0);
  world.tick=1;launch();advanceMissiles(world);const dealt=100*.45/(1+(derive(self).mr.base+derive(self).mr.bonus)/100);expect(self.totals.damageTaken).toBeCloseTo(dealt);expect(enemy.totals.healing).toBeCloseTo(dealt*.5);expect(ally.hp).toBe(10000);
 });
 it("does not redirect an ally-targeted projectile approaching the rear of E",()=>{
  const world=worldFor(500),[self,enemy]=world.units,ally=summon(world,200,0,{targetClass:"minion"}),spell=fixtureAbility({key:"incoming",delivery:{kind:"self"},onHit:[{type:"damage",damageType:"true",amount:{base:100}}]});
  enemy.spec={...enemy.spec,abilities:[spell]};cast(world,"E");enemy.x=-500;
  world.missiles.push({id:world.nextId++,owner:1,source:spell.key,seenTick:0,x:-500,perTick:1000,homing:true,pet:ally.id,direction:1,travelLeft:1000,projectile:true,connects:true,scale:1,onHit:spell.onHit!});advanceMissiles(world);
  expect(self.totals.damageTaken).toBe(0);expect(ally.hp).toBe(9900);expect(self.memory["braum:eFirstTick"]).toBeUndefined();
 });
 it("fully reduces all same-tick frontal packets before shields and vamp, then55%",()=>{
  const world=worldFor(),[self,enemy]=world.units;enemy.hp-=1000;enemy.statuses.push({kind:"stat",key:"lifeSteal",source:1,startTick:0,endTick:100,value:.5});cast(world,"E");applyEffect(world,self,self,{type:"shield",amount:{base:200},duration:5},{scale:1});
  dealDamage(world,enemy,self,100,"physical",{attack:true});dealDamage(world,enemy,self,100,"magic");expect(self.totals.damageTaken).toBe(0);expect(self.totals.absorbed).toBe(0);expect(enemy.totals.healing).toBe(0);expect(self.statuses.find(s=>s.kind==="shield")?.value).toBe(200);
  world.tick=1;const before=self.totals.absorbed;dealDamage(world,enemy,self,100,"magic");expect(self.totals.absorbed-before).toBeCloseTo(45*100/(100+derive(self).mr.base+derive(self).mr.bonus));
 });
 it("true damage neither reduces nor consumes the first block",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");dealDamage(world,enemy,self,100,"true");expect(self.totals.damageTaken).toBe(100);expect(self.memory["braum:eFirstTick"]).toBeUndefined();world.tick=1;dealDamage(world,enemy,self,100,"magic");expect(self.totals.damageTaken).toBe(100);expect(self.memory["braum:eFirstTick"]).toBe(1);});
 it("back-side damage does not reduce or spend the front-side first block",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");dealDamage(world,enemy,self,100,"magic",{originX:-300});expect(self.totals.damageTaken).toBeGreaterThan(0);expect(self.memory["braum:eFirstTick"]).toBeUndefined();world.tick=1;const hp=self.hp;dealDamage(world,enemy,self,100,"magic",{originX:300});expect(self.hp).toBe(hp);});
 it("ground damage follows its actual origin rather than the distant caster",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");enemy.x=-500;dealDamage(world,enemy,self,100,"magic",{originX:100});expect(self.totals.damageTaken).toBe(0);});
 it("movement facing changes which source is in front",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");self.facing=-1;dealDamage(world,enemy,self,100,"magic");expect(self.totals.damageTaken).toBeGreaterThan(0);expect(self.memory["braum:eFirstTick"]).toBeUndefined();});
 it("spell shield can spend both first guards on a frontal damaging spell",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");state(world,self,"spellShield");const spell=fixtureAbility({key:"fixture",delivery:{kind:"self"},onHit:[{type:"damage",damageType:"magic",amount:{base:100}}]});abilityHit(world,enemy,self,spell,spell.onHit!);expect(hasState(self,"spellShield")).toBe(false);expect(self.memory["braum:eFirstTick"]).toBe(0);world.tick=1;const hp=self.hp;dealDamage(world,enemy,self,100,"magic");expect(hp-self.hp).toBeCloseTo(45*100/(100+derive(self).mr.base+derive(self).mr.bonus));});
 it("a pure-true shielded packet keeps the first nontrue reduction",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");state(world,self,"spellShield");const spell=fixtureAbility({key:"fixture",delivery:{kind:"self"},onHit:[{type:"damage",damageType:"true",amount:{base:100}}]});abilityHit(world,enemy,self,spell,spell.onHit!);expect(self.memory["braum:eFirstTick"]).toBeUndefined();});
 it("averages critical damage before exactly one first-block transaction",()=>{const world=worldFor(),[self,enemy]=world.units;cast(world,"E");dealDamage(world,enemy,self,100,"physical",{attack:true,crit:{chance:.5,multiplier:2}});expect(self.totals.damageTaken).toBe(0);expect(self.memory["braum:eFirstTick"]).toBe(0);});
 it("expires at4seconds and starts its post-effect hasted cooldown",()=>{const world=worldFor(300,{abilityHaste:100}),self=world.units[0];cast(world,"E");expect(self.cooldownHeld.E).toBe("E");through(world,120);expect(self.cooldownHeld.E).toBeUndefined();expect(self.cooldownReady.E).toBe(240);const hp=self.hp;dealDamage(world,world.units[1],self,100,"magic");expect(self.hp).toBeLessThan(hp);});
 it("resurrection clears held defense and world clones keep independent first blocks",()=>{const world=worldFor();cast(world,"E");const copy=cloneWorld(world);dealDamage(copy,copy.units[1],copy.units[0],100,"magic");expect(world.units[0].memory["braum:eFirstTick"]).toBeUndefined();expect(copy.units[0].memory["braum:eFirstTick"]).toBe(0);beginResurrection(world,world.units[0],{duration:1});through(world,1);expect(world.units[0].memory["braum:eEnd"]).toBe(0);});
});

describe("Braum Glacial Fissure actual recipients and ice",()=>{
 it("hits a pointblank body once and retains the sourced unresolved-curve floor",()=>{const world=worldFor(200);cast(world,"R");through(world,15);expect(world.units[1].statuses.find(s=>s.key==="airborne")?.endTick).toBe(33);through(world,35);expect(world.units[1].totals.damageTaken).toBe(350);expect(world.log.filter(r=>r.text.startsWith("Glacial Fissure deals"))).toHaveLength(1);expect(world.units[1].statuses.some(s=>s.key==="airborne")).toBe(false);});
 it("pierces independently guarded actual bodies once each",()=>{const world=worldFor(900),first=summon(world,450),second=summon(world,650);first.statuses=[{kind:"state",key:"spellShield",source:1,startTick:0,endTick:200,value:0}];cast(world,"R");through(world,45);expect(first.hp).toBe(10000);expect(first.statuses.some(s=>s.key==="spellShield")).toBe(false);expect(second.hp).toBe(9650);expect(world.units[1].totals.damageTaken).toBe(350);});
 it("creates ice in traveled order and removes its earlier segments first",()=>{const world=worldFor(2000);cast(world,"R");through(world,20);const ice=world.zones.filter(z=>z.ability==="Rslow");expect(ice.length).toBeGreaterThan(1);expect(ice[0]!.endTick).toBeLessThan(ice.at(-1)!.endTick);world.units[1].x=ice[0]!.x;through(world,ice[0]!.nextTick!);expect(world.units[1].statuses.some(s=>s.key==="slow"&&s.value===.6)).toBe(true);through(world,ice[0]!.endTick);expect(world.zones.some(z=>z.id===ice[0]!.id)).toBe(false);});
 it("a wall stops future travel while already laid ice remains",()=>{const world=worldFor(900);world.zones.push({id:999,owner:1,kind:"projectileWall",seenTick:0,x:500,radius:0,startTick:0,endTick:100});cast(world,"R");through(world,40);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.zones.some(z=>z.ability==="Rslow")).toBe(true);expect(world.zones.filter(z=>z.ability==="Rslow").every(z=>z.x-z.radius<=500)).toBe(true);});
 it.each(["spellShield","parry","stasis","untargetable"]as const)("%s guards pointblank primary damage",guard=>{const world=worldFor(100);state(world,world.units[1],guard);cast(world,"R");through(world,18);expect(world.units[1].totals.damageTaken).toBe(0);});
});

describe("Braum ordinary modes and direction",()=>{
 it.each(["hold","trade"]as const)("reserves an actually available R in%s and completes trade retreat first",mode=>{const world=worldFor();world.modes[0]=mode;expect(canCast(world,world.units[0],ability("R"))).toBe(true);expect(compiled.spec.behavior!(perceive(world,0))).not.toMatchObject({kind:"cast",ability:"R"});world.units[0].memory.tradeDone=true;expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});});
 it("flee can select a real friendly anchor without inventing one",()=>{const world=worldFor(300);world.modes[0]="flee";expect(compiled.spec.behavior!(perceive(world,0))).not.toMatchObject({kind:"cast",ability:"W"});summon(world,-500,0,{targetClass:"minion"});expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"cast",ability:"W",aim:{direction:-1,distance:500}});});
 it.each([0,1]as const)("uses directionTo for side%s at exact overlap",side=>{const spec={...compiled.spec,base:{...compiled.spec.base,hpRegen:0}},dummy=fighter({base:{hp:20000,armor:0,mr:0,moveSpeed:0}}),world=createWorld({fighters:side===0?[spec,dummy]:[dummy,spec],distance:0,modes:["idle","idle"]});world.units[0].x=world.units[1].x=0;const self=world.units[side],enemy=world.units[1-side]!;startCast(world,self,ability("Q"));through(world,8);expect(world.missiles[0]?.direction).toBe(directionTo(self,enemy));});
});
