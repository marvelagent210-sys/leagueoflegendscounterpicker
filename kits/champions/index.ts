/** The champions the simulator plays, by Data Dragon id (behavior waves, PLAN.md section 9). */
import type { KitModule } from "../../engine/kits/compile";
import Aatrox from "./Aatrox";
import Ahri from "./Ahri";
import Akali from "./Akali";
import Akshan from "./Akshan";
import Ambessa from "./Ambessa";
import Amumu from "./Amumu";
import Anivia from "./Anivia";
import Annie from "./Annie";
import Aphelios from "./Aphelios";
import Ashe from "./Ashe";
import Aurora from "./Aurora";
import Brand from "./Brand";
import Caitlyn from "./Caitlyn";
import Camille from "./Camille";
import Cassiopeia from "./Cassiopeia";
import Chogath from "./Chogath";
import Darius from "./Darius";
import Diana from "./Diana";
import DrMundo from "./DrMundo";
import Ekko from "./Ekko";
import Evelynn from "./Evelynn";
import Ezreal from "./Ezreal";
import Fiora from "./Fiora";
import Fizz from "./Fizz";
import Gangplank from "./Gangplank";
import Garen from "./Garen";
import Gnar from "./Gnar";
import Graves from "./Graves";
import Gwen from "./Gwen";
import Heimerdinger from "./Heimerdinger";
import Illaoi from "./Illaoi";
import Irelia from "./Irelia";
import Jax from "./Jax";
import Jayce from "./Jayce";
import Jhin from "./Jhin";
import Jinx from "./Jinx";
import Karthus from "./Karthus";
import Kassadin from "./Kassadin";
import Katarina from "./Katarina";
import Kayle from "./Kayle";
import KSante from "./KSante";
import Kennen from "./Kennen";
import Kindred from "./Kindred";
import Kled from "./Kled";
import Leblanc from "./Leblanc";
import Leona from "./Leona";
import Lissandra from "./Lissandra";
import Lucian from "./Lucian";
import Lux from "./Lux";
import Malphite from "./Malphite";
import Malzahar from "./Malzahar";
import MasterYi from "./MasterYi";
import MissFortune from "./MissFortune";
import Mordekaiser from "./Mordekaiser";
import Morgana from "./Morgana";
import Nasus from "./Nasus";
import Nautilus from "./Nautilus";
import Olaf from "./Olaf";
import Ornn from "./Ornn";
import Pantheon from "./Pantheon";
import Poppy from "./Poppy";
import Quinn from "./Quinn";
import Rammus from "./Rammus";
import Renekton from "./Renekton";
import Riven from "./Riven";
import Rumble from "./Rumble";
import Sett from "./Sett";
import Senna from "./Senna";
import Shen from "./Shen";
import Sion from "./Sion";
import Skarner from "./Skarner";
import Singed from "./Singed";
import TahmKench from "./TahmKench";
import Teemo from "./Teemo";
import Trundle from "./Trundle";
import Tryndamere from "./Tryndamere";
import Udyr from "./Udyr";
import Urgot from "./Urgot";
import Vayne from "./Vayne";
import Veigar from "./Veigar";
import Velkoz from "./Velkoz";
import Vladimir from "./Vladimir";
import Volibear from "./Volibear";
import XinZhao from "./XinZhao";
import Yasuo from "./Yasuo";
import Yone from "./Yone";
import Yorick from "./Yorick";
import Zaahen from "./Zaahen";
import Zeri from "./Zeri";

import Ziggs from "./Ziggs";
import Zyra from "./Zyra";

import Corki from "./Corki";

import Draven from "./Draven";

import KogMaw from "./KogMaw";

import Sivir from "./Sivir";

import Tristana from "./Tristana";

import Twitch from "./Twitch";

import Kaisa from "./Kaisa";
import Kalista from "./Kalista";
import Samira from "./Samira";
import Smolder from "./Smolder";
import Varus from "./Varus";
import Xayah from "./Xayah";

import Khazix from "./Khazix";

import Naafiri from "./Naafiri";

import Nocturne from "./Nocturne";

import Rengar from "./Rengar";

import Talon from "./Talon";

import Zed from "./Zed";

import Hecarim from "./Hecarim";
import JarvanIV from "./JarvanIV";
import LeeSin from "./LeeSin";
import MonkeyKing from "./MonkeyKing";
import Vi from "./Vi";
import Warwick from "./Warwick";

import Alistar from "./Alistar";
import Blitzcrank from "./Blitzcrank";
import Braum from "./Braum";
import Galio from "./Galio";
import Gragas from "./Gragas";
import Maokai from "./Maokai";
import Nunu from "./Nunu";
import Rakan from "./Rakan";
import Rell from "./Rell";
import Sejuani from "./Sejuani";
import Taric from "./Taric";
import Thresh from "./Thresh";
import Janna from "./Janna";
import Karma from "./Karma";
import Lulu from "./Lulu";
import Nami from "./Nami";
import Sona from "./Sona";
import Soraka from "./Soraka";
import Hwei from "./Hwei";
import Orianna from "./Orianna";
import Ryze from "./Ryze";
import Syndra from "./Syndra";
import Taliyah from "./Taliyah";
import Viktor from "./Viktor";
import Neeko from "./Neeko";
import Swain from "./Swain";
import TwistedFate from "./TwistedFate";
import Vex from "./Vex";
import Xerath from "./Xerath";
import Zoe from "./Zoe";

export const KITS: Readonly<Record<string, KitModule>> = Object.fromEntries(
  [Aatrox, Ahri, Akali, Akshan, Ambessa, Amumu, Anivia, Annie, Aphelios, Ashe, Aurora, Brand, Caitlyn, Camille, Cassiopeia, Chogath, Corki, Darius, Diana, DrMundo, Draven, Ekko, Evelynn, Ezreal, Fiora, Fizz, Gangplank, Garen, Gnar, Graves, Gwen, Heimerdinger, Illaoi, Irelia, Jax, Jayce, Jhin, Jinx, KSante, Kaisa, Kalista, Karthus, Kassadin, Katarina, Kayle, Kennen, Kindred, Kled, KogMaw, Leblanc, Leona, Lissandra, Lucian, Lux, Malphite, Malzahar, MasterYi, MissFortune, Mordekaiser, Morgana, Nasus, Nautilus, Olaf, Ornn, Pantheon, Poppy, Quinn, Rammus, Renekton, Riven, Rumble, Samira, Senna, Sett, Shen, Singed, Sion, Sivir, Skarner, Smolder, TahmKench, Teemo, Tristana, Trundle, Tryndamere, Twitch, Udyr, Urgot, Varus, Vayne, Veigar, Velkoz, Vladimir, Volibear, Xayah, XinZhao, Yasuo, Yone, Yorick, Zaahen, Zeri, Ziggs, Khazix, Naafiri, Nocturne, Rengar, Talon, Zed, Zyra, Hecarim, JarvanIV, LeeSin, MonkeyKing, Vi, Warwick, Alistar, Blitzcrank, Braum, Galio, Gragas, Maokai, Nunu, Rakan, Rell, Sejuani, Taric, Thresh, Janna, Karma, Lulu, Nami, Sona, Soraka, Hwei, Orianna, Ryze, Syndra, Taliyah, Viktor, Neeko, Swain, TwistedFate, Vex, Xerath, Zoe].map((kit) => [kit.champion, kit]),
);
