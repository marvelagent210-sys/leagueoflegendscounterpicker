# Counters to Aurora (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 38 other champions with a simulator kit against Aurora: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Aurora wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Aurora --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 2 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.32 | +1.00 | +1.00 |
| 3 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 4 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 5 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 6 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 7 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 8 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 9 | Fiora | +0.76 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +0.00 |
| 10 | Garen | +0.75 | +1.00 | +1.00 | +1.00 | −0.28 | +0.93 | +0.00 |
| 11 | Trundle | +0.73 | +1.00 | +1.00 | +1.00 | −0.47 | +1.00 | +0.00 |
| 12 | Renekton | +0.66 | +1.00 | +1.00 | +1.00 | −0.22 | −0.10 | +0.00 |
| 13 | Rumble | +0.54 | +0.94 | +0.94 | +0.19 | −0.11 | +0.46 | +0.00 |
| 14 | Volibear | +0.45 | +1.00 | +0.61 | +1.00 | −0.33 | −1.00 | +0.00 |
| 15 | Gwen | +0.35 | +0.68 | +0.68 | +0.77 | −0.33 | −1.00 | +0.00 |
| 16 | Malphite | +0.17 | +0.00 | +0.00 | +1.00 | −0.17 | −0.05 | +0.00 |
| 17 | Sion | +0.15 | −0.10 | −0.10 | +0.71 | −0.11 | +0.81 | +0.00 |
| 18 | Mordekaiser | +0.13 | +0.04 | +0.13 | +0.67 | −0.28 | −0.04 | +0.00 |
| 19 | Nasus | +0.12 | +0.09 | +0.11 | +0.14 | −0.21 | +0.70 | +0.00 |
| 20 | Dr. Mundo | +0.10 | +0.12 | +0.17 | +0.20 | −0.10 | +0.08 | +0.00 |
| 21 | Zaahen | +0.09 | +0.44 | +0.32 | −0.27 | −0.18 | −0.19 | +0.00 |
| 22 | Aatrox | +0.05 | +1.00 | +0.44 | −1.00 | −0.10 | −1.00 | +0.00 |
| 23 | Darius | +0.04 | +1.00 | −1.00 | +1.00 | −0.40 | −1.00 | +0.00 |
| 24 | Akali | −0.24 | +0.06 | +0.06 | −0.61 | −0.31 | −1.00 | +0.00 |
| 25 | Urgot | −0.28 | −0.35 | −0.35 | −0.24 | −0.12 | −0.41 | +0.00 |
| 26 | Shen | −0.30 | −0.42 | −0.42 | −0.27 | +0.01 | −0.43 | +0.00 |
| 27 | Irelia | −0.33 | −1.00 | −1.00 | +1.00 | −0.02 | −0.23 | +0.00 |
| 28 | Ornn | −0.35 | −0.44 | −0.44 | −0.33 | −0.12 | −0.44 | +0.00 |
| 29 | Quinn | −0.36 | −1.00 | −1.00 | +0.92 | −0.07 | – | +0.00 |
| 30 | Riven | −0.47 | −1.00 | −1.00 | +1.00 | −0.46 | −1.00 | +0.00 |
| 31 | Singed | −0.47 | −1.00 | −1.00 | +1.00 | −0.46 | −1.00 | +0.00 |
| 32 | Yone | −0.62 | +0.00 | −1.00 | −1.00 | −0.44 | −1.00 | +0.00 |
| 33 | Yasuo | −0.65 | −1.00 | −1.00 | −0.22 | −0.04 | −1.00 | +0.00 |
| 34 | Olaf | −0.80 | −0.87 | −0.92 | −1.00 | −0.35 | −1.00 | +0.00 |
| 35 | Sett | −0.80 | −0.98 | −0.98 | −0.98 | −0.23 | −0.85 | +0.00 |
| 36 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 37 | Cho'Gath | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 38 | Ambessa | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Aurora's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aurora's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Aurora` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.70)

- **0.70** spell shield: Spell Shield's spell shield blocks Aurora's Between Worlds. Spell shield for 1.5 s, long enough to use ahead of Between Worlds. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Aurora R Between Worlds)

#### 2. Kayle (net +0.38)

- **0.35** invulnerable: Divine Judgment makes Kayle invulnerable to Aurora's Between Worlds (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Between Worlds. (Kayle R Divine Judgment → Aurora R Between Worlds)
- **0.03** range: Kayle's basic attacks reach 75 units farther than Aurora's (625 vs 550 attack range). Aurora closes the gap with The Weirding, Between Worlds, Across the Veil. (Kayle basic attacks → Aurora basic attacks)

#### 3. Xayah (net +0.27)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Aurora's Between Worlds. Untargetable for 1.5 s, long enough to use ahead of Between Worlds. (Xayah R Featherstorm → Aurora R Between Worlds)
- Watch out: Between Worlds makes Aurora untargetable, dodging Xayah's Featherstorm.

#### 4. Kai'Sa (net +0.15)

- **0.15** reveal: Void Seeker reveals Aurora through Across the Veil's stealth. (Kai'Sa W Void Seeker → Aurora W Across the Veil)

#### 5. Vladimir (net +0.13)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aurora's Between Worlds. Untargetable for 2 s, long enough to use ahead of Between Worlds. (Vladimir W Sanguine Pool → Aurora R Between Worlds)
- Watch out: Between Worlds makes Aurora untargetable, dodging Vladimir's Hemoplague.

#### 6. Master Yi (net +0.12)

- **0.42** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aurora's Between Worlds. Untargetable for ?; Between Worlds lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Aurora R Between Worlds)
- **0.14** cleanse: Highlander cleanses Aurora's Between Worlds (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Aurora R Between Worlds)
- **0.08** cc immunity: Highlander makes Master Yi immune to Aurora's Between Worlds slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Aurora R Between Worlds)
- Watch out: Aurora's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range).

#### 7. Elise (net +0.07)

- **0.42** untargetable: Rappel makes Elise untargetable, dodging Aurora's Between Worlds. Untargetable for 0.6 s; Between Worlds lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Aurora R Between Worlds)
- **0.15** reveal: Cocoon reveals Aurora through Across the Veil's stealth. (Elise E Cocoon → Aurora W Across the Veil)
- Watch out: Between Worlds makes Aurora untargetable, dodging Elise's Cocoon.

#### 8. Samira (net +0.02)

- **0.27** projectile block: Blade Whirl blocks Aurora's Twofold Hex, a projectile. Blade Whirl for 0.75 s; Twofold Hex takes 0.81 s to land, enough to react. (Samira W Blade Whirl → Aurora Q Twofold Hex)
- **0.24** projectile block: Blade Whirl blocks Aurora's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Aurora basic attacks)
- Watch out: Between Worlds makes Aurora untargetable, dodging Samira's Wild Rush.

#### 9. Lissandra (net +0.01)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aurora's Between Worlds. Untargetable for 2.5 s, long enough to use ahead of Between Worlds. (Lissandra R Frozen Tomb → Aurora R Between Worlds)
- **0.16** dash stop: Frozen Tomb's knockdown can stop Aurora's Across the Veil mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Aurora W Across the Veil)
- **0.14** dash stop: Frozen Tomb's knockdown can stop Aurora's The Weirding mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Aurora E The Weirding)
- Watch out: Between Worlds makes Aurora untargetable, dodging Lissandra's Frozen Tomb.

#### 10. Twitch (net 0.00)

- No interaction in Twitch's favor.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 2 | Kayle | +0.38 | 0.38 | 0.00 |  |
| 3 | Xayah | +0.27 | 0.70 | 0.43 |  |
| 4 | Kai'Sa | +0.15 | 0.15 | 0.00 |  |
| 5 | Vladimir | +0.13 | 0.70 | 0.57 |  |
| 6 | Master Yi | +0.12 | 0.63 | 0.51 |  |
| 7 | Elise | +0.07 | 0.57 | 0.50 |  |
| 8 | Samira | +0.02 | 0.39 | 0.37 |  |
| 9 | Lissandra | +0.01 | 0.82 | 0.81 |  |
| 10 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 11 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 12 | Kindred | -0.01 | 0.19 | 0.20 |  |
| 13 | Nidalee | -0.01 | 0.15 | 0.16 |  |
| 14 | Teemo | -0.02 | 0.38 | 0.40 |  |
| 15 | Jinx | -0.03 | 0.45 | 0.48 |  |
| 16 | Twisted Fate | -0.03 | 0.15 | 0.18 |  |
| 17 | Fiora | -0.06 | 0.45 | 0.51 |  |
| 18 | Bard | -0.12 | 0.70 | 0.82 |  |
| 19 | Hwei | -0.15 | 0.60 | 0.75 |  |
| 20 | Vex | -0.15 | 0.57 | 0.72 |  |
| 21 | Lulu | -0.16 | 0.42 | 0.58 |  |
| 22 | LeBlanc | -0.16 | 0.15 | 0.31 |  |
| 23 | Veigar | -0.17 | 0.43 | 0.60 |  |
| 24 | Malzahar | -0.18 | 0.40 | 0.58 |  |
| 25 | Milio | -0.20 | 0.16 | 0.36 |  |
| 26 | Shaco | -0.21 | 0.42 | 0.63 |  |
| 27 | Yuumi | -0.22 | 0.42 | 0.64 |  |
| 28 | Yasuo | -0.23 | 0.61 | 0.84 |  |
| 29 | Viktor | -0.26 | 0.44 | 0.70 |  |
| 30 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 31 | Mel | -0.27 | 0.37 | 0.64 |  |
| 32 | Tryndamere | -0.27 | 0.00 | 0.27 |  |
| 33 | Karma | -0.28 | 0.15 | 0.43 |  |
| 34 | Akshan | -0.30 | 0.15 | 0.45 |  |
| 35 | Zed | -0.31 | 0.42 | 0.73 |  |
| 36 | Quinn | -0.33 | 0.00 | 0.33 |  |
| 37 | Kayn | -0.34 | 0.50 | 0.84 |  |
| 38 | Gwen | -0.35 | 0.42 | 0.77 |  |
| 39 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 40 | Shen | -0.36 | 0.29 | 0.65 |  |
| 41 | Udyr | -0.36 | 0.26 | 0.62 |  |
| 42 | Rek'Sai | -0.37 | 0.77 | 1.14 |  |
| 43 | Vayne | -0.37 | 0.00 | 0.37 |  |
| 44 | Zilean | -0.38 | 0.00 | 0.38 |  |
| 45 | Zoe | -0.38 | 0.00 | 0.38 |  |
| 46 | Heimerdinger | -0.40 | 0.10 | 0.50 |  |
| 47 | Singed | -0.42 | 0.60 | 1.02 |  |
| 48 | Jayce | -0.42 | 0.00 | 0.42 |  |
| 49 | Ahri | -0.44 | 0.44 | 0.88 |  |
| 50 | Ryze | -0.44 | 0.00 | 0.44 |  |
| 51 | Fiddlesticks | -0.45 | 0.15 | 0.60 |  |
| 52 | Miss Fortune | -0.45 | 0.00 | 0.45 |  |
| 53 | Zeri | -0.45 | 0.00 | 0.45 |  |
| 54 | Cassiopeia | -0.46 | 0.41 | 0.87 |  |
| 55 | Morgana | -0.46 | 0.39 | 0.85 |  |
| 56 | Taric | -0.46 | 0.32 | 0.78 |  |
| 57 | Pantheon | -0.48 | 0.35 | 0.83 |  |
| 58 | Caitlyn | -0.48 | 0.20 | 0.68 |  |
| 59 | Corki | -0.48 | 0.00 | 0.48 |  |
| 60 | Vel'Koz | -0.48 | 0.00 | 0.48 |  |
| 61 | Katarina | -0.49 | 0.12 | 0.61 |  |
| 62 | Varus | -0.49 | 0.12 | 0.61 |  |
| 63 | Braum | -0.50 | 0.63 | 1.13 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 64 | Nasus | -0.50 | 0.29 | 0.79 |  |
| 65 | Ivern | -0.50 | 0.00 | 0.50 |  |
| 66 | Xerath | -0.50 | 0.00 | 0.50 |  |
| 67 | Ekko | -0.51 | 0.42 | 0.93 |  |
| 68 | Lux | -0.51 | 0.00 | 0.51 |  |
| 69 | Ezreal | -0.52 | 0.00 | 0.52 |  |
| 70 | Warwick | -0.54 | 0.30 | 0.84 |  |
| 71 | Kalista | -0.54 | 0.16 | 0.70 |  |
| 72 | Camille | -0.55 | 0.42 | 0.97 |  |
| 73 | Olaf | -0.56 | 0.22 | 0.78 |  |
| 74 | Aatrox | -0.58 | 0.15 | 0.73 |  |
| 75 | Sylas | -0.58 | 0.15 | 0.73 |  |
| 76 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 77 | Nocturne | -0.59 | 0.70 | 1.29 |  |
| 78 | Illaoi | -0.59 | 0.15 | 0.74 |  |
| 79 | Anivia | -0.59 | 0.00 | 0.59 |  |
| 80 | Graves | -0.59 | 0.00 | 0.59 |  |
| 81 | Nilah | -0.60 | 0.27 | 0.87 |  |
| 82 | Ashe | -0.61 | 0.00 | 0.61 |  |
| 83 | Lucian | -0.62 | 0.00 | 0.62 |  |
| 84 | Kha'Zix | -0.63 | 0.00 | 0.63 |  |
| 85 | Gnar | -0.64 | 0.00 | 0.64 |  |
| 86 | Draven | -0.66 | 0.00 | 0.66 |  |
| 87 | Thresh | -0.67 | 0.15 | 0.82 |  |
| 88 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 89 | Talon | -0.67 | 0.00 | 0.67 |  |
| 90 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 91 | Lee Sin | -0.69 | 0.15 | 0.84 |  |
| 92 | Brand | -0.69 | 0.00 | 0.69 |  |
| 93 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 94 | Syndra | -0.69 | 0.00 | 0.69 |  |
| 95 | Ziggs | -0.69 | 0.00 | 0.69 |  |
| 96 | Garen | -0.70 | 0.42 | 1.12 |  |
| 97 | Rengar | -0.70 | 0.35 | 1.05 |  |
| 98 | Alistar | -0.71 | 0.17 | 0.88 |  |
| 99 | Aurelion Sol | -0.71 | 0.00 | 0.71 |  |
| 100 | Jax | -0.72 | 0.31 | 1.03 |  |
| 101 | Akali | -0.72 | 0.15 | 0.87 |  |
| 102 | Annie | -0.73 | 0.02 | 0.75 |  |
| 103 | Janna | -0.73 | 0.00 | 0.73 |  |
| 104 | Riven | -0.73 | 0.00 | 0.73 |  |
| 105 | Jhin | -0.75 | 0.00 | 0.75 |  |
| 106 | Shyvana | -0.75 | 0.00 | 0.75 |  |
| 107 | Bel'Veth | -0.77 | 0.00 | 0.77 |  |
| 108 | Locke | -0.77 | 0.00 | 0.77 |  |
| 109 | Naafiri | -0.78 | 0.15 | 0.93 |  |
| 110 | Wukong | -0.78 | 0.00 | 0.78 |  |
| 111 | Swain | -0.78 | 0.00 | 0.78 |  |
| 112 | Senna | -0.79 | 0.00 | 0.79 |  |
| 113 | Sion | -0.80 | 0.22 | 1.02 |  |
| 114 | Kassadin | -0.80 | 0.00 | 0.80 |  |
| 115 | Sona | -0.80 | 0.00 | 0.80 |  |
| 116 | Zyra | -0.81 | 0.15 | 0.96 |  |
| 117 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 118 | Fizz | -0.82 | 0.15 | 0.97 |  |
| 119 | Orianna | -0.82 | 0.00 | 0.82 |  |
| 120 | Poppy | -0.83 | 0.50 | 1.33 |  |
| 121 | Renata Glasc | -0.84 | 0.15 | 0.99 |  |
| 122 | Zac | -0.85 | 0.49 | 1.34 |  |
| 123 | Evelynn | -0.85 | 0.42 | 1.27 |  |
| 124 | Sett | -0.85 | 0.15 | 1.00 |  |
| 125 | Aphelios | -0.86 | 0.10 | 0.96 |  |
| 126 | Tristana | -0.86 | 0.07 | 0.93 |  |
| 127 | Renekton | -0.87 | 0.00 | 0.87 |  |
| 128 | Urgot | -0.88 | 0.15 | 1.03 |  |
| 129 | Azir | -0.88 | 0.00 | 0.88 |  |
| 130 | Maokai | -0.93 | 0.42 | 1.35 |  |
| 131 | Neeko | -0.93 | 0.00 | 0.93 |  |
| 132 | Nunu & Willump | -0.94 | 0.25 | 1.19 |  |
| 133 | Xin Zhao | -0.97 | 0.35 | 1.32 |  |
| 134 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 135 | Irelia | -1.00 | 0.00 | 1.00 |  |
| 136 | Lillia | -1.00 | 0.00 | 1.00 |  |
| 137 | Kled | -1.03 | 0.29 | 1.32 |  |
| 138 | Gangplank | -1.03 | 0.19 | 1.22 |  |
| 139 | Nami | -1.03 | 0.00 | 1.03 |  |
| 140 | Ambessa | -1.04 | 0.15 | 1.19 |  |
| 141 | Zaahen | -1.05 | 0.15 | 1.20 |  |
| 142 | Yone | -1.06 | 0.23 | 1.29 |  |
| 143 | Rumble | -1.06 | 0.00 | 1.06 |  |
| 144 | Rammus | -1.08 | 0.29 | 1.37 |  |
| 145 | Mordekaiser | -1.09 | 0.19 | 1.28 |  |
| 146 | Briar | -1.09 | 0.15 | 1.24 |  |
| 147 | Galio | -1.10 | 0.00 | 1.10 |  |
| 148 | Amumu | -1.12 | 0.22 | 1.34 |  |
| 149 | Diana | -1.13 | 0.00 | 1.13 |  |
| 150 | Blitzcrank | -1.14 | 0.00 | 1.14 |  |
| 151 | Rakan | -1.15 | 0.00 | 1.15 |  |
| 152 | Pyke | -1.16 | 0.00 | 1.16 |  |
| 153 | Vi | -1.17 | 0.15 | 1.32 |  |
| 154 | Leona | -1.17 | 0.00 | 1.17 |  |
| 155 | Hecarim | -1.18 | 0.00 | 1.18 |  |
| 156 | Skarner | -1.19 | 0.21 | 1.40 |  |
| 157 | Nautilus | -1.19 | 0.00 | 1.19 |  |
| 158 | Cho'Gath | -1.21 | 0.00 | 1.21 |  |
| 159 | Darius | -1.21 | 0.00 | 1.21 |  |
| 160 | Trundle | -1.21 | 0.00 | 1.21 |  |
| 161 | Taliyah | -1.23 | 0.00 | 1.23 |  |
| 162 | Gragas | -1.24 | 0.00 | 1.24 |  |
| 163 | Rell | -1.24 | 0.00 | 1.24 |  |
| 164 | Malphite | -1.25 | 0.19 | 1.44 |  |
| 165 | Tahm Kench | -1.25 | 0.00 | 1.25 |  |
| 166 | Qiyana | -1.26 | 0.00 | 1.26 |  |
| 167 | Viego | -1.26 | 0.00 | 1.26 |  |
| 168 | Volibear | -1.28 | 0.00 | 1.28 |  |
| 169 | Jarvan IV | -1.33 | 0.00 | 1.33 |  |
| 170 | K'Sante | -1.36 | 0.00 | 1.36 |  |
| 171 | Sejuani | -1.39 | 0.00 | 1.39 |  |
| 172 | Ornn | -1.47 | 0.00 | 1.47 |  |
