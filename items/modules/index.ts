/** Every item the simulator models beyond its shop stats, by its catalog name (items/equip.ts). */
import type { ItemModule } from "../equip";
import { BlackCleaver } from "./BlackCleaver";
import { BladeOfTheRuinedKing } from "./BladeOfTheRuinedKing";
import { BootsOfSwiftness } from "./BootsOfSwiftness";
import { ChempunkChainsword } from "./ChempunkChainsword";
import { DuskAndDawn } from "./DuskAndDawn";
import { EssenceReaver } from "./EssenceReaver";
import { GuinsoosRageblade } from "./GuinsoosRageblade";
import { HextechGunblade } from "./HextechGunblade";
import { IcebornGauntlet } from "./IcebornGauntlet";
import { KrakenSlayer } from "./KrakenSlayer";
import { LichBane } from "./LichBane";
import { Morellonomicon } from "./Morellonomicon";
import { MortalReminder } from "./MortalReminder";
import { NashorsTooth } from "./NashorsTooth";
import { PhantomDancer } from "./PhantomDancer";
import { RabadonsDeathcap } from "./RabadonsDeathcap";
import { SteraksGage } from "./SteraksGage";
import { TrinityForce } from "./TrinityForce";
import { WitsEnd } from "./WitsEnd";
import { ZhonyasHourglass } from "./ZhonyasHourglass";

const MODULES: ItemModule[] = [
  BlackCleaver,
  BladeOfTheRuinedKing,
  BootsOfSwiftness,
  ChempunkChainsword,
  DuskAndDawn,
  EssenceReaver,
  GuinsoosRageblade,
  HextechGunblade,
  IcebornGauntlet,
  KrakenSlayer,
  LichBane,
  Morellonomicon,
  MortalReminder,
  NashorsTooth,
  PhantomDancer,
  RabadonsDeathcap,
  SteraksGage,
  TrinityForce,
  WitsEnd,
  ZhonyasHourglass,
];

export const ITEM_MODULES: Readonly<Record<string, ItemModule>> = Object.fromEntries(MODULES.map((module) => [module.item, module]));
