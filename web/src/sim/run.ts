/**
 * Runs simulated matchups for the app with a visitor's settings: both kits compiled with the
 * settings' kit options, the stat budget, the six scenarios. Pure (no DOM), so it runs in the
 * app's workers and in tests.
 */
import type { AbilityRecord, PetRecord, RuneRecord } from "../../../engine/abilities";
import type { BudgetStat, StatPrices } from "../../../engine/budget";
import { type CompiledKit, compileKit } from "../../../engine/kits/compile";
import { derive } from "../../../engine/sim/derived";
import { type KitVariant, bestMatchup } from "../../../engine/sim/matchup";
import type { ScenarioId } from "../../../engine/sim/scenarios";
import type { FighterSpec } from "../../../engine/sim/spec";
import { type LogEntry, newUnit } from "../../../engine/sim/state";
import type { Champion } from "../../../engine/types";
import { KITS } from "../../../kits/champions/index";
import { type AppSettings, kitOptionsFor, scenarioOptions } from "../settings";
import type { MatchupVariant } from "./protocol";

/** A champion's numbers in a fight: level-20 base stats plus what the stat budget bought. */
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
  stats: [StatLine, StatLine];
  assumptions: [string[], string[]];
  /** The kit options a side played when its kit had a choice (Udyr's rank split). */
  variant?: MatchupVariant;
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
}

const compiled = new Map<string, CompiledKit>();

/** The champion's kit with these options (compiled once per options). */
async function kitWith(source: SimSource, id: string, options: Record<string, number>): Promise<CompiledKit> {
  const key = `${id}|${JSON.stringify(options)}`;
  const known = compiled.get(key);
  if (known) return known;
  const module = KITS[id];
  if (!module) throw new Error(`${id} has no simulator kit`);
  const kit = compileKit(source.champion(id), await source.records(id), module, options, source.pets(id), source.runes);
  compiled.set(key, kit);
  return kit;
}

/** The champion's kit with the settings' options. */
export function kitFor(source: SimSource, id: string, settings: AppSettings): Promise<CompiledKit> {
  return kitWith(source, id, kitOptionsFor(settings, id));
}

const sameOptions = (a: Record<string, number>, b: Record<string, number>) => Object.keys({ ...a, ...b }).every((key) => a[key] === b[key]);

/**
 * The kits a side may play: its variants when its kit has a choice (Udyr's rank splits), or
 * just the one hinted at when it is still one of them; else the kit itself.
 */
async function sideKits(source: SimSource, id: string, settings: AppSettings, hint?: Record<string, number>): Promise<Array<{ kit: CompiledKit; variant: KitVariant }>> {
  const kit = await kitFor(source, id, settings);
  if (kit.variants.length === 0) return [{ kit, variant: { spec: kit.spec } }];
  const hinted = hint && kit.variants.find((options) => sameOptions(options, { ...kit.options, ...hint }));
  return Promise.all(
    (hinted ? [hinted] : kit.variants).map(async (options) => {
      const variantKit = await kitWith(source, id, options);
      return { kit: variantKit, variant: { spec: variantKit.spec, options } };
    }),
  );
}

function statLine(spec: FighterSpec): StatLine {
  const d = derive(newUnit(spec, 0, 0, spec.base.hp + (spec.bonus?.hp ?? 0), spec.base.resource));
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
    attackRange: spec.attack.range,
  };
}

export async function runMatchup(source: SimSource, you: string, enemy: string, settings: AppSettings, log: boolean, hint?: MatchupVariant): Promise<MatchupRun> {
  const mine = await sideKits(source, you, settings, hint?.side === 0 ? hint.options : undefined);
  const theirs = await sideKits(source, enemy, settings, hint?.side === 1 ? hint.options : undefined);
  const options = scenarioOptions(settings);
  const result = bestMatchup(
    mine.map((m) => m.variant),
    theirs.map((t) => t.variant),
    settings.gold,
    source.prices,
    { ...options, settings: { ...options.settings, log } },
  );
  // The kits that played: the chosen variant's, when a side had several.
  const played = (side: 0 | 1, kits: Array<{ kit: CompiledKit; variant: KitVariant }>) =>
    (result.variant?.side === side ? kits.find((k) => k.variant.options && sameOptions(k.variant.options, result.variant?.options ?? {})) : kits[0])?.kit ?? kits[0]?.kit;
  const a = played(0, mine);
  const b = played(1, theirs);
  if (!a || !b) throw new Error(`No kit for ${a ? enemy : you}`);
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
    stats: [statLine({ ...a.spec, bonus: result.builds[0].bonus }), statLine({ ...b.spec, bonus: result.builds[1].bonus })],
    assumptions: [a.assumptions, b.assumptions],
    ...(result.variant ? { variant: result.variant } : {}),
  };
}
