/**
 * Runs simulated matchups for the app with a visitor's settings: both kits compiled with the
 * settings' kit options, the stat budget, the six scenarios. Pure (no DOM), so it runs in the
 * app's workers and in tests.
 */
import type { AbilityRecord, PetRecord, RuneRecord } from "../../../engine/abilities";
import type { BudgetStat, StatPrices } from "../../../engine/budget";
import { type CompiledKit, compileKit } from "../../../engine/kits/compile";
import { attackRange } from "../../../engine/sim/actions";
import { derive } from "../../../engine/sim/derived";
import { type KitVariant, bestMatchup } from "../../../engine/sim/matchup";
import { engageRange, type ScenarioId } from "../../../engine/sim/scenarios";
import { createWorld } from "../../../engine/sim/simulate";
import type { FighterSpec } from "../../../engine/sim/spec";
import { type LogEntry, type Unit, newUnit } from "../../../engine/sim/state";
import type { Champion } from "../../../engine/types";
import { KITS } from "../../../kits/champions/index";
import type { StatShardData } from "../../../runes/shardData";
import { equipShards } from "../../../runes/shards";
import { type AppSettings, kitOptionsFor, scenarioOptions } from "../settings";
import type { MatchupVariant } from "./protocol";

/** A champion's combat numbers at one explicitly identified point in initialization. */
export interface StatLine {
  maxHp: number;
  ad: number;
  ap: number;
  attackSpeed: number;
  critChance: number;
  armor: number;
  mr: number;
  abilityHaste: number;
  lethality: number;
  /** Percentage armor penetration from every source, combined. */
  armorPen: number;
  magicPen: number;
  magicPenPercent: number;
  moveSpeed: number;
  attackRange: number;
}

export interface OutcomeSummary {
  win: [number, number];
  draw: number;
  timeout: number;
  escaped: number;
  disengaged: number;
  hp: [number, number];
  seconds: number;
  branches: number;
  /** The most likely branch, when the run was logged. */
  timeline: LogEntry[];
}

export interface ScenarioRun {
  id: ScenarioId;
  score: number | null;
  note: string;
  outcomes: OutcomeSummary[];
}

export interface MatchupRun {
  you: string;
  enemy: string;
  score: number;
  scenarios: ScenarioRun[];
  /** Gold each side spent on each stat. */
  spent: [Record<BudgetStat, number>, Record<BudgetStat, number>];
  /** Chosen kit and purchased stats, before applying start effects or onStart hooks. */
  stats: [StatLine, StatLine];
  /** After initial kit effects in the You engage setup, before the first passive tick. */
  openingStats: [StatLine, StatLine];
  assumptions: [string[], string[]];
  /** The kit options each side played when its kit has a choice (Udyr's rank split, Heimerdinger's upgrade). */
  variants?: MatchupVariant[];
}

/** What a run needs from the dataset. */
export interface SimSource {
  champion(id: string): Champion;
  records(id: string): Promise<AbilityRecord[]>;
  /** The champion's pets; none for most. */
  pets(id: string): PetRecord[];
  /** The runes the simulator models (Triple Tonic). */
  runes: RuneRecord[];
  prices: StatPrices;
  /** Compact, source-validated shard rules, loaded only for an explicit selection. */
  statShards?(): Promise<StatShardData>;
}

// The same champion and options on another patch are different kits. WeakMap also lets
// a discarded dataset release all of its compiled kits.
const compiled = new WeakMap<SimSource, Map<string, Promise<CompiledKit>>>();

/** The champion's kit with these options (compiled once per options). */
async function kitWith(source: SimSource, id: string, options: Record<string, number>): Promise<CompiledKit> {
  let sourceCache = compiled.get(source);
  if (!sourceCache) {
    sourceCache = new Map();
    compiled.set(source, sourceCache);
  }
  const key = `${id}|${JSON.stringify(Object.entries(options).sort(([a], [b]) => a.localeCompare(b)))}`;
  const known = sourceCache.get(key);
  if (known) return known;
  const module = KITS[id];
  if (!module) throw new Error(`${id} has no simulator kit`);
  const kit = source.records(id).then((records) => compileKit(source.champion(id), records, module, options, source.pets(id), source.runes));
  sourceCache.set(key, kit);
  void kit.catch(() => sourceCache.delete(key));
  return kit;
}

/** The champion's kit with the settings' options. */
export function kitFor(source: SimSource, id: string, settings: AppSettings): Promise<CompiledKit> {
  return kitWith(source, id, kitOptionsFor(settings, id));
}

const sameOptions = (a: Record<string, number>, b: Record<string, number>) => Object.keys({ ...a, ...b }).every((key) => a[key] === b[key]);

interface SideKit {
  kit: CompiledKit;
  variant: KitVariant;
  shardAssumptions?: string[];
}

/**
 * The kits a side may play: its variants when its kit has a choice (Udyr's rank splits), or
 * the kit itself. Cached variant hints never restrict the options of a new run.
 */
async function sideKits(source: SimSource, id: string, settings: AppSettings): Promise<SideKit[]> {
  const kit = await kitFor(source, id, settings);
  if (kit.variants.length === 0) return [{ kit, variant: { spec: kit.spec } }];
  return Promise.all(
    kit.variants.map(async (options) => {
      const variantKit = await kitWith(source, id, options);
      return { kit: variantKit, variant: { spec: variantKit.spec, options } };
    }),
  );
}

function statLine(unit: Unit): StatLine {
  const d = derive(unit);
  const combined = (fractions: number[]) => 1 - fractions.reduce((left, p) => left * (1 - p), 1);
  return {
    maxHp: d.maxHp,
    ad: d.ad,
    ap: d.ap,
    attackSpeed: d.attackSpeed,
    critChance: d.critChance,
    armor: d.armor.base + d.armor.bonus,
    mr: d.mr.base + d.mr.bonus,
    abilityHaste: d.abilityHaste,
    lethality: d.lethality,
    armorPen: combined(d.armorPen),
    magicPen: d.magicPen,
    magicPenPercent: combined(d.magicPenPercent),
    moveSpeed: d.moveSpeed,
    attackRange: attackRange(unit),
  };
}

/**
 * Use the same initialization as a real duel, without advancing combat. Calling onTick
 * here would also fire Purge, damage-over-time and pets, changing the state being reported.
 */
export function combatStatSnapshots(fighters: [FighterSpec, FighterSpec], settings: AppSettings): { stats: [StatLine, StatLine]; openingStats: [StatLine, StatLine] } {
  const stats = fighters.map((spec, side) => statLine(newUnit(spec, side as 0 | 1, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.resourceStart ?? spec.base.resource))) as [StatLine, StatLine];
  const options = scenarioOptions(settings);
  const world = createWorld({
    fighters,
    distance: engageRange(fighters[0], fighters[1]),
    modes: ["fight", "fight"],
    settings: { ...options.settings, log: false },
  });
  return { stats, openingStats: [statLine(world.units[0]), statLine(world.units[1])] };
}

export async function runMatchup(source: SimSource, you: string, enemy: string, settings: AppSettings, log: boolean, _hints: MatchupVariant[] = []): Promise<MatchupRun> {
  const selections = [settings.shards?.you, settings.shards?.enemy] as const;
  const wantsShards = selections.some((selection) => selection !== null && selection !== undefined);
  if (wantsShards && !source.statShards) throw new Error("Stat-shard data is unavailable for this dataset; disable the shard selections or use a dataset with reviewed shard rules");
  const shardData = wantsShards ? await source.statShards!() : undefined;
  const addShards = (kits: SideKit[], id: string, side: 0 | 1): SideKit[] => {
    const selection = selections[side];
    if (selection === null || selection === undefined) return kits;
    if (!shardData) throw new Error("Stat-shard data is unavailable for the requested selections");
    return kits.map((entry) => {
      const equipped = equipShards(entry.variant.spec, selection, shardData.catalog, shardData.rules, {
        adaptiveType: source.champion(id).adaptiveType,
      });
      const names = equipped.selection.map((id) => `${shardData.catalog.shards.find((shard) => shard.id === id)!.name} (${id})`).join(", ");
      return { ...entry, variant: { ...entry.variant, spec: equipped.spec }, shardAssumptions: [`Stat shards: ${names}.`, ...equipped.assumptions] };
    });
  };
  const mine = addShards(await sideKits(source, you, settings), you, 0);
  const theirs = addShards(await sideKits(source, enemy, settings), enemy, 1);
  const options = scenarioOptions(settings);
  const result = bestMatchup(
    mine.map((m) => m.variant),
    theirs.map((t) => t.variant),
    settings.gold,
    source.prices,
    { ...options, settings: { ...options.settings, log } },
  );
  // The kits that played: the chosen variant's when a side had several, else its one kit (the hinted variant's, if any).
  const played = (side: 0 | 1, kits: SideKit[]) => {
    const chosen = result.variants?.find((v) => v.side === side);
    return (chosen ? kits.find((k) => k.variant.options && sameOptions(k.variant.options, chosen.options)) : undefined) ?? kits[0];
  };
  const a = played(0, mine);
  const b = played(1, theirs);
  if (!a || !b) throw new Error(`No kit for ${a ? enemy : you}`);
  const variants = [
    ...(a.variant.options ? [{ side: 0 as const, options: a.variant.options }] : []),
    ...(b.variant.options ? [{ side: 1 as const, options: b.variant.options }] : []),
  ];
  const statSnapshots = combatStatSnapshots([
    { ...a.variant.spec, bonus: result.builds[0].bonus },
    { ...b.variant.spec, bonus: result.builds[1].bonus },
  ], settings);
  return {
    you,
    enemy,
    score: result.score,
    scenarios: result.scenarios.map((s) => ({
      id: s.id,
      score: s.score ?? null,
      note: s.note,
      outcomes: s.outcomes.map((o) => ({
        win: o.win,
        draw: o.draw,
        timeout: o.timeout,
        escaped: o.escaped,
        disengaged: o.disengaged,
        hp: o.hp,
        seconds: o.seconds,
        branches: o.branches,
        timeline: o.timeline,
      })),
    })),
    spent: [result.builds[0].spent, result.builds[1].spent],
    ...statSnapshots,
    assumptions: [[...a.kit.assumptions, ...(a.shardAssumptions ?? [])], [...b.kit.assumptions, ...(b.shardAssumptions ?? [])]],
    ...(variants.length > 0 ? { variants } : {}),
  };
}
