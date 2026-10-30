import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, canSee, dealDamage, hookContext, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { damagePet, petHit, petsOf, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type Unit, type World } from "../../engine/sim/state";
import Naafiri from "../../kits/champions/Naafiri";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";
const compiled = compileKit(championData("Naafiri"), records("Naafiri"), Naafiri, {}, pets("Naafiri"), runes());
const ability = (key: string): AbilitySpec => compiled.spec.abilities.find((a) => a.key === key)!;
function worldFor(x = 500, ad = 100): World {
 const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ad } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
 world.units[0].x = 0; world.units[1].x = x; return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(world, world.units[0], ability(key), aim);
function state(world: World, target: Unit, key: StateType, duration = 5): void { applyEffect(world, target, target, { type: "state", state: key, duration }, { scale: 1 }); }
const packs = (world: World) => petsOf(world, 0, "naafiri:packmate");
const noPets = (world: World) => { world.pets = world.pets.filter((p) => p.owner !== 0); world.units[0].memory.spawnAt = Infinity; };
function summon(world: World, x: number, extra: Partial<PetSpec> = {}): Pet { return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual summon", hp: 10000, armor: 0, mr: 0, radius: 25, moveSpeed: 0, duration: 30, ...extra }, x); }
const shieldTotal = (unit: Unit) => unit.statuses.filter((s) => s.kind === "shield").reduce((sum, s) => sum + s.value, 0);
describe("Naafiri source contract", () => {
 it("compiles exact five revisions and the actual pet record", () => { expect(compiled.evidence.some(row => row.revid === 4025794)).toBe(true); expect(new Set(compiled.evidence.filter(row => row.revid && row.revid !== 4025794).map(row => row.revid))).toEqual(new Set(records("Naafiri").map(row => row.page.revid))); });
 it("uses the current W/R layout and primary max-rank quantities", () => { expect(ability("W").name).toBe("The Call of the Pack"); expect(ability("R").name).toBe("Hounds' Pursuit"); expect(["Q", "W", "E", "R"].map(key => [ability(key).cooldown, ability(key).cost, ability(key).castTime])).toEqual([[7,90,.25],[18,60,.75],[7,40,0],[80,100,0]]); });
 it("fails closed when source geometry or pet article notes disappear", () => { const altered = structuredClone(records("Naafiri")); delete altered.find(row => row.kind === "I")!.gameSources; expect(() => compileKit(championData("Naafiri"), altered, Naafiri, {}, pets("Naafiri"))).toThrow("pinned game data"); });
});
describe("Naafiri ordinary production", () => {
 it("reserves actually ready R in trade and hold and honors completed retreat", () => { for (const mode of ["trade","hold"] as const) { const world=worldFor(150); world.modes[0]=mode; expect(canCast(world,world.units[0],ability("R"))).toBe(true); expect(compiled.spec.behavior!(perceive(world,0))).not.toEqual({kind:"cast",ability:"R"}); world.modes[0]="trade"; world.units[0].memory.tradeDone=true; expect(compiled.spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1}); } });
 it("runs all six full-budget scenarios with strict reflected scores/builds and QWER casts", () => {
  const prices=(JSON.parse(readFileSync(new URL("../../data/16.20/rules.json",import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices, opponent=kit("Darius").spec;
  const forward=simulateMatchup(compiled.spec,opponent,15000,prices,{settings:{log:true}}),reverse=simulateMatchup(opponent,compiled.spec,15000,prices);
  expect(forward.builds).toEqual([reverse.builds[1],reverse.builds[0]]); expect(Math.abs(forward.score+reverse.score)).toBeLessThan(1e-12); expect(forward.scenarios).toHaveLength(6);
  for(const [index,scenario] of forward.scenarios.entries()){ const reflected=reverse.scenarios[[1,0,2,3,4,5][index]!]!;if(scenario.score===undefined)expect(reflected.score).toBeUndefined();else expect(Math.abs(scenario.score+reflected.score!)).toBeLessThan(1e-12); expect(scenario.outcomes.every(outcome=>Number.isFinite(outcome.seconds)&&outcome.hp.every(Number.isFinite))).toBe(true); }
  const casts=forward.scenarios.flatMap(s=>s.outcomes.flatMap(o=>o.timeline.filter(row=>row.side===0&&row.text.startsWith("casts ")).map(row=>row.text)));for(const key of ["Q","W","E","R"])expect(casts.some(text=>text.includes(ability(key).name))).toBe(true);
 },60000);
});

describe("We Are More actual minion bodies and commands", () => {
 it("starts with five source-sized minions and no preloaded command, attack or Prey Drive", () => { const world=worldFor(); expect(packs(world)).toHaveLength(5);for(const pack of packs(world)){expect(pack.spec.targetClass).toBe("minion");expect(pack.spec.unitClass).toBeUndefined();expect(pack.hp).toBeCloseTo(335.645);expect(pack.spec.armor).toBeCloseTo(35.397);expect(pack.spec.mr).toBeCloseTo(35.397);expect(pack.spec.radius).toBe(25);expect(pack.memory.target).toBeUndefined();expect(pack.memory.prey).toBeUndefined();} through(world,50);expect(world.units[1].totals.damageTaken).toBe(0); });
 it("summons a missing body after ten static seconds and accepted Q/E contacts reduce that timer", () => { const world=worldFor(); const removed=packs(world)[0]!;damagePet(world,world.units[1],removed,100000,"true",false);expect(packs(world)).toHaveLength(4);world.tick=299;through(world,299);expect(packs(world)).toHaveLength(4);through(world,300);expect(packs(world)).toHaveLength(5);const contact=worldFor(250);noPets(contact);contact.units[0].memory.spawnAt=300;cast(contact,"E",{direction:1,distance:250});through(contact,9);expect(Number(contact.units[0].memory.spawnAt)).toBeLessThanOrEqual(69); });
 it("accepted basic contacts pounce at finite1250speed and expire their command aftertwo seconds", () => { const world=worldFor(600);attackHit(world,world.units[0],world.units[1],false,[]);expect(packs(world).every(pack=>pack.memory.target===-1&&pack.memory.commandUntil===60)).toBe(true);through(world,0);expect(packs(world)[0]!.x).toBeCloseTo(1250/30);through(world,14);expect(world.log.some(row=>row.text.includes("Packmate"))).toBe(true);through(world,60);expect(packs(world).every(pack=>pack.spec.target!(world,pack)===undefined)).toBe(true); });
 it("an actual pet basic switches the stored target ID and damages that recipient", () => { const world=worldFor(900),target=summon(world,300,{targetClass:"minion"});attackHit(world,world.units[0],world.units[1],false,[]);resolveAttackOnPet(world,world.units[0],target,false,[],{});expect(packs(world).every(pack=>pack.memory.target===target.id)).toBe(true);const before=world.units[1].hp;through(world,35);expect(target.hp).toBeLessThan(10000-derive(world.units[0]).ad);expect(world.units[1].hp).toBe(before); });
 it("blind/dodge/parry deny basic commands, while a damage block still commands", () => { for(const guard of ["dodgeAttacks","parry","blockAttacks"] as const){const world=worldFor();state(world,world.units[1],guard);attackHit(world,world.units[0],world.units[1],false,[]);expect(packs(world).some(pack=>pack.memory.target===-1)).toBe(guard==="blockAttacks");}const blind=worldFor();attackHit(blind,blind.units[0],blind.units[1],true,[]);expect(packs(blind).some(pack=>pack.memory.target===-1)).toBe(false); });
 it("root/ground/silence prevent a pounce without lending the owner's CC to the body", () => { for(const cc of ["root","ground","silence"] as const){const world=worldFor(600),pack=packs(world)[0]!;pack.statuses!.push({kind:"cc",key:cc,source:1,startTick:0,endTick:90,value:0});attackHit(world,world.units[0],world.units[1],false,[]);expect(pack.memory.leaping).toBeUndefined();expect(packs(world)[1]!.memory.leaping).toBe(true);} });
 it("Prey Drive stores three actual casts and uses30%damage only on connected pet attacks", () => { const world=worldFor(150),self=world.units[0],target=world.units[1],pack=packs(world)[0]!;for(const key of ["Q","Q2","E"])compiled.spec.hooks!.onCast!({...hookContext(world,self),ability:ability(key)});expect(pack.memory.prey).toBe(3);pack.memory.hidden=false;pack.statuses=[];const base=21.1764705882353+.04*100;state(world,target,"dodgeAttacks");petHit(world,pack,target,pack.spec.attack!.effects,true);expect(pack.memory.prey).toBe(3);target.statuses=[];const before=target.hp;petHit(world,pack,target,pack.spec.attack!.effects,true);expect(before-target.hp).toBeCloseTo(base*1.3);expect(pack.memory.prey).toBe(2);state(world,target,"blockAttacks");petHit(world,pack,target,pack.spec.attack!.effects,true);expect(pack.memory.prey).toBe(1);expect(self.hp).toBeGreaterThan(0); });
 it("normal pet damage amplifies only explicit monsters, and spell shields do not stop a pet basic", () => { const world=worldFor(),pack=packs(world)[0]!,monster=summon(world,100,{targetClass:"monster"}),minion=summon(world,100,{targetClass:"minion"});const base=21.1764705882353+4;petHit(world,pack,monster,pack.spec.attack!.effects,true);petHit(world,pack,minion,pack.spec.attack!.effects,true);expect(10000-monster.hp).toBeCloseTo(base*1.55);expect(10000-minion.hp).toBeCloseTo(base);state(world,world.units[1],"spellShield");petHit(world,pack,world.units[1],pack.spec.attack!.effects,true);expect(world.units[1].totals.damageTaken).toBeCloseTo(base);expect(world.units[1].statuses.some(status=>status.key==="spellShield")).toBe(true); });
 it("area damage takes55%, melee basics200%, and body death never damages its owner", () => { const world=worldFor(),pack=packs(world)[0]!,before=world.units[0].hp;damagePet(world,world.units[1],pack,100,"true",false,"fixture","area");expect(pack.hp).toBeCloseTo(235.645);const spell={key:"fixture",name:"fixture",slot:"Q",cooldown:0,castTime:0,delivery:{kind:"self"},flags:{petContactHooks:true}} as AbilitySpec;abilityHitPetForTest(world,pack,spell);expect(pack.hp).toBeCloseTo(180.645);damagePet(world,world.units[1],pack,100,"true",true);expect(packs(world)).toHaveLength(4);expect(world.units[0].hp).toBe(before); });
 it("inherits real stealth and owner blink offsets; owner death removes all bodies", () => { const world=worldFor();state(world,world.units[0],"invisible");through(world,0);expect(packs(world).every(pack=>pack.statuses!.some(status=>status.key==="invisible"))).toBe(true);const old=packs(world)[0]!.x;world.units[0].x=500;through(world,1);expect(packs(world)[0]!.x-old).toBe(500);dealDamage(world,world.units[1],world.units[0],100000,"true");expect(packs(world)).toHaveLength(0); });
 it("inherits the owner's current effective speed and interval while preserving body-local slow and cripple statuses",()=>{
  const world=worldFor(),self=world.units[0],pack=packs(world)[0]!;expect(pack.spec.ignoreOwnMoveSpeedModifiers).toBe(true);expect(pack.spec.ignoreOwnAttackSpeedSlows).toBe(true);
  pack.statuses!.push({kind:"cc",key:"slow",source:1,startTick:0,endTick:100,value:.9},{kind:"cc",key:"cripple",source:1,startTick:0,endTick:100,value:.9});applyCC(world,world.units[1],self,"slow",2,.25);applyEffect(world,self,self,{type:"stat",stat:"attackSpeed",amount:{base:.4},duration:2},{scale:1});through(world,0);
  expect(pack.spec.moveSpeed).toBe(derive(self).moveSpeed);expect(pack.spec.attack!.interval).toBeCloseTo(1/derive(self).attackSpeed,12);expect(pack.statuses!.some(status=>status.key==="slow")).toBe(true);expect(pack.statuses!.some(status=>status.key==="cripple")).toBe(true);
 });
});
function abilityHitPetForTest(world:World,pack:Pet,spell:AbilitySpec){abilityHitPet(world,world.units[1],pack,spell,[{type:"damage",damageType:"true",amount:{base:100},petDamageCategory:"area"}],"area");}

describe("Darkin Daggers actual contacts and independent recasts", () => {
 it("deals a source75 initial packet and ten actual21.5 bleed pulses", () => {
  const world=worldFor();noPets(world);abilityHit(world,world.units[0],world.units[1],ability("Q"),ability("Q").onHit!);
  expect(world.units[1].totals.damageTaken).toBe(75);through(world,14);expect(world.units[1].totals.damageTaken).toBe(75);
  through(world,15);expect(world.units[1].totals.damageTaken).toBe(96.5);through(world,150);expect(world.units[1].totals.damageTaken).toBe(290);
  through(world,180);expect(world.units[1].totals.damageTaken).toBe(290);
 });
 it("samples missing health before consuming remaining bleed, heals145, and leaves no second bleed", () => {
  const world=worldFor();noPets(world);const self=world.units[0],target=world.units[1];self.hp-=500;
  abilityHit(world,self,target,ability("Q"),ability("Q").onHit!);const before=self.hp,missing=1-target.hp/derive(target).maxHp;
  abilityHit(world,self,target,ability("Q2"),ability("Q2").onHit!);
  expect(target.totals.damageTaken).toBeCloseTo(75+75+215+120+missing*180,10);expect(self.hp-before).toBe(145);
  expect(target.statuses.some(status=>status.kind==="dot")).toBe(false);const damage=target.totals.damageTaken;through(world,160);expect(target.totals.damageTaken).toBe(damage);
 });
 it("consumes only this caster's actual pet bleed and cannot restore it from a stale contact view", () => {
  const world=worldFor(2000);noPets(world);const target=summon(world,100,{targetClass:"minion"}),self=world.units[0];self.hp-=500;
  abilityHitPet(world,self,target,ability("Q"),ability("Q").onHit!,"area");expect(target.statuses!.some(status=>status.kind==="dot")).toBe(true);
  const before=self.hp,missing=1-target.hp/target.spec.hp;abilityHitPet(world,self,target,ability("Q2"),ability("Q2").onHit!,"area");
  expect(10000-target.hp).toBeCloseTo(75+75+215+120+missing*180,10);expect(self.hp).toBe(before);expect(target.statuses!.some(status=>status.kind==="dot")).toBe(false);
  const hp=target.hp;through(world,160);expect(target.hp).toBe(hp);
 });
 it("retains the other source's bleed and a shielded payoff does not consume this source's bleed", () => {
  const world=worldFor();noPets(world);const self=world.units[0],target=world.units[1];
  abilityHit(world,self,target,ability("Q"),ability("Q").onHit!);target.statuses.push({kind:"dot",key:"foreign",source:1,startTick:0,endTick:150,value:0,dot:{perHit:1,intervalTicks:15,nextTick:15,damageType:"true",label:"foreign"}});
  state(world,target,"spellShield");abilityHit(world,self,target,ability("Q2"),ability("Q2").onHit!);expect(target.statuses.filter(status=>status.kind==="dot")).toHaveLength(2);
  abilityHit(world,self,target,ability("Q2"),ability("Q2").onHit!);expect(target.statuses.filter(status=>status.kind==="dot").map(status=>status.key)).toEqual(["foreign"]);
 });
 it.each(["spellShield","parry","untargetable","stasis"] as const)("%s denies a fresh bleed and passive spawn refund",guard=>{
  const world=worldFor();noPets(world);world.units[0].memory.spawnAt=300;state(world,world.units[1],guard);abilityHit(world,world.units[0],world.units[1],ability("Q"),ability("Q").onHit!);
  expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[1].statuses.some(status=>status.kind==="dot")).toBe(false);expect(world.units[0].memory.spawnAt).toBe(300);
 });
 it("executes explicit minions below70 on initial hits but does not guess monster epic status or damage hit-count objects",()=>{
  const world=worldFor(2000);noPets(world);const minion=summon(world,100,{targetClass:"minion",hp:140}),monster=summon(world,100,{targetClass:"monster",hp:140}),object=summon(world,100,{hitPoints:true,hp:3});
  for(const target of [minion,monster,object])abilityHitPet(world,world.units[0],target,ability("Q"),ability("Q").onHit!,"area");
  expect(world.pets).not.toContain(minion);expect(monster.hp).toBe(65);expect(object.hp).toBe(3);expect(object.statuses!.some(status=>status.kind==="dot")).toBe(false);
 });
 it("executes a minion crossing the threshold on an actual bleed tick",()=>{
  const world=worldFor(2000);noPets(world);const target=summon(world,100,{targetClass:"minion",hp:165});abilityHitPet(world,world.units[0],target,ability("Q"),ability("Q").onHit!,"area");expect(target.hp).toBe(90);through(world,15);expect(world.pets).not.toContain(target);
 });
 it("the actual piercing missile skips a minion command and selects its first visible non-minion recipient",()=>{
  const world=worldFor(700);summon(world,100,{targetClass:"minion"});const monster=summon(world,300,{targetClass:"monster"});cast(world,"Q");through(world,25);
  expect(packs(world).every(pack=>pack.memory.target===monster.id)).toBe(true);expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
 });
 it("a real projectile wall destroys the released dagger before any damage or command",()=>{
  const world=worldFor(600);world.zones.push({id:world.nextId++,owner:1,kind:"projectileWall",ability:"fixture",x:100,radius:0,seenTick:0,startTick:0,endTick:100,connects:true});cast(world,"Q");through(world,40);
  expect(world.missiles).toHaveLength(0);expect(world.units[1].totals.damageTaken).toBe(0);expect(packs(world).every(pack=>pack.memory.target===undefined)).toBe(true);
 });
 it("uses the primary half-second recast gate, free second cast and post-recast cooldown",()=>{
  const world=worldFor(2000);noPets(world);const mana=world.units[0].resource;cast(world,"Q");through(world,8);const first=world.units[0].chains.Q!;
  expect(world.units[0].resource).toBe(mana-90);world.tick=first.castTick+14;expect(canCast(world,world.units[0],ability("Q2"))).toBe(false);world.tick=first.castTick+15;expect(canCast(world,world.units[0],ability("Q2"))).toBe(true);
  const declared=world.tick;cast(world,"Q2");through(world,declared+8);expect(world.units[0].resource).toBe(mana-90);expect(world.units[0].cooldownReady.Q).toBe(declared+8+210);expect(world.units[0].chains.Q).toBeUndefined();
 });
 it("starts the cooldown when the unused recast window expires",()=>{
  const world=worldFor(2000);noPets(world);cast(world,"Q");through(world,8);const until=world.units[0].chains.Q!.until;through(world,until);expect(world.units[0].chains.Q).toBeDefined();through(world,until+1);expect(world.units[0].chains.Q).toBeUndefined();expect(world.units[0].cooldownReady.Q).toBe(until+1+210);
 });
 it("keeps a released dagger and existing bleed after owner death without healing the corpse",()=>{
  const world=worldFor(600);noPets(world);cast(world,"Q");through(world,8);dealDamage(world,world.units[1],world.units[0],100000,"true");through(world,200);
  expect(world.units[1].totals.damageTaken).toBe(290);expect(world.units[0].hp).toBeLessThanOrEqual(0);
 });
 it("branch copies keep independent target bleed clocks and commands",()=>{
  const world=worldFor();abilityHit(world,world.units[0],world.units[1],ability("Q"),ability("Q").onHit!);const branch=cloneWorld(world);
  branch.units[1].statuses.find(status=>status.kind==="dot")!.dot!.nextTick=90;branch.pets[0]!.memory.target=123;expect(world.units[1].statuses.find(status=>status.kind==="dot")!.dot!.nextTick).toBe(15);expect(world.pets[0]!.memory.target).toBeUndefined();
 });
});

describe("Call of the Pack declaration and finite hunt",()=>{
 it("starts untargetability, ghosting, AD and pet vanish at declaration and permits movement during the cast",()=>{
  const world=worldFor(800),self=world.units[0],baseAD=derive(self).ad;cast(world,"W");expect(isUntargetable(self,world.units[1])).toBe(true);expect(self.statuses.some(status=>status.key==="ghosted")).toBe(true);expect(derive(self).ad).toBeCloseTo(baseAD*1.2);expect(packs(world).every(pack=>pack.memory.hidden==="W")).toBe(true);
  expect(self.action?.kind).toBe("cast");const before=self.x;step(world,[()=>({kind:"move",direction:1}),standStill]);expect(self.x).toBeGreaterThan(before);
 });
 it("reappears pets at0.9seconds, ends untargetability at1second and adds exactlytwo pets at1.25seconds",()=>{
  const world=worldFor();cast(world,"W");through(world,26);expect(packs(world).every(pack=>pack.memory.hidden==="W")).toBe(true);through(world,27);expect(packs(world).every(pack=>!pack.memory.hidden)).toBe(true);through(world,29);expect(isUntargetable(world.units[0],world.units[1])).toBe(true);through(world,30);expect(isUntargetable(world.units[0],world.units[1])).toBe(false);through(world,37);expect(packs(world)).toHaveLength(5);through(world,38);expect(packs(world)).toHaveLength(7);
 });
 it("recomputes20%totalAD without self-compounding and removes buffs and oldest extras on time",()=>{
  const world=worldFor(),self=world.units[0],baseAD=derive(self).ad;cast(world,"W");through(world,100);expect(derive(self).ad).toBeCloseTo(baseAD*1.2);applyEffect(world,self,self,{type:"stat",stat:"AD",amount:{base:50},duration:10},{scale:1});through(world,101);expect(derive(self).ad).toBeCloseTo((baseAD+50)*1.2);
  const extra=packs(world).filter(pack=>pack.memory.extra);expect(extra).toHaveLength(2);through(world,150);expect(packs(world)).toHaveLength(5);expect(derive(self).ad).toBeCloseTo(baseAD+50);expect(self.statuses.some(status=>status.memoKey==="buff:naafiri:huntMS"&&status.value>0)).toBe(false);
 });
 it("casting R extends only the existing hunt by1.75seconds up tofive remaining seconds",()=>{
  const world=worldFor(600);cast(world,"W");through(world,60);const at=world.tick;cast(world,"R");expect(world.units[0].memory.huntUntil).toBe(Math.min(at+150,150+53));
  const none=worldFor(600);cast(none,"R");expect(none.units[0].memory.huntUntil).toBeUndefined();
 });
 it("a replacement above the normal cap remains temporary when a hunt pet dies",()=>{
  const world=worldFor();cast(world,"W");through(world,38);const extra=packs(world).find(pack=>pack.memory.extra)!;damagePet(world,world.units[1],extra,100000,"true",false);expect(packs(world)).toHaveLength(6);world.units[0].memory.spawnAt=world.tick;through(world,39);expect(packs(world)).toHaveLength(7);expect(packs(world).filter(pack=>pack.memory.extra)).toHaveLength(2);through(world,150);expect(packs(world)).toHaveLength(5);
 });
});

describe("Eviscerate swept contacts and pet return",()=>{
 it("deals separate95dash and240flurry packets, and only the flurry commands its champion",()=>{
  const world=worldFor(350);for(const pack of packs(world))pack.nextAttackTick=Infinity;cast(world,"E",{direction:1,distance:350});expect(packs(world).every(pack=>pack.memory.hidden==="E")).toBe(true);through(world,15);
  expect(world.units[1].totals.damageTaken).toBe(335);expect(packs(world).every(pack=>pack.memory.target===-1&&!pack.memory.hidden)).toBe(true);expect(world.units[0].memory.spawnAt).toBeLessThanOrEqual(60);
 });
 it("a first spell shield blocks only the sweep and the independently guarded flurry still hits",()=>{
  const world=worldFor(350);noPets(world);state(world,world.units[1],"spellShield");cast(world,"E",{direction:1,distance:350});through(world,15);expect(world.units[1].totals.damageTaken).toBe(240);
 });
 it("knockdown cancels the flurry, returns real pets and heals their own health",()=>{
  const world=worldFor(600);for(const pack of packs(world))pack.hp=10;cast(world,"E",{direction:1,distance:450});through(world,1);applyCC(world,world.units[1],world.units[0],"airborne",1);expect(packs(world).every(pack=>!pack.memory.hidden&&pack.hp===335.645)).toBe(true);through(world,30);expect(world.units[1].totals.damageTaken).toBe(0);
 });
 it("flurry chooses a champion before a closer minion and never contacts hit-count objects",()=>{
  const world=worldFor(500),minion=summon(world,450,{targetClass:"minion"}),object=summon(world,450,{hitPoints:true,hp:3});cast(world,"E",{direction:1,distance:450});through(world,15);expect(minion.hp).toBeLessThan(10000);expect(object.hp).toBe(3);expect(packs(world).every(pack=>pack.memory.target===-1)).toBe(true);
 });
 it.each(["root","ground"] as const)("%s prevents a new dash without consuming resource",cc=>{const world=worldFor();applyCC(world,world.units[1],world.units[0],cc,2);expect(canCast(world,world.units[0],ability("E"))).toBe(false);expect(world.units[0].resource).toBe(derive(world.units[0]).maxResource);});
});

describe("Hounds' Pursuit stationary channel and independent collisions",()=>{
 it("channels0.75seconds with true sight and untargetable real pets before tracking at1800speed",()=>{
  const world=worldFor(600);cast(world,"R");expect(world.units[0].action?.kind).toBe("channel");expect(world.units[1].statuses.some(status=>status.key==="revealed")).toBe(true);expect(packs(world).every(pack=>pack.memory.pursuing&&pack.memory.hidden==="R")).toBe(true);through(world,22);expect(world.units[0].x).toBe(0);through(world,23);expect(world.units[0].x).toBe(60);expect(world.units[0].action?.kind).toBe("dash");
 });
 it("deals375owner plus five37.5 pet collisions, lands125in front and issues the real target command",()=>{
  const world=worldFor(600);for(const pack of packs(world))pack.nextAttackTick=Infinity;cast(world,"R");through(world,31);expect(world.units[0].x).toBe(475);expect(world.units[1].totals.damageTaken).toBe(562.5);expect(world.units[1].statuses.find(status=>status.key==="slow")?.value).toBe(.99);expect(packs(world).every(pack=>pack.memory.target===-1&&!pack.memory.hidden)).toBe(true);
 });
 it("spell shield blocks the owner's collision and slow while allfive sourced pet collisions remain",()=>{
  const world=worldFor(600);for(const pack of packs(world))pack.nextAttackTick=Infinity;state(world,world.units[1],"spellShield");cast(world,"R");through(world,31);expect(world.units[1].totals.damageTaken).toBe(187.5);expect(world.units[1].statuses.some(status=>status.key==="slow")).toBe(false);
 });
 it.each(["root","ground","silence","stun"] as const)("%s interrupts the actual channel and returns pets without collisions",cc=>{const world=worldFor(600);cast(world,"R");through(world,5);applyCC(world,world.units[1],world.units[0],cc,2);expect(world.units[0].memory.rPhase).toBeUndefined();expect(packs(world).every(pack=>!pack.memory.hidden&&!pack.memory.pursuing)).toBe(true);through(world,50);expect(world.units[1].totals.damageTaken).toBe(0);});
 it("target untargetability preserves tracking but denies every actual collision",()=>{
  const world=worldFor(600);cast(world,"R");through(world,5);state(world,world.units[1],"untargetable");through(world,31);expect(world.units[0].x).toBe(475);expect(world.units[1].totals.damageTaken).toBe(0);expect(world.units[0].memory.rPhase).toBeUndefined();
 });
 it("tracks a real target blink within the explicit tracking assumption",()=>{
  const world=worldFor(600);cast(world,"R");through(world,24);world.units[1].x=850;through(world,40);expect(world.units[0].x).toBe(725);expect(world.units[1].totals.damageTaken).toBeGreaterThanOrEqual(562.5);
 });
 it("channel target death and leaving cast reach cancel without inventing a takedown recast",()=>{
  for(const invalid of ["death","range"]){const world=worldFor(600);cast(world,"R");if(invalid==="death"){world.units[1].hp=0;world.units[1].alive=false;}else world.units[1].x=2000;through(world,1);expect(world.units[0].memory.rPhase).toBeUndefined();expect(packs(world).every(pack=>!pack.memory.hidden)).toBe(true);expect(world.units[0].memory.rRecastUntil).toBeUndefined();}
 });
 it("only an actual champion kill in the seven-second window unlocks one free shielded recast",()=>{
  const world=worldFor(600),self=world.units[0];cast(world,"R");through(world,31);dealDamage(world,self,world.units[1],100000,"true");expect(self.memory.rRecastTriggered).toBe(true);expect(self.memory.rRecastUntil).toBe(world.tick+360);
  world.units[1].hp=20000;world.units[1].alive=true;delete world.units[1].deathNotified;delete world.result;const resource=self.resource;expect(canCast(world,self,ability("R2"))).toBe(true);cast(world,"R2");expect(self.resource).toBe(resource);expect(shieldTotal(self)).toBe(350);expect(self.memory.rRecastUntil).toBeUndefined();
  const petWorld=worldFor(600);cast(petWorld,"R");through(petWorld,31);const minion=summon(petWorld,100,{targetClass:"minion"});damagePet(petWorld,petWorld.units[0],minion,100000,"true",false);expect(petWorld.units[0].memory.rRecastUntil).toBeUndefined();
 });
 it("R leaves genuine stealth intact while attacks,Q and E break it at declaration",()=>{
  const world=worldFor(600);state(world,world.units[0],"invisible");cast(world,"R");expect(world.units[0].statuses.some(status=>status.key==="invisible")).toBe(true);through(world,24);expect(world.units[0].statuses.some(status=>status.key==="invisible")).toBe(true);
  for(const key of ["Q","E"]){const other=worldFor();state(other,other.units[0],"invisible");cast(other,key);expect(other.units[0].statuses.some(status=>status.key==="invisible")).toBe(false);}
 });
 it("R and E endpoint geometry reflect at exact co-location",()=>{
  for(const key of ["R","E"]){const left=worldFor(0);noPets(left);const right=createWorld({fighters:[left.units[1].spec,left.units[0].spec],distance:0,modes:["idle","idle"]});right.units[0].x=right.units[1].x=0;right.pets=[];right.units[1].memory.spawnAt=Infinity;
   startCast(left,left.units[0],ability(key),key==="E"?{direction:1,distance:250}:undefined);startCast(right,right.units[1],ability(key),key==="E"?{direction:1,distance:250}:undefined);through(left,40);through(right,40);expect(left.units[0].x).toBeCloseTo(-right.units[1].x,12);expect(left.units[1].totals.damageTaken).toBeCloseTo(right.units[0].totals.damageTaken,12);
  }
 });
});
