import { describe, expect, it } from "vitest";
import type { Effect, Formula } from "../../engine/sim/spec";
import { createWorld, runWorld } from "../../engine/sim/simulate";
import { KITS } from "../../kits/champions/index";
import { RANGED, fighter } from "../sim/kits";
import { kit } from "./helpers";

/** Every formula in an effect list, nested ones included. */
function formulas(effects: Effect[] | undefined): Formula[] {
  const found: Formula[] = [];
  for (const e of effects ?? []) {
    if ("amount" in e && e.amount && typeof e.amount === "object") found.push(e.amount);
    if (e.type === "dot") found.push(e.total);
    if (e.type === "delayed") found.push(...formulas(e.effects));
    if (e.type === "empower") found.push(...formulas(e.onHit));
    if (e.type === "caster") found.push(...formulas(e.effects));
    if (e.type === "state") found.push(...formulas(e.effects));
  }
  return found;
}

function finite(formula: Formula): boolean {
  const numbers = [formula.base, ...Object.values(formula.ratios ?? {}), ...(formula.products ?? []).map((p) => p.ratio)];
  return numbers.every((n) => typeof n === "number" && Number.isFinite(n));
}

/** Sturdy enemies that hit back, so defensive abilities have something to answer, one of them out-ranging most kits. */
const dummy = fighter({ id: "dummy", base: { hp: 30000, armor: 100, mr: 100, ad: 300 } });
const archer = fighter({ id: "archer", base: { hp: 30000, armor: 100, mr: 100, ad: 300 }, attack: { ...RANGED, range: 650 } });
/** One that goes down, so finishers come up. */
const fragile = fighter({ id: "fragile", base: { hp: 4000, armor: 100, mr: 100, ad: 300 } });
const fights = [
  { enemy: dummy, mode: "fight", seconds: 30 },
  { enemy: archer, mode: "fight", seconds: 30 },
  { enemy: fragile, mode: "fight", seconds: 30 },
  { enemy: dummy, mode: "flee", seconds: 10 },
] as const;

describe.each(Object.keys(KITS).sort())("%s kit", (id) => {
  const compiled = kit(id);

  it("reads every number it needs from the wiki", () => {
    expect(compiled.evidence.length).toBeGreaterThan(5);
    for (const ability of compiled.spec.abilities) {
      expect(Number.isFinite(ability.cooldown), `${ability.key} cooldown`).toBe(true);
      expect(Number.isFinite(ability.castTime), `${ability.key} cast time`).toBe(true);
      const all = [...formulas(ability.onHit), ...formulas(ability.onSelf), ...formulas(ability.onCastStart), ...formulas(ability.channel?.onTick), ...formulas(ability.channel?.onComplete)];
      for (const formula of all) expect(finite(formula), `${ability.key} ${JSON.stringify(formula)}`).toBe(true);
    }
    for (const text of compiled.assumptions) expect(text.length).toBeGreaterThan(10);
  });

  it("fights: deals damage and uses several of its abilities", () => {
    const cast = new Set<string>();
    for (const fight of fights) {
      const world = createWorld({ fighters: [compiled.spec, fight.enemy], distance: 300, modes: [fight.mode, "fight"], settings: { log: true, maxSeconds: fight.seconds } });
      const outcome = runWorld(world);
      if (fight.mode === "fight") expect(outcome.damage[0], fight.enemy.id).toBeGreaterThan(0);
      for (const e of outcome.timeline) if (e.side === 0 && (e.text.startsWith("casts ") || e.text.endsWith(" fires"))) cast.add(e.text.replace(/^casts /, "").replace(/ fires$/, ""));
    }
    expect(cast.size, [...cast].join(", ")).toBeGreaterThanOrEqual(3);
  });
});

describe("wave-1 kits read the wiki at level 20", () => {
  const ability = (id: string, key: string) => {
    const found = kit(id).spec.abilities.find((a) => a.key === key);
    if (!found) throw new Error(`${id} ${key}`);
    return found;
  };

  it("Aatrox", () => {
    const q1 = ability("Aatrox", "Q1");
    expect(q1.cooldown).toBe(6);
    expect(q1.castTime).toBe(0.6);
    expect(q1.onHit).toEqual([{ type: "damage", damageType: "physical", amount: { base: 70, ratios: { AD: 0.9 } } }]);
    expect(q1.delivery).toMatchObject({ kind: "area", near: 0, far: 625 });
    const q3 = ability("Aatrox", "Q3");
    expect(q3.delivery).toMatchObject({ near: -100, far: 500, centered: true, bands: [{ from: 20, to: 380 }] });
    expect(ability("Aatrox", "E").delivery).toMatchObject({ kind: "dash", distance: 300, minDistance: 75, speed: 800 });
  });

  it("Dr. Mundo", () => {
    const q = ability("DrMundo", "Q");
    expect(q.cost).toBe(90);
    expect(q.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetCurrentHP: 0.3 } }, minimum: { base: 280 } });
    expect(ability("DrMundo", "W").cost).toEqual({ base: 0, ratios: { currentHP: 0.08 } });
  });

  it("Gwen", () => {
    expect(ability("Gwen", "Q").cooldown).toBe(3.5);
    expect(ability("Gwen", "R").delivery).toMatchObject({ kind: "line", range: 1250, speed: 1800 });
    expect(ability("Gwen", "R3").onHit?.filter((e) => e.type === "damage" && e.label === "Needlework")).toHaveLength(5);
  });

  it("Mordekaiser", () => {
    // 77 by level and 220 by rank, 50% more against an isolated enemy.
    expect(ability("Mordekaiser", "Q").onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 297 * 1.5, ratios: { bonusAD: 1.2 * 1.5, AP: 0.7 * 1.5 } } }]);
    expect(ability("Mordekaiser", "R").delivery).toEqual({ kind: "target", range: 650 });
  });

  it("Ornn", () => {
    expect(ability("Ornn", "E").delivery).toMatchObject({ kind: "dash", distance: 650, speed: 1600, through: true });
    expect(ability("Ornn", "W").channel).toMatchObject({ duration: 0.75, interval: 0.15 });
    expect(kit("Ornn").spec.extraGold).toBe(1000);
  });

  it("Sett", () => {
    expect(ability("Sett", "W").castTime).toBe(0.75);
    expect(ability("Sett", "R").onHit).toEqual([{ type: "cc", cc: "suppression", duration: 1.23 }]);
    expect(ability("Sett", "R").channel?.onComplete?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 400, ratios: { bonusAD: 1.2, targetBonusHP: 0.6 } } });
  });

  it("Shen", () => {
    expect(ability("Shen", "E").delivery).toMatchObject({ kind: "dash", distance: 600, minDistance: 300, through: true });
    expect(ability("Shen", "E").onHit?.[1]).toEqual({ type: "cc", cc: "taunt", duration: 1.5 });
  });

  it("Urgot", () => {
    expect(ability("Urgot", "E").delivery).toMatchObject({ kind: "dash", distance: 450 });
    expect(ability("Urgot", "R2").channel?.onComplete?.[0]?.type).toBe("execute");
    expect(kit("Urgot").spec.budget?.attacks).toBe(false);
  });

  it("Volibear", () => {
    expect(ability("Volibear", "W").delivery).toEqual({ kind: "target", range: 325 });
    expect(ability("Volibear", "E").delivery).toMatchObject({ kind: "circle", range: 1200, radius: 325, delay: 2 });
    expect(ability("Volibear", "R").castTime).toBe(1);
  });
});
