/** Diana's actual Moonlight contacts, third strike, spheres and delayed Moonfall. */
import type { KitModule } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlocked, projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, scaled, ticks } from "./util";

const MOON = "diana:moonlight", STACKS = "diana:blade", ORBS = "diana:orbs", SHIELD = "diana:shield";
type Contact = { target: Unit; pet?: Pet };
const diana: KitModule = {
  champion: "Diana",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const innateAS = p.levelValue("Diana gains") / 100, spellAS = p.levelValue("After casting an ability") / 100, asTime = p.quoted("for 5 seconds"), stackTime = p.quoted("a stack of Moonsilver Blade for 5 seconds"), stackMax = p.quoted("stacking up to 2 times"), cleaveRadius = p.field("effectRadius");
    const cleave = { base: p.levelValue("cleave nearby enemies"), ratios: { AP: p.quoted("(+ 50% AP)") / 100 } }, monster = p.quoted("deals 270% damage against monsters") / 100;
    p.quote("consume the stacks on-hit");
    const qDamage = q.formula("Magic Damage"), qCD = q.cooldown(), qCast = q.castTime(), qRange = q.field("targetRange"), moonTime = q.quoted("Moonlight for 3 seconds"), qSpeed = [q.field("speed", "Inner"), q.field("speed", "Outer")];
    q.quote("The bolt consists of two projectiles"); q.quote("Even if the target spell shields the bolt, they may still be damaged by the explosion"); q.quote("Moonlight is not applied to the protected target if blocked"); q.quote("{{tip|standard sight|revealed}}"); q.quote("wherever the caster is at the end of the cast time");
    const paths = ["Inner", "Outer"].map((name) => {
      const object = `Characters/Diana/Spells/DianaQAbility/DianaQ${name}Missile`;
      const start = '"mStartPositionOffset":[20.888782501220703,0.0,81.77568817138672]';
      const cp1 = name === "Inner" ? '"mControlPoint1":[1.1648650169372559,0.0,0.01497435662895441]' : '"mControlPoint1":[1.8616324663162231,0.0,-0.003753664204850793]';
      const cp2 = name === "Inner" ? '"mControlPoint2":[-0.886760413646698,0.0,-0.04764879122376442]' : '"mControlPoint2":[-1.3954554796218872,0.0,0.012537208385765553]';
      return { start: [q.gameQuoted(start, 0, object), q.gameQuoted(start, 2, object)], a: [q.gameQuoted(cp1, 0, object), q.gameQuoted(cp1, 2, object)], b: [q.gameQuoted(cp2, 0, object), q.gameQuoted(cp2, 2, object)], width: q.gameQuoted('"mMissileWidth":70.0', 0, object) };
    });
    const wShield = w.formula("Shield Strength"), orbDamage = w.formula("Magic Damage per Orb"), wTime = w.quoted("for up to 5 seconds");
    // The parser retains the spelled-out sphere count; read its numeric three from the exact total formula.
    const spheres = w.baseOf("Total Magic Damage") / w.baseOf("Magic Damage per Orb"), wRadius = w.field("effectRadius"), wCD = w.cooldown();
    w.quote("shield is reapplied, stacking with its original shield and refreshing the duration"); w.textField("cooldownStart"); w.gameQuote('"mAngularVelocity":5.199999809265137');
    const eDamage = e.formula("Magic Damage"), eRange = e.field("targetRange"), eCD = e.cooldown(), throughAt = e.quoted("within 400 range"), resetTime = e.quoted("reduced to 0.25 seconds");
    e.quote("consumes Moonlight from all enemies"); e.quote("even if interrupted"); e.quote("blocked by spell shield the Moonlight debuff is still consumed but Lunar Rush's cooldown is not reset"); e.quote("target dies during the dash while being affected by Moonlight"); e.quote("untargetable by the end of the dash"); e.quote("cast any of her abilities during the dash"); e.quote("only consumes present ''Moonlight''");
    e.gameQuote("mSpell.mCastTime:0.25"); e.gameQuote("mSpell.spellCastTime:0.25"); e.gameQuote("mSpell.missileSpeed:20.0");
    const rDamage = r.formula("Magic Damage"), rBonus = r.formula("Bonus Damage Per Champion"), rRadius = r.field("effectRadius", "Effect radius"), rPull = r.field("effectRadius", "Maximum Pull"), rPullTime = r.quoted("approximately 0.5 seconds"), rSlowTime = r.quoted("slows them for 2 seconds"), rSlow = r.fraction("Slow"), rDelay = r.quoted("after 1 second"), rCD = r.cooldown();
    r.quote("Crowd control immunity and displacement immunity still count"); r.quote("Clones count as champions"); r.quote("protected by spell shield do not count"); r.quote("{{tip|standard sight|revealed}}");
    const contacts = (ctx: HookContext): Contact[] => [
      ...(ctx.world.units[1 - ctx.self.side]!.alive ? [{ target: ctx.world.units[1 - ctx.self.side]! }] : []),
      ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet })),
    ];
    const targetClass = (ctx: HookContext) => ctx.enemy.petId === undefined || ctx.enemy.spec.unitClass === "clone" ? "champion" : ctx.enemy.spec.targetClass ?? ctx.world.units[ctx.enemy.side].spec.petTargetClasses?.[ctx.enemy.spec.name];
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects: Effect[], scale = 1, originX?: number) => {
      if (contact.pet) abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area", scale, originX);
      else abilityHit(ctx.world, ctx.self, contact.target, ability, effects, scale, originX);
    };
    const passive: AbilitySpec = { key: "Icleave", name: p.name, slot: "I", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, parry: true, petContactHooks: true }, usable: () => false };
    const qBolt: AbilitySpec = { key: "Qbolt", name: q.name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, projectile: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "mark", key: MOON, duration: moonTime }], persistsAfterDeath: true, usable: () => false };
    const qExplosion: AbilitySpec = { ...qBolt, key: "Qexplosion", name: `${q.name} (explosion)`, flags: { ...qBolt.flags, projectile: false } };
    const orb: AbilitySpec = { key: "Worb", name: `${w.name} (sphere)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: orbDamage }], usable: () => false };
    const rush: AbilitySpec = { key: "Ehit", name: e.name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, hitsUntargetable: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], usable: () => false };
    const beam: AbilitySpec = { key: "Rbeam", name: `${r.name} (moonlight)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }], persistsAfterDeath: true, usable: () => false };
    const chooseRush = (ctx: Pick<HookContext, "world" | "self">, aim?: { direction: -1 | 1; distance?: number }): Contact | undefined => {
      const enemy = ctx.world.units[1 - ctx.self.side]!, list = contacts({ ...ctx, enemy } as HookContext).filter(({ target }) => canTarget(target, ctx.self) && Math.abs(target.x - ctx.self.x) <= eRange + EPSILON);
      if (aim?.distance !== undefined) { const endpoint = ctx.self.x + directionTo(ctx.self, enemy) * aim.direction * aim.distance; list.sort((a, b) => Math.abs(a.target.x - endpoint) - Math.abs(b.target.x - endpoint)); }
      return list[0];
    };
    const finishOrbs = (ctx: HookContext) => { ctx.memory[ORBS] = 0; ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== ORBS); delete ctx.self.cooldownHeld.W; ctx.self.cooldownReady.W = ctx.tick + ticks(wCD / (1 + derive(ctx.self).abilityHaste / 100)); };
    const spheresContact = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.resurrection || !Number(ctx.memory[ORBS])) return;
      const available = contacts(ctx).filter(({ target }) => !isUntargetable(target, ctx.self) && !inStasis(target) && Math.abs(target.x - ctx.self.x) <= wRadius + target.spec.base.radius + EPSILON);
      const contact = available.sort((a, b) => Math.abs(a.target.x - ctx.self.x) - Math.abs(b.target.x - ctx.self.x) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1))[0];
      if (!contact) return;
      const count = Number(ctx.memory[ORBS]);
      for (let i = 0; i < count; i++) {
        // Each real sphere is independently destroyable and independently spell-shielded.
        if (projectileBlocked(ctx.world, ctx.self.side, ctx.self.x, contact.target.x)) { ctx.memory["diana:orbsLost"] = Number(ctx.memory["diana:orbsLost"] ?? 0) + 1; continue; }
        for (const target of contacts(ctx)) if (Math.abs(target.target.x - contact.target.x) <= wRadius + target.target.spec.base.radius + EPSILON) hit(ctx, target, orb, orb.onHit!, 1, contact.target.x);
      }
      if (!Number(ctx.memory["diana:orbsLost"])) {
        const remaining = ctx.self.statuses.filter((s) => s.memoKey === SHIELD).reduce((sum, s) => sum + s.value, 0);
        ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== SHIELD);
        ctx.apply({ type: "shield", amount: { base: remaining + evaluate(wShield, ctx.self) }, duration: wTime }, true); ctx.self.statuses.at(-1)!.memoKey = SHIELD;
      }
      finishOrbs(ctx);
    };
    const thirdStrike = (ctx: HookContext & { blocked: boolean; scale: number }) => {
      if (ctx.blocked) return;
      const count = ctx.tick < Number(ctx.memory[`${STACKS}:until`] ?? 0) ? Number(ctx.memory[STACKS] ?? 0) : 0;
      ctx.memory[`${STACKS}:until`] = ctx.tick + ticks(stackTime);
      if (count < stackMax) { ctx.memory[STACKS] = count + ctx.scale; return; }
      ctx.memory[STACKS] = 0;
      const origin = ctx.enemy.x;
      // The on-hit recipient is retained even if earlier physical damage killed it.
      const primary = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId);
      const list = contacts(ctx); if (!list.some(({ target }) => target.petId === ctx.enemy.petId && (target.petId !== undefined || target === ctx.enemy))) list.unshift({ target: ctx.enemy, ...(primary ? { pet: primary } : {}) });
      for (const contact of list) if (Math.abs(contact.target.x - origin) <= cleaveRadius + contact.target.spec.base.radius + EPSILON) hit(ctx, contact, passive, [{ type: "damage", damageType: "magic", amount: scaled(cleave, (contact.pet?.spec.targetClass === "monster" ? monster : 1) * ctx.scale), noLifeSteal: true, petDamageCategory: "area" }], 1, origin);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, overlay: true, delivery: { kind: "self" }, roles: ["damage"], flags: { projectile: true }, estimate: (self, target) => evaluate(qDamage, self, target), estimateDelay: (self, target) => Math.abs(target.x - self.x) / qSpeed[0]! },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cooldownAfter: "state", cost: w.cost(), castTime: w.castTime(), overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: wShield, duration: wTime }], roles: ["defense", "damage"], usable: (self) => !Number(self.memory[ORBS]), estimate: (self, target) => spheres * evaluate(orbDamage, self, target) },
      // No travel speed is published: Infinity selects the earliest engine dash tick.
      // onDashTick replaces the generic travel distance with the chosen real target boundary.
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), overlay: true, delivery: { kind: "dash", direction: "toward", distance: eRange, speed: Infinity, crossTerrain: true }, flags: { grounded: e.flag("grounded"), knockdown: e.flag("knockdown") }, roles: ["engage", "damage"], usable: (self, world) => !!chooseRush({ self, world }), estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "displace", direction: "toward", distance: rPull, duration: rPullTime, to: 0 }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowTime }, { type: "mark", key: "diana:standardSight", duration: rPullTime }], roles: ["cc", "damage"], estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: () => rDelay },
      passive, qBolt, qExplosion, orb, rush, beam,
    ];
    const boltContacts = (ctx: HookContext, m: Missile, from: number, to: number) => {
      const key = `diana:q:${m.id}:`, path = paths[Number(ctx.memory[`${key}path`])]!, group = Number(ctx.memory[`${key}group`]);
      for (const contact of contacts(ctx)) {
        const id = contact.pet?.id ?? "champion", seen = `diana:qHit:${group}:${id}`;
        if (ctx.memory[seen] || isUntargetable(contact.target, ctx.self) || inStasis(contact.target) || contact.target.x < Math.min(from, to)-contact.target.spec.base.radius-path.width/2-EPSILON || contact.target.x > Math.max(from, to)+contact.target.spec.base.radius+path.width/2+EPSILON) continue;
        ctx.memory[seen] = true; ctx.memory["diana:qAccepted"] = false; hit(ctx, contact, qBolt, qBolt.onHit!, 1, from);
        // Successful marks suppress the endpoint; a shielded bolt may still explode.
        if (ctx.memory["diana:qAccepted"]) ctx.memory[`diana:qDamage:${group}:${id}`] = true;
      }
    };
    const behavior: Behavior = (view) => {
      const choice = defaultBehavior(view);
      if (choice?.kind === "cast") {
        if (choice.ability === "Q" && Math.abs(view.enemy.x - view.self.x) > qRange + view.enemy.spec.base.radius) return { kind: "move", direction: 1 };
        if (choice.ability === "W" && Math.abs(view.enemy.x - view.self.x) > wRadius + view.enemy.spec.base.radius && !view.threats.length) return { kind: "move", direction: 1 };
        if (choice.ability === "R" && Math.abs(view.enemy.x - view.self.x) > rRadius + view.enemy.spec.base.radius) return canCast(view.world, view.self, abilities[2]!) ? { kind: "cast", ability: "E" } : { kind: "move", direction: 1 };
      }
      return choice;
    };
    kit.assume("Moonsilver Blade begins empty. Each accepted unblocked basic contact adds one global five-second stack; the third consumes both and applies an independently guarded 175-radius cleave around the actual basic recipient, including real summons. Explicit monsters alone take 270%. The level 20 wiki values 270 damage and 37.3529411765% AS are retained; each real spell refreshes the five-second 112.0588235294% AS total, adding only the difference over the permanent innate. No item phantom on-hits, structures or preloaded attacks are supplied.");
    kit.assume("Q releases two finite 70-width fixed-speed Hermite flights at 1900/2100, from Diana's cast-completion position. Exact game spline offsets and tangents are interpreted in local lateral/forward coordinates, arc length is sampled numerically and its forward coordinate is projected onto the duel axis. The one-dimensional model cannot reproduce lateral sidestepping or determine undocumented server spline transforms. Contacts share one damage/mark per cast; a shielded bolt can still take a separately guarded endpoint explosion. The source does not provide the explosion radius, so that conservative endpoint packet requires its point to overlap an actual hitbox. Standard sight is recorded by Moonlight and does not invent true sight through invisibility. Each flight can be independently destroyed; released Q survives death.");
    kit.assume("W grants 105 + 30% AP + 14% bonus HP shield immediately and holds its cooldown until three spheres detonate or five seconds expire. Actual enemies entering the sourced 200-radius projected contact envelope consume the three available spheres as independent area packets; projectile destruction counts as loss rather than detonation and prevents the refresh. All detonations reapply one full shield plus its surviving remainder and refresh five seconds. Exact game angular velocity 5.199999809 exists, but initial phase and sphere collision radius are unpublished; finite orbital contact timing is omitted rather than assigning invented phases or collision parameters.");
    kit.assume("Lunar Rush uses the pinned 825 range and 130 + 60% AP packet, then consumes only currently present Moonlight on every actual enemy at dash end, even interruption. Accepted marked contact or a marked target dying during travel reduces its current cooldown to a static 0.25 seconds; spell shielding consumes marks without resetting. The primary page and active game object publish no dash speed, travel time or overshoot offset. E retains an actual interruptible dash action and resolves at the earliest 30 Hz arrival tick, to the target's near pathing boundary, or far boundary inside 400. Anti-dash interception, mid-dash casts and ending untargetability use shared dash/guard rules; the short unknown travel window and collision-boundary overshoot are explicit approximations. Primary cast time none takes precedence over generic binary mCastTime/spellCastTime 0.25; generic missileSpeed 20 is not used as dash speed.");
    kit.assume("Moonfall pulls actual enemy hitboxes within 475 by at most 225 over the primary approximate 0.5-second control window, and applies the 60% two-second slow. Spell-shielded champions do not arm the beam; accepted CC/displacement-immune champions and explicitly Champion-class clones do. One second after completion, a separately guarded beam follows Diana's current position and deals 400 + 60% AP plus 85 + 15% AP per extra champion pulled, including real summons in its radius. The initial and final packets each check defenses separately; no allied bodies or clone classes are invented. Standard sight adds no true sight.");
    kit.assume("Reference hints price Q once, three W spheres, ordinary E once per cooldown, one isolated-champion R and ordinary third strikes. Added spell-AS uptime is capped by the normal attack-speed cap. Shield value budgets the guaranteed first shield; runtime contact determines the second. No reset damage or clone amplification is granted free in the reference.");
    return {
      abilities, behavior, attack: { onHitToPets: true }, start: [{ type: "stat", stat: "attackSpeed", amount: { base: innateAS }, duration: Infinity }],
      budget: { damage(self, target) {
        const d = derive(self), haste = 1 + d.abilityHaste / 100, qRate = 1 / (qCD / haste + qCast), wRate = 1 / (wCD / haste + wTime), eRate = 1 / (eCD / haste), rRate = 1 / (rCD / haste + rDelay + abilities[3]!.castTime);
        const added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, spellAS - innateAS)) - d.attackSpeed) * Math.min(1, asTime * (qRate + wRate + eRate + rRate));
        return { physical: attackDamage(self) * added, magic: evaluate(cleave, self, target) * (d.attackSpeed + added) / (stackMax + 1) + evaluate(qDamage, self, target) * qRate + spheres * evaluate(orbDamage, self, target) * wRate + evaluate(eDamage, self, target) * eRate + evaluate(rDamage, self, target) * rRate };
      }, healing: (self) => evaluate(wShield, self) / (wCD / (1 + derive(self).abilityHaste / 100) + wTime) },
      hooks: {
        onAttackBeforeDamage: thirdStrike,
        onCast(ctx) {
          if (["Q", "W", "E", "R"].includes(ctx.ability.key)) ctx.buff("diana:spellAS", "attackSpeed", spellAS - innateAS, asTime);
          if (ctx.ability.key === "Q") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1, distance = Math.min(qRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x))), group = ctx.world.nextId++;
            for (let i = 0; i < paths.length; i++) {
              const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Qbolt", seenTick: ctx.tick - ticks(qCast), x: ctx.self.x + direction * paths[i]!.start[1]!, perTick: 0, direction, travelLeft: Infinity, homing: false, projectile: true, connects: false, interceptable: true, radius: paths[i]!.width / 2, scale: 1, onHit: qBolt.onHit!, expiresTick: ctx.tick + ticks((qRange * 3 + Math.hypot(...paths[i]!.start as [number, number])) / qSpeed[i]!) + 1 };
              ctx.memory[`diana:q:${m.id}:path`] = i; ctx.memory[`diana:q:${m.id}:start`] = ctx.tick; ctx.memory[`diana:q:${m.id}:origin`] = ctx.self.x; ctx.memory[`diana:q:${m.id}:distance`] = distance; ctx.memory[`diana:q:${m.id}:group`] = group; ctx.world.missiles.push(m);
            }
          }
          if (ctx.ability.key === "W") { const shield = ctx.self.statuses.findLast((s) => s.kind === "shield" && s.key === "W"); if (shield) shield.memoKey = SHIELD; ctx.memory[ORBS] = spheres; ctx.memory["diana:orbsLost"] = 0; ctx.memory[`${ORBS}:until`] = ctx.tick + ticks(wTime); ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "W", memoKey: ORBS, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(wTime), value: 0 }); spheresContact(ctx); }
          if (ctx.ability.key === "E") {
            const contact = chooseRush(ctx, ctx.aim); if (!contact) return;
            ctx.memory["diana:rushTarget"] = contact.pet?.id ?? -1;
            ctx.memory["diana:rushDirection"] = directionTo(ctx.self, contact.target);
            ctx.memory["diana:rushThrough"] = Math.abs(contact.target.x - ctx.self.x) <= throughAt;
            ctx.memory["diana:rushTargetX"] = contact.target.x;
            ctx.memory["diana:rushTargetRadius"] = contact.target.spec.base.pathingRadius;
            ctx.memory["diana:rushMarkedDeath"] = false;
          }
          if (ctx.ability.key === "R") {
            ctx.memory["diana:rCount"] = 0;
            const effects = ctx.ability.onHit!.map((effect) => effect.type === "displace" ? { ...effect, originX: ctx.self.x } : effect);
            for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - ctx.self.x) <= rRadius + contact.target.spec.base.radius + EPSILON) hit(ctx, contact, ctx.ability, effects);
            const count = Number(ctx.memory["diana:rCount"]);
            if (count > 0) ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, ability: "Rbeam", kind: "delayedArea", x: ctx.self.x, radius: rRadius, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(rDelay), connects: true, follow: { near: -rRadius, far: rRadius }, onHit: [{ type: "damage", damageType: "magic", amount: { base: rDamage.base + (count - 1) * rBonus.base, ratios: { AP: (rDamage.ratios?.AP ?? 0) + (count - 1) * (rBonus.ratios?.AP ?? 0) } } }] });
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Ehit") ctx.memory["diana:rushAccepted"] = true;
          if (ctx.ability.key === "Qbolt" || ctx.ability.key === "Qexplosion") ctx.memory["diana:qAccepted"] = true;
          if (ctx.ability.key === "R" && targetClass(ctx) === "champion") ctx.memory["diana:rCount"] = Number(ctx.memory["diana:rCount"] ?? 0) + 1;
        },
        onTick(ctx) {
          if (Number(ctx.memory[ORBS])) { if (ctx.tick >= Number(ctx.memory[`${ORBS}:until`])) finishOrbs(ctx); else spheresContact(ctx); }
        },
        onDashTick(ctx) {
          const action = ctx.self.action;
          if (action?.kind === "dash" && action.ability === "E") {
            const pet = ctx.world.pets.find((candidate) => candidate.id === ctx.memory["diana:rushTarget"]), target = ctx.memory["diana:rushTarget"] === -1 ? ctx.enemy : pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : undefined;
            const boundary = ctx.self.spec.base.pathingRadius + (target?.spec.base.pathingRadius ?? Number(ctx.memory["diana:rushTargetRadius"]));
            action.perTick = (target?.x ?? Number(ctx.memory["diana:rushTargetX"])) + Number(ctx.memory["diana:rushDirection"]) * (ctx.memory["diana:rushThrough"] ? boundary : -boundary) - ctx.self.x;
            action.stopAtContact = false;
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "E") return;
          const pet = ctx.world.pets.find((candidate) => candidate.id === ctx.memory["diana:rushTarget"]), target = ctx.memory["diana:rushTarget"] === -1 ? ctx.enemy : pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : undefined;
          const marked = target?.statuses.some((s) => s.key === MOON && s.source === ctx.self.side && s.endTick > ctx.tick);
          ctx.memory["diana:rushAccepted"] = false;
          if (!ctx.interrupted && target && (pet ? pet.hp > 0 : target.alive)) hit(ctx, { target, ...(pet ? { pet } : {}) }, rush, rush.onHit!);
          if (ctx.memory["diana:rushMarkedDeath"] || (marked && (ctx.memory["diana:rushAccepted"] || (target && (pet ? pet.hp <= 0 : !target.alive || target.hp <= 0))))) ctx.self.cooldownReady.E = ctx.tick + ticks(resetTime);
          ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s.key !== MOON || s.source !== ctx.self.side);
          for (const candidate of ctx.world.pets) if (candidate.owner !== ctx.self.side) candidate.statuses = candidate.statuses?.filter((s) => s.key !== MOON || s.source !== ctx.self.side);
          delete ctx.memory["diana:rushTarget"];
        },
        onKill(ctx) {
          const id = ctx.pet?.id ?? -1;
          if (ctx.memory["diana:rushTarget"] === id && ctx.victim.statuses?.some((s) => s.key === MOON && s.source === ctx.self.side && s.endTick > ctx.tick)) ctx.memory["diana:rushMarkedDeath"] = true;
        },
        onLethal(ctx) { if (Number(ctx.memory[ORBS])) finishOrbs(ctx); return false; },
        onProjectileIntercept(ctx) {
          if (ctx.missile.source !== "Qbolt") return false;
          // Unbreakable preserves the actual bolt contact; only a natural endpoint explodes.
          boltContacts(ctx, ctx.missile, ctx.from, ctx.to);
          return true;
        },
        onMissileTick(ctx) {
          const m = ctx.missile; if (m.source !== "Qbolt") return;
          const key = `diana:q:${m.id}:`, path = paths[Number(ctx.memory[`${key}path`])]!, length = Number(ctx.memory[`${key}distance`]), origin = Number(ctx.memory[`${key}origin`]), speed = qSpeed[Number(ctx.memory[`${key}path`])]!;
          const point = (t: number) => { const h00 = 2*t*t*t-3*t*t+1, h10 = t*t*t-2*t*t+t, h01 = -2*t*t*t+3*t*t, h11 = t*t*t-t*t; return [h00*path.start[0]!+h10*length*path.a[0]!+h11*length*path.b[0]!, h00*path.start[1]!+h10*length*path.a[1]!+h01*length+h11*length*path.b[1]!] as const; };
          const samples = 128, elapsed = (ctx.tick - Number(ctx.memory[`${key}start`])) / 30, traveled = elapsed * speed;
          let accumulated = 0, previous = point(0), forward = previous[1], complete = true;
          for (let i = 1; i <= samples; i++) { const next = point(i / samples), segment = Math.hypot(next[0]-previous[0], next[1]-previous[1]); if (accumulated + segment >= traveled) { const share = segment > 0 ? Math.max(0, (traveled-accumulated)/segment) : 1; forward = previous[1] + (next[1]-previous[1])*share; complete = false; break; } accumulated += segment; previous = next; forward = next[1]; }
          const from = m.x, proposed = origin + m.direction * forward, block = projectileBlockPoint(ctx.world, ctx.self.side, from, proposed), to = block ?? proposed, group = Number(ctx.memory[`${key}group`]);
          if (interceptProjectile(ctx.world, m, from, proposed)) return;
          m.x = to;
          boltContacts(ctx, m, from, to);
          if (block !== undefined) { m.ended = true; return; }
          if (!complete) return;
          m.ended = true;
          const endpoint = origin + m.direction * length;
          for (const contact of contacts(ctx)) { const id = contact.pet?.id ?? "champion"; if (!ctx.memory[`diana:qDamage:${group}:${id}`] && Math.abs(contact.target.x - endpoint) <= contact.target.spec.base.radius + EPSILON) { ctx.memory[`diana:qDamage:${group}:${id}`] = true; hit(ctx, contact, qExplosion, qExplosion.onHit!, 1, endpoint); } }
        },
      },
    };
  },
};
export default diana;
