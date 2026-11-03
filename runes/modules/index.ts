/** Every rune's and stat shard's module, by its name in the catalog (shards as "Shard: <name>"). */
import type { RuneModule } from "../equip";
import { CheapShot, DOMINATION_OUTSIDE, DarkHarvest, Electrocute, HailOfBlades, RelentlessHunter, SuddenImpact, TasteOfBlood, UltimateHunter } from "./domination";
import { ApproachVelocity, BiscuitDelivery, FirstStrike, GlacialAugment, INSPIRATION_OUTSIDE, JackOfAllTrades, MagicalFootwear } from "./inspiration";
import { Conqueror, CoupDeGrace, CutDown, FleetFootwork, LastStand, LegendAlacrity, LegendBloodline, LegendHaste, LethalTempo, PRECISION_OUTSIDE, PresenceOfMind, PressTheAttack } from "./precision";
import { Aftershock, BonePlating, Conditioning, FontOfLife, GraspOfTheUndying, Guardian, Overgrowth, RESOLVE_OUTSIDE, SecondWind, ShieldBash, Unflinching } from "./resolve";
import { SHARDS } from "./shards";
import { AbsoluteFocus, ArcaneComet, AxiomArcanist, Celerity, DeathfireTouch, GatheringStorm, ManaflowBand, NimbusCloak, SORCERY_OUTSIDE, Scorch, StormraidersSurge, SummonAery, Transcendence } from "./sorcery";

const ALL: RuneModule[] = [
  PressTheAttack, LethalTempo, FleetFootwork, Conqueror, PresenceOfMind, LegendAlacrity, LegendHaste, LegendBloodline, CoupDeGrace, CutDown, LastStand, ...PRECISION_OUTSIDE,
  Electrocute, DarkHarvest, HailOfBlades, CheapShot, TasteOfBlood, SuddenImpact, RelentlessHunter, UltimateHunter, ...DOMINATION_OUTSIDE,
  SummonAery, ArcaneComet, StormraidersSurge, DeathfireTouch, AxiomArcanist, ManaflowBand, NimbusCloak, Transcendence, Celerity, AbsoluteFocus, Scorch, GatheringStorm, ...SORCERY_OUTSIDE,
  GraspOfTheUndying, Aftershock, Guardian, FontOfLife, ShieldBash, Conditioning, SecondWind, BonePlating, Overgrowth, Unflinching, ...RESOLVE_OUTSIDE,
  GlacialAugment, FirstStrike, MagicalFootwear, BiscuitDelivery, ApproachVelocity, JackOfAllTrades, ...INSPIRATION_OUTSIDE,
  ...SHARDS,
];

export const RUNE_MODULES: Readonly<Record<string, RuneModule>> = Object.fromEntries(ALL.map((module) => [module.rune, module]));
