# Counters to Yone (patch 26.20)

## Simulated duels

The duel simulator played each of the 90 other champions with a simulator kit against Yone: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yone wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yone --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.90 | +1.00 | +1.00 | +1.00 | +0.66 | +1.00 | +0.00 |
| 2 | Vayne | +0.90 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +1.00 |
| 3 | K'Sante | +0.88 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +1.00 |
| 4 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 5 | Teemo | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 6 | Draven | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 7 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +1.00 |
| 8 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 9 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 10 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | – | +1.00 |
| 11 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.10 | – | +1.00 |
| 12 | Heimerdinger | +0.80 | +1.00 | +0.90 | +1.00 | +0.18 | +1.00 | +0.00 |
| 13 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 14 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 15 | Malphite | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 16 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 17 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 18 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 19 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 20 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 21 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 22 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 23 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 24 | Morgana | +0.76 | +0.86 | +0.97 | +1.00 | +0.03 | +0.97 | +0.00 |
| 25 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 26 | Gnar | +0.73 | +1.00 | +0.53 | +1.00 | +0.28 | +1.00 | +0.00 |
| 27 | Yasuo | +0.72 | +1.00 | +0.81 | +1.00 | +0.01 | – | +0.00 |
| 28 | Sett | +0.71 | +1.00 | +0.72 | +1.00 | +0.06 | – | +0.00 |
| 29 | Brand | +0.69 | +0.97 | +0.97 | +1.00 | +0.03 | +0.00 | +0.00 |
| 30 | Zaahen | +0.65 | +0.53 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 31 | Annie | +0.60 | +0.14 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 32 | Kog'Maw | +0.58 | +0.41 | +0.41 | +1.00 | +0.34 | +1.00 | +0.41 |
| 33 | Smolder | +0.45 | −0.17 | +0.95 | +0.90 | +0.14 | +0.90 | −0.59 |
| 34 | Quinn | +0.41 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 35 | Lucian | +0.38 | +1.00 | +1.00 | −1.00 | +0.08 | +1.00 | −0.55 |
| 36 | Garen | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 37 | Rammus | +0.30 | +1.00 | +1.00 | −1.00 | −0.21 | – | +0.00 |
| 38 | Ezreal | +0.22 | −0.26 | +0.19 | +0.71 | +0.03 | +0.88 | +0.00 |
| 39 | Xin Zhao | +0.20 | −1.00 | +1.00 | +1.00 | +0.01 | – | −0.49 |
| 40 | Ashe | +0.17 | +1.00 | −0.24 | −0.24 | +0.37 | −0.24 | +0.00 |
| 41 | Aurora | +0.17 | +1.00 | +0.00 | −1.00 | +0.13 | +1.00 | +0.00 |
| 42 | Irelia | +0.16 | −0.11 | −0.11 | +1.00 | −0.01 | – | +0.00 |
| 43 | Corki | +0.09 | −0.24 | +1.00 | −1.00 | +0.24 | +1.00 | −0.62 |
| 44 | Cassiopeia | +0.08 | +0.88 | −0.06 | −0.57 | +0.30 | −0.55 | +0.00 |
| 45 | Master Yi | +0.07 | +0.00 | +0.00 | +0.00 | +0.10 | – | +1.00 |
| 46 | Malzahar | +0.05 | +0.09 | +0.50 | −0.02 | +0.03 | −1.00 | +0.00 |
| 47 | Jinx | −0.03 | +0.01 | +0.62 | −1.00 | +0.06 | +0.07 | +0.00 |
| 48 | Anivia | −0.05 | +0.04 | −0.46 | +0.30 | −0.15 | +0.17 | +0.00 |
| 49 | Veigar | −0.11 | −0.12 | −0.15 | −0.22 | +0.09 | −0.15 | +0.00 |
| 50 | Sion | −0.12 | +0.00 | +0.00 | −0.50 | −0.04 | – | +0.00 |
| 51 | Tristana | −0.18 | −1.00 | +1.00 | −1.00 | +0.16 | +0.01 | +0.00 |
| 52 | Kalista | −0.18 | −1.00 | −1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 53 | Riven | −0.20 | −0.52 | −1.00 | +1.00 | +0.15 | – | −0.52 |
| 54 | Kennen | −0.21 | −1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 55 | Lux | −0.23 | −0.44 | −0.99 | +0.99 | +0.15 | −0.97 | +0.00 |
| 56 | Zyra | −0.26 | −0.42 | −0.68 | +0.55 | +0.02 | −1.00 | +0.00 |
| 57 | Aatrox | −0.26 | +1.00 | −1.00 | −1.00 | −0.09 | – | −0.49 |
| 58 | Jayce | −0.27 | +0.00 | −1.00 | −0.09 | +0.18 | – | +0.00 |
| 59 | Varus | −0.29 | −0.17 | −0.86 | −0.17 | +0.13 | −0.17 | +0.00 |
| 60 | Twitch | −0.30 | −0.17 | −0.17 | −1.00 | +0.05 | −0.17 | +0.00 |
| 61 | Camille | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | +0.00 |
| 62 | Leona | −0.33 | −0.27 | −0.11 | −1.00 | −0.03 | – | +0.00 |
| 63 | Samira | −0.41 | −0.97 | −0.99 | +0.41 | +0.00 | −0.05 | +0.00 |
| 64 | Ahri | −0.43 | −1.00 | −1.00 | −0.12 | +0.04 | +0.90 | +0.00 |
| 65 | Kai'Sa | −0.48 | −0.11 | −0.55 | −1.00 | −0.05 | −0.77 | −0.55 |
| 66 | Lissandra | −0.48 | −1.00 | −1.00 | −0.47 | +0.10 | +0.97 | +0.00 |
| 67 | Ambessa | −0.51 | −0.11 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 68 | Ziggs | −0.52 | +0.01 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 69 | Tahm Kench | −0.56 | −1.00 | −1.00 | +0.00 | −0.00 | – | +0.00 |
| 70 | Volibear | −0.56 | −0.80 | −0.56 | −0.80 | −0.04 | – | +0.00 |
| 71 | Shen | −0.57 | −1.00 | −1.00 | −0.04 | +0.00 | – | +0.00 |
| 72 | Mordekaiser | −0.57 | −0.83 | −0.60 | −0.75 | −0.02 | – | +0.00 |
| 73 | Gwen | −0.58 | −1.00 | −1.00 | −0.08 | −0.04 | – | −0.04 |
| 74 | Caitlyn | −0.70 | −1.00 | −0.49 | −1.00 | +0.16 | −1.00 | −1.00 |
| 75 | Udyr | −0.70 | −1.00 | −1.00 | −1.00 | +0.11 | – | +1.00 |
| 76 | Jhin | −0.73 | −1.00 | −0.97 | −1.00 | +0.11 | −0.59 | +0.00 |
| 77 | Miss Fortune | −0.76 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | +0.00 |
| 78 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 79 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 80 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 81 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 82 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 83 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 84 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 85 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 86 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 87 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 88 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 89 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 90 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |

## Interaction ledger estimates

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
- **0.08** range: Morgana's basic attacks reach 275 units farther than Yone's (450 vs 175 attack range). Yone closes the gap with Fate Sealed, Mortal Steel, Soul Unbound. (Morgana basic attacks → Yone basic attacks)

#### 3. Lissandra (net +1.32)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yone's Fate Sealed. Untargetable for 2.5 s, long enough to use ahead of Fate Sealed. (Lissandra R Frozen Tomb → Yone R Fate Sealed)
- **0.43** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yone's Mortal Steel. Untargetable for 2.5 s, long enough to use ahead of Mortal Steel. (Lissandra R Frozen Tomb → Yone Q Mortal Steel)
- **0.22** dash stop: Frozen Tomb's knockdown can stop Yone's Mortal Steel mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Yone Q Mortal Steel)
- Watch out: Soul Unbound is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 4. Xayah (net +1.26)

- **0.88** untargetable: Featherstorm makes Xayah untargetable, dodging Yone's Fate Sealed. Untargetable for 1.5 s, long enough to use ahead of Fate Sealed. (Xayah R Featherstorm → Yone R Fate Sealed)
- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Yone's Mortal Steel. Untargetable for 1.5 s, long enough to use ahead of Mortal Steel. (Xayah R Featherstorm → Yone Q Mortal Steel)
- **0.17** range: Xayah's basic attacks reach 350 units farther than Yone's (525 vs 175 attack range). Yone closes the gap with Fate Sealed, Mortal Steel, Soul Unbound. (Xayah basic attacks → Yone basic attacks)

#### 5. Maokai (net +1.25)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Yone's Fate Sealed. Untargetable for 1.4 s; Fate Sealed takes 0.75 s to land, enough to react. (Maokai W Twisted Advance → Yone R Fate Sealed)
- **0.64** untargetable: Twisted Advance makes Maokai untargetable, dodging Yone's Mortal Steel. Untargetable for 1.4 s; Mortal Steel takes 0.65 s to land, enough to react. (Maokai W Twisted Advance → Yone Q Mortal Steel)
- Watch out: Soul Unbound is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 6. Olaf (net +1.22)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Yone's Fate Sealed (airborne, knockdown, stun). Immune for 3 s, long enough to use ahead of Fate Sealed. (Olaf R Ragnarok → Yone R Fate Sealed)
- **0.43** cc immunity: Ragnarok makes Olaf immune to Yone's Mortal Steel (airborne). Immune for 3 s, long enough to use ahead of Mortal Steel. (Olaf R Ragnarok → Yone Q Mortal Steel)

#### 7. Shaco (net +1.22)

- **1.00** untargetable: Hallucinate makes Shaco untargetable, dodging Yone's Fate Sealed. Untargetable for 0.5 s; Fate Sealed takes 0.75 s to land, enough to react. (Shaco R Hallucinate → Yone R Fate Sealed)
- **0.43** untargetable: Hallucinate makes Shaco untargetable, dodging Yone's Mortal Steel. Untargetable for 0.5 s; Mortal Steel takes 0.65 s to land, enough to react. (Shaco R Hallucinate → Yone Q Mortal Steel)

#### 8. Vladimir (net +1.20)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yone's Fate Sealed. Untargetable for 2 s, long enough to use ahead of Fate Sealed. (Vladimir W Sanguine Pool → Yone R Fate Sealed)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yone's Mortal Steel. Untargetable for 2 s, long enough to use ahead of Mortal Steel. (Vladimir W Sanguine Pool → Yone Q Mortal Steel)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Yone's (450 vs 175 attack range). Yone closes the gap with Fate Sealed, Mortal Steel, Soul Unbound. (Vladimir basic attacks → Yone basic attacks)
- Watch out: Mortal Steel's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 9. Fiora (net +1.16)

- **1.00** parry: Riposte parries Yone's Fate Sealed and stuns back. Parry for 0.75 s; Fate Sealed takes 0.75 s to land, enough to react. Negating Fate Sealed's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yone R Fate Sealed)
- **0.65** parry: Riposte parries Yone's Mortal Steel and stuns back. Parry for 0.75 s; Mortal Steel takes 0.65 s to land, enough to react. Negating Mortal Steel's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Yone Q Mortal Steel)
- **0.06** attack speed slow: Riposte cuts Yone's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Yone basic attacks)
- Watch out: Fate Sealed's knockdown can stop Fiora's Lunge mid-dash.

#### 10. Bard (net +1.14)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Yone's Fate Sealed. Untargetable for 2.5 s, long enough to use ahead of Fate Sealed. (Bard R Tempered Fate → Yone R Fate Sealed)
- **0.43** untargetable: Tempered Fate makes Bard untargetable, dodging Yone's Mortal Steel. Untargetable for 2.5 s, long enough to use ahead of Mortal Steel. (Bard R Tempered Fate → Yone Q Mortal Steel)
- **0.16** range: Bard's basic attacks reach 325 units farther than Yone's (500 vs 175 attack range). Yone closes the gap with Fate Sealed, Mortal Steel, Soul Unbound. (Bard basic attacks → Yone basic attacks)
- Watch out: Fate Sealed's knockdown can stop Bard's Magical Journey mid-dash.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 2 | Morgana | +1.36 | 1.36 | 0.00 |  |
| 3 | Lissandra | +1.32 | 1.37 | 0.05 |  |
| 4 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 5 | Maokai | +1.25 | 1.32 | 0.07 |  |
| 6 | Olaf | +1.22 | 1.22 | 0.00 |  |
| 7 | Shaco | +1.22 | 1.22 | 0.00 |  |
| 8 | Vladimir | +1.20 | 1.36 | 0.16 |  |
| 9 | Fiora | +1.16 | 1.34 | 0.18 |  |
| 10 | Bard | +1.14 | 1.38 | 0.24 |  |
| 11 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 12 | Zed | +1.09 | 1.09 | 0.00 |  |
| 13 | Gwen | +1.08 | 1.27 | 0.19 |  |
| 14 | Aurora | +1.06 | 1.29 | 0.23 |  |
| 15 | Evelynn | +1.03 | 1.22 | 0.19 |  |
| 16 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 17 | Fizz | +0.99 | 1.35 | 0.36 |  |
| 18 | Sivir | +0.98 | 0.98 | 0.00 |  |
| 19 | Master Yi | +0.93 | 1.27 | 0.34 |  |
| 20 | Rek'Sai | +0.92 | 1.28 | 0.36 |  |
| 21 | Rengar | +0.91 | 1.06 | 0.15 |  |
| 22 | Zaahen | +0.86 | 1.22 | 0.36 |  |
| 23 | Milio | +0.86 | 0.93 | 0.07 |  |
| 24 | Sion | +0.84 | 1.22 | 0.38 |  |
| 25 | Cassiopeia | +0.83 | 0.83 | 0.00 | grounding (Miasma) |
| 26 | Yuumi | +0.82 | 1.63 | 0.81 |  |
| 27 | Kayle | +0.79 | 0.79 | 0.00 |  |
| 28 | Camille | +0.72 | 1.21 | 0.49 |  |
| 29 | Singed | +0.68 | 0.75 | 0.07 | grounding (Mega Adhesive) |
| 30 | Alistar | +0.66 | 0.97 | 0.31 |  |
| 31 | Kalista | +0.65 | 0.95 | 0.30 |  |
| 32 | Vex | +0.63 | 0.66 | 0.03 |  |
| 33 | Kled | +0.57 | 1.09 | 0.52 |  |
| 34 | Teemo | +0.50 | 0.50 | 0.00 |  |
| 35 | Jinx | +0.41 | 0.45 | 0.04 |  |
| 36 | Viktor | +0.39 | 0.43 | 0.04 |  |
| 37 | Mel | +0.38 | 0.38 | 0.00 |  |
| 38 | Hwei | +0.36 | 0.43 | 0.07 |  |
| 39 | Veigar | +0.36 | 0.40 | 0.04 |  |
| 40 | Lulu | +0.34 | 0.42 | 0.08 |  |
| 41 | Jax | +0.29 | 0.47 | 0.18 |  |
| 42 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 43 | Garen | +0.26 | 0.26 | 0.00 |  |
| 44 | Shyvana | +0.25 | 0.25 | 0.00 |  |
| 45 | Malphite | +0.23 | 0.43 | 0.20 |  |
| 46 | Warwick | +0.21 | 1.52 | 1.31 |  |
| 47 | Malzahar | +0.21 | 1.06 | 0.85 |  |
| 48 | Twitch | +0.20 | 0.20 | 0.00 |  |
| 49 | Sona | +0.19 | 0.19 | 0.00 |  |
| 50 | Xin Zhao | +0.18 | 0.55 | 0.37 |  |
| 51 | Sett | +0.18 | 0.25 | 0.07 |  |
| 52 | Aphelios | +0.18 | 0.18 | 0.00 |  |
| 53 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 54 | Kayn | +0.16 | 1.22 | 1.06 |  |
| 55 | Senna | +0.16 | 0.16 | 0.00 |  |
| 56 | K'Sante | +0.15 | 0.50 | 0.35 |  |
| 57 | Illaoi | +0.15 | 0.25 | 0.10 |  |
| 58 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 59 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 60 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 61 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 62 | Lux | +0.14 | 0.14 | 0.00 |  |
| 63 | Volibear | +0.13 | 0.25 | 0.12 |  |
| 64 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 65 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 66 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 67 | Renata Glasc | +0.11 | 0.18 | 0.07 |  |
| 68 | Annie | +0.11 | 0.11 | 0.00 |  |
| 69 | Nilah | +0.10 | 0.38 | 0.28 |  |
| 70 | Draven | +0.10 | 0.17 | 0.07 |  |
| 71 | Brand | +0.10 | 0.10 | 0.00 |  |
| 72 | Karma | +0.10 | 0.10 | 0.00 |  |
| 73 | Braum | +0.09 | 0.35 | 0.26 |  |
| 74 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 75 | Samira | +0.08 | 0.38 | 0.30 |  |
| 76 | Hecarim | +0.08 | 0.26 | 0.18 |  |
| 77 | Zoe | +0.08 | 0.15 | 0.07 |  |
| 78 | Kindred | +0.06 | 0.20 | 0.14 |  |
| 79 | Zeri | +0.05 | 0.21 | 0.16 |  |
| 80 | Yunara | +0.04 | 0.18 | 0.14 |  |
| 81 | Orianna | +0.04 | 0.12 | 0.08 |  |
| 82 | Syndra | +0.03 | 0.10 | 0.07 |  |
| 83 | Elise | +0.02 | 0.15 | 0.13 |  |
| 84 | Neeko | +0.02 | 0.10 | 0.08 |  |
| 85 | Swain | +0.02 | 0.09 | 0.07 |  |
| 86 | Ahri | +0.01 | 0.40 | 0.39 |  |
| 87 | Corki | 0.00 | 0.15 | 0.15 |  |
| 88 | Nidalee | 0.00 | 0.13 | 0.13 |  |
| 89 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 90 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 91 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 92 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 93 | Taric | 0.00 | 0.00 | 0.00 |  |
| 94 | Poppy | -0.01 | 0.69 | 0.70 | dash stop (Steadfast Presence) |
| 95 | Vayne | -0.02 | 0.20 | 0.22 |  |
| 96 | Anivia | -0.02 | 0.12 | 0.14 |  |
| 97 | Varus | -0.04 | 0.13 | 0.17 |  |
| 98 | Zyra | -0.04 | 0.12 | 0.16 |  |
| 99 | Tristana | -0.05 | 0.18 | 0.23 |  |
| 100 | Jayce | -0.07 | 0.13 | 0.20 |  |
| 101 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 102 | Darius | -0.07 | 0.00 | 0.07 |  |
| 103 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 104 | Nami | -0.08 | 0.10 | 0.18 |  |
| 105 | Mordekaiser | -0.08 | 0.06 | 0.14 |  |
| 106 | Amumu | -0.09 | 0.21 | 0.30 |  |
| 107 | LeBlanc | -0.09 | 0.10 | 0.19 |  |
| 108 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 109 | Kai'Sa | -0.15 | 0.17 | 0.32 |  |
| 110 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 111 | Gnar | -0.17 | 0.14 | 0.31 |  |
| 112 | Lillia | -0.18 | 0.04 | 0.22 |  |
| 113 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 114 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 115 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 116 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 117 | Yasuo | -0.19 | 0.27 | 0.46 |  |
| 118 | Locke | -0.19 | 0.00 | 0.19 |  |
| 119 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 120 | Kha'Zix | -0.20 | 0.00 | 0.20 |  |
| 121 | Leona | -0.22 | 0.00 | 0.22 |  |
| 122 | Azir | -0.24 | 0.12 | 0.36 |  |
| 123 | Urgot | -0.24 | 0.06 | 0.30 |  |
| 124 | Ziggs | -0.25 | 0.13 | 0.38 |  |
| 125 | Jarvan IV | -0.26 | 0.25 | 0.51 |  |
| 126 | Graves | -0.28 | 0.10 | 0.38 |  |
| 127 | Diana | -0.28 | 0.00 | 0.28 |  |
| 128 | Talon | -0.28 | 0.00 | 0.28 |  |
| 129 | Aurelion Sol | -0.29 | 0.10 | 0.39 |  |
| 130 | Thresh | -0.29 | 0.08 | 0.37 |  |
| 131 | Bel'Veth | -0.30 | 0.00 | 0.30 |  |
| 132 | Ivern | -0.31 | 0.08 | 0.39 |  |
| 133 | Nautilus | -0.31 | 0.00 | 0.31 |  |
| 134 | Briar | -0.34 | 0.00 | 0.34 |  |
| 135 | Aatrox | -0.35 | 0.00 | 0.35 |  |
| 136 | Qiyana | -0.35 | 0.00 | 0.35 |  |
| 137 | Lee Sin | -0.36 | 0.00 | 0.36 |  |
| 138 | Rammus | -0.37 | 0.27 | 0.64 |  |
| 139 | Viego | -0.39 | 0.25 | 0.64 |  |
| 140 | Miss Fortune | -0.41 | 0.15 | 0.56 |  |
| 141 | Pantheon | -0.42 | 0.64 | 1.06 |  |
| 142 | Jhin | -0.43 | 0.13 | 0.56 |  |
| 143 | Caitlyn | -0.45 | 0.18 | 0.63 |  |
| 144 | Akshan | -0.46 | 0.15 | 0.61 |  |
| 145 | Wukong | -0.46 | 0.00 | 0.46 |  |
| 146 | Quinn | -0.47 | 0.17 | 0.64 |  |
| 147 | Lucian | -0.48 | 0.16 | 0.64 |  |
| 148 | Karthus | -0.48 | 0.08 | 0.56 |  |
| 149 | Akali | -0.48 | 0.00 | 0.48 |  |
| 150 | Katarina | -0.48 | 0.00 | 0.48 |  |
| 151 | Sylas | -0.48 | 0.00 | 0.48 |  |
| 152 | Rakan | -0.49 | 0.05 | 0.54 |  |
| 153 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 154 | Ornn | -0.51 | 0.25 | 0.76 |  |
| 155 | Twisted Fate | -0.51 | 0.19 | 0.70 |  |
| 156 | Vel'Koz | -0.51 | 0.12 | 0.63 |  |
| 157 | Xerath | -0.52 | 0.12 | 0.64 |  |
| 158 | Pyke | -0.53 | 0.00 | 0.53 |  |
| 159 | Rell | -0.54 | 0.00 | 0.54 |  |
| 160 | Riven | -0.54 | 0.00 | 0.54 |  |
| 161 | Shen | -0.56 | 0.46 | 1.02 |  |
| 162 | Ryze | -0.59 | 0.11 | 0.70 |  |
| 163 | Zac | -0.65 | 0.35 | 1.00 |  |
| 164 | Gragas | -0.74 | 0.00 | 0.74 |  |
| 165 | Fiddlesticks | -0.79 | 0.08 | 0.87 |  |
| 166 | Vi | -0.83 | 0.25 | 1.08 |  |
| 167 | Janna | -0.86 | 0.17 | 1.03 |  |
| 168 | Tahm Kench | -0.92 | 0.00 | 0.92 |  |
| 169 | Nunu & Willump | -0.93 | 0.00 | 0.93 |  |
| 170 | Naafiri | -1.17 | 0.00 | 1.17 |  |
| 171 | Taliyah | -1.36 | 0.12 | 1.48 |  |
| 172 | Galio | -1.47 | 0.00 | 1.47 |  |
