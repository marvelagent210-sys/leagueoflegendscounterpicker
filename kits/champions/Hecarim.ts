/** Hecarim: Warpath, Rampage's stacks, Spirit of Dread, Devastating Charge's run-up and charge, and Onslaught of Shadows. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { EPSILON, attackTiming, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, heal } from "../../engine/sim/combat";
import { canAttack, ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { attackDamage, flat, seriesAt, ticks } from "./util";

const hecarim: KitModule = {
  champion: "Hecarim",
  build(kit) {
    const passive = kit.ability("Warpath");
    const q = kit.ability("Rampage");
    const w = kit.ability("Spirit of Dread");
    const e = kit.ability("Devastating Charge");
    const r = kit.ability("Onslaught of Shadows");
    const stats = kit.champion.forms[0]!.stats;

    // Warpath: attack damage from bonus movement speed, read every 0.25 seconds.
    const warpath = passive.levelValue("Hecarim gains bonus attack damage equal to", 0) / 100;
    const warpathEvery = passive.quoted("The amount of movement speed scaling to bonus attack damage is refreshed every 0.25 seconds", 0);
    passive.quote("Warpath's bonus attack damage will adjust itself to any temporary movement speed buffs and debuffs Hecarim is affected by");
    passive.quote("Hecarim will not dip below his regular attack damage if he is slowed below his base movement speed");

    // Rampage: a cleave whose stacks raise its damage and shorten its base cooldown.
    const cleave = q.formula("Physical Damage");
    const cleaveRadius = q.field("effectRadius");
    const stackSeconds = q.quoted("Hecarim gains a stack of Rampage for 8 seconds", 0);
    const maxStacks = q.quoted("refreshing on subsequent damage and stacking up to 3 times", 0);
    const perStack = q.quoted("Each stack increases Rampage's damage by 3% (+ 3% per 100 bonus AD)", 0) / 100;
    const perStackAd = q.quoted("Each stack increases Rampage's damage by 3% (+ 3% per 100 bonus AD)", 1) / 100 / q.quoted("Each stack increases Rampage's damage by 3% (+ 3% per 100 bonus AD)", 2);
    const cooldowns = q.fieldNumbers("cooldown");
    q.quote("reduces its base cooldown by 0.75 seconds");
    q.quote("Stacks expire one by one every 1 second when the duration ends");
    const decaySeconds = q.quoted("Stacks expire one by one every 1 second when the duration ends", 0);
    const minionShare = q.quoted("reduced to 60% against minions", 0) / 100;
    q.quote("If this damages an enemy, Hecarim gains a stack of Rampage");
    if (cooldowns.length !== maxStacks + 1) throw new Error(`Hecarim kit: Rampage has ${cooldowns.length} cooldowns for ${maxStacks} stacks`);
    kit.assume("Rampage's cooldown is set by the stacks it has as it is cast, before its hit adds one. A cast gains one stack however many enemies it damages, and its 60% against minions applies to the summons their pet data classes as minions.");

    // Spirit of Dread: an aura of damage, resistances and healing from damage to enemies in it.
    const dreadSeconds = w.quoted("Hecarim surrounds himself with the Spirit of Dread for 4 seconds", 0);
    const dreadTick = w.formula("Magic Damage Per Tick");
    const dreadRadius = w.field("effectRadius");
    const dreadResist = w.number("Bonus Resistances");
    const dreadHeal = w.quoted("is healed for 25% of the post-mitigation damage dealt to enemies within the area from all sources", 0) / 100;
    w.quote("dealing magic damage every second to nearby enemies");
    w.quote("The healing is capped against minions and monsters");
    kit.assume("Spirit of Dread pulses as it is cast and then every second (four pulses); its healing counts Hecarim's damage to the enemy champion in its area, not his damage to pets.");

    // Devastating Charge: a run-up of growing speed, then a charging attack stronger the farther he went.
    const runSeconds = e.quoted("bonus total movement speed for 4 seconds", 0);
    const runSpeeds = e.seriesIn("Hecarim becomes ghosted and gains", 0);
    const reach = e.seriesIn("empowering it to gain", 0);
    const knockback = e.seriesIn("knocks them back", 0);
    const increase = e.seriesIn("knocks them back", 1);
    const chargeMin = e.formula("Minimum Physical Damage");
    const chargeMax = e.formula("Maximum Physical Damage");
    const stunSeconds = e.quoted("stuns them for 0.25 seconds", 0);
    e.quote("Hecarim's next basic attack is replaced by a Devastating Charge");
    e.quote("Devastating Charge can critically strike for 100% AD bonus physical damage");
    const critShare = e.quoted("Devastating Charge can critically strike for 100% AD bonus physical damage", 0) / 100;
    e.quote("Devastating Charge resets Hecarim's basic attack timer");
    e.quote("Hecarim can cast any of his abilities during the dash");
    e.quote("Devastating Charge's duration is paused during Onslaught of Shadows");
    e.quote("If the target does not remain nearby during the dash, Devastating Charge's effect will not be consumed");
    e.quote("The bonus movement speed stacks multiplicatively with other sources of movement speed boosts");
    e.quote("Devastating Charge's damage will not bypass block or dodge but the knock back will still be applied");
    e.quote("Devastating Charge will still deal damage while blinded");
    e.quote("Hecarim will not use the empowered attack while rooted");
    e.quote("The dash does not follow targets. The target's position at the time of the enhanced attack is the direction Hecarim will leap to");
    e.quote("Displacement immunity will not resist the application of the stun");
    e.quote("Distance traveled\" can be simple movement as well as dashing and blinking");
    e.quote("Devastating Charge will still apply its effects to the target even if the dash is interrupted");
    const maxTravel = Math.max(...(knockback.kind === "variable" ? knockback.points.map(Number) : [1]));
    if (chargeMax.base !== 2 * chargeMin.base || (chargeMax.ratios?.bonusAD ?? 0) !== 2 * (chargeMin.ratios?.bonusAD ?? 0)) throw new Error("Hecarim kit: Devastating Charge's maximum damage is no longer twice its minimum");
    if (runSpeeds.kind !== "variable" || reach.kind !== "variable" || knockback.kind !== "variable" || increase.kind !== "variable") throw new Error("Hecarim kit: Devastating Charge's values no longer depend on time or distance");
    const knockSeconds = 0.25;
    const gameRamp = e.gameQuoted("mSpell.DataValues.TimeToMaxMoveSpeed.values: [2.5,2.5,2.5,2.5,2.5,2.5,2.5]", 0);
    e.gameQuote("mSpell.DataValues.DistanceToMaxDamage.values: [1200,1200,1200,1200,1200,1200,1200]");
    kit.assume(`Devastating Charge's run-up speed rises in the wiki's steps of 0.25 seconds, reaching its 65% at 3 seconds; the pinned game file's TimeToMaxMoveSpeed is ${gameRamp} seconds, and the wiki is used.`);
    kit.assume("Devastating Charge's range, knock back and damage grow evenly between the wiki's steps of distance traveled (0 to 1200 units); his movement counts, being knocked about does not.");
    kit.assume("Devastating Charge's charge takes the time of his attack windup, from where he starts it to the enemy's position then (the wiki and the game data give no dash speed); it hits if the enemy is still within his attack range when he arrives.");
    kit.assume(`Devastating Charge's knock back takes ${knockSeconds} s, and its 0.25-second stun follows it: the wiki and the game data give no knock back duration.`);
    kit.assume("Devastating Charge's speed is added to his other speed bonuses; he has none in a plain-stat duel, so stacking multiplicatively changes nothing. It waits while he is grounded (the dash can't start), rather than charging from his normal range.");
    kit.assume("Devastating Charge's charge goes on through crowd control (its effects apply even if the dash is interrupted); Onslaught of Shadows can't be cast during it.");
    kit.assume("Devastating Charge's charge takes the place of his attack: what stops attacks (stuns, disarms) stops it, silence and blindness don't.");

    // Onslaught of Shadows: a dash with spectral riders, then a fear and a slow that grows with distance.
    const [minDash = 300, maxDash = 1000] = r.fieldNumbers("targetRange");
    const onslaughtSpeed = r.field("speed");
    const riderRange = r.field("range");
    const riderWidth = r.field("width", "Width of full effect");
    const riders = r.formula("Magic damage");
    const fearRadius = r.field("effectRadius");
    const fearSeries = r.seriesIn("Upon arrival, he fears nearby enemies for", 0);
    const slowSeries = r.seriesIn("Upon arrival, he fears nearby enemies for", 1);
    r.quote("Hecarim dashes with displacement immunity to the target location");
    r.quote("The wave of spectral riders travels independently of Hecarim and will always charge at the same distance");
    r.quote("Only the spectral riders deal damage to enemies they pierce, Hecarim only dashes and fears enemies at the end of it");
    r.quote("The slow improperly counts as an additive percent movement speed modifier rather than a multiplicative one");
    r.quote("The strength is unaffected by slow resist as a result of this behavior");
    if (fearSeries.kind !== "variable" || slowSeries.kind !== "variable") throw new Error("Hecarim kit: Onslaught of Shadows' fear and slow no longer depend on distance");
    kit.assume("Onslaught of Shadows' riders are one piercing wave as wide as the formation (480), from where he starts, hitting the enemy once; its fear and slow grow evenly between the wiki's steps.");
    kit.assume("Onslaught of Shadows' slow is a negative percent of movement speed set from the enemy's distance every tick of the fear (none within 150, 99% at 300); slow resist and slow immunity don't change it.");

    const qBase = cooldowns, wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown();
    const traveledOf = (unit: Unit) => Number(unit.memory.chargeTraveled ?? 0);
    const chargeReach = (unit: Unit) => seriesAt(reach, traveledOf(unit), true);
    const charging = (unit: Unit, world: World) => world.tick < Number(unit.memory.chargeUntil ?? -1);
    const rampage = (unit: Unit) => Number(unit.memory.rampageStacks ?? 0);
    // A cast hits every enemy with the stacks it started with, not one it gains from an earlier target.
    const hitStacks = (unit: Unit) => Number(unit.memory.rampageHitStacks ?? rampage(unit));
    const windupSeconds = (unit: Unit) => attackTiming(unit).windup / 30;

    // Rampage's stacks, and Devastating Charge's damage by distance traveled.
    const cleaveHit: Effect = {
      type: "damage",
      damageType: "physical",
      amount: cleave,
      amountFor: (self, target) => evaluate(cleave, self, target) * (1 + hitStacks(self) * (perStack + perStackAd * derive(self).bonusAd)),
      label: q.name,
    };
    // The distance he had traveled as he started the charge (its own dash doesn't add to it).
    const chargedFrom = (unit: Unit) => Number(unit.memory.chargeAt ?? traveledOf(unit));
    const chargeDamage = (self: Unit, target: Unit) => {
      const d = derive(self);
      return evaluate(chargeMin, self, target) * (1 + seriesAt(increase, chargedFrom(self), true) / 100) + critShare * d.ad * d.critChance;
    };
    const chargeHit: Effect = { type: "damage", damageType: "physical", amount: chargeMin, amountFor: chargeDamage, label: e.name };
    const dreadHit: Effect = { type: "damage", damageType: "magic", amount: dreadTick, label: w.name };
    const riderHit: Effect = { type: "damage", damageType: "magic", amount: riders, label: r.name };

    const fearSpec: AbilitySpec = { key: "Rfear", name: `${r.name} (fear)`, slot: "R", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true } };
    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: qBase[0]!,
        cooldownFor: (unit) => qBase[Math.min(maxStacks, rampage(unit))]!,
        cost: q.cost(),
        castTime: q.castTime(),
        overlay: true,
        delivery: { kind: "aura", radius: cleaveRadius },
        onHit: [cleaveHit],
        flags: { spellShield: q.flag("spellShield") ?? true, petContactHooks: true },
        roles: ["damage"],
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: wCooldown,
        cost: w.cost(),
        castTime: w.castTime(),
        overlay: true,
        delivery: { kind: "field", range: 0, radius: dreadRadius, duration: dreadSeconds, interval: 1, attached: true },
        onHit: [dreadHit],
        onSelf: [{ type: "stat", stat: "armor", amount: flat(dreadResist), duration: dreadSeconds }, { type: "stat", stat: "MR", amount: flat(dreadResist), duration: dreadSeconds }],
        flags: { spellShield: w.flag("spellShield") ?? false },
        roles: ["damage", "defense"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: eCooldown,
        cost: e.cost(),
        castTime: e.castTime(),
        overlay: true,
        delivery: { kind: "self" },
        roles: ["buff"],
      },
      {
        key: "E2",
        name: `${e.name} (charge)`,
        slot: "E",
        cooldown: 0,
        castTime: 0,
        activation: "internal",
        // It is his basic attack: whatever stops attacks stops it (not silence), and roots and grounds too.
        usable: (unit, world) => {
          if (!charging(unit, world) || !canAttack(unit)) return false;
          const held = ccTypes(unit);
          if (held.has("root") || held.has("ground")) return false;
          const enemy = world.units[unit.side === 0 ? 1 : 0];
          return Math.abs(enemy.x - unit.x) - unit.spec.base.radius - enemy.spec.base.radius <= unit.spec.attack.range + chargeReach(unit) + EPSILON;
        },
        delivery: {
          kind: "dash",
          direction: "toward",
          distance: stats.attackRange + seriesAt(reach, maxTravel, true),
          distanceFor: (unit) => Number(unit.memory.chargeGap ?? 0),
          // For reference, its longest reach over his base attack windup.
          speed: (stats.attackRange + seriesAt(reach, maxTravel, true)) / (stats.windup.percent / stats.attackSpeed.base),
          speedFor: (unit) => Math.max(1, Number(unit.memory.chargeGap ?? 0)) / Math.max(1 / 30, windupSeconds(unit)),
          hitRadius: stats.attackRange,
        },
        onHit: [chargeHit, { type: "displace", direction: "away", distance: seriesAt(knockback, 0, true), duration: knockSeconds, stopAtWall: true }, { type: "delayed", delay: knockSeconds, effects: [{ type: "cc", cc: "stun", duration: stunSeconds }] }],
        onSelf: [{ type: "resetAttack" }],
        flags: { spellShield: e.flag("spellShield") ?? true, parry: true, dodgeKeepsEffects: true, appliesLifeSteal: true, knockdown: false, usableWhileDisabled: true },
        decisive: true,
        roles: ["damage", "cc", "engage"],
        estimate: (self, target) => chargeDamage(self, target),
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: rCooldown,
        cost: r.cost(),
        castTime: r.castTime(),
        delivery: { kind: "dash", direction: "toward", distance: maxDash, minDistance: minDash, speed: onslaughtSpeed },
        // Displacement immunity for as long as its longest dash; it ends with the dash (onDashEnd).
        onCastStart: [{ type: "state", state: "displacementImmune", duration: maxDash / onslaughtSpeed }],
        flags: { grounded: r.flag("grounded") ?? true, knockdown: r.flag("knockdown") ?? false, spellShield: true },
        decisive: true,
        roles: ["damage", "cc", "engage"],
        estimate: (self, target) => evaluate(riders, self, target),
      },
      {
        key: "R2",
        name: `${r.name} (riders)`,
        slot: "R",
        cooldown: 0,
        castTime: 0,
        chain: { root: "R", index: 2, window: 0, delay: 0, auto: true },
        delivery: { kind: "line", range: riderRange, width: riderWidth, speed: onslaughtSpeed, piercing: true },
        onHit: [riderHit],
        flags: { projectile: r.flag("projectile") ?? true, spellShield: true },
        roles: ["damage"],
      },
    ];

    // Warpath: 24% of his bonus movement speed as attack damage, never below none.
    const setWarpath = (ctx: HookContext) => {
      const bonus = Math.max(0, derive(ctx.self).moveSpeed - ctx.self.spec.base.moveSpeed);
      ctx.buff("hecarim:warpath", "AD", warpath * bonus, Number.POSITIVE_INFINITY);
    };
    // Devastating Charge's run-up: ghosted, its speed growing with the time it has run, both ending with the charge.
    const runSpeed = (unit: Unit, world: World) => seriesAt(runSpeeds, Math.max(0, world.tick - Number(unit.memory.chargeStart ?? world.tick) - Number(unit.memory.chargePaused ?? 0)) / 30, false) / 100;
    const endRun = (ctx: HookContext) => {
      ctx.memory.chargeUntil = -1;
      ctx.buff("hecarim:charge", "moveSpeedPercent", 0, 0);
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "ghosted" && s.memoKey === "hecarim:ghost"));
    };
    const dreadUntil = (unit: Unit) => Number(unit.memory.dreadUntil ?? -1);
    // A stack for a cast that damages an enemy: the champion's damage and its pets' hits count once.
    const stackRampage = (ctx: HookContext) => {
      if (ctx.memory.rampageStacked === ctx.memory.rampageCast) return;
      ctx.memory.rampageStacked = Number(ctx.memory.rampageCast ?? 0);
      ctx.memory.rampageStacks = Math.min(maxStacks, rampage(ctx.self) + 1);
      ctx.memory.rampageUntil = ctx.tick + ticks(stackSeconds);
    };
    const fearSlow = (distance: number) => seriesAt(slowSeries, distance, true) / 100;

    const ready = (view: Parameters<Behavior>[0], key: string) => {
      const ability = view.self.spec.abilities.find((a) => a.key === key);
      return ability !== undefined && canCast(view.world, view.self, ability);
    };
    const cast = (key: string) => ({ kind: "cast" as const, ability: key });
    // The default behavior otherwise, without the charge and Onslaught of Shadows (cast here), and the charge in place of an attack.
    const generic: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind === "attack" && command.pet === undefined && ready(view, "E2")) return cast("E2");
      if (command?.kind !== "cast" || !(command.ability === "R" || command.ability === "R2" || command.ability === "E2")) return command;
      return view.distance <= view.self.spec.attack.range ? { kind: "attack" } : { kind: "move", direction: 1 };
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode, distance } = view;
      if (mode === "idle") return undefined;
      if (self.action?.kind === "dash") return ready(view, "Q") && Math.abs(enemy.x - self.x) <= cleaveRadius ? cast("Q") : undefined;
      if (self.action && self.action.kind !== "windup") return undefined;
      const centers = Math.abs(enemy.x - self.x);
      if (mode === "flee") {
        if (ready(view, "E")) return cast("E");
        return generic(view);
      }
      // The charge as soon as it reaches.
      if (ready(view, "E2")) return cast("E2");
      if (ready(view, "W") && centers <= dreadRadius + enemy.spec.base.radius) return cast("W");
      if (ready(view, "Q") && centers <= cleaveRadius) return cast("Q");
      // The run-up from out of reach, or to charge from where he stands.
      if (ready(view, "E") && (distance > self.spec.attack.range || mode === "fight")) return cast("E");
      if (mode === "fight" && ready(view, "R") && centers <= maxDash + fearRadius - 50 && !ccTypes(enemy).has("fear")) {
        const gap = Math.max(0, centers - self.spec.base.pathingRadius - enemy.spec.base.pathingRadius);
        return { kind: "cast", ability: "R", aim: { direction: 1, distance: Math.min(maxDash, Math.max(minDash, gap)) } };
      }
      return generic(view);
    };

    return {
      abilities,
      behavior,
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          // Rampage at three stacks: its damage up and its base cooldown 1.75 s instead of 4.
          const stacked = evaluate(cleave, self, target) * (1 + maxStacks * (perStack + perStackAd * d.bonusAd));
          const rampageExtra = stacked / cooldownAfterHaste(qBase[maxStacks]!, d.abilityHaste) - evaluate(cleave, self, target) / cooldownAfterHaste(qBase[0]!, d.abilityHaste);
          // The charge once a run-up, about halfway to its most; Warpath's damage for the run-up's attacks.
          const eCycle = cooldownAfterHaste(eCooldown, d.abilityHaste);
          const charge = (evaluate(chargeMin, self, target) * 1.5 + critShare * d.ad * d.critChance) / eCycle;
          const warpathAd = warpath * 0.4 * self.spec.base.moveSpeed * Math.min(1, runSeconds / eCycle);
          return { physical: rampageExtra + charge + warpathAd * d.attackSpeed };
        },
        healing: (self, target) => {
          const d = derive(self);
          // A quarter of his damage while Spirit of Dread lasts: attacks, Rampage and its own pulses.
          const dps = attackDamage(self) * d.attackSpeed + evaluate(cleave, self, target) / cooldownAfterHaste(qBase[maxStacks]!, d.abilityHaste) + evaluate(dreadTick, self, target);
          return (dreadHeal * dps * dreadSeconds) / cooldownAfterHaste(wCooldown, d.abilityHaste);
        },
      },
      hooks: {
        onStart(ctx) {
          ctx.memory.warpathNext = ctx.tick;
        },
        onTick(ctx) {
          const self = ctx.self;
          delete ctx.memory.rampageHitStacks;
          if (ctx.tick >= Number(ctx.memory.warpathNext ?? 0)) {
            setWarpath(ctx);
            ctx.memory.warpathNext = ctx.tick + ticks(warpathEvery);
          }
          // Rampage's stacks run out one a second, 8 seconds after the last hit.
          const stacks = rampage(self);
          if (stacks > 0 && ctx.tick >= Number(ctx.memory.rampageUntil ?? 0)) {
            ctx.memory.rampageStacks = stacks - 1;
            ctx.memory.rampageUntil = ctx.tick + ticks(decaySeconds);
          }
          // The run-up: its clock stands still during Onslaught of Shadows' dash.
          if (charging(self, ctx.world)) {
            if (self.action?.kind === "dash" && self.action.ability === "R") {
              ctx.memory.chargeUntil = Number(ctx.memory.chargeUntil) + 1;
              ctx.memory.chargePaused = Number(ctx.memory.chargePaused ?? 0) + 1;
            }
            // His own movement since the last tick, unless he was being displaced at either end of it
            // (a knock back's last step happens before the engine clears it).
            const last = Number(ctx.memory.chargeX ?? self.x);
            const displaced = Boolean(self.forced || self.attached);
            if (!displaced && !ctx.memory.chargeDisplaced) ctx.memory.chargeTraveled = traveledOf(self) + Math.abs(self.x - last);
            ctx.memory.chargeDisplaced = displaced;
            ctx.memory.chargeX = self.x;
            ctx.buff("hecarim:charge", "moveSpeedPercent", runSpeed(self, ctx.world), 2 / 30);
            if (!self.statuses.some((s) => s.memoKey === "hecarim:ghost")) self.statuses.push({ kind: "state", key: "ghosted", source: self.side, startTick: ctx.tick, endTick: Number(ctx.memory.chargeUntil), value: 0, memoKey: "hecarim:ghost" });
            for (const s of self.statuses) if (s.memoKey === "hecarim:ghost") s.endTick = Number(ctx.memory.chargeUntil);
          }
          // Onslaught of Shadows' slow: from the enemy's distance, for as long as its fear holds.
          const enemy = ctx.enemy;
          const slow = enemy.statuses.find((s) => s.memoKey === "hecarim:dread" && s.source === self.side);
          if (slow) {
            const feared = enemy.statuses.some((s) => s.kind === "cc" && s.key === "fear" && s.source === self.side && s.ability === "Rfear" && s.endTick > ctx.tick);
            if (!feared) enemy.statuses = enemy.statuses.filter((s) => s !== slow);
            else slow.value = -fearSlow(Math.abs(enemy.x - self.x));
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.rampageCast = Number(ctx.memory.rampageCast ?? 0) + 1;
            ctx.memory.rampageHitStacks = rampage(ctx.self);
          }
          if (ctx.ability.key === "E2") {
            // Toward where the enemy stands now: the dash doesn't follow it.
            ctx.memory.chargeGap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
            ctx.memory.chargeAt = traveledOf(ctx.self);
          }
          if (ctx.ability.key === "R") ctx.memory.onslaughtFrom = ctx.self.x;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") ctx.memory.dreadUntil = ctx.tick + ticks(dreadSeconds);
          if (key === "E") {
            ctx.memory.chargeStart = ctx.tick;
            ctx.memory.chargeUntil = ctx.tick + ticks(runSeconds);
            ctx.memory.chargePaused = 0;
            ctx.memory.chargeTraveled = 0;
            ctx.memory.chargeX = ctx.self.x;
            ctx.memory.chargeDisplaced = false;
            delete ctx.memory.chargeAt;
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q") {
            // Rampage's 60% against a summon its pet data classes as a minion.
            const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((p) => p.id === ctx.enemy.petId);
            if (pet?.spec.targetClass !== "minion") return;
            return ctx.effects.map((effect) => (effect.type === "damage" ? { ...effect, amountFor: (self: Unit, target: Unit) => (effect.amountFor?.(self, target) ?? evaluate(effect.amount, self, target)) * minionShare } : effect));
          }
          if (ctx.ability.key !== "E2") return;
          // Its knock back by the distance he had traveled.
          const far = seriesAt(knockback, chargedFrom(ctx.self), true);
          return ctx.effects.map((effect) => (effect.type === "displace" ? { ...effect, distance: far } : effect));
        },
        onAbilityHit(ctx) {
          // The charge spends the run-up; one that misses keeps it.
          if (ctx.ability.key === "E2") endRun(ctx);
          // Rampage's stack for hitting an enemy pet (the champion's comes with its damage).
          if (ctx.ability.key === "Q" && ctx.enemy.petId !== undefined) stackRampage(ctx);
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "R") return;
          // The fear on arrival, longer the farther he dashed, and the slow by distance.
          ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "displacementImmune" && s.source === ctx.self.side && s.ability === "R"));
          const traveled = Math.abs(ctx.self.x - Number(ctx.memory.onslaughtFrom ?? ctx.self.x));
          const enemy = ctx.enemy;
          if (Math.abs(enemy.x - ctx.self.x) > fearRadius + EPSILON) return;
          const fear = seriesAt(fearSeries, traveled, true);
          abilityHit(ctx.world, ctx.self, enemy, fearSpec, [{ type: "cc", cc: "fear", duration: fear }]);
          const held = enemy.statuses.find((s) => s.kind === "cc" && s.key === "fear" && s.source === ctx.self.side && s.ability === "Rfear" && s.endTick > ctx.tick);
          if (held) enemy.statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: held.endTick, value: -fearSlow(Math.abs(enemy.x - ctx.self.x)), memoKey: "hecarim:dread" });
        },
        onDamageDealt(ctx) {
          // Spirit of Dread heals for a share of the damage he deals to the enemy in its area.
          if (ctx.petSource) return;
          if (ctx.tick < dreadUntil(ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= dreadRadius + EPSILON) heal(ctx.world, ctx.self, ctx.mitigated * dreadHeal);
          // Rampage's stacks when it damages the enemy.
          if (ctx.ability === q.name) stackRampage(ctx);
        },
      },
    };
  },
};
export default hecarim;
