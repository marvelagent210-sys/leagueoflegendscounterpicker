# Counters to Nami (patch 26.20)

Every champion ranked by what its kit does against Nami's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nami's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nami` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.14)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Nami's Tidal Wave. Spell shield for 1.5 s, long enough to use ahead of Tidal Wave. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami R Tidal Wave)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Nami's Aqua Prison. Spell shield for 1.5 s, long enough to use ahead of Aqua Prison. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami Q Aqua Prison)
- **0.41** spell shield: Shroud of Darkness's spell shield blocks Nami's Ebb and Flow. Spell shield for 1.5 s, long enough to use ahead of Ebb and Flow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 2. Elise (net +1.12)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Nami's Tidal Wave. Untargetable for 0.6 s; Tidal Wave takes 3.74 s to land, enough to react. (Elise E Rappel → Nami R Tidal Wave)
- **0.47** untargetable: Rappel makes Elise untargetable, dodging Nami's Aqua Prison. Untargetable for 0.6 s; Aqua Prison takes 0.25 s to land, enough to react. (Elise E Rappel → Nami Q Aqua Prison)
- **0.33** untargetable: Rappel makes Elise untargetable, dodging Nami's Ebb and Flow. Untargetable for 0.6 s; Ebb and Flow takes 0.54 s to land, enough to react. (Elise E Rappel → Nami W Ebb and Flow)

### 3. Sivir (net +1.12)

- **0.80** spell shield: Spell Shield's spell shield blocks Nami's Tidal Wave. Spell shield for 1.5 s, long enough to use ahead of Tidal Wave. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami R Tidal Wave)
- **0.47** spell shield: Spell Shield's spell shield blocks Nami's Aqua Prison. Spell shield for 1.5 s, long enough to use ahead of Aqua Prison. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami Q Aqua Prison)
- **0.33** spell shield: Spell Shield's spell shield blocks Nami's Ebb and Flow. Spell shield for 1.5 s, long enough to use ahead of Ebb and Flow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nami W Ebb and Flow)

### 4. Samira (net +1.11)

- **0.80** projectile block: Blade Whirl blocks Nami's Tidal Wave, a projectile. Blade Whirl for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Samira W Blade Whirl → Nami R Tidal Wave)
- **0.43** projectile block: Blade Whirl blocks Nami's Aqua Prison, a projectile. Blade Whirl for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Nami Q Aqua Prison)
- **0.30** projectile block: Blade Whirl blocks Nami's Ebb and Flow, a projectile. Blade Whirl for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Samira W Blade Whirl → Nami W Ebb and Flow)

### 5. Mel (net +1.10)

- **0.80** projectile block: Rebuttal blocks Nami's Tidal Wave, a projectile. Rebuttal for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Mel W Rebuttal → Nami R Tidal Wave)
- **0.41** projectile block: Rebuttal blocks Nami's Aqua Prison, a projectile. Rebuttal for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Mel W Rebuttal → Nami Q Aqua Prison)
- **0.28** projectile block: Rebuttal blocks Nami's Ebb and Flow, a projectile. Rebuttal for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Mel W Rebuttal → Nami W Ebb and Flow)

### 6. Braum (net +1.08)

- **0.80** projectile block: Unbreakable blocks Nami's Tidal Wave, a projectile. Unbreakable for 4 s, long enough to use ahead of Tidal Wave. (Braum E Unbreakable → Nami R Tidal Wave)
- **0.70** projectile block: Unbreakable blocks Nami's Aqua Prison, a projectile. Unbreakable for 4 s, long enough to use ahead of Aqua Prison. (Braum E Unbreakable → Nami Q Aqua Prison)
- **0.45** projectile block: Unbreakable blocks Nami's Ebb and Flow, a projectile. Unbreakable for 4 s, long enough to use ahead of Ebb and Flow. (Braum E Unbreakable → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 7. Fiora (net +1.07)

- **0.90** parry: Riposte parries Nami's Tidal Wave and stuns back. Parry for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. Negating Tidal Wave's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nami R Tidal Wave)
- **0.59** parry: Riposte parries Nami's Aqua Prison and stuns back. Parry for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. Negating Aqua Prison's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nami Q Aqua Prison)
- **0.35** parry: Riposte parries Nami's Ebb and Flow. Parry for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Fiora W Riposte → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 8. Aurora (net +1.03)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Tidal Wave. Untargetable for 0.4 s; Tidal Wave takes 3.74 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami R Tidal Wave)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Aqua Prison. Untargetable for 0.4 s; Aqua Prison takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami Q Aqua Prison)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Nami's Ebb and Flow. Untargetable for 0.4 s; Ebb and Flow takes 0.54 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nami W Ebb and Flow)

### 9. Yasuo (net +1.02)

- **0.80** projectile block: Wind Wall blocks Nami's Tidal Wave, a projectile. Wind Wall for 4 s, long enough to use ahead of Tidal Wave. (Yasuo W Wind Wall → Nami R Tidal Wave)
- **0.48** projectile block: Wind Wall blocks Nami's Aqua Prison, a projectile. Wind Wall for 4 s, long enough to use ahead of Aqua Prison. (Yasuo W Wind Wall → Nami Q Aqua Prison)
- **0.34** projectile block: Wind Wall blocks Nami's Ebb and Flow, a projectile. Wind Wall for 4 s, long enough to use ahead of Ebb and Flow. (Yasuo W Wind Wall → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 10. Bard (net +1.01)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Tidal Wave. Untargetable for 2.5 s, long enough to use ahead of Tidal Wave. (Bard R Tempered Fate → Nami R Tidal Wave)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Aqua Prison. Untargetable for 2.5 s, long enough to use ahead of Aqua Prison. (Bard R Tempered Fate → Nami Q Aqua Prison)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Nami's Ebb and Flow. Untargetable for 2.5 s, long enough to use ahead of Ebb and Flow. (Bard R Tempered Fate → Nami W Ebb and Flow)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.14 | 1.36 | 0.22 |  |
| 2 | Elise | +1.12 | 1.12 | 0.00 |  |
| 3 | Sivir | +1.12 | 1.12 | 0.00 |  |
| 4 | Samira | +1.11 | 1.11 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 5 | Mel | +1.10 | 1.10 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 6 | Braum | +1.08 | 1.30 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +1.07 | 1.29 | 0.22 |  |
| 8 | Aurora | +1.03 | 1.03 | 0.00 |  |
| 9 | Yasuo | +1.02 | 1.16 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 10 | Bard | +1.01 | 1.01 | 0.00 |  |
| 11 | Lissandra | +1.01 | 1.01 | 0.00 |  |
| 12 | Xayah | +1.01 | 1.01 | 0.00 |  |
| 13 | Maokai | +1.00 | 1.22 | 0.22 |  |
| 14 | Morgana | +0.94 | 1.05 | 0.11 |  |
| 15 | Udyr | +0.93 | 1.15 | 0.22 |  |
| 16 | Vladimir | +0.93 | 1.13 | 0.20 |  |
| 17 | Camille | +0.93 | 1.04 | 0.11 |  |
| 18 | Gwen | +0.90 | 1.12 | 0.22 |  |
| 19 | Rek'Sai | +0.90 | 1.04 | 0.14 |  |
| 20 | Master Yi | +0.88 | 1.32 | 0.44 |  |
| 21 | Ekko | +0.88 | 1.03 | 0.15 |  |
| 22 | Evelynn | +0.86 | 1.01 | 0.15 |  |
| 23 | Shaco | +0.86 | 1.01 | 0.15 |  |
| 24 | Zed | +0.86 | 1.01 | 0.15 |  |
| 25 | Kled | +0.84 | 0.92 | 0.08 |  |
| 26 | Zaahen | +0.82 | 0.96 | 0.14 |  |
| 27 | Yuumi | +0.77 | 1.26 | 0.49 |  |
| 28 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 29 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 30 | Warwick | +0.66 | 1.15 | 0.49 |  |
| 31 | Alistar | +0.55 | 0.77 | 0.22 |  |
| 32 | Olaf | +0.52 | 0.96 | 0.44 |  |
| 33 | Kindred | +0.50 | 0.50 | 0.00 |  |
| 34 | Rengar | +0.45 | 0.89 | 0.44 |  |
| 35 | Kayn | +0.42 | 1.01 | 0.59 |  |
| 36 | Sion | +0.41 | 0.97 | 0.56 |  |
| 37 | Gangplank | +0.41 | 0.85 | 0.44 |  |
| 38 | Milio | +0.38 | 0.38 | 0.00 |  |
| 39 | Pantheon | +0.37 | 0.62 | 0.25 |  |
| 40 | Xin Zhao | +0.34 | 0.55 | 0.21 |  |
| 41 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 42 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 43 | K'Sante | +0.25 | 0.36 | 0.11 |  |
| 44 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 45 | Corki | +0.18 | 0.18 | 0.00 |  |
| 46 | Vex | +0.18 | 0.18 | 0.00 |  |
| 47 | Malzahar | +0.17 | 0.57 | 0.40 |  |
| 48 | Malphite | +0.10 | 0.32 | 0.22 |  |
| 49 | Jarvan IV | +0.08 | 0.18 | 0.10 |  |
| 50 | Yone | +0.08 | 0.18 | 0.10 |  |
| 51 | Annie | +0.08 | 0.08 | 0.00 |  |
| 52 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 53 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 54 | Varus | +0.07 | 0.18 | 0.11 |  |
| 55 | Taric | +0.06 | 0.50 | 0.44 |  |
| 56 | Hecarim | +0.05 | 0.19 | 0.14 |  |
| 57 | Ornn | +0.04 | 0.18 | 0.14 |  |
| 58 | Volibear | +0.03 | 0.18 | 0.15 |  |
| 59 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 60 | Jax | +0.01 | 0.23 | 0.22 |  |
| 61 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 62 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 63 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 64 | Azir | 0.00 | 0.00 | 0.00 |  |
| 65 | Brand | 0.00 | 0.00 | 0.00 |  |
| 66 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 67 | Draven | 0.00 | 0.00 | 0.00 |  |
| 68 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 69 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 70 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 71 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 72 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 73 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 74 | Karma | 0.00 | 0.00 | 0.00 |  |
| 75 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 76 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 77 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 78 | Lux | 0.00 | 0.00 | 0.00 |  |
| 79 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 80 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 81 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 82 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 83 | Senna | 0.00 | 0.00 | 0.00 |  |
| 84 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 85 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 86 | Sona | 0.00 | 0.00 | 0.00 |  |
| 87 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 88 | Swain | 0.00 | 0.00 | 0.00 |  |
| 89 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 94 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 95 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 96 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 97 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 98 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 99 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 100 | Garen | -0.04 | 0.37 | 0.41 |  |
| 101 | Illaoi | -0.04 | 0.18 | 0.22 |  |
| 102 | Sett | -0.04 | 0.18 | 0.22 |  |
| 103 | Shyvana | -0.04 | 0.18 | 0.22 |  |
| 104 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 105 | Graves | -0.05 | 0.00 | 0.05 |  |
| 106 | Aurelion Sol | -0.09 | 0.00 | 0.09 |  |
| 107 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 108 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 109 | Fizz | -0.10 | 0.00 | 0.10 |  |
| 110 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 111 | Briar | -0.11 | 0.00 | 0.11 |  |
| 112 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 113 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 114 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 115 | Rell | -0.14 | 0.00 | 0.14 |  |
| 116 | Akali | -0.15 | 0.00 | 0.15 |  |
| 117 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 118 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 119 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 120 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 121 | Riven | -0.15 | 0.00 | 0.15 |  |
| 122 | Talon | -0.15 | 0.00 | 0.15 |  |
| 123 | Singed | -0.17 | 0.27 | 0.44 |  |
| 124 | Viego | -0.17 | 0.18 | 0.35 |  |
| 125 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 126 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 127 | Quinn | -0.20 | 0.00 | 0.20 |  |
| 128 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 129 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 130 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 131 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 132 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 133 | Diana | -0.22 | 0.00 | 0.22 |  |
| 134 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 135 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 136 | Leona | -0.22 | 0.00 | 0.22 |  |
| 137 | Locke | -0.22 | 0.00 | 0.22 |  |
| 138 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 139 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 145 | Rammus | -0.30 | 0.22 | 0.52 |  |
| 146 | Katarina | -0.32 | 0.18 | 0.50 |  |
| 147 | Galio | -0.33 | 0.00 | 0.33 |  |
| 148 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 149 | Xerath | -0.33 | 0.00 | 0.33 |  |
| 150 | Skarner | -0.34 | 0.10 | 0.44 |  |
| 151 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 152 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 153 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 154 | Shen | -0.38 | 0.22 | 0.60 |  |
| 155 | Gragas | -0.39 | 0.00 | 0.39 |  |
| 156 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 157 | Vi | -0.40 | 0.18 | 0.58 |  |
| 158 | Janna | -0.40 | 0.00 | 0.40 |  |
| 159 | Darius | -0.41 | 0.00 | 0.41 |  |
| 160 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 161 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 162 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 163 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 164 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 165 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 166 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 167 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 168 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 169 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 170 | Nunu & Willump | -0.68 | 0.25 | 0.93 |  |
| 171 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 172 | Zac | -0.71 | 0.00 | 0.71 |  |
