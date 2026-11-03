/** The Sorcery path's runes. */
import { toTicks } from "../../engine/rules/time";
import { heldInPlace, heldUntil } from "../../engine/sim/actions";
import { consumeSpellShield } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { hitChance } from "../../engine/sim/hitModel";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { RuneFighter, RuneModule } from "../equip";
import { GAME_MINUTES, adaptiveBonus, adaptiveStat, adaptiveType, applyRune, cooldown, runeMemo, runeStat } from "../shared";
import { variableType } from "./domination";

/** Ability or pet damage of the kit's: not basic damage, not the proc damage of items, runes and summoner spells. */
function kitAbilityDamage(fighter: RuneFighter, hit: { attack: boolean; ability?: string; persistent: boolean; petSource?: boolean }): boolean {
  return !hit.attack && (hit.petSource === true || fighter.items.isAbilityDamage(hit));
}

/** The kit's ability that labels a hit, by name, in the holder's current form. */
function abilityNamed(ctx: Pick<HookContext, "self">, name: string | undefined): AbilitySpec | undefined {
  return name === undefined ? undefined : ctx.self.spec.abilities.find((ability) => ability.name === name);
}

/** Whether an ability hits an area rather than one target (the burn and Axiom Arcanist tell them apart). */
function isArea(ability: AbilitySpec | undefined): boolean {
  const d = ability?.delivery;
  return d !== undefined && (d.kind === "circle" || d.kind === "aura" || d.kind === "area" || (d.kind === "line" && d.piercing === true));
}

export const SummonAery: RuneModule = {
  rune: "Summon Aery",
  build(rune, fighter) {
    const words = "Damaging basic attacks, abilities, and item effects against an enemy champion signal Aery to pounce at them over 0.45 seconds";
    const travel = rune.quoted(words);
    const damage = rune.level(words);
    const ratios = "(+ 10% bonus AD) (+ 5% AP) adaptive damage.";
    const [ad, ap] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100];
    const linger = rune.quoted("She then lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns.");
    rune.quote("Does not trigger on persistent proc damage.");
    rune.noted("Aery is special cased to trigger on the application of the first tick of Ignite.");
    const back = 1;
    rune.assume(`she is back ${back} second after lingering on the enemy (the wiki gives no speed for her return); her shield for allies does nothing in a duel.`);
    const home = runeMemo(rune.name, "home");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.ability === rune.label || ctx.tick < Number(ctx.self.memory[home] ?? -1)) return;
          if (ctx.persistent && !fighter.items.isAbilityDamage(ctx)) return;
          ctx.self.memory[home] = ctx.tick + toTicks(travel + linger + back);
          applyRune(ctx, rune.label, { type: "delayed", delay: travel, effects: [{ type: "damage", damageType: adaptiveType(fighter), amount: { base: damage, ratios: { bonusAD: ad, AP: ap } }, label: rune.label, noLifeSteal: true }] });
        },
      },
    };
  },
};

export const ArcaneComet: RuneModule = {
  rune: "Arcane Comet",
  build(rune, fighter) {
    const words = "Dealing ability damage or pet damage to an enemy champion hurls an Arcane Comet at their current location that lands after 0.825, dealing";
    const delay = rune.quoted(words);
    const damage = rune.level(words);
    const ratios = "(+ 10% bonus AD) (+ 5% AP) of either physical or magic damage to enemies within a 140 radius upon impact.";
    const [ad, ap, radius] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100, rune.quoted(ratios, 2)];
    const growth = rune.record.values.find((value) => value.context.includes("This damage is increased by"));
    if (growth?.series.kind !== "variable") throw new Error("Arcane Comet: its damage increase should be by units of distance");
    const [points, increases] = [growth.series.points.map(Number), growth.series.values.map(Number)];
    rune.quote("This damage is increased by 0% – 100% (based on units)");
    rune.noted("Arcane Comet can be blocked by spell shields.");
    rune.noted("Arcane Comet is not triggered from dealing 0 damage.");
    const wait = cooldown(rune.name, rune.cooldown());
    rune.assume("it lands with the chance a skillshot of its radius and delay has to hit (the simulator's hit model), as expected damage; its distance is the holder's from the enemy when it is hurled.");
    const increase = (distance: number) => {
      const i = points.findIndex((point) => point >= distance);
      if (i <= 0) return (i === 0 ? increases[0]! : increases.at(-1)!) / 100;
      return (increases[i - 1]! + ((increases[i]! - increases[i - 1]!) * (distance - points[i - 1]!)) / (points[i]! - points[i - 1]!)) / 100;
    };
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.amount <= 0 || !kitAbilityDamage(fighter, ctx) || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          const { world, self, enemy } = ctx;
          const chance = hitChance(
            { timeToLand: delay, reach: radius },
            { radius: enemy.spec.base.radius, moveSpeed: derive(enemy).moveSpeed, heldInPlace: heldInPlace(enemy, world.tick + toTicks(delay)), heldFor: Math.max(0, heldUntil(enemy) - world.tick) / 30, hasEscape: false },
            world.settings.reactionTime,
            world.settings.hitSpread,
          );
          const scale = 1 + increase(Math.abs(self.x - enemy.x));
          // A spell shield blocks the comet when it lands; the hook checks then.
          const landing = runeMemo(rune.name, "landing");
          ctx.self.memory[landing] = ctx.tick + toTicks(delay);
          ctx.self.memory[runeMemo(rune.name, "share")] = chance * scale;
        },
        onTick(ctx) {
          const landing = runeMemo(rune.name, "landing");
          if (ctx.tick !== Number(ctx.self.memory[landing] ?? -1)) return;
          delete ctx.self.memory[landing];
          if (consumeSpellShield(ctx.world, ctx.self, ctx.enemy)) return;
          const share = Number(ctx.self.memory[runeMemo(rune.name, "share")] ?? 0);
          applyRune(ctx, rune.label, { type: "damage", damageType: variableType(ctx, ad, ap), amount: { base: damage, ratios: { bonusAD: ad, AP: ap } }, label: rune.label, noLifeSteal: true }, false, share);
        },
      },
    };
  },
};

export const StormraidersSurge: RuneModule = {
  rune: "Stormraider's Surge",
  build(rune, fighter) {
    const words = "Dealing damage to an enemy champion equal to 25% of their maximum health within 3 seconds grants you 48% (melee) / 36% (ranged) bonus movement speed and 50% slow resist for 4 seconds.";
    const [share, window] = [rune.quoted(words) / 100, rune.quoted(words, 1)];
    const speed = rune.meleeRanged(words);
    const [resist, seconds] = [rune.quoted(words, 4) / 100, rune.quoted(words, 5)];
    const wait = cooldown(rune.name, rune.cooldown());
    const log = runeMemo(rune.name, "log");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (!wait.ready(ctx.self, ctx.tick)) return;
          const recent = String(ctx.self.memory[log] ?? "").split("|").filter(Boolean).map((entry) => entry.split(":").map(Number) as [number, number]).filter(([tick]) => ctx.tick - tick <= toTicks(window));
          recent.push([ctx.tick, ctx.amount]);
          ctx.self.memory[log] = recent.map(([tick, amount]) => `${tick}:${amount}`).join("|");
          if (recent.reduce((sum, [, amount]) => sum + amount, 0) < share * derive(ctx.enemy).maxHp) return;
          wait.start(ctx.self, ctx.tick);
          delete ctx.self.memory[log];
          applyRune(ctx, rune.label, { type: "stat", stat: "moveSpeedPercent", amount: { base: (fighter.ranged ? speed.ranged : speed.melee) / 100 }, duration: seconds }, true);
          applyRune(ctx, rune.label, { type: "stat", stat: "slowResist", amount: { base: resist }, duration: seconds }, true);
        },
      },
    };
  },
};

export const DeathfireTouch: RuneModule = {
  rune: "Deathfire Touch",
  build(rune, fighter) {
    const words = "Dealing ability damage or pet damage to enemy champions inflicts a burn that deals";
    const damage = rune.level(words);
    const ratios = "(+ 3.5% bonus AD) (+ 1.25% AP) magic damage every 0.5 seconds over the duration.";
    const [ad, ap, every] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100, rune.quoted(ratios, 2)];
    const lingerWords = "After the burn has lingered on a target for 3 seconds, its damage to them is increased by 75% while it lasts.";
    const [linger, amp] = [rune.quoted(lingerWords), rune.quoted(lingerWords, 1) / 100];
    const durations = { spell: rune.quoted("Spell damage: 4 seconds."), area: rune.quoted("Area damage: 2 seconds."), persistent: rune.quoted("Persistent damage: 1 second."), pet: rune.quoted("Pet damage: 1 second.") };
    rune.noted("Spell damage overrides the burn duration of all other damage types, and area damage overrides all other types except spell damage.");
    rune.assume("a hit refreshes the burn when its own duration is at least what is left of the burn; an ability's damage is area damage when it hits an area.");
    const [since, until, next] = [runeMemo(rune.name, "since"), runeMemo(rune.name, "until"), runeMemo(rune.name, "next")];
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.ability === rune.label || !kitAbilityDamage(fighter, ctx)) return;
          const seconds = ctx.petSource ? durations.pet : ctx.persistent ? durations.persistent : isArea(abilityNamed(ctx, ctx.ability)) ? durations.area : durations.spell;
          const end = ctx.tick + toTicks(seconds);
          const burning = ctx.tick <= Number(ctx.self.memory[until] ?? -1);
          if (!burning) {
            ctx.self.memory[since] = ctx.tick;
            ctx.self.memory[next] = ctx.tick + toTicks(every);
          }
          if (!burning || end >= Number(ctx.self.memory[until])) ctx.self.memory[until] = end;
        },
        onTick(ctx) {
          if (ctx.tick > Number(ctx.self.memory[until] ?? -1) || ctx.tick < Number(ctx.self.memory[next] ?? Number.POSITIVE_INFINITY)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(every);
          const lingered = ctx.tick - Number(ctx.self.memory[since]) >= toTicks(linger);
          applyRune(ctx, rune.label, { type: "damage", damageType: "magic", amount: { base: damage, ratios: { bonusAD: ad, AP: ap } }, label: rune.label, persistent: true, noLifeSteal: true }, false, lingered ? 1 + amp : 1);
        },
      },
    };
  },
};

export const AxiomArcanist: RuneModule = {
  rune: "Axiom Arcanist",
  build(rune, fighter) {
    const words = "Your ultimate has 12% increased damage (reduced to 8% for area of effect abilities), healing and shielding.";
    const [single, area] = [rune.quoted(words) / 100, rune.quoted(words, 1) / 100];
    const ultimates = new Set(Object.values(fighter.spec.forms ?? { [fighter.spec.name]: fighter.spec }).flatMap((form) => form.abilities.filter((ability) => ability.slot === "R").map((ability) => ability.name)));
    const holder = fighter.spec.id;
    rune.assume("its healing and shielding increase is left out; its takedown cooldown cut does nothing in a duel.");
    return {
      unmodeled: ["Its ultimate's healing and shielding: not modeled yet."],
      enemyHooks: {
        modifyDamageTakenRaw(ctx) {
          if (ctx.enemy.spec.id !== holder || ctx.ability === undefined || !ultimates.has(ctx.ability)) return ctx.raw;
          const ultimate = ctx.enemy.spec.abilities.find((ability) => ability.name === ctx.ability);
          return ctx.raw * (1 + (isArea(ultimate) ? area : single));
        },
      },
    };
  },
};

export const ManaflowBand: RuneModule = {
  rune: "Manaflow Band",
  build(rune) {
    const words = "permanently increases your maximum mana by 25, up to 250 mana.";
    const most = rune.quoted(words, 1);
    const restore = "After reaching 250 bonus mana, permanently restore 1% of your missing mana every 5 seconds.";
    const [share, every] = [rune.quoted(restore, 1) / 100, rune.quoted(restore, 2)];
    rune.assume(`fully stacked (${most} bonus mana): in a typical ${GAME_MINUTES}-minute game, a level-20 champion has had time to damage champions with its abilities.`);
    const next = runeMemo(rune.name, "next");
    return {
      mana: most,
      hooks: {
        onTick(ctx) {
          if (ctx.tick < Number(ctx.self.memory[next] ?? 0)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(every);
          ctx.apply({ type: "resource", amount: { base: share * Math.max(0, derive(ctx.self).maxResource - ctx.self.resource) } }, true);
        },
      },
    };
  },
};

export const NimbusCloak: RuneModule = {
  rune: "Nimbus Cloak",
  build(rune) {
    const words = "Using a summoner spell grants ghosting and 15% / 35% / 45% (based on summoner spell cooldown) bonus movement speed decaying over 2 seconds.";
    const tiers = [rune.quoted(words), rune.quoted(words, 1), rune.quoted(words, 2)].map((value) => value / 100);
    const seconds = rune.quoted(words, 3);
    rune.assume("its three bonuses go with summoner spell cooldowns under 180 seconds, of 180 to 239, and of 240 or more (the wiki names no breakpoints); the bonus lasts 2 seconds at half its value, for its decay.");
    return {
      hooks: {
        onCast(ctx) {
          if (!ctx.ability.key.startsWith("summoner:")) return;
          const cooldown = ctx.ability.cooldown;
          const speed = cooldown >= 240 ? tiers[2]! : cooldown >= 180 ? tiers[1]! : tiers[0]!;
          applyRune(ctx, rune.label, { type: "stat", stat: "moveSpeedPercent", amount: { base: speed / 2 }, duration: seconds }, true);
          applyRune(ctx, rune.label, { type: "state", state: "ghosted", duration: seconds }, true);
        },
      },
    };
  },
};

export const Transcendence: RuneModule = {
  rune: "Transcendence",
  build(rune) {
    const haste = rune.quoted("Level 5: + 5 ability haste.", 1) + rune.quoted("Level 8: + 5 ability haste.", 1);
    rune.quote("Level 11: Scoring a takedown against an enemy champion reduces the current cooldowns of your basic abilities by 20%.");
    return { bonus: { abilityHaste: haste }, unmodeled: ["Its takedown cooldown cut: a duel ends at the first takedown."] };
  },
};

export const Celerity: RuneModule = {
  rune: "Celerity",
  build(rune) {
    rune.quote("All movement speed bonuses increase in effectiveness by 7%.");
    return { permanent: [{ stat: "moveSpeedPercent", value: rune.quoted("Additionally, you gain 1% bonus movement speed.") / 100 }], unmodeled: ["Its 7% more effective movement speed bonuses: not modeled yet."] };
  },
};

export const AbsoluteFocus: RuneModule = {
  rune: "Absolute Focus",
  build(rune, fighter) {
    const words = "while above 70% of your maximum health.";
    const line = rune.quoted(words) / 100;
    const amount = rune.level("bonus attack damage or", fighter.adaptive === "ad" ? 0 : 1);
    const stat = adaptiveStat(fighter);
    return {
      hooks: {
        onTick(ctx) {
          runeStat(ctx, rune.name, stat, ctx.self.hp / derive(ctx.self).maxHp > line ? amount : 0);
        },
      },
    };
  },
};

export const GatheringStorm: RuneModule = {
  rune: "Gathering Storm",
  options: { minutes: { label: "Minutes of game time before the fight", default: GAME_MINUTES, basis: `a typical ${GAME_MINUTES}-minute game` } },
  build(rune, fighter, options) {
    const growth = rune.record.values.filter((value) => value.context.includes("Gain increasing adaptive Force every 10 minutes"));
    const series = growth[fighter.adaptive === "ad" ? 0 : 1]?.series;
    if (series?.kind !== "variable") throw new Error("Gathering Storm: its bonus should be by minutes");
    rune.quote("Gain increasing adaptive Force every 10 minutes");
    // Its bonus steps up every 10 minutes: the last step reached.
    const minutes = options.minutes ?? 0;
    let amount = 0;
    series.points.forEach((point, i) => {
      if (Number(point) <= minutes && typeof series.values[i] === "number") amount = series.values[i] as number;
    });
    return { bonus: adaptiveBonus(fighter, amount, amount) };
  },
};

export const Scorch: RuneModule = {
  rune: "Scorch",
  build(rune, fighter) {
    const words = "Dealing ability damage to an enemy champion sets them on fire, dealing them";
    const damage = rune.level(words);
    const delay = rune.quoted("bonus magic damage after 1 second.");
    const wait = cooldown(rune.name, rune.cooldown());
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.petSource || !kitAbilityDamage(fighter, ctx) || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          applyRune(ctx, rune.label, { type: "delayed", delay, effects: [{ type: "damage", damageType: "magic", amount: { base: damage }, label: rune.label, noLifeSteal: true }] });
        },
      },
    };
  },
};

/** Sorcery runes whose effects happen outside a duel. */
export const SORCERY_OUTSIDE: RuneModule[] = [
  { rune: "Waterwalking", build: (rune) => (rune.quote("While in the river"), { outsideDuels: "It works in the river, and a duel has none." }) },
];
