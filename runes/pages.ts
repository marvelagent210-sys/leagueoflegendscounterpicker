import type { RuneCatalog } from "./catalog";

/** A page's layout only; effects and champion-specific substitutions are not applied. */
export interface RunePage {
  primaryPathId: number;
  secondaryPathId: number;
  primary: [number, number, number, number];
  secondary: [number, number];
  shards: [number, number, number];
}

export type RunePageValidation =
  | { valid: true; page: RunePage; issues: [] }
  | { valid: false; issues: string[] };

interface PathLayout {
  slots: number[][];
  allowedSecondaryPathIds: number[];
}

interface RuneLocation {
  pathId: number;
  slot: number;
}

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}

function id(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function idList(value: unknown, label: string, issues: string[], length?: number): number[] | undefined {
  if (!Array.isArray(value) || (length === undefined ? value.length === 0 : value.length !== length)
    || !Array.from(value).every(id)) {
    issues.push(`${label} must contain ${length === undefined ? "one or more" : length} positive integer IDs`);
    return undefined;
  }
  return value as number[];
}

/** Check the complete layout, so an inconsistent catalog cannot authorize a page. */
function indexCatalog(catalog: RuneCatalog, issues: string[]) {
  const paths = new Map<number, PathLayout>();
  const runes = new Map<number, RuneLocation>();
  const expectedRunes = new Map<number, RuneLocation>();
  const shards = new Set<number>();
  const shardSlots: number[][] = [];
  if (!object(catalog) || catalog.schema !== 1 || !Array.isArray(catalog.paths)
    || catalog.paths.length < 2 || !Array.isArray(catalog.runes) || !Array.isArray(catalog.shards)
    || !Array.isArray(catalog.shardSlots) || catalog.shardSlots.length !== 3) {
    issues.push("catalog must have schema 1, at least two paths, rune/shard inventories and three shard rows");
    return { paths, runes, shardSlots };
  }
  for (const path of catalog.paths) {
    if (!object(path) || !id(path.id) || !Array.isArray(path.slots) || path.slots.length !== 4) {
      issues.push("catalog paths must have a positive integer ID and four rune rows");
      continue;
    }
    if (paths.has(path.id)) issues.push(`catalog repeats path ${path.id}`);
    const slots: number[][] = [];
    for (const [slot, row] of path.slots.entries()) {
      const ids = idList(row, `catalog path ${path.id} row ${slot}`, issues);
      slots.push(ids ?? []);
      for (const runeId of ids ?? []) {
        if (expectedRunes.has(runeId)) issues.push(`catalog places rune ${runeId} in more than one position`);
        expectedRunes.set(runeId, { pathId: path.id, slot });
      }
    }
    const secondary = idList(path.allowedSecondaryPathIds, `catalog path ${path.id} secondary paths`, issues);
    if (secondary && new Set(secondary).size !== secondary.length) issues.push(`catalog path ${path.id} repeats a secondary path`);
    paths.set(path.id, { slots, allowedSecondaryPathIds: secondary ?? [] });
  }
  for (const [pathId, path] of paths) {
    for (const otherId of path.allowedSecondaryPathIds) {
      if (otherId === pathId || !paths.has(otherId)) issues.push(`catalog path ${pathId} has an invalid secondary path ${otherId}`);
    }
  }
  for (const rune of catalog.runes) {
    if (!object(rune) || !id(rune.id) || !id(rune.pathId)
      || !Number.isInteger(rune.slot) || rune.slot < 0 || rune.slot > 3) {
      issues.push("catalog rune inventory contains an invalid ID, path or row");
      continue;
    }
    if (runes.has(rune.id)) issues.push(`catalog repeats rune ${rune.id}`);
    const location = expectedRunes.get(rune.id);
    if (!location || location.pathId !== rune.pathId || location.slot !== rune.slot) {
      issues.push(`catalog rune ${rune.id} does not match its path and row`);
    }
    runes.set(rune.id, { pathId: rune.pathId, slot: rune.slot });
  }
  for (const runeId of expectedRunes.keys()) {
    if (!runes.has(runeId)) issues.push(`catalog is missing rune ${runeId}`);
  }
  for (const shard of catalog.shards) {
    if (!object(shard) || !id(shard.id)) issues.push("catalog shard inventory contains an invalid ID");
    else {
      if (shards.has(shard.id)) issues.push(`catalog repeats shard ${shard.id}`);
      if (runes.has(shard.id)) issues.push(`catalog ID ${shard.id} is both a rune and a shard`);
      shards.add(shard.id);
    }
  }
  const usedShards = new Set<number>();
  for (const [row, value] of catalog.shardSlots.entries()) {
    const ids = idList(value, `catalog shard row ${row}`, issues);
    shardSlots.push(ids ?? []);
    if (ids && new Set(ids).size !== ids.length) issues.push(`catalog shard row ${row} repeats a choice`);
    for (const shardId of ids ?? []) {
      if (!shards.has(shardId)) issues.push(`catalog shard row ${row} references missing shard ${shardId}`);
      usedShards.add(shardId);
    }
  }
  for (const shardId of shards) {
    if (!usedShards.has(shardId)) issues.push(`catalog shard ${shardId} has no selectable row`);
  }
  return { paths, runes, shardSlots };
}

/**
 * Validate the page's structure against its patch catalog. This does not decide
 * champion-specific client replacements, equip effects, or mark effects implemented.
 * Successful pages are copied, with secondary selections ordered by their rows.
 */
export function validateRunePage(catalog: RuneCatalog, value: unknown): RunePageValidation {
  const issues: string[] = [];
  const layout = indexCatalog(catalog, issues);
  if (issues.length) return { valid: false, issues };
  if (!object(value)) return { valid: false, issues: ["rune page must be an object"] };
  const keys = new Set(["primaryPathId", "secondaryPathId", "primary", "secondary", "shards"]);
  for (const key of Object.keys(value)) {
    if (!keys.has(key)) issues.push(`unknown rune page field ${key}`);
  }
  if (!id(value.primaryPathId)) issues.push("primaryPathId must be a positive integer ID");
  if (!id(value.secondaryPathId)) issues.push("secondaryPathId must be a positive integer ID");
  const primary = idList(value.primary, "primary", issues, 4);
  const secondary = idList(value.secondary, "secondary", issues, 2);
  const shardPicks = idList(value.shards, "shards", issues, 3);
  if (issues.length || !primary || !secondary || !shardPicks || !id(value.primaryPathId) || !id(value.secondaryPathId)) {
    return { valid: false, issues };
  }
  const primaryPathId = value.primaryPathId;
  const secondaryPathId = value.secondaryPathId;
  const primaryPath = layout.paths.get(primaryPathId);
  const secondaryPath = layout.paths.get(secondaryPathId);
  if (!primaryPath) issues.push(`unknown primary path ${primaryPathId}`);
  if (!secondaryPath) issues.push(`unknown secondary path ${secondaryPathId}`);
  if (primaryPathId === secondaryPathId) issues.push("primary and secondary paths must differ");
  if (primaryPath && secondaryPath && !primaryPath.allowedSecondaryPathIds.includes(secondaryPathId)) {
    issues.push(`path ${secondaryPathId} is not an allowed secondary path for ${primaryPathId}`);
  }
  for (const [row, runeId] of primary.entries()) {
    if (!primaryPath?.slots[row]?.includes(runeId)) issues.push(`primary row ${row} cannot select rune ${runeId}`);
  }
  const secondaryRows = new Set<number>();
  for (const runeId of secondary) {
    const location = layout.runes.get(runeId);
    if (!location || location.pathId !== secondaryPathId || location.slot === 0) {
      issues.push(`secondary rune ${runeId} must be a lesser rune of path ${secondaryPathId}`);
    } else {
      if (secondaryRows.has(location.slot)) issues.push("secondary runes must come from different rows");
      secondaryRows.add(location.slot);
    }
  }
  if (new Set([...primary, ...secondary]).size !== 6) issues.push("a page cannot repeat a rune");
  for (const [row, shardId] of shardPicks.entries()) {
    if (!layout.shardSlots[row]?.includes(shardId)) issues.push(`shard row ${row} cannot select shard ${shardId}`);
  }
  if (issues.length) return { valid: false, issues };
  const orderedSecondary = [...secondary].sort((a, b) => layout.runes.get(a)!.slot - layout.runes.get(b)!.slot);
  return {
    valid: true,
    issues: [],
    page: {
      primaryPathId,
      secondaryPathId,
      primary: [...primary] as RunePage["primary"],
      secondary: orderedSecondary as RunePage["secondary"],
      shards: [...shardPicks] as RunePage["shards"],
    },
  };
}

/** Validate and return a detached canonical page, or throw all structural issues. */
export function assertRunePage(catalog: RuneCatalog, value: unknown): RunePage {
  const result = validateRunePage(catalog, value);
  if (!result.valid) throw new Error(`Invalid rune page: ${result.issues.join("; ")}`);
  return result.page;
}
