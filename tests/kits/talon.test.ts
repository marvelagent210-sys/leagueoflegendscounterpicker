import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { damagePerSecond, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { attackTiming, canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, canSee, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Talon from "../../kits/champions/Talon";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const idle: Behavior = () => undefined;
const compile = (data = records("Talon")) => compileKit(championData("Talon"), data, Talon);
const compiled = compile(), dummy = () => fighter({ base: { hp: 5000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const spell = (world: World, key: string, side: 0 | 1 = 0): AbilitySpec => world.units[side].spec.abilities.find(a => a.key === key)!;
function arena(distance = 150, bonus: FighterSpec["bonus"] = { ad: 100 }, opponent = dummy()): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } }, opponent], distance, modes: ["idle", "idle"], settings: { maxSeconds: 60, maxBranches: 1, log: true } });
  world.units[0].x = 0; world.units[1].x = distance; return world;
}
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [idle, idle]); };
const cast = (world: World, key: string, direction: 1 | -1 = 1, side: 0 | 1 = 0) => startCast(world, world.units[side], spell(world, key, side), { direction });
const hit = (world: World, key: string) => abilityHit(world, world.units[0], world.units[1], spell(world, key), spell(world, key).onHit ?? []);
const state = (world: World, side: 0 | 1, key: StateType, seconds = 10) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration: seconds }, { scale: 1 });
const wounds = (world: World) => world.units[1].statuses.find(s => s.key === "talon:wound");
function prime(world: World) { for (const key of ["Q", "Wout", "Wreturn"]) hit(world, key); }
function wall(world: World, from = 50, to = 150, id = 999) { world.terrain.push({ id, owner: 1, from, to, endTick: 10000 }); }

describe("Talon ordinary production scenarios", () => {
  it("spends full 15000 gold in all six default scenarios with exact reflected scores/builds", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices, opponent = kit("Darius").spec;
    const forward = simulateMatchup(compiled.spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled.spec, 15000, prices);
    expect(forward.scenarios).toHaveLength(6); expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    expect(Number.isFinite(forward.score)).toBe(true); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
      for (const outcome of scenario.outcomes) { expect(Number.isFinite(outcome.seconds)).toBe(true); expect(outcome.hp.every(Number.isFinite)).toBe(true); }
    }
    const casts = forward.scenarios.flatMap(s => s.outcomes.flatMap(o => o.timeline.filter(row => row.side === 0 && row.text.startsWith("casts ")).map(row => row.text)));
    for (const name of ["Noxian Diplomacy", "Rake", "Shadow Assault"]) expect(casts.some(text => text.includes(name))).toBe(true);
    expect(casts.some(text => text.includes("Assassin's Path"))).toBe(false);
  }, 60000);
  it.each(["fight", "hold", "trade"] as const)("%s mode reserves the actually ready offensive R appropriately", mode => {
    const world = arena(350); world.modes[0] = mode;
    for (const ability of compiled.spec.abilities) if (ability.slot !== "R") world.units[0].cooldownReady[ability.cooldownKey ?? ability.key] = Infinity;
    expect(canCast(world, world.units[0], spell(world, "R"))).toBe(true);
    const command = compiled.spec.behavior!(perceive(world, 0));
    expect(command?.kind === "cast" && command.ability === "R").toBe(mode === "fight");
  });
  it("completed trade retreats with all spells ready", () => {
    const world = arena(300); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(compiled.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
});

describe("Talon pinned evidence", () => {
  it("reads all five exact primary revisions plus versioned object-attributed binary quotes", () => {
    expect(new Set(compiled.evidence.filter(e => e.revid > 0).map(e => e.revid))).toEqual(new Set([3907201, 4046483, 4015970, 4008078, 4008077]));
    for (const source of compiled.evidence.filter(e => e.revid === 0)) {
      expect(source.sourceVersion).toBe("16.20.8248524+branch.releases-16-20.content.release");
      expect(source.sourceSha256).toBe("1a2f15a6486fd0ad457d50682257342e165c77e20633f4d798bc361ce6dfac03");
      expect(source.url).toBe("https://raw.communitydragon.org/16.20/game/data/characters/talon/talon.bin.json"); expect(source.page).toContain("Characters/Talon/Spells/");
    }
    for (const row of records("Talon")) { expect(row.sources?.[0]?.page).toEqual(row.page); expect(row.sources?.[0]?.text[0]).toContain("|champion     = Talon"); }
  });
  it("fails closed if the exact raw bleed interval or binary attribution is removed", () => {
    const noRaw = records("Talon"); noRaw.find(a => a.kind === "I")!.sources = []; expect(() => compile(noRaw)).toThrow(/0.125/);
    const noGame = records("Talon"); noGame.find(a => a.kind === "E")!.gameSources![0]!.sha256 = ""; expect(() => compile(noGame)).toThrow(/attribution/);
  });
  it("keeps finite spell metadata, one Q cooldown and inaccessible damage packets", () => {
    const world = arena();
    for (const a of compiled.spec.abilities) { expect(Number.isFinite(a.cooldown)).toBe(true); expect(Number.isFinite(a.castTime)).toBe(true); if (a.slot === "other") expect(canCast(world, world.units[0], a)).toBe(false); }
    expect(spell(world, "Qdash").cooldownKey).toBe("Q"); expect(spell(world, "R").castTime).toBe(0); expect(world.units[0].statuses).toHaveLength(0);
  });
});

describe("Talon actual Wounds and bleeding contacts", () => {
  it("three spell contacts arm a sixteen-pulse level-20 bleed only on the next basic", () => {
    const world = arena(); prime(world); const before = world.units[1].totals.damageTaken;
    expect(wounds(world)?.value).toBe(3); expect(world.scheduled).toHaveLength(0);
    attackHit(world, world.units[0], world.units[1], false, []);
    expect(wounds(world)).toBeUndefined(); expect(world.scheduled).toHaveLength(16);
    expect(world.scheduled.map(s => s.tick)).toEqual([4, 8, 12, 15, 19, 23, 27, 30, 34, 38, 42, 45, 49, 53, 57, 60]);
    const attack = derive(world.units[0]).ad; through(world, 60);
    expect(world.units[1].totals.damageTaken - before - attack).toBeCloseTo(303.529411764706 + 210, 10);
  });
  it("wounds expire at six seconds and connected basics refresh their actual target", () => {
    const world = arena(); hit(world, "Wout"); through(world, 90); attackHit(world, world.units[0], world.units[1], false, []); expect(wounds(world)?.endTick).toBe(world.tick + 180); through(world, 270); expect(wounds(world)).toBeDefined(); through(world, 271); expect(wounds(world)).toBeUndefined();
  });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("%s denies new ability Wounds", guard => {
    const world = arena(); state(world, 1, guard); hit(world, "Wout"); expect(wounds(world)).toBeUndefined(); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["dodgeAttacks", "parry"] as const)("%s preserves three Wounds without bleeding", guard => {
    const world = arena(); prime(world); state(world, 1, guard); attackHit(world, world.units[0], world.units[1], false, []); expect(wounds(world)?.value).toBe(3); expect(world.scheduled).toHaveLength(0);
  });
  it("blind preserves three Wounds and does not refresh expiry", () => { const world = arena(); prime(world); const expiry = wounds(world)!.endTick; world.tick = 30; attackHit(world, world.units[0], world.units[1], true, []); expect(wounds(world)?.endTick).toBe(expiry); expect(world.scheduled).toHaveLength(0); });
  it("a damage block still consumes Wounds and triggers bleed", () => { const world = arena(); prime(world); state(world, 1, "blockAttacks"); attackHit(world, world.units[0], world.units[1], false, []); expect(wounds(world)).toBeUndefined(); expect(world.scheduled).toHaveLength(16); });
  it("a passive spell shield consumes all Wounds but denies bleed while preserving ordinary basic damage", () => {
    const world = arena(); prime(world); const before = world.units[1].hp; state(world, 1, "spellShield"); attackHit(world, world.units[0], world.units[1], false, []);
    expect(wounds(world)).toBeUndefined(); expect(world.scheduled).toHaveLength(0); expect(hasState(world.units[1], "spellShield")).toBe(false); expect(world.units[1].hp).toBe(before - derive(world.units[0]).ad);
  });
  it("bleeding prevents new Wounds until the exact two-second lockout ends", () => {
    const world = arena(); prime(world); attackHit(world, world.units[0], world.units[1], false, []); hit(world, "Q"); expect(wounds(world)).toBeUndefined(); through(world, 59); hit(world, "Q"); expect(wounds(world)?.value).toBe(1);
  });
  it("only the actual champion-class pet receives Wounds and scheduled bleed", () => {
    const world = arena(500), pet = spawnPet(world, world.units[1], { kind: "clone", name: "Champion clone", targetClass: "champion", unitClass: "clone", hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, 100);
    for (const key of ["Q", "Wout", "Wreturn"]) abilityHitPet(world, world.units[0], pet, spell(world, key), spell(world, key).onHit!);
    expect(pet.statuses?.find(s => s.key === "talon:wound")?.value).toBe(3); expect(world.units[1].totals.damageTaken).toBe(0); startAttack(world, world.units[0], pet); through(world, 12);
    expect(world.scheduled.some(s => s.targetPet === pet.id)).toBe(true); expect(world.units[1].statuses).toHaveLength(0);
  });
  it("minion summons take spell damage without champion Wounds", () => {
    const world = arena(), pet = spawnPet(world, world.units[1], { kind: "minion", name: "Minion", targetClass: "minion", hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, 100);
    abilityHitPet(world, world.units[0], pet, spell(world, "Wout"), spell(world, "Wout").onHit!); expect(pet.hp).toBe(4870); expect(pet.statuses).toHaveLength(0);
  });
  it.each([undefined, "monster"] as const)("never infers champion or large-monster Wounds from pet class %s", targetClass => {
    const world = arena(), pet = spawnPet(world, world.units[1], { kind: "summon", name: "Summon", ...(targetClass ? { targetClass } : {}), hp: 5000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, 100);
    abilityHitPet(world, world.units[0], pet, spell(world, "Wout"), spell(world, "Wout").onHit!);
    expect(pet.hp).toBe(4870); expect(pet.statuses).toHaveLength(0); expect(wounds(world)).toBeUndefined();
  });
  it("bleed snapshots AD, completes after owner death and clones its own pending pulses", () => {
    const world = arena(); prime(world); attackHit(world, world.units[0], world.units[1], false, []); const before = world.units[1].totals.damageTaken, branch = cloneWorld(world);
    world.units[0].spec = { ...world.units[0].spec, bonus: { ad: 1000 } }; world.units[0].alive = false; world.units[0].hp = 0; through(world, 61);
    expect(world.units[1].totals.damageTaken - before).toBeCloseTo(513.529411764706, 10); expect(world.result?.winner).toBe(1); expect(branch.scheduled).toHaveLength(16);
  });
});

describe("Talon close critical strike and ranged tracking Q", () => {
  it("close Q uses real attack-speed windup, a separate spell packet, a basic reset and temporary attack range", () => {
    const world = arena(250); world.units[0].attackReadyTick = 100; const duration = attackTiming(world.units[0]).windup, before = world.units[0].resource;
    cast(world, "Q"); expect(world.units[0].action?.kind).toBe("dash"); expect(world.units[1].totals.damageTaken).toBe(0); through(world, duration);
    expect(world.units[0].x).toBeCloseTo(100); expect(world.units[1].totals.damageTaken).toBe(367.5); expect(world.units[0].attackReadyTick).toBe(duration); expect(world.units[0].resource).toBe(before - 40); expect(compiled.spec.attack.bonusRangeFor!(world.units[0], world.units[1])).toBe(75);
    startAttack(world, world.units[0]); through(world, world.tick + duration); expect(compiled.spec.attack.bonusRangeFor!(world.units[0], world.units[1])).toBe(0);
  });
  it("close Q still damages after a real knockdown interrupts its dash", () => {
    const world = arena(250), duration = attackTiming(world.units[0]).windup; cast(world, "Q"); through(world, 1); const x = world.units[0].x; applyCC(world, world.units[1], world.units[0], "airborne", .1); through(world, duration);
    expect(world.units[0].x).toBe(x); expect(world.units[1].totals.damageTaken).toBe(367.5);
  });
  it.each(["untargetable", "invisible"] as const)("close Q cancels free if target becomes %s during its cast", guard => {
    const world = arena(250), resource = world.units[0].resource; cast(world, "Q"); state(world, 1, guard); through(world, 15); expect(world.units[0].resource).toBe(resource); expect(world.units[0].cooldownReady.Q ?? 0).toBe(0); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("root permits close Q but denies the ranged branch", () => { const world = arena(150); applyCC(world, world.units[1], world.units[0], "root", 10); expect(canCast(world, world.units[0], spell(world, "Q"))).toBe(true); world.units[1].x = 500; expect(canCast(world, world.units[0], spell(world, "Qdash"))).toBe(false); });
  it("ranged Q tracks a relocated target and damages only on arrival", () => {
    const world = arena(500); cast(world, "Qdash"); through(world, 1); expect(world.units[1].totals.damageTaken).toBe(0); world.units[1].x = 650; through(world, 20); expect(world.units[0].x).toBeCloseTo(550); expect(world.units[1].totals.damageTaken).toBe(245); expect(wounds(world)?.value).toBe(1);
  });
  it("ranged Q retains the previous endpoint and sourced remote damage beyond 800 tracking distance", () => { const world = arena(500); cast(world, "Qdash"); through(world, 1); world.units[1].x = 2000; through(world, 20); expect(world.units[0].x).toBeCloseTo(400); expect(world.units[1].totals.damageTaken).toBe(245); });
  it("ranged Q knockdown prevents its arrival damage", () => { const world = arena(500); cast(world, "Qdash"); through(world, 1); applyCC(world, world.units[1], world.units[0], "airborne", .2); through(world, 30); expect(world.units[1].totals.damageTaken).toBe(0); });
  it("Q kill heals by the authored level-20 series and refunds half remaining cooldown", () => {
    const world = arena(); world.units[0].hp -= 100; const hp = world.units[0].hp; world.units[1].hp = 10; cast(world, "Q"); const duration = attackTiming(world.units[0]).windup; through(world, duration);
    expect(world.units[0].hp - hp).toBeCloseTo(60.4117647058824); expect(world.units[0].cooldownReady.Q).toBe(duration + 90);
  });
  it("Q killing the actual pet grants healing and refund without attributing its owner as the victim", () => {
    const world = arena(500); world.units[0].hp -= 100; const hp = world.units[0].hp;
    const pet = spawnPet(world, world.units[1], { kind: "minion", name: "Minion", targetClass: "minion", hp: 10, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, 100);
    world.units[0].cooldownReady.Q = 180;
    abilityHitPet(world, world.units[0], pet, spell(world, "Q"), spell(world, "Q").onHit!);
    expect(world.units[0].hp - hp).toBeCloseTo(60.4117647058824); expect(world.units[0].cooldownReady.Q).toBe(90);
    expect(world.pets).not.toContain(pet); expect(world.units[1].hp).toBe(5000); expect(world.units[1].deathNotified).toBeUndefined();
  });
  it("a shielded Q and a killing W grant no Q healing or cooldown refund", () => {
    const shielded = arena(); shielded.units[0].hp -= 100; const hp = shielded.units[0].hp; shielded.units[1].hp = 10;
    state(shielded, 1, "spellShield"); cast(shielded, "Q"); const duration = attackTiming(shielded.units[0]).windup; through(shielded, duration);
    expect(shielded.units[0].hp).toBe(hp); expect(shielded.units[0].cooldownReady.Q).toBe(duration + 180); expect(shielded.units[1].hp).toBe(10);
    const other = arena(400); other.units[0].hp -= 100; const otherHp = other.units[0].hp; other.units[0].cooldownReady.Q = 180; other.units[1].hp = 10;
    cast(other, "W"); through(other, 20);
    expect(other.units[0].hp).toBe(otherHp); expect(other.units[0].cooldownReady.Q).toBe(180); expect(other.units[1].hp).toBeLessThanOrEqual(0);
  });
});

describe("Talon separate Rake passes", () => {
  it("outward and return apply independent damage, Wounds and only the return slow", () => {
    const world = arena(400); cast(world, "W"); through(world, 15); expect(world.units[1].totals.damageTaken).toBe(130); expect(wounds(world)?.value).toBe(1); expect(world.units[1].statuses.some(s => s.key === "slow")).toBe(false);
    through(world, 50); expect(world.units[1].totals.damageTaken).toBe(400); expect(wounds(world)?.value).toBe(2); expect(world.units[1].statuses.some(s => s.key === "slow")).toBe(true);
  });
  it("missing outward still permits a real return contact", () => {
    const world = arena(-400); cast(world, "W", -1); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(0); world.units[1].x = 400; through(world, 50); expect(world.units[1].totals.damageTaken).toBe(270); expect(wounds(world)?.value).toBe(1);
  });
  it("relocation away from the return trajectory prevents its second hit", () => { const world = arena(400); cast(world, "W"); through(world, 20); world.units[1].x = -1000; through(world, 60); expect(world.units[1].totals.damageTaken).toBe(130); });
  it("a single spell shield blocks outward but return remains independent", () => { const world = arena(400); state(world, 1, "spellShield"); cast(world, "W"); through(world, 50); expect(world.units[1].totals.damageTaken).toBe(270); expect(wounds(world)?.value).toBe(1); });
  it("projectile wall erases the actual blade and its remaining return", () => {
    const world = arena(400); world.zones.push({ id: 1000, owner: 1, kind: "projectileWall", seenTick: 0, x: 200, radius: 0, startTick: 0, endTick: 100 }); cast(world, "W"); through(world, 55); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.missiles).toHaveLength(0);
  });
  it("W starts from cast-end position and returns to the moving owner after death", () => {
    const world = arena(400); cast(world, "W"); world.units[0].x = 50; through(world, 8); expect(world.missiles[0]!.x).toBe(50); through(world, 20); world.units[0].x = 200; world.units[0].hp = 0; world.units[0].alive = false; through(world, 60); expect(world.units[1].totals.damageTaken).toBe(400); expect(world.result?.winner).toBe(1);
  });
  it("a return fails when Talon is farther than its actual 20000 range", () => { const world = arena(400); cast(world, "W"); through(world, 20); world.units[0].x = -21000; through(world, 60); expect(world.units[1].totals.damageTaken).toBe(130); expect(world.missiles).toHaveLength(0); });
});

describe("Talon actual terrain E", () => {
  it("has no open-ground cast and vaults a real wall at movement speed", () => {
    const world = arena(800); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(false); wall(world); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(true); cast(world, "E"); through(world, 25); expect(world.units[0].x).toBeCloseTo(150 + compiled.spec.base.pathingRadius); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("tracks separate terrain segments and haste-scaled wall cooldowns", () => {
    const world = arena(1000, { abilityHaste: 100 }); wall(world); wall(world, 300, 400, 1000); cast(world, "E"); expect(world.units[0].memory["talon:wall:999"]).toBe(900); expect(world.units[0].cooldownReady.E).toBe(30); through(world, 35); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(true); cast(world, "E"); expect(world.units[0].memory["talon:wall:1000"]).toBe(world.tick + 900); through(world, 80); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(false);
  });
  it("rejects terrain whose far endpoint exceeds the sourced 800", () => { const world = arena(1500); wall(world, 50, 850); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(false); });
  it("stasis pauses the real vault and resumes its original destination", () => {
    const world = arena(800); wall(world); cast(world, "E"); through(world, 2); const x = world.units[0].x; state(world, 0, "stasis", .2); through(world, 7); expect(world.units[0].x).toBe(x); through(world, 35); expect(world.units[0].x).toBeCloseTo(150 + compiled.spec.base.pathingRadius);
  });
  it("root and knockdown prevent or interrupt the actual terrain dash", () => {
    const world = arena(800); wall(world); applyCC(world, world.units[1], world.units[0], "root", .1); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(false); through(world, 4); cast(world, "E"); through(world, 6); applyCC(world, world.units[1], world.units[0], "airborne", .1); const x = world.units[0].x; through(world, 30); expect(world.units[0].x).toBe(x);
  });
});

describe("Talon Shadow Assault projectile and stealth lifecycle", () => {
  it("actual outward blades hit once per target and expire into a separate return pass", () => {
    const world = arena(300); cast(world, "R"); expect(canSee(world.units[0], world.units[1])).toBe(false); through(world, 8); expect(world.units[1].totals.damageTaken).toBe(280); expect(wounds(world)?.value).toBe(1); through(world, 85); expect(world.units[1].totals.damageTaken).toBe(560); expect(wounds(world)?.value).toBe(2); expect(hasState(world.units[0], "invisible")).toBe(false); expect(world.units[0].cooldownReady.R).toBe(1875);
  });
  it("opposing representatives cannot multiply a co-located hit or consume two shields in one pass", () => {
    const world = arena(0); state(world, 1, "spellShield"); cast(world, "R"); through(world, 10); expect(world.units[1].totals.damageTaken).toBe(0); expect(wounds(world)).toBeUndefined(); through(world, 85); expect(world.units[1].totals.damageTaken).toBe(280);
  });
  it("manual recast has its sourced one-second gate and converges to the moving owner", () => {
    const world = arena(300); cast(world, "R"); through(world, 28); expect(canCast(world, world.units[0], spell(world, "R2"))).toBe(false); through(world, 29); expect(canCast(world, world.units[0], spell(world, "R2"))).toBe(true); world.units[0].x = 100; cast(world, "R2"); through(world, 50); expect(world.units[1].totals.damageTaken).toBe(560); expect(world.missiles).toHaveLength(0);
  });
  it("basic windup breaks stealth at launch and converges onto the actual target only after 0.8 seconds", () => {
    const world = arena(150); cast(world, "R"); startAttack(world, world.units[0]); expect(hasState(world.units[0], "invisible")).toBe(true); const launch = attackTiming(world.units[0]).windup; through(world, launch); expect(hasState(world.units[0], "invisible")).toBe(false); expect(world.units[0].memory["talon:rTarget"]).toBe(-1); expect(world.units[0].memory["talon:rConverge"]).toBe(24); expect(world.units[0].cooldownReady.R).toBe(Infinity); through(world, 40); expect(world.units[1].totals.damageTaken).toBeCloseTo(560 + derive(world.units[0]).ad); expect(world.units[0].cooldownReady.R).toBe(1824);
  });
  it("R overlays both Q melee's held cast and the ranged dash without losing either clock", () => {
    const world = arena(250); cast(world, "Q"); const duration = attackTiming(world.units[0]).windup; expect(canCast(world, world.units[0], spell(world, "R"))).toBe(true); cast(world, "R"); through(world, duration); expect(world.units[1].totals.damageTaken).toBe(647.5); expect(world.units[0].memory["talon:rTarget"]).toBe(-1);
    const ranged = arena(500); cast(ranged, "Qdash"); expect(canCast(ranged, ranged.units[0], spell(ranged, "R"))).toBe(true); cast(ranged, "R"); through(ranged, 20); expect(ranged.units[1].totals.damageTaken).toBe(525);
  });
  it("projectile walls destroy the actual outward and returning flights", () => {
    const world = arena(400); world.zones.push({ id: 1000, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 200 }); cast(world, "R"); through(world, 90); expect(world.units[1].totals.damageTaken).toBe(0);
    // The opposite radial representative remains on Talon's other side. A wall
    // introduced after outward travel must separately destroy each returning ray.
    const returning = arena(300); cast(returning, "R"); through(returning, 8); expect(returning.units[1].totals.damageTaken).toBe(280);
    returning.units[1].x = 0;
    for (const [id, x] of [[1001, 300], [1002, -300]] as const) returning.zones.push({ id, owner: 1, kind: "projectileWall", seenTick: 9, x, radius: 0, startTick: 9, endTick: 200 });
    through(returning, 90); expect(returning.units[1].totals.damageTaken).toBe(280); expect(returning.missiles).toHaveLength(0);
  });
  it("released R blades complete their original lifetime after death", () => { const world = arena(300); cast(world, "R"); through(world, 8); world.units[0].alive = false; world.units[0].hp = 0; through(world, 90); expect(world.units[1].totals.damageTaken).toBe(560); expect(world.result?.winner).toBe(1); });
  it("resource exhaustion prevents fresh Q/W/R while free terrain E stays available", () => { const world = arena(500); world.units[0].resource = 0; wall(world); for (const key of ["Qdash", "W", "R"]) expect(canCast(world, world.units[0], spell(world, key))).toBe(false); expect(canCast(world, world.units[0], spell(world, "E"))).toBe(true); });
});

describe("Talon reflected facing and reference budget", () => {
  it.each([0, 1] as const)("co-located W retains side %s facing instead of choosing a coordinate tie", side => {
    const world = createWorld({ fighters: side === 0 ? [compiled.spec, dummy()] : [dummy(), compiled.spec], distance: 0, modes: ["idle", "idle"] }); world.units[0].x = 0; world.units[1].x = 0;
    cast(world, "W", 1, side); through(world, 9); expect(world.missiles[0]!.direction).toBe(side === 0 ? 1 : -1);
  });
  it("extra AD and haste improve finite source-backed damage without buying a wall", () => {
    const base = damagePerSecond(compiled.spec, dummy()), upgraded = damagePerSecond({ ...compiled.spec, bonus: { ad: 100, abilityHaste: 100, attackSpeed: .5 } }, dummy()); expect(Object.values(base).every(Number.isFinite)).toBe(true); expect(upgraded.physical).toBeGreaterThan(base.physical); expect(compiled.spec.budget?.damage).toBeDefined();
  });
});
