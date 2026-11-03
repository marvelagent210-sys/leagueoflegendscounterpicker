/** The Domination path's runes. */
import { toTicks } from "../../engine/rules/time";
import { traitsOf } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import type { HookContext } from "../../engine/sim/spec";
import type { RuneFighter, RuneModule } from "../equip";
import { adaptiveType, applyRune, cooldown, runeMemo, runeStat } from "../shared";

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
        onEnemyCCApplied(ctx) {
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
  options: { souls: { label: "Souls reaped before the fight", default: 0 } },
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
