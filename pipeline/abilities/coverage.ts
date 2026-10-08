/** Measures how much of the wiki's ability data the parser understood. */
import type { AbilityRecord } from "../../engine/abilities";

export interface AbilityCoverage {
  records: number;
  champions: number;
  byKind: Record<string, number>;
  levelingStats: number;
  levelingParsed: number;
  mechanics: number;
  controlEffects: number;
  controlWithDuration: number;
  /** Leveling values with leftover text, most frequent shape first. */
  unparsed: Array<{ ability: string; label: string; text: string; unparsed: string }>;
  /** Control effects applied (not conditional) whose duration wasn't found. */
  controlWithoutDuration: Array<{ ability: string; type: string; evidence: string }>;
}

export function measureCoverage(records: AbilityRecord[]): AbilityCoverage {
  const byKind: Record<string, number> = {};
  for (const record of records) byKind[record.kind] = (byKind[record.kind] ?? 0) + 1;
  const name = (record: AbilityRecord) => `${record.champion} ${record.kind} ${record.name}`;
  const leveling = records.flatMap((record) =>
    record.parts.flatMap((part) => part.leveling.map((stat) => ({ record, stat }))),
  );
  const mechanics = records.flatMap((record) =>
    record.parts.flatMap((part) => part.mechanics.map((mechanic) => ({ record, mechanic }))),
  );
  const control = mechanics.filter(({ mechanic }) => mechanic.category === "control" && !mechanic.conditional);
  return {
    records: records.length,
    champions: new Set(records.map((record) => record.champion)).size,
    byKind,
    levelingStats: leveling.length,
    levelingParsed: leveling.filter(({ stat }) => stat.amount.base && stat.amount.unparsed === "").length,
    mechanics: mechanics.length,
    controlEffects: control.length,
    controlWithDuration: control.filter(({ mechanic }) => mechanic.duration).length,
    unparsed: leveling
      .filter(({ stat }) => !stat.amount.base || stat.amount.unparsed !== "")
      .map(({ record, stat }) => ({
        ability: name(record),
        label: stat.label,
        text: stat.amount.text,
        unparsed: stat.amount.unparsed,
      })),
    controlWithoutDuration: control
      .filter(({ mechanic }) => !mechanic.duration)
      .map(({ record, mechanic }) => ({ ability: name(record), type: mechanic.type, evidence: mechanic.evidence })),
  };
}
