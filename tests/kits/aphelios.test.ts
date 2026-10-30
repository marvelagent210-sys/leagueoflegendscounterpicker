import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { attackTiming, canCast, canStartAttack, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect, attackHit, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import { simulateMatchup } from "../../engine/sim/matchup";
import type { FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Aphelios from "../../kits/champions/Aphelios";
import { championData, records, pets, kit } from "./helpers";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
const compiled = (startingWeapons = 0) => compileKit(championData("Aphelios"), records("Aphelios"), Aphelios, { startingWeapons }, pets("Aphelios"));
const base = compiled();
const ability = (w: World, key: string) => w.units[0].spec.abilities.find((a) => a.key === key)!;
function world(pair = 0, x = 300, bonus: FighterSpec["bonus"] = { ad: 100, ap: 100 }) {
 const spec = compiled(pair).spec;
 const w = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus }, fighter({ base: { hp: 50000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 60, maxBranches: 1 } });
 w.units[0].x = 0; w.units[1].x = x; return w;
}
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [standStill, standStill]); }
function cast(w: World, key: string) { return startCast(w, w.units[0], ability(w, key)); }
function hit(w: World, key: string) { const a = ability(w, key); abilityHit(w, w.units[0], w.units[1], a, a.onHit ?? []); }
function state(w: World, key: StateType, self = false) { const u = w.units[self ? 0 : 1]; applyEffect(w, u, u, { type: "state", state: key, duration: 10 }, { scale: 1 }); }
function basic(w: World, duration = 50) { startAttack(w, w.units[0]); through(w, w.tick + duration); }
function summon(w: World, x = 200, targetClass: "minion" | "champion" = "minion") { return spawnPet(w, w.units[1], { kind: "dummy", name: "Dummy", targetClass, hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, x); }
const mark = (w: World, key = "aphelios:calibrum") => w.units[1].statuses.find((s) => s.key === key);

describe("Aphelios pinned sources and finite preparation", () => {
 it("reads all fifteen exact primary revisions and the separately pinned game file", () => { expect(new Set(base.evidence.filter((e) => e.revid > 0).map((e) => e.revid))).toEqual(new Set(records("Aphelios").map((r) => r.page.revid).concat(pets("Aphelios").map((p) => p.page.revid)))); expect(base.evidence.some((e) => e.sourceSha256 === "1c6c629c1af168cb9c88886bfebbc440b4cb09a5fb826c6997f3c88c914735bd" && e.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release")).toBe(true); });
 it("searches ten unordered pairs only when unpinned", () => { const search = compileKit(championData("Aphelios"), records("Aphelios"), Aphelios, {}, pets("Aphelios")); expect(search.variants.map((v) => v.startingWeapons)).toEqual([0,1,2,3,4,5,6,7,8,9]); expect(base.variants).toEqual([]); });
 it("rejects impossible pair indices", () => { expect(() => compiled(10)).toThrow("pair index"); });
 it("starts with real canonical ammo and no free marks, shield or Chakrams", () => { const w = world(); expect(w.units[0].memory).toMatchObject({ "aph:main":0,"aph:off":1,"aph:queue":"[2,3,4]","aph:chakrams":0 }); for(let i=0;i<5;i++)expect(w.units[0].memory[`aph:ammo:${i}`]).toBe(50);expect(mark(w)).toBeUndefined();expect(w.units[0].statuses.some((s)=>s.kind==="shield")).toBe(false); });
 it("maxes all three passive stat tracks", () => { const w=world(); expect(w.units[0].statuses.filter((s)=>s.kind==="stat").map((s)=>[s.key,s.value])).toEqual(expect.arrayContaining([["AD",24],["attackSpeed",.54],["lethality",27]])); });
 it("Phase takes .25 seconds, preserves windup and has a static .8 second cooldown", () => { const w=world(); startAttack(w,w.units[0]); const launch=w.units[0].action?.kind==="windup"?w.units[0].action.launchTick:0;cast(w,"W");expect(w.units[0].memory["aph:main"]).toBe(0);expect(w.units[0].action).toMatchObject({kind:"windup",launchTick:launch});through(w,7);expect(w.units[0].memory["aph:main"]).toBe(0);through(w,8);expect(w.units[0].memory["aph:main"]).toBe(1);expect(w.units[0].cooldownReady.W).toBe(24); });
 it("consumes ammunition on declaration even if windup is canceled", () => { const w=world();startAttack(w,w.units[0]);expect(w.units[0].memory["aph:ammo:0"]).toBe(49);w.units[0].action=undefined;expect(w.units[0].memory["aph:ammo:0"]).toBe(49); });
 it("a low-ammo Q uses remaining moonlight plus sixty mana", () => { const w=world(),before=w.units[0].resource;w.units[0].memory["aph:ammo:0"]=3;cast(w,"QCalibrum");expect(w.units[0].memory["aph:ammo:0"]).toBe(0);through(w,15);expect(w.units[0].resource).toBe(before-60); });
 it("exhaustion assembles next reserve for one second and locks Q for 1.5", () => { const w=world();w.units[0].memory["aph:ammo:0"]=1;startAttack(w,w.units[0]);expect(canCast(w,w.units[0],ability(w,"W"))).toBe(false);through(w,29);expect(w.units[0].memory["aph:main"]).toBe(0);through(w,30);expect(w.units[0].memory["aph:main"]).toBe(2);expect(w.units[0].memory["aph:queue"]).toBe("[3,4,0]");expect(w.units[0].cooldownReady.QGravitum).toBe(45); });
 it("weapon and queue memories clone independently", () => { const w=world(),c=cloneWorld(w);c.units[0].memory["aph:ammo:0"]=1;startAttack(c,c.units[0]);expect(w.units[0].memory["aph:ammo:0"]).toBe(50);expect(w.units[0].memory["aph:queue"]).toBe("[2,3,4]"); });
});

describe("Aphelios Calibrum and guarded weapon attacks", () => {
 it("Moonshot is170+.6bonusAD+AP and grants a4.5-second ordinary-sight mark", () => { const w=world();hit(w,"QCalibrum");expect(w.units[1].totals.damageTaken).toBeCloseTo(170+.6*derive(w.units[0]).bonusAd+100);expect(mark(w)?.endTick).toBe(135);expect(w.units[1].statuses.some((s)=>s.key==="revealed")).toBe(false); });
 it("a spell shield blocks Moonshot damage and mark",()=>{const w=world();state(w,"spellShield");hit(w,"QCalibrum");expect(w.units[1].totals.damageTaken).toBe(0);expect(mark(w)).toBeUndefined();});
 it("Moonshot collides with an actual pet and never marks its owner",()=>{const w=world(0,600),p=summon(w);cast(w,"QCalibrum");through(w,45);expect(p.hp).toBeLessThan(5000);expect(p.statuses?.some((s)=>s.key==="aphelios:calibrum")).toBe(true);expect(mark(w)).toBeUndefined();expect(w.units[1].totals.damageTaken).toBe(0);});
 it("a projectile wall destroys Moonshot",()=>{const w=world(0,600);w.zones.push({id:999,owner:1,kind:"projectileWall",x:200,radius:0,seenTick:0,startTick:0,endTick:300});cast(w,"QCalibrum");through(w,80);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("mark consumes no ammo and uses Severum without another on-attack",()=>{const w=world();hit(w,"QCalibrum");const before=w.units[1].totals.damageTaken;basic(w);expect(w.units[0].memory["aph:ammo:0"]).toBe(50);expect(w.units[0].memory["aph:ammo:1"]).toBe(50);expect(w.units[1].totals.damageTaken-before).toBeCloseTo(derive(w.units[0]).ad+15+.15*derive(w.units[0]).bonusAd);expect(mark(w)).toBeUndefined();});
 it("Calibrum provides100range and a marked target provides1800",()=>{const w=world(0,1000);expect(canStartAttack(w,w.units[0])).toBe(false);hit(w,"QCalibrum");expect(canStartAttack(w,w.units[0])).toBe(true);expect(w.units[0].spec.attack.bonusRangeFor!(w.units[0],w.units[1])+w.units[0].spec.attack.range).toBe(1800);});
 it.each(["dodgeAttacks","blockAttacks","parry"] as const)("%s denies Severum damage and healing",(key)=>{const w=world(4);w.units[0].hp-=1000;state(w,key);basic(w);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[0].totals.healing).toBe(0);});
 it("Severum is uncancellable, nonprojectile and heals8% after mitigation",()=>{const w=world(4);w.units[0].hp-=1000;state(w,"projectileBlock");startAttack(w,w.units[0]);expect(w.units[0].action).toMatchObject({uncancellable:true,missileSpeed:0});through(w,40);expect(w.units[0].totals.healing).toBeCloseTo(derive(w.units[0]).ad*.08);});
 it("Severum excess healing accumulates a capped30-second shield",()=>{const w=world(4);for(let i=0;i<100;i++)attackHit(w,w.units[0],w.units[1],false,[],undefined,false,{attackTag:"aph:1:basic"});const shield=w.units[0].statuses.find((s)=>s.memoKey==="aph:severumShield");expect(shield?.value).toBeCloseTo(160+.06*derive(w.units[0]).maxHp);expect(shield?.endTick).toBe(900);});
 it("Infernum's primary packet is110%AD and crit affects it once",()=>{const w=world(9,300,{ad:100,critChance:1});basic(w);expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad*1.1*derive(w.units[0]).critDamage);});
 it("reflection does not manufacture another weapon contact",()=>{const w=world(4);applyEffect(w,w.units[1],w.units[1],{type:"state",state:"reflectAttacks",value:37,duration:5},{scale:1});basic(w);expect(w.units[0].totals.damageTaken+w.units[0].totals.absorbed).toBeCloseTo(37*100/(100+derive(w.units[0]).mr.base+derive(w.units[0]).mr.bonus));expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad);});
});

describe("Aphelios Gravitum and mobile Onslaught",()=>{
 it("Gravitum slow starts30%, decays to15% at.7, expires2.5",()=>{const w=world(7);basic(w,18);const m=mark(w,"aphelios:gravitum")!;expect(w.units[1].statuses.find((s)=>s.memoKey==="aph:gravSlow")?.value).toBe(.3);through(w,m.startTick+21);expect(w.units[1].statuses.find((s)=>s.memoKey==="aph:gravSlow")?.value).toBe(.15);through(w,m.endTick);expect(mark(w,"aphelios:gravitum")).toBeUndefined();});
 it("Gravitum debuff exists through slow immunity",()=>{const w=world(7);state(w,"slowImmune");basic(w,30);expect(mark(w,"aphelios:gravitum")).toBeDefined();expect(w.units[1].statuses.some((s)=>s.key==="slow")).toBe(false);});
 it("Binding Eclipse requires a mark or a real in-flight Gravitum",()=>{const w=world(7);expect(canCast(w,w.units[0],ability(w,"QGravitum"))).toBe(false);startAttack(w,w.units[0]);launchAttack(w,w.units[0]);expect(canCast(w,w.units[0],ability(w,"QGravitum"))).toBe(true);});
 it("Binding expunges the slow and deals140+.5bonusAD+.7AP with a1second root",()=>{const w=world(7);basic(w,25);const before=w.units[1].totals.damageTaken;cast(w,"QGravitum");through(w,w.tick+12);expect(w.units[1].totals.damageTaken-before).toBeCloseTo(140+.5*derive(w.units[0]).bonusAd+70);expect(mark(w,"aphelios:gravitum")).toBeUndefined();expect(w.units[1].statuses.find((s)=>s.key==="root")).toBeDefined();});
 it("Onslaught starts off-hand, spends only10 ammo, and channel blocks W/R",()=>{const w=world(4);cast(w,"QSeverum");through(w,1);expect(w.units[0].memory["aph:ammo:1"]).toBe(40);expect(w.units[0].memory["aph:ammo:2"]).toBe(50);expect(w.missiles.some((m)=>m.attack?.attackTag?.startsWith("aph:2:onslaught:"))).toBe(true);expect(canCast(w,w.units[0],ability(w,"W"))).toBe(false);expect(canCast(w,w.units[0],ability(w,"RSeverum"))).toBe(false);});
 it("Onslaught is mobile, keeps a finite pulse clock and pays cooldown after channel",()=>{const w=world(4);cast(w,"QSeverum");expect(w.units[0].action).toMatchObject({kind:"channel",ability:"QSeverum"});through(w,60);expect(w.units[0].action).toBeUndefined();expect(w.units[0].cooldownReady.QSeverum).toBeGreaterThan(240);expect(w.units[0].memory["aph:onslaughtDone"]).toBe(w.units[0].memory["aph:onslaughtTotal"]);});
 it("disarm suppresses actual Onslaught attacks without imaginary hits",()=>{const w=world(4);applyEffect(w,w.units[1],w.units[0],{type:"cc",cc:"disarm",duration:3},{scale:1});cast(w,"QSeverum");through(w,65);expect(w.units[1].totals.damageTaken).toBe(0);});
 it("Duskwave deals110+.21bonusAD+.7AP and then an actual off-hand attack",()=>{const w=world(9);cast(w,"QInfernum");through(w,11);expect(w.units[1].totals.damageTaken).toBe(0);through(w,12);expect(w.units[1].totals.damageTaken).toBeCloseTo(110+.21*derive(w.units[0]).bonusAd+70);through(w,60);expect(w.units[1].totals.damageTaken).toBeCloseTo(110+.21*derive(w.units[0]).bonusAd+70+derive(w.units[0]).ad);expect(w.units[0].memory["aph:chakrams"]).toBe(1);});
});

describe("Aphelios Crescendum and sentries",()=>{
 it("Crescendum changes windup and cannot redeclare before the real return",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=3;startAttack(w,w.units[0]);const a=w.units[0].action;expect(a?.kind==="windup"&&a.launchTick).toBeLessThan(attackTiming(w.units[0]).windup);through(w,12);expect(w.units[0].memory["aph:crescWaiting"]).toBe(true);expect(canStartAttack(w,w.units[0])).toBe(false);through(w,75);expect(w.units[0].memory["aph:crescWaiting"]).toBeUndefined();expect(canStartAttack(w,w.units[0])).toBe(true);});
 it("outbound Crescendum bypasses a wall while its return loses mirrors",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=3;w.units[0].memory["aph:chakrams"]=3;w.zones.push({id:999,owner:1,kind:"projectileWall",x:150,radius:0,seenTick:0,startTick:0,endTick:300});basic(w,75);expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad*1.435);expect(w.units[0].memory["aph:chakrams"]).toBe(0);});
 it("mirror bonus table is nonlinear and critically strikes once",()=>{const w=world(9,300,{ad:100,critChance:1});w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=3;w.units[0].memory["aph:chakrams"]=20;basic(w,50);expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad*2.46*2);});
 it("mirror stacks expire after five seconds without champion refresh",()=>{const w=world(9);w.units[0].memory["aph:chakrams"]=3;w.units[0].memory["aph:chakramUntil"]=150;through(w,150);expect(w.units[0].memory["aph:chakrams"]).toBe(0);});
 it("Sentry arms after.35 seconds, then becomes a4-second targetable pet",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=3;cast(w,"QCrescendum");through(w,8);const turret=w.pets.find((p)=>p.spec.kind==="sentry")!;expect(turret.spec.untargetable).toBe(true);through(w,19);expect(turret.spec.untargetable).toBe(false);expect(turret.endTick).toBe(19+120);});
 it("Sentry uses primary ability125+.52bonusAD+.5AP over conflicting pet info",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;cast(w,"QCrescendum");through(w,23);expect(w.units[1].totals.damageTaken).toBeCloseTo(125+.52*derive(w.units[0]).bonusAd+50);expect(mark(w)).toBeDefined();});
 it("Sentry has6HP and actual ranged basics/abilities deal3/4 fixedHP",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;cast(w,"QCrescendum");through(w,20);const t=w.pets.find((p)=>p.spec.kind==="sentry")!;w.units[1].spec={...w.units[1].spec,attack:{...w.units[1].spec.attack,ranged:true}};damagePet(w,w.units[1],t,999,"physical",true);expect(t.hp).toBe(3);damagePet(w,w.units[1],t,999,"magic",false);expect(w.pets.includes(t)).toBe(false);});
 it("Sentry can target real enemy summons instead of their owner",()=>{const w=world(9,1500),p=summon(w,300);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;cast(w,"QCrescendum");through(w,45);expect(p.hp).toBeLessThan(5000);expect(p.statuses?.some((s)=>s.key==="aphelios:calibrum")).toBe(true);expect(w.units[1].totals.damageTaken).toBe(0);});
});

describe("Aphelios Moonlight Vigil and complete combat",()=>{
 it("R retains its cast weapon across Phase and grants shield-independent Calibrum lockon",()=>{const w=world();state(w,"spellShield");cast(w,"RCalibrum");through(w,20);cast(w,"W");through(w,80);expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad);expect(mark(w)?.value).toBe(110);});
 it("R Severum heals450 once and its attack healing uses20%",()=>{const w=world(4);w.units[0].hp-=1000;cast(w,"RSeverum");through(w,80);const initial=225+.2*derive(w.units[0]).bonusAd+100;expect(w.units[0].totals.healing).toBeCloseTo(450+.2*(initial+derive(w.units[0]).ad));});
 it("R locked-on attacks ignore blindness, but retain dodge and block guards",()=>{const w=world();applyEffect(w,w.units[1],w.units[0],{type:"cc",cc:"blind",duration:5},{scale:1});cast(w,"RCalibrum");through(w,80);expect(mark(w)).toBeDefined();const b=world();state(b,"dodgeAttacks");cast(b,"RCalibrum");through(b,80);expect(mark(b)).toBeUndefined();});
 it("R crit follows source130% critical modifier rather than ordinary200%",()=>{const w=world(0,300,{ad:100,critChance:1});cast(w,"RCalibrum");through(w,80);expect(w.units[1].totals.damageTaken).toBeCloseTo(225+.2*derive(w.units[0]).bonusAd+derive(w.units[0]).ad*1.3);});
 it("R Gravitum grants99% initial slow and1.35-second Binding root",()=>{const w=world(7);cast(w,"RGravitum");through(w,45);expect(w.units[1].statuses.find((s)=>s.memoKey==="aph:gravSlow")?.value).toBe(.99);expect(mark(w,"aphelios:gravitum")?.value).toBe(1.35);cast(w,"QGravitum");through(w,56);expect(w.units[1].statuses.find((s)=>s.key==="root")?.endTick).toBe(55+41);});
 it("R Crescendum grants six mirrors only after their actual return",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;cast(w,"RCrescendum");through(w,40);expect(w.units[0].memory["aph:chakrams"]).toBe(0);through(w,100);expect(w.units[0].memory["aph:chakrams"]).toBe(6);});
 it("ordinary minion pets do not stop R or add fake extra targets",()=>{const w=world(0,600);const p=summon(w,200);cast(w,"RCalibrum");through(w,90);expect(p.hp).toBe(5000);expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);expect(p.statuses?.some((s)=>s.key==="aphelios:calibrum")).toBe(false);});
 it("actual champion-class clones receive independent R contacts",()=>{const w=world(0,600);const p=summon(w,500,"champion");cast(w,"RCalibrum");through(w,90);expect(p.hp).toBeLessThan(5000);expect(p.statuses?.some((s)=>s.key==="aphelios:calibrum")).toBe(true);expect(mark(w)).toBeDefined();});
 it("a wall blocks the spotlight even with Severum equipped",()=>{const w=world(4,600);w.zones.push({id:999,owner:1,kind:"projectileWall",x:200,radius:0,seenTick:0,startTick:0,endTick:300});cast(w,"RSeverum");through(w,100);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[0].totals.healing).toBe(0);});
 it("already launched R and locked attacks retain postdeath lifetimes",()=>{const w=world(0,600);cast(w,"RCalibrum");through(w,20);dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,100);expect(w.units[1].totals.damageTaken).toBeGreaterThan(225+100);expect(mark(w)).toBeDefined();});
 it("budget is finite, nonnegative and reads no data after sealing",()=>{const w=world(),d=w.units[0].spec.budget!.damage!(w.units[0],w.units[1]);expect(Number.isFinite(d.physical)).toBe(true);expect(d.physical).toBeGreaterThan(0);expect(d.magic).toBeGreaterThan(0);expect(w.units[0].spec.budget!.healing!(w.units[0],w.units[1])).toBeGreaterThan(0);});
 it("normal fight policy uses real casts and finite ammo",()=>{const w=world();w.modes[0]="fight";for(let i=0;i<300&&!w.result;i++)step(w,[w.units[0].spec.behavior!,standStill]);expect(w.units[1].totals.damageTaken).toBeGreaterThan(500);expect(w.log.some((l)=>l.text.includes("casts Moonshot"))).toBe(true);expect(Number(w.units[0].memory["aph:ammo:0"])).toBeLessThan(50);});
 it("reflected default fights are symmetric at1e-10",()=>{const spec=compiled().spec;const a=fairFight({fighters:[spec,fighter()],distance:400,modes:["fight","fight"],settings:{maxSeconds:4,maxBranches:8}});const b=fairFight({fighters:[fighter(),spec],distance:400,modes:["fight","fight"],settings:{maxSeconds:4,maxBranches:8}});expect(a.win[0]).toBeCloseTo(b.win[1],10);expect(a.win[1]).toBeCloseTo(b.win[0],10);expect(a.hp[0]).toBeCloseTo(b.hp[1],10);expect(a.hp[1]).toBeCloseTo(b.hp[0],10);expect(a.damage[0]).toBeCloseTo(b.damage[1],10);expect(a.damage[1]).toBeCloseTo(b.damage[0],10);expect(a.seconds).toBeCloseTo(b.seconds,10);});
});


describe("Aphelios independent delivery regressions",()=>{
 it("Duskwave cannot pass a projectile wall or invent a follow-up",()=>{const w=world(9,600);w.zones.push({id:999,owner:1,kind:"projectileWall",x:200,radius:0,seenTick:0,startTick:0,endTick:300});cast(w,"QInfernum");through(w,80);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[0].memory["aph:chakrams"]).toBe(0);});
 it("Crescendum R dodge grants no mirror stacks",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;state(w,"dodgeAttacks");cast(w,"RCrescendum");through(w,100);expect(w.units[0].memory["aph:chakrams"]).toBe(0);});
 it("Crescendum R grants six for the first actual target and one per additional clone",()=>{const w=world(9,600);w.units[0].memory["aph:main"]=4;summon(w,500,"champion");cast(w,"RCrescendum");through(w,120);expect(w.units[0].memory["aph:chakrams"]).toBe(7);});
 it("a Calibrum mark with Crescendum off-hand creates one returned mirror",()=>{const w=world(3);hit(w,"QCalibrum");basic(w,80);expect(w.units[0].memory["aph:chakrams"]).toBe(1);expect(w.units[0].memory["aph:ammo:0"]).toBe(50);expect(w.units[0].memory["aph:ammo:4"]).toBe(50);});
 it("R Infernum has150+.25bonusAD additional blast and no self-overlap",()=>{const w=world(9);cast(w,"RInfernum");through(w,90);const d=derive(w.units[0]);expect(w.units[1].totals.damageTaken).toBeCloseTo(225+150+.45*d.bonusAd+100+d.ad*1.1);});
 it("actual overlapping R Infernum explosions affect distinct champion and clone once each",()=>{const w=world(9,600),p=summon(w,500,"champion");cast(w,"RInfernum");through(w,90);const d=derive(w.units[0]);const each=225+150+.45*d.bonusAd+100+d.ad*(1.1+.99);expect(w.units[1].totals.damageTaken).toBeCloseTo(each);expect(5000-p.hp).toBeCloseTo(each);});
 it("manual budget terms are excluded from the generic estimate to prevent double counting",()=>{expect(base.spec.abilities.filter((a)=>a.slot==="Q"||a.slot==="R").every((a)=>a.budgetExcluded)).toBe(true);});
 it("Onslaught ordinary on-hit damage is reduced to25% without spending extra ammo",()=>{const w=world(4);w.units[0].spec={...w.units[0].spec,attack:{...w.units[0].spec.attack,onHit:[{type:"damage",damageType:"magic",amount:{base:100}}]}};cast(w,"QSeverum");through(w,70);const n=Number(w.units[0].memory["aph:onslaughtTotal"]),d=derive(w.units[0]);expect(w.units[1].totals.damageTaken).toBeCloseTo(n*(.41*d.ad+25));expect(w.units[0].memory["aph:ammo:1"]).toBe(40);});
 it("Onslaught blocked Crescendum still returns mirrors but no ordinary damage",()=>{const w=world(6);w.zones.push({id:999,owner:1,kind:"projectileWall",x:150,radius:0,seenTick:0,startTick:0,endTick:300});cast(w,"QSeverum");through(w,100);expect(Number(w.units[0].memory["aph:chakrams"])).toBeGreaterThan(0);const n=Number(w.units[0].memory["aph:onslaughtTotal"]);expect(w.units[1].totals.damageTaken).toBeCloseTo(Math.floor(n/2)*derive(w.units[0]).ad*.41);});
});


describe("Aphelios real Sentry missile lifetime",()=>{
 it("a launched Sentry shot survives its owner and removed pet",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;cast(w,"QCrescendum");through(w,8);w.units[1].x=600;through(w,19);expect(w.petMissiles?.length).toBe(1);const before=w.tick;dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,before+15);expect(w.units[1].totals.damageTaken).toBeGreaterThan(0);expect(w.pets.some((p)=>p.spec.kind==="sentry")).toBe(false);expect(w.result?.tick).toBeGreaterThan(before);});
 it("a Sentry shot is independently denied by a new projectile wall",()=>{const w=world(9);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;cast(w,"QCrescendum");through(w,8);w.units[1].x=600;through(w,19);w.zones.push({id:999,owner:1,kind:"projectileWall",x:450,radius:0,seenTick:w.tick,startTick:w.tick,endTick:300});dealDamage(w,w.units[1],w.units[0],100000,"true");through(w,60);expect(w.units[1].totals.damageTaken).toBe(0);});
});


it("Severum cannot turn healing rejected at a protected health floor into a shield",()=>{const w=world(4,300,{ad:100000});w.units[0].hp=derive(w.units[0]).maxHp*.1;w.zones.push({id:999,owner:1,kind:"field",x:0,radius:1,seenTick:0,startTick:0,endTick:300,centered:true,healthProtection:{minimumHealthFraction:.1,preventHealingAtFloor:true}});attackHit(w,w.units[0],w.units[1],false,[],undefined,false,{attackTag:"aph:1:basic"});expect(w.units[0].totals.healing).toBe(0);expect(w.units[0].statuses.some((s)=>s.memoKey==="aph:severumShield")).toBe(false);});


describe("Aphelios review regressions",()=>{
 it("R carries a quarter hit share through its delayed lock-on",()=>{const w=world();cast(w,"RCalibrum");while(!w.missiles.some((m)=>m.source==="RCalibrum"))step(w,[standStill,standStill]);w.missiles.find((m)=>m.source==="RCalibrum")!.scale=.25;through(w,100);const d=derive(w.units[0]);expect(w.units[1].totals.damageTaken).toBeCloseTo((225+.2*d.bonusAd+100+d.ad)*.25,9);});
 it("Duskwave carries an accepted quarter hit share to its off-hand attack",()=>{const w=world(9);const a=ability(w,"QInfernum");abilityHit(w,w.units[0],w.units[1],a,a.onHit!,.25);through(w,60);const d=derive(w.units[0]);expect(w.units[1].totals.damageTaken).toBeCloseTo((110+.21*d.bonusAd+70+d.ad)*.25,9);});
 it("a later parried Severum attack cannot heal from stale packet state",()=>{const w=world(4);w.units[0].hp-=1000;attackHit(w,w.units[0],w.units[1],false,[],undefined,false,{attackTag:"aph:1:basic"});const before=w.units[0].totals.healing;state(w,"parry");attackHit(w,w.units[0],w.units[1],false,[],undefined,false,{attackTag:"aph:1:basic"});expect(w.units[0].totals.healing).toBe(before);});
 it("Calibrum Sentry cannot mark an invulnerable champion it did not damage",()=>{const w=world(3);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;state(w,"invulnerable");cast(w,"QCrescendum");through(w,40);expect(w.units[1].totals.damageTaken).toBe(0);expect(mark(w)).toBeUndefined();});
 it("R Severum's flat heal and attacks retain the same quarter hit share",()=>{const w=world(4);w.units[0].hp-=1000;cast(w,"RSeverum");while(!w.missiles.some((m)=>m.source==="RSeverum"))step(w,[standStill,standStill]);w.missiles.find((m)=>m.source==="RSeverum")!.scale=.25;through(w,100);const d=derive(w.units[0]);expect(w.units[0].totals.healing).toBeCloseTo((450+.2*(225+.2*d.bonusAd+100+d.ad))*.25,9);});
});


describe("Aphelios initiating contact shares and real clones",()=>{
 it("an uncertain champion R illumination carries its quarter share into a secondary actual clone",()=>{const w=world(0,600),p=summon(w,650,"champion");cast(w,"RCalibrum");while(!w.missiles.some((m)=>m.source==="RCalibrum"))step(w,[standStill,standStill]);w.missiles.find((m)=>m.source==="RCalibrum")!.scale=.25;through(w,100);const d=derive(w.units[0]),each=(225+.2*d.bonusAd+100+d.ad)*.25;expect(w.units[1].totals.damageTaken).toBeCloseTo(each,9);expect(5000-p.hp).toBeCloseTo(each,9);});
 it("a deterministic first clone collision normalizes the entire R illumination to full share",()=>{const w=world(0,600),p=summon(w,500,"champion");cast(w,"RCalibrum");while(!w.missiles.some((m)=>m.source==="RCalibrum"))step(w,[standStill,standStill]);w.missiles.find((m)=>m.source==="RCalibrum")!.scale=.25;through(w,100);const d=derive(w.units[0]),each=225+.2*d.bonusAd+100+d.ad;expect(w.units[1].totals.damageTaken).toBeCloseTo(each,9);expect(5000-p.hp).toBeCloseTo(each,9);});
 it("Calibrum Sentry can mark an enemy whose shield actually absorbed its damage",()=>{const w=world(3);w.units[0].memory["aph:main"]=4;w.units[0].memory["aph:off"]=0;applyEffect(w,w.units[1],w.units[1],{type:"shield",amount:{base:5000},duration:5},{scale:1});cast(w,"QCrescendum");through(w,30);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[1].totals.absorbed).toBeGreaterThan(0);expect(mark(w)).toBeDefined();});
});


describe("Severum healing belongs to actual pet contacts",()=>{
 it.each(["minion","champion"] as const)("ordinary Severum heals8%% from its actual %s target",(targetClass)=>{const w=world(4,1400),p=summon(w,200,targetClass);w.units[0].hp-=1000;startAttack(w,w.units[0],p);through(w,45);expect(5000-p.hp).toBeCloseTo(derive(w.units[0]).ad,10);expect(w.units[0].totals.healing).toBeCloseTo((5000-p.hp)*.08,10);expect(w.units[1].totals.damageTaken).toBe(0);});
 it.each(["blockAttacks","dodgeAttacks","parry","invulnerable"] as const)("%s on the real pet denies Severum damage and healing",(guard)=>{const w=world(4,1400),p=summon(w,200,"champion");w.units[0].hp-=1000;p.statuses=[{kind:"state",key:guard,source:1,startTick:0,endTick:300,value:0}];startAttack(w,w.units[0],p);through(w,45);expect(p.hp).toBe(5000);expect(w.units[0].totals.healing).toBe(0);});
 it("R Severum heals20% from clone initial blast and locked attack plus one flat450 heal",()=>{const w=world(4,1400),p=summon(w,300,"champion");w.units[0].hp-=1500;cast(w,"RSeverum");through(w,90);expect(w.units[1].totals.damageTaken).toBe(0);expect(w.units[0].totals.healing).toBeCloseTo(450+(5000-p.hp)*.2,10);});
 it.each(["blockAttacks","parry","invulnerable","spellShield"] as const)("R Severum retains only actual clone damage healing under %s",(guard)=>{const w=world(4,1400),p=summon(w,300,"champion");w.units[0].hp-=1500;p.statuses=[{kind:"state",key:guard,source:1,startTick:0,endTick:300,value:0}];cast(w,"RSeverum");through(w,90);expect(w.units[0].totals.healing).toBeCloseTo(450+(5000-p.hp)*.2,10);});
 it("Severum Onslaught replicas heal20% from actual health-pet contacts",()=>{const w=world(4,1400);summon(w,300);w.units[0].hp-=1000;cast(w,"QSeverum");through(w,90);const n=Number(w.units[0].memory["aph:onslaughtTotal"]);expect(w.units[0].totals.healing).toBeCloseTo(Math.floor(n/2)*derive(w.units[0]).ad*.41*.2,10);});
 it("a Duskwave Severum off-hand attack heals20% from its actual pet",()=>{const w=world(5,1400);w.units[0].memory["aph:main"]=3;w.units[0].memory["aph:off"]=1;summon(w,300);w.units[0].hp-=1000;cast(w,"QInfernum");through(w,90);expect(w.units[0].totals.healing).toBeCloseTo(derive(w.units[0]).ad*.2,10);});
});


it("Severum retains post-mitigation overkill healing when its actual health pet dies",()=>{const w=world(4,1400),p=summon(w,200,"champion");p.hp=1;w.units[0].hp-=1000;startAttack(w,w.units[0],p);through(w,45);expect(w.pets.includes(p)).toBe(false);expect(p.hp).toBeLessThan(0);expect(w.units[0].totals.healing).toBeCloseTo(derive(w.units[0]).ad*.08,10);});


describe("Duskwave follow-ups require a surviving real target", () => {
 it("a lethal initial pet hit removes its target without creating a follow-up or free Chakram", () => {
  const w = world(9, 1400), p = summon(w, 300);
  p.hp = 1;
  cast(w, "QInfernum");
  through(w, 90);
  expect(w.pets.includes(p)).toBe(false);
  expect(p.hp).toBeLessThanOrEqual(0);
  expect(w.units[1].totals.damageTaken).toBe(0);
  expect(w.units[0].memory["aph:chakrams"]).toBe(0);
  expect(Object.keys(w.units[0].memory).some((key) => key.startsWith("aph:pending:"))).toBe(false);
  expect(w.missiles.some((m) => m.source === "Aphpending")).toBe(false);
 });
 it("a surviving pet still receives the delayed off-hand attack and returns one actual Chakram", () => {
  const w = world(9, 1400), p = summon(w, 300);
  cast(w, "QInfernum");
  through(w, 90);
  const d = derive(w.units[0]);
  expect(w.pets.includes(p)).toBe(true);
  expect(5000 - p.hp).toBeCloseTo(110 + .21 * d.bonusAd + 70 + d.ad, 9);
  expect(w.units[1].totals.damageTaken).toBe(0);
  expect(w.units[0].memory["aph:chakrams"]).toBe(1);
 });
 it("completes the production Infernum/Crescendum matchup against Heimerdinger's upgraded rockets", () => {
  const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
  const result = simulateMatchup(compiled(9).spec, kit("Heimerdinger", { upgrade: 2 }).spec, 15000, prices);
  expect(Number.isFinite(result.score)).toBe(true);
  expect(result.scenarios).toHaveLength(6);
  expect(result.scenarios.every((scenario) => scenario.score === undefined || Number.isFinite(scenario.score))).toBe(true);
 });
});
