import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { compileKit, type KitModule } from "../../engine/kits/compile";
import { heal } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { abilityOf, setForm } from "../../engine/sim/forms";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, FighterSpec } from "../../engine/sim/spec";
import { championData, records } from "../kits/helpers";
import { castWhenReady, duel, idle, lasting, ticksOf } from "./helpers";
import { ability, BASE, fighter, RANGED } from "./kits";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

/** A two-form fighter: "small" (ranged, 2000 health) and "big" (melee, 3000 health, its own Q). */
function twoForms(): FighterSpec {
  const small: FighterSpec = fighter({
    id: "small",
    attack: RANGED,
    abilities: [ability({ key: "Q", cooldown: 10, delivery: { kind: "line", range: 2000, width: 2000, speed: 500 }, onHit: [trueDamage(100)] })],
  });
  const big: FighterSpec = { ...fighter({ id: "big", base: { hp: 3000 }, abilities: [ability({ key: "QB", cooldownKey: "Q", delivery: { kind: "aura", radius: 400 }, onHit: [trueDamage(300)] })] }), name: "Big" };
  const forms = { small: { ...small, form: "small" }, big: { ...big, form: "big" } };
  forms.small.forms = forms;
  forms.big.forms = forms;
  return forms.small;
}

describe("forms", () => {
  it("switch base stats, attack and abilities, keeping the stat budget", () => {
    const world = createWorld({ fighters: [{ ...twoForms(), bonus: { hp: 500 } }, fighter()], distance: 300, modes: ["idle", "idle"] });
    const unit = world.units[0];
    expect(derive(unit).maxHp).toBe(2500);
    unit.hp = 1250;
    setForm(world, unit, "big", "gain");
    expect(unit.spec.form).toBe("big");
    expect(unit.spec.attack.ranged).toBe(false);
    expect(derive(unit).maxHp).toBe(3500);
    // Gaining 1,000 maximum health heals 1,000.
    expect(unit.hp).toBe(2250);
    setForm(world, unit, "small", "share");
    expect(unit.hp).toBeCloseTo(2500 * (2250 / 3500), 9);
    setForm(world, unit, "big", 999);
    expect(unit.hp).toBe(999);
    expect(() => setForm(world, unit, "huge")).toThrow(/no form/);
  });

  it("let what an old form started resolve with its own ability", () => {
    const world = createWorld({ fighters: [twoForms(), fighter()], distance: 1000, modes: ["idle", "idle"], settings: { log: true } });
    const [unit, enemy] = world.units;
    let cast = false;
    const castQ = () => {
      if (cast) return { kind: "move" as const, direction: 0 as const };
      cast = true;
      return { kind: "cast" as const, ability: "Q" };
    };
    step(world, [castQ, idle]);
    setForm(world, unit, "big");
    // The missile is Q's; the big form's abilities don't include it.
    expect(unit.spec.abilities.some((a) => a.key === "Q")).toBe(false);
    expect(abilityOf(unit, "Q")?.key).toBe("Q");
    for (let i = 0; i < 90 && enemy.hp === 2000; i++) step(world, [idle, idle]);
    expect(enemy.hp).toBe(1900);
    // The two versions share a cooldown.
    expect(unit.cooldownReady.Q).toBeGreaterThan(world.tick);
  });

  it("are all valued by the stat budget", () => {
    const one = damagePerSecond(fighter({ abilities: twoForms().abilities }), fighter());
    const both = damagePerSecond(twoForms(), fighter());
    // The big form's 300 true damage on the shared 10 s cooldown beats the small form's 100.
    expect(one.true).toBeCloseTo(10, 9);
    expect(both.true).toBeCloseTo(30, 9);
  });

  it("compile from a kit, with unique ability keys", () => {
    const module = (duplicate: boolean): KitModule => ({
      champion: "Gnar",
      build: () => ({
        abilities: [ability({ key: "Q", delivery: { kind: "self" } })],
        form: "Mini Gnar",
        forms: { "Mega Gnar": { championForm: "Mega Gnar", abilities: [ability({ key: duplicate ? "Q" : "QM", delivery: { kind: "self" } })] } },
      }),
    });
    const kit = compileKit(championData("Gnar"), records("Gnar"), module(false));
    const mega = kit.spec.forms?.["Mega Gnar"];
    expect(kit.spec.form).toBe("Mini Gnar");
    expect(mega?.forms).toBe(kit.spec.forms);
    expect(mega?.base.hp).toBeGreaterThan(kit.spec.base.hp);
    expect(mega?.abilities.map((a) => a.key)).toEqual(["QM"]);
    expect(() => compileKit(championData("Gnar"), records("Gnar"), module(true))).toThrow(/two abilities with key "Q"/);
  });
});

describe("surviving lethal damage", () => {
  const hits = fighter({ abilities: [ability({ key: "Q", cooldown: 1, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(1500)] })] });

  it("ends the fight without a hook", () => {
    const outcome = duel(hits, fighter(), { behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 5 } });
    expect(outcome.win[0]).toBe(1);
    expect(outcome.seconds).toBeCloseTo(1, 9);
  });

  it("lets a kit keep the unit alive once", () => {
    const tough = fighter({
      hooks: {
        onLethal(ctx) {
          if (ctx.memory.saved) return false;
          ctx.memory.saved = true;
          ctx.self.hp = 500;
          ctx.log("comes back");
          return true;
        },
      },
    });
    const outcome = duel(hits, tough, { behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 5 } });
    expect(ticksOf(outcome.timeline, 1, "comes back")).toEqual([30]);
    // Saved by the hook at 1 s, killed by the third hit at 2 s.
    expect(outcome.win[0]).toBe(1);
    expect(outcome.seconds).toBeCloseTo(2, 9);
  });

  it("saves the unit from executes too", () => {
    const executes = fighter({ abilities: [ability({ key: "Q", cooldown: 5, delivery: { kind: "aura", radius: 500 }, onHit: [{ type: "execute", threshold: { base: 5000 } }] })] });
    const tough = fighter({
      hooks: {
        onLethal(ctx) {
          if (ctx.memory.done) return false;
          ctx.memory.done = true;
          ctx.self.hp = 100;
          return true;
        },
      },
    });
    const outcome = duel(executes, tough, { behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 6 } });
    expect(outcome.win[0]).toBe(1);
    expect(outcome.seconds).toBeCloseTo(5, 9);
  });

  it("refuses a save without health", () => {
    const broken = fighter({ hooks: { onLethal: () => true } });
    expect(() => duel(hits, broken, { behaviors: [castWhenReady("Q"), idle], settings: { maxSeconds: 2 } })).toThrow(/without giving it health/);
  });
});

describe("noHealing", () => {
  it("stops healing and regeneration but not life steal", () => {
    const world = createWorld({ fighters: [fighter({ base: { hpRegen: 50 } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const unit = world.units[0];
    unit.statuses.push(lasting("state", "noHealing"));
    unit.hp = 1000;
    heal(world, unit, 100);
    heal(world, unit, 100, true);
    expect(unit.hp).toBe(1000);
    heal(world, unit, 100, false, true);
    expect(unit.hp).toBe(1100);
    expect(BASE.hp).toBe(2000);
  });
});
