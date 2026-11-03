/** The stat shards (the Rune article's shard table), one module per option. */
import type { RuneModule } from "../equip";
import { adaptiveBonus } from "../shared";

const ADAPTIVE = "5.4 bonus attack damage or 9 ability power (adaptive)";

export const SHARDS: RuneModule[] = [
  {
    rune: "Shard: Adaptive Force",
    build: (shard, fighter) => ({ bonus: adaptiveBonus(fighter, shard.quoted(ADAPTIVE), shard.quoted(ADAPTIVE, 1)) }),
  },
  { rune: "Shard: Attack Speed", build: (shard) => ({ bonus: { attackSpeed: shard.quoted("10% bonus attack speed") / 100 } }) },
  { rune: "Shard: Ability Haste", build: (shard) => ({ bonus: { abilityHaste: shard.quoted("8 ability haste") } }) },
  { rune: "Shard: Move Speed", build: (shard) => ({ permanent: [{ stat: "moveSpeedPercent", value: shard.quoted("2.5% bonus movement speed") / 100 }] }) },
  { rune: "Shard: Health Scaling", build: (shard) => ({ bonus: { hp: shard.level("bonus health") } }) },
  { rune: "Shard: Health", build: (shard) => ({ bonus: { hp: shard.quoted("65 bonus health") } }) },
  {
    rune: "Shard: Tenacity and Slow Resist",
    build: (shard) => {
      const share = shard.quoted("15% tenacity and slow resist") / 100;
      return { permanent: [{ state: "tenacity", value: share }, { stat: "slowResist", value: share }] };
    },
  },
];
