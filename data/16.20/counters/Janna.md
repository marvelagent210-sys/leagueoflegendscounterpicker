# Counters to Janna (patch 26.20)

Every champion ranked by what its kit does against Janna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Janna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Janna` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.50)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna R Monsoon)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna Q Howling Gale)
- **0.40** interrupt: Unspeakable Horror's fear interrupts Janna's Monsoon (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 2. Elise (net +1.32)

- **0.61** untargetable: Rappel makes Elise untargetable, dodging Janna's Howling Gale. Untargetable for 0.6 s; Howling Gale takes 1.25 s to land, enough to react. (Elise E Rappel → Janna Q Howling Gale)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Janna's Monsoon. Untargetable for 0.6 s; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Janna R Monsoon)
- **0.40** interrupt: Cocoon's stun interrupts Janna's Monsoon (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Janna R Monsoon)

### 3. Rek'Sai (net +1.23)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Monsoon. Untargetable for 1.5 s, long enough to use ahead of Monsoon. (Rek'Sai R Void Rush → Janna R Monsoon)
- **0.40** interrupt: Unburrow's airborne interrupts Janna's Monsoon (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Janna R Monsoon)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Howling Gale. Untargetable for 1.5 s, long enough to use ahead of Howling Gale. (Rek'Sai R Void Rush → Janna Q Howling Gale)
- Watch out: Janna's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 4. Sivir (net +1.17)

- **0.80** spell shield: Spell Shield's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna R Monsoon)
- **0.61** spell shield: Spell Shield's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna Q Howling Gale)
- **0.27** spell shield: Spell Shield's spell shield blocks Janna's Zephyr. Spell shield for 1.5 s, long enough to use ahead of Zephyr. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna W Zephyr)

### 5. Bard (net +1.11)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Janna's Monsoon. Untargetable for 2.5 s, long enough to use ahead of Monsoon. (Bard R Tempered Fate → Janna R Monsoon)
- **0.40** interrupt: Tempered Fate's stasis interrupts Janna's Monsoon (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Janna R Monsoon)
- **0.35** untargetable: Tempered Fate makes Bard untargetable, dodging Janna's Howling Gale. Untargetable for 2.5 s, long enough to use ahead of Howling Gale. (Bard R Tempered Fate → Janna Q Howling Gale)

### 6. Lissandra (net +1.11)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Janna's Monsoon. Untargetable for 2.5 s, long enough to use ahead of Monsoon. (Lissandra R Frozen Tomb → Janna R Monsoon)
- **0.40** interrupt: Frozen Tomb's stun interrupts Janna's Monsoon (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Janna R Monsoon)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Janna's Howling Gale. Untargetable for 2.5 s, long enough to use ahead of Howling Gale. (Lissandra R Frozen Tomb → Janna Q Howling Gale)

### 7. Braum (net +1.08)

- **0.70** projectile block: Unbreakable blocks Janna's Howling Gale, a projectile. Unbreakable for 4 s, long enough to use ahead of Howling Gale. (Braum E Unbreakable → Janna Q Howling Gale)
- **0.50** projectile block: Unbreakable blocks Janna's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Janna basic attacks)
- **0.40** interrupt: Concussive Blows's stun interrupts Janna's Monsoon (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 8. Yasuo (net +1.08)

- **0.63** projectile block: Wind Wall blocks Janna's Howling Gale, a projectile. Wind Wall for 4 s, long enough to use ahead of Howling Gale. (Yasuo W Wind Wall → Janna Q Howling Gale)
- **0.40** interrupt: Steel Tempest's airborne interrupts Janna's Monsoon (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Janna R Monsoon)
- **0.39** projectile block: Wind Wall blocks Janna's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Janna basic attacks)
- Watch out: Janna's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 9. Maokai (net +1.06)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Janna's Howling Gale. Untargetable for 1.4 s; Howling Gale takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Janna Q Howling Gale)
- **0.48** untargetable: Twisted Advance makes Maokai untargetable, dodging Janna's Monsoon. Untargetable for 1.4 s; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Janna R Monsoon)
- **0.40** interrupt: Bramble Smash's airborne interrupts Janna's Monsoon (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 10. Xayah (net +1.02)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Janna's Monsoon. Untargetable for 1.5 s, long enough to use ahead of Monsoon. (Xayah R Featherstorm → Janna R Monsoon)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Janna's Howling Gale. Untargetable for 1.5 s, long enough to use ahead of Howling Gale. (Xayah R Featherstorm → Janna Q Howling Gale)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Janna's Zephyr. Untargetable for 1.5 s, long enough to use ahead of Zephyr. (Xayah R Featherstorm → Janna W Zephyr)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.50 | 1.86 | 0.36 |  |
| 2 | Elise | +1.32 | 1.32 | 0.00 |  |
| 3 | Rek'Sai | +1.23 | 1.45 | 0.22 |  |
| 4 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 5 | Bard | +1.11 | 1.11 | 0.00 |  |
| 6 | Lissandra | +1.11 | 1.11 | 0.00 |  |
| 7 | Braum | +1.08 | 1.44 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 8 | Yasuo | +1.08 | 1.30 | 0.22 | projectile block (Wind Wall) |
| 9 | Maokai | +1.06 | 1.42 | 0.36 |  |
| 10 | Xayah | +1.02 | 1.02 | 0.00 |  |
| 11 | Morgana | +0.96 | 1.14 | 0.18 |  |
| 12 | Vladimir | +0.95 | 1.20 | 0.25 |  |
| 13 | Camille | +0.95 | 1.13 | 0.18 |  |
| 14 | Udyr | +0.90 | 1.26 | 0.36 |  |
| 15 | Kled | +0.89 | 1.03 | 0.14 |  |
| 16 | Evelynn | +0.87 | 1.11 | 0.24 |  |
| 17 | Shaco | +0.87 | 1.11 | 0.24 |  |
| 18 | Zaahen | +0.85 | 1.07 | 0.22 |  |
| 19 | Alistar | +0.83 | 1.19 | 0.36 |  |
| 20 | Kalista | +0.83 | 0.83 | 0.00 |  |
| 21 | Warwick | +0.80 | 1.30 | 0.50 |  |
| 22 | Fiora | +0.76 | 1.12 | 0.36 |  |
| 23 | Samira | +0.76 | 0.76 | 0.00 | projectile block (Blade Whirl) |
| 24 | Lulu | +0.74 | 0.74 | 0.00 |  |
| 25 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 26 | Mel | +0.72 | 0.72 | 0.00 | projectile block (Rebuttal) |
| 27 | K'Sante | +0.68 | 0.86 | 0.18 |  |
| 28 | Tristana | +0.67 | 0.67 | 0.00 |  |
| 29 | Vex | +0.63 | 0.63 | 0.00 |  |
| 30 | Sion | +0.60 | 1.40 | 0.80 |  |
| 31 | Malzahar | +0.59 | 0.99 | 0.40 |  |
| 32 | Gwen | +0.56 | 0.92 | 0.36 |  |
| 33 | Yuumi | +0.55 | 1.05 | 0.50 |  |
| 34 | Corki | +0.52 | 0.52 | 0.00 |  |
| 35 | Ekko | +0.49 | 0.73 | 0.24 |  |
| 36 | Annie | +0.48 | 0.48 | 0.00 |  |
| 37 | Teemo | +0.47 | 0.47 | 0.00 | blind (Blinding Dart) |
| 38 | Master Yi | +0.46 | 0.99 | 0.53 |  |
| 39 | Zed | +0.46 | 0.70 | 0.24 |  |
| 40 | Yone | +0.46 | 0.63 | 0.17 |  |
| 41 | Milio | +0.46 | 0.46 | 0.00 |  |
| 42 | Heimerdinger | +0.45 | 0.45 | 0.00 |  |
| 43 | Kayn | +0.44 | 1.11 | 0.67 |  |
| 44 | Nilah | +0.44 | 0.73 | 0.29 |  |
| 45 | Ornn | +0.41 | 0.63 | 0.22 |  |
| 46 | Malphite | +0.40 | 0.76 | 0.36 |  |
| 47 | Ahri | +0.40 | 0.40 | 0.00 |  |
| 48 | Anivia | +0.40 | 0.40 | 0.00 |  |
| 49 | Ashe | +0.40 | 0.40 | 0.00 |  |
| 50 | Azir | +0.40 | 0.40 | 0.00 |  |
| 51 | Brand | +0.40 | 0.40 | 0.00 |  |
| 52 | Cassiopeia | +0.40 | 0.40 | 0.00 |  |
| 53 | Draven | +0.40 | 0.40 | 0.00 |  |
| 54 | Gnar | +0.40 | 0.40 | 0.00 |  |
| 55 | Hwei | +0.40 | 0.40 | 0.00 |  |
| 56 | Jayce | +0.40 | 0.40 | 0.00 |  |
| 57 | Kennen | +0.40 | 0.40 | 0.00 |  |
| 58 | Nami | +0.40 | 0.40 | 0.00 |  |
| 59 | Neeko | +0.40 | 0.40 | 0.00 |  |
| 60 | Orianna | +0.40 | 0.40 | 0.00 |  |
| 61 | Renata Glasc | +0.40 | 0.40 | 0.00 |  |
| 62 | Seraphine | +0.40 | 0.40 | 0.00 |  |
| 63 | Sona | +0.40 | 0.40 | 0.00 |  |
| 64 | Soraka | +0.40 | 0.40 | 0.00 |  |
| 65 | Swain | +0.40 | 0.40 | 0.00 |  |
| 66 | Syndra | +0.40 | 0.40 | 0.00 |  |
| 67 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 68 | Veigar | +0.40 | 0.40 | 0.00 |  |
| 69 | Viktor | +0.40 | 0.40 | 0.00 |  |
| 70 | Ziggs | +0.40 | 0.40 | 0.00 |  |
| 71 | Zilean | +0.40 | 0.40 | 0.00 |  |
| 72 | Zoe | +0.40 | 0.40 | 0.00 |  |
| 73 | Zyra | +0.40 | 0.40 | 0.00 |  |
| 74 | Volibear | +0.39 | 0.63 | 0.24 |  |
| 75 | Kayle | +0.37 | 0.37 | 0.00 |  |
| 76 | Jarvan IV | +0.35 | 0.52 | 0.17 |  |
| 77 | Thresh | +0.34 | 0.40 | 0.06 |  |
| 78 | Aurelion Sol | +0.33 | 0.40 | 0.07 |  |
| 79 | Hecarim | +0.30 | 0.52 | 0.22 |  |
| 80 | Xin Zhao | +0.28 | 0.62 | 0.34 |  |
| 81 | Olaf | +0.27 | 0.99 | 0.72 |  |
| 82 | Sett | +0.27 | 0.63 | 0.36 |  |
| 83 | Rakan | +0.25 | 0.40 | 0.15 |  |
| 84 | Jax | +0.23 | 0.59 | 0.36 |  |
| 85 | Fizz | +0.23 | 0.40 | 0.17 |  |
| 86 | Quinn | +0.23 | 0.40 | 0.17 |  |
| 87 | Sylas | +0.23 | 0.40 | 0.17 |  |
| 88 | Gangplank | +0.22 | 0.94 | 0.72 |  |
| 89 | Rengar | +0.22 | 0.94 | 0.72 |  |
| 90 | Briar | +0.22 | 0.40 | 0.18 |  |
| 91 | Urgot | +0.22 | 0.40 | 0.18 |  |
| 92 | Varus | +0.22 | 0.32 | 0.10 |  |
| 93 | Kindred | +0.21 | 0.21 | 0.00 |  |
| 94 | Wukong | +0.18 | 0.40 | 0.22 |  |
| 95 | Rell | +0.18 | 0.40 | 0.22 |  |
| 96 | Lillia | +0.18 | 0.38 | 0.20 |  |
| 97 | Rammus | +0.17 | 0.76 | 0.59 |  |
| 98 | Viego | +0.17 | 0.52 | 0.35 |  |
| 99 | Singed | +0.16 | 0.88 | 0.72 |  |
| 100 | Shyvana | +0.16 | 0.52 | 0.36 |  |
| 101 | Ambessa | +0.16 | 0.40 | 0.24 |  |
| 102 | Bel'Veth | +0.16 | 0.40 | 0.24 |  |
| 103 | Lee Sin | +0.16 | 0.40 | 0.24 |  |
| 104 | Riven | +0.16 | 0.40 | 0.24 |  |
| 105 | Vel'Koz | +0.12 | 0.40 | 0.28 |  |
| 106 | Qiyana | +0.12 | 0.36 | 0.24 |  |
| 107 | Irelia | +0.08 | 0.40 | 0.32 |  |
| 108 | Xerath | +0.08 | 0.40 | 0.32 |  |
| 109 | Shen | +0.07 | 0.76 | 0.69 |  |
| 110 | Pantheon | +0.07 | 0.37 | 0.30 |  |
| 111 | Vi | +0.06 | 0.63 | 0.57 |  |
| 112 | Aatrox | +0.06 | 0.40 | 0.34 |  |
| 113 | Nautilus | +0.06 | 0.40 | 0.34 |  |
| 114 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 115 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 116 | Amumu | +0.04 | 0.40 | 0.36 |  |
| 117 | Diana | +0.04 | 0.40 | 0.36 |  |
| 118 | Kassadin | +0.04 | 0.40 | 0.36 |  |
| 119 | Leona | +0.04 | 0.40 | 0.36 |  |
| 120 | Renekton | +0.04 | 0.40 | 0.36 |  |
| 121 | Sejuani | +0.04 | 0.40 | 0.36 |  |
| 122 | Pyke | +0.03 | 0.40 | 0.37 |  |
| 123 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 124 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 125 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 126 | Karma | 0.00 | 0.00 | 0.00 |  |
| 127 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 128 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 129 | Lux | 0.00 | 0.00 | 0.00 |  |
| 130 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 131 | Senna | 0.00 | 0.00 | 0.00 |  |
| 132 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 133 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 134 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 135 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 136 | Galio | -0.02 | 0.40 | 0.42 |  |
| 137 | Fiddlesticks | -0.04 | 0.40 | 0.44 |  |
| 138 | Graves | -0.07 | 0.00 | 0.07 |  |
| 139 | Taliyah | -0.08 | 0.40 | 0.48 |  |
| 140 | Gragas | -0.10 | 0.40 | 0.50 |  |
| 141 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 142 | Taric | -0.11 | 0.61 | 0.72 |  |
| 143 | Illaoi | -0.13 | 0.23 | 0.36 |  |
| 144 | Poppy | -0.16 | 0.40 | 0.56 |  |
| 145 | Mordekaiser | -0.19 | 0.49 | 0.68 |  |
| 146 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 147 | Garen | -0.21 | 0.47 | 0.68 |  |
| 148 | Akali | -0.24 | 0.00 | 0.24 |  |
| 149 | Talon | -0.24 | 0.00 | 0.24 |  |
| 150 | Skarner | -0.26 | 0.46 | 0.72 |  |
| 151 | Darius | -0.28 | 0.40 | 0.68 |  |
| 152 | Trundle | -0.28 | 0.40 | 0.68 |  |
| 153 | Yorick | -0.28 | 0.40 | 0.68 |  |
| 154 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 155 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 156 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 157 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 158 | Blitzcrank | -0.32 | 0.40 | 0.72 |  |
| 159 | Cho'Gath | -0.32 | 0.40 | 0.72 |  |
| 160 | Katarina | -0.32 | 0.32 | 0.64 |  |
| 161 | Zac | -0.33 | 0.40 | 0.73 |  |
| 162 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 163 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 164 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 165 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 166 | Locke | -0.36 | 0.00 | 0.36 |  |
| 167 | Tahm Kench | -0.44 | 0.40 | 0.84 |  |
| 168 | Karthus | -0.46 | 0.00 | 0.46 |  |
| 169 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 170 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 171 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -0.75 | 0.46 | 1.21 |  |
