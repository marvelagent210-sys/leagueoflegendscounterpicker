# Counters to Thresh (patch 26.20)

Every champion ranked by what its kit does against Thresh's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Thresh's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Thresh` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.11)

- **0.72** spell shield: Shroud of Darkness's spell shield blocks Thresh's Death Sentence. Spell shield for 1.5 s, long enough to use ahead of Death Sentence. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh Q Death Sentence)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Thresh's Flay. Spell shield for 1.5 s, long enough to use ahead of Flay. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh E Flay)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Thresh's The Box. Spell shield for 1.5 s, long enough to use ahead of The Box. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Nocturne's (450 vs 125 attack range).

### 2. Maokai (net +1.10)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's Death Sentence. Untargetable for 1.4 s; Death Sentence takes 1.08 s to land, enough to react. (Maokai W Twisted Advance → Thresh Q Death Sentence)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's Flay. Untargetable for 1.4 s; Flay takes 0.66 s to land, enough to react. (Maokai W Twisted Advance → Thresh E Flay)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Thresh's The Box. Untargetable for 1.4 s; The Box takes 0.45 s to land, enough to react. (Maokai W Twisted Advance → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Maokai's (450 vs 125 attack range).

### 3. Elise (net +1.05)

- **0.60** untargetable: Rappel makes Elise untargetable, dodging Thresh's Death Sentence. Untargetable for 0.6 s; Death Sentence takes 1.08 s to land, enough to react. (Elise E Rappel → Thresh Q Death Sentence)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Thresh's The Box. Untargetable for 0.6 s; The Box takes 0.45 s to land, enough to react. (Elise E Rappel → Thresh R The Box)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Thresh's Flay. Untargetable for 0.6 s; Flay takes 0.66 s to land, enough to react. (Elise E Rappel → Thresh E Flay)

### 4. Udyr (net +1.04)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Thresh's Death Sentence (airborne, stun). Immune for 1.5 s, long enough to use ahead of Death Sentence. (Udyr E Blazing Stampede → Thresh Q Death Sentence)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Thresh's Flay (airborne, slow). Immune for 1.5 s, long enough to use ahead of Flay. (Udyr E Blazing Stampede → Thresh E Flay)
- **0.14** cc immunity: Blazing Stampede makes Udyr immune to Thresh's The Box (slow). Immune for 1.5 s, long enough to use ahead of The Box. (Udyr E Blazing Stampede → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 325 units farther than Udyr's (450 vs 125 attack range).

### 5. Fiora (net +1.02)

- **0.73** parry: Riposte parries Thresh's Death Sentence and stuns back. Parry for 0.75 s; Death Sentence takes 1.08 s to land, enough to react. Negating Death Sentence's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Thresh Q Death Sentence)
- **0.64** parry: Riposte parries Thresh's Flay and stuns back. Parry for 0.75 s; Flay takes 0.66 s to land, enough to react. Negating Flay's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Thresh E Flay)
- **0.55** parry: Riposte parries Thresh's The Box. Parry for 0.75 s; The Box takes 0.45 s to land, enough to react. (Fiora W Riposte → Thresh R The Box)
- Watch out: Thresh's basic attacks reach 300 units farther than Fiora's (450 vs 150 attack range).

### 6. Sivir (net +1.00)

- **0.60** spell shield: Spell Shield's spell shield blocks Thresh's Death Sentence. Spell shield for 1.5 s, long enough to use ahead of Death Sentence. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh Q Death Sentence)
- **0.55** spell shield: Spell Shield's spell shield blocks Thresh's The Box. Spell shield for 1.5 s, long enough to use ahead of The Box. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh R The Box)
- **0.51** spell shield: Spell Shield's spell shield blocks Thresh's Flay. Spell shield for 1.5 s, long enough to use ahead of Flay. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Thresh E Flay)

### 7. Vladimir (net +0.96)

- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's Death Sentence. Untargetable for 2 s, long enough to use ahead of Death Sentence. (Vladimir W Sanguine Pool → Thresh Q Death Sentence)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's The Box. Untargetable for 2 s, long enough to use ahead of The Box. (Vladimir W Sanguine Pool → Thresh R The Box)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Thresh's Flay. Untargetable for 2 s, long enough to use ahead of Flay. (Vladimir W Sanguine Pool → Thresh E Flay)
- Watch out: Flay's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 8. Morgana (net +0.94)

- **0.63** cc immunity: Black Shield makes Morgana immune to Thresh's Death Sentence (airborne, stun). Immune for 5 s, long enough to use ahead of Death Sentence. (Morgana E Black Shield → Thresh Q Death Sentence)
- **0.54** cc immunity: Black Shield makes Morgana immune to Thresh's Flay (airborne, slow). Immune for 5 s, long enough to use ahead of Flay. (Morgana E Black Shield → Thresh E Flay)
- **0.14** cc immunity: Black Shield makes Morgana immune to Thresh's The Box (slow). Immune for 5 s, long enough to use ahead of The Box. (Morgana E Black Shield → Thresh R The Box)

### 9. Yuumi (net +0.93)

- **0.85** untargetable: You and Me! makes Yuumi untargetable, dodging Thresh's Death Sentence. Untargetable for ?; Death Sentence takes 1.08 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Thresh Q Death Sentence)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Thresh's Flay. Untargetable for ?; Flay takes 0.66 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Thresh E Flay)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Thresh's The Box. Untargetable for ?; The Box takes 0.45 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Thresh R The Box)
- Watch out: Flay's airborne interrupts Yuumi's Final Chapter (normal channel).

### 10. Lissandra (net +0.90)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's The Box. Untargetable for 2.5 s, long enough to use ahead of The Box. (Lissandra R Frozen Tomb → Thresh R The Box)
- **0.40** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's Death Sentence. Untargetable for 2.5 s, long enough to use ahead of Death Sentence. (Lissandra R Frozen Tomb → Thresh Q Death Sentence)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Thresh's Flay. Untargetable for 2.5 s, long enough to use ahead of Flay. (Lissandra R Frozen Tomb → Thresh E Flay)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.11 | 1.30 | 0.19 |  |
| 2 | Maokai | +1.10 | 1.29 | 0.19 |  |
| 3 | Elise | +1.05 | 1.05 | 0.00 |  |
| 4 | Udyr | +1.04 | 1.23 | 0.19 |  |
| 5 | Fiora | +1.02 | 1.20 | 0.18 |  |
| 6 | Sivir | +1.00 | 1.00 | 0.00 |  |
| 7 | Vladimir | +0.96 | 1.04 | 0.08 |  |
| 8 | Morgana | +0.94 | 0.94 | 0.00 |  |
| 9 | Yuumi | +0.93 | 1.34 | 0.41 |  |
| 10 | Lissandra | +0.90 | 0.90 | 0.00 |  |
| 11 | Bard | +0.83 | 0.83 | 0.00 |  |
| 12 | Gwen | +0.82 | 1.00 | 0.18 |  |
| 13 | Xayah | +0.81 | 0.81 | 0.00 |  |
| 14 | Master Yi | +0.79 | 1.18 | 0.39 |  |
| 15 | Rek'Sai | +0.74 | 0.85 | 0.11 |  |
| 16 | Ekko | +0.73 | 0.86 | 0.13 |  |
| 17 | Camille | +0.70 | 0.80 | 0.10 |  |
| 18 | Aurora | +0.67 | 0.82 | 0.15 |  |
| 19 | Braum | +0.66 | 0.85 | 0.19 | projectile block (Unbreakable) |
| 20 | Zed | +0.63 | 0.76 | 0.13 |  |
| 21 | Evelynn | +0.62 | 0.83 | 0.21 |  |
| 22 | Mel | +0.56 | 0.56 | 0.00 | projectile block (Rebuttal) |
| 23 | Samira | +0.55 | 0.55 | 0.00 | projectile block (Blade Whirl) |
| 24 | Vex | +0.55 | 0.55 | 0.00 |  |
| 25 | Kayle | +0.53 | 0.53 | 0.00 |  |
| 26 | Hwei | +0.52 | 0.52 | 0.00 | dash stop (Grim Visage) |
| 27 | Jinx | +0.52 | 0.52 | 0.00 | dash stop (Flame Chompers!) |
| 28 | Kled | +0.51 | 0.57 | 0.06 |  |
| 29 | Shaco | +0.50 | 0.83 | 0.33 |  |
| 30 | Yasuo | +0.50 | 0.61 | 0.11 | projectile block (Wind Wall) |
| 31 | Milio | +0.50 | 0.50 | 0.00 |  |
| 32 | Zaahen | +0.49 | 0.60 | 0.11 |  |
| 33 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 34 | Ahri | +0.48 | 0.48 | 0.00 |  |
| 35 | Viktor | +0.47 | 0.47 | 0.00 |  |
| 36 | Malzahar | +0.46 | 0.86 | 0.40 |  |
| 37 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 38 | Rengar | +0.42 | 0.95 | 0.53 |  |
| 39 | Gangplank | +0.40 | 0.79 | 0.39 |  |
| 40 | Kindred | +0.36 | 0.36 | 0.00 |  |
| 41 | Warwick | +0.35 | 0.78 | 0.43 |  |
| 42 | Pantheon | +0.30 | 0.51 | 0.21 |  |
| 43 | Alistar | +0.29 | 0.48 | 0.19 |  |
| 44 | Yone | +0.29 | 0.37 | 0.08 |  |
| 45 | Lulu | +0.28 | 0.28 | 0.00 |  |
| 46 | Kayn | +0.27 | 0.83 | 0.56 |  |
| 47 | Cassiopeia | +0.24 | 0.24 | 0.00 |  |
| 48 | Teemo | +0.23 | 0.31 | 0.08 |  |
| 49 | Olaf | +0.21 | 0.60 | 0.39 |  |
| 50 | Xin Zhao | +0.21 | 0.37 | 0.16 |  |
| 51 | Corki | +0.18 | 0.18 | 0.00 |  |
| 52 | Sion | +0.17 | 0.63 | 0.46 |  |
| 53 | K'Sante | +0.16 | 0.25 | 0.09 |  |
| 54 | Aphelios | +0.16 | 0.16 | 0.00 |  |
| 55 | Tristana | +0.15 | 0.15 | 0.00 |  |
| 56 | Poppy | +0.14 | 0.53 | 0.39 | dash stop (Steadfast Presence) |
| 57 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 58 | Garen | +0.12 | 0.45 | 0.33 |  |
| 59 | Malphite | +0.10 | 0.29 | 0.19 |  |
| 60 | Nilah | +0.09 | 0.22 | 0.13 |  |
| 61 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 62 | Sona | +0.07 | 0.07 | 0.00 |  |
| 63 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 64 | Zeri | +0.07 | 0.07 | 0.00 |  |
| 65 | Jax | +0.06 | 0.25 | 0.19 |  |
| 66 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 67 | Annie | +0.06 | 0.06 | 0.00 |  |
| 68 | Draven | +0.06 | 0.06 | 0.00 |  |
| 69 | Renata Glasc | +0.06 | 0.06 | 0.00 |  |
| 70 | Jarvan IV | +0.05 | 0.13 | 0.08 |  |
| 71 | Ezreal | +0.05 | 0.05 | 0.00 |  |
| 72 | Kennen | +0.05 | 0.05 | 0.00 |  |
| 73 | Lux | +0.05 | 0.05 | 0.00 |  |
| 74 | Smolder | +0.05 | 0.05 | 0.00 |  |
| 75 | Zilean | +0.05 | 0.05 | 0.00 |  |
| 76 | Zoe | +0.05 | 0.05 | 0.00 |  |
| 77 | Zyra | +0.05 | 0.05 | 0.00 |  |
| 78 | Amumu | +0.04 | 0.23 | 0.19 |  |
| 79 | Brand | +0.04 | 0.04 | 0.00 |  |
| 80 | Nami | +0.04 | 0.04 | 0.00 |  |
| 81 | Nidalee | +0.04 | 0.04 | 0.00 |  |
| 82 | Seraphine | +0.04 | 0.04 | 0.00 |  |
| 83 | Soraka | +0.04 | 0.04 | 0.00 |  |
| 84 | Syndra | +0.04 | 0.04 | 0.00 |  |
| 85 | Ziggs | +0.04 | 0.04 | 0.00 |  |
| 86 | Azir | +0.03 | 0.03 | 0.00 |  |
| 87 | Karma | +0.03 | 0.03 | 0.00 |  |
| 88 | Orianna | +0.03 | 0.03 | 0.00 |  |
| 89 | Swain | +0.03 | 0.03 | 0.00 |  |
| 90 | Hecarim | +0.02 | 0.13 | 0.11 |  |
| 91 | Ornn | +0.02 | 0.13 | 0.11 |  |
| 92 | Volibear | +0.01 | 0.13 | 0.12 |  |
| 93 | Taric | 0.00 | 0.36 | 0.36 |  |
| 94 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 95 | Graves | 0.00 | 0.00 | 0.00 |  |
| 96 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 97 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 98 | Senna | -0.03 | 0.08 | 0.11 |  |
| 99 | Twitch | -0.04 | 0.07 | 0.11 |  |
| 100 | Aurelion Sol | -0.04 | 0.04 | 0.08 |  |
| 101 | Shyvana | -0.05 | 0.13 | 0.18 |  |
| 102 | Varus | -0.05 | 0.06 | 0.11 |  |
| 103 | LeBlanc | -0.05 | 0.03 | 0.08 |  |
| 104 | Illaoi | -0.06 | 0.13 | 0.19 |  |
| 105 | Sett | -0.06 | 0.13 | 0.19 |  |
| 106 | Kai'Sa | -0.06 | 0.05 | 0.11 |  |
| 107 | Rakan | -0.06 | 0.00 | 0.06 |  |
| 108 | Urgot | -0.06 | 0.00 | 0.06 |  |
| 109 | Vayne | -0.07 | 0.07 | 0.14 |  |
| 110 | Neeko | -0.07 | 0.04 | 0.11 |  |
| 111 | Lillia | -0.07 | 0.00 | 0.07 |  |
| 112 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 113 | Sylas | -0.08 | 0.00 | 0.08 |  |
| 114 | Briar | -0.10 | 0.00 | 0.10 |  |
| 115 | Rell | -0.11 | 0.00 | 0.11 |  |
| 116 | Zac | -0.12 | 0.51 | 0.63 | dash stop (Stretching Strikes) |
| 117 | Bel'Veth | -0.12 | 0.00 | 0.12 |  |
| 118 | Ambessa | -0.13 | 0.00 | 0.13 |  |
| 119 | Lee Sin | -0.13 | 0.00 | 0.13 |  |
| 120 | Riven | -0.13 | 0.00 | 0.13 |  |
| 121 | Quinn | -0.14 | 0.05 | 0.19 |  |
| 122 | Nasus | -0.15 | 0.24 | 0.39 |  |
| 123 | Irelia | -0.15 | 0.00 | 0.15 |  |
| 124 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 125 | Caitlyn | -0.16 | 0.12 | 0.28 |  |
| 126 | Aatrox | -0.16 | 0.00 | 0.16 |  |
| 127 | Nautilus | -0.16 | 0.00 | 0.16 |  |
| 128 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 129 | Singed | -0.18 | 0.21 | 0.39 |  |
| 130 | Diana | -0.18 | 0.00 | 0.18 |  |
| 131 | Kassadin | -0.18 | 0.00 | 0.18 |  |
| 132 | Sejuani | -0.18 | 0.00 | 0.18 |  |
| 133 | Leona | -0.19 | 0.00 | 0.19 |  |
| 134 | Locke | -0.19 | 0.00 | 0.19 |  |
| 135 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 136 | Rammus | -0.22 | 0.24 | 0.46 |  |
| 137 | Skarner | -0.23 | 0.13 | 0.36 |  |
| 138 | Miss Fortune | -0.23 | 0.05 | 0.28 |  |
| 139 | Jhin | -0.24 | 0.04 | 0.28 |  |
| 140 | Akali | -0.24 | 0.00 | 0.24 |  |
| 141 | Vel'Koz | -0.25 | 0.03 | 0.28 |  |
| 142 | Viego | -0.27 | 0.13 | 0.40 |  |
| 143 | Mordekaiser | -0.27 | 0.06 | 0.33 |  |
| 144 | Talon | -0.27 | 0.00 | 0.27 |  |
| 145 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 146 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 147 | Xerath | -0.29 | 0.03 | 0.32 |  |
| 148 | Twisted Fate | -0.30 | 0.05 | 0.35 |  |
| 149 | Galio | -0.30 | 0.00 | 0.30 |  |
| 150 | Qiyana | -0.30 | 0.00 | 0.30 |  |
| 151 | Ryze | -0.31 | 0.04 | 0.35 |  |
| 152 | Wukong | -0.31 | 0.00 | 0.31 |  |
| 153 | Darius | -0.33 | 0.00 | 0.33 |  |
| 154 | Trundle | -0.33 | 0.00 | 0.33 |  |
| 155 | Yorick | -0.33 | 0.00 | 0.33 |  |
| 156 | Shen | -0.34 | 0.24 | 0.58 |  |
| 157 | Janna | -0.34 | 0.06 | 0.40 |  |
| 158 | Gragas | -0.35 | 0.00 | 0.35 |  |
| 159 | Vi | -0.38 | 0.13 | 0.51 |  |
| 160 | Pyke | -0.38 | 0.00 | 0.38 |  |
| 161 | Blitzcrank | -0.39 | 0.00 | 0.39 |  |
| 162 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 163 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 164 | Rumble | -0.39 | 0.00 | 0.39 |  |
| 165 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 166 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 167 | Taliyah | -0.45 | 0.03 | 0.48 |  |
| 168 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 169 | Katarina | -0.47 | 0.00 | 0.47 |  |
| 170 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 171 | Nunu & Willump | -0.64 | 0.24 | 0.88 |  |
| 172 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
