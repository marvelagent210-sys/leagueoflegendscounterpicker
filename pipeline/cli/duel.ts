/**
 * Runs the duel simulator on two champions at level 20 and prints each scenario's result,
 * the stat budget each side bought, and optionally a fight's timeline.
 *
 * Champions with a kit (kits/champions/) fight with their abilities; others with their
 * level-20 base stats and basic attacks only.
 *
 * With --items or --enemy-items, the sides hold item builds (items/) instead of the stat
 * budget: names separated by commas, checked against the build rules (pipeline/items/rules.ts).
 * Tear items are fully stacked unless --unstacked; --item-option "Heartsteel.stacked=600"
 * changes an item's option.
 *
 * With --search, the build search (pipeline/items/search.ts) finds both sides' builds first:
 * each side's route builds, their fights, and the builds each side takes. --format picks six
 * items (sixItems, the default) or five items and boots (fiveItemsWithBoots).
 *
 * --spells and --enemy-spells give the sides summoner spells (summoners/), two at most, with
 * item builds or without any items (not with the stat budget): "Flash, Ignite". --runes and
 * --enemy-runes give them rune pages (runes/): the keystone and the primary path's three lesser
 * runes, then the secondary path's two, then the three shards, the groups split by "/":
 * "Conqueror, Triumph, Legend: Alacrity, Last Stand / Second Wind, Unflinching / Adaptive Force, Adaptive Force, Health Scaling".
 * --rune-option "Dark Harvest.souls=20" changes a rune's option.
 *
 * Usage: npm run duel -- <your champion> <enemy> [--gold 15000] [--log <scenario>] [--sweep] [--dataset 16.20]
 *        npm run duel -- <your champion> <enemy> --items "<item>, ..." --enemy-items "<item>, ..." [--unstacked] [--item-option <item>.<option>=<value>] [--log <scenario>]
 *        npm run duel -- <your champion> <enemy> --search [--format sixItems | fiveItemsWithBoots] [--unstacked] [--log <scenario>]
 *        npm run duel -- <your champion> <enemy> [--items "<item>, ..."] --spells "<spell>, <spell>" [--enemy-spells "<spell>, <spell>"]
 *        npm run duel -- <your champion> <enemy> [--items "<item>, ..."] --runes "<keystone>, <rune>, <rune>, <rune> / <rune>, <rune> / <shard>, <shard>, <shard>" [--enemy-runes "..."]
 */
import { BUDGET_STATS, DEFAULT_BUDGET, type StatPrices, allocateBoth } from "../../engine/budget";
import { matchupSpecs } from "../../items/equip";
import { SCENARIOS, type ScenarioId, runScenarios } from "../../engine/sim/scenarios";
import type { FightOutcome } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { bestMatchup } from "../../engine/sim/matchup";
import type { RunePage } from "../../runes/equip";
import { type BuildOptions, type LoadoutFighter, equipBuild, equipOptions, findItem, loadItemCatalog, loadRuneCatalog, loadSpellCatalog } from "../itemData";
import type { RuneCatalog } from "../runeCatalog/records";
import type { SpellCatalog } from "../summoners/records";
import type { ItemCatalog } from "../items/records";
import { BUILD_FORMATS, type BuildFormat, buildProblems } from "../items/rules";
import { names as buildNames, profileOf, searchMatchup } from "../items/search";
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

/** The item names of a --items list, checked against the build rules. */
function itemList(text: string | undefined, catalog: ItemCatalog, who: string): string[] {
  if (text === undefined) return [];
  const names = text.split(",").map((name) => name.trim()).filter(Boolean);
  const problems = buildProblems(names.map((name) => findItem(catalog, name)));
  if (problems.length > 0) throw new Error(`${who}'s build breaks the build rules: ${problems.join("; ")}`);
  return names;
}

/** Option overrides from --item-option "<item>.<option>=<value>" flags. */
function itemOptions(args: string[], catalog: ItemCatalog): Record<string, Record<string, number>> {
  const options: Record<string, Record<string, number>> = {};
  args.forEach((arg, i) => {
    if (arg !== "--item-option") return;
    const match = /^(.+)\.(\w+)=(-?[\d.]+)$/.exec(args[i + 1] ?? "");
    if (!match) throw new Error(`--item-option takes <item>.<option>=<value>, not "${args[i + 1] ?? ""}"`);
    const item = findItem(catalog, match[1]!).name;
    options[item] = { ...options[item], [match[2]!]: Number(match[3]) };
  });
  return options;
}

/** A rune page from a --runes list: "<keystone>, <rune>, <rune>, <rune> / <rune>, <rune> / <shard>, <shard>, <shard>". */
function runeList(text: string | undefined): RunePage {
  const groups = (text ?? "").split("/").map((group) => group.split(",").map((name) => name.trim()).filter(Boolean));
  if (groups.length !== 3) throw new Error('--runes takes three groups split by "/": the keystone and three runes, two runes, and three shards');
  const [primary = [], secondary = [], shards = []] = groups;
  return { keystone: primary[0] ?? "", primary: primary.slice(1), secondary, shards };
}

/** Option overrides from --rune-option "<rune>.<option>=<value>" flags. */
function runeOptions(args: string[]): Record<string, Record<string, number>> {
  const options: Record<string, Record<string, number>> = {};
  args.forEach((arg, i) => {
    if (arg !== "--rune-option") return;
    const match = /^(.+)\.(\w+)=(-?[\d.]+)$/.exec(args[i + 1] ?? "");
    if (!match) throw new Error(`--rune-option takes <rune>.<option>=<value>, not "${args[i + 1] ?? ""}"`);
    options[match[1]!] = { ...options[match[1]!], [match[2]!]: Number(match[3]) };
  });
  return options;
}

/** The summoner spell names of a --spells list. */
function spellList(text: string | undefined): string[] {
  return text === undefined ? [] : text.split(",").map((name) => name.trim()).filter(Boolean);
}

function describeBuild(name: string, fighter: LoadoutFighter): string[] {
  const gold = fighter.items.reduce((sum, record) => sum + record.gold, 0);
  // A full build names its format: six items, or five items and boots.
  const boots = fighter.items.filter((record) => record.kind === "boots").length;
  const format = Object.values(BUILD_FORMATS).find((f) => f.boots === boots && f.finished === fighter.items.length - boots);
  const spells = fighter.spells?.spells.map((record) => record.name) ?? [];
  const lines = [`${name} holds ${fighter.items.map((record) => record.name).join(", ") || "no items"} (${format ? `${format.label}, ` : ""}${gold.toLocaleString("en-US")} gold)${spells.length > 0 ? `, with ${spells.join(" and ")}` : ""}`];
  const page = fighter.runes?.played;
  if (page) lines.push(`  runes: ${page.keystone}, ${page.primary.join(", ")} / ${page.secondary.join(", ")} / ${page.shards.join(", ")}`);
  const left = [
    ...fighter.coverage.flatMap((entry) => entry.unmodeled.map((text) => `${entry.item}: ${text}`)),
    ...(fighter.spells?.coverage ?? []).flatMap((entry) => entry.unmodeled.map((text) => `${entry.spell}: ${text}`)),
    ...(fighter.runes?.coverage ?? []).flatMap((entry) => entry.unmodeled.map((text) => `${entry.rune}: ${text}`)),
  ];
  if (left.length > 0) lines.push(...left.map((text) => `  not modeled: ${text}`));
  return lines;
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
  const valued = new Set(["--gold", "--log", "--dataset", "--items", "--enemy-items", "--item-option", "--format", "--spells", "--enemy-spells", "--runes", "--enemy-runes", "--rune-option"]);
  const names = args.filter((arg, i) => !arg.startsWith("--") && !valued.has(args[i - 1] ?? ""));
  if (names.length !== 2) throw new Error('Usage: npm run duel -- <your champion> <enemy> [--gold 15000 | --items "<item>, ..." --enemy-items "<item>, ..."] [--log <scenario>] [--sweep]');
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
  const search = args.includes("--search");
  if (search && (args.includes("--items") || args.includes("--enemy-items"))) throw new Error("--search finds the builds; it doesn't go with --items or --enemy-items");
  const withSpells = args.includes("--spells") || args.includes("--enemy-spells");
  const withRunes = args.includes("--runes") || args.includes("--enemy-runes");
  const withItems = search || args.includes("--items") || args.includes("--enemy-items") || withSpells || withRunes;
  if (withItems) for (const flag of ["--sweep", "--gold"]) if (args.includes(flag)) throw new Error(`${flag} is for the stat budget; it doesn't go with item builds or summoner spells`);
  const catalog = withItems ? await loadItemCatalog(data.dataset) : undefined;
  const spellCatalog: SpellCatalog | undefined = withSpells ? await loadSpellCatalog(data.dataset) : undefined;
  const runeCatalog: RuneCatalog | undefined = withRunes ? await loadRuneCatalog(data.dataset) : undefined;
  const build = catalog ? { options: itemOptions(args, catalog), stacked: !args.includes("--unstacked") } : {};
  const runeOverrides = runeOptions(args);
  // Each side's build options: the shared item options, and its own summoner spells and rune page.
  const sideBuild = (spellFlag: "--spells" | "--enemy-spells", runeFlag: "--runes" | "--enemy-runes", adaptiveType: "Physical" | "Magic"): BuildOptions => ({
    ...build,
    ...(spellCatalog && args.includes(spellFlag) ? { spells: { names: spellList(option(args, spellFlag)), catalog: spellCatalog } } : {}),
    ...(runeCatalog && args.includes(runeFlag) ? { runes: { page: runeList(option(args, runeFlag)), catalog: runeCatalog, adaptiveType, options: runeOverrides } } : {}),
  });
  const [myBuild, theirBuild] = [sideBuild("--spells", "--runes", you.adaptiveType), sideBuild("--enemy-spells", "--enemy-runes", enemy.adaptiveType)];
  let myItems = catalog ? itemList(option(args, "--items"), catalog, you.name) : [];
  let theirItems = catalog ? itemList(option(args, "--enemy-items"), catalog, enemy.name) : [];
  if (search && catalog) {
    const format = (option(args, "--format") ?? "sixItems") as BuildFormat;
    if (!(format in BUILD_FORMATS)) throw new Error(`--format takes one of: ${Object.keys(BUILD_FORMATS).join(", ")}`);
    const found = searchMatchup(mine.spec, theirs.spec, catalog, equipOptions(catalog, build.options), data.prices, { format, stacked: build.stacked });
    console.log(`Build search (${BUILD_FORMATS[format].label}): ${found.seconds.calibration.toFixed(1)} s calibrating, ${found.seconds.search.toFixed(1)} s searching (${found.rounds} rounds), ${found.seconds.fights.toFixed(1)} s of fights between the routes`);
    found.calibrations?.forEach((c, side) => {
      const share = (x: number) => `${Math.round(x * 100)}%`;
      console.log(`  ${side === 0 ? you.name : enemy.name}'s fights against the estimate's counts: damage ${share(c.damage)}, attacks ${share(c.attacks)}, casts ${share(c.casts)}`);
    });
    found.routes.forEach((routes, side) => {
      console.log(`${side === 0 ? you.name : enemy.name}'s routes (quick estimate against the other's best):`);
      routes.forEach((route, i) => console.log(`  ${i + 1}. ${profileOf(route.items)}: ${buildNames(route).join(", ")} (${route.value.toFixed(3)})`));
    });
    console.log(`Screen scores for ${you.name}, the all-in scenarios with one branch each (rows: ${you.name}'s routes; columns: ${enemy.name}'s):`);
    for (const line of found.scores) console.log(`  ${line.map((score) => signed(score)).join("  ")}`);
    console.log(`Each side takes the route whose worst result is best: ${you.name} ${found.chosen[0] + 1}, ${enemy.name} ${found.chosen[1] + 1}; every scenario played, ${signed(found.score)}.\n`);
    myItems = buildNames(found.routes[0][found.chosen[0]]!);
    theirItems = buildNames(found.routes[1][found.chosen[1]]!);
  }
  if (catalog && (myVariants.length > 1 || theirVariants.length > 1)) {
    // As bestMatchup chooses, with the builds instead of the stat budget: your best worst case, and the enemy's.
    const scores = myVariants.map((x) => theirVariants.map((y) => runScenarios(...matchupSpecs(equipBuild(x.spec, myItems, catalog, myBuild), equipBuild(y.spec, theirItems, catalog, theirBuild))).score));
    const row = scores.reduce((best, line, i) => (Math.min(...line) > Math.min(...scores[best]!) + 1e-12 ? i : best), 0);
    const column = theirVariants.reduce((best, _, j) => (Math.max(...scores.map((line) => line[j]!)) < Math.max(...scores.map((line) => line[best]!)) - 1e-12 ? j : best), 0);
    mine.spec = myVariants[row]!.spec;
    theirs.spec = theirVariants[column]!.spec;
    for (const [side, variants, at] of [[you.name, myVariants, row], [enemy.name, theirVariants, column]] as const) {
      const options = variants[at]?.options;
      if (variants.length > 1 && options) console.log(`${side} plays ${Object.entries(options).map(([key, value]) => `${key} ${value}`).join(", ")}: the best of ${variants.length} option sets here`);
    }
  } else if (myVariants.length > 1 || theirVariants.length > 1) {
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
  let a: FighterSpec;
  let b: FighterSpec;
  if (catalog) {
    const yours = equipBuild(mine.spec, myItems, catalog, myBuild);
    const theirsEquipped = equipBuild(theirs.spec, theirItems, catalog, theirBuild);
    for (const line of [...describeBuild(you.name, yours), ...describeBuild(enemy.name, theirsEquipped)]) console.log(line);
    const assumptions = [...new Set([...yours.assumptions, ...theirsEquipped.assumptions])];
    if (assumptions.length > 0) console.log(["Item assumptions:", ...assumptions.map((text) => `  ${text}`)].join("\n"));
    const spellAssumptions = [...new Set([...(yours.spells?.assumptions ?? []), ...(theirsEquipped.spells?.assumptions ?? [])])];
    if (spellAssumptions.length > 0) console.log(["Summoner spell assumptions:", ...spellAssumptions.map((text) => `  ${text}`)].join("\n"));
    for (const [side, fighter] of [[you.name, yours], [enemy.name, theirsEquipped]] as const) {
      if (fighter.runes?.assumptions.length) console.log([`${side}'s rune assumptions:`, ...fighter.runes.assumptions.map((text) => `  ${text}`)].join("\n"));
    }
    console.log("");
    [a, b] = matchupSpecs(yours, theirsEquipped);
  } else {
    const [x, y, bought] = equip(mine.spec, theirs.spec, gold, data.prices);
    console.log(`Stat budget ${gold} gold: ${you.name} buys ${bought[0]}; ${enemy.name} buys ${bought[1]}\n`);
    [a, b] = [x, y];
  }

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
