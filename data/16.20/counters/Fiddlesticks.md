# Counters to Fiddlesticks (patch 26.20)

Every champion ranked by what its kit does against Fiddlesticks's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fiddlesticks's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fiddlesticks` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.34)

- **0.58** untargetable: Rappel makes Elise untargetable, dodging Fiddlesticks's Terrify. Untargetable for 0.6 s; Terrify takes 0.35 s to land, enough to react. (Elise E Rappel → Fiddlesticks Q Terrify)
- **0.42** untargetable: Rappel makes Elise untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 0.6 s; Crowstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Cocoon's stun interrupts Fiddlesticks's Crowstorm (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Fiddlesticks R Crowstorm)

### 2. Maokai (net +1.30)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Fiddlesticks's Terrify. Untargetable for 1.4 s; Terrify takes 0.35 s to land, enough to react. (Maokai W Twisted Advance → Fiddlesticks Q Terrify)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 1.4 s; Crowstorm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Bramble Smash's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Fiddlesticks R Crowstorm)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Maokai's (480 vs 125 attack range).

### 3. Rek'Sai (net +1.30)

- **0.70** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 1.5 s, long enough to use ahead of Crowstorm. (Rek'Sai R Void Rush → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Unburrow's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Fiddlesticks R Crowstorm)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fiddlesticks's Terrify. Untargetable for 1.5 s, long enough to use ahead of Terrify. (Rek'Sai R Void Rush → Fiddlesticks Q Terrify)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Rek'Sai's (480 vs 175 attack range).

### 4. Braum (net +1.14)

- **0.70** projectile block: Unbreakable blocks Fiddlesticks's Terrify, a projectile. Unbreakable for 4 s, long enough to use ahead of Terrify. (Braum E Unbreakable → Fiddlesticks Q Terrify)
- **0.35** interrupt: Concussive Blows's stun interrupts Fiddlesticks's Crowstorm (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Fiddlesticks R Crowstorm)
- **0.31** projectile block: Unbreakable blocks Fiddlesticks's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Fiddlesticks basic attacks)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Braum's (480 vs 125 attack range).

### 5. Nocturne (net +1.11)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Fiddlesticks's Terrify. Spell shield for 1.5 s, long enough to use ahead of Terrify. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Fiddlesticks Q Terrify)
- **0.35** interrupt: Unspeakable Horror's fear interrupts Fiddlesticks's Crowstorm (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Fiddlesticks R Crowstorm)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks Fiddlesticks's Reap. Spell shield for 1.5 s, long enough to use ahead of Reap. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Fiddlesticks E Reap)
- Watch out: Fiddlesticks's basic attacks reach 355 units farther than Nocturne's (480 vs 125 attack range).

### 6. Yasuo (net +1.10)

- **0.60** projectile block: Wind Wall blocks Fiddlesticks's Terrify, a projectile. Wind Wall for 4 s, long enough to use ahead of Terrify. (Yasuo W Wind Wall → Fiddlesticks Q Terrify)
- **0.35** interrupt: Steel Tempest's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Fiddlesticks R Crowstorm)
- **0.24** projectile block: Wind Wall blocks Fiddlesticks's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Fiddlesticks basic attacks)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Yasuo's (480 vs 175 attack range).

### 7. Xin Zhao (net +1.05)

- **0.62** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Fiddlesticks's Crowstorm. Invulnerable for 4 s, long enough to use ahead of Crowstorm. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Three Talon Strike's airborne interrupts Fiddlesticks's Crowstorm (movement channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Fiddlesticks R Crowstorm)
- **0.23** interrupt: Three Talon Strike's airborne interrupts Fiddlesticks's Bountiful Harvest (normal channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Fiddlesticks W Bountiful Harvest)
- Watch out: Fiddlesticks's basic attacks reach 305 units farther than Xin Zhao's (480 vs 175 attack range).

### 8. Vladimir (net +1.01)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 2 s, long enough to use ahead of Crowstorm. (Vladimir W Sanguine Pool → Fiddlesticks R Crowstorm)
- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiddlesticks's Terrify. Untargetable for 2 s, long enough to use ahead of Terrify. (Vladimir W Sanguine Pool → Fiddlesticks Q Terrify)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiddlesticks's Reap. Untargetable for 2 s, long enough to use ahead of Reap. (Vladimir W Sanguine Pool → Fiddlesticks E Reap)
- Watch out: Reap's silence interrupts Vladimir's Tides of Blood (charge-up).

### 9. Bard (net +1.00)

- **0.70** untargetable: Tempered Fate makes Bard untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 2.5 s, long enough to use ahead of Crowstorm. (Bard R Tempered Fate → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Tempered Fate's stasis interrupts Fiddlesticks's Crowstorm (movement channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Fiddlesticks R Crowstorm)
- **0.35** untargetable: Tempered Fate makes Bard untargetable, dodging Fiddlesticks's Terrify. Untargetable for 2.5 s, long enough to use ahead of Terrify. (Bard R Tempered Fate → Fiddlesticks Q Terrify)

### 10. Lissandra (net +1.00)

- **0.70** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Fiddlesticks's Crowstorm. Untargetable for 2.5 s, long enough to use ahead of Crowstorm. (Lissandra R Frozen Tomb → Fiddlesticks R Crowstorm)
- **0.35** interrupt: Frozen Tomb's stun interrupts Fiddlesticks's Crowstorm (movement channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Fiddlesticks R Crowstorm)
- **0.35** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Fiddlesticks's Terrify. Untargetable for 2.5 s, long enough to use ahead of Terrify. (Lissandra R Frozen Tomb → Fiddlesticks Q Terrify)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.34 | 1.34 | 0.00 |  |
| 2 | Maokai | +1.30 | 1.50 | 0.20 |  |
| 3 | Rek'Sai | +1.30 | 1.41 | 0.11 |  |
| 4 | Braum | +1.14 | 1.34 | 0.20 | projectile block (Unbreakable) |
| 5 | Nocturne | +1.11 | 1.31 | 0.20 |  |
| 6 | Yasuo | +1.10 | 1.21 | 0.11 | projectile block (Wind Wall) |
| 7 | Xin Zhao | +1.05 | 1.22 | 0.17 |  |
| 8 | Vladimir | +1.01 | 1.11 | 0.10 |  |
| 9 | Bard | +1.00 | 1.00 | 0.00 |  |
| 10 | Lissandra | +1.00 | 1.00 | 0.00 |  |
| 11 | Camille | +0.98 | 1.08 | 0.10 |  |
| 12 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 13 | Evelynn | +0.90 | 1.11 | 0.21 |  |
| 14 | Fiora | +0.85 | 1.03 | 0.18 |  |
| 15 | Xayah | +0.85 | 0.85 | 0.00 |  |
| 16 | Milio | +0.84 | 0.84 | 0.00 |  |
| 17 | Kled | +0.80 | 0.86 | 0.06 |  |
| 18 | Taric | +0.77 | 1.13 | 0.36 |  |
| 19 | Udyr | +0.77 | 0.97 | 0.20 |  |
| 20 | Zaahen | +0.77 | 0.88 | 0.11 |  |
| 21 | Shaco | +0.76 | 1.09 | 0.33 |  |
| 22 | Cassiopeia | +0.73 | 0.73 | 0.00 |  |
| 23 | Sivir | +0.72 | 0.72 | 0.00 |  |
| 24 | Morgana | +0.71 | 0.71 | 0.00 |  |
| 25 | Pantheon | +0.70 | 0.92 | 0.22 |  |
| 26 | Gwen | +0.70 | 0.88 | 0.18 |  |
| 27 | Singed | +0.69 | 1.08 | 0.39 |  |
| 28 | Samira | +0.65 | 0.65 | 0.00 | projectile block (Blade Whirl) |
| 29 | Yuumi | +0.64 | 1.07 | 0.43 |  |
| 30 | Master Yi | +0.62 | 1.02 | 0.40 |  |
| 31 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 32 | Mel | +0.60 | 0.60 | 0.00 | projectile block (Rebuttal) |
| 33 | Alistar | +0.58 | 0.78 | 0.20 |  |
| 34 | Kayn | +0.56 | 1.12 | 0.56 |  |
| 35 | Nilah | +0.56 | 0.70 | 0.14 |  |
| 36 | Ekko | +0.56 | 0.69 | 0.13 |  |
| 37 | Heimerdinger | +0.54 | 0.54 | 0.00 |  |
| 38 | Anivia | +0.52 | 0.52 | 0.00 |  |
| 39 | Annie | +0.50 | 0.50 | 0.00 |  |
| 40 | Malzahar | +0.49 | 0.89 | 0.40 |  |
| 41 | Tristana | +0.49 | 0.49 | 0.00 |  |
| 42 | Ashe | +0.48 | 0.48 | 0.00 |  |
| 43 | Zed | +0.47 | 0.60 | 0.13 |  |
| 44 | Brand | +0.47 | 0.47 | 0.00 |  |
| 45 | Kindred | +0.47 | 0.47 | 0.00 |  |
| 46 | Nami | +0.47 | 0.47 | 0.00 |  |
| 47 | Zilean | +0.47 | 0.47 | 0.00 |  |
| 48 | Aurora | +0.45 | 0.60 | 0.15 |  |
| 49 | Corki | +0.45 | 0.45 | 0.00 |  |
| 50 | Hwei | +0.45 | 0.45 | 0.00 |  |
| 51 | Jayce | +0.45 | 0.45 | 0.00 |  |
| 52 | Kalista | +0.45 | 0.45 | 0.00 |  |
| 53 | Kennen | +0.45 | 0.45 | 0.00 |  |
| 54 | Swain | +0.45 | 0.45 | 0.00 |  |
| 55 | Thresh | +0.45 | 0.45 | 0.00 |  |
| 56 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 57 | Draven | +0.44 | 0.44 | 0.00 |  |
| 58 | Seraphine | +0.44 | 0.44 | 0.00 |  |
| 59 | Veigar | +0.44 | 0.44 | 0.00 |  |
| 60 | Ziggs | +0.44 | 0.44 | 0.00 |  |
| 61 | Zoe | +0.44 | 0.44 | 0.00 |  |
| 62 | Renata Glasc | +0.43 | 0.43 | 0.00 |  |
| 63 | Soraka | +0.43 | 0.43 | 0.00 |  |
| 64 | Syndra | +0.43 | 0.43 | 0.00 |  |
| 65 | Vex | +0.43 | 0.43 | 0.00 |  |
| 66 | Mordekaiser | +0.42 | 0.76 | 0.34 |  |
| 67 | Gnar | +0.42 | 0.42 | 0.00 |  |
| 68 | Zyra | +0.42 | 0.42 | 0.00 |  |
| 69 | Orianna | +0.40 | 0.40 | 0.00 |  |
| 70 | Viktor | +0.40 | 0.40 | 0.00 |  |
| 71 | Garen | +0.39 | 0.73 | 0.34 |  |
| 72 | Yone | +0.39 | 0.47 | 0.08 |  |
| 73 | Sion | +0.38 | 0.90 | 0.52 |  |
| 74 | Jax | +0.38 | 0.58 | 0.20 |  |
| 75 | K'Sante | +0.38 | 0.47 | 0.09 |  |
| 76 | Azir | +0.38 | 0.38 | 0.00 |  |
| 77 | Sylas | +0.37 | 0.45 | 0.08 |  |
| 78 | Urgot | +0.37 | 0.44 | 0.07 |  |
| 79 | Ornn | +0.36 | 0.47 | 0.11 |  |
| 80 | Sona | +0.36 | 0.36 | 0.00 |  |
| 81 | Bel'Veth | +0.35 | 0.47 | 0.12 |  |
| 82 | Warwick | +0.34 | 0.87 | 0.53 |  |
| 83 | Rell | +0.34 | 0.45 | 0.11 |  |
| 84 | Volibear | +0.33 | 0.45 | 0.12 |  |
| 85 | Fizz | +0.32 | 0.40 | 0.08 |  |
| 86 | Riven | +0.31 | 0.44 | 0.13 |  |
| 87 | Rakan | +0.31 | 0.38 | 0.07 |  |
| 88 | Malphite | +0.30 | 0.50 | 0.20 |  |
| 89 | Aatrox | +0.30 | 0.47 | 0.17 |  |
| 90 | Irelia | +0.30 | 0.45 | 0.15 |  |
| 91 | Vayne | +0.30 | 0.44 | 0.14 |  |
| 92 | Briar | +0.30 | 0.40 | 0.10 |  |
| 93 | Jarvan IV | +0.30 | 0.38 | 0.08 |  |
| 94 | Kassadin | +0.29 | 0.47 | 0.18 |  |
| 95 | Sejuani | +0.29 | 0.47 | 0.18 |  |
| 96 | Shen | +0.28 | 0.86 | 0.58 |  |
| 97 | Lee Sin | +0.28 | 0.41 | 0.13 |  |
| 98 | Leona | +0.27 | 0.47 | 0.20 |  |
| 99 | Renekton | +0.27 | 0.47 | 0.20 |  |
| 100 | Shyvana | +0.27 | 0.45 | 0.18 |  |
| 101 | Neeko | +0.27 | 0.38 | 0.11 |  |
| 102 | Aurelion Sol | +0.26 | 0.36 | 0.10 |  |
| 103 | Sett | +0.25 | 0.45 | 0.20 |  |
| 104 | Hecarim | +0.25 | 0.36 | 0.11 |  |
| 105 | Lillia | +0.25 | 0.34 | 0.09 |  |
| 106 | Quinn | +0.24 | 0.47 | 0.23 |  |
| 107 | Amumu | +0.24 | 0.44 | 0.20 |  |
| 108 | Nautilus | +0.23 | 0.40 | 0.17 |  |
| 109 | Ambessa | +0.23 | 0.36 | 0.13 |  |
| 110 | Gangplank | +0.22 | 0.61 | 0.39 |  |
| 111 | Diana | +0.22 | 0.40 | 0.18 |  |
| 112 | Teemo | +0.21 | 0.29 | 0.08 |  |
| 113 | Galio | +0.17 | 0.47 | 0.30 |  |
| 114 | Vel'Koz | +0.17 | 0.45 | 0.28 |  |
| 115 | Skarner | +0.14 | 0.50 | 0.36 |  |
| 116 | Twisted Fate | +0.12 | 0.47 | 0.35 |  |
| 117 | Rammus | +0.11 | 0.66 | 0.55 |  |
| 118 | Rengar | +0.11 | 0.64 | 0.53 |  |
| 119 | Xerath | +0.11 | 0.44 | 0.33 |  |
| 120 | Varus | +0.11 | 0.22 | 0.11 |  |
| 121 | Yorick | +0.10 | 0.44 | 0.34 |  |
| 122 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 123 | Darius | +0.09 | 0.43 | 0.34 |  |
| 124 | Trundle | +0.09 | 0.43 | 0.34 |  |
| 125 | Blitzcrank | +0.08 | 0.47 | 0.39 |  |
| 126 | Cho'Gath | +0.08 | 0.47 | 0.39 |  |
| 127 | Wukong | +0.07 | 0.38 | 0.31 |  |
| 128 | Yunara | +0.06 | 0.06 | 0.00 |  |
| 129 | Gragas | +0.04 | 0.44 | 0.40 |  |
| 130 | Janna | +0.04 | 0.44 | 0.40 |  |
| 131 | Pyke | +0.03 | 0.44 | 0.41 |  |
| 132 | Qiyana | +0.03 | 0.33 | 0.30 |  |
| 133 | Olaf | +0.02 | 0.41 | 0.39 |  |
| 134 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 135 | Graves | 0.00 | 0.00 | 0.00 |  |
| 136 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 137 | Karma | 0.00 | 0.00 | 0.00 |  |
| 138 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 139 | Lux | 0.00 | 0.00 | 0.00 |  |
| 140 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 141 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 142 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 143 | Taliyah | -0.04 | 0.44 | 0.48 |  |
| 144 | Viego | -0.04 | 0.40 | 0.44 |  |
| 145 | Poppy | -0.04 | 0.36 | 0.40 |  |
| 146 | Senna | -0.05 | 0.06 | 0.11 |  |
| 147 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 148 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 149 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 150 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 151 | Vi | -0.16 | 0.47 | 0.63 |  |
| 152 | Nasus | -0.17 | 0.22 | 0.39 |  |
| 153 | Tryndamere | -0.17 | 0.00 | 0.17 |  |
| 154 | Caitlyn | -0.18 | 0.10 | 0.28 |  |
| 155 | Tahm Kench | -0.20 | 0.47 | 0.67 |  |
| 156 | Illaoi | -0.20 | 0.00 | 0.20 |  |
| 157 | Locke | -0.20 | 0.00 | 0.20 |  |
| 158 | Zac | -0.22 | 0.45 | 0.67 |  |
| 159 | Akali | -0.24 | 0.00 | 0.24 |  |
| 160 | Talon | -0.27 | 0.00 | 0.27 |  |
| 161 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 162 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 163 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 164 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 165 | Katarina | -0.30 | 0.18 | 0.48 |  |
| 166 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 167 | Nunu & Willump | -0.39 | 0.49 | 0.88 |  |
| 168 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 169 | Rumble | -0.39 | 0.00 | 0.39 |  |
| 170 | Kha'Zix | -0.41 | 0.00 | 0.41 |  |
| 171 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 172 | Naafiri | -0.55 | 0.00 | 0.55 |  |
