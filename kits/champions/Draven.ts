/** Draven's maximum-rank axe, catch, and independently returning ultimate packets. */
import type { KitModule } from "../../engine/kits/compile";
import { capAttackSpeed } from "../../engine/rules/timing";
import { canCast, EPSILON, inAttackRange, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Missile } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

interface Catch { x: number; due: number }
const AXES = "draven:axes", CATCHES = "draven:catches", ADORATION = "draven:adoration", RUSH = "draven:rush", AXE = "draven:spinning";
const draven: KitModule = {
  champion: "Draven",
  options: { adoration: { label: "Adoration stacks before the duel", default: 0 } },
  build(kit, options) {
    const p = kit.ability("League of Draven"), q = kit.ability("Spinning Axe"), w = kit.ability("Blood Rush"), e = kit.ability("Stand Aside"), r = kit.ability("Whirling Death");
    p.quote("When Draven catches a Spinning Axe, kills a non-champion, or destroys a turret, he gains a stack of Adoration");
    const cashBase = p.quoted("gains 25 + (2 × stacks) bonus gold", 0), cashPer = p.quoted("gains 25 + (2 × stacks) bonus gold", 1), deathLoss = p.quoted("loses 50% of his Adoration stacks") / 100;
    const qDamage = q.formula("Bonus Physical Damage"), axeWindow = q.quoted("within 5.8 seconds"), catchDelay = q.quoted("land after roughly 1.4 seconds"), maxHeld = 2;
    q.quote("Draven can hold up to two Spinning Axes at once"); q.quote("Recasting Spinning Axe will refresh the buff and add another axe if possible"); q.quote("The axe will still bounce against parrying effects"); q.quote("Spinning Axe attacks deal their total increased damage in a single instance of basic damage"); q.quote("If a Spinning Axe is readied during a basic attack wind-up, the effects will be applied to the fired attack"); q.quote("they will be destroyed upon collision");
    const axeSpeed = q.gameQuoted('"mSpeed":1700.0');
    const attackSpeed = w.number("Bonus Attack Speed") / 100, moveSpeed = w.number("Bonus Movement Speed") / 100, speedSeconds = w.quoted("attack speed for 3 seconds"), moveSeconds = w.quoted("ghosting for 1.5 seconds");
    w.quote("Catching a Spinning Axe resets Blood Rush's cooldown"); w.quote("while the effect is already active will refresh the duration");
    const eDamage = e.formula("Physical Damage"), eSlow = e.number("Slow") / 100, slowSeconds = e.quoted("slowing them for 2 seconds"), displacementSeconds = e.gameQuoted("mSpell.DataValues.KnockbackDuration.values: [0.5,0.5,0.5,0.5,0.5,0.5,0.5]");
    e.quote("knocking them aside, though not through terrain");
    const rDamage = r.formula("Physical Damage"), rSpeed = r.field("speed"), rWidth = r.field("width"), rRecast = r.quoted("recast after 1 second"), rFloor = r.formula("Minimum Physical Damage").base / rDamage.base, rFalloff = r.quoted("100 / 95 / 90.25", 1) / 100;
    r.quote("Enemy champions that are damaged to or while below a health threshold equal to the number of Adoration stacks are executed"); r.quote("100 / 95 / 90.25"); r.quote("resetting upon reversing direction"); r.quote("Enemies can be hit only once per pass"); r.quote("Spell shield will block one instance of damage");
    const rRange = r.gameQuoted("mSpell.castRange: [25000.0,25000.0,25000.0,25000.0,25000.0,25000.0,25000.0]"), rAcceleration = r.gameQuoted('"mAcceleration":4500.0');
    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown(), rCast = r.castTime();
    kit.assume("Spinning Axe starts unprimed. Q can ready up to two held axes and refreshes their shared 5.8-second lifetime; an attack consumes one at launch, so Q during a retained windup empowers that fired attack. Its 60 + 115% bonus AD is a non-critical addition inside the same ordinary physical basic packet. The separately sourced 1700 missile speed is used for an empowered axe; the game also contains older 1600-speed attack-animation wrappers.");
    kit.assume("Each axe contact schedules an independently catchable landing 1.4 seconds later, following the pinned wiki over the conflicting 1.2-second raw return-missile field. Stationary Draven's landing is his current center; while actually moving it is one 1.4-second movement projection ahead. Catching requires his gameplay hitbox to cover that center at the landing tick. The source does not pin a catch radius or precise landing projection; this is an explicit one-dimensional approximation, and the policy does not leave a safe attack position to optimize catches. Parry still returns the axe; blindness/dodge conservatively lose it. Projectile-wall destruction creates no landing. Movement changes, immobilization and displacement can therefore make a catch fail.");
    kit.assume("Blood Rush grants the sourced 40% attack speed for three seconds. Its 70% movement-speed bonus decays linearly to zero over 1.5 seconds and grants ghosting for that duration. The precise decay curve is not specified by the wiki; the client Temp_MSDecay is not used to assert server script timing. Successful catches reset its entire cooldown, even when the held-axe limit prevents another held empowerment.");
    kit.assume("Adoration begins at the explicit configurable stack count, default zero, gains one per successful catch and per actual enemy-summon kill, and cashes out only on a champion kill. Bonus gold is recorded without buying stats mid-duel. Its death loss is modeled at the lethal notification. Shared Riches, lane minions, turrets and team assists do not exist in this arena.");
    kit.assume("Stand Aside's sourced half-second sideways displacement becomes half a second of airborne interruption with zero longitudinal travel in the one-axis arena. Its two-second slow, spell shield, parry and displacement-immunity guards remain independent. No unsourced sideways distance or wall crossing is invented.");
    kit.assume("Whirling Death travels the pinned finite 25000-unit global range, pierces health-based enemy summons, and reverses on geometric champion contact, including a spell-shielded contact, or range/recast. The axes decelerate at the game's 4500 units/s² on the original line, then accelerate at that rate up to 2000 while following Draven's current position. Thirty-Hz integration rounds this turnaround rather than reproducing sub-tick server motion. Damage drops multiplicatively by 5% per contacted unit to a 50% floor, independently resets for the return pass, and each target can be hit once per pass. Ordinary sight/minimap information has no fog-of-war effect.");
    kit.assume("The policy primes Q before an available basic attack, refreshes Blood Rush while fighting, and preserves default defensive responses. The sustained reference values the lesser of attack speed and two continuously juggled axes per attack-flight-plus-return cycle, capped bonus attack speed at full catch-supported uptime, and two complete ultimate passes per cooldown. It assumes successful catches and target occupancy as a stat valuation, not a guarantee of the actual simulated result.");

    const rPacket: AbilitySpec = { key: "Raxe", persistsAfterDeath: true, name: r.name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "line", range: rRange, width: rWidth, speed: rSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage, petDamageCategory: "area" }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: () => false, roles: [] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, roles: ["buff"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: w.cost(), castTime: w.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: attackSpeed }, duration: speedSeconds }, { type: "state", state: "ghosted", duration: moveSeconds }], roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "line", range: e.field("targetRange"), width: e.field("width"), speed: e.field("speed"), piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: eDamage, petDamageCategory: "area" }, { type: "displace", direction: "away", distance: 0, duration: displacementSeconds, stopAtWall: true }, { type: "cc", cc: "slow", duration: slowSeconds, strength: eSlow }], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: r.cost(), castTime: rCast, delivery: { kind: "self" }, roles: ["damage"], flags: { projectile: true, spellShield: true }, estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: (self, target) => Math.max(0, Math.abs(target.x - self.x) - target.spec.base.radius) / rSpeed, usable: (self, world) => Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= rRange + EPSILON },
      { key: "Rreturn", name: `${r.name} (reverse)`, slot: "R", cooldown: 0, castTime: 0, delivery: { kind: "self" }, chain: { root: "R", index: 2, window: rRange / rSpeed + 1, delay: rRecast }, budgetExcluded: true, roles: [], usable: (self, world) => world.missiles.some((m) => m.owner === self.side && m.source === "Raxe" && !m.followOwner && self.memory[`draven:r:${m.id}:phase`] === "out") },
      rPacket,
    ];
    const qAbility = abilities[0]!, wAbility = abilities[1]!;
    const held = (ctx: HookContext) => ctx.tick < Number(ctx.memory[`${AXES}:until`] ?? -1) ? Number(ctx.memory[AXES] ?? 0) : 0;
    const beginReturn = (ctx: HookContext, missile: Missile) => {
      if (missile.followOwner || ctx.memory[`draven:r:${missile.id}:phase`] === "braking") return;
      ctx.memory[`draven:r:${missile.id}:phase`] = "braking"; missile.travelLeft = Number.POSITIVE_INFINITY; missile.acceleration = { perTick: -rAcceleration / 900, minPerTick: 0, maxPerTick: rSpeed / 30 };
    };
    const finishReturn = (ctx: HookContext, missile: Missile) => {
      ctx.memory[`draven:r:${missile.id}:phase`] = "return"; ctx.memory[`draven:r:${missile.id}:hits`] = 0;
      missile.followOwner = true; missile.hitTargets = []; missile.hitPets = []; missile.travelLeft = Number.POSITIVE_INFINITY; missile.onHit = rPacket.onHit!;
      missile.perTick = rAcceleration / 900; missile.acceleration = { perTick: rAcceleration / 900, maxPerTick: rSpeed / 30 };
      const travel = Math.abs(ctx.enemy.x - missile.x) / rSpeed, chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, travel, rWidth / 2);
      missile.connects = chance > .02; missile.scale = chance >= .98 ? 1 : chance;
    };
    const behavior: Behavior = (view) => {
      const axesAvailable = view.world.tick < Number(view.self.memory[`${AXES}:until`] ?? -1) ? Number(view.self.memory[AXES] ?? 0) : 0;
      const rushExpired = view.world.tick >= Number(view.self.memory[`${RUSH}:start`] ?? -ticks(speedSeconds)) + ticks(speedSeconds);
      // Active buffs may legally be refreshed. Reserve that choice for explicit casts;
      // ordinary combat waits for a useful extra axe or the next attack-speed window.
      const policyAbilities = view.self.spec.abilities.filter((ability) => (ability.key !== "Q" || axesAvailable < maxHeld) && (ability.key !== "W" || rushExpired));
      const command = defaultBehavior({ ...view, self: { ...view.self, spec: { ...view.self.spec, abilities: policyAbilities } } });
      if (command?.kind === "cast" && command.dodge !== undefined) return command;
      if ((view.mode === "fight" || view.mode === "trade") && inAttackRange(view.self, view.enemy)) {
        if (canCast(view.world, view.self, qAbility) && (Number(view.self.memory[AXES] ?? 0) < 1 || view.world.tick >= Number(view.self.memory[`${AXES}:until`] ?? -1))) return { kind: "cast", ability: "Q" };
        if (rushExpired && canCast(view.world, view.self, wAbility)) return { kind: "cast", ability: "W" };
      }
      return command;
    };
    return { abilities, behavior, attack: { onHitToPets: true },
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, improved = capAttackSpeed(d.attackSpeed + self.spec.base.attackSpeed.ratio * attackSpeed), extra = Math.max(0, improved - d.attackSpeed), flight = Math.max(0, self.spec.attack.range - target.spec.base.radius) / axeSpeed, axeRate = Math.min(improved, maxHeld / (catchDelay + flight)); return { physical: axeRate * evaluate(qDamage, self, target) + extra * d.ad * (1 + d.critChance * (d.critDamage - 1)) + 2 * evaluate(rDamage, self, target) / (rCooldown / haste + rCast) }; } },
      hooks: {
        onStart(ctx) { ctx.memory[ADORATION] = Number.isFinite(options.adoration) ? Math.max(0, Math.floor(options.adoration ?? 0)) : 0; ctx.memory[AXES] = 0; ctx.memory[`${RUSH}:start`] = -ticks(speedSeconds); },
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory[AXES] = Math.min(maxHeld, held(ctx) + 1); ctx.memory[`${AXES}:until`] = ctx.tick + ticks(axeWindow); }
          if (ctx.ability.key === "W") { ctx.memory[`${RUSH}:start`] = ctx.tick; ctx.buff(RUSH, "moveSpeedPercent", moveSpeed, moveSeconds); }
          if (ctx.ability.key === "R") { const direction = directionTo(ctx.self, ctx.enemy), travel = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius) / rSpeed, chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(rCast), travel, rWidth / 2), missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Raxe", seenTick: ctx.tick - ticks(rCast), x: ctx.self.x, perTick: rSpeed / 30, piercing: true, collisionPet: true, homing: false, direction, travelLeft: rRange, projectile: true, connects: chance > .02, scale: chance >= .98 ? 1 : chance, onHit: rPacket.onHit! }; ctx.memory[`draven:r:${missile.id}:phase`] = "out"; ctx.memory[`draven:r:${missile.id}:hits`] = 0; ctx.world.missiles.push(missile); }
          if (ctx.ability.key === "Rreturn") for (const missile of ctx.world.missiles) if (missile.owner === ctx.self.side && missile.source === "Raxe") beginReturn(ctx, missile);
        },
        onAttackLaunch(ctx) { const count = held(ctx); if (count < 1) return; ctx.memory[AXES] = count - 1; ctx.action.bonusPhysical = qDamage; ctx.action.missileSpeed = axeSpeed; ctx.action.attackTag = AXE; },
        onMissileContact(ctx) {
          const missile = ctx.missile;
          if (missile.attack?.attackTag === AXE) {
            if (missile.attack.blinded || hasState(ctx.enemy, "dodgeAttacks")) return;
            const catches = JSON.parse(String(ctx.memory[CATCHES] ?? "[]")) as Catch[], moving = ctx.self.moved !== 0 && !ctx.self.forced, direction = directionTo(ctx.self, ctx.enemy) * ctx.self.moved;
            catches.push({ x: ctx.self.x + (moving ? direction * derive(ctx.self).moveSpeed * catchDelay : 0), due: ctx.tick + ticks(catchDelay) }); ctx.memory[CATCHES] = JSON.stringify(catches);
          }
          if (missile.source !== "Raxe") return;
          const key = `draven:r:${missile.id}:hits`, hits = Number(ctx.memory[key] ?? 0) + 1; ctx.memory[key] = hits; missile.onHit = [{ type: "damage", damageType: "physical", amount: scaled(rDamage, Math.max(rFloor, rFalloff ** hits)), petDamageCategory: "area" }];
          if (!ctx.targetPet && !missile.followOwner) beginReturn(ctx, missile);
        },
        onMissileTick(ctx) { if (ctx.missile.source === "Raxe" && ctx.memory[`draven:r:${ctx.missile.id}:phase`] === "braking" && ctx.missile.perTick <= 1e-6) finishReturn(ctx, ctx.missile); },
        onMissileEnd(ctx) { if (ctx.missile.source === "Raxe" && ctx.reason === "range" && !ctx.missile.followOwner && ctx.memory[`draven:r:${ctx.missile.id}:phase`] === "out" && ctx.tick < (ctx.missile.expiresTick ?? Infinity)) { ctx.missile.ended = false; beginReturn(ctx, ctx.missile); ctx.world.missiles.push({ ...ctx.missile, id: ctx.world.nextId++ }); const replacement = ctx.world.missiles.at(-1)!; ctx.memory[`draven:r:${replacement.id}:phase`] = "braking"; } },
        onAbilityHit(ctx) {
          // The pet effect path has no forced-movement implementation. Opt its
          // zero-longitudinal-distance interruption into the ordinary CC guards.
          if (ctx.ability.key === "E" && ctx.enemy.petId !== undefined && !hasState(ctx.enemy, "displacementImmune") && !hasState(ctx.enemy, "ccImmune")) ctx.apply({ type: "cc", cc: "airborne", duration: displacementSeconds });
          if (ctx.ability.key === "Raxe" && ctx.enemy.petId === undefined) ctx.apply({ type: "execute", threshold: { base: Number(ctx.memory[ADORATION] ?? 0) } });
        },
        onKill(ctx) { if (ctx.pet) ctx.memory[ADORATION] = Number(ctx.memory[ADORATION] ?? 0) + 1; else { ctx.memory["draven:gold"] = Number(ctx.memory["draven:gold"] ?? 0) + cashBase + cashPer * Number(ctx.memory[ADORATION] ?? 0); ctx.memory[ADORATION] = 0; } },
        onLethal(ctx) { ctx.memory[ADORATION] = Math.floor(Number(ctx.memory[ADORATION] ?? 0) * (1 - deathLoss)); return false; },
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory[`${AXES}:until`] ?? -1)) ctx.memory[AXES] = 0;
          const elapsed = ctx.tick - Number(ctx.memory[`${RUSH}:start`] ?? -ticks(speedSeconds)); if (elapsed >= 0 && elapsed < ticks(moveSeconds)) ctx.buff(RUSH, "moveSpeedPercent", moveSpeed * Math.max(0, 1 - elapsed / ticks(moveSeconds)), (ticks(moveSeconds) - elapsed) / 30);
          const catches = JSON.parse(String(ctx.memory[CATCHES] ?? "[]")) as Catch[];
          if (catches.some((item) => item.due <= ctx.tick)) { ctx.memory[CATCHES] = JSON.stringify(catches.filter((item) => item.due > ctx.tick)); for (const item of catches) if (item.due <= ctx.tick && Math.abs(ctx.self.x - item.x) <= ctx.self.spec.base.radius + 1e-6 && !hasState(ctx.self, "stasis")) { ctx.memory[AXES] = Math.min(maxHeld, held(ctx) + 1); ctx.memory[`${AXES}:until`] = ctx.tick + ticks(axeWindow); ctx.memory[ADORATION] = Number(ctx.memory[ADORATION] ?? 0) + 1; ctx.self.cooldownReady.W = ctx.tick; ctx.log("catches Spinning Axe"); } }

        },
      },
    };
  },
};
export default draven;
