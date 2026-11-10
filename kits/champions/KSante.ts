/** K'Sante: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import type { Series } from "../../engine/abilities";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, scaled, ticks } from "./util";

/** The value of a series stepped by some variable (the wiki's breakpoints), at `x`. */
function stepped(series: Series | undefined, x: number, fallback: number): number {
  if (!series || series.kind !== "variable") return fallback;
  let value = fallback;
  series.points.forEach((point, i) => {
    const at = Number(point);
    const v = Number(series.values[i]);
    if (Number.isFinite(at) && Number.isFinite(v) && x >= at) value = v;
  });
  return value;
}

const ksante: KitModule = {
  champion: "KSante",
  build(kit) {
    const innate = kit.ability("Dauntless Instinct");
    const q = kit.ability("Ntofo Strikes");
    const w = kit.ability("Path Maker");
    const e = kit.ability("Footwork");
    const r = kit.ability("All Out");

    // Dauntless Instinct: abilities mark; an attack consumes the mark for a share of maximum health.
    const markSeconds = innate.quoted("K'Sante's abilities mark enemies hit for 4 seconds", 0);
    const markHit: Formula = {
      base: innate.quoted("dealing 12 (+ 1 – 2 (based on level)% of target's maximum health) bonus physical damage", 0),
      ratios: { targetMaxHP: innate.levelValue("His basic attacks against marked enemies are empowered to consume the mark, dealing 12 (+ 1 – 2 (based on level)% of target's maximum health)") / 100 },
    };
    // All Out's bonus on attacks, ability damage and the mark: 1% (+ 1% per 100 bonus armor) (+ 1% per 100 bonus MR) of maximum health.
    const bonusWords = "bonus physical damage equal to 1% (+ 1% per 100 bonus armor) (+ 1% per 100 bonus magic resistance) of the target's maximum health";
    const allOutHit: Formula = {
      base: 0,
      ratios: { targetMaxHP: innate.quoted(bonusWords, 0) / 100 },
      products: [
        { ratio: innate.quoted(bonusWords, 1) / 100 / 100, stats: ["bonusArmor", "targetMaxHP"] },
        { ratio: innate.quoted(bonusWords, 3) / 100 / 100, stats: ["bonusMR", "targetMaxHP"] },
      ],
    };

    // Ntofo Strikes: faster with more bonus resistances; two hits empower the third into a pull and stun.
    const [qCooldowns, qCooldownsAllOut] = (q.record.fields.staticCooldown?.values ?? []).map((v) => v.series);
    const qCasts = q.record.fields.castTime?.values[0]?.series;
    const bonusResists = (unit: Unit) => {
      const d = derive(unit);
      return d.armor.bonus + d.mr.bonus;
    };
    const [strikeLength = 465, waveLength = 930] = q.fieldValues("range");
    const strikeSlow = q.quoted("slows them by 80% for 0.5 seconds", 0) / 100;
    const strikeSlowFor = q.quoted("slows them by 80% for 0.5 seconds", 1);
    const stackSeconds = q.quoted("K'Sante generates a stack for 6 seconds, stacking up to 2 times", 0);
    const stacksNeeded = q.quoted("K'Sante generates a stack for 6 seconds, stacking up to 2 times", 1);
    const pullSeconds = q.quoted("pulls them towards him over 0.65 seconds and stuns them for 0.8 seconds", 0);
    const waveStun = q.quoted("pulls them towards him over 0.65 seconds and stuns them for 0.8 seconds", 1);
    const strikeDamage: Effect = { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") };
    kit.assume("Ntofo Strikes' empowered shockwave is taken to land at once along its whole length (the wiki gives no missile speed); it pulls the enemy to K'Sante's side, then stuns.");

    // Path Maker: a full charge (stun 1.75 s), shrugging off displacements and some damage; it carries the enemy along.
    const fullCharge = w.quoted("Path Maker's range, stun duration, and All Out bonus true damage modifier increase over the first 0.9 seconds of the channel", 0);
    const chargeReduction = w.quoted("he gains displacement immunity and 25% damage reduction", 0) / 100;
    const [carrySpeed = 1300, dashSpeed = 1500, allOutDashSpeed = 1800] = w.fieldValues("speed");
    const dashRange = w.field("range");
    const stunSeries = w.seriesIn("stunning them for 0.5 / 0.625 / 0.75 / 0.875 / 1 / 1.125 / 1.25 / 1.375 / 1.5 / 1.625 / 1.75");
    const pathStun = stepped(stunSeries, fullCharge, 1.75);
    const allOutReduction = w.quoted("its damage reduction is increased to 70%", 0) / 100;
    const carry = 150;
    kit.assume(`Path Maker is charged fully (${fullCharge} s) and carries the enemy ${carry} units along before the stun.`);

    // Footwork: a short dash with a shield.
    const [stepSpeed = 500, allOutStepSpeed = 1250] = e.fieldValues("speed");
    const footShield = e.formula("Shield Strength");
    const shieldSeconds = e.quoted("grants himself a shield for 2 seconds", 0);
    const moveSpeed = kit.champion.forms[0]?.stats.moveSpeed ?? 330;
    const footCooldown = e.cooldown();
    const footRange = e.fieldValues("range")[0] ?? 250;
    const allOutFootwork = 1 - e.quoted("Footwork's dash speed is increased, and its cooldown is reduced by 50%", 0) / 100;

    // All Out: a root and a pull; then 15 seconds of attack speed, penetration and omnivamp, capped at 65% health with fewer resistances.
    const executionRoot = r.quoted("K'Sante roots the target enemy champion for 0.5 seconds", 0);
    const pull = r.quoted("pulling the target to a location that is 300 units in the cast direction from their location at the time of cast", 0);
    const blinkBehind = r.quoted("blinking 175 units behind that location", 0);
    const pullSpeed = r.field("speed");
    const executionStun = r.quoted("is stunned for 0.3 seconds once it ends", 0);
    const allOutSeconds = r.quoted("After K'Sante blinks, he enters All Out for 15 seconds", 0);
    const threshold = r.quoted("K'Sante gains a health threshold equal to 65% maximum health", 0) / 100;
    const resistLoss = r.quoted("his base armor and base magic resistance are reduced by 85% bonus armor and 85% bonus magic resistance", 0) / 100;
    const allOutSpeed = r.fraction("Bonus Attack Speed");
    const bonusPen = r.quoted("50% bonus-armor penetration, and 20% omnivamp", 0) / 100;
    const omnivamp = r.quoted("50% bonus-armor penetration, and 20% omnivamp", 1) / 100;
    kit.assume("All Out pulls the enemy without terrain behind it; its mana changes don't matter, as its abilities are free.");

    const executionRange = r.field("targetRange");
    /** All Out is on while its health threshold is. */
    const allOut = (unit: Unit) => unit.statuses.some((s) => s.kind === "state" && s.key === "healthCapAbsolute" && s.ability === "R");
    const stacks = (unit: Unit, tick: number) => (tick < Number(unit.memory.qStacksUntil ?? -1) ? Number(unit.memory.qStacks ?? 0) : 0);
    const strikeCooldown = (unit: Unit) => stepped(allOut(unit) ? qCooldownsAllOut : qCooldowns, bonusResists(unit), 3.5);

    const strike = (key: string, name: string, empowered: boolean): AbilitySpec => ({
      key,
      name,
      slot: "Q",
      ...(key === "Q" ? {} : { cooldownKey: "Q" }),
      cooldown: 3.5,
      cooldownFor: strikeCooldown,
      cost: q.cost(),
      castTime: 0.4,
      castTimeFor: (unit) => stepped(qCasts, bonusResists(unit), 0.45),
      delivery: { kind: "area", near: 0, far: empowered ? waveLength : strikeLength, delay: 0, anchor: "caster" },
      onHit: empowered
        ? [
            strikeDamage,
            { type: "cc", cc: "slow", strength: strikeSlow, duration: strikeSlowFor },
            { type: "displace", direction: "toward", distance: waveLength, duration: pullSeconds, to: 140 },
            { type: "delayed", delay: pullSeconds, effects: [{ type: "cc", cc: "stun", duration: waveStun }] },
          ]
        : [strikeDamage, { type: "cc", cc: "slow", strength: strikeSlow, duration: strikeSlowFor }],
      onSelf: [{ type: "resetAttack" }],
      usable: (unit, world) => (stacks(unit, world.tick) >= stacksNeeded) === empowered,
      ...(empowered ? { flags: { projectile: true } } : {}),
    });

    const path = (key: string, allOutVersion: boolean): AbilitySpec => ({
      key,
      name: allOutVersion ? `${w.name} (All Out)` : w.name,
      slot: "W",
      ...(key === "W" ? {} : { cooldownKey: "W" }),
      cooldown: w.cooldown(),
      cost: w.cost(),
      castTime: fullCharge,
      cooldownAfter: "dash",
      onCastStart: [
        { type: "state", state: "displacementImmune", duration: fullCharge },
        { type: "state", state: "damageReduction", value: allOutVersion ? allOutReduction : chargeReduction, duration: fullCharge },
      ],
      delivery: { kind: "dash", direction: "toward", distance: dashRange, speed: allOutVersion ? allOutDashSpeed : dashSpeed, hitRadius: 50 },
      onHit: allOutVersion
        ? [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "damage", damageType: "true", amount: w.formula("Maximum Bonus True Damage"), label: `${w.name} (true damage)` },
          ]
        : [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "displace", direction: "away", distance: carry, duration: carry / carrySpeed },
            { type: "delayed", delay: carry / carrySpeed, effects: [{ type: "cc", cc: "stun", duration: pathStun }] },
          ],
      usable: (unit) => allOut(unit) === allOutVersion,
      flags: { grounded: true, knockdown: true },
    });

    const footwork = (key: string, allOutVersion: boolean): AbilitySpec => ({
      key,
      name: allOutVersion ? `${e.name} (All Out)` : e.name,
      slot: "E",
      ...(key === "E" ? {} : { cooldownKey: "E" }),
      cooldown: footCooldown,
      cooldownFor: (unit) => (allOut(unit) ? footCooldown * allOutFootwork : footCooldown),
      cost: e.cost(),
      castTime: 0,
      onCastStart: [{ type: "shield", amount: footShield, duration: shieldSeconds }],
      delivery: { kind: "dash", direction: "toward", distance: footRange, speed: (allOutVersion ? allOutStepSpeed : stepSpeed) + moveSpeed },
      usable: (unit) => allOut(unit) === allOutVersion,
      flags: { grounded: true },
    });

    const abilities: AbilitySpec[] = [
      strike("Q", q.name, false),
      strike("Q3", `${q.name} (empowered)`, true),
      path("W", false),
      path("WallOut", true),
      footwork("E", false),
      footwork("EallOut", true),
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        cooldownAfter: "state",
        onCastStart: [{ type: "state", state: "displacementImmune", duration: r.castTime() }],
        delivery: { kind: "target", range: r.field("targetRange") },
        // The blink and the pull toward K'Sante are in the hooks.
        onHit: [{ type: "delayed", delay: pull / pullSpeed, effects: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage") }, { type: "cc", cc: "stun", duration: executionStun }] }],
        // All Out itself, set up by the hooks, holds the cooldown.
        onSelf: [{ type: "state", state: "lingering", duration: allOutSeconds }],
        flags: { spellShield: true },
      },
    ];

    const markOn = (ctx: HookContext) => {
      ctx.memory.markUntil = ctx.tick + ticks(markSeconds);
    };
    const enterAllOut = (ctx: HookContext) => {
      const self = ctx.self;
      const d = derive(self);
      ctx.apply({ type: "state", state: "healthCapAbsolute", value: threshold * d.maxHp, duration: allOutSeconds }, true);
      ctx.apply({ type: "stat", stat: "attackSpeed", amount: flat(allOutSpeed), duration: allOutSeconds }, true);
      ctx.apply({ type: "stat", stat: "bonusArmorPen", amount: flat(bonusPen), duration: allOutSeconds }, true);
      ctx.apply({ type: "stat", stat: "armorReduction", amount: flat(resistLoss * d.armor.bonus), duration: allOutSeconds }, true);
      ctx.apply({ type: "stat", stat: "mrReduction", amount: flat(resistLoss * d.mr.bonus), duration: allOutSeconds }, true);
      // Ntofo Strikes' stacks reset (and its cooldown too, with two of them); Path Maker is ready again.
      if (stacks(self, ctx.tick) >= stacksNeeded) self.cooldownReady.Q = ctx.tick;
      ctx.memory.qStacks = 0;
      self.cooldownReady.W = ctx.tick;
      delete self.cooldownHeld.W;
    };

    return {
      abilities,
      budget: {
        // Dauntless Instinct's mark about once per Ntofo Strikes (2 to 3.5 s).
        damage: (self, target) => ({ physical: evaluate(markHit, self, target) / 3 }),
      },
      hooks: {
        onCastStart(ctx) {
          // All Out's root lands as the cast starts.
          if (ctx.ability.key === "R" && Math.abs(ctx.enemy.x - ctx.self.x) <= executionRange + 1) ctx.apply({ type: "cc", cc: "root", duration: executionRoot });
          if (ctx.ability.key === "Q3") ctx.memory.qStacks = 0;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory.qStacks = Math.min(stacksNeeded, stacks(ctx.self, ctx.tick) + 1);
            ctx.memory.qStacksUntil = ctx.tick + ticks(stackSeconds);
          }
          if (key === "R") {
            // K'Sante blinks past where the enemy will land, which is pulled toward him; then All Out.
            const dir = ctx.enemy.x >= ctx.self.x ? 1 : -1;
            ctx.self.x = ctx.enemy.x + dir * (pull + blinkBehind);
            ctx.apply({ type: "displace", direction: "toward", distance: pull, duration: pull / pullSpeed });
            enterAllOut(ctx);
          }
          if (key === "Q" || key === "Q3" || key === "W" || key === "WallOut" || key === "R") {
            markOn(ctx);
            if (allOut(ctx.self) && key !== "R") ctx.apply({ type: "damage", damageType: "physical", amount: allOutHit, label: `${r.name} (bonus)` });
          }
        },
        onAttackHit(ctx) {
          const inAllOut = allOut(ctx.self);
          if (inAllOut && !ctx.blocked) ctx.apply({ type: "damage", damageType: "physical", amount: scaled(allOutHit, ctx.scale), label: `${r.name} (bonus)`, appliesLifeSteal: true });
          if (ctx.tick < Number(ctx.memory.markUntil ?? -1)) {
            ctx.memory.markUntil = -1;
            ctx.apply({ type: "damage", damageType: "physical", amount: markHit, label: innate.name });
            if (inAllOut) ctx.apply({ type: "damage", damageType: "physical", amount: allOutHit, label: `${r.name} (bonus)` });
          }
        },
        onDamageDealt(ctx) {
          // All Out's omnivamp (held under its health threshold).
          if (allOut(ctx.self)) ctx.apply({ type: "heal", amount: flat(omnivamp * ctx.mitigated) }, true);
        },
      },
    };
  },
};

export default ksante;
