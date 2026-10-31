# Counters to Orianna (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Orianna: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Orianna wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Orianna --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 2 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 3 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +1.00 |
| 4 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +1.00 |
| 5 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 6 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 7 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 9 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 10 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 11 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 12 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 13 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | +0.92 | +0.00 |
| 14 | Heimerdinger | +0.79 | +1.00 | +0.94 | +1.00 | +0.03 | +1.00 | +0.00 |
| 15 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 16 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 17 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 18 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 19 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 20 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 21 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 22 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 23 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 24 | Yasuo | +0.76 | +1.00 | +1.00 | +0.85 | −0.05 | +1.00 | +0.00 |
| 25 | Tristana | +0.72 | +1.00 | +1.00 | +0.50 | +0.16 | +1.00 | +0.00 |
| 26 | Lulu | +0.71 | +0.83 | +0.90 | +1.00 | +0.03 | – | +0.00 |
| 27 | Gwen | +0.63 | +0.72 | +1.00 | +0.64 | −0.20 | +1.00 | +0.00 |
| 28 | Jax | +0.60 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 29 | Maokai | +0.59 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | +0.00 |
| 30 | Riven | +0.57 | +1.00 | +1.00 | +1.00 | −0.23 | −1.00 | +0.00 |
| 31 | Olaf | +0.56 | +1.00 | +1.00 | +1.00 | −0.24 | −1.00 | +0.00 |
| 32 | Irelia | +0.51 | +0.96 | −0.13 | +0.99 | +0.02 | +1.00 | +0.00 |
| 33 | Vi | +0.40 | +1.00 | +1.00 | −1.00 | −0.03 | +1.00 | +0.00 |
| 34 | Garen | +0.39 | +1.00 | +1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 35 | Camille | +0.39 | +1.00 | +1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 36 | Rammus | +0.39 | +1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 37 | Malphite | +0.39 | +1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 38 | Udyr | +0.38 | +1.00 | +1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 39 | Ziggs | +0.35 | +1.00 | +1.00 | −1.00 | +0.13 | – | +0.00 |
| 40 | Xin Zhao | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | +0.32 | +0.00 |
| 41 | Lee Sin | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 42 | Gangplank | +0.28 | −1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 43 | Xayah | +0.28 | +1.00 | +0.00 | +0.00 | −0.01 | – | +0.00 |
| 44 | Warwick | +0.26 | −1.00 | +1.00 | +1.00 | −0.27 | +1.00 | +0.00 |
| 45 | Sion | +0.23 | +0.37 | +1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 46 | Aphelios | +0.21 | +1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 47 | Nocturne | +0.17 | +1.00 | +1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 48 | Gnar | +0.12 | +0.51 | +0.36 | +0.09 | −0.07 | −1.00 | +0.00 |
| 49 | Tahm Kench | +0.08 | +0.09 | +0.08 | +0.18 | −0.04 | +0.14 | +0.00 |
| 50 | Kennen | +0.05 | +0.39 | −0.81 | +0.74 | +0.04 | – | +0.00 |
| 51 | Anivia | +0.01 | −0.08 | −0.08 | +0.31 | −0.12 | – | +0.00 |
| 52 | Yone | −0.03 | +0.24 | +1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 53 | Mordekaiser | −0.03 | +0.01 | −0.32 | +0.01 | −0.07 | +0.58 | +0.00 |
| 54 | Rumble | −0.03 | −0.43 | +0.95 | −1.00 | −0.07 | +0.50 | +0.00 |
| 55 | Twisted Fate | −0.07 | −1.00 | +0.00 | +1.00 | −0.08 | – | +0.00 |
| 56 | Fizz | −0.10 | −1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 57 | Pantheon | −0.11 | −1.00 | +1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 58 | Hecarim | −0.11 | −1.00 | +1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 59 | Swain | −0.13 | −0.64 | −0.64 | +1.00 | +0.04 | – | +0.00 |
| 60 | Sett | −0.13 | −1.00 | +1.00 | −1.00 | −0.20 | +1.00 | +0.00 |
| 61 | Jhin | −0.22 | +1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 62 | Taric | −0.30 | −0.38 | −0.32 | −0.42 | −0.02 | −0.33 | +0.00 |
| 63 | Zed | −0.33 | +1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 64 | Samira | −0.38 | −1.00 | −1.00 | +0.80 | −0.04 | – | +0.00 |
| 65 | Quinn | −0.40 | −1.00 | −1.00 | +0.77 | −0.08 | – | +0.00 |
| 66 | Urgot | −0.42 | −1.00 | −1.00 | +0.92 | −0.04 | −1.00 | +0.00 |
| 67 | Skarner | −0.43 | +0.00 | −1.00 | −1.00 | +0.12 | +0.00 | +0.00 |
| 68 | Smolder | −0.48 | −1.00 | +0.00 | −1.00 | +0.09 | – | +0.00 |
| 69 | Brand | −0.51 | −0.09 | −1.00 | −1.00 | −0.03 | −0.29 | +0.00 |
| 70 | Kindred | −0.56 | −1.00 | −1.00 | +0.00 | −0.02 | – | +0.00 |
| 71 | Varus | −0.56 | −1.00 | −1.00 | +0.00 | −0.05 | – | +0.00 |
| 72 | Ambessa | −0.57 | −1.00 | +0.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 73 | Jarvan IV | −0.58 | −1.00 | −1.00 | −1.00 | +0.12 | +1.00 | +0.00 |
| 74 | Braum | −0.60 | −0.62 | −1.00 | −1.00 | −0.03 | +0.08 | +0.00 |
| 75 | Wukong | −0.64 | −1.00 | −1.00 | +0.00 | −0.25 | −1.00 | +0.00 |
| 76 | Hwei | −0.64 | −1.00 | −0.69 | −0.79 | +0.00 | – | +0.00 |
| 77 | Zoe | −0.71 | −1.00 | −1.00 | −1.00 | +0.00 | −0.08 | +0.00 |
| 78 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.43 | −1.00 | +0.00 |
| 79 | Aurora | −0.75 | −0.86 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 80 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 81 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 82 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 83 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 84 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 85 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 86 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 87 | Karma | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 88 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 89 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 90 | Jinx | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 91 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 92 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 93 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 94 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 95 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 96 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 97 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 98 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 99 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 100 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 101 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 102 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 103 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 104 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 105 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 106 | Morgana | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 107 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 108 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 109 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 110 | Kalista | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 111 | Kled | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 112 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 113 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 114 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 115 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 116 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 117 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 118 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 119 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 120 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 121 | Graves | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 122 | Neeko | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 123 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 124 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 125 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 126 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 127 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 128 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 129 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 130 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 131 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 132 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 133 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 134 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 135 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 136 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 137 | Illaoi | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 138 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 139 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 140 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 141 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 142 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 143 | Singed | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 144 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Orianna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Orianna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Orianna` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.96)

- **0.80** spell shield: Spell Shield's spell shield blocks Orianna's Command: Shockwave. Spell shield for 1.5 s, long enough to use ahead of Command: Shockwave. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Orianna R Command: Shockwave)
- **0.32** spell shield: Spell Shield's spell shield blocks Orianna's Command: Protect. Spell shield for 1.5 s, long enough to use ahead of Command: Protect. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Orianna E Command: Protect)

#### 2. Fizz (net +0.91)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Orianna's Command: Shockwave. Untargetable for 0.75 s; Command: Shockwave takes 0.5 s to land, enough to react. (Fizz E Playful → Orianna R Command: Shockwave)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Orianna's Command: Protect. Untargetable for 0.75 s; Command: Protect takes 0.61 s to land, enough to react. (Fizz E Playful → Orianna E Command: Protect)
- Watch out: Orianna's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 3. Bard (net +0.91)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2.5 s, long enough to use ahead of Command: Shockwave. (Bard R Tempered Fate → Orianna R Command: Shockwave)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Orianna's Command: Protect. Untargetable for 2.5 s, long enough to use ahead of Command: Protect. (Bard R Tempered Fate → Orianna E Command: Protect)

#### 4. Lissandra (net +0.91)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2.5 s, long enough to use ahead of Command: Shockwave. (Lissandra R Frozen Tomb → Orianna R Command: Shockwave)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Orianna's Command: Protect. Untargetable for 2.5 s, long enough to use ahead of Command: Protect. (Lissandra R Frozen Tomb → Orianna E Command: Protect)

#### 5. Fiora (net +0.83)

- **0.90** parry: Riposte parries Orianna's Command: Shockwave and stuns back. Parry for 0.75 s; Command: Shockwave takes 0.5 s to land, enough to react. Negating Command: Shockwave's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Orianna R Command: Shockwave)
- **0.33** parry: Riposte parries Orianna's Command: Protect. Parry for 0.75 s; Command: Protect takes 0.61 s to land, enough to react. (Fiora W Riposte → Orianna E Command: Protect)
- **0.06** attack speed slow: Riposte cuts Orianna's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Orianna basic attacks)
- Watch out: Orianna's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 6. Vladimir (net +0.82)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2 s, long enough to use ahead of Command: Shockwave. (Vladimir W Sanguine Pool → Orianna R Command: Shockwave)
- **0.33** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Orianna's Command: Protect. Untargetable for 2 s, long enough to use ahead of Command: Protect. (Vladimir W Sanguine Pool → Orianna E Command: Protect)
- Watch out: Orianna's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 7. Aurora (net +0.82)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Orianna's Command: Shockwave. Untargetable for 0.4 s; Command: Shockwave takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Orianna R Command: Shockwave)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Orianna's Command: Protect. Untargetable for 0.4 s; Command: Protect takes 0.61 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Orianna E Command: Protect)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Orianna R Command: Shockwave)

#### 8. Nocturne (net +0.80)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Orianna's Command: Shockwave. Spell shield for 1.5 s, long enough to use ahead of Command: Shockwave. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Orianna R Command: Shockwave)
- **0.38** spell shield: Shroud of Darkness's spell shield blocks Orianna's Command: Protect. Spell shield for 1.5 s, long enough to use ahead of Command: Protect. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Orianna E Command: Protect)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Orianna R Command: Shockwave)
- Watch out: Orianna's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 9. Xayah (net +0.80)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Orianna's Command: Shockwave. Untargetable for 1.5 s, long enough to use ahead of Command: Shockwave. (Xayah R Featherstorm → Orianna R Command: Shockwave)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Orianna's Command: Protect. Untargetable for 1.5 s, long enough to use ahead of Command: Protect. (Xayah R Featherstorm → Orianna E Command: Protect)

#### 10. Rek'Sai (net +0.77)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Orianna's Command: Shockwave. Untargetable for 1.5 s, long enough to use ahead of Command: Shockwave. (Rek'Sai R Void Rush → Orianna R Command: Shockwave)
- **0.21** untargetable: Void Rush makes Rek'Sai untargetable, dodging Orianna's Command: Protect. Untargetable for 1.5 s, long enough to use ahead of Command: Protect. (Rek'Sai R Void Rush → Orianna E Command: Protect)
- **0.08** cc immunity: Void Rush is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Orianna R Command: Shockwave)
- Watch out: Orianna's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.96 | 0.96 | 0.00 |  |
| 2 | Fizz | +0.91 | 1.03 | 0.12 |  |
| 3 | Bard | +0.91 | 0.91 | 0.00 |  |
| 4 | Lissandra | +0.91 | 0.91 | 0.00 |  |
| 5 | Fiora | +0.83 | 1.08 | 0.25 |  |
| 6 | Vladimir | +0.82 | 0.97 | 0.15 |  |
| 7 | Aurora | +0.82 | 0.82 | 0.00 |  |
| 8 | Nocturne | +0.80 | 1.07 | 0.27 |  |
| 9 | Xayah | +0.80 | 0.80 | 0.00 |  |
| 10 | Rek'Sai | +0.77 | 0.93 | 0.16 |  |
| 11 | Camille | +0.75 | 0.88 | 0.13 |  |
| 12 | Maokai | +0.74 | 1.01 | 0.27 |  |
| 13 | Morgana | +0.74 | 0.84 | 0.10 |  |
| 14 | Evelynn | +0.73 | 0.91 | 0.18 |  |
| 15 | Shaco | +0.73 | 0.91 | 0.18 |  |
| 16 | Gwen | +0.71 | 0.96 | 0.25 |  |
| 17 | Master Yi | +0.69 | 1.03 | 0.34 |  |
| 18 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 19 | Zaahen | +0.66 | 0.82 | 0.16 |  |
| 20 | Zed | +0.62 | 0.80 | 0.18 |  |
| 21 | Milio | +0.61 | 0.61 | 0.00 |  |
| 22 | Kled | +0.60 | 0.69 | 0.09 |  |
| 23 | Udyr | +0.59 | 0.86 | 0.27 |  |
| 24 | Yuumi | +0.58 | 1.03 | 0.45 |  |
| 25 | Kalista | +0.53 | 0.53 | 0.00 |  |
| 26 | Samira | +0.43 | 0.43 | 0.00 |  |
| 27 | Braum | +0.41 | 0.68 | 0.27 | projectile block (Unbreakable) |
| 28 | Mel | +0.41 | 0.41 | 0.00 |  |
| 29 | Alistar | +0.39 | 0.66 | 0.27 |  |
| 30 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 31 | Yasuo | +0.34 | 0.50 | 0.16 |  |
| 32 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 33 | Kayn | +0.30 | 0.91 | 0.61 |  |
| 34 | Olaf | +0.30 | 0.83 | 0.53 |  |
| 35 | Sion | +0.28 | 0.83 | 0.55 |  |
| 36 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 37 | Xin Zhao | +0.22 | 0.45 | 0.23 |  |
| 38 | Warwick | +0.17 | 0.90 | 0.73 |  |
| 39 | Rengar | +0.15 | 0.68 | 0.53 |  |
| 40 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 41 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 42 | Senna | +0.12 | 0.12 | 0.00 |  |
| 43 | Annie | +0.11 | 0.11 | 0.00 |  |
| 44 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 45 | Vex | +0.08 | 0.08 | 0.00 |  |
| 46 | Nilah | +0.05 | 0.25 | 0.20 |  |
| 47 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 48 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 49 | Malzahar | +0.03 | 0.43 | 0.40 |  |
| 50 | K'Sante | +0.03 | 0.16 | 0.13 |  |
| 51 | Jax | +0.01 | 0.28 | 0.27 |  |
| 52 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 53 | Azir | 0.00 | 0.00 | 0.00 |  |
| 54 | Brand | 0.00 | 0.00 | 0.00 |  |
| 55 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 56 | Corki | 0.00 | 0.00 | 0.00 |  |
| 57 | Draven | 0.00 | 0.00 | 0.00 |  |
| 58 | Elise | 0.00 | 0.00 | 0.00 |  |
| 59 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 60 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 61 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 62 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 63 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 64 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 65 | Karma | 0.00 | 0.00 | 0.00 |  |
| 66 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 67 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 68 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 69 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 82 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 83 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 84 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 85 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 86 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 87 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 88 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 91 | Malphite | -0.01 | 0.26 | 0.27 |  |
| 92 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 93 | Jarvan IV | -0.04 | 0.08 | 0.12 |  |
| 94 | Yone | -0.04 | 0.08 | 0.12 |  |
| 95 | Graves | -0.04 | 0.00 | 0.04 |  |
| 96 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 97 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 98 | Varus | -0.06 | 0.00 | 0.06 |  |
| 99 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 100 | Pantheon | -0.08 | 0.56 | 0.64 |  |
| 101 | Hecarim | -0.08 | 0.08 | 0.16 |  |
| 102 | Ornn | -0.08 | 0.08 | 0.16 |  |
| 103 | Volibear | -0.09 | 0.08 | 0.17 |  |
| 104 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 105 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 106 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 107 | Briar | -0.13 | 0.00 | 0.13 |  |
| 108 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 109 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 110 | Viego | -0.15 | 0.08 | 0.23 |  |
| 111 | Garen | -0.16 | 0.31 | 0.47 |  |
| 112 | Rammus | -0.16 | 0.27 | 0.43 |  |
| 113 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 114 | Rell | -0.16 | 0.00 | 0.16 |  |
| 115 | Shyvana | -0.17 | 0.08 | 0.25 |  |
| 116 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 117 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 118 | Akali | -0.18 | 0.00 | 0.18 |  |
| 119 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 120 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 121 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 122 | Riven | -0.18 | 0.00 | 0.18 |  |
| 123 | Talon | -0.18 | 0.00 | 0.18 |  |
| 124 | Illaoi | -0.19 | 0.08 | 0.27 |  |
| 125 | Sett | -0.19 | 0.08 | 0.27 |  |
| 126 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 127 | Aatrox | -0.23 | 0.00 | 0.23 |  |
| 128 | Nautilus | -0.23 | 0.00 | 0.23 |  |
| 129 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 130 | Akshan | -0.25 | 0.00 | 0.25 |  |
| 131 | Diana | -0.25 | 0.00 | 0.25 |  |
| 132 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 133 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 134 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 135 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 136 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 137 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 138 | Leona | -0.27 | 0.00 | 0.27 |  |
| 139 | Locke | -0.27 | 0.00 | 0.27 |  |
| 140 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 145 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 146 | Vi | -0.32 | 0.08 | 0.40 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Shen | -0.36 | 0.27 | 0.63 |  |
| 150 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 151 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 152 | Fiddlesticks | -0.40 | 0.00 | 0.40 |  |
| 153 | Janna | -0.40 | 0.00 | 0.40 |  |
| 154 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 155 | Skarner | -0.44 | 0.06 | 0.50 |  |
| 156 | Zac | -0.46 | 0.00 | 0.46 |  |
| 157 | Darius | -0.47 | 0.00 | 0.47 |  |
| 158 | Katarina | -0.47 | 0.00 | 0.47 |  |
| 159 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 160 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 161 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 162 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 163 | Tahm Kench | -0.49 | 0.00 | 0.49 |  |
| 164 | Taric | -0.50 | 0.00 | 0.50 |  |
| 165 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 166 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 167 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 168 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 169 | Singed | -0.53 | 0.00 | 0.53 |  |
| 170 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 171 | Galio | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -0.78 | 0.12 | 0.90 |  |
