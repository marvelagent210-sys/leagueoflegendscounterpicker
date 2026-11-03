/** The Domination path's runes. */
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { toTicks } from "../../engine/rules/time";
import { traitsOf } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import { abilityHas, stealths, triggers, usesOf } from "../../items/hints";
import type { RuneFighter, RuneModule } from "../equip";
import { LATE_GAME_ESTIMATE, adaptiveType, applyRune, cooldown, runeMemo, runeStat } from "../shared";

/** Proc damage of the holder's items, runes or summoner spells: neither basic damage, nor the kit's, nor a pet's. */
function isProc(fighter: RuneFighter, hit: { attack: boolean; ability?: string; persistent: boolean; petSource?: boolean }): boolean {
  return !hit.attack && !hit.petSource && !fighter.items.isAbilityDamage(hit);
}

/** Electrocute's and Arcane Comet's "variable damage": physical when the AD ratio adds more than the AP ratio, magic otherwise. */
export function variableType(ctx: Pick<HookContext, "self">, adRatio: number, apRatio: number): "physical" | "magic" {
  const d = derive(ctx.self);
  return adRatio * d.bonusAd > apRatio * d.ap ? "physical" : "magic";
}

export const Electrocute: RuneModule = {
  rune: "Electrocute",
  build(rune, fighter) {
    const words = "Applying 3 stacks to a target within a 3 second period causes them to be struck by lightning after a 0.25-second delay";
    const [needed, window, delay] = [rune.quoted(words), rune.quoted(words, 1), rune.quoted(words, 2)];
    const damage = rune.level("struck by lightning");
    const ratios = "(+ 10% bonus AD) (+ 5% AP) of either physical or magic damage.";
    const [ad, ap] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100];
    rune.quote("Damaging basic attacks, abilities, item effects, and summoner spells, as well as the application of crowd control and damage over time effects, apply stacks against enemy champions, up to one per cast instance per champion.");
    rune.noted("The 3 second timer is non-refreshing - the third stack has to be applied within 3 seconds of the first.");
    rune.noted("Effects that deal proc damage do not trigger a stack unless it is also tagged as pet damage.");
    rune.noted("Blind, Cripple, Drowsy, Kinematics, Nearsight, and Stasis do not count as valid crowd control for triggering stacks.");
    rune.assume("a cast instance is one basic attack, or one ability's hits and crowd control from one cast (counted once in each 3-second window); a summoner spell's cast on the enemy is one.");
    const wait = cooldown(rune.name, rune.cooldown());
    const invalid = new Set(["blind", "cripple", "drowsy", "kinematics", "nearsight", "stasis"]);
    const [start, seen, attacks] = [runeMemo(rune.name, "start"), runeMemo(rune.name, "seen"), runeMemo(rune.name, "attacks")];
    const stack = (ctx: HookContext, instance: string) => {
      if (!wait.ready(ctx.self, ctx.tick)) return;
      const begun = Number(ctx.self.memory[start] ?? Number.NEGATIVE_INFINITY);
      if (ctx.tick - begun > toTicks(window)) {
        ctx.self.memory[start] = ctx.tick;
        ctx.self.memory[seen] = "";
      }
      const instances = String(ctx.self.memory[seen] ?? "").split("|").filter(Boolean);
      if (instances.includes(instance)) return;
      instances.push(instance);
      ctx.self.memory[seen] = instances.join("|");
      if (instances.length < needed) return;
      delete ctx.self.memory[start];
      wait.start(ctx.self, ctx.tick);
      const type = variableType(ctx, ad, ap);
      applyRune(ctx, rune.label, { type: "delayed", delay, effects: [{ type: "damage", damageType: type, amount: { base: damage, ratios: { bonusAD: ad, AP: ap } }, label: rune.label, noLifeSteal: true }] });
    };
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.attack) {
            const count = Number(ctx.self.memory[attacks] ?? 0) + 1;
            ctx.self.memory[attacks] = count;
            stack(ctx, `attack ${count}`);
          } else if (!isProc(fighter, ctx)) {
            // The kit's ability damage and its damage over time, and pets' damage; not the proc damage of items, runes and summoner spells (the notes).
            stack(ctx, `${ctx.petSource ? "pet " : ""}${ctx.ability ?? "ability"}`);
          }
        },
        onEnemyCrowdControlled(ctx) {
          if (!invalid.has(ctx.cc)) stack(ctx, ctx.ability ?? `cc ${ctx.cc}`);
        },
        onCast(ctx) {
          // A summoner spell cast on the enemy (Ignite, Exhaust) is a cast instance of its own.
          if (ctx.ability.key.startsWith("summoner:") && ctx.ability.delivery.kind === "target") stack(ctx, ctx.ability.key);
        },
      },
    };
  },
};

export const DarkHarvest: RuneModule = {
  rune: "Dark Harvest",
  options: { souls: { label: "Souls reaped before the fight", default: 20, basis: LATE_GAME_ESTIMATE } },
  build(rune, fighter, options) {
    const words = "Dealing pet or non-proc damage against enemy champions below 50% of their maximum health deals 30 (+ 11 per Soul) (+ 10% bonus AD) (+ 5% AP) bonus adaptive damage";
    const [below, base, perSoul, ad, ap] = [rune.quoted(words), rune.quoted(words, 1), rune.quoted(words, 2), rune.quoted(words, 3), rune.quoted(words, 4)];
    rune.quote("after a 1.75-second delay, reap 1 Soul.");
    rune.noted("Dark Harvest does not trigger on proc damage (e.g. Scorch, Liandry's Torment, W), excluding E.");
    const least = rune.notedNumber("Dark Harvest does not trigger on damage lower than 2");
    const wait = cooldown(rune.name, rune.cooldown());
    const reaped = runeMemo(rune.name, "souls");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.amount < least || isProc(fighter, ctx) || ctx.ability === rune.label || !wait.ready(ctx.self, ctx.tick)) return;
          // The target's health before the hit.
          if ((ctx.enemy.hp + ctx.amount) / derive(ctx.enemy).maxHp >= below / 100) return;
          wait.start(ctx.self, ctx.tick);
          const souls = (options.souls ?? 0) + Number(ctx.self.memory[reaped] ?? 0);
          ctx.self.memory[reaped] = Number(ctx.self.memory[reaped] ?? 0) + 1;
          applyRune(ctx, rune.label, { type: "damage", damageType: adaptiveType(fighter), amount: { base: base + perSoul * souls, ratios: { bonusAD: ad / 100, AP: ap / 100 } }, label: rune.label, noLifeSteal: true });
        },
      },
    };
  },
};

export const HailOfBlades: RuneModule = {
  rune: "Hail of Blades",
  build(rune, fighter) {
    const words = "Starting an attack windup against an enemy champion triggers Hail of Blades, and if the windup completes, you gain 2 stacks of the effect for 3 seconds";
    const [stacks, seconds] = [rune.quoted(words), rune.quoted(words, 1)];
    const extraWords = "you generate an additional stack of the effect each time you activate an effect that has a basic attack reset, up to 2 times.";
    const extra = rune.quoted(extraWords);
    const speed = rune.meleeRanged("you gain 90% (melee) / 60% (ranged) bonus attack speed");
    const share = (fighter.ranged ? speed.ranged : speed.melee) / 100;
    rune.quote("are allowed to exceed the attack speed cap");
    const cap = rune.notedNumber("The user's attack speed cap is increased to 90.0 for the duration");
    const damage = rune.level("basic attacks deal");
    const ratios = "(+ 12% bonus AD) (+ 10% AP) bonus true damage.";
    const [ad, ap] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100];
    rune.quote("The triggering attack benefits from Hail of Blades.");
    const wait = cooldown(rune.name, rune.cooldown());
    rune.assume("its cooldown starts when it triggers; the triggering attack's windup keeps its own speed.");
    const [left, until, extras, empowered] = [runeMemo(rune.name, "left"), runeMemo(rune.name, "until"), runeMemo(rune.name, "extras"), runeMemo(rune.name, "empowered")];
    const end = (ctx: HookContext) => {
      delete ctx.self.memory[left];
      runeStat(ctx, rune.name, "attackSpeed", 0);
      runeStat(ctx, rune.name, "attackSpeedCap", 0);
    };
    return {
      hooks: {
        onAttack(ctx) {
          if (ctx.targetPet || ctx.self.memory[left] !== undefined || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          ctx.self.memory[left] = stacks;
          ctx.self.memory[extras] = 0;
          ctx.self.memory[until] = ctx.tick + toTicks(seconds);
          runeStat(ctx, rune.name, "attackSpeed", share);
          runeStat(ctx, rune.name, "attackSpeedCap", cap);
        },
        onAttackLaunch(ctx) {
          const count = Number(ctx.self.memory[left] ?? 0);
          if (count <= 0 || ctx.targetPet) return;
          ctx.self.memory[empowered] = true;
          ctx.self.memory[until] = ctx.tick + toTicks(seconds);
          if (count - 1 <= 0) end(ctx);
          else ctx.self.memory[left] = count - 1;
        },
        onAttackHit(ctx) {
          if (!ctx.self.memory[empowered]) return;
          delete ctx.self.memory[empowered];
          if (!ctx.blocked) applyRune(ctx, rune.label, { type: "damage", damageType: "true", amount: { base: damage, ratios: { bonusAD: ad, AP: ap } }, label: rune.label, noLifeSteal: true }, false, ctx.scale);
        },
        onCast(ctx) {
          if (ctx.self.memory[left] === undefined || !traitsOf(ctx.ability).resetsAttack) return;
          const used = Number(ctx.self.memory[extras] ?? 0);
          if (used >= extra) return;
          ctx.self.memory[extras] = used + 1;
          ctx.self.memory[left] = Number(ctx.self.memory[left]) + 1;
        },
        onTick(ctx) {
          if (ctx.self.memory[left] !== undefined && ctx.tick > Number(ctx.self.memory[until] ?? -1)) end(ctx);
        },
      },
    };
  },
};

/** Domination runes whose effects happen outside a duel. */
export const DOMINATION_OUTSIDE: RuneModule[] = [
  { rune: "Sixth Sense", build: (rune) => (rune.quote("Upon moving near an un-tracked enemy ward"), { outsideDuels: "It tracks wards, and a duel has none." }) },
  { rune: "Grisly Mementos", build: (rune) => (rune.quote("trinket haste"), { outsideDuels: "It gives trinket haste, and a duel has no trinkets." }) },
  { rune: "Deep Ward", build: (rune) => (rune.quote("Stealth Wards and Totem Wards placed in the enemy jungle are considered Deep."), { outsideDuels: "It strengthens wards, and a duel has none." }) },
  { rune: "Treasure Hunter", build: (rune) => (rune.quote("per unique takedown"), { outsideDuels: "It gives gold for takedowns, and a duel's builds are bought whole." }) },
];

export const CheapShot: RuneModule = {
  rune: "Cheap Shot",
  build(rune, fighter) {
    const damage = rune.level("Non-proc damage sources deal");
    rune.quote("Valid Crowd Control: * Immobilizes * Blind * Disarm * Ground * Nearsight * Polymorph * Silence * Slow");
    rune.quote("The target must already be impaired prior to the damaging attack or spell in order to trigger the bonus damage.");
    rune.noted("Cripple does not count as a valid crowd control for Cheap Shot.");
    const valid = new Set<string>(["blind", "disarm", "ground", "nearsight", "polymorph", "silence", "slow", ...IMMOBILIZING]);
    const seconds = rune.cooldown();
    const wait = cooldown(rune.name, seconds);
    const impairs = (ability: AbilitySpec) => abilityHas(ability, (e) => (e.type === "cc" && valid.has(e.cc)) || e.type === "displace");
    return {
      // Once a cast of the kit's that impairs, at most once a cooldown.
      budget: { damage: (self) => ({ true: damage * Math.min(triggers(seconds), usesOf(self, impairs)) }) },
      hooks: {
        onDamageDealt(ctx) {
          if (isProc(fighter, ctx) || !wait.ready(ctx.self, ctx.tick)) return;
          // Impaired before this tick: crowd control from the same hit doesn't count.
          if (!ctx.enemy.statuses.some((status) => status.kind === "cc" && valid.has(status.key) && status.startTick < ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          applyRune(ctx, rune.label, { type: "damage", damageType: "true", amount: { base: damage }, label: rune.label, noLifeSteal: true });
        },
      },
    };
  },
};

export const TasteOfBlood: RuneModule = {
  rune: "Taste of Blood",
  build(rune) {
    const heal = rune.level("Damaging an enemy champion heals you for");
    const ratios = "(+ 10% bonus AD) (+ 5% AP).";
    const [ad, ap] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100];
    rune.quote("Does not trigger at full health.");
    const seconds = rune.cooldown();
    const wait = cooldown(rune.name, seconds);
    return {
      budget: { healing: (self) => evaluate({ base: heal, ratios: { bonusAD: ad, AP: ap } }, self) * triggers(seconds) },
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.self.hp >= derive(ctx.self).maxHp || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          applyRune(ctx, rune.label, { type: "heal", amount: { base: heal, ratios: { bonusAD: ad, AP: ap } } }, true);
        },
      },
    };
  },
};

export const SuddenImpact: RuneModule = {
  rune: "Sudden Impact",
  build(rune) {
    const words = "Dealing damage to an enemy champion within 4 seconds of using a dash or blink, or exiting from stealth, deals";
    const window = rune.quoted(words);
    const damage = rune.level(words);
    rune.noted("Sudden Impact deals proc damage, and thus will not trigger spell effects.");
    const seconds = rune.cooldown();
    const wait = cooldown(rune.name, seconds);
    const mobile = (ability: AbilitySpec) => ability.delivery.kind === "dash" || ability.delivery.kind === "blink" || stealths(ability);
    const [readyUntil, hidden] = [runeMemo(rune.name, "until"), runeMemo(rune.name, "hidden")];
    const arm = (ctx: { self: { memory: Record<string, number | string | boolean> }; tick: number }) => {
      ctx.self.memory[readyUntil] = ctx.tick + toTicks(window);
    };
    return {
      // Once a dash, blink or stealth of the kit's, at most once a cooldown.
      budget: { damage: (self) => ({ true: damage * Math.min(triggers(seconds), usesOf(self, mobile)) }) },
      hooks: {
        onDashEnd: arm,
        onBlinkEnd: arm,
        onTick(ctx) {
          const stealthed = ctx.self.statuses.some((status) => status.kind === "state" && (status.key === "invisible" || status.key === "camouflage"));
          if (ctx.self.memory[hidden] && !stealthed) arm(ctx);
          if (stealthed) ctx.self.memory[hidden] = true;
          else delete ctx.self.memory[hidden];
        },
        onDamageDealt(ctx) {
          if (ctx.ability === rune.label || ctx.tick > Number(ctx.self.memory[readyUntil] ?? -1) || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          delete ctx.self.memory[readyUntil];
          applyRune(ctx, rune.label, { type: "damage", damageType: "true", amount: { base: damage }, label: rune.label, noLifeSteal: true });
        },
      },
    };
  },
};

const BOUNTY = { stacks: { label: "Bounty Hunter stacks before the fight (one per enemy champion taken down, 5 at most)", default: 4, basis: LATE_GAME_ESTIMATE } };

export const RelentlessHunter: RuneModule = {
  rune: "Relentless Hunter",
  options: BOUNTY,
  build(rune, fighter, options) {
    const words = "Gain 8 bonus movement speed while out of combat per Bounty Hunter stack, up to 40 at 5 stacks.";
    const [per, most] = [rune.quoted(words), rune.quoted(words, 2)];
    const speed = per * Math.min(most, options.stacks ?? 0);
    const combat = fighter.items.combat();
    return { hooks: { onTick: (ctx) => runeStat(ctx, rune.name, "moveSpeedFlat", combat.inCombat(ctx.self, ctx.tick) ? 0 : speed) } };
  },
};

export const UltimateHunter: RuneModule = {
  rune: "Ultimate Hunter",
  options: BOUNTY,
  build(rune, _fighter, options) {
    const words = "Gain 6 (+ 5 per Bounty Hunter stack) ultimate haste, up to 31 at 5 stacks.";
    const [base, per, most] = [rune.quoted(words), rune.quoted(words, 1), rune.quoted(words, 3)];
    return { haste: [{ slots: ["R"], haste: base + per * Math.min(most, options.stacks ?? 0) }] };
  },
};
