/** Talon: target-owned Wounds, independent blade passes and terrain-only vaults. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackTiming, canCast, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canSee, directionTo, edgeDistance, inStasis } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Terrain, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const WOUND = "talon:wound", BLEED = "talon:bleeding";
const talon: KitModule = {
  champion: "Talon",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const woundSeconds = p.quoted("hit for 6 seconds"), woundCap = p.quoted("stacking up to 3 times");
    const bleedSeconds = p.quoted("physical damage over 2 seconds"), bleedInterval = p.quoted("{{fd|0.125}} seconds");
    const bleed = { base: p.levelValue("total physical damage"), ratios: { bonusAD: p.quoted("(+ 210% bonus AD)") / 100 } };
    p.quote("will still trigger if blocked"); p.quote("not if they are dodged or missed"); p.quote("still consuming all Wound stacks"); p.quote("Both passes of Rake and Shadow Assault apply a stack");
    const qDamage = q.formula("Physical Damage"), qCrit = q.formula("Critical Physical Damage"), qCD = q.cooldown(), qCost = q.cost();
    const qRange = q.field("targetRange", "Ranged"), qMelee = q.field("targetRange", "Close"), qSpeed = q.field("speed");
    const qBonusRange = q.quoted("grants him 75 bonus attack range"), qBonusSeconds = q.quoted("next basic attack within 1 second");
    const qCloseLanding = q.tipped("dashes to the target"), qLanding = q.quoted("offset of 100 units"), qTrackLimit = q.quoted("beyond 800 units");
    const qHeal = q.levelValue("Talon heals for"), qRefund = q.quoted("cooldown is reduced by 50%") / 100;
    q.quote("resets Talon's basic attack timer"); q.quote("100% of '''Talon's''' windup time"); q.quote("The damage will be dealt even if Talon's dash is interrupted");
    q.quote("only applies to the close dash attack"); q.quote("While grounded or rooted");
    q.gameQuote("mSpell.castRange: [170.0,170.0,170.0,170.0,170.0,170.0,170.0]");
    q.gameQuote('mSpell.mUseAutoattackCastTimeData: {"__type":"UseAutoattackCastTimeData"}');
    q.gameQuote("mSpell.mCastingBreaksStealth: true");
    const wOut = w.formula("Physical Damage", 0), wBack = w.formula("Physical Damage", 1), wCD = w.cooldown(), wCast = w.castTime();
    const wRange = w.field("range", "Center"), wWidth = w.field("width"), wSpeed = w.field("speed", "Returning");
    const wOutSeconds = w.quoted("0.35 seconds fixed travel time"), wPause = w.quoted("linger for 0.7 seconds"), wSlow = w.fraction("Slow"), wSlowSeconds = w.quoted("slowing them for 1 second");
    const wReturnLimit = w.quoted("20000 units at rank 5");
    w.quote("only once per pass"); w.quote("projectiles will still complete their travel"); w.quote("wherever the caster is at the end of the cast time");
    w.field("range", "Side"); w.field("angle");
    w.gameQuote("mSpell.mMissileSpec.movementComponent.mTravelTime: 0.3499999940395355");
    w.gameQuote("mSpell.castRange: [5000.0,5000.0,5000.0,5000.0,5000.0,20000.0,20000.0]");
    const eRange = e.field("targetRange"), eDistance = e.quoted("dashes up to 800 units"), eSpeed = e.field("speed") / 100;
    const eWallCD = e.quoted("{{ap|160|135|110|85|60}}", e.rank - 1), eCD = e.cooldown(), eCast = e.castTime();
    const eRevealSeconds = e.quoted("{{fd|0.6}} seconds"), eRevealRange = e.quoted("within 400 units");
    e.quote("player-generated terrain"); e.quote("stop dashing upon entering"); e.quote("Affected by ability haste");
    e.gameQuote("mSpell.DataValues.WallJumpDistance.values: [625.0,625.0,625.0,625.0,625.0,625.0,625.0]");
    e.gameQuote("mSpell.DataValues.WallLockoutWidth.values: [1250.0,1250.0,1250.0,1250.0,1250.0,1250.0,1250.0]");
    const rDamage = r.formula("Physical Damage"), rCD = r.cooldown(), rCost = r.cost(), rCast = r.castTime(), rRange = r.field("effectRadius"), rWidth = r.field("width");
    const rOutSpeed = r.field("speed", "Outward"), rBackSpeed = r.field("speed", "Returning"), rMove = r.fraction("Bonus Movement Speed");
    const rSeconds = r.quoted("up to 2.5 seconds"), rGate = r.quoted("recast after 1 second"), rMinimum = r.quoted("minimum lifetime of 0.8 seconds"), rReturnLimit = r.quoted("more than 20000 units");
    r.quote("basic attack breaks the stealth at the end of the attack windup"); r.quote("will converge the blades to the target instead"); r.quote("does not cancel Talon's basic attacks");
    r.quote("12 blades evenly distributed"); r.quote("Spell shield will block a single pass"); r.textField("cooldownStart");
    r.gameQuote("mSpell.spellCastTime: 0.25"); r.gameQuote("mSpell.castRange: [550.0,550.0,550.0,550.0,550.0,550.0,550.0]");
    r.gameQuote("mSpell.mMissileSpec.mMissileWidth: 140.0"); r.gameQuote("mSpell.castRange: [20000.0,20000.0,20000.0,20000.0,20000.0,20000.0,20000.0]");

    kit.assume("Wounds belong to actual contacted champions, including explicitly Champion-class clones. Ordinary minion pets cannot receive Wounds; the engine does not classify any summoned monster as a large monster, so it does not infer large-monster eligibility from Monster class alone. Connected basics refresh existing stacks, including blocked attacks; blind, dodge and parry do not. At three stacks a connected basic consumes them even when a separate passive spell shield prevents the bleed. Damage blocks do not prevent the bleed. The raw pinned tooltip explicitly authors twenty passive levels, so level 20 is 303.529411764706 + 210% bonus AD, rather than capping the level-18 value at 280. Sixteen bleed pulses snapshot the proc's AD and use absolute ceil-rounded 0.125-second deadlines, ending at exactly two seconds; they do not trigger new Wounds and survive owner death.");
    kit.assume("Q has distinct close edge-range and ranged center-range branches, sharing Q's ordinary cooldown. Close Q uses the actual attack-speed windup, moves no closer than the primary tooltip's 150-unit offset during that cast and retains its damage clock through dash interruption. The ranged dash uses the primary explicitly estimated 1400 speed and 100-unit tracking offset; beyond the primary explicitly estimated 800 tracking distance it finishes at the previous target position while retaining the sourced remote hit. Neither Q branch is a basic attack or applies ordinary attack on-hits. Its guaranteed 150% close critical packet uses the primary formula and does not scale with ordinary basic critical chance. The next close-Q basic gains 75 range for one second. Cast-end target invalidation is free only for close Q. Q resets the actual basic timer and the ranged landing orders an ordinary basic through behavior. Kill healing follows the authored twenty-level series; it refunds half Q's remaining cooldown.");
    kit.assume("Rake's three-blade fan is represented by its central 900-unit axial blade on the duel line. The sourced side range, angle and full-width 150 remain evidence; lateral fan geometry is outside this scalar arena. It takes a fixed 0.35 seconds outward, pauses 0.7 seconds, then returns at 3000 to Talon's current position, including after death. Each pass has independent contact lists, spell-shield checks and a newly evaluated scalar sidestep weight. Missing outward does not suppress return damage. Walls destroy that blade and its remaining return; target relocation can make either pass miss. Rank-five returns fail beyond 20000 units. The initial blade starts from the cast-end location and declared facing.");
    kit.assume("Assassin's Path requires an actual active terrain interval in the requested direction, with a selectable near edge within 725 and a clear far-side endpoint within 800 total displacement. It never supplies a wall or a free open-ground dash. Every crossed interval has its own haste-scaled 60-second segment cooldown, independent of the two-second E cast cooldown. The scalar terrain interval is the lockout segment; the exact binary's 1250-unit lockout-width and 625 WallJumpDistance metadata do not replace the primary 800-unit maximum or define additional map geometry. Speed is the sourced 100% current movement speed, sampled at declaration. Stasis pauses and resumes the same dash. Ordinary knockdown interrupts it. E gives the sourced brief reveal when observed or an enemy is within 400 of landing; unobstructed vision has no additional obstruction model on the duel line.");
    kit.assume("Shadow Assault's twelve radial blades are represented by the two opposite axial blades crossing this one-dimensional arena. Per-target, per-pass contact guards prevent double damage or multiple shield consumption from overlapping representatives; no twelvefold damage is granted. Outward flight is 550 at 2400 and return is 4000. Blades really remain at their endpoints, and return to the current owner or actual basic/Q target position; the two passes each apply one Wound. Initial stealth lasts up to 2.5 seconds, recast is available after one second, and every convergence respects the 0.8-second minimum. Basic windup completion and Q release end stealth and select the attacked target, while W release or manual expiry returns to Talon. E's reveal exposes him without terminating the stealth. The primary instant R wins over the binary's 0.25 cast metadata. Cooldown begins when convergence starts and stealth/speed end. Already released blades complete after death; at death, remaining stealth runs to its original convergence deadline because no earlier death-convergence rule is sourced. Returns fail beyond 20000. Off-axis radial overlap, acceleration and unsourced server lifecycle details are not invented.");
    kit.assume("Ordinary hold and trade behavior reserve offensive Shadow Assault; a completed trade retains retreat. Reactive defense is still allowed when actually threatened. The reference budget values both W/R passes, the close Q packet, and one bleed per achievable three-spell-contact cycle constrained by its two-second lockout and actual basic speed. It assumes those packets contact for valuation; the duel resolves actual misses, defenses, resources and terrain. No numeric coefficient is fitted to matchup results.");

    const damage = (amount: typeof qDamage): Effect => ({ type: "damage", damageType: "physical", amount, petDamageCategory: "area" });
    const internal = (key: string, name: string, effects: Effect[]): AbilitySpec => ({ key, name, slot: "other", cooldown: 0, castTime: 0, activation: "internal", budgetExcluded: true, delivery: { kind: "self" }, onHit: effects, flags: { spellShield: true, petContactHooks: true, projectile: true }, persistsAfterDeath: true, usable: () => false });
    const wOutSpec = internal("Wout", `${w.name} (outward)`, [damage(wOut)]), wBackSpec = internal("Wreturn", `${w.name} (return)`, [damage(wBack), { type: "cc", cc: "slow", duration: wSlowSeconds, strength: wSlow }]);
    const rOutSpec = internal("Rout", `${r.name} (outward)`, [damage(rDamage)]), rBackSpec = internal("Rreturn", `${r.name} (return)`, [damage(rDamage)]);
    const bleedSpec: AbilitySpec = { ...internal("Bleed", p.name, []), flags: { spellShield: true, petContactHooks: true } };
    const getWall = (self: Unit, world: World, relative: number): Terrain | undefined => {
      const dir = directionTo(self, world.units[self.side === 0 ? 1 : 0]) * relative, radius = self.spec.base.pathingRadius;
      const walls = world.terrain.filter(t => t.endTick > world.tick && (dir > 0 ? t.to >= self.x : t.from <= self.x));
      walls.sort((a, b) => dir > 0 ? a.from - b.from : b.to - a.to);
      const wall = walls[0]; if (!wall || world.tick < Number(self.memory[`talon:wall:${wall.id}`] ?? 0)) return;
      const near = dir > 0 ? wall.from : wall.to, endpoint = dir > 0 ? wall.to + radius : wall.from - radius;
      if (Math.abs(near - self.x) > eRange || (endpoint - self.x) * dir < 0 || Math.abs(endpoint - self.x) > eDistance) return;
      if (world.terrain.some(t => t !== wall && t.endTick > world.tick && endpoint + radius > t.from + 1e-6 && endpoint - radius < t.to - 1e-6)) return;
      return wall;
    };
    const qReady = (self: Unit, world: World) => world.tick >= Number(self.memory["talon:qCastUntil"] ?? 0);
    const close = (self: Unit, world: World) => edgeDistance(self, world.units[self.side === 0 ? 1 : 0]) <= qMelee + 1e-6;
    const qCloseSpec: AbilitySpec = { key: "Q", name: `${q.name} (close)`, slot: "Q", cooldown: qCD, cost: qCost, castTime: q.castTime("Close"), castTimeFor: self => attackTiming(self).windup / 30, preserveCastStartDash: true, cancelOnInvalidTarget: true, delivery: { kind: "target", range: qMelee, edge: true }, onHit: [{ ...damage(qCrit), petDamageCategory: "singleTarget" } as Effect], flags: { spellShield: true, petContactHooks: true }, usable: (self, world) => qReady(self, world) && close(self, world), roles: ["damage"] };
    const qDashSpec: AbilitySpec = { key: "Qdash", name: `${q.name} (ranged)`, slot: "Q", cooldown: qCD, cooldownKey: "Q", budgetExcluded: true, cost: qCost, castTime: 0, delivery: { kind: "dash", direction: "target", distance: qRange, speed: qSpeed }, flags: { grounded: true, knockdown: true, spellShield: true, petContactHooks: true }, onHit: [{ ...damage(qDamage), petDamageCategory: "singleTarget" } as Effect], usable: (self, world) => qReady(self, world) && !close(self, world) && Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= qRange, roles: ["damage", "engage"] };
    const abilities: AbilitySpec[] = [qCloseSpec, qDashSpec,
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: wCast, castDirection: "start", delivery: { kind: "self" }, roles: ["damage", "cc"], budgetExcluded: true, usable: qReady, estimate: (self, target) => evaluate(wOut, self, target) + evaluate(wBack, self, target), estimateDelay: (self, target) => Math.min(wRange, Math.abs(target.x - self.x)) / (wRange / wOutSeconds) },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, castTime: eCast, delivery: { kind: "self" }, flags: { grounded: true, knockdown: true }, roles: ["escape", "engage"], budgetExcluded: true, usable: (self, world) => qReady(self, world) && (getWall(self, world, 1) !== undefined || getWall(self, world, -1) !== undefined) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: rCost, castTime: rCast, delivery: { kind: "self" }, cooldownAfter: "state", overlay: true, overlayResumedDash: true, preserveAttackWindup: true, roles: ["damage", "defense", "buff"], budgetExcluded: true, usable: self => !self.memory["talon:rActive"], estimate: (self, target) => evaluate(rDamage, self, target) * 2 },
      { key: "R2", name: `${r.name} (converge)`, slot: "R", cooldown: 0, castTime: 0, activation: "internal", countsAsCast: false, budgetExcluded: true, delivery: { kind: "self" }, overlay: true, overlayResumedDash: true, preserveAttackWindup: true, usable: (self, world) => !!self.memory["talon:rActive"] && world.tick >= Number(self.memory["talon:rStart"]) + ticks(rGate) },
      wOutSpec, wBackSpec, rOutSpec, rBackSpec, bleedSpec,
    ];
    const wound = (ctx: HookContext, scale: number) => {
      const targetClass = ctx.enemy.petId === undefined ? "champion" : ctx.enemy.spec.targetClass;
      if (targetClass !== "champion" || ctx.tick < Number(ctx.enemy.memory[`${BLEED}:${ctx.self.side}`] ?? 0)) return;
      const mark = ctx.enemy.statuses.find(s => s.key === WOUND && s.source === ctx.self.side && s.endTick > ctx.tick);
      if (mark) { mark.value = Math.min(woundCap, mark.value + scale); mark.endTick = ctx.tick + ticks(woundSeconds); }
      else ctx.enemy.statuses.push({ kind: "mark", key: WOUND, source: ctx.self.side, value: Math.min(woundCap, scale), startTick: ctx.tick, endTick: ctx.tick + ticks(woundSeconds) });
    };
    const basic = (ctx: HookContext, scale: number) => {
      const mark = ctx.enemy.statuses.find(s => s.key === WOUND && s.source === ctx.self.side && s.endTick > ctx.tick);
      if (!mark) return;
      if (mark.value < woundCap - 1e-6) { mark.endTick = ctx.tick + ticks(woundSeconds); return; }
      ctx.enemy.statuses = ctx.enemy.statuses.filter(s => s !== mark);
      const effects: Effect[] = [{ type: "mark", key: BLEED, duration: bleedSeconds }];
      abilityHit(ctx.world, ctx.self, ctx.enemy, bleedSpec, effects, scale);
      if (!ctx.enemy.statuses.some(s => s.key === BLEED && s.source === ctx.self.side && s.startTick === ctx.tick)) return;
      ctx.enemy.memory[`${BLEED}:${ctx.self.side}`] = ctx.tick + ticks(bleedSeconds);
      const pulses = Math.round(bleedSeconds / bleedInterval), amount = evaluate(bleed, ctx.self, ctx.enemy) / pulses;
      for (let n = 1; n <= pulses; n++) ctx.world.scheduled.push({ tick: ctx.tick + ticks(n * bleedInterval), owner: ctx.self.side, target: ctx.enemy.side, ...(ctx.enemy.petId !== undefined ? { targetPet: ctx.enemy.petId } : {}), ability: "Bleed", effects: [{ type: "damage", damageType: "physical", amount: { base: amount }, persistent: true, label: p.name, petDamageCategory: "persistent" }], scale });
    };
    const launch = (ctx: HookContext, source: string, x: number, direction: 1 | -1, speed: number, distance: number, width: number, connects = true, scale = 1): Missile => {
      const spec = abilities.find(a => a.key === source)!;
      const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source, seenTick: ctx.tick, x, direction, perTick: speed / 30, homing: false, piercing: true, collisionPet: true, radius: width / 2, travelLeft: distance, projectile: true, connects, scale, onHit: spec.onHit ?? [] };
      ctx.world.missiles.push(missile); return missile;
    };
    const endStealth = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.source === ctx.self.side && s.kind === "state" && s.key === "invisible"));
      ctx.buff("talon:rSpeed", "moveSpeedPercent", 0, 0);
    };
    const converge = (ctx: HookContext, target: number) => {
      if (!ctx.memory["talon:rActive"]) return;
      ctx.memory["talon:rTarget"] = target;
      ctx.memory["talon:rConverge"] = Math.max(ctx.tick, Number(ctx.memory["talon:rStart"]) + ticks(rMinimum));
      endStealth(ctx);
    };
    const rTransition = (ctx: HookContext) => {
      if (!ctx.memory["talon:rActive"]) return;
      const at = Number(ctx.memory["talon:rConverge"] ?? ctx.memory["talon:rEnd"]);
      if (ctx.tick < at) return;
      if (ctx.memory["talon:rConverge"] === undefined) ctx.memory["talon:rTarget"] = -2;
      ctx.memory["talon:rActive"] = false; ctx.memory["talon:rReturning"] = true;
      endStealth(ctx);
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.source === ctx.self.side && s.kind === "state" && s.key === "lingering"));
      delete ctx.self.cooldownHeld.R;
      ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rCD, derive(ctx.self).abilityHaste));
    };
    const behavior: Behavior = view => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return normal;
      const reaction = react(view); if (reaction) return reaction;
      const ready = (key: string) => canCast(view.world, view.self, abilities.find(a => a.key === key)!);
      if (view.self.action || view.mode === "flee") return normal;
      if (view.mode !== "hold" && view.mode !== "trade" && ready("R") && view.distance <= rRange) return { kind: "cast", ability: "R" };
      if (ready("Q")) return { kind: "cast", ability: "Q" };
      if (ready("W") && view.distance <= wRange) return { kind: "cast", ability: "W" };
      if (view.mode !== "kite" && ready("Qdash")) return { kind: "cast", ability: "Qdash" };
      if (normal?.kind === "cast" && normal.ability === "W" && view.distance > wRange) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      if (normal?.kind === "cast" && normal.ability === "E") {
        const direction = 1;
        if (getWall(view.self, view.world, direction)) return { kind: "cast", ability: "E", aim: { direction, distance: eDistance } };
        return { kind: "move", direction: view.mode === "hold" ? 0 : direction };
      }
      return normal;
    };
    return { abilities, behavior, attack: { onHitToPets: true, bonusRangeFor: self => Number(self.memory["talon:qRangeUntil"] ?? -1) > Number(self.memory["talon:now"] ?? 0) ? qBonusRange : 0 },
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, qRate = 1 / (qCD / haste + attackTiming(self).windup / 30), wRate = 1 / (wCD / haste + wCast), rRate = 1 / (rCD / haste + rSeconds), contacts = qRate + 2 * wRate + 2 * rRate; return { physical: (evaluate(wOut, self, target) + evaluate(wBack, self, target)) * wRate + 2 * evaluate(rDamage, self, target) * rRate + evaluate(bleed, self, target) / (bleedSeconds + woundCap / Math.max(1e-6, Math.min(contacts, d.attackSpeed * woundCap))) }; } },
      hooks: {
        onAttackBeforeDamage(ctx) { basic(ctx, ctx.scale); },
        onAttackLaunch(ctx) { converge(ctx, ctx.targetPet?.id ?? -1); delete ctx.memory["talon:qRangeUntil"]; },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "Rout" && ctx.ability.key !== "Rreturn") return;
          const key = `talon:rHit:${ctx.self.side}:${ctx.ability.key}`, serial = Number(ctx.memory["talon:rSerial"]);
          if (ctx.enemy.memory[key] === serial) return [];
          ctx.enemy.memory[key] = serial;
        },
        onAbilityHit(ctx) {
          if (["Q", "Qdash", "Wout", "Wreturn", "Rout", "Rreturn"].includes(ctx.ability.key)) wound(ctx, ctx.scale);
          // Resolve against this actual spell target. Champion kill notifications do
          // not carry damage attribution, and a pet's owner is not the killed pet.
          if ((ctx.ability.key === "Q" || ctx.ability.key === "Qdash") && ctx.enemy.hp <= 0) {
            ctx.apply({ type: "heal", amount: { base: qHeal } }, true);
            ctx.apply({ type: "refund", ability: "Q", fraction: qRefund }, true);
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "Q") return;
          const duration = attackTiming(ctx.self).windup, direction = directionTo(ctx.self, ctx.enemy), distance = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - qCloseLanding);
          ctx.memory["talon:qCastUntil"] = ctx.tick + duration;
          ctx.self.action = { kind: "dash", ability: "Q", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: direction * distance / duration, stopAtContact: false, crossTerrain: true, unstoppable: false };
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qdash") {
            ctx.self.attackReadyTick = ctx.tick;
            converge(ctx, -1);
            if (ctx.ability.key === "Q") ctx.memory["talon:qRangeUntil"] = ctx.tick + ticks(qBonusSeconds);
            else { ctx.memory["talon:qLastTarget"] = ctx.enemy.x; ctx.memory["talon:qDirection"] = directionTo(ctx.self, ctx.enemy); }
          }
          if (ctx.ability.key === "W") {
            converge(ctx, -2);
            const direction = Number(ctx.memory["castDirection:W"] ?? directionTo(ctx.self, ctx.enemy)) * (ctx.aim?.direction ?? 1) as 1 | -1;
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(wCast), Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius) / (wRange / wOutSeconds), wWidth / 2);
            launch(ctx, "Wout", ctx.self.x, direction, wRange / wOutSeconds, wRange, wWidth, chance > .02, chance >= .98 ? 1 : chance);
          }
          if (ctx.ability.key === "E") {
            const relative = ctx.aim?.direction ?? 1, wall = getWall(ctx.self, ctx.world, relative);
            if (!wall) { ctx.self.cooldownReady.E = ctx.tick; return; }
            const direction = directionTo(ctx.self, ctx.enemy) * relative, endpoint = direction > 0 ? wall.to + ctx.self.spec.base.pathingRadius : wall.from - ctx.self.spec.base.pathingRadius;
            const duration = Math.max(1, ticks(Math.abs(endpoint - ctx.self.x) / (derive(ctx.self).moveSpeed * eSpeed)));
            ctx.memory[`talon:wall:${wall.id}`] = ctx.tick + ticks(cooldownAfterHaste(eWallCD, derive(ctx.self).abilityHaste));
            ctx.memory["talon:eEnd"] = endpoint;
            ctx.self.action = { kind: "dash", ability: "E", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: (endpoint - ctx.self.x) / duration, stopAtContact: false, crossTerrain: true, unstoppable: false };
            if (canSee(ctx.self, ctx.enemy) || Math.abs(endpoint - ctx.enemy.x) <= eRevealRange) ctx.apply({ type: "state", state: "revealed", duration: eRevealSeconds }, true);
          }
          if (ctx.ability.key === "R") {
            ctx.memory["talon:rSerial"] = Number(ctx.memory["talon:rSerial"] ?? 0) + 1;
            ctx.memory["talon:rActive"] = true; ctx.memory["talon:rReturning"] = false;
            ctx.memory["talon:rStart"] = ctx.tick; ctx.memory["talon:rEnd"] = ctx.tick + ticks(rSeconds); delete ctx.memory["talon:rConverge"];
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "invisible", duration: rSeconds }, { scale: 1, ability: ctx.ability });
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "lingering", duration: rSeconds }, { scale: 1, ability: ctx.ability });
            ctx.buff("talon:rSpeed", "moveSpeedPercent", rMove, rSeconds);
            for (const direction of [1, -1] as const) launch(ctx, "Rout", ctx.self.x, direction, rOutSpeed, rRange, rWidth);
          }
          if (ctx.ability.key === "R2") converge(ctx, -2);
        },
        onDashTick(ctx) {
          if (ctx.ability.key === "Qdash") {
            const tracked = Math.abs(ctx.enemy.x - ctx.self.x) <= qTrackLimit;
            const destination = tracked ? ctx.enemy.x : Number(ctx.memory["talon:qLastTarget"]);
            if (tracked) { ctx.memory["talon:qLastTarget"] = ctx.enemy.x; ctx.memory["talon:qDirection"] = directionTo(ctx.self, ctx.enemy); }
            const direction = Number(ctx.memory["talon:qDirection"]) as 1 | -1;
            const endpoint = destination - direction * Math.min(qLanding, Math.abs(destination - ctx.self.x));
            const dx = endpoint - ctx.self.x;
            ctx.action.perTick = Math.sign(dx) * Math.min(qSpeed / 30, Math.abs(dx));
            ctx.action.stopAtContact = false;
            ctx.action.endTick = ctx.tick + Math.max(0, Math.ceil(Math.abs(dx) / (qSpeed / 30) - 1e-6) - 1);
          }
          if (ctx.ability.key === "E" && inStasis(ctx.self)) { ctx.action.endTick++; ctx.action.perTick = 0; }
          else if (ctx.ability.key === "E") { const remaining = Math.max(1, ctx.action.endTick - ctx.tick + 1); ctx.action.perTick = (Number(ctx.memory["talon:eEnd"]) - ctx.self.x) / remaining; }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Qdash" && !ctx.interrupted) { if (ctx.enemy.alive && ctx.enemy.hp > 0) abilityHit(ctx.world, ctx.self, ctx.enemy, qDashSpec, qDashSpec.onHit!); ctx.self.attackReadyTick = ctx.tick; }
        },
        onMissileMove(ctx) {
          if ((ctx.missile.source === "Wout" || ctx.missile.source === "Rout") && ctx.missile.travelLeft <= 1e-6) {
            ctx.memory[`talon:linger:${ctx.missile.id}`] = ctx.tick;
            ctx.missile.perTick = 0; ctx.missile.travelLeft = Infinity;
          }
        },
        onMissileTick(ctx) {
          const missile = ctx.missile;
          rTransition(ctx);
          if (missile.source === "Wout" && ctx.memory[`talon:linger:${missile.id}`] !== undefined && ctx.tick >= Number(ctx.memory[`talon:linger:${missile.id}`]) + ticks(wPause)) {
            if (Math.abs(ctx.self.x - missile.x) > wReturnLimit) { missile.ended = true; return; }
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, Math.max(0, Math.abs(ctx.enemy.x - missile.x) - ctx.enemy.spec.base.radius) / wSpeed, wWidth / 2);
            missile.source = "Wreturn"; missile.onHit = wBackSpec.onHit!; missile.perTick = wSpeed / 30; missile.followOwner = true; missile.hitTargets = []; missile.hitPets = []; missile.connects = chance > .02; missile.scale = chance >= .98 ? 1 : chance;
          }
          if (missile.source === "Rout" && ctx.memory["talon:rReturning"]) {
            missile.source = "Rreturn"; missile.onHit = rBackSpec.onHit!; missile.hitTargets = []; missile.hitPets = []; missile.perTick = rBackSpeed / 30;
          }
          if (missile.source === "Rreturn") {
            const target = Number(ctx.memory["talon:rTarget"]), pet = target >= 0 ? ctx.world.pets.find(pet => pet.id === target) : undefined;
            if (target >= 0 && !pet) { missile.ended = true; return; }
            const x = target === -2 ? ctx.self.x : pet?.x ?? ctx.enemy.x, dx = x - missile.x;
            if (Math.abs(dx) > rReturnLimit || Math.abs(dx) < 1e-6) { missile.ended = true; return; }
            missile.direction = dx > 0 ? 1 : -1; missile.travelLeft = Math.abs(dx);
          }
        },
        onTick(ctx) { ctx.memory["talon:now"] = ctx.tick; rTransition(ctx); },
      },
    };
  },
};
export default talon;
