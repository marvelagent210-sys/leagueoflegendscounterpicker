/** The champions the simulator plays, by Data Dragon id (behavior waves, PLAN.md section 9). */
import type { KitModule } from "../../engine/kits/compile";
import Aatrox from "./Aatrox";
import Camille from "./Camille";
import Chogath from "./Chogath";
import Darius from "./Darius";
import DrMundo from "./DrMundo";
import Fiora from "./Fiora";
import Garen from "./Garen";
import Gwen from "./Gwen";
import Irelia from "./Irelia";
import Jax from "./Jax";
import Kayle from "./Kayle";
import Kennen from "./Kennen";
import Malphite from "./Malphite";
import Mordekaiser from "./Mordekaiser";
import Nasus from "./Nasus";
import Olaf from "./Olaf";
import Ornn from "./Ornn";
import Pantheon from "./Pantheon";
import Poppy from "./Poppy";
import Quinn from "./Quinn";
import Renekton from "./Renekton";
import Riven from "./Riven";
import Sett from "./Sett";
import Shen from "./Shen";
import Teemo from "./Teemo";
import Trundle from "./Trundle";
import Tryndamere from "./Tryndamere";
import Urgot from "./Urgot";
import Volibear from "./Volibear";
import Yasuo from "./Yasuo";
import Yone from "./Yone";

export const KITS: Readonly<Record<string, KitModule>> = Object.fromEntries(
  [Aatrox, Camille, Chogath, Darius, DrMundo, Fiora, Garen, Gwen, Irelia, Jax, Kayle, Kennen, Malphite, Mordekaiser, Nasus, Olaf, Ornn, Pantheon, Poppy, Quinn, Renekton, Riven, Sett, Shen, Teemo, Trundle, Tryndamere, Urgot, Volibear, Yasuo, Yone].map((kit) => [kit.champion, kit]),
);
