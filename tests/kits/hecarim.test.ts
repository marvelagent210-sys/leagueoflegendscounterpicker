import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, attackRange, canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, beginResurrection, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Hecarim from "../../kits/champions/Hecarim";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Hecarim"), records("Hecarim"), Hecarim, {}, pets("Hecarim"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}): FighterSpec => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const worldFor = (distance = 300, bonus: FighterSpec["bonus"] = {}) => { const world = createWorld({ fighters: [subject(bonus), dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 40, maxBranches: 1, reactionTime: 10 } }); world.units[0].x = 0; world.units[1].x = distance; return world; };
const ability = (world: World, key: string) => world.units[0].spec.abilities.find(a => a.key === key)!;
const cast = (world: World, key: string, distance?: number) => startCast(world, world.units[0], ability(world, key), distance === undefined ? undefined : { direction: 1, distance });
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
const state = (world: World, side: 0 | 1, key: StateType, duration = 30) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration }, { scale: 1 });
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Test pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: Infinity, ...changes });
const basic = (world: World, pet?: Pet) => { startAttack(world, world.units[0], pet); const action = world.units[0].action; expect(action?.kind).toBe("windup"); if (action?.kind === "windup") advance(world, action.launchTick); };
const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;

describe("Hecarim production and evidence", () => {
  it("retains every primary pin, complete raw template, whole binary array and explicit conflict", () => {
    const value = compiled(), data = records("Hecarim");
    expect(data.map(row => row.page.revid).sort()).toEqual([3959924, 3985372, 3989863, 4007604, 4061151]);
    expect(data.every(row => row.sources?.some(source => source.page.revid === row.page.revid && source.text.some(text => text.includes("|champion") && text.includes("|notes"))))).toBe(true);
    for (const evidence of value.evidence.filter(row => row.url)) expect(evidence).toMatchObject({ url: "https://raw.communitydragon.org/16.20/game/data/characters/hecarim/hecarim.bin.json", sourceVersion: "16.20.8248524+branch.releases-16-20.content.release", sourceSha256: "b4274755f94e324f7200a1adf9c6a5bc808db6ade6a2f7176dcbac35fd46401e" });
    for (const row of data) for (const source of row.gameSources ?? []) for (const text of source.text.filter(text => text.includes(".values:"))) expect(JSON.parse(text.split(": ")[1]!)).toHaveLength(7);
    expect(value.assumptions.join(" ")).toContain("RampageDuration6"); expect(value.assumptions.join(" ")).toContain("TickTime0.5"); expect(value.assumptions.join(" ")).toContain("TimeToMaxMoveSpeed2.5"); expect(value.assumptions.join(" ")).toContain("unquantified");
    expect(value.variants).toEqual([]);
  });
  it("reflects exact 15000-gold builds and six production scores against Darius", () => {
    const own = compiled().spec, enemy = kit("Darius").spec;
    const forward = simulateMatchup(own, enemy, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(enemy, own, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(forward.scenarios).toHaveLength(6);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-10);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-10);
      for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
    }
    const casts = forward.scenarios.flatMap(scenario => scenario.outcomes.flatMap(outcome => outcome.timeline.filter(row => row.side === 0 && row.text.startsWith("casts ")).map(row => row.text)));
    for (const name of ["Rampage", "Spirit of Dread", "Devastating Charge", "Onslaught of Shadows"]) expect(casts.some(text => text.includes(name))).toBe(true);
  }, 60000);
  it("finishes all six production scenarios against actual Heimerdinger pets", () => {
    const result = simulateMatchup(compiled().spec, kit("Heimerdinger", { upgrade: 2 }).spec, 15000, prices);
    expect(result.scenarios).toHaveLength(6); expect(Number.isFinite(result.score)).toBe(true);
    for (const scenario of result.scenarios) for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
  }, 60000);
  it("reflects normal mirror damage without nonfinite outcomes", () => { const result = fairFight({ fighters: [subject(), subject()], distance: 600, modes: ["fight", "fight"], settings: { maxSeconds: 10, maxBranches: 1 } }); expect(result.damage[0]).toBeCloseTo(result.damage[1], 8); expect(Number.isFinite(result.seconds)).toBe(true); });
});

describe("Warpath and Rampage", () => {
  it("samples positive final movement speed on its quarter-second clock", () => {
    const world = worldFor(); applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "moveSpeedPercent", amount: { base: .2 }, duration: 10 }, { scale: 1 });
    advance(world, 7); expect(derive(world.units[0]).bonusAd).toBe(0); advance(world, 8); expect(derive(world.units[0]).bonusAd).toBeCloseTo((derive(world.units[0]).moveSpeed - 345) * .24);
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "slow", duration: 10, strength: .8 }, { scale: 1 }); advance(world, 16); expect(derive(world.units[0]).bonusAd).toBe(0);
  });
  it("converts once before total AD loss and an additional AD conversion", () => {
    const world = worldFor(300, { ad: 100 }); world.units[0].spec.statConversions = { attackDamageMultiplier: { base: .1, critChance: 0, bonusAttackSpeed: 0 } };
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "moveSpeedFlat", amount: { base: 200 }, duration: 10 }, { scale: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "stat", stat: "totalADReduction", amount: { base: 20 }, duration: 10 }, { scale: 1 }); advance(world, 8);
    const bonus = (derive(world.units[0]).moveSpeed - 345) * .24; expect(derive(world.units[0]).ad).toBeCloseTo((world.units[0].spec.base.ad + 100 + bonus - 20) * 1.1);
  });
  it("starts empty, snapshots stacks per cast and applies haste after stack cooldown", () => {
    const world = worldFor(300, { ad: 100, abilityHaste: 100 }); expect(world.units[0].memory["hecarim:rampage"]).toBe(0); cast(world, "Q");
    expect(100000 - world.units[1].hp).toBeCloseTo(270); expect(world.units[0].memory["hecarim:rampage"]).toBe(1); expect(world.units[0].cooldownReady.Q).toBe(49);
    world.units[0].cooldownReady.Q = 0; cast(world, "Q"); expect(100000 - world.units[1].hp).toBeCloseTo(270 + 270 * 1.06); expect(world.units[0].memory["hecarim:rampage"]).toBe(2);
  });
  it("grants one stack for a whole area, classifies actual minions and applies area resistance", () => {
    const world = worldFor(300), minion = spawnPet(world, world.units[1], petSpec({ targetClass: "minion" }), 250), monster = spawnPet(world, world.units[1], petSpec({ targetClass: "monster", areaTaken: .4 }), 200);
    cast(world, "Q"); expect(10000 - minion.hp).toBeCloseTo(108); expect(10000 - monster.hp).toBeCloseTo(72); expect(world.units[0].memory["hecarim:rampage"]).toBe(1); expect(100000 - world.units[1].hp).toBe(180);
  });
  it("builds on a real pet without borrowing the distant champion's defenses", () => { const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec({ targetClass: "minion" }), 200); state(world, 1, "parry"); cast(world, "Q"); expect(10000 - pet.hp).toBe(108); expect(world.units[0].memory["hecarim:rampage"]).toBe(1); expect(world.units[1].hp).toBe(100000); });
  it.each(["spellShield", "parry", "invulnerable", "untargetable", "stasis"] as const)("%s denies damage-based stacks", guard => { const world = worldFor(); state(world, 1, guard); cast(world, "Q"); expect(world.units[1].hp).toBe(100000); expect(world.units[0].memory["hecarim:rampage"]).toBe(0); });
  it("decays one stack after eight seconds and one more each second", () => { const world = worldFor(); for (let n = 0; n < 3; n++) { world.units[0].cooldownReady.Q = 0; cast(world, "Q"); } advance(world, 239); expect(world.units[0].memory["hecarim:rampage"]).toBe(3); advance(world, 240); expect(world.units[0].memory["hecarim:rampage"]).toBe(2); advance(world, 270); expect(world.units[0].memory["hecarim:rampage"]).toBe(1); advance(world, 300); expect(world.units[0].memory["hecarim:rampage"]).toBe(0); });
  it("keeps actual hit-count objects outside the area and has branch-local memory", () => { const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec({ hitPoints: true, hp: 4 }), 100); cast(world, "Q"); expect(pet.hp).toBe(4); expect(world.units[0].memory["hecarim:rampage"]).toBe(0); const clone = cloneWorld(world); clone.units[0].memory["hecarim:rampage"] = 3; expect(world.units[0].memory["hecarim:rampage"]).toBe(0); });
});

describe("Spirit of Dread actual damage and healing", () => {
  it.each([0,40,300])("retains damage-based healing through Riposte with %s shield without fabricating Rampage stacks", shield => {
    const world = worldFor(), [self, target] = world.units; self.hp -= 1000; cast(world, "W"); state(world, 1, "parry");
    if (shield) applyEffect(world, target, target, { type: "shield", amount: { base: shield }, duration: 5 }, { scale: 1 });
    cast(world, "Q"); expect(self.totals.healing).toBeCloseTo(180 * .25); expect(target.hp).toBe(100000);
    expect(self.memory["hecarim:rampage"]).toBe(shield > 0 ? 1 : 0);
    const pet = spawnPet(world, self, petSpec(), 100);
    for (const attackLike of [true,false]) petCombatHit(world, pet, target, [{ type: "damage", damageType: "true", amount: { base: 400 } }], attackLike);
    expect(self.totals.healing).toBeCloseTo(180 * .25 + 800 * .125); expect(target.hp).toBe(100000);
  });
  it("grants25resistances and four primary one-second ticks, healing from its own damage", () => {
    const world = worldFor(300, { ap: 100 }); world.units[0].hp -= 1000; const before = world.units[0].hp, armor = derive(world.units[0]).armor.bonus; cast(world, "W");
    expect(derive(world.units[0]).armor.bonus - armor).toBe(25); advance(world, 29); expect(world.units[1].hp).toBe(100000); advance(world, 30); expect(100000 - world.units[1].hp).toBe(80); advance(world, 120);
    expect(100000 - world.units[1].hp).toBe(320); expect(world.units[0].hp - before).toBe(80); expect(derive(world.units[0]).armor.bonus).toBe(armor);
  });
  it("leeches actual postmitigation shield damage and healing modifiers", () => {
    const world = worldFor(); world.units[0].hp -= 1000; cast(world, "W"); applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 1000 }, duration: 10 }, { scale: 1 });
    applyEffect(world, world.units[1], world.units[0], { type: "grievousWounds", duration: 10 }, { scale: 1 }); applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "healingIncrease", amount: { base: .5 }, duration: 10 }, { scale: 1 });
    const before = world.units[0].hp; cast(world, "Q"); expect(world.units[1].hp).toBe(100000); expect(world.units[0].hp - before).toBeCloseTo(180 * .25 * .6 * 1.5);
  });
  it("requires the damaged body to be in the current area", () => { const world = worldFor(); world.units[0].hp -= 1000; cast(world, "W"); world.units[1].x = 526; const before = world.units[0].hp; dealDamage(world, ...world.units, 1000, "true"); expect(world.units[0].hp).toBe(before); });
  it("shares the240cap across actual minions and monsters without capping champions", () => {
    const world = worldFor(); world.units[0].hp -= 2000; cast(world, "W"); const before = world.units[0].hp;
    const minion = spawnPet(world, world.units[1], petSpec({ targetClass: "minion" }), 100), monster = spawnPet(world, world.units[1], petSpec({ targetClass: "monster" }), 150);
    dealDamage(world, world.units[0], petFormulaTarget(minion, world.units[0]), 800, "true"); dealDamage(world, world.units[0], petFormulaTarget(monster, world.units[0]), 800, "true"); expect(world.units[0].hp - before).toBe(240);
    dealDamage(world, ...world.units, 400, "true"); expect(world.units[0].hp - before).toBe(340);
  });
  it("heals12.5%from a real allied pet packet and keeps its actual target coordinates", () => {
    const world = worldFor(); world.units[0].hp -= 1000; cast(world, "W"); const before = world.units[0].hp, pet = spawnPet(world, world.units[0], petSpec(), 100);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 400 } }], false); expect(world.units[0].hp - before).toBe(50);
    world.units[1].x = 1000; petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 400 } }], false); expect(world.units[0].hp - before).toBe(50);
  });
  it("does not consume spellshields and does not leech immune damage", () => { const world = worldFor(); world.units[0].hp -= 1000; cast(world, "W"); state(world, 1, "spellShield"); advance(world, 30); expect(100000 - world.units[1].hp).toBe(60); expect(hasState(world.units[1], "spellShield")).toBe(true); state(world, 1, "invulnerable"); const before = world.units[0].hp; advance(world, 120); expect(world.units[0].hp).toBe(before); });
});

describe("Devastating Charge actual empowered basic", () => {
  it("resets the timer, ramps multiplicatively and records only actual distance", () => {
    const world = worldFor(1500); world.units[0].attackReadyTick = 100; cast(world, "E"); expect(world.units[0].attackReadyTick).toBe(0); expect(derive(world.units[0]).rawMoveSpeed).toBe(345 * 1.25); expect(attackRange(world.units[0], world.units[1])).toBe(225);
    world.units[0].x = 600; advance(world, 30); expect(attackRange(world.units[0], world.units[1])).toBe(325); expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(345 * (1 + .25 + .4 / 3)); advance(world, 90); expect(derive(world.units[0]).rawMoveSpeed).toBeCloseTo(345 * 1.65); advance(world, 120); expect(hasState(world.units[0], "ghosted")).toBe(false); expect(attackRange(world.units[0], world.units[1])).toBe(175);
  });
  it("replaces a real attack launch with immediate fixed-direction movement and ordinary on-hits", () => {
    const world = worldFor(350, { ad: 100 }); world.units[0].spec.attack.onHit = [{ type: "damage", damageType: "magic", amount: { base: 10 } }]; cast(world, "E"); expect(canStartAttack(world, world.units[0])).toBe(true); basic(world);
    const distance = Number(world.units[0].memory["hecarim:charge:distance"]), bonusAD = derive(world.units[0]).bonusAd;
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad + (90 + .5 * bonusAD) * (1 + distance / 1200) + 10); expect(world.units[0].x).toBe(350 - world.units[0].spec.base.pathingRadius - world.units[1].spec.base.pathingRadius); expect(world.units[0].memory["hecarim:charge"]).toBeUndefined(); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(true); expect(world.units[1].x).toBeGreaterThan(100);
  });
  it("adds100%ADfor a critical strike without multiplying the E bonus", () => { const world = worldFor(100, { ad: 100, critChance: 1 }); cast(world, "E"); basic(world); const d = derive(world.units[0]), distance = Number(world.units[0].memory["hecarim:charge:distance"]); expect(100000 - world.units[1].hp).toBeCloseTo(d.ad * 2 + (90 + .5 * d.bonusAd) * (1 + distance / 1200)); });
  it("ignores blind and grants real life steal", () => { const world = worldFor(100); world.units[0].hp -= 1000; applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 10 }, { scale: 1 }); applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 }); const before = world.units[0].hp; cast(world, "E"); basic(world); expect(100000 - world.units[1].hp).toBeGreaterThan(200); expect(world.units[0].hp - before).toBeCloseTo((100000 - world.units[1].hp) * .2); });
  it.each(["blockAttacks", "dodgeAttacks"] as const)("%s denies damage while its independent knockback still attempts", guard => { const world = worldFor(100); state(world, 1, guard); cast(world, "E"); basic(world); expect(world.units[1].hp).toBe(100000); expect(world.units[1].x).toBeGreaterThan(100); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(true); });
  it.each(["spellShield", "parry"] as const)("%s protects both damage and control", guard => { const world = worldFor(100); state(world, 1, guard); cast(world, "E"); basic(world); expect(world.units[1].hp).toBe(100000); expect(world.units[1].forced).toBeUndefined(); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(false); });
  it("displacement immunity still allows the separately applied stun", () => { const world = worldFor(100); state(world, 1, "displacementImmune"); cast(world, "E"); basic(world); expect(world.units[1].forced).toBeUndefined(); expect(world.units[1].statuses.some(s => s.key === "stun")).toBe(true); });
  it.each(["root", "ground"] as const)("%s removes extra range; root preserves E on ordinary basics", guard => { const world = worldFor(100); cast(world, "E"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: guard, duration: 10 }, { scale: 1 }); expect(attackRange(world.units[0], world.units[1])).toBe(175); basic(world); expect(!!world.units[0].memory["hecarim:charge"]).toBe(guard === "root"); expect(world.units[0].x).toBe(0); });
  it("clips its immediate relocation and leaves E when terrain prevents nearby contact", () => { const world = worldFor(350); world.terrain.push({ id: 99, owner: 1, from: 60, to: 120, endTick: 1000 }); cast(world, "E"); basic(world); expect(world.units[0].x).toBe(60 - world.units[0].spec.base.pathingRadius); expect(world.units[1].hp).toBe(100000); expect(world.units[0].memory["hecarim:charge"]).toBe(true); });
  it("never tracks a target relocation during the windup", () => { const world = worldFor(350); cast(world, "E"); startAttack(world, world.units[0]); const action = world.units[0].action; expect(action?.kind).toBe("windup"); world.units[1].x = -200; if (action?.kind === "windup") advance(world, action.launchTick); expect(world.units[1].hp).toBe(100000); expect(world.units[0].memory["hecarim:charge"]).toBe(true); });
  it("uses an actual pet target and writes its displacement/stun without touching its owner", () => { const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec({ targetClass: "minion" }), 200); cast(world, "E"); basic(world, pet); expect(pet.hp).toBeLessThan(10000); expect(pet.x).toBeGreaterThan(350); expect(pet.statuses?.some(s => s.key === "stun")).toBe(true); expect(world.units[1].statuses).toEqual([]); expect(world.units[1].hp).toBe(100000); });
  it("resurrection clears a pending E and a dead caster never launches its packet", () => { const world = worldFor(100); cast(world, "E"); startAttack(world, world.units[0]); beginResurrection(world, world.units[0], { duration: 1 }); advance(world, 31); expect(world.units[1].hp).toBe(100000); expect(world.units[0].memory["hecarim:charge"]).toBeUndefined(); });
});

describe("Onslaught independent travel and fear", () => {
  it("takes real1100speed travel, pauses E and fears at actual arrival", () => {
    const world = worldFor(600); cast(world, "E"); cast(world, "R", 600); expect(world.units[0].action?.kind).toBe("dash"); expect(hasState(world.units[0], "displacementImmune")).toBe(true); advance(world, 5); expect(world.units[0].x).toBeCloseTo(1100 / 30 * 5); expect(world.units[1].statuses.some(s => s.key === "fear")).toBe(false); advance(world, 17); expect(world.units[0].x).toBeCloseTo(600); expect(hasState(world.units[0], "displacementImmune")).toBe(false); expect(world.units[1].statuses.find(s => s.key === "fear")!.endTick - 17).toBe(36); expect(Number(world.units[0].memory["hecarim:charge:end"])).toBeGreaterThan(120);
  });
  it("keeps its rider moving beyond the dash and damages a real pet independently", () => { const world = worldFor(1000), pet = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 1200); cast(world, "R", 300); advance(world, 9); expect(world.units[0].action).toBeUndefined(); expect(world.units[1].hp).toBe(100000); expect(world.missiles).toHaveLength(1); advance(world, 40); expect(100000 - world.units[1].hp).toBe(350); expect(10000 - pet.hp).toBeCloseTo(140); expect(pet.statuses?.some(s => s.key === "standardSight")).toBe(true); });
  it("a projectile wall denies riders while the separate dash still fears", () => { const world = worldFor(600); world.zones.push({ id: 99, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 1000 }); cast(world, "R", 600); advance(world, 20); expect(world.units[1].hp).toBe(100000); expect(world.units[1].statuses.some(s => s.key === "fear")).toBe(true); expect(world.units[0].x).toBeCloseTo(600); });
  it("riders survive caster death without granting a post-death arrival fear", () => { const world = worldFor(1000); cast(world, "R", 1000); dealDamage(world, world.units[1], world.units[0], 100000, "true"); world.units[0].alive = false; for (let tick = 0; tick <= 40; tick++) { world.tick = tick; advanceMissiles(world); } expect(100000 - world.units[1].hp).toBe(350); expect(world.units[1].statuses.some(s => s.key === "fear")).toBe(false); });
  it.each(["ground", "root"] as const)("%s prevents paid R declaration", guard => { const world = worldFor(); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: guard, duration: 10 }, { scale: 1 }); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false); });
  it("allows Q/W/E overlays and resists displacement during flight", () => { const world = worldFor(300); cast(world, "R", 600); const action = world.units[0].action; applyEffect(world, world.units[1], world.units[0], { type: "displace", direction: "away", distance: 100, duration: 1 }, { scale: 1 }); expect(world.units[0].action).toBe(action); for (const key of ["Q", "W", "E"]) expect(canCast(world, world.units[0], ability(world, key))).toBe(true); cast(world, "W"); expect(world.units[0].action).toBe(action); });
  it("uses the primary additive distance slow through slow resist and with ordinary slows", () => { const world = worldFor(600); world.units[1].spec.base.moveSpeed = 345; cast(world, "R", 600); advance(world, 17); world.units[1].x = 900; applyEffect(world, world.units[1], world.units[1], { type: "stat", stat: "slowResist", amount: { base: 1 }, duration: 10 }, { scale: 1 }); advance(world, 18); expect(derive(world.units[1]).rawMoveSpeed).toBeCloseTo(3.45); });
  it.each([0, 1] as const)("uses reflected directionTo at exact co-location for side%s", side => { const world = createWorld({ fighters: side === 0 ? [subject(), dummy()] : [dummy(), subject()], distance: 0, modes: ["idle", "idle"] }); world.units[0].x = world.units[1].x = 0; const self = world.units[side]; startCast(world, self, self.spec.abilities.find(a => a.key === "R")!, { direction: 1, distance: 300 }); expect(world.missiles.find(m => m.owner === side)!.direction).toBe(directionTo(self, world.units[1 - side]!)); expect(Math.sign(self.action?.kind === "dash" ? self.action.perTick : 0)).toBe(side === 0 ? 1 : -1); });
  it.each(["trade", "hold"] as const)("reserves a genuinely ready R in%s", mode => { const world = worldFor(600); world.modes[0] = mode; for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = 1000; expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true); expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: mode === "trade" ? 1 : 0 }); });
  it("preserves completed trade retreat with R genuinely ready and denies all paid casts without mana", () => { const world = worldFor(600); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true; expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true); expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 }); world.units[0].resource = 0; for (const key of ["Q", "W", "E", "R"]) expect(canCast(world, world.units[0], ability(world, key))).toBe(false); });
});
