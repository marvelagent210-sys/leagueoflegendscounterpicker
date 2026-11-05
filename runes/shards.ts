/** Explicit stat shards on a manual duel's fighter; full rune pages remain separate. */
import { TOP_LANE_MAX_LEVEL } from "../engine/stats";
import type { BonusStats, FighterSpec, HookContext } from "../engine/sim/spec";
import type { Status } from "../engine/sim/state";
import { mapForms } from "../items/equip";
import type { RuneCatalog } from "./catalog";
import type { ShardEvidence, ShardRules } from "./shardRules";

export type ShardSelection = [number, number, number];

export interface ShardEquipOptions {
  adaptiveType: "Physical" | "Magic";
  withItems?: boolean;
}

export interface EquippedShards {
  spec: FighterSpec;
  selection: ShardSelection;
  evidence: ShardEvidence[];
  assumptions: string[];
}

const SUPPORTED_IDS = new Set([5008, 5005, 5007, 5010, 5001, 5011, 5013]);
const EQUIPPED = Symbol("rune-shard-equipment");
const INITIALIZED = "rune-shards:initialized";
type ShardSpec = FighterSpec & { [EQUIPPED]?: true };

const positiveId = (value: unknown): value is number => typeof value === "number" && Number.isSafeInteger(value) && value > 0;

/** One ID per source-defined row; identical IDs in different eligible rows are valid. */
export function validateShardSelection(catalog: RuneCatalog, value: unknown): ShardSelection {
  if (!catalog || catalog.schema !== 1 || !Array.isArray(catalog.shardSlots) || catalog.shardSlots.length !== 3
    || !Array.isArray(catalog.shards)) throw new Error("Invalid shard catalog: three rows and a shard inventory are required");
  const inventory = Array.from(catalog.shards, (shard) => shard?.id);
  if (!inventory.every(positiveId) || new Set(inventory).size !== inventory.length) {
    throw new Error("Invalid shard catalog: shard IDs must be unique positive integers");
  }
  for (const [index, row] of catalog.shardSlots.entries()) {
    if (!Array.isArray(row) || row.length === 0 || !Array.from(row).every(positiveId)
      || new Set(row).size !== row.length || row.some((id) => !inventory.includes(id))) {
      throw new Error(`Invalid shard catalog: shard row ${index} has invalid choices`);
    }
  }
  if (!Array.isArray(value) || value.length !== 3 || !Array.from(value).every(positiveId)) {
    throw new Error("Shard selection must contain exactly three positive integer IDs (offense, flex, defense)");
  }
  for (const [index, shard] of value.entries()) {
    if (!catalog.shardSlots[index]!.includes(shard)) throw new Error(`Shard row ${index} cannot select shard ${shard}`);
    if (!SUPPORTED_IDS.has(shard)) throw new Error(`Shard ${shard} has no combat implementation`);
  }
  return [...value] as ShardSelection;
}

function checkedRules(rules: ShardRules): ShardRules {
  if (!rules || typeof rules !== "object") throw new Error("Source-backed shard rules are required");
  for (const key of ["adaptiveForce", "adaptiveAdRatio", "attackSpeed", "abilityHaste", "moveSpeed", "healthPerLevel", "health", "tenacity", "slowResist"] as const) {
    const value = rules[key];
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) throw new Error(`Invalid shard rule ${key}`);
  }
  for (const key of ["adaptiveAdRatio", "attackSpeed", "moveSpeed", "tenacity", "slowResist"] as const) {
    if (rules[key] > 1) throw new Error(`Shard rule ${key} must be a fraction`);
  }
  if (!Array.isArray(rules.evidence) || rules.evidence.length === 0 || rules.evidence.some((entry) =>
    !entry || typeof entry.title !== "string" || !entry.title.trim() || !positiveId(entry.revid)
      || typeof entry.text !== "string" || !entry.text.trim())) throw new Error("Shard rules need pinned source evidence");
  return { ...rules, evidence: rules.evidence.map((entry) => ({ ...entry })) };
}

function permanent(ctx: HookContext, kind: "state" | "stat", key: string, value: number): void {
  if (!value) return;
  const status: Status = {
    kind, key, value, source: ctx.self.side, startTick: ctx.tick, endTick: Infinity,
    ability: "Stat shards", memoKey: `rune-shards:${key}`, persistThroughDeath: true,
  };
  ctx.self.statuses.push(status);
}

/**
 * Equipment is installed at actual fight initialization, before the kit's setup.
 * The stat-budget reference deliberately disables onStart: it remains the original
 * no-shard allocation. The real fight and variant comparisons see the shard stats.
 * Pass only purchased bonus AD/AP as spec.bonus when adaptive shards are selected.
 */
export function equipShards(
  spec: FighterSpec,
  value: unknown,
  catalog: RuneCatalog,
  sourceRules: ShardRules,
  options: ShardEquipOptions,
): EquippedShards {
  const selection = validateShardSelection(catalog, value);
  const rules = checkedRules(sourceRules);
  if (!options || (options.adaptiveType !== "Physical" && options.adaptiveType !== "Magic")
    || (options.withItems !== undefined && typeof options.withItems !== "boolean")) throw new Error("A champion's valid adaptive type and item mode are required");
  const adaptiveType = options.adaptiveType;
  if (options.withItems && selection.includes(5008)) {
    throw new Error("Adaptive shard 5008 with item builds is not supported yet: eligible item-passive stats require separate source-qualified selection");
  }
  if (Object.values(spec.forms ?? { main: spec }).some((form) => (form as ShardSpec)[EQUIPPED])) {
    throw new Error("Stat shards have already been equipped on this fighter");
  }
  const count = (id: number) => selection.filter((chosen) => chosen === id).length;
  const adaptive = count(5008) * rules.adaptiveForce;
  const hp = count(5001) * rules.healthPerLevel * TOP_LANE_MAX_LEVEL + count(5011) * rules.health;
  const attackSpeed = count(5005) * rules.attackSpeed;
  const abilityHaste = count(5007) * rules.abilityHaste;
  const moveSpeed = count(5010) * rules.moveSpeed;
  const tenacity = count(5013) * rules.tenacity;
  const slowResist = count(5013) * rules.slowResist;
  const equipped = mapForms(spec, (form): ShardSpec => {
    const own = form.hooks?.onStart;
    return {
      ...form,
      [EQUIPPED]: true,
      hooks: {
        ...form.hooks,
        onStart(ctx) {
          if (ctx.memory[INITIALIZED] === true) return;
          const previous = ctx.self.spec.bonus ?? {};
          const boughtAd = previous.ad ?? 0, boughtAp = previous.ap ?? 0;
          if (adaptive && ![boughtAd, boughtAp].every((number) => Number.isFinite(number) && number >= 0)) {
            throw new Error("Adaptive shard selection requires finite, nonnegative purchased bonus AD and AP");
          }
          const physical = boughtAd === boughtAp ? adaptiveType === "Physical" : boughtAd > boughtAp;
          const bonus: BonusStats = { ...previous };
          const add = (key: keyof BonusStats, amount: number) => { if (amount) bonus[key] = (bonus[key] ?? 0) + amount; };
          const ad = physical ? adaptive * rules.adaptiveAdRatio : 0;
          const ap = physical ? 0 : adaptive;
          add("ad", ad);
          add("ap", ap);
          add("hp", hp);
          add("attackSpeed", attackSpeed);
          add("abilityHaste", abilityHaste);
          ctx.self.spec = { ...ctx.self.spec, bonus };
          // Exact contributions already included in bonus, not another stat grant.
          // Living Weapon excludes these rune stats. Scalar unit memory follows
          // forms/death and is copied by branch cloning without sharing objects.
          ctx.memory["rune-shards:ad"] = ad;
          ctx.memory["rune-shards:ap"] = ap;
          ctx.memory["rune-shards:attackSpeed"] = attackSpeed;
          ctx.memory[INITIALIZED] = true;
          if (adaptive) ctx.memory["rune-shards:adaptive-type"] = physical ? "Physical" : "Magic";
          permanent(ctx, "stat", "moveSpeedPercent", moveSpeed);
          permanent(ctx, "state", "tenacity", tenacity);
          permanent(ctx, "stat", "slowResist", slowResist);
          own?.call(form.hooks, ctx);
        },
      },
    };
  });
  const assumptions = [
    "Stat shards are applied at level 20. Full rune-page effects and champion-specific rune substitutions are not selected by these shard options.",
    "The plain-stat budget remains its no-shard reference allocation; actual fights and variant comparisons include the selected shards. This is not a shard-aware allocation or build search.",
    "Adaptive shards compare raw purchased bonus AD with AP before adding any adaptive shard; champion passive stats are excluded, and equal purchased stats use the champion's recorded adaptive type.",
    "The scaling-health shard uses the pinned Rune article's 10 health per level through level 20 (200), rather than the client tooltip's 180 endpoint.",
    "The spacing scenario qualifies using base movement speeds; movement-speed shards change movement during fights but do not create a new spacing scenario.",
  ];
  if (Object.values(spec.forms ?? { main: spec }).some((form) => form.id === "kai-sa")) {
    assumptions.push("Rune AD, AP and attack speed improve combat stats but do not qualify for Kai'Sa's Living Weapon evolutions; attack-speed shards still shorten Supercharge's charge time.");
  }
  if (selection.includes(5013)) assumptions.push("Shard tenacity is a separate multiplicative source. The existing newer Courage-specific exception is retained where it conflicts with the generic tenacity grouping table.");
  return { spec: equipped, selection: [...selection], evidence: rules.evidence.map((entry) => ({ ...entry })), assumptions };
}
