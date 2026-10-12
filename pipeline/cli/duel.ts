/**
 * Runs the duel simulator on two champions at level 20 and prints each scenario's result,
 * the stat budget each side bought, and optionally a fight's timeline.
 *
 * Champions with a kit (kits/champions/) fight with their abilities; others with their
 * level-20 base stats and basic attacks only.
 *
 * Usage: npm run duel -- <your champion> <enemy> [--gold 15000] [--log <scenario>] [--sweep] [--dataset 16.20]
 */
import { BUDGET_STATS, DEFAULT_BUDGET, type StatPrices, allocateBoth } from "../../engine/budget";
import { SCENARIOS, type ScenarioId, runScenarios } from "../../engine/sim/scenarios";
import type { FightOutcome } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { bestMatchup } from "../../engine/sim/matchup";
import { loadFighter, loadVariants } from "../kitData";
import { findChampion, loadSimData } from "../simData";

function option(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function signed(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
}

function outcomeLine(outcome: FightOutcome): string {
  const parts = [`you win ${percent(outcome.win[0])}`, `enemy wins ${percent(outcome.win[1])}`];
  if (outcome.draw > 0.005) parts.push(`draw ${percent(outcome.draw)}`);
  if (outcome.timeout > 0.005) parts.push(`timeout ${percent(outcome.timeout)}`);
  if (outcome.escaped > 0.005) parts.push(`escaped ${percent(outcome.escaped)}`);
  if (outcome.disengaged > 0.005) parts.push(`disengaged ${percent(outcome.disengaged)}`);
  parts.push(`health left ${percent(outcome.hp[0])} vs ${percent(outcome.hp[1])}`, `${outcome.seconds.toFixed(1)} s`);
  if (outcome.branches > 1) parts.push(`${outcome.branches} branches`);
  return parts.join(", ");
}

function equip(you: FighterSpec, enemy: FighterSpec, gold: number, prices: StatPrices): [FighterSpec, FighterSpec, string[]] {
  const [a, b] = allocateBoth(you, enemy, gold, prices);
  const describe = (spent: Record<string, number>) =>
    BUDGET_STATS.filter((stat) => (spent[stat] ?? 0) > 0)
      .map((stat) => `${stat} ${Math.round(spent[stat] ?? 0)}`)
      .join(", ") || "nothing";
  return [{ ...you, bonus: a.bonus }, { ...enemy, bonus: b.bonus }, [describe(a.spent), describe(b.spent)]];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const valued = new Set(["--gold", "--log", "--dataset"]);
  const names = args.filter((arg, i) => !arg.startsWith("--") && !valued.has(args[i - 1] ?? ""));
  if (names.length !== 2) throw new Error("Usage: npm run duel -- <your champion> <enemy> [--gold 15000] [--log <scenario>] [--sweep]");
  const data = await loadSimData(option(args, "--dataset"));
  const you = findChampion(data.champions, names[0] as string);
  const enemy = findChampion(data.champions, names[1] as string);
  const gold = Number(option(args, "--gold") ?? DEFAULT_BUDGET);
  if (!Number.isFinite(gold) || gold < 0) throw new Error("--gold must be a number of gold, 0 or more");
  const logScenario = option(args, "--log") as ScenarioId | undefined;
  if (logScenario && !SCENARIOS.includes(logScenario)) throw new Error(`--log takes one of: ${SCENARIOS.join(", ")}`);

  const mine = await loadFighter(data.dataset, you);
  const theirs = await loadFighter(data.dataset, enemy);
  const describe = (name: string, kit: unknown) => (kit ? `${name} (kit)` : `${name} (base stats and basic attacks only: no kit yet)`);
  console.log(`${describe(you.name, mine.kit)} vs ${describe(enemy.name, theirs.kit)}, level 20, patch ${data.patch}`);
  // A kit with a choice to make (Udyr's rank split, Heimerdinger's upgrade) plays the option set best for it here.
  const [myVariants, theirVariants] = [await loadVariants(data.dataset, you), await loadVariants(data.dataset, enemy)];
  if (myVariants.length > 1 || theirVariants.length > 1) {
    const best = bestMatchup(myVariants, theirVariants, gold, data.prices);
    for (const { side, options } of best.variants ?? []) {
      const sideVariants = side === 0 ? myVariants : theirVariants;
      const chosen = sideVariants.find((v) => v.options === options);
      if (!chosen) continue;
      if (side === 0) mine.spec = chosen.spec;
      else theirs.spec = chosen.spec;
      const named = Object.entries(options)
        .map(([key, value]) => `${key} ${value}`)
        .join(", ");
      console.log(`${side === 0 ? you.name : enemy.name} plays ${named}: the best of ${sideVariants.length} option sets here`);
    }
  }
  const [a, b, bought] = equip(mine.spec, theirs.spec, gold, data.prices);
  console.log(`Stat budget ${gold} gold: ${you.name} buys ${bought[0]}; ${enemy.name} buys ${bought[1]}\n`);

  const result = runScenarios(a, b, { settings: { log: Boolean(logScenario) } });
  for (const scenario of result.scenarios) {
    const score = scenario.score === undefined ? "  n/a" : signed(scenario.score);
    console.log(`${score}  ${scenario.id} (${scenario.note})`);
    for (const outcome of scenario.outcomes) console.log(`        ${outcomeLine(outcome)}`);
  }
  console.log(`\nCounter score for ${you.name}: ${signed(result.score)} (-1 to +1)`);

  if (logScenario) {
    const outcome = result.scenarios.find((s) => s.id === logScenario)?.outcomes[0];
    console.log(`\nTimeline of ${logScenario} (most likely branch; side 0 is ${you.name}):`);
    for (const entry of outcome?.timeline ?? []) {
      console.log(`  ${(entry.tick / 30).toFixed(2).padStart(6)} s  ${entry.side === 0 ? you.name : enemy.name}: ${entry.text}`);
    }
  }

  if (args.includes("--sweep")) {
    console.log("\nCounter score by stat budget:");
    for (const amount of [0, 5000, 10000, 15000, 20000]) {
      const [x, y, spent] = equip(mine.spec, theirs.spec, amount, data.prices);
      const swept = runScenarios(x, y);
      console.log(`  ${String(amount).padStart(6)} gold: ${signed(swept.score)}   (${you.name}: ${spent[0]}; ${enemy.name}: ${spent[1]})`);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
