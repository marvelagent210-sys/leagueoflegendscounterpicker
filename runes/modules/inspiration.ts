/** The Inspiration path's runes. */
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { RuneModule } from "../equip";
import { adaptiveBonus, applyRune, cooldown, runeMemo, runeStat } from "../shared";

export const GlacialAugment: RuneModule = {
  rune: "Glacial Augment",
  build(rune) {
    const words = "Immobilizing an enemy champion will cause 3 glacial rays to emanate from them towards you and other nearby enemy champions, creating icy zones with a 700 unit radius that last for 3 (+ 100% of the immobilizing effect's duration) seconds.";
    const [length, base, share] = [rune.quoted(words, 1), rune.quoted(words, 2), rune.quoted(words, 3) / 100];
    const slowWords = "are slowed by 20% (+ 7% per 100 bonus AD) (+ 6% per 100 AP) (+ 9% per 10% heal and shield power)";
    const [slow, perAd, perAp] = [rune.quoted(slowWords) / 100, rune.quoted(slowWords, 1) / 100, rune.quoted(slowWords, 3) / 100];
    rune.quote("and have their damage reduced by 15% against your allies, excluding yourself.");
    rune.noted("Glacial Augment will not activate if the immobilizing effect was applied to a target that is displacement immune.");
    rune.assume("the ray toward the holder covers the 700 units from where the enemy was immobilized toward the holder, and slows the enemy while it stands in them; its heal and shield power ratio adds nothing, as the simulator has none.");
    const wait = cooldown(rune.name, rune.cooldown());
    const [from, toward, until] = [runeMemo(rune.name, "from"), runeMemo(rune.name, "toward"), runeMemo(rune.name, "until")];
    return {
      unmodeled: ["Its damage reduction against allies: a duel has none."],
      hooks: {
        onEnemyCCApplied(ctx) {
          if (!IMMOBILIZING.has(ctx.cc) || !wait.ready(ctx.self, ctx.tick)) return;
          const held = ctx.target.statuses.filter((status) => status.kind === "cc" && status.key === ctx.cc && status.source === ctx.self.side).reduce((end, status) => Math.max(end, status.endTick), ctx.tick);
          wait.start(ctx.self, ctx.tick);
          ctx.self.memory[from] = ctx.target.x;
          ctx.self.memory[toward] = Math.sign(ctx.self.x - ctx.target.x) || 1;
          ctx.self.memory[until] = ctx.tick + toTicks(base) + Math.round((held - ctx.tick) * share);
        },
        onTick(ctx) {
          if (ctx.tick > Number(ctx.self.memory[until] ?? -1)) return;
          const along = (ctx.enemy.x - Number(ctx.self.memory[from])) * Number(ctx.self.memory[toward]);
          if (along < -ctx.enemy.spec.base.radius || along > length + ctx.enemy.spec.base.radius) return;
          const d = derive(ctx.self);
          // Its slow is refreshed each tick the enemy stands in a zone, so it lasts no longer than the zone.
          applyRune(ctx, rune.label, { type: "cc", cc: "slow", duration: 2 / 30, strength: slow + (perAd * d.bonusAd) / 100 + (perAp * d.ap) / 100 });
        },
      },
    };
  },
};

export const FirstStrike: RuneModule = {
  rune: "First Strike",
  build(rune, fighter) {
    const words = "Initiating combat with an enemy champion within the first 0.25 seconds of champion combat, grants 10 and First Strike for 3 seconds, causing all of your post-mitigation damage dealt against champions to deal 7% bonus true damage.";
    const [grace, seconds, share] = [rune.quoted(words), rune.quoted(words, 2), rune.quoted(words, 3) / 100];
    rune.quote("First Strike will be placed on full cooldown without activating its effects after being struck by an enemy champion before you strike them.");
    rune.noted("The triggering instance of damage will also benefit from First Strike's bonus damage.");
    const travel = rune.notedNumber("This missile has a fixed travel time of 0.4 seconds.");
    rune.assume("combat starts anew after its holder has been out of combat with the enemy (5 seconds, Combat status); its gold does nothing in a duel.");
    const wait = cooldown(rune.name, rune.cooldown());
    const combat = fighter.items.combat();
    const [started, active] = [runeMemo(rune.name, "started"), runeMemo(rune.name, "active")];
    return {
      hooks: {
        onDamageTaken(ctx) {
          // Struck first: on cooldown without its effect.
          if (ctx.self.memory[started] === undefined && wait.ready(ctx.self, ctx.tick)) wait.start(ctx.self, ctx.tick);
          ctx.self.memory[started] = ctx.self.memory[started] ?? ctx.tick;
        },
        onDamageDealt(ctx) {
          if (ctx.ability === rune.label) return;
          const begun = Number(ctx.self.memory[started] ?? ctx.tick);
          ctx.self.memory[started] = begun;
          if (ctx.self.memory[active] === undefined && wait.ready(ctx.self, ctx.tick) && ctx.tick - begun <= toTicks(grace)) {
            wait.start(ctx.self, ctx.tick);
            ctx.self.memory[active] = ctx.tick + toTicks(seconds);
          }
          if (ctx.tick > Number(ctx.self.memory[active] ?? -1) || ctx.mitigated <= 0) return;
          applyRune(ctx, rune.label, { type: "delayed", delay: travel, effects: [{ type: "damage", damageType: "true", amount: { base: share * ctx.mitigated }, label: rune.label, noLifeSteal: true }] });
        },
        onTick(ctx) {
          if (ctx.self.memory[active] !== undefined && ctx.tick > Number(ctx.self.memory[active])) delete ctx.self.memory[active];
          // Out of combat with the enemy: the next damage starts combat anew.
          if (ctx.self.memory[started] !== undefined && !combat.inCombat(ctx.self, ctx.tick)) delete ctx.self.memory[started];
        },
      },
    };
  },
};

export const MagicalFootwear: RuneModule = {
  rune: "Magical Footwear",
  build(rune, fighter) {
    const speed = rune.quoted("Additionally, your boots grant an additional 10 bonus movement speed.");
    const boots = fighter.items.build.some((record) => record.kind === "boots");
    return { ...(boots ? { permanent: [{ stat: "moveSpeedFlat", value: speed }] } : {}), unmodeled: ["Its free boots: builds are bought whole."] };
  },
};

export const BiscuitDelivery: RuneModule = {
  rune: "Biscuit Delivery",
  build(rune) {
    rune.quote("Receive a Total Biscuit of Everlasting Will at 2:00, 4:00, and 6:00.");
    const health = rune.quoted("Consuming a Biscuit will permanently increase your maximum health by 30");
    rune.assume("its three biscuits were eaten before the fight, each for 30 maximum health.");
    return { bonus: { hp: 3 * health } };
  },
};

export const ApproachVelocity: RuneModule = {
  rune: "Approach Velocity",
  build(rune) {
    const words = "Gain 7.5% bonus total movement speed while facing visible enemy champions that are immobilized, grounded, or slowed within 1000 range.";
    const [speed, range] = [rune.quoted(words) / 100, rune.quoted(words, 1)];
    const doubled = rune.quoted("This bonus is doubled to 15% and does not have a range cap nor require vision toward enemy champions whose movement you impaired when they were visible.") / 100;
    rune.noted("Approach Velocity does not trigger from Drowsy, despite being a movement impairment.");
    rune.noted("The movement speed buff is granted even if the user is standing still.");
    rune.assume("its holder faces the enemy (a duel's two champions are on one line).");
    return {
      hooks: {
        onTick(ctx) {
          const impairs = ctx.enemy.statuses.filter((status) => status.kind === "cc" && (status.key === "slow" || status.key === "ground" || IMMOBILIZING.has(status.key as never)));
          const own = impairs.some((status) => status.source === ctx.self.side);
          const near = Math.abs(ctx.self.x - ctx.enemy.x) <= range;
          runeStat(ctx, rune.name, "moveSpeedPercent", own ? doubled : impairs.length > 0 && near ? speed : 0);
        },
      },
    };
  },
};

/** The stat types items give that count for Jack of All Trades: every stat the item catalog writes (the notes list them all). */
export const JackOfAllTrades: RuneModule = {
  rune: "Jack of All Trades",
  build(rune, fighter) {
    rune.quote("Earn 1 Jack stack for each unique stat type currently gained from items.");
    const words = "Jack: For each Jack stack, gain 1 ability haste. At 5 Jack stacks, gain 4.8 bonus attack damage or 8 ability power (adaptive). At 10 Jack stacks, gain an additional 7.2 bonus attack damage or 12 ability power (adaptive), for a total of 12 bonus attack damage or 20 ability power (adaptive) at 10 Jack stacks.";
    const [perStack, first, firstAd, firstAp, second, totalAd, totalAp] = [rune.quoted(words, 0), rune.quoted(words, 1), rune.quoted(words, 2), rune.quoted(words, 3), rune.quoted(words, 4), rune.quoted(words, 7), rune.quoted(words, 8)];
    rune.noted("The following of each stat are eligible for granting a Jack stack:");
    rune.assume("its stacks count the stat types of the build's shop stats (crit damage and percentage penetration count apart from crit chance and flat penetration).");
    const stacks = new Set(fighter.items.build.flatMap((record) => Object.keys(record.stats))).size;
    const adaptive = stacks >= second ? adaptiveBonus(fighter, totalAd, totalAp) : stacks >= first ? adaptiveBonus(fighter, firstAd, firstAp) : {};
    return { bonus: { abilityHaste: perStack * stacks, ...adaptive } };
  },
};

/** Inspiration runes the simulator leaves out, and those whose effects happen outside a duel. */
export const INSPIRATION_OUTSIDE: RuneModule[] = [
  { rune: "Unsealed Spellbook", build: (rune) => (rune.quote("While not channeling Teleport and being out-of-combat for 5 seconds, you can swap one of your equipped summoner spells"), { outsideDuels: "It swaps summoner spells out of combat, and a duel's spells are the ones chosen for it." }) },
  { rune: "Hextech Flashtraption", build: (rune) => (rune.quote("Releasing the charge earlier than 1 second or entering combat with an enemy champion will put Hexflash on cooldown for 10 seconds."), { outsideDuels: "Hexflash charges out of combat: entering combat with the enemy puts it on cooldown." }) },
  { rune: "Cash Back", build: (rune) => (rune.quote("Upon purchasing a Legendary item, you are automatically refunded 7.5% of its total gold cost."), { outsideDuels: "It refunds gold, and a duel's builds are bought whole." }) },
  { rune: "Time Warp Tonic", build: (rune) => (rune.quote("Upon consuming a potion"), { outsideDuels: "It strengthens potions, and a duel's builds hold none." }) },
  {
    rune: "Triple Tonic",
    build: (rune) => (rune.quote("Gain an Elixir upon reaching each of the following levels:"), { outsideDuels: "Its elixirs are spent by level 20: Elixir of Force's effect has run out, and Elixir of Skill's skill point matters only to Udyr, whose kit takes it as an option." }),
  },
  { rune: "Cosmic Insight", build: (rune) => (rune.quote("Gain 18 summoner spell haste and 10 item haste."), { unmodeled: ["Its summoner spell haste: a fight has one cast of each spell.", "Its item haste: not modeled yet."] }) },
];
