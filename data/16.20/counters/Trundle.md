# Counters to Trundle (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 45 other champions with a simulator kit against Trundle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Trundle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Trundle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Tahm Kench | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | +0.89 | +0.00 |
| 2 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 3 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 4 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 5 | Zaahen | −0.06 | +0.55 | −0.46 | −0.23 | +0.11 | – | −1.00 |
| 6 | Kled | −0.20 | +1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 7 | Jax | −0.50 | −1.00 | +0.00 | −1.00 | −0.01 | – | +0.00 |
| 8 | Kennen | −0.61 | −1.00 | −1.00 | −1.00 | +0.37 | +0.32 | +0.00 |
| 9 | Teemo | −0.69 | −1.00 | −1.00 | −1.00 | +0.74 | −1.00 | +0.00 |
| 10 | Aurora | −0.73 | −1.00 | −1.00 | −1.00 | +0.47 | −1.00 | +0.00 |
| 11 | Poppy | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 12 | Cho'Gath | −0.74 | −1.00 | −1.00 | −1.00 | +0.25 | – | +0.00 |
| 13 | Kayle | −0.75 | −1.00 | −1.00 | −1.00 | +0.67 | −1.00 | −1.00 |
| 14 | K'Sante | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 15 | Fiora | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 16 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 17 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 18 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 19 | Gwen | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 20 | Renekton | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 21 | Sion | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 22 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 23 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 24 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 25 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 26 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 27 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 28 | Riven | −0.79 | −1.00 | −1.00 | −1.00 | +0.26 | – | −1.00 |
| 29 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 30 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 31 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −1.00 |
| 32 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 33 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | – | −1.00 |
| 34 | Quinn | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −1.00 |
| 35 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | – | −1.00 |
| 36 | Camille | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 37 | Irelia | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 38 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 39 | Yone | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | – | −1.00 |
| 40 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 41 | Rumble | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 42 | Sett | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 43 | Garen | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 44 | Darius | −0.84 | −1.00 | −1.00 | −1.00 | −0.05 | – | −1.00 |
| 45 | Volibear | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Trundle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Trundle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Trundle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Elise (net +1.52)

- **0.63** untargetable: Rappel makes Elise untargetable, dodging Trundle's Pillar of Ice. Untargetable for 0.6 s; Pillar of Ice takes 0.25 s to land, enough to react. (Elise E Rappel → Trundle E Pillar of Ice)
- **0.61** range: Elise's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Elise basic attacks → Trundle basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Trundle's Subjugate. Untargetable for 0.6 s; Subjugate takes 0.25 s to land, enough to react. (Elise E Rappel → Trundle R Subjugate)

#### 2. Sivir (net +1.36)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Sivir basic attacks → Trundle basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Trundle's Subjugate. Spell shield for 1.5 s, long enough to use ahead of Subjugate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Trundle R Subjugate)

#### 3. Bard (net +1.35)

- **0.62** range: Bard's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Bard basic attacks → Trundle basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Bard R Tempered Fate → Trundle R Subjugate)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Bard R Tempered Fate → Trundle E Pillar of Ice)

#### 4. Xayah (net +1.32)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Trundle's (525 vs 175 attack range). Trundle has no dash or blink to close the gap. (Xayah basic attacks → Trundle basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Subjugate. Untargetable for 1.5 s, long enough to use ahead of Subjugate. (Xayah R Featherstorm → Trundle R Subjugate)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Trundle's Pillar of Ice. Untargetable for 1.5 s, long enough to use ahead of Pillar of Ice. (Xayah R Featherstorm → Trundle E Pillar of Ice)

#### 5. Kayle (net +1.27)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Trundle's (625 vs 175 attack range). Trundle has no dash or blink to close the gap. (Kayle basic attacks → Trundle basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Trundle's Subjugate. Invulnerable for 2.5 s, long enough to use ahead of Subjugate. (Kayle R Divine Judgment → Trundle R Subjugate)

#### 6. Kindred (net +1.25)

- **0.81** range: Kindred's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Kindred basic attacks → Trundle basic attacks)
- **0.44** invulnerable: Lamb's Respite makes Kindred invulnerable to Trundle's Subjugate. Invulnerable for ?; Subjugate takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Trundle R Subjugate)

#### 7. Teemo (net +1.22)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Trundle's (500 vs 175 attack range). Trundle has no dash or blink to close the gap. (Teemo basic attacks → Trundle basic attacks)
- **0.54** blind: Blinding Dart's blind makes Trundle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Trundle basic attacks)
- **0.18** blind: Blinding Dart's blind makes Trundle's Chomp, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Trundle Q Chomp)

#### 8. Aurora (net +1.21)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Aurora basic attacks → Trundle basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Subjugate. Untargetable for 0.4 s; Subjugate takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle R Subjugate)
- **0.34** untargetable: Between Worlds makes Aurora untargetable, dodging Trundle's Pillar of Ice. Untargetable for 0.4 s; Pillar of Ice takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Trundle E Pillar of Ice)

#### 9. Vladimir (net +1.18)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2 s, long enough to use ahead of Pillar of Ice. (Vladimir W Sanguine Pool → Trundle E Pillar of Ice)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Trundle's Subjugate. Untargetable for 2 s, long enough to use ahead of Subjugate. (Vladimir W Sanguine Pool → Trundle R Subjugate)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Trundle's (450 vs 175 attack range). Trundle has no dash or blink to close the gap. (Vladimir basic attacks → Trundle basic attacks)
- Watch out: Pillar of Ice's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Lissandra (net +1.14)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Subjugate. Untargetable for 2.5 s, long enough to use ahead of Subjugate. (Lissandra R Frozen Tomb → Trundle R Subjugate)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Trundle's (550 vs 175 attack range). Trundle has no dash or blink to close the gap. (Lissandra basic attacks → Trundle basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Trundle's Pillar of Ice. Untargetable for 2.5 s, long enough to use ahead of Pillar of Ice. (Lissandra R Frozen Tomb → Trundle E Pillar of Ice)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.52 | 1.52 | 0.00 | range (attacks) |
| 2 | Sivir | +1.36 | 1.36 | 0.00 | range (attacks) |
| 3 | Bard | +1.35 | 1.35 | 0.00 | range (attacks) |
| 4 | Xayah | +1.32 | 1.32 | 0.00 | range (attacks) |
| 5 | Kayle | +1.27 | 1.27 | 0.00 | range (attacks) |
| 6 | Kindred | +1.25 | 1.25 | 0.00 | range (attacks) |
| 7 | Teemo | +1.22 | 1.22 | 0.00 | range (attacks), blind (Blinding Dart) |
| 8 | Aurora | +1.21 | 1.21 | 0.00 | range (attacks) |
| 9 | Vladimir | +1.18 | 1.25 | 0.07 |  |
| 10 | Lissandra | +1.14 | 1.14 | 0.00 |  |
| 11 | Yuumi | +1.13 | 1.52 | 0.39 | range (attacks) |
| 12 | Fiora | +1.07 | 1.07 | 0.00 |  |
| 13 | Lulu | +1.07 | 1.07 | 0.00 | range (attacks) |
| 14 | Morgana | +1.04 | 1.04 | 0.00 |  |
| 15 | Maokai | +0.98 | 0.98 | 0.00 |  |
| 16 | Gwen | +0.91 | 0.91 | 0.00 |  |
| 17 | Kalista | +0.87 | 0.87 | 0.00 | range (attacks) |
| 18 | Master Yi | +0.86 | 1.04 | 0.18 |  |
| 19 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 20 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 21 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 22 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 24 | Varus | +0.77 | 0.87 | 0.10 | range (attacks) |
| 25 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 26 | Ekko | +0.76 | 0.76 | 0.00 |  |
| 27 | Rek'Sai | +0.75 | 0.75 | 0.00 |  |
| 28 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 29 | Evelynn | +0.73 | 0.73 | 0.00 |  |
| 30 | Shaco | +0.73 | 0.73 | 0.00 |  |
| 31 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Camille | +0.70 | 0.70 | 0.00 |  |
| 36 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 37 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 38 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Zed | +0.65 | 0.65 | 0.00 |  |
| 40 | Corki | +0.63 | 0.63 | 0.00 | range (attacks) |
| 41 | Nocturne | +0.62 | 0.62 | 0.00 |  |
| 42 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 43 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Rengar | +0.60 | 0.60 | 0.00 |  |
| 47 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 48 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 49 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 50 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 52 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 53 | Jax | +0.53 | 0.53 | 0.00 | attack dodge (Counter Strike) |
| 54 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 55 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 58 | Kled | +0.51 | 0.51 | 0.00 |  |
| 59 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 60 | Singed | +0.51 | 0.51 | 0.00 |  |
| 61 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 62 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 63 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 64 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 66 | Xin Zhao | +0.48 | 0.48 | 0.00 |  |
| 67 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 68 | Pantheon | +0.47 | 0.55 | 0.08 |  |
| 69 | Azir | +0.47 | 0.47 | 0.00 |  |
| 70 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 71 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 72 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 73 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 74 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 75 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 76 | Annie | +0.44 | 0.44 | 0.00 |  |
| 77 | Taric | +0.44 | 0.44 | 0.00 |  |
| 78 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 79 | Nasus | +0.42 | 0.42 | 0.00 | attack speed slow (Wither) |
| 80 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 81 | Brand | +0.41 | 0.41 | 0.00 |  |
| 82 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 83 | Graves | +0.41 | 0.41 | 0.00 |  |
| 84 | Nami | +0.41 | 0.41 | 0.00 |  |
| 85 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 86 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 87 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 88 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 89 | Karma | +0.38 | 0.38 | 0.00 |  |
| 90 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 91 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 92 | Swain | +0.36 | 0.36 | 0.00 |  |
| 93 | Malzahar | +0.35 | 0.75 | 0.40 |  |
| 94 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 95 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 96 | Malphite | +0.34 | 0.34 | 0.00 |  |
| 97 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 98 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 99 | Alistar | +0.32 | 0.32 | 0.00 |  |
| 100 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 101 | Sion | +0.31 | 0.42 | 0.11 |  |
| 102 | Kayn | +0.28 | 0.73 | 0.45 |  |
| 103 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 104 | Garen | +0.25 | 0.25 | 0.00 |  |
| 105 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 106 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 107 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 108 | Warwick | +0.20 | 0.46 | 0.26 |  |
| 109 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 110 | Rammus | +0.19 | 0.41 | 0.22 | attack reflect (Defensive Ball Curl) |
| 111 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 112 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 113 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 114 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 115 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 116 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 117 | Mordekaiser | +0.10 | 0.10 | 0.00 |  |
| 118 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 119 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 120 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 121 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 122 | Sett | +0.07 | 0.07 | 0.00 |  |
| 123 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 124 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 125 | Yone | +0.07 | 0.07 | 0.00 |  |
| 126 | Shen | +0.06 | 0.51 | 0.45 | attack block (Spirit's Refuge) |
| 127 | Katarina | +0.06 | 0.34 | 0.28 |  |
| 128 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 129 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 130 | Akali | 0.00 | 0.00 | 0.00 |  |
| 131 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 132 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 133 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 134 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 135 | Braum | 0.00 | 0.00 | 0.00 |  |
| 136 | Briar | 0.00 | 0.00 | 0.00 |  |
| 137 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 138 | Darius | 0.00 | 0.00 | 0.00 |  |
| 139 | Diana | 0.00 | 0.00 | 0.00 |  |
| 140 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 141 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 142 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 143 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 144 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 145 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 146 | Leona | 0.00 | 0.00 | 0.00 |  |
| 147 | Locke | 0.00 | 0.00 | 0.00 |  |
| 148 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 149 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 150 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 151 | Rell | 0.00 | 0.00 | 0.00 |  |
| 152 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 153 | Riven | 0.00 | 0.00 | 0.00 |  |
| 154 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 155 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 156 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 157 | Talon | 0.00 | 0.00 | 0.00 |  |
| 158 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 159 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 160 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 161 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 162 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 163 | Viego | -0.11 | 0.07 | 0.18 |  |
| 164 | Pyke | -0.13 | 0.00 | 0.13 |  |
| 165 | Gragas | -0.14 | 0.00 | 0.14 |  |
| 166 | Galio | -0.17 | 0.00 | 0.17 |  |
| 167 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 168 | Nunu & Willump | -0.23 | 0.25 | 0.48 |  |
| 169 | Vi | -0.25 | 0.07 | 0.32 |  |
| 170 | Zac | -0.38 | 0.00 | 0.38 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
