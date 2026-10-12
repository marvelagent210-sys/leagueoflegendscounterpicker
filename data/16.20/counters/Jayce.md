# Counters to Jayce (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 47 other champions with a simulator kit against Jayce: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jayce wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jayce --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | – | +1.00 |
| 2 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 3 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 4 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 5 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 6 | Malphite | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 7 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 8 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 10 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 11 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 12 | K'Sante | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 13 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 14 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 15 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 16 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 17 | Mordekaiser | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 18 | Gwen | +0.76 | +1.00 | +0.99 | +0.96 | −0.05 | – | +0.00 |
| 19 | Yorick | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 20 | Volibear | +0.72 | +1.00 | +1.00 | +1.00 | −0.32 | – | +0.00 |
| 21 | Teemo | +0.60 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 22 | Jax | +0.60 | +1.00 | +1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 23 | Yone | +0.56 | +1.00 | +1.00 | +0.09 | −0.10 | – | +0.00 |
| 24 | Cho'Gath | +0.54 | +1.00 | +1.00 | +0.00 | −0.07 | – | +0.00 |
| 25 | Urgot | +0.48 | +1.00 | +1.00 | +0.42 | +0.01 | −1.00 | +0.00 |
| 26 | Irelia | +0.32 | +1.00 | +1.00 | −0.97 | −0.10 | – | +0.00 |
| 27 | Olaf | +0.18 | +1.00 | +1.00 | −0.90 | −0.25 | −1.00 | +0.00 |
| 28 | Illaoi | +0.17 | +0.36 | −0.26 | +0.31 | −0.10 | +1.00 | +0.00 |
| 29 | Sion | −0.01 | +0.00 | +0.00 | +0.00 | −0.03 | – | +0.00 |
| 30 | Tahm Kench | −0.02 | −0.02 | −0.04 | +0.03 | −0.04 | – | +0.00 |
| 31 | Garen | −0.04 | −1.00 | +1.00 | +0.00 | −0.24 | – | +0.00 |
| 32 | Gnar | −0.05 | +0.34 | +0.34 | −0.61 | +0.00 | −1.00 | +0.00 |
| 33 | Ornn | −0.14 | −0.16 | −0.16 | −0.20 | −0.04 | – | +0.00 |
| 34 | Riven | −0.19 | −1.00 | −0.30 | +0.95 | −0.27 | – | +0.00 |
| 35 | Skarner | −0.20 | +0.02 | +0.01 | −1.00 | +0.06 | – | +0.00 |
| 36 | Ambessa | −0.23 | −1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 37 | Shen | −0.28 | +0.03 | −1.00 | −0.03 | −0.01 | – | +0.00 |
| 38 | Rumble | −0.42 | −0.94 | +0.32 | −1.00 | −0.17 | – | +0.00 |
| 39 | Quinn | −0.44 | −0.46 | −0.53 | −1.00 | +0.01 | +0.03 | +0.00 |
| 40 | Yasuo | −0.45 | +0.23 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 41 | Pantheon | −0.56 | −1.00 | −1.00 | +0.00 | +0.00 | – | +0.00 |
| 42 | Aurora | −0.60 | −1.00 | −1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 43 | Kennen | −0.64 | −1.00 | −1.00 | −1.00 | +0.01 | +0.61 | +0.00 |
| 44 | Sett | −0.68 | −1.00 | −1.00 | −0.52 | −0.05 | – | +0.00 |
| 45 | Heimerdinger | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 46 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 47 | Singed | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Jayce's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jayce's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jayce` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.69)

- **0.51** spell shield: Spell Shield's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce E Thundering Blow)
- **0.36** spell shield: Spell Shield's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce Q To the Skies!)

#### 2. Vladimir (net +0.65)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's Thundering Blow. Untargetable for 2 s, long enough to use ahead of Thundering Blow. (Vladimir W Sanguine Pool → Jayce E Thundering Blow)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's To the Skies!. Untargetable for 2 s, long enough to use ahead of To the Skies!. (Vladimir W Sanguine Pool → Jayce Q To the Skies!)
- Watch out: Thundering Blow's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Elise (net +0.62)

- **0.51** untargetable: Rappel makes Elise untargetable, dodging Jayce's Thundering Blow. Untargetable for 0.6 s; Thundering Blow takes 0.25 s to land, enough to react. (Elise E Rappel → Jayce E Thundering Blow)
- **0.22** untargetable: Rappel makes Elise untargetable, dodging Jayce's To the Skies!. Untargetable for 0.6 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Jayce Q To the Skies!)

#### 4. Nocturne (net +0.61)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce E Thundering Blow)
- **0.42** spell shield: Shroud of Darkness's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce Q To the Skies!)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Jayce's Thundering Blow (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Jayce E Thundering Blow)
- Watch out: Jayce's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range).

#### 5. Morgana (net +0.59)

- **0.54** cc immunity: Black Shield makes Morgana immune to Jayce's Thundering Blow (airborne, root). Immune for 5 s, long enough to use ahead of Thundering Blow. (Morgana E Black Shield → Jayce E Thundering Blow)
- **0.09** cc immunity: Black Shield makes Morgana immune to Jayce's To the Skies! (slow). Immune for 5 s, long enough to use ahead of To the Skies!. (Morgana E Black Shield → Jayce Q To the Skies!)

#### 6. Maokai (net +0.54)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's Thundering Blow. Untargetable for 1.4 s; Thundering Blow takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Jayce E Thundering Blow)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's To the Skies!. Untargetable for 1.4 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jayce Q To the Skies!)
- Watch out: Jayce's basic attacks reach 375 units farther than Maokai's (500 vs 125 attack range).

#### 7. Lissandra (net +0.50)

- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Lissandra R Frozen Tomb → Jayce E Thundering Blow)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Lissandra R Frozen Tomb → Jayce Q To the Skies!)
- **0.13** dash stop: Frozen Tomb's knockdown can stop Jayce's To the Skies! mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Jayce Q To the Skies!)

#### 8. Fiora (net +0.49)

- **0.64** parry: Riposte parries Jayce's Thundering Blow and stuns back. Parry for 0.75 s; Thundering Blow takes 0.25 s to land, enough to react. Negating Thundering Blow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jayce E Thundering Blow)
- **0.22** parry: Riposte parries Jayce's To the Skies!. Parry for 0.75 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Jayce Q To the Skies!)
- **0.08** attack speed slow: Riposte cuts Jayce's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Jayce basic attacks)
- Watch out: Jayce's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range).

#### 9. Udyr (net +0.47)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Jayce's Thundering Blow (airborne, root). Immune for 1.5 s, long enough to use ahead of Thundering Blow. (Udyr E Blazing Stampede → Jayce E Thundering Blow)
- **0.15** cc immunity: Blazing Stampede makes Udyr immune to Jayce's To the Skies! (slow). Immune for 1.5 s, long enough to use ahead of To the Skies!. (Udyr E Blazing Stampede → Jayce Q To the Skies!)
- Watch out: Jayce's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range).

#### 10. Bard (net +0.47)

- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Bard R Tempered Fate → Jayce E Thundering Blow)
- **0.27** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Bard R Tempered Fate → Jayce Q To the Skies!)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.69 | 0.69 | 0.00 |  |
| 2 | Vladimir | +0.65 | 0.73 | 0.08 |  |
| 3 | Elise | +0.62 | 0.62 | 0.00 |  |
| 4 | Nocturne | +0.61 | 0.91 | 0.30 |  |
| 5 | Morgana | +0.59 | 0.59 | 0.00 |  |
| 6 | Maokai | +0.54 | 0.84 | 0.30 |  |
| 7 | Lissandra | +0.50 | 0.50 | 0.00 |  |
| 8 | Fiora | +0.49 | 0.77 | 0.28 |  |
| 9 | Udyr | +0.47 | 0.77 | 0.30 |  |
| 10 | Bard | +0.47 | 0.47 | 0.00 |  |
| 11 | Xayah | +0.45 | 0.45 | 0.00 |  |
| 12 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 13 | Aurora | +0.42 | 0.42 | 0.00 |  |
| 14 | Yuumi | +0.41 | 0.88 | 0.47 |  |
| 15 | Milio | +0.36 | 0.36 | 0.00 |  |
| 16 | Kayle | +0.35 | 0.35 | 0.00 |  |
| 17 | Samira | +0.35 | 0.35 | 0.00 |  |
| 18 | Gwen | +0.34 | 0.62 | 0.28 |  |
| 19 | Mel | +0.33 | 0.33 | 0.00 |  |
| 20 | Rek'Sai | +0.30 | 0.48 | 0.18 |  |
| 21 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 22 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 23 | Camille | +0.28 | 0.43 | 0.15 |  |
| 24 | Kalista | +0.28 | 0.28 | 0.00 |  |
| 25 | Braum | +0.27 | 0.57 | 0.30 | projectile block (Unbreakable) |
| 26 | Vex | +0.26 | 0.26 | 0.00 |  |
| 27 | Ekko | +0.25 | 0.45 | 0.20 |  |
| 28 | Kled | +0.24 | 0.34 | 0.10 |  |
| 29 | Master Yi | +0.23 | 0.72 | 0.49 |  |
| 30 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 31 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 32 | Yasuo | +0.22 | 0.40 | 0.18 |  |
| 33 | Evelynn | +0.21 | 0.41 | 0.20 |  |
| 34 | Shaco | +0.21 | 0.41 | 0.20 |  |
| 35 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 36 | Zed | +0.20 | 0.40 | 0.20 |  |
| 37 | Kindred | +0.20 | 0.20 | 0.00 |  |
| 38 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 39 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 40 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 41 | Zaahen | +0.17 | 0.35 | 0.18 |  |
| 42 | Malzahar | +0.12 | 0.52 | 0.40 |  |
| 43 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 44 | Nilah | +0.08 | 0.30 | 0.22 |  |
| 45 | Senna | +0.08 | 0.08 | 0.00 |  |
| 46 | Pantheon | +0.07 | 0.35 | 0.28 |  |
| 47 | Yone | +0.07 | 0.20 | 0.13 |  |
| 48 | Annie | +0.07 | 0.07 | 0.00 |  |
| 49 | Corki | +0.07 | 0.07 | 0.00 |  |
| 50 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 51 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 52 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 53 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 54 | Jax | +0.05 | 0.35 | 0.30 |  |
| 55 | Zyra | +0.04 | 0.04 | 0.00 |  |
| 56 | Rengar | 0.00 | 0.61 | 0.61 |  |
| 57 | Alistar | 0.00 | 0.30 | 0.30 |  |
| 58 | K'Sante | 0.00 | 0.14 | 0.14 |  |
| 59 | Azir | 0.00 | 0.00 | 0.00 |  |
| 60 | Brand | 0.00 | 0.00 | 0.00 |  |
| 61 | Draven | 0.00 | 0.00 | 0.00 |  |
| 62 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 63 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 64 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 65 | Karma | 0.00 | 0.00 | 0.00 |  |
| 66 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Nami | 0.00 | 0.00 | 0.00 |  |
| 71 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 72 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 73 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 82 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 83 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 84 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 85 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 86 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 87 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 88 | Warwick | -0.01 | 0.49 | 0.50 |  |
| 89 | Malphite | -0.02 | 0.28 | 0.30 |  |
| 90 | Xin Zhao | -0.03 | 0.23 | 0.26 |  |
| 91 | Graves | -0.04 | 0.00 | 0.04 |  |
| 92 | Jarvan IV | -0.06 | 0.07 | 0.13 |  |
| 93 | Varus | -0.06 | 0.05 | 0.11 |  |
| 94 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 95 | Gangplank | -0.11 | 0.50 | 0.61 |  |
| 96 | Hecarim | -0.11 | 0.07 | 0.18 |  |
| 97 | Ornn | -0.11 | 0.07 | 0.18 |  |
| 98 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 99 | Poppy | -0.12 | 0.38 | 0.50 |  |
| 100 | Volibear | -0.12 | 0.07 | 0.19 |  |
| 101 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 102 | Fizz | -0.13 | 0.00 | 0.13 |  |
| 103 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 104 | Caitlyn | -0.14 | 0.14 | 0.28 |  |
| 105 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 106 | Briar | -0.15 | 0.00 | 0.15 |  |
| 107 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 108 | Amumu | -0.17 | 0.13 | 0.30 |  |
| 109 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 110 | Rell | -0.18 | 0.00 | 0.18 |  |
| 111 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 112 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 113 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 114 | Akali | -0.20 | 0.00 | 0.20 |  |
| 115 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 116 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 117 | Riven | -0.20 | 0.00 | 0.20 |  |
| 118 | Talon | -0.20 | 0.00 | 0.20 |  |
| 119 | Shyvana | -0.21 | 0.07 | 0.28 |  |
| 120 | Kayn | -0.22 | 0.41 | 0.63 |  |
| 121 | Garen | -0.23 | 0.30 | 0.53 |  |
| 122 | Illaoi | -0.23 | 0.07 | 0.30 |  |
| 123 | Sett | -0.23 | 0.07 | 0.30 |  |
| 124 | Olaf | -0.24 | 0.37 | 0.61 |  |
| 125 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 126 | Rammus | -0.25 | 0.32 | 0.57 |  |
| 127 | Aatrox | -0.26 | 0.00 | 0.26 |  |
| 128 | Nautilus | -0.26 | 0.00 | 0.26 |  |
| 129 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 130 | Sion | -0.27 | 0.39 | 0.66 |  |
| 131 | Viego | -0.27 | 0.07 | 0.34 |  |
| 132 | Nasus | -0.28 | 0.33 | 0.61 |  |
| 133 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 134 | Diana | -0.28 | 0.00 | 0.28 |  |
| 135 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 136 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 137 | Kassadin | -0.28 | 0.00 | 0.28 |  |
| 138 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Sejuani | -0.28 | 0.00 | 0.28 |  |
| 141 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 142 | Kha'Zix | -0.30 | 0.00 | 0.30 |  |
| 143 | Leona | -0.30 | 0.00 | 0.30 |  |
| 144 | Locke | -0.30 | 0.00 | 0.30 |  |
| 145 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 146 | Singed | -0.31 | 0.30 | 0.61 |  |
| 147 | Shen | -0.32 | 0.33 | 0.65 |  |
| 148 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 149 | Taric | -0.34 | 0.23 | 0.57 |  |
| 150 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 151 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 152 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 153 | Galio | -0.37 | 0.00 | 0.37 |  |
| 154 | Janna | -0.40 | 0.00 | 0.40 |  |
| 155 | Mordekaiser | -0.45 | 0.08 | 0.53 |  |
| 156 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 157 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 158 | Zac | -0.47 | 0.26 | 0.73 |  |
| 159 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 160 | Skarner | -0.50 | 0.07 | 0.57 |  |
| 161 | Vi | -0.51 | 0.07 | 0.58 |  |
| 162 | Darius | -0.53 | 0.00 | 0.53 |  |
| 163 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 164 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 165 | Katarina | -0.58 | 0.00 | 0.58 |  |
| 166 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 167 | Blitzcrank | -0.61 | 0.00 | 0.61 |  |
| 168 | Cho'Gath | -0.61 | 0.00 | 0.61 |  |
| 169 | Dr. Mundo | -0.61 | 0.00 | 0.61 |  |
| 170 | Rumble | -0.61 | 0.00 | 0.61 |  |
| 171 | Tahm Kench | -0.76 | 0.00 | 0.76 |  |
| 172 | Nunu & Willump | -0.94 | 0.16 | 1.10 |  |
