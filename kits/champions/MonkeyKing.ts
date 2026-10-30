/** Wukong: an independently attackable Decoy and independently guarded copied Q/R. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackTiming, canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, canTarget, directionTo, inStasis } from "../../engine/sim/combat";
import { canAttack, ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { destroyPet, nearestPetTarget, petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext, KitHooks } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const DECOY = "wukong:decoy";
const wukong: KitModule = {
  champion: "MonkeyKing",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R"), pet = kit.pet("Decoy");
    const armor = p.levelValue("Wukong gains"), regen = p.quoted("additional 0.35% of his maximum health every 5 seconds") / 100, regenPeriod = p.quoted("additional 0.35% of his maximum health every 5 seconds", 1);
    const stackTime = p.quoted("Strength of Stone for 5 seconds"), maxStacks = p.quoted("stacking up to 5 times"), decayTime = p.gameQuoted("mSpell.DataValues.FallOffRate.values: [1.0,1.0,1.0,1.0,1.0,1.0,1.0]");
    p.quote("will specifically not be if the target is invulnerable");
    const qDamage = q.formula("Bonus Physical Damage"), qRange = q.number("Bonus Range"), qShred = q.shareOf("Armor Reduction"), qWindow = q.quoted("next basic attack within 5 seconds"), shredTime = q.quoted("armor reduction for 3 seconds"), qReduce = q.quoted("reduced by 0.5 seconds"), qCooldown = q.cooldown();
    q.textField("cooldownStart"); q.quote("uncancellable windup"); q.quote("resets Wukong's and his clone's basic attack timer");
    const cloneFraction = w.fraction("Clone Outgoing Damage"), stealthTime = w.quoted("invisibility for 1 second"), cloneTime = w.quoted("casting position for 4 seconds"), [wMin, wMax] = w.fieldNumbers("targetRange"), wSpeed = w.field("speed"), wCooldown = w.cooldown();
    if (wMin === undefined || wMax === undefined) throw new Error("Wukong: missing W dash bounds");
    w.quote("Wukong can cast any of his abilities during the dash"); w.quote("Using a basic attack breaks the stealth at the end of the attack windup"); w.quote("immune to stasis");
    const hpShare = pet.stat("hp") / 100, armorShare = pet.stat("armor") / 100, mrShare = pet.stat("magicresist") / 100, adShare = pet.stat("damage") / 100, asShare = pet.stat("attackspeed") / 100;
    const petRadius = pet.stat("radius"), petPath = pet.stat("pathingradius"), petRange = pet.stat("range"); pet.stat("movespeed");
    pet.quote("It is static"); pet.quote("Champion"); pet.quote("basic damage"); pet.quote("block, dodge, and blind"); pet.quote("Disarm");
    // The primary pet protection field has an expansion error. The full raw W restores its exact rank series.
    w.quote("{{#vardefine:cd_1|40}}"); w.quote("{{#vardefine:cd_5|60}}"); pet.quote("{{#var:cd_1}};{{#var:cd_1}} to {{#var:cd_5}} for 4");
    const eDamage = e.formula("Magic Damage"), eAS = e.fraction("Bonus Attack Speed"), eASTime = e.quoted("bonus attack speed for 5 seconds"), eRange = e.field("targetRange"), eRadius = e.field("effectRadius"), eSpeed = e.gameQuoted("mSpell.DataValues.DashSpeed.values: [1050.0,1050.0,1050.0,1050.0,1050.0,1050.0,1050.0]"), eOffset = e.quoted("offset distance of 75 units"), eCooldown = e.cooldown(), extraTargets = e.gameQuoted("mSpell.DataValues.ExtraTargets.values: [2.0,2.0,2.0,2.0,2.0,2.0,2.0]");
    e.quote("interrupts the attack windup of enemies targeting Wukong"); e.quote("Crushing Blow can be cast during the dash");
    e.quote("Any effect that would disrupt an attack's windup, aside from the ones noted above, are ignored by basic attacks with uncancellable windups.");
    const rDamage = r.formula("Physical Damage Per Tick"), rTotal = r.formula("Maximum Total Physical Damage"), rDuration = r.quoted("up to 2 seconds"), rInterval = r.quoted("every 0.25 seconds"), knockTime = r.quoted("once for 0.6 seconds"), rSpeed = r.quoted("gaining 20% bonus movement speed") / 100, rRadius = r.field("effectRadius"), rCancel = r.quoted("recast after 0.5 seconds"), rGate = r.quoted("After 1 second"), rWindow = r.quoted("within 8 seconds of the first cast"), rCooldown = r.cooldown(), monsterCap = r.levelValue("damage is capped"), basicLock = r.quoted("first {{fd|0.3}} seconds"), spinRange = r.quoted("attack ranges are reduced to 50");
    r.quote("Spell shield will block one instance of damage"); r.quote("Blocking the knock up will still grant immunity"); r.quote("remaining duration always stays the same"); r.textField("cooldownStart");
    for (const data of [p, q, w, e, r]) data.gameQuote("objectPath:");
    q.gameQuote("mSpell.DataValues.BuffDuration.values: [6.0,6.0,6.0,6.0,6.0,6.0,6.0]");
    w.gameQuote("mSpell.spellCastTime: 0.25");
    for (const data of [w, e, r]) data.gameQuote("mSpell.mCastingBreaksStealth: true");

    kit.assume("All five exact raw templates and the complete pinned Decoy article are retained. The pet protection expansion error is preserved; the W template's exact 40/45/50/55/60% outgoing rank series restores it. Primary Q's five-second empowerment and W's no cast time take precedence over the binary's six-second BuffDuration and 0.25 cast metadata. Passive armor follows the source's level-20 extrapolation. No prefight stacks, minion wave or damage history is supplied.");
    kit.assume("Decoy has real clone classification and champion targeting class. Its maximum/current HP both snapshot 100% owner current HP, as the infobox does not specify a different maximum. Armor/MR, AD/AP, critical chance/modifier, penetration, attack speed and basic on-hit packets snapshot at summon; subsequent E grants its sourced AS and Q/R are copied explicitly. The sources do not specify every snapshot or critical/on-hit detail; standard basic attack crit and on-hit rules apply independently, without copying the owner's champion hooks. Its own blindness, disarm, cripple, damage and death remain independent. Stasis is ignored; the shared rule removes it on owner death. It stays at the summon position and targets a reachable last damaged body, otherwise the nearest reachable body; player commands and deception are outside the duel.");
    kit.assume("Q resets both attack timers and gives each body a separate five-second uncancellable attack. Its basic and noncritical proc damage resolve before armor reduction. The spell-shield flag guards the empowered attack, independently for each body. Owner Q cooldown starts at owner launch/expiry; accepted damage reduces its current running cooldown by 0.5 seconds per actual damage packet. Basic on-hits grant Stone stacks even when blocked, except invulnerability; separate Q proc damage does not grant a duplicate basic stack. Positive ability damage grants stacks only against actual champion/monster bodies.");
    kit.assume("Nimbus Strike is a finite targeted dash using the binary's 1050 speed and the primary's 75-unit endpoint offset toward the target location captured at release; it crosses walls and can be knocked down. Only successful arrival damages its target and grants AS, regardless of whether its damage is guarded. Up to two actual additional enemy pets inside the primary's 187.5 radius receive independent guarded packets; binary generic ExtraTargetRange 700 is retained but does not replace that radius. Cosmetic E clones never multiply damage against a single body. Q can overlay E; every ability can overlay W.");
    kit.assume("Each Cyclone spins for two seconds with eight 0.25-second packets at ceil(n*7.5) ticks, first at 0.25 seconds; damage and control are independently guarded per body/source. An attempted first knockup consumes that cast's shared owner/clone lock; a spell-shielded first knockup additionally gives immunity across both casts, as explicitly stated. Ordinary spell shields still stop only one damage instance. The owner may walk and cannot attack while spinning; CC does not cancel this death-interrupted spin. Basic spells are locked for 0.3 seconds, then end the owner spin. A newly summoned clone inherits the exact remaining spin; Q only ends that transferred clone's current spin. Existing clone spins continue independently after owner cancellation. R can be ended manually after 0.5 seconds, then reused once after one second and before eight seconds from first activation; cooldown starts when the second spin ends or the window closes. Monster cap is applied per quarter-second. Tick rounding and scalar geometry remain simulator limits.");

    const own = (ctx: HookContext) => petsOf(ctx.world, ctx.self.side, DECOY).filter((body) => body.hp > 0 && body.endTick > ctx.tick);
    const championOrMonster = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion" || target.spec.targetClass === "monster";
    const stone = (ctx: HookContext) => { if (!championOrMonster(ctx.enemy) || hasState(ctx.enemy, "invulnerable") || inStasis(ctx.enemy)) return; ctx.memory.stone = Math.min(maxStacks, Number(ctx.memory.stone ?? 0) + 1); ctx.memory.stoneDecay = ctx.tick + ticks(stackTime); ctx.buff("stone", "armor", armor * (1 + Number(ctx.memory.stone)), Infinity); };
    const reduceQ = (ctx: HookContext) => { if (!ctx.self.cooldownHeld.Q && Number.isFinite(ctx.self.cooldownReady.Q)) ctx.self.cooldownReady.Q = Math.max(ctx.tick, (ctx.self.cooldownReady.Q ?? ctx.tick) - ticks(qReduce)); };
    const qEffects: Effect[] = [{ type: "damage", damageType: "physical", amount: qDamage, label: "Crushing Blow", noLifeSteal: true }, { type: "stat", stat: "armorReductionPercent", amount: { base: qShred }, duration: shredTime }];
    const basicUsable = (self: Unit, world: World) => !self.memory.spinning || world.tick >= Number(self.memory.spinStart) + ticks(basicLock);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime(), delivery: { kind: "self" }, cooldownAfter: "empower", overlay: true, overlayResumedDash: true, allowedDuringChannel: ["R", "R2"], usable: basicUsable, onSelf: [{ type: "empower", attacks: 1, window: qWindow, bonusRange: qRange, uncancellable: true, spellShield: true, resetAttack: true, onHit: qEffects }], roles: ["buff", "damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "dash", direction: "away", distance: wMax, minDistance: wMin, speed: wSpeed, crossTerrain: true }, allowedDuringChannel: ["R", "R2"], usable: basicUsable, flags: { grounded: w.flag("grounded"), knockdown: w.flag("knockdown") }, roles: ["escape", "defense"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "dash", direction: "target", distance: eRange, speed: eSpeed, through: true }, overlay: true, overlayResumedDash: true, allowedDuringChannel: ["R", "R2"], usable: (self, world) => basicUsable(self, world) && Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= eRange + self.spec.base.radius + world.units[self.side === 0 ? 1 : 0].spec.base.radius, flags: { grounded: e.flag("grounded"), knockdown: e.flag("knockdown"), spellShield: true, petContactHooks: true }, roles: ["engage", "damage"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, channel: { duration: rDuration, interruptible: false, mobile: true, range: rRadius }, overlay: true, overlayResumedDash: true, usable: (self) => !self.memory.rPending, roles: ["damage", "cc"] },
      { key: "Rstop", name: "Cyclone (end)", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, allowedDuringChannel: ["R", "R2"], usable: (self, world) => !!self.memory.spinning && world.tick >= Number(self.memory.spinStart) + ticks(rCancel), budgetExcluded: true, countsAsCast: false },
      { key: "R2", name: "Cyclone (second cast)", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, channel: { duration: rDuration, interruptible: false, mobile: true, range: rRadius }, overlay: true, overlayResumedDash: true, usable: (self, world) => !!self.memory.rPending && !self.memory.rSecond && !self.memory.spinning && world.tick >= Number(self.memory.rAgain) && world.tick < Number(self.memory.rUntil), budgetExcluded: true, roles: ["damage", "cc"] },
    ];
    const get = (key: string) => abilities.find((spec) => spec.key === key)!;
    const finishR = (ctx: HookContext) => { ctx.memory.rPending = false; ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rCooldown, derive(ctx.self).abilityHaste)); };
    const endSpin = (ctx: HookContext) => {
      if (!ctx.memory.spinning) return;
      ctx.memory.spinning = false; ctx.memory.rAgain = ctx.tick + ticks(rGate);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "buff:cycloneSpeed");
      if (ctx.memory.rSecond) finishR(ctx);
    };
    const syncDamage = (ctx: HookContext) => { if (ctx.enemy.petId !== undefined) { const target = ctx.world.pets.find((body) => body.id === ctx.enemy.petId); if (target) { target.statuses = ctx.enemy.statuses; target.memory = ctx.enemy.memory; } } };
    const actor = (ctx: HookContext, body: Pet): Unit => {
      const view = petFormulaTarget(body, ctx.self, ctx.tick), snapshot = JSON.parse(String(body.memory.stats)) as { ad: number; bonusAd: number; ap: number; as: number; crit: number; modifier: number; lethality: number; magicPen: number; armorPen: number; magicPenPercent: number };
      view.spec = { ...view.spec, base: { ...view.spec.base, ad: snapshot.ad - snapshot.bonusAd, attackSpeed: { base: snapshot.as, ratio: snapshot.as, bonus: 0 }, windup: ctx.self.spec.base.windup, critDamageModifier: snapshot.modifier }, bonus: { ad: snapshot.bonusAd, ap: snapshot.ap, critChance: snapshot.crit, lethality: snapshot.lethality, magicPen: snapshot.magicPen }, attack: { range: petRange, ranged: false, projectile: false, onHitToPets: true, onHit: body.spec.effectsForHit?.({ world: ctx.world, pet: body, target: ctx.enemy, effects: [] }).map((effect) => effect.type === "damage" ? { ...effect, amountFor: (source, target) => (effect.amountFor?.(source, target) ?? evaluate(effect.amount, source, target)) * cloneFraction, noLifeSteal: true } : effect) } };
      // Outgoing damage scales both base damage and all independent on-hit packets once.
      view.statuses.push({ kind: "stat", key: "armorPen", value: snapshot.armorPen, source: view.side, startTick: ctx.tick, endTick: ctx.tick + 1 }, { kind: "stat", key: "magicPenPercent", value: snapshot.magicPenPercent, source: view.side, startTick: ctx.tick, endTick: ctx.tick + 1 });
      view.spec.hooks = {
        onAttackHit(hit) { stone({ ...ctx, enemy: hit.enemy }); }, onAttackPetHit(hit) { stone({ ...ctx, enemy: hit.enemy }); },
      };
      return view;
    };
    const hit = (ctx: HookContext, caster: Unit, target: Unit, spec: AbilitySpec, effects: Effect[]) => { const actual = target.petId === undefined ? undefined : ctx.world.pets.find((body) => body.id === target.petId); if (actual) { abilityHitPet(ctx.world, caster, actual, spec, effects, "area"); } else abilityHit(ctx.world, caster, target, spec, effects); };
    const pulse = (ctx: HookContext, caster: Unit, stage: number) => {
      const dealtBefore = caster.totals.damageDealt;
      const targets = [ctx.enemy, ...ctx.world.pets.filter((body) => body.owner !== ctx.self.side && !body.spec.untargetable && !body.spec.hitPoints).map((body) => petFormulaTarget(body, ctx.self, ctx.tick))];
      for (const target of targets) {
        if (!target.alive || Math.abs(target.x - caster.x) > rRadius + target.spec.base.radius || inStasis(target) || hasState(target, "untargetable")) continue;
        const id = target.petId ?? "champion", key = `cyclone:${stage}:${id}`, first = !ctx.memory[key] && !target.statuses.some((s) => s.key === "cyclone:shieldImmunity" && s.source === ctx.self.side && s.endTick > ctx.tick);
        ctx.memory[key] = true;
        if (first && hasState(target, "spellShield")) { target.statuses.push({ kind: "mark", key: "cyclone:shieldImmunity", source: ctx.self.side, value: 1, startTick: ctx.tick, endTick: Number(ctx.memory.rUntil) }); syncDamage({ ...ctx, enemy: target }); }
        const damage: Effect = { type: "damage", damageType: "physical", amount: rDamage, amountFor: (source, victim) => (victim.spec.targetClass === "monster" ? Math.min(monsterCap * rInterval, evaluate(rDamage, source, victim)) : evaluate(rDamage, source, victim)) * (source.petId === undefined ? 1 : cloneFraction), petDamageCategory: "area" };
        hit(ctx, caster, target, { ...get("R"), key: "Rtick", name: "Cyclone", channel: undefined, flags: { spellShield: true, petContactHooks: true } }, [damage, ...(first ? [{ type: "cc", cc: "airborne", duration: knockTime } as Effect] : [])]);
      }
      if (caster.petId !== undefined) ctx.self.totals.damageDealt += caster.totals.damageDealt - dealtBefore;
    };
    const spawn = (ctx: HookContext) => {
      for (const old of own(ctx)) destroyPet(ctx.world, old);
      const copiedOnHit = [...(ctx.self.spec.attack.onHit ?? [])];
      const stats = derive(ctx.self), body = spawnPet(ctx.world, ctx.self, { kind: DECOY, name: pet.name, targetClass: "champion", unitClass: "clone", hp: ctx.self.hp * hpShare, armor: (stats.armor.base + stats.armor.bonus) * armorShare, mr: (stats.mr.base + stats.mr.bonus) * mrShare, radius: petRadius, pathingRadius: petPath, moveSpeed: 0, duration: cloneTime, stateImmune: ["stasis"], ccImmune: ["stasis"], effectsForHit: () => copiedOnHit }, ctx.self.x);
      body.memory.stats = JSON.stringify({ ad: stats.ad * adShare, bonusAd: stats.bonusAd, ap: stats.ap, as: stats.attackSpeed * asShare, crit: stats.critChance, modifier: ctx.self.spec.base.critDamageModifier, lethality: stats.lethality, magicPen: stats.magicPen, armorPen: 1 - stats.armorPen.reduce((n, v) => n * (1 - v), 1), magicPenPercent: 1 - stats.magicPenPercent.reduce((n, v) => n * (1 - v), 1) });
      body.memory.qUntil = ctx.self.statuses.find((status) => status.kind === "empower" && status.key === "Q")?.endTick ?? -1;
      if (ctx.memory.transferEnd !== undefined) { body.memory.spinEnd = ctx.memory.transferEnd; body.memory.spinStart = ctx.memory.transferStart!; body.memory.spinNext = ctx.memory.transferNext!; body.memory.stage = ctx.memory.stage!; body.memory.transferred = true; }
      delete ctx.memory.transferEnd; delete ctx.memory.transferStart; delete ctx.memory.transferNext;
      return body;
    };
    const cloneTick = (ctx: HookContext, body: Pet) => {
      // Pet stasis immunity is sourced, while other disabling CC belongs to the clone itself.
      body.statuses = body.statuses?.filter((s) => !(s.key === "stasis" && s.kind === "state") && s.endTick > ctx.tick);
      const source = actor(ctx, body), spinning = ctx.tick <= Number(body.memory.spinEnd ?? -1);
      if (spinning) {
        while (Number(body.memory.spinNext) <= rDuration / rInterval && ctx.tick >= Number(body.memory.spinStart) + Math.ceil(Number(body.memory.spinNext) * rInterval * 30)) { pulse(ctx, source, Number(body.memory.stage)); body.memory.spinNext = Number(body.memory.spinNext) + 1; }
        return;
      }
      const qActive = ctx.tick < Number(body.memory.qUntil ?? -1);
      const preferred = ctx.memory.lastTarget === -1 ? ctx.enemy : ctx.world.pets.find((candidate) => candidate.id === ctx.memory.lastTarget);
      const reachable = (target: Unit | Pet | undefined) => { if (!target) return false; const view = "owner" in target ? petFormulaTarget(target, source, ctx.tick) : target; return view.alive && canTarget(view, source) && Math.abs(target.x - body.x) <= petRange + (qActive ? qRange : 0) + view.spec.base.radius; };
      const target = reachable(preferred) ? preferred : nearestPetTarget(ctx.world, body);
      if (!canAttack(source) && (!body.memory.attack || !(JSON.parse(String(body.memory.attack)) as { q: boolean }).q)) { delete body.memory.attack; return; }
      if (body.memory.attack) {
        const packet = JSON.parse(String(body.memory.attack)) as { at: number; pet?: number; q: boolean; blind: boolean; crit: number };
        const actual = packet.pet === undefined ? ctx.enemy : ctx.world.pets.find((candidate) => candidate.id === packet.pet);
        if (!actual || (!packet.q && !reachable(actual))) { delete body.memory.attack; body.nextAttackTick = ctx.tick; return; }
        if (ctx.tick >= packet.at) {
          delete body.memory.attack;
          const victim = "owner" in actual ? petFormulaTarget(actual, source, ctx.tick) : actual;
          attackHit(ctx.world, source, victim, packet.blind, packet.q ? qEffects.map((effect) => effect.type === "damage" ? { ...effect, amountFor: (caster, victim) => evaluate(qDamage, caster, victim) * cloneFraction } : effect) : [], undefined, false, { baseDamageScale: cloneFraction, critChance: packet.crit, ...(packet.q ? { spellShield: true } : {}) });
          if ("owner" in actual) { actual.statuses = victim.statuses; actual.memory = victim.memory; }
          ctx.self.totals.damageDealt += source.totals.damageDealt;
        }
        return;
      }
      if (!reachable(target) || ctx.tick < body.nextAttackTick) return;
      const timing = attackTiming(source); body.nextAttackTick = ctx.tick + timing.total;
      body.memory.attack = JSON.stringify({ at: ctx.tick + timing.windup, ...("owner" in target! ? { pet: target!.id } : {}), q: qActive, blind: ccTypes(source).has("blind"), crit: derive(source).critChance });
      if (qActive) body.memory.qUntil = -1;
    };
    const behavior: Behavior = (view) => {
      const reserves = view.mode === "hold" || view.mode === "trade";
      const ordinary = defaultBehavior(reserves ? { ...view, self: { ...view.self, spec: { ...view.self.spec, abilities: view.self.spec.abilities.filter((spec) => !["R", "R2", "Rstop"].includes(spec.key)) } } } : view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return ordinary;
      const reaction = react(view); if (reaction) return reaction;
      if (view.mode === "flee") return ordinary;
      const ready = (key: string) => canCast(view.world, view.self, get(key));
      if (!reserves && !view.self.memory.spinning && view.distance <= rRadius && ready("R2")) return { kind: "cast", ability: "R2" };
      if (view.self.memory.spinning) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      if (ready("Q") && view.distance <= view.self.spec.attack.range + qRange) return { kind: "cast", ability: "Q" };
      if (canStartAttack(view.world, view.self)) return { kind: "attack" };
      if (ready("E") && view.distance <= eRange) return { kind: "cast", ability: "E" };
      if (!reserves && ready("R") && view.distance <= rRadius) return { kind: "cast", ability: "R" };
      return ordinary;
    };
    const hooks: KitHooks = {
      onStart(ctx) { ctx.memory.stone = 0; ctx.buff("stone", "armor", armor, Infinity); },
      onTick(ctx) {
        if (Number(ctx.memory.stone ?? 0) > 0 && ctx.tick >= Number(ctx.memory.stoneDecay)) { ctx.memory.stone = Number(ctx.memory.stone) - 1; ctx.memory.stoneDecay = Number(ctx.memory.stoneDecay) + ticks(decayTime); }
        ctx.buff("stone", "armor", armor * (1 + Number(ctx.memory.stone ?? 0)), Infinity);
        ctx.regenerate(derive(ctx.self).maxHp * regen * (1 + Number(ctx.memory.stone ?? 0)) / regenPeriod / 30);
        if (ctx.memory.spinning) {
          while (Number(ctx.memory.spinNext) <= rDuration / rInterval && ctx.tick >= Number(ctx.memory.spinStart) + Math.ceil(Number(ctx.memory.spinNext) * rInterval * 30)) { pulse(ctx, ctx.self, Number(ctx.memory.stage)); ctx.memory.spinNext = Number(ctx.memory.spinNext) + 1; }
          if (ctx.tick >= Number(ctx.memory.spinEnd) || !ctx.self.alive) endSpin(ctx);
          const speed = ctx.self.statuses.find((s) => s.memoKey === "buff:nimbusSpeed"); if (speed) speed.endTick = ctx.tick + ticks(eASTime);
        }
        if (ctx.memory.rPending && !ctx.memory.spinning && ctx.tick >= Number(ctx.memory.rUntil)) finishR(ctx);
        for (const body of own(ctx)) cloneTick(ctx, body);
      },
      onCastStart(ctx) {
        if (ctx.ability.key !== "W") ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible"));
        if (["Q", "W", "E"].includes(ctx.ability.key) && ctx.memory.spinning) {
          if (ctx.ability.key === "W") { ctx.memory.transferEnd = ctx.memory.spinEnd!; ctx.memory.transferStart = ctx.memory.spinStart!; ctx.memory.transferNext = ctx.memory.spinNext!; }
        }
      },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (key === "Q") for (const body of own(ctx)) { body.memory.qUntil = ctx.tick + ticks(qWindow); body.nextAttackTick = ctx.tick; delete body.memory.attack; if (body.memory.transferred && body.memory.stage === ctx.memory.stage) body.memory.spinEnd = ctx.tick - 1; }
        if (key === "W") { spawn(ctx); ctx.apply({ type: "state", state: "invisible", duration: stealthTime }, true); }
        if (key === "E") {
          ctx.memory.eDistance = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - eOffset); ctx.memory.eDirection = directionTo(ctx.self, ctx.enemy);
          for (const windup of [ctx.enemy.action, ctx.enemy.pendingAttack]) {
            if (windup?.kind !== "windup" || windup.pet !== undefined || windup.uncancellable) continue;
            if (ctx.enemy.action === windup) ctx.enemy.action = undefined;
            if (ctx.enemy.pendingAttack === windup) delete ctx.enemy.pendingAttack;
            ctx.enemy.attackReadyTick = ctx.tick;
          }
          for (const body of ctx.world.pets) {
            if (body.owner === ctx.self.side || body.spec.attack?.attackLike !== true || body.windup?.target !== ctx.self.side) continue;
            delete body.windup; body.nextAttackTick = ctx.tick;
          }
        }
        if (key === "R" || key === "R2") {
          if (key === "R") { ctx.memory.rPending = true; ctx.memory.rSecond = false; ctx.memory.rUntil = ctx.tick + ticks(rWindow); ctx.self.cooldownReady.R = Infinity; }
          else ctx.memory.rSecond = true;
          ctx.memory.stage = Number(ctx.memory.stage ?? 0) + 1; ctx.memory.spinning = true; ctx.memory.spinStart = ctx.tick; ctx.memory.spinEnd = ctx.tick + ticks(rDuration); ctx.memory.spinNext = 1;
          ctx.buff("cycloneSpeed", "moveSpeedPercent", rSpeed, rDuration); ctx.apply({ type: "state", state: "ghosted", duration: rDuration }, true);
          for (const body of own(ctx)) { body.memory.spinStart = ctx.tick; body.memory.spinEnd = ctx.memory.spinEnd; body.memory.spinNext = 1; body.memory.stage = ctx.memory.stage; body.memory.transferred = false; delete body.memory.attack; }
        }
      },
      onChannelInterrupt(ctx) { if (ctx.ability.key === "R" || ctx.ability.key === "R2") endSpin(ctx); },
      onDashTick(ctx) {
        if (ctx.ability.key !== "E" || ctx.memory.eDistance === undefined) return;
        const distance = Number(ctx.memory.eDistance), duration = Math.max(1, Math.ceil(distance / (eSpeed / 30)));
        ctx.action.perTick = Number(ctx.memory.eDirection) * distance / duration; ctx.action.endTick = ctx.action.startTick + duration;
        delete ctx.memory.eDistance; delete ctx.memory.eDirection;
      },
      onDashEnd(ctx) {
        if (ctx.ability.key !== "E" || ctx.interrupted || !ctx.self.alive) return;
        hit(ctx, ctx.self, ctx.enemy, get("E"), [{ type: "damage", damageType: "magic", amount: eDamage }]);
        const additional = ctx.world.pets.filter((body) => body.owner !== ctx.self.side && !body.spec.untargetable && Math.abs(body.x - ctx.enemy.x) <= eRadius + body.spec.radius).sort((a, b) => Math.abs(a.x - ctx.enemy.x) - Math.abs(b.x - ctx.enemy.x) || a.id - b.id).slice(0, extraTargets);
        for (const target of additional) hit(ctx, ctx.self, petFormulaTarget(target, ctx.self, ctx.tick), get("E"), [{ type: "damage", damageType: "magic", amount: eDamage }]);
        ctx.buff("nimbusSpeed", "attackSpeed", eAS, eASTime);
        for (const body of own(ctx)) applyEffect(ctx.world, ctx.self, petFormulaTarget(body, ctx.self, ctx.tick), { type: "stat", stat: "attackSpeed", amount: { base: eAS }, duration: eASTime }, { scale: 1 });
      },
      onAttackLaunch(ctx) { ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible")); },
      onAttackHit(ctx) { stone(ctx); ctx.memory.lastTarget = -1; },
      onAttackPetHit(ctx) { stone(ctx); ctx.memory.lastTarget = ctx.pet.id; },
      onDamageDealt(ctx) { if (ctx.amount > 0 || ctx.absorbed > 0) ctx.memory.lastTarget = ctx.enemy.petId ?? -1; },
      onDamageObserved(ctx) {
        const sourceBody = ctx.source.petId === undefined ? undefined : ctx.world.pets.find((body) => body.id === ctx.source.petId);
        if (ctx.source !== ctx.self && !(sourceBody?.owner === ctx.self.side && sourceBody.spec.kind === DECOY)) return;
        if (ctx.amount <= 0 && ctx.absorbed <= 0) return;
        reduceQ(ctx);
        if (!ctx.attack && ctx.ability !== "Crushing Blow") stone({ ...ctx, enemy: ctx.target });
      },
    };
    return { abilities, hooks, behavior, attack: { onHitToPets: true, bonusRangeFor: (self) => self.memory.spinning ? spinRange - self.spec.attack.range : 0 }, budget: { damage: (self, target) => ({ physical: evaluate(qDamage, self, target) / cooldownAfterHaste(qCooldown, derive(self).abilityHaste) + evaluate(rTotal, self, target) / cooldownAfterHaste(rCooldown, derive(self).abilityHaste) + derive(self).ad * derive(self).attackSpeed * cloneFraction * cloneTime / cooldownAfterHaste(wCooldown, derive(self).abilityHaste), magic: evaluate(eDamage, self, target) / cooldownAfterHaste(eCooldown, derive(self).abilityHaste) }) } };
  },
};
export default wukong;
