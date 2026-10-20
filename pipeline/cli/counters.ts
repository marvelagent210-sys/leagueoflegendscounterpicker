/**
 * Prints the champions ranked against one enemy: by simulated duels when the enemy has a
 * simulator kit (from current simulated.json), then every champion by the
 * interaction ledger (partial), with the strongest reasons for the top picks.
 *
 * Usage: npm run counters -- <enemy> [--top 20] [--dataset 16.20]
 */
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { rankCounters } from "../../engine/ledger/index";
import { compareChampionIds } from "../../engine/championOrder";
import { DEFAULT_BUDGET } from "../../engine/budget";
import { precomputedCurrent, type PrecomputedMatchups } from "../../engine/sim/precomputed";
import { KITS } from "../../kits/champions/index";
import { datasetDir } from "../config";
import { findKit, loadLedgerData } from "../ledgerData";
import { simulationProvenance } from "../sim/fingerprint";

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
  const simulatedPath = path.join(datasetDir(data.dataset), "simulated.json");
  const simulated = existsSync(simulatedPath) ? (JSON.parse(await readFile(simulatedPath, "utf8")) as PrecomputedMatchups) : undefined;
  const current = simulated && precomputedCurrent(simulated, data.dataset, data.patch, (await simulationProvenance(data.dataset)).fingerprint, DEFAULT_BUDGET, Object.keys(KITS));
  if (simulated && !current) console.log("Precomputed duels are outdated or incomplete. Refresh them with npm run build:sim; showing the interaction ledger below.\n");
  if (current && simulated?.matchups[enemy.champion]) {
    const rows = Object.entries(simulated.matchups)
      .filter(([you]) => you !== enemy.champion)
      .map(([you, enemies]) => ({ you, score: enemies[enemy.champion]?.[0] ?? 0 }))
      .sort((a, b) => b.score - a.score || compareChampionIds(a.you, b.you));
    console.log(`Counters to ${enemy.name} by simulated duels (patch ${data.patch}, ${simulated.gold} gold of plain stats)\n`);
    rows.forEach((row, index) => console.log(`${String(index + 1).padStart(3)}. ${display(row.you).padEnd(14)} ${row.score >= 0 ? "+" : ""}${row.score.toFixed(2)}`));
    console.log("");
  }
  console.log(`Counters to ${enemy.name} by the interaction ledger (patch ${data.patch}, ${ranking.confidence})\n`);
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
