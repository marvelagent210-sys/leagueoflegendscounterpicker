# Counters to Fiora (patch 26.20)

## Simulated duels

The duel simulator played each of the 75 other champions with a simulator kit against Fiora: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fiora wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fiora --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +1.00 |
| 2 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 3 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 4 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 5 | Warwick | +0.73 | +1.00 | +1.00 | +1.00 | +0.03 | – | −1.00 |
| 6 | Nasus | +0.69 | +1.00 | +1.00 | +1.00 | −0.22 | – | −1.00 |
| 7 | Ashe | +0.20 | +1.00 | +1.00 | −1.00 | +0.33 | −1.00 | −1.00 |
| 8 | Kled | +0.18 | +1.00 | +0.00 | +0.00 | −0.23 | – | −1.00 |
| 9 | Zaahen | −0.02 | +0.20 | +0.01 | +0.02 | −0.19 | – | −1.00 |
| 10 | Darius | −0.08 | +1.00 | −0.57 | −0.57 | −0.09 | – | −1.00 |
| 11 | Illaoi | −0.21 | −0.64 | −0.64 | +0.95 | −0.06 | – | −1.00 |
| 12 | Gangplank | −0.23 | −1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 13 | Wukong | −0.28 | −1.00 | +1.00 | −1.00 | −0.01 | – | −1.00 |
| 14 | Poppy | −0.28 | −0.63 | −0.63 | +0.18 | +0.34 | – | −0.53 |
| 15 | Quinn | −0.44 | −1.00 | −1.00 | +1.00 | +0.07 | −1.00 | −1.00 |
| 16 | Gnar | −0.47 | −0.29 | −0.29 | −1.00 | +0.17 | −1.00 | −1.00 |
| 17 | Aatrox | −0.67 | −1.00 | −1.00 | −0.15 | −0.17 | – | −1.00 |
| 18 | Kayle | −0.72 | −0.99 | −0.99 | −1.00 | +0.20 | −0.03 | −1.00 |
| 19 | Master Yi | −0.72 | −1.00 | −1.00 | −1.00 | −0.01 | – | +1.00 |
| 20 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 21 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 22 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 23 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 24 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.05 |
| 25 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 26 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 27 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 28 | Riven | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | – | −1.00 |
| 29 | Garen | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | – | −1.00 |
| 30 | Volibear | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.03 |
| 31 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 32 | Yone | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.00 |
| 33 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.08 |
| 34 | Udyr | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.37 |
| 35 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 36 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.07 |
| 37 | Annie | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 38 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 39 | Teemo | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −1.00 |
| 40 | Ziggs | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.46 |
| 41 | Jayce | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 42 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 43 | Irelia | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | – | −1.00 |
| 44 | Vel'Koz | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 45 | Nautilus | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 46 | Lissandra | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 47 | Dr. Mundo | −0.83 | −1.00 | −1.00 | −1.00 | −0.33 | – | +0.00 |
| 48 | Cho'Gath | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 49 | Renekton | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 50 | Xin Zhao | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 51 | Sion | −0.84 | −1.00 | −1.00 | −1.00 | −0.38 | – | +0.00 |
| 52 | K'Sante | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 53 | Shen | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.50 |
| 54 | Heimerdinger | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 55 | Olaf | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 56 | Brand | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 57 | Rammus | −0.85 | −1.00 | −1.00 | −1.00 | −0.42 | – | +0.00 |
| 58 | Ornn | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 59 | Malzahar | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 60 | Amumu | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 61 | Vladimir | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −1.00 |
| 62 | Rumble | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 63 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | – | −1.00 |
| 64 | Anivia | −0.86 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | +0.00 |
| 65 | Gragas | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 66 | Morgana | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 67 | Lux | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 68 | Mordekaiser | −0.87 | −1.00 | −1.00 | −1.00 | −0.23 | – | −1.00 |
| 69 | Zyra | −0.87 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −1.00 |
| 70 | Urgot | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −1.00 |
| 71 | Akali | −0.88 | −1.00 | −1.00 | −1.00 | −0.29 | – | −1.00 |
| 72 | Tahm Kench | −0.89 | −1.00 | −1.00 | −1.00 | −0.33 | – | −0.96 |
| 73 | Ahri | −0.89 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | −0.96 |
| 74 | Vayne | −0.90 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −1.00 |
| 75 | Camille | −0.91 | −1.00 | −1.00 | −1.00 | −0.46 | – | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Fiora's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fiora's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fiora` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.81)

- **0.44** range: Sivir's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Sivir basic attacks → Fiora basic attacks)
- **0.42** spell shield: Spell Shield's spell shield blocks Fiora's Riposte. Spell shield for 1.5 s, long enough to use ahead of Riposte. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fiora W Riposte)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Fiora's Bladework. Spell shield for 1.5 s, long enough to use ahead of Bladework. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the slow from the first hit. (Sivir E Spell Shield → Fiora E Bladework)
- Watch out: Riposte cuts Sivir's attack speed by 25% for 2 s.

#### 2. Twitch (net +0.33)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Twitch basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Twitch's attack speed by 25% for 2 s.

#### 3. Kayle (net +0.31)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Fiora's (625 vs 150 attack range). Fiora closes the gap with Lunge. (Kayle basic attacks → Fiora basic attacks)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Fiora's Riposte (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Riposte. (Kayle R Divine Judgment → Fiora W Riposte)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Fiora's Bladework (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bladework. (Kayle R Divine Judgment → Fiora E Bladework)
- Watch out: Riposte parries Kayle's Starfire Spellblade.

#### 4. Yuumi (net +0.29)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Fiora's Riposte. Untargetable for ?; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fiora W Riposte)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Fiora's (425 vs 150 attack range). Fiora closes the gap with Lunge. (Yuumi basic attacks → Fiora basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Fiora's Bladework. Untargetable for ?; Bladework lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fiora E Bladework)
- Watch out: Riposte parries Yuumi's Final Chapter.

#### 5. Vladimir (net +0.29)

- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiora's Riposte. Untargetable for 2 s, long enough to use ahead of Riposte. (Vladimir W Sanguine Pool → Fiora W Riposte)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiora's Bladework. Untargetable for 2 s, long enough to use ahead of Bladework. (Vladimir W Sanguine Pool → Fiora E Bladework)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Fiora's (450 vs 150 attack range). Fiora closes the gap with Lunge. (Vladimir basic attacks → Fiora basic attacks)
- Watch out: Riposte parries Vladimir's Hemoplague.

#### 6. Kai'Sa (net +0.27)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range). Fiora closes the gap with Lunge. (Kai'Sa basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Kai'Sa's attack speed by 25% for 2 s.

#### 7. Yunara (net +0.27)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Fiora's (575 vs 150 attack range). Fiora closes the gap with Lunge. (Yunara basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Yunara's attack speed by 25% for 2 s.

#### 8. Aurora (net +0.12)

- **0.29** range: Aurora's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Aurora basic attacks → Fiora basic attacks)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Fiora's Riposte. Untargetable for 0.4 s; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fiora W Riposte)
- **0.12** untargetable: Between Worlds makes Aurora untargetable, dodging Fiora's Bladework. Untargetable for 0.4 s; Bladework lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fiora E Bladework)
- Watch out: Riposte parries Aurora's Between Worlds.

#### 9. Teemo (net +0.11)

- **0.43** blind: Blinding Dart's blind makes Fiora's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Fiora basic attacks)
- **0.32** range: Teemo's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Teemo basic attacks → Fiora basic attacks)
- **0.15** blind: Blinding Dart's blind makes Fiora's Bladework, an empowered attack, miss. Blind for 3 s. Spell shield will only block the slow from the first hit. Bladework's first basic attack will slow even if it is dodged, blocked or missed. (Teemo Q Blinding Dart → Fiora E Bladework)
- Watch out: Riposte parries Teemo's Noxious Trap.

#### 10. Xayah (net +0.10)

- **0.36** range: Xayah's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range). Fiora closes the gap with Lunge. (Xayah basic attacks → Fiora basic attacks)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Fiora's Riposte. Untargetable for 1.5 s, long enough to use ahead of Riposte. (Xayah R Featherstorm → Fiora W Riposte)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Fiora's Bladework. Untargetable for 1.5 s, long enough to use ahead of Bladework. (Xayah R Featherstorm → Fiora E Bladework)
- Watch out: Riposte parries Xayah's Bladecaller and stuns back.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.81 | 0.93 | 0.12 |  |
| 2 | Twitch | +0.33 | 0.43 | 0.10 |  |
| 3 | Kayle | +0.31 | 0.53 | 0.22 |  |
| 4 | Yuumi | +0.29 | 0.89 | 0.60 |  |
| 5 | Vladimir | +0.29 | 0.76 | 0.47 |  |
| 6 | Kai'Sa | +0.27 | 0.36 | 0.09 |  |
| 7 | Yunara | +0.27 | 0.36 | 0.09 |  |
| 8 | Aurora | +0.12 | 0.57 | 0.45 |  |
| 9 | Teemo | +0.11 | 0.83 | 0.72 | blind (Blinding Dart) |
| 10 | Xayah | +0.10 | 0.68 | 0.58 |  |
| 11 | Master Yi | +0.07 | 0.60 | 0.53 |  |
| 12 | Kindred | +0.06 | 0.44 | 0.38 |  |
| 13 | Samira | +0.03 | 0.66 | 0.63 |  |
| 14 | Singed | 0.00 | 0.81 | 0.81 |  |
| 15 | Twisted Fate | -0.01 | 0.40 | 0.41 |  |
| 16 | Nidalee | -0.04 | 0.28 | 0.32 |  |
| 17 | Kog'Maw | -0.07 | 0.25 | 0.32 |  |
| 18 | Milio | -0.09 | 0.60 | 0.69 |  |
| 19 | Gwen | -0.09 | 0.51 | 0.60 |  |
| 20 | Olaf | -0.09 | 0.26 | 0.35 |  |
| 21 | Udyr | -0.10 | 0.51 | 0.61 |  |
| 22 | Tryndamere | -0.10 | 0.00 | 0.10 |  |
| 23 | Nasus | -0.15 | 0.33 | 0.48 |  |
| 24 | Zeri | -0.16 | 0.44 | 0.60 |  |
| 25 | Miss Fortune | -0.17 | 0.32 | 0.49 |  |
| 26 | Malzahar | -0.18 | 0.63 | 0.81 |  |
| 27 | Lulu | -0.20 | 0.66 | 0.86 |  |
| 28 | Jinx | -0.21 | 0.57 | 0.78 |  |
| 29 | Vex | -0.21 | 0.52 | 0.73 |  |
| 30 | Dr. Mundo | -0.21 | 0.00 | 0.21 |  |
| 31 | Katarina | -0.22 | 0.28 | 0.50 |  |
| 32 | Quinn | -0.25 | 0.36 | 0.61 |  |
| 33 | Akshan | -0.28 | 0.32 | 0.60 |  |
| 34 | Mel | -0.29 | 0.62 | 0.91 |  |
| 35 | Zed | -0.30 | 0.28 | 0.58 |  |
| 36 | Gangplank | -0.31 | 0.39 | 0.70 |  |
| 37 | Morgana | -0.32 | 0.67 | 0.99 |  |
| 38 | Kalista | -0.32 | 0.49 | 0.81 |  |
| 39 | Lucian | -0.36 | 0.34 | 0.70 |  |
| 40 | Jax | -0.37 | 0.56 | 0.93 |  |
| 41 | Varus | -0.38 | 0.55 | 0.93 |  |
| 42 | Smolder | -0.40 | 0.32 | 0.72 |  |
| 43 | Karthus | -0.40 | 0.18 | 0.58 |  |
| 44 | Ezreal | -0.41 | 0.32 | 0.73 |  |
| 45 | LeBlanc | -0.41 | 0.21 | 0.62 |  |
| 46 | Zilean | -0.42 | 0.32 | 0.74 |  |
| 47 | Rengar | -0.43 | 0.40 | 0.83 |  |
| 48 | Bard | -0.45 | 0.67 | 1.12 |  |
| 49 | Shen | -0.45 | 0.53 | 0.98 |  |
| 50 | Nilah | -0.46 | 0.54 | 1.00 |  |
| 51 | Vayne | -0.46 | 0.43 | 0.89 |  |
| 52 | Garen | -0.46 | 0.27 | 0.73 |  |
| 53 | Zoe | -0.47 | 0.32 | 0.79 |  |
| 54 | Braum | -0.49 | 0.45 | 0.94 | projectile block (Unbreakable) |
| 55 | Viktor | -0.50 | 0.57 | 1.07 |  |
| 56 | Sion | -0.50 | 0.28 | 0.78 |  |
| 57 | Lissandra | -0.51 | 0.60 | 1.11 |  |
| 58 | Pantheon | -0.51 | 0.28 | 0.79 |  |
| 59 | Taric | -0.51 | 0.00 | 0.51 |  |
| 60 | Jayce | -0.52 | 0.28 | 0.80 |  |
| 61 | Graves | -0.52 | 0.22 | 0.74 |  |
| 62 | Kha'Zix | -0.52 | 0.00 | 0.52 |  |
| 63 | Fizz | -0.53 | 0.57 | 1.10 |  |
| 64 | Ryze | -0.53 | 0.24 | 0.77 |  |
| 65 | Veigar | -0.54 | 0.50 | 1.04 |  |
| 66 | Kennen | -0.54 | 0.29 | 0.83 |  |
| 67 | Ahri | -0.56 | 0.50 | 1.06 |  |
| 68 | Soraka | -0.56 | 0.27 | 0.83 |  |
| 69 | Vel'Koz | -0.57 | 0.25 | 0.82 |  |
| 70 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 71 | Caitlyn | -0.58 | 0.36 | 0.94 |  |
| 72 | Cassiopeia | -0.59 | 0.60 | 1.19 |  |
| 73 | Ashe | -0.59 | 0.36 | 0.95 |  |
| 74 | Elise | -0.59 | 0.32 | 0.91 |  |
| 75 | Rumble | -0.59 | 0.00 | 0.59 |  |
| 76 | Nocturne | -0.60 | 0.54 | 1.14 |  |
| 77 | Xerath | -0.60 | 0.25 | 0.85 |  |
| 78 | Sona | -0.61 | 0.41 | 1.02 |  |
| 79 | Kayn | -0.62 | 0.29 | 0.91 |  |
| 80 | Corki | -0.63 | 0.30 | 0.93 |  |
| 81 | Hwei | -0.64 | 0.53 | 1.17 |  |
| 82 | Yasuo | -0.64 | 0.43 | 1.07 | projectile block (Wind Wall) |
| 83 | Lux | -0.64 | 0.29 | 0.93 |  |
| 84 | Draven | -0.67 | 0.36 | 1.03 |  |
| 85 | Warwick | -0.67 | 0.34 | 1.01 |  |
| 86 | Karma | -0.68 | 0.21 | 0.89 |  |
| 87 | Ivern | -0.68 | 0.18 | 0.86 |  |
| 88 | Kassadin | -0.68 | 0.00 | 0.68 |  |
| 89 | Brand | -0.69 | 0.22 | 0.91 |  |
| 90 | Talon | -0.69 | 0.00 | 0.69 |  |
| 91 | Annie | -0.70 | 0.22 | 0.92 |  |
| 92 | Illaoi | -0.72 | 0.00 | 0.72 |  |
| 93 | Heimerdinger | -0.74 | 0.28 | 1.02 |  |
| 94 | Janna | -0.76 | 0.36 | 1.12 |  |
| 95 | Poppy | -0.77 | 0.50 | 1.27 | dash stop (Steadfast Presence) |
| 96 | Tristana | -0.77 | 0.36 | 1.13 |  |
| 97 | Senna | -0.77 | 0.32 | 1.09 |  |
| 98 | Shaco | -0.77 | 0.29 | 1.06 |  |
| 99 | Renekton | -0.77 | 0.00 | 0.77 |  |
| 100 | Jhin | -0.80 | 0.27 | 1.07 |  |
| 101 | Aatrox | -0.80 | 0.00 | 0.80 |  |
| 102 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 103 | Mordekaiser | -0.81 | 0.08 | 0.89 |  |
| 104 | Rek'Sai | -0.82 | 0.33 | 1.15 |  |
| 105 | Swain | -0.82 | 0.20 | 1.02 |  |
| 106 | Aphelios | -0.83 | 0.46 | 1.29 |  |
| 107 | Orianna | -0.83 | 0.25 | 1.08 |  |
| 108 | Lillia | -0.83 | 0.10 | 0.93 |  |
| 109 | Bel'Veth | -0.83 | 0.00 | 0.83 |  |
| 110 | Ziggs | -0.84 | 0.27 | 1.11 |  |
| 111 | Azir | -0.85 | 0.25 | 1.10 |  |
| 112 | Aurelion Sol | -0.85 | 0.22 | 1.07 |  |
| 113 | Fiddlesticks | -0.85 | 0.18 | 1.03 |  |
| 114 | Syndra | -0.88 | 0.22 | 1.10 |  |
| 115 | Gnar | -0.89 | 0.31 | 1.20 |  |
| 116 | Maokai | -0.92 | 0.56 | 1.48 |  |
| 117 | Locke | -0.92 | 0.00 | 0.92 |  |
| 118 | Lee Sin | -0.93 | 0.00 | 0.93 |  |
| 119 | Renata Glasc | -0.94 | 0.38 | 1.32 |  |
| 120 | Anivia | -0.94 | 0.24 | 1.18 |  |
| 121 | Akali | -0.94 | 0.00 | 0.94 |  |
| 122 | Cho'Gath | -0.94 | 0.00 | 0.94 |  |
| 123 | Naafiri | -0.94 | 0.00 | 0.94 |  |
| 124 | Alistar | -0.95 | 0.21 | 1.16 |  |
| 125 | Kled | -0.97 | 0.34 | 1.31 |  |
| 126 | Seraphine | -0.98 | 0.27 | 1.25 |  |
| 127 | Shyvana | -0.98 | 0.00 | 0.98 |  |
| 128 | Camille | -0.99 | 0.29 | 1.28 |  |
| 129 | Zyra | -1.01 | 0.24 | 1.25 |  |
| 130 | Neeko | -1.01 | 0.22 | 1.23 |  |
| 131 | Malphite | -1.01 | 0.21 | 1.22 |  |
| 132 | Thresh | -1.02 | 0.18 | 1.20 |  |
| 133 | Skarner | -1.02 | 0.09 | 1.11 |  |
| 134 | Nunu & Willump | -1.03 | 0.17 | 1.20 |  |
| 135 | Ambessa | -1.03 | 0.00 | 1.03 |  |
| 136 | Riven | -1.03 | 0.00 | 1.03 |  |
| 137 | Irelia | -1.05 | 0.00 | 1.05 |  |
| 138 | Sylas | -1.05 | 0.00 | 1.05 |  |
| 139 | Nami | -1.07 | 0.22 | 1.29 |  |
| 140 | Sett | -1.07 | 0.00 | 1.07 |  |
| 141 | Zaahen | -1.10 | 0.25 | 1.35 |  |
| 142 | Trundle | -1.10 | 0.00 | 1.10 |  |
| 143 | Rammus | -1.13 | 0.32 | 1.45 |  |
| 144 | Darius | -1.13 | 0.00 | 1.13 |  |
| 145 | Zac | -1.14 | 0.34 | 1.48 |  |
| 146 | Evelynn | -1.14 | 0.29 | 1.43 |  |
| 147 | Diana | -1.14 | 0.00 | 1.14 |  |
| 148 | Yone | -1.16 | 0.18 | 1.34 |  |
| 149 | Xin Zhao | -1.17 | 0.16 | 1.33 |  |
| 150 | Blitzcrank | -1.17 | 0.00 | 1.17 |  |
| 151 | Urgot | -1.23 | 0.13 | 1.36 |  |
| 152 | Amumu | -1.24 | 0.17 | 1.41 |  |
| 153 | Galio | -1.24 | 0.00 | 1.24 |  |
| 154 | Rakan | -1.25 | 0.11 | 1.36 |  |
| 155 | Ekko | -1.25 | 0.00 | 1.25 |  |
| 156 | Volibear | -1.26 | 0.00 | 1.26 |  |
| 157 | Taliyah | -1.28 | 0.25 | 1.53 |  |
| 158 | Nautilus | -1.28 | 0.00 | 1.28 |  |
| 159 | Vi | -1.30 | 0.00 | 1.30 |  |
| 160 | Hecarim | -1.31 | 0.00 | 1.31 |  |
| 161 | Jarvan IV | -1.32 | 0.00 | 1.32 |  |
| 162 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 163 | Leona | -1.36 | 0.00 | 1.36 |  |
| 164 | Qiyana | -1.36 | 0.00 | 1.36 |  |
| 165 | Tahm Kench | -1.40 | 0.00 | 1.40 |  |
| 166 | Viego | -1.43 | 0.00 | 1.43 |  |
| 167 | Gragas | -1.45 | 0.00 | 1.45 |  |
| 168 | Briar | -1.47 | 0.00 | 1.47 |  |
| 169 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 170 | Ornn | -1.54 | 0.00 | 1.54 |  |
| 171 | K'Sante | -1.59 | 0.00 | 1.59 |  |
| 172 | Rell | -1.59 | 0.00 | 1.59 |  |
