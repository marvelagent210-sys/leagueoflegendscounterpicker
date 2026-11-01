# Counters to Ashe (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Ashe: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ashe wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ashe --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 2 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 3 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.03 | – | +1.00 |
| 4 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 5 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 6 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 7 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 8 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Anivia | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 10 | Lulu | +0.70 | +0.72 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 11 | Cassiopeia | +0.70 | +0.73 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 12 | Corki | +0.64 | +0.76 | +0.77 | +1.00 | −0.01 | – | +0.00 |
| 13 | Tahm Kench | +0.58 | +0.93 | +0.93 | +1.00 | −0.01 | −0.88 | +0.00 |
| 14 | Wukong | +0.55 | +1.00 | +1.00 | +0.00 | −0.36 | +1.00 | +0.00 |
| 15 | Trundle | +0.52 | +1.00 | −0.17 | +1.00 | −0.25 | +1.00 | +1.00 |
| 16 | Jinx | +0.47 | +0.98 | +0.98 | −0.38 | +0.08 | – | +0.00 |
| 17 | Ziggs | +0.37 | +1.00 | +1.00 | −1.00 | +0.19 | – | +0.00 |
| 18 | Varus | +0.29 | +0.53 | +0.53 | +0.00 | +0.00 | – | +0.00 |
| 19 | Poppy | +0.29 | +1.00 | −1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 20 | Fizz | +0.17 | +1.00 | +1.00 | −1.00 | −0.21 | −0.98 | +0.00 |
| 21 | Master Yi | +0.12 | +0.00 | +0.02 | +0.00 | −0.25 | +1.00 | +1.00 |
| 22 | Olaf | +0.10 | +0.16 | −1.00 | +1.00 | −0.29 | +1.00 | +1.00 |
| 23 | Riven | +0.09 | +1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.20 |
| 24 | Swain | +0.05 | +0.23 | +0.49 | −0.75 | +0.12 | – | +0.00 |
| 25 | Sion | −0.06 | +0.48 | −0.23 | −1.00 | −0.09 | +0.93 | +0.00 |
| 26 | Zaahen | −0.07 | +0.27 | −1.00 | +1.00 | −0.25 | −0.49 | +0.00 |
| 27 | Nasus | −0.09 | −0.68 | +0.01 | +1.00 | −0.14 | −1.00 | +0.00 |
| 28 | Rammus | −0.12 | +0.40 | +0.45 | −1.00 | −0.22 | −1.00 | +0.00 |
| 29 | Yasuo | −0.16 | −1.00 | +0.02 | +0.99 | −0.06 | −1.00 | +0.00 |
| 30 | Yone | −0.17 | +0.24 | −1.00 | +0.24 | −0.37 | +0.24 | +0.00 |
| 31 | Jax | −0.19 | −1.00 | −1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 32 | Fiora | −0.20 | −1.00 | −1.00 | +1.00 | −0.33 | +1.00 | +1.00 |
| 33 | Gragas | −0.20 | −1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 34 | Sejuani | −0.22 | −1.00 | −1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 35 | Tryndamere | −0.23 | −1.00 | −1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 36 | Gwen | −0.27 | −1.00 | −1.00 | +1.00 | −0.44 | +1.00 | +0.00 |
| 37 | Gangplank | −0.30 | −1.00 | −1.00 | +1.00 | −0.24 | −0.14 | +1.00 |
| 38 | Maokai | −0.30 | −1.00 | +1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 39 | Annie | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 40 | Aphelios | −0.33 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 41 | Karthus | −0.35 | −1.00 | +0.00 | +0.00 | +0.01 | −1.00 | +0.00 |
| 42 | Dr. Mundo | −0.35 | −1.00 | −0.76 | +0.98 | −0.05 | −1.00 | +0.00 |
| 43 | Malzahar | −0.35 | −0.77 | −1.00 | +1.00 | −0.09 | −0.96 | +0.00 |
| 44 | Graves | −0.38 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 45 | Neeko | −0.40 | −0.95 | −1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 46 | Malphite | −0.41 | −1.00 | −1.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 47 | Zyra | −0.41 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | +0.00 |
| 48 | Lee Sin | −0.42 | −1.00 | −1.00 | +1.00 | −0.12 | −0.98 | +0.00 |
| 49 | Urgot | −0.42 | −1.00 | −1.00 | +0.96 | −0.10 | −1.00 | +0.00 |
| 50 | Renekton | −0.43 | −1.00 | −1.00 | +1.00 | −0.18 | −1.00 | +0.00 |
| 51 | Zeri | −0.47 | −0.72 | −0.33 | −1.00 | +0.08 | – | +0.50 |
| 52 | Hwei | −0.54 | −0.95 | −1.00 | +0.03 | −0.01 | – | +0.00 |
| 53 | Vi | −0.57 | −1.00 | −0.02 | −1.00 | −0.07 | −1.00 | +0.00 |
| 54 | Smolder | −0.57 | −0.62 | −0.62 | −1.00 | +0.00 | – | +0.00 |
| 55 | Irelia | −0.57 | −1.00 | −0.46 | −0.56 | +0.05 | −1.00 | +0.00 |
| 56 | Tristana | −0.58 | −1.00 | −1.00 | −0.94 | +0.06 | +1.00 | +0.00 |
| 57 | Sona | −0.64 | −0.99 | −0.51 | −1.00 | −0.01 | – | +0.00 |
| 58 | Taric | −0.71 | −0.93 | −1.00 | −0.65 | +0.03 | −1.00 | +0.00 |
| 59 | Brand | −0.71 | −1.00 | −0.61 | −1.00 | −0.05 | −1.00 | +0.00 |
| 60 | Twitch | −0.72 | −0.98 | −0.74 | −1.00 | −0.12 | – | +0.00 |
| 61 | Draven | −0.73 | −0.94 | −0.87 | −1.00 | −0.02 | – | +0.00 |
| 62 | Xin Zhao | −0.75 | −1.00 | −0.74 | −1.00 | −0.09 | −1.00 | +0.00 |
| 63 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 64 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 65 | Vel'Koz | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | +0.00 |
| 66 | Mordekaiser | −0.76 | −1.00 | −1.00 | −0.68 | −0.17 | −1.00 | +0.00 |
| 67 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 68 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 69 | Caitlyn | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 70 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 71 | Lux | −0.77 | −1.00 | −1.00 | −0.95 | −0.02 | – | +0.00 |
| 72 | Orianna | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 73 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 74 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 75 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 76 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 77 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 78 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 79 | Teemo | −0.78 | −0.97 | −0.94 | −1.00 | +0.00 | −0.99 | +0.00 |
| 80 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 81 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 82 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 83 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 84 | Ahri | −0.79 | −1.00 | −1.00 | −0.99 | −0.06 | – | +0.00 |
| 85 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 86 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 87 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 88 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 89 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 90 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 91 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 92 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 93 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 94 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 95 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 96 | Kalista | −0.79 | −0.98 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 97 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 98 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 99 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 100 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 101 | Ryze | −0.80 | −0.99 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 102 | Quinn | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.22 |
| 103 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 104 | Twisted Fate | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 105 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 106 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 107 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 108 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 109 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 110 | Illaoi | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 111 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −0.97 | +0.00 |
| 112 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 113 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 114 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 115 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 116 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 117 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 118 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 119 | Volibear | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 120 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 121 | Sivir | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 122 | Udyr | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 123 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 124 | Galio | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 125 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 126 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 127 | Hecarim | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 128 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 129 | Nocturne | −0.83 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.29 |
| 130 | Akshan | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 131 | Camille | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 132 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 133 | Morgana | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 134 | Kassadin | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 135 | Cho'Gath | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 136 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 137 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 138 | Lucian | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 139 | Rakan | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 140 | Darius | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 141 | Aatrox | −0.86 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | −0.24 |
| 142 | Warwick | −0.87 | −1.00 | −1.00 | −1.00 | −0.48 | −1.00 | +0.00 |
| 143 | Singed | −0.87 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | +0.00 |
| 144 | Ambessa | −0.89 | −1.00 | −1.00 | −1.00 | −0.57 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ashe's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ashe's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ashe` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +1.02)

- **0.80** projectile block: Rebuttal blocks Ashe's Enchanted Crystal Arrow, a projectile. Rebuttal for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Rebuttal blocks Ashe's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Ashe basic attacks)
- **0.27** projectile block: Rebuttal blocks Ashe's Volley, a projectile. Rebuttal for 0.75 s; Volley takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe W Volley)

#### 2. Samira (net +0.96)

- **0.80** projectile block: Blade Whirl blocks Ashe's Enchanted Crystal Arrow, a projectile. Blade Whirl for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Blade Whirl blocks Ashe's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Ashe basic attacks)
- **0.28** projectile block: Blade Whirl blocks Ashe's Volley, a projectile. Blade Whirl for 0.75 s; Volley takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 100 units farther than Samira's (600 vs 500 attack range).

#### 3. Yasuo (net +0.83)

- **0.80** projectile block: Wind Wall blocks Ashe's Enchanted Crystal Arrow, a projectile. Wind Wall for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Yasuo W Wind Wall → Ashe R Enchanted Crystal Arrow)
- **0.39** projectile block: Wind Wall blocks Ashe's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ashe basic attacks)
- **0.30** projectile block: Wind Wall blocks Ashe's Volley, a projectile. Wind Wall for 4 s, long enough to use ahead of Volley. (Yasuo W Wind Wall → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 425 units farther than Yasuo's (600 vs 175 attack range).

#### 4. Braum (net +0.79)

- **0.80** projectile block: Unbreakable blocks Ashe's Enchanted Crystal Arrow, a projectile. Unbreakable for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Braum E Unbreakable → Ashe R Enchanted Crystal Arrow)
- **0.50** projectile block: Unbreakable blocks Ashe's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ashe basic attacks)
- **0.39** projectile block: Unbreakable blocks Ashe's Volley, a projectile. Unbreakable for 4 s, long enough to use ahead of Volley. (Braum E Unbreakable → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

#### 5. Lissandra (net +0.68)

- **0.68** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Lissandra R Frozen Tomb → Ashe R Enchanted Crystal Arrow)

#### 6. Fizz (net +0.62)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Fizz E Playful → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

#### 7. Sivir (net +0.62)

- **0.80** spell shield: Spell Shield's spell shield blocks Ashe's Enchanted Crystal Arrow. Spell shield for 1.5 s, long enough to use ahead of Enchanted Crystal Arrow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Sivir's (600 vs 500 attack range).

#### 8. Aurora (net +0.61)

- **0.61** untargetable: Between Worlds makes Aurora untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.4 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ashe R Enchanted Crystal Arrow)

#### 9. Fiora (net +0.59)

- **0.90** parry: Riposte parries Ashe's Enchanted Crystal Arrow and stuns back. Parry for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Negating Enchanted Crystal Arrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ashe R Enchanted Crystal Arrow)
- **0.09** attack speed slow: Riposte cuts Ashe's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ashe basic attacks)
- Watch out: Ashe's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

#### 10. Bard (net +0.59)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Bard R Tempered Fate → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Bard's (600 vs 500 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.02 | 1.02 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +0.96 | 1.02 | 0.06 | projectile block (Blade Whirl) |
| 3 | Yasuo | +0.83 | 1.07 | 0.24 | projectile block (Wind Wall) |
| 4 | Braum | +0.79 | 1.15 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 6 | Fizz | +0.62 | 0.80 | 0.18 |  |
| 7 | Sivir | +0.62 | 0.80 | 0.18 |  |
| 8 | Aurora | +0.61 | 0.61 | 0.00 |  |
| 9 | Fiora | +0.59 | 0.95 | 0.36 |  |
| 10 | Bard | +0.59 | 0.68 | 0.09 |  |
| 11 | Morgana | +0.56 | 0.83 | 0.27 |  |
| 12 | Udyr | +0.48 | 0.84 | 0.36 |  |
| 13 | Vladimir | +0.48 | 0.80 | 0.32 |  |
| 14 | Xayah | +0.47 | 0.61 | 0.14 |  |
| 15 | Zaahen | +0.46 | 0.70 | 0.24 |  |
| 16 | Camille | +0.46 | 0.64 | 0.18 |  |
| 17 | Gwen | +0.44 | 0.80 | 0.36 |  |
| 18 | Maokai | +0.44 | 0.80 | 0.36 |  |
| 19 | Nocturne | +0.44 | 0.80 | 0.36 |  |
| 20 | Evelynn | +0.44 | 0.68 | 0.24 |  |
| 21 | Rek'Sai | +0.44 | 0.68 | 0.24 |  |
| 22 | Shaco | +0.44 | 0.68 | 0.24 |  |
| 23 | Kled | +0.44 | 0.60 | 0.16 |  |
| 24 | Kalista | +0.42 | 0.47 | 0.05 |  |
| 25 | Milio | +0.41 | 0.55 | 0.14 |  |
| 26 | Master Yi | +0.38 | 0.85 | 0.47 |  |
| 27 | Zed | +0.37 | 0.61 | 0.24 |  |
| 28 | Kayle | +0.34 | 0.34 | 0.00 |  |
| 29 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 30 | Teemo | +0.29 | 0.47 | 0.18 | blind (Blinding Dart) |
| 31 | Yuumi | +0.26 | 0.80 | 0.54 |  |
| 32 | Alistar | +0.20 | 0.56 | 0.36 |  |
| 33 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 34 | Varus | +0.12 | 0.18 | 0.06 |  |
| 35 | Aphelios | +0.03 | 0.03 | 0.00 |  |
| 36 | Heimerdinger | +0.03 | 0.03 | 0.00 |  |
| 37 | Sion | +0.02 | 0.82 | 0.80 |  |
| 38 | Jax | +0.02 | 0.38 | 0.36 |  |
| 39 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 40 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 41 | Annie | 0.00 | 0.00 | 0.00 |  |
| 42 | Brand | 0.00 | 0.00 | 0.00 |  |
| 43 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 44 | Corki | 0.00 | 0.00 | 0.00 |  |
| 45 | Draven | 0.00 | 0.00 | 0.00 |  |
| 46 | Elise | 0.00 | 0.00 | 0.00 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 49 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 50 | Lux | 0.00 | 0.00 | 0.00 |  |
| 51 | Nami | 0.00 | 0.00 | 0.00 |  |
| 52 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 53 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 54 | Senna | 0.00 | 0.00 | 0.00 |  |
| 55 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 56 | Sona | 0.00 | 0.00 | 0.00 |  |
| 57 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 58 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 59 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 60 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 61 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 62 | Vex | 0.00 | 0.00 | 0.00 |  |
| 63 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 64 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 65 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 66 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 67 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 68 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 69 | Kayn | -0.01 | 0.68 | 0.69 |  |
| 70 | Nilah | -0.01 | 0.33 | 0.34 |  |
| 71 | Olaf | -0.02 | 0.70 | 0.72 |  |
| 72 | Gangplank | -0.05 | 0.67 | 0.72 |  |
| 73 | Rengar | -0.05 | 0.67 | 0.72 |  |
| 74 | Azir | -0.05 | 0.00 | 0.05 |  |
| 75 | Gnar | -0.05 | 0.00 | 0.05 |  |
| 76 | Xin Zhao | -0.06 | 0.30 | 0.36 |  |
| 77 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 78 | Kai'Sa | -0.07 | 0.00 | 0.07 |  |
| 79 | LeBlanc | -0.07 | 0.00 | 0.07 |  |
| 80 | Nidalee | -0.07 | 0.00 | 0.07 |  |
| 81 | Warwick | -0.08 | 0.75 | 0.83 |  |
| 82 | Jayce | -0.09 | 0.00 | 0.09 |  |
| 83 | Kindred | -0.09 | 0.00 | 0.09 |  |
| 84 | Thresh | -0.09 | 0.00 | 0.09 |  |
| 85 | Graves | -0.11 | 0.00 | 0.11 |  |
| 86 | Malphite | -0.12 | 0.24 | 0.36 |  |
| 87 | Jinx | -0.14 | 0.00 | 0.14 |  |
| 88 | Karma | -0.14 | 0.00 | 0.14 |  |
| 89 | Orianna | -0.14 | 0.00 | 0.14 |  |
| 90 | Seraphine | -0.14 | 0.00 | 0.14 |  |
| 91 | Swain | -0.14 | 0.00 | 0.14 |  |
| 92 | Viktor | -0.14 | 0.00 | 0.14 |  |
| 93 | Malzahar | -0.16 | 0.42 | 0.58 |  |
| 94 | Rammus | -0.16 | 0.36 | 0.52 |  |
| 95 | Briar | -0.18 | 0.00 | 0.18 |  |
| 96 | Jarvan IV | -0.18 | 0.00 | 0.18 |  |
| 97 | Kog'Maw | -0.18 | 0.00 | 0.18 |  |
| 98 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 99 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 100 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 101 | Yone | -0.18 | 0.00 | 0.18 |  |
| 102 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 103 | Quinn | -0.21 | 0.00 | 0.21 |  |
| 104 | Urgot | -0.22 | 0.00 | 0.22 |  |
| 105 | Akali | -0.24 | 0.00 | 0.24 |  |
| 106 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 107 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 108 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 109 | Hecarim | -0.24 | 0.00 | 0.24 |  |
| 110 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 111 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 112 | Ornn | -0.24 | 0.00 | 0.24 |  |
| 113 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 114 | Rell | -0.24 | 0.00 | 0.24 |  |
| 115 | Riven | -0.24 | 0.00 | 0.24 |  |
| 116 | Talon | -0.24 | 0.00 | 0.24 |  |
| 117 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 118 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 119 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 120 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 121 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 122 | Viego | -0.30 | 0.00 | 0.30 |  |
| 123 | Pantheon | -0.32 | 0.40 | 0.72 |  |
| 124 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 125 | Shen | -0.33 | 0.36 | 0.69 |  |
| 126 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 127 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 128 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 129 | Amumu | -0.36 | 0.00 | 0.36 |  |
| 130 | Diana | -0.36 | 0.00 | 0.36 |  |
| 131 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 132 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 133 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 134 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 135 | Leona | -0.36 | 0.00 | 0.36 |  |
| 136 | Locke | -0.36 | 0.00 | 0.36 |  |
| 137 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 138 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 139 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 140 | Sett | -0.36 | 0.00 | 0.36 |  |
| 141 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 142 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 143 | Akshan | -0.37 | 0.00 | 0.37 |  |
| 144 | Lucian | -0.37 | 0.00 | 0.37 |  |
| 145 | Janna | -0.40 | 0.00 | 0.40 |  |
| 146 | Katarina | -0.41 | 0.18 | 0.59 |  |
| 147 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 148 | Vel'Koz | -0.42 | 0.00 | 0.42 |  |
| 149 | Garen | -0.44 | 0.28 | 0.72 |  |
| 150 | Singed | -0.45 | 0.27 | 0.72 |  |
| 151 | Xerath | -0.45 | 0.00 | 0.45 |  |
| 152 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 153 | Vi | -0.47 | 0.00 | 0.47 |  |
| 154 | Fiddlesticks | -0.48 | 0.00 | 0.48 |  |
| 155 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 156 | Taliyah | -0.55 | 0.00 | 0.55 |  |
| 157 | Poppy | -0.56 | 0.00 | 0.56 |  |
| 158 | Zac | -0.61 | 0.00 | 0.61 |  |
| 159 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 160 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 161 | Tahm Kench | -0.65 | 0.00 | 0.65 |  |
| 162 | Skarner | -0.68 | 0.04 | 0.72 |  |
| 163 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 164 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 165 | Darius | -0.72 | 0.00 | 0.72 |  |
| 166 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 167 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 168 | Taric | -0.72 | 0.00 | 0.72 |  |
| 169 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 170 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 171 | Galio | -0.79 | 0.00 | 0.79 |  |
| 172 | Nunu & Willump | -1.01 | 0.09 | 1.10 |  |
