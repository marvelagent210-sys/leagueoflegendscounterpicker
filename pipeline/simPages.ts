/**
 * The duel simulator's results as committed files: a section on each kit page with the kit
 * the simulator fights with, a section on each counter page with the simulated ranking,
 * simulated.json, and reports/simulator.md.
 */
import { BUDGET_STATS, type BudgetStat } from "../engine/budget";
import type { CompiledKit } from "../engine/kits/compile";
import { SCENARIO_LABELS, SCENARIOS } from "../engine/sim/scenarios";
import { attackText, describeAbility, num } from "../engine/sim/describe";
import type { AbilitySpec } from "../engine/sim/spec";
import { type GoldenMatchup, MARGINS } from "../tests/golden/matchups";
import { wikiUrl } from "../engine/abilityText";
import type { PairResult } from "./sim/pool";

function signed(value: number): string {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(2)}`;
}

function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function abilityRow(ability: AbilitySpec): string {
  const d = describeAbility(ability);
  return `| ${d.key} | ${cell(d.name)} | ${d.cooldown} | ${d.castTime} | ${cell(d.cost)} | ${cell(d.delivery)} | ${cell(d.onEnemy)} | ${cell(d.onSelf)} |`;
}

/** The kit page section: what the simulator fights with, its assumptions, and every wiki value it read. */
export function simulatorSection(kit: CompiledKit): string[] {
  const spec = kit.spec;
  // A value read twice (two numbers from one quote) is listed once.
  const seen = new Set<string>();
  const evidence = kit.evidence.filter((e) => {
    const key = `${e.ability}\u0000${e.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const lines = [
    "## Duel simulator kit (level 20, every ability at max rank)",
    "",
    `What the duel simulator fights with (\`kits/champions/${kit.champion}.ts\`): every number is read from the wiki's ability data above at level 20; what the wiki doesn't say is listed under assumptions. Ratios are fractions of the stat (60% AD is 0.6 × AD).`,
    "",
    `- Basic attack: ${attackText(spec.attack)}.`,
  ];
  if (spec.extraGold) lines.push(`- Stat budget: ${num(spec.extraGold)} gold more than the enemy's.`);
  const options = Object.entries(kit.options);
  if (options.length > 0) lines.push(`- Options: ${options.map(([key, value]) => `${key} = ${num(value)}`).join(", ")}.`);
  lines.push(
    "",
    "| Key | Ability | Cooldown (s) | Cast time (s) | Cost | Delivery | On the enemy | On itself |",
    "|---|---|--:|--:|---|---|---|---|",
    ...spec.abilities.map(abilityRow),
    "",
    "Effects marked by a mark or a role are completed by the kit's hooks (see the kit's source).",
    "",
    "### Assumptions",
    "",
    ...(kit.assumptions.length > 0 ? kit.assumptions.map((a) => `- ${a}`) : ["- None."]),
    "",
    `### Wiki values read (${evidence.length})`,
    "",
    "| Ability | Value | Revision |",
    "|---|---|---|",
    ...evidence.map((e) => `| ${cell(e.ability)} | ${cell(e.text)} | [${e.revid}](${wikiUrl(e.page, e.revid)}) |`),
    "",
  );
  return lines;
}

/** Every simulated matchup, both ways: scores for "you" against each enemy. */
export interface SimulatedMatrix {
  champions: string[];
  gold: number;
  /** you -> enemy -> [score, ...scenario scores in SCENARIOS order (null where it doesn't apply)] */
  scores: Map<string, Map<string, Array<number | null>>>;
  /** you -> enemy -> gold you spent on each stat */
  spent: Map<string, Map<string, Record<BudgetStat, number>>>;
  /** champion -> enemy -> the kit options it played, for champions whose kits have variants (Udyr's rank split, Heimerdinger's upgrade) */
  variants: Map<string, Map<string, Record<string, number>>>;
}

/**
 * Fills both directions from one simulation per pair: scores are antisymmetric, and seen from
 * the other side "you engage" and "the enemy engages" swap.
 */
export function simulatedMatrix(champions: string[], gold: number, pairs: Array<[string, string]>, results: PairResult[]): SimulatedMatrix {
  const scores = new Map(champions.map((id) => [id, new Map<string, Array<number | null>>()]));
  const spent = new Map(champions.map((id) => [id, new Map<string, Record<BudgetStat, number>>()]));
  const variants = new Map<string, Map<string, Record<string, number>>>();
  const negate = (v: number | null) => (v === null ? null : v === 0 ? 0 : -v);
  results.forEach((result, i) => {
    const pair = pairs[i];
    if (!pair || result.index !== i) throw new Error("Simulation results out of order");
    const [you, enemy] = pair;
    const [engage, engaged, ...rest] = result.scenarios;
    scores.get(you)?.set(enemy, [result.score, ...result.scenarios]);
    scores.get(enemy)?.set(you, [negate(result.score), negate(engaged ?? null), negate(engage ?? null), ...rest.map(negate)]);
    spent.get(you)?.set(enemy, result.spent[0]);
    spent.get(enemy)?.set(you, result.spent[1]);
    for (const variant of result.variants ?? []) {
      const [who, against] = variant.side === 0 ? [you, enemy] : [enemy, you];
      if (!variants.has(who)) variants.set(who, new Map());
      variants.get(who)?.set(against, variant.options);
    }
  });
  return { champions, gold, scores, spent, variants };
}

/** simulated.json: one line per champion keeps the file small and its per-patch diffs readable. */
export function simulatedJson(dataset: string, patch: string, matrix: SimulatedMatrix): string {
  const round = (v: number | null) => (v === null ? null : Math.round(v * 1000) / 1000);
  const lines = matrix.champions.map((you) => {
    const row = Object.fromEntries([...(matrix.scores.get(you) ?? [])].sort(([a], [b]) => a.localeCompare(b)).map(([enemy, values]) => [enemy, values.map(round)]));
    return `    ${JSON.stringify(you)}: ${JSON.stringify(row)}`;
  });
  // The kit options a champion played in each matchup, when its kit had a choice (Udyr's rank split).
  const variants = [...matrix.variants]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([who, byEnemy]) => `    ${JSON.stringify(who)}: ${JSON.stringify(Object.fromEntries([...byEnemy].sort(([a], [b]) => a.localeCompare(b))))}`);
  const variantsJson = variants.length > 0 ? `,\n  "variants": {\n${variants.join(",\n")}\n  }` : "";
  return `{\n  "dataset": ${JSON.stringify(dataset)},\n  "patch": ${JSON.stringify(patch)},\n  "confidence": "full",\n  "gold": ${matrix.gold},\n  "values": ${JSON.stringify(["score", ...SCENARIOS])},\n  "matchups": {\n${lines.join(",\n")}\n  }${variantsJson}\n}\n`;
}

function scoreCells(values: Array<number | null>): string {
  return values.map((v) => (v === null ? "–" : signed(v))).join(" | ");
}

/** The counter page section: champions with kits ranked by their simulated score against the enemy. */
export function simulatedCounterSection(enemy: string, matrix: SimulatedMatrix, names: Map<string, string>): string[] {
  const name = (id: string) => names.get(id) ?? id;
  const rows = matrix.champions
    .filter((you) => you !== enemy)
    .map((you) => ({ you, values: matrix.scores.get(you)?.get(enemy) ?? [] }))
    .sort((a, b) => (b.values[0] ?? 0) - (a.values[0] ?? 0) || a.you.localeCompare(b.you));
  return [
    "## Simulated duels (full confidence)",
    "",
    `The duel simulator played each of the ${rows.length} other champions with a simulator kit against ${name(enemy)}: both at level 20 with ${matrix.gold.toLocaleString("en-US")} gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (${name(enemy)} wins every time) to +1 (the champion does). Run \`npm run duel -- <champion> ${enemy} --log brawl\` to watch a fight.`,
    "",
    `| # | Champion | Score | ${SCENARIOS.map((s) => SCENARIO_LABELS[s]).join(" | ")} |`,
    `|--:|---|--:|${SCENARIOS.map(() => "--:").join("|")}|`,
    ...rows.map((row, i) => `| ${i + 1} | ${name(row.you)} | ${scoreCells(row.values)} |`),
    "",
  ];
}

/** reports/simulator.md: standings, the golden matchups, and what the stat budget buys. */
export function simulatorReport(patch: string, matrix: SimulatedMatrix, names: Map<string, string>, golden: GoldenMatchup[]): string {
  const name = (id: string) => names.get(id) ?? id;
  const average = (id: string) => {
    const values = [...(matrix.scores.get(id)?.values() ?? [])].map((v) => v[0] ?? 0);
    return values.reduce((a, b) => a + b, 0) / Math.max(1, values.length);
  };
  const standings = [...matrix.champions].sort((a, b) => average(b) - average(a));
  const pairs = (matrix.champions.length * (matrix.champions.length - 1)) / 2;
  const lines = [
    `# Duel simulator (patch ${patch})`,
    "",
    `Generated by \`npm run build:data\`: ${matrix.champions.length} champions with simulator kits, ${pairs} matchups, ${matrix.gold.toLocaleString("en-US")} gold of plain stats each. The counter pages show each enemy's simulated ranking; simulated.json has every score.`,
    "",
    "## Standings",
    "",
    "Each champion's average score against the others (−1 to +1).",
    "",
    "| # | Champion | Average |",
    "|--:|---|--:|",
    ...standings.map((id, i) => `| ${i + 1} | ${name(id)} | ${signed(average(id))} |`),
    "",
    "## Golden matchups",
    "",
    "Kit-driven expectations (tests/golden/matchups.ts), drafted for review. Margins: slight is any edge, clear at least +0.25, hard at least +0.5. Disputed ones are skipped by the tests until reviewed.",
    "",
    "| Expected | Margin | Score | Status | Why |",
    "|---|---|--:|---|---|",
  ];
  let held = 0;
  for (const matchup of golden) {
    const score = matrix.scores.get(matchup.winner)?.get(matchup.loser)?.[0];
    if (score === undefined || score === null) throw new Error(`Golden matchup ${matchup.winner} vs ${matchup.loser} has no simulator kits`);
    const holds = score > MARGINS[matchup.margin];
    if (holds) held++;
    const status = holds ? (matchup.disputed ? "holds (marked disputed)" : "holds") : matchup.disputed ? "disputed" : "**fails**";
    lines.push(`| ${name(matchup.winner)} beats ${name(matchup.loser)} | ${matchup.margin} | ${signed(score)} | ${status} | ${cell(matchup.why + (matchup.disputed ? ` *Disputed:* ${matchup.disputed}` : ""))} |`);
  }
  lines.push("", `${held} of ${golden.length} expectations hold.`, "", "## What the stat budget buys", "", "Average gold each champion spends on each stat across its matchups.", "");
  lines.push(`| Champion | ${BUDGET_STATS.join(" | ")} |`, `|---|${BUDGET_STATS.map(() => "--:").join("|")}|`);
  for (const id of matrix.champions) {
    const builds = [...(matrix.spent.get(id)?.values() ?? [])];
    const mean = (stat: BudgetStat) => builds.reduce((sum, b) => sum + (b[stat] ?? 0), 0) / Math.max(1, builds.length);
    lines.push(`| ${name(id)} | ${BUDGET_STATS.map((stat) => String(Math.round(mean(stat)))).join(" | ")} |`);
  }
  return `${lines.join("\n")}\n`;
}
