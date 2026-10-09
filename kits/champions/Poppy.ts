/** Poppy: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { abilityReach, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { type Effect, cooldownKeyOf } from "../../engine/sim/spec";
import { areaAt, maxHp, ticks } from "./util";

const poppy: KitModule = {
  champion: "Poppy",
  build(kit) {
    const innate = kit.ability("Iron Ambassador");
    const q = kit.ability("Hammer Shock");
    const w = kit.ability("Steadfast Presence");
    const e = kit.ability("Heroic Charge");
    const r = kit.ability("Keeper's Verdict");

    // Iron Ambassador: every few seconds the next attack throws the buckler.
    const bucklerCooldown = innate.field("staticCooldown");
    const bucklerRange = innate.quoted("gaining 350 bonus range", 0);
    const bucklerDamage = innate.levelValue("dealing 20 – 180 (based on level) bonus magic damage");
    const bucklerShield = innate.levelValue("gaining a shield for 11 – 20 (based on level)% of her maximum health") / 100;
    const bucklerShieldSeconds = innate.quoted("of her maximum health for 3 seconds", 0);
    const bucklerFall = innate.quoted("falls to a location near the target over 1 second", 0);
    // Stubborn to a Fault: 16% more armor and magic resistance, 32% below 40% health.
    const stubborn = w.quoted("Poppy increases her total armor and total magic resistance by 16%", 0) / 100;
    const doubledBelow = w.quoted("doubled to 32% while she is below 40% maximum health", 1) / 100;
    const auraSeconds = w.quoted("creates an aura around herself for 2 seconds", 0);
    const hammerField = q.quoted("The impact creates a field for 1 second", 0);
    const carry = e.quoted("carries them along with her for up to 400 units", 0);
    kit.assume("Poppy picks her buckler back up whenever she is next to her enemy a second after throwing it.");
    kit.assume("Poppy raises Steadfast Presence as soon as the enemy could dash onto her, rather than reacting to the dash.");
    kit.assume("In fights Keeper's Verdict is released at once (knock up); when running away it is charged to knock the enemy away.");
    kit.assume("Hammer Shock's slow leaves out its bonus from Poppy's bonus health.");

    const hit: Effect = { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") };

    const behavior: Behavior = (view) => {
      // Hold the anti-dash aura for an enemy that could dash onto Poppy.
      const aura = view.self.spec.abilities.find((a) => a.key === "W");
      if (aura && canCast(view.world, view.self, aura)) {
        const dash = view.enemy.spec.abilities.find((a) => (a.delivery.kind === "dash" && a.delivery.direction !== "away") && (view.enemy.cooldownReady[cooldownKeyOf(a)] ?? 0) <= view.world.tick);
        const reach = dash ? abilityReach(dash, view.enemy, view.self) ?? (dash.delivery.kind === "dash" ? dash.delivery.distance + 200 : 0) : 0;
        if (dash && Math.abs(view.self.x - view.enemy.x) <= reach + 100) return { kind: "cast", ability: "W" };
      }
      return defaultBehavior(view);
    };

    return {
      budget: {
        // Stubborn to a Fault: more armor and magic resistance for each point.
        statMultipliers: { armor: 1 + stubborn, mr: 1 + stubborn },
        // The buckler: its damage and its shield, once per cooldown.
        damage: () => ({ magic: bucklerDamage / bucklerCooldown }),
        healing: (self) => (bucklerShield * maxHp(self)) / bucklerCooldown,
      },
      hooks: {
        onTick(ctx) {
          const low = ctx.self.hp < doubledBelow * maxHp(ctx.self);
          ctx.buff("stubbornArmor", "armorPercent", low ? 2 * stubborn : stubborn, 1e9);
          ctx.buff("stubbornMR", "mrPercent", low ? 2 * stubborn : stubborn, 1e9);
          // The buckler lands near the enemy: next to it, Poppy picks it up for a shield.
          const lands = Number(ctx.memory.bucklerLands ?? -1);
          if (lands > 0 && ctx.tick >= lands) {
            ctx.memory.bucklerLands = -1;
            if (Math.abs(ctx.self.x - ctx.enemy.x) < 300) {
              ctx.apply({ type: "shield", amount: { base: bucklerShield * maxHp(ctx.self) }, duration: bucklerShieldSeconds }, true);
              ctx.log("picks up the buckler");
            }
          }
          if (ctx.tick >= Number(ctx.memory.bucklerReady ?? 0) && !ctx.memory.bucklerArmed) {
            ctx.memory.bucklerArmed = true;
            ctx.apply({ type: "empower", attacks: 1, window: 1e6, bonusRange: bucklerRange, onHit: [{ type: "damage", damageType: "magic", amount: { base: bucklerDamage }, label: "Iron Ambassador" }] }, true);
          }
        },
        onAttack(ctx) {
          if (!ctx.memory.bucklerArmed) return;
          ctx.memory.bucklerArmed = false;
          ctx.memory.bucklerReady = ctx.tick + ticks(bucklerCooldown);
          ctx.memory.bucklerLands = ctx.tick + ticks(bucklerFall) + 10;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") {
            // The field ruptures a second later where it was, hitting whoever is still in it
            // (as its own ability, so the rupture doesn't set off another).
            const dir = directionTo(ctx.self, ctx.enemy);
            const length = q.field("range", "Forward range");
            areaAt(ctx, "Qrupture", ctx.self.x + (dir * length) / 2, length / 2, hammerField, [hit]);
          }
          if (ctx.ability.key === "E") {
            // Poppy carries the enemy along: she moves with it.
            if (ctx.enemy.forced) ctx.self.forced = { ...ctx.enemy.forced, perTick: -ctx.enemy.forced.perTick };
          }
        },
      },
      behavior,
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          delivery: { kind: "area", near: 0, far: q.field("range", "Forward range"), delay: 0, anchor: "caster" },
          onHit: [hit, { type: "cc", cc: "slow", strength: q.baseOf("Slow") / 100, duration: hammerField }],
        },
        {
          // Hammer Shock's rupture, set off only by Hammer Shock itself.
          key: "Qrupture",
          name: `${q.name} (rupture)`,
          slot: "other",
          cooldown: 0,
          castTime: 0,
          usable: () => false,
          delivery: { kind: "self" },
          onHit: [hit],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "moveSpeedPercent", amount: { base: w.quoted("Poppy gains 40% bonus movement speed", 0) / 100 }, duration: auraSeconds },
            {
              type: "state",
              state: "antiDash",
              value: w.field("effectRadius"),
              duration: auraSeconds,
              effects: [
                { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
                { type: "displace", direction: "away", distance: 0, duration: w.quoted("knocked up for 0.5 seconds", 0) },
                { type: "cc", cc: "ground", duration: w.quoted("grounded and slowed by 25% for 2 seconds", 1) },
                { type: "cc", cc: "slow", strength: w.quoted("grounded and slowed by 25% for 2 seconds", 0) / 100, duration: w.quoted("grounded and slowed by 25% for 2 seconds", 1) },
              ],
            },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "target", distance: e.field("targetRange"), speed: e.field("speed"), hitRadius: 75 },
          onHit: [
            { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
            {
              type: "displace",
              direction: "away",
              distance: carry,
              duration: carry / e.field("speed"),
              wallStun: e.number("Stun Duration"),
              wallEffects: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
            },
          ],
          flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime("Uncharged release"),
          usable: (unit, world) => world.modes[unit.side] !== "flee",
          delivery: { kind: "area", near: 0, far: r.field("range", "Uncharged range"), delay: 0, anchor: "caster" },
          onHit: [
            { type: "damage", damageType: "physical", amount: r.formula("Physical Damage") },
            { type: "displace", direction: "away", distance: 0, duration: r.quoted("knocking them up for 1 second", 0) },
          ],
        },
        {
          key: "Rcharged",
          name: `${r.name} (charged)`,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          // Charged for 0.5 s, then released.
          castTime: r.quoted("If Keeper's Verdict was charged for at least 0.5 seconds", 0) + r.castTime("Charged release"),
          usable: (unit, world) => world.modes[unit.side] === "flee",
          delivery: { kind: "area", near: 0, far: 850, delay: 0, anchor: "caster" },
          onHit: [
            { type: "damage", damageType: "physical", amount: r.formula("Increased Damage") },
            { type: "displace", direction: "away", distance: r.quoted("knocked back up-to 3400 units toward the enemy team's fountain", 0), duration: 1.5 },
          ],
          roles: ["escape"],
        },
      ],
    };
  },
};

export default poppy;
