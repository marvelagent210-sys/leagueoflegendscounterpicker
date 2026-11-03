# Counters to Caitlyn (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Caitlyn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Caitlyn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Caitlyn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Zeri | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 2 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +1.00 |
| 3 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 4 | Rengar | +0.84 | +1.00 | +1.00 | +0.99 | +0.33 | +0.87 | +0.00 |
| 5 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +1.00 |
| 6 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +1.00 |
| 7 | Ziggs | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 8 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 9 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 10 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 11 | Tahm Kench | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 12 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 13 | Ornn | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 14 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 15 | Orianna | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 16 | Taric | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 17 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 18 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 19 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 20 | Azir | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 21 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 22 | Nilah | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 23 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 24 | Vi | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 25 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 26 | Jarvan IV | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 27 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 28 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 29 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 30 | Darius | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 31 | Amumu | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 32 | Alistar | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 33 | Karma | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 34 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 35 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 36 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 37 | Zed | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 38 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 39 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 40 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 41 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 42 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 43 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 44 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 45 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 46 | Leona | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 47 | Skarner | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 48 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 49 | Jinx | +0.79 | +1.00 | +1.00 | +0.99 | −0.03 | +1.00 | +0.00 |
| 50 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 51 | Swain | +0.79 | +0.94 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 52 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 53 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 54 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 55 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 56 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 57 | Braum | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 58 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 59 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 60 | Lucian | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 61 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 62 | Galio | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +0.97 | +0.00 |
| 63 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 64 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 65 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 66 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 67 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 68 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +0.85 | +0.00 |
| 69 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 70 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 71 | Nautilus | +0.79 | +1.00 | +0.89 | +1.00 | +0.10 | +1.00 | +0.00 |
| 72 | Draven | +0.79 | +0.99 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 73 | Urgot | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 74 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 75 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 76 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 77 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 78 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 79 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 80 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 81 | Kayn | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 82 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 83 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 84 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 85 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 86 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 87 | Zac | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 88 | Singed | +0.78 | +1.00 | +0.91 | +1.00 | −0.01 | +1.00 | +0.00 |
| 89 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 90 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 91 | Yunara | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 92 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 93 | Sylas | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 94 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 95 | Tristana | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 96 | Kai'Sa | +0.75 | +0.89 | +0.95 | +1.00 | −0.03 | +1.00 | +0.00 |
| 97 | Talon | +0.74 | +0.91 | +1.00 | +0.88 | −0.06 | +1.00 | +0.00 |
| 98 | Quinn | +0.74 | +0.82 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 99 | Pantheon | +0.73 | +1.00 | +1.00 | +1.00 | −0.07 | +0.38 | +0.00 |
| 100 | Akshan | +0.72 | +0.86 | +0.86 | +1.00 | −0.07 | +1.00 | +0.00 |
| 101 | Riven | +0.72 | +1.00 | +0.66 | +1.00 | +0.02 | +1.00 | +0.00 |
| 102 | Irelia | +0.71 | +1.00 | +0.70 | +1.00 | −0.11 | +1.00 | +0.00 |
| 103 | Zilean | +0.71 | +1.00 | +1.00 | +0.55 | −0.03 | +1.00 | +0.00 |
| 104 | Yone | +0.70 | +0.49 | +1.00 | +1.00 | −0.16 | +1.00 | +1.00 |
| 105 | Jhin | +0.70 | +1.00 | +1.00 | +1.00 | −0.06 | +0.04 | +0.00 |
| 106 | Hecarim | +0.69 | +1.00 | +0.60 | +1.00 | −0.09 | +1.00 | +0.00 |
| 107 | Briar | +0.61 | +0.99 | +0.96 | +0.26 | −0.14 | +0.94 | +0.00 |
| 108 | Varus | +0.61 | +1.00 | +0.40 | +1.00 | −0.00 | – | +0.00 |
| 109 | Master Yi | +0.60 | +1.00 | +1.00 | +0.00 | −0.00 | +1.00 | +0.00 |
| 110 | Kindred | +0.57 | +0.78 | +0.33 | +1.00 | −0.04 | +1.00 | +0.00 |
| 111 | Kalista | +0.53 | +1.00 | −0.01 | +1.00 | −0.11 | +1.00 | +0.00 |
| 112 | Blitzcrank | +0.51 | +0.85 | −0.02 | +1.00 | +0.04 | +1.00 | +0.00 |
| 113 | Shaco | +0.48 | +1.00 | −0.28 | +1.00 | −0.01 | +1.00 | +0.00 |
| 114 | Aurora | +0.45 | +0.99 | +0.12 | +0.45 | −0.05 | +0.92 | +0.00 |
| 115 | Miss Fortune | +0.40 | +1.00 | +1.00 | −1.00 | −0.02 | +1.00 | +0.00 |
| 116 | Milio | +0.40 | +0.20 | +0.21 | +1.00 | +0.00 | +0.94 | +0.00 |
| 117 | Anivia | +0.39 | +0.35 | +0.32 | +1.00 | −0.09 | – | +0.00 |
| 118 | Sona | +0.39 | +1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 119 | Lillia | +0.36 | +0.16 | +0.15 | +0.94 | −0.02 | +1.00 | +0.00 |
| 120 | Morgana | +0.35 | +0.24 | +0.24 | +1.00 | −0.05 | +0.35 | +0.00 |
| 121 | Sion | +0.33 | +0.84 | +0.11 | +0.03 | −0.07 | +1.00 | +0.00 |
| 122 | Rakan | +0.30 | +1.00 | −0.96 | +1.00 | −0.03 | +1.00 | +0.00 |
| 123 | Naafiri | +0.30 | +1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 124 | Evelynn | +0.27 | +0.14 | −0.08 | +0.96 | +0.00 | +0.60 | +0.00 |
| 125 | Ekko | +0.26 | +1.00 | −0.99 | +1.00 | −0.02 | +0.56 | +0.00 |
| 126 | Hwei | +0.23 | −0.57 | +0.67 | +1.00 | −0.01 | +0.07 | +0.00 |
| 127 | Locke | +0.15 | −0.16 | −0.19 | +1.00 | −0.14 | +0.61 | +0.00 |
| 128 | Lux | +0.15 | +0.50 | −0.96 | +1.00 | −0.01 | +0.63 | +0.00 |
| 129 | Aphelios | +0.13 | −0.31 | −0.31 | +1.00 | −0.07 | +1.00 | +0.00 |
| 130 | Lissandra | +0.06 | +0.19 | −1.00 | +1.00 | +0.01 | +0.55 | +0.00 |
| 131 | Kha'Zix | −0.00 | +0.42 | −1.00 | +0.42 | −0.20 | +0.90 | +0.00 |
| 132 | Mel | −0.00 | −0.20 | −1.00 | +1.00 | −0.00 | +0.97 | +0.00 |
| 133 | Karthus | −0.01 | +0.00 | +0.00 | +0.00 | −0.04 | +0.00 | +0.00 |
| 134 | Twitch | −0.01 | +0.00 | +0.00 | −0.49 | −0.07 | +1.00 | +0.00 |
| 135 | Akali | −0.04 | +1.00 | −0.41 | −0.84 | −0.03 | −0.12 | +0.00 |
| 136 | Zoe | −0.05 | −0.44 | +0.65 | −1.00 | +0.02 | +1.00 | +0.00 |
| 137 | Vel'Koz | −0.09 | −0.14 | −0.14 | −0.75 | +0.24 | +1.00 | +0.00 |
| 138 | Brand | −0.21 | −0.84 | −0.55 | +1.00 | −0.05 | −0.61 | +0.00 |
| 139 | Nidalee | −0.22 | −0.65 | −0.82 | +1.00 | −0.05 | −0.51 | +0.00 |
| 140 | Bard | −0.23 | −0.10 | −0.91 | −0.02 | −0.15 | +0.44 | +0.00 |
| 141 | Sivir | −0.24 | −1.00 | −1.00 | +0.87 | −0.09 | +1.00 | +0.00 |
| 142 | Samira | −0.25 | −0.38 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 143 | Zyra | −0.28 | −1.00 | −1.00 | +1.00 | −0.08 | +0.28 | +0.00 |
| 144 | Annie | −0.35 | −1.00 | −1.00 | +1.00 | −0.11 | – | +0.00 |
| 145 | Veigar | −0.37 | −1.00 | −0.44 | −0.09 | −0.06 | +0.19 | +0.00 |
| 146 | Aurelion Sol | −0.40 | −1.00 | −1.00 | +0.87 | +0.20 | −1.00 | +0.00 |
| 147 | Elise | −0.40 | −1.00 | −1.00 | +1.00 | −0.03 | −1.00 | +0.00 |
| 148 | Viktor | −0.41 | −1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 149 | Kled | −0.42 | −1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.00 |
| 150 | Nunu & Willump | −0.43 | −1.00 | −0.60 | +0.07 | +0.10 | −0.57 | +0.00 |
| 151 | Pyke | −0.52 | −1.00 | −1.00 | +0.54 | −0.21 | −1.00 | +0.00 |
| 152 | Ryze | −0.56 | −0.29 | −0.97 | −1.00 | −0.02 | −0.44 | +0.00 |
| 153 | Qiyana | −0.61 | −1.00 | −1.00 | +0.10 | −0.20 | −1.00 | +0.00 |
| 154 | Vladimir | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.00 |
| 155 | Vex | −0.64 | −1.00 | −1.00 | −1.00 | −0.04 | +0.67 | +0.00 |
| 156 | Ahri | −0.64 | −1.00 | −1.00 | −1.00 | −0.05 | +0.67 | +0.00 |
| 157 | Xerath | −0.68 | −1.00 | −1.00 | −1.00 | +0.03 | +0.20 | +0.00 |
| 158 | Ezreal | −0.76 | −1.00 | −0.86 | −1.00 | −0.04 | −0.94 | +0.00 |
| 159 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 160 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 161 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 162 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 163 | LeBlanc | −0.80 | −1.00 | −0.95 | −1.00 | −0.10 | −1.00 | +0.00 |
| 164 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 165 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 166 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −0.95 | +0.00 |
| 167 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 168 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 169 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 171 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 172 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Caitlyn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Caitlyn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Caitlyn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Braum (net +1.23)

- **0.60** projectile block: Unbreakable blocks Caitlyn's 90 Caliber Net, a projectile. Unbreakable for 4 s, long enough to use ahead of 90 Caliber Net. (Braum E Unbreakable → Caitlyn E 90 Caliber Net)
- **0.55** projectile block: Unbreakable blocks Caitlyn's Ace in the Hole, a projectile. Unbreakable for 4 s, long enough to use ahead of Ace in the Hole. (Braum E Unbreakable → Caitlyn R Ace in the Hole)
- **0.50** projectile block: Unbreakable blocks Caitlyn's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Caitlyn basic attacks)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Braum's (650 vs 125 attack range).

#### 2. Yasuo (net +1.21)

- **0.55** projectile block: Wind Wall blocks Caitlyn's Ace in the Hole, a projectile. Wind Wall for 4 s, long enough to use ahead of Ace in the Hole. (Yasuo W Wind Wall → Caitlyn R Ace in the Hole)
- **0.41** projectile block: Wind Wall blocks Caitlyn's 90 Caliber Net, a projectile. Wind Wall for 4 s, long enough to use ahead of 90 Caliber Net. (Yasuo W Wind Wall → Caitlyn E 90 Caliber Net)
- **0.39** projectile block: Wind Wall blocks Caitlyn's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Caitlyn basic attacks)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Yasuo's (650 vs 175 attack range).

#### 3. Rell (net +1.16)

- **0.28** interrupt: Ferromancy: Crash Down's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Ferromancy: Mount Up's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Full Tilt's stun interrupts Caitlyn's Ace in the Hole (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Rell's (650 vs 175 attack range).

#### 4. Fizz (net +1.07)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.75 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Fizz E Playful → Caitlyn W Yordle Snap Trap)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.75 s; Ace in the Hole takes 1.47 s to land, enough to react. (Fizz E Playful → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Chum the Waters's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Fizz's (650 vs 175 attack range).

#### 5. Maokai (net +0.89)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 1.4 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Caitlyn W Yordle Snap Trap)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 1.4 s; Ace in the Hole takes 1.47 s to land, enough to react. (Maokai W Twisted Advance → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Bramble Smash's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Maokai's (650 vs 125 attack range).

#### 6. Camille (net +0.89)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.5 s; Ace in the Hole takes 1.47 s to land, enough to react. (Camille R The Hextech Ultimatum → Caitlyn R Ace in the Hole)
- **0.33** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.5 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: The Hextech Ultimatum's airborne interrupts Caitlyn's Ace in the Hole (normal channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Camille's (650 vs 125 attack range).

#### 7. Nocturne (net +0.83)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Caitlyn's Yordle Snap Trap. Spell shield for 1.5 s, long enough to use ahead of Yordle Snap Trap. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Caitlyn W Yordle Snap Trap)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Caitlyn's Ace in the Hole. Spell shield for 1.5 s, long enough to use ahead of Ace in the Hole. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Caitlyn R Ace in the Hole)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Caitlyn's Ace in the Hole (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 525 units farther than Nocturne's (650 vs 125 attack range).

#### 8. Yuumi (net +0.78)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for ?; Yordle Snap Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Caitlyn W Yordle Snap Trap)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for ?; Ace in the Hole takes 1.47 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 225 units farther than Yuumi's (650 vs 425 attack range).

#### 9. Kayn (net +0.76)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 0.25 s; Ace in the Hole takes 1.47 s to land, enough to react. (Kayn R Umbral Trespass → Caitlyn R Ace in the Hole)
- **0.33** untargetable: Umbral Trespass makes Kayn untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 0.25 s; Yordle Snap Trap takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Blade's Reach's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Kayn's (650 vs 175 attack range).

#### 10. Rek'Sai (net +0.76)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Caitlyn's Ace in the Hole. Untargetable for 1.5 s, long enough to use ahead of Ace in the Hole. (Rek'Sai R Void Rush → Caitlyn R Ace in the Hole)
- **0.33** untargetable: Void Rush makes Rek'Sai untargetable, dodging Caitlyn's Yordle Snap Trap. Untargetable for 1.5 s, long enough to use ahead of Yordle Snap Trap. (Rek'Sai R Void Rush → Caitlyn W Yordle Snap Trap)
- **0.28** interrupt: Unburrow's airborne interrupts Caitlyn's Ace in the Hole (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Caitlyn R Ace in the Hole)
- Watch out: Caitlyn's basic attacks reach 475 units farther than Rek'Sai's (650 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +1.23 | 1.59 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Yasuo | +1.21 | 1.45 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 3 | Rell | +1.16 | 1.40 | 0.24 |  |
| 4 | Fizz | +1.07 | 1.25 | 0.18 |  |
| 5 | Maokai | +0.89 | 1.25 | 0.36 |  |
| 6 | Camille | +0.89 | 1.07 | 0.18 |  |
| 7 | Nocturne | +0.83 | 1.19 | 0.36 |  |
| 8 | Yuumi | +0.78 | 0.98 | 0.20 |  |
| 9 | Kayn | +0.76 | 1.00 | 0.24 |  |
| 10 | Rek'Sai | +0.76 | 1.00 | 0.24 |  |
| 11 | Malzahar | +0.75 | 1.02 | 0.27 |  |
| 12 | Samira | +0.75 | 0.84 | 0.09 | projectile block (Blade Whirl) |
| 13 | Lissandra | +0.71 | 0.80 | 0.09 |  |
| 14 | Zaahen | +0.69 | 0.93 | 0.24 |  |
| 15 | Taliyah | +0.68 | 0.79 | 0.11 |  |
| 16 | K'Sante | +0.66 | 0.84 | 0.18 |  |
| 17 | Mel | +0.65 | 0.83 | 0.18 | projectile block (Rebuttal) |
| 18 | Bard | +0.65 | 0.79 | 0.14 |  |
| 19 | Zac | +0.64 | 1.00 | 0.36 |  |
| 20 | Evelynn | +0.60 | 1.00 | 0.40 |  |
| 21 | Fiora | +0.58 | 0.94 | 0.36 |  |
| 22 | Lulu | +0.58 | 0.76 | 0.18 |  |
| 23 | Rammus | +0.56 | 0.92 | 0.36 |  |
| 24 | Warwick | +0.56 | 0.80 | 0.24 |  |
| 25 | Kled | +0.56 | 0.74 | 0.18 |  |
| 26 | Anivia | +0.56 | 0.56 | 0.00 |  |
| 27 | Master Yi | +0.54 | 0.90 | 0.36 |  |
| 28 | Sivir | +0.54 | 0.81 | 0.27 |  |
| 29 | Galio | +0.54 | 0.78 | 0.24 |  |
| 30 | Udyr | +0.52 | 0.88 | 0.36 |  |
| 31 | Alistar | +0.50 | 0.86 | 0.36 |  |
| 32 | Sejuani | +0.48 | 0.84 | 0.36 |  |
| 33 | Tahm Kench | +0.48 | 0.84 | 0.36 |  |
| 34 | Gnar | +0.48 | 0.56 | 0.08 |  |
| 35 | Vladimir | +0.46 | 0.82 | 0.36 |  |
| 36 | Viktor | +0.46 | 0.68 | 0.22 |  |
| 37 | Xayah | +0.46 | 0.68 | 0.22 |  |
| 38 | Fiddlesticks | +0.46 | 0.56 | 0.10 |  |
| 39 | Gwen | +0.45 | 0.81 | 0.36 |  |
| 40 | Yone | +0.45 | 0.63 | 0.18 |  |
| 41 | Aurelion Sol | +0.45 | 0.54 | 0.09 |  |
| 42 | Zed | +0.44 | 0.68 | 0.24 |  |
| 43 | Heimerdinger | +0.44 | 0.62 | 0.18 |  |
| 44 | Thresh | +0.44 | 0.56 | 0.12 |  |
| 45 | Milio | +0.42 | 0.64 | 0.22 |  |
| 46 | Shen | +0.40 | 0.64 | 0.24 |  |
| 47 | Cassiopeia | +0.39 | 0.57 | 0.18 |  |
| 48 | Shaco | +0.36 | 1.00 | 0.64 |  |
| 49 | Janna | +0.36 | 0.54 | 0.18 |  |
| 50 | Nami | +0.36 | 0.54 | 0.18 |  |
| 51 | Rakan | +0.35 | 0.56 | 0.21 |  |
| 52 | Renata Glasc | +0.35 | 0.53 | 0.18 |  |
| 53 | Aurora | +0.33 | 0.68 | 0.35 |  |
| 54 | Riven | +0.32 | 0.56 | 0.24 |  |
| 55 | Vi | +0.32 | 0.56 | 0.24 |  |
| 56 | Xin Zhao | +0.31 | 0.67 | 0.36 |  |
| 57 | Ahri | +0.31 | 0.40 | 0.09 |  |
| 58 | Kalista | +0.31 | 0.38 | 0.07 |  |
| 59 | Ornn | +0.30 | 0.54 | 0.24 |  |
| 60 | Vex | +0.30 | 0.39 | 0.09 |  |
| 61 | Urgot | +0.29 | 0.56 | 0.27 |  |
| 62 | Seraphine | +0.29 | 0.51 | 0.22 |  |
| 63 | Poppy | +0.28 | 0.64 | 0.36 |  |
| 64 | Annie | +0.28 | 0.28 | 0.00 |  |
| 65 | Ashe | +0.28 | 0.28 | 0.00 |  |
| 66 | Kayle | +0.28 | 0.28 | 0.00 |  |
| 67 | Tristana | +0.26 | 0.26 | 0.00 |  |
| 68 | Amumu | +0.25 | 0.61 | 0.36 |  |
| 69 | Nilah | +0.25 | 0.61 | 0.36 |  |
| 70 | Morgana | +0.24 | 0.60 | 0.36 |  |
| 71 | Hwei | +0.23 | 0.41 | 0.18 |  |
| 72 | Elise | +0.22 | 0.28 | 0.06 |  |
| 73 | Veigar | +0.21 | 0.39 | 0.18 |  |
| 74 | Azir | +0.21 | 0.28 | 0.07 |  |
| 75 | Gragas | +0.20 | 0.56 | 0.36 |  |
| 76 | Leona | +0.20 | 0.56 | 0.36 |  |
| 77 | Sett | +0.20 | 0.56 | 0.36 |  |
| 78 | Ziggs | +0.19 | 0.28 | 0.09 |  |
| 79 | Zoe | +0.19 | 0.28 | 0.09 |  |
| 80 | Quinn | +0.17 | 0.28 | 0.11 |  |
| 81 | Twisted Fate | +0.17 | 0.28 | 0.11 |  |
| 82 | Viego | +0.16 | 0.56 | 0.40 |  |
| 83 | Jax | +0.16 | 0.52 | 0.36 |  |
| 84 | Malphite | +0.14 | 0.50 | 0.36 |  |
| 85 | Jayce | +0.14 | 0.28 | 0.14 |  |
| 86 | Zyra | +0.14 | 0.28 | 0.14 |  |
| 87 | Blitzcrank | +0.12 | 0.84 | 0.72 |  |
| 88 | Pyke | +0.10 | 0.56 | 0.46 |  |
| 89 | Brand | +0.10 | 0.28 | 0.18 |  |
| 90 | Briar | +0.10 | 0.28 | 0.18 |  |
| 91 | Draven | +0.10 | 0.28 | 0.18 |  |
| 92 | Jarvan IV | +0.10 | 0.28 | 0.18 |  |
| 93 | Kennen | +0.10 | 0.28 | 0.18 |  |
| 94 | Soraka | +0.10 | 0.28 | 0.18 |  |
| 95 | Sylas | +0.10 | 0.28 | 0.18 |  |
| 96 | Syndra | +0.10 | 0.28 | 0.18 |  |
| 97 | Zilean | +0.10 | 0.28 | 0.18 |  |
| 98 | Sona | +0.08 | 0.26 | 0.18 |  |
| 99 | Sion | +0.07 | 0.79 | 0.72 |  |
| 100 | Orianna | +0.06 | 0.28 | 0.22 |  |
| 101 | Swain | +0.06 | 0.28 | 0.22 |  |
| 102 | Vel'Koz | +0.06 | 0.28 | 0.22 |  |
| 103 | Xerath | +0.06 | 0.28 | 0.22 |  |
| 104 | Teemo | +0.04 | 0.47 | 0.43 | blind (Blinding Dart) |
| 105 | Bel'Veth | +0.04 | 0.28 | 0.24 |  |
| 106 | Lee Sin | +0.04 | 0.28 | 0.24 |  |
| 107 | Pantheon | +0.04 | 0.28 | 0.24 |  |
| 108 | Volibear | +0.04 | 0.28 | 0.24 |  |
| 109 | Jinx | +0.04 | 0.26 | 0.22 |  |
| 110 | Ambessa | +0.02 | 0.26 | 0.24 |  |
| 111 | Hecarim | +0.02 | 0.26 | 0.24 |  |
| 112 | Neeko | -0.03 | 0.28 | 0.31 |  |
| 113 | Lillia | -0.04 | 0.25 | 0.29 |  |
| 114 | Yunara | -0.07 | 0.00 | 0.07 |  |
| 115 | Aatrox | -0.08 | 0.28 | 0.36 |  |
| 116 | Diana | -0.08 | 0.28 | 0.36 |  |
| 117 | Irelia | -0.08 | 0.28 | 0.36 |  |
| 118 | Kassadin | -0.08 | 0.28 | 0.36 |  |
| 119 | Nautilus | -0.08 | 0.28 | 0.36 |  |
| 120 | Renekton | -0.08 | 0.28 | 0.36 |  |
| 121 | Shyvana | -0.08 | 0.28 | 0.36 |  |
| 122 | Vayne | -0.09 | 0.28 | 0.37 |  |
| 123 | Corki | -0.09 | 0.00 | 0.09 |  |
| 124 | Ezreal | -0.09 | 0.00 | 0.09 |  |
| 125 | Ryze | -0.09 | 0.00 | 0.09 |  |
| 126 | Zeri | -0.09 | 0.00 | 0.09 |  |
| 127 | Nidalee | -0.11 | 0.00 | 0.11 |  |
| 128 | Aphelios | -0.12 | 0.06 | 0.18 |  |
| 129 | Graves | -0.13 | 0.00 | 0.13 |  |
| 130 | Singed | -0.14 | 0.58 | 0.72 |  |
| 131 | Kindred | -0.14 | 0.00 | 0.14 |  |
| 132 | Lucian | -0.14 | 0.00 | 0.14 |  |
| 133 | Varus | -0.14 | 0.00 | 0.14 |  |
| 134 | Cho'Gath | -0.16 | 0.56 | 0.72 |  |
| 135 | Ivern | -0.16 | 0.00 | 0.16 |  |
| 136 | Garen | -0.18 | 0.54 | 0.72 |  |
| 137 | Jhin | -0.18 | 0.00 | 0.18 |  |
| 138 | Lux | -0.18 | 0.00 | 0.18 |  |
| 139 | Miss Fortune | -0.18 | 0.00 | 0.18 |  |
| 140 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 141 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 142 | Gangplank | -0.21 | 0.51 | 0.72 |  |
| 143 | Karma | -0.22 | 0.00 | 0.22 |  |
| 144 | Senna | -0.22 | 0.00 | 0.22 |  |
| 145 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 146 | Kog'Maw | -0.27 | 0.00 | 0.27 |  |
| 147 | LeBlanc | -0.27 | 0.00 | 0.27 |  |
| 148 | Kai'Sa | -0.33 | 0.00 | 0.33 |  |
| 149 | Mordekaiser | -0.35 | 0.37 | 0.72 |  |
| 150 | Olaf | -0.35 | 0.37 | 0.72 |  |
| 151 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 152 | Nunu & Willump | -0.36 | 0.36 | 0.72 |  |
| 153 | Wukong | -0.36 | 0.28 | 0.64 |  |
| 154 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 155 | Karthus | -0.36 | 0.00 | 0.36 |  |
| 156 | Katarina | -0.36 | 0.00 | 0.36 |  |
| 157 | Locke | -0.36 | 0.00 | 0.36 |  |
| 158 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 159 | Skarner | -0.37 | 0.35 | 0.72 |  |
| 160 | Qiyana | -0.37 | 0.23 | 0.60 |  |
| 161 | Rengar | -0.38 | 0.62 | 1.00 |  |
| 162 | Twitch | -0.40 | 0.00 | 0.40 |  |
| 163 | Akshan | -0.42 | 0.00 | 0.42 |  |
| 164 | Darius | -0.44 | 0.28 | 0.72 |  |
| 165 | Taric | -0.44 | 0.28 | 0.72 |  |
| 166 | Trundle | -0.44 | 0.28 | 0.72 |  |
| 167 | Yorick | -0.44 | 0.28 | 0.72 |  |
| 168 | Akali | -0.46 | 0.00 | 0.46 |  |
| 169 | Talon | -0.52 | 0.00 | 0.52 |  |
| 170 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 171 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 172 | Kha'Zix | -0.78 | 0.00 | 0.78 |  |
