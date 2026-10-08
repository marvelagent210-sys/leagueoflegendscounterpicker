# Counters to Ryze (patch 26.20)

Every champion ranked by what its kit does against Ryze's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ryze's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ryze` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.98)

- **0.49** untargetable: Rappel makes Elise untargetable, dodging Ryze's Rune Prison. Untargetable for 0.6 s; Rune Prison takes 0.25 s to land, enough to react. (Elise E Rappel → Ryze W Rune Prison)
- **0.35** interrupt: Cocoon's stun interrupts Ryze's Realm Warp (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Ryze R Realm Warp)
- **0.27** untargetable: Rappel makes Elise untargetable, dodging Ryze's Spell Flux. Untargetable for 0.6 s; Spell Flux takes 0.39 s to land, enough to react. (Elise E Rappel → Ryze E Spell Flux)

### 2. Maokai (net +0.92)

- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Ryze's Rune Prison. Untargetable for 1.4 s; Rune Prison takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Ryze W Rune Prison)
- **0.35** interrupt: Bramble Smash's airborne interrupts Ryze's Realm Warp (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Ryze R Realm Warp)
- **0.30** untargetable: Twisted Advance makes Maokai untargetable, dodging Ryze's Spell Flux. Untargetable for 1.4 s; Spell Flux takes 0.39 s to land, enough to react. (Maokai W Twisted Advance → Ryze E Spell Flux)
- Watch out: Ryze's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 3. Yuumi (net +0.91)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Ryze's Rune Prison. Untargetable for ?; Rune Prison takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ryze W Rune Prison)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Ryze's Spell Flux. Untargetable for ?; Spell Flux takes 0.39 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ryze E Spell Flux)
- Watch out: Ryze's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 4. Nocturne (net +0.86)

- **0.60** spell shield: Shroud of Darkness's spell shield blocks Ryze's Rune Prison. Spell shield for 1.5 s, long enough to use ahead of Rune Prison. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ryze W Rune Prison)
- **0.35** interrupt: Unspeakable Horror's fear interrupts Ryze's Realm Warp (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Ryze R Realm Warp)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Ryze's Spell Flux. Spell shield for 1.5 s, long enough to use ahead of Spell Flux. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Ryze E Spell Flux)
- Watch out: Ryze's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 5. Malzahar (net +0.70)

- **0.35** cc immunity: Void Shift makes Malzahar immune to Ryze's Rune Prison (slow, root). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Ryze W Rune Prison)
- **0.35** interrupt: Call of the Void's silence interrupts Ryze's Realm Warp (movement channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Ryze R Realm Warp)

### 6. Milio (net +0.70)

- **0.35** interrupt: Ultra Mega Fire Kick's airborne interrupts Ryze's Realm Warp (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Ryze R Realm Warp)
- **0.25** cleanse: Breath of Life cleanses Ryze's Rune Prison (slow, root) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Ryze W Rune Prison)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Ryze's Rune Prison (slow, root). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Ryze W Rune Prison)

### 7. Cassiopeia (net +0.68)

- **0.35** interrupt: Petrifying Gaze's stun interrupts Ryze's Realm Warp (movement channel). Petrifying Gaze must land during the channel. (Cassiopeia R Petrifying Gaze → Ryze R Realm Warp)
- **0.33** grounding: Miasma grounds Ryze, who then can't cast Realm Warp. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Ryze R Realm Warp)

### 8. Braum (net +0.67)

- **0.35** interrupt: Concussive Blows's stun interrupts Ryze's Realm Warp (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Ryze R Realm Warp)
- **0.35** projectile block: Unbreakable blocks Ryze's Overload, a projectile. Unbreakable for 4 s, long enough to use ahead of Overload. (Braum E Unbreakable → Ryze Q Overload)
- **0.33** projectile block: Unbreakable blocks Ryze's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ryze basic attacks)
- Watch out: Ryze's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 9. Camille (net +0.66)

- **0.35** interrupt: Wall Dive's airborne interrupts Ryze's Realm Warp (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Ryze R Realm Warp)
- **0.32** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Ryze's Rune Prison. Untargetable for 0.5 s; Rune Prison takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Ryze W Rune Prison)
- **0.23** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Ryze's Spell Flux. Untargetable for 0.5 s; Spell Flux takes 0.39 s to land, enough to react. (Camille R The Hextech Ultimatum → Ryze E Spell Flux)
- Watch out: Ryze's basic attacks reach 425 units farther than Camille's (550 vs 125 attack range).

### 10. Kayn (net +0.65)

- **0.35** interrupt: Blade's Reach's airborne interrupts Ryze's Realm Warp (movement channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Ryze R Realm Warp)
- **0.33** untargetable: Umbral Trespass makes Kayn untargetable, dodging Ryze's Rune Prison. Untargetable for 0.25 s; Rune Prison takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Ryze W Rune Prison)
- **0.23** untargetable: Umbral Trespass makes Kayn untargetable, dodging Ryze's Spell Flux. Untargetable for 0.25 s; Spell Flux takes 0.39 s to land, enough to react. (Kayn R Umbral Trespass → Ryze E Spell Flux)
- Watch out: Ryze's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.98 | 0.98 | 0.00 |  |
| 2 | Maokai | +0.92 | 1.16 | 0.24 |  |
| 3 | Yuumi | +0.91 | 0.98 | 0.07 |  |
| 4 | Nocturne | +0.86 | 1.10 | 0.24 |  |
| 5 | Malzahar | +0.70 | 0.70 | 0.00 |  |
| 6 | Milio | +0.70 | 0.70 | 0.00 |  |
| 7 | Cassiopeia | +0.68 | 0.68 | 0.00 |  |
| 8 | Braum | +0.67 | 0.91 | 0.24 |  |
| 9 | Camille | +0.66 | 0.78 | 0.12 |  |
| 10 | Kayn | +0.65 | 0.80 | 0.15 |  |
| 11 | Rek'Sai | +0.65 | 0.80 | 0.15 |  |
| 12 | Udyr | +0.64 | 0.88 | 0.24 |  |
| 13 | Evelynn | +0.64 | 0.80 | 0.16 |  |
| 14 | Shaco | +0.64 | 0.80 | 0.16 |  |
| 15 | Sivir | +0.63 | 0.63 | 0.00 |  |
| 16 | Yasuo | +0.62 | 0.77 | 0.15 |  |
| 17 | Kled | +0.57 | 0.66 | 0.09 |  |
| 18 | Bard | +0.57 | 0.57 | 0.00 |  |
| 19 | Lissandra | +0.57 | 0.57 | 0.00 |  |
| 20 | Lulu | +0.57 | 0.57 | 0.00 |  |
| 21 | Vladimir | +0.54 | 0.66 | 0.12 |  |
| 22 | Fiora | +0.53 | 0.77 | 0.24 |  |
| 23 | Zaahen | +0.53 | 0.68 | 0.15 |  |
| 24 | Master Yi | +0.52 | 0.74 | 0.22 |  |
| 25 | Warwick | +0.52 | 0.68 | 0.16 |  |
| 26 | Tristana | +0.49 | 0.49 | 0.00 |  |
| 27 | Kalista | +0.48 | 0.48 | 0.00 |  |
| 28 | Xin Zhao | +0.44 | 0.66 | 0.22 |  |
| 29 | Aurora | +0.44 | 0.44 | 0.00 |  |
| 30 | Xayah | +0.44 | 0.44 | 0.00 |  |
| 31 | Shen | +0.43 | 0.59 | 0.16 |  |
| 32 | Heimerdinger | +0.42 | 0.42 | 0.00 |  |
| 33 | Morgana | +0.40 | 0.52 | 0.12 |  |
| 34 | Gwen | +0.39 | 0.63 | 0.24 |  |
| 35 | Annie | +0.39 | 0.39 | 0.00 |  |
| 36 | Nilah | +0.38 | 0.57 | 0.19 |  |
| 37 | Kayle | +0.38 | 0.38 | 0.00 |  |
| 38 | Alistar | +0.37 | 0.61 | 0.24 |  |
| 39 | Samira | +0.37 | 0.37 | 0.00 |  |
| 40 | Mel | +0.36 | 0.36 | 0.00 |  |
| 41 | Rammus | +0.35 | 0.59 | 0.24 |  |
| 42 | Ahri | +0.35 | 0.35 | 0.00 |  |
| 43 | Anivia | +0.35 | 0.35 | 0.00 |  |
| 44 | Ashe | +0.35 | 0.35 | 0.00 |  |
| 45 | Aurelion Sol | +0.35 | 0.35 | 0.00 |  |
| 46 | Azir | +0.35 | 0.35 | 0.00 |  |
| 47 | Brand | +0.35 | 0.35 | 0.00 |  |
| 48 | Corki | +0.35 | 0.35 | 0.00 |  |
| 49 | Draven | +0.35 | 0.35 | 0.00 |  |
| 50 | Fiddlesticks | +0.35 | 0.35 | 0.00 |  |
| 51 | Gnar | +0.35 | 0.35 | 0.00 |  |
| 52 | Hwei | +0.35 | 0.35 | 0.00 |  |
| 53 | Janna | +0.35 | 0.35 | 0.00 |  |
| 54 | Jayce | +0.35 | 0.35 | 0.00 |  |
| 55 | Kennen | +0.35 | 0.35 | 0.00 |  |
| 56 | Nami | +0.35 | 0.35 | 0.00 |  |
| 57 | Neeko | +0.35 | 0.35 | 0.00 |  |
| 58 | Orianna | +0.35 | 0.35 | 0.00 |  |
| 59 | Quinn | +0.35 | 0.35 | 0.00 |  |
| 60 | Renata Glasc | +0.35 | 0.35 | 0.00 |  |
| 61 | Seraphine | +0.35 | 0.35 | 0.00 |  |
| 62 | Sona | +0.35 | 0.35 | 0.00 |  |
| 63 | Soraka | +0.35 | 0.35 | 0.00 |  |
| 64 | Swain | +0.35 | 0.35 | 0.00 |  |
| 65 | Syndra | +0.35 | 0.35 | 0.00 |  |
| 66 | Taliyah | +0.35 | 0.35 | 0.00 |  |
| 67 | Twisted Fate | +0.35 | 0.35 | 0.00 |  |
| 68 | Vayne | +0.35 | 0.35 | 0.00 |  |
| 69 | Veigar | +0.35 | 0.35 | 0.00 |  |
| 70 | Vel'Koz | +0.35 | 0.35 | 0.00 |  |
| 71 | Vex | +0.35 | 0.35 | 0.00 |  |
| 72 | Viktor | +0.35 | 0.35 | 0.00 |  |
| 73 | Xerath | +0.35 | 0.35 | 0.00 |  |
| 74 | Ziggs | +0.35 | 0.35 | 0.00 |  |
| 75 | Zilean | +0.35 | 0.35 | 0.00 |  |
| 76 | Zoe | +0.35 | 0.35 | 0.00 |  |
| 77 | Zyra | +0.35 | 0.35 | 0.00 |  |
| 78 | Ekko | +0.32 | 0.48 | 0.16 |  |
| 79 | Thresh | +0.31 | 0.35 | 0.04 |  |
| 80 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 81 | Teemo | +0.31 | 0.31 | 0.00 |  |
| 82 | Zed | +0.28 | 0.44 | 0.16 |  |
| 83 | Malphite | +0.27 | 0.51 | 0.24 |  |
| 84 | Rakan | +0.25 | 0.35 | 0.10 |  |
| 85 | Viego | +0.25 | 0.35 | 0.10 |  |
| 86 | Sion | +0.24 | 0.69 | 0.45 |  |
| 87 | Jax | +0.24 | 0.48 | 0.24 |  |
| 88 | Pantheon | +0.24 | 0.39 | 0.15 |  |
| 89 | Fizz | +0.24 | 0.35 | 0.11 |  |
| 90 | Jarvan IV | +0.24 | 0.35 | 0.11 |  |
| 91 | Sylas | +0.24 | 0.35 | 0.11 |  |
| 92 | Yone | +0.24 | 0.35 | 0.11 |  |
| 93 | Briar | +0.23 | 0.35 | 0.12 |  |
| 94 | K'Sante | +0.23 | 0.35 | 0.12 |  |
| 95 | Urgot | +0.23 | 0.35 | 0.12 |  |
| 96 | Lillia | +0.22 | 0.35 | 0.13 |  |
| 97 | Singed | +0.21 | 0.69 | 0.48 |  |
| 98 | Hecarim | +0.20 | 0.35 | 0.15 |  |
| 99 | Wukong | +0.20 | 0.35 | 0.15 |  |
| 100 | Ornn | +0.20 | 0.35 | 0.15 |  |
| 101 | Rell | +0.20 | 0.35 | 0.15 |  |
| 102 | Ambessa | +0.19 | 0.35 | 0.16 |  |
| 103 | Bel'Veth | +0.19 | 0.35 | 0.16 |  |
| 104 | Galio | +0.19 | 0.35 | 0.16 |  |
| 105 | Lee Sin | +0.19 | 0.35 | 0.16 |  |
| 106 | Pyke | +0.19 | 0.35 | 0.16 |  |
| 107 | Qiyana | +0.19 | 0.35 | 0.16 |  |
| 108 | Riven | +0.19 | 0.35 | 0.16 |  |
| 109 | Vi | +0.19 | 0.35 | 0.16 |  |
| 110 | Volibear | +0.19 | 0.35 | 0.16 |  |
| 111 | Taric | +0.18 | 0.66 | 0.48 |  |
| 112 | Garen | +0.15 | 0.60 | 0.45 |  |
| 113 | Irelia | +0.14 | 0.35 | 0.21 |  |
| 114 | Aatrox | +0.13 | 0.35 | 0.22 |  |
| 115 | Nautilus | +0.13 | 0.35 | 0.22 |  |
| 116 | Tahm Kench | +0.13 | 0.35 | 0.22 |  |
| 117 | Zac | +0.13 | 0.35 | 0.22 |  |
| 118 | Amumu | +0.11 | 0.35 | 0.24 |  |
| 119 | Diana | +0.11 | 0.35 | 0.24 |  |
| 120 | Gragas | +0.11 | 0.35 | 0.24 |  |
| 121 | Kassadin | +0.11 | 0.35 | 0.24 |  |
| 122 | Leona | +0.11 | 0.35 | 0.24 |  |
| 123 | Poppy | +0.11 | 0.35 | 0.24 |  |
| 124 | Renekton | +0.11 | 0.35 | 0.24 |  |
| 125 | Sejuani | +0.11 | 0.35 | 0.24 |  |
| 126 | Sett | +0.11 | 0.35 | 0.24 |  |
| 127 | Shyvana | +0.11 | 0.35 | 0.24 |  |
| 128 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 129 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 130 | Rengar | +0.05 | 0.53 | 0.48 |  |
| 131 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 132 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 133 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 134 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 135 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 136 | Karma | 0.00 | 0.00 | 0.00 |  |
| 137 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 138 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 139 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 140 | Lux | 0.00 | 0.00 | 0.00 |  |
| 141 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 142 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 143 | Senna | 0.00 | 0.00 | 0.00 |  |
| 144 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 145 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 146 | Varus | 0.00 | 0.00 | 0.00 |  |
| 147 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 148 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 149 | Nunu & Willump | -0.03 | 0.45 | 0.48 |  |
| 150 | Gangplank | -0.04 | 0.44 | 0.48 |  |
| 151 | Skarner | -0.04 | 0.44 | 0.48 |  |
| 152 | Mordekaiser | -0.04 | 0.41 | 0.45 |  |
| 153 | Ivern | -0.04 | 0.00 | 0.04 |  |
| 154 | Graves | -0.05 | 0.00 | 0.05 |  |
| 155 | Darius | -0.10 | 0.35 | 0.45 |  |
| 156 | Trundle | -0.10 | 0.35 | 0.45 |  |
| 157 | Yorick | -0.10 | 0.35 | 0.45 |  |
| 158 | Karthus | -0.12 | 0.00 | 0.12 |  |
| 159 | Naafiri | -0.12 | 0.00 | 0.12 |  |
| 160 | Blitzcrank | -0.13 | 0.35 | 0.48 |  |
| 161 | Cho'Gath | -0.13 | 0.35 | 0.48 |  |
| 162 | Olaf | -0.15 | 0.33 | 0.48 |  |
| 163 | Akali | -0.16 | 0.00 | 0.16 |  |
| 164 | Talon | -0.16 | 0.00 | 0.16 |  |
| 165 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 166 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 167 | Illaoi | -0.24 | 0.00 | 0.24 |  |
| 168 | Katarina | -0.24 | 0.00 | 0.24 |  |
| 169 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 170 | Locke | -0.24 | 0.00 | 0.24 |  |
| 171 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 172 | Rumble | -0.48 | 0.00 | 0.48 |  |
