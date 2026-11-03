/** Miss Fortune uses real target identities for Love Tap and actual traveling R waves. */
import { SUSTAIN_WINDOW } from "../../engine/budget";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor } from "../../engine/rules/defense";
import { attackRange as currentAttackRange, attackTiming, canCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, scaled, ticks } from "./util";

const TAP = "missfortune:loveTap", STRUT = "missfortune:strutDamage";
const identity = (unit: Unit) => unit.petId === undefined ? `champion:${unit.side}` : `pet:${unit.petId}`;
const missFortune: KitModule = {
  champion: "MissFortune",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    p.quote("a mark that expires upon attacking a new enemy"); p.quote("The bonus damage applies life steal"); p.quote("halved to 25 / 30 / 35 / 40 / 45 / 50");
    const passiveSource = p.record.gameSources?.find((source) => source.text.some((text) => text.startsWith("mSpell.mSpellCalculations.TotalDamage:")));
    const calculationText = passiveSource?.text.find((text) => text.startsWith("mSpell.mSpellCalculations.TotalDamage:"));
    if (!calculationText) throw new Error("MissFortune: pinned level-twenty Love Tap game calculation is absent");
    p.gameQuote(calculationText, passiveSource!.object);
    const calculation = JSON.parse(calculationText.slice(calculationText.indexOf(":") + 1)) as { mFormulaParts: Array<{ mSubpart: { mLevel1Value: number; mBreakpoints: Array<{ mLevel: number; mAdditionalBonusAtThisLevel: number }> } }> };
    const levels = calculation.mFormulaParts[0]!.mSubpart;
    const loveRatio = levels.mLevel1Value + levels.mBreakpoints.filter((point) => point.mLevel <= 20).reduce((sum, point) => sum + point.mAdditionalBonusAtThisLevel, 0);
    // Client float serialization is rounded to its written decimal breakpoint precision.
    const love = Math.round(loveRatio * 1e6) / 1e6;
    const minionShare = p.gameQuoted('"mNumber":0.5');
    const basicSpeed = p.gameQuoted("mSpell.missileSpeed: 2000.0");
    const doubleDamage = q.formula("Physical Damage"), bounceRange = q.field("effectRadius"), shotSpeed = q.field("speed"), bounceCrit = q.quoted("critically strike for 150% damage") / 100;
    if (q.record.fields.castTime?.text !== "Basic Attack Timer") throw new Error("MissFortune: Double Up cast time must retain its Basic Attack Timer source");
    kit.evidence.push({ ability: q.name, page: q.record.page.title, revid: q.record.page.revid, text: "castTime: Basic Attack Timer" });
    q.field("targetRange"); q.quote("applying on-attack effects to the primary target and on-hit effects to both enemies hit"); q.quote("Double Up deals basic damage to both targets"); q.quote("the spell shield will not prevent the shot from bouncing"); q.quote("If Double Up kills the primary target, the bounce will critically strike"); q.quote("target does not have to be visible to be hit by the bounce"); q.quote("range adjusts based on Miss Fortune's attack range"); q.quote("does not go on cooldown nor pay its cost");
    const strutFirst = w.quoted("after 4 seconds without taking non-periodic damage"), strutSecond = w.quoted("after another 3 seconds"), strutMS = w.baseOf("Bonus Movement Speed"), strutFull = w.baseOf("Increased Bonus Movement Speed"), strutAS = w.fraction("Bonus Attack Speed"), strutSeconds = w.quoted("attack speed for 4 seconds"), strutRefund = w.quoted("cooldown by 2 seconds");
    w.tip("2 seconds"); w.quote("bonus movement speed is not lost from taking 0 damage instances");
    const rainDamage = e.formula("Magic Damage Per Tick"), rainTotal = e.formula("Total Magic Damage"), rainSeconds = e.quoted("for 2 seconds"), rainInterval = e.quoted("every 0.25 seconds"), rainSlow = e.quoted("slowing them by 40%") / 100, rainSlowAP = e.quoted("(+ 6% per 100 AP)") / 100 / 100;
    e.quote("slow cannot be cleansed");
    const waveDamage = r.formula("Physical Damage per Wave"), waves = r.baseOf("Total Waves"), channelSeconds = r.quoted("channels for up to 3 seconds"), waveCrit = r.quoted("critically strike for 145% damage") / 100, firstWave = r.quoted("fires the first wave at 0.066"), lastWave = r.quoted("last at 2.904"), waveRange = r.field("effectRadius"), waveWidth = r.field("width"), waveSpeed = r.field("speed");
    r.quote("Targets cannot be damaged by more than one projectile per wave"); r.quote("calculated when the wave reaches the target"); r.quote("the cone will fire towards her new facing direction"); r.quote("effective cast time of 0.033"); r.textField("cooldownStart");
    const attackRange = kit.champion.forms[0]!.stats.attackRange, rCastTime = r.castTime();
    const loveDamage = (self: Unit, target: Unit) => self.memory[TAP] === identity(target) ? 0 : derive(self).ad * love * (target.petId === undefined ? 1 : minionShare);
    const mark = (ctx: HookContext) => {
      const target = identity(ctx.enemy);
      if (ctx.memory[TAP] === target) return;
      ctx.memory[TAP] = target;
      ctx.apply({ type: "refund", ability: "W", seconds: strutRefund / (1 + derive(ctx.self).abilityHaste / 100) }, true);
    };
    const updateStrut = (ctx: HookContext) => {
      const elapsed = ctx.tick - Number(ctx.memory[STRUT] ?? -ticks(strutFirst + strutSecond));
      const speed = elapsed >= ticks(strutFirst + strutSecond) ? strutFull : elapsed >= ticks(strutFirst) ? strutMS : 0;
      ctx.buff("missfortune:strutMS", "moveSpeedFlat", speed, 2 / 30);
    };
    const wave: AbilitySpec = { key: "Rwave", name: `${r.name} (wave)`, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, projectile: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: waveDamage, canCrit: true, critMultiplier: waveCrit, persistent: true, petDamageCategory: "persistent" }] };
    const bounce: AbilitySpec = { key: "Qbounce", name: `${q.name} (bounce)`, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, projectile: true, parry: true, appliesOnHit: true, appliesLifeSteal: true, basicDamage: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: doubleDamage, canCrit: true, critMultiplier: bounceCrit }] };
    const killBounce: AbilitySpec = { ...bounce, key: "QkillBounce", name: `${q.name} (kill bounce)`, onHit: [{ type: "damage", damageType: "physical", amount: scaled(doubleDamage, bounceCrit) }] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: 0, castTimeFor: (self) => attackTiming(self).windup / 30, cancelOnInvalidTarget: true, delivery: { kind: "target", range: attackRange, rangeFor: (self, target) => currentAttackRange(self, target), edge: true, missileSpeed: shotSpeed }, flags: { spellShield: true, projectile: true, parry: true, appliesOnHit: true, appliesLifeSteal: true, basicDamage: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: doubleDamage }] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: strutAS }, duration: strutSeconds }], roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "field", range: e.field("targetRange"), radius: e.field("effectRadius"), duration: rainSeconds, interval: rainInterval }, onHit: [{ type: "damage", damageType: "magic", amount: rainDamage, persistent: true }, { type: "cc", cc: "slow", strength: rainSlow, duration: rainInterval + 1 / 30, sticky: true }], flags: { spellShield: false, projectile: false }, roles: ["damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, cost: r.cost(), castTime: rCastTime, delivery: { kind: "aura", radius: waveRange }, channel: { duration: channelSeconds, interruptible: true, range: waveRange }, flags: { spellShield: false, projectile: true }, roles: ["damage"], estimate: (self, target) => evaluate(waveDamage, self, target) * averageCritFactor(derive(self).critChance, waveCrit), estimateDelay: (self, target) => Math.max(0, ticks(firstWave) - ticks(rCastTime)) / 30 + Math.max(0, Math.abs(target.x - self.x) - target.spec.base.radius) / waveSpeed },
      bounce, killBounce, wave,
    ];
    const behavior: Behavior = (view) => {
      if ((view.mode === "fight" || view.mode === "trade") && !view.self.action && canCast(view.world, view.self, abilities[2]!) && canCast(view.world, view.self, abilities[3]!) && view.distance <= waveRange) return { kind: "cast", ability: "E" };
      return defaultBehavior(view);
    };
    kit.assume("Love Tap uses the version-pinned game's explicit level-20 breakpoint: 110% AD, conflicting with the wiki description's 100% cap at level 13. The exact game calculation and its SHA/version remain visible as separate evidence. The mark belongs to the last actually contacted target, including individual summons. Ordinary minion summons receive the game's 50% factor. Its bonus joins the ordinary noncritical part of a basic attack and applies life steal; Q carries its own basic-damage Love Tap packet. Blocked, dodged, parried and spell-shielded contacts do not change the mark or refund Strut.");
    kit.assume("Double Up uses the current basic-attack windup and dynamically adjusts edge range with attack-range buffs. Invalidated cast targets cancel without cost/cooldown. Its primary target is the enemy champion under the arena's unit-targeted cast API; the policy cannot directly select a summoned primary target. Actual homing primary contacts, including spell shields, search real enemies behind the primary within 500 center-to-center units and launch a separate homing bounce. The one-dimensional line removes the four angular priority bands; the nearest directly behind target wins, and invisibility does not hide it. A killed primary forces the actual bounce's 150% crit. No target means no damage-bearing bounce and no invented dud damage.");
    kit.assume("Strut starts fully built after an assumed out-of-combat approach. Positive nonperiodic health damage resets its movement stages; fully shielded or zero-health-damage packets and persistent damage do not. Its active restores the full movement stage immediately and grants the sourced four-second attack-speed buff. Each new Love Tap target refunds two seconds divided by one plus ability haste, without starting a ready cooldown.");
    kit.assume("Make It Rain uses eight fixed-location quarter-second damage pulses over two seconds. Its AP-scaled, noncleanseable slow is refreshed only while an actual target intersects the field and persists through the next scheduled pulse plus one tick; no map-fog vision or true sight is invented. Independent pets receive spatial field damage.");
    kit.assume("Bullet Time fires exactly 18 waves at maximum rank on ordinal absolute clocks from the sourced 0.066 through 2.904 seconds after declaration; each rounded time is independent, avoiding interval drift. Each wave is one piercing 2000-speed missile along the current facing axis, with at most one hit per actual target and impact-time stats/missing defenses. This represents one hit from the six angular streams in the one-dimensional arena, without multiplying damage by six. Already launched missiles persist after interruption/death; no future waves fire after channel cancellation. Facing can change if another actual action updates it; there is no free automatic target tracking. Root alone does not interrupt, silence/stun do, and projectile walls can stop each wave. Spell shields do not block persistent R or E damage.");
    kit.assume("The stat budget values one opening Love Tap over its ten-second reference window, the full eighteen R waves per root R cooldown, and Strut's four-second attack-speed uptime capped by the sourced normal attack-speed limit. It does not assume a lane of free bounce targets or repeated same-target Love Taps. Actual channel interruption, flight, cooldown refunds and field exposure are combat outcomes.");
    return {
      attack: { missileSpeed: basicSpeed, ranged: true, projectile: true, onHitToPets: true, bonusPhysicalFor: (self, target) => loveDamage(self, target) }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, rCycle = abilities[3]!.cooldown / haste, wCycle = abilities[1]!.cooldown / haste, gainedAS = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, strutAS)) - d.attackSpeed); return { physical: d.ad * love / SUSTAIN_WINDOW + evaluate(waveDamage, self, target) * waves * averageCritFactor(d.critChance, waveCrit) / rCycle + attackDamage(self) * gainedAS * Math.min(1, strutSeconds / wCycle) }; } },
      hooks: {
        onStart(ctx) { ctx.memory[STRUT] = -ticks(strutFirst + strutSecond); updateStrut(ctx); },
        onTick(ctx) {
          updateStrut(ctx);
          if (ctx.self.action?.kind !== "channel" || ctx.self.action.ability !== "R") return;
          const start = Number(ctx.memory["missfortune:rStart"] ?? ctx.tick), done = Number(ctx.memory["missfortune:rWaves"] ?? 0);
          for (let ordinal = done; ordinal < waves; ordinal++) {
            const due = start + ticks(firstWave + (lastWave - firstWave) * ordinal / Math.max(1, waves - 1));
            if (ctx.tick < due) break;
            const direction = ctx.self.facing ?? (Number(ctx.memory["missfortune:rDirection"] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1);
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rwave", seenTick: start, x: ctx.self.x, perTick: waveSpeed / 30, piercing: true, radius: waveWidth / 2, collisionPet: true, homing: false, direction, travelLeft: waveRange, projectile: true, connects: true, scale: 1, onHit: wave.onHit! });
            ctx.memory["missfortune:rWaves"] = ordinal + 1;
          }
        },
        onDamageTaken(ctx) { if (!ctx.persistent && ctx.amount > 0) { ctx.memory[STRUT] = ctx.tick; updateStrut(ctx); } },
        onAttackHit(ctx) { if (!ctx.blocked) mark(ctx); },
        onAttackPetHit(ctx) { if (!ctx.blocked) mark(ctx); },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E") return ctx.effects.map((effect) => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: Math.min(1, rainSlow + rainSlowAP * derive(ctx.self).ap) } : effect);
          if (!["Q", "Qbounce", "QkillBounce"].includes(ctx.ability.key) || ctx.defense) return;
          const raw = loveDamage(ctx.self, ctx.enemy);
          if (raw <= 0) return;
          return [...ctx.effects, { type: "damage", damageType: "physical", amount: { base: raw }, petDamageCategory: "proc", label: p.name }];
        },
        onAbilityHit(ctx) {
          if (!["Q", "Qbounce", "QkillBounce"].includes(ctx.ability.key)) return;
          if (ctx.enemy.statuses.some((status) => status.kind === "state" && status.key === "blockAttacks")) return;
          mark(ctx);
        },
        onCastStart(ctx) { if (ctx.ability.key === "R") { ctx.memory["missfortune:rStart"] = ctx.tick; ctx.memory["missfortune:rDirection"] = ctx.self.facing ?? directionTo(ctx.self, ctx.enemy); } },
        onCast(ctx) {
          if (ctx.ability.key === "W") { ctx.memory[STRUT] = ctx.tick - ticks(strutFirst + strutSecond); updateStrut(ctx); }
          if (ctx.ability.key === "R") { ctx.memory["missfortune:rStart"] ??= ctx.tick - ticks(ctx.ability.castTime); ctx.memory["missfortune:rWaves"] = 0; }
        },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "Q") return;
          if (isUntargetable(ctx.targetPet ? petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick) : ctx.enemy, ctx.self)) return;
          const primaryX = ctx.targetPet?.x ?? ctx.enemy.x, direction = (primaryX >= ctx.self.x ? 1 : -1) as 1 | -1;
          const candidates: Array<{ unit: Unit; pet?: Pet }> = [];
          const rival = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
          if (ctx.targetPet && rival.alive && !isUntargetable(rival, ctx.self)) candidates.push({ unit: rival });
          for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.id !== ctx.targetPet?.id && !pet.spec.hitPoints && !pet.spec.untargetable && pet.hp > 0) {
            const target = petFormulaTarget(pet, ctx.self, ctx.tick); if (!isUntargetable(target, ctx.self)) candidates.push({ unit: target, pet });
          }
          const chosen = candidates.filter(({ unit }) => (unit.x - primaryX) * direction > 1e-6 && Math.abs(unit.x - primaryX) <= bounceRange + 1e-6).sort((a, b) => Math.abs(a.unit.x - primaryX) - Math.abs(b.unit.x - primaryX) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1))[0];
          if (!chosen) return;
          const killed = ctx.targetPet ? ctx.targetPet.hp <= 0 : ctx.enemy.hp <= 0 || !!ctx.enemy.fallen;
          const spec = killed ? killBounce : bounce;
          ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: spec.key, seenTick: ctx.tick, x: primaryX, perTick: shotSpeed / 30, homing: true, direction, travelLeft: Number.POSITIVE_INFINITY, projectile: true, connects: true, scale: 1, onHit: spec.onHit!, ...(chosen.pet ? { pet: chosen.pet.id } : {}) });
        },
      },
    };
  },
};
export default missFortune;
