/**
 * Bel'Veth (patch 26.20): uncapped attack speed from Lavender stacks and her casts, Endless
 * Banquet's true damage growing with every hit on a marked enemy, Void Surge's dashes through
 * the enemy (each direction on its own cooldown), Above and Below's knock-up, and Royal
 * Maelstrom's rooted flurry of slashes.
 */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import { CC_RULES } from "../../engine/rules/crowdControl";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, innateStat, scaled, seriesAt, ticks } from "./util";

const SIDES = 4;

const belveth: KitModule = {
  champion: "Belveth",
  options: {
    lavender: { label: "Lavender stacks by level 20 (1 per large minion or large monster, 2 per champion or epic monster takedown)", default: 40 },
    trueForm: { label: "True Form at the start of the fight (1 = yes, 0 = no: it needs a Void Coral, which a duel has none of)", default: 0 },
  },
  build(kit, options) {
    const p = kit.ability("Death in Lavender");
    const q = kit.ability("Void Surge");
    const w = kit.ability("Above and Below");
    const e = kit.ability("Royal Maelstrom");
    const r = kit.ability("Endless Banquet");

    // Death in Lavender: no attack speed cap; 2.3% bonus attack speed per Lavender stack; casts grant ghosting and 20% attack speed for 3 s.
    p.quote("Bel'Veth is allowed to exceed the attack speed cap.");
    const perStack = p.levelValue("For each stack, Bel'Veth gains", 0) / 100;
    const stacks = Math.max(0, Math.round(options.lavender ?? 0));
    const castWords = "Bel'Veth's ability casts grant her ghosting and 20% bonus attack speed for 3 seconds, refreshing on subsequent casts.";
    const castSpeed = p.quoted(castWords, 0) / 100;
    const castSeconds = p.quoted(castWords, 1);
    const cap = p.quoted("Bel'Veth's attack speed cap is increased to 9999.0", 0);

    // Endless Banquet's passive: attacks mark the enemy for 5 s; each later hit deals 6 (+ 3% bonus AD) true damage per stack, and adds a stack.
    const markSeconds = r.quoted("Bel'Veth's basic attacks on-hit apply a mark to the target for 5 seconds, refreshing on subsequent hits", 0);
    const banquet = r.formula("Bonus True Damage");
    r.quote("Every attack on-hit against the marked target deals bonus true damage and generates a stack of Endless Banquet that increases this damage by the same value. This effect stacks infinitely");
    r.quote("A nearby Void Coral is required to cast this ability.");
    r.quote("The passive bonus true damage is affected by the on-hit modifier of Royal Maelstrom.");
    // True Form, only by option.
    const trueForm = (options.trueForm ?? 0) >= 1;
    const formHealth = r.formula("Bonus Health");
    const formRange = r.number("Bonus Attack Range");
    const formSpeed = r.number("Increased Total Attack Speed") / 100;
    kit.assume("Endless Banquet's active has no Void Coral to consume in a duel: no champion or epic monster has died. True Form comes only from its option, with its health, range and attack speed (not its size).");

    // Void Surge: a 400 dash through enemies for 20 (+ 105% AD), the first hit crits for 200% and applies on-hit; each of the four directions has its own 12 s cooldown.
    const dash = q.field("range");
    const dashSpeed = q.field("speed");
    const dashReach = q.field("collisionRadius");
    q.quote("Against the first target, Void Surge can critically strike for 200% damage and applies on-hit effects and life steal.");
    const critMultiplier = q.quoted("Against the first target, Void Surge can critically strike for 200% damage", 0) / 100;
    q.quote("Each cardinal direction has a unique cooldown that is reduced equivalent to 0.2 ability haste per 1% bonus attack speed.");
    const hastePerSpeed = q.quoted("reduced equivalent to 0.2 ability haste per 1% bonus attack speed", 0);
    q.quote("Void Surge resets Bel'Veth's basic attack timer.");
    const sideCooldown = 12;
    kit.assume(`Void Surge's four directions are four separate dashes through or away from the enemy, each with its own ${sideCooldown} s cooldown (the game files' PerSideCooldown; the wiki gives none), with ${q.cooldown()} s between any two.`);

    // Above and Below: a 660 slam that knocks up for 1 s and slows by 30% for 2 s; a champion hit resets a Void Surge direction.
    const slamWords = "knocks them up for a duration, and slows them by 30% for 2 seconds";
    w.quote("If this hits an enemy champion, it resets Void Surge dash cooldown of the target direction.");
    w.quote("This ability will cast from wherever the caster is at the start of the cast time.");
    const [, slamRange = 660] = w.fieldNumbers("range");

    // Royal Maelstrom: 1.5 s rooted, 60% damage reduction and 40% life steal, slashing 6 (+ 1 per 40% bonus attack speed) times.
    const stormSeconds = e.quoted("Bel'Veth enters a frenzy for 1.5 seconds, during which she is unable to move", 0);
    const stormReduction = e.fraction("Damage Reduction");
    const stormLifeSteal = e.fraction("Life Steal");
    const slashWords = "she rapidly slashes at the nearest enemy with the lowest current health percentage for up to 6 (+ 1 per 40% bonus attack speed) times over the duration";
    const baseSlashes = e.quoted(slashWords, 0);
    const slashPerSpeed = e.quoted(slashWords, 2) / 100;
    const slash = e.formula("Minimum Physical Damage per hit");
    e.formula("Maximum Physical Damage per hit");
    const slashGrowth = e.seriesIn("Each slash deals physical damage, increased by", 0);
    const slashOnHit = e.seriesIn("Each slash deals physical damage, increased by", 1);
    const slashRadius = e.field("effectRadius");
    e.quote("Bel'Veth cannot perform slashes while she is affected by cast-inhibiting crowd control.");
    e.quote("Royal Maelstrom deals 200% damage to monsters, applies life steal, and is affected by critical strike modifiers.");
    e.quote("Royal Maelstrom can be recast after 0.75 seconds within the duration, and does so automatically after the duration or when Bel'Veth casts an ability.");
    kit.assume("Royal Maelstrom's slashes come at an even pace over its 1.5 s; its share of on-hit effects applies to Endless Banquet's true damage alone.");

    const bonusAS = (unit: Unit) => derive(unit).bonusAttackSpeed;
    const sideReady = (unit: Unit, tick: number) => Array.from({ length: SIDES }, (_, i) => Number(unit.memory[`belveth:side${i}`] ?? 0)).findIndex((t) => t <= tick);
    const storming = (unit: Unit, tick: number) => tick < Number(unit.memory["belveth:stormUntil"] ?? -1);

    // Endless Banquet's true damage on one on-hit, at `share` effectiveness.
    const feast = (ctx: HookContext, share: number) => {
      if (ctx.enemy.petId !== undefined || !ctx.enemy.alive) return;
      const marked = ctx.tick < Number(ctx.memory["belveth:markUntil"] ?? -1);
      if (marked) {
        const count = Number(ctx.memory["belveth:feast"] ?? 0) + 1;
        ctx.memory["belveth:feast"] = count;
        applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "true", amount: scaled(banquet, count * share), label: "Endless Banquet" }, { scale: 1 });
      } else ctx.memory["belveth:feast"] = 0;
      ctx.memory["belveth:markUntil"] = ctx.tick + ticks(markSeconds);
    };
    const endStorm = (ctx: HookContext) => {
      ctx.memory["belveth:stormUntil"] = -1;
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "belveth:storm");
    };
    const tagged = (ctx: HookContext, apply: () => void, memoKey: string) => {
      const before = new Set(ctx.self.statuses);
      apply();
      for (const s of ctx.self.statuses) if (!before.has(s)) s.memoKey = memoKey;
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: 0,
      usable: (unit, world) => sideReady(unit, world.tick) >= 0,
      delivery: { kind: "dash", direction: "toward", distance: dash, speed: dashSpeed, speedFor: (unit) => dashSpeed + derive(unit).moveSpeed, through: true, hitRadius: dashReach, hitCentered: true, minDistance: 0 },
      onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage"), canCrit: true, critMultiplier }],
      onSelf: [{ type: "resetAttack" }],
      flags: { appliesOnHit: true, appliesLifeSteal: true, spellShield: true, grounded: true, knockdown: true },
      roles: ["damage", "engage", "escape"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), castTime: w.castTime(), castOrigin: "start",
      delivery: { kind: "line", range: slamRange, width: w.field("width") },
      onHit: [
        { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
        { type: "displace", direction: "away", distance: 0, duration: w.number("Knock Up Duration") },
        { type: "cc", cc: "slow", strength: w.quoted(slamWords, 0) / 100, duration: w.quoted(slamWords, 1) },
      ],
      flags: { spellShield: true },
      decisive: true,
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), castTime: 0,
      delivery: { kind: "self" },
      roles: ["damage", "defense"],
      flags: { appliesLifeSteal: true, spellShield: false },
      estimate: (self, target) => (baseSlashes + Math.floor(bonusAS(self) / slashPerSpeed)) * evaluate(slash, self, target),
    };
    const abilities = [qSpec, wSpec, eSpec];

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (storming(self, world.tick)) return { kind: "move", direction: 0 };
      const center = Math.abs(enemy.x - self.x);
      // Royal Maelstrom once the enemy is within its slashes and hurt.
      if ((view.mode === "fight" || view.mode === "trade") && canCast(world, self, eSpec) && center - enemy.spec.base.radius <= slashRadius * 0.6) return { kind: "cast", ability: "E" };
      const decided = defaultBehavior(view);
      // Void Surge only through an enemy within reach, or away from one.
      if (decided?.kind === "cast" && decided.ability === "Q" && !decided.aim) {
        const away = view.mode === "flee" || view.mode === "kite" || decided.dodge !== undefined;
        if (!away && center > dash + dashReach) return { kind: "move", direction: 1 };
        return { ...decided, aim: { direction: away ? -1 : 1, distance: dash } };
      }
      return decided;
    };

    return {
      abilities,
      behavior,
      start: [
        innateStat("attackSpeedCap", cap),
        ...(stacks > 0 ? [innateStat("attackSpeed", stacks * perStack)] : []),
        ...(trueForm ? [innateStat("attackRange", formRange), innateStat("attackSpeedMultiplier", formSpeed)] : []),
      ],
      hooks: {
        onStart(ctx) {
          if (trueForm) {
            const amount = evaluate(formHealth, ctx.self, ctx.enemy);
            ctx.buff("belveth:trueForm", "health", amount, FOREVER);
            ctx.self.hp = derive(ctx.self).maxHp;
          }
        },
        onCastStart(ctx) {
          // Every cast: ghosting and 20% attack speed for 3 s. Another ability ends Royal Maelstrom.
          ctx.buff("belveth:cast", "attackSpeed", castSpeed, castSeconds);
          ctx.apply({ type: "state", state: "ghosted", duration: castSeconds }, true);
          if (ctx.ability.key !== "E" && storming(ctx.self, ctx.tick)) endStorm(ctx);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            const side = sideReady(ctx.self, ctx.tick);
            const haste = Math.min(500, abilityHasteFor(ctx.self, { slot: "Q" }) + hastePerSpeed * 100 * bonusAS(ctx.self));
            ctx.memory[`belveth:side${Math.max(0, side)}`] = ctx.tick + ticks(cooldownAfterHaste(sideCooldown, haste));
          }
          if (key === "E") {
            const slashes = baseSlashes + Math.floor(bonusAS(ctx.self) / slashPerSpeed + 1e-9);
            ctx.memory["belveth:stormUntil"] = ctx.tick + ticks(stormSeconds);
            ctx.memory["belveth:stormStart"] = ctx.tick;
            ctx.memory["belveth:slashes"] = slashes;
            ctx.memory["belveth:slashed"] = 0;
            tagged(ctx, () => {
              ctx.apply({ type: "state", state: "damageReduction", value: stormReduction, duration: stormSeconds }, true);
              ctx.apply({ type: "stat", stat: "lifeSteal", amount: { base: stormLifeSteal }, duration: stormSeconds }, true);
              ctx.apply({ type: "state", state: "noMovement", duration: stormSeconds }, true);
              ctx.apply({ type: "state", state: "noAttacks", duration: stormSeconds }, true);
            }, "belveth:storm");
          }
        },
        onAbilityHit(ctx) {
          // Above and Below on a champion resets a Void Surge direction.
          if (ctx.ability.key === "W" && ctx.enemy.petId === undefined) {
            const used = Array.from({ length: SIDES }, (_, i) => i).filter((i) => Number(ctx.memory[`belveth:side${i}`] ?? 0) > ctx.tick);
            const soonest = used.sort((a, b) => Number(ctx.memory[`belveth:side${a}`]) - Number(ctx.memory[`belveth:side${b}`]))[0];
            if (soonest !== undefined) ctx.memory[`belveth:side${soonest}`] = ctx.tick;
          }
          // Void Surge's first target takes on-hit effects, Endless Banquet included.
          if (ctx.ability.key === "Q") feast(ctx, 1);
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) feast(ctx, 1);
        },
        onTick(ctx) {
          const self = ctx.self;
          if (!storming(self, ctx.tick)) return;
          // Royal Maelstrom's slashes, evenly over its duration; none while she can't cast.
          const start = Number(ctx.memory["belveth:stormStart"]);
          const slashes = Number(ctx.memory["belveth:slashes"]);
          const done = Number(ctx.memory["belveth:slashed"]);
          const due = Math.min(slashes, Math.floor(((ctx.tick - start) / ticks(stormSeconds)) * slashes + 1e-9) + 1);
          if (done >= due) return;
          ctx.memory["belveth:slashed"] = due;
          const disabled = [...ccTypes(self)].some((cc) => CC_RULES[cc].abilities === "disabled");
          if (disabled || !ctx.enemy.alive || Math.abs(ctx.enemy.x - self.x) - ctx.enemy.spec.base.radius > slashRadius) return;
          const max = derive(ctx.enemy).maxHp;
          const missing = max > 0 ? (100 * (max - ctx.enemy.hp)) / max : 0;
          for (let i = done; i < due; i++) {
            abilityHit(ctx.world, self, ctx.enemy, eSpec, [{ type: "damage", damageType: "physical", amount: scaled(slash, 1 + seriesAt(slashGrowth, missing, true) / 100), canCrit: true, label: e.name }]);
            feast(ctx, seriesAt(slashOnHit, missing, true) / 100);
          }
          if (ctx.tick + 1 >= Number(ctx.memory["belveth:stormUntil"])) endStorm(ctx);
        },
      },
      budget: {
        damage(self, target) {
          // Endless Banquet: true damage growing a stack per attack, over a fight of about 5 s of attacks.
          const attacks = derive(self).attackSpeed * 5;
          return { true: (evaluate(banquet, self, target) * attacks * (attacks + 1)) / 2 / 5 };
        },
      },
    };
  },
};

export default belveth;
