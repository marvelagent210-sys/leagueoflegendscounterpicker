/**
 * The six duel scenarios (PLAN.md section 6). Each starts at level 20 with full health and
 * resources and everything off cooldown, and scores the matchup from -1 (the enemy wins
 * every time) to 1 (you win every time) for side 0, "you".
 *
 * 1. You engage: all-in from your best engage range.
 * 2. The enemy engages: the same from its side.
 * 3. Brawl: both start in melee range.
 * 4. Short trade: each side walks in, spends its burst and backs off while the other hits
 *    back without chasing; the score is the health exchanged in your trade minus in theirs.
 * 5. Spacing: the side that out-ranges (or out-runs) the other kites it.
 * 6. Escape: each side runs from the other's all-in; the score is your chance to get away
 *    minus theirs.
 *
 * The weights blend the scenarios into one counter score; scenarios that don't apply
 * (spacing between equals) drop out and the rest are renormalized.
 */
import { type Behavior, traitsOf } from "./behavior";
import { canCast } from "./actions";
import { type FightOutcome, createWorld, fairFight } from "./simulate";
import type { AbilitySpec, FighterSpec } from "./spec";
import type { Mode, SimSettings } from "./state";

export const SCENARIOS = ["youEngage", "enemyEngages", "brawl", "shortTrade", "spacing", "escape"] as const;
export type ScenarioId = (typeof SCENARIOS)[number];

export const SCENARIO_LABELS: Record<ScenarioId, string> = {
  youEngage: "You engage",
  enemyEngages: "Enemy engages",
  brawl: "Brawl",
  shortTrade: "Short trade",
  spacing: "Spacing",
  escape: "Escape",
};

export const SCENARIO_WEIGHTS: Record<ScenarioId, number> = {
  youEngage: 0.25,
  enemyEngages: 0.25,
  brawl: 0.2,
  shortTrade: 0.15,
  spacing: 0.1,
  escape: 0.05,
};

/** Seconds a fleeing unit must survive (or the distance it must open) to escape. */
export const ESCAPE_SECONDS = 8;
/** Attack range or movement speed a side needs over the other to play the spacing game. */
export const SPACING_RANGE_EDGE = 100;
export const SPACING_SPEED_EDGE = 15;

export interface ScenarioResult {
  id: ScenarioId;
  /** -1 to 1 for "you" (side 0); undefined when the scenario doesn't apply. */
  score?: number;
  outcomes: FightOutcome[];
  note: string;
}

export interface MatchupResult {
  score: number;
  scenarios: ScenarioResult[];
}

export interface ScenarioOptions {
  settings?: Partial<SimSettings>;
  behaviors?: [Behavior | undefined, Behavior | undefined];
  weights?: Partial<Record<ScenarioId, number>>;
}

/** All-ins start at most this far apart, edge to edge: about a screen. */
export const MAX_ENGAGE_RANGE = 1300;

/** Areas that take longer than this to land can't open a fight: the enemy just walks off. */
const OPENER_MAX_DELAY = 1;

/** Edge-to-edge distance an ability reaches the enemy from, if it can open a fight. */
function openingReach(ability: AbilitySpec, self: FighterSpec, enemy: FighterSpec): number | undefined {
  const traits = traitsOf(ability);
  const d = ability.delivery;
  const radii = self.base.radius + enemy.base.radius;
  if (traits.engage && (d.kind === "dash" || d.kind === "blink")) return d.distance + (d.hitRadius ?? self.attack.range) - (d.hitCentered ? radii : 0);
  if (!traits.cc && !traits.damage) return undefined;
  switch (d.kind) {
    case "target":
      return d.edge ? d.range : d.range - radii;
    case "line":
      return d.range - self.base.radius;
    case "circle":
      return d.delay > OPENER_MAX_DELAY ? undefined : d.range + d.radius - self.base.radius - (d.centered ? enemy.base.radius : 0);
    case "field":
      if (d.attached) return (d.offset ?? 0) + d.radius - self.base.radius;
      return (d.delay ?? 0) > OPENER_MAX_DELAY ? undefined : d.range + d.radius - self.base.radius;
    case "area":
      return d.delay > OPENER_MAX_DELAY ? undefined : d.far - self.base.radius - (d.centered ? enemy.base.radius : 0);
    case "aura":
      return d.radius - radii;
    case "self":
      return ability.channel?.range !== undefined ? ability.channel.range - self.base.radius : undefined;
    default:
      return undefined;
  }
}

/** The distance a fighter starts its all-in from: its longest opener, or its attack range. */
export function engageRange(self: FighterSpec, enemy: FighterSpec, settings: Partial<SimSettings> = {}): number {
  let best = self.attack.range;
  const world = createWorld({ fighters: [self, enemy], distance: 0, modes: ["idle", "idle"], settings });
  for (const ability of self.abilities) {
    const reach = openingReach(ability, self, enemy);
    if (reach === undefined || reach <= best) continue;
    // Recasts, stack-gated abilities and unaffordable spells cannot open a full-resource fight.
    world.units[1].x = self.base.radius + enemy.base.radius + reach;
    if (canCast(world, world.units[0], ability, true)) best = reach;
  }
  return Math.max(0, Math.min(best, MAX_ENGAGE_RANGE));
}

/** Kills count fully; fights nobody wins count by the health each side has left. */
export function fightScore(outcome: FightOutcome): number {
  let unresolved = 0;
  for (const leaf of outcome.leaves) {
    if (leaf.winner === "none") unresolved += leaf.weight * (leaf.hp[0] - leaf.hp[1]) * 0.5;
  }
  // Branch arithmetic can sum to 1 + a floating-point epsilon. Keep the declared
  // score domain exact without changing probabilities or rounding interior scores.
  return Math.max(-1, Math.min(1, outcome.win[0] - outcome.win[1] + unresolved));
}

/** Health exchanged in a trade by its initiator, as shares of maximum health (deaths count fully). */
export function tradeValue(outcome: FightOutcome, trader: 0 | 1): number {
  const other = trader === 0 ? 1 : 0;
  return Math.max(-1, Math.min(1, outcome.hp[trader] - outcome.hp[other]));
}

/** Chance that the fleeing side survives. */
export function escapeChance(outcome: FightOutcome, fleeing: 0 | 1): number {
  const chaser = fleeing === 0 ? 1 : 0;
  return Math.max(0, Math.min(1, 1 - outcome.win[chaser] - outcome.draw));
}

export function runScenarios(you: FighterSpec, enemy: FighterSpec, options: ScenarioOptions = {}): MatchupResult {
  const weights = { ...SCENARIO_WEIGHTS, ...options.weights };
  for (const id of SCENARIOS) {
    if (!Number.isFinite(weights[id]) || weights[id] < 0) throw new RangeError(`Scenario weight for ${id} must be finite and nonnegative`);
  }
  const fighters: [FighterSpec, FighterSpec] = [you, enemy];
  const behaviors = options.behaviors;
  const run = (distance: number, modes: [Mode, Mode], settings: Partial<SimSettings> = {}): FightOutcome =>
    fairFight({ fighters, distance, modes, ...(behaviors ? { behaviors } : {}), settings: { ...options.settings, ...settings } });
  const results: ScenarioResult[] = [];
  const yourRange = engageRange(you, enemy, options.settings);
  const theirRange = engageRange(enemy, you, options.settings);

  const youEngage = run(yourRange, ["fight", "fight"]);
  results.push({ id: "youEngage", score: fightScore(youEngage), outcomes: [youEngage], note: `from ${Math.round(yourRange)} units` });

  const enemyEngages = run(theirRange, ["fight", "fight"]);
  results.push({ id: "enemyEngages", score: fightScore(enemyEngages), outcomes: [enemyEngages], note: `from ${Math.round(theirRange)} units` });

  const brawl = run(0, ["fight", "fight"]);
  results.push({ id: "brawl", score: fightScore(brawl), outcomes: [brawl], note: "from melee range" });

  const tradeSettings = { maxSeconds: 15 };
  const yourTrade = run(yourRange + 100, ["trade", "hold"], tradeSettings);
  const theirTrade = run(theirRange + 100, ["hold", "trade"], tradeSettings);
  results.push({
    id: "shortTrade",
    score: (tradeValue(yourTrade, 0) - tradeValue(theirTrade, 1)) / 2,
    outcomes: [yourTrade, theirTrade],
    note: `your trade nets ${pct(tradeValue(yourTrade, 0))}, theirs ${pct(tradeValue(theirTrade, 1))}`,
  });

  const rangeEdge = you.attack.range - enemy.attack.range;
  const speedEdge = you.base.moveSpeed - enemy.base.moveSpeed;
  const kiter = rangeEdge >= SPACING_RANGE_EDGE || (rangeEdge > -SPACING_RANGE_EDGE && speedEdge >= SPACING_SPEED_EDGE) ? 0 : rangeEdge <= -SPACING_RANGE_EDGE || speedEdge <= -SPACING_SPEED_EDGE ? 1 : undefined;
  if (kiter === undefined) {
    results.push({ id: "spacing", outcomes: [], note: "neither side out-ranges or out-runs the other" });
  } else {
    const kiting = kiter === 0 ? you : enemy;
    const modes: [Mode, Mode] = kiter === 0 ? ["kite", "fight"] : ["fight", "kite"];
    const spacing = run(kiting.attack.range, modes);
    results.push({ id: "spacing", score: fightScore(spacing), outcomes: [spacing], note: `${kiter === 0 ? "you kite" : "the enemy kites"}` });
  }

  const escapeSettings = { maxSeconds: ESCAPE_SECONDS };
  const youRun = run(enemy.attack.range, ["flee", "fight"], escapeSettings);
  const theyRun = run(you.attack.range, ["fight", "flee"], escapeSettings);
  results.push({
    id: "escape",
    score: escapeChance(youRun, 0) - escapeChance(theyRun, 1),
    outcomes: [youRun, theyRun],
    note: `you get away ${chance(escapeChance(youRun, 0))} of the time, they get away ${chance(escapeChance(theyRun, 1))}`,
  });

  let total = 0;
  let weighted = 0;
  for (const result of results) {
    if (result.score === undefined) continue;
    total += weights[result.id];
    weighted += weights[result.id] * result.score;
  }
  return { score: total > 0 ? Math.max(-1, Math.min(1, weighted / total)) : 0, scenarios: results };
}

function pct(value: number): string {
  return `${value >= 0 ? "+" : ""}${Math.round(value * 100)}%`;
}

function chance(value: number): string {
  return `${Math.round(value * 100)}%`;
}
