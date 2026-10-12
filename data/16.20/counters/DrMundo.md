# Counters to Dr. Mundo (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Dr. Mundo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Dr. Mundo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> DrMundo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 2 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 3 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 4 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 5 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 6 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 7 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 8 | Udyr | +0.61 | +1.00 | +0.36 | +1.00 | +0.07 | – | +0.00 |
| 9 | Aurora | −0.09 | −0.16 | −0.06 | −0.19 | +0.10 | −0.15 | +0.00 |
| 10 | Mordekaiser | −0.10 | −0.14 | −0.14 | −0.14 | +0.04 | – | +0.00 |
| 11 | Poppy | −0.16 | −0.25 | −0.21 | −0.25 | +0.15 | – | +0.00 |
| 12 | Gnar | −0.17 | −0.25 | −0.24 | −0.19 | +0.10 | −0.20 | +0.00 |
| 13 | Rumble | −0.17 | −0.25 | −0.21 | −0.26 | +0.07 | – | +0.00 |
| 14 | Nasus | −0.21 | −0.27 | −0.27 | −0.25 | −0.02 | – | +0.00 |
| 15 | Shen | −0.22 | −0.37 | −0.31 | −0.23 | +0.13 | – | +0.00 |
| 16 | Tahm Kench | −0.22 | −0.30 | −0.31 | −0.25 | +0.03 | – | +0.00 |
| 17 | Olaf | −0.22 | −0.15 | +0.17 | −1.00 | −0.00 | – | +0.00 |
| 18 | Ornn | −0.28 | −0.39 | −0.36 | −0.39 | +0.12 | – | +0.00 |
| 19 | Volibear | −0.28 | −0.28 | −0.65 | −0.08 | −0.04 | – | +0.00 |
| 20 | Singed | −0.29 | −0.35 | −0.34 | −0.40 | −0.03 | – | +0.00 |
| 21 | Sion | −0.32 | −0.45 | −0.44 | −0.38 | +0.08 | – | +0.00 |
| 22 | Kled | −0.38 | −0.70 | −0.61 | −0.23 | +0.21 | – | +0.00 |
| 23 | Urgot | −0.40 | −0.46 | −0.45 | −0.38 | +0.04 | −1.00 | +0.00 |
| 24 | Skarner | −0.47 | −0.44 | −0.44 | −1.00 | −0.02 | – | +0.00 |
| 25 | Cho'Gath | −0.70 | −0.72 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 26 | Malphite | −0.72 | −0.93 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 27 | Heimerdinger | −0.74 | −0.86 | −0.99 | −1.00 | +0.13 | −0.99 | +0.00 |
| 28 | Teemo | −0.74 | −0.96 | −0.99 | −0.99 | +0.18 | −0.82 | +0.00 |
| 29 | Yone | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 30 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 31 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 32 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 33 | Renekton | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 34 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 35 | Kayle | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.00 |
| 36 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 37 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 38 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 39 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 40 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 41 | Trundle | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 42 | Illaoi | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 43 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 44 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 45 | Jax | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 46 | Quinn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 47 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 48 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Dr. Mundo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Dr. Mundo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> DrMundo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +1.26)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Teemo basic attacks → Dr. Mundo basic attacks)
- **0.43** blind: Blinding Dart's blind makes Dr. Mundo's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Dr. Mundo basic attacks)
- **0.30** blind: Blinding Dart's blind makes Dr. Mundo's Blunt Force Trauma, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Dr. Mundo E Blunt Force Trauma)

#### 2. Lulu (net +1.02)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Lulu basic attacks → Dr. Mundo basic attacks)
- **0.30** disarm: Whimsy disarms Dr. Mundo for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Dr. Mundo basic attacks)

#### 3. Kindred (net +0.94)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Kindred basic attacks → Dr. Mundo basic attacks)

#### 4. Sivir (net +0.94)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Sivir basic attacks → Dr. Mundo basic attacks)

#### 5. Samira (net +0.89)

- **0.61** range: Samira's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Samira basic attacks → Dr. Mundo basic attacks)
- **0.28** projectile block: Blade Whirl blocks Dr. Mundo's Infected Bonesaw, a projectile. Blade Whirl for 0.75 s; Infected Bonesaw takes 0.78 s to land, enough to react. (Samira W Blade Whirl → Dr. Mundo Q Infected Bonesaw)

#### 6. Zeri (net +0.88)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Zeri basic attacks → Dr. Mundo basic attacks)

#### 7. Varus (net +0.87)

- **0.53** range: Varus's basic attacks reach 450 units farther than Dr. Mundo's (575 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Varus basic attacks → Dr. Mundo basic attacks)
- **0.22** anti-heal: Hail of Arrows's Grievous Wounds cuts Dr. Mundo's healing from Infected Bonesaw by 40%. (Varus E Hail of Arrows → Dr. Mundo Q Infected Bonesaw)
- **0.18** anti-heal: Hail of Arrows's Grievous Wounds cuts Dr. Mundo's healing from Heart Zapper by 40%. (Varus E Hail of Arrows → Dr. Mundo W Heart Zapper)

#### 8. Twisted Fate (net +0.86)

- **0.86** range: Twisted Fate's basic attacks reach 400 units farther than Dr. Mundo's (525 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Twisted Fate basic attacks → Dr. Mundo basic attacks)

#### 9. Twitch (net +0.86)

- **0.86** range: Twitch's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Twitch basic attacks → Dr. Mundo basic attacks)

#### 10. Vayne (net +0.86)

- **0.86** range: Vayne's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Vayne basic attacks → Dr. Mundo basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +1.26 | 1.26 | 0.00 | range (attacks), blind (Blinding Dart) |
| 2 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 3 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 4 | Sivir | +0.94 | 0.94 | 0.00 | range (attacks) |
| 5 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 6 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 7 | Varus | +0.87 | 0.87 | 0.00 | range (attacks) |
| 8 | Twisted Fate | +0.86 | 0.86 | 0.00 | range (attacks) |
| 9 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 10 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 11 | Milio | +0.84 | 0.84 | 0.00 | range (attacks) |
| 12 | Aphelios | +0.83 | 0.83 | 0.00 | range (attacks) |
| 13 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 14 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 15 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 16 | Quinn | +0.77 | 0.77 | 0.00 | range (attacks) |
| 17 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 18 | Xayah | +0.77 | 0.77 | 0.00 | range (attacks) |
| 19 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 20 | Bard | +0.72 | 0.72 | 0.00 | range (attacks) |
| 21 | Caitlyn | +0.72 | 0.72 | 0.00 | range (attacks) |
| 22 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Janna | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Kayle | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 28 | Kalista | +0.70 | 0.70 | 0.00 | range (attacks) |
| 29 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 30 | Nilah | +0.68 | 0.68 | 0.00 |  |
| 31 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 32 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 33 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 34 | Miss Fortune | +0.65 | 0.65 | 0.00 | range (attacks) |
| 35 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 36 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 37 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 38 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Yuumi | +0.64 | 0.64 | 0.00 | range (attacks) |
| 41 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 42 | Corki | +0.60 | 0.60 | 0.00 | range (attacks) |
| 43 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 44 | Aurora | +0.58 | 0.58 | 0.00 | range (attacks) |
| 45 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 46 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 47 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 48 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 50 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 51 | Jax | +0.53 | 0.53 | 0.00 |  |
| 52 | Jhin | +0.53 | 0.53 | 0.00 | range (attacks) |
| 53 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 54 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 55 | Taliyah | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Vel'Koz | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Xerath | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 60 | Shen | +0.51 | 0.51 | 0.00 |  |
| 61 | Singed | +0.51 | 0.51 | 0.00 |  |
| 62 | Graves | +0.49 | 0.49 | 0.00 |  |
| 63 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 64 | Malzahar | +0.48 | 0.48 | 0.00 |  |
| 65 | Ryze | +0.48 | 0.48 | 0.00 |  |
| 66 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 67 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 68 | Morgana | +0.47 | 0.47 | 0.00 |  |
| 69 | Heimerdinger | +0.46 | 0.46 | 0.00 |  |
| 70 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 71 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 72 | Annie | +0.44 | 0.44 | 0.00 |  |
| 73 | Aurelion Sol | +0.44 | 0.44 | 0.00 |  |
| 74 | Brand | +0.44 | 0.44 | 0.00 |  |
| 75 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 76 | Karma | +0.44 | 0.44 | 0.00 |  |
| 77 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 78 | Lissandra | +0.44 | 0.44 | 0.00 |  |
| 79 | Nami | +0.44 | 0.44 | 0.00 |  |
| 80 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 81 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 82 | Swain | +0.42 | 0.42 | 0.00 |  |
| 83 | Braum | +0.39 | 0.39 | 0.00 |  |
| 84 | Fiddlesticks | +0.39 | 0.39 | 0.00 |  |
| 85 | Karthus | +0.39 | 0.39 | 0.00 |  |
| 86 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 87 | Ivern | +0.38 | 0.38 | 0.00 |  |
| 88 | Vladimir | +0.36 | 0.36 | 0.00 |  |
| 89 | Katarina | +0.34 | 0.34 | 0.00 |  |
| 90 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 91 | Kled | +0.32 | 0.32 | 0.00 |  |
| 92 | Rammus | +0.32 | 0.32 | 0.00 |  |
| 93 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 94 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 95 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 96 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 97 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 98 | Viego | +0.19 | 0.19 | 0.00 |  |
| 99 | Nunu & Willump | +0.14 | 0.14 | 0.00 |  |
| 100 | Garen | +0.12 | 0.12 | 0.00 |  |
| 101 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 102 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 103 | Master Yi | +0.09 | 0.09 | 0.00 |  |
| 104 | Fiora | +0.08 | 0.08 | 0.00 |  |
| 105 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 106 | Rengar | +0.07 | 0.07 | 0.00 |  |
| 107 | Skarner | +0.07 | 0.07 | 0.00 |  |
| 108 | Gangplank | +0.06 | 0.06 | 0.00 |  |
| 109 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 110 | Sion | +0.06 | 0.06 | 0.00 |  |
| 111 | Warwick | +0.06 | 0.06 | 0.00 |  |
| 112 | Zaahen | +0.06 | 0.06 | 0.00 |  |
| 113 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 114 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 115 | Akali | 0.00 | 0.00 | 0.00 |  |
| 116 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 117 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 118 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Briar | 0.00 | 0.00 | 0.00 |  |
| 121 | Camille | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 126 | Evelynn | 0.00 | 0.00 | 0.00 |  |
| 127 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 128 | Galio | 0.00 | 0.00 | 0.00 |  |
| 129 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 130 | Gwen | 0.00 | 0.00 | 0.00 |  |
| 131 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 132 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 133 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 134 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 135 | Kayn | 0.00 | 0.00 | 0.00 |  |
| 136 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 137 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 138 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 139 | Leona | 0.00 | 0.00 | 0.00 |  |
| 140 | Locke | 0.00 | 0.00 | 0.00 |  |
| 141 | Maokai | 0.00 | 0.00 | 0.00 |  |
| 142 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 143 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 144 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 145 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 146 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 147 | Pantheon | 0.00 | 0.00 | 0.00 |  |
| 148 | Poppy | 0.00 | 0.00 | 0.00 |  |
| 149 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 150 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 151 | Rek'Sai | 0.00 | 0.00 | 0.00 |  |
| 152 | Rell | 0.00 | 0.00 | 0.00 |  |
| 153 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 154 | Riven | 0.00 | 0.00 | 0.00 |  |
| 155 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 156 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 157 | Sett | 0.00 | 0.00 | 0.00 |  |
| 158 | Shaco | 0.00 | 0.00 | 0.00 |  |
| 159 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 160 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 161 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 162 | Talon | 0.00 | 0.00 | 0.00 |  |
| 163 | Taric | 0.00 | 0.00 | 0.00 |  |
| 164 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 165 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 166 | Vi | 0.00 | 0.00 | 0.00 |  |
| 167 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 168 | Xin Zhao | 0.00 | 0.00 | 0.00 |  |
| 169 | Yone | 0.00 | 0.00 | 0.00 |  |
| 170 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 171 | Zac | 0.00 | 0.00 | 0.00 |  |
| 172 | Zed | 0.00 | 0.00 | 0.00 |  |
