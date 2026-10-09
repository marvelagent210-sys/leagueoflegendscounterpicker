/** Yone: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { contactGap, directionTo } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const yone: KitModule = {
  champion: "Yone",
  build(kit) {
    const innate = kit.ability("Way of the Hunter");
    const q = kit.ability("Mortal Steel");
    const w = kit.ability("Spirit Cleave");
    const e = kit.ability("Soul Unbound");
    const r = kit.ability("Fate Sealed");

    innate.quote("Yone's total critical strike chance is doubled from all other sources");
    const adPerExcessCrit = innate.quoted("every 1% critical strike chance in excess of 100% is converted into 0.5 bonus attack damage", 2);
    const azakana = innate.quoted("basic attacks with Azakana Sword deal 50% AD physical damage and 50% AD magic damage", 0) / 100;
    // Mortal Steel and Spirit Cleave: cooldowns and cast times shorten with bonus attack speed.
    const steelCooldown = (bonusAS: number) => 4 - ((4 - 1.33333) * Math.min(1.1111, bonusAS)) / 1.1111;
    const cleaveCooldown = (bonusAS: number) => 14 - ((14 - 6) * Math.min(0.94553, bonusAS)) / 0.94553;
    const stormSeconds = q.quoted("Yone generates a stack of Gathering Storm for 6 seconds", 0);
    const knockUp = q.quoted("knocking up enemies hit in their path for 0.75 seconds", 0);
    const spiritSeconds = e.quoted("entering Spirit Form for 5 seconds", 0);
    // "Damage Stored: 35% of damage dealt".
    const stored = e.baseOf("Damage Stored") / 100;
    const bodyDistance = e.field("range");
    const cleaveShield = w.levelValue("Yone grants himself a shield for 40 – 90 (based on level)");
    const cleaveShieldBonusAD = w.quoted("(+ 65% bonus AD) for 1.5 seconds", 0) / 100;
    kit.assume("Mortal Steel and Spirit Cleave's cast times are taken at 0 bonus attack speed.");
    kit.assume("Fate Sealed pulls Yone next to its target; Soul Unbound's return takes him straight back to his body.");
    kit.assume("The budget's crit chance counts double for Yone, but the budget doesn't know it.");

    const steel: Effect[] = [
      { type: "damage", damageType: "physical", amount: flat(q.formula("Physical Damage").base) },
      { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: q.formula("Physical Damage").ratios?.AD ?? 0 } }, canCrit: true },
    ];
    const storm = (unit: Unit, world: World) => (world.tick < Number(unit.memory.stormUntil ?? -1) ? Number(unit.memory.storm ?? 0) : 0);
    const mortal = (key: "Q" | "Q3", spec: Omit<AbilitySpec, "key" | "name" | "slot" | "cooldown" | "castTime">): AbilitySpec => ({
      key,
      name: key === "Q" ? q.name : `${q.name} (third cast)`,
      slot: "Q",
      cooldown: 4,
      castTime: 0.35,
      ...spec,
    });

    return {
      hooks: {
        onStart(ctx) {
          const doubled = 2 * (ctx.self.spec.bonus?.critChance ?? 0);
          ctx.buff("intent", "critChance", Math.min(doubled, 1) - (ctx.self.spec.bonus?.critChance ?? 0), 1e9);
          if (doubled > 1) ctx.buff("intentAD", "AD", (doubled - 1) * 100 * adPerExcessCrit, 1e9);
        },
        onAttack(ctx) {
          // Steel and Spirit: every second attack is the Azakana Sword's, split physical and magic.
          const count = Number(ctx.memory.swings ?? 0) + 1;
          ctx.memory.swings = count;
          if (count % 2 === 1) ctx.apply({ type: "empower", attacks: 1, window: 1e6, onHit: [], split: { physical: azakana, magic: azakana } }, true);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          const bonusAS = derive(ctx.self).bonusAttackSpeed;
          if (key === "Q" || key === "Q3") {
            const ready = ctx.tick + ticks(steelCooldown(bonusAS));
            ctx.self.cooldownReady.Q = ready;
            ctx.self.cooldownReady.Q3 = ready;
            if (key === "Q3") ctx.memory.storm = 0;
          }
          if (key === "W") ctx.self.cooldownReady.W = ctx.tick + ticks(cleaveCooldown(bonusAS));
          if (key === "E") {
            ctx.memory.bodyX = ctx.self.x - directionTo(ctx.self, ctx.enemy) * bodyDistance;
            ctx.memory.spirit = 0;
            ctx.memory.spiritUntil = ctx.tick + ticks(spiritSeconds);
          }
          if (key === "E2") {
            // Back to the body, and the stored damage strikes as true damage.
            const damage = Number(ctx.memory.spirit ?? 0);
            ctx.memory.spiritUntil = -1;
            if (damage > 0) ctx.apply({ type: "damage", damageType: "true", amount: flat(damage), label: "Soul Unbound (stored)" });
            ctx.self.x = Number(ctx.memory.bodyX ?? ctx.self.x);
          }
        },
        onDamageDealt(ctx) {
          if (ctx.tick < Number(ctx.memory.spiritUntil ?? -1) && ctx.ability !== "Soul Unbound (stored)") ctx.memory.spirit = Number(ctx.memory.spirit ?? 0) + stored * ctx.amount;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory.storm = Math.min(2, Number(ctx.memory.storm ?? 0) + 1);
            ctx.memory.stormUntil = ctx.tick + ticks(stormSeconds);
          }
          if (key === "W") {
            // The shield doubles for hitting a champion.
            ctx.apply({ type: "shield", amount: { base: cleaveShield * 2, ratios: { bonusAD: cleaveShieldBonusAD * 2 } }, duration: w.quoted("(+ 65% bonus AD) for 1.5 seconds", 1) }, true);
          }
          if (key === "R" && contactGap(ctx.self, ctx.enemy) > 0) {
            // Yone blinks past the target: in one dimension, up to it.
            ctx.self.x = ctx.enemy.x - directionTo(ctx.self, ctx.enemy) * (ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius);
          }
        },
      },
      abilities: [
        mortal("Q", {
          usable: (unit, world) => storm(unit, world) < 2,
          delivery: { kind: "line", range: q.field("range", "Thrust range"), width: q.field("width", "Thrust width") },
          onHit: steel,
          flags: { appliesOnHit: true, projectile: false },
        }),
        mortal("Q3", {
          usable: (unit, world) => storm(unit, world) >= 2,
          // Yone dashes forward with the whirlwind, knocking up enemies in his path.
          delivery: { kind: "dash", direction: "toward", distance: q.field("range", "Third cast dash distance"), speed: q.field("speed"), hitRadius: q.field("collisionRadius") },
          onHit: [...steel, { type: "displace", direction: "away", distance: 0, duration: knockUp }],
          flags: { appliesOnHit: true, grounded: true, knockdown: true },
        }),
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: 14,
          castTime: 0.5,
          delivery: { kind: "area", near: 0, far: w.field("effectRadius"), delay: 0, anchor: "caster" },
          onHit: [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: 0,
          chainCooldown: "last",
          delivery: { kind: "dash", direction: "toward", distance: bodyDistance, speed: e.field("speed") },
          onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: flat(0.2), duration: spiritSeconds }],
          flags: { grounded: true },
        },
        {
          key: "E2",
          name: `${e.name} (return)`,
          slot: "E",
          cooldown: 0,
          castTime: e.castTime("Recast"),
          chain: { root: "E", index: 2, window: spiritSeconds, delay: e.quoted("Soul Unbound can be recast after 0.5 seconds", 0), auto: true },
          delivery: { kind: "self" },
          onSelf: [{ type: "state", state: "displacementImmune", duration: 0.3 }],
          roles: ["defense"],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "line", range: r.field("range"), width: r.field("width") },
          onHit: [
            { type: "cc", cc: "stun", duration: r.quoted("knocking them down and stunning them for 1 second", 0) },
            {
              type: "delayed",
              delay: r.quoted("After 0.3 seconds, a gust rushes along the same area", 0),
              effects: [
                { type: "damage", damageType: "physical", amount: r.formula("Physical Damage") },
                { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
                { type: "displace", direction: "away", distance: 0, duration: r.quoted("then knocks them up for 0.75 seconds", 0) },
              ],
            },
          ],
          flags: { grounded: true, projectile: false },
        },
      ],
    };
  },
};

export default yone;
