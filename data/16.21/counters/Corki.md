# Counters to Corki (patch 26.21)

Every champion ranked by what its kit does against Corki's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Corki's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Corki` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.72)

- **0.52** projectile block: Blade Whirl blocks Corki's Missile Barrage, a projectile. Blade Whirl for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Samira W Blade Whirl → Corki R Missile Barrage)
- **0.27** projectile block: Blade Whirl blocks Corki's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Corki basic attacks)
- **0.27** projectile block: Blade Whirl blocks Corki's Phosphorus Bomb, a projectile. Blade Whirl for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Samira W Blade Whirl → Corki Q Phosphorus Bomb)

### 2. Mel (net +0.67)

- **0.47** projectile block: Rebuttal blocks Corki's Missile Barrage, a projectile. Rebuttal for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Mel W Rebuttal → Corki R Missile Barrage)
- **0.27** projectile block: Rebuttal blocks Corki's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Corki basic attacks)
- **0.25** projectile block: Rebuttal blocks Corki's Phosphorus Bomb, a projectile. Rebuttal for 0.75 s; Phosphorus Bomb takes 1 s to land, enough to react. (Mel W Rebuttal → Corki Q Phosphorus Bomb)

### 3. Yasuo (net +0.60)

- **0.55** projectile block: Wind Wall blocks Corki's Missile Barrage, a projectile. Wind Wall for 4 s, long enough to use ahead of Missile Barrage. (Yasuo W Wind Wall → Corki R Missile Barrage)
- **0.35** projectile block: Wind Wall blocks Corki's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Corki basic attacks)
- **0.29** projectile block: Wind Wall blocks Corki's Phosphorus Bomb, a projectile. Wind Wall for 4 s, long enough to use ahead of Phosphorus Bomb. (Yasuo W Wind Wall → Corki Q Phosphorus Bomb)
- Watch out: Corki's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 4. Braum (net +0.56)

- **0.55** projectile block: Unbreakable blocks Corki's Missile Barrage, a projectile. Unbreakable for 4 s, long enough to use ahead of Missile Barrage. (Braum E Unbreakable → Corki R Missile Barrage)
- **0.45** projectile block: Unbreakable blocks Corki's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Corki basic attacks)
- **0.42** projectile block: Unbreakable blocks Corki's Phosphorus Bomb, a projectile. Unbreakable for 4 s, long enough to use ahead of Phosphorus Bomb. (Braum E Unbreakable → Corki Q Phosphorus Bomb)
- Watch out: Corki's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 5. Sivir (net +0.55)

- **0.55** spell shield: Spell Shield's spell shield blocks Corki's Missile Barrage. Spell shield for 1.5 s, long enough to use ahead of Missile Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Corki R Missile Barrage)

### 6. Yuumi (net +0.45)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Corki's Missile Barrage. Untargetable for ?; Missile Barrage takes 0.82 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 7. Teemo (net +0.43)

- **0.43** blind: Blinding Dart's blind makes Corki's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Corki basic attacks)

### 8. Fizz (net +0.40)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Corki's Missile Barrage. Untargetable for 0.75 s; Missile Barrage takes 0.82 s to land, enough to react. (Fizz E Playful → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 9. Vladimir (net +0.39)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Corki's Missile Barrage. Untargetable for 2 s, long enough to use ahead of Missile Barrage. (Vladimir W Sanguine Pool → Corki R Missile Barrage)
- Watch out: Corki's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 10. Lissandra (net +0.38)

- **0.30** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Corki's Missile Barrage. Untargetable for 2.5 s, long enough to use ahead of Missile Barrage. (Lissandra R Frozen Tomb → Corki R Missile Barrage)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Corki's Valkyrie mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Corki W Valkyrie)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.72 | 0.72 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.67 | 0.67 | 0.00 | projectile block (Rebuttal) |
| 3 | Yasuo | +0.60 | 0.80 | 0.20 | projectile block (Wind Wall) |
| 4 | Braum | +0.56 | 0.88 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Sivir | +0.55 | 0.55 | 0.00 |  |
| 6 | Yuumi | +0.45 | 0.55 | 0.10 |  |
| 7 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 8 | Fizz | +0.40 | 0.55 | 0.15 |  |
| 9 | Vladimir | +0.39 | 0.55 | 0.16 |  |
| 10 | Lissandra | +0.38 | 0.38 | 0.00 |  |
| 11 | Kayle | +0.37 | 0.37 | 0.00 |  |
| 12 | Pantheon | +0.35 | 0.55 | 0.20 |  |
| 13 | Ahri | +0.30 | 0.30 | 0.00 |  |
| 14 | Bard | +0.30 | 0.30 | 0.00 |  |
| 15 | Hwei | +0.30 | 0.30 | 0.00 |  |
| 16 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 17 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 18 | Aurora | +0.29 | 0.29 | 0.00 |  |
| 19 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 20 | Viktor | +0.29 | 0.29 | 0.00 |  |
| 21 | Xayah | +0.29 | 0.29 | 0.00 |  |
| 22 | Fiora | +0.27 | 0.59 | 0.32 |  |
| 23 | Veigar | +0.27 | 0.27 | 0.00 |  |
| 24 | Vex | +0.26 | 0.26 | 0.00 |  |
| 25 | Master Yi | +0.25 | 0.55 | 0.30 |  |
| 26 | Gwen | +0.23 | 0.55 | 0.32 |  |
| 27 | Maokai | +0.23 | 0.55 | 0.32 |  |
| 28 | Nocturne | +0.23 | 0.55 | 0.32 |  |
| 29 | Malzahar | +0.15 | 0.15 | 0.00 |  |
| 30 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 31 | Camille | +0.13 | 0.29 | 0.16 |  |
| 32 | Shen | +0.11 | 0.33 | 0.22 |  |
| 33 | Kayn | +0.10 | 0.30 | 0.20 |  |
| 34 | Rek'Sai | +0.10 | 0.30 | 0.20 |  |
| 35 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 36 | Evelynn | +0.08 | 0.30 | 0.22 |  |
| 37 | Shaco | +0.08 | 0.30 | 0.22 |  |
| 38 | Zed | +0.07 | 0.29 | 0.22 |  |
| 39 | Poppy | +0.06 | 0.38 | 0.32 |  |
| 40 | Nilah | +0.04 | 0.30 | 0.26 |  |
| 41 | Annie | +0.04 | 0.04 | 0.00 |  |
| 42 | Jax | +0.03 | 0.35 | 0.32 |  |
| 43 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 44 | Zac | 0.00 | 0.30 | 0.30 |  |
| 45 | Yone | 0.00 | 0.15 | 0.15 |  |
| 46 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 47 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 48 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Elise | 0.00 | 0.00 | 0.00 |  |
| 55 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 56 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 57 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 58 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 59 | Janna | 0.00 | 0.00 | 0.00 |  |
| 60 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 61 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 62 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 63 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 64 | Karma | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 69 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Milio | 0.00 | 0.00 | 0.00 |  |
| 72 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 75 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 76 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 77 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 78 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 79 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 80 | Senna | 0.00 | 0.00 | 0.00 |  |
| 81 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 82 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 83 | Sona | 0.00 | 0.00 | 0.00 |  |
| 84 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 85 | Swain | 0.00 | 0.00 | 0.00 |  |
| 86 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 87 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 88 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 89 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 90 | Varus | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 93 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 94 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 95 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 96 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 97 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 98 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 99 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 100 | Xin Zhao | -0.01 | 0.29 | 0.30 |  |
| 101 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 102 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 103 | Warwick | -0.07 | 0.15 | 0.22 |  |
| 104 | Graves | -0.07 | 0.00 | 0.07 |  |
| 105 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 106 | Kled | -0.12 | 0.00 | 0.12 |  |
| 107 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 108 | Viego | -0.14 | 0.00 | 0.14 |  |
| 109 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 110 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 111 | Briar | -0.16 | 0.00 | 0.16 |  |
| 112 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 113 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 114 | Morgana | -0.16 | 0.00 | 0.16 |  |
| 115 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 116 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 117 | Amumu | -0.18 | 0.14 | 0.32 |  |
| 118 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 119 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 120 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 121 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 122 | Rell | -0.20 | 0.00 | 0.20 |  |
| 123 | Zaahen | -0.20 | 0.00 | 0.20 |  |
| 124 | Akali | -0.22 | 0.00 | 0.22 |  |
| 125 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 126 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 127 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 128 | Galio | -0.22 | 0.00 | 0.22 |  |
| 129 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 130 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 131 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 132 | Riven | -0.22 | 0.00 | 0.22 |  |
| 133 | Talon | -0.22 | 0.00 | 0.22 |  |
| 134 | Vi | -0.22 | 0.00 | 0.22 |  |
| 135 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 136 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 137 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 138 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 139 | Tahm Kench | -0.30 | 0.00 | 0.30 |  |
| 140 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 141 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 142 | Alistar | -0.32 | 0.00 | 0.32 |  |
| 143 | Diana | -0.32 | 0.00 | 0.32 |  |
| 144 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 145 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 146 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 147 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 148 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 149 | Leona | -0.32 | 0.00 | 0.32 |  |
| 150 | Locke | -0.32 | 0.00 | 0.32 |  |
| 151 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 152 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 153 | Sett | -0.32 | 0.00 | 0.32 |  |
| 154 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 155 | Udyr | -0.32 | 0.00 | 0.32 |  |
| 156 | Singed | -0.35 | 0.30 | 0.65 |  |
| 157 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 158 | Darius | -0.61 | 0.00 | 0.61 |  |
| 159 | Garen | -0.61 | 0.00 | 0.61 |  |
| 160 | Sion | -0.61 | 0.00 | 0.61 |  |
| 161 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 162 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 163 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 164 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 165 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 166 | Gangplank | -0.65 | 0.00 | 0.65 |  |
| 167 | Nunu & Willump | -0.65 | 0.00 | 0.65 |  |
| 168 | Olaf | -0.65 | 0.00 | 0.65 |  |
| 169 | Rengar | -0.65 | 0.00 | 0.65 |  |
| 170 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 171 | Skarner | -0.65 | 0.00 | 0.65 |  |
| 172 | Taric | -0.65 | 0.00 | 0.65 |  |
