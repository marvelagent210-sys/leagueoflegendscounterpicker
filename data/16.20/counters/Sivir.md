# Counters to Sivir (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Sivir: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sivir wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sivir --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.87 | +1.00 | +1.00 | +1.00 | +0.46 | +1.00 | +0.00 |
| 2 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +1.00 |
| 3 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 4 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 5 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 6 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 7 | Kled | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 8 | Ziggs | +0.82 | +1.00 | +1.00 | +1.00 | +0.27 | – | +0.00 |
| 9 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 10 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 11 | Smolder | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 12 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 13 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 14 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.28 | +1.00 | +1.00 |
| 15 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 16 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 17 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 18 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 19 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 20 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 21 | Miss Fortune | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 22 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 23 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 24 | Twitch | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 25 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 26 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 27 | Varus | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 28 | Kai'Sa | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 29 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 30 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 31 | Jinx | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 32 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 33 | Lucian | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 34 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 35 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 36 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 37 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 38 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 39 | Lissandra | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 40 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 41 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 42 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 43 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 44 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 45 | Quinn | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 46 | Draven | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 47 | Kindred | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 48 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 49 | Zoe | +0.77 | +1.00 | +1.00 | +0.92 | +0.08 | – | +0.00 |
| 50 | Vladimir | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 51 | Morgana | +0.77 | +1.00 | +1.00 | +0.93 | +0.02 | – | +0.00 |
| 52 | Ryze | +0.77 | +0.92 | +0.99 | +1.00 | +0.07 | – | +0.00 |
| 53 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 54 | Dr. Mundo | +0.75 | +0.94 | +0.95 | +0.97 | −0.08 | +0.95 | +0.00 |
| 55 | Fizz | +0.73 | +1.00 | +1.00 | +1.00 | −0.13 | +0.50 | +0.00 |
| 56 | Gragas | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 57 | Vel'Koz | +0.50 | +0.94 | −0.05 | +0.99 | +0.19 | – | +0.00 |
| 58 | K'Sante | +0.43 | −0.04 | +1.00 | +1.00 | −0.04 | −0.04 | +0.00 |
| 59 | Rammus | +0.39 | +1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +0.00 |
| 60 | Sona | +0.35 | +1.00 | +1.00 | −1.00 | +0.09 | – | +0.00 |
| 61 | Janna | +0.35 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 62 | Malphite | +0.33 | +0.05 | +0.04 | +1.00 | +0.03 | +1.00 | +0.00 |
| 63 | Anivia | +0.32 | +0.21 | +0.21 | +1.00 | −0.05 | +0.21 | +0.00 |
| 64 | Senna | +0.29 | +0.50 | +1.00 | −0.41 | +0.12 | −0.20 | +0.00 |
| 65 | Caitlyn | +0.24 | +1.00 | +1.00 | −0.87 | +0.09 | −1.00 | +0.00 |
| 66 | Rumble | +0.23 | +0.08 | +0.04 | +0.74 | −0.03 | +0.58 | +0.00 |
| 67 | Nunu & Willump | +0.14 | +1.00 | −1.00 | +1.00 | +0.29 | −1.00 | +0.00 |
| 68 | Aurora | +0.12 | +0.46 | −0.69 | +0.83 | +0.01 | – | +0.00 |
| 69 | Poppy | +0.12 | −1.00 | +1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 70 | Ahri | +0.06 | −1.00 | +0.94 | +0.33 | +0.01 | – | +0.00 |
| 71 | Karthus | −0.00 | −0.02 | +0.00 | −0.02 | +0.05 | – | +0.00 |
| 72 | Tahm Kench | −0.02 | +0.00 | −0.01 | −0.03 | −0.08 | −0.02 | +0.00 |
| 73 | Yorick | −0.16 | −1.00 | −0.83 | +0.82 | −0.05 | +0.91 | +1.00 |
| 74 | Taric | −0.19 | −0.23 | −0.22 | −0.23 | −0.02 | −0.23 | +0.00 |
| 75 | Vex | −0.19 | −0.83 | −0.66 | +1.00 | +0.02 | – | +0.00 |
| 76 | Yasuo | −0.24 | −1.00 | +0.28 | +0.22 | −0.01 | −1.00 | +0.00 |
| 77 | Ornn | −0.25 | −0.32 | −0.31 | −0.25 | −0.06 | −0.33 | +0.00 |
| 78 | Brand | −0.26 | −0.92 | −0.85 | +1.00 | +0.02 | – | +0.00 |
| 79 | Vi | −0.29 | −1.00 | +1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 80 | Mordekaiser | −0.30 | −0.52 | −0.51 | −0.09 | −0.07 | −0.11 | +0.00 |
| 81 | Ekko | −0.31 | +1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 82 | Heimerdinger | −0.32 | −1.00 | −1.00 | +1.00 | +0.06 | – | +0.00 |
| 83 | Viktor | −0.33 | −1.00 | −1.00 | +1.00 | +0.05 | – | +0.00 |
| 84 | Hwei | −0.33 | −1.00 | −1.00 | +0.98 | +0.05 | – | +0.00 |
| 85 | Xerath | −0.35 | −1.00 | −1.00 | +0.90 | +0.04 | – | +0.00 |
| 86 | Soraka | −0.36 | −1.00 | −1.00 | +0.86 | +0.01 | – | +0.00 |
| 87 | Nocturne | −0.37 | −1.00 | −1.00 | +1.00 | −0.13 | −1.00 | +1.00 |
| 88 | Sion | −0.41 | −1.00 | +0.15 | −0.44 | −0.06 | −1.00 | +0.00 |
| 89 | Akali | −0.56 | −1.00 | −0.52 | −0.66 | −0.04 | −0.42 | +0.00 |
| 90 | Renekton | −0.56 | −1.00 | −0.02 | −1.00 | −0.07 | −1.00 | +0.00 |
| 91 | Irelia | −0.63 | −1.00 | −1.00 | −1.00 | +0.08 | +0.61 | +0.00 |
| 92 | LeBlanc | −0.64 | −1.00 | −0.51 | −1.00 | −0.00 | – | +0.00 |
| 93 | Gangplank | −0.73 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +1.00 |
| 94 | Gwen | −0.74 | −0.80 | −0.80 | −1.00 | −0.23 | −1.00 | +0.00 |
| 95 | Malzahar | −0.74 | −1.00 | −1.00 | −0.85 | +0.01 | – | +0.00 |
| 96 | Lux | −0.75 | −1.00 | −1.00 | −0.92 | +0.04 | – | +0.00 |
| 97 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 98 | Zyra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 99 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 100 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 101 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 102 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 103 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 104 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 105 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 106 | Garen | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 107 | Thresh | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 108 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 109 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 110 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 112 | Wukong | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 113 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 114 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 115 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 116 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 117 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 118 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 119 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 120 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 121 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 122 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 123 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 124 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 125 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 126 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 127 | Volibear | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 128 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 129 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 130 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 131 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 132 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 133 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 134 | Aatrox | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 135 | Riven | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 136 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 137 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 138 | Zaahen | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 139 | Rakan | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 140 | Ambessa | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 141 | Yone | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 142 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 143 | Warwick | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 144 | Hecarim | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sivir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sivir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sivir` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.24)

- **0.66** blind: Blinding Dart's blind makes Sivir's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Sivir basic attacks)
- Watch out: Spell Shield's spell shield blocks Teemo's Blinding Dart.

#### 2. Yunara (net +0.14)

- **0.14** range: Yunara's basic attacks reach 75 units farther than Sivir's (575 vs 500 attack range). Sivir has no dash or blink to close the gap. (Yunara basic attacks → Sivir basic attacks)

#### 3. Samira (net 0.00)

- **0.42** projectile block: Blade Whirl blocks Sivir's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Sivir basic attacks)
- **0.28** projectile block: Blade Whirl blocks Sivir's Boomerang Blade, a projectile. Blade Whirl for 0.75 s; Boomerang Blade takes 1.11 s to land, enough to react. (Samira W Blade Whirl → Sivir Q Boomerang Blade)
- Watch out: Spell Shield's spell shield blocks Samira's Wild Rush.

#### 4. Kai'Sa (net 0.00)

- No interaction in Kai'Sa's favor.

#### 5. Twitch (net 0.00)

- No interaction in Twitch's favor.

#### 6. Kayle (net -0.05)

- **0.22** range: Kayle's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range). Sivir has no dash or blink to close the gap. (Kayle basic attacks → Sivir basic attacks)
- Watch out: Spell Shield's spell shield blocks Kayle's Starfire Spellblade.

#### 7. Mel (net -0.12)

- **0.42** projectile block: Rebuttal blocks Sivir's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Sivir basic attacks)
- **0.26** projectile block: Rebuttal blocks Sivir's Boomerang Blade, a projectile. Rebuttal for 0.75 s; Boomerang Blade takes 1.11 s to land, enough to react. (Mel W Rebuttal → Sivir Q Boomerang Blade)
- Watch out: Spell Shield's spell shield blocks Mel's Golden Eclipse.

#### 8. Miss Fortune (net -0.14)

- No interaction in Miss Fortune's favor.
- Watch out: Spell Shield's spell shield blocks part of Miss Fortune's Double Up.

#### 9. Anivia (net -0.28)

- **0.12** range: Anivia's basic attacks reach 100 units farther than Sivir's (600 vs 500 attack range). Sivir has no dash or blink to close the gap. (Anivia basic attacks → Sivir basic attacks)
- Watch out: Spell Shield's spell shield blocks Anivia's Frostbite.

#### 10. Akshan (net -0.28)

- No interaction in Akshan's favor.
- Watch out: Spell Shield's spell shield blocks part of Akshan's Comeuppance.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.24 | 0.66 | 0.42 | blind (Blinding Dart) |
| 2 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 3 | Samira | 0.00 | 0.56 | 0.56 | projectile block (Blade Whirl) |
| 4 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 5 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 6 | Kayle | -0.05 | 0.22 | 0.27 |  |
| 7 | Mel | -0.12 | 0.55 | 0.67 | projectile block (Rebuttal) |
| 8 | Miss Fortune | -0.14 | 0.00 | 0.14 |  |
| 9 | Anivia | -0.28 | 0.12 | 0.40 |  |
| 10 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 11 | Kog'Maw | -0.28 | 0.00 | 0.28 |  |
| 12 | Zeri | -0.28 | 0.00 | 0.28 |  |
| 13 | Kindred | -0.30 | 0.00 | 0.30 |  |
| 14 | Zoe | -0.30 | 0.00 | 0.30 |  |
| 15 | Soraka | -0.33 | 0.00 | 0.33 |  |
| 16 | Braum | -0.34 | 0.93 | 1.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 17 | Karma | -0.35 | 0.00 | 0.35 |  |
| 18 | LeBlanc | -0.36 | 0.00 | 0.36 |  |
| 19 | Yuumi | -0.37 | 0.00 | 0.37 |  |
| 20 | Yasuo | -0.38 | 0.70 | 1.08 | projectile block (Wind Wall) |
| 21 | Graves | -0.41 | 0.00 | 0.41 |  |
| 22 | Jinx | -0.41 | 0.00 | 0.41 |  |
| 23 | Lucian | -0.41 | 0.00 | 0.41 |  |
| 24 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 25 | Vladimir | -0.41 | 0.00 | 0.41 |  |
| 26 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 27 | Nidalee | -0.50 | 0.00 | 0.50 |  |
| 28 | Swain | -0.50 | 0.00 | 0.50 |  |
| 29 | Milio | -0.51 | 0.00 | 0.51 |  |
| 30 | Vel'Koz | -0.51 | 0.00 | 0.51 |  |
| 31 | Varus | -0.52 | 0.28 | 0.80 |  |
| 32 | Caitlyn | -0.54 | 0.27 | 0.81 |  |
| 33 | Corki | -0.55 | 0.00 | 0.55 |  |
| 34 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 35 | Vayne | -0.56 | 0.00 | 0.56 |  |
| 36 | Lulu | -0.59 | 0.47 | 1.06 | disarm (Whimsy) |
| 37 | Malzahar | -0.61 | 0.00 | 0.61 |  |
| 38 | Ashe | -0.62 | 0.18 | 0.80 |  |
| 39 | Lillia | -0.62 | 0.00 | 0.62 |  |
| 40 | Ezreal | -0.63 | 0.00 | 0.63 |  |
| 41 | Ryze | -0.63 | 0.00 | 0.63 |  |
| 42 | Tristana | -0.64 | 0.36 | 1.00 |  |
| 43 | Brand | -0.65 | 0.00 | 0.65 |  |
| 44 | Morgana | -0.65 | 0.00 | 0.65 |  |
| 45 | Shen | -0.66 | 0.51 | 1.17 | attack block (Spirit's Refuge) |
| 46 | Lissandra | -0.67 | 0.00 | 0.67 |  |
| 47 | Xayah | -0.67 | 0.00 | 0.67 |  |
| 48 | Annie | -0.68 | 0.14 | 0.82 |  |
| 49 | Naafiri | -0.68 | 0.00 | 0.68 |  |
| 50 | Zilean | -0.68 | 0.00 | 0.68 |  |
| 51 | Jayce | -0.69 | 0.00 | 0.69 |  |
| 52 | Smolder | -0.69 | 0.00 | 0.69 |  |
| 53 | Aurora | -0.70 | 0.00 | 0.70 |  |
| 54 | Draven | -0.70 | 0.00 | 0.70 |  |
| 55 | Vex | -0.70 | 0.00 | 0.70 |  |
| 56 | Katarina | -0.71 | 0.18 | 0.89 |  |
| 57 | Senna | -0.71 | 0.16 | 0.87 |  |
| 58 | Aphelios | -0.71 | 0.00 | 0.71 |  |
| 59 | Neeko | -0.71 | 0.00 | 0.71 |  |
| 60 | Nilah | -0.72 | 0.46 | 1.18 | attack dodge (Jubilant Veil) |
| 61 | Fiddlesticks | -0.72 | 0.00 | 0.72 |  |
| 62 | Gwen | -0.72 | 0.00 | 0.72 |  |
| 63 | Kennen | -0.75 | 0.00 | 0.75 |  |
| 64 | Elise | -0.76 | 0.00 | 0.76 |  |
| 65 | Ivern | -0.76 | 0.00 | 0.76 |  |
| 66 | Zed | -0.76 | 0.00 | 0.76 |  |
| 67 | Quinn | -0.77 | 0.00 | 0.77 |  |
| 68 | Jax | -0.78 | 0.53 | 1.31 | attack dodge (Counter Strike) |
| 69 | Viktor | -0.78 | 0.00 | 0.78 |  |
| 70 | Nasus | -0.79 | 0.50 | 1.29 | attack speed slow (Wither) |
| 71 | Fiora | -0.81 | 0.12 | 0.93 |  |
| 72 | Heimerdinger | -0.81 | 0.00 | 0.81 |  |
| 73 | Lux | -0.81 | 0.00 | 0.81 |  |
| 74 | Master Yi | -0.81 | 0.00 | 0.81 |  |
| 75 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 76 | Xerath | -0.82 | 0.00 | 0.82 |  |
| 77 | Taliyah | -0.85 | 0.00 | 0.85 |  |
| 78 | Rammus | -0.86 | 0.50 | 1.36 | attack reflect (Defensive Ball Curl) |
| 79 | Syndra | -0.86 | 0.00 | 0.86 |  |
| 80 | Bard | -0.87 | 0.00 | 0.87 |  |
| 81 | Illaoi | -0.87 | 0.00 | 0.87 |  |
| 82 | Jhin | -0.87 | 0.00 | 0.87 |  |
| 83 | Hwei | -0.88 | 0.00 | 0.88 |  |
| 84 | Veigar | -0.89 | 0.00 | 0.89 |  |
| 85 | Locke | -0.90 | 0.00 | 0.90 |  |
| 86 | Aatrox | -0.92 | 0.00 | 0.92 |  |
| 87 | Cassiopeia | -0.92 | 0.00 | 0.92 |  |
| 88 | Dr. Mundo | -0.94 | 0.00 | 0.94 |  |
| 89 | Jarvan IV | -0.94 | 0.00 | 0.94 |  |
| 90 | Renekton | -0.94 | 0.00 | 0.94 |  |
| 91 | Rumble | -0.94 | 0.00 | 0.94 |  |
| 92 | Fizz | -0.95 | 0.00 | 0.95 |  |
| 93 | Kalista | -0.95 | 0.00 | 0.95 |  |
| 94 | Kha'Zix | -0.95 | 0.00 | 0.95 |  |
| 95 | Sona | -0.95 | 0.00 | 0.95 |  |
| 96 | Orianna | -0.96 | 0.00 | 0.96 |  |
| 97 | Ziggs | -0.96 | 0.00 | 0.96 |  |
| 98 | Bel'Veth | -0.97 | 0.00 | 0.97 |  |
| 99 | Renata Glasc | -0.97 | 0.00 | 0.97 |  |
| 100 | Zyra | -0.98 | 0.09 | 1.07 |  |
| 101 | Ahri | -0.98 | 0.00 | 0.98 |  |
| 102 | Yone | -0.98 | 0.00 | 0.98 |  |
| 103 | Kayn | -0.99 | 0.00 | 0.99 |  |
| 104 | Thresh | -1.00 | 0.00 | 1.00 |  |
| 105 | Gnar | -1.02 | 0.00 | 1.02 |  |
| 106 | Wukong | -1.05 | 0.00 | 1.05 |  |
| 107 | Seraphine | -1.07 | 0.00 | 1.07 |  |
| 108 | Udyr | -1.07 | 0.00 | 1.07 |  |
| 109 | Azir | -1.08 | 0.00 | 1.08 |  |
| 110 | Kassadin | -1.09 | 0.00 | 1.09 |  |
| 111 | Shaco | -1.09 | 0.00 | 1.09 |  |
| 112 | Talon | -1.10 | 0.00 | 1.10 |  |
| 113 | Lee Sin | -1.11 | 0.00 | 1.11 |  |
| 114 | Zaahen | -1.11 | 0.00 | 1.11 |  |
| 115 | Nami | -1.12 | 0.00 | 1.12 |  |
| 116 | Urgot | -1.13 | 0.00 | 1.13 |  |
| 117 | Singed | -1.14 | 0.27 | 1.41 |  |
| 118 | Aurelion Sol | -1.14 | 0.00 | 1.14 |  |
| 119 | Janna | -1.17 | 0.00 | 1.17 |  |
| 120 | Shyvana | -1.17 | 0.00 | 1.17 |  |
| 121 | Sylas | -1.17 | 0.00 | 1.17 |  |
| 122 | Irelia | -1.20 | 0.00 | 1.20 |  |
| 123 | Akali | -1.21 | 0.00 | 1.21 |  |
| 124 | Malphite | -1.22 | 0.33 | 1.55 |  |
| 125 | Olaf | -1.22 | 0.00 | 1.22 |  |
| 126 | Ornn | -1.22 | 0.00 | 1.22 |  |
| 127 | Warwick | -1.22 | 0.00 | 1.22 |  |
| 128 | Mordekaiser | -1.30 | 0.12 | 1.42 |  |
| 129 | Ambessa | -1.31 | 0.00 | 1.31 |  |
| 130 | Diana | -1.33 | 0.00 | 1.33 |  |
| 131 | Rakan | -1.34 | 0.00 | 1.34 |  |
| 132 | Nautilus | -1.36 | 0.00 | 1.36 |  |
| 133 | Zac | -1.37 | 0.00 | 1.37 |  |
| 134 | Alistar | -1.38 | 0.00 | 1.38 |  |
| 135 | Kled | -1.38 | 0.00 | 1.38 |  |
| 136 | Rek'Sai | -1.41 | 0.00 | 1.41 |  |
| 137 | Tahm Kench | -1.41 | 0.00 | 1.41 |  |
| 138 | Trundle | -1.43 | 0.00 | 1.43 |  |
| 139 | Garen | -1.44 | 0.00 | 1.44 |  |
| 140 | Taric | -1.44 | 0.00 | 1.44 |  |
| 141 | Pantheon | -1.45 | 0.00 | 1.45 |  |
| 142 | Rengar | -1.45 | 0.00 | 1.45 |  |
| 143 | Riven | -1.46 | 0.00 | 1.46 |  |
| 144 | Amumu | -1.47 | 0.00 | 1.47 |  |
| 145 | Qiyana | -1.47 | 0.00 | 1.47 |  |
| 146 | Nocturne | -1.51 | 0.00 | 1.51 |  |
| 147 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 148 | Viego | -1.53 | 0.00 | 1.53 |  |
| 149 | Ekko | -1.56 | 0.00 | 1.56 |  |
| 150 | Poppy | -1.57 | 0.00 | 1.57 |  |
| 151 | Xin Zhao | -1.57 | 0.00 | 1.57 |  |
| 152 | Rell | -1.58 | 0.00 | 1.58 |  |
| 153 | Camille | -1.60 | 0.00 | 1.60 |  |
| 154 | Galio | -1.60 | 0.00 | 1.60 |  |
| 155 | Evelynn | -1.61 | 0.00 | 1.61 |  |
| 156 | Briar | -1.62 | 0.00 | 1.62 |  |
| 157 | Gangplank | -1.62 | 0.00 | 1.62 |  |
| 158 | Volibear | -1.62 | 0.00 | 1.62 |  |
| 159 | Hecarim | -1.65 | 0.00 | 1.65 |  |
| 160 | Vi | -1.65 | 0.00 | 1.65 |  |
| 161 | Leona | -1.67 | 0.00 | 1.67 |  |
| 162 | K'Sante | -1.69 | 0.00 | 1.69 |  |
| 163 | Pyke | -1.69 | 0.00 | 1.69 |  |
| 164 | Sett | -1.73 | 0.00 | 1.73 |  |
| 165 | Gragas | -1.74 | 0.00 | 1.74 |  |
| 166 | Maokai | -1.74 | 0.00 | 1.74 |  |
| 167 | Cho'Gath | -1.78 | 0.00 | 1.78 |  |
| 168 | Darius | -1.80 | 0.00 | 1.80 |  |
| 169 | Sion | -1.82 | 0.00 | 1.82 |  |
| 170 | Skarner | -1.91 | 0.00 | 1.91 |  |
| 171 | Blitzcrank | -1.97 | 0.00 | 1.97 |  |
| 172 | Nunu & Willump | -1.99 | 0.00 | 1.99 |  |
