/** Wukong: Stone Skin's stacks, Crushing Blow, the Warrior Trickster clone, Nimbus Strike and Cyclone's two spins. */
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor } from "../../engine/rules/defense";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { EPSILON, attackTiming, canCast, completeCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { canTarget, hookContext, inStasis, isUntargetable } from "../../engine/sim/combat";
import { canAttack, derive, evaluate, hasState } from "../../engine/sim/derived";
import { areaOnPets, canTargetPet, petEffects, petHit, petsOf, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { attackDamage, flat, innateStat, maxHp, scaled, ticks } from "./util";

const DECOY = "decoy";

const wukong: KitModule = {
  champion: "MonkeyKing",
  build(kit) {
    const passive = kit.ability("Stone Skin");
    const q = kit.ability("Crushing Blow");
    const w = kit.ability("Warrior Trickster");
    const e = kit.ability("Nimbus Strike");
    const r = kit.ability("Cyclone");
    const decoy = kit.pet("Decoy");

    // Stone Skin: bonus armor and regeneration, each doubled, tripled... by Strength of Stone's stacks.
    const stoneArmor = passive.levelValue("bonus armor and regenerates an additional 0.35% of his maximum health every 5 seconds", 0);
    const stoneRegen = passive.quoted("regenerates an additional 0.35% of his maximum health every 5 seconds", 0) / 100;
    const stackSeconds = passive.quoted("he generates a stack of Strength of Stone for 5 seconds", 0);
    const maxStacks = passive.quoted("refreshing on subsequent hits and stacking up to 5 times", 0);
    passive.quote("Stacks expire one by one every second when the duration ends");
    const decaySeconds = 1;
    const perStack = passive.quoted("For each stack, Stone Skin's effects are increased by 100%", 0) / 100;
    const maxArmor = passive.levelValue("up to a maximum of", 0);
    const maxRegen = passive.levelValue("up to a maximum of", 1) / 100;
    if (Math.abs(stoneArmor * (1 + perStack * maxStacks) - maxArmor) > 0.01 || Math.abs(stoneRegen * (1 + perStack * maxStacks) - maxRegen) > 1e-6) {
      throw new Error(`MonkeyKing kit: Stone Skin's stacked maximum (${maxArmor} armor, ${maxRegen} regeneration) no longer follows from ${maxStacks} stacks of +${perStack * 100}%`);
    }
    passive.quote("Whenever Wukong or his clone damage an enemy champion or monster with his basic attacks or abilities");
    passive.quote("Stacks of Strength of Stone are also granted on-hit, but will specifically not be if the target is invulnerable");

    // Crushing Blow: an empowered attack with an uncancellable windup, its cooldown cut by every hit.
    const crushWindow = q.quoted("Wukong empowers his next basic attack within 5 seconds", 0);
    const crushRange = q.number("Bonus Range");
    const crushDamage = q.formula("Bonus Physical Damage");
    const crushShred = q.baseOf("Armor Reduction") / 100;
    const shredSeconds = q.quoted("then inflict armor reduction for 3 seconds", 0);
    const crushRefund = q.quoted("Crushing Blow's cooldown is reduced by 0.5 seconds whenever Wukong or his clone damage an enemy", 0);
    q.quote("to have an uncancellable windup");
    q.quote("Crushing Blow resets Wukong's and his clone's basic attack timer");
    q.quote("Other abilities can be used during the attack's animation");

    // Warrior Trickster: a short dash in invisibility, leaving a clone where he stood.
    const [minDash = 100, maxDash = 300] = w.fieldNumbers("targetRange");
    const trickSpeed = w.field("speed");
    const invisibleSeconds = w.quoted("Wukong enters invisibility for 1 second", 0);
    const cloneSeconds = w.quoted("leaving behind a clone of himself at his casting position for 4 seconds", 0);
    const cloneShare = w.fraction("Clone Outgoing Damage");
    w.quote("can basic attack autonomously, prioritizing the last enemy Wukong damaged");
    w.quote("It can also gain the effects of Crushing Blow and Nimbus Strike bonus attack speed, and casts Cyclone whenever Wukong does");
    w.quote("Using a basic attack breaks the stealth at the end of the attack windup");
    w.quote("Casting Warrior Trickster during an ability's effects will transfer them to the clone");
    w.quote("Wukong can cast any of his abilities during the dash");
    const cloneRange = decoy.stat("range");
    const cloneRadius = decoy.stat("radius");
    const cloneAd = decoy.stat("damage") / 100;
    const cloneSpeed = decoy.stat("attackspeed") / 100;
    const cloneHealth = decoy.stat("hp") / 100;
    const cloneArmor = decoy.stat("armor") / 100;
    const cloneMr = decoy.stat("magicresist") / 100;
    decoy.quote("It is static.");
    decoy.quote("Clone attacks can be mitigated by block, dodge, and blind, as well as stopped by Disarm.");
    decoy.quote("The clone's Cyclone won't knock up enemies if they were already knocked up by Wukong.");
    kit.assume("The clone attacks the enemy champion, or an enemy pet Wukong last damaged or that is the only one in its reach, from the moment it appears; its armor and magic resistance are Wukong's as it appears.");
    kit.assume("The clone's attacks critically strike as Wukong's would, counted by expected value; the wiki gives its damage as 100% of Wukong's attack damage and says nothing of crits.");
    kit.assume("Casting Warrior Trickster copies Wukong's Crushing Blow empowerment to the clone and leaves Wukong his own; a Cyclone spin it interrupts carries on as the clone's.");
    kit.assume("Nimbus Strike and Cyclone wait for Warrior Trickster's dash (at most a third of a second) to end; Crushing Blow can be cast during it.");

    // Nimbus Strike: a dash to the enemy, then attack speed.
    const strikeRange = e.field("targetRange");
    const strikeRadius = e.field("effectRadius");
    const strikeSpeed = e.gameQuoted("mSpell.DataValues.DashSpeed.values: [1050,1050,1050,1050,1050,1050,1050]", 0);
    const strikeDamage = e.formula("Magic Damage");
    const strikeAs = e.fraction("Bonus Attack Speed");
    const strikeAsSeconds = e.quoted("Upon arrival, Wukong gains bonus attack speed for 5 seconds", 0);
    e.quote("sends out untargetable clones to strike up to two additional enemies near the target's location");
    e.quote("Crushing Blow can be cast during the dash");
    e.quote("Casting Nimbus Strike interrupts the attack windup of enemies targeting Wukong");
    e.quote("Nimbus Strike has an offset distance of 75 units from the target dashed to");
    e.quote("the windup of these attacks cannot be interrupted by neither the user themselves nor any status effect");
    kit.assume("Nimbus Strike's dash ends where Wukong and the enemy touch (their pathing radii, about the wiki's 75-unit offset), and hits on arrival within its 187.5 radius; it doesn't follow an enemy that dashes away during it.");

    // Cyclone: a 2-second spin, recast to end it, and a second spin within 8 seconds.
    const spinSeconds = r.quoted("Wukong spins his staff around for up to 2 seconds", 0);
    const spinSpeed = r.quoted("becoming ghosted and gaining 20% bonus movement speed", 0) / 100;
    const pulseSeconds = r.quoted("The staff deals physical damage every 0.25 seconds to enemies hit", 0);
    const knockSeconds = r.quoted("can knock them up once for 0.6 seconds", 0);
    r.quote("Cyclone will not knock up enemies who were already hit by either Wukong or his clone within the same cast");
    const spinRadius = r.field("effectRadius");
    const pulseDamage = r.formula("Physical Damage Per Tick");
    const recastAfter = r.quoted("Cyclone can be recast after 0.5 seconds within the duration", 0);
    r.quote("and does so automatically afterwards or by casting another ability");
    const secondAfter = r.quoted("After 1 second, he can cast Cyclone a second time within 8 seconds of the first cast", 0);
    const secondWithin = r.quoted("After 1 second, he can cast Cyclone a second time within 8 seconds of the first cast", 1);
    r.quote("Nimbus Strike bonus attack speed duration is continuously refreshed while spinning");
    r.quote("Casting a basic ability will always interrupt Wukong's Cyclone");
    r.quote("A clone can be interrupted by casting Crushing Blow, but only if the clone was made during the current Cyclone cast and only for that cast");
    r.quote("Cyclone's remaining duration always stays the same even after the clone replicated the ability");
    r.quote("During Cyclone, Wukong and his clone's attack ranges are reduced to 50");
    r.quote("Spell shield will block one instance of damage");
    r.quote("Blocking the knock up will still grant immunity to it from either of Cyclone's casts");
    r.quote("Interaction table (ct): attack=false; move=true");
    const castLock = r.quoted("cast=Other abilities are disabled for the first 0.3 seconds, casting them afterwards interrupts.", 0);
    r.quote("interrupts=death");
    const spinPulses = Math.round(spinSeconds / pulseSeconds);
    const spinTotal = r.formula("Total Physical Damage");
    const ratio = (formula: typeof pulseDamage, stat: "AD" | "targetMaxHP") => formula.ratios?.[stat] ?? 0;
    if (spinTotal.base !== spinPulses * pulseDamage.base || Math.abs(ratio(spinTotal, "AD") - spinPulses * ratio(pulseDamage, "AD")) > 1e-9 || Math.abs(ratio(spinTotal, "targetMaxHP") - spinPulses * ratio(pulseDamage, "targetMaxHP")) > 1e-9) {
      throw new Error(`MonkeyKing kit: Cyclone's total damage is no longer ${spinPulses} of its ticks`);
    }
    kit.assume("Cyclone's knock-up is once per cast: the first spin and the second each knock up once, shared by Wukong and his clone, and a pulse a spell shield blocks still uses it up.");
    kit.assume("Wukong can't attack while he spins (the interaction table), so the attack range Cyclone reduces to 50 changes nothing; the clone doesn't attack while it spins either.");
    kit.assume("Crushing Blow's 0.5-second cut counts each attack once (its bonus damage included), each ability hit, and each of the clone's hits; ability damage to enemy pets is left out.");
    kit.assume("Crushing Blow's cut shortens only a cooldown that is running: hits while its empowered attack is still waiting (its post-effect cooldown not yet started) cut nothing.");

    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), rCooldown = r.cooldown();
    const spinTicks = ticks(spinSeconds);
    const pulseTick = (k: number) => Math.max(1, Math.ceil((spinTicks * k) / spinPulses));
    const knockUp: Effect = { type: "displace", direction: "away", distance: 0, duration: knockSeconds };
    const spinHit: Effect = { type: "damage", damageType: "physical", amount: pulseDamage, label: r.name };
    const cloneSpinHit: Effect = { type: "damage", damageType: "physical", amount: scaled(pulseDamage, cloneShare), label: `${r.name} (clone)` };
    const cloneAttackHit: Effect = {
      type: "damage",
      damageType: "physical",
      amount: { base: 0, ratios: { AD: cloneAd * cloneShare } },
      amountFor: (owner) => {
        const d = derive(owner);
        return cloneAd * cloneShare * d.ad * averageCritFactor(d.critChance, d.critDamage);
      },
      label: decoy.name,
    };
    const cloneCrush: Effect[] = [
      { type: "damage", damageType: "physical", amount: scaled(crushDamage, cloneShare), label: `${q.name} (clone)` },
      { type: "stat", stat: "armorReductionPercent", amount: flat(crushShred), duration: shredSeconds },
    ];
    const strikeHit: Effect = { type: "damage", damageType: "magic", amount: strikeDamage, label: e.name };

    const spinning = (unit: Unit) => unit.action?.kind === "channel" && (unit.action.ability === "R" || unit.action.ability === "R3");
    // Other abilities are disabled for Cyclone's first 0.3 seconds; afterwards they end it.
    const castable = (unit: Unit, world: World) => !(spinning(unit) && unit.action?.kind === "channel" && world.tick < unit.action.startTick + ticks(castLock));
    const clones = (world: World, unit: Unit) => petsOf(world, unit.side, DECOY);
    const empowered = (unit: Unit) => unit.statuses.some((s) => s.kind === "empower" && s.key === "Q" && (s.empower?.attacks ?? 0) > 0);

    // Strength of Stone: a stack for 5 seconds, refreshed by each hit; they expire one a second after.
    const setStoneArmor = (ctx: HookContext) => {
      const stacks = Number(ctx.memory.stoneStacks ?? 0);
      ctx.buff("wukong:stone", "armor", stoneArmor * perStack * stacks, stacks > 0 ? Number.POSITIVE_INFINITY : 0);
    };
    const stoneStack = (ctx: HookContext) => {
      ctx.memory.stoneStacks = Math.min(maxStacks, Number(ctx.memory.stoneStacks ?? 0) + 1);
      ctx.memory.stoneUntil = ctx.tick + ticks(stackSeconds);
      setStoneArmor(ctx);
    };
    // Only a running cooldown is cut: hits while the empowered attack waits (its cooldown held) cut nothing.
    const refund = (ctx: HookContext) => {
      if (Number.isFinite(ctx.self.cooldownReady.Q ?? 0)) ctx.apply({ type: "refund", ability: "Q", seconds: crushRefund }, true);
    };

    // The clone's hits: Strength of Stone and Crushing Blow's cut, as Wukong's own.
    const onCloneHit = ({ world, pet, target, blocked }: { world: World; pet: Pet; target: Unit | Pet; blocked: boolean }) => {
      const owner = world.units[pet.owner];
      if (!owner.alive || blocked) return;
      const ctx = hookContext(world, owner);
      refund(ctx);
      if (!("owner" in target) && !hasState(target, "invulnerable")) stoneStack(ctx);
    };
    // A spell shield negates the clone's Crushing Blow packet and leaves the attack, as on Wukong's own.
    const cloneEffects = ({ target, effects }: { world: World; pet: Pet; target: Unit | Pet; effects: readonly Effect[] }) => {
      if (!effects.includes(cloneCrush[0]!) || "owner" in target) return [...effects];
      const shield = target.statuses.find((s) => s.kind === "state" && s.key === "spellShield");
      if (!shield) return [...effects];
      shield.charges = (shield.charges ?? 1) - 1;
      if (shield.charges <= 0) target.statuses = target.statuses.filter((s) => s !== shield);
      return effects.filter((effect) => !cloneCrush.includes(effect));
    };
    const cloneSpec = (owner: Unit): PetSpec => {
      const d = derive(owner);
      return {
        kind: DECOY,
        name: decoy.name,
        hp: owner.hp * cloneHealth,
        armor: (d.armor.base + d.armor.bonus) * cloneArmor,
        mr: (d.mr.base + d.mr.bonus) * cloneMr,
        radius: cloneRadius,
        // It is static; the kit runs its attacks and spins (onTick).
        moveSpeed: 0,
        duration: cloneSeconds,
        effectsForHit: cloneEffects,
        onAttackHit: onCloneHit,
      };
    };

    /** What the clone attacks: the enemy pet Wukong last damaged, else the enemy champion, else the nearest enemy pet in its reach. */
    const cloneTarget = (world: World, clone: Pet, owner: Unit, reach: number): Unit | Pet | undefined => {
      const view = petFormulaTarget(clone, owner, world.tick);
      const enemy = world.units[owner.side === 0 ? 1 : 0];
      const inReach = (x: number, radius: number) => Math.abs(x - clone.x) - radius <= reach + EPSILON;
      const pets = world.pets.filter((p) => p.owner !== owner.side && canTargetPet(p, view, world.tick) && inReach(p.x, p.spec.radius));
      const last = pets.find((p) => p.id === owner.memory.lastPetHit);
      if (last) return last;
      if (enemy.alive && canTarget(enemy, view) && inReach(enemy.x, enemy.spec.base.radius)) return enemy;
      return pets.sort((a, b) => Math.abs(a.x - clone.x) - a.spec.radius - (Math.abs(b.x - clone.x) - b.spec.radius) || a.id - b.id)[0];
    };

    // A spin's pulse from the clone: 60% of Wukong's, with the cast's one knock-up if it hasn't been used.
    const clonePulse = (ctx: HookContext, clone: Pet) => {
      const enemy = ctx.enemy;
      const view = petFormulaTarget(clone, ctx.self, ctx.tick);
      const flag = Number(clone.memory.spinCast) === 2 ? "knock2" : "knock1";
      if (enemy.alive && !isUntargetable(enemy, view) && !inStasis(enemy) && Math.abs(enemy.x - clone.x) - enemy.spec.base.radius <= spinRadius + EPSILON) {
        const effects: Effect[] = [cloneSpinHit];
        if (!ctx.memory[flag]) {
          ctx.memory[flag] = true;
          effects.push(knockUp);
        }
        petHit(ctx.world, clone, enemy, effects, false);
      }
      areaOnPets(ctx.world, ctx.self, clone.x - spinRadius, clone.x + spinRadius, [cloneSpinHit]);
    };
    const startCloneSpin = (clone: Pet, start: number, cast: number, interruptible: boolean, pulse = 1) => {
      clone.memory.spinStart = start;
      clone.memory.spinPulse = pulse;
      clone.memory.spinCast = cast;
      clone.memory.spinInterruptible = interruptible;
      // A spin ends its windup.
      clone.memory.launchAt = -1;
    };
    const runClone = (ctx: HookContext, clone: Pet) => {
      const tick = ctx.tick;
      const owner = ctx.self;
      const spinStart = Number(clone.memory.spinStart ?? -1);
      if (spinStart >= 0) {
        let k = Number(clone.memory.spinPulse ?? 1);
        while (k <= spinPulses && tick >= spinStart + pulseTick(k) && ctx.world.pets.includes(clone)) {
          clonePulse(ctx, clone);
          k++;
        }
        clone.memory.spinPulse = k;
        if (k > spinPulses) clone.memory.spinStart = -1;
        return;
      }
      const view = petFormulaTarget(clone, owner, tick);
      const launchAt = Number(clone.memory.launchAt ?? -1);
      if (launchAt >= 0) {
        if (tick < launchAt) return;
        clone.memory.launchAt = -1;
        const crush = Boolean(clone.memory.attackCrush);
        const targetPet = clone.memory.attackPet !== undefined ? ctx.world.pets.find((p) => p.id === clone.memory.attackPet) : undefined;
        const target: Unit | Pet | undefined = clone.memory.attackPet !== undefined ? targetPet : ctx.enemy;
        if (!target || ("alive" in target && !target.alive)) return;
        const radius = "owner" in target ? target.spec.radius : target.spec.base.radius;
        // Out of reach by the end of its windup, a plain attack is cancelled; Crushing Blow's lands anyway.
        if (!crush && Math.abs(target.x - clone.x) - radius > cloneRange + EPSILON) {
          clone.memory.attackAt = tick;
          return;
        }
        if ("owner" in target ? !canTargetPet(target, view, tick) : !canTarget(target, view)) return;
        petHit(ctx.world, clone, target, crush ? [cloneAttackHit, ...cloneCrush] : [cloneAttackHit], true, Boolean(clone.memory.attackBlind));
        return;
      }
      if (tick < Number(clone.memory.attackAt ?? 0) || !canAttack(view)) return;
      const crushing = tick < Number(clone.memory.crushUntil ?? -1);
      const target = cloneTarget(ctx.world, clone, owner, cloneRange + (crushing ? crushRange : 0));
      if (!target) return;
      // Its attack speed is Wukong's, Nimbus Strike's bonus included.
      const timing = attackTiming(owner);
      const total = cloneSpeed === 1 ? timing.total : Math.max(1, ticks(1 / (derive(owner).attackSpeed * cloneSpeed)));
      clone.memory.launchAt = tick + timing.windup;
      clone.memory.attackAt = tick + total;
      clone.memory.attackCrush = crushing;
      clone.memory.attackBlind = (clone.statuses ?? []).some((s) => s.kind === "cc" && s.key === "blind" && s.endTick > tick);
      if ("owner" in target) clone.memory.attackPet = target.id;
      else delete clone.memory.attackPet;
      if (crushing) clone.memory.crushUntil = -1;
    };

    const spinSelf: Effect[] = [
      { type: "state", state: "ghosted", duration: spinSeconds },
      { type: "stat", stat: "moveSpeedPercent", amount: flat(spinSpeed), duration: spinSeconds },
    ];
    const spinChannel = { duration: spinSeconds, interruptible: false, mobile: true, range: spinRadius, pulses: flat(spinPulses), onTick: [spinHit] };
    const basic = (spec: AbilitySpec): AbilitySpec => ({
      ...spec,
      allowedDuringChannel: ["R", "R3"],
      preserveAttackWindup: "uncancellable",
      usable: (unit, world) => castable(unit, world) && (!spec.usable || spec.usable(unit, world)),
    });
    const abilities: AbilitySpec[] = [
      basic({
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: qCooldown,
        cost: q.cost(),
        castTime: q.castTime(),
        cooldownAfter: "empower",
        overlay: true,
        delivery: { kind: "self" },
        onSelf: [{
          type: "empower",
          attacks: 1,
          window: crushWindow,
          bonusRange: crushRange,
          uncancellable: true,
          resetAttack: true,
          ...(q.flag("spellShield") !== false ? { spellShieldOnHit: true } : {}),
          onHit: [
            { type: "damage", damageType: "physical", amount: crushDamage, label: q.name },
            { type: "stat", stat: "armorReductionPercent", amount: flat(crushShred), duration: shredSeconds },
          ],
        }],
        roles: ["damage", "buff"],
      }),
      basic({
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: wCooldown,
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "dash", direction: "away", distance: maxDash, minDistance: minDash, speed: trickSpeed },
        onSelf: [{ type: "state", state: "invisible", duration: invisibleSeconds }],
        flags: { grounded: w.flag("grounded") ?? true, knockdown: w.flag("knockdown") ?? true },
        roles: ["escape", "damage"],
      }),
      basic({
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "dash", direction: "target", distance: strikeRange, speed: strikeSpeed, hitRadius: strikeRadius },
        onHit: [strikeHit],
        flags: { spellShield: e.flag("spellShield") ?? true, grounded: e.flag("grounded") ?? true, knockdown: e.flag("knockdown") ?? true, projectile: false },
        usable: (unit, world) => {
          const enemy = world.units[unit.side === 0 ? 1 : 0];
          return Math.abs(enemy.x - unit.x) <= strikeRange + EPSILON;
        },
        roles: ["damage", "engage"],
      }),
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: rCooldown,
        cost: r.cost(),
        castTime: r.castTime(),
        // The cooldown starts after the second spin, or once its 8 seconds are over.
        cooldownAfter: "state",
        preserveAttackWindup: "uncancellable",
        delivery: { kind: "self" },
        onSelf: [...spinSelf, { type: "state", state: "lingering", duration: secondWithin }],
        channel: spinChannel,
        flags: { spellShield: true },
        decisive: true,
        roles: ["damage", "cc"],
      },
      {
        key: "R2",
        name: `${r.name} (recast)`,
        slot: "R",
        cooldown: 0,
        castTime: 0,
        chain: { root: "R", index: 2, window: spinSeconds, delay: recastAfter, auto: true },
        delivery: { kind: "self" },
        roles: [],
      },
      {
        key: "R3",
        name: `${r.name} (second cast)`,
        slot: "R",
        cooldown: 0,
        castTime: 0,
        preserveAttackWindup: "uncancellable",
        chain: { root: "R", index: 3, window: secondWithin, delay: secondAfter },
        usable: (unit, world) => world.tick <= Number(unit.memory.cycloneFirst ?? -1) + ticks(secondWithin),
        delivery: { kind: "self" },
        onSelf: spinSelf,
        channel: spinChannel,
        flags: { spellShield: true },
        roles: ["damage", "cc"],
      },
      {
        key: "R4",
        name: `${r.name} (second recast)`,
        slot: "R",
        cooldown: 0,
        castTime: 0,
        chain: { root: "R", index: 4, window: spinSeconds, delay: recastAfter, auto: true },
        allowedDuringChannel: ["R3"],
        delivery: { kind: "self" },
        roles: [],
      },
    ];
    const byKey = (key: string) => abilities.find((a) => a.key === key)!;
    const r2Spec = byKey("R2"), r4Spec = byKey("R4");

    const ready = (view: Parameters<Behavior>[0], key: string) => {
      const ability = view.self.spec.abilities.find((a) => a.key === key);
      return ability !== undefined && canCast(view.world, view.self, ability);
    };
    const cast = (key: string) => ({ kind: "cast" as const, ability: key });
    // The default behavior otherwise: without Cyclone, which waits for the clone, and Warrior Trickster except to dodge.
    const generic: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind !== "cast" || !(command.ability.startsWith("R") || (command.ability === "W" && command.dodge === undefined))) return command;
      return view.distance <= view.self.spec.attack.range ? { kind: "attack" } : { kind: "move", direction: 1 };
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      const centers = Math.abs(enemy.x - self.x);
      const spinReach = spinRadius + enemy.spec.base.radius;
      if (spinning(self) && self.action?.kind === "channel") {
        // A spin chases; it ends early on an enemy outrunning it, or once its knock-up is in when attacks deal more.
        const knocked = Boolean(self.memory[self.action.ability === "R3" ? "knock2" : "knock1"]);
        const outrun = centers > spinReach && enemy.moved === -1 && derive(enemy).moveSpeed > derive(self).moveSpeed;
        const attacksBetter = knocked && view.distance <= self.spec.attack.range && attackDamage(self) * derive(self).attackSpeed > evaluate(pulseDamage, self, enemy) / pulseSeconds;
        if (outrun || attacksBetter) {
          if (ready(view, "R2")) return cast("R2");
          if (ready(view, "R4")) return cast("R4");
        }
        return { kind: "move", direction: mode === "flee" ? -1 : 1 };
      }
      // Crushing Blow during Nimbus Strike's dash, for the attack on arrival, unless Cyclone comes first.
      if (self.action?.kind === "dash") return self.action.ability === "E" && mode !== "flee" && ready(view, "Q") && !empowered(self) && (mode !== "fight" || !ready(view, "R")) ? cast("Q") : undefined;
      if (self.action && self.action.kind !== "windup") return undefined;
      if (mode === "flee") return ready(view, "W") ? { kind: "cast", ability: "W", aim: { direction: -1, distance: maxDash } } : generic(view);
      if (mode === "fight") {
        // The clone first, next to the enemy, so that it spins too.
        if (ready(view, "W") && ready(view, "R") && view.distance <= self.spec.attack.range) return { kind: "cast", ability: "W", aim: { direction: 1, distance: minDash } };
        if (ready(view, "R") && centers <= spinReach - 50 && (!ready(view, "W") || clones(world, self).length > 0)) return cast("R");
        if (ready(view, "R3") && centers <= spinReach - 50) return cast("R3");
        // Otherwise the clone for its attacks, once Cyclone is spent.
        if (ready(view, "W") && !ready(view, "R") && !ready(view, "R3") && view.distance <= self.spec.attack.range) return { kind: "cast", ability: "W", aim: { direction: 1, distance: minDash } };
      }
      return generic(view);
    };

    return {
      abilities,
      behavior,
      start: [innateStat("armor", stoneArmor)],
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          const wCycle = cooldownAfterHaste(wCooldown, d.abilityHaste);
          const rCycle = cooldownAfterHaste(rCooldown, d.abilityHaste) + secondWithin;
          // The clone's attacks for its 4 seconds, and its two spins when it is out for Cyclone.
          const clone = Math.min(1, cloneSeconds / wCycle) * cloneShare * cloneAd * attackDamage(self) * d.attackSpeed * cloneSpeed;
          const cloneSpins = (2 * cloneShare * evaluate(spinTotal, self, target)) / rCycle;
          // Crushing Blow's cut by about one hit a second: more casts than its cooldown alone.
          const qBase = cooldownAfterHaste(qCooldown, d.abilityHaste);
          const qExtra = 1 / (qBase / (1 + crushRefund * d.attackSpeed)) - 1 / qBase;
          return { physical: clone + cloneSpins + qExtra * evaluate(crushDamage, self, target) };
        },
        // Stone Skin's regeneration with four stacks, about what a fight keeps up.
        healing: (self) => (maxHp(self) * stoneRegen * (1 + perStack * Math.min(4, maxStacks))) / 5,
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Strength of Stone runs out one stack a second, five seconds after the last hit.
          const stacks = Number(ctx.memory.stoneStacks ?? 0);
          if (stacks > 0 && ctx.tick >= Number(ctx.memory.stoneUntil ?? 0)) {
            ctx.memory.stoneStacks = stacks - 1;
            ctx.memory.stoneUntil = ctx.tick + ticks(decaySeconds);
            setStoneArmor(ctx);
          }
          ctx.regenerate((maxHp(self) * stoneRegen * (1 + perStack * Number(ctx.memory.stoneStacks ?? 0))) / 5 / 30);
          // Nimbus Strike's attack speed lasts while he spins.
          if (spinning(self) && ctx.tick < Number(ctx.memory.nimbusUntil ?? -1)) {
            ctx.buff("wukong:nimbus", "attackSpeed", strikeAs, strikeAsSeconds);
            ctx.memory.nimbusUntil = ctx.tick + ticks(strikeAsSeconds);
          }
          for (const clone of clones(ctx.world, self)) runClone(ctx, clone);
        },
        onCastStart(ctx) {
          // A cast that ends a spin: where the spin was, for the clone to carry it on (the engine ends it right after).
          const action = ctx.self.action;
          if (spinning(ctx.self) && action?.kind === "channel") {
            ctx.memory.spinEndingBy = ctx.ability.key;
            ctx.memory.spinEndingTick = ctx.tick;
            ctx.memory.spinEndingStart = action.startTick;
            ctx.memory.spinEndingPulse = (action.pulsesDone ?? 0) + 1;
            ctx.memory.spinEndingCast = action.ability === "R3" ? 2 : 1;
          }
          if (ctx.ability.key !== "E") return;
          // Nimbus Strike interrupts the windups of attacks on Wukong, except uncancellable ones.
          const enemy = ctx.enemy;
          for (const windup of [enemy.action, enemy.pendingAttack]) {
            if (windup?.kind !== "windup" || windup.pet !== undefined || windup.uncancellable) continue;
            if (enemy.action === windup) enemy.action = undefined;
            if (enemy.pendingAttack === windup) delete enemy.pendingAttack;
            enemy.attackReadyTick = ctx.tick;
            ctx.log(`${e.name} interrupts the enemy's attack windup`);
          }
          for (const pet of ctx.world.pets) {
            if (pet.owner === ctx.self.side || pet.windup?.target !== ctx.self.side) continue;
            delete pet.windup;
            pet.nextAttackTick = ctx.tick;
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          const self = ctx.self;
          if (key === "Q") {
            // The clone's attack is empowered and its timer reset too; a spin it took over from Wukong ends.
            for (const clone of clones(ctx.world, self)) {
              clone.memory.crushUntil = ctx.tick + ticks(crushWindow);
              clone.memory.attackAt = ctx.tick;
              if (Number(clone.memory.spinStart ?? -1) >= 0 && clone.memory.spinInterruptible) clone.memory.spinStart = -1;
            }
          }
          if (key === "W") {
            const clone = spawnPet(ctx.world, self, cloneSpec(self), self.x);
            clone.memory.attackAt = ctx.tick;
            const empower = self.statuses.find((s) => s.kind === "empower" && s.key === "Q" && (s.empower?.attacks ?? 0) > 0);
            if (empower) clone.memory.crushUntil = empower.endTick;
            // Cast during a spin, the spin carries on as the clone's for the time it had left.
            if (Number(ctx.memory.spinEndingTick ?? -1) === ctx.tick && ctx.memory.spinEndingBy === "W") startCloneSpin(clone, Number(ctx.memory.spinEndingStart), Number(ctx.memory.spinEndingCast), true, Number(ctx.memory.spinEndingPulse));
          }
          if (key === "R" || key === "R3") {
            const second = key === "R3";
            ctx.memory[second ? "knock2" : "knock1"] = false;
            if (!second) ctx.memory.cycloneFirst = ctx.tick;
            // With the second cast spent, Cyclone's cooldown waits for its spin instead of the 8 seconds.
            else {
              self.statuses = self.statuses.filter((st) => !(st.kind === "state" && st.key === "lingering" && st.ability === "R"));
              self.statuses.push({ kind: "state", key: "lingering", source: self.side, startTick: ctx.tick, endTick: ctx.tick + spinTicks, value: 0, ability: "R" });
            }
            for (const clone of clones(ctx.world, self)) startCloneSpin(clone, ctx.tick, second ? 2 : 1, false);
          }
        },
        onChannelInterrupt(ctx) {
          const key = ctx.ability.key;
          if ((key !== "R" && key !== "R3") || ctx.reason !== "cast" || ctx.memory.spinEndingBy === "R4") return;
          // Another ability ends the spin as its recast does.
          const chain = ctx.self.chains.R;
          if (key === "R" && chain?.stage === 1) completeCast(ctx.world, ctx.self, r2Spec, ctx.tick);
          if (key === "R3" && chain?.stage === 3) completeCast(ctx.world, ctx.self, r4Spec, ctx.tick);
        },
        onAbilityContact(ctx) {
          const key = ctx.ability.key;
          if (key !== "R" && key !== "R3") return;
          // The cast's one knock-up, on the first pulse to reach the enemy (a blocked one uses it up too).
          const flag = key === "R3" ? "knock2" : "knock1";
          if (ctx.memory[flag]) return;
          ctx.memory[flag] = true;
          return [...ctx.effects, knockUp];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E") return;
          // The untargetable clones strike up to two other enemies near the target: its pets.
          const near = ctx.world.pets
            .filter((p) => p.owner !== ctx.self.side && !p.spec.untargetable && Math.abs(p.x - ctx.enemy.x) - p.spec.radius <= strikeRadius + EPSILON)
            .sort((a, b) => Math.abs(a.x - ctx.enemy.x) - Math.abs(b.x - ctx.enemy.x) || a.id - b.id)
            .slice(0, 2);
          for (const pet of near) petEffects(ctx.world, ctx.self, pet, [strikeHit], "area", e.name);
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "E" || ctx.interrupted) return;
          ctx.buff("wukong:nimbus", "attackSpeed", strikeAs, strikeAsSeconds);
          ctx.memory.nimbusUntil = ctx.tick + ticks(strikeAsSeconds);
        },
        onAttackLaunch(ctx) {
          // Attacking breaks Warrior Trickster's invisibility as the windup ends.
          ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible" && s.ability === "W"));
        },
        onAttackHit(ctx) {
          if (hasState(ctx.enemy, "invulnerable")) return;
          stoneStack(ctx);
          delete ctx.memory.lastPetHit;
          if (!ctx.blocked) refund(ctx);
        },
        onAttackPetHit(ctx) {
          ctx.memory.lastPetHit = ctx.pet.id;
          refund(ctx);
        },
        onDamageDealt(ctx) {
          if (ctx.attack || ctx.petSource) return;
          stoneStack(ctx);
          refund(ctx);
        },
      },
    };
  },
};
export default wukong;
