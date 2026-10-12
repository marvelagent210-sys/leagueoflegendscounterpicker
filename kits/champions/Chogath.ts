/** Cho'Gath: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import type { Series } from "../../engine/abilities";
import type { Formula } from "../../engine/sim/spec";
import { innateStat } from "./util";

const chogath: KitModule = {
  champion: "Chogath",
  options: {
    feastStacks: { label: "Feast stacks by level 20 (6 from minions and monsters, the rest from champions)", default: 8 },
  },
  build(kit, options) {
    const q = kit.ability("Rupture");
    const w = kit.ability("Feral Scream");
    const e = kit.ability("Vorpal Spikes");
    const r = kit.ability("Feast");
    const stacks = Math.max(0, options.feastStacks ?? 0);

    // Feast: each stack adds health, attack range (capped) and size (capped).
    const healthPerStack = r.number("Bonus Health Per Stack");
    const rangePerStack = r.number("Bonus Attack Range Per Stack");
    const rangeCap = r.quoted("capping at 75 bonus attack range and 100% increased size", 0);
    const sizePerStack = r.fraction("Bonus Size Per Stack");
    const sizeCap = r.quoted("capping at 75 bonus attack range and 100% increased size", 1) / 100;
    const castRangePerStack = r.quoted("Each stack of Feast increases the cast range of the ability by 2.5", 0);
    const castRangeCap = r.quoted("for a maximum increase of 25 at 10 stacks", 0);
    const damagePerStack = r.quoted("Each stack of Feast increases the damage by 8 / 12 / 16", 2);
    const bonusHealth = stacks * healthPerStack;
    const bonusRange = Math.min(rangeCap, stacks * rangePerStack);
    const size = Math.min(sizeCap, stacks * sizePerStack);
    kit.assume(`${stacks} Feast stacks: ${bonusHealth} bonus health, ${Math.round(bonusRange * 10) / 10} bonus attack range, ${Math.round(size * 100)}% bigger (the hitbox doesn't grow).`);

    // Rupture: a knock up that lands after a delay, then a slow.
    const ruptureDelay = q.quoted("ruptures the target location after a 0.627 delay", 0);
    const knockUp = q.quoted("knocking them up for 1 second", 0);
    const ruptureSlow = q.quoted("afterwards slowing them by 60% for 1.5 seconds", 0) / 100;
    const ruptureSlowFor = q.quoted("afterwards slowing them by 60% for 1.5 seconds", 1);

    // Vorpal Spikes: three empowered attacks launch spikes; their width grows with size.
    const spikeAttacks = e.quoted("empowers its next 3 basic attacks within 6 seconds", 0);
    const spikeWindow = e.quoted("empowers its next 3 basic attacks within 6 seconds", 1);
    const spikeRange = e.quoted("to gain 50 bonus range", 0);
    // "110 (+ 30% AP) (+ 3.9% (+ 0.5% per Feast stack) of target's maximum health)": the per-stack part grows the share.
    const spikeShare = e.quoted("(+ 2.5 / 2.85 / 3.2 / 3.55 / 3.9% (+ 0.5% per Feast stack) of target's maximum health)", 4) / 100;
    const perStack = e.quoted("(+ 0.5% per Feast stack)", 0) / 100;
    const spikeDamage: Formula = { base: e.baseOf("Magic Damage"), ratios: { AP: e.quoted("110 (+ 30% AP)", 1) / 100, targetMaxHP: spikeShare + perStack * stacks } };
    const spikeSlow = e.fraction("Slow");
    const spikeSlowFor = e.quoted("slowed by an amount that decays over 1.5 seconds", 0);
    const width = spikeWidth(e.record.fields.width?.values[0]?.series, size * 100, e.fieldNumbers("width"));
    kit.assume(`Vorpal Spikes' slow, which decays over ${spikeSlowFor} s, is taken as half its strength for the whole time; the spikes are ${width} wide at ${Math.round(size * 100)}% bonus size and always hit the attack's target.`);

    const feast: Formula = (() => {
      const base = r.formula("Champion True Damage");
      return { ...base, base: base.base + damagePerStack * stacks };
    })();

    return {
      attack: { range: (kit.champion.forms[0]?.stats.attackRange ?? 125) + bonusRange },
      start: bonusHealth > 0 ? [innateStat("health", bonusHealth)] : [],
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius"), delay: ruptureDelay, centered: true },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic damage") },
            { type: "displace", direction: "away", distance: 0, duration: knockUp },
            { type: "delayed", delay: knockUp, effects: [{ type: "cc", cc: "slow", strength: ruptureSlow, duration: ruptureSlowFor }] },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "area", near: 0, far: w.field("targetRange"), delay: 0, anchor: "caster" },
          onHit: [
            { type: "damage", damageType: "magic", amount: w.formula("Magic damage") },
            { type: "cc", cc: "silence", duration: w.number("Silence Duration") },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: spikeAttacks,
              window: spikeWindow,
              bonusRange: spikeRange,
              resetAttack: true,
              onHit: [
                { type: "damage", damageType: "magic", amount: spikeDamage, label: e.name },
                { type: "cc", cc: "slow", strength: spikeSlow / 2, duration: spikeSlowFor },
              ],
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
          delivery: { kind: "target", range: r.field("targetRange") + Math.min(castRangeCap, castRangePerStack * stacks) },
          onHit: [{ type: "damage", damageType: "true", amount: feast }],
          roles: ["finisher"],
        },
      ],
    };
  },
};

/** Vorpal Spikes' width at a bonus size (percent): the wiki's steps by bonus size. */
function spikeWidth(series: Series | undefined, bonusSizePercent: number, listed: number[]): number {
  // "340 / 370 / 380 / 410 / 440 / 470 / 500 (based on bonus size)": the narrowest without stacks.
  const narrowest = listed[0] ?? 340;
  if (!series || series.kind !== "variable") return narrowest;
  let width = narrowest;
  series.points.forEach((point, i) => {
    const threshold = typeof point === "number" ? point : Number(String(point).split("±")[0]);
    const value = series.values[i];
    if (Number.isFinite(threshold) && bonusSizePercent >= threshold && typeof value === "number") width = value;
  });
  return width;
}

export default chogath;
