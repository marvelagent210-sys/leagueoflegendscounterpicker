# Counters to Kayn (patch 26.20)

Every champion ranked by what its kit does against Kayn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayn` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.37)

- **0.45** interrupt: Fling's airborne interrupts Kayn's Umbral Trespass (movement channel). Fling must land during the channel. (Singed E Fling → Kayn R Umbral Trespass)
- **0.44** grounding: Mega Adhesive grounds Kayn, who then can't cast Umbral Trespass. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn R Umbral Trespass)
- **0.39** grounding: Mega Adhesive grounds Kayn, who then can't cast Reaping Slash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn Q Reaping Slash)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Singed's Fling.

### 2. Sivir (net +0.99)

- **0.49** spell shield: Spell Shield's spell shield blocks Kayn's Blade's Reach. Spell shield for 1.5 s, long enough to use ahead of Blade's Reach. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayn W Blade's Reach)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Kayn's Umbral Trespass. Spell shield for 1.5 s, long enough to use ahead of Umbral Trespass. A spell shield blocks only the first enemy ability that reaches it. If Umbral Trespass is targeted on an enemy with a spell shield or a Fiora with her Riposte active, the ability will fail to cast entirely, being placed on full cooldown without triggering the active's effects (as well as on-cast effects).
  - Spell shield will not block the damage from the recast. (Sivir E Spell Shield → Kayn R Umbral Trespass)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Sivir basic attacks → Kayn basic attacks)

### 3. Elise (net +0.92)

- **0.54** untargetable: Rappel makes Elise untargetable, dodging Kayn's Umbral Trespass. Untargetable for 0.6 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Kayn R Umbral Trespass)
- **0.49** untargetable: Rappel makes Elise untargetable, dodging Kayn's Blade's Reach. Untargetable for 0.6 s; Blade's Reach takes 0.55 s to land, enough to react. (Elise E Rappel → Kayn W Blade's Reach)
- **0.45** interrupt: Cocoon's stun interrupts Kayn's Umbral Trespass (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Elise's Cocoon.

### 4. Kayle (net +0.77)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Umbral Trespass (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Umbral Trespass. (Kayle R Divine Judgment → Kayn R Umbral Trespass)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Kayn's (625 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Kayle basic attacks → Kayn basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Blade's Reach (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Blade's Reach. (Kayle R Divine Judgment → Kayn W Blade's Reach)

### 5. Vladimir (net +0.75)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kayn's Umbral Trespass. Untargetable for 2 s, long enough to use ahead of Umbral Trespass. (Vladimir W Sanguine Pool → Kayn R Umbral Trespass)
- **0.52** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kayn's Blade's Reach. Untargetable for 2 s, long enough to use ahead of Blade's Reach. (Vladimir W Sanguine Pool → Kayn W Blade's Reach)
- **0.10** range: Vladimir's basic attacks reach 275 units farther than Kayn's (450 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Vladimir basic attacks → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Vladimir's Hemoplague.

### 6. Xayah (net +0.74)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Kayn's Umbral Trespass. Untargetable for 1.5 s, long enough to use ahead of Umbral Trespass. (Xayah R Featherstorm → Kayn R Umbral Trespass)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Kayn's Blade's Reach. Untargetable for 1.5 s, long enough to use ahead of Blade's Reach. (Xayah R Featherstorm → Kayn W Blade's Reach)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Kayn's (525 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Xayah basic attacks → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Xayah's Featherstorm.

### 7. Fiora (net +0.68)

- **0.62** parry: Riposte parries Kayn's Blade's Reach and stuns back. Parry for 0.75 s; Blade's Reach takes 0.55 s to land, enough to react. Negating Blade's Reach's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kayn W Blade's Reach)
- **0.54** parry: Riposte parries Kayn's Umbral Trespass. Parry for 0.75 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Kayn R Umbral Trespass)
- **0.06** attack speed slow: Riposte cuts Kayn's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Fiora's Riposte.

### 8. Taric (net +0.68)

- **0.45** interrupt: Dazzle's stun interrupts Kayn's Umbral Trespass (movement channel). Dazzle must land during the channel. (Taric E Dazzle → Kayn R Umbral Trespass)
- **0.36** invulnerable: Cosmic Radiance makes Taric invulnerable to Kayn's Umbral Trespass (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Umbral Trespass. (Taric R Cosmic Radiance → Kayn R Umbral Trespass)
- **0.16** invulnerable: Cosmic Radiance makes Taric invulnerable to Kayn's Blade's Reach (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Blade's Reach. (Taric R Cosmic Radiance → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Taric's Dazzle.

### 9. Shaco (net +0.64)

- **0.54** untargetable: Hallucinate makes Shaco untargetable, dodging Kayn's Umbral Trespass. Untargetable for 0.5 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Shaco R Hallucinate → Kayn R Umbral Trespass)
- **0.45** interrupt: Jack in the Box's fear interrupts Kayn's Umbral Trespass (movement channel). Jack in the Box must land during the channel. (Shaco W Jack in the Box → Kayn R Umbral Trespass)
- **0.33** untargetable: Hallucinate makes Shaco untargetable, dodging Kayn's Blade's Reach. Untargetable for 0.5 s; Blade's Reach takes 0.55 s to land, enough to react. (Shaco R Hallucinate → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Shaco's Jack in the Box.

### 10. Udyr (net +0.58)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Kayn's Blade's Reach (airborne, slow). Immune for 1.5 s, long enough to use ahead of Blade's Reach. (Udyr E Blazing Stampede → Kayn W Blade's Reach)
- **0.45** interrupt: Blazing Stampede's stun interrupts Kayn's Umbral Trespass (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Udyr's Blazing Stampede.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.37 | 1.80 | 0.43 | grounding (Mega Adhesive) |
| 2 | Sivir | +0.99 | 0.99 | 0.00 |  |
| 3 | Elise | +0.92 | 1.44 | 0.52 |  |
| 4 | Kayle | +0.77 | 0.77 | 0.00 |  |
| 5 | Vladimir | +0.75 | 1.26 | 0.51 |  |
| 6 | Xayah | +0.74 | 1.17 | 0.43 |  |
| 7 | Fiora | +0.68 | 0.91 | 0.23 |  |
| 8 | Taric | +0.68 | 0.89 | 0.21 |  |
| 9 | Shaco | +0.64 | 1.16 | 0.52 |  |
| 10 | Udyr | +0.58 | 0.93 | 0.35 |  |
| 11 | Bard | +0.52 | 1.42 | 0.90 |  |
| 12 | Rek'Sai | +0.48 | 1.53 | 1.05 |  |
| 13 | Lissandra | +0.47 | 1.37 | 0.90 |  |
| 14 | Milio | +0.43 | 0.76 | 0.33 |  |
| 15 | Master Yi | +0.41 | 0.90 | 0.49 |  |
| 16 | Kindred | +0.36 | 0.57 | 0.21 |  |
| 17 | Nocturne | +0.35 | 1.35 | 1.00 |  |
| 18 | Aurora | +0.34 | 0.84 | 0.50 |  |
| 19 | Vayne | +0.31 | 0.72 | 0.41 |  |
| 20 | Zoe | +0.30 | 0.65 | 0.35 |  |
| 21 | Camille | +0.29 | 1.13 | 0.84 |  |
| 22 | Maokai | +0.26 | 1.38 | 1.12 |  |
| 23 | Lulu | +0.26 | 0.89 | 0.63 |  |
| 24 | Zilean | +0.26 | 0.65 | 0.39 |  |
| 25 | Soraka | +0.26 | 0.62 | 0.36 |  |
| 26 | Cassiopeia | +0.24 | 1.21 | 0.97 | grounding (Miasma) |
| 27 | Gwen | +0.24 | 0.79 | 0.55 |  |
| 28 | Yorick | +0.24 | 0.45 | 0.21 |  |
| 29 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 30 | Jayce | +0.22 | 0.63 | 0.41 |  |
| 31 | Corki | +0.20 | 0.68 | 0.48 |  |
| 32 | Yuumi | +0.19 | 1.15 | 0.96 |  |
| 33 | Twisted Fate | +0.16 | 0.70 | 0.54 |  |
| 34 | Quinn | +0.16 | 0.67 | 0.51 |  |
| 35 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 36 | Sion | +0.14 | 0.79 | 0.65 |  |
| 37 | Heimerdinger | +0.13 | 0.64 | 0.51 |  |
| 38 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 39 | Viktor | +0.11 | 0.89 | 0.78 |  |
| 40 | Vex | +0.11 | 0.81 | 0.70 |  |
| 41 | Alistar | +0.11 | 0.71 | 0.60 |  |
| 42 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 43 | Zed | +0.10 | 0.64 | 0.54 |  |
| 44 | Veigar | +0.08 | 0.73 | 0.65 |  |
| 45 | Malzahar | +0.07 | 1.10 | 1.03 |  |
| 46 | Teemo | +0.06 | 0.50 | 0.44 |  |
| 47 | Kalista | +0.04 | 0.68 | 0.64 |  |
| 48 | Aatrox | +0.03 | 0.45 | 0.42 |  |
| 49 | Nasus | +0.02 | 0.24 | 0.22 |  |
| 50 | Nidalee | +0.02 | 0.18 | 0.16 |  |
| 51 | Ashe | +0.01 | 0.69 | 0.68 |  |
| 52 | Shyvana | +0.01 | 0.49 | 0.48 |  |
| 53 | Anivia | 0.00 | 0.61 | 0.61 |  |
| 54 | Rengar | 0.00 | 0.53 | 0.53 |  |
| 55 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 56 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 57 | Nilah | -0.01 | 0.67 | 0.68 |  |
| 58 | Gnar | -0.02 | 0.64 | 0.66 |  |
| 59 | Evelynn | -0.05 | 1.16 | 1.21 |  |
| 60 | Kennen | -0.05 | 0.63 | 0.68 |  |
| 61 | Jinx | -0.06 | 0.45 | 0.51 |  |
| 62 | Kassadin | -0.07 | 0.45 | 0.52 |  |
| 63 | Garen | -0.08 | 0.57 | 0.65 |  |
| 64 | Riven | -0.08 | 0.45 | 0.53 |  |
| 65 | Hwei | -0.09 | 0.73 | 0.82 |  |
| 66 | Morgana | -0.09 | 0.63 | 0.72 |  |
| 67 | Warwick | -0.10 | 0.94 | 1.04 |  |
| 68 | Ekko | -0.10 | 0.72 | 0.82 |  |
| 69 | Ziggs | -0.10 | 0.62 | 0.72 |  |
| 70 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 71 | Xin Zhao | -0.11 | 0.93 | 1.04 |  |
| 72 | Blitzcrank | -0.11 | 0.45 | 0.56 |  |
| 73 | Bel'Veth | -0.12 | 0.45 | 0.57 |  |
| 74 | Varus | -0.13 | 0.66 | 0.79 |  |
| 75 | Sona | -0.14 | 0.66 | 0.80 |  |
| 76 | Katarina | -0.14 | 0.48 | 0.62 |  |
| 77 | Sylas | -0.14 | 0.45 | 0.59 |  |
| 78 | Ahri | -0.15 | 0.72 | 0.87 |  |
| 79 | Annie | -0.16 | 0.60 | 0.76 |  |
| 80 | Vel'Koz | -0.17 | 0.61 | 0.78 |  |
| 81 | Brand | -0.17 | 0.59 | 0.76 |  |
| 82 | Samira | -0.18 | 0.18 | 0.36 |  |
| 83 | Pantheon | -0.19 | 0.57 | 0.76 |  |
| 84 | Mordekaiser | -0.20 | 0.51 | 0.71 |  |
| 85 | Renekton | -0.20 | 0.45 | 0.65 |  |
| 86 | Yasuo | -0.20 | 0.45 | 0.65 |  |
| 87 | Jax | -0.21 | 0.57 | 0.78 |  |
| 88 | Swain | -0.21 | 0.57 | 0.78 |  |
| 89 | Gangplank | -0.21 | 0.44 | 0.65 |  |
| 90 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 91 | Poppy | -0.22 | 0.97 | 1.19 | dash stop (Steadfast Presence) |
| 92 | Xerath | -0.22 | 0.61 | 0.83 |  |
| 93 | Wukong | -0.22 | 0.42 | 0.64 |  |
| 94 | Cho'Gath | -0.23 | 0.45 | 0.68 |  |
| 95 | Lee Sin | -0.23 | 0.45 | 0.68 |  |
| 96 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 97 | Shen | -0.24 | 0.69 | 0.93 |  |
| 98 | Sett | -0.25 | 0.52 | 0.77 |  |
| 99 | Thresh | -0.27 | 0.56 | 0.83 |  |
| 100 | Tristana | -0.28 | 0.64 | 0.92 |  |
| 101 | Darius | -0.28 | 0.45 | 0.73 |  |
| 102 | Trundle | -0.28 | 0.45 | 0.73 |  |
| 103 | Renata Glasc | -0.29 | 0.69 | 0.98 |  |
| 104 | Orianna | -0.30 | 0.61 | 0.91 |  |
| 105 | Karma | -0.31 | 0.13 | 0.44 |  |
| 106 | Azir | -0.32 | 0.58 | 0.90 |  |
| 107 | Zaahen | -0.34 | 0.78 | 1.12 |  |
| 108 | Kled | -0.35 | 0.81 | 1.16 |  |
| 109 | Seraphine | -0.35 | 0.62 | 0.97 |  |
| 110 | Braum | -0.35 | 0.45 | 0.80 |  |
| 111 | Ezreal | -0.35 | 0.20 | 0.55 |  |
| 112 | Skarner | -0.36 | 0.51 | 0.87 |  |
| 113 | Irelia | -0.36 | 0.45 | 0.81 |  |
| 114 | Lillia | -0.37 | 0.43 | 0.80 |  |
| 115 | Lux | -0.38 | 0.18 | 0.56 |  |
| 116 | Zyra | -0.39 | 0.58 | 0.97 |  |
| 117 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 118 | Nami | -0.42 | 0.59 | 1.01 |  |
| 119 | Amumu | -0.43 | 0.62 | 1.05 |  |
| 120 | Neeko | -0.43 | 0.56 | 0.99 |  |
| 121 | Urgot | -0.43 | 0.53 | 0.96 |  |
| 122 | Janna | -0.44 | 0.67 | 1.11 |  |
| 123 | Illaoi | -0.44 | 0.07 | 0.51 |  |
| 124 | Fizz | -0.46 | 0.45 | 0.91 |  |
| 125 | Graves | -0.46 | 0.14 | 0.60 |  |
| 126 | Diana | -0.47 | 0.45 | 0.92 |  |
| 127 | Draven | -0.49 | 0.67 | 1.16 |  |
| 128 | Leona | -0.50 | 0.45 | 0.95 |  |
| 129 | Ivern | -0.50 | 0.11 | 0.61 |  |
| 130 | Malphite | -0.51 | 0.60 | 1.11 |  |
| 131 | Yone | -0.52 | 0.70 | 1.22 |  |
| 132 | Miss Fortune | -0.53 | 0.20 | 0.73 |  |
| 133 | Nautilus | -0.54 | 0.45 | 0.99 |  |
| 134 | Talon | -0.54 | 0.00 | 0.54 |  |
| 135 | Mel | -0.55 | 0.17 | 0.72 |  |
| 136 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 137 | Fiddlesticks | -0.56 | 0.56 | 1.12 |  |
| 138 | Nunu & Willump | -0.56 | 0.55 | 1.11 |  |
| 139 | Rakan | -0.56 | 0.48 | 1.04 |  |
| 140 | Hecarim | -0.56 | 0.44 | 1.00 |  |
| 141 | Volibear | -0.58 | 0.52 | 1.10 |  |
| 142 | Senna | -0.58 | 0.22 | 0.80 |  |
| 143 | Aurelion Sol | -0.60 | 0.54 | 1.14 |  |
| 144 | Ambessa | -0.60 | 0.40 | 1.00 |  |
| 145 | Syndra | -0.61 | 0.59 | 1.20 |  |
| 146 | Galio | -0.61 | 0.45 | 1.06 |  |
| 147 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 148 | Aphelios | -0.66 | 0.31 | 0.97 |  |
| 149 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 150 | Sejuani | -0.68 | 0.45 | 1.13 |  |
| 151 | Rammus | -0.71 | 0.69 | 1.40 |  |
| 152 | Gragas | -0.71 | 0.45 | 1.16 |  |
| 153 | Rell | -0.72 | 0.45 | 1.17 |  |
| 154 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 155 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 156 | Jarvan IV | -0.73 | 0.45 | 1.18 |  |
| 157 | Qiyana | -0.73 | 0.36 | 1.09 |  |
| 158 | K'Sante | -0.74 | 0.59 | 1.33 |  |
| 159 | Smolder | -0.74 | 0.20 | 0.94 |  |
| 160 | Ornn | -0.76 | 0.52 | 1.28 |  |
| 161 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 162 | Briar | -0.77 | 0.45 | 1.22 |  |
| 163 | Akali | -0.83 | 0.00 | 0.83 |  |
| 164 | Zac | -0.86 | 0.76 | 1.62 |  |
| 165 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 166 | Locke | -0.99 | 0.00 | 0.99 |  |
| 167 | Viego | -1.00 | 0.49 | 1.49 |  |
| 168 | Vi | -1.02 | 0.52 | 1.54 |  |
| 169 | Taliyah | -1.08 | 0.61 | 1.69 |  |
| 170 | Tahm Kench | -1.12 | 0.45 | 1.57 |  |
| 171 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 172 | Pyke | -1.51 | 0.45 | 1.96 |  |
