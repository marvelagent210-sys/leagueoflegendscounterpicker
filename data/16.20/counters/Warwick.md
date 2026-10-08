# Counters to Warwick (patch 26.20)

Every champion ranked by what its kit does against Warwick's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Warwick's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Warwick` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.39)

- **0.49** grounding: Mega Adhesive grounds Warwick, who then can't cast Infinite Duress. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Warwick R Infinite Duress)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Warwick's healing from Infinite Duress by 40%. (Singed R Insanity Potion → Warwick R Infinite Duress)
- **0.34** interrupt: Fling's airborne interrupts Warwick's Jaws of the Beast (movement channel). Fling must land during the channel. (Singed E Fling → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Singed's Fling (airborne, root).

### 2. Vladimir (net +1.39)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Infinite Duress. Untargetable for 2 s, long enough to use ahead of Infinite Duress. (Vladimir W Sanguine Pool → Warwick R Infinite Duress)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Primal Howl. Untargetable for 2 s, long enough to use ahead of Primal Howl. (Vladimir W Sanguine Pool → Warwick E Primal Howl)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Jaws of the Beast. Untargetable for 2 s, long enough to use ahead of Jaws of the Beast. (Vladimir W Sanguine Pool → Warwick Q Jaws of the Beast)
- Watch out: Primal Howl's fear interrupts Vladimir's Tides of Blood (charge-up).

### 3. Sivir (net +1.22)

- **0.54** spell shield: Spell Shield's spell shield blocks Warwick's Primal Howl. Spell shield for 1.5 s, long enough to use ahead of Primal Howl. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Warwick E Primal Howl)
- **0.50** spell shield: Spell Shield's spell shield blocks part of Warwick's Infinite Duress. Spell shield for 1.5 s, long enough to use ahead of Infinite Duress. A spell shield blocks only the first enemy ability that reaches it. If the target is crowd control immune or protected by spell shield upon collision, Warwick will not start the channel.
  - Spell shield will not prevent the effects of Infinite Duress if Warwick is already channeling. (Sivir E Spell Shield → Warwick R Infinite Duress)
- **0.48** spell shield: Spell Shield's spell shield blocks Warwick's Jaws of the Beast. Spell shield for 1.5 s, long enough to use ahead of Jaws of the Beast. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Warwick Q Jaws of the Beast)

### 4. Jax (net +1.17)

- **1.00** attack dodge: Counter Strike dodges Warwick's Infinite Duress, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Warwick R Infinite Duress)
- **0.64** attack dodge: Counter Strike dodges Warwick's Jaws of the Beast, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Warwick Q Jaws of the Beast)
- **0.38** attack dodge: Counter Strike dodges Warwick's basic attacks. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Warwick basic attacks)
- Watch out: Infinite Duress makes Warwick immune to Jax's Counter Strike (stun).

### 5. Udyr (net +1.16)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Warwick's Infinite Duress (knockdown, suppression). Immune for 1.5 s, long enough to use ahead of Infinite Duress. (Udyr E Blazing Stampede → Warwick R Infinite Duress)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Warwick's Primal Howl (fear, slow). Immune for 1.5 s, long enough to use ahead of Primal Howl. (Udyr E Blazing Stampede → Warwick E Primal Howl)
- **0.40** interrupt: Blazing Stampede's stun interrupts Warwick's Jaws of the Beast (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Udyr's Blazing Stampede (stun).

### 6. Xayah (net +1.14)

- **0.82** untargetable: Featherstorm makes Xayah untargetable, dodging Warwick's Infinite Duress. Untargetable for 1.5 s, long enough to use ahead of Infinite Duress. (Xayah R Featherstorm → Warwick R Infinite Duress)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Warwick's Jaws of the Beast. Untargetable for 1.5 s, long enough to use ahead of Jaws of the Beast. (Xayah R Featherstorm → Warwick Q Jaws of the Beast)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Warwick's Primal Howl. Untargetable for 1.5 s, long enough to use ahead of Primal Howl. (Xayah R Featherstorm → Warwick E Primal Howl)
- Watch out: Infinite Duress makes Warwick immune to Xayah's Bladecaller (root).

### 7. Rek'Sai (net +1.13)

- **0.93** untargetable: Void Rush makes Rek'Sai untargetable, dodging Warwick's Infinite Duress. Untargetable for 1.5 s, long enough to use ahead of Infinite Duress. (Rek'Sai R Void Rush → Warwick R Infinite Duress)
- **0.40** interrupt: Unburrow's airborne interrupts Warwick's Jaws of the Beast (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Warwick Q Jaws of the Beast)
- **0.36** untargetable: Void Rush makes Rek'Sai untargetable, dodging Warwick's Jaws of the Beast. Untargetable for 1.5 s, long enough to use ahead of Jaws of the Beast. (Rek'Sai R Void Rush → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress's knockdown can stop Rek'Sai's Tunnel mid-dash.

### 8. Nocturne (net +1.08)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Warwick's Primal Howl. Spell shield for 1.5 s, long enough to use ahead of Primal Howl. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick E Primal Howl)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Warwick's Jaws of the Beast. Spell shield for 1.5 s, long enough to use ahead of Jaws of the Beast. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick Q Jaws of the Beast)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks part of Warwick's Infinite Duress. Spell shield for 1.5 s, long enough to use ahead of Infinite Duress. A spell shield blocks only the first enemy ability that reaches it. If the target is crowd control immune or protected by spell shield upon collision, Warwick will not start the channel.
  - Spell shield will not prevent the effects of Infinite Duress if Warwick is already channeling. (Nocturne W Shroud of Darkness → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Nocturne's Paranoia (nearsight).

### 9. Olaf (net +1.05)

- **0.93** cc immunity: Ragnarok makes Olaf immune to Warwick's Infinite Duress (knockdown, suppression). Immune for 3 s, long enough to use ahead of Infinite Duress. (Olaf R Ragnarok → Warwick R Infinite Duress)
- **0.34** cc immunity: Ragnarok makes Olaf immune to Warwick's Primal Howl (fear, slow). Immune for 3 s, long enough to use ahead of Primal Howl. (Olaf R Ragnarok → Warwick E Primal Howl)
- Watch out: Infinite Duress makes Warwick immune to Olaf's Undertow (slow).

### 10. Elise (net +0.94)

- **0.60** untargetable: Rappel makes Elise untargetable, dodging Warwick's Infinite Duress. Untargetable for 0.6 s; Infinite Duress lands within 0.1 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Warwick R Infinite Duress)
- **0.32** untargetable: Rappel makes Elise untargetable, dodging Warwick's Primal Howl. Untargetable for 0.6 s; Primal Howl lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Warwick E Primal Howl)
- **0.30** interrupt: Cocoon's stun interrupts Warwick's Jaws of the Beast (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Elise's Cocoon (stun).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.39 | 1.86 | 0.47 | grounding (Mega Adhesive) |
| 2 | Vladimir | +1.39 | 1.53 | 0.14 |  |
| 3 | Sivir | +1.22 | 1.22 | 0.00 |  |
| 4 | Jax | +1.17 | 1.46 | 0.29 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 5 | Udyr | +1.16 | 1.45 | 0.29 |  |
| 6 | Xayah | +1.14 | 1.34 | 0.20 |  |
| 7 | Rek'Sai | +1.13 | 1.60 | 0.47 |  |
| 8 | Nocturne | +1.08 | 1.42 | 0.34 |  |
| 9 | Olaf | +1.05 | 1.10 | 0.05 |  |
| 10 | Elise | +0.94 | 1.35 | 0.41 |  |
| 11 | Nilah | +0.91 | 1.57 | 0.66 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 12 | Milio | +0.90 | 1.31 | 0.41 |  |
| 13 | Gangplank | +0.88 | 1.05 | 0.17 |  |
| 14 | Kayle | +0.83 | 0.88 | 0.05 |  |
| 15 | Sion | +0.79 | 1.58 | 0.79 |  |
| 16 | Master Yi | +0.74 | 0.95 | 0.21 |  |
| 17 | Morgana | +0.70 | 1.42 | 0.72 |  |
| 18 | Fiora | +0.68 | 1.01 | 0.33 |  |
| 19 | Shen | +0.63 | 1.70 | 1.07 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 20 | Rengar | +0.62 | 1.08 | 0.46 |  |
| 21 | Taric | +0.62 | 0.83 | 0.21 |  |
| 22 | Zed | +0.61 | 0.65 | 0.04 |  |
| 23 | Yuumi | +0.59 | 1.16 | 0.57 |  |
| 24 | Gwen | +0.56 | 0.83 | 0.27 |  |
| 25 | Evelynn | +0.54 | 1.01 | 0.47 |  |
| 26 | Aurora | +0.54 | 0.84 | 0.30 |  |
| 27 | Teemo | +0.51 | 0.69 | 0.18 | blind (Blinding Dart) |
| 28 | Garen | +0.51 | 0.59 | 0.08 |  |
| 29 | Shaco | +0.50 | 0.98 | 0.48 |  |
| 30 | Kindred | +0.47 | 0.64 | 0.17 |  |
| 31 | Ekko | +0.44 | 0.77 | 0.33 |  |
| 32 | Bard | +0.43 | 1.46 | 1.03 |  |
| 33 | Alistar | +0.43 | 1.18 | 0.75 |  |
| 34 | Lissandra | +0.40 | 1.37 | 0.97 |  |
| 35 | Zaahen | +0.39 | 1.06 | 0.67 |  |
| 36 | Katarina | +0.34 | 0.62 | 0.28 |  |
| 37 | Nasus | +0.30 | 0.36 | 0.06 |  |
| 38 | Pantheon | +0.29 | 0.74 | 0.45 |  |
| 39 | Malzahar | +0.23 | 1.22 | 0.99 |  |
| 40 | Kennen | +0.22 | 0.49 | 0.27 |  |
| 41 | Kassadin | +0.22 | 0.37 | 0.15 |  |
| 42 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 43 | Zilean | +0.21 | 0.56 | 0.35 |  |
| 44 | Annie | +0.18 | 0.45 | 0.27 |  |
| 45 | Kalista | +0.16 | 0.99 | 0.83 |  |
| 46 | Brand | +0.16 | 0.55 | 0.39 |  |
| 47 | Twisted Fate | +0.15 | 0.69 | 0.54 |  |
| 48 | Twitch | +0.15 | 0.29 | 0.14 |  |
| 49 | Vex | +0.13 | 0.49 | 0.36 |  |
| 50 | Kog'Maw | +0.12 | 0.18 | 0.06 |  |
| 51 | Lulu | +0.11 | 0.76 | 0.65 |  |
| 52 | Mordekaiser | +0.11 | 0.65 | 0.54 |  |
| 53 | Maokai | +0.10 | 1.30 | 1.20 |  |
| 54 | Kayn | +0.10 | 1.04 | 0.94 |  |
| 55 | Draven | +0.10 | 0.52 | 0.42 |  |
| 56 | Zeri | +0.09 | 0.29 | 0.20 |  |
| 57 | Yunara | +0.06 | 0.24 | 0.18 |  |
| 58 | Nidalee | +0.06 | 0.20 | 0.14 |  |
| 59 | Zoe | +0.05 | 0.48 | 0.43 |  |
| 60 | Smolder | +0.05 | 0.22 | 0.17 |  |
| 61 | Vayne | +0.04 | 0.57 | 0.53 |  |
| 62 | Corki | +0.04 | 0.53 | 0.49 |  |
| 63 | Renekton | +0.04 | 0.34 | 0.30 |  |
| 64 | Cassiopeia | +0.02 | 0.90 | 0.88 | grounding (Miasma) |
| 65 | Soraka | +0.02 | 0.43 | 0.41 |  |
| 66 | Veigar | +0.02 | 0.42 | 0.40 |  |
| 67 | Jayce | +0.01 | 0.50 | 0.49 |  |
| 68 | Quinn | -0.02 | 0.60 | 0.62 |  |
| 69 | Swain | -0.02 | 0.44 | 0.46 |  |
| 70 | Heimerdinger | -0.03 | 0.49 | 0.52 |  |
| 71 | Syndra | -0.05 | 0.41 | 0.46 |  |
| 72 | Varus | -0.06 | 0.80 | 0.86 |  |
| 73 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 74 | Cho'Gath | -0.07 | 0.40 | 0.47 |  |
| 75 | Illaoi | -0.07 | 0.06 | 0.13 |  |
| 76 | Volibear | -0.08 | 0.36 | 0.44 |  |
| 77 | Jinx | -0.08 | 0.19 | 0.27 |  |
| 78 | Camille | -0.10 | 0.98 | 1.08 |  |
| 79 | Yorick | -0.10 | 0.28 | 0.38 |  |
| 80 | Miss Fortune | -0.12 | 0.22 | 0.34 |  |
| 81 | Ahri | -0.13 | 0.43 | 0.56 |  |
| 82 | Irelia | -0.14 | 0.33 | 0.47 |  |
| 83 | Xin Zhao | -0.15 | 0.99 | 1.14 |  |
| 84 | Kai'Sa | -0.15 | 0.26 | 0.41 |  |
| 85 | Mel | -0.15 | 0.18 | 0.33 |  |
| 86 | Anivia | -0.16 | 0.53 | 0.69 |  |
| 87 | Viktor | -0.17 | 0.40 | 0.57 |  |
| 88 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 89 | Lux | -0.18 | 0.19 | 0.37 |  |
| 90 | LeBlanc | -0.18 | 0.15 | 0.33 |  |
| 91 | Bel'Veth | -0.19 | 0.34 | 0.53 |  |
| 92 | Shyvana | -0.19 | 0.33 | 0.52 |  |
| 93 | Trundle | -0.20 | 0.26 | 0.46 |  |
| 94 | Lucian | -0.20 | 0.24 | 0.44 |  |
| 95 | Senna | -0.20 | 0.22 | 0.42 |  |
| 96 | Hwei | -0.21 | 0.45 | 0.66 |  |
| 97 | Samira | -0.21 | 0.20 | 0.41 |  |
| 98 | Karthus | -0.21 | 0.13 | 0.34 |  |
| 99 | Darius | -0.22 | 0.25 | 0.47 |  |
| 100 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 101 | Xerath | -0.23 | 0.47 | 0.70 |  |
| 102 | Aatrox | -0.25 | 0.40 | 0.65 |  |
| 103 | Graves | -0.25 | 0.16 | 0.41 |  |
| 104 | Vel'Koz | -0.26 | 0.48 | 0.74 |  |
| 105 | Ziggs | -0.26 | 0.46 | 0.72 |  |
| 106 | Locke | -0.27 | 0.00 | 0.27 |  |
| 107 | Akshan | -0.28 | 0.22 | 0.50 |  |
| 108 | Blitzcrank | -0.30 | 0.40 | 0.70 |  |
| 109 | Kha'Zix | -0.31 | 0.00 | 0.31 |  |
| 110 | Karma | -0.32 | 0.15 | 0.47 |  |
| 111 | Talon | -0.32 | 0.00 | 0.32 |  |
| 112 | Ashe | -0.33 | 0.42 | 0.75 |  |
| 113 | Fiddlesticks | -0.34 | 0.53 | 0.87 |  |
| 114 | Thresh | -0.35 | 0.43 | 0.78 |  |
| 115 | Sona | -0.36 | 0.44 | 0.80 |  |
| 116 | Gnar | -0.40 | 0.43 | 0.83 |  |
| 117 | Kled | -0.45 | 1.02 | 1.47 |  |
| 118 | Caitlyn | -0.47 | 0.24 | 0.71 |  |
| 119 | Sett | -0.48 | 0.36 | 0.84 |  |
| 120 | Sylas | -0.48 | 0.30 | 0.78 |  |
| 121 | Yasuo | -0.49 | 0.40 | 0.89 |  |
| 122 | Pyke | -0.49 | 0.29 | 0.78 |  |
| 123 | Riven | -0.49 | 0.27 | 0.76 |  |
| 124 | Seraphine | -0.50 | 0.48 | 0.98 |  |
| 125 | Ryze | -0.52 | 0.16 | 0.68 |  |
| 126 | Ivern | -0.53 | 0.13 | 0.66 |  |
| 127 | Orianna | -0.54 | 0.36 | 0.90 |  |
| 128 | Jhin | -0.54 | 0.18 | 0.72 |  |
| 129 | Akali | -0.54 | 0.00 | 0.54 |  |
| 130 | Renata Glasc | -0.56 | 0.51 | 1.07 |  |
| 131 | Tristana | -0.57 | 0.41 | 0.98 |  |
| 132 | Aurelion Sol | -0.57 | 0.32 | 0.89 |  |
| 133 | Skarner | -0.63 | 0.27 | 0.90 |  |
| 134 | Leona | -0.64 | 0.40 | 1.04 |  |
| 135 | Wukong | -0.64 | 0.18 | 0.82 |  |
| 136 | Aphelios | -0.65 | 0.33 | 0.98 |  |
| 137 | Nami | -0.66 | 0.49 | 1.15 |  |
| 138 | Azir | -0.70 | 0.36 | 1.06 |  |
| 139 | Lillia | -0.73 | 0.24 | 0.97 |  |
| 140 | Nunu & Willump | -0.75 | 0.36 | 1.11 |  |
| 141 | Neeko | -0.75 | 0.33 | 1.08 |  |
| 142 | Braum | -0.77 | 0.30 | 1.07 |  |
| 143 | Lee Sin | -0.77 | 0.18 | 0.95 |  |
| 144 | Malphite | -0.79 | 0.44 | 1.23 |  |
| 145 | Janna | -0.80 | 0.50 | 1.30 |  |
| 146 | Zyra | -0.80 | 0.34 | 1.14 |  |
| 147 | Urgot | -0.81 | 0.36 | 1.17 |  |
| 148 | Diana | -0.81 | 0.18 | 0.99 |  |
| 149 | Fizz | -0.85 | 0.18 | 1.03 |  |
| 150 | Rammus | -0.86 | 0.64 | 1.50 |  |
| 151 | Hecarim | -0.86 | 0.20 | 1.06 |  |
| 152 | Amumu | -0.88 | 0.28 | 1.16 |  |
| 153 | Ambessa | -0.92 | 0.17 | 1.09 |  |
| 154 | Qiyana | -0.96 | 0.17 | 1.13 |  |
| 155 | K'Sante | -1.00 | 0.52 | 1.52 |  |
| 156 | Sejuani | -1.01 | 0.40 | 1.41 |  |
| 157 | Galio | -1.01 | 0.37 | 1.38 |  |
| 158 | Nautilus | -1.03 | 0.18 | 1.21 |  |
| 159 | Yone | -1.06 | 0.46 | 1.52 |  |
| 160 | Naafiri | -1.06 | 0.00 | 1.06 |  |
| 161 | Rakan | -1.07 | 0.26 | 1.33 |  |
| 162 | Rell | -1.12 | 0.30 | 1.42 |  |
| 163 | Ornn | -1.13 | 0.43 | 1.56 |  |
| 164 | Briar | -1.14 | 0.18 | 1.32 |  |
| 165 | Gragas | -1.20 | 0.28 | 1.48 |  |
| 166 | Poppy | -1.28 | 0.17 | 1.45 |  |
| 167 | Jarvan IV | -1.31 | 0.21 | 1.52 |  |
| 168 | Tahm Kench | -1.33 | 0.40 | 1.73 |  |
| 169 | Vi | -1.34 | 0.46 | 1.80 |  |
| 170 | Viego | -1.35 | 0.27 | 1.62 |  |
| 171 | Zac | -1.44 | 0.32 | 1.76 |  |
| 172 | Taliyah | -1.64 | 0.44 | 2.08 |  |
