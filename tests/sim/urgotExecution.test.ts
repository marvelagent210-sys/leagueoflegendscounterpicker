import { describe, expect, it } from "vitest";
import { completeCast } from "../../engine/sim/actions";
import { perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, dealDamage, isUntargetable } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { fighter } from "./kits";
import { idle, lasting } from "./helpers";

function setup(distance = 0): World {
  const w = createWorld({ fighters: [kit("Urgot").spec, fighter({ base: { hp: 4000, ad: 0, hpRegen: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 20, log: true } });
  w.units[0].memory.purgeReady = 1e9;
  return w;
}

function advance(w: World, count: number): void {
  for (let i = 0; i < count && !w.result; i++) step(w, [idle, idle]);
}

/** A drill that has connected; its normal physical damage precedes the leash. */
function drill(w: World, hp = 2000): void {
  const [self, enemy] = w.units;
  enemy.hp = hp;
  const r = self.spec.abilities.find((a) => a.key === "R")!;
  abilityHit(w, self, enemy, r, r.onHit!);
}

function mercy(w: World): void {
  const self = w.units[0];
  completeCast(w, self, self.spec.abilities.find((a) => a.key === "R2")!, w.tick);
}

function attach(w: World): void {
  drill(w, 500);
  advance(w, 1);
  expect(w.units[0].memory.mercyAttached).toBe(true);
}

// Mechanics and durations from committed Fear Beyond Death, revision 4015146.
describe("Urgot's Fear Beyond Death execution lifecycle", () => {
  it("launches homing chains automatically on a sub-threshold drill hit and starts its channel only on attachment", () => {
    const w = setup(500);
    drill(w, 500);
    expect(w.missiles.find((m) => m.source === "Rchains")).toMatchObject({ projectile: true, homing: true, perTick: 3200 / 30 });
    expect(w.units[0].action).toBeUndefined();
    advance(w, 6);
    const self = w.units[0];
    expect(self.action).toMatchObject({ kind: "channel", ability: "R2" });
    expect(Number(self.memory.mercyEnds) - self.action!.startTick).toBe(45);
  });

  it("exposes the chains as a targeted projectile immobilize to reactive defenders", () => {
    const w = setup(2000);
    drill(w, 500);
    advance(w, 8);
    expect(perceive(w, 1).threats.find((threat) => threat.source === "Rchains")).toMatchObject({ targeted: true, projectile: true, immobilizes: true });
  });

  it("arms an early recast without sending chains, then automatically fires on crossing below 25%", () => {
    const w = setup();
    drill(w);
    mercy(w);
    expect(w.units[0].memory.mercyArmed).toBe(true);
    expect(w.missiles.some((m) => m.source === "Rchains")).toBe(false);
    expect(w.units[0].action).toBeUndefined();
    w.units[1].hp = 999;
    advance(w, 1);
    expect(w.units[0].memory.mercyAttached).toBe(true);
  });

  it("automatically recasts at leash expiry under stasis when the target is below threshold", () => {
    const w = setup();
    drill(w);
    w.units[0].statuses.push(lasting("state", "stasis"));
    w.units[1].hp = 999;
    w.tick = Number(w.units[0].memory.leashUntil);
    advance(w, 1);
    expect(w.units[0].memory.mercyAttached).toBe(true);
    expect(w.units[0].action?.kind).toBe("channel");
  });

  it("holds the first cast cooldown until the effect ends, and starts it when an unexecuted leash expires", () => {
    const w = setup();
    drill(w);
    expect(w.units[0].cooldownReady.R).toBe(Number.POSITIVE_INFINITY);
    advance(w, 121);
    expect(w.units[0].memory.leashUntil).toBe(-1);
    expect(w.units[0].cooldownReady.R).toBe(120 + 70 * 30);
  });

  it("suppresses and protects a reeled target, preserves in-flight missiles, and prevents unrelated damage", () => {
    const w = setup();
    drill(w, 500);
    const incoming = { ...w.missiles[0]!, id: w.nextId++, x: -1000, perTick: 1, source: "R", onHit: [] };
    w.missiles.push(incoming);
    advance(w, 1);
    const [self, enemy] = w.units;
    expect(isUntargetable(enemy, self)).toBe(true);
    expect(enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression")).toBe(true);
    expect(w.missiles.some((m) => m.id === incoming.id)).toBe(true);
    const hp = enemy.hp;
    expect(dealDamage(w, self, enemy, 100, "true")).toBe(0);
    expect(enemy.hp).toBe(hp);
  });

  it("executes after attachment even if healing has raised the target above the original threshold", () => {
    const w = setup();
    attach(w);
    w.units[1].hp = 2000;
    const before = w.units[0].totals.damageDealt;
    advance(w, 46);
    expect(w.units[1].hp).toBe(0);
    expect(w.units[0].totals.damageDealt - before).toBe(2000);
  });

  it("cancels the execution and removes protection after suppression is cleansed, while completing Urgot's full channel", () => {
    const w = setup();
    attach(w);
    const [self, enemy] = w.units;
    const ends = Number(self.memory.mercyEnds);
    applyEffect(w, enemy, enemy, { type: "cleanse", types: ["suppression"] }, { scale: 1 });
    advance(w, 1);
    expect(isUntargetable(enemy, self)).toBe(false);
    expect(self.action).toMatchObject({ kind: "channel", endTick: ends });
    advance(w, 46);
    expect(enemy.hp).toBeGreaterThan(0);
    expect(self.action).toBeUndefined();
  });

  it("keeps Purge quiet throughout a failed channel instead of shooting immediately after the cleanse", () => {
    const w = setup();
    attach(w);
    const [self, enemy] = w.units;
    self.memory.purgeReady = 0;
    applyEffect(w, enemy, enemy, { type: "cleanse", types: ["suppression"] }, { scale: 1 });
    const before = enemy.hp;
    advance(w, 20);
    expect(enemy.hp).toBe(before);
  });

  it.each(["ccImmune", "untargetable", "zombie"])("does not attach to a %s target", (state) => {
    const w = setup();
    drill(w);
    w.units[1].hp = 500;
    mercy(w);
    if (state === "zombie") w.units[1].fallen = true;
    else w.units[1].statuses.push(lasting("state", state));
    advance(w, 3);
    expect(w.units[0].memory.mercyAttached).toBeFalsy();
    expect(w.units[1].hp).toBeGreaterThan(0);
    expect(w.units[1].statuses.some((s) => s.key === "suppression")).toBe(false);
  });

  it("allows a spell shield through the recast's chains without consuming it", () => {
    const w = setup();
    drill(w);
    w.units[1].hp = 500;
    w.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    mercy(w);
    advance(w, 1);
    expect(w.units[0].memory.mercyAttached).toBe(true);
    expect(w.units[1].statuses.find((s) => s.key === "spellShield")?.charges).toBe(1);
  });

  it("does not retry suppression after a one-shot immunity negates the chains", () => {
    const w = setup();
    drill(w);
    w.units[1].hp = 500;
    w.units[1].statuses.push(lasting("state", "ccNegate", 0, { charges: 1 }));
    mercy(w);
    advance(w, 47);
    expect(w.units[0].memory.mercyAttached).toBeFalsy();
    expect(w.units[1].hp).toBe(500);
    expect(w.units[1].statuses.some((s) => s.key === "ccNegate")).toBe(false);
  });

  it("loses recast chains to a projectile wall and releases the cooldown hold", () => {
    const w = setup(500);
    drill(w);
    w.units[1].hp = 500;
    mercy(w);
    w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 300, radius: 0, startTick: 0, endTick: 1000 });
    advance(w, 8);
    expect(w.units[0].memory.mercyAttached).toBeFalsy();
    expect(Number.isFinite(w.units[0].cooldownReady.R)).toBe(true);
    expect(w.units[1].hp).toBe(500);
  });

  it("waits out displacement immunity after attachment before beginning the 1.5-second channel", () => {
    const w = setup();
    w.units[1].statuses.push(lasting("state", "displacementImmune", 0, { endTick: 5 }));
    drill(w, 500);
    advance(w, 4);
    expect(w.units[0].memory.mercyAttached).toBe(true);
    expect(w.units[0].action).toBeUndefined();
    advance(w, 2);
    expect(w.units[0].action).toMatchObject({ kind: "channel", startTick: 5, endTick: 50 });
  });

  it("abandons attachment if displacement immunity lasts ten seconds", () => {
    const w = setup();
    w.units[1].statuses.push(lasting("state", "displacementImmune"));
    attach(w);
    advance(w, 300);
    expect(w.units[0].memory.mercyAttached).toBe(false);
    expect(w.units[0].action).toBeUndefined();
    expect(isUntargetable(w.units[1], w.units[0])).toBe(false);
  });

  it("protects the target but defers pulling until Urgot's existing cast completes", () => {
    const w = setup();
    drill(w, 500);
    w.units[0].action = { kind: "cast", ability: "Q", startTick: 0, endTick: 6 };
    advance(w, 4);
    expect(w.units[0].action).toMatchObject({ kind: "cast", ability: "Q" });
    expect(w.units[0].memory.mercyAttached).toBe(true);
    expect(isUntargetable(w.units[1], w.units[0])).toBe(true);
    advance(w, 4);
    expect(w.units[0].action).toMatchObject({ kind: "channel", ability: "R2", startTick: 7, endTick: 52 });
  });

  it("does not attach after Urgot dies while the chains are in transit", () => {
    const w = setup();
    drill(w, 500);
    w.units[0].hp = 0;
    advance(w, 1);
    expect(w.units[0].memory.mercyAttached).toBe(false);
    expect(w.units[1].statuses.some((s) => s.key === "suppression")).toBe(false);
  });

  it("does not execute through independent invulnerability and respects Undying Rage's special one-health floor", () => {
    for (const state of ["invulnerable", "minimumHealth"] as const) {
      const w = setup();
      w.units[1].statuses.push(lasting("state", state, state === "minimumHealth" ? 50 : 0));
      attach(w);
      const hp = w.units[1].hp;
      advance(w, 46);
      expect(w.units[1].hp, state).toBe(state === "invulnerable" ? hp : 1);
    }
  });

  it("fails execution when the target gains independent untargetability during the pull", () => {
    const w = setup();
    attach(w);
    w.units[1].statuses.push(lasting("state", "untargetable"));
    advance(w, 46);
    expect(w.units[1].hp).toBeGreaterThan(0);
  });
});
