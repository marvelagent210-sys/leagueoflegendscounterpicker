/** Explicit partial combat-rune selections; this does not equip a complete rune page. */
import type { RuneCatalog } from "./catalog";
import type { FighterSpec, KitHooks } from "../engine/sim/spec";
import { composeHooks, mapForms } from "../items/equip";
import type { CombatRuneRules, RuneEffectEvidence } from "./effectRules";
import { buildRuneEffect } from "./effectRuntime";
import { validateRunePage } from "./pages";

/** Initial effect inventory. An absent effect must never be treated as an inactive rune. */
export { MANUAL_COMBAT_RUNE_IDS as FIRST_COMBAT_RUNE_IDS } from "./effectIds";
import { MANUAL_COMBAT_RUNE_IDS as FIRST_COMBAT_RUNE_IDS } from "./effectIds";

export interface EquippedRuneEffects {
  spec: FighterSpec;
  /** The selected runes' outgoing effects, installed on the opposing fighter. */
  enemyHooks: KitHooks[];
  selection: number[];
  evidence: RuneEffectEvidence[];
  assumptions: string[];
}

const EQUIPPED = Symbol("combat-rune-equipment");
const OPPOSITION = Symbol("combat-rune-opposition");
type RuneSpec = FighterSpec & { [EQUIPPED]?: true; [OPPOSITION]?: true };

const positiveId = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0;

/**
 * A partial selection must fit some legal primary/secondary page. Filler choices
 * below only prove that a complete page is possible; they are never returned or
 * equipped. The complete catalog validator also rejects inconsistent source rows.
 */
export function validateCombatRuneSelection(
  catalog: RuneCatalog,
  value: unknown,
  supportedIds: readonly number[] = FIRST_COMBAT_RUNE_IDS,
): number[] {
  if (!catalog || catalog.schema !== 1 || !Array.isArray(catalog.paths)
    || !Array.isArray(catalog.runes) || !Array.isArray(catalog.shardSlots)
    || !Array.isArray(catalog.shards)) throw new Error("Invalid combat-rune catalog: a complete page layout is required");
  if (!Array.isArray(value) || value.length > 6 || !Array.from(value).every(positiveId)) {
    throw new Error("Combat-rune selection must contain at most six positive integer IDs");
  }
  const selected = [...value] as number[];
  if (new Set(selected).size !== selected.length) throw new Error("Combat-rune selection cannot repeat a rune");
  if (!Array.isArray(supportedIds) || !Array.from(supportedIds).every(positiveId)
    || new Set(supportedIds).size !== supportedIds.length) throw new Error("Combat-rune effect inventory is invalid");
  for (const id of selected) {
    if (!supportedIds.includes(id)) throw new Error(`Rune ${id} has no combat implementation`);
  }
  const records = selected.map((id) => {
    const rune = catalog.runes.find((entry) => entry?.id === id);
    if (!rune) throw new Error(`Rune ${id} is absent from the source catalog`);
    if (!positiveId(rune.pathId) || !Number.isInteger(rune.slot) || rune.slot < 0 || rune.slot > 3) {
      throw new Error(`Invalid combat-rune catalog location for rune ${id}`);
    }
    return rune;
  });
  if (new Set(records.map((rune) => rune.pathId)).size > 2) {
    throw new Error("Combat runes must fit at most two paths");
  }
  if (new Set(records.map((rune) => `${rune.pathId}:${rune.slot}`)).size !== records.length) {
    throw new Error("Combat runes cannot select two runes from the same path row");
  }
  if (records.filter((rune) => rune.slot === 0).length > 1) {
    throw new Error("Combat runes cannot select more than one keystone");
  }

  for (const primary of catalog.paths) {
    if (!primary || !Array.isArray(primary.slots) || primary.slots.length !== 4
      || !Array.isArray(primary.allowedSecondaryPathIds)) continue;
    for (const secondaryId of primary.allowedSecondaryPathIds) {
      const secondary = catalog.paths.find((path) => path?.id === secondaryId);
      if (!secondary || !Array.isArray(secondary.slots) || secondary.slots.length !== 4) continue;
      if (records.some((rune) => rune.pathId !== primary.id && rune.pathId !== secondary.id)) continue;
      const primaryRunes = records.filter((rune) => rune.pathId === primary.id);
      const secondaryRunes = records.filter((rune) => rune.pathId === secondary.id);
      if (secondaryRunes.length > 2 || secondaryRunes.some((rune) => rune.slot === 0)) continue;
      const primaryChoices = primary.slots.map((row, index) =>
        primaryRunes.find((rune) => rune.slot === index)?.id ?? (Array.isArray(row) ? row[0] : undefined));
      const secondaryChoices = secondaryRunes.map((rune) => rune.id);
      const usedRows = new Set(secondaryRunes.map((rune) => rune.slot));
      for (let row = 1; row < 4 && secondaryChoices.length < 2; row++) {
        if (usedRows.has(row)) continue;
        const choices = secondary.slots[row];
        if (Array.isArray(choices) && positiveId(choices[0])) secondaryChoices.push(choices[0]);
      }
      const page = validateRunePage(catalog, {
        primaryPathId: primary.id,
        secondaryPathId: secondary.id,
        primary: primaryChoices,
        secondary: secondaryChoices,
        shards: catalog.shardSlots.map((row) => Array.isArray(row) ? row[0] : undefined),
      });
      if (page.valid) return selected.sort((a, b) => a - b);
    }
  }
  throw new Error("Combat-rune selection cannot extend to a legal source-defined rune page");
}

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/** Freeze the numeric decision, not the caller's mutable source object. */
function checkedRules(catalog: RuneCatalog, value: CombatRuneRules): CombatRuneRules {
  if (!record(value) || value.schema !== 1 || typeof value.dataset !== "string"
    || !/^\d+\.\d+$/.test(value.dataset) || typeof value.patch !== "string"
    || !/^\d+\.\d+$/.test(value.patch) || value.dataset !== catalog.dataset || value.patch !== catalog.patch) {
    throw new Error("Combat-rune rules must identify the source catalog's dataset and patch");
  }
  const groups = {
    coupDeGrace: ["healthThreshold", "damageIncrease"],
    cutDown: ["healthThreshold", "damageIncrease"],
    lastStand: ["healthThreshold", "maximumHealthThreshold", "minimumDamageIncrease", "maximumDamageIncrease"],
    secondWind: ["duration", "missingHealthPerSecond", "tickInterval"],
  } as const;
  for (const [name, keys] of Object.entries(groups)) {
    const group: unknown = value[name as keyof typeof groups];
    if (!record(group)) throw new Error(`Invalid combat-rune rule ${name}`);
    for (const key of keys) {
      const amount = group[key];
      if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0
        || (key !== "duration" && key !== "tickInterval" && amount > 1)) {
        throw new Error(`Invalid combat-rune rule ${name}.${key}`);
      }
    }
  }
  if (value.lastStand.maximumHealthThreshold >= value.lastStand.healthThreshold
    || value.lastStand.minimumDamageIncrease > value.lastStand.maximumDamageIncrease) {
    throw new Error("Invalid combat-rune Last Stand threshold or damage interval");
  }
  if (value.secondWind.missingHealthModel !== "current-at-regeneration-tick"
    || value.secondWind.tickInterval > value.secondWind.duration) {
    throw new Error("Invalid combat-rune Second Wind regeneration model or interval");
  }
  if (!Array.isArray(value.evidence) || value.evidence.length === 0
    || Array.from(value.evidence).some((entry) => !record(entry) || typeof entry.title !== "string"
      || !entry.title.trim() || !positiveId(entry.revid) || typeof entry.text !== "string" || !entry.text.trim())) {
    throw new Error("Combat-rune rules need pinned source evidence");
  }
  return {
    schema: 1, dataset: value.dataset, patch: value.patch,
    coupDeGrace: { ...value.coupDeGrace }, cutDown: { ...value.cutDown },
    lastStand: { ...value.lastStand }, secondWind: { ...value.secondWind },
    evidence: value.evidence.map((entry) => ({ ...entry })),
  };
}

function hasMarker(spec: FighterSpec, marker: typeof EQUIPPED | typeof OPPOSITION): boolean {
  return (spec as RuneSpec)[marker] === true
    || Object.values(spec.forms ?? {}).some((form) => (form as RuneSpec)[marker] === true);
}

/** Preserve a caller's current-form spread (for example its purchased bonus). */
function mapCurrentForms(spec: FighterSpec, change: (form: FighterSpec) => FighterSpec): FighterSpec {
  return mapForms(spec, (form) => change(spec.forms && form.form === spec.form ? spec : form));
}

/**
 * Equip only the requested implemented effects. Their compatible page fillers
 * remain absent, and the source kit and its cyclic form graph remain reusable.
 */
export function equipRuneEffects(
  spec: FighterSpec,
  value: unknown,
  catalog: RuneCatalog,
  sourceRules: CombatRuneRules,
): EquippedRuneEffects {
  const selection = validateCombatRuneSelection(catalog, value);
  if (selection.length === 0) return { spec, selection, enemyHooks: [], evidence: [], assumptions: [] };
  if (hasMarker(spec, EQUIPPED)) throw new Error("Combat runes have already been equipped on this fighter");
  const rules = checkedRules(catalog, sourceRules);
  let enemyHooks: KitHooks[] = [];
  const assumptions = new Set<string>([
    "Only the explicitly selected combat rune effects are applied; this is a compatible partial selection, not a complete rune page.",
    "Rune effects on targets are limited to the actual champion body. Owned pets can trigger their owner's effects, but rune eligibility on clone and pet targets is not reviewed.",
    "The plain-stat allocation remains its no-rune reference; actual fights and variant comparisons include the selected effects. Rune-aware allocation and build search remain unfinished.",
  ]);
  const equipped = mapCurrentForms(spec, (form): RuneSpec => {
    const definitions = selection.map((id) => buildRuneEffect(id, form, rules));
    for (const definition of definitions) for (const assumption of definition.assumptions) assumptions.add(assumption);
    if (!spec.forms || form.form === spec.form) {
      enemyHooks = definitions.flatMap((definition) => definition.enemyHooks ?? []).map((hooks) => ({ ...hooks }));
    }
    const ownHooks = definitions.flatMap((definition) => definition.hooks ? [definition.hooks] : []);
    const hooks = composeHooks(form.hooks, ownHooks, [], false);
    return { ...form, [EQUIPPED]: true, ...(hooks ? { hooks } : {}) };
  });
  return {
    spec: equipped, selection: [...selection], enemyHooks,
    evidence: rules.evidence.map((entry) => ({ ...entry })), assumptions: [...assumptions],
  };
}

/** Both selected loadouts affect the correct opposing unit exactly once. */
export function runeMatchupSpecs(you: EquippedRuneEffects, enemy: EquippedRuneEffects): [FighterSpec, FighterSpec] {
  const withOpposition = (spec: FighterSpec, extra: KitHooks[]): FighterSpec => {
    if (extra.length === 0) return spec;
    if (hasMarker(spec, OPPOSITION)) throw new Error("Opposing combat-rune effects have already been applied to this fighter");
    const snapshot = extra.map((hooks) => ({ ...hooks }));
    return mapCurrentForms(spec, (form): RuneSpec => ({
      ...form, [OPPOSITION]: true, hooks: composeHooks(form.hooks, snapshot, [], false)!,
    }));
  };
  return [withOpposition(you.spec, enemy.enemyHooks), withOpposition(enemy.spec, you.enemyHooks)];
}
