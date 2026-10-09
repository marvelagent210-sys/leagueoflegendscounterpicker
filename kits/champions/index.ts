/** The champions the simulator plays, by Data Dragon id (behavior waves, PLAN.md section 9). */
import type { KitModule } from "../../engine/kits/compile";
import Aatrox from "./Aatrox";
import Camille from "./Camille";
import Darius from "./Darius";
import DrMundo from "./DrMundo";
import Fiora from "./Fiora";
import Garen from "./Garen";
import Gwen from "./Gwen";
import Irelia from "./Irelia";
import Jax from "./Jax";
import Malphite from "./Malphite";
import Mordekaiser from "./Mordekaiser";
import Nasus from "./Nasus";
import Olaf from "./Olaf";
import Ornn from "./Ornn";
import Poppy from "./Poppy";
import Renekton from "./Renekton";
import Riven from "./Riven";
import Sett from "./Sett";
import Shen from "./Shen";
import Teemo from "./Teemo";
import Tryndamere from "./Tryndamere";
import Urgot from "./Urgot";
import Volibear from "./Volibear";
import Yasuo from "./Yasuo";
import Yone from "./Yone";

export const KITS: Readonly<Record<string, KitModule>> = Object.fromEntries(
  [Aatrox, Camille, Darius, DrMundo, Fiora, Garen, Gwen, Irelia, Jax, Malphite, Mordekaiser, Nasus, Olaf, Ornn, Poppy, Renekton, Riven, Sett, Shen, Teemo, Tryndamere, Urgot, Volibear, Yasuo, Yone].map((kit) => [kit.champion, kit]),
);
