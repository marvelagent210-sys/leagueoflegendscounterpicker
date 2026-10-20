/** Varus: mobile charge, target-local Blight, real piercing falloff and finite corruption clocks. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { between, scaled, ticks } from "./util";

const BLIGHT = "varus:blight", CHARGE = "varus:charge", WACTIVE = "varus:wUntil";
const varus: KitModule = {
  champion: "Varus",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pSeconds = p.levelValue("for 5 / 7 / 9 / 11", 1), pAS = p.levelValue("When Varus kills an enemy") / 100, pConvert = p.quoted("equal to 11%") / 100;
    const pChampionAS = p.quoted("30% bonus attack speed") / 100, pChampionConvert = p.quoted("equal to 33%") / 100, pCap = p.quoted("cap of 3.33");
    p.quote("empowerment may only be refreshed by subsequent champion takedowns"); p.quote("minus the remaining duration of the empowered version");
    const missileSpeed = p.gameQuoted("mSpell.missileSpeed: 2000.0");
    const qMaxSeconds = q.quoted("for up to 4 seconds"), qFull = q.quoted("over the first 1.25 seconds"), qRangeSeconds = q.quoted("over the first 1.5 seconds"), qSlow = q.quoted("slowed by 20%") / 100, qRefund = q.quoted("refunds 50%") / 100;
    const qRange = q.fieldNumbers("range"), qWidth = q.field("width"), qSpeed = q.field("speed"), qMin = q.formula("Minimum Physical Damage"), qMax = q.formula("Maximum Physical Damage");
    const qFalloff = q.quoted("reduced by 0 / 15 / 30 / 45 / 60 / 67", 1) / 100, qFloor = 1 - q.quoted("reduced by 0 / 15 / 30 / 45 / 60 / 67", 5) / 100;
    q.quote("after charge ends the cooldown is reduced equal to the charge duration"); q.textField("cooldownStart"); q.quote("missile range is 825 to 1525");
    const stackSeconds = w.quoted("for 6 seconds"), maxStacks = w.quoted("stacking up to 3 times"), onHit = w.formula("Bonus Magic Damage"), blight = w.formula("Bonus Magic Damage per Stack");
    const refund = w.quoted("by 13%") / 100, wSeconds = w.quoted("within 5.5 seconds"), wRecast = w.quoted("after 1 second"), wOverlaySeconds = w.quoted("first 0.85 seconds"), wExecute = w.formula("Active Minimum Magic Damage");
    w.quote("will not apply stacks nor deal on-hit damage if blocked by blind, block or dodge effects"); w.quote("active damage is dealt after the damage of Piercing Arrow"); w.quote("does not count as an ability activation"); w.quote("can both be used while affected by cast-inhibiting crowd control");
    const eDamage = e.formula("Physical Damage"), eRange = e.field("targetRange"), eRadius = e.field("effectRadius"), eDelay = e.quoted("land after 0.5 seconds"), eSeconds = e.quoted("desecrated for 4 seconds"), eSlow = e.fraction("Slow"), eLinger = e.quoted("lingers for 0.25 seconds"), eSecond = e.quoted("after ~0.3 seconds"), eGWLinger = e.gameQuoted("mSpell.DataValues.GrievousDuration.values: [0.5");
    const rDamage = r.formula("Magic Damage"), rSeconds = r.quoted("rooting them for 2 seconds"), rRange = r.field("range"), rWidth = r.field("width"), rSpeed = r.field("speed");
    const rFirst = r.quoted("after ~0.65 seconds"), rSecond = r.quoted("after ~1.2 seconds"), rThird = r.quoted("and ~1.75 seconds");
    r.quote("first enemy champion hit"); r.quote("If the root is not applied"); r.quote("cleanses the root immediately"); r.quote("not have to be visible");
    const qCD = q.cooldown(), qCost = q.cost(), wCD = w.cooldown(), eCD = e.cooldown(), eCast = e.castTime(), rCD = r.cooldown(), rCast = r.castTime();
    const stackCount = (target: Unit, tick: number) => target.statuses.find((s) => s.kind === "mark" && s.key === BLIGHT && s.endTick > tick)?.value ?? 0;
    const addStack = (ctx: HookContext, count: number) => {
      if (!ctx.enemy.alive) return;
      const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((target) => target.id === ctx.enemy.petId);
      if (pet?.spec.hitPoints || pet?.spec.fixedDamage || pet?.spec.untargetable) return;
      const value = Math.min(maxStacks, stackCount(ctx.enemy, ctx.tick) + count);
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.key === BLIGHT && s.source === ctx.self.side));
      ctx.enemy.statuses.push({ kind: "mark", key: BLIGHT, source: ctx.self.side, ability: "W", startTick: ctx.tick, endTick: ctx.tick + ticks(stackSeconds), value });
      if (pet) pet.statuses = ctx.enemy.statuses;
    };
    const passiveBuff = (ctx: HookContext, empowered: boolean, duration: number) => {
      const seconds = Math.max(0, duration), as = empowered ? pChampionAS : pAS, ratio = empowered ? pChampionConvert : pConvert;
      ctx.memory["varus:pUntil"] = ctx.tick + ticks(seconds); ctx.memory["varus:pEmpowered"] = empowered;
      ctx.buff("varus:passiveAS", "attackSpeed", as, seconds);
      if (empowered) ctx.buff("varus:passiveCap", "attackSpeedCap", pCap, seconds);
      const bonusAS = derive(ctx.self).bonusAttackSpeed;
      ctx.buff("varus:passiveAD", "AD", ratio * bonusAS * 100, seconds); ctx.buff("varus:passiveAP", "AP", ratio * bonusAS * 100, seconds);
    };
    const hidden = (key: string, name: string, effects: Effect[], shield = false): AbilitySpec => ({ key, name, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, budgetExcluded: true, persistsAfterDeath: true, flags: { spellShield: shield, petContactHooks: true }, roles: [] });
    const detonation = hidden("blight", w.name, []), secondE = hidden("Esecond", `${e.name} (second Blight check)`, [{ type: "mark", key: "varus:eCheck", duration: 1 / 30 }], true);
    const field = hidden("Efield", `${e.name} (desecration)`, [{ type: "cc", cc: "slow", strength: eSlow, duration: eLinger }, { type: "grievousWounds", duration: eGWLinger }]);
    const rStack = hidden("Rstack", `${r.name} (Blight clock)`, []);
    const detonate = (ctx: HookContext, amp: number, share: number) => {
      const count = stackCount(ctx.enemy, ctx.tick);
      if (!(count > 0)) return;
      // A fractional connection consumes the expected share and leaves the other branch's stacks.
      const consumed = count * share, remaining = count - consumed;
      const mark = ctx.enemy.statuses.find((s) => s.key === BLIGHT && s.source === ctx.self.side);
      if (mark) { if (remaining > EPSILON) mark.value = remaining; else ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== mark); }
      const effects: Effect[] = [{ type: "damage", damageType: "magic", amount: scaled(blight, consumed * amp) }];
      if (ctx.enemy.petId === undefined) {
        abilityHit(ctx.world, ctx.self, ctx.enemy, detonation, effects);
        for (const key of ["Q", "W", "E"]) {
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "refund", ability: key, fraction: refund * consumed * amp, total: true }, { scale: 1 });
        }
      } else {
        const pet = ctx.world.pets.find((target) => target.id === ctx.enemy.petId);
        if (pet) { pet.statuses = ctx.enemy.statuses; abilityHitPet(ctx.world, ctx.self, pet, detonation, effects, "proc"); ctx.enemy.statuses = pet.statuses ?? []; }
      }
    };
    const finishW = (ctx: HookContext, full: boolean) => {
      delete ctx.memory[WACTIVE]; delete ctx.memory["varus:wUsedQ"]; delete ctx.self.chains.W;
      delete ctx.self.cooldownHeld.W; delete ctx.self.pendingRefunds.W; ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "lingering" && s.ability === "W"));
      ctx.self.cooldownReady.W = ctx.tick + ticks(full ? cooldownAfterHaste(wCD, derive(ctx.self).abilityHaste) : wRecast);
    };
    const finishCharge = (ctx: HookContext, refundMana: boolean) => {
      if (ctx.memory[CHARGE] === undefined) return;
      const seconds = Math.max(0, (ctx.tick - Number(ctx.memory[CHARGE])) / 30);
      ctx.memory["varus:releasedCharge"] = seconds;
      ctx.memory["varus:releasedW"] = ctx.memory["varus:wUsedQ"] === true;
      delete ctx.memory[CHARGE]; delete ctx.self.chains.Q; delete ctx.self.cooldownHeld.Q;
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "varus:qSlow");
      const pending = ctx.self.pendingRefunds.Q; delete ctx.self.pendingRefunds.Q;
      const full = cooldownAfterHaste(qCD, derive(ctx.self).abilityHaste);
      ctx.self.cooldownReady.Q = ctx.tick + ticks(Math.max(0, full - seconds - (pending?.seconds ?? 0) - full * (pending?.fraction ?? 0)));
      if (refundMana) ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + qCost * qRefund);
      if (ctx.memory["varus:wUsedQ"]) finishW(ctx, true);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cooldownAfter: "channel", cost: qCost, castTime: q.castTime(), delivery: { kind: "self" }, channel: { duration: qMaxSeconds, interruptible: true, mobile: true }, estimate: (self, target) => evaluate(qMax, self, target), roles: ["damage"] },
      { key: "Q2", name: `${q.name} (release)`, slot: "Q", cooldown: 0, castTime: 0, chain: { root: "Q", index: 2, window: qMaxSeconds }, delivery: { kind: "line", range: qRange.at(-1)! - qWidth / 2, width: qWidth, radius: qWidth / 2, speed: qSpeed, piercing: true, collisionPet: true }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: qMin }], usable: (self) => self.memory[CHARGE] !== undefined, decisive: true, budgetExcluded: true, persistsAfterDeath: true, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, countsAsCast: false, castTime: 0, delivery: { kind: "self" }, overlay: true, preserveAttackWindup: true, overlayChannels: ["Q"], cooldownAfter: "state", flags: { usableWhileDisabled: true }, onSelf: [{ type: "state", state: "lingering", duration: wSeconds }], usable: (self, world) => self.memory[WACTIVE] === undefined && (self.memory[CHARGE] === undefined || world.tick - Number(self.memory[CHARGE]) <= ticks(wOverlaySeconds)), roles: ["buff"] },
      { key: "W2", name: `${w.name} (cancel)`, slot: "other", cooldown: 0, countsAsCast: false, castTime: 0, delivery: { kind: "self" }, chain: { root: "W", index: 2, window: wSeconds, delay: wRecast }, overlay: true, overlayChannels: ["Q"], flags: { usableWhileDisabled: true }, usable: (self) => self.memory[WACTIVE] !== undefined && !self.memory["varus:wUsedQ"], budgetExcluded: true, roles: [] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: eCast, delivery: { kind: "circle", range: eRange, radius: eRadius, delay: eDelay }, onHit: [{ type: "damage", damageType: "physical", amount: eDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true, roles: ["damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: rCast, delivery: { kind: "line", range: rRange, width: rWidth, speed: rSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "root", duration: rSeconds }], flags: { projectile: true, spellShield: true }, persistsAfterDeath: true, decisive: true, roles: ["damage", "cc"] },
      detonation, secondE, field, rStack,
    ];
    const behavior: Behavior = (view) => {
      const ordinary = defaultBehavior(view), self = view.self;
      if (view.mode === "idle") return ordinary;
      if (self.memory[CHARGE] !== undefined) {
        const age = (view.world.tick - Number(self.memory[CHARGE])) / 30, reach = qRange[0]! - qWidth / 2 + (qRange.at(-1)! - qRange[0]!) * Math.min(1, age / qRangeSeconds);
        if (age >= qFull && view.distance <= reach + view.enemy.spec.base.radius + EPSILON && canCast(view.world, self, abilities[1]!)) return { kind: "cast", ability: "Q2" };
        return { kind: "move", direction: view.mode === "flee" || self.memory.tradeDone ? -1 : 0 };
      }
      if (["fight", "trade", "kite"].includes(view.mode) && !self.action && !self.memory.tradeDone) {
        const count = stackCount(view.enemy, view.world.tick);
        if (count >= maxStacks && canCast(view.world, self, abilities[4]!) && view.distance <= eRange + eRadius + EPSILON) return { kind: "cast", ability: "E" };
        if (canCast(view.world, self, abilities[0]!) && view.distance <= qRange.at(-1)! + EPSILON && (count >= maxStacks || view.distance > self.spec.attack.range)) {
          if (canCast(view.world, self, abilities[2]!)) return { kind: "cast", ability: "W" };
          return { kind: "cast", ability: "Q" };
        }
        // Do not throw low-stack Q/E instead of building the sourced three-stack cycle.
        if (ordinary?.kind === "cast" && ["Q", "E", "W"].includes(ordinary.ability) && count < maxStacks && view.distance <= self.spec.attack.range + EPSILON) return { kind: "attack" };
      }
      return ordinary;
    };
    kit.assume("Living Vengeance starts inactive: no invented minion kill. Actual nonchampion kills grant 20% AS for 11 seconds at level 20; champion kills grant 30% AS and 3.33 cap. AD/AP conversion reads the full current bonus-AS percentage, including this buff, at 11% or 33%, and updates each tick. Nonchampion kills during empowerment retain the sourced delayed ordinary-buff remainder; pets cannot refresh champion empowerment.");
    kit.assume("Piercing Arrow is an interruptible mobile four-second charge with 20% self-slow; release is explicit and timeout cancels with half mana refunded; an external interrupt does not invent that timeout refund. Damage and Blight effects scale linearly to 150% at 1.25 seconds. Its range field and description imply 825→1525 missile travel over 1.5 seconds plus 70 radius; an old note says maximum at 1.25 seconds. The current description/field wins this source conflict. The policy releases at 1.25 seconds when reachable, otherwise waits. Post-effect Q cooldown is hasted then reduced by actual charge duration, as the exact raw-template cooldown tooltip states.");
    kit.assume("Piercing Arrow pierces actual champions and normal-HP summons, reducing only arrow physical damage by 15 percentage points per previous contact to 33%; each target's own full Blight/empowered-W packet is independent. Projectiles obey the common sidestep branch model and projectile walls. Cosmetic critical text does not create critical damage. Fractional outcomes retain expected Blight consumption and refunds rather than inventing integer stacks in both outcomes.");
    kit.assume("Blight is separate per actual target, expires six seconds after its last application and caps at three. Blind/dodge/parry/basic damage blocks deny its 40 + 15% bonus AD + 25% AP on-hit and stack. Spell shields block ability damage and consumption together. Detonation uses 5% + 1.3% per 100 AP max HP per stack at max rank; only champion contacts refund 13% of each hasted total basic cooldown per stack, amplified up to 1.5 by Q charge. Actual summons have no invented champion or epic-monster refund.");
    kit.assume("W grants a 5.5-second entitlement, can overlay Q only during its first 0.85 seconds and ignores cast-inhibiting CC. It is explicitly excluded from opponent on-cast counters. Manual/unused expiry cancels to a fixed one-second cooldown; an entitled Q spends the full 40-second hasted cooldown when the charge ends, even if Q is cancelled. Empowered Q deals 14% missing HP multiplied by charge after physical and Blight damage; no additional spell-shield check is invented inside the accepted packet.");
    kit.assume("Hail of Arrows retains its 0.2419-second cast plus 0.5-second flight, with a fixed landing point and projectile-wall destruction before landing. A 300-radius desecrated field lasts 4 seconds and refreshes a 50% slow with a 0.25-second linger and ordinary 40% Grievous Wounds with the separately pinned 0.5-second Grievous Wounds linger. A separately shieldable second Blight check at +0.3 seconds hits only targets still overlapping the actual ground circle. The upstream approximate second-check timing remains approximate; slow and Grievous Wounds have separate sourced linger clocks.");
    kit.assume("Chain of Corruption hits the first champion, ignores pets as blockers and does not create nonexistent allied/enemy champions for its spreading tether. Its 2-second root and root-linked ordinary sight are independently guarded. Three Blight applications occur at +0.65, +1.2 and +1.75 seconds only while the original root remains; cleanse or CC immunity denies later stacks. A tenacity-shortened root gets its first stack on its final active 30 Hz tick. Launched spells, fields and corruption stack clocks survive Varus dying; there is no unearned post-death attack.");
    kit.assume("The budget excludes the conditional kill passive and assigns fully charged Q one real 1.25-second charge cost per cycle. Its Blight reference is capped by real attack + R stack generation and basic-spell consumption cadence, with no free cooldown-refund loop or epic-monster lane. W values a 50% missing HP reference only on its own 40-second cycle. E damage and R damage retain their ordinary direct formula budgets.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed, onHitToPets: true, blockStopsOnHit: true, onHit: [{ type: "damage", damageType: "magic", amount: onHit }] }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, qCycle = Math.max(qFull, qCD / haste), eCycle = eCD / haste + eCast, rCycle = rCD / haste + rCast, blights = Math.min(d.attackSpeed + maxStacks / rCycle, maxStacks * (1 / qCycle + 2 / eCycle + 1 / rCycle)); return { physical: evaluate(qMax, self, target) / qCycle, magic: evaluate(blight, self, target) * blights + derive(target).maxHp * .5 * (wExecute.ratios?.targetMissingHP ?? 0) * 1.5 / (wCD / haste) }; } },
      hooks: {
        onAttackHit(ctx) { if (!ctx.blocked) addStack(ctx, ctx.scale); },
        onAttackPetHit(ctx) { if (!ctx.blocked) addStack(ctx, ctx.scale); },
        onKill(ctx) {
          if (!ctx.pet) { passiveBuff(ctx, true, pSeconds); delete ctx.memory["varus:pDelayedUntil"]; }
          else if (ctx.memory["varus:pEmpowered"] && ctx.tick < Number(ctx.memory["varus:pUntil"])) ctx.memory["varus:pDelayedUntil"] = ctx.tick + ticks(pSeconds);
          else passiveBuff(ctx, false, pSeconds);
        },
        onCastStart(ctx) { if (ctx.ability.key === "E") ctx.memory["varus:eSeen"] = ctx.tick; },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory[CHARGE] = ctx.tick;
            ctx.memory["varus:wUsedQ"] = ctx.memory[WACTIVE] !== undefined && ctx.tick < Number(ctx.memory[WACTIVE]);
            ctx.self.statuses.push({ kind: "cc", key: "slow", source: ctx.self.side, ability: "Q", memoKey: "varus:qSlow", startTick: ctx.tick, endTick: ctx.tick + ticks(qMaxSeconds), value: qSlow });
          }
          if (ctx.ability.key === "Q2") finishCharge(ctx, false);
          if (ctx.ability.key === "E") {
            const direction = directionTo(ctx.self, ctx.enemy), distance = ctx.aim?.distance !== undefined ? Math.min(eRange, Math.max(0, ctx.aim.distance)) : Math.min(eRange, Math.abs(ctx.enemy.x - ctx.self.x));
            const x = ctx.self.x + direction * (ctx.aim?.direction ?? 1) * distance;
            if (distance > EPSILON) {
              const id = ctx.world.nextId++;
              ctx.memory[`varus:eLanding:${id}`] = x;
              ctx.world.missiles.push({ id, owner: ctx.self.side, source: "E", seenTick: Number(ctx.memory["varus:eSeen"] ?? ctx.tick), x: ctx.self.x, direction: x >= ctx.self.x ? 1 : -1, perTick: distance / ticks(eDelay), travelLeft: distance, homing: false, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: -1, delayTicks: 0 } });
            }
          }
          if (ctx.ability.key === "W") { ctx.memory[WACTIVE] = ctx.tick + ticks(wSeconds); if (ctx.memory[CHARGE] !== undefined) ctx.memory["varus:wUsedQ"] = true; }
          if (ctx.ability.key === "W2") finishW(ctx, false);
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "Q" && ctx.reason !== "recast") finishCharge(ctx, false); },
        onTick(ctx) {
          if (ctx.memory[CHARGE] !== undefined && (ctx.tick >= Number(ctx.memory[CHARGE]) + ticks(qMaxSeconds) || ctx.self.action?.kind !== "channel" || ctx.self.action.ability !== "Q")) finishCharge(ctx, true);
          if (ctx.memory[WACTIVE] !== undefined && ctx.tick >= Number(ctx.memory[WACTIVE]) && !ctx.memory["varus:wUsedQ"]) finishW(ctx, false);
          if (ctx.memory["varus:pUntil"] !== undefined) {
            if (ctx.tick >= Number(ctx.memory["varus:pUntil"])) {
              const delayed = Number(ctx.memory["varus:pDelayedUntil"] ?? 0) - ctx.tick;
              delete ctx.memory["varus:pUntil"]; delete ctx.memory["varus:pEmpowered"]; delete ctx.memory["varus:pDelayedUntil"];
              if (delayed > 0) passiveBuff(ctx, false, delayed / 30);
            } else {
              const ratio = ctx.memory["varus:pEmpowered"] ? pChampionConvert : pConvert, remaining = (Number(ctx.memory["varus:pUntil"]) - ctx.tick) / 30, amount = derive(ctx.self).bonusAttackSpeed * 100 * ratio;
              ctx.buff("varus:passiveAD", "AD", amount, remaining); ctx.buff("varus:passiveAP", "AP", amount, remaining);
            }
          }

        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source !== "Q2" || ctx.memory[`varus:qPrepared:${m.id}`]) return;
          ctx.memory[`varus:qPrepared:${m.id}`] = true;
          const seconds = Number(ctx.memory["varus:releasedCharge"] ?? 0), share = Math.min(1, seconds / qFull), amp = 1 + .5 * share, empowered = ctx.memory["varus:releasedW"] === true;
          const range = qRange[0]! - qWidth / 2 + (qRange.at(-1)! - qRange[0]!) * Math.min(1, seconds / qRangeSeconds);
          m.travelLeft = range; m.onHit = [{ type: "damage", damageType: "physical", amount: between(qMin, qMax, share), label: `varus:q:${amp}:${empowered ? 1 : 0}` }];
          ctx.memory[`varus:qBase:${m.id}`] = JSON.stringify(m.onHit[0]); ctx.memory[`varus:qHits:${m.id}`] = 0;
        },
        onMissileMove(ctx) {
          const m = ctx.missile;
          if (m.source !== "E" || !m.landingZone || m.landingZone.id !== -1) return;
          const zone = ctx.world.zones.find((z) => z.owner === ctx.self.side && z.ability === "E" && z.seenTick === m.seenTick && Math.abs(z.x - Number(ctx.memory[`varus:eLanding:${m.id}`])) <= EPSILON && !z.memory?.flight);
          if (zone) { m.landingZone.id = zone.id; zone.memory = { ...(zone.memory ?? {}), flight: m.id }; }
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "E" || ctx.reason !== "blocked") return;
          const m = ctx.missile;
          ctx.world.zones = ctx.world.zones.filter((z) => !(z.owner === ctx.self.side && z.ability === "E" && z.seenTick === m.seenTick && Math.abs(z.x - Number(ctx.memory[`varus:eLanding:${m.id}`])) <= EPSILON));
        },
        onMissileContact(ctx) {
          const m = ctx.missile;
          if (m.source !== "Q2") return;
          const hit = Number(ctx.memory[`varus:qHits:${m.id}`] ?? 0) + 1; ctx.memory[`varus:qHits:${m.id}`] = hit;
          const original = JSON.parse(String(ctx.memory[`varus:qBase:${m.id}`])) as Extract<Effect, { type: "damage" }>;
          m.onHit = [{ ...original, amount: scaled(original.amount, Math.max(qFloor, 1 - qFalloff * hit)) }];
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q2") {
            const label = ctx.effects.find((effect) => effect.type === "damage") as Extract<Effect, { type: "damage" }> | undefined;
            const parts = label?.label?.split(":"); ctx.enemy.memory["varus:impactAmp"] = Number(parts?.[2] ?? 1); ctx.enemy.memory["varus:impactW"] = parts?.[3] === "1";
          }
        },
        onAbilityHit(ctx) {
          if (!["Q2", "E", "Esecond", "R"].includes(ctx.ability.key)) return;
          const amp = ctx.ability.key === "Q2" ? Number(ctx.enemy.memory["varus:impactAmp"] ?? 1) : 1;
          detonate(ctx, amp, ctx.scale);
          if (ctx.ability.key === "Q2" && ctx.enemy.memory["varus:impactW"]) {
            const effect: Effect[] = [{ type: "damage", damageType: "magic", amount: scaled(wExecute, amp * ctx.scale) }];
            if (ctx.enemy.petId === undefined) abilityHit(ctx.world, ctx.self, ctx.enemy, detonation, effect);
            else { const pet = ctx.world.pets.find((target) => target.id === ctx.enemy.petId); if (pet) abilityHitPet(ctx.world, ctx.self, pet, detonation, effect, "proc"); }
          }
          if (ctx.ability.key === "R") {
            const root = ctx.enemy.statuses.find((s) => s.kind === "cc" && s.key === "root" && s.ability === "R" && s.source === ctx.self.side);
            if (!root) return;
            ctx.enemy.statuses.push({ kind: "mark", key: "varus:ordinarySight", source: ctx.self.side, ability: "R", startTick: ctx.tick, endTick: root.endTick, value: 1 });
            for (const [index, seconds] of [rFirst, rSecond, rThird].entries()) {
              const delay = index === 0 ? Math.min(ticks(seconds), Math.max(0, root.endTick - ctx.tick - 1)) : ticks(seconds);
              if (index > 0 && ctx.tick + delay >= root.endTick) continue;
              ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", x: ctx.enemy.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + delay, ability: "Rstack", onHit: [], noPets: true, memory: { rootStart: root.startTick, share: ctx.scale } });
            }
          }
        },
        onLethal(ctx) {
          if (ctx.memory[CHARGE] !== undefined) finishCharge(ctx, false);
          if (ctx.memory[WACTIVE] !== undefined) finishW(ctx, false);
          return false;
        },
        onZoneLand(ctx) {
          if (["E", "Esecond"].includes(ctx.zone.ability ?? "")) {
            const source = ctx.zone.ability === "E" ? abilities.find((a) => a.key === "E")! : secondE;
            for (const pet of [...ctx.world.pets]) {
              if (pet.owner === ctx.self.side || pet.spec.hitPoints || pet.spec.untargetable || Math.abs(pet.x - ctx.zone.x) > ctx.zone.radius + pet.spec.radius + EPSILON) continue;
              abilityHitPet(ctx.world, ctx.self, pet, source, ctx.zone.onHit ?? [], "area");
            }
            ctx.zone.noPets = true;
          }
          if (ctx.zone.ability === "E") {
            const zone = ctx.zone;
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", x: zone.x, radius: eRadius, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(eSeconds), ability: "Efield", onHit: field.onHit, interval: 1, nextTick: ctx.tick + 1 });
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", x: zone.x, radius: eRadius, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(eSecond), ability: "Esecond", onHit: secondE.onHit, connects: true, scale: 1 });
          }
          if (ctx.zone.ability === "Rstack") {
            const root = ctx.enemy.statuses.find((s) => s.kind === "cc" && s.key === "root" && s.ability === "R" && s.source === ctx.self.side && s.startTick === Number(ctx.zone.memory?.rootStart) && s.endTick > ctx.tick);
            if (root) addStack(ctx, Number(ctx.zone.memory?.share ?? 1));
          }
        },
      },
    };
  },
};
export default varus;
