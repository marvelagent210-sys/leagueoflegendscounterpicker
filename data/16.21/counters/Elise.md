# Counters to Elise (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Elise: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Elise wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Elise --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.93 |
| 2 | Gangplank | +0.86 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.82 |
| 3 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.67 |
| 4 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.19 |
| 5 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.65 |
| 6 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.56 |
| 7 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.17 |
| 8 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.21 |
| 9 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.52 |
| 10 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.65 |
| 11 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.30 |
| 12 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.14 |
| 13 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.32 |
| 14 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.13 |
| 15 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.14 |
| 16 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.07 |
| 17 | Syndra | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.15 |
| 18 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.02 |
| 19 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.22 |
| 20 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.04 |
| 21 | Aurora | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.18 |
| 22 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.03 |
| 23 | Zilean | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.18 |
| 24 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.09 |
| 25 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.12 |
| 26 | Sivir | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.39 |
| 27 | Viktor | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.14 |
| 28 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.14 |
| 29 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.10 |
| 30 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.04 |
| 31 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.04 |
| 32 | Gnar | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | +0.67 | +0.29 |
| 33 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.07 |
| 34 | Swain | +0.76 | +1.00 | +0.96 | +1.00 | −0.05 | – | +0.13 |
| 35 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.09 |
| 36 | Mordekaiser | +0.76 | +0.97 | +0.90 | +0.95 | −0.04 | +1.00 | +0.13 |
| 37 | Zeri | +0.74 | +1.00 | +1.00 | +1.00 | −0.39 | – | +0.50 |
| 38 | Ashe | +0.73 | +1.00 | +1.00 | +0.70 | +0.01 | – | +0.40 |
| 39 | Ezreal | +0.72 | +0.80 | +0.99 | +1.00 | +0.00 | – | +0.00 |
| 40 | Taric | +0.71 | +1.00 | +1.00 | +1.00 | −0.01 | +0.13 | +0.05 |
| 41 | Veigar | +0.69 | +0.82 | +0.89 | +0.97 | −0.01 | – | −0.02 |
| 42 | Corki | +0.67 | +1.00 | +1.00 | +0.50 | +0.02 | – | +0.00 |
| 43 | Xayah | +0.63 | +1.00 | +1.00 | +0.17 | +0.10 | – | +0.39 |
| 44 | Zaahen | +0.59 | +0.53 | +0.53 | +1.00 | +0.14 | +1.00 | +0.01 |
| 45 | Kog'Maw | +0.57 | +1.00 | +1.00 | +0.04 | −0.04 | – | +0.23 |
| 46 | Hwei | +0.53 | +1.00 | +0.89 | +0.00 | −0.00 | – | +0.03 |
| 47 | Jhin | +0.50 | +1.00 | +1.00 | −0.27 | +0.06 | – | −0.03 |
| 48 | Anivia | +0.48 | +0.69 | +0.49 | +0.63 | −0.03 | – | +0.23 |
| 49 | Annie | +0.44 | +1.00 | +1.00 | −0.65 | +0.11 | – | +0.12 |
| 50 | Caitlyn | +0.41 | +1.00 | +1.00 | −0.95 | +0.01 | +1.00 | −0.08 |
| 51 | Yone | +0.39 | +0.54 | +0.14 | +1.00 | −0.14 | +0.61 | −0.39 |
| 52 | Jinx | +0.39 | +1.00 | +1.00 | −0.77 | +0.03 | – | −0.02 |
| 53 | Vel'Koz | +0.39 | +1.00 | +1.00 | −0.93 | +0.21 | – | +0.04 |
| 54 | Rammus | +0.38 | +1.00 | +1.00 | −1.00 | −0.19 | +1.00 | +0.26 |
| 55 | Graves | +0.38 | +1.00 | +1.00 | −1.00 | −0.18 | +1.00 | +0.04 |
| 56 | Garen | +0.37 | +1.00 | −0.60 | +1.00 | −0.08 | +0.83 | +0.01 |
| 57 | Neeko | +0.37 | +1.00 | +1.00 | −0.90 | +0.09 | – | −0.04 |
| 58 | Mel | +0.36 | +1.00 | +1.00 | −1.00 | +0.11 | – | +0.20 |
| 59 | Ziggs | +0.36 | +1.00 | +1.00 | −1.00 | +0.14 | – | +0.13 |
| 60 | Twitch | +0.36 | +1.00 | +1.00 | −0.93 | +0.02 | – | +0.09 |
| 61 | Cassiopeia | +0.35 | +1.00 | +1.00 | −1.00 | +0.09 | – | +0.01 |
| 62 | Sona | +0.35 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.25 |
| 63 | Janna | +0.35 | +1.00 | +1.00 | −1.00 | +0.08 | – | +0.00 |
| 64 | Renata Glasc | +0.35 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.14 |
| 65 | Varus | +0.34 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.21 |
| 66 | Miss Fortune | +0.34 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.07 |
| 67 | Zyra | +0.34 | +1.00 | +1.00 | −1.00 | +0.05 | – | +0.01 |
| 68 | Zoe | +0.34 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.02 |
| 69 | Milio | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | −0.07 |
| 70 | Xerath | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.04 |
| 71 | Nami | +0.34 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.00 |
| 72 | Ryze | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | −0.05 |
| 73 | Draven | +0.34 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.09 |
| 74 | Lux | +0.33 | +0.95 | +0.99 | −1.00 | +0.04 | – | +0.13 |
| 75 | Ivern | +0.32 | +1.00 | +1.00 | −1.00 | −0.10 | – | +0.08 |
| 76 | Bard | +0.32 | +1.00 | +1.00 | −1.00 | −0.09 | – | −0.03 |
| 77 | Ambessa | +0.32 | −1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.37 |
| 78 | Nocturne | +0.31 | +1.00 | −1.00 | +1.00 | −0.13 | +1.00 | +0.63 |
| 79 | Wukong | +0.30 | +1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.12 |
| 80 | Singed | +0.29 | +1.00 | −0.93 | +1.00 | −0.17 | +1.00 | +0.03 |
| 81 | Renekton | +0.28 | −1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.01 |
| 82 | Zac | +0.25 | +0.02 | +0.95 | +0.12 | −0.13 | +0.10 | −0.23 |
| 83 | Orianna | +0.25 | +1.00 | −1.00 | +1.00 | +0.04 | – | +0.32 |
| 84 | Aatrox | +0.21 | −0.09 | +0.24 | +1.00 | −0.34 | +0.29 | −0.05 |
| 85 | Illaoi | +0.14 | −0.16 | −0.16 | +1.00 | −0.02 | +0.21 | +0.08 |
| 86 | Brand | +0.13 | +0.41 | +0.42 | −0.44 | −0.02 | – | +0.05 |
| 87 | Camille | +0.11 | −0.36 | −0.37 | +1.00 | −0.18 | +1.00 | +0.38 |
| 88 | Rumble | +0.11 | −1.00 | +0.26 | +1.00 | −0.09 | +1.00 | +0.08 |
| 89 | Sion | +0.10 | +0.00 | +0.00 | +0.00 | −0.02 | +1.00 | +0.00 |
| 90 | Nidalee | +0.08 | +0.59 | +0.57 | −1.00 | −0.08 | – | −0.06 |
| 91 | Senna | +0.02 | +0.43 | +0.46 | −1.00 | +0.01 | – | −0.00 |
| 92 | Udyr | −0.00 | +1.00 | −0.69 | −1.00 | −0.10 | +1.00 | +0.70 |
| 93 | Tahm Kench | −0.03 | −0.08 | −0.10 | −0.13 | −0.01 | +0.52 | −0.12 |
| 94 | Zed | −0.10 | +1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.41 |
| 95 | Aurelion Sol | −0.10 | +0.21 | +0.22 | −1.00 | +0.02 | – | +0.01 |
| 96 | Soraka | −0.13 | +0.15 | +0.15 | −1.00 | +0.04 | – | −0.06 |
| 97 | Vi | −0.14 | −1.00 | +1.00 | −1.00 | −0.10 | +1.00 | −0.47 |
| 98 | Pantheon | −0.15 | +0.00 | −1.00 | +0.00 | +0.02 | +1.00 | −0.07 |
| 99 | Tryndamere | −0.18 | −0.93 | −0.94 | +1.00 | −0.22 | +1.00 | +0.37 |
| 100 | Riven | −0.19 | −1.00 | −1.00 | +1.00 | −0.07 | +1.00 | +0.31 |
| 101 | Galio | −0.20 | −1.00 | −1.00 | +1.00 | +0.02 | +1.00 | −0.01 |
| 102 | Yasuo | −0.20 | −0.97 | −1.00 | +1.00 | −0.07 | +1.00 | +0.07 |
| 103 | Nilah | −0.21 | −1.00 | −1.00 | +1.00 | −0.04 | +1.00 | −0.02 |
| 104 | Shyvana | −0.22 | −1.00 | −1.00 | +1.00 | −0.14 | +1.00 | +0.10 |
| 105 | Shen | −0.27 | −1.00 | −0.97 | +1.00 | +0.01 | +0.16 | +0.08 |
| 106 | Jayce | −0.28 | −1.00 | −0.60 | +0.03 | −0.06 | +1.00 | +0.38 |
| 107 | Xin Zhao | −0.29 | +0.16 | −0.58 | −1.00 | −0.15 | +0.79 | −0.74 |
| 108 | Vex | −0.32 | −0.22 | −0.96 | +0.03 | +0.00 | – | +0.09 |
| 109 | Smolder | −0.32 | −0.96 | −1.00 | +1.00 | −0.02 | – | +0.19 |
| 110 | Maokai | −0.36 | +0.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.06 |
| 111 | Lee Sin | −0.41 | −1.00 | −0.98 | +0.00 | −0.10 | +1.00 | +0.02 |
| 112 | Lillia | −0.48 | −0.68 | −0.90 | −1.00 | −0.06 | +1.00 | +0.42 |
| 113 | Karthus | −0.49 | −1.00 | −0.17 | −1.00 | +0.01 | −0.02 | +0.04 |
| 114 | Rakan | −0.49 | −0.89 | −1.00 | −0.56 | −0.17 | +1.00 | +0.25 |
| 115 | Master Yi | −0.52 | −0.94 | −0.94 | −0.94 | −0.06 | +1.00 | +1.00 |
| 116 | Rengar | −0.56 | −1.00 | −1.00 | −1.00 | +0.12 | +1.00 | +0.46 |
| 117 | Sylas | −0.57 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.51 |
| 118 | Bel'Veth | −0.58 | −1.00 | −0.88 | −1.00 | −0.02 | +1.00 | −0.07 |
| 119 | Jarvan IV | −0.58 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.48 |
| 120 | Morgana | −0.59 | −1.00 | −1.00 | −1.00 | −0.00 | +1.00 | +0.11 |
| 121 | Tristana | −0.60 | −1.00 | −1.00 | −0.85 | −0.17 | +1.00 | −0.01 |
| 122 | Evelynn | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.04 |
| 123 | Gwen | −0.60 | −1.00 | −1.00 | −1.00 | −0.30 | +1.00 | +0.93 |
| 124 | Kha'Zix | −0.60 | −1.00 | −1.00 | −1.00 | −0.14 | +1.00 | +0.43 |
| 125 | Irelia | −0.60 | −1.00 | −1.00 | −1.00 | −0.02 | +1.00 | +0.03 |
| 126 | Kassadin | −0.60 | −1.00 | −1.00 | −1.00 | −0.03 | +1.00 | +0.06 |
| 127 | Sejuani | −0.60 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.23 |
| 128 | Shaco | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.04 |
| 129 | Naafiri | −0.61 | −1.00 | −1.00 | −1.00 | −0.04 | +1.00 | −0.04 |
| 130 | Hecarim | −0.61 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.06 |
| 131 | Fizz | −0.61 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.07 |
| 132 | Gragas | −0.61 | −1.00 | −1.00 | −1.00 | −0.16 | +1.00 | +0.23 |
| 133 | Rek'Sai | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | −0.02 |
| 134 | Viego | −0.62 | −1.00 | −1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 135 | Locke | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.05 |
| 136 | Katarina | −0.62 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | +0.12 |
| 137 | Amumu | −0.62 | −1.00 | −1.00 | −1.00 | −0.10 | +0.90 | +0.04 |
| 138 | Vladimir | −0.63 | −1.00 | −1.00 | −1.00 | −0.21 | +1.00 | +0.07 |
| 139 | Kennen | −0.63 | −1.00 | −1.00 | −0.13 | −0.26 | – | −0.02 |
| 140 | Kayn | −0.63 | −1.00 | −1.00 | −1.00 | −0.17 | +1.00 | −0.11 |
| 141 | Qiyana | −0.63 | −1.00 | −1.00 | −1.00 | −0.30 | +0.96 | +0.30 |
| 142 | Rell | −0.64 | −1.00 | −1.00 | −1.00 | −0.07 | +0.65 | +0.11 |
| 143 | Malphite | −0.66 | −1.00 | −1.00 | −1.00 | +0.09 | +0.19 | +0.26 |
| 144 | Briar | −0.66 | −1.00 | −1.00 | −1.00 | −0.37 | +1.00 | −0.04 |
| 145 | Leona | −0.66 | −1.00 | −1.00 | −1.00 | −0.14 | +0.66 | −0.12 |
| 146 | Braum | −0.66 | −0.97 | −1.00 | −1.00 | −0.02 | +0.31 | +0.03 |
| 147 | Ekko | −0.67 | −1.00 | −1.00 | −1.00 | −0.12 | +0.52 | −0.04 |
| 148 | Nautilus | −0.67 | −1.00 | −1.00 | −1.00 | −0.01 | +0.44 | −0.33 |
| 149 | Ahri | −0.68 | −1.00 | −1.00 | −0.56 | −0.09 | – | +0.30 |
| 150 | Alistar | −0.68 | −1.00 | −1.00 | −1.00 | −0.03 | +0.14 | +0.20 |
| 151 | Nunu & Willump | −0.68 | −1.00 | −1.00 | −1.00 | +0.10 | +0.07 | −0.04 |
| 152 | Akali | −0.68 | −1.00 | −1.00 | −1.00 | −0.07 | +0.29 | +0.01 |
| 153 | Sett | −0.69 | −1.00 | −1.00 | −1.00 | −0.13 | +0.23 | +0.22 |
| 154 | Urgot | −0.69 | −1.00 | −1.00 | −1.00 | +0.05 | +0.08 | −0.08 |
| 155 | Ornn | −0.70 | −1.00 | −1.00 | −1.00 | −0.03 | +0.06 | −0.01 |
| 156 | Skarner | −0.71 | −1.00 | −1.00 | −1.00 | −0.03 | +0.04 | −0.09 |
| 157 | Blitzcrank | −0.72 | −1.00 | −1.00 | −1.00 | −0.04 | −0.13 | +0.04 |
| 158 | Thresh | −0.73 | −1.00 | −1.00 | −1.00 | −0.09 | −0.23 | +0.06 |
| 159 | Lissandra | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.26 |
| 160 | Seraphine | −0.75 | −0.92 | −0.92 | −1.00 | −0.05 | – | −0.15 |
| 161 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.14 |
| 162 | Yunara | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.17 |
| 163 | Kindred | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.31 |
| 164 | Azir | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.13 |
| 165 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.17 |
| 166 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.18 |
| 167 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.14 |
| 168 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.13 |
| 169 | Kai'Sa | −0.80 | −0.97 | −0.99 | −1.00 | −0.16 | – | −0.05 |
| 170 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −0.90 | +0.01 |
| 171 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.05 |
| 172 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.03 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Elise's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Elise's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Elise` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.90)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Elise's Cocoon. Untargetable for 0.75 s; Cocoon takes 0.94 s to land, enough to react. (Fizz E Playful → Elise E Cocoon)
- **0.51** untargetable: Playful makes Fizz untargetable, dodging Elise's Venomous Bite. Untargetable for 0.75 s; Venomous Bite takes 0.66 s to land, enough to react. (Fizz E Playful → Elise Q Venomous Bite)
- **0.38** untargetable: Playful makes Fizz untargetable, dodging Elise's Neurotoxin. Untargetable for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Fizz E Playful → Elise Q Neurotoxin)
- Watch out: Elise's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Sivir (net +0.76)

- **0.51** spell shield: Spell Shield's spell shield blocks Elise's Cocoon. Spell shield for 1.5 s, long enough to use ahead of Cocoon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise E Cocoon)
- **0.36** spell shield: Spell Shield's spell shield blocks Elise's Venomous Bite. Spell shield for 1.5 s, long enough to use ahead of Venomous Bite. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise Q Venomous Bite)
- **0.27** spell shield: Spell Shield's spell shield blocks Elise's Neurotoxin. Spell shield for 1.5 s, long enough to use ahead of Neurotoxin. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Elise Q Neurotoxin)

#### 3. Maokai (net +0.69)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Elise's Cocoon. Untargetable for 1.4 s; Cocoon takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Elise E Cocoon)
- **0.46** untargetable: Twisted Advance makes Maokai untargetable, dodging Elise's Venomous Bite. Untargetable for 1.4 s; Venomous Bite takes 0.66 s to land, enough to react. (Maokai W Twisted Advance → Elise Q Venomous Bite)
- **0.34** untargetable: Twisted Advance makes Maokai untargetable, dodging Elise's Neurotoxin. Untargetable for 1.4 s; Neurotoxin takes 0.51 s to land, enough to react. (Maokai W Twisted Advance → Elise Q Neurotoxin)
- Watch out: Elise's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 4. Braum (net +0.63)

- **0.70** projectile block: Unbreakable blocks Elise's Cocoon, a projectile. Unbreakable for 4 s, long enough to use ahead of Cocoon. (Braum E Unbreakable → Elise E Cocoon)
- **0.38** projectile block: Unbreakable blocks Elise's Neurotoxin, a projectile. Unbreakable for 4 s, long enough to use ahead of Neurotoxin. (Braum E Unbreakable → Elise Q Neurotoxin)
- **0.23** projectile block: Unbreakable blocks Elise's basic attacks, which are projectiles (in Elise). Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Elise basic attacks)
- Watch out: Elise's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 5. Samira (net +0.63)

- **0.47** projectile block: Blade Whirl blocks Elise's Cocoon, a projectile. Blade Whirl for 0.75 s; Cocoon takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Elise E Cocoon)
- **0.25** projectile block: Blade Whirl blocks Elise's Neurotoxin, a projectile. Blade Whirl for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Samira W Blade Whirl → Elise Q Neurotoxin)
- **0.14** projectile block: Blade Whirl blocks Elise's basic attacks, which are projectiles (in Elise). Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Elise basic attacks)

#### 6. Yuumi (net +0.60)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Cocoon. Untargetable for ?; Cocoon takes 0.94 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise E Cocoon)
- **0.60** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Venomous Bite. Untargetable for ?; Venomous Bite takes 0.66 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise Q Venomous Bite)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Elise's Neurotoxin. Untargetable for ?; Neurotoxin takes 0.51 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Elise Q Neurotoxin)
- Watch out: Cocoon's stun interrupts Yuumi's Final Chapter (normal channel).

#### 7. Nocturne (net +0.60)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Elise's Cocoon. Spell shield for 1.5 s, long enough to use ahead of Cocoon. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Elise E Cocoon)
- **0.42** spell shield: Shroud of Darkness's spell shield blocks Elise's Venomous Bite. Spell shield for 1.5 s, long enough to use ahead of Venomous Bite. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Elise Q Venomous Bite)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks Elise's Neurotoxin. Spell shield for 1.5 s, long enough to use ahead of Neurotoxin. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Elise Q Neurotoxin)
- Watch out: Elise's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 8. Mel (net +0.60)

- **0.44** projectile block: Rebuttal blocks Elise's Cocoon, a projectile. Rebuttal for 0.75 s; Cocoon takes 0.94 s to land, enough to react. (Mel W Rebuttal → Elise E Cocoon)
- **0.24** projectile block: Rebuttal blocks Elise's Neurotoxin, a projectile. Rebuttal for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Mel W Rebuttal → Elise Q Neurotoxin)
- **0.14** projectile block: Rebuttal blocks Elise's basic attacks, which are projectiles (in Elise). Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Elise basic attacks)

#### 9. Fiora (net +0.59)

- **0.64** parry: Riposte parries Elise's Cocoon and stuns back. Parry for 0.75 s; Cocoon takes 0.94 s to land, enough to react. Negating Cocoon's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Elise E Cocoon)
- **0.38** parry: Riposte parries Elise's Venomous Bite. Parry for 0.75 s; Venomous Bite takes 0.66 s to land, enough to react. (Fiora W Riposte → Elise Q Venomous Bite)
- **0.28** parry: Riposte parries Elise's Neurotoxin. Parry for 0.75 s; Neurotoxin takes 0.51 s to land, enough to react. (Fiora W Riposte → Elise Q Neurotoxin)
- Watch out: Elise's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 10. Vladimir (net +0.56)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Cocoon. Untargetable for 2 s, long enough to use ahead of Cocoon. (Vladimir W Sanguine Pool → Elise E Cocoon)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Venomous Bite. Untargetable for 2 s, long enough to use ahead of Venomous Bite. (Vladimir W Sanguine Pool → Elise Q Venomous Bite)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Elise's Neurotoxin. Untargetable for 2 s, long enough to use ahead of Neurotoxin. (Vladimir W Sanguine Pool → Elise Q Neurotoxin)
- Watch out: Elise's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.90 | 1.05 | 0.15 |  |
| 2 | Sivir | +0.76 | 0.76 | 0.00 |  |
| 3 | Maokai | +0.69 | 1.01 | 0.32 |  |
| 4 | Braum | +0.63 | 0.95 | 0.32 | projectile block (Unbreakable) |
| 5 | Samira | +0.63 | 0.63 | 0.00 | projectile block (Blade Whirl) |
| 6 | Yuumi | +0.60 | 1.11 | 0.51 |  |
| 7 | Nocturne | +0.60 | 0.92 | 0.32 |  |
| 8 | Mel | +0.60 | 0.60 | 0.00 | projectile block (Rebuttal) |
| 9 | Fiora | +0.59 | 0.91 | 0.32 |  |
| 10 | Vladimir | +0.56 | 0.80 | 0.24 |  |
| 11 | Lissandra | +0.53 | 0.53 | 0.00 |  |
| 12 | Yasuo | +0.52 | 0.72 | 0.20 | projectile block (Wind Wall) |
| 13 | Bard | +0.52 | 0.52 | 0.00 |  |
| 14 | Xayah | +0.50 | 0.50 | 0.00 |  |
| 15 | Gwen | +0.44 | 0.76 | 0.32 |  |
| 16 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 17 | Kayle | +0.42 | 0.42 | 0.00 |  |
| 18 | Udyr | +0.38 | 0.70 | 0.32 |  |
| 19 | Morgana | +0.38 | 0.54 | 0.16 |  |
| 20 | Camille | +0.35 | 0.51 | 0.16 |  |
| 21 | Aurora | +0.35 | 0.50 | 0.15 |  |
| 22 | Teemo | +0.35 | 0.43 | 0.08 | blind (Blinding Dart) |
| 23 | Milio | +0.35 | 0.35 | 0.00 |  |
| 24 | Rek'Sai | +0.32 | 0.52 | 0.20 |  |
| 25 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 26 | Singed | +0.28 | 0.93 | 0.65 |  |
| 27 | Zed | +0.28 | 0.50 | 0.22 |  |
| 28 | Kalista | +0.25 | 0.25 | 0.00 |  |
| 29 | Master Yi | +0.23 | 0.76 | 0.53 |  |
| 30 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 31 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 32 | Evelynn | +0.22 | 0.52 | 0.30 |  |
| 33 | Varus | +0.21 | 0.32 | 0.11 |  |
| 34 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 35 | Kled | +0.20 | 0.32 | 0.12 |  |
| 36 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 37 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 38 | Vex | +0.19 | 0.19 | 0.00 |  |
| 39 | Jax | +0.15 | 0.47 | 0.32 |  |
| 40 | Nilah | +0.13 | 0.39 | 0.26 |  |
| 41 | Zaahen | +0.13 | 0.33 | 0.20 |  |
| 42 | Shaco | +0.10 | 0.52 | 0.42 |  |
| 43 | Tristana | +0.09 | 0.09 | 0.00 |  |
| 44 | Malzahar | +0.08 | 0.48 | 0.40 |  |
| 45 | Xin Zhao | +0.06 | 0.36 | 0.30 |  |
| 46 | Annie | +0.03 | 0.03 | 0.00 |  |
| 47 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 48 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 49 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 50 | Azir | 0.00 | 0.00 | 0.00 |  |
| 51 | Brand | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Draven | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 56 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 57 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | Lux | 0.00 | 0.00 | 0.00 |  |
| 63 | Nami | 0.00 | 0.00 | 0.00 |  |
| 64 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 65 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 66 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 67 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 68 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 69 | Sona | 0.00 | 0.00 | 0.00 |  |
| 70 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 71 | Swain | 0.00 | 0.00 | 0.00 |  |
| 72 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 73 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 74 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 75 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 76 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 77 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 78 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 79 | Yone | -0.02 | 0.13 | 0.15 |  |
| 80 | Alistar | -0.05 | 0.27 | 0.32 |  |
| 81 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 82 | Graves | -0.07 | 0.00 | 0.07 |  |
| 83 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 84 | LeBlanc | -0.08 | 0.00 | 0.08 |  |
| 85 | Poppy | -0.11 | 0.41 | 0.52 |  |
| 86 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 87 | Kai'Sa | -0.11 | 0.00 | 0.11 |  |
| 88 | Neeko | -0.11 | 0.00 | 0.11 |  |
| 89 | Senna | -0.11 | 0.00 | 0.11 |  |
| 90 | Twitch | -0.11 | 0.00 | 0.11 |  |
| 91 | Kayn | -0.13 | 0.52 | 0.65 |  |
| 92 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 93 | Vayne | -0.14 | 0.00 | 0.14 |  |
| 94 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 95 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 96 | Briar | -0.16 | 0.00 | 0.16 |  |
| 97 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 98 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 99 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 100 | Gangplank | -0.19 | 0.46 | 0.65 |  |
| 101 | Amumu | -0.19 | 0.13 | 0.32 |  |
| 102 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 103 | Pantheon | -0.20 | 0.50 | 0.70 |  |
| 104 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 105 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 106 | Rell | -0.20 | 0.00 | 0.20 |  |
| 107 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 108 | Shen | -0.22 | 0.45 | 0.67 |  |
| 109 | Caitlyn | -0.22 | 0.06 | 0.28 |  |
| 110 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 111 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 112 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 113 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 114 | Riven | -0.22 | 0.00 | 0.22 |  |
| 115 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 116 | Rengar | -0.23 | 0.56 | 0.79 |  |
| 117 | Rammus | -0.27 | 0.32 | 0.59 |  |
| 118 | Katarina | -0.28 | 0.32 | 0.60 |  |
| 119 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 120 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 121 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 122 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 123 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 124 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 125 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 126 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 127 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 128 | Olaf | -0.32 | 0.33 | 0.65 |  |
| 129 | Diana | -0.32 | 0.00 | 0.32 |  |
| 130 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 131 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 132 | Leona | -0.32 | 0.00 | 0.32 |  |
| 133 | Locke | -0.32 | 0.00 | 0.32 |  |
| 134 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 135 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 136 | Sett | -0.32 | 0.00 | 0.32 |  |
| 137 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 138 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 139 | Akali | -0.33 | 0.00 | 0.33 |  |
| 140 | Akshan | -0.35 | 0.00 | 0.35 |  |
| 141 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 142 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 143 | Talon | -0.36 | 0.00 | 0.36 |  |
| 144 | Sion | -0.39 | 0.35 | 0.74 |  |
| 145 | Janna | -0.40 | 0.00 | 0.40 |  |
| 146 | Wukong | -0.40 | 0.00 | 0.40 |  |
| 147 | Qiyana | -0.40 | 0.00 | 0.40 |  |
| 148 | Viego | -0.42 | 0.00 | 0.42 |  |
| 149 | Garen | -0.43 | 0.18 | 0.61 |  |
| 150 | Pyke | -0.43 | 0.00 | 0.43 |  |
| 151 | Karthus | -0.44 | 0.00 | 0.44 |  |
| 152 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 153 | Warwick | -0.46 | 0.41 | 0.87 |  |
| 154 | Gragas | -0.48 | 0.00 | 0.48 |  |
| 155 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 156 | Zac | -0.51 | 0.26 | 0.77 |  |
| 157 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 158 | Kha'Zix | -0.53 | 0.00 | 0.53 |  |
| 159 | Vi | -0.60 | 0.00 | 0.60 |  |
| 160 | Darius | -0.61 | 0.00 | 0.61 |  |
| 161 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 162 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 163 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 164 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 165 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 166 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 167 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 168 | Skarner | -0.65 | 0.00 | 0.65 |  |
| 169 | Taric | -0.65 | 0.00 | 0.65 |  |
| 170 | Tahm Kench | -0.80 | 0.00 | 0.80 |  |
| 171 | Galio | -0.81 | 0.00 | 0.81 |  |
| 172 | Nunu & Willump | -1.14 | 0.00 | 1.14 |  |
