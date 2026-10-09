/** The champions the simulator plays, by Data Dragon id (behavior waves, PLAN.md section 9). */
import type { KitModule } from "../../engine/kits/compile";
import Darius from "./Darius";
import Garen from "./Garen";
import Jax from "./Jax";
import Malphite from "./Malphite";
import Nasus from "./Nasus";
import Olaf from "./Olaf";
import Teemo from "./Teemo";
import Tryndamere from "./Tryndamere";

export const KITS: Readonly<Record<string, KitModule>> = Object.fromEntries(
  [Darius, Garen, Jax, Malphite, Nasus, Olaf, Teemo, Tryndamere].map((kit) => [kit.champion, kit]),
);
