import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { applyEffect, attackHit, beginResurrection, canTarget, dealDamage, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import Zed from "../../kits/champions/Zed";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records } from "./helpers";

const compiled = compileKit(championData("Zed"), records("Zed"), Zed, {}, pets("Zed"));
const ability = (key: string): AbilitySpec => compiled.spec.abilities.find((a) => a.key === key)!;
function worldFor(x = 300, ad = 100): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ad } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = x; return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(world, world.units[0], ability(key), aim);
function state(world: World, target: Unit, key: StateType, duration = 5): void { applyEffect(world, target, target, { type: "state", state: key, duration }, { scale: 1 }); }
function summon(world: World, x: number, extra: Partial<PetSpec> = {}): Pet { return spawnPet(world, world.units[1], { kind: "fixture", name: "Actual summon", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, ...extra }, x); }
const shadows = (world: World) => world.pets.filter((p) => p.owner === 0 && p.spec.kind === "zed:shadow");
function wReady(world: World, distance = 325): Pet { cast(world, "W", { direction: 1, distance }); through(world, Math.ceil(distance / 2500 * 30)); return shadows(world).find((p) => p.memory.source === "W")!; }
function rReady(world: World): void { const start = world.tick; cast(world, "R"); through(world, start + 30); }

// Run the production route first: default budget, six scenarios, real behavior and reflection.
describe("Zed full production and reflection", () => {
  it("uses QWER at ordinary 15000 gold and reflects all six scenario scores and builds", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const opponent = kit("Darius").spec, forward = simulateMatchup(compiled.spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled.spec, 15000, prices);
    expect(forward.scenarios).toHaveLength(6); expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const reflected = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(reflected.score).toBeUndefined(); else expect(Math.abs(scenario.score + reflected.score!)).toBeLessThan(1e-12);
      expect(scenario.outcomes.every((o) => Number.isFinite(o.seconds) && o.hp.every(Number.isFinite))).toBe(true);
    }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(ability(key).name))).toBe(true);
  }, 60000);
});

describe("Zed pinned source numeric contract", () => {
  it("reads all five ability pins, pet identity and exact game version/hash", () => {
    expect(new Set(compiled.evidence.filter((row) => row.revid).map((row) => row.revid))).toEqual(new Set([...records("Zed").map((r) => r.page.revid), 4026038]));
    const game = compiled.evidence.filter((row) => row.url); expect(game.length).toBeGreaterThanOrEqual(12);
    expect(game.every((row) => row.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && row.sourceSha256 === "475ea0d11b79d2cc4a97e9d41e4da1b7187500feaa02906de3a2650bcf9653fb")).toBe(true);
    const ctx = new KitContext(championData("Zed"), records("Zed"));
    expect(ctx.ability("Q").formula("Physical Damage")).toEqual({ base: 240, ratios: { bonusAD: 1 } });
    expect(ctx.ability("E").formula("Physical Damage")).toEqual({ base: 160, ratios: { bonusAD: .7 } });
    expect(["Q", "W", "E", "R"].map((key) => [ability(key).cooldown, ability(key).cost ?? 0, ability(key).castTime])).toEqual([[6, 55, .25], [16, 20, 0], [3, 40, 0], [100, 0, 0]]);
  });
  it("fails closed if exact game evidence is removed", () => {
    const broken = structuredClone(records("Zed")); delete broken.find((r) => r.kind === "Q")!.gameSources;
    expect(() => compileKit(championData("Zed"), broken, Zed, {}, pets("Zed"))).toThrow("pinned game data");
  });
});

describe("Contempt actual impact and target guards", () => {
  it("checks health before basic damage and consumes a champion lock for ten seconds", () => {
    const world = worldFor(), self = world.units[0], target = world.units[1], ad = derive(self).ad;
    target.hp = 10001; attackHit(world, self, target, false, []); expect(target.totals.damageTaken).toBeCloseTo(ad);
    attackHit(world, self, target, false, []); expect(target.totals.damageTaken).toBeCloseTo(2 * ad + 2000);
    attackHit(world, self, target, false, []); expect(target.totals.damageTaken).toBeCloseTo(3 * ad + 2000);
    world.tick = 300; attackHit(world, self, target, false, []); expect(target.totals.damageTaken).toBeCloseTo(4 * ad + 4000);
  });
  it.each(["dodgeAttacks", "parry"] as const)("%s and blind do not consume the lock", (guard) => {
    const world = worldFor(); world.units[1].hp = 9000; state(world, world.units[1], guard); attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[1].statuses.some((s) => s.key === "zed:contempt")).toBe(false);
    world.units[1].statuses = []; attackHit(world, world.units[0], world.units[1], true, []); expect(world.units[1].statuses.some((s) => s.key === "zed:contempt")).toBe(false);
  });
  it("a blocked basic consumes champion passive without damage", () => {
    const world = worldFor(); world.units[1].hp = 9000; state(world, world.units[1], "blockAttacks"); attackHit(world, world.units[0], world.units[1], false, []);
    expect(world.units[1].hp).toBe(9000); expect(world.units[1].statuses.some((s) => s.key === "zed:contempt")).toBe(true);
  });
  it("uses actual pet identity and only monster classification selects its cap", () => {
    const world = worldFor(), monster = summon(world, 100, { targetClass: "monster" }), minion = summon(world, 100, { targetClass: "minion" }), clone = summon(world, 100, { targetClass: "champion", unitClass: "clone" });
    for (const body of [monster, minion, clone]) { body.hp = 4000; resolveAttackOnPet(world, world.units[0], body, false, [], {}); }
    expect(4000 - monster.hp).toBeCloseTo(derive(world.units[0]).ad + 175); expect(4000 - minion.hp).toBeCloseTo(derive(world.units[0]).ad + 1000);
    expect(clone.statuses!.some((s) => s.key === "zed:contempt")).toBe(true); expect(world.units[1].hp).toBe(20000);
  });
});

describe("Independent source Shadows and swap lifecycle", () => {
  it("places an untargetable minion with finite travel and no clone classification", () => {
    const world = worldFor(600); cast(world, "W", { direction: 1, distance: 650 }); const body = shadows(world)[0]!;
    expect(body.x).toBe(0); expect(body.spec.targetClass).toBe("minion"); expect(body.spec.unitClass).toBeUndefined(); expect(body.spec.untargetable).toBe(true); expect(body.spec.attack).toBeUndefined();
    through(world, 3); expect(body.x).toBeCloseTo(1000 / 3); through(world, 8); expect(body.x).toBe(650);
    expect(body.endTick).toBe(166); expect(world.units[1].hp).toBe(20000);
  });
  it("keeps W and R separate, replacing only the same source", () => {
    const world = worldFor(); const original = wReady(world); cast(world, "W2"); world.units[0].cooldownReady.W = 0; cast(world, "W");
    const next = shadows(world)[0]!; expect(next.id).not.toBe(original.id); cast(world, "R"); expect(shadows(world)).toHaveLength(2); expect(new Set(shadows(world).map((p) => p.memory.source))).toEqual(new Set(["W", "R"]));
  });
  it("queues a W swap until placement, permits one exchange and retains shadow position", () => {
    const world = worldFor(650); cast(world, "W", { direction: 1, distance: 650 }); cast(world, "W2"); expect(world.units[0].x).toBe(0); through(world, 8);
    expect(world.units[0].x).toBe(650); expect(shadows(world)[0]!.x).toBe(0); expect(canCast(world, world.units[0], ability("W2"))).toBe(false);
  });
  it.each(["root", "ground"] as const)("%s gates swaps but permits initial W", (cc) => {
    const world = worldFor(), body = wReady(world); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 2 }, { scale: 1 });
    expect(canCast(world, world.units[0], ability("W2"))).toBe(false); expect(body.memory.swapped).toBe(false);
  });
  it("expires the stationary shadow and cancels an unreleased mimic", () => {
    const world = worldFor(), body = wReady(world); body.endTick = world.tick + 3; cast(world, "Q"); through(world, world.tick + 30);
    expect(shadows(world)).toHaveLength(0); expect(world.units[1].totals.damageTaken).toBeCloseTo(340);
  });
  it("retains source Shadows after owner death without inventing later casts", () => {
    const world = worldFor(), body = wReady(world); world.units[0].alive = false; world.units[0].hp = 0; step(world, [standStill, standStill]);
    expect(world.pets).toContain(body); expect(world.missiles).toHaveLength(0);
  });
});

describe("Razor Shuriken actual per-source flight", () => {
  it("releases at cast completion, with source-local aim and one refund per actual target/cast", () => {
    const world = worldFor(600); wReady(world, 325); cast(world, "Q"); const tick = world.tick; through(world, tick + 7); expect(world.missiles).toHaveLength(0); through(world, tick + 8); expect(world.missiles).toHaveLength(2); through(world, tick + 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(680); expect(world.units[0].resource).toBe(175); expect(Object.keys(world.units[0].memory).filter((key) => key.startsWith("zed:refund:"))).toHaveLength(1);
  });
  it("aims all sources at one fixed world location, including a shadow beyond it", () => {
    const world = worldFor(300); const body = wReady(world, 650); cast(world, "Q", { direction: 1, distance: 300 }); through(world, world.tick + 8);
    expect(world.missiles.find((m) => Number(world.units[0].memory[`zed:q:${m.id}:source`]?.toString().split(":")[1]) === body.id)?.direction).toBe(-1);
  });
  it("pass-through reduction belongs to each missile and an actual pet is first contact", () => {
    const world = worldFor(600), body = summon(world, 250); cast(world, "Q"); through(world, 30);
    expect(10000 - body.hp).toBeCloseTo(340); expect(world.units[1].totals.damageTaken).toBeCloseTo(204);
  });
  it("a spell-shielded pet still makes that missile's later champion hit reduced", () => {
    const world = worldFor(600), body = summon(world, 250); body.statuses!.push({ kind: "state", key: "spellShield", value: 1, source: 1, startTick: 0, endTick: 90 }); cast(world, "Q"); through(world, 30);
    expect(body.hp).toBe(10000); expect(world.units[1].totals.damageTaken).toBeCloseTo(204);
  });
  it("two sources hitting different bodies do not restore energy", () => {
    const world = worldFor(2500), body = wReady(world, 325), actual = summon(world, 600); world.units[0].x = 2000; cast(world, "Q", { direction: 1, distance: 500 }); through(world, world.tick + 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(340); expect(10000 - actual.hp).toBeCloseTo(340); expect(world.units[0].resource).toBe(125); expect(body.spec.untargetable).toBe(true);
  });
  it("three sources contacting both a champion and pet refund only once for that Q cast", () => {
    const world = worldFor(600); wReady(world); rReady(world); world.units[0].x = 0;
    const bodies = shadows(world); bodies[0]!.x = 200; bodies[1]!.x = 400; const actual = summon(world, 800);
    cast(world, "Q"); through(world, world.tick + 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(1020); expect(10000 - actual.hp).toBeCloseTo(612);
    expect(world.units[0].resource).toBe(175); expect(Object.keys(world.units[0].memory).filter((key) => key.startsWith("zed:refund:"))).toHaveLength(1);
  });
  it("a projectile wall removes only flights that actually cross it", () => {
    const world = worldFor(600); wReady(world, 650); world.zones.push({ id: 999, owner: 1, kind: "projectileWall", x: 300, radius: 0, startTick: 0, endTick: 100, seenTick: 0 }); cast(world, "Q"); through(world, world.tick + 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(340); expect(world.units[0].resource).toBe(125);
  });
  it.each(["spellShield", "parry", "stasis", "untargetable"] as const)("%s prevents source damage and refund", (guard) => {
    const world = worldFor(600); wReady(world); state(world, world.units[1], guard); cast(world, "Q"); through(world, world.tick + 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(guard === "spellShield" ? 340 : 0); expect(world.units[0].resource).toBe(125);
  });
  it("released Qs survive caster death", () => {
    const world = worldFor(800); cast(world, "Q"); through(world, 8); world.units[0].hp = 0; world.units[0].alive = false; through(world, 30);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(340);
  });
});

describe("Shadow Slash one damage group and independently guarded slow", () => {
  it("owner slash alone has no slow and refunds W only on that actual champion", () => {
    const world = worldFor(200); world.units[0].cooldownReady.W = 500; cast(world, "E");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(230); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false); expect(world.units[0].cooldownReady.W).toBe(410);
  });
  it("two nearby slashes deal one packet, enhance slow and refund energy once", () => {
    const world = worldFor(300); wReady(world); cast(world, "E"); expect(world.units[1].totals.damageTaken).toBeCloseTo(230);
    expect(world.units[1].statuses.find((s) => s.key === "slow")!.value).toBe(.6); expect(world.units[0].resource).toBe(190);
  });
  it("a queued shadow slash shares its first damage attempt and refund with the earlier owner slash", () => {
    const world = worldFor(200); cast(world, "W"); cast(world, "E");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(230); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false);
    through(world, 5); expect(world.units[1].totals.damageTaken).toBeCloseTo(230);
    expect(world.units[1].statuses.find((s) => s.key === "slow")!.value).toBe(.6); expect(world.units[0].resource).toBe(190);
  });
  it("owner plus one shadow shield blocks all damage and slow", () => {
    const world = worldFor(300); wReady(world); state(world, world.units[1], "spellShield"); cast(world, "E");
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false); expect(world.units[0].resource).toBe(140);
  });
  it("two shadows with one shield leave only base slow and never damage twice", () => {
    const world = worldFor(300); wReady(world); rReady(world); world.units[0].x = 2000; for (const body of shadows(world)) body.x = 300; state(world, world.units[1], "spellShield"); cast(world, "E");
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.find((s) => s.key === "slow")!.value).toBe(.4);
  });
  it("three slashes with one shield retain enhanced slow without extra damage", () => {
    const world = worldFor(300); wReady(world); rReady(world); world.units[0].x = 300; for (const body of shadows(world)) body.x = 300; state(world, world.units[1], "spellShield"); cast(world, "E");
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.find((s) => s.key === "slow")!.value).toBe(.6);
  });
});

describe("Death Mark actual damage ledger and movement", () => {
  it("spawns immediately, delays 0.6 seconds then dashes for 0.35 and marks after arrival", () => {
    const world = worldFor(300); cast(world, "R"); expect(shadows(world)).toHaveLength(1); expect(isUntargetable(world.units[0], world.units[1])).toBe(true); through(world, 17); expect(world.units[0].x).toBe(0); through(world, 18); expect(world.units[0].action?.kind).toBe("dash"); through(world, 29);
    expect(world.units[0].x).toBeCloseTo(425); expect(world.units[1].statuses.some((s) => s.key === "zed:deathMark")).toBe(true); expect(isUntargetable(world.units[0], world.units[1])).toBe(false); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("detonates only base AD without intervening real damage", () => {
    const world = worldFor(); rReady(world); through(world, 119); expect(world.units[1].totals.damageTaken).toBeCloseTo(derive(world.units[0]).ad);
  });
  it("stores actual accepted physical/magic raw, including shields, excluding true damage", () => {
    const world = worldFor(); rReady(world); const self = world.units[0], enemy = world.units[1]; applyEffect(world, enemy, enemy, { type: "shield", amount: { base: 1000 }, duration: 1 }, { scale: 1 });
    dealDamage(world, self, enemy, 300, "physical"); dealDamage(world, self, enemy, 200, "magic"); dealDamage(world, self, enemy, 100, "true"); expect(self.memory["zed:r:stored"]).toBe(500); through(world, 119);
    expect(enemy.totals.damageTaken).toBeCloseTo(derive(self).ad + 275);
  });
  it("initial cast ignores spell shield but mark application consumes it", () => {
    const world = worldFor(); state(world, world.units[1], "spellShield"); cast(world, "R"); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true); through(world, 119);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false);
  });
  it("a shield gained after application cannot block detonation", () => {
    const world = worldFor(); rReady(world); state(world, world.units[1], "spellShield"); through(world, 119);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(derive(world.units[0]).ad); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });
  it.each(["untargetable", "stasis"] as const)("%s at arrival denies the actual mark", (guard) => {
    const world = worldFor(); cast(world, "R"); state(world, world.units[1], guard); through(world, 119); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it.each(["untargetable", "stasis", "invulnerable", "parry"] as const)("%s at mark detonation respects the attached-damage exception and actual damage guard", (guard) => {
    const world = worldFor(); rReady(world); state(world, world.units[1], guard); through(world, 119);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(guard === "untargetable" ? derive(world.units[0]).ad : 0);
  });
  it("pre-dash range cancellation removes only R source and sets static half-second cooldown", () => {
    const world = worldFor(); wReady(world); cast(world, "R"); world.units[1].x = 2000; through(world, world.tick + 18);
    expect(shadows(world)).toHaveLength(1); expect(shadows(world)[0]!.memory.source).toBe("W"); expect(world.units[0].cooldownReady.R).toBe(world.tick - 1 + 15); expect(world.units[0].x).toBe(0);
  });
  it("a dash interruption ends untargetability early and still applies the mark", () => {
    const world = worldFor(); cast(world, "R"); through(world, 20); applyEffect(world, world.units[1], world.units[0], { type: "displace", direction: "away", distance: 10, duration: .1 }, { scale: 1 });
    expect(world.units[0].action?.kind).not.toBe("dash"); expect(isUntargetable(world.units[0], world.units[1])).toBe(false); expect(world.units[1].statuses.some((s) => s.key === "zed:deathMark")).toBe(true);
  });
  it("chooses the beyond-target approach from the position at the end of the delay", () => {
    const world = worldFor(300); cast(world, "R"); world.units[1].x = -300; through(world, 29);
    expect(world.units[0].x).toBeCloseTo(-425); expect(world.units[1].statuses.some((s) => s.key === "zed:deathMark")).toBe(true);
  });
  it("clears an applied mark on attackable target resurrection even when the egg ends before detonation", () => {
    const world = worldFor(); rReady(world); world.units[1].hp = 0;
    expect(beginResurrection(world, world.units[1], { duration: .5 })).toBe(true);
    through(world, 119); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].memory["zed:r:markEnd"]).toBeUndefined();
  });
  it("holds R swap until half a second after arrival and ends it before shadow expiry", () => {
    const world = worldFor(); rReady(world); expect(canCast(world, world.units[0], ability("R2"))).toBe(false); through(world, 44); expect(canCast(world, world.units[0], ability("R2"))).toBe(true); world.tick = 233; expect(canCast(world, world.units[0], ability("R2"))).toBe(false);
  });
  it("the applied mark and source shadow survive caster death", () => {
    const world = worldFor(); rReady(world); world.units[0].hp = 0; world.units[0].alive = false; through(world, 119);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(derive(world.units[0]).ad); expect(shadows(world)).toHaveLength(1);
  });
});

describe("Zed behavior reservation, stealth and exact-overlap reflection", () => {
  it.each(["hold", "trade"] as const)("reserves actually-ready R in %s", (mode) => {
    const world = worldFor(); world.modes[0] = mode; expect(canCast(world, world.units[0], ability("R"))).toBe(true); const command = compiled.spec.behavior!(perceive(world, 0)); expect(command).not.toMatchObject({ kind: "cast", ability: "R" });
  });
  it("a completed trade retreats even with available offense", () => {
    const world = worldFor(); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true; world.units[0].cooldownReady.W = 1000;
    expect(compiled.spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("does not aim R/Q at an unseen enemy, while a nearby E remains spatial", () => {
    const world = worldFor(200); world.modes[0] = "fight"; state(world, world.units[1], "invisible"); expect(canTarget(world.units[1], world.units[0])).toBe(false);
    expect(compiled.spec.behavior!(perceive(world, 0))).toMatchObject({ kind: "cast", ability: "E" });
  });
  it.each([0, 1] as const)("R and Q retain reflected directionTo at exact overlap for side %s", (side) => {
    const enemy = fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } }), world = createWorld({ fighters: side === 0 ? [compiled.spec, enemy] : [enemy, compiled.spec], distance: 0, modes: ["idle", "idle"] });
    world.units[0].x = 0; world.units[1].x = 0; const self = world.units[side], target = world.units[1 - side]!; const direction = directionTo(self, target);
    startCast(world, self, ability("Q")); through(world, 8); expect(world.missiles[0]!.direction).toBe(direction); through(world, 9); startCast(world, self, ability("R")); through(world, 39); expect(self.x).toBeCloseTo(direction * 125);
  });
});
