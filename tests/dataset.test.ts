/** Checks the committed dataset, including every form against the wiki's level-20 table. */
import { describe, expect, it } from "vitest";
import { isStatPath, withStat } from "../engine/statPaths";
import { TOP_LANE_MAX_LEVEL, statsAtLevel } from "../engine/stats";
import type { ChampionForm, FormStats } from "../engine/types";
import type { Level20Row } from "../pipeline/parse/level20Table";
import { champion, loadDataset } from "./helpers";

const { data, oracle } = await loadDataset();
const forms = data.champions.flatMap((c) => c.forms.map((form) => ({ champion: c, form })));
const oracleByName = new Map(oracle.rows.map((row) => [row.name, row]));

/** The wiki's own values: the form's stats with every game-file override undone. */
function wikiStats(form: ChampionForm): FormStats {
  let stats = form.stats;
  for (const override of form.overrides) {
    if (isStatPath(override.stat) && override.wiki !== null) stats = withStat(stats, override.stat, override.wiki);
  }
  return stats;
}

describe("champion roster", () => {
  it("has every live champion once", () => {
    expect(data.champions).toHaveLength(173);
    expect(new Set(data.champions.map((c) => c.id)).size).toBe(173);
    expect(new Set(data.champions.map((c) => c.key)).size).toBe(173);
  });

  it("includes the newest champions", () => {
    expect(champion(data, "Zaahen").name).toBe("Zaahen");
    expect(champion(data, "Locke").name).toBe("Locke");
  });

  it("keeps alternate forms with their champion, starting form first", () => {
    expect(champion(data, "Gnar").forms.map((f) => f.id)).toEqual(["gnar", "mega-gnar"]);
    expect(champion(data, "Kled").forms.map((f) => f.id)).toEqual(["kled-skaarl", "kled"]);
    expect(forms).toHaveLength(175);
  });
});

describe("level-20 stats against the wiki's table", () => {
  it("has a wiki row for every form and no extra rows", () => {
    expect(oracle.rows).toHaveLength(forms.length);
    for (const { form } of forms) expect(oracleByName.has(form.name), form.name).toBe(true);
  });

  const columns: ReadonlyArray<readonly [keyof Level20Row, (s: ReturnType<typeof statsAtLevel>) => number, number]> = [
    ["hp", (s) => s.hp, 1e-6],
    ["hpRegen", (s) => s.hpRegen, 1e-6],
    ["resource", (s) => s.resource, 1e-6],
    ["resourceRegen", (s) => s.resourceRegen, 1e-6],
    ["attackDamage", (s) => s.attackDamage, 1e-6],
    // The wiki rounds attack speed to 3 decimals.
    ["attackSpeed", (s) => s.attackSpeed, 5e-4 + 1e-9],
    ["armor", (s) => s.armor, 1e-6],
    ["magicResist", (s) => s.magicResist, 1e-6],
    ["attackRange", (s) => s.attackRange, 0],
    ["moveSpeed", (s) => s.moveSpeed, 0],
  ];

  /**
   * Columns where the wiki's table departs from the wiki's own data. Jhin's attack speed
   * ratio is 0 (bonus attack speed doesn't raise his attack speed; his passive turns it
   * into AD), but the table applies his growth as if the ratio were his base attack speed.
   */
  const tableQuirks: Record<string, Partial<Record<keyof Level20Row, (form: ChampionForm) => number>>> = {
    Jhin: {
      attackSpeed: (form) => {
        const { base, bonusPerLevel } = form.stats.attackSpeed;
        return base * (1 + (bonusPerLevel * 19.665) / 100);
      },
    },
  };

  it("keeps Jhin's attack speed fixed, unlike the wiki's table", () => {
    const jhin = champion(data, "Jhin").forms[0] as ChampionForm;
    expect(statsAtLevel(jhin.stats, TOP_LANE_MAX_LEVEL).attackSpeed).toBe(jhin.stats.attackSpeed.base);
    const quirk = tableQuirks.Jhin?.attackSpeed;
    if (!quirk) throw new Error("Jhin's table quirk is missing");
    // Fails if the wiki fixes its table, so the quirk can be removed.
    expect(oracleByName.get("Jhin")?.attackSpeed).toBeCloseTo(quirk(jhin), 3);
  });

  it.each(forms.map(({ form }) => [form.name, form] as const))("%s matches", (name, form) => {
    const row = oracleByName.get(name) as Level20Row;
    const stats = statsAtLevel(wikiStats(form), TOP_LANE_MAX_LEVEL);
    for (const [column, pick, tolerance] of columns) {
      const expected = row[column];
      if (expected === null || typeof expected === "string") continue;
      if (tableQuirks[name]?.[column]) continue;
      const scale = Math.max(1, Math.abs(expected));
      expect(Math.abs(pick(stats) - expected), `${name} ${column}: ${pick(stats)} vs ${expected}`).toBeLessThanOrEqual(
        tolerance * scale,
      );
    }
  });
});

describe("game-file overrides", () => {
  it("only touch known stats and land in the final values", () => {
    for (const { form } of forms) {
      for (const override of form.overrides) {
        if (override.stat === "windup.castTimeByLevel") {
          expect(form.stats.windup.castTimeByLevel).toEqual(override.game);
          continue;
        }
        expect(isStatPath(override.stat), override.stat).toBe(true);
        if (isStatPath(override.stat)) expect(withStat(form.stats, override.stat, override.game as number)).toEqual(form.stats);
      }
    }
  });

  it("use the game's attack damage growth for Vi", () => {
    const vi = champion(data, "Vi").forms[0];
    expect(vi?.stats.attackDamage.perLevel).toBe(3.9);
    expect(vi?.overrides).toContainEqual({ stat: "attackDamage.perLevel", wiki: 3.5, game: 3.9 });
  });
});

describe("attack timing", () => {
  it("gives every form a windup shorter than its attack", () => {
    for (const { form } of forms) {
      const stats = statsAtLevel(form.stats, TOP_LANE_MAX_LEVEL);
      expect(form.stats.windup.percent, form.name).toBeGreaterThan(0);
      expect(form.stats.windup.percent, form.name).toBeLessThan(1);
      expect(stats.attackWindup, form.name).toBeGreaterThan(0);
      expect(stats.attackWindup, form.name).toBeLessThan(stats.attackTime);
    }
  });
});
