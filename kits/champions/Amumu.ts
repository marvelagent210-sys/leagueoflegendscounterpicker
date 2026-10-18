/** Amumu: pinned 26.20 wiki records, including the pre-mitigation Cursed Touch proc. */
import type { KitModule } from "../../engine/kits/compile";
import { effectiveResist } from "../../engine/rules/damage";
import { abilityHit, contactGap, directionTo, notifyDashEnd } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const amumu: KitModule = {
  champion: "Amumu",
  build(kit) {
    const innate = kit.ability("Cursed Touch");
    const q = kit.ability("Bandage Toss");
    const w = kit.ability("Despair");
    const e = kit.ability("Tantrum");
    const r = kit.ability("Curse of the Sad Mummy");
    const curseSeconds = innate.quoted("mark enemies with Curse for 3 seconds");
    const curseShare = innate.quoted("Cursed targets receive 10% bonus true damage from all incoming pre-mitigation magic damage") / 100;
    innate.quote("If the triggering basic attack from Amumu applies magic damage on-hit, Curse will be applied before the magic damage");
    innate.quote("The Curse application from Curse of the Sad Mummy happens after the magic damage is dealt by it");
    const mark = { type: "mark" as const, key: "cursedTouch", duration: curseSeconds, value: curseShare };
    const cursed = (ctx: HookContext) =>
      ctx.enemy.statuses.find((s) => s.kind === "mark" && s.key === mark.key && s.source === ctx.self.side && s.endTick > ctx.tick);
    const qDashSpeed = q.field("speed", "Dash speed");
    const qTrackRange = q.quoted("the target is 2000 or more units away");
    const wInterval = w.quoted("dealing magic damage every 0.5 seconds");
    const wTick = w.formula("Magic Damage Per Tick");
    const wCost = w.cost();
    const wRadius = w.field("effectRadius");
    const reduction = e.formula("Physical Damage Reduction");
    const reductionAmount = (unit: Unit) => {
      const d = derive(unit);
      const armor = d.armor.base + d.armor.bonus;
      const mr = d.mr.base + d.mr.bonus;
      const bonusArmor = armor > 0 ? d.armor.bonus * effectiveResist(d.armor, d.armorReduction) / armor : d.armor.bonus;
      const bonusMR = mr > 0 ? d.mr.bonus * effectiveResist(d.mr, d.mrReduction) / mr : d.mr.bonus;
      return reduction.base + (reduction.ratios?.bonusArmor ?? 0) * bonusArmor + (reduction.ratios?.bonusMR ?? 0) * bonusMR;
    };
    const reductionCap = e.quoted("capped at 50% of the damage instance") / 100;
    const refund = e.quoted("current cooldown is reduced by 0.75 seconds");
    q.quote("Amumu is still able to dash even if Bandage Toss is blocked by spell shield");
    q.quote("Immobilizing effects will not prevent Amumu from commencing the dash");
    q.quote("Bandage Toss does not fizzle on Amumu's death");
    w.quote("Despair is toggled off automatically if Amumu becomes unable to pay its mana cost");
    e.quote("The cooldown will be reduced, even if the incoming attack is blocked");
    kit.assume("Despair starts toggled on, drains 8 mana per second continuously, and turns off when mana is exhausted; it is not automatically toggled back on. Its first damage pulse is 0.5 seconds into the fight. Only existing Curse marks are refreshed by its damage.");
    kit.assume("Bandage Toss pulls to the enemy's moving position until it moves at least 2000 units away, then finishes toward its last tracked position. The duel has one enemy and no lane minions intercepting the bandage.");
    kit.assume("The simulator ends a duel on champion death; a Bandage Toss still in flight at that point cannot affect the already-ended duel.");
    kit.assume("The stat budget values Despair as continuously in range and Cursed Touch as active on Amumu's magic damage. Tantrum's attack-driven cooldown refunds and flat mitigation are resolved in the duel, rather than estimated by the stat budget.");

    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.field("staticCooldown"), staticCooldown: true,
        charges: { max: q.quoted("up to a maximum of 2"), recharge: q.field("recharge") },
        cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "line", range: q.field("range"), width: q.field("width"), speed: q.field("speed", "Bandage missle speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "stun", duration: q.quoted("stunning them for 1 second") }],
        flags: { projectile: true, grounded: true },
      },
      // This delivery supplies the pull's targeting and knockdown rules; it is never cast separately.
      {
        key: "Q-pull", name: `${q.name} (pull)`, slot: "Q", cooldown: 0, castTime: 0,
        delivery: { kind: "dash", direction: "target", distance: qTrackRange, speed: qDashSpeed },
        usable: () => false, flags: { grounded: false, knockdown: true },
      },
      {
        key: "W", name: w.name, slot: "W", activation: "toggle", cooldown: w.field("staticCooldown"), staticCooldown: true,
        castTime: w.castTime(), delivery: { kind: "self" }, usable: () => false,
        flags: { spellShield: false },
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
        delivery: { kind: "aura", radius: e.field("effectRadius") },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
        delivery: { kind: "aura", radius: r.field("effectRadius") },
        onHit: [
          { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
          { type: "cc", cc: "stun", duration: r.quoted("stunning them for 1.5 seconds") },
          mark,
        ],
      },
    ];
    const despair: AbilitySpec = { ...abilities[2]!, delivery: { kind: "aura", radius: wRadius }, onHit: [{ type: "damage", damageType: "magic", amount: wTick, persistent: true }] };
    // Formulas and cooldowns are captured before sealing the context; hooks never read source data.
    const qDamage = q.formula("Magic Damage");
    const eDamage = e.formula("Magic Damage");
    const rDamage = r.formula("Magic Damage");
    const qRecharge = q.field("recharge");
    const eCooldown = e.cooldown();
    const rCooldown = r.cooldown();
    return {
      abilities,
      attack: { onHit: [mark] },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const aura = evaluate(wTick, self, target) / wInterval;
          return { magic: aura, true: curseShare * (aura + haste * (evaluate(qDamage, self, target) / qRecharge + evaluate(eDamage, self, target) / eCooldown + evaluate(rDamage, self, target) / rCooldown)) };
        },
      },
      hooks: {
        modifyDamageTakenRaw(ctx) {
          return ctx.damageType === "physical" ? ctx.raw - Math.min(reductionAmount(ctx.self), ctx.raw * reductionCap) : ctx.raw;
        },
        onIncomingOnHit(ctx) {
          ctx.apply({ type: "refund", ability: "E", seconds: refund }, true);
        },
        onTick(ctx) {
          const self = ctx.self;
          if (!ctx.memory.despairOff) {
            const cost = wCost / 30;
            if (self.resource + 1e-9 < cost) ctx.memory.despairOff = true;
            else {
              self.resource -= cost;
              if (ctx.tick > 0 && ctx.tick % ticks(wInterval) === 0 && Math.abs(self.x - ctx.enemy.x) <= wRadius + 1e-9) abilityHit(ctx.world, self, ctx.enemy, despair, despair.onHit!);
            }
          }
          const dash = self.action;
          if (dash?.kind !== "dash" || dash.ability !== "Q-pull") return;
          const gap = Math.abs(self.x - ctx.enemy.x);
          if (!ctx.memory.bandageDetached && gap >= qTrackRange) ctx.memory.bandageDetached = true;
          if (!ctx.memory.bandageDetached) {
            ctx.memory.bandageTargetX = ctx.enemy.x;
            dash.perTick = directionTo(self, ctx.enemy) * qDashSpeed / 30;
            dash.endTick = ctx.tick + Math.max(1, ticks(Math.max(0, contactGap(self, ctx.enemy)) / qDashSpeed));
          } else {
            // The last location is now fixed; stop tracking the moving enemy.
            const remaining = Number(ctx.memory.bandageTargetX) - self.x;
            if (Math.abs(remaining) <= 1e-9) {
              self.action = undefined;
              return;
            }
            dash.stopAtContact = false;
            dash.perTick = Math.sign(remaining) * Math.min(qDashSpeed / 30, Math.abs(remaining));
            dash.endTick = ctx.tick + Math.max(1, ticks(Math.abs(remaining) / qDashSpeed));
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "Q" || ctx.defense === "parry") return;
          ctx.memory.bandageDetached = false;
          ctx.memory.bandageTargetX = ctx.enemy.x;
          ctx.self.action = {
            kind: "dash", ability: "Q-pull", startTick: ctx.tick,
            endTick: ctx.tick + Math.max(1, ticks(Math.max(0, contactGap(ctx.self, ctx.enemy)) / qDashSpeed)),
            perTick: directionTo(ctx.self, ctx.enemy) * qDashSpeed / 30,
            stopAtContact: true, unstoppable: false,
          };
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R" && ctx.enemy.action?.kind === "dash" && !ctx.enemy.action.unstoppable && !hasState(ctx.enemy, "displacementImmune") && ctx.enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun" && s.source === ctx.self.side && s.ability === "R")) {
            const dash = ctx.enemy.action;
            ctx.enemy.action = ctx.enemy.action.resume;
            notifyDashEnd(ctx.world, ctx.enemy, dash.ability, true);
          }
          if (ctx.ability.key === "W") {
            const existing = cursed(ctx);
            if (existing) existing.endTick = ctx.tick + ticks(curseSeconds);
          }
        },
        onDamageDealt(ctx) {
          if (ctx.damageType !== "magic" || !cursed(ctx)) return;
          ctx.apply({ type: "damage", damageType: "true", amount: flat(ctx.raw * curseShare), label: innate.name, persistent: ctx.persistent });
        },
      },
    };
  },
};

export default amumu;
