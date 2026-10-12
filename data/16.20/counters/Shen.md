# Counters to Shen (patch 26.20)

## Simulated duels (full confidence)

The duel simulator played each of the 48 other champions with a simulator kit against Shen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Shen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Shen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.85 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 2 | Quinn | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 3 | Udyr | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 4 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 5 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 6 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 8 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 10 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 11 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 12 | Riven | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 13 | Irelia | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 14 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 15 | Rumble | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 16 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 17 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 18 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 19 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 20 | Fiora | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 21 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 22 | Teemo | +0.73 | +1.00 | +1.00 | +0.63 | +0.04 | +1.00 | +0.00 |
| 23 | Gnar | +0.57 | +0.91 | +0.99 | +0.15 | −0.01 | +0.70 | +0.00 |
| 24 | Gangplank | +0.56 | +1.00 | +1.00 | +0.00 | +0.01 | – | +0.00 |
| 25 | Garen | +0.50 | +1.00 | +0.00 | +1.00 | +0.02 | – | +0.00 |
| 26 | Cho'Gath | +0.34 | +0.59 | +0.59 | +0.13 | −0.06 | – | +0.00 |
| 27 | Yasuo | +0.33 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.00 |
| 28 | Camille | +0.32 | +1.00 | +1.00 | −1.00 | −0.08 | – | +0.00 |
| 29 | Aurora | +0.30 | +0.42 | +0.42 | +0.27 | −0.01 | +0.43 | +0.00 |
| 30 | Jayce | +0.28 | +1.00 | −0.03 | +0.03 | +0.01 | – | +0.00 |
| 31 | Dr. Mundo | +0.22 | +0.31 | +0.37 | +0.23 | −0.13 | – | +0.00 |
| 32 | Mordekaiser | +0.22 | +0.32 | +0.29 | +0.24 | −0.05 | – | +0.00 |
| 33 | Kennen | +0.17 | +0.11 | +0.61 | −0.03 | −0.13 | +0.18 | +0.00 |
| 34 | Poppy | +0.16 | +0.25 | +0.19 | +0.11 | +0.07 | – | +0.00 |
| 35 | Heimerdinger | +0.10 | −0.00 | +0.20 | +0.15 | +0.01 | +0.18 | +0.00 |
| 36 | Ornn | +0.08 | +0.13 | +0.10 | +0.05 | +0.00 | – | +0.00 |
| 37 | Nasus | +0.07 | +0.06 | +0.08 | +0.15 | −0.05 | – | +0.00 |
| 38 | Malphite | +0.00 | +0.07 | −0.01 | −0.10 | +0.03 | – | +0.00 |
| 39 | Singed | −0.00 | +0.02 | +0.01 | +0.03 | −0.09 | – | +0.00 |
| 40 | Urgot | −0.01 | −0.00 | −0.02 | −0.09 | +0.04 | +0.11 | +0.00 |
| 41 | Sion | −0.02 | −0.02 | −0.02 | −0.00 | −0.09 | – | +0.00 |
| 42 | Tahm Kench | −0.04 | −0.04 | −0.04 | −0.08 | −0.04 | – | +0.00 |
| 43 | Renekton | −0.06 | −0.09 | −0.09 | +0.02 | −0.07 | – | +0.00 |
| 44 | Skarner | −0.07 | −0.11 | −0.05 | −0.03 | −0.09 | – | +0.00 |
| 45 | Sett | −0.07 | −0.12 | −0.10 | −0.04 | −0.00 | – | +0.00 |
| 46 | Akali | −0.19 | −0.04 | −0.04 | −0.71 | −0.06 | – | +0.00 |
| 47 | Ambessa | −0.22 | −1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 48 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |

## Interaction ledger (partial confidence)

Every champion ranked by what its kit does against Shen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +1.18)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Shen's Shadow Dash. Untargetable for 1.4 s; Shadow Dash takes 0.38 s to land, enough to react. (Maokai W Twisted Advance → Shen E Shadow Dash)
- **0.45** interrupt: Bramble Smash's airborne interrupts Shen's Stand United (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Maokai's basic attacks (with Sap Magic).

#### 2. Cassiopeia (net +1.08)

- **0.48** grounding: Miasma grounds Shen, who then can't cast Shadow Dash. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Shen E Shadow Dash)
- **0.45** interrupt: Petrifying Gaze's stun interrupts Shen's Stand United (movement channel). Petrifying Gaze must land during the channel. (Cassiopeia R Petrifying Gaze → Shen R Stand United)
- **0.43** grounding: Miasma grounds Shen, who then can't cast Stand United. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Cassiopeia's basic attacks.

#### 3. Nocturne (net +0.96)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Shen's Shadow Dash. Spell shield for 1.5 s, long enough to use ahead of Shadow Dash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Shen E Shadow Dash)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Shen's Stand United (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Nocturne's basic attacks (with Umbra Blades).

#### 4. Elise (net +0.95)

- **0.73** untargetable: Rappel makes Elise untargetable, dodging Shen's Shadow Dash. Untargetable for 0.6 s; Shadow Dash takes 0.38 s to land, enough to react. (Elise E Rappel → Shen E Shadow Dash)
- **0.45** interrupt: Cocoon's stun interrupts Shen's Stand United (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Shen R Stand United)
- **0.22** range: Elise's basic attacks reach 425 units farther than Shen's (550 vs 125 attack range). Shen closes the gap with Shadow Dash, Stand United. (Elise basic attacks → Shen basic attacks)
- Watch out: Spirit's Refuge blocks Elise's basic attacks (with Spider Queen).

#### 5. Singed (net +0.89)

- **0.49** grounding: Mega Adhesive grounds Shen, who then can't cast Shadow Dash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Shen E Shadow Dash)
- **0.45** interrupt: Fling's airborne interrupts Shen's Stand United (movement channel). Fling must land during the channel. (Singed E Fling → Shen R Stand United)
- **0.44** grounding: Mega Adhesive grounds Shen, who then can't cast Stand United. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Singed's basic attacks.

#### 6. Milio (net +0.83)

- **0.45** interrupt: Ultra Mega Fire Kick's airborne interrupts Shen's Stand United (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Shen R Stand United)
- **0.36** cleanse: Breath of Life cleanses Shen's Shadow Dash (taunt) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Shen E Shadow Dash)
- **0.27** tenacity: Breath of Life's 65% tenacity shortens Shen's Shadow Dash (taunt). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Shen E Shadow Dash)
- Watch out: Spirit's Refuge blocks Milio's basic attacks (with Fired Up!).

#### 7. Malzahar (net +0.74)

- **0.50** cc immunity: Void Shift makes Malzahar immune to Shen's Shadow Dash (taunt). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Shen E Shadow Dash)
- **0.45** interrupt: Call of the Void's silence interrupts Shen's Stand United (movement channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Shen R Stand United)
- **0.24** dash stop: Nether Grasp's knockdown can stop Shen's Shadow Dash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Shen E Shadow Dash)
- Watch out: Shadow Dash's taunt interrupts Malzahar's Nether Grasp (normal channel).

#### 8. Morgana (net +0.71)

- **0.78** cc immunity: Black Shield makes Morgana immune to Shen's Shadow Dash (taunt). Immune for 5 s, long enough to use ahead of Shadow Dash. (Morgana E Black Shield → Shen E Shadow Dash)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Shen's (450 vs 125 attack range). Shen closes the gap with Shadow Dash, Stand United. (Morgana basic attacks → Shen basic attacks)
- **0.07** cc immunity: Black Shield makes Morgana immune to Shen's Twilight Assault (slow). Immune for 5 s, long enough to use ahead of Twilight Assault. (Morgana E Black Shield → Shen Q Twilight Assault)
- Watch out: Spirit's Refuge blocks Morgana's basic attacks.

#### 9. Lulu (net +0.69)

- **0.45** interrupt: Wild Growth's airborne interrupts Shen's Stand United (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Shen R Stand United)
- **0.36** disarm: Whimsy disarms Shen for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Shen basic attacks)
- **0.24** range: Lulu's basic attacks reach 425 units farther than Shen's (550 vs 125 attack range). Shen closes the gap with Shadow Dash, Stand United. (Lulu basic attacks → Shen basic attacks)
- Watch out: Spirit's Refuge blocks Lulu's basic attacks (with Pix, Faerie Companion).

#### 10. Lissandra (net +0.69)

- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Shen's Shadow Dash. Untargetable for 2.5 s, long enough to use ahead of Shadow Dash. (Lissandra R Frozen Tomb → Shen E Shadow Dash)
- **0.45** interrupt: Frozen Tomb's stun interrupts Shen's Stand United (movement channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Shen R Stand United)
- **0.24** dash stop: Frozen Tomb's knockdown can stop Shen's Shadow Dash mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Shen E Shadow Dash)
- Watch out: Spirit's Refuge blocks Lissandra's basic attacks.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.18 | 1.45 | 0.27 |  |
| 2 | Cassiopeia | +1.08 | 1.30 | 0.22 | grounding (Miasma), grounding (Miasma) |
| 3 | Nocturne | +0.96 | 1.35 | 0.39 |  |
| 4 | Elise | +0.95 | 1.40 | 0.45 |  |
| 5 | Singed | +0.89 | 1.16 | 0.27 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 6 | Milio | +0.83 | 1.22 | 0.39 |  |
| 7 | Malzahar | +0.74 | 1.36 | 0.62 |  |
| 8 | Morgana | +0.71 | 0.95 | 0.24 |  |
| 9 | Lulu | +0.69 | 1.05 | 0.36 |  |
| 10 | Lissandra | +0.69 | 0.91 | 0.22 |  |
| 11 | Poppy | +0.66 | 1.13 | 0.47 | dash stop (Steadfast Presence) |
| 12 | Hwei | +0.65 | 0.88 | 0.23 | dash stop (Grim Visage) |
| 13 | Viktor | +0.61 | 1.10 | 0.49 | dash stop (Gravity Field) |
| 14 | Ahri | +0.61 | 0.83 | 0.22 | dash stop (Charm) |
| 15 | Shaco | +0.60 | 0.93 | 0.33 |  |
| 16 | Vladimir | +0.60 | 0.90 | 0.30 |  |
| 17 | Kled | +0.59 | 1.01 | 0.42 |  |
| 18 | Sion | +0.58 | 0.98 | 0.40 |  |
| 19 | Veigar | +0.58 | 0.82 | 0.24 | dash stop (Event Horizon) |
| 20 | Bard | +0.56 | 0.95 | 0.39 |  |
| 21 | Rek'Sai | +0.56 | 0.93 | 0.37 |  |
| 22 | Vex | +0.56 | 0.83 | 0.27 |  |
| 23 | Mordekaiser | +0.54 | 0.87 | 0.33 |  |
| 24 | Udyr | +0.53 | 1.25 | 0.72 |  |
| 25 | Sivir | +0.53 | 1.04 | 0.51 |  |
| 26 | Camille | +0.53 | 0.92 | 0.39 |  |
| 27 | Teemo | +0.51 | 0.87 | 0.36 | blind (Blinding Dart) |
| 28 | Fiora | +0.45 | 0.93 | 0.48 |  |
| 29 | Kalista | +0.43 | 0.86 | 0.43 |  |
| 30 | Heimerdinger | +0.43 | 0.63 | 0.20 |  |
| 31 | Malphite | +0.41 | 0.70 | 0.29 |  |
| 32 | Amumu | +0.41 | 0.68 | 0.27 |  |
| 33 | Nilah | +0.40 | 1.00 | 0.60 |  |
| 34 | Jinx | +0.40 | 0.69 | 0.29 | dash stop (Flame Chompers!) |
| 35 | Annie | +0.38 | 0.60 | 0.22 |  |
| 36 | Brand | +0.38 | 0.60 | 0.22 |  |
| 37 | Nami | +0.38 | 0.60 | 0.22 |  |
| 38 | Neeko | +0.38 | 0.60 | 0.22 |  |
| 39 | Syndra | +0.38 | 0.60 | 0.22 |  |
| 40 | Swain | +0.38 | 0.59 | 0.21 |  |
| 41 | Yuumi | +0.37 | 1.21 | 0.84 |  |
| 42 | Gwen | +0.37 | 0.73 | 0.36 |  |
| 43 | Anivia | +0.37 | 0.61 | 0.24 |  |
| 44 | Zyra | +0.37 | 0.61 | 0.24 |  |
| 45 | Aurora | +0.36 | 0.65 | 0.29 |  |
| 46 | Orianna | +0.36 | 0.63 | 0.27 |  |
| 47 | Soraka | +0.36 | 0.63 | 0.27 |  |
| 48 | Ziggs | +0.36 | 0.63 | 0.27 |  |
| 49 | Corki | +0.35 | 0.65 | 0.30 |  |
| 50 | Seraphine | +0.35 | 0.64 | 0.29 |  |
| 51 | Evelynn | +0.34 | 0.93 | 0.59 |  |
| 52 | Zilean | +0.34 | 0.67 | 0.33 |  |
| 53 | Zoe | +0.34 | 0.67 | 0.33 |  |
| 54 | Thresh | +0.34 | 0.58 | 0.24 |  |
| 55 | Alistar | +0.33 | 0.85 | 0.52 |  |
| 56 | Xayah | +0.33 | 0.72 | 0.39 |  |
| 57 | Ashe | +0.33 | 0.69 | 0.36 |  |
| 58 | Draven | +0.33 | 0.69 | 0.36 |  |
| 59 | Gnar | +0.33 | 0.67 | 0.34 |  |
| 60 | Renata Glasc | +0.32 | 0.71 | 0.39 |  |
| 61 | Jayce | +0.32 | 0.65 | 0.33 |  |
| 62 | Vayne | +0.31 | 0.74 | 0.43 |  |
| 63 | Sona | +0.30 | 0.72 | 0.42 |  |
| 64 | Aurelion Sol | +0.30 | 0.60 | 0.30 |  |
| 65 | Lillia | +0.30 | 0.52 | 0.22 |  |
| 66 | Taric | +0.29 | 0.68 | 0.39 |  |
| 67 | Braum | +0.29 | 0.62 | 0.33 |  |
| 68 | Rammus | +0.27 | 0.83 | 0.56 |  |
| 69 | Kennen | +0.26 | 0.64 | 0.38 |  |
| 70 | Zaahen | +0.25 | 0.95 | 0.70 |  |
| 71 | Gangplank | +0.25 | 0.69 | 0.44 |  |
| 72 | Kayn | +0.24 | 0.93 | 0.69 |  |
| 73 | Rakan | +0.24 | 0.53 | 0.29 |  |
| 74 | Yone | +0.23 | 0.69 | 0.46 |  |
| 75 | Tristana | +0.21 | 0.69 | 0.48 |  |
| 76 | Ambessa | +0.20 | 0.45 | 0.25 |  |
| 77 | Ekko | +0.19 | 0.52 | 0.33 |  |
| 78 | Jax | +0.18 | 0.74 | 0.56 | attack dodge (Counter Strike) |
| 79 | Skarner | +0.18 | 0.51 | 0.33 |  |
| 80 | Diana | +0.18 | 0.45 | 0.27 |  |
| 81 | Lee Sin | +0.18 | 0.45 | 0.27 |  |
| 82 | Ornn | +0.18 | 0.45 | 0.27 |  |
| 83 | Urgot | +0.17 | 0.55 | 0.38 |  |
| 84 | Zed | +0.17 | 0.46 | 0.29 |  |
| 85 | Yasuo | +0.16 | 0.58 | 0.42 |  |
| 86 | Cho'Gath | +0.16 | 0.45 | 0.29 |  |
| 87 | Kassadin | +0.16 | 0.45 | 0.29 |  |
| 88 | Leona | +0.16 | 0.45 | 0.29 |  |
| 89 | Shyvana | +0.16 | 0.45 | 0.29 |  |
| 90 | Sylas | +0.16 | 0.45 | 0.29 |  |
| 91 | Qiyana | +0.15 | 0.45 | 0.30 |  |
| 92 | Garen | +0.13 | 0.76 | 0.63 |  |
| 93 | Quinn | +0.13 | 0.71 | 0.58 |  |
| 94 | Olaf | +0.12 | 0.51 | 0.39 |  |
| 95 | Hecarim | +0.12 | 0.45 | 0.33 |  |
| 96 | Nautilus | +0.12 | 0.45 | 0.33 |  |
| 97 | Sejuani | +0.12 | 0.45 | 0.33 |  |
| 98 | Jarvan IV | +0.09 | 0.45 | 0.36 |  |
| 99 | Rengar | +0.08 | 0.83 | 0.75 |  |
| 100 | Vel'Koz | +0.08 | 0.63 | 0.55 |  |
| 101 | Aatrox | +0.06 | 0.45 | 0.39 |  |
| 102 | Riven | +0.06 | 0.45 | 0.39 |  |
| 103 | Nasus | +0.06 | 0.39 | 0.33 |  |
| 104 | Xerath | +0.04 | 0.63 | 0.59 |  |
| 105 | Sett | +0.04 | 0.45 | 0.41 |  |
| 106 | Azir | +0.03 | 0.63 | 0.60 |  |
| 107 | Kindred | +0.03 | 0.54 | 0.51 |  |
| 108 | Kayle | +0.03 | 0.48 | 0.45 |  |
| 109 | K'Sante | +0.02 | 0.45 | 0.43 |  |
| 110 | Pyke | +0.01 | 0.45 | 0.44 |  |
| 111 | Galio | 0.00 | 0.45 | 0.45 |  |
| 112 | Mel | -0.02 | 0.25 | 0.27 |  |
| 113 | Master Yi | -0.03 | 0.80 | 0.83 |  |
| 114 | Xin Zhao | -0.04 | 0.68 | 0.72 |  |
| 115 | Trundle | -0.06 | 0.45 | 0.51 |  |
| 116 | Samira | -0.06 | 0.27 | 0.33 |  |
| 117 | Janna | -0.07 | 0.69 | 0.76 |  |
| 118 | Darius | -0.07 | 0.45 | 0.52 |  |
| 119 | Karma | -0.07 | 0.15 | 0.22 |  |
| 120 | LeBlanc | -0.07 | 0.15 | 0.22 |  |
| 121 | Nidalee | -0.10 | 0.20 | 0.30 |  |
| 122 | Lux | -0.10 | 0.19 | 0.29 |  |
| 123 | Yorick | -0.11 | 0.45 | 0.56 |  |
| 124 | Taliyah | -0.12 | 0.63 | 0.75 |  |
| 125 | Yunara | -0.12 | 0.24 | 0.36 |  |
| 126 | Kai'Sa | -0.13 | 0.26 | 0.39 |  |
| 127 | Twitch | -0.14 | 0.29 | 0.43 |  |
| 128 | Graves | -0.17 | 0.16 | 0.33 |  |
| 129 | Gragas | -0.18 | 0.45 | 0.63 |  |
| 130 | Briar | -0.20 | 0.45 | 0.65 |  |
| 131 | Smolder | -0.20 | 0.22 | 0.42 |  |
| 132 | Wukong | -0.23 | 0.45 | 0.68 |  |
| 133 | Ivern | -0.24 | 0.13 | 0.37 |  |
| 134 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 135 | Nunu & Willump | -0.25 | 0.51 | 0.76 |  |
| 136 | Bel'Veth | -0.25 | 0.45 | 0.70 |  |
| 137 | Senna | -0.26 | 0.22 | 0.48 |  |
| 138 | Irelia | -0.27 | 0.48 | 0.75 |  |
| 139 | Zac | -0.28 | 0.95 | 1.23 | dash stop (Stretching Strikes) |
| 140 | Fiddlesticks | -0.28 | 0.58 | 0.86 |  |
| 141 | Blitzcrank | -0.29 | 0.45 | 0.74 |  |
| 142 | Akali | -0.29 | 0.00 | 0.29 |  |
| 143 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 144 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 145 | Ezreal | -0.31 | 0.22 | 0.53 |  |
| 146 | Fizz | -0.34 | 0.45 | 0.79 |  |
| 147 | Renekton | -0.34 | 0.45 | 0.79 |  |
| 148 | Tahm Kench | -0.34 | 0.45 | 0.79 |  |
| 149 | Twisted Fate | -0.36 | 0.74 | 1.10 |  |
| 150 | Talon | -0.36 | 0.00 | 0.36 |  |
| 151 | Karthus | -0.39 | 0.13 | 0.52 |  |
| 152 | Caitlyn | -0.40 | 0.24 | 0.64 |  |
| 153 | Kog'Maw | -0.42 | 0.18 | 0.60 |  |
| 154 | Lucian | -0.43 | 0.24 | 0.67 |  |
| 155 | Ryze | -0.43 | 0.16 | 0.59 |  |
| 156 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 157 | Aphelios | -0.44 | 0.31 | 0.75 |  |
| 158 | Viego | -0.51 | 0.51 | 1.02 |  |
| 159 | Vi | -0.51 | 0.45 | 0.96 |  |
| 160 | Dr. Mundo | -0.51 | 0.00 | 0.51 |  |
| 161 | Varus | -0.52 | 0.18 | 0.70 |  |
| 162 | Jhin | -0.54 | 0.18 | 0.72 |  |
| 163 | Miss Fortune | -0.55 | 0.22 | 0.77 |  |
| 164 | Zeri | -0.57 | 0.29 | 0.86 |  |
| 165 | Locke | -0.60 | 0.00 | 0.60 |  |
| 166 | Warwick | -0.63 | 1.07 | 1.70 |  |
| 167 | Pantheon | -0.65 | 0.37 | 1.02 |  |
| 168 | Rell | -0.73 | 0.45 | 1.18 |  |
| 169 | Naafiri | -0.74 | 0.00 | 0.74 |  |
| 170 | Volibear | -0.76 | 0.45 | 1.21 |  |
| 171 | Katarina | -0.83 | 0.00 | 0.83 |  |
| 172 | Akshan | -0.84 | 0.22 | 1.06 |  |
