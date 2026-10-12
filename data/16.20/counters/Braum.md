# Counters to Braum (patch 26.20)

Every champion ranked by what its kit does against Braum's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Braum's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Braum` for the full ledger of a matchup, with sources.

## Top 10

### 1. Camille (net +0.84)

- **0.80** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Braum's Glacial Fissure. Untargetable for 0.5 s; Glacial Fissure takes 1.36 s to land, enough to react. (Camille R The Hextech Ultimatum → Braum R Glacial Fissure)
- **0.08** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Braum's Glacial Fissure (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Braum R Glacial Fissure)

### 2. Master Yi (net +0.79)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Braum's Glacial Fissure. Untargetable for ?; Glacial Fissure takes 1.36 s to land, enough to react. (Master Yi Q Alpha Strike → Braum R Glacial Fissure)
- **0.16** cleanse: Highlander cleanses Braum's Glacial Fissure (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Braum R Glacial Fissure)
- **0.09** cc immunity: Highlander makes Master Yi immune to Braum's Glacial Fissure slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Braum R Glacial Fissure)
- Watch out: Concussive Blows's stun interrupts Master Yi's Meditate (normal channel).

### 3. Warwick (net +0.77)

- **0.80** cc immunity: Infinite Duress makes Warwick immune to Braum's Glacial Fissure (airborne, slow). Immune for ?; Glacial Fissure takes 1.36 s to land, enough to react. (Warwick R Infinite Duress → Braum R Glacial Fissure)
- **0.27** cc immunity: Infinite Duress makes Warwick immune to Braum's Concussive Blows (stun). Immune for ?, timed to Concussive Blows. (Warwick R Infinite Duress → Braum I Concussive Blows)
- **0.19** dash stop: Infinite Duress's knockdown can stop Braum's Stand Behind Me mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Braum W Stand Behind Me)
- Watch out: Concussive Blows's stun interrupts Warwick's Jaws of the Beast (movement channel).

### 4. Alistar (net +0.76)

- **0.64** cleanse: Unbreakable Will cleanses Braum's Glacial Fissure (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum R Glacial Fissure)
- **0.21** cleanse: Unbreakable Will cleanses Braum's Concussive Blows (stun) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum I Concussive Blows)
- **0.04** cleanse: Unbreakable Will cleanses Braum's Winter's Bite (slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum Q Winter's Bite)

### 5. Udyr (net +0.72)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Braum's Glacial Fissure (airborne, slow). Immune for 1.5 s, long enough to use ahead of Glacial Fissure. (Udyr E Blazing Stampede → Braum R Glacial Fissure)
- **0.55** cc immunity: Blazing Stampede makes Udyr immune to Braum's Concussive Blows (stun). Immune for 1.5 s, long enough to use ahead of Concussive Blows. (Udyr E Blazing Stampede → Braum I Concussive Blows)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Braum's Winter's Bite (slow). Immune for 1.5 s, long enough to use ahead of Winter's Bite. (Udyr E Blazing Stampede → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Udyr's Wilding Claw, a projectile.

### 6. Olaf (net +0.71)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Braum's Glacial Fissure (airborne, slow). Immune for 3 s, long enough to use ahead of Glacial Fissure. (Olaf R Ragnarok → Braum R Glacial Fissure)
- **0.26** cc immunity: Ragnarok makes Olaf immune to Braum's Concussive Blows (stun). Immune for 3 s, long enough to use ahead of Concussive Blows. (Olaf R Ragnarok → Braum I Concussive Blows)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Braum's Winter's Bite (slow). Immune for 3 s, long enough to use ahead of Winter's Bite. (Olaf R Ragnarok → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Olaf's Undertow, a projectile.

### 7. Yasuo (net +0.66)

- **0.80** projectile block: Wind Wall blocks Braum's Glacial Fissure, a projectile. Wind Wall for 4 s, long enough to use ahead of Glacial Fissure. (Yasuo W Wind Wall → Braum R Glacial Fissure)
- **0.28** projectile block: Wind Wall blocks Braum's Winter's Bite, a projectile. Wind Wall for 4 s, long enough to use ahead of Winter's Bite. (Yasuo W Wind Wall → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Yasuo's Steel Tempest, a projectile.

### 8. Sion (net +0.59)

- **0.80** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Glacial Fissure (airborne, slow). Immune for 8 s, long enough to use ahead of Glacial Fissure. (Sion R Unstoppable Onslaught → Braum R Glacial Fissure)
- **0.28** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Concussive Blows (stun). Immune for 8 s, long enough to use ahead of Concussive Blows. (Sion R Unstoppable Onslaught → Braum I Concussive Blows)
- **0.05** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Winter's Bite (slow). Immune for 8 s, long enough to use ahead of Winter's Bite. (Sion R Unstoppable Onslaught → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Sion's Roar of the Slayer, a projectile.

### 9. Samira (net +0.53)

- **0.80** projectile block: Blade Whirl blocks Braum's Glacial Fissure, a projectile. Blade Whirl for 0.75 s; Glacial Fissure takes 1.36 s to land, enough to react. (Samira W Blade Whirl → Braum R Glacial Fissure)
- **0.30** range: Samira's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range). Braum closes the gap with Stand Behind Me. (Samira basic attacks → Braum basic attacks)
- **0.25** projectile block: Blade Whirl blocks Braum's Winter's Bite, a projectile. Blade Whirl for 0.75 s; Winter's Bite takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Samira's basic attacks, which are projectiles.

### 10. Gangplank (net +0.51)

- **0.64** cleanse: Remove Scurvy cleanses Braum's Glacial Fissure (airborne, slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum R Glacial Fissure)
- **0.36** cleanse: Remove Scurvy cleanses Braum's Concussive Blows (stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum I Concussive Blows)
- **0.06** cleanse: Remove Scurvy cleanses Braum's Winter's Bite (slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Gangplank's Parrrley, a projectile.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Camille | +0.84 | 0.84 | 0.00 |  |
| 2 | Master Yi | +0.79 | 1.02 | 0.23 |  |
| 3 | Warwick | +0.77 | 1.07 | 0.30 |  |
| 4 | Alistar | +0.76 | 0.76 | 0.00 |  |
| 5 | Udyr | +0.72 | 1.10 | 0.38 |  |
| 6 | Olaf | +0.71 | 0.94 | 0.23 |  |
| 7 | Yasuo | +0.66 | 0.94 | 0.28 | projectile block (Wind Wall) |
| 8 | Sion | +0.59 | 0.95 | 0.36 |  |
| 9 | Samira | +0.53 | 1.23 | 0.70 | projectile block (Blade Whirl) |
| 10 | Gangplank | +0.51 | 0.84 | 0.33 |  |
| 11 | Aurora | +0.50 | 1.13 | 0.63 |  |
| 12 | Fiora | +0.49 | 0.94 | 0.45 |  |
| 13 | Nocturne | +0.43 | 0.88 | 0.45 |  |
| 14 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 15 | Zed | +0.42 | 0.80 | 0.38 |  |
| 16 | Bard | +0.41 | 1.16 | 0.75 |  |
| 17 | Evelynn | +0.41 | 0.80 | 0.39 |  |
| 18 | Xin Zhao | +0.40 | 0.40 | 0.00 |  |
| 19 | Vladimir | +0.39 | 0.98 | 0.59 |  |
| 20 | Rek'Sai | +0.39 | 0.84 | 0.45 |  |
| 21 | Ekko | +0.38 | 0.80 | 0.42 |  |
| 22 | Garen | +0.37 | 0.37 | 0.00 |  |
| 23 | Taric | +0.36 | 0.36 | 0.00 |  |
| 24 | Morgana | +0.35 | 1.22 | 0.87 |  |
| 25 | Kayn | +0.35 | 0.80 | 0.45 |  |
| 26 | Shaco | +0.35 | 0.80 | 0.45 |  |
| 27 | Jax | +0.35 | 0.35 | 0.00 |  |
| 28 | Sivir | +0.34 | 1.27 | 0.93 |  |
| 29 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 30 | Lissandra | +0.26 | 1.11 | 0.85 |  |
| 31 | Kalista | +0.26 | 1.01 | 0.75 |  |
| 32 | Gwen | +0.25 | 0.80 | 0.55 |  |
| 33 | Malzahar | +0.24 | 0.95 | 0.71 |  |
| 34 | Zaahen | +0.24 | 0.94 | 0.70 |  |
| 35 | Mel | +0.18 | 1.19 | 1.01 | projectile block (Rebuttal) |
| 36 | Rengar | +0.18 | 0.88 | 0.70 |  |
| 37 | Elise | +0.17 | 1.12 | 0.95 |  |
| 38 | Xayah | +0.11 | 1.18 | 1.07 |  |
| 39 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 40 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 41 | Sett | +0.08 | 0.08 | 0.00 |  |
| 42 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 43 | Pantheon | +0.07 | 0.40 | 0.33 |  |
| 44 | Zeri | +0.06 | 0.44 | 0.38 |  |
| 45 | Rammus | +0.05 | 0.32 | 0.27 |  |
| 46 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 47 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 48 | Darius | 0.00 | 0.00 | 0.00 |  |
| 49 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 50 | Rell | 0.00 | 0.00 | 0.00 |  |
| 51 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 52 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 53 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 54 | Kayle | -0.06 | 0.76 | 0.82 |  |
| 55 | Singed | -0.06 | 0.39 | 0.45 |  |
| 56 | Cassiopeia | -0.07 | 0.60 | 0.67 |  |
| 57 | Viktor | -0.09 | 0.63 | 0.72 |  |
| 58 | Yone | -0.09 | 0.26 | 0.35 |  |
| 59 | Kled | -0.10 | 1.03 | 1.13 |  |
| 60 | K'Sante | -0.11 | 0.16 | 0.27 |  |
| 61 | Teemo | -0.14 | 0.77 | 0.91 | blind (Blinding Dart) |
| 62 | Illaoi | -0.15 | 0.08 | 0.23 |  |
| 63 | Malphite | -0.16 | 0.29 | 0.45 |  |
| 64 | Lulu | -0.17 | 0.66 | 0.83 |  |
| 65 | Aurelion Sol | -0.17 | 0.22 | 0.39 |  |
| 66 | Nidalee | -0.19 | 0.30 | 0.49 |  |
| 67 | Azir | -0.23 | 0.27 | 0.50 |  |
| 68 | Yuumi | -0.26 | 1.12 | 1.38 |  |
| 69 | Jinx | -0.26 | 0.64 | 0.90 |  |
| 70 | Milio | -0.27 | 0.70 | 0.97 |  |
| 71 | Jayce | -0.27 | 0.30 | 0.57 |  |
| 72 | Kindred | -0.28 | 0.83 | 1.11 |  |
| 73 | Veigar | -0.29 | 0.54 | 0.83 |  |
| 74 | Shen | -0.29 | 0.33 | 0.62 |  |
| 75 | Rakan | -0.29 | 0.13 | 0.42 |  |
| 76 | Soraka | -0.30 | 0.27 | 0.57 |  |
| 77 | Vi | -0.30 | 0.08 | 0.38 |  |
| 78 | Kennen | -0.32 | 0.29 | 0.61 |  |
| 79 | Skarner | -0.32 | 0.13 | 0.45 |  |
| 80 | Annie | -0.33 | 0.22 | 0.55 |  |
| 81 | Shyvana | -0.37 | 0.08 | 0.45 |  |
| 82 | Maokai | -0.38 | 0.80 | 1.18 |  |
| 83 | Lee Sin | -0.38 | 0.00 | 0.38 |  |
| 84 | Rumble | -0.38 | 0.00 | 0.38 |  |
| 85 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 86 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 87 | Twitch | -0.40 | 0.43 | 0.83 |  |
| 88 | Fizz | -0.40 | 0.00 | 0.40 |  |
| 89 | Gnar | -0.41 | 0.33 | 0.74 |  |
| 90 | Orianna | -0.41 | 0.27 | 0.68 |  |
| 91 | Karthus | -0.42 | 0.19 | 0.61 |  |
| 92 | Kassadin | -0.42 | 0.00 | 0.42 |  |
| 93 | Vex | -0.44 | 0.63 | 1.07 |  |
| 94 | Aphelios | -0.45 | 0.49 | 0.94 |  |
| 95 | Aatrox | -0.45 | 0.00 | 0.45 |  |
| 96 | Yorick | -0.45 | 0.00 | 0.45 |  |
| 97 | Kai'Sa | -0.48 | 0.38 | 0.86 |  |
| 98 | Yunara | -0.48 | 0.36 | 0.84 |  |
| 99 | Karma | -0.48 | 0.22 | 0.70 |  |
| 100 | Corki | -0.49 | 0.38 | 0.87 |  |
| 101 | Kog'Maw | -0.49 | 0.27 | 0.76 |  |
| 102 | Poppy | -0.50 | 0.50 | 1.00 | dash stop (Steadfast Presence) |
| 103 | LeBlanc | -0.50 | 0.22 | 0.72 |  |
| 104 | Locke | -0.52 | 0.00 | 0.52 |  |
| 105 | Riven | -0.55 | 0.00 | 0.55 |  |
| 106 | Vayne | -0.57 | 0.43 | 1.00 |  |
| 107 | Quinn | -0.58 | 0.38 | 0.96 |  |
| 108 | Syndra | -0.58 | 0.22 | 0.80 |  |
| 109 | Galio | -0.60 | 0.00 | 0.60 |  |
| 110 | Smolder | -0.61 | 0.32 | 0.93 |  |
| 111 | Zilean | -0.61 | 0.32 | 0.93 |  |
| 112 | Zyra | -0.63 | 0.24 | 0.87 |  |
| 113 | Diana | -0.64 | 0.00 | 0.64 |  |
| 114 | Senna | -0.66 | 0.32 | 0.98 |  |
| 115 | Vel'Koz | -0.66 | 0.27 | 0.93 |  |
| 116 | Thresh | -0.66 | 0.19 | 0.85 |  |
| 117 | Ryze | -0.67 | 0.24 | 0.91 |  |
| 118 | Ahri | -0.68 | 0.54 | 1.22 |  |
| 119 | Kha'Zix | -0.68 | 0.00 | 0.68 |  |
| 120 | Anivia | -0.69 | 0.24 | 0.93 |  |
| 121 | Hwei | -0.70 | 0.58 | 1.28 |  |
| 122 | Blitzcrank | -0.70 | 0.00 | 0.70 |  |
| 123 | Zoe | -0.73 | 0.32 | 1.05 |  |
| 124 | Brand | -0.73 | 0.22 | 0.95 |  |
| 125 | Draven | -0.74 | 0.36 | 1.10 |  |
| 126 | Ezreal | -0.74 | 0.32 | 1.06 |  |
| 127 | Lux | -0.74 | 0.29 | 1.03 |  |
| 128 | Talon | -0.76 | 0.00 | 0.76 |  |
| 129 | Zac | -0.77 | 0.40 | 1.17 | dash stop (Stretching Strikes) |
| 130 | Neeko | -0.77 | 0.22 | 0.99 |  |
| 131 | Sona | -0.79 | 0.41 | 1.20 |  |
| 132 | Ashe | -0.79 | 0.36 | 1.15 |  |
| 133 | Tristana | -0.80 | 0.36 | 1.16 |  |
| 134 | Nautilus | -0.80 | 0.00 | 0.80 |  |
| 135 | Lillia | -0.81 | 0.11 | 0.92 |  |
| 136 | Miss Fortune | -0.82 | 0.32 | 1.14 |  |
| 137 | Graves | -0.82 | 0.24 | 1.06 |  |
| 138 | Amumu | -0.82 | 0.18 | 1.00 |  |
| 139 | Swain | -0.84 | 0.21 | 1.05 |  |
| 140 | Lucian | -0.85 | 0.36 | 1.21 |  |
| 141 | Leona | -0.85 | 0.00 | 0.85 |  |
| 142 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 143 | Qiyana | -0.90 | 0.00 | 0.90 |  |
| 144 | Twisted Fate | -0.91 | 0.43 | 1.34 |  |
| 145 | Hecarim | -0.92 | 0.08 | 1.00 |  |
| 146 | Irelia | -0.93 | 0.05 | 0.98 |  |
| 147 | Heimerdinger | -0.94 | 0.31 | 1.25 |  |
| 148 | Xerath | -0.94 | 0.27 | 1.21 |  |
| 149 | Akali | -0.94 | 0.00 | 0.94 |  |
| 150 | Ziggs | -0.95 | 0.27 | 1.22 |  |
| 151 | Renata Glasc | -0.96 | 0.38 | 1.34 |  |
| 152 | Ivern | -0.96 | 0.19 | 1.15 |  |
| 153 | Caitlyn | -0.97 | 0.36 | 1.33 |  |
| 154 | Akshan | -0.98 | 0.34 | 1.32 |  |
| 155 | Urgot | -1.00 | 0.15 | 1.15 |  |
| 156 | Sylas | -1.00 | 0.00 | 1.00 |  |
| 157 | Seraphine | -1.01 | 0.29 | 1.30 |  |
| 158 | Sejuani | -1.01 | 0.00 | 1.01 |  |
| 159 | Varus | -1.02 | 0.27 | 1.29 |  |
| 160 | Katarina | -1.04 | 0.00 | 1.04 |  |
| 161 | Tahm Kench | -1.04 | 0.00 | 1.04 |  |
| 162 | Viego | -1.05 | 0.17 | 1.22 |  |
| 163 | Janna | -1.08 | 0.36 | 1.44 |  |
| 164 | Nami | -1.08 | 0.22 | 1.30 |  |
| 165 | Nunu & Willump | -1.09 | 0.28 | 1.37 |  |
| 166 | Fiddlesticks | -1.14 | 0.20 | 1.34 |  |
| 167 | Jhin | -1.15 | 0.27 | 1.42 |  |
| 168 | Gragas | -1.15 | 0.00 | 1.15 |  |
| 169 | Briar | -1.23 | 0.00 | 1.23 |  |
| 170 | Ornn | -1.25 | 0.08 | 1.33 |  |
| 171 | Pyke | -1.33 | 0.00 | 1.33 |  |
| 172 | Taliyah | -1.43 | 0.27 | 1.70 |  |
