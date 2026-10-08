# Counters to Graves (patch 26.20)

Every champion ranked by what its kit does against Graves's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Graves's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Graves` for the full ledger of a matchup, with sources.

## Top 10

### 1. Mel (net +1.03)

- **0.70** projectile block: Rebuttal blocks Graves's Collateral Damage, a projectile. Rebuttal for 0.75 s; Collateral Damage takes 0.77 s to land, enough to react. (Mel W Rebuttal → Graves R Collateral Damage)
- **0.37** projectile block: Rebuttal blocks Graves's Smoke Screen, a projectile. Rebuttal for 0.75 s; Smoke Screen takes 0.88 s to land, enough to react. (Mel W Rebuttal → Graves W Smoke Screen)
- **0.27** projectile block: Rebuttal blocks Graves's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Graves basic attacks)

### 2. Samira (net +1.02)

- **0.70** projectile block: Blade Whirl blocks Graves's Collateral Damage, a projectile. Blade Whirl for 0.75 s; Collateral Damage takes 0.77 s to land, enough to react. (Samira W Blade Whirl → Graves R Collateral Damage)
- **0.40** projectile block: Blade Whirl blocks Graves's Smoke Screen, a projectile. Blade Whirl for 0.75 s; Smoke Screen takes 0.88 s to land, enough to react. (Samira W Blade Whirl → Graves W Smoke Screen)
- **0.27** projectile block: Blade Whirl blocks Graves's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Graves basic attacks)

### 3. Yasuo (net +0.89)

- **0.70** projectile block: Wind Wall blocks Graves's Collateral Damage, a projectile. Wind Wall for 4 s, long enough to use ahead of Collateral Damage. (Yasuo W Wind Wall → Graves R Collateral Damage)
- **0.45** projectile block: Wind Wall blocks Graves's Smoke Screen, a projectile. Wind Wall for 4 s, long enough to use ahead of Smoke Screen. (Yasuo W Wind Wall → Graves W Smoke Screen)
- **0.35** projectile block: Wind Wall blocks Graves's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Graves basic attacks)
- Watch out: Graves's basic attacks reach 250 units farther than Yasuo's (425 vs 175 attack range).

### 4. Lissandra (net +0.84)

- **0.60** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Graves's Collateral Damage. Untargetable for 2.5 s, long enough to use ahead of Collateral Damage. (Lissandra R Frozen Tomb → Graves R Collateral Damage)
- **0.30** dash stop: Frozen Tomb's knockdown can stop Graves's Collateral Damage mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Graves R Collateral Damage)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Graves's Quickdraw mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Graves E Quickdraw)

### 5. Braum (net +0.82)

- **0.70** projectile block: Unbreakable blocks Graves's Collateral Damage, a projectile. Unbreakable for 4 s, long enough to use ahead of Collateral Damage. (Braum E Unbreakable → Graves R Collateral Damage)
- **0.45** projectile block: Unbreakable blocks Graves's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Graves basic attacks)
- **0.45** projectile block: Unbreakable blocks Graves's Smoke Screen, a projectile. Unbreakable for 4 s, long enough to use ahead of Smoke Screen. (Braum E Unbreakable → Graves W Smoke Screen)
- Watch out: Graves's basic attacks reach 300 units farther than Braum's (425 vs 125 attack range).

### 6. Elise (net +0.77)

- **0.70** untargetable: Rappel makes Elise untargetable, dodging Graves's Collateral Damage. Untargetable for 0.6 s; Collateral Damage takes 0.77 s to land, enough to react. (Elise E Rappel → Graves R Collateral Damage)
- **0.07** range: Elise's basic attacks reach 125 units farther than Graves's (550 vs 425 attack range). Graves closes the gap with Quickdraw, Collateral Damage. (Elise basic attacks → Graves basic attacks)

### 7. Kayle (net +0.72)

- **0.60** invulnerable: Divine Judgment makes Kayle invulnerable to Graves's Collateral Damage. Invulnerable for 2.5 s, long enough to use ahead of Collateral Damage. (Kayle R Divine Judgment → Graves R Collateral Damage)
- **0.12** range: Kayle's basic attacks reach 200 units farther than Graves's (625 vs 425 attack range). Graves closes the gap with Quickdraw, Collateral Damage. (Kayle basic attacks → Graves basic attacks)

### 8. Vladimir (net +0.70)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Graves's Collateral Damage. Untargetable for 2 s, long enough to use ahead of Collateral Damage. (Vladimir W Sanguine Pool → Graves R Collateral Damage)

### 9. Yuumi (net +0.70)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Graves's Collateral Damage. Untargetable for ?; Collateral Damage takes 0.77 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Graves R Collateral Damage)

### 10. Bard (net +0.65)

- **0.60** untargetable: Tempered Fate makes Bard untargetable, dodging Graves's Collateral Damage. Untargetable for 2.5 s, long enough to use ahead of Collateral Damage. (Bard R Tempered Fate → Graves R Collateral Damage)
- **0.05** range: Bard's basic attacks reach 75 units farther than Graves's (500 vs 425 attack range). Graves closes the gap with Quickdraw, Collateral Damage. (Bard basic attacks → Graves basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.03 | 1.03 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Yasuo | +0.89 | 1.03 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Lissandra | +0.84 | 0.84 | 0.00 |  |
| 5 | Braum | +0.82 | 1.06 | 0.24 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Elise | +0.77 | 0.77 | 0.00 |  |
| 7 | Kayle | +0.72 | 0.72 | 0.00 |  |
| 8 | Vladimir | +0.70 | 0.70 | 0.00 |  |
| 9 | Yuumi | +0.70 | 0.70 | 0.00 |  |
| 10 | Bard | +0.65 | 0.65 | 0.00 |  |
| 11 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 12 | Xayah | +0.59 | 0.59 | 0.00 |  |
| 13 | Master Yi | +0.58 | 0.78 | 0.20 |  |
| 14 | Pantheon | +0.56 | 0.70 | 0.14 |  |
| 15 | Ahri | +0.55 | 0.55 | 0.00 |  |
| 16 | Hwei | +0.55 | 0.55 | 0.00 |  |
| 17 | Jinx | +0.55 | 0.55 | 0.00 |  |
| 18 | Kindred | +0.55 | 0.55 | 0.00 |  |
| 19 | Viktor | +0.55 | 0.55 | 0.00 |  |
| 20 | Ekko | +0.54 | 0.70 | 0.16 |  |
| 21 | Veigar | +0.54 | 0.54 | 0.00 |  |
| 22 | Vex | +0.54 | 0.54 | 0.00 |  |
| 23 | Fiora | +0.52 | 0.74 | 0.22 |  |
| 24 | Gwen | +0.48 | 0.70 | 0.22 |  |
| 25 | Teemo | +0.48 | 0.48 | 0.00 | blind (Blinding Dart) |
| 26 | Malzahar | +0.47 | 0.47 | 0.00 |  |
| 27 | Maokai | +0.46 | 0.70 | 0.24 |  |
| 28 | Kayn | +0.46 | 0.60 | 0.14 |  |
| 29 | Rek'Sai | +0.46 | 0.60 | 0.14 |  |
| 30 | Evelynn | +0.44 | 0.60 | 0.16 |  |
| 31 | Shaco | +0.44 | 0.60 | 0.16 |  |
| 32 | Camille | +0.44 | 0.56 | 0.12 |  |
| 33 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 34 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 35 | Zed | +0.37 | 0.53 | 0.16 |  |
| 36 | Lulu | +0.37 | 0.37 | 0.00 |  |
| 37 | Xin Zhao | +0.33 | 0.53 | 0.20 |  |
| 38 | Poppy | +0.31 | 0.55 | 0.24 |  |
| 39 | Zac | +0.30 | 0.50 | 0.20 |  |
| 40 | Yone | +0.28 | 0.38 | 0.10 |  |
| 41 | Warwick | +0.25 | 0.41 | 0.16 |  |
| 42 | Varus | +0.19 | 0.19 | 0.00 |  |
| 43 | Shen | +0.17 | 0.33 | 0.16 |  |
| 44 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 45 | Nilah | +0.14 | 0.30 | 0.16 |  |
| 46 | Aphelios | +0.13 | 0.13 | 0.00 |  |
| 47 | Caitlyn | +0.13 | 0.13 | 0.00 |  |
| 48 | Milio | +0.12 | 0.12 | 0.00 |  |
| 49 | Jax | +0.11 | 0.35 | 0.24 |  |
| 50 | Nocturne | +0.11 | 0.35 | 0.24 |  |
| 51 | Ashe | +0.11 | 0.11 | 0.00 |  |
| 52 | Morgana | +0.11 | 0.11 | 0.00 |  |
| 53 | Amumu | +0.10 | 0.34 | 0.24 |  |
| 54 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 55 | Kalista | +0.09 | 0.09 | 0.00 |  |
| 56 | Senna | +0.09 | 0.09 | 0.00 |  |
| 57 | Sona | +0.09 | 0.09 | 0.00 |  |
| 58 | Twitch | +0.09 | 0.09 | 0.00 |  |
| 59 | Vayne | +0.09 | 0.09 | 0.00 |  |
| 60 | Yunara | +0.09 | 0.09 | 0.00 |  |
| 61 | Zeri | +0.09 | 0.09 | 0.00 |  |
| 62 | Rammus | +0.08 | 0.32 | 0.24 |  |
| 63 | Renata Glasc | +0.08 | 0.08 | 0.00 |  |
| 64 | Singed | +0.07 | 0.56 | 0.49 |  |
| 65 | Anivia | +0.07 | 0.07 | 0.00 |  |
| 66 | Annie | +0.07 | 0.07 | 0.00 |  |
| 67 | Draven | +0.07 | 0.07 | 0.00 |  |
| 68 | Ezreal | +0.07 | 0.07 | 0.00 |  |
| 69 | Janna | +0.07 | 0.07 | 0.00 |  |
| 70 | Miss Fortune | +0.07 | 0.07 | 0.00 |  |
| 71 | Smolder | +0.07 | 0.07 | 0.00 |  |
| 72 | Twisted Fate | +0.07 | 0.07 | 0.00 |  |
| 73 | Zilean | +0.07 | 0.07 | 0.00 |  |
| 74 | Zoe | +0.07 | 0.07 | 0.00 |  |
| 75 | Corki | +0.06 | 0.06 | 0.00 |  |
| 76 | Jhin | +0.06 | 0.06 | 0.00 |  |
| 77 | Kai'Sa | +0.06 | 0.06 | 0.00 |  |
| 78 | Kennen | +0.06 | 0.06 | 0.00 |  |
| 79 | Lux | +0.06 | 0.06 | 0.00 |  |
| 80 | Quinn | +0.06 | 0.06 | 0.00 |  |
| 81 | Soraka | +0.06 | 0.06 | 0.00 |  |
| 82 | Ziggs | +0.06 | 0.06 | 0.00 |  |
| 83 | Zyra | +0.06 | 0.06 | 0.00 |  |
| 84 | Akshan | +0.05 | 0.05 | 0.00 |  |
| 85 | Aurelion Sol | +0.05 | 0.05 | 0.00 |  |
| 86 | Brand | +0.05 | 0.05 | 0.00 |  |
| 87 | Gnar | +0.05 | 0.05 | 0.00 |  |
| 88 | Lucian | +0.05 | 0.05 | 0.00 |  |
| 89 | Nami | +0.05 | 0.05 | 0.00 |  |
| 90 | Neeko | +0.05 | 0.05 | 0.00 |  |
| 91 | Nidalee | +0.05 | 0.05 | 0.00 |  |
| 92 | Ryze | +0.05 | 0.05 | 0.00 |  |
| 93 | Seraphine | +0.05 | 0.05 | 0.00 |  |
| 94 | Syndra | +0.05 | 0.05 | 0.00 |  |
| 95 | Taric | +0.04 | 0.49 | 0.45 |  |
| 96 | Azir | +0.04 | 0.04 | 0.00 |  |
| 97 | Jayce | +0.04 | 0.04 | 0.00 |  |
| 98 | Karma | +0.04 | 0.04 | 0.00 |  |
| 99 | Kog'Maw | +0.04 | 0.04 | 0.00 |  |
| 100 | LeBlanc | +0.04 | 0.04 | 0.00 |  |
| 101 | Orianna | +0.04 | 0.04 | 0.00 |  |
| 102 | Taliyah | +0.04 | 0.04 | 0.00 |  |
| 103 | Vel'Koz | +0.04 | 0.04 | 0.00 |  |
| 104 | Xerath | +0.04 | 0.04 | 0.00 |  |
| 105 | Swain | +0.03 | 0.03 | 0.00 |  |
| 106 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 107 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 108 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 109 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 110 | Kled | -0.01 | 0.06 | 0.07 |  |
| 111 | Malphite | -0.03 | 0.21 | 0.24 |  |
| 112 | Urgot | -0.06 | 0.00 | 0.06 |  |
| 113 | Rakan | -0.07 | 0.00 | 0.07 |  |
| 114 | Zaahen | -0.08 | 0.06 | 0.14 |  |
| 115 | Lillia | -0.08 | 0.00 | 0.08 |  |
| 116 | Viego | -0.09 | 0.00 | 0.09 |  |
| 117 | Fizz | -0.10 | 0.00 | 0.10 |  |
| 118 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 119 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 120 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 121 | Katarina | -0.12 | 0.12 | 0.24 |  |
| 122 | Briar | -0.12 | 0.00 | 0.12 |  |
| 123 | Naafiri | -0.12 | 0.00 | 0.12 |  |
| 124 | Udyr | -0.13 | 0.11 | 0.24 |  |
| 125 | Hecarim | -0.14 | 0.00 | 0.14 |  |
| 126 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 127 | Ornn | -0.14 | 0.00 | 0.14 |  |
| 128 | Rell | -0.14 | 0.00 | 0.14 |  |
| 129 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 130 | Galio | -0.15 | 0.00 | 0.15 |  |
| 131 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 132 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 133 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 134 | Nasus | -0.16 | 0.33 | 0.49 |  |
| 135 | Akali | -0.16 | 0.00 | 0.16 |  |
| 136 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 137 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 138 | Riven | -0.16 | 0.00 | 0.16 |  |
| 139 | Talon | -0.16 | 0.00 | 0.16 |  |
| 140 | Vi | -0.16 | 0.00 | 0.16 |  |
| 141 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 142 | Alistar | -0.19 | 0.05 | 0.24 |  |
| 143 | Aatrox | -0.20 | 0.00 | 0.20 |  |
| 144 | Nautilus | -0.20 | 0.00 | 0.20 |  |
| 145 | Tahm Kench | -0.20 | 0.00 | 0.20 |  |
| 146 | Tryndamere | -0.20 | 0.00 | 0.20 |  |
| 147 | Diana | -0.22 | 0.00 | 0.22 |  |
| 148 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 149 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 150 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 151 | Gragas | -0.24 | 0.00 | 0.24 |  |
| 152 | Illaoi | -0.24 | 0.00 | 0.24 |  |
| 153 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 154 | Leona | -0.24 | 0.00 | 0.24 |  |
| 155 | Locke | -0.24 | 0.00 | 0.24 |  |
| 156 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 157 | Sett | -0.24 | 0.00 | 0.24 |  |
| 158 | Garen | -0.29 | 0.12 | 0.41 |  |
| 159 | Mordekaiser | -0.33 | 0.08 | 0.41 |  |
| 160 | Sion | -0.34 | 0.07 | 0.41 |  |
| 161 | Nunu & Willump | -0.35 | 0.14 | 0.49 |  |
| 162 | Skarner | -0.39 | 0.06 | 0.45 |  |
| 163 | Gangplank | -0.40 | 0.09 | 0.49 |  |
| 164 | Rengar | -0.40 | 0.09 | 0.49 |  |
| 165 | Darius | -0.41 | 0.00 | 0.41 |  |
| 166 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 167 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 168 | Olaf | -0.43 | 0.06 | 0.49 |  |
| 169 | Blitzcrank | -0.49 | 0.00 | 0.49 |  |
| 170 | Cho'Gath | -0.49 | 0.00 | 0.49 |  |
| 171 | Dr. Mundo | -0.49 | 0.00 | 0.49 |  |
| 172 | Rumble | -0.49 | 0.00 | 0.49 |  |
