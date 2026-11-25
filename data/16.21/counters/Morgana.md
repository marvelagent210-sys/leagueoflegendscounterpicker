# Counters to Morgana (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Morgana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Morgana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Morgana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.90 |
| 2 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.58 |
| 3 | Miss Fortune | +0.85 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.44 |
| 4 | Zeri | +0.85 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.67 |
| 5 | Graves | +0.84 | +1.00 | +1.00 | +1.00 | +0.35 | – | +0.04 |
| 6 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.93 |
| 7 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.26 |
| 8 | Samira | +0.83 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.09 |
| 9 | Heimerdinger | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.05 |
| 10 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.19 |
| 11 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.38 |
| 12 | Lucian | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.47 |
| 13 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 14 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.09 |
| 15 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.02 |
| 16 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | −0.25 |
| 17 | Smolder | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.06 |
| 18 | Sona | +0.82 | +1.00 | +1.00 | +0.99 | +0.05 | +1.00 | +0.23 |
| 19 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.27 |
| 20 | Yunara | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.14 |
| 21 | Draven | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.00 |
| 22 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.08 |
| 23 | Neeko | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.09 |
| 24 | Akshan | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.23 |
| 25 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.35 |
| 26 | Twitch | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.05 |
| 27 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.51 |
| 28 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.22 |
| 29 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.20 |
| 30 | Gnar | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.08 |
| 31 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.17 |
| 32 | Jhin | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.03 |
| 33 | Vel'Koz | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.17 |
| 34 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.10 |
| 35 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.07 |
| 36 | Cassiopeia | +0.80 | +1.00 | +0.96 | +1.00 | +0.09 | +1.00 | −0.12 |
| 37 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | −0.08 |
| 38 | Ezreal | +0.80 | +1.00 | +1.00 | +0.96 | +0.02 | +1.00 | +0.03 |
| 39 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.10 |
| 40 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.08 |
| 41 | Varus | +0.80 | +0.98 | +0.98 | +1.00 | +0.06 | +1.00 | −0.07 |
| 42 | Caitlyn | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.08 |
| 43 | Zoe | +0.79 | +1.00 | +1.00 | +0.96 | −0.02 | +1.00 | +0.01 |
| 44 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.01 |
| 45 | Sylas | +0.78 | +1.00 | +1.00 | +1.00 | +0.22 | +0.75 | −0.48 |
| 46 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.07 |
| 47 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +0.86 | +0.35 |
| 48 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.06 |
| 49 | Karma | +0.78 | +1.00 | +0.99 | +1.00 | +0.02 | – | −0.01 |
| 50 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.03 |
| 51 | Viktor | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.08 |
| 52 | Swain | +0.77 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.25 |
| 53 | Darius | +0.77 | +0.94 | +1.00 | +1.00 | −0.05 | +0.96 | −0.15 |
| 54 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.07 |
| 55 | Dr. Mundo | +0.76 | +0.88 | +1.00 | +1.00 | −0.09 | +1.00 | +0.16 |
| 56 | Vladimir | +0.76 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.15 |
| 57 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.06 |
| 58 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.11 |
| 59 | Kayn | +0.75 | +0.94 | +1.00 | +1.00 | −0.09 | +1.00 | −0.39 |
| 60 | Zilean | +0.75 | +0.93 | +1.00 | +0.66 | +0.10 | +1.00 | +0.38 |
| 61 | Kled | +0.74 | +1.00 | +1.00 | +1.00 | −0.01 | +0.34 | +0.11 |
| 62 | Jinx | +0.71 | +0.87 | +0.87 | +1.00 | +0.07 | – | −0.05 |
| 63 | Hwei | +0.71 | +0.89 | +0.77 | +0.98 | +0.03 | +0.92 | +0.01 |
| 64 | Brand | +0.69 | +0.87 | +0.86 | +1.00 | −0.01 | +0.70 | −0.11 |
| 65 | Syndra | +0.67 | +1.00 | +1.00 | +0.32 | +0.07 | +1.00 | +0.00 |
| 66 | Ziggs | +0.67 | +1.00 | +1.00 | +1.00 | +0.11 | −0.53 | +0.12 |
| 67 | Nami | +0.64 | +1.00 | +1.00 | +0.16 | +0.10 | +1.00 | −0.08 |
| 68 | Kindred | +0.62 | +1.00 | +0.35 | +1.00 | +0.14 | – | −0.10 |
| 69 | Zed | +0.62 | +1.00 | +1.00 | +1.00 | −0.12 | −1.00 | +0.65 |
| 70 | Elise | +0.59 | +1.00 | +1.00 | +1.00 | +0.00 | −1.00 | −0.11 |
| 71 | Maokai | +0.59 | +0.57 | +1.00 | +0.57 | −0.07 | +1.00 | −0.06 |
| 72 | Anivia | +0.58 | +1.00 | +0.53 | +1.00 | −0.12 | +0.13 | +0.15 |
| 73 | Senna | +0.55 | +1.00 | +1.00 | −0.28 | +0.09 | +1.00 | −0.14 |
| 74 | Mel | +0.48 | +0.40 | +0.28 | +1.00 | +0.04 | +1.00 | +0.19 |
| 75 | Milio | +0.48 | +1.00 | +0.99 | −0.48 | +0.18 | – | −0.02 |
| 76 | Seraphine | +0.47 | +0.94 | +0.94 | −0.20 | +0.00 | – | −0.14 |
| 77 | Poppy | +0.43 | +1.00 | +1.00 | −1.00 | +0.22 | +1.00 | −0.07 |
| 78 | Tristana | +0.43 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.32 |
| 79 | Yasuo | +0.41 | +0.00 | +0.91 | +0.94 | −0.09 | −0.00 | +0.14 |
| 80 | Janna | +0.41 | +1.00 | +1.00 | −1.00 | +0.04 | +1.00 | −0.00 |
| 81 | Rengar | +0.40 | +1.00 | +1.00 | −1.00 | −0.06 | +0.96 | +0.33 |
| 82 | Renata Glasc | +0.37 | +1.00 | +1.00 | −1.00 | +0.05 | +0.67 | −0.04 |
| 83 | Gangplank | +0.35 | +1.00 | +0.68 | −0.81 | −0.02 | +0.74 | +0.35 |
| 84 | Jarvan IV | +0.32 | +1.00 | −0.94 | +1.00 | +0.16 | +0.70 | +0.33 |
| 85 | Malzahar | +0.32 | +1.00 | +1.00 | −1.00 | −0.03 | – | −0.19 |
| 86 | LeBlanc | +0.31 | +0.39 | +0.71 | +0.03 | −0.01 | – | −0.06 |
| 87 | Soraka | +0.30 | +0.55 | +0.56 | +0.03 | +0.02 | +0.19 | −0.10 |
| 88 | Lillia | +0.29 | −0.03 | +0.04 | +0.92 | −0.04 | +0.98 | +0.19 |
| 89 | Tryndamere | +0.28 | −1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.14 |
| 90 | Ryze | +0.26 | −0.27 | +0.34 | +0.75 | −0.03 | +1.00 | −0.13 |
| 91 | Renekton | +0.25 | +0.55 | +0.04 | +0.05 | −0.06 | +1.00 | +0.01 |
| 92 | Ahri | +0.21 | +0.21 | +0.82 | −0.26 | −0.02 | +0.11 | +0.03 |
| 93 | Bel'Veth | +0.19 | +0.69 | +0.66 | −1.00 | −0.06 | +0.93 | −0.57 |
| 94 | Kassadin | +0.17 | +0.02 | +1.00 | −0.95 | +0.03 | +1.00 | +0.03 |
| 95 | Shyvana | +0.16 | +0.34 | −0.85 | +0.97 | −0.17 | +0.98 | +0.33 |
| 96 | Volibear | +0.15 | +0.88 | −0.88 | +0.88 | −0.20 | −0.02 | +0.05 |
| 97 | Zyra | +0.14 | +0.24 | +0.09 | +0.30 | +0.07 | −0.09 | −0.08 |
| 98 | Wukong | +0.12 | −1.00 | +1.00 | +0.00 | +0.04 | +1.00 | +0.31 |
| 99 | Tahm Kench | +0.10 | +0.07 | +0.13 | +0.13 | −0.11 | +0.52 | −0.20 |
| 100 | Rell | +0.10 | +0.04 | +0.18 | +0.04 | +0.12 | +0.13 | +0.05 |
| 101 | Rek'Sai | +0.06 | +0.96 | −1.00 | +1.00 | −0.19 | −0.99 | +0.03 |
| 102 | Veigar | +0.05 | +0.11 | +0.22 | −0.32 | −0.01 | +0.35 | −0.08 |
| 103 | Trundle | +0.05 | −0.57 | −0.12 | +1.00 | −0.27 | +0.40 | +0.41 |
| 104 | Nidalee | +0.01 | −0.39 | −0.38 | +1.00 | +0.05 | – | −0.10 |
| 105 | Diana | −0.02 | −0.06 | −0.01 | −0.06 | +0.14 | −0.00 | −0.20 |
| 106 | Gragas | −0.02 | +0.00 | +0.00 | −0.03 | −0.11 | −0.04 | +0.06 |
| 107 | Malphite | −0.07 | −0.13 | −0.13 | −0.10 | +0.08 | −0.17 | +0.35 |
| 108 | Zac | −0.09 | +0.03 | −0.15 | −0.09 | −0.26 | +0.09 | −0.26 |
| 109 | Shen | −0.11 | −0.19 | −0.17 | −0.07 | −0.05 | −0.08 | +0.25 |
| 110 | Illaoi | −0.12 | −0.97 | −0.17 | +1.00 | −0.07 | −0.30 | +0.03 |
| 111 | Ornn | −0.13 | −0.14 | −0.13 | −0.20 | −0.07 | −0.09 | −0.03 |
| 112 | Sett | −0.15 | +0.07 | +0.03 | −0.81 | −0.12 | −0.05 | +0.26 |
| 113 | Olaf | −0.15 | −1.00 | +0.03 | +1.00 | −0.12 | −1.00 | +0.27 |
| 114 | Bard | −0.15 | −0.20 | +0.59 | −1.00 | −0.09 | – | −0.42 |
| 115 | Aurelion Sol | −0.17 | +0.07 | +0.06 | −1.00 | +0.00 | +0.03 | −0.04 |
| 116 | Vex | −0.17 | −0.02 | −0.02 | −0.52 | +0.00 | −0.59 | +0.03 |
| 117 | Lee Sin | −0.19 | −0.67 | −0.83 | +1.00 | −0.07 | −0.29 | +0.50 |
| 118 | Braum | −0.19 | −0.25 | −0.23 | −0.21 | −0.04 | −0.21 | −0.06 |
| 119 | Xerath | −0.24 | −0.35 | −0.64 | +0.13 | −0.02 | – | +0.11 |
| 120 | Karthus | −0.25 | −0.07 | +0.00 | −1.00 | −0.06 | – | −0.02 |
| 121 | Naafiri | −0.28 | −1.00 | +1.00 | −1.00 | +0.09 | −1.00 | +0.02 |
| 122 | Taric | −0.30 | −0.36 | −0.37 | −0.38 | −0.04 | −0.36 | −0.01 |
| 123 | Riven | −0.34 | −0.94 | −1.00 | +0.00 | +0.24 | +1.00 | +0.23 |
| 124 | Lux | −0.34 | −0.46 | −0.26 | −0.72 | −0.02 | −0.10 | +0.01 |
| 125 | Shaco | −0.37 | −0.75 | −0.70 | −0.32 | −0.07 | +0.71 | +0.01 |
| 126 | Warwick | −0.41 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | −0.44 |
| 127 | Akali | −0.49 | −0.42 | −0.99 | −0.39 | −0.04 | −0.49 | +0.04 |
| 128 | Rammus | −0.49 | −0.43 | −0.43 | −0.93 | −0.11 | −0.88 | +0.37 |
| 129 | Fizz | −0.51 | −0.91 | −0.87 | −0.64 | −0.28 | +1.00 | +0.07 |
| 130 | Lissandra | −0.53 | −0.79 | −1.00 | −1.00 | +0.07 | +0.99 | +0.20 |
| 131 | Gwen | −0.53 | −0.86 | −0.87 | −0.18 | −0.20 | −0.40 | +0.08 |
| 132 | Nocturne | −0.57 | −0.83 | −0.84 | −0.80 | −0.12 | +0.02 | +0.52 |
| 133 | Irelia | −0.58 | −0.86 | −0.89 | −0.18 | −0.02 | −1.00 | −0.05 |
| 134 | Evelynn | −0.60 | −1.00 | −1.00 | +0.00 | +0.01 | −1.00 | +0.00 |
| 135 | Mordekaiser | −0.61 | −0.93 | −0.94 | −0.28 | −0.02 | −0.92 | +0.21 |
| 136 | Sejuani | −0.61 | −0.70 | −0.66 | −0.97 | +0.03 | −0.90 | +0.15 |
| 137 | Xin Zhao | −0.62 | −0.60 | −0.78 | −0.97 | −0.08 | −0.43 | −0.41 |
| 138 | Rakan | −0.62 | −1.00 | −1.00 | +0.01 | −0.19 | −1.00 | +0.23 |
| 139 | Vi | −0.62 | −1.00 | −0.17 | −1.00 | −0.12 | −1.00 | −0.22 |
| 140 | Sion | −0.67 | −0.97 | −1.00 | −0.50 | +0.06 | −0.92 | +0.01 |
| 141 | Pantheon | −0.70 | −1.00 | −1.00 | −1.00 | −0.03 | +0.00 | +0.16 |
| 142 | Zaahen | −0.72 | −1.00 | −1.00 | −0.92 | +0.09 | −0.58 | +0.23 |
| 143 | Sivir | −0.73 | −1.00 | −1.00 | −0.94 | −0.02 | – | +0.63 |
| 144 | Ekko | −0.73 | −0.95 | −0.93 | −0.95 | −0.13 | −0.45 | −0.11 |
| 145 | Aatrox | −0.74 | −0.99 | −1.00 | −1.00 | −0.22 | +0.00 | −0.07 |
| 146 | Cho'Gath | −0.75 | −0.93 | −0.97 | −0.75 | −0.10 | −1.00 | −0.17 |
| 147 | Alistar | −0.75 | −0.91 | −1.00 | −0.91 | +0.02 | −1.00 | +0.11 |
| 148 | Nilah | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | −0.66 | +0.10 |
| 149 | Yone | −0.78 | −0.97 | −0.87 | −1.00 | −0.03 | −0.82 | −0.60 |
| 150 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.11 |
| 151 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.02 |
| 152 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.57 |
| 153 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.10 |
| 154 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.33 |
| 155 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.21 |
| 156 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.05 |
| 157 | Leona | −0.80 | −0.89 | −1.00 | −1.00 | −0.07 | −1.00 | −0.31 |
| 158 | Rumble | −0.80 | −0.94 | −1.00 | −1.00 | −0.13 | −1.00 | −0.01 |
| 159 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.11 |
| 160 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.34 |
| 161 | Singed | −0.81 | −1.00 | −1.00 | −0.91 | −0.25 | −1.00 | +0.24 |
| 162 | Garen | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.02 |
| 163 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.23 |
| 164 | Fiddlesticks | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.35 |
| 165 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.18 |
| 166 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.21 |
| 167 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.13 |
| 168 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | −0.04 |
| 169 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.26 |
| 170 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.07 |
| 171 | Nautilus | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.54 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.46 | −1.00 | −0.08 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Morgana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Morgana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Morgana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +0.80)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Morgana Q Dark Binding)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Morgana R Soul Shackles)
- Watch out: Black Shield makes Morgana immune to Yuumi's Final Chapter (slow).

#### 2. Master Yi (net +0.79)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. (Master Yi Q Alpha Strike → Morgana R Soul Shackles)
- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. (Master Yi Q Alpha Strike → Morgana Q Dark Binding)
- **0.11** cleanse: Highlander cleanses Morgana's Soul Shackles (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove stun. (Master Yi R Highlander → Morgana R Soul Shackles)
- Watch out: Morgana's basic attacks reach 275 units farther than Master Yi's (450 vs 175 attack range).

#### 3. Vladimir (net +0.67)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Morgana's Soul Shackles. Untargetable for 2 s, long enough to use ahead of Soul Shackles. (Vladimir W Sanguine Pool → Morgana R Soul Shackles)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Morgana's Dark Binding. Untargetable for 2 s, long enough to use ahead of Dark Binding. (Vladimir W Sanguine Pool → Morgana Q Dark Binding)
- Watch out: Black Shield makes Morgana immune to Vladimir's Sanguine Pool (slow).

#### 4. Sivir (net +0.65)

- **0.51** spell shield: Spell Shield's spell shield blocks Morgana's Dark Binding. Spell shield for 1.5 s, long enough to use ahead of Dark Binding. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Morgana Q Dark Binding)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Morgana's Soul Shackles. Spell shield for 1.5 s, long enough to use ahead of Soul Shackles. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the tether's application and initial damage but not the aftereffects of one already applied. (Sivir E Spell Shield → Morgana R Soul Shackles)

#### 5. Kayle (net +0.61)

- **0.32** range: Kayle's basic attacks reach 175 units farther than Morgana's (625 vs 450 attack range). Morgana has no dash or blink to close the gap. (Kayle basic attacks → Morgana basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Morgana's Soul Shackles (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Soul Shackles. (Kayle R Divine Judgment → Morgana R Soul Shackles)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Morgana's Dark Binding (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dark Binding. (Kayle R Divine Judgment → Morgana Q Dark Binding)
- Watch out: Black Shield makes Morgana immune to Kayle's Radiant Blast (slow).

#### 6. Zed (net +0.51)

- **0.55** untargetable: Death Mark makes Zed untargetable, dodging Morgana's Soul Shackles. Untargetable for 0.6 s; Soul Shackles takes 0.35 s to land, enough to react. (Zed R Death Mark → Morgana R Soul Shackles)
- **0.32** untargetable: Death Mark makes Zed untargetable, dodging Morgana's Dark Binding. Untargetable for 0.6 s; Dark Binding takes 1.33 s to land, enough to react. (Zed R Death Mark → Morgana Q Dark Binding)
- Watch out: Morgana's basic attacks reach 325 units farther than Zed's (450 vs 125 attack range).

#### 7. Gwen (net +0.49)

- **0.55** untargetable: Hallowed Mist makes Gwen untargetable, dodging Morgana's Soul Shackles. Untargetable for ?; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Morgana R Soul Shackles)
- **0.51** untargetable: Hallowed Mist makes Gwen untargetable, dodging Morgana's Dark Binding. Untargetable for ?; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Morgana Q Dark Binding)
- Watch out: Morgana's basic attacks reach 300 units farther than Gwen's (450 vs 150 attack range).

#### 8. Aurora (net +0.46)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Morgana's Soul Shackles. Untargetable for 0.4 s; Soul Shackles takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Morgana R Soul Shackles)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Morgana's Dark Binding. Untargetable for 0.4 s; Dark Binding takes 1.33 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Morgana Q Dark Binding)
- **0.14** range: Aurora's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range). Morgana has no dash or blink to close the gap. (Aurora basic attacks → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Aurora's Between Worlds (slow).

#### 9. Xayah (net +0.36)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Morgana's Soul Shackles. Untargetable for 1.5 s, long enough to use ahead of Soul Shackles. (Xayah R Featherstorm → Morgana R Soul Shackles)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Morgana's Dark Binding. Untargetable for 1.5 s, long enough to use ahead of Dark Binding. (Xayah R Featherstorm → Morgana Q Dark Binding)
- **0.14** range: Xayah's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range). Morgana has no dash or blink to close the gap. (Xayah basic attacks → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Xayah's Bladecaller (root).

#### 10. Fiora (net +0.32)

- **0.65** parry: Riposte parries Morgana's Soul Shackles and stuns back. Parry for 0.75 s; Soul Shackles takes 0.35 s to land, enough to react. Negating Soul Shackles's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Morgana R Soul Shackles)
- **0.64** parry: Riposte parries Morgana's Dark Binding and stuns back. Parry for 0.75 s; Dark Binding takes 1.33 s to land, enough to react. Negating Dark Binding's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Morgana Q Dark Binding)
- **0.06** attack speed slow: Riposte cuts Morgana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Morgana basic attacks)
- Watch out: Black Shield makes Morgana immune to Fiora's Riposte (cripple, slow, stun).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +0.80 | 0.98 | 0.18 |  |
| 2 | Master Yi | +0.79 | 0.95 | 0.16 |  |
| 3 | Vladimir | +0.67 | 0.82 | 0.15 |  |
| 4 | Sivir | +0.65 | 0.65 | 0.00 |  |
| 5 | Kayle | +0.61 | 0.69 | 0.08 |  |
| 6 | Zed | +0.51 | 0.71 | 0.20 |  |
| 7 | Gwen | +0.49 | 0.81 | 0.32 |  |
| 8 | Aurora | +0.46 | 0.85 | 0.39 |  |
| 9 | Xayah | +0.36 | 0.85 | 0.49 |  |
| 10 | Fiora | +0.32 | 0.99 | 0.67 |  |
| 11 | Rek'Sai | +0.26 | 0.72 | 0.46 |  |
| 12 | Olaf | +0.25 | 0.72 | 0.47 |  |
| 13 | Samira | +0.22 | 0.57 | 0.35 | projectile block (Blade Whirl) |
| 14 | Milio | +0.17 | 0.71 | 0.54 |  |
| 15 | Corki | +0.16 | 0.16 | 0.00 |  |
| 16 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 17 | Mel | +0.15 | 0.67 | 0.52 | projectile block (Rebuttal) |
| 18 | Zeri | +0.14 | 0.22 | 0.08 |  |
| 19 | Udyr | +0.11 | 0.98 | 0.87 |  |
| 20 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 21 | Gangplank | +0.10 | 0.68 | 0.58 |  |
| 22 | Kayn | +0.09 | 0.72 | 0.63 |  |
| 23 | Yunara | +0.08 | 0.22 | 0.14 |  |
| 24 | Miss Fortune | +0.06 | 0.16 | 0.10 |  |
| 25 | Fizz | +0.03 | 0.98 | 0.95 |  |
| 26 | Kai'Sa | +0.03 | 0.14 | 0.11 |  |
| 27 | Twitch | +0.02 | 0.21 | 0.19 |  |
| 28 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 29 | Teemo | -0.02 | 0.31 | 0.33 |  |
| 30 | Smolder | -0.03 | 0.16 | 0.19 |  |
| 31 | Evelynn | -0.06 | 0.72 | 0.78 |  |
| 32 | Katarina | -0.07 | 0.12 | 0.19 |  |
| 33 | Kindred | -0.08 | 0.00 | 0.08 |  |
| 34 | Kog'Maw | -0.10 | 0.00 | 0.10 |  |
| 35 | Nocturne | -0.11 | 0.77 | 0.88 |  |
| 36 | Graves | -0.11 | 0.00 | 0.11 |  |
| 37 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 38 | Akshan | -0.14 | 0.00 | 0.14 |  |
| 39 | Garen | -0.16 | 0.36 | 0.52 |  |
| 40 | Zaahen | -0.21 | 0.72 | 0.93 |  |
| 41 | Lissandra | -0.24 | 0.83 | 1.07 |  |
| 42 | Caitlyn | -0.24 | 0.36 | 0.60 |  |
| 43 | Nasus | -0.24 | 0.24 | 0.48 |  |
| 44 | Annie | -0.24 | 0.19 | 0.43 |  |
| 45 | Bard | -0.25 | 0.72 | 0.97 |  |
| 46 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 47 | Twisted Fate | -0.28 | 0.16 | 0.44 |  |
| 48 | Rengar | -0.29 | 0.78 | 1.07 |  |
| 49 | Kennen | -0.29 | 0.14 | 0.43 |  |
| 50 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 51 | Akali | -0.30 | 0.00 | 0.30 |  |
| 52 | Shaco | -0.32 | 0.72 | 1.04 |  |
| 53 | Naafiri | -0.33 | 0.00 | 0.33 |  |
| 54 | Kalista | -0.34 | 0.65 | 0.99 |  |
| 55 | Talon | -0.34 | 0.00 | 0.34 |  |
| 56 | Braum | -0.35 | 0.87 | 1.22 | projectile block (Unbreakable) |
| 57 | LeBlanc | -0.37 | 0.08 | 0.45 |  |
| 58 | Locke | -0.37 | 0.00 | 0.37 |  |
| 59 | Elise | -0.38 | 0.16 | 0.54 |  |
| 60 | Zilean | -0.39 | 0.16 | 0.55 |  |
| 61 | Malzahar | -0.40 | 0.49 | 0.89 |  |
| 62 | Ryze | -0.40 | 0.12 | 0.52 |  |
| 63 | Brand | -0.40 | 0.11 | 0.51 |  |
| 64 | Pantheon | -0.41 | 0.41 | 0.82 |  |
| 65 | Tristana | -0.42 | 0.45 | 0.87 |  |
| 66 | Draven | -0.42 | 0.18 | 0.60 |  |
| 67 | Kassadin | -0.42 | 0.00 | 0.42 |  |
| 68 | Lux | -0.44 | 0.14 | 0.58 |  |
| 69 | Jax | -0.46 | 0.25 | 0.71 |  |
| 70 | Vex | -0.47 | 0.13 | 0.60 |  |
| 71 | Jinx | -0.47 | 0.11 | 0.58 |  |
| 72 | Dr. Mundo | -0.47 | 0.00 | 0.47 |  |
| 73 | Zoe | -0.49 | 0.16 | 0.65 |  |
| 74 | Ahri | -0.49 | 0.11 | 0.60 |  |
| 75 | Senna | -0.50 | 0.24 | 0.74 |  |
| 76 | Quinn | -0.50 | 0.14 | 0.64 |  |
| 77 | Maokai | -0.52 | 0.98 | 1.50 |  |
| 78 | Xerath | -0.52 | 0.10 | 0.62 |  |
| 79 | Kha'Zix | -0.52 | 0.00 | 0.52 |  |
| 80 | Vayne | -0.53 | 0.21 | 0.74 |  |
| 81 | Veigar | -0.53 | 0.12 | 0.65 |  |
| 82 | Vel'Koz | -0.53 | 0.10 | 0.63 |  |
| 83 | Swain | -0.54 | 0.08 | 0.62 |  |
| 84 | Lulu | -0.55 | 0.40 | 0.95 |  |
| 85 | Varus | -0.56 | 0.29 | 0.85 |  |
| 86 | Ashe | -0.56 | 0.27 | 0.83 |  |
| 87 | Jhin | -0.57 | 0.13 | 0.70 |  |
| 88 | Rumble | -0.57 | 0.00 | 0.57 |  |
| 89 | Sona | -0.59 | 0.21 | 0.80 |  |
| 90 | Ekko | -0.59 | 0.00 | 0.59 |  |
| 91 | Jayce | -0.59 | 0.00 | 0.59 |  |
| 92 | Syndra | -0.60 | 0.11 | 0.71 |  |
| 93 | Kled | -0.61 | 0.68 | 1.29 |  |
| 94 | Soraka | -0.61 | 0.13 | 0.74 |  |
| 95 | Sion | -0.64 | 0.73 | 1.37 |  |
| 96 | Alistar | -0.64 | 0.57 | 1.21 |  |
| 97 | Ziggs | -0.65 | 0.13 | 0.78 |  |
| 98 | Yasuo | -0.67 | 0.66 | 1.33 | projectile block (Wind Wall) |
| 99 | Viktor | -0.67 | 0.12 | 0.79 |  |
| 100 | Bel'Veth | -0.67 | 0.00 | 0.67 |  |
| 101 | Karma | -0.68 | 0.08 | 0.76 |  |
| 102 | Renekton | -0.68 | 0.00 | 0.68 |  |
| 103 | Warwick | -0.70 | 0.72 | 1.42 |  |
| 104 | Heimerdinger | -0.70 | 0.16 | 0.86 |  |
| 105 | Ivern | -0.70 | 0.00 | 0.70 |  |
| 106 | Shen | -0.71 | 0.24 | 0.95 |  |
| 107 | Nilah | -0.71 | 0.22 | 0.93 |  |
| 108 | Fiddlesticks | -0.71 | 0.00 | 0.71 |  |
| 109 | Azir | -0.74 | 0.10 | 0.84 |  |
| 110 | Orianna | -0.74 | 0.10 | 0.84 |  |
| 111 | Irelia | -0.76 | 0.00 | 0.76 |  |
| 112 | Anivia | -0.77 | 0.18 | 0.95 |  |
| 113 | Camille | -0.79 | 0.72 | 1.51 |  |
| 114 | Aatrox | -0.79 | 0.00 | 0.79 |  |
| 115 | Hwei | -0.81 | 0.11 | 0.92 |  |
| 116 | Singed | -0.82 | 0.18 | 1.00 |  |
| 117 | Cassiopeia | -0.83 | 0.11 | 0.94 |  |
| 118 | Mordekaiser | -0.83 | 0.06 | 0.89 |  |
| 119 | Aphelios | -0.84 | 0.25 | 1.09 |  |
| 120 | Xin Zhao | -0.86 | 0.36 | 1.22 |  |
| 121 | Sylas | -0.90 | 0.00 | 0.90 |  |
| 122 | Lillia | -0.92 | 0.00 | 0.92 |  |
| 123 | Zyra | -0.94 | 0.15 | 1.09 |  |
| 124 | Nami | -0.94 | 0.11 | 1.05 |  |
| 125 | Thresh | -0.94 | 0.00 | 0.94 |  |
| 126 | Cho'Gath | -0.95 | 0.00 | 0.95 |  |
| 127 | Janna | -0.96 | 0.18 | 1.14 |  |
| 128 | Taric | -0.96 | 0.00 | 0.96 |  |
| 129 | Yorick | -0.97 | 0.00 | 0.97 |  |
| 130 | Renata Glasc | -0.98 | 0.19 | 1.17 |  |
| 131 | Seraphine | -0.98 | 0.11 | 1.09 |  |
| 132 | Diana | -0.98 | 0.00 | 0.98 |  |
| 133 | Lee Sin | -0.98 | 0.00 | 0.98 |  |
| 134 | Shyvana | -1.00 | 0.00 | 1.00 |  |
| 135 | Aurelion Sol | -1.03 | 0.11 | 1.14 |  |
| 136 | Trundle | -1.04 | 0.00 | 1.04 |  |
| 137 | Volibear | -1.04 | 0.00 | 1.04 |  |
| 138 | Neeko | -1.07 | 0.11 | 1.18 |  |
| 139 | Darius | -1.07 | 0.00 | 1.07 |  |
| 140 | Malphite | -1.09 | 0.16 | 1.25 |  |
| 141 | Gnar | -1.09 | 0.00 | 1.09 |  |
| 142 | Wukong | -1.11 | 0.00 | 1.11 |  |
| 143 | Ambessa | -1.17 | 0.00 | 1.17 |  |
| 144 | Nunu & Willump | -1.18 | 0.17 | 1.35 |  |
| 145 | Rakan | -1.25 | 0.00 | 1.25 |  |
| 146 | Riven | -1.25 | 0.00 | 1.25 |  |
| 147 | Rammus | -1.26 | 0.24 | 1.50 |  |
| 148 | Urgot | -1.28 | 0.00 | 1.28 |  |
| 149 | Pyke | -1.29 | 0.00 | 1.29 |  |
| 150 | Taliyah | -1.31 | 0.10 | 1.41 |  |
| 151 | Poppy | -1.32 | 0.00 | 1.32 |  |
| 152 | Skarner | -1.35 | 0.07 | 1.42 |  |
| 153 | Jarvan IV | -1.35 | 0.00 | 1.35 |  |
| 154 | Yone | -1.36 | 0.00 | 1.36 |  |
| 155 | Qiyana | -1.37 | 0.00 | 1.37 |  |
| 156 | Tahm Kench | -1.37 | 0.00 | 1.37 |  |
| 157 | Blitzcrank | -1.38 | 0.00 | 1.38 |  |
| 158 | Nautilus | -1.39 | 0.00 | 1.39 |  |
| 159 | Leona | -1.41 | 0.00 | 1.41 |  |
| 160 | Amumu | -1.44 | 0.00 | 1.44 |  |
| 161 | Vi | -1.44 | 0.00 | 1.44 |  |
| 162 | Zac | -1.45 | 0.00 | 1.45 |  |
| 163 | Gragas | -1.46 | 0.00 | 1.46 |  |
| 164 | Sett | -1.46 | 0.00 | 1.46 |  |
| 165 | Briar | -1.51 | 0.00 | 1.51 |  |
| 166 | Hecarim | -1.51 | 0.00 | 1.51 |  |
| 167 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 168 | Viego | -1.53 | 0.00 | 1.53 |  |
| 169 | Ornn | -1.57 | 0.00 | 1.57 |  |
| 170 | K'Sante | -1.59 | 0.00 | 1.59 |  |
| 171 | Rell | -1.60 | 0.00 | 1.60 |  |
| 172 | Galio | -1.61 | 0.00 | 1.61 |  |
