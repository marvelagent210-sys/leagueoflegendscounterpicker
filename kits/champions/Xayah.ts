/** Xayah: finite planted feathers, independent recall paths and a mobile untargetable ultimate. */
import type { KitModule } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { canCast, EPSILON, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, scaled, ticks } from "./util";

const STACK = "xayah:cleanCuts", STACKUNTIL = "xayah:cleanUntil", RUNTIL = "xayah:rUntil", WUNTIL = "xayah:wUntil";
const xayah: KitModule = {
  champion: "Xayah",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const featherSeconds = p.quoted("for 6 seconds"), stackSeconds = p.quoted("lasting for 8 seconds"), perCast = p.quoted("generate 3 stacks"), maxStacks = p.quoted("stacking up to 5 times"), secondaryAD = p.levelValue("35 / 45 / 55") / 100;
    const pRange = p.field("effectRadius"), pWidth = p.field("width"), pSpeed = p.field("speed"), basicSpeed = p.gameQuoted("mSpell.missileSpeed: 2500.0");
    p.quote("consume a stack on-attack"); p.quote("secondary target damage can critically strike for 200%"); p.quote("ground will be destroyed when Xayah dies"); p.quote("same missile");
    const qDamage = q.formula("Physical Damage Per Hit"), qRange = q.field("range"), qWidth = q.fieldNumbers("width")[0]!, qFalloff = q.quoted("take 50% reduced damage") / 100;
    const qCastBase = q.quoted("0.25-(0.07 per 100% bonus attack speed)", 0), qCastScalar = q.quoted("0.25-(0.07 per 100% bonus attack speed)", 1), qCastMin = q.fieldNumbers("castTime").at(-1)!;
    const qSpeed = q.gameQuoted("mSpell.DataValues.Missile1DelaySpeed.values: [3500.0"), qFirstDelay = q.gameQuoted("mSpell.DataValues.Missile1DelayTime.values: [0.33399999141693115"), qSecondDelay = q.gameQuoted("mSpell.DataValues.Missile2DelayTime.values: [0.5839999914169312");
    q.quote("Spell shield will only block a single instance of damage"); q.quote("small area around Xayah");
    const wAS = w.fraction("Bonus Attack Speed"), wSeconds = w.quoted("for 4 seconds"), wDamage = w.quoted("deals 25% damage") / 100, wMS = w.quoted("30% bonus movement speed") / 100, wMSSeconds = w.quoted("for 1.5 seconds"), wSpeed = w.field("speed");
    w.quote("already in flight will also be empowered"); w.quote("not be granted the bonus movement speed"); w.quote("does not technically count as a Feather"); w.quote("additional missile itself however cannot critically strike"); w.quote("misses while Xayah is blinded");
    const eDamage = e.formula("Physical Damage Per Feather"), eMinionShare = e.quoted("deals 50% damage to minions") / 100, eWidth = e.field("width"), eSpeed = e.field("speed"), eRoot = e.quoted("rooted for 1.25 seconds"), eThreshold = e.gameQuoted("mSpell.DataValues.FeatherThreshold.values: [3.0");
    e.quote("A planted Feather is required"); e.quote("only once per pass"); e.quote("only once they've landed normally first"); e.quote("Spell shield will only block a single instance of damage");
    const eDelay = e.gameQuoted("mSpell.DataValues.FeatherReturnDelay.values: [0.25"), eCrit = e.gameQuoted("mSpell.DataValues.CritRatio.values: [0.5");
    e.gameQuote('"mStat":8,"mDataValue":"CritRatio"'); e.gameQuote('"mStat":9,"mCoefficient":1.0');
    const eFalloff = e.quoted("100 / 95 / 90 / 85 / 80", 0) / 100 - e.quoted("100 / 95 / 90 / 85 / 80", 1) / 100, eFloor = e.quoted("35 / 30 / 25 / 20 / 15 / 10", 5) / 100;
    const rDamage = r.formula("Physical Damage"), rSeconds = r.quoted("untargetable for 1.5 seconds"), rDelay = r.quoted("After 1 second"), rFeathers = r.quoted("shoots 5 Feathers"), rAngle = r.field("angle"), rRange = r.fieldNumbers("effectRadius").at(-1)!, rSpeed = r.gameQuoted("mSpell.missileSpeed: 4000.0"), rRadius = r.gameQuoted("mSpell.mMissileSpec.mMissileWidth: 20.0");
    r.quote("can still move"); r.quote("unable to basic attack or cast abilities"); r.quote("missiles have 1100 range but start slightly behind");
    const qCD = q.cooldown(), wCD = w.cooldown(), eCD = e.cooldown(), rCD = r.cooldown();
    const stacks = (self: Unit, tick: number) => tick < Number(self.memory[STACKUNTIL] ?? -1) ? Number(self.memory[STACK] ?? 0) : 0;
    const notR = (self: Unit, world: HookContext["world"]) => world.tick >= Number(self.memory[RUNTIL] ?? -1);
    const chanceShare = (chance: number) => chance >= .98 ? 1 : chance <= .02 ? 0 : chance;
    const hidden = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, flags: { spellShield: shield, projectile: true, petContactHooks: true }, roles: [] });
    const qSecond = hidden("Qsecond", `${q.name} (second dagger)`, [{ type: "damage", damageType: "physical", amount: qDamage }]);
    const continuation = hidden("Ifeather", p.name, [] , false);
    const recall = { ...hidden("Ereturn", e.name, [{ type: "damage", damageType: "physical", amount: eDamage }]), persistsAfterDeath: true };
    const rFeather = { ...hidden("Rfeather", r.name, [{ type: "damage", damageType: "physical", amount: rDamage }]), persistsAfterDeath: true };
    const extra = { ...hidden("Wextra", `${w.name} (extra strike)`, [], false), persistsAfterDeath: true, flags: { spellShield: false, projectile: true, petContactHooks: true, basicDamage: true, parry: true } };
    const feather = hidden("feather", `${p.name} (planted)`, [], false);
    const keyFor = (target: Unit) => target.petId === undefined ? `champion:${target.side}` : `pet:${target.petId}`;
    const yKey = (id: number) => `xayah:y:${id}`;
    const spawn = (ctx: HookContext, source: string, x: number, direction: 1 | -1, range: number, speed: number, width: number, effects: Effect[], share = 1): Missile => {
      const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source, seenTick: ctx.tick, x, direction, perTick: speed / 30, travelLeft: range, homing: false, piercing: true, projectile: true, collisionPet: true, radius: width / 2, connects: share > 0, scale: share, onHit: effects };
      ctx.world.missiles.push(m); return m;
    };
    const returnFeather = (ctx: HookContext, x: number, y: number, group: number) => {
      const dx = ctx.self.x - x, length = Math.hypot(dx, y), delayTicks = Math.max(0, Number(ctx.memory[`xayah:eCastAt:${group}`] ?? ctx.tick) + ticks(eDelay) - ctx.tick), share = chanceShare(skillshotChance(ctx.world, ctx.enemy, ctx.tick, delayTicks / 30 + length / eSpeed, eWidth / 2));
      const m = spawn(ctx, "Ereturn", x, dx >= 0 ? 1 : -1, Math.max(EPSILON, Math.abs(dx)), 0, eWidth, [{ type: "damage", damageType: "physical", amount: eDamage, label: `xayah:e:${group}` }], share);
      m.collisionPet = false; m.connects = false; m.followOwner = true; m.travelLeft = Infinity;
      ctx.memory[yKey(m.id)] = y; ctx.memory[`xayah:group:${m.id}`] = group; ctx.memory[`xayah:returnAt:${m.id}`] = ctx.tick + delayTicks; ctx.memory[`xayah:share:${m.id}`] = share;
    };
    const plant = (ctx: HookContext, missile: Missile) => {
      if (!ctx.self.alive) return;
      const y = Number(ctx.memory[yKey(missile.id)] ?? 0), group = Number(ctx.memory[`xayah:recall:${missile.id}`] ?? 0);
      if (group) { returnFeather(ctx, missile.x, y, group); return; }
      ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", ability: "feather", x: missile.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(featherSeconds), onHit: [], noPets: true, memory: { y } });
    };
    const wStrike = (ctx: HookContext & { blocked: boolean; critChance: number; attack: { attackTag?: string }; scale: number }) => {
      if (ctx.blocked || !ctx.enemy.alive || ctx.attack.attackTag?.startsWith("xayah:extra")) return;
      const saved = ctx.attack.attackTag?.split(":") ?? [], declaredW = saved[3] === "1", entitledInFlight = saved[4] === "1", active = ctx.tick < Number(ctx.memory[WUNTIL] ?? -1);
      if (!declaredW && !entitledInFlight && !active) return;
      const d = derive(ctx.self), damage = d.ad * (1 + ctx.critChance * (d.critDamage - 1)) * wDamage;
      const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((target) => target.id === ctx.enemy.petId);
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Wextra", seenTick: ctx.tick, x: ctx.self.x, perTick: wSpeed / 30, direction: directionTo(ctx.self, ctx.enemy), travelLeft: Infinity, homing: true, projectile: true, connects: true, scale: ctx.scale, onHit: [{ type: "damage", damageType: "physical", amount: { base: damage } }], ...(pet ? { pet: pet.id } : {}) });
      if (declaredW && ctx.enemy.petId === undefined) ctx.buff("xayah:plumageMS", "moveSpeedPercent", wMS, wMSSeconds);
    };
    // The fan preserves transverse feather positions. Champion movement remains on the
    // duel axis; overlap is an actual 2D segment/circle test, not five guaranteed hits.
    const cross = (ax: number, ay: number, bx: number, by: number, x: number, radius: number) => {
      const dx = bx - ax, dy = by - ay, length2 = dx * dx + dy * dy;
      const t = length2 > EPSILON * EPSILON ? Math.max(0, Math.min(1, ((x - ax) * dx - ay * dy) / length2)) : 0;
      return Math.hypot(ax + dx * t - x, ay + dy * t) <= radius + EPSILON;
    };
    const tryFanIntercept = (ctx: HookContext, m: Missile, toX: number, toY: number) => {
      m.interceptable = false;
      const fromY = Number(ctx.memory[yKey(m.id)] ?? 0), radius = (m.source === "Ereturn" ? eWidth / 2 : rRadius) + ctx.enemy.spec.base.radius;
      const dx = toX - m.x, dy = toY - fromY, ox = m.x - ctx.enemy.x, a = dx * dx + dy * dy, c = ox * ox + fromY * fromY - radius * radius;
      let entry = 0;
      if (c > EPSILON) {
        if (a <= EPSILON * EPSILON) return false;
        const b = 2 * (ox * dx + fromY * dy), discriminant = b * b - 4 * a * c;
        if (discriminant < 0) return false;
        entry = (-b - Math.sqrt(discriminant)) / (2 * a);
        if (entry < -EPSILON || entry > 1 + EPSILON) return false;
        entry = Math.max(0, Math.min(1, entry));
      }
      const point = m.x + dx * entry;
      ctx.memory[`xayah:interceptY:${m.id}`] = fromY + dy * entry;
      m.interceptable = true;
      const intercepted = interceptProjectile(ctx.world, m, m.x, toX, point);
      m.interceptable = false;
      delete ctx.memory[`xayah:interceptY:${m.id}`];
      return intercepted;
    };
    const contactSegment = (ctx: HookContext, m: Missile, fromX: number, fromY: number, toX: number, toY: number) => {
          const radius = m.source === "Ereturn" ? eWidth / 2 : rRadius, spec = m.source === "Ereturn" ? recall : rFeather, share = Number(ctx.memory[`xayah:share:${m.id}`] ?? 1);
          if (share > 0 && ctx.enemy.alive && !inStasis(ctx.enemy) && !isUntargetable(ctx.enemy, ctx.self) && !m.hitTargets?.includes(ctx.enemy.side) && cross(fromX, fromY, toX, toY, ctx.enemy.x, radius + ctx.enemy.spec.base.radius)) {
            (m.hitTargets ??= []).push(ctx.enemy.side); abilityHit(ctx.world, ctx.self, ctx.enemy, spec, m.onHit, share, fromX);
          }
          for (const pet of [...ctx.world.pets]) {
            if (pet.owner === ctx.self.side || pet.hp <= 0 || pet.spec.hitPoints || pet.spec.untargetable || isUntargetable(petFormulaTarget(pet, ctx.self, ctx.tick), ctx.self) || m.hitPets?.includes(pet.id) || !cross(fromX, fromY, toX, toY, pet.x, radius + pet.spec.radius)) continue;
            (m.hitPets ??= []).push(pet.id); abilityHitPet(ctx.world, ctx.self, pet, spec, m.onHit, "area", 1, fromX);
          }
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCastBase, castTimeFor: (self) => Math.max(qCastMin, qCastBase - qCastScalar * derive(self).bonusAttackSpeed), delivery: { kind: "line", range: qRange, speed: qSpeed, width: qWidth, radius: qWidth / 2, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true, usable: notR, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: wAS }, duration: wSeconds }], usable: notR, roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, usable: (self, world) => notR(self, world) && world.zones.some((zone) => zone.owner === self.side && zone.ability === "feather" && zone.endTick > world.tick), estimate: (self, target) => evaluate(eDamage, self, target) * 3, roles: ["damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, channel: { duration: rSeconds, interruptible: false, mobile: true }, onSelf: [{ type: "state", state: "untargetable", duration: rSeconds }, { type: "state", state: "ghosted", duration: rSeconds }, { type: "state", state: "noAttacks", duration: rSeconds }], usable: notR, estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: () => rDelay, decisive: true, roles: ["damage", "defense"] },
      qSecond, continuation, recall, rFeather, extra, feather,
    ];
    const behavior: Behavior = (view) => {
      const ordinary = defaultBehavior(view);
      if (view.mode === "idle") return ordinary;
      if (!notR(view.self, view.world)) return { kind: "move", direction: view.mode === "flee" || view.self.memory.tradeDone ? -1 : view.distance > view.self.spec.attack.range ? 1 : 0 };
      if (["fight", "trade", "kite"].includes(view.mode) && !view.self.action && !view.self.memory.tradeDone) {
        const planted = view.world.zones.filter((zone) => zone.owner === view.self.side && zone.ability === "feather" && zone.endTick > view.world.tick);
        const candidates = planted.filter((zone) => cross(zone.x, Number(zone.memory?.y ?? 0), view.self.x, 0, view.enemy.x, eWidth / 2 + view.enemy.spec.base.radius));
        if (candidates.length >= 3 && canCast(view.world, view.self, abilities[2]!)) return { kind: "cast", ability: "E" };
        if (ordinary?.kind === "cast" && ordinary.ability === "E" && candidates.length < 3) return { kind: "attack" };
      }
      return ordinary;
    };
    kit.assume("Clean Cuts stores scalar per-world stacks, starts empty, grants 3 per completed Q/W/E/R cast, caps at 5 and expires 8 seconds after the last grant. A stack is consumed at windup declaration even if that attack later misses or is cancelled. The primary remains a homing ordinary attack at 4000 speed; after actual contact, the same logical feather continues along the current axis to 1000 from Xayah's impact-time position, without hitting that primary twice. Projectile-wall destruction and directional interception prevent a new continuation or planted feather from the destroyed original projectile. If the primary has moved beyond 1000, it plants at the primary immediately. Basic blind/dodge/parry still deny primary damage while an already launched physical feather can continue.");
    kit.assume("Planted feathers last 6 seconds, have individual ground positions and expire exclusively at their deadline. All planted feathers are removed at actual lethal death, and outbound projectiles cannot plant new feathers while Xayah is dead. A previously launched E return may still deal damage. No imaginary Rakan, recall companion, ward, structure or item interaction is created.");
    kit.assume("Double Daggers has max(0.1, 0.25 − 0.07 × bonus AS) cast time from the exact raw-template formula, with ordinary 30 Hz rounding. Two 3500 speed piercing daggers use the version-pinned root DataValues; the separate 400 speed missile objects appear inconsistent, so the runtime choice is disclosed. Their relative 0.25 second spacing is the difference between the two pinned animation-delay values; first launch is at cast completion. Both use the 100 width body on the duel axis; lateral origin offsets and the unsized initial formation-area contact are not invented. Each dagger independently falls to 50% damage after its first actual enemy contact, and a spell shield blocks only that dagger.");
    kit.assume("Deadly Plumage gives 55% AS for 4 seconds. Successful attacks declared during it launch a separate 3000 speed 25%-of-basic-physical strike and grant 30% MS for 1.5 seconds on champion contact; its raw basic damage inherits the triggering attack's averaged critical factor without applying on-hits or critting a second time. W cast during an already flying attack adds the strike but not movement speed. The supplemental missile is launched from Xayah on the primary's successful contact; exact undocumented script launch geometry is an approximation. Blind, dodge, parry and damage block conservatively prevent the supplemental strike; the wiki leaves dodge/block interactions unresolved.");
    kit.assume("Bladecaller requires an actual unexpired planted feather, costs 20, waits the pinned 0.25 second return delay and returns each feather at 4000 speed toward Xayah's current position. Feathers already in flight at E declaration are tagged and recall only after landing, while subsequently launched feathers are excluded. Each actual return checks independent projectile walls, spell shields, parry and spatial overlap. Accepted contacts receive per-target/per-E falloff 100/95/90…floor 10%, with 1 + 0.5 × critChance × (critDamage − 1) exact pinned scaling, and the third accepted feather roots 1.25 seconds. Only pets explicitly classified as minions by their pinned pet records receive the additional 50% minion multiplier; unknown summons and champion clones are not guessed to be minions. A spell-shielded feather is conservatively excluded from the three accepted-hit counter because the available note specifies only a single blocked damage instance. Champion sidesteps are expected shares per return; the combination of every fan feather is not independently branch-enumerated.");
    kit.assume("Featherstorm keeps its 1.5 second untargetable/ghosted/no-attacks/no-other-casts mobile phase and fires after 1 second. The pinned client RUntargetable value is 1.25, a documented conflict resolved in favor of the explicit wiki 1.5. Five feathers are equally spaced across the sourced 30 degree cone, an explicit geometry approximation, with 1000 effective outward length and 4000 speed. Actual 2D fan positions are retained for recall, while champion movement remains on the duel axis. Directional interception requires a confirmed two-dimensional body contact, retains that real collision packet, and terminates the original feather without planting it. Returning packets use their actual traveled-from coordinate for directional defenses. Each target receives at most one R damage packet; this prevents the five projectiles becoming five times the listed damage. The unsourced rear launch offset behind Xayah is not invented; the wiki 1060/1000 effective-reach distinction remains a limitation.");
    kit.assume("The budget includes only capped W attack-speed uptime and its 25% strike, two Q damage packets per cycle, and a finite E feather supply from Q, capped Clean Cuts attacks and only one central R feather. Its E reference applies the real diminishing-return sum and critical factor, excludes fake preplanted feathers, and does not value guaranteed five-feather fan overlap or allied Rakan damage.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: basicSpeed, onHitToPets: true }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, qCycle = qCD / haste + Math.max(qCastMin, qCastBase - qCastScalar * d.bonusAttackSpeed), eCycle = eCD / haste, rCycle = Math.max(rSeconds, rCD / haste), wUptime = Math.min(1, wSeconds / (wCD / haste)), gained = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, wAS)) - d.attackSpeed), attacks = d.attackSpeed + gained * wUptime, clean = Math.min(attacks, perCast * (1 / qCycle + 1 / (wCD / haste) + 1 / eCycle + 1 / rCycle)), count = (2 / qCycle + clean + 1 / rCycle) * eCycle, whole = Math.floor(count), factor = Array.from({ length: whole }, (_, i) => Math.max(eFloor, 1 - eFalloff * i)).reduce((sum, v) => sum + v, 0) + (count - whole) * Math.max(eFloor, 1 - eFalloff * whole); return { physical: evaluate(qDamage, self, target) / qCycle + attackDamage(self) * gained * wUptime + d.ad * (1 + d.critChance * (d.critDamage - 1)) * attacks * wDamage * wUptime + evaluate(eDamage, self, target) * (1 + eCrit * d.critChance * (d.critDamage - 1)) * factor / eCycle + evaluate(rDamage, self, target) / rCycle }; } },
      hooks: {
        onCast(ctx) {
          if (["Q", "W", "E", "R"].includes(ctx.ability.key)) { ctx.memory[STACK] = Math.min(maxStacks, stacks(ctx.self, ctx.tick) + perCast); ctx.memory[STACKUNTIL] = ctx.tick + ticks(stackSeconds); }
          if (ctx.ability.key === "Q") {
            const direction = directionTo(ctx.self, ctx.enemy);
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", ability: "Qsecond", x: ctx.self.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(qSecondDelay - qFirstDelay), onHit: [], noPets: true, memory: { direction } });
          }
          if (ctx.ability.key === "W") {
            ctx.memory[WUNTIL] = ctx.tick + ticks(wSeconds);
            for (const m of ctx.world.missiles) if (m.owner === ctx.self.side && m.source === "attack" && m.attack) {
              const tag = m.attack.attackTag?.split(":") ?? ["xayah", "attack", "0", "0"];
              tag[4] = "1"; m.attack = { ...m.attack, attackTag: tag.join(":") };
            }
          }
          if (ctx.ability.key === "E") {
            const group = Number(ctx.memory["xayah:eGroup"] ?? 0) + 1; ctx.memory["xayah:eGroup"] = group; ctx.memory[`xayah:eCastAt:${group}`] = ctx.tick;
            const planted = ctx.world.zones.filter((zone) => zone.owner === ctx.self.side && zone.ability === "feather" && zone.endTick > ctx.tick);
            ctx.world.zones = ctx.world.zones.filter((zone) => !planted.includes(zone));
            const flying = [...ctx.world.missiles];
            for (const zone of planted) returnFeather(ctx, zone.x, Number(zone.memory?.y ?? 0), group);
            for (const m of flying) if (m.owner === ctx.self.side && (["Q", "Qsecond", "Ifeather", "Rfeather"].includes(m.source) || (m.source === "attack" && m.attack?.attackTag?.split(":")[2] === "1"))) ctx.memory[`xayah:recall:${m.id}`] = group;
          }
          if (ctx.ability.key === "R") { ctx.memory[RUNTIL] = ctx.tick + ticks(rSeconds); ctx.memory["xayah:rFire"] = ctx.tick + ticks(rDelay); ctx.memory["xayah:rDirection"] = directionTo(ctx.self, ctx.enemy); ctx.memory["xayah:rGroup"] = Number(ctx.memory["xayah:rGroup"] ?? 0) + 1; }
        },
        onAttack(ctx) {
          const count = stacks(ctx.self, ctx.tick), clean = count > 0, empowered = ctx.tick < Number(ctx.memory[WUNTIL] ?? -1);
          if (clean) ctx.memory[STACK] = count - 1;
          ctx.action.attackTag = `xayah:attack:${clean ? 1 : 0}:${empowered ? 1 : 0}`;
          if (clean) ctx.action.missileSpeed = pSpeed;
        },
        onAttackHit: wStrike,
        onAttackPetHit: wStrike,
        onTick(ctx) {
          if (ctx.memory["xayah:rFire"] !== undefined && ctx.tick >= Number(ctx.memory["xayah:rFire"])) {
            delete ctx.memory["xayah:rFire"];
            const direction = Number(ctx.memory["xayah:rDirection"]) as 1 | -1, group = Number(ctx.memory["xayah:rGroup"]), share = chanceShare(skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(rDelay), Math.abs(ctx.enemy.x - ctx.self.x) / rSpeed, Math.abs(ctx.enemy.x - ctx.self.x) * Math.tan(rAngle * Math.PI / 360)));
            for (let i = 0; i < rFeathers; i++) {
              const angle = ((i / (rFeathers - 1) - .5) * rAngle) * Math.PI / 180, lengthX = rRange * Math.cos(angle), m = spawn(ctx, "Rfeather", ctx.self.x, direction, lengthX, rSpeed * Math.cos(angle), rRadius * 2, [{ type: "damage", damageType: "physical", amount: rDamage, label: `xayah:r:${group}` }], share);
              m.collisionPet = false; m.connects = false; ctx.memory[yKey(m.id)] = 0; ctx.memory[`xayah:slope:${m.id}`] = Math.tan(angle) / direction; ctx.memory[`xayah:share:${m.id}`] = share;
            }
          }
        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source === "Rfeather") {
            const to = m.x + m.direction * Math.min(m.perTick, m.travelLeft), fromY = Number(ctx.memory[yKey(m.id)] ?? 0);
            tryFanIntercept(ctx, m, to, fromY + (to - m.x) * Number(ctx.memory[`xayah:slope:${m.id}`] ?? 0));
            return;
          }
          if (m.source !== "Ereturn") return;
          m.interceptable = false;
          if (ctx.tick < Number(ctx.memory[`xayah:returnAt:${m.id}`])) { m.followOwner = false; m.perTick = 0; return; }
          const dx = Math.abs(ctx.self.x - m.x), y = Number(ctx.memory[yKey(m.id)] ?? 0), length = Math.hypot(dx, y);
          if (dx <= EPSILON) {
            if (projectileBlocked(ctx.world, ctx.self.side, m.x, m.x)) { m.ended = true; return; }
            const toY = Math.sign(y) * Math.max(0, Math.abs(y) - eSpeed / 30);
            if (tryFanIntercept(ctx, m, m.x, toY)) return;
            contactSegment(ctx, m, m.x, y, m.x, toY); ctx.memory[yKey(m.id)] = toY;
            m.followOwner = false; m.travelLeft = Infinity; m.perTick = 0;
            if (Math.abs(toY) <= EPSILON) m.ended = true;
            return;
          }
          m.followOwner = true; m.travelLeft = Infinity; m.perTick = eSpeed / 30 * dx / length;
          const to = m.x + Math.sign(ctx.self.x - m.x) * Math.min(dx, m.perTick);
          tryFanIntercept(ctx, m, to, y * Math.max(0, 1 - Math.abs(to - m.x) / dx));
        },
        onProjectileIntercept(ctx) {
          const m = ctx.missile;
          if (!["Rfeather", "Ereturn"].includes(m.source)) return false;
          const fromY = Number(ctx.memory[yKey(m.id)] ?? 0), toY = Number(ctx.memory[`xayah:interceptY:${m.id}`] ?? fromY);
          contactSegment(ctx, m, ctx.from, fromY, ctx.to, toY);
          ctx.memory[yKey(m.id)] = toY;
          return true;
        },
        onMissileMove(ctx) {
          const m = ctx.missile;
          if (m.source === "attack" && Math.abs(ctx.to - ctx.from) > EPSILON) ctx.memory[`xayah:lastDirection:${m.id}`] = ctx.to > ctx.from ? 1 : -1;
          if (!["Rfeather", "Ereturn"].includes(m.source)) return;
          const fromY = Number(ctx.memory[yKey(m.id)] ?? 0), dx = Math.abs(ctx.self.x - ctx.from), toY = m.source === "Rfeather" ? fromY + (ctx.to - ctx.from) * Number(ctx.memory[`xayah:slope:${m.id}`] ?? 0) : fromY * (dx > EPSILON ? Math.max(0, 1 - Math.abs(ctx.to - ctx.from) / dx) : 0);
          ctx.memory[yKey(m.id)] = toY;
          contactSegment(ctx, m, ctx.from, fromY, ctx.to, toY);
        },
        onMissileContact(ctx) {
          const m = ctx.missile;
          if (m.source === "Q" || m.source === "Qsecond") m.onHit = [{ type: "damage", damageType: "physical", amount: scaled(qDamage, 1 - qFalloff) }];
          if (m.source === "attack" && !m.intercepted && m.attack?.attackTag?.split(":")[2] === "1") {
            const direction = Number(ctx.memory[`xayah:lastDirection:${m.id}`] ?? m.direction) as 1 | -1, distance = (ctx.enemy.x - ctx.self.x) * direction;
            const fly = spawn(ctx, "Ifeather", ctx.enemy.x, direction, Math.max(0, pRange - distance), pSpeed, pWidth, [{ type: "damage", damageType: "physical", amount: { base: derive(ctx.self).ad * secondaryAD * (1 + (m.attack.critChance ?? derive(ctx.self).critChance) * (derive(ctx.self).critDamage - 1)) } }]);
            if (ctx.targetPet) fly.hitPets = [ctx.targetPet.id]; else fly.hitTargets = [ctx.enemy.side];
            const pending = ctx.memory[`xayah:recall:${m.id}`]; if (pending !== undefined) ctx.memory[`xayah:recall:${fly.id}`] = pending;
            if (Math.abs(ctx.enemy.x - ctx.self.x) >= pRange - EPSILON) { fly.ended = true; plant(ctx, fly); }
          }
        },
        onMissileEnd(ctx) { if (["Q", "Qsecond", "Ifeather", "Rfeather"].includes(ctx.missile.source) && ctx.reason !== "blocked" && ctx.reason !== "intercepted" && !ctx.missile.intercepted) plant(ctx, ctx.missile); },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "Qsecond") return;
          const direction = Number(ctx.zone.memory?.direction ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1;
          const share = chanceShare(skillshotChance(ctx.world, ctx.enemy, ctx.zone.seenTick, Math.abs(ctx.enemy.x - ctx.zone.x) / qSpeed, qWidth / 2));
          spawn(ctx, "Qsecond", ctx.zone.x, direction, qRange, qSpeed, qWidth, qSecond.onHit!, share);
        },
        onAbilityContact(ctx) {
          const hit = ctx.effects.find((effect) => effect.type === "damage") as Extract<Effect, { type: "damage" }> | undefined;
          if (!hit) return;
          if (ctx.ability.key === "Rfeather") {
            const group = hit.label ?? "xayah:r:0", mark = `xayah:rHit:${group}:${keyFor(ctx.enemy)}`;
            if (ctx.memory[mark]) return [];
            ctx.memory[mark] = true;
          }
          if (ctx.ability.key === "Ereturn") {
            const group = hit.label ?? "xayah:e:0", key = `${group}:${keyFor(ctx.enemy)}`, count = Number(ctx.memory[`xayah:eHits:${key}`] ?? 0), d = derive(ctx.self);
            ctx.enemy.memory["xayah:incomingEGroup"] = group;
            const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((p) => p.id === ctx.enemy.petId), targetShare = pet?.spec.targetClass === "minion" ? eMinionShare : 1;
            return [{ ...hit, amount: scaled(eDamage, targetShare * Math.max(eFloor, 1 - eFalloff * count) * (1 + eCrit * d.critChance * (d.critDamage - 1))) }];
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Ereturn") return;
          const key = `${ctx.enemy.memory["xayah:incomingEGroup"] ?? "xayah:e:0"}:${keyFor(ctx.enemy)}`, count = Number(ctx.memory[`xayah:eHits:${key}`] ?? 0) + ctx.scale;
          ctx.memory[`xayah:eHits:${key}`] = count;
          if (count >= eThreshold - EPSILON && !ctx.memory[`xayah:eRooted:${key}`]) {
            ctx.memory[`xayah:eRooted:${key}`] = true;
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "cc", cc: "root", duration: eRoot }, { ability: recall, scale: ctx.scale });
          }
        },
        onLethal(ctx) { ctx.world.zones = ctx.world.zones.filter((zone) => !(zone.owner === ctx.self.side && zone.ability === "feather")); return false; },
      },
    };
  },
};
export default xayah;
