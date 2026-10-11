/**
 * Runs simulated matchups for the app with a visitor's settings: both kits compiled with the
 * settings' kit options, the stat budget, the six scenarios. Pure (no DOM), so it runs in the
 * app's workers and in tests.
 */
import type { AbilityRecord } from "../../../engine/abilities";
import type { BudgetStat, StatPrices } from "../../../engine/budget";
import { type CompiledKit, compileKit } from "../../../engine/kits/compile";
import { derive } from "../../../engine/sim/derived";
import { simulateMatchup } from "../../../engine/sim/matchup";
import type { ScenarioId } from "../../../engine/sim/scenarios";
import type { FighterSpec } from "../../../engine/sim/spec";
import { type LogEntry, newUnit } from "../../../engine/sim/state";
import type { Champion } from "../../../engine/types";
import { KITS } from "../../../kits/champions/index";
import { type AppSettings, kitOptionsFor, scenarioOptions } from "../settings";

/** A champion's numbers in a fight: level-20 base stats plus what the stat budget bought. */
export interface StatLine {
  maxHp: number;
  ad: number;
  ap: number;
  attackSpeed: number;
  critChance: number;
  armor: number;
  mr: number;
  abilityHaste: number;
  lethality: number;
  /** Percentage armor penetration from every source, combined. */
  armorPen: number;
  magicPen: number;
  magicPenPercent: number;
  moveSpeed: number;
  attackRange: number;
}

export interface OutcomeSummary {
  win: [number, number];
  draw: number;
  timeout: number;
  escaped: number;
  disengaged: number;
  hp: [number, number];
  seconds: number;
  branches: number;
  /** The most likely branch, when the run was logged. */
  timeline: LogEntry[];
}

export interface ScenarioRun {
  id: ScenarioId;
  score: number | null;
  note: string;
  outcomes: OutcomeSummary[];
}

export interface MatchupRun {
  you: string;
  enemy: string;
  score: number;
  scenarios: ScenarioRun[];
  /** Gold each side spent on each stat. */
  spent: [Record<BudgetStat, number>, Record<BudgetStat, number>];
  stats: [StatLine, StatLine];
  assumptions: [string[], string[]];
}

/** What a run needs from the dataset. */
export interface SimSource {
  champion(id: string): Champion;
  records(id: string): Promise<AbilityRecord[]>;
  prices: StatPrices;
}

const compiled = new Map<string, CompiledKit>();

/** The champion's kit with the settings' options (compiled once per options). */
export async function kitFor(source: SimSource, id: string, settings: AppSettings): Promise<CompiledKit> {
  const options = kitOptionsFor(settings, id);
  const key = `${id}|${JSON.stringify(options)}`;
  const known = compiled.get(key);
  if (known) return known;
  const module = KITS[id];
  if (!module) throw new Error(`${id} has no simulator kit`);
  const kit = compileKit(source.champion(id), await source.records(id), module, options);
  compiled.set(key, kit);
  return kit;
}

function statLine(spec: FighterSpec): StatLine {
  const d = derive(newUnit(spec, 0, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.base.resource));
  const combined = (fractions: number[]) => 1 - fractions.reduce((left, p) => left * (1 - p), 1);
  return {
    maxHp: d.maxHp,
    ad: d.ad,
    ap: d.ap,
    attackSpeed: d.attackSpeed,
    critChance: d.critChance,
    armor: d.armor.base + d.armor.bonus,
    mr: d.mr.base + d.mr.bonus,
    abilityHaste: d.abilityHaste,
    lethality: d.lethality,
    armorPen: combined(d.armorPen),
    magicPen: d.magicPen,
    magicPenPercent: combined(d.magicPenPercent),
    moveSpeed: d.moveSpeed,
    attackRange: spec.attack.range,
  };
}

export async function runMatchup(source: SimSource, you: string, enemy: string, settings: AppSettings, log: boolean): Promise<MatchupRun> {
  const [a, b] = [await kitFor(source, you, settings), await kitFor(source, enemy, settings)];
  const options = scenarioOptions(settings);
  const result = simulateMatchup(a.spec, b.spec, settings.gold, source.prices, { ...options, settings: { ...options.settings, log } });
  return {
    you,
    enemy,
    score: result.score,
    scenarios: result.scenarios.map((s) => ({
      id: s.id,
      score: s.score ?? null,
      note: s.note,
      outcomes: s.outcomes.map((o) => ({
        win: o.win,
        draw: o.draw,
        timeout: o.timeout,
        escaped: o.escaped,
        disengaged: o.disengaged,
        hp: o.hp,
        seconds: o.seconds,
        branches: o.branches,
        timeline: o.timeline,
      })),
    })),
    spent: [result.builds[0].spent, result.builds[1].spent],
    stats: [statLine({ ...a.spec, bonus: result.builds[0].bonus }), statLine({ ...b.spec, bonus: result.builds[1].bonus })],
    assumptions: [a.assumptions, b.assumptions],
  };
}
