# Counters to Heimerdinger (patch 26.20)

Every champion ranked by what its kit does against Heimerdinger's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Heimerdinger's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Heimerdinger` for the full ledger of a matchup, with sources.

## Top 10

### 1. Braum (net +0.94)

- **0.70** projectile block: Unbreakable blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Unbreakable for 4 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Braum E Unbreakable → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** projectile block: Unbreakable blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Unbreakable for 4 s, long enough to use ahead of CH-3X Lightning Grenade. (Braum E Unbreakable → Heimerdinger E CH-3X Lightning Grenade)
- **0.45** projectile block: Unbreakable blocks Heimerdinger's H-28G Evolution Turret, a projectile. Unbreakable for 4 s, long enough to use ahead of H-28G Evolution Turret. (Braum E Unbreakable → Heimerdinger Q H-28G Evolution Turret)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 2. Samira (net +0.90)

- **0.49** projectile block: Blade Whirl blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Blade Whirl for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.49** projectile block: Blade Whirl blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Blade Whirl for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger E CH-3X Lightning Grenade)
- **0.43** projectile block: Blade Whirl blocks Heimerdinger's H-28G Evolution Turret, a projectile. Blade Whirl for 0.75 s; H-28G Evolution Turret takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Heimerdinger Q H-28G Evolution Turret)

### 3. Yasuo (net +0.88)

- **0.55** projectile block: Wind Wall blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Wind Wall for 4 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Yasuo W Wind Wall → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.55** projectile block: Wind Wall blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Wind Wall for 4 s, long enough to use ahead of CH-3X Lightning Grenade. (Yasuo W Wind Wall → Heimerdinger E CH-3X Lightning Grenade)
- **0.45** projectile block: Wind Wall blocks Heimerdinger's H-28G Evolution Turret, a projectile. Wind Wall for 4 s, long enough to use ahead of H-28G Evolution Turret. (Yasuo W Wind Wall → Heimerdinger Q H-28G Evolution Turret)
- Watch out: Heimerdinger's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 4. Elise (net +0.81)

- **0.54** untargetable: Rappel makes Elise untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade. Untargetable for 0.6 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Elise E Rappel → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.54** untargetable: Rappel makes Elise untargetable, dodging Heimerdinger's CH-3X Lightning Grenade. Untargetable for 0.6 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Elise E Rappel → Heimerdinger E CH-3X Lightning Grenade)

### 5. Sivir (net +0.81)

- **0.54** spell shield: Spell Shield's spell shield blocks Heimerdinger's CH-2 Electron Storm Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.54** spell shield: Spell Shield's spell shield blocks Heimerdinger's CH-3X Lightning Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Heimerdinger E CH-3X Lightning Grenade)

### 6. Udyr (net +0.79)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Heimerdinger's CH-2 Electron Storm Grenade (slow, stun). Immune for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. (Udyr E Blazing Stampede → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Heimerdinger's CH-3X Lightning Grenade (slow, stun). Immune for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. (Udyr E Blazing Stampede → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

### 7. Fiora (net +0.77)

- **0.67** parry: Riposte parries Heimerdinger's CH-2 Electron Storm Grenade and stuns back. Parry for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. Negating CH-2 Electron Storm Grenade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.67** parry: Riposte parries Heimerdinger's CH-3X Lightning Grenade and stuns back. Parry for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. Negating CH-3X Lightning Grenade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Heimerdinger E CH-3X Lightning Grenade)
- **0.05** attack speed slow: Riposte cuts Heimerdinger's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Heimerdinger basic attacks)
- Watch out: Heimerdinger's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 8. Mel (net +0.77)

- **0.46** projectile block: Rebuttal blocks Heimerdinger's CH-2 Electron Storm Grenade, a projectile. Rebuttal for 0.75 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Mel W Rebuttal → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.46** projectile block: Rebuttal blocks Heimerdinger's CH-3X Lightning Grenade, a projectile. Rebuttal for 0.75 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Mel W Rebuttal → Heimerdinger E CH-3X Lightning Grenade)
- **0.39** projectile block: Rebuttal blocks Heimerdinger's H-28G Evolution Turret, a projectile. Rebuttal for 0.75 s; H-28G Evolution Turret takes 0.25 s to land, enough to react. (Mel W Rebuttal → Heimerdinger Q H-28G Evolution Turret)
- Watch out: H-28G Evolution Turret makes Heimerdinger immune to Mel's Solar Snare slow.

### 9. Maokai (net +0.75)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade. Untargetable for 1.4 s; CH-2 Electron Storm Grenade takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Heimerdinger's CH-3X Lightning Grenade. Untargetable for 1.4 s; CH-3X Lightning Grenade takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 10. Nocturne (net +0.72)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Heimerdinger's CH-2 Electron Storm Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-2 Electron Storm Grenade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Heimerdinger E CH-2 Electron Storm Grenade)
- **0.66** spell shield: Shroud of Darkness's spell shield blocks Heimerdinger's CH-3X Lightning Grenade. Spell shield for 1.5 s, long enough to use ahead of CH-3X Lightning Grenade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Heimerdinger E CH-3X Lightning Grenade)
- Watch out: Heimerdinger's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +0.94 | 1.25 | 0.31 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Samira | +0.90 | 0.90 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Yasuo | +0.88 | 1.00 | 0.12 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Elise | +0.81 | 0.81 | 0.00 |  |
| 5 | Sivir | +0.81 | 0.81 | 0.00 |  |
| 6 | Udyr | +0.79 | 1.05 | 0.26 |  |
| 7 | Fiora | +0.77 | 1.02 | 0.25 |  |
| 8 | Mel | +0.77 | 0.84 | 0.07 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 9 | Maokai | +0.75 | 1.05 | 0.30 |  |
| 10 | Nocturne | +0.72 | 0.99 | 0.27 |  |
| 11 | Morgana | +0.70 | 0.86 | 0.16 |  |
| 12 | Vladimir | +0.60 | 0.86 | 0.26 |  |
| 13 | Master Yi | +0.56 | 0.96 | 0.40 |  |
| 14 | Gwen | +0.55 | 0.81 | 0.26 |  |
| 15 | Yuumi | +0.50 | 1.05 | 0.55 |  |
| 16 | Xayah | +0.50 | 0.50 | 0.00 |  |
| 17 | Bard | +0.44 | 0.51 | 0.07 |  |
| 18 | Aurora | +0.40 | 0.50 | 0.10 |  |
| 19 | Lissandra | +0.39 | 0.51 | 0.12 |  |
| 20 | Rek'Sai | +0.39 | 0.51 | 0.12 |  |
| 21 | Zaahen | +0.39 | 0.51 | 0.12 |  |
| 22 | Milio | +0.38 | 0.45 | 0.07 |  |
| 23 | Rengar | +0.37 | 0.84 | 0.47 |  |
| 24 | Camille | +0.35 | 0.50 | 0.15 |  |
| 25 | Kayle | +0.35 | 0.40 | 0.05 |  |
| 26 | Ekko | +0.34 | 0.55 | 0.21 |  |
| 27 | Kled | +0.33 | 0.48 | 0.15 |  |
| 28 | Kalista | +0.33 | 0.38 | 0.05 |  |
| 29 | Evelynn | +0.31 | 0.51 | 0.20 |  |
| 30 | Zed | +0.31 | 0.50 | 0.19 |  |
| 31 | Shaco | +0.28 | 0.51 | 0.23 |  |
| 32 | Gangplank | +0.25 | 0.74 | 0.49 |  |
| 33 | Alistar | +0.21 | 0.41 | 0.20 |  |
| 34 | Tristana | +0.21 | 0.27 | 0.06 |  |
| 35 | Teemo | +0.20 | 0.26 | 0.06 |  |
| 36 | Kindred | +0.19 | 0.24 | 0.05 |  |
| 37 | Malzahar | +0.12 | 0.52 | 0.40 |  |
| 38 | Garen | +0.11 | 0.48 | 0.37 |  |
| 39 | Pantheon | +0.11 | 0.41 | 0.30 |  |
| 40 | Annie | +0.08 | 0.08 | 0.00 |  |
| 41 | Lulu | +0.07 | 0.19 | 0.12 |  |
| 42 | Olaf | +0.06 | 0.51 | 0.45 |  |
| 43 | Warwick | +0.03 | 0.52 | 0.49 |  |
| 44 | Jax | +0.01 | 0.21 | 0.20 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 47 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 48 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 49 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 50 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 51 | Sona | 0.00 | 0.00 | 0.00 |  |
| 52 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 53 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 54 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 55 | Aphelios | -0.01 | 0.11 | 0.12 |  |
| 56 | Ashe | -0.03 | 0.00 | 0.03 |  |
| 57 | Azir | -0.05 | 0.00 | 0.05 |  |
| 58 | Kog'Maw | -0.05 | 0.00 | 0.05 |  |
| 59 | Lux | -0.05 | 0.00 | 0.05 |  |
| 60 | Orianna | -0.05 | 0.00 | 0.05 |  |
| 61 | Renata Glasc | -0.05 | 0.00 | 0.05 |  |
| 62 | Senna | -0.05 | 0.00 | 0.05 |  |
| 63 | Twitch | -0.05 | 0.00 | 0.05 |  |
| 64 | Zeri | -0.05 | 0.00 | 0.05 |  |
| 65 | Ziggs | -0.05 | 0.00 | 0.05 |  |
| 66 | Zilean | -0.05 | 0.00 | 0.05 |  |
| 67 | Xin Zhao | -0.06 | 0.24 | 0.30 |  |
| 68 | Nilah | -0.06 | 0.18 | 0.24 |  |
| 69 | Brand | -0.06 | 0.00 | 0.06 |  |
| 70 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 71 | Jinx | -0.06 | 0.00 | 0.06 |  |
| 72 | Soraka | -0.06 | 0.00 | 0.06 |  |
| 73 | Ahri | -0.07 | 0.00 | 0.07 |  |
| 74 | Corki | -0.07 | 0.00 | 0.07 |  |
| 75 | Draven | -0.07 | 0.00 | 0.07 |  |
| 76 | Viktor | -0.07 | 0.00 | 0.07 |  |
| 77 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 78 | Karma | -0.08 | 0.00 | 0.08 |  |
| 79 | Nami | -0.08 | 0.00 | 0.08 |  |
| 80 | Yunara | -0.08 | 0.00 | 0.08 |  |
| 81 | Sion | -0.09 | 0.54 | 0.63 |  |
| 82 | Graves | -0.09 | 0.00 | 0.09 |  |
| 83 | Smolder | -0.09 | 0.00 | 0.09 |  |
| 84 | Swain | -0.09 | 0.00 | 0.09 |  |
| 85 | Vex | -0.09 | 0.00 | 0.09 |  |
| 86 | Yone | -0.09 | 0.00 | 0.09 |  |
| 87 | Syndra | -0.10 | 0.00 | 0.10 |  |
| 88 | Anivia | -0.11 | 0.00 | 0.11 |  |
| 89 | Cassiopeia | -0.11 | 0.00 | 0.11 |  |
| 90 | Hwei | -0.12 | 0.00 | 0.12 |  |
| 91 | Wukong | -0.12 | 0.00 | 0.12 |  |
| 92 | Rell | -0.12 | 0.00 | 0.12 |  |
| 93 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 94 | Kayn | -0.13 | 0.51 | 0.64 |  |
| 95 | Gnar | -0.13 | 0.00 | 0.13 |  |
| 96 | Riven | -0.13 | 0.00 | 0.13 |  |
| 97 | Thresh | -0.13 | 0.00 | 0.13 |  |
| 98 | Jarvan IV | -0.14 | 0.00 | 0.14 |  |
| 99 | Sylas | -0.14 | 0.00 | 0.14 |  |
| 100 | Malphite | -0.15 | 0.13 | 0.28 |  |
| 101 | Taric | -0.16 | 0.24 | 0.40 |  |
| 102 | Caitlyn | -0.16 | 0.18 | 0.34 |  |
| 103 | Aurelion Sol | -0.16 | 0.00 | 0.16 |  |
| 104 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 105 | Varus | -0.16 | 0.00 | 0.16 |  |
| 106 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 107 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 108 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 109 | Talon | -0.18 | 0.00 | 0.18 |  |
| 110 | Akali | -0.19 | 0.00 | 0.19 |  |
| 111 | Amumu | -0.20 | 0.00 | 0.20 |  |
| 112 | Qiyana | -0.20 | 0.00 | 0.20 |  |
| 113 | Renekton | -0.20 | 0.00 | 0.20 |  |
| 114 | Fizz | -0.21 | 0.00 | 0.21 |  |
| 115 | Urgot | -0.21 | 0.00 | 0.21 |  |
| 116 | Hecarim | -0.22 | 0.00 | 0.22 |  |
| 117 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 118 | Briar | -0.23 | 0.00 | 0.23 |  |
| 119 | Ivern | -0.23 | 0.00 | 0.23 |  |
| 120 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 121 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 122 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 123 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 124 | Nasus | -0.25 | 0.20 | 0.45 |  |
| 125 | Illaoi | -0.25 | 0.00 | 0.25 |  |
| 126 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 127 | Volibear | -0.25 | 0.00 | 0.25 |  |
| 128 | Ornn | -0.26 | 0.00 | 0.26 |  |
| 129 | Bel'Veth | -0.27 | 0.00 | 0.27 |  |
| 130 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 131 | Quinn | -0.27 | 0.00 | 0.27 |  |
| 132 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 133 | Diana | -0.28 | 0.00 | 0.28 |  |
| 134 | Leona | -0.28 | 0.00 | 0.28 |  |
| 135 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 136 | Locke | -0.29 | 0.00 | 0.29 |  |
| 137 | Sejuani | -0.31 | 0.00 | 0.31 |  |
| 138 | Miss Fortune | -0.33 | 0.00 | 0.33 |  |
| 139 | Shyvana | -0.33 | 0.00 | 0.33 |  |
| 140 | Sett | -0.34 | 0.00 | 0.34 |  |
| 141 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 142 | Skarner | -0.36 | 0.14 | 0.50 |  |
| 143 | Jhin | -0.37 | 0.00 | 0.37 |  |
| 144 | Vel'Koz | -0.37 | 0.00 | 0.37 |  |
| 145 | Xerath | -0.37 | 0.00 | 0.37 |  |
| 146 | Rammus | -0.38 | 0.20 | 0.58 |  |
| 147 | Mordekaiser | -0.38 | 0.05 | 0.43 |  |
| 148 | Galio | -0.38 | 0.00 | 0.38 |  |
| 149 | Blitzcrank | -0.40 | 0.00 | 0.40 |  |
| 150 | Gragas | -0.40 | 0.00 | 0.40 |  |
| 151 | Viego | -0.40 | 0.00 | 0.40 |  |
| 152 | Ryze | -0.42 | 0.00 | 0.42 |  |
| 153 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 154 | Yorick | -0.42 | 0.00 | 0.42 |  |
| 155 | Shen | -0.43 | 0.20 | 0.63 |  |
| 156 | Karthus | -0.43 | 0.00 | 0.43 |  |
| 157 | Janna | -0.45 | 0.00 | 0.45 |  |
| 158 | Singed | -0.45 | 0.00 | 0.45 |  |
| 159 | Dr. Mundo | -0.46 | 0.00 | 0.46 |  |
| 160 | Poppy | -0.46 | 0.00 | 0.46 |  |
| 161 | Darius | -0.47 | 0.00 | 0.47 |  |
| 162 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 163 | Katarina | -0.48 | 0.00 | 0.48 |  |
| 164 | Rumble | -0.49 | 0.00 | 0.49 |  |
| 165 | Vi | -0.49 | 0.00 | 0.49 |  |
| 166 | Cho'Gath | -0.50 | 0.00 | 0.50 |  |
| 167 | Fiddlesticks | -0.54 | 0.00 | 0.54 |  |
| 168 | Taliyah | -0.58 | 0.00 | 0.58 |  |
| 169 | Naafiri | -0.64 | 0.00 | 0.64 |  |
| 170 | Nunu & Willump | -0.73 | 0.26 | 0.99 |  |
| 171 | Tahm Kench | -0.76 | 0.00 | 0.76 |  |
| 172 | Zac | -0.76 | 0.00 | 0.76 |  |
