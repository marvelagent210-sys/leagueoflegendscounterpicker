/** Per-rune runtime factories; unsupported selections never become silent no-ops. */
import type { FighterSpec, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";
import { SECOND_WIND_ASSUMPTIONS, secondWindHooks } from "./secondWind";
import { thresholdEnemyHooks } from "./thresholdEffects";
import { ABSORB_LIFE_ASSUMPTIONS, absorbLifeHooks } from "./absorbLife";

export interface RuneEffectBuild {
  hooks?: KitHooks;
  enemyHooks?: KitHooks[];
  assumptions: string[];
}

export function buildRuneEffect(id: number, _form: FighterSpec, rules: CombatRuneRules): RuneEffectBuild {
  if (id === 9101) return { hooks: absorbLifeHooks(rules), assumptions: [...ABSORB_LIFE_ASSUMPTIONS] };
  if (id === 8444) return { hooks: secondWindHooks(rules), assumptions: [...SECOND_WIND_ASSUMPTIONS] };
  if (id === 8014 || id === 8017 || id === 8299) return {
    enemyHooks: thresholdEnemyHooks([id], rules),
    assumptions: [
      "Health thresholds are evaluated for each damage packet. A packet that first crosses a target-health threshold is not retroactively amplified.",
      "The reviewed V25.S1.3 changes allow eligible champion true damage to be amplified. Exact Smite and Ignite labels are excluded; summoner and jungle damage classifications remain outside these manual selections.",
      "These effects share the simulator's existing aggregate outgoing-damage bucket. V26.09's separate amplifier damage instances and their interactions with pre-modifier mechanics are not modeled by this first partial implementation.",
    ],
  };
  throw new Error(`Rune ${id} has no combat implementation`);
}
