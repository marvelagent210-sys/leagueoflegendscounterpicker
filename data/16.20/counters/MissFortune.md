# Counters to Miss Fortune (patch 26.20)

Every champion ranked by what its kit does against Miss Fortune's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Miss Fortune's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MissFortune` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yasuo (net +0.88)

- **0.55** projectile block: Wind Wall blocks Miss Fortune's Bullet Time, a projectile. Wind Wall for 4 s, long enough to use ahead of Bullet Time. (Yasuo W Wind Wall → Miss Fortune R Bullet Time)
- **0.35** projectile block: Wind Wall blocks Miss Fortune's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Miss Fortune basic attacks)
- **0.28** interrupt: Steel Tempest's airborne interrupts Miss Fortune's Bullet Time (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Miss Fortune R Bullet Time)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 2. Braum (net +0.82)

- **0.55** projectile block: Unbreakable blocks Miss Fortune's Bullet Time, a projectile. Unbreakable for 4 s, long enough to use ahead of Bullet Time. (Braum E Unbreakable → Miss Fortune R Bullet Time)
- **0.45** projectile block: Unbreakable blocks Miss Fortune's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Miss Fortune basic attacks)
- **0.34** projectile block: Unbreakable blocks Miss Fortune's Double Up, a projectile. Unbreakable for 4 s, long enough to use ahead of Double Up. (Braum E Unbreakable → Miss Fortune Q Double Up)
- Watch out: Miss Fortune's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 3. Kayle (net +0.81)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Miss Fortune's Bullet Time. Invulnerable for 2.5 s, long enough to use ahead of Bullet Time. (Kayle R Divine Judgment → Miss Fortune R Bullet Time)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Miss Fortune's Double Up. Invulnerable for 2.5 s, long enough to use ahead of Double Up. (Kayle R Divine Judgment → Miss Fortune Q Double Up)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Miss Fortune's (625 vs 550 attack range). Miss Fortune has no dash or blink to close the gap. (Kayle basic attacks → Miss Fortune basic attacks)

### 4. Rek'Sai (net +0.75)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 1.5 s, long enough to use ahead of Bullet Time. (Rek'Sai R Void Rush → Miss Fortune R Bullet Time)
- **0.28** interrupt: Unburrow's airborne interrupts Miss Fortune's Bullet Time (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Miss Fortune R Bullet Time)
- **0.23** untargetable: Void Rush makes Rek'Sai untargetable, dodging Miss Fortune's Double Up. Untargetable for 1.5 s, long enough to use ahead of Double Up. (Rek'Sai R Void Rush → Miss Fortune Q Double Up)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 5. Bard (net +0.75)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 2.5 s, long enough to use ahead of Bullet Time. (Bard R Tempered Fate → Miss Fortune R Bullet Time)
- **0.28** interrupt: Tempered Fate's stasis interrupts Miss Fortune's Bullet Time (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Miss Fortune R Bullet Time)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Miss Fortune's Double Up. Untargetable for 2.5 s, long enough to use ahead of Double Up. (Bard R Tempered Fate → Miss Fortune Q Double Up)

### 6. Elise (net +0.75)

- **0.33** untargetable: Rappel makes Elise untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 0.6 s; Bullet Time lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Miss Fortune R Bullet Time)
- **0.28** interrupt: Cocoon's stun interrupts Miss Fortune's Bullet Time (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Miss Fortune R Bullet Time)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Miss Fortune's Double Up. Untargetable for 0.6 s; Double Up takes 0.39 s to land, enough to react. (Elise E Rappel → Miss Fortune Q Double Up)

### 7. Lissandra (net +0.75)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 2.5 s, long enough to use ahead of Bullet Time. (Lissandra R Frozen Tomb → Miss Fortune R Bullet Time)
- **0.28** interrupt: Frozen Tomb's stun interrupts Miss Fortune's Bullet Time (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Miss Fortune R Bullet Time)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Miss Fortune's Double Up. Untargetable for 2.5 s, long enough to use ahead of Double Up. (Lissandra R Frozen Tomb → Miss Fortune Q Double Up)

### 8. Xayah (net +0.67)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Miss Fortune's Bullet Time. Untargetable for 1.5 s, long enough to use ahead of Bullet Time. (Xayah R Featherstorm → Miss Fortune R Bullet Time)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Miss Fortune's Double Up. Untargetable for 1.5 s, long enough to use ahead of Double Up. (Xayah R Featherstorm → Miss Fortune Q Double Up)

### 9. Xin Zhao (net +0.65)

- **0.55** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Miss Fortune's Bullet Time. Invulnerable for 4 s, long enough to use ahead of Bullet Time. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Miss Fortune R Bullet Time)
- **0.28** interrupt: Three Talon Strike's airborne interrupts Miss Fortune's Bullet Time (normal channel). Three Talon Strike must land during the channel. (Xin Zhao Q Three Talon Strike → Miss Fortune R Bullet Time)
- **0.23** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Miss Fortune's Double Up. Invulnerable for 4 s, long enough to use ahead of Double Up. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Miss Fortune Q Double Up)
- Watch out: Miss Fortune's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range).

### 10. Yuumi (net +0.62)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Miss Fortune's Double Up. Untargetable for ?; Double Up takes 0.39 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Miss Fortune Q Double Up)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Miss Fortune's Bullet Time. Untargetable for ?; Bullet Time lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Miss Fortune R Bullet Time)
- Watch out: Miss Fortune's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +0.88 | 1.08 | 0.20 | projectile block (Wind Wall) |
| 2 | Braum | +0.82 | 1.14 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Kayle | +0.81 | 0.81 | 0.00 |  |
| 4 | Rek'Sai | +0.75 | 0.95 | 0.20 |  |
| 5 | Bard | +0.75 | 0.75 | 0.00 |  |
| 6 | Elise | +0.75 | 0.75 | 0.00 |  |
| 7 | Lissandra | +0.75 | 0.75 | 0.00 |  |
| 8 | Xayah | +0.67 | 0.67 | 0.00 |  |
| 9 | Xin Zhao | +0.65 | 0.95 | 0.30 |  |
| 10 | Yuumi | +0.62 | 0.72 | 0.10 |  |
| 11 | Lulu | +0.58 | 0.58 | 0.00 |  |
| 12 | Camille | +0.57 | 0.73 | 0.16 |  |
| 13 | Shen | +0.55 | 0.77 | 0.22 |  |
| 14 | Tristana | +0.55 | 0.55 | 0.00 |  |
| 15 | Kayn | +0.53 | 0.73 | 0.20 |  |
| 16 | Vladimir | +0.53 | 0.69 | 0.16 |  |
| 17 | Mel | +0.53 | 0.53 | 0.00 |  |
| 18 | Samira | +0.53 | 0.53 | 0.00 |  |
| 19 | Evelynn | +0.51 | 0.73 | 0.22 |  |
| 20 | Shaco | +0.51 | 0.73 | 0.22 |  |
| 21 | Pantheon | +0.49 | 0.69 | 0.20 |  |
| 22 | Nilah | +0.46 | 0.72 | 0.26 |  |
| 23 | Maokai | +0.45 | 0.77 | 0.32 |  |
| 24 | Aurora | +0.45 | 0.45 | 0.00 |  |
| 25 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 26 | Kindred | +0.42 | 0.42 | 0.00 |  |
| 27 | Annie | +0.36 | 0.36 | 0.00 |  |
| 28 | Malzahar | +0.34 | 0.34 | 0.00 |  |
| 29 | Milio | +0.34 | 0.34 | 0.00 |  |
| 30 | Heimerdinger | +0.33 | 0.33 | 0.00 |  |
| 31 | Rammus | +0.28 | 0.60 | 0.32 |  |
| 32 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 33 | Anivia | +0.28 | 0.28 | 0.00 |  |
| 34 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 35 | Aurelion Sol | +0.28 | 0.28 | 0.00 |  |
| 36 | Azir | +0.28 | 0.28 | 0.00 |  |
| 37 | Brand | +0.28 | 0.28 | 0.00 |  |
| 38 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 39 | Corki | +0.28 | 0.28 | 0.00 |  |
| 40 | Draven | +0.28 | 0.28 | 0.00 |  |
| 41 | Fiddlesticks | +0.28 | 0.28 | 0.00 |  |
| 42 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 43 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 44 | Janna | +0.28 | 0.28 | 0.00 |  |
| 45 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 46 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 47 | Nami | +0.28 | 0.28 | 0.00 |  |
| 48 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 49 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 50 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 51 | Renata Glasc | +0.28 | 0.28 | 0.00 |  |
| 52 | Seraphine | +0.28 | 0.28 | 0.00 |  |
| 53 | Sona | +0.28 | 0.28 | 0.00 |  |
| 54 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 55 | Swain | +0.28 | 0.28 | 0.00 |  |
| 56 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 57 | Taliyah | +0.28 | 0.28 | 0.00 |  |
| 58 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 59 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 60 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 61 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 62 | Vex | +0.28 | 0.28 | 0.00 |  |
| 63 | Viktor | +0.28 | 0.28 | 0.00 |  |
| 64 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 65 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 66 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 67 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 68 | Zyra | +0.28 | 0.28 | 0.00 |  |
| 69 | Jax | +0.27 | 0.59 | 0.32 |  |
| 70 | Kalista | +0.27 | 0.27 | 0.00 |  |
| 71 | Taric | +0.25 | 0.90 | 0.65 |  |
| 72 | Master Yi | +0.24 | 0.54 | 0.30 |  |
| 73 | Ekko | +0.23 | 0.45 | 0.22 |  |
| 74 | Zed | +0.23 | 0.45 | 0.22 |  |
| 75 | Thresh | +0.23 | 0.28 | 0.05 |  |
| 76 | Kled | +0.21 | 0.33 | 0.12 |  |
| 77 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 78 | Fiora | +0.17 | 0.49 | 0.32 |  |
| 79 | Malphite | +0.17 | 0.49 | 0.32 |  |
| 80 | Gwen | +0.15 | 0.47 | 0.32 |  |
| 81 | Zaahen | +0.14 | 0.34 | 0.20 |  |
| 82 | Rakan | +0.14 | 0.28 | 0.14 |  |
| 83 | Viego | +0.14 | 0.28 | 0.14 |  |
| 84 | Sivir | +0.14 | 0.14 | 0.00 |  |
| 85 | Fizz | +0.13 | 0.28 | 0.15 |  |
| 86 | Jarvan IV | +0.13 | 0.28 | 0.15 |  |
| 87 | Sylas | +0.13 | 0.28 | 0.15 |  |
| 88 | Yone | +0.13 | 0.28 | 0.15 |  |
| 89 | Warwick | +0.12 | 0.34 | 0.22 |  |
| 90 | Briar | +0.12 | 0.28 | 0.16 |  |
| 91 | K'Sante | +0.12 | 0.28 | 0.16 |  |
| 92 | Urgot | +0.12 | 0.28 | 0.16 |  |
| 93 | Nocturne | +0.11 | 0.43 | 0.32 |  |
| 94 | Hecarim | +0.08 | 0.28 | 0.20 |  |
| 95 | Wukong | +0.08 | 0.28 | 0.20 |  |
| 96 | Ornn | +0.08 | 0.28 | 0.20 |  |
| 97 | Rell | +0.08 | 0.28 | 0.20 |  |
| 98 | Lillia | +0.08 | 0.26 | 0.18 |  |
| 99 | Ambessa | +0.06 | 0.28 | 0.22 |  |
| 100 | Bel'Veth | +0.06 | 0.28 | 0.22 |  |
| 101 | Galio | +0.06 | 0.28 | 0.22 |  |
| 102 | Lee Sin | +0.06 | 0.28 | 0.22 |  |
| 103 | Pyke | +0.06 | 0.28 | 0.22 |  |
| 104 | Riven | +0.06 | 0.28 | 0.22 |  |
| 105 | Vi | +0.06 | 0.28 | 0.22 |  |
| 106 | Volibear | +0.06 | 0.28 | 0.22 |  |
| 107 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 108 | Qiyana | +0.03 | 0.25 | 0.22 |  |
| 109 | Udyr | +0.02 | 0.34 | 0.32 |  |
| 110 | Alistar | +0.01 | 0.33 | 0.32 |  |
| 111 | Irelia | 0.00 | 0.28 | 0.28 |  |
| 112 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 113 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 114 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 115 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 116 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 117 | Karma | 0.00 | 0.00 | 0.00 |  |
| 118 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 119 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 120 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 121 | Lux | 0.00 | 0.00 | 0.00 |  |
| 122 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 123 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 124 | Senna | 0.00 | 0.00 | 0.00 |  |
| 125 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 126 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 127 | Varus | 0.00 | 0.00 | 0.00 |  |
| 128 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 129 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 130 | Aatrox | -0.02 | 0.28 | 0.30 |  |
| 131 | Nautilus | -0.02 | 0.28 | 0.30 |  |
| 132 | Tahm Kench | -0.02 | 0.28 | 0.30 |  |
| 133 | Zac | -0.02 | 0.28 | 0.30 |  |
| 134 | Amumu | -0.04 | 0.28 | 0.32 |  |
| 135 | Diana | -0.04 | 0.28 | 0.32 |  |
| 136 | Gragas | -0.04 | 0.28 | 0.32 |  |
| 137 | Kassadin | -0.04 | 0.28 | 0.32 |  |
| 138 | Leona | -0.04 | 0.28 | 0.32 |  |
| 139 | Poppy | -0.04 | 0.28 | 0.32 |  |
| 140 | Renekton | -0.04 | 0.28 | 0.32 |  |
| 141 | Sejuani | -0.04 | 0.28 | 0.32 |  |
| 142 | Sett | -0.04 | 0.28 | 0.32 |  |
| 143 | Shyvana | -0.04 | 0.28 | 0.32 |  |
| 144 | Morgana | -0.06 | 0.10 | 0.16 |  |
| 145 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 146 | Graves | -0.07 | 0.00 | 0.07 |  |
| 147 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 148 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 149 | Akali | -0.22 | 0.00 | 0.22 |  |
| 150 | Talon | -0.22 | 0.00 | 0.22 |  |
| 151 | Garen | -0.25 | 0.36 | 0.61 |  |
| 152 | Mordekaiser | -0.25 | 0.36 | 0.61 |  |
| 153 | Sion | -0.27 | 0.34 | 0.61 |  |
| 154 | Nunu & Willump | -0.30 | 0.35 | 0.65 |  |
| 155 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 156 | Skarner | -0.31 | 0.34 | 0.65 |  |
| 157 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 158 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 159 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 160 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 161 | Locke | -0.32 | 0.00 | 0.32 |  |
| 162 | Darius | -0.33 | 0.28 | 0.61 |  |
| 163 | Trundle | -0.33 | 0.28 | 0.61 |  |
| 164 | Yorick | -0.33 | 0.28 | 0.61 |  |
| 165 | Blitzcrank | -0.37 | 0.28 | 0.65 |  |
| 166 | Cho'Gath | -0.37 | 0.28 | 0.65 |  |
| 167 | Singed | -0.37 | 0.28 | 0.65 |  |
| 168 | Gangplank | -0.56 | 0.09 | 0.65 |  |
| 169 | Rengar | -0.56 | 0.09 | 0.65 |  |
| 170 | Olaf | -0.59 | 0.06 | 0.65 |  |
| 171 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 172 | Rumble | -0.65 | 0.00 | 0.65 |  |
