# Counters to Renekton (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 37 other champions with a simulator kit against Renekton: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Renekton wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Renekton --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.06 | – | +1.00 |
| 2 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 3 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 4 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 5 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 6 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 8 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 9 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 10 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 11 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 12 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 13 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 14 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 15 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 16 | Camille | +0.50 | +0.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 17 | Nasus | +0.09 | +0.12 | +0.14 | +0.09 | −0.00 | – | +0.00 |
| 18 | Malphite | +0.08 | +0.08 | +0.08 | +0.07 | +0.11 | – | +0.00 |
| 19 | Shen | +0.06 | +0.09 | +0.09 | −0.02 | +0.07 | – | +0.00 |
| 20 | Ornn | −0.05 | −0.09 | −0.09 | −0.10 | +0.12 | – | +0.00 |
| 21 | Singed | −0.10 | −0.14 | −0.12 | −0.12 | −0.01 | – | +0.00 |
| 22 | Garen | −0.21 | +1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 23 | Yone | −0.22 | +1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 24 | Urgot | −0.55 | −0.09 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 25 | Sett | −0.57 | −1.00 | −1.00 | −0.04 | −0.02 | – | +0.00 |
| 26 | Aurora | −0.66 | −1.00 | −1.00 | −1.00 | +0.22 | +0.10 | +0.00 |
| 27 | Kayle | −0.73 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | +0.00 |
| 28 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 29 | Yasuo | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 30 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 31 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 32 | Quinn | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 33 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 34 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 35 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 36 | Tryndamere | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 37 | Kennen | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Renekton's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Renekton's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Renekton` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Bard (net +1.07)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Renekton's Dominus. Untargetable for 2.5 s, long enough to use ahead of Dominus. (Bard R Tempered Fate → Renekton R Dominus)
- **0.36** range: Bard's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Bard basic attacks → Renekton basic attacks)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Renekton's Ruthless Predator. Untargetable for 2.5 s, long enough to use ahead of Ruthless Predator. (Bard R Tempered Fate → Renekton W Ruthless Predator)

#### 2. Teemo (net +1.02)

- **0.46** blind: Blinding Dart's blind makes Renekton's Ruthless Predator, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Renekton W Ruthless Predator)
- **0.43** blind: Blinding Dart's blind makes Renekton's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Renekton basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Teemo basic attacks → Renekton basic attacks)

#### 3. Xayah (net +1.02)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Renekton's Dominus. Untargetable for 1.5 s, long enough to use ahead of Dominus. (Xayah R Featherstorm → Renekton R Dominus)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Renekton's (525 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Xayah basic attacks → Renekton basic attacks)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Renekton's Ruthless Predator. Untargetable for 1.5 s, long enough to use ahead of Ruthless Predator. (Xayah R Featherstorm → Renekton W Ruthless Predator)

#### 4. Elise (net +1.01)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Renekton's Dominus. Untargetable for 0.6 s; Dominus takes 0.25 s to land, enough to react. (Elise E Rappel → Renekton R Dominus)
- **0.32** range: Elise's basic attacks reach 425 units farther than Renekton's (550 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Elise basic attacks → Renekton basic attacks)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Renekton's Ruthless Predator. Untargetable for 0.6 s; Ruthless Predator lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Renekton W Ruthless Predator)

#### 5. Kayle (net +0.99)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Renekton's Dominus. Invulnerable for 2.5 s, long enough to use ahead of Dominus. (Kayle R Divine Judgment → Renekton R Dominus)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Renekton's (625 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Kayle basic attacks → Renekton basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Renekton's Ruthless Predator (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ruthless Predator. (Kayle R Divine Judgment → Renekton W Ruthless Predator)

#### 6. Lissandra (net +0.98)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renekton's Dominus. Untargetable for 2.5 s, long enough to use ahead of Dominus. (Lissandra R Frozen Tomb → Renekton R Dominus)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renekton's Ruthless Predator. Untargetable for 2.5 s, long enough to use ahead of Ruthless Predator. (Lissandra R Frozen Tomb → Renekton W Ruthless Predator)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Renekton's (550 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Lissandra basic attacks → Renekton basic attacks)

#### 7. Kindred (net +0.96)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Kindred basic attacks → Renekton basic attacks)
- **0.44** invulnerable: Lamb's Respite makes Kindred invulnerable to Renekton's Dominus. Invulnerable for ?; Dominus takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Renekton R Dominus)
- **0.09** invulnerable: Lamb's Respite makes Kindred invulnerable to Renekton's Ruthless Predator (its crowd control still applies). Invulnerable for ?; Ruthless Predator lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kindred R Lamb's Respite → Renekton W Ruthless Predator)

#### 8. Sivir (net +0.94)

- **0.47** range: Sivir's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Sivir basic attacks → Renekton basic attacks)
- **0.47** spell shield: Spell Shield's spell shield blocks Renekton's Ruthless Predator. Spell shield for 1.5 s, long enough to use ahead of Ruthless Predator. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Renekton W Ruthless Predator)

#### 9. Vladimir (net +0.89)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Renekton's Dominus. Untargetable for 2 s, long enough to use ahead of Dominus. (Vladimir W Sanguine Pool → Renekton R Dominus)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Renekton's Ruthless Predator. Untargetable for 2 s, long enough to use ahead of Ruthless Predator. (Vladimir W Sanguine Pool → Renekton W Ruthless Predator)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Renekton's (450 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Vladimir basic attacks → Renekton basic attacks)
- Watch out: Ruthless Predator's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 10. Aurora (net +0.87)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Renekton's Dominus. Untargetable for 0.4 s; Dominus takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Renekton R Dominus)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Renekton's (550 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Aurora basic attacks → Renekton basic attacks)
- **0.19** untargetable: Between Worlds makes Aurora untargetable, dodging Renekton's Ruthless Predator. Untargetable for 0.4 s; Ruthless Predator lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Renekton W Ruthless Predator)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.07 | 1.07 | 0.00 |  |
| 2 | Teemo | +1.02 | 1.02 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 3 | Xayah | +1.02 | 1.02 | 0.00 |  |
| 4 | Elise | +1.01 | 1.01 | 0.00 |  |
| 5 | Kayle | +0.99 | 0.99 | 0.00 |  |
| 6 | Lissandra | +0.98 | 0.98 | 0.00 |  |
| 7 | Kindred | +0.96 | 0.96 | 0.00 |  |
| 8 | Sivir | +0.94 | 0.94 | 0.00 |  |
| 9 | Vladimir | +0.89 | 0.98 | 0.09 |  |
| 10 | Aurora | +0.87 | 0.87 | 0.00 |  |
| 11 | Jax | +0.83 | 0.83 | 0.00 | attack dodge (Counter Strike) |
| 12 | Fiora | +0.77 | 0.77 | 0.00 |  |
| 13 | Maokai | +0.74 | 0.74 | 0.00 |  |
| 14 | Milio | +0.72 | 0.72 | 0.00 |  |
| 15 | Nilah | +0.71 | 0.71 | 0.00 | attack dodge (Jubilant Veil) |
| 16 | Rek'Sai | +0.71 | 0.71 | 0.00 |  |
| 17 | Udyr | +0.70 | 0.70 | 0.00 |  |
| 18 | Gwen | +0.69 | 0.69 | 0.00 |  |
| 19 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 20 | Morgana | +0.68 | 0.68 | 0.00 |  |
| 21 | Yuumi | +0.66 | 1.08 | 0.42 |  |
| 22 | Ekko | +0.66 | 0.66 | 0.00 |  |
| 23 | Lulu | +0.66 | 0.66 | 0.00 |  |
| 24 | Singed | +0.66 | 0.66 | 0.00 |  |
| 25 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 26 | Evelynn | +0.65 | 0.65 | 0.00 |  |
| 27 | Shaco | +0.65 | 0.65 | 0.00 |  |
| 28 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 29 | Camille | +0.61 | 0.61 | 0.00 |  |
| 30 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 31 | Ahri | +0.58 | 0.58 | 0.00 |  |
| 32 | Vex | +0.58 | 0.58 | 0.00 |  |
| 33 | Kalista | +0.57 | 0.57 | 0.00 |  |
| 34 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 35 | Zed | +0.57 | 0.57 | 0.00 |  |
| 36 | Pantheon | +0.56 | 0.67 | 0.11 |  |
| 37 | Nocturne | +0.56 | 0.56 | 0.00 |  |
| 38 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 39 | Taric | +0.52 | 0.52 | 0.00 |  |
| 40 | Rengar | +0.49 | 0.49 | 0.00 |  |
| 41 | Master Yi | +0.46 | 0.69 | 0.23 |  |
| 42 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 43 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 44 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 45 | Gangplank | +0.42 | 0.42 | 0.00 |  |
| 46 | Sona | +0.41 | 0.41 | 0.00 |  |
| 47 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 48 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 49 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 50 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 51 | Draven | +0.36 | 0.36 | 0.00 |  |
| 52 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 53 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 54 | Malzahar | +0.35 | 0.75 | 0.40 |  |
| 55 | Shen | +0.34 | 0.79 | 0.45 | attack block (Spirit's Refuge) |
| 56 | Varus | +0.34 | 0.45 | 0.11 |  |
| 57 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 58 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 59 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 60 | Kled | +0.32 | 0.32 | 0.00 |  |
| 61 | Olaf | +0.32 | 0.32 | 0.00 |  |
| 62 | Senna | +0.32 | 0.32 | 0.00 |  |
| 63 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 64 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 65 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 66 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 67 | Corki | +0.30 | 0.30 | 0.00 |  |
| 68 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 69 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 70 | Samira | +0.30 | 0.30 | 0.00 |  |
| 71 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 72 | Lux | +0.29 | 0.29 | 0.00 |  |
| 73 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 74 | Azir | +0.27 | 0.27 | 0.00 |  |
| 75 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 76 | Mel | +0.27 | 0.27 | 0.00 |  |
| 77 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 78 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 79 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 80 | Alistar | +0.26 | 0.26 | 0.00 |  |
| 81 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 82 | Graves | +0.24 | 0.24 | 0.00 |  |
| 83 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 84 | Annie | +0.22 | 0.22 | 0.00 |  |
| 85 | Brand | +0.22 | 0.22 | 0.00 |  |
| 86 | Karma | +0.22 | 0.22 | 0.00 |  |
| 87 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 88 | Nami | +0.22 | 0.22 | 0.00 |  |
| 89 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 90 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 91 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 92 | Swain | +0.21 | 0.21 | 0.00 |  |
| 93 | Kayn | +0.20 | 0.65 | 0.45 |  |
| 94 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 95 | Sion | +0.19 | 0.34 | 0.15 |  |
| 96 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 97 | Yone | +0.19 | 0.19 | 0.00 |  |
| 98 | Zaahen | +0.19 | 0.19 | 0.00 |  |
| 99 | Quinn | +0.18 | 0.38 | 0.20 |  |
| 100 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 101 | Garen | +0.18 | 0.18 | 0.00 |  |
| 102 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 103 | Aurelion Sol | +0.13 | 0.22 | 0.09 |  |
| 104 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 105 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 106 | Twisted Fate | +0.08 | 0.43 | 0.35 |  |
| 107 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 108 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 109 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 110 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 111 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 112 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 113 | Ivern | +0.04 | 0.19 | 0.15 |  |
| 114 | Rammus | +0.02 | 0.32 | 0.30 |  |
| 115 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 116 | Akali | 0.00 | 0.00 | 0.00 |  |
| 117 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 118 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Braum | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 127 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 128 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 129 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 130 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 131 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 132 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 133 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 134 | Leona | 0.00 | 0.00 | 0.00 |  |
| 135 | Locke | 0.00 | 0.00 | 0.00 |  |
| 136 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 137 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 138 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 139 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 140 | Rell | 0.00 | 0.00 | 0.00 |  |
| 141 | Riven | 0.00 | 0.00 | 0.00 |  |
| 142 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 143 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 144 | Sett | 0.00 | 0.00 | 0.00 |  |
| 145 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 146 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 147 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 148 | Talon | 0.00 | 0.00 | 0.00 |  |
| 149 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 150 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 151 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 152 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 153 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 154 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 155 | Vel'Koz | -0.01 | 0.27 | 0.28 |  |
| 156 | Janna | -0.04 | 0.36 | 0.40 |  |
| 157 | Warwick | -0.04 | 0.30 | 0.34 |  |
| 158 | Xerath | -0.06 | 0.27 | 0.33 |  |
| 159 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 160 | Zac | -0.10 | 0.40 | 0.50 | dash stop (Stretching Strikes) |
| 161 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 162 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 163 | Viego | -0.16 | 0.09 | 0.25 |  |
| 164 | Gragas | -0.17 | 0.00 | 0.17 |  |
| 165 | Galio | -0.18 | 0.00 | 0.18 |  |
| 166 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 167 | Taliyah | -0.21 | 0.27 | 0.48 |  |
| 168 | Fiddlesticks | -0.27 | 0.20 | 0.47 |  |
| 169 | Vi | -0.43 | 0.00 | 0.43 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
