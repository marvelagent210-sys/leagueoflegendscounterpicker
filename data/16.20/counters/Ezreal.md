# Counters to Ezreal (patch 26.20)

Every champion ranked by what its kit does against Ezreal's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ezreal's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ezreal` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.90)

- **0.55** projectile block: Blade Whirl blocks Ezreal's Trueshot Barrage, a projectile. Blade Whirl for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Samira W Blade Whirl → Ezreal R Trueshot Barrage)
- **0.47** projectile block: Blade Whirl blocks Ezreal's Arcane Shift, a projectile. Blade Whirl for 0.75 s; Arcane Shift takes 0.49 s to land, enough to react. (Samira W Blade Whirl → Ezreal E Arcane Shift)
- **0.28** projectile block: Blade Whirl blocks Ezreal's Essence Flux, a projectile. Blade Whirl for 0.75 s; Essence Flux takes 0.96 s to land, enough to react. (Samira W Blade Whirl → Ezreal W Essence Flux)

### 2. Mel (net +0.88)

- **0.55** projectile block: Rebuttal blocks Ezreal's Trueshot Barrage, a projectile. Rebuttal for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Mel W Rebuttal → Ezreal R Trueshot Barrage)
- **0.43** projectile block: Rebuttal blocks Ezreal's Arcane Shift, a projectile. Rebuttal for 0.75 s; Arcane Shift takes 0.49 s to land, enough to react. (Mel W Rebuttal → Ezreal E Arcane Shift)
- **0.27** projectile block: Rebuttal blocks Ezreal's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Ezreal basic attacks)

### 3. Yasuo (net +0.76)

- **0.55** projectile block: Wind Wall blocks Ezreal's Trueshot Barrage, a projectile. Wind Wall for 4 s, long enough to use ahead of Trueshot Barrage. (Yasuo W Wind Wall → Ezreal R Trueshot Barrage)
- **0.54** projectile block: Wind Wall blocks Ezreal's Arcane Shift, a projectile. Wind Wall for 4 s, long enough to use ahead of Arcane Shift. (Yasuo W Wind Wall → Ezreal E Arcane Shift)
- **0.35** projectile block: Wind Wall blocks Ezreal's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ezreal basic attacks)
- Watch out: Ezreal's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 4. Braum (net +0.74)

- **0.60** projectile block: Unbreakable blocks Ezreal's Arcane Shift, a projectile. Unbreakable for 4 s, long enough to use ahead of Arcane Shift. (Braum E Unbreakable → Ezreal E Arcane Shift)
- **0.55** projectile block: Unbreakable blocks Ezreal's Trueshot Barrage, a projectile. Unbreakable for 4 s, long enough to use ahead of Trueshot Barrage. (Braum E Unbreakable → Ezreal R Trueshot Barrage)
- **0.45** projectile block: Unbreakable blocks Ezreal's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ezreal basic attacks)
- Watch out: Ezreal's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 5. Kayle (net +0.73)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Ezreal's Trueshot Barrage. Invulnerable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Kayle R Divine Judgment → Ezreal R Trueshot Barrage)
- **0.21** invulnerable: Divine Judgment makes Kayle invulnerable to Ezreal's Essence Flux. Invulnerable for 2.5 s, long enough to use ahead of Essence Flux. (Kayle R Divine Judgment → Ezreal W Essence Flux)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Ezreal's (625 vs 550 attack range). Ezreal closes the gap with Arcane Shift. (Kayle basic attacks → Ezreal basic attacks)

### 6. Yuumi (net +0.68)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for ?; Trueshot Barrage takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ezreal R Trueshot Barrage)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Ezreal's Essence Flux. Untargetable for ?; Essence Flux takes 0.96 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ezreal W Essence Flux)
- Watch out: Ezreal's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 7. Bard (net +0.66)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Bard R Tempered Fate → Ezreal R Trueshot Barrage)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Ezreal's Essence Flux. Untargetable for 2.5 s, long enough to use ahead of Essence Flux. (Bard R Tempered Fate → Ezreal W Essence Flux)

### 8. Lissandra (net +0.66)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Lissandra R Frozen Tomb → Ezreal R Trueshot Barrage)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ezreal's Essence Flux. Untargetable for 2.5 s, long enough to use ahead of Essence Flux. (Lissandra R Frozen Tomb → Ezreal W Essence Flux)

### 9. Fizz (net +0.63)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Fizz E Playful → Ezreal R Trueshot Barrage)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Ezreal's Essence Flux. Untargetable for 0.75 s; Essence Flux takes 0.96 s to land, enough to react. (Fizz E Playful → Ezreal W Essence Flux)
- Watch out: Ezreal's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 10. Sivir (net +0.63)

- **0.55** spell shield: Spell Shield's spell shield blocks Ezreal's Trueshot Barrage. Spell shield for 1.5 s, long enough to use ahead of Trueshot Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ezreal R Trueshot Barrage)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Ezreal's Essence Flux. Spell shield for 1.5 s, long enough to use ahead of Essence Flux. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents the mark from being triggered by an ability. If the mark is triggered by a basic attack, spell shield will prevent Essence Flux's damage. (Sivir E Spell Shield → Ezreal W Essence Flux)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.90 | 0.90 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 2 | Mel | +0.88 | 0.88 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 3 | Yasuo | +0.76 | 0.96 | 0.20 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Braum | +0.74 | 1.06 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Kayle | +0.73 | 0.73 | 0.00 |  |
| 6 | Yuumi | +0.68 | 0.78 | 0.10 |  |
| 7 | Bard | +0.66 | 0.66 | 0.00 |  |
| 8 | Lissandra | +0.66 | 0.66 | 0.00 |  |
| 9 | Fizz | +0.63 | 0.78 | 0.15 |  |
| 10 | Sivir | +0.63 | 0.63 | 0.00 |  |
| 11 | Aurora | +0.62 | 0.62 | 0.00 |  |
| 12 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 13 | Vladimir | +0.55 | 0.71 | 0.16 |  |
| 14 | Teemo | +0.51 | 0.51 | 0.00 | blind (Blinding Dart) |
| 15 | Pantheon | +0.50 | 0.70 | 0.20 |  |
| 16 | Camille | +0.49 | 0.65 | 0.16 |  |
| 17 | Kayn | +0.46 | 0.66 | 0.20 |  |
| 18 | Rek'Sai | +0.46 | 0.66 | 0.20 |  |
| 19 | Evelynn | +0.44 | 0.66 | 0.22 |  |
| 20 | Shaco | +0.44 | 0.66 | 0.22 |  |
| 21 | Maokai | +0.43 | 0.75 | 0.32 |  |
| 22 | Fiora | +0.41 | 0.73 | 0.32 |  |
| 23 | Master Yi | +0.40 | 0.70 | 0.30 |  |
| 24 | Zed | +0.40 | 0.62 | 0.22 |  |
| 25 | Gwen | +0.38 | 0.70 | 0.32 |  |
| 26 | Nocturne | +0.32 | 0.64 | 0.32 |  |
| 27 | Xin Zhao | +0.32 | 0.62 | 0.30 |  |
| 28 | Shen | +0.31 | 0.53 | 0.22 |  |
| 29 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 30 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 31 | Jax | +0.24 | 0.56 | 0.32 |  |
| 32 | Nilah | +0.19 | 0.45 | 0.26 |  |
| 33 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 34 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 35 | Annie | +0.04 | 0.04 | 0.00 |  |
| 36 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 37 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 38 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 39 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 40 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 41 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 42 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 43 | Azir | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Draven | 0.00 | 0.00 | 0.00 |  |
| 47 | Elise | 0.00 | 0.00 | 0.00 |  |
| 48 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 51 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 52 | Janna | 0.00 | 0.00 | 0.00 |  |
| 53 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 54 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 55 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 56 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 57 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 63 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 64 | Lux | 0.00 | 0.00 | 0.00 |  |
| 65 | Malzahar | 0.00 | 0.00 | 0.00 |  |
| 66 | Milio | 0.00 | 0.00 | 0.00 |  |
| 67 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 68 | Nami | 0.00 | 0.00 | 0.00 |  |
| 69 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 70 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 71 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 72 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 73 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 74 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 75 | Senna | 0.00 | 0.00 | 0.00 |  |
| 76 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 77 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 78 | Sona | 0.00 | 0.00 | 0.00 |  |
| 79 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 80 | Swain | 0.00 | 0.00 | 0.00 |  |
| 81 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 82 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 83 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 84 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 85 | Varus | 0.00 | 0.00 | 0.00 |  |
| 86 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 87 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 88 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 89 | Vex | 0.00 | 0.00 | 0.00 |  |
| 90 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 91 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 92 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 93 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 94 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 95 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 96 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 97 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 98 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 99 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 100 | Graves | -0.07 | 0.00 | 0.07 |  |
| 101 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 102 | Kled | -0.12 | 0.00 | 0.12 |  |
| 103 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 104 | Viego | -0.14 | 0.00 | 0.14 |  |
| 105 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 106 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 107 | Yone | -0.15 | 0.00 | 0.15 |  |
| 108 | Briar | -0.16 | 0.00 | 0.16 |  |
| 109 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 110 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 111 | Morgana | -0.16 | 0.00 | 0.16 |  |
| 112 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 113 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 114 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 115 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 116 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 117 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 118 | Rell | -0.20 | 0.00 | 0.20 |  |
| 119 | Zaahen | -0.20 | 0.00 | 0.20 |  |
| 120 | Akali | -0.22 | 0.00 | 0.22 |  |
| 121 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 122 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 123 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 124 | Galio | -0.22 | 0.00 | 0.22 |  |
| 125 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 126 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 127 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 128 | Riven | -0.22 | 0.00 | 0.22 |  |
| 129 | Talon | -0.22 | 0.00 | 0.22 |  |
| 130 | Vi | -0.22 | 0.00 | 0.22 |  |
| 131 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 132 | Warwick | -0.22 | 0.00 | 0.22 |  |
| 133 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 134 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 135 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 136 | Tahm Kench | -0.30 | 0.00 | 0.30 |  |
| 137 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 138 | Zac | -0.30 | 0.00 | 0.30 |  |
| 139 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 140 | Alistar | -0.32 | 0.00 | 0.32 |  |
| 141 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 142 | Diana | -0.32 | 0.00 | 0.32 |  |
| 143 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 144 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 145 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 146 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 147 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 148 | Leona | -0.32 | 0.00 | 0.32 |  |
| 149 | Locke | -0.32 | 0.00 | 0.32 |  |
| 150 | Poppy | -0.32 | 0.00 | 0.32 |  |
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
