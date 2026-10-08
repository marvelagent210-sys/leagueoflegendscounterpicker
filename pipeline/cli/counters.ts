/**
 * Prints every champion ranked by the interaction ledger against one enemy (partial: the
 * duel simulator replaces it later), with the strongest reasons for the top picks.
 *
 * Usage: npm run counters -- <enemy> [--top 20] [--dataset 16.20]
 */
import { rankCounters } from "../../engine/ledger/index";
import { findKit, loadLedgerData } from "../ledgerData";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const option = (flag: string) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
  const name = args.find((arg, i) => !arg.startsWith("--") && !["--top", "--dataset"].includes(args[i - 1] ?? ""));
  if (!name) throw new Error("Usage: npm run counters -- <enemy> [--top 20]");
  const top = Number(option("--top") ?? 20);
  const data = await loadLedgerData(option("--dataset"));
  const enemy = findKit(data.kits, name);
  const ranking = rankCounters(enemy, data.kits, data.ctx);
  const display = (id: string) => data.kits.find((kit) => kit.champion === id)?.name ?? id;
  console.log(`Counters to ${enemy.name} (patch ${data.patch}, ledger only: ${ranking.confidence})\n`);
  ranking.ranking.slice(0, top).forEach((row, index) => {
    const badge = row.hardCounters.length > 0 ? `  [hard counter: ${row.hardCounters.map((e) => e.check).join(", ")}]` : "";
    console.log(`${String(index + 1).padStart(3)}. ${display(row.champion).padEnd(14)} net ${row.net >= 0 ? "+" : ""}${row.net.toFixed(2)}${badge}`);
    for (const reason of row.reasons) console.log(`       + ${reason.summary}`);
    for (const risk of row.risks.slice(0, 1)) console.log(`       - ${risk.summary}`);
  });
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
