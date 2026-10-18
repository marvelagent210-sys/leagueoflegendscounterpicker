# Counters to Shen (patch 26.20)

## Simulated duels

The duel simulator played each of the 72 other champions with a simulator kit against Shen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Shen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Shen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.50 |
| 2 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 3 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.50 |
| 4 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 5 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 6 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 7 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 8 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 9 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 10 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 11 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 12 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 13 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 14 | Gangplank | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 15 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 16 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 17 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 18 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 19 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 20 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 21 | Riven | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 22 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 23 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 24 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 25 | Jayce | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 26 | Olaf | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 27 | Rumble | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 28 | Cho'Gath | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 29 | Jax | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 30 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 31 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 32 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 33 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 34 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 35 | Kennen | +0.69 | +1.00 | +1.00 | +1.00 | −0.15 | +0.16 | +0.00 |
| 36 | Irelia | +0.67 | +1.00 | +1.00 | +0.50 | +0.00 | – | +0.00 |
| 37 | Yone | +0.57 | +1.00 | +1.00 | +0.04 | −0.00 | – | +0.00 |
| 38 | Ambessa | +0.56 | +1.00 | +1.00 | +0.00 | +0.05 | – | +0.00 |
| 39 | Sett | +0.56 | +1.00 | +1.00 | +0.00 | +0.02 | – | +0.00 |
| 40 | Garen | +0.56 | +1.00 | +1.00 | +0.00 | +0.01 | – | +0.00 |
| 41 | Master Yi | +0.54 | +0.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 42 | Renekton | +0.44 | +0.57 | +1.00 | +0.10 | −0.09 | – | +0.00 |
| 43 | Heimerdinger | +0.27 | +0.02 | +0.23 | +0.92 | +0.02 | +0.22 | +0.00 |
| 44 | Urgot | +0.15 | +0.07 | +0.06 | +0.01 | +0.11 | +1.00 | +0.00 |
| 45 | Morgana | +0.12 | +0.13 | +0.19 | +0.12 | +0.08 | +0.06 | +0.00 |
| 46 | Ornn | +0.12 | +0.18 | +0.17 | +0.06 | +0.02 | – | +0.00 |
| 47 | Lux | +0.09 | +0.13 | +0.14 | +0.01 | +0.03 | +0.13 | +0.00 |
| 48 | Sion | +0.08 | +0.31 | +0.02 | +0.05 | −0.10 | – | +0.00 |
| 49 | Annie | +0.07 | +0.17 | +0.05 | +0.11 | +0.03 | −0.07 | +0.00 |
| 50 | Singed | +0.02 | +0.10 | −0.02 | +0.08 | −0.11 | – | +0.00 |
| 51 | Malzahar | −0.00 | −0.04 | +0.05 | −0.07 | −0.00 | +0.08 | +0.00 |
| 52 | Zyra | −0.00 | +0.01 | +0.03 | −0.02 | −0.07 | +0.02 | +0.00 |
| 53 | Malphite | −0.02 | +0.07 | −0.08 | −0.09 | +0.02 | – | +0.00 |
| 54 | Brand | −0.02 | +0.02 | +0.02 | −0.07 | −0.09 | −0.04 | +0.00 |
| 55 | Anivia | −0.03 | +0.02 | −0.04 | −0.13 | −0.07 | +0.10 | +0.00 |
| 56 | Tahm Kench | −0.03 | −0.01 | −0.01 | −0.09 | −0.03 | – | +0.00 |
| 57 | Leona | −0.08 | −0.06 | −0.05 | −0.18 | −0.08 | – | +0.00 |
| 58 | Veigar | −0.09 | −0.04 | −0.11 | −0.26 | +0.04 | −0.10 | +0.00 |
| 59 | Cassiopeia | −0.10 | −0.15 | −0.05 | −0.21 | +0.01 | −0.07 | +0.00 |
| 60 | Vel'Koz | −0.17 | +0.11 | −0.02 | −1.00 | +0.02 | −0.02 | +0.00 |
| 61 | Lissandra | −0.19 | −0.19 | −0.10 | −0.59 | +0.08 | −0.08 | +0.00 |
| 62 | Karthus | −0.20 | −0.21 | −0.22 | −0.29 | −0.03 | −0.28 | +0.00 |
| 63 | Ahri | −0.22 | −0.05 | −0.08 | −1.00 | +0.11 | −0.08 | +0.00 |
| 64 | Nautilus | −0.29 | +0.12 | −0.07 | −1.00 | +0.00 | −1.00 | +0.00 |
| 65 | Vladimir | −0.30 | −0.11 | −0.11 | −0.53 | −0.26 | −1.00 | +0.00 |
| 66 | Ziggs | −0.45 | −0.01 | −1.00 | −1.00 | +0.07 | −0.11 | +0.00 |
| 67 | Skarner | −0.52 | −1.00 | +0.00 | −1.00 | −0.12 | – | +0.00 |
| 68 | Akali | −0.53 | −1.00 | −0.07 | −1.00 | −0.04 | – | +0.00 |
| 69 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 70 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 71 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 72 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Shen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +1.28)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Shen's Shadow Dash. Untargetable for 1.4 s; Shadow Dash takes 0.38 s to land, enough to react. (Maokai W Twisted Advance → Shen E Shadow Dash)
- **0.45** interrupt: Bramble Smash's airborne interrupts Shen's Stand United (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Shen R Stand United)
- **0.19** untargetable: Twisted Advance makes Maokai untargetable, dodging Shen's Twilight Assault. Untargetable for 1.4 s; Twilight Assault lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Shen Q Twilight Assault)
- Watch out: Spirit's Refuge blocks Maokai's basic attacks (with Sap Magic).

#### 2. Nocturne (net +1.11)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Shen's Shadow Dash. Spell shield for 1.5 s, long enough to use ahead of Shadow Dash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Shen E Shadow Dash)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Shen's Stand United (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Shen R Stand United)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Shen's Twilight Assault. Spell shield for 1.5 s, long enough to use ahead of Twilight Assault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Shen Q Twilight Assault)
- Watch out: Spirit's Refuge blocks Nocturne's basic attacks (with Umbra Blades).

#### 3. Cassiopeia (net +1.08)

- **0.48** grounding: Miasma grounds Shen, who then can't cast Shadow Dash. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Shen E Shadow Dash)
- **0.45** interrupt: Petrifying Gaze's stun interrupts Shen's Stand United (movement channel). Petrifying Gaze must land during the channel. (Cassiopeia R Petrifying Gaze → Shen R Stand United)
- **0.43** grounding: Miasma grounds Shen, who then can't cast Stand United. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Cassiopeia's basic attacks.

#### 4. Rell (net +1.07)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Shen's Stand United (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Shen R Stand United)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Shen's Stand United (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Shen R Stand United)
- **0.45** interrupt: Full Tilt's stun interrupts Shen's Stand United (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Rell's Ferromancy: Mount Up, an empowered attack.

#### 5. Malzahar (net +1.07)

- **0.50** cc immunity: Void Shift makes Malzahar immune to Shen's Shadow Dash (taunt). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Shen E Shadow Dash)
- **0.45** interrupt: Call of the Void's silence interrupts Shen's Stand United (movement channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Shen R Stand United)
- **0.45** interrupt: Nether Grasp's suppression interrupts Shen's Stand United (movement channel). Nether Grasp must land during the channel. (Malzahar R Nether Grasp → Shen R Stand United)
- Watch out: Shadow Dash's taunt interrupts Malzahar's Nether Grasp (normal channel).

#### 6. Sejuani (net +1.02)

- **0.45** interrupt: Arctic Assault's airborne interrupts Shen's Stand United (movement channel). Arctic Assault must land during the channel. (Sejuani Q Arctic Assault → Shen R Stand United)
- **0.45** interrupt: Glacial Prison's stun interrupts Shen's Stand United (movement channel). Glacial Prison must land during the channel. (Sejuani R Glacial Prison → Shen R Stand United)
- **0.45** interrupt: Permafrost's airborne interrupts Shen's Stand United (movement channel). Permafrost must land during the channel. (Sejuani E Permafrost → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Sejuani's basic attacks (with Fury of the North).

#### 7. Lulu (net +0.96)

- **0.45** interrupt: Whimsy's polymorph interrupts Shen's Stand United (movement channel). Whimsy must land during the channel. (Lulu W Whimsy → Shen R Stand United)
- **0.45** interrupt: Wild Growth's airborne interrupts Shen's Stand United (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Shen R Stand United)
- **0.36** disarm: Whimsy disarms Shen for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Shen basic attacks)
- Watch out: Spirit's Refuge blocks Lulu's basic attacks (with Pix, Faerie Companion).

#### 8. K'Sante (net +0.92)

- **0.45** interrupt: All Out's airborne interrupts Shen's Stand United (movement channel). All Out must land during the channel. (K'Sante R All Out → Shen R Stand United)
- **0.45** interrupt: Ntofo Strikes's airborne interrupts Shen's Stand United (movement channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Shen R Stand United)
- **0.45** interrupt: Path Maker's airborne interrupts Shen's Stand United (movement channel). Path Maker must land during the channel. (K'Sante W Path Maker → Shen R Stand United)
- Watch out: Spirit's Refuge blocks K'Sante's basic attacks (with Dauntless Instinct).

#### 9. Singed (net +0.89)

- **0.49** grounding: Mega Adhesive grounds Shen, who then can't cast Shadow Dash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Shen E Shadow Dash)
- **0.45** interrupt: Fling's airborne interrupts Shen's Stand United (movement channel). Fling must land during the channel. (Singed E Fling → Shen R Stand United)
- **0.44** grounding: Mega Adhesive grounds Shen, who then can't cast Stand United. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Shen R Stand United)
- Watch out: Spirit's Refuge blocks Singed's basic attacks.

#### 10. Heimerdinger (net +0.88)

- **0.45** interrupt: CH-2 Electron Storm Grenade's stun interrupts Shen's Stand United (movement channel). CH-2 Electron Storm Grenade must land during the channel. (Heimerdinger E CH-2 Electron Storm Grenade → Shen R Stand United)
- **0.45** interrupt: CH-3X Lightning Grenade's stun interrupts Shen's Stand United (movement channel). CH-3X Lightning Grenade must land during the channel. (Heimerdinger E CH-3X Lightning Grenade → Shen R Stand United)
- **0.13** range: Heimerdinger's basic attacks reach 425 units farther than Shen's (550 vs 125 attack range). Shen closes the gap with Shadow Dash, Stand United. (Heimerdinger basic attacks → Shen basic attacks)
- Watch out: Spirit's Refuge blocks Heimerdinger's basic attacks.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.28 | 1.55 | 0.27 |  |
| 2 | Nocturne | +1.11 | 1.50 | 0.39 |  |
| 3 | Cassiopeia | +1.08 | 1.30 | 0.22 | grounding (Miasma), grounding (Miasma) |
| 4 | Rell | +1.07 | 2.25 | 1.18 |  |
| 5 | Malzahar | +1.07 | 1.69 | 0.62 |  |
| 6 | Sejuani | +1.02 | 1.35 | 0.33 |  |
| 7 | Lulu | +0.96 | 1.32 | 0.36 |  |
| 8 | K'Sante | +0.92 | 1.35 | 0.43 |  |
| 9 | Singed | +0.89 | 1.16 | 0.27 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 10 | Heimerdinger | +0.88 | 1.08 | 0.20 |  |
| 11 | Viktor | +0.85 | 1.34 | 0.49 | dash stop (Gravity Field) |
| 12 | Milio | +0.83 | 1.22 | 0.39 |  |
| 13 | Nami | +0.83 | 1.05 | 0.22 |  |
| 14 | Anivia | +0.82 | 1.06 | 0.24 |  |
| 15 | Kled | +0.80 | 1.22 | 0.42 |  |
| 16 | Seraphine | +0.80 | 1.09 | 0.29 |  |
| 17 | Sion | +0.79 | 1.19 | 0.40 |  |
| 18 | Thresh | +0.79 | 1.03 | 0.24 |  |
| 19 | Taliyah | +0.78 | 1.53 | 0.75 |  |
| 20 | Alistar | +0.78 | 1.30 | 0.52 |  |
| 21 | Gnar | +0.78 | 1.12 | 0.34 |  |
| 22 | Fizz | +0.77 | 1.56 | 0.79 |  |
| 23 | Renata Glasc | +0.77 | 1.16 | 0.39 |  |
| 24 | Aurelion Sol | +0.75 | 1.05 | 0.30 |  |
| 25 | Amumu | +0.75 | 1.02 | 0.27 |  |
| 26 | Braum | +0.74 | 1.07 | 0.33 |  |
| 27 | Vladimir | +0.73 | 1.03 | 0.30 |  |
| 28 | Rammus | +0.72 | 1.28 | 0.56 |  |
| 29 | Lissandra | +0.72 | 0.94 | 0.22 |  |
| 30 | Morgana | +0.71 | 0.95 | 0.24 |  |
| 31 | Zaahen | +0.70 | 1.40 | 0.70 |  |
| 32 | Rakan | +0.69 | 0.98 | 0.29 |  |
| 33 | Sivir | +0.66 | 1.17 | 0.51 |  |
| 34 | Poppy | +0.66 | 1.13 | 0.47 | dash stop (Steadfast Presence) |
| 35 | Rek'Sai | +0.66 | 1.03 | 0.37 |  |
| 36 | Hwei | +0.65 | 0.88 | 0.23 | dash stop (Grim Visage) |
| 37 | Camille | +0.63 | 1.18 | 0.55 |  |
| 38 | Ornn | +0.63 | 0.90 | 0.27 |  |
| 39 | Urgot | +0.62 | 1.00 | 0.38 |  |
| 40 | Blitzcrank | +0.61 | 1.35 | 0.74 |  |
| 41 | Yasuo | +0.61 | 1.03 | 0.42 |  |
| 42 | Bard | +0.61 | 1.00 | 0.39 |  |
| 43 | Cho'Gath | +0.61 | 0.90 | 0.29 |  |
| 44 | Leona | +0.61 | 0.90 | 0.29 |  |
| 45 | Ahri | +0.61 | 0.83 | 0.22 | dash stop (Charm) |
| 46 | Veigar | +0.58 | 0.82 | 0.24 | dash stop (Event Horizon) |
| 47 | Tahm Kench | +0.56 | 1.35 | 0.79 |  |
| 48 | Yone | +0.56 | 1.02 | 0.46 |  |
| 49 | Vex | +0.56 | 0.83 | 0.27 |  |
| 50 | Mordekaiser | +0.54 | 0.87 | 0.33 |  |
| 51 | Udyr | +0.53 | 1.25 | 0.72 |  |
| 52 | Yuumi | +0.51 | 1.35 | 0.84 |  |
| 53 | Riven | +0.51 | 0.90 | 0.39 |  |
| 54 | Teemo | +0.51 | 0.87 | 0.36 | blind (Blinding Dart) |
| 55 | Galio | +0.49 | 1.35 | 0.86 |  |
| 56 | Sett | +0.49 | 0.90 | 0.41 |  |
| 57 | Pyke | +0.46 | 0.90 | 0.44 |  |
| 58 | Fiora | +0.45 | 0.98 | 0.53 |  |
| 59 | Gwen | +0.45 | 0.81 | 0.36 |  |
| 60 | Kalista | +0.43 | 0.86 | 0.43 |  |
| 61 | Xayah | +0.43 | 0.82 | 0.39 |  |
| 62 | Aurora | +0.42 | 0.71 | 0.29 |  |
| 63 | Zac | +0.40 | 1.63 | 1.23 | dash stop (Stretching Strikes) |
| 64 | Nilah | +0.40 | 1.00 | 0.60 |  |
| 65 | Evelynn | +0.40 | 0.99 | 0.59 |  |
| 66 | Jinx | +0.40 | 0.69 | 0.29 | dash stop (Flame Chompers!) |
| 67 | Janna | +0.38 | 1.14 | 0.76 |  |
| 68 | Annie | +0.38 | 0.60 | 0.22 |  |
| 69 | Brand | +0.38 | 0.60 | 0.22 |  |
| 70 | Neeko | +0.38 | 0.60 | 0.22 |  |
| 71 | Syndra | +0.38 | 0.60 | 0.22 |  |
| 72 | Swain | +0.38 | 0.59 | 0.21 |  |
| 73 | Zyra | +0.37 | 0.61 | 0.24 |  |
| 74 | Orianna | +0.36 | 0.63 | 0.27 |  |
| 75 | Soraka | +0.36 | 0.63 | 0.27 |  |
| 76 | Ziggs | +0.36 | 0.63 | 0.27 |  |
| 77 | Corki | +0.35 | 0.65 | 0.30 |  |
| 78 | Kennen | +0.35 | 0.64 | 0.29 |  |
| 79 | Zilean | +0.34 | 0.67 | 0.33 |  |
| 80 | Zoe | +0.34 | 0.67 | 0.33 |  |
| 81 | Ashe | +0.33 | 0.69 | 0.36 |  |
| 82 | Xin Zhao | +0.32 | 1.04 | 0.72 |  |
| 83 | Kayn | +0.30 | 0.99 | 0.69 |  |
| 84 | Sona | +0.30 | 0.72 | 0.42 |  |
| 85 | Lillia | +0.30 | 0.52 | 0.22 |  |
| 86 | Gragas | +0.27 | 0.90 | 0.63 |  |
| 87 | Gangplank | +0.25 | 0.69 | 0.44 |  |
| 88 | Zed | +0.23 | 0.52 | 0.29 |  |
| 89 | Elise | +0.22 | 0.67 | 0.45 |  |
| 90 | Tristana | +0.21 | 0.69 | 0.48 |  |
| 91 | Ambessa | +0.20 | 0.45 | 0.25 |  |
| 92 | Jax | +0.18 | 0.74 | 0.56 | attack dodge (Counter Strike) |
| 93 | Skarner | +0.18 | 0.51 | 0.33 |  |
| 94 | Diana | +0.18 | 0.45 | 0.27 |  |
| 95 | Lee Sin | +0.18 | 0.45 | 0.27 |  |
| 96 | Fiddlesticks | +0.17 | 1.03 | 0.86 |  |
| 97 | Jayce | +0.16 | 0.65 | 0.49 |  |
| 98 | Shyvana | +0.16 | 0.45 | 0.29 |  |
| 99 | Sylas | +0.16 | 0.45 | 0.29 |  |
| 100 | Malphite | +0.15 | 0.70 | 0.55 |  |
| 101 | Qiyana | +0.15 | 0.45 | 0.30 |  |
| 102 | Garen | +0.13 | 0.76 | 0.63 |  |
| 103 | Vayne | +0.13 | 0.74 | 0.61 |  |
| 104 | Quinn | +0.13 | 0.71 | 0.58 |  |
| 105 | Olaf | +0.12 | 0.51 | 0.39 |  |
| 106 | Nautilus | +0.12 | 0.45 | 0.33 |  |
| 107 | Draven | +0.11 | 0.69 | 0.58 |  |
| 108 | Jarvan IV | +0.09 | 0.45 | 0.36 |  |
| 109 | Rengar | +0.08 | 0.83 | 0.75 |  |
| 110 | Vel'Koz | +0.08 | 0.63 | 0.55 |  |
| 111 | Kayle | +0.08 | 0.53 | 0.45 |  |
| 112 | Kassadin | +0.07 | 0.45 | 0.38 |  |
| 113 | Aatrox | +0.06 | 0.45 | 0.39 |  |
| 114 | Taric | +0.06 | 0.45 | 0.39 |  |
| 115 | Master Yi | +0.05 | 0.88 | 0.83 |  |
| 116 | Xerath | +0.04 | 0.63 | 0.59 |  |
| 117 | Azir | +0.03 | 0.63 | 0.60 |  |
| 118 | Shaco | +0.02 | 0.99 | 0.97 |  |
| 119 | Mel | -0.02 | 0.25 | 0.27 |  |
| 120 | Viego | -0.06 | 0.96 | 1.02 |  |
| 121 | Vi | -0.06 | 0.90 | 0.96 |  |
| 122 | Trundle | -0.06 | 0.45 | 0.51 |  |
| 123 | Samira | -0.06 | 0.27 | 0.33 |  |
| 124 | Darius | -0.07 | 0.45 | 0.52 |  |
| 125 | Karma | -0.07 | 0.15 | 0.22 |  |
| 126 | LeBlanc | -0.07 | 0.15 | 0.22 |  |
| 127 | Nidalee | -0.10 | 0.20 | 0.30 |  |
| 128 | Lux | -0.10 | 0.19 | 0.29 |  |
| 129 | Yorick | -0.11 | 0.45 | 0.56 |  |
| 130 | Hecarim | -0.12 | 0.45 | 0.57 |  |
| 131 | Nasus | -0.12 | 0.39 | 0.51 |  |
| 132 | Yunara | -0.12 | 0.24 | 0.36 |  |
| 133 | Kai'Sa | -0.13 | 0.26 | 0.39 |  |
| 134 | Twitch | -0.14 | 0.29 | 0.43 |  |
| 135 | Graves | -0.17 | 0.16 | 0.33 |  |
| 136 | Briar | -0.20 | 0.45 | 0.65 |  |
| 137 | Kindred | -0.20 | 0.31 | 0.51 |  |
| 138 | Smolder | -0.20 | 0.22 | 0.42 |  |
| 139 | Wukong | -0.23 | 0.45 | 0.68 |  |
| 140 | Ivern | -0.24 | 0.13 | 0.37 |  |
| 141 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 142 | Nunu & Willump | -0.25 | 0.51 | 0.76 |  |
| 143 | Bel'Veth | -0.25 | 0.45 | 0.70 |  |
| 144 | Senna | -0.26 | 0.22 | 0.48 |  |
| 145 | Irelia | -0.27 | 0.48 | 0.75 |  |
| 146 | Akali | -0.29 | 0.00 | 0.29 |  |
| 147 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 148 | Ezreal | -0.31 | 0.22 | 0.53 |  |
| 149 | Renekton | -0.34 | 0.45 | 0.79 |  |
| 150 | Twisted Fate | -0.36 | 0.74 | 1.10 |  |
| 151 | Talon | -0.36 | 0.00 | 0.36 |  |
| 152 | Karthus | -0.39 | 0.13 | 0.52 |  |
| 153 | Caitlyn | -0.40 | 0.24 | 0.64 |  |
| 154 | Kog'Maw | -0.42 | 0.18 | 0.60 |  |
| 155 | Lucian | -0.43 | 0.24 | 0.67 |  |
| 156 | Ryze | -0.43 | 0.16 | 0.59 |  |
| 157 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 158 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 159 | Aphelios | -0.44 | 0.31 | 0.75 |  |
| 160 | Dr. Mundo | -0.51 | 0.00 | 0.51 |  |
| 161 | Varus | -0.52 | 0.18 | 0.70 |  |
| 162 | Jhin | -0.54 | 0.18 | 0.72 |  |
| 163 | Miss Fortune | -0.55 | 0.22 | 0.77 |  |
| 164 | Zeri | -0.57 | 0.29 | 0.86 |  |
| 165 | Locke | -0.60 | 0.00 | 0.60 |  |
| 166 | Katarina | -0.61 | 0.00 | 0.61 |  |
| 167 | Naafiri | -0.74 | 0.00 | 0.74 |  |
| 168 | Volibear | -0.76 | 0.45 | 1.21 |  |
| 169 | Warwick | -0.82 | 1.23 | 2.05 |  |
| 170 | Ekko | -0.83 | 0.00 | 0.83 |  |
| 171 | Akshan | -0.84 | 0.22 | 1.06 |  |
| 172 | Pantheon | -0.98 | 0.44 | 1.42 |  |
