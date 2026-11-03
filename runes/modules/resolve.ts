/** The Resolve path's runes. */
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { toTicks } from "../../engine/rules/time";
import { budgetUses } from "../../engine/budget";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { abilityHas, attacks, casts, incoming, slowsOrImmobilizes, triggers, usesOf } from "../../items/hints";
import type { RuneModule } from "../equip";
import { GAME_MINUTES, LATE_GAME_ESTIMATE, adaptiveType, applyRune, cooldown, runeMemo, runeStat } from "../shared";

export const GraspOfTheUndying: RuneModule = {
  rune: "Grasp of the Undying",
  options: { procs: { label: "Grasp procs before the fight (each gives its permanent bonus health)", default: 30, basis: LATE_GAME_ESTIMATE } },
  build(rune, fighter, options) {
    const words = "Entering combat generates 1 stack every second for the next 3 seconds, refreshing the duration with each instance of combat and stacking the effect up to 4 times.";
    const most = rune.quoted(words, 2);
    const window = rune.quoted("At maximum stacks, your next basic attack on-hit within 5 seconds against an enemy champion consumes all stacks");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const damage = pick(rune.meleeRanged("to deal bonus magic damage equal to 3.5% (melee) / 1.4% (ranged) of your maximum health")) / 100;
    const heal = pick(rune.meleeRanged("heal you for 1.3% (melee) / 0.52% (ranged) of your maximum health")) / 100;
    const gain = pick(rune.meleeRanged("permanently grant you 5 (melee) / 2 (ranged) bonus health."));
    rune.noted("Grasp of the Undying deals proc damage, and thus will not trigger spell effects.");
    rune.assume("in combat it gains a stack every second; an unspent empowerment lapses after its 5 seconds, and the stacks start over.");
    const combat = fighter.items.combat();
    const [stacks, next, armed, gained] = [runeMemo(rune.name, "stacks"), runeMemo(rune.name, "next"), runeMemo(rune.name, "armed"), runeMemo(rune.name, "gained")];
    const earlier = gain * (options.procs ?? 0);
    return {
      ...(earlier > 0 ? { bonus: { hp: earlier } } : {}),
      hooks: {
        onTick(ctx) {
          if (ctx.self.memory[armed] !== undefined) {
            if (ctx.tick > Number(ctx.self.memory[armed])) {
              delete ctx.self.memory[armed];
              delete ctx.self.memory[stacks];
            }
            return;
          }
          if (!combat.inCombat(ctx.self, ctx.tick)) {
            delete ctx.self.memory[next];
            return;
          }
          if (ctx.tick < Number(ctx.self.memory[next] ?? ctx.tick)) return;
          ctx.self.memory[next] = ctx.tick + toTicks(1);
          const count = Number(ctx.self.memory[stacks] ?? 0) + 1;
          ctx.self.memory[stacks] = count;
          if (count >= most) ctx.self.memory[armed] = ctx.tick + toTicks(window);
        },
        onAttackHit(ctx) {
          if (ctx.self.memory[armed] === undefined || ctx.blocked) return;
          delete ctx.self.memory[armed];
          delete ctx.self.memory[stacks];
          const maxHp = derive(ctx.self).maxHp;
          applyRune(ctx, rune.label, { type: "damage", damageType: "magic", amount: { base: damage * maxHp }, label: rune.label, noLifeSteal: true }, false, ctx.scale);
          applyRune(ctx, rune.label, { type: "heal", amount: { base: heal * maxHp } }, true);
          const total = Number(ctx.self.memory[gained] ?? 0) + gain;
          ctx.self.memory[gained] = total;
          runeStat(ctx, rune.name, "health", total);
        },
      },
    };
  },
};

export const Aftershock: RuneModule = {
  rune: "Aftershock",
  build(rune) {
    const words = "Immobilizing an enemy champion grants you a static 45 (+ 75% bonus armor) bonus armor and 45 (+ 75% bonus magic resistance) bonus magic resistance for 2.5 seconds.";
    const [base, ratio, seconds] = [rune.quoted(words), rune.quoted(words, 1) / 100, rune.quoted(words, 4)];
    const cap = rune.level("The bonus resistances are each capped at");
    const shock = rune.level("After the duration, you release a shockwave that deals");
    const shockWords = "(+ 8% of your bonus health) magic damage to enemy champions and monsters within a 350 radius.";
    const [healthRatio, radius] = [rune.quoted(shockWords) / 100, rune.quoted(shockWords, 1)];
    rune.noted("Aftershock's bonus resistances do not scale dynamically; it only benefits from the bonus at the time of its trigger (excluding the base bonus).");
    const wait = cooldown(rune.name, rune.cooldown());
    const release = runeMemo(rune.name, "release");
    return {
      hooks: {
        onEnemyCCApplied(ctx) {
          if (!IMMOBILIZING.has(ctx.cc) || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          const d = derive(ctx.self);
          applyRune(ctx, rune.label, { type: "stat", stat: "armor", amount: { base: Math.min(cap, base + ratio * d.armor.bonus) }, duration: seconds }, true);
          applyRune(ctx, rune.label, { type: "stat", stat: "MR", amount: { base: Math.min(cap, base + ratio * d.mr.bonus) }, duration: seconds }, true);
          ctx.self.memory[release] = ctx.tick + toTicks(seconds);
        },
        onTick(ctx) {
          if (ctx.tick !== Number(ctx.self.memory[release] ?? -1)) return;
          delete ctx.self.memory[release];
          if (Math.abs(ctx.self.x - ctx.enemy.x) > radius + ctx.enemy.spec.base.radius) return;
          applyRune(ctx, rune.label, { type: "damage", damageType: "magic", amount: { base: shock, ratios: { bonusHP: healthRatio } }, label: rune.label, noLifeSteal: true });
        },
      },
    };
  },
};

export const Guardian: RuneModule = {
  rune: "Guardian",
  build(rune) {
    const words = "If you or a Guarded ally would take 50 – 165 (based on level) damage within 2.5 seconds or lethal damage from an enemy champion, monster or turret, you both gain a shield for";
    const [threshold, shield] = [rune.level(words), rune.level(words, 1)];
    const window = rune.quoted(words, 2);
    const ratios = "(+ 20% of your AP) (+ 6% of your bonus health) for 2 seconds.";
    const [ap, health, seconds] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100, rune.quoted(ratios, 2)];
    rune.quote("Guardian only goes on cooldown when the shield is triggered.");
    rune.noted("Guardian cannot trigger if the user is dead.");
    rune.assume("its shield goes up just before the hit that would bring the damage taken in 2.5 seconds to its threshold; its trigger on lethal damage is left out.");
    const wait = cooldown(rune.name, rune.cooldown());
    const log = runeMemo(rune.name, "log");
    return {
      hooks: {
        beforeDamageTaken(ctx) {
          if (ctx.amount <= 0) return;
          const recent = String(ctx.self.memory[log] ?? "").split("|").filter(Boolean).map((entry) => entry.split(":").map(Number) as [number, number]).filter(([tick]) => ctx.tick - tick < toTicks(window));
          recent.push([ctx.tick, ctx.amount]);
          ctx.self.memory[log] = recent.map(([tick, amount]) => `${tick}:${amount}`).join("|");
          if (!wait.ready(ctx.self, ctx.tick) || recent.reduce((sum, [, amount]) => sum + amount, 0) < threshold) return;
          wait.start(ctx.self, ctx.tick);
          delete ctx.self.memory[log];
          applyRune(ctx, rune.label, { type: "shield", amount: { base: shield, ratios: { AP: ap, bonusHP: health } }, duration: seconds }, true);
        },
      },
    };
  },
};

export const FontOfLife: RuneModule = {
  rune: "Font of Life",
  build(rune, fighter) {
    const heal = rune.level("Slowing or immobilizing an enemy champion heals you and the nearest and most wounded allied champion within 1000 units for", fighter.ranged ? 1 : 0);
    rune.noted("Font of Life will trigger if the user has no allies nearby, and triggers even while 100% maximum health.");
    const seconds = rune.cooldown();
    const wait = cooldown(rune.name, seconds);
    return {
      // Once a cast of the kit's that slows or immobilizes, at most once a cooldown.
      budget: { healing: (self) => heal * Math.min(triggers(seconds), usesOf(self, slowsOrImmobilizes)) },
      hooks: {
        onEnemyCrowdControlled(ctx) {
          if ((ctx.cc !== "slow" && !IMMOBILIZING.has(ctx.cc)) || !wait.ready(ctx.self, ctx.tick)) return;
          wait.start(ctx.self, ctx.tick);
          applyRune(ctx, rune.label, { type: "heal", amount: { base: heal } }, true);
        },
      },
    };
  },
};

/** The first shield an ability gives: on itself, its hits, its channel or its empowered attacks. */
function shieldOf(ability: AbilitySpec): Extract<Effect, { type: "shield" }> | undefined {
  const find = (effects: readonly Effect[] | undefined): Extract<Effect, { type: "shield" }> | undefined => {
    for (const e of effects ?? []) {
      if (e.type === "shield") return e;
      const inner = e.type === "delayed" ? find(e.effects) : e.type === "empower" ? find(e.onHit) : undefined;
      if (inner) return inner;
    }
    return undefined;
  };
  return find(ability.onSelf) ?? find(ability.onCastStart) ?? find(ability.onHit) ?? find(ability.channel?.onTick) ?? find(ability.channel?.onComplete);
}

export const ShieldBash: RuneModule = {
  rune: "Shield Bash",
  build(rune, fighter) {
    const words = "Whenever you gain a shield, your next attack against an enemy champion is empowered to deal";
    const damage = rune.level(words);
    const ratios = "(+ 2.5% bonus health) (+ 15% shield amount) bonus adaptive damage on-hit.";
    const [health, share] = [rune.quoted(ratios) / 100, rune.quoted(ratios, 1) / 100];
    const linger = rune.quoted("The empowered attack lasts for up to 2 seconds after the shield expires.");
    rune.noted("Shield Bash triggers from all shield types, including magic and physical ones.");
    rune.noted("Shield Bash's shield scaling is calculated with the initial maximum value of the shield.");
    const [seen, armed, until] = [runeMemo(rune.name, "seen"), runeMemo(rune.name, "armed"), runeMemo(rune.name, "until")];
    return {
      // An empowered attack for each cast of the kit's that shields the holder, at most one an attack.
      budget: {
        damage(self) {
          const bonusHealth = derive(self).maxHp - self.spec.base.hp;
          let rate = 0;
          let total = 0;
          for (const use of budgetUses(self)) {
            const shield = shieldOf(use.ability);
            if (!shield) continue;
            rate += use.perSecond;
            total += use.perSecond * (damage + health * bonusHealth + share * evaluate(shield.amount, self));
          }
          const cap = attacks(self);
          return { [adaptiveType(fighter)]: rate > cap && rate > 0 ? (total * cap) / rate : total };
        },
      },
      hooks: {
        onTick(ctx) {
          const known = new Set(String(ctx.self.memory[seen] ?? "").split("|").filter(Boolean));
          for (const status of ctx.self.statuses) {
            if (status.kind !== "shield") continue;
            const id = `${status.key}@${status.startTick}`;
            if (known.has(id)) continue;
            known.add(id);
            ctx.self.memory[armed] = Math.max(Number(ctx.self.memory[armed] ?? 0), status.value);
            ctx.self.memory[until] = Math.max(Number(ctx.self.memory[until] ?? 0), status.endTick + toTicks(linger));
          }
          ctx.self.memory[seen] = [...known].filter((id) => Number(id.split("@").at(-1)) >= ctx.tick - 30 * 60).join("|");
          if (ctx.self.memory[armed] !== undefined && ctx.tick > Number(ctx.self.memory[until] ?? -1)) delete ctx.self.memory[armed];
        },
        onAttackHit(ctx) {
          const amount = ctx.self.memory[armed];
          if (amount === undefined || ctx.blocked) return;
          delete ctx.self.memory[armed];
          applyRune(ctx, rune.label, { type: "damage", damageType: adaptiveType(fighter), amount: { base: damage + share * Number(amount), ratios: { bonusHP: health } }, label: rune.label, noLifeSteal: true }, false, ctx.scale);
        },
      },
    };
  },
};

export const Conditioning: RuneModule = {
  rune: "Conditioning",
  build(rune) {
    const words = "After 12 minutes, gain 8 bonus armor and 8 bonus magic resistance and your total armor and total magic resistance are increased by 3%.";
    rune.assume(`the fight comes after 12 minutes, in a typical ${GAME_MINUTES}-minute game.`);
    const percent = rune.quoted(words, 3) / 100;
    return { bonus: { armor: rune.quoted(words, 1), mr: rune.quoted(words, 2) }, permanent: [{ stat: "armorPercent", value: percent }, { stat: "mrPercent", value: percent }] };
  },
};

export const SecondWind: RuneModule = {
  rune: "Second Wind",
  build(rune) {
    const words = "After taking damage from an enemy champion, regenerate 4% of your missing health over 10 seconds, refreshing on subsequent damage.";
    const [share, seconds] = [rune.quoted(words) / 100, rune.quoted(words, 1)];
    rune.noted("Second Wind will not trigger if the damage is:");
    const until = runeMemo(rune.name, "until");
    return {
      // Taking damage throughout, over a fight from full health to none: half the maximum health missing on average.
      budget: { healing: (self) => ((share / seconds) * derive(self).maxHp) / 2 },
      hooks: {
        onDamageTaken(ctx) {
          if (ctx.amount > 0) ctx.self.memory[until] = ctx.tick + toTicks(seconds);
        },
        onTick(ctx) {
          if (ctx.tick > Number(ctx.self.memory[until] ?? -1)) return;
          ctx.regenerate((share * Math.max(0, derive(ctx.self).maxHp - ctx.self.hp)) / toTicks(seconds));
        },
      },
    };
  },
};

export const BonePlating: RuneModule = {
  rune: "Bone Plating",
  build(rune) {
    const words = "After taking damage from an enemy champion, activate Bone Plating for 1.5 seconds. While active, the next 3 spells or attacks you receive from the enemy champion that triggered this effect deal";
    const [seconds, hits] = [rune.quoted(words), rune.quoted(words, 1)];
    const reduction = rune.level("While active, the next 3 spells or attacks you receive from the enemy champion that triggered this effect deal");
    rune.quote("less damage (including true damage).");
    rune.noted("The triggering instance of damage will not have its damage reduced by Bone Plating.");
    rune.noted("Bone Plating's damage reduction applies to the post-mitigation damage of the incoming attack or spell.");
    rune.noted("Bone Plating will still go on cooldown after its duration even if it does not block any damage.");
    rune.noted("Bone Plating's damage reduction can only occur once per cast instance.");
    rune.assume("it takes its reduction off the damage left after shields; damage over time doesn't count, each basic attack is a cast instance, and an ability's hits from one cast are one.");
    // Its cooldown runs from the end of its duration.
    const cycle = seconds + rune.cooldown();
    const wait = cooldown(rune.name, cycle);
    const [until, left, instances] = [runeMemo(rune.name, "until"), runeMemo(rune.name, "left"), runeMemo(rune.name, "instances")];
    const active = (ctx: HookContext) => ctx.tick <= Number(ctx.self.memory[until] ?? -1) && Number(ctx.self.memory[left] ?? 0) > 0;
    return {
      // The enemy's attacks and casts within its window after the first, each the enemy's average hit, at most its reduction.
      budget: {
        shielding(self, enemy) {
          const coming = incoming(self, enemy);
          const perSecond = coming.physical + coming.magic + coming.true;
          const instances = attacks(enemy) + casts(enemy);
          if (instances <= 0 || perSecond <= 0) return 0;
          return Math.min(reduction, perSecond / instances) * Math.min(hits, instances * seconds) * triggers(cycle);
        },
      },
      hooks: {
        modifyDamageAfterShields(ctx) {
          if (ctx.persistent || !active(ctx)) return ctx.amount;
          const instance = ctx.attack ? `attack@${ctx.tick}` : (ctx.ability ?? "ability");
          const used = String(ctx.self.memory[instances] ?? "").split("|");
          if (used.includes(instance)) return ctx.amount;
          ctx.self.memory[instances] = [...used, instance].join("|");
          ctx.self.memory[left] = Number(ctx.self.memory[left]) - 1;
          return Math.max(0, ctx.amount - reduction);
        },
        onDamageTaken(ctx) {
          if (ctx.amount <= 0 || active(ctx) || !wait.ready(ctx.self, ctx.tick)) return;
          ctx.self.memory[until] = ctx.tick + toTicks(seconds);
          ctx.self.memory[left] = hits;
          // The triggering hit's cast instance is still reducible by a later hit of it (the notes).
          ctx.self.memory[instances] = "";
          wait.start(ctx.self, ctx.tick);
        },
      },
    };
  },
};

export const Overgrowth: RuneModule = {
  rune: "Overgrowth",
  options: { stacks: { label: "Overgrowth stacks before the fight (one per 8 monsters or minions dying nearby)", default: 30, basis: LATE_GAME_ESTIMATE } },
  build(rune, fighter, options) {
    const words = "Every 8 monsters or enemy minions that die near you permanently generates a stack. Each stack grants 3 bonus health.";
    const perStack = rune.quoted(words, 1);
    const threshold = "After reaching 15 stacks (120 monsters or minions), your base and bonus health are permanently increased by 3.5%.";
    const [needed, percent] = [rune.quoted(threshold), rune.quoted(threshold, 2) / 100];
    const stacks = options.stacks ?? 0;
    const flat = perStack * stacks;
    const health = fighter.spec.base.hp + (fighter.bonus.hp ?? 0) + flat;
    return { bonus: { hp: flat + (stacks >= needed ? percent * health : 0) } };
  },
};

export const Unflinching: RuneModule = {
  rune: "Unflinching",
  build(rune) {
    const words = "While afflicted with crowd control sourced from enemy champions, gain 10 bonus armor and 10 bonus magic resistance, lingering for 2 seconds after the impairment ends.";
    const [armor, mr, linger] = [rune.quoted(words), rune.quoted(words, 1), rune.quoted(words, 2)];
    rune.noted("Unflinching triggers from all forms of crowd control, except for kinematics and disruption.");
    const last = runeMemo(rune.name, "last");
    const controls = (ability: AbilitySpec) => abilityHas(ability, (e) => e.type === "cc" || e.type === "displace");
    return {
      // Its share of the fight: a second of crowd control for each of the enemy's casts that has some, and its linger.
      budget: {
        stats(_self, enemy) {
          const share = Math.min(1, usesOf(enemy, controls) * (1 + linger));
          return [{ stat: "armor", value: armor * share }, { stat: "MR", value: mr * share }];
        },
      },
      hooks: {
        onTick(ctx) {
          const held = [...ccTypes(ctx.self)].some((type) => type !== "kinematics");
          if (held) ctx.self.memory[last] = ctx.tick;
          const on = ctx.tick - Number(ctx.self.memory[last] ?? Number.NEGATIVE_INFINITY) <= toTicks(linger);
          runeStat(ctx, rune.name, "armor", on ? armor : 0);
          runeStat(ctx, rune.name, "MR", on ? mr : 0);
        },
      },
    };
  },
};

/** Resolve runes the simulator leaves out, and those whose effects happen outside a duel. */
export const RESOLVE_OUTSIDE: RuneModule[] = [
  { rune: "Demolish", build: (rune) => (rune.quote("Basic attacks on-hit against turrets apply a stack of Demolish"), { outsideDuels: "It damages turrets, and a duel has none." }) },
  { rune: "Revitalize", build: (rune) => (rune.quote("Grants 5% Heal and shield power."), { unmodeled: ["Its heal and shield power: the simulator has none yet."] }) },
];
