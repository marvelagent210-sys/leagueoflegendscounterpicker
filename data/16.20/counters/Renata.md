# Counters to Renata Glasc (patch 26.20)

Every champion ranked by what its kit does against Renata Glasc's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Renata Glasc's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Renata` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +1.21)

- **0.80** projectile block: Blade Whirl blocks Renata Glasc's Hostile Takeover, a projectile. Blade Whirl for 0.75 s; Hostile Takeover takes 3.83 s to land, enough to react. (Samira W Blade Whirl → Renata Glasc R Hostile Takeover)
- **0.59** projectile block: Blade Whirl blocks Renata Glasc's Handshake, a projectile. Blade Whirl for 0.75 s; Handshake takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Renata Glasc Q Handshake)
- **0.32** projectile block: Blade Whirl blocks Renata Glasc's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Renata Glasc basic attacks)

### 2. Mel (net +1.19)

- **0.80** projectile block: Rebuttal blocks Renata Glasc's Hostile Takeover, a projectile. Rebuttal for 0.75 s; Hostile Takeover takes 3.83 s to land, enough to react. (Mel W Rebuttal → Renata Glasc R Hostile Takeover)
- **0.54** projectile block: Rebuttal blocks Renata Glasc's Handshake, a projectile. Rebuttal for 0.75 s; Handshake takes 0.87 s to land, enough to react. (Mel W Rebuttal → Renata Glasc Q Handshake)
- **0.32** projectile block: Rebuttal blocks Renata Glasc's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Renata Glasc basic attacks)

### 3. Elise (net +1.13)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Renata Glasc's Hostile Takeover. Untargetable for 0.6 s; Hostile Takeover takes 3.83 s to land, enough to react. (Elise E Rappel → Renata Glasc R Hostile Takeover)
- **0.65** untargetable: Rappel makes Elise untargetable, dodging Renata Glasc's Handshake. Untargetable for 0.6 s; Handshake takes 0.87 s to land, enough to react. (Elise E Rappel → Renata Glasc Q Handshake)

### 4. Yasuo (net +1.05)

- **0.80** projectile block: Wind Wall blocks Renata Glasc's Hostile Takeover, a projectile. Wind Wall for 4 s, long enough to use ahead of Hostile Takeover. (Yasuo W Wind Wall → Renata Glasc R Hostile Takeover)
- **0.68** projectile block: Wind Wall blocks Renata Glasc's Handshake, a projectile. Wind Wall for 4 s, long enough to use ahead of Handshake. (Yasuo W Wind Wall → Renata Glasc Q Handshake)
- **0.41** projectile block: Wind Wall blocks Renata Glasc's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Renata Glasc basic attacks)
- Watch out: Renata Glasc's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 5. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Renata Glasc's Hostile Takeover (berserk). Immune for 5 s, long enough to use ahead of Hostile Takeover. (Morgana E Black Shield → Renata Glasc R Hostile Takeover)
- **0.70** cc immunity: Black Shield makes Morgana immune to Renata Glasc's Handshake (airborne, root, stun). Immune for 5 s, long enough to use ahead of Handshake. (Morgana E Black Shield → Renata Glasc Q Handshake)
- **0.09** cc immunity: Black Shield makes Morgana immune to Renata Glasc's Loyalty Program (slow). Immune for 5 s, long enough to use ahead of Loyalty Program. (Morgana E Black Shield → Renata Glasc E Loyalty Program)
- Watch out: Renata Glasc's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

### 6. Bard (net +0.98)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Renata Glasc's Hostile Takeover. Untargetable for 2.5 s, long enough to use ahead of Hostile Takeover. (Bard R Tempered Fate → Renata Glasc R Hostile Takeover)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Renata Glasc's Handshake. Untargetable for 2.5 s, long enough to use ahead of Handshake. (Bard R Tempered Fate → Renata Glasc Q Handshake)

### 7. Lissandra (net +0.98)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renata Glasc's Hostile Takeover. Untargetable for 2.5 s, long enough to use ahead of Hostile Takeover. (Lissandra R Frozen Tomb → Renata Glasc R Hostile Takeover)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renata Glasc's Handshake. Untargetable for 2.5 s, long enough to use ahead of Handshake. (Lissandra R Frozen Tomb → Renata Glasc Q Handshake)

### 8. Xayah (net +0.98)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Renata Glasc's Hostile Takeover. Untargetable for 1.5 s, long enough to use ahead of Hostile Takeover. (Xayah R Featherstorm → Renata Glasc R Hostile Takeover)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Renata Glasc's Handshake. Untargetable for 1.5 s, long enough to use ahead of Handshake. (Xayah R Featherstorm → Renata Glasc Q Handshake)

### 9. Sivir (net +0.97)

- **0.80** spell shield: Spell Shield's spell shield blocks Renata Glasc's Hostile Takeover. Spell shield for 1.5 s, long enough to use ahead of Hostile Takeover. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Renata Glasc R Hostile Takeover)
- **0.33** spell shield: Spell Shield's spell shield blocks part of Renata Glasc's Handshake. Spell shield for 1.5 s, long enough to use ahead of Handshake. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the hook but not the recast's effects as the primary target.
  - As a secondary target, the recast's effects will be blocked. (Sivir E Spell Shield → Renata Glasc Q Handshake)

### 10. Braum (net +0.96)

- **0.80** projectile block: Unbreakable blocks Renata Glasc's Hostile Takeover, a projectile. Unbreakable for 4 s, long enough to use ahead of Hostile Takeover. (Braum E Unbreakable → Renata Glasc R Hostile Takeover)
- **0.70** projectile block: Unbreakable blocks Renata Glasc's Handshake, a projectile. Unbreakable for 4 s, long enough to use ahead of Handshake. (Braum E Unbreakable → Renata Glasc Q Handshake)
- **0.54** projectile block: Unbreakable blocks Renata Glasc's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Renata Glasc basic attacks)
- Watch out: Renata Glasc's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +1.21 | 1.21 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 2 | Mel | +1.19 | 1.19 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 3 | Elise | +1.13 | 1.13 | 0.00 |  |
| 4 | Yasuo | +1.05 | 1.29 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 5 | Morgana | +0.98 | 1.17 | 0.19 |  |
| 6 | Bard | +0.98 | 0.98 | 0.00 |  |
| 7 | Lissandra | +0.98 | 0.98 | 0.00 |  |
| 8 | Xayah | +0.98 | 0.98 | 0.00 |  |
| 9 | Sivir | +0.97 | 0.97 | 0.00 |  |
| 10 | Braum | +0.96 | 1.34 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 11 | Fiora | +0.94 | 1.32 | 0.38 |  |
| 12 | Vladimir | +0.89 | 1.15 | 0.26 |  |
| 13 | Aurora | +0.84 | 0.99 | 0.15 |  |
| 14 | Kled | +0.84 | 0.98 | 0.14 |  |
| 15 | Udyr | +0.80 | 1.18 | 0.38 |  |
| 16 | Camille | +0.80 | 0.99 | 0.19 |  |
| 17 | Milio | +0.80 | 0.80 | 0.00 |  |
| 18 | Maokai | +0.77 | 1.15 | 0.38 |  |
| 19 | Rek'Sai | +0.76 | 1.00 | 0.24 |  |
| 20 | Kalista | +0.76 | 0.76 | 0.00 |  |
| 21 | Gwen | +0.75 | 1.13 | 0.38 |  |
| 22 | Ekko | +0.75 | 1.01 | 0.26 |  |
| 23 | Zaahen | +0.75 | 0.99 | 0.24 |  |
| 24 | Zed | +0.72 | 0.98 | 0.26 |  |
| 25 | Master Yi | +0.67 | 1.20 | 0.53 |  |
| 26 | Nocturne | +0.67 | 1.05 | 0.38 |  |
| 27 | Yuumi | +0.64 | 1.15 | 0.51 |  |
| 28 | Evelynn | +0.64 | 0.98 | 0.34 |  |
| 29 | Warwick | +0.56 | 1.07 | 0.51 |  |
| 30 | Shaco | +0.52 | 0.98 | 0.46 |  |
| 31 | Alistar | +0.42 | 0.80 | 0.38 |  |
| 32 | Teemo | +0.42 | 0.50 | 0.08 | blind (Blinding Dart) |
| 33 | Lulu | +0.36 | 0.36 | 0.00 |  |
| 34 | Kayle | +0.32 | 0.32 | 0.00 |  |
| 35 | Kayn | +0.29 | 0.98 | 0.69 |  |
| 36 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 37 | Olaf | +0.22 | 0.99 | 0.77 |  |
| 38 | Malzahar | +0.19 | 0.59 | 0.40 |  |
| 39 | Sion | +0.18 | 1.01 | 0.83 |  |
| 40 | Gangplank | +0.17 | 0.94 | 0.77 |  |
| 41 | Kindred | +0.17 | 0.17 | 0.00 |  |
| 42 | Annie | +0.08 | 0.08 | 0.00 |  |
| 43 | Corki | +0.07 | 0.07 | 0.00 |  |
| 44 | Vex | +0.07 | 0.07 | 0.00 |  |
| 45 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 46 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 47 | Nilah | +0.04 | 0.35 | 0.31 |  |
| 48 | Rengar | +0.03 | 0.94 | 0.91 |  |
| 49 | Jax | +0.03 | 0.41 | 0.38 | attack dodge (Counter Strike) |
| 50 | Pantheon | +0.01 | 0.33 | 0.32 |  |
| 51 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 52 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 53 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 54 | Azir | 0.00 | 0.00 | 0.00 |  |
| 55 | Brand | 0.00 | 0.00 | 0.00 |  |
| 56 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 57 | Draven | 0.00 | 0.00 | 0.00 |  |
| 58 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 59 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 60 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 61 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 62 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 63 | Karma | 0.00 | 0.00 | 0.00 |  |
| 64 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 65 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 66 | Lux | 0.00 | 0.00 | 0.00 |  |
| 67 | Nami | 0.00 | 0.00 | 0.00 |  |
| 68 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 69 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 72 | Sona | 0.00 | 0.00 | 0.00 |  |
| 73 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 77 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 78 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 79 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 80 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 81 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 82 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 83 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 84 | Mordekaiser | -0.03 | 0.69 | 0.72 |  |
| 85 | K'Sante | -0.05 | 0.14 | 0.19 |  |
| 86 | Malphite | -0.06 | 0.32 | 0.38 |  |
| 87 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 88 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 89 | Graves | -0.08 | 0.00 | 0.08 |  |
| 90 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 91 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 92 | Varus | -0.10 | 0.00 | 0.10 |  |
| 93 | Jarvan IV | -0.11 | 0.07 | 0.18 |  |
| 94 | Yone | -0.11 | 0.07 | 0.18 |  |
| 95 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 96 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 97 | Senna | -0.11 | 0.00 | 0.11 |  |
| 98 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 99 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 100 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 101 | Hecarim | -0.17 | 0.07 | 0.24 |  |
| 102 | Ornn | -0.17 | 0.07 | 0.24 |  |
| 103 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 104 | Fizz | -0.18 | 0.00 | 0.18 |  |
| 105 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 106 | Xin Zhao | -0.19 | 0.17 | 0.36 |  |
| 107 | Volibear | -0.19 | 0.07 | 0.26 |  |
| 108 | Briar | -0.19 | 0.00 | 0.19 |  |
| 109 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 110 | Urgot | -0.19 | 0.00 | 0.19 |  |
| 111 | Rammus | -0.22 | 0.38 | 0.60 |  |
| 112 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 113 | Rell | -0.24 | 0.00 | 0.24 |  |
| 114 | Ambessa | -0.26 | 0.00 | 0.26 |  |
| 115 | Bel'Veth | -0.26 | 0.00 | 0.26 |  |
| 116 | Lee Sin | -0.26 | 0.00 | 0.26 |  |
| 117 | Riven | -0.26 | 0.00 | 0.26 |  |
| 118 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 119 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 120 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 121 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 122 | Illaoi | -0.31 | 0.07 | 0.38 |  |
| 123 | Sett | -0.31 | 0.07 | 0.38 |  |
| 124 | Shyvana | -0.31 | 0.07 | 0.38 |  |
| 125 | Garen | -0.32 | 0.40 | 0.72 |  |
| 126 | Shen | -0.32 | 0.39 | 0.71 |  |
| 127 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 128 | Viego | -0.34 | 0.07 | 0.41 |  |
| 129 | Irelia | -0.34 | 0.00 | 0.34 |  |
| 130 | Akshan | -0.35 | 0.00 | 0.35 |  |
| 131 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 132 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 133 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 134 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 135 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 136 | Akali | -0.37 | 0.00 | 0.37 |  |
| 137 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 138 | Amumu | -0.38 | 0.00 | 0.38 |  |
| 139 | Diana | -0.38 | 0.00 | 0.38 |  |
| 140 | Kassadin | -0.38 | 0.00 | 0.38 |  |
| 141 | Leona | -0.38 | 0.00 | 0.38 |  |
| 142 | Locke | -0.38 | 0.00 | 0.38 |  |
| 143 | Renekton | -0.38 | 0.00 | 0.38 |  |
| 144 | Sejuani | -0.38 | 0.00 | 0.38 |  |
| 145 | Janna | -0.40 | 0.00 | 0.40 |  |
| 146 | Talon | -0.40 | 0.00 | 0.40 |  |
| 147 | Galio | -0.42 | 0.00 | 0.42 |  |
| 148 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 149 | Wukong | -0.44 | 0.00 | 0.44 |  |
| 150 | Pyke | -0.44 | 0.00 | 0.44 |  |
| 151 | Qiyana | -0.44 | 0.00 | 0.44 |  |
| 152 | Karthus | -0.47 | 0.00 | 0.47 |  |
| 153 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 154 | Vi | -0.50 | 0.07 | 0.57 |  |
| 155 | Gragas | -0.51 | 0.00 | 0.51 |  |
| 156 | Poppy | -0.58 | 0.00 | 0.58 |  |
| 157 | Kha'Zix | -0.59 | 0.00 | 0.59 |  |
| 158 | Taric | -0.60 | 0.17 | 0.77 |  |
| 159 | Naafiri | -0.64 | 0.00 | 0.64 |  |
| 160 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 161 | Skarner | -0.71 | 0.06 | 0.77 |  |
| 162 | Darius | -0.72 | 0.00 | 0.72 |  |
| 163 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 164 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 165 | Zac | -0.73 | 0.00 | 0.73 |  |
| 166 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 167 | Cho'Gath | -0.77 | 0.00 | 0.77 |  |
| 168 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 169 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 170 | Singed | -0.77 | 0.00 | 0.77 |  |
| 171 | Tahm Kench | -0.86 | 0.00 | 0.86 |  |
| 172 | Nunu & Willump | -1.10 | 0.13 | 1.23 |  |
