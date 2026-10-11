# Counters to Kayle (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 42 other champions with a simulator kit against Kayle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kayle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kayle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 2 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | −0.50 | +1.00 | +1.00 |
| 3 | Poppy | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 4 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 5 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 6 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.00 |
| 7 | Trundle | +0.75 | +1.00 | +1.00 | +1.00 | −0.67 | +1.00 | +1.00 |
| 8 | Renekton | +0.73 | +1.00 | +1.00 | +1.00 | −0.44 | +1.00 | +0.00 |
| 9 | Malphite | +0.73 | +1.00 | +1.00 | +1.00 | −0.44 | +1.00 | +0.00 |
| 10 | Nasus | +0.72 | +1.00 | +1.00 | +1.00 | −0.50 | +1.00 | +0.00 |
| 11 | Tahm Kench | +0.49 | +0.52 | +0.52 | +0.83 | −0.07 | +0.73 | +0.00 |
| 12 | Zaahen | +0.28 | −0.23 | +0.41 | +1.00 | −0.43 | +1.00 | +0.00 |
| 13 | Fiora | −0.23 | −0.47 | −0.47 | +1.00 | −0.96 | −1.00 | +1.00 |
| 14 | Rumble | −0.26 | −0.68 | −0.65 | +0.95 | −0.15 | −1.00 | +0.00 |
| 15 | Riven | −0.52 | −1.00 | −1.00 | +1.00 | −0.79 | −1.00 | +0.00 |
| 16 | Mordekaiser | −0.67 | −0.68 | −0.61 | −0.87 | −0.66 | −0.76 | +0.00 |
| 17 | Yasuo | −0.67 | −0.11 | −1.00 | −1.00 | −0.63 | −1.00 | +0.00 |
| 18 | Irelia | −0.68 | −1.00 | −1.00 | −1.00 | −0.09 | +0.38 | +0.00 |
| 19 | Sion | −0.76 | −1.00 | −1.00 | −0.52 | −0.39 | −1.00 | +0.00 |
| 20 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 21 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 22 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 23 | Sett | −0.82 | −0.84 | −1.00 | −0.92 | −0.50 | −1.00 | +0.00 |
| 24 | Quinn | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 25 | Teemo | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 26 | Gnar | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 27 | Kled | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 28 | Shen | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 29 | Ornn | −0.87 | −1.00 | −1.00 | −1.00 | −0.45 | −1.00 | +0.00 |
| 30 | Olaf | −0.87 | −1.00 | −1.00 | −1.00 | −0.47 | −1.00 | +0.00 |
| 31 | Garen | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 32 | Urgot | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 33 | Akali | −0.88 | −1.00 | −1.00 | −1.00 | −0.55 | −1.00 | +0.00 |
| 34 | Ambessa | −0.88 | −1.00 | −1.00 | −1.00 | −0.56 | −1.00 | +0.00 |
| 35 | Aatrox | −0.89 | −1.00 | −1.00 | −1.00 | −0.70 | −0.81 | +0.00 |
| 36 | Pantheon | −0.89 | −1.00 | −1.00 | −1.00 | −0.59 | −1.00 | +0.00 |
| 37 | Darius | −0.89 | −1.00 | −1.00 | −1.00 | −0.59 | −1.00 | +0.00 |
| 38 | Volibear | −0.89 | −1.00 | −1.00 | −1.00 | −0.59 | −1.00 | +0.00 |
| 39 | Singed | −0.90 | −1.00 | −1.00 | −0.91 | −0.78 | −1.00 | +0.00 |
| 40 | Cho'Gath | −0.91 | −1.00 | −1.00 | −1.00 | −0.71 | −1.00 | +0.00 |
| 41 | Gwen | −0.92 | −0.99 | −1.00 | −1.00 | −0.84 | −1.00 | +0.00 |
| 42 | Yone | −0.94 | −1.00 | −1.00 | −1.00 | −0.91 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Kayle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.11)

- **0.47** blind: Blinding Dart's blind makes Kayle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kayle basic attacks)
- **0.15** blind: Blinding Dart's blind makes Kayle's Starfire Spellblade, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Teemo's (625 vs 500 attack range).

#### 2. Lulu (net +0.10)

- **0.34** disarm: Whimsy disarms Kayle for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayle basic attacks)
- Watch out: Kayle's basic attacks reach 75 units farther than Lulu's (625 vs 550 attack range).

#### 3. Braum (net +0.06)

- **0.50** projectile block: Unbreakable blocks Kayle's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kayle basic attacks)
- **0.45** projectile block: Unbreakable blocks Kayle's Radiant Blast, a projectile. Unbreakable for 4 s, long enough to use ahead of Radiant Blast. (Braum E Unbreakable → Kayle Q Radiant Blast)
- **0.38** projectile block: Unbreakable blocks Kayle's Starfire Spellblade, a projectile. Unbreakable for 4 s, long enough to use ahead of Starfire Spellblade. (Braum E Unbreakable → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Braum's Glacial Fissure (its crowd control still applies).

#### 4. Samira (net 0.00)

- **0.30** projectile block: Blade Whirl blocks Kayle's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kayle basic attacks)
- **0.28** projectile block: Blade Whirl blocks Kayle's Radiant Blast, a projectile. Blade Whirl for 0.75 s; Radiant Blast takes 0.56 s to land, enough to react. (Samira W Blade Whirl → Kayle Q Radiant Blast)
- **0.15** projectile block: Blade Whirl blocks Kayle's Starfire Spellblade, a projectile. Blade Whirl for 0.75 s; Starfire Spellblade lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Samira's Wild Rush.

#### 5. Yunara (net 0.00)

- No interaction in Yunara's favor.

#### 6. Shen (net -0.03)

- **0.36** attack block: Spirit's Refuge blocks Kayle's basic attacks (with Divine Ascent). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kayle basic attacks)
- **0.17** attack block: Spirit's Refuge blocks Kayle's Starfire Spellblade, an empowered attack. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Parry interactions:
  - Blind: The main target will never receive damage, but the secondary targets will receive the active's spell damage.
  - Block: Blocking will always negate all damage. Keep in mind that if a secondary target is outside of Spirit's Refuge zone, they won't block damage.
  - Dodge: Dodging will always negate all damage. : All parry interactions are marked for retesting because of patch V11.1 changes. (Shen W Spirit's Refuge → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Shen's Shadow Dash (its crowd control still applies).

#### 7. Kai'Sa (net -0.09)

- No interaction in Kai'Sa's favor.
- Watch out: Kayle's basic attacks reach 100 units farther than Kai'Sa's (625 vs 525 attack range).

#### 8. Kled (net -0.12)

- **0.05** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Kayle's Radiant Blast (slow). Immune for ?; Radiant Blast takes 0.56 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Kayle Q Radiant Blast)
- Watch out: Kayle's basic attacks reach 375 units farther than Kled's (625 vs 250 attack range).

#### 9. Twitch (net -0.14)

- No interaction in Twitch's favor.
- Watch out: Kayle's basic attacks reach 75 units farther than Twitch's (625 vs 550 attack range).

#### 10. Kalista (net -0.16)

- **0.04** cleanse: Fate's Call cleanses Kayle's Radiant Blast (slow) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Kayle Q Radiant Blast)
- Watch out: Divine Judgment makes Kayle invulnerable to Kalista's Basic Attack.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.11 | 0.54 | 0.43 | blind (Blinding Dart) |
| 2 | Lulu | +0.10 | 0.34 | 0.24 |  |
| 3 | Braum | +0.06 | 0.82 | 0.76 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Samira | 0.00 | 0.48 | 0.48 |  |
| 5 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 6 | Shen | -0.03 | 0.45 | 0.48 |  |
| 7 | Kai'Sa | -0.09 | 0.00 | 0.09 |  |
| 8 | Kled | -0.12 | 0.05 | 0.17 |  |
| 9 | Twitch | -0.14 | 0.00 | 0.14 |  |
| 10 | Kalista | -0.16 | 0.04 | 0.20 |  |
| 11 | Yasuo | -0.18 | 0.62 | 0.80 |  |
| 12 | Bard | -0.21 | 0.00 | 0.21 |  |
| 13 | Kindred | -0.21 | 0.00 | 0.21 |  |
| 14 | Sivir | -0.22 | 0.00 | 0.22 |  |
| 15 | Vayne | -0.24 | 0.00 | 0.24 |  |
| 16 | Twisted Fate | -0.25 | 0.00 | 0.25 |  |
| 17 | Zoe | -0.25 | 0.00 | 0.25 |  |
| 18 | Taliyah | -0.27 | 0.00 | 0.27 |  |
| 19 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 20 | Milio | -0.29 | 0.06 | 0.35 |  |
| 21 | Mel | -0.30 | 0.47 | 0.77 |  |
| 22 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 23 | Renata Glasc | -0.32 | 0.00 | 0.32 |  |
| 24 | Soraka | -0.32 | 0.00 | 0.32 |  |
| 25 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 26 | Varus | -0.34 | 0.00 | 0.34 |  |
| 27 | Heimerdinger | -0.35 | 0.05 | 0.40 |  |
| 28 | Anivia | -0.35 | 0.00 | 0.35 |  |
| 29 | Jayce | -0.35 | 0.00 | 0.35 |  |
| 30 | LeBlanc | -0.35 | 0.00 | 0.35 |  |
| 31 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 32 | Akshan | -0.36 | 0.00 | 0.36 |  |
| 33 | Nidalee | -0.36 | 0.00 | 0.36 |  |
| 34 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 35 | Udyr | -0.37 | 0.11 | 0.48 |  |
| 36 | Janna | -0.37 | 0.00 | 0.37 |  |
| 37 | Tristana | -0.38 | 0.14 | 0.52 |  |
| 38 | Aurora | -0.38 | 0.00 | 0.38 |  |
| 39 | Ryze | -0.38 | 0.00 | 0.38 |  |
| 40 | Fiora | -0.39 | 0.09 | 0.48 |  |
| 41 | Ivern | -0.39 | 0.00 | 0.39 |  |
| 42 | Gnar | -0.40 | 0.00 | 0.40 |  |
| 43 | Karma | -0.41 | 0.00 | 0.41 |  |
| 44 | Elise | -0.42 | 0.00 | 0.42 |  |
| 45 | Vex | -0.42 | 0.00 | 0.42 |  |
| 46 | Quinn | -0.45 | 0.00 | 0.45 |  |
| 47 | Corki | -0.46 | 0.00 | 0.46 |  |
| 48 | Yuumi | -0.46 | 0.00 | 0.46 |  |
| 49 | Shaco | -0.47 | 0.00 | 0.47 |  |
| 50 | Kog'Maw | -0.48 | 0.00 | 0.48 |  |
| 51 | Zyra | -0.49 | 0.00 | 0.49 |  |
| 52 | Bel'Veth | -0.52 | 0.00 | 0.52 |  |
| 53 | Rammus | -0.53 | 0.36 | 0.89 |  |
| 54 | Thresh | -0.53 | 0.00 | 0.53 |  |
| 55 | Sona | -0.54 | 0.00 | 0.54 |  |
| 56 | Lissandra | -0.55 | 0.00 | 0.55 |  |
| 57 | Vel'Koz | -0.55 | 0.00 | 0.55 |  |
| 58 | Nilah | -0.56 | 0.40 | 0.96 |  |
| 59 | Brand | -0.56 | 0.00 | 0.56 |  |
| 60 | Hwei | -0.56 | 0.00 | 0.56 |  |
| 61 | Neeko | -0.56 | 0.00 | 0.56 |  |
| 62 | Viktor | -0.56 | 0.00 | 0.56 |  |
| 63 | Aphelios | -0.58 | 0.05 | 0.63 |  |
| 64 | Aatrox | -0.58 | 0.00 | 0.58 |  |
| 65 | Jhin | -0.58 | 0.00 | 0.58 |  |
| 66 | Lee Sin | -0.58 | 0.00 | 0.58 |  |
| 67 | Smolder | -0.58 | 0.00 | 0.58 |  |
| 68 | Zeri | -0.58 | 0.00 | 0.58 |  |
| 69 | Shyvana | -0.60 | 0.00 | 0.60 |  |
| 70 | Morgana | -0.61 | 0.08 | 0.69 |  |
| 71 | Veigar | -0.61 | 0.00 | 0.61 |  |
| 72 | Aurelion Sol | -0.62 | 0.00 | 0.62 |  |
| 73 | Azir | -0.62 | 0.00 | 0.62 |  |
| 74 | Ezreal | -0.62 | 0.00 | 0.62 |  |
| 75 | Lux | -0.62 | 0.00 | 0.62 |  |
| 76 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 77 | Tahm Kench | -0.63 | 0.00 | 0.63 |  |
| 78 | Alistar | -0.64 | 0.04 | 0.68 |  |
| 79 | Gwen | -0.64 | 0.00 | 0.64 |  |
| 80 | Jax | -0.66 | 0.47 | 1.13 |  |
| 81 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 82 | Sylas | -0.66 | 0.00 | 0.66 |  |
| 83 | Malphite | -0.67 | 0.24 | 0.91 |  |
| 84 | Lillia | -0.67 | 0.00 | 0.67 |  |
| 85 | Riven | -0.67 | 0.00 | 0.67 |  |
| 86 | Seraphine | -0.67 | 0.00 | 0.67 |  |
| 87 | Cassiopeia | -0.68 | 0.00 | 0.68 |  |
| 88 | Jinx | -0.68 | 0.00 | 0.68 |  |
| 89 | Malzahar | -0.69 | 0.06 | 0.75 |  |
| 90 | Kennen | -0.69 | 0.00 | 0.69 |  |
| 91 | Nami | -0.69 | 0.00 | 0.69 |  |
| 92 | Orianna | -0.69 | 0.00 | 0.69 |  |
| 93 | Senna | -0.69 | 0.00 | 0.69 |  |
| 94 | Ziggs | -0.69 | 0.00 | 0.69 |  |
| 95 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 96 | Rakan | -0.71 | 0.00 | 0.71 |  |
| 97 | Master Yi | -0.72 | 0.07 | 0.79 |  |
| 98 | Annie | -0.72 | 0.00 | 0.72 |  |
| 99 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 100 | Graves | -0.72 | 0.00 | 0.72 |  |
| 101 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 102 | Urgot | -0.73 | 0.00 | 0.73 |  |
| 103 | Ambessa | -0.74 | 0.00 | 0.74 |  |
| 104 | Hecarim | -0.74 | 0.00 | 0.74 |  |
| 105 | Fizz | -0.76 | 0.00 | 0.76 |  |
| 106 | Lucian | -0.76 | 0.00 | 0.76 |  |
| 107 | Jarvan IV | -0.77 | 0.00 | 0.77 |  |
| 108 | Kayn | -0.77 | 0.00 | 0.77 |  |
| 109 | Mordekaiser | -0.79 | 0.09 | 0.88 |  |
| 110 | Pantheon | -0.79 | 0.00 | 0.79 |  |
| 111 | Yone | -0.79 | 0.00 | 0.79 |  |
| 112 | Camille | -0.80 | 0.00 | 0.80 |  |
| 113 | Viego | -0.80 | 0.00 | 0.80 |  |
| 114 | Briar | -0.81 | 0.00 | 0.81 |  |
| 115 | Miss Fortune | -0.81 | 0.00 | 0.81 |  |
| 116 | Xayah | -0.81 | 0.00 | 0.81 |  |
| 117 | Wukong | -0.82 | 0.00 | 0.82 |  |
| 118 | Xerath | -0.82 | 0.00 | 0.82 |  |
| 119 | Warwick | -0.83 | 0.05 | 0.88 |  |
| 120 | Kassadin | -0.83 | 0.00 | 0.83 |  |
| 121 | Rek'Sai | -0.83 | 0.00 | 0.83 |  |
| 122 | K'Sante | -0.84 | 0.00 | 0.84 |  |
| 123 | Leona | -0.85 | 0.00 | 0.85 |  |
| 124 | Rell | -0.85 | 0.00 | 0.85 |  |
| 125 | Swain | -0.85 | 0.00 | 0.85 |  |
| 126 | Vi | -0.85 | 0.00 | 0.85 |  |
| 127 | Ahri | -0.86 | 0.00 | 0.86 |  |
| 128 | Gragas | -0.86 | 0.00 | 0.86 |  |
| 129 | Nautilus | -0.86 | 0.00 | 0.86 |  |
| 130 | Poppy | -0.86 | 0.00 | 0.86 |  |
| 131 | Qiyana | -0.86 | 0.00 | 0.86 |  |
| 132 | Volibear | -0.86 | 0.00 | 0.86 |  |
| 133 | Olaf | -0.87 | 0.05 | 0.92 |  |
| 134 | Illaoi | -0.87 | 0.00 | 0.87 |  |
| 135 | Karthus | -0.87 | 0.00 | 0.87 |  |
| 136 | Ornn | -0.88 | 0.00 | 0.88 |  |
| 137 | Singed | -0.88 | 0.00 | 0.88 |  |
| 138 | Amumu | -0.89 | 0.00 | 0.89 |  |
| 139 | Talon | -0.89 | 0.00 | 0.89 |  |
| 140 | Taric | -0.89 | 0.00 | 0.89 |  |
| 141 | Xin Zhao | -0.89 | 0.00 | 0.89 |  |
| 142 | Galio | -0.90 | 0.00 | 0.90 |  |
| 143 | Irelia | -0.90 | 0.00 | 0.90 |  |
| 144 | Nocturne | -0.90 | 0.00 | 0.90 |  |
| 145 | Fiddlesticks | -0.92 | 0.00 | 0.92 |  |
| 146 | Maokai | -0.92 | 0.00 | 0.92 |  |
| 147 | Zac | -0.92 | 0.00 | 0.92 |  |
| 148 | Sejuani | -0.93 | 0.00 | 0.93 |  |
| 149 | Locke | -0.94 | 0.00 | 0.94 |  |
| 150 | Draven | -0.95 | 0.00 | 0.95 |  |
| 151 | Sett | -0.95 | 0.00 | 0.95 |  |
| 152 | Diana | -0.96 | 0.00 | 0.96 |  |
| 153 | Syndra | -0.97 | 0.00 | 0.97 |  |
| 154 | Vladimir | -0.97 | 0.00 | 0.97 |  |
| 155 | Garen | -0.98 | 0.12 | 1.10 |  |
| 156 | Renekton | -0.99 | 0.00 | 0.99 |  |
| 157 | Ekko | -1.00 | 0.00 | 1.00 |  |
| 158 | Rumble | -1.00 | 0.00 | 1.00 |  |
| 159 | Rengar | -1.01 | 0.08 | 1.09 |  |
| 160 | Akali | -1.01 | 0.00 | 1.01 |  |
| 161 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 162 | Gangplank | -1.03 | 0.07 | 1.10 |  |
| 163 | Nunu & Willump | -1.04 | 0.13 | 1.17 |  |
| 164 | Sion | -1.09 | 0.05 | 1.14 |  |
| 165 | Skarner | -1.12 | 0.06 | 1.18 |  |
| 166 | Zed | -1.14 | 0.00 | 1.14 |  |
| 167 | Zaahen | -1.21 | 0.05 | 1.26 |  |
| 168 | Darius | -1.27 | 0.00 | 1.27 |  |
| 169 | Trundle | -1.27 | 0.00 | 1.27 |  |
| 170 | Cho'Gath | -1.30 | 0.00 | 1.30 |  |
| 171 | Evelynn | -1.40 | 0.00 | 1.40 |  |
| 172 | Pyke | -1.49 | 0.00 | 1.49 |  |
