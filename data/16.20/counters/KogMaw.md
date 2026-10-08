# Counters to Kog'Maw (patch 26.20)

Every champion ranked by what its kit does against Kog'Maw's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kog'Maw's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> KogMaw` for the full ledger of a matchup, with sources.

## Top 10

### 1. Yuumi (net +0.60)

- **0.65** untargetable: You and Me! makes Yuumi untargetable, dodging Kog'Maw's Living Artillery. Untargetable for ?; Living Artillery takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kog'Maw R Living Artillery)
- Watch out: Kog'Maw's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range).

### 2. Samira (net +0.53)

- **0.33** projectile block: Blade Whirl blocks Kog'Maw's Void Ooze, a projectile. Blade Whirl for 0.75 s; Void Ooze takes 1.22 s to land, enough to react. (Samira W Blade Whirl → Kog'Maw E Void Ooze)
- **0.27** projectile block: Blade Whirl blocks Kog'Maw's Caustic Spittle, a projectile. Blade Whirl for 0.75 s; Caustic Spittle takes 0.73 s to land, enough to react. (Samira W Blade Whirl → Kog'Maw Q Caustic Spittle)
- **0.24** projectile block: Blade Whirl blocks Kog'Maw's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kog'Maw basic attacks)

### 3. Braum (net +0.49)

- **0.45** projectile block: Unbreakable blocks Kog'Maw's Void Ooze, a projectile. Unbreakable for 4 s, long enough to use ahead of Void Ooze. (Braum E Unbreakable → Kog'Maw E Void Ooze)
- **0.42** projectile block: Unbreakable blocks Kog'Maw's Caustic Spittle, a projectile. Unbreakable for 4 s, long enough to use ahead of Caustic Spittle. (Braum E Unbreakable → Kog'Maw Q Caustic Spittle)
- **0.41** projectile block: Unbreakable blocks Kog'Maw's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

### 4. Mel (net +0.49)

- **0.30** projectile block: Rebuttal blocks Kog'Maw's Void Ooze, a projectile. Rebuttal for 0.75 s; Void Ooze takes 1.22 s to land, enough to react. (Mel W Rebuttal → Kog'Maw E Void Ooze)
- **0.25** projectile block: Rebuttal blocks Kog'Maw's Caustic Spittle, a projectile. Rebuttal for 0.75 s; Caustic Spittle takes 0.73 s to land, enough to react. (Mel W Rebuttal → Kog'Maw Q Caustic Spittle)
- **0.24** projectile block: Rebuttal blocks Kog'Maw's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kog'Maw basic attacks)

### 5. Kayle (net +0.48)

- **0.26** invulnerable: Divine Judgment makes Kayle invulnerable to Kog'Maw's Living Artillery. Invulnerable for 2.5 s, long enough to use ahead of Living Artillery. (Kayle R Divine Judgment → Kog'Maw R Living Artillery)
- **0.22** range: Kayle's basic attacks reach 125 units farther than Kog'Maw's (625 vs 500 attack range). Kog'Maw has no dash or blink to close the gap. (Kayle basic attacks → Kog'Maw basic attacks)

### 6. Yasuo (net +0.44)

- **0.37** projectile block: Wind Wall blocks Kog'Maw's Void Ooze, a projectile. Wind Wall for 4 s, long enough to use ahead of Void Ooze. (Yasuo W Wind Wall → Kog'Maw E Void Ooze)
- **0.31** projectile block: Wind Wall blocks Kog'Maw's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kog'Maw basic attacks)
- **0.29** projectile block: Wind Wall blocks Kog'Maw's Caustic Spittle, a projectile. Wind Wall for 4 s, long enough to use ahead of Caustic Spittle. (Yasuo W Wind Wall → Kog'Maw Q Caustic Spittle)
- Watch out: Kog'Maw's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

### 7. Shen (net +0.42)

- **0.45** attack block: Spirit's Refuge blocks Kog'Maw's Bio-Arcane Barrage, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kog'Maw W Bio-Arcane Barrage)
- **0.29** attack block: Spirit's Refuge blocks Kog'Maw's basic attacks. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Shen's (500 vs 125 attack range).

### 8. Teemo (net +0.38)

- **0.38** blind: Blinding Dart's blind makes Kog'Maw's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kog'Maw basic attacks)

### 9. Tristana (net +0.36)

- **0.36** range: Tristana's basic attacks reach 200 units farther than Kog'Maw's (700 vs 500 attack range). Kog'Maw has no dash or blink to close the gap. (Tristana basic attacks → Kog'Maw basic attacks)

### 10. Jax (net +0.34)

- **0.45** attack dodge: Counter Strike dodges Kog'Maw's Bio-Arcane Barrage, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Kog'Maw W Bio-Arcane Barrage)
- **0.31** attack dodge: Counter Strike dodges Kog'Maw's basic attacks. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Kog'Maw basic attacks)
- Watch out: Kog'Maw's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.60 | 0.65 | 0.05 |  |
| 2 | Samira | +0.53 | 0.53 | 0.00 |  |
| 3 | Braum | +0.49 | 0.76 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Mel | +0.49 | 0.49 | 0.00 |  |
| 5 | Kayle | +0.48 | 0.48 | 0.00 |  |
| 6 | Yasuo | +0.44 | 0.60 | 0.16 |  |
| 7 | Shen | +0.42 | 0.60 | 0.18 | attack block (Spirit's Refuge) |
| 8 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 9 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 10 | Jax | +0.34 | 0.61 | 0.27 | attack dodge (Counter Strike) |
| 11 | Nilah | +0.33 | 0.53 | 0.20 |  |
| 12 | Elise | +0.28 | 0.28 | 0.00 |  |
| 13 | Sivir | +0.28 | 0.28 | 0.00 |  |
| 14 | Vladimir | +0.28 | 0.28 | 0.00 |  |
| 15 | Caitlyn | +0.27 | 0.27 | 0.00 |  |
| 16 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 17 | Aurora | +0.26 | 0.26 | 0.00 |  |
| 18 | Bard | +0.26 | 0.26 | 0.00 |  |
| 19 | Kindred | +0.26 | 0.26 | 0.00 |  |
| 20 | Lissandra | +0.26 | 0.26 | 0.00 |  |
| 21 | Xayah | +0.26 | 0.26 | 0.00 |  |
| 22 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 23 | Senna | +0.16 | 0.16 | 0.00 |  |
| 24 | Annie | +0.14 | 0.14 | 0.00 |  |
| 25 | Yunara | +0.14 | 0.14 | 0.00 |  |
| 26 | Pantheon | +0.12 | 0.28 | 0.16 |  |
| 27 | Camille | +0.12 | 0.26 | 0.14 |  |
| 28 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 29 | Master Yi | +0.11 | 0.35 | 0.24 |  |
| 30 | Kayn | +0.10 | 0.26 | 0.16 |  |
| 31 | Rek'Sai | +0.10 | 0.26 | 0.16 |  |
| 32 | Morgana | +0.10 | 0.10 | 0.00 |  |
| 33 | Varus | +0.10 | 0.10 | 0.00 |  |
| 34 | Ekko | +0.09 | 0.27 | 0.18 |  |
| 35 | Zyra | +0.09 | 0.09 | 0.00 |  |
| 36 | Evelynn | +0.08 | 0.26 | 0.18 |  |
| 37 | Shaco | +0.08 | 0.26 | 0.18 |  |
| 38 | Zed | +0.08 | 0.26 | 0.18 |  |
| 39 | Fiora | +0.07 | 0.32 | 0.25 |  |
| 40 | Malzahar | +0.06 | 0.06 | 0.00 |  |
| 41 | Milio | +0.06 | 0.06 | 0.00 |  |
| 42 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 43 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 44 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 45 | Maokai | +0.03 | 0.30 | 0.27 |  |
| 46 | Gwen | +0.03 | 0.28 | 0.25 |  |
| 47 | Nocturne | +0.02 | 0.29 | 0.27 |  |
| 48 | Rammus | +0.02 | 0.29 | 0.27 |  |
| 49 | Xin Zhao | +0.02 | 0.26 | 0.24 |  |
| 50 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 51 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 52 | Azir | 0.00 | 0.00 | 0.00 |  |
| 53 | Brand | 0.00 | 0.00 | 0.00 |  |
| 54 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 55 | Corki | 0.00 | 0.00 | 0.00 |  |
| 56 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 57 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 58 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 59 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 60 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 61 | Janna | 0.00 | 0.00 | 0.00 |  |
| 62 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 63 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 64 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 65 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 66 | Karma | 0.00 | 0.00 | 0.00 |  |
| 67 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 68 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 69 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 70 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 71 | Lux | 0.00 | 0.00 | 0.00 |  |
| 72 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 75 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 76 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 77 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 78 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 79 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 80 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 81 | Sona | 0.00 | 0.00 | 0.00 |  |
| 82 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 83 | Swain | 0.00 | 0.00 | 0.00 |  |
| 84 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 85 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 86 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 87 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 88 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 89 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 90 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 91 | Vex | 0.00 | 0.00 | 0.00 |  |
| 92 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 93 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 94 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 95 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 96 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 97 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 98 | Kled | -0.04 | 0.05 | 0.09 |  |
| 99 | Graves | -0.04 | 0.00 | 0.04 |  |
| 100 | Malphite | -0.08 | 0.19 | 0.27 |  |
| 101 | Zaahen | -0.10 | 0.06 | 0.16 |  |
| 102 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 103 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 104 | Viego | -0.11 | 0.00 | 0.11 |  |
| 105 | Warwick | -0.12 | 0.06 | 0.18 |  |
| 106 | Fizz | -0.12 | 0.00 | 0.12 |  |
| 107 | Jarvan IV | -0.12 | 0.00 | 0.12 |  |
| 108 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 109 | Yone | -0.12 | 0.00 | 0.12 |  |
| 110 | K'Sante | -0.13 | 0.00 | 0.13 |  |
| 111 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 112 | Briar | -0.14 | 0.00 | 0.14 |  |
| 113 | Naafiri | -0.14 | 0.00 | 0.14 |  |
| 114 | Udyr | -0.16 | 0.11 | 0.27 |  |
| 115 | Hecarim | -0.16 | 0.00 | 0.16 |  |
| 116 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 117 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 118 | Rell | -0.16 | 0.00 | 0.16 |  |
| 119 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 120 | Galio | -0.17 | 0.00 | 0.17 |  |
| 121 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 122 | Volibear | -0.17 | 0.00 | 0.17 |  |
| 123 | Akali | -0.18 | 0.00 | 0.18 |  |
| 124 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 125 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 126 | Riven | -0.18 | 0.00 | 0.18 |  |
| 127 | Talon | -0.18 | 0.00 | 0.18 |  |
| 128 | Vi | -0.18 | 0.00 | 0.18 |  |
| 129 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 130 | Alistar | -0.23 | 0.04 | 0.27 |  |
| 131 | Aatrox | -0.24 | 0.00 | 0.24 |  |
| 132 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 133 | Tahm Kench | -0.24 | 0.00 | 0.24 |  |
| 134 | Tryndamere | -0.24 | 0.00 | 0.24 |  |
| 135 | Zac | -0.24 | 0.00 | 0.24 |  |
| 136 | Nasus | -0.25 | 0.29 | 0.54 |  |
| 137 | Taric | -0.25 | 0.26 | 0.51 |  |
| 138 | Diana | -0.25 | 0.00 | 0.25 |  |
| 139 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 140 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 141 | Shyvana | -0.25 | 0.00 | 0.25 |  |
| 142 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 143 | Gragas | -0.27 | 0.00 | 0.27 |  |
| 144 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 145 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 146 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 147 | Leona | -0.27 | 0.00 | 0.27 |  |
| 148 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 149 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 150 | Sett | -0.27 | 0.00 | 0.27 |  |
| 151 | Smolder | -0.27 | 0.00 | 0.27 |  |
| 152 | Garen | -0.35 | 0.12 | 0.47 |  |
| 153 | Aurelion Sol | -0.36 | 0.00 | 0.36 |  |
| 154 | Mordekaiser | -0.40 | 0.07 | 0.47 |  |
| 155 | Nunu & Willump | -0.41 | 0.13 | 0.54 |  |
| 156 | Sion | -0.41 | 0.06 | 0.47 |  |
| 157 | Draven | -0.44 | 0.00 | 0.44 |  |
| 158 | Syndra | -0.44 | 0.00 | 0.44 |  |
| 159 | Rengar | -0.45 | 0.09 | 0.54 |  |
| 160 | Skarner | -0.45 | 0.06 | 0.51 |  |
| 161 | Gangplank | -0.46 | 0.08 | 0.54 |  |
| 162 | Darius | -0.47 | 0.00 | 0.47 |  |
| 163 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 164 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 165 | Olaf | -0.48 | 0.06 | 0.54 |  |
| 166 | Blitzcrank | -0.54 | 0.00 | 0.54 |  |
| 167 | Cho'Gath | -0.54 | 0.00 | 0.54 |  |
| 168 | Dr. Mundo | -0.54 | 0.00 | 0.54 |  |
| 169 | Rumble | -0.54 | 0.00 | 0.54 |  |
| 170 | Singed | -0.54 | 0.00 | 0.54 |  |
| 171 | Locke | -0.71 | 0.00 | 0.71 |  |
| 172 | Pyke | -0.89 | 0.00 | 0.89 |  |
