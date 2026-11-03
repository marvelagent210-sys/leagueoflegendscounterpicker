import { readFileSync } from "node:fs";
import { describe,expect,it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles,advanceZones,canCast,chargesLeft,startCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit,applyEffect,beginResurrection,dealDamage,hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { advancePets,spawnPet } from "../../engine/sim/pets";
import { createWorld,step } from "../../engine/sim/simulate";
import { cloneWorld,type World } from "../../engine/sim/state";
import Syndra from "../../kits/champions/Syndra";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData,kit,pets,records,runes } from "./helpers";
const compile=(options:Record<string,number>={})=>compileKit(championData("Syndra"),records("Syndra"),Syndra,options,pets("Syndra"),runes());
const arena=(ap=0,extra=0,distance=300)=>{const spec=compile({additionalSplinters:extra}).spec;const world=createWorld({fighters:[{...spec,base:{...spec.base,hpRegen:0,resourceRegen:0},bonus:{ap}},fighter({base:{hp:100000,hpRegen:0,armor:0,mr:0,moveSpeed:0}})],distance,modes:["idle","idle"],settings:{log:true,maxSeconds:80}});world.units[1].x=distance;return world;};
const spell=(w:World,key:string)=>w.units[0].spec.abilities.find(a=>a.key===key)!;
const through=(w:World,tick:number)=>{while(w.tick<=tick&&!w.result)step(w,[standStill,standStill]);};
const cast=(w:World,key:string,distance?:number)=>{startCast(w,w.units[0],spell(w,key),distance===undefined?undefined:{direction:1,distance});while(w.units[0].action?.kind==="cast"&&!w.result)step(w,[standStill,standStill]);};
const spheres=(w:World)=>w.pets.filter(p=>p.owner===0&&p.spec.kind==="syndra-sphere");
const createSphere=(w:World,distance=300)=>{const old=new Set(spheres(w).map(p=>p.id));cast(w,"Q",distance);through(w,w.tick+18);return spheres(w).find(p=>!old.has(p.id))!;};
const shield=(w:World,state:"spellShield"|"invulnerable"|"stasis"|"untargetable"="spellShield",seconds=10)=>applyEffect(w,w.units[1],w.units[1],{type:"state",state,duration:seconds},{scale:1});
const pet=(w:World,x=350)=>spawnPet(w,w.units[1],{kind:"target-minion",name:"Actual minion",targetClass:"minion",hp:1000,armor:0,mr:0,radius:25,moveSpeed:100,duration:30,attack:{range:1000,interval:1,windup:0,effects:[{type:"damage",damageType:"magic",amount:{base:50}}],attackLike:true}},x);

describe("Syndra source, progression and actual Q spheres",()=>{
 it("derives85 automatic skill-rank Splinters without fabricating farm history",()=>{const w=arena();expect(w.units[0].memory["syndra:splinters"]).toBe(85);expect(spheres(w)).toHaveLength(0);expect(compile().evidence.some(e=>e.sourceSha256==="65399b6a86a40560ecf2c2053371acc12cdfa85f0382265c820f2da54126de65")).toBe(true);});
 it.each([-1,.5,36,NaN,Infinity])("rejects invalid additional history%s",additionalSplinters=>expect(()=>compile({additionalSplinters})).toThrow("Syndra:"));
 it("120 stacks multiplies current total AP once without recursive growth",()=>{const w=arena(100,35);expect(derive(w.units[0]).ap).toBeCloseTo(115);through(w,10);expect(derive(w.units[0]).ap).toBeCloseTo(115);w.units[0].spec.bonus!.ap=200;expect(derive(w.units[0]).ap).toBeCloseTo(230);});
 it("does not grant the capstone at119 stacks",()=>expect(derive(arena(100,34).units[0]).ap).toBe(100));
 it("delays Q appearance0.6seconds and gives each sphere its actual six-second life",()=>{const w=arena();cast(w,"Q",300);through(w,17);expect(spheres(w)).toHaveLength(0);through(w,18);expect(spheres(w)).toHaveLength(1);expect(spheres(w)[0]).toMatchObject({x:300,endTick:198,memory:{mode:"ground"}});expect(w.units[1].totals.damageTaken).toBeCloseTo(230);through(w,198);expect(spheres(w)).toHaveLength(0);});
 it("creates a sphere when a spell shield blocks Q damage",()=>{const w=arena();shield(w);createSphere(w);expect(spheres(w)).toHaveLength(1);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("retains Q target location rather than following a moving enemy",()=>{const w=arena();cast(w,"Q",300);w.units[1].x=1500;through(w,18);expect(spheres(w)[0]!.x).toBe(300);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("caps an out-of-range Q at800 and uses the primary210 radius",()=>{const w=arena(0,0,1010);cast(w,"Q",1500);through(w,18);expect(spheres(w)[0]!.x).toBe(800);expect(w.units[1].totals.damageTaken).toBe(230);});
 it("uses two charges, static1.25second spacing and30 Q-only haste",()=>{const w=arena();expect(chargesLeft(w,w.units[0],spell(w,"Q"))).toBe(2);cast(w,"Q");expect(w.units[0].cooldownReady.Q).toBe(38);expect(w.units[0].charges.Q?.nextTick).toBe(162);through(w,38);expect(canCast(w,w.units[0],spell(w,"Q"))).toBe(true);cast(w,"Q");expect(w.units[0].charges.Q?.count).toBe(0);through(w,161);expect(w.units[0].charges.Q?.count).toBe(0);through(w,162);expect(w.units[0].charges.Q?.count).toBe(1);});
 it("adds Q-only haste to purchased haste while leaving other cooldowns ordinary",()=>{const w=arena();w.units[0].spec.bonus!.abilityHaste=100;cast(w,"Q");expect(w.units[0].charges.Q?.nextTick).toBe(92);expect(w.units[0].cooldownReady.Q).toBe(38);cast(w,"E");expect(w.units[0].cooldownReady.E).toBe(w.tick-1+225);});
 it("branch copies keep spheres, ammo and pending zone identity independent",()=>{const w=arena();createSphere(w);const fork=cloneWorld(w);fork.pets[0]!.x=900;fork.units[0].memory["syndra:ammo"]=0;expect(w.pets[0]!.x).toBe(300);expect(w.units[0].memory["syndra:ammo"]).toBe(1);});
});

describe("Syndra actual W ammunition, lifecycle and nonlinear damage",()=>{
 it("cannot invent an opening W target",()=>{const w=arena();expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);expect(canCast(w,w.units[0],spell(w,"W2"))).toBe(false);});
 it("holds the real sphere, refreshes once at pickup and starts cooldown after throwing",()=>{const w=arena();const p=createSphere(w);const mana=w.units[0].resource;cast(w,"W",300);expect(w.units[0].resource).toBe(mana-100);expect(p.memory.mode).toBe("held");expect(p.endTick).toBe(w.tick+180);const expiry=p.endTick;through(w,w.tick+20);cast(w,"W2",300);expect(p.memory.mode).toBe("ground");expect(p.endTick).toBe(expiry);expect(w.units[0].cooldownReady.W).toBe(w.tick+270);});
 it("resolves255 magic plus35.7 true damage at100AP",()=>{const w=arena(100);createSphere(w);cast(w,"W",300);const before=w.units[1].hp;cast(w,"W2",300);expect(before-w.units[1].hp).toBeCloseTo(290.7,8);expect(w.units[1].statuses.find(s=>s.kind==="cc"&&s.key==="slow")?.value).toBe(.25);});
 it("spell shielding blocks the whole W magic/true/control packet",()=>{const w=arena(100);createSphere(w);cast(w,"W",300);shield(w);const before=w.units[1].hp;cast(w,"W2",300);expect(w.units[1].hp).toBe(before);expect(w.units[1].statuses.some(s=>s.kind==="cc"&&s.key==="slow")).toBe(false);});
 it("drops the same sphere after five seconds and preserves its pickup expiry",()=>{const w=arena();const p=createSphere(w);cast(w,"W",300);const start=w.tick;through(w,start+150);expect(p.memory.mode).toBe("ground");expect(spheres(w)[0]!.id).toBe(p.id);expect(w.units[0].cooldownReady.W).toBe(start+150+270);});
 it("prioritizes a real sphere over a nearer actual minion as the explicitly chosen primary note",()=>{const w=arena();const sphere=createSphere(w,450);const minion=pet(w,300);cast(w,"W",300);expect(w.units[0].memory["syndra:held"]).toBe(sphere.id);expect(minion.carriedBy).toBeUndefined();});
 it("cleanses and carries the same pet identity without attacks or replacement",()=>{const w=arena();const p=pet(w);p.statuses!.push({kind:"cc",key:"stun",source:0,startTick:0,endTick:200,value:0});cast(w,"W",350);expect(p.carriedBy).toBe(0);expect(p.statuses?.some(s=>s.kind==="cc")).toBe(false);expect(p.statuses?.some(s=>s.key==="stasis")).toBe(true);const hp=w.units[0].hp;w.units[0].x=-100;through(w,10);expect(p.x).toBe(-100);expect(w.units[0].hp).toBe(hp);cast(w,"W2",400);expect(p.carriedBy).toBeUndefined();expect(w.pets.some(body=>body===p)).toBe(true);expect(p.statuses?.some(s=>s.key==="stasis")).toBe(false);expect(p.x).toBe(300);});
 it("unclassified monsters and champions are not guessed to be legal W pets",()=>{const w=arena();const p=pet(w);p.spec={...p.spec,targetClass:"monster"};expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);p.spec={...p.spec,targetClass:"champion"};expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);});
 it("pickup does not count as activation but the manual throw does",()=>{const w=arena();const p=createSphere(w);expect(spell(w,"W").countsAsCast).toBe(false);expect(spell(w,"W2").countsAsCast).not.toBe(false);cast(w,"W",300);expect(w.units[0].memory["syndra:held"]).toBe(p.id);});
 it("owner death drops the carried body instead of deleting or replacing it",()=>{const w=arena();const p=pet(w);cast(w,"W",350);w.units[0].alive=false;w.units[0].hp=0;w.units[0].spec.hooks!.onTickWhileDead!(hookContext(w,w.units[0]));expect(p.carriedBy).toBeUndefined();expect(w.pets).toContain(p);});
});

describe("Syndra E swept geometry, shared damage and late spheres",()=>{
 it("pushes a contacted champion400 capped800 and applies its separate upgraded slow",()=>{const w=arena();cast(w,"E");through(w,35);expect(w.units[1].totals.damageTaken).toBe(200);expect(w.units[1].x).toBe(700);expect(w.units[1].statuses.find(s=>s.kind==="cc"&&s.key==="slow")?.value).toBe(.7);});
 it("pushes actual Q spheres and deals E damage only once across cone and sphere",()=>{const w=arena();createSphere(w,300);const before=w.units[1].totals.damageTaken;cast(w,"E");through(w,w.tick+25);expect(w.units[1].totals.damageTaken-before).toBe(200);expect(w.units[1].statuses.some(s=>s.key==="stun")).toBe(true);expect(spheres(w)[0]!.x).toBeGreaterThan(300);});
 it("sphere stun lasts1.25 seconds and upgrade slow begins after actual stun ends",()=>{const w=arena(0,0,900);createSphere(w,300);cast(w,"E");let hit=-1;for(let n=0;n<50;n++){step(w,[standStill,standStill]);if(w.units[1].statuses.some(s=>s.key==="stun")){hit=w.tick-1;break;}}expect(hit).toBeGreaterThan(0);expect(w.units[1].statuses.some(s=>s.key==="slow")).toBe(false);through(w,hit+38);const slow=w.units[1].statuses.find(s=>s.key==="slow");expect(slow?.value).toBe(.7);expect(slow!.endTick).toBeGreaterThan(hit+38);});
 it("late invisible waves acquire a sphere created after the visible wave passed",()=>{const w=arena(0,0,1500);cast(w,"E");cast(w,"Q",700);through(w,w.tick+20);expect(spheres(w)[0]?.memory.mode).toBe("E");expect(w.units[1].totals.damageTaken).toBe(0);});
 it("the cone's800 sphere-only tail never adds hostile damage beyond700",()=>{const w=arena(0,0,790);cast(w,"E");through(w,40);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("a real projectile wall blocks the visible and invisible acquisition waves",()=>{const w=arena();const p=createSphere(w,500);w.zones.push({id:w.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:200,radius:1,startTick:0,endTick:500});cast(w,"E");through(w,w.tick+35);expect(p.memory.mode).toBe("ground");expect(p.x).toBe(500);});
 it("a pushed sphere remains alive until the end of its actual flight",()=>{const w=arena(0,0,1500);const p=createSphere(w,300);cast(w,"E");p.endTick=w.tick+6;through(w,w.tick+8);expect(w.pets).toContain(p);expect(p.memory.mode).toBe("E");through(w,w.tick+40);expect(w.pets).not.toContain(p);});
});

describe("Syndra R declaration commitment and individual orb defenses",()=>{
 it("pays100 mana and begins scheduling at declaration rather than cast completion",()=>{const w=arena();const before=w.units[0].resource;startCast(w,w.units[0],spell(w,"R"));expect(w.units[0].resource).toBe(before-100);expect(w.units[0].cooldownReady.R).toBe(2400);expect(w.missiles.some(m=>m.source==="Rschedule")).toBe(true);expect(spheres(w)).toHaveLength(3);});
 it("fires three distinct accelerating orbs and one spell shield blocks only one",()=>{const w=arena();shield(w);cast(w,"R");through(w,80);expect(w.units[1].totals.damageTaken).toBe(320);expect(spheres(w)).toHaveLength(3);expect(spheres(w).every(p=>p.memory.mode==="ground")).toBe(true);});
 it("collects up to four real ground spheres and excludes the held sphere",()=>{const w=arena();for(let n=0;n<5;n++){const p=createSphere(w,300);w.units[0].memory["syndra:ammo"]=2;w.units[0].memory["syndra:nextQ"]=Infinity;w.units[0].charges.Q={count:2,nextTick:Infinity};w.units[0].cooldownReady.Q=0;p.endTick=1000;}cast(w,"W",300);const held=w.units[0].memory["syndra:held"];cast(w,"R");through(w,w.tick+80);expect(spheres(w)).toHaveLength(8);expect(spheres(w).find(p=>p.id===held)?.memory.mode).toBe("held");expect(w.units[1].totals.damageTaken).toBe(5*230+7*160);});
 it("owner death after declaration cannot interrupt the committed remaining orbs",()=>{const w=arena();startCast(w,w.units[0],spell(w,"R"));w.units[0].alive=false;w.units[0].hp=0;for(let n=0;n<80;n++){advanceMissiles(w);w.tick++;}expect(w.units[1].totals.damageTaken).toBe(480);expect(spheres(w).every(p=>p.memory.mode==="ground")).toBe(true);});
 it("target death stops unlaunched orbs but keeps each actual sphere body",()=>{const w=arena();startCast(w,w.units[0],spell(w,"R"));advanceMissiles(w);w.units[1].alive=false;w.units[1].hp=0;w.tick++;advanceMissiles(w);w.tick++;advanceMissiles(w);expect(w.missiles.filter(m=>m.source==="Rorb")).toHaveLength(1);expect(spheres(w)).toHaveLength(3);expect(spheres(w).filter(p=>p.memory.mode==="ground")).toHaveLength(2);});
 it("untargetability invalidates launched effects without destroying spheres",()=>{const w=arena();cast(w,"R");shield(w,"untargetable");through(w,80);expect(w.units[1].totals.damageTaken).toBe(0);expect(spheres(w)).toHaveLength(3);expect(spheres(w).every(p=>p.memory.mode==="ground")).toBe(true);});
 it("100 stacks execute only from an actual positive R packet below15%",()=>{const w=arena(0,15);w.units[1].hp=15001;cast(w,"R");through(w,80);expect(w.units[1].hp).toBe(0);expect(w.units[1].totals.damageTaken).toBe(15001);});
 it("85 stacks do not borrow the100-stack execute",()=>{const w=arena();w.units[1].hp=15001;cast(w,"R");through(w,80);expect(w.units[1].hp).toBe(14521);});
 it("damage-only invulnerability cannot trigger an execute merely from low HP",()=>{const w=arena(0,15);w.units[1].hp=100;shield(w,"invulnerable");cast(w,"R");through(w,80);expect(w.units[1].hp).toBe(100);});
});

describe("Syndra Transcendent fixed pickup and ordinary policy",()=>{
 it("an actually killed classified large minion sends one delayed mana-restoring Splinter",()=>{const w=arena(0,0,2000),body=pet(w,300);body.hp=100;body.memory.largeMinion=true;w.units[0].resource-=500;cast(w,"Q",300);const mana=w.units[0].resource;through(w,18);expect(w.pets).not.toContain(body);expect(w.units[0].memory["syndra:splinters"]).toBe(85);expect(w.units[0].resource).toBe(mana);through(w,35);expect(w.units[0].memory["syndra:splinters"]).toBe(85);through(w,36);expect(w.units[0].memory["syndra:splinters"]).toBe(86);expect(w.units[0].resource).toBe(mana+239);});
 it("a large-minion pickup at the cap restores mana without adding stacks",()=>{const w=arena(0,35,2000),body=pet(w,300);body.hp=100;body.memory.largeMinion=true;w.units[0].resource-=500;cast(w,"Q",300);const mana=w.units[0].resource;through(w,36);expect(w.units[0].memory["syndra:splinters"]).toBe(120);expect(w.units[0].resource).toBe(mana+239);});
 it("ordinary unclassified minion kills cannot supply Splinters or mana",()=>{const w=arena(0,0,2000),body=pet(w,300);body.hp=100;w.units[0].resource-=500;cast(w,"Q",300);const mana=w.units[0].resource;through(w,36);expect(w.units[0].memory["syndra:splinters"]).toBe(85);expect(w.units[0].resource).toBe(mana);});
 it("a large-minion Splinter arriving after owner death grants no stacks or mana",()=>{const w=arena(0,0,2000),body=pet(w,300);body.hp=100;body.memory.largeMinion=true;w.units[0].resource-=500;cast(w,"Q",300);through(w,18);const mana=w.units[0].resource;dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,36);expect(w.units[0].memory["syndra:splinters"]).toBe(85);expect(w.units[0].resource).toBe(mana);});
 it("two actual Q casts grant three stacks after0.6seconds and restore239 mana once",()=>{const w=arena();w.units[0].resource-=500;createSphere(w);through(w,38);cast(w,"Q",300);through(w,56);expect(w.units[0].memory["syndra:splinters"]).toBe(85);const before=w.units[0].resource;through(w,75);expect(w.units[0].memory["syndra:splinters"]).toBe(88);expect(w.units[0].resource-before).toBe(239);});
 it("one W's magic and true packets cannot grant two passive instances",()=>{const w=arena(100);const p=pet(w);cast(w,"W",350);w.units[1].x=300;cast(w,"W2",300);through(w,30);expect(w.units[0].memory["syndra:splinters"]).toBe(85);expect(p.hp).toBeLessThan(1000);});
 it("a capped pickup still restores mana without adding extra stacks",()=>{const w=arena(100,35);w.units[0].resource-=500;createSphere(w);through(w,38);cast(w,"Q",300);through(w,56);const before=w.units[0].resource;through(w,75);expect(w.units[0].memory["syndra:splinters"]).toBe(120);expect(w.units[0].resource-before).toBe(239);});
 it.each(["hold","trade"]as const)("does not open R in%s",mode=>{const w=arena();w.modes[0]=mode;expect(w.units[0].spec.behavior!(perceive(w,0))).not.toMatchObject({kind:"cast",ability:"R"});});
 it("completed trades retreat and never choose an optional spell first",()=>{const w=arena();w.modes[0]="trade";w.units[0].memory.tradeDone=true;expect(w.units[0].spec.behavior!(perceive(w,0))).toMatchObject({kind:"move",direction:-1});});
});

describe("Syndra finite production allocation and reflection",()=>{
 it("retains six strict reversed15000gold scenarios and exactly mirrored purchases",()=>{const prices=(JSON.parse(readFileSync(new URL("../../data/16.21/rules.json",import.meta.url),"utf8"))as{statPrices:StatPrices}).statPrices;const spec=compile().spec,a=simulateMatchup(spec,kit("Darius").spec,15000,prices),b=simulateMatchup(kit("Darius").spec,spec,15000,prices);expect(a.scenarios).toHaveLength(6);expect(a.builds).toEqual([b.builds[1],b.builds[0]]);expect(Math.abs(a.score+b.score)).toBeLessThan(1e-10);for(const[index,s]of a.scenarios.entries()){const back=b.scenarios[[1,0,2,3,4,5][index]!]!;if(s.score===undefined)expect(back.score).toBeUndefined();else expect(Math.abs(s.score+back.score!)).toBeLessThan(1e-10);for(const o of s.outcomes)expect([o.seconds,...o.hp,...o.damage].every(Number.isFinite)).toBe(true);}for(const build of a.builds)expect(Math.abs(build.gold-15000)).toBeLessThan(1e-10);},60000);
});


describe("Syndra source boundary and existing pet integrations",()=>{
 it("keeps the real Tibbers aura while preventing its carried movement and attacks",()=>{
  const source=compile().spec,annie=kit("Annie").spec;
  const w=createWorld({fighters:[{...source,base:{...source.base,hp:100000,hpRegen:0,resourceRegen:0}},{...annie,base:{...annie.base,hp:100000,hpRegen:0}}],distance:300,modes:["idle","idle"],settings:{log:true,maxSeconds:30}});
  w.units[1].memory.pyromania=0;const summon=w.units[1].spec.abilities.find(a=>a.key==="R")!;startCast(w,w.units[1],summon,{direction:1,distance:0});through(w,10);
  const bear=w.pets.find(p=>p.owner===1&&p.spec.name==="Tibbers")!;expect(bear).toBeDefined();cast(w,"W",Math.abs(bear.x-w.units[0].x));expect(bear.carriedBy).toBe(0);
  const attacks=Number(bear.memory.enrageAttacks??0),aura=Number(bear.memory.auraPulse),before=w.units[0].totals.damageTaken;w.units[0].x=-100;through(w,w.tick+20);
  expect(bear.x).toBe(-100);expect(Number(bear.memory.enrageAttacks??0)).toBe(attacks);expect(Number(bear.memory.auraPulse)).toBeGreaterThan(aura);expect(w.units[0].totals.damageTaken).toBeGreaterThan(before);
 });
 it("retains real Heimer turret passive charging but suppresses held beams and attacks",()=>{
  const source=compile().spec,heimer=kit("Heimerdinger").spec;
  const w=createWorld({fighters:[{...source,base:{...source.base,hp:100000,hpRegen:0}},{...heimer,base:{...heimer.base,hp:100000,hpRegen:0}}],distance:300,modes:["idle","idle"],settings:{log:true,maxSeconds:30}});
  const turret=w.pets.find(p=>p.owner===1)!;expect(turret).toBeDefined();w.pets=w.pets.filter(p=>p===turret);cast(w,"W",Math.abs(turret.x-w.units[0].x));expect(turret.carriedBy).toBe(0);turret.memory.charge=.999;
  const before=w.units[0].totals.damageTaken;through(w,w.tick+30);expect(Number(turret.memory.charge)).toBe(1);expect(w.units[0].totals.damageTaken).toBe(before);expect(w.zones.some(z=>z.owner===1)).toBe(false);
  cast(w,"W2",300);const after=w.units[0].totals.damageTaken;through(w,w.tick+30);expect(w.units[0].totals.damageTaken).toBeGreaterThan(after);
 });
 it("an E-moving sphere cannot be collected by a simultaneous R declaration",()=>{
  const w=arena(0,0,500),p=createSphere(w,300);cast(w,"E");through(w,w.tick+5);expect(p.memory.mode).toBe("E");
  startCast(w,w.units[0],spell(w,"R"));const scheduler=w.missiles.find(m=>m.source==="Rschedule")!;const state=JSON.parse(String(w.units[0].memory[`syndra:rQueue:${scheduler.id}`]))as{ids:number[]};expect(state.ids).toHaveLength(3);expect(state.ids).not.toContain(p.id);
 });
 it("the actual committed R schedule survives caster resurrection",()=>{
  const w=arena();startCast(w,w.units[0],spell(w,"R"));beginResurrection(w,w.units[0],{duration:3,ability:"source-boundary-test"});
  for(let n=0;n<80;n++){advanceMissiles(w);w.tick++;}expect(w.units[1].totals.damageTaken).toBe(480);expect(spheres(w)).toHaveLength(3);
 });
 it("the R15-percent execute is strict and does not execute at exact equality",()=>{
  const w=arena(0,15);w.units[1].hp=15160;const orb=spell(w,"Rorb");abilityHit(w,w.units[0],w.units[1],orb,orb.onHit!);expect(w.units[1].hp).toBe(15000);
  w.units[1].hp=15159;abilityHit(w,w.units[0],w.units[1],orb,orb.onHit!);expect(w.units[1].hp).toBe(0);
 });
 it("a real pickup that reaches120 grants total AP once at that arrival tick",()=>{
  const w=arena(100,34);w.units[0].resource-=500;createSphere(w);through(w,38);cast(w,"Q",300);through(w,74);expect(derive(w.units[0]).ap).toBe(100);through(w,75);expect(w.units[0].memory["syndra:splinters"]).toBe(120);expect(derive(w.units[0]).ap).toBeCloseTo(115);through(w,90);expect(derive(w.units[0]).ap).toBeCloseTo(115);
 });
 it("the same target cannot provide another passive pickup during its8-second cooldown",()=>{
  const w=arena();w.units[0].resource-=600;createSphere(w);through(w,38);cast(w,"Q",300);through(w,75);expect(w.units[0].memory["syndra:splinters"]).toBe(88);
  w.units[0].memory["syndra:ammo"]=2;w.units[0].memory["syndra:nextQ"]=Infinity;w.units[0].charges.Q={count:2,nextTick:Infinity};w.units[0].cooldownReady.Q=0;cast(w,"Q",300);through(w,114);cast(w,"Q",300);through(w,155);expect(w.units[0].memory["syndra:splinters"]).toBe(88);
 });
 it("actual terrain blocks E body displacement without fabricating a terrain-free push",()=>{
  const w=arena();w.terrain.push({id:w.nextId++,owner:0,from:500,to:600,endTick:200});cast(w,"E");through(w,30);expect(w.units[1].x).toBe(465);expect(w.units[1].totals.damageTaken).toBe(200);
 });
});


describe("Syndra immediate carried-body death cleanup",()=>{
 it("drops a real held pet synchronously when actual lethal damage kills Syndra",()=>{const w=arena();const p=pet(w);cast(w,"W",350);dealDamage(w,w.units[1],w.units[0],1000000,"true");expect(w.units[0].hp).toBeLessThanOrEqual(0);expect(p.carriedBy).toBeUndefined();expect(p.statuses?.some(s=>s.memoKey==="syndra:held")).toBe(false);expect(w.pets).toContain(p);});
});


describe("Syndra guarded R health loss and released Q lifecycle",()=>{
 it("an R orb absorbed entirely by a normal shield cannot execute an already-low target",()=>{const w=arena(0,15);w.units[1].hp=100;applyEffect(w,w.units[1],w.units[1],{type:"shield",amount:{base:1000},duration:5},{scale:1});const orb=spell(w,"Rorb");abilityHit(w,w.units[0],w.units[1],orb,orb.onHit!);expect(w.units[1].hp).toBe(100);expect(w.units[1].statuses.find(s=>s.kind==="shield")?.value).toBe(840);});
 it("released Q damage remains relevant after caster death and can cause mutual death",()=>{const w=arena();w.units[1].hp=100;cast(w,"Q",300);dealDamage(w,w.units[1],w.units[0],1000000,"true");through(w,18);expect(w.units[0].hp).toBeLessThanOrEqual(0);expect(w.units[1].hp).toBeLessThanOrEqual(0);expect(spheres(w)).toHaveLength(1);});
});

describe("Syndra reflected sphere acquisition boundaries",()=>{
 it("retains strict actual full-budget Ryze reflection after boundary acquisition",()=>{const prices=(JSON.parse(readFileSync(new URL("../../data/16.21/rules.json",import.meta.url),"utf8"))as{statPrices:StatPrices}).statPrices;const spec=compile().spec,ryze=kit("Ryze").spec,a=simulateMatchup(ryze,spec,15000,prices),b=simulateMatchup(spec,ryze,15000,prices);expect(a.builds).toEqual([b.builds[1],b.builds[0]]);expect(Math.abs(a.score+b.score)).toBeLessThan(1e-10);for(const[index,scenario]of a.scenarios.entries()){const reflected=b.scenarios[[1,0,2,3,4,5][index]!]!;if(scenario.score===undefined)expect(reflected.score).toBeUndefined();else expect(Math.abs(scenario.score+reflected.score!)).toBeLessThan(1e-10);}},60000);

 it.each([-1,1]as const)("acquires a primary-range sphere with reflected rounding in direction%s",direction=>{const w=arena(),p=createSphere(w);w.units[0].x=direction===1?0:1165;w.units[1].x=w.units[0].x+direction*961;p.x=w.units[0].x+direction*(800+1e-13);w.modes[0]="hold";expect(w.units[0].spec.behavior!(perceive(w,0))).toMatchObject({kind:"cast",ability:"E"});});
 it.each([-1,1]as const)("does not widen acquisition beyond the existing coordinate allowance in direction%s",direction=>{const w=arena(),p=createSphere(w);w.units[0].x=direction===1?0:1165;w.units[1].x=w.units[0].x+direction*961;p.x=w.units[0].x+direction*(800+2e-6);w.modes[0]="hold";expect(w.units[0].spec.behavior!(perceive(w,0))).not.toMatchObject({kind:"cast",ability:"E"});});
 it.each([-1,1]as const)("pushes a coincident real sphere in its acquiring wave direction%s",direction=>{const w=arena(),p=createSphere(w,0);w.units[1].x=direction*300;expect(p.x).toBe(w.units[0].x);const start=w.tick;startCast(w,w.units[0],spell(w,"E"),{direction:1,distance:0});through(w,start+12);expect(p.memory.mode).toBe("E");const carrier=w.missiles.find(m=>m.source==="Eorb");expect(carrier?.direction).toBe(direction);expect(Math.sign(p.x-w.units[0].x)).toBe(direction);});
});
