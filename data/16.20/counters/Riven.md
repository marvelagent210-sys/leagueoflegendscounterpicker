# Counters to Riven (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Riven: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Riven wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Riven --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.95 | +1.00 | +1.00 | +1.00 | +1.00 | +1.00 | +0.00 |
| 2 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.50 |
| 3 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 4 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.11 | – | +1.00 |
| 5 | Ornn | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 6 | Quinn | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 7 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.50 |
| 8 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 9 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 10 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 11 | Illaoi | +0.79 | +1.00 | +1.00 | +0.97 | +0.12 | – | +0.00 |
| 12 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.26 | – | +1.00 |
| 13 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 14 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.50 |
| 15 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 16 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 17 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 18 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 19 | Kled | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 20 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 21 | Udyr | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 22 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 23 | Volibear | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 24 | Irelia | +0.70 | +1.00 | +1.00 | +0.64 | −0.01 | – | +0.00 |
| 25 | Zaahen | +0.69 | +1.00 | +1.00 | +0.76 | −0.21 | – | +0.00 |
| 26 | Urgot | +0.61 | +0.92 | +1.00 | +1.00 | +0.20 | −1.00 | +0.00 |
| 27 | Tahm Kench | +0.55 | +1.00 | +1.00 | +0.00 | −0.04 | – | +0.00 |
| 28 | Camille | +0.54 | +1.00 | +1.00 | +0.00 | −0.07 | – | +0.00 |
| 29 | Kayle | +0.52 | +1.00 | +1.00 | −1.00 | +0.79 | +1.00 | +0.00 |
| 30 | Mordekaiser | +0.47 | +0.54 | +0.65 | +0.75 | −0.14 | – | +0.00 |
| 31 | Gnar | +0.42 | +1.00 | +1.00 | −1.00 | +0.38 | +0.65 | +0.00 |
| 32 | Sion | +0.41 | +0.30 | +0.43 | +1.00 | −0.12 | – | +0.00 |
| 33 | Yone | +0.35 | +1.00 | +1.00 | −1.00 | −0.10 | – | +0.52 |
| 34 | Sett | +0.27 | +0.00 | +1.00 | +0.00 | −0.04 | – | +0.00 |
| 35 | Aurora | +0.27 | +1.00 | +1.00 | −1.00 | +0.46 | −1.00 | +0.00 |
| 36 | Kennen | +0.23 | +0.92 | +0.91 | −1.00 | −0.08 | −0.21 | +0.00 |
| 37 | Singed | +0.19 | −0.03 | −0.03 | +1.00 | −0.09 | – | +0.00 |
| 38 | Heimerdinger | +0.14 | +0.82 | −1.00 | +1.00 | +0.59 | −1.00 | +0.00 |
| 39 | Aatrox | −0.01 | −1.00 | +0.32 | +1.00 | −0.26 | – | +0.00 |
| 40 | Jayce | −0.40 | −1.00 | +0.17 | −0.95 | +0.27 | – | +0.00 |
| 41 | Pantheon | −0.58 | −1.00 | −1.00 | +0.00 | −0.14 | – | +0.00 |
| 42 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 43 | Yasuo | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 44 | Ambessa | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 45 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 46 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 47 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 48 | Gwen | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Riven's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Riven's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Riven` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.59)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven Q Broken Wings)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven W Ki Burst)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven R Wind Slash)

#### 2. Sivir (net +1.46)

- **0.83** spell shield: Spell Shield's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven Q Broken Wings)
- **0.44** spell shield: Spell Shield's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven W Ki Burst)
- **0.40** spell shield: Spell Shield's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven R Wind Slash)

#### 3. Udyr (net +1.35)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Riven's Broken Wings (airborne). Immune for 1.5 s, long enough to use ahead of Broken Wings. (Udyr E Blazing Stampede → Riven Q Broken Wings)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Riven's Ki Burst (stun). Immune for 1.5 s, long enough to use ahead of Ki Burst. (Udyr E Blazing Stampede → Riven W Ki Burst)

#### 4. Vladimir (net +1.28)

- **0.89** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Broken Wings. Untargetable for 2 s, long enough to use ahead of Broken Wings. (Vladimir W Sanguine Pool → Riven Q Broken Wings)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Ki Burst. Untargetable for 2 s, long enough to use ahead of Ki Burst. (Vladimir W Sanguine Pool → Riven W Ki Burst)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Wind Slash. Untargetable for 2 s, long enough to use ahead of Wind Slash. (Vladimir W Sanguine Pool → Riven R Wind Slash)
- Watch out: Broken Wings's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Morgana (net +1.25)

- **0.89** cc immunity: Black Shield makes Morgana immune to Riven's Broken Wings (airborne). Immune for 5 s, long enough to use ahead of Broken Wings. (Morgana E Black Shield → Riven Q Broken Wings)
- **0.46** cc immunity: Black Shield makes Morgana immune to Riven's Ki Burst (stun). Immune for 5 s, long enough to use ahead of Ki Burst. (Morgana E Black Shield → Riven W Ki Burst)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Riven's (450 vs 125 attack range). Riven closes the gap with Valor, Broken Wings. (Morgana basic attacks → Riven basic attacks)

#### 6. Elise (net +1.04)

- **0.50** untargetable: Rappel makes Elise untargetable, dodging Riven's Broken Wings. Untargetable for 0.6 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Riven Q Broken Wings)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Riven's Ki Burst. Untargetable for 0.6 s; Ki Burst takes 0.25 s to land, enough to react. (Elise E Rappel → Riven W Ki Burst)
- **0.40** untargetable: Rappel makes Elise untargetable, dodging Riven's Wind Slash. Untargetable for 0.6 s; Wind Slash takes 0.94 s to land, enough to react. (Elise E Rappel → Riven R Wind Slash)

#### 7. Fiora (net +1.03)

- **0.63** parry: Riposte parries Riven's Broken Wings and stuns back. Parry for 0.75 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Broken Wings's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven Q Broken Wings)
- **0.56** parry: Riposte parries Riven's Ki Burst and stuns back. Parry for 0.75 s; Ki Burst takes 0.25 s to land, enough to react. Negating Ki Burst's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven W Ki Burst)
- **0.43** parry: Riposte parries Riven's Wind Slash. Parry for 0.75 s; Wind Slash takes 0.94 s to land, enough to react. (Fiora W Riposte → Riven R Wind Slash)

#### 8. Rengar (net +1.03)

- **0.80** cleanse: Battle Roar cleanses Riven's Broken Wings (airborne) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven Q Broken Wings)
- **0.46** cleanse: Battle Roar cleanses Riven's Ki Burst (stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven W Ki Burst)

#### 9. Maokai (net +1.02)

- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Broken Wings. Untargetable for 1.4 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Riven Q Broken Wings)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Ki Burst. Untargetable for 1.4 s; Ki Burst takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Riven W Ki Burst)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Wind Slash. Untargetable for 1.4 s; Wind Slash takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Riven R Wind Slash)

#### 10. Bard (net +0.97)

- **0.50** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Broken Wings. Untargetable for 2.5 s, long enough to use ahead of Broken Wings. (Bard R Tempered Fate → Riven Q Broken Wings)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Ki Burst. Untargetable for 2.5 s, long enough to use ahead of Ki Burst. (Bard R Tempered Fate → Riven W Ki Burst)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Wind Slash. Untargetable for 2.5 s, long enough to use ahead of Wind Slash. (Bard R Tempered Fate → Riven R Wind Slash)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.59 | 1.59 | 0.00 |  |
| 2 | Sivir | +1.46 | 1.46 | 0.00 |  |
| 3 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 4 | Vladimir | +1.28 | 1.35 | 0.07 |  |
| 5 | Morgana | +1.25 | 1.25 | 0.00 |  |
| 6 | Elise | +1.04 | 1.04 | 0.00 |  |
| 7 | Fiora | +1.03 | 1.03 | 0.00 |  |
| 8 | Rengar | +1.03 | 1.03 | 0.00 |  |
| 9 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Gangplank | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.96 | 0.96 | 0.00 |  |
| 13 | Yuumi | +0.95 | 1.35 | 0.40 |  |
| 14 | Vex | +0.94 | 0.94 | 0.00 | dash stop (Doom 'n Gloom) |
| 15 | Lissandra | +0.92 | 0.92 | 0.00 |  |
| 16 | Singed | +0.87 | 0.87 | 0.00 | grounding (Mega Adhesive) |
| 17 | Viktor | +0.86 | 0.86 | 0.00 | dash stop (Gravity Field) |
| 18 | Jinx | +0.84 | 0.84 | 0.00 | dash stop (Flame Chompers!) |
| 19 | Cassiopeia | +0.82 | 0.82 | 0.00 | grounding (Miasma) |
| 20 | Gwen | +0.82 | 0.82 | 0.00 |  |
| 21 | Hwei | +0.80 | 0.80 | 0.00 | dash stop (Grim Visage) |
| 22 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 23 | Veigar | +0.77 | 0.77 | 0.00 | dash stop (Event Horizon) |
| 24 | Malzahar | +0.76 | 1.16 | 0.40 |  |
| 25 | Rek'Sai | +0.75 | 0.75 | 0.00 |  |
| 26 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 27 | Teemo | +0.72 | 0.72 | 0.00 | blind (Blinding Dart) |
| 28 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 29 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 30 | Kindred | +0.67 | 0.67 | 0.00 |  |
| 31 | Olaf | +0.66 | 0.66 | 0.00 |  |
| 32 | Master Yi | +0.63 | 0.82 | 0.19 |  |
| 33 | Lulu | +0.60 | 0.60 | 0.00 |  |
| 34 | Milio | +0.60 | 0.60 | 0.00 |  |
| 35 | Poppy | +0.59 | 0.79 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 36 | Pantheon | +0.59 | 0.68 | 0.09 |  |
| 37 | Sion | +0.58 | 0.70 | 0.12 |  |
| 38 | Ekko | +0.58 | 0.58 | 0.00 |  |
| 39 | Samira | +0.57 | 0.57 | 0.00 |  |
| 40 | Braum | +0.55 | 0.55 | 0.00 | projectile block (Unbreakable) |
| 41 | Camille | +0.55 | 0.55 | 0.00 |  |
| 42 | Kled | +0.54 | 0.54 | 0.00 |  |
| 43 | Yone | +0.54 | 0.54 | 0.00 |  |
| 44 | Alistar | +0.53 | 0.53 | 0.00 |  |
| 45 | Evelynn | +0.53 | 0.53 | 0.00 |  |
| 46 | Mel | +0.53 | 0.53 | 0.00 |  |
| 47 | Shaco | +0.53 | 0.53 | 0.00 |  |
| 48 | Zed | +0.52 | 0.52 | 0.00 |  |
| 49 | Warwick | +0.49 | 0.76 | 0.27 |  |
| 50 | Zaahen | +0.47 | 0.47 | 0.00 |  |
| 51 | Malphite | +0.45 | 0.45 | 0.00 |  |
| 52 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 53 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 54 | Xin Zhao | +0.41 | 0.41 | 0.00 |  |
| 55 | Yasuo | +0.41 | 0.41 | 0.00 | projectile block (Wind Wall) |
| 56 | Corki | +0.40 | 0.40 | 0.00 |  |
| 57 | K'Sante | +0.40 | 0.40 | 0.00 |  |
| 58 | Taric | +0.40 | 0.40 | 0.00 |  |
| 59 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 60 | Amumu | +0.33 | 0.33 | 0.00 |  |
| 61 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 62 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 63 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 64 | Sona | +0.27 | 0.27 | 0.00 |  |
| 65 | Zac | +0.26 | 0.67 | 0.41 | dash stop (Stretching Strikes) |
| 66 | Aphelios | +0.26 | 0.26 | 0.00 |  |
| 67 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 68 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 69 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 70 | Draven | +0.24 | 0.24 | 0.00 |  |
| 71 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 72 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 73 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 74 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 75 | Senna | +0.22 | 0.22 | 0.00 |  |
| 76 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 77 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 78 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 79 | Hecarim | +0.21 | 0.21 | 0.00 |  |
| 80 | Illaoi | +0.20 | 0.20 | 0.00 |  |
| 81 | Jarvan IV | +0.20 | 0.20 | 0.00 |  |
| 82 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 83 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 84 | Ornn | +0.20 | 0.20 | 0.00 |  |
| 85 | Sett | +0.20 | 0.20 | 0.00 |  |
| 86 | Shyvana | +0.20 | 0.20 | 0.00 |  |
| 87 | Volibear | +0.20 | 0.20 | 0.00 |  |
| 88 | Varus | +0.19 | 0.30 | 0.11 |  |
| 89 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 90 | Lux | +0.19 | 0.19 | 0.00 |  |
| 91 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 92 | Azir | +0.18 | 0.18 | 0.00 |  |
| 93 | Garen | +0.18 | 0.18 | 0.00 |  |
| 94 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 95 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 96 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 97 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 98 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 99 | Graves | +0.16 | 0.16 | 0.00 |  |
| 100 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 101 | Annie | +0.15 | 0.15 | 0.00 |  |
| 102 | Brand | +0.15 | 0.15 | 0.00 |  |
| 103 | Karma | +0.15 | 0.15 | 0.00 |  |
| 104 | LeBlanc | +0.15 | 0.15 | 0.00 |  |
| 105 | Nami | +0.15 | 0.15 | 0.00 |  |
| 106 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 107 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 108 | Rammus | +0.14 | 0.38 | 0.24 |  |
| 109 | Swain | +0.14 | 0.14 | 0.00 |  |
| 110 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 111 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 112 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 113 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 114 | Kayn | +0.08 | 0.53 | 0.45 |  |
| 115 | Quinn | +0.08 | 0.26 | 0.18 |  |
| 116 | Aurelion Sol | +0.08 | 0.15 | 0.07 |  |
| 117 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 118 | Viego | +0.07 | 0.26 | 0.19 |  |
| 119 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 120 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 121 | Ivern | 0.00 | 0.13 | 0.13 |  |
| 122 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 123 | Akali | 0.00 | 0.00 | 0.00 |  |
| 124 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 125 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 126 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 127 | Briar | 0.00 | 0.00 | 0.00 |  |
| 128 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 129 | Darius | 0.00 | 0.00 | 0.00 |  |
| 130 | Diana | 0.00 | 0.00 | 0.00 |  |
| 131 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 132 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 133 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 134 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 135 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 136 | Leona | 0.00 | 0.00 | 0.00 |  |
| 137 | Locke | 0.00 | 0.00 | 0.00 |  |
| 138 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 139 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 140 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 141 | Rell | 0.00 | 0.00 | 0.00 |  |
| 142 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 143 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 144 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 145 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 146 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 147 | Talon | 0.00 | 0.00 | 0.00 |  |
| 148 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 149 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 150 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 151 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 152 | Lucian | -0.04 | 0.24 | 0.28 |  |
| 153 | Shen | -0.06 | 0.39 | 0.45 |  |
| 154 | Twisted Fate | -0.06 | 0.29 | 0.35 |  |
| 155 | Akshan | -0.06 | 0.22 | 0.28 |  |
| 156 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 157 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 158 | Vel'Koz | -0.10 | 0.18 | 0.28 |  |
| 159 | Pyke | -0.13 | 0.00 | 0.13 |  |
| 160 | Vi | -0.14 | 0.20 | 0.34 |  |
| 161 | Xerath | -0.14 | 0.18 | 0.32 |  |
| 162 | Gragas | -0.14 | 0.00 | 0.14 |  |
| 163 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 164 | Janna | -0.16 | 0.24 | 0.40 |  |
| 165 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 166 | Galio | -0.18 | 0.00 | 0.18 |  |
| 167 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 168 | Taliyah | -0.30 | 0.18 | 0.48 |  |
| 169 | Fiddlesticks | -0.31 | 0.13 | 0.44 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
