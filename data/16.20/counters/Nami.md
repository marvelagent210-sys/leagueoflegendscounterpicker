# Counters to Nami (patch 26.20)

Every champion ranked by what its kit does against Nami's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nami's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nami` for the full ledger of a matchup, with sources.

## Top 10

### 1. Fizz (net +1.16)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Nami's Tidal Wave. Untargetable for 0.75 s; Tidal Wave takes 3.74 s to land, enough to react. (Fizz E Playful → Nami R Tidal Wave)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Nami's Aqua Prison. Untargetable for 0.75 s; Aqua Prison takes 0.25 s to land, enough to react. (Fizz E Playful → Nami Q Aqua Prison)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Nami's Ebb and Flow. Untargetable for 0.75 s; Ebb and Flow takes 0.54 s to land, enough to react. (Fizz E Playful → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 2. Nocturne (net +1.14)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Nami's Tidal Wave. Spell shield for 1.5 s, long enough to use ahead of Tidal Wave. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami R Tidal Wave)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Nami's Aqua Prison. Spell shield for 1.5 s, long enough to use ahead of Aqua Prison. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami Q Aqua Prison)
- **0.41** spell shield: Shroud of Darkness's spell shield blocks Nami's Ebb and Flow. Spell shield for 1.5 s, long enough to use ahead of Ebb and Flow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nami W Ebb and Flow)
- Watch out: Nami's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

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
| 1 | Fizz | +1.16 | 1.26 | 0.10 |  |
| 2 | Nocturne | +1.14 | 1.36 | 0.22 |  |
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
| 16 | Camille | +0.93 | 1.04 | 0.11 |  |
| 17 | Gwen | +0.90 | 1.12 | 0.22 |  |
| 18 | Rek'Sai | +0.90 | 1.04 | 0.14 |  |
| 19 | Vladimir | +0.88 | 1.13 | 0.25 |  |
| 20 | Evelynn | +0.86 | 1.01 | 0.15 |  |
| 21 | Shaco | +0.86 | 1.01 | 0.15 |  |
| 22 | Zed | +0.86 | 1.01 | 0.15 |  |
| 23 | Kled | +0.84 | 0.92 | 0.08 |  |
| 24 | Zaahen | +0.82 | 0.96 | 0.14 |  |
| 25 | Master Yi | +0.78 | 1.32 | 0.54 |  |
| 26 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 27 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 28 | Alistar | +0.55 | 0.77 | 0.22 |  |
| 29 | Olaf | +0.52 | 0.96 | 0.44 |  |
| 30 | Rengar | +0.45 | 0.89 | 0.44 |  |
| 31 | Gangplank | +0.41 | 0.85 | 0.44 |  |
| 32 | Yuumi | +0.40 | 1.26 | 0.86 |  |
| 33 | Milio | +0.38 | 0.38 | 0.00 |  |
| 34 | Xin Zhao | +0.34 | 0.55 | 0.21 |  |
| 35 | Sion | +0.33 | 0.97 | 0.64 |  |
| 36 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 37 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 38 | K'Sante | +0.25 | 0.36 | 0.11 |  |
| 39 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 40 | Vex | +0.18 | 0.18 | 0.00 |  |
| 41 | Malphite | +0.10 | 0.32 | 0.22 |  |
| 42 | Jarvan IV | +0.08 | 0.18 | 0.10 |  |
| 43 | Yone | +0.08 | 0.18 | 0.10 |  |
| 44 | Annie | +0.08 | 0.08 | 0.00 |  |
| 45 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 46 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 47 | Hecarim | +0.05 | 0.19 | 0.14 |  |
| 48 | Ornn | +0.04 | 0.18 | 0.14 |  |
| 49 | Volibear | +0.03 | 0.18 | 0.15 |  |
| 50 | Kayn | +0.02 | 1.01 | 0.99 |  |
| 51 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 52 | Varus | +0.02 | 0.18 | 0.16 |  |
| 53 | Jax | +0.01 | 0.23 | 0.22 |  |
| 54 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 55 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 56 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Corki | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Elise | 0.00 | 0.00 | 0.00 |  |
| 63 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 64 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 65 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 66 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 67 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 68 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 69 | Karma | 0.00 | 0.00 | 0.00 |  |
| 70 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 71 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 72 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 73 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 74 | Lux | 0.00 | 0.00 | 0.00 |  |
| 75 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 76 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 77 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 78 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 79 | Senna | 0.00 | 0.00 | 0.00 |  |
| 80 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 81 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 82 | Sona | 0.00 | 0.00 | 0.00 |  |
| 83 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 84 | Swain | 0.00 | 0.00 | 0.00 |  |
| 85 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 86 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 87 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 88 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 89 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 90 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 91 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 92 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 93 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 94 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 95 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 96 | Garen | -0.04 | 0.37 | 0.41 |  |
| 97 | Illaoi | -0.04 | 0.18 | 0.22 |  |
| 98 | Sett | -0.04 | 0.18 | 0.22 |  |
| 99 | Shyvana | -0.04 | 0.18 | 0.22 |  |
| 100 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 101 | Graves | -0.05 | 0.00 | 0.05 |  |
| 102 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 103 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 104 | Briar | -0.11 | 0.00 | 0.11 |  |
| 105 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 106 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 107 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 108 | Rell | -0.14 | 0.00 | 0.14 |  |
| 109 | Akali | -0.15 | 0.00 | 0.15 |  |
| 110 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 111 | Aurelion Sol | -0.15 | 0.00 | 0.15 |  |
| 112 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 113 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 114 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 115 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 116 | Riven | -0.15 | 0.00 | 0.15 |  |
| 117 | Talon | -0.15 | 0.00 | 0.15 |  |
| 118 | Warwick | -0.17 | 1.15 | 1.32 |  |
| 119 | Singed | -0.17 | 0.27 | 0.44 |  |
| 120 | Malzahar | -0.18 | 0.57 | 0.75 |  |
| 121 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 122 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 123 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 124 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 125 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 126 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 127 | Diana | -0.22 | 0.00 | 0.22 |  |
| 128 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 129 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 130 | Leona | -0.22 | 0.00 | 0.22 |  |
| 131 | Locke | -0.22 | 0.00 | 0.22 |  |
| 132 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 133 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 134 | Ivern | -0.26 | 0.00 | 0.26 |  |
| 135 | Viego | -0.28 | 0.18 | 0.46 |  |
| 136 | Skarner | -0.34 | 0.10 | 0.44 |  |
| 137 | Quinn | -0.34 | 0.00 | 0.34 |  |
| 138 | Caitlyn | -0.36 | 0.18 | 0.54 |  |
| 139 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 140 | Darius | -0.41 | 0.00 | 0.41 |  |
| 141 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 142 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 143 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 144 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 145 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 146 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 147 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 148 | Taric | -0.44 | 0.00 | 0.44 |  |
| 149 | Rammus | -0.45 | 0.22 | 0.67 |  |
| 150 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 151 | Pantheon | -0.50 | 0.62 | 1.12 |  |
| 152 | Katarina | -0.50 | 0.18 | 0.68 |  |
| 153 | Akshan | -0.51 | 0.00 | 0.51 |  |
| 154 | Vel'Koz | -0.52 | 0.00 | 0.52 |  |
| 155 | Jhin | -0.54 | 0.00 | 0.54 |  |
| 156 | Lucian | -0.54 | 0.00 | 0.54 |  |
| 157 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 158 | Vi | -0.62 | 0.18 | 0.80 |  |
| 159 | Poppy | -0.62 | 0.00 | 0.62 |  |
| 160 | Xerath | -0.63 | 0.00 | 0.63 |  |
| 161 | Karthus | -0.67 | 0.00 | 0.67 |  |
| 162 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 163 | Twisted Fate | -0.70 | 0.00 | 0.70 |  |
| 164 | Janna | -0.80 | 0.00 | 0.80 |  |
| 165 | Shen | -0.83 | 0.22 | 1.05 |  |
| 166 | Fiddlesticks | -0.83 | 0.00 | 0.83 |  |
| 167 | Zac | -0.94 | 0.00 | 0.94 |  |
| 168 | Naafiri | -0.96 | 0.00 | 0.96 |  |
| 169 | Tahm Kench | -0.96 | 0.00 | 0.96 |  |
| 170 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 171 | Nunu & Willump | -1.02 | 0.25 | 1.27 |  |
| 172 | Galio | -1.28 | 0.00 | 1.28 |  |
