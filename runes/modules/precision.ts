/** The Precision path's runes. */
import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { HookContext } from "../../engine/sim/spec";
import type { RuneData } from "../context";
import type { RuneModule } from "../equip";
import { adaptiveStat, adaptiveType, applyRune, cooldown, runeMemo, runeStat } from "../shared";

/** Whether a hit is proc damage of the holder's items, runes or summoner spells (not basic damage, not the kit's). */
const isProc = (fighter: { items: { isAbilityDamage: (hit: { attack: boolean; ability?: string; persistent: boolean }) => boolean } }, ctx: { attack: boolean; ability?: string; persistent: boolean; petSource?: boolean }) =>
  !ctx.attack && !ctx.petSource && !fighter.items.isAbilityDamage(ctx);

export const PressTheAttack: RuneModule = {
  rune: "Press the Attack",
  build(rune, fighter) {
    const words = "Basic attacks on-hit against enemy champions apply a stack for 4 seconds, refreshing on subsequent applications, expiring upon attacking a new champion, and stacking up to 3 times.";
    const [seconds, most] = [rune.quoted(words), rune.quoted(words, 1)];
    const damage = rune.level("The third stack consumes all stacks to deal");
    const amp = rune.quoted("grant you 8% increased damage against champions until 5 seconds after exiting combat with them.") / 100;
    rune.noted("The basic attack that triggers Press the Attack's third stack does not benefit from the increased damage.");
    rune.noted("Press the Attack's adaptive damage deals proc damage, and thus will not trigger spell effects.");
    const wait = cooldown(rune.name, rune.cooldown());
    rune.assume("its stacks can't build again until its cooldown ends after the third stack.");
    const combat = fighter.items.combat();
    const [stacks, until, amped] = [runeMemo(rune.name, "stacks"), runeMemo(rune.name, "until"), runeMemo(rune.name, "amped")];
    return {
      hooks: {
        onAttackHit(ctx) {
          if (ctx.blocked || !wait.ready(ctx.self, ctx.tick)) return;
          const held = ctx.tick <= Number(ctx.self.memory[until] ?? -1) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          if (held + 1 < most) {
            ctx.self.memory[stacks] = held + 1;
            ctx.self.memory[until] = ctx.tick + toTicks(seconds);
            return;
          }
          delete ctx.self.memory[stacks];
          wait.start(ctx.self, ctx.tick);
          applyRune(ctx, rune.label, { type: "damage", damageType: adaptiveType(fighter), amount: { base: damage }, label: rune.label, noLifeSteal: true }, false, ctx.scale);
          ctx.self.memory[amped] = true;
          runeStat(ctx, rune.name, "damageDealt", amp);
        },
        onTick(ctx) {
          if (ctx.self.memory[amped] && !combat.inCombat(ctx.self, ctx.tick)) {
            delete ctx.self.memory[amped];
            runeStat(ctx, rune.name, "damageDealt", 0);
          }
        },
      },
    };
  },
};

export const LethalTempo: RuneModule = {
  rune: "Lethal Tempo",
  build(rune, fighter) {
    const words = "Basic attacks on-attack against enemy champions grant a stack for 6 seconds, refreshing on subsequent attacks and stacking up to 6 times.";
    const [seconds, most] = [rune.quoted(words), rune.quoted(words, 1)];
    const perStack = rune.meleeRanged("Gain 6% (melee) / 4.8% (ranged) bonus attack speed for each stack");
    const share = (fighter.ranged ? perStack.ranged : perStack.melee) / 100;
    const bolt = rune.level("At maximum stacks, basic attacks are empowered to fire a bolt at the target on-attack", fighter.ranged ? 1 : 0);
    rune.quote("bonus adaptive damage upon arrival, increased by 1% per 1% bonus attack speed.");
    rune.noted("Lethal Tempo's own attack speed stacks count toward the bonus attack speed that scales the bolt.");
    const step = rune.quoted("When the duration ends, one stack expires immediately and the rest expire one by one every 0.3 seconds.", 1);
    rune.assume("the attack that brings it to maximum stacks fires the first bolt, which lands with the attack.");
    const [stacks, until, loaded] = [runeMemo(rune.name, "stacks"), runeMemo(rune.name, "until"), runeMemo(rune.name, "loaded")];
    const set = (ctx: HookContext, count: number) => {
      if (count > 0) ctx.self.memory[stacks] = count;
      else delete ctx.self.memory[stacks];
      runeStat(ctx, rune.name, "attackSpeed", share * count);
    };
    return {
      hooks: {
        onAttackLaunch(ctx) {
          if (ctx.targetPet) return;
          const count = Math.min(most, Number(ctx.self.memory[stacks] ?? 0) + 1);
          set(ctx, count);
          ctx.self.memory[until] = ctx.tick + toTicks(seconds);
          if (count >= most) ctx.self.memory[loaded] = true;
        },
        onAttackHit(ctx) {
          if (!ctx.self.memory[loaded]) return;
          delete ctx.self.memory[loaded];
          if (ctx.blocked) return;
          applyRune(ctx, rune.label, { type: "damage", damageType: adaptiveType(fighter), amount: { base: bolt * (1 + derive(ctx.self).bonusAttackSpeed) }, label: rune.label, noLifeSteal: true }, false, ctx.scale);
        },
        onTick(ctx) {
          const count = Number(ctx.self.memory[stacks] ?? 0);
          const end = Number(ctx.self.memory[until] ?? Number.POSITIVE_INFINITY);
          if (count === 0 || ctx.tick < end) return;
          // One stack at the end of the duration, then one every 0.3 seconds.
          if (ctx.tick === end || (ctx.tick - end) % toTicks(step) === 0) set(ctx, count - 1);
        },
      },
    };
  },
};

export const FleetFootwork: RuneModule = {
  rune: "Fleet Footwork",
  build(rune, fighter) {
    rune.quote("Energized: Moving and basic attacking generates Charges, up to 100.");
    const heal = rune.level("empowering your next basic attack to heal you for", fighter.ranged ? 1 : 0);
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee) / 100;
    const ad = pick(rune.meleeRanged("(+ 10% (melee) / 6% (ranged) bonus AD)"));
    const ap = pick(rune.meleeRanged("(+ 5% (melee) / 3% (ranged) AP)"));
    const speedWords = "grant 20% (melee) / 15% (ranged) bonus movement speed for 1 second.";
    const speed = pick(rune.meleeRanged(speedWords));
    const seconds = rune.quoted(speedWords, 2);
    fighter.items.energized().add({
      onHit(ctx, scale) {
        applyRune(ctx, rune.label, { type: "heal", amount: { base: heal * scale, ratios: { bonusAD: ad * scale, AP: ap * scale } } }, true);
        applyRune(ctx, rune.label, { type: "stat", stat: "moveSpeedPercent", amount: { base: speed }, duration: seconds }, true);
      },
    });
    return {};
  },
};

export const Conqueror: RuneModule = {
  rune: "Conqueror",
  build(rune, fighter) {
    const words = "Dealing damage to enemy champions generates stacks of Conqueror, lasting for 5 seconds, refreshing on subsequent damage against champions, and stacking up to 12 times.";
    const [seconds, most] = [rune.quoted(words), rune.quoted(words, 2)];
    const onHit = rune.meleeRanged("Gain 2 (melee) / 1 (ranged) stacks for basic damage on-hit.");
    const perAttack = fighter.ranged ? onHit.ranged : onHit.melee;
    const otherWords = "Otherwise, gain 2 stacks for any damage that is neither basic nor non-pet proc damage, up to once every 4 seconds per cast instance.";
    const [perOther, instanceSeconds] = [rune.quoted(otherWords), rune.quoted(otherWords, 1)];
    const perStack = rune.level("Each stack of Conqueror grants", fighter.adaptive === "ad" ? 0 : 1);
    const healShare = rune.meleeRanged("at which you also heal for 8% (melee) / 5% (ranged) of the post-mitigation damage dealt against enemy champions.");
    const heal = (fighter.ranged ? healShare.ranged : healShare.melee) / 100;
    rune.noted("Conqueror's stacking can only occur once per cast instance.");
    rune.assume("a cast instance is an ability's hits from one cast: its damage stacks Conqueror once every 4 seconds.");
    const stat = adaptiveStat(fighter);
    const [stacks, until] = [runeMemo(rune.name, "stacks"), runeMemo(rune.name, "until")];
    const set = (ctx: HookContext, count: number) => {
      if (count > 0) ctx.self.memory[stacks] = count;
      else delete ctx.self.memory[stacks];
      runeStat(ctx, rune.name, stat, perStack * count);
    };
    return {
      hooks: {
        onDamageDealt(ctx) {
          let gained = perAttack;
          if (!ctx.attack) {
            if (isProc(fighter, ctx)) return;
            const next = runeMemo(rune.name, `instance:${ctx.ability ?? "other"}`);
            if (ctx.tick < Number(ctx.self.memory[next] ?? -1)) gained = 0;
            else {
              ctx.self.memory[next] = ctx.tick + toTicks(instanceSeconds);
              gained = perOther;
            }
          }
          const count = Math.min(most, Number(ctx.self.memory[stacks] ?? 0) + gained);
          set(ctx, count);
          ctx.self.memory[until] = ctx.tick + toTicks(seconds);
          if (count >= most && ctx.mitigated > 0) applyRune(ctx, rune.label, { type: "heal", amount: { base: heal * ctx.mitigated } }, true);
        },
        onTick(ctx) {
          if (ctx.self.memory[stacks] !== undefined && ctx.tick > Number(ctx.self.memory[until] ?? -1)) set(ctx, 0);
        },
      },
    };
  },
};

/** A Legend rune's stacks: all of them, which a level-20 champion has had a long game to collect, like Tear stacks. */
function legendStacks(rune: RuneData, most: string): number {
  const stacks = rune.quoted(most);
  rune.assume(`fully stacked (${stacks} Legend stacks): a level-20 champion has had a long game to collect them.`);
  return stacks;
}

export const LegendAlacrity: RuneModule = {
  rune: "Legend: Alacrity",
  build(rune) {
    const words = "Gain 3% (+ 1.5% per Legend stack) bonus attack speed, up to 18% at maximum stacks.";
    const stacks = legendStacks(rune, "Legend: Gain Legend stacks for every 100 points earned, up to 10");
    return { bonus: { attackSpeed: Math.min(rune.quoted(words, 2), rune.quoted(words) + rune.quoted(words, 1) * stacks) / 100 } };
  },
};

export const LegendHaste: RuneModule = {
  rune: "Legend: Haste",
  build(rune) {
    const words = "Gain ability haste 1.5 basic ability haste per Legend stack, up to 15 at maximum stacks.";
    const stacks = legendStacks(rune, "Legend: Gain Legend stacks for every 100 points earned, up to 10");
    return { haste: [{ slots: ["Q", "W", "E"], haste: Math.min(rune.quoted(words, 1), rune.quoted(words) * stacks) }] };
  },
};

export const LegendBloodline: RuneModule = {
  rune: "Legend: Bloodline",
  build(rune) {
    const words = "Gain 0.45% life steal per Legend stack, up to 6.75% at maximum stacks, at which you also gain 85 bonus health.";
    const stacks = legendStacks(rune, "Legend: Gain Legend stacks for every 100 points earned, up to 15");
    return { permanent: [{ stat: "lifeSteal", value: Math.min(rune.quoted(words, 1), rune.quoted(words) * stacks) / 100 }], bonus: { hp: rune.quoted(words, 2) } };
  },
};

/** "Deal 8% increased damage to champions below 40% maximum health": a damage increase while the enemy's health is on one side of a line. */
function healthBand(name: string, words: string, below: boolean): RuneModule {
  return {
    rune: name,
    build(rune) {
      const [amp, line] = [rune.quoted(words) / 100, rune.quoted(words, 1) / 100];
      return {
        hooks: {
          onTick(ctx) {
            const share = ctx.enemy.hp / derive(ctx.enemy).maxHp;
            runeStat(ctx, rune.name, "damageDealt", (below ? share < line : share > line) ? amp : 0);
          },
        },
      };
    },
  };
}

export const CoupDeGrace = healthBand("Coup de Grace", "Deal 8% increased damage to champions below 40% maximum health.", true);
export const CutDown = healthBand("Cut Down", "Deal 8% increased damage to champions above 60% maximum health.", false);

export const LastStand: RuneModule = {
  rune: "Last Stand",
  build(rune) {
    const words = "Deal 5% increased damage to champions while below 60% maximum health. This increases further based on your missing health, up to 11% increased damage while below 30% maximum health.";
    const [low, start, high, full] = [rune.quoted(words) / 100, rune.quoted(words, 1) / 100, rune.quoted(words, 2) / 100, rune.quoted(words, 3) / 100];
    rune.assume("its damage increase grows evenly from 5% at 60% health to 11% at 30%.");
    return {
      hooks: {
        onTick(ctx) {
          const share = ctx.self.hp / derive(ctx.self).maxHp;
          const amp = share >= start ? 0 : share <= full ? high : low + ((high - low) * (start - share)) / (start - full);
          runeStat(ctx, rune.name, "damageDealt", amp);
        },
      },
    };
  },
};

/** Precision runes whose effects happen outside a duel. */
export const PRECISION_OUTSIDE: RuneModule[] = [
  { rune: "Absorb Life", build: (rune) => (rune.quote("Killing an enemy heals you for"), { outsideDuels: "It heals on a kill, and a duel ends at the first." }) },
  { rune: "Triumph", build: (rune) => (rune.quote("Scoring a takedown against an enemy champion heals you"), { outsideDuels: "It heals on a takedown, and a duel ends at the first." }) },
];
