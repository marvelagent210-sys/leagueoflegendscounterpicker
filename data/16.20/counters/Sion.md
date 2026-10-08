# Counters to Sion (patch 26.20)

Every champion ranked by what its kit does against Sion's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sion's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sion` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.82)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Sivir basic attacks → Sion basic attacks)
- **0.80** spell shield: Spell Shield's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion R Unstoppable Onslaught)
- **0.42** spell shield: Spell Shield's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion Q Decimating Smash)

### 2. Vladimir (net +1.13)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 2 s, long enough to use ahead of Unstoppable Onslaught. (Vladimir W Sanguine Pool → Sion R Unstoppable Onslaught)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Decimating Smash. Untargetable for 2 s, long enough to use ahead of Decimating Smash. (Vladimir W Sanguine Pool → Sion Q Decimating Smash)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Sion's (450 vs 175 attack range). Sion has no dash or blink to close the gap. (Vladimir basic attacks → Sion basic attacks)
- Watch out: Decimating Smash's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 3. Xayah (net +1.10)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Xayah basic attacks → Sion basic attacks)
- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 1.5 s, long enough to use ahead of Unstoppable Onslaught. (Xayah R Featherstorm → Sion R Unstoppable Onslaught)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Decimating Smash. Untargetable for 1.5 s, long enough to use ahead of Decimating Smash. (Xayah R Featherstorm → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Xayah's Bladecaller (root).

### 4. Kayle (net +1.09)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Sion's (625 vs 175 attack range). Sion has no dash or blink to close the gap. (Kayle basic attacks → Sion basic attacks)
- **0.34** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Unstoppable Onslaught (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unstoppable Onslaught. (Kayle R Divine Judgment → Sion R Unstoppable Onslaught)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Decimating Smash (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Decimating Smash. (Kayle R Divine Judgment → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Kayle's Radiant Blast (slow).

### 5. Milio (net +1.08)

- **0.67** range: Milio's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Milio basic attacks → Sion basic attacks)
- **0.43** cleanse: Breath of Life cleanses Sion's Unstoppable Onslaught (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion R Unstoppable Onslaught)
- **0.24** cleanse: Breath of Life cleanses Sion's Decimating Smash (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

### 6. Elise (net +0.99)

- **0.61** range: Elise's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Elise basic attacks → Sion basic attacks)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 0.6 s; Unstoppable Onslaught lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Sion R Unstoppable Onslaught)
- **0.25** untargetable: Rappel makes Elise untargetable, dodging Sion's Decimating Smash. Untargetable for 0.6 s; Decimating Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Elise's Cocoon (stun).

### 7. Kindred (net +0.98)

- **0.81** range: Kindred's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Kindred basic attacks → Sion basic attacks)
- **0.17** invulnerable: Lamb's Respite makes Kindred invulnerable to Sion's Unstoppable Onslaught (its crowd control still applies). Invulnerable for ?; Unstoppable Onslaught lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Sion R Unstoppable Onslaught)
- **0.09** invulnerable: Lamb's Respite makes Kindred invulnerable to Sion's Decimating Smash (its crowd control still applies). Invulnerable for ?; Decimating Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Kindred's Mounting Dread (slow).

### 8. Nocturne (net +0.81)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion R Unstoppable Onslaught)
- **0.49** spell shield: Shroud of Darkness's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion Q Decimating Smash)
- **0.13** interrupt: Unspeakable Horror's fear interrupts Sion's Decimating Smash (charge-up). Unspeakable Horror must land during the charge-up. Sion can release Decimating Smash early instead of charging it fully. (Nocturne E Unspeakable Horror → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Nocturne's Unspeakable Horror (fear, slow).

### 9. Aurora (net +0.80)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Aurora basic attacks → Sion basic attacks)
- **0.36** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 0.4 s; Unstoppable Onslaught lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion R Unstoppable Onslaught)
- **0.18** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Decimating Smash. Untargetable for 0.4 s; Decimating Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Aurora's Between Worlds (slow).

### 10. Olaf (net +0.79)

- **0.68** cc immunity: Ragnarok makes Olaf immune to Sion's Unstoppable Onslaught (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Unstoppable Onslaught. (Olaf R Ragnarok → Sion R Unstoppable Onslaught)
- **0.31** cc immunity: Ragnarok makes Olaf immune to Sion's Decimating Smash (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Decimating Smash. (Olaf R Ragnarok → Sion Q Decimating Smash)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Sion's Roar of the Slayer (slow). Immune for 3 s, long enough to use ahead of Roar of the Slayer. (Olaf R Ragnarok → Sion E Roar of the Slayer)
- Watch out: Unstoppable Onslaught makes Sion immune to Olaf's Undertow (slow).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.82 | 1.82 | 0.00 | range (attacks) |
| 2 | Vladimir | +1.13 | 1.32 | 0.19 |  |
| 3 | Xayah | +1.10 | 1.44 | 0.34 | range (attacks) |
| 4 | Kayle | +1.09 | 1.14 | 0.05 | range (attacks) |
| 5 | Milio | +1.08 | 1.43 | 0.35 | range (attacks) |
| 6 | Elise | +0.99 | 1.34 | 0.35 | range (attacks) |
| 7 | Kindred | +0.98 | 1.03 | 0.05 | range (attacks) |
| 8 | Nocturne | +0.81 | 1.29 | 0.48 |  |
| 9 | Aurora | +0.80 | 1.02 | 0.22 | range (attacks) |
| 10 | Olaf | +0.79 | 0.85 | 0.06 |  |
| 11 | Zeri | +0.78 | 0.83 | 0.05 | range (attacks) |
| 12 | Teemo | +0.76 | 0.94 | 0.18 | range (attacks) |
| 13 | Twitch | +0.75 | 0.81 | 0.06 | range (attacks) |
| 14 | Udyr | +0.72 | 1.21 | 0.49 |  |
| 15 | Rek'Sai | +0.71 | 1.04 | 0.33 |  |
| 16 | Gangplank | +0.67 | 0.84 | 0.17 |  |
| 17 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 18 | Morgana | +0.64 | 1.37 | 0.73 |  |
| 19 | Yuumi | +0.63 | 1.23 | 0.60 | range (attacks) |
| 20 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 21 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 22 | Master Yi | +0.58 | 0.81 | 0.23 |  |
| 23 | Vayne | +0.57 | 0.93 | 0.36 | range (attacks) |
| 24 | Bard | +0.56 | 1.48 | 0.92 | range (attacks) |
| 25 | Rengar | +0.53 | 0.88 | 0.35 |  |
| 26 | Fiora | +0.53 | 0.78 | 0.25 |  |
| 27 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 28 | Gwen | +0.47 | 0.61 | 0.14 |  |
| 29 | Samira | +0.45 | 0.67 | 0.22 | range (attacks) |
| 30 | Garen | +0.45 | 0.58 | 0.13 |  |
| 31 | Draven | +0.44 | 0.80 | 0.36 | range (attacks) |
| 32 | Smolder | +0.44 | 0.61 | 0.17 | range (attacks) |
| 33 | Kog'Maw | +0.41 | 0.47 | 0.06 |  |
| 34 | Corki | +0.40 | 0.75 | 0.35 | range (attacks) |
| 35 | Zilean | +0.39 | 0.76 | 0.37 | range (attacks) |
| 36 | Vex | +0.39 | 0.73 | 0.34 | range (attacks) |
| 37 | Kennen | +0.39 | 0.67 | 0.28 | range (attacks) |
| 38 | Zed | +0.39 | 0.45 | 0.06 |  |
| 39 | Zoe | +0.35 | 0.73 | 0.38 | range (attacks) |
| 40 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 41 | Graves | +0.34 | 0.41 | 0.07 |  |
| 42 | Singed | +0.31 | 0.72 | 0.41 |  |
| 43 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 44 | Ekko | +0.31 | 0.58 | 0.27 |  |
| 45 | Mel | +0.29 | 0.63 | 0.34 | range (attacks) |
| 46 | Annie | +0.29 | 0.57 | 0.28 |  |
| 47 | Lissandra | +0.28 | 1.27 | 0.99 |  |
| 48 | Evelynn | +0.28 | 0.64 | 0.36 |  |
| 49 | Jayce | +0.27 | 0.66 | 0.39 | range (attacks) |
| 50 | Miss Fortune | +0.27 | 0.61 | 0.34 | range (attacks) |
| 51 | Twisted Fate | +0.26 | 0.93 | 0.67 | range (attacks) |
| 52 | Senna | +0.26 | 0.65 | 0.39 | range (attacks) |
| 53 | Nasus | +0.21 | 0.27 | 0.06 |  |
| 54 | Shaco | +0.20 | 0.62 | 0.42 |  |
| 55 | Brand | +0.20 | 0.59 | 0.39 |  |
| 56 | Kalista | +0.19 | 1.17 | 0.98 | range (attacks) |
| 57 | Soraka | +0.19 | 0.61 | 0.42 | range (attacks) |
| 58 | Veigar | +0.19 | 0.57 | 0.38 |  |
| 59 | Zaahen | +0.18 | 0.70 | 0.52 |  |
| 60 | Ahri | +0.17 | 0.53 | 0.36 |  |
| 61 | Lux | +0.16 | 0.54 | 0.38 | range (attacks) |
| 62 | Quinn | +0.15 | 0.82 | 0.67 | range (attacks) |
| 63 | Alistar | +0.15 | 0.81 | 0.66 |  |
| 64 | Ziggs | +0.15 | 0.62 | 0.47 | range (attacks) |
| 65 | LeBlanc | +0.15 | 0.38 | 0.23 |  |
| 66 | Jinx | +0.13 | 0.51 | 0.38 | range (attacks) |
| 67 | Lulu | +0.12 | 1.01 | 0.89 | range (attacks) |
| 68 | Taric | +0.12 | 0.48 | 0.36 |  |
| 69 | Viktor | +0.11 | 0.65 | 0.54 | range (attacks) |
| 70 | Syndra | +0.10 | 0.52 | 0.42 |  |
| 71 | Heimerdinger | +0.09 | 0.63 | 0.54 |  |
| 72 | Swain | +0.09 | 0.49 | 0.40 |  |
| 73 | Anivia | +0.06 | 0.64 | 0.58 |  |
| 74 | Illaoi | +0.06 | 0.12 | 0.06 |  |
| 75 | Sona | +0.05 | 0.85 | 0.80 | range (attacks) |
| 76 | Caitlyn | +0.05 | 0.72 | 0.67 | range (attacks) |
| 77 | Jax | +0.01 | 0.35 | 0.34 |  |
| 78 | Kassadin | 0.00 | 0.16 | 0.16 |  |
| 79 | Cassiopeia | -0.01 | 0.87 | 0.88 |  |
| 80 | Karthus | -0.01 | 0.33 | 0.34 |  |
| 81 | Ashe | -0.02 | 0.80 | 0.82 | range (attacks) |
| 82 | Tristana | -0.04 | 0.80 | 0.84 | range (attacks) |
| 83 | Hwei | -0.04 | 0.56 | 0.60 |  |
| 84 | Talon | -0.05 | 0.00 | 0.05 |  |
| 85 | Akali | -0.06 | 0.00 | 0.06 |  |
| 86 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 87 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 88 | Kha'Zix | -0.08 | 0.00 | 0.08 |  |
| 89 | Gnar | -0.10 | 0.66 | 0.76 | range (attacks) |
| 90 | Vel'Koz | -0.11 | 0.60 | 0.71 |  |
| 91 | Pantheon | -0.11 | 0.51 | 0.62 |  |
| 92 | Karma | -0.11 | 0.38 | 0.49 |  |
| 93 | Xerath | -0.12 | 0.60 | 0.72 |  |
| 94 | Malzahar | -0.13 | 1.13 | 1.26 |  |
| 95 | Aphelios | -0.14 | 0.85 | 0.99 | range (attacks) |
| 96 | Kayn | -0.14 | 0.65 | 0.79 |  |
| 97 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 98 | Thresh | -0.17 | 0.46 | 0.63 |  |
| 99 | Locke | -0.17 | 0.00 | 0.17 |  |
| 100 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 101 | Renata Glasc | -0.18 | 0.83 | 1.01 | range (attacks) |
| 102 | Renekton | -0.19 | 0.15 | 0.34 |  |
| 103 | Mordekaiser | -0.20 | 0.21 | 0.41 |  |
| 104 | Cho'Gath | -0.22 | 0.18 | 0.40 |  |
| 105 | Jhin | -0.23 | 0.50 | 0.73 | range (attacks) |
| 106 | Ryze | -0.24 | 0.45 | 0.69 |  |
| 107 | Bel'Veth | -0.24 | 0.15 | 0.39 |  |
| 108 | Aatrox | -0.26 | 0.18 | 0.44 |  |
| 109 | Yorick | -0.27 | 0.12 | 0.39 |  |
| 110 | Azir | -0.28 | 0.55 | 0.83 |  |
| 111 | Orianna | -0.28 | 0.55 | 0.83 |  |
| 112 | Ivern | -0.28 | 0.33 | 0.61 |  |
| 113 | Varus | -0.29 | 0.65 | 0.94 | range (attacks) |
| 114 | Irelia | -0.29 | 0.13 | 0.42 |  |
| 115 | Darius | -0.31 | 0.11 | 0.42 |  |
| 116 | Trundle | -0.31 | 0.11 | 0.42 |  |
| 117 | Maokai | -0.32 | 0.82 | 1.14 |  |
| 118 | Seraphine | -0.34 | 0.64 | 0.98 | range (attacks) |
| 119 | Shyvana | -0.34 | 0.19 | 0.53 |  |
| 120 | Fiddlesticks | -0.38 | 0.52 | 0.90 |  |
| 121 | Volibear | -0.38 | 0.25 | 0.63 |  |
| 122 | Sylas | -0.40 | 0.13 | 0.53 |  |
| 123 | Kled | -0.41 | 0.76 | 1.17 |  |
| 124 | Nami | -0.41 | 0.56 | 0.97 |  |
| 125 | Zyra | -0.42 | 0.56 | 0.98 |  |
| 126 | Blitzcrank | -0.42 | 0.18 | 0.60 |  |
| 127 | Xin Zhao | -0.44 | 0.55 | 0.99 |  |
| 128 | Nilah | -0.47 | 0.33 | 0.80 |  |
| 129 | Neeko | -0.49 | 0.49 | 0.98 |  |
| 130 | Yasuo | -0.55 | 0.33 | 0.88 |  |
| 131 | Shen | -0.58 | 0.40 | 0.98 |  |
| 132 | Riven | -0.58 | 0.12 | 0.70 |  |
| 133 | Braum | -0.59 | 0.36 | 0.95 |  |
| 134 | Lillia | -0.59 | 0.24 | 0.83 |  |
| 135 | Janna | -0.60 | 0.80 | 1.40 | range (attacks) |
| 136 | Camille | -0.63 | 0.63 | 1.26 |  |
| 137 | Aurelion Sol | -0.63 | 0.49 | 1.12 |  |
| 138 | Naafiri | -0.68 | 0.00 | 0.68 |  |
| 139 | Urgot | -0.69 | 0.35 | 1.04 |  |
| 140 | Malphite | -0.72 | 0.32 | 1.04 |  |
| 141 | Skarner | -0.72 | 0.24 | 0.96 |  |
| 142 | Diana | -0.72 | 0.08 | 0.80 |  |
| 143 | Wukong | -0.72 | 0.08 | 0.80 |  |
| 144 | Pyke | -0.73 | 0.13 | 0.86 |  |
| 145 | Lee Sin | -0.75 | 0.08 | 0.83 |  |
| 146 | Nunu & Willump | -0.77 | 0.31 | 1.08 |  |
| 147 | Fizz | -0.77 | 0.08 | 0.85 |  |
| 148 | Warwick | -0.79 | 0.79 | 1.58 |  |
| 149 | Rakan | -0.79 | 0.26 | 1.05 |  |
| 150 | Hecarim | -0.86 | 0.14 | 1.00 |  |
| 151 | Qiyana | -0.90 | 0.08 | 0.98 |  |
| 152 | Yone | -0.92 | 0.30 | 1.22 |  |
| 153 | K'Sante | -0.93 | 0.41 | 1.34 |  |
| 154 | Sett | -0.93 | 0.25 | 1.18 |  |
| 155 | Leona | -0.93 | 0.18 | 1.11 |  |
| 156 | Amumu | -0.94 | 0.12 | 1.06 |  |
| 157 | Ambessa | -0.95 | 0.08 | 1.03 |  |
| 158 | Sejuani | -0.97 | 0.18 | 1.15 |  |
| 159 | Nautilus | -1.00 | 0.08 | 1.08 |  |
| 160 | Ornn | -1.01 | 0.28 | 1.29 |  |
| 161 | Jarvan IV | -1.06 | 0.14 | 1.20 |  |
| 162 | Rell | -1.11 | 0.13 | 1.24 |  |
| 163 | Taliyah | -1.12 | 0.59 | 1.71 |  |
| 164 | Rammus | -1.12 | 0.39 | 1.51 |  |
| 165 | Poppy | -1.13 | 0.08 | 1.21 |  |
| 166 | Gragas | -1.15 | 0.12 | 1.27 |  |
| 167 | Briar | -1.18 | 0.08 | 1.26 |  |
| 168 | Galio | -1.35 | 0.16 | 1.51 |  |
| 169 | Viego | -1.35 | 0.14 | 1.49 |  |
| 170 | Tahm Kench | -1.40 | 0.18 | 1.58 |  |
| 171 | Vi | -1.43 | 0.30 | 1.73 |  |
| 172 | Zac | -1.49 | 0.14 | 1.63 |  |
