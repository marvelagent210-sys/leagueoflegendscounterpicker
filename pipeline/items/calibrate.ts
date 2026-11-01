/**
 * Each kit in the build search's quick estimate, calibrated to a fight of its own (PLAN.md §13,
 * M8). The stat budget's reference counts a kit's attacks, casts and damage from its spec: every
 * attack at its attack speed, every ability once per cooldown. Fights play them out, and kits
 * differ: Ahri casts about half as often as the reference counts, and Darius deals half again its
 * damage. Item hints follow the same counts (Spellblade after casts, Terminus's stacks after
 * attacks), so a kit counted wrong counts its items wrong too, and an item's damage is worth more
 * to a kit the reference counts weaker than it fights.
 *
 * One fight per side settles it: the champion, with the stat budget's plain stats, against the
 * enemy, idle and coming back to full health instead of dying, for the reference's ten seconds,
 * from three distances. Its damage, its basic attacks and its casts, against the reference's,
 * give the shares the estimate scales its terms by (BudgetHints.calibration). The fight has no
 * items: the shares are the kit's.
 */
import { SUSTAIN_WINDOW, type StatPrices, allocateBoth, budgetCasts, budgetDamageParts, budgetUnit } from "../../engine/budget";
import { toSeconds } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import { createWorld, runWorld } from "../../engine/sim/simulate";
import type { BudgetCalibration, FighterSpec, KitHooks } from "../../engine/sim/spec";
import { composeHooks } from "../../items/equip";

/** Gold of plain stats both sides hold in the calibration fight: about what the five items beside the one being chosen give. */
export const CALIBRATION_GOLD = 12000;

/** Shares are kept within these: a kit that the reference counts very wrong is still ranked by its own stats. */
const LOWEST = 0.25;
const HIGHEST = 4;

const DISTANCES = [0, 150, 300];

const clamp = (share: number) => Math.min(HIGHEST, Math.max(LOWEST, share));

/** What the fights measured, and the shares they give. */
export interface CalibrationFight extends BudgetCalibration {
  /** Per second, averaged over the fights: damage after resistances, basic attacks that hit, casts. */
  fought: { damage: number; attacks: number; casts: number };
  /** The same by the budget's reference. */
  reference: { damage: number; attacks: number; casts: number };
}

/**
 * The kit's shares of the reference's damage, basic attacks and casts, against the enemy. One
 * damage share for all of it: fights log an empowered attack (Crippling Strike) as an attack
 * where the reference counts its bonus as the ability's.
 */
export function calibrate(spec: FighterSpec, enemy: FighterSpec, prices: StatPrices, gold = CALIBRATION_GOLD): CalibrationFight {
  const [mine, theirs] = allocateBoth(spec, enemy, gold, prices, 2);
  const you: FighterSpec = { ...spec, bonus: mine.bonus };
  const them: FighterSpec = { ...enemy, bonus: theirs.bonus };
  const revive: KitHooks = {
    onLethal(ctx) {
      ctx.self.hp = derive(ctx.self).maxHp;
      return true;
    },
  };
  const target: FighterSpec = { ...them, hooks: composeHooks(them.hooks, [revive], [], false)! };
  let damage = 0;
  let attacks = 0;
  let casts = 0;
  const schedule: Array<Array<{ at: number; ability: string }>> = [];
  for (const distance of DISTANCES) {
    const world = createWorld({ fighters: [you, target], distance, modes: ["fight", "idle"], settings: { maxSeconds: SUSTAIN_WINDOW, maxBranches: 1, log: true } });
    const cast: Array<{ at: number; ability: string }> = [];
    for (const entry of runWorld(world, [undefined, () => undefined]).timeline) {
      if (entry.side !== 0) continue;
      const hit = /^(.*?) deals (\d+)/.exec(entry.text);
      if (hit) {
        damage += Number(hit[2]);
        if (hit[1] === "attack") attacks++;
      } else if (entry.text.startsWith("casts ")) {
        casts++;
        cast.push({ at: toSeconds(entry.tick), ability: entry.text.slice("casts ".length) });
      }
    }
    schedule.push(cast);
  }
  const per = DISTANCES.length * SUSTAIN_WINDOW;
  const fought = { damage: damage / per, attacks: attacks / per, casts: casts / per };
  const self = budgetUnit(you, 0);
  const foe = budgetUnit(them, 1);
  const parts = budgetDamageParts(self, foe);
  const reference = { damage: parts.attacks + parts.abilities + parts.hooks, attacks: you.budget?.attacks === false ? 0 : derive(self).attackSpeed, casts: budgetCasts(self).casts };
  const share = (a: number, b: number) => (b > 1e-9 && a > 1e-9 ? clamp(a / b) : 1);
  return { damage: share(fought.damage, reference.damage), attacks: share(fought.attacks, reference.attacks), casts: share(fought.casts, reference.casts), schedule, fought, reference };
}

/** The spec with its calibration, for the estimate (fights don't read it). */
export function calibrated(spec: FighterSpec, calibration: BudgetCalibration): FighterSpec {
  const { damage, attacks, casts, schedule } = calibration;
  return { ...spec, budget: { ...spec.budget, calibration: { damage, attacks, casts, ...(schedule ? { schedule } : {}) } } };
}
