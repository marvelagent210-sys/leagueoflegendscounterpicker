/** Swain: real Soul Fragment carriers, returning Nevermove and finite Demonic Energy. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack, EPSILON, notifyEnemyCast, resolveSkillshot } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, immediateDisplace, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { flat, FOREVER, innateStat, scaled, seriesAt, ticks } from "./util";

type Body = { target: Unit; pet?: Pet };
type Fragment = { x: number; ready: number; until: number };
const SOULS = "swain:souls", DROPS = "swain:drops", ACTIVE = "swain:active", ENERGY = "swain:energy", ROOT = "swain:rooted:", NOVA = "swain:nova:";
const read = <T>(value: unknown, fallback: T): T => typeof value === "string" ? JSON.parse(value) as T : fallback;
const champion = (target: Unit) => target.spec.targetClass === "champion" || target.petId === undefined && target.spec.targetClass === undefined;

const swain: KitModule = {
  champion: "Swain",
  options: { souls: { label: "Actual Soul Fragments collected before the duel", default: 0 } },
  build(kit, options) {
    const p = kit.ability("Ravenous Flock"), q = kit.ability("Death's Hand"), w = kit.ability("Vision of Empire"), e = kit.ability("Nevermove"), r = kit.ability("Demonic Ascension"), nova = kit.ability("Demonflare");
    const initial = options.souls ?? 0;
    if (!Number.isSafeInteger(initial) || initial < 0) throw new Error("Swain: souls must be a nonnegative finite integer history");
    const soulHP = p.quoted("gains 15 bonus health"), soulHeal = p.quoted("heal for 6% of his maximum health") / 100, soulRange = p.field("effectRadius", "pickup"), soulSight = p.field("effectRadius", "sight"), soulSpeed = p.field("speed"), dropLife = p.quoted("for 16 seconds"), pickupDelay = p.quoted("after a 1-second delay");
    const qBase = q.formula("Magic Damage"), qExtra = q.formula("Bonus Damage Per Bolt"), qRange = q.field("effectRadius"), qAngle = q.field("angle"), bolts = 5;
    q.quote("five bolts"); q.quote("split evenly among each bolt that hits"); q.quote("will still cast and deal damage if Swain dies during the cast time"); q.quote("Spell shield will block all bolts");
    const qWidth = q.gameQuoted('"mMissileWidth":20.0'), qDummyTime = q.gameQuoted('"mTravelTime":0.20000000298023224');
    const wDamage = w.formula("Magic Damage"), wMinion = w.formula("Minion Damage"), wRadius = w.field("effectRadius"), wRange = w.field("targetRange"), wDelay = w.quoted("explodes after 1.5 seconds"), wSlow = w.quoted("slowing them by 50%") / 100, wSlowTime = w.quoted("for 1.5 seconds"), wReveal = w.quoted("revealed for 6 seconds");
    w.quote("protected by a spell shield do not have a Soul Fragment collected from them but are revealed anyway"); w.quote("will not receive the Soul Fragments"); w.quote("collects nearby Soul Fragments");
    const eDamage = e.formula("Magic Damage"), eRange = e.field("targetRange"), eWidth = e.field("width"), eRadius = e.field("effectRadius"), rootTime = e.quoted("rooting them for 1.5 seconds"), pullDistance = e.quoted("over 290 units"), selfReveal = e.quoted("revealing himself for 5 seconds");
    const outSeries = e.record.fields.speed;
    if (typeof outSeries !== "object" || !outSeries.values[0] || !outSeries.values[1]) throw new Error("Swain: missing exact Nevermove flight tables");
    e.fieldNumbers("speed"); const returnSpeed = seriesAt(outSeries.values[1].series, 0, false); e.textField("cooldownStart"); e.quote("hitbox behaviour itself only uses the timings noted above"); e.quote("recast can be used during the cast time of other spells"); e.quote("root is not applied to, removed or its targets blink or dash"); e.quote("does not keep the target stunned for the rest of the movement");
    e.gameQuote('"name":"ExplosionRadius","values":[205.0');
    const rTick = r.formula("Magic Damage per Tick"), rHeal = r.formula("Heal per Tick"), reducedHeal = r.formula("Reduced Heal per Tick"), rRadius = r.field("effectRadius"), energyMax = r.quoted("generating 50 Demonic Energy"), pulseTime = r.quoted("every 0.5 seconds"), degen = r.quoted("decays by 5 every"), strongerDegen = r.quoted("increased to 7.5 after"), strongAfter = r.quoted("after 5 seconds have elapsed"), regen = r.quoted("generates 10 Demonic Energy"), unlock = r.quoted("After 2 seconds"), maxNovas = r.quoted("up to 100 times");
    r.textField("cooldownStart"); r.quote("targets do not have to be visible"); r.quote("will not automatically cast");
    const novaDamage = nova.formula("Magic Damage"), novaRadius = nova.field("effectRadius"), novaSpeed = nova.field("speed"), novaWidth = nova.field("width"), novaSlow = nova.quoted("slows them by 50%") / 100, novaSlowTime = nova.quoted("decaying over 1.5 seconds"), novaCD = nova.field("staticCooldown");
    const qCD = q.cooldown(), qCost = q.cost(), wCD = w.cooldown(), wCost = w.cost(), eCD = e.cooldown(), eCost = e.cost(), rCD = r.cooldown();
    nova.quote("counts as an ability activation"); nova.quote("block the portion of the nova they intercept"); nova.quote("wherever Swain is at the end of the cast time");
    r.gameQuote('"name":"TimeBetweenTicks","values":[0.5'); nova.gameQuote('"mMissileWidth":60.0');
    const internal = (key: string, name: string, onHit: Effect[] = [], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit, flags: { projectile: false, spellShield: shield, petContactHooks: true }, persistsAfterDeath: true, usable: () => false });
    const qp = internal("Q-impact", q.name), ep = internal("E-impact", e.name, [{ type: "damage", damageType: "magic", amount: eDamage }, { type: "cc", cc: "root", duration: rootTime }, { type: "state", state: "standardSight", duration: rootTime, revealWhileCC: "root" }]);
    const outward = internal("E-out", e.name), returning = internal("E-return", e.name), raven = internal("Soul-raven", p.name), pulse = internal("R-drain", r.name, [{ type: "damage", damageType: "magic", amount: rTick, persistent: true, petDamageCategory: "persistent" }], false), wave = internal("R-wave", nova.name, [{ type: "damage", damageType: "magic", amount: novaDamage }, { type: "cc", cc: "slow", strength: novaSlow, duration: novaSlowTime }]);
    returning.decisive = true; returning.flags!.projectile = true; returning.onHit = ep.onHit;
    wave.flags!.projectile = true;
    const qs: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), costAtCastStart: true, cooldownAtCastStart: true, delivery: { kind: "self" }, onHit: [], flags: { projectile: false, spellShield: true }, budgetExcluded: true, persistsAfterDeath: true, usable: (self, world) => Math.abs(self.x - world.units[1 - self.side]!.x) <= qRange + world.units[1 - self.side]!.spec.base.radius + EPSILON };
    const ws: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), captureGroundAim: "start", delivery: { kind: "circle", range: wRange, radius: wRadius, delay: wDelay }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "slow", strength: wSlow, duration: wSlowTime }], flags: { projectile: false, spellShield: true, petContactHooks: true }, persistsAfterDeath: true };
    const es: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), costAtCastStart: true, cooldownAtCastStart: true, castOrigin: "start", castDirection: "start", delivery: { kind: "self" }, budgetExcluded: true, persistsAfterDeath: true };
    const eligible = (body: Body, self: Unit, tick: number) => champion(body.target) && body.target.statuses.some(s => s.kind === "cc" && s.key === "root" && s.source === self.side && s.ability === ep.key && s.endTick > tick) && body.target.memory[ROOT + self.side] === true;
    const bodies = (world: World, self: Unit): Body[] => [{ target: world.units[1 - self.side]! }, ...world.pets.filter(pet => pet.owner !== self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.fixedDamage && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet }))];
    const valid = (body: Body, self: Unit) => body.target.alive && body.target.hp > 0 && !inStasis(body.target) && !isUntargetable(body.target, self);
    const sync = (body: Body) => { if (body.pet) { body.pet.statuses = body.target.statuses; body.pet.memory = body.target.memory; } };
    const hit = (ctx: HookContext, body: Body, spell: AbilitySpec, effects = spell.onHit ?? [], scale = 1, origin = ctx.self.x) => { if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, spell, effects, "area", scale, origin); else abilityHit(ctx.world, ctx.self, body.target, spell, effects, scale, origin); };
    const pulls: AbilitySpec = { key: "E2", name: "Nevermove (pull)", slot: "other", cooldown: 0, castTime: 0, overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, budgetExcluded: true, usable: (self, world) => bodies(world, self).some(body => valid(body, self) && eligible(body, self, world.tick)) };
    const pull = internal("E-pull", "Nevermove (pull)", [{ type: "damage", damageType: "magic", amount: flat(0) }]);
    const rs: AbilitySpec = { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), costAtCastStart: true, cooldownAtCastStart: true, moveWhileCasting: true, delivery: { kind: "self" }, roles: ["buff"], budgetExcluded: true, usable: self => self.memory[ACTIVE] !== true };
    const r2: AbilitySpec = { key: "R2", name: nova.name, slot: "other", cooldown: novaCD, staticCooldown: true, castTime: nova.castTime(), moveWhileCasting: true, delivery: { kind: "self" }, roles: ["damage"], budgetExcluded: true, usable: (self, world) => self.memory[ACTIVE] === true && world.tick >= Number(self.memory["swain:rStart"] ?? Infinity) + ticks(unlock) && Number(self.memory["swain:novaCasts"] ?? 0) < maxNovas };
    const abilities = [qs, ws, es, rs, r2, pulls, qp, outward, returning, ep, pull, raven, pulse, wave];
    const launchSoul = (ctx: HookContext, x: number) => {
      if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.fallen) return;
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: raven.key, seenTick: ctx.tick, x, perTick: soulSpeed / 30, homing: false, direction: x > ctx.self.x ? -1 : 1, travelLeft: Infinity, projectile: false, connects: false, scale: 1, onHit: [], piercing: true, followOwner: true, perceptionHidden: true });
    };
    const claimNearby = (ctx: HookContext) => {
      const drops = read<Fragment[]>(ctx.memory[DROPS], []), retained: Fragment[] = [];
      for (const drop of drops) if (ctx.tick < drop.until) { if (ctx.tick >= drop.ready && Math.abs(drop.x - ctx.self.x) <= soulRange + EPSILON) launchSoul(ctx, drop.x); else retained.push(drop); }
      ctx.memory[DROPS] = JSON.stringify(retained);
    };
    const grantSoul = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.fallen) return;
      ctx.memory[SOULS] = Number(ctx.memory[SOULS] ?? initial) + 1;
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "stat", stat: "health", amount: flat((Number(ctx.memory[SOULS]) - initial) * soulHP), duration: FOREVER }, { scale: 1, ability: raven });
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "heal", amount: { base: 0, ratios: { maxHP: soulHeal } } }, { scale: 1 });
    };
    const boltCount = (distance: number, radius: number) => {
      let count = 0;
      for (let i = 0; i < bolts; i++) { const angle = ((i / (bolts - 1) - .5) * qAngle) * Math.PI / 180, along = Math.max(0, Math.min(qRange, distance * Math.cos(angle))); if (distance >= -radius - EPSILON && Math.hypot(distance - along * Math.cos(angle), along * Math.sin(angle)) <= radius + qWidth / 2 + EPSILON) count++; }
      return count;
    };
    const qPacket = (count: number): Effect[] => {
      const total: Formula = { base: qBase.base + (count - 1) * qExtra.base, ratios: { AP: (qBase.ratios?.AP ?? 0) + (count - 1) * (qExtra.ratios?.AP ?? 0) } };
      return Array.from({ length: count }, () => ({ type: "damage", damageType: "magic", amount: scaled(total, 1 / count), petDamageCategory: "area" }));
    };
    const explodeE = (ctx: HookContext, m: Missile, scale: number) => {
      if (m.ended) return;
      m.ended = true;
      const snapshot = bodies(ctx.world, ctx.self).filter(body => valid(body, ctx.self) && Math.abs(body.target.x - m.x) <= eRadius + body.target.spec.base.radius + EPSILON);
      for (const body of snapshot) hit(ctx, body, ep, ep.onHit, scale, m.x);
    };
    const releaseNova = (ctx: HookContext) => {
      const serial = ctx.world.nextId++, origin = ctx.self.x;
      ctx.memory["swain:novaCasts"] = Number(ctx.memory["swain:novaCasts"] ?? 0) + 1;
      for (const direction of [-1, 1] as const) {
        const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: wave.key, seenTick: ctx.tick, x: origin, perTick: novaSpeed / 30, homing: false, direction, travelLeft: novaRadius, projectile: true, connects: true, scale: 1, onHit: wave.onHit!, piercing: true, collisionPet: true, radius: novaWidth / 2 };
        ctx.memory[NOVA + m.id] = serial; ctx.world.missiles.push(m);
      }
    };
    const updateSlows = (ctx: HookContext) => { for (const body of bodies(ctx.world, ctx.self)) { for (const s of body.target.statuses) if (s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.ability === wave.key) s.value = novaSlow * Math.max(0, 1 - (ctx.tick - s.startTick) / ticks(novaSlowTime)); sync(body); } };
    const deactivate = (ctx: HookContext, auto: boolean) => {
      ctx.memory[ACTIVE] = false; ctx.memory[ENERGY] = 0;
      ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== "buff:swain:ghost");
      if (auto && ctx.self.alive && ctx.self.hp > 0 && Number(ctx.memory["swain:novaCasts"] ?? 0) < maxNovas && ctx.tick >= (ctx.self.cooldownReady.R2 ?? 0)) { notifyEnemyCast(ctx.world, ctx.self, r2); ctx.self.cooldownReady.R2 = ctx.tick + ticks(novaCD); releaseNova(ctx); }
    };
    const behavior: Behavior = view => {
      const { self, enemy, world, mode } = view;
      const normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [ws] } } });
      if (mode === "idle") return undefined;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (canCast(world, self, pulls)) return { kind: "cast", ability: pulls.key };
      if (mode !== "hold" && mode !== "trade" && Math.abs(enemy.x - self.x) <= rRadius + enemy.spec.base.radius && canCast(world, self, rs)) return { kind: "cast", ability: "R" };
      if (Math.abs(enemy.x - self.x) <= novaRadius + enemy.spec.base.radius && canCast(world, self, r2)) return { kind: "cast", ability: "R2" };
      if (canCast(world, self, es) && Math.abs(enemy.x - self.x) <= eRange + enemy.spec.base.radius) return { kind: "cast", ability: "E" };
      if (canCast(world, self, qs)) return { kind: "cast", ability: "Q" };
      if (normal?.kind === "cast" || mode === "flee") return normal;
      if (canStartAttack(world, self)) return { kind: "attack" };
      return normal;
    };
    kit.assume(`Soul history starts at the explicit${initial}, adding15actualbonusHP per fragment. W/E2 launch a1200-speed noninterceptable raven from the actual victim; health/healing are awarded only on arrival at the living caster, after the15HP maximum/current-health increase. Healing is6%of that newmaximum and obeys healingdenial/GrievousWounds. Actual hostile champion deaths (including champion-class summons) leave independent16secondfragments with1secondpickupdelay and1100centerpickupdistance; nearby W contacts trigger the same legalpickup rules. There is no fabricatedfarm, allykill or upfrontcombatheal. Raven sight radius${soulSight}does not invent fogbenefits.`);
    kit.assume(`Q uses five equally spaced rays across the32degree fan, primary725range and completion-position origin/declaration-facing. Actual target circles and the clientdummy20width determine how many rays intersect. Each recipient gets180+45%AP plus45+11.25%AP per extra ray. The primary's rendered note says split total evenly among connected bolts, but its exact raw HTML comment disputes this: equal packet split is an explicit uncertain interpretation, not server-verified. Contacts share one completion snapshot rather than guessed inter-bolt chronology. The client's${qDummyTime}second dummy flight is retained but does not override the primary's end-of-cast nonprojectile contacts. Q's released finite declaration marker survives death, spends mana/CD once at declaration and evaluates actual finalorigin/recipients when the cast delay ends. One shield blocks the whole per-recipient packet.`);
    kit.assume("W lands after its0.25secondcast plus1.5seconddelay at the actualselected7500range location,325center-to-edge radius. It deals250+60%AP,125+30%AP only to actualminion-class bodies (monsters/unknownclasses are not silentlyminions), and50%slow for1.5seconds. Champion-class contacts gain6secondsstandardsight even through spellshield/parry; only acceptedunshielded contacts grant Souls, including realclones, while livingSwain. Sight does not reveal invisibility. The initial2secondareasight has no invented fog-of-war payoff.");
    kit.assume("Nevermove launches its harmless outward wave at declaration from capturedorigin/facing, traveling850 with the exactserver stepped1125→1800 speedtable. Its2000→2800 returningtable is honored despite the primary's contradictory acceleration-sign prose. It follows the actualmovingowner and detonates on the first realenemybody (90radius), with no outgoing damage. The primary100detonationradius wins over binary205; each realnearbyrecipient receives250+70%AP,1.5secondtenacity-affectedroot andstandardSight conditionalonthatroot. Returnedwave sidestep uses normalfinitebranching, realpets remain actualcollisionbodies; projectilewalls/interception terminate the realleg.");
    kit.assume("E2 is free, global onlyforactualchampion-classrecipients stillrootedbythisE; removal or anyactualdash/blink permanentlyrevokes thatroot's entitlement. Recast can overlay anothercast and doesnot resetEcooldown. Independentspellshield/parry guards apply. Its290unitpull rebounds excessdistance on the starting side if it would passSwain. Pulltravel time is unquantified, so guardedimmediate terrain-clipped displacement models interruption atstart without inventing anairbornehold. Displacementimmunity can deny motion without denying anotherwise acceptedSoul contact; ordinaryCC/untargetability and actualpetCCimmunities are respected. Source root remains within itsoriginalexpiry.");
    kit.assume("DemonicAscension spends100mana/starts120secondhastedcooldown atdeclaration; activation occursafter0.5secondmobilecast. First drain/energytick is0.5secondsafteractivation (explicit unquantified phase).50DemonicEnergy loses5pertick, or7.5from5seconds, and gains10oncepertick if at leastone actualchampion is successfullydrained, capped50. Each eligible650center-to-edgerecipient takes17.5+2%AP persistentmagic and heals22.5+2.5%AP+.75%bonusHP, with90%lesshealing for actualminions/monsters. Spellshields do not block drain; invulnerability can preventdamage without denying separatehealing. Actualchampiontakedown refillsenergy. Dead/untargetable/stasisbodies cannot sustain it, nofictionalallies orvictims exist. Death/fallenstate cancelsactiveaura andneverautoflares; liveexpiration mayautoflare.");
    kit.assume("Demonflare unlocksafter2seconds, has an8secondstaticcooldown and atmost100casts peractivation. It releasesafter0.25secondmobilecast from completionposition as two opposed675range/60width axialmissiles at3000speed, onceperactualrecipient percast. Independent wall/interception portions canstopone ray. Acceptedcontacts deal350+40%AP and50%slow decayinglinearlyover1.5seconds; CCexpiry/tenacity remainactual. Anexpirationautoflare counts as a realactivation without inventing acommand/castlock; a manualcast alreadyinprogress canstillcomplete, retaining the pinnedknown double-flareedge. Releasednovas persistafterdeath, while remainingaura doesnot.");
    kit.assume("Budget prices Q's actual axialray count at ordinary attackreach, E onceperhastedcooldown and one Rdrain per120secondactivation with a five-second first-engagement envelope, plus oneDemonflare. Source resource/castclocks and a10secondmanaenvelope scale basicspellrates; noimaginedmulti-targethealing, Souls orfarm increase price. Rutility is amortized over cooldown rather than treating everyduel as permanentfreehealing. Runtime AI preserveshold/tradeultimate, prioritizeslegalpulls, startsRnearrealfoes, and obeys completedtrade retreat.");
    return { abilities, behavior, start: [innateStat("health", initial * soulHP)], budget: {
      damage(self, target) { const haste = 1 + derive(self).abilityHaste / 100, qr = 1 / (qCD / haste + qs.castTime), er = 1 / (eCD / haste + es.castTime), wr = 1 / (wCD / haste + ws.castTime), demand = qr * qCost + er * eCost + wr * wCost, envelope = (derive(self).maxResource + self.spec.base.resourceRegen * 10 / 5) / 10, share = Math.min(1, envelope / Math.max(EPSILON, demand)), count = boltCount(self.spec.attack.range + target.spec.base.radius, target.spec.base.radius), qDamage = count > 0 ? evaluate(qBase, self, target) + (count - 1) * evaluate(qExtra, self, target) : 0; return { magic: share * (qDamage * qr + evaluate(eDamage, self, target) * er + evaluate(wDamage, self, target) * wr) + (evaluate(rTick, self, target) * strongAfter / pulseTime + evaluate(novaDamage, self, target)) / (rCD / haste + rs.castTime) }; },
      healing(self, target) { return evaluate(rHeal, self, target) * strongAfter / pulseTime / (rCD / (1 + derive(self).abilityHaste / 100) + rs.castTime); },
    }, hooks: {
      onStart(ctx) { ctx.memory[SOULS] = initial; ctx.memory[ACTIVE] = false; ctx.memory[DROPS] = "[]"; },
      onCastStart(ctx) {
        if (ctx.ability.key === "Q") { const id = ctx.world.nextId++; ctx.memory[`swain:qDirection:${id}`] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1); ctx.world.zones.push({ id, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.self.x, radius: 0, startTick: ctx.tick, endTick: ctx.tick + ticks(qs.castTime), ability: qp.key, onHit: [], connects: false, noPets: true, pendingAfterDeath: true }); }
        if (ctx.ability.key === "E") { const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: outward.key, seenTick: ctx.tick, x: ctx.self.x, perTick: 0, homing: false, direction: (directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1)) as 1 | -1, travelLeft: eRange, projectile: true, connects: false, scale: 1, onHit: [], piercing: true, interceptable: true }; ctx.memory[`swain:eStart:${m.id}`] = ctx.tick; ctx.world.missiles.push(m); }
      },
      onCast(ctx) {
        if (ctx.ability.key === "E2") { for (const body of bodies(ctx.world, ctx.self)) if (valid(body, ctx.self) && eligible(body, ctx.self, ctx.tick)) hit(ctx, body, pull); applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "standardSight", duration: selfReveal }, { scale: 1 }); }
        if (ctx.ability.key === "R" && ctx.self.alive && ctx.self.hp > 0 && !ctx.self.fallen) { ctx.memory[ACTIVE] = true; ctx.memory[ENERGY] = energyMax; ctx.memory["swain:rStart"] = ctx.tick; ctx.memory["swain:rNext"] = ctx.tick + ticks(pulseTime); ctx.memory["swain:novaCasts"] = 0; ctx.self.statuses.push({ kind: "state", key: "ghosted", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: 0, memoKey: "buff:swain:ghost" }); }
        if (ctx.ability.key === "R2" && ctx.self.alive && ctx.self.hp > 0 && !ctx.self.fallen) releaseNova(ctx);
      },
      onZoneLand(ctx) { if (ctx.zone.ability !== qp.key) return; const dir = Number(ctx.memory[`swain:qDirection:${ctx.zone.id}`]), origin = ctx.self.x, snapshot = bodies(ctx.world, ctx.self).filter(body => valid(body, ctx.self)).map(body => ({ body, count: boltCount((body.target.x - origin) * dir, body.target.spec.base.radius) })); for (const { body, count } of snapshot) if (count > 0) { const reach = Math.abs(body.target.x - origin) * Math.sin(qAngle * Math.PI / 360) + qWidth / 2, decision = body.pet ? { connects: true, scale: 1 } : resolveSkillshot(ctx.world, ctx.self, body.target, qs, ctx.zone.seenTick, 0, reach); if (decision.connects) hit(ctx, body, qp, qPacket(count), decision.scale, origin); } },
      onAbilityContact(ctx) {
        const key = ctx.ability.key;
        if (key === "W") { if (champion(ctx.enemy)) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "standardSight", duration: wReveal }, { scale: 1 }); return [{ type: "damage", damageType: "magic", amount: ctx.enemy.spec.targetClass === "minion" ? wMinion : wDamage }, { type: "cc", cc: "slow", strength: wSlow, duration: wSlowTime }]; }
        if (key === wave.key) { const serial = Number(ctx.memory["swain:currentNova"] ?? 0); if (ctx.enemy.memory[NOVA + ctx.self.side] === serial) return []; ctx.enemy.memory[NOVA + ctx.self.side] = serial; }
      },
      beforeAbilityHit(ctx) { if (ctx.ability.key !== pull.key) return; const body: Body = { target: ctx.enemy, ...(ctx.enemy.petId === undefined ? {} : { pet: ctx.world.pets.find(pet => pet.id === ctx.enemy.petId)! }) }; body.target.memory[ROOT + ctx.self.side] = false; const distance = Math.abs(ctx.enemy.x - ctx.self.x), dir = directionTo(ctx.self, ctx.enemy); if (!body.pet?.spec.ccImmune?.includes("airborne") && immediateDisplace(ctx.world, ctx.self, body.target, dir * (Math.abs(distance - pullDistance) - distance), pull.key) && body.pet) { body.pet.x = body.target.x; delete body.pet.windup; } sync(body); },
      onAbilityHit(ctx) {
        const key = ctx.ability.key;
        if (key === "W" && champion(ctx.enemy) && ctx.self.alive && ctx.self.hp > 0 && !ctx.self.fallen) { launchSoul(ctx, ctx.enemy.x); claimNearby(ctx); }
        if (key === ep.key && champion(ctx.enemy)) ctx.enemy.memory[ROOT + ctx.self.side] = ctx.enemy.statuses.some(s => s.kind === "cc" && s.key === "root" && s.source === ctx.self.side && s.ability === ep.key && s.endTick > ctx.tick);
        if (key === pull.key && champion(ctx.enemy)) launchSoul(ctx, ctx.enemy.x);
        if (key === pulse.key) { applyEffect(ctx.world, ctx.self, ctx.self, { type: "heal", amount: ctx.enemy.spec.targetClass === "minion" || ctx.enemy.spec.targetClass === "monster" ? reducedHeal : rHeal }, { scale: 1 }); if (champion(ctx.enemy)) ctx.memory["swain:drainedChampion"] = true; }
      },
      onActualMovement(ctx) { if (ctx.target.side !== ctx.self.side && (ctx.movement.kind === "dash" || ctx.movement.kind === "blink")) { ctx.target.memory[ROOT + ctx.self.side] = false; if (ctx.targetPet) ctx.targetPet.memory[ROOT + ctx.self.side] = false; } },
      onMissileTick(ctx) { const m = ctx.missile; if (m.source === raven.key && (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.fallen)) { m.ended = true; return; } if (m.source === outward.key || m.source === returning.key) { const started = Number(ctx.memory[`swain:eStart:${m.id}`] ?? m.seenTick); m.perTick = ctx.tick === started ? 0 : seriesAt((m.source === outward.key ? outSeries.values[0] : outSeries.values[1])!.series, (ctx.tick - started) / 30, false) / 30; } if (m.source === wave.key) ctx.memory["swain:currentNova"] = Number(ctx.memory[NOVA + m.id]); },
      onMissileContact(ctx) { if (ctx.missile.source === returning.key) explodeE(ctx, ctx.missile, ctx.targetPet ? 1 : ctx.missile.scale); },
      onProjectileIntercept(ctx) { if (ctx.missile.source === returning.key) { explodeE(ctx, ctx.missile, ctx.missile.scale); return true; } return false; },
      onMissileEnd(ctx) {
        const m = ctx.missile;
        if (m.source === raven.key && ctx.reason === "owner") grantSoul(ctx);
        if (m.source !== outward.key || ctx.reason !== "range" || m.intercepted) return;
        const decision = resolveSkillshot(ctx.world, ctx.self, ctx.enemy, returning, m.seenTick, Math.abs(m.x - ctx.enemy.x) / returnSpeed, eWidth / 2), next: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: returning.key, seenTick: m.seenTick, x: m.x, perTick: returnSpeed / 30, homing: false, direction: ctx.self.x > m.x ? 1 : -1, travelLeft: Infinity, projectile: true, connects: decision.connects, scale: decision.scale, onHit: [], piercing: true, collisionPet: true, radius: eWidth / 2, followOwner: true, interceptable: true };
        ctx.memory[`swain:eStart:${next.id}`] = ctx.tick; ctx.world.missiles.push(next); if (decision.split !== undefined) ctx.queueSplit({ missile: next.id, chance: decision.split });
      },
      onDeathObserved(ctx) { const target = ctx.targetPet ? petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick) : ctx.victim as Unit; if (!champion(target)) return; const drops = read<Fragment[]>(ctx.memory[DROPS], []); drops.push({ x: target.x, ready: ctx.tick + ticks(pickupDelay), until: ctx.tick + ticks(dropLife) }); ctx.memory[DROPS] = JSON.stringify(drops); if (ctx.memory[ACTIVE] === true && ctx.source.side === ctx.self.side) ctx.memory[ENERGY] = energyMax; },
      onTick(ctx) {
        updateSlows(ctx); claimNearby(ctx);
        if (ctx.memory[ACTIVE] !== true) return;
        if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.fallen) { deactivate(ctx, false); return; }
        if (ctx.tick < Number(ctx.memory["swain:rNext"])) return;
        ctx.memory["swain:rNext"] = Number(ctx.memory["swain:rNext"]) + ticks(pulseTime); ctx.memory["swain:drainedChampion"] = false;
        for (const body of bodies(ctx.world, ctx.self)) if (valid(body, ctx.self) && Math.abs(body.target.x - ctx.self.x) <= rRadius + body.target.spec.base.radius + EPSILON) hit(ctx, body, pulse);
        const loss = ctx.tick - Number(ctx.memory["swain:rStart"]) >= ticks(strongAfter) ? strongerDegen : degen;
        ctx.memory[ENERGY] = Math.max(0, Math.min(energyMax, Number(ctx.memory[ENERGY]) - loss + (ctx.memory["swain:drainedChampion"] ? regen : 0)));
        if (Number(ctx.memory[ENERGY]) <= 0) deactivate(ctx, true);
      },
      onTickWhileDead(ctx) { updateSlows(ctx); if (ctx.memory[ACTIVE] === true) deactivate(ctx, false); },
    } };
  },
};
export default swain;
