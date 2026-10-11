/**
 * Golden matchups (PLAN.md section 8): kit-driven top-lane matchups with the expected winner
 * at level 20 and the default stat budget, and roughly by how much. They are drafts for review
 * by a top-lane player: each one names the kit interaction it rests on.
 *
 * Margins are on the counter score (-1 to +1): "slight" is any edge, "clear" at least 0.25,
 * "hard" at least 0.5.
 *
 * `disputed` marks an expectation the simulator doesn't meet, with what it shows instead and
 * why. Disputed matchups are skipped until they are reviewed: the expectation changes, or
 * the model does.
 */

export type Margin = "slight" | "clear" | "hard";

export const MARGINS: Record<Margin, number> = { slight: 0, clear: 0.25, hard: 0.5 };

export interface GoldenMatchup {
  winner: string;
  loser: string;
  margin: Margin;
  /** The kit interaction the expectation rests on. */
  why: string;
  disputed?: string;
}

/** Dashes stopped by Poppy's Steadfast Presence. */
export const DASH_DENIAL: GoldenMatchup[] = [
  { winner: "Poppy", loser: "Riven", margin: "clear", why: "Steadfast Presence stops Broken Wings and Valor, which carry Riven's damage." },
  { winner: "Poppy", loser: "Irelia", margin: "clear", why: "Steadfast Presence stops Bladesurge." },
  { winner: "Poppy", loser: "Yasuo", margin: "slight", why: "Steadfast Presence stops Sweeping Blade." },
  { winner: "Poppy", loser: "Yone", margin: "slight", why: "Steadfast Presence stops Mortal Steel's third-cast dash." },
  { winner: "Poppy", loser: "Camille", margin: "slight", why: "Steadfast Presence stops Wall Dive." },
  { winner: "Poppy", loser: "Fiora", margin: "slight", why: "Steadfast Presence stops Lunge." },
];

/** Range and blinds against champions whose damage is basic attacks. */
export const RANGE_AND_BLINDS: GoldenMatchup[] = [
  { winner: "Teemo", loser: "Tryndamere", margin: "clear", why: "Blinding Dart stops the crits Tryndamere's damage and Fury come from, and Teemo out-ranges him." },
  { winner: "Teemo", loser: "Darius", margin: "slight", why: "Blinding Dart stops the attacks that stack Hemorrhage, and Teemo kites him." },
  {
    winner: "Teemo",
    loser: "Garen",
    margin: "slight",
    why: "Blinding Dart makes Decisive Strike miss, and Garen's only way in is its haste.",
    disputed:
      "Close to even (-0.03): Teemo wins when he starts the fight, the trades and the spacing game; Garen wins when he starts it from melee range, and the brawl. In melee range Judgment (2,562 damage in the brawl) and Demacian Justice decide it, and the blind stops neither.",
  },
  { winner: "Teemo", loser: "Olaf", margin: "slight", why: "Blinding Dart stops Olaf's attacks, and Teemo kites him." },
  { winner: "Teemo", loser: "Volibear", margin: "slight", why: "Teemo kites him, and a blinded Thundering Smash attack misses, stun included." },
];

/** Dodged or parried attacks and crowd control. */
export const DODGES_AND_PARRIES: GoldenMatchup[] = [
  {
    winner: "Jax",
    loser: "Tryndamere",
    margin: "slight",
    why: "Counter Strike dodges Tryndamere's attacks for two seconds, then stuns him.",
    disputed:
      "Tryndamere wins every all-in (-0.75). Jax opens with Counter Strike and dodges Tryndamere's early attacks, but at level 20 Undying Rage gives Tryndamere five seconds at 82% crit (200% critical damage) with Counter Strike on cooldown.",
  },
  { winner: "Jax", loser: "Camille", margin: "slight", why: "Counter Strike dodges Precision Protocol's empowered attacks." },
  { winner: "Fiora", loser: "Malphite", margin: "slight", why: "Riposte parries Unstoppable Force, and Vitals' true damage ignores Malphite's armor." },
  { winner: "Fiora", loser: "Volibear", margin: "slight", why: "Riposte parries Thundering Smash's stun." },
  { winner: "Fiora", loser: "Darius", margin: "slight", why: "Riposte parries Apprehend's pull or Noxian Guillotine." },
  { winner: "Fiora", loser: "Sett", margin: "slight", why: "Riposte parries Haymaker." },
  { winner: "Fiora", loser: "Garen", margin: "slight", why: "Riposte parries Decisive Strike's silence or Demacian Justice." },
  { winner: "Fiora", loser: "Mordekaiser", margin: "slight", why: "Riposte parries Death's Grasp's pull, and Vitals' true damage ignores Mordekaiser's armor." },
  {
    winner: "Fiora",
    loser: "Aatrox",
    margin: "slight",
    why: "Riposte parries a Darkin Blade knock-up.",
    disputed:
      "Aatrox wins both all-ins (-0.25 overall; Fiora wins the brawl). Each hit takes 2 s off Deathbringer Stance's cooldown, so the budget buys Aatrox 312% bonus attack speed: a Deathbringer Stance hit about every 1.2 s, healing double through World Ender.",
  },
];

/** True damage and damage from maximum health against tanks. */
export const TANK_BUSTERS: GoldenMatchup[] = [
  { winner: "Fiora", loser: "Ornn", margin: "clear", why: "Vitals deal true damage from maximum health, and Riposte parries Ornn's knock-ups." },
  { winner: "Fiora", loser: "DrMundo", margin: "slight", why: "Vitals deal true damage from maximum health." },
  { winner: "Fiora", loser: "Shen", margin: "slight", why: "Vitals deal true damage from maximum health, and Riposte parries Shadow Dash's taunt." },
  { winner: "Gwen", loser: "DrMundo", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health." },
  { winner: "Gwen", loser: "Ornn", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health." },
  { winner: "Gwen", loser: "Shen", margin: "slight", why: "A Thousand Cuts deals magic damage from maximum health." },
  {
    winner: "Gwen",
    loser: "Malphite",
    margin: "slight",
    why: "Gwen's damage is magic, so Malphite's armor doesn't help him.",
    disputed:
      "Malphite wins (-0.21): the all-in he starts with Unstoppable Force, and the brawl. The budget answers Gwen's magic damage with 134 magic resistance, and Gwen buys 456 ability power and no attack speed, so Snip Snip! rarely reaches its four stacks.",
  },
  { winner: "Mordekaiser", loser: "Malphite", margin: "slight", why: "Mordekaiser's damage is magic, so Malphite's armor doesn't help him." },
  { winner: "Mordekaiser", loser: "Ornn", margin: "slight", why: "Magic damage and Realm of Death's stolen stats against a tank." },
  { winner: "Camille", loser: "Ornn", margin: "slight", why: "Precision Protocol's second hit is true damage." },
  { winner: "Camille", loser: "Shen", margin: "slight", why: "Precision Protocol's second hit is true damage." },
  { winner: "Urgot", loser: "Ornn", margin: "slight", why: "Echoing Flames' shotgun legs deal damage from maximum health, and Fear Beyond Death executes." },
];

/** Crowd control immunity and armor. */
export const IMMUNITY_AND_ARMOR: GoldenMatchup[] = [
  { winner: "Olaf", loser: "Malphite", margin: "slight", why: "Ragnarok ignores Unstoppable Force, and Reckless Swing's true damage ignores his armor." },
  { winner: "Olaf", loser: "Ornn", margin: "slight", why: "Ragnarok ignores Ornn's knock-ups and stuns." },
  { winner: "Olaf", loser: "Poppy", margin: "slight", why: "Ragnarok ignores Heroic Charge's stun and Keeper's Verdict." },
  {
    winner: "Malphite",
    loser: "Tryndamere",
    margin: "clear",
    why: "Ground Slam cuts Tryndamere's attack speed, and Malphite's armor blunts his crits.",
    disputed:
      "Tryndamere wins every all-in (-0.75). Against Malphite the budget buys him 110 lethality and 73% armor penetration, which takes all of Malphite's armor away: at gold value, penetration is cheaper than the armor it cancels.",
  },
  { winner: "Malphite", loser: "Yasuo", margin: "slight", why: "Armor against crits, and Unstoppable Force goes through Wind Wall." },
  { winner: "Malphite", loser: "Yone", margin: "slight", why: "Armor against crits, and Ground Slam cuts Yone's attack speed." },
  { winner: "Malphite", loser: "Riven", margin: "slight", why: "All of Riven's damage is physical, into Malphite's armor and Ground Slam." },
  { winner: "Malphite", loser: "Irelia", margin: "slight", why: "Ground Slam cuts Irelia's attack speed, and her damage is mostly physical." },
];

/** Silences, sustain and late-game scaling. */
export const SCALING_AND_SUSTAIN: GoldenMatchup[] = [
  { winner: "Garen", loser: "Yasuo", margin: "slight", why: "Decisive Strike silences Yasuo, so he can't Sweeping Blade away or stack Steel Tempest." },
  { winner: "Garen", loser: "Yone", margin: "slight", why: "Decisive Strike silences Yone in the middle of his combo." },
  { winner: "Garen", loser: "Irelia", margin: "slight", why: "Decisive Strike silences Irelia (no Bladesurge resets), and Garen's regeneration outlasts her trades." },
  { winner: "Nasus", loser: "Renekton", margin: "slight", why: "By level 20 Siphoning Strike has its stacks, and Wither cripples Renekton's attacks." },
];

export const GOLDEN: GoldenMatchup[] = [...DASH_DENIAL, ...RANGE_AND_BLINDS, ...DODGES_AND_PARRIES, ...TANK_BUSTERS, ...IMMUNITY_AND_ARMOR, ...SCALING_AND_SUSTAIN];
