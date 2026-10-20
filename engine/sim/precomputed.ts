/** Provenance shared by the generated matrix, CLI and browser's dataset index. */
import { SCENARIOS, SCENARIO_WEIGHTS } from "./scenarios";
export interface SimulationProvenance {
  schema: 1;
  /** SHA-256 of the simulator sources, kit sources and parsed inputs. */
  fingerprint: string;
}

export interface PrecomputedMatchups {
  dataset: string;
  patch: string;
  gold: number;
  values: string[];
  simulation?: SimulationProvenance;
  matchups: Record<string, Record<string, Array<number | null>>>;
  variants?: Record<string, Record<string, Record<string, number>>>;
}

const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);

export function precomputedCurrent(raw: unknown, dataset: string, patch: string, fingerprint: string | undefined, gold: number, kitIds: string[]): boolean {
  if (!object(raw) || !object(raw.simulation) || !fingerprint || raw.simulation.schema !== 1 || raw.simulation.fingerprint !== fingerprint || raw.dataset !== dataset || raw.patch !== patch || raw.gold !== gold) return false;
  const expectedValues = ["score", ...SCENARIOS];
  if (!Array.isArray(raw.values) || raw.values.length !== expectedValues.length || !raw.values.every((value, i) => value === expectedValues[i])) return false;
  if (!object(raw.matchups) || Object.keys(raw.matchups).length !== kitIds.length) return false;
  const matchups = raw.matchups;
  const complete = kitIds.every((you) => {
    const row = matchups[you];
    if (!object(row) || Object.keys(row).length !== kitIds.length - 1 || you in row) return false;
    return kitIds.every((enemy) => {
      if (you === enemy) return true;
      const values = row[enemy];
      return Array.isArray(values) && values.length === SCENARIOS.length + 1 && typeof values[0] === "number"
        && values.slice(1).some((value) => typeof value === "number")
        && values.every((value, i) => (SCENARIOS[i - 1] === "spacing" && value === null) || (typeof value === "number" && Number.isFinite(value) && Math.abs(value) <= 1));
    });
  });
  if (!complete) return false;
  const rows = matchups as PrecomputedMatchups["matchups"];
  return kitIds.every((you) => kitIds.every((enemy) => {
    if (you === enemy) return true;
    const values = rows[you]![enemy]!;
    const reverse = rows[enemy]![you]!;
    const reciprocates = values.every((value, i) => {
      const opposite = reverse[i === 1 ? 2 : i === 2 ? 1 : i];
      return value === null ? opposite === null : typeof opposite === "number" && Math.abs(value + opposite) <= 1e-9;
    });
    if (!reciprocates) return false;
    let total = 0;
    let weighted = 0;
    SCENARIOS.forEach((id, i) => {
      const score = values[i + 1];
      if (score === null || score === undefined) return;
      total += SCENARIO_WEIGHTS[id];
      weighted += SCENARIO_WEIGHTS[id] * score;
    });
    // Scenario columns round to three decimals; the canonical aggregate stays exact.
    return total > 0 && Math.abs((values[0] ?? Number.NaN) - weighted / total) <= 0.0005 + 1e-9;
  }));
}
