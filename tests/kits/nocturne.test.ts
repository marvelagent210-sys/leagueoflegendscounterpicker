import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, canCast, startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, beginDeathDefied, beginResurrection, canSee, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, runWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Nocturne from "../../kits/champions/Nocturne";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Nocturne"), records("Nocturne"), Nocturne, {}, pets("Nocturne"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}) => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const worldFor = (distance = 400, bonus: FighterSpec["bonus"] = {}) => { const world = createWorld({ fighters: [subject(bonus), dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 30, maxBranches: 1, reactionTime: 10 } }); world.units[0].x = 0; world.units[1].x = distance; return world; };
const ability = (world: World, key: string) => world.units[0].spec.abilities.find((a) => a.key === key)!;
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const state = (world: World, side: 0 | 1, key: StateType, duration = 30) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration }, { scale: 1 });
const basic = (world: World, blinded = false) => attackHit(world, ...world.units, blinded, []);
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Test pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: Infinity, ...changes });
const contact = (world: World, key: string, pet?: Pet) => { const spell = ability(world, key); if (pet) abilityHitPet(world, world.units[0], pet, spell, spell.onHit!, "area"); else abilityHit(world, ...world.units, spell, spell.onHit!); };
const petBasic = (world: World, pet: Pet) => { startAttack(world, world.units[0], pet); const action = world.units[0].action; expect(action?.kind).toBe("windup"); if (action?.kind === "windup") advance(world, action.launchTick); world.units[0].attackReadyTick = world.tick; };
const launchR = (world: World) => { cast(world, "R"); advance(world, 8); expect(canCast(world, world.units[0], ability(world, "R2"))).toBe(true); cast(world, "R2"); };

describe("Nocturne production and source contract", () => {
  it("uses the five exact revisions, full binary arrays and primary conflicts", () => {
    const value = compiled(); expect(new Set(value.evidence.filter((e) => !e.url).map((e) => e.revid))).toEqual(new Set([4015219,4007794,4026429,4064858,3948584]));
    expect(value.evidence.filter((e) => e.url)).toHaveLength(10);
    expect(value.assumptions.join(" ")).toContain("HealLevel18Value32"); expect(value.assumptions.join(" ")).toContain("obsolete5000");
    expect(value.variants).toEqual([]);
    const world = worldFor(); expect(ability(world,"Q")).toMatchObject({ cooldown:8,cost:80,castTime:.25,deliveryAtCastStart:true }); expect(ability(world,"E")).toMatchObject({cooldown:11,cost:80,castTime:0}); expect(ability(world,"W")).toMatchObject({cooldown:12,cost:50}); expect(ability(world,"R")).toMatchObject({cooldown:100,cost:100,castTime:0});
  });
  it("finishes all six 15000-gold scenarios against actual Heimerdinger pets", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices;
    const result = simulateMatchup(compiled().spec,kit("Heimerdinger",{upgrade:2}).spec,15000,prices);
    expect(Number.isFinite(result.score)).toBe(true); expect(result.scenarios).toHaveLength(6);
    for(const scenario of result.scenarios) for(const outcome of scenario.outcomes) expect(Number.isFinite(outcome.seconds)).toBe(true);
  },120000);
  it("reflects full 15000-gold production builds and all six scores exactly against Darius", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url),"utf8")) as {statPrices:StatPrices}).statPrices;
    const spec = compiled().spec, opponent = kit("Darius").spec;
    const forward = simulateMatchup(spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
      for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
    }
    const casts = forward.scenarios.flatMap(s => s.outcomes.flatMap(o => o.timeline.filter(row => row.side === 0 && row.text.startsWith("casts ")).map(row => row.text)));
    for (const name of ["Duskbringer", "Shroud of Darkness", "Unspeakable Horror", "Paranoia"]) expect(casts.some(text => text.includes(name))).toBe(true);
  }, 120000);
  it("runs a mirrored normal duel symmetrically without nonfinite outcomes", () => {
    const result = fairFight({fighters:[subject(),subject()],distance:600,modes:["fight","fight"],settings:{maxSeconds:12,maxBranches:1}}); expect(result.damage[0]).toBeCloseTo(result.damage[1]); expect(Number.isFinite(result.seconds)).toBe(true);
  });
});

describe("Umbra Blades actual basic", () => {
  it("replaces the primary packet with120%AD, heals32+30%AP and reduces its static timer", () => {
    const world=worldFor(100,{ap:100});world.units[0].hp-=1000; const before=world.units[0].hp;basic(world);
    expect(100000-world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad*1.2);expect(world.units[0].hp-before).toBeCloseTo(62);expect(world.units[0].memory["nocturne:umbra"]).toBe(270);
    basic(world);expect(world.units[0].memory["nocturne:umbra"]).toBe(180);
  });
  it("uses110%AD times total critical damage only for the primary", () => {
    const world=worldFor(100,{critChance:1}); const pet=spawnPet(world,world.units[1],petSpec(),200);basic(world);
    expect(100000-world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad*1.1*derive(world.units[0]).critDamage);expect(10000-pet.hp).toBeCloseTo(derive(world.units[0]).ad*1.2);
  });
  it.each(["dodgeAttacks","blockAttacks","parry"] as const)("respects primary%s while the parried primary keeps a separate splash", (guard) => {
    const world=worldFor(100);const pet=spawnPet(world,world.units[1],petSpec(),200);state(world,1,guard);basic(world);
    expect(world.units[1].hp).toBe(100000);expect(10000-pet.hp).toBeCloseTo(guard==="dodgeAttacks"?0:derive(world.units[0]).ad*1.2);
  });
  it("blind leaves the passive ready; spellshield does not protect the basic or slash", () => {
    const world=worldFor(100);basic(world,true);expect(world.units[0].memory["nocturne:umbra"]).toBe(0);state(world,1,"spellShield");basic(world);expect(100000-world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad*1.2);expect(hasState(world.units[1],"spellShield")).toBe(true);
  });
  it("heals per actual class and halves secondary minion damage only", () => {
    const world=worldFor(100);world.units[0].hp-=1000;const before=world.units[0].hp;const minion=spawnPet(world,world.units[1],petSpec({targetClass:"minion"}),200);const monster=spawnPet(world,world.units[1],petSpec({targetClass:"monster",areaTaken:.2}),250);const outside=spawnPet(world,world.units[1],petSpec(),361);basic(world);
    expect(10000-minion.hp).toBeCloseTo(derive(world.units[0]).ad*.6);expect(10000-monster.hp).toBeCloseTo(derive(world.units[0]).ad*1.2);expect(outside.hp).toBe(10000);expect(world.units[0].hp-before).toBe(80);
  });
  it("uses a pet as the actual primary with class-specific timer reduction", () => {
    const world=worldFor(1500), pet=spawnPet(world,world.units[1],petSpec({targetClass:"minion"}),100);world.units[0].hp-=1000;const before=world.units[0].hp;petBasic(world,pet);
    expect(10000-pet.hp).toBeCloseTo(derive(world.units[0]).ad*1.2);expect(world.units[0].hp-before).toBe(16);expect(world.units[0].memory["nocturne:umbra"]).toBe(world.tick-1+330);
  });
  it("keeps hit-count objects outside the spell slash and passive empowerment", () => {
    const world=worldFor(1500),pet=spawnPet(world,world.units[1],petSpec({hitPoints:true,hp:4}),100);petBasic(world,pet);expect(pet.hp).toBe(3);expect(world.units[0].memory["nocturne:umbra"]).toBe(0);
  });
  it("applies grievous wounds to the ordinary healing", () => {
    const world=worldFor(100);world.units[0].hp-=1000;applyEffect(world,world.units[1],world.units[0],{type:"grievousWounds",duration:10},{scale:1});const before=world.units[0].hp;basic(world);expect(world.units[0].hp-before).toBeCloseTo(32*.6);
  });
});

describe("Duskbringer actual flight and trail", () => {
  it("releases at declaration, pierces real pets and creates occupancy-boundAD/MS", () => {
    const world=worldFor(400,{ad:100});const pet=spawnPet(world,world.units[1],petSpec({areaTaken:.4}),200);cast(world,"Q");expect(world.missiles).toHaveLength(1);advance(world,12);
    expect(100000-world.units[1].hp).toBeCloseTo(310);expect(10000-pet.hp).toBeCloseTo(124);expect(derive(world.units[0]).bonusAd).toBe(155);expect(world.units[1].statuses.some(s=>s.key==="nocturne:dusk")).toBe(true);
    world.units[0].x=-1000;advance(world,16);expect(derive(world.units[0]).bonusAd).toBe(100);expect(hasState(world.units[0],"ghosted")).toBe(false);
  });
  it("excludes the trail'sAD from a secondQ without excluding purchasedAD", () => {
    const world=worldFor(400,{ad:100});cast(world,"Q");advance(world,30);world.units[0].cooldownReady.Q=world.tick;cast(world,"Q");advance(world,60);expect(100000-world.units[1].hp).toBeCloseTo(620);
  });
  it.each(["spellShield","parry","untargetable","stasis"] as const)("%s prevents damage and the moving tag",guard=>{
    const world=worldFor();state(world,1,guard);cast(world,"Q");advance(world,30);expect(world.units[1].hp).toBe(100000);expect(world.units[1].statuses.some(s=>s.key==="nocturne:dusk")).toBe(false);
  });
  it("retains an already formed trail when a wall destroys the projectile",()=>{
    const world=worldFor(400);world.zones.push({id:99,owner:1,kind:"projectileWall",seenTick:0,x:200,radius:0,startTick:0,endTick:200});cast(world,"Q");advance(world,30);expect(world.missiles).toHaveLength(0);expect(world.units[1].hp).toBe(100000);expect(world.zones.some(z=>z.ability==="Qtrail")).toBe(true);expect(derive(world.units[0]).bonusAd).toBe(55);
  });
  it("continues the released missile after death",()=>{
    const world=worldFor();cast(world,"Q");dealDamage(world,world.units[1],world.units[0],100000,"true");world.units[0].alive=false;for(let tick=0;tick<=30;tick++){world.tick=tick;advanceMissiles(world);}expect(100000-world.units[1].hp).toBe(225);expect(world.zones.some(z=>z.ability==="Qtrail")).toBe(true);
  });
  it("leaves actual moving tagged trails without revealing stealth for targeting",()=>{
    const world=worldFor();cast(world,"Q");advance(world,20);state(world,1,"invisible");world.units[1].x=900;advance(world,21);expect(world.zones.some(z=>z.ability==="Qtrail"&&z.x+z.radius>=900)).toBe(true);expect(canSee(world.units[1],world.units[0])).toBe(false);
  });
  it("multiplies the trail MS with external bonuses before soft caps",()=>{
    const world=worldFor();cast(world,"Q");advance(world,10);applyEffect(world,world.units[0],world.units[0],{type:"stat",stat:"moveSpeedPercent",amount:{base:.9},duration:10},{scale:1});expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(world.units[0].spec.base.moveSpeed*1.9*1.4);
  });
  it.each([0,1] as const)("keeps a declaration-timed Q reflected at exact overlap on side%s",side=>{const own=subject();const world=createWorld({fighters:side===0?[own,dummy()]:[dummy(),own],distance:0,modes:["idle","idle"]});world.units[0].x=world.units[1].x=0;const self=world.units[side];startCast(world,self,self.spec.abilities.find(a=>a.key==="Q")!);expect(world.missiles.find(m=>m.owner===side)!.direction).toBe(side===0?1:-1);});
});

describe("Shroud and Unspeakable Horror",()=>{
  it("grants only the extra50%AS when its own shield is consumed",()=>{
    const world=worldFor();const innate=derive(world.units[0]).bonusAttackSpeed;cast(world,"W");const hostile={...ability(world,"Etick"),key:"hostile",flags:{spellShield:true}};abilityHit(world,world.units[1],world.units[0],hostile,[{type:"damage",damageType:"magic",amount:{base:100}}]);expect(derive(world.units[0]).bonusAttackSpeed-innate).toBeCloseTo(.5);advance(world,151);expect(derive(world.units[0]).bonusAttackSpeed).toBe(innate);
  });
  it("does not grant procAS for natural expiry or an unrelated spellshield",()=>{
    const world=worldFor();const innate=derive(world.units[0]).bonusAttackSpeed;cast(world,"W");advance(world,46);expect(derive(world.units[0]).bonusAttackSpeed).toBe(innate);state(world,0,"spellShield");abilityHit(world,world.units[1],world.units[0],{...ability(world,"Etick"),flags:{spellShield:true}},[{type:"damage",damageType:"magic",amount:{base:100}}]);expect(derive(world.units[0]).bonusAttackSpeed).toBe(innate);
  });
  it("deals four persistent ticks then fear/slow, ignoring a later shield",()=>{
    const world=worldFor(400,{ap:100});cast(world,"E");state(world,1,"spellShield");advance(world,14);expect(world.units[1].hp).toBe(100000);advance(world,15);expect(100000-world.units[1].hp).toBe(90);advance(world,60);expect(100000-world.units[1].hp).toBe(360);expect(world.units[1].statuses.find(s=>s.key==="fear")).toMatchObject({endTick:128});expect(world.units[1].statuses.find(s=>s.key==="slow")).toMatchObject({value:.9});expect(hasState(world.units[1],"spellShield")).toBe(true);
  });
  it("a shield at application blocks the entire tether",()=>{const world=worldFor();state(world,1,"spellShield");cast(world,"E");advance(world,70);expect(world.units[1].hp).toBe(100000);expect(world.units[1].statuses.some(s=>s.key==="fear")).toBe(false);});
  it("breaks at the actual465edge leash and never resumes",()=>{const world=worldFor();cast(world,"E");advance(world,15);world.units[1].x=600;advance(world,16);world.units[1].x=400;advance(world,70);expect(100000-world.units[1].hp).toBe(65);expect(world.units[1].statuses.some(s=>s.key==="fear")).toBe(false);});
  it("uses an independent actual pet tether",()=>{const world=worldFor(1500),pet=spawnPet(world,world.units[1],petSpec({areaTaken:.4}),400);contact(world,"E",pet);advance(world,60);expect(10000-pet.hp).toBeCloseTo(104);expect(pet.statuses?.some(s=>s.key==="fear")).toBe(true);expect(world.units[1].hp).toBe(100000);});
  it("fear-facing speed uses directionTo at co-location for both sides",()=>{for(const side of [0,1] as const){const world=worldFor();const self=world.units[0],enemy=world.units[1];self.side=side;enemy.side=side===0?1:0;if(side===1)world.units=[enemy,self];self.x=enemy.x=0;self.facing=directionTo(self,enemy);applyEffect(world,self,enemy,{type:"cc",cc:"fear",duration:10},{scale:1});advance(world,0);expect(self.statuses.some(s=>s.memoKey==="buff:nocturne:fearSpeed")).toBe(true);}});
  it("does not haste while facing away or outside1000",()=>{const world=worldFor();applyEffect(world,world.units[0],world.units[1],{type:"cc",cc:"fear",duration:10},{scale:1});world.units[0].facing=-1;advance(world,0);expect(world.units[0].statuses.some(s=>s.memoKey==="buff:nocturne:fearSpeed")).toBe(false);world.units[0].facing=1;world.units[1].x=1001;advance(world,1);expect(world.units[0].statuses.some(s=>s.memoKey==="buff:nocturne:fearSpeed")).toBe(false);});
});

describe("Paranoia true recast and tracking dash",()=>{
  it("spends mana once, gates the recast and starts cooldown only on usage/timeout",()=>{const world=worldFor(1200);const resource=world.units[0].resource;cast(world,"R");expect(world.units[0].resource).toBe(resource-100);expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(false);expect(world.units[0].cooldownReady.R??0).toBe(0);advance(world,8);expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(true);cast(world,"R2");expect(world.units[0].resource).toBe(resource-100);expect(world.units[0].cooldownReady.R).toBe(world.tick+3000);const other=worldFor();cast(other,"R");advance(other,181);expect(other.units[0].cooldownReady.R).toBe(3181);});
  it("applies mobile1050nearsight to untargetable/dead and keeps it through resurrection",()=>{const world=worldFor(1200);state(world,1,"untargetable");cast(world,"R");expect(canSee(world.units[0],world.units[1])).toBe(false);world.units[1].x=800;expect(canSee(world.units[0],world.units[1])).toBe(true);beginResurrection(world,world.units[1],{duration:1});expect(world.units[1].statuses.some(s=>s.key==="nearsight")).toBe(true);const dead=worldFor();dead.units[1].alive=false;dead.units[1].hp=0;cast(dead,"R");expect(dead.units[1].statuses.find(s=>s.key==="nearsight")).toMatchObject({persistThroughDeath:true});});
  it("can cast global nearsight beyond flight range without allowing an out-of-range recast",()=>{const world=worldFor(5000);state(world,1,"invisible");expect(canCast(world,world.units[0],ability(world,"R"))).toBe(true);cast(world,"R");expect(world.units[1].statuses.find(s=>s.key==="nearsight")).toMatchObject({value:1050});advance(world,8);expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(false);world.units[1].x=4000;world.units[1].statuses=world.units[1].statuses.filter(s=>s.key!=="invisible");expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(true);});
  it("initial nearsight respects spellshields/CC immunity and excludes clones",()=>{for(const guard of ["spellShield","ccImmune"] as const){const world=worldFor();state(world,1,guard);const pet=spawnPet(world,world.units[1],petSpec({targetClass:"champion",unitClass:"clone"}),100);cast(world,"R");expect(world.units[1].statuses.some(s=>s.key==="nearsight")).toBe(false);expect(pet.statuses?.some(s=>s.key==="nearsight")??false).toBe(false);}});
  it("takes real flight time and tracks a relocation beyond obsolete5000",()=>{const world=worldFor(1200);launchR(world);const start=world.tick;advance(world,start+5);expect(world.units[0].x).toBe(300);world.units[1].x=7000;advance(world,start+15);expect(world.units[0].action?.kind).toBe("dash");world.units[1].x=1000;advance(world,start+25);expect(world.units[0].action).toBeUndefined();expect(100000-world.units[1].hp).toBe(400);expect(hasState(world.units[0],"displacementImmune")).toBe(false);});
  it.each(["ground","root"] as const)("%s prevents the recast without spending another mana charge",guard=>{const world=worldFor();cast(world,"R");advance(world,8);applyEffect(world,world.units[1],world.units[0],{type:"cc",cc:guard,duration:5},{scale:1});expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(false);});
  it("protects displacement during flight while allowing otherCC and overlays",()=>{const world=worldFor(1200);launchR(world);const action=world.units[0].action;applyEffect(world,world.units[1],world.units[0],{type:"displace",direction:"away",distance:1000,duration:1},{scale:1});expect(world.units[0].action).toBe(action);expect(world.units[0].forced).toBeUndefined();for(const key of ["Q","W","E"]) {if(key==="E")world.units[1].x=400;expect(canCast(world,world.units[0],ability(world,key))).toBe(true);} });
  it("refreshes the survivingWshield during actual flight",()=>{const world=worldFor(3500);cast(world,"W");launchR(world);advance(world,60);expect(hasState(world.units[0],"spellShield")).toBe(true);expect(world.units[0].statuses.find(s=>s.key==="spellShield")!.endTick).toBeGreaterThan(90);});
  it("does not grant launch-time refresh to a shield first cast during flight",()=>{const world=worldFor(3500);launchR(world);cast(world,"W");const shield=world.units[0].statuses.find(s=>s.key==="spellShield")!;const originalEnd=shield.endTick;advance(world,originalEnd-1);expect(shield.endTick).toBe(originalEnd);expect(hasState(world.units[0],"spellShield")).toBe(true);advance(world,originalEnd);expect(hasState(world.units[0],"spellShield")).toBe(false);});
  it("cannot refresh a consumed launch shield or transfer that entitlement to a later cast",()=>{const world=worldFor(3500);cast(world,"W");launchR(world);const hostile={...ability(world,"Etick"),flags:{spellShield:true}};abilityHit(world,world.units[1],world.units[0],hostile,[{type:"damage",damageType:"magic",amount:{base:1}}]);expect(hasState(world.units[0],"spellShield")).toBe(false);world.units[0].cooldownReady.W=world.tick;cast(world,"W");const shield=world.units[0].statuses.find(s=>s.key==="spellShield")!;const originalEnd=shield.endTick;advance(world,originalEnd);expect(shield.endTick).toBe(originalEnd);expect(hasState(world.units[0],"spellShield")).toBe(false);});
  it.each(["spellShield","untargetable","stasis"] as const)("%s denies the arrival packet",guard=>{const world=worldFor(1200);launchR(world);state(world,1,guard);advance(world,60);expect(world.units[1].hp).toBe(100000);expect(world.units[0].action).toBeUndefined();});
  it("visibility loss after declaration preserves tracking and damage",()=>{const world=worldFor(1200);launchR(world);state(world,1,"invisible");advance(world,60);expect(100000-world.units[1].hp).toBe(400);});
  it("target death, caster death and resurrection never deliver arrival damage",()=>{for(const condition of ["target","caster","resurrection"]){const world=worldFor(1200);launchR(world);if(condition==="target"){world.units[1].hp=0;world.units[1].alive=false;}else if(condition==="caster"){world.units[0].hp=0;world.units[0].alive=false;}else beginResurrection(world,world.units[0],{duration:1});advance(world,60);expect(world.units[1].hp).toBe(condition==="target"?0:100000);}});
  it.each(["trade","hold"] as const)("reserves both genuinely readyRstages in%s",mode=>{const world=worldFor();world.modes[0]=mode;for(const key of ["Q","W","E"])world.units[0].cooldownReady[key]=1000;expect(canCast(world,world.units[0],ability(world,"R"))).toBe(true);expect(world.units[0].spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:mode==="trade"?1:0});cast(world,"R");advance(world,8);expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(true);expect(world.units[0].spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:mode==="trade"?1:0});});
  it("preserves completed-trade retreat and branch-local state",()=>{const world=worldFor();cast(world,"R");advance(world,8);world.modes[0]="trade";world.units[0].memory.tradeDone=true;expect(canCast(world,world.units[0],ability(world,"R2"))).toBe(true);expect(world.units[0].spec.behavior!(perceive(world,0))).toEqual({kind:"move",direction:-1});const clone=cloneWorld(world);clone.units[0].memory["nocturne:umbra"]=999;expect(world.units[0].memory["nocturne:umbra"]).toBe(0);});
  it("resource starvation cannot declare any paid ability",()=>{const world=worldFor();world.units[0].resource=0;for(const key of ["Q","W","E","R"])expect(canCast(world,world.units[0],ability(world,key))).toBe(false);});
});
