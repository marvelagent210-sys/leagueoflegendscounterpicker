/** Every item the simulator models beyond its shop stats, by its catalog name (items/equip.ts). */
import type { ItemModule } from "../equip";
import { AbyssalMask } from "./AbyssalMask";
import { ArchangelsStaff } from "./ArchangelsStaff";
import { Bandlepipes } from "./Bandlepipes";
import { BansheesVeil } from "./BansheesVeil";
import { Bastionbreaker } from "./Bastionbreaker";
import { BlackCleaver } from "./BlackCleaver";
import { BlackfireTorch } from "./BlackfireTorch";
import { BladeOfTheRuinedKing } from "./BladeOfTheRuinedKing";
import { BloodlettersCurse } from "./BloodlettersCurse";
import { Bloodthirster } from "./Bloodthirster";
import { BootsOfSwiftness } from "./BootsOfSwiftness";
import { ChempunkChainsword } from "./ChempunkChainsword";
import { CosmicDrive } from "./CosmicDrive";
import { Dawncore } from "./Dawncore";
import { DeadMansPlate } from "./DeadMansPlate";
import { DeathsDance } from "./DeathsDance";
import { DuskAndDawn } from "./DuskAndDawn";
import { Eclipse } from "./Eclipse";
import { EdgeOfNight } from "./EdgeOfNight";
import { EndlessHunger } from "./EndlessHunger";
import { EssenceReaver } from "./EssenceReaver";
import { ExperimentalHexplate } from "./ExperimentalHexplate";
import { FiendhunterBolts } from "./FiendhunterBolts";
import { Fimbulwinter } from "./Fimbulwinter";
import { ForceOfNature } from "./ForceOfNature";
import { FrozenHeart } from "./FrozenHeart";
import { GuardianAngel } from "./GuardianAngel";
import { GuinsoosRageblade } from "./GuinsoosRageblade";
import { Heartsteel } from "./Heartsteel";
import { HexopticsC44 } from "./HexopticsC44";
import { HextechGunblade } from "./HextechGunblade";
import { HextechRocketbelt } from "./HextechRocketbelt";
import { HollowRadiance } from "./HollowRadiance";
import { HorizonFocus } from "./HorizonFocus";
import { Hullbreaker } from "./Hullbreaker";
import { IcebornGauntlet } from "./IcebornGauntlet";
import { ImmortalShieldbow } from "./ImmortalShieldbow";
import { ImperialMandate } from "./ImperialMandate";
import { JakShoTheProtean } from "./JakShoTheProtean";
import { KaenicRookern } from "./KaenicRookern";
import { KrakenSlayer } from "./KrakenSlayer";
import { LiandrysTorment } from "./LiandrysTorment";
import { LichBane } from "./LichBane";
import { LocketOfTheIronSolari } from "./LocketOfTheIronSolari";
import { LordDominiksRegards } from "./LordDominiksRegards";
import { LudensEcho } from "./LudensEcho";
import { Malignance } from "./Malignance";
import { Manamune } from "./Manamune";
import { MawOfMalmortius } from "./MawOfMalmortius";
import { MejaisSoulstealer } from "./MejaisSoulstealer";
import { MercurialScimitar } from "./MercurialScimitar";
import { MikaelsBlessing } from "./MikaelsBlessing";
import { Morellonomicon } from "./Morellonomicon";
import { MortalReminder } from "./MortalReminder";
import { Muramana } from "./Muramana";
import { NashorsTooth } from "./NashorsTooth";
import { NavoriFlickerblade } from "./NavoriFlickerblade";
import { OverlordsBloodmail } from "./OverlordsBloodmail";
import { PhantomDancer } from "./PhantomDancer";
import { PlatedSteelcaps } from "./PlatedSteelcaps";
import { ProfaneHydra } from "./ProfaneHydra";
import { ProtoplasmHarness } from "./ProtoplasmHarness";
import { RabadonsDeathcap } from "./RabadonsDeathcap";
import { RanduinsOmen } from "./RanduinsOmen";
import { RapidFirecannon } from "./RapidFirecannon";
import { RavenousHydra } from "./RavenousHydra";
import { Redemption } from "./Redemption";
import { Riftmaker } from "./Riftmaker";
import { RodOfAges } from "./RodOfAges";
import { RylaisCrystalScepter } from "./RylaisCrystalScepter";
import { SeraphsEmbrace } from "./SeraphsEmbrace";
import { SerpentsFang } from "./SerpentsFang";
import { SeryldasGrudge } from "./SeryldasGrudge";
import { Shadowflame } from "./Shadowflame";
import { ShurelyasBattlesong } from "./ShurelyasBattlesong";
import { SpearOfShojin } from "./SpearOfShojin";
import { SpiritVisage } from "./SpiritVisage";
import { StatikkShiv } from "./StatikkShiv";
import { SteraksGage } from "./SteraksGage";
import { Stormrazor } from "./Stormrazor";
import { Stormsurge } from "./Stormsurge";
import { Stridebreaker } from "./Stridebreaker";
import { SunderedSky } from "./SunderedSky";
import { SunfireAegis } from "./SunfireAegis";
import { Terminus } from "./Terminus";
import { TheCollector } from "./TheCollector";
import { Thornmail } from "./Thornmail";
import { TitanicHydra } from "./TitanicHydra";
import { TrinityForce } from "./TrinityForce";
import { UmbralGlaive } from "./UmbralGlaive";
import { UnendingDespair } from "./UnendingDespair";
import { VoltaicCyclosword } from "./VoltaicCyclosword";
import { WarmogsArmor } from "./WarmogsArmor";
import { WintersApproach } from "./WintersApproach";
import { WitsEnd } from "./WitsEnd";
import { YoumuusGhostblade } from "./YoumuusGhostblade";
import { YunTalWildarrows } from "./YunTalWildarrows";
import { ZekesConvergence } from "./ZekesConvergence";
import { ZhonyasHourglass } from "./ZhonyasHourglass";
import { OUTSIDE_DUELS } from "./outsideDuels";

const MODULES: ItemModule[] = [
  AbyssalMask,
  ArchangelsStaff,
  Bandlepipes,
  BansheesVeil,
  Bastionbreaker,
  BlackCleaver,
  BlackfireTorch,
  BladeOfTheRuinedKing,
  BloodlettersCurse,
  Bloodthirster,
  BootsOfSwiftness,
  ChempunkChainsword,
  CosmicDrive,
  Dawncore,
  DeadMansPlate,
  DeathsDance,
  DuskAndDawn,
  Eclipse,
  EdgeOfNight,
  EndlessHunger,
  EssenceReaver,
  ExperimentalHexplate,
  FiendhunterBolts,
  Fimbulwinter,
  ForceOfNature,
  FrozenHeart,
  GuardianAngel,
  GuinsoosRageblade,
  Heartsteel,
  HexopticsC44,
  HextechGunblade,
  HextechRocketbelt,
  HollowRadiance,
  HorizonFocus,
  Hullbreaker,
  IcebornGauntlet,
  ImmortalShieldbow,
  ImperialMandate,
  JakShoTheProtean,
  KaenicRookern,
  KrakenSlayer,
  LiandrysTorment,
  LichBane,
  LocketOfTheIronSolari,
  LordDominiksRegards,
  LudensEcho,
  Malignance,
  Manamune,
  MawOfMalmortius,
  MejaisSoulstealer,
  MercurialScimitar,
  MikaelsBlessing,
  Morellonomicon,
  MortalReminder,
  Muramana,
  NashorsTooth,
  NavoriFlickerblade,
  OverlordsBloodmail,
  PhantomDancer,
  PlatedSteelcaps,
  ProfaneHydra,
  ProtoplasmHarness,
  RabadonsDeathcap,
  RanduinsOmen,
  RapidFirecannon,
  RavenousHydra,
  Redemption,
  Riftmaker,
  RodOfAges,
  RylaisCrystalScepter,
  SeraphsEmbrace,
  SerpentsFang,
  SeryldasGrudge,
  Shadowflame,
  ShurelyasBattlesong,
  SpearOfShojin,
  SpiritVisage,
  StatikkShiv,
  SteraksGage,
  Stormrazor,
  Stormsurge,
  Stridebreaker,
  SunderedSky,
  SunfireAegis,
  Terminus,
  TheCollector,
  Thornmail,
  TitanicHydra,
  TrinityForce,
  UmbralGlaive,
  UnendingDespair,
  VoltaicCyclosword,
  WarmogsArmor,
  WintersApproach,
  WitsEnd,
  YoumuusGhostblade,
  YunTalWildarrows,
  ZekesConvergence,
  ZhonyasHourglass,
  ...OUTSIDE_DUELS,
];

export const ITEM_MODULES: Readonly<Record<string, ItemModule>> = Object.fromEntries(MODULES.map((module) => [module.item, module]));
