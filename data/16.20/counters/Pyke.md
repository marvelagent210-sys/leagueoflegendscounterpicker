# Counters to Pyke (patch 26.20)

Every champion ranked by what its kit does against Pyke's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Pyke's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Pyke` for the full ledger of a matchup, with sources.

## Top 10

### 1. Pantheon (net +1.78)

- **0.90** invulnerable: Aegis Assault makes Pantheon invulnerable to Pyke's Death from Below. Invulnerable for 1.5 s, long enough to use ahead of Death from Below. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Pyke R Death from Below)
- **0.72** death prevention: Pyke's Death from Below can't execute Pantheon during Aegis Assault (invulnerable). Aegis Assault lasts 1.5 s on a 18 s cooldown. (Pantheon E Aegis Assault → Pyke R Death from Below)
- **0.49** death prevention: Pyke's Death from Below can't execute Pantheon during Grand Starfall (minimum health). Grand Starfall lasts ? on a 150 s cooldown. (Pantheon R Grand Starfall → Pyke R Death from Below)
- Watch out: Phantom Undertow's stun interrupts Pantheon's Comet Spear (charge-up).

### 2. Nocturne (net +1.76)

- **0.95** spell shield: Shroud of Darkness's spell shield blocks Pyke's Phantom Undertow. Spell shield for 1.5 s, long enough to use ahead of Phantom Undertow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke E Phantom Undertow)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Pyke's Death from Below. Spell shield for 1.5 s, long enough to use ahead of Death from Below. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke R Death from Below)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Pyke's Bone Skewer. Spell shield for 1.5 s, long enough to use ahead of Bone Skewer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke Q Bone Skewer)

### 3. Sivir (net +1.69)

- **0.90** spell shield: Spell Shield's spell shield blocks Pyke's Death from Below. Spell shield for 1.5 s, long enough to use ahead of Death from Below. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke R Death from Below)
- **0.77** spell shield: Spell Shield's spell shield blocks Pyke's Phantom Undertow. Spell shield for 1.5 s, long enough to use ahead of Phantom Undertow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke E Phantom Undertow)
- **0.47** spell shield: Spell Shield's spell shield blocks Pyke's Bone Skewer. Spell shield for 1.5 s, long enough to use ahead of Bone Skewer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke Q Bone Skewer)

### 4. Elise (net +1.67)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Pyke's Death from Below. Untargetable for 0.6 s; Death from Below takes 0.5 s to land, enough to react. (Elise E Rappel → Pyke R Death from Below)
- **0.47** untargetable: Rappel makes Elise untargetable, dodging Pyke's Bone Skewer. Untargetable for 0.6 s; Bone Skewer takes 0.25 s to land, enough to react. (Elise E Rappel → Pyke Q Bone Skewer)
- **0.46** untargetable: Rappel makes Elise untargetable, dodging Pyke's Phantom Undertow. Untargetable for 0.6 s; Phantom Undertow lands within 0.18 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Pyke E Phantom Undertow)

### 5. Maokai (net +1.54)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Death from Below. Untargetable for 1.4 s; Death from Below takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Pyke R Death from Below)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Bone Skewer. Untargetable for 1.4 s; Bone Skewer takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Pyke Q Bone Skewer)
- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Phantom Undertow. Untargetable for 1.4 s; Phantom Undertow lands within 0.18 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Pyke E Phantom Undertow)

### 6. Kayn (net +1.51)

- **0.83** untargetable: Umbral Trespass makes Kayn untargetable, dodging Pyke's Death from Below. Untargetable for 0.25 s; Death from Below takes 0.5 s to land, enough to react. (Kayn R Umbral Trespass → Pyke R Death from Below)
- **0.72** death prevention: Pyke's Death from Below can't execute Kayn during The Darkin Scythe (invulnerable). The Darkin Scythe lasts 6 s on a ? cooldown. (Kayn I The Darkin Scythe → Pyke R Death from Below)
- **0.32** untargetable: Umbral Trespass makes Kayn untargetable, dodging Pyke's Bone Skewer. Untargetable for 0.25 s; Bone Skewer takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Pyke Q Bone Skewer)
- Watch out: Phantom Undertow's stun interrupts Kayn's Umbral Trespass (movement channel).

### 7. Kayle (net +1.49)

- **0.83** invulnerable: Divine Judgment makes Kayle invulnerable to Pyke's Death from Below. Invulnerable for 2.5 s, long enough to use ahead of Death from Below. (Kayle R Divine Judgment → Pyke R Death from Below)
- **0.67** death prevention: Pyke's Death from Below can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Pyke R Death from Below)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Pyke's Phantom Undertow (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Phantom Undertow. (Kayle R Divine Judgment → Pyke E Phantom Undertow)

### 8. Vladimir (net +1.46)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Death from Below. Untargetable for 2 s, long enough to use ahead of Death from Below. (Vladimir W Sanguine Pool → Pyke R Death from Below)
- **0.81** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Phantom Undertow. Untargetable for 2 s, long enough to use ahead of Phantom Undertow. (Vladimir W Sanguine Pool → Pyke E Phantom Undertow)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Bone Skewer. Untargetable for 2 s, long enough to use ahead of Bone Skewer. (Vladimir W Sanguine Pool → Pyke Q Bone Skewer)
- Watch out: Phantom Undertow's stun interrupts Vladimir's Tides of Blood (charge-up).

### 9. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Pyke's Phantom Undertow (stun). Immune for 1.5 s, long enough to use ahead of Phantom Undertow. (Udyr E Blazing Stampede → Pyke E Phantom Undertow)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Pyke's Bone Skewer (airborne, slow). Immune for 1.5 s, long enough to use ahead of Bone Skewer. (Udyr E Blazing Stampede → Pyke Q Bone Skewer)
- **0.18** interrupt: Blazing Stampede's stun interrupts Pyke's Bone Skewer (charge-up). Blazing Stampede must land during the charge-up. Pyke can release Bone Skewer early instead of charging it fully. (Udyr E Blazing Stampede → Pyke Q Bone Skewer)

### 10. Bard (net +1.38)

- **0.83** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Death from Below. Untargetable for 2.5 s, long enough to use ahead of Death from Below. (Bard R Tempered Fate → Pyke R Death from Below)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Phantom Undertow. Untargetable for 2.5 s, long enough to use ahead of Phantom Undertow. (Bard R Tempered Fate → Pyke E Phantom Undertow)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Bone Skewer. Untargetable for 2.5 s, long enough to use ahead of Bone Skewer. (Bard R Tempered Fate → Pyke Q Bone Skewer)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Pantheon | +1.78 | 1.87 | 0.09 |  |
| 2 | Nocturne | +1.76 | 1.76 | 0.00 |  |
| 3 | Sivir | +1.69 | 1.69 | 0.00 |  |
| 4 | Elise | +1.67 | 1.67 | 0.00 |  |
| 5 | Maokai | +1.54 | 1.54 | 0.00 |  |
| 6 | Kayn | +1.51 | 1.96 | 0.45 |  |
| 7 | Kayle | +1.49 | 1.49 | 0.00 |  |
| 8 | Vladimir | +1.46 | 1.54 | 0.08 |  |
| 9 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 10 | Bard | +1.38 | 1.38 | 0.00 |  |
| 11 | Zaahen | +1.37 | 1.37 | 0.00 |  |
| 12 | Fiora | +1.35 | 1.35 | 0.00 |  |
| 13 | Rek'Sai | +1.35 | 1.35 | 0.00 |  |
| 14 | Braum | +1.33 | 1.33 | 0.00 | projectile block (Unbreakable) |
| 15 | Lissandra | +1.33 | 1.33 | 0.00 |  |
| 16 | Kindred | +1.30 | 1.30 | 0.00 |  |
| 17 | Morgana | +1.29 | 1.29 | 0.00 |  |
| 18 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 19 | Xin Zhao | +1.29 | 1.29 | 0.00 |  |
| 20 | Gwen | +1.25 | 1.25 | 0.00 |  |
| 21 | Evelynn | +1.21 | 1.21 | 0.00 |  |
| 22 | Yuumi | +1.20 | 1.60 | 0.40 |  |
| 23 | Yasuo | +1.20 | 1.20 | 0.00 | projectile block (Wind Wall) |
| 24 | Shaco | +1.19 | 1.19 | 0.00 |  |
| 25 | Camille | +1.17 | 1.17 | 0.00 |  |
| 26 | Taric | +1.17 | 1.17 | 0.00 |  |
| 27 | Aurora | +1.16 | 1.16 | 0.00 |  |
| 28 | Ekko | +1.16 | 1.16 | 0.00 |  |
| 29 | Rengar | +1.16 | 1.16 | 0.00 |  |
| 30 | Master Yi | +1.15 | 1.36 | 0.21 |  |
| 31 | Zilean | +1.12 | 1.12 | 0.00 |  |
| 32 | Singed | +1.07 | 1.07 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 33 | Zed | +0.97 | 0.97 | 0.00 |  |
| 34 | Cassiopeia | +0.93 | 0.93 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 35 | Gangplank | +0.91 | 0.91 | 0.00 |  |
| 36 | Milio | +0.91 | 0.91 | 0.00 |  |
| 37 | Kog'Maw | +0.89 | 0.89 | 0.00 |  |
| 38 | Malzahar | +0.88 | 1.28 | 0.40 |  |
| 39 | Hwei | +0.84 | 0.84 | 0.00 | dash stop (Grim Visage) |
| 40 | Kled | +0.81 | 0.81 | 0.00 |  |
| 41 | Vex | +0.80 | 0.80 | 0.00 | dash stop (Doom 'n Gloom) |
| 42 | Anivia | +0.75 | 0.75 | 0.00 |  |
| 43 | Sion | +0.73 | 0.86 | 0.13 |  |
| 44 | Viktor | +0.73 | 0.73 | 0.00 | dash stop (Gravity Field) |
| 45 | Samira | +0.72 | 0.72 | 0.00 | projectile block (Blade Whirl) |
| 46 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 47 | Ahri | +0.70 | 0.70 | 0.00 | dash stop (Charm) |
| 48 | Lulu | +0.70 | 0.70 | 0.00 |  |
| 49 | Jinx | +0.68 | 0.68 | 0.00 | dash stop (Flame Chompers!) |
| 50 | Alistar | +0.67 | 0.67 | 0.00 |  |
| 51 | Mel | +0.67 | 0.67 | 0.00 |  |
| 52 | Tryndamere | +0.67 | 0.67 | 0.00 |  |
| 53 | Veigar | +0.67 | 0.67 | 0.00 | dash stop (Event Horizon) |
| 54 | Zac | +0.66 | 1.11 | 0.45 | dash stop (Stretching Strikes) |
| 55 | Garen | +0.65 | 0.65 | 0.00 |  |
| 56 | Olaf | +0.64 | 0.64 | 0.00 |  |
| 57 | Teemo | +0.59 | 0.59 | 0.00 |  |
| 58 | Poppy | +0.56 | 0.76 | 0.20 | dash stop (Steadfast Presence) |
| 59 | Warwick | +0.49 | 0.78 | 0.29 |  |
| 60 | Yone | +0.49 | 0.49 | 0.00 |  |
| 61 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 62 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 63 | Nilah | +0.41 | 0.41 | 0.00 |  |
| 64 | Corki | +0.39 | 0.39 | 0.00 |  |
| 65 | Jax | +0.39 | 0.39 | 0.00 |  |
| 66 | Draven | +0.38 | 0.38 | 0.00 |  |
| 67 | Thresh | +0.38 | 0.38 | 0.00 |  |
| 68 | Amumu | +0.37 | 0.37 | 0.00 |  |
| 69 | Heimerdinger | +0.35 | 0.35 | 0.00 |  |
| 70 | Kai'Sa | +0.35 | 0.35 | 0.00 |  |
| 71 | Sona | +0.35 | 0.35 | 0.00 |  |
| 72 | Zoe | +0.35 | 0.35 | 0.00 |  |
| 73 | Zyra | +0.35 | 0.35 | 0.00 |  |
| 74 | Jayce | +0.34 | 0.34 | 0.00 |  |
| 75 | Kennen | +0.34 | 0.34 | 0.00 |  |
| 76 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 77 | Brand | +0.33 | 0.33 | 0.00 |  |
| 78 | Nami | +0.33 | 0.33 | 0.00 |  |
| 79 | Seraphine | +0.33 | 0.33 | 0.00 |  |
| 80 | Urgot | +0.33 | 0.33 | 0.00 |  |
| 81 | Ashe | +0.32 | 0.32 | 0.00 |  |
| 82 | K'Sante | +0.32 | 0.32 | 0.00 |  |
| 83 | Mordekaiser | +0.32 | 0.32 | 0.00 |  |
| 84 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 85 | Ziggs | +0.32 | 0.32 | 0.00 |  |
| 86 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 87 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 88 | Annie | +0.30 | 0.30 | 0.00 |  |
| 89 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 90 | Sett | +0.30 | 0.30 | 0.00 |  |
| 91 | Soraka | +0.30 | 0.30 | 0.00 |  |
| 92 | Aatrox | +0.29 | 0.29 | 0.00 |  |
| 93 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 94 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 95 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 96 | Swain | +0.28 | 0.28 | 0.00 |  |
| 97 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 98 | Sylas | +0.26 | 0.26 | 0.00 |  |
| 99 | Azir | +0.25 | 0.25 | 0.00 |  |
| 100 | Karma | +0.25 | 0.25 | 0.00 |  |
| 101 | LeBlanc | +0.25 | 0.25 | 0.00 |  |
| 102 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 103 | Ornn | +0.25 | 0.25 | 0.00 |  |
| 104 | Quinn | +0.24 | 0.42 | 0.18 |  |
| 105 | Skarner | +0.24 | 0.24 | 0.00 |  |
| 106 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 107 | Neeko | +0.23 | 0.23 | 0.00 |  |
| 108 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 109 | Senna | +0.22 | 0.22 | 0.00 |  |
| 110 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 111 | Volibear | +0.22 | 0.22 | 0.00 |  |
| 112 | Twisted Fate | +0.21 | 0.56 | 0.35 |  |
| 113 | Varus | +0.19 | 0.30 | 0.11 |  |
| 114 | Lee Sin | +0.19 | 0.19 | 0.00 |  |
| 115 | Lux | +0.19 | 0.19 | 0.00 |  |
| 116 | Shyvana | +0.19 | 0.19 | 0.00 |  |
| 117 | Rammus | +0.18 | 0.43 | 0.25 |  |
| 118 | Bel'Veth | +0.18 | 0.18 | 0.00 |  |
| 119 | Blitzcrank | +0.18 | 0.18 | 0.00 |  |
| 120 | Cho'Gath | +0.18 | 0.18 | 0.00 |  |
| 121 | Illaoi | +0.18 | 0.18 | 0.00 |  |
| 122 | Kassadin | +0.18 | 0.18 | 0.00 |  |
| 123 | Leona | +0.18 | 0.18 | 0.00 |  |
| 124 | Renekton | +0.18 | 0.18 | 0.00 |  |
| 125 | Sejuani | +0.18 | 0.18 | 0.00 |  |
| 126 | Aurelion Sol | +0.15 | 0.23 | 0.08 |  |
| 127 | Ambessa | +0.15 | 0.15 | 0.00 |  |
| 128 | Briar | +0.15 | 0.15 | 0.00 |  |
| 129 | Fizz | +0.15 | 0.15 | 0.00 |  |
| 130 | Graves | +0.15 | 0.15 | 0.00 |  |
| 131 | Irelia | +0.15 | 0.15 | 0.00 |  |
| 132 | Rakan | +0.15 | 0.15 | 0.00 |  |
| 133 | Rell | +0.15 | 0.15 | 0.00 |  |
| 134 | Lillia | +0.14 | 0.14 | 0.00 |  |
| 135 | Yorick | +0.14 | 0.14 | 0.00 |  |
| 136 | Riven | +0.13 | 0.13 | 0.00 |  |
| 137 | Trundle | +0.13 | 0.13 | 0.00 |  |
| 138 | Darius | +0.12 | 0.12 | 0.00 |  |
| 139 | Hecarim | +0.12 | 0.12 | 0.00 |  |
| 140 | Jarvan IV | +0.12 | 0.12 | 0.00 |  |
| 141 | Akali | +0.11 | 0.11 | 0.00 |  |
| 142 | Diana | +0.08 | 0.08 | 0.00 |  |
| 143 | Wukong | +0.08 | 0.08 | 0.00 |  |
| 144 | Nautilus | +0.08 | 0.08 | 0.00 |  |
| 145 | Qiyana | +0.08 | 0.08 | 0.00 |  |
| 146 | Caitlyn | +0.07 | 0.35 | 0.28 |  |
| 147 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 148 | Vel'Koz | +0.04 | 0.32 | 0.28 |  |
| 149 | Xerath | 0.00 | 0.32 | 0.32 |  |
| 150 | Galio | 0.00 | 0.18 | 0.18 |  |
| 151 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 152 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 153 | Locke | 0.00 | 0.00 | 0.00 |  |
| 154 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Shen | -0.01 | 0.44 | 0.45 |  |
| 157 | Gragas | -0.01 | 0.14 | 0.15 |  |
| 158 | Ivern | -0.02 | 0.12 | 0.14 |  |
| 159 | Fiddlesticks | -0.03 | 0.41 | 0.44 |  |
| 160 | Janna | -0.03 | 0.37 | 0.40 |  |
| 161 | Vi | -0.04 | 0.32 | 0.36 |  |
| 162 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 163 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 164 | Viego | -0.09 | 0.12 | 0.21 |  |
| 165 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 166 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 167 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 168 | Taliyah | -0.18 | 0.30 | 0.48 |  |
| 169 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 170 | Nunu & Willump | -0.26 | 0.23 | 0.49 |  |
| 171 | Tahm Kench | -0.32 | 0.18 | 0.50 |  |
| 172 | Naafiri | -0.34 | 0.11 | 0.45 |  |
