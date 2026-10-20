# Counters to Renekton (patch 26.20)

## Simulated duels

The duel simulator played each of the 94 other champions with a simulator kit against Renekton: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Renekton wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Renekton --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 2 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 3 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.03 | – | +1.00 |
| 4 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 5 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 6 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 7 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 8 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 9 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 10 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 11 | Gangplank | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 12 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 13 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 14 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 15 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 16 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 17 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 18 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 19 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 20 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 21 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 22 | Volibear | +0.74 | +0.90 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 23 | Mordekaiser | +0.74 | +0.99 | +0.86 | +0.99 | +0.01 | – | +0.00 |
| 24 | Sivir | +0.56 | +0.02 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 25 | Quinn | +0.48 | +0.96 | +0.55 | +0.98 | +0.09 | −1.00 | +0.00 |
| 26 | Corki | +0.43 | +1.00 | +1.00 | −1.00 | +0.20 | +1.00 | +0.00 |
| 27 | Ashe | +0.43 | +1.00 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 28 | Gnar | +0.42 | +1.00 | +1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 29 | Teemo | +0.41 | +1.00 | +1.00 | −1.00 | +0.04 | +1.00 | +0.00 |
| 30 | Aurora | +0.32 | −1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 31 | Draven | +0.16 | +0.10 | +0.06 | +0.03 | +0.10 | +1.00 | +0.00 |
| 32 | Tahm Kench | +0.03 | +0.04 | +0.02 | +0.02 | +0.07 | – | +0.00 |
| 33 | Malphite | +0.01 | +0.03 | −0.02 | −0.01 | +0.09 | – | +0.00 |
| 34 | Tryndamere | +0.00 | +1.00 | −1.00 | +0.00 | +0.02 | – | +0.00 |
| 35 | Jinx | −0.04 | −1.00 | +0.00 | +1.00 | +0.10 | +0.00 | +0.00 |
| 36 | Singed | −0.07 | −0.10 | −0.12 | −0.09 | +0.04 | – | +0.00 |
| 37 | Ornn | −0.10 | −0.19 | −0.15 | −0.12 | +0.13 | – | +0.00 |
| 38 | Annie | −0.11 | −0.06 | −0.08 | −0.50 | +0.08 | +0.13 | +0.00 |
| 39 | Morgana | −0.15 | −0.09 | −0.50 | −0.04 | +0.10 | −0.06 | +0.00 |
| 40 | Zyra | −0.19 | −0.19 | −0.24 | −0.22 | −0.01 | −0.32 | +0.00 |
| 41 | Gwen | −0.20 | +1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 42 | Veigar | −0.21 | −0.28 | −0.24 | −0.25 | +0.02 | −0.28 | +0.00 |
| 43 | Anivia | −0.21 | −0.26 | −0.27 | −0.21 | −0.08 | −0.26 | +0.00 |
| 44 | Miss Fortune | −0.28 | +1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 45 | Kayle | −0.31 | +0.26 | −1.00 | −1.00 | +0.18 | +0.45 | +0.00 |
| 46 | Vel'Koz | −0.34 | −0.07 | −0.60 | −0.61 | +0.10 | −0.60 | +0.00 |
| 47 | Lux | −0.36 | −0.18 | −0.49 | −0.51 | +0.05 | −1.00 | +0.00 |
| 48 | Xayah | −0.38 | −1.00 | −1.00 | +1.00 | +0.15 | −1.00 | +0.00 |
| 49 | Shen | −0.44 | −1.00 | −0.57 | −0.10 | +0.09 | – | +0.00 |
| 50 | Brand | −0.48 | −0.09 | −1.00 | −1.00 | −0.00 | −0.06 | +0.00 |
| 51 | Heimerdinger | −0.55 | −1.00 | −0.03 | −1.00 | +0.06 | −1.00 | +0.00 |
| 52 | Tristana | −0.59 | −1.00 | −1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 53 | Sion | −0.64 | −1.00 | −0.50 | −1.00 | +0.01 | – | +0.00 |
| 54 | Ezreal | −0.67 | −0.78 | −0.79 | −0.90 | +0.04 | −1.00 | +0.00 |
| 55 | Rumble | −0.68 | −0.65 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 56 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.00 |
| 57 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 58 | Warwick | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 59 | Skarner | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 60 | Yasuo | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 61 | Wukong | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 62 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 63 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 64 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 65 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 66 | Riven | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 67 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 68 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 69 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 70 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 71 | Master Yi | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 72 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 73 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 74 | Kai'Sa | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 75 | Jhin | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 76 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 77 | Smolder | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 78 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 79 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 80 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 81 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 82 | Udyr | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 83 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 84 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 85 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −0.92 | +0.00 |
| 86 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 87 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 88 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 89 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 90 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 91 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 92 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 93 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 94 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |

## Interaction ledger estimates

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

- **0.46** blind: Blinding Dart's blind makes Renekton's Ruthless Predator, an empowered attack, miss. Blind for 3 s. Even if empowered Ruthless Predator is blocked by a spell shield, it will still destroy any existing damage shields on the target. (Teemo Q Blinding Dart → Renekton W Ruthless Predator)
- **0.43** blind: Blinding Dart's blind makes Renekton's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Renekton basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Teemo basic attacks → Renekton basic attacks)

#### 3. Xayah (net +1.02)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Renekton's Dominus. Untargetable for 1.5 s, long enough to use ahead of Dominus. (Xayah R Featherstorm → Renekton R Dominus)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Renekton's (525 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Xayah basic attacks → Renekton basic attacks)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Renekton's Ruthless Predator. Untargetable for 1.5 s, long enough to use ahead of Ruthless Predator. (Xayah R Featherstorm → Renekton W Ruthless Predator)

#### 4. Kayle (net +0.99)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Renekton's Dominus. Invulnerable for 2.5 s, long enough to use ahead of Dominus. (Kayle R Divine Judgment → Renekton R Dominus)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Renekton's (625 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Kayle basic attacks → Renekton basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Renekton's Ruthless Predator (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ruthless Predator. (Kayle R Divine Judgment → Renekton W Ruthless Predator)

#### 5. Lissandra (net +0.98)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renekton's Dominus. Untargetable for 2.5 s, long enough to use ahead of Dominus. (Lissandra R Frozen Tomb → Renekton R Dominus)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Renekton's Ruthless Predator. Untargetable for 2.5 s, long enough to use ahead of Ruthless Predator. (Lissandra R Frozen Tomb → Renekton W Ruthless Predator)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Renekton's (550 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Lissandra basic attacks → Renekton basic attacks)

#### 6. Sivir (net +0.94)

- **0.47** range: Sivir's basic attacks reach 375 units farther than Renekton's (500 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Sivir basic attacks → Renekton basic attacks)
- **0.47** spell shield: Spell Shield's spell shield blocks Renekton's Ruthless Predator. Spell shield for 1.5 s, long enough to use ahead of Ruthless Predator. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Renekton W Ruthless Predator)

#### 7. Vladimir (net +0.89)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Renekton's Dominus. Untargetable for 2 s, long enough to use ahead of Dominus. (Vladimir W Sanguine Pool → Renekton R Dominus)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Renekton's Ruthless Predator. Untargetable for 2 s, long enough to use ahead of Ruthless Predator. (Vladimir W Sanguine Pool → Renekton W Ruthless Predator)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Renekton's (450 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Vladimir basic attacks → Renekton basic attacks)
- Watch out: Ruthless Predator's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 8. Aurora (net +0.87)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Renekton's Dominus. Untargetable for 0.4 s; Dominus takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Renekton R Dominus)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Renekton's (550 vs 125 attack range). Renekton closes the gap with Slice and Dice. (Aurora basic attacks → Renekton basic attacks)
- **0.19** untargetable: Between Worlds makes Aurora untargetable, dodging Renekton's Ruthless Predator. Untargetable for 0.4 s; Ruthless Predator lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Renekton W Ruthless Predator)

#### 9. Jax (net +0.83)

- **0.65** attack dodge: Counter Strike dodges Renekton's Ruthless Predator, an empowered attack. Counter Strike lasts 2 s on a 9 s cooldown. Even if empowered Ruthless Predator is blocked by a spell shield, it will still destroy any existing damage shields on the target. (Jax E Counter Strike → Renekton W Ruthless Predator)
- **0.35** attack dodge: Counter Strike dodges Renekton's basic attacks (with Reign of Anger). Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Renekton basic attacks)

#### 10. Fiora (net +0.77)

- **0.55** parry: Riposte parries Renekton's Dominus. Parry for 0.75 s; Dominus takes 0.25 s to land, enough to react. (Fiora W Riposte → Renekton R Dominus)
- **0.39** parry: Riposte parries Renekton's Ruthless Predator and stuns back. Parry for 0.75 s; Ruthless Predator lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Ruthless Predator's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Renekton W Ruthless Predator)
- **0.08** attack speed slow: Riposte cuts Renekton's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Renekton basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.07 | 1.07 | 0.00 |  |
| 2 | Teemo | +1.02 | 1.02 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 3 | Xayah | +1.02 | 1.02 | 0.00 |  |
| 4 | Kayle | +0.99 | 0.99 | 0.00 |  |
| 5 | Lissandra | +0.98 | 0.98 | 0.00 |  |
| 6 | Sivir | +0.94 | 0.94 | 0.00 |  |
| 7 | Vladimir | +0.89 | 0.98 | 0.09 |  |
| 8 | Aurora | +0.87 | 0.87 | 0.00 |  |
| 9 | Jax | +0.83 | 0.83 | 0.00 | attack dodge (Counter Strike) |
| 10 | Fiora | +0.77 | 0.77 | 0.00 |  |
| 11 | Fizz | +0.76 | 0.76 | 0.00 |  |
| 12 | Maokai | +0.74 | 0.74 | 0.00 |  |
| 13 | Milio | +0.72 | 0.72 | 0.00 |  |
| 14 | Nilah | +0.71 | 0.71 | 0.00 | attack dodge (Jubilant Veil) |
| 15 | Rek'Sai | +0.71 | 0.71 | 0.00 |  |
| 16 | Udyr | +0.70 | 0.70 | 0.00 |  |
| 17 | Gwen | +0.69 | 0.69 | 0.00 |  |
| 18 | Jinx | +0.69 | 0.69 | 0.00 | dash stop (Flame Chompers!) |
| 19 | Morgana | +0.68 | 0.68 | 0.00 |  |
| 20 | Yuumi | +0.66 | 1.08 | 0.42 |  |
| 21 | Lulu | +0.66 | 0.66 | 0.00 |  |
| 22 | Singed | +0.66 | 0.66 | 0.00 |  |
| 23 | Viktor | +0.66 | 0.66 | 0.00 |  |
| 24 | Evelynn | +0.65 | 0.65 | 0.00 |  |
| 25 | Shaco | +0.65 | 0.65 | 0.00 |  |
| 26 | Hwei | +0.63 | 0.63 | 0.00 | dash stop (Grim Visage) |
| 27 | Camille | +0.61 | 0.61 | 0.00 |  |
| 28 | Cassiopeia | +0.60 | 0.60 | 0.00 |  |
| 29 | Ahri | +0.58 | 0.58 | 0.00 |  |
| 30 | Vex | +0.58 | 0.58 | 0.00 |  |
| 31 | Kalista | +0.57 | 0.57 | 0.00 |  |
| 32 | Veigar | +0.57 | 0.57 | 0.00 |  |
| 33 | Zed | +0.57 | 0.57 | 0.00 |  |
| 34 | Nocturne | +0.56 | 0.56 | 0.00 |  |
| 35 | Xin Zhao | +0.56 | 0.56 | 0.00 |  |
| 36 | Rengar | +0.49 | 0.49 | 0.00 |  |
| 37 | Kindred | +0.47 | 0.47 | 0.00 |  |
| 38 | Master Yi | +0.46 | 0.69 | 0.23 |  |
| 39 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 40 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 41 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 42 | Gangplank | +0.42 | 0.42 | 0.00 |  |
| 43 | Sona | +0.41 | 0.41 | 0.00 |  |
| 44 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 45 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 46 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 47 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 48 | Draven | +0.36 | 0.36 | 0.00 |  |
| 49 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 50 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 51 | Malzahar | +0.35 | 0.75 | 0.40 |  |
| 52 | Shen | +0.34 | 0.79 | 0.45 | attack block (Spirit's Refuge) |
| 53 | Varus | +0.34 | 0.45 | 0.11 |  |
| 54 | Gnar | +0.33 | 0.33 | 0.00 |  |
| 55 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 56 | Corki | +0.32 | 0.32 | 0.00 |  |
| 57 | Elise | +0.32 | 0.32 | 0.00 |  |
| 58 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 59 | Kled | +0.32 | 0.32 | 0.00 |  |
| 60 | Olaf | +0.32 | 0.32 | 0.00 |  |
| 61 | Senna | +0.32 | 0.32 | 0.00 |  |
| 62 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 63 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 64 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 65 | Poppy | +0.30 | 0.50 | 0.20 | dash stop (Steadfast Presence) |
| 66 | Jayce | +0.30 | 0.30 | 0.00 |  |
| 67 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 68 | Samira | +0.30 | 0.30 | 0.00 |  |
| 69 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 70 | Lux | +0.29 | 0.29 | 0.00 |  |
| 71 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 72 | Azir | +0.27 | 0.27 | 0.00 |  |
| 73 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 74 | Mel | +0.27 | 0.27 | 0.00 |  |
| 75 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 76 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 77 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 78 | Alistar | +0.26 | 0.26 | 0.00 |  |
| 79 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 80 | Graves | +0.24 | 0.24 | 0.00 |  |
| 81 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 82 | Annie | +0.22 | 0.22 | 0.00 |  |
| 83 | Brand | +0.22 | 0.22 | 0.00 |  |
| 84 | Karma | +0.22 | 0.22 | 0.00 |  |
| 85 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 86 | Nami | +0.22 | 0.22 | 0.00 |  |
| 87 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 88 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 89 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 90 | Swain | +0.21 | 0.21 | 0.00 |  |
| 91 | Kayn | +0.20 | 0.65 | 0.45 |  |
| 92 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 93 | Sion | +0.19 | 0.34 | 0.15 |  |
| 94 | Thresh | +0.19 | 0.19 | 0.00 |  |
| 95 | Yone | +0.19 | 0.19 | 0.00 |  |
| 96 | Zaahen | +0.19 | 0.19 | 0.00 |  |
| 97 | Quinn | +0.18 | 0.38 | 0.20 |  |
| 98 | Amumu | +0.18 | 0.18 | 0.00 |  |
| 99 | Garen | +0.18 | 0.18 | 0.00 |  |
| 100 | Pantheon | +0.16 | 0.67 | 0.51 |  |
| 101 | Urgot | +0.15 | 0.15 | 0.00 |  |
| 102 | Aurelion Sol | +0.13 | 0.22 | 0.09 |  |
| 103 | Rakan | +0.13 | 0.13 | 0.00 |  |
| 104 | Lillia | +0.11 | 0.11 | 0.00 |  |
| 105 | Twisted Fate | +0.08 | 0.43 | 0.35 |  |
| 106 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 107 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 108 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 109 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 110 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 111 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 112 | Ivern | +0.04 | 0.19 | 0.15 |  |
| 113 | Rammus | +0.02 | 0.32 | 0.30 |  |
| 114 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 115 | Akali | 0.00 | 0.00 | 0.00 |  |
| 116 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 117 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 118 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 119 | Braum | 0.00 | 0.00 | 0.00 |  |
| 120 | Briar | 0.00 | 0.00 | 0.00 |  |
| 121 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 122 | Darius | 0.00 | 0.00 | 0.00 |  |
| 123 | Diana | 0.00 | 0.00 | 0.00 |  |
| 124 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 125 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 126 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 127 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 128 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 129 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 130 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 131 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 132 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 136 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 137 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 138 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 139 | Rell | 0.00 | 0.00 | 0.00 |  |
| 140 | Riven | 0.00 | 0.00 | 0.00 |  |
| 141 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 142 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 143 | Sett | 0.00 | 0.00 | 0.00 |  |
| 144 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 145 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 146 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 147 | Talon | 0.00 | 0.00 | 0.00 |  |
| 148 | Taric | 0.00 | 0.00 | 0.00 |  |
| 149 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 150 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 151 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 152 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 153 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 154 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 155 | Vel'Koz | -0.01 | 0.27 | 0.28 |  |
| 156 | Janna | -0.04 | 0.36 | 0.40 |  |
| 157 | Xerath | -0.06 | 0.27 | 0.33 |  |
| 158 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 159 | Zac | -0.10 | 0.40 | 0.50 | dash stop (Stretching Strikes) |
| 160 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 161 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 162 | Viego | -0.16 | 0.09 | 0.25 |  |
| 163 | Gragas | -0.17 | 0.00 | 0.17 |  |
| 164 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 165 | Taliyah | -0.21 | 0.27 | 0.48 |  |
| 166 | Fiddlesticks | -0.27 | 0.20 | 0.47 |  |
| 167 | Warwick | -0.37 | 0.30 | 0.67 |  |
| 168 | Vi | -0.43 | 0.00 | 0.43 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
