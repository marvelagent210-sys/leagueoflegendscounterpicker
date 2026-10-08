# Counters to Caitlyn (patch 26.20)

Every champion ranked by what its kit does against Caitlyn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Caitlyn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Caitlyn` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.03)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.6 s; Ace in the Hole takes 1.47 s to land, enough to react. (Elise E Rappel → Caitlyn R Ace in the Hole)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.6 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Elise E Rappel → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Cocoon's stun interrupts Caitlyn's Ace in the Hole (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 100 units farther than Elise's (650 vs 550 attack range).

### 2. Braum (net +0.97)

- **0.60** projectile block: Unbreakable blocks Caitlyn's 90 Caliber Net, a projectile. Unbreakable for 4 s, long enough to use ahead of 90 Caliber Net. (Braum E Unbreakable → Caitlyn E 90 Caliber Net)
- **0.55** projectile block: Unbreakable blocks Caitlyn's Ace in the Hole, a projectile. Unbreakable for 4 s, long enough to use ahead of Ace in the Hole. (Braum E Unbreakable → Caitlyn R Ace in the Hole)
- **0.50** projectile block: Unbreakable blocks Caitlyn's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Caitlyn basic attacks)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Braum's (650 vs 125 attack range).

### 3. Yasuo (net +0.93)

- **0.55** projectile block: Wind Wall blocks Caitlyn's Ace in the Hole, a projectile. Wind Wall for 4 s, long enough to use ahead of Ace in the Hole. (Yasuo W Wind Wall → Caitlyn R Ace in the Hole)
- **0.41** projectile block: Wind Wall blocks Caitlyn's 90 Caliber Net, a projectile. Wind Wall for 4 s, long enough to use ahead of 90 Caliber Net. (Yasuo W Wind Wall → Caitlyn E 90 Caliber Net)
- **0.39** projectile block: Wind Wall blocks Caitlyn's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Caitlyn basic attacks)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Yasuo's (650 vs 175 attack range).

### 4. Maokai (net +0.89)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 1.4 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Caitlyn W Yordle Snap Trap)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 1.4 s; Ace in the Hole takes 1.47 s to land, enough to react. (Maokai W Twisted Advance → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Bramble Smash's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Maokai's (650 vs 125 attack range).

### 5. Nocturne (net +0.83)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Caitlyn's Yordle Snap Trap. Spell shield for 1.5 s, long enough to use ahead of Yordle Snap Trap. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Caitlyn W Yordle Snap Trap)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Caitlyn's Ace in the Hole. Spell shield for 1.5 s, long enough to use ahead of Ace in the Hole. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Caitlyn's Ace in the Hole (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Nocturne's (650 vs 125 attack range).

### 6. Camille (net +0.82)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.5 s; Ace in the Hole takes 1.47 s to land, enough to react. (Camille R The Hextech Ultimatum → Caitlyn R Ace in the Hole)
- **0.33** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.5 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Wall Dive's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Camille's (650 vs 125 attack range).

### 7. Yuumi (net +0.78)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for ?; Yordle Snap Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Caitlyn W Yordle Snap Trap)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for ?; Ace in the Hole takes 1.47 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 225 units farther than Yuumi's (650 vs 425 attack range).

### 8. Kayn (net +0.76)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.25 s; Ace in the Hole takes 1.47 s to land, enough to react. (Kayn R Umbral Trespass → Caitlyn R Ace in the Hole)
- **0.33** untargetable: Umbral Trespass makes Kayn untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.25 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Blade's Reach's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Kayn's (650 vs 175 attack range).

### 9. Rek'Sai (net +0.76)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 1.5 s, long enough to use ahead of Ace in the Hole. (Rek'Sai R Void Rush → Caitlyn R Ace in the Hole)
- **0.33** untargetable: Void Rush makes Rek'Sai untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 1.5 s, long enough to use ahead of Yordle Snap Trap. (Rek'Sai R Void Rush → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Unburrow's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Rek'Sai's (650 vs 175 attack range).

### 10. Samira (net +0.75)

- **0.55** projectile block: Blade Whirl blocks Caitlyn's Ace in the Hole, a projectile. Blade Whirl for 0.75 s; Ace in the Hole takes 1.47 s to land, enough to react. (Samira W Blade Whirl → Caitlyn R Ace in the Hole)
- **0.37** projectile block: Blade Whirl blocks Caitlyn's 90 Caliber Net, a projectile. Blade Whirl for 0.75 s; 90 Caliber Net takes 0.65 s to land, enough to react. (Samira W Blade Whirl → Caitlyn E 90 Caliber Net)
- **0.30** projectile block: Blade Whirl blocks Caitlyn's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Caitlyn basic attacks)
- Watch out: Caitlyn's basic attacks reach 150 units farther than Samira's (650 vs 500 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.03 | 1.09 | 0.06 |  |
| 2 | Braum | +0.97 | 1.33 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Yasuo | +0.93 | 1.17 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Maokai | +0.89 | 1.25 | 0.36 |  |
| 5 | Nocturne | +0.83 | 1.19 | 0.36 |  |
| 6 | Camille | +0.82 | 1.00 | 0.18 |  |
| 7 | Yuumi | +0.78 | 0.98 | 0.20 |  |
| 8 | Kayn | +0.76 | 1.00 | 0.24 |  |
| 9 | Rek'Sai | +0.76 | 1.00 | 0.24 |  |
| 10 | Samira | +0.75 | 0.84 | 0.09 | projectile block (Blade Whirl) |
| 11 | Lissandra | +0.71 | 0.80 | 0.09 |  |
| 12 | Evelynn | +0.68 | 1.00 | 0.32 |  |
| 13 | Mel | +0.65 | 0.83 | 0.18 | projectile block (Rebuttal) |
| 14 | Bard | +0.65 | 0.79 | 0.14 |  |
| 15 | Fiora | +0.58 | 0.94 | 0.36 |  |
| 16 | Shaco | +0.56 | 1.00 | 0.44 |  |
| 17 | Master Yi | +0.54 | 0.90 | 0.36 |  |
| 18 | Malzahar | +0.54 | 0.81 | 0.27 |  |
| 19 | Sivir | +0.54 | 0.81 | 0.27 |  |
| 20 | Udyr | +0.52 | 0.88 | 0.36 |  |
| 21 | Ekko | +0.49 | 0.73 | 0.24 |  |
| 22 | Aurora | +0.48 | 0.68 | 0.20 |  |
| 23 | Warwick | +0.47 | 0.71 | 0.24 |  |
| 24 | Vladimir | +0.46 | 0.82 | 0.36 |  |
| 25 | Xayah | +0.46 | 0.68 | 0.22 |  |
| 26 | Kled | +0.46 | 0.64 | 0.18 |  |
| 27 | Gwen | +0.45 | 0.81 | 0.36 |  |
| 28 | Zed | +0.44 | 0.68 | 0.24 |  |
| 29 | Lulu | +0.44 | 0.62 | 0.18 |  |
| 30 | Milio | +0.42 | 0.64 | 0.22 |  |
| 31 | Zaahen | +0.41 | 0.65 | 0.24 |  |
| 32 | Shen | +0.40 | 0.64 | 0.24 |  |
| 33 | Cassiopeia | +0.39 | 0.57 | 0.18 |  |
| 34 | Ahri | +0.31 | 0.40 | 0.09 |  |
| 35 | Kalista | +0.31 | 0.38 | 0.07 |  |
| 36 | Vex | +0.30 | 0.39 | 0.09 |  |
| 37 | Viktor | +0.29 | 0.51 | 0.22 |  |
| 38 | Poppy | +0.28 | 0.64 | 0.36 |  |
| 39 | Rammus | +0.28 | 0.64 | 0.36 |  |
| 40 | Anivia | +0.28 | 0.28 | 0.00 |  |
| 41 | Annie | +0.28 | 0.28 | 0.00 |  |
| 42 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 43 | Kayle | +0.28 | 0.28 | 0.00 |  |
| 44 | Tristana | +0.26 | 0.26 | 0.00 |  |
| 45 | Nilah | +0.25 | 0.61 | 0.36 |  |
| 46 | Morgana | +0.24 | 0.60 | 0.36 |  |
| 47 | Yone | +0.24 | 0.42 | 0.18 |  |
| 48 | Hwei | +0.23 | 0.41 | 0.18 |  |
| 49 | Alistar | +0.22 | 0.58 | 0.36 |  |
| 50 | Zac | +0.22 | 0.58 | 0.36 |  |
| 51 | Veigar | +0.21 | 0.39 | 0.18 |  |
| 52 | Azir | +0.21 | 0.28 | 0.07 |  |
| 53 | Gnar | +0.20 | 0.28 | 0.08 |  |
| 54 | Corki | +0.19 | 0.28 | 0.09 |  |
| 55 | Ziggs | +0.19 | 0.28 | 0.09 |  |
| 56 | Zoe | +0.19 | 0.28 | 0.09 |  |
| 57 | Xin Zhao | +0.18 | 0.54 | 0.36 |  |
| 58 | Fiddlesticks | +0.18 | 0.28 | 0.10 |  |
| 59 | Quinn | +0.17 | 0.28 | 0.11 |  |
| 60 | Taliyah | +0.17 | 0.28 | 0.11 |  |
| 61 | Twisted Fate | +0.17 | 0.28 | 0.11 |  |
| 62 | Aurelion Sol | +0.17 | 0.26 | 0.09 |  |
| 63 | Jax | +0.16 | 0.52 | 0.36 |  |
| 64 | Heimerdinger | +0.16 | 0.34 | 0.18 |  |
| 65 | Thresh | +0.16 | 0.28 | 0.12 |  |
| 66 | Malphite | +0.14 | 0.50 | 0.36 |  |
| 67 | Jayce | +0.14 | 0.28 | 0.14 |  |
| 68 | Zyra | +0.14 | 0.28 | 0.14 |  |
| 69 | Teemo | +0.12 | 0.47 | 0.35 | blind (Blinding Dart) |
| 70 | Brand | +0.10 | 0.28 | 0.18 |  |
| 71 | Briar | +0.10 | 0.28 | 0.18 |  |
| 72 | Draven | +0.10 | 0.28 | 0.18 |  |
| 73 | Fizz | +0.10 | 0.28 | 0.18 |  |
| 74 | Janna | +0.10 | 0.28 | 0.18 |  |
| 75 | Jarvan IV | +0.10 | 0.28 | 0.18 |  |
| 76 | Kennen | +0.10 | 0.28 | 0.18 |  |
| 77 | K'Sante | +0.10 | 0.28 | 0.18 |  |
| 78 | Nami | +0.10 | 0.28 | 0.18 |  |
| 79 | Renata Glasc | +0.10 | 0.28 | 0.18 |  |
| 80 | Soraka | +0.10 | 0.28 | 0.18 |  |
| 81 | Sylas | +0.10 | 0.28 | 0.18 |  |
| 82 | Syndra | +0.10 | 0.28 | 0.18 |  |
| 83 | Zilean | +0.10 | 0.28 | 0.18 |  |
| 84 | Kindred | +0.09 | 0.23 | 0.14 |  |
| 85 | Neeko | +0.08 | 0.28 | 0.20 |  |
| 86 | Sona | +0.08 | 0.26 | 0.18 |  |
| 87 | Rakan | +0.07 | 0.28 | 0.21 |  |
| 88 | Orianna | +0.06 | 0.28 | 0.22 |  |
| 89 | Seraphine | +0.06 | 0.28 | 0.22 |  |
| 90 | Swain | +0.06 | 0.28 | 0.22 |  |
| 91 | Vel'Koz | +0.06 | 0.28 | 0.22 |  |
| 92 | Xerath | +0.06 | 0.28 | 0.22 |  |
| 93 | Amumu | +0.05 | 0.41 | 0.36 |  |
| 94 | Vayne | +0.05 | 0.28 | 0.23 |  |
| 95 | Bel'Veth | +0.04 | 0.28 | 0.24 |  |
| 96 | Galio | +0.04 | 0.28 | 0.24 |  |
| 97 | Lee Sin | +0.04 | 0.28 | 0.24 |  |
| 98 | Ornn | +0.04 | 0.28 | 0.24 |  |
| 99 | Pantheon | +0.04 | 0.28 | 0.24 |  |
| 100 | Rell | +0.04 | 0.28 | 0.24 |  |
| 101 | Riven | +0.04 | 0.28 | 0.24 |  |
| 102 | Vi | +0.04 | 0.28 | 0.24 |  |
| 103 | Volibear | +0.04 | 0.28 | 0.24 |  |
| 104 | Jinx | +0.04 | 0.26 | 0.22 |  |
| 105 | Ambessa | +0.02 | 0.26 | 0.24 |  |
| 106 | Hecarim | +0.02 | 0.26 | 0.24 |  |
| 107 | Urgot | +0.01 | 0.28 | 0.27 |  |
| 108 | Viego | -0.01 | 0.28 | 0.29 |  |
| 109 | Lillia | -0.04 | 0.25 | 0.29 |  |
| 110 | Sion | -0.05 | 0.67 | 0.72 |  |
| 111 | Pyke | -0.07 | 0.28 | 0.35 |  |
| 112 | Yunara | -0.07 | 0.00 | 0.07 |  |
| 113 | Aatrox | -0.08 | 0.28 | 0.36 |  |
| 114 | Diana | -0.08 | 0.28 | 0.36 |  |
| 115 | Gragas | -0.08 | 0.28 | 0.36 |  |
| 116 | Irelia | -0.08 | 0.28 | 0.36 |  |
| 117 | Kassadin | -0.08 | 0.28 | 0.36 |  |
| 118 | Leona | -0.08 | 0.28 | 0.36 |  |
| 119 | Nautilus | -0.08 | 0.28 | 0.36 |  |
| 120 | Renekton | -0.08 | 0.28 | 0.36 |  |
| 121 | Sejuani | -0.08 | 0.28 | 0.36 |  |
| 122 | Sett | -0.08 | 0.28 | 0.36 |  |
| 123 | Shyvana | -0.08 | 0.28 | 0.36 |  |
| 124 | Tahm Kench | -0.08 | 0.28 | 0.36 |  |
| 125 | Ezreal | -0.09 | 0.00 | 0.09 |  |
| 126 | Ryze | -0.09 | 0.00 | 0.09 |  |
| 127 | Zeri | -0.09 | 0.00 | 0.09 |  |
| 128 | Nidalee | -0.11 | 0.00 | 0.11 |  |
| 129 | Senna | -0.11 | 0.00 | 0.11 |  |
| 130 | Aphelios | -0.12 | 0.06 | 0.18 |  |
| 131 | Graves | -0.13 | 0.00 | 0.13 |  |
| 132 | Singed | -0.14 | 0.58 | 0.72 |  |
| 133 | Lucian | -0.14 | 0.00 | 0.14 |  |
| 134 | Varus | -0.14 | 0.00 | 0.14 |  |
| 135 | Wukong | -0.16 | 0.28 | 0.44 |  |
| 136 | Ivern | -0.16 | 0.00 | 0.16 |  |
| 137 | Garen | -0.18 | 0.54 | 0.72 |  |
| 138 | Jhin | -0.18 | 0.00 | 0.18 |  |
| 139 | Lux | -0.18 | 0.00 | 0.18 |  |
| 140 | Miss Fortune | -0.18 | 0.00 | 0.18 |  |
| 141 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 142 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 143 | Qiyana | -0.19 | 0.23 | 0.42 |  |
| 144 | LeBlanc | -0.19 | 0.00 | 0.19 |  |
| 145 | Gangplank | -0.21 | 0.51 | 0.72 |  |
| 146 | Taric | -0.21 | 0.51 | 0.72 |  |
| 147 | Kai'Sa | -0.22 | 0.00 | 0.22 |  |
| 148 | Karma | -0.22 | 0.00 | 0.22 |  |
| 149 | Rengar | -0.24 | 0.62 | 0.86 |  |
| 150 | Kog'Maw | -0.27 | 0.00 | 0.27 |  |
| 151 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 152 | Twitch | -0.29 | 0.00 | 0.29 |  |
| 153 | Mordekaiser | -0.35 | 0.37 | 0.72 |  |
| 154 | Olaf | -0.35 | 0.37 | 0.72 |  |
| 155 | Akali | -0.35 | 0.00 | 0.35 |  |
| 156 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 157 | Nunu & Willump | -0.36 | 0.36 | 0.72 |  |
| 158 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 159 | Karthus | -0.36 | 0.00 | 0.36 |  |
| 160 | Katarina | -0.36 | 0.00 | 0.36 |  |
| 161 | Locke | -0.36 | 0.00 | 0.36 |  |
| 162 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 163 | Skarner | -0.37 | 0.35 | 0.72 |  |
| 164 | Talon | -0.38 | 0.00 | 0.38 |  |
| 165 | Blitzcrank | -0.44 | 0.28 | 0.72 |  |
| 166 | Cho'Gath | -0.44 | 0.28 | 0.72 |  |
| 167 | Darius | -0.44 | 0.28 | 0.72 |  |
| 168 | Trundle | -0.44 | 0.28 | 0.72 |  |
| 169 | Yorick | -0.44 | 0.28 | 0.72 |  |
| 170 | Kha'Zix | -0.57 | 0.00 | 0.57 |  |
| 171 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 172 | Rumble | -0.72 | 0.00 | 0.72 |  |
