# Counters to Smolder (patch 26.20)

Every champion ranked by what its kit does against Smolder's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Smolder's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Smolder` for the full ledger of a matchup, with sources.

## Top 10

### 1. Samira (net +0.80)

- **0.55** projectile block: Blade Whirl blocks Smolder's MMOOOMMMM!, a projectile. Blade Whirl for 0.75 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Samira W Blade Whirl → Smolder R MMOOOMMMM!)
- **0.30** projectile block: Blade Whirl blocks Smolder's Achooo!, a projectile. Blade Whirl for 0.75 s; Achooo! takes 1.1 s to land, enough to react. (Samira W Blade Whirl → Smolder W Achooo!)
- **0.27** projectile block: Blade Whirl blocks Smolder's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Smolder basic attacks)

### 2. Mel (net +0.79)

- **0.55** projectile block: Rebuttal blocks Smolder's MMOOOMMMM!, a projectile. Rebuttal for 0.75 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Mel W Rebuttal → Smolder R MMOOOMMMM!)
- **0.28** projectile block: Rebuttal blocks Smolder's Achooo!, a projectile. Rebuttal for 0.75 s; Achooo! takes 1.1 s to land, enough to react. (Mel W Rebuttal → Smolder W Achooo!)
- **0.27** projectile block: Rebuttal blocks Smolder's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Smolder basic attacks)

### 3. Kayn (net +0.74)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 0.25 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Kayn R Umbral Trespass → Smolder R MMOOOMMMM!)
- **0.27** death prevention: Smolder's Super Scorcher Breath can't execute Kayn during The Darkin Scythe (invulnerable). The Darkin Scythe lasts 6 s on a ? cooldown. (Kayn I The Darkin Scythe → Smolder Q Super Scorcher Breath)
- **0.23** untargetable: Umbral Trespass makes Kayn untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 0.25 s; Super Scorcher Breath takes 0.57 s to land, enough to react. (Kayn R Umbral Trespass → Smolder Q Super Scorcher Breath)
- Watch out: Smolder's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range).

### 4. Yuumi (net +0.73)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for ?; Super Scorcher Breath takes 0.57 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Smolder Q Super Scorcher Breath)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for ?; MMOOOMMMM! takes 3.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Smolder R MMOOOMMMM!)
- Watch out: Smolder's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 5. Elise (net +0.69)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 0.6 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Elise E Rappel → Smolder R MMOOOMMMM!)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 0.6 s; Super Scorcher Breath takes 0.57 s to land, enough to react. (Elise E Rappel → Smolder Q Super Scorcher Breath)

### 6. Sivir (net +0.69)

- **0.55** spell shield: Spell Shield's spell shield blocks Smolder's MMOOOMMMM!. Spell shield for 1.5 s, long enough to use ahead of MMOOOMMMM!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Smolder R MMOOOMMMM!)
- **0.28** spell shield: Spell Shield's spell shield blocks Smolder's Super Scorcher Breath. Spell shield for 1.5 s, long enough to use ahead of Super Scorcher Breath. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Smolder Q Super Scorcher Breath)

### 7. Aurora (net +0.67)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 0.4 s; MMOOOMMMM! takes 3.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 0.4 s; Super Scorcher Breath takes 0.57 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Smolder Q Super Scorcher Breath)

### 8. Bard (net +0.67)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 2.5 s, long enough to use ahead of MMOOOMMMM!. (Bard R Tempered Fate → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 2.5 s, long enough to use ahead of Super Scorcher Breath. (Bard R Tempered Fate → Smolder Q Super Scorcher Breath)

### 9. Lissandra (net +0.67)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 2.5 s, long enough to use ahead of MMOOOMMMM!. (Lissandra R Frozen Tomb → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 2.5 s, long enough to use ahead of Super Scorcher Breath. (Lissandra R Frozen Tomb → Smolder Q Super Scorcher Breath)

### 10. Xayah (net +0.67)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 1.5 s, long enough to use ahead of MMOOOMMMM!. (Xayah R Featherstorm → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 1.5 s, long enough to use ahead of Super Scorcher Breath. (Xayah R Featherstorm → Smolder Q Super Scorcher Breath)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.79 | 0.79 | 0.00 | projectile block (Rebuttal) |
| 3 | Kayn | +0.74 | 0.94 | 0.20 |  |
| 4 | Yuumi | +0.73 | 0.83 | 0.10 |  |
| 5 | Elise | +0.69 | 0.69 | 0.00 |  |
| 6 | Sivir | +0.69 | 0.69 | 0.00 |  |
| 7 | Aurora | +0.67 | 0.67 | 0.00 |  |
| 8 | Bard | +0.67 | 0.67 | 0.00 |  |
| 9 | Lissandra | +0.67 | 0.67 | 0.00 |  |
| 10 | Xayah | +0.67 | 0.67 | 0.00 |  |
| 11 | Yasuo | +0.65 | 0.85 | 0.20 | projectile block (Wind Wall) |
| 12 | Braum | +0.61 | 0.93 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 13 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 14 | Master Yi | +0.55 | 0.85 | 0.30 |  |
| 15 | Vladimir | +0.54 | 0.70 | 0.16 |  |
| 16 | Camille | +0.51 | 0.67 | 0.16 |  |
| 17 | Rek'Sai | +0.47 | 0.67 | 0.20 |  |
| 18 | Pantheon | +0.46 | 0.66 | 0.20 |  |
| 19 | Ekko | +0.45 | 0.67 | 0.22 |  |
| 20 | Evelynn | +0.45 | 0.67 | 0.22 |  |
| 21 | Shaco | +0.45 | 0.67 | 0.22 |  |
| 22 | Zed | +0.45 | 0.67 | 0.22 |  |
| 23 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 24 | Kindred | +0.41 | 0.41 | 0.00 |  |
| 25 | Fiora | +0.40 | 0.72 | 0.32 |  |
| 26 | Maokai | +0.40 | 0.72 | 0.32 |  |
| 27 | Nocturne | +0.39 | 0.71 | 0.32 |  |
| 28 | Gwen | +0.37 | 0.69 | 0.32 |  |
| 29 | Varus | +0.33 | 0.33 | 0.00 |  |
| 30 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 31 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 32 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 33 | Zaahen | +0.24 | 0.44 | 0.20 |  |
| 34 | Shen | +0.20 | 0.42 | 0.22 |  |
| 35 | Zilean | +0.19 | 0.19 | 0.00 |  |
| 36 | Anivia | +0.18 | 0.18 | 0.00 |  |
| 37 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 38 | Xin Zhao | +0.14 | 0.44 | 0.30 |  |
| 39 | Jax | +0.12 | 0.44 | 0.32 |  |
| 40 | Kalista | +0.12 | 0.12 | 0.00 |  |
| 41 | Milio | +0.12 | 0.12 | 0.00 |  |
| 42 | Nilah | +0.11 | 0.37 | 0.26 |  |
| 43 | Malzahar | +0.10 | 0.10 | 0.00 |  |
| 44 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 45 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 46 | Annie | +0.08 | 0.08 | 0.00 |  |
| 47 | Kled | +0.04 | 0.16 | 0.12 |  |
| 48 | Morgana | +0.03 | 0.19 | 0.16 |  |
| 49 | Katarina | +0.01 | 0.33 | 0.32 |  |
| 50 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 51 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 52 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 53 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 54 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 55 | Azir | 0.00 | 0.00 | 0.00 |  |
| 56 | Brand | 0.00 | 0.00 | 0.00 |  |
| 57 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 58 | Corki | 0.00 | 0.00 | 0.00 |  |
| 59 | Draven | 0.00 | 0.00 | 0.00 |  |
| 60 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 61 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 64 | Janna | 0.00 | 0.00 | 0.00 |  |
| 65 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 66 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 67 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 68 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 69 | Karma | 0.00 | 0.00 | 0.00 |  |
| 70 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 73 | Lux | 0.00 | 0.00 | 0.00 |  |
| 74 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 80 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 81 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 82 | Senna | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Sona | 0.00 | 0.00 | 0.00 |  |
| 85 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 86 | Swain | 0.00 | 0.00 | 0.00 |  |
| 87 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 88 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 89 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 94 | Vex | 0.00 | 0.00 | 0.00 |  |
| 95 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 96 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 97 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 100 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 101 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 102 | Warwick | -0.05 | 0.17 | 0.22 |  |
| 103 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 104 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 105 | Graves | -0.07 | 0.00 | 0.07 |  |
| 106 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 107 | Tryndamere | -0.11 | 0.19 | 0.30 |  |
| 108 | Udyr | -0.12 | 0.20 | 0.32 |  |
| 109 | Zac | -0.12 | 0.18 | 0.30 |  |
| 110 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 111 | Viego | -0.14 | 0.00 | 0.14 |  |
| 112 | Singed | -0.15 | 0.50 | 0.65 |  |
| 113 | Fizz | -0.15 | 0.00 | 0.15 |  |
| 114 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 115 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 116 | Yone | -0.15 | 0.00 | 0.15 |  |
| 117 | Briar | -0.16 | 0.00 | 0.16 |  |
| 118 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 119 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 120 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 121 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 122 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 123 | Alistar | -0.19 | 0.13 | 0.32 |  |
| 124 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 125 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 126 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 127 | Rell | -0.20 | 0.00 | 0.20 |  |
| 128 | Akali | -0.22 | 0.00 | 0.22 |  |
| 129 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 130 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 131 | Galio | -0.22 | 0.00 | 0.22 |  |
| 132 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 133 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 134 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 135 | Riven | -0.22 | 0.00 | 0.22 |  |
| 136 | Talon | -0.22 | 0.00 | 0.22 |  |
| 137 | Vi | -0.22 | 0.00 | 0.22 |  |
| 138 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 139 | Taric | -0.24 | 0.41 | 0.65 |  |
| 140 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 141 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 142 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 143 | Tahm Kench | -0.30 | 0.00 | 0.30 |  |
| 144 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 145 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 146 | Diana | -0.32 | 0.00 | 0.32 |  |
| 147 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 148 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 149 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 150 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 151 | Leona | -0.32 | 0.00 | 0.32 |  |
| 152 | Locke | -0.32 | 0.00 | 0.32 |  |
| 153 | Poppy | -0.32 | 0.00 | 0.32 |  |
| 154 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 155 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 156 | Sett | -0.32 | 0.00 | 0.32 |  |
| 157 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 158 | Garen | -0.40 | 0.21 | 0.61 |  |
| 159 | Sion | -0.44 | 0.17 | 0.61 |  |
| 160 | Nunu & Willump | -0.45 | 0.20 | 0.65 |  |
| 161 | Olaf | -0.48 | 0.17 | 0.65 |  |
| 162 | Rengar | -0.49 | 0.16 | 0.65 |  |
| 163 | Gangplank | -0.50 | 0.15 | 0.65 |  |
| 164 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 165 | Skarner | -0.55 | 0.10 | 0.65 |  |
| 166 | Darius | -0.61 | 0.00 | 0.61 |  |
| 167 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 168 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 169 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 170 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 171 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 172 | Rumble | -0.65 | 0.00 | 0.65 |  |
