import { describe, expect, it } from "vitest";
import { progressDash, startCast } from "../../engine/sim/actions";
import { applyCC, applyEffect, immediateDisplace } from "../../engine/sim/combat";
import { advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { ActualMovement, Effect, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type Unit, type World } from "../../engine/sim/state";
import { lasting, idle } from "./helpers";
import { ability, fighter } from "./kits";

type Event = ActualMovement & { pet?: number; forcedEnd?: number; forcedAbility?: string; action?: string };
const knock = ability({ key: "knock", delivery: { kind: "self" } });
const push: Effect = { type: "displace", direction: "away", distance: 90, duration: 0.1 };
const petSpec: PetSpec = { kind: "actual", name: "Actual fixture", targetClass: "minion", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 30 };
const setup = (spells: FighterSpec["abilities"] = [], after?: (w: World, target: Unit, event: Event, pet?: Pet) => void) => {
 const events: Event[] = [], ownEnds: Array<{ interrupted: boolean; hasForce: boolean }> = [];
 const observer = fighter({ abilities: [knock], hooks: { onActualMovement(c) { const force = c.targetPet?.forced ?? c.target.forced; const e:Event = { ...c.movement, ...(c.targetPet ? { pet: c.targetPet.id } : {}), forcedEnd: force?.endTick, forcedAbility: force?.ability, action: c.target.action?.kind }; events.push(e); after?.(c.world, c.target, e, c.targetPet); } } });
 const mover = fighter({ abilities: spells, hooks: { onDashEnd(c) { ownEnds.push({ interrupted: c.interrupted, hasForce: !!c.self.forced }); } } });
 return { w: createWorld({ fighters: [mover, observer], distance: 300, modes: ["idle", "idle"], settings: { log: true } }), events, ownEnds };
};
const dash = ability({ key: "dash", delivery: { kind: "dash", direction: "away", distance: 600, speed: 600 } });
const startDash = (w: World) => { startCast(w, w.units[0], dash); w.tick = 1; progressDash(w, w.units[0]); };

describe("movement transition observations", () => {
 it("exposes an accepted new force to the interrupted dash end without inventing another sweep", () => {
  const { w, events, ownEnds } = setup([dash]); startDash(w); const x = w.units[0].x;
  applyEffect(w, w.units[1], w.units[0], push, { ability: knock, scale: 1 });
  expect(ownEnds).toEqual([{ interrupted: true, hasForce: false }]);
  const ended = events.filter(e => e.kind === "dash" && e.ended);
  expect(ended).toEqual([{ kind: "dash", from: x, to: x, endTick: 1, ended: true, ability: "dash", forcedEnd: 4, forcedAbility: "knock", action: undefined }]);
  expect(w.units[0].forced?.endTick).toBe(4);
 });
 it("keeps the interrupted endpoint snapshot when the body's own end hook moves it", () => {
  let canonical = false;
  const { w, events } = setup([dash], (world, target, e) => { if (e.ended) canonical = target === world.units[0]; });
  w.units[0].spec.hooks!.onDashEnd = c => { expect(c.self.forced).toBeUndefined(); c.self.x -= 75; };
  startDash(w); const x = w.units[0].x;
  applyEffect(w, w.units[1], w.units[0], push, { ability: knock, scale: 1 });
  expect(canonical).toBe(true); expect(w.units[0].x).toBe(x - 75);
  expect(events.find(e => e.ended)).toMatchObject({ from: x, to: x, forcedAbility: "knock" });
 });
 it.each(["ccImmune", "displacementImmune"] as const)("a denied %s replacement retains the old actual pet force without an end event", state => {
  const { w, events } = setup(), pet = spawnPet(w, w.units[0], petSpec, 0);
  pet.forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" };
  const old = pet.forced; pet.statuses = [lasting("state", state)]; w.tick = 5;
  expect(petEffects(w, w.units[1], pet, [push], "singleTarget", knock.key)).toBe(false);
  expect(events).toEqual([]); expect(pet.forced).toBe(old); expect(pet.forced).toEqual({ startTick: 0, endTick: 30, perTick: 10, ability: "old" });
 });
 it("Black Shield denial does not forge an end for a moving pet", () => {
  const { w, events } = setup(), pet = spawnPet(w, w.units[0], petSpec, 0);
  pet.forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" }; const old = pet.forced;
  pet.statuses = [{ kind: "shield", key: "shield", source: 0, startTick: 0, endTick: 100, value: 500, blackShield: true }]; w.tick = 5;
  expect(petEffects(w, w.units[1], pet, [push], "singleTarget", knock.key)).toBe(false);
  expect(events).toEqual([]); expect(pet.forced).toBe(old);
 });
 it("a zero-distance accepted pet control leaves the original movement identity intact", () => {
  const { w, events } = setup(), pet = spawnPet(w, w.units[0], petSpec, 0);
  pet.forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" }; const old = pet.forced;
  expect(petEffects(w, w.units[1], pet, [{ ...push, distance: 0 }], "singleTarget", knock.key)).toBe(true);
  expect(events).toEqual([]); expect(pet.forced).toBe(old);
 });
 it("a real pet replacement ends only the old force with new force already visible", () => {
  let canonical = false;
  const { w, events } = setup([], (world, target, e, body) => { if (e.ended) canonical = body === world.pets[0] && target.petId === body?.id && target.forced?.ability === "knock"; }), pet = spawnPet(w, w.units[0], petSpec, 0);
  pet.forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" }; w.tick = 5;
  expect(petEffects(w, w.units[1], pet, [push], "singleTarget", knock.key)).toBe(true);
  expect(events).toHaveLength(1); expect(events[0]).toMatchObject({ pet: pet.id, kind: "forced", from: 0, to: 0, ended: true, ability: "old", forcedAbility: "knock", forcedEnd: 8 });
  expect(pet.forced?.ability).toBe("knock"); expect(w.pets[0]).toBe(pet); expect(canonical).toBe(true);
 });
 it("same-body champion replacement reports the old end after installing the next force", () => {
  const { w, events } = setup(); w.units[0].forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" }; w.tick = 5;
  applyEffect(w, w.units[1], w.units[0], push, { ability: knock, scale: 1 });
  expect(events).toHaveLength(1); expect(events[0]).toMatchObject({ kind: "forced", from: 0, to: 0, ended: true, ability: "old", forcedEnd: 8, forcedAbility: "knock" });
 });
 it("does not flush a delayed observer stun between a dash and its accepted knockback", () => {
  let pending = true;
  const { w, events } = setup([dash], (world, target, e) => { if (pending && e.ended && !target.forced && target.action?.kind !== "dash") { pending = false; applyCC(world, world.units[1], target, "stun", 1); } });
  startDash(w); applyEffect(w, w.units[1], w.units[0], push, { ability: knock, scale: 1 });
  expect(pending).toBe(true); expect(w.units[0].statuses.some(s => s.key === "stun")).toBe(false);
  while (w.tick <= 4) step(w, [idle, idle]);
  expect(pending).toBe(false); expect(w.units[0].statuses.find(s => s.key === "stun")?.startTick).toBe(4);
  expect(events.filter(e => e.kind === "dash" && e.from !== e.to)).toHaveLength(1);
 });
 it("settles a completed landing packet before a genuine after-dash observer stun", () => {
  const landing = ability({ key: "landing", delivery: { kind: "dash", direction: "away", distance: 60, speed: 900, hitRadius: 2000 }, interruptible: {}, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
  const { w, events, ownEnds } = setup([landing], (world, target, e) => { if (e.kind === "dash" && e.ended) applyCC(world, world.units[1], target, "stun", 1); });
  startCast(w, w.units[0], landing); w.tick = 1; progressDash(w, w.units[0]); w.tick = 2; progressDash(w, w.units[0]);
  expect(w.units[1].totals.damageTaken).toBe(100); expect(w.units[0].statuses.some(s => s.key === "stun")).toBe(true);
  expect(events.filter(e => e.kind === "dash" && e.ended)).toHaveLength(1);
  expect(ownEnds).toEqual([{ interrupted: false, hasForce: false }]);
 });
 it("an actual mid-dash interrupt still prevents an uncompleted landing", () => {
  const landing = ability({ key: "landing", delivery: { kind: "dash", direction: "away", distance: 600, speed: 900, hitRadius: 2000 }, interruptible: {}, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
  const { w } = setup([landing], (world, target, e) => { if (e.kind === "dash" && !e.ended && e.from !== e.to) applyCC(world, world.units[1], target, "stun", 1); });
  startCast(w, w.units[0], landing); w.tick = 1; progressDash(w, w.units[0]);
  expect(w.units[0].action).toBeUndefined(); expect(w.units[1].totals.damageTaken).toBe(0);
 });
 it("instant displacement ends prior motion then reports its actual clamped sweep", () => {
  const { w, events } = setup([dash]); startDash(w); const x = w.units[0].x;
  w.units[0].forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" };
  expect(immediateDisplace(w, w.units[1], w.units[0], -75, "instant")).toBe(true);
  expect(w.units[0].forced).toBeUndefined(); expect(w.units[0].x).toBe(x - 75);
  expect(events.filter(e => e.ended).map(e => [e.kind, e.from, e.to])).toEqual([["dash", x, x], ["forced", x, x], ["forced", x, x - 75]]);
 });
 it("replacement observers and cloned force state stay branch-local", () => {
  const { w, events } = setup(), pet = spawnPet(w, w.units[0], petSpec, 0); pet.forced = { startTick: 0, endTick: 30, perTick: 10, ability: "old" };
  const branch = cloneWorld(w), copy = branch.pets[0]!; branch.tick = 5;
  petEffects(branch, branch.units[1], copy, [push], "singleTarget", knock.key);
  expect(copy.forced?.endTick).toBe(8); expect(pet.forced?.endTick).toBe(30); expect(pet.x).toBe(0);
  const count = events.length; w.tick = 1; advancePets(w); expect(events.length).toBe(count + 1);
 });
});
