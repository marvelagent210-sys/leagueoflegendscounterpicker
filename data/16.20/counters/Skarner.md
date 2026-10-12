# Counters to Skarner (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 45 other champions with a simulator kit against Skarner: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Skarner wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Skarner --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 2 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 3 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 4 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 5 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 6 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 7 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 8 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 9 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 10 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 11 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 12 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 13 | Gnar | +0.79 | +1.00 | +0.99 | +1.00 | −0.07 | +1.00 | +0.00 |
| 14 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 15 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 16 | Ambessa | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 17 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 18 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 19 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 20 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 21 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 22 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 23 | Yasuo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 24 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 25 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 26 | Rumble | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 27 | Fiora | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 28 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 29 | Mordekaiser | +0.72 | +1.00 | +0.79 | +1.00 | −0.01 | – | +0.00 |
| 30 | Dr. Mundo | +0.47 | +0.44 | +0.44 | +1.00 | +0.02 | – | +0.00 |
| 31 | Jayce | +0.20 | −0.01 | −0.02 | +1.00 | −0.06 | – | +0.00 |
| 32 | Irelia | +0.18 | +1.00 | −0.43 | +0.14 | −0.07 | – | +0.00 |
| 33 | Aurora | +0.16 | +0.20 | +0.20 | +0.18 | −0.01 | +0.23 | +0.00 |
| 34 | Nasus | +0.10 | +0.11 | +0.12 | +0.13 | −0.04 | +0.19 | +0.00 |
| 35 | Malphite | +0.10 | +0.12 | +0.12 | +0.06 | +0.09 | – | +0.00 |
| 36 | Shen | +0.07 | +0.05 | +0.11 | +0.03 | +0.09 | – | +0.00 |
| 37 | Tahm Kench | +0.05 | +0.08 | +0.08 | −0.03 | +0.05 | – | +0.00 |
| 38 | Sett | +0.02 | +0.01 | +0.03 | +0.01 | +0.07 | – | +0.00 |
| 39 | Urgot | +0.00 | +0.05 | +0.05 | −0.06 | +0.07 | −0.16 | +0.00 |
| 40 | Renekton | +0.00 | +0.02 | −0.01 | +0.03 | −0.07 | – | +0.00 |
| 41 | Sion | −0.00 | +0.02 | +0.02 | −0.14 | +0.09 | – | +0.00 |
| 42 | Singed | −0.02 | −0.02 | −0.02 | +0.01 | −0.07 | – | +0.00 |
| 43 | Ornn | −0.05 | −0.07 | −0.07 | −0.08 | +0.01 | – | +0.00 |
| 44 | Kennen | −0.69 | −1.00 | −1.00 | −1.00 | −0.07 | +0.18 | +0.00 |
| 45 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Skarner's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Skarner's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Skarner` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.91)

- **0.88** range: Sivir's basic attacks reach 350 units farther than Skarner's (500 vs 150 attack range). Skarner has no dash or blink to close the gap. (Sivir basic attacks → Skarner basic attacks)
- **0.80** spell shield: Spell Shield's spell shield blocks Skarner's Impale. Spell shield for 1.5 s, long enough to use ahead of Impale. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Skarner R Impale)
- **0.45** spell shield: Spell Shield's spell shield blocks Skarner's Ixtal's Impact. Spell shield for 1.5 s, long enough to use ahead of Ixtal's Impact. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Skarner E Ixtal's Impact)

#### 2. Elise (net +1.59)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Skarner's Impale. Untargetable for 0.6 s; Impale takes 0.75 s to land, enough to react. (Elise E Rappel → Skarner R Impale)
- **0.65** range: Elise's basic attacks reach 400 units farther than Skarner's (550 vs 150 attack range). Skarner has no dash or blink to close the gap. (Elise basic attacks → Skarner basic attacks)
- **0.27** untargetable: Rappel makes Elise untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 0.6 s; Ixtal's Impact lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Skarner E Ixtal's Impact)

#### 3. Xayah (net +1.59)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Skarner's Impale. Untargetable for 1.5 s, long enough to use ahead of Impale. (Xayah R Featherstorm → Skarner R Impale)
- **0.72** range: Xayah's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Xayah basic attacks → Skarner basic attacks)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 1.5 s, long enough to use ahead of Ixtal's Impact. (Xayah R Featherstorm → Skarner E Ixtal's Impact)

#### 4. Bard (net +1.51)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Skarner's Impale. Untargetable for 2.5 s, long enough to use ahead of Impale. (Bard R Tempered Fate → Skarner R Impale)
- **0.67** range: Bard's basic attacks reach 350 units farther than Skarner's (500 vs 150 attack range). Skarner has no dash or blink to close the gap. (Bard basic attacks → Skarner basic attacks)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2.5 s, long enough to use ahead of Ixtal's Impact. (Bard R Tempered Fate → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Bard's Cosmic Binding slow.

#### 5. Morgana (net +1.35)

- **0.80** cc immunity: Black Shield makes Morgana immune to Skarner's Impale (suppression). Immune for 5 s, long enough to use ahead of Impale. (Morgana E Black Shield → Skarner R Impale)
- **0.45** cc immunity: Black Shield makes Morgana immune to Skarner's Ixtal's Impact (stun, suppression). Immune for 5 s, long enough to use ahead of Ixtal's Impact. (Morgana E Black Shield → Skarner E Ixtal's Impact)
- **0.36** range: Morgana's basic attacks reach 300 units farther than Skarner's (450 vs 150 attack range). Skarner has no dash or blink to close the gap. (Morgana basic attacks → Skarner basic attacks)
- Watch out: Ixtal's Impact makes Skarner immune to Morgana's Soul Shackles slow.

#### 6. Milio (net +1.28)

- **0.72** range: Milio's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Milio basic attacks → Skarner basic attacks)
- **0.52** cleanse: Breath of Life cleanses Skarner's Impale (suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Skarner R Impale)
- **0.17** cleanse: Breath of Life cleanses Skarner's Ixtal's Impact (stun, suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Milio's Ultra Mega Fire Kick slow.

#### 7. Vladimir (net +1.22)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Skarner's Impale. Untargetable for 2 s, long enough to use ahead of Impale. (Vladimir W Sanguine Pool → Skarner R Impale)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2 s, long enough to use ahead of Ixtal's Impact. (Vladimir W Sanguine Pool → Skarner E Ixtal's Impact)
- **0.33** range: Vladimir's basic attacks reach 300 units farther than Skarner's (450 vs 150 attack range). Skarner has no dash or blink to close the gap. (Vladimir basic attacks → Skarner basic attacks)
- Watch out: Ixtal's Impact makes Skarner immune to Vladimir's Tides of Blood slow.

#### 8. Lissandra (net +1.21)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Skarner's Impale. Untargetable for 2.5 s, long enough to use ahead of Impale. (Lissandra R Frozen Tomb → Skarner R Impale)
- **0.44** range: Lissandra's basic attacks reach 400 units farther than Skarner's (550 vs 150 attack range). Skarner has no dash or blink to close the gap. (Lissandra basic attacks → Skarner basic attacks)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2.5 s, long enough to use ahead of Ixtal's Impact. (Lissandra R Frozen Tomb → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Lissandra's Frozen Tomb slow.

#### 9. Kalista (net +1.20)

- **0.61** range: Kalista's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Kalista basic attacks → Skarner basic attacks)
- **0.54** cleanse: Fate's Call cleanses Skarner's Impale (suppression) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Skarner R Impale)
- **0.18** cleanse: Fate's Call cleanses Skarner's Ixtal's Impact (stun, suppression) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Kalista's Rend slow.

#### 10. Aurora (net +1.19)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Skarner's Impale. Untargetable for 0.4 s; Impale takes 0.75 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Skarner R Impale)
- **0.58** range: Aurora's basic attacks reach 400 units farther than Skarner's (550 vs 150 attack range). Skarner has no dash or blink to close the gap. (Aurora basic attacks → Skarner basic attacks)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 0.4 s; Ixtal's Impact lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact reveals Aurora through Across the Veil's stealth.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.91 | 1.91 | 0.00 | range (attacks) |
| 2 | Elise | +1.59 | 1.59 | 0.00 | range (attacks) |
| 3 | Xayah | +1.59 | 1.59 | 0.00 | range (attacks) |
| 4 | Bard | +1.51 | 1.59 | 0.08 | range (attacks) |
| 5 | Morgana | +1.35 | 1.42 | 0.07 |  |
| 6 | Milio | +1.28 | 1.37 | 0.09 | range (attacks) |
| 7 | Vladimir | +1.22 | 1.36 | 0.14 |  |
| 8 | Lissandra | +1.21 | 1.36 | 0.15 |  |
| 9 | Kalista | +1.20 | 1.26 | 0.06 | range (attacks) |
| 10 | Aurora | +1.19 | 1.40 | 0.21 | range (attacks) |
| 11 | Kindred | +1.19 | 1.25 | 0.06 | range (attacks) |
| 12 | Kayle | +1.12 | 1.18 | 0.06 | range (attacks) |
| 13 | Yuumi | +1.05 | 1.53 | 0.48 | range (attacks) |
| 14 | Fiora | +1.05 | 1.11 | 0.06 |  |
| 15 | Udyr | +1.00 | 1.07 | 0.07 |  |
| 16 | Teemo | +0.94 | 1.06 | 0.12 | range (attacks), blind (Blinding Dart) |
| 17 | Nocturne | +0.94 | 1.03 | 0.09 |  |
| 18 | Master Yi | +0.93 | 1.04 | 0.11 |  |
| 19 | Kled | +0.92 | 1.01 | 0.09 |  |
| 20 | Rek'Sai | +0.92 | 0.92 | 0.00 |  |
| 21 | Zaahen | +0.89 | 0.89 | 0.00 |  |
| 22 | Olaf | +0.88 | 0.94 | 0.06 |  |
| 23 | Lulu | +0.87 | 1.02 | 0.15 | range (attacks) |
| 24 | Gwen | +0.87 | 0.94 | 0.07 |  |
| 25 | Samira | +0.87 | 0.87 | 0.00 | range (attacks) |
| 26 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 27 | Maokai | +0.82 | 0.94 | 0.12 |  |
| 28 | Zeri | +0.82 | 0.88 | 0.06 | range (attacks) |
| 29 | Camille | +0.81 | 0.87 | 0.06 |  |
| 30 | Ekko | +0.80 | 0.89 | 0.09 |  |
| 31 | Gangplank | +0.75 | 0.85 | 0.10 |  |
| 32 | Zed | +0.75 | 0.82 | 0.07 |  |
| 33 | Alistar | +0.75 | 0.75 | 0.00 |  |
| 34 | Evelynn | +0.74 | 0.87 | 0.13 |  |
| 35 | Sion | +0.72 | 0.96 | 0.24 |  |
| 36 | Twitch | +0.72 | 0.86 | 0.14 | range (attacks) |
| 37 | Vayne | +0.72 | 0.86 | 0.14 | range (attacks) |
| 38 | Mel | +0.72 | 0.81 | 0.09 | range (attacks) |
| 39 | Aphelios | +0.71 | 0.87 | 0.16 | range (attacks) |
| 40 | Renata Glasc | +0.71 | 0.77 | 0.06 | range (attacks) |
| 41 | Ashe | +0.68 | 0.72 | 0.04 | range (attacks) |
| 42 | Rengar | +0.67 | 0.86 | 0.19 |  |
| 43 | Tristana | +0.65 | 0.72 | 0.07 | range (attacks) |
| 44 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 45 | Warwick | +0.63 | 0.90 | 0.27 |  |
| 46 | Draven | +0.63 | 0.72 | 0.09 | range (attacks) |
| 47 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 48 | Shaco | +0.61 | 0.87 | 0.26 |  |
| 49 | Kai'Sa | +0.61 | 0.72 | 0.11 | range (attacks) |
| 50 | Zilean | +0.59 | 0.65 | 0.06 | range (attacks) |
| 51 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 52 | Zoe | +0.56 | 0.65 | 0.09 | range (attacks) |
| 53 | Nidalee | +0.56 | 0.56 | 0.00 | range (attacks) |
| 54 | Malzahar | +0.55 | 0.92 | 0.37 |  |
| 55 | Smolder | +0.55 | 0.65 | 0.10 | range (attacks) |
| 56 | Viktor | +0.52 | 0.61 | 0.09 | range (attacks) |
| 57 | Lux | +0.52 | 0.58 | 0.06 | range (attacks) |
| 58 | Senna | +0.51 | 0.65 | 0.14 | range (attacks) |
| 59 | Corki | +0.51 | 0.60 | 0.09 | range (attacks) |
| 60 | Jayce | +0.50 | 0.57 | 0.07 | range (attacks) |
| 61 | Quinn | +0.48 | 0.72 | 0.24 | range (attacks) |
| 62 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 63 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 64 | Jinx | +0.47 | 0.54 | 0.07 | range (attacks) |
| 65 | Ziggs | +0.47 | 0.53 | 0.06 | range (attacks) |
| 66 | Gnar | +0.46 | 0.62 | 0.16 | range (attacks) |
| 67 | Soraka | +0.46 | 0.53 | 0.07 | range (attacks) |
| 68 | Kog'Maw | +0.45 | 0.51 | 0.06 | range (attacks) |
| 69 | Azir | +0.44 | 0.50 | 0.06 | range (attacks) |
| 70 | Orianna | +0.44 | 0.50 | 0.06 | range (attacks) |
| 71 | Annie | +0.44 | 0.44 | 0.00 |  |
| 72 | Vex | +0.43 | 0.53 | 0.10 | range (attacks) |
| 73 | Varus | +0.42 | 0.53 | 0.11 | range (attacks) |
| 74 | Taric | +0.40 | 0.40 | 0.00 |  |
| 75 | Lucian | +0.39 | 0.67 | 0.28 | range (attacks) |
| 76 | Seraphine | +0.39 | 0.54 | 0.15 | range (attacks) |
| 77 | Nilah | +0.39 | 0.49 | 0.10 |  |
| 78 | Graves | +0.39 | 0.45 | 0.06 |  |
| 79 | Twisted Fate | +0.37 | 0.81 | 0.44 | range (attacks) |
| 80 | Caitlyn | +0.37 | 0.72 | 0.35 | range (attacks) |
| 81 | Brand | +0.37 | 0.44 | 0.07 |  |
| 82 | Kayn | +0.36 | 0.87 | 0.51 |  |
| 83 | Pantheon | +0.36 | 0.52 | 0.16 |  |
| 84 | Heimerdinger | +0.36 | 0.50 | 0.14 |  |
| 85 | Anivia | +0.35 | 0.48 | 0.13 |  |
| 86 | Ahri | +0.35 | 0.44 | 0.09 |  |
| 87 | Jax | +0.35 | 0.35 | 0.00 |  |
| 88 | Nami | +0.34 | 0.44 | 0.10 |  |
| 89 | Yasuo | +0.34 | 0.34 | 0.00 |  |
| 90 | Neeko | +0.33 | 0.44 | 0.11 |  |
| 91 | LeBlanc | +0.33 | 0.41 | 0.08 |  |
| 92 | Braum | +0.32 | 0.45 | 0.13 | projectile block (Unbreakable) |
| 93 | Syndra | +0.32 | 0.44 | 0.12 |  |
| 94 | Karma | +0.32 | 0.41 | 0.09 |  |
| 95 | Miss Fortune | +0.31 | 0.65 | 0.34 | range (attacks) |
| 96 | Hwei | +0.31 | 0.46 | 0.15 |  |
| 97 | Cassiopeia | +0.31 | 0.44 | 0.13 |  |
| 98 | Xin Zhao | +0.31 | 0.44 | 0.13 |  |
| 99 | Garen | +0.30 | 0.30 | 0.00 |  |
| 100 | Swain | +0.29 | 0.39 | 0.10 |  |
| 101 | Aurelion Sol | +0.28 | 0.44 | 0.16 |  |
| 102 | Nasus | +0.27 | 0.33 | 0.06 |  |
| 103 | Janna | +0.26 | 0.72 | 0.46 | range (attacks) |
| 104 | Akshan | +0.25 | 0.63 | 0.38 | range (attacks) |
| 105 | Ivern | +0.23 | 0.36 | 0.13 |  |
| 106 | Thresh | +0.23 | 0.36 | 0.13 |  |
| 107 | Jhin | +0.15 | 0.53 | 0.38 | range (attacks) |
| 108 | Vel'Koz | +0.14 | 0.50 | 0.36 | range (attacks) |
| 109 | Urgot | +0.14 | 0.27 | 0.13 |  |
| 110 | Xerath | +0.13 | 0.50 | 0.37 | range (attacks) |
| 111 | Rakan | +0.12 | 0.22 | 0.10 |  |
| 112 | Malphite | +0.12 | 0.21 | 0.09 |  |
| 113 | Lillia | +0.06 | 0.19 | 0.13 |  |
| 114 | Ryze | +0.04 | 0.48 | 0.44 |  |
| 115 | Karthus | +0.02 | 0.36 | 0.34 |  |
| 116 | Rammus | +0.01 | 0.32 | 0.31 |  |
| 117 | Mordekaiser | +0.01 | 0.08 | 0.07 |  |
| 118 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Rell | 0.00 | 0.00 | 0.00 |  |
| 121 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 122 | Riven | 0.00 | 0.00 | 0.00 |  |
| 123 | Yone | 0.00 | 0.00 | 0.00 |  |
| 124 | Aatrox | -0.06 | 0.00 | 0.06 |  |
| 125 | Ambessa | -0.06 | 0.00 | 0.06 |  |
| 126 | Illaoi | -0.06 | 0.00 | 0.06 |  |
| 127 | Jarvan IV | -0.06 | 0.00 | 0.06 |  |
| 128 | Kassadin | -0.06 | 0.00 | 0.06 |  |
| 129 | Lee Sin | -0.06 | 0.00 | 0.06 |  |
| 130 | Nautilus | -0.06 | 0.00 | 0.06 |  |
| 131 | Singed | -0.06 | 0.00 | 0.06 |  |
| 132 | Sylas | -0.06 | 0.00 | 0.06 |  |
| 133 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 134 | Yorick | -0.06 | 0.00 | 0.06 |  |
| 135 | Dr. Mundo | -0.07 | 0.00 | 0.07 |  |
| 136 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 137 | Diana | -0.10 | 0.00 | 0.10 |  |
| 138 | K'Sante | -0.10 | 0.00 | 0.10 |  |
| 139 | Leona | -0.10 | 0.00 | 0.10 |  |
| 140 | Locke | -0.10 | 0.00 | 0.10 |  |
| 141 | Rumble | -0.10 | 0.00 | 0.10 |  |
| 142 | Taliyah | -0.11 | 0.50 | 0.61 | range (attacks) |
| 143 | Darius | -0.12 | 0.00 | 0.12 |  |
| 144 | Hecarim | -0.12 | 0.00 | 0.12 |  |
| 145 | Cho'Gath | -0.13 | 0.00 | 0.13 |  |
| 146 | Sejuani | -0.13 | 0.00 | 0.13 |  |
| 147 | Trundle | -0.13 | 0.00 | 0.13 |  |
| 148 | Fiddlesticks | -0.14 | 0.36 | 0.50 |  |
| 149 | Volibear | -0.14 | 0.00 | 0.14 |  |
| 150 | Akali | -0.15 | 0.00 | 0.15 |  |
| 151 | Briar | -0.15 | 0.00 | 0.15 |  |
| 152 | Fizz | -0.15 | 0.00 | 0.15 |  |
| 153 | Shyvana | -0.15 | 0.00 | 0.15 |  |
| 154 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 155 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 156 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 157 | Sett | -0.16 | 0.00 | 0.16 |  |
| 158 | Talon | -0.17 | 0.00 | 0.17 |  |
| 159 | Shen | -0.18 | 0.33 | 0.51 |  |
| 160 | Galio | -0.18 | 0.00 | 0.18 |  |
| 161 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 162 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 163 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 164 | Vi | -0.22 | 0.00 | 0.22 |  |
| 165 | Kha'Zix | -0.23 | 0.00 | 0.23 |  |
| 166 | Pyke | -0.24 | 0.00 | 0.24 |  |
| 167 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 168 | Viego | -0.28 | 0.00 | 0.28 |  |
| 169 | Nunu & Willump | -0.30 | 0.19 | 0.49 |  |
| 170 | Tahm Kench | -0.35 | 0.00 | 0.35 |  |
| 171 | Zac | -0.38 | 0.00 | 0.38 |  |
| 172 | Naafiri | -0.53 | 0.00 | 0.53 |  |
