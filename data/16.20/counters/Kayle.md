# Counters to Kayle (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Kayle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kayle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kayle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 2 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +1.00 |
| 3 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 4 | Master Yi | +0.80 | +1.00 | +1.00 | +1.00 | −0.35 | +1.00 | +1.00 |
| 5 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 6 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 7 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.53 | +1.00 | +1.00 |
| 8 | Poppy | +0.75 | +1.00 | +1.00 | +1.00 | −0.33 | +1.00 | +0.00 |
| 9 | Warwick | +0.73 | +1.00 | +1.00 | +1.00 | −0.45 | +1.00 | +0.00 |
| 10 | Fiora | +0.72 | +0.99 | +0.99 | +1.00 | −0.20 | +0.03 | +1.00 |
| 11 | Kog'Maw | +0.59 | +1.00 | +1.00 | +0.00 | −0.06 | +1.00 | +0.00 |
| 12 | Anivia | +0.46 | −0.04 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 13 | Yasuo | +0.36 | +0.40 | +0.47 | +0.81 | −0.30 | +0.21 | +0.00 |
| 14 | Renekton | +0.31 | +1.00 | −0.26 | +1.00 | −0.18 | −0.45 | +0.00 |
| 15 | Lee Sin | +0.29 | −1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 16 | Camille | +0.28 | +1.00 | −0.16 | +1.00 | −0.22 | −1.00 | +0.00 |
| 17 | Gangplank | +0.25 | +0.57 | −0.64 | +1.00 | −0.03 | +0.23 | +1.00 |
| 18 | Tahm Kench | +0.14 | +0.59 | +0.58 | −1.00 | −0.11 | +0.58 | +0.00 |
| 19 | Zeri | +0.04 | +0.33 | −1.00 | +1.00 | +0.05 | – | +0.00 |
| 20 | Tryndamere | +0.02 | +0.00 | −1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 21 | Udyr | +0.02 | +1.00 | −1.00 | +1.00 | −0.58 | −1.00 | +0.08 |
| 22 | Kassadin | −0.14 | +1.00 | −0.45 | −1.00 | −0.22 | −0.44 | +0.00 |
| 23 | Graves | −0.20 | −1.00 | −1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 24 | Heimerdinger | −0.35 | −1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 25 | Malphite | −0.41 | −1.00 | −0.93 | +1.00 | −0.20 | −0.97 | +0.00 |
| 26 | Rumble | −0.43 | −1.00 | −1.00 | +1.00 | −0.19 | −1.00 | +0.00 |
| 27 | Nocturne | −0.48 | −1.00 | −1.00 | +1.00 | −0.56 | −1.00 | +0.00 |
| 28 | Mordekaiser | −0.56 | −0.57 | −0.57 | −0.91 | −0.28 | −0.57 | +0.00 |
| 29 | Zaahen | −0.60 | −1.00 | −0.59 | −0.54 | −0.20 | −0.61 | +0.00 |
| 30 | Annie | −0.60 | −1.00 | −1.00 | +0.01 | −0.30 | – | +0.00 |
| 31 | Riven | −0.62 | −1.00 | −1.00 | +0.00 | −0.15 | −1.00 | +0.00 |
| 32 | Gnar | −0.65 | −1.00 | −1.00 | −0.07 | −0.35 | −0.84 | +0.00 |
| 33 | Gwen | −0.68 | −1.00 | −1.00 | −0.06 | −0.44 | −1.00 | +0.00 |
| 34 | Braum | −0.69 | −0.54 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 35 | Jhin | −0.70 | −1.00 | −1.00 | −0.57 | −0.09 | – | +0.00 |
| 36 | Sion | −0.73 | −1.00 | −1.00 | −0.50 | −0.18 | −1.00 | +0.00 |
| 37 | Jinx | −0.74 | −1.00 | −1.00 | −1.00 | +0.06 | −0.50 | +0.00 |
| 38 | Varus | −0.75 | −0.89 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 39 | Vi | −0.75 | −1.00 | −0.72 | −1.00 | −0.16 | −1.00 | +0.00 |
| 40 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 41 | Rengar | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 42 | Tristana | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 43 | Corki | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 44 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 45 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 46 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 47 | Aphelios | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 48 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 49 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 50 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 51 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 52 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 53 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 54 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 55 | Swain | −0.79 | −1.00 | −0.98 | −1.00 | +0.03 | −1.00 | +0.00 |
| 56 | Jarvan IV | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 57 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 58 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 59 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 60 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 61 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 62 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 63 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 64 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 65 | Ashe | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 66 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 67 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 68 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 69 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 70 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 71 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 72 | Neeko | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 73 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 74 | Nami | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 75 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 76 | Taric | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 77 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 78 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 79 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 80 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 81 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 82 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 83 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 84 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 85 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 86 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 87 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 88 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 89 | Sett | −0.81 | −0.94 | −1.00 | −0.92 | −0.29 | −1.00 | +0.00 |
| 90 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 91 | Quinn | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 92 | Ryze | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 93 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 94 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 95 | Irelia | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 96 | Jayce | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 97 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 98 | Cassiopeia | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 99 | Rakan | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 100 | Wukong | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 101 | Vex | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 102 | Vel'Koz | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 103 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 104 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 105 | Lulu | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 106 | Twisted Fate | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 107 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 108 | Garen | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 109 | Morgana | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 110 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 111 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 112 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 113 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 114 | Ahri | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |
| 115 | Karma | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 116 | Kalista | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 117 | Sejuani | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 118 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 119 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 120 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 121 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 122 | Cho'Gath | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 123 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 124 | Akali | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 125 | Gragas | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 126 | Illaoi | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 127 | Darius | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 128 | Teemo | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 129 | Sivir | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 130 | Akshan | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 131 | Vayne | −0.84 | −1.00 | −1.00 | −1.00 | −0.40 | – | +0.00 |
| 132 | Rammus | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |
| 133 | Volibear | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |
| 134 | Kled | −0.86 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | +0.00 |
| 135 | Singed | −0.86 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | +0.00 |
| 136 | Pantheon | −0.86 | −1.00 | −1.00 | −1.00 | −0.42 | −1.00 | +0.00 |
| 137 | Xin Zhao | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 138 | Ambessa | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 139 | Zed | −0.87 | −1.00 | −1.00 | −1.00 | −0.47 | −1.00 | +0.00 |
| 140 | Janna | −0.87 | −1.00 | −1.00 | −1.00 | −0.57 | – | +0.00 |
| 141 | Olaf | −0.87 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | +0.00 |
| 142 | Hecarim | −0.88 | −1.00 | −1.00 | −1.00 | −0.53 | −1.00 | +0.00 |
| 143 | Aatrox | −0.90 | −1.00 | −1.00 | −1.00 | −0.66 | −1.00 | +0.00 |
| 144 | Yone | −0.90 | −1.00 | −1.00 | −1.00 | −0.66 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kayle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.11)

- **0.47** blind: Blinding Dart's blind makes Kayle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kayle basic attacks)
- **0.15** blind: Blinding Dart's blind makes Kayle's Starfire Spellblade, an empowered attack, miss. Blind for 3 s. Parry interactions:
  - Blind: The main target will never receive damage, but the secondary targets will receive the active's spell damage.
  - Block: Blocking will always negate all damage. Keep in mind that if a secondary target is outside of Spirit's Refuge zone, they won't block damage.
  - Dodge: Dodging will always negate all damage. (Teemo Q Blinding Dart → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Teemo's (625 vs 500 attack range).

#### 2. Lulu (net +0.10)

- **0.34** disarm: Whimsy disarms Kayle for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayle basic attacks)
- Watch out: Kayle's basic attacks reach 75 units farther than Lulu's (625 vs 550 attack range).

#### 3. Braum (net +0.06)

- **0.50** projectile block: Unbreakable blocks Kayle's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kayle basic attacks)
- **0.45** projectile block: Unbreakable blocks Kayle's Radiant Blast, a projectile. Unbreakable for 4 s, long enough to use ahead of Radiant Blast. (Braum E Unbreakable → Kayle Q Radiant Blast)
- **0.38** projectile block: Unbreakable blocks Kayle's Starfire Spellblade, a projectile. Unbreakable for 4 s, long enough to use ahead of Starfire Spellblade. (Braum E Unbreakable → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Braum's Glacial Fissure (its crowd control still applies).

#### 4. Sivir (net +0.05)

- **0.27** spell shield: Spell Shield's spell shield blocks Kayle's Starfire Spellblade. Spell shield for 1.5 s, long enough to use ahead of Starfire Spellblade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range).

#### 5. Samira (net 0.00)

- **0.30** projectile block: Blade Whirl blocks Kayle's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kayle basic attacks)
- **0.28** projectile block: Blade Whirl blocks Kayle's Radiant Blast, a projectile. Blade Whirl for 0.75 s; Radiant Blast takes 0.56 s to land, enough to react. (Samira W Blade Whirl → Kayle Q Radiant Blast)
- **0.15** projectile block: Blade Whirl blocks Kayle's Starfire Spellblade, a projectile. Blade Whirl for 0.75 s; Starfire Spellblade lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Samira's Wild Rush.

#### 6. Yunara (net 0.00)

- No interaction in Yunara's favor.

#### 7. Bard (net -0.01)

- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Kayle's Starfire Spellblade. Untargetable for 2.5 s, long enough to use ahead of Starfire Spellblade. (Bard R Tempered Fate → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Bard's (625 vs 500 attack range).

#### 8. Shen (net -0.08)

- **0.36** attack block: Spirit's Refuge blocks Kayle's basic attacks (with Divine Ascent). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kayle basic attacks)
- **0.17** attack block: Spirit's Refuge blocks Kayle's Starfire Spellblade, an empowered attack. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Parry interactions:
  - Blind: The main target will never receive damage, but the secondary targets will receive the active's spell damage.
  - Block: Blocking will always negate all damage. Keep in mind that if a secondary target is outside of Spirit's Refuge zone, they won't block damage.
  - Dodge: Dodging will always negate all damage. : All parry interactions are marked for retesting because of patch V11.1 changes. (Shen W Spirit's Refuge → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Shen's Shadow Dash (its crowd control still applies).

#### 9. Kai'Sa (net -0.09)

- No interaction in Kai'Sa's favor.
- Watch out: Kayle's basic attacks reach 100 units farther than Kai'Sa's (625 vs 525 attack range).

#### 10. Kled (net -0.12)

- **0.05** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Kayle's Radiant Blast (slow). Immune for ?; Radiant Blast takes 0.56 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Kayle Q Radiant Blast)
- Watch out: Kayle's basic attacks reach 375 units farther than Kled's (625 vs 250 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.11 | 0.54 | 0.43 | blind (Blinding Dart) |
| 2 | Lulu | +0.10 | 0.34 | 0.24 |  |
| 3 | Braum | +0.06 | 0.82 | 0.76 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Sivir | +0.05 | 0.27 | 0.22 |  |
| 5 | Samira | 0.00 | 0.48 | 0.48 |  |
| 6 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 7 | Bard | -0.01 | 0.20 | 0.21 |  |
| 8 | Shen | -0.08 | 0.45 | 0.53 |  |
| 9 | Kai'Sa | -0.09 | 0.00 | 0.09 |  |
| 10 | Kled | -0.12 | 0.05 | 0.17 |  |
| 11 | Twitch | -0.14 | 0.00 | 0.14 |  |
| 12 | Kalista | -0.16 | 0.04 | 0.20 |  |
| 13 | Yasuo | -0.18 | 0.62 | 0.80 |  |
| 14 | Yuumi | -0.19 | 0.27 | 0.46 |  |
| 15 | Kindred | -0.21 | 0.00 | 0.21 |  |
| 16 | Twisted Fate | -0.25 | 0.00 | 0.25 |  |
| 17 | Zoe | -0.25 | 0.00 | 0.25 |  |
| 18 | Aurora | -0.26 | 0.12 | 0.38 |  |
| 19 | Taliyah | -0.27 | 0.00 | 0.27 |  |
| 20 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 21 | Milio | -0.29 | 0.06 | 0.35 |  |
| 22 | Mel | -0.30 | 0.47 | 0.77 |  |
| 23 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 24 | Fiora | -0.31 | 0.22 | 0.53 |  |
| 25 | Renata Glasc | -0.32 | 0.00 | 0.32 |  |
| 26 | Soraka | -0.32 | 0.00 | 0.32 |  |
| 27 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 28 | Varus | -0.34 | 0.00 | 0.34 |  |
| 29 | Lissandra | -0.35 | 0.20 | 0.55 |  |
| 30 | Heimerdinger | -0.35 | 0.05 | 0.40 |  |
| 31 | Anivia | -0.35 | 0.00 | 0.35 |  |
| 32 | LeBlanc | -0.35 | 0.00 | 0.35 |  |
| 33 | Akshan | -0.36 | 0.00 | 0.36 |  |
| 34 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 35 | Udyr | -0.37 | 0.11 | 0.48 |  |
| 36 | Corki | -0.37 | 0.00 | 0.37 |  |
| 37 | Janna | -0.37 | 0.00 | 0.37 |  |
| 38 | Tristana | -0.38 | 0.14 | 0.52 |  |
| 39 | Ryze | -0.38 | 0.00 | 0.38 |  |
| 40 | Ivern | -0.39 | 0.00 | 0.39 |  |
| 41 | Gnar | -0.40 | 0.00 | 0.40 |  |
| 42 | Karma | -0.41 | 0.00 | 0.41 |  |
| 43 | Elise | -0.42 | 0.00 | 0.42 |  |
| 44 | Vex | -0.42 | 0.00 | 0.42 |  |
| 45 | Jayce | -0.43 | 0.00 | 0.43 |  |
| 46 | Quinn | -0.45 | 0.00 | 0.45 |  |
| 47 | Vayne | -0.45 | 0.00 | 0.45 |  |
| 48 | Nidalee | -0.46 | 0.00 | 0.46 |  |
| 49 | Gwen | -0.48 | 0.16 | 0.64 |  |
| 50 | Kog'Maw | -0.48 | 0.00 | 0.48 |  |
| 51 | Zyra | -0.49 | 0.00 | 0.49 |  |
| 52 | Pantheon | -0.52 | 0.27 | 0.79 |  |
| 53 | Bel'Veth | -0.52 | 0.00 | 0.52 |  |
| 54 | Rammus | -0.53 | 0.36 | 0.89 |  |
| 55 | Thresh | -0.53 | 0.00 | 0.53 |  |
| 56 | Vel'Koz | -0.55 | 0.00 | 0.55 |  |
| 57 | Nilah | -0.56 | 0.40 | 0.96 |  |
| 58 | Master Yi | -0.56 | 0.23 | 0.79 |  |
| 59 | Brand | -0.56 | 0.00 | 0.56 |  |
| 60 | Neeko | -0.56 | 0.00 | 0.56 |  |
| 61 | Viktor | -0.56 | 0.00 | 0.56 |  |
| 62 | Nocturne | -0.58 | 0.32 | 0.90 |  |
| 63 | Aatrox | -0.58 | 0.00 | 0.58 |  |
| 64 | Jhin | -0.58 | 0.00 | 0.58 |  |
| 65 | Lee Sin | -0.58 | 0.00 | 0.58 |  |
| 66 | Smolder | -0.58 | 0.00 | 0.58 |  |
| 67 | Zeri | -0.58 | 0.00 | 0.58 |  |
| 68 | Nasus | -0.59 | 0.36 | 0.95 |  |
| 69 | Fizz | -0.59 | 0.23 | 0.82 |  |
| 70 | Hwei | -0.60 | 0.00 | 0.60 |  |
| 71 | Xayah | -0.61 | 0.20 | 0.81 |  |
| 72 | Morgana | -0.61 | 0.08 | 0.69 |  |
| 73 | Aphelios | -0.61 | 0.05 | 0.66 |  |
| 74 | Veigar | -0.61 | 0.00 | 0.61 |  |
| 75 | Aurelion Sol | -0.62 | 0.00 | 0.62 |  |
| 76 | Azir | -0.62 | 0.00 | 0.62 |  |
| 77 | Lux | -0.62 | 0.00 | 0.62 |  |
| 78 | Shaco | -0.63 | 0.12 | 0.75 |  |
| 79 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 80 | Tahm Kench | -0.63 | 0.00 | 0.63 |  |
| 81 | Alistar | -0.64 | 0.04 | 0.68 |  |
| 82 | Kayn | -0.65 | 0.12 | 0.77 |  |
| 83 | Sona | -0.65 | 0.00 | 0.65 |  |
| 84 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 85 | Sylas | -0.66 | 0.00 | 0.66 |  |
| 86 | Lillia | -0.67 | 0.00 | 0.67 |  |
| 87 | Riven | -0.67 | 0.00 | 0.67 |  |
| 88 | Seraphine | -0.67 | 0.00 | 0.67 |  |
| 89 | Rek'Sai | -0.68 | 0.20 | 0.88 |  |
| 90 | Cassiopeia | -0.68 | 0.00 | 0.68 |  |
| 91 | Jinx | -0.68 | 0.00 | 0.68 |  |
| 92 | Vladimir | -0.69 | 0.28 | 0.97 |  |
| 93 | Xin Zhao | -0.69 | 0.20 | 0.89 |  |
| 94 | Malzahar | -0.69 | 0.06 | 0.75 |  |
| 95 | Kennen | -0.69 | 0.00 | 0.69 |  |
| 96 | Nami | -0.69 | 0.00 | 0.69 |  |
| 97 | Orianna | -0.69 | 0.00 | 0.69 |  |
| 98 | Senna | -0.69 | 0.00 | 0.69 |  |
| 99 | Ziggs | -0.69 | 0.00 | 0.69 |  |
| 100 | Jax | -0.70 | 0.47 | 1.17 |  |
| 101 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 102 | Maokai | -0.71 | 0.21 | 0.92 |  |
| 103 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 104 | Rakan | -0.71 | 0.00 | 0.71 |  |
| 105 | Annie | -0.72 | 0.00 | 0.72 |  |
| 106 | Graves | -0.72 | 0.00 | 0.72 |  |
| 107 | Camille | -0.73 | 0.12 | 0.85 |  |
| 108 | Ezreal | -0.73 | 0.00 | 0.73 |  |
| 109 | Urgot | -0.73 | 0.00 | 0.73 |  |
| 110 | Ambessa | -0.74 | 0.00 | 0.74 |  |
| 111 | Malphite | -0.75 | 0.24 | 0.99 |  |
| 112 | Lucian | -0.76 | 0.00 | 0.76 |  |
| 113 | Jarvan IV | -0.77 | 0.00 | 0.77 |  |
| 114 | Mordekaiser | -0.79 | 0.09 | 0.88 |  |
| 115 | Yone | -0.79 | 0.00 | 0.79 |  |
| 116 | Viego | -0.80 | 0.00 | 0.80 |  |
| 117 | Miss Fortune | -0.81 | 0.00 | 0.81 |  |
| 118 | Xerath | -0.82 | 0.00 | 0.82 |  |
| 119 | Warwick | -0.83 | 0.05 | 0.88 |  |
| 120 | K'Sante | -0.84 | 0.00 | 0.84 |  |
| 121 | Briar | -0.85 | 0.00 | 0.85 |  |
| 122 | Hecarim | -0.85 | 0.00 | 0.85 |  |
| 123 | Leona | -0.85 | 0.00 | 0.85 |  |
| 124 | Rell | -0.85 | 0.00 | 0.85 |  |
| 125 | Swain | -0.85 | 0.00 | 0.85 |  |
| 126 | Ahri | -0.86 | 0.00 | 0.86 |  |
| 127 | Nautilus | -0.86 | 0.00 | 0.86 |  |
| 128 | Poppy | -0.86 | 0.00 | 0.86 |  |
| 129 | Qiyana | -0.86 | 0.00 | 0.86 |  |
| 130 | Volibear | -0.86 | 0.00 | 0.86 |  |
| 131 | Olaf | -0.87 | 0.05 | 0.92 |  |
| 132 | Karthus | -0.87 | 0.00 | 0.87 |  |
| 133 | Wukong | -0.87 | 0.00 | 0.87 |  |
| 134 | Ornn | -0.88 | 0.00 | 0.88 |  |
| 135 | Singed | -0.88 | 0.00 | 0.88 |  |
| 136 | Amumu | -0.89 | 0.00 | 0.89 |  |
| 137 | Talon | -0.89 | 0.00 | 0.89 |  |
| 138 | Taric | -0.89 | 0.00 | 0.89 |  |
| 139 | Galio | -0.90 | 0.00 | 0.90 |  |
| 140 | Irelia | -0.90 | 0.00 | 0.90 |  |
| 141 | Vi | -0.90 | 0.00 | 0.90 |  |
| 142 | Gragas | -0.91 | 0.00 | 0.91 |  |
| 143 | Kassadin | -0.91 | 0.00 | 0.91 |  |
| 144 | Dr. Mundo | -0.92 | 0.00 | 0.92 |  |
| 145 | Fiddlesticks | -0.92 | 0.00 | 0.92 |  |
| 146 | Zac | -0.92 | 0.00 | 0.92 |  |
| 147 | Sejuani | -0.93 | 0.00 | 0.93 |  |
| 148 | Diana | -0.96 | 0.00 | 0.96 |  |
| 149 | Yorick | -0.96 | 0.00 | 0.96 |  |
| 150 | Syndra | -0.97 | 0.00 | 0.97 |  |
| 151 | Garen | -0.98 | 0.12 | 1.10 |  |
| 152 | Draven | -0.98 | 0.00 | 0.98 |  |
| 153 | Renekton | -0.99 | 0.00 | 0.99 |  |
| 154 | Rumble | -1.00 | 0.00 | 1.00 |  |
| 155 | Sett | -1.00 | 0.00 | 1.00 |  |
| 156 | Rengar | -1.01 | 0.08 | 1.09 |  |
| 157 | Akali | -1.01 | 0.00 | 1.01 |  |
| 158 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 159 | Zed | -1.02 | 0.12 | 1.14 |  |
| 160 | Gangplank | -1.03 | 0.07 | 1.10 |  |
| 161 | Nunu & Willump | -1.04 | 0.13 | 1.17 |  |
| 162 | Locke | -1.06 | 0.00 | 1.06 |  |
| 163 | Illaoi | -1.07 | 0.00 | 1.07 |  |
| 164 | Sion | -1.09 | 0.05 | 1.14 |  |
| 165 | Skarner | -1.12 | 0.06 | 1.18 |  |
| 166 | Ekko | -1.15 | 0.00 | 1.15 |  |
| 167 | Zaahen | -1.21 | 0.05 | 1.26 |  |
| 168 | Evelynn | -1.28 | 0.12 | 1.40 |  |
| 169 | Cho'Gath | -1.31 | 0.00 | 1.31 |  |
| 170 | Darius | -1.32 | 0.00 | 1.32 |  |
| 171 | Trundle | -1.33 | 0.00 | 1.33 |  |
| 172 | Pyke | -1.49 | 0.00 | 1.49 |  |
