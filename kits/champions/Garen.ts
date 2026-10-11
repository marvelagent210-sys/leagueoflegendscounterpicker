/** Garen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive } from "../../engine/sim/derived";

const garen: KitModule = {
  champion: "Garen",
  options: { courageStacks: { label: "Courage stacks collected by level 20 (0.2 armor and magic resistance each, up to 150)", default: 150 } },
  build(kit, options) {
    const innate = kit.ability("Perseverance");
    const q = kit.ability("Decisive Strike");
    const w = kit.ability("Courage");
    const e = kit.ability("Judgment");
    const r = kit.ability("Demacian Justice");

    // Perseverance: % maximum health every 5 s, lost for 8 s after taking damage from champions.
    const regen = innate.levelValue("regenerates an additional") / 100;
    const lockout = innate.quoted("Perseverance is lost for 8 seconds", 0);
    const resistsPerStack = w.quoted("Garen gains 0.2 bonus armor and 0.2 bonus magic resistance", 0);
    const resists = Math.min(options.courageStacks ?? 0, 150) * resistsPerStack;
    const shredHits = e.quoted("Enemy champions hit 6 times by Judgment", 0);
    const shred = e.quoted("are inflicted with 25% armor reduction for 6 seconds", 0) / 100;
    const shredSeconds = e.quoted("are inflicted with 25% armor reduction for 6 seconds", 1);
    kit.assume("Decisive Strike's lunge toward its target isn't modeled (the wiki gives no distance).");
    kit.assume("Judgment always hits Garen's only enemy, the nearest one, for 25% more damage.");

    return {
      start: [
        { type: "stat", stat: "armor", amount: { base: resists }, duration: Number.POSITIVE_INFINITY },
        { type: "stat", stat: "MR", amount: { base: resists }, duration: Number.POSITIVE_INFINITY },
      ],
      hooks: {
        onTick(ctx) {
          const hurt = Number(ctx.memory.hurtTick ?? -1e9);
          if (ctx.tick - hurt < lockout * 30) return;
          // 8 s without damage from the enemy: regenerate on top of base regeneration.
          ctx.regenerate((regen * derive(ctx.self).maxHp) / 150);
        },
        onDamageTaken(ctx) {
          ctx.memory.hurtTick = ctx.tick;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E") return;
          const hits = Number(ctx.memory.judgmentHits ?? 0) + 1;
          ctx.memory.judgmentHits = hits;
          // The shred lands on the 6th hit and refreshes on the 7th and every 6th after.
          if (hits === shredHits || (hits > shredHits && (hits - 1) % shredHits === 0)) {
            ctx.apply({ type: "stat", stat: "armorReductionPercent", amount: { base: shred }, duration: shredSeconds });
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") ctx.memory.judgmentHits = 0;
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          castTime: q.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "cleanse", types: ["slow"] },
            { type: "stat", stat: "moveSpeedPercent", amount: { base: q.quoted("gains 35% bonus movement speed", 0) / 100 }, duration: q.number("Movement Speed Duration") },
            {
              type: "empower",
              attacks: 1,
              window: q.quoted("empowers his next basic attack within 4.5 seconds", 0),
              uncancellable: true,
              resetAttack: true,
              onHit: [
                { type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage") },
                { type: "cc", cc: "silence", duration: q.quoted("silence them for 1.5 seconds", 0) },
              ],
            },
          ],
          roles: ["engage", "buff"],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "state", state: "damageReduction", value: w.fraction("Damage Reduction"), duration: w.quoted("reduces incoming damage for 4 seconds", 0) },
            { type: "shield", amount: w.formula("Shield Strength"), duration: w.quoted("For the first 0.75 seconds", 0) },
            { type: "state", state: "tenacity", value: w.quoted("a shield and 60% tenacity", 0) / 100, duration: w.quoted("For the first 0.75 seconds", 0) },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          delivery: { kind: "self" },
          channel: {
            duration: e.quoted("times over 3 seconds", 0),
            interruptible: false,
            mobile: true,
            range: e.field("effectRadius"),
            // 7 (+ 1 per 25% bonus attack speed) spins.
            pulses: { base: e.quoted("spins his sword around himself 7 (+ 1 per 25% bonus attack speed) times", 0), ratios: { bonusAttackSpeed: 100 / 25 } },
            onTick: [{ type: "damage", damageType: "physical", amount: e.formula("Increased Damage Per Spin"), canCrit: true, critMultiplier: e.quoted("Judgment can critically strike for 130% damage", 0) / 100 }],
          },
          flags: { spellShield: e.flag("spellShield") ?? false },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [{ type: "damage", damageType: "true", amount: r.formula("True Damage") }],
          roles: ["finisher"],
        },
      ],
    };
  },
};

export default garen;
