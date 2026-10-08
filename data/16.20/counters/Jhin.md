# Counters to Jhin (patch 26.20)

Every champion ranked by what its kit does against Jhin's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jhin's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jhin` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.21)

- **0.56** untargetable: Rappel makes Elise untargetable, dodging Jhin's Deadly Flourish. Untargetable for 0.6 s; Deadly Flourish takes 0.75 s to land, enough to react. (Elise E Rappel → Jhin W Deadly Flourish)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Jhin's Curtain Call. Untargetable for 0.6 s; Curtain Call takes 1.7 s to land, enough to react. (Elise E Rappel → Jhin R Curtain Call)
- **0.28** interrupt: Cocoon's stun interrupts Jhin's Curtain Call (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Jhin R Curtain Call)

### 2. Braum (net +1.15)

- **0.70** projectile block: Unbreakable blocks Jhin's Deadly Flourish, a projectile. Unbreakable for 4 s, long enough to use ahead of Deadly Flourish. (Braum E Unbreakable → Jhin W Deadly Flourish)
- **0.55** projectile block: Unbreakable blocks Jhin's Curtain Call, a projectile. Unbreakable for 4 s, long enough to use ahead of Curtain Call. (Braum E Unbreakable → Jhin R Curtain Call)
- **0.37** projectile block: Unbreakable blocks Jhin's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Jhin basic attacks)
- Watch out: Jhin's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 3. Maokai (net +1.10)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Deadly Flourish. Untargetable for 1.4 s; Deadly Flourish takes 0.75 s to land, enough to react. (Maokai W Twisted Advance → Jhin W Deadly Flourish)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Curtain Call. Untargetable for 1.4 s; Curtain Call takes 1.7 s to land, enough to react. (Maokai W Twisted Advance → Jhin R Curtain Call)
- **0.32** untargetable: Twisted Advance makes Maokai untargetable, dodging Jhin's Dancing Grenade. Untargetable for 1.4 s; Dancing Grenade takes 0.56 s to land, enough to react. (Maokai W Twisted Advance → Jhin Q Dancing Grenade)
- Watch out: Jhin's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 4. Yasuo (net +1.09)

- **0.58** projectile block: Wind Wall blocks Jhin's Deadly Flourish, a projectile. Wind Wall for 4 s, long enough to use ahead of Deadly Flourish. (Yasuo W Wind Wall → Jhin W Deadly Flourish)
- **0.55** projectile block: Wind Wall blocks Jhin's Curtain Call, a projectile. Wind Wall for 4 s, long enough to use ahead of Curtain Call. (Yasuo W Wind Wall → Jhin R Curtain Call)
- **0.29** projectile block: Wind Wall blocks Jhin's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Jhin basic attacks)
- Watch out: Jhin's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 5. Yuumi (net +1.05)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Deadly Flourish. Untargetable for ?; Deadly Flourish takes 0.75 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin W Deadly Flourish)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Curtain Call. Untargetable for ?; Curtain Call takes 1.7 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin R Curtain Call)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Jhin's Dancing Grenade. Untargetable for ?; Dancing Grenade takes 0.56 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jhin Q Dancing Grenade)
- Watch out: Jhin's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

### 6. Nocturne (net +1.02)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Jhin's Deadly Flourish. Spell shield for 1.5 s, long enough to use ahead of Deadly Flourish. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jhin W Deadly Flourish)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Jhin's Curtain Call. Spell shield for 1.5 s, long enough to use ahead of Curtain Call. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jhin R Curtain Call)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Jhin's Curtain Call (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 7. Camille (net +0.94)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Jhin's Curtain Call. Untargetable for 0.5 s; Curtain Call takes 1.7 s to land, enough to react. (Camille R The Hextech Ultimatum → Jhin R Curtain Call)
- **0.34** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Jhin's Deadly Flourish. Untargetable for 0.5 s; Deadly Flourish takes 0.75 s to land, enough to react. (Camille R The Hextech Ultimatum → Jhin W Deadly Flourish)
- **0.28** interrupt: Wall Dive's airborne interrupts Jhin's Curtain Call (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 425 units farther than Camille's (550 vs 125 attack range).

### 8. Samira (net +0.91)

- **0.55** projectile block: Blade Whirl blocks Jhin's Curtain Call, a projectile. Blade Whirl for 0.75 s; Curtain Call takes 1.7 s to land, enough to react. (Samira W Blade Whirl → Jhin R Curtain Call)
- **0.51** projectile block: Blade Whirl blocks Jhin's Deadly Flourish, a projectile. Blade Whirl for 0.75 s; Deadly Flourish takes 0.75 s to land, enough to react. (Samira W Blade Whirl → Jhin W Deadly Flourish)
- **0.24** projectile block: Blade Whirl blocks Jhin's Dancing Grenade, a projectile. Blade Whirl for 0.75 s; Dancing Grenade takes 0.56 s to land, enough to react. (Samira W Blade Whirl → Jhin Q Dancing Grenade)

### 9. Kayn (net +0.90)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Jhin's Curtain Call. Untargetable for 0.25 s; Curtain Call takes 1.7 s to land, enough to react. (Kayn R Umbral Trespass → Jhin R Curtain Call)
- **0.34** untargetable: Umbral Trespass makes Kayn untargetable, dodging Jhin's Deadly Flourish. Untargetable for 0.25 s; Deadly Flourish takes 0.75 s to land, enough to react. (Kayn R Umbral Trespass → Jhin W Deadly Flourish)
- **0.28** interrupt: Blade's Reach's airborne interrupts Jhin's Curtain Call (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range).

### 10. Rek'Sai (net +0.90)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Jhin's Curtain Call. Untargetable for 1.5 s, long enough to use ahead of Curtain Call. (Rek'Sai R Void Rush → Jhin R Curtain Call)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Jhin's Deadly Flourish. Untargetable for 1.5 s, long enough to use ahead of Deadly Flourish. (Rek'Sai R Void Rush → Jhin W Deadly Flourish)
- **0.28** interrupt: Unburrow's airborne interrupts Jhin's Curtain Call (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Jhin R Curtain Call)
- Watch out: Jhin's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.21 | 1.21 | 0.00 |  |
| 2 | Braum | +1.15 | 1.42 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Maokai | +1.10 | 1.37 | 0.27 |  |
| 4 | Yasuo | +1.09 | 1.26 | 0.17 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 5 | Yuumi | +1.05 | 1.13 | 0.08 |  |
| 6 | Nocturne | +1.02 | 1.29 | 0.27 |  |
| 7 | Camille | +0.94 | 1.07 | 0.13 |  |
| 8 | Samira | +0.91 | 0.91 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 9 | Kayn | +0.90 | 1.07 | 0.17 |  |
| 10 | Rek'Sai | +0.90 | 1.07 | 0.17 |  |
| 11 | Evelynn | +0.89 | 1.07 | 0.18 |  |
| 12 | Shaco | +0.89 | 1.07 | 0.18 |  |
| 13 | Mel | +0.89 | 0.89 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 14 | Sivir | +0.87 | 0.87 | 0.00 |  |
| 15 | Master Yi | +0.84 | 1.09 | 0.25 |  |
| 16 | Vladimir | +0.84 | 0.97 | 0.13 |  |
| 17 | Bard | +0.82 | 0.82 | 0.00 |  |
| 18 | Lissandra | +0.82 | 0.82 | 0.00 |  |
| 19 | Fiora | +0.80 | 1.07 | 0.27 |  |
| 20 | Aurora | +0.75 | 0.75 | 0.00 |  |
| 21 | Xayah | +0.75 | 0.75 | 0.00 |  |
| 22 | Malzahar | +0.68 | 0.68 | 0.00 |  |
| 23 | Milio | +0.67 | 0.67 | 0.00 |  |
| 24 | Gwen | +0.66 | 0.93 | 0.27 |  |
| 25 | Ekko | +0.63 | 0.81 | 0.18 |  |
| 26 | Udyr | +0.62 | 0.89 | 0.27 |  |
| 27 | Kled | +0.58 | 0.68 | 0.10 |  |
| 28 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 29 | Zed | +0.57 | 0.75 | 0.18 |  |
| 30 | Morgana | +0.57 | 0.70 | 0.13 |  |
| 31 | Shen | +0.54 | 0.72 | 0.18 |  |
| 32 | Warwick | +0.54 | 0.72 | 0.18 |  |
| 33 | Zaahen | +0.54 | 0.71 | 0.17 |  |
| 34 | Lulu | +0.53 | 0.53 | 0.00 |  |
| 35 | Tristana | +0.53 | 0.53 | 0.00 |  |
| 36 | Xin Zhao | +0.45 | 0.70 | 0.25 |  |
| 37 | Nilah | +0.41 | 0.63 | 0.22 |  |
| 38 | Kalista | +0.40 | 0.40 | 0.00 |  |
| 39 | Kindred | +0.38 | 0.38 | 0.00 |  |
| 40 | Heimerdinger | +0.37 | 0.37 | 0.00 |  |
| 41 | Annie | +0.36 | 0.36 | 0.00 |  |
| 42 | Alistar | +0.35 | 0.62 | 0.27 |  |
| 43 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 44 | Pantheon | +0.34 | 0.51 | 0.17 |  |
| 45 | Rammus | +0.28 | 0.55 | 0.27 |  |
| 46 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 47 | Anivia | +0.28 | 0.28 | 0.00 |  |
| 48 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 49 | Azir | +0.28 | 0.28 | 0.00 |  |
| 50 | Brand | +0.28 | 0.28 | 0.00 |  |
| 51 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 52 | Corki | +0.28 | 0.28 | 0.00 |  |
| 53 | Draven | +0.28 | 0.28 | 0.00 |  |
| 54 | Fiddlesticks | +0.28 | 0.28 | 0.00 |  |
| 55 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 56 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 57 | Janna | +0.28 | 0.28 | 0.00 |  |
| 58 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 59 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 60 | Nami | +0.28 | 0.28 | 0.00 |  |
| 61 | Neeko | +0.28 | 0.28 | 0.00 |  |
| 62 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 63 | Quinn | +0.28 | 0.28 | 0.00 |  |
| 64 | Renata Glasc | +0.28 | 0.28 | 0.00 |  |
| 65 | Seraphine | +0.28 | 0.28 | 0.00 |  |
| 66 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 67 | Swain | +0.28 | 0.28 | 0.00 |  |
| 68 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 69 | Taliyah | +0.28 | 0.28 | 0.00 |  |
| 70 | Twisted Fate | +0.28 | 0.28 | 0.00 |  |
| 71 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 72 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 73 | Vel'Koz | +0.28 | 0.28 | 0.00 |  |
| 74 | Vex | +0.28 | 0.28 | 0.00 |  |
| 75 | Viktor | +0.28 | 0.28 | 0.00 |  |
| 76 | Xerath | +0.28 | 0.28 | 0.00 |  |
| 77 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 78 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 79 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 80 | Zyra | +0.28 | 0.28 | 0.00 |  |
| 81 | Aurelion Sol | +0.26 | 0.26 | 0.00 |  |
| 82 | Sona | +0.26 | 0.26 | 0.00 |  |
| 83 | Jax | +0.24 | 0.51 | 0.27 |  |
| 84 | Thresh | +0.24 | 0.28 | 0.04 |  |
| 85 | Sion | +0.23 | 0.73 | 0.50 |  |
| 86 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 87 | Malphite | +0.17 | 0.44 | 0.27 |  |
| 88 | Rakan | +0.17 | 0.28 | 0.11 |  |
| 89 | Viego | +0.16 | 0.28 | 0.12 |  |
| 90 | Briar | +0.15 | 0.28 | 0.13 |  |
| 91 | Fizz | +0.15 | 0.28 | 0.13 |  |
| 92 | Jarvan IV | +0.15 | 0.28 | 0.13 |  |
| 93 | K'Sante | +0.15 | 0.28 | 0.13 |  |
| 94 | Sylas | +0.15 | 0.28 | 0.13 |  |
| 95 | Urgot | +0.15 | 0.28 | 0.13 |  |
| 96 | Yone | +0.15 | 0.28 | 0.13 |  |
| 97 | Taric | +0.13 | 0.66 | 0.53 |  |
| 98 | Rengar | +0.11 | 0.64 | 0.53 |  |
| 99 | Wukong | +0.11 | 0.28 | 0.17 |  |
| 100 | Ornn | +0.11 | 0.28 | 0.17 |  |
| 101 | Rell | +0.11 | 0.28 | 0.17 |  |
| 102 | Bel'Veth | +0.10 | 0.28 | 0.18 |  |
| 103 | Galio | +0.10 | 0.28 | 0.18 |  |
| 104 | Lee Sin | +0.10 | 0.28 | 0.18 |  |
| 105 | Pyke | +0.10 | 0.28 | 0.18 |  |
| 106 | Riven | +0.10 | 0.28 | 0.18 |  |
| 107 | Vi | +0.10 | 0.28 | 0.18 |  |
| 108 | Volibear | +0.10 | 0.28 | 0.18 |  |
| 109 | Lillia | +0.10 | 0.25 | 0.15 |  |
| 110 | Hecarim | +0.09 | 0.26 | 0.17 |  |
| 111 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 112 | Ambessa | +0.08 | 0.26 | 0.18 |  |
| 113 | Garen | +0.07 | 0.57 | 0.50 |  |
| 114 | Gangplank | +0.06 | 0.59 | 0.53 |  |
| 115 | Irelia | +0.05 | 0.28 | 0.23 |  |
| 116 | Qiyana | +0.05 | 0.23 | 0.18 |  |
| 117 | Aatrox | +0.03 | 0.28 | 0.25 |  |
| 118 | Nautilus | +0.03 | 0.28 | 0.25 |  |
| 119 | Tahm Kench | +0.03 | 0.28 | 0.25 |  |
| 120 | Zac | +0.03 | 0.28 | 0.25 |  |
| 121 | Amumu | +0.01 | 0.28 | 0.27 |  |
| 122 | Diana | +0.01 | 0.28 | 0.27 |  |
| 123 | Gragas | +0.01 | 0.28 | 0.27 |  |
| 124 | Kassadin | +0.01 | 0.28 | 0.27 |  |
| 125 | Leona | +0.01 | 0.28 | 0.27 |  |
| 126 | Renekton | +0.01 | 0.28 | 0.27 |  |
| 127 | Sejuani | +0.01 | 0.28 | 0.27 |  |
| 128 | Sett | +0.01 | 0.28 | 0.27 |  |
| 129 | Shyvana | +0.01 | 0.28 | 0.27 |  |
| 130 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 131 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 132 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 133 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 134 | Karma | 0.00 | 0.00 | 0.00 |  |
| 135 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 136 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 137 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 138 | Lux | 0.00 | 0.00 | 0.00 |  |
| 139 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 140 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 141 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 142 | Senna | 0.00 | 0.00 | 0.00 |  |
| 143 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 144 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 145 | Varus | 0.00 | 0.00 | 0.00 |  |
| 146 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 147 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 148 | Poppy | -0.01 | 0.26 | 0.27 |  |
| 149 | Ivern | -0.05 | 0.00 | 0.05 |  |
| 150 | Graves | -0.06 | 0.00 | 0.06 |  |
| 151 | Olaf | -0.10 | 0.43 | 0.53 |  |
| 152 | Karthus | -0.13 | 0.00 | 0.13 |  |
| 153 | Naafiri | -0.13 | 0.00 | 0.13 |  |
| 154 | Nunu & Willump | -0.15 | 0.38 | 0.53 |  |
| 155 | Skarner | -0.15 | 0.38 | 0.53 |  |
| 156 | Mordekaiser | -0.16 | 0.34 | 0.50 |  |
| 157 | Akali | -0.18 | 0.00 | 0.18 |  |
| 158 | Talon | -0.18 | 0.00 | 0.18 |  |
| 159 | Darius | -0.22 | 0.28 | 0.50 |  |
| 160 | Trundle | -0.22 | 0.28 | 0.50 |  |
| 161 | Yorick | -0.22 | 0.28 | 0.50 |  |
| 162 | Blitzcrank | -0.25 | 0.28 | 0.53 |  |
| 163 | Cho'Gath | -0.25 | 0.28 | 0.53 |  |
| 164 | Singed | -0.25 | 0.28 | 0.53 |  |
| 165 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 166 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 167 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 168 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 169 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 170 | Locke | -0.27 | 0.00 | 0.27 |  |
| 171 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 172 | Rumble | -0.53 | 0.00 | 0.53 |  |
