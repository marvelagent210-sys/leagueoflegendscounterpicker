/** Graves: finite shells, physical fan contacts, powder-trail return and anchored smoke. */
import type { KitModule } from "../../engine/kits/compile";
import { TOP_LANE_MAX_LEVEL } from "../../engine/stats";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, attackHit, canSee, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { terrainLimit } from "../../engine/sim/terrain";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const AMMO = "graves:ammo", RELOAD = "graves:reload", GRIT = "graves:grit", GRITEND = "graves:gritEnd";
const graves: KitModule = {
  champion: "Graves",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const shells = p.quoted("within 2 shells"), pellets = p.quoted("sprays 4 pellets"), critPellets = p.quoted("spray 6 pellets"), critRatio = p.quoted("equal to 50% bonus critical damage") / 100;
    const first = p.levelValue("dealing 70.0002"), extra = p.levelValue("dealing 70.0002", 1), range = p.field("range", "Pellet collision reach"), pelletWidth = p.field("width"), speed = p.field("speed", "Pellets missile speed"), angles = p.fieldNumbers("angle");
    const emptyReload = p.quoted("takes 2.08 seconds"), singleReload = p.quoted("and 1.3 seconds"), idleReload = p.quoted("for 2.08 seconds"), threshold = p.quoted("between 150%") / 100;
    const capLow = p.quoted("0.65114 +"), capHigh = p.quoted("0.89119 -"), capLevels = p.quoted("/ 17 *"), levelStart = p.quoted("(x - 1)");
    p.quote("Precise formula is unknown"); p.quote("Only the first pellet to hit each enemy applies on-hit effects"); p.quote("all additional pellets deal default damage"); p.quote("random direction that is always away"); p.quote("not counted toward the 150%"); p.quote("only 1 game tick");
    // The binary confirms a different additional-pellet coefficient; retain the primary wiki table and disclose it.
    p.gameQuote("mSpell.mSpellCalculations.MultiBulletDamage.mMultiplier.mNumber: 0.3330000042915344");
    const qRange = q.fieldNumbers("range"), qWidths = q.fieldNumbers("width"), qOut = q.formula("Physical Damage"), qBack = q.formula("Physical Damage", 1), qCD = q.cooldown(), qCast = q.castTime();
    const qDelay = q.quoted("After 2 seconds"), qWallDelay = q.gameQuoted("mSpell.DataValues[TerrainCollisionDelay].values: [0.20000000298023224"), qSpeed = q.gameQuoted("mSpell.missileSpeed: 3000.0"), qReturnSpeed = q.gameQuoted("mSpell.missileSpeed: 1600.0");
    q.quote("Spell shields can only block one instance"); q.quote("Wind Wall will destroy the projectile entirely"); q.quote("Unbreakable is considered to be terrain");
    const wRange = w.field("targetRange"), wRadius = w.field("effectRadius"), wCloudRadius = w.gameQuoted("mSpell.DataValues.SmokeRadius.values: [200.0"), wSpeed = w.field("speed"), wDamage = w.formula("Magic Damage"), wSeconds = w.quoted("for 4 seconds"), wPulse = w.quoted("every 0.25 seconds"), wSight = w.quoted("to 250 units"), wSlow = w.quoted("by 50%") / 100, wSlowSeconds = w.quoted("for 0.5 seconds");
    w.quote("Starts traveling at the start"); w.quote("relative to the center"); w.quote("nearsight untargetable units"); w.quote("prevent it from being reapplied while staying inside"); w.quote("cleanses have no effect");
    const eDistances = e.fieldNumbers("targetRange"), eSpeed = e.gameQuoted("mSpell.DataValues[DashSpeed].values: [750.0"), eSeconds = e.quoted("for 4 seconds"), eCap = e.quoted("up to 8 times"), eRefund = e.quoted("by 0.5 seconds"), armor = e.number("Bonus Armor"), mr = e.number("Bonus Magic Resistance"), eCheck = e.quoted("within 1300 distance");
    e.quote("visible enemy champion is in front"); e.quote("targetable to grant"); e.quote("damage versus non-minions"); e.quote("resets Graves basic attack timer");
    const rRange = r.fieldNumbers("range")[0]!, rRadius = r.field("effectRadius"), rWidth = r.field("width"), rSpeed = r.field("speed"), rDamage = r.formula("Physical Damage"), rCone = r.formula("Reduced Damage"), recoil = r.quoted("recoil 400 units"), coneOffset = r.quoted("150 units behind");
    r.field("angle"); r.quote("including to non-champions struck before exploding"); r.quote("protected by a spell shield"); r.quote("grounded or rooted"); r.quote("if he is airborne");
    const criticalAmp = (self: Unit) => 1 + critRatio * (derive(self).critDamage - 1);
    const allowedOverlay = (self: Unit) => !self.action || self.action.kind === "windup" || (self.action.kind === "dash" && self.action.ability === "E" && self.memory["graves:eReloadOverlay"] === true);
    e.quote("If Graves dashes while reloading");
    const hidden = (key: string, name: string, spellShield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, flags: { spellShield, petContactHooks: true }, persistsAfterDeath: true, budgetExcluded: true, roles: [] });
    const pellet = hidden("pellet", p.name, false), back = hidden("Qreturn", `${q.name} (return)`), smoke = hidden("Wsmoke", `${w.name} (smoke)`, false), cone = hidden("Rcone", `${r.name} (cone)`);
    pellet.flags = { ...pellet.flags, parry: true, appliesLifeSteal: true };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, delivery: { kind: "self" }, overlay: true, usable: allowedOverlay, flags: { petContactHooks: true, projectile: true }, estimate: (self, target) => evaluate(qOut, self, target), roles: ["damage"], persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, overlay: true, usable: allowedOverlay, flags: { petContactHooks: true, projectile: true }, estimate: (self, target) => evaluate(wDamage, self, target), roles: ["damage", "cc"], persistsAfterDeath: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "dash", direction: "toward", distance: eDistances.at(-1)!, minDistance: eDistances[0], speed: eSpeed, crossTerrain: true, through: true }, onSelf: [{ type: "resetAttack" }], roles: ["engage", "escape", "defense"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, overlay: true, usable: allowedOverlay, flags: { petContactHooks: true, projectile: true }, estimate: (self, target) => evaluate(rDamage, self, target), roles: ["damage", "finisher"], persistsAfterDeath: true },
      pellet, back, smoke, cone,
    ];
    const effect = (amount: typeof qOut, damageType: "physical" | "magic" = "physical"): Effect[] => [{ type: "damage", damageType, amount }];
    const hit = (ctx: HookContext, target: Unit, pet: Pet | undefined, ability: AbilitySpec, effects: Effect[], category: "singleTarget" | "area" = "area", scale = 1, originX = ctx.self.x) => { if (pet) { const before = pet.hp; abilityHitPet(ctx.world, ctx.self, pet, ability, effects, category, scale, originX); if (pet.hp < before && ctx.memory[GRIT] && (pet.spec.targetClass === "champion" || pet.spec.targetClass === "other" || pet.spec.targetClass === "monster")) grit(ctx); } else abilityHit(ctx.world, ctx.self, target, ability, effects, scale, originX); };
    const targets = (ctx: HookContext) => [{ target: ctx.world.units[ctx.self.side === 0 ? 1 : 0], pet: undefined as Pet | undefined }, ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const grit = (ctx: HookContext, stacks = 0) => {
      const count = Math.min(eCap, Number(ctx.memory[GRIT] ?? 0) + stacks); if (!(count > 0)) return;
      ctx.memory[GRIT] = count; ctx.memory[GRITEND] = ctx.tick + ticks(eSeconds);
      ctx.buff("graves:armor", "armor", armor * count, eSeconds); ctx.buff("graves:mr", "MR", mr * count, eSeconds);
    };
    const reloadSeconds = (self: Unit, single: boolean) => {
      // No exact reload equation is published. Use only the measured endpoints; never invent the anomalous 150–200% curve.
      const minimum = 1 / (capLow + (capHigh - capLow) / capLevels * (TOP_LANE_MAX_LEVEL - levelStart));
      const growth = self.spec.base.attackSpeed.bonus, external = Math.max(0, derive(self).bonusAttackSpeed - growth), share = Math.min(1, external / threshold);
      const full = emptyReload + (minimum - emptyReload) * share;
      return single ? full * singleReload / emptyReload : full;
    };
    const cancelReload = (ctx: HookContext) => { delete ctx.memory[RELOAD]; ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== RELOAD); };
    const beginReload = (ctx: HookContext, single: boolean) => {
      const duration = reloadSeconds(ctx.self, single); ctx.memory[RELOAD] = ctx.tick + ticks(duration);
      if (!single) { ctx.apply({ type: "state", state: "noAttacks", duration }, true); ctx.self.statuses.at(-1)!.memoKey = RELOAD; }
    };
    const missile = (ctx: HookContext, source: string, x: number, direction: 1 | -1, distance: number, velocity: number, extra: Partial<Missile> = {}) => {
      const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source, seenTick: ctx.tick, x, direction, perTick: velocity / 30, travelLeft: distance, homing: false, projectile: true, interceptable: true, connects: false, scale: 1, onHit: [], radius: source === "pellet" ? pelletWidth / 2 : source === "Q" ? qWidths[0]! / 2 : source === "Qreturn" ? qWidths[2]! / 2 : source === "R" ? rWidth / 2 : 0, expiresTick: ctx.tick + ticks(qDelay + wSeconds + distance / Math.max(1, velocity)), ...extra };
      ctx.world.missiles.push(m); return m;
    };
    const contacts = (ctx: HookContext, m: Missile, from: number, to: number, radius: number, theta = 0) => {
      const origin = Number(ctx.memory[`graves:origin:${m.id}`] ?? from), cosine = Math.cos(theta);
      return targets(ctx).flatMap(({ target, pet }) => {
        if (!target.alive || isUntargetable(target, ctx.self) || (!m.attack && pet?.spec.hitPoints)) return [];
        const distance = (target.x - origin) * m.direction, reach = target.spec.base.radius + radius, transverse = distance * Math.sin(theta);
        if (distance < -reach || Math.abs(transverse) > reach) return [];
        const axial = Math.max(0, distance * cosine - Math.sqrt(Math.max(0, reach * reach - transverse * transverse))) * cosine;
        const contactX = origin + m.direction * axial;
        if ((contactX - from) * m.direction < -EPSILON || (contactX - to) * m.direction > EPSILON) return [];
        return [{ target, pet, distance: (contactX - from) * m.direction, x: contactX }];
      }).sort((a, b) => a.distance - b.distance || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
    };
    const explodeQ = (ctx: HookContext, m: Missile, wall: boolean) => {
      const zone = ctx.world.zones.find((z) => z.id === Number(ctx.memory[`graves:qZone:${m.id}`]));
      if (zone) { zone.x = m.x; zone.endTick = wall ? ctx.tick + ticks(qWallDelay) : Math.max(ctx.tick, zone.endTick); zone.memory = { ...(zone.memory ?? {}), ready: true }; }
      delete m.impactTick; m.ended = true;
    };
    const explodeR = (ctx: HookContext, m: Missile, direct?: Unit) => {
      const origin = m.x - m.direction * coneOffset;
      for (const { target, pet } of targets(ctx)) {
        if (target === direct || (!pet && direct?.petId === undefined && direct?.side === target.side) || (pet && direct?.petId === pet.id)) continue;
        const d = (target.x - origin) * m.direction;
        if (d + target.spec.base.radius >= 0 && d - target.spec.base.radius <= rRadius) hit(ctx, target, pet, cone, effect(rCone), "area", 1, m.x);
      }
      delete m.impactTick; m.ended = true;
    };
    const updateSmoke = (ctx: HookContext) => {
          // Sight is a field property independent of removable CC, refreshed while its center is inside.
          for (const field of ctx.world.zones.filter((z) => z.owner === ctx.self.side && z.ability === "Wsmoke" && z.endTick > ctx.tick)) {
            const target = ctx.enemy, key = `graves:smoke:${field.id}`, inside = Math.abs(target.x - field.x) <= wCloudRadius;
            if (!inside) { target.statuses = target.statuses.filter((s) => s.memoKey !== key && s.memoKey !== `${key}:cc`); if (field.memory) { delete field.memory.inside; delete field.memory.applied; } continue; }
            const seen = field.memory ??= {};
            const prior = target.statuses.find((s) => s.memoKey === `${key}:cc`);
            if (seen.applied && !prior) seen.resisted = true;
            target.statuses = target.statuses.filter((s) => s.memoKey !== key);
            target.statuses.push({ kind: "state", key: "sightLimit", source: ctx.self.side, ability: "W", startTick: ctx.tick, endTick: ctx.tick + 1, value: wSight, x: field.x, memoKey: key });
            if (!seen.inside) { seen.resisted = false; seen.inside = true; }
            if (ctx.tick >= Number(seen.next ?? ctx.tick)) {
              seen.next = field.startTick + ticks((Math.floor((ctx.tick - field.startTick) / (wPulse * 30)) + 1) * wPulse);
              if (!seen.resisted) {
                const applied = applyCC(ctx.world, ctx.self, target, "nearsight", (field.endTick - ctx.tick) / 30, wSight, false, "W");
                if (applied) { const cc = target.statuses.find((s) => s.kind === "cc" && s.key === "nearsight" && s.source === ctx.self.side); if (cc) { cc.memoKey = `${key}:cc`; cc.x = field.x; } seen.applied = true; }
                else { seen.applied = true; seen.resisted = true; }
              }
            }
          }
    };
    const moveMissile = (ctx: HookContext & { missile: Missile; from: number; to: number }) => {
          const m = ctx.missile;
          if (m.source === "pellet") {
            const c = contacts(ctx, m, ctx.from, ctx.to, pelletWidth / 2, Number(ctx.memory[`graves:angle:${m.id}`] ?? 0))[0]; if (!c) return;
            const critical = ctx.memory[`graves:critical:${m.id}`] === true, key = `graves:hit:${ctx.memory[`graves:group:${m.id}`]}:${c.pet?.id ?? "champion"}`, firstHit = !ctx.memory[key]; ctx.memory[key] = true;
            if (firstHit) { const before = c.target.hp; attackHit(ctx.world, ctx.self, c.target, false, m.attack?.bonusOnHit ?? [], undefined, false, { critChance: critical ? 1 : 0, critMultiplier: criticalAmp(ctx.self), baseDamageScale: first / 100 }, m.scale, ctx.from); if (c.pet && c.target.hp < before && ctx.memory[GRIT] && (c.pet.spec.targetClass === "champion" || c.pet.spec.targetClass === "other" || c.pet.spec.targetClass === "monster")) grit(ctx); }
            else hit(ctx, c.target, c.pet, pellet, effect({ base: 0, ratios: { AD: extra / 100 * (critical ? criticalAmp(ctx.self) : 1) } }), "singleTarget", m.scale, ctx.from);
            if (!hasState(c.target, "parry") && !hasState(c.target, "dodgeAttacks")) ctx.self.cooldownReady.E = Math.max(ctx.tick, (ctx.self.cooldownReady.E ?? 0) - eRefund * 30 * m.scale);
            m.x = c.x; delete m.impactTick; m.ended = true; return;
          }
          if (m.source === "Q" || m.source === "Qreturn") {
            const width = m.source === "Q" ? qWidths[0]! : qWidths[2]!;
            for (const c of contacts(ctx, m, ctx.from, ctx.to, width / 2)) {
              if (c.pet ? m.hitPets?.includes(c.pet.id) : m.hitTargets?.includes(c.target.side)) continue;
              if (c.pet) (m.hitPets ??= []).push(c.pet.id); else (m.hitTargets ??= []).push(c.target.side);
              hit(ctx, c.target, c.pet, m.source === "Q" ? abilities[0]! : back, effect(m.source === "Q" ? qOut : qBack), "area", 1, ctx.from);
            }
            if (m.source === "Q" && ctx.memory[`graves:qWall:${m.id}`]) explodeQ(ctx, m, true);
          }
          if (m.source === "R") {
            for (const c of contacts(ctx, m, ctx.from, ctx.to, rWidth / 2)) {
              if (c.pet && m.hitPets?.includes(c.pet.id)) continue;
              hit(ctx, c.target, c.pet, abilities[3]!, effect(rDamage), "singleTarget", 1, ctx.from);
              if (c.pet) (m.hitPets ??= []).push(c.pet.id);
              if (!c.pet || c.pet.spec.targetClass === "champion") { m.x = c.x; explodeR(ctx, m, c.target); break; }
            }
          }
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return defaultBehavior(view);
      if (!view.self.action && ["fight", "trade", "kite"].includes(view.mode) && !view.self.memory.tradeDone) {
        const ec = abilities[2]!;
        if (Number(view.self.memory[AMMO] ?? shells) < shells && canCast(view.world, view.self, ec) && view.distance <= range) return { kind: "cast", ability: "E", aim: { direction: 1, distance: eDistances[0] } };
        for (const [key, reach] of [["R", rRange + rRadius - coneOffset], ["Q", qRange[0]!], ["W", wRange]] as const) if (view.distance <= reach && canCast(view.world, view.self, abilities.find((a) => a.key === key)!)) return { kind: "cast", ability: key };
      }
      const ordinary = defaultBehavior(view);
      if (ordinary?.kind === "cast" && ["Q", "W", "R"].includes(ordinary.ability)) return view.distance <= view.self.spec.attack.range ? { kind: "attack" } : { kind: "move", direction: view.mode === "flee" ? -1 : 1 };
      return ordinary;
    };
    kit.assume("New Destiny starts with two shells. Spending occurs at launch, empty reload prevents attacks, one-shell idle reload begins after2.08seconds and E cancels either reload. The one-tick windup uses the primary note. The published reload formula is explicitly unknown: this model interpolates measured2.08s toward the level-dependent published minimum as external bonusAS rises to150%, scales one-shell reload by1.3/2.08, and caps there. Growth affects the minimum via level; the documented anomalous150–200% slowdown curve is unmodeled. This is a sourced-endpoint approximation, not an exact server formula.");
    kit.assume("Normal four-pellet24degree and critical six-pellet30degree fans use real circular hitboxes on the duel axis and closest actual target interception independently for each ray. Critical geometry is weighted by critical chance; critical pellets gain50% of bonus critical damage per the primary footnote (150% at ordinary200% critical damage). Only each target's first pellet deals basic damage/onhits; extras deal default damage with basic defenses and life steal. The wiki additional-pellet table uses.33302 while the exact client calculation says.3330000043: the pinned primary table wins. The one-dimensional arena has no lateral movement, and blind deterministically fires away from the declared target rather than inventing a lateral random lane. Nonchampion knockback distance/duration are not published and are omitted rather than guessed.");
    kit.assume("Q has a real3000speed piercing outward missile, a two-second powder clock measured from launch, a terrain-triggered detonation at the versioned.2second delay, then a1600speed reverse wave. The parser's0.231 is a rutngt rendering artifact; exact source raw says0.2 rounded up to a game tick. Its endpoint rectangle occupies the sourced total900 versus800 forward reach, and each target can take the explosion/return only once. Projectile walls erase the trail. Actual raised terrain is checked; the environment walls boolean supplies no invented position. Unbreakable contact triggers the same sourced terrain fuse at the actual shield collision; its collision damage and delayed second effect remain independently guarded.");
    kit.assume("Smoke Screen launches at cast start at1500speed, then deals260+60%AP magic and50%slow for.5seconds in200radius. Its independent four-second field uses.25second pulses. Anchored250radius sight reduction (itself estimated in the primary tooltip) persists through CC immunity/cleanse and untargetability; the separately guarded nearsight cannot reapply after resistance/removal until exit/reentry. Leaving smoke immediately clears its sight limit. No allied shared vision is invented in this duel.");
    kit.assume("Quickdraw reloads one shell and resets the attack timer, grants one TrueGrit stack plus a second only when a visible targetable champion is ahead within1300 at some actual dash tick, caps8 and refreshes4seconds on damage to explicit non-minions. An unclassified summon is not assumed a non-minion. Each stack grants19armor and9.5MR. The dash uses pinned750speed and275–375distance with clear-endpoint terrain crossing. Only E begun during an actual reload enables Q/W/R overlays for that dash; ordinary dashes do not permit them.");
    kit.assume("R pierces actual pets with a single-target spell packet, explodes on champion contact even when spellshielded or at1100range, and applies the separate reduced area packet only to additional targets in its740reach cone anchored150behind contact. The cone intersects the duel axis, so transverse60degree coverage is not separately modeled. Recoil moves400 immediately along terrain-limited space as an explicit timing approximation; no movement speed or duration is published. Root, ground and airborne prevent it without preventing the shot. Its finite dash duration and anti-dash interaction are unmodeled. The stale GravesAutoAttackRecoil object contains Riven spell fields and is not treated as recoil-speed evidence. Launched projectiles and smoke survive Graves's death.");
    kit.assume("The reference budget replaces ordinary attacks with a two-shell/reload cycle using the same sourced-endpoint approximation and assumes the centerline target receives the full fan; E's defensive stacks and conditional reload acceleration are not free starting power. Q budgets both passes once per hasted cast cycle, W/R use their direct damage formulas.");
    return { attack: { ranged: true, projectile: true, range: p.field("targetRange"), missileSpeed: speed, onHitToPets: true, blockStopsOnHit: true }, abilities, behavior,
      budget: { attacks: false, damage(self, target) { const d = derive(self), normal = first / 100 + (pellets - 1) * extra / 100, critical = criticalAmp(self) * (first / 100 + (critPellets - 1) * extra / 100); return { physical: d.ad * ((1 - d.critChance) * normal + d.critChance * critical) * shells / (1 / d.attackSpeed + reloadSeconds(self, false) + 1 / 30) + (evaluate(qOut, self, target) + evaluate(qBack, self, target)) / (qCD / (1 + d.abilityHaste / 100) + qCast) + evaluate(rDamage, self, target) / (abilities[3]!.cooldown / (1 + d.abilityHaste / 100) + abilities[3]!.castTime), magic: evaluate(wDamage, self, target) / (abilities[1]!.cooldown / (1 + d.abilityHaste / 100) + abilities[1]!.castTime) }; } },
      hooks: {
        onStart(ctx) { ctx.memory[AMMO] = shells; },
        onAttack(ctx) { ctx.action.launchTick = ctx.tick + 1; },
        onAttackLaunch(ctx) {
          cancelReload(ctx); ctx.memory[AMMO] = Math.max(0, Number(ctx.memory[AMMO] ?? shells) - 1); ctx.memory["graves:lastShot"] = ctx.tick;
          if (ctx.memory[AMMO] === 0) beginReload(ctx, false);
          const dir = directionTo(ctx.self, ctx.enemy) * (ctx.action.blinded ? -1 : 1) as 1 | -1, chance = ctx.action.critChance ?? derive(ctx.self).critChance, group = ctx.world.nextId++;
          for (const [critical, count, angle, share] of [[false, pellets, angles[0]!, 1 - chance], [true, critPellets, angles[1]!, chance]] as const) {
            if (!(share > 0)) continue;
            for (let i = 0; i < count; i++) {
              const theta = (i / (count - 1) - .5) * angle * Math.PI / 180, m = missile(ctx, "pellet", ctx.self.x, dir, range * Math.cos(theta), speed * Math.cos(theta), { scale: share, attack: { blinded: false, bonusOnHit: ctx.action.onHit }, connects: false });
              ctx.memory[`graves:origin:${m.id}`] = ctx.self.x; ctx.memory[`graves:angle:${m.id}`] = theta; ctx.memory[`graves:group:${m.id}`] = `${group}:${critical}`; ctx.memory[`graves:critical:${m.id}`] = critical;
            }
          }
          return false;
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "W") return;
          const dir = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1, distance = Math.min(wRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
          const m = missile(ctx, "W", ctx.self.x, dir, distance, wSpeed); ctx.memory[`graves:landing:${m.id}`] = ctx.self.x + dir * distance;
        },
        onCast(ctx) {
          const dir = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1;
          if (ctx.ability.key === "Q") {
            const m = missile(ctx, "Q", ctx.self.x, dir, qRange[0]!, qSpeed), id = ctx.world.nextId++;
            ctx.memory[`graves:origin:${m.id}`] = ctx.self.x; ctx.memory[`graves:qZone:${m.id}`] = id;
            ctx.world.zones.push({ id, owner: ctx.self.side, ability: "Qreturn", kind: "delayedArea", x: ctx.self.x + dir * qRange[0]!, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(qDelay), connects: false, onHit: effect(qBack), noPets: true, memory: { origin: ctx.self.x, direction: dir, missile: m.id } });
          }
          if (ctx.ability.key === "E") { ctx.memory["graves:eReloadOverlay"] = ctx.memory[RELOAD] !== undefined && ctx.tick < Number(ctx.memory[RELOAD]); cancelReload(ctx); ctx.memory[AMMO] = Math.min(shells, Number(ctx.memory[AMMO] ?? shells) + 1); grit(ctx, 1); ctx.memory["graves:eBonus"] = false; }
          if (ctx.ability.key === "R") {
            const m = missile(ctx, "R", ctx.self.x, dir, rRange, rSpeed); ctx.memory[`graves:origin:${m.id}`] = ctx.self.x;
            if (!ctx.self.statuses.some((s) => s.kind === "cc" && ["root", "ground", "airborne"].includes(s.key))) ctx.self.x += terrainLimit(ctx.world, ctx.self, -dir * recoil);
          }
        },
        onDashEnd(ctx) { if (ctx.ability.key === "E") delete ctx.memory["graves:eReloadOverlay"]; },
        onTick(ctx) {
          if (ctx.memory[RELOAD] !== undefined && ctx.tick >= Number(ctx.memory[RELOAD])) { ctx.memory[AMMO] = shells; cancelReload(ctx); }
          if (Number(ctx.memory[AMMO]) === 1 && ctx.memory[RELOAD] === undefined && ctx.tick >= Number(ctx.memory["graves:lastShot"] ?? ctx.tick) + ticks(idleReload)) beginReload(ctx, true);
          if (ctx.memory[GRITEND] !== undefined && ctx.tick >= Number(ctx.memory[GRITEND])) { delete ctx.memory[GRIT]; delete ctx.memory[GRITEND]; }
          if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E" && !ctx.memory["graves:eBonus"] && ctx.self.action.perTick !== 0 && targets(ctx).some(({ target, pet }) => (!pet || pet.spec.targetClass === "champion") && canSee(target, ctx.self) && !isUntargetable(target, ctx.self) && Math.abs(target.x - ctx.self.x) <= eCheck && (target.x - ctx.self.x) * (ctx.self.action as Extract<NonNullable<typeof ctx.self.action>, { kind: "dash" }>).perTick >= 0)) { grit(ctx, 1); ctx.memory["graves:eBonus"] = true; }

        },
        onDamageDealt(ctx) {
          if (!(ctx.amount > 0) || !ctx.memory[GRIT]) return;
          const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((p) => p.id === ctx.enemy.petId);
          if (!pet || pet.spec.targetClass === "champion" || pet.spec.targetClass === "other" || pet.spec.targetClass === "monster") grit(ctx);
        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source === "Wsmoke") { updateSmoke(ctx); return; }
          delete m.impactTick;
          if (m.source === "pellet" || m.source === "Q" || m.source === "Qreturn" || m.source === "R") {
            const width = m.source === "pellet" ? pelletWidth : m.source === "Q" ? qWidths[0]! : m.source === "Qreturn" ? qWidths[2]! : rWidth;
            const cs = contacts(ctx, m, m.x, m.x + m.direction * m.travelLeft, width / 2, m.source === "pellet" ? Number(ctx.memory[`graves:angle:${m.id}`] ?? 0) : 0);
            const c = m.source === "pellet" ? cs[0] : cs.find((c) => !c.pet && !m.hitTargets?.includes(c.target.side));
            if (c && !c.pet) m.impactTick = ctx.tick + Math.ceil(c.distance / Math.max(EPSILON, m.perTick));
            if (m.source === "pellet" && m.attack) { const critical = ctx.memory[`graves:critical:${m.id}`] === true, previous = Boolean(ctx.memory[`graves:hit:${ctx.memory[`graves:group:${m.id}`]}:champion`]); m.attack.baseDamageScale = (previous ? extra : first) / 100; m.attack.critChance = critical ? 1 : 0; m.attack.critMultiplier = criticalAmp(ctx.self); if (previous) m.attack.attackOnHitReplacement = []; }
            if (m.source === "Qreturn") m.onHit = effect(qBack);
          }
          if (m.source === "W" && Math.abs(ctx.enemy.x - Number(ctx.memory[`graves:landing:${m.id}`])) <= wRadius + ctx.enemy.spec.base.radius) { m.impactTick = ctx.tick + Math.ceil(m.travelLeft / Math.max(EPSILON, m.perTick)); m.onHit = [{ type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }]; }

          if (m.source === "pellet") {
            const to = m.x + m.direction * Math.min(m.perTick, m.travelLeft), contact = contacts(ctx, m, m.x, to, pelletWidth / 2, Number(ctx.memory[`graves:angle:${m.id}`] ?? 0))[0];
            if (contact && !contact.pet && interceptProjectile(ctx.world, m, m.x, to, contact.x)) return;
          }
          if (m.source !== "Q") return;
          m.perTick = qSpeed / 30;
          for (const terrain of ctx.world.terrain.filter((t) => t.endTick > ctx.tick)) {
            const edge = m.direction > 0 ? terrain.from : terrain.to, gap = (edge - m.x) * m.direction;
            if (gap >= -EPSILON && gap <= m.perTick && gap <= m.travelLeft) { m.perTick = Math.max(0, gap); ctx.memory[`graves:qWall:${m.id}`] = true; }
          }
          if (m.perTick <= EPSILON && ctx.memory[`graves:qWall:${m.id}`]) explodeQ(ctx, m, true);
        },
        canProjectileIntercept(ctx) { return ctx.missile.source !== "pellet" || ctx.exactPoint !== undefined; },
        onMissileMove: moveMissile,
        onProjectileIntercept(ctx) {
          const m = ctx.missile;
          moveMissile(ctx);
          if (m.source === "Q") explodeQ(ctx, m, true);
          if (m.source === "W") ctx.memory[`graves:landing:${m.id}`] = m.x;
          return true;
        },
        onMissileEnd(ctx) {
          const m = ctx.missile;
          if (m.source === "Q") {
            if (ctx.reason === "blocked") ctx.world.zones = ctx.world.zones.filter((z) => z.id !== Number(ctx.memory[`graves:qZone:${m.id}`]));
            else if (ctx.reason !== "intercepted") explodeQ(ctx, m, false);
          }
          if (m.source === "W" && (ctx.reason === "range" || ctx.reason === "intercepted")) {
            const x = Number(ctx.memory[`graves:landing:${m.id}`]);
            for (const { target, pet } of targets(ctx)) if (Math.abs(target.x - x) <= wRadius + target.spec.base.radius) hit(ctx, target, pet, abilities[1]!, [...effect(wDamage, "magic"), { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }], "area", 1, x);
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, ability: "Wsmoke", kind: "field", x, radius: wCloudRadius, seenTick: m.seenTick, startTick: ctx.tick, endTick: ctx.tick + ticks(wSeconds), interval: ticks(wPulse), nextTick: ctx.tick, onHit: [], noPets: true, memory: {} });
            missile(ctx, "Wsmoke", x, 1, 1, 0, { projectile: false, expiresTick: ctx.tick + ticks(wSeconds) }); updateSmoke(ctx);
          }
          if (m.source === "R" && ctx.reason === "range") explodeR(ctx, m);
        },
        onZoneLand(ctx) {
          const z = ctx.zone; if (z.ability !== "Qreturn" || !z.memory?.ready) return;
          const dir = Number(z.memory.direction) as 1 | -1, origin = Number(z.memory.origin), forward = qRange[1]! - qRange[0]!, hitTargets: number[] = [], hitPets: number[] = [];
          for (const { target, pet } of targets(ctx)) if (Math.abs(target.x - z.x) <= forward + target.spec.base.radius) { hit(ctx, target, pet, back, effect(qBack), "area", 1, z.x); if (pet) hitPets.push(pet.id); else hitTargets.push(target.side); }
          const m = missile(ctx, "Qreturn", z.x, -dir as 1 | -1, Math.abs(z.x - origin), qReturnSpeed, { hitTargets, hitPets }); ctx.memory[`graves:origin:${m.id}`] = z.x;
        },
      },
    };
  },
};
export default graves;
