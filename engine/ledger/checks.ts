/**
 * One function per interaction check of PLAN.md §5. Each takes the kit that owns the
 * counter and the kit it is used against, and returns the entries that favor the owner.
 */
import type { CrowdControlRule } from "../glossary";
import type { AbilityProfile, Applied, BasicAttackProfile, Evidence, KitProfile, SelfState } from "../profiles";
import type { AbilityRef, CheckId, LedgerEntry } from "./types";
import { DISABLING, IMMOBILIZING, WEIGHTS, abilityWeight, attackWeight, availability, ccImportance, completeness, round2 } from "./weights";

export interface LedgerContext {
  /** Revision of each wiki glossary page, for citing definitions. */
  pages: Record<string, number>;
  crowdControl: CrowdControlRule[];
}

export type Check = (own: KitProfile, other: KitProfile, ctx: LedgerContext) => LedgerEntry[];

// ---------------------------------------------------------------------------------------
// Helpers

const ref = (ability: AbilityProfile): AbilityRef => ({ champion: ability.champion, kind: ability.kind, name: ability.name });
const attackRef = (kit: KitProfile): AbilityRef => ({ champion: kit.champion, kind: "A", name: "Basic attacks" });

function definition(ctx: LedgerContext, page: string, quote?: string): Evidence {
  return { page, ...(ctx.pages[page] !== undefined ? { revid: ctx.pages[page] } : {}), ...(quote ? { quote } : {}) };
}

/** An ability that does something to the enemy: damage, crowd control or an execute. */
function isThreat(ability: AbilityProfile): boolean {
  if (ability.delivery.attack === "attack modifier") return false; // counted with the basic attacks
  if (!ability.delivery.affectsEnemies) return false;
  return ability.damageTypes.length > 0 || ability.applies.some((a) => a.type !== "reveal") || ability.execute !== undefined;
}

/** A spell a player saves a dodge or a shield for: the ultimate, crowd control that stops or disables them, or a targeted spell. */
function isKeySpell(ability: AbilityProfile): boolean {
  if (!isThreat(ability)) return false;
  return (
    ability.kind === "R" ||
    ability.applies.some((a) => IMMOBILIZING.has(a.type) || DISABLING.has(a.type)) ||
    ability.delivery.targeting.includes("unit") ||
    ability.execute !== undefined
  );
}

/** Seconds between the cast starting and the effect landing: cast time plus missile travel at max range. */
function window(ability: AbilityProfile): number | undefined {
  const travel = ability.speed && ability.range ? ability.range / ability.speed : 0;
  return ability.castTime === undefined ? (travel > 0 ? travel : undefined) : ability.castTime + travel;
}

function seconds(value: number | undefined): string {
  return value === undefined ? "?" : `${Number(value.toFixed(2))} s`;
}

/** Reaction factor: a counter shorter than ~1.5 s must be timed; against a near-instant spell that needs prediction. */
function reactionFactor(toolDuration: number | undefined, victim: AbilityProfile): number {
  if (toolDuration !== undefined && toolDuration >= 1.5) return 1;
  const w = window(victim);
  return w !== undefined && w < WEIGHTS.reaction ? WEIGHTS.needsPrediction : 1;
}

/** When a defensive state works against a spell: "Spell shield for 1.5 s, timed to ...". */
function reactionText(label: string, toolDuration: number | undefined, victim: AbilityProfile): string {
  const w = window(victim);
  const state = `${label} for ${seconds(toolDuration)}`;
  if (toolDuration !== undefined && toolDuration >= 1.5) return `${state}, long enough to use ahead of ${victim.name}`;
  if (w === undefined) return `${state}, timed to ${victim.name}`;
  return w < WEIGHTS.reaction
    ? `${state}; ${victim.name} lands within ${seconds(w)}, faster than a ${seconds(WEIGHTS.reaction)} reaction, so it needs prediction`
    : `${state}; ${victim.name} takes ${seconds(w)} to land, enough to react`;
}

/** How often the counter can answer the spell: the share of the spell's casts its cooldown covers. */
function answerRate(tool: AbilityProfile, victim: AbilityProfile): number {
  const toolCooldown = tool.cooldown ?? 10;
  const victimCooldown = victim.cooldown ?? 10;
  const rate = toolCooldown <= 0 ? 1 : Math.min(1, victimCooldown / toolCooldown);
  return WEIGHTS.availabilityFloor + (1 - WEIGHTS.availabilityFloor) * rate;
}

function uptimeText(tool: AbilityProfile, duration: number | undefined): string {
  return `${tool.name} lasts ${seconds(duration)} on a ${seconds(tool.cooldown)} cooldown`;
}

function entry(
  check: CheckId,
  own: KitProfile,
  by: AbilityRef,
  against: AbilityRef,
  fields: Omit<LedgerEntry, "check" | "favors" | "by" | "against" | "conditions" | "impact"> & { conditions?: string[]; impact: number },
): LedgerEntry {
  return { check, favors: own.champion, by, against, conditions: fields.conditions ?? [], ...fields, impact: round2(fields.impact) };
}

function stateOf(ability: AbilityProfile, state: SelfState["state"]): SelfState | undefined {
  return ability.states.find((s) => s.state === state);
}

/** States that come from dying, dismounting or transforming, not from a choice made in the fight. */
const NOT_ON_DEMAND = /fatal damage|\bdies\b|\bdeath\b|dismount|zombie|resurrection|reviv|transformation|summoning platform|lethal damage/i;
/** States that arrive only after a channel or delay (Galio's and Pantheon's ultimates), too late to react with. */
const DELAYED = /\bafter (?:channeling|a delay|\d)|\bchannels? for [^.]* before\b|\bupon completion\b/i;

/**
 * A defensive state the champion can use in reaction to a spell: from an ability they cast
 * without a long cast time or a channel first. Innates only count for crowd control
 * immunity that is up on its own (Malzahar's Void Shift).
 */
function onDemand(ability: AbilityProfile, state: SelfState): boolean {
  const text = [state.condition ?? "", ...state.evidence.map((e) => e.quote ?? "")].join(" ");
  if (NOT_ON_DEMAND.test(text)) return false;
  if (ability.kind === "I") return state.state === "cc immune";
  if ((ability.castTime ?? 0) > 0.5) return false;
  return !DELAYED.test(text);
}

/** A state the ability grants that can be used on demand. */
function usableState(ability: AbilityProfile, state: SelfState["state"]): SelfState | undefined {
  const found = stateOf(ability, state);
  return found && onDemand(ability, found) ? found : undefined;
}

function appliedOf(ability: AbilityProfile, type: string): Applied | undefined {
  return ability.applies.find((a) => a.type === type);
}

/** The ability's wiki notes on an interaction, e.g. "The whirlwind is a missile and can therefore be intercepted." */
function notesAbout(ability: AbilityProfile, words: RegExp): string[] {
  return (ability.notes ?? []).filter((note) => words.test(note)).slice(0, 2);
}

const primaryAttack = (kit: KitProfile): BasicAttackProfile | undefined => kit.attacks[0];

// ---------------------------------------------------------------------------------------
// Checks against basic attacks and attack-based abilities

/** Abilities that strike as basic attacks or apply on-hit effects, which parries stop. */
function parryable(ability: AbilityProfile, includeOnHit: boolean): boolean {
  const parry = ability.delivery.parry;
  if (parry !== "yes" && parry !== "partly") return false;
  if (!isThreat(ability)) return false;
  return ability.delivery.attack === "attack" || (includeOnHit && ability.delivery.attack === "on-hit");
}

export const projectileBlock: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const state = usableState(tool, "projectile block");
    if (!state) continue;
    const evidence = [...state.evidence, definition(ctx, "Projectile")];
    const up = availability(state.duration, tool.cooldown);
    const projectileForms = other.attacks.filter((a) => a.projectile);
    if (projectileForms.length > 0) {
      const all = projectileForms.length === other.attacks.length;
      entries.push(
        entry("projectile block", own, ref(tool), attackRef(other), {
          effect: all ? "negates" : "partly negates",
          summary: `${tool.name} blocks ${other.name}'s basic attacks, which are projectiles${all ? "" : ` (in ${projectileForms.map((f) => f.formName).join(", ")})`}.`,
          timing: uptimeText(tool, state.duration),
          impact: attackWeight(other) * up * (all ? 1 : WEIGHTS.partly),
          evidence,
        }),
      );
    }
    for (const victim of other.abilities) {
      const tri = victim.delivery.projectile;
      if ((tri !== "yes" && tri !== "partly") || !isThreat(victim)) continue;
      entries.push(
        entry("projectile block", own, ref(tool), ref(victim), {
          effect: tri === "yes" ? "negates" : "partly negates",
          summary: `${tool.name} blocks ${tri === "yes" ? "" : "part of "}${other.name}'s ${victim.name}, a projectile.`,
          timing: reactionText(tool.name, state.duration, victim),
          conditions: tri === "partly" ? ["Only part of the ability is a projectile.", ...notesAbout(victim, /missile|projectile|intercept|wind wall/i)] : [],
          impact: abilityWeight(victim, other) * completeness(tri) * answerRate(tool, victim) * reactionFactor(state.duration, victim),
          evidence: [...evidence, { page: victim.page.title, revid: victim.page.revid, quote: `projectile: ${tri === "yes" ? "true" : "special"}` }],
        }),
      );
    }
  }
  return entries;
};

export const spellShield: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const state = usableState(tool, "spell shield");
    if (!state) continue;
    for (const victim of other.abilities) {
      const tri = victim.delivery.spellShield;
      if ((tri !== "yes" && tri !== "partly") || !isKeySpell(victim)) continue;
      entries.push(
        entry("spell shield", own, ref(tool), ref(victim), {
          effect: tri === "yes" ? "negates" : "partly negates",
          summary: `${tool.name}'s spell shield blocks ${tri === "yes" ? "" : "part of "}${other.name}'s ${victim.name}.`,
          timing: reactionText("Spell shield", state.duration, victim),
          conditions: ["A spell shield blocks only the first enemy ability that reaches it.", ...(tri === "partly" ? notesAbout(victim, /spell shield/i) : [])],
          impact: abilityWeight(victim, other) * completeness(tri) * answerRate(tool, victim) * reactionFactor(state.duration, victim),
          evidence: [...state.evidence, definition(ctx, "Spell shield"), { page: victim.page.title, revid: victim.page.revid, quote: `spellshield: ${tri === "yes" ? "true" : "special"}` }],
        }),
      );
    }
  }
  return entries;
};

export const parry: Check = (own, other) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const state = usableState(tool, "parry");
    if (!state) continue;
    const stun = appliedOf(tool, "stun");
    for (const victim of other.abilities) {
      if (!isKeySpell(victim)) continue;
      const immobilizes = victim.applies.some((a) => IMMOBILIZING.has(a.type));
      const conditions = immobilizes && stun ? [`Negating ${victim.name}'s immobilizing effect turns ${tool.name}'s slow into a stun${stun.duration ? ` (${seconds(stun.duration)})` : ""}.`] : [];
      entries.push(
        entry("parry", own, ref(tool), ref(victim), {
          effect: "negates",
          summary: `${tool.name} parries ${other.name}'s ${victim.name}${immobilizes && stun ? " and stuns back" : ""}.`,
          timing: reactionText("Parry", state.duration, victim),
          conditions,
          impact: abilityWeight(victim, other) * answerRate(tool, victim) * reactionFactor(state.duration, victim) + (conditions.length > 0 ? 0.1 : 0),
          evidence: [...state.evidence, ...(stun ? stun.evidence : [])],
        }),
      );
    }
  }
  return entries;
};

function attackCounter(check: "attack dodge" | "attack block", state: "dodge attacks" | "block attacks"): Check {
  return (own, other, ctx) => {
    const entries: LedgerEntry[] = [];
    const verb = check === "attack dodge" ? "dodges" : "blocks";
    for (const tool of own.abilities) {
      const found = stateOf(tool, state);
      if (!found) continue;
      const evidence = [...found.evidence, definition(ctx, check === "attack dodge" ? "Template:Tip data/Dodge" : "Template:Tip data/Block")];
      entries.push(
        entry(check, own, ref(tool), attackRef(other), {
          effect: "negates",
          summary: `${tool.name} ${verb} ${other.name}'s basic attacks${primaryAttack(other)?.modifiers.length ? ` (with ${primaryAttack(other)?.modifiers.join(", ")})` : ""}.`,
          timing: uptimeText(tool, found.duration),
          impact: attackWeight(other) * availability(found.duration, tool.cooldown),
          evidence,
        }),
      );
      for (const victim of other.abilities.filter((a) => parryable(a, true))) {
        entries.push(
          entry(check, own, ref(tool), ref(victim), {
            effect: victim.delivery.parry === "yes" ? "negates" : "partly negates",
            summary: `${tool.name} ${verb} ${other.name}'s ${victim.name}${victim.delivery.attack === "attack" ? ", an empowered attack" : ", which applies on-hit effects"}.`,
            timing: uptimeText(tool, found.duration),
            conditions: notesAbout(victim, /\b(?:parr\w*|dodg\w*|block\w*)\b/i),
            impact: abilityWeight(victim, other) * completeness(victim.delivery.parry) * answerRate(tool, victim),
            evidence: [...evidence, { page: victim.page.title, revid: victim.page.revid, quote: `parry: ${victim.delivery.parry === "yes" ? "true" : "special"}` }],
          }),
        );
      }
    }
    return entries;
  };
}

export const attackDodge = attackCounter("attack dodge", "dodge attacks");
export const attackBlock = attackCounter("attack block", "block attacks");

export const blind: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const effect = appliedOf(tool, "blind");
    if (!effect || effect.condition) continue;
    const evidence = [...effect.evidence, definition(ctx, "Template:Tip data/Blind"), definition(ctx, "Types of Crowd Control", "Blind has no effect on abilities that trigger on-hit effects")];
    entries.push(
      entry("blind", own, ref(tool), attackRef(other), {
        effect: "negates",
        summary: `${tool.name}'s blind makes ${other.name}'s basic attacks miss for ${seconds(effect.duration)}.`,
        timing: `Blind for ${seconds(effect.duration)} on a ${seconds(tool.cooldown)} cooldown`,
        impact: attackWeight(other) * availability(effect.duration, tool.cooldown),
        evidence,
      }),
    );
    for (const victim of other.abilities.filter((a) => parryable(a, false))) {
      entries.push(
        entry("blind", own, ref(tool), ref(victim), {
          effect: "negates",
          summary: `${tool.name}'s blind makes ${other.name}'s ${victim.name}, an empowered attack, miss.`,
          timing: `Blind for ${seconds(effect.duration)}`,
          impact: abilityWeight(victim, other) * completeness(victim.delivery.parry) * availability(effect.duration, tool.cooldown),
          evidence,
        }),
      );
    }
  }
  return entries;
};

export const disarmAndCripple: Check = (own, other) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    for (const effect of tool.applies) {
      if (effect.condition) continue;
      if (effect.type === "disarm") {
        entries.push(
          entry("disarm", own, ref(tool), attackRef(other), {
            effect: "negates",
            summary: `${tool.name} disarms ${other.name} for ${seconds(effect.duration)}: no basic attacks.`,
            timing: `Disarm for ${seconds(effect.duration)} on a ${seconds(tool.cooldown)} cooldown`,
            impact: attackWeight(other) * availability(effect.duration, tool.cooldown),
            evidence: effect.evidence,
          }),
        );
      } else if (effect.type === "cripple" || effect.type === "attack speed slow") {
        const amount = effect.amount ?? 30;
        entries.push(
          entry("attack speed slow", own, ref(tool), attackRef(other), {
            effect: "reduces",
            summary: `${tool.name} cuts ${other.name}'s attack speed by ${amount}%${effect.duration ? ` for ${seconds(effect.duration)}` : ""}.`,
            timing: `${seconds(effect.duration)} on a ${seconds(tool.cooldown)} cooldown`,
            impact: attackWeight(other) * (amount / 100) * availability(effect.duration, tool.cooldown),
            evidence: effect.evidence,
          }),
        );
      }
    }
  }
  return entries;
};

export const attackReflect: Check = (own, other) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const state = stateOf(tool, "reflect attacks");
    if (!state) continue;
    entries.push(
      entry("attack reflect", own, ref(tool), attackRef(other), {
        effect: "punishes",
        summary: `${tool.name} deals damage back to ${other.name} for each basic attack.`,
        timing: uptimeText(tool, state.duration),
        impact: attackWeight(other) * availability(state.duration, tool.cooldown) * WEIGHTS.situational,
        evidence: state.evidence,
      }),
    );
  }
  return entries;
};

// ---------------------------------------------------------------------------------------
// Checks against movement

/** States that let a dash through Poppy's W and knockdowns (the wiki's knockdown and dash pages). */
const DASH_PROTECTION = new Set<SelfState["state"]>(["cc immune", "displacement immune", "untargetable", "spell shield", "stasis"]);

function stoppableDashes(other: KitProfile): AbilityProfile[] {
  return other.abilities.filter(
    (a) =>
      a.movement.some((m) => m.type === "dash" && m.interruptible !== false) &&
      !a.states.some((s) => DASH_PROTECTION.has(s.state)),
  );
}

export const dashStop: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const cancel = appliedOf(tool, "dash cancel");
    const knockdown = appliedOf(tool, "knockdown");
    if (!cancel && !knockdown) continue;
    for (const victim of stoppableDashes(other)) {
      const reliable = cancel !== undefined;
      const dash = victim.movement.find((m) => m.type === "dash");
      entries.push(
        entry("dash stop", own, ref(tool), ref(victim), {
          effect: "interrupts",
          summary: reliable
            ? `${tool.name} stops ${other.name}'s ${victim.name} dash${dash?.condition ? ` ${dash.condition}` : ""}.`
            : `${tool.name}'s knockdown can stop ${other.name}'s ${victim.name} mid-dash.`,
          timing: reliable ? `${tool.name} lasts ${seconds(cancel?.duration)} on a ${seconds(tool.cooldown)} cooldown` : "Must land during the dash",
          conditions: [
            "Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded.",
            ...(victim.movement.some((m) => m.interruptible === undefined) ? ["The wiki marks this dash's knockdown interaction as special."] : []),
          ],
          impact:
            abilityWeight(victim, other) *
            (reliable ? availability(cancel?.duration, tool.cooldown) : WEIGHTS.situational * answerRate(tool, victim)) *
            (dash?.interruptible === undefined ? WEIGHTS.partly : 1),
          evidence: [...(cancel ?? knockdown)!.evidence, definition(ctx, "Dash"), definition(ctx, "Template:Tip data/Knockdown")],
        }),
      );
    }
  }
  return entries;
};

export const grounding: Check = (own, other) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const ground = appliedOf(tool, "ground");
    if (!ground) continue;
    // Poppy's W grounds only a target whose dash it interrupted: nothing to ground if no dash can be stopped.
    if (ground.condition && /interrupted/i.test(ground.condition) && stoppableDashes(other).length === 0) continue;
    for (const victim of other.abilities) {
      const tri = victim.delivery.grounded;
      if ((tri !== "yes" && tri !== "partly") || victim.movement.length === 0) continue;
      entries.push(
        entry("grounding", own, ref(tool), ref(victim), {
          effect: tri === "yes" ? "negates" : "partly negates",
          summary: `${tool.name} grounds ${other.name}, who then can't cast ${victim.name}.`,
          timing: `Grounded ${ground.duration ? `for ${seconds(ground.duration)}` : "while in the area"}; ${seconds(tool.cooldown)} cooldown`,
          conditions: ground.condition ? [ground.condition] : [],
          impact: abilityWeight(victim, other) * completeness(tri) * availability(ground.duration ?? 2, tool.cooldown) * (ground.condition ? WEIGHTS.partly : 1),
          evidence: [...ground.evidence, { page: victim.page.title, revid: victim.page.revid, quote: `grounded: ${tri === "yes" ? "true" : "special"}` }],
        }),
      );
    }
  }
  return entries;
};

// ---------------------------------------------------------------------------------------
// Defensive states against key spells

function dodgeState(check: "untargetable" | "invulnerable"): Check {
  return (own, other, ctx) => {
    const entries: LedgerEntry[] = [];
    for (const tool of own.abilities) {
      const state = usableState(tool, check) ?? (check === "untargetable" ? usableState(tool, "stasis") : undefined);
      if (!state) continue;
      for (const victim of other.abilities.filter(isKeySpell)) {
        // Invulnerability stops damage, not crowd control.
        if (check === "invulnerable" && victim.damageTypes.length === 0 && victim.execute === undefined) continue;
        entries.push(
          entry(check, own, ref(tool), ref(victim), {
            effect: check === "untargetable" ? "negates" : "negates the damage of",
            summary:
              check === "untargetable"
                ? `${tool.name} makes ${own.name} untargetable, dodging ${other.name}'s ${victim.name}.`
                : `${tool.name} makes ${own.name} invulnerable to ${other.name}'s ${victim.name}${victim.applies.length > 0 ? " (its crowd control still applies)" : ""}.`,
            timing: reactionText(check === "untargetable" ? "Untargetable" : "Invulnerable", state.duration, victim),
            conditions: [state.note, state.condition].filter((s): s is string => Boolean(s)),
            impact: abilityWeight(victim, other) * answerRate(tool, victim) * reactionFactor(state.duration, victim) * (check === "invulnerable" && victim.applies.length > 0 ? WEIGHTS.partly : 1),
            evidence: [...state.evidence, definition(ctx, check === "untargetable" ? "Template:Tip data/Untargetable" : "Invulnerability")],
          }),
        );
      }
    }
    return entries;
  };
}

export const untargetable = dodgeState("untargetable");
export const invulnerable = dodgeState("invulnerable");

/** Crowd control types each defensive state handles. */
const DISPLACEMENTS = new Set(["airborne", "knockdown", "suspension", "kinematics", "sleep", "stasis"]);

export const crowdControlDefense: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  const tenacityTypes = new Set(ctx.crowdControl.filter((rule) => rule.tenacity).flatMap((rule) => rule.types));
  for (const tool of own.abilities) {
    const immune = usableState(tool, "cc immune");
    const displacement = usableState(tool, "displacement immune");
    const slowImmune = usableState(tool, "slow immune");
    const cleanse = usableState(tool, "cleanse");
    const tenacity = usableState(tool, "tenacity");
    for (const victim of other.abilities) {
      const cc = victim.applies.filter((a) => !["reveal", "grievous wounds", "dash cancel"].includes(a.type));
      if (cc.length === 0 || !victim.delivery.affectsEnemies) continue;
      const types = [...new Set(cc.map((a) => a.type))];
      // What the counter saves is the crowd control, not the whole ability.
      const weight = abilityWeight(victim, other) * ccImportance(types);
      if (immune) {
        // A passive immunity (Malzahar's Void Shift) is up on its own but pops on the first hit.
        const passive = tool.kind === "I";
        entries.push(
          entry("cc immunity", own, ref(tool), ref(victim), {
            effect: "negates",
            summary: `${tool.name} makes ${own.name} immune to ${other.name}'s ${victim.name} (${types.join(", ")}).`,
            timing: passive ? `${tool.name} is up on its own and ends on the first damage or crowd control it takes` : reactionText("Immune", immune.duration, victim),
            impact: weight * (passive ? WEIGHTS.partly : answerRate(tool, victim) * reactionFactor(immune.duration, victim)),
            evidence: [...immune.evidence, definition(ctx, "Template:Tip data/Cc-immune")],
          }),
        );
        continue;
      }
      const displaced = types.filter((t) => DISPLACEMENTS.has(t));
      if (displacement && displaced.length > 0) {
        entries.push(
          entry("cc immunity", own, ref(tool), ref(victim), {
            effect: displaced.length === types.length ? "negates" : "partly negates",
            summary: `${tool.name} is displacement immune, ignoring ${other.name}'s ${victim.name} (${displaced.join(", ")}) during it.`,
            timing: `Only during ${tool.name}${displacement.duration ? ` (${seconds(displacement.duration)})` : ""}`,
            impact:
              abilityWeight(victim, other) *
              ccImportance(displaced) *
              availability(displacement.duration, tool.cooldown) *
              WEIGHTS.situational *
              (displaced.length === types.length ? 1 : WEIGHTS.partly),
            evidence: [...displacement.evidence, definition(ctx, "Template:Tip data/Displacement immune")],
          }),
        );
      }
      if (slowImmune && types.some((t) => t === "slow" || t === "cripple")) {
        entries.push(
          entry("cc immunity", own, ref(tool), ref(victim), {
            effect: "partly negates",
            summary: `${tool.name} makes ${own.name} immune to ${other.name}'s ${victim.name} slow.`,
            timing: uptimeText(tool, slowImmune.duration),
            impact: abilityWeight(victim, other) * ccImportance(["slow"]) * availability(slowImmune.duration, tool.cooldown),
            evidence: slowImmune.evidence,
          }),
        );
      }
      if (cleanse?.removes) {
        const removed = types.filter((t) => cleanse.removes?.includes(t));
        if (removed.length > 0) {
          entries.push(
            entry("cleanse", own, ref(tool), ref(victim), {
              effect: "removes",
              summary: `${tool.name} cleanses ${other.name}'s ${victim.name} (${removed.join(", ")}) after it lands.`,
              timing: `${seconds(tool.cooldown)} cooldown; usable while crowd controlled`,
              conditions: removed.length < types.length ? [`Doesn't remove ${types.filter((t) => !removed.includes(t)).join(", ")}.`] : [],
              impact: abilityWeight(victim, other) * ccImportance(removed) * answerRate(tool, victim) * 0.8,
              evidence: [...cleanse.evidence, definition(ctx, "Types of Crowd Control/Summary")],
            }),
          );
        }
      }
      if (tenacity) {
        const reduced = types.filter((t) => tenacityTypes.has(t));
        if (reduced.length > 0) {
          const amount = tenacity.amount ?? 30;
          entries.push(
            entry("tenacity", own, ref(tool), ref(victim), {
              effect: "shortens",
              summary: `${tool.name}'s ${amount}% tenacity shortens ${other.name}'s ${victim.name} (${reduced.join(", ")}).`,
              timing: uptimeText(tool, tenacity.duration),
              impact: abilityWeight(victim, other) * ccImportance(reduced) * (amount / 100) * availability(tenacity.duration, tool.cooldown),
              evidence: [...tenacity.evidence, definition(ctx, "Template:Tip data/Tenacity")],
            }),
          );
        }
      }
    }
  }
  return entries;
};

// ---------------------------------------------------------------------------------------
// Offensive checks

export const interrupt: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  const interrupting = new Set(ctx.crowdControl.filter((rule) => rule.interruptsChannels === "yes").flatMap((rule) => rule.types));
  for (const victim of other.abilities) {
    const channel = victim.channel?.find((c) => c.type !== "uninterruptible" && c.type !== "objective");
    if (!channel || victim.channel?.some((c) => c.type === "uninterruptible")) continue;
    if (victim.states.some((s) => s.state === "cc immune")) continue;
    for (const tool of own.abilities) {
      const cc = tool.applies.find((a) => !a.condition && (interrupting.has(a.type) || a.type === "disrupt"));
      if (!cc || !tool.delivery.affectsEnemies) continue;
      entries.push(
        entry("interrupt", own, ref(tool), ref(victim), {
          effect: "interrupts",
          summary: `${tool.name}'s ${cc.type} interrupts ${other.name}'s ${victim.name} (${channel.type === "charged" ? "charge-up" : `${channel.type} channel`}).`,
          timing: `${tool.name} must land during the ${channel.type === "charged" ? "charge-up" : "channel"}`,
          conditions: channel.type === "charged" ? [`${other.name} can release ${victim.name} early instead of charging it fully.`] : [],
          impact: abilityWeight(victim, other) * WEIGHTS.situational * answerRate(tool, victim) * (channel.type === "charged" ? WEIGHTS.partly : 1),
          evidence: [...cc.evidence, ...channel.evidence, definition(ctx, "Template:Tip data/Cast-inhibiting crowd control")],
        }),
      );
      break;
    }
  }
  return entries;
};

export const deathPrevention: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  for (const tool of own.abilities) {
    const state = stateOf(tool, "minimum health") ?? stateOf(tool, "resurrection") ?? stateOf(tool, "invulnerable");
    if (!state) continue;
    for (const victim of other.abilities.filter((a) => a.execute !== undefined)) {
      entries.push(
        entry("death prevention", own, ref(tool), ref(victim), {
          effect: "negates",
          summary: `${other.name}'s ${victim.name} can't execute ${own.name} during ${tool.name} (${state.state}).`,
          timing: uptimeText(tool, state.duration),
          impact: abilityWeight(victim, other) * 0.8 * answerRate(tool, victim),
          evidence: [...state.evidence, ...(victim.execute ?? []), definition(ctx, "Template:Tip data/Execute", "Most executes do not ignore invulnerability, resurrection and effects that grant a minimum health threshold.")],
        }),
      );
    }
  }
  return entries;
};

export const reveal: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  const stealth = other.abilities.filter((a) => a.states.some((s) => s.state === "camouflage" || s.state === "invisible"));
  if (stealth.length === 0) return entries;
  for (const tool of own.abilities) {
    const effect = appliedOf(tool, "reveal");
    if (!effect) continue;
    for (const victim of stealth) {
      entries.push(
        entry("reveal", own, ref(tool), ref(victim), {
          effect: "reveals",
          summary: `${tool.name} reveals ${other.name} through ${victim.name}'s stealth.`,
          impact: abilityWeight(victim, other) * WEIGHTS.situational * WEIGHTS.partly,
          evidence: [...effect.evidence, definition(ctx, "Stealth")],
        }),
      );
    }
    break;
  }
  return entries;
};

export const antiHeal: Check = (own, other, ctx) => {
  const entries: LedgerEntry[] = [];
  const heals = other.abilities.filter((a) => a.states.some((s) => s.state === "heal"));
  for (const tool of own.abilities) {
    const effect = appliedOf(tool, "grievous wounds");
    if (!effect) continue;
    for (const victim of heals) {
      entries.push(
        entry("anti-heal", own, ref(tool), ref(victim), {
          effect: "reduces",
          summary: `${tool.name}'s Grievous Wounds cuts ${other.name}'s healing from ${victim.name} by 40%.`,
          conditions: effect.condition ? [effect.condition] : [],
          impact: abilityWeight(victim, other) * 0.4 * (effect.condition ? WEIGHTS.partly : 1),
          evidence: [...effect.evidence, definition(ctx, "Grievous Wounds")],
        }),
      );
    }
  }
  return entries;
};

/**
 * Range: basic attacks reach edge to edge, so the distance between centers is the attack
 * range plus both collision radii. A lead in that distance lets a champion hit without
 * being hit, unless the other side can close the gap.
 */
export const range: Check = (own, other, ctx) => {
  const mine = primaryAttack(own);
  const theirs = primaryAttack(other);
  if (!mine || !theirs) return [];
  const best = (kit: KitProfile) => Math.max(...kit.attacks.map((a) => a.range));
  const lead = best(own) - best(other);
  if (lead < WEIGHTS.rangeMin) return [];
  const closers = other.abilities.filter(
    (a) => a.movement.some((m) => m.type !== "lunge") && (a.delivery.affectsEnemies || a.delivery.targeting.some((t) => t !== "passive")),
  );
  const gapFactor = 1 / (1 + closers.length);
  return [
    entry("range", own, attackRef(own), attackRef(other), {
      effect: "out-ranges",
      summary: `${own.name}'s basic attacks reach ${lead} units farther than ${other.name}'s (${best(own)} vs ${best(other)} attack range).`,
      timing: closers.length > 0 ? `${other.name} closes the gap with ${closers.map((a) => a.name).join(", ")}` : `${other.name} has no dash or blink to close the gap`,
      impact: Math.min(1, lead / WEIGHTS.rangeFull) * attackWeight(own) * gapFactor,
      evidence: [{ page: "Module:ChampionData/data" }, definition(ctx, "Range")],
    }),
  ];
};

export const CHECKS: Check[] = [
  projectileBlock,
  spellShield,
  parry,
  attackDodge,
  attackBlock,
  blind,
  disarmAndCripple,
  attackReflect,
  dashStop,
  grounding,
  untargetable,
  invulnerable,
  crowdControlDefense,
  interrupt,
  deathPrevention,
  reveal,
  antiHeal,
  range,
];
