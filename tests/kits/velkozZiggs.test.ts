import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive, react } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Velkoz from "../../kits/champions/Velkoz";
import Ziggs from "../../kits/champions/Ziggs";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, records } from "./helpers";

const vel = compileKit(championData("Velkoz"), records("Velkoz"), Velkoz), zig = compileKit(championData("Ziggs"), records("Ziggs"), Ziggs);
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
function worldFor(spec: FighterSpec, x = 300, ap = 100): World {
  const world = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 60 } });
  world.units[0].x = 0; world.units[1].x = x; return world;
}
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
function cast(world: World, key: string, aim?: { direction: 1 | -1; distance: number }): void { startCast(world, world.units[0], ability(world.units[0].spec, key), aim); }
function state(world: World, key: StateType, duration = 10, self = false) { const unit = world.units[self ? 0 : 1]; applyEffect(world, unit, unit, { type: "state", state: key, duration }, { scale: 1 }); }
function hit(world: World, key: string) { const spec = ability(world.units[0].spec, key); abilityHit(world, world.units[0], world.units[1], spec, spec.onHit ?? []); }

describe("Vel'Koz pinned mechanics", () => {
  it("reads all five revisions and the level-twenty passive value", () => {
    expect(vel.evidence.map((row) => row.revid)).toEqual(expect.arrayContaining([3986690, 4008544, 4008545, 3952590, 4012050]));
    const world = worldFor(vel.spec); hit(world, "Q"); hit(world, "W"); hit(world, "E");
    expect(world.units[1].totals.damageTaken).toBeCloseTo(330 + 130 + 220 + 257.058823529412);
    expect(world.units[0].memory["velkoz:deconstruction"]).toBe(0);
    expect(world.units[0].memory["velkoz:research:until"]).toBe(210);
  });
  it("a spell shield consumes contact without leaking a passive stack", () => { const world = worldFor(vel.spec); state(world, "spellShield"); hit(world, "Q"); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].memory["velkoz:deconstruction"]).toBeUndefined(); });
  it("basic attacks refresh but do not add stacks, and blind cannot refresh", () => {
    const world = worldFor(vel.spec); hit(world, "Q"); world.tick = 100; startAttack(world, world.units[0]); through(world, 110);
    expect(world.units[0].memory["velkoz:deconstruction"]).toBe(1); expect(Number(world.units[0].memory["velkoz:deconstruction:until"])).toBeGreaterThan(300);
    const until = world.units[0].memory["velkoz:deconstruction:until"]; world.units[0].attackReadyTick = 0; applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 }); startAttack(world, world.units[0]); through(world, 125);
    expect(world.units[0].memory["velkoz:deconstruction:until"]).toBe(until);
  });
  it.each(["parry", "dodgeAttacks", "blockAttacks"] as const)("the disclosed %s attack policy does not refresh existing marks", (defense) => {
    const world = worldFor(vel.spec); hit(world, "Q"); world.tick = 100; state(world, defense);
    startAttack(world, world.units[0]); through(world, 115);
    expect(world.units[0].memory["velkoz:deconstruction:until"]).toBe(210);
  });
  it("deconstruction expires at the seven-second boundary", () => { const world = worldFor(vel.spec); hit(world, "Q"); world.tick = 210; hit(world, "W"); expect(world.units[0].memory["velkoz:deconstruction"]).toBe(1); });
  it("ordinary ranged attacks are instant and survive projectile walls", () => { const world = worldFor(vel.spec); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 300 }); startAttack(world, world.units[0]); through(world, 20); expect(world.units[1].totals.damageTaken).toBeCloseTo(116.779564); expect(world.missiles).toHaveLength(0); });
  it("Q travels and its seventy-percent slow decays", () => { const world = worldFor(vel.spec, 700); cast(world, "Q"); through(world, 10); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(330); const slow = world.units[1].statuses.find((status) => status.memoKey === "velkoz:qSlow")!; expect(slow.value).toBeLessThan(.7); const first = slow.value; through(world, 60); expect(world.units[1].statuses.find((status) => status.memoKey === "velkoz:qSlow")!.value).toBeLessThan(first); });
  it("W opens after the delay, has two charges, and deals its two separate packets", () => { const world = worldFor(vel.spec); cast(world, "W"); through(world, 7); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 29); expect(world.units[1].totals.damageTaken).toBeCloseTo(130); through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(320); expect(world.units[0].charges.W?.count).toBe(1); expect(world.units[0].charges.W?.nextTick).toBe(450); expect(world.units[0].cooldownReady.W).toBe(45); });
  it("W's static lock remains 1.5 seconds while haste halves recharge", () => { const world = worldFor(vel.spec); world.units[0].spec = { ...world.units[0].spec, bonus: { abilityHaste: 100 } }; cast(world, "W"); expect(world.units[0].cooldownReady.W).toBe(45); expect(world.units[0].charges.W?.nextTick).toBe(225); });
  it("a wall stops W formation while its earlier prefix still collapses", () => { const world = worldFor(vel.spec, 200); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 400, radius: 0, startTick: 0, endTick: 300 }); cast(world, "W"); through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(320); expect(world.missiles.some((missile) => missile.source === "W")).toBe(false); });
  it("leaving the formed W before collapse avoids its second packet", () => { const world = worldFor(vel.spec, 200); cast(world, "W"); through(world, 20); world.units[1].x = 1500; through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(130); });
  it("W collapse retains the sourced ninety-five-unit rear segment", () => { const world = worldFor(vel.spec, 1000); cast(world, "W"); through(world, 25); world.units[1].x = -90; through(world, 30); expect(world.units[1].totals.damageTaken).toBeGreaterThanOrEqual(190); });
  it("one shield negates W ripple while collapse remains independent", () => { const world = worldFor(vel.spec); state(world, "spellShield"); cast(world, "W"); through(world, 30); expect(world.units[1].totals.damageTaken).toBeCloseTo(190); });
  it.each([[0, .25], [150, .25], [475, .40], [800, .55]])("E distance %i uses a sourced/interpolated %f-second flight after casting", (distance, seconds) => { const world = worldFor(vel.spec, Math.max(distance, 1)); cast(world, "E", { direction: 1, distance }); through(world, 8 + Math.ceil(seconds * 30 - 1e-6) - 1); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 8 + Math.ceil(seconds * 30 - 1e-6) + 1); expect(world.units[1].totals.damageTaken).toBeCloseTo(220); });
  it("E displacement immunity retains damage and stacks while suppressing both controls", () => { const world = worldFor(vel.spec); state(world, "displacementImmune"); hit(world, "E"); expect(world.units[1].totals.damageTaken).toBeCloseTo(220); expect(world.units[1].statuses.some((status) => status.kind === "cc")).toBe(false); expect(world.units[0].memory["velkoz:deconstruction"]).toBe(1); });
  it("R delivers thirteen pulses on a separate three-stack clock", () => { const world = worldFor(vel.spec); cast(world, "R"); through(world, 11); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 84); expect(world.units[0].memory.rayPulses).toBe(13); expect(world.log.filter((entry) => entry.text.includes("Life Form Disintegration Ray deals"))).toHaveLength(13); expect(world.units[1].totals.damageTaken).toBeCloseTo(1050 + 257.058823529412); expect(world.units[0].memory["velkoz:deconstruction"]).toBe(0); });
  it("R changes future pulse type after independent research and never hits a rival wholly behind", () => { const world = worldFor(vel.spec); cast(world, "R"); through(world, 70); expect(world.log.some((entry) => entry.text.includes("Life Form Disintegration Ray deals") && entry.text.includes("magic damage"))).toBe(true); through(world, 84); expect(world.log.some((entry) => entry.text.includes("Life Form Disintegration Ray deals") && entry.text.includes("true damage"))).toBe(true); const other = worldFor(vel.spec); cast(other, "R"); other.units[1].x = -100; through(other, 84); expect(other.units[1].totals.damageTaken).toBe(0); });
  it("R root does not interrupt, silence does, and recast has a one-second channel lock", () => { const world = worldFor(vel.spec); cast(world, "R"); expect(canCast(world, world.units[0], ability(vel.spec, "Rend"))).toBe(false); world.tick = 36; expect(canCast(world, world.units[0], ability(vel.spec, "Rend"))).toBe(true); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "root", duration: 2 }, { scale: 1 }); expect(world.units[0].action?.kind).toBe("channel"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "silence", duration: 2 }, { scale: 1 }); expect(world.units[0].action).toBeUndefined(); });
  it("enemy pets gain their own deconstruction without researching their owner", () => { const world = worldFor(vel.spec, 1500); const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Dummy pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20 }, 200); cast(world, "W"); through(world, 30); expect(pet.memory["velkoz:deconstruction:0"]).toBe(2); expect(world.units[0].memory["velkoz:research:until"]).toBeUndefined(); });
  it("Q refunds its sourced thirty mana when the following passive proc is lethal", () => {
    const world = worldFor(vel.spec); hit(world, "W"); hit(world, "E"); world.units[1].hp = 500;
    const initial = world.units[0].resource; cast(world, "Q"); through(world, 30);
    expect(world.units[0].resource).toBeCloseTo(initial - 60 + 30); expect(world.units[0].memory.qRefunded).toBe(30);
  });
  it("Q pet kills refund mana without researching the champion", () => {
    const world = worldFor(vel.spec, 1500); spawnPet(world, world.units[1], { kind: "dummy", name: "Pet", hp: 100, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 200);
    const initial = world.units[0].resource; cast(world, "Q"); through(world, 30);
    expect(world.units[0].resource).toBeCloseTo(initial - 60 + 30); expect(world.units[0].memory["velkoz:research:until"]).toBeUndefined();
  });
  it("ray pulses announce real forward ground threats and vanish on interruption", () => {
    const world = worldFor(vel.spec); cast(world, "R"); through(world, 8);
    const threats = perceive(world, 1).threats.filter((threat) => threat.source === "rayMagic");
    expect(threats).toHaveLength(13); expect(threats[0]!.damage).toBeCloseTo(1050 / 13);
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 1 }, { scale: 1 });
    through(world, 84); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.some((zone) => zone.memory?.rayPulse)).toBe(false);
  });
  it("a formed rift and its collapse state are copied independently", () => {
    const world = worldFor(vel.spec, 1000); cast(world, "W"); through(world, 15); const other = cloneWorld(world);
    world.units[1].x = 200; other.units[1].x = 1500; through(world, 30); through(other, 30);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(other.units[1].totals.damageTaken);
  });
  it("forecasts W's separate ripple and collapse packets without counting either twice", () => {
    const world = worldFor(vel.spec, 700); world.settings.reactionTime = 0; cast(world, "W");
    expect(perceive(world, 1).threats.filter((threat) => threat.source === "W" || threat.source === "riftCollapse").map((threat) => threat.damage)).toEqual([130]);
    through(world, 8);
    const threats = perceive(world, 1).threats.filter((threat) => threat.source === "W" || threat.source === "riftCollapse");
    expect(threats.find((threat) => threat.source === "W")!.damage).toBeCloseTo(130);
    expect(threats.find((threat) => threat.source === "riftCollapse")!.damage).toBeCloseTo(190);
    expect(threats.reduce((sum, threat) => sum + threat.damage, 0)).toBeCloseTo(320);
  });
  it.each([["W", 1000, 320], ["E", 700, 220]] as const)("%s's documented spatial ground policy does not invent a lateral miss against a stationary rival", (key, distance, expected) => {
    const world = worldFor(vel.spec, distance); world.settings.reactionTime = 0;
    world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, moveSpeed: 350 } };
    cast(world, key); through(world, 40); expect(world.units[1].totals.damageTaken).toBeCloseTo(expected);
  });
  it.each(["spellShield", "parry", "untargetable"] as const)("E checks %s at impact without granting Deconstruction", (defense) => {
    const world = worldFor(vel.spec); cast(world, "E"); through(world, 10); state(world, defense); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].memory["velkoz:deconstruction"]).toBeUndefined();
    expect(world.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
  });
  it("E preserves spell damage and Deconstruction through CC immunity and Black Shield", () => {
    for (const shielded of [false, true]) {
      const world = worldFor(vel.spec);
      if (shielded) applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 500 }, duration: 10, shieldType: "magic", blackShield: true }, { scale: 1 });
      else state(world, "ccImmune");
      cast(world, "E"); through(world, 40);
      expect(world.units[1].totals.damageTaken).toBeCloseTo(shielded ? 0 : 220);
      if (shielded) expect(world.units[1].statuses.find((status) => status.kind === "shield")!.value).toBeCloseTo(280);
      expect(world.units[0].memory["velkoz:deconstruction"]).toBe(1);
      expect(world.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
    }
  });
  it("a blocked E projectile removes its pending damage and control area", () => {
    const world = worldFor(vel.spec); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 300 });
    cast(world, "E"); through(world, 40);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.some((zone) => zone.ability === "E")).toBe(false);
  });
  it("E retains its declaration origin and landing location if Vel'Koz is displaced during the cast", () => {
    const world = worldFor(vel.spec); cast(world, "E"); world.units[0].x = 1000; through(world, 9);
    expect(world.missiles.find((missile) => missile.source === "E")!.direction).toBe(1);
    expect(world.zones.find((zone) => zone.ability === "E")!.x).toBe(300);
    through(world, 40); expect(world.units[1].totals.damageTaken).toBeCloseTo(220);
  });
  it("R lands on all thirteen absolute pulse ticks and begins cooldown at channel completion", () => {
    const world = worldFor(vel.spec); cast(world, "R"); through(world, 83);
    expect(world.units[0].cooldownReady.R).toBe(Infinity); through(world, 84);
    expect(world.log.filter((entry) => entry.text.includes("Life Form Disintegration Ray deals")).map((entry) => entry.tick)).toEqual(Array.from({ length: 13 }, (_, index) => 12 + index * 6));
    expect(world.units[0].cooldownReady.R).toBe(84 + 80 * 30);
  });
  it("R's real pulse threats let ordinary defense AI shield a lethal next pulse", () => {
    const world = worldFor(vel.spec); world.units[1].hp = 50;
    world.units[1].spec = { ...world.units[1].spec, abilities: [{ key: "guard", name: "Guard", slot: "W", cooldown: 10, castTime: 0, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: 1 }] }] };
    cast(world, "R"); through(world, 8);
    expect(react(perceive(world, 1))).toEqual({ kind: "cast", ability: "guard" });
  });
  it("R recast ends pending pulses after its lock and spends neither mana nor a second cooldown", () => {
    const world = worldFor(vel.spec), initial = world.units[0].resource; cast(world, "R"); through(world, 35); cast(world, "Rend"); through(world, 84);
    expect(world.units[0].memory.rayPulses).toBe(4); expect(world.units[0].resource).toBe(initial - 100);
    expect(world.units[0].cooldownReady.R).toBe(36 + 80 * 30);
  });
  it("one spell shield blocks only the next ray pulse", () => {
    const world = worldFor(vel.spec); cast(world, "R"); through(world, 8); state(world, "spellShield"); through(world, 18);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(1050 / 13); expect(world.units[0].memory.rayPulses).toBe(2);
  });
});

describe("Ziggs pinned mechanics and finite ground objects", () => {
  it("reads all five source revisions, level-twenty passive, and explicit geometry options", () => { expect(zig.evidence.map((entry) => entry.revid)).toEqual(expect.arrayContaining([4005222, 4008669, 4008672, 4008673, 4008677])); expect(zig.options).toEqual({ firstBounceShare: 325 / 550, innerMineRadius: 100 }); const world = worldFor(zig.spec); startAttack(world, world.units[0]); through(world, 20); expect(world.units[1].totals.damageTaken).toBeCloseTo(115.9615 + 234); });
  it("Short Fuse eligibility survives flight and never crits", () => { const world = worldFor(zig.spec); world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100, critChance: 1 } }; startAttack(world, world.units[0]); through(world, 8); expect(world.units[0].memory.shortFuseReady).toBeGreaterThan(350); through(world, 20); expect(world.units[1].totals.damageTaken).toBeCloseTo(115.9615 * 2 + 234); });
  it("Short Fuse consumes on a blinded launch and does not deal damage", () => { const world = worldFor(zig.spec); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 }); startAttack(world, world.units[0]); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].memory.shortFuseReady).toBeGreaterThan(350); });
  it("an interrupted windup retains Short Fuse and initial casts refund at declaration", () => { const world = worldFor(zig.spec); startAttack(world, world.units[0]); cast(world, "Q"); expect(world.units[0].memory.shortFuseReady).toBe(0); world.units[0].memory.shortFuseReady = 360; world.units[0].action = undefined; cast(world, "E"); expect(world.units[0].memory.shortFuseReady).toBe(180); });
  it("Q crosses enemies in flight and detonates only at a landing", () => { const world = worldFor(zig.spec, 100); cast(world, "Q", { direction: 1, distance: 850 }); through(world, 12); expect(world.units[1].totals.damageTaken).toBe(0); world.units[1].x = 850; through(world, 23); expect(world.units[1].totals.damageTaken).toBeCloseTo(360); through(world, 70); expect(world.units[1].totals.damageTaken).toBeCloseTo(360); });
  it("Q lands three times with clamped first throw and cumulative bounce clocks", () => { const world = worldFor(zig.spec, 3000); cast(world, "Q", { direction: 1, distance: 1400 }); through(world, 22); expect(world.zones.find((zone) => zone.ability === "Q")!.x).toBe(850); through(world, 23); expect(world.zones.find((zone) => zone.ability === "Q")!.x).toBe(1175); through(world, 38); expect(world.zones.find((zone) => zone.ability === "Q")!.x).toBe(1400); through(world, 53); expect(world.zones.filter((zone) => zone.ability === "Q")).toHaveLength(0); expect(world.units[1].totals.damageTaken).toBe(0); });
  it("Q detection is narrower than its independent splash radius", () => { const world = worldFor(zig.spec, 1130); const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20 }, 850); cast(world, "Q", { direction: 1, distance: 850 }); through(world, 23); expect(world.units[1].totals.damageTaken).toBeCloseTo(360); expect(pet.hp).toBeCloseTo(640); });
  it("Q's projectile can be blocked without leaving a bomb", () => { const world = worldFor(zig.spec, 850); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 500, radius: 0, startTick: 0, endTick: 300 }); cast(world, "Q"); through(world, 60); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.filter((zone) => zone.ability === "Q")).toHaveLength(0); });
  it("W in-flight detonation pays one cost and lands before exploding", () => { const world = worldFor(zig.spec, 700), resource = world.units[0].resource; cast(world, "W"); through(world, 8); cast(world, "Wdetonate"); const cooldown = world.units[0].cooldownReady.W; through(world, 19); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 22); expect(world.units[1].totals.damageTaken).toBeCloseTo(260); expect(world.units[0].resource).toBe(resource - 80); expect(world.units[0].cooldownReady.W).toBe(cooldown); expect(world.units[1].forced?.perTick ?? 0).toBe(0); });
  it("W's four-second lifetime starts on landing", () => { const world = worldFor(zig.spec, 700); cast(world, "W"); through(world, 21); const satchel = world.zones.find((zone) => zone.ability === "W")!; expect(satchel.endTick - 20).toBe(120); through(world, 139); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 140); expect(world.units[1].totals.damageTaken).toBeCloseTo(260); });
  it("rival spell shield suppresses its packet but does not suppress Ziggs' self dash", () => { const world = worldFor(zig.spec, 100); state(world, "spellShield"); cast(world, "W", { direction: 1, distance: 100 }); through(world, 10); cast(world, "Wdetonate"); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].action?.kind).toBe("dash"); });
  it.each(["root", "ground"] as const)("%s suppresses self dash while preserving satchel enemy damage", (cc) => { const world = worldFor(zig.spec, 100); cast(world, "W", { direction: 1, distance: 100 }); through(world, 10); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 5 }, { scale: 1 }); cast(world, "Wdetonate"); expect(world.units[1].totals.damageTaken).toBeCloseTo(260); expect(world.units[0].action?.kind).not.toBe("dash"); });
  it("W self dash permits each other cast and preserves its original movement clock", () => { for (const key of ["Q", "E", "R"]) { const world = worldFor(zig.spec, 100); cast(world, "W", { direction: 1, distance: 100 }); through(world, 10); cast(world, "Wdetonate"); const dash = world.units[0].action; expect(dash?.kind).toBe("dash"); expect(canCast(world, world.units[0], ability(zig.spec, key))).toBe(true); cast(world, key); expect(world.units[0].action).toBe(dash); if (dash?.kind === "dash") expect(dash.resume?.kind).toBe("cast"); } });
  it("ordinary casts cannot overlap each other", () => { const world = worldFor(zig.spec); cast(world, "Q"); for (const key of ["W", "E", "R"]) expect(canCast(world, world.units[0], ability(zig.spec, key))).toBe(false); });
  it("E creates eleven finite mines with independent arming and never a periodic damage field", () => { const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26); const mines = world.zones.filter((zone) => zone.ability === "mineHit"); expect(mines).toHaveLength(11); expect(mines.every((zone) => zone.kind === "trap" && zone.startTick === 41 && zone.endTick === 341)).toBe(true); world.units[1].x = 1000; through(world, 40); expect(world.units[1].totals.damageTaken).toBe(0); through(world, 41); const damage = world.units[1].totals.damageTaken; expect(damage).toBeGreaterThan(0); expect(damage).toBeLessThan(1175); through(world, 70); expect(world.units[1].totals.damageTaken).toBe(damage); expect(world.zones.filter((zone) => zone.ability === "mineHit").length).toBeLessThan(11); });
  it("one shield blocks one mine and subsequent simultaneous mines have forty-percent damage", () => { const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26); const mines = world.zones.filter((zone) => zone.ability === "mineHit"); for (const mine of mines) { mine.x = 900; mine.radius = 200; } world.units[1].x = 900; state(world, "spellShield"); through(world, 41); expect(world.units[1].totals.damageTaken).toBeCloseTo(10 * 94); });
  it("mine clone branches retain separate trigger/falloff state", () => { const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26); const other = cloneWorld(world); world.units[1].x = 900; through(world, 42); expect(other.zones.filter((zone) => zone.ability === "mineHit")).toHaveLength(11); expect(other.units[1].totals.damageTaken).toBe(0); });
  it.each([[0, 49], [2700, 49], [5000, 80]])("R at %i lands on absolute tick %i from declaration", (distance, landing) => { const world = worldFor(zig.spec, distance); cast(world, "R", { direction: 1, distance }); through(world, landing - 1); expect(world.units[1].totals.damageTaken).toBe(0); through(world, landing); expect(world.units[1].totals.damageTaken).toBeCloseTo(800); });
  it.each([[250, 800], [251, 520], [590, 520], [591, 0]])("R rival offset %i uses source epicenter/outer geometry", (offset, expected) => { const world = worldFor(zig.spec, 1000); cast(world, "R"); through(world, 20); world.units[1].x = 1000 + offset; through(world, 49); expect(world.units[1].totals.damageTaken).toBeCloseTo(expected); });
  it("R cannot be blocked by a projectile wall but can be shielded at impact", () => { const world = worldFor(zig.spec, 1000); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 500, radius: 0, startTick: 0, endTick: 300 }); cast(world, "R"); through(world, 40); state(world, "spellShield"); through(world, 49); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false); });
  it("R gives separate inner and outer damage to enemy pets", () => {
    const world = worldFor(zig.spec, 1000);
    const template = { kind: "dummy", name: "Pet", hp: 2000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 };
    const inner = spawnPet(world, world.units[1], template, 1100), outer = spawnPet(world, world.units[1], template, 1400);
    cast(world, "R"); through(world, 49); expect(inner.hp).toBeCloseTo(1200); expect(outer.hp).toBeCloseTo(1480);
  });
  it("pets consume finite mines and keep independent falloff without hitting their champion", () => {
    const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26);
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Pet", hp: 3000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 900);
    through(world, 42); expect(pet.hp).toBeLessThan(3000); expect(world.units[1].totals.damageTaken).toBe(0);
    expect(world.zones.filter((zone) => zone.ability === "mineHit").length).toBeLessThan(11);
    expect(Number(pet.memory["ziggs:mineHit:0:1"])).toBeGreaterThan(1);
  });
  it("a champion-triggered mine splashes a neighboring pet using its own first-hit allowance", () => {
    const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26);
    const mines = world.zones.filter((zone) => zone.ability === "mineHit"); const chosen = mines[0]!;
    world.zones = world.zones.filter((zone) => zone.ability !== "mineHit" || zone.id === chosen.id); chosen.x = 900; chosen.radius = 100; chosen.memory!.transverse = 0;
    const pet = spawnPet(world, world.units[1], { kind: "dummy", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10 }, 900);
    world.units[1].x = 900; through(world, 41); expect(world.units[1].totals.damageTaken).toBeCloseTo(235); expect(pet.hp).toBeCloseTo(765);
  });
  it("Q retains the declaration location while casting from its displaced completion origin", () => {
    const world = worldFor(zig.spec, 850); cast(world, "Q"); world.units[0].x = 300; through(world, 9);
    const zone = world.zones.find((candidate) => candidate.ability === "Q")!;
    expect(zone.x).toBe(850); expect(zone.memory!.origin).toBe(300); expect(zone.memory!.throw).toBe(550);
  });
  it("an unshielded W pushes from the fixed satchel center after Ziggs crosses to the other side", () => {
    const world = worldFor(zig.spec, 700); cast(world, "W", { direction: 1, distance: 600 }); through(world, 20);
    world.units[0].x = 1000; cast(world, "Wdetonate"); const before = world.units[1].x; through(world, 23);
    expect(world.units[1].x).toBeGreaterThan(before);
  });
  it.each([["Q", 360], ["R", 800]] as const)("%s's actual cast and ground forecasts do not double its attached damage", (key, expected) => {
    const world = worldFor(zig.spec, 850); world.settings.reactionTime = 0; cast(world, key);
    expect(perceive(world, 1).threats.find((threat) => threat.source === key)!.damage).toBeCloseTo(expected);
    through(world, 20); expect(perceive(world, 1).threats.find((threat) => threat.source === key)!.damage).toBeCloseTo(expected);
  });
  it.each([["W", 260], ["E", 423]] as const)("%s's manual flight announces its complete unscaled threat", (key, expected) => {
    const world = worldFor(zig.spec, 850); world.settings.reactionTime = 0;
    world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, moveSpeed: 350 } };
    cast(world, key); through(world, 15);
    expect(perceive(world, 1).threats.find((threat) => threat.source === key)!.damage).toBeCloseTo(expected);
  });
  it.each(["spellShield", "parry", "untargetable"] as const)("Q's ground explosion checks %s on landing and never detonates again", (defense) => {
    const world = worldFor(zig.spec, 850); cast(world, "Q"); through(world, 20); state(world, defense); through(world, 60);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.some((zone) => zone.ability === "Q")).toBe(false);
  });
  it("E's finite eleven-mine ceiling is one full hit plus ten forty-percent hits", () => {
    const world = worldFor(zig.spec, 3000); cast(world, "E", { direction: 1, distance: 900 }); through(world, 26);
    for (const mine of world.zones.filter((zone) => zone.ability === "mineHit")) { mine.x = 900; mine.memory!.transverse = 0; }
    world.units[1].x = 900; through(world, 41);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(1175); expect(world.zones.some((zone) => zone.ability === "mineHit")).toBe(false);
    through(world, 200); expect(world.units[1].totals.damageTaken).toBeCloseTo(1175);
  });
  it.each([[35, 80, 235], [80, 35, 0]])("mine reach follows a rival's radius changing from %i to %i after arming", (before, after, expected) => {
    const world = worldFor(zig.spec, 3000); world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, radius: before } };
    cast(world, "E", { direction: 1, distance: 900 }); through(world, 26);
    const mine = world.zones.find((zone) => zone.ability === "mineHit")!;
    world.zones = world.zones.filter((zone) => zone.ability !== "mineHit" || zone.id === mine.id);
    mine.x = 900; mine.memory!.transverse = 200; through(world, 42);
    world.units[1].spec = { ...world.units[1].spec, base: { ...world.units[1].spec.base, radius: after } }; world.units[1].x = 900;
    through(world, 43); expect(world.units[1].totals.damageTaken).toBeCloseTo(expected);
    expect(world.zones.some((zone) => zone.id === mine.id)).toBe(expected === 0);
  });
  it("blocked W and E flights leave no armed ground objects", () => {
    for (const key of ["W", "E"]) {
      const world = worldFor(zig.spec, 850); world.zones.push({ id: 500, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 300 });
      cast(world, key); through(world, 160);
      expect(world.units[1].totals.damageTaken).toBe(0); expect(world.zones.some((zone) => zone.owner === 0)).toBe(false);
    }
  });
});

describe("Vel'Koz and Ziggs ordinary budgeted behavior", () => {
  const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
  it.each([["Velkoz", vel.spec], ["Ziggs", zig.spec]] as const)("%s stops extending a completed short trade and respects the ordinary clock", (_name, spec) => {
    const world = worldFor(spec); world.modes[0] = "trade"; world.units[0].memory.tradeDone = true;
    expect(spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    delete world.units[0].memory.tradeDone; world.units[0].memory.tradeStart = 0; world.tick = world.settings.tradeSeconds * 30 + 1;
    expect(spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 }); expect(world.units[0].memory.tradeDone).toBe(true);
  });
  it.each([["Velkoz", vel.spec], ["Ziggs", zig.spec]] as const)("%s's four initial spells require mana and its ordinary duel keeps resources finite", (_name, spec) => {
    const world = worldFor(spec); world.units[0].resource = 0;
    for (const key of ["Q", "W", "E", "R"]) expect(canCast(world, world.units[0], ability(spec, key))).toBe(false);
    world.units[0].resource = derive(world.units[0]).maxResource; world.modes[0] = "fight";
    while (!world.result && world.tick < 30 * 30) {
      step(world, [spec.behavior ?? defaultBehavior, standStill]);
      expect(Number.isFinite(world.units[0].resource)).toBe(true); expect(world.units[0].resource).toBeGreaterThanOrEqual(0);
      expect(world.units[0].resource).toBeLessThanOrEqual(derive(world.units[0]).maxResource);
    }
    for (const key of ["Q", "W", "E", "R"]) expect(world.log.some((entry) => entry.side === 0 && entry.text === `casts ${ability(spec, key).name}`)).toBe(true);
  });
  it.each([["Velkoz", vel.spec], ["Ziggs", zig.spec]] as const)("%s preserves fifteen-thousand-gold reflection and uses all four slots", (_name, spec) => {
    const opponent = kit("Darius").spec, forward = simulateMatchup(spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else { expect(other.score).toBeDefined(); expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12); }
    }
    expect(forward.scenarios.flatMap((scenario) => scenario.outcomes).every((outcome) => Number.isFinite(outcome.seconds) && outcome.hp.every(Number.isFinite))).toBe(true);
    const casts = forward.scenarios.flatMap((scenario) => scenario.outcomes.flatMap((outcome) => outcome.timeline.filter((entry) => entry.side === 0 && entry.text.startsWith("casts ")).map((entry) => entry.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text === `casts ${ability(spec, key).name}`)).toBe(true);
  }, 60000);
});
