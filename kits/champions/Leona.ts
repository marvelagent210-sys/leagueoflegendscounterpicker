/** Leona: solo duels have no allied champion to consume Sunlight. */
import type { KitModule } from "../../engine/kits/compile";
import { attackTiming } from "../../engine/sim/actions";
import { abilityHit, directionTo } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { ticks } from "./util";

const leona: KitModule = {
  champion: "Leona",
  build(kit) {
    const passive = kit.ability("Sunlight");
    const q = kit.ability("Shield of Daybreak");
    const w = kit.ability("Eclipse");
    const e = kit.ability("Zenith Blade");
    const r = kit.ability("Solar Flare");
    const sunlightSeconds = passive.quoted("mark enemies hit for 2.5 seconds");
    passive.quote("Allied champions' damaging attacks and abilities against a marked target will consume the mark");
    // Read the progression as evidence, but do not invent an ally to deal it in 1v1.
    passive.levelValue("Allied champions' damaging attacks and abilities");
    const daybreakWindow = q.quoted("next basic attack within 6 seconds");
    const daybreakRange = q.quoted("gain 50 bonus range");
    const daybreakStun = q.quoted("stun the target for 1 second");
    q.quote("have an uncancellable windup");
    q.quote("Shield of Daybreak's attack does not put Leona's basic attack on cooldown");
    q.quote("Critical strikes do not interact with Shield of Daybreak's bonus damage");
    const guardSeconds = w.quoted("raises her guard for 3 seconds");
    const extendedSeconds = w.quoted("guard is extended for an additional 3 seconds");
    const reduction = w.number("Flat Damage Reduction");
    w.quote("flat pre-mitigation damage reduction of up to 50% of the damage instance");
    w.quote("The resistance scaling will factor from all other sources, excluding Eclipse's flat bonus. This will recalculate over the duration");
    w.quote("Spell shield will block the damage but Eclipse's extended duration will not be prevented");
    w.quote("Neither the cast nor detonation of Eclipse interrupts any of Leona's previous orders or ongoing attack windups");
    const guardArmor = w.formula("Bonus Armor");
    const guardMR = w.formula("Bonus Magic Resistance");
    const guardRadius = w.field("effectRadius");
    const bladeRange = e.field("targetRange");
    const bladeSpeed = e.field("speed");
    const bladeBeyond = e.quoted("dashes to 225 units beyond the location of the last champion struck");
    const bladeRoot = e.quoted("roots them for 0.5 seconds");
    const bladeLimit = e.quoted("not within 3000 units of her by the time the sword missile fizzles");
    e.quote("After reaching its maximum range");
    e.quote("Leona will not track the target if they change locations during her dash");
    e.quote("Spell shield will block the damage, and prevent Leona from dashing");
    e.quote("Leona is unable to move or attack while Zenith Blade is in flight");
    e.quote("She can cast any of her abilities during the dash");
    const flareDelay = r.quoted("strikes upon the target location after 0.625 seconds");
    const flareSlow = r.quoted("slowed by 80% for 1.75 seconds", 0) / 100;
    const flareSeconds = r.quoted("slowed by 80% for 1.75 seconds", 1);
    const flareRadius = r.field("effectRadius", "Damage radius");
    const epicenter = r.field("effectRadius", "Epicenter radius");
    r.quote("are also stunned for the same duration if they are struck by the epicenter");
    kit.assume("Sunlight is applied and refreshed by Leona's damaging abilities, but never consumed in a solo duel: Leona cannot trigger her own allied-champion passive.");
    kit.assume("Eclipse continuously recalculates its resistance bonuses from the current bonus resistances of other sources, excluding its own granted resistance buff to avoid self-scaling feedback.");
    kit.assume("Zenith Blade roots when the sword reaches maximum range, since the pinned source says the root timing is inconsistent. Its dash uses the documented 2000-unit missile speed as an estimate; the source gives no dash speed. The landing point is fixed 225 units beyond the target's position at sword expiry.");
    kit.assume("Solar Flare aims at the enemy's location within 1200 units, with a 325-unit outer radius and the documented 175-unit epicenter. Epicenter membership is determined by the target's center on the one-dimensional line.");

    const flareDamage: Effect = { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") };
    const flareEffects: Effect[] = [flareDamage, { type: "cc", cc: "slow", duration: flareSeconds, strength: flareSlow }];
    const centerEffects: Effect[] = [...flareEffects, { type: "cc", cc: "stun", duration: flareSeconds }];
    const sunlight = (ctx: HookContext) => ctx.apply({ type: "mark", key: "sunlight", duration: sunlightSeconds });
    const guardBuff = (ctx: HookContext) => {
      const left = Math.max(0, Number(ctx.memory.guardEnd ?? -1) - ctx.tick) / 30;
      if (left <= 0) return;
      const d = derive(ctx.self);
      const ownArmor = ctx.self.statuses.find((s) => s.memoKey === "buff:eclipseArmor")?.value ?? 0;
      const ownMR = ctx.self.statuses.find((s) => s.memoKey === "buff:eclipseMR")?.value ?? 0;
      ctx.buff("eclipseArmor", "armor", guardArmor.base + (guardArmor.ratios?.bonusArmor ?? 0) * Math.max(0, d.armor.bonus - ownArmor), left);
      ctx.buff("eclipseMR", "MR", guardMR.base + (guardMR.ratios?.bonusMR ?? 0) * Math.max(0, d.mr.bonus - ownMR), left);
    };
    const unlockBlade = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.ability === "E" && (s.key === "noMovement" || s.key === "noAttacks")));
      ctx.memory.bladeInFlight = false;
    };
    const bladeDash = (ctx: HookContext) => {
      unlockBlade(ctx);
      ctx.memory.bladeStruck = false;
      if (!ctx.enemy.alive || Math.abs(ctx.enemy.x - ctx.self.x) > bladeLimit) return;
      const dir = directionTo(ctx.self, ctx.enemy);
      const landing = ctx.enemy.x + dir * bladeBeyond;
      const distance = landing - ctx.self.x;
      const count = Math.max(1, Math.ceil(Math.abs(distance) / (bladeSpeed / 30) - 1e-9));
      ctx.apply({ type: "cc", cc: "root", duration: bladeRoot });
      ctx.self.action = { kind: "dash", ability: "E", startTick: ctx.tick, endTick: ctx.tick + count, perTick: distance / count, stopAtContact: false, unstoppable: false, through: true };
    };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        cooldownAfter: "empower", overlay: true,
        delivery: { kind: "self" },
        onSelf: [{
          type: "empower", attacks: 1, window: daybreakWindow, bonusRange: daybreakRange, uncancellable: true, resetAttack: true, spellShieldOnHit: true,
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Bonus Magic Damage"), label: q.name, noLifeSteal: true },
            { type: "cc", cc: "stun", duration: daybreakStun },
            { type: "mark", key: "sunlight", duration: sunlightSeconds },
          ],
        }],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        overlay: true, preserveAttackWindup: true,
        delivery: { kind: "self" },
        onSelf: [{ type: "state", state: "flatDamageReduction", value: reduction, duration: guardSeconds }],
        onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }],
        roles: ["damage", "buff", "defense"],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
        overlay: true,
        delivery: { kind: "line", range: bladeRange, width: e.field("width"), speed: bladeSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
        decisive: true, flags: { projectile: true, grounded: true, knockdown: true }, roles: ["damage", "cc", "engage"],
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true,
        delivery: { kind: "circle", range: r.field("targetRange"), radius: flareRadius, delay: flareDelay },
        onHit: flareEffects,
      },
    ];
    return {
      abilities,
      attack: { blockStopsOnHit: true },
      budget: { statMultipliers: { armor: 1 + (guardArmor.ratios?.bonusArmor ?? 0), mr: 1 + (guardMR.ratios?.bonusMR ?? 0) } },
      hooks: {
        onAttack(ctx) {
          const action = ctx.self.action;
          if (action?.kind === "windup" && action.onHit.some((effect) => effect.type === "damage" && effect.label === q.name)) {
            // The explicit next attack command takes advantage of Daybreak's second reset.
            ctx.self.attackReadyTick = ctx.tick + attackTiming(ctx.self).windup;
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W") {
            ctx.memory.guardEnd = ctx.tick + ticks(extendedSeconds);
            ctx.apply({ type: "state", state: "flatDamageReduction", value: reduction, duration: extendedSeconds }, true);
            guardBuff(ctx);
          }
        },
        onAbilityHit(ctx) {
          sunlight(ctx);
          if (ctx.ability.key === "E") {
            ctx.memory.bladeStruck = true;
            if (ctx.tick >= Number(ctx.memory.bladeExpire ?? Number.POSITIVE_INFINITY)) bladeDash(ctx);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            ctx.memory.guardEnd = ctx.tick + ticks(guardSeconds);
            ctx.memory.guardDetonate = ctx.tick + ticks(guardSeconds);
            guardBuff(ctx);
          }
          if (ctx.ability.key === "E") {
            ctx.memory.bladeInFlight = true;
            ctx.memory.bladeStruck = false;
            ctx.memory.bladeLaunch = ctx.tick;
            ctx.memory.bladeExpire = ctx.tick + ticks(bladeRange / bladeSpeed);
            const duration = bladeRange / bladeSpeed + 2 / 30;
            ctx.apply({ type: "state", state: "noAttacks", duration }, true);
            ctx.apply({ type: "state", state: "noMovement", duration }, true);
          }
        },
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory.guardDetonate ?? Number.POSITIVE_INFINITY)) {
            delete ctx.memory.guardDetonate;
            if (Math.abs(ctx.enemy.x - ctx.self.x) <= guardRadius) {
              const eclipse = abilities.find((a) => a.key === "W");
              if (eclipse) abilityHit(ctx.world, ctx.self, ctx.enemy, eclipse, eclipse.onHit ?? []);
            }
          }
          guardBuff(ctx);
          if (ctx.memory.bladeInFlight) {
            const launch = Number(ctx.memory.bladeLaunch ?? ctx.tick);
            const expire = Number(ctx.memory.bladeExpire ?? Number.POSITIVE_INFINITY);
            if (ctx.memory.bladeStruck && ctx.tick >= expire) bladeDash(ctx);
            else if (!ctx.memory.bladeStruck && ctx.tick > launch && !ctx.world.missiles.some((m) => m.owner === ctx.self.side && m.source === "E")) unlockBlade(ctx);
          }
          // A circle's central and outer effects must be visible to both the hit resolver and its sidestep behavior.
          for (const zone of ctx.world.zones) {
            if (zone.owner === ctx.self.side && zone.ability === "R" && zone.kind === "delayedArea" && !zone.bands) {
              zone.bands = [{ from: zone.x - epicenter, to: zone.x + epicenter, onHit: centerEffects }];
            }
          }
        },
      },
    };
  },
};

export default leona;
