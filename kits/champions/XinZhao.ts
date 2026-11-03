/** Xin Zhao: independent Determination counters, three Talons and Challenge. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, directionTo, heal } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { attackDamage, extraAttacks, seriesAt, ticks } from "./util";

const xin: KitModule = {
  champion: "XinZhao",
  build(kit) {
    const passive = kit.ability("Determination");
    const q = kit.ability("Three Talon Strike");
    const w = kit.ability("Wind Becomes Lightning");
    const e = kit.ability("Audacious Charge");
    const r = kit.ability("Crescent Guard");
    const procAt = passive.quoted("stacking up to 3 times", 0);
    const procDamage: Formula = { base: 0, ratios: { AD: passive.levelValue("The third stack consumes them all", 0) / 100, AP: passive.levelValue("The third stack consumes them all", 1) / 100 } };
    const procHeal: Formula = { base: 0, ratios: { maxHP: passive.levelValue("The third stack consumes them all", 2) / 100, AP: passive.levelValue("The third stack consumes them all", 3) / 100 } };
    const challengeSeconds = passive.quoted("for 3 seconds", 0);
    passive.quote("the bonus damage stacks are consumed on-attack, and the healing ones on-hit");
    passive.quote("Stacks of Determination will be gained even if the attack is blocked");
    passive.quote("Spell shield will block the mark application from W, but not from basic attacks and E");
    const talons = q.quoted("within 5 seconds", 0);
    const talonDamage = q.formula("Bonus Physical Damage");
    const talonRefund = q.quoted("reduce his other abilities' current cooldowns by 1 second", 0);
    const knockUp = q.quoted("knocks up the target for 0.75 seconds", 0);
    q.quote("Spell shield will only block the knock up");
    const slashes = w.quoted("unleashes 4 slashes", 0);
    const slashSeconds = w.quoted("over the first 0.15 seconds", 0);
    const slashDamage = w.formula("Physical Damage per Slash");
    const thrustDamage = w.formula("Thrust Physical Damage");
    const thrustCrit = w.seriesIn("based on critical strike chance");
    const slashReach = w.field("effectRadius", "Slash semi-circle radius");
    const extraReach = w.field("effectRadius", "Slash and thrust extra check radius");
    const thrustRange = w.field("range", "Maximum possible range; See notes");
    const slow = w.quoted("slowing them by 50% for 1.5 (+ 0.5 per 100 AP) seconds", 0) / 100;
    const slowSeconds = w.quoted("slowing them by 50% for 1.5 (+ 0.5 per 100 AP) seconds", 1);
    const slowAp = w.quoted("slowing them by 50% for 1.5 (+ 0.5 per 100 AP) seconds", 2) / w.quoted("slowing them by 50% for 1.5 (+ 0.5 per 100 AP) seconds", 3);
    const wSteal = w.quoted("heals Xin Zhao for 33.3% of his life steal", 0) / 100;
    w.quote("Spirit Visage will amplify the life gain twice");
    w.quote("The durations of Three Talon Strike and Audacious Charge bonus attack speed are delayed relative to Wind Becomes Lightning's cast time");
    const normalCharge = e.field("targetRange", "Normal range");
    const extendedCharge = e.field("targetRange", "Enhanced range against Challenged targets");
    const chargeSpeedSeconds = e.quoted("gains bonus attack speed for 5 seconds", 0);
    const chargeSpeedBase = e.baseOf("Bonus Attack Speed") / 100;
    const chargeSpeedAp = e.quoted("(+ 10% per 100 AP)", 0) / 100 / e.quoted("(+ 10% per 100 AP)", 1);
    const chargeSpeedNonBuff = e.quoted("(+ 1% per 4% bonus attack speed from non-buff sources)", 0) / e.quoted("(+ 1% per 4% bonus attack speed from non-buff sources)", 1);
    const chargeSlow = e.quoted("slowing all targets hit by 30% for 0.5 seconds", 0) / 100;
    const chargeSlowSeconds = e.quoted("slowing all targets hit by 30% for 0.5 seconds", 1);
    const guardSeconds = r.quoted("For the next 4 seconds", 0);
    const guardRadius = r.field("effectRadius", "Immunity minimum radius");
    const guardDamage = r.formula("Physical Damage");
    const knockBack = r.quoted("up-to 700 units over 0.75 seconds", 0);
    const knockBackSeconds = r.quoted("up-to 700 units over 0.75 seconds", 1);
    r.quote("Displacement immunity will also resist the application of the stun");
    const wCooldown = w.cooldown(), eCooldown = e.cooldown();
    kit.assume("Wind Becomes Lightning's four slashes are evenly spaced over the stated 0.15 seconds; the committed source does not give four individual impact times.");
    kit.assume("Wind Becomes Lightning's cone is aligned with the opposing champion at cast start in the 1D duel; its extra 125-unit check also reaches behind Xin Zhao.");
    kit.assume("Wind Becomes Lightning uses the wiki's 60-mana cost and Audacious Charge the wiki's 60-mana cost; the committed game files disagree (40 and 50 at maximum rank).");
    kit.assume("Determination's unknown parry interaction is modeled as an independent self-heal on W contact, while Riposte negates its damage and attack dodge/blind prevent basic-attack stacks.");
    kit.assume("A spell shield on Wind Becomes Lightning's first slash blocks the entire cast. A later shield blocks its contact only; the source notes inconsistent first/second-slash behavior.");
    kit.assume("Audacious Charge uses the simulator's initial dash direction. A target teleporting across Xin Zhao during travel can evade its primary damage, slow and Challenge; the source guarantees that primary hit, but full target-dash tracking is not yet simulated.");

    const challenged = (ctx: HookContext) => ctx.enemy.statuses.some((s) => s.kind === "mark" && s.key === "xin:challenge" && s.source === ctx.self.side && s.endTick > ctx.tick);
    const challenge = (ctx: HookContext) => ctx.apply({ type: "mark", key: "xin:challenge", duration: challengeSeconds });
    const healStack = (ctx: HookContext) => {
      const stacks = Number(ctx.memory.determinationHeal ?? 0) + 1;
      ctx.memory.determinationHeal = stacks >= procAt ? 0 : stacks;
      if (stacks >= procAt) ctx.apply({ type: "heal", amount: procHeal }, true);
    };
    const damageStack = (ctx: HookContext) => {
      const stacks = Number(ctx.memory.determinationDamage ?? 0) + 1;
      ctx.memory.determinationDamage = stacks >= procAt ? 0 : stacks;
      return stacks >= procAt;
    };
    const grantChargeSpeed = (ctx: HookContext) => {
      const nonBuff = ctx.self.spec.base.attackSpeed.bonus + (ctx.self.spec.bonus?.attackSpeed ?? 0);
      ctx.buff("xin:charge", "attackSpeed", chargeSpeedBase + chargeSpeedAp * derive(ctx.self).ap + chargeSpeedNonBuff * nonBuff, chargeSpeedSeconds);
      ctx.memory.chargeUntil = ctx.tick + ticks(chargeSpeedSeconds);
      ctx.memory.chargePending = false;
    };
    const damage = (amount: Formula, label: string, crit = false): Effect => ({ type: "damage", damageType: "physical", amount, ...(crit ? { canCrit: true } : {}), label });
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), cooldownAfter: "empower", overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "empower", attacks: procAt, window: talons, resetAttack: true, uncancellable: true, onHit: [damage(talonDamage, q.name, true)] }], roles: ["damage", "cc"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), castDirection: "start", delivery: { kind: "line", range: thrustRange, width: w.field("width"), speed: w.field("speed") }, flags: { projectile: false, spellShield: true }, onHit: [damage(thrustDamage, `${w.name} (thrust)`), { type: "cc", cc: "slow", strength: slow, duration: slowSeconds }, { type: "mark", key: "xin:challenge", duration: challengeSeconds }], decisive: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "dash", direction: "target", distance: extendedCharge, speed: e.field("speed"), hitRadius: e.field("effectRadius") }, usable: (unit, world) => {
        const enemy = world.units[unit.side === 0 ? 1 : 0];
        const marked = enemy.statuses.some((s) => s.kind === "mark" && s.key === "xin:challenge" && s.source === unit.side && s.endTick > world.tick);
        return Math.abs(unit.x - enemy.x) <= (marked ? extendedCharge : normalCharge) + enemy.spec.base.radius;
      }, flags: { grounded: true, knockdown: e.flag("knockdown") ?? true, spellShield: true }, onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: chargeSlow, duration: chargeSlowSeconds }], roles: ["damage", "engage"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "aura", radius: r.field("effectRadius", "Knockback radius") }, onHit: [damage(guardDamage, r.name)], onSelf: [{ type: "state", state: "invulnerableFar", value: guardRadius, duration: guardSeconds }], roles: ["damage", "defense"] },
    ];
    // Q's uncancellable windup buffers commands until impact (the Q source notes).
    for (const ability of abilities) {
      const original = ability.usable;
      ability.usable = (unit, world) => !(unit.action?.kind === "windup" && unit.action.uncancellable) && (!original || original(unit, world));
    }
    const wSpec = abilities[1]!;
    const slashAt = (ctx: HookContext, slash: number) => {
      ctx.memory.windSlashNext = slash + 1;
      const distance = Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius;
      const inFront = (ctx.enemy.x - ctx.self.x) * Number(ctx.memory.windDirection) >= 0;
      if (!ctx.memory.windBlocked && (distance <= extraReach || (inFront && distance <= slashReach))) {
        abilityHit(ctx.world, ctx.self, ctx.enemy, wSpec, [damage(slashDamage, `${w.name} (slash ${slash + 1})`)]);
      }
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return undefined;
      const { self, world } = view;
      if (self.action?.kind === "windup" && self.action.uncancellable) return undefined;
      const ready = (key: string) => canCast(world, self, abilities.find((a) => a.key === key)!);
      if (self.action?.kind === "dash") {
        if (ready("Q")) return { kind: "cast", ability: "Q" };
        if (self.hp < 0.5 * derive(self).maxHp && ready("R")) return { kind: "cast", ability: "R" };
        return undefined;
      }
      if (self.action && self.action.kind !== "windup") return undefined;
      if (self.hp < 0.6 * derive(self).maxHp && ready("R") && view.distance <= 500) return { kind: "cast", ability: "R" };
      if (view.distance > self.spec.attack.range && ready("W") && view.distance < thrustRange) return { kind: "cast", ability: "W" };
      if (view.distance > self.spec.attack.range && ready("E")) return { kind: "cast", ability: "E" };
      if (view.distance <= self.spec.attack.range && ready("Q")) return { kind: "cast", ability: "Q" };
      // Use the knockup to make both stages of W connect before spending another attack.
      if (ready("W") && self.memory.talonHits === procAt) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };
    return {
      abilities, behavior,
      budget: { damage: (self, target) => {
        const nonBuff = self.spec.base.attackSpeed.bonus + (self.spec.bonus?.attackSpeed ?? 0);
        const speed = chargeSpeedBase + chargeSpeedAp * derive(self).ap + chargeSpeedNonBuff * nonBuff;
        const wCycle = cooldownAfterHaste(wCooldown, derive(self).abilityHaste) + wSpec.castTime;
        const extra = extraAttacks(self, speed * chargeSpeedSeconds / cooldownAfterHaste(eCooldown, derive(self).abilityHaste));
        const attacks = derive(self).attackSpeed + extra;
        return { physical: attackDamage(self) * extra + evaluate(procDamage, self, target) * (attacks + 2 / wCycle) / procAt + (slashes * evaluate(slashDamage, self, target) + evaluate(thrustDamage, self, target) * seriesAt(thrustCrit, derive(self).critChance * 100, true) / 100) / wCycle };
      }, healing: (self) => evaluate(procHeal, self, self) * (derive(self).attackSpeed + 2 / (cooldownAfterHaste(wCooldown, derive(self).abilityHaste) + wSpec.castTime)) / procAt },
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key !== "W") return;
          ctx.memory.windStart = ctx.tick;
          ctx.memory.windDirection = directionTo(ctx.self, ctx.enemy);
          ctx.memory.windSlashNext = 0;
          ctx.memory.windBlocked = false;
          ctx.memory.windNearHit = false;
          // Pause active Q/E buffs for W's cast duration, including attacks retained in
          // the Q empowerment. The cast is ordinary and uninterruptible.
          const pause = ticks(wSpec.castTime);
          for (const s of ctx.self.statuses) if (s.source === ctx.self.side && ((s.kind === "empower" && s.key === "Q") || s.memoKey === "buff:xin:charge")) s.endTick += pause;
          if (ctx.memory.chargeUntil) ctx.memory.chargeUntil = Number(ctx.memory.chargeUntil) + pause;
          slashAt(ctx, 0);
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") ctx.memory.talonHits = 0;
          if (ctx.ability.key === "E") ctx.memory.chargePending = true;
          if (ctx.ability.key === "W" && Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= extraReach) {
            // The source's additional 125-radius check reaches behind Xin too, and
            // connects at thrust launch instead of waiting for a directional missile.
            ctx.memory.windNearHit = true;
            abilityHit(ctx.world, ctx.self, ctx.enemy, wSpec, wSpec.onHit!.map((eff) => eff.type === "damage" ? { ...eff, label: `${w.name} (thrust nearby)` } : eff));
          }
        },
        onTick(ctx) {
          const slash = Number(ctx.memory.windSlashNext ?? slashes);
          if (slash < slashes && ctx.tick >= Number(ctx.memory.windStart) + ticks(slash * slashSeconds / (slashes - 1))) {
            slashAt(ctx, slash);
          }
          if (ctx.memory.chargePending && ctx.self.action?.kind !== "dash") grantChargeSpeed(ctx);
        },
        onAttack(ctx) {
          const windup = ctx.self.action;
          if (windup?.kind !== "windup") return;
          if (Number(ctx.memory.determinationDamage ?? 0) >= procAt - 1) {
            ctx.memory.determinationDamage = 0;
            windup.onHit.push(damage(procDamage, passive.name));
            ctx.memory.determinationConsumed = true;
          } else ctx.memory.determinationConsumed = false;
          if (windup.empowered?.includes("Q")) {
            const n = Number(ctx.memory.talonHits ?? 0) + 1;
            ctx.memory.talonHits = n;
            for (const s of ctx.self.statuses) if (s.kind === "empower" && s.key === "Q") s.endTick = ctx.tick + ticks(talons);
            for (const key of ["W", "E", "R"]) ctx.apply({ type: "refund", ability: key, seconds: talonRefund }, true);
            if (n === procAt) windup.onHit.push({ type: "cc", cc: "airborne", duration: knockUp, spellShield: true });
          }
        },
        onAttackHit(ctx) {
          if (!ctx.memory.determinationConsumed) damageStack(ctx);
          healStack(ctx);
          challenge(ctx);
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E") { grantChargeSpeed(ctx); challenge(ctx); }
          if (ctx.ability.key === "R") {
            if (challenged(ctx) || hasState(ctx.enemy, "displacementImmune")) return [...ctx.effects];
            return [...ctx.effects, { type: "displace", direction: "away", distance: knockBack, duration: knockBackSeconds }, { type: "cc", cc: "stun", duration: knockBackSeconds }];
          }
          if (ctx.ability.key !== "W") return;
          if (ctx.memory.windBlocked) return [];
          const isFirst = ctx.effects.some((eff) => eff.type === "damage" && eff.label === `${w.name} (slash 1)`);
          const isLineThrust = ctx.effects.some((eff) => eff.type === "damage" && eff.label === `${w.name} (thrust)`);
          if (isLineThrust && ctx.memory.windNearHit) return [];
          const isThrust = isLineThrust || ctx.effects.some((eff) => eff.type === "damage" && eff.label === `${w.name} (thrust nearby)`);
          if (isFirst && ctx.defense === "spellShield") ctx.memory.windBlocked = true;
          let effects = [...ctx.effects];
          if (isThrust) {
            effects = effects.map((eff) => eff.type === "damage" ? { ...eff, amount: { base: evaluate(thrustDamage, ctx.self, ctx.enemy) * (1 + seriesAt(thrustCrit, derive(ctx.self).critChance * 100, true) / 100) } } : eff.type === "cc" && eff.cc === "slow" ? { ...eff, duration: slowSeconds + slowAp * derive(ctx.self).ap } : eff);
          }
          if (isFirst || isThrust) {
            if (damageStack(ctx)) effects.push({ type: "damage", damageType: "physical", amount: procDamage, label: `${passive.name} (W)`, noLifeSteal: true });
            healStack(ctx);
          }
          return effects;
        },
        onDamageDealt(ctx) {
          if (ctx.ability?.startsWith(w.name) && ctx.mitigated > 0) {
            const d = derive(ctx.self);
            // Legacy W healing scales with healing increase twice (life-steal scaling
            // and received healing); Determination's separate W damage has neither.
            heal(ctx.world, ctx.self, ctx.mitigated * d.lifeSteal * wSteal * (1 + d.healingIncrease));
          }
        },
      },
    };
  },
};
export default xin;
