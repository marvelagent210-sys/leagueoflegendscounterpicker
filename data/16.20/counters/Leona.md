# Counters to Leona (patch 26.20)

Every champion ranked by what its kit does against Leona's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Leona's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Leona` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.67)

- **0.80** spell shield: Spell Shield's spell shield blocks Leona's Solar Flare. Spell shield for 1.5 s, long enough to use ahead of Solar Flare. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Leona R Solar Flare)
- **0.60** spell shield: Spell Shield's spell shield blocks Leona's Zenith Blade. Spell shield for 1.5 s, long enough to use ahead of Zenith Blade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Leona E Zenith Blade)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Leona's (500 vs 125 attack range). Leona closes the gap with Zenith Blade. (Sivir basic attacks → Leona basic attacks)

### 2. Udyr (net +1.56)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Leona's Zenith Blade (root). Immune for 1.5 s, long enough to use ahead of Zenith Blade. (Udyr E Blazing Stampede → Leona E Zenith Blade)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Leona's Solar Flare (slow, stun). Immune for 1.5 s, long enough to use ahead of Solar Flare. (Udyr E Blazing Stampede → Leona R Solar Flare)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Leona's Shield of Daybreak (stun). Immune for 1.5 s, long enough to use ahead of Shield of Daybreak. (Udyr E Blazing Stampede → Leona Q Shield of Daybreak)

### 3. Elise (net +1.48)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Leona's Solar Flare. Untargetable for 0.6 s; Solar Flare takes 0.25 s to land, enough to react. (Elise E Rappel → Leona R Solar Flare)
- **0.60** untargetable: Rappel makes Elise untargetable, dodging Leona's Zenith Blade. Untargetable for 0.6 s; Zenith Blade takes 0.7 s to land, enough to react. (Elise E Rappel → Leona E Zenith Blade)
- **0.32** range: Elise's basic attacks reach 425 units farther than Leona's (550 vs 125 attack range). Leona closes the gap with Zenith Blade. (Elise basic attacks → Leona basic attacks)

### 4. Morgana (net +1.41)

- **0.80** cc immunity: Black Shield makes Morgana immune to Leona's Solar Flare (slow, stun). Immune for 5 s, long enough to use ahead of Solar Flare. (Morgana E Black Shield → Leona R Solar Flare)
- **0.63** cc immunity: Black Shield makes Morgana immune to Leona's Zenith Blade (root). Immune for 5 s, long enough to use ahead of Zenith Blade. (Morgana E Black Shield → Leona E Zenith Blade)
- **0.41** cc immunity: Black Shield makes Morgana immune to Leona's Shield of Daybreak (stun). Immune for 5 s, long enough to use ahead of Shield of Daybreak. (Morgana E Black Shield → Leona Q Shield of Daybreak)

### 5. Yuumi (net +1.40)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Leona's Zenith Blade. Untargetable for ?; Zenith Blade takes 0.7 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Leona E Zenith Blade)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Leona's Solar Flare. Untargetable for ?; Solar Flare takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Leona R Solar Flare)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Leona's Shield of Daybreak. Untargetable for ?; Shield of Daybreak lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Leona Q Shield of Daybreak)
- Watch out: Shield of Daybreak's stun interrupts Yuumi's Final Chapter (normal channel).

### 6. Fiora (net +1.36)

- **0.90** parry: Riposte parries Leona's Solar Flare and stuns back. Parry for 0.75 s; Solar Flare takes 0.25 s to land, enough to react. Negating Solar Flare's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona R Solar Flare)
- **0.73** parry: Riposte parries Leona's Zenith Blade and stuns back. Parry for 0.75 s; Zenith Blade takes 0.7 s to land, enough to react. Negating Zenith Blade's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona E Zenith Blade)
- **0.35** parry: Riposte parries Leona's Shield of Daybreak and stuns back. Parry for 0.75 s; Shield of Daybreak lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Shield of Daybreak's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Leona Q Shield of Daybreak)

### 7. Bard (net +1.34)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Leona's Solar Flare. Untargetable for 2.5 s, long enough to use ahead of Solar Flare. (Bard R Tempered Fate → Leona R Solar Flare)
- **0.45** untargetable: Tempered Fate makes Bard untargetable, dodging Leona's Zenith Blade. Untargetable for 2.5 s, long enough to use ahead of Zenith Blade. (Bard R Tempered Fate → Leona E Zenith Blade)
- **0.36** range: Bard's basic attacks reach 375 units farther than Leona's (500 vs 125 attack range). Leona closes the gap with Zenith Blade. (Bard basic attacks → Leona basic attacks)

### 8. Vladimir (net +1.29)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Solar Flare. Untargetable for 2 s, long enough to use ahead of Solar Flare. (Vladimir W Sanguine Pool → Leona R Solar Flare)
- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Zenith Blade. Untargetable for 2 s, long enough to use ahead of Zenith Blade. (Vladimir W Sanguine Pool → Leona E Zenith Blade)
- **0.41** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Leona's Shield of Daybreak. Untargetable for 2 s, long enough to use ahead of Shield of Daybreak. (Vladimir W Sanguine Pool → Leona Q Shield of Daybreak)
- Watch out: Shield of Daybreak's stun interrupts Vladimir's Tides of Blood (charge-up).

### 9. Xayah (net +1.29)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Leona's Solar Flare. Untargetable for 1.5 s, long enough to use ahead of Solar Flare. (Xayah R Featherstorm → Leona R Solar Flare)
- **0.44** untargetable: Featherstorm makes Xayah untargetable, dodging Leona's Zenith Blade. Untargetable for 1.5 s, long enough to use ahead of Zenith Blade. (Xayah R Featherstorm → Leona E Zenith Blade)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Leona's (525 vs 125 attack range). Leona closes the gap with Zenith Blade. (Xayah basic attacks → Leona basic attacks)

### 10. Nocturne (net +1.26)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Leona's Solar Flare. Spell shield for 1.5 s, long enough to use ahead of Solar Flare. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona R Solar Flare)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Leona's Zenith Blade. Spell shield for 1.5 s, long enough to use ahead of Zenith Blade. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona E Zenith Blade)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Leona's Shield of Daybreak. Spell shield for 1.5 s, long enough to use ahead of Shield of Daybreak. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Leona Q Shield of Daybreak)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.67 | 1.67 | 0.00 |  |
| 2 | Udyr | +1.56 | 1.56 | 0.00 |  |
| 3 | Elise | +1.48 | 1.48 | 0.00 |  |
| 4 | Morgana | +1.41 | 1.41 | 0.00 |  |
| 5 | Yuumi | +1.40 | 1.83 | 0.43 |  |
| 6 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 7 | Bard | +1.34 | 1.34 | 0.00 |  |
| 8 | Vladimir | +1.29 | 1.40 | 0.11 |  |
| 9 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 10 | Nocturne | +1.26 | 1.26 | 0.00 |  |
| 11 | Maokai | +1.25 | 1.25 | 0.00 |  |
| 12 | Lissandra | +1.23 | 1.23 | 0.00 |  |
| 13 | Aurora | +1.17 | 1.17 | 0.00 |  |
| 14 | Gwen | +1.16 | 1.16 | 0.00 |  |
| 15 | Master Yi | +1.11 | 1.34 | 0.23 |  |
| 16 | Milio | +1.10 | 1.10 | 0.00 |  |
| 17 | Ekko | +1.08 | 1.08 | 0.00 |  |
| 18 | Rengar | +1.04 | 1.04 | 0.00 |  |
| 19 | Kalista | +1.00 | 1.00 | 0.00 |  |
| 20 | Gangplank | +0.99 | 0.99 | 0.00 |  |
| 21 | Olaf | +0.98 | 0.98 | 0.00 |  |
| 22 | Rek'Sai | +0.98 | 0.98 | 0.00 |  |
| 23 | Kled | +0.97 | 0.97 | 0.00 |  |
| 24 | Evelynn | +0.95 | 0.95 | 0.00 |  |
| 25 | Shaco | +0.95 | 0.95 | 0.00 |  |
| 26 | Zaahen | +0.95 | 0.95 | 0.00 |  |
| 27 | Sion | +0.93 | 1.11 | 0.18 |  |
| 28 | Camille | +0.91 | 0.91 | 0.00 |  |
| 29 | Kindred | +0.88 | 0.88 | 0.00 |  |
| 30 | Zed | +0.88 | 0.88 | 0.00 |  |
| 31 | Samira | +0.86 | 0.86 | 0.00 | projectile block (Blade Whirl) |
| 32 | Braum | +0.85 | 0.85 | 0.00 | projectile block (Unbreakable) |
| 33 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 34 | Malzahar | +0.82 | 1.22 | 0.40 |  |
| 35 | Mel | +0.81 | 0.81 | 0.00 | projectile block (Rebuttal) |
| 36 | Alistar | +0.78 | 0.78 | 0.00 |  |
| 37 | Teemo | +0.72 | 0.72 | 0.00 |  |
| 38 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 39 | Jinx | +0.67 | 0.67 | 0.00 |  |
| 40 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 41 | Warwick | +0.64 | 1.04 | 0.40 |  |
| 42 | Lulu | +0.63 | 0.63 | 0.00 |  |
| 43 | Hwei | +0.61 | 0.61 | 0.00 |  |
| 44 | Yasuo | +0.61 | 0.61 | 0.00 | projectile block (Wind Wall) |
| 45 | Vex | +0.58 | 0.58 | 0.00 |  |
| 46 | Ahri | +0.57 | 0.57 | 0.00 |  |
| 47 | Garen | +0.57 | 0.57 | 0.00 |  |
| 48 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 49 | Kayn | +0.50 | 0.95 | 0.45 |  |
| 50 | Pantheon | +0.49 | 0.60 | 0.11 |  |
| 51 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 52 | Aphelios | +0.46 | 0.46 | 0.00 |  |
| 53 | Xin Zhao | +0.45 | 0.45 | 0.00 |  |
| 54 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 55 | Poppy | +0.43 | 0.63 | 0.20 | dash stop (Steadfast Presence) |
| 56 | Taric | +0.43 | 0.43 | 0.00 |  |
| 57 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 58 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 59 | Sona | +0.41 | 0.41 | 0.00 |  |
| 60 | Nilah | +0.40 | 0.40 | 0.00 |  |
| 61 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 62 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 63 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 64 | Draven | +0.36 | 0.36 | 0.00 |  |
| 65 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 66 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 67 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 68 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 69 | Senna | +0.32 | 0.32 | 0.00 |  |
| 70 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 71 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 72 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 73 | Jax | +0.31 | 0.31 | 0.00 |  |
| 74 | Corki | +0.30 | 0.30 | 0.00 |  |
| 75 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 76 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 77 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 78 | Lux | +0.29 | 0.29 | 0.00 |  |
| 79 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 80 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 81 | Heimerdinger | +0.28 | 0.28 | 0.00 |  |
| 82 | Azir | +0.27 | 0.27 | 0.00 |  |
| 83 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 84 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 85 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 86 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 87 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 88 | Graves | +0.24 | 0.24 | 0.00 |  |
| 89 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 90 | Amumu | +0.22 | 0.22 | 0.00 |  |
| 91 | Annie | +0.22 | 0.22 | 0.00 |  |
| 92 | Brand | +0.22 | 0.22 | 0.00 |  |
| 93 | Karma | +0.22 | 0.22 | 0.00 |  |
| 94 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 95 | Nami | +0.22 | 0.22 | 0.00 |  |
| 96 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 97 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 98 | Yone | +0.22 | 0.22 | 0.00 |  |
| 99 | Swain | +0.21 | 0.21 | 0.00 |  |
| 100 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 101 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 102 | Varus | +0.16 | 0.27 | 0.11 |  |
| 103 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 104 | Quinn | +0.13 | 0.38 | 0.25 |  |
| 105 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 106 | Aurelion Sol | +0.12 | 0.22 | 0.10 |  |
| 107 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 108 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 109 | Twisted Fate | +0.08 | 0.43 | 0.35 |  |
| 110 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 111 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 112 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 113 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 114 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 115 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 116 | Ivern | +0.04 | 0.19 | 0.15 |  |
| 117 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 118 | Akali | 0.00 | 0.00 | 0.00 |  |
| 119 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 120 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 121 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 122 | Briar | 0.00 | 0.00 | 0.00 |  |
| 123 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 124 | Darius | 0.00 | 0.00 | 0.00 |  |
| 125 | Diana | 0.00 | 0.00 | 0.00 |  |
| 126 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 127 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 128 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 129 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 130 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 133 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 134 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 135 | Locke | 0.00 | 0.00 | 0.00 |  |
| 136 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 137 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 138 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 139 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 140 | Rell | 0.00 | 0.00 | 0.00 |  |
| 141 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 142 | Riven | 0.00 | 0.00 | 0.00 |  |
| 143 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 144 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 145 | Sett | 0.00 | 0.00 | 0.00 |  |
| 146 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 147 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 148 | Talon | 0.00 | 0.00 | 0.00 |  |
| 149 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 150 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 151 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 152 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 153 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 154 | Vel'Koz | -0.01 | 0.27 | 0.28 |  |
| 155 | Janna | -0.04 | 0.36 | 0.40 |  |
| 156 | Rammus | -0.06 | 0.29 | 0.35 |  |
| 157 | Zac | -0.07 | 0.43 | 0.50 | dash stop (Stretching Strikes) |
| 158 | Xerath | -0.07 | 0.27 | 0.34 |  |
| 159 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 160 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 161 | Shen | -0.16 | 0.29 | 0.45 |  |
| 162 | Viego | -0.16 | 0.09 | 0.25 |  |
| 163 | Galio | -0.18 | 0.00 | 0.18 |  |
| 164 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 165 | Taliyah | -0.21 | 0.27 | 0.48 |  |
| 166 | Gragas | -0.23 | 0.00 | 0.23 |  |
| 167 | Nunu & Willump | -0.24 | 0.25 | 0.49 |  |
| 168 | Fiddlesticks | -0.27 | 0.20 | 0.47 |  |
| 169 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Vi | -0.50 | 0.00 | 0.50 |  |
