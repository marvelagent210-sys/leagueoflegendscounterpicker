/**
 * Parses the rendered wiki page "List of champions/Statistics at level 20": every
 * champion form's base stats at level 20, computed by the wiki's own Lua module.
 * It is the test oracle for engine/stats.ts.
 */
import { textContent } from "../lib/html";

export interface Level20Row {
  /** Wiki name of the champion form, e.g. "Mega Gnar". */
  name: string;
  hp: number;
  hpRegen: number;
  /** Null when the wiki shows "-" (resources it doesn't tabulate). */
  resource: number | null;
  resourceRegen: number | null;
  attackDamage: number;
  attackSpeed: number;
  armor: number;
  magicResist: number;
  attackRange: number;
  moveSpeed: number;
}

const COLUMNS = ["Champion", "HP", "HP5", "MP", "MP5", "AD", "AS", "AR", "MR", "Range", "MS"] as const;

function cellsOf(row: string, tag: "td" | "th"): string[] {
  const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  return [...row.matchAll(pattern)].map((match) => textContent(match[1] ?? ""));
}

function parseNumber(text: string, row: string, column: string): number {
  const value = Number(text);
  if (text === "" || !Number.isFinite(value)) {
    throw new Error(`Level-20 table: "${row}" has a non-numeric ${column}: ${JSON.stringify(text)}`);
  }
  return value;
}

export function parseLevel20Table(html: string): Level20Row[] {
  const table = /<table\b[^>]*class="[^"]*\bsortable\b[^"]*"[^>]*>([\s\S]*?)<\/table>/.exec(html)?.[1];
  if (!table) throw new Error("Level-20 table: no sortable table found");
  const rows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((match) => match[1] ?? "");

  const header = rows.map((row) => cellsOf(row, "th")).find((cells) => cells.length > 0);
  if (!header || header.join("|") !== COLUMNS.join("|")) {
    throw new Error(`Level-20 table: unexpected columns ${JSON.stringify(header)}`);
  }

  const result: Level20Row[] = [];
  for (const row of rows) {
    const cells = cellsOf(row, "td");
    if (cells.length === 0) continue;
    if (cells.length !== COLUMNS.length) {
      throw new Error(`Level-20 table: row has ${cells.length} cells: ${JSON.stringify(cells)}`);
    }
    const [name, ...values] = cells as [string, ...string[]];
    const num = (index: number) => parseNumber(values[index] ?? "", name, COLUMNS[index + 1] ?? "?");
    const optional = (index: number) => (values[index] === "-" ? null : num(index));
    result.push({
      name,
      hp: num(0),
      hpRegen: num(1),
      resource: optional(2),
      resourceRegen: optional(3),
      attackDamage: num(4),
      attackSpeed: num(5),
      armor: num(6),
      magicResist: num(7),
      attackRange: num(8),
      moveSpeed: num(9),
    });
  }
  return result;
}
