/**
 * Prints every golden matchup (tests/golden/matchups.ts) with the simulator's counter score,
 * disputed ones included, for review.
 *
 * Usage: npm run golden [-- --dataset 16.20] [--markdown]
 */
import { DEFAULT_BUDGET } from "../../engine/budget";
import { simulateMatchup } from "../../engine/sim/matchup";
import { GOLDEN, MARGINS } from "../../tests/golden/matchups";
import { loadFighter } from "../kitData";
import { findChampion, loadSimData } from "../simData";

function option(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const data = await loadSimData(option(args, "--dataset"));
  const markdown = args.includes("--markdown");
  const specs = new Map<string, Awaited<ReturnType<typeof loadFighter>>["spec"]>();
  const spec = async (id: string) => {
    let found = specs.get(id);
    if (!found) {
      found = (await loadFighter(data.dataset, findChampion(data.champions, id))).spec;
      specs.set(id, found);
    }
    return found;
  };
  if (markdown) console.log("| Expected | Margin | Score | Status | Why |\n|---|---|---|---|---|");
  let held = 0;
  for (const matchup of GOLDEN) {
    const result = simulateMatchup(await spec(matchup.winner), await spec(matchup.loser), DEFAULT_BUDGET, data.prices);
    const holds = result.score > MARGINS[matchup.margin];
    if (holds) held++;
    const status = holds ? (matchup.disputed ? "holds (marked disputed)" : "holds") : matchup.disputed ? "disputed" : "FAILS";
    const score = `${result.score >= 0 ? "+" : ""}${result.score.toFixed(2)}`;
    if (markdown) console.log(`| ${matchup.winner} beats ${matchup.loser} | ${matchup.margin} | ${score} | ${status} | ${matchup.why}${matchup.disputed ? ` Disputed: ${matchup.disputed}` : ""} |`);
    else console.log(`${score.padStart(6)}  ${status.padEnd(24)} ${matchup.winner} beats ${matchup.loser} (${matchup.margin})`);
  }
  console.log(`\n${held} of ${GOLDEN.length} expectations hold at ${DEFAULT_BUDGET} gold (patch ${data.patch}).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
