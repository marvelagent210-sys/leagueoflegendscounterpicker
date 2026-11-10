import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { grantPermanentBonusHealth } from "../../engine/sim/healthGain";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { fighter } from "./kits";
import { lasting } from "./helpers";

const arena = (spec: FighterSpec = fighter()): World => createWorld({
  fighters: [spec, fighter()], distance: 0, modes: ["idle", "idle"], settings: { log: true },
});
const grant = (world: World) => grantPermanentBonusHealth(hookContext(world, world.units[0]), 85, "fixture:health", "Direct health award");

describe("permanent direct bonus-health awards", () => {
  it("adds current health directly without healing modifiers or healing totals", () => {
    const world = arena(), self = world.units[0], maximum = derive(self).maxHp;
    self.hp = 100;
    self.statuses.push(lasting("grievousWounds", "fixture", 0), lasting("stat", "healingIncrease", 1), lasting("state", "noHealing", 0));
    grant(world);
    expect(derive(self).maxHp).toBe(maximum + 85);
    expect(self.hp).toBe(185);
    expect(self.totals.healing).toBe(0);
    expect(self.statuses.find(status => status.memoKey === "fixture:health")).toMatchObject({ key: "health", value: 85, persistThroughDeath: true });
    self.hp -= 50;
    grant(world);
    expect(self.hp).toBe(135);
    expect(self.statuses.filter(status => status.memoKey === "fixture:health")).toHaveLength(1);
  });

  it.each(["dead", "zero", "fallen", "deathDefied", "resurrection"] as const)
  ("keeps permanent stats without restoring current health for a %s owner", (state) => {
    const world = arena(), self = world.units[0], maximum = derive(self).maxHp;
    if (state === "dead") { self.alive = false; self.hp = 0; }
    else if (state === "zero") self.hp = 0;
    else if (state === "fallen") { self.fallen = true; self.hp = 50; }
    else if (state === "deathDefied") beginDeathDefied(world, self, { duration: 7 });
    else beginResurrection(world, self, { duration: 6 });
    const hp = self.hp, alive = self.alive;
    grant(world);
    expect(derive(self).maxHp).toBe(maximum + 85);
    expect(self.hp).toBe(hp);
    expect(self.alive).toBe(alive);
    expect(self.totals.healing).toBe(0);
  });

  it("keeps each copied branch's award and deduplication independent", () => {
    const original = arena(), branch = cloneWorld(original);
    original.units[0].hp = branch.units[0].hp = 100;
    grant(branch);
    expect(branch.units[0].hp).toBe(185);
    expect(original.units[0].hp).toBe(100);
    grant(original);
    const after = cloneWorld(original);
    after.units[0].hp -= 10;
    grant(after);
    expect(after.units[0].hp).toBe(175);
    expect(original.units[0].hp).toBe(185);
  });

  it("does not grant the owner's award to a clone contact view", () => {
    const world = arena(), owner = world.units[0];
    const clone = spawnPet(world, owner, { kind: "fixture", name: "Clone", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity, unitClass: "clone", targetClass: "champion" }, 0);
    const view = petFormulaTarget(clone, owner, world.tick);
    grantPermanentBonusHealth(hookContext(world, view), 85, "fixture:health", "Direct health award");
    expect(view.statuses.some(status => status.memoKey === "fixture:health")).toBe(false);
    expect(owner.statuses.some(status => status.memoKey === "fixture:health")).toBe(false);
    expect(clone.hp).toBe(100);
  });
});
