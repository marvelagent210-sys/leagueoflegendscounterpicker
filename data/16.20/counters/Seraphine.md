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

### 3. Elise (net +1.07)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Seraphine's Encore. Untargetable for 0.6 s; Encore takes 1.31 s to land, enough to react. (Elise E Rappel → Seraphine R Encore)
- **0.54** untargetable: Rappel makes Elise untargetable, dodging Seraphine's Beat Drop. Untargetable for 0.6 s; Beat Drop takes 1.33 s to land, enough to react. (Elise E Rappel → Seraphine E Beat Drop)

### 4. Sivir (net +1.07)

- **0.80** spell shield: Spell Shield's spell shield blocks Seraphine's Encore. Spell shield for 1.5 s, long enough to use ahead of Encore. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine R Encore)
- **0.54** spell shield: Spell Shield's spell shield blocks Seraphine's Beat Drop. Spell shield for 1.5 s, long enough to use ahead of Beat Drop. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Seraphine E Beat Drop)

### 5. Yasuo (net +1.02)

- **0.80** projectile block: Wind Wall blocks Seraphine's Encore, a projectile. Wind Wall for 4 s, long enough to use ahead of Encore. (Yasuo W Wind Wall → Seraphine R Encore)
- **0.55** projectile block: Wind Wall blocks Seraphine's Beat Drop, a projectile. Wind Wall for 4 s, long enough to use ahead of Beat Drop. (Yasuo W Wind Wall → Seraphine E Beat Drop)
- **0.31** projectile block: Wind Wall blocks Seraphine's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Seraphine basic attacks)
- Watch out: Seraphine's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

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
| 3 | Elise | +1.07 | 1.07 | 0.00 |  |
| 4 | Sivir | +1.07 | 1.07 | 0.00 |  |
| 5 | Yasuo | +1.02 | 1.19 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 6 | Braum | +1.01 | 1.30 | 0.29 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Fiora | +0.98 | 1.25 | 0.27 |  |
| 8 | Morgana | +0.98 | 1.09 | 0.11 |  |
| 9 | Aurora | +0.97 | 0.97 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.97 | 0.97 | 0.00 |  |
| 13 | Vladimir | +0.90 | 1.09 | 0.19 |  |
| 14 | Maokai | +0.86 | 1.15 | 0.29 |  |
| 15 | Udyr | +0.86 | 1.15 | 0.29 |  |
| 16 | Kled | +0.86 | 0.96 | 0.10 |  |
| 17 | Master Yi | +0.84 | 1.30 | 0.46 |  |
| 18 | Nocturne | +0.84 | 1.13 | 0.29 |  |
| 19 | Camille | +0.83 | 0.97 | 0.14 |  |
| 20 | Milio | +0.81 | 0.81 | 0.00 |  |
| 21 | Gwen | +0.80 | 1.07 | 0.27 |  |
| 22 | Ekko | +0.80 | 0.99 | 0.19 |  |
| 23 | Rek'Sai | +0.80 | 0.97 | 0.17 |  |
| 24 | Zaahen | +0.80 | 0.97 | 0.17 |  |
| 25 | Evelynn | +0.78 | 0.97 | 0.19 |  |
| 26 | Shaco | +0.78 | 0.97 | 0.19 |  |
| 27 | Zed | +0.78 | 0.97 | 0.19 |  |
| 28 | Kalista | +0.77 | 0.77 | 0.00 |  |
| 29 | Yuumi | +0.68 | 1.15 | 0.47 |  |
| 30 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 31 | Warwick | +0.50 | 0.98 | 0.48 |  |
| 32 | Alistar | +0.49 | 0.78 | 0.29 |  |
| 33 | Kindred | +0.48 | 0.48 | 0.00 |  |
| 34 | Olaf | +0.39 | 0.97 | 0.58 |  |
| 35 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 36 | Kayn | +0.35 | 0.97 | 0.62 |  |
| 37 | Sion | +0.34 | 0.98 | 0.64 |  |
| 38 | Rengar | +0.34 | 0.92 | 0.58 |  |
| 39 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 40 | Gangplank | +0.31 | 0.89 | 0.58 |  |
| 41 | Pantheon | +0.28 | 0.54 | 0.26 |  |
| 42 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 43 | Xin Zhao | +0.23 | 0.48 | 0.25 |  |
| 44 | Mordekaiser | +0.17 | 0.68 | 0.51 |  |
| 45 | Malzahar | +0.17 | 0.57 | 0.40 |  |
| 46 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 47 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 48 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 49 | Senna | +0.12 | 0.12 | 0.00 |  |
| 50 | Annie | +0.11 | 0.11 | 0.00 |  |
| 51 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 52 | Varus | +0.07 | 0.18 | 0.11 |  |
| 53 | Nilah | +0.05 | 0.27 | 0.22 |  |
| 54 | Garen | +0.02 | 0.53 | 0.51 |  |
| 55 | Jax | +0.02 | 0.31 | 0.29 |  |
| 56 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 57 | Azir | 0.00 | 0.00 | 0.00 |  |
| 58 | Brand | 0.00 | 0.00 | 0.00 |  |
| 59 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 60 | Corki | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 63 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 64 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 65 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 66 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 67 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 68 | Karma | 0.00 | 0.00 | 0.00 |  |
| 69 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 70 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lux | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 75 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 76 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 77 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 78 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 79 | Sona | 0.00 | 0.00 | 0.00 |  |
| 80 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 81 | Swain | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 85 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 86 | Vex | 0.00 | 0.00 | 0.00 |  |
| 87 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 88 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 89 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 90 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 91 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 92 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 93 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 94 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 95 | Graves | -0.05 | 0.00 | 0.05 |  |
| 96 | Taric | -0.06 | 0.48 | 0.54 |  |
| 97 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 98 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 99 | Malphite | -0.10 | 0.19 | 0.29 |  |
| 100 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 101 | Fizz | -0.13 | 0.00 | 0.13 |  |
| 102 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 103 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 104 | Urgot | -0.13 | 0.00 | 0.13 |  |
| 105 | Yone | -0.13 | 0.00 | 0.13 |  |
| 106 | Briar | -0.14 | 0.00 | 0.14 |  |
| 107 | Ivern | -0.14 | 0.00 | 0.14 |  |
| 108 | K'Sante | -0.14 | 0.00 | 0.14 |  |
| 109 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 110 | Hecarim | -0.17 | 0.00 | 0.17 |  |
| 111 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 112 | Ornn | -0.17 | 0.00 | 0.17 |  |
| 113 | Rell | -0.17 | 0.00 | 0.17 |  |
| 114 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 115 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 116 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 117 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 118 | Akali | -0.19 | 0.00 | 0.19 |  |
| 119 | Ambessa | -0.19 | 0.00 | 0.19 |  |
| 120 | Lee Sin | -0.19 | 0.00 | 0.19 |  |
| 121 | Riven | -0.19 | 0.00 | 0.19 |  |
| 122 | Talon | -0.19 | 0.00 | 0.19 |  |
| 123 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 124 | Rammus | -0.25 | 0.29 | 0.54 |  |
| 125 | Aatrox | -0.25 | 0.00 | 0.25 |  |
| 126 | Nautilus | -0.25 | 0.00 | 0.25 |  |
| 127 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 128 | Diana | -0.27 | 0.00 | 0.27 |  |
| 129 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 130 | Sejuani | -0.27 | 0.00 | 0.27 |  |
| 131 | Shyvana | -0.27 | 0.00 | 0.27 |  |
| 132 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 133 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 134 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 135 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 136 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 137 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 138 | Amumu | -0.29 | 0.00 | 0.29 |  |
| 139 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 140 | Kha'Zix | -0.29 | 0.00 | 0.29 |  |
| 141 | Leona | -0.29 | 0.00 | 0.29 |  |
| 142 | Locke | -0.29 | 0.00 | 0.29 |  |
| 143 | Renekton | -0.29 | 0.00 | 0.29 |  |
| 144 | Sett | -0.29 | 0.00 | 0.29 |  |
| 145 | Singed | -0.31 | 0.27 | 0.58 |  |
| 146 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 147 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 148 | Viego | -0.33 | 0.00 | 0.33 |  |
| 149 | Shen | -0.35 | 0.29 | 0.64 |  |
| 150 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 151 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 152 | Galio | -0.36 | 0.00 | 0.36 |  |
| 153 | Katarina | -0.39 | 0.18 | 0.57 |  |
| 154 | Skarner | -0.39 | 0.15 | 0.54 |  |
| 155 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 156 | Janna | -0.40 | 0.00 | 0.40 |  |
| 157 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 158 | Gragas | -0.44 | 0.00 | 0.44 |  |
| 159 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 160 | Poppy | -0.49 | 0.00 | 0.49 |  |
| 161 | Darius | -0.51 | 0.00 | 0.51 |  |
| 162 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 163 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 164 | Vi | -0.55 | 0.00 | 0.55 |  |
| 165 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 166 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 167 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 168 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 169 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 170 | Zac | -0.70 | 0.00 | 0.70 |  |
| 171 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 172 | Nunu & Willump | -0.77 | 0.30 | 1.07 |  |
