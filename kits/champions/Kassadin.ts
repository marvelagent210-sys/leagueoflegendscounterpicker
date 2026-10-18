/** Kassadin: actual mana costs, replacement Nether Blade and event-driven Force Pulse. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackRange, canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

const kassadin: KitModule = {
  champion: "Kassadin",
  build(kit) {
    const passive = kit.ability("Void Stone");
    const q = kit.ability("Null Sphere");
    const w = kit.ability("Nether Blade");
    const e = kit.ability("Force Pulse");
    const r = kit.ability("Riftwalk");
    passive.quote("permanently ghosted");
    const magicReduction = passive.quoted("takes 10% reduced magic damage") / 100;
    const qDamage = q.formula("Magic Damage");
    const qShield = q.formula("Magic Shield Strength");
    const qShieldSeconds = q.quoted("absorbs magic damage for 1.5 seconds");
    q.quote("The shield is granted at the start of the cast time");
    q.quote("disrupts their ongoing channels");
    const bladePassive: Formula = {
      base: w.quoted("basic attacks deal 25 (+ 10% AP) bonus magic damage on-hit", 0),
      ratios: { AP: w.quoted("basic attacks deal 25 (+ 10% AP) bonus magic damage on-hit", 1) / 100 },
    };
    const bladeActive = w.formula("Increased Bonus Magic Damage");
    const bladeMana = w.formula("Mana Restored Against Champions");
    w.formula("Mana Restored");
    const bladeWindow = w.quoted("next basic attack on-hit within 5 seconds");
    const bladeRange = w.quoted("gain 50 bonus range");
    w.quote("have an uncancellable windup");
    w.quote("Nether Blade resets Kassadin's basic attack timer");
    w.quote("The passive damage applies proc damage and the active damage applies spell damage");
    w.quote("The enhanced attack will apply other on-hit effects and can critically strike as normal");
    w.quote("will not grant mana if the attack is dodged or if it misses, but will do so if the attack is blocked");
    w.quote("In all cases the damage is parried");
    w.quote("Spell shield will block the active damage but not the passive one");
    w.quote("The empowered attack will trigger but not be consumed nor apply its effects against structures");
    const pulseDamage = e.formula("Magic Damage");
    const pulseSlow = e.fraction("Slow");
    const pulseSeconds = e.quoted("slows them for 1 second");
    const pulseRefund = e.quoted("current cooldown is reduced by 0.75 seconds");
    const pulseRange = e.fieldValues("effectRadius")[0];
    if (pulseRange === undefined) throw new Error("Kassadin: Force Pulse cone range is absent");
    const detectionRadius = e.field("effectRadius", "Ability cast detection");
    e.field("angle");
    e.quote("Untargetable champions do not reduce Force Pulse's cooldown upon ability activations");
    e.quote("Toggle abilities and transformation abilities do not count as ability activations");
    e.quote("This ability will cast from wherever the caster is at the end of the cast time");
    const riftDamage = r.formula("Magic Damage");
    const riftPerStack = r.formula("Bonus Damage Per Stack");
    r.formula("Maximum Bonus Damage");
    r.formula("Maximum Magic Damage");
    const riftSeconds = r.quoted("a stack of Riftwalk for 15 seconds");
    const riftMaximum = r.quoted("stacking up to 4 times");
    r.quote("refreshing on subsequent casts");
    r.quote("Flash can be used during the cast time");
    const costSeries = r.record.fields.cost?.values[0]?.series;
    r.fieldNumbers("cost");
    if (costSeries?.kind !== "variable" || costSeries.variable !== "Stacks" ||
      costSeries.points.length !== riftMaximum + 1 || costSeries.values.length !== costSeries.points.length ||
      costSeries.points.some((point, index) => point !== index) || costSeries.values.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0)) {
      throw new Error("Kassadin: Riftwalk needs a complete nonnegative cost ladder indexed by stacks");
    }
    const riftCosts = costSeries.values.map(Number);
    const qCooldown = q.cooldown();
    const wCooldown = w.cooldown();
    const eCooldown = e.cooldown();
    const rCooldown = r.cooldown();
    const qCost = q.cost();
    const wCost = w.cost();
    const eCost = e.cost();
    const qCastTime = q.castTime();
    const eCastTime = e.castTime();
    const rCastTime = r.castTime();
    const riftRange = r.field("targetRange", "Maximum range, has no minimum range");
    const riftRadius = r.field("effectRadius");

    kit.assume("Nether Blade's unshielded active replaces its passive magic on-hit with one 150 + 80% AP packet. A spell shield blocks that active packet and leaves the ordinary 25 + 10% AP passive on-hit; the pinned replacement wording and shield note are interpreted together as this fallback.");
    kit.assume("Nether Blade restores 30% of missing mana on a connected champion attack, including a damage block or an active-only spell shield, but not blind, dodge or parry. The source specifies damage shielding rather than suppression of its separate mana restoration. The generic champion attack path against pets currently omits on-hit packets and resource restoration; structures and minions are outside this duel.");
    kit.assume("Force Pulse observes successful cast declarations exactly once, including recasts and instant casts, excluding classified toggles, transformations and internal deliveries. A canceled declared cast still counts. Its own activation refunds the newly-started cooldown at cast completion; no refund is stored while Force Pulse is already ready. At 30 ticks per second a 0.75-second refund rounds up to 23 ticks.");
    kit.assume("Force Pulse's 78-degree cone is represented by its directed 600-unit interval on the one-dimensional line, using the caster's position at cast completion and the direction selected at cast declaration.");
    kit.assume("Riftwalk uses the stack count at cast declaration for damage and mana payment, then increments and refreshes its shared 15-second timer after successful completion. Stack expiry during that cast does not change its selected tier. Its selected blink direction and distance remain fixed while the origin uses the caster's position at completion, consistent with the pinned Flash-during-cast note. Arrival damage checks the target's center within 270 units of the actual blink endpoint; the record does not specify a target-hitbox convention. Summoner Flash and terrain-specific blink relocation are outside the model.");
    kit.assume("The stat budget conservatively uses Force Pulse's nominal 17-second cooldown and omits its qualifying-cast refunds. Its Riftwalk damage reference uses a 10-second full-mana window, reserves nominal Q/E/W cycle costs, adds natural mana regeneration and connected W mana restoration, and consumes only affordable casts of the exact stack ladder. This reference assumes contact and uninterrupted casts, rather than perpetual maximum-stack Riftwalk. Nether Blade's passive is subtracted once per active reference use so replacement damage is not added twice.");

    const stacks = (unit: Unit) => Math.min(riftMaximum, Math.max(0, Number(unit.memory.riftStacks ?? 0)));
    const refundPulse = (ctx: HookContext, caster: Unit) => {
      if (!caster.alive || Math.abs(caster.x - ctx.self.x) > detectionRadius + 1e-9 || isUntargetable(caster, ctx.self)) return;
      if ((ctx.self.cooldownReady.E ?? 0) > ctx.tick) ctx.apply({ type: "refund", ability: "E", seconds: pulseRefund }, true);
    };
    const passiveEffect: Effect = { type: "damage", damageType: "magic", amount: bladePassive, label: "Nether Blade (passive)", noLifeSteal: true };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: qCost, castTime: qCastTime,
        delivery: { kind: "target", range: q.field("targetRange"), missileSpeed: q.field("speed") },
        onCastStart: [{ type: "shield", amount: qShield, duration: qShieldSeconds, shieldType: "magic" }],
        onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "disrupt" }],
        flags: { projectile: true, spellShield: true }, roles: ["damage", "cc", "defense"],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: wCost, castTime: w.castTime(),
        delivery: { kind: "self" }, cooldownAfter: "empower", overlay: true,
        onSelf: [{
          type: "empower", attacks: 1, window: bladeWindow, bonusRange: bladeRange, uncancellable: true,
          resetAttack: true, spellShieldOnHit: true, attackOnHitReplacement: [],
          onHit: [{ type: "damage", damageType: "magic", amount: bladeActive, label: "Nether Blade (active)", noLifeSteal: true }],
        }],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: eCost, castTime: eCastTime,
        delivery: { kind: "area", near: 0, far: pulseRange, delay: 0, anchor: "ground" }, castDirection: "start",
        onHit: [{ type: "damage", damageType: "magic", amount: pulseDamage }, { type: "cc", cc: "slow", duration: pulseSeconds, strength: pulseSlow }],
        flags: { projectile: false, spellShield: true },
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: riftCosts[0],
        costFor: (unit) => riftCosts[stacks(unit)] ?? 0, castTime: rCastTime, castDirection: "start",
        delivery: { kind: "blink", direction: "toward", distance: riftRange, minDistance: 0, hitRadius: riftRadius, hitCentered: true },
        onHit: [{ type: "damage", damageType: "magic", amount: riftDamage,
          amountFor: (self, target) => evaluate(riftDamage, self, target) + Number(self.memory.riftDamageStacks ?? stacks(self)) * evaluate(riftPerStack, self, target) }],
        flags: { grounded: true, spellShield: true }, roles: ["damage", "engage", "escape"],
      },
    ];
    const ready = (world: Parameters<Behavior>[0]["world"], unit: Unit, key: string) => canCast(world, unit, abilities.find((ability) => ability.key === key)!);
    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      // The standard policy advances the trade clock before kit-specific spell ordering.
      const command = defaultBehavior(view);
      if (view.mode === "idle" || self.action || self.memory.tradeDone) return command;
      const reaction = react(view);
      if (reaction) return reaction;
      if (view.mode === "flee") {
        if (view.distance <= attackRange(enemy) + 300 && ready(world, self, "R")) return { kind: "cast", ability: "R", aim: { direction: -1, distance: riftRange } };
        return command;
      }
      const attackReach = self.spec.attack.range + bladeRange;
      if (view.distance <= attackReach + 1e-9 && self.attackReadyTick > world.tick && ready(world, self, "W")) return { kind: "cast", ability: "W" };
      const sphere = abilities[0]!;
      if (enemy.action?.kind === "channel" && ready(world, self, "Q")) return { kind: "cast", ability: "Q" };
      if (ready(world, self, "E") && inReach(abilities[2]!, self, enemy)) return { kind: "cast", ability: "E" };
      if (ready(world, self, "Q") && inReach(sphere, self, enemy)) return { kind: "cast", ability: "Q" };
      const offensiveUltimate = view.mode === "fight" || (view.mode === "kite" && view.distance <= attackRange(self));
      if (offensiveUltimate && ready(world, self, "R") && inReach(abilities[3]!, self, enemy)) {
        const contact = self.spec.base.pathingRadius + enemy.spec.base.pathingRadius;
        const center = Math.abs(self.x - enemy.x);
        return { kind: "cast", ability: "R", aim: { direction: 1, distance: view.mode === "kite" ? 0 : Math.min(riftRange, Math.max(0, center - contact)) } };
      }
      return command;
    };
    return {
      abilities, behavior, attack: { onHit: [passiveEffect] },
      start: [{ type: "state", state: "ghosted", duration: FOREVER }, { type: "state", state: "magicReduction", value: magicReduction, duration: FOREVER }],
      hooks: {
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory.riftUntil ?? Number.POSITIVE_INFINITY) && !(ctx.self.action?.kind === "cast" && ctx.self.action.ability === "R")) {
            ctx.memory.riftStacks = 0;
            delete ctx.memory.riftUntil;
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "R") ctx.memory.riftDamageStacks = stacks(ctx.self);
          if (ctx.ability.key !== "E") refundPulse(ctx, ctx.self);
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") refundPulse(ctx, ctx.self);
          if (ctx.ability.key === "R") {
            ctx.memory.riftStacks = Math.min(riftMaximum, Number(ctx.memory.riftDamageStacks ?? 0) + 1);
            ctx.memory.riftUntil = ctx.tick + ticks(riftSeconds);
          }
        },
        onEnemyCast(ctx) {
          if ((ctx.ability.activation ?? "cast") === "cast") refundPulse(ctx, ctx.caster);
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          ctx.memory.bladeChampionHit = action?.kind === "windup" && action.pet === undefined && action.empowered?.includes("W") === true;
        },
        onAttackHit(ctx) {
          if (ctx.memory.bladeChampionHit) ctx.apply({ type: "resource", amount: bladeMana }, true);
        },
        onAttackResolved(ctx) {
          ctx.memory.bladeChampionHit = false;
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          const wCycle = cooldownAfterHaste(wCooldown, d.abilityHaste) + (d.attackSpeed > 0 ? 1 / d.attackSpeed : bladeWindow);
          const rCycle = cooldownAfterHaste(rCooldown, d.abilityHaste) + rCastTime;
          const horizon = 10;
          const qCycle = cooldownAfterHaste(qCooldown, d.abilityHaste) + qCastTime;
          const eCycle = cooldownAfterHaste(eCooldown, d.abilityHaste) + eCastTime;
          const reserved = qCost * Math.ceil(Math.max(0, horizon - qCastTime) / qCycle) + eCost * Math.ceil(Math.max(0, horizon - eCastTime) / eCycle) + wCost * Math.ceil(horizon / wCycle);
          let mana = Math.max(0, d.maxResource - reserved);
          let prior = 0;
          let nextW = d.attackSpeed > 0 ? 1 / d.attackSpeed : bladeWindow;
          let count = 0;
          let damage = 0;
          for (let time = rCastTime; time < horizon - 1e-9; time += rCycle) {
            mana = Math.min(d.maxResource, mana + (time - prior) * self.spec.base.resourceRegen / 5);
            while (nextW <= time + 1e-9) {
              mana += (bladeMana.ratios?.missingMana ?? 0) * Math.max(0, d.maxResource - mana);
              nextW += wCycle;
            }
            const tier = Math.min(riftMaximum, count);
            const cost = riftCosts[tier] ?? 0;
            if (mana + 1e-9 >= cost) {
              mana -= cost;
              damage += evaluate(riftDamage, self, target) + tier * evaluate(riftPerStack, self, target);
              count += 1;
            }
            prior = time;
          }
          return { magic: damage / horizon - evaluate(riftDamage, self, target) / rCycle - evaluate(bladePassive, self, target) / wCycle };
        },
      },
    };
  },
};

export default kassadin;
