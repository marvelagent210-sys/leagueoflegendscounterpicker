/** Compact, browser-safe stat-shard inputs; full rune-page effects remain separate. */
import type { RuneCatalog } from "./catalog";
import type { ShardRules } from "./shardRules";
import type { ShardSelection } from "./shards";
import { TOP_LANE_MAX_LEVEL } from "../engine/stats";

export type RuneShardCatalog = Pick<RuneCatalog, "schema" | "dataset" | "patch" | "shards" | "shardSlots">;

export interface StatShardData {
  schema: 1;
  dataset: string;
  patch: string;
  /** The export's source revision, checked against the requesting app/worker. */
  simulationFingerprint?: string;
  catalog: RuneShardCatalog;
  rules: ShardRules;
}

/** Reviewed current layout, also checked against the compiled source catalog. */
export const SHARD_ROWS = [[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]] as const;

/** Labels follow compiled rules, not the client's conflicting scaling-health tooltip. */
export function shardEffectLabel(id: number, data: StatShardData): string {
  const r = data.rules;
  const amount = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  switch (id) {
    case 5008: return `+${amount(r.adaptiveForce * r.adaptiveAdRatio)} AD or +${amount(r.adaptiveForce)} AP`;
    case 5005: return `+${amount(r.attackSpeed * 100)}% attack speed`;
    case 5007: return `+${amount(r.abilityHaste)} ability haste`;
    case 5010: return `+${amount(r.moveSpeed * 100)}% movement speed`;
    case 5001: return `+${amount(r.healthPerLevel * TOP_LANE_MAX_LEVEL)} health at level ${TOP_LANE_MAX_LEVEL}`;
    case 5011: return `+${amount(r.health)} health`;
    case 5013: return `+${amount(r.tenacity * 100)}% tenacity and +${amount(r.slowResist * 100)}% slow resistance`;
    default: throw new Error(`Unsupported stat shard ${id}`);
  }
}

/** Persisted choices are all-or-nothing: never fill an invalid row with another shard. */
export function sanitizeShardSelection(value: unknown): ShardSelection | null {
  if (!Array.isArray(value) || value.length !== 3) return null;
  const selected = Array.from(value);
  if (!selected.every((id, index) => typeof id === "number" && Number.isSafeInteger(id)
    && (SHARD_ROWS[index] as readonly number[]).includes(id))) return null;
  return [...selected] as ShardSelection;
}

const RULES: Readonly<Omit<ShardRules, "evidence">> = {
  adaptiveForce: 9, adaptiveAdRatio: 0.6, attackSpeed: 0.1, abilityHaste: 8,
  moveSpeed: 0.025, healthPerLevel: 10, health: 65, tenacity: 0.15, slowResist: 0.15,
};
const REVISIONS: Readonly<Record<string, number>> = {
  "Adaptive force": 4063874, Rune: 4091810, "Slow resist": 4058780,
  "Template:Adaptive": 4009298, "Template:Data Garen/Courage": 4064595, Tenacity: 4021927,
};
const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);

function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Invalid stat-shard data: ${message}`);
}

/** Validate only the reviewed combat inputs, returning an independent snapshot. */
export function validateStatShardData(
  value: unknown,
  expectedDataset: string,
  expectedPatch?: string,
  expectedFingerprint?: string,
): StatShardData {
  requireThat(object(value), "an object is required");
  requireThat(value.schema === 1 && /^\d+\.\d+$/.test(expectedDataset) && value.dataset === expectedDataset, "dataset or schema differs");
  const [major, minor] = expectedDataset.split(".").map(Number);
  const inferredPatch = `${major! + 10}.${minor}`;
  requireThat(expectedPatch === undefined || expectedPatch === inferredPatch, "expected patch disagrees with the dataset");
  const patch = expectedPatch ?? inferredPatch;
  requireThat(value.patch === patch, "patch differs");
  if (value.simulationFingerprint !== undefined) {
    requireThat(typeof value.simulationFingerprint === "string" && value.simulationFingerprint.trim().length > 0, "source revision is invalid");
  }
  if (expectedFingerprint !== undefined) requireThat(value.simulationFingerprint === expectedFingerprint, "source revision differs");
  const catalog = value.catalog;
  requireThat(object(catalog) && catalog.schema === 1 && catalog.dataset === expectedDataset && catalog.patch === patch, "catalog identity differs");
  requireThat(JSON.stringify(catalog.shardSlots) === JSON.stringify(SHARD_ROWS), "catalog rows differ from the reviewed layout");
  requireThat(Array.isArray(catalog.shards) && catalog.shards.length === 7, "all seven shard definitions are required");
  const ids = new Set<number>();
  for (const shard of Array.from(catalog.shards)) {
    requireThat(object(shard) && typeof shard.id === "number" && SHARD_ROWS.some((row) => (row as readonly number[]).includes(shard.id as number))
      && !ids.has(shard.id), "shard inventory differs");
    for (const key of ["name", "icon", "shortDescription", "longDescription", "tooltip"] as const) {
      requireThat(typeof shard[key] === "string", `shard ${shard.id} has an invalid ${key}`);
    }
    requireThat((shard.name as string).trim().length > 0, "shard name is empty");
    ids.add(shard.id);
  }
  const rules = value.rules;
  requireThat(object(rules), "compiled rules are required");
  for (const [key, amount] of Object.entries(RULES)) requireThat(rules[key] === amount, `${key} differs from the reviewed rule`);
  requireThat(Array.isArray(rules.evidence) && rules.evidence.length > 0, "source evidence is required");
  const cited = new Set<string>();
  for (const entry of Array.from(rules.evidence)) {
    requireThat(object(entry) && typeof entry.title === "string" && REVISIONS[entry.title] !== undefined
      && entry.revid === REVISIONS[entry.title] && typeof entry.text === "string" && entry.text.trim().length > 0, "source evidence differs");
    cited.add(entry.title);
  }
  requireThat(Object.keys(REVISIONS).every((title) => cited.has(title)), "all six reviewed rule sources are required");
  const source = value as unknown as StatShardData;
  return {
    schema: 1, dataset: expectedDataset, patch,
    ...(source.simulationFingerprint !== undefined ? { simulationFingerprint: source.simulationFingerprint } : {}),
    catalog: { schema: 1, dataset: expectedDataset, patch, shardSlots: source.catalog.shardSlots.map((row) => [...row]), shards: source.catalog.shards.map((shard) => ({ ...shard })) },
    rules: { ...RULES, evidence: source.rules.evidence.map((entry) => ({ ...entry })) },
  };
}
