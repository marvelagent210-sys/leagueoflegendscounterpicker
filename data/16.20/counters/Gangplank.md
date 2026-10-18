# Counters to Gangplank (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Gangplank: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gangplank wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gangplank --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 2 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 3 | Aurora | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 4 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 5 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 6 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 7 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 8 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 9 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 10 | Darius | +0.71 | +1.00 | +1.00 | +1.00 | −0.07 | – | −1.00 |
| 11 | K'Sante | +0.39 | +1.00 | +0.00 | +0.00 | −0.03 | +1.00 | +1.00 |
| 12 | Vayne | +0.33 | +1.00 | −1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 13 | Garen | +0.32 | +1.00 | +1.00 | −1.00 | −0.11 | – | +0.00 |
| 14 | Tahm Kench | +0.31 | +1.00 | +1.00 | −1.00 | −0.15 | – | +0.00 |
| 15 | Ashe | +0.30 | +1.00 | +1.00 | −1.00 | +0.24 | +0.14 | −1.00 |
| 16 | Fiora | +0.23 | −1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 17 | Cho'Gath | +0.20 | −1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 18 | Camille | +0.20 | +1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 19 | Volibear | +0.13 | +1.00 | −1.00 | +1.00 | −0.20 | – | −1.00 |
| 20 | Quinn | +0.11 | +1.00 | −1.00 | +1.00 | +0.04 | −0.43 | −1.00 |
| 21 | Sion | +0.03 | −0.17 | +0.28 | +0.00 | −0.02 | – | +0.00 |
| 22 | Zaahen | +0.02 | −0.10 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 23 | Anivia | +0.01 | −0.01 | +0.09 | +0.07 | −0.27 | +0.11 | +0.00 |
| 24 | Yasuo | −0.12 | −1.00 | −0.10 | +0.84 | −0.02 | – | +0.00 |
| 25 | Irelia | −0.20 | +1.00 | −0.88 | −1.00 | −0.06 | – | +0.00 |
| 26 | Poppy | −0.21 | −1.00 | +1.00 | −1.00 | +0.10 | – | +0.00 |
| 27 | Olaf | −0.23 | −1.00 | −0.37 | +1.00 | −0.10 | – | −1.00 |
| 28 | Kayle | −0.25 | +0.64 | −0.57 | −1.00 | +0.03 | −0.23 | −1.00 |
| 29 | Udyr | −0.30 | −1.00 | −1.00 | +1.00 | −0.11 | – | +1.00 |
| 30 | Morgana | −0.34 | −0.68 | −1.00 | +0.75 | +0.02 | −0.75 | −0.02 |
| 31 | Heimerdinger | −0.40 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 32 | Vel'Koz | −0.52 | −0.34 | −0.34 | −1.00 | −0.03 | −1.00 | −1.00 |
| 33 | Aatrox | −0.53 | +0.17 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 34 | Gnar | −0.53 | −1.00 | −0.31 | −1.00 | +0.03 | −0.06 | +0.00 |
| 35 | Riven | −0.53 | +0.00 | −1.00 | −1.00 | −0.03 | – | −0.50 |
| 36 | Kennen | −0.58 | −1.00 | −0.92 | −1.00 | −0.01 | +1.00 | +0.00 |
| 37 | Zyra | −0.72 | −1.00 | −1.00 | −1.00 | −0.05 | −0.14 | −0.03 |
| 38 | Master Yi | −0.73 | −1.00 | −1.00 | −1.00 | −0.04 | – | +1.00 |
| 39 | Mordekaiser | −0.75 | −1.00 | −1.00 | −0.84 | −0.01 | – | +0.00 |
| 40 | Brand | −0.75 | −1.00 | −1.00 | −1.00 | −0.21 | −0.16 | +0.00 |
| 41 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 42 | Gwen | −0.76 | −0.98 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 43 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 44 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 45 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 46 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 47 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 48 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 49 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 50 | Illaoi | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 51 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 52 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 53 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 54 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 55 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 56 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 57 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 58 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 59 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 60 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 61 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 62 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.00 |
| 63 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 64 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 65 | Annie | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 66 | Ahri | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 67 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 68 | Lissandra | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 69 | Yone | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 70 | Xin Zhao | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 71 | Malzahar | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 72 | Lux | −0.85 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.54 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Gangplank's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gangplank's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gangplank` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.62)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Gangplank's (500 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Sivir basic attacks → Gangplank basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Gangplank's Cannon Barrage. Spell shield for 1.5 s, long enough to use ahead of Cannon Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gangplank R Cannon Barrage)
- **0.25** spell shield: Spell Shield's spell shield blocks Gangplank's Parrrley. Spell shield for 1.5 s, long enough to use ahead of Parrrley. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gangplank Q Parrrley)

#### 2. Yuumi (net +1.28)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Gangplank's (425 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Yuumi basic attacks → Gangplank basic attacks)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Gangplank's Cannon Barrage. Untargetable for ?; Cannon Barrage takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gangplank R Cannon Barrage)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Gangplank's Parrrley. Untargetable for ?; Parrrley takes 0.49 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gangplank Q Parrrley)
- Watch out: Remove Scurvy cleanses Yuumi's Final Chapter (slow) after it lands.

#### 3. Aurora (net +1.03)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Gangplank's (550 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Aurora basic attacks → Gangplank basic attacks)
- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Gangplank's Cannon Barrage. Untargetable for 0.4 s; Cannon Barrage takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Gangplank R Cannon Barrage)
- **0.19** untargetable: Between Worlds makes Aurora untargetable, dodging Gangplank's Parrrley. Untargetable for 0.4 s; Parrrley takes 0.49 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Gangplank Q Parrrley)
- Watch out: Remove Scurvy cleanses Aurora's Between Worlds (slow) after it lands.

#### 4. Kayle (net +1.03)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Gangplank's (625 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Kayle basic attacks → Gangplank basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Gangplank's Cannon Barrage (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Cannon Barrage. (Kayle R Divine Judgment → Gangplank R Cannon Barrage)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Gangplank's Parrrley. Invulnerable for 2.5 s, long enough to use ahead of Parrrley. (Kayle R Divine Judgment → Gangplank Q Parrrley)
- Watch out: Remove Scurvy cleanses Kayle's Radiant Blast (slow) after it lands.

#### 5. Xayah (net +1.00)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Gangplank's (525 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Xayah basic attacks → Gangplank basic attacks)
- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Gangplank's Cannon Barrage. Untargetable for 1.5 s, long enough to use ahead of Cannon Barrage. (Xayah R Featherstorm → Gangplank R Cannon Barrage)
- **0.19** untargetable: Featherstorm makes Xayah untargetable, dodging Gangplank's Parrrley. Untargetable for 1.5 s, long enough to use ahead of Parrrley. (Xayah R Featherstorm → Gangplank Q Parrrley)
- Watch out: Remove Scurvy cleanses Xayah's Bladecaller (root) after it lands.

#### 6. Vladimir (net +0.92)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gangplank's Cannon Barrage. Untargetable for 2 s, long enough to use ahead of Cannon Barrage. (Vladimir W Sanguine Pool → Gangplank R Cannon Barrage)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Gangplank's (450 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Vladimir basic attacks → Gangplank basic attacks)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gangplank's Parrrley. Untargetable for 2 s, long enough to use ahead of Parrrley. (Vladimir W Sanguine Pool → Gangplank Q Parrrley)
- Watch out: Remove Scurvy cleanses Vladimir's Sanguine Pool (slow) after it lands.

#### 7. Kindred (net +0.87)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Gangplank's (500 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Kindred basic attacks → Gangplank basic attacks)
- Watch out: Remove Scurvy cleanses Kindred's Mounting Dread (slow) after it lands.

#### 8. Teemo (net +0.85)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Gangplank's (500 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Teemo basic attacks → Gangplank basic attacks)
- **0.38** blind: Blinding Dart's blind makes Gangplank's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Gangplank basic attacks)
- Watch out: Remove Scurvy cleanses Teemo's Blinding Dart (blind) after it lands.

#### 9. Master Yi (net +0.83)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Gangplank's Cannon Barrage. Untargetable for ?; Cannon Barrage takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Gangplank R Cannon Barrage)
- **0.25** untargetable: Alpha Strike makes Master Yi untargetable, dodging Gangplank's Parrrley. Untargetable for ?; Parrrley takes 0.49 s to land, enough to react. (Master Yi Q Alpha Strike → Gangplank Q Parrrley)
- **0.11** cleanse: Highlander cleanses Gangplank's Cannon Barrage (slow) after it lands. 85 s cooldown; usable while crowd controlled. (Master Yi R Highlander → Gangplank R Cannon Barrage)

#### 10. Zeri (net +0.81)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Gangplank's (550 vs 125 attack range). Gangplank has no dash or blink to close the gap. (Zeri basic attacks → Gangplank basic attacks)
- Watch out: Remove Scurvy cleanses Zeri's Ultrashock Laser (slow) after it lands.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.62 | 1.62 | 0.00 | range (attacks) |
| 2 | Yuumi | +1.28 | 1.42 | 0.14 | range (attacks) |
| 3 | Aurora | +1.03 | 1.22 | 0.19 | range (attacks) |
| 4 | Kayle | +1.03 | 1.10 | 0.07 | range (attacks) |
| 5 | Xayah | +1.00 | 1.42 | 0.42 | range (attacks) |
| 6 | Vladimir | +0.92 | 1.04 | 0.12 |  |
| 7 | Kindred | +0.87 | 0.94 | 0.07 | range (attacks) |
| 8 | Teemo | +0.85 | 1.06 | 0.21 | range (attacks) |
| 9 | Master Yi | +0.83 | 0.83 | 0.00 |  |
| 10 | Zeri | +0.81 | 0.88 | 0.07 | range (attacks) |
| 11 | Twitch | +0.79 | 0.86 | 0.07 | range (attacks) |
| 12 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 13 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 14 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 15 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 16 | Yunara | +0.61 | 0.72 | 0.11 | range (attacks) |
| 17 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 18 | Bard | +0.59 | 1.37 | 0.78 | range (attacks) |
| 19 | Zed | +0.59 | 0.65 | 0.06 |  |
| 20 | Gwen | +0.57 | 0.68 | 0.11 |  |
| 21 | Miss Fortune | +0.56 | 0.65 | 0.09 | range (attacks) |
| 22 | Samira | +0.55 | 0.85 | 0.30 | range (attacks) |
| 23 | Smolder | +0.50 | 0.65 | 0.15 | range (attacks) |
| 24 | Twisted Fate | +0.49 | 0.86 | 0.37 | range (attacks) |
| 25 | Kog'Maw | +0.46 | 0.54 | 0.08 | range (attacks) |
| 26 | Milio | +0.44 | 0.90 | 0.46 | range (attacks) |
| 27 | Graves | +0.40 | 0.49 | 0.09 |  |
| 28 | Rek'Sai | +0.37 | 0.65 | 0.28 |  |
| 29 | Vayne | +0.35 | 0.86 | 0.51 | range (attacks) |
| 30 | Mel | +0.32 | 0.76 | 0.44 | range (attacks) |
| 31 | Fiora | +0.31 | 0.70 | 0.39 |  |
| 32 | Karthus | +0.30 | 0.39 | 0.09 |  |
| 33 | Lissandra | +0.22 | 1.09 | 0.87 |  |
| 34 | Lulu | +0.22 | 0.99 | 0.77 | range (attacks) |
| 35 | Quinn | +0.22 | 0.77 | 0.55 | range (attacks) |
| 36 | Kennen | +0.22 | 0.58 | 0.36 | range (attacks) |
| 37 | Caitlyn | +0.21 | 0.72 | 0.51 | range (attacks) |
| 38 | Draven | +0.21 | 0.72 | 0.51 | range (attacks) |
| 39 | Kayn | +0.21 | 0.65 | 0.44 |  |
| 40 | Nasus | +0.21 | 0.29 | 0.08 |  |
| 41 | Sona | +0.19 | 0.83 | 0.64 | range (attacks) |
| 42 | Elise | +0.19 | 0.65 | 0.46 | range (attacks) |
| 43 | Zilean | +0.18 | 0.65 | 0.47 | range (attacks) |
| 44 | Evelynn | +0.16 | 0.65 | 0.49 |  |
| 45 | Corki | +0.14 | 0.60 | 0.46 | range (attacks) |
| 46 | LeBlanc | +0.13 | 0.44 | 0.31 |  |
| 47 | Nocturne | +0.11 | 0.69 | 0.58 |  |
| 48 | Senna | +0.11 | 0.65 | 0.54 | range (attacks) |
| 49 | Viktor | +0.11 | 0.65 | 0.54 | range (attacks) |
| 50 | Jayce | +0.11 | 0.61 | 0.50 | range (attacks) |
| 51 | Olaf | +0.10 | 0.17 | 0.07 |  |
| 52 | Zoe | +0.09 | 0.65 | 0.56 | range (attacks) |
| 53 | Jinx | +0.09 | 0.58 | 0.49 | range (attacks) |
| 54 | Lux | +0.08 | 0.58 | 0.50 | range (attacks) |
| 55 | Annie | +0.08 | 0.44 | 0.36 |  |
| 56 | Ashe | +0.05 | 0.72 | 0.67 | range (attacks) |
| 57 | Shaco | +0.05 | 0.65 | 0.60 |  |
| 58 | Vex | +0.05 | 0.53 | 0.48 | range (attacks) |
| 59 | Garen | +0.05 | 0.21 | 0.16 |  |
| 60 | Jax | +0.04 | 0.48 | 0.44 |  |
| 61 | Ryze | +0.04 | 0.48 | 0.44 |  |
| 62 | Fizz | +0.02 | 0.72 | 0.70 |  |
| 63 | Tristana | +0.02 | 0.72 | 0.70 | range (attacks) |
| 64 | Brand | +0.01 | 0.44 | 0.43 |  |
| 65 | Nilah | 0.00 | 0.64 | 0.64 |  |
| 66 | Vel'Koz | 0.00 | 0.53 | 0.53 | range (attacks) |
| 67 | Xerath | 0.00 | 0.53 | 0.53 | range (attacks) |
| 68 | Katarina | 0.00 | 0.00 | 0.00 |  |
| 69 | Aphelios | -0.02 | 0.86 | 0.88 | range (attacks) |
| 70 | Kalista | -0.02 | 0.78 | 0.80 | range (attacks) |
| 71 | Akali | -0.05 | 0.00 | 0.05 |  |
| 72 | Jhin | -0.06 | 0.53 | 0.59 | range (attacks) |
| 73 | Soraka | -0.06 | 0.53 | 0.59 | range (attacks) |
| 74 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 75 | Talon | -0.06 | 0.00 | 0.06 |  |
| 76 | Ahri | -0.07 | 0.44 | 0.51 |  |
| 77 | Veigar | -0.08 | 0.48 | 0.56 |  |
| 78 | Illaoi | -0.08 | 0.00 | 0.08 |  |
| 79 | Kassadin | -0.09 | 0.00 | 0.09 |  |
| 80 | Tryndamere | -0.09 | 0.00 | 0.09 |  |
| 81 | Morgana | -0.10 | 0.58 | 0.68 |  |
| 82 | Kha'Zix | -0.10 | 0.00 | 0.10 |  |
| 83 | Swain | -0.11 | 0.42 | 0.53 |  |
| 84 | Azir | -0.14 | 0.53 | 0.67 | range (attacks) |
| 85 | Orianna | -0.14 | 0.53 | 0.67 | range (attacks) |
| 86 | Ziggs | -0.14 | 0.53 | 0.67 | range (attacks) |
| 87 | Locke | -0.14 | 0.00 | 0.14 |  |
| 88 | Rumble | -0.14 | 0.00 | 0.14 |  |
| 89 | Varus | -0.15 | 0.53 | 0.68 | range (attacks) |
| 90 | Syndra | -0.16 | 0.44 | 0.60 |  |
| 91 | Renata Glasc | -0.17 | 0.77 | 0.94 | range (attacks) |
| 92 | Pantheon | -0.18 | 0.41 | 0.59 |  |
| 93 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 94 | Malzahar | -0.20 | 0.51 | 0.71 |  |
| 95 | Cassiopeia | -0.20 | 0.44 | 0.64 |  |
| 96 | Karma | -0.21 | 0.44 | 0.65 |  |
| 97 | Ivern | -0.21 | 0.38 | 0.59 |  |
| 98 | Janna | -0.22 | 0.72 | 0.94 | range (attacks) |
| 99 | Gnar | -0.22 | 0.66 | 0.88 | range (attacks) |
| 100 | Fiddlesticks | -0.22 | 0.39 | 0.61 |  |
| 101 | Heimerdinger | -0.25 | 0.49 | 0.74 |  |
| 102 | Shen | -0.25 | 0.44 | 0.69 |  |
| 103 | Anivia | -0.29 | 0.48 | 0.77 |  |
| 104 | Rengar | -0.30 | 0.16 | 0.46 |  |
| 105 | Seraphine | -0.31 | 0.58 | 0.89 | range (attacks) |
| 106 | Hwei | -0.32 | 0.46 | 0.78 |  |
| 107 | Udyr | -0.37 | 0.20 | 0.57 |  |
| 108 | Maokai | -0.38 | 0.70 | 1.08 |  |
| 109 | Ekko | -0.39 | 0.00 | 0.39 |  |
| 110 | Thresh | -0.40 | 0.39 | 0.79 |  |
| 111 | Zyra | -0.41 | 0.48 | 0.89 |  |
| 112 | Nami | -0.41 | 0.44 | 0.85 |  |
| 113 | Mordekaiser | -0.41 | 0.07 | 0.48 |  |
| 114 | Irelia | -0.42 | 0.10 | 0.52 |  |
| 115 | Renekton | -0.42 | 0.00 | 0.42 |  |
| 116 | Singed | -0.42 | 0.00 | 0.42 |  |
| 117 | Neeko | -0.43 | 0.44 | 0.87 |  |
| 118 | Lillia | -0.46 | 0.22 | 0.68 |  |
| 119 | Aurelion Sol | -0.47 | 0.44 | 0.91 |  |
| 120 | Xin Zhao | -0.47 | 0.38 | 0.85 |  |
| 121 | Bel'Veth | -0.47 | 0.00 | 0.47 |  |
| 122 | Cho'Gath | -0.47 | 0.00 | 0.47 |  |
| 123 | Camille | -0.50 | 0.65 | 1.15 |  |
| 124 | Braum | -0.51 | 0.33 | 0.84 |  |
| 125 | Taric | -0.51 | 0.00 | 0.51 |  |
| 126 | Zaahen | -0.53 | 0.17 | 0.70 |  |
| 127 | Aatrox | -0.54 | 0.00 | 0.54 |  |
| 128 | Yorick | -0.55 | 0.00 | 0.55 |  |
| 129 | Kled | -0.57 | 0.43 | 1.00 |  |
| 130 | Darius | -0.59 | 0.00 | 0.59 |  |
| 131 | Trundle | -0.59 | 0.00 | 0.59 |  |
| 132 | Taliyah | -0.62 | 0.53 | 1.15 | range (attacks) |
| 133 | Nunu & Willump | -0.62 | 0.20 | 0.82 |  |
| 134 | Diana | -0.64 | 0.00 | 0.64 |  |
| 135 | Wukong | -0.64 | 0.00 | 0.64 |  |
| 136 | Malphite | -0.66 | 0.19 | 0.85 |  |
| 137 | Sion | -0.67 | 0.17 | 0.84 |  |
| 138 | Lee Sin | -0.68 | 0.00 | 0.68 |  |
| 139 | Sylas | -0.69 | 0.00 | 0.69 |  |
| 140 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 141 | Urgot | -0.72 | 0.30 | 1.02 |  |
| 142 | Rakan | -0.73 | 0.25 | 0.98 |  |
| 143 | Yasuo | -0.74 | 0.25 | 0.99 |  |
| 144 | Alistar | -0.75 | 0.13 | 0.88 |  |
| 145 | Skarner | -0.75 | 0.10 | 0.85 |  |
| 146 | Volibear | -0.77 | 0.00 | 0.77 |  |
| 147 | Rammus | -0.78 | 0.29 | 1.07 |  |
| 148 | Blitzcrank | -0.80 | 0.00 | 0.80 |  |
| 149 | Ambessa | -0.84 | 0.00 | 0.84 |  |
| 150 | Qiyana | -0.87 | 0.00 | 0.87 |  |
| 151 | Warwick | -0.88 | 0.17 | 1.05 |  |
| 152 | Viego | -0.91 | 0.19 | 1.10 |  |
| 153 | Pyke | -0.91 | 0.00 | 0.91 |  |
| 154 | Poppy | -0.92 | 0.00 | 0.92 |  |
| 155 | Riven | -0.97 | 0.00 | 0.97 |  |
| 156 | Leona | -0.99 | 0.00 | 0.99 |  |
| 157 | Tahm Kench | -0.99 | 0.00 | 0.99 |  |
| 158 | Nautilus | -1.00 | 0.00 | 1.00 |  |
| 159 | Jarvan IV | -1.03 | 0.00 | 1.03 |  |
| 160 | Sett | -1.03 | 0.00 | 1.03 |  |
| 161 | Yone | -1.03 | 0.00 | 1.03 |  |
| 162 | Amumu | -1.05 | 0.00 | 1.05 |  |
| 163 | Zac | -1.06 | 0.00 | 1.06 |  |
| 164 | Gragas | -1.07 | 0.00 | 1.07 |  |
| 165 | Vi | -1.07 | 0.00 | 1.07 |  |
| 166 | Hecarim | -1.12 | 0.00 | 1.12 |  |
| 167 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 168 | Briar | -1.14 | 0.00 | 1.14 |  |
| 169 | Ornn | -1.19 | 0.00 | 1.19 |  |
| 170 | Galio | -1.22 | 0.00 | 1.22 |  |
| 171 | K'Sante | -1.22 | 0.00 | 1.22 |  |
| 172 | Rell | -1.24 | 0.00 | 1.24 |  |
