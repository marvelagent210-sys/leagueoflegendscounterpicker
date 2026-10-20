/** Warwick: Eternal Hunger's thresholds, the Jaws of the Beast bite, Blood Hunt, Primal Howl and Infinite Duress. */
import { numbersIn } from "../../engine/kits/context";
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, completeCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, heal } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { attackDamage, extraAttacks, maxHp, scaled, ticks } from "./util";

const warwick: KitModule = {
  champion: "Warwick",
  build(kit) {
    const passive = kit.ability("Eternal Hunger");
    const q = kit.ability("Jaws of the Beast");
    const w = kit.ability("Blood Hunt");
    const e = kit.ability("Primal Howl");
    const r = kit.ability("Infinite Duress");

    // Eternal Hunger: magic damage on-hit, and healing from it at low health.
    const hunger: Formula = { base: passive.levelValue("Warwick deals", 0), ratios: { bonusAD: passive.quoted("(+ 15% bonus AD)", 0) / 100, AP: passive.quoted("(+ 10% AP)", 0) / 100 } };
    const hungerBelow = passive.quoted("While below 50% maximum health", 0) / 100;
    const hungerHeal = passive.quoted("heals for 100% of the post-mitigation damage dealt by Eternal Hunger", 0) / 100;
    const hungerHealLow = passive.quoted("increased to 250% while below 25% maximum health", 0) / 100;
    const hungerBelowLow = passive.quoted("increased to 250% while below 25% maximum health", 1) / 100;

    // Jaws of the Beast: the bite lands 0.264 s into the lunge, healing for a share of its own damage.
    const biteDelay = q.quoted("lunges at the target enemy over 0.264 and bites them", 0);
    const bite = q.formula("Magic Damage");
    const biteHeal = q.fraction("Healing Percentage");
    const qRange = q.field("targetRange");
    q.quote("The healing is calculated only from Jaws of the Beast's damage, while additional effects, such as on-hits, are not");
    q.quote("This does not affect the lockout timer, which is the same as the bite's delay");
    q.quote("The lunge always places Warwick to his attack range to the center of his target");
    q.quote("Jaws of the Beast's channel cannot be initiated while grounded or rooted. Warwick can only use the normal cast");
    kit.assume("Jaws of the Beast is always tapped: the bite, never the held charge that leaps behind the target.");
    kit.assume("Jaws of the Beast's lunge ends with the bite, 0.264 s after the cast; the wiki's longer lunges from farther away (up to 0.5 s) are left out, and so is the bite still landing if Warwick dies during the lunge.");

    // Blood Hunt: attack speed against hunted enemies, movement speed toward them, and the active's mark.
    const huntAs = w.fraction("Bonus Attack Speed");
    const huntAsLow = w.fraction("Increased Attack Speed");
    const huntMs = w.fraction("Bonus Movement Speed");
    const huntMsLow = w.fraction("Increased Movement Speed");
    const huntBelow = w.quoted("while they are below 50% of their maximum health", 0) / 100;
    const huntBelowLow = w.quoted("doubled against enemies who are below 25% of their maximum health", 0) / 100;
    const huntAsSeconds = w.quoted("gains bonus attack speed for 1.25 seconds", 0);
    const combatLoss = w.quoted("This bonus is lost for 0.5 seconds upon entering champion combat", 0);
    const buildUp = w.quoted("but will build up again over 3.5 seconds", 0);
    const markSeconds = w.quoted("marking them with Blood Hunt for 8 seconds", 0);
    w.quote("If Warwick does not have the bonus attack speed already, he also gains it upon initiating an attack windup against an enemy below the threshold");
    w.quote("it does not refresh the duration of the attack speed buff if Warwick has it already");
    kit.assume("Blood Hunt's movement speed applies while Warwick walks toward a hunted enemy, ramping up evenly over 3.5 s after the 0.5 s it is lost on dealing or taking champion damage.");

    // Primal Howl: damage reduction, then a howl that fears and slows.
    const howlSeconds = e.quoted("Warwick gains damage reduction for up to 2.75 seconds", 0);
    const howlReduction = e.fraction("Damage Reduction");
    const recastAfter = e.quoted("Primal Howl can be recast after 1 second", 0);
    const fearSeconds = e.quoted("fearing nearby enemies for 1 second", 0);
    const howlSlow = e.quoted("slowing them by 90%", 0) / 100;
    const howlRadius = e.field("effectRadius");
    const howlLockout = e.quoted("The recast's howling animation has a 0.25-second lockout time", 0);
    e.quote("Primal Howl's recast resets Warwick's basic attack timer");
    e.quote("Warwick cannot attack or cast abilities during the animation");

    // Infinite Duress: a leap as far as 250% of the movement speed he averaged lately, then a 1.5 s suppression.
    const rangeShare = r.field("range", "Measures the average") / 100;
    const [averageSeconds = 2.5, sampleSeconds = 0.25] = numbersIn(r.fieldLabel("range", "Measures the average"));
    const minRange = r.quoted("The minimum range of the ability is 275 units", 0);
    const collision = r.field("collisionRadius");
    const duressSeconds = r.quoted("channels for up to 1.5 seconds", 0);
    const pulseSeconds = r.quoted("deal magic damage every 0.25 seconds", 0);
    const duressTotal = r.formula("Total Magic Damage");
    const duressHeal = r.quoted("Warwick heals for 100% of all post-mitigation damage he deals to the target during Infinite Duress", 0) / 100;
    r.quote("The 1st, 3rd, and 5th ticks deals 2/9ths of the total damage as a single instance while applying both spell and on-hit effects");
    r.quote("The 2nd, 4th, and 6th ticks deal 1/9ths of the total damage as a single instance while applying spell effects but not on-hit effects");
    r.quote("Warwick gains the cc-immunity at the start of the cast time");
    r.quote("If the target is crowd control immune or protected by spell shield upon collision, Warwick will not start the channel");
    r.quote("Spell shield will not prevent the effects of Infinite Duress if Warwick is already channeling");
    r.quote("Cleansing the suppression does not interrupt the channel and Warwick will continue to strike but not deal any damage");
    r.quote("Primal Howl can be cast during the dash");
    e.quote("Starting Infinite Duress channel while Primal Howl is active will initiate the recast without ending the damage reduction buff prematurely");
    const leapSeconds = 0.5;
    kit.assume(`Infinite Duress's leap speed is in neither the wiki nor the game data: the leap is taken to cover its range in ${leapSeconds} s, and its slide past the range when it misses is left out.`);
    kit.assume("Infinite Duress's on-attack effects (three over the channel) are left out; its on-hit effects apply.");

    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), rCooldown = r.cooldown();
    const pulses = Math.round(duressSeconds / pulseSeconds);
    const pulseTick = (k: number) => Math.round(k * pulseSeconds * 30);
    const samples = Math.max(1, Math.round(averageSeconds / sampleSeconds));
    const sampleTicks = ticks(sampleSeconds);

    // Infinite Duress's range from the movement speed samples of the last 2.5 seconds.
    const averageSpeed = (unit: Unit) => {
      let sum = 0;
      let n = 0;
      for (let i = 0; i < samples; i++) {
        const v = unit.memory[`duressSpeed${i}`];
        if (typeof v === "number") { sum += v; n++; }
      }
      return n > 0 ? sum / n : derive(unit).moveSpeed;
    };
    const duressRange = (unit: Unit) => Math.max(minRange, rangeShare * averageSpeed(unit));
    const referenceRange = Math.max(minRange, rangeShare * kit.champion.forms[0]!.stats.moveSpeed);

    const marked = (unit: Unit, world: World) => world.tick < Number(unit.memory.huntMarkUntil ?? -1);
    const hunted = (self: Unit, enemy: Unit, world: World) => enemy.hp < huntBelow * maxHp(enemy) || marked(self, world);
    const low = (enemy: Unit) => enemy.hp < huntBelowLow * maxHp(enemy);
    const locked = (unit: Unit, world: World) => world.tick < Number(unit.memory.lockUntil ?? -1);
    const howling = (unit: Unit) => unit.statuses.some((s) => s.kind === "state" && s.key === "damageReduction" && s.memoKey === "warwick:howl");
    const duressSuppressing = (self: Unit, enemy: Unit) => enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression" && s.source === self.side && s.ability === "R");

    const huntSpeed = (ctx: HookContext) => {
      const amount = low(ctx.enemy) ? huntAsLow : huntAs;
      ctx.buff("warwick:hunt", "attackSpeed", amount, huntAsSeconds);
      ctx.memory.huntAsUntil = ctx.tick + ticks(huntAsSeconds);
    };
    const lockout = (ctx: HookContext, seconds: number) => {
      ctx.memory.lockUntil = Math.max(Number(ctx.memory.lockUntil ?? -1), ctx.tick + ticks(seconds));
      ctx.apply({ type: "state", state: "noAttacks", duration: seconds }, true);
    };

    const pulseSpec = (onHit: boolean): AbilitySpec => ({
      key: "R",
      name: r.name,
      slot: "R",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "self" },
      flags: { spellShield: false, appliesOnHit: onHit, appliesLifeSteal: true },
    });
    const strongPulse = pulseSpec(true);
    const weakPulse = pulseSpec(false);
    const pulseDamage = (share: number): Effect => ({ type: "damage", damageType: "magic", amount: scaled(duressTotal, share), label: r.name });

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        // The bite's fixed delay works as the cast's lockout; the bite lands as it ends.
        castTime: biteDelay,
        delivery: { kind: "target", range: qRange },
        onCastStart: [{ type: "state", state: "displacementImmune", duration: biteDelay }],
        onHit: [{ type: "damage", damageType: "magic", amount: bite, label: q.name }],
        flags: { spellShield: q.flag("spellShield") ?? true, parry: q.flag("parry") ?? true, appliesOnHit: true, appliesLifeSteal: true, grounded: false },
        roles: ["damage"],
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "self" },
        roles: ["buff"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        chainCooldown: "last",
        overlay: true,
        delivery: { kind: "self" },
        roles: ["defense"],
      },
      {
        key: "E2",
        name: `${e.name} (recast)`,
        slot: "E",
        cooldown: 0,
        castTime: 0,
        chain: { root: "E", index: 2, window: howlSeconds, delay: recastAfter, auto: true },
        delivery: { kind: "aura", radius: howlRadius },
        onHit: [{ type: "cc", cc: "fear", duration: fearSeconds }, { type: "cc", cc: "slow", strength: howlSlow, duration: fearSeconds }],
        onSelf: [{ type: "resetAttack" }],
        flags: { spellShield: e.flag("spellShield") ?? true },
        roles: ["cc"],
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        cooldownAtCastStart: true,
        onCastStart: [{ type: "state", state: "ccImmune", duration: r.castTime() + leapSeconds }],
        delivery: {
          kind: "dash",
          direction: "toward",
          distance: referenceRange,
          distanceFor: duressRange,
          speed: referenceRange / leapSeconds,
          speedFor: (unit) => duressRange(unit) / leapSeconds,
          hitRadius: collision - kit.champion.forms[0]!.stats.gameplayRadius,
          sidestep: { reach: collision },
        },
        onHit: [{ type: "knockdown" }, { type: "cc", cc: "suppression", duration: duressSeconds }],
        channel: { duration: duressSeconds, interruptible: true, manualStart: true },
        flags: { grounded: r.flag("grounded") ?? true, knockdown: false, spellShield: true },
        decisive: true,
        roles: ["damage", "cc", "engage"],
        estimate: (self, target) => evaluate(duressTotal, self, target),
      },
    ];
    // Primal Howl's recast and Jaws of the Beast lock him out; nothing is cast until they end.
    for (const ability of abilities) {
      const original = ability.usable;
      ability.usable = (unit, world) => !locked(unit, world) && (!original || original(unit, world));
    }
    const qSpec = abilities[0]!;
    const e2Spec = abilities[3]!;

    const ready = (view: Parameters<Behavior>[0], key: string) => {
      const ability = view.self.spec.abilities.find((a) => a.key === key);
      return ability !== undefined && canCast(view.world, view.self, ability);
    };
    const cast = (key: string) => ({ kind: "cast" as const, ability: key });
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode, distance } = view;
      if (mode === "idle") return undefined;
      // During Infinite Duress's leap: Primal Howl, for its damage reduction and the howl at the channel's start.
      if (self.action?.kind === "dash") return self.action.ability === "R" && !howling(self) && ready(view, "E") ? cast("E") : undefined;
      if (self.action && self.action.kind !== "windup") return undefined;
      const centers = Math.abs(enemy.x - self.x);
      if (mode === "flee") {
        if (ready(view, "E2") && distance <= howlRadius) return cast("E2");
        if (ready(view, "E") && distance <= howlRadius) return cast("E");
        return defaultBehavior(view);
      }
      // Blood Hunt as the fight starts: its attack speed for 8 s whatever the enemy's health.
      if (ready(view, "W") && !marked(self, world) && distance <= 1000) return cast("W");
      if (mode === "fight" && ready(view, "R") && centers + enemy.spec.base.radius <= duressRange(self) - 50 && !ccTypes(enemy).has("suppression")) return cast("R");
      if (ready(view, "Q") && centers <= qRange) return cast("Q");
      if (ready(view, "E") && distance <= self.spec.attack.range + 50 && (view.threats.length > 0 || mode === "trade")) return cast("E");
      // The howl as the enemy tries to walk out of it, or to stop it hitting back when low.
      if (ready(view, "E2") && distance <= howlRadius - 25 && (enemy.moved === -1 || self.hp < 0.3 * maxHp(self))) return cast("E2");
      return defaultBehavior(view);
    };

    return {
      abilities,
      behavior,
      attack: { onHit: [{ type: "damage", damageType: "magic", amount: hunger, label: passive.name }] },
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          // Blood Hunt: the enemy is below 50% for about half the fight and below 25% for a quarter; the active marks it 8 s a cast.
          const markShare = markSeconds / cooldownAfterHaste(wCooldown, d.abilityHaste);
          const huntShare = 0.5 + 0.5 * markShare;
          const extra = extraAttacks(self, huntAs * huntShare + (huntAsLow - huntAs) * 0.25);
          const rCycle = cooldownAfterHaste(rCooldown, d.abilityHaste);
          return { physical: attackDamage(self) * extra, magic: evaluate(hunger, self, target) * (extra + 3 / rCycle) + evaluate(duressTotal, self, target) / rCycle };
        },
        healing: (self, target) => {
          const d = derive(self);
          const attacks = d.attackSpeed;
          // Below 50% about half the fight, below 25% about a quarter.
          const hungerShare = hungerHeal * 0.5 + (hungerHealLow - hungerHeal) * 0.25;
          const qCycle = cooldownAfterHaste(qCooldown, d.abilityHaste);
          const rCycle = cooldownAfterHaste(rCooldown, d.abilityHaste);
          return evaluate(hunger, self, target) * attacks * hungerShare + (biteHeal * evaluate(bite, self, target)) / qCycle + (duressHeal * evaluate(duressTotal, self, target)) / rCycle;
        },
      },
      hooks: {
        onStart(ctx) {
          for (let i = 0; i < samples; i++) ctx.memory[`duressSpeed${i}`] = derive(ctx.self).moveSpeed;
          ctx.memory.duressNext = ctx.tick + sampleTicks;
          ctx.memory.combatTick = -Number.MAX_SAFE_INTEGER;
        },
        onTick(ctx) {
          const self = ctx.self;
          // The lunge follows the target: the gap left closes by the bite.
          const lungeUntil = Number(ctx.memory.lungeUntil ?? -1);
          if (ctx.tick < lungeUntil) {
            const end = Math.max(self.spec.attack.range, self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius);
            const gap = Math.abs(ctx.enemy.x - self.x) - end;
            self.forced = { endTick: lungeUntil, perTick: gap > 0 ? -gap / (lungeUntil - ctx.tick) : 0 };
          }
          // Blood Hunt's trail: movement speed toward a hunted enemy, lost on champion combat and built back up.
          if (hunted(self, ctx.enemy, ctx.world) && self.move === 1) {
            const since = ctx.tick - Number(ctx.memory.combatTick) - ticks(combatLoss);
            const share = since < 0 ? 0 : Math.min(1, since / ticks(buildUp));
            ctx.buff("warwick:trail", "moveSpeedPercent", (low(ctx.enemy) ? huntMsLow : huntMs) * share, 2 / 30);
          } else ctx.buff("warwick:trail", "moveSpeedPercent", 0, 0);
          // Movement speed samples for Infinite Duress's range.
          if (ctx.tick >= Number(ctx.memory.duressNext)) {
            for (let i = samples - 1; i > 0; i--) ctx.memory[`duressSpeed${i}`] = ctx.memory[`duressSpeed${i - 1}`] ?? derive(self).moveSpeed;
            ctx.memory.duressSpeed0 = derive(self).moveSpeed;
            ctx.memory.duressNext = ctx.tick + sampleTicks;
          }
          // Infinite Duress's six strikes, on the channel's own clock (interrupting it stops them).
          const start = Number(ctx.memory.duressStart ?? -1);
          if (start >= 0) {
            let next = Number(ctx.memory.duressPulse ?? 1);
            while (next <= pulses && ctx.tick >= start + pulseTick(next)) {
              // The last strike lands as the suppression runs out; one removed early (cleansed) stops the damage for good.
              const holding = duressSuppressing(self, ctx.enemy);
              if (!holding && ctx.tick < Number(ctx.memory.duressHeldUntil)) ctx.memory.duressCleansed = true;
              if (!ctx.memory.duressCleansed && (holding || ctx.tick >= Number(ctx.memory.duressHeldUntil))) {
                const strong = next % 2 === 1;
                abilityHit(ctx.world, self, ctx.enemy, strong ? strongPulse : weakPulse, [pulseDamage(strong ? 2 / 9 : 1 / 9)]);
              } else ctx.log(`${r.name} strikes, with no damage: the suppression was removed`);
              next++;
            }
            ctx.memory.duressPulse = next;
            if (next > pulses) {
              ctx.memory.duressStart = -1;
              if (self.action?.kind === "channel" && self.action.ability === "R") self.action = undefined;
            }
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") {
            // The lunge, unless rooted or grounded: then he bites from where he stands.
            const held = ccTypes(ctx.self);
            if (!held.has("root") && !held.has("ground")) ctx.memory.lungeUntil = ctx.tick + ticks(biteDelay);
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            ctx.memory.huntMarkUntil = ctx.tick + ticks(markSeconds);
            ctx.apply({ type: "mark", key: "warwick:bloodHunt", duration: markSeconds });
          }
          if (key === "E") {
            ctx.self.statuses.push({ kind: "state", key: "damageReduction", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(howlSeconds), value: howlReduction, memoKey: "warwick:howl" });
          }
          if (key === "E2") {
            // The howl ends the damage reduction, unless Infinite Duress's channel set it off.
            if (!ctx.memory.howlKeeps) ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "warwick:howl");
            lockout(ctx, howlLockout);
          }
        },
        onAbilityHit(ctx) {
          // The leap's collision (the strikes are hits of their own, without a channel).
          if (ctx.ability.key !== "R" || !ctx.ability.channel) return;
          // The channel starts only on a target the suppression took hold of.
          if (!duressSuppressing(ctx.self, ctx.enemy)) {
            ctx.log(`${r.name} doesn't channel: the target resisted the suppression`);
            return;
          }
          const endTick = ctx.tick + pulseTick(pulses);
          ctx.self.action = { kind: "channel", ability: "R", startTick: ctx.tick, endTick, nextTick: Number.POSITIVE_INFINITY, intervalTicks: Number.POSITIVE_INFINITY };
          ctx.memory.duressStart = ctx.tick;
          ctx.memory.duressCleansed = false;
          ctx.memory.duressHeldUntil = ctx.enemy.statuses.find((st) => st.kind === "cc" && st.key === "suppression" && st.source === ctx.self.side && st.ability === "R")?.endTick ?? ctx.tick;
          ctx.memory.duressPulse = 1;
          ctx.memory.duressUntil = endTick;
          if (ctx.self.chains.E) {
            ctx.memory.howlKeeps = true;
            completeCast(ctx.world, ctx.self, e2Spec, ctx.tick);
            ctx.memory.howlKeeps = false;
          }
        },
        onChannelInterrupt(ctx) {
          if (ctx.ability.key !== "R") return;
          ctx.memory.duressStart = -1;
          ctx.memory.duressUntil = -1;
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "R") ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "ccImmune" && s.ability === "R" && s.source === ctx.self.side));
        },
        onAttack(ctx) {
          // Blood Hunt's attack speed on starting an attack against a hunted enemy, unless he has it already.
          // An enemy pet counts by its own health; the active's mark is only on the champion.
          const below = ctx.targetPet ? ctx.enemy.hp < huntBelow * maxHp(ctx.enemy) : hunted(ctx.self, ctx.enemy, ctx.world);
          if (ctx.tick >= Number(ctx.memory.huntAsUntil ?? -1) && below) huntSpeed(ctx);
        },
        onDamageDealt(ctx) {
          if (ctx.petSource) return;
          ctx.memory.combatTick = ctx.tick;
          // Blood Hunt's attack speed for damaging an enemy to or while below 50%.
          if (!ctx.persistent && hunted(ctx.self, ctx.enemy, ctx.world)) huntSpeed(ctx);
          const self = ctx.self;
          const share = self.hp / maxHp(self);
          if (ctx.ability === passive.name && share < hungerBelow) heal(ctx.world, self, ctx.mitigated * (share < hungerBelowLow ? hungerHealLow : hungerHeal));
          if (ctx.ability === q.name) heal(ctx.world, self, ctx.mitigated * biteHeal);
          if (ctx.tick <= Number(ctx.memory.duressUntil ?? -1)) heal(ctx.world, self, ctx.mitigated * duressHeal);
        },
        onDamageTaken(ctx) {
          if (!ctx.petSource) ctx.memory.combatTick = ctx.tick;
        },
      },
    };
  },
};
export default warwick;
