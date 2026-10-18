# Counters to Miss Fortune (patch 26.20)

Every champion ranked by what its kit does against Miss Fortune's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Miss Fortune's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MissFortune` for the full ledger of a matchup, with sources.

## Top 10

### 1. Rell (net +1.20)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Miss Fortune's Bullet Time (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Miss Fortune R Bullet Time)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Miss Fortune's Bullet Time (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Miss Fortune R Bullet Time)
- **0.28** interrupt: Full Tilt's stun interrupts Miss Fortune's Bullet Time (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Miss Fortune R Bullet Time)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Rell's (550 vs 175 attack range).

### 2. Yasuo (net +1.16)

- **0.55** projectile block: Wind Wall blocks Miss Fortune's Bullet Time, a projectile. Wind Wall for 4 s, long enough to use ahead of Bullet Time. (Yasuo W Wind Wall → Miss Fortune R Bullet Time)
- **0.35** projectile block: Wind Wall blocks Miss Fortune's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Miss Fortune basic attacks)
- **0.28** interrupt: Last Breath's airborne interrupts Miss Fortune's Bullet Time (normal channel). Last Breath must land during the channel. (Yasuo R Last Breath → Miss Fortune R Bullet Time)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 3. Braum (net +1.10)

- **0.55** projectile block: Unbreakable blocks Miss Fortune's Bullet Time, a projectile. Unbreakable for 4 s, long enough to use ahead of Bullet Time. (Braum E Unbreakable → Miss Fortune R Bullet Time)
- **0.45** projectile block: Unbreakable blocks Miss Fortune's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Miss Fortune basic attacks)
- **0.34** projectile block: Unbreakable blocks Miss Fortune's Double Up, a projectile. Unbreakable for 4 s, long enough to use ahead of Double Up. (Braum E Unbreakable → Miss Fortune Q Double Up)
- Watch out: Miss Fortune's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 4. Kayle (net +0.81)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Miss Fortune's Bullet Time. Invulnerable for 2.5 s, long enough to use ahead of Bullet Time. (Kayle R Divine Judgment → Miss Fortune R Bullet Time)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Miss Fortune's Double Up. Invulnerable for 2.5 s, long enough to use ahead of Double Up. (Kayle R Divine Judgment → Miss Fortune Q Double Up)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Miss Fortune's (625 vs 550 attack range). Miss Fortune has no dash or blink to close the gap. (Kayle basic attacks → Miss Fortune basic attacks)

### 5. Taliyah (net +0.81)

- **0.28** interrupt: Seismic Shove's airborne interrupts Miss Fortune's Bullet Time (normal channel). Seismic Shove must land during the channel. (Taliyah W Seismic Shove → Miss Fortune R Bullet Time)
- **0.28** interrupt: Unraveled Earth's stun interrupts Miss Fortune's Bullet Time (normal channel). Unraveled Earth must land during the channel. (Taliyah E Unraveled Earth → Miss Fortune R Bullet Time)
- **0.25** interrupt: Weaver's Wall's airborne interrupts Miss Fortune's Bullet Time (normal channel). Weaver's Wall must land during the channel. (Taliyah R Weaver's Wall → Miss Fortune R Bullet Time)

### 6. Rek'Sai (net +0.75)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 1.5 s, long enough to use ahead of Bullet Time. (Rek'Sai R Void Rush → Miss Fortune R Bullet Time)
- **0.28** interrupt: Unburrow's airborne interrupts Miss Fortune's Bullet Time (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Miss Fortune R Bullet Time)
- **0.23** untargetable: Void Rush makes Rek'Sai untargetable, dodging Miss Fortune's Double Up. Untargetable for 1.5 s, long enough to use ahead of Double Up. (Rek'Sai R Void Rush → Miss Fortune Q Double Up)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 7. Bard (net +0.75)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 2.5 s, long enough to use ahead of Bullet Time. (Bard R Tempered Fate → Miss Fortune R Bullet Time)
- **0.28** interrupt: Tempered Fate's stasis interrupts Miss Fortune's Bullet Time (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Miss Fortune R Bullet Time)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Miss Fortune's Double Up. Untargetable for 2.5 s, long enough to use ahead of Double Up. (Bard R Tempered Fate → Miss Fortune Q Double Up)

### 8. Lissandra (net +0.75)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 2.5 s, long enough to use ahead of Bullet Time. (Lissandra R Frozen Tomb → Miss Fortune R Bullet Time)
- **0.28** interrupt: Frozen Tomb's stun interrupts Miss Fortune's Bullet Time (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Miss Fortune R Bullet Time)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Miss Fortune's Double Up. Untargetable for 2.5 s, long enough to use ahead of Double Up. (Lissandra R Frozen Tomb → Miss Fortune Q Double Up)

### 9. Xin Zhao (net +0.73)

- **0.55** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Miss Fortune's Bullet Time. Invulnerable for 4 s, long enough to use ahead of Bullet Time. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Miss Fortune R Bullet Time)
- **0.28** interrupt: Crescent Guard's airborne interrupts Miss Fortune's Bullet Time (normal channel). Crescent Guard must land during the channel. (Xin Zhao R Crescent Guard → Miss Fortune R Bullet Time)
- **0.28** interrupt: Three Talon Strike's airborne interrupts Miss Fortune's Bullet Time (normal channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Miss Fortune R Bullet Time)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range).

### 10. Lulu (net +0.72)

- **0.30** disarm: Whimsy disarms Miss Fortune for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Miss Fortune basic attacks)
- **0.28** interrupt: Whimsy's polymorph interrupts Miss Fortune's Bullet Time (normal channel). Whimsy must land during the channel. (Lulu W Whimsy → Miss Fortune R Bullet Time)
- **0.28** interrupt: Wild Growth's airborne interrupts Miss Fortune's Bullet Time (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Miss Fortune R Bullet Time)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.20 | 1.40 | 0.20 |  |
| 2 | Yasuo | +1.16 | 1.36 | 0.20 | projectile block (Wind Wall) |
| 3 | Braum | +1.10 | 1.42 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Kayle | +0.81 | 0.81 | 0.00 |  |
| 5 | Taliyah | +0.81 | 0.81 | 0.00 |  |
| 6 | Rek'Sai | +0.75 | 0.95 | 0.20 |  |
| 7 | Bard | +0.75 | 0.75 | 0.00 |  |
| 8 | Lissandra | +0.75 | 0.75 | 0.00 |  |
| 9 | Xin Zhao | +0.73 | 1.03 | 0.30 |  |
| 10 | Lulu | +0.72 | 0.72 | 0.00 |  |
| 11 | K'Sante | +0.68 | 0.84 | 0.16 |  |
| 12 | Xayah | +0.67 | 0.67 | 0.00 |  |
| 13 | Camille | +0.65 | 0.81 | 0.16 |  |
| 14 | Fizz | +0.64 | 0.79 | 0.15 |  |
| 15 | Yuumi | +0.62 | 0.72 | 0.10 |  |
| 16 | Malzahar | +0.62 | 0.62 | 0.00 |  |
| 17 | Heimerdinger | +0.61 | 0.61 | 0.00 |  |
| 18 | Galio | +0.57 | 0.79 | 0.22 |  |
| 19 | Rammus | +0.56 | 0.88 | 0.32 |  |
| 20 | Anivia | +0.56 | 0.56 | 0.00 |  |
| 21 | Aurelion Sol | +0.56 | 0.56 | 0.00 |  |
| 22 | Fiddlesticks | +0.56 | 0.56 | 0.00 |  |
| 23 | Gnar | +0.56 | 0.56 | 0.00 |  |
| 24 | Janna | +0.56 | 0.56 | 0.00 |  |
| 25 | Nami | +0.56 | 0.56 | 0.00 |  |
| 26 | Viktor | +0.56 | 0.56 | 0.00 |  |
| 27 | Shen | +0.55 | 0.77 | 0.22 |  |
| 28 | Tristana | +0.55 | 0.55 | 0.00 |  |
| 29 | Tahm Kench | +0.54 | 0.84 | 0.30 |  |
| 30 | Zac | +0.54 | 0.84 | 0.30 |  |
| 31 | Renata Glasc | +0.54 | 0.54 | 0.00 |  |
| 32 | Kayn | +0.53 | 0.73 | 0.20 |  |
| 33 | Vladimir | +0.53 | 0.69 | 0.16 |  |
| 34 | Mel | +0.53 | 0.53 | 0.00 |  |
| 35 | Samira | +0.53 | 0.53 | 0.00 |  |
| 36 | Seraphine | +0.53 | 0.53 | 0.00 |  |
| 37 | Sejuani | +0.52 | 0.84 | 0.32 |  |
| 38 | Evelynn | +0.51 | 0.73 | 0.22 |  |
| 39 | Shaco | +0.51 | 0.73 | 0.22 |  |
| 40 | Thresh | +0.51 | 0.56 | 0.05 |  |
| 41 | Pantheon | +0.49 | 0.69 | 0.20 |  |
| 42 | Nilah | +0.46 | 0.72 | 0.26 |  |
| 43 | Maokai | +0.45 | 0.77 | 0.32 |  |
| 44 | Kled | +0.45 | 0.57 | 0.12 |  |
| 45 | Aurora | +0.45 | 0.45 | 0.00 |  |
| 46 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 47 | Zaahen | +0.42 | 0.62 | 0.20 |  |
| 48 | Rakan | +0.42 | 0.56 | 0.14 |  |
| 49 | Viego | +0.42 | 0.56 | 0.14 |  |
| 50 | Yone | +0.41 | 0.56 | 0.15 |  |
| 51 | Urgot | +0.40 | 0.56 | 0.16 |  |
| 52 | Warwick | +0.37 | 0.59 | 0.22 |  |
| 53 | Ornn | +0.36 | 0.56 | 0.20 |  |
| 54 | Annie | +0.36 | 0.36 | 0.00 |  |
| 55 | Pyke | +0.34 | 0.56 | 0.22 |  |
| 56 | Riven | +0.34 | 0.56 | 0.22 |  |
| 57 | Vi | +0.34 | 0.56 | 0.22 |  |
| 58 | Milio | +0.34 | 0.34 | 0.00 |  |
| 59 | Alistar | +0.29 | 0.61 | 0.32 |  |
| 60 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 61 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 62 | Azir | +0.28 | 0.28 | 0.00 |  |
| 63 | Brand | +0.28 | 0.28 | 0.00 |  |
| 64 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 65 | Corki | +0.28 | 0.28 | 0.00 |  |
| 66 | Draven | +0.28 | 0.28 | 0.00 |  |
| 67 | Elise | +0.28 | 0.28 | 0.00 |  |
| 68 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 69 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 70 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 71 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 72 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 73 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 74 | Sona | +0.28 | 0.28 | 0.00 |  |
| 75 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 76 | Swain | +0.28 | 0.28 | 0.00 |  |
| 77 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 78 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 79 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 80 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 81 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 82 | Vex | +0.28 | 0.28 | 0.00 |  |
| 83 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 84 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 85 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 86 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 87 | Zyra | +0.28 | 0.28 | 0.00 |  |
| 88 | Jax | +0.27 | 0.59 | 0.32 |  |
| 89 | Kalista | +0.27 | 0.27 | 0.00 |  |
| 90 | Amumu | +0.24 | 0.56 | 0.32 |  |
| 91 | Gragas | +0.24 | 0.56 | 0.32 |  |
| 92 | Leona | +0.24 | 0.56 | 0.32 |  |
| 93 | Sett | +0.24 | 0.56 | 0.32 |  |
| 94 | Master Yi | +0.24 | 0.54 | 0.30 |  |
| 95 | Zed | +0.23 | 0.45 | 0.22 |  |
| 96 | Blitzcrank | +0.19 | 0.84 | 0.65 |  |
| 97 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 98 | Fiora | +0.17 | 0.49 | 0.32 |  |
| 99 | Malphite | +0.17 | 0.49 | 0.32 |  |
| 100 | Gwen | +0.15 | 0.47 | 0.32 |  |
| 101 | Sivir | +0.14 | 0.14 | 0.00 |  |
| 102 | Jarvan IV | +0.13 | 0.28 | 0.15 |  |
| 103 | Sylas | +0.13 | 0.28 | 0.15 |  |
| 104 | Briar | +0.12 | 0.28 | 0.16 |  |
| 105 | Nocturne | +0.11 | 0.43 | 0.32 |  |
| 106 | Hecarim | +0.08 | 0.28 | 0.20 |  |
| 107 | Wukong | +0.08 | 0.28 | 0.20 |  |
| 108 | Lillia | +0.08 | 0.26 | 0.18 |  |
| 109 | Ambessa | +0.06 | 0.28 | 0.22 |  |
| 110 | Bel'Veth | +0.06 | 0.28 | 0.22 |  |
| 111 | Lee Sin | +0.06 | 0.28 | 0.22 |  |
| 112 | Volibear | +0.06 | 0.28 | 0.22 |  |
| 113 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 114 | Qiyana | +0.03 | 0.25 | 0.22 |  |
| 115 | Udyr | +0.02 | 0.34 | 0.32 |  |
| 116 | Irelia | 0.00 | 0.28 | 0.28 |  |
| 117 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 118 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 119 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 120 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 121 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 122 | Karma | 0.00 | 0.00 | 0.00 |  |
| 123 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 124 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 125 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 126 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 127 | Lux | 0.00 | 0.00 | 0.00 |  |
| 128 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 129 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 130 | Senna | 0.00 | 0.00 | 0.00 |  |
| 131 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 132 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 133 | Varus | 0.00 | 0.00 | 0.00 |  |
| 134 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 135 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 136 | Sion | -0.02 | 0.59 | 0.61 |  |
| 137 | Aatrox | -0.02 | 0.28 | 0.30 |  |
| 138 | Nautilus | -0.02 | 0.28 | 0.30 |  |
| 139 | Diana | -0.04 | 0.28 | 0.32 |  |
| 140 | Kassadin | -0.04 | 0.28 | 0.32 |  |
| 141 | Poppy | -0.04 | 0.28 | 0.32 |  |
| 142 | Renekton | -0.04 | 0.28 | 0.32 |  |
| 143 | Shyvana | -0.04 | 0.28 | 0.32 |  |
| 144 | Morgana | -0.06 | 0.10 | 0.16 |  |
| 145 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 146 | Graves | -0.07 | 0.00 | 0.07 |  |
| 147 | Cho'Gath | -0.09 | 0.56 | 0.65 |  |
| 148 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 149 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 150 | Akali | -0.22 | 0.00 | 0.22 |  |
| 151 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 152 | Talon | -0.22 | 0.00 | 0.22 |  |
| 153 | Garen | -0.25 | 0.36 | 0.61 |  |
| 154 | Mordekaiser | -0.25 | 0.36 | 0.61 |  |
| 155 | Nunu & Willump | -0.30 | 0.35 | 0.65 |  |
| 156 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 157 | Skarner | -0.31 | 0.34 | 0.65 |  |
| 158 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 159 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 160 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 161 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 162 | Locke | -0.32 | 0.00 | 0.32 |  |
| 163 | Darius | -0.33 | 0.28 | 0.61 |  |
| 164 | Trundle | -0.33 | 0.28 | 0.61 |  |
| 165 | Yorick | -0.33 | 0.28 | 0.61 |  |
| 166 | Singed | -0.37 | 0.28 | 0.65 |  |
| 167 | Taric | -0.37 | 0.28 | 0.65 |  |
| 168 | Gangplank | -0.56 | 0.09 | 0.65 |  |
| 169 | Rengar | -0.56 | 0.09 | 0.65 |  |
| 170 | Olaf | -0.59 | 0.06 | 0.65 |  |
| 171 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 172 | Rumble | -0.65 | 0.00 | 0.65 |  |
