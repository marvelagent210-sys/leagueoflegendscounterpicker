/** Naafiri's current W/R layout and independently targetable, commanded Packmates. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { canMove, derive, evaluate } from "../../engine/sim/derived";
import { petAttackActor } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { destroyPet, petEffects, petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const PACK = "naafiri:packmate", BLEED = "Darkin Daggers (bleed)", EPS = 1e-6;
const naafiri: KitModule = {
  champion: "Naafiri",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R"), pet = kit.pet("Packmate");
    const cap = p.levelValue("She may have up to"), spawnSeconds = p.field("staticCooldown"), hitReduce = p.quoted("reduces the cooldown by 4 seconds"), killReduce = p.quoted("reduces it by 1 second");
    p.quote("Naafiri summons the maximum number of Packmates when the game starts"); p.quote("Packmates do not count as abilities"); p.quote("Both hits of Eviscerate will trigger");
    const initial = q.formula("Initial Physical Damage"), bleedTotal = q.formula("Total Bleed Physical Damage"), bonusMin = q.formula("Minimum Bonus Physical Damage"), bonusMax = q.formula("Maximum Bonus Physical Damage"), qHeal = q.formula("Heal");
    const bleedInterval = q.quoted("every 0.5 seconds over 5 seconds", 0), bleedTime = q.quoted("every 0.5 seconds over 5 seconds", 1), recastDelay = q.quoted("recast after 0.5 seconds"), recastWindow = q.quoted("within 4 seconds"), executeHP = q.levelValue("The bleed executes minions");
    const qRange = q.field("targetRange"), qSpeed = q.field("speed"), qWidth = q.field("width"), qCD = q.cooldown(), qCast = q.castTime();
    q.quote("based on missing health before applying the remaining bleed damage"); q.textField("cooldownStart");
    q.gameQuote('"name":"RecastLockout","values":[0.75,0.75,0.75,0.75,0.75,0.75,0.75]');
    const huntTime = w.quoted("hunt for the next 5 seconds"), untargetTime = w.quoted("for the first 1 second"), vanishTime = w.quoted("first 0.9 seconds"), extraAt = w.quoted("After 1.25 seconds"), extraCount = w.quoted("summons 2 additional Packmates"), wAD = w.quoted("gains 20% AD") / 100, wMS = w.fraction("Bonus Movement Speed"), wCD = w.cooldown(), wCast = w.castTime();
    const extendTime = w.quoted("duration by 1.75 seconds"); w.quote("Naafiri can move during");
    const dashDamage = e.formula("Dash Physical Damage"), flurryDamage = e.formula("Flurry Physical Damage"), [eMin, eMax, eExtended] = e.fieldNumbers("targetRange"), eRadius = e.field("effectRadius"), eSpeed = e.field("speed"), eWidth = e.field("collisionRadius"), eCD = e.cooldown();
    if (eMin === undefined || eMax === undefined || eExtended === undefined) throw new Error("Naafiri: missing E dash endpoints");
    e.quote("healed to full health upon their reappearance"); e.quote("will not be affected by Eviscerate while under the effect of Hounds' Pursuit");
    const rDamage = r.formula("Physical Damage"), rPackDamage = r.formula("Physical Damage per Packmate"), rShield = r.formula("Shield"), channelTime = r.quoted("channel for 0.75 seconds"), rSlow = r.quoted("slows the target by 99%") / 100, rSlowTime = r.quoted("99% for 0.25 seconds", 1), rRange = r.field("targetRange"), rSpeed = r.field("speed"), rLanding = r.quoted("lands ~125 units"), takedownTime = r.quoted("within 7 seconds"), rRecastWindow = r.quoted("within 12 seconds"), shieldTime = r.quoted("shield for 3 seconds"), sightTime = r.quoted("for another 1.5 seconds"), pulseTime = r.quoted("for 1 second"), revealTime = r.quoted("within for 4 seconds"), sightRadius = r.field("effectRadius"), rCD = r.cooldown();
    r.quote("cast and dash do not break stealth"); r.quote("Spell shield will block Naafiri's collision damage but cannot prevent collision damage from Packmates"); r.quote("but not if they become untargetable");
    const hp = pet.stat("hp"), armor = pet.stat("armor"), mr = pet.stat("magicresist"), radius = pet.stat("radius"), pathRadius = pet.stat("pathingradius"), attackRange = pet.stat("range"), inheritedAS = pet.stat("attackspeed") / 100, inheritedMS = pet.stat("movespeed") / 100;
    const petDamage: Formula = { base: pet.stat("damage"), ratios: { bonusAD: pet.quoted("(+ 4% bonus AD)") / 100 } };
    const commandTime = pet.quoted("attack the target for 2 seconds"), pounceRange = pet.quoted("within 1300 units"), preyMultiplier = 1 + pet.quoted("deal 30% increased damage") / 100, preyTime = pet.quoted("within 3 seconds"), preyCap = pet.quoted("up to 3 empowered attacks"), monsterMultiplier = pet.quoted("155% damage to monsters") / 100, areaTaken = pet.quoted("55% (based on level) damage from area damage") / 100, meleeTaken = pet.quoted("200% damage from melee") / 100, nonChampTaken = pet.quoted("50% damage from non-epic monsters and minions") / 100;
    const leapSpeed = p.gameQuoted('"name":"LeapSpeed","values":[1250.0,1250.0,1250.0,1250.0,1250.0,1250.0,1250.0]');
    p.gameQuote('"name":"LeapMax","values":[1200.0,1200.0,1200.0,1200.0,1200.0,1200.0,1200.0]');
    const catchupMax = pet.quoted("capping at a total of {{as|1000 movement speed}} with a proximity of 700 units", 0), catchupDistance = pet.quoted("capping at a total of {{as|1000 movement speed}} with a proximity of 700 units", 1), catchupThreshold = pet.quoted("approximately 400-450 or more units away", 1);
    pet.quote("''Packmates'' will die with '''Naafiri''' when she does"); pet.quote("If '''Naafiri''' enters {{tip|stealth}}, her ''Packmates'' will do so as well"); pet.quote("retaining their relative position"); pet.quote("cannot perform ''Pouncing Assault'' while");
    pet.quote("has a special formula, this is just placeholder"); pet.quote("cannot have their attack speed and movement speed values be modified on their own");
    // Retain complete exact game arrays, not remembered single rank values.
    for (const data of [p, q, w, e, r]) data.gameQuote('objectPath:');
    const own = (ctx: HookContext) => petsOf(ctx.world, ctx.self.side, PACK);
    const ownTarget = (ctx: HookContext, target: Unit): Pet | undefined => target.petId === undefined ? undefined : ctx.world.pets.find((candidate) => candidate.id === target.petId);
    const classification = (target: Unit) => target.petId === undefined ? "champion" : target.spec.targetClass;
    const visible = (ctx: HookContext, target: Unit) => canSee(target, ctx.self) && !isUntargetable(target, ctx.self) && !inStasis(target);
    const resolveTarget = (world: World, pack: Pet): Unit | Pet | undefined => {
      if (world.tick >= Number(pack.memory.commandUntil ?? -1) || pack.memory.hidden || pack.memory.leaping || pack.memory.pursuing) return undefined;
      const target = Number(pack.memory.target ?? -2) === -1 ? world.units[pack.owner === 0 ? 1 : 0] : world.pets.find((candidate) => candidate.id === pack.memory.target);
      if (!target) return;
      const view = "owner" in target ? petFormulaTarget(target, world.units[pack.owner], world.tick) : target;
      return view.alive && canTarget(view, petFormulaTarget(pack, world.units[pack.owner], world.tick), world.units[pack.owner]) ? target : undefined;
    };
    const spawn = (ctx: HookContext, extra = false) => {
      const spec: PetSpec = { kind: PACK, name: pet.name, targetClass: "minion", hp, armor, mr, radius, pathingRadius: pathRadius, moveSpeed: derive(ctx.self).moveSpeed * inheritedMS, ignoreOwnMoveSpeedModifiers: true, ignoreOwnAttackSpeedSlows: true, duration: Infinity, areaTaken, meleeAttackTaken: meleeTaken, target: resolveTarget,
        attack: { range: attackRange, interval: 1 / (derive(ctx.self).attackSpeed * inheritedAS), effects: [{ type: "damage", damageType: "physical", amount: petDamage, petDamageCategory: "area", label: pet.name }], category: "area", attackLike: true },
        effectsForHit({ world, pet: pack, target }) {
          const owner = world.units[pack.owner], targetView = "owner" in target ? petFormulaTarget(target, owner, world.tick) : target;
          const frenzy = world.tick < Number(pack.memory.preyUntil ?? -1) && Number(pack.memory.prey ?? 0) > 0;
          if (frenzy) pack.memory.prey = Number(pack.memory.prey) - 1;
          const multiplier = (frenzy ? preyMultiplier : 1) * (targetView.spec.targetClass === "monster" ? monsterMultiplier : 1);
          return [{ type: "damage", damageType: "physical", amount: { base: evaluate(petDamage, owner, targetView) * multiplier }, noLifeSteal: true, petDamageCategory: "area", label: pet.name }];
        },
        onDamaged({ world, pet: pack, attacker, dealt }) {
          if (attacker.petId !== undefined && attacker.spec.targetClass === "minion") pack.hp += dealt * (1 - nonChampTaken);
          pack.memory.lastDamage = world.tick;
        },
      };
      const pack = spawnPet(ctx.world, ctx.self, spec, ctx.self.x); pack.memory.extra = extra; return pack;
    };
    const spawnTimer = (ctx: HookContext, seconds: number) => { ctx.memory.spawnAt = Math.max(ctx.tick, Number(ctx.memory.spawnAt ?? ctx.tick + ticks(spawnSeconds)) - ticks(seconds)); };
    const prey = (ctx: HookContext) => { for (const pack of own(ctx)) { pack.memory.prey = Math.min(preyCap, (ctx.tick < Number(pack.memory.preyUntil ?? -1) ? Number(pack.memory.prey ?? 0) : 0) + 1); pack.memory.preyUntil = ctx.tick + ticks(preyTime); } };
    const command = (ctx: HookContext, target: Unit) => {
      if (!visible(ctx, target)) return;
      const actual = ownTarget(ctx, target); if (actual?.spec.hitPoints) return;
      for (const pack of own(ctx)) {
        pack.memory.target = actual?.id ?? -1; pack.memory.commandUntil = ctx.tick + ticks(commandTime);
        const disabled = pack.statuses?.some((status) => status.kind === "cc" && ["root", "ground", "silence", "stun", "suppression", "airborne", "sleep", "fear", "charm", "taunt", "polymorph"].includes(status.key));
        if (!pack.memory.hidden && !pack.memory.pursuing && !disabled && Math.abs(pack.x - target.x) <= pounceRange && Math.abs(pack.x - target.x) > attackRange + target.spec.base.radius) pack.memory.leaping = true;
      }
    };
    const vanish = (ctx: HookContext, pack: Pet, kind: "W" | "E" | "R", until: number) => {
      pack.memory.hidden = kind; pack.memory.hiddenUntil = until; delete pack.windup; delete pack.memory.leaping;
      petEffects(ctx.world, ctx.self, pack, [{ type: "state", state: "untargetable", duration: Math.max(0, (until - ctx.tick) / 30) }]);
    };
    const reappear = (ctx: HookContext, pack: Pet, heal: boolean) => {
      pack.statuses = pack.statuses?.filter((status) => !(status.kind === "state" && status.key === "untargetable" && status.source === ctx.self.side));
      delete pack.memory.hidden; delete pack.memory.hiddenUntil; delete pack.memory.pursuing; pack.x = ctx.self.x; if (heal) pack.hp = hp;
    };
    const contacts = (ctx: HookContext) => [{ target: ctx.enemy, pet: undefined as Pet | undefined }, ...ctx.world.pets.filter((candidate) => candidate.owner !== ctx.self.side && !candidate.spec.hitPoints && candidate.hp > 0).map((candidate) => ({ target: petFormulaTarget(candidate, ctx.self, ctx.tick), pet: candidate }))];
    const hit = (ctx: HookContext, target: Unit, ability: AbilitySpec, effects: Effect[]) => { const actual = ownTarget(ctx, target); if (actual) abilityHitPet(ctx.world, ctx.self, actual, ability, effects, "area"); else abilityHit(ctx.world, ctx.self, target, ability, effects); };
    const bleed: Effect = { type: "dot", damageType: "physical", total: bleedTotal, duration: bleedTime, interval: bleedInterval, label: BLEED };
    const qHit: Effect[] = [{ type: "damage", damageType: "physical", amount: initial, petDamageCategory: "area" }, bleed];
    const eSlash: AbilitySpec = { key: "Eslash", name: `${e.name} (dash)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: dashDamage, petDamageCategory: "area" }] };
    const eFlurry: AbilitySpec = { ...eSlash, key: "Eflurry", name: `${e.name} (flurry)`, onHit: [{ type: "damage", damageType: "physical", amount: flurryDamage, petDamageCategory: "area" }] };
    const rHit: AbilitySpec = { ...eSlash, key: "Rhit", name: `${r.name} (collision)`, flags: { spellShield: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowTime }] };
    const rPack: AbilitySpec = { ...rHit, key: "Rpack", name: `${r.name} (Packmate collision)`, flags: { spellShield: false } };
    const rDash: AbilitySpec = { key: "Rdash", name: `${r.name} (dash)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "dash", direction: "target", distance: rRange, speed: rSpeed, through: true }, usable: () => false, flags: { grounded: true, knockdown: true } };
    const qSpec = (second: boolean): AbilitySpec => ({ key: second ? "Q2" : "Q", name: second ? `${q.name} (recast)` : q.name, slot: "Q", cooldown: second ? 0 : qCD, cost: second ? 0 : q.cost(), castTime: qCast, chain: second ? { root: "Q", index: 2, delay: recastDelay, window: recastWindow } : undefined, chainCooldown: second ? undefined : "last", cooldownKey: second ? "Q" : undefined, budgetExcluded: second, delivery: { kind: "line", range: qRange, speed: qSpeed, width: qWidth, piercing: true, collisionPet: true }, onHit: qHit, flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true, roles: ["damage"] });
    const startPursuit = (ctx: HookContext, recast: boolean) => {
      ctx.memory.rPhase = "channel"; ctx.memory.rAt = ctx.tick + ticks(channelTime); ctx.memory.rOrigin = ctx.self.x; ctx.memory.rTargetX = ctx.enemy.x; ctx.memory.rDirection = directionTo(ctx.self, ctx.enemy);
      if (!recast) { ctx.memory.rTakedownUntil = ctx.tick + ticks(takedownTime); ctx.memory.rRecastTriggered = false; }
      else { delete ctx.memory.rRecastUntil; ctx.apply({ type: "shield", amount: rShield, duration: shieldTime }, true); }
      ctx.apply({ type: "state", state: "revealed", duration: channelTime });
      for (const pack of own(ctx)) { pack.memory.pursuing = true; vanish(ctx, pack, "R", Infinity); }
      ctx.self.action = { kind: "channel", ability: recast ? "R2" : "R", startTick: ctx.tick, endTick: Number(ctx.memory.rAt), nextTick: Infinity, intervalTicks: 1 };
      const huntUntil = Number(ctx.memory.huntUntil ?? -1);
      if (huntUntil > ctx.tick) ctx.memory.huntUntil = Math.min(ctx.tick + ticks(huntTime), huntUntil + ticks(extendTime));
    };
    const stopPursuit = (ctx: HookContext) => { delete ctx.memory.rPhase; for (const pack of own(ctx)) if (pack.memory.pursuing) reappear(ctx, pack, false); };
    const canPursue = (self: Unit, world: World) => { const enemy = world.units[self.side === 0 ? 1 : 0]; return !self.memory.rPhase && Math.abs(self.x - enemy.x) <= rRange + EPS && canTarget(enemy, self); };
    const abilities: AbilitySpec[] = [qSpec(false), qSpec(true),
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cooldownAtCastStart: true, cost: w.cost(), castTime: wCast, moveWhileCasting: true, delivery: { kind: "self" }, roles: ["buff", "defense"], usable: (self, world) => world.tick >= Number(self.memory.huntUntil ?? -1) },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "dash", direction: "toward", distance: eMax, minDistance: eMin, speed: eSpeed, through: true, crossTerrain: true }, flags: { grounded: true, knockdown: true }, roles: ["damage", "engage", "escape"], estimate: (self, target) => evaluate(dashDamage, self, target) + evaluate(flurryDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cooldownAtCastStart: true, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, channel: { duration: channelTime, interruptible: true, completionThreat: "Rhit" }, flags: { grounded: true }, usable: canPursue, roles: ["damage", "engage"], estimate: (self, target) => evaluate(rDamage, self, target) + cap * evaluate(rPackDamage, self, target), estimateDelay: (self, target) => channelTime + Math.abs(self.x - target.x) / rSpeed },
      { key: "R2", name: `${r.name} (recast)`, slot: "R", cooldown: 0, cost: 0, castTime: 0, activation: "internal", budgetExcluded: true, delivery: { kind: "self" }, channel: { duration: channelTime, interruptible: true, completionThreat: "Rhit" }, flags: { grounded: true }, usable: (self, world) => world.tick < Number(self.memory.rRecastUntil ?? -1) && canPursue(self, world), roles: ["damage", "engage"] }, eSlash, eFlurry, rHit, rPack, rDash];
    const behavior: Behavior = (view) => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return normal;
      const reaction = react(view); if (reaction) return reaction;
      if (view.self.action || view.mode === "flee") return normal;
      const ready = (key: string) => canCast(view.world, view.self, abilities.find((ability) => ability.key === key)!);
      if (view.mode !== "trade" && view.mode !== "hold" && view.distance <= rRange && (ready("R2") || ready("R"))) return { kind: "cast", ability: ready("R2") ? "R2" : "R" };
      if (ready("Q2") && view.distance <= qRange) return { kind: "cast", ability: "Q2" };
      if (ready("W") && view.distance <= eMax + eRadius) return { kind: "cast", ability: "W" };
      if (ready("Q") && view.distance <= qRange) return { kind: "cast", ability: "Q" };
      if (ready("E") && view.distance <= eMax + eRadius) return { kind: "cast", ability: "E", aim: { direction: 1, distance: Math.min(eMax, Math.abs(view.enemy.x - view.self.x)) } };
      return normal;
    };
    kit.assume("The level-20 duel starts with the five Packmates explicitly supplied at game start. Their primary level series provide335.645HP,35.397resistances,21.1764705882353+4%bonusAD damage,25radius and125reach. They are actual Minion-class bodies, never clones. No preduel attack commands, bleeds, Prey Drive or hunt are prepared. Ordinary owner death removes all Packmates.");
    kit.assume("Packmates inherit the owner's current attack speed and movement speed every tick. Actual accepted basic contacts command their actual champion or pet recipient for two seconds. Q commands only its first visible non-minion contact; E only the nearest visible flurry contact with champion priority. Commands retain actual pet IDs. Prey Drive stores three30%empowerments with a three-second refresh; blind/dodge/parry preserve them and a damage-blocked connected basic consumes one. Monsters alone receive155%normal pet attack damage; ordinary summons do not.");
    kit.assume("The primary1300pounce reach takes precedence over binary LeapMax1200; binary LeapSpeed1250 supplies finite travel. Root/ground/silence and disabling CC prevent pounces. No unsupported hard leash is invented: uncommanded pets return toward the owner, with the documented catch-up speed cap1000at700distance. Exact catch-up acceleration and 400–450threshold are unquantified, so the upper approximate450threshold is used and speed interpolates from inherited speed there to the cap at700units while the owner moves away. Formation and lateral positions collapse to the owner point. Brush navigation and ambient Minion Hunter last-hits require a lane wave and are absent.");
    kit.assume("Q uses two separate piercing900-range100-width1700-speed missiles and a free recast after0.5seconds within4seconds. The primary0.5lockout overrides binary0.75. Cooldown begins after recast or window expiry. Bleed uses ten actual half-second pulses overfive seconds. Rehitting consumes only this Naafiri's remaining bleed, using missing health before the payoff packet; min/max base and bonusAD scaling interpolate independently. Initial contact and each tick can execute explicit minions below70HP, excluding hit-count objects. Generic Monster metadata cannot establish large/non-epic status, so monster-only healing and execution are not invented. Champions heal105+40%bonusAD only on an accepted bleed payoff. Released Q and existing bleeds survive owner death.");
    kit.assume("W's five-second hunt begins at declaration, including immediate one-second untargetability/ghosting,0.9-second Packmate vanish and a moving0.75-second cast. The20%AD bonus is recomputed from AD excluding its own buff, and30%movement speed follows current hunt time. Two additional Packmates appear after1.25seconds and expire in spawn-ID order when the hunt ends. Casting R extends the remaining hunt by1.75seconds up tofive. E vanishes non-pursuing Packmates through its real900-speed dash and returns them healed to full. A knocked-down E returns its pets without granting flurry damage. Terrain crossing uses the shared clear-endpoint rule; the sourced650extended terrain endpoint has no exact server extension rule and is not fabricated.");
    kit.assume("R is an actual stationary0.75-second channel followed by an interruptible1800-speed chase to the primary approximate125-unit front offset. Channel root/ground/silence and ordinary interrupting control cancel it. The target gains true sight during channel and standard sight for1.5seconds afterward. Untargetability does not cancel tracking but guards actual collision; stasis guards damage. The source omits the maximum tracking distance: the existing900cast range bounds updates from the original cast position, then the last accepted location is retained. Packmates independently collide for27.5+10%bonusAD, bypassing spell shields as stated; the champion collision is shieldable. Only real champion kills during the seven-second window grant the one free12-second recast and its200+150%bonusAD three-second shield. No fictional second victim or allied assist is supplied.");
    kit.assume("The ordinary policy reserves R in trade/hold and honors completed-trade retreat before optional casts. Reference hints count an ordinary two-dagger bleed cycle and finite normal Packmate attacks; W's AD uptime and two temporary pets are averaged over its cooldown. They grant no guaranteed low-health payoff, R recast or takedown shield.");
    kit.assume("The exact pet article labels its base-damage progression a placeholder for a special formula. The retained primary level series is used at level 20; a separate verified server formula is unavailable. Packmates inherit the owner's effective movement speed and attack interval, ignoring additional body-local speed modifiers while retaining disables and their actual status objects. Temporary replacement Packmates above the ordinary cap expire with the hunt.");
    kit.assume("Blink propagation detects position discontinuities larger than normal walking outside a dash; it is not a complete teleport-event system. The binary exposes HealthRegenDelay and HealthRegenPercent without its server timing rule, so ordinary pet regeneration is not guessed. E's explicit full-health restoration is implemented. Standard sight does not expose invisibility or override nearsight, and no full fog-of-war model is supplied.");
    return { abilities, behavior, attack: { onHitToPets: true },
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, uptime = huntTime / (wCD / haste + wCast), petRate = (cap + extraCount * uptime) * d.attackSpeed; return { physical: (2 * evaluate(initial, self, target) + evaluate(bleedTotal, self, target) + evaluate(bonusMin, self, target)) / (qCD / haste + recastDelay + qCast * 2) + evaluate(petDamage, self, target) * petRate + d.ad * d.attackSpeed * wAD * uptime }; }, healing: (self) => evaluate(qHeal, self) / (qCD / (1 + derive(self).abilityHaste / 100) + recastDelay + qCast * 2) },
      hooks: {
        onStart(ctx) { ctx.memory.spawnAt = ctx.tick + ticks(spawnSeconds); for (let i = 0; i < cap; i++) spawn(ctx); },
        onCastStart(ctx) {
          if (["Q", "Q2", "E"].includes(ctx.ability.key)) ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && ["invisible", "camouflage"].includes(status.key)));
          if (ctx.ability.key === "W") {
            ctx.buff("naafiri:huntAD", "AD", derive(ctx.self).ad * wAD, huntTime); ctx.buff("naafiri:huntMS", "moveSpeedPercent", wMS, huntTime);
            ctx.memory.huntUntil = ctx.tick + ticks(huntTime); ctx.memory.extraAt = ctx.tick + ticks(extraAt); ctx.memory.extraSpawned = false;
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "untargetable", duration: untargetTime }, { scale: 1, ability: ctx.ability });
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "ghosted", duration: untargetTime }, { scale: 1, ability: ctx.ability });
            for (const pack of own(ctx)) vanish(ctx, pack, "W", ctx.tick + ticks(vanishTime));
          }
        },
        onCast(ctx) {
          if (["Q", "Q2", "W", "E", "R", "R2"].includes(ctx.ability.key)) prey(ctx);
          if (ctx.ability.key === "E") { ctx.memory.ePrevious = ctx.self.x; for (const target of contacts(ctx)) { delete ctx.memory[`eHit:${target.pet?.id ?? -1}`]; delete ctx.memory[`flurryTarget:${target.pet?.id ?? -1}`]; } for (const pack of own(ctx)) if (!pack.memory.pursuing) vanish(ctx, pack, "E", Infinity); }
          if (ctx.ability.key === "R" || ctx.ability.key === "R2") startPursuit(ctx, ctx.ability.key === "R2");
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "Q" && ctx.ability.key !== "Q2") return;
          if (ownTarget(ctx, ctx.enemy)?.spec.hitPoints) return [];
          if (ctx.defense) return;
          const old = ctx.enemy.statuses.find((status) => status.kind === "dot" && status.source === ctx.self.side && status.dot?.label === BLEED && status.endTick >= ctx.tick);
          if (!old?.dot) return;
          const remaining = Math.max(0, Math.floor((old.endTick - Math.max(ctx.tick, old.dot.nextTick)) / old.dot.intervalTicks) + 1) * old.dot.perHit;
          const missing = Math.max(0, Math.min(1, 1 - ctx.enemy.hp / derive(ctx.enemy).maxHp));
          const payoff = evaluate(bonusMin, ctx.self, ctx.enemy) + missing * (evaluate(bonusMax, ctx.self, ctx.enemy) - evaluate(bonusMin, ctx.self, ctx.enemy));
          ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => status !== old);
          const actual = ownTarget(ctx, ctx.enemy);
          if (actual) actual.statuses = ctx.enemy.statuses;
          if (classification(ctx.enemy) === "champion") ctx.apply({ type: "heal", amount: qHeal }, true);
          return [qHit[0]!, { type: "damage", damageType: "physical", amount: { base: remaining + payoff }, petDamageCategory: "area", label: `${q.name} (bleed payoff)` }];
        },
        onAbilityHit(ctx) {
          if (["Q", "Q2", "Eslash", "Eflurry", "Rhit"].includes(ctx.ability.key) && classification(ctx.enemy) === "champion") spawnTimer(ctx, hitReduce);
          if (ctx.ability.key === "Q" || ctx.ability.key === "Q2") ctx.memory[`qAccepted:${ctx.enemy.petId ?? -1}`] = ctx.tick;
          if ((ctx.ability.key === "Q" || ctx.ability.key === "Q2") && classification(ctx.enemy) === "minion" && ctx.enemy.hp < executeHP) ctx.apply({ type: "execute", threshold: { base: executeHP } });
          if (ctx.ability.key === "Eflurry" && visible(ctx, ctx.enemy)) ctx.memory[`flurryTarget:${ctx.enemy.petId ?? -1}`] = true;
        },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "Q" && ctx.missile.source !== "Q2") return;
          const id = `qCommand:${ctx.missile.id}`;
          if (!ctx.memory[id] && ctx.memory[`qAccepted:${ctx.enemy.petId ?? -1}`] === ctx.tick && classification(ctx.enemy) !== "minion" && visible(ctx, ctx.enemy)) { ctx.memory[id] = true; command(ctx, ctx.enemy); }
        },
        onAttack(ctx) { ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && ["invisible", "camouflage"].includes(status.key))); },
        onAttackHit(ctx) { command(ctx, ctx.enemy); }, onAttackPetHit(ctx) { command(ctx, petFormulaTarget(ctx.pet, ctx.self, ctx.tick)); },
        onCCApplied(ctx) { if (ctx.memory.rPhase === "channel" && ["root", "ground", "silence"].includes(ctx.cc)) { ctx.self.action = undefined; stopPursuit(ctx); } },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R" || ctx.ability.key === "R2") stopPursuit(ctx); },
        onDashTick(ctx) {
          if (ctx.ability.key === "E") {
            const from = Number(ctx.memory.ePrevious), to = ctx.self.x;
            for (const contact of contacts(ctx)) if (!ctx.memory[`eHit:${contact.pet?.id ?? -1}`] && contact.target.x >= Math.min(from, to) - eWidth - contact.target.spec.base.radius - EPS && contact.target.x <= Math.max(from, to) + eWidth + contact.target.spec.base.radius + EPS) { ctx.memory[`eHit:${contact.pet?.id ?? -1}`] = true; hit(ctx, contact.target, eSlash, eSlash.onHit!); }
            ctx.memory.ePrevious = ctx.self.x;
          }
          if (ctx.ability.key === "Rdash") {
            if (Math.abs(ctx.enemy.x - Number(ctx.memory.rOrigin)) <= rRange) ctx.memory.rTargetX = ctx.enemy.x;
            const dir = Number(ctx.memory.rDirection), endpoint = Number(ctx.memory.rTargetX) - dir * rLanding, left = Math.abs(endpoint - ctx.self.x);
            ctx.action.perTick = (endpoint >= ctx.self.x ? 1 : -1) * Math.min(rSpeed / 30, left); ctx.action.endTick = ctx.tick + Math.max(0, Math.ceil(left / (rSpeed / 30)) - 1); ctx.action.stopAtContact = false;
            for (const pack of own(ctx)) if (pack.memory.pursuing) pack.x = ctx.self.x;
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "E") {
            const from = Number(ctx.memory.ePrevious), to = ctx.self.x;
            for (const contact of contacts(ctx)) if (!ctx.memory[`eHit:${contact.pet?.id ?? -1}`] && contact.target.x >= Math.min(from, to) - eWidth - contact.target.spec.base.radius - EPS && contact.target.x <= Math.max(from, to) + eWidth + contact.target.spec.base.radius + EPS) hit(ctx, contact.target, eSlash, eSlash.onHit!);
            for (const pack of own(ctx)) if (pack.memory.hidden === "E") reappear(ctx, pack, true);
            if (!ctx.interrupted) {
              for (const contact of contacts(ctx)) if (Math.abs(contact.target.x - ctx.self.x) <= eRadius + contact.target.spec.base.radius + EPS) hit(ctx, contact.target, eFlurry, eFlurry.onHit!);
              const targets = contacts(ctx).filter((contact) => ctx.memory[`flurryTarget:${contact.pet?.id ?? -1}`]).sort((a, b) => Number(classification(b.target) === "champion") - Number(classification(a.target) === "champion") || Math.abs(a.target.x - ctx.self.x) - Math.abs(b.target.x - ctx.self.x));
              if (targets[0]) command(ctx, targets[0].target);
            }
          }
          if (ctx.ability.key === "Rdash") {
            if (!ctx.interrupted && ctx.enemy.alive && Math.abs(ctx.self.x - ctx.enemy.x) <= rLanding + EPS) {
              abilityHit(ctx.world, ctx.self, ctx.enemy, rHit, rHit.onHit!);
              for (const pack of own(ctx)) if (pack.memory.pursuing) {
                const actor = petAttackActor(pack, ctx.self, ctx.tick);
                abilityHit(ctx.world, actor, ctx.enemy, rPack, [{ type: "damage", damageType: "physical", amount: { base: evaluate(rPackDamage, ctx.self, ctx.enemy) } }]); ctx.self.totals.damageDealt += actor.totals.damageDealt;
              }
              command(ctx, ctx.enemy);
            }
            stopPursuit(ctx);
          }
        },
        onKill(ctx) {
          spawnTimer(ctx, killReduce);
          if (!ctx.pet && ctx.tick <= Number(ctx.memory.rTakedownUntil ?? -1) && !ctx.memory.rRecastTriggered) { ctx.memory.rRecastTriggered = true; ctx.memory.rRecastUntil = ctx.tick + ticks(rRecastWindow); ctx.memory.pulseUntil = ctx.tick + ticks(pulseTime); if (Math.abs(ctx.enemy.x - ctx.self.x) <= sightRadius) ctx.apply({ type: "mark", key: "naafiri:standardSight", duration: revealTime }); }
        },
        onTick(ctx) {
          // Handle our actual DoTs before generic upkeep; advancing their clocks avoids duplicate pulses.
          for (const contact of contacts(ctx)) {
            const status = contact.target.statuses.find((entry) => entry.kind === "dot" && entry.dot?.label === BLEED && entry.source === ctx.self.side && entry.endTick >= ctx.tick), dot = status?.dot;
            if (!dot || ctx.tick < dot.nextTick) continue;
            dot.nextTick += dot.intervalTicks;
            if (contact.pet) contact.pet.statuses = contact.target.statuses;
            applyEffect(ctx.world, ctx.self, contact.target, { type: "damage", damageType: "physical", amount: { base: dot.perHit }, persistent: true, petDamageCategory: "persistent", label: BLEED }, { scale: 1 });
            if (classification(contact.target) === "minion" && contact.target.hp < executeHP) applyEffect(ctx.world, ctx.self, contact.target, { type: "execute", threshold: { base: executeHP } }, { scale: 1 });
          }
          if (ctx.memory.rPhase === "channel") {
            if (!ctx.enemy.alive || Math.abs(ctx.enemy.x - Number(ctx.memory.rOrigin)) > rRange + EPS) { ctx.self.action = undefined; stopPursuit(ctx); }
            else if (ctx.tick >= Number(ctx.memory.rAt)) {
              ctx.memory.rPhase = "dash"; ctx.apply({ type: "mark", key: "naafiri:standardSight", duration: sightTime });
              ctx.self.action = { kind: "dash", ability: "Rdash", startTick: ctx.tick - 1, endTick: ctx.tick + Math.ceil(rRange / (rSpeed / 30)), perTick: Number(ctx.memory.rDirection) * rSpeed / 30, through: true, stopAtContact: false, unstoppable: false, crossTerrain: true };
            }
          }
          const hunting = ctx.tick < Number(ctx.memory.huntUntil ?? -1), remaining = Math.max(0, (Number(ctx.memory.huntUntil ?? ctx.tick) - ctx.tick) / 30);
          const currentAD = ctx.self.statuses.filter((status) => status.memoKey === "buff:naafiri:huntAD").reduce((total, status) => total + status.value, 0);
          ctx.buff("naafiri:huntAD", "AD", hunting ? (derive(ctx.self).ad - currentAD) * wAD : 0, remaining);
          ctx.buff("naafiri:huntMS", "moveSpeedPercent", hunting ? wMS : 0, remaining);
          if (hunting && !ctx.memory.extraSpawned && ctx.tick >= Number(ctx.memory.extraAt)) { ctx.memory.extraSpawned = true; for (let i = 0; i < extraCount; i++) spawn(ctx, true); }
          if (!hunting) for (const pack of own(ctx).filter((candidate) => candidate.memory.extra).sort((a, b) => a.id - b.id)) destroyPet(ctx.world, pack);
          if (ctx.tick >= Number(ctx.memory.spawnAt)) { if (own(ctx).length < cap + (hunting ? extraCount : 0)) spawn(ctx, own(ctx).filter((pack) => !pack.memory.extra).length >= cap); ctx.memory.spawnAt = ctx.tick + ticks(spawnSeconds); }
          const previousX = Number(ctx.memory.previousX ?? ctx.self.x), blink = Math.abs(ctx.self.x - previousX) > derive(ctx.self).moveSpeed / 30 + EPS && ctx.self.action?.kind !== "dash";
          for (const pack of own(ctx)) {
            if (blink) pack.x += ctx.self.x - previousX;
            if (pack.memory.hidden && pack.memory.hidden !== "R" && ctx.tick >= Number(pack.memory.hiddenUntil)) reappear(ctx, pack, pack.memory.hidden === "E");
            const invis = ctx.self.statuses.filter((status) => status.kind === "state" && ["invisible", "camouflage"].includes(status.key));
            pack.statuses = [...(pack.statuses ?? []).filter((status) => status.memoKey !== "naafiri:stealth"), ...invis.map((status) => ({ ...status, memoKey: "naafiri:stealth" }))];
            pack.spec = { ...pack.spec, moveSpeed: pack.memory.hidden || pack.memory.leaping ? 0 : derive(ctx.self).moveSpeed * inheritedMS, attack: { ...pack.spec.attack!, interval: 1 / (derive(ctx.self).attackSpeed * inheritedAS) } };
            if (pack.memory.hidden) continue;
            if (pack.memory.leaping) {
              const actual = pack.memory.target === -1 ? ctx.enemy : ctx.world.pets.find((candidate) => candidate.id === pack.memory.target), target = actual && ("owner" in actual ? petFormulaTarget(actual, ctx.self, ctx.tick) : actual);
              const disabled = pack.statuses?.some((status) => status.kind === "cc" && ["root", "ground", "silence", "stun", "suppression", "airborne", "sleep", "fear", "charm", "taunt", "polymorph"].includes(status.key));
              if (!target || !target.alive || !visible(ctx, target) || disabled) delete pack.memory.leaping;
              else { const gap = Math.max(0, Math.abs(target.x - pack.x) - target.spec.base.radius - attackRange); pack.x += directionTo(petFormulaTarget(pack, ctx.self), target) * Math.min(leapSpeed / 30, gap); if (gap <= leapSpeed / 30 + EPS) delete pack.memory.leaping; }
            }
            if (!resolveTarget(ctx.world, pack) && !pack.memory.leaping && canMove(petFormulaTarget(pack, ctx.self, ctx.tick))) { const distance = Math.abs(ctx.self.x - pack.x), speed = derive(ctx.self).moveSpeed * inheritedMS, movingAway = (ctx.self.x - previousX) * (ctx.self.x - pack.x) > 0, catchup = movingAway ? speed + (catchupMax - speed) * Math.min(1, Math.max(0, (distance - catchupThreshold) / (catchupDistance - catchupThreshold))) : speed; pack.x += directionTo(petFormulaTarget(pack, ctx.self), ctx.self) * Math.min(distance, catchup / 30); }
          }
          ctx.memory.previousX = ctx.self.x;
        },
        onLethal(ctx) { for (const pack of own(ctx)) destroyPet(ctx.world, pack); return false; },
      },
    };
  },
};
export default naafiri;
