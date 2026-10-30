/** LeBlanc: contact-owned sigils, independent return pads, breakable chains and Mirror Image. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackTiming, canCast } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, inStasis } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { nearestPetTarget, petEffects, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World, Zone } from "../../engine/sim/state";
import { flat, ticks } from "./util";

interface Tether { targetPet?: number; start: number; end: number; scale: number; key: "E" | "RE"; }
const SIGIL = "leblanc-sigil", MIMIC_SIGIL = "leblanc-mimic-sigil", CLONE = "leblanc-mirror-image";
const leblanc: KitModule = {
  champion: "Leblanc",
  build(kit) {
    const i = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R"), pet = kit.pet("Mirror Image");
    const threshold = pet.quoted("below 40% maximum health") / 100;
    const passiveCooldown = i.field("staticCooldown"), invisibleSeconds = i.quoted("invisible for 1 second"), cloneSeconds = i.quoted("lasts 8 seconds");
    const fleeDistance = i.quoted("moving up to 1900 units"), leash = pet.quoted("1125 (Leash range (estimated))");
    const hpShare = pet.stat("hp") / 100, armorShare = pet.stat("armor") / 100, mrShare = pet.stat("magicresist") / 100;
    const speedShare = pet.stat("movespeed") / 100, attackSpeedShare = pet.stat("attackspeed") / 100;
    const radiusShare = pet.stat("radius") / 100, pathingShare = pet.stat("pathingradius") / 100, cloneRange = pet.stat("range");
    pet.stat("damage"); pet.quote("Champion"); pet.quote("basic attacks do not apply on-hit effects");
    pet.quote("automatically run away from the damage source"); i.quote("basic attacks with no effect");
    i.quote("Using a basic attack breaks the stealth at the end of the attack windup");
    i.quote("her clone will not produce a fake tether");
    const qDamage = q.formula("Magic Damage"), markSeconds = q.quoted("marks them for 3.5 seconds");
    // The authored series extends a formula the prose explicitly caps at level 18.
    const minionSeries = q.seriesIn("bonus magic damage against minions");
    if (minionSeries.kind !== "level" || minionSeries.values[17] === undefined) throw new Error("Leblanc: capped minion damage series changed");
    const minionBonus = q.quoted("orb deals 10 – 146", 1);
    if (minionSeries.values[17] !== minionBonus) throw new Error("Leblanc: capped minion damage differs from the primary prose");
    const manaRefund = q.quoted("refunds 100% of its mana cost") / 100, cooldownRefund = q.quoted("30% of its remaining cooldown") / 100, qCost = q.cost();
    q.quote("Sigil of Malice and Mimic: Sigil of Malice can detonate each other's marks");
    q.quote("this ability will cancel but does not go on cooldown nor pay its cost");
    const qRange = q.field("targetRange"), qSpeed = q.field("speed"), qCast = q.castTime();
    const wDamage = w.formula("Magic Damage"), dashRange = w.field("targetRange"), dashSpeed = w.field("speed"), dashRadius = w.field("effectRadius");
    w.quote("pad duration starts once the dash ends");
    const returnSeconds = w.quoted("cast location for 4 seconds");
    const returnGate = w.quoted("recast after 0.2 seconds");
    w.quote("regardless of range"); w.quote("independent return pads"); w.quote("Recasting the ability does not");
    const wCast = w.castTime(); w.gameQuote("mSpell.spellCastTime: 0.25"); w.gameQuote("mSpell.castRadius: [220.0,220.0,220.0,220.0,220.0,220.0,220.0]"); w.gameQuote("mSpell.mCastingBreaksStealth: true");
    const eDamage = e.formula("Magic Damage"), fractureDamage = e.formula("Fracture Magic Damage");
    const eRange = e.field("targetRange"), eWidth = e.field("width"), eSpeed = e.field("speed"), tetherRadius = e.field("tetherRadius");
    const tetherSeconds = e.quoted("for 1.5 seconds"), rootSeconds = e.quoted("root them for 1.5 seconds"), tetherGrace = e.quoted("minimum of 0.25 seconds");
    e.quote("separate debuffs"); e.quote("not the aftereffects of one already applied"); e.quote("Both the initial and the delayed damage can detonate Sigil of Malice");
    e.quote("cast from wherever the caster is at the end of the cast time");
    const rqDamage = r.formula("Orb Magic Damage"), rqMark = r.formula("Mark Magic Damage"), rwDamage = r.formula("Magic Damage"), reDamage = r.formula("Application Magic Damage"), reFracture = r.formula("Fracture Magic Damage");
    const rCooldown = r.cooldown(), rCost = r.cost();
    const rqCast = r.gameQuoted("mSpell.spellCastTime: 0.25", 0, "Characters/Leblanc/Spells/LeblancRQAbility/LeblancRQ");
    const reCast = r.gameQuoted("mSpell.spellCastTime: 0.25", 0, "Characters/Leblanc/Spells/LeblancREAbility/LeblancRE");
    r.quote("most recently used basic ability"); r.quote("default to Mimic: Sigil of Malice");
    r.gameQuote("mSpell.mMaxAmmo: [2,2,2,2,2,2,2]"); r.gameQuote("mSpell.mAmmoUsed: [0,0,0,0,0,0,0]"); r.gameQuote("mSpell.mAmmoRechargeTime: [5.0,5.0,5.0,5.0,5.0,5.0,5.0]");
    q.gameQuote("mSpell.mCastingBreaksStealth: true"); e.gameQuote("mSpell.mCastingBreaksStealth: true");
    r.gameQuote("mSpell.mCastingBreaksStealth: true", "Characters/Leblanc/Spells/LeblancRQAbility/LeblancRQ");
    r.gameQuote("mSpell.mCastingBreaksStealth: true", "Characters/Leblanc/Spells/LeblancREAbility/LeblancRE");
    w.gameQuote("mSpell.mCastingBreaksStealth: true", "Characters/Leblanc/Spells/LeblancWAbility/LeblancWReturn");
    r.gameQuote("mSpell.mCastingBreaksStealth: true", "Characters/Leblanc/Spells/LeblancRWAbility/LeblancRWReturn");
    r.gameQuote("mSpell.mCastingBreaksStealth: true", "Characters/Leblanc/Spells/LeblancRWAbility/LeblancRW");

    kit.assume("Sigils belong to the actual contacted champion or pet. A successful damaging spell contact consumes existing Q/RQ marks before applying the new mark; cast declaration, misses, spell shields and parries do not. Each mark snapshots its damage at application, interpreting 'the same magic damage again'; the source does not explicitly define AP snapshot timing. Q's minion bonus is capped at level 18, despite the extracted formula extending to 20. Champion-class clones never receive that minion bonus/refund.");
    kit.assume("Distortion's wiki no-cast-time and 240 damage radius take precedence over the game file's 0.25 cast metadata and 220 castRadius, respectively. Its fixed 1D endpoint may pass the enemy; only arrival, never path crossing or return, deals one area hit. Knockdown stops the dash without arrival damage; a return pad is retained at its original origin on an interrupted dash as an explicit unsourced interrupt rule. The four-second pad and 0.2-second recast gate begin at actual dash end. W/RW origins and clocks are independent; return is instant, free, range-independent and does not count as an ability activation. Scalar terrain cannot reproduce every endpoint/wall overlap.");
    kit.assume("Mimic has finite Q/W/E memory, defaults to Q, and shares a single ordinary R cooldown across RQ/RW/RE. The root binary's hidden two-ammo metadata spends zero ammo and is not evidence of two usable ultimate charges; no extra R casts or five-second recharge is granted. RQ/RE use their actual subspell 0.25-second cast fields; RW copies W's no-cast-time. Recasts do not replace the remembered basic ability. No pre-fight cast is assumed.");
    kit.assume("Each E/RE contact starts its own tether, reveal and 1.5-second completion clock, with the pinned 0.25-second minimum duration. Tether distance is edge to edge (865 plus both gameplay radii). A one-tick watchdog checks current distance and target identity, including after LeBlanc dies. Fracture reads live AP at completion, bypasses a newly gained spell shield, and uses a separate parry/damage/root packet. Its root reveal lasts only while the actual root remains. Attached tethers persist through ordinary untargetability, but stasis denies completion; resurrection or target death breaks them. Source/target lifecycle and AP timing are explicit interpretations where server logic is absent.");
    kit.assume("Mirror Image starts ready and triggers only on positive HP damage leaving a living LeBlanc strictly below 40% maximum HP; merely starting low, full shield absorption and lethal damage do not summon it. The pet infobox gives HP as 100% of current health without a separate maximum-health rule; both the clone maximum and current HP use that spawn snapshot. The clone snapshots copied armor/MR/attack speed/movement speed/gameplay/pathing radii, has champion targeting class and actual clone classification, and survives at most eight seconds. Owner death removes it under the shared pet lifetime rule because its post-owner-death lifetime is absent from these sources.");
    kit.assume("The pet page's flee-away-from-damage-source instruction takes precedence over the passive template's random-forward destination. The deterministic 1D clone runs away up to the sourced 1900-unit destination, constrained by the explicitly estimated 1125 leash; outside the leash it walks back. After that it only performs cosmetic basic attacks on an eligible target already within 525 range. The source supplies no further autonomous command policy, so it does not chase or copy spells. Cosmetic attacks use the owner's attack timing and break clone invisibility at windup completion, with zero hit, on-hit, retaliation or damage events.");

    kit.assume("The budget values Q and RQ mark consumption and E fracture once per corresponding cooldown at full contact uptime, in addition to their normal initial packets; R uses the default Q branch. It does not price clone deception or guarantee tether uptime, and actual simulation resolves misses, returns and breaks. Offensive behavior reserves all Mimic variants in hold/trade modes and keeps offensive Distortion out of kite mode; reactive escapes and active return pads remain spatial choices.");

    const passiveSpec: AbilitySpec = { key: "I", name: i.name, slot: "I", cooldown: passiveCooldown, castTime: 0, delivery: { kind: "self" } };
    const damage = (amount: Effect & { type: "damage" }) => amount;
    const hit = (amount: typeof qDamage): Effect[] => [damage({ type: "damage", damageType: "magic", amount })];
    const padActive = (self: Unit, world: World, key: string) => self.memory[`lbPad:${key}:x`] !== undefined && world.tick < Number(self.memory[`lbPad:${key}:end`] ?? -1);
    const mimicUsable = (which: string) => (self: Unit, world: World) => !padActive(self, world, "RW") && String(self.memory.lbLast ?? "Q") === which;
    const spellFlags = { spellShield: true, petContactHooks: true };
    const qSpec: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: qCost, castTime: qCast, cancelOnInvalidTarget: true, delivery: { kind: "target", range: qRange, missileSpeed: qSpeed }, flags: { ...spellFlags, projectile: q.flag("projectile") }, onHit: hit(qDamage), persistsAfterDeath: true };
    const wSpec: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cooldownAtCastStart: true, cost: w.cost(), castTime: wCast, delivery: { kind: "dash", direction: "toward", distance: dashRange, speed: dashSpeed, minDistance: 0, through: true, crossTerrain: true }, onHit: hit(wDamage), flags: { ...spellFlags, grounded: w.flag("grounded"), knockdown: w.flag("knockdown") }, usable: (self, world) => !padActive(self, world, "W"), roles: ["damage", "engage", "escape"] };
    const eSpec: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castDirection: "start", delivery: { kind: "line", range: eRange, width: eWidth, speed: eSpeed, collisionPet: true }, onHit: hit(eDamage), flags: { ...spellFlags, projectile: e.flag("projectile") }, decisive: true, persistsAfterDeath: true };
    const rqSpec: AbilitySpec = { ...qSpec, key: "R", name: "Mimic: Sigil of Malice", slot: "R", cooldown: rCooldown, cost: rCost, castTime: rqCast, onHit: hit(rqDamage), usable: mimicUsable("Q") };
    const rwSpec: AbilitySpec = { ...wSpec, key: "RW", name: "Mimic: Distortion", slot: "other", cooldownKey: "R", cooldown: rCooldown, cost: rCost, onHit: hit(rwDamage), usable: mimicUsable("W"), budgetExcluded: true };
    const reSpec: AbilitySpec = { ...eSpec, key: "RE", name: "Mimic: Ethereal Chains", slot: "other", cooldownKey: "R", cooldown: rCooldown, cost: rCost, castTime: reCast, onHit: hit(reDamage), usable: mimicUsable("E"), budgetExcluded: true };
    const returnSpec = (key: "W" | "RW"): AbilitySpec => ({ key: `${key}2`, name: `${key === "W" ? "Distortion" : "Mimic: Distortion"} (return)`, slot: "other", cooldown: 0, cost: 0, castTime: 0, delivery: { kind: "self" }, flags: { grounded: true }, countsAsCast: false, budgetExcluded: true, usable: (self, world) => padActive(self, world, key) && world.tick >= Number(self.memory[`lbPad:${key}:ready`] ?? Infinity), roles: ["escape"] });
    const fractureSpec = (key: "E" | "RE"): AbilitySpec => ({ key: `${key}2`, name: `${key === "E" ? "Ethereal Chains" : "Mimic: Ethereal Chains"} (fracture)`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true, hitsUntargetable: true }, onHit: [...hit(key === "E" ? fractureDamage : reFracture), { type: "cc", cc: "root", duration: rootSeconds }, { type: "state", state: "revealed", duration: rootSeconds, revealWhileCC: "root" }], usable: () => false, persistsAfterDeath: true, budgetExcluded: true });
    const abilities = [qSpec, wSpec, eSpec, rqSpec, rwSpec, reSpec, returnSpec("W"), returnSpec("RW"), fractureSpec("E"), fractureSpec("RE")];
    const get = (key: string) => abilities.find((spell) => spell.key === key)!;
    const ownSigils = (target: Unit, owner: Unit, tick: number) => target.statuses.filter((status) => status.kind === "mark" && (status.key === SIGIL || status.key === MIMIC_SIGIL) && status.source === owner.side && status.endTick > tick);
    const targetPet = (world: World, target: Unit) => target.petId === undefined ? undefined : world.pets.find((entry) => entry.id === target.petId);
    const isMinion = (world: World, target: Unit) => targetPet(world, target)?.spec.targetClass === "minion";
    const saveTarget = (world: World, target: Unit) => { const actual = targetPet(world, target); if (actual) { actual.statuses = target.statuses; actual.memory = target.memory; } };
    const queueTether = (ctx: HookContext, tether: Tether) => {
      const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: tether.start, x: ctx.enemy.x, radius: 0, startTick: tether.start, endTick: ctx.tick + 1, ability: `${tether.key}2`, onHit: get(`${tether.key}2`).onHit, connects: false, noPets: true, scale: tether.scale };
      ctx.memory[`lbTether:${zone.id}`] = JSON.stringify(tether); ctx.world.zones.push(zone);
    };
    const behavior: Behavior = (view) => {
      const { self, world, enemy, mode } = view;
      if (mode === "idle") return undefined;
      const reservesUltimate = mode === "hold" || mode === "trade";
      // Alternate Mimic keys still obey the standard modes' ultimate reservation.
      const ordinaryView = reservesUltimate ? { ...view, self: { ...self, spec: { ...self.spec, abilities: self.spec.abilities.filter((ability) => !["R", "RW", "RE"].includes(ability.key)) } } } : view;
      const normal = defaultBehavior(ordinaryView);
      if (mode === "trade" && self.memory.tradeDone) {
        for (const key of ["RW", "W"]) if (canCast(world, self, get(`${key}2`)) && Math.abs(Number(self.memory[`lbPad:${key}:x`]) - enemy.x) > Math.abs(self.x - enemy.x)) return { kind: "cast", ability: `${key}2` };
        return normal;
      }
      const reaction = react(view);
      if (reaction?.kind === "cast" && reaction.ability !== "W2" && reaction.ability !== "RW2") return reaction;
      if (!self.action && mode === "flee") {
        for (const key of ["RW", "W"]) if (canCast(world, self, get(`${key}2`)) && Math.abs(Number(self.memory[`lbPad:${key}:x`]) - enemy.x) > Math.abs(self.x - enemy.x)) return { kind: "cast", ability: `${key}2` };
      }
      if (!self.action && mode !== "flee" && canTarget(enemy, self)) {
        const gap = Math.abs(self.x - enemy.x);
        for (const key of ["Q", "R", "E", "RE", "W", "RW"]) {
          if (reservesUltimate && ["R", "RW", "RE"].includes(key)) continue;
          if (mode === "kite" && (key === "W" || key === "RW")) continue;
          const spell = get(key);
          const reach = spell.delivery.kind === "target" || spell.delivery.kind === "line" ? spell.delivery.range : dashRange + dashRadius + enemy.spec.base.radius;
          if (gap <= reach && canCast(world, self, spell)) return { kind: "cast", ability: key };
        }
      }
      // Return pads are spatial choices, not generic damage/escape casts.
      if (normal?.kind === "cast" && (normal.ability === "W2" || normal.ability === "RW2")) return { kind: "move", direction: mode === "flee" ? -1 : 1 };
      return normal;
    };

    return { abilities, behavior, budget: { damage(self, target) {
      const haste = derive(self).abilityHaste;
      return { magic: evaluate(qDamage, self, target) / cooldownAfterHaste(qSpec.cooldown, haste) + evaluate(fractureDamage, self, target) / cooldownAfterHaste(eSpec.cooldown, haste) + evaluate(rqMark, self, target) / cooldownAfterHaste(rCooldown, haste) };
    } }, hooks: {
      onStart(ctx) { ctx.memory.lbLast = "Q"; ctx.memory.lbPassiveReady = 0; },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (["Q", "W", "E"].includes(key)) ctx.memory.lbLast = key;
        if (["Q", "W", "E", "R", "RW", "RE", "W2", "RW2"].includes(key)) ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.key === "invisible" && status.ability === "I"));
        if (key === "W" || key === "RW") ctx.memory[`lbPad:${key}:origin`] = ctx.self.x;
        if (key === "W2" || key === "RW2") {
          const root = key === "W2" ? "W" : "RW";
          ctx.self.x = Number(ctx.memory[`lbPad:${root}:x`]);
          for (const suffix of ["x", "end", "ready", "origin"]) delete ctx.memory[`lbPad:${root}:${suffix}`];
        }
      },
      onAttackLaunch(ctx) { ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.key === "invisible" && status.ability === "I")); },
      onAbilityContact(ctx) {
        const key = ctx.ability.key;
        if (!["Q", "W", "E", "R", "RW", "RE", "E2", "RE2"].includes(key) || ctx.defense) return;
        const packets = [...ctx.effects];
        if (key === "Q" && isMinion(ctx.world, ctx.enemy)) packets.push({ type: "damage", damageType: "magic", amount: flat(minionBonus) });
        for (const mark of ownSigils(ctx.enemy, ctx.self, ctx.tick)) packets.push({ type: "damage", damageType: "magic", amount: flat(mark.value), label: mark.key === SIGIL ? "Sigil of Malice (mark)" : "Mimic: Sigil of Malice (mark)" });
        if (key === "Q" || key === "R") packets.push({ type: "mark", key: key === "Q" ? SIGIL : MIMIC_SIGIL, duration: markSeconds, value: evaluate(key === "Q" ? qDamage : rqMark, ctx.self, ctx.enemy) });
        return packets;
      },
      beforeAbilityHit(ctx) {
        if (!["Q", "W", "E", "R", "RW", "RE", "E2", "RE2"].includes(ctx.ability.key)) return;
        const consumed = ownSigils(ctx.enemy, ctx.self, ctx.tick);
        ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !consumed.includes(status));
        saveTarget(ctx.world, ctx.enemy);
      },
      onAbilityHit(ctx) {
        const key = ctx.ability.key;
        if ((key !== "E" && key !== "RE") || !ctx.enemy.alive || ctx.enemy.hp <= 0) return;
        const tether: Tether = { start: ctx.tick, end: ctx.tick + ticks(tetherSeconds), scale: ctx.scale, key, ...(ctx.enemy.petId === undefined ? {} : { targetPet: ctx.enemy.petId }) };
        ctx.enemy.statuses.push({ kind: "mark", key: `lbTether:${key}`, source: ctx.self.side, startTick: ctx.tick, endTick: tether.end + 1, value: 1 });
        ctx.enemy.statuses.push({ kind: "state", key: "revealed", ability: key, source: ctx.self.side, startTick: ctx.tick, endTick: tether.end, value: 1 });
        saveTarget(ctx.world, ctx.enemy); queueTether(ctx, tether);
      },
      onDashEnd(ctx) {
        const key = ctx.ability.key;
        if (key !== "W" && key !== "RW") return;
        ctx.memory[`lbPad:${key}:x`] = Number(ctx.memory[`lbPad:${key}:origin`] ?? ctx.self.x);
        ctx.memory[`lbPad:${key}:end`] = ctx.tick + ticks(returnSeconds);
        ctx.memory[`lbPad:${key}:ready`] = ctx.tick + ticks(returnGate);
        if (ctx.interrupted) return;
        if (Math.abs(ctx.enemy.x - ctx.self.x) <= dashRadius + ctx.enemy.spec.base.radius) abilityHit(ctx.world, ctx.self, ctx.enemy, ctx.ability, ctx.ability.onHit ?? []);
        for (const actual of [...ctx.world.pets]) if (actual.owner !== ctx.self.side && !actual.spec.hitPoints && Math.abs(actual.x - ctx.self.x) <= dashRadius + actual.spec.radius) abilityHitPet(ctx.world, ctx.self, actual, ctx.ability, ctx.ability.onHit ?? [], "area");
      },
      onZoneLand(ctx) {
        const serialized = ctx.memory[`lbTether:${ctx.zone.id}`];
        if (typeof serialized !== "string") return;
        delete ctx.memory[`lbTether:${ctx.zone.id}`];
        const tether = JSON.parse(serialized) as Tether;
        const actual = tether.targetPet === undefined ? undefined : ctx.world.pets.find((entry) => entry.id === tether.targetPet);
        const target = tether.targetPet === undefined ? ctx.enemy : actual ? petFormulaTarget(actual, ctx.self, ctx.tick) : undefined;
        if (!target) return;
        const liveMark = target.statuses.some((status) => status.key === `lbTether:${tether.key}` && status.source === ctx.self.side && status.startTick === tether.start);
        const distance = Math.abs(target.x - ctx.self.x) - target.spec.base.radius - ctx.self.spec.base.radius;
        const broken = !liveMark || !target.alive || target.hp <= 0 || Boolean(target.resurrection) || (ctx.tick - tether.start >= ticks(tetherGrace) && distance > tetherRadius);
        if (broken || ctx.tick >= tether.end) {
          target.statuses = target.statuses.filter((status) => !(status.source === ctx.self.side && ((status.key === `lbTether:${tether.key}` && status.startTick === tether.start) || (status.kind === "state" && status.key === "revealed" && status.ability === tether.key && status.startTick === tether.start))));
          saveTarget(ctx.world, target);
          if (!broken) {
            const fracture = get(`${tether.key}2`);
            if (actual) abilityHitPet(ctx.world, ctx.self, actual, fracture, fracture.onHit!, "singleTarget", tether.scale);
            else abilityHit(ctx.world, ctx.self, target, fracture, fracture.onHit!, tether.scale);
          }
        } else queueTether({ ...ctx, enemy: target }, tether);
      },
      onKill(ctx) {
        if (!ctx.pet || ctx.pet.spec.targetClass !== "minion" || !(ctx.damage?.ability === q.name || ctx.damage?.ability === "Q" || (ctx.damage?.ability === "Sigil of Malice (mark)"))) return;
        ctx.apply({ type: "refund", ability: "Q", fraction: cooldownRefund }, true); ctx.apply({ type: "resource", amount: flat(qCost * manaRefund) }, true);
      },
      onDamageTaken(ctx) {
        if (ctx.amount <= 0 || ctx.self.hp <= 0 || !ctx.self.alive || ctx.self.hp >= derive(ctx.self).maxHp * threshold || ctx.tick < Number(ctx.memory.lbPassiveReady ?? 0)) return;
        ctx.memory.lbPassiveReady = ctx.tick + ticks(passiveCooldown);
        const stats = derive(ctx.self), timing = attackTiming(ctx.self);
        const clone = spawnPet(ctx.world, ctx.self, { kind: CLONE, name: pet.name, unitClass: "clone", targetClass: "champion", hp: ctx.self.hp * hpShare, armor: (stats.armor.base + stats.armor.bonus) * armorShare, mr: (stats.mr.base + stats.mr.bonus) * mrShare, radius: ctx.self.spec.base.radius * radiusShare, pathingRadius: ctx.self.spec.base.pathingRadius * pathingShare, moveSpeed: stats.rawMoveSpeed * speedShare, duration: cloneSeconds, leash,
          target(world, image) {
            if (!image.memory.fled || Math.abs(image.x - world.units[image.owner].x) > leash) return undefined;
            const candidate = nearestPetTarget(world, image);
            return candidate && Math.abs(candidate.x - image.x) <= cloneRange + ("owner" in candidate ? candidate.spec.radius : candidate.spec.base.radius) ? candidate : undefined;
          },
          attack: { range: cloneRange, interval: 1 / (stats.attackSpeed * attackSpeedShare), windup: timing.windup / 30, effects: [], attackLike: true, cosmetic: true },
        }, ctx.self.x);
        clone.memory.destination = clone.x + (Math.sign(ctx.self.x - ctx.enemy.x) || ctx.self.facing || 1) * fleeDistance;
        clone.memory.fled = false;
        petEffects(ctx.world, ctx.self, clone, [{ type: "state", state: "invisible", duration: invisibleSeconds }], "singleTarget", "I");
        // Shared invisibility application drops enemy targeting, with one tagged status for early breaks.
        applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "invisible", duration: invisibleSeconds }, { scale: 1, ability: passiveSpec });
      },
      onTick(ctx) {
        for (const key of ["W", "RW"]) if (ctx.tick >= Number(ctx.memory[`lbPad:${key}:end`] ?? Infinity)) for (const suffix of ["x", "end", "ready", "origin"]) delete ctx.memory[`lbPad:${key}:${suffix}`];
        for (const clone of ctx.world.pets) {
          if (clone.owner !== ctx.self.side || clone.spec.kind !== CLONE || clone.hp <= 0 || ctx.tick >= clone.endTick) continue;
          const actor = petFormulaTarget(clone, ctx.self, ctx.tick);
          if (inStasis(actor) || actor.statuses.some((status) => status.kind === "cc" && ["stun", "root", "airborne", "sleep", "suppression", "charm", "fear", "flee", "taunt"].includes(status.key))) continue;
          const from = clone.x, outside = Math.abs(from - ctx.self.x) > leash;
          if (clone.memory.fled && !outside) continue;
          const destination = outside ? ctx.self.x : Number(clone.memory.destination);
          const dir = Math.sign(destination - from), available = outside ? Math.max(0, Math.abs(from - ctx.self.x) - leash) : Math.max(0, leash - dir * (from - ctx.self.x));
          const amount = Math.min(derive(actor).moveSpeed / 30, Math.abs(destination - from), available);
          clone.x += dir * amount;
          if (!outside && (amount <= 0 || Math.abs(destination - clone.x) < 1e-6 || Math.abs(clone.x - ctx.self.x) >= leash)) clone.memory.fled = true;
        }
      },
    } };
  },
};
export default leblanc;
