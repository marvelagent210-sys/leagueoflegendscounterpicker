# Counters to Fizz (patch 26.20)

Every champion ranked by what its kit does against Fizz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fizz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fizz` for the full ledger of a matchup, with sources.

## Top 10

### 1. Lissandra (net +1.15)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Fizz's Chum the Waters. Untargetable for 2.5 s, long enough to use ahead of Chum the Waters. (Lissandra R Frozen Tomb → Fizz R Chum the Waters)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Fizz's Urchin Strike. Untargetable for 2.5 s, long enough to use ahead of Urchin Strike. (Lissandra R Frozen Tomb → Fizz Q Urchin Strike)
- **0.19** dash stop: Frozen Tomb's knockdown can stop Fizz's Trickster mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Fizz E Trickster)

### 2. Bard (net +1.14)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Fizz's Chum the Waters. Untargetable for 2.5 s, long enough to use ahead of Chum the Waters. (Bard R Tempered Fate → Fizz R Chum the Waters)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Fizz's Urchin Strike. Untargetable for 2.5 s, long enough to use ahead of Urchin Strike. (Bard R Tempered Fate → Fizz Q Urchin Strike)
- **0.16** range: Bard's basic attacks reach 325 units farther than Fizz's (500 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Bard basic attacks → Fizz basic attacks)

### 3. Elise (net +1.10)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Fizz's Chum the Waters. Untargetable for 0.6 s; Chum the Waters takes 1.25 s to land, enough to react. (Elise E Rappel → Fizz R Chum the Waters)
- **0.29** untargetable: Rappel makes Elise untargetable, dodging Fizz's Urchin Strike. Untargetable for 0.6 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Fizz Q Urchin Strike)
- **0.15** range: Elise's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Elise basic attacks → Fizz basic attacks)

### 4. Vladimir (net +1.08)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Chum the Waters. Untargetable for 2 s, long enough to use ahead of Chum the Waters. (Vladimir W Sanguine Pool → Fizz R Chum the Waters)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Urchin Strike. Untargetable for 2 s, long enough to use ahead of Urchin Strike. (Vladimir W Sanguine Pool → Fizz Q Urchin Strike)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Fizz's (450 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Vladimir basic attacks → Fizz basic attacks)
- Watch out: Chum the Waters's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 5. Fiora (net +1.07)

- **0.90** parry: Riposte parries Fizz's Chum the Waters and stuns back. Parry for 0.75 s; Chum the Waters takes 1.25 s to land, enough to react. Negating Chum the Waters's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Fizz R Chum the Waters)
- **0.30** parry: Riposte parries Fizz's Urchin Strike. Parry for 0.75 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz Q Urchin Strike)
- **0.06** attack speed slow: Riposte cuts Fizz's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Fizz basic attacks)

### 6. Master Yi (net +1.06)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. (Master Yi Q Alpha Strike → Fizz R Chum the Waters)
- **0.29** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz Q Urchin Strike)
- **0.15** cleanse: Highlander cleanses Fizz's Chum the Waters (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Fizz R Chum the Waters)
- Watch out: Chum the Waters's airborne interrupts Master Yi's Meditate (normal channel).

### 7. Xayah (net +1.05)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.5 s, long enough to use ahead of Chum the Waters. (Xayah R Featherstorm → Fizz R Chum the Waters)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.5 s, long enough to use ahead of Urchin Strike. (Xayah R Featherstorm → Fizz Q Urchin Strike)
- **0.17** range: Xayah's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Xayah basic attacks → Fizz basic attacks)

### 8. Rek'Sai (net +1.00)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.5 s, long enough to use ahead of Chum the Waters. (Rek'Sai R Void Rush → Fizz R Chum the Waters)
- **0.36** untargetable: Void Rush makes Rek'Sai untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.5 s, long enough to use ahead of Urchin Strike. (Rek'Sai R Void Rush → Fizz Q Urchin Strike)
- **0.08** cc immunity: Void Rush is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Fizz R Chum the Waters)

### 9. Maokai (net +0.98)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.4 s; Chum the Waters takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Fizz R Chum the Waters)
- **0.36** untargetable: Twisted Advance makes Maokai untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.4 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Fizz Q Urchin Strike)

### 10. Gwen (net +0.95)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz R Chum the Waters)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz Q Urchin Strike)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +1.15 | 1.15 | 0.00 |  |
| 2 | Bard | +1.14 | 1.14 | 0.00 |  |
| 3 | Elise | +1.10 | 1.10 | 0.00 |  |
| 4 | Vladimir | +1.08 | 1.13 | 0.05 |  |
| 5 | Fiora | +1.07 | 1.07 | 0.00 |  |
| 6 | Master Yi | +1.06 | 1.17 | 0.11 |  |
| 7 | Xayah | +1.05 | 1.05 | 0.00 |  |
| 8 | Rek'Sai | +1.00 | 1.00 | 0.00 |  |
| 9 | Maokai | +0.98 | 0.98 | 0.00 |  |
| 10 | Gwen | +0.95 | 0.95 | 0.00 |  |
| 11 | Morgana | +0.95 | 0.95 | 0.00 |  |
| 12 | Ekko | +0.92 | 0.92 | 0.00 |  |
| 13 | Udyr | +0.90 | 0.90 | 0.00 |  |
| 14 | Camille | +0.88 | 0.88 | 0.00 |  |
| 15 | Sivir | +0.88 | 0.88 | 0.00 |  |
| 16 | Warwick | +0.85 | 1.03 | 0.18 |  |
| 17 | Olaf | +0.85 | 0.85 | 0.00 |  |
| 18 | Nocturne | +0.84 | 0.84 | 0.00 |  |
| 19 | Evelynn | +0.83 | 0.91 | 0.08 |  |
| 20 | Zaahen | +0.83 | 0.83 | 0.00 |  |
| 21 | Aurora | +0.82 | 0.97 | 0.15 |  |
| 22 | Jax | +0.82 | 0.82 | 0.00 | attack dodge (Counter Strike) |
| 23 | Zed | +0.81 | 0.81 | 0.00 |  |
| 24 | Yuumi | +0.79 | 1.17 | 0.38 |  |
| 25 | Sion | +0.77 | 0.85 | 0.08 |  |
| 26 | Cassiopeia | +0.77 | 0.77 | 0.00 |  |
| 27 | Kayle | +0.76 | 0.76 | 0.00 |  |
| 28 | Kled | +0.74 | 0.74 | 0.00 |  |
| 29 | Shaco | +0.71 | 0.91 | 0.20 |  |
| 30 | Gangplank | +0.70 | 0.70 | 0.00 |  |
| 31 | Kalista | +0.69 | 0.69 | 0.00 |  |
| 32 | Alistar | +0.68 | 0.68 | 0.00 |  |
| 33 | Jinx | +0.68 | 0.68 | 0.00 | dash stop (Flame Chompers!) |
| 34 | Singed | +0.68 | 0.68 | 0.00 |  |
| 35 | Hwei | +0.66 | 0.66 | 0.00 | dash stop (Grim Visage) |
| 36 | Vex | +0.64 | 0.64 | 0.00 |  |
| 37 | Pantheon | +0.63 | 0.68 | 0.05 |  |
| 38 | Kindred | +0.63 | 0.63 | 0.00 |  |
| 39 | Viktor | +0.62 | 0.62 | 0.00 |  |
| 40 | Nilah | +0.61 | 0.61 | 0.00 | attack dodge (Jubilant Veil) |
| 41 | Ahri | +0.60 | 0.60 | 0.00 |  |
| 42 | Rengar | +0.57 | 0.71 | 0.14 |  |
| 43 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 44 | Mel | +0.53 | 0.53 | 0.00 | projectile block (Rebuttal) |
| 45 | Samira | +0.53 | 0.53 | 0.00 | projectile block (Blade Whirl) |
| 46 | Xin Zhao | +0.52 | 0.52 | 0.00 |  |
| 47 | Teemo | +0.51 | 0.59 | 0.08 |  |
| 48 | Taric | +0.50 | 0.50 | 0.00 |  |
| 49 | Poppy | +0.49 | 0.69 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 50 | Kayn | +0.46 | 0.91 | 0.45 |  |
| 51 | Malzahar | +0.42 | 0.82 | 0.40 |  |
| 52 | Lulu | +0.42 | 0.42 | 0.00 |  |
| 53 | Braum | +0.40 | 0.40 | 0.00 | projectile block (Unbreakable) |
| 54 | Yasuo | +0.40 | 0.40 | 0.00 | projectile block (Wind Wall) |
| 55 | Yone | +0.36 | 0.36 | 0.00 |  |
| 56 | Shen | +0.34 | 0.79 | 0.45 | attack block (Spirit's Refuge) |
| 57 | Zac | +0.34 | 0.57 | 0.23 | dash stop (Stretching Strikes) |
| 58 | Milio | +0.34 | 0.34 | 0.00 |  |
| 59 | Garen | +0.32 | 0.32 | 0.00 |  |
| 60 | Aphelios | +0.30 | 0.30 | 0.00 |  |
| 61 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 62 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 63 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 64 | Corki | +0.22 | 0.22 | 0.00 |  |
| 65 | Heimerdinger | +0.21 | 0.21 | 0.00 |  |
| 66 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 67 | Sona | +0.19 | 0.19 | 0.00 |  |
| 68 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 69 | Renata Glasc | +0.18 | 0.18 | 0.00 |  |
| 70 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 71 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 72 | Draven | +0.17 | 0.17 | 0.00 |  |
| 73 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 74 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 75 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 76 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 77 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 78 | Zoe | +0.15 | 0.15 | 0.00 |  |
| 79 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 80 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 81 | Lux | +0.14 | 0.14 | 0.00 |  |
| 82 | Jayce | +0.13 | 0.13 | 0.00 |  |
| 83 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 84 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 85 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 86 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 87 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 88 | Azir | +0.12 | 0.12 | 0.00 |  |
| 89 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 90 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 91 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 92 | Rammus | +0.11 | 0.27 | 0.16 |  |
| 93 | Annie | +0.11 | 0.11 | 0.00 |  |
| 94 | Brand | +0.10 | 0.10 | 0.00 |  |
| 95 | Graves | +0.10 | 0.10 | 0.00 |  |
| 96 | Karma | +0.10 | 0.10 | 0.00 |  |
| 97 | Nami | +0.10 | 0.10 | 0.00 |  |
| 98 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 99 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 100 | Swain | +0.09 | 0.09 | 0.00 |  |
| 101 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 102 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 103 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 104 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 105 | Sett | +0.08 | 0.08 | 0.00 |  |
| 106 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 107 | Thresh | +0.08 | 0.08 | 0.00 |  |
| 108 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 109 | Varus | +0.07 | 0.13 | 0.06 |  |
| 110 | Vayne | +0.06 | 0.20 | 0.14 |  |
| 111 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 112 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 113 | Urgot | +0.06 | 0.06 | 0.00 |  |
| 114 | Senna | +0.05 | 0.16 | 0.11 |  |
| 115 | Rakan | +0.05 | 0.05 | 0.00 |  |
| 116 | Aurelion Sol | +0.04 | 0.10 | 0.06 |  |
| 117 | Lillia | +0.04 | 0.04 | 0.00 |  |
| 118 | Quinn | +0.03 | 0.17 | 0.14 |  |
| 119 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 120 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 121 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 122 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 123 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 124 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 125 | Briar | 0.00 | 0.00 | 0.00 |  |
| 126 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 127 | Darius | 0.00 | 0.00 | 0.00 |  |
| 128 | Diana | 0.00 | 0.00 | 0.00 |  |
| 129 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 130 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 136 | Rell | 0.00 | 0.00 | 0.00 |  |
| 137 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 138 | Riven | 0.00 | 0.00 | 0.00 |  |
| 139 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 140 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 141 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 142 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 143 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 144 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 145 | Neeko | -0.01 | 0.10 | 0.11 |  |
| 146 | Nunu & Willump | -0.06 | 0.31 | 0.37 |  |
| 147 | Galio | -0.09 | 0.00 | 0.09 |  |
| 148 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 149 | Viego | -0.10 | 0.08 | 0.18 |  |
| 150 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 151 | Akali | -0.11 | 0.00 | 0.11 |  |
| 152 | Lucian | -0.12 | 0.16 | 0.28 |  |
| 153 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 154 | Vi | -0.14 | 0.08 | 0.22 |  |
| 155 | Talon | -0.14 | 0.00 | 0.14 |  |
| 156 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 157 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 158 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 159 | Vel'Koz | -0.16 | 0.12 | 0.28 |  |
| 160 | Akshan | -0.17 | 0.15 | 0.32 |  |
| 161 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 162 | Xerath | -0.19 | 0.12 | 0.31 |  |
| 163 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 164 | Katarina | -0.20 | 0.00 | 0.20 |  |
| 165 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 166 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 167 | Janna | -0.23 | 0.17 | 0.40 |  |
| 168 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 169 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 170 | Fiddlesticks | -0.32 | 0.08 | 0.40 |  |
| 171 | Taliyah | -0.36 | 0.12 | 0.48 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
