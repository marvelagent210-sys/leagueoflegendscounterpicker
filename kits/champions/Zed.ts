/** Actual W/R shadows, per-source spell contacts and Death Mark's accepted damage ledger. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { flat, scaled, ticks } from "./util";

const SHADOW = "zed:shadow", MARK = "zed:deathMark", ACTIVE = "zed:r:active", PASSIVE = "zed:contempt";
const zed: KitModule = {
  champion: "Zed",
  build(kit) {
    const i = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R"), pet = kit.pet("Shadow");
    const threshold = i.quoted("below 50% maximum health") / 100, passiveShare = i.levelValue("basic attacks on-hit against targets below") / 100, passiveCD = i.field("targetCooldown"), monsterMod = i.quoted("deals 75% damage") / 100, monsterCap = i.quoted("capped at 175");
    i.quote("not consumed when dodged or missed, but it is consumed when blocked"); i.quote("health upon landing the attack"); i.quote("will not trigger against structures");
    const qDamage = q.formula("Physical Damage"), qReduced = q.formula("Reduced Damage"), qRange = q.field("targetRange"), qWidth = q.field("width"), qSpeed = q.field("speed"), qCast = q.castTime(), qCD = q.cooldown();
    q.quote("Shurikens blocked by spell shield still count as being hit for the reduced pass-through damage"); q.quote("wherever the caster is at the end of the cast time"); q.quote("not lock out Living Shadow recast during its cast time");
    const wRange = w.fieldNumbers("targetRange"), wMin = wRange[0]!, wMax = wRange[1]!, wSwapRange = w.field("effectRadius", "Recast range"), wSpeed = w.field("speed"), wTime = w.quoted("remains there for 5.25 seconds"), energy = w.number("Energy Restored"), wCD = w.cooldown();
    w.textField("cooldownStart"); w.quote("This may only occur once per cast ability"); w.quote("energy refund is not granted if the mimicked ability is blocked by a spell shield"); w.quote("will cast that ability once it has been placed"); w.quote("Shadows will not disappear when Zed dies");
    w.quote("previous Shadow will instantly disappear"); w.quote("the mimicked cast will be cancelled");
    const eDamage = e.formula("Physical Damage"), eRadius = e.field("effectRadius", "from Zed"), shadowRadius = e.field("effectRadius", "from Shadows"), eSlow = e.fraction("Slow"), eEnhanced = e.fraction("Enhanced Slow"), slowTime = e.quoted("slowed for 1.5 seconds"), refundSeconds = e.quoted("reduced by 3 seconds"), eCD = e.cooldown();
    e.quote("a target can only be damaged by one slash per cast"); e.quote("prioritizing blocking the slash from Zed's Shadow"); e.quote("does not interrupt attack, movement, or cast commands");
    const rRange = r.field("targetRange"), rDelay = r.quoted("after a 0.6-second delay"), rTravel = r.quoted("over 0.35 seconds"), rBeyond = r.quoted("125 units beyond"), markTime = r.quoted("Marked for Death for 3 seconds"), rTime = r.quoted("casting position for 9 seconds"), rGate = r.quoted("after 0.5 seconds of his reappearance"), rLast = r.quoted("last 1.25 seconds"), rBuff = r.quoted("buff for 7.5 seconds"), rLingering = r.quoted("lingers for 0.25 seconds"), rCancelRange = r.quoted("1950 or more units away"), rCancelCD = r.quoted("0.5-second cooldown"), rTrack = r.quoted("2200 or more units away"), rCD = r.cooldown();
    const rBase = r.baseOf("Physical Damage") / 100, rStored = r.quoted("100% AD (+ 25 / 40 / 55% of damage stored)", 3) / 100;
    r.textField("cooldownStart"); r.quote("Spell shield will only block the mark's application"); r.quote("nor block the detonation from a mark that is already applied"); r.quote("will not be applied to the target if they are untargetable"); r.quote("The mark will still be applied regardless"); r.quote("does not store {{tip|true damage}}");
    pet.quote("Minion (untargetable)"); pet.quote("towards the same targeted location"); pet.quote("Only 1 Shadow each"); pet.quote("may only swap places with a Shadow once"); pet.quote("Do not count as ability activations"); pet.quote("Are considered separate casts when they hit the same target"); pet.quoted("700");
    // Whole arrays and missile objects are retained, including inactive conflicting metadata.
    i.gameQuote("mSpell.DataValues.PerUnitCD.values: [10.0,10.0,10.0,10.0,10.0,10.0,10.0]");
    q.gameQuote('"mMissileWidth":50.0'); q.gameQuote('"mSpeed":1700.0'); q.gameQuote("mSpell.castRange: [925.0,925.0,925.0,925.0,925.0,925.0,925.0]");
    w.gameQuote("mSpell.DataValues.ShadowDuration.values: [5.25,5.25,5.25,5.25,5.25,5.25,5.25]"); w.gameQuote("mSpell.DataValues.EnergyRestoreDoubleHit.values: [25.0,30.0,35.0,40.0,45.0,50.0,55.0]"); w.gameQuote("mSpell.castRange: [700.0,700.0,700.0,700.0,700.0,700.0,700.0]"); w.gameQuote("mSpell.missileSpeed: 1600.0");
    e.gameQuote("mSpell.DataValues.ZedRadius.values: [315.0,315.0,315.0,315.0,315.0,315.0,315.0]"); e.gameQuote("mSpell.DataValues.ShadowRadius.values: [290.0,290.0,290.0,290.0,290.0,290.0,290.0]");
    r.gameQuote("mSpell.DataValues.RGhostedDuration.values: [4.0,4.0,4.0,4.0,4.0,4.0,4.0]"); r.gameQuote("mSpell.DataValues.RDamageAmp.values: [0.10000000149011612,0.25,0.4000000059604645,0.550000011920929,0.699999988079071,0.8500000238418579,1.0]");

    const shadows = (world: World, self: Unit) => world.pets.filter((body) => body.owner === self.side && body.spec.kind === SHADOW && body.endTick > world.tick);
    const shadowFor = (world: World, self: Unit, source: string) => shadows(world, self).find((body) => body.memory.source === source);
    const placed = (body: Pet, tick: number) => tick >= Number(body.memory.arrive);
    const ordinary = (self: Unit) => !self.memory[ACTIVE];
    const swapReady = (self: Unit, world: World, source: string) => {
      const body = shadowFor(world, self, source);
      return Boolean(body && !body.memory.swapped && !body.memory.swapQueued && !self.memory[ACTIVE] && (source === "W" ? Math.abs(body.x - self.x) <= wSwapRange && world.tick < Number(body.memory.swapUntil) : world.tick >= Number(body.memory.ready) && world.tick < Number(body.memory.swapUntil)));
    };
    const internal = (key: string, name: string, onHit: Effect[] = [], spellShield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit, flags: { spellShield, petContactHooks: true }, usable: () => false, budgetExcluded: true, persistsAfterDeath: true });
    const bolt = internal("Qbolt", q.name, [{ type: "damage", damageType: "physical", amount: qDamage }]); bolt.delivery = { kind: "line", range: qRange, width: qWidth, speed: qSpeed }; bolt.flags!.projectile = true;
    const slash = internal("Eslash", e.name), slow = internal("Eslow", `${e.name} (slow)`, [], false), mark = internal("Rmark", `${r.name} (mark)`, [{ type: "mark", key: MARK, duration: markTime, value: 0 }]), detonation = internal("Rdetonate", `${r.name} (detonation)`, [], false); detonation.flags!.hitsUntargetable = true;
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, delivery: { kind: "self" }, roles: ["damage"], usable: ordinary, budgetExcluded: true, estimate: (self, target) => evaluate(qDamage, self, target) },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), cooldownAtCastStart: true, delivery: { kind: "self" }, roles: ["engage", "escape"], usable: (self, world) => ordinary(self) && !shadows(world, self).some((body) => body.memory.source === "W" && !body.memory.swapped), budgetExcluded: true },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, roles: ["damage", "cc"], usable: (self) => ordinary(self) && self.action?.kind !== "cast", budgetExcluded: true, estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, castTime: r.castTime(), cooldownAtCastStart: true, delivery: { kind: "target", range: rRange }, flags: { grounded: true, spellShield: false }, roles: ["damage", "engage"], usable: ordinary, budgetExcluded: true, estimate: (self) => derive(self).ad * rBase, estimateDelay: () => rDelay + rTravel + markTime },
      { key: "W2", name: `${w.name} (swap)`, slot: "other", countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, overlay: true, flags: { grounded: true }, usable: (self, world) => swapReady(self, world, "W"), budgetExcluded: true },
      { key: "R2", name: `${r.name} (swap)`, slot: "other", countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { grounded: true }, usable: (self, world) => swapReady(self, world, "R"), budgetExcluded: true },
      bolt, slash, slow, mark, detonation, internal("I", i.name, [], false),
    ];
    const get = (key: string) => abilities.find((ability) => ability.key === key)!;
    const syncTarget = (ctx: HookContext) => { const body = ctx.world.pets.find((entry) => entry.id === ctx.enemy.petId); if (body) { body.statuses = ctx.enemy.statuses; body.memory = ctx.enemy.memory; } };
    const targetId = (target: Unit) => target.petId === undefined ? `champion:${target.side}` : `pet:${target.petId}`;
    const contact = (ctx: HookContext, group: number, source: string, scale: number) => {
      const key = `zed:contact:${group}:${targetId(ctx.enemy)}`, previous = String(ctx.memory[key] ?? "");
      if (!previous.split("|").includes(source)) {
        ctx.memory[key] = previous ? `${previous}|${source}` : source;
        if (previous && !ctx.memory[`zed:refund:${group}`]) { ctx.memory[`zed:refund:${group}`] = true; applyEffect(ctx.world, ctx.self, ctx.self, { type: "resource", amount: flat(energy * Math.min(1, scale)) }, { scale: 1 }); }
      }
    };
    const spawnShadow = (ctx: HookContext, source: "W" | "R", x: number, aim?: Aim) => {
      ctx.world.pets = ctx.world.pets.filter((body) => !(body.owner === ctx.self.side && body.spec.kind === SHADOW && body.memory.source === source));
      const duration = source === "W" ? wTime : rTime;
      const body = spawnPet(ctx.world, ctx.self, { kind: SHADOW, name: pet.name, targetClass: "minion", untargetable: true, persistsAfterOwnerDeath: true, hp: 1, armor: 0, mr: 0, radius: 0, moveSpeed: 0, duration }, x);
      body.memory.source = source; body.memory.swapped = false; body.memory.arrive = ctx.tick;
      body.memory.swapUntil = ctx.tick + ticks(source === "W" ? wTime : Math.min(rBuff + rLingering, rTime - rLast));
      body.memory.ready = source === "R" ? Infinity : ctx.tick;
      if (source === "W") {
        const dir = directionTo(ctx.self, ctx.enemy) * (aim?.direction ?? 1), distance = Math.max(wMin, Math.min(wMax, aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
        body.memory.destination = x + dir * distance; body.memory.arrive = ctx.tick + ticks(distance / wSpeed);
        body.endTick = Number(body.memory.arrive) + ticks(wTime);
      }
      return body;
    };
    const launch = (ctx: HookContext, x: number, aimX: number, group: number, source: string, seenTick: number) => {
      const direction = (Math.sign(aimX - x) || directionTo(ctx.self, ctx.enemy)) as 1 | -1, id = ctx.world.nextId++;
      const chance = skillshotChance(ctx.world, ctx.enemy, seenTick, Math.max(0, Math.abs(ctx.enemy.x - x) - ctx.enemy.spec.base.radius - qWidth / 2) / qSpeed, qWidth / 2);
      ctx.memory[`zed:q:${id}:group`] = group; ctx.memory[`zed:q:${id}:source`] = source; ctx.memory[`zed:q:${id}:passed`] = false;
      ctx.world.missiles.push({ id, owner: ctx.self.side, source: "Qbolt", seenTick, x, perTick: qSpeed / 30, direction, travelLeft: qRange, radius: qWidth / 2, homing: false, piercing: true, collisionPet: true, projectile: true, connects: chance > 0, scale: chance >= .98 ? 1 : chance, onHit: bolt.onHit! });
    };
    const swap = (ctx: HookContext, body: Pet) => {
      const from = ctx.self.x; ctx.self.x = body.x; body.x = from; body.memory.swapped = true; delete body.memory.swapQueued;
    };
    const passive = (ctx: HookContext & { blocked: boolean; scale: number }) => {
      const kind = ctx.enemy.spec.targetClass ?? (ctx.enemy.petId === undefined ? "champion" : "other"), lock = ctx.enemy.statuses.some((status) => status.key === PASSIVE && status.source === ctx.self.side && status.endTick > ctx.tick);
      if (!ctx.enemy.alive || ctx.enemy.hp >= derive(ctx.enemy).maxHp * threshold || (kind === "champion" && lock) || ctx.world.pets.find((body) => body.id === ctx.enemy.petId)?.spec.hitPoints) return;
      if (kind === "champion") { ctx.enemy.statuses.push({ kind: "mark", key: PASSIVE, source: ctx.self.side, value: 1, startTick: ctx.tick, endTick: ctx.tick + ticks(passiveCD) }); syncTarget(ctx); }
      if (!ctx.blocked) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: flat(Math.min(kind === "monster" ? monsterCap : Infinity, derive(ctx.enemy).maxHp * passiveShare * (kind === "monster" ? monsterMod : 1))), noLifeSteal: true, label: i.name, petDamageCategory: "proc" }, { ability: get("I"), scale: ctx.scale });
    };
    const slashAt = (ctx: HookContext, sources: Array<{ source: string; x: number; radius: number }>, group: number) => {
      const targets = [ctx.enemy, ...ctx.world.pets.filter((body) => body.owner !== ctx.self.side && !body.spec.untargetable && !body.spec.hitPoints).map((body) => petFormulaTarget(body, ctx.self, ctx.tick))];
      for (const target of targets) {
        const hits = sources.filter((source) => Math.abs(source.x - target.x) <= source.radius + target.spec.base.radius + EPSILON).sort((a, b) => Number(a.source === "self") - Number(b.source === "self"));
        if (!hits.length) continue;
        const acceptedSources = new Set(String(ctx.memory[`zed:contact:${group}:${targetId(target)}`] ?? "").split("|").filter(Boolean));
        for (const hit of hits) {
          ctx.memory["zed:e:group"] = group; ctx.memory["zed:e:source"] = hit.source; ctx.memory["zed:e:accepted"] = false;
          const damageAttempt = `zed:e:damage:${group}:${targetId(target)}`;
          const effects: Effect[] = [{ type: "damage", damageType: "physical", amount: ctx.memory[damageAttempt] ? flat(0) : eDamage }];
          ctx.memory[damageAttempt] = true;
          const actual = ctx.world.pets.find((body) => body.id === target.petId);
          if (actual) abilityHitPet(ctx.world, ctx.self, actual, slash, effects, "area"); else abilityHit(ctx.world, ctx.self, target, slash, effects);
          if (ctx.memory["zed:e:accepted"]) acceptedSources.add(hit.source);
        }
        if ([...acceptedSources].some((source) => source !== "self")) {
          const effects: Effect[] = [{ type: "cc", cc: "slow", duration: slowTime, strength: acceptedSources.size >= 2 ? eEnhanced : eSlow }], actual = ctx.world.pets.find((body) => body.id === target.petId);
          if (actual) abilityHitPet(ctx.world, ctx.self, actual, slow, effects, "area"); else abilityHit(ctx.world, ctx.self, target, slow, effects);
        }
      }
    };
    const finishR = (ctx: HookContext) => {
      if (!ctx.memory[ACTIVE]) return;
      delete ctx.memory[ACTIVE]; ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== ACTIVE);
      const body = shadowFor(ctx.world, ctx.self, "R"); if (body) body.memory.ready = ctx.tick + ticks(rGate);
      if (!ctx.self.alive || ctx.self.hp <= 0 || !ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self) || inStasis(ctx.enemy)) return;
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "ghosted", duration: markTime }, { scale: 1, ability: get("R") });
      abilityHit(ctx.world, ctx.self, ctx.enemy, mark, mark.onHit!);
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      // Let the common trade clock complete before any optional offensive action.
      const normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: self.spec.abilities.filter((a) => !["Q", "W", "E", "R", "W2", "R2"].includes(a.key)) } } });
      const retreat = mode === "flee" || (mode === "trade" && self.memory.tradeDone);
      if (retreat) {
        for (const key of ["W2", "R2"]) { const body = shadowFor(world, self, key[0]!); if (body && canCast(world, self, get(key)) && Math.abs(body.x - enemy.x) > Math.abs(self.x - enemy.x)) return { kind: "cast", ability: key }; }
        if (canCast(world, self, get("W"))) return { kind: "cast", ability: "W", aim: { direction: -1, distance: wMax } };
        return normal ?? { kind: "move", direction: -1 };
      }
      if (self.memory[ACTIVE] || self.action) return normal;
      const gap = Math.abs(self.x - enemy.x), visible = canSee(enemy, self);
      if (mode !== "hold" && mode !== "trade" && canTarget(enemy, self) && gap <= rRange && canCast(world, self, get("R"))) return { kind: "cast", ability: "R" };
      if (visible && gap <= wMax + shadowRadius + enemy.spec.base.radius && canCast(world, self, get("W"))) return { kind: "cast", ability: "W", aim: { direction: 1, distance: Math.min(wMax, gap) } };
      if ((gap <= eRadius + enemy.spec.base.radius || shadows(world, self).some((body) => placed(body, world.tick) && Math.abs(body.x - enemy.x) <= shadowRadius + enemy.spec.base.radius)) && canCast(world, self, get("E"))) return { kind: "cast", ability: "E" };
      if (visible && gap <= qRange + enemy.spec.base.radius && canCast(world, self, get("Q"))) return { kind: "cast", ability: "Q" };
      if (mode === "fight") { const body = shadowFor(world, self, "W"); if (body && placed(body, world.tick) && canCast(world, self, get("W2")) && Math.abs(body.x - enemy.x) < gap - self.spec.attack.range) return { kind: "cast", ability: "W2" }; }
      return normal;
    };
    kit.assume("Shadows are actual untargetable Minion-class spell sources, never clones or champions. W and R own independent replacement identities, positions, lifetimes and one-use swaps. Their source supplies no HP, armor or radius because they cannot be contacted; structural 1-HP/zero-radius placeholders have no combat effect. W uses the primary's estimated 325 minimum, 650 maximum and 2500 speed over binary generic 700/1600 metadata. The W swap buff begins at cast while its 5.25-second stationary lifetime begins at placement; precise brief buff delay is unpublished. Published post-owner-death shadow persistence is explicit.");
    kit.assume("Each Q source aims at the same declared world location and fires a finite piercing 925-range, 100-width, 1700-speed projectile. Each missile separately deals full damage to its first actual enemy body, then the reduced formula to later bodies, including after a spell-shielded first contact. Shadow Q cast completion waits for placement and original Q cast completion; expiration cancels unreleased copies. W swapping during Q releases the original body bolt immediately and transfers the pending shadow bolt to the new caster position; R swapping waits for the cast. Projectile walls destroy each flight separately and released flights persist after death. Lateral evasion uses a per-source expected contact share without probabilistic branching; spatially hit pets take full packets independently.");
    kit.assume("Living Shadow refunds energy only after two distinct accepted sources hit the same actual target for the same Q/E cast, at most once per cast across all targets. Spell shield, parry, stasis and untargetability deny that source's contact; scalar Q refunds are weighted by the final source's contact share. E slashes are ordered shadow-first for the sourced spell-shield priority. Only the first slash may damage even when shielded; surviving accepted slashes determine the base/enhanced slow. Only an accepted owner slash against an actual Champion-class body reduces W cooldown by three seconds. Owner E is an instant overlay preserving basic windups and walking, while its ordinary cast remains locked by Q.");
    kit.assume("Contempt checks impact health before ordinary basic damage. Champion-class targets receive their own ten-second lock; other actual pets do not. Blind/dodge/parry deny contact and blocked basic damage consumes the champion lock without damage. Monster classification alone selects the 75%/175 cap. No structure or imaginary lane target is supplied.");
    kit.assume("Death Mark validates an actual visible enemy champion, spawns its R shadow immediately, waits 0.6 seconds and follows the target during an interruptible 0.35-second terrain-crossing dash, landing 125 units beyond along the reflected approach. The pre-dash 1950 cancellation uses a static 0.5-second cooldown. At 2200 tracking distance the last tracked endpoint is retained. Untargetability ends on actual dash end, including interruption, and the independent mark application can be spell-shielded. Its three-second ledger sums accepted pre-mitigation physical/magic damage reports from this owner against that exact champion, including absorbed damage, ordinary basics and shadow packets; true damage, blocked packets, unrelated pets and the detonation itself never enter it. Detonation reads current AD and ignores a newly acquired spell shield; attached ordinary untargetability permits the packet but stasis/invulnerability/parry still guard damage. The existing mark survives caster death. R ghosting uses the primary three seconds over binary four. The R swap window uses the primary 7.5-second buff plus 0.25 linger, bounded by the shadow's last-1.25-second prohibition.");
    kit.assume("Reference budget prices one ordinary Q/E per cooldown, one extra W-mimicked Q per W cooldown and an isolated R base plus one Q/E stored within its mark, with the low-health passive once per target cooldown at half uptime. Runtime never receives this forecast damage or guaranteed contacts. Offensive behavior reserves R in hold/trade, retreats after the common trade clock, and chooses swaps only when they improve the current approach or retreat distance. Standard shadow sight has no fog-of-war geometry and does not reveal stealth. Two cosmetic R dash silhouettes are not extra spell sources.");
    return { abilities, behavior, attack: { onHitToPets: true }, budget: { damage(self, target) {
      const haste = 1 + derive(self).abilityHaste / 100, qHit = evaluate(qDamage, self, target), eHit = evaluate(eDamage, self, target);
      return { physical: qHit / (qCD / haste + qCast) + eHit / (eCD / haste) + qHit / (wCD / haste) + (derive(self).ad * rBase + rStored * (qHit + eHit)) / (rCD / haste + rDelay + rTravel + markTime), magic: derive(target).maxHp * passiveShare / passiveCD * .5 };
    } }, hooks: {
      onAttackBeforeDamage: passive,
      onCastStart(ctx) {
        if (ctx.ability.key !== "Q") return;
        const group = ctx.world.nextId++, dir = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), aimX = ctx.self.x + dir * Math.max(0, Math.min(qRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
        ctx.memory["zed:q:cast"] = group; ctx.memory["zed:q:aim"] = aimX; ctx.memory["zed:q:seen"] = ctx.tick; ctx.memory["zed:q:ownSource"] = "self";
        for (const body of shadows(ctx.world, ctx.self)) { body.memory.qGroup = group; body.memory.qAim = aimX; body.memory.qSeen = ctx.tick; body.memory.qReady = ctx.tick + ticks(qCast); }
      },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (key === "W") spawnShadow(ctx, "W", ctx.self.x, ctx.aim);
        if (key === "Q") launch(ctx, ctx.self.x, Number(ctx.memory["zed:q:aim"]), Number(ctx.memory["zed:q:cast"]), String(ctx.memory["zed:q:ownSource"]), Number(ctx.memory["zed:q:seen"]));
        if (key === "W2" || key === "R2") {
          const body = shadowFor(ctx.world, ctx.self, key[0]!); if (!body) return;
          if (!placed(body, ctx.tick)) { body.memory.swapQueued = true; return; }
          if (key === "W2" && ctx.self.action?.kind === "cast" && ctx.self.action.ability === "Q") {
            launch(ctx, ctx.self.x, Number(ctx.memory["zed:q:aim"]), Number(ctx.memory["zed:q:cast"]), "self", Number(ctx.memory["zed:q:seen"]));
            ctx.memory["zed:q:ownSource"] = `shadow:${body.id}`; delete body.memory.qGroup;
          }
          swap(ctx, body);
        }
        if (key === "E") {
          const group = ctx.world.nextId++, sources = [{ source: "self", x: ctx.self.x, radius: eRadius }];
          for (const body of shadows(ctx.world, ctx.self)) if (placed(body, ctx.tick)) sources.push({ source: `shadow:${body.id}`, x: body.x, radius: shadowRadius }); else { body.memory.eGroup = group; }
          slashAt(ctx, sources, group);
        }
        if (key === "R") {
          spawnShadow(ctx, "R", ctx.self.x); ctx.memory[ACTIVE] = true; ctx.memory["zed:r:origin"] = ctx.self.x; ctx.memory["zed:r:direction"] = directionTo(ctx.self, ctx.enemy); ctx.memory["zed:r:targetX"] = ctx.enemy.x;
          for (const state of ["untargetable", "noMovement", "noAttacks"] as const) { applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state, duration: rDelay + rTravel + 1 / 30 }, { ability: get("R"), scale: 1 }); ctx.self.statuses.at(-1)!.memoKey = ACTIVE; }
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.self.x, radius: 0, startTick: ctx.tick, endTick: ctx.tick + ticks(rDelay), ability: "R", connects: false, noPets: true, memory: { phase: "dash" } });
        }
      },
      onTick(ctx) {
        for (const body of shadows(ctx.world, ctx.self)) {
          if (!placed(body, ctx.tick)) { const dest = Number(body.memory.destination), dir = Math.sign(dest - body.x); body.x += dir * Math.min(wSpeed / 30, Math.abs(dest - body.x)); continue; }
          if (body.memory.destination !== undefined) { body.x = Number(body.memory.destination); delete body.memory.destination; }
          if (body.memory.swapQueued) swap(ctx, body);
          if (body.memory.qGroup !== undefined && ctx.tick >= Number(body.memory.qReady)) { launch(ctx, body.x, Number(body.memory.qAim), Number(body.memory.qGroup), `shadow:${body.id}`, Number(body.memory.qSeen)); delete body.memory.qGroup; }
          if (body.memory.eGroup !== undefined) { slashAt(ctx, [{ source: `shadow:${body.id}`, x: body.x, radius: shadowRadius }], Number(body.memory.eGroup)); delete body.memory.eGroup; }
        }
      },
      onMissileTick(ctx) { if (ctx.missile.source === "Qbolt") ctx.memory["zed:q:current"] = ctx.missile.id; },
      onAbilityContact(ctx) {
        if (ctx.ability.key !== "Qbolt") return;
        const id = Number(ctx.memory["zed:q:current"]);
        return [{ type: "damage", damageType: "physical", amount: ctx.memory[`zed:q:${id}:passed`] ? qReduced : qDamage }];
      },
      onMissileContact(ctx) { if (ctx.missile.source === "Qbolt") ctx.memory[`zed:q:${ctx.missile.id}:passed`] = true; },
      onAbilityHit(ctx) {
        if (ctx.ability.key === "Qbolt") { const id = Number(ctx.memory["zed:q:current"]); contact(ctx, Number(ctx.memory[`zed:q:${id}:group`]), String(ctx.memory[`zed:q:${id}:source`]), ctx.scale); }
        if (ctx.ability.key === "Eslash") {
          ctx.memory["zed:e:accepted"] = true; const source = String(ctx.memory["zed:e:source"]); contact(ctx, Number(ctx.memory["zed:e:group"]), source, ctx.scale);
          if (source === "self" && (ctx.enemy.spec.targetClass ?? (ctx.enemy.petId === undefined ? "champion" : "other")) === "champion") ctx.self.cooldownReady.W = Math.max(ctx.tick, (ctx.self.cooldownReady.W ?? 0) - ticks(refundSeconds));
        }
        if (ctx.ability.key === "Rmark") {
          const applied = ctx.enemy.statuses.findLast((status) => status.key === MARK && status.source === ctx.self.side);
          if (applied) { ctx.memory["zed:r:stored"] = 0; ctx.memory["zed:r:markEnd"] = applied.endTick; ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.enemy.x, radius: 0, startTick: ctx.tick, endTick: applied.endTick, ability: "Rdetonate", onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: rBase } } }], connects: false, noPets: true, memory: { markStart: ctx.tick } }); }
        }
      },
      onTargetResurrection(ctx) {
        delete ctx.memory["zed:r:markEnd"]; delete ctx.memory["zed:r:stored"];
        ctx.world.zones = ctx.world.zones.filter((zone) => !(zone.owner === ctx.self.side && zone.ability === "Rdetonate"));
      },
      onDamageDealt(ctx) {
        if (ctx.enemy.petId !== undefined || ctx.damageType === "true" || ctx.ability === detonation.name || ctx.ability === "Rdetonate" || ctx.enemy.statuses.some((status) => status.key === "parry" && status.kind === "state")) return;
        if (ctx.enemy.statuses.some((status) => status.key === MARK && status.source === ctx.self.side && status.endTick > ctx.tick)) ctx.memory["zed:r:stored"] = Number(ctx.memory["zed:r:stored"] ?? 0) + ctx.raw;
      },
      onZoneLand(ctx) {
        if (ctx.zone.ability === "R" && ctx.zone.memory?.phase === "dash") {
          if (!ctx.memory[ACTIVE] || !ctx.self.alive || ctx.self.hp <= 0) return;
          if (!ctx.enemy.alive || Math.abs(ctx.enemy.x - ctx.self.x) >= rCancelRange) { ctx.self.x = Number(ctx.memory["zed:r:origin"]); ctx.self.cooldownReady.R = ctx.tick + ticks(rCancelCD); ctx.world.pets = ctx.world.pets.filter((body) => !(body.owner === ctx.self.side && body.spec.kind === SHADOW && body.memory.source === "R")); delete ctx.memory[ACTIVE]; ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== ACTIVE); return; }
          ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "cc" && status.key === "airborne"));
          ctx.memory["zed:r:direction"] = directionTo(ctx.self, ctx.enemy); ctx.memory["zed:r:targetX"] = ctx.enemy.x;
          ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rTravel), perTick: 0, stopAtContact: false, unstoppable: false, crossTerrain: true };
        }
        if (ctx.zone.ability === "Rdetonate") {
          const actual = ctx.enemy.statuses.find((status) => status.key === MARK && status.source === ctx.self.side && status.startTick === ctx.zone.memory?.markStart);
          // Status expiry precedes landing, so the explicit same-target ledger clock owns normal expiry.
          if (ctx.memory["zed:r:markEnd"] !== ctx.tick || !ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.resurrection || (actual && actual.endTick !== ctx.tick)) return;
          const raw = derive(ctx.self).ad * rBase + Number(ctx.memory["zed:r:stored"] ?? 0) * rStored;
          delete ctx.memory["zed:r:markEnd"]; ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => status !== actual);
          abilityHit(ctx.world, ctx.self, ctx.enemy, detonation, [{ type: "damage", damageType: "physical", amount: flat(raw) }]);
        }
      },
      onDashTick(ctx) {
        if (ctx.ability.key !== "R") return;
        if (Math.abs(ctx.self.x - ctx.enemy.x) < rTrack) ctx.memory["zed:r:targetX"] = ctx.enemy.x;
        const destination = Number(ctx.memory["zed:r:targetX"]) + Number(ctx.memory["zed:r:direction"]) * rBeyond;
        ctx.action.perTick = (destination - ctx.self.x) / Math.max(1, ctx.action.endTick - ctx.tick + 1);
      },
      onDashEnd(ctx) { if (ctx.ability.key === "R") finishR(ctx); },
    } };
  },
};
export default zed;
