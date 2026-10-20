import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { damagePerSecond } from "../../engine/budget";
import { advanceMissiles, advanceZones, attackRange, canCast, completeCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, abilityHitPet, applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import KogMaw from "../../kits/champions/KogMaw";
import Tristana from "../../kits/champions/Tristana";
import { championData, records } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";
const compile = (id: "KogMaw" | "Tristana") => compileKit(championData(id), records(id), id === "KogMaw" ? KogMaw : Tristana);
const kc = compile("KogMaw"), tc = compile("Tristana");
function world(id: "KogMaw" | "Tristana", bonus = {}, distance = 300): World {
 const spec = compile(id).spec;
 const w = createWorld({ fighters: [{ ...spec, base: { ...spec.base, ad: 100, hpRegen: 0, resource: 3000, resourceRegen: 0, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: .2, modifier: 1 } }, bonus }, fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 80, log: true, reactionTime: 0 } });
 w.units[0].x=0;w.units[1].x=distance;w.settings.environment={...w.settings.environment,walls:false};return w;
}
const spell = (w: World, key: string) => w.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (w: World, key: string, distance?: number) => completeCast(w,w.units[0],spell(w,key),w.tick,distance===undefined?undefined:{direction:1,distance});
const hit = (w: World,key: string) => abilityHit(w,w.units[0],w.units[1],spell(w,key),spell(w,key).onHit ?? []);
function through(w:World,tick:number) { while(w.tick<=tick&&!w.result) step(w,[standStill,standStill]); }
function missiles(w:World,n=30) { for(let i=0;i<n;i++){advanceMissiles(w);advanceZones(w);w.tick++;} }
function attack(w:World,pet?:Pet) { w.units[0].attackReadyTick=0;startAttack(w,w.units[0],pet);launchAttack(w,w.units[0]); }
function guard(w:World,key:"spellShield"|"parry"|"dodgeAttacks"|"blockAttacks"|"untargetable"|"invulnerable"|"stasis"|"displacementImmune",pet?:Pet) { if(pet)pet.statuses!.push({kind:"state",key,source:1,startTick:w.tick,endTick:w.tick+300,value:0,charges:1});else applyEffect(w,w.units[1],w.units[1],{type:"state",state:key,duration:10,charges:1},{scale:1}); }
const pet=(w:World,x=300,hp=10000)=>spawnPet(w,w.units[1],{kind:"minion",name:"Actual summon",hp,armor:0,mr:0,radius:20,moveSpeed:0,duration:60},x);
const bomb=(w:World)=>w.zones.find(z=>z.memory?.["tristana:bomb"]);

describe("Kog'Maw pinned artillery and barrage",()=>{
 it("keeps all slots, strict source links and no castable internal helpers",()=>{expect(kc.spec.abilities.map(a=>a.key)).toEqual(["Q","W","E","R","Iburst","Eslow"]);expect(new Set(kc.evidence.filter(e=>e.revid>0).map(e=>e.ability)).size).toBe(5);expect(kc.evidence.some(e=>e.sourceSha256?.length===64)).toBe(true);expect(kc.evidence.some(e=>e.revid===3965135&&e.text.includes("Pending for test"))).toBe(true);const w=world("KogMaw");expect(canCast(w,w.units[0],spell(w,"Iburst"))).toBe(false);expect(canCast(w,w.units[0],spell(w,"Eslow"))).toBe(false);});
 it("Q grants25% permanent AS and uses current windup",()=>{const w=world("KogMaw");expect(derive(w.units[0]).bonusAttackSpeed).toBe(.25);expect(spell(w,"Q").castTimeFor!(w.units[0])).toBeCloseTo(5/30);});
 it("Q damage precedes its32% armor/MR shred",()=>{const w=world("KogMaw");w.units[1].spec={...w.units[1].spec,base:{...w.units[1].spec.base,mr:100,armor:100}};hit(w,"Q");expect(w.units[1].totals.damageTaken).toBe(130);expect(derive(w.units[1]).mrReduction.percent).toBeCloseTo(.32);expect(derive(w.units[1]).armorReduction.percent).toBeCloseTo(.32);});
 it("Q stops at an actual front summon",()=>{const w=world("KogMaw",{},1000),p=pet(w,300);cast(w,"Q");missiles(w);expect(p.hp).toBe(9740);expect(w.units[1].totals.damageTaken).toBe(0);expect(p.statuses!.filter(s=>s.kind==="stat").length).toBe(2);});
 it("a Q spell shield denies both damage and shred",()=>{const w=world("KogMaw");guard(w,"spellShield");hit(w,"Q");expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[1].statuses.filter(s=>s.kind==="stat")).toHaveLength(0);});
 it("W gives210 range for8s and no attack reset",()=>{const w=world("KogMaw");w.units[0].attackReadyTick=50;cast(w,"W");expect(attackRange(w.units[0])).toBe(710);expect(w.units[0].attackReadyTick).toBe(50);through(w,240);expect(attackRange(w.units[0])).toBe(500);});
 it("W adds6%maxHP magic plus AP scaling independently from the attack",()=>{const w=world("KogMaw",{ap:100});cast(w,"W");attack(w);missiles(w);expect(w.units[1].totals.damageTaken).toBeCloseTo(100+7500);});
 it("W caps the actual summon on-hit at100",()=>{const w=world("KogMaw",{ap:100}),p=pet(w);cast(w,"W");attack(w,p);missiles(w);expect(p.hp).toBe(9800);});
 it.each(["parry","dodgeAttacks","blockAttacks"] as const)("%s denies Barrage's whole attacked packet",key=>{const w=world("KogMaw");cast(w,"W");guard(w,key);attack(w);missiles(w);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("a blinded W attack adds no magic on-hit",()=>{const w=world("KogMaw");cast(w,"W");applyEffect(w,w.units[1],w.units[0],{type:"cc",cc:"blind",duration:10},{scale:1});attack(w);missiles(w);expect(w.units[1].totals.damageTaken).toBe(0);});
 it.each([[1,180],[.7,225],[.4,270],[.399,360],[.01,360]])("R HPshare%f has exact strict threshold damage%f",(fraction,expected)=>{const w=world("KogMaw");w.units[1].hp=100000*fraction;const before=w.units[1].totals.damageTaken;hit(w,"R");expect(w.units[1].totals.damageTaken-before).toBeCloseTo(expected);});
 it("R costs40 through400 then caps, with a shared8s reset",()=>{const w=world("KogMaw");for(let i=0;i<12;i++){const before=w.units[0].resource;cast(w,"R");expect(before-w.units[0].resource).toBe(40*(1+Math.min(i,9)));}w.tick=240;w.units[0].spec.hooks!.onTick!(hookContext(w,w.units[0]));expect(spell(w,"R").costFor!(w.units[0],spell(w,"R"))).toBe(40);});
 it("R has an independent .6-second ground delay and ordinary sight",()=>{const w=world("KogMaw");cast(w,"R");through(w,17);expect(w.units[1].totals.damageTaken).toBe(0);through(w,18);expect(w.units[1].totals.damageTaken).toBe(180);expect(w.units[1].statuses.some(s=>s.key==="kogmaw:artillerySight")).toBe(true);expect(w.units[1].statuses.some(s=>s.key==="revealed")).toBe(false);});
 it("E leaves discrete blobs at125-unit intervals and never after a wall",()=>{const w=world("KogMaw",{},1200);w.zones.push({id:w.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:300,radius:0,startTick:0,endTick:300});cast(w,"E");missiles(w,20);const blobs=w.zones.filter(z=>z.ability==="Eslow");expect(blobs.map(z=>z.x)).toEqual([0,125,250]);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("previously deposited ooze slows even through a fresh spell shield",()=>{const w=world("KogMaw",{},125);cast(w,"E");missiles(w,3);guard(w,"spellShield");advanceZones(w);expect(w.units[1].statuses.some(s=>s.key==="slow")).toBe(true);expect(w.units[1].statuses.some(s=>s.key==="spellShield")).toBe(true);});
 it("artillery budget is finite and rewards AP",()=>{const base=damagePerSecond(kc.spec,fighter()),ap=damagePerSecond({...kc.spec,bonus:{ap:100}},fighter());expect(Number.isFinite(base.magic)).toBe(true);expect(ap.magic).toBeGreaterThan(base.magic);});
});

describe("Kog'Maw moving counted-death explosion",()=>{
 it("counts one death, blocks casts/attacks, preserves incoming projectiles and can move",()=>{const w=world("KogMaw");w.missiles.push({id:w.nextId++,owner:1,source:"attack",seenTick:0,x:300,perTick:1,homing:true,direction:-1,travelLeft:Infinity,projectile:true,connects:true,scale:1,onHit:[]});dealDamage(w,w.units[1],w.units[0],100000,"true");expect(w.units[0].fallen).toBe(true);expect(w.units[0].deathDefied?.allowMovement).toBe(true);expect(w.missiles.length).toBe(1);expect(canCast(w,w.units[0],spell(w,"W"))).toBe(false);const x=w.units[0].x;step(w,[kc.spec.behavior!,standStill]);expect(w.units[0].x).toBeGreaterThan(x);});
 it("starts10%, rises by2.5% each .264seconds, and clamps45%",()=>{const w=world("KogMaw");dealDamage(w,w.units[1],w.units[0],100000,"true");for(const [tick,value] of [[0,.1],[7,.1],[8,.125],[16,.15],[119,.45]]){w.tick=tick!;w.units[0].spec.hooks!.onTick!(hookContext(w,w.units[0]));expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(w.units[0].spec.base.moveSpeed*(1+value!));}});
 it("explodes for710 at exact120thtick and no tick earlier",()=>{const w=world("KogMaw");dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,119);expect(w.units[1].totals.damageTaken).toBe(0);through(w,120);expect(w.units[1].totals.damageTaken).toBe(710);expect(w.units[0].alive).toBe(false);expect(w.units[0].hp).toBe(0);});
 it.each(["spellShield","parry","untargetable","invulnerable","stasis"] as const)("%s prevents death explosion damage",key=>{const w=world("KogMaw");guard(w,key);dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,120);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("actual nearby summons get710 area true damage independently",()=>{const w=world("KogMaw"),a=pet(w),b=pet(w,1000);dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,120);expect(a.hp).toBe(9290);expect(b.hp).toBe(10000);});
 it("does not damage a rival beyond400 plus its own radius",()=>{const w=world("KogMaw",{},1000);dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,120);expect(w.units[1].totals.damageTaken).toBe(0);});
});

describe("Tristana charge identity, damage and resets",()=>{
 it("retains all slots, strict game crit evidence and level20 range",()=>{expect(new Set(tc.evidence.filter(e=>e.revid>0).map(e=>e.ability)).size).toBe(5);const w=world("Tristana");expect(attackRange(w.units[0])).toBeCloseTo(717.647058823529);expect(spell(w,"E").delivery).toMatchObject({range:717.647058823529});expect(tc.evidence.some(e=>e.text.includes('CritChanceModifier')&&e.sourceSha256?.length===64)).toBe(true);});
 it("Q has7s duration,120%AS and preserves attack cooldown",()=>{const w=world("Tristana");w.units[0].attackReadyTick=80;cast(w,"Q");expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(1.2);expect(w.units[0].attackReadyTick).toBe(80);through(w,210);expect(derive(w.units[0]).bonusAttackSpeed).toBe(0);});
 it("E application deals zero and attaches after its real missile",()=>{const w=world("Tristana");cast(w,"E");expect(bomb(w)).toBeUndefined();missiles(w,4);expect(bomb(w)).toBeDefined();expect(bomb(w)!.memory!.stacks).toBe(0);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("a spell shield rejects the initial charge",()=>{const w=world("Tristana");guard(w,"spellShield");hit(w,"E");expect(bomb(w)).toBeUndefined();expect(w.units[1].statuses.some(s=>s.key==="spellShield")).toBe(false);});
 it("E current cast time follows attack speed and cripples",()=>{const w=world("Tristana",{attackSpeed:1});expect(spell(w,"E").castTimeFor!(w.units[0])).toBeCloseTo(.1);applyEffect(w,w.units[1],w.units[0],{type:"cc",cc:"cripple",strength:.5,duration:10},{scale:1});expect(spell(w,"E").castTimeFor!(w.units[0])).toBeCloseTo(.2);});
 it.each(["E","R"])("invalidated%s cancels without mana/cooldown",key=>{const w=world("Tristana");const before=w.units[0].resource;startCast(w,w.units[0],spell(w,key));w.units[1].x=2000;through(w,20);expect(w.units[0].resource).toBe(before);expect(w.units[0].cooldownReady[key]).toBeUndefined();});
 it.each([[0,160],[1,200],[2,240],[3,280]])("natural expiry at%i stacks deals%f",(count,damage)=>{const w=world("Tristana");hit(w,"E");for(let i=0;i<count;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance:0,attack:{},scale:1});through(w,120);expect(w.units[1].totals.damageTaken).toBe(damage);expect(bomb(w)).toBeUndefined();});
 it.each([[0,320],[.5,384],[1,448]])("full charge with crit%f deals%f and resetsW",(critChance,damage)=>{const w=world("Tristana",{critChance});hit(w,"E");w.units[0].cooldownReady.W=9999;for(let i=0;i<4;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance,attack:{},scale:1});expect(w.units[1].totals.damageTaken).toBeCloseTo(damage);expect(w.units[0].cooldownReady.W).toBe(w.tick);});
 it.each(["parry","dodgeAttacks","blockAttacks"] as const)("%s prevents attack stacks",key=>{const w=world("Tristana");hit(w,"E");guard(w,key);attack(w);missiles(w);expect(bomb(w)!.memory!.stacks).toBe(0);});
 it("a blinded attack does not stack E",()=>{const w=world("Tristana");hit(w,"E");applyEffect(w,w.units[1],w.units[0],{type:"cc",cc:"blind",duration:10},{scale:1});attack(w);missiles(w);expect(bomb(w)!.memory!.stacks).toBe(0);});
 it("E remains attached to a moving target even after caster death",()=>{const w=world("Tristana");hit(w,"E");dealDamage(w,w.units[1],w.units[0],100000,"true");w.units[1].x=1400;through(w,120);expect(w.units[1].totals.damageTaken).toBe(160);expect(w.result?.winner).toBe(1);});
 it("primary untargetability does not avoid E while collateral keeps normal guards",()=>{const w=world("Tristana"),p=pet(w);hit(w,"E");guard(w,"untargetable");guard(w,"untargetable",p);through(w,120);expect(w.units[1].totals.damageTaken).toBe(160);expect(p.hp).toBe(10000);});
 it.each(["spellShield","parry","invulnerable","stasis"] as const)("a fresh%s blocks an attached charge's damage",key=>{const w=world("Tristana");hit(w,"E");guard(w,key);through(w,120);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("charge state is independently cloned",()=>{const w=world("Tristana");hit(w,"E");const copy=cloneWorld(w);bomb(copy)!.memory!.stacks=3;expect(bomb(w)!.memory!.stacks).toBe(0);});
 it("a pet charge and its stacks never become a champion charge or reset",()=>{const w=world("Tristana"),p=pet(w);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);expect(bomb(w)?.memory?.pet).toBe(p.id);w.units[0].cooldownReady.W=1000;for(let i=0;i<4;i++){attack(w,p);missiles(w,5);}expect(p.hp).toBe(9280);expect(w.units[1].totals.damageTaken).toBe(320);expect(w.units[0].cooldownReady.W).toBe(1000);});
 it("a real basic-killed summon triggers passive magic splash",()=>{const w=world("Tristana"),p=pet(w,300,1);attack(w,p);missiles(w);expect(w.pets).not.toContain(p);expect(w.units[1].totals.damageTaken).toBe(105);});
 it("unrelated spell kills do not invent passive basic-kill splash",()=>{const w=world("Tristana"),p=pet(w,300,1);abilityHitPet(w,w.units[0],p,spell(w,"W"),spell(w,"W").onHit!,"area");expect(w.units[1].totals.damageTaken).toBe(0);});
 it("champion kills resetW while ordinary summon kills do not",()=>{const w=world("Tristana");w.units[0].cooldownReady.W=999;dealDamage(w,w.units[0],w.units[1],100000,"true");expect(w.units[0].cooldownReady.W).toBe(0);});
 it("budget reacts to crit and AS without preloading combat Q",()=>{const base=damagePerSecond(tc.spec,fighter()),crit=damagePerSecond({...tc.spec,bonus:{critChance:1}},fighter()),as=damagePerSecond({...tc.spec,bonus:{attackSpeed:1}},fighter());expect(crit.physical).toBeGreaterThan(base.physical);expect(as.physical).toBeGreaterThan(base.physical);});
});

describe("Tristana Buster Shot and Rocket Jump",()=>{
 it("R uses325 magic damage and actual1000-unit knockback",()=>{const w=world("Tristana");hit(w,"R");expect(w.units[1].totals.damageTaken).toBe(325);expect(w.units[1].forced?.perTick).toBe(50);expect(w.units[1].statuses.some(s=>s.key==="stun")).toBe(true);through(w,20);expect(w.units[1].x).toBeCloseTo(1300);});
 it("displacement immunity prevents R controls while retaining damage",()=>{const w=world("Tristana");guard(w,"displacementImmune");hit(w,"R");expect(w.units[1].totals.damageTaken).toBe(325);expect(w.units[1].forced).toBeUndefined();expect(w.units[1].statuses.some(s=>s.key==="stun")).toBe(false);});
 it("R's fourth stack waits until knockback completes",()=>{const w=world("Tristana");hit(w,"E");for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance:0,attack:{},scale:1});hit(w,"R");expect(w.units[1].totals.damageTaken).toBe(325);expect(bomb(w)?.memory?.stacks).toBe(4);through(w,19);expect(w.units[1].totals.damageTaken).toBe(325);through(w,20);expect(w.units[1].totals.damageTaken).toBe(645);});
 it("R airborne and charge delay end at a wall while its ranked stun remains",()=>{const w=world("Tristana");w.terrain.push({id:w.nextId++,owner:0,from:420,to:500,endTick:300});hit(w,"E");for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance:0,attack:{},scale:1});hit(w,"R");through(w,5);expect(w.units[1].totals.damageTaken).toBe(645);expect(w.units[1].statuses.some(s=>s.key==="stun")).toBe(true);expect(w.units[1].statuses.some(s=>s.key==="airborne")).toBe(false);expect(w.units[1].statuses.some(s=>s.key==="tristana:busterSight")).toBe(true);through(w,21);expect(w.units[1].statuses.some(s=>s.key==="stun"||s.key==="tristana:busterSight")).toBe(false);});
 it("a dying Tristana keeps the delayed R fourth-stack explosion",()=>{const w=world("Tristana");hit(w,"E");for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance:0,attack:{},scale:1});hit(w,"R");dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,20);expect(w.units[1].totals.damageTaken).toBe(645);});
 it("W lands at the requested distance and damages nearby actual summons",()=>{const w=world("Tristana"),p=pet(w,400);cast(w,"W",300);through(w,9);expect(w.units[0].x).toBeCloseTo(300);expect(w.units[1].totals.damageTaken).toBe(210);expect(p.hp).toBe(9790);});
 it("Q and timedE remain castable overW without cancelling the jump",()=>{const w=world("Tristana");cast(w,"W",900);expect(w.units[0].action?.kind).toBe("dash");expect(canCast(w,w.units[0],spell(w,"Q"))).toBe(true);startCast(w,w.units[0],spell(w,"Q"));expect(w.units[0].action?.kind).toBe("dash");expect(canCast(w,w.units[0],spell(w,"E"))).toBe(true);startCast(w,w.units[0],spell(w,"E"));expect(w.units[0].action?.kind).toBe("dash");through(w,25);expect(w.units[0].x).toBeCloseTo(900);});
 it("a real knockdown prevents W's landing packet",()=>{const w=world("Tristana");cast(w,"W",300);applyEffect(w,w.units[1],w.units[0],{type:"knockdown"},{scale:1});through(w,20);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("W crosses an intervening wall with a clear endpoint",()=>{const w=world("Tristana");w.terrain.push({id:w.nextId++,owner:1,from:100,to:200,endTick:300});cast(w,"W",300);through(w,9);expect(w.units[0].x).toBeCloseTo(300);});
});

describe("Kog'Maw and Tristana edge contracts",()=>{
 it("zombie range is exactlyzero even if Barrage was active",()=>{const w=world("KogMaw");cast(w,"W");dealDamage(w,w.units[1],w.units[0],100000,"true");expect(attackRange(w.units[0])).toBe(0);expect(w.units[0].statuses.some(s=>s.key==="ghosted")).toBe(true);expect(derive(w.units[0]).rawMoveSpeed).toBeCloseTo(330*1.1);});
 it("a target-death bomb explosion is not mistaken for a basic-kill passive",()=>{const w=world("Tristana"),p=pet(w,300,350);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);const ctx=hookContext(w,w.units[0],undefined,undefined);for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackPetHit!({...ctx,enemy:{...w.units[1],petId:p.id,hp:p.hp},pet:p,blocked:false,critChance:0,attack:{},scale:1});attack(w,p);missiles(w,5);expect(w.units[1].totals.damageTaken).toBe(320);});
 it("an expired pet's charge retains its last location for champion collateral",()=>{const w=world("Tristana"),p=pet(w);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);w.pets=[];through(w,120);expect(w.units[1].totals.damageTaken).toBe(160);});
 it("a charge on an actual untargetable pet still damages its primary",()=>{const w=world("Tristana"),p=pet(w);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);guard(w,"untargetable",p);through(w,120);expect(p.hp).toBe(9840);expect(w.units[1].totals.damageTaken).toBe(160);});
 it.each(["E","R"])("a projectile wall destroys targeted%s before contact",key=>{const w=world("Tristana");w.zones.push({id:w.nextId++,owner:1,kind:"projectileWall",seenTick:0,x:150,radius:0,startTick:0,endTick:300});cast(w,key);missiles(w);expect(w.units[1].totals.damageTaken).toBe(0);expect(bomb(w)).toBeUndefined();expect(w.units[1].forced).toBeUndefined();});
 it("R displaces actual secondary summons in parallel without damaging them",()=>{const w=world("Tristana"),p=pet(w,350);hit(w,"R");through(w,20);expect(p.hp).toBe(10000);expect(p.x).toBeCloseTo(1350);});
 it("a secondary summon spell shield denies only its own R control",()=>{const w=world("Tristana"),p=pet(w,350);guard(w,"spellShield",p);hit(w,"R");through(w,20);expect(w.units[1].x).toBeCloseTo(1300);expect(p.x).toBe(350);expect(p.statuses!.some(s=>s.key==="spellShield")).toBe(false);});
 it("a charge on a secondary R summon receives no stack",()=>{const w=world("Tristana"),p=pet(w,350);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);hit(w,"R");expect(bomb(w)?.memory?.stacks).toBe(0);});
 it("primary pet R fourth stack follows actual pet knockback before exploding",()=>{const w=world("Tristana"),p=pet(w);abilityHitPet(w,w.units[0],p,spell(w,"E"),spell(w,"E").onHit!);const target={...w.units[1],petId:p.id,hp:p.hp};for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackPetHit!({...hookContext(w,w.units[0]),enemy:target,pet:p,blocked:false,critChance:0,attack:{},scale:1});abilityHitPet(w,w.units[0],p,spell(w,"R"),spell(w,"R").onHit!);expect(p.hp).toBe(9675);expect(p.statuses!.some(s=>s.key==="stun")).toBe(true);through(w,19);expect(p.hp).toBe(9675);expect(bomb(w)?.memory?.stacks).toBe(4);through(w,20);expect(p.hp).toBe(9355);expect(p.x).toBeCloseTo(1300);});
 it("the original four-second fuse wins over a late R knockback",()=>{const w=world("Tristana");hit(w,"E");for(let i=0;i<3;i++)w.units[0].spec.hooks!.onAttackHit!({...hookContext(w,w.units[0]),blocked:false,critChance:0,attack:{},scale:1});through(w,114);hit(w,"R");through(w,119);expect(w.units[1].totals.damageTaken).toBe(325);through(w,120);expect(w.units[1].totals.damageTaken).toBe(645);expect(w.units[1].forced).toBeDefined();});
 it("both kits run their actual default policies and deal finite damage",()=>{for(const id of ["KogMaw","Tristana"] as const){const w=world(id);w.modes[0]="fight";for(let i=0;i<600&&!w.result;i++)step(w,[w.units[0].spec.behavior!,standStill]);expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);expect(Number.isFinite(w.units[1].totals.damageTaken)).toBe(true);expect(w.log.some(e=>e.text.includes("casts "))).toBe(true);expect(w.log.some(e=>/casts .*\(.*\)/.test(e.text))).toBe(false);}});
 it("Q's reference AS gain stops at the ordinary attack-speed cap",()=>{const base=damagePerSecond({...tc.spec,bonus:{attackSpeed:10}},fighter());const more=damagePerSecond({...tc.spec,bonus:{attackSpeed:20}},fighter());expect(more.physical).toBeCloseTo(base.physical);});
});


describe("Barrage activation over a committed basic",()=>{
 it("preserves a declared attack windup and its timer when W activates",()=>{const w=world("KogMaw");startAttack(w,w.units[0]);const action=w.units[0].action,ready=w.units[0].attackReadyTick;startCast(w,w.units[0],spell(w,"W"));expect(w.units[0].action).toBe(action);expect(w.units[0].attackReadyTick).toBe(ready);through(w,20);expect(w.units[1].totals.damageTaken).toBe(6100);});
 it("a launched Barrage projectile retains its on-hit after the buff expires",()=>{const w=world("KogMaw",{},1000);cast(w,"W");w.tick=239;attack(w);through(w,260);expect(w.units[1].totals.damageTaken).toBe(6100);});
 it("an attack launched after Barrage expiry receives no stale on-hit",()=>{const w=world("KogMaw");cast(w,"W");w.tick=239;startAttack(w,w.units[0]);through(w,260);expect(w.units[1].totals.damageTaken).toBe(100);});
});


describe("Buster Shot separates ranked stun from forced movement", () => {
 it.each([false, true])("a touching wall preserves full stun and sight on actual pet=%s", (isPet) => {
  const w = world("Tristana"), summon = isPet ? pet(w) : undefined;
  const radius = summon?.spec.radius ?? w.units[1].spec.base.pathingRadius;
  w.terrain.push({ id: w.nextId++, owner: 0, from: 300 + radius, to: 500, endTick: 300 });
  if (summon) abilityHitPet(w, w.units[0], summon, spell(w, "R"), spell(w, "R").onHit!);
  else hit(w, "R");
  const statuses = () => summon?.statuses ?? w.units[1].statuses;
  expect(statuses().some(s => s.key === "airborne")).toBe(false);
  expect(statuses().some(s => s.key === "stun")).toBe(true);
  expect(statuses().some(s => s.key === "tristana:busterSight")).toBe(true);
  through(w, 20);
  expect(summon?.x ?? w.units[1].x).toBe(300);
  expect(statuses().some(s => s.key === "stun")).toBe(true);
  through(w, 21);
  expect(statuses().some(s => s.key === "stun" || s.key === "tristana:busterSight")).toBe(false);
 });
 it("a summon wall stop removes only R airborne and preserves its ranked stun", () => {
  const w = world("Tristana"), summon = pet(w);
  w.terrain.push({ id: w.nextId++, owner: 0, from: 420, to: 500, endTick: 300 });
  abilityHitPet(w, w.units[0], summon, spell(w, "R"), spell(w, "R").onHit!);
  through(w, 5);
  expect(summon.x).toBe(400);
  expect(summon.statuses!.some(s => s.key === "airborne")).toBe(false);
  expect(summon.statuses!.some(s => s.key === "stun")).toBe(true);
  expect(summon.statuses!.some(s => s.key === "tristana:busterSight")).toBe(true);
  through(w, 21);
  expect(summon.statuses!.some(s => s.key === "stun" || s.key === "tristana:busterSight")).toBe(false);
 });
});
