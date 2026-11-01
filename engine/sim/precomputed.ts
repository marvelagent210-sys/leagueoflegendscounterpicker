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

/**
 * The build matrix (npm run build:builds, PLAN.md §13): each pairing played with the item builds
 * the build search finds for its two sides, instead of plain stats.
 */
export interface PrecomputedBuilds {
  dataset: string;
  patch: string;
  /** The build format: six items ("sixItems"), or five items and boots. */
  format: string;
  values: string[];
  simulation?: SimulationProvenance;
  matchups: Record<string, Record<string, Array<number | null>>>;
  /** The items the builds name, by index. */
  items: string[];
  /** Each side's build against the other, as indices into `items`: builds[you][enemy] is yours. */
  builds: Record<string, Record<string, number[]>>;
  variants?: Record<string, Record<string, Record<string, number>>>;
}

export function precomputedCurrent(raw: unknown, dataset: string, patch: string, fingerprint: string | undefined, gold: number, kitIds: string[]): boolean {
  if (!object(raw) || !object(raw.simulation) || !fingerprint || raw.simulation.schema !== 1 || raw.simulation.fingerprint !== fingerprint || raw.dataset !== dataset || raw.patch !== patch || raw.gold !== gold) return false;
  return matchupsComplete(raw, kitIds);
}

/** Whether a build matrix is the current inputs' (`fingerprint`, buildsProvenance) and complete: every pairing scored, both builds named. */
export function precomputedBuildsCurrent(raw: unknown, dataset: string, patch: string, fingerprint: string | undefined, format: string, kitIds: string[]): boolean {
  if (!object(raw) || !object(raw.simulation) || !fingerprint || raw.simulation.schema !== 1 || raw.simulation.fingerprint !== fingerprint || raw.dataset !== dataset || raw.patch !== patch || raw.format !== format) return false;
  return buildsComplete(raw, kitIds) && matchupsComplete(raw, kitIds);
}

/** Every pairing has both sides' builds: one to six different items each, by index into `items`. */
export function buildsComplete(raw: Record<string, unknown>, kitIds: string[]): boolean {
  if (!object(raw.builds) || !Array.isArray(raw.items) || !raw.items.every((item) => typeof item === "string" && item.length > 0)) return false;
  const builds = raw.builds;
  const count = raw.items.length;
  return kitIds.every((you) => {
    const row = builds[you];
    return object(row) && kitIds.every((enemy) => {
      if (you === enemy) return !(enemy in row);
      const items = row[enemy];
      return Array.isArray(items) && items.length >= 1 && items.length <= 6 && items.every((item) => Number.isSafeInteger(item) && item >= 0 && item < count) && new Set(items).size === items.length;
    });
  });
}

/** Every pairing scored both ways, each the other's negative, its aggregate the scenarios' weighted mean. */
function matchupsComplete(raw: Record<string, unknown>, kitIds: string[]): boolean {
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
