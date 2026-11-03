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
  {
    winner: "Poppy",
    loser: "Fiora",
    margin: "slight",
    why: "Steadfast Presence stops Lunge.",
    disputed:
      "Fiora wins every all-in (-0.74). Poppy's damage is all physical, and with penetration capped the budget answers it with 5,600 gold of armor (406 in all), while Poppy spends hers on damage rather than health: her opening crowd control wears off with Fiora barely scratched.",
  },
  // Wave 2.
  { winner: "Poppy", loser: "Kled", margin: "clear", why: "Steadfast Presence stops Jousting's dashes and Chaaaaaaaarge!!!'s final dash." },
  { winner: "Poppy", loser: "Akali", margin: "clear", why: "Steadfast Presence stops Shuriken Flip's dash back in and both of Perfect Execution's dashes." },
  { winner: "Poppy", loser: "Gnar", margin: "slight", why: "Steadfast Presence stops Hop and Crunch." },
  { winner: "Poppy", loser: "Pantheon", margin: "slight", why: "Steadfast Presence stops Shield Vault's leap, and with it the stun." },
];

/** Range and blinds against champions whose damage is basic attacks. */
export const RANGE_AND_BLINDS: GoldenMatchup[] = [
  { winner: "Teemo", loser: "Tryndamere", margin: "clear", why: "Blinding Dart stops the crits Tryndamere's damage and Fury come from, and Teemo out-ranges him." },
  { winner: "Teemo", loser: "Darius", margin: "slight", why: "Blinding Dart stops the attacks that stack Hemorrhage, and Teemo kites him." },
  { winner: "Teemo", loser: "Garen", margin: "slight", why: "Blinding Dart makes Decisive Strike miss, and Garen's only way in is its haste." },
  { winner: "Teemo", loser: "Olaf", margin: "slight", why: "Blinding Dart stops Olaf's attacks, and Teemo kites him." },
  { winner: "Teemo", loser: "Volibear", margin: "slight", why: "Teemo kites him, and a blinded Thundering Smash attack misses, stun included." },
  // Wave 2.
  { winner: "Teemo", loser: "Gangplank", margin: "clear", why: "Teemo out-ranges Gangplank and shoots his Powder Kegs away, and Blinding Dart makes Trial by Fire's attack miss." },
  { winner: "Teemo", loser: "Kled", margin: "slight", why: "Teemo kites Kled, and Blinding Dart stops his attacks." },
  { winner: "Teemo", loser: "Udyr", margin: "slight", why: "Blinding Dart makes Udyr's empowered attacks miss, and Teemo kites him." },
  { winner: "Quinn", loser: "Darius", margin: "clear", why: "Quinn out-ranges Darius, and Vault knocks him back when he closes in." },
  { winner: "Quinn", loser: "Garen", margin: "clear", why: "Quinn out-ranges Garen, and Blinding Assault's nearsight and Vault keep him off her." },
  { winner: "Kayle", loser: "Darius", margin: "slight", why: "By level 20 Kayle attacks from range, and Divine Judgment's invulnerability answers Noxian Guillotine." },
];

/** Dodged or parried attacks and crowd control. */
export const DODGES_AND_PARRIES: GoldenMatchup[] = [
  { winner: "Jax", loser: "Tryndamere", margin: "slight", why: "Counter Strike dodges Tryndamere's attacks for two seconds, then stuns him." },
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
  // Wave 2.
  { winner: "Jax", loser: "Gangplank", margin: "slight", why: "Counter Strike dodges Gangplank's attacks, Trial by Fire's included, then stuns him." },
  { winner: "Jax", loser: "Udyr", margin: "slight", why: "Counter Strike dodges Udyr's empowered attacks." },
  { winner: "Fiora", loser: "KSante", margin: "clear", why: "Vitals deal true damage from maximum health, and Riposte parries Path Maker's stun or All Out's root." },
  { winner: "Fiora", loser: "Skarner", margin: "slight", why: "Riposte parries Impale's suppression or Ixtal's Impact's stun." },
  { winner: "Fiora", loser: "Sion", margin: "slight", why: "Riposte parries Decimating Smash's knock-up, and Vitals' true damage ignores Sion's armor." },
];

/** True damage and damage from maximum health against tanks. */
export const TANK_BUSTERS: GoldenMatchup[] = [
  { winner: "Fiora", loser: "Ornn", margin: "clear", why: "Vitals deal true damage from maximum health, and Riposte parries Ornn's knock-ups." },
  { winner: "Fiora", loser: "DrMundo", margin: "slight", why: "Vitals deal true damage from maximum health." },
  { winner: "Fiora", loser: "Shen", margin: "slight", why: "Vitals deal true damage from maximum health, and Riposte parries Shadow Dash's taunt." },
  { winner: "Gwen", loser: "DrMundo", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health." },
  { winner: "Gwen", loser: "Ornn", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health." },
  { winner: "Gwen", loser: "Shen", margin: "slight", why: "A Thousand Cuts deals magic damage from maximum health." },
  { winner: "Gwen", loser: "Malphite", margin: "slight", why: "Gwen's damage is magic, so Malphite's armor doesn't help him." },
  { winner: "Mordekaiser", loser: "Malphite", margin: "slight", why: "Mordekaiser's damage is magic, so Malphite's armor doesn't help him." },
  { winner: "Mordekaiser", loser: "Ornn", margin: "slight", why: "Magic damage and Realm of Death's stolen stats against a tank." },
  { winner: "Camille", loser: "Ornn", margin: "slight", why: "Precision Protocol's second hit is true damage." },
  { winner: "Camille", loser: "Shen", margin: "slight", why: "Precision Protocol's second hit is true damage." },
  {
    winner: "Urgot",
    loser: "Ornn",
    margin: "slight",
    why: "Echoing Flames' shotgun legs deal damage from maximum health, and Fear Beyond Death executes.",
    disputed:
      "Even (0.00): every all-in runs the full 30 s with both near half health. Urgot's damage is all physical, and Ornn buys 8,500 gold of armor that Living Forge makes worth 30% more (562 armor in all) against Urgot's capped 34% penetration.",
  },
  // Wave 2.
  { winner: "Trundle", loser: "Ornn", margin: "clear", why: "Subjugate drains 30% of Ornn's maximum health and steals 40% of his armor and magic resistance." },
  { winner: "Trundle", loser: "Chogath", margin: "clear", why: "Subjugate drains 30% of Cho'Gath's maximum health, Feast's health included, and steals 40% of his resistances." },
  // Slight since 26.21, which raised Sion's health growth from 87 to 95 a level: that alone takes Trundle's margin from +0.46 to +0.18.
  { winner: "Trundle", loser: "Sion", margin: "slight", why: "Subjugate drains 30% of Sion's maximum health and steals 40% of his resistances." },
  {
    winner: "Trundle",
    loser: "DrMundo",
    margin: "clear",
    why: "Subjugate drains 30% of Dr. Mundo's maximum health and steals 40% of his resistances.",
    disputed:
      "Dr. Mundo wins every all-in (-0.78). He buys 8,600 gold of health and 5,100 of armor: Subjugate's share of his health comes to about 1,100 after magic resistance, Maximum Dosage heals more than that back, and Trundle's attacks run into the armor.",
  },
  { winner: "Gwen", loser: "Chogath", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health, Feast's health included." },
  { winner: "Gwen", loser: "TahmKench", margin: "clear", why: "A Thousand Cuts deals magic damage from maximum health." },
];

/** Crowd control immunity and armor. */
export const IMMUNITY_AND_ARMOR: GoldenMatchup[] = [
  { winner: "Olaf", loser: "Malphite", margin: "slight", why: "Ragnarok ignores Unstoppable Force, and Reckless Swing's true damage ignores his armor." },
  { winner: "Olaf", loser: "Ornn", margin: "slight", why: "Ragnarok ignores Ornn's knock-ups and stuns." },
  { winner: "Olaf", loser: "Poppy", margin: "slight", why: "Ragnarok ignores Heroic Charge's stun and Keeper's Verdict." },
  { winner: "Malphite", loser: "Tryndamere", margin: "clear", why: "Ground Slam cuts Tryndamere's attack speed, and Malphite's armor blunts his crits." },
  { winner: "Yasuo", loser: "Malphite", margin: "slight", why: "After Last Breath, Yasuo's critical strikes ignore 60% of Malphite's bonus armor, adding to his armor penetration, and Intent's doubled crit chance makes every attack crit." },
  { winner: "Malphite", loser: "Yone", margin: "slight", why: "Armor against crits, and Ground Slam cuts Yone's attack speed." },
  { winner: "Malphite", loser: "Riven", margin: "slight", why: "All of Riven's damage is physical, into Malphite's armor and Ground Slam." },
  { winner: "Malphite", loser: "Irelia", margin: "slight", why: "Ground Slam cuts Irelia's attack speed, and her damage is mostly physical." },
  // Wave 2.
  { winner: "Olaf", loser: "KSante", margin: "slight", why: "Ragnarok ignores Path Maker's stun and All Out's root, and Reckless Swing's true damage ignores K'Sante's resistances." },
  { winner: "Olaf", loser: "Skarner", margin: "slight", why: "Ragnarok ignores Impale's suppression and Ixtal's Impact's stun." },
  { winner: "Malphite", loser: "Pantheon", margin: "slight", why: "Pantheon's damage is all physical, into Malphite's armor." },
  {
    winner: "Malphite",
    loser: "Gangplank",
    margin: "slight",
    why: "Gangplank's attacks, Parrrley and Powder Kegs are physical, into Malphite's armor.",
    disputed:
      "Gangplank wins every all-in (+0.76 for him). Both buy armor (Malphite 7,650 gold, Gangplank 5,300), so Malphite's physical damage stays low, while Trial by Fire's true damage and Cannon Barrage's magic damage carry Gangplank through fights of about 18 seconds.",
  },
];

/** Silences, sustain and late-game scaling. */
export const SCALING_AND_SUSTAIN: GoldenMatchup[] = [
  { winner: "Yasuo", loser: "Garen", margin: "slight", why: "Intent doubles Yasuo's crit chance, and after Last Breath his critical strikes ignore 60% of Garen's bonus armor, adding to his armor penetration; Decisive Strike's silence doesn't turn the fight." },
  { winner: "Garen", loser: "Yone", margin: "slight", why: "Decisive Strike silences Yone in the middle of his combo." },
  { winner: "Garen", loser: "Irelia", margin: "slight", why: "Decisive Strike silences Irelia (no Bladesurge resets), and Garen's regeneration outlasts her trades." },
  { winner: "Nasus", loser: "Renekton", margin: "slight", why: "By level 20 Siphoning Strike has its stacks, and Wither cripples Renekton's attacks." },
];

export const GOLDEN: GoldenMatchup[] = [...DASH_DENIAL, ...RANGE_AND_BLINDS, ...DODGES_AND_PARRIES, ...TANK_BUSTERS, ...IMMUNITY_AND_ARMOR, ...SCALING_AND_SUSTAIN];
