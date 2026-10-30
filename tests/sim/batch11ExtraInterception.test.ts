import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { evaluate } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Missile, Side, World } from "../../engine/sim/state";
import { context, kit } from "../kits/helpers";
import { standStill } from "./helpers";

function arena(champion: "Fizz" | "Lissandra", side: Side = 0, front = true) {
  const original = kit(champion).spec, shield = kit("Braum").spec;
  const caster = { ...original, base: { ...original.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ap: 100 } };
  const braum = { ...shield, base: { ...shield.base, hp: 20000, hpRegen: 0, resourceRegen: 0, mr: 0, moveSpeed: 0 } };
  const world = createWorld({ fighters: side === 0 ? [caster, braum] : [braum, caster], distance: 0, modes: ["idle", "idle"], settings: { maxSeconds: 10, log: true } });
  const self = world.units[side], target = world.units[(1 - side) as Side];
  self.x = 0; target.x = side === 0 ? 500 : -500;
  startCast(world, target, target.spec.abilities.find(ability => ability.key === "E")!, { direction: front ? 1 : -1 });
  return { world, self, target };
}
function finishFlight(world: World, side: Side, key: string): Missile {
  const self = world.units[side], ability = self.spec.abilities.find(ability => ability.key === key)!;
  expect(canCast(world, self, ability)).toBe(true); startCast(world, self, ability);
  let flight: Missile | undefined;
  while (!flight?.ended && world.tick < 100 && !world.result) {
    step(world, [standStill, standStill]);
    flight ??= world.missiles.find(missile => missile.owner === side && missile.source === key);
  }
  expect(flight).toBeDefined(); expect(flight!.ended).toBe(true);
  return flight!;
}
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); };

// Unbreakable's source retains actual collision effects before destroying the
// original flight. Fizz's primary source allows one attached/ground eruption;
// Lissandra's grace exists only after a claw reaches and sinks at its endpoint.
describe("batch11 intercepted collision versus endpoint lifecycles", () => {
  it.each([0, 1] as const)("retains exactly one real Fizz shark when Braum intercepts from side %s", side => {
    const { world, self, target } = arena("Fizz", side);
    const pet = spawnPet(world, target, { kind: "fixture", name: "Actual nearby minion", targetClass: "minion", hp: 10000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 10 }, target.x);
    const flight = finishFlight(world, side, "R"), sharks = world.zones.filter(zone => zone.ability === "Rshark");
    expect(flight.intercepted).toBe(true); expect(sharks).toHaveLength(1); expect(sharks[0]!.memory?.attached).toBe(true); expect(sharks[0]!.x).toBe(target.x);
    expect(target.statuses.some(status => status.key === "fizzLure")).toBe(true);
    through(world, sharks[0]!.endTick);
    expect(10000 - pet.hp).toBeCloseTo(evaluate(context("Fizz").ability("R").formula("Guppy Damage"), self), 8);
    expect(world.log.filter(row => row.text.includes("shark") && row.text.includes("deals"))).toHaveLength(1);
  });
  it("retains one unattached ground eruption when the intercepted lure meets a spell shield", () => {
    const { world, target } = arena("Fizz");
    applyEffect(world, target, target, { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    const flight = finishFlight(world, 0, "R"), sharks = world.zones.filter(zone => zone.ability === "Rshark");
    expect(flight.intercepted).toBe(true); expect(sharks).toHaveLength(1); expect(sharks[0]!.memory?.attached).toBe(false); expect(sharks[0]!.x).toBe(flight.x);
    expect(target.statuses.some(status => status.key === "fizzLure" || status.key === "spellShield")).toBe(false);
    target.x = 1000; through(world, world.tick + 2); expect(sharks[0]!.x).toBe(flight.x);
  });
  it.each([0, 1] as const)("removes Lissandra's destroyed claw without an invented sinking field or teleport grace for side %s", side => {
    const { world, self } = arena("Lissandra", side), flight = finishFlight(world, side, "E");
    expect(flight.intercepted).toBe(true); expect(world.zones.some(zone => zone.ability === "E")).toBe(false);
    expect(self.memory.clawX).toBeUndefined(); expect(self.memory.clawUntil).toBeUndefined(); expect(self.memory.clawUnlock).toBeUndefined();
    expect(canCast(world, self, self.spec.abilities.find(ability => ability.key === "E2")!)).toBe(false);
  });
  it("preserves a rear-side claw's real endpoint and sourced late recast window", () => {
    const { world, self } = arena("Lissandra", 0, false), flight = finishFlight(world, 0, "E");
    expect(flight.intercepted).not.toBe(true); expect(self.memory.clawX).toBe(flight.x); expect(Number(self.memory.clawUntil)).toBeGreaterThan(world.tick);
    expect(world.zones.filter(zone => zone.ability === "E")).toHaveLength(1); expect(canCast(world, self, self.spec.abilities.find(ability => ability.key === "E2")!)).toBe(true);
  });
});
