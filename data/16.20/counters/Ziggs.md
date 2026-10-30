# Counters to Ziggs (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Ziggs: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ziggs wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ziggs --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 2 | Rengar | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 3 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 4 | Galio | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 5 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +1.00 |
| 6 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 7 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 8 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 9 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 10 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 11 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 12 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 13 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 14 | Irelia | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 15 | Xin Zhao | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 16 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 17 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 18 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 19 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 20 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 21 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 22 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 23 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 24 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 25 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 26 | Fizz | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 27 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 28 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 29 | Skarner | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 30 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 31 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 32 | Malphite | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 33 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 34 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 35 | Kassadin | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 36 | Swain | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 37 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 38 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 39 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 40 | Gnar | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 41 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 42 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +0.99 | +0.00 |
| 43 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 44 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 45 | Corki | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 46 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 47 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 48 | Pantheon | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.00 |
| 49 | Annie | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 50 | Lulu | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 51 | Aphelios | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 52 | Nocturne | +0.76 | +1.00 | +1.00 | +1.00 | −0.27 | +1.00 | +0.00 |
| 53 | Teemo | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 54 | Vayne | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 55 | Kayle | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 56 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 57 | Zeri | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 58 | Aatrox | +0.75 | +1.00 | +1.00 | +1.00 | −0.28 | +0.87 | +0.00 |
| 59 | Kindred | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 60 | Gwen | +0.73 | +0.97 | +1.00 | +1.00 | −0.41 | +1.00 | +0.00 |
| 61 | Zoe | +0.69 | +0.96 | +0.72 | +1.00 | −0.14 | +0.96 | +0.00 |
| 62 | Urgot | +0.68 | +1.00 | +1.00 | +1.00 | −0.11 | −0.04 | +0.00 |
| 63 | Warwick | +0.67 | +1.00 | +1.00 | +1.00 | −0.17 | +0.00 | +0.00 |
| 64 | Rumble | +0.60 | +1.00 | +0.32 | +1.00 | −0.19 | +1.00 | +0.00 |
| 65 | Graves | +0.57 | +1.00 | +1.00 | +0.00 | −0.23 | +1.00 | +0.00 |
| 66 | Hecarim | +0.55 | +1.00 | +1.00 | +1.00 | −0.33 | −1.00 | +0.00 |
| 67 | Twisted Fate | +0.52 | +1.00 | +1.00 | +0.00 | −0.18 | – | +0.00 |
| 68 | Illaoi | +0.52 | +0.97 | +0.06 | +1.00 | −0.10 | +0.75 | +0.00 |
| 69 | Yone | +0.52 | +1.00 | −0.01 | +1.00 | −0.20 | +1.00 | +0.00 |
| 70 | Nautilus | +0.51 | +1.00 | −0.09 | +1.00 | −0.07 | +0.96 | +0.00 |
| 71 | Akali | +0.46 | +1.00 | +0.65 | +0.31 | −0.07 | −0.05 | +0.00 |
| 72 | Shen | +0.46 | +1.00 | +0.01 | +1.00 | −0.07 | +0.15 | +0.00 |
| 73 | Jhin | +0.33 | +1.00 | +1.00 | −0.91 | −0.13 | – | +0.00 |
| 74 | Neeko | +0.32 | +1.00 | +0.00 | +1.00 | −0.21 | −1.00 | +0.00 |
| 75 | Garen | +0.30 | +1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 76 | Rell | +0.29 | +1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 77 | Ornn | +0.29 | +0.80 | +0.30 | +0.09 | −0.09 | +0.12 | +0.00 |
| 78 | Riven | +0.28 | +1.00 | −1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 79 | Singed | +0.28 | +1.00 | −1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 80 | Braum | +0.27 | +0.09 | +0.19 | +1.00 | −0.05 | +0.09 | +0.00 |
| 81 | Amumu | +0.26 | +0.91 | −1.00 | +1.00 | −0.10 | +0.99 | +0.00 |
| 82 | Ambessa | +0.26 | −1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 83 | Anivia | +0.21 | +0.30 | +0.30 | +0.35 | −0.21 | – | +0.00 |
| 84 | Kennen | +0.19 | −1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 85 | Smolder | +0.19 | +1.00 | −1.00 | +1.00 | −0.19 | – | +0.00 |
| 86 | Naafiri | +0.19 | +1.00 | +1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 87 | Tahm Kench | +0.16 | +0.21 | +0.20 | +0.21 | +0.00 | +0.15 | +0.00 |
| 88 | Jarvan IV | +0.09 | +1.00 | −1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 89 | Kha'Zix | +0.06 | +1.00 | −1.00 | +1.00 | −0.26 | −1.00 | +0.00 |
| 90 | Malzahar | +0.03 | +0.00 | +1.00 | −1.00 | −0.13 | – | +0.00 |
| 91 | Xayah | +0.02 | +1.00 | +0.00 | −1.00 | −0.19 | – | +0.00 |
| 92 | Taric | −0.01 | +0.02 | −0.08 | +0.09 | −0.05 | −0.01 | +0.00 |
| 93 | Nunu & Willump | −0.01 | +1.00 | −1.00 | +0.02 | −0.09 | −0.00 | +0.00 |
| 94 | Karma | −0.10 | −0.46 | +0.23 | −0.08 | −0.12 | – | +0.00 |
| 95 | Vel'Koz | −0.12 | +0.55 | −1.00 | +0.39 | +0.10 | −1.00 | +0.00 |
| 96 | Ekko | −0.23 | +1.00 | −1.00 | −1.00 | −0.18 | −0.01 | +0.00 |
| 97 | Jinx | −0.24 | +1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 98 | Lissandra | −0.25 | +1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 99 | Aurora | −0.25 | −1.00 | +1.00 | −1.00 | −0.15 | – | +0.00 |
| 100 | Kai'Sa | −0.26 | −1.00 | −0.58 | +1.00 | −0.24 | – | +0.00 |
| 101 | Morgana | −0.26 | −1.00 | −1.00 | +0.77 | −0.11 | +1.00 | +0.00 |
| 102 | LeBlanc | −0.31 | −1.00 | +0.52 | −0.39 | −0.08 | −1.00 | +0.00 |
| 103 | Twitch | −0.31 | −1.00 | +0.00 | +0.00 | −0.19 | – | +0.00 |
| 104 | Samira | −0.35 | −1.00 | −1.00 | +0.99 | −0.08 | – | +0.00 |
| 105 | Hwei | −0.35 | −1.00 | −1.00 | +1.00 | −0.10 | – | +0.00 |
| 106 | Varus | −0.35 | −1.00 | −1.00 | +1.00 | −0.10 | – | +0.00 |
| 107 | Orianna | −0.35 | −1.00 | −1.00 | +1.00 | −0.13 | – | +0.00 |
| 108 | Rakan | −0.36 | +0.00 | −1.00 | +0.00 | −0.09 | −1.00 | +0.00 |
| 109 | Ashe | −0.37 | −1.00 | −1.00 | +1.00 | −0.19 | – | +0.00 |
| 110 | Akshan | −0.37 | −1.00 | −1.00 | +1.00 | −0.21 | – | +0.00 |
| 111 | Draven | −0.42 | −0.43 | −1.00 | +0.00 | −0.11 | – | +0.00 |
| 112 | Vladimir | −0.42 | −0.53 | −1.00 | −0.02 | −0.19 | −0.06 | +0.00 |
| 113 | Quinn | −0.46 | +0.29 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 114 | Karthus | −0.52 | −1.00 | −0.13 | −1.00 | −0.16 | −0.14 | +0.00 |
| 115 | Leona | −0.53 | −0.45 | −0.38 | −1.00 | −0.16 | −1.00 | +0.00 |
| 116 | Zed | −0.56 | +0.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 117 | Ryze | −0.57 | −0.07 | −1.00 | −0.95 | −0.12 | −0.97 | +0.00 |
| 118 | Lux | −0.59 | −1.00 | −1.00 | −0.11 | −0.08 | – | +0.00 |
| 119 | Blitzcrank | −0.64 | −1.00 | −1.00 | −0.13 | −0.10 | −1.00 | +0.00 |
| 120 | Vex | −0.74 | −1.00 | −0.79 | −1.00 | −0.10 | – | +0.00 |
| 121 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 122 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 123 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 124 | Kalista | −0.80 | −0.95 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 125 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 126 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 127 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 128 | Janna | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 129 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 130 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 131 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 132 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 133 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 134 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 135 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 136 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 137 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 138 | Sivir | −0.82 | −1.00 | −1.00 | −1.00 | −0.27 | – | +0.00 |
| 139 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 140 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 141 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 142 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 143 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 144 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ziggs's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ziggs's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ziggs` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.03)

- **0.85** spell shield: Shroud of Darkness's spell shield blocks Ziggs's Satchel Charge. Spell shield for 1.5 s, long enough to use ahead of Satchel Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ziggs W Satchel Charge)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Ziggs's Mega Inferno Bomb. Spell shield for 1.5 s, long enough to use ahead of Mega Inferno Bomb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ziggs R Mega Inferno Bomb)
- **0.17** cc immunity: Paranoia is displacement immune, ignoring Ziggs's Satchel Charge (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Ziggs W Satchel Charge)
- Watch out: Ziggs's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 2. Fizz (net +1.00)

- **0.85** untargetable: Playful makes Fizz untargetable, dodging Ziggs's Satchel Charge. Untargetable for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. (Fizz E Playful → Ziggs W Satchel Charge)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 0.75 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Fizz E Playful → Ziggs R Mega Inferno Bomb)
- Watch out: Ziggs's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 3. Sivir (net +0.96)

- **0.68** spell shield: Spell Shield's spell shield blocks Ziggs's Satchel Charge. Spell shield for 1.5 s, long enough to use ahead of Satchel Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ziggs W Satchel Charge)
- **0.55** spell shield: Spell Shield's spell shield blocks Ziggs's Mega Inferno Bomb. Spell shield for 1.5 s, long enough to use ahead of Mega Inferno Bomb. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ziggs R Mega Inferno Bomb)

#### 4. Braum (net +0.95)

- **0.85** projectile block: Unbreakable blocks Ziggs's Satchel Charge, a projectile. Unbreakable for 4 s, long enough to use ahead of Satchel Charge. (Braum E Unbreakable → Ziggs W Satchel Charge)
- **0.45** projectile block: Unbreakable blocks Ziggs's Hexplosive Minefield, a projectile. Unbreakable for 4 s, long enough to use ahead of Hexplosive Minefield. (Braum E Unbreakable → Ziggs E Hexplosive Minefield)
- **0.39** projectile block: Unbreakable blocks Ziggs's Bouncing Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Bouncing Bomb. (Braum E Unbreakable → Ziggs Q Bouncing Bomb)
- Watch out: Ziggs's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 5. Samira (net +0.91)

- **0.62** projectile block: Blade Whirl blocks Ziggs's Satchel Charge, a projectile. Blade Whirl for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. (Samira W Blade Whirl → Ziggs W Satchel Charge)
- **0.38** projectile block: Blade Whirl blocks Ziggs's Hexplosive Minefield, a projectile. Blade Whirl for 0.75 s; Hexplosive Minefield takes 0.83 s to land, enough to react. (Samira W Blade Whirl → Ziggs E Hexplosive Minefield)
- **0.28** projectile block: Blade Whirl blocks Ziggs's Bouncing Bomb, a projectile. Blade Whirl for 0.75 s; Bouncing Bomb takes 1.07 s to land, enough to react. (Samira W Blade Whirl → Ziggs Q Bouncing Bomb)

#### 6. Maokai (net +0.86)

- **0.85** untargetable: Twisted Advance makes Maokai untargetable, dodging Ziggs's Satchel Charge. Untargetable for 1.4 s; Satchel Charge takes 0.82 s to land, enough to react. (Maokai W Twisted Advance → Ziggs W Satchel Charge)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 1.4 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Maokai W Twisted Advance → Ziggs R Mega Inferno Bomb)
- Watch out: Ziggs's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 7. Yasuo (net +0.86)

- **0.70** projectile block: Wind Wall blocks Ziggs's Satchel Charge, a projectile. Wind Wall for 4 s, long enough to use ahead of Satchel Charge. (Yasuo W Wind Wall → Ziggs W Satchel Charge)
- **0.43** projectile block: Wind Wall blocks Ziggs's Hexplosive Minefield, a projectile. Wind Wall for 4 s, long enough to use ahead of Hexplosive Minefield. (Yasuo W Wind Wall → Ziggs E Hexplosive Minefield)
- **0.30** projectile block: Wind Wall blocks Ziggs's Bouncing Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Bouncing Bomb. (Yasuo W Wind Wall → Ziggs Q Bouncing Bomb)
- Watch out: Ziggs's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 8. Mel (net +0.85)

- **0.58** projectile block: Rebuttal blocks Ziggs's Satchel Charge, a projectile. Rebuttal for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. (Mel W Rebuttal → Ziggs W Satchel Charge)
- **0.35** projectile block: Rebuttal blocks Ziggs's Hexplosive Minefield, a projectile. Rebuttal for 0.75 s; Hexplosive Minefield takes 0.83 s to land, enough to react. (Mel W Rebuttal → Ziggs E Hexplosive Minefield)
- **0.27** projectile block: Rebuttal blocks Ziggs's Bouncing Bomb, a projectile. Rebuttal for 0.75 s; Bouncing Bomb takes 1.07 s to land, enough to react. (Mel W Rebuttal → Ziggs Q Bouncing Bomb)

#### 9. Fiora (net +0.84)

- **0.82** parry: Riposte parries Ziggs's Satchel Charge and stuns back. Parry for 0.75 s; Satchel Charge takes 0.82 s to land, enough to react. Negating Satchel Charge's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ziggs W Satchel Charge)
- **0.55** parry: Riposte parries Ziggs's Mega Inferno Bomb. Parry for 0.75 s; Mega Inferno Bomb takes 2.6 s to land, enough to react. (Fiora W Riposte → Ziggs R Mega Inferno Bomb)
- **0.06** attack speed slow: Riposte cuts Ziggs's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ziggs basic attacks)
- Watch out: Ziggs's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 10. Vladimir (net +0.80)

- **0.72** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ziggs's Satchel Charge. Untargetable for 2 s, long enough to use ahead of Satchel Charge. (Vladimir W Sanguine Pool → Ziggs W Satchel Charge)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Ziggs's Mega Inferno Bomb. Untargetable for 2 s, long enough to use ahead of Mega Inferno Bomb. (Vladimir W Sanguine Pool → Ziggs R Mega Inferno Bomb)
- Watch out: Ziggs's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.03 | 1.30 | 0.27 |  |
| 2 | Fizz | +1.00 | 1.13 | 0.13 |  |
| 3 | Sivir | +0.96 | 0.96 | 0.00 |  |
| 4 | Braum | +0.95 | 1.22 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Samira | +0.91 | 0.91 | 0.00 | projectile block (Blade Whirl) |
| 6 | Maokai | +0.86 | 1.13 | 0.27 |  |
| 7 | Yasuo | +0.86 | 1.03 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 8 | Mel | +0.85 | 0.85 | 0.00 | projectile block (Rebuttal) |
| 9 | Fiora | +0.84 | 1.11 | 0.27 |  |
| 10 | Vladimir | +0.80 | 1.00 | 0.20 |  |
| 11 | Lissandra | +0.77 | 0.77 | 0.00 |  |
| 12 | Bard | +0.72 | 0.72 | 0.00 |  |
| 13 | Gwen | +0.69 | 0.96 | 0.27 |  |
| 14 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 15 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 16 | Yuumi | +0.65 | 1.13 | 0.48 |  |
| 17 | Morgana | +0.65 | 0.78 | 0.13 |  |
| 18 | Xayah | +0.65 | 0.65 | 0.00 |  |
| 19 | Udyr | +0.64 | 0.91 | 0.27 |  |
| 20 | Camille | +0.60 | 0.73 | 0.13 |  |
| 21 | Rek'Sai | +0.59 | 0.76 | 0.17 |  |
| 22 | Master Yi | +0.58 | 1.03 | 0.45 |  |
| 23 | Evelynn | +0.54 | 0.72 | 0.18 |  |
| 24 | Shaco | +0.54 | 0.72 | 0.18 |  |
| 25 | Vex | +0.53 | 0.53 | 0.00 |  |
| 26 | Zed | +0.47 | 0.65 | 0.18 |  |
| 27 | Ahri | +0.43 | 0.43 | 0.00 | dash stop (Charm) |
| 28 | Hwei | +0.43 | 0.43 | 0.00 | dash stop (Grim Visage) |
| 29 | Jinx | +0.43 | 0.43 | 0.00 | dash stop (Flame Chompers!) |
| 30 | Viktor | +0.41 | 0.41 | 0.00 | dash stop (Gravity Field) |
| 31 | Veigar | +0.39 | 0.39 | 0.00 |  |
| 32 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 33 | Kled | +0.33 | 0.43 | 0.10 |  |
| 34 | Kalista | +0.33 | 0.33 | 0.00 |  |
| 35 | Xin Zhao | +0.30 | 0.55 | 0.25 |  |
| 36 | Zaahen | +0.28 | 0.45 | 0.17 |  |
| 37 | Malzahar | +0.27 | 0.67 | 0.40 |  |
| 38 | Yone | +0.25 | 0.38 | 0.13 |  |
| 39 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 40 | K'Sante | +0.21 | 0.34 | 0.13 |  |
| 41 | Rengar | +0.20 | 0.73 | 0.53 |  |
| 42 | Cassiopeia | +0.20 | 0.20 | 0.00 |  |
| 43 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 44 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 45 | Kayn | +0.10 | 0.72 | 0.62 |  |
| 46 | Alistar | +0.09 | 0.36 | 0.27 |  |
| 47 | Malphite | +0.08 | 0.35 | 0.27 |  |
| 48 | Milio | +0.06 | 0.06 | 0.00 |  |
| 49 | Pantheon | +0.05 | 0.72 | 0.67 |  |
| 50 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 51 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 52 | Jarvan IV | +0.04 | 0.17 | 0.13 |  |
| 53 | Annie | +0.04 | 0.04 | 0.00 |  |
| 54 | Nilah | +0.03 | 0.25 | 0.22 |  |
| 55 | Poppy | +0.02 | 0.49 | 0.47 | dash stop (Steadfast Presence) |
| 56 | Jax | +0.01 | 0.28 | 0.27 |  |
| 57 | Hecarim | +0.01 | 0.18 | 0.17 |  |
| 58 | Ornn | 0.00 | 0.17 | 0.17 |  |
| 59 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 60 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 61 | Azir | 0.00 | 0.00 | 0.00 |  |
| 62 | Brand | 0.00 | 0.00 | 0.00 |  |
| 63 | Corki | 0.00 | 0.00 | 0.00 |  |
| 64 | Draven | 0.00 | 0.00 | 0.00 |  |
| 65 | Elise | 0.00 | 0.00 | 0.00 |  |
| 66 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 67 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 68 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 69 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 70 | Karma | 0.00 | 0.00 | 0.00 |  |
| 71 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 72 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 73 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 74 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 75 | Lux | 0.00 | 0.00 | 0.00 |  |
| 76 | Nami | 0.00 | 0.00 | 0.00 |  |
| 77 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 78 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 79 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 80 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 81 | Senna | 0.00 | 0.00 | 0.00 |  |
| 82 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 83 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 84 | Sona | 0.00 | 0.00 | 0.00 |  |
| 85 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 86 | Swain | 0.00 | 0.00 | 0.00 |  |
| 87 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 88 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 89 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 90 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 91 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 92 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 93 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 94 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 95 | Volibear | -0.01 | 0.17 | 0.18 |  |
| 96 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 97 | Graves | -0.06 | 0.00 | 0.06 |  |
| 98 | Amumu | -0.07 | 0.20 | 0.27 |  |
| 99 | Olaf | -0.08 | 0.45 | 0.53 |  |
| 100 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 101 | Warwick | -0.10 | 0.72 | 0.82 |  |
| 102 | Illaoi | -0.10 | 0.17 | 0.27 |  |
| 103 | Sett | -0.10 | 0.17 | 0.27 |  |
| 104 | Shyvana | -0.10 | 0.17 | 0.27 |  |
| 105 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 106 | Varus | -0.11 | 0.00 | 0.11 |  |
| 107 | Briar | -0.13 | 0.00 | 0.13 |  |
| 108 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 109 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 110 | Sion | -0.15 | 0.47 | 0.62 |  |
| 111 | Viego | -0.15 | 0.17 | 0.32 |  |
| 112 | Lillia | -0.15 | 0.00 | 0.15 |  |
| 113 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 114 | Rell | -0.17 | 0.00 | 0.17 |  |
| 115 | Akali | -0.18 | 0.00 | 0.18 |  |
| 116 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 117 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 118 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 119 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 120 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 121 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 122 | Riven | -0.18 | 0.00 | 0.18 |  |
| 123 | Talon | -0.18 | 0.00 | 0.18 |  |
| 124 | Caitlyn | -0.19 | 0.09 | 0.28 |  |
| 125 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 126 | Irelia | -0.23 | 0.00 | 0.23 |  |
| 127 | Rammus | -0.24 | 0.27 | 0.51 |  |
| 128 | Zac | -0.25 | 0.43 | 0.68 | dash stop (Stretching Strikes) |
| 129 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 130 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 131 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 132 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 133 | Diana | -0.27 | 0.00 | 0.27 |  |
| 134 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 135 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 136 | Leona | -0.27 | 0.00 | 0.27 |  |
| 137 | Locke | -0.27 | 0.00 | 0.27 |  |
| 138 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 139 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 145 | Singed | -0.32 | 0.21 | 0.53 |  |
| 146 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 147 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 148 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 149 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 150 | Shen | -0.36 | 0.27 | 0.63 |  |
| 151 | Vi | -0.36 | 0.17 | 0.53 |  |
| 152 | Garen | -0.38 | 0.12 | 0.50 |  |
| 153 | Janna | -0.40 | 0.00 | 0.40 |  |
| 154 | Karthus | -0.41 | 0.00 | 0.41 |  |
| 155 | Gragas | -0.42 | 0.00 | 0.42 |  |
| 156 | Mordekaiser | -0.44 | 0.06 | 0.50 |  |
| 157 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 158 | Skarner | -0.47 | 0.06 | 0.53 |  |
| 159 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 160 | Darius | -0.50 | 0.00 | 0.50 |  |
| 161 | Trundle | -0.50 | 0.00 | 0.50 |  |
| 162 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 163 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 164 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 165 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 166 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 167 | Taric | -0.53 | 0.00 | 0.53 |  |
| 168 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 169 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 170 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 171 | Galio | -0.77 | 0.00 | 0.77 |  |
| 172 | Nunu & Willump | -0.88 | 0.14 | 1.02 |  |
