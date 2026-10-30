# Counters to Xin Zhao (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Xin Zhao: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Xin Zhao wins every time) to +1 (the champion does). Run `npm run duel -- <champion> XinZhao --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.89 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +1.00 |
| 2 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.00 |
| 3 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.07 | – | +1.00 |
| 4 | Gangplank | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 5 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 6 | Aphelios | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 7 | Morgana | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 8 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | – | +1.00 |
| 9 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 10 | Nocturne | +0.82 | +1.00 | +0.96 | +1.00 | −0.01 | – | +1.00 |
| 11 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 12 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 13 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 14 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 15 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 16 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 17 | Sivir | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 18 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 19 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 20 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 21 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 22 | Neeko | +0.79 | +1.00 | +0.97 | +0.82 | +0.20 | +0.99 | +0.00 |
| 23 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 24 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 25 | Karma | +0.78 | +0.99 | +0.99 | +1.00 | −0.12 | +1.00 | +0.00 |
| 26 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 27 | Singed | +0.77 | +1.00 | +1.00 | +0.93 | +0.04 | – | +0.00 |
| 28 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 29 | Ashe | +0.75 | +0.74 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 30 | Xayah | +0.71 | +1.00 | +1.00 | +0.56 | −0.01 | +1.00 | +0.00 |
| 31 | Zaahen | +0.69 | +1.00 | +0.71 | +1.00 | −0.07 | – | +0.00 |
| 32 | Lulu | +0.63 | +1.00 | +0.95 | +1.00 | +0.11 | −0.70 | +0.00 |
| 33 | Quinn | +0.62 | +1.00 | +0.71 | +0.85 | +0.01 | +0.22 | +0.00 |
| 34 | Ambessa | +0.55 | +1.00 | +1.00 | −0.28 | +0.35 | – | +0.00 |
| 35 | Taric | +0.54 | +0.85 | +0.23 | +1.00 | +0.10 | – | +0.00 |
| 36 | Kennen | +0.51 | +0.69 | +0.28 | +0.96 | +0.04 | +0.76 | +0.00 |
| 37 | Kled | +0.47 | +0.80 | +0.19 | +1.00 | −0.14 | – | +0.00 |
| 38 | Varus | +0.45 | +1.00 | +0.02 | +0.44 | +0.04 | +1.00 | +0.00 |
| 39 | Twisted Fate | +0.43 | +0.50 | +0.87 | −0.09 | +0.06 | +1.00 | +0.00 |
| 40 | Warwick | +0.36 | +1.00 | +1.00 | −1.00 | +0.15 | – | +0.00 |
| 41 | Aurora | +0.31 | −0.14 | +0.20 | +1.00 | −0.04 | +1.00 | +0.00 |
| 42 | Graves | +0.28 | +1.00 | +1.00 | −0.56 | +0.25 | −0.93 | −1.00 |
| 43 | Rakan | +0.28 | +1.00 | −1.00 | +0.92 | −0.03 | +1.00 | +0.00 |
| 44 | Zeri | +0.16 | +0.66 | +0.61 | −1.00 | −0.17 | +0.66 | +0.00 |
| 45 | Lucian | +0.14 | +0.51 | +0.52 | −1.00 | +0.01 | +0.84 | +0.00 |
| 46 | Pantheon | +0.13 | +0.58 | −1.00 | +1.00 | +0.15 | – | +0.00 |
| 47 | Draven | +0.12 | +0.49 | +0.36 | −1.00 | +0.02 | +1.00 | +0.00 |
| 48 | Cassiopeia | +0.10 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 49 | Mordekaiser | +0.07 | +0.13 | −0.08 | +0.30 | −0.06 | – | +0.00 |
| 50 | Jinx | +0.01 | +0.12 | +0.03 | +0.34 | +0.04 | −1.00 | +0.00 |
| 51 | Jayce | −0.00 | +1.00 | −1.00 | −0.11 | +0.15 | – | +0.00 |
| 52 | Camille | −0.01 | +0.00 | −0.07 | +0.00 | +0.04 | – | +0.00 |
| 53 | Vel'Koz | −0.02 | +0.13 | +0.90 | −1.00 | +0.18 | −1.00 | +0.00 |
| 54 | Anivia | −0.02 | −0.12 | +0.09 | −0.04 | −0.12 | +0.11 | +0.00 |
| 55 | Syndra | −0.03 | +0.40 | +0.71 | −1.00 | −0.04 | −1.00 | +0.00 |
| 56 | Brand | −0.09 | −0.24 | −0.19 | +0.11 | +0.01 | −0.04 | +0.00 |
| 57 | Lux | −0.19 | +0.95 | −0.93 | −0.54 | +0.11 | −1.00 | +0.00 |
| 58 | Janna | −0.19 | +0.42 | −1.00 | −0.39 | +0.12 | +0.16 | +0.00 |
| 59 | Corki | −0.19 | −1.00 | −0.21 | +1.00 | +0.10 | −1.00 | +0.00 |
| 60 | Yone | −0.20 | −1.00 | +1.00 | −1.00 | −0.01 | – | +0.49 |
| 61 | Volibear | −0.21 | +0.97 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 62 | Sion | −0.22 | −0.51 | −0.28 | +0.00 | +0.02 | – | +0.00 |
| 63 | Samira | −0.26 | −0.52 | −0.52 | +0.42 | +0.08 | −1.00 | +0.00 |
| 64 | Lee Sin | −0.28 | −1.00 | +0.76 | −1.00 | +0.03 | – | +0.00 |
| 65 | Hwei | −0.30 | −0.56 | −0.80 | −0.06 | −0.09 | +0.70 | +0.00 |
| 66 | Heimerdinger | −0.31 | −0.74 | −1.00 | +1.00 | +0.17 | −1.00 | +0.00 |
| 67 | Cho'Gath | −0.33 | −1.00 | −1.00 | +1.00 | −0.00 | – | +0.00 |
| 68 | Orianna | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | −0.32 | +0.00 |
| 69 | Akshan | −0.46 | −0.60 | −0.20 | −1.00 | −0.04 | −0.54 | +0.00 |
| 70 | Tahm Kench | −0.46 | −0.44 | −0.47 | −1.00 | +0.07 | – | +0.00 |
| 71 | Braum | −0.46 | −0.70 | −0.96 | +0.00 | −0.03 | – | +0.00 |
| 72 | Swain | −0.52 | −0.41 | −0.68 | −1.00 | −0.04 | −0.41 | +0.00 |
| 73 | Miss Fortune | −0.59 | −0.13 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 74 | Senna | −0.61 | −0.89 | −1.00 | −1.00 | +0.11 | +0.44 | +0.00 |
| 75 | Tristana | −0.64 | −1.00 | −1.00 | −1.00 | −0.03 | +0.60 | +0.00 |
| 76 | Annie | −0.68 | −1.00 | −1.00 | −0.87 | +0.18 | −0.29 | +0.00 |
| 77 | Lissandra | −0.68 | −1.00 | −1.00 | −1.00 | +0.03 | +0.17 | +0.00 |
| 78 | Ahri | −0.68 | −1.00 | −1.00 | −1.00 | +0.13 | −0.00 | +0.00 |
| 79 | Gnar | −0.70 | −1.00 | −1.00 | −1.00 | −0.05 | +0.04 | +0.00 |
| 80 | Riven | −0.72 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.50 |
| 81 | LeBlanc | −0.73 | −1.00 | −1.00 | −0.68 | +0.02 | −1.00 | +0.00 |
| 82 | Ornn | −0.74 | −1.00 | −1.00 | −1.00 | +0.24 | – | +0.00 |
| 83 | Zyra | −0.74 | −0.89 | −1.00 | −1.00 | +0.04 | −0.71 | +0.00 |
| 84 | Udyr | −0.74 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.27 |
| 85 | Garen | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 86 | Malzahar | −0.75 | −1.00 | −0.76 | −1.00 | −0.06 | −1.00 | +0.00 |
| 87 | Skarner | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 88 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 89 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 90 | Master Yi | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 91 | Ezreal | −0.76 | −0.96 | −0.97 | −0.97 | +0.06 | −0.90 | +0.00 |
| 92 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 93 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 94 | Maokai | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 95 | Zed | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 96 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 97 | Nautilus | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.00 |
| 98 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 99 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 100 | Leona | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 101 | Vex | −0.77 | −0.82 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 102 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 103 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 104 | Gwen | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 105 | Rengar | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 106 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 107 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 108 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 109 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 110 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 111 | Vi | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 112 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 113 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 114 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 115 | Smolder | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | −0.79 | +0.00 |
| 116 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 117 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 118 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 119 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 120 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 121 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 122 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 123 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 124 | Jhin | −0.79 | −0.94 | −0.97 | −1.00 | −0.08 | −1.00 | +0.00 |
| 125 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 126 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 127 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 128 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 129 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 130 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 131 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 132 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 133 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 134 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 135 | Nami | −0.81 | −1.00 | −0.98 | −1.00 | −0.07 | −1.00 | +0.00 |
| 136 | Kai'Sa | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 137 | Wukong | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 138 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 139 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 140 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 141 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 142 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 143 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 144 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Xin Zhao's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xin Zhao's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> XinZhao` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.57)

- **0.80** spell shield: Spell Shield's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao R Crescent Guard)
- **0.61** spell shield: Spell Shield's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao E Audacious Charge)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Sivir basic attacks → Xin Zhao basic attacks)

#### 2. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 2.5 s, long enough to use ahead of Crescent Guard. (Bard R Tempered Fate → Xin Zhao R Crescent Guard)
- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 2.5 s, long enough to use ahead of Audacious Charge. (Bard R Tempered Fate → Xin Zhao E Audacious Charge)
- **0.31** range: Bard's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Bard basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Bard's Cosmic Binding (its crowd control still applies).

#### 3. Fiora (net +1.17)

- **0.90** parry: Riposte parries Xin Zhao's Crescent Guard and stuns back. Parry for 0.75 s; Crescent Guard takes 0.35 s to land, enough to react. Negating Crescent Guard's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao R Crescent Guard)
- **0.65** parry: Riposte parries Xin Zhao's Audacious Charge. Parry for 0.75 s; Audacious Charge takes 0.26 s to land, enough to react. (Fiora W Riposte → Xin Zhao E Audacious Charge)
- **0.35** parry: Riposte parries Xin Zhao's Three Talon Strike and stuns back. Parry for 0.75 s; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Three Talon Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Fiora's Riposte (its crowd control still applies).

#### 4. Udyr (net +1.06)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for 1.5 s, long enough to use ahead of Crescent Guard. (Udyr E Blazing Stampede → Xin Zhao R Crescent Guard)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Three Talon Strike (airborne). Immune for 1.5 s, long enough to use ahead of Three Talon Strike. (Udyr E Blazing Stampede → Xin Zhao Q Three Talon Strike)
- **0.20** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Audacious Charge (slow). Immune for 1.5 s, long enough to use ahead of Audacious Charge. (Udyr E Blazing Stampede → Xin Zhao E Audacious Charge)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Udyr's Wingborne Storm (its crowd control still applies).

#### 5. Aurora (net +0.97)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 0.4 s; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao R Crescent Guard)
- **0.37** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 0.4 s; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao E Audacious Charge)
- **0.27** range: Aurora's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Aurora basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Aurora's Between Worlds (its crowd control still applies).

#### 6. Kled (net +0.96)

- **0.76** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for ?; Crescent Guard takes 0.35 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao R Crescent Guard)
- **0.18** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Three Talon Strike (airborne). Immune for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kled R Chaaaaaaaarge!!! → Xin Zhao Q Three Talon Strike)
- **0.09** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Audacious Charge (slow). Immune for ?; Audacious Charge takes 0.26 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao E Audacious Charge)

#### 7. Gwen (net +0.93)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for ?; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao R Crescent Guard)
- **0.61** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for ?; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao E Audacious Charge)
- **0.24** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Three Talon Strike. Untargetable for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Gwen's Needlework (its crowd control still applies).

#### 8. Teemo (net +0.90)

- **0.58** blind: Blinding Dart's blind makes Xin Zhao's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Xin Zhao basic attacks)
- **0.46** blind: Blinding Dart's blind makes Xin Zhao's Three Talon Strike, an empowered attack, miss. Blind for 3 s. Spell shield will only block the knock up. (Teemo Q Blinding Dart → Xin Zhao Q Three Talon Strike)
- **0.29** range: Teemo's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Teemo basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Teemo's Noxious Trap (its crowd control still applies).

#### 9. Nocturne (net +0.89)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao R Crescent Guard)
- **0.76** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao E Audacious Charge)
- **0.23** spell shield: Shroud of Darkness's spell shield blocks part of Xin Zhao's Three Talon Strike. Spell shield for 1.5 s, long enough to use ahead of Three Talon Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the knock up. (Nocturne W Shroud of Darkness → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Nocturne's Paranoia (its crowd control still applies).

#### 10. Lissandra (net +0.88)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 2.5 s, long enough to use ahead of Crescent Guard. (Lissandra R Frozen Tomb → Xin Zhao R Crescent Guard)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 2.5 s, long enough to use ahead of Audacious Charge. (Lissandra R Frozen Tomb → Xin Zhao E Audacious Charge)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Three Talon Strike. Untargetable for 2.5 s, long enough to use ahead of Three Talon Strike. (Lissandra R Frozen Tomb → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Lissandra's Frozen Tomb (its crowd control still applies).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.57 | 1.57 | 0.00 |  |
| 2 | Bard | +1.28 | 1.38 | 0.10 |  |
| 3 | Fiora | +1.17 | 1.33 | 0.16 |  |
| 4 | Udyr | +1.06 | 1.18 | 0.12 |  |
| 5 | Aurora | +0.97 | 1.32 | 0.35 |  |
| 6 | Kled | +0.96 | 0.96 | 0.00 |  |
| 7 | Gwen | +0.93 | 1.17 | 0.24 |  |
| 8 | Teemo | +0.90 | 1.10 | 0.20 | blind (Blinding Dart), blind (Blinding Dart) |
| 9 | Nocturne | +0.89 | 1.42 | 0.53 |  |
| 10 | Lissandra | +0.88 | 1.31 | 0.43 |  |
| 11 | Milio | +0.87 | 1.03 | 0.16 |  |
| 12 | Morgana | +0.86 | 1.22 | 0.36 |  |
| 13 | Kalista | +0.86 | 1.00 | 0.14 |  |
| 14 | Olaf | +0.79 | 0.99 | 0.20 |  |
| 15 | Xayah | +0.77 | 1.40 | 0.63 |  |
| 16 | Maokai | +0.74 | 1.27 | 0.53 |  |
| 17 | Fizz | +0.70 | 1.28 | 0.58 |  |
| 18 | Kayle | +0.69 | 0.89 | 0.20 |  |
| 19 | Yuumi | +0.68 | 1.58 | 0.90 |  |
| 20 | Lulu | +0.65 | 0.75 | 0.10 | disarm (Whimsy) |
| 21 | Master Yi | +0.62 | 1.31 | 0.69 |  |
| 22 | Vladimir | +0.61 | 1.38 | 0.77 |  |
| 23 | Singed | +0.59 | 0.75 | 0.16 |  |
| 24 | Rengar | +0.57 | 0.89 | 0.32 |  |
| 25 | Shaco | +0.56 | 1.04 | 0.48 |  |
| 26 | Rek'Sai | +0.51 | 1.10 | 0.59 |  |
| 27 | Alistar | +0.49 | 0.79 | 0.30 |  |
| 28 | Gangplank | +0.47 | 0.85 | 0.38 |  |
| 29 | Camille | +0.43 | 1.06 | 0.63 |  |
| 30 | Sion | +0.42 | 0.99 | 0.57 |  |
| 31 | Vex | +0.41 | 0.76 | 0.35 |  |
| 32 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 33 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 34 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 35 | Kindred | +0.31 | 0.41 | 0.10 |  |
| 36 | Viktor | +0.30 | 0.64 | 0.34 |  |
| 37 | Nasus | +0.22 | 0.45 | 0.23 | attack speed slow (Wither) |
| 38 | Jinx | +0.20 | 0.65 | 0.45 | dash stop (Flame Chompers!) |
| 39 | Hwei | +0.20 | 0.61 | 0.41 | dash stop (Grim Visage) |
| 40 | Renata Glasc | +0.19 | 0.36 | 0.17 |  |
| 41 | Veigar | +0.15 | 0.57 | 0.42 |  |
| 42 | Zilean | +0.14 | 0.30 | 0.16 |  |
| 43 | Zed | +0.13 | 1.03 | 0.90 |  |
| 44 | Zoe | +0.13 | 0.30 | 0.17 |  |
| 45 | Garen | +0.11 | 0.45 | 0.34 |  |
| 46 | Cassiopeia | +0.10 | 0.59 | 0.49 |  |
| 47 | Soraka | +0.08 | 0.25 | 0.17 |  |
| 48 | Varus | +0.07 | 0.51 | 0.44 |  |
| 49 | Ashe | +0.06 | 0.36 | 0.30 |  |
| 50 | Heimerdinger | +0.06 | 0.30 | 0.24 |  |
| 51 | Nilah | +0.05 | 0.60 | 0.55 | attack dodge (Jubilant Veil) |
| 52 | Vayne | +0.02 | 0.40 | 0.38 |  |
| 53 | Zaahen | +0.01 | 0.92 | 0.91 |  |
| 54 | Corki | +0.01 | 0.30 | 0.29 |  |
| 55 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 56 | Evelynn | -0.01 | 1.04 | 1.05 |  |
| 57 | Malzahar | -0.01 | 0.98 | 0.99 |  |
| 58 | Jax | -0.02 | 0.75 | 0.77 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 59 | Gnar | -0.02 | 0.29 | 0.31 |  |
| 60 | Kog'Maw | -0.02 | 0.24 | 0.26 |  |
| 61 | Karma | -0.03 | 0.19 | 0.22 |  |
| 62 | Zeri | -0.04 | 0.41 | 0.45 |  |
| 63 | Jayce | -0.04 | 0.26 | 0.30 |  |
| 64 | Kayn | -0.05 | 1.04 | 1.09 |  |
| 65 | Aphelios | -0.05 | 0.47 | 0.52 |  |
| 66 | Mordekaiser | -0.05 | 0.11 | 0.16 |  |
| 67 | Elise | -0.06 | 0.30 | 0.36 |  |
| 68 | LeBlanc | -0.06 | 0.19 | 0.25 |  |
| 69 | Nidalee | -0.10 | 0.26 | 0.36 |  |
| 70 | Anivia | -0.10 | 0.24 | 0.34 |  |
| 71 | Sona | -0.11 | 0.39 | 0.50 |  |
| 72 | Smolder | -0.14 | 0.30 | 0.44 |  |
| 73 | Samira | -0.14 | 0.26 | 0.40 |  |
| 74 | Tristana | -0.15 | 0.36 | 0.51 |  |
| 75 | Shyvana | -0.15 | 0.18 | 0.33 |  |
| 76 | Malphite | -0.16 | 0.47 | 0.63 |  |
| 77 | Lux | -0.16 | 0.27 | 0.43 |  |
| 78 | Brand | -0.17 | 0.21 | 0.38 |  |
| 79 | Taric | -0.17 | 0.00 | 0.17 |  |
| 80 | Yone | -0.18 | 0.37 | 0.55 |  |
| 81 | Ahri | -0.19 | 0.59 | 0.78 |  |
| 82 | Dr. Mundo | -0.20 | 0.00 | 0.20 |  |
| 83 | Thresh | -0.21 | 0.16 | 0.37 |  |
| 84 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 85 | Zyra | -0.22 | 0.24 | 0.46 |  |
| 86 | Orianna | -0.22 | 0.23 | 0.45 |  |
| 87 | Seraphine | -0.23 | 0.25 | 0.48 |  |
| 88 | Yorick | -0.23 | 0.00 | 0.23 |  |
| 89 | K'Sante | -0.24 | 0.36 | 0.60 |  |
| 90 | Rumble | -0.24 | 0.00 | 0.24 |  |
| 91 | Poppy | -0.25 | 0.50 | 0.75 | dash stop (Steadfast Presence) |
| 92 | Neeko | -0.25 | 0.21 | 0.46 |  |
| 93 | Ivern | -0.26 | 0.16 | 0.42 |  |
| 94 | Warwick | -0.28 | 1.14 | 1.42 |  |
| 95 | Kennen | -0.28 | 0.27 | 0.55 |  |
| 96 | Bel'Veth | -0.28 | 0.00 | 0.28 |  |
| 97 | Blitzcrank | -0.28 | 0.00 | 0.28 |  |
| 98 | Quinn | -0.29 | 0.34 | 0.63 |  |
| 99 | Ziggs | -0.30 | 0.25 | 0.55 |  |
| 100 | Azir | -0.30 | 0.23 | 0.53 |  |
| 101 | Lee Sin | -0.30 | 0.00 | 0.30 |  |
| 102 | Caitlyn | -0.31 | 0.36 | 0.67 |  |
| 103 | Mel | -0.31 | 0.25 | 0.56 |  |
| 104 | Skarner | -0.31 | 0.13 | 0.44 |  |
| 105 | Shen | -0.32 | 0.72 | 1.04 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 106 | Ezreal | -0.32 | 0.30 | 0.62 |  |
| 107 | Urgot | -0.32 | 0.12 | 0.44 |  |
| 108 | Lillia | -0.32 | 0.08 | 0.40 |  |
| 109 | Graves | -0.33 | 0.20 | 0.53 |  |
| 110 | Amumu | -0.33 | 0.19 | 0.52 |  |
| 111 | Akshan | -0.34 | 0.29 | 0.63 |  |
| 112 | Nami | -0.34 | 0.21 | 0.55 |  |
| 113 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 114 | Senna | -0.36 | 0.32 | 0.68 |  |
| 115 | Jarvan IV | -0.37 | 0.18 | 0.55 |  |
| 116 | Katarina | -0.38 | 0.24 | 0.62 |  |
| 117 | Twisted Fate | -0.39 | 0.38 | 0.77 |  |
| 118 | Sett | -0.40 | 0.18 | 0.58 |  |
| 119 | Braum | -0.40 | 0.00 | 0.40 |  |
| 120 | Draven | -0.41 | 0.34 | 0.75 |  |
| 121 | Hecarim | -0.41 | 0.19 | 0.60 |  |
| 122 | Rakan | -0.41 | 0.09 | 0.50 |  |
| 123 | Riven | -0.41 | 0.00 | 0.41 |  |
| 124 | Volibear | -0.43 | 0.18 | 0.61 |  |
| 125 | Rammus | -0.44 | 0.44 | 0.88 | attack reflect (Defensive Ball Curl) |
| 126 | Aurelion Sol | -0.44 | 0.21 | 0.65 |  |
| 127 | Nautilus | -0.44 | 0.00 | 0.44 |  |
| 128 | Vel'Koz | -0.45 | 0.23 | 0.68 |  |
| 129 | Ornn | -0.45 | 0.18 | 0.63 |  |
| 130 | Leona | -0.45 | 0.00 | 0.45 |  |
| 131 | Illaoi | -0.46 | 0.18 | 0.64 |  |
| 132 | Sylas | -0.47 | 0.00 | 0.47 |  |
| 133 | Swain | -0.48 | 0.18 | 0.66 |  |
| 134 | Jhin | -0.50 | 0.25 | 0.75 |  |
| 135 | Annie | -0.50 | 0.22 | 0.72 |  |
| 136 | Ambessa | -0.50 | 0.00 | 0.50 |  |
| 137 | Syndra | -0.52 | 0.21 | 0.73 |  |
| 138 | Irelia | -0.52 | 0.00 | 0.52 |  |
| 139 | Darius | -0.53 | 0.00 | 0.53 |  |
| 140 | Cho'Gath | -0.54 | 0.00 | 0.54 |  |
| 141 | Kassadin | -0.54 | 0.00 | 0.54 |  |
| 142 | Sejuani | -0.54 | 0.00 | 0.54 |  |
| 143 | Trundle | -0.54 | 0.00 | 0.54 |  |
| 144 | Rell | -0.55 | 0.00 | 0.55 |  |
| 145 | Yasuo | -0.55 | 0.00 | 0.55 |  |
| 146 | Diana | -0.56 | 0.00 | 0.56 |  |
| 147 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 148 | Janna | -0.57 | 0.34 | 0.91 |  |
| 149 | Briar | -0.60 | 0.00 | 0.60 |  |
| 150 | Talon | -0.60 | 0.00 | 0.60 |  |
| 151 | Wukong | -0.61 | 0.00 | 0.61 |  |
| 152 | Pantheon | -0.62 | 0.61 | 1.23 |  |
| 153 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 154 | Ryze | -0.64 | 0.22 | 0.86 |  |
| 155 | Locke | -0.64 | 0.00 | 0.64 |  |
| 156 | Viego | -0.65 | 0.18 | 0.83 |  |
| 157 | Zac | -0.67 | 0.40 | 1.07 | dash stop (Stretching Strikes) |
| 158 | Lucian | -0.67 | 0.31 | 0.98 |  |
| 159 | Akali | -0.68 | 0.00 | 0.68 |  |
| 160 | Nunu & Willump | -0.70 | 0.27 | 0.97 |  |
| 161 | Miss Fortune | -0.73 | 0.30 | 1.03 |  |
| 162 | Gragas | -0.74 | 0.00 | 0.74 |  |
| 163 | Karthus | -0.81 | 0.16 | 0.97 |  |
| 164 | Taliyah | -0.82 | 0.23 | 1.05 |  |
| 165 | Ekko | -0.83 | 0.00 | 0.83 |  |
| 166 | Xerath | -0.84 | 0.23 | 1.07 |  |
| 167 | Tahm Kench | -0.88 | 0.00 | 0.88 |  |
| 168 | Vi | -0.98 | 0.18 | 1.16 |  |
| 169 | Naafiri | -1.05 | 0.00 | 1.05 |  |
| 170 | Fiddlesticks | -1.14 | 0.17 | 1.31 |  |
| 171 | Pyke | -1.30 | 0.00 | 1.30 |  |
| 172 | Galio | -1.42 | 0.00 | 1.42 |  |
