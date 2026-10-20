/** Corki's current (post-Package) maximum-rank kit, pinned to dataset 16.20. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON, inAttackRange, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

interface Patch { x: number; end: number }
const SPRAY = "corki:spray", TRAIL = "corki:trail";
const corki: KitModule = {
  champion: "Corki",
  build(kit) {
    const p = kit.ability("Hextech Munitions"), q = kit.ability("Phosphorus Bomb"), w = kit.ability("Valkyrie"), e = kit.ability("Gatling Gun"), r = kit.ability("Missile Barrage");
    const passiveRatio = p.quoted("bonus true damage equal to 20% AD") / 100;
    p.quote("This damage is affected by critical strike modifiers"); p.quote("The true damage is dealt in an instance before the physical damage"); p.quote("The attack applies on-hit effects only once, right at the start");
    p.quote("Both instances deal basic damage and thus natively apply life steal");
    const qDamage = q.formula("Magic Damage"), qRange = q.field("targetRange"), qRadius = q.fieldNumbers("effectRadius")[0]!, qSpeed = q.field("speed"), qMinimum = q.quoted("minimum travel time of 0.227 seconds"), qSight = q.quoted("impact area for 6 seconds");
    const wDamage = w.formula("Magic Damage Per Tick"), wDuration = w.quoted("Each patch lasts 2.5 seconds"), wInterval = w.quoted("every 0.5 seconds"), wLinger = w.quoted("lingering for 1 second"), wMaxPatches = w.quoted("up to 3 blazing patches"), wRadius = w.field("effectRadius");
    const wMin = w.gameQuoted("mSpell.DataValues.MinimumRange.values: [300.0,300.0,300.0,300.0,300.0,300.0,300.0]"), wMax = w.gameQuoted("mSpell.DataValues.MaximumRange.values: [600.0,600.0,600.0,600.0,600.0,600.0,600.0]");
    const dashBase = w.gameQuoted("mSpell.DataValues.DashSpeedBase.values: [650.0,650.0,650.0,650.0,650.0,650.0,650.0]"), dashRatio = w.gameQuoted("mSpell.DataValues.DashSpeedRatio.values: [1.0,1.0,1.0,1.0,1.0,1.0,1.0]");
    w.quote("Gatling Gun can be cast during the dash");
    const eDamage = e.formula("Physical Damage Per Tick"), eDuration = e.quoted("facing direction for 4 seconds"), eInterval = e.quoted("every 0.25 seconds"), eLinger = e.quoted("same tick rate for 2 seconds"), eMax = e.quoted("stacking up to 4 times"), eShred = e.number("Resistances Reduction Per Stack"), eRange = e.field("effectRadius");
    e.quote("The maximum resistances reduction is applied after 4 ticks (1 second)"); e.quote("The direction of the gun firing changes depending on where Corki is facing");
    const rDamage = r.formula("Physical Damage"), rBig = r.formula("Big One Physical Damage"), rMaxAmmo = r.quoted("maximum of 4"), rCooldown = r.cooldown(), rRecharge = r.field("recharge"), rSpeed = r.field("speed"), rWidth = r.field("width");
    const rRange = r.field("targetRange", "Standard missile range"), rBigRange = r.field("targetRange", "Big One missile range"), rRadius = r.field("effectRadius", "Standard explosion radius"), rBigRadius = r.field("effectRadius", "Big One explosion radius");
    r.quote("Every third missile Corki fires is a Big One"); r.quote("Corki retains progress towards a Big One when he dies"); r.quote("This ability will cast from wherever the caster is at the start of the cast time");
    r.gameQuote('"mMultiplier":{"mDataValue":"CDReductionOnHit","__type":"NamedDataValueCalculationPart"},"mFormulaParts":[{"mNumber":1.0,"__type":"NumberCalculationPart"},{"mStat":8,"mCoefficient":2.0,"__type":"StatByCoefficientCalculationPart"}]');
    const refundBase = r.quoted("by 2 / 2.4 / 2.8"), refundCrit = r.gameQuoted('"mStat":8,"mCoefficient":2.0', 1);
    const qCooldown = q.cooldown(), qCast = q.castTime(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCast = r.castTime();
    kit.assume("The current Hextech Munitions passive adds 20% total AD as true basic damage before the ordinary physical packet, with the attack's critical chance and ordinary life steal. Its on-hit packet runs once before both damage packets. The arena has no purchased item passives, so the specifically named Spellblade and Runaan interactions are outside its stat-only loadout. Normal lethal-packet resolution stops subsequent damage against a dead target; it does not log post-mortem overkill.");
    kit.assume("Missile Barrage starts with all four charges as a fresh level-20 spawn, zero Big One progress, and replenishes one charge per haste-adjusted 20 seconds. Champion on-hit contacts refund 2 × (1 + 2 × critical chance) seconds from the active recharge, including attack damage blocks but excluding blind/dodge/parry and pets. Every third cast uses the separately sourced Big One range, damage and splash. The pinned wiki's 150-unit ordinary splash is retained over the game's conflicting 200-unit tooltip value.");
    kit.assume("Phosphorus Bomb flies for max(0.227 seconds, center distance / 1100) after the cast and can be destroyed in flight. Its six-second reveal is ordinary sight, not true sight: no map fog exists in this arena and it does not expose invisibility. Its area uses the common expected sidestep model without inventing a lateral landing position.");
    kit.assume("Valkyrie uses the pinned 300–600 distance and 650 + total movement-speed dash. The source does not specify patch center spacing: this one-axis trail places up to three radius-200 patches at equal 200-unit milestones, starting at the dash origin, for 2.5 seconds each. Their damage never stacks on overlapping patches. All patches refresh one shared one-second burn debuff on contact without resetting its half-second clock; the first tick is one interval after entry. The independent fields and applied burn persist after Corki dies. This explicitly includes lingering damage beyond the wiki's nominal five-tick total; the game MaximumTicks tooltip is not treated as proof that the lingering debuff stops after five ticks. Wall crossing uses the arena's clear-endpoint approximation.");
    kit.assume("Gatling Gun remains active while Corki acts or is crowd controlled, follows his current facing, and hits enemies whose hitbox overlaps the forward 690-unit cone segment. Sixteen pulses use cumulative quarter-second rounding, first at 0.25 seconds and last at four seconds. Resistance reduction is applied after each pulse's damage, caps at four expected stacks, and all stacks refresh together for two seconds. The cone's angular and close-behind geometry is reduced to a directed segment.");
    kit.assume("The policy weaves in-range attacks, prioritizes Gatling Gun during an available attack cooldown and preserves defensive Valkyrie choices. Its sustained stat reference assumes connected attacks and a fully occupied Gatling Gun, one nominal five-tick Valkyrie burn per cooldown, and ammo-limited Missile Barrage with a one-third Big One share; actual occupancy, catches, mana and avoidance are simulated separately.");

    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: qCast, delivery: { kind: "self" }, flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage"], estimate: (self, target) => evaluate(qDamage, self, target), estimateDelay: (self, target) => Math.max(qMinimum, Math.min(qRange, Math.abs(self.x - target.x)) / qSpeed), usable: (self, world) => Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= qRange + qRadius + world.units[self.side === 0 ? 1 : 0].spec.base.radius + EPSILON },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "dash", direction: "away", distance: wMax, minDistance: wMin, speed: dashBase, speedFor: (self) => dashBase + dashRatio * derive(self).moveSpeed, crossTerrain: true, through: true }, flags: { projectile: false, spellShield: false, grounded: true, knockdown: true }, roles: ["escape", "damage"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, flags: { projectile: false, spellShield: false }, roles: ["damage"], estimate: (self, target) => evaluate(eDamage, self, target), usable: (self, world) => Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= eRange + world.units[self.side === 0 ? 1 : 0].spec.base.radius + EPSILON },
      ...([false, true] as const).map((big): AbilitySpec => ({ key: big ? "Rbig" : "R", name: big ? `${r.name} (Big One)` : r.name, slot: "R", cooldown: rCooldown, cooldownKey: "R", cost: r.cost(), castTime: rCast, castOrigin: "start", castDirection: "start", charges: { max: rMaxAmmo, recharge: rRecharge }, budgetExcluded: true, persistsAfterDeath: true, delivery: { kind: "line", range: big ? rBigRange : rRange, width: rWidth, speed: rSpeed, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: big ? rBig : rDamage, petDamageCategory: "area" }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: (self) => (Number(self.memory["corki:missiles"] ?? 0) % 3 === 2) === big })),
      { key: "Qimpact", persistsAfterDeath: true, name: q.name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage, petDamageCategory: "area" }], flags: { projectile: false, spellShield: true, petContactHooks: true }, usable: () => false, roles: [] },
      { key: "Wpatch", persistsAfterDeath: true, name: w.name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "dot", damageType: "magic", total: scaled(wDamage, wLinger / wInterval), duration: wLinger, interval: wInterval }], flags: { projectile: false, spellShield: false, petContactHooks: true }, usable: () => false, roles: [] },
      { key: "Epulse", name: e.name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: eDamage, persistent: true, petDamageCategory: "persistent" }], flags: { projectile: false, spellShield: false, petContactHooks: true }, usable: () => false, roles: [] },
    ];
    const packet = (key: string) => abilities.find((a) => a.key === key)!;
    const targets = (ctx: HookContext): Array<{ unit: Unit; pet?: Pet }> => [{ unit: ctx.world.units[ctx.self.side === 0 ? 1 : 0] }, ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ unit: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const hit = (ctx: HookContext, target: { unit: Unit; pet?: Pet }, ability: AbilitySpec, scale = 1) => target.pet ? abilityHitPet(ctx.world, ctx.self, target.pet, ability, ability.onHit ?? [], "area") : abilityHit(ctx.world, ctx.self, target.unit, ability, ability.onHit ?? [], scale);
    const addPatches = (ctx: HookContext) => {
      if (ctx.memory[`${TRAIL}:origin`] === undefined) return;
      const origin = Number(ctx.memory[`${TRAIL}:origin`]), direction = Number(ctx.memory[`${TRAIL}:direction`]), traveled = Math.abs(ctx.self.x - origin), patches = JSON.parse(String(ctx.memory[TRAIL] ?? "[]")) as Patch[];
      let made = Number(ctx.memory[`${TRAIL}:made`] ?? 0);
      while (made < wMaxPatches && made * (wMax / wMaxPatches) <= traveled + 1e-6) { const patch = { x: origin + direction * made * (wMax / wMaxPatches), end: ctx.tick + ticks(wDuration) }; patches.push(patch); ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", seenTick: ctx.tick, x: patch.x, radius: wRadius, startTick: ctx.tick, endTick: patch.end, nextTick: ctx.tick, interval: 1, ability: "Wpatch", onHit: packet("Wpatch").onHit }); made++; }
      ctx.memory[TRAIL] = JSON.stringify(patches); ctx.memory[`${TRAIL}:made`] = made;
    };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && (command.ability === "W" || command.dodge !== undefined)) return command;
      if ((view.mode === "fight" || view.mode === "trade") && !view.self.action && inAttackRange(view.self, view.enemy) && view.self.attackReadyTick > view.world.tick && canCast(view.world, view.self, packet("E"))) return { kind: "cast", ability: "E" };
      return command;
    };
    const refund = (ctx: HookContext) => { const stock = ctx.self.charges.R; if (stock && stock.count < rMaxAmmo && Number.isFinite(stock.nextTick)) stock.nextTick = Math.max(ctx.tick, stock.nextTick - ticks(refundBase * (1 + refundCrit * derive(ctx.self).critChance))); };
    return { abilities, behavior, attack: { onHitToPets: true, onHitBeforeDamage: true, beforeDamage: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { AD: passiveRatio } }, canCrit: true, label: p.name }] },
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, rate = Math.min(1 / (rCooldown / haste + rCast), (haste + refundBase * (1 + refundCrit * d.critChance) * d.attackSpeed) / rRecharge); return { physical: evaluate(eDamage, self, target) * (eDuration / eInterval) / (eCooldown / haste) + evaluate(rDamage, self, target) * (4 / 3) * rate, magic: evaluate(wDamage, self, target) * (wDuration / wInterval) / (wCooldown / haste + wMin / (dashBase + d.moveSpeed)) + evaluate(qDamage, self, target) / (qCooldown / haste + qCast) }; } },
      hooks: {
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const direction = directionTo(ctx.self, ctx.enemy), distance = Math.max(0, Math.min(qRange, ctx.aim?.distance ?? Math.abs(ctx.self.x - ctx.enemy.x))), x = ctx.self.x + direction * (ctx.aim?.direction ?? 1) * distance, flight = Math.max(qMinimum, distance / qSpeed), span = Math.max(1, ticks(flight));
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(qCast), flight, qRadius), zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, seenTick: ctx.tick - ticks(qCast), x, radius: qRadius, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, ability: "Qimpact", onHit: packet("Qimpact").onHit!, connects: chance > .02, scale: chance >= .98 ? 1 : chance };
            ctx.world.zones.push(zone); if (distance <= 1e-6) zone.endTick = ctx.tick + span; else ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Q", seenTick: zone.seenTick, x: ctx.self.x, perTick: distance / span, homing: false, direction: x >= ctx.self.x ? 1 : -1, travelLeft: distance, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
          }
          if (ctx.ability.key === "E") { ctx.memory[SPRAY] = ctx.tick; ctx.memory[`${SPRAY}:done`] = 0; ctx.self.facing = directionTo(ctx.self, ctx.enemy); }
          if (ctx.ability.key === "W") { ctx.memory[`${TRAIL}:origin`] = ctx.self.x; ctx.memory[`${TRAIL}:direction`] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? -1); ctx.memory[`${TRAIL}:made`] = 0; addPatches(ctx); }
          if (ctx.ability.key === "R" || ctx.ability.key === "Rbig") ctx.memory["corki:missiles"] = Number(ctx.memory["corki:missiles"] ?? 0) + 1;
        },
        onDashEnd(ctx) { if (ctx.ability.key === "W") { addPatches(ctx); delete ctx.memory[`${TRAIL}:origin`]; } },
        onAttackHit(ctx) { refund(ctx); },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Qimpact") ctx.apply({ type: "mark", key: "corki:ordinarySight", duration: qSight });
          if (ctx.ability.key === "Epulse") { const key = `${SPRAY}:${ctx.self.side}`, prior = ctx.tick < Number(ctx.enemy.memory[`${key}:until`] ?? -1) ? Number(ctx.enemy.memory[key] ?? 0) : 0, count = Math.min(eMax, prior + ctx.scale); ctx.enemy.memory[key] = count; ctx.enemy.memory[`${key}:until`] = ctx.tick + ticks(eLinger); for (const stat of ["armorReduction", "mrReduction"] as const) ctx.apply({ type: "stat", stat, amount: { base: count * eShred }, duration: eLinger }); }
        },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "R" && ctx.missile.source !== "Rbig") return;
          const ability = packet(ctx.missile.source), radius = ctx.missile.source === "Rbig" ? rBigRadius : rRadius;
          for (const target of targets(ctx)) {
            if (target.pet ? target.pet.id === ctx.targetPet?.id : !ctx.targetPet) continue;
            if (Math.abs(target.unit.x - ctx.missile.x) > radius + target.unit.spec.base.radius + 1e-6) continue;
            // Summons intercept independently of the champion's sidestep branch.
            // The collateral explosion has its own wider reach and impact time.
            const chance = target.pet ? 1 : skillshotChance(ctx.world, target.unit, ctx.missile.seenTick, 0, radius);
            if (chance > .02) hit(ctx, target, ability, chance >= .98 ? 1 : chance);
          }
        },
        onTick(ctx) {
          if (ctx.memory[`${TRAIL}:origin`] !== undefined && ctx.self.action?.kind === "dash" && ctx.self.action.ability === "W") addPatches(ctx);
          const patches = (JSON.parse(String(ctx.memory[TRAIL] ?? "[]")) as Patch[]).filter((patch) => patch.end > ctx.tick); if (patches.length || ctx.memory[TRAIL]) ctx.memory[TRAIL] = JSON.stringify(patches);
          if (ctx.memory[SPRAY] === undefined) return;
          const start = Number(ctx.memory[SPRAY]); let done = Number(ctx.memory[`${SPRAY}:done`] ?? 0);
          while (done < eDuration / eInterval && ctx.tick >= start + ticks((done + 1) * eInterval)) { done++; const direction = ctx.self.facing ?? directionTo(ctx.self, ctx.enemy); for (const target of targets(ctx)) { const forward = (target.unit.x - ctx.self.x) * direction; if (forward + target.unit.spec.base.radius >= -1e-6 && forward - target.unit.spec.base.radius <= eRange + 1e-6) hit(ctx, target, packet("Epulse")); } }
          ctx.memory[`${SPRAY}:done`] = done; if (done >= eDuration / eInterval) delete ctx.memory[SPRAY];
        },
      },
    };
  },
};
export default corki;
