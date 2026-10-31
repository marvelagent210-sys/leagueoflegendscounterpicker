/**
 * Yunara (patch 26.20): her critical strikes add magic damage; her attacks build Unleash until
 * Cultivation of Spirit unleashes 5 s of faster, harder-hitting attacks; Arc of Judgment's bead
 * slows and lingers on the enemy; Kanmei's Steps speeds her toward it. Transcend One's Self
 * keeps her unleashed for 15 s and upgrades her spells into Arc of Ruin and Untouchable Shadow.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, seriesAt, ticks } from "./util";

const yunara: KitModule = {
  champion: "Yunara",
  build(kit) {
    const p = kit.ability("Vow of the First Lands");
    const q = kit.ability("Cultivation of Spirit");
    const w = kit.ability("Arc of Judgment");
    const wr = kit.ability("Arc of Ruin");
    const e = kit.ability("Kanmei's Steps");
    const er = kit.ability("Untouchable Shadow");
    const r = kit.ability("Transcend One's Self");

    // Vow of the First Lands: critical strikes deal 10% (+ 10% per 100 AP) more as magic damage.
    const vowWords = "Yunara's critical strikes deal 10% (+ 10% per 100 AP) bonus magic damage.";
    const vowShare = p.quoted(vowWords, 0) / 100;
    const vowPer100 = p.quoted(vowWords, 1) / 100 / 100;
    kit.assume("Vow of the First Lands adds its share of the critical strike's damage, averaged over her critical strike chance.");

    // Cultivation of Spirit: 23 (+ 20% AP) magic on hit; attacks while it's inactive give 2 Unleash stacks on a champion (6 s, up to 8, then one lost every 0.5 s).
    const spirit: Formula = q.formula("Passive Bonus Magic Damage");
    const spiritBoth: Formula = q.formula("Combined Bonus Magic Damage");
    const unleashWords = "While this ability is inactive, her basic attacks on-attack generate a stack of Unleash for 6 seconds, increased to 2 stacks against champions. The stacks refresh on subsequent attacks, stack up to 8 times, and expire one by one every 0.5 seconds after the duration.";
    const unleashSeconds = q.quoted(unleashWords, 0);
    const perChampion = q.quoted(unleashWords, 1);
    const maxUnleash = q.quoted(unleashWords, 2);
    const unleashDecay = q.quoted(unleashWords, 3);
    // Active: 5 s of 60% attack speed, the combined on-hit, faster missiles, a 40% shorter and uncancellable windup.
    const activeWords = "Yunara unleashes for 5 seconds: gaining bonus attack speed, dealing additional bonus magic damage on-hit, and augmenting her basic attacks to have increased missile speed, a 40% lower windup time, and an uncancellable windup.";
    const activeSeconds = q.quoted(activeWords, 0);
    const activeWindup = 1 - q.quoted(activeWords, 1) / 100;
    const activeSpeed = q.fraction("Bonus Attack Speed");
    const fastMissile = q.field("speed", "Empowered attack missile speed");
    q.quote("Cultivation of Spirit resets Yunara's basic attack timer.");
    kit.assume("Cultivation of Spirit is cast with a full 8 Unleash stacks (it has no cooldown), and spends them; its spread attacks have no one else to hit in a duel.");

    // Arc of Judgment: a bead (1150, 120 wide, 2150) for 215 (+ 85% bonus AD) (+ 50% AP) and a 99% slow decaying over 1.5 s; it lingers for 32.25 (+ 12.75% bonus AD) (+ 7.5% AP) every 0.25 s.
    const arcWords = "The initial hit against each enemy before the bead's expansion deals magic damage and slows them by 99% decaying over 1.5 seconds. While lingering, the bead deals 15% of the impact damage as magic damage to nearby enemies every 0.25 seconds.";
    const arcSlow = w.quoted(arcWords, 0) / 100;
    const arcSlowSeconds = w.quoted(arcWords, 1);
    const lingerEvery = w.quoted(arcWords, 3);
    const linger = w.formula("Linger Magic Damage per Tick");
    const arcCast = w.fieldSeries("castTime");
    const lingerTicks = 4;
    kit.assume(`Arc of Judgment's bead lingers on the enemy it hits for ${lingerTicks} ticks (the 1 s its expanded bead lingers).`);

    // Arc of Ruin: a 1150 beam for 480 (+ 120% bonus AD) (+ 75% AP) and a 99% slow decaying over 1 s.
    const ruinWords = "Yunara fires a beam of spirit magic in the target direction that deals 160 / 320 / 480 (based on Rank) (+ 120% bonus AD) (+ 75% AP) magic damage to enemies hit and slows them by 99% decaying over 1 second";
    const ruin: Formula = { base: seriesAt(wr.seriesIn("Yunara fires a beam of spirit magic in the target direction that deals"), 3, false), ratios: { bonusAD: wr.quoted(ruinWords, 3) / 100, AP: wr.quoted(ruinWords, 4) / 100 } };
    const ruinSlow = wr.quoted(ruinWords, 5) / 100;
    const ruinSlowSeconds = wr.quoted(ruinWords, 6);
    const ruinCast = wr.fieldSeries("castTime");
    if (arcCast.kind !== "variable" || ruinCast.kind !== "variable") throw new Error("Yunara: Arc cast times no longer depend on bonus attack speed");

    // Kanmei's Steps: 1.5 s ghosted, 50% movement speed (75% facing the enemy). Untouchable Shadow: a 225 – 450 dash at 1650 that resets her attack.
    const stepsSeconds = e.quoted("Yunara becomes ghosted and gains bonus movement speed for 1.5 seconds.", 0);
    const stepsSpeed = e.fraction("Bonus Move Speed");
    const stepsFacing = e.fraction("Increased Bonus Move Speed");
    const [shadowMin = 225, shadowMax = 450] = er.fieldNumbers("targetRange");
    const shadowSpeed = seriesAt(er.fieldSeries("speed"), 3, false);
    er.quote("Untouchable Shadow resets Yunara's basic attack timer. Arc of Ruin can be cast during the dash.");

    // Transcend One's Self: 15 s unleashed, with Arc of Ruin (80% of its cooldown off on entering and leaving) and Untouchable Shadow (reset on both).
    const transcendSeconds = r.quoted("Yunara enters Transcendent State for 15 seconds, during which each of her basic abilities is empowered", 0);
    const ruinCut = r.quoted("which has no cost and has its remaining cooldown reduced by 80% upon both entering and exiting the state", 0) / 100;
    r.quote("Upgraded into Untouchable Shadow, which has no cost and has its cooldown reset upon both entering and exiting the state.");

    const transcended = (unit: Unit, tick: number) => tick < Number(unit.memory["yunara:transcendUntil"] ?? -1);
    const unleashed = (unit: Unit, tick: number) => tick < Number(unit.memory["yunara:activeUntil"] ?? -1) || transcended(unit, tick);
    const stacksOf = (unit: Unit) => Number(unit.memory["yunara:unleash"] ?? 0);
    const bonusAS = (unit: Unit) => 100 * Math.max(0, derive(unit).bonusAttackSpeed);

    const vowHit: Effect = {
      type: "damage", damageType: "magic", amount: { base: 0 }, label: p.name,
      amountFor: (caster) => {
        const d = derive(caster);
        return d.critChance * (vowShare + vowPer100 * d.ap) * d.ad * d.critDamage;
      },
    };
    const spiritHit: Effect = {
      type: "damage", damageType: "magic", amount: spirit, label: q.name,
      // Unleashed (its attack speed buff is up), the passive and active on-hits combine.
      amountFor: (caster, target) => evaluate(caster.statuses.some((s) => s.memoKey === "buff:yunara:unleashed" && s.value > 0) ? spiritBoth : spirit, caster, target),
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: 0, cost: q.cost(), castTime: q.castTime(),
      usable: (unit, world) => stacksOf(unit) >= maxUnleash && !unleashed(unit, world.tick),
      delivery: { kind: "self" },
      onSelf: [{ type: "resetAttack" }],
      roles: ["buff"],
    };
    const arcHit: Effect[] = [
      { type: "damage", damageType: "magic", amount: w.formula("Initial Magic Damage"), label: w.name },
      { type: "cc", cc: "slow", strength: arcSlow, duration: arcSlowSeconds / 3 },
      { type: "delayed", delay: arcSlowSeconds / 3, effects: [{ type: "cc", cc: "slow", strength: (2 * arcSlow) / 3, duration: arcSlowSeconds / 3 }] },
      { type: "delayed", delay: (2 * arcSlowSeconds) / 3, effects: [{ type: "cc", cc: "slow", strength: arcSlow / 3, duration: arcSlowSeconds / 3 }] },
      ...Array.from({ length: lingerTicks }, (_, i): Effect => ({ type: "delayed", delay: (i + 1) * lingerEvery, effects: [{ type: "damage", damageType: "magic", amount: linger, label: `${w.name} (linger)` }] })),
    ];
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: Number(arcCast.values[0]),
      castTimeFor: (unit) => seriesAt(arcCast, bonusAS(unit), true),
      usable: (unit, world) => !transcended(unit, world.tick),
      delivery: { kind: "line", range: w.field("range"), width: w.field("width"), speed: w.field("speed", "Normal missile speed") },
      onHit: arcHit,
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const wrSpec: AbilitySpec = {
      key: "WR", name: wr.name, slot: "W", cooldown: wr.cooldown(), cooldownKey: "W", cost: 0, castTime: Number(ruinCast.values[0]),
      castTimeFor: (unit) => seriesAt(ruinCast, bonusAS(unit), true),
      usable: (unit, world) => transcended(unit, world.tick),
      overlay: true,
      delivery: { kind: "line", range: wr.field("range"), width: wr.field("width") },
      onHit: [
        { type: "damage", damageType: "magic", amount: ruin, label: wr.name },
        { type: "cc", cc: "slow", strength: ruinSlow, duration: ruinSlowSeconds / 2 },
        { type: "delayed", delay: ruinSlowSeconds / 2, effects: [{ type: "cc", cc: "slow", strength: ruinSlow / 2, duration: ruinSlowSeconds / 2 }] },
      ],
      flags: { projectile: false, spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      usable: (unit, world) => !transcended(unit, world.tick),
      delivery: { kind: "self" },
      onSelf: [{ type: "state", state: "ghosted", duration: stepsSeconds }],
      roles: ["escape"],
    };
    const erSpec: AbilitySpec = {
      key: "ER", name: er.name, slot: "E", cooldown: er.cooldown(), cooldownKey: "E", cost: 0, castTime: er.castTime(),
      usable: (unit, world) => transcended(unit, world.tick),
      delivery: { kind: "dash", direction: "toward", distance: shadowMax, minDistance: shadowMin, speed: shadowSpeed },
      onSelf: [{ type: "resetAttack" }],
      flags: { grounded: true, knockdown: true },
      roles: ["escape"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    kit.assume("Arc of Judgment's and Arc of Ruin's decaying slows fall in steps.");

    // Entering and leaving Transcendent State: Arc of Ruin's cooldown cut by 80%, Untouchable Shadow's reset.
    const shift = (ctx: HookContext) => {
      const left = Math.max(0, Number(ctx.self.cooldownReady.W ?? 0) - ctx.tick);
      ctx.self.cooldownReady.W = ctx.tick + Math.round(left * (1 - ruinCut));
      ctx.self.cooldownReady.E = ctx.tick;
    };

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      if (view.mode === "fight" && canCast(world, self, rSpec) && Math.abs(view.enemy.x - self.x) <= 900) return { kind: "cast", ability: "R" };
      if ((view.mode === "fight" || view.mode === "trade") && canCast(world, self, qSpec)) return { kind: "cast", ability: "Q" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, wrSpec, eSpec, erSpec, rSpec],
      attack: { onHit: [spiritHit, vowHit] },
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory["yunara:unleash"] = 0;
            ctx.memory["yunara:activeUntil"] = ctx.tick + ticks(activeSeconds);
          }
          if (key === "R") {
            ctx.memory["yunara:transcendUntil"] = ctx.tick + ticks(transcendSeconds);
            ctx.memory["yunara:transcending"] = true;
            shift(ctx);
          }
        },
        onAttack(ctx) {
          // Unleashed: a 40% shorter, uncancellable windup and a fast missile. Otherwise each attack on her opponent builds Unleash.
          if (unleashed(ctx.self, ctx.tick)) {
            const windup = ctx.action.launchTick - ctx.action.startTick;
            ctx.action.launchTick = ctx.action.startTick + Math.max(1, Math.round(windup * activeWindup));
            ctx.action.uncancellable = true;
            ctx.action.missileSpeed = fastMissile;
            return;
          }
          ctx.memory["yunara:unleash"] = Math.min(maxUnleash, stacksOf(ctx.self) + (ctx.targetPet ? 1 : perChampion));
          ctx.memory["yunara:unleashUntil"] = ctx.tick + ticks(unleashSeconds);
        },
        onTick(ctx) {
          const self = ctx.self;
          ctx.buff("yunara:unleashed", "attackSpeed", unleashed(self, ctx.tick) ? activeSpeed : 0, FOREVER);
          // Unleash stacks fall away one by one every 0.5 s once their 6 s are up.
          const until = Number(ctx.memory["yunara:unleashUntil"] ?? Number.POSITIVE_INFINITY);
          if (ctx.tick >= until && stacksOf(self) > 0) {
            ctx.memory["yunara:unleash"] = stacksOf(self) - 1;
            ctx.memory["yunara:unleashUntil"] = ctx.tick + ticks(unleashDecay);
          }
          // Kanmei's Steps: 50% movement speed, 75% while facing the enemy.
          const steps = self.statuses.some((s) => s.kind === "state" && s.key === "ghosted" && s.ability === "E" && s.endTick > ctx.tick);
          const facing = self.facing === directionTo(self, ctx.enemy);
          ctx.buff("yunara:steps", "moveSpeedPercent", steps ? (facing ? stepsFacing : stepsSpeed) : 0, FOREVER);
          // Leaving Transcendent State.
          if (ctx.memory["yunara:transcending"] === true && !transcended(self, ctx.tick)) {
            delete ctx.memory["yunara:transcending"];
            shift(ctx);
          }
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          const haste = 1 + d.abilityHaste / 100;
          return { magic: (lingerTicks * evaluate(linger, self, target) * haste) / wSpec.cooldown };
        },
      },
    };
  },
};

export default yunara;
