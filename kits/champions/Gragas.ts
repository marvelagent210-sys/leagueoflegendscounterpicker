/** Gragas: real casts, landed fermenting barrels, a drink channel and body collisions. */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast, EPSILON, releaseCooldowns, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, edgeDistance, heal, immediateDisplace, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit, World, Zone } from "../../engine/sim/state";
import { dashDistance } from "../../engine/sim/terrain";
import { ticks } from "./util";

const HAPPY = "gragas:happyReady", DRINK = "gragas:drink", SLAM = "gragas:slam";
type Contact = { target: Unit; pet?: Pet };

const gragas: KitModule = {
  champion: "Gragas",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const healShare = p.quoted("5.5% of his maximum health") / 100, passiveCD = p.field("staticCooldown");
    p.quote("after casting an ability");
    p.gameQuote("mSpell.DataValues.HealRatio.values: [0.054999999701976776,0.054999999701976776,0.054999999701976776,0.054999999701976776,0.054999999701976776,0.054999999701976776,0.054999999701976776]");
    p.gameQuote('"level":16');
    const qDamage = q.formula("Minimum Magic Damage"), qMax = q.formula("Maximum Magic Damage"), qSlow = q.fraction("Minimum Slow"), qMaxSlow = q.fraction("Maximum Slow");
    const qCD = q.cooldown(), qCast = q.castTime(), qRange = q.field("targetRange"), qRadius = q.field("effectRadius"), qSpeed = q.field("speed");
    const barrelTime = q.quoted("remaining there for 4 seconds"), fermentTime = q.quoted("first 2 seconds"), fermentMax = q.quoted("maximum of 150%") / 100;
    const minionFactor = 1 - q.quoted("reduced by 30% against minions") / 100, slowTime = q.quoted("slowing them for 2 seconds");
    q.textField("cooldownStart"); q.quote("after the cask has fully travelled"); q.quote("automatically after its duration ends"); q.quote("The cask ignores unit and terrain collision"); q.quote("Deactivating the ability manually does not"); q.quote("The charge-up countdown will only start once the cask stops rolling");
    q.gameQuote("mSpell.DataValues.BarrelCookMaxTime.values: [2.0,2.0,2.0,2.0,2.0,2.0,2.0]");
    q.gameQuote("mSpell.mMissileSpec", "Characters/Gragas/Spells/GragasQAbility/GragasQMissile");
    const wBaseDR = w.baseOf("Damage Reduction") / 100, wAPDR = w.quoted("(+ 4% per 100 AP)") / 10000;
    const wDamage = w.formula("Bonus Magic Damage"), wCD = w.cooldown(), channelTime = w.quoted("channels for 0.75 seconds"), reductionTime = w.quoted("damage reduction for 2.5 seconds"), attackTime = w.quoted("next basic attack within 5 seconds"), bonusRange = w.quoted("gain 50 bonus range"), wRadius = w.field("effectRadius");
    const monsterCap = w.quoted("capped at 300 against monsters"), structureFactor = w.quoted("reduced to 50% against structures") / 100;
    w.quote("uncancellable windup"); w.quote("can critically strike as normal"); w.quote("apply other on-hit effects"); w.quote("not be consumed nor apply its effects against wards"); w.quote("{{ct|channel|attack=false|cast=false|items=false,true|move=true|spells=true,true,false,false,false}}");
    w.gameQuote("mSpell.mChannelDuration: [0.75,0.75,0.75,0.75,0.75,0.75,0.75]"); w.gameQuote("mSpell.mCanMoveWhileChanneling: true"); w.gameQuote("mSpell.mCantCancelWhileChanneling: true");
    w.gameQuote("mSpell.DataValues.MonsterDamageCap.values: [300.0,300.0,300.0,300.0,300.0,300.0,300.0]");
    w.gameQuote("mSpell.spellCastTime: 0.4393500089645386");
    const eDamage = e.formula("Magic Damage"), eCD = e.cooldown(), eRange = e.field("targetRange"), eRadius = e.field("effectRadius", "Center-to-center"), eLollipop = e.field("effectRadius", "lollipop"), eForward = e.quoted("30 units in front"), eSpeed = e.field("speed"), eStun = e.quoted("stunning them for 1 second"), refund = e.quoted("reduced by 40%") / 100;
    e.quote("stops upon colliding with an enemy"); e.quote("though not through terrain"); e.quote("Displacement immunity will not resist the application of the stun"); e.quote("Barrel Roll and Explosive Cask can be cast during the dash");
    e.gameQuote("mSpell.DataValues.DashSpeed.values: [900.0,900.0,900.0,900.0,900.0,900.0,900.0]"); e.gameQuote("mSpell.DataValues.ForwardHitbox.values: [40.0,40.0,40.0,40.0,40.0,40.0,40.0]"); e.gameQuote("mSpell.spellCastTime: 0.25");
    const rDamage = r.formula("Magic Damage"), rCD = r.cooldown(), rCast = r.castTime(), rRange = r.field("targetRange"), rRadius = r.field("effectRadius"), rTravel = r.quoted("over 0.5 seconds"), rKnock = r.quoted("knock them back 900 units"), sightTime = r.quoted("sight of the area for 1 second");
    r.quote("from the epicenter of the explosion"); r.quote("though not through terrain"); r.quote("from wherever the caster is at the end of the cast time");
    r.gameQuote('"mTravelTime":0.5', "Characters/Gragas/Spells/GragasRAbility/GragasRBoom"); r.gameQuote("mSpell.castRange: [1050.0,1050.0,1050.0,1050.0,1050.0,1050.0,1050.0]"); r.gameQuote("mSpell.castRadius: [350.0,350.0,350.0,350.0,350.0,350.0,350.0]");

    const contacts = (ctx: HookContext): Contact[] => [
      { target: ctx.world.units[1 - ctx.self.side]! },
      ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints).map(pet => ({ pet, target: petFormulaTarget(pet, ctx.self, ctx.tick) })),
    ];
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects: Effect[], scale = 1, originX?: number) => {
      if (!(scale > 0)) return;
      if (contact.pet?.spec.ccImmune) effects = effects.filter(effect => effect.type !== "cc" || !contact.pet!.spec.ccImmune!.includes(effect.cc));
      if (contact.pet) abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area", scale, originX);
      else abilityHit(ctx.world, ctx.self, contact.target, ability, effects, scale, originX);
    };
    const internal = (key: string, name: string): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, usable: () => false });
    const qHit: AbilitySpec = { ...internal("Qburst", q.name), persistsAfterDeath: true };
    const qFlight: AbilitySpec = { ...internal("Qflight", q.name), persistsAfterDeath: true, flags: { projectile: q.flag("projectile") } };
    const wHit = internal("Wburst", w.name), wDefense = internal("Wreduction", w.name);
    const eHit = internal("Eimpact", e.name);
    const rHit: AbilitySpec = { ...internal("Rimpact", r.name), persistsAfterDeath: true, flags: { spellShield: r.flag("spellShield"), petContactHooks: true, projectile: r.flag("projectile") } };
    const barrels = (world: World, self: Unit) => world.zones.filter(zone => zone.owner === self.side && zone.ability === qHit.key);
    const castAllowed = (self: Unit) => !self.action || self.action.kind === "windup" || self.action.kind === "dash" && self.action.ability === "E";
    const qPacket: Effect[] = [{ type: "damage", damageType: "magic", amount: qDamage, petDamageCategory: "area" }, { type: "cc", cc: "slow", duration: slowTime, strength: qSlow }];
    const rPacket: Effect[] = [{ type: "damage", damageType: "magic", amount: rDamage, petDamageCategory: "area" }];
    const clearDrink = (ctx: HookContext) => {
      delete ctx.memory[DRINK]; delete ctx.memory[`${DRINK}:end`];
      ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== DRINK);
      releaseCooldowns(ctx.world, ctx.self);
    };
    const displace = (ctx: HookContext, delta: number, key: string) => {
      const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find(pet => pet.id === ctx.enemy.petId);
      if (pet?.spec.ccImmune?.includes("airborne")) return;
      if (immediateDisplace(ctx.world, ctx.self, ctx.enemy, delta, key) && pet) { pet.x = ctx.enemy.x; delete pet.windup; }
    };
    const detonate = (ctx: HookContext, zone: Zone) => {
      if (zone.memory?.detonated) return;
      (zone.memory ??= {}).detonated = true;
      const age = Math.max(0, (ctx.tick - Number(zone.memory.landed)) / 30), amp = 1 + (fermentMax - 1) * Math.min(1, age / fermentTime);
      const slow = qSlow + (qMaxSlow - qSlow) * Math.min(1, age / fermentTime);
      for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - zone.x) <= qRadius + contact.target.spec.base.radius + EPSILON) {
        const scale = contact.pet ? 1 : zone.connects === false ? 0 : zone.scale ?? 1;
        hit(ctx, contact, qHit, [{ type: "damage", damageType: "magic", amount: { base: evaluate(qDamage, ctx.self, contact.target) * amp * (contact.target.spec.targetClass === "minion" ? minionFactor : 1) }, petDamageCategory: "area" }, { type: "cc", cc: "slow", duration: slowTime, strength: slow }], scale, zone.x);
      }
      ctx.world.zones = ctx.world.zones.filter(candidate => candidate.id !== zone.id);
    };
    const throwCask = (ctx: HookContext & { aim?: { direction: -1 | 1; distance?: number } }, ultimate: boolean) => {
      const range = ultimate ? rRange : qRange, radius = ultimate ? rRadius : qRadius, direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1;
      const distance = Math.max(0, Math.min(range, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x))), travel = ultimate ? rTravel : distance / qSpeed;
      const land = ctx.tick + Math.max(ultimate ? ticks(rTravel) : 0, ticks(travel));
      const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(ultimate ? rCast : qCast), travel, radius - Math.abs(ctx.enemy.x - (ctx.self.x + direction * distance)));
      const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick - ticks(ultimate ? rCast : qCast), startTick: ctx.tick, endTick: distance > 0 ? Infinity : land, ability: ultimate ? rHit.key : qFlight.key, x: ctx.self.x + direction * distance, radius, connects: false, scale: chance >= .98 ? 1 : chance <= .02 ? 0 : chance, onHit: ultimate ? rPacket : qPacket, noPets: true, memory: { direction } };
      ctx.world.zones.push(zone);
      if (distance > 0) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: ultimate ? rHit.key : qFlight.key, seenTick: zone.seenTick, x: ctx.self.x, perTick: ultimate ? distance / ticks(rTravel) : qSpeed / 30, homing: false, direction, travelLeft: distance, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 }, ...(ultimate ? { impactTick: land } : {}) });
    };
    const slamImpact = (ctx: HookContext, center = ctx.self.x) => {
      // The refund belongs to physical collision, even if a spell shield denies its packet.
      ctx.self.cooldownReady.E = ctx.tick + Math.ceil(Math.max(0, Number(ctx.self.cooldownReady.E ?? ctx.tick) - ctx.tick) * (1 - refund) - EPSILON);
      for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - center) <= eRadius + contact.target.spec.base.radius + EPSILON) hit(ctx, contact, eHit, [{ type: "damage", damageType: "magic", amount: eDamage, petDamageCategory: "area" }, { type: "cc", cc: "stun", duration: eStun }], 1, center);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cooldownAtCastStart: true, cost: q.cost(), castTime: qCast, overlay: true, delivery: { kind: "self" }, roles: ["damage", "cc"], estimate: (self, target) => evaluate(qMax, self, target), usable: (self, world) => castAllowed(self) && !world.zones.some(zone => zone.owner === self.side && [qFlight.key, qHit.key].includes(zone.ability ?? "")) },
      { key: "Q2", name: `${q.name} (detonate)`, slot: "Q", countsAsCast: false, activation: "toggle", budgetExcluded: true, cooldown: 0, castTime: 0, overlay: true, delivery: { kind: "self" }, roles: [], usable: (self, world) => castAllowed(self) && barrels(world, self).length > 0 },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cooldownAfter: "state", cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, channel: { duration: channelTime, interruptible: true, mobile: true, onCompleteSelf: [{ type: "empower", attacks: 1, window: attackTime, bonusRange, uncancellable: true, onHit: [] }] }, roles: ["buff", "damage", "defense"], estimate: (self, target) => evaluate(wDamage, self, target), usable: self => !self.memory[DRINK] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "dash", direction: "toward", distance: eRange, minDistance: 0, speed: eSpeed, through: true, crossTerrain: true }, flags: { grounded: e.flag("grounded"), knockdown: e.flag("knockdown") }, roles: ["damage", "cc", "engage", "escape"], estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: rCast, overlay: true, delivery: { kind: "self" }, roles: ["damage", "cc"], estimate: (self, target) => evaluate(rDamage, self, target), usable: castAllowed },
      qFlight, qHit, wHit, wDefense, eHit, rHit,
    ];
    const byKey = (key: string) => abilities.find(ability => ability.key === key)!;
    const behavior: Behavior = view => {
      // This call advances the common trade clock before any optional barrel or drink.
      const normal = defaultBehavior(view), { self, enemy, world, mode } = view;
      if (mode === "idle" || self.memory.tradeDone) return normal;
      const ready = (key: string) => canCast(world, self, byKey(key));
      const barrel = barrels(world, self)[0];
      if (barrel && ready("Q2") && Math.abs(enemy.x - barrel.x) <= qRadius + enemy.spec.base.radius && (world.tick >= Number(barrel.memory?.landed) + ticks(fermentTime) || Math.abs(enemy.x - barrel.x) + derive(enemy).moveSpeed / 30 >= qRadius + enemy.spec.base.radius || mode === "flee")) return { kind: "cast", ability: "Q2" };
      if (mode === "flee") {
        if (ready("E")) return { kind: "cast", ability: "E", aim: { direction: -1, distance: eRange } };
        return normal?.kind === "cast" && normal.ability === "R" ? { kind: "move", direction: -1 } : normal;
      }
      if (!self.action && ready("W") && edgeDistance(self, enemy) <= eRange && !self.statuses.some(status => status.kind === "empower" && status.key === "W")) return { kind: "cast", ability: "W" };
      if (normal?.kind === "cast" && normal.ability === "Q2") return { kind: "move", direction: mode === "hold" ? 0 : edgeDistance(self, enemy) > attackRange(self, enemy) ? 1 : 0 };
      if (normal?.kind === "cast" && normal.ability === "Q" && Math.abs(enemy.x - self.x) > qRange + qRadius + enemy.spec.base.radius) return { kind: "move", direction: mode === "hold" ? 0 : 1 };
      if (normal?.kind === "cast" && normal.ability === "R" && (mode === "hold" || mode === "trade")) return { kind: "move", direction: mode === "hold" ? 0 : 1 };
      if (normal?.kind === "cast" && normal.ability === "R" && Math.abs(enemy.x - self.x) > rRange + rRadius + enemy.spec.base.radius) return { kind: "move", direction: 1 };
      if (normal?.kind === "cast" && normal.ability === "R") {
        // Aim behind the target for an inward knockback; explicit commands retain exact aim.
        const distance = Math.min(rRange, Math.abs(enemy.x - self.x) + enemy.spec.base.radius);
        return { ...normal, aim: { direction: 1, distance } };
      }
      return normal;
    };
    kit.assume("Happy Hour starts ready and heals5.5%maxHP only after an actual Q/W/E/R cast completes, once per independent static6seconds at level20. Q's manual detonation is not another activation. Idle ticks, failed deliveries, mere readiness and preduel time grant no heal; ordinary healing modifiers apply.");
    kit.assume("Barrel Roll costs80mana, starts its hasted6second cooldown at declaration, locks casting for0.25seconds, then throws a nonhoming1000speed cask to the requested ground point within850. It ignores bodies/terrain, while projectile blockers can destroy the flight. Only arrival arms its manual recast and starts the4second lifetime/2second linear fermentation from240+80%AP and60%slow to360+120%AP and90%slow. The two-second slow and30%minion-only damage reduction use each actual body's class; monsters and unclassified pets are not minions. Actual area resistance and each body's spellshield/parry/invulnerability/untargetability apply independently. Automatic expiry uses the same packet once. Cast-completion geometry sets the endpoint and the throw's ordinary scalar sidestep estimate is retained through fermentation; no additional stochastic branch is invented at recast. Released ground casks keep their lifetime through death/resurrection and can autoexplode; they do not require a living caster to hold a button.");
    kit.assume("Drunken Rage is a mobile0.75second interruptible channel with no attacks or other ability casts. Its26%+4%per100AP reduction begins immediately for2.5seconds, including the drink; primary timing overrides unused binary spellCastTime0.43935. Only successful channel completion grants a5second uncancellable real next basic with50range. Its ordinary AD critical snapshot, normal onhits and life steal remain one basic. Before that basic's normal damage/procs, a separate area packet deals140+70%AP+7%of EACH actual body's maxHP within250of the attacked body; only the maxHP component caps at300 against monsters. It never critically strikes or life steals. Primary blind/dodge/parry/block denies the area trigger; each secondary body independently checks its spellshield/parry and damage defenses. A primary spellshield denies only its own bonus magic packet, preserving ordinary basic damage/onhits and independently eligible secondary packets. The5second post-effect cooldown begins when the entitlement is spent, expires or the channel is interrupted. Its ward exception preserves empowerment against hit-count objects; no simulated structure exists, and the sourced50%structure multiplier is retained without reclassifying pets as structures.");
    kit.assume("Body Slam moves a real body at primary910speed up to600, crossing terrain only with a clear endpoint and clipping an obstructed endpoint. The exact binary900speed,0.25cast metadata and40forward hitbox conflict with primary910,no cast time and30forward lollipop; the primary wins. Swept180center-radius collision stops at the first actual enemy champion/pet, even if its spellshield/invulnerability denies damage. Nearby bodies receive260+60%AP, a separately guarded displacement attempt and a1second stun. Displacement immunity still permits stun; pet airborne/stun immunity are independent. Physical collision refunds40%of the CURRENT hasted cooldown once. Neither primary nor exact E record quantifies knockback distance/duration: guarded zero-distance immediate displacement models interruption without inventing a position offset or airborne time. Its final30forward/180edge lollipop is checked only on normal arrival. Q/R may overlay E; W and another E cannot. Knockdown, death and resurrection interrupt the real dash without creating arrival damage.");
    kit.assume("Explosive Cask locks casting for0.25seconds, then travels to the chosen ground center within primary1000range over exactly0.5seconds (exact GragasRBoom FixedTimeMovement agrees), independent of intervening bodies. Projectile blockers cancel its pending explosion. Primary400radius overrides binary castRadius350; primary1000overrides binary castRange1050. At landing each actual enemy body independently receives400+80%AP and is displaced900away from the explosion center, with no invented airborne duration: source timing is unquantified, so immediateDisplace clips terrain and applies normal CC/blackshield/displacement guards. A body exactly at the epicenter uses the saved throw direction, preserving reflection symmetry. The sight area lasts1second, without applying a reveal to units. Released flight survives caster death/resurrection; a still-uncompleted cast cannot launch during resurrection. No allies, lane waves, pet stand-ins or preduel buffs are created.");
    kit.assume("Behavior uses the ordinary fight/trade/hold/flee decisions, with a ready drink before close combat, two-second barrel fermentation unless the target is leaving, an aimed fleeing E, and an inward R center behind the target. Ready R remains reserved in hold/trade; the common completed-trade retreat takes priority over all new optional casts. All deadlines, endpoints and entitlements live in cloneable world primitives. Reference damage uses full-ferment Q, one W per realistic channel/attack/post-effect cycle, landed E's remaining-cooldown refund and R; passive healing is capped by actual spell cadence and its independent6second clock.");
    // Structure targeting is outside the two-champion/pet world; retain this sourced rule.
    void structureFactor;
    return { abilities, behavior, attack: { onHitToPets: true }, hooks: {
      onStart(ctx) { ctx.memory[HAPPY] = ctx.tick; },
      onCastStart(ctx) { if (ctx.ability.key === "Q" || ctx.ability.key === "R") ctx.memory[`gragas:declared:${ctx.ability.key}`] = ctx.tick; },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (["Q", "W", "E", "R"].includes(key) && !ctx.self.resurrection && ctx.self.hp > 0 && ctx.tick >= Number(ctx.memory[HAPPY] ?? 0)) { ctx.memory[HAPPY] = ctx.tick + ticks(passiveCD); heal(ctx.world, ctx.self, derive(ctx.self).maxHp * healShare); }
        if (ctx.self.resurrection && ["Q", "W", "E", "R"].includes(key)) return;
        if (key === "Q") throwCask(ctx, false);
        if (key === "Q2") for (const zone of barrels(ctx.world, ctx.self)) detonate(ctx, zone);
        if (key === "W") {
          ctx.memory[DRINK] = true; ctx.memory[`${DRINK}:end`] = ctx.tick + ticks(channelTime) + ticks(attackTime);
          ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "W", memoKey: DRINK, source: ctx.self.side, startTick: ctx.tick, endTick: Number(ctx.memory[`${DRINK}:end`]), value: 0 });
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "damageReduction", duration: reductionTime, value: Math.min(1, wBaseDR + wAPDR * derive(ctx.self).ap) }, { ability: wDefense, scale: 1 });
        }
        if (key === "E") { const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1; ctx.memory[SLAM] = false; ctx.memory[`${SLAM}:direction`] = direction; ctx.memory[`${SLAM}:end`] = ctx.self.x + dashDistance(ctx.world, ctx.self, direction * Math.max(0, Math.min(eRange, ctx.aim?.distance ?? eRange))); }
        if (key === "R") throwCask(ctx, true);
      },
      onTick(ctx) {
        if (ctx.self.resurrection) {
          clearDrink(ctx); ctx.self.statuses = ctx.self.statuses.filter(status => status.key !== "W" || status.kind !== "empower");
          if (ctx.self.action?.kind === "cast" && ["Q", "R"].includes(ctx.self.action.ability)) ctx.self.action = undefined;
        }
        if (ctx.memory[DRINK] && ctx.tick >= Number(ctx.memory[`${DRINK}:end`])) clearDrink(ctx);
      },
      onZoneLand(ctx) {
        const zone = ctx.zone;
        if (zone.ability === qFlight.key) {
          ctx.world.zones.push({ ...zone, id: ctx.world.nextId++, ability: qHit.key, startTick: ctx.tick, endTick: ctx.tick + ticks(barrelTime), connects: (zone.scale ?? 1) > 0, memory: { landed: ctx.tick, direction: Number(zone.memory?.direction ?? directionTo(ctx.self, ctx.enemy)) } });
        } else if (zone.ability === qHit.key) { detonate(ctx, zone); zone.connects = false; zone.onHit = []; }
        else if (zone.ability === rHit.key) {
          for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - zone.x) <= rRadius + contact.target.spec.base.radius + EPSILON) {
            const targetDirection = contact.target.x === zone.x ? Number(zone.memory?.direction ?? directionTo(ctx.self, contact.target)) : Math.sign(contact.target.x - zone.x);
            ctx.memory["gragas:rDelta"] = targetDirection * rKnock;
            hit(ctx, contact, rHit, rPacket, contact.pet ? 1 : zone.scale ?? 1, zone.x);
          }
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", ability: "Rvision", x: zone.x, radius: rRadius, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(sightTime), onHit: [], noPets: true });
        }
      },
      beforeAbilityHit(ctx) { if (ctx.ability.key === eHit.key) displace(ctx, 0, eHit.key); if (ctx.ability.key === rHit.key) displace(ctx, Number(ctx.memory["gragas:rDelta"] ?? 0), rHit.key); },
      onChannelInterrupt(ctx) { if (ctx.ability.key === "W") clearDrink(ctx); },
      onAttack(ctx) {
        if (!ctx.action.empowered?.includes("W")) return;
        if (ctx.targetPet?.spec.hitPoints) {
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "empower", attacks: 1, window: Math.max(0, Number(ctx.memory[`${DRINK}:end`]) - ctx.tick) / 30, bonusRange, uncancellable: true, onHit: [] }, { ability: byKey("W"), scale: 1 });
          ctx.action.empowered = ctx.action.empowered.filter(key => key !== "W"); return;
        }
        ctx.action.attackTag = DRINK;
      },
      onAttackLaunch(ctx) { if (ctx.action.attackTag === DRINK) clearDrink(ctx); },
      onAttackBeforeDamage(ctx) {
        if (ctx.blocked || ctx.attack.attackTag !== DRINK || ctx.self.resurrection) return;
        for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - ctx.enemy.x) <= wRadius + contact.target.spec.base.radius + EPSILON) {
          const hpTerm = (wDamage.ratios?.targetMaxHP ?? 0) * derive(contact.target).maxHp;
          const amount = evaluate(wDamage, ctx.self, contact.target) - hpTerm + (contact.target.spec.targetClass === "monster" ? Math.min(monsterCap, hpTerm) : hpTerm);
          const effects: Effect[] = [{ type: "damage", damageType: "magic", amount: { base: amount }, petDamageCategory: "area" }];
          // The outer basic owns this pet view; keep its spellshield transaction authoritative.
          if (ctx.pet && contact.pet?.id === ctx.pet.id) abilityHit(ctx.world, ctx.self, ctx.enemy, wHit, effects, ctx.scale, ctx.enemy.x);
          else hit(ctx, contact, wHit, effects, ctx.scale, ctx.enemy.x);
        }
      },
      onDashTick(ctx) {
        if (ctx.ability.key !== "E") return;
        const direction = Number(ctx.memory[`${SLAM}:direction`]) as 1 | -1, remaining = Math.max(0, (Number(ctx.memory[`${SLAM}:end`]) - ctx.self.x) * direction), step = Math.min(eSpeed / 30, remaining);
        let collision = Infinity;
        for (const contact of contacts(ctx)) {
          if (!contact.target.alive || contact.target.hp <= 0 || inStasis(contact.target) || isUntargetable(contact.target, ctx.self)) continue;
          const forward = (contact.target.x - ctx.self.x) * direction;
          if (forward < -eRadius - EPSILON) continue;
          const enter = Math.max(0, forward - eRadius);
          if (enter <= step + EPSILON) collision = Math.min(collision, enter);
        }
        ctx.action.perTick = direction * Math.min(step, collision);
        if (Number.isFinite(collision)) { ctx.memory[SLAM] = true; ctx.action.endTick = ctx.tick; }
        else if (remaining <= step + EPSILON) ctx.action.endTick = ctx.tick;
      },
      onDashEnd(ctx) {
        if (ctx.ability.key !== "E") return;
        if (ctx.interrupted || !ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection) { delete ctx.memory[SLAM]; return; }
        const front = ctx.self.x + Number(ctx.memory[`${SLAM}:direction`]) * eForward;
        const collision = !!ctx.memory[SLAM];
        if (!collision) ctx.memory[SLAM] = contacts(ctx).some(contact => contact.target.alive && contact.target.hp > 0 && !inStasis(contact.target) && !isUntargetable(contact.target, ctx.self) && Math.abs(contact.target.x - front) <= eLollipop + contact.target.spec.base.radius + EPSILON);
        if (ctx.memory[SLAM]) slamImpact(ctx, collision ? ctx.self.x : front);
        delete ctx.memory[SLAM];
      },
      onLethal(ctx) { clearDrink(ctx); ctx.self.statuses = ctx.self.statuses.filter(status => !(status.kind === "empower" && status.key === "W") && status.ability !== wDefense.key); delete ctx.memory[SLAM]; return false; },
    }, budget: {
      damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, wCycle = channelTime + Math.min(attackTime, 1 / Math.max(EPSILON, d.attackSpeed)) + wCD / haste; return { magic: evaluate(qMax, self, target) * haste / qCD + evaluate(wDamage, self, target) / wCycle + evaluate(eDamage, self, target) * haste / (eCD * (1 - refund)) + evaluate(rDamage, self, target) * haste / rCD }; },
      healing(self) { const d = derive(self), haste = 1 + d.abilityHaste / 100, cadence = haste / qCD + haste / eCD + haste / wCD + haste / rCD; return d.maxHp * healShare * Math.min(1 / passiveCD, cadence); },
    } };
  },
};
export default gragas;
