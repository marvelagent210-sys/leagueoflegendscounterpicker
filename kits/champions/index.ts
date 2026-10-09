/** The champions the simulator plays, by Data Dragon id (behavior waves, PLAN.md section 9). */
import type { KitModule } from "../../engine/kits/compile";
import Darius from "./Darius";
import Fiora from "./Fiora";
import Garen from "./Garen";
import Irelia from "./Irelia";
import Jax from "./Jax";
import Malphite from "./Malphite";
import Nasus from "./Nasus";
import Olaf from "./Olaf";
import Poppy from "./Poppy";
import Riven from "./Riven";
import Teemo from "./Teemo";
import Tryndamere from "./Tryndamere";
import Yasuo from "./Yasuo";
import Yone from "./Yone";

export const KITS: Readonly<Record<string, KitModule>> = Object.fromEntries(
  [Darius, Fiora, Garen, Irelia, Jax, Malphite, Nasus, Olaf, Poppy, Riven, Teemo, Tryndamere, Yasuo, Yone].map((kit) => [kit.champion, kit]),
);
