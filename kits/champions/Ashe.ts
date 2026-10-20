/** Ashe, from the pinned 16.20 ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { capAttackSpeed } from "../../engine/rules/timing";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { attackDamage, flat, seriesAt, ticks } from "./util";

const FROST = "ashe:frost";

const ashe: KitModule = {
  champion: "Ashe",
  build(kit) {
    const passive = kit.ability("Frost Shot");
    const q = kit.ability("Ranger's Focus");
    const w = kit.ability("Volley");
    const e = kit.ability("Hawkshot");
    const r = kit.ability("Enchanted Crystal Arrow");
    passive.quote("Ashe's basic attacks deal bonus physical damage equal to critical strike damage (based on critical strike chance) of the attack's damage. Critical strikes do not deal any additional damage");
    // Its deterministic damage equals the engine's averaged ordinary critical damage.
    // The pinned passive no longer conditions this bonus on the target already having Frost.
    const frostSeconds = passive.quoted("apply Frost to enemies for 2 seconds", 0);
    const slow = passive.levelValue("which slows them by 20 – 30 (based on level)%") / 100;
    const criticalSlow = passive.levelValue("double Frost's slow strength to 40 – 60 (based on level)%") / 100;
    passive.quote("decaying over the first second of the duration to its normal strength");
    const decaySeconds = 1;
    kit.assume("Frost critical slow is averaged by the attack's declaration-time critical chance; its extra strength decays linearly over the documented first second. A new Frost hit refreshes the ordinary slow without weakening a stronger critical slow still decaying.");

    const focusWindow = q.quoted("generate a stack of Focus for 4 seconds", 0);
    const maxFocus = q.quoted("stacking up to 4 times", 0);
    q.quote("Stacks expire one by one every second when the duration ends");
    const focusDecay = ticks(1);
    const focusCount = (unit: Unit, tick: number) => {
      const count = Number(unit.memory.focus ?? 0);
      const until = Number(unit.memory.focusUntil ?? -1);
      return tick < until ? count : Math.max(0, count - 1 - Math.floor((tick - until) / focusDecay));
    };
    const focusSeconds = q.quoted("For 6 seconds", 0);
    const focusSpeed = q.fraction("Bonus Attack Speed");
    const perArrow = q.formula("Physical Damage Per Arrow");
    const flurryRatio = q.shareOf("Total Damage Per Flurry");
    q.quote("The flurries apply life steal and Frost Shot per arrow, but apply on-hit effects only once");
    q.quote("Ranger's Focus resets Ashe's basic attack timer");
    q.quote("The flurries deal 1 instance of basic damage followed by 4 instances of a non-reactive type of damage");
    q.quote("The first flurry of a Ranger's Focus cast fires one additional arrow, dealing 20% increased total damage");
    const arrows = 1 + q.quoted("followed by 4 instances", 0);
    // The source spells out one additional arrow, rather than a second on-hit event.
    const extraFirstArrow = q.quoted("dealing 20% increased total damage", 0) / 100 * arrows;
    kit.assume("Ranger's Focus resolves its five arrows (six on the first flurry) at the same contact tick because the pinned source gives no inter-arrow interval. Each arrow is a separate damage packet; attached on-hit effects and the attack-hit hook occur once. Follow-up packets use the engine's attached-damage classification.");
    const arrow: Effect = { type: "damage", damageType: "physical", amount: perArrow, canCrit: true, label: q.name };
    const active = (ctx: HookContext) => ctx.tick < Number(ctx.memory.focusActiveUntil ?? -1);
    const criticalExtra = (ctx: HookContext) => {
      const started = Number(ctx.memory.frostCriticalStarted ?? -1);
      return Number(ctx.memory.frostCriticalExtra ?? 0) * Math.max(0, 1 - (ctx.tick - started) / ticks(decaySeconds));
    };
    const frost = (ctx: HookContext, critChance: number) => {
      const extra = Math.max(0, Math.min(1, critChance)) * (criticalSlow - slow);
      if (extra > criticalExtra(ctx)) {
        ctx.memory.frostCriticalStarted = ctx.tick;
        ctx.memory.frostCriticalExtra = extra;
      }
      const before = ctx.enemy.statuses.length;
      ctx.apply({ type: "cc", cc: "slow", duration: frostSeconds, strength: slow + criticalExtra(ctx) });
      // Do not restore a cleansed slow, or create one through slow/CC immunity.
      const applied = ctx.enemy.statuses.slice(before).find((s) => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side);
      if (applied) {
        applied.memoKey = FROST;
        ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s.memoKey !== FROST || s === applied);
      }
    };

    const stunSeries = r.seriesIn("stunning them for");
    r.quote("This ability will cast from wherever the caster is at the start of the cast time");
    r.fieldNumbers("range");
    kit.assume("Enchanted Crystal Arrow's stun is interpolated between the pinned distance bands, using travel from the cast-start position to the enemy's hitbox at contact. The one-dimensional model cannot distinguish transverse contact positions.");
    kit.assume("Volley models the aimed arrow in its cone; an enemy receives its damage only once. The source's 75-unit forward missile spawn offset is included in its reach, while travel starts at Ashe's center.");
    const volleyOffset = w.quoted("75 units in front of Ashe", 0);
    e.quote("granting sight of the area along its path repeatedly for 0.5 seconds after every 100 units traveled and at its destination for 5 seconds");
    e.quote("but does not actually reveal the units in particular");
    kit.assume("Hawkshot has its documented charges, recharge, cast time and no mana cost. The duel has no fog of war or brush, and ordinary sight cannot reveal invisibility, so Hawkshot provides no combat effect and the automatic behavior does not cast it.");

    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: 0, cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "self" },
        onSelf: [
          { type: "stat", stat: "attackSpeed", amount: flat(focusSpeed), duration: focusSeconds },
          { type: "resetAttack" },
        ],
        usable: (unit, world) => world.tick >= Number(unit.memory.focusActiveUntil ?? -1) && focusCount(unit, world.tick) >= maxFocus,
        roles: ["buff"],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        delivery: { kind: "line", range: w.field("effectRadius") + volleyOffset, width: w.field("width"), speed: w.field("speed") },
        onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Physical Damage") }],
        flags: { projectile: w.flag("projectile") ?? true }, decisive: true, roles: ["damage", "cc"],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), castTime: e.castTime(), cost: 0,
        charges: { max: e.quoted("up to a maximum of 2", 0), recharge: e.field("recharge") },
        delivery: { kind: "self" }, flags: { spellShield: e.flag("spellShield") ?? false }, roles: [],
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
        castOrigin: "start", castDirection: "start",
        delivery: { kind: "line", range: Infinity, width: r.field("width"), speed: r.field("speed") },
        onHit: [
          { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
          { type: "cc", cc: "stun", duration: seriesAt(stunSeries, 0, true) },
        ],
        flags: { projectile: r.flag("projectile") ?? true }, decisive: true,
      },
    ];

    kit.assume("The stat-budget hint estimates continuous attacks: four ordinary attacks to build Focus, six seconds of flurries, and one extra arrow per activation. Actual fights retain stack expiry, mana, cast decisions, defenses and interruptions.");
    kit.assume("Ashe's base critical-damage modifier is normalized to one for the engine's averaged damage calculation: this represents Frost Shot's unconditional, continuous critical-chance bonus rather than ordinary attacks dealing extra damage only when they critically strike.");
    return {
      abilities, base: { critDamageModifier: 1 },
      budget: {
        damage(self) {
          const d = derive(self);
          const normalRate = d.attackSpeed;
          const flurryRate = capAttackSpeed(normalRate + self.spec.base.attackSpeed.ratio * focusSpeed);
          const cycle = maxFocus / Math.max(normalRate, Number.EPSILON) + focusSeconds;
          return { physical: attackDamage(self) * ((flurryRate * flurryRatio - normalRate) * focusSeconds + (perArrow.ratios?.AD ?? 0) * extraFirstArrow) / cycle };
        },
      },
      hooks: {
        onAttack(ctx) {
          const attack = ctx.self.action;
          if (attack?.kind !== "windup") return;
          if (!active(ctx)) {
            const count = focusCount(ctx.self, ctx.tick);
            ctx.memory.focus = Math.min(maxFocus, count + 1);
            ctx.memory.focusUntil = ctx.tick + ticks(focusWindow);
            return;
          }
          attack.split = { physical: perArrow.ratios?.AD ?? 0, magic: 0 };
          const count = arrows - 1 + (ctx.memory.firstFlurry ? extraFirstArrow : 0);
          // Prepend the remaining arrows so ordinary attached on-hits follow the flurry once.
          attack.onHit = [...Array.from({ length: count }, () => ({ ...arrow })), ...attack.onHit];
          ctx.memory.firstFlurry = false;
        },
        onAttackHit(ctx) { frost(ctx, ctx.critChance); },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.focus = 0;
            ctx.memory.focusUntil = -1;
            ctx.memory.focusActiveUntil = ctx.tick + ticks(focusSeconds);
            ctx.memory.firstFlurry = true;
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "R") ctx.memory.arrowOrigin = ctx.self.x;
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "R") return;
          const traveled = Math.max(0, Math.abs(ctx.enemy.x - Number(ctx.memory.arrowOrigin ?? ctx.self.x)) - ctx.enemy.spec.base.radius);
          return ctx.effects.map((effect) => effect.type === "cc" && effect.cc === "stun" ? { ...effect, duration: seriesAt(stunSeries, traveled, true) } : { ...effect });
        },
        onAbilityHit(ctx) { if (ctx.ability.key === "W" || ctx.ability.key === "R") frost(ctx, ctx.ability.key === "W" ? 1 : 0); },
        onTick(ctx) {
          const until = Number(ctx.memory.focusUntil ?? -1);
          if (!active(ctx) && Number(ctx.memory.focus ?? 0) > 0 && ctx.tick >= until) {
            const remaining = focusCount(ctx.self, ctx.tick);
            ctx.memory.focus = remaining;
            ctx.memory.focusUntil = remaining > 0 ? until + (1 + Math.floor((ctx.tick - until) / focusDecay)) * focusDecay : -1;
          }
          const strength = slow + criticalExtra(ctx);
          let changed = false;
          const statuses = ctx.enemy.statuses.map((status) => {
            if (status.memoKey !== FROST || status.source !== ctx.self.side || status.value === strength) return status;
            changed = true;
            return { ...status, value: strength };
          });
          // The engine caches derived movement by status-array identity. A decaying slow
          // must replace that array, not only mutate the old entry's numeric value.
          if (changed) ctx.enemy.statuses = statuses;
        },
      },
    };
  },
};

export default ashe;
