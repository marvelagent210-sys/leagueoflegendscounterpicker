/**
 * The runes' hints for the loadout search's quick estimate (RuneDefinition.budget): what each
 * adds to the estimate's objective for a synthetic fighter (tests/sim/kits.ts), and that a
 * rune whose trigger the kit lacks adds nothing.
 */
import { describe, expect, it } from "vitest";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { estimateAgainst, estimateSide } from "../../items/estimate";
import { withItems } from "../../pipeline/itemData";
import { findRune, runeParts } from "../../runes/equip";
import { RUNE_MODULES } from "../../runes/modules/index";
import { ability, fighter } from "../sim/kits";
import { catalog, items } from "./helpers";

/** What the rune adds to the estimate's objective for `spec` against `enemy`, both holding no items. */
function gain(spec: FighterSpec, rune: string, enemy: FighterSpec = fighter({ id: "enemy" })): number {
  return withItems(spec, [], items, (held) => {
    const { parts } = runeParts(held.form, { kind: "rune", entry: findRune(catalog, rune) }, catalog, RUNE_MODULES, { adaptiveType: "Physical" }, held);
    const against = estimateSide(enemy, [], 1);
    return estimateAgainst(spec, [parts], against) - estimateAgainst(spec, [], against);
  });
}

const cast = (key: "Q" | "W" | "E" | "R", onHit: Effect[], extra: Partial<Parameters<typeof ability>[0]> = {}) => ability({ key, slot: key, cooldown: 8, delivery: { kind: "target", range: 600 }, onHit, ...extra });
const magic = (amount: number): Effect => ({ type: "damage", damageType: "magic", amount: { base: amount } });
const plain = fighter();
const slower = fighter({ abilities: [cast("Q", [{ type: "cc", cc: "slow", duration: 2, strength: 0.3 }, magic(100)])] });
const stunner = fighter({ id: "enemy", abilities: [cast("Q", [{ type: "cc", cc: "stun", duration: 1 }, magic(100)])] });

describe("rune hints", () => {
  it("count the damage increases of Coup de Grace, Cut Down and Last Stand for the share of a fight they last", () => {
    for (const rune of ["Coup de Grace", "Cut Down", "Last Stand"]) expect(gain(plain, rune), rune).toBeGreaterThan(0);
    // Last Stand's average increase (5.7%) is above the other two's 3.2%.
    expect(gain(plain, "Last Stand")).toBeGreaterThan(gain(plain, "Cut Down"));
  });

  it("count Cheap Shot and Font of Life only for a kit that impairs, and Scorch only for one that deals ability damage", () => {
    for (const rune of ["Cheap Shot", "Font of Life", "Scorch"]) {
      expect(gain(plain, rune), rune).toBe(0);
      expect(gain(slower, rune), rune).toBeGreaterThan(0);
    }
  });

  it("count Sudden Impact only for a kit that dashes, and Axiom Arcanist only for a damaging ultimate", () => {
    const dasher = fighter({ abilities: [ability({ key: "E", slot: "E", cooldown: 8, delivery: { kind: "dash", direction: "toward", distance: 300, speed: 1200, hitRadius: 100 } })] });
    expect(gain(plain, "Sudden Impact")).toBe(0);
    expect(gain(dasher, "Sudden Impact")).toBeGreaterThan(0);
    expect(gain(slower, "Axiom Arcanist")).toBe(0);
    expect(gain(fighter({ abilities: [cast("R", [magic(300)], { cooldown: 60 })] }), "Axiom Arcanist")).toBeGreaterThan(0);
  });

  it("count Shield Bash only for a kit that shields itself", () => {
    const shielder = fighter({ abilities: [ability({ key: "W", slot: "W", cooldown: 8, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 200 }, duration: 2 }] })] });
    expect(gain(plain, "Shield Bash")).toBe(0);
    expect(gain(shielder, "Shield Bash")).toBeGreaterThan(0);
  });

  it("count Taste of Blood's and Second Wind's healing, Absolute Focus's adaptive force and Bone Plating's blocked damage", () => {
    for (const rune of ["Taste of Blood", "Second Wind", "Absolute Focus", "Bone Plating"]) expect(gain(plain, rune), rune).toBeGreaterThan(0);
  });

  it("count Unflinching only against an enemy whose kit has crowd control", () => {
    expect(gain(plain, "Unflinching")).toBe(0);
    expect(gain(plain, "Unflinching", stunner)).toBeGreaterThan(0);
  });

  it("leave out what the estimate doesn't value: movement speed and mana", () => {
    for (const rune of ["Celerity", "Relentless Hunter", "Approach Velocity", "Nimbus Cloak", "Presence of Mind"]) expect(gain(plain, rune), rune).toBe(0);
  });
});
