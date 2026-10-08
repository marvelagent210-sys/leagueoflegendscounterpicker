# Counters to Twisted Fate (patch 26.20)

Every champion ranked by what its kit does against Twisted Fate's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Twisted Fate's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> TwistedFate` for the full ledger of a matchup, with sources.

## Top 10

### 1. Braum (net +0.91)

- **0.60** projectile block: Unbreakable blocks Twisted Fate's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Twisted Fate basic attacks)
- **0.60** projectile block: Unbreakable blocks Twisted Fate's Pick a Card, a projectile. Unbreakable for 4 s, long enough to use ahead of Pick a Card. (Braum E Unbreakable → Twisted Fate W Pick a Card)
- **0.35** interrupt: Concussive Blows's stun interrupts Twisted Fate's Destiny (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 2. Yasuo (net +0.85)

- **0.47** projectile block: Wind Wall blocks Twisted Fate's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Twisted Fate basic attacks)
- **0.43** projectile block: Wind Wall blocks Twisted Fate's Pick a Card, a projectile. Wind Wall for 4 s, long enough to use ahead of Pick a Card. (Yasuo W Wind Wall → Twisted Fate W Pick a Card)
- **0.35** interrupt: Steel Tempest's airborne interrupts Twisted Fate's Destiny (movement channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 3. Lulu (net +0.75)

- **0.40** disarm: Whimsy disarms Twisted Fate for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Twisted Fate basic attacks)
- **0.35** interrupt: Wild Growth's airborne interrupts Twisted Fate's Destiny (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Twisted Fate R Destiny)

### 4. Teemo (net +0.72)

- **0.57** blind: Blinding Dart's blind makes Twisted Fate's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Twisted Fate basic attacks)
- **0.46** blind: Blinding Dart's blind makes Twisted Fate's Pick a Card, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Twisted Fate W Pick a Card)
- Watch out: Destiny reveals Teemo through Guerrilla Warfare's stealth.

### 5. Milio (net +0.69)

- **0.35** interrupt: Ultra Mega Fire Kick's airborne interrupts Twisted Fate's Destiny (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Twisted Fate R Destiny)
- **0.24** cleanse: Breath of Life cleanses Twisted Fate's Pick a Card (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Twisted Fate W Pick a Card)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Twisted Fate's Pick a Card (slow, stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Twisted Fate W Pick a Card)

### 6. Nilah (net +0.63)

- **0.40** attack dodge: Jubilant Veil dodges Twisted Fate's basic attacks (with Stacked Deck). Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Twisted Fate basic attacks)
- **0.39** attack dodge: Jubilant Veil dodges Twisted Fate's Pick a Card, an empowered attack. Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Twisted Fate W Pick a Card)
- **0.35** interrupt: Apotheosis's airborne interrupts Twisted Fate's Destiny (movement channel). Apotheosis must land during the channel. (Nilah R Apotheosis → Twisted Fate R Destiny)
- Watch out: Twisted Fate's basic attacks reach 300 units farther than Nilah's (525 vs 225 attack range).

### 7. Elise (net +0.60)

- **0.35** interrupt: Cocoon's stun interrupts Twisted Fate's Destiny (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Twisted Fate R Destiny)
- **0.25** untargetable: Rappel makes Elise untargetable, dodging Twisted Fate's Pick a Card. Untargetable for 0.6 s; Pick a Card lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Twisted Fate W Pick a Card)

### 8. Samira (net +0.54)

- **0.36** projectile block: Blade Whirl blocks Twisted Fate's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Twisted Fate basic attacks)
- **0.24** projectile block: Blade Whirl blocks Twisted Fate's Wild Cards, a projectile. Blade Whirl for 0.75 s; Wild Cards takes 1.7 s to land, enough to react. (Samira W Blade Whirl → Twisted Fate Q Wild Cards)
- **0.24** projectile block: Blade Whirl blocks Twisted Fate's Pick a Card, a projectile. Blade Whirl for 0.75 s; Pick a Card lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Twisted Fate W Pick a Card)

### 9. Mel (net +0.53)

- **0.36** projectile block: Rebuttal blocks Twisted Fate's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Twisted Fate basic attacks)
- **0.23** projectile block: Rebuttal blocks Twisted Fate's Wild Cards, a projectile. Rebuttal for 0.75 s; Wild Cards takes 1.7 s to land, enough to react. (Mel W Rebuttal → Twisted Fate Q Wild Cards)
- **0.23** projectile block: Rebuttal blocks Twisted Fate's Pick a Card, a projectile. Rebuttal for 0.75 s; Pick a Card lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Twisted Fate W Pick a Card)

### 10. Cassiopeia (net +0.52)

- **0.35** interrupt: Petrifying Gaze's stun interrupts Twisted Fate's Destiny (movement channel). Petrifying Gaze must land during the channel. (Cassiopeia R Petrifying Gaze → Twisted Fate R Destiny)
- **0.17** grounding: Miasma grounds Twisted Fate, who then can't cast Destiny. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Twisted Fate R Destiny)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +0.91 | 1.34 | 0.43 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Yasuo | +0.85 | 1.10 | 0.25 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Lulu | +0.75 | 0.75 | 0.00 | disarm (Whimsy) |
| 4 | Teemo | +0.72 | 0.80 | 0.08 | blind (Blinding Dart), blind (Blinding Dart) |
| 5 | Milio | +0.69 | 0.69 | 0.00 |  |
| 6 | Nilah | +0.63 | 0.95 | 0.32 | attack dodge (Jubilant Veil) |
| 7 | Elise | +0.60 | 0.60 | 0.00 |  |
| 8 | Samira | +0.54 | 0.54 | 0.00 |  |
| 9 | Mel | +0.53 | 0.53 | 0.00 |  |
| 10 | Cassiopeia | +0.52 | 0.52 | 0.00 |  |
| 11 | Bard | +0.51 | 0.51 | 0.00 |  |
| 12 | Lissandra | +0.51 | 0.51 | 0.00 |  |
| 13 | Tristana | +0.51 | 0.51 | 0.00 |  |
| 14 | Jax | +0.45 | 0.88 | 0.43 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 15 | Udyr | +0.45 | 0.88 | 0.43 |  |
| 16 | Kalista | +0.45 | 0.45 | 0.00 |  |
| 17 | Ashe | +0.42 | 0.42 | 0.00 |  |
| 18 | Heimerdinger | +0.42 | 0.42 | 0.00 |  |
| 19 | Sivir | +0.42 | 0.42 | 0.00 |  |
| 20 | Nocturne | +0.41 | 0.84 | 0.43 |  |
| 21 | Rek'Sai | +0.41 | 0.66 | 0.25 |  |
| 22 | Annie | +0.40 | 0.40 | 0.00 |  |
| 23 | Anivia | +0.39 | 0.39 | 0.00 |  |
| 24 | Kled | +0.38 | 0.53 | 0.15 |  |
| 25 | Shen | +0.36 | 1.10 | 0.74 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 26 | Ahri | +0.35 | 0.35 | 0.00 |  |
| 27 | Azir | +0.35 | 0.35 | 0.00 |  |
| 28 | Brand | +0.35 | 0.35 | 0.00 |  |
| 29 | Corki | +0.35 | 0.35 | 0.00 |  |
| 30 | Draven | +0.35 | 0.35 | 0.00 |  |
| 31 | Gnar | +0.35 | 0.35 | 0.00 |  |
| 32 | Hwei | +0.35 | 0.35 | 0.00 |  |
| 33 | Jayce | +0.35 | 0.35 | 0.00 |  |
| 34 | Kennen | +0.35 | 0.35 | 0.00 |  |
| 35 | Nami | +0.35 | 0.35 | 0.00 |  |
| 36 | Orianna | +0.35 | 0.35 | 0.00 |  |
| 37 | Renata Glasc | +0.35 | 0.35 | 0.00 |  |
| 38 | Seraphine | +0.35 | 0.35 | 0.00 |  |
| 39 | Sona | +0.35 | 0.35 | 0.00 |  |
| 40 | Soraka | +0.35 | 0.35 | 0.00 |  |
| 41 | Swain | +0.35 | 0.35 | 0.00 |  |
| 42 | Syndra | +0.35 | 0.35 | 0.00 |  |
| 43 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 44 | Vex | +0.35 | 0.35 | 0.00 |  |
| 45 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 46 | Ziggs | +0.35 | 0.35 | 0.00 |  |
| 47 | Zilean | +0.35 | 0.35 | 0.00 |  |
| 48 | Zoe | +0.35 | 0.35 | 0.00 |  |
| 49 | Zyra | +0.35 | 0.35 | 0.00 |  |
| 50 | Camille | +0.32 | 0.53 | 0.21 |  |
| 51 | Xayah | +0.31 | 0.31 | 0.00 |  |
| 52 | Malzahar | +0.30 | 0.70 | 0.40 |  |
| 53 | Thresh | +0.30 | 0.35 | 0.05 |  |
| 54 | Zaahen | +0.29 | 0.54 | 0.25 |  |
| 55 | Morgana | +0.28 | 0.44 | 0.16 |  |
| 56 | Aurelion Sol | +0.25 | 0.35 | 0.10 |  |
| 57 | Kayle | +0.25 | 0.25 | 0.00 |  |
| 58 | Maokai | +0.24 | 0.67 | 0.43 |  |
| 59 | Neeko | +0.24 | 0.35 | 0.11 |  |
| 60 | Vayne | +0.21 | 0.35 | 0.14 |  |
| 61 | Malphite | +0.20 | 0.63 | 0.43 |  |
| 62 | Rakan | +0.19 | 0.35 | 0.16 |  |
| 63 | Vladimir | +0.18 | 0.44 | 0.26 |  |
| 64 | Alistar | +0.17 | 0.60 | 0.43 |  |
| 65 | Evelynn | +0.17 | 0.54 | 0.37 |  |
| 66 | Fizz | +0.16 | 0.35 | 0.19 |  |
| 67 | Jarvan IV | +0.16 | 0.35 | 0.19 |  |
| 68 | Sylas | +0.16 | 0.35 | 0.19 |  |
| 69 | Urgot | +0.16 | 0.35 | 0.19 |  |
| 70 | Yone | +0.16 | 0.35 | 0.19 |  |
| 71 | K'Sante | +0.15 | 0.35 | 0.20 |  |
| 72 | Briar | +0.14 | 0.35 | 0.21 |  |
| 73 | Lillia | +0.14 | 0.35 | 0.21 |  |
| 74 | Xin Zhao | +0.12 | 0.50 | 0.38 |  |
| 75 | Quinn | +0.12 | 0.35 | 0.23 |  |
| 76 | Hecarim | +0.10 | 0.35 | 0.25 |  |
| 77 | Ornn | +0.10 | 0.35 | 0.25 |  |
| 78 | Rell | +0.10 | 0.35 | 0.25 |  |
| 79 | Kindred | +0.09 | 0.09 | 0.00 |  |
| 80 | Bel'Veth | +0.08 | 0.35 | 0.27 |  |
| 81 | Volibear | +0.08 | 0.35 | 0.27 |  |
| 82 | Vel'Koz | +0.07 | 0.35 | 0.28 |  |
| 83 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 84 | Ambessa | +0.06 | 0.35 | 0.29 |  |
| 85 | Lee Sin | +0.06 | 0.35 | 0.29 |  |
| 86 | Riven | +0.06 | 0.35 | 0.29 |  |
| 87 | Shaco | +0.05 | 0.54 | 0.49 |  |
| 88 | Aurora | +0.03 | 0.18 | 0.15 |  |
| 89 | Xerath | +0.02 | 0.35 | 0.33 |  |
| 90 | Fiora | +0.01 | 0.41 | 0.40 |  |
| 91 | Rammus | 0.00 | 0.78 | 0.78 | attack reflect (Defensive Ball Curl) |
| 92 | Irelia | 0.00 | 0.35 | 0.35 |  |
| 93 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 94 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 95 | Karma | 0.00 | 0.00 | 0.00 |  |
| 96 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 97 | Lux | 0.00 | 0.00 | 0.00 |  |
| 98 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 99 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 100 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 101 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 102 | Aatrox | -0.03 | 0.35 | 0.38 |  |
| 103 | Nautilus | -0.03 | 0.35 | 0.38 |  |
| 104 | Diana | -0.05 | 0.35 | 0.40 |  |
| 105 | Janna | -0.05 | 0.35 | 0.40 |  |
| 106 | Kassadin | -0.05 | 0.35 | 0.40 |  |
| 107 | Sejuani | -0.05 | 0.35 | 0.40 |  |
| 108 | Shyvana | -0.05 | 0.35 | 0.40 |  |
| 109 | Senna | -0.05 | 0.06 | 0.11 |  |
| 110 | Graves | -0.07 | 0.00 | 0.07 |  |
| 111 | Amumu | -0.08 | 0.35 | 0.43 |  |
| 112 | Leona | -0.08 | 0.35 | 0.43 |  |
| 113 | Renekton | -0.08 | 0.35 | 0.43 |  |
| 114 | Sett | -0.08 | 0.35 | 0.43 |  |
| 115 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 116 | Ekko | -0.09 | 0.20 | 0.29 |  |
| 117 | Galio | -0.10 | 0.35 | 0.45 |  |
| 118 | Wukong | -0.10 | 0.35 | 0.45 |  |
| 119 | Zed | -0.11 | 0.18 | 0.29 |  |
| 120 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 121 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 122 | Varus | -0.11 | 0.00 | 0.11 |  |
| 123 | Yuumi | -0.12 | 0.42 | 0.54 |  |
| 124 | Fiddlesticks | -0.12 | 0.35 | 0.47 |  |
| 125 | Qiyana | -0.12 | 0.33 | 0.45 |  |
| 126 | Taliyah | -0.13 | 0.35 | 0.48 |  |
| 127 | Warwick | -0.15 | 0.54 | 0.69 |  |
| 128 | Gwen | -0.15 | 0.25 | 0.40 |  |
| 129 | Pantheon | -0.15 | 0.21 | 0.36 |  |
| 130 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 131 | Garen | -0.16 | 0.59 | 0.75 |  |
| 132 | Kayn | -0.16 | 0.54 | 0.70 |  |
| 133 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 134 | Viego | -0.18 | 0.35 | 0.53 |  |
| 135 | Pyke | -0.21 | 0.35 | 0.56 |  |
| 136 | Master Yi | -0.25 | 0.36 | 0.61 |  |
| 137 | Sion | -0.26 | 0.67 | 0.93 |  |
| 138 | Gragas | -0.28 | 0.35 | 0.63 |  |
| 139 | Poppy | -0.28 | 0.35 | 0.63 |  |
| 140 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 141 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 142 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 143 | Mordekaiser | -0.30 | 0.45 | 0.75 |  |
| 144 | Taric | -0.31 | 0.50 | 0.81 |  |
| 145 | Singed | -0.34 | 0.52 | 0.86 |  |
| 146 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 147 | Skarner | -0.37 | 0.44 | 0.81 |  |
| 148 | Tryndamere | -0.38 | 0.00 | 0.38 |  |
| 149 | Darius | -0.40 | 0.35 | 0.75 |  |
| 150 | Trundle | -0.40 | 0.35 | 0.75 |  |
| 151 | Yorick | -0.40 | 0.35 | 0.75 |  |
| 152 | Akali | -0.40 | 0.00 | 0.40 |  |
| 153 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 154 | Nasus | -0.43 | 0.43 | 0.86 | attack speed slow (Wither) |
| 155 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 156 | Locke | -0.43 | 0.00 | 0.43 |  |
| 157 | Talon | -0.43 | 0.00 | 0.43 |  |
| 158 | Vi | -0.44 | 0.35 | 0.79 |  |
| 159 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 160 | Gangplank | -0.49 | 0.37 | 0.86 |  |
| 161 | Blitzcrank | -0.51 | 0.35 | 0.86 |  |
| 162 | Cho'Gath | -0.51 | 0.35 | 0.86 |  |
| 163 | Tahm Kench | -0.53 | 0.35 | 0.88 |  |
| 164 | Zac | -0.53 | 0.35 | 0.88 |  |
| 165 | Olaf | -0.55 | 0.31 | 0.86 |  |
| 166 | Rengar | -0.57 | 0.43 | 1.00 |  |
| 167 | Kha'Zix | -0.64 | 0.00 | 0.64 |  |
| 168 | Naafiri | -0.66 | 0.00 | 0.66 |  |
| 169 | Katarina | -0.71 | 0.00 | 0.71 |  |
| 170 | Dr. Mundo | -0.86 | 0.00 | 0.86 |  |
| 171 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 172 | Nunu & Willump | -0.91 | 0.44 | 1.35 |  |
