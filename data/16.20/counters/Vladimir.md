# Counters to Vladimir (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Vladimir: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Vladimir wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Vladimir --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +1.00 |
| 2 | Skarner | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 3 | Urgot | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 4 | Nautilus | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 5 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 6 | Gwen | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 7 | Gnar | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 8 | Dr. Mundo | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 9 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 10 | Amumu | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 11 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 12 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 13 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 14 | Tahm Kench | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 15 | Sion | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 16 | Aurora | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 17 | Aatrox | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 18 | Mordekaiser | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 19 | Zaahen | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 20 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 21 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 22 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 23 | Irelia | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 24 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 25 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 26 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 27 | Illaoi | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 28 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 29 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 30 | Leona | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 31 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 32 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 33 | Renekton | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 34 | Volibear | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 35 | Akali | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 36 | Kassadin | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 37 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 38 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 39 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 40 | Darius | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 41 | Rumble | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 42 | Kennen | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +0.98 | +0.00 |
| 43 | Yone | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 44 | Singed | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 45 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 46 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 47 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 48 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 49 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 50 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 51 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 52 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 53 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 54 | Udyr | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 55 | Malzahar | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 56 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 57 | Vel'Koz | +0.68 | +0.98 | +0.88 | +0.56 | +0.27 | – | +0.00 |
| 58 | Ziggs | +0.42 | +1.00 | +0.53 | +0.02 | +0.19 | +0.06 | +0.00 |
| 59 | Shen | +0.30 | +0.11 | +0.11 | +0.53 | +0.26 | +1.00 | +0.00 |
| 60 | Brand | +0.28 | +0.03 | +0.52 | +0.51 | +0.08 | +0.31 | +0.00 |
| 61 | Zyra | +0.19 | +0.33 | +0.30 | +0.01 | +0.13 | +0.15 | +0.00 |
| 62 | Anivia | +0.14 | +0.14 | +0.16 | +0.11 | +0.04 | +0.32 | +0.00 |
| 63 | Heimerdinger | +0.14 | +0.01 | +0.45 | +0.04 | +0.08 | +0.02 | +0.00 |
| 64 | Annie | +0.13 | +0.12 | +0.16 | +0.07 | +0.16 | +0.19 | +0.00 |
| 65 | Ornn | +0.13 | +0.14 | +0.16 | +0.14 | +0.07 | +0.13 | +0.00 |
| 66 | Veigar | +0.02 | −0.02 | +0.05 | −0.01 | +0.09 | +0.00 | +0.00 |
| 67 | Karthus | +0.01 | −0.02 | +0.04 | −0.05 | +0.08 | – | +0.00 |
| 68 | Lux | −0.01 | +0.00 | +0.70 | −0.86 | +0.14 | −0.35 | +0.00 |
| 69 | Lissandra | −0.27 | −1.00 | −0.02 | −0.13 | +0.05 | +0.02 | +0.00 |
| 70 | Ahri | −0.58 | −1.00 | −0.46 | −1.00 | +0.16 | −0.38 | +0.00 |
| 71 | Morgana | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 72 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Vladimir's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vladimir's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vladimir` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Kayle (net +0.69)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Vladimir's Hemoplague. Invulnerable for 2.5 s, long enough to use ahead of Hemoplague. (Kayle R Divine Judgment → Vladimir R Hemoplague)
- **0.32** range: Kayle's basic attacks reach 175 units farther than Vladimir's (625 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Kayle basic attacks → Vladimir basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Vladimir's Transfusion. Invulnerable for 2.5 s, long enough to use ahead of Transfusion. (Kayle R Divine Judgment → Vladimir Q Transfusion)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Kayle's Starfire Spellblade.

#### 2. Sivir (net +0.41)

- **0.28** spell shield: Spell Shield's spell shield blocks part of Vladimir's Hemoplague. Spell shield for 1.5 s, long enough to use ahead of Hemoplague. A spell shield blocks only the first enemy ability that reaches it. Spell shield does not negate the detonation. (Sivir E Spell Shield → Vladimir R Hemoplague)
- **0.25** spell shield: Spell Shield's spell shield blocks Vladimir's Transfusion. Spell shield for 1.5 s, long enough to use ahead of Transfusion. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vladimir Q Transfusion)

#### 3. Yunara (net +0.22)

- **0.22** range: Yunara's basic attacks reach 125 units farther than Vladimir's (575 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Yunara basic attacks → Vladimir basic attacks)

#### 4. Twitch (net +0.21)

- **0.21** range: Twitch's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Twitch basic attacks → Vladimir basic attacks)

#### 5. Kai'Sa (net +0.14)

- **0.14** range: Kai'Sa's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Kai'Sa basic attacks → Vladimir basic attacks)

#### 6. Yuumi (net +0.07)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Vladimir's Transfusion. Untargetable for ?; Transfusion takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vladimir Q Transfusion)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Vladimir's Hemoplague. Untargetable for ?; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Vladimir R Hemoplague)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Yuumi's Final Chapter.

#### 7. Xayah (net -0.01)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Vladimir's Hemoplague. Untargetable for 1.5 s, long enough to use ahead of Hemoplague. (Xayah R Featherstorm → Vladimir R Hemoplague)
- **0.19** untargetable: Featherstorm makes Xayah untargetable, dodging Vladimir's Transfusion. Untargetable for 1.5 s, long enough to use ahead of Transfusion. (Xayah R Featherstorm → Vladimir Q Transfusion)
- **0.14** range: Xayah's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Xayah basic attacks → Vladimir basic attacks)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Xayah's Featherstorm.

#### 8. Aurora (net -0.13)

- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Vladimir's Hemoplague. Untargetable for 0.4 s; Hemoplague lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Vladimir R Hemoplague)
- **0.19** untargetable: Between Worlds makes Aurora untargetable, dodging Vladimir's Transfusion. Untargetable for 0.4 s; Transfusion takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Vladimir Q Transfusion)
- **0.14** range: Aurora's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Aurora basic attacks → Vladimir basic attacks)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Aurora's Between Worlds.

#### 9. Tryndamere (net -0.15)

- No interaction in Tryndamere's favor.
- Watch out: Vladimir's basic attacks reach 275 units farther than Tryndamere's (450 vs 175 attack range).

#### 10. Twisted Fate (net -0.18)

- **0.16** range: Twisted Fate's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range). Vladimir has no dash or blink to close the gap. (Twisted Fate basic attacks → Vladimir basic attacks)
- **0.10** interrupt: Pick a Card's stun interrupts Vladimir's Tides of Blood (charge-up). Pick a Card must land during the charge-up. Vladimir can release Tides of Blood early instead of charging it fully. (Twisted Fate W Pick a Card → Vladimir E Tides of Blood)
- Watch out: Sanguine Pool makes Vladimir untargetable, dodging Twisted Fate's Pick a Card.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.69 | 0.97 | 0.28 |  |
| 2 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 3 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 4 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 5 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 6 | Yuumi | +0.07 | 0.62 | 0.55 |  |
| 7 | Xayah | -0.01 | 0.79 | 0.80 |  |
| 8 | Aurora | -0.13 | 0.57 | 0.70 |  |
| 9 | Tryndamere | -0.15 | 0.00 | 0.15 |  |
| 10 | Twisted Fate | -0.18 | 0.26 | 0.44 |  |
| 11 | Bard | -0.22 | 0.66 | 0.88 |  |
| 12 | Gwen | -0.25 | 0.46 | 0.71 |  |
| 13 | Milio | -0.25 | 0.29 | 0.54 |  |
| 14 | Varus | -0.27 | 0.53 | 0.80 |  |
| 15 | Lissandra | -0.28 | 0.77 | 1.05 |  |
| 16 | Kog'Maw | -0.28 | 0.00 | 0.28 |  |
| 17 | Fiora | -0.29 | 0.47 | 0.76 |  |
| 18 | Zilean | -0.30 | 0.25 | 0.55 |  |
| 19 | Kindred | -0.32 | 0.00 | 0.32 |  |
| 20 | Zeri | -0.33 | 0.22 | 0.55 |  |
| 21 | Braum | -0.34 | 0.64 | 0.98 |  |
| 22 | Kayn | -0.34 | 0.51 | 0.85 |  |
| 23 | Master Yi | -0.40 | 0.55 | 0.95 |  |
| 24 | Tristana | -0.41 | 0.50 | 0.91 |  |
| 25 | Teemo | -0.41 | 0.29 | 0.70 |  |
| 26 | Samira | -0.41 | 0.26 | 0.67 |  |
| 27 | Nidalee | -0.41 | 0.11 | 0.52 |  |
| 28 | Zoe | -0.42 | 0.23 | 0.65 |  |
| 29 | Singed | -0.43 | 0.62 | 1.05 |  |
| 30 | Mel | -0.43 | 0.38 | 0.81 |  |
| 31 | LeBlanc | -0.43 | 0.08 | 0.51 |  |
| 32 | Caitlyn | -0.46 | 0.36 | 0.82 |  |
| 33 | Ashe | -0.48 | 0.32 | 0.80 |  |
| 34 | Vayne | -0.49 | 0.28 | 0.77 |  |
| 35 | Soraka | -0.50 | 0.20 | 0.70 |  |
| 36 | Vex | -0.50 | 0.20 | 0.70 |  |
| 37 | Rek'Sai | -0.52 | 0.76 | 1.28 |  |
| 38 | Katarina | -0.52 | 0.36 | 0.88 |  |
| 39 | Heimerdinger | -0.52 | 0.34 | 0.86 |  |
| 40 | Miss Fortune | -0.53 | 0.16 | 0.69 |  |
| 41 | Smolder | -0.54 | 0.16 | 0.70 |  |
| 42 | Ryze | -0.54 | 0.12 | 0.66 |  |
| 43 | Kennen | -0.55 | 0.22 | 0.77 |  |
| 44 | Ezreal | -0.55 | 0.16 | 0.71 |  |
| 45 | Akshan | -0.55 | 0.00 | 0.55 |  |
| 46 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 47 | Elise | -0.56 | 0.24 | 0.80 |  |
| 48 | Olaf | -0.57 | 0.09 | 0.66 |  |
| 49 | Zed | -0.59 | 0.43 | 1.02 |  |
| 50 | Corki | -0.59 | 0.23 | 0.82 |  |
| 51 | Quinn | -0.59 | 0.23 | 0.82 |  |
| 52 | Xin Zhao | -0.61 | 0.77 | 1.38 |  |
| 53 | Pantheon | -0.62 | 0.68 | 1.30 |  |
| 54 | Annie | -0.62 | 0.27 | 0.89 |  |
| 55 | Fizz | -0.64 | 0.56 | 1.20 |  |
| 56 | Lulu | -0.64 | 0.47 | 1.11 |  |
| 57 | Brand | -0.64 | 0.21 | 0.85 |  |
| 58 | Vel'Koz | -0.64 | 0.18 | 0.82 |  |
| 59 | Dr. Mundo | -0.64 | 0.00 | 0.64 |  |
| 60 | Karma | -0.65 | 0.08 | 0.73 |  |
| 61 | Nasus | -0.66 | 0.22 | 0.88 |  |
| 62 | Xerath | -0.67 | 0.18 | 0.85 |  |
| 63 | Morgana | -0.67 | 0.15 | 0.82 |  |
| 64 | Lux | -0.68 | 0.14 | 0.82 |  |
| 65 | Aatrox | -0.68 | 0.10 | 0.78 |  |
| 66 | Kha'Zix | -0.68 | 0.00 | 0.68 |  |
| 67 | Lucian | -0.68 | 0.00 | 0.68 |  |
| 68 | Shaco | -0.70 | 0.50 | 1.20 |  |
| 69 | Sona | -0.70 | 0.26 | 0.96 |  |
| 70 | Sylas | -0.70 | 0.08 | 0.78 |  |
| 71 | Graves | -0.70 | 0.00 | 0.70 |  |
| 72 | Draven | -0.71 | 0.25 | 0.96 |  |
| 73 | Jinx | -0.71 | 0.11 | 0.82 |  |
| 74 | Anivia | -0.72 | 0.33 | 1.05 |  |
| 75 | Viktor | -0.72 | 0.24 | 0.96 |  |
| 76 | Jayce | -0.72 | 0.08 | 0.80 |  |
| 77 | Shen | -0.73 | 0.30 | 1.03 |  |
| 78 | Bel'Veth | -0.73 | 0.09 | 0.82 |  |
| 79 | Senna | -0.74 | 0.24 | 0.98 |  |
| 80 | Veigar | -0.74 | 0.19 | 0.93 |  |
| 81 | Swain | -0.76 | 0.16 | 0.92 |  |
| 82 | Malzahar | -0.78 | 0.24 | 1.02 |  |
| 83 | Kassadin | -0.78 | 0.09 | 0.87 |  |
| 84 | Udyr | -0.79 | 0.19 | 0.98 |  |
| 85 | Ziggs | -0.80 | 0.20 | 1.00 |  |
| 86 | Garen | -0.81 | 0.20 | 1.01 |  |
| 87 | Ivern | -0.81 | 0.00 | 0.81 |  |
| 88 | Ahri | -0.82 | 0.18 | 1.00 |  |
| 89 | Orianna | -0.82 | 0.15 | 0.97 |  |
| 90 | Lillia | -0.82 | 0.05 | 0.87 |  |
| 91 | Hwei | -0.83 | 0.19 | 1.02 |  |
| 92 | Renata Glasc | -0.84 | 0.31 | 1.15 |  |
| 93 | Jhin | -0.84 | 0.13 | 0.97 |  |
| 94 | Seraphine | -0.85 | 0.24 | 1.09 |  |
| 95 | Syndra | -0.85 | 0.18 | 1.03 |  |
| 96 | Yasuo | -0.86 | 0.55 | 1.41 |  |
| 97 | Aphelios | -0.86 | 0.27 | 1.13 |  |
| 98 | Taric | -0.86 | 0.07 | 0.93 |  |
| 99 | Nocturne | -0.87 | 0.50 | 1.37 |  |
| 100 | Kalista | -0.87 | 0.20 | 1.07 |  |
| 101 | Lee Sin | -0.87 | 0.05 | 0.92 |  |
| 102 | Maokai | -0.88 | 0.59 | 1.47 |  |
| 103 | Jax | -0.88 | 0.27 | 1.15 |  |
| 104 | Nami | -0.88 | 0.25 | 1.13 |  |
| 105 | Thresh | -0.88 | 0.16 | 1.04 |  |
| 106 | Gnar | -0.88 | 0.15 | 1.03 |  |
| 107 | Zyra | -0.89 | 0.20 | 1.09 |  |
| 108 | Renekton | -0.89 | 0.09 | 0.98 |  |
| 109 | Janna | -0.90 | 0.30 | 1.20 |  |
| 110 | Neeko | -0.91 | 0.16 | 1.07 |  |
| 111 | Rumble | -0.91 | 0.00 | 0.91 |  |
| 112 | Gangplank | -0.92 | 0.12 | 1.04 |  |
| 113 | Talon | -0.92 | 0.00 | 0.92 |  |
| 114 | Cassiopeia | -0.93 | 0.16 | 1.09 |  |
| 115 | Fiddlesticks | -0.94 | 0.17 | 1.11 |  |
| 116 | Irelia | -0.94 | 0.08 | 1.02 |  |
| 117 | Azir | -0.95 | 0.15 | 1.10 |  |
| 118 | Mordekaiser | -0.96 | 0.14 | 1.10 |  |
| 119 | Aurelion Sol | -0.97 | 0.24 | 1.21 |  |
| 120 | Alistar | -0.97 | 0.23 | 1.20 |  |
| 121 | Yorick | -0.98 | 0.07 | 1.05 |  |
| 122 | Illaoi | -0.98 | 0.00 | 0.98 |  |
| 123 | Camille | -0.99 | 0.52 | 1.51 |  |
| 124 | Naafiri | -0.99 | 0.00 | 0.99 |  |
| 125 | Evelynn | -1.00 | 0.51 | 1.51 |  |
| 126 | Shyvana | -1.00 | 0.08 | 1.08 |  |
| 127 | Nilah | -1.01 | 0.25 | 1.26 |  |
| 128 | Akali | -1.02 | 0.00 | 1.02 |  |
| 129 | Rengar | -1.06 | 0.12 | 1.18 |  |
| 130 | Cho'Gath | -1.07 | 0.18 | 1.25 |  |
| 131 | Ambessa | -1.07 | 0.05 | 1.12 |  |
| 132 | Locke | -1.08 | 0.00 | 1.08 |  |
| 133 | Taliyah | -1.09 | 0.31 | 1.40 |  |
| 134 | Rammus | -1.10 | 0.39 | 1.49 |  |
| 135 | Diana | -1.10 | 0.05 | 1.15 |  |
| 136 | Rakan | -1.11 | 0.13 | 1.24 |  |
| 137 | Tahm Kench | -1.12 | 0.24 | 1.36 |  |
| 138 | Sion | -1.12 | 0.20 | 1.32 |  |
| 139 | Kled | -1.12 | 0.16 | 1.28 |  |
| 140 | Urgot | -1.13 | 0.12 | 1.25 |  |
| 141 | Blitzcrank | -1.15 | 0.24 | 1.39 |  |
| 142 | Zaahen | -1.18 | 0.23 | 1.41 |  |
| 143 | Riven | -1.19 | 0.16 | 1.35 |  |
| 144 | Wukong | -1.19 | 0.05 | 1.24 |  |
| 145 | Yone | -1.20 | 0.16 | 1.36 |  |
| 146 | Nautilus | -1.21 | 0.05 | 1.26 |  |
| 147 | Rell | -1.22 | 0.37 | 1.59 |  |
| 148 | Zac | -1.22 | 0.22 | 1.44 |  |
| 149 | Skarner | -1.22 | 0.14 | 1.36 |  |
| 150 | Malphite | -1.23 | 0.19 | 1.42 |  |
| 151 | Leona | -1.24 | 0.16 | 1.40 |  |
| 152 | Poppy | -1.24 | 0.05 | 1.29 |  |
| 153 | Trundle | -1.25 | 0.07 | 1.32 |  |
| 154 | Qiyana | -1.26 | 0.05 | 1.31 |  |
| 155 | Sejuani | -1.27 | 0.23 | 1.50 |  |
| 156 | Darius | -1.27 | 0.07 | 1.34 |  |
| 157 | Viego | -1.28 | 0.14 | 1.42 |  |
| 158 | Jarvan IV | -1.28 | 0.05 | 1.33 |  |
| 159 | Nunu & Willump | -1.29 | 0.17 | 1.46 |  |
| 160 | Amumu | -1.31 | 0.12 | 1.43 |  |
| 161 | K'Sante | -1.34 | 0.24 | 1.58 |  |
| 162 | Pyke | -1.37 | 0.17 | 1.54 |  |
| 163 | Warwick | -1.37 | 0.16 | 1.53 |  |
| 164 | Vi | -1.37 | 0.15 | 1.52 |  |
| 165 | Gragas | -1.38 | 0.12 | 1.50 |  |
| 166 | Galio | -1.39 | 0.21 | 1.60 |  |
| 167 | Sett | -1.39 | 0.13 | 1.52 |  |
| 168 | Volibear | -1.39 | 0.08 | 1.47 |  |
| 169 | Ekko | -1.39 | 0.00 | 1.39 |  |
| 170 | Ornn | -1.42 | 0.14 | 1.56 |  |
| 171 | Hecarim | -1.45 | 0.05 | 1.50 |  |
| 172 | Briar | -1.49 | 0.05 | 1.54 |  |
