/** Veigar's level-20 kit, read from the committed 16.20 ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { KitDataError } from "../../engine/kits/context";
import { attackRange, canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, innateStat, missingShare, ticks } from "./util";

const STACKS = "phenomenalEvilStacks";
const cageTag = "eventHorizonCast";

function grant(ctx: HookContext, count: number, initial: number): void {
  const total = Number(ctx.memory[STACKS] ?? initial) + count;
  ctx.memory[STACKS] = total;
  // Initial stacks are an innate stat, also visible to the budget's hook-free reference.
  // Only the additional AP belongs in this runtime buff.
  ctx.buff("phenomenalEvilGrowth", "AP", total - initial - Number(ctx.memory.qKillPendingAP ?? 0), FOREVER);
}

const veigar: KitModule = {
  champion: "Veigar",
  options: { phenomenalEvilStacks: { label: "Phenomenal Evil stacks before the duel (fresh-duel default, not farmed late-game stacks)", default: 0 } },
  build(kit, options) {
    const initial = options.phenomenalEvilStacks ?? 0;
    if (!Number.isFinite(initial) || initial < 0 || !Number.isInteger(initial)) throw new KitDataError("Veigar", "Phenomenal Evil Power", "starting stacks must be a finite nonnegative integer");
    const passive = kit.ability("I");
    const q = kit.ability("Q");
    const w = kit.ability("W");
    const e = kit.ability("E");
    const r = kit.ability("R");
    passive.quote("Veigar generates a stack of Phenomenal Evil for each enemy champion hit by his abilities");
    const takedownStacks = passive.quoted("5 stacks whenever he scores an enemy champion takedown");
    passive.quote("For each stack, Veigar gains 1 ability power");
    passive.quote("Veigar's abilities do not have to deal damage nor affect their targets to grant a stack");
    q.quote("deals magic damage to the first two enemies hit");
    const qKillStacks = q.quoted("If this kills an enemy, it generates 1 stack of Phenomenal Evil");
    q.quote("Baleful Strike will only grant stacks of Phenomenal Evil from its bolt");
    q.quote("The stacks are added immediately on enemy kill (on next game tick)");
    q.quote("This ability will cast from wherever the caster is at the end of the cast time");
    const wDelay = w.quoted("after a 1.221 delay");
    w.quote("The delay starts at the beginning of the cast time");
    w.quote("If Veigar dies during the cast time, Dark Matter will still successfully fall from the sky");
    w.fieldNumbers("cooldown");
    const cooldownSeries = w.record.fields.cooldown;
    const series = typeof cooldownSeries === "object" ? cooldownSeries.values[0]?.series : undefined;
    if (!series || series.kind !== "variable" || series.variable !== "Phenomenal Evil stacks") throw new KitDataError("Veigar", w.name, "cooldown must retain the Phenomenal Evil stack series");
    const numericSamples = series.points.flatMap((point, i) => typeof point === "number" && typeof series.values[i] === "number" ? [{ stacks: point, seconds: series.values[i] as number }] : []);
    if (numericSamples.length < 3) throw new KitDataError("Veigar", w.name, "cooldown requires at least three numeric samples");
    const step = numericSamples[1]!.stacks - numericSamples[0]!.stacks;
    const cooldownBase = numericSamples[0]!.seconds;
    const cooldownRatio = numericSamples[1]!.seconds / cooldownBase;
    if (step <= 0 || numericSamples[0]!.stacks !== 0 || !numericSamples.every((sample, i) => sample.stacks === i * step && Math.abs(sample.seconds - cooldownBase * cooldownRatio ** i) < 1e-10)) throw new KitDataError("Veigar", w.name, "cooldown samples no longer follow the retained geometric thresholds");
    const cageRange = e.field("targetRange");
    const cageOuter = e.field("effectRadius", "Outer radius");
    const cageInner = e.field("effectRadius", "Safe zone radius");
    e.field("effectRadius", "Credit marker radius");
    const cageDelay = e.quoted("erects after a 0.5 second delay");
    const cageSeconds = e.quoted("remaining there for 3 seconds");
    const cageProtection = e.quoted("only once every 4.5 seconds");
    e.quote("Event Horizon can affect enemies only once per cast");
    e.quote("Units that negate the stun will still count as passing through the edges");
    e.quote("Displacement immune enemies will still be stunned, but not knocked down");
    e.quote("Event Horizon may fail to catch enemies that move very quickly through the boundary distance");
    const stun: Effect = { type: "cc", cc: "stun", duration: e.number("Stun Duration") };
    const rMinimum = r.formula("Minimum Magic Damage");
    const rMaximum = r.formula("Maximum Magic Damage");
    const rSeries = r.seriesIn("increased by");
    if (rSeries.kind !== "variable" || rSeries.variable !== "target's missing health") throw new KitDataError("Veigar", r.name, "missing-health damage series changed");
    const lastPercent = rSeries.points.at(-1);
    const increasedPercent = rSeries.values.at(-1);
    if (typeof lastPercent !== "number" || typeof increasedPercent !== "number") throw new KitDataError("Veigar", r.name, "missing-health cap is not numeric");
    const missingCap = lastPercent / 100;
    const damageCap = 1 + increasedPercent / 100;
    const rDamage = (self: Unit, enemy: Unit) => Math.min(evaluate(rMaximum, self, enemy), evaluate(rMinimum, self, enemy) * (1 + (damageCap - 1) * Math.min(1, missingShare(enemy) / missingCap)));
    r.quote("If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, this ability will cancel but does not go on cooldown nor pay its cost");

    kit.assume("Phenomenal Evil starts at the explicitly chosen stack count (default 0), grants connected-spell AP after that packet's damage, and grants negated-contact AP without increasing the same packet's damage. The stat budget holds starting stacks fixed instead of forecasting duel-dependent growth.");
    kit.assume("Baleful Strike uses the first unlabeled range value, 1050 rather than 990. The duel contains one enemy champion, so the two-target bolt and minion/monster farming stacks are not simulated.");
    kit.assume("Enemy-pet limitations: Baleful Strike does not track pet collisions or its two-enemy piercing allowance, and eligible pet kills do not grant Q stacks. Dark Matter's area splash damages eligible enemy pets even after Veigar dies, without granting champion-contact AP or champion-takedown stacks. The cage's traps affect only the opposing champion.");
    kit.assume("Dark Matter cooldown uses discrete 50-stack thresholds: 8 × 0.9^floor(stacks/50), matching every retained sample. The source does not specify behavior between those samples. Newly gained stacks affect subsequent declarations, not an already-running cooldown.");
    kit.assume("Dark Matter lands at ceil(1.221 × 30) = 37 ticks from cast declaration at its fixed target location, including after caster death. Area vision is not modeled.");
    kit.assume("Event Horizon uses center-based boundary intervals [290, 411] from its fixed center, sampled each 30 Hz tick; this preserves a safe interior and permits sufficiently fast movement to skip the boundary. Its unspecified 0.5-second erection clock is interpreted from cast completion. Kill/assist vision markers and third-party credit are not modeled.");
    kit.assume("Primordial Burst uses continuous interpolation between the retained missing-health samples, capped at twice minimum damage at two-thirds missing health, with current AP/HP read at impact. Its missile speed is absent from the pinned record; 1500 units/s is an explicit simulation assumption, retaining homing travel and projectile-blocker counterplay.");
    kit.assume("Takedown AP is recorded once when Veigar's damage kills or triggers a death continuation. Baleful Strike's extra kill stack is credited then but its AP is applied on the next tick; a later last hit of an already-counted death continuation does not grant another Q kill bonus in this model. Credit from a third-party/non-damage death is not simulated.");
    kit.assume("After the simulator's skillshot branch limit, expected-value Q/W contacts grant the same expected fraction of passive AP as their hit share; the resulting fractional expected stacks are a simulation approximation rather than an in-game stack count.");
    kit.assume("The duel policy aims a cage boundary across the rival, follows a lasting stun with Dark Matter, and uses Primordial Burst in all-in/kiting modes from one-third missing health or when lethal. Short trades and return-fire mode retain the simulator's no-ultimate policy; a fleeing Veigar only uses a cage against a nearby pursuer.");

    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "line", range: q.fieldValues("targetRange")[0]!, width: q.field("width"), speed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }],
        flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, decisive: true,
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: cooldownBase, cost: w.cost(), castTime: w.castTime(), deliveryAtCastStart: true,
        cooldownFor: (unit) => cooldownBase * cooldownRatio ** Math.floor(Number(unit.memory[STACKS] ?? initial) / step),
        delivery: { kind: "circle", range: w.field("targetRange"), radius: w.field("effectRadius"), delay: wDelay },
        onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }],
        flags: { projectile: false, spellShield: w.flag("spellShield") }, decisive: true,
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cooldownAtCastStart: true, cost: e.cost(), castTime: e.castTime(),
        delivery: { kind: "circle", range: cageRange, radius: cageOuter, delay: cageDelay },
        // The actual ring is created by onCast; the safe interior has no hit packet.
        onHit: [], roles: ["cc"], flags: { projectile: false, spellShield: e.flag("spellShield") },
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), cancelOnInvalidTarget: true,
        delivery: { kind: "target", range: r.field("targetRange"), missileSpeed: 1500 },
        onHit: [{ type: "damage", damageType: "magic", amount: rMinimum, amountFor: rDamage }],
        roles: ["damage", "finisher"], flags: { projectile: r.flag("projectile"), spellShield: r.flag("spellShield") },
      },
    ];
    const cage = abilities[2]!;
    const meteor = abilities[1]!;
    const burst = abilities[3]!;
    const behavior: Behavior = (view) => {
      // Let the standard policy update its trade clock and respect ongoing actions.
      const command = defaultBehavior(view);
      if (view.mode === "idle") return command;
      const ordinaryCage = command?.kind === "cast" && command.ability === "E";
      const fleeingCage = view.mode === "flee" && view.distance <= attackRange(view.enemy) + 300 && canCast(view.world, view.self, cage) && inReach(cage, view.self, view.enemy);
      if (ordinaryCage || fleeingCage) {
        const centerGap = Math.abs(view.enemy.x - view.self.x);
        const signedDistance = Math.max(-cageRange, Math.min(cageRange, centerGap - (cageOuter + cageInner) / 2));
        return { kind: "cast", ability: "E", aim: { direction: signedDistance < 0 ? -1 : 1, distance: Math.abs(signedDistance) } };
      }
      if (view.mode === "flee" || view.self.memory.tradeDone) return command;
      // Drop the meteor while the ring's stun guarantees the target cannot sidestep it.
      if (view.enemy.statuses.some((status) => status.kind === "cc" && status.key === "stun" && status.endTick >= view.world.tick + ticks(wDelay)) && canCast(view.world, view.self, meteor) && inReach(meteor, view.self, view.enemy)) return { kind: "cast", ability: "W" };
      if ((view.mode === "fight" || view.mode === "kite") && missingShare(view.enemy) >= missingCap / 2 && canCast(view.world, view.self, burst)) return { kind: "cast", ability: "R" };
      return command;
    };

    return {
      abilities, behavior, start: [innateStat("AP", initial)],
      hooks: {
        onStart(ctx) { ctx.memory[STACKS] = initial; },
        onCastStart(ctx) {
          if (ctx.ability.key !== "E") return;
          const direction = directionTo(ctx.self, ctx.enemy);
          const distance = ctx.aim ? Math.min(cageRange, Math.max(0, ctx.aim.distance ?? cageRange)) * ctx.aim.direction : Math.min(cageRange, Math.abs(ctx.enemy.x - ctx.self.x));
          ctx.memory.eventHorizonCenter = ctx.self.x + direction * distance;
          ctx.memory.eventHorizonSeenTick = ctx.tick;
        },
        onTick(ctx) {
          if (ctx.memory.qKillAPTick !== undefined && ctx.tick >= Number(ctx.memory.qKillAPTick)) {
            ctx.buff("phenomenalEvilGrowth", "AP", Number(ctx.memory[STACKS]) - initial, FOREVER);
            delete ctx.memory.qKillAPTick;
            delete ctx.memory.qKillPendingAP;
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E") {
            const tag = ctx.effects.find((effect) => effect.type === "mark" && effect.key === cageTag);
            // No solid-circle delivery may stun the safe interior.
            if (!tag || tag.type !== "mark") return [];
            const consumed = `eventHorizonConsumed:${tag.value ?? 0}`;
            if (ctx.memory[consumed]) return [];
            ctx.memory[consumed] = true;
            // A fresh cast is still a qualifying ability contact when the rival's
            // cross-cast cage protection negates its effects.
            grant(ctx, ctx.scale, initial);
            if (ctx.tick < Number(ctx.memory.eventHorizonProtectionUntil ?? -1)) return [];
            ctx.memory.eventHorizonProtectionUntil = ctx.tick + ticks(cageProtection);
          } else if (ctx.defense && ["Q", "W", "R"].includes(ctx.ability.key)) {
            // Parry still computes damage for shields/vamp. Snapshot before granting AP.
            const packet = ctx.effects.map((effect) => {
              if (effect.type !== "damage") return effect;
              const snapshot = effect.amountFor?.(ctx.self, ctx.enemy) ?? evaluate(effect.amount, ctx.self, ctx.enemy);
              return { ...effect, amountFor: () => snapshot };
            });
            grant(ctx, ctx.scale, initial);
            return packet;
          }
        },
        onAbilityHit(ctx) {
          if (["Q", "W", "R"].includes(ctx.ability.key)) grant(ctx, ctx.scale, initial);
        },
        onDamageDealt(ctx) {
          if (ctx.amount <= 0 || ctx.memory.phenomenalEvilTakedown || !(ctx.enemy.hp <= 0 || ctx.enemy.fallen)) return;
          ctx.memory.phenomenalEvilTakedown = true;
          grant(ctx, takedownStacks, initial);
          if (ctx.ability === q.name && !ctx.persistent && !ctx.attack) {
            ctx.memory[STACKS] = Number(ctx.memory[STACKS]) + qKillStacks;
            ctx.memory.qKillPendingAP = qKillStacks;
            ctx.memory.qKillAPTick = ctx.tick + 1;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key !== "E") return;
          const center = Number(ctx.memory.eventHorizonCenter);
          const id = ctx.world.nextId++;
          const edgeCenter = (cageOuter + cageInner) / 2;
          const radius = (cageOuter - cageInner) / 2;
          const startTick = ctx.tick + ticks(cageDelay);
          for (const direction of [-1, 1]) ctx.world.zones.push({
            id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: Number(ctx.memory.eventHorizonSeenTick),
            x: center + direction * edgeCenter, radius, centered: true, startTick, endTick: startTick + ticks(cageSeconds),
            ability: "E", onHit: [{ type: "mark", key: cageTag, duration: cageSeconds, value: id }, { type: "knockdown" }, stun], noPets: true,
          });
        },
      },
    };
  },
};

export default veigar;
