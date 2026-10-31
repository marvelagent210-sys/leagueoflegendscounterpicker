/**
 * Seraphine (patch 26.20): every third basic ability echoes for free; her casts gather Notes
 * that her next attack fires at the enemy. High Note hits harder on a wounded enemy, Surround
 * Sound shields and speeds her (and heals when a shield was already up), Beat Drop slows, roots
 * a slowed enemy and stuns an immobile one, and Encore charms.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, startCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, missingShare, seriesAt, ticks } from "./util";

const ECHOED: Record<string, string> = { Q: "QX", W: "WX", E: "EX" };
const IMMOBILE = ["stun", "root", "airborne", "suppression", "sleep", "charm", "taunt", "fear", "stasis", "suspension", "ground"];

const seraphine: KitModule = {
  champion: "Seraphine",
  build(kit) {
    const p = kit.ability("Stage Presence");
    const q = kit.ability("High Note");
    const w = kit.ability("Surround Sound");
    const e = kit.ability("Beat Drop");
    const r = kit.ability("Encore");

    // Echo: basic ability casts stack Echo (up to 2, full at the start); at 2, the next one casts again for free 0.033 s later.
    const echoWords = "Seraphine's basic ability casts each generate a stack of Echo, stacking up to 2 times. At 2 stacks, the next basic ability cast consumes them all to cast an additional time at no cost after a 0.033 delay.";
    const maxEcho = p.quoted(echoWords, 0);
    const echoDelay = p.quoted(echoWords, 2);
    p.quote("Seraphine gains maximum stacks of Echo when the game starts and upon respawning.");
    // Harmony: each cast gives her a Note (6 s, up to 4); her next attack gains 25 range per Note and fires them, 27.5 (4 – 25 by level) (+ 4% AP) each.
    const noteWords = "Seraphine's ability casts grant a Note to herself and nearby allied champions that lasts 6 seconds, refreshes on subsequent Notes and stacks up to 4 times on each unit.";
    const noteSeconds = p.quoted(noteWords, 0);
    const maxNotes = p.quoted(noteWords, 1);
    const fireWords = "While any amount of Notes are active, Seraphine's next basic attack is empowered to have an uncancellable windup, gain 25 bonus attack range per Note, and fire all Notes at the target, with each one dealing 4 – 25 (based on level) (+ 4% AP) magic damage";
    const rangePerNote = p.quoted(fireWords, 0);
    const note: Formula = { base: p.levelValue(fireWords, 0), ratios: { AP: p.quoted(fireWords, 3) / 100 } };
    kit.assume("Echoed casts land at once (their cast time is the original's) and give a Note like any cast.");

    // High Note: a soundwave within 900 that expands to 350 over 0.4 s: 160 (+ 40% AP), up to 75% more at 75% missing health.
    const highNote = q.formula("Magic Damage");
    const growth = q.seriesIn("Against champions and monsters, the damage is increased by");
    const expansion = q.quoted("Seraphine hurls a soundwave to the target location that upon arrival expands in a radius over 0.4 seconds", 0);

    // Surround Sound: a 140 (+ 20% AP) shield for 2.5 s and 20% (+ 2% per 100 AP) movement speed decaying; with a shield already up, a heal of 16% of missing health after.
    const soundWords = "For the same duration, she also gains 20% (+ 2% per 100 AP) decaying bonus movement speed";
    const soundSeconds = w.quoted("Seraphine grants a shield to herself and nearby allied champions for 2.5 seconds.", 0);
    const soundSpeed: Formula = { base: w.quoted(soundWords, 0) / 100, ratios: { AP: w.quoted(soundWords, 1) / 100 / 100 } };
    // The heal is a share of the healed unit's own missing health: Seraphine's.
    const soundHeal = w.formula("Heal").ratios?.targetMissingHP ?? 0;
    w.quote("If Seraphine already had a shield at the time of cast, Surround Sound will pulse after the duration, healing herself and nearby allied champions.");
    w.quote("Seraphine can move during Surround Sound's cast time.");

    // Beat Drop: a soundwave (1300, 140, 1200) for 190 (+ 50% AP) and a 99% slow for 1.5 s; an already slowed enemy is also rooted, an immobilized one stunned.
    const dropSlow = e.quoted("slows them by 99% for a few seconds", 0) / 100;
    const dropSeconds = e.number("Disable Duration");
    e.quote("Enemies that are already slowed are also rooted for the same duration.");
    e.quote("Enemies that are immobilized or grounded are also stunned for the same duration.");

    // Encore: a wave (1300, 320, 1600) for 250 (+ 40% AP) that charms for 1.75 s and slows by 40%, 15% more every 0.25 s up to 99%.
    const charmSeconds = r.number("Disable Duration");
    const encoreWords = "slows them by 40% for a duration, increasing by 15% every 0.25 seconds over the duration up to 99%";
    const encoreSlow = r.quoted(encoreWords, 0) / 100;
    const encoreStep = r.quoted(encoreWords, 1) / 100;
    const encoreEvery = r.quoted(encoreWords, 2);
    const encoreMost = r.quoted(encoreWords, 3) / 100;
    const [encoreCast = 0.5] = r.fieldNumbers("castTime");

    const notesOf = (unit: Unit, tick: number) => (tick < Number(unit.memory["seraphine:notesUntil"] ?? -1) ? Number(unit.memory["seraphine:notes"] ?? 0) : 0);

    const qHit: Effect = { type: "damage", damageType: "magic", amount: highNote, amountFor: (caster, target) => evaluate(highNote, caster, target) * (1 + seriesAt(growth, 100 * missingShare(target), true) / 100) };
    const qBase = (key: string, free: boolean): AbilitySpec => ({
      key, name: free ? `${q.name} (echo)` : q.name, slot: "Q", cooldown: free ? 0 : q.cooldown(), cost: free ? 0 : q.cost(), castTime: free ? 0 : q.castTime(),
      ...(free ? { usable: (unit: Unit) => unit.memory["seraphine:echo"] === key } : {}),
      delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius"), delay: expansion, speed: q.field("speed", "Missile travel speed") },
      onHit: [qHit],
      flags: { projectile: true, spellShield: true },
      roles: ["damage"],
    });
    const wBase = (key: string, free: boolean): AbilitySpec => ({
      key, name: free ? `${w.name} (echo)` : w.name, slot: "W", cooldown: free ? 0 : w.cooldown(), cost: free ? 0 : w.cost(), castTime: free ? 0 : w.castTime(), moveWhileCasting: true,
      ...(free ? { usable: (unit: Unit) => unit.memory["seraphine:echo"] === key } : {}),
      delivery: { kind: "self" },
      onSelf: [{ type: "shield", amount: w.formula("Shield Strength"), duration: soundSeconds }],
      roles: ["defense"],
    });
    const eBase = (key: string, free: boolean): AbilitySpec => ({
      key, name: free ? `${e.name} (echo)` : e.name, slot: "E", cooldown: free ? 0 : e.cooldown(), cost: free ? 0 : e.cost(), castTime: free ? 0 : e.castTime(),
      ...(free ? { usable: (unit: Unit) => unit.memory["seraphine:echo"] === key } : {}),
      delivery: { kind: "line", range: e.field("targetRange"), width: e.field("width"), speed: e.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage"), label: e.name }, { type: "cc", cc: "slow", strength: dropSlow, duration: dropSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    });
    const encoreSteps = Math.max(1, Math.round(charmSeconds / encoreEvery));
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: encoreCast,
      delivery: { kind: "line", range: r.field("targetRange"), width: r.field("width"), speed: r.field("speed") },
      onHit: [
        { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
        { type: "cc", cc: "charm", duration: charmSeconds },
        ...Array.from({ length: encoreSteps }, (_, i): Effect => ({ type: "delayed", delay: i * encoreEvery, effects: [{ type: "cc", cc: "slow", strength: Math.min(encoreMost, encoreSlow + i * encoreStep), duration: encoreEvery }] })),
      ],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      roles: ["cc", "damage"],
    };
    const abilities = [qBase("Q", false), wBase("W", false), eBase("E", false), qBase("QX", true), wBase("WX", true), eBase("EX", true), rSpec];
    const byKey = new Map(abilities.map((a) => [a.key, a]));

    const giveNote = (ctx: HookContext) => {
      ctx.memory["seraphine:notes"] = Math.min(maxNotes, notesOf(ctx.self, ctx.tick) + 1);
      ctx.memory["seraphine:notesUntil"] = ctx.tick + ticks(noteSeconds);
    };

    const behavior: Behavior = (view) => defaultBehavior(view);

    return {
      abilities,
      behavior,
      hooks: {
        onStart(ctx) { ctx.memory["seraphine:echoStacks"] = maxEcho; },
        onCastStart(ctx) {
          // Surround Sound heals afterwards when she already had a shield.
          if (ctx.ability.slot === "W") ctx.memory["seraphine:healAt"] = ctx.self.statuses.some((s) => s.kind === "shield" && s.value > 0) ? ctx.tick + ticks(ctx.ability.castTime + soundSeconds) : (ctx.memory["seraphine:healAt"] ?? -1);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          giveNote(ctx);
          if (ctx.ability.slot === "W") ctx.memory["seraphine:soundFrom"] = ctx.tick;
          if (key in ECHOED) {
            const stacks = Number(ctx.memory["seraphine:echoStacks"] ?? 0);
            if (stacks >= maxEcho) {
              ctx.memory["seraphine:echoStacks"] = 0;
              ctx.memory["seraphine:echo"] = ECHOED[key]!;
              ctx.memory["seraphine:echoAt"] = ctx.tick + Math.max(1, ticks(echoDelay));
            } else ctx.memory["seraphine:echoStacks"] = stacks + 1;
          }
          if (key === ctx.memory["seraphine:echo"]) {
            delete ctx.memory["seraphine:echo"];
            delete ctx.memory["seraphine:echoAt"];
          }
        },
        onAbilityContact(ctx) {
          // Beat Drop roots a slowed enemy and stuns an immobilized one.
          if (ctx.ability.slot !== "E" || ctx.enemy.petId !== undefined) return undefined;
          const types = ccTypes(ctx.enemy);
          if (IMMOBILE.some((t) => types.has(t as never))) return [...ctx.effects, { type: "cc", cc: "stun", duration: dropSeconds }];
          if (types.has("slow")) return [...ctx.effects, { type: "cc", cc: "root", duration: dropSeconds }];
          return undefined;
        },
        onAttack(ctx) {
          // An attack with Notes: uncancellable, and it fires them.
          const notes = notesOf(ctx.self, ctx.tick);
          if (notes <= 0) return;
          ctx.action.uncancellable = true;
          ctx.memory["seraphine:firing"] = notes;
          ctx.memory["seraphine:notes"] = 0;
        },
        onAttackHit(ctx) {
          const notes = Number(ctx.memory["seraphine:firing"] ?? 0);
          delete ctx.memory["seraphine:firing"];
          if (ctx.blocked || ctx.enemy.petId !== undefined) return;
          for (let i = 0; i < notes; i++) ctx.apply({ type: "damage", damageType: "magic", amount: note, label: `${p.name} (Note)` });
        },
        onTick(ctx) {
          const self = ctx.self;
          // Each Note adds 25 range to the attack that will fire it.
          ctx.buff("seraphine:noteRange", "attackRange", rangePerNote * notesOf(self, ctx.tick), FOREVER);
          // The echo, cast again for free.
          const echo = ctx.memory["seraphine:echo"];
          if (typeof echo === "string" && ctx.tick >= Number(ctx.memory["seraphine:echoAt"] ?? 0) && !self.action) {
            const spec = byKey.get(echo);
            if (spec && canCast(ctx.world, self, spec)) startCast(ctx.world, self, spec);
          }
          // Surround Sound's decaying movement speed, and its heal.
          const from = ctx.memory["seraphine:soundFrom"];
          if (from !== undefined) {
            const age = (ctx.tick - Number(from)) / 30;
            ctx.buff("seraphine:sound", "moveSpeedPercent", age < soundSeconds ? evaluate(soundSpeed, self) * (1 - age / soundSeconds) : 0, FOREVER);
            if (age >= soundSeconds) delete ctx.memory["seraphine:soundFrom"];
          }
          const healAt = Number(ctx.memory["seraphine:healAt"] ?? -1);
          if (healAt >= 0 && ctx.tick >= healAt) {
            ctx.memory["seraphine:healAt"] = -1;
            ctx.apply({ type: "heal", amount: { base: soundHeal * (derive(self).maxHp - self.hp) } }, true);
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const casts = haste / abilities[0]!.cooldown + haste / abilities[2]!.cooldown;
          return { magic: casts * evaluate(note, self, target) + (evaluate(highNote, self, target) * haste) / (3 * abilities[0]!.cooldown) };
        },
      },
    };
  },
};

export default seraphine;
