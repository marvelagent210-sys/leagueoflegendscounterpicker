# Counters to Volibear (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 24 other champions with a simulator kit against Volibear: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Volibear wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Volibear --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Teemo | +0.91 | +1.00 | +1.00 | +1.00 | +0.72 | +1.00 | +0.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.09 | – | +1.00 |
| 3 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 4 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 5 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 6 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 7 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 8 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 9 | Dr. Mundo | +0.47 | +0.08 | +0.88 | +0.89 | +0.04 | – | +0.00 |
| 10 | Yone | +0.29 | −0.77 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 11 | Nasus | +0.10 | −0.09 | +0.48 | −0.00 | −0.08 | – | +0.00 |
| 12 | Olaf | −0.44 | +0.04 | −0.84 | −0.96 | −0.04 | – | +0.00 |
| 13 | Ornn | −0.61 | −0.46 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 14 | Irelia | −0.71 | −1.00 | −0.88 | −0.88 | +0.06 | – | +0.00 |
| 15 | Poppy | −0.71 | −0.89 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 16 | Camille | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 17 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 18 | Shen | −0.75 | −1.00 | −1.00 | −0.97 | +0.11 | – | +0.00 |
| 19 | Malphite | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 20 | Yasuo | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 21 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 22 | Mordekaiser | −0.77 | −0.98 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 23 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 24 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Volibear's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Volibear's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Volibear` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.62)

- **0.90** spell shield: Spell Shield's spell shield blocks Volibear's Stormbringer. Spell shield for 1.5 s, long enough to use ahead of Stormbringer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Volibear R Stormbringer)
- **0.73** spell shield: Spell Shield's spell shield blocks Volibear's Thundering Smash. Spell shield for 1.5 s, long enough to use ahead of Thundering Smash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Volibear Q Thundering Smash)
- **0.29** range: Sivir's basic attacks reach 350 units farther than Volibear's (500 vs 150 attack range). Volibear closes the gap with Thundering Smash, Stormbringer. (Sivir basic attacks → Volibear basic attacks)

#### 2. Nocturne (net +1.42)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Volibear's Thundering Smash. Spell shield for 1.5 s, long enough to use ahead of Thundering Smash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear Q Thundering Smash)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Volibear's Stormbringer. Spell shield for 1.5 s, long enough to use ahead of Stormbringer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear R Stormbringer)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Volibear's Frenzied Maul. Spell shield for 1.5 s, long enough to use ahead of Frenzied Maul. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear W Frenzied Maul)

#### 3. Xayah (net +1.42)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Volibear's Stormbringer. Untargetable for 1.5 s, long enough to use ahead of Stormbringer. (Xayah R Featherstorm → Volibear R Stormbringer)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Volibear's Thundering Smash. Untargetable for 1.5 s, long enough to use ahead of Thundering Smash. (Xayah R Featherstorm → Volibear Q Thundering Smash)
- **0.24** range: Xayah's basic attacks reach 375 units farther than Volibear's (525 vs 150 attack range). Volibear closes the gap with Thundering Smash, Stormbringer. (Xayah basic attacks → Volibear basic attacks)

#### 4. Elise (net +1.41)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Volibear's Stormbringer. Untargetable for 0.6 s; Stormbringer takes 0.93 s to land, enough to react. (Elise E Rappel → Volibear R Stormbringer)
- **0.44** untargetable: Rappel makes Elise untargetable, dodging Volibear's Thundering Smash. Untargetable for 0.6 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Volibear Q Thundering Smash)
- **0.26** untargetable: Rappel makes Elise untargetable, dodging Volibear's Frenzied Maul. Untargetable for 0.6 s; Frenzied Maul takes 0.25 s to land, enough to react. (Elise E Rappel → Volibear W Frenzied Maul)

#### 5. Vladimir (net +1.39)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Stormbringer. Untargetable for 2 s, long enough to use ahead of Stormbringer. (Vladimir W Sanguine Pool → Volibear R Stormbringer)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Thundering Smash. Untargetable for 2 s, long enough to use ahead of Thundering Smash. (Vladimir W Sanguine Pool → Volibear Q Thundering Smash)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Frenzied Maul. Untargetable for 2 s, long enough to use ahead of Frenzied Maul. (Vladimir W Sanguine Pool → Volibear W Frenzied Maul)
- Watch out: Thundering Smash's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Bard (net +1.33)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Volibear's Stormbringer. Untargetable for 2.5 s, long enough to use ahead of Stormbringer. (Bard R Tempered Fate → Volibear R Stormbringer)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Volibear's Thundering Smash. Untargetable for 2.5 s, long enough to use ahead of Thundering Smash. (Bard R Tempered Fate → Volibear Q Thundering Smash)
- **0.22** range: Bard's basic attacks reach 350 units farther than Volibear's (500 vs 150 attack range). Volibear closes the gap with Thundering Smash, Stormbringer. (Bard basic attacks → Volibear basic attacks)
- Watch out: Stormbringer is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 7. Lissandra (net +1.31)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Stormbringer. Untargetable for 2.5 s, long enough to use ahead of Stormbringer. (Lissandra R Frozen Tomb → Volibear R Stormbringer)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Thundering Smash. Untargetable for 2.5 s, long enough to use ahead of Thundering Smash. (Lissandra R Frozen Tomb → Volibear Q Thundering Smash)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Frenzied Maul. Untargetable for 2.5 s, long enough to use ahead of Frenzied Maul. (Lissandra R Frozen Tomb → Volibear W Frenzied Maul)
- Watch out: Stormbringer is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 8. Aurora (net +1.28)

- **0.90** untargetable: Between Worlds makes Aurora untargetable, dodging Volibear's Stormbringer. Untargetable for 0.4 s; Stormbringer takes 0.93 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Volibear R Stormbringer)
- **0.28** untargetable: Between Worlds makes Aurora untargetable, dodging Volibear's Thundering Smash. Untargetable for 0.4 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Volibear Q Thundering Smash)
- **0.19** range: Aurora's basic attacks reach 400 units farther than Volibear's (550 vs 150 attack range). Volibear closes the gap with Thundering Smash, Stormbringer. (Aurora basic attacks → Volibear basic attacks)

#### 9. Fiora (net +1.26)

- **0.90** parry: Riposte parries Volibear's Stormbringer. Parry for 0.75 s; Stormbringer takes 0.93 s to land, enough to react. (Fiora W Riposte → Volibear R Stormbringer)
- **0.56** parry: Riposte parries Volibear's Thundering Smash and stuns back. Parry for 0.75 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Thundering Smash's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Volibear Q Thundering Smash)
- **0.26** parry: Riposte parries Volibear's Frenzied Maul. Parry for 0.75 s; Frenzied Maul takes 0.25 s to land, enough to react. (Fiora W Riposte → Volibear W Frenzied Maul)

#### 10. Jax (net +1.22)

- **1.00** attack dodge: Counter Strike dodges Volibear's Thundering Smash, an empowered attack. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Volibear Q Thundering Smash)
- **0.35** attack dodge: Counter Strike dodges Volibear's basic attacks (with The Relentless Storm). Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Volibear basic attacks)
- **0.17** attack dodge: Counter Strike dodges Volibear's Frenzied Maul, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. Frenzied Maul's bite heals even if it is blocked by spell shield. Frenzied Maul's strike can be dodged and blocked, but it cannot miss if Volibear is blinded. The Wound mark does not apply if dodged, but will otherwise do so regardless.
  - The bite can be blocked but Volibear still heals. It does not heal nor deal damage if the bite is dodged. The bite cannot miss if Volibear is blinded. (Jax E Counter Strike → Volibear W Frenzied Maul)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.62 | 1.62 | 0.00 |  |
| 2 | Nocturne | +1.42 | 1.42 | 0.00 |  |
| 3 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 4 | Elise | +1.41 | 1.41 | 0.00 |  |
| 5 | Vladimir | +1.39 | 1.47 | 0.08 |  |
| 6 | Bard | +1.33 | 1.41 | 0.08 |  |
| 7 | Lissandra | +1.31 | 1.36 | 0.05 |  |
| 8 | Aurora | +1.28 | 1.28 | 0.00 |  |
| 9 | Fiora | +1.26 | 1.26 | 0.00 |  |
| 10 | Jax | +1.22 | 1.22 | 0.00 | attack dodge (Counter Strike) |
| 11 | Maokai | +1.21 | 1.28 | 0.07 |  |
| 12 | Master Yi | +1.20 | 1.43 | 0.23 |  |
| 13 | Gwen | +1.19 | 1.19 | 0.00 |  |
| 14 | Udyr | +1.14 | 1.14 | 0.00 |  |
| 15 | Singed | +1.11 | 1.18 | 0.07 | grounding (Mega Adhesive) |
| 16 | Ekko | +1.11 | 1.11 | 0.00 |  |
| 17 | Yuumi | +1.10 | 1.51 | 0.41 |  |
| 18 | Evelynn | +1.10 | 1.10 | 0.00 |  |
| 19 | Shaco | +1.10 | 1.10 | 0.00 |  |
| 20 | Teemo | +1.09 | 1.09 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 21 | Zed | +1.09 | 1.09 | 0.00 |  |
| 22 | Morgana | +1.04 | 1.04 | 0.00 |  |
| 23 | Rek'Sai | +1.03 | 1.19 | 0.16 |  |
| 24 | Camille | +0.94 | 1.09 | 0.15 |  |
| 25 | Rengar | +0.91 | 0.91 | 0.00 |  |
| 26 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 27 | Kindred | +0.85 | 0.85 | 0.00 |  |
| 28 | Nilah | +0.83 | 0.91 | 0.08 | attack dodge (Jubilant Veil) |
| 29 | Gangplank | +0.77 | 0.77 | 0.00 |  |
| 30 | Shen | +0.76 | 1.21 | 0.45 | attack block (Spirit's Refuge) |
| 31 | Milio | +0.72 | 0.79 | 0.07 |  |
| 32 | Olaf | +0.61 | 0.61 | 0.00 |  |
| 33 | Pantheon | +0.60 | 0.70 | 0.10 |  |
| 34 | Taric | +0.59 | 0.59 | 0.00 |  |
| 35 | Kayn | +0.58 | 1.10 | 0.52 |  |
| 36 | Cassiopeia | +0.58 | 0.58 | 0.00 | grounding (Miasma) |
| 37 | Varus | +0.56 | 0.67 | 0.11 |  |
| 38 | Garen | +0.52 | 0.52 | 0.00 |  |
| 39 | Kalista | +0.47 | 0.66 | 0.19 |  |
| 40 | Lulu | +0.46 | 0.54 | 0.08 |  |
| 41 | Xin Zhao | +0.43 | 0.61 | 0.18 |  |
| 42 | Jinx | +0.39 | 0.43 | 0.04 |  |
| 43 | Sion | +0.38 | 0.63 | 0.25 |  |
| 44 | Viktor | +0.38 | 0.42 | 0.04 |  |
| 45 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 46 | Malzahar | +0.37 | 0.82 | 0.45 |  |
| 47 | Alistar | +0.36 | 0.48 | 0.12 |  |
| 48 | Ahri | +0.34 | 0.38 | 0.04 |  |
| 49 | Vex | +0.34 | 0.37 | 0.03 |  |
| 50 | Hwei | +0.33 | 0.40 | 0.07 |  |
| 51 | Veigar | +0.33 | 0.37 | 0.04 |  |
| 52 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 53 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 54 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 55 | Sona | +0.27 | 0.27 | 0.00 |  |
| 56 | Heimerdinger | +0.25 | 0.25 | 0.00 |  |
| 57 | Zaahen | +0.24 | 0.42 | 0.18 |  |
| 58 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 59 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 60 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 61 | Kled | +0.22 | 0.46 | 0.24 |  |
| 62 | Vayne | +0.22 | 0.29 | 0.07 |  |
| 63 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 64 | Senna | +0.22 | 0.22 | 0.00 |  |
| 65 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 66 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 67 | Katarina | +0.21 | 0.49 | 0.28 |  |
| 68 | Renata Glasc | +0.19 | 0.26 | 0.07 |  |
| 69 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 70 | Lux | +0.19 | 0.19 | 0.00 |  |
| 71 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 72 | Mel | +0.18 | 0.18 | 0.00 |  |
| 73 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 74 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 75 | Draven | +0.17 | 0.24 | 0.07 |  |
| 76 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 77 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 78 | Zoe | +0.15 | 0.22 | 0.07 |  |
| 79 | Annie | +0.15 | 0.15 | 0.00 |  |
| 80 | Brand | +0.15 | 0.15 | 0.00 |  |
| 81 | Graves | +0.15 | 0.15 | 0.00 |  |
| 82 | Karma | +0.14 | 0.14 | 0.00 |  |
| 83 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 84 | Skarner | +0.14 | 0.14 | 0.00 |  |
| 85 | Gnar | +0.13 | 0.21 | 0.08 |  |
| 86 | Corki | +0.13 | 0.20 | 0.07 |  |
| 87 | Jayce | +0.12 | 0.19 | 0.07 |  |
| 88 | Samira | +0.10 | 0.19 | 0.09 |  |
| 89 | Orianna | +0.09 | 0.17 | 0.08 |  |
| 90 | Warwick | +0.08 | 0.44 | 0.36 |  |
| 91 | Syndra | +0.08 | 0.15 | 0.07 |  |
| 92 | Neeko | +0.07 | 0.15 | 0.08 |  |
| 93 | Amumu | +0.07 | 0.12 | 0.05 |  |
| 94 | Swain | +0.06 | 0.13 | 0.07 |  |
| 95 | Anivia | +0.02 | 0.16 | 0.14 |  |
| 96 | Malphite | +0.01 | 0.21 | 0.20 |  |
| 97 | Ziggs | +0.01 | 0.18 | 0.17 |  |
| 98 | Azir | +0.01 | 0.17 | 0.16 |  |
| 99 | Zyra | 0.00 | 0.16 | 0.16 |  |
| 100 | Urgot | 0.00 | 0.09 | 0.09 |  |
| 101 | Akali | 0.00 | 0.00 | 0.00 |  |
| 102 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 103 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 104 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 105 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 106 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 107 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 108 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 109 | Leona | 0.00 | 0.00 | 0.00 |  |
| 110 | Locke | 0.00 | 0.00 | 0.00 |  |
| 111 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 112 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 113 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 114 | Talon | 0.00 | 0.00 | 0.00 |  |
| 115 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 116 | Thresh | -0.01 | 0.12 | 0.13 |  |
| 117 | Aurelion Sol | -0.02 | 0.15 | 0.17 |  |
| 118 | Lillia | -0.02 | 0.06 | 0.08 |  |
| 119 | Poppy | -0.03 | 0.37 | 0.40 |  |
| 120 | Nami | -0.03 | 0.15 | 0.18 |  |
| 121 | Ivern | -0.03 | 0.12 | 0.15 |  |
| 122 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 123 | Quinn | -0.04 | 0.24 | 0.28 |  |
| 124 | Briar | -0.05 | 0.00 | 0.05 |  |
| 125 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 126 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 127 | Mordekaiser | -0.06 | 0.08 | 0.14 |  |
| 128 | Akshan | -0.07 | 0.21 | 0.28 |  |
| 129 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 130 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 131 | Darius | -0.07 | 0.00 | 0.07 |  |
| 132 | Sett | -0.07 | 0.00 | 0.07 |  |
| 133 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 134 | Rammus | -0.08 | 0.32 | 0.40 |  |
| 135 | Twisted Fate | -0.08 | 0.27 | 0.35 |  |
| 136 | Braum | -0.08 | 0.00 | 0.08 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 141 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 142 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 143 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 144 | Yone | -0.13 | 0.12 | 0.25 |  |
| 145 | Rakan | -0.13 | 0.07 | 0.20 |  |
| 146 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 147 | Xerath | -0.15 | 0.17 | 0.32 |  |
| 148 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 149 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 150 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 151 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 152 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 153 | Vel'Koz | -0.18 | 0.17 | 0.35 |  |
| 154 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 155 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 156 | Riven | -0.20 | 0.00 | 0.20 |  |
| 157 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 158 | Rell | -0.24 | 0.00 | 0.24 |  |
| 159 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 160 | Nunu & Willump | -0.25 | 0.31 | 0.56 |  |
| 161 | Jarvan IV | -0.28 | 0.00 | 0.28 |  |
| 162 | Yasuo | -0.28 | 0.00 | 0.28 |  |
| 163 | Viego | -0.32 | 0.00 | 0.32 |  |
| 164 | Fiddlesticks | -0.33 | 0.12 | 0.45 |  |
| 165 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 166 | Zac | -0.38 | 0.25 | 0.63 |  |
| 167 | Janna | -0.39 | 0.24 | 0.63 |  |
| 168 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 169 | Galio | -0.48 | 0.00 | 0.48 |  |
| 170 | Taliyah | -0.59 | 0.17 | 0.76 |  |
| 171 | Vi | -0.63 | 0.00 | 0.63 |  |
| 172 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
