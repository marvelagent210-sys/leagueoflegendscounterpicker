import type { RuneCatalog } from "../../runes/catalog";
import { type ShardSelection, validateShardSelection } from "../../runes/shards";

/** Explicit selections only: omission preserves the existing duel's behavior. */
export function shardOption(args: readonly string[], flag: "--shards" | "--enemy-shards", catalog: RuneCatalog): ShardSelection | undefined {
  const positions = args.flatMap((arg, index) => arg === flag ? [index] : []);
  if (positions.length === 0) return undefined;
  if (positions.length !== 1) throw new Error(`${flag} must be given once`);
  const value = args[positions[0]! + 1];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires three comma-separated shard IDs`);
  const parts = value.split(",").map((part) => part.trim());
  if (parts.length !== 3 || parts.some((part) => !/^\d+$/.test(part))) {
    throw new Error(`${flag} requires three comma-separated integer shard IDs`);
  }
  return validateShardSelection(catalog, parts.map(Number));
}
