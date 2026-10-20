/**
 * The one-per-build rules the build search uses (PLAN.md §13, M8), confirmed on review on
 * 20 October 2026, and the count of the builds they allow.
 *
 * They differ from the game file's own caps (items.json's `groups`) in three places, and the
 * review kept them: the Tear items can be combined, Mortal Reminder and Morellonomicon can't,
 * and penetration is one group, without Black Cleaver or Bloodletter's Curse. Archangel's
 * Staff isn't a Lifeline item here.
 */
import type { BuildCount, BuildSearchRules, ItemCatalog } from "./records";

export const REVIEWED_GROUPS: Readonly<Record<string, readonly string[]>> = {
  "%pen": ["Lord Dominik's Regards", "Serylda's Grudge", "Mortal Reminder", "Void Staff", "Cryptbloom", "Terminus"],
  Spellblade: ["Trinity Force", "Lich Bane", "Essence Reaver", "Iceborn Gauntlet", "Dusk and Dawn"],
  Lifeline: ["Sterak's Gage", "Maw of Malmortius", "Immortal Shieldbow", "Protoplasm Harness"],
  Hydras: ["Ravenous Hydra", "Titanic Hydra", "Profane Hydra", "Stridebreaker"],
  Immolate: ["Sunfire Aegis", "Hollow Radiance"],
  "Grievous Wounds": ["Mortal Reminder", "Morellonomicon"],
  Annul: ["Banshee's Veil", "Edge of Night"],
};

/** Builds are six finished items, or five with one pair of tier-2 boots (PLAN.md §13). */
export const BUILD_SLOTS = 6;

function choose(n: number, k: number): bigint {
  if (k < 0 || k > n) return 0n;
  let result = 1n;
  for (let i = 0; i < k; i++) result = (result * BigInt(n - i)) / BigInt(i + 1);
  return result;
}

/**
 * How many builds of `slots` items `items` allow with at most one item from each group: order
 * doesn't matter and no item repeats. Groups may share items (Mortal Reminder is in two).
 */
export function countBuilds(items: readonly string[], groups: Readonly<Record<string, readonly string[]>>, slots: number): number {
  const pool = new Set(items);
  const restricted = [...new Set(Object.values(groups).flat())].filter((name) => pool.has(name));
  const free = pool.size - restricted.length;
  const memberOf = restricted.map((name) => Object.keys(groups).filter((group) => groups[group]!.includes(name)));
  let total = 0n;
  // Every allowed choice among the restricted items, filled up with unrestricted ones.
  const visit = (start: number, chosen: number, used: ReadonlySet<string>) => {
    total += choose(free, slots - chosen);
    if (chosen === slots) return;
    for (let i = start; i < restricted.length; i++) {
      const groupsOfItem = memberOf[i]!;
      if (groupsOfItem.some((group) => used.has(group))) continue;
      visit(i + 1, chosen + 1, new Set([...used, ...groupsOfItem]));
    }
  };
  visit(0, 0, new Set());
  return Number(total);
}

/** The names a rule set gives that aren't catalog items, which would silently drop a limit. */
export function unknownItems(groups: Readonly<Record<string, readonly string[]>>, catalog: readonly string[]): string[] {
  const known = new Set(catalog);
  return [...new Set(Object.values(groups).flat())].filter((name) => !known.has(name));
}

/** The reviewed rules with the builds they allow per side, and the builds the game file's caps would allow. */
export function searchRules(catalog: ItemCatalog, groups: Readonly<Record<string, readonly string[]>> = REVIEWED_GROUPS): BuildSearchRules {
  const finished = catalog.items.filter((item) => item.kind === "legendary").map((item) => item.name);
  const boots = catalog.items.filter((item) => item.kind === "boots").length;
  const unknown = unknownItems(groups, finished);
  if (unknown.length > 0) throw new Error(`The build search's rules name items outside the catalog: ${unknown.join(", ")}`);
  // The game file's caps among finished items; boots are one pair by the build's format.
  const gameFile = Object.fromEntries(catalog.groups.filter((group) => group.items.every((name) => finished.includes(name))).map((group) => {
    if (group.max !== 1) throw new Error(`Game-file group ${group.id} allows ${group.max} items; the count assumes 1`);
    return [group.wiki ?? group.id, group.items];
  }));
  const builds = (rules: Readonly<Record<string, readonly string[]>>): BuildCount => ({
    sixItems: countBuilds(finished, rules, BUILD_SLOTS),
    fiveItemsWithBoots: countBuilds(finished, rules, BUILD_SLOTS - 1) * boots,
  });
  return { groups: Object.fromEntries(Object.entries(groups).map(([name, items]) => [name, [...items]])), builds: builds(groups), gameFileBuilds: builds(gameFile) };
}

/**
 * What makes a build break the rules: more than six items, more than one pair of boots, an item
 * twice, or two items of one group. A transformed Tear item counts as the item it comes from.
 */
export function buildProblems(build: ReadonlyArray<{ name: string; kind: string; transformsFrom?: string }>, groups: Readonly<Record<string, readonly string[]>> = REVIEWED_GROUPS): string[] {
  const problems: string[] = [];
  const names = build.map((record) => record.transformsFrom ?? record.name);
  if (build.length > BUILD_SLOTS) problems.push(`${build.length} items: a build holds ${BUILD_SLOTS} at most`);
  if (build.filter((record) => record.kind === "boots").length > 1) problems.push("more than one pair of boots");
  for (const name of new Set(names)) if (names.filter((other) => other === name).length > 1) problems.push(`${name} twice`);
  for (const [group, members] of Object.entries(groups)) {
    const held = [...new Set(names)].filter((name) => members.includes(name));
    if (held.length > 1) problems.push(`${held.join(" and ")}: one ${group} item per build`);
  }
  return problems;
}
