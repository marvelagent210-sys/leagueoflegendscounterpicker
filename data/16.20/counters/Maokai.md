# Counters to Maokai (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Maokai: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Maokai wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Maokai --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +1.00 |
| 2 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 3 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +1.00 |
| 4 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 5 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 6 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 7 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 8 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 9 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 10 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 11 | Sivir | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 12 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 13 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 14 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 15 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 16 | Rakan | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 17 | Ambessa | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 18 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 19 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 20 | Mordekaiser | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 21 | Yasuo | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 22 | Xin Zhao | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 23 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 24 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 25 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 26 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 27 | Aatrox | +0.73 | +1.00 | +1.00 | +1.00 | −0.31 | – | +0.00 |
| 28 | Hwei | +0.72 | +1.00 | +1.00 | +1.00 | +0.16 | −0.05 | +0.00 |
| 29 | Kled | +0.55 | +1.00 | +1.00 | +0.00 | −0.03 | – | +0.00 |
| 30 | Cho'Gath | +0.53 | +1.00 | +0.55 | +0.55 | −0.10 | – | +0.00 |
| 31 | Gnar | +0.38 | +0.27 | +0.87 | −0.03 | −0.02 | +1.00 | +0.00 |
| 32 | Smolder | +0.35 | +1.00 | +0.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 33 | Ashe | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 34 | Lee Sin | +0.26 | +1.00 | +0.00 | +0.00 | −0.13 | – | +0.00 |
| 35 | Riven | +0.20 | +0.00 | +0.00 | +1.00 | −0.12 | – | +0.00 |
| 36 | Quinn | +0.20 | −0.50 | +1.00 | +1.00 | −0.17 | −1.00 | +0.00 |
| 37 | Camille | +0.20 | −1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 38 | Morgana | +0.17 | +0.01 | +0.46 | +0.45 | +0.14 | −0.59 | +0.00 |
| 39 | Sion | +0.13 | +0.50 | +0.00 | +0.00 | −0.07 | – | +0.00 |
| 40 | Twisted Fate | +0.11 | −1.00 | +1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 41 | Dr. Mundo | +0.09 | +0.11 | +0.15 | +0.18 | −0.12 | – | +0.00 |
| 42 | Karma | +0.08 | +0.14 | +0.03 | +0.12 | +0.01 | +0.11 | +0.00 |
| 43 | Taric | +0.02 | +0.00 | −0.02 | +0.10 | +0.02 | – | +0.00 |
| 44 | Jayce | +0.00 | +0.00 | +0.00 | +0.00 | +0.01 | – | +0.00 |
| 45 | Urgot | −0.01 | +0.50 | −1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 46 | Pantheon | −0.01 | −1.00 | +1.00 | +0.00 | −0.07 | – | +0.00 |
| 47 | Aurora | −0.03 | −0.12 | −0.00 | −0.00 | −0.03 | +0.03 | +0.00 |
| 48 | Shen | −0.04 | −0.06 | −0.07 | +0.02 | −0.06 | – | +0.00 |
| 49 | Tahm Kench | −0.09 | −0.07 | −0.15 | −0.15 | +0.07 | – | +0.00 |
| 50 | Zeri | −0.09 | +1.00 | −1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 51 | Annie | −0.14 | −0.24 | −0.22 | −0.11 | +0.13 | −0.23 | +0.00 |
| 52 | Soraka | −0.14 | −0.27 | −0.13 | −0.17 | +0.04 | −0.17 | +0.00 |
| 53 | Rell | −0.15 | −0.23 | −0.23 | −0.19 | +0.04 | −0.00 | +0.00 |
| 54 | Singed | −0.15 | −0.17 | −0.17 | −0.17 | −0.11 | – | +0.00 |
| 55 | Anivia | −0.16 | −0.43 | −0.16 | +0.08 | −0.17 | +0.01 | +0.00 |
| 56 | Braum | −0.16 | −0.26 | −0.15 | −0.15 | −0.09 | – | +0.00 |
| 57 | Kog'Maw | −0.22 | +0.00 | −0.50 | −0.50 | +0.06 | +0.00 | +0.00 |
| 58 | Garen | −0.24 | −1.00 | +1.00 | −1.00 | −0.12 | – | +0.00 |
| 59 | Gragas | −0.25 | −0.33 | −0.36 | −0.23 | −0.05 | – | +0.00 |
| 60 | Renekton | −0.29 | −0.35 | −0.40 | −0.34 | −0.04 | – | +0.00 |
| 61 | Senna | −0.30 | −0.48 | −0.12 | −0.27 | +0.02 | −1.00 | +0.00 |
| 62 | Tristana | −0.31 | +1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 63 | Nocturne | −0.31 | −1.00 | +0.00 | +0.00 | −0.21 | – | +0.00 |
| 64 | Ornn | −0.32 | −0.38 | −0.41 | −0.43 | −0.01 | – | +0.00 |
| 65 | Neeko | −0.33 | −1.00 | +0.00 | +0.00 | +0.12 | −0.97 | +0.00 |
| 66 | Karthus | −0.35 | −0.48 | −0.41 | −0.37 | −0.01 | −0.47 | +0.00 |
| 67 | Irelia | −0.35 | −1.00 | −1.00 | +0.89 | +0.05 | – | +0.00 |
| 68 | Zyra | −0.41 | −1.00 | −0.20 | −0.21 | +0.01 | −0.67 | +0.00 |
| 69 | Kalista | −0.41 | +0.64 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 70 | Corki | −0.44 | −1.00 | −1.00 | −0.09 | −0.05 | +0.88 | +0.00 |
| 71 | Yone | −0.45 | +0.28 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 72 | Zoe | −0.51 | −1.00 | −0.37 | −0.35 | +0.02 | −1.00 | +0.00 |
| 73 | Lulu | −0.55 | +0.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 74 | Jhin | −0.56 | −0.14 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 75 | Heimerdinger | −0.56 | −1.00 | −0.14 | −1.00 | +0.14 | −1.00 | +0.00 |
| 76 | Wukong | −0.57 | −1.00 | −1.00 | +0.00 | −0.07 | – | +0.00 |
| 77 | Master Yi | −0.58 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | +1.00 |
| 78 | Orianna | −0.59 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 79 | Jinx | −0.60 | −1.00 | −0.29 | −1.00 | +0.04 | −0.88 | +0.00 |
| 80 | Xayah | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 81 | Syndra | −0.63 | −1.00 | −1.00 | −0.23 | +0.10 | −1.00 | +0.00 |
| 82 | Malzahar | −0.67 | −0.50 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 83 | Vel'Koz | −0.68 | −0.62 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 84 | Nami | −0.72 | −0.94 | −0.94 | −0.91 | +0.06 | −0.81 | +0.00 |
| 85 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 86 | Brand | −0.74 | −0.77 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 87 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 88 | Galio | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 89 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 90 | Vi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 91 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 92 | Nautilus | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 93 | Leona | −0.78 | −0.96 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 94 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 95 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 96 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 97 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 98 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 99 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 100 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 101 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 102 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 103 | Malphite | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 104 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 105 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 106 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 107 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 108 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 109 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 110 | Janna | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 111 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 112 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 113 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 114 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 115 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 116 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 117 | Teemo | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 118 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −0.97 | +0.00 |
| 119 | Swain | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 120 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 121 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 122 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 123 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 124 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 125 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 126 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 127 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 128 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 129 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 130 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 131 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 132 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 133 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 134 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 135 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 136 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 137 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 138 | Kennen | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 139 | Graves | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 140 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 141 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 142 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 143 | Lucian | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 144 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Maokai's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Maokai's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Maokai` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.74)

- **0.80** spell shield: Spell Shield's spell shield blocks Maokai's Nature's Grasp. Spell shield for 1.5 s, long enough to use ahead of Nature's Grasp. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Maokai R Nature's Grasp)
- **0.73** spell shield: Spell Shield's spell shield blocks Maokai's Twisted Advance. Spell shield for 1.5 s, long enough to use ahead of Twisted Advance. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Maokai W Twisted Advance)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Maokai's (500 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Sivir basic attacks → Maokai basic attacks)

#### 2. Udyr (net +0.98)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Twisted Advance (root). Immune for 1.5 s, long enough to use ahead of Twisted Advance. (Udyr E Blazing Stampede → Maokai W Twisted Advance)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Nature's Grasp (root). Immune for 1.5 s, long enough to use ahead of Nature's Grasp. (Udyr E Blazing Stampede → Maokai R Nature's Grasp)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Maokai's Bramble Smash (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Bramble Smash. (Udyr E Blazing Stampede → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Udyr's Blazing Stampede.

#### 3. Aurora (net +0.93)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Nature's Grasp. Untargetable for 0.4 s; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai R Nature's Grasp)
- **0.46** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Twisted Advance. Untargetable for 0.4 s; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai W Twisted Advance)
- **0.30** untargetable: Between Worlds makes Aurora untargetable, dodging Maokai's Bramble Smash. Untargetable for 0.4 s; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Aurora's Between Worlds.

#### 4. Yuumi (net +0.92)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Twisted Advance. Untargetable for ?; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai W Twisted Advance)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Nature's Grasp. Untargetable for ?; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai R Nature's Grasp)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Maokai's Bramble Smash. Untargetable for ?; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Yuumi's Final Chapter.

#### 5. Fiora (net +0.92)

- **0.90** parry: Riposte parries Maokai's Nature's Grasp and stuns back. Parry for 0.75 s; Nature's Grasp takes 30.5 s to land, enough to react. Negating Nature's Grasp's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai R Nature's Grasp)
- **0.88** parry: Riposte parries Maokai's Twisted Advance and stuns back. Parry for 0.75 s; Twisted Advance takes 0.4 s to land, enough to react. Negating Twisted Advance's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai W Twisted Advance)
- **0.51** parry: Riposte parries Maokai's Bramble Smash and stuns back. Parry for 0.75 s; Bramble Smash takes 0.68 s to land, enough to react. Negating Bramble Smash's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Fiora's Riposte.

#### 6. Xayah (net +0.90)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Maokai's Nature's Grasp. Untargetable for 1.5 s, long enough to use ahead of Nature's Grasp. (Xayah R Featherstorm → Maokai R Nature's Grasp)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Maokai's Twisted Advance. Untargetable for 1.5 s, long enough to use ahead of Twisted Advance. (Xayah R Featherstorm → Maokai W Twisted Advance)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Xayah basic attacks → Maokai basic attacks)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Xayah's Bladecaller.

#### 7. Vladimir (net +0.88)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Nature's Grasp. Untargetable for 2 s, long enough to use ahead of Nature's Grasp. (Vladimir W Sanguine Pool → Maokai R Nature's Grasp)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Twisted Advance. Untargetable for 2 s, long enough to use ahead of Twisted Advance. (Vladimir W Sanguine Pool → Maokai W Twisted Advance)
- **0.41** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Maokai's Bramble Smash. Untargetable for 2 s, long enough to use ahead of Bramble Smash. (Vladimir W Sanguine Pool → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Vladimir's Hemoplague.

#### 8. Olaf (net +0.76)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Maokai's Nature's Grasp (root). Immune for 3 s, long enough to use ahead of Nature's Grasp. (Olaf R Ragnarok → Maokai R Nature's Grasp)
- **0.48** cc immunity: Ragnarok makes Olaf immune to Maokai's Twisted Advance (root). Immune for 3 s, long enough to use ahead of Twisted Advance. (Olaf R Ragnarok → Maokai W Twisted Advance)
- **0.31** cc immunity: Ragnarok makes Olaf immune to Maokai's Bramble Smash (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Bramble Smash. (Olaf R Ragnarok → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Olaf's Reckless Swing.

#### 9. Gwen (net +0.72)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Nature's Grasp. Untargetable for ?; Nature's Grasp takes 30.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai R Nature's Grasp)
- **0.73** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Twisted Advance. Untargetable for ?; Twisted Advance takes 0.4 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai W Twisted Advance)
- **0.40** untargetable: Hallowed Mist makes Gwen untargetable, dodging Maokai's Bramble Smash. Untargetable for ?; Bramble Smash takes 0.68 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Maokai Q Bramble Smash)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Gwen's Needlework.

#### 10. Kayle (net +0.71)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Maokai's Nature's Grasp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nature's Grasp. (Kayle R Divine Judgment → Maokai R Nature's Grasp)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Maokai's (625 vs 125 attack range). Maokai closes the gap with Twisted Advance. (Kayle basic attacks → Maokai basic attacks)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Maokai's Twisted Advance (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Twisted Advance. (Kayle R Divine Judgment → Maokai W Twisted Advance)
- Watch out: Twisted Advance makes Maokai untargetable, dodging Kayle's Starfire Spellblade.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.74 | 1.74 | 0.00 |  |
| 2 | Udyr | +0.98 | 1.57 | 0.59 |  |
| 3 | Aurora | +0.93 | 1.35 | 0.42 |  |
| 4 | Yuumi | +0.92 | 1.90 | 0.98 |  |
| 5 | Fiora | +0.92 | 1.48 | 0.56 |  |
| 6 | Xayah | +0.90 | 1.44 | 0.54 |  |
| 7 | Vladimir | +0.88 | 1.47 | 0.59 |  |
| 8 | Olaf | +0.76 | 1.13 | 0.37 |  |
| 9 | Gwen | +0.72 | 1.27 | 0.55 |  |
| 10 | Kayle | +0.71 | 0.92 | 0.21 |  |
| 11 | Master Yi | +0.68 | 1.39 | 0.71 |  |
| 12 | Samira | +0.66 | 1.38 | 0.72 | projectile block (Blade Whirl) |
| 13 | Bard | +0.59 | 1.48 | 0.89 |  |
| 14 | Morgana | +0.52 | 1.50 | 0.98 |  |
| 15 | Zed | +0.52 | 1.06 | 0.54 |  |
| 16 | Fizz | +0.51 | 1.54 | 1.03 |  |
| 17 | Milio | +0.50 | 1.20 | 0.70 |  |
| 18 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 19 | Mel | +0.39 | 1.33 | 0.94 | projectile block (Rebuttal) |
| 20 | Kalista | +0.39 | 1.11 | 0.72 |  |
| 21 | Braum | +0.38 | 1.18 | 0.80 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 22 | Gangplank | +0.38 | 1.08 | 0.70 |  |
| 23 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 24 | Nocturne | +0.37 | 1.48 | 1.11 |  |
| 25 | Rengar | +0.36 | 1.23 | 0.87 |  |
| 26 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 27 | Lissandra | +0.35 | 1.34 | 0.99 |  |
| 28 | Sion | +0.32 | 1.14 | 0.82 |  |
| 29 | Yasuo | +0.15 | 1.10 | 0.95 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 30 | Shaco | +0.08 | 1.12 | 1.04 |  |
| 31 | Kindred | +0.07 | 0.47 | 0.40 |  |
| 32 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 33 | Rek'Sai | -0.02 | 1.13 | 1.15 |  |
| 34 | Kog'Maw | -0.03 | 0.27 | 0.30 |  |
| 35 | Teemo | -0.05 | 0.69 | 0.74 |  |
| 36 | Nidalee | -0.08 | 0.30 | 0.38 |  |
| 37 | Zeri | -0.11 | 0.44 | 0.55 |  |
| 38 | Kayn | -0.13 | 1.12 | 1.25 |  |
| 39 | Zilean | -0.13 | 0.32 | 0.45 |  |
| 40 | Kled | -0.14 | 1.15 | 1.29 |  |
| 41 | Malzahar | -0.15 | 1.00 | 1.15 |  |
| 42 | Lulu | -0.15 | 0.61 | 0.76 |  |
| 43 | Garen | -0.16 | 0.57 | 0.73 |  |
| 44 | Singed | -0.18 | 0.67 | 0.85 | grounding (Mega Adhesive) |
| 45 | Zaahen | -0.20 | 1.13 | 1.33 |  |
| 46 | Camille | -0.20 | 1.12 | 1.32 |  |
| 47 | Dr. Mundo | -0.21 | 0.00 | 0.21 |  |
| 48 | Corki | -0.23 | 0.32 | 0.55 |  |
| 49 | Twisted Fate | -0.24 | 0.43 | 0.67 |  |
| 50 | Nasus | -0.28 | 0.27 | 0.55 |  |
| 51 | Alistar | -0.35 | 0.90 | 1.25 |  |
| 52 | Vex | -0.36 | 0.34 | 0.70 |  |
| 53 | Zoe | -0.38 | 0.32 | 0.70 |  |
| 54 | Cassiopeia | -0.39 | 0.70 | 1.09 | grounding (Miasma) |
| 55 | Warwick | -0.40 | 1.20 | 1.60 |  |
| 56 | Smolder | -0.40 | 0.32 | 0.72 |  |
| 57 | LeBlanc | -0.40 | 0.22 | 0.62 |  |
| 58 | Evelynn | -0.41 | 1.12 | 1.53 |  |
| 59 | Taric | -0.42 | 0.00 | 0.42 |  |
| 60 | Ezreal | -0.43 | 0.32 | 0.75 |  |
| 61 | Soraka | -0.43 | 0.27 | 0.70 |  |
| 62 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 63 | Vayne | -0.45 | 0.43 | 0.88 |  |
| 64 | Miss Fortune | -0.45 | 0.32 | 0.77 |  |
| 65 | Graves | -0.46 | 0.24 | 0.70 |  |
| 66 | Jinx | -0.47 | 0.29 | 0.76 |  |
| 67 | Quinn | -0.49 | 0.38 | 0.87 |  |
| 68 | Akshan | -0.49 | 0.34 | 0.83 |  |
| 69 | Sona | -0.51 | 0.41 | 0.92 |  |
| 70 | Varus | -0.52 | 0.39 | 0.91 |  |
| 71 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 72 | Kennen | -0.54 | 0.29 | 0.83 |  |
| 73 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 74 | Tristana | -0.56 | 0.36 | 0.92 |  |
| 75 | Jayce | -0.58 | 0.30 | 0.88 |  |
| 76 | Pantheon | -0.63 | 0.64 | 1.27 |  |
| 77 | Lucian | -0.63 | 0.36 | 0.99 |  |
| 78 | Kha'Zix | -0.63 | 0.00 | 0.63 |  |
| 79 | Karthus | -0.64 | 0.19 | 0.83 |  |
| 80 | Nilah | -0.66 | 0.38 | 1.04 |  |
| 81 | Illaoi | -0.66 | 0.07 | 0.73 |  |
| 82 | Draven | -0.67 | 0.36 | 1.03 |  |
| 83 | Sylas | -0.68 | 0.00 | 0.68 |  |
| 84 | Elise | -0.69 | 0.32 | 1.01 |  |
| 85 | Lux | -0.69 | 0.29 | 0.98 |  |
| 86 | Lillia | -0.69 | 0.11 | 0.80 |  |
| 87 | Brand | -0.70 | 0.22 | 0.92 |  |
| 88 | Katarina | -0.70 | 0.12 | 0.82 |  |
| 89 | Azir | -0.71 | 0.27 | 0.98 |  |
| 90 | Karma | -0.71 | 0.22 | 0.93 |  |
| 91 | Jax | -0.73 | 0.28 | 1.01 |  |
| 92 | Annie | -0.73 | 0.22 | 0.95 |  |
| 93 | Wukong | -0.73 | 0.00 | 0.73 |  |
| 94 | Xin Zhao | -0.74 | 0.53 | 1.27 |  |
| 95 | Aphelios | -0.74 | 0.48 | 1.22 |  |
| 96 | Viktor | -0.74 | 0.32 | 1.06 |  |
| 97 | Orianna | -0.74 | 0.27 | 1.01 |  |
| 98 | Veigar | -0.74 | 0.24 | 0.98 |  |
| 99 | Renekton | -0.74 | 0.00 | 0.74 |  |
| 100 | Heimerdinger | -0.75 | 0.30 | 1.05 |  |
| 101 | Gnar | -0.76 | 0.33 | 1.09 |  |
| 102 | Aatrox | -0.76 | 0.00 | 0.76 |  |
| 103 | Kassadin | -0.76 | 0.00 | 0.76 |  |
| 104 | Renata Glasc | -0.77 | 0.38 | 1.15 |  |
| 105 | Talon | -0.78 | 0.00 | 0.78 |  |
| 106 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 107 | Senna | -0.81 | 0.32 | 1.13 |  |
| 108 | Syndra | -0.82 | 0.22 | 1.04 |  |
| 109 | Skarner | -0.82 | 0.12 | 0.94 |  |
| 110 | Ahri | -0.83 | 0.22 | 1.05 |  |
| 111 | Mordekaiser | -0.84 | 0.06 | 0.90 |  |
| 112 | Bel'Veth | -0.85 | 0.00 | 0.85 |  |
| 113 | Seraphine | -0.86 | 0.29 | 1.15 |  |
| 114 | Ziggs | -0.86 | 0.27 | 1.13 |  |
| 115 | Anivia | -0.86 | 0.24 | 1.10 |  |
| 116 | Vel'Koz | -0.88 | 0.27 | 1.15 |  |
| 117 | Caitlyn | -0.89 | 0.36 | 1.25 |  |
| 118 | Swain | -0.89 | 0.21 | 1.10 |  |
| 119 | Akali | -0.90 | 0.00 | 0.90 |  |
| 120 | Zyra | -0.91 | 0.24 | 1.15 |  |
| 121 | Ryze | -0.92 | 0.24 | 1.16 |  |
| 122 | Ivern | -0.92 | 0.19 | 1.11 |  |
| 123 | Diana | -0.92 | 0.00 | 0.92 |  |
| 124 | Xerath | -0.93 | 0.27 | 1.20 |  |
| 125 | Neeko | -0.93 | 0.22 | 1.15 |  |
| 126 | Cho'Gath | -0.96 | 0.00 | 0.96 |  |
| 127 | Sett | -0.98 | 0.07 | 1.05 |  |
| 128 | Aurelion Sol | -0.99 | 0.22 | 1.21 |  |
| 129 | Nami | -1.00 | 0.22 | 1.22 |  |
| 130 | Irelia | -1.00 | 0.05 | 1.05 |  |
| 131 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 132 | Malphite | -1.01 | 0.25 | 1.26 |  |
| 133 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 134 | Darius | -1.02 | 0.00 | 1.02 |  |
| 135 | Riven | -1.02 | 0.00 | 1.02 |  |
| 136 | Trundle | -1.02 | 0.00 | 1.02 |  |
| 137 | Hwei | -1.03 | 0.23 | 1.26 |  |
| 138 | Shyvana | -1.04 | 0.07 | 1.11 |  |
| 139 | Janna | -1.06 | 0.36 | 1.42 |  |
| 140 | Locke | -1.08 | 0.00 | 1.08 |  |
| 141 | Jhin | -1.10 | 0.27 | 1.37 |  |
| 142 | Thresh | -1.10 | 0.19 | 1.29 |  |
| 143 | Urgot | -1.10 | 0.15 | 1.25 |  |
| 144 | Hecarim | -1.17 | 0.07 | 1.24 |  |
| 145 | Nautilus | -1.20 | 0.00 | 1.20 |  |
| 146 | Volibear | -1.21 | 0.07 | 1.28 |  |
| 147 | Ekko | -1.22 | 0.00 | 1.22 |  |
| 148 | Jarvan IV | -1.24 | 0.07 | 1.31 |  |
| 149 | Yone | -1.25 | 0.07 | 1.32 |  |
| 150 | Leona | -1.25 | 0.00 | 1.25 |  |
| 151 | Rakan | -1.27 | 0.13 | 1.40 |  |
| 152 | Shen | -1.28 | 0.27 | 1.55 |  |
| 153 | Fiddlesticks | -1.30 | 0.20 | 1.50 |  |
| 154 | Qiyana | -1.32 | 0.00 | 1.32 |  |
| 155 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 156 | Amumu | -1.40 | 0.00 | 1.40 |  |
| 157 | Poppy | -1.40 | 0.00 | 1.40 |  |
| 158 | Rammus | -1.41 | 0.27 | 1.68 |  |
| 159 | Nunu & Willump | -1.47 | 0.22 | 1.69 |  |
| 160 | Ornn | -1.47 | 0.07 | 1.54 |  |
| 161 | K'Sante | -1.48 | 0.14 | 1.62 |  |
| 162 | Briar | -1.48 | 0.00 | 1.48 |  |
| 163 | Sejuani | -1.50 | 0.00 | 1.50 |  |
| 164 | Viego | -1.53 | 0.16 | 1.69 |  |
| 165 | Pyke | -1.54 | 0.00 | 1.54 |  |
| 166 | Taliyah | -1.66 | 0.27 | 1.93 |  |
| 167 | Rell | -1.67 | 0.00 | 1.67 |  |
| 168 | Gragas | -1.68 | 0.00 | 1.68 |  |
| 169 | Vi | -1.72 | 0.07 | 1.79 |  |
| 170 | Galio | -1.82 | 0.00 | 1.82 |  |
| 171 | Tahm Kench | -1.82 | 0.00 | 1.82 |  |
| 172 | Zac | -2.00 | 0.00 | 2.00 |  |
