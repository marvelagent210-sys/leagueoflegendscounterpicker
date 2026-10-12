/** Kayle: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackSpeedAtLevel } from "../../engine/stats";
import type { Effect, Formula } from "../../engine/sim/spec";
import { flat, innateStat } from "./util";

const kayle: KitModule = {
  champion: "Kayle",
  build(kit) {
    const innate = kit.ability("Divine Ascent");
    const q = kit.ability("Radiant Blast");
    const w = kit.ability("Celestial Blessing");
    const e = kit.ability("Starfire Spellblade");
    const r = kit.ability("Divine Judgment");

    // Divine Ascent at level 20: Transcendent, ranged with 625 range, Zeal and Exalted for good, and fire waves.
    const range = innate.quoted("Kayle gains an additional 100 bonus attack range for a total of 625", 1);
    innate.quote("permanently gains the full effects of Zealous");
    const zealPerStack = innate.quoted("she gains 6% bonus attack speed, up to a maximum of 30%", 0) / 100;
    const zeal = innate.quoted("she gains 6% bonus attack speed, up to a maximum of 30%", 1) / 100;
    const exalted = innate.quoted("gaining 10% bonus movement speed", 0) / 100;
    const wave: Formula = {
      base: innate.levelValue("While Kayle is Exalted, her basic attacks on-attack also launch a wave of fire"),
      ratios: { bonusAD: innate.quoted("(+ 10% bonus AD) (+ 25% AP) magic damage to all enemies it passes through", 0) / 100, AP: innate.quoted("(+ 10% bonus AD) (+ 25% AP) magic damage to all enemies it passes through", 1) / 100 },
    };
    innate.quote("The wave is affected by critical strike modifiers");
    const missileSpeed = kit.champion.forms[0]?.stats.missileSpeed;
    if (!missileSpeed) throw new Error("Kayle kit: no attack missile speed in the champion data");
    kit.assume(`Kayle's fire wave always hits her attack's target, as on-hit damage; Zeal's ${Math.round(zealPerStack * 100)}% per stack is at its ${Math.round(zeal * 100)}% maximum for good.`);

    // Starfire Spellblade: on-hit damage, and an empowered attack against missing health.
    const passive = e.formula("Passive Damage");
    const missingShare = e.baseOf("Bonus Magic Damage") / 100;
    const missingPerAp = e.quoted("(+ 1.5% per 100 AP) of target's missing health", 0) / 100 / 100;
    const spellblade: Formula = { base: 0, ratios: { targetMissingHP: missingShare }, products: [{ ratio: missingPerAp, stats: ["AP", "targetMissingHP"] }] };
    const bladeWindow = e.quoted("empowering her next basic attack within 6 seconds", 0);

    // Radiant Blast: its cast time is her attack windup; the sword launches 0.264 seconds into it.
    const windupShare = q.quoted("dividing Kayle's windup percent value (0.193555) with her current total attack speed", 0);
    const swordAfter = q.quoted("which is always 0.264 seconds, starting from the beginning of the cast time", 0);
    const stats = kit.champion.forms[0]?.stats;
    const attackSpeed = stats ? attackSpeedAtLevel(stats.attackSpeed, 20, zeal * 100) : 1;
    const blastCast = Math.max(swordAfter, windupShare / attackSpeed);
    kit.assume(`Radiant Blast's sword launches ${blastCast.toFixed(3)} s after the cast starts: her windup at level 20 with Zeal, or the portal's 0.264 s if longer.`);
    const sunder = q.quoted("inflicted with 15% reduced armor and magic resistance for 4 seconds", 0) / 100;
    const sunderFor = q.quoted("inflicted with 15% reduced armor and magic resistance for 4 seconds", 1);

    // Celestial Blessing: a heal and a burst of speed from the start of the cast.
    const blessing = w.formula("Heal");
    const blessingSpeed = w.baseOf("Bonus Movement Speed") / 100;
    const blessingPerAp = w.quoted("(+ 8% per 100 AP)", 0) / 100 / 100;
    const blessingFor = w.quoted("gain bonus movement speed for 2 seconds from the start of the cast time", 0);

    // Divine Judgment: invulnerable from the start of the cast, then swords rain down around her.
    const judgment = r.quoted("invulnerability for 2.5 seconds from the start of the cast time", 0);
    const swordRadius = r.field("effectRadius");

    const onAttack: Effect[] = [
      { type: "damage", damageType: "magic", amount: passive, label: `${e.name} (passive)` },
      { type: "damage", damageType: "magic", amount: wave, canCrit: true, label: "Fire wave" },
    ];

    return {
      attack: { range, ranged: true, missileSpeed, projectile: true, onHit: onAttack },
      start: [innateStat("attackSpeed", zeal), innateStat("moveSpeedPercent", exalted)],
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: blastCast,
          delivery: { kind: "line", range: q.field("range"), width: q.field("width"), speed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: q.quoted("slowed for 2 seconds", 0) },
            { type: "stat", stat: "armorReductionPercent", amount: flat(sunder), duration: sunderFor },
            { type: "stat", stat: "mrReductionPercent", amount: flat(sunder), duration: sunderFor },
          ],
          flags: { projectile: q.flag("projectile") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          moveWhileCasting: true,
          delivery: { kind: "self" },
          onCastStart: [
            { type: "heal", amount: blessing },
            { type: "stat", stat: "moveSpeedPercent", amount: { base: blessingSpeed, ratios: { AP: blessingPerAp } }, duration: blessingFor },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: 0,
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: bladeWindow,
              uncancellable: true,
              resetAttack: true,
              onHit: [{ type: "damage", damageType: "magic", amount: spellblade, label: e.name }],
            },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          moveWhileCasting: true,
          cooldownAtCastStart: true,
          onCastStart: [{ type: "state", state: "invulnerable", duration: judgment }],
          // The swords land around her when the invulnerability ends.
          delivery: { kind: "field", range: 0, radius: swordRadius, duration: 1 / 30, interval: 1, delay: judgment - r.castTime(), attached: true },
          onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }],
        },
      ],
    };
  },
};

export default kayle;
