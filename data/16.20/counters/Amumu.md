# Counters to Amumu (patch 26.20)

Every champion ranked by what its kit does against Amumu's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Amumu's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Amumu` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.47)

- **0.80** spell shield: Spell Shield's spell shield blocks Amumu's Curse of the Sad Mummy. Spell shield for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Amumu R Curse of the Sad Mummy)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Amumu's (500 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Sivir basic attacks → Amumu basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Amumu's Bandage Toss. Spell shield for 1.5 s, long enough to use ahead of Bandage Toss. A spell shield blocks only the first enemy ability that reaches it. Amumu is still able to dash even if Bandage Toss is blocked by spell shield. (Sivir E Spell Shield → Amumu Q Bandage Toss)

### 2. Morgana (net +1.44)

- **0.85** cc immunity: Black Shield makes Morgana immune to Amumu's Bandage Toss (stun). Immune for 5 s, long enough to use ahead of Bandage Toss. (Morgana E Black Shield → Amumu Q Bandage Toss)
- **0.80** cc immunity: Black Shield makes Morgana immune to Amumu's Curse of the Sad Mummy (knockdown, stun). Immune for 5 s, long enough to use ahead of Curse of the Sad Mummy. (Morgana E Black Shield → Amumu R Curse of the Sad Mummy)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Amumu's (450 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Morgana basic attacks → Amumu basic attacks)

### 3. Xayah (net +1.42)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. (Xayah R Featherstorm → Amumu R Curse of the Sad Mummy)
- **0.47** untargetable: Featherstorm makes Xayah untargetable, dodging Amumu's Bandage Toss. Untargetable for 1.5 s, long enough to use ahead of Bandage Toss. (Xayah R Featherstorm → Amumu Q Bandage Toss)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Amumu's (525 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Xayah basic attacks → Amumu basic attacks)

### 4. Maokai (net +1.40)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Amumu's Bandage Toss. Untargetable for 1.4 s; Bandage Toss takes 0.8 s to land, enough to react. (Maokai W Twisted Advance → Amumu Q Bandage Toss)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 1.4 s; Curse of the Sad Mummy takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Amumu R Curse of the Sad Mummy)

### 5. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Amumu's Bandage Toss (stun). Immune for 1.5 s, long enough to use ahead of Bandage Toss. (Udyr E Blazing Stampede → Amumu Q Bandage Toss)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Amumu's Curse of the Sad Mummy (knockdown, stun). Immune for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. (Udyr E Blazing Stampede → Amumu R Curse of the Sad Mummy)

### 6. Elise (net +1.39)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Amumu's Bandage Toss. Untargetable for 0.6 s; Bandage Toss takes 0.8 s to land, enough to react. (Elise E Rappel → Amumu Q Bandage Toss)
- **0.80** untargetable: Rappel makes Elise untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 0.6 s; Curse of the Sad Mummy takes 0.25 s to land, enough to react. (Elise E Rappel → Amumu R Curse of the Sad Mummy)
- **0.32** range: Elise's basic attacks reach 425 units farther than Amumu's (550 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Elise basic attacks → Amumu basic attacks)
- Watch out: Curse of the Sad Mummy's knockdown can stop Elise's Venomous Bite mid-dash.

### 7. Vladimir (net +1.36)

- **0.85** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Amumu's Bandage Toss. Untargetable for 2 s, long enough to use ahead of Bandage Toss. (Vladimir W Sanguine Pool → Amumu Q Bandage Toss)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2 s, long enough to use ahead of Curse of the Sad Mummy. (Vladimir W Sanguine Pool → Amumu R Curse of the Sad Mummy)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Amumu's (450 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Vladimir basic attacks → Amumu basic attacks)
- Watch out: Bandage Toss's stun interrupts Vladimir's Tides of Blood (charge-up).

### 8. Lissandra (net +1.33)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2.5 s, long enough to use ahead of Curse of the Sad Mummy. (Lissandra R Frozen Tomb → Amumu R Curse of the Sad Mummy)
- **0.49** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Amumu's Bandage Toss. Untargetable for 2.5 s, long enough to use ahead of Bandage Toss. (Lissandra R Frozen Tomb → Amumu Q Bandage Toss)
- **0.25** dash stop: Frozen Tomb's knockdown can stop Amumu's Bandage Toss mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Amumu Q Bandage Toss)

### 9. Yuumi (net +1.32)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Amumu's Bandage Toss. Untargetable for ?; Bandage Toss takes 0.8 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Amumu Q Bandage Toss)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for ?; Curse of the Sad Mummy takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Amumu R Curse of the Sad Mummy)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Amumu's (425 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Yuumi basic attacks → Amumu basic attacks)
- Watch out: Bandage Toss's stun interrupts Yuumi's Final Chapter (normal channel).

### 10. Bard (net +1.25)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2.5 s, long enough to use ahead of Curse of the Sad Mummy. (Bard R Tempered Fate → Amumu R Curse of the Sad Mummy)
- **0.49** untargetable: Tempered Fate makes Bard untargetable, dodging Amumu's Bandage Toss. Untargetable for 2.5 s, long enough to use ahead of Bandage Toss. (Bard R Tempered Fate → Amumu Q Bandage Toss)
- **0.36** range: Bard's basic attacks reach 375 units farther than Amumu's (500 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Bard basic attacks → Amumu basic attacks)
- Watch out: Curse of the Sad Mummy's knockdown can stop Bard's Magical Journey mid-dash.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.47 | 1.47 | 0.00 |  |
| 2 | Morgana | +1.44 | 1.44 | 0.00 |  |
| 3 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 4 | Maokai | +1.40 | 1.40 | 0.00 |  |
| 5 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 6 | Elise | +1.39 | 1.52 | 0.13 |  |
| 7 | Vladimir | +1.36 | 1.43 | 0.07 |  |
| 8 | Lissandra | +1.33 | 1.33 | 0.00 |  |
| 9 | Yuumi | +1.32 | 1.72 | 0.40 |  |
| 10 | Bard | +1.25 | 1.40 | 0.15 |  |
| 11 | Fiora | +1.24 | 1.41 | 0.17 |  |
| 12 | Milio | +1.21 | 1.21 | 0.00 |  |
| 13 | Aurora | +1.12 | 1.34 | 0.22 |  |
| 14 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 15 | Gangplank | +1.05 | 1.05 | 0.00 |  |
| 16 | Olaf | +1.05 | 1.05 | 0.00 |  |
| 17 | Shaco | +1.05 | 1.05 | 0.00 |  |
| 18 | Zed | +1.04 | 1.04 | 0.00 |  |
| 19 | Gwen | +1.01 | 1.20 | 0.19 |  |
| 20 | Master Yi | +1.00 | 1.20 | 0.20 |  |
| 21 | Kalista | +0.99 | 1.09 | 0.10 |  |
| 22 | Rengar | +0.97 | 1.12 | 0.15 |  |
| 23 | Mel | +0.95 | 0.95 | 0.00 | projectile block (Rebuttal) |
| 24 | Sion | +0.94 | 1.06 | 0.12 |  |
| 25 | Ekko | +0.89 | 1.07 | 0.18 |  |
| 26 | Kayle | +0.89 | 0.89 | 0.00 |  |
| 27 | Warwick | +0.88 | 1.16 | 0.28 |  |
| 28 | Rek'Sai | +0.87 | 1.06 | 0.19 |  |
| 29 | Evelynn | +0.87 | 1.05 | 0.18 |  |
| 30 | Zaahen | +0.87 | 1.05 | 0.18 |  |
| 31 | Kled | +0.86 | 1.13 | 0.27 |  |
| 32 | Samira | +0.84 | 1.03 | 0.19 | projectile block (Blade Whirl) |
| 33 | Braum | +0.82 | 1.00 | 0.18 | projectile block (Unbreakable) |
| 34 | Kindred | +0.81 | 0.95 | 0.14 |  |
| 35 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 36 | Jinx | +0.79 | 0.79 | 0.00 | dash stop (Flame Chompers!) |
| 37 | Malzahar | +0.76 | 1.16 | 0.40 |  |
| 38 | Vex | +0.75 | 0.75 | 0.00 | dash stop (Doom 'n Gloom) |
| 39 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 40 | Camille | +0.72 | 1.05 | 0.33 |  |
| 41 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 42 | Veigar | +0.70 | 0.70 | 0.00 | dash stop (Event Horizon) |
| 43 | Teemo | +0.69 | 0.69 | 0.00 |  |
| 44 | Alistar | +0.66 | 0.84 | 0.18 |  |
| 45 | Yasuo | +0.64 | 0.82 | 0.18 | projectile block (Wind Wall) |
| 46 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 47 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 48 | Taric | +0.48 | 0.48 | 0.00 |  |
| 49 | Kayn | +0.43 | 1.05 | 0.62 |  |
| 50 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 51 | Sona | +0.41 | 0.41 | 0.00 |  |
| 52 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 53 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 54 | Ahri | +0.37 | 0.72 | 0.35 | dash stop (Charm) |
| 55 | Garen | +0.37 | 0.37 | 0.00 |  |
| 56 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 57 | Draven | +0.36 | 0.36 | 0.00 |  |
| 58 | Pantheon | +0.33 | 0.60 | 0.27 |  |
| 59 | Xin Zhao | +0.33 | 0.52 | 0.19 |  |
| 60 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 61 | Senna | +0.32 | 0.32 | 0.00 |  |
| 62 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 63 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 64 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 65 | Zeri | +0.29 | 0.44 | 0.15 |  |
| 66 | Vayne | +0.29 | 0.43 | 0.14 |  |
| 67 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 68 | Lux | +0.29 | 0.29 | 0.00 |  |
| 69 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 70 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 71 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 72 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 73 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 74 | Poppy | +0.25 | 0.63 | 0.38 | dash stop (Steadfast Presence) |
| 75 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 76 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 77 | Malphite | +0.23 | 0.23 | 0.00 |  |
| 78 | Yunara | +0.22 | 0.36 | 0.14 |  |
| 79 | Annie | +0.22 | 0.22 | 0.00 |  |
| 80 | Brand | +0.22 | 0.22 | 0.00 |  |
| 81 | Karma | +0.22 | 0.22 | 0.00 |  |
| 82 | Nami | +0.22 | 0.22 | 0.00 |  |
| 83 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 84 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 85 | Tristana | +0.21 | 0.36 | 0.15 |  |
| 86 | Corki | +0.21 | 0.35 | 0.14 |  |
| 87 | Swain | +0.21 | 0.21 | 0.00 |  |
| 88 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 89 | Nilah | +0.19 | 0.38 | 0.19 |  |
| 90 | Jayce | +0.17 | 0.30 | 0.13 |  |
| 91 | Nidalee | +0.17 | 0.30 | 0.13 |  |
| 92 | Varus | +0.16 | 0.27 | 0.11 |  |
| 93 | Gnar | +0.12 | 0.33 | 0.21 |  |
| 94 | Jax | +0.11 | 0.28 | 0.17 |  |
| 95 | Kai'Sa | +0.09 | 0.38 | 0.29 |  |
| 96 | Yone | +0.09 | 0.30 | 0.21 |  |
| 97 | Twisted Fate | +0.08 | 0.43 | 0.35 |  |
| 98 | Azir | +0.08 | 0.27 | 0.19 |  |
| 99 | Ziggs | +0.07 | 0.27 | 0.20 |  |
| 100 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 101 | Sett | +0.05 | 0.05 | 0.00 |  |
| 102 | Shyvana | +0.05 | 0.05 | 0.00 |  |
| 103 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 104 | Rammus | +0.03 | 0.27 | 0.24 |  |
| 105 | LeBlanc | +0.03 | 0.22 | 0.19 |  |
| 106 | Quinn | +0.01 | 0.38 | 0.37 |  |
| 107 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 108 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 109 | Darius | 0.00 | 0.00 | 0.00 |  |
| 110 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 111 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 112 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 113 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 114 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 115 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 116 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 117 | Vel'Koz | -0.01 | 0.27 | 0.28 |  |
| 118 | Aurelion Sol | -0.01 | 0.22 | 0.23 |  |
| 119 | Lillia | -0.03 | 0.11 | 0.14 |  |
| 120 | Janna | -0.04 | 0.36 | 0.40 |  |
| 121 | Thresh | -0.04 | 0.19 | 0.23 |  |
| 122 | Caitlyn | -0.05 | 0.36 | 0.41 |  |
| 123 | Xerath | -0.05 | 0.27 | 0.32 |  |
| 124 | Hecarim | -0.05 | 0.05 | 0.10 |  |
| 125 | Illaoi | -0.05 | 0.05 | 0.10 |  |
| 126 | Urgot | -0.06 | 0.15 | 0.21 |  |
| 127 | Lucian | -0.07 | 0.36 | 0.43 |  |
| 128 | Volibear | -0.07 | 0.05 | 0.12 |  |
| 129 | Akshan | -0.08 | 0.34 | 0.42 |  |
| 130 | K'Sante | -0.08 | 0.10 | 0.18 |  |
| 131 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 132 | Graves | -0.10 | 0.24 | 0.34 |  |
| 133 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 134 | Irelia | -0.12 | 0.05 | 0.17 |  |
| 135 | Ivern | -0.15 | 0.19 | 0.34 |  |
| 136 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 137 | Zac | -0.16 | 0.50 | 0.66 | dash stop (Stretching Strikes) |
| 138 | Jarvan IV | -0.17 | 0.05 | 0.22 |  |
| 139 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 140 | Locke | -0.18 | 0.00 | 0.18 |  |
| 141 | Nautilus | -0.18 | 0.00 | 0.18 |  |
| 142 | Renekton | -0.18 | 0.00 | 0.18 |  |
| 143 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 144 | Diana | -0.19 | 0.00 | 0.19 |  |
| 145 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 146 | Rakan | -0.20 | 0.13 | 0.33 |  |
| 147 | Leona | -0.22 | 0.00 | 0.22 |  |
| 148 | Bel'Veth | -0.23 | 0.00 | 0.23 |  |
| 149 | Fiddlesticks | -0.24 | 0.20 | 0.44 |  |
| 150 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 151 | Briar | -0.27 | 0.00 | 0.27 |  |
| 152 | Fizz | -0.27 | 0.00 | 0.27 |  |
| 153 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 154 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 155 | Viego | -0.28 | 0.14 | 0.42 |  |
| 156 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 157 | Talon | -0.28 | 0.00 | 0.28 |  |
| 158 | Galio | -0.29 | 0.00 | 0.29 |  |
| 159 | Wukong | -0.29 | 0.00 | 0.29 |  |
| 160 | Rell | -0.29 | 0.00 | 0.29 |  |
| 161 | Riven | -0.33 | 0.00 | 0.33 |  |
| 162 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 163 | Pyke | -0.37 | 0.00 | 0.37 |  |
| 164 | Gragas | -0.39 | 0.00 | 0.39 |  |
| 165 | Shen | -0.41 | 0.27 | 0.68 |  |
| 166 | Akali | -0.43 | 0.00 | 0.43 |  |
| 167 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 168 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 169 | Vi | -0.52 | 0.05 | 0.57 |  |
| 170 | Ornn | -0.55 | 0.05 | 0.60 |  |
| 171 | Taliyah | -0.69 | 0.27 | 0.96 |  |
| 172 | Naafiri | -0.94 | 0.00 | 0.94 |  |
