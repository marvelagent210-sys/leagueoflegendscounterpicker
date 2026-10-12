# Counters to Yorick (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 47 other champions with a simulator kit against Yorick: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yorick wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yorick --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Zaahen | +0.70 | +0.93 | +1.00 | +1.00 | −0.03 | – | −0.93 |
| 2 | Aatrox | −0.21 | −0.50 | −0.82 | +0.98 | −0.00 | – | −1.00 |
| 3 | Darius | −0.36 | −1.00 | +0.82 | −1.00 | −0.21 | – | −1.00 |
| 4 | Kayle | −0.74 | −1.00 | −1.00 | −1.00 | +0.43 | −1.00 | +0.00 |
| 5 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 6 | Poppy | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 7 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 8 | Heimerdinger | −0.76 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | +0.00 |
| 9 | Illaoi | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 10 | Cho'Gath | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 11 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 12 | Tahm Kench | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 13 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 14 | Rumble | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 15 | Mordekaiser | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 16 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 17 | Sion | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 18 | Gnar | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 19 | Tryndamere | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 20 | Dr. Mundo | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 21 | Kled | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 22 | Nasus | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 23 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 24 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 25 | Teemo | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 26 | Gwen | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.02 |
| 27 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 28 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 29 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 30 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 31 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 32 | Yasuo | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 33 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 34 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 35 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 36 | Fiora | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | – | −1.00 |
| 37 | Yone | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | – | −1.00 |
| 38 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | – | −1.00 |
| 39 | Aurora | −0.82 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −1.00 |
| 40 | K'Sante | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 41 | Olaf | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | – | −1.00 |
| 42 | Volibear | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 43 | Trundle | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 44 | Kennen | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 45 | Camille | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 46 | Garen | −0.85 | −1.00 | −1.00 | −1.00 | −0.11 | – | −1.00 |
| 47 | Quinn | −0.87 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −1.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Yorick's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yorick's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yorick` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +1.27)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Yorick's (500 vs 175 attack range). Yorick has no dash or blink to close the gap. (Teemo basic attacks → Yorick basic attacks)
- **0.50** blind: Blinding Dart's blind makes Yorick's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Yorick basic attacks)
- **0.36** blind: Blinding Dart's blind makes Yorick's Last Rites, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Yorick Q Last Rites)

#### 2. Lulu (net +1.04)

- **0.68** range: Lulu's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Lulu basic attacks → Yorick basic attacks)
- **0.36** disarm: Whimsy disarms Yorick for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Yorick basic attacks)

#### 3. Xayah (net +1.00)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Yorick's (525 vs 175 attack range). Yorick has no dash or blink to close the gap. (Xayah basic attacks → Yorick basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Yorick's Dark Procession. Untargetable for 1.5 s, long enough to use ahead of Dark Procession. (Xayah R Featherstorm → Yorick W Dark Procession)

#### 4. Morgana (net +0.97)

- **0.60** cc immunity: Black Shield makes Morgana immune to Yorick's Dark Procession (airborne). Immune for 5 s, long enough to use ahead of Dark Procession. (Morgana E Black Shield → Yorick W Dark Procession)
- **0.33** range: Morgana's basic attacks reach 275 units farther than Yorick's (450 vs 175 attack range). Yorick has no dash or blink to close the gap. (Morgana basic attacks → Yorick basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Yorick's Mourning Mist (slow). Immune for 5 s, long enough to use ahead of Mourning Mist. (Morgana E Black Shield → Yorick E Mourning Mist)

#### 5. Bard (net +0.96)

- **0.62** range: Bard's basic attacks reach 325 units farther than Yorick's (500 vs 175 attack range). Yorick has no dash or blink to close the gap. (Bard basic attacks → Yorick basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Yorick's Dark Procession. Untargetable for 2.5 s, long enough to use ahead of Dark Procession. (Bard R Tempered Fate → Yorick W Dark Procession)

#### 6. Elise (net +0.95)

- **0.61** range: Elise's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Elise basic attacks → Yorick basic attacks)
- **0.34** untargetable: Rappel makes Elise untargetable, dodging Yorick's Dark Procession. Untargetable for 0.6 s; Dark Procession lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Yorick W Dark Procession)

#### 7. Kalista (net +0.85)

- **0.57** range: Kalista's basic attacks reach 350 units farther than Yorick's (525 vs 175 attack range). Yorick has no dash or blink to close the gap. (Kalista basic attacks → Yorick basic attacks)
- **0.26** cleanse: Fate's Call cleanses Yorick's Dark Procession (airborne) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Yorick W Dark Procession)
- **0.04** cleanse: Fate's Call cleanses Yorick's Mourning Mist (slow) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Yorick E Mourning Mist)

#### 8. Vladimir (net +0.83)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yorick's Dark Procession. Untargetable for 2 s, long enough to use ahead of Dark Procession. (Vladimir W Sanguine Pool → Yorick W Dark Procession)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Yorick's (450 vs 175 attack range). Yorick has no dash or blink to close the gap. (Vladimir basic attacks → Yorick basic attacks)
- Watch out: Dark Procession's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Zeri (net +0.83)

- **0.83** range: Zeri's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Zeri basic attacks → Yorick basic attacks)

#### 10. Aurora (net +0.81)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Aurora basic attacks → Yorick basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Yorick's Dark Procession. Untargetable for 0.4 s; Dark Procession lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Yorick W Dark Procession)
- **0.14** cc immunity: Between Worlds is displacement immune, ignoring Yorick's Dark Procession (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Yorick W Dark Procession)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +1.27 | 1.27 | 0.00 | range (attacks), blind (Blinding Dart) |
| 2 | Lulu | +1.04 | 1.04 | 0.00 | range (attacks) |
| 3 | Xayah | +1.00 | 1.00 | 0.00 | range (attacks) |
| 4 | Morgana | +0.97 | 0.97 | 0.00 |  |
| 5 | Bard | +0.96 | 0.96 | 0.00 | range (attacks) |
| 6 | Elise | +0.95 | 0.95 | 0.00 | range (attacks) |
| 7 | Kalista | +0.85 | 0.85 | 0.00 | range (attacks) |
| 8 | Vladimir | +0.83 | 0.90 | 0.07 |  |
| 9 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 10 | Aurora | +0.81 | 0.81 | 0.00 | range (attacks) |
| 11 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 12 | Samira | +0.81 | 0.81 | 0.00 | range (attacks) |
| 13 | Sivir | +0.81 | 0.81 | 0.00 | range (attacks) |
| 14 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 15 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 16 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 17 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 18 | Mel | +0.76 | 0.76 | 0.00 | range (attacks) |
| 19 | Udyr | +0.76 | 0.76 | 0.00 |  |
| 20 | Lissandra | +0.75 | 0.75 | 0.00 |  |
| 21 | Milio | +0.73 | 0.73 | 0.00 | range (attacks) |
| 22 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Kayle | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Corki | +0.70 | 0.70 | 0.00 | range (attacks) |
| 28 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 29 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 30 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 31 | Varus | +0.64 | 0.75 | 0.11 | range (attacks) |
| 32 | Vex | +0.64 | 0.64 | 0.00 | range (attacks) |
| 33 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 34 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 35 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 36 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 37 | Jax | +0.60 | 0.60 | 0.00 | attack dodge (Counter Strike) |
| 38 | Rengar | +0.60 | 0.60 | 0.00 |  |
| 39 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 40 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 41 | Yuumi | +0.56 | 0.96 | 0.40 | range (attacks) |
| 42 | Gangplank | +0.55 | 0.55 | 0.00 |  |
| 43 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 44 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 45 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 46 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 47 | Fiora | +0.51 | 0.51 | 0.00 |  |
| 48 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 49 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 50 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 51 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 52 | Quinn | +0.49 | 0.67 | 0.18 | range (attacks) |
| 53 | Nilah | +0.49 | 0.49 | 0.00 |  |
| 54 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 55 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 56 | Azir | +0.47 | 0.47 | 0.00 |  |
| 57 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 58 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 59 | Braum | +0.45 | 0.45 | 0.00 | projectile block (Unbreakable) |
| 60 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 61 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 62 | Annie | +0.44 | 0.44 | 0.00 |  |
| 63 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 64 | Heimerdinger | +0.42 | 0.42 | 0.00 |  |
| 65 | Maokai | +0.42 | 0.42 | 0.00 |  |
| 66 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 67 | Brand | +0.41 | 0.41 | 0.00 |  |
| 68 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 69 | Graves | +0.41 | 0.41 | 0.00 |  |
| 70 | Nami | +0.41 | 0.41 | 0.00 |  |
| 71 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 72 | Rek'Sai | +0.41 | 0.41 | 0.00 |  |
| 73 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 74 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 75 | Malphite | +0.39 | 0.39 | 0.00 |  |
| 76 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 77 | Karma | +0.38 | 0.38 | 0.00 |  |
| 78 | Kled | +0.38 | 0.38 | 0.00 |  |
| 79 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 80 | Olaf | +0.37 | 0.37 | 0.00 |  |
| 81 | Swain | +0.36 | 0.36 | 0.00 |  |
| 82 | Malzahar | +0.34 | 0.74 | 0.40 |  |
| 83 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 84 | Gwen | +0.34 | 0.34 | 0.00 |  |
| 85 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 86 | Aurelion Sol | +0.33 | 0.41 | 0.08 |  |
| 87 | Singed | +0.33 | 0.33 | 0.00 |  |
| 88 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 89 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 90 | Yasuo | +0.31 | 0.31 | 0.00 |  |
| 91 | Alistar | +0.29 | 0.29 | 0.00 |  |
| 92 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 93 | K'Sante | +0.28 | 0.28 | 0.00 |  |
| 94 | Sion | +0.27 | 0.39 | 0.12 |  |
| 95 | Camille | +0.27 | 0.27 | 0.00 |  |
| 96 | Zaahen | +0.24 | 0.24 | 0.00 |  |
| 97 | Ekko | +0.23 | 0.23 | 0.00 |  |
| 98 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 99 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 100 | Master Yi | +0.21 | 0.41 | 0.20 |  |
| 101 | Evelynn | +0.21 | 0.21 | 0.00 |  |
| 102 | Shaco | +0.21 | 0.21 | 0.00 |  |
| 103 | Zed | +0.20 | 0.20 | 0.00 |  |
| 104 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 105 | Ivern | +0.19 | 0.33 | 0.14 |  |
| 106 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 107 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 108 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 109 | Hecarim | +0.15 | 0.15 | 0.00 |  |
| 110 | Rammus | +0.14 | 0.38 | 0.24 |  |
| 111 | Illaoi | +0.14 | 0.14 | 0.00 |  |
| 112 | Jarvan IV | +0.14 | 0.14 | 0.00 |  |
| 113 | Nocturne | +0.14 | 0.14 | 0.00 |  |
| 114 | Ornn | +0.14 | 0.14 | 0.00 |  |
| 115 | Sett | +0.14 | 0.14 | 0.00 |  |
| 116 | Shyvana | +0.14 | 0.14 | 0.00 |  |
| 117 | Volibear | +0.14 | 0.14 | 0.00 |  |
| 118 | Yone | +0.14 | 0.14 | 0.00 |  |
| 119 | Garen | +0.12 | 0.12 | 0.00 |  |
| 120 | Shen | +0.11 | 0.56 | 0.45 |  |
| 121 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 122 | Warwick | +0.10 | 0.38 | 0.28 |  |
| 123 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 124 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 125 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 130 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 131 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 132 | Briar | 0.00 | 0.00 | 0.00 |  |
| 133 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 134 | Darius | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 142 | Leona | 0.00 | 0.00 | 0.00 |  |
| 143 | Locke | 0.00 | 0.00 | 0.00 |  |
| 144 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 153 | Talon | 0.00 | 0.00 | 0.00 |  |
| 154 | Taric | 0.00 | 0.00 | 0.00 |  |
| 155 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Xin Zhao | 0.00 | 0.00 | 0.00 |  |
| 158 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 159 | Katarina | -0.06 | 0.22 | 0.28 |  |
| 160 | Viego | -0.06 | 0.14 | 0.20 |  |
| 161 | Pantheon | -0.09 | 0.00 | 0.09 |  |
| 162 | Fiddlesticks | -0.10 | 0.34 | 0.44 |  |
| 163 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 164 | Gragas | -0.15 | 0.00 | 0.15 |  |
| 165 | Galio | -0.18 | 0.00 | 0.18 |  |
| 166 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 167 | Vi | -0.21 | 0.14 | 0.35 |  |
| 168 | Kayn | -0.24 | 0.21 | 0.45 |  |
| 169 | Nunu & Willump | -0.36 | 0.13 | 0.49 |  |
| 170 | Zac | -0.43 | 0.00 | 0.43 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
