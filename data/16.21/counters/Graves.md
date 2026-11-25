# Counters to Graves (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Graves: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Graves wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Graves --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Malphite | +0.86 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.62 |
| 2 | Garen | +0.86 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.67 |
| 3 | Kled | +0.85 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.67 |
| 4 | Yasuo | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.99 |
| 5 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.94 |
| 6 | Jax | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.95 |
| 7 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.75 |
| 8 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.94 |
| 9 | Tryndamere | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.94 |
| 10 | Maokai | +0.84 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.51 |
| 11 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.81 |
| 12 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.95 |
| 13 | Camille | +0.83 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.86 |
| 14 | Darius | +0.83 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.85 |
| 15 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.94 |
| 16 | Taric | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.20 |
| 17 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.89 |
| 18 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.92 |
| 19 | Nocturne | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +1.00 |
| 20 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.97 |
| 21 | Orianna | +0.82 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.42 |
| 22 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.90 |
| 23 | Shaco | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.47 |
| 24 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.68 |
| 25 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.52 |
| 26 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | −0.28 | +1.00 | +0.86 |
| 27 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.34 |
| 28 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.05 |
| 29 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.10 |
| 30 | Zac | +0.77 | +0.95 | +1.00 | +1.00 | −0.13 | +1.00 | +0.15 |
| 31 | Urgot | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.47 |
| 32 | Samira | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.09 |
| 33 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.25 |
| 34 | Zaahen | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | +0.27 | +0.92 |
| 35 | Karma | +0.73 | +0.96 | +0.94 | +0.94 | −0.07 | +0.73 | +0.14 |
| 36 | Varus | +0.73 | +1.00 | +0.76 | +0.97 | −0.10 | +1.00 | +0.17 |
| 37 | Mordekaiser | +0.70 | +0.75 | +0.88 | +1.00 | −0.28 | +0.98 | +0.67 |
| 38 | Braum | +0.68 | +1.00 | +0.95 | +0.96 | −0.10 | −0.12 | +0.46 |
| 39 | Tahm Kench | +0.66 | +0.88 | +1.00 | +1.00 | −0.20 | +0.03 | +0.36 |
| 40 | Illaoi | +0.64 | +0.92 | +0.96 | +0.78 | −0.03 | −0.13 | +0.63 |
| 41 | Miss Fortune | +0.62 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.29 |
| 42 | Renekton | +0.61 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.54 |
| 43 | Lulu | +0.59 | +1.00 | +1.00 | +1.00 | −0.07 | −1.00 | +0.09 |
| 44 | Janna | +0.53 | +1.00 | +0.81 | +1.00 | −0.10 | −1.00 | −0.07 |
| 45 | Zeri | +0.49 | +0.00 | +1.00 | +1.00 | −0.05 | +0.00 | +0.87 |
| 46 | Vi | +0.47 | +0.00 | +1.00 | +1.00 | −0.10 | +0.00 | +0.60 |
| 47 | Ashe | +0.42 | +1.00 | +1.00 | −1.00 | −0.12 | +1.00 | +0.68 |
| 48 | Aatrox | +0.37 | +1.00 | +1.00 | −1.00 | −0.32 | +1.00 | +0.46 |
| 49 | Aphelios | +0.36 | +1.00 | +1.00 | −1.00 | −0.22 | +1.00 | −0.04 |
| 50 | Master Yi | +0.36 | +1.00 | +0.00 | +1.00 | −0.18 | −1.00 | +0.76 |
| 51 | Warwick | +0.33 | −1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.82 |
| 52 | Volibear | +0.32 | +0.99 | −1.00 | +1.00 | −0.17 | +1.00 | +0.93 |
| 53 | Diana | +0.31 | +1.00 | −1.00 | +1.00 | −0.04 | +1.00 | +0.37 |
| 54 | Wukong | +0.31 | +1.00 | −1.00 | +1.00 | −0.23 | +1.00 | +0.92 |
| 55 | Akshan | +0.31 | +1.00 | +1.00 | −1.00 | −0.23 | – | +0.21 |
| 56 | Kog'Maw | +0.24 | +0.00 | +0.00 | +1.00 | −0.00 | – | +0.41 |
| 57 | Rumble | +0.23 | +0.95 | −1.00 | +0.86 | −0.01 | +0.43 | +0.60 |
| 58 | Kayle | +0.20 | +1.00 | +1.00 | −1.00 | −0.00 | −1.00 | +0.06 |
| 59 | Heimerdinger | +0.14 | −0.74 | +0.63 | +0.91 | +0.13 | −0.35 | +0.09 |
| 60 | Sion | +0.03 | +0.00 | +0.00 | +0.00 | −0.03 | +0.00 | +0.67 |
| 61 | Anivia | +0.02 | +0.02 | −0.03 | +0.15 | −0.22 | +0.15 | +0.25 |
| 62 | Quinn | −0.00 | −1.00 | +0.69 | +1.00 | −0.18 | −1.00 | +0.06 |
| 63 | Vel'Koz | −0.01 | −1.00 | +0.51 | +0.05 | +0.02 | +0.90 | +0.25 |
| 64 | Gwen | −0.10 | −1.00 | +1.00 | −1.00 | −0.29 | +1.00 | +0.95 |
| 65 | Smolder | −0.17 | −1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.64 |
| 66 | Yone | −0.19 | −1.00 | −1.00 | +1.00 | −0.12 | +1.00 | +0.60 |
| 67 | Jhin | −0.20 | +0.92 | −0.94 | −0.94 | +0.00 | +0.00 | −0.10 |
| 68 | Xin Zhao | −0.21 | −1.00 | −1.00 | +1.00 | −0.23 | +0.93 | +0.66 |
| 69 | Fiddlesticks | −0.22 | +1.00 | −1.00 | −1.00 | −0.07 | – | +0.20 |
| 70 | Ambessa | −0.27 | −1.00 | −1.00 | +1.00 | −0.11 | +0.00 | +0.92 |
| 71 | Caitlyn | −0.28 | −1.00 | −1.00 | +1.00 | −0.30 | +0.71 | −0.12 |
| 72 | Tristana | −0.29 | −1.00 | +1.00 | −1.00 | −0.14 | −1.00 | +0.61 |
| 73 | Lee Sin | −0.30 | −1.00 | −1.00 | +1.00 | −0.19 | +0.00 | +0.64 |
| 74 | Kennen | −0.36 | −1.00 | −1.00 | +1.00 | −0.02 | −0.96 | +0.72 |
| 75 | Elise | −0.38 | −1.00 | −1.00 | +1.00 | +0.18 | −1.00 | −0.04 |
| 76 | Ezreal | −0.42 | −1.00 | −1.00 | +0.77 | −0.24 | −0.32 | −0.05 |
| 77 | Twisted Fate | −0.43 | −1.00 | −1.00 | +1.00 | −0.14 | −1.00 | −0.11 |
| 78 | Milio | −0.43 | −1.00 | −1.00 | +1.00 | −0.18 | −1.00 | −0.02 |
| 79 | Kai'Sa | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | −0.05 |
| 80 | Swain | −0.43 | −0.12 | −1.00 | −0.58 | −0.12 | −0.12 | −0.09 |
| 81 | Azir | −0.44 | −1.00 | −1.00 | +1.00 | −0.30 | −1.00 | +0.09 |
| 82 | Vex | −0.50 | −1.00 | −0.57 | −0.05 | −0.10 | −1.00 | +0.38 |
| 83 | Twitch | −0.51 | −1.00 | −1.00 | +0.50 | −0.05 | −1.00 | −0.04 |
| 84 | Shen | −0.53 | −1.00 | +0.00 | −1.00 | −0.04 | −1.00 | +0.48 |
| 85 | Gragas | −0.54 | −0.06 | −1.00 | −1.00 | +0.01 | −1.00 | +0.53 |
| 86 | Neeko | −0.54 | −1.00 | −1.00 | +0.29 | −0.01 | −1.00 | +0.03 |
| 87 | Ziggs | −0.56 | −1.00 | −1.00 | +0.00 | +0.23 | −1.00 | +0.16 |
| 88 | Sylas | −0.57 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.55 |
| 89 | Mel | −0.57 | −1.00 | −1.00 | +0.30 | −0.26 | −1.00 | +0.12 |
| 90 | Sona | −0.58 | −1.00 | +0.00 | −1.00 | −0.32 | −1.00 | +0.43 |
| 91 | Annie | −0.59 | −1.00 | −1.00 | +0.00 | −0.03 | −1.00 | +0.19 |
| 92 | Kalista | −0.61 | −1.00 | −1.00 | −1.00 | −0.14 | +1.00 | +0.22 |
| 93 | Corki | −0.62 | −1.00 | −1.00 | −1.00 | −0.14 | +1.00 | +0.01 |
| 94 | Riven | −0.65 | −1.00 | −1.00 | −0.50 | +0.06 | −1.00 | +0.91 |
| 95 | Rammus | −0.69 | −1.00 | −1.00 | −1.00 | −0.15 | +0.00 | +0.68 |
| 96 | Jinx | −0.69 | −1.00 | −0.81 | −1.00 | −0.21 | −0.10 | −0.02 |
| 97 | Draven | −0.72 | −1.00 | −1.00 | −1.00 | −0.20 | −0.04 | +0.19 |
| 98 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.81 |
| 99 | Lucian | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.41 |
| 100 | Hwei | −0.76 | −1.00 | −1.00 | −0.70 | −0.15 | −1.00 | +0.04 |
| 101 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.42 |
| 102 | Lillia | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.59 |
| 103 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.65 |
| 104 | Thresh | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.49 |
| 105 | Sivir | −0.77 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.55 |
| 106 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.72 |
| 107 | Bel'Veth | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.89 |
| 108 | Aurelion Sol | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.03 |
| 109 | Nilah | −0.77 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.82 |
| 110 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.67 |
| 111 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.50 |
| 112 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.37 |
| 113 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.78 |
| 114 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.55 |
| 115 | Jayce | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.54 |
| 116 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.42 |
| 117 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.31 |
| 118 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.23 |
| 119 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.09 |
| 120 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.32 |
| 121 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.61 |
| 122 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.47 |
| 123 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.83 |
| 124 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.26 |
| 125 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.07 |
| 126 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.73 |
| 127 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.75 |
| 128 | Ryze | −0.79 | −1.00 | −1.00 | −0.88 | −0.05 | −1.00 | −0.09 |
| 129 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.58 |
| 130 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.58 |
| 131 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.03 |
| 132 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.65 |
| 133 | Rengar | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.56 |
| 134 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.58 |
| 135 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.17 |
| 136 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.31 |
| 137 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.42 |
| 138 | Soraka | −0.80 | −1.00 | −1.00 | −0.89 | −0.09 | −1.00 | −0.11 |
| 139 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.04 |
| 140 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.51 |
| 141 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.34 |
| 142 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.64 |
| 143 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.08 |
| 144 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.56 |
| 145 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.15 |
| 146 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.63 |
| 147 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.48 |
| 148 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.30 |
| 149 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.53 |
| 150 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.20 |
| 151 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.01 |
| 152 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.01 |
| 153 | Zilean | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.23 |
| 154 | Brand | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.02 |
| 155 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.40 |
| 156 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.51 |
| 157 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.17 |
| 158 | Yunara | −0.82 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.12 |
| 159 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.30 |
| 160 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.06 |
| 161 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.02 |
| 162 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.40 | – | +0.40 |
| 163 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.23 |
| 164 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.16 |
| 165 | Nautilus | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | +0.38 |
| 166 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.10 |
| 167 | Morgana | −0.84 | −1.00 | −1.00 | −1.00 | −0.35 | – | −0.04 |
| 168 | Ahri | −0.84 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.23 |
| 169 | Seraphine | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 170 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.45 | −1.00 | +0.44 |
| 171 | Renata Glasc | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −0.01 |
| 172 | Pyke | −0.89 | −1.00 | −1.00 | −1.00 | −0.62 | −1.00 | +0.14 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Graves's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Graves's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Graves` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +1.03)

- **0.70** projectile block: Rebuttal blocks Graves's Collateral Damage, a projectile. Rebuttal for 0.75 s; Collateral Damage takes 0.77 s to land, enough to react. (Mel W Rebuttal → Graves R Collateral Damage)
- **0.37** projectile block: Rebuttal blocks Graves's Smoke Screen, a projectile. Rebuttal for 0.75 s; Smoke Screen takes 0.88 s to land, enough to react. (Mel W Rebuttal → Graves W Smoke Screen)
- **0.27** projectile block: Rebuttal blocks Graves's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Graves basic attacks)

#### 2. Samira (net +1.02)

- **0.70** projectile block: Blade Whirl blocks Graves's Collateral Damage, a projectile. Blade Whirl for 0.75 s; Collateral Damage takes 0.77 s to land, enough to react. (Samira W Blade Whirl → Graves R Collateral Damage)
- **0.40** projectile block: Blade Whirl blocks Graves's Smoke Screen, a projectile. Blade Whirl for 0.75 s; Smoke Screen takes 0.88 s to land, enough to react. (Samira W Blade Whirl → Graves W Smoke Screen)
- **0.27** projectile block: Blade Whirl blocks Graves's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Graves basic attacks)

#### 3. Yasuo (net +0.89)

- **0.70** projectile block: Wind Wall blocks Graves's Collateral Damage, a projectile. Wind Wall for 4 s, long enough to use ahead of Collateral Damage. (Yasuo W Wind Wall → Graves R Collateral Damage)
- **0.45** projectile block: Wind Wall blocks Graves's Smoke Screen, a projectile. Wind Wall for 4 s, long enough to use ahead of Smoke Screen. (Yasuo W Wind Wall → Graves W Smoke Screen)
- **0.35** projectile block: Wind Wall blocks Graves's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Graves basic attacks)
- Watch out: Graves's basic attacks reach 250 units farther than Yasuo's (425 vs 175 attack range).

#### 4. Lissandra (net +0.84)

- **0.60** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Graves's Collateral Damage. Untargetable for 2.5 s, long enough to use ahead of Collateral Damage. (Lissandra R Frozen Tomb → Graves R Collateral Damage)
- **0.30** dash stop: Frozen Tomb's knockdown can stop Graves's Collateral Damage mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Graves R Collateral Damage)
- **0.15** dash stop: Frozen Tomb's knockdown can stop Graves's Quickdraw mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Graves E Quickdraw)

#### 5. Braum (net +0.82)

- **0.70** projectile block: Unbreakable blocks Graves's Collateral Damage, a projectile. Unbreakable for 4 s, long enough to use ahead of Collateral Damage. (Braum E Unbreakable → Graves R Collateral Damage)
- **0.45** projectile block: Unbreakable blocks Graves's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Graves basic attacks)
- **0.45** projectile block: Unbreakable blocks Graves's Smoke Screen, a projectile. Unbreakable for 4 s, long enough to use ahead of Smoke Screen. (Braum E Unbreakable → Graves W Smoke Screen)
- Watch out: Graves's basic attacks reach 300 units farther than Braum's (425 vs 125 attack range).

#### 6. Kayle (net +0.72)

- **0.60** invulnerable: Divine Judgment makes Kayle invulnerable to Graves's Collateral Damage. Invulnerable for 2.5 s, long enough to use ahead of Collateral Damage. (Kayle R Divine Judgment → Graves R Collateral Damage)
- **0.12** range: Kayle's basic attacks reach 200 units farther than Graves's (625 vs 425 attack range). Graves closes the gap with Collateral Damage, Quickdraw. (Kayle basic attacks → Graves basic attacks)

#### 7. Vladimir (net +0.70)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Graves's Collateral Damage. Untargetable for 2 s, long enough to use ahead of Collateral Damage. (Vladimir W Sanguine Pool → Graves R Collateral Damage)

#### 8. Yuumi (net +0.70)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Graves's Collateral Damage. Untargetable for ?; Collateral Damage takes 0.77 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Graves R Collateral Damage)

#### 9. Bard (net +0.65)

- **0.60** untargetable: Tempered Fate makes Bard untargetable, dodging Graves's Collateral Damage. Untargetable for 2.5 s, long enough to use ahead of Collateral Damage. (Bard R Tempered Fate → Graves R Collateral Damage)
- **0.05** range: Bard's basic attacks reach 75 units farther than Graves's (500 vs 425 attack range). Graves closes the gap with Collateral Damage, Quickdraw. (Bard basic attacks → Graves basic attacks)

#### 10. Fizz (net +0.60)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Graves's Collateral Damage. Untargetable for 0.75 s; Collateral Damage takes 0.77 s to land, enough to react. (Fizz E Playful → Graves R Collateral Damage)
- Watch out: Graves's basic attacks reach 250 units farther than Fizz's (425 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.03 | 1.03 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Yasuo | +0.89 | 1.03 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Lissandra | +0.84 | 0.84 | 0.00 |  |
| 5 | Braum | +0.82 | 1.06 | 0.24 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Kayle | +0.72 | 0.72 | 0.00 |  |
| 7 | Vladimir | +0.70 | 0.70 | 0.00 |  |
| 8 | Yuumi | +0.70 | 0.70 | 0.00 |  |
| 9 | Bard | +0.65 | 0.65 | 0.00 |  |
| 10 | Fizz | +0.60 | 0.70 | 0.10 |  |
| 11 | Aurora | +0.59 | 0.59 | 0.00 |  |
| 12 | Xayah | +0.59 | 0.59 | 0.00 |  |
| 13 | Master Yi | +0.58 | 0.78 | 0.20 |  |
| 14 | Pantheon | +0.56 | 0.70 | 0.14 |  |
| 15 | Ahri | +0.55 | 0.55 | 0.00 |  |
| 16 | Hwei | +0.55 | 0.55 | 0.00 |  |
| 17 | Jinx | +0.55 | 0.55 | 0.00 |  |
| 18 | Viktor | +0.55 | 0.55 | 0.00 |  |
| 19 | Veigar | +0.54 | 0.54 | 0.00 |  |
| 20 | Vex | +0.54 | 0.54 | 0.00 |  |
| 21 | Fiora | +0.52 | 0.74 | 0.22 |  |
| 22 | Gwen | +0.48 | 0.70 | 0.22 |  |
| 23 | Teemo | +0.48 | 0.48 | 0.00 | blind (Blinding Dart) |
| 24 | Malzahar | +0.47 | 0.47 | 0.00 |  |
| 25 | Maokai | +0.46 | 0.70 | 0.24 |  |
| 26 | Kayn | +0.46 | 0.60 | 0.14 |  |
| 27 | Rek'Sai | +0.46 | 0.60 | 0.14 |  |
| 28 | Evelynn | +0.44 | 0.60 | 0.16 |  |
| 29 | Shaco | +0.44 | 0.60 | 0.16 |  |
| 30 | Camille | +0.44 | 0.56 | 0.12 |  |
| 31 | Cassiopeia | +0.43 | 0.43 | 0.00 |  |
| 32 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 33 | Zed | +0.37 | 0.53 | 0.16 |  |
| 34 | Lulu | +0.37 | 0.37 | 0.00 |  |
| 35 | Xin Zhao | +0.33 | 0.53 | 0.20 |  |
| 36 | Poppy | +0.31 | 0.55 | 0.24 |  |
| 37 | Zac | +0.30 | 0.50 | 0.20 |  |
| 38 | Yone | +0.28 | 0.38 | 0.10 |  |
| 39 | Warwick | +0.25 | 0.41 | 0.16 |  |
| 40 | Varus | +0.19 | 0.19 | 0.00 |  |
| 41 | Shen | +0.17 | 0.33 | 0.16 |  |
| 42 | Tristana | +0.16 | 0.16 | 0.00 |  |
| 43 | Nilah | +0.14 | 0.30 | 0.16 |  |
| 44 | Aphelios | +0.13 | 0.13 | 0.00 |  |
| 45 | Caitlyn | +0.13 | 0.13 | 0.00 |  |
| 46 | Milio | +0.12 | 0.12 | 0.00 |  |
| 47 | Jax | +0.11 | 0.35 | 0.24 |  |
| 48 | Nocturne | +0.11 | 0.35 | 0.24 |  |
| 49 | Ashe | +0.11 | 0.11 | 0.00 |  |
| 50 | Morgana | +0.11 | 0.11 | 0.00 |  |
| 51 | Amumu | +0.10 | 0.34 | 0.24 |  |
| 52 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 53 | Kalista | +0.09 | 0.09 | 0.00 |  |
| 54 | Senna | +0.09 | 0.09 | 0.00 |  |
| 55 | Sona | +0.09 | 0.09 | 0.00 |  |
| 56 | Twitch | +0.09 | 0.09 | 0.00 |  |
| 57 | Vayne | +0.09 | 0.09 | 0.00 |  |
| 58 | Yunara | +0.09 | 0.09 | 0.00 |  |
| 59 | Zeri | +0.09 | 0.09 | 0.00 |  |
| 60 | Rammus | +0.08 | 0.32 | 0.24 |  |
| 61 | Renata Glasc | +0.08 | 0.08 | 0.00 |  |
| 62 | Singed | +0.07 | 0.56 | 0.49 |  |
| 63 | Anivia | +0.07 | 0.07 | 0.00 |  |
| 64 | Annie | +0.07 | 0.07 | 0.00 |  |
| 65 | Corki | +0.07 | 0.07 | 0.00 |  |
| 66 | Draven | +0.07 | 0.07 | 0.00 |  |
| 67 | Elise | +0.07 | 0.07 | 0.00 |  |
| 68 | Ezreal | +0.07 | 0.07 | 0.00 |  |
| 69 | Janna | +0.07 | 0.07 | 0.00 |  |
| 70 | Miss Fortune | +0.07 | 0.07 | 0.00 |  |
| 71 | Smolder | +0.07 | 0.07 | 0.00 |  |
| 72 | Twisted Fate | +0.07 | 0.07 | 0.00 |  |
| 73 | Zilean | +0.07 | 0.07 | 0.00 |  |
| 74 | Zoe | +0.07 | 0.07 | 0.00 |  |
| 75 | Jhin | +0.06 | 0.06 | 0.00 |  |
| 76 | Kai'Sa | +0.06 | 0.06 | 0.00 |  |
| 77 | Kennen | +0.06 | 0.06 | 0.00 |  |
| 78 | Kindred | +0.06 | 0.06 | 0.00 |  |
| 79 | Lux | +0.06 | 0.06 | 0.00 |  |
| 80 | Quinn | +0.06 | 0.06 | 0.00 |  |
| 81 | Soraka | +0.06 | 0.06 | 0.00 |  |
| 82 | Ziggs | +0.06 | 0.06 | 0.00 |  |
| 83 | Zyra | +0.06 | 0.06 | 0.00 |  |
| 84 | Akshan | +0.05 | 0.05 | 0.00 |  |
| 85 | Aurelion Sol | +0.05 | 0.05 | 0.00 |  |
| 86 | Brand | +0.05 | 0.05 | 0.00 |  |
| 87 | Gnar | +0.05 | 0.05 | 0.00 |  |
| 88 | Lucian | +0.05 | 0.05 | 0.00 |  |
| 89 | Nami | +0.05 | 0.05 | 0.00 |  |
| 90 | Neeko | +0.05 | 0.05 | 0.00 |  |
| 91 | Nidalee | +0.05 | 0.05 | 0.00 |  |
| 92 | Ryze | +0.05 | 0.05 | 0.00 |  |
| 93 | Seraphine | +0.05 | 0.05 | 0.00 |  |
| 94 | Syndra | +0.05 | 0.05 | 0.00 |  |
| 95 | Azir | +0.04 | 0.04 | 0.00 |  |
| 96 | Jayce | +0.04 | 0.04 | 0.00 |  |
| 97 | Karma | +0.04 | 0.04 | 0.00 |  |
| 98 | Kog'Maw | +0.04 | 0.04 | 0.00 |  |
| 99 | LeBlanc | +0.04 | 0.04 | 0.00 |  |
| 100 | Orianna | +0.04 | 0.04 | 0.00 |  |
| 101 | Taliyah | +0.04 | 0.04 | 0.00 |  |
| 102 | Vel'Koz | +0.04 | 0.04 | 0.00 |  |
| 103 | Xerath | +0.04 | 0.04 | 0.00 |  |
| 104 | Swain | +0.03 | 0.03 | 0.00 |  |
| 105 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 106 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 107 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 108 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 109 | Kled | -0.01 | 0.06 | 0.07 |  |
| 110 | Malphite | -0.03 | 0.21 | 0.24 |  |
| 111 | Urgot | -0.06 | 0.00 | 0.06 |  |
| 112 | Rakan | -0.07 | 0.00 | 0.07 |  |
| 113 | Zaahen | -0.08 | 0.06 | 0.14 |  |
| 114 | Lillia | -0.08 | 0.00 | 0.08 |  |
| 115 | Viego | -0.09 | 0.00 | 0.09 |  |
| 116 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 117 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 118 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 119 | Katarina | -0.12 | 0.12 | 0.24 |  |
| 120 | Briar | -0.12 | 0.00 | 0.12 |  |
| 121 | Naafiri | -0.12 | 0.00 | 0.12 |  |
| 122 | Udyr | -0.13 | 0.11 | 0.24 |  |
| 123 | Hecarim | -0.14 | 0.00 | 0.14 |  |
| 124 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 125 | Ornn | -0.14 | 0.00 | 0.14 |  |
| 126 | Rell | -0.14 | 0.00 | 0.14 |  |
| 127 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 128 | Galio | -0.15 | 0.00 | 0.15 |  |
| 129 | Pyke | -0.15 | 0.00 | 0.15 |  |
| 130 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 131 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 132 | Nasus | -0.16 | 0.33 | 0.49 |  |
| 133 | Akali | -0.16 | 0.00 | 0.16 |  |
| 134 | Ambessa | -0.16 | 0.00 | 0.16 |  |
| 135 | Ekko | -0.16 | 0.00 | 0.16 |  |
| 136 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 137 | Riven | -0.16 | 0.00 | 0.16 |  |
| 138 | Talon | -0.16 | 0.00 | 0.16 |  |
| 139 | Vi | -0.16 | 0.00 | 0.16 |  |
| 140 | Irelia | -0.18 | 0.00 | 0.18 |  |
| 141 | Alistar | -0.19 | 0.05 | 0.24 |  |
| 142 | Aatrox | -0.20 | 0.00 | 0.20 |  |
| 143 | Nautilus | -0.20 | 0.00 | 0.20 |  |
| 144 | Tahm Kench | -0.20 | 0.00 | 0.20 |  |
| 145 | Tryndamere | -0.20 | 0.00 | 0.20 |  |
| 146 | Diana | -0.22 | 0.00 | 0.22 |  |
| 147 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 148 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 149 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 150 | Gragas | -0.24 | 0.00 | 0.24 |  |
| 151 | Illaoi | -0.24 | 0.00 | 0.24 |  |
| 152 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 153 | Leona | -0.24 | 0.00 | 0.24 |  |
| 154 | Locke | -0.24 | 0.00 | 0.24 |  |
| 155 | Renekton | -0.24 | 0.00 | 0.24 |  |
| 156 | Sett | -0.24 | 0.00 | 0.24 |  |
| 157 | Garen | -0.29 | 0.12 | 0.41 |  |
| 158 | Mordekaiser | -0.33 | 0.08 | 0.41 |  |
| 159 | Sion | -0.34 | 0.07 | 0.41 |  |
| 160 | Nunu & Willump | -0.35 | 0.14 | 0.49 |  |
| 161 | Skarner | -0.39 | 0.06 | 0.45 |  |
| 162 | Gangplank | -0.40 | 0.09 | 0.49 |  |
| 163 | Rengar | -0.40 | 0.09 | 0.49 |  |
| 164 | Darius | -0.41 | 0.00 | 0.41 |  |
| 165 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 166 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 167 | Olaf | -0.43 | 0.06 | 0.49 |  |
| 168 | Taric | -0.45 | 0.00 | 0.45 |  |
| 169 | Blitzcrank | -0.49 | 0.00 | 0.49 |  |
| 170 | Cho'Gath | -0.49 | 0.00 | 0.49 |  |
| 171 | Dr. Mundo | -0.49 | 0.00 | 0.49 |  |
| 172 | Rumble | -0.49 | 0.00 | 0.49 |  |
