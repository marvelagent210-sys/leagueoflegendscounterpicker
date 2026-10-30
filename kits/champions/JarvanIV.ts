/** Jarvan IV's actual target-local Cadence, persistent flags, lance pull and terrain. */
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import type { KitModule } from "../../engine/kits/compile";
import { canCast, releaseCooldowns, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { destroyPet, petsOf, spawnPet } from "../../engine/sim/pets";
import { dashDistance } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { attackDamage, ticks } from "./util";

const FLAG = "jarvan:flag", CADENCE = "jarvan:cadence", EPS = 1e-6;
type Contact = { target: Unit; pet?: Pet };
const jarvan: KitModule = {
  champion: "JarvanIV",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pShare = p.quoted("8% of the target's current health") / 100, pMin = p.quoted("minimum threshold of 20"), pCap = p.quoted("capped at 400"), pCD = p.field("targetCooldown");
    p.quote("current health of the target before any damage of the attack has been dealt"); p.quote("damage is dealt after the main attack damage"); p.quote("If the target dies to the main attack damage"); p.quote("will not trigger against structures");
    const qDamage = q.formula("Physical Damage"), qShred = q.shareOf("Armor Reduction"), qShredTime = q.quoted("armor reduction for 3 seconds"), qKnockTime = q.quoted("for 0.75 seconds"), qCD = q.cooldown(), qCast = q.castTime(), [qMin, qMax, , qFlagRange] = q.fieldNumbers("range"), qWidth = q.field("width", "Damage"), qFlagWidth = q.field("width", "Flag"), qRadius = q.field("collisionRadius");
    if (qMin === undefined || qMax === undefined || qFlagRange === undefined) throw new Error("Jarvan IV: missing lance geometry");
    q.quote("armor reduction is applied after the damage"); q.quote("wherever the caster is at the end of the cast time"); q.quote("even if he is immobilized or grounded"); q.quote("can cast any of his abilities during the dash"); q.quote("one furthest from his position");
    const wShield = w.formula("Shield Strength"), wAmp = w.quoted("increased by 1.3%") / 100, wShieldTime = w.quoted("shield for 4 seconds"), wSlow = w.fraction("Slow"), wSlowTime = w.quoted("for 2 seconds"), wRadius = w.field("effectRadius"), wCD = w.cooldown();
    w.quote("for each enemy champion hit"); w.quote("deals no damage");
    const eDamage = e.formula("Magic Damage"), eAS = e.fraction("Bonus Attack Speed"), eCD = e.cooldown(), eRange = e.field("targetRange"), eRadius = e.field("effectRadius", "Impact"), eAura = e.field("effectRadius", "Aura"), eSight = e.field("effectRadius", "Sight"), eTime = e.quoted("remains for 8 seconds"), flagRadius = e.quoted("a 65 gameplay radius"), flagPath = e.quoted("13.6 pathing radius");
    e.quote("aura from multiple Demacian Standards does not stack"); e.quote("untargetable to enemies"); e.quote("target type is the same as a minion");
    const dashSpeed = e.gameQuoted('"name":"EDashSpeed","values":[1400.0,1400.0,1400.0,1400.0,1400.0,1400.0,1400.0]');
    const rDamage = r.formula("Physical Damage"), rCD = r.cooldown(), rRange = r.field("targetRange"), rTime = r.quoted("over 0.35 seconds"), rRing = r.field("effectRadius", "Terrain"), rSight = r.field("effectRadius", "Sight"), rLife = r.quoted("lasts for 3.5 seconds"), rRecast = r.quoted("recast after 0.75 seconds"), rPushTime = r.quoted("over 0.15 seconds"), rInner = r.quoted("Impassable perimeter: 255"), rOuter = r.quoted("Impassable perimeter: 255 • 445", 1);
    r.textField("cooldownStart"); r.quote("Spell shield will block the damage but not the terrain generation"); r.quote("killed while leaping"); r.quote("24 units with 95 pathing radius, 65 gameplay radius and 1350 sight radius");
    for (const data of [p, q, w, e, r]) data.gameQuote("objectPath:");
    const contacts = (ctx: HookContext): Contact[] => [
      ...(ctx.world.units[1 - ctx.self.side]!.alive ? [{ target: ctx.world.units[1 - ctx.self.side]! }] : []),
      ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && pet.endTick > ctx.tick && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet })),
    ];
    const targetClass = (target: Unit) => target.petId === undefined || target.spec.unitClass === "clone" ? "champion" : target.spec.targetClass;
    const validArea = (ctx: HookContext, target: Unit) => target.alive && !inStasis(target) && !isUntargetable(target, ctx.self);
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects = ability.onHit ?? [], scale = 1) => contact.pet ? abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area", scale) : abilityHit(ctx.world, ctx.self, contact.target, ability, effects, scale);
    const internal = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, flags: { spellShield: shield, petContactHooks: true }, usable: () => false });
    const lance = internal("Qlance", q.name, [{ type: "damage", damageType: "physical", amount: qDamage }, { type: "stat", stat: "armorReductionPercent", amount: { base: qShred }, duration: qShredTime }]);
    const knock = internal("Qknock", `${q.name} (knockup)`, [{ type: "cc", cc: "airborne", duration: qKnockTime }]);
    const slow = internal("Wslow", w.name, [{ type: "cc", cc: "slow", strength: wSlow, duration: wSlowTime }]);
    const flagHit = internal("Eimpact", e.name, [{ type: "damage", damageType: "magic", amount: eDamage }]);
    const impact = internal("Rimpact", r.name, [{ type: "damage", damageType: "physical", amount: rDamage }]);
    const perimeter = internal("Rperimeter", `${r.name} (perimeter)`, [], false);
    const flags = (world: World, self: Unit) => petsOf(world, self.side, FLAG).filter((flag) => flag.endTick > world.tick);
    const aura = (ctx: HookContext) => {
      const nearby = flags(ctx.world, ctx.self).some((flag) => Math.abs(flag.x - ctx.self.x) <= eAura + EPS);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "buff:jarvan:flagAura");
      if (nearby && ctx.self.alive && !ctx.self.resurrection) ctx.buff("jarvan:flagAura", "attackSpeed", eAS, 1 / 30);
      for (const contact of contacts(ctx)) if (flags(ctx.world, ctx.self).some((flag) => Math.abs(contact.target.x - flag.x) <= eSight)) {
        contact.target.statuses = contact.target.statuses.filter((status) => status.memoKey !== "jarvan:flagSight");
        contact.target.statuses.push({ kind: "state", key: "standardSight", memoKey: "jarvan:flagSight", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + 1, value: 0 });
        if (contact.pet) contact.pet.statuses = contact.target.statuses;
      }
    };
    const finishRing = (ctx: HookContext) => {
      const left = Number(ctx.memory["jarvan:ringLeft"] ?? -1), right = Number(ctx.memory["jarvan:ringRight"] ?? -1);
      ctx.world.terrain = ctx.world.terrain.filter((wall) => wall.id !== left && wall.id !== right);
      delete ctx.memory["jarvan:ringLeft"]; delete ctx.memory["jarvan:ringRight"]; delete ctx.memory["jarvan:ringUntil"];
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "jarvan:ring");
      releaseCooldowns(ctx.world, ctx.self);
    };
    const knockPath = (ctx: HookContext, from: number, to: number) => {
      const serial = Number(ctx.memory["jarvan:qSerial"]), lo = Math.min(from, to), hi = Math.max(from, to);
      for (const contact of contacts(ctx)) {
        const key = `jarvan:knocked:${ctx.self.side}`;
        if (!validArea(ctx, contact.target) || contact.target.memory[key] === serial || contact.target.x + contact.target.spec.base.radius < lo - qRadius - EPS || contact.target.x - contact.target.spec.base.radius > hi + qRadius + EPS) continue;
        // One attempt per actual body; defensive guards cannot create repeated contact attempts.
        contact.target.memory[key] = serial;
        if (contact.pet) contact.pet.memory[key] = serial;
        hit(ctx, contact, knock);
      }
    };
    const cadenceBefore = (ctx: HookContext & { blocked: boolean; scale: number; pet?: Pet }) => {
      const target = ctx.enemy, key = `${CADENCE}:${ctx.self.side}`, packetKey = `${CADENCE}:packet:${ctx.self.side}`;
      delete target.memory[packetKey];
      if (ctx.blocked || (ctx.pet && (ctx.pet.spec.hitPoints || ctx.pet.spec.fixedDamage)) || targetClass(target) === "other" || ctx.tick < Number(target.memory[key] ?? -1)) return;
      target.memory[packetKey] = Math.max(pMin, Math.min(targetClass(target) === "champion" ? Infinity : pCap, target.hp * pShare)) * ctx.scale;
      target.memory[key] = ctx.tick + ticks(pCD);
    };
    const cadenceAfter = (ctx: HookContext & { blocked: boolean; pet?: Pet }) => {
      const key = `${CADENCE}:packet:${ctx.self.side}`, amount = Number(ctx.enemy.memory[key] ?? 0);
      delete ctx.enemy.memory[key];
      if (ctx.pet) { ctx.pet.memory = ctx.enemy.memory; ctx.pet.statuses = ctx.enemy.statuses; }
      if (ctx.blocked || !ctx.enemy.alive || ctx.enemy.hp <= 0 || !(amount > 0)) return;
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "physical", amount: { base: amount }, noLifeSteal: true, label: p.name, petDamageCategory: "proc" }, { scale: 1 });
    };
    const chooseR = (world: World, self: Unit, aim?: { direction: -1 | 1; distance?: number }): Contact | undefined => {
      const enemy = world.units[1 - self.side]!, list = contacts({ world, self, enemy, tick: world.tick } as HookContext).filter(({ target }) => targetClass(target) === "champion" && canTarget(target, self) && Math.abs(target.x - self.x) <= rRange + EPS);
      if (aim?.distance !== undefined) { const endpoint = self.x + directionTo(self, enemy) * aim.direction * aim.distance; list.sort((a, b) => Math.abs(a.target.x - endpoint) - Math.abs(b.target.x - endpoint)); }
      return list[0];
    };
    const ordinary = (self: Unit) => self.action?.kind !== "cast";
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, overlay: true, castDirection: "start", delivery: { kind: "self" }, flags: { grounded: false }, roles: ["damage", "cc"], usable: ordinary, budgetExcluded: true, estimate: (self, target) => evaluate(qDamage, self, target) },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, roles: ["defense", "cc"], usable: ordinary, budgetExcluded: true },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, roles: ["damage", "buff"], usable: ordinary, budgetExcluded: true, estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), overlay: true, cooldownAfter: "state", delivery: { kind: "self" }, flags: { grounded: true, knockdown: false }, roles: ["damage", "engage"], usable: (self, world) => ordinary(self) && !self.memory["jarvan:rLeaping"] && !self.memory["jarvan:ringUntil"] && chooseR(world, self) !== undefined, budgetExcluded: true, estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: () => rTime },
      { key: "R2", name: `${r.name} (dismiss)`, slot: "R", activation: "internal", cooldown: 0, castTime: 0, cost: 0, overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, roles: ["escape"], budgetExcluded: true, usable: (self, world) => ordinary(self) && Number(self.memory["jarvan:ringUntil"] ?? -1) > world.tick && world.tick >= Number(self.memory["jarvan:ringRecast"] ?? Infinity) },
      { key: "Qdash", name: `${q.name} (flag dash)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { grounded: false, knockdown: true }, usable: () => false },
      lance, knock, slow, flagHit, impact, perimeter,
    ];
    const get = (key: string) => abilities.find((ability) => ability.key === key)!;
    const behavior: Behavior = (view) => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle") return normal;
      const ready = (key: string) => canCast(view.world, view.self, get(key));
      if ((view.mode === "flee" || view.self.memory.tradeDone) && ready("R2")) return { kind: "cast", ability: "R2" };
      if (view.self.memory.tradeDone) return normal;
      const reaction = react(view); if (reaction) return reaction;
      if (view.self.action) return normal;
      const centers = Math.abs(view.self.x - view.enemy.x);
      if (view.mode !== "flee" && centers <= wRadius && ready("W")) return { kind: "cast", ability: "W" };
      if (view.mode === "flee") {
        if (ready("E") && ready("Q")) return { kind: "cast", ability: "E", aim: { direction: -1, distance: qFlagRange } };
        const behind = flags(view.world, view.self).find((flag) => (flag.x - view.self.x) * directionTo(view.self, view.enemy) < 0 && Math.abs(flag.x - view.self.x) <= qFlagRange + flagRadius);
        if (behind && ready("Q")) return { kind: "cast", ability: "Q", aim: { direction: -1 } };
        return normal;
      }
      if (centers <= eRange + eRadius && ready("E")) return { kind: "cast", ability: "E", aim: { direction: 1, distance: Math.min(qFlagRange, centers) } };
      if (centers <= qMax + view.enemy.spec.base.radius && ready("Q")) return { kind: "cast", ability: "Q" };
      if (view.mode !== "trade" && view.mode !== "hold" && ready("R")) return { kind: "cast", ability: "R" };
      if (normal?.kind === "cast" && ["Q", "E", "W"].includes(normal.ability)) return { kind: "move", direction: 1 };
      return normal;
    };
    kit.assume("Martial Cadence snapshots8% actual target current HP before the ordinary basic, then deals its separate physical packet after that basic only if the body survived. Its20minimum,400non-champion cap and static3-second per-target clock are source-read. Champion-class summons and explicit clones are champions; unclassified pets receive the non-champion cap. Structures and explicitly Other props do not trigger it. Blind/dodge/parry/block preserve readiness; actual damage immunity can consume readiness. Pet-ID views synchronize their current statuses before the bonus packet.");
    kit.assume("Dragon Strike uses the primary0.4-second cast and65–785 lance geometry, deals250+145%bonusAD before26%armor shred for3seconds, then detects the furthest real own flag within0–850 detection length (including its65gameplay radius) in the selected direction. The actual dash travels1400units/second from the exact pinned EDashSpeed array, crossing terrain only with a clear endpoint. Root/ground do not deny its pull; knockdown can stop it. Each actual body gets one guarded0.75-second knockup attempt per dash. The random50–100 lateral knockup scatter is omitted in one dimension. The primary 136 damage / 300 flag widths are retained; lateral width cannot be resolved on the duel line. Champion lance damage uses the shared scalar skillshot fallback from the 0.4-second telegraph, while actual pet occupancy and dash knockup contacts stay geometric; the lance does not create an independent probability branch.");
    kit.assume("Demacian Standard grants30%permanent AS and a separate non-stacking30%aura within1000 of an actual8-second flag. Each flag is an enemy-untargetable Minion-class body with65gameplay/13.6pathing radius; its infinite HP is only a representation of enemy untargetability, never a hittable health target. No flag exists before E. Primary E has no cast time and publishes no landing delay; cosmetic missileSpeed1450 and binary spellCastTime0.25 do not prove script delivery timing, so flag placement/impact is immediate and this timing gap is explicit. E damage is240+80%AP within200; sight700 uses standard sight only. Owner death removes the flag under ordinary pet lifecycle; primary does not specify a death persistence exception.");
    kit.assume("Golden Aegis applies independently guarded35%slows for2seconds to actual nearby bodies within600, counts only accepted actual champion-class/clone contacts and grants140+70%bonusAD plus1.3%maxHP per counted champion for4seconds. CC immunity still counts an accepted spell; spell shield/parry/stasis/untargetability do not. It never assumes a second champion, ward, minion wave or imaginary summon.");
    kit.assume("Cataclysm targets a live visible actual enemy champion or explicitly Champion-class/clone summon within 650, retains the actual recipient ID, tracks its location over the primary0.35-second displacement-immune leap, and survives target invisibility/untargetability as an already declared leap. Landing damage remains separately guarded. Death during the leap cancels damage/terrain and starts its full cooldown. Landing creates two real impassable wall intervals at255–445 from its center for3.5seconds, blocking both sides, and applies the primary0.15-second inward/outward perimeter displacement. The two intervals project24circular wall units onto one dimension; individual Ornn segment removal and lateral exits are outside this arena. Primary350terrain radius approximates additional damage footprint because neither source labels a server damage radius; binary castRadius210/castRadiusSecondary340 remain exact conflicting targeting metadata. Targeted body's landing contact is always tested against that footprint. Pets receive guarded perimeter airborne but shared pet movement has no forced-displacement action. Sight1700is standard sight. Manual dismissal after0.75seconds is an actual activation; natural expiry is not. Post-effect R cooldown begins after dismissal/expiry; no preduel terrain is supplied.");
    kit.assume("Behavior evaluates common trade completion before offensive choices, reserves ready R in trade/hold, opens with W/E/Q in range, and dismisses an existing ring for escape. The budget adds one current-health Cadence at the half-health reference point per3seconds plus attack interval, Q/E/R by ordinary cast/cooldown and W's guaranteed base shield only. Aura AS receives source8-second flag uptime per E cycle. Runtime accepted contacts and actual terrain determine outcomes; no coefficients fit matchup scores.");
    return { abilities, attack: { onHitToPets: true, blockStopsOnHit: true }, behavior,
      start: [{ type: "stat", stat: "attackSpeed", amount: { base: eAS }, duration: Infinity }],
      budget: { damage(self, target) { const haste = 1 + derive(self).abilityHaste / 100; return { physical: attackDamage(self) * Math.max(0, Math.min(ATTACK_SPEED_CAP, derive(self).attackSpeed + self.spec.base.attackSpeed.ratio * eAS) - derive(self).attackSpeed) * Math.min(1, eTime / (eCD / haste)) + Math.max(pMin, derive(target).maxHp * pShare / 2) / (pCD + 1 / derive(self).attackSpeed) + evaluate(qDamage, self, target) / (qCD / haste + qCast) + evaluate(rDamage, self, target) / (rCD / haste + rTime + rLife), magic: evaluate(eDamage, self, target) / (eCD / haste) }; }, healing: (self) => evaluate(wShield, self, self) / (wCD / (1 + derive(self).abilityHaste / 100)) },
      hooks: {
        onAttackBeforeDamage: cadenceBefore,
        onAttackHit: cadenceAfter,
        onAttackPetHit: cadenceAfter,
        onAbilityHit(ctx) { if (ctx.ability.key === "Wslow" && targetClass(ctx.enemy) === "champion") ctx.memory["jarvan:wCount"] = Number(ctx.memory["jarvan:wCount"] ?? 0) + 1; },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            ctx.memory["jarvan:wCount"] = 0;
            for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - ctx.self.x) <= wRadius + EPS) hit(ctx, contact, slow);
            ctx.apply({ type: "shield", amount: { base: evaluate(wShield, ctx.self, ctx.self) + derive(ctx.self).maxHp * wAmp * Number(ctx.memory["jarvan:wCount"]) }, duration: wShieldTime }, true);
          }
          if (ctx.ability.key === "E") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.min(eRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.self.x - ctx.enemy.x))), x = ctx.self.x + direction * distance;
            spawnPet(ctx.world, ctx.self, { kind: FLAG, name: e.name, targetClass: "minion", hp: Infinity, armor: 0, mr: 0, radius: flagRadius, pathingRadius: flagPath, moveSpeed: 0, duration: eTime, untargetable: true }, x);
            for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - x) <= eRadius + contact.target.spec.base.radius + EPS) hit(ctx, contact, flagHit);
            aura(ctx);
          }
          if (ctx.ability.key === "Q") {
            const direction = Number(ctx.memory["castDirection:Q"] ?? directionTo(ctx.self, ctx.enemy)) * (ctx.aim?.direction ?? 1), origin = ctx.self.x;
            for (const contact of contacts(ctx)) { const ahead = (contact.target.x - origin) * direction; if (ahead + contact.target.spec.base.radius >= qMin - EPS && ahead - contact.target.spec.base.radius <= qMax + EPS) { const share = contact.pet ? 1 : skillshotChance(ctx.world, contact.target, ctx.tick - ticks(qCast), 0, qWidth / 2); if (share > 0) hit(ctx, contact, lance, lance.onHit!, share); } }
            const flag = flags(ctx.world, ctx.self).filter((body) => { const ahead = (body.x - origin) * direction; return ahead >= -flagRadius && ahead <= qFlagRange + flagRadius + EPS; }).sort((a, b) => Math.abs(b.x - origin) - Math.abs(a.x - origin))[0];
            if (flag) {
              const dx = dashDistance(ctx.world, ctx.self, flag.x - origin), duration = Math.max(1, ticks(Math.abs(dx) / dashSpeed));
              ctx.memory["jarvan:qSerial"] = Number(ctx.memory["jarvan:qSerial"] ?? 0) + 1; ctx.memory["jarvan:qPrevious"] = origin; ctx.memory["jarvan:qEndpoint"] = origin + dx;
              ctx.self.action = { kind: "dash", ability: "Qdash", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: Math.sign(dx) * dashSpeed / 30, stopAtContact: false, unstoppable: false, crossTerrain: true };
              knockPath(ctx, origin, origin);
            }
          }
          if (ctx.ability.key === "R") {
            const target = chooseR(ctx.world, ctx.self, ctx.aim); if (!target) return;
            ctx.memory["jarvan:rLeaping"] = true; ctx.memory["jarvan:rLastTarget"] = target.target.x; ctx.memory["jarvan:rTarget"] = target.pet?.id ?? -1;
            ctx.apply({ type: "state", state: "displacementImmune", duration: rTime }, true);
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "R", memoKey: "jarvan:ring", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: 0 });
            ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rTime), perTick: 0, stopAtContact: false, unstoppable: true, crossTerrain: true };
          }
          if (ctx.ability.key === "R2") finishRing(ctx);
        },
        onTick(ctx) {
          aura(ctx);
          if (ctx.memory["jarvan:ringUntil"] && ctx.tick >= Number(ctx.memory["jarvan:ringUntil"])) finishRing(ctx);
          if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "Qdash") { knockPath(ctx, Number(ctx.memory["jarvan:qPrevious"] ?? ctx.self.x), ctx.self.x); ctx.memory["jarvan:qPrevious"] = ctx.self.x; }
        },
        onDashTick(ctx) {
          if (ctx.ability.key === "R") {
            const id = Number(ctx.memory["jarvan:rTarget"] ?? -1), actual = id === -1 ? ctx.world.units[1 - ctx.self.side]! : ctx.world.pets.find((pet) => pet.id === id);
            if (actual && ("alive" in actual ? actual.alive : actual.hp > 0 && actual.endTick > ctx.tick)) ctx.memory["jarvan:rLastTarget"] = actual.x;
            ctx.action.perTick = (Number(ctx.memory["jarvan:rLastTarget"]) - ctx.self.x) / Math.max(1, ctx.action.endTick - ctx.tick + 1);
          }
          if (ctx.ability.key === "Qdash") { knockPath(ctx, Number(ctx.memory["jarvan:qPrevious"] ?? ctx.self.x), ctx.self.x); ctx.memory["jarvan:qPrevious"] = ctx.self.x; ctx.action.perTick = Math.sign(ctx.action.perTick) * Math.min(dashSpeed / 30, Math.abs(Number(ctx.memory["jarvan:qEndpoint"]) - ctx.self.x)); }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Qdash") { if (!ctx.interrupted) ctx.self.x = Number(ctx.memory["jarvan:qEndpoint"] ?? ctx.self.x); knockPath(ctx, Number(ctx.memory["jarvan:qPrevious"] ?? ctx.self.x), ctx.self.x); return; }
          if (ctx.ability.key !== "R") return;
          delete ctx.memory["jarvan:rLeaping"];
          if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection || ctx.interrupted) { finishRing(ctx); return; }
          const x = ctx.self.x, until = ctx.tick + ticks(rLife), left = ctx.world.nextId++, right = ctx.world.nextId++;
          ctx.memory["jarvan:ringUntil"] = until; ctx.memory["jarvan:ringRecast"] = ctx.tick + ticks(rRecast); ctx.memory["jarvan:ringLeft"] = left; ctx.memory["jarvan:ringRight"] = right;
          ctx.world.terrain.push({ id: left, owner: ctx.self.side, from: x - rOuter, to: x - rInner, endTick: until }, { id: right, owner: ctx.self.side, from: x + rInner, to: x + rOuter, endTick: until });
          for (const contact of contacts(ctx)) {
            if (Math.abs(contact.target.x - x) <= rRing + contact.target.spec.base.radius + EPS) hit(ctx, contact, impact);
            const distance = Math.abs(contact.target.x - x);
            if (distance < rInner - contact.target.spec.base.pathingRadius || distance > rOuter + contact.target.spec.base.pathingRadius) continue;
            const outward = distance >= rRing, destination = outward ? rOuter + contact.target.spec.base.pathingRadius : Math.max(0, rInner - contact.target.spec.base.pathingRadius), push = Math.abs(destination - distance);
            const effects: Effect[] = contact.pet ? [{ type: "cc", cc: "airborne", duration: rPushTime }] : [{ type: "displace", direction: outward ? "away" : "toward", originX: x, distance: push, duration: rPushTime, stopAtWall: false }];
            hit(ctx, contact, perimeter, effects);
          }
          // Standard sight records visibility without exposing stealth or overriding nearsight.
          for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - x) <= rSight) applyEffect(ctx.world, ctx.self, contact.target, { type: "state", state: "standardSight", duration: rLife }, { scale: 1 });
        },
        onLethal(ctx) {
          for (const flag of flags(ctx.world, ctx.self)) destroyPet(ctx.world, flag);
          ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== "buff:jarvan:flagAura");
          if (ctx.memory["jarvan:rLeaping"]) {
            delete ctx.memory["jarvan:rLeaping"];
            ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.ability === "R" && status.kind === "state" && status.key === "displacementImmune"));
            finishRing(ctx);
          }
          return false;
        },
      },
    };
  },
};
export default jarvan;
