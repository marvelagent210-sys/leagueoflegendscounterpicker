/** Rengar's actual Ferocity casts, basic-attack leaps, and recent-health-loss Battle Roar. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackRange, attackTiming, canCast, canStartAttack, launchBonusAttack } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Action, Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const rengar: KitModule = {
  champion: "Rengar",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const ferocityMax = p.quoted("stacking up 4 times"), ferocitySeconds = p.quoted("Ferocity for 1 second"), combatSeconds = p.quoted("for 10 seconds after dealing or taking damage");
    const ferocitySpeed = p.levelValue("30 / 40 / 50 (based on level)% bonus movement speed") / 100, ferocitySpeedSeconds = p.quoted("movement speed for 1.5 seconds");
    const brushSeconds = p.quoted("lingers for 0.35 seconds"), leapRange = p.field("range"), leapLanding = p.field("targetRange"), leapSpeed = p.field("speed");
    const leapGain = p.quoted("generates 1 Ferocity"), trophyWindow = p.quoted("within 3 seconds of damaging them");
    const trophySeries = p.seriesIn("Trophies grant bonus attack damage");
    if (trophySeries.kind !== "variable") throw new Error("Rengar requires the pinned trophy series");
    const trophyFirst = Number(trophySeries.values[0]) / 100;
    p.quote("not refreshing on subsequent triggers"); p.quote("excluding damage dealt by damage over time or proc effects");
    p.quote("While grounded or rooted"); p.quote("Go off even if Rengar loses sight of the target"); p.quote("Not go off if the dash was interrupted");
    const qDamage = q.formula("Additional Physical Damage"), qEmpDamage: Formula = { base: q.levelValue("damage is modified to deal 35 – 240"), ratios: { AD: q.quoted("(+ 20% AD)") / 100 } };
    const qAS = q.quoted("gains 40% bonus attack speed") / 100, qAttacks = ({ two: 2 } as const)[q.quote("next two basic attacks").split(" ")[1] as "two"];
    const qWindow = q.quoted("within 3 seconds"), qBonusRange = q.quoted("gaining 25 bonus range"), qEmpAS = q.levelValue("50 – 101 (based on level)% bonus attack speed") / 100, qEmpASSeconds = q.quoted("attack speed for 5 seconds");
    q.quote("Casting Savagery does not break stealth"); q.textField("cooldownStart");
    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown();
    const wDamage = w.formula("Magic Damage"), wEmpDamage: Formula = { base: w.levelValue("damage is modified to deal 50 – 220"), ratios: { AP: w.quoted("(+ 80% AP)") / 100 } };
    const wRecent = w.quoted("last 1.5 seconds"), wFraction = w.quoted("stores 50%") / 100, wMonsterFraction = w.quoted("increased to 100%") / 100, wMonsterBonus = w.levelValue("65 – 130 (based on level) bonus magic damage"), wRadius = w.field("effectRadius");
    w.quote("Grey health will not be consumed upon casting Battle Roar"); w.quote("cleanses himself from all crowd control");
    const eDamage = e.formula("Physical Damage"), eEmpDamage: Formula = { base: e.levelValue("damage is modified to deal 50 – 305"), ratios: eDamage.ratios };
    const eSlow = e.fraction("Slow"), eSeconds = e.quoted("slows them for 1.75 seconds"), eReveal = e.quoted("revealing them for 2 seconds"), eRange = e.field("targetRange"), eCast = e.castTime(), eWidth = e.field("width");
    const missileObject = "Characters/Rengar/Spells/RengarEAbility/RengarEMis", empoweredMissileObject = "Characters/Rengar/Spells/RengarEEmpAbility/RengarEEmpMis";
    const eSpeed = e.gameQuoted('"mSpeed":1500.0', 0, missileObject), eMissileRadius = e.gameQuoted('"mMissileWidth":70.0', 0, missileObject);
    e.gameQuote('"mMissileWidth":70.0', empoweredMissileObject); e.quote("The target is rooted instead of slowed");
    e.quote("This ability will cast from wherever the caster is at the end of the cast time");
    e.quote("he will buffer them and cast them when Bola Strike completes");
    const rDuration = r.number("Effect Duration"), rSpeed = r.fraction("Bonus Movement Speed"), rFade = r.quoted("After a 2-second delay"), rCamouflageCap = r.quoted("camouflage can only last up to 14 seconds");
    const rRevealRange = r.field("effectRadius"), rMarkedRange = r.quoted("within 1600 range"), rDetection = r.quoted("Detection Radius: 710"), rBonus = r.quoted("deals 100% AD") / 100, rArmor = r.number("Armor Reduction"), rArmorSeconds = r.quoted("armor reduction for 4 seconds");
    r.quote("Attacking or casting abilities other than Savagery ends Thrill of the Hunt immediately"); r.textField("cooldownStart"); r.quote("If the attack is prevented or blocked");
    p.gameQuote('"name":"MaxFerocity","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]');
    w.gameQuote('"name":"HealingWindow","values":[1.5,1.5,1.5,1.5,1.5,1.5,1.5]');
    w.gameQuote('"SpecialCase_StasisLocked"');
    q.gameQuote('"name":"ASBonus","values":[40.0,40.0,40.0,40.0,40.0,40.0,40.0]');
    r.gameQuote('"name":"FadeTime","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');

    kit.assume("The duel starts with zero Ferocity and no Savagery, Thrill of the Hunt, recent damage, or Bonetooth trophies. The real resource holds at most four Ferocity; empowered Q/W/E are separate extra casts that spend all four without starting or resetting their ordinary counterpart's cooldown. No pre-duel takedowns, farm or Kha'Zix event trophy are granted. A real first unique champion kill in this duel can grant the sourced first trophy.");
    kit.assume("The environment's brush flag supplies abstract brush availability throughout the one-dimensional lane; no bush coordinates or invented movement into brush are available. With brush disabled, only actual camouflage grants Unseen Predator. Leaving brush availability retains the sourced 0.35-second linger. Leap range is 745 edge-to-edge, loses Savagery's 25 range while active, and is unavailable while rooted or grounded. The separately sourced 0.25-second range-transition delay is not simulated.");
    kit.assume("An Unseen Predator basic uses a real interruptible 1450-speed dash to 50 units before the target's location at leap start. Its captured basic packet hits on arrival even if the target moved or lost visibility; dead, removed, stasis and untargetable targets prevent the attack. Dash interruption cancels contact. Q/W/E/R may overlay a leap; E has no leap cast time. The ordinary attack timer starts at leap launch. General item/summoner movement overlays are outside this kit.");
    kit.assume("Savagery grants the pinned ordinary damage, not the outdated blurb's guaranteed critical strike. Each cast gives 40% AS for its next two declared attacks within three seconds. Ordinary and empowered AS instances stack; a later Savagery replaces a still-unused first-attack damage empowerment. Empowered Q additionally grants the level-20 107% AS for five seconds when its attack is consumed. Its ordinary cooldown begins at first attack launch or empowerment expiration. No miss-preservation or permanent-Ferocity bugs are invented.");
    kit.assume("Battle Roar heals from actual health lost in the preceding 1.5 seconds, excluding shield absorption and overkill. Monster-class sources store 100%; other sources store 50%. Grey health remains available to both normal and empowered casts until its original expiry. Each actual eligible area body receives separately guarded magic damage; only explicit monsters take the level-20 monster bonus. Empowered W cleanses all removable crowd control, including suppression, and is castable while disabled except during stasis; it grants no invented immunity. Q and W wait until Bola Strike's nonzero cast finishes rather than bypassing its sourced buffer rule; the simulator has no player-input queue.");
    kit.assume("Bola Strike is a finite first-contact projectile that independently respects spell shield, parry and projectile walls. Its empowered root inherits the ordinary 1.75-second control duration because the exact template says rooted instead of slowed without a separate duration. Both variants grant two seconds of true sight. The primary wiki 140 width and binary 70 collision radius agree; released bolas finish after caster death.");
    kit.assume("Thrill of the Hunt starts its 20-second duration on cast, gains camouflage after two seconds, and caps camouflage at 14 seconds. Primary wiki detection radius 710 takes precedence over the binary's conflicting 750. It reveals the actual opposing champion on entry to 3500 for the remaining effect, marks them within 1600, and breaks on attack declaration or non-Q ability declaration. Its extra basic damage precedes the four-second flat armor reduction and requires an unblocked connected attack. The source's unquantified very short residual attack mark is conservatively limited to the declared attack. No allies, alert UI, or multi-champion detection are invented.");
    kit.assume("The ordinary policy reserves offensive Thrill of the Hunt in hold and trade modes and preserves completed-trade retreat. Ferocity uses the wiki's level-20 extrapolations; the primary 50% empowered movement speed takes precedence over the binary's level-19 60% breakpoint.");

    const predator = (self: Unit, brush: boolean, tick: number) => !ccTypes(self).has("root") && !ccTypes(self).has("ground") && (brush || hasState(self, "camouflage") || tick < Number(self.memory.brushUntil ?? -1));
    const gain = (ctx: HookContext, amount = leapGain) => {
      if (ctx.self.resource === 0) ctx.memory.ferocityUntil = ctx.tick + ticks(ferocitySeconds);
      ctx.self.resource = Math.min(ferocityMax, ctx.self.resource + amount);
    };
    const combat = (ctx: HookContext) => { ctx.memory.combatUntil = ctx.tick + ticks(combatSeconds); };
    const endR = (ctx: HookContext) => {
      if (!ctx.memory.hunt) return;
      ctx.memory.hunt = false;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "R"));
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "R"));
      delete ctx.self.cooldownHeld.R;
      ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rCooldown, abilityHasteFor(ctx.self, { slot: "R" })));
    };
    const clearAttackReveal = (ctx: HookContext) => {
      const keep = (s: Unit["statuses"][number]) => !(s.source === ctx.self.side && s.ability === "huntAttack");
      ctx.enemy.statuses = ctx.enemy.statuses.filter(keep);
      for (const target of ctx.world.units) target.statuses = target.statuses.filter(keep);
      for (const target of ctx.world.pets) if (target.statuses) target.statuses = target.statuses.filter(keep);
    };
    const recent = (ctx: HookContext): Array<[number, number]> => (JSON.parse(String(ctx.memory.grey ?? "[]")) as Array<[number, number]>).filter(([tick]) => tick + ticks(wRecent) > ctx.tick);
    const roar = (ctx: HookContext) => { const history = recent(ctx); ctx.memory.grey = JSON.stringify(history); ctx.apply({ type: "heal", amount: { base: history.reduce((total, [, amount]) => total + amount, 0) } }, true); };
    const wPacket = (formula: Formula): Effect => ({ type: "damage", damageType: "magic", amount: formula, amountFor: (self, target) => evaluate(formula, self, target) + (target.spec.targetClass === "monster" ? wMonsterBonus : 0), petDamageCategory: "area" });
    const ePacket = (formula: Formula, empowered: boolean): Effect[] => [{ type: "damage", damageType: "physical", amount: formula, petDamageCategory: "singleTarget" }, { type: "cc", cc: empowered ? "root" : "slow", duration: eSeconds, ...(empowered ? {} : { strength: eSlow }) }, { type: "state", state: "revealed", duration: eReveal }];
    const normal = (self: Unit) => self.resource < ferocityMax;
    const empowered = (self: Unit) => self.resource >= ferocityMax && !inStasis(self);
    const bolaCasting = (self: Unit) => self.action?.kind === "cast" && (self.action.ability === "E" || self.action.ability === "E2");
    const eCastFor = (self: Unit) => self.action?.kind === "dash" && self.action.ability === "leap" ? 0 : eCast;
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, castTime: q.castTime(), delivery: { kind: "self" }, overlay: true, cooldownAfter: "empower", usable: (self) => normal(self) && !bolaCasting(self), roles: ["buff"] },
      { key: "Q2", name: `${q.name} (Ferocity)`, slot: "Q", cooldown: 0, cost: ferocityMax, castTime: 0, delivery: { kind: "self" }, overlay: true, usable: (self) => empowered(self) && !bolaCasting(self), budgetExcluded: true, roles: ["buff"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, castTime: w.castTime(), delivery: { kind: "aura", radius: wRadius }, onHit: [wPacket(wDamage)], overlay: true, usable: (self) => normal(self) && !bolaCasting(self), flags: { spellShield: true, petContactHooks: true }, roles: ["damage", "defense"] },
      { key: "W2", name: `${w.name} (Ferocity)`, slot: "W", cooldown: 0, cost: ferocityMax, castTime: 0, delivery: { kind: "aura", radius: wRadius }, onHit: [wPacket(wEmpDamage)], onSelf: [{ type: "cleanse", sticky: true }], overlay: true, usable: (self) => empowered(self) && !bolaCasting(self), budgetExcluded: true, flags: { spellShield: true, petContactHooks: true, usableWhileDisabled: true }, roles: ["damage", "defense"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, castTime: eCast, castTimeFor: eCastFor, castDirection: "start", delivery: { kind: "line", range: eRange, width: eWidth, radius: eMissileRadius, speed: eSpeed, collisionPet: true }, onHit: ePacket(eDamage, false), overlay: true, usable: normal, flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true },
      { key: "E2", name: `${e.name} (Ferocity)`, slot: "E", cooldown: 0, cost: ferocityMax, castTime: eCast, castTimeFor: eCastFor, castDirection: "start", delivery: { kind: "line", range: eRange, width: eWidth, radius: eMissileRadius, speed: eSpeed, collisionPet: true }, onHit: ePacket(eEmpDamage, true), overlay: true, usable: empowered, budgetExcluded: true, flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, castTime: r.castTime(), delivery: { kind: "self" }, overlay: true, cooldownAfter: "state", onSelf: [{ type: "state", state: "lingering", duration: rDuration }, { type: "stat", stat: "moveSpeedPercent", amount: { base: rSpeed }, duration: rDuration }], roles: ["engage", "buff"] },
      { key: "leap", name: p.name, slot: "other", cooldown: 0, castTime: 0, activation: "internal", budgetExcluded: true, usable: () => false, delivery: { kind: "dash", direction: "target", distance: leapRange, speed: leapSpeed }, flags: { grounded: true, knockdown: true } },
    ];
    const byKey = (key: string) => abilities.find((a) => a.key === key)!;
    const behavior: Behavior = (view) => {
      const fallback = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return fallback;
      const reaction = react(view); if (reaction) return reaction;
      const ready = (key: string) => canCast(view.world, view.self, byKey(key));
      if (ready("W2") && ccTypes(view.self).size) return { kind: "cast", ability: "W2" };
      if (view.mode === "flee") return fallback;
      if (view.self.action && view.self.action.kind !== "dash") return fallback;
      if (view.self.memory.hunt && view.world.tick < Number(view.self.memory.huntFade)) return view.mode === "hold" ? { kind: "move", direction: 0 } : { kind: "move", direction: 1 };
      if (view.mode !== "trade" && view.mode !== "hold" && ready("R") && view.distance > view.self.spec.attack.range && !view.self.memory.hunt) return { kind: "cast", ability: "R" };
      if (empowered(view.self)) {
        if (ready("W2") && recent({ memory: view.self.memory, tick: view.world.tick } as HookContext).reduce((n, [, value]) => n + value, 0) > derive(view.self).maxHp - view.self.hp && view.distance <= wRadius) return { kind: "cast", ability: "W2" };
        if (ready("Q2") && view.distance <= attackRange(view.self, view.enemy)) return { kind: "cast", ability: "Q2" };
        if (ready("E2") && view.distance <= eRange) return { kind: "cast", ability: "E2" };
      }
      if (ready("Q") && view.distance <= attackRange(view.self, view.enemy) && !view.self.statuses.some((s) => s.kind === "empower")) return { kind: "cast", ability: "Q" };
      if (canStartAttack(view.world, view.self)) return { kind: "attack" };
      if (ready("W") && view.distance <= wRadius) return { kind: "cast", ability: "W" };
      if (ready("E") && view.distance <= eRange) return { kind: "cast", ability: "E" };
      // Default movement/attacks are retained, but its generic offensive R selection is reserved.
      if ((view.mode === "hold" || view.mode === "trade") && fallback?.kind === "cast" && fallback.ability === "R") return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      return fallback;
    };
    return {
      abilities, behavior, resourceStart: 0, base: { resource: ferocityMax, resourceRegen: 0 },
      attack: { onHitToPets: true, bonusRangeFor: (self) => predator(self, !!self.memory.brush, Number(self.memory.now ?? 0)) ? leapRange - self.spec.attack.range - Math.max(0, ...self.statuses.filter((s) => s.kind === "empower").map((s) => s.empower?.bonusRange ?? 0)) : 0 },
      hooks: {
        onStart(ctx) { ctx.memory.brush = ctx.world.settings.environment.brush; ctx.memory.now = ctx.tick; },
        onTick(ctx) {
          ctx.memory.now = ctx.tick;
          if (ctx.world.settings.environment.brush) ctx.memory.brushUntil = ctx.tick + ticks(brushSeconds);
          ctx.memory.brush = ctx.world.settings.environment.brush;
          const casting = ctx.self.action?.kind === "cast" ? ctx.self.action : ctx.self.action?.kind === "dash" && ctx.self.action.resume?.kind === "cast" ? ctx.self.action.resume : undefined;
          if (!casting?.ability.endsWith("2") && ctx.self.resource > 0 && ctx.tick >= Math.max(Number(ctx.memory.ferocityUntil ?? 0), Number(ctx.memory.combatUntil ?? 0))) { ctx.self.resource = 0; ctx.memory.leapFerocity = false; }
          if (ctx.memory.hunt) {
            if (!ctx.self.alive || ctx.tick >= Number(ctx.memory.huntUntil)) endR(ctx);
            else {
              if (ctx.tick >= Number(ctx.memory.huntFade) && ctx.tick < Number(ctx.memory.huntFade) + ticks(rCamouflageCap) && !hasState(ctx.self, "camouflage")) applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "camouflage", duration: Math.min(Number(ctx.memory.huntUntil) - ctx.tick, ticks(rCamouflageCap)) / 30, value: rDetection }, { ability: byKey("R"), scale: 1 });
              if (ctx.enemy.alive && Math.abs(ctx.self.x - ctx.enemy.x) <= rRevealRange) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "revealed", duration: (Number(ctx.memory.huntUntil) - ctx.tick) / 30 }, { ability: byKey("R"), scale: 1 });
            }
          }
        },
        onCastStart(ctx) { if (!["Q", "Q2", "R"].includes(ctx.ability.key)) endR(ctx); },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (["Q2", "W2", "E2"].includes(key)) { ctx.memory.leapFerocity = false; ctx.buff("ferocitySpeed", "moveSpeedPercent", ferocitySpeed, ferocitySpeedSeconds); }
          if (key === "Q" || key === "Q2") {
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && (s.key === "Q" || s.key === "Q2")));
            ctx.apply({ type: "empower", attacks: 1, window: qWindow, bonusRange: qBonusRange, uncancellable: true, onHit: [], resetAttack: true }, true);
            ctx.memory[`${key}attacks`] = qAttacks; ctx.buff(`${key}speed`, "attackSpeed", qAS, qWindow);
          }
          if (key === "W" || key === "W2") { if (key === "W") gain(ctx); roar(ctx); }
          if (key === "E") gain(ctx);
          if (key === "R") { ctx.memory.hunt = true; ctx.memory.huntUntil = ctx.tick + ticks(rDuration); ctx.memory.huntFade = ctx.tick + ticks(rFade); }
        },
        onAttack(ctx) {
          const canLeap = predator(ctx.self, ctx.world.settings.environment.brush, ctx.tick);
          const key = ctx.action.empowered?.find((key) => key === "Q2" || key === "Q");
          if (key) {
            ctx.action.bonusPhysical = key === "Q2" ? qEmpDamage : qDamage;
            if (key === "Q2") ctx.buff("empoweredQSpeed", "attackSpeed", qEmpAS, qEmpASSeconds);
          }
          for (const kind of ["Q", "Q2"]) {
            const count = Number(ctx.memory[`${kind}attacks`] ?? 0); if (count <= 0) continue;
            ctx.memory[`${kind}attacks`] = count - 1;
            if (count === 1) ctx.buff(`${kind}speed`, "attackSpeed", 0, 0);
          }
          if (canLeap) ctx.action.attackTag = "predator";
          if (ctx.memory.hunt) {
            const melee = Math.abs(ctx.enemy.x - ctx.self.x) <= ctx.self.spec.attack.range + ctx.self.spec.base.radius + ctx.enemy.spec.base.radius;
            if (melee || (canLeap && ctx.enemy.petId === undefined && Math.abs(ctx.self.x - ctx.enemy.x) <= rMarkedRange)) {
              ctx.action.attackTag = canLeap ? "huntPredator" : "hunt";
              ctx.enemy.statuses.push({ kind: "state", key: "revealed", source: ctx.self.side, ability: "huntAttack", startTick: ctx.tick, endTick: Infinity, value: 0 });
              if (ctx.targetPet) ctx.targetPet.statuses = ctx.enemy.statuses;
              ctx.action.bonusPhysical = { base: ctx.action.bonusPhysical?.base ?? 0, ratios: { ...ctx.action.bonusPhysical?.ratios, AD: (ctx.action.bonusPhysical?.ratios?.AD ?? 0) + rBonus } };
            }
            endR(ctx);
          }
          if (canLeap && Math.abs(ctx.self.x - ctx.enemy.x) > ctx.self.spec.attack.range + ctx.self.spec.base.radius + ctx.enemy.spec.base.radius) { ctx.action.attackTag = ctx.action.attackTag === "huntPredator" ? "huntLeap" : "leap"; ctx.action.uncancellable = true; }
        },
        onAttackLaunch(ctx) {
          if (!ctx.enemy.alive || (ctx.action.pet !== undefined && !ctx.targetPet)) return false;
          if (ctx.action.empowered?.includes("Q")) gain(ctx);
          if (["predator", "huntPredator", "leap", "huntLeap"].includes(ctx.action.attackTag ?? "") && !ctx.memory.leapFerocity) { gain(ctx); ctx.memory.leapFerocity = true; }
          if (ctx.action.attackTag !== "leap" && ctx.action.attackTag !== "huntLeap") return;
          const dir = directionTo(ctx.self, ctx.enemy), distance = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - leapLanding), duration = Math.max(1, Math.ceil(distance / (leapSpeed / 30)));
          ctx.memory.leapPacket = JSON.stringify(ctx.action);
          ctx.memory.ferocityUntil = ctx.tick + ticks(ferocitySeconds);
          ctx.self.attackReadyTick = ctx.tick + attackTiming(ctx.self).total;
          ctx.self.action = { kind: "dash", ability: "leap", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: dir * distance / duration, stopAtContact: false, unstoppable: false, crossTerrain: true };
          return false;
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "leap") return;
          const packet = ctx.memory.leapPacket ? JSON.parse(String(ctx.memory.leapPacket)) as Extract<Action, { kind: "windup" }> : undefined;
          delete ctx.memory.leapPacket;
          if (!packet || ctx.interrupted || !ctx.self.alive) { clearAttackReveal(ctx); return; }
          const pet = packet.pet === undefined ? undefined : ctx.world.pets.find((pet) => pet.id === packet.pet);
          if (packet.pet !== undefined && !pet) return;
          const target = pet ?? ctx.enemy;
          if (pet ? pet.hp <= 0 || pet.spec.untargetable : !ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)) { clearAttackReveal(ctx); return; }
          launchBonusAttack(ctx.world, ctx.self, target, { ...packet, blinded: packet.blinded }, packet.onHit);
        },
        onAttackResolved(ctx) { clearAttackReveal(ctx); },
        onAttackPetResolved(ctx) { clearAttackReveal(ctx); },
        onAttackHit(ctx) { if (!ctx.blocked && (ctx.attack.attackTag === "hunt" || ctx.attack.attackTag === "huntPredator" || ctx.attack.attackTag === "huntLeap")) ctx.apply({ type: "stat", stat: "armorReduction", amount: { base: rArmor }, duration: rArmorSeconds }); },
        onAttackPetHit(ctx) { if (!ctx.blocked && (ctx.attack.attackTag === "hunt" || ctx.attack.attackTag === "huntPredator" || ctx.attack.attackTag === "huntLeap")) ctx.apply({ type: "stat", stat: "armorReduction", amount: { base: rArmor }, duration: rArmorSeconds }); },
        onDamageTaken(ctx) { if (ctx.amount <= 0) return; const history = recent(ctx); history.push([ctx.tick, ctx.amount * (ctx.enemy.spec.targetClass === "monster" ? wMonsterFraction : wFraction)]); ctx.memory.grey = JSON.stringify(history); combat(ctx); },
        onDamageDealt(ctx) { if (!ctx.persistent && ctx.amount > 0) { combat(ctx); if (ctx.enemy.petId === undefined) ctx.memory.championDamagedAt = ctx.tick; } },
        onKill(ctx) { if (ctx.pet || ctx.memory.trophy || (ctx.enemy.hp > 0 && ctx.tick - Number(ctx.memory.championDamagedAt ?? -Infinity) > ticks(trophyWindow))) return; ctx.memory.trophy = true; ctx.buff("bonetooth", "AD", derive(ctx.self).bonusAd * trophyFirst, Infinity); },
      },
      budget: {
        damage: (self, target) => ({ physical: evaluate(qDamage, self, target) / cooldownAfterHaste(qCooldown, derive(self).abilityHaste) + evaluate(eDamage, self, target) / cooldownAfterHaste(eCooldown, derive(self).abilityHaste) + evaluate(qEmpDamage, self, target) / (cooldownAfterHaste(qCooldown, derive(self).abilityHaste) * ferocityMax), magic: evaluate(wDamage, self, target) / cooldownAfterHaste(wCooldown, derive(self).abilityHaste) }),
      },
    };
  },
};
export default rengar;
