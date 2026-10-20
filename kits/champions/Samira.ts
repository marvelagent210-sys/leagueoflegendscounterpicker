/** Samira: actual alternating Style contacts, sword packets and independently defended shots. */
import type { AbilityData } from "../../engine/kits/context";
import type { KitModule } from "../../engine/kits/compile";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { averageCritFactor } from "../../engine/rules/defense";
import { EPSILON, attackRange, canCast, inAttackRange, startAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { clearChannel } from "../../engine/sim/channelState";
import { abilityHit, abilityHitPet, canSee, directionTo, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Action, Pet, Unit } from "../../engine/sim/state";
import { extraAttacks, flat, missingShare, ticks } from "./util";

const STYLE = "samira:style", WHIRL = "samira:whirl", JUGGLE = "samira:juggle";
const id = (u: Unit) => u.petId === undefined ? `champion:${u.side}` : `pet:${u.petId}`;
function channel(action: Action | undefined): Extract<Action, { kind: "channel" }> | undefined {
  if (action?.kind === "channel" && action.ability === "R") return action;
  return action?.kind === "dash" ? channel(action.resume) : undefined;
}
function game(ability: AbilityData, object: string, field: string): unknown {
  const source = ability.record.gameSources?.find((s) => s.object === object);
  const text = source?.text.find((s) => s.startsWith(`mSpell.${field}: `));
  if (!text) throw new Error(`Samira: missing pinned ${object} ${field}`);
  ability.gameQuote(text, object);
  return JSON.parse(text.slice(text.indexOf(":") + 1));
}

const samira: KitModule = {
  champion: "Samira",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const styleSeconds = p.quoted("a stack of Style for 6 seconds"), maxStyle = p.quoted("stacking up to 6 times"), styleMS = p.levelValue("For each stack") / 100;
    const swordRange = p.quoted("targets within 200 units"), wikiSwordBase = p.levelValue("Blade attacks, Blade Whirl, Wild Rush"), wikiSwordRatio = p.levelValue("Blade attacks, Blade Whirl, Wild Rush", 1) / 100;
    p.quote("increased by 0 / 5 / 10 / 15 / 20 / 25 / 30 / 35 / 40 / 45 / 50 / 55 / 60 / 65 / 70 / 75 / 80 / 85 / 90 / 95 / 100");
    p.quote("applies after the primary damage of the attack and is not an on-hit effect");
    p.quote("Abilities blocked by spell shields will still grant Samira Style stacks");
    p.quote("Style stacks can be generated via clones");
    p.quote("Gun and blade attacks do not count as different");
    const juggleCount = p.quoted("fire 6 bolts"), juggleSeconds = p.quoted("6 bolts over 0.5 seconds", 1), juggleRatio = p.quoted("each dealing 17% AD") / 100, juggleInterval = Number(p.tip("6 bolts over 0.5 seconds").match(/every ([\d.]+) seconds/)?.[1]);
    const juggleCD = p.field("targetCooldown"), juggleRange = p.field("targetRange"), juggleSpeed = p.field("speed", "bolt"), juggleDashSpeed = p.field("speed", "dash");
    p.quote("applies on-hit effects only once"); p.quote("cannot be used against a target with a spell shield"); p.quote("will not trigger against crowd control immune and displacement immune targets"); p.quote("will not apply the knock up against suspended enemies");
    if (!Number.isFinite(juggleInterval)) throw new Error("Samira: missing first/next bolt clock");
    const passiveCalc = game(p, "Characters/Samira/Spells/SamiraPassiveCombo", "mSpellCalculations") as { BonusMeleeDamage: { mFormulaParts: Array<{ mCoefficient?: number; mLevel1Value?: number; mInitialBonusPerLevel?: number }> } };
    const swordParts = passiveCalc.BonusMeleeDamage.mFormulaParts;
    const clientSwordBase = swordParts[1]!.mLevel1Value! + 19 * swordParts[1]!.mInitialBonusPerLevel!, clientSwordRatio = Math.round(swordParts[0]!.mCoefficient! * 1e6) / 1e6;
    const swordBase = wikiSwordBase, swordRatio = wikiSwordRatio;
    const basic = game(p, "Characters/Samira/Spells/SamiraBasicAttack", "mMissileSpec") as { movementComponent: { mSpeed: number } };
    const juggleWindup = Number(game(p, "Characters/Samira/Spells/SamiraPJuggle", "mCastTime"));
    const qDamage = q.formula("Physical Damage"), qGunRange = q.field("range", "Shot"), qSwordRange = q.field("range", "Cone"), qSwitch = q.field("targetRange"), qSpeed = q.field("speed"), qWidth = q.field("width", "Shot");
    q.quote("life steal at 100% effectiveness"); q.quote("Only the shot will be destroyed by projectile-intercepting effects"); q.quote("shot and the slash do not count as different abilities"); q.quote("detonate upon the end of the dash");
    const qValues = game(q, "Characters/Samira/Spells/SamiraQAbility/SamiraQ", "DataValues") as Array<{ name: string; values: number[] }>;
    const qCrit = qValues.find((v) => v.name === "CritDamageMod")!.values[0]!;
    game(q, "Characters/Samira/Spells/SamiraQAbility/SamiraQ", "mSpellCalculations");
    const whirlSeconds = w.quoted("over 0.75 seconds"), whirlRadius = w.field("effectRadius"), whirlDamage = w.formula("Physical Damage per Hit");
    w.quote("All effects begin immediately and Samira can move throughout"); w.quote("Spell shield will block the damage from one slash"); w.quote("Entering stasis will also end Blade Whirl early"); w.quote("effect ending early includes the second slash not being performed");
    const rushRange = e.field("targetRange"), rushDistance = e.field("range", "Fixed dash"), rushWidth = e.field("width"), rushSpeed = e.field("speed"), rushDamage = e.formula("Magic Damage"), rushAS = e.fraction("Bonus Attack Speed"), rushSeconds = e.quoted("attack speed for 5 seconds");
    e.quote("within 3 seconds of damaging them resets Wild Rush's cooldown"); e.quote("Flair and Inferno Trigger can be cast during the dash");
    const rSeconds = r.quoted("torrent of shots for 2.277"), rFiring = r.quoted("over 2.013"), rCount = r.quoted("up to 10 times per enemy"), rSlow = r.quoted("movement speed by 30%") / 100, rRadius = r.field("effectRadius"), rDamage = r.formula("Physical Damage Per Shot"), rMinion = r.formula("Minion Damage Per Shot"), rCooldown = r.field("staticCooldown");
    r.quote("Style stacks are consumed at the end of the effect"); r.quote("targets do not have to be visible to be shot at"); r.quote("as well as disarm"); r.quote("Spell shield will block the damage of one shot"); r.quote("life steal at 100% effectiveness");
    r.quote("A nearby visible enemy is required to cast this ability");
    const rMissile = game(r, "Characters/Samira/Spells/SamiraRAbility/SamiraRMissile", "mMissileSpec") as { movementComponent: { mSpeed: number } };
    const ownRadius = kit.champion.forms[0]!.stats.gameplayRadius;
    const style = (unit: Unit, tick: number) => tick < Number(unit.memory[`${STYLE}:until`] ?? -1) ? Number(unit.memory[STYLE] ?? 0) : 0;
    const whirl = (unit: Unit, tick: number) => tick < Number(unit.memory[WHIRL] ?? -1);
    const eligibleJuggle = (self: Unit, target: Unit, tick: number) => target.alive && !isUntargetable(target, self) && !hasState(target, "spellShield") && !hasState(target, "ccImmune") && !hasState(target, "displacementImmune") && tick >= Number(self.memory[`${JUGGLE}:${id(target)}`] ?? -1) && [...ccTypes(target)].some((cc) => IMMOBILIZING.has(cc) && cc !== "stasis");
    const sword = (self: Unit, target: Unit) => (swordBase + swordRatio * derive(self).ad) * (1 + missingShare(target));
    const gainStyle = (ctx: HookContext, key: string, share = 1) => {
      if ((ctx.enemy.petId !== undefined && ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.targetClass !== "champion") || channel(ctx.self.action)) return;
      const before = style(ctx.self, ctx.tick);
      ctx.memory[STYLE] = Math.min(maxStyle, before + (ctx.memory[`${STYLE}:previous`] !== key || before === 0 ? share : 0));
      ctx.memory[`${STYLE}:previous`] = key; ctx.memory[`${STYLE}:until`] = ctx.tick + ticks(styleSeconds);
      ctx.buff(STYLE, "moveSpeedPercent", Number(ctx.memory[STYLE]) * styleMS, styleSeconds);
    };
    const finishStyle = (ctx: HookContext) => { ctx.memory[STYLE] = 0; ctx.memory[`${STYLE}:until`] = -1; delete ctx.memory[`${STYLE}:previous`]; ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== `buff:${STYLE}` && s.memoKey !== "R:moveSpeedPercent"); };
    const endWhirl = (ctx: HookContext) => { ctx.memory[WHIRL] = -1; ctx.self.statuses = ctx.self.statuses.filter((s) => s.ability !== "W"); };
    const swordPacket = (): Effect => ({ type: "damage", damageType: "magic", amount: flat(0), amountFor: sword, noLifeSteal: true, label: p.name, petDamageCategory: "proc" });
    const qPacket: Effect[] = [{ type: "damage", damageType: "physical", amount: qDamage, canCrit: true, critMultiplier: 1 + qCrit }];
    const free = (unit: Unit, world: Parameters<NonNullable<AbilitySpec["usable"]>>[1]) => !whirl(unit, world.tick) && !channel(unit.action);
    const qSlash: AbilitySpec = { key: "Qslash", name: `${q.name} (blade)`, slot: "Q", cooldownKey: "Q", budgetExcluded: true, cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: "start", delivery: { kind: "area", near: 0, far: qSwordRange, delay: 0, anchor: "caster" }, onHit: qPacket, flags: { projectile: false, spellShield: true, petContactHooks: true }, usable: (u, world) => free(u, world) && Math.abs(u.x - world.units[1 - u.side]!.x) <= qSwitch + EPSILON, decisive: true };
    const qDash: AbilitySpec = { key: "Qdash", name: `${q.name} (dash explosives)`, slot: "Q", cooldownKey: "Q", budgetExcluded: true, cooldown: q.cooldown(), cost: q.cost(), castTime: 0, overlay: true, delivery: { kind: "self" }, usable: (u) => u.action?.kind === "dash" && u.action.ability === "E", roles: ["damage"], estimate: (self, target) => evaluate(qDamage, self, target), flags: { spellShield: true, petContactHooks: true } };
    const whirlHit: AbilitySpec = { key: "Wslash", name: w.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: whirlDamage }], flags: { spellShield: true, projectile: false, petContactHooks: true } };
    const rShot: AbilitySpec = { key: "Rshot", persistsAfterDeath: true, name: r.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage, canCrit: true, persistent: true }], flags: { projectile: true, spellShield: true, appliesLifeSteal: true, petContactHooks: true } };
    const passiveBolt: AbilitySpec = { key: "Pbolt", persistsAfterDeath: true, name: `${p.name} (additional bolt)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: juggleRatio } }, canCrit: true }], flags: { projectile: true, spellShield: false, parry: true, appliesLifeSteal: true, petContactHooks: true } };
    const abilities: AbilitySpec[] = [
      { key: "Q", persistsAfterDeath: true, name: q.name, slot: "Q", budgetExcluded: true, cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: "start", overlay: true, delivery: { kind: "line", range: qGunRange, width: qWidth, speed: qSpeed, collisionPet: true }, onHit: qPacket, flags: { projectile: true, spellShield: true, appliesLifeSteal: true, petContactHooks: true }, usable: (u, world) => free(u, world) && Math.abs(u.x - world.units[1 - u.side]!.x) > qSwitch + EPSILON, decisive: true },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: 0, moveWhileCasting: true, overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "projectileBlock", value: Math.max(0, whirlRadius - ownRadius), duration: whirlSeconds }, { type: "state", state: "noAttacks", duration: whirlSeconds }], usable: (u, world) => !whirl(u, world.tick) && !channel(u.action) && u.action?.kind !== "dash", roles: ["defense", "damage"], estimate: (self, target) => evaluate(whirlDamage, self, target) * 2 },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, overlayChannels: ["R"], delivery: { kind: "dash", direction: "toward", distance: rushDistance, minDistance: rushDistance, speed: rushSpeed, through: true, hitRadius: rushWidth / 2, hitCentered: true, crossTerrain: true }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: flat(rushAS), duration: rushSeconds }], onHit: [{ type: "damage", damageType: "magic", amount: rushDamage }], flags: { spellShield: true, projectile: false, petContactHooks: true }, usable: (u, world) => { const enemy = world.units[1 - u.side]!; return enemy.alive && enemy.hp > 0 && canSee(enemy, u) && !isUntargetable(enemy, u) && Math.abs(u.x - enemy.x) <= rushRange + EPSILON; }, roles: ["engage", "damage"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, staticCooldown: true, cost: 0, castTime: r.castTime(), overlay: true, delivery: { kind: "self" }, channel: { duration: rSeconds, interruptible: true, mobile: true }, onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: flat(-rSlow), duration: rSeconds }], roles: ["damage"], estimate: (self, target) => evaluate(rDamage, self, target) * averageCritFactor(derive(self).critChance, derive(self).critDamage), usable: (u, world) => {
        if (style(u, world.tick) < maxStyle - EPSILON || ccTypes(u).has("disarm")) return false;
        const rival = world.units[1 - u.side]!, visible = (target: Unit) => target.alive && target.hp > 0 && canSee(target, u) && !isUntargetable(target, u) && Math.abs(u.x - target.x) <= rRadius + EPSILON;
        return visible(rival) || world.pets.some((pet) => pet.owner !== u.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints && visible(petFormulaTarget(pet, u, world.tick)));
      } },
      qSlash, qDash, whirlHit, rShot, passiveBolt,
      { key: "Pdash", name: `${p.name} (immobilized-target dash)`, slot: "I", countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "dash", direction: "toward", distance: juggleRange, minDistance: 0, speed: juggleDashSpeed }, flags: { grounded: true, knockdown: true }, usable: (u, world) => eligibleJuggle(u, world.units[1 - u.side]!, world.tick) && !inAttackRange(u, world.units[1 - u.side]!) && Math.abs(u.x - world.units[1 - u.side]!.x) <= juggleRange + u.spec.base.radius + world.units[1 - u.side]!.spec.base.radius + EPSILON, roles: ["engage"] },
    ];
    const spin = (ctx: HookContext) => {
      if (Math.abs(ctx.enemy.x - ctx.self.x) <= whirlRadius + ctx.enemy.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, whirlHit, whirlHit.onHit!);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && Math.abs(pet.x - ctx.self.x) <= whirlRadius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, whirlHit, whirlHit.onHit!, "area");
    };
    const sweepPets = (ctx: HookContext) => {
      const from = Number(ctx.memory["samira:rushLast"] ?? ctx.self.x), to = ctx.self.x; ctx.memory["samira:rushLast"] = to;
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && ctx.memory[`samira:rushPet:${pet.id}`] !== ctx.memory["samira:rushSerial"] && pet.x + pet.spec.radius >= Math.min(from, to) - rushWidth / 2 - EPSILON && pet.x - pet.spec.radius <= Math.max(from, to) + rushWidth / 2 + EPSILON) {
        ctx.memory[`samira:rushPet:${pet.id}`] = ctx.memory["samira:rushSerial"]!; abilityHitPet(ctx.world, ctx.self, pet, abilities[2]!, abilities[2]!.onHit!, "area");
      }
    };
    const juggleKnock = (ctx: HookContext) => {
      const key = `${JUGGLE}:knock:${id(ctx.enemy)}`;
      if (ctx.memory[key] === ctx.memory[`${JUGGLE}:serial`] || !ccTypes(ctx.enemy).has("airborne") || ccTypes(ctx.enemy).has("suspension")) return;
      ctx.memory[key] = ctx.memory[`${JUGGLE}:serial`]!; ctx.apply({ type: "displace", direction: "away", distance: 0, duration: juggleSeconds });
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "fight" || view.mode === "trade") {
        if (canCast(view.world, view.self, abilities[3]!)) return { kind: "cast", ability: "R" };
        if (canCast(view.world, view.self, qDash)) return { kind: "cast", ability: "Qdash" };
        if (!view.self.action && inAttackRange(view.self, view.enemy) && view.self.attackReadyTick <= view.world.tick && view.self.memory[`${STYLE}:previous`] !== "attack" && !whirl(view.self, view.world.tick)) return { kind: "attack" };
        const pdash = abilities.at(-1)!;
        if (!view.self.action && canCast(view.world, view.self, pdash)) return { kind: "cast", ability: "Pdash", aim: { direction: 1, distance: Math.max(0, Math.abs(view.self.x - view.enemy.x) - attackRange(view.self, view.enemy) - view.self.spec.base.radius - view.enemy.spec.base.radius) } };
      }
      const command = defaultBehavior(view);
      // A single enemy must actually be close enough to take the offensive self aura.
      if (command?.kind === "cast" && command.ability === "W" && Math.abs(view.self.x - view.enemy.x) > whirlRadius + view.enemy.spec.base.radius + EPSILON && !view.threats.length) return { kind: "move", direction: 1 };
      return command;
    };
    kit.assume(`Daredevil Impulse starts at zero Style, earns one stack only when a different attack/Q/W/E contact hits a champion or source-classified champion clone, refreshes its six-second clock on repeats, and grants 21% movement speed at S. Spell-shielded damaging abilities still grant Style; parried or avoided packets and minion/unknown summons do not. Expected-value contacts at the branch cap gain their numeric share. Both W slashes share one identity but may each add Style when separated by another hit. R consumes all Style on completion or interruption.`);
    kit.assume(`At level 20 the pinned wiki explicitly projects the sword bonus to ${wikiSwordBase} + ${(wikiSwordRatio * 100).toFixed(6)}% AD; the versioned client tooltip calculation instead gives ${clientSwordBase} + ${clientSwordRatio * 100}% AD. This kit uses the wiki's explicit level 20 series, doubled linearly with missing-health share. This unresolved client/wiki coefficient conflict is retained as evidence. Sword bonus is separate noncritical default magic damage after its physical packet, grants no life steal, and applies to melee basics, Q blade/explosives, W and E. Blade selection uses 200 edge units and remains a ranged attack.`);
    kit.assume("The immobilized-target passive starts only when CC is already present, excludes spell shields, CC/displacement immunity and stasis, and has a ten-second per-target lockout beginning at declaration even if parried. Its fixed one-tick windup launches six 2800-speed homing bolts spaced 0.1 seconds; only the first is a basic with on-hits, the rest are separately critical default-damage spell packets without on-hits, each granting life steal. Airborne targets can receive one half-second knock-up if still airborne at a connected unblocked bolt. Ally CC, monsters, Blast Cones and full two-dimensional dash order reacquisition are absent; the optional passive dash approaches to normal attack range and respects root/ground/terrain.");
    kit.assume("Flair chooses shot or forward cone from the champion's 340 center-distance switch at declaration; the cone extends 400 along the one-dimensional facing axis. This substitutes declaration selection for the source's end-of-cast form check when an enemy changes distance during the quarter-second cast. Both forms share one cooldown and Style identity. Q critical scaling follows the pinned calculation 1+0.5×critChance×(critDamage−1); the gun is stopped by the first target or wall, the blade is not a projectile. Q during E is an instant queued explosive request that resolves once over the actual traveled dash segment at dash end, including interruption, rather than inventing an untraveled full trail. Two-dimensional cone angles and lateral explosives are not retained.");
    kit.assume("Blade Whirl begins immediately despite its nonrestrictive 0.1-second infobox cast time, permits movement and E, disables attacks/Q, destroys hostile projectiles within 325 center units for 0.75 seconds, and independently hits each real nearby target at start/end. R or stasis ends it early without the second hit. E sweeps one 650-unit dash at 1600 speed after requiring a champion within 600 center units; the fixed dash crosses intervening terrain only when its endpoint is legal. Actual summons swept by its 125-radius path receive independent guarded packets. Turret targeting, transverse path choices and multichampion takedown resets are absent.");
    kit.assume("Inferno Trigger is a mobile interruptible 2.277-second channel, with ten homing shots per actual in-range target scheduled uniformly by absolute cumulative rounding across the source's 2.013-second firing span, starting immediately. The source's sporadic 0.198/0.231 interval order is unspecified, so this is a declared tick-level approximation. Shots independently check 600 center range when emitted, need no target vision after activation, are stopped by walls and each spell shield consumes only one shot. Only source-classified minion summons receive the sourced 25% packet; champion clones and unknown classes retain full damage. E may overlay the original clock. Root does not interrupt R; silence/stun/disarm do. Already launched shots remain after interruption/death. The 30% penalty is additive movement-speed loss, not a resistible slow. R has a static five-second cooldown and no mana cost.");
    kit.assume("The policy weaves attacks between different damaging casts, uses Q during E, spends S on R and keeps ordinary defensive reactions. The budget explicitly values two W hits, full R per an illustrative alternating six-hit Style cycle (also bounded by five-second static cooldown plus channel), one close sword bonus per basic and E attack-speed uptime. It does not promise full R occupancy, item/rune on-attacks, allied knock-ups or initial free Style.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: basic.movementComponent.mSpeed, onHitToPets: true }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), h = 1 + d.abilityHaste / 100, crit = averageCritFactor(d.critChance, d.critDamage), qCritFactor = 1 + qCrit * d.critChance * (d.critDamage - 1), qCycle = abilities[0]!.cooldown / h + abilities[0]!.castTime, wCycle = abilities[1]!.cooldown / h, eCycle = abilities[2]!.cooldown / h, styleCycle = Math.max(rCooldown + rSeconds, 3 / Math.max(.01, d.attackSpeed) + 3 * qCycle); return { physical: evaluate(qDamage, self, target) * qCritFactor / qCycle + 2 * evaluate(whirlDamage, self, target) / wCycle + rCount * evaluate(rDamage, self, target) * crit / styleCycle + d.ad * crit * extraAttacks(self, rushAS) * Math.min(1, rushSeconds / eCycle), magic: sword(self, target) * (d.attackSpeed + 1 / qCycle + 2 / wCycle + 1 / eCycle) }; } },
      hooks: {
        onAttack(ctx) {
          if (eligibleJuggle(ctx.self, ctx.enemy, ctx.tick)) {
            ctx.action.uncancellable = true; ctx.action.launchTick = ctx.tick + ticks(juggleWindup); ctx.action.baseDamageScale = juggleRatio; ctx.action.missileSpeed = juggleSpeed; ctx.action.attackTag = `${JUGGLE}:first`; ctx.memory[`${JUGGLE}:${id(ctx.enemy)}`] = ctx.tick + ticks(juggleCD); ctx.memory[`${JUGGLE}:serial`] = Number(ctx.memory[`${JUGGLE}:serial`] ?? 0) + 1;
          } else if (Math.abs(ctx.self.x - ctx.enemy.x) - ctx.self.spec.base.radius - ctx.enemy.spec.base.radius <= swordRange + EPSILON) { ctx.action.missileSpeed = 0; ctx.action.attackTag = "samira:blade"; }
        },
        onAttackLaunch(ctx) {
          if (ctx.action.attackTag !== `${JUGGLE}:first`) return;
          ctx.memory[`${JUGGLE}:pending`] = JSON.stringify(Array.from({ length: juggleCount - 1 }, (_, i) => ({ tick: ctx.tick + ticks((i + 1) * juggleInterval), ...(ctx.targetPet ? { pet: ctx.targetPet.id } : {}), blinded: ctx.action.blinded })));
          ctx.self.attackReadyTick = ctx.tick; ctx.apply({ type: "state", state: "noAttacks", duration: juggleSeconds }, true);
        },
        onAttackHit(ctx) { if (!ctx.blocked) { gainStyle(ctx, "attack", ctx.scale); if (ctx.attack.attackTag === "samira:blade") ctx.apply(swordPacket()); if (ctx.attack.attackTag === `${JUGGLE}:first`) juggleKnock(ctx); } },
        onAttackPetHit(ctx) { if (!ctx.blocked) { gainStyle(ctx, "attack", ctx.scale); if (ctx.attack.attackTag === "samira:blade") ctx.apply(swordPacket()); if (ctx.attack.attackTag === `${JUGGLE}:first`) juggleKnock(ctx); } },
        onAbilityContact(ctx) {
          if (["Q", "Qslash", "Qexplosion", "Wslash", "E"].includes(ctx.ability.key) && ctx.defense !== "parry" && ctx.defense !== "dodge" && ctx.defense !== "block") gainStyle(ctx, ctx.ability.key.startsWith("Q") ? "Q" : ctx.ability.key === "Wslash" ? "W" : "E", ctx.scale);
          let effects = [...ctx.effects];
          if (["Qslash", "Qexplosion", "Wslash", "E"].includes(ctx.ability.key)) effects.push(swordPacket());
          if (["Q", "Qslash", "Qexplosion"].includes(ctx.ability.key)) effects = effects.map((effect) => effect.type === "damage" && effect.damageType === "physical" ? { ...effect, critMultiplier: 1 + qCrit * (derive(ctx.self).critDamage - 1), lifesteal: ctx.ability.key === "Q" ? undefined : derive(ctx.self).lifeSteal } : effect);
          if (ctx.ability.key === "Rshot" && ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.targetClass === "minion") effects = [{ type: "damage", damageType: "physical", amount: rMinion, canCrit: true, persistent: true }];
          return effects;
        },
        onAbilityHit(ctx) { if (ctx.ability.key === "Pbolt" && !hasState(ctx.enemy, "blockAttacks")) juggleKnock(ctx); },
        onCast(ctx) {
          if (ctx.ability.key === "W") { ctx.memory[WHIRL] = ctx.tick + ticks(whirlSeconds); spin(ctx); }
          if (ctx.ability.key === "E") { ctx.memory["samira:rushStart"] = ctx.self.x; ctx.memory["samira:rushLast"] = ctx.self.x; ctx.memory["samira:rushSerial"] = Number(ctx.memory["samira:rushSerial"] ?? 0) + 1; ctx.memory["samira:explosive"] = false; }
          if (ctx.ability.key === "Qdash") ctx.memory["samira:explosive"] = true;
          if (ctx.ability.key === "R") { endWhirl(ctx); ctx.memory["samira:rStart"] = ctx.tick; ctx.memory["samira:rFired"] = 0; ctx.memory["samira:rWasActive"] = true; }
        },
        onTick(ctx) {
          if (Number(ctx.memory[WHIRL] ?? -1) >= 0) {
            if (hasState(ctx.self, "stasis")) endWhirl(ctx);
            else if (ctx.tick >= Number(ctx.memory[WHIRL])) { spin(ctx); endWhirl(ctx); }
          }
          if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E") sweepPets(ctx);
          const stored = JSON.parse(String(ctx.memory[`${JUGGLE}:pending`] ?? "[]")) as Array<{ tick: number; pet?: number; blinded: boolean }>;
          if (stored.length) {
            const due = stored.filter((shot) => shot.tick <= ctx.tick); ctx.memory[`${JUGGLE}:pending`] = JSON.stringify(stored.filter((shot) => shot.tick > ctx.tick));
            for (const shot of due) {
              const pet = shot.pet === undefined ? undefined : ctx.world.pets.find((candidate) => candidate.id === shot.pet), target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.enemy;
              if ((shot.pet !== undefined && !pet) || !target.alive || isUntargetable(target, ctx.self) || shot.blinded) continue;
              ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Pbolt", seenTick: ctx.tick, x: ctx.self.x, perTick: juggleSpeed / 30, homing: true, direction: directionTo(ctx.self, target), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: passiveBolt.onHit!, ...(pet ? { pet: pet.id } : {}) });
            }
          }
          const active = channel(ctx.self.action);
          if (ctx.memory["samira:rWasActive"] && (!active || ctx.tick >= active.endTick)) { ctx.memory["samira:rWasActive"] = false; finishStyle(ctx); }
          if (!active) return;
          let fired = Number(ctx.memory["samira:rFired"] ?? 0); const start = Number(ctx.memory["samira:rStart"] ?? ctx.tick);
          while (fired < rCount && ctx.tick >= start + ticks(rFiring * fired / Math.max(1, rCount - 1))) {
            const targets: Array<{ unit: Unit; pet?: Pet }> = [{ unit: ctx.enemy }, ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ unit: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
            for (const { unit, pet } of targets) if (unit.alive && !isUntargetable(unit, ctx.self) && Math.abs(unit.x - ctx.self.x) <= rRadius + EPSILON) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rshot", seenTick: ctx.tick, x: ctx.self.x, perTick: rMissile.movementComponent.mSpeed / 30, homing: true, direction: directionTo(ctx.self, unit), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: rShot.onHit!, ...(pet ? { pet: pet.id } : {}) });
            fired++;
          }
          ctx.memory["samira:rFired"] = fired;
        },
        onCCApplied(ctx) { const active = channel(ctx.self.action); if (ctx.cc === "disarm" && active) { clearChannel(ctx.self, active); finishStyle(ctx); ctx.memory["samira:rWasActive"] = false; } if (ctx.cc === "stasis") endWhirl(ctx); },
        onLethal(ctx) { endWhirl(ctx); finishStyle(ctx); ctx.memory[`${JUGGLE}:pending`] = "[]"; return false; },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") { finishStyle(ctx); ctx.memory["samira:rWasActive"] = false; } },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Pdash") { if (eligibleJuggle(ctx.self, ctx.enemy, ctx.tick) && inAttackRange(ctx.self, ctx.enemy)) startAttack(ctx.world, ctx.self); return; }
          if (ctx.ability.key !== "E") return;
          sweepPets(ctx);
          if (!ctx.memory["samira:explosive"]) return;
          ctx.memory["samira:explosive"] = false;
          const from = Number(ctx.memory["samira:rushStart"]), to = ctx.self.x, explosion: AbilitySpec = { ...qSlash, key: "Qexplosion", name: `${q.name} (dash explosives)` };
          if (ctx.enemy.x + ctx.enemy.spec.base.radius >= Math.min(from, to) - EPSILON && ctx.enemy.x - ctx.enemy.spec.base.radius <= Math.max(from, to) + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, explosion, qPacket);
          for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && pet.x + pet.spec.radius >= Math.min(from, to) - EPSILON && pet.x - pet.spec.radius <= Math.max(from, to) + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, explosion, qPacket, "area");
        },
        onKill(ctx) { if (!ctx.pet) ctx.apply({ type: "refund", ability: "E", total: true }, true); },
      },
    };
  },
};
export default samira;
