/** Markdown for the ledger: counter pages, the fight-profile section of kit pages, and the ledger report. */
import type { Glossary } from "../engine/glossary";
import type { CounterRanking, Ledger, LedgerEntry } from "../engine/ledger/index";
import { HARD_COUNTER } from "../engine/ledger/index";

const HARD_COUNTER_TEXT = `A hard counter shuts down part of a kit every time it is used (${[...HARD_COUNTER.checks].join(", ")}) with an impact of ${HARD_COUNTER.minImpact} or more (${HARD_COUNTER.minRangeImpact} for range).`;
import type { AbilityProfile, Evidence, KitProfile } from "../engine/profiles";

const WIKI = "https://wiki.leagueoflegends.com/en-us/";

function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function signed(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}`;
}

export function evidenceLink(evidence: Evidence): string {
  const title = evidence.page.replace(/^Template:Data /, "");
  if (evidence.page === "Module:ChampionData/data") return "Module:ChampionData";
  const url = `${WIKI}index.php?title=${encodeURIComponent(evidence.page.replace(/ /g, "_"))}${evidence.revid ? `&oldid=${evidence.revid}` : ""}`;
  return `[${title}](${url})`;
}

function refName(entry: LedgerEntry, side: "by" | "against", names: Map<string, string>): string {
  const ref = entry[side];
  const champion = names.get(ref.champion) ?? ref.champion;
  return ref.kind === "A" ? `${champion} basic attacks` : `${champion} ${ref.kind} ${ref.name}`;
}

/** One ledger entry as a Markdown bullet with its conditions, and its sources unless `brief`. */
export function entryLine(entry: LedgerEntry, names: Map<string, string>, brief = false): string {
  const extras = [entry.timing, ...entry.conditions].filter(Boolean).join(". ").replace(/\.\./g, ".");
  const refs = `${refName(entry, "by", names)} → ${refName(entry, "against", names)}`;
  if (brief) return `- **${entry.impact.toFixed(2)}** ${entry.check}: ${entry.summary}${extras ? ` ${extras}.` : ""} (${refs})`.replace(/\.\. /g, ". ");
  const sources = [...new Map(entry.evidence.map((e) => [e.page, e])).values()].map(evidenceLink).join(", ");
  return `- **${entry.impact.toFixed(2)}** ${entry.check}: ${entry.summary}${extras ? ` ${extras}.` : ""} (${refs}; sources: ${sources})`.replace(/\.\. /g, ". ");
}

export function matchupMarkdown(ledger: Ledger, names: Map<string, string>, patch: string): string {
  const you = names.get(ledger.you) ?? ledger.you;
  const enemy = names.get(ledger.enemy) ?? ledger.enemy;
  const lines = [
    `# ${you} vs ${enemy} (patch ${patch}, ledger only: ${ledger.confidence})`,
    "",
    `Score: ${you} ${ledger.score.you.toFixed(2)}, ${enemy} ${ledger.score.enemy.toFixed(2)}, net ${signed(ledger.score.net)} for ${you}.`,
    "",
    `## In ${you}'s favor`,
    "",
    ...ledger.entries.filter((e) => e.favors === ledger.you).map((e) => entryLine(e, names)),
    "",
    `## In ${enemy}'s favor`,
    "",
    ...ledger.entries.filter((e) => e.favors === ledger.enemy && ledger.you !== ledger.enemy).map((e) => entryLine(e, names)),
  ];
  return `${lines.join("\n")}\n`;
}

/** Plain text for the terminal. */
export function matchupText(ledger: Ledger, names: Map<string, string>): string {
  const you = names.get(ledger.you) ?? ledger.you;
  const enemy = names.get(ledger.enemy) ?? ledger.enemy;
  const lines = [
    `${you} vs ${enemy}: ${you} ${ledger.score.you.toFixed(2)}, ${enemy} ${ledger.score.enemy.toFixed(2)}, net ${signed(ledger.score.net)} for ${you} (ledger only, ${ledger.confidence})`,
    "",
  ];
  for (const entry of ledger.entries) {
    const side = names.get(entry.favors) ?? entry.favors;
    lines.push(`  ${entry.impact.toFixed(2)}  ${side.padEnd(12)} ${entry.check.padEnd(18)} ${entry.summary}`);
    for (const extra of [entry.timing, ...entry.conditions].filter(Boolean)) lines.push(`${" ".repeat(40)}${extra}`);
  }
  if (ledger.entries.length === 0) lines.push("  No interactions found between these kits.");
  return lines.join("\n");
}

const DETAILED = 10;

export function counterPage(ranking: CounterRanking, names: Map<string, string>, patch: string): string {
  const enemy = names.get(ranking.enemy) ?? ranking.enemy;
  const name = (id: string) => names.get(id) ?? id;
  const lines = [
    `# Counters to ${enemy} (patch ${patch})`,
    "",
    `Every champion ranked by what its kit does against ${enemy}'s, from the interaction ledger: projectile blocks, spell shields,`,
    "parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the",
    "interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.",
    "",
    `"For" sums the interactions in the champion's favor, "against" those in ${enemy}'s; net = for − against.`,
    HARD_COUNTER_TEXT,
    `Run \`npm run matchup -- <champion> ${ranking.enemy}\` for the full ledger of a matchup, with sources.`,
    "",
    `## Top ${DETAILED}`,
    "",
  ];
  ranking.ranking.slice(0, DETAILED).forEach((row, index) => {
    lines.push(`### ${index + 1}. ${name(row.champion)} (net ${signed(row.net)})`, "");
    if (row.reasons.length === 0) lines.push(`- No interaction in ${name(row.champion)}'s favor.`);
    for (const reason of row.reasons) lines.push(entryLine(reason, names, true));
    for (const risk of row.risks.slice(0, 1)) lines.push(`- Watch out: ${risk.summary}`);
    lines.push("");
  });
  lines.push(
    "## Full ranking",
    "",
    "| # | Champion | Net | For | Against | Hard counters |",
    "|--:|---|--:|--:|--:|---|",
    ...ranking.ranking.map(
      (row, index) =>
        `| ${index + 1} | ${name(row.champion)} | ${signed(row.net)} | ${row.you.toFixed(2)} | ${row.enemy.toFixed(2)} | ${cell(row.hardCounters.map((e) => `${e.check} (${e.by.kind === "A" ? "attacks" : e.by.name})`).join(", "))} |`,
    ),
  );
  return `${lines.join("\n")}\n`;
}

function list(items: string[]): string {
  return items.length > 0 ? items.join("; ") : "–";
}

function abilityRow(ability: AbilityProfile): string {
  const d = ability.delivery;
  const flags = [
    d.projectile && `projectile ${d.projectile}`,
    d.spellShield && `spell shield ${d.spellShield}`,
    d.parry && `parry ${d.parry}`,
    d.grounded && `grounded ${d.grounded}`,
    d.knockdown && `knockdown ${d.knockdown}`,
    d.disruptable && `disruptable ${d.disruptable}`,
    d.attack,
  ].filter((f): f is string => Boolean(f));
  const applies = ability.applies.map(
    (a) => `${a.type}${a.variant ? ` (${a.variant})` : ""}${a.duration !== undefined ? ` ${a.duration} s` : ""}${a.amount !== undefined ? ` ${a.amount}%` : ""}${a.condition ? "*" : ""}`,
  );
  const movement = ability.movement.map((m) => `${m.type}${m.interruptible === false ? " (unstoppable)" : ""}${m.condition ? ` ${m.condition}` : ""}`);
  const states = ability.states.map((s) => `${s.state}${s.duration !== undefined ? ` ${s.duration} s` : ""}${s.removes ? ` (${s.removes.length} CC types)` : ""}`);
  return `| ${ability.kind} | ${cell(ability.name)} | ${ability.cooldown ?? "–"} | ${cell(list(flags))} | ${cell(list(applies))} | ${cell(list(movement))} | ${cell(list(states))} |`;
}

/** The kit page section that shows what the ledger knows about each ability. */
export function fightProfileSection(kit: KitProfile): string[] {
  return [
    "## Fight profile (what the interaction ledger uses)",
    "",
    "| Form | Attack range | Ranged | Projectile | Missile speed | Attack modifiers |",
    "|---|--:|---|---|--:|---|",
    ...kit.attacks.map(
      (a) => `| ${cell(a.formName)} | ${a.range} | ${a.ranged ? "yes" : "no"} | ${a.projectile ? "yes" : "no"} | ${a.missileSpeed ?? "–"} | ${cell(list(a.modifiers))} |`,
    ),
    "",
    "Cooldowns at max rank. Flags: the wiki's interaction flags (yes, no, partly). * marks an effect that applies only under a condition.",
    "",
    "| Slot | Ability | Cooldown | Delivery | Applies to the enemy | Movement | Gives itself |",
    "|---|---|--:|---|---|---|---|",
    ...kit.abilities.map(abilityRow),
    "",
  ];
}

export function ledgerReport(
  patch: string,
  glossary: Glossary,
  kits: KitProfile[],
  rankings: CounterRanking[],
  names: Map<string, string>,
  descriptionOnly: Array<{ champion: string; ability: string; effect: string; evidence: string }> = [],
): string {
  const count = (predicate: (a: AbilityProfile) => boolean) => kits.flatMap((k) => k.abilities).filter(predicate).length;
  const states = new Map<string, number>();
  for (const ability of kits.flatMap((k) => k.abilities)) for (const s of ability.states) states.set(s.state, (states.get(s.state) ?? 0) + 1);
  const hard = rankings.flatMap((r) => r.ranking.flatMap((row) => row.hardCounters.map((e) => ({ enemy: r.enemy, e }))));
  const byCheck = new Map<string, number>();
  for (const { e } of hard) byCheck.set(e.check, (byCheck.get(e.check) ?? 0) + 1);
  const lines = [
    `# Interaction ledger (patch ${patch})`,
    "",
    "Generated by `npm run build:data`. Ability roles come from the wiki's glossary lists (pinned revisions below), joined with",
    "each ability's interaction flags and description; see PLAN.md §5 for the checks and engine/ledger/weights.ts for the weights.",
    "",
    "## Sources",
    "",
    ...Object.entries(glossary.pages).map(([title, revid]) => `- ${evidenceLink({ page: title, revid })} (revision ${revid})`),
    "",
    `Glossary entries: ${glossary.entries.length}. Mentions that name no current ability: ${glossary.unresolved.length}${glossary.unresolved.length ? ` (${glossary.unresolved.map((u) => u.mention).join(", ")})` : ""}.`,
    "",
    "## What the profiles found",
    "",
    `- Abilities applying crowd control or debuffs to the enemy: ${count((a) => a.applies.length > 0)}.`,
    `- Dashes: ${count((a) => a.movement.some((m) => m.type === "dash"))}; of them unstoppable by knockdowns: ${count((a) => a.movement.some((m) => m.type === "dash" && m.interruptible === false))}. Blinks: ${count((a) => a.movement.some((m) => m.type === "blink"))}. Lunges: ${count((a) => a.movement.some((m) => m.type === "lunge"))}.`,
    `- Channels and charge-ups: ${count((a) => a.channel !== undefined)}.`,
    `- States abilities give their caster: ${[...states].sort((a, b) => b[1] - a[1]).map(([s, n]) => `${s} ${n}`).join(", ")}.`,
    "",
    `## Effects read only from descriptions (${descriptionOnly.length})`,
    "",
    "Crowd control a description applies that no glossary list names for that ability; kept, with the sentence as evidence.",
    "",
    ...descriptionOnly.map((d) => `- ${names.get(d.champion) ?? d.champion} ${d.ability}: ${d.effect}. "${d.evidence}"`),
    "",
    "## Hard counters by check",
    "",
    `${HARD_COUNTER_TEXT} Across all ${rankings.length * (rankings.length - 1)} ordered pairs:`,
    "",
    ...[...byCheck].sort((a, b) => b[1] - a[1]).map(([check, n]) => `- ${check}: ${n}`),
    "",
    "## Best ledger-only counter for each champion",
    "",
    "| Enemy | Best counter | Net | Strongest reason |",
    "|---|---|--:|---|",
    ...rankings.map((r) => {
      const best = r.ranking[0];
      return `| ${names.get(r.enemy) ?? r.enemy} | ${best ? (names.get(best.champion) ?? best.champion) : "–"} | ${best ? signed(best.net) : "–"} | ${cell(best?.reasons[0]?.summary ?? "")} |`;
    }),
  ];
  return `${lines.join("\n")}\n`;
}
