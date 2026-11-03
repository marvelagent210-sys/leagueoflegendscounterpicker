/** Ezreal's maximum-rank kit, read from the pinned revisions. */
import type { KitModule } from "../../engine/kits/compile";
import { capAttackSpeed } from "../../engine/rules/timing";
import { canCast, inAttackRange, inReach } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { counter, ticks } from "./util";

const FLUX = "ezreal:flux";
const FORCE = "ezreal:force";

const ezreal: KitModule = {
  champion: "Ezreal",
  build(kit) {
    const p = kit.ability("Rising Spell Force"), q = kit.ability("Mystic Shot"), w = kit.ability("Essence Flux"), e = kit.ability("Arcane Shift"), r = kit.ability("Trueshot Barrage");
    const forceSeconds = p.quoted("lasting for 6 seconds"), forceMax = p.quoted("stacking up to 5 times"), forceAS = p.quoted("gains 10% bonus attack speed") / 100;
    p.quote("Rising Spell Force will stack even if the abilities hit were blocked by spell shields");
    const refund = q.quoted("reduced by 1.5 seconds");
    q.quote("applying on-hit effects and triggering on-attack effects");
    q.quote("Mystic Shot deals basic damage, but also triggers spell effects by also being tagged as spell damage");
    q.quote("Mystic Shot benefits from life steal, omnivamp, and physical vamp, but not spell vamp");
    q.quote("Even if the ability is blocked by spell shield it will still trigger the cooldown reduction");
    q.quote("Blind has no effect on abilities that trigger on-hit effects (e.g. Mystic Shot, Parrrley, and Steel Tempest)");
    q.quote("This ability will cast from wherever the caster is at the end of the cast time");
    const qDamage = q.formula("Physical Damage"), fluxDamage = w.formula("Bonus Magic Damage");
    const markSeconds = w.quoted("hit for 4 seconds"), manaReturn = w.quoted("Ezreal restores 60 mana");
    w.quote("first enemy champion, epic monster, or structure");
    w.quote("Block and Dodge prevents the mark from being triggered by a basic attack");
    w.quote("Spell shield prevents the mark from being triggered by an ability");
    w.quote("If the mark is triggered by a basic attack, spell shield will prevent Essence Flux's damage");
    const eRange = e.field("effectRadius"), eSpeed = e.field("speed"), blinkDistance = e.field("targetRange");
    const sightSeconds = e.quoted("reveals them for 1 second");
    e.quote("Arcane Shift prioritizes firing at the nearest enemy marked by Essence Flux");
    e.quote("The target does not have to be visible to be hit by this ability");
    e.quote("The target is revealed as soon as Ezreal fires the missile at them");
    e.quote("If Ezreal is moved during the cast time, his range to blink will update accordingly");
    const eDamage = e.formula("Magic Damage"), rDamage = r.formula("Magic Damage"), rMinionDamage = r.formula("Modified Damage");
    r.quote("This ability will cast from wherever the caster is at the start of the cast time");
    if (r.record.fields.targetRange?.text !== "Global") throw new Error("Ezreal: Trueshot Barrage must retain its Global range source");
    kit.evidence.push({ ability: r.name, page: r.record.page.title, revid: r.record.page.revid, text: "targetRange: Global" });
    const globalRange = r.gameQuoted("mSpell.castRange: [25000.0,25000.0,25000.0,25000.0,25000.0,25000.0,25000.0]");
    const costs = { Q: q.cost(), W: w.cost(), E: e.cost(), R: r.cost() };
    const cooldowns = { Q: q.cooldown(), W: w.cooldown(), E: e.cooldown(), R: r.cooldown() };
    kit.assume("Rising Spell Force starts at zero stacks and refreshes its shared six-second timer on each contacted enemy, including spell shields. Parry/dodge contacts are conservatively excluded because their passive interaction is not pinned. Expected-value contacts add fractional stacks, bounded at five.");
    kit.assume("Essence Flux's zero-damage initial orb attaches through a spell shield; the pinned special-shield note explicitly defines detonation guards but does not expressly define the initial attachment. It passes ordinary summons, which are neither champions, epic monsters nor structures. A spell-shielded ability retains the mark; a connected basic attack consumes it even when its separate magical detonation is spell-shielded. The source does not settle two simultaneous triggering packets, so the first resolved valid packet owns the one detonation.");
    kit.assume("Arcane Shift chooses the nearest targetable enemy after the blink, with a marked champion taking priority. Invisible enemies remain eligible. Its launch-time one-second reveal is ordinary sight, not true sight: it is recorded as an ordinary-sight mark and does not expose invisibility in the arena, which has no map fog. Equal-distance targets use a stable champion-first ordering.");
    kit.assume("Trueshot Barrage uses the pinned game's finite 25000-unit global projectile range. It passes through units once each, deals its sourced reduced damage to health-based summons classified as minions, and does not apply the old unused game-data per-hit falloff. The one-dimensional arena does not simulate map sight or global terrain.");
    kit.assume("The policy prioritizes Essence Flux before a ready Mystic Shot when in range, then weaves attacks. Arcane Shift keeps the default defensive dodge choice and otherwise repositions to preserve basic-attack range after an attack; it does not optimize arbitrary free-angle blink destinations. The stat-budget correction assumes successful Mystic Shots, at most five passive stacks, and one Flux detonation per W cooldown; hit chance and mana exhaustion remain combat outcomes.");

    const marked = (target: Unit, side: number, tick: number) => target.statuses.some((s) => s.kind === "mark" && s.key === FLUX && s.source === side && s.endTick > tick);
    const updateForce = (ctx: HookContext) => ctx.buff(FORCE, "attackSpeed", counter(ctx, FORCE) * forceAS, forceSeconds);
    const gainForce = (ctx: HookContext, scale: number) => {
      const count = counter(ctx, FORCE);
      ctx.memory[FORCE] = Math.min(forceMax, count + scale);
      ctx.memory[`${FORCE}Until`] = ctx.tick + ticks(forceSeconds);
      updateForce(ctx);
    };
    const pop: AbilitySpec = { key: "Wpop", name: `${w.name} (detonation)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: fluxDamage }], flags: { spellShield: true, projectile: false }, usable: () => false, roles: [] };
    const detonate = (ctx: HookContext, ability?: AbilitySpec, scale = 1) => {
      if (!marked(ctx.enemy, ctx.self.side, ctx.tick)) return;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === FLUX && s.source === ctx.self.side));
      abilityHit(ctx.world, ctx.self, ctx.enemy, pop, pop.onHit!, scale);
      if (ability) {
        const cost = costs[ability.key as keyof typeof costs] ?? 0;
        ctx.apply({ type: "resource", amount: { base: manaReturn + cost } }, true);
      }
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: cooldowns.Q, cost: costs.Q, castTime: q.castTime(),
        delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed"), collisionPet: true },
        onHit: [{ type: "damage", damageType: "physical", amount: qDamage, petDamageCategory: "singleTarget" }], flags: { projectile: true, spellShield: true, parry: true, appliesOnHit: true, appliesLifeSteal: true, basicDamage: true, petContactHooks: true }, decisive: true },
      { key: "W", name: w.name, slot: "W", cooldown: cooldowns.W, cost: costs.W, castTime: w.castTime(),
        delivery: { kind: "line", range: w.field("targetRange"), width: w.field("width"), speed: w.field("speed") },
        onHit: [{ type: "mark", key: FLUX, duration: markSeconds }], flags: { projectile: true, spellShield: false }, roles: ["damage"], decisive: true,
        usable: (self, world) => !marked(world.units[self.side === 0 ? 1 : 0], self.side, world.tick) },
      { key: "E", name: e.name, slot: "E", cooldown: cooldowns.E, cost: costs.E, castTime: e.castTime(),
        delivery: { kind: "blink", direction: "away", distance: blinkDistance, minDistance: 0 },
        onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], flags: { projectile: true, spellShield: true, grounded: true, petContactHooks: true }, roles: ["escape", "damage"] },
      { key: "R", name: r.name, slot: "R", cooldown: cooldowns.R, cost: costs.R, castTime: r.castTime(), castOrigin: "start", castDirection: "start",
        delivery: { kind: "line", range: globalRange, width: r.field("width"), speed: r.field("speed"), piercing: true, collisionPet: true },
        onHit: [{ type: "damage", damageType: "magic", amount: rDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true } },
      pop,
    ];
    const [mystic, flux, shift] = abilities as [AbilitySpec, AbilitySpec, AbilitySpec];
    const behavior: Behavior = (view) => {
      let command = defaultBehavior(view);
      const attacking = view.mode === "fight" || view.mode === "trade";
      if (attacking && !view.self.action && (!command || command.kind !== "cast" || command.ability === "Q" || command.ability === "W") && inReach(flux, view.self, view.enemy) && canCast(view.world, view.self, flux) && canCast(view.world, view.self, mystic)) command = { kind: "cast", ability: "W" };
      if (attacking && (!command || command.kind !== "cast") && inAttackRange(view.self, view.enemy) && view.self.attackReadyTick > view.world.tick + 1 && canCast(view.world, view.self, shift)) command = { kind: "cast", ability: "E", aim: { direction: -1, distance: Math.max(0, view.self.spec.attack.range - view.distance) } };
      return command;
    };
    return {
      abilities, behavior,
      budget: { damage(self, target) {
        const d = derive(self), shotCycle = Math.max(.25, cooldowns.Q / (1 + d.abilityHaste / 100) - refund) + mystic.castTime;
        const nominalCycle = cooldowns.Q / (1 + d.abilityHaste / 100) + mystic.castTime;
        const extraAS = Math.max(0, capAttackSpeed(d.attackSpeed + self.spec.base.attackSpeed.ratio * forceMax * forceAS) - d.attackSpeed);
        return { physical: evaluate(qDamage, self, target) * (1 / shotCycle - 1 / nominalCycle) + d.ad * (1 + d.critChance * (d.critDamage - 1)) * extraAS, magic: evaluate(fluxDamage, self, target) / (cooldowns.W / (1 + d.abilityHaste / 100) + flux.castTime) };
      } },
      hooks: {
        onTick: updateForce,
        onAbilityContact(ctx) {
          if (!["Q", "W", "E", "R"].includes(ctx.ability.key)) return;
          if (ctx.defense !== "parry" && ctx.defense !== "dodge") {
            gainForce(ctx, ctx.scale);
            if (ctx.ability.key === "Q") for (const key of ["Q", "W", "E", "R"]) ctx.apply({ type: "refund", ability: key, seconds: refund }, true);
          }
          if (ctx.ability.key === "R" && ctx.enemy.petId !== undefined) return [{ type: "damage", damageType: "magic", amount: rMinionDamage }];
        },
        beforeAbilityHit(ctx) { if (["Q", "E", "R"].includes(ctx.ability.key) && !(ctx.ability.key === "Q" && (hasState(ctx.enemy, "blockAttacks") || hasState(ctx.enemy, "dodgeAttacks")))) detonate(ctx, ctx.ability, ctx.scale); },
        onAttackHit(ctx) { if (!ctx.blocked) detonate(ctx); },
        onBlinkEnd(ctx) {
          if (ctx.ability.key !== "E") return;
          const candidates: Array<{ unit: Unit; pet?: Pet; priority: number; distance: number }> = [];
          if (ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self)) candidates.push({ unit: ctx.enemy, priority: marked(ctx.enemy, ctx.self.side, ctx.tick) ? 0 : 1, distance: Math.abs(ctx.enemy.x - ctx.self.x) });
          for (const pet of ctx.world.pets) {
            if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.hp <= 0 || pet.spec.hitPoints) continue;
            const unit = petFormulaTarget(pet, ctx.self, ctx.tick);
            if (!isUntargetable(unit, ctx.self)) candidates.push({ unit, pet, priority: 1, distance: Math.abs(pet.x - ctx.self.x) });
          }
          const chosen = candidates.filter((c) => c.distance <= eRange + 1e-6).sort((a, b) => a.priority - b.priority || a.distance - b.distance || (a.pet?.id ?? -1) - (b.pet?.id ?? -1))[0];
          if (!chosen) return;
          applyEffect(ctx.world, ctx.self, chosen.unit, { type: "mark", key: "ezreal:ordinarySight", duration: sightSeconds }, { scale: 1, ability: ctx.ability });
          ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "E", seenTick: ctx.tick, x: ctx.self.x, perTick: eSpeed / 30, homing: true, direction: directionTo(ctx.self, chosen.unit), travelLeft: Number.POSITIVE_INFINITY, projectile: true, connects: true, scale: 1, onHit: ctx.ability.onHit ?? [], ...(chosen.pet ? { pet: chosen.pet.id } : {}) });
        },
      },
    };
  },
};
export default ezreal;
