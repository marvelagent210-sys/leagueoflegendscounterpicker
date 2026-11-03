/** Sona: source-bound melodies, attack snapshots and actual ally Accelerando credits. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canTarget, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petAttackActor } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const STACKS = "sona:accelerando", CHORD = "sona:chord", LAST = "sona:last";
const AURA = "sona:aura", AURA_END = "sona:auraEnd", AURA_ID = "sona:auraId";
const MELODY = "sona:melody", EPSILON = 1e-6;
type Body = { target: Unit; pet?: Pet };

const sona: KitModule = {
  champion: "Sona",
  options: { accelerando: { label: "Accelerando stacks already earned (0–120)", default: 0 } },
  build(kit, options) {
    const p = kit.ability("Power Chord"), q = kit.ability("Hymn of Valor"), w = kit.ability("Aria of Perseverance"), e = kit.ability("Song of Celerity"), r = kit.ability("Crescendo");
    const cap = p.quoted("stacking up to 120 times"), perStack = p.quoted("0.5 basic ability haste"), refund = p.quoted("by 1.5 seconds each time"), chordCap = p.quoted("At 3 stacks"), global = p.quoted("0.5-second global cooldown"), auraTime = p.quoted("a unique aura for 3 seconds");
    p.quote("Only one aura can be active at a time"); p.quote("The effect does not change if abilities are used while the projectile is in motion"); p.quote("retains Power Chord's stacks when entering resurrection"); p.quote("Gaining Power Chord's empowered attack resets Sona's basic attack timer");
    p.quote("spellshield  = True"); p.quote("parry        = True");
    p.gameQuote('"name":"AccelerandoAHPerStack","values":[0.5,0.5,0.5,0.5,0.5,0.5,0.5]');
    const chordDamage: Formula = { base: p.levelValue("At 3 stacks, her next basic attack"), ratios: { AP: p.quoted("(+ 20% AP)") / 100 } };
    const staccatoDamage: Formula = { base: p.levelValue("Hymn of Valor - Staccato"), ratios: { AP: p.quoted("(+ 30% AP)") / 100 } };
    const weaken = p.quoted("damage dealt by 25%") / 100, weakenAP = p.quoted("(+ 4% per 100 AP)") / 10000, weakenTime = p.quoted("for 3 seconds"), tempo = p.quoted("Slows the target by 50%") / 100, tempoTime = p.quoted("for 2 seconds"), tempoCap = p.quoted("capped at 99%") / 100;
    p.quoted("size by 8%");
    const qDamage = q.formula("Magic Damage"), qMelody: Formula = { base: q.baseOf("Bonus Magic Damage"), ratios: { AP: q.quoted("10% of Sona's AP") / 100 } }, qRange = q.field("effectRadius", "Sound bolts search range"), auraRange = q.field("effectRadius", "Aura radius"), qSpeed = q.field("speed"), qWindow = q.quoted("within 5 seconds"), qSight = q.quoted("for 1 second"), qCount = q.gameQuoted('"name":"EnemiesToHit","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');
    q.quote("prioritizing champions"); q.quote("The bolts deal area damage"); q.gameQuote('"mSpeed":1300.0');
    const wHeal = w.formula("Heal"), wShield: Formula = { base: w.baseOf("Shield Strength"), ratios: { AP: w.quoted("25% of Sona's AP") / 100 } }, wThreshold = w.number("Minimum Damage Mitigated"), wRange = w.field("effectRadius", "Heal search range"), wShieldTime = w.quoted("shield for 1.5 seconds"), wSpeed = w.field("speed");
    w.quote("Based on greatest % missing health"); w.quote("If no one is injured"); w.quote("will follow an ally in stealth but will not reveal them"); w.gameQuote('"mSpeed":1300.0');
    const eSelf = e.quoted("gains 20%") / 100, eAP = e.quoted("2% per 100 AP") / 10000, eLong = e.quoted("for 7 seconds"), eShort = e.quoted("if 3 seconds have elapsed"), eAlly = e.baseOf("Bonus Movement Speed") / 100, eAllyTime = e.quoted("for 3 seconds");
    e.field("effectRadius"); e.gameQuote('"name":"SelfMovementSpeedDurationMin","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]');
    const rDamage = r.formula("Magic Damage"), rStun = r.quoted("stuns them for 1.5 seconds"), rRange = r.field("range"), rWidth = r.field("width"), rSpeed = r.field("speed");
    r.quote("This ability will cast from wherever the caster is at the start of the cast time"); r.gameQuote('"mLineWidth":140.0');
    const qCD = q.cooldown(), wCD = w.cooldown(), eCD = e.cooldown(), initial = Math.min(cap, Math.max(0, Math.floor(options.accelerando ?? 0)));
    const stackCount = (self: Unit) => Number(self.memory[STACKS] ?? initial);
    const basicCooldown = (base: number, self: Unit) => base * (100 + derive(self).abilityHaste) / (100 + derive(self).abilityHaste + perStack * stackCount(self));
    const addStack = (ctx: HookContext) => {
      const current = stackCount(ctx.self);
      if (current < cap) ctx.memory[STACKS] = current + 1;
      else if ((ctx.self.cooldownReady.R ?? 0) > ctx.tick) ctx.self.cooldownReady.R = Math.max(ctx.tick, ctx.self.cooldownReady.R! - ticks(refund));
    };
    const friendly = (world: World, self: Unit) => world.pets.filter(pet => pet.owner === self.side && pet.hp > 0 && pet.spec.targetClass === "champion" && !pet.spec.hitPoints && !pet.spec.fixedDamage);
    const applyAlly = (ctx: HookContext, body: Body, effect: Effect, spell: AbilitySpec) => {
      applyEffect(ctx.world, ctx.self, body.target, effect, { ability: spell, scale: 1 });
      if (body.pet) { body.pet.statuses = body.target.statuses; body.pet.hp = body.target.hp; }
    };
    const chordProc = (key: "Q" | "W" | "E"): AbilitySpec => ({ key: `I-${key}`, name: `Power Chord – ${key === "Q" ? "Staccato" : key === "W" ? "Diminuendo" : "Tempo"}`, slot: "other", activation: "internal", budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, parry: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: key === "Q" ? staccatoDamage : chordDamage, noLifeSteal: true, petDamageCategory: "proc" }], usable: () => false });
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", budgetExcluded: true, cooldown: qCD, cooldownFor: self => basicCooldown(qCD, self), cost: q.cost(), castTime: q.castTime(), delivery: { kind: "self" }, roles: ["damage", "buff"], estimate: (self, target) => evaluate(qDamage, self, target) },
      { key: "W", name: w.name, slot: "W", budgetExcluded: true, cooldown: wCD, cooldownFor: self => basicCooldown(wCD, self), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, roles: ["defense"] },
      { key: "E", name: e.name, slot: "E", budgetExcluded: true, cooldown: eCD, cooldownFor: self => basicCooldown(eCD, self), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, roles: ["buff"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: rRange, width: rWidth, speed: rSpeed, piercing: true, collisionPet: true }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "stun", duration: rStun }], roles: ["damage", "cc"] },
      { key: "Q-bolt", name: q.name, slot: "Q", activation: "internal", budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage, petDamageCategory: "area" }], usable: () => false, persistsAfterDeath: true },
      { key: "W-tone", name: w.name, slot: "W", activation: "internal", budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, persistsAfterDeath: true },
      { key: "W-shield", name: w.name, slot: "W", activation: "internal", budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false },
      chordProc("Q"), chordProc("W"), chordProc("E"),
    ];
    const byKey = (key: string) => abilities.find(spell => spell.key === key)!;
    const setAura = (ctx: HookContext, key: string) => { ctx.memory[AURA] = key; ctx.memory[AURA_END] = ctx.tick + ticks(auraTime); ctx.memory[AURA_ID] = ctx.world.nextId++; };
    const tag = (ctx: HookContext) => {
      if (ctx.tick >= Number(ctx.memory[AURA_END] ?? 0)) return;
      const key = String(ctx.memory[AURA]), serial = Number(ctx.memory[AURA_ID]);
      const bodies: Body[] = [{ target: ctx.self }, ...friendly(ctx.world, ctx.self).filter(pet => Math.abs(pet.x - ctx.self.x) - pet.spec.radius <= auraRange + EPSILON && canTargetPet(pet, ctx.self, ctx.tick, ctx.self, { alliedInvisibility: true })).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
      for (const body of bodies) {
        const id = body.pet?.id ?? "self", seen = `sona:tag:${serial}:${id}`;
        if (ctx.memory[seen]) continue;
        ctx.memory[seen] = true;
        if (key === "Q") {
          body.target.statuses = body.target.statuses.filter(status => !(status.kind === "mark" && status.key === MELODY && status.source === ctx.self.side));
          body.target.statuses.push({ kind: "mark", key: MELODY, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(qWindow), value: evaluate(qMelody, ctx.self) });
        } else if (key === "W") {
          body.target.statuses = body.target.statuses.filter(status => !(status.kind === "shield" && status.key === "W-shield" && status.source === ctx.self.side));
          applyAlly(ctx, body, { type: "shield", amount: wShield, duration: wShieldTime }, byKey("W-shield"));
          const shield = body.target.statuses.findLast(status => status.kind === "shield" && status.key === "W-shield" && status.source === ctx.self.side)!;
          shield.memoKey = `sona:shield:${serial}:${id}`;
        } else if (key === "E" && body.pet) applyAlly(ctx, body, { type: "stat", stat: "moveSpeedPercent", amount: { base: eAlly + eAP * derive(ctx.self).ap }, duration: eAllyTime }, byKey("E"));
        if (body.pet) body.pet.statuses = body.target.statuses;
      }
    };
    const launch = (ctx: HookContext, body: Body, source: string, speed: number, payload: Effect[], beneficial = false) => {
      const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source, seenTick: ctx.tick, x: ctx.self.x, perTick: speed / 30, homing: true, direction: directionTo(ctx.self, body.target), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: payload, ...(body.pet ? { pet: body.pet.id } : {}), ...(beneficial ? { perceptionHidden: true } : {}) };
      ctx.world.missiles.push(missile);
    };
    const melodyHit = (ctx: HookContext, source: Unit, holder: Unit, target: Unit, blocked: boolean, holderPet?: Pet) => {
      const mark = holder.statuses.find(status => status.kind === "mark" && status.key === MELODY && status.source === ctx.self.side && status.endTick > ctx.tick);
      if (!mark || blocked) return;
      holder.statuses = holder.statuses.filter(status => status !== mark);
      if (holderPet) holderPet.statuses = holder.statuses;
      applyEffect(ctx.world, source, target, { type: "damage", damageType: "magic", amount: { base: mark.value }, noLifeSteal: true, petDamageCategory: "proc", label: "Hymn of Valor – Melody" }, { scale: 1 });
    };
    const policy: Behavior = view => {
      const normal = defaultBehavior({ ...view, self: { ...view.self, spec: { ...view.self.spec, abilities: [] } } });
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return normal;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (self.action) return normal;
      const ready = (key: string) => canCast(world, self, byKey(key));
      if (ready("W") && derive(self).maxHp - self.hp >= evaluate(wHeal, self) / 2) return { kind: "cast", ability: "W" };
      if (mode === "flee" && ready("E") && !self.statuses.some(status => status.memoKey === "sona:selfHaste")) return { kind: "cast", ability: "E" };
      if (mode === "fight" && ready("R") && Math.abs(enemy.x - self.x) <= rRange + enemy.spec.base.radius && !enemy.statuses.some(status => status.kind === "cc" && ["stun", "airborne", "suppression"].includes(status.key))) return { kind: "cast", ability: "R" };
      if (ready("Q") && canTarget(enemy, self) && Math.abs(enemy.x - self.x) <= qRange + EPSILON) return { kind: "cast", ability: "Q" };
      if (mode !== "flee" && canStartAttack(world, self)) return { kind: "attack" };
      if (mode === "fight" && ready("E") && Math.abs(enemy.x - self.x) > self.spec.attack.range && !self.statuses.some(status => status.memoKey === "sona:selfHaste")) return { kind: "cast", ability: "E" };
      return normal;
    };
    kit.assume("Accelerando is explicit permanent preduel history, defaulting to zero and capped at 120. Only actual accepted Q hits on Champion-class bodies and actual W healing or threshold shield absorption on another eligible allied Champion-class body earn stacks; self healing and shielding do not invent ally credit. Each actual shield grant credits at most one threshold event. Reaching 120 grants 60 basic-only haste; later events refund 1.5 seconds of R's current cooldown without arming a future refund. The shield threshold is the primary rank value 105 and excludes its AP scaling. Purchased haste and basic-only haste add before Q/W/E cooldown calculation, while R receives only purchased haste.");
    kit.assume("Power Chord starts empty, stacks completed basic casts to three and resets the attack timer on first becoming ready. A real empowered basic declaration consumes the stacks and captures the last completed Q/W/E identity on that attack, so a later cast cannot recolor its missile. The windup is uncancellable except shared polymorph/death rules; blindness, dodge, parry and attack blocks deny the proc. The spell-shield flag applies to the separate bonus chord packet while ordinary basic damage and Melody remain separate. Primary level continuation gives 270 normal and 405 Staccato base damage at 20. Stacks persist through resurrection. Ward/jungle-plant exceptions require real targeting metadata absent from this arena and are not inferred from unrelated summons. Diminuendo's 8% visual size change has no pinned generic gameplay/pathing-radius conversion; damage reduction is implemented without guessing size geometry.");
    kit.assume("Each basic cast replaces the active three-second aura and imposes an unhasted 0.5-second floor on the other basic cooldown deadlines. Self and each real eligible ally can be tagged once per aura, including allies entering later; tagged benefits keep their own 5/1.5/3-second clocks after the aura changes or the body leaves. The 400 aura is explicitly center-to-edge. No allied body is fabricated. Q Melody snapshots Sona's AP at grant; ally procs use the actual attack actor and its available penetration metadata rather than another champion's action or resource state.");
    kit.assume("Hymn of Valor selects at most two real visible enemies in 825 center range, prioritizing actual Champion-class bodies then distance and stable body identity. Each selected body receives one 1300 speed homing projectile carrying area damage; no imaginary second bolt hits an isolated target. Selection grants one second of unit sight without inventing an unspecified area-vision radius. Spell shields, parry, projectile interception and target loss belong to each actual missile; an accepted Q contact, rather than a quoted blurb's conflicting damage-only wording, earns the primary description's Accelerando credit. The primary zero cast time overrides stale 0.25 binary spell metadata.");
    kit.assume("Aria heals self immediately and sends one 1300 speed tone to the real ally with greatest missing-health percentage within 1000 center range, breaking ties by proximity and body ID. A full-health eligible ally can receive a tone but earns no heal credit. The tone follows stealth without revealing it; actual death, stasis or untargetability prevents its heal. Its hostile projectile interception path remains the one-dimensional segment to that real ally. Self W grants no Accelerando. W shield snapshots the sourced 105+0.25 AP; exact standard-shield absorption records distinguish it from other shields and legacy refunds.");
    kit.assume("Song of Celerity grants self 20% + 0.0002 AP movement speed for seven seconds, ending after the three-second minimum once actual HP/shield damage occurs. Its aura grants only actual allies 18% + 0.0002 AP for three seconds. Crescendo retains the origin and direction at declaration, completes its 0.25 cast and sends a 2400 speed piercing 1000-range projectile with 280 full width and 1.5-second stun. The source's cast-at-start note establishes origin, not an immediate pre-cast projectile. R remains reserved in hold/trade; ordinary fight uses it in real reach, and completed trades retreat before optional casts. Reference allocation prices self-only Q/W sustain, earned-history haste and a bounded ordinary chord cadence; no imaginary allied aura or shield credits enter the budget.");
    return { abilities, attack: { onHitToPets: true }, behavior: policy,
      budget: {
        damage(self, target) { const d = derive(self), haste = (100 + d.abilityHaste + initial * perStack) / 100, qRate = haste / qCD, wRate = haste / wCD, attacks = d.attackSpeed; return { magic: qRate * evaluate(qDamage, self, target) + Math.min(attacks, qRate) * evaluate(qMelody, self, target) + Math.min(attacks, (qRate + wRate) / chordCap) * evaluate(chordDamage, self, target) }; },
        healing(self) { const rate = (100 + derive(self).abilityHaste + initial * perStack) / (100 * wCD); return rate * (evaluate(wHeal, self) + evaluate(wShield, self)); },
      },
      hooks: {
        ownedPetEventsAfterDeath: true,
        onStart(ctx) { ctx.memory[STACKS] = initial; ctx.memory[CHORD] = 0; },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (["Q", "W", "E"].includes(key)) {
            const before = Number(ctx.memory[CHORD] ?? 0), next = Math.min(chordCap, before + 1);
            ctx.memory[CHORD] = next; ctx.memory[LAST] = key;
            if (before < chordCap && next === chordCap) ctx.self.attackReadyTick = ctx.tick;
            for (const other of ["Q", "W", "E"]) if (other !== key) ctx.self.cooldownReady[other] = Math.max(ctx.self.cooldownReady[other] ?? 0, ctx.tick + ticks(global));
            setAura(ctx, key); tag(ctx);
          }
          if (key === "Q") {
            const targets: Body[] = [ ...(ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) ? [{ target: ctx.enemy }] : []), ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && !pet.spec.hitPoints && canTargetPet(pet, ctx.self, ctx.tick)).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet })) ];
            targets.sort((a, b) => Number(b.target.spec.targetClass === "champion" || !b.pet) - Number(a.target.spec.targetClass === "champion" || !a.pet) || Math.abs(a.target.x - ctx.self.x) - Math.abs(b.target.x - ctx.self.x) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
            for (const body of targets.filter(body => Math.abs(body.target.x - ctx.self.x) <= qRange + EPSILON).slice(0, qCount)) {
              applyAlly(ctx, body, { type: "state", state: "standardSight", duration: qSight }, byKey("Q-bolt"));
              launch(ctx, body, "Q-bolt", qSpeed, byKey("Q-bolt").onHit!);
            }
          }
          if (key === "W") {
            heal(ctx.world, ctx.self, evaluate(wHeal, ctx.self));
            const target = friendly(ctx.world, ctx.self).filter(pet => Math.abs(pet.x - ctx.self.x) <= wRange + EPSILON && canTargetPet(pet, ctx.self, ctx.tick, ctx.self, { alliedInvisibility: true })).sort((a, b) => (1 - b.hp / derive(petFormulaTarget(b, ctx.self, ctx.tick)).maxHp) - (1 - a.hp / derive(petFormulaTarget(a, ctx.self, ctx.tick)).maxHp) || Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x) || a.id - b.id)[0];
            if (target) launch(ctx, { target: petFormulaTarget(target, ctx.self, ctx.tick), pet: target }, "W-tone", wSpeed, [], true);
          }
          if (key === "E") {
            ctx.memory["sona:eStart"] = ctx.tick;
            ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== "sona:selfHaste");
            ctx.self.statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(eLong), value: eSelf + eAP * derive(ctx.self).ap, memoKey: "sona:selfHaste" });
          }
        },
        onTick(ctx) { tag(ctx); },
        onAttack(ctx) {
          if (Number(ctx.memory[CHORD] ?? 0) < chordCap) return;
          ctx.memory[CHORD] = 0; ctx.action.uncancellable = true; ctx.action.attackTag = `sona:chord:${String(ctx.memory[LAST] ?? "Q")}`;
        },
        onAttackBeforeDamage(ctx) {
          const tag = ctx.attack.attackTag;
          if (!tag?.startsWith("sona:chord:") || ctx.blocked) return;
          const key = tag.slice("sona:chord:".length), spell = byKey(`I-${key}`), extra: Effect[] = [];
          if (key === "W") extra.push({ type: "stat", stat: "damageDealt", amount: { base: -Math.min(1, weaken + weakenAP * derive(ctx.self).ap) }, duration: weakenTime });
          if (key === "E") extra.push({ type: "cc", cc: "slow", strength: Math.min(tempoCap, tempo + weakenAP * derive(ctx.self).ap), duration: tempoTime });
          abilityHit(ctx.world, ctx.self, ctx.enemy, spell, [...spell.onHit!, ...extra], ctx.scale);
        },
        onAttackHit(ctx) { melodyHit(ctx, ctx.self, ctx.self, ctx.enemy, ctx.blocked); },
        onAttackPetHit(ctx) { melodyHit(ctx, ctx.self, ctx.self, ctx.enemy, ctx.blocked); },
        onOwnedPetBasicHit(ctx) { const holder = petFormulaTarget(ctx.pet, ctx.self, ctx.tick); melodyHit(ctx, petAttackActor(ctx.pet, ctx.self, ctx.tick), holder, ctx.target, ctx.blocked, ctx.pet); },
        onAbilityHit(ctx) { if (ctx.ability.key === "Q-bolt" && (ctx.enemy.petId === undefined || ctx.enemy.spec.targetClass === "champion")) addStack(ctx); },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "W-tone" || !ctx.targetPet || ctx.targetPet.hp <= 0) return;
          const target = petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick);
          if (inStasis(target) || isUntargetable(target, ctx.self)) return;
          const before = target.hp; heal(ctx.world, target, evaluate(wHeal, ctx.self)); ctx.targetPet.hp = target.hp;
          if (target.hp > before) addStack(ctx);
        },
        onDamageTaken(ctx) {
          if (!(ctx.amount + ctx.absorbed > 0)) return;
          const haste = ctx.self.statuses.find(status => status.memoKey === "sona:selfHaste");
          if (haste) {
            haste.endTick = Math.min(haste.endTick, Math.max(ctx.tick, Number(ctx.memory["sona:eStart"] ?? ctx.tick) + ticks(eShort)));
            if (haste.endTick <= ctx.tick) ctx.self.statuses = ctx.self.statuses.filter(status => status !== haste);
          }
        },
        onDamageObserved(ctx) {
          if (!ctx.targetPet || ctx.targetPet.owner !== ctx.self.side || ctx.targetPet.spec.targetClass !== "champion") return;
          for (const item of ctx.absorbedShields ?? []) {
            const shield = item.shield;
            if (shield.source !== ctx.self.side || shield.key !== "W-shield" || !shield.memoKey?.startsWith("sona:shield:")) continue;
            const key = `sona:mitigated:${shield.memoKey}`, before = Number(ctx.memory[key] ?? 0), after = before + item.amount;
            ctx.memory[key] = after;
            if (before < wThreshold && after >= wThreshold - EPSILON) addStack(ctx);
          }
        },
      },
    };
  },
};
export default sona;
