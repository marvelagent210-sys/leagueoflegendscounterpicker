/**
 * The duel simulator's results as committed files: a section on each kit page with the kit
 * the simulator fights with, a section on each counter page with the simulated ranking,
 * simulated.json, and reports/simulator.md.
 */
import { BUDGET_STATS, type BudgetStat } from "../engine/budget";
import type { CompiledKit } from "../engine/kits/compile";
import { SCENARIOS } from "../engine/sim/scenarios";
import type { AbilitySpec, AttackSpec, Delivery, Effect, Formula, StatRef } from "../engine/sim/spec";
import { type GoldenMatchup, MARGINS } from "../tests/golden/matchups";
import { wikiUrl } from "./reports";
import type { PairResult } from "./sim/pool";

const STAT_NAMES: Record<StatRef, string> = {
  AD: "AD",
  baseAD: "base AD",
  bonusAD: "bonus AD",
  AP: "AP",
  maxHP: "maximum health",
  bonusHP: "bonus health",
  currentHP: "current health",
  missingHP: "missing health",
  armor: "armor",
  bonusArmor: "bonus armor",
  MR: "magic resistance",
  bonusMR: "bonus magic resistance",
  attackSpeed: "attack speed",
  bonusAttackSpeed: "bonus attack speed",
  critChance: "crit chance",
  moveSpeed: "movement speed",
  bonusMoveSpeed: "bonus movement speed",
  lethality: "lethality",
  targetMoveSpeed: "target's movement speed",
  targetAD: "target's AD",
  targetBonusAD: "target's bonus AD",
  targetAP: "target's AP",
  targetMaxHP: "target's maximum health",
  targetCurrentHP: "target's current health",
  targetMissingHP: "target's missing health",
  targetBonusHP: "target's bonus health",
  targetArmor: "target's armor",
  targetBonusArmor: "target's bonus armor",
  targetMR: "target's magic resistance",
  targetBonusMR: "target's bonus magic resistance",
};

const SCENARIO_LABELS = ["You engage", "Enemy engages", "Brawl", "Short trade", "Spacing", "Escape"];

/** Up to three decimals, without trailing zeros. */
function num(value: number): string {
  return String(Math.round(value * 1000) / 1000);
}

function pct(fraction: number): string {
  return `${num(fraction * 100)}%`;
}

function signed(value: number): string {
  return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(2)}`;
}

function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function formulaText(formula: Formula): string {
  const parts: string[] = [];
  for (const [stat, ratio] of Object.entries(formula.ratios ?? {})) {
    if (ratio) parts.push(`${pct(ratio)} ${STAT_NAMES[stat as StatRef]}`);
  }
  for (const product of formula.products ?? []) {
    const [per, of, ...rest] = product.stats;
    if (per && of && rest.length === 0) parts.push(`${num(product.ratio * 1e4)}% of ${STAT_NAMES[of]} per 100 ${STAT_NAMES[per]}`);
    else parts.push(`${num(product.ratio)} × ${product.stats.map((s) => STAT_NAMES[s]).join(" × ")}`);
  }
  if (formula.base !== 0 || parts.length === 0) parts.unshift(num(formula.base));
  return parts.join(" + ");
}

export function effectText(effect: Effect): string {
  switch (effect.type) {
    case "damage": {
      const extras = [effect.canCrit ? "can crit" : "", effect.minimum ? `at least ${formulaText(effect.minimum)}` : "", effect.lifesteal ? `heals ${pct(effect.lifesteal)} of it` : ""].filter(Boolean);
      return `${formulaText(effect.amount)} ${effect.damageType} damage${effect.label ? ` (${effect.label})` : ""}${extras.length ? `, ${extras.join(", ")}` : ""}`;
    }
    case "cc":
      return `${effect.cc}${effect.strength ? ` ${pct(effect.strength)}` : ""} for ${num(effect.duration)} s`;
    case "displace": {
      const kind = effect.direction === "toward" ? "pull" : effect.distance === 0 ? "knock up" : "knock back";
      return `${kind}${effect.distance ? ` ${num(effect.distance)} units` : ""} over ${num(effect.duration)} s${effect.wallStun ? `, stun ${num(effect.wallStun)} s into a wall` : ""}`;
    }
    case "shield":
      return `${effect.shieldType && effect.shieldType !== "normal" ? `${effect.shieldType} ` : ""}shield of ${formulaText(effect.amount)} for ${num(effect.duration)} s`;
    case "heal":
      return `heal ${formulaText(effect.amount)}`;
    case "state":
      return `${effect.state}${effect.value !== undefined ? ` ${num(effect.value)}` : ""} for ${num(effect.duration)} s${effect.charges ? ` (${effect.charges} charge${effect.charges === 1 ? "" : "s"})` : ""}`;
    case "stat":
      return `${effect.stat} ${formulaText(effect.amount)} for ${num(effect.duration)} s`;
    case "dot":
      return `${formulaText(effect.total)} ${effect.damageType} damage over ${num(effect.duration)} s`;
    case "grievousWounds":
      return `Grievous Wounds for ${num(effect.duration)} s`;
    case "cleanse":
      return effect.types ? `cleanses ${effect.types.join(", ")}` : "cleanses crowd control";
    case "empower": {
      const extras = [effect.bonusRange ? `+${num(effect.bonusRange)} range` : "", effect.resetAttack ? "resets the attack timer" : "", effect.uncancellable ? "uncancellable" : ""].filter(Boolean);
      const hits = effect.onHit.map(effectText).join("; ");
      return `next ${effect.attacks} attack${effect.attacks === 1 ? "" : "s"} within ${num(effect.window)} s${hits ? `: ${hits}` : ""}${extras.length ? ` (${extras.join(", ")})` : ""}`;
    }
    case "execute":
      return `executes at ${formulaText(effect.threshold)} health or less`;
    case "resetAttack":
      return "resets the attack timer";
    case "projectileWall":
      return `projectile wall ${num(effect.distance)} units ahead for ${num(effect.duration)} s`;
    case "delayed":
      return `after ${num(effect.delay)} s: ${effect.effects.map(effectText).join("; ")}`;
    case "resource":
      return `${formulaText(effect.amount)} resource`;
    case "refund":
      return `cuts ${effect.ability}'s cooldown by ${effect.seconds !== undefined ? `${num(effect.seconds)} s` : pct(effect.fraction ?? 0)}`;
    case "mark":
      return `marks it "${effect.key}" for ${num(effect.duration)} s`;
    case "caster":
      return `to itself: ${effect.effects.map(effectText).join("; ")}`;
  }
}

export function deliveryText(delivery: Delivery): string {
  switch (delivery.kind) {
    case "self":
      return "self";
    case "aura":
      return `around itself, ${num(delivery.radius)} units`;
    case "target":
      return `targeted, ${num(delivery.range)} range${delivery.missileSpeed ? `, missile at ${num(delivery.missileSpeed)}/s` : ""}`;
    case "line":
      return `skillshot ${num(delivery.range)} long, ${num(delivery.width)} wide, ${delivery.speed ? `at ${num(delivery.speed)}/s` : "instant"}`;
    case "circle":
      return `circle of ${num(delivery.radius)} radius up to ${num(delivery.range)} away, lands after ${num(delivery.delay)} s`;
    case "dash":
      return `dash ${delivery.direction} ${delivery.minDistance !== undefined ? `${num(delivery.minDistance)}–` : ""}${num(delivery.distance)} units at ${num(delivery.speed)}/s${delivery.hitRadius !== undefined ? `, hits within ${num(delivery.hitRadius)}` : ""}${delivery.through ? ", through the enemy" : ""}`;
    case "blink":
      return `blink ${delivery.direction} ${num(delivery.distance)} units`;
    case "area": {
      const bands = (delivery.bands ?? []).map((b) => `${num(b.from)}–${num(b.to)}: ${b.onHit.map(effectText).join("; ")}`);
      return `area ${num(delivery.near)} to ${num(delivery.far)} units ahead${delivery.centered ? " (by the enemy's center)" : ""}, lands after ${num(delivery.delay)} s${bands.length ? `; bands ${bands.join(" / ")}` : ""}`;
    }
  }
}

function effectsText(effects: Effect[] | undefined): string {
  return effects && effects.length > 0 ? effects.map(effectText).join("; ") : "–";
}

function abilityRow(ability: AbilitySpec): string {
  const channel = ability.channel;
  const timing = [
    ability.chain ? `recast of ${ability.chain.root} within ${num(ability.chain.window)} s${ability.chain.delay ? `, after ${num(ability.chain.delay)} s` : ""}${ability.chain.auto ? ", automatic" : ""}` : "",
    channel ? `channel ${num(channel.duration)} s${channel.pulses ? `, ${formulaText(channel.pulses)} pulses` : channel.interval ? `, pulses every ${num(channel.interval)} s` : ""}` : "",
  ].filter(Boolean);
  const onHit = [effectsText(ability.onHit)];
  if (channel?.onTick) onHit.push(`each pulse: ${effectsText(channel.onTick)}`);
  if (channel?.onComplete) onHit.push(`at the end: ${effectsText(channel.onComplete)}`);
  const onSelf = [ability.onCastStart?.length ? `as the cast starts: ${effectsText(ability.onCastStart)}` : "", ability.onSelf?.length ? effectsText(ability.onSelf) : ""].filter(Boolean);
  const paidWith = ability.costType === "health" ? " health" : "";
  const cost = ability.cost === undefined ? "–" : `${typeof ability.cost === "number" ? num(ability.cost) : formulaText(ability.cost)}${paidWith}`;
  return `| ${ability.key} | ${cell(ability.name)} | ${num(ability.cooldown)} | ${num(ability.castTime)} | ${cell(cost)} | ${cell([deliveryText(ability.delivery), ...timing].join("; "))} | ${cell(onHit.filter((t) => t !== "–").join("; ") || "–")} | ${cell(onSelf.join("; ") || "–")} |`;
}

function attackLine(attack: AttackSpec): string {
  const parts = [`range ${num(attack.range)}`, attack.missileSpeed ? `missile at ${num(attack.missileSpeed)}/s` : "melee"];
  if (attack.onHit?.length) parts.push(`on hit: ${effectsText(attack.onHit)}`);
  return `- Basic attack: ${parts.join(", ")}.`;
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
    attackLine(spec.attack),
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
}

/**
 * Fills both directions from one simulation per pair: scores are antisymmetric, and seen from
 * the other side "you engage" and "the enemy engages" swap.
 */
export function simulatedMatrix(champions: string[], gold: number, pairs: Array<[string, string]>, results: PairResult[]): SimulatedMatrix {
  const scores = new Map(champions.map((id) => [id, new Map<string, Array<number | null>>()]));
  const spent = new Map(champions.map((id) => [id, new Map<string, Record<BudgetStat, number>>()]));
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
  });
  return { champions, gold, scores, spent };
}

/** simulated.json: one line per champion keeps the file small and its per-patch diffs readable. */
export function simulatedJson(dataset: string, patch: string, matrix: SimulatedMatrix): string {
  const round = (v: number | null) => (v === null ? null : Math.round(v * 1000) / 1000);
  const lines = matrix.champions.map((you) => {
    const row = Object.fromEntries([...(matrix.scores.get(you) ?? [])].sort(([a], [b]) => a.localeCompare(b)).map(([enemy, values]) => [enemy, values.map(round)]));
    return `    ${JSON.stringify(you)}: ${JSON.stringify(row)}`;
  });
  return `{\n  "dataset": ${JSON.stringify(dataset)},\n  "patch": ${JSON.stringify(patch)},\n  "confidence": "full",\n  "gold": ${matrix.gold},\n  "values": ${JSON.stringify(["score", ...SCENARIOS])},\n  "matchups": {\n${lines.join(",\n")}\n  }\n}\n`;
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
    `| # | Champion | Score | ${SCENARIO_LABELS.join(" | ")} |`,
    `|--:|---|--:|${SCENARIO_LABELS.map(() => "--:").join("|")}|`,
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
