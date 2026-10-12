# Counters to Yone (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 44 other champions with a simulator kit against Yone: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yone wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yone --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.94 | +1.00 | +1.00 | +1.00 | +0.91 | +1.00 | +0.00 |
| 2 | K'Sante | +0.88 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +1.00 |
| 3 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.53 |
| 4 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 5 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 6 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 8 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Kennen | +0.78 | +1.00 | +0.94 | +1.00 | −0.06 | +1.00 | +0.00 |
| 10 | Yasuo | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 11 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 12 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 13 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 14 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 15 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 16 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.49 |
| 17 | Garen | +0.73 | +1.00 | +0.77 | +1.00 | +0.08 | – | +0.00 |
| 18 | Teemo | +0.64 | +0.08 | +1.00 | +1.00 | +0.49 | +1.00 | +0.00 |
| 19 | Aurora | +0.62 | +1.00 | +0.00 | +1.00 | +0.44 | +1.00 | +0.00 |
| 20 | Gnar | +0.60 | +0.93 | +0.14 | +1.00 | +0.19 | +1.00 | +0.00 |
| 21 | Quinn | +0.40 | +1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 22 | Kled | +0.32 | +1.00 | +1.00 | −1.00 | −0.08 | – | +0.00 |
| 23 | Cho'Gath | +0.31 | +0.33 | +0.50 | +0.35 | −0.00 | – | +0.00 |
| 24 | Udyr | +0.27 | +1.00 | −0.92 | +1.00 | +0.13 | – | +0.00 |
| 25 | Renekton | +0.22 | +1.00 | −1.00 | +1.00 | +0.00 | – | +0.00 |
| 26 | Sion | −0.01 | +0.00 | +0.00 | +0.00 | −0.04 | – | +0.00 |
| 27 | Irelia | −0.29 | −0.11 | −0.11 | −1.00 | −0.01 | – | +0.00 |
| 28 | Camille | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 29 | Riven | −0.35 | −1.00 | −1.00 | +1.00 | +0.10 | – | −0.52 |
| 30 | Mordekaiser | −0.42 | −0.47 | −0.45 | −0.73 | −0.02 | – | +0.00 |
| 31 | Tahm Kench | −0.55 | −1.00 | −1.00 | +0.00 | +0.01 | – | +0.00 |
| 32 | Jayce | −0.56 | −1.00 | −1.00 | −0.09 | +0.10 | – | +0.00 |
| 33 | Gwen | −0.62 | −1.00 | −1.00 | −0.08 | −0.25 | – | +0.00 |
| 34 | Volibear | −0.66 | −1.00 | −0.56 | −1.00 | −0.04 | – | +0.00 |
| 35 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 36 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 37 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 38 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 39 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 40 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 41 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 42 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 43 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 44 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Yone's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yone's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yone` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Yone's Fate Sealed (airborne, knockdown, stun). Immune for 1.5 s, long enough to use ahead of Fate Sealed. (Udyr E Blazing Stampede → Yone R Fate Sealed)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Yone's Mortal Steel (airborne). Immune for 1.5 s, long enough to use ahead of Mortal Steel. (Udyr E Blazing Stampede → Yone Q Mortal Steel)

#### 2. Morgana (net +1.36)

- **1.00** cc immunity: Black Shield makes Morgana immune to Yone's Fate Sealed (airborne, knockdown, stun). Immune for 5 s, long enough to use ahead of Fate Sealed. (Morgana E Black Shield → Yone R Fate Sealed)
- **0.55** cc immunity: Black Shield makes Morgana immune to Yone's Mortal Steel (airborne). Immune for 5 s, long enough to use ahead of Mortal Steel. (Morgana E Black Shield → Yone Q Mortal Steel)
- **0.08** range: Morgana's basic attacks reach 275 units farther than Yone's (450 vs 175 attack range). Yone closes the gap with Soul Unbound, Mortal Steel, Fate Sealed. (Morgana basic attacks → Yone basic attacks)

#### 3. Lissandra (net +1.32)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yone's Fate Sealed. Untargetable for 2.5 s, long enough to use ahead of Fate Sealed. (Lissandra R Frozen Tomb → Yone R Fate Sealed)
- **0.43** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yone's Mortal Steel. Untargetable for 2.5 s, long enough to use ahead of Mortal Steel. (Lissandra R Frozen Tomb → Yone Q Mortal Steel)
- **0.22** dash stop: Frozen Tomb's knockdown can stop Yone's Mortal Steel mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Yone Q Mortal Steel)
- Watch out: Soul Unbound is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 4. Elise (net +1.29)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Yone's Fate Sealed. Untargetable for 0.6 s; Fate Sealed takes 0.75 s to land, enough to react. (Elise E Rappel → Yone R Fate Sealed)
- **0.53** untargetable: Rappel makes Elise untargetable, dodging Yone's Mortal Steel. Untargetable for 0.6 s; Mortal Steel takes 0.65 s to land, enough to react. (Elise E Rappel → Yone Q Mortal Steel)
- **0.15** range: Elise's basic attacks reach 375 units farther than Yone's (550 vs 175 attack range). Yone closes the gap with Soul Unbound, Mortal Steel, Fate Sealed. (Elise basic attacks → Yone basic attacks)
- Watch out: Fate Sealed's knockdown can stop Elise's Venomous Bite mid-dash.

#### 5. Fiora (net +1.26)

- **1.10** parry: Riposte parries Yone's Fate Sealed and stuns back. Parry for 0.75 s; Fate Sealed takes 0.75 s to land, enough to react. Negating Fate Sealed's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yone R Fate Sealed)
- **0.65** parry: Riposte parries Yone's Mortal Steel and stuns back. Parry for 0.75 s; Mortal Steel takes 0.65 s to land, enough to react. Negating Mortal Steel's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yone Q Mortal Steel)
- **0.06** attack speed slow: Riposte cuts Yone's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Yone basic attacks)
- Watch out: Fate Sealed's knockdown can stop Fiora's Lunge mid-dash.

#### 6. Xayah (net +1.26)

- **0.88** untargetable: Featherstorm makes Xayah untargetable, dodging Yone's Fate Sealed. Untargetable for 1.5 s, long enough to use ahead of Fate Sealed. (Xayah R Featherstorm → Yone R Fate Sealed)
- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Yone's Mortal Steel. Untargetable for 1.5 s, long enough to use ahead of Mortal Steel. (Xayah R Featherstorm → Yone Q Mortal Steel)
- **0.17** range: Xayah's basic attacks reach 350 units farther than Yone's (525 vs 175 attack range). Yone closes the gap with Soul Unbound, Mortal Steel, Fate Sealed. (Xayah basic attacks → Yone basic attacks)

#### 7. Vladimir (net +1.25)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yone's Fate Sealed. Untargetable for 2 s, long enough to use ahead of Fate Sealed. (Vladimir W Sanguine Pool → Yone R Fate Sealed)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yone's Mortal Steel. Untargetable for 2 s, long enough to use ahead of Mortal Steel. (Vladimir W Sanguine Pool → Yone Q Mortal Steel)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Yone's (450 vs 175 attack range). Yone closes the gap with Soul Unbound, Mortal Steel, Fate Sealed. (Vladimir basic attacks → Yone basic attacks)
- Watch out: Mortal Steel's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 8. Maokai (net +1.25)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Yone's Fate Sealed. Untargetable for 1.4 s; Fate Sealed takes 0.75 s to land, enough to react. (Maokai W Twisted Advance → Yone R Fate Sealed)
- **0.64** untargetable: Twisted Advance makes Maokai untargetable, dodging Yone's Mortal Steel. Untargetable for 1.4 s; Mortal Steel takes 0.65 s to land, enough to react. (Maokai W Twisted Advance → Yone Q Mortal Steel)
- Watch out: Soul Unbound is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 9. Olaf (net +1.22)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Yone's Fate Sealed (airborne, knockdown, stun). Immune for 3 s, long enough to use ahead of Fate Sealed. (Olaf R Ragnarok → Yone R Fate Sealed)
- **0.43** cc immunity: Ragnarok makes Olaf immune to Yone's Mortal Steel (airborne). Immune for 3 s, long enough to use ahead of Mortal Steel. (Olaf R Ragnarok → Yone Q Mortal Steel)

#### 10. Shaco (net +1.22)

- **1.00** untargetable: Hallucinate makes Shaco untargetable, dodging Yone's Fate Sealed. Untargetable for 0.5 s; Fate Sealed takes 0.75 s to land, enough to react. (Shaco R Hallucinate → Yone R Fate Sealed)
- **0.43** untargetable: Hallucinate makes Shaco untargetable, dodging Yone's Mortal Steel. Untargetable for 0.5 s; Mortal Steel takes 0.65 s to land, enough to react. (Shaco R Hallucinate → Yone Q Mortal Steel)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 2 | Morgana | +1.36 | 1.36 | 0.00 |  |
| 3 | Lissandra | +1.32 | 1.37 | 0.05 |  |
| 4 | Elise | +1.29 | 1.42 | 0.13 |  |
| 5 | Fiora | +1.26 | 1.44 | 0.18 |  |
| 6 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 7 | Vladimir | +1.25 | 1.36 | 0.11 |  |
| 8 | Maokai | +1.25 | 1.32 | 0.07 |  |
| 9 | Olaf | +1.22 | 1.22 | 0.00 |  |
| 10 | Shaco | +1.22 | 1.22 | 0.00 |  |
| 11 | Yuumi | +1.20 | 1.63 | 0.43 |  |
| 12 | Bard | +1.14 | 1.38 | 0.24 |  |
| 13 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 14 | Zed | +1.09 | 1.09 | 0.00 |  |
| 15 | Gwen | +1.08 | 1.27 | 0.19 |  |
| 16 | Warwick | +1.06 | 1.52 | 0.46 |  |
| 17 | Aurora | +1.06 | 1.29 | 0.23 |  |
| 18 | Ekko | +1.05 | 1.23 | 0.18 |  |
| 19 | Master Yi | +1.04 | 1.27 | 0.23 |  |
| 20 | Evelynn | +1.03 | 1.22 | 0.19 |  |
| 21 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 22 | Sivir | +0.98 | 0.98 | 0.00 |  |
| 23 | Rek'Sai | +0.92 | 1.28 | 0.36 |  |
| 24 | Sion | +0.92 | 1.22 | 0.30 |  |
| 25 | Rengar | +0.91 | 1.06 | 0.15 |  |
| 26 | Zaahen | +0.86 | 1.22 | 0.36 |  |
| 27 | Milio | +0.86 | 0.93 | 0.07 |  |
| 28 | Cassiopeia | +0.83 | 0.83 | 0.00 | grounding (Miasma) |
| 29 | Kayle | +0.79 | 0.79 | 0.00 |  |
| 30 | Camille | +0.72 | 1.21 | 0.49 |  |
| 31 | Singed | +0.68 | 0.75 | 0.07 | grounding (Mega Adhesive) |
| 32 | Alistar | +0.66 | 0.97 | 0.31 |  |
| 33 | Kalista | +0.65 | 0.95 | 0.30 |  |
| 34 | Vex | +0.63 | 0.66 | 0.03 |  |
| 35 | Malzahar | +0.61 | 1.06 | 0.45 |  |
| 36 | Kled | +0.57 | 1.09 | 0.52 |  |
| 37 | Kindred | +0.57 | 0.71 | 0.14 |  |
| 38 | Kayn | +0.52 | 1.22 | 0.70 |  |
| 39 | Taric | +0.51 | 0.51 | 0.00 |  |
| 40 | Teemo | +0.50 | 0.50 | 0.00 |  |
| 41 | Jinx | +0.41 | 0.45 | 0.04 |  |
| 42 | Viktor | +0.39 | 0.43 | 0.04 |  |
| 43 | Mel | +0.38 | 0.38 | 0.00 |  |
| 44 | Hwei | +0.36 | 0.43 | 0.07 |  |
| 45 | Veigar | +0.36 | 0.40 | 0.04 |  |
| 46 | Pantheon | +0.34 | 0.64 | 0.30 |  |
| 47 | Lulu | +0.34 | 0.42 | 0.08 |  |
| 48 | Jax | +0.29 | 0.47 | 0.18 |  |
| 49 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 50 | Garen | +0.26 | 0.26 | 0.00 |  |
| 51 | Shyvana | +0.25 | 0.25 | 0.00 |  |
| 52 | Malphite | +0.23 | 0.43 | 0.20 |  |
| 53 | Twitch | +0.20 | 0.20 | 0.00 |  |
| 54 | Sona | +0.19 | 0.19 | 0.00 |  |
| 55 | Xin Zhao | +0.18 | 0.55 | 0.37 |  |
| 56 | Sett | +0.18 | 0.25 | 0.07 |  |
| 57 | Aphelios | +0.18 | 0.18 | 0.00 |  |
| 58 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 59 | Corki | +0.17 | 0.39 | 0.22 |  |
| 60 | Hecarim | +0.16 | 0.26 | 0.10 |  |
| 61 | Senna | +0.16 | 0.16 | 0.00 |  |
| 62 | K'Sante | +0.15 | 0.50 | 0.35 |  |
| 63 | Illaoi | +0.15 | 0.25 | 0.10 |  |
| 64 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 65 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 66 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 67 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 68 | Lux | +0.14 | 0.14 | 0.00 |  |
| 69 | Volibear | +0.13 | 0.25 | 0.12 |  |
| 70 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 71 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 72 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 73 | Renata Glasc | +0.11 | 0.18 | 0.07 |  |
| 74 | Annie | +0.11 | 0.11 | 0.00 |  |
| 75 | Poppy | +0.10 | 0.69 | 0.59 | dash stop (Steadfast Presence) |
| 76 | Nilah | +0.10 | 0.38 | 0.28 |  |
| 77 | Draven | +0.10 | 0.17 | 0.07 |  |
| 78 | Brand | +0.10 | 0.10 | 0.00 |  |
| 79 | Karma | +0.10 | 0.10 | 0.00 |  |
| 80 | Braum | +0.09 | 0.35 | 0.26 |  |
| 81 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 82 | Samira | +0.08 | 0.38 | 0.30 |  |
| 83 | Zoe | +0.08 | 0.15 | 0.07 |  |
| 84 | Zeri | +0.05 | 0.21 | 0.16 |  |
| 85 | Yunara | +0.04 | 0.18 | 0.14 |  |
| 86 | Orianna | +0.04 | 0.12 | 0.08 |  |
| 87 | Syndra | +0.03 | 0.10 | 0.07 |  |
| 88 | Varus | +0.02 | 0.13 | 0.11 |  |
| 89 | Neeko | +0.02 | 0.10 | 0.08 |  |
| 90 | Swain | +0.02 | 0.09 | 0.07 |  |
| 91 | Ahri | +0.01 | 0.40 | 0.39 |  |
| 92 | Nidalee | 0.00 | 0.13 | 0.13 |  |
| 93 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 94 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 95 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 96 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 97 | Vayne | -0.02 | 0.20 | 0.22 |  |
| 98 | Anivia | -0.02 | 0.12 | 0.14 |  |
| 99 | Zyra | -0.04 | 0.12 | 0.16 |  |
| 100 | Tristana | -0.05 | 0.18 | 0.23 |  |
| 101 | Jayce | -0.07 | 0.13 | 0.20 |  |
| 102 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 103 | Darius | -0.07 | 0.00 | 0.07 |  |
| 104 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 105 | Nami | -0.08 | 0.10 | 0.18 |  |
| 106 | Mordekaiser | -0.08 | 0.06 | 0.14 |  |
| 107 | Amumu | -0.09 | 0.21 | 0.30 |  |
| 108 | LeBlanc | -0.09 | 0.10 | 0.19 |  |
| 109 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 110 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 111 | Kai'Sa | -0.15 | 0.17 | 0.32 |  |
| 112 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 113 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 114 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 115 | Gnar | -0.17 | 0.14 | 0.31 |  |
| 116 | Lillia | -0.18 | 0.04 | 0.22 |  |
| 117 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 118 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 119 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 120 | Yasuo | -0.19 | 0.27 | 0.46 |  |
| 121 | Locke | -0.19 | 0.00 | 0.19 |  |
| 122 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 123 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 124 | Kha'Zix | -0.20 | 0.00 | 0.20 |  |
| 125 | Rammus | -0.21 | 0.27 | 0.48 |  |
| 126 | Xerath | -0.22 | 0.12 | 0.34 |  |
| 127 | Leona | -0.22 | 0.00 | 0.22 |  |
| 128 | Shen | -0.23 | 0.46 | 0.69 |  |
| 129 | Vel'Koz | -0.23 | 0.12 | 0.35 |  |
| 130 | Caitlyn | -0.24 | 0.18 | 0.42 |  |
| 131 | Azir | -0.24 | 0.12 | 0.36 |  |
| 132 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 133 | Urgot | -0.24 | 0.06 | 0.30 |  |
| 134 | Ziggs | -0.25 | 0.13 | 0.38 |  |
| 135 | Jarvan IV | -0.26 | 0.25 | 0.51 |  |
| 136 | Aurelion Sol | -0.26 | 0.10 | 0.36 |  |
| 137 | Lucian | -0.27 | 0.16 | 0.43 |  |
| 138 | Ivern | -0.27 | 0.08 | 0.35 |  |
| 139 | Akshan | -0.28 | 0.15 | 0.43 |  |
| 140 | Graves | -0.28 | 0.10 | 0.38 |  |
| 141 | Diana | -0.28 | 0.00 | 0.28 |  |
| 142 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 143 | Talon | -0.28 | 0.00 | 0.28 |  |
| 144 | Thresh | -0.29 | 0.08 | 0.37 |  |
| 145 | Bel'Veth | -0.30 | 0.00 | 0.30 |  |
| 146 | Nautilus | -0.31 | 0.00 | 0.31 |  |
| 147 | Viego | -0.33 | 0.25 | 0.58 |  |
| 148 | Briar | -0.34 | 0.00 | 0.34 |  |
| 149 | Aatrox | -0.35 | 0.00 | 0.35 |  |
| 150 | Qiyana | -0.35 | 0.00 | 0.35 |  |
| 151 | Fizz | -0.36 | 0.00 | 0.36 |  |
| 152 | Lee Sin | -0.36 | 0.00 | 0.36 |  |
| 153 | Fiddlesticks | -0.39 | 0.08 | 0.47 |  |
| 154 | Quinn | -0.40 | 0.17 | 0.57 |  |
| 155 | Janna | -0.46 | 0.17 | 0.63 |  |
| 156 | Wukong | -0.46 | 0.00 | 0.46 |  |
| 157 | Akali | -0.48 | 0.00 | 0.48 |  |
| 158 | Sylas | -0.48 | 0.00 | 0.48 |  |
| 159 | Rakan | -0.49 | 0.05 | 0.54 |  |
| 160 | Pyke | -0.49 | 0.00 | 0.49 |  |
| 161 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 162 | Ornn | -0.51 | 0.25 | 0.76 |  |
| 163 | Zac | -0.54 | 0.35 | 0.89 |  |
| 164 | Rell | -0.54 | 0.00 | 0.54 |  |
| 165 | Riven | -0.54 | 0.00 | 0.54 |  |
| 166 | Nunu & Willump | -0.56 | 0.00 | 0.56 |  |
| 167 | Galio | -0.59 | 0.00 | 0.59 |  |
| 168 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 169 | Gragas | -0.69 | 0.00 | 0.69 |  |
| 170 | Vi | -0.72 | 0.25 | 0.97 |  |
| 171 | Naafiri | -0.99 | 0.00 | 0.99 |  |
| 172 | Taliyah | -1.12 | 0.12 | 1.24 |  |
