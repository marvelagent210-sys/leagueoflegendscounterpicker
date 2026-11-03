/**
 * Viego (patch 26.20): his attacks take a share of the enemy's current health; his damaging
 * abilities mark the enemy, and his next attack strikes it again and heals him. Spectral Maw
 * charges a stunning blast and dashes after it; Harrowed Path's mist speeds his attacks and,
 * while he holds back, his steps; Heartbreaker blinks in for a strike on the enemy's missing health.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { attackHit, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, seriesAt, ticks } from "./util";

const MARK = "viego:mark";
const SECOND = "viego:secondStrike";

const viego: KitModule = {
  champion: "Viego",
  build(kit) {
    const p = kit.ability("Sovereign's Domination");
    const q = kit.ability("Blade of the Ruined King");
    const w = kit.ability("Spectral Maw");
    const e = kit.ability("Harrowed Path");
    const r = kit.ability("Heartbreaker");

    // Sovereign's Domination: possession begins with a takedown, which ends a duel.
    p.quote("Whenever Viego scores an enemy champion takedown while alive and within 3 seconds of damaging them, a Mist Wraith spawns from that champion's corpse for 8 seconds.");
    kit.assume("Sovereign's Domination begins with a champion takedown, which ends a duel, so Possession never comes into play.");

    // Blade of the Ruined King's passive: 6% of the target's current health on hit (at least 30), critically striking for 170%.
    const ruin: Formula = q.formula("Bonus Physical Damage");
    const ruinLeast = q.number("Minimum Bonus Damage");
    const ruinCrit = q.quoted("This damage can critically strike for 170% damage", 0) / 100;
    const ruinHit: Effect = { type: "damage", damageType: "physical", amount: ruin, minimum: { base: ruinLeast }, canCrit: true, critMultiplier: ruinCrit, label: q.name };
    // Damaging abilities mark the enemy for 4 s; his next attack on it strikes again for 20% AD (+ 15% AP), critically for 200%, and heals him for 150% of that strike's damage.
    const markSeconds = q.quoted("his damaging abilities apply a mark to enemies hit for 4 seconds", 0);
    const strikeWords = "Viego's next basic attack against a marked target is empowered to consume the mark on-hit to strike a second time, dealing 20% AD (+ 15% AP) physical damage.";
    const strike: Formula = { base: 0, ratios: { AD: q.quoted(strikeWords, 0) / 100, AP: q.quoted(strikeWords, 1) / 100 } };
    const strikeHeal = q.quoted("100% against minions, 125% against monsters, and 150% against other targets", 2) / 100;
    const strikeCrit = q.quoted("The second strike applies on-hit effects and can critically strike for 200% damage.", 0) / 100;
    const strikeLabel = `${q.name} (second strike)`;
    q.quote("Ability damage that applies on-hit effects (e.g., R damage against the primary target) cannot apply the mark but can consume it, as a basic attack would.");
    q.quote("Viego will not perform the second strike if the first attack was dodged, blocked, and missed.");
    // The thrust: 85 (+ 70% AD), increased by critical strike damage; its cast time is 140% of his attack windup.
    const thrust = q.formula("Physical Damage");
    q.quote("deals physical damage to enemies hit, increased by critical strike damage (based on critical strike chance)");
    const [windupShare = 140, baseCast = 0.35] = q.fieldNumbers("castTime");
    // The rectangle runs from 25 behind his center to 600 in front ("-25 - 600"; the parser keeps only the 25).
    const thrustRange = Math.max(...q.fieldNumbers("range"));
    q.fieldLabel("range", "Rectangle length is 625 units total, starting from 25 units behind Viego's center");
    const windupSeconds = (unit: Unit) => {
      const { percent, modifier } = unit.spec.base.windup;
      const base = percent / unit.spec.base.attackSpeed.base;
      return base + modifier * (percent / derive(unit).attackSpeed - base);
    };

    // Spectral Maw: charged up to 1 s (slowed by 10%), a blast of 500 – 900 range for 300 (+ 100% AP) that stuns for 0.25 – 1.25 s; then a 300 dash after it.
    const chargeWords = "Viego charges while being slowed by 10% for up to 3 seconds to increase Spectral Maw's missile range and stun duration over the first second of the channel.";
    const chargeSlow = w.quoted(chargeWords, 0) / 100;
    const reachSeries = w.fieldSeries("targetRange");
    const stunSeries = w.seriesIn("The mist deals magic damage to the first enemy hit and stuns them for");
    if (reachSeries.kind !== "variable" || stunSeries.kind !== "variable") throw new Error("Viego: Spectral Maw no longer grows with its charge");
    const fullCharge = Number(reachSeries.points.at(-1) ?? 1);
    const [dashDistance = 300] = w.fieldNumbers("targetRange");
    kit.assume(`Spectral Maw's range field reads "${dashDistance} / 500 / … / 900 (based on channel time)": the first number is the dash's fixed distance, the series the blast's range.`);
    w.quote("Viego hurls a blast of mist in the target direction and dashes a fixed distance in the same direction, though not through terrain.");
    w.quote("Spectral Maw resets Viego's basic attack timer.");
    const dashSpeed = w.field("speed", "Dash speed");
    const blastSpeed = w.field("speed", "Missile speed");
    kit.assume("Viego charges Spectral Maw just long enough for its range to reach the enemy, and its dash goes after the blast through the enemy's position.");

    // Harrowed Path: a mist trail 775 long for 8 s; in it, 50% attack speed, and 35% (+ 4% per 100 AP) movement speed after 1 s without attacking or casting.
    const mistReach = e.field("range", "Initial missile reach");
    const mistSeconds = e.quoted("creates a trail of Mist in its wake which lasts 8 seconds", 0);
    const mistSpeed = e.fraction("Bonus Attack Speed");
    const mistMoveWords = "Bonus Movement Speed: 25 / 27.5 / 30 / 32.5 / 35% (+ 4% per 100 AP)";
    const mistMove: Formula = { base: e.baseOf("Bonus Movement Speed") / 100, ratios: { AP: e.quoted(mistMoveWords, 5) / 100 / 100 } };
    const mistRest = e.quoted("preventing Viego from regaining it for 1 second", 0);
    e.quote("Harrowed Path can be cast during any of Viego's abilities.");
    // 26.21: the movement speed comes with the camouflage, and both break and return together.
    e.quote("While the camouflage is active, he also gains bonus movement speed");
    kit.assume("Harrowed Path's mist runs straight along the duel's line from where Viego casts it (its spread around walls is left out), and its camouflage doesn't hide him at fighting range.");

    // Heartbreaker: displacement immunity over a 0.5 s cast, a blink of up to 500, then a strike within 300: 20% (+ 5% per 100 bonus AD) of missing health plus 120% AD (increased by critical strikes), a 99% slow for 0.25 s and on-hit effects.
    const heartbreak = r.formula("Physical Damage");
    const heartbreakAD = r.quoted("All targets hit are dealt 120% AD physical damage, increased by critical strike damage (based on critical strike chance).", 0) / 100;
    const slowWords = "dealing physical damage, slowing them by 99% for 0.25 seconds, and applying on-hit effects";
    r.quote("Viego gains displacement immunity over the cast time, then blinks to the target location.");
    r.quote("Heartbreaker's strike to the champion can be dodged and blocked, but not missed.");
    const heartbreakReach = r.field("targetRange") + r.field("effectRadius");

    const marked = (enemy: Unit, self: Unit) => enemy.statuses.some((s) => s.kind === "mark" && s.key === MARK && s.source === self.side);
    // The second strike: an attack of its own that applies on-hit effects.
    const secondStrike = (ctx: HookContext) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === MARK && s.source === ctx.self.side));
      attackHit(ctx.world, ctx.self, ctx.enemy, false, [], undefined, false, { baseDamage: { damageType: "physical", amount: strike, canCrit: true, label: strikeLabel }, critMultiplier: strikeCrit, attackTag: SECOND });
    };
    const inMist = (unit: Unit, tick: number) => {
      if (tick >= Number(unit.memory["viego:mistUntil"] ?? -1)) return false;
      const from = Number(unit.memory["viego:mistFrom"]);
      const to = Number(unit.memory["viego:mistTo"]);
      return unit.x >= Math.min(from, to) - 1e-6 && unit.x <= Math.max(from, to) + 1e-6;
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: baseCast,
      castTimeFor: (unit) => (windupShare / 100) * windupSeconds(unit),
      delivery: { kind: "line", range: thrustRange, width: q.field("width") },
      onHit: [{ type: "damage", damageType: "physical", amount: thrust, canCrit: true }, { type: "mark", key: MARK, duration: markSeconds }],
      flags: { projectile: false, spellShield: true },
      roles: ["damage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: fullCharge,
      castTimeFor: (unit) => Number(unit.memory["viego:charge"] ?? fullCharge),
      moveWhileCasting: true,
      delivery: { kind: "line", range: seriesAt(reachSeries, fullCharge, true), width: w.field("width"), speed: blastSpeed },
      onSelf: [{ type: "resetAttack" }],
      onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }, { type: "cc", cc: "stun", duration: seriesAt(stunSeries, fullCharge, true) }, { type: "mark", key: MARK, duration: markSeconds }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true,
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      onCastStart: [{ type: "state", state: "displacementImmune", duration: r.castTime() }],
      delivery: { kind: "blink", direction: "toward", distance: r.field("targetRange"), hitRadius: r.field("effectRadius") },
      onHit: [
        { type: "damage", damageType: "physical", amount: heartbreak, label: r.name },
        { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: heartbreakAD } }, canCrit: true, label: r.name },
        { type: "cc", cc: "slow", strength: r.quoted(slowWords, 0) / 100, duration: r.quoted(slowWords, 1) },
      ],
      flags: { spellShield: true, dodge: true, block: true, appliesOnHit: true, grounded: true },
      roles: ["damage", "finisher"],
      decisive: true,
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      const gap = Math.abs(enemy.x - self.x);
      if (view.mode !== "idle" && view.mode !== "flee") {
        // The mist first, toward the enemy: its attack speed lasts the fight.
        if (canCast(world, self, eSpec) && gap <= mistReach && !inMist(self, world.tick)) return { kind: "cast", ability: "E" };
        // Heartbreaker once the enemy has lost half its health.
        if (canCast(world, self, rSpec) && gap - enemy.spec.base.radius <= heartbreakReach && enemy.hp <= 0.5 * derive(enemy).maxHp) return { kind: "cast", ability: "R" };
      }
      // Spectral Maw is charged just long enough to reach the enemy: a longer charge is a slower blast to sidestep.
      if (!(self.action?.kind === "cast" && self.action.ability === "W")) {
        let seconds = 0;
        while (seconds < fullCharge && seriesAt(reachSeries, seconds, true) < gap + 30) seconds += 1 / 30;
        self.memory["viego:charge"] = Math.min(fullCharge, seconds);
      }
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      attack: { onHit: [ruinHit] },
      behavior,
      hooks: {
        onCastStart(ctx) {
          ctx.memory["viego:acted"] = ctx.tick;
          if (ctx.ability.key === "W") ctx.buff("viego:charging", "moveSpeedPercent", -chargeSlow, Number(ctx.memory["viego:charge"] ?? fullCharge));
        },
        onAttack(ctx) {
          ctx.memory["viego:acted"] = ctx.tick;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            ctx.buff("viego:charging", "moveSpeedPercent", 0, 0);
            // The dash after the blast, a fixed distance in its direction.
            const dir = directionTo(ctx.self, ctx.enemy);
            const duration = Math.max(1, ticks(dashDistance / dashSpeed));
            ctx.self.action = { kind: "dash", ability: "W", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: (dir * dashDistance) / duration, stopAtContact: false, unstoppable: false, through: true };
          }
          if (key === "E") {
            const dir = directionTo(ctx.self, ctx.enemy);
            ctx.memory["viego:mistFrom"] = ctx.self.x;
            ctx.memory["viego:mistTo"] = ctx.self.x + dir * mistReach;
            ctx.memory["viego:mistUntil"] = ctx.tick + ticks(mistSeconds);
          }
        },
        onAbilityContact(ctx) {
          // Spectral Maw's stun grows with the charge.
          if (ctx.ability.key !== "W") return undefined;
          const charge = Number(ctx.memory["viego:charge"] ?? fullCharge);
          return ctx.effects.map((effect) => (effect.type === "cc" && effect.cc === "stun" ? { ...effect, duration: seriesAt(stunSeries, charge, true) } : effect));
        },
        onAbilityHit(ctx) {
          // Heartbreaker strikes like an attack: it consumes the mark.
          if (ctx.ability.key === "R" && ctx.enemy.petId === undefined && marked(ctx.enemy, ctx.self)) secondStrike(ctx);
        },
        onAttackHit(ctx) {
          if (ctx.blocked || ctx.enemy.petId !== undefined || ctx.attack.attackTag === SECOND) return;
          if (marked(ctx.enemy, ctx.self)) secondStrike(ctx);
        },
        onDamageDealt(ctx) {
          if (ctx.ability === strikeLabel && ctx.mitigated > 0) ctx.apply({ type: "heal", amount: { base: strikeHeal * ctx.mitigated } }, true);
        },
        onTick(ctx) {
          const self = ctx.self;
          const mist = inMist(self, ctx.tick);
          const rested = ctx.tick >= Number(ctx.memory["viego:acted"] ?? -1e9) + ticks(mistRest);
          ctx.buff("viego:mistSpeed", "attackSpeed", mist ? mistSpeed : 0, FOREVER);
          ctx.buff("viego:mistMove", "moveSpeedPercent", mist && rested ? evaluate(mistMove, self) : 0, FOREVER);
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const marks = haste / qSpec.cooldown + haste / wSpec.cooldown;
          const d = derive(self);
          return { physical: marks * (evaluate(strike, self, target) * (1 + d.critChance * (strikeCrit - 1)) + Math.max(evaluate(ruin, self, target), ruinLeast)) };
        },
        healing(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const d = derive(self);
          return strikeHeal * (haste / qSpec.cooldown + haste / wSpec.cooldown) * evaluate(strike, self, target) * (1 + d.critChance * (strikeCrit - 1));
        },
      },
    };
  },
};

export default viego;
