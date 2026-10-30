/** Twisted Fate: actual card clocks, captured spell attacks and a guarded Gate. */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast, canStartAttack, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, inStasis, isUntargetable, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { exitTerrain } from "../../engine/sim/terrain";
import { attackDamage, flat, innateStat, scaled, ticks } from "./util";

const CYCLE = "tf:cycle", SELECTED = "tf:card", EXPIRES = "tf:cardUntil", DECK = "tf:deck", DESTINY = "tf:destiny";
const cardNames = ["Blue Card", "Red Card", "Gold Card"] as const;
type Body = { target: Unit; pet?: Pet };

const twistedFate: KitModule = {
  champion: "TwistedFate",
  options: {
    firstCard: { label: "Explicit first hovered card (Blue0/Red1/Gold2; random server phase is not assumed known)", default: 0 },
    deckStacks: { label: "Actual Stacked Deck stacks before the duel, without an assumed respawn", default: 0 },
  },
  build(kit, options) {
    const p = kit.ability("Loaded Dice"), q = kit.ability("Wild Cards"), w = kit.ability("Pick a Card"), e = kit.ability("Stacked Deck"), r = kit.ability("Destiny");
    const first = options.firstCard ?? 0, initialDeck = options.deckStacks ?? 0;
    const maxDeck = e.quoted("stacking up to 3 times");
    if (!Number.isInteger(first) || first < 0 || first >= cardNames.length || !Number.isInteger(initialDeck) || initialDeck < 0 || initialDeck > maxDeck) throw new Error("TwistedFate: invalid card phase or Stacked Deck history");
    const attackSpeed = e.fraction("Bonus Attack Speed"), deckDamage = e.formula("Bonus Magic Damage");
    const structureDeckScale = e.quoted("reduced to 50% against structures") / 100;
    e.quote("but cannot be blocked"); e.quote("the on-hit effect is not consumed in either case"); e.quote("gains maximum stacks of Stacked Deck upon respawning");
    const gold = p.quoted("The expected bonus gold gained per unit killed is 4"), criticalGold = p.quoted("The expected additional gold due to critical strike chance is 3");
    const qDamage = q.formula("Magic Damage"), qRange = q.field("targetRange"), qWidth = q.field("width"), qSpeed = q.field("speed"), fan = q.field("angle");
    q.quote("Enemies can be damaged only once per pass"); q.quote("wherever the caster is at the end of the cast time");
    const cycleDuration = w.quoted("cycles through three cards for 6 seconds"), hover = w.quoted("interval until the next card is hovered is 0.528 every time"), selectedDuration = w.quoted("next basic attack within 6 seconds"), cardWindup = w.quoted("have a 0.25-second cast time"), cardCD = w.cooldown(), mana = w.number("Mana Restored"), slow = w.fraction("Slow"), slowDuration = w.quoted("slowed for 2.5 seconds"), stun = w.number("Stun Duration"), splashRadius = w.field("effectRadius"), cardSpeed = w.field("speed");
    const cards = [w.formula("Magic Damage", 0), w.formula("Magic Damage", 1), w.formula("Magic Damage", 2)], qCost = q.cost(), wCost = w.cost();
    const critRatios = [
      w.quoted("0 / 5.75 / 11.5 / 17.25 / 23 / 28.75 / 34.5 / 40.25 / 46 / 51.75 / 57.5", 10) / 100,
      w.quoted("0 / 3.5 / 7 / 10.5 / 14 / 17.5 / 21 / 24.5 / 28 / 31.5 / 35", 10) / 100,
      w.quoted("0 / 2.5 / 5 / 7.5 / 10 / 12.5 / 15 / 17.5 / 20 / 22.5 / 25", 10) / 100,
    ];
    w.quote("The recast can be used while affected by cast-inhibiting crowd control"); w.quote("Recasting the ability does not"); w.quote("it is cancelled but not consumed"); w.textField("cooldownStart");
    const revealDuration = r.number("Effect Duration"), gateDelay = r.quoted("recast after 0.5 seconds"), gateTime = r.quoted("channels for 1.5 seconds"), gateRange = r.field("targetRange"), rCD = r.cooldown();
    r.quote("cannot recast Destiny while grounded or rooted"); r.quote("destroying enemy projectiles targeting him"); r.quote("Paranoia will overpower the reveal from Destiny"); r.textField("cooldownStart");
    w.gameQuote('"name":"GoldCritMultiplier","values":[0.25'); w.gameQuote("mSpell.missileSpeed: 1500.0", "Characters/TwistedFate/Spells/BlueCardPreAttack");
    r.gameQuote("mSpell.castRange: [5500.0", "Characters/TwistedFate/Spells/DestinyAbility/Gate");
    const bodies = (world: World, self: Unit): Body[] => [{ target: world.units[1 - self.side]! }, ...world.pets.filter(pet => pet.owner !== self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.fixedDamage && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet }))];
    const internal = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, flags: { spellShield: shield, projectile: false, petContactHooks: true }, usable: () => false });
    const redSplash = internal("RedSplash", "Red Card (splash)", []);
    const reveal = internal("DestinyReveal", r.name, [{ type: "state", state: "revealed", duration: revealDuration }]);
    const qSpec: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: q.castTime(), cost: q.cost(), castDirection: "start", delivery: { kind: "line", range: qRange, width: qWidth, speed: qSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true };
    const cycling = (self: Unit, world: World) => Number(self.memory[CYCLE] ?? -1) >= 0 && world.tick < Number(self.memory["tf:cycleUntil"] ?? 0);
    const cardLive = (self: Unit, world: World) => Number(self.memory[SELECTED] ?? -1) >= 0 && world.tick < Number(self.memory[EXPIRES] ?? 0);
    const hovered = (self: Unit, tick: number) => (first + Math.floor((tick - Number(self.memory[CYCLE])) / (hover * 30) + 1e-9)) % cardNames.length;
    const wSpec: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: cardCD, cost: w.cost(), castTime: w.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, budgetExcluded: true, roles: ["buff"], usable: (self, world) => !cycling(self, world) && !cardLive(self, world) };
    const lock: AbilitySpec = { key: "W-lock", name: "Pick a Card (lock current card)", slot: "other", cooldown: 0, castTime: 0, countsAsCast: false, overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, flags: { usableWhileDisabled: true }, budgetExcluded: true, usable: cycling };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, roles: ["buff"], budgetExcluded: true };
    // The gate endpoint is a location captured at declaration, independent of later enemy crossings.
    const gate: AbilitySpec = { key: "Gate", name: "Gate", slot: "other", cooldown: 0, castTime: gateTime, delivery: { kind: "self" }, interruptible: {}, costAtCastStart: true, flags: { grounded: true }, budgetExcluded: true, roles: ["escape"], usable: (self, world) => world.tick < Number(self.memory[DESTINY] ?? 0) && world.tick >= Number(self.memory["tf:destinyStart"] ?? Infinity) + ticks(gateDelay) };
    const abilities = [qSpec, wSpec, rSpec, lock, gate, reveal, redSplash];
    const startCooldown = (ctx: HookContext) => { ctx.self.cooldownReady.W = ctx.tick + ticks(cardCD / (1 + derive(ctx.self).abilityHaste / 100)); };
    const expireCard = (ctx: HookContext) => { ctx.memory[SELECTED] = -1; ctx.memory[EXPIRES] = 0; startCooldown(ctx); };
    const stack = (ctx: HookContext & { scale: number }) => {
      if (Number(ctx.memory[DECK] ?? initialDeck) >= maxDeck) { ctx.memory[DECK] = 0; applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: ctx.enemy.spec.structureClass ? scaled(deckDamage, structureDeckScale) : deckDamage, label: e.name, petDamageCategory: "proc" }, { scale: ctx.scale }); }
      else ctx.memory[DECK] = Number(ctx.memory[DECK] ?? initialDeck) + 1;
    };
    const cardContact = (ctx: HookContext & { attack: { attackTag?: string; baseDamage?: { amount: Formula } }; scale: number; critChance: number; blocked: boolean }, pet?: Pet) => {
      if (pet?.spec.kind === "ward") return;
      stack(ctx);
      const tag = ctx.attack.attackTag;
      if (!tag?.startsWith("tf:card:")) return;
      const selected = Number(tag.split(":")[2]);
      if (selected === 0) applyEffect(ctx.world, ctx.self, ctx.self, { type: "resource", amount: flat(mana) }, { scale: ctx.scale });
      if (selected === 1) {
        const raw = evaluate(ctx.attack.baseDamage!.amount, ctx.self, ctx.enemy);
        for (const body of bodies(ctx.world, ctx.self)) {
          if (body.pet?.id === pet?.id && body.pet || (!body.pet && !pet) || Math.abs(body.target.x - ctx.enemy.x) > splashRadius + body.target.spec.base.radius + EPSILON) continue;
          const effects: Effect[] = [{ type: "damage", damageType: "magic", amount: flat(raw) }, { type: "cc", cc: "slow", strength: slow, duration: slowDuration }];
          if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, redSplash, effects, "area", ctx.scale, ctx.enemy.x);
          else abilityHit(ctx.world, ctx.self, body.target, redSplash, effects, ctx.scale, ctx.enemy.x);
        }
      }
    };
    const behavior: Behavior = view => {
      const { self, enemy, world, mode } = view;
      const normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [qSpec] } } });
      if (mode === "idle") return undefined;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (cycling(self, world)) {
        const wanted = mode === "flee" || mode === "kite" || mode === "hold" ? 2 : self.resource < wCost + qCost ? 0 : 2;
        if (hovered(self, world.tick) === wanted && canCast(world, self, lock)) return { kind: "cast", ability: lock.key };
      }
      if (cardLive(self, world) && canStartAttack(world, self)) return { kind: "attack" };
      if (mode === "flee") {
        if (canCast(world, self, gate)) return { kind: "cast", ability: gate.key, aim: { direction: -1, distance: gateRange } };
        if (canCast(world, self, rSpec)) return { kind: "cast", ability: rSpec.key };
      }
      if (canCast(world, self, wSpec) && canTarget(enemy, self) && view.distance <= self.spec.attack.range + derive(self).moveSpeed * cycleDuration) return { kind: "cast", ability: "W" };
      return normal;
    };
    kit.assume(`Pick a Card starts at the explicit firstCard=${first}; the server's random starting card is not silently optimized. Its three-card Blue→Red→Gold order uses the primary note's0.528-second interval, whose raw annotation remains pending test, rather than the contradictory0.5-second description. The six-second cycling window and separate six-second selected-card window use absolute clocks. One free internal lock selects only the currently hovered card, works under cast-inhibiting control, resets the basic timer and does not count as another cast. W's six-second hasted cooldown starts at attack launch or selected/cycling expiry. Exact server post-effect start between launch and impact is unquantified and this launch policy is explicit.`);
    kit.assume("Selected cards use a fixed0.25-second attack windup and1500-speed missile. Their entire normal attack damage is replaced by the sourced magic formula and linear critical-chance multiplier, with no extra ordinary AD/critical packet. Target death, untargetability, stasis or range loss before launch cancel freely and retain the selected card within its original expiry. Cancelled windups do not create mana, splash or Stacked Deck. An already declared empowered windup or launched card retains its captured entitlement if the selection window expires, an explicit policy where that exact boundary is unsourced; expiry starts the cooldown once and a later launch cannot restart it. Blind/dodge/parry and whole-attack spell shields use ordinary defenses. A connected damage block denies base damage but retains card utility/on-hits, an explicit interpretation where the primary does not enumerate every block edge. Blue restores150mana on accepted basic contact, Red slows the actual primary and deals independently defended area damage to real nearby recipients only, Gold stuns for2seconds. Explicit ward bodies exclude both card empowerment and Stacked Deck; no ward, plant or structure is fabricated for a duel.");
    kit.assume(`Stacked Deck starts at explicit history${initialDeck}, not an invented respawn. Actual connected champion/pet attacks generate one stack, and the next consumes three for165+20%bonusAD+40%AP noncritical proc magic. Damage-only blocks still trigger it; blind/dodge/parry preserve stacks. The permanent55%bonus attack speed participates in ordinary attack clocks. Loaded Dice records expected gold4+3×crit for actual hostile kills in memory only; pre-fight stat spending cannot be increased by future kills and no farming gold is fabricated.`);
    kit.assume(`Wild Cards is a piercing${qRange}-range/${qWidth}-width/${qSpeed}-speed fan with${fan}degrees between outer rays; all actual bodies lie on the central axial ray and receive at most one contact. Separate lateral rays and lateral recipients do not exist in this1D geometry. Cast origin is completion position, direction is declaration facing. Released cards survive owner death and actual projectile defenses remain enabled.`);
    kit.assume("Destiny reveals currently targetable enemy champion bodies, including actual champion-class summons, for10seconds, subject to each body's spell shield and parry according to the primary spell-shield flag. Nearsight retains priority through normal visibility rules. It creates no allies or map knowledge. Gate becomes available after0.5seconds, is blocked and interrupted by accepted root/ground/silence, and uses an interruptible1.5-second channel represented by a cast lock; movement/attacks cannot bypass it. Its absolute selected endpoint clamps to5500, projects out of actual terrain, reports a real blink, and destroys hostile homing champion or pet projectiles targeting this actual champion. Projectiles targeting other actual bodies and nonhoming missiles remain. R's110-second hasted cooldown starts when Gate is declared or the recast window expires, including interrupted Gates. Ordinary duel AI uses Gate to flee, reserves utility in other modes, waits for legal Gold/Blue card phases and honors completed trades.");
    kit.assume("Budget values Q, permanent attack speed, one Stacked Deck proc per four basics, and a Gold Card replacement per hasted six-second cycle plus average observed phase wait and fixed windup. The replacement subtracts that attack's ordinary expected physical damage. No ally, splash victim, farming gold or teleport damage enters its price. Blue is chosen at low mana in runtime; resource clipping and actual card waiting remain combat outcomes.");
    return {
      abilities, behavior, attack: { onHitToPets: true }, start: [innateStat("attackSpeed", attackSpeed)],
      budget: { damage(self, target) { const d = derive(self), rate = Math.min(d.attackSpeed, 1 / (cardCD / (1 + d.abilityHaste / 100) + hover + cardWindup)); return { magic: evaluate(deckDamage, self, target) * d.attackSpeed / (maxDeck + 1) + evaluate(cards[2]!, self, target) * (1 + d.critChance * critRatios[2]!) * rate, physical: -attackDamage(self) * rate }; } },
      hooks: {
        onStart(ctx) { ctx.memory[DECK] = initialDeck; ctx.memory[CYCLE] = -1; ctx.memory[SELECTED] = -1; },
        onCastStart(ctx) {
          if (ctx.ability.key !== "Gate") return;
          const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.max(0, Math.min(gateRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
          ctx.memory["tf:gateDestination"] = ctx.self.x + direction * distance;
          ctx.memory[DESTINY] = 0;
          ctx.self.cooldownReady.R = ctx.tick + ticks(rCD / (1 + derive(ctx.self).abilityHaste / 100));
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") { ctx.memory[CYCLE] = ctx.tick; ctx.memory["tf:cycleUntil"] = ctx.tick + ticks(cycleDuration); ctx.self.cooldownReady.W = Infinity; }
          if (ctx.ability.key === "W-lock") { ctx.memory[SELECTED] = hovered(ctx.self, ctx.tick); ctx.memory[EXPIRES] = ctx.tick + ticks(selectedDuration); ctx.memory[CYCLE] = -1; ctx.self.attackReadyTick = ctx.tick; }
          if (ctx.ability.key === "R") {
            ctx.memory["tf:destinyStart"] = ctx.tick; ctx.memory[DESTINY] = ctx.tick + ticks(revealDuration); ctx.self.cooldownReady.R = Infinity;
            for (const body of bodies(ctx.world, ctx.self)) if (!body.pet || body.pet.spec.targetClass === "champion") { if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, reveal, reveal.onHit!, "area"); else abilityHit(ctx.world, ctx.self, body.target, reveal, reveal.onHit!); }
          }
          if (ctx.ability.key === "Gate" && ctx.self.alive && ctx.self.hp > 0) { const from = ctx.self.x; ctx.self.x = Number(ctx.memory["tf:gateDestination"]); exitTerrain(ctx.world, ctx.self); notifyActualMovement(ctx.world, ctx.self, from, { kind: "blink", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "Gate" }); ctx.world.missiles = ctx.world.missiles.filter(m => !(m.owner !== ctx.self.side && m.homing && m.pet === undefined)); if (ctx.world.petMissiles) ctx.world.petMissiles = ctx.world.petMissiles.filter(m => !(m.owner !== ctx.self.side && m.target === ctx.self.side)); }
        },
        onAttack(ctx) {
          if (!cardLive(ctx.self, ctx.world) || ctx.targetPet && /ward|plant/i.test(ctx.targetPet.spec.name + ctx.targetPet.spec.kind)) return;
          const selected = Number(ctx.memory[SELECTED]), crit = Math.min(1, Math.max(0, ctx.action.critChance ?? derive(ctx.self).critChance));
          ctx.action.attackTag = `tf:card:${selected}`;
          ctx.action.baseDamage = { damageType: "magic", amount: scaled(cards[selected]!, 1 + crit * critRatios[selected]!), canCrit: false, label: cardNames[selected]! };
          ctx.action.launchTick = ctx.tick + ticks(cardWindup); ctx.action.missileSpeed = cardSpeed; ctx.action.spellShield = true;
          if (selected === 1) ctx.action.onHit.push({ type: "cc", cc: "slow", strength: slow, duration: slowDuration });
          if (selected === 2) ctx.action.onHit.push({ type: "cc", cc: "stun", duration: stun });
        },
        onAttackLaunch(ctx) {
          if (!ctx.action.attackTag?.startsWith("tf:card:")) return;
          if (!ctx.enemy.alive || inStasis(ctx.enemy) || isUntargetable(ctx.enemy, ctx.self) || Math.abs(ctx.self.x - ctx.enemy.x) > attackRange(ctx.self, ctx.enemy) + ctx.self.spec.base.radius + ctx.enemy.spec.base.radius + EPSILON || ctx.action.pet !== undefined && !ctx.targetPet) { ctx.self.attackReadyTick = ctx.tick; return false; }
          if (Number(ctx.memory[SELECTED] ?? -1) >= 0) expireCard(ctx);
        },
        onAttackHit(ctx) { cardContact(ctx); },
        onAttackPetHit(ctx) { cardContact(ctx, ctx.pet); },
        onKill(ctx) { ctx.memory["tf:loadedDiceExpectedGold"] = Number(ctx.memory["tf:loadedDiceExpectedGold"] ?? 0) + gold + criticalGold * derive(ctx.self).critChance; },
        onCCApplied(ctx) {
          if ((ctx.cc === "root" || ctx.cc === "ground") && ctx.self.action?.kind === "cast" && ctx.self.action.ability === "Gate") { ctx.self.action.cancelled = true; ctx.self.action = undefined; }
        },
        onTick(ctx) {
          if (Number(ctx.memory[CYCLE] ?? -1) >= 0 && ctx.tick >= Number(ctx.memory["tf:cycleUntil"] ?? 0)) { ctx.memory[CYCLE] = -1; startCooldown(ctx); }
          if (Number(ctx.memory[SELECTED] ?? -1) >= 0 && ctx.tick >= Number(ctx.memory[EXPIRES] ?? 0)) expireCard(ctx);
          const until = Number(ctx.memory[DESTINY] ?? 0); if (until > 0 && ctx.tick >= until) { ctx.memory[DESTINY] = 0; ctx.self.cooldownReady.R = until + ticks(rCD / (1 + derive(ctx.self).abilityHaste / 100)); }
        },
      },
    };
  },
};
export default twistedFate;
