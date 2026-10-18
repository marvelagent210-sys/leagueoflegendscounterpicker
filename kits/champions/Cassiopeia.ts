/** Cassiopeia: pinned 26.20 movement bonuses, exact poison packets and impact-state fangs. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityHit, addStatus, applyCC, directionTo, heal, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, Zone } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const POISON = "cassiopeia:poison";
const cassiopeia: KitModule = {
  champion: "Cassiopeia",
  build(kit) {
    const passive = kit.ability("Serpentine Grace");
    const q = kit.ability("Noxious Blast"), w = kit.ability("Miasma"), e = kit.ability("Twin Fang"), r = kit.ability("Petrifying Gaze");
    const movementEffectiveness = 1 + passive.levelValue("increases the effectiveness of all movement speed bonuses") / 100;
    const qTotal = q.formula("Total Magic Damage");
    const qDuration = q.quoted("poisoned for 3 seconds");
    const qDelay = q.quoted("after a 0.4-second delay");
    q.quote("damage / 7 ticks rounded down to the nearest integer");
    q.quote("poisoned for something between 3.2 and 3.3 seconds");
    const qPulses = q.quoted("damage / 7 ticks rounded down to the nearest integer");
    const qSpeed = q.fraction("Bonus Movement Speed");
    const speedDuration = q.quoted("decays over 3 seconds");
    const poisonSeconds = 3.25;
    const fieldSeconds = w.quoted("creating toxic clouds at the area for 5 seconds");
    const wPulses = w.quoted("because there is 19 ticks and not 20 ticks");
    const wDamage: Formula = { base: w.quoted("5 / 6.25 / 7.5 / 8.75 / 10 (+ 2.5% AP)", 4), ratios: { AP: w.quoted("5 / 6.25 / 7.5 / 8.75 / 10 (+ 2.5% AP)", 5) / 100 } };
    const wSlow = w.fraction("Slow");
    const wRefresh = w.quoted("the debuff will refresh to 0.25 seconds");
    w.quote("Wind Wall will block the portion of Miasma it destroys");
    w.quote("not removed by most cleanses");
    w.quote("Sometimes Miasma randomly inflicts only 18 ticks of damage");
    const eOrdinary: Formula = { base: e.levelValue("launches her fangs at the target enemy"), ratios: { AP: e.quoted("(+ 20% AP) magic damage") / 100 } };
    const eBonus = e.formula("Bonus Magic Damage"), eHeal = e.formula("Heal");
    const eRange = e.field("targetRange"), eSpeed = e.field("speed"), eCost = e.cost();
    e.quote("Twin Fang will wait for an ongoing Noxious Blast to explode");
    e.quote("does not go on cooldown nor pay its cost");
    e.quote("slightly larger than the actual cast range");
    const rDamage = r.formula("Magic Damage");
    const rDuration = r.quoted("slowing them by 40% for 2 seconds", 1);
    const rSlow = r.quoted("slowing them by 40% for 2 seconds") / 100;
    const rReach = r.field("effectRadius", "starts 100 units behind");
    const radiusField = r.record.fields.effectRadius;
    const radiusLabel = typeof radiusField === "object" ? radiusField.values[0]?.label : undefined;
    const radiusGeometry = /^(\d+(?:\.\d+)?) but starts (\d+(?:\.\d+)?) units behind Cassiopeia\./.exec(radiusLabel ?? "");
    if (!radiusGeometry || Number(radiusGeometry[1]) - Number(radiusGeometry[2]) !== rReach) throw new Error("Cassiopeia Petrifying Gaze's rear-offset geometry needs review");
    const coneRearOffset = Number(radiusGeometry[2]);
    const coneAngle = r.field("angle");
    r.quote("cast from wherever the caster is at the end of the cast time");
    r.quote("target direction will change if Cassiopeia's facing direction changes during the cast time");
    r.quote("it will factor the direction they were facing on cast");
    const qCD = q.cooldown(), qCast = q.castTime(), wCD = w.cooldown(), wCast = w.castTime(), eCD = e.cooldown(), eCast = e.castTime(), rCD = r.cooldown();
    const facing = (self: Unit, enemy: Unit) => self.facing ?? directionTo(self, enemy);
    const poisoned = (target: Unit, tick: number) => target.statuses.some((status) => status.kind === "mark" && (status.key === POISON || status.key.startsWith(`${POISON}:`)) && status.endTick > tick);
    const poison = (ctx: HookContext, seconds: number) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "mark" && status.key === `${POISON}:W` && status.source === ctx.self.side));
      addStatus(ctx.enemy, { kind: "mark", key: `${POISON}:W`, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(seconds), value: 1 });
    };
    const fieldPacket: AbilitySpec = { key: "WP", name: w.name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: false, spellShield: false }, usable: () => false, onHit: [{ type: "damage", damageType: "magic", amount: wDamage, persistent: true }] };
    const fieldContact = (ctx: HookContext, zone: Zone) => Math.abs(ctx.enemy.x - zone.x) <= zone.radius + ctx.enemy.spec.base.radius + 1e-6;
    const fieldControl = (ctx: HookContext, zone: Zone) => {
      if (!fieldContact(ctx, zone)) return;
      if (isUntargetable(ctx.enemy, ctx.self)) {
        ctx.enemy.statuses = ctx.enemy.statuses.map((status) => status.kind === "cc" && status.key === "ground" && status.ability === "W" && status.source === ctx.self.side ? { ...status, endTick: ctx.tick + ticks(wRefresh) } : status);
        return;
      }
      const age = (ctx.tick - zone.startTick) / ticks(fieldSeconds);
      const slow = wSlow * Math.max(0, 1 - age);
      for (const [type, strength] of [["ground", 0], ["slow", slow]] as const) {
        const existing = ctx.enemy.statuses.some((status) => status.kind === "cc" && status.key === type && status.ability === "W" && status.source === ctx.self.side);
        if (existing) ctx.enemy.statuses = ctx.enemy.statuses.map((status) => status.kind === "cc" && status.key === type && status.ability === "W" && status.source === ctx.self.side ? { ...status, value: strength, endTick: ctx.tick + ticks(wRefresh) } : status);
        else applyCC(ctx.world, ctx.self, ctx.enemy, type, wRefresh, strength, true, "W");
      }
      poison(ctx, wRefresh);
    };
    const pulseField = (ctx: HookContext, zone: Zone) => {
      fieldControl(ctx, zone);
      if (fieldContact(ctx, zone)) abilityHit(ctx.world, ctx.self, ctx.enemy, fieldPacket, fieldPacket.onHit!);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius"), delay: qDelay }, onHit: [{ type: "mark", key: `${POISON}:Q`, duration: poisonSeconds }], estimate: (self, target) => Math.floor(evaluate(qTotal, self, target)), flags: { projectile: false, spellShield: q.flag("spellShield") }, roles: ["damage"], decisive: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: wCast, delivery: { kind: "circle", range: w.field("targetRange"), radius: w.field("effectRadius"), speed: w.field("speed"), delay: 0 }, onHit: [], flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield") }, roles: ["damage", "cc"], estimate: (self, target) => evaluate(wDamage, self, target) * wPulses },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: eCost, castTime: eCast, cancelOnInvalidTarget: true, delivery: { kind: "target", range: eRange, missileSpeed: eSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: eOrdinary, amountFor: (self, target) => evaluate(eOrdinary, self, target) + (poisoned(target, Number(self.memory.cassTick ?? 0)) ? evaluate(eBonus, self, target) : 0) }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") }, roles: ["damage"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "stun", duration: rDuration }], flags: { projectile: r.flag("projectile"), spellShield: r.flag("spellShield") }, roles: ["damage", "cc"], decisive: true },
      fieldPacket,
    ];
    const behavior: Behavior = (view) => {
      const { self, enemy, world } = view;
      if (view.mode === "idle") return undefined;
      // The shared policy owns when a short trade starts and when it must disengage.
      const tradeCommand = view.mode === "trade" ? defaultBehavior(view) : undefined;
      const reaction = react(view);
      if (reaction) return reaction;
      if (view.mode === "trade" && self.memory.tradeDone) return tradeCommand ?? defaultBehavior(view);
      if (self.action && self.action.kind !== "windup") return tradeCommand ?? defaultBehavior(view);
      const castable = (key: string) => { const ability = abilities.find((candidate) => candidate.key === key)!; return canCast(world, self, ability) && inReach(ability, self, enemy); };
      if ((view.mode === "fight" || view.mode === "kite") && facing(enemy, self) === -facing(self, enemy) && Math.abs(self.x - enemy.x) <= rReach + enemy.spec.base.radius + 1e-6 && castable("R")) return { kind: "cast", ability: "R" };
      const pendingQ = world.zones.some((zone) => zone.owner === self.side && zone.ability === "Q" && zone.connects !== false && Math.abs(enemy.x - zone.x) <= zone.radius + enemy.spec.base.radius + 1e-6);
      if ((poisoned(enemy, world.tick) || pendingQ) && castable("E")) return { kind: "cast", ability: "E" };
      if (castable("Q")) return { kind: "cast", ability: "Q" };
      const existingW = world.zones.some((zone) => zone.owner === self.side && zone.ability === "W" && fieldContact({ self, enemy } as HookContext, zone));
      if (!existingW && castable("W")) return { kind: "cast", ability: "W" };
      const command = tradeCommand ?? defaultBehavior(view);
      // Save unpoisoned fangs for a kill; the normal movement/attack policy still runs.
      if (command?.kind === "cast" && command.ability === "E" && !poisoned(enemy, world.tick) && evaluate(eOrdinary, self, enemy) < enemy.hp) return { kind: "move", direction: view.mode === "flee" ? -1 : Math.abs(self.x - enemy.x) > eRange ? 1 : 0 };
      return command;
    };
    kit.assume("Serpentine Grace uses the pinned 26.20 passive and explicit level-20 value. Positive flat/percentage movement bonuses are amplified before slows and movement soft caps; negative modifiers are not treated as bonuses. There is no historical flat level speed or no-boots passive.");
    kit.assume("The passive source does not define the interaction order when simultaneous flat and percentage bonuses coexist. This model amplifies each positive component before their ordinary flat-then-percentage combination; it preserves base speed and negative components.");
    kit.assume("Noxious Blast uses seven absolute pulse times across three seconds, with first pulse after 3/7 seconds and cumulative integer floors. Poison eligibility lasts 3.25 seconds within the source's 3.2–3.3 range; refresh replaces future pulses. The source's isolated 20/40 AP one-damage bug remains unresolved.");
    kit.assume("Noxious Blast movement speed decays linearly over three seconds and is granted only on a connected champion hit; a spell shield denies both poison and speed.");
    kit.assume("Miasma's seven-cloud arc is represented by the portion on the duel axis, with one traveling cloud and no overlap stacking. A wall removes that portion; lateral surviving portions and enemy pet poisoning are not simulated.");
    kit.assume("Miasma deterministically applies nineteen packets, beginning at field arrival and using absolute 5/19-second boundaries. The source's occasional eighteen-packet outcome is not randomized. Its unpinned slow curve decays linearly from 80% to zero over the field's age, with 0.25-second contact refresh outside the cloud.");
    kit.assume("Twin Fang checks only explicitly tagged Cassiopeia poison; arbitrary DOTs never qualify. Its level-20 ordinary damage follows the 128.235294117647 wiki series, rather than the conflicting 128.234 enhanced-label game-file base. Fang impact waits only for a pending own Q whose blast overlaps the target, with no invented hold timeout.");
    kit.assume(`Petrifying Gaze uses persistent absolute facing from walking, attacks and cast commands. Its ${coneAngle}-degree cone is the deterministic intersection with the duel axis, starting ${coneRearOffset} units behind the caster and ending ${rReach} units in front, including target-hitbox overlap. Lateral targets, pet cone damage and the source's unnamed R exception are absent. Forced displacement retains command-facing in this model, so the unquantified knockback-facing exception remains unresolved.`);
    kit.assume("The budget estimates poison uptime from Q plus the corrected nineteen-packet W duration, prices impact-poisoned E damage and AP-only healing by that uptime, and has no repeated kill mana refunds. Actual fights consume mana on every completed cast.");
    return {
      abilities, behavior, statConversions: { moveSpeedBonusEffectiveness: movementEffectiveness },
      budget: {
        damage(self, target) {
          const haste = derive(self).abilityHaste, qCycle = cooldownAfterHaste(qCD, haste) + qCast, wCycle = cooldownAfterHaste(wCD, haste) + wCast;
          const uptime = Math.min(1, poisonSeconds / qCycle + fieldSeconds / wCycle);
          return { magic: Math.floor(evaluate(qTotal, self, target)) / qCycle + evaluate(wDamage, self, target) * wPulses / wCycle + evaluate(eBonus, self, target) * uptime / (cooldownAfterHaste(eCD, haste) + eCast) };
        },
        healing(self) {
          const haste = derive(self).abilityHaste;
          const uptime = Math.min(1, poisonSeconds / (cooldownAfterHaste(qCD, haste) + qCast) + fieldSeconds / (cooldownAfterHaste(wCD, haste) + wCast));
          return evaluate(eHeal, self) * uptime / (cooldownAfterHaste(eCD, haste) + eCast);
        },
      },
      hooks: {
        onStart(ctx) { ctx.memory.cassTick = ctx.tick; },
        onCast(ctx) { if (ctx.ability.key === "R") abilityHit(ctx.world, ctx.self, ctx.enemy, ctx.ability, ctx.ability.onHit!); },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "W") return;
          ctx.zone.kind = "field";
          ctx.zone.startTick = ctx.tick;
          ctx.zone.endTick = ctx.tick + ticks(fieldSeconds);
          ctx.zone.interval = Infinity;
          ctx.zone.nextTick = Infinity;
          ctx.zone.onHit = [];
          ctx.zone.noPets = true;
          ctx.memory[`miasmaPulse:${ctx.zone.id}`] = 1;
          pulseField(ctx, ctx.zone);
        },
        onAbilityContact(ctx) {
          ctx.memory.cassTick = ctx.tick;
          if (ctx.ability.key === "E") {
            ctx.memory.fangPoisoned = poisoned(ctx.enemy, ctx.tick);
            ctx.memory.fangTargetFallen = !!ctx.enemy.fallen;
          }
          if (ctx.ability.key === "R") {
            const selfFacing = facing(ctx.self, ctx.enemy), enemyFacing = facing(ctx.enemy, ctx.self);
            const directedDistance = (ctx.enemy.x - ctx.self.x) * selfFacing;
            if (directedDistance < -coneRearOffset - ctx.enemy.spec.base.radius - 1e-6 || directedDistance > rReach + ctx.enemy.spec.base.radius + 1e-6) return [];
            return [...ctx.effects.filter((effect) => effect.type !== "cc"), { type: "cc", cc: enemyFacing === -selfFacing ? "stun" : "slow", duration: rDuration, ...(enemyFacing === -selfFacing ? {} : { strength: rSlow }) }];
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") {
            const total = evaluate(qTotal, ctx.self, ctx.enemy) * ctx.scale;
            ctx.world.scheduled = ctx.world.scheduled.filter((entry) => !(entry.owner === ctx.self.side && entry.target === ctx.enemy.side && entry.ability === "QP"));
            for (let pulse = 1; pulse <= qPulses; pulse++) {
              const amount = Math.floor(total * pulse / qPulses + 1e-9) - Math.floor(total * (pulse - 1) / qPulses + 1e-9);
              ctx.world.scheduled.push({ tick: ctx.tick + ticks(qDuration * pulse / qPulses), owner: ctx.self.side, target: ctx.enemy.side, effects: [{ type: "damage", damageType: "magic", amount: flat(amount), persistent: true, label: q.name }], ability: "QP", scale: 1 });
            }
            ctx.memory.blastSpeedAt = ctx.tick;
            ctx.buff("cassiopeia:blastSpeed", "moveSpeedPercent", qSpeed, speedDuration);
          } else if (ctx.ability.key === "E") {
            if (ctx.memory.fangPoisoned) heal(ctx.world, ctx.self, evaluate(eHeal, ctx.self) * ctx.scale);
            if (ctx.enemy.hp <= 0 || (!ctx.memory.fangTargetFallen && ctx.enemy.fallen)) ctx.apply({ type: "resource", amount: flat(eCost) }, true);
          }
        },
        onTick(ctx) {
          ctx.memory.cassTick = ctx.tick;
          if (ctx.memory.blastSpeedAt !== undefined) {
            const age = ctx.tick - Number(ctx.memory.blastSpeedAt);
            if (age >= ticks(speedDuration)) { delete ctx.memory.blastSpeedAt; ctx.buff("cassiopeia:blastSpeed", "moveSpeedPercent", 0, 0); }
            else ctx.buff("cassiopeia:blastSpeed", "moveSpeedPercent", qSpeed * (1 - age / ticks(speedDuration)), 2 / 30);
          }
          for (const zone of ctx.world.zones) {
            if (zone.owner !== ctx.self.side || zone.ability !== "W" || zone.kind !== "field" || ctx.tick >= zone.endTick) continue;
            fieldControl(ctx, zone);
            let pulse = Number(ctx.memory[`miasmaPulse:${zone.id}`] ?? 1);
            while (pulse < wPulses && ctx.tick >= zone.startTick + ticks(fieldSeconds * pulse / wPulses)) { pulseField(ctx, zone); pulse++; }
            ctx.memory[`miasmaPulse:${zone.id}`] = pulse;
          }
          for (const missile of ctx.world.missiles) {
            if (missile.owner !== ctx.self.side || missile.source !== "E") continue;
            const pending = ctx.world.zones.some((zone) => zone.owner === ctx.self.side && zone.ability === "Q" && zone.connects !== false && Math.abs(ctx.enemy.x - zone.x) <= zone.radius + ctx.enemy.spec.base.radius + 1e-6);
            const contactNext = Math.abs(ctx.enemy.x - missile.x) <= eSpeed / 30 + ctx.enemy.spec.base.radius + 1e-6;
            if (pending && contactNext) {
              // Keep the missile outside the target hitbox while a threatening blast is pending.
              const direction = Math.sign(missile.x - ctx.enemy.x) || -facing(ctx.self, ctx.enemy);
              missile.x = ctx.enemy.x + direction * (ctx.enemy.spec.base.radius + 1);
              missile.perTick = 0;
            } else missile.perTick = eSpeed / 30;
          }
        },
      },
    };
  },
};

export default cassiopeia;
