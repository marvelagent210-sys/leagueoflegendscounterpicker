/**
 * Prints the interaction ledger of a matchup: every way each kit counters the other, with
 * timing, conditions and impact.
 *
 * Usage: npm run matchup -- <your champion> <enemy> [--markdown] [--dataset 16.20]
 */
import { buildLedger } from "../../engine/ledger/index";
import { matchupMarkdown, matchupText } from "../ledgerPages";
import { findKit, loadLedgerData } from "../ledgerData";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const datasetIndex = args.indexOf("--dataset");
  const dataset = datasetIndex >= 0 ? args[datasetIndex + 1] : undefined;
  const names = args.filter((arg, i) => !arg.startsWith("--") && args[i - 1] !== "--dataset");
  if (names.length !== 2) throw new Error("Usage: npm run matchup -- <your champion> <enemy> [--markdown]");
  const data = await loadLedgerData(dataset);
  const you = findKit(data.kits, names[0] as string);
  const enemy = findKit(data.kits, names[1] as string);
  const ledger = buildLedger(you, enemy, data.ctx);
  const display = new Map(data.kits.map((kit) => [kit.champion, kit.name]));
  console.log(args.includes("--markdown") ? matchupMarkdown(ledger, display, data.patch) : matchupText(ledger, display));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
