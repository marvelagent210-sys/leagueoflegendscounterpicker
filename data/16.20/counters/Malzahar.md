# Counters to Malzahar (patch 26.20)

## Simulated duels

The duel simulator played each of the 75 other champions with a simulator kit against Malzahar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Malzahar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Malzahar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +1.00 |
| 2 | Gangplank | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 3 | Olaf | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 4 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +1.00 |
| 5 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 6 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 7 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 8 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 9 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 10 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 11 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 12 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 13 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 14 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 15 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 16 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 17 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 18 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 19 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 20 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 21 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 22 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 23 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 24 | Ambessa | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 25 | Aatrox | +0.78 | +1.00 | +0.96 | +1.00 | −0.04 | +1.00 | +0.00 |
| 26 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 27 | Volibear | +0.78 | +1.00 | +0.96 | +1.00 | −0.06 | +1.00 | +0.00 |
| 28 | Singed | +0.75 | +1.00 | +1.00 | +1.00 | −0.31 | +1.00 | +0.00 |
| 29 | Vayne | +0.75 | +0.95 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 30 | Xin Zhao | +0.75 | +0.76 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 31 | Heimerdinger | +0.75 | +1.00 | +0.88 | +1.00 | +0.00 | – | +0.00 |
| 32 | Illaoi | +0.74 | +0.93 | +0.99 | +1.00 | −0.03 | +0.59 | +0.00 |
| 33 | Kled | +0.73 | +1.00 | +1.00 | +1.00 | +0.08 | +0.22 | +0.00 |
| 34 | Mordekaiser | +0.69 | +0.92 | +1.00 | +0.81 | −0.00 | +0.44 | +0.00 |
| 35 | Amumu | +0.68 | +0.75 | +0.89 | +1.00 | −0.06 | +0.84 | +0.00 |
| 36 | Yasuo | +0.66 | +0.90 | +0.99 | +0.93 | −0.02 | +0.00 | +0.00 |
| 37 | Darius | +0.58 | +1.00 | +0.18 | +1.00 | −0.06 | +1.00 | +0.00 |
| 38 | Lissandra | +0.57 | +0.95 | +0.30 | +1.00 | −0.02 | – | +0.00 |
| 39 | Ornn | +0.54 | +0.96 | +0.05 | +1.00 | −0.03 | +0.94 | +0.00 |
| 40 | Skarner | +0.45 | +0.97 | +0.53 | +0.14 | −0.03 | +0.51 | +0.00 |
| 41 | Rammus | +0.35 | +0.84 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 42 | Master Yi | +0.35 | +0.00 | +1.00 | +0.00 | −0.00 | +1.00 | +0.00 |
| 43 | Ashe | +0.35 | +1.00 | +0.77 | −1.00 | +0.09 | +0.93 | +0.00 |
| 44 | Aurora | +0.34 | +1.00 | +1.00 | −0.99 | +0.03 | – | +0.00 |
| 45 | Nautilus | +0.17 | +0.15 | +0.12 | +0.00 | +0.06 | +0.94 | +0.00 |
| 46 | Tahm Kench | +0.17 | +0.22 | +0.21 | +0.23 | −0.07 | +0.23 | +0.00 |
| 47 | Warwick | +0.04 | −1.00 | +0.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 48 | Wukong | +0.03 | +0.00 | −1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 49 | Anivia | +0.03 | +0.08 | +0.10 | −0.00 | −0.09 | −0.06 | +0.00 |
| 50 | Karthus | +0.02 | +0.05 | +0.03 | +0.01 | −0.00 | – | +0.00 |
| 51 | Shen | +0.00 | −0.05 | +0.04 | +0.07 | +0.00 | −0.08 | +0.00 |
| 52 | Gragas | −0.00 | −0.04 | −0.02 | +0.08 | −0.07 | +0.08 | +0.00 |
| 53 | Sett | −0.04 | +0.04 | +0.11 | −0.84 | −0.04 | +1.00 | +0.00 |
| 54 | Akali | −0.05 | −0.06 | −0.59 | +1.00 | −0.05 | −0.77 | +0.00 |
| 55 | Yone | −0.05 | −0.50 | −0.09 | +0.02 | −0.03 | +1.00 | +0.00 |
| 56 | Irelia | −0.14 | −0.51 | −0.94 | +1.00 | +0.00 | +0.18 | +0.00 |
| 57 | Camille | −0.16 | −1.00 | −0.82 | +1.00 | +0.00 | +1.00 | +0.00 |
| 58 | Sion | −0.16 | −0.17 | −0.05 | −1.00 | −0.04 | +0.98 | +0.00 |
| 59 | Urgot | −0.22 | −1.00 | −1.00 | +0.94 | −0.04 | +1.00 | +0.00 |
| 60 | Kennen | −0.23 | +0.99 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 61 | Leona | −0.24 | +0.21 | −0.00 | −1.00 | −0.01 | −0.94 | +0.00 |
| 62 | Kassadin | −0.27 | −1.00 | −0.08 | +0.00 | −0.02 | +0.00 | +0.00 |
| 63 | Zyra | −0.29 | −0.08 | −1.00 | +0.02 | +0.02 | – | +0.00 |
| 64 | Ziggs | −0.31 | −1.00 | −1.00 | +1.00 | +0.13 | – | +0.00 |
| 65 | Morgana | −0.33 | −1.00 | −1.00 | +1.00 | +0.03 | – | +0.00 |
| 66 | Lux | −0.33 | −1.00 | −1.00 | +1.00 | +0.02 | – | +0.00 |
| 67 | Brand | −0.33 | −1.00 | −1.00 | +1.00 | −0.00 | – | +0.00 |
| 68 | Pantheon | −0.35 | +0.00 | −1.00 | −1.00 | +0.00 | +1.00 | +0.00 |
| 69 | Veigar | −0.58 | −1.00 | −1.00 | −0.08 | −0.01 | – | +0.00 |
| 70 | Vel'Koz | −0.61 | −1.00 | −0.45 | −1.00 | +0.11 | – | +0.00 |
| 71 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 72 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 73 | Teemo | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 74 | Quinn | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 75 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Malzahar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Malzahar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Malzahar` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.78)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Nether Grasp. Untargetable for 2 s, long enough to use ahead of Nether Grasp. (Vladimir W Sanguine Pool → Malzahar R Nether Grasp)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Malefic Visions. Untargetable for 2 s, long enough to use ahead of Malefic Visions. (Vladimir W Sanguine Pool → Malzahar E Malefic Visions)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Call of the Void. Untargetable for 2 s, long enough to use ahead of Call of the Void. (Vladimir W Sanguine Pool → Malzahar Q Call of the Void)
- Watch out: Call of the Void's silence interrupts Vladimir's Tides of Blood (charge-up).

#### 2. Kayle (net +0.69)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Malzahar's Nether Grasp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nether Grasp. (Kayle R Divine Judgment → Malzahar R Nether Grasp)
- **0.22** range: Kayle's basic attacks reach 125 units farther than Malzahar's (625 vs 500 attack range). Malzahar has no dash or blink to close the gap. (Kayle basic attacks → Malzahar basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Malzahar's Malefic Visions. Invulnerable for 2.5 s, long enough to use ahead of Malefic Visions. (Kayle R Divine Judgment → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Kayle's Radiant Blast (slow).

#### 3. Rell (net +0.66)

- **0.40** interrupt: Ferromancy: Crash Down's airborne interrupts Malzahar's Nether Grasp (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Malzahar R Nether Grasp)
- **0.40** interrupt: Ferromancy: Mount Up's airborne interrupts Malzahar's Nether Grasp (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Malzahar R Nether Grasp)
- **0.40** interrupt: Full Tilt's stun interrupts Malzahar's Nether Grasp (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Malzahar R Nether Grasp)
- Watch out: Void Shift makes Malzahar immune to Rell's Ferromancy: Crash Down (airborne, stun).

#### 4. Rek'Sai (net +0.64)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Malzahar's Nether Grasp. Untargetable for 1.5 s, long enough to use ahead of Nether Grasp. (Rek'Sai R Void Rush → Malzahar R Nether Grasp)
- **0.40** interrupt: Unburrow's airborne interrupts Malzahar's Nether Grasp (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Malzahar R Nether Grasp)
- **0.20** untargetable: Void Rush makes Rek'Sai untargetable, dodging Malzahar's Call of the Void. Untargetable for 1.5 s, long enough to use ahead of Call of the Void. (Rek'Sai R Void Rush → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Rek'Sai's Unburrow (airborne).

#### 5. Sivir (net +0.61)

- **0.40** spell shield: Spell Shield's spell shield blocks part of Malzahar's Nether Grasp. Spell shield for 1.5 s, long enough to use ahead of Nether Grasp. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents both the tether and the Null Zone from appearing, however Malzahar will continue to channel. [https://www.reddit.com/r/Sivir/comments/g7yt38/if_you_shield_malzahar_ult_he_ironically_gets_ccd/]. (Sivir E Spell Shield → Malzahar R Nether Grasp)
- **0.28** spell shield: Spell Shield's spell shield blocks Malzahar's Malefic Visions. Spell shield for 1.5 s, long enough to use ahead of Malefic Visions. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malzahar E Malefic Visions)
- **0.27** spell shield: Spell Shield's spell shield blocks Malzahar's Call of the Void. Spell shield for 1.5 s, long enough to use ahead of Call of the Void. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malzahar Q Call of the Void)

#### 6. Milio (net +0.60)

- **0.49** cleanse: Breath of Life cleanses Malzahar's Nether Grasp (suppression) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Malzahar R Nether Grasp)
- **0.40** interrupt: Ultra Mega Fire Kick's airborne interrupts Malzahar's Nether Grasp (normal channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Malzahar R Nether Grasp)
- **0.09** cleanse: Breath of Life cleanses Malzahar's Call of the Void (silence) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

#### 7. Zaahen (net +0.52)

- **0.48** cc immunity: Grim Deliverance makes Zaahen immune to Malzahar's Nether Grasp (knockdown, suppression). Immune for ?; Nether Grasp lands within 0.01 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Malzahar R Nether Grasp)
- **0.40** interrupt: Dreaded Return's airborne interrupts Malzahar's Nether Grasp (normal channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Malzahar R Nether Grasp)
- **0.40** interrupt: The Darkin Glaive's airborne interrupts Malzahar's Nether Grasp (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Malzahar R Nether Grasp)
- Watch out: Void Shift makes Malzahar immune to Zaahen's Dreaded Return (airborne, stun).

#### 8. Xayah (net +0.50)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Nether Grasp. Untargetable for 1.5 s, long enough to use ahead of Nether Grasp. (Xayah R Featherstorm → Malzahar R Nether Grasp)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Call of the Void. Untargetable for 1.5 s, long enough to use ahead of Call of the Void. (Xayah R Featherstorm → Malzahar Q Call of the Void)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Malefic Visions. Untargetable for 1.5 s, long enough to use ahead of Malefic Visions. (Xayah R Featherstorm → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Xayah's Bladecaller (root).

#### 9. Nocturne (net +0.48)

- **0.40** interrupt: Unspeakable Horror's fear interrupts Malzahar's Nether Grasp (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Malzahar R Nether Grasp)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Malzahar's Nether Grasp. Spell shield for 1.5 s, long enough to use ahead of Nether Grasp. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents both the tether and the Null Zone from appearing, however Malzahar will continue to channel. [https://www.reddit.com/r/Sivir/comments/g7yt38/if_you_shield_malzahar_ult_he_ironically_gets_ccd/]. (Nocturne W Shroud of Darkness → Malzahar R Nether Grasp)
- **0.34** spell shield: Shroud of Darkness's spell shield blocks Malzahar's Malefic Visions. Spell shield for 1.5 s, long enough to use ahead of Malefic Visions. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Nocturne's Unspeakable Horror (fear, slow).

#### 10. Lissandra (net +0.48)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malzahar's Nether Grasp. Untargetable for 2.5 s, long enough to use ahead of Nether Grasp. (Lissandra R Frozen Tomb → Malzahar R Nether Grasp)
- **0.40** interrupt: Frozen Tomb's stun interrupts Malzahar's Nether Grasp (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Malzahar R Nether Grasp)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malzahar's Call of the Void. Untargetable for 2.5 s, long enough to use ahead of Call of the Void. (Lissandra R Frozen Tomb → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Lissandra's Frozen Tomb (knockdown, slow, stun).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.78 | 1.02 | 0.24 |  |
| 2 | Kayle | +0.69 | 0.75 | 0.06 |  |
| 3 | Rell | +0.66 | 2.00 | 1.34 |  |
| 4 | Rek'Sai | +0.64 | 1.36 | 0.72 |  |
| 5 | Sivir | +0.61 | 0.61 | 0.00 |  |
| 6 | Milio | +0.60 | 0.95 | 0.35 |  |
| 7 | Zaahen | +0.52 | 1.34 | 0.82 |  |
| 8 | Xayah | +0.50 | 0.85 | 0.35 |  |
| 9 | Nocturne | +0.48 | 1.10 | 0.62 |  |
| 10 | Lissandra | +0.48 | 1.08 | 0.60 |  |
| 11 | Alistar | +0.43 | 1.49 | 1.06 |  |
| 12 | Lulu | +0.42 | 0.91 | 0.49 |  |
| 13 | Morgana | +0.40 | 0.89 | 0.49 |  |
| 14 | Bard | +0.39 | 1.08 | 0.69 |  |
| 15 | Olaf | +0.39 | 0.86 | 0.47 |  |
| 16 | Anivia | +0.38 | 0.92 | 0.54 |  |
| 17 | Fizz | +0.37 | 1.19 | 0.82 |  |
| 18 | Viktor | +0.36 | 0.80 | 0.44 |  |
| 19 | Zed | +0.36 | 0.57 | 0.21 |  |
| 20 | Udyr | +0.32 | 1.07 | 0.75 |  |
| 21 | Evelynn | +0.31 | 1.03 | 0.72 |  |
| 22 | Shaco | +0.31 | 1.03 | 0.72 |  |
| 23 | Heimerdinger | +0.28 | 0.80 | 0.52 |  |
| 24 | Annie | +0.26 | 0.54 | 0.28 |  |
| 25 | Gwen | +0.24 | 0.69 | 0.45 |  |
| 26 | Sion | +0.22 | 1.43 | 1.21 |  |
| 27 | Blitzcrank | +0.22 | 1.20 | 0.98 |  |
| 28 | Gangplank | +0.20 | 0.71 | 0.51 |  |
| 29 | Fiora | +0.18 | 0.81 | 0.63 |  |
| 30 | Nami | +0.18 | 0.75 | 0.57 |  |
| 31 | Aurora | +0.18 | 0.58 | 0.40 |  |
| 32 | Master Yi | +0.17 | 0.69 | 0.52 |  |
| 33 | Ashe | +0.16 | 0.58 | 0.42 |  |
| 34 | Maokai | +0.15 | 1.15 | 1.00 |  |
| 35 | Seraphine | +0.15 | 0.72 | 0.57 |  |
| 36 | Renata Glasc | +0.14 | 0.73 | 0.59 |  |
| 37 | Vex | +0.14 | 0.45 | 0.31 |  |
| 38 | K'Sante | +0.12 | 1.25 | 1.13 |  |
| 39 | Tristana | +0.12 | 0.71 | 0.59 |  |
| 40 | Kennen | +0.12 | 0.40 | 0.28 |  |
| 41 | Braum | +0.11 | 1.06 | 0.95 |  |
| 42 | Kalista | +0.07 | 0.69 | 0.62 |  |
| 43 | Draven | +0.05 | 0.40 | 0.35 |  |
| 44 | Veigar | +0.05 | 0.40 | 0.35 |  |
| 45 | Zoe | +0.05 | 0.40 | 0.35 |  |
| 46 | Yasuo | +0.04 | 1.04 | 1.00 |  |
| 47 | Kassadin | +0.04 | 0.40 | 0.36 |  |
| 48 | Teemo | +0.03 | 0.29 | 0.26 |  |
| 49 | Syndra | +0.02 | 0.40 | 0.38 |  |
| 50 | Zilean | +0.02 | 0.40 | 0.38 |  |
| 51 | Xin Zhao | +0.01 | 0.99 | 0.98 |  |
| 52 | Brand | +0.01 | 0.40 | 0.39 |  |
| 53 | Soraka | +0.01 | 0.40 | 0.39 |  |
| 54 | Swain | 0.00 | 0.40 | 0.40 |  |
| 55 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 56 | Kled | -0.03 | 1.00 | 1.03 |  |
| 57 | Garen | -0.03 | 0.47 | 0.50 |  |
| 58 | Orianna | -0.03 | 0.40 | 0.43 |  |
| 59 | Gnar | -0.04 | 0.80 | 0.84 |  |
| 60 | Cho'Gath | -0.05 | 0.80 | 0.85 |  |
| 61 | Sona | -0.05 | 0.35 | 0.40 |  |
| 62 | Sett | -0.06 | 0.83 | 0.89 |  |
| 63 | Thresh | -0.06 | 0.80 | 0.86 |  |
| 64 | Kog'Maw | -0.06 | 0.00 | 0.06 |  |
| 65 | Cassiopeia | -0.07 | 0.40 | 0.47 |  |
| 66 | Sejuani | -0.08 | 1.17 | 1.25 |  |
| 67 | Elise | -0.08 | 0.40 | 0.48 |  |
| 68 | Yunara | -0.09 | 0.14 | 0.23 |  |
| 69 | Camille | -0.10 | 1.11 | 1.21 |  |
| 70 | Corki | -0.10 | 0.40 | 0.50 |  |
| 71 | Smolder | -0.10 | 0.00 | 0.10 |  |
| 72 | Zyra | -0.11 | 0.46 | 0.57 |  |
| 73 | Jayce | -0.12 | 0.40 | 0.52 |  |
| 74 | Yuumi | -0.13 | 0.82 | 0.95 |  |
| 75 | Nidalee | -0.13 | 0.00 | 0.13 |  |
| 76 | Urgot | -0.14 | 0.80 | 0.94 |  |
| 77 | Aurelion Sol | -0.15 | 0.75 | 0.90 |  |
| 78 | Nilah | -0.15 | 0.60 | 0.75 |  |
| 79 | Vayne | -0.17 | 0.40 | 0.57 |  |
| 80 | Mel | -0.17 | 0.18 | 0.35 |  |
| 81 | Twitch | -0.17 | 0.00 | 0.17 |  |
| 82 | Hwei | -0.20 | 0.40 | 0.60 |  |
| 83 | Kindred | -0.20 | 0.00 | 0.20 |  |
| 84 | Yone | -0.21 | 0.85 | 1.06 |  |
| 85 | Jax | -0.22 | 0.52 | 0.74 |  |
| 86 | Zeri | -0.22 | 0.00 | 0.22 |  |
| 87 | Malphite | -0.24 | 0.52 | 0.76 |  |
| 88 | Samira | -0.24 | 0.19 | 0.43 |  |
| 89 | Nasus | -0.25 | 0.22 | 0.47 |  |
| 90 | Rengar | -0.26 | 0.72 | 0.98 |  |
| 91 | Azir | -0.26 | 0.37 | 0.63 |  |
| 92 | Ziggs | -0.27 | 0.40 | 0.67 |  |
| 93 | Shyvana | -0.29 | 0.43 | 0.72 |  |
| 94 | Mordekaiser | -0.30 | 0.45 | 0.75 |  |
| 95 | Ahri | -0.30 | 0.40 | 0.70 |  |
| 96 | Neeko | -0.32 | 0.37 | 0.69 |  |
| 97 | Illaoi | -0.32 | 0.05 | 0.37 |  |
| 98 | Irelia | -0.33 | 0.40 | 0.73 |  |
| 99 | Taric | -0.33 | 0.40 | 0.73 |  |
| 100 | Senna | -0.33 | 0.16 | 0.49 |  |
| 101 | Rakan | -0.34 | 0.77 | 1.11 |  |
| 102 | Darius | -0.34 | 0.40 | 0.74 |  |
| 103 | Yorick | -0.34 | 0.40 | 0.74 |  |
| 104 | Lillia | -0.34 | 0.33 | 0.67 |  |
| 105 | Renekton | -0.35 | 0.40 | 0.75 |  |
| 106 | Trundle | -0.35 | 0.40 | 0.75 |  |
| 107 | Riven | -0.36 | 0.80 | 1.16 |  |
| 108 | Volibear | -0.37 | 0.45 | 0.82 |  |
| 109 | Bel'Veth | -0.38 | 0.40 | 0.78 |  |
| 110 | Kai'Sa | -0.38 | 0.00 | 0.38 |  |
| 111 | Lux | -0.38 | 0.00 | 0.38 |  |
| 112 | Diana | -0.39 | 0.40 | 0.79 |  |
| 113 | Jinx | -0.39 | 0.00 | 0.39 |  |
| 114 | Rammus | -0.41 | 1.02 | 1.43 |  |
| 115 | Amumu | -0.41 | 0.75 | 1.16 |  |
| 116 | Leona | -0.42 | 0.80 | 1.22 |  |
| 117 | Tryndamere | -0.42 | 0.00 | 0.42 |  |
| 118 | Tahm Kench | -0.43 | 1.20 | 1.63 |  |
| 119 | Kayn | -0.43 | 1.03 | 1.46 |  |
| 120 | Aatrox | -0.43 | 0.40 | 0.83 |  |
| 121 | Singed | -0.43 | 0.40 | 0.83 |  |
| 122 | LeBlanc | -0.44 | 0.00 | 0.44 |  |
| 123 | Lee Sin | -0.45 | 0.40 | 0.85 |  |
| 124 | Ambessa | -0.47 | 0.35 | 0.82 |  |
| 125 | Graves | -0.47 | 0.00 | 0.47 |  |
| 126 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 127 | Fiddlesticks | -0.49 | 0.80 | 1.29 |  |
| 128 | Karma | -0.49 | 0.00 | 0.49 |  |
| 129 | Pyke | -0.50 | 0.80 | 1.30 |  |
| 130 | Varus | -0.50 | 0.10 | 0.60 |  |
| 131 | Locke | -0.50 | 0.00 | 0.50 |  |
| 132 | Wukong | -0.51 | 0.37 | 0.88 |  |
| 133 | Rumble | -0.51 | 0.00 | 0.51 |  |
| 134 | Talon | -0.52 | 0.00 | 0.52 |  |
| 135 | Hecarim | -0.54 | 0.38 | 0.92 |  |
| 136 | Skarner | -0.55 | 0.37 | 0.92 |  |
| 137 | Quinn | -0.56 | 0.40 | 0.96 |  |
| 138 | Vel'Koz | -0.56 | 0.40 | 0.96 |  |
| 139 | Viego | -0.57 | 0.83 | 1.40 |  |
| 140 | Ekko | -0.58 | 0.00 | 0.58 |  |
| 141 | Aphelios | -0.59 | 0.00 | 0.59 |  |
| 142 | Sylas | -0.60 | 0.40 | 1.00 |  |
| 143 | Kha'Zix | -0.60 | 0.00 | 0.60 |  |
| 144 | Gragas | -0.62 | 0.80 | 1.42 |  |
| 145 | Xerath | -0.62 | 0.40 | 1.02 |  |
| 146 | Karthus | -0.62 | 0.00 | 0.62 |  |
| 147 | Miss Fortune | -0.62 | 0.00 | 0.62 |  |
| 148 | Zac | -0.64 | 1.17 | 1.81 |  |
| 149 | Janna | -0.64 | 0.75 | 1.39 |  |
| 150 | Jarvan IV | -0.64 | 0.40 | 1.04 |  |
| 151 | Akshan | -0.64 | 0.00 | 0.64 |  |
| 152 | Lucian | -0.64 | 0.00 | 0.64 |  |
| 153 | Nautilus | -0.65 | 0.40 | 1.05 |  |
| 154 | Twisted Fate | -0.65 | 0.40 | 1.05 |  |
| 155 | Katarina | -0.69 | 0.00 | 0.69 |  |
| 156 | Qiyana | -0.70 | 0.32 | 1.02 |  |
| 157 | Ornn | -0.71 | 0.80 | 1.51 |  |
| 158 | Akali | -0.71 | 0.00 | 0.71 |  |
| 159 | Briar | -0.74 | 0.40 | 1.14 |  |
| 160 | Caitlyn | -0.75 | 0.27 | 1.02 |  |
| 161 | Taliyah | -0.83 | 1.12 | 1.95 |  |
| 162 | Ivern | -0.85 | 0.00 | 0.85 |  |
| 163 | Warwick | -0.91 | 1.16 | 2.07 |  |
| 164 | Vi | -0.92 | 0.80 | 1.72 |  |
| 165 | Jhin | -0.96 | 0.00 | 0.96 |  |
| 166 | Poppy | -0.97 | 0.35 | 1.32 |  |
| 167 | Galio | -1.03 | 1.10 | 2.13 |  |
| 168 | Ryze | -1.05 | 0.00 | 1.05 |  |
| 169 | Pantheon | -1.06 | 0.58 | 1.64 |  |
| 170 | Shen | -1.07 | 0.62 | 1.69 |  |
| 171 | Naafiri | -1.38 | 0.00 | 1.38 |  |
| 172 | Nunu & Willump | -1.41 | 0.40 | 1.81 |  |
