# Counters to Diana (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Diana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Diana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Diana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +1.00 |
| 2 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +1.00 |
| 3 | Master Yi | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 4 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | – | +1.00 |
| 5 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.14 | – | +1.00 |
| 6 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 7 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 8 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 9 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 10 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 11 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 12 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 13 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 14 | Neeko | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 15 | Gnar | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 16 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 17 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 18 | Sivir | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 19 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 20 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 21 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 22 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 23 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 24 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 25 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 26 | Aurora | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 27 | Maokai | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 28 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 29 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 30 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 31 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 32 | Udyr | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 33 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 34 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 35 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 36 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 37 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 38 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 39 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 40 | Olaf | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 41 | Illaoi | +0.74 | +1.00 | +0.94 | +1.00 | −0.14 | – | +0.00 |
| 42 | Karma | +0.67 | +0.64 | +0.94 | +0.94 | −0.10 | +0.95 | +0.00 |
| 43 | Lulu | +0.59 | +1.00 | +1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 44 | Rammus | +0.30 | +1.00 | +1.00 | −1.00 | −0.19 | – | +0.00 |
| 45 | Taric | +0.26 | +0.35 | +0.35 | +0.32 | −0.02 | – | +0.00 |
| 46 | Garen | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 47 | Morgana | +0.14 | +0.25 | +0.01 | +0.00 | −0.11 | +0.96 | +0.00 |
| 48 | Jinx | +0.13 | −0.24 | +0.43 | +0.43 | −0.11 | +0.15 | +0.00 |
| 49 | Soraka | +0.05 | −0.08 | +0.15 | +0.15 | −0.03 | +0.06 | +0.00 |
| 50 | Tahm Kench | +0.04 | +0.08 | +0.07 | +0.07 | −0.09 | – | +0.00 |
| 51 | Singed | +0.03 | +0.06 | +0.06 | +0.07 | −0.09 | – | +0.00 |
| 52 | Yone | +0.01 | +1.00 | −0.51 | −0.51 | −0.09 | – | +0.00 |
| 53 | Sion | −0.02 | +0.00 | +0.00 | +0.00 | −0.13 | – | +0.00 |
| 54 | Hwei | −0.03 | −0.14 | +0.05 | +0.05 | −0.09 | −0.06 | +0.00 |
| 55 | Heimerdinger | −0.04 | −0.11 | −0.01 | +0.02 | −0.07 | −0.07 | +0.00 |
| 56 | Swain | −0.08 | −0.09 | −0.09 | −0.09 | −0.05 | −0.09 | +0.00 |
| 57 | Vel'Koz | −0.14 | −0.11 | −0.16 | −0.15 | −0.10 | −0.24 | +0.00 |
| 58 | Anivia | −0.14 | −0.28 | −0.08 | −0.08 | −0.15 | −0.11 | +0.00 |
| 59 | Nami | −0.15 | −0.27 | −0.08 | −0.13 | −0.08 | −0.23 | +0.00 |
| 60 | Viktor | −0.16 | −0.09 | −0.04 | −0.04 | −0.15 | −1.00 | +0.00 |
| 61 | Zyra | −0.21 | −0.20 | −0.30 | −0.29 | −0.12 | −0.13 | +0.00 |
| 62 | Cho'Gath | −0.24 | +1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 63 | Vi | −0.24 | +1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 64 | Lux | −0.26 | +0.03 | −0.51 | −0.51 | −0.13 | −0.21 | +0.00 |
| 65 | Malphite | −0.27 | −0.08 | −0.09 | −1.00 | +0.00 | – | +0.00 |
| 66 | Ezreal | −0.27 | −1.00 | −0.20 | −0.20 | −0.15 | +0.89 | +0.00 |
| 67 | Graves | −0.29 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 68 | Senna | −0.33 | −0.01 | −1.00 | −0.20 | −0.12 | −0.17 | +0.00 |
| 69 | Rakan | −0.35 | −1.00 | +0.00 | −1.00 | −0.03 | +1.00 | +0.00 |
| 70 | Annie | −0.36 | −0.05 | −0.57 | −1.00 | −0.04 | −0.03 | +0.00 |
| 71 | Syndra | −0.50 | −0.09 | −1.00 | −1.00 | −0.08 | −0.16 | +0.00 |
| 72 | Smolder | −0.51 | −1.00 | −1.00 | +0.00 | −0.10 | +0.00 | +0.00 |
| 73 | Shen | −0.52 | −0.48 | −1.00 | −0.49 | +0.03 | – | +0.00 |
| 74 | Jayce | −0.55 | −1.00 | −1.00 | +0.00 | +0.03 | – | +0.00 |
| 75 | Brand | −0.59 | −0.11 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 76 | Lucian | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 77 | Varus | −0.71 | −1.00 | −1.00 | −1.00 | −0.07 | +0.00 | +0.00 |
| 78 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.00 |
| 79 | Karthus | −0.73 | −0.64 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 80 | Vex | −0.73 | −1.00 | −1.00 | −0.59 | −0.09 | −1.00 | +0.00 |
| 81 | Lissandra | −0.74 | −1.00 | −1.00 | −1.00 | −0.09 | −0.26 | +0.00 |
| 82 | Veigar | −0.75 | −1.00 | −1.00 | −1.00 | −0.11 | −0.29 | +0.00 |
| 83 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 84 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 85 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 86 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 87 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 88 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 89 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 90 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 91 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | −0.12 | −0.64 | +0.00 |
| 92 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 93 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 94 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 95 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 96 | Braum | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 97 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 98 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 99 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 100 | Camille | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 101 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 102 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 103 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 104 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 105 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 106 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 107 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 108 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 109 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 110 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 111 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 112 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 113 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 114 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 115 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 116 | Nocturne | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 117 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 118 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 119 | Jhin | −0.81 | −0.94 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 120 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 121 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 122 | Zoe | −0.81 | −1.00 | −0.98 | −1.00 | −0.10 | −1.00 | +0.00 |
| 123 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 124 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 125 | Ziggs | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 126 | Akshan | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 127 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 128 | Janna | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 129 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 130 | Orianna | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 131 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 132 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 133 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 134 | Tristana | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 135 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 136 | Kennen | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 137 | Draven | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 138 | Xerath | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 139 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 140 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 141 | Miss Fortune | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 142 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 143 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 144 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Diana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Diana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Diana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.33)

- **0.69** spell shield: Spell Shield's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Diana E Lunar Rush)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Sivir basic attacks → Diana basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Sivir E Spell Shield → Diana R Moonfall)

#### 2. Bard (net +1.24)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Bard R Tempered Fate → Diana R Moonfall)
- **0.34** range: Bard's basic attacks reach 350 units farther than Diana's (500 vs 150 attack range). Diana closes the gap with Lunar Rush. (Bard basic attacks → Diana basic attacks)
- **0.20** untargetable: Tempered Fate can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Bard R Tempered Fate → Diana E Lunar Rush)

#### 3. Lissandra (net +1.17)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Diana's Moonfall. Untargetable for 2.5 s, long enough to use ahead of Moonfall. (Lissandra R Frozen Tomb → Diana R Moonfall)
- **0.22** range: Lissandra's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Lissandra basic attacks → Diana basic attacks)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Diana's Lunar Rush mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Diana E Lunar Rush)

#### 4. Xayah (net +1.15)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Diana's Moonfall. Untargetable for 1.5 s, long enough to use ahead of Moonfall. (Xayah R Featherstorm → Diana R Moonfall)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Diana's (525 vs 150 attack range). Diana closes the gap with Lunar Rush. (Xayah basic attacks → Diana basic attacks)
- **0.19** untargetable: Featherstorm can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Xayah R Featherstorm → Diana E Lunar Rush)

#### 5. Fiora (net +1.14)

- **0.90** parry: Riposte parries Diana's Moonfall and stuns back. Parry for 0.75 s; Moonfall takes 0.25 s to land, enough to react. Negating Moonfall's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Diana R Moonfall)
- **0.44** parry: Riposte parries Diana's Lunar Rush. Parry for 0.75 s; Lunar Rush lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Diana E Lunar Rush)
- **0.06** attack speed slow: Riposte cuts Diana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Diana basic attacks)

#### 6. Vladimir (net +1.10)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Diana's Moonfall. Untargetable for 2 s, long enough to use ahead of Moonfall. (Vladimir W Sanguine Pool → Diana R Moonfall)
- **0.37** untargetable: Sanguine Pool can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Vladimir W Sanguine Pool → Diana E Lunar Rush)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Diana's (450 vs 150 attack range). Diana closes the gap with Lunar Rush. (Vladimir basic attacks → Diana basic attacks)
- Watch out: Moonfall's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Nocturne (net +1.08)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Diana's Lunar Rush. Spell shield for 1.5 s, long enough to use ahead of Lunar Rush. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Diana E Lunar Rush)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Diana's Moonfall. Spell shield for 1.5 s, long enough to use ahead of Moonfall. A spell shield blocks only the first enemy ability that reaches it. The beam of moonlight does not crash down if champions hit blocked the initial effect with spell shield.
  - Enemy champions protected by spell shield do not count towards the damage increase. (Nocturne W Shroud of Darkness → Diana R Moonfall)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Diana's Moonfall (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Diana R Moonfall)

#### 8. Aurora (net +1.07)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Diana's Moonfall. Untargetable for 0.4 s; Moonfall takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Diana R Moonfall)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Diana's (550 vs 150 attack range). Diana closes the gap with Lunar Rush. (Aurora basic attacks → Diana basic attacks)
- **0.12** untargetable: Between Worlds can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Does not destroy inbound projectiles. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Aurora R Between Worlds → Diana E Lunar Rush)

#### 9. Master Yi (net +0.99)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Diana's Moonfall. Untargetable for ?; Moonfall takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Diana R Moonfall)
- **0.21** untargetable: Alpha Strike can deny the initial targeting of Diana's Lunar Rush, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. Lunar Rush will still deal damage even if the target is untargetable by the end of the dash. (Master Yi Q Alpha Strike → Diana E Lunar Rush)
- **0.15** cleanse: Highlander cleanses Diana's Moonfall (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Diana R Moonfall)
- Watch out: Moonfall's airborne interrupts Master Yi's Meditate (normal channel).

#### 10. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Diana's Moonfall (airborne, slow). Immune for 5 s, long enough to use ahead of Moonfall. (Morgana E Black Shield → Diana R Moonfall)
- **0.18** range: Morgana's basic attacks reach 300 units farther than Diana's (450 vs 150 attack range). Diana closes the gap with Lunar Rush. (Morgana basic attacks → Diana basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.33 | 1.33 | 0.00 |  |
| 2 | Bard | +1.24 | 1.24 | 0.00 |  |
| 3 | Lissandra | +1.17 | 1.17 | 0.00 |  |
| 4 | Xayah | +1.15 | 1.15 | 0.00 |  |
| 5 | Fiora | +1.14 | 1.14 | 0.00 |  |
| 6 | Vladimir | +1.10 | 1.15 | 0.05 |  |
| 7 | Nocturne | +1.08 | 1.08 | 0.00 |  |
| 8 | Aurora | +1.07 | 1.07 | 0.00 |  |
| 9 | Master Yi | +0.99 | 1.10 | 0.11 |  |
| 10 | Morgana | +0.98 | 0.98 | 0.00 |  |
| 11 | Kayle | +0.96 | 0.96 | 0.00 |  |
| 12 | Fizz | +0.92 | 0.92 | 0.00 |  |
| 13 | Maokai | +0.92 | 0.92 | 0.00 |  |
| 14 | Rek'Sai | +0.92 | 0.92 | 0.00 |  |
| 15 | Gwen | +0.91 | 0.91 | 0.00 |  |
| 16 | Evelynn | +0.86 | 0.86 | 0.00 |  |
| 17 | Shaco | +0.86 | 0.86 | 0.00 |  |
| 18 | Yuumi | +0.84 | 1.22 | 0.38 |  |
| 19 | Camille | +0.83 | 0.83 | 0.00 |  |
| 20 | Kalista | +0.81 | 0.81 | 0.00 |  |
| 21 | Olaf | +0.80 | 0.80 | 0.00 |  |
| 22 | Udyr | +0.80 | 0.80 | 0.00 |  |
| 23 | Zaahen | +0.80 | 0.80 | 0.00 |  |
| 24 | Kled | +0.77 | 0.77 | 0.00 |  |
| 25 | Zed | +0.76 | 0.76 | 0.00 |  |
| 26 | Sion | +0.72 | 0.80 | 0.08 |  |
| 27 | Vex | +0.72 | 0.72 | 0.00 |  |
| 28 | Viktor | +0.70 | 0.70 | 0.00 | dash stop (Gravity Field) |
| 29 | Jinx | +0.67 | 0.67 | 0.00 | dash stop (Flame Chompers!) |
| 30 | Teemo | +0.67 | 0.67 | 0.00 |  |
| 31 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 32 | Braum | +0.64 | 0.64 | 0.00 | projectile block (Unbreakable) |
| 33 | Gangplank | +0.64 | 0.64 | 0.00 |  |
| 34 | Rengar | +0.64 | 0.64 | 0.00 |  |
| 35 | Veigar | +0.64 | 0.64 | 0.00 | dash stop (Event Horizon) |
| 36 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 37 | Ahri | +0.62 | 0.62 | 0.00 | dash stop (Charm) |
| 38 | Samira | +0.62 | 0.62 | 0.00 |  |
| 39 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 40 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 41 | Mel | +0.59 | 0.59 | 0.00 |  |
| 42 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 43 | Milio | +0.51 | 0.51 | 0.00 |  |
| 44 | Aphelios | +0.46 | 0.46 | 0.00 |  |
| 45 | Yasuo | +0.46 | 0.46 | 0.00 |  |
| 46 | Warwick | +0.44 | 0.99 | 0.55 |  |
| 47 | Kindred | +0.44 | 0.44 | 0.00 |  |
| 48 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 49 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 50 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 51 | Pantheon | +0.41 | 0.89 | 0.48 |  |
| 52 | Kayn | +0.41 | 0.86 | 0.45 |  |
| 53 | Sona | +0.41 | 0.41 | 0.00 |  |
| 54 | Malzahar | +0.39 | 0.79 | 0.40 |  |
| 55 | Singed | +0.39 | 0.39 | 0.00 |  |
| 56 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 57 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 58 | Draven | +0.36 | 0.36 | 0.00 |  |
| 59 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 60 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 61 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 62 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 63 | Corki | +0.32 | 0.32 | 0.00 |  |
| 64 | Elise | +0.32 | 0.32 | 0.00 |  |
| 65 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 66 | Senna | +0.32 | 0.32 | 0.00 |  |
| 67 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 68 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 69 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 70 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 71 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 72 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 73 | Lux | +0.29 | 0.29 | 0.00 |  |
| 74 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 75 | Jax | +0.28 | 0.28 | 0.00 |  |
| 76 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 77 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 78 | Yone | +0.28 | 0.28 | 0.00 |  |
| 79 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 80 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 81 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 82 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 83 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 84 | Azir | +0.25 | 0.25 | 0.00 |  |
| 85 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 86 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 87 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 88 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 89 | Quinn | +0.22 | 0.36 | 0.14 |  |
| 90 | Annie | +0.22 | 0.22 | 0.00 |  |
| 91 | Brand | +0.22 | 0.22 | 0.00 |  |
| 92 | Graves | +0.22 | 0.22 | 0.00 |  |
| 93 | Nami | +0.22 | 0.22 | 0.00 |  |
| 94 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 95 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 96 | Varus | +0.21 | 0.27 | 0.06 |  |
| 97 | Garen | +0.21 | 0.21 | 0.00 |  |
| 98 | Karma | +0.21 | 0.21 | 0.00 |  |
| 99 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 100 | Swain | +0.20 | 0.20 | 0.00 |  |
| 101 | Amumu | +0.19 | 0.19 | 0.00 |  |
| 102 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 103 | Zac | +0.17 | 0.40 | 0.23 | dash stop (Stretching Strikes) |
| 104 | Aurelion Sol | +0.16 | 0.22 | 0.06 |  |
| 105 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 106 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 107 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 108 | Ivern | +0.11 | 0.18 | 0.07 |  |
| 109 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 110 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 111 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 112 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 113 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 114 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 115 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 116 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 117 | Sett | +0.08 | 0.08 | 0.00 |  |
| 118 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 119 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 120 | Akshan | +0.07 | 0.32 | 0.25 |  |
| 121 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 122 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 123 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 124 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 125 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 126 | Akali | 0.00 | 0.00 | 0.00 |  |
| 127 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 128 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 129 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 130 | Briar | 0.00 | 0.00 | 0.00 |  |
| 131 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 132 | Darius | 0.00 | 0.00 | 0.00 |  |
| 133 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 134 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 135 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 136 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 137 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 138 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 139 | Leona | 0.00 | 0.00 | 0.00 |  |
| 140 | Locke | 0.00 | 0.00 | 0.00 |  |
| 141 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 142 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 143 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 144 | Rell | 0.00 | 0.00 | 0.00 |  |
| 145 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 146 | Riven | 0.00 | 0.00 | 0.00 |  |
| 147 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 148 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 149 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Taric | 0.00 | 0.00 | 0.00 |  |
| 152 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 153 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 154 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 155 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 156 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 157 | Janna | -0.04 | 0.36 | 0.40 |  |
| 158 | Viego | -0.04 | 0.08 | 0.12 |  |
| 159 | Xerath | -0.06 | 0.25 | 0.31 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 162 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 163 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 164 | Nunu & Willump | -0.12 | 0.25 | 0.37 |  |
| 165 | Vi | -0.14 | 0.08 | 0.22 |  |
| 166 | Shen | -0.18 | 0.27 | 0.45 |  |
| 167 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 168 | Fiddlesticks | -0.22 | 0.18 | 0.40 |  |
| 169 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 170 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Galio | -0.55 | 0.00 | 0.55 |  |
