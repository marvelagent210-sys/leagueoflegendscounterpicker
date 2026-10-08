# Counters to Akshan (patch 26.20)

Every champion ranked by what its kit does against Akshan's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Akshan's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Akshan` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yasuo (net +1.16)

- **0.55** projectile block: Wind Wall blocks Akshan's Comeuppance, a projectile. Wind Wall for 4 s, long enough to use ahead of Comeuppance. (Yasuo W Wind Wall → Akshan R Comeuppance)
- **0.49** projectile block: Wind Wall blocks Akshan's Heroic Swing, a projectile. Wind Wall for 4 s, long enough to use ahead of Heroic Swing. (Yasuo W Wind Wall → Akshan E Heroic Swing)
- **0.39** projectile block: Wind Wall blocks Akshan's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Akshan basic attacks)
- Watch out: Akshan's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

### 2. Braum (net +0.98)

- **0.60** projectile block: Unbreakable blocks Akshan's Heroic Swing, a projectile. Unbreakable for 4 s, long enough to use ahead of Heroic Swing. (Braum E Unbreakable → Akshan E Heroic Swing)
- **0.55** projectile block: Unbreakable blocks Akshan's Comeuppance, a projectile. Unbreakable for 4 s, long enough to use ahead of Comeuppance. (Braum E Unbreakable → Akshan R Comeuppance)
- **0.50** projectile block: Unbreakable blocks Akshan's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Akshan basic attacks)
- Watch out: Akshan's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

### 3. Elise (net +0.90)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Akshan's Comeuppance. Untargetable for 0.6 s; Comeuppance takes 0.78 s to land, enough to react. (Elise E Rappel → Akshan R Comeuppance)
- **0.28** interrupt: Cocoon's stun interrupts Akshan's Comeuppance (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Akshan R Comeuppance)
- **0.14** reveal: Cocoon reveals Akshan through Going Rogue's stealth. (Elise E Cocoon → Akshan W Going Rogue)

### 4. Samira (net +0.88)

- **0.55** projectile block: Blade Whirl blocks Akshan's Comeuppance, a projectile. Blade Whirl for 0.75 s; Comeuppance takes 0.78 s to land, enough to react. (Samira W Blade Whirl → Akshan R Comeuppance)
- **0.44** projectile block: Blade Whirl blocks Akshan's Heroic Swing, a projectile. Blade Whirl for 0.75 s; Heroic Swing takes 0.32 s to land, enough to react. (Samira W Blade Whirl → Akshan E Heroic Swing)
- **0.30** projectile block: Blade Whirl blocks Akshan's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Akshan basic attacks)

### 5. Mel (net +0.86)

- **0.55** projectile block: Rebuttal blocks Akshan's Comeuppance, a projectile. Rebuttal for 0.75 s; Comeuppance takes 0.78 s to land, enough to react. (Mel W Rebuttal → Akshan R Comeuppance)
- **0.41** projectile block: Rebuttal blocks Akshan's Heroic Swing, a projectile. Rebuttal for 0.75 s; Heroic Swing takes 0.32 s to land, enough to react. (Mel W Rebuttal → Akshan E Heroic Swing)
- **0.30** projectile block: Rebuttal blocks Akshan's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Akshan basic attacks)

### 6. Shen (net +0.84)

- **0.60** attack block: Spirit's Refuge blocks Akshan's Heroic Swing, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Spell shield will only block a single shot. (Shen W Spirit's Refuge → Akshan E Heroic Swing)
- **0.36** attack block: Spirit's Refuge blocks Akshan's basic attacks (with Dirty Fighting). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Akshan basic attacks)
- **0.28** interrupt: Shadow Dash's taunt interrupts Akshan's Comeuppance (normal channel). Shadow Dash must land during the channel. (Shen E Shadow Dash → Akshan R Comeuppance)
- Watch out: Akshan's basic attacks reach 375 units farther than Shen's (500 vs 125 attack range).

### 7. Lulu (net +0.73)

- **0.34** disarm: Whimsy disarms Akshan for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Akshan basic attacks)
- **0.25** interrupt: Wild Growth's airborne interrupts Akshan's Comeuppance (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Akshan R Comeuppance)
- **0.14** reveal: Help, Pix! reveals Akshan through Going Rogue's stealth. (Lulu E Help, Pix! → Akshan W Going Rogue)

### 8. Kayn (net +0.67)

- **0.51** untargetable: Umbral Trespass makes Kayn untargetable, dodging Akshan's Comeuppance. Untargetable for 0.25 s; Comeuppance takes 0.78 s to land, enough to react. (Kayn R Umbral Trespass → Akshan R Comeuppance)
- **0.28** interrupt: Blade's Reach's airborne interrupts Akshan's Comeuppance (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Akshan R Comeuppance)
- **0.14** reveal: Umbral Trespass reveals Akshan through Going Rogue's stealth. (Kayn R Umbral Trespass → Akshan W Going Rogue)
- Watch out: Akshan's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range).

### 9. Rek'Sai (net +0.67)

- **0.51** untargetable: Void Rush makes Rek'Sai untargetable, dodging Akshan's Comeuppance. Untargetable for 1.5 s, long enough to use ahead of Comeuppance. (Rek'Sai R Void Rush → Akshan R Comeuppance)
- **0.28** interrupt: Unburrow's airborne interrupts Akshan's Comeuppance (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Akshan R Comeuppance)
- **0.14** reveal: Void Rush reveals Akshan through Going Rogue's stealth. (Rek'Sai R Void Rush → Akshan W Going Rogue)
- Watch out: Akshan's basic attacks reach 325 units farther than Rek'Sai's (500 vs 175 attack range).

### 10. Lissandra (net +0.67)

- **0.51** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Akshan's Comeuppance. Untargetable for 2.5 s, long enough to use ahead of Comeuppance. (Lissandra R Frozen Tomb → Akshan R Comeuppance)
- **0.25** interrupt: Frozen Tomb's stun interrupts Akshan's Comeuppance (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Akshan R Comeuppance)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Akshan's Heroic Swing mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Akshan E Heroic Swing)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +1.16 | 1.35 | 0.19 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 2 | Braum | +0.98 | 1.32 | 0.34 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Elise | +0.90 | 0.90 | 0.00 |  |
| 4 | Samira | +0.88 | 0.88 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 5 | Mel | +0.86 | 0.86 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 6 | Shen | +0.84 | 1.06 | 0.22 | attack block (Spirit's Refuge) |
| 7 | Lulu | +0.73 | 0.73 | 0.00 |  |
| 8 | Kayn | +0.67 | 0.86 | 0.19 |  |
| 9 | Rek'Sai | +0.67 | 0.86 | 0.19 |  |
| 10 | Lissandra | +0.67 | 0.67 | 0.00 |  |
| 11 | Bard | +0.64 | 0.64 | 0.00 |  |
| 12 | Nilah | +0.61 | 0.86 | 0.25 | attack dodge (Jubilant Veil) |
| 13 | Camille | +0.59 | 0.76 | 0.17 |  |
| 14 | Hwei | +0.58 | 0.58 | 0.00 |  |
| 15 | Vex | +0.55 | 0.55 | 0.00 |  |
| 16 | Vladimir | +0.55 | 0.55 | 0.00 |  |
| 17 | Viktor | +0.54 | 0.54 | 0.00 |  |
| 18 | Jax | +0.52 | 0.86 | 0.34 | attack dodge (Counter Strike) |
| 19 | Malzahar | +0.50 | 0.50 | 0.00 |  |
| 20 | Maokai | +0.49 | 0.83 | 0.34 |  |
| 21 | Evelynn | +0.49 | 0.79 | 0.30 |  |
| 22 | Yuumi | +0.48 | 0.55 | 0.07 |  |
| 23 | Xayah | +0.45 | 0.45 | 0.00 |  |
| 24 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 25 | Fiddlesticks | +0.42 | 0.42 | 0.00 |  |
| 26 | Thresh | +0.42 | 0.42 | 0.00 |  |
| 27 | Twisted Fate | +0.42 | 0.42 | 0.00 |  |
| 28 | Veigar | +0.42 | 0.42 | 0.00 |  |
| 29 | Zyra | +0.42 | 0.42 | 0.00 |  |
| 30 | Tristana | +0.41 | 0.41 | 0.00 |  |
| 31 | Varus | +0.40 | 0.40 | 0.00 |  |
| 32 | Teemo | +0.39 | 0.47 | 0.08 | blind (Blinding Dart) |
| 33 | Cassiopeia | +0.39 | 0.39 | 0.00 |  |
| 34 | Shaco | +0.37 | 0.79 | 0.42 |  |
| 35 | Ashe | +0.37 | 0.37 | 0.00 |  |
| 36 | Zac | +0.36 | 0.65 | 0.29 |  |
| 37 | Kayle | +0.36 | 0.36 | 0.00 |  |
| 38 | Annie | +0.35 | 0.35 | 0.00 |  |
| 39 | Renata Glasc | +0.35 | 0.35 | 0.00 |  |
| 40 | Anivia | +0.34 | 0.34 | 0.00 |  |
| 41 | Ekko | +0.33 | 0.55 | 0.22 |  |
| 42 | Kled | +0.31 | 0.42 | 0.11 |  |
| 43 | Rammus | +0.30 | 0.64 | 0.34 |  |
| 44 | Aurora | +0.30 | 0.45 | 0.15 |  |
| 45 | Jinx | +0.30 | 0.30 | 0.00 |  |
| 46 | Singed | +0.28 | 0.96 | 0.68 |  |
| 47 | Fiora | +0.28 | 0.60 | 0.32 |  |
| 48 | Warwick | +0.28 | 0.50 | 0.22 |  |
| 49 | Yone | +0.28 | 0.43 | 0.15 |  |
| 50 | Urgot | +0.28 | 0.42 | 0.14 |  |
| 51 | Brand | +0.28 | 0.28 | 0.00 |  |
| 52 | Caitlyn | +0.28 | 0.28 | 0.00 |  |
| 53 | Corki | +0.28 | 0.28 | 0.00 |  |
| 54 | Draven | +0.28 | 0.28 | 0.00 |  |
| 55 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 56 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 57 | Janna | +0.28 | 0.28 | 0.00 |  |
| 58 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 59 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 60 | Milio | +0.28 | 0.28 | 0.00 |  |
| 61 | Nami | +0.28 | 0.28 | 0.00 |  |
| 62 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 63 | Seraphine | +0.28 | 0.28 | 0.00 |  |
| 64 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 65 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 66 | Swain | +0.28 | 0.28 | 0.00 |  |
| 67 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 68 | Taliyah | +0.28 | 0.28 | 0.00 |  |
| 69 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 70 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 71 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 72 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 73 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 74 | Sylas | +0.27 | 0.42 | 0.15 |  |
| 75 | Master Yi | +0.26 | 0.55 | 0.29 |  |
| 76 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 77 | Azir | +0.24 | 0.24 | 0.00 |  |
| 78 | Poppy | +0.23 | 0.57 | 0.34 |  |
| 79 | Gwen | +0.23 | 0.55 | 0.32 |  |
| 80 | Zed | +0.23 | 0.45 | 0.22 |  |
| 81 | Aurelion Sol | +0.23 | 0.23 | 0.00 |  |
| 82 | Sona | +0.23 | 0.23 | 0.00 |  |
| 83 | Nocturne | +0.22 | 0.56 | 0.34 |  |
| 84 | Xin Zhao | +0.22 | 0.51 | 0.29 |  |
| 85 | Kalista | +0.21 | 0.21 | 0.00 |  |
| 86 | Kindred | +0.21 | 0.21 | 0.00 |  |
| 87 | Lee Sin | +0.20 | 0.42 | 0.22 |  |
| 88 | Vi | +0.20 | 0.42 | 0.22 |  |
| 89 | Fizz | +0.17 | 0.32 | 0.15 |  |
| 90 | Briar | +0.15 | 0.32 | 0.17 |  |
| 91 | Vayne | +0.14 | 0.28 | 0.14 |  |
| 92 | Karma | +0.14 | 0.14 | 0.00 |  |
| 93 | Morgana | +0.14 | 0.14 | 0.00 |  |
| 94 | Nidalee | +0.14 | 0.14 | 0.00 |  |
| 95 | Malphite | +0.13 | 0.47 | 0.34 |  |
| 96 | Aatrox | +0.13 | 0.42 | 0.29 |  |
| 97 | Neeko | +0.13 | 0.24 | 0.11 |  |
| 98 | K'Sante | +0.12 | 0.28 | 0.16 |  |
| 99 | Rakan | +0.12 | 0.24 | 0.12 |  |
| 100 | Ornn | +0.09 | 0.28 | 0.19 |  |
| 101 | Pantheon | +0.09 | 0.28 | 0.19 |  |
| 102 | Rell | +0.09 | 0.28 | 0.19 |  |
| 103 | Zaahen | +0.09 | 0.28 | 0.19 |  |
| 104 | Jarvan IV | +0.09 | 0.24 | 0.15 |  |
| 105 | Amumu | +0.08 | 0.42 | 0.34 |  |
| 106 | Sett | +0.08 | 0.42 | 0.34 |  |
| 107 | Ambessa | +0.08 | 0.30 | 0.22 |  |
| 108 | Bel'Veth | +0.07 | 0.28 | 0.21 |  |
| 109 | Galio | +0.07 | 0.28 | 0.21 |  |
| 110 | Volibear | +0.07 | 0.28 | 0.21 |  |
| 111 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 112 | Riven | +0.06 | 0.28 | 0.22 |  |
| 113 | Lillia | +0.06 | 0.22 | 0.16 |  |
| 114 | LeBlanc | +0.06 | 0.14 | 0.08 |  |
| 115 | Hecarim | +0.04 | 0.23 | 0.19 |  |
| 116 | Kai'Sa | +0.03 | 0.14 | 0.11 |  |
| 117 | Katarina | +0.01 | 0.35 | 0.34 |  |
| 118 | Irelia | +0.01 | 0.28 | 0.27 |  |
| 119 | Viego | 0.00 | 0.25 | 0.25 |  |
| 120 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 121 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 122 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 123 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 124 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 125 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 126 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 127 | Lux | 0.00 | 0.00 | 0.00 |  |
| 128 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 129 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 130 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 131 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 132 | Tahm Kench | -0.01 | 0.28 | 0.29 |  |
| 133 | Naafiri | -0.03 | 0.14 | 0.17 |  |
| 134 | Senna | -0.03 | 0.08 | 0.11 |  |
| 135 | Kassadin | -0.04 | 0.28 | 0.32 |  |
| 136 | Pyke | -0.04 | 0.28 | 0.32 |  |
| 137 | Sejuani | -0.04 | 0.28 | 0.32 |  |
| 138 | Shyvana | -0.04 | 0.28 | 0.32 |  |
| 139 | Nautilus | -0.04 | 0.25 | 0.29 |  |
| 140 | Graves | -0.05 | 0.00 | 0.05 |  |
| 141 | Alistar | -0.06 | 0.28 | 0.34 |  |
| 142 | Gragas | -0.06 | 0.28 | 0.34 |  |
| 143 | Leona | -0.06 | 0.28 | 0.34 |  |
| 144 | Renekton | -0.06 | 0.28 | 0.34 |  |
| 145 | Udyr | -0.06 | 0.28 | 0.34 |  |
| 146 | Diana | -0.07 | 0.25 | 0.32 |  |
| 147 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 148 | Mordekaiser | -0.12 | 0.47 | 0.59 |  |
| 149 | Taric | -0.14 | 0.49 | 0.63 |  |
| 150 | Wukong | -0.15 | 0.24 | 0.39 |  |
| 151 | Garen | -0.17 | 0.42 | 0.59 |  |
| 152 | Qiyana | -0.18 | 0.21 | 0.39 |  |
| 153 | Akali | -0.19 | 0.14 | 0.33 |  |
| 154 | Illaoi | -0.20 | 0.14 | 0.34 |  |
| 155 | Skarner | -0.25 | 0.38 | 0.63 |  |
| 156 | Tryndamere | -0.29 | 0.00 | 0.29 |  |
| 157 | Darius | -0.31 | 0.28 | 0.59 |  |
| 158 | Sion | -0.31 | 0.28 | 0.59 |  |
| 159 | Trundle | -0.31 | 0.28 | 0.59 |  |
| 160 | Yorick | -0.31 | 0.28 | 0.59 |  |
| 161 | Nasus | -0.32 | 0.36 | 0.68 |  |
| 162 | Locke | -0.34 | 0.00 | 0.34 |  |
| 163 | Talon | -0.36 | 0.00 | 0.36 |  |
| 164 | Blitzcrank | -0.40 | 0.28 | 0.68 |  |
| 165 | Cho'Gath | -0.40 | 0.28 | 0.68 |  |
| 166 | Nunu & Willump | -0.40 | 0.28 | 0.68 |  |
| 167 | Kha'Zix | -0.55 | 0.00 | 0.55 |  |
| 168 | Rengar | -0.68 | 0.14 | 0.82 |  |
| 169 | Dr. Mundo | -0.68 | 0.00 | 0.68 |  |
| 170 | Gangplank | -0.68 | 0.00 | 0.68 |  |
| 171 | Olaf | -0.68 | 0.00 | 0.68 |  |
| 172 | Rumble | -0.68 | 0.00 | 0.68 |  |
