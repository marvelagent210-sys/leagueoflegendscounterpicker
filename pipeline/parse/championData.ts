/** Typed view of the wiki's Module:ChampionData/data. */
import type { FormStats, WindupStats } from "../../engine/types";
import { type LuaTable, type LuaValue, parseLuaModule } from "./lua";

/** Collision radius the game uses when a champion doesn't override it. */
export const DEFAULT_GAMEPLAY_RADIUS = 65;
/** Windup percent for champions with no windup data (the game's default 30%). */
const DEFAULT_WINDUP_PERCENT = 0.3;

export interface WikiChampionEntry {
  /** Key in the module, e.g. "Kled & Skaarl". */
  name: string;
  /** Champion key; forms carry a fractional part, e.g. 240.1. */
  id: number;
  apiname: string;
  title: string;
  resource: string;
  rangeType: "Melee" | "Ranged";
  adaptiveType: "Physical" | "Magic";
  /** Patch of the latest change, e.g. "26.20". */
  lastChanged: string;
  roles: string[];
  positions: string[];
  stats: FormStats;
}

function isTable(value: LuaValue | undefined): value is LuaTable {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

class EntryReader {
  constructor(
    private readonly name: string,
    private readonly table: LuaTable,
  ) {}

  private fail(field: string, expected: string): never {
    throw new Error(`ChampionData "${this.name}": field "${field}" should be ${expected}`);
  }

  number(field: string, table: LuaTable = this.table): number {
    const value = table[field];
    if (typeof value !== "number" || !Number.isFinite(value)) this.fail(field, "a number");
    return value;
  }

  optionalNumber(field: string, table: LuaTable = this.table): number | undefined {
    return table[field] === undefined ? undefined : this.number(field, table);
  }

  string(field: string): string {
    const value = this.table[field];
    if (typeof value !== "string") this.fail(field, "a string");
    return value;
  }

  oneOf<T extends string>(field: string, options: readonly T[]): T {
    const value = this.string(field);
    if (!(options as readonly string[]).includes(value)) this.fail(field, `one of ${options.join(", ")}`);
    return value as T;
  }

  strings(field: string): string[] {
    const value = this.table[field];
    if (value === undefined) return [];
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
      this.fail(field, "a list of strings");
    }
    return value as string[];
  }

  subtable(field: string): LuaTable {
    const value = this.table[field];
    if (!isTable(value)) this.fail(field, "a table");
    return value;
  }
}

function windup(reader: EntryReader, stats: LuaTable): WindupStats {
  const modifier = reader.optionalNumber("windup_modifier", stats) ?? 1;
  const castTime = reader.optionalNumber("attack_cast_time", stats);
  const totalTime = reader.optionalNumber("attack_total_time", stats);
  if (castTime !== undefined && totalTime !== undefined) {
    return { percent: castTime / totalTime, modifier, source: "castTime" };
  }
  const offset = reader.optionalNumber("attack_delay_offset", stats);
  if (offset !== undefined) return { percent: DEFAULT_WINDUP_PERCENT + offset, modifier, source: "offset" };
  return { percent: DEFAULT_WINDUP_PERCENT, modifier, source: "default" };
}

function formStats(reader: EntryReader, stats: LuaTable): FormStats {
  const growth = (base: string, perLevel: string) => ({
    base: reader.number(base, stats),
    perLevel: reader.number(perLevel, stats),
  });
  const missileSpeed = reader.optionalNumber("missile_speed", stats);
  const pathingRadius = reader.optionalNumber("pathing_radius", stats);
  const selectionRadius = reader.optionalNumber("selection_radius", stats);
  // Not read here: "range_lvl" (Mini Gnar's bonus range comes from his innate ability)
  // and per-game-mode tables such as "aram" or "urf".
  return {
    hp: growth("hp_base", "hp_lvl"),
    hpRegen: growth("hp5_base", "hp5_lvl"),
    resource: growth("mp_base", "mp_lvl"),
    resourceRegen: growth("mp5_base", "mp5_lvl"),
    armor: growth("arm_base", "arm_lvl"),
    magicResist: growth("mr_base", "mr_lvl"),
    attackDamage: growth("dam_base", "dam_lvl"),
    attackSpeed: {
      base: reader.number("as_base", stats),
      ratio: reader.number("as_ratio", stats),
      bonusPerLevel: reader.number("as_lvl", stats),
    },
    attackRange: reader.number("range", stats),
    moveSpeed: reader.number("ms", stats),
    windup: windup(reader, stats),
    critDamageModifier: reader.optionalNumber("crit_mod", stats) ?? 1,
    gameplayRadius: reader.optionalNumber("gameplay_radius", stats) ?? DEFAULT_GAMEPLAY_RADIUS,
    ...(missileSpeed === undefined ? {} : { missileSpeed }),
    ...(pathingRadius === undefined ? {} : { pathingRadius }),
    ...(selectionRadius === undefined ? {} : { selectionRadius }),
  };
}

function parseEntry(name: string, value: LuaValue): WikiChampionEntry {
  if (!isTable(value)) throw new Error(`ChampionData "${name}" is not a table`);
  const reader = new EntryReader(name, value);
  const changes = reader.string("changes");
  return {
    name,
    id: reader.number("id"),
    apiname: reader.string("apiname"),
    title: reader.string("title"),
    resource: reader.string("resource"),
    rangeType: reader.oneOf("rangetype", ["Melee", "Ranged"] as const),
    adaptiveType: reader.oneOf("adaptivetype", ["Physical", "Magic"] as const),
    lastChanged: changes.replace(/^V/, ""),
    roles: reader.strings("role"),
    positions: reader.strings("client_positions"),
    stats: formStats(reader, reader.subtable("stats")),
  };
}

export function parseChampionData(source: string): WikiChampionEntry[] {
  const root = parseLuaModule(source);
  if (!isTable(root)) throw new Error("ChampionData module should return a table of champions");
  return Object.entries(root).map(([name, value]) => parseEntry(name, value));
}
