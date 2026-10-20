# Counters to Seraphine (patch 26.20)

Every champion ranked by what its kit does against Seraphine's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Seraphine's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Seraphine` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +1.14)

- **0.80** projectile block: Blade Whirl blocks Seraphine's Encore, a projectile. Blade Whirl for 0.75 s; Encore takes 1.31 s to land, enough to react. (Samira W Blade Whirl → Seraphine R Encore)
- **0.49** projectile block: Blade Whirl blocks Seraphine's Beat Drop, a projectile. Blade Whirl for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Samira W Blade Whirl → Seraphine E Beat Drop)
- **0.25** projectile block: Blade Whirl blocks Seraphine's High Note, a projectile. Blade Whirl for 0.75 s; High Note takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Seraphine Q High Note)

### 2. Mel (net +1.12)

- **0.80** projectile block: Rebuttal blocks Seraphine's Encore, a projectile. Rebuttal for 0.75 s; Encore takes 1.31 s to land, enough to react. (Mel W Rebuttal → Seraphine R Encore)
- **0.46** projectile block: Rebuttal blocks Seraphine's Beat Drop, a projectile. Rebuttal for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Mel W Rebuttal → Seraphine E Beat Drop)
- **0.24** projectile block: Rebuttal blocks Seraphine's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Seraphine basic attacks)

### 3. Sivir (net +1.07)

- **0.80** spell shield: Spell Shield's spell shield blocks Seraphine's Encore. Spell shield for 1.5 s, long enough to use ahead of Encore. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine R Encore)
- **0.54** spell shield: Spell Shield's spell shield blocks Seraphine's Beat Drop. Spell shield for 1.5 s, long enough to use ahead of Beat Drop. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine E Beat Drop)

### 4. Yasuo (net +1.02)

- **0.80** projectile block: Wind Wall blocks Seraphine's Encore, a projectile. Wind Wall for 4 s, long enough to use ahead of Encore. (Yasuo W Wind Wall → Seraphine R Encore)
- **0.55** projectile block: Wind Wall blocks Seraphine's Beat Drop, a projectile. Wind Wall for 4 s, long enough to use ahead of Beat Drop. (Yasuo W Wind Wall → Seraphine E Beat Drop)
- **0.31** projectile block: Wind Wall blocks Seraphine's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 5. Fizz (net +1.02)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Seraphine's Encore. Untargetable for 0.75 s; Encore takes 1.31 s to land, enough to react. (Fizz E Playful → Seraphine R Encore)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Seraphine's Beat Drop. Untargetable for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. (Fizz E Playful → Seraphine E Beat Drop)
- Watch out: Seraphine's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

### 6. Braum (net +1.01)

- **0.80** projectile block: Unbreakable blocks Seraphine's Encore, a projectile. Unbreakable for 4 s, long enough to use ahead of Encore. (Braum E Unbreakable → Seraphine R Encore)
- **0.70** projectile block: Unbreakable blocks Seraphine's Beat Drop, a projectile. Unbreakable for 4 s, long enough to use ahead of Beat Drop. (Braum E Unbreakable → Seraphine E Beat Drop)
- **0.41** projectile block: Unbreakable blocks Seraphine's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 7. Fiora (net +0.98)

- **0.90** parry: Riposte parries Seraphine's Encore and stuns back. Parry for 0.75 s; Encore takes 1.31 s to land, enough to react. Negating Encore's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Seraphine R Encore)
- **0.67** parry: Riposte parries Seraphine's Beat Drop and stuns back. Parry for 0.75 s; Beat Drop takes 1.33 s to land, enough to react. Negating Beat Drop's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Seraphine E Beat Drop)
- **0.07** attack speed slow: Riposte cuts Seraphine's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

### 8. Morgana (net +0.98)

- **0.80** cc immunity: Black Shield makes Morgana immune to Seraphine's Encore (charm, slow). Immune for 5 s, long enough to use ahead of Encore. (Morgana E Black Shield → Seraphine R Encore)
- **0.57** cc immunity: Black Shield makes Morgana immune to Seraphine's Beat Drop (slow, root, stun). Immune for 5 s, long enough to use ahead of Beat Drop. (Morgana E Black Shield → Seraphine E Beat Drop)
- Watch out: Seraphine's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

### 9. Aurora (net +0.97)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Seraphine's Encore. Untargetable for 0.4 s; Encore takes 1.31 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Seraphine R Encore)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Seraphine's Beat Drop. Untargetable for 0.4 s; Beat Drop takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Seraphine E Beat Drop)

### 10. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Seraphine's Encore. Untargetable for 2.5 s, long enough to use ahead of Encore. (Bard R Tempered Fate → Seraphine R Encore)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Seraphine's Beat Drop. Untargetable for 2.5 s, long enough to use ahead of Beat Drop. (Bard R Tempered Fate → Seraphine E Beat Drop)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +1.14 | 1.14 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 2 | Mel | +1.12 | 1.12 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 3 | Sivir | +1.07 | 1.07 | 0.00 |  |
| 4 | Yasuo | +1.02 | 1.19 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 5 | Fizz | +1.02 | 1.15 | 0.13 |  |
| 6 | Braum | +1.01 | 1.30 | 0.29 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +0.98 | 1.25 | 0.27 |  |
| 8 | Morgana | +0.98 | 1.09 | 0.11 |  |
| 9 | Aurora | +0.97 | 0.97 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.97 | 0.97 | 0.00 |  |
| 13 | Maokai | +0.86 | 1.15 | 0.29 |  |
| 14 | Udyr | +0.86 | 1.15 | 0.29 |  |
| 15 | Kled | +0.86 | 0.96 | 0.10 |  |
| 16 | Vladimir | +0.85 | 1.09 | 0.24 |  |
| 17 | Nocturne | +0.84 | 1.13 | 0.29 |  |
| 18 | Camille | +0.83 | 0.97 | 0.14 |  |
| 19 | Milio | +0.81 | 0.81 | 0.00 |  |
| 20 | Gwen | +0.80 | 1.07 | 0.27 |  |
| 21 | Rek'Sai | +0.80 | 0.97 | 0.17 |  |
| 22 | Zaahen | +0.80 | 0.97 | 0.17 |  |
| 23 | Evelynn | +0.78 | 0.97 | 0.19 |  |
| 24 | Shaco | +0.78 | 0.97 | 0.19 |  |
| 25 | Zed | +0.78 | 0.97 | 0.19 |  |
| 26 | Kalista | +0.77 | 0.77 | 0.00 |  |
| 27 | Master Yi | +0.74 | 1.30 | 0.56 |  |
| 28 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 29 | Alistar | +0.49 | 0.78 | 0.29 |  |
| 30 | Olaf | +0.39 | 0.97 | 0.58 |  |
| 31 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 32 | Rengar | +0.34 | 0.92 | 0.58 |  |
| 33 | Yuumi | +0.33 | 1.15 | 0.82 |  |
| 34 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 35 | Gangplank | +0.31 | 0.89 | 0.58 |  |
| 36 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 37 | Sion | +0.26 | 0.98 | 0.72 |  |
| 38 | Xin Zhao | +0.23 | 0.48 | 0.25 |  |
| 39 | Mordekaiser | +0.17 | 0.68 | 0.51 |  |
| 40 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 41 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 42 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 43 | Senna | +0.12 | 0.12 | 0.00 |  |
| 44 | Annie | +0.11 | 0.11 | 0.00 |  |
| 45 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 46 | Nilah | +0.05 | 0.27 | 0.22 |  |
| 47 | Garen | +0.02 | 0.53 | 0.51 |  |
| 48 | Jax | +0.02 | 0.31 | 0.29 |  |
| 49 | Varus | +0.02 | 0.18 | 0.16 |  |
| 50 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 51 | Azir | 0.00 | 0.00 | 0.00 |  |
| 52 | Brand | 0.00 | 0.00 | 0.00 |  |
| 53 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 54 | Corki | 0.00 | 0.00 | 0.00 |  |
| 55 | Draven | 0.00 | 0.00 | 0.00 |  |
| 56 | Elise | 0.00 | 0.00 | 0.00 |  |
| 57 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 58 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 59 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 60 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 61 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 62 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 63 | Karma | 0.00 | 0.00 | 0.00 |  |
| 64 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 65 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 66 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 67 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 68 | Lux | 0.00 | 0.00 | 0.00 |  |
| 69 | Nami | 0.00 | 0.00 | 0.00 |  |
| 70 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 71 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 72 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 73 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 74 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 75 | Sona | 0.00 | 0.00 | 0.00 |  |
| 76 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 77 | Swain | 0.00 | 0.00 | 0.00 |  |
| 78 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 79 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 80 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 81 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 82 | Vex | 0.00 | 0.00 | 0.00 |  |
| 83 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 84 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 85 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 86 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 87 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 88 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 89 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 90 | Kayn | -0.01 | 0.97 | 0.98 |  |
| 91 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 92 | Graves | -0.05 | 0.00 | 0.05 |  |
| 93 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 94 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 95 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 96 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 97 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 98 | Yone | -0.13 | 0.00 | 0.13 |  |
| 99 | Aurelion Sol | -0.14 | 0.00 | 0.14 |  |
| 100 | Briar | -0.14 | 0.00 | 0.14 |  |
| 101 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 102 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 103 | Malzahar | -0.15 | 0.57 | 0.72 |  |
| 104 | Hecarim | -0.17 | 0.00 | 0.17 |  |
| 105 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 106 | Ornn | -0.17 | 0.00 | 0.17 |  |
| 107 | Rell | -0.17 | 0.00 | 0.17 |  |
| 108 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 109 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 110 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 111 | Akali | -0.19 | 0.00 | 0.19 |  |
| 112 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 113 | Ekko | -0.19 | 0.00 | 0.19 |  |
| 114 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 115 | Riven | -0.19 | 0.00 | 0.19 |  |
| 116 | Talon | -0.19 | 0.00 | 0.19 |  |
| 117 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 118 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 119 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 120 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 121 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 122 | Diana | -0.27 | 0.00 | 0.27 |  |
| 123 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 124 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 125 | Shyvana | -0.27 | 0.00 | 0.27 |  |
| 126 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 127 | Caitlyn | -0.29 | 0.22 | 0.51 |  |
| 128 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 129 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 130 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 131 | Leona | -0.29 | 0.00 | 0.29 |  |
| 132 | Locke | -0.29 | 0.00 | 0.29 |  |
| 133 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 134 | Sett | -0.29 | 0.00 | 0.29 |  |
| 135 | Singed | -0.31 | 0.27 | 0.58 |  |
| 136 | Quinn | -0.31 | 0.00 | 0.31 |  |
| 137 | Warwick | -0.32 | 0.98 | 1.30 |  |
| 138 | Skarner | -0.39 | 0.15 | 0.54 |  |
| 139 | Rammus | -0.40 | 0.29 | 0.69 |  |
| 140 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 141 | Viego | -0.44 | 0.00 | 0.44 |  |
| 142 | Akshan | -0.49 | 0.00 | 0.49 |  |
| 143 | Vel'Koz | -0.50 | 0.00 | 0.50 |  |
| 144 | Darius | -0.51 | 0.00 | 0.51 |  |
| 145 | Jhin | -0.51 | 0.00 | 0.51 |  |
| 146 | Lucian | -0.51 | 0.00 | 0.51 |  |
| 147 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 148 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 149 | Miss Fortune | -0.53 | 0.00 | 0.53 |  |
| 150 | Gragas | -0.54 | 0.00 | 0.54 |  |
| 151 | Taric | -0.54 | 0.00 | 0.54 |  |
| 152 | Katarina | -0.56 | 0.18 | 0.74 |  |
| 153 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 154 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 155 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 156 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 157 | Pantheon | -0.60 | 0.54 | 1.14 |  |
| 158 | Xerath | -0.60 | 0.00 | 0.60 |  |
| 159 | Karthus | -0.67 | 0.00 | 0.67 |  |
| 160 | Poppy | -0.67 | 0.00 | 0.67 |  |
| 161 | Twisted Fate | -0.68 | 0.00 | 0.68 |  |
| 162 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 163 | Janna | -0.76 | 0.00 | 0.76 |  |
| 164 | Vi | -0.77 | 0.00 | 0.77 |  |
| 165 | Fiddlesticks | -0.78 | 0.00 | 0.78 |  |
| 166 | Shen | -0.80 | 0.29 | 1.09 |  |
| 167 | Zac | -0.92 | 0.00 | 0.92 |  |
| 168 | Naafiri | -0.95 | 0.00 | 0.95 |  |
| 169 | Taliyah | -0.96 | 0.00 | 0.96 |  |
| 170 | Tahm Kench | -0.99 | 0.00 | 0.99 |  |
| 171 | Nunu & Willump | -1.08 | 0.30 | 1.38 |  |
| 172 | Galio | -1.31 | 0.00 | 1.31 |  |
