/**
 * Basic attack forms that Module:ChampionData doesn't describe: stances switched by an
 * ability (Jayce, Nidalee, Elise) and permanent attack range gained by level (Kayle,
 * Tristana). Each entry quotes the ability text it comes from; the build fails if the
 * quote is no longer in the wiki's ability data, so a rework can't silently keep it.
 */
export interface AttackFormOverride {
  champion: string;
  /** Name shown for the form, e.g. "Cannon Stance". */
  form: string;
  /** Replace the base form's attack (true) or add a second form (false). */
  replacesBase: boolean;
  range: number;
  ranged: boolean;
  /** Whether the attack fires a missile; undefined keeps the champion's missile speed. */
  projectile?: boolean;
  source: { ability: string; quote: string };
}

export const ATTACK_FORMS: AttackFormOverride[] = [
  {
    champion: "Jayce",
    form: "Cannon Stance",
    replacesBase: false,
    range: 500,
    ranged: true,
    projectile: true,
    source: { ability: "Transform Mercury Cannon", quote: "becoming ranged with 500 attack range" },
  },
  {
    champion: "Nidalee",
    form: "Cougar Form",
    replacesBase: false,
    range: 125,
    ranged: false,
    source: { ability: "Aspect of the Cougar", quote: "gaining melee attacks with 125 range" },
  },
  {
    champion: "Elise",
    form: "Spider Form",
    replacesBase: false,
    range: 125,
    ranged: false,
    source: { ability: "Spider Form / Human Form", quote: "melee basic attacks with 125 range" },
  },
  {
    champion: "Kayle",
    form: "Transcendent (level 16+)",
    replacesBase: true,
    range: 625,
    ranged: true,
    projectile: true,
    source: { ability: "Divine Ascent", quote: "Kayle gains an additional 100 bonus attack range for a total of 625" },
  },
  {
    champion: "Tristana",
    form: "Draw a Bead (level 18+)",
    replacesBase: true,
    range: 700,
    ranged: true,
    source: { ability: "Draw a Bead", quote: "for a total of 550 – 700 (based on level)" },
  },
];
