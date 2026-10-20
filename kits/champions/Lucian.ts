/** Lucian, with independently launched Lightslinger attacks and Culling projectiles. */
import type { KitModule } from "../../engine/kits/compile";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { averageCritFactor } from "../../engine/rules/defense";
import { canCast, inAttackRange, inReach, launchBonusAttack, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canTarget, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Action, AttackHitOptions, Pet, Unit } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const LIGHT = "lucian:lightslinger";
const VIGILANCE = "lucian:vigilance";
const BLAZE = "lucian:blaze";
type PendingShot = { due: number; pet?: number };
function channel(action: Action | undefined): Extract<Action, { kind: "channel" }> | undefined {
  if (action?.kind === "channel" && action.ability === "R") return action;
  if (action?.kind === "dash") return channel(action.resume);
  return undefined;
}

const lucian: KitModule = {
  champion: "Lucian",
  build(kit) {
    const p = kit.ability("Lightslinger"), q = kit.ability("Piercing Light"), w = kit.ability("Ardent Blaze"), e = kit.ability("Relentless Pursuit"), r = kit.ability("The Culling");
    const lightWindow = p.quoted("next basic attack within 3.5 seconds"), lightDelay = p.quoted("after 0.25 seconds"), retargetRange = p.quoted("within 50 units beyond his basic attack range");
    p.quote("The second shot applies life steal and on-hit effects, triggers on-attack effects, and is affected by critical strike modifiers");
    p.quote("The second attack separately rolls a critical strike");
    p.quote("Lightslinger is triggered and consumed by the first attack");
    const passiveObject = "Characters/Lucian/Spells/LucianPassiveAbility/LucianPassive";
    const lightBase = p.gameQuoted("mSpell.mSpellCalculations.TotalDamage.mFormulaParts[0].mSubpart.mLevel1Value: 0.5", 1, passiveObject);
    const light7 = p.gameQuoted('mSpell.mSpellCalculations.TotalDamage.breakpoint {"mLevel":7,"mAdditionalBonusAtThisLevel":0.05000000074505806}', 1, passiveObject);
    const light13 = p.gameQuoted('mSpell.mSpellCalculations.TotalDamage.breakpoint {"mLevel":13,"mAdditionalBonusAtThisLevel":0.05000000074505806}', 1, passiveObject);
    const light19 = p.gameQuoted('mSpell.mSpellCalculations.TotalDamage.breakpoint {"mLevel":19,"mAdditionalBonusAtThisLevel":0.10000000149011612}', 1, passiveObject);
    // Source floats describe decimal game ratios; remove serialization noise, not a level breakpoint.
    const lightRatio = Number((lightBase + light7 + light13 + light19).toFixed(6));
    const lightSpeed = p.gameQuoted("mSpell.mMissileSpec.movementComponent.mSpeed: 2800.0");
    const vigilanceRange = p.quoted("enemy champion within 1000 units is immobilized"), vigilanceDuration = p.quoted("his next two shots within 6 seconds", 0);
    // The source spells out two shots; the numeric value in this phrase is its duration.
    const vigilanceCount = 2, vigilanceMax = p.quoted("up to 4 empowered shots");
    p.quote("Whenever Lucian is healed or shielded by an ally");
    const vigilanceDamage = { base: p.quoted("deal 5 (+ 15% AD) bonus magic damage on-hit", 0), ratios: { AD: p.quoted("deal 5 (+ 15% AD) bonus magic damage on-hit", 1) / 100 } };
    const qDamage = q.formula("Physical Damage"), qTargetRange = q.field("targetRange"), beamRange = q.field("range");
    q.quote("does not adjust further during the cast time");
    const wDamage = w.formula("Magic Damage"), blazeSeconds = w.quoted("marked for 6 seconds"), moveSeconds = w.quoted("bonus movement speed for 1 second"), moveBonus = w.number("Bonus Movement Speed");
    w.quote("explodes in a cross pattern upon hitting an enemy or reaching maximum range");
    w.quote("Spell shield will not prevent the mark");
    w.quote("DoTs will proc Ardent Blaze only once");
    const eRefund = e.quoted("reduced by 1 second"), championRefund = e.quoted("doubled to 2 seconds against enemy champions");
    const [eMin, eMax] = e.fieldNumbers("targetRange"), eSpeed = e.field("speed");
    if (eMin === undefined || eMax === undefined) throw new Error("Lucian: missing dash distance bounds");
    e.quote("Relentless Pursuit resets Lucian's basic attack timer");
    e.quote("Relentless Pursuit can be cast during W cast time and during R channel");
    e.quote("Relentless Pursuit's dash can go through terrain, but will not be extended further if the target location is within terrain");
    const rDamage = r.formula("Physical Damage Per Shot"), rMinionDamage = r.formula("Minion Damage Per Shot");
    const duration = r.quoted("channels for up to 3 seconds"), recastDelay = r.quoted("recast after 0.75 seconds"), gunOffset = r.quoted("offset of 35 units to the front");
    r.quote("Relentless Pursuit is usable. Piercing Light and Ardent Blaze are disabled");
    r.quote("Spell shield only blocks one instance of damage");
    r.quote("calculated when the bullet reaches a target");
    if (r.textField("cooldownStart") !== "post-effect") throw new Error("Lucian: Culling cooldown must start after its effect");
    const rCountBase = r.gameQuoted("mSpell.DataValues.NumShots.values: [22.0,22.0,22.0,22.0,22.0,22.0,22.0]");
    const critValueMod = r.gameQuoted("mSpell.DataValues.CritValueMod.values: [1.0,1.0,1.0,1.0,1.0,1.0,1.0]");
    r.gameQuote('"mPart1":{"mStat":8,"mDataValue":"CritValueMod","__type":"StatByNamedDataValueCalculationPart"},"mPart2":{"mSubparts":[{"mStat":9,"mCoefficient":1.0,"__type":"StatByCoefficientCalculationPart"},{"mNumber":-1.0,"__type":"NumberCalculationPart"}]');
    const rRange = r.field("range", "Individual missile range"), rWidth = r.field("width"), rSpeed = r.field("speed");
    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown();
    const shotCount = (unit: Unit) => { const d = derive(unit); return Math.max(1, Math.floor(rCountBase * (1 + d.critChance * critValueMod * (d.critDamage - 1)) + 1e-6)); };

    kit.assume("Lightslinger's level-20 secondary attack uses 70% AD: the exact pinned game calculation adds a level-19 10% breakpoint omitted by the wiki's level-1/7/13-only 50/55/60% description. The second attack has its own declaration-time critical expectation, full on-hit packet and life steal, and launches 0.25 seconds after the first attack launches. The source's on-attack wording does not unambiguously distinguish windup declaration from projectile launch. Cancelling the first windup consumes that empowerment without launching the second shot.");
    kit.assume("Lightslinger prefers its original living target; if that target dies or becomes untargetable before the second launch, it selects the champion first and then a health-based enemy summon within 50 units beyond attack range. This follows the pinned retarget priority; only the documented retarget case may acquire an invisible champion. In-flight shots retain independent target and cooldown-refund tags.");
    kit.assume("Vigilance starts empty and gains two charges from an accepted nearby enemy-champion immobilization. Ally healing/shielding and allied Ardent Blaze triggers are absent in a one-enemy duel. Empowered shots spend their charge when declared, including attacks that subsequently miss; this consumption timing is not specified by the source. Damage from fully absorbed connected packets still triggers Ardent Blaze's movement buff.");
    kit.assume("Piercing Light requires the enemy champion within its 500-unit edge target range, then uses the declared direction for its 1000-unit laser and ordinary skillshot dodge model. It also damages enemy health-based summons on that segment. Initial targeting of a summon to extend the beam onto a farther champion and early cast cancellation when the initial target dies are not modeled.");
    kit.assume("Ardent Blaze resolves its first colliding target and applies the six-second mark even through a spell shield, preserving damage guards. The pinned wiki and game files omit the cross explosion's arm lengths and widths, so secondary cross contacts and range-end splash beyond the known missile corridor are not invented. Ordinary map sight is not simulated. A new W mark is applied after its own damage and therefore does not proc its movement buff without a subsequent connected damaging packet.");
    kit.assume("The Culling snapshots its discrete shot count as floor(22 × [1 + critical chance × (critical damage − 1)]), using the pinned game calculation rather than the wiki's rounded 22.222 critical-damage template. Current default 200% critical damage gives 22–44 shots. Shots are evenly scheduled by cumulative tick rounding across three seconds, with the first at one interval and the last at channel completion; the source does not give the first-shot phase. Each missile travels independently from the moving caster's 35-unit forward gun offset along the original direction; lateral alternating gun offsets are omitted in one dimension.");
    kit.assume("Culling's per-projectile sideways avoidance uses the shared hit model with that bullet's launch as its visible origin. The one-axis arena cannot retain a rival's lateral sidestep between bullets. Enemy health-based summons use the sourced doubled minion packet; hit-count props are excluded. Root leaves the mobile channel running; cast-inhibiting CC interrupts it, and E retains the original channel's absolute clock. Threat perception includes emitted bullets and an initial one-bullet estimate, but does not forecast bullets that have not launched.");
    kit.assume("Relentless Pursuit crosses a wall when its requested endpoint is clear. When the endpoint intersects a one-dimensional terrain interval expanded by Lucian's pathing radius, it clips to the near edge rather than extending through that wall. This models the pinned no-extension exception without claiming exact two-dimensional wall placement.");
    kit.assume("The policy spends a primed Lightslinger attack before another ordinary offensive spell, dashes between attacks when an attack reset is useful, and preserves the default defensive response. The budget values one secondary attack per successfully woven ability, bounded by attack speed, plus one complete Culling per its cooldown and channel duration; it does not assume allied Vigilance or guarantee Culling occupancy.");

    const blaze = (target: Unit, side: number, tick: number) => target.statuses.some((s) => s.kind === "mark" && s.key === BLAZE && s.source === side && s.endTick > tick);
    const vigilancePacket = (ctx: HookContext): Effect[] => {
      const count = ctx.tick < Number(ctx.memory[`${VIGILANCE}:until`] ?? -1) ? Number(ctx.memory[VIGILANCE] ?? 0) : 0;
      if (count <= 0) return [];
      ctx.memory[VIGILANCE] = count - 1;
      return [{ type: "damage", damageType: "magic", amount: vigilanceDamage, noLifeSteal: true, label: "Vigilance" }];
    };
    const refundDash = (ctx: HookContext & { attack: AttackHitOptions; blocked: boolean }) => {
      if (ctx.attack.attackTag === LIGHT) ctx.apply({ type: "refund", ability: "E", seconds: ctx.enemy.petId === undefined ? championRefund : eRefund }, true);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime(), castDirection: "start", overlay: true,
        delivery: { kind: "line", range: beamRange, width: q.field("width") }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: false, spellShield: true, petContactHooks: true },
        usable: (unit, world) => !channel(unit.action) && Math.abs(unit.x - world.units[unit.side === 0 ? 1 : 0].x) <= qTargetRange + unit.spec.base.radius + world.units[unit.side === 0 ? 1 : 0].spec.base.radius + 1e-6 },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: w.cost(), castTime: w.castTime(), overlay: true,
        delivery: { kind: "line", range: w.field("range"), width: w.field("width"), speed: w.field("speed"), collisionPet: true },
        onHit: [{ type: "damage", damageType: "magic", amount: wDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: (unit) => !channel(unit.action) },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), overlay: true, overlayChannels: ["R"],
        delivery: { kind: "dash", direction: "away", distance: eMax, minDistance: eMin, speed: eSpeed, crossTerrain: true },
        onSelf: [{ type: "resetAttack" }], flags: { grounded: true, knockdown: true }, roles: ["escape", "buff"], usable: (unit) => !(unit.action?.kind === "cast" && unit.action.ability === "Q") },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cooldownAfter: "channel", cost: r.cost(), castTime: r.castTime(), overlay: true,
        delivery: { kind: "self" }, channel: { duration, interruptible: true, mobile: true, cancelAfter: recastDelay }, flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage"], estimate: (self, target) => evaluate(rDamage, self, target),
        estimateDelay: (self, target) => Math.ceil(ticks(duration) / shotCount(self)) / 30 + Math.max(0, Math.abs(target.x - self.x) - gunOffset - target.spec.base.radius) / rSpeed,
        usable: (unit) => !channel(unit.action) },
      { key: "Rend", name: `${r.name} (end)`, slot: "R", cooldown: 0, castTime: 0, delivery: { kind: "self" }, chain: { root: "R", index: 2, window: duration, delay: recastDelay }, usable: (unit) => channel(unit.action) !== undefined },
    ];
    const [beam, blazeSpell, dash, culling] = abilities as [AbilitySpec, AbilitySpec, AbilitySpec, AbilitySpec];
    const bullet: AbilitySpec = { key: "Rbullet", name: r.name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "line", range: rRange, width: rWidth, speed: rSpeed, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage, persistent: true }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: () => false, roles: [] };
    abilities.push(bullet);
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && (command.ability === "E" || command.dodge !== undefined)) return command;
      if (view.mode !== "fight" && view.mode !== "trade") return command;
      if (!view.self.action && view.world.tick < Number(view.self.memory[`${LIGHT}:until`] ?? -1) && inAttackRange(view.self, view.enemy) && canTarget(view.enemy, view.self)) {
        if (view.self.attackReadyTick <= view.world.tick) return { kind: "attack" };
        if (canCast(view.world, view.self, dash)) return { kind: "cast", ability: "E", aim: { direction: view.distance + eMin <= view.self.spec.attack.range ? -1 : 1, distance: eMin } };
      }
      if (command?.kind === "cast" && command.ability === "R" && !inReach(bullet, view.self, view.enemy)) return { kind: "move", direction: 1 };
      return command;
    };
    return {
      abilities, attack: { onHitToPets: true }, behavior,
      budget: { damage(self, target) {
        const d = derive(self), haste = 1 + d.abilityHaste / 100;
        const rates = 1 / (qCooldown / haste + beam.castTime) + 1 / (wCooldown / haste + blazeSpell.castTime) + 1 / (eCooldown / haste + eMin / eSpeed) + 1 / (rCooldown / haste + duration);
        return { physical: Math.min(d.attackSpeed, rates) * d.ad * lightRatio * averageCritFactor(d.critChance, d.critDamage) + shotCount(self) * evaluate(rDamage, self, target) / (rCooldown / haste + duration) };
      } },
      hooks: {
        onCast(ctx) {
          ctx.memory[`blaze:cast:${ctx.ability.name}`] = Number(ctx.memory[`blaze:cast:${ctx.ability.name}`] ?? 0) + 1;
          if (["Q", "W", "E", "R"].includes(ctx.ability.key)) ctx.memory[`${LIGHT}:until`] = ctx.tick + ticks(lightWindow);
          if (ctx.ability.key === "Q") {
            const direction = Number(ctx.memory["castDirection:Q"] ?? directionTo(ctx.self, ctx.enemy));
            for (const pet of [...ctx.world.pets]) {
              if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints) continue;
              const forward = (pet.x - ctx.self.x) * direction;
              if (forward + pet.spec.radius >= -1e-6 && forward - pet.spec.radius <= beamRange + 1e-6) abilityHit(ctx.world, ctx.self, petFormulaTarget(pet, ctx.self, ctx.tick), ctx.ability, ctx.ability.onHit ?? []);
            }
          }
          if (ctx.ability.key === "R") {
            ctx.memory["culling:start"] = ctx.tick;
            ctx.memory["culling:count"] = shotCount(ctx.self);
            ctx.memory["culling:fired"] = 0;
            ctx.memory["culling:direction"] = ctx.self.facing ?? directionTo(ctx.self, ctx.enemy);
          }
        },
        onAttack(ctx) {
          ctx.action.onHit.push(...vigilancePacket(ctx));
          if (ctx.tick < Number(ctx.memory[`${LIGHT}:until`] ?? -1)) {
            ctx.memory[`${LIGHT}:until`] = -1;
            ctx.action.attackTag = LIGHT;
          }
        },
        onAttackLaunch(ctx) {
          if (ctx.action.attackTag !== LIGHT) return;
          const pending = JSON.parse(String(ctx.memory[`${LIGHT}:pending`] ?? "[]")) as PendingShot[];
          pending.push({ due: ctx.tick + ticks(lightDelay), ...(ctx.targetPet ? { pet: ctx.targetPet.id } : {}) });
          ctx.memory[`${LIGHT}:pending`] = JSON.stringify(pending);
        },
        onAttackHit: refundDash,
        onAttackPetHit: refundDash,
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && ctx.defense === "spellShield") ctx.apply({ type: "mark", key: BLAZE, duration: blazeSeconds });
          if (ctx.ability.key === "Rbullet" && ctx.enemy.petId !== undefined) return [{ type: "damage", damageType: "physical", amount: rMinionDamage, persistent: true }];
        },
        onAbilityHit(ctx) { if (ctx.ability.key === "W") ctx.apply({ type: "mark", key: BLAZE, duration: blazeSeconds }); },
        onDamageDealt(ctx) {
          if (ctx.mitigated > 0 && blaze(ctx.enemy, ctx.self.side, ctx.tick)) {
            if (ctx.persistent) {
              const key = `blaze:persistent:${ctx.enemy.petId ?? "champion"}:${ctx.ability ?? "unknown"}`;
              const serial = Number(ctx.memory[`blaze:cast:${ctx.ability ?? "unknown"}`] ?? 0);
              if (ctx.memory[key] === serial) return;
              ctx.memory[key] = serial;
            }
            ctx.buff(BLAZE, "moveSpeedFlat", moveBonus, moveSeconds);
          }
        },
        onEnemyCCApplied(ctx) {
          if (!IMMOBILIZING.has(ctx.cc) || Math.abs(ctx.enemy.x - ctx.self.x) > vigilanceRange + 1e-6) return;
          const existing = ctx.tick < Number(ctx.memory[`${VIGILANCE}:until`] ?? -1) ? Number(ctx.memory[VIGILANCE] ?? 0) : 0;
          ctx.memory[VIGILANCE] = Math.min(vigilanceMax, existing + vigilanceCount);
          ctx.memory[`${VIGILANCE}:until`] = ctx.tick + ticks(vigilanceDuration);
        },
        onTick(ctx) {
          const pending = JSON.parse(String(ctx.memory[`${LIGHT}:pending`] ?? "[]")) as PendingShot[];
          const ready = pending.filter((s) => ctx.tick >= s.due), keep = pending.filter((s) => ctx.tick < s.due);
          if (ready.length) ctx.memory[`${LIGHT}:pending`] = JSON.stringify(keep);
          for (const shot of ready) {
            let target: Unit | Pet | undefined = shot.pet === undefined ? ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) ? ctx.enemy : undefined : ctx.world.pets.find((p) => p.id === shot.pet && p.hp > 0 && !p.spec.untargetable && !isUntargetable(petFormulaTarget(p, ctx.self, ctx.tick), ctx.self));
            if (!target) {
              const reach = ctx.self.spec.attack.range + retargetRange + ctx.self.spec.base.radius;
              if (ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= reach + ctx.enemy.spec.base.radius + 1e-6) target = ctx.enemy;
              else target = ctx.world.pets.filter((p) => p.owner !== ctx.self.side && p.hp > 0 && !p.spec.untargetable && !isUntargetable(petFormulaTarget(p, ctx.self, ctx.tick), ctx.self) && Math.abs(p.x - ctx.self.x) <= reach + p.spec.radius + 1e-6).sort((a, b) => a.hp - b.hp || a.id - b.id)[0];
            }
            if (target) launchBonusAttack(ctx.world, ctx.self, target, { baseDamageScale: "owner" in target ? 1 : lightRatio, critChance: derive(ctx.self).critChance, missileSpeed: lightSpeed, attackTag: LIGHT }, vigilancePacket(ctx));
          }
          const action = channel(ctx.self.action);
          if (!action) return;
          const start = Number(ctx.memory["culling:start"]), count = Number(ctx.memory["culling:count"]), direction = Number(ctx.memory["culling:direction"]) as 1 | -1;
          ctx.self.facing = direction;
          let fired = Number(ctx.memory["culling:fired"] ?? 0);
          while (fired < count && ctx.tick >= start + Math.ceil((fired + 1) * ticks(duration) / count - 1e-9)) {
            fired += 1;
            const x = ctx.self.x + direction * gunOffset, forward = (ctx.enemy.x - x) * direction;
            const seconds = Math.max(0, Math.abs(ctx.enemy.x - x) - ctx.enemy.spec.base.radius) / rSpeed;
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, seconds, rWidth / 2);
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rbullet", seenTick: ctx.tick, x, perTick: rSpeed / 30, homing: false, direction, travelLeft: rRange, projectile: true, connects: forward >= -ctx.enemy.spec.base.radius && chance > .02, scale: chance >= .98 ? 1 : chance, onHit: bullet.onHit ?? [], collisionPet: true });
          }
          ctx.memory["culling:fired"] = fired;
        },
      },
    };
  },
};
export default lucian;
