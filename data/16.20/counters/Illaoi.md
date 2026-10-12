# Counters to Illaoi (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Illaoi: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Illaoi wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Illaoi --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | +0.00 |
| 2 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.00 |
| 3 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 4 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 5 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 6 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 7 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 8 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 9 | Yorick | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 10 | Heimerdinger | +0.57 | +0.48 | +0.69 | +1.00 | +0.16 | +0.55 | +0.00 |
| 11 | Aurora | +0.43 | +1.00 | +1.00 | −0.94 | +0.16 | +0.95 | +0.00 |
| 12 | Gnar | +0.43 | +1.00 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 13 | Zaahen | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 14 | Darius | +0.33 | +1.00 | +1.00 | −1.00 | −0.03 | – | +0.00 |
| 15 | Volibear | +0.27 | +0.91 | −0.70 | +1.00 | −0.09 | – | +0.00 |
| 16 | Kled | +0.25 | −0.87 | +0.97 | +0.92 | +0.11 | – | +0.00 |
| 17 | Poppy | +0.17 | +1.00 | −1.00 | +0.70 | +0.08 | – | +0.00 |
| 18 | Kennen | −0.05 | +0.21 | +0.18 | −0.87 | −0.04 | +0.36 | +0.00 |
| 19 | Jayce | −0.17 | +0.26 | −0.36 | −0.31 | +0.10 | −1.00 | +0.00 |
| 20 | Quinn | −0.23 | −0.88 | −0.95 | +0.98 | −0.06 | +0.35 | +0.00 |
| 21 | Malphite | −0.29 | −0.23 | −0.66 | −1.00 | +0.25 | +0.93 | +0.00 |
| 22 | Fiora | −0.36 | −0.37 | −0.36 | −1.00 | +0.07 | – | +1.00 |
| 23 | Irelia | −0.46 | −1.00 | −0.33 | −0.77 | +0.02 | +0.25 | +0.00 |
| 24 | Sion | −0.51 | +0.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 25 | Olaf | −0.53 | −0.53 | −0.53 | −1.00 | −0.08 | – | +0.00 |
| 26 | Udyr | −0.54 | −0.64 | −0.64 | −0.91 | +0.08 | – | +0.00 |
| 27 | Tahm Kench | −0.57 | −1.00 | −0.04 | −1.00 | −0.08 | −1.00 | +0.00 |
| 28 | Singed | −0.57 | −0.54 | −0.70 | −0.98 | −0.08 | – | +0.00 |
| 29 | Gwen | −0.63 | −1.00 | −1.00 | −0.21 | −0.18 | – | +0.00 |
| 30 | Mordekaiser | −0.63 | −0.82 | −0.49 | −1.00 | −0.04 | −0.98 | +0.00 |
| 31 | Camille | −0.66 | −1.00 | −0.59 | −1.00 | +0.02 | – | +0.00 |
| 32 | Jax | −0.75 | −0.95 | −0.96 | −1.00 | +0.03 | – | +0.00 |
| 33 | Ornn | −0.76 | −0.95 | −0.96 | −1.00 | +0.12 | −1.00 | +0.00 |
| 34 | Rumble | −0.77 | −0.94 | −0.98 | −1.00 | −0.08 | – | +0.00 |
| 35 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 36 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 37 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 38 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 39 | Yone | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 40 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 41 | Riven | −0.79 | −1.00 | −1.00 | −0.97 | −0.12 | – | +0.00 |
| 42 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 43 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 44 | Yasuo | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 45 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 46 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 47 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 48 | Aatrox | −0.81 | −0.96 | −1.00 | −1.00 | −0.25 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Illaoi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Illaoi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Illaoi` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Kindred (net +0.88)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Illaoi's (500 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Kindred basic attacks → Illaoi basic attacks)
- **0.41** invulnerable: Lamb's Respite makes Kindred invulnerable to Illaoi's Leap of Faith. Invulnerable for ?; Leap of Faith takes 0.5 s to land, enough to react. (Kindred R Lamb's Respite → Illaoi R Leap of Faith)

#### 2. Elise (net +0.87)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Illaoi's Leap of Faith. Untargetable for 0.6 s; Leap of Faith takes 0.5 s to land, enough to react. (Elise E Rappel → Illaoi R Leap of Faith)
- **0.32** range: Elise's basic attacks reach 425 units farther than Illaoi's (550 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Elise basic attacks → Illaoi basic attacks)

#### 3. Kayle (net +0.87)

- **0.51** invulnerable: Divine Judgment makes Kayle invulnerable to Illaoi's Leap of Faith. Invulnerable for 2.5 s, long enough to use ahead of Leap of Faith. (Kayle R Divine Judgment → Illaoi R Leap of Faith)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Illaoi's (625 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Kayle basic attacks → Illaoi basic attacks)

#### 4. Yuumi (net +0.87)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Illaoi's Leap of Faith. Untargetable for ?; Leap of Faith takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Illaoi R Leap of Faith)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Illaoi's (425 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Yuumi basic attacks → Illaoi basic attacks)

#### 5. Xayah (net +0.83)

- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Illaoi's Leap of Faith. Untargetable for 1.5 s, long enough to use ahead of Leap of Faith. (Xayah R Featherstorm → Illaoi R Leap of Faith)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Illaoi's (525 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Xayah basic attacks → Illaoi basic attacks)

#### 6. Bard (net +0.79)

- **0.51** untargetable: Tempered Fate makes Bard untargetable, dodging Illaoi's Leap of Faith. Untargetable for 2.5 s, long enough to use ahead of Leap of Faith. (Bard R Tempered Fate → Illaoi R Leap of Faith)
- **0.36** range: Bard's basic attacks reach 375 units farther than Illaoi's (500 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Bard basic attacks → Illaoi basic attacks)
- Watch out: Leap of Faith is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 7. Sivir (net +0.75)

- **0.47** range: Sivir's basic attacks reach 375 units farther than Illaoi's (500 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Sivir basic attacks → Illaoi basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Illaoi's Leap of Faith. Spell shield for 1.5 s, long enough to use ahead of Leap of Faith. A spell shield blocks only the first enemy ability that reaches it. Spell shields will block the ability's damage but will not prevent Tentacles from spawning. (Sivir E Spell Shield → Illaoi R Leap of Faith)

#### 8. Lissandra (net +0.73)

- **0.51** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Illaoi's Leap of Faith. Untargetable for 2.5 s, long enough to use ahead of Leap of Faith. (Lissandra R Frozen Tomb → Illaoi R Leap of Faith)
- **0.22** range: Lissandra's basic attacks reach 425 units farther than Illaoi's (550 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Lissandra basic attacks → Illaoi basic attacks)
- **0.10** dash stop: Frozen Tomb's knockdown can stop Illaoi's Harsh Lesson mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Lissandra R Frozen Tomb → Illaoi W Harsh Lesson)
- Watch out: Leap of Faith is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 9. Vladimir (net +0.73)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Illaoi's Leap of Faith. Untargetable for 2 s, long enough to use ahead of Leap of Faith. (Vladimir W Sanguine Pool → Illaoi R Leap of Faith)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Illaoi's (450 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Vladimir basic attacks → Illaoi basic attacks)

#### 10. Teemo (net +0.64)

- **0.38** blind: Blinding Dart's blind makes Illaoi's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Illaoi basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Illaoi's (500 vs 125 attack range). Illaoi closes the gap with Harsh Lesson. (Teemo basic attacks → Illaoi basic attacks)
- Watch out: Test of Spirit reveals Teemo through Guerrilla Warfare's stealth.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kindred | +0.88 | 0.88 | 0.00 |  |
| 2 | Elise | +0.87 | 0.87 | 0.00 |  |
| 3 | Kayle | +0.87 | 0.87 | 0.00 |  |
| 4 | Yuumi | +0.87 | 0.87 | 0.00 |  |
| 5 | Xayah | +0.83 | 0.83 | 0.00 |  |
| 6 | Bard | +0.79 | 0.87 | 0.08 |  |
| 7 | Sivir | +0.75 | 0.75 | 0.00 |  |
| 8 | Lissandra | +0.73 | 0.78 | 0.05 |  |
| 9 | Vladimir | +0.73 | 0.73 | 0.00 |  |
| 10 | Teemo | +0.64 | 0.72 | 0.08 |  |
| 11 | Master Yi | +0.62 | 0.62 | 0.00 |  |
| 12 | Aurora | +0.59 | 0.74 | 0.15 |  |
| 13 | Fiora | +0.59 | 0.59 | 0.00 |  |
| 14 | Lulu | +0.55 | 0.63 | 0.08 |  |
| 15 | Ekko | +0.55 | 0.55 | 0.00 |  |
| 16 | Gwen | +0.55 | 0.55 | 0.00 |  |
| 17 | Pantheon | +0.55 | 0.55 | 0.00 |  |
| 18 | Maokai | +0.48 | 0.55 | 0.07 |  |
| 19 | Zed | +0.45 | 0.45 | 0.00 |  |
| 20 | Kayn | +0.44 | 0.51 | 0.07 |  |
| 21 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 22 | Evelynn | +0.43 | 0.51 | 0.08 |  |
| 23 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 24 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 25 | Twisted Fate | +0.43 | 0.43 | 0.00 |  |
| 26 | Mel | +0.42 | 0.42 | 0.00 |  |
| 27 | Viktor | +0.41 | 0.45 | 0.04 |  |
| 28 | Sona | +0.41 | 0.41 | 0.00 |  |
| 29 | Taric | +0.41 | 0.41 | 0.00 |  |
| 30 | Jinx | +0.39 | 0.43 | 0.04 |  |
| 31 | Varus | +0.39 | 0.39 | 0.00 |  |
| 32 | Samira | +0.37 | 0.46 | 0.09 |  |
| 33 | Milio | +0.37 | 0.44 | 0.07 |  |
| 34 | Vex | +0.36 | 0.39 | 0.03 |  |
| 35 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 36 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 37 | Lucian | +0.36 | 0.36 | 0.00 |  |
| 38 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 39 | Rek'Sai | +0.35 | 0.51 | 0.16 |  |
| 40 | Camille | +0.33 | 0.48 | 0.15 |  |
| 41 | Singed | +0.33 | 0.40 | 0.07 |  |
| 42 | Veigar | +0.33 | 0.37 | 0.04 |  |
| 43 | Twitch | +0.32 | 0.43 | 0.11 |  |
| 44 | Nilah | +0.32 | 0.40 | 0.08 |  |
| 45 | Malzahar | +0.32 | 0.37 | 0.05 |  |
| 46 | Ahri | +0.32 | 0.36 | 0.04 |  |
| 47 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 48 | Miss Fortune | +0.32 | 0.32 | 0.00 |  |
| 49 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 50 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 51 | Shaco | +0.31 | 0.51 | 0.20 |  |
| 52 | Renata Glasc | +0.31 | 0.38 | 0.07 |  |
| 53 | Jax | +0.31 | 0.31 | 0.00 |  |
| 54 | Hwei | +0.30 | 0.37 | 0.07 |  |
| 55 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 56 | Quinn | +0.29 | 0.38 | 0.09 |  |
| 57 | Draven | +0.29 | 0.36 | 0.07 |  |
| 58 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 59 | Lux | +0.29 | 0.29 | 0.00 |  |
| 60 | Morgana | +0.29 | 0.29 | 0.00 |  |
| 61 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 62 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 63 | Shen | +0.29 | 0.29 | 0.00 |  |
| 64 | Tristana | +0.28 | 0.36 | 0.08 |  |
| 65 | Nocturne | +0.28 | 0.28 | 0.00 |  |
| 66 | Xin Zhao | +0.27 | 0.45 | 0.18 |  |
| 67 | Kai'Sa | +0.27 | 0.38 | 0.11 |  |
| 68 | Jhin | +0.27 | 0.27 | 0.00 |  |
| 69 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 70 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 71 | Xerath | +0.27 | 0.27 | 0.00 |  |
| 72 | Gnar | +0.25 | 0.33 | 0.08 |  |
| 73 | Zoe | +0.25 | 0.32 | 0.07 |  |
| 74 | Heimerdinger | +0.25 | 0.25 | 0.00 |  |
| 75 | Graves | +0.24 | 0.24 | 0.00 |  |
| 76 | Ryze | +0.24 | 0.24 | 0.00 |  |
| 77 | Corki | +0.23 | 0.30 | 0.07 |  |
| 78 | Jayce | +0.23 | 0.30 | 0.07 |  |
| 79 | Vayne | +0.22 | 0.43 | 0.21 |  |
| 80 | Annie | +0.22 | 0.22 | 0.00 |  |
| 81 | Brand | +0.22 | 0.22 | 0.00 |  |
| 82 | Karma | +0.22 | 0.22 | 0.00 |  |
| 83 | Senna | +0.21 | 0.32 | 0.11 |  |
| 84 | Akshan | +0.20 | 0.34 | 0.14 |  |
| 85 | Vel'Koz | +0.20 | 0.27 | 0.07 |  |
| 86 | Fiddlesticks | +0.20 | 0.20 | 0.00 |  |
| 87 | Orianna | +0.19 | 0.27 | 0.08 |  |
| 88 | Ivern | +0.19 | 0.19 | 0.00 |  |
| 89 | Karthus | +0.19 | 0.19 | 0.00 |  |
| 90 | Kalista | +0.17 | 0.36 | 0.19 |  |
| 91 | Rammus | +0.16 | 0.29 | 0.13 |  |
| 92 | Braum | +0.15 | 0.23 | 0.08 |  |
| 93 | Syndra | +0.15 | 0.22 | 0.07 |  |
| 94 | LeBlanc | +0.14 | 0.22 | 0.08 |  |
| 95 | Swain | +0.14 | 0.21 | 0.07 |  |
| 96 | Janna | +0.13 | 0.36 | 0.23 |  |
| 97 | Aurelion Sol | +0.13 | 0.22 | 0.09 |  |
| 98 | Garen | +0.12 | 0.12 | 0.00 |  |
| 99 | Katarina | +0.12 | 0.12 | 0.00 |  |
| 100 | Azir | +0.11 | 0.27 | 0.16 |  |
| 101 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 102 | Ziggs | +0.10 | 0.27 | 0.17 |  |
| 103 | Anivia | +0.10 | 0.24 | 0.14 |  |
| 104 | Poppy | +0.09 | 0.29 | 0.20 |  |
| 105 | Zyra | +0.08 | 0.24 | 0.16 |  |
| 106 | Gangplank | +0.08 | 0.08 | 0.00 |  |
| 107 | Warwick | +0.07 | 0.13 | 0.06 |  |
| 108 | Thresh | +0.06 | 0.19 | 0.13 |  |
| 109 | Urgot | +0.06 | 0.15 | 0.09 |  |
| 110 | Nunu & Willump | +0.06 | 0.13 | 0.07 |  |
| 111 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 112 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 113 | Amumu | +0.05 | 0.10 | 0.05 |  |
| 114 | Irelia | +0.05 | 0.05 | 0.00 |  |
| 115 | Nami | +0.04 | 0.22 | 0.18 |  |
| 116 | Neeko | +0.03 | 0.22 | 0.19 |  |
| 117 | Lillia | +0.03 | 0.11 | 0.08 |  |
| 118 | Zac | 0.00 | 0.16 | 0.16 |  |
| 119 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 120 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 121 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 122 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 123 | Leona | 0.00 | 0.00 | 0.00 |  |
| 124 | Locke | 0.00 | 0.00 | 0.00 |  |
| 125 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 126 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 127 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 128 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 129 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 130 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 131 | Taliyah | -0.01 | 0.27 | 0.28 |  |
| 132 | Malphite | -0.01 | 0.19 | 0.20 |  |
| 133 | Rengar | -0.05 | 0.09 | 0.14 |  |
| 134 | Briar | -0.05 | 0.00 | 0.05 |  |
| 135 | Kled | -0.06 | 0.18 | 0.24 |  |
| 136 | Sion | -0.06 | 0.06 | 0.12 |  |
| 137 | Rakan | -0.07 | 0.13 | 0.20 |  |
| 138 | Mordekaiser | -0.07 | 0.07 | 0.14 |  |
| 139 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 140 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 141 | Darius | -0.07 | 0.00 | 0.07 |  |
| 142 | Sett | -0.07 | 0.00 | 0.07 |  |
| 143 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 144 | Alistar | -0.08 | 0.04 | 0.12 |  |
| 145 | Diana | -0.08 | 0.00 | 0.08 |  |
| 146 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 147 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 148 | Yasuo | -0.09 | 0.19 | 0.28 |  |
| 149 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 150 | Akali | -0.11 | 0.00 | 0.11 |  |
| 151 | Viego | -0.12 | 0.09 | 0.21 |  |
| 152 | Zaahen | -0.12 | 0.06 | 0.18 |  |
| 153 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 154 | Talon | -0.14 | 0.00 | 0.14 |  |
| 155 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 156 | Yone | -0.15 | 0.10 | 0.25 |  |
| 157 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 158 | Tahm Kench | -0.16 | 0.00 | 0.16 |  |
| 159 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 160 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 161 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 162 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 163 | Riven | -0.20 | 0.00 | 0.20 |  |
| 164 | Gragas | -0.21 | 0.00 | 0.21 |  |
| 165 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 166 | Rell | -0.24 | 0.00 | 0.24 |  |
| 167 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 168 | Vi | -0.25 | 0.00 | 0.25 |  |
| 169 | Qiyana | -0.26 | 0.00 | 0.26 |  |
| 170 | Jarvan IV | -0.28 | 0.00 | 0.28 |  |
| 171 | Galio | -0.30 | 0.00 | 0.30 |  |
| 172 | Wukong | -0.36 | 0.00 | 0.36 |  |
