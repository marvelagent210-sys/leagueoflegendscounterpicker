# Counters to Mel (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Mel: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Mel wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Mel --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.08 |
| 2 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.34 |
| 3 | Gangplank | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.56 |
| 4 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.94 |
| 5 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.86 |
| 6 | Zaahen | +0.84 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.44 |
| 7 | Warwick | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.43 |
| 8 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.81 |
| 9 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.88 |
| 10 | Volibear | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.55 |
| 11 | Sylas | +0.82 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.46 |
| 12 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.69 |
| 13 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.35 |
| 14 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.72 |
| 15 | Pantheon | +0.82 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.17 |
| 16 | Riven | +0.82 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.49 |
| 17 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.76 |
| 18 | Shyvana | +0.82 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.77 |
| 19 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.13 |
| 20 | Rammus | +0.81 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.40 |
| 21 | Wukong | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.34 |
| 22 | Vi | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.30 |
| 23 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.53 |
| 24 | Kassadin | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.32 |
| 25 | Mordekaiser | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.43 |
| 26 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.04 |
| 27 | Alistar | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.17 |
| 28 | Galio | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.07 |
| 29 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.16 |
| 30 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.69 |
| 31 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.48 |
| 32 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.27 |
| 33 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.67 |
| 34 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.41 |
| 35 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.05 |
| 36 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.60 |
| 37 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.11 |
| 38 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.17 |
| 39 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.30 |
| 40 | Ziggs | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.08 |
| 41 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +0.98 | +0.15 |
| 42 | Sion | +0.79 | +0.87 | +1.00 | +1.00 | −0.01 | +1.00 | +0.47 |
| 43 | Azir | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.10 |
| 44 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.17 |
| 45 | Aurora | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.27 |
| 46 | Rell | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | +0.63 | +0.14 |
| 47 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.06 |
| 48 | Tristana | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.01 |
| 49 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.06 |
| 50 | Fiddlesticks | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.11 |
| 51 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.31 |
| 52 | Twitch | +0.78 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.14 |
| 53 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.04 |
| 54 | Aphelios | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.17 |
| 55 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.13 |
| 56 | Lucian | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.21 |
| 57 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.20 |
| 58 | Zilean | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.08 |
| 59 | Neeko | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.25 |
| 60 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.01 |
| 61 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | −0.06 |
| 62 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.11 |
| 63 | Milio | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.22 |
| 64 | Miss Fortune | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.13 |
| 65 | Smolder | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.01 |
| 66 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.01 |
| 67 | Swain | +0.76 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.07 |
| 68 | Zoe | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.02 |
| 69 | Gnar | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | +0.77 | −0.07 |
| 70 | Yunara | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.09 |
| 71 | Teemo | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 72 | Varus | +0.76 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.31 |
| 73 | Xayah | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.07 |
| 74 | Kalista | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.11 |
| 75 | Ashe | +0.76 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.46 |
| 76 | Karma | +0.76 | +0.95 | +1.00 | +1.00 | −0.02 | – | −0.05 |
| 77 | Kayle | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.22 |
| 78 | Kindred | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.02 |
| 79 | Lillia | +0.76 | +0.90 | +0.95 | +1.00 | −0.14 | +1.00 | +0.30 |
| 80 | Samira | +0.75 | +1.00 | +0.99 | +1.00 | −0.12 | – | −0.08 |
| 81 | Caitlyn | +0.75 | +1.00 | +1.00 | +0.84 | −0.09 | +1.00 | −0.14 |
| 82 | Ivern | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.15 |
| 83 | Twisted Fate | +0.75 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.30 |
| 84 | Kai'Sa | +0.74 | +1.00 | +1.00 | +1.00 | −0.19 | – | −0.14 |
| 85 | Vel'Koz | +0.72 | +0.83 | +0.97 | +1.00 | +0.03 | – | −0.06 |
| 86 | Ambessa | +0.70 | +1.00 | +1.00 | +1.00 | −0.15 | +0.00 | +0.45 |
| 87 | Jayce | +0.66 | +1.00 | +1.00 | +1.00 | −0.02 | −0.49 | +0.24 |
| 88 | Viego | +0.65 | +1.00 | +0.47 | +1.00 | −0.16 | +1.00 | +0.15 |
| 89 | Yone | +0.65 | +0.59 | +1.00 | +1.00 | −0.12 | +0.59 | +0.23 |
| 90 | Singed | +0.64 | +1.00 | +0.39 | +1.00 | −0.13 | +1.00 | +0.21 |
| 91 | Hwei | +0.62 | +0.51 | +0.97 | +1.00 | −0.05 | – | −0.06 |
| 92 | Quinn | +0.62 | +0.81 | +0.74 | +1.00 | −0.10 | – | −0.34 |
| 93 | Zac | +0.62 | +1.00 | +0.40 | +1.00 | −0.20 | +1.00 | −0.04 |
| 94 | Renekton | +0.60 | +1.00 | +0.16 | +1.00 | +0.00 | +1.00 | +0.13 |
| 95 | Lee Sin | +0.59 | +1.00 | +1.00 | +1.00 | −0.11 | −1.00 | +0.20 |
| 96 | Sejuani | +0.58 | +1.00 | +0.14 | +1.00 | −0.01 | +0.95 | +0.11 |
| 97 | Graves | +0.57 | +1.00 | +1.00 | −0.30 | +0.26 | +1.00 | −0.12 |
| 98 | Yasuo | +0.55 | +1.00 | −0.00 | +1.00 | +0.01 | +0.88 | +0.16 |
| 99 | Skarner | +0.50 | −0.04 | +0.96 | +0.98 | −0.08 | +0.90 | −0.01 |
| 100 | Anivia | +0.50 | +0.04 | +1.00 | +1.00 | −0.14 | – | +0.12 |
| 101 | Cho'Gath | +0.46 | −0.29 | +1.00 | +1.00 | −0.10 | +1.00 | −0.09 |
| 102 | Illaoi | +0.41 | +0.09 | +0.98 | +1.00 | −0.08 | −0.44 | −0.11 |
| 103 | Rek'Sai | +0.38 | +1.00 | −0.60 | +1.00 | −0.10 | +1.00 | +0.02 |
| 104 | Tahm Kench | +0.35 | +0.16 | +0.16 | +0.97 | −0.12 | +0.98 | −0.17 |
| 105 | Ryze | +0.34 | +0.70 | −0.23 | +1.00 | +0.01 | – | −0.19 |
| 106 | Xerath | +0.32 | +1.00 | +0.93 | −1.00 | −0.03 | – | +0.23 |
| 107 | Jinx | +0.32 | −0.04 | +0.47 | +1.00 | −0.01 | – | −0.42 |
| 108 | Nidalee | +0.31 | −0.53 | +0.95 | +0.97 | −0.08 | – | −0.10 |
| 109 | Aurelion Sol | +0.31 | +0.16 | +0.17 | +1.00 | +0.02 | – | −0.07 |
| 110 | Zed | +0.31 | +1.00 | −0.96 | +1.00 | −0.14 | +1.00 | +0.34 |
| 111 | Garen | +0.29 | +0.99 | −0.92 | +0.96 | −0.02 | +0.85 | +0.03 |
| 112 | Urgot | +0.29 | −0.01 | +0.00 | +1.00 | +0.09 | +0.91 | −0.21 |
| 113 | Shaco | +0.28 | +1.00 | −1.00 | +1.00 | −0.14 | +1.00 | −0.05 |
| 114 | Gragas | +0.24 | +0.05 | +0.06 | +1.00 | −0.05 | +0.13 | +0.12 |
| 115 | Draven | +0.23 | −0.91 | +1.00 | +1.00 | −0.06 | – | −0.16 |
| 116 | Malphite | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | +0.00 | +0.48 |
| 117 | Irelia | +0.22 | −0.49 | +1.00 | +1.00 | −0.13 | −0.86 | −0.11 |
| 118 | Shen | +0.20 | +0.58 | −0.06 | +0.19 | −0.02 | +0.17 | +0.30 |
| 119 | Braum | +0.18 | +0.00 | −0.03 | +0.99 | −0.05 | +0.01 | −0.11 |
| 120 | Leona | +0.14 | +0.03 | +0.46 | +0.11 | −0.06 | +0.07 | −0.01 |
| 121 | Nilah | +0.12 | −0.07 | −0.25 | +1.00 | +0.05 | −0.32 | +0.47 |
| 122 | Taric | +0.11 | +0.24 | −0.00 | +0.18 | +0.02 | +0.14 | +0.04 |
| 123 | Aatrox | +0.11 | −0.31 | +0.00 | +1.00 | −0.17 | +0.26 | −0.22 |
| 124 | Jarvan IV | +0.06 | −0.76 | +1.00 | −0.76 | +0.14 | +1.00 | +0.62 |
| 125 | Cassiopeia | +0.02 | +1.00 | −0.10 | −1.00 | −0.00 | – | −0.09 |
| 126 | Ornn | −0.01 | +0.04 | −0.02 | +0.01 | −0.10 | +0.02 | −0.04 |
| 127 | Ahri | −0.02 | −0.28 | +1.00 | −1.00 | −0.01 | – | +0.15 |
| 128 | Zyra | −0.04 | +0.70 | +0.00 | −1.00 | −0.01 | – | −0.18 |
| 129 | Karthus | −0.09 | −0.11 | −0.10 | −0.12 | +0.00 | −0.13 | −0.03 |
| 130 | Ezreal | −0.10 | −0.46 | +0.54 | −0.52 | −0.05 | – | +0.00 |
| 131 | Lux | −0.11 | −0.38 | +0.06 | +0.00 | −0.02 | – | −0.29 |
| 132 | Briar | −0.13 | −0.87 | −0.61 | +1.00 | −0.38 | +1.00 | −0.11 |
| 133 | Brand | −0.20 | −0.63 | −0.85 | +1.00 | −0.07 | – | −0.07 |
| 134 | Ekko | −0.22 | −0.95 | −1.00 | +1.00 | −0.15 | +1.00 | −0.20 |
| 135 | Sivir | −0.22 | +0.00 | +0.00 | −1.00 | −0.11 | – | +0.32 |
| 136 | Sona | −0.23 | −1.00 | +1.00 | −1.00 | −0.05 | – | −0.01 |
| 137 | Kayn | −0.28 | +0.30 | −0.79 | −0.87 | −0.00 | +0.07 | +0.11 |
| 138 | Hecarim | −0.30 | +0.91 | −0.90 | −1.00 | −0.06 | −1.00 | +0.14 |
| 139 | Nautilus | −0.33 | −1.00 | +0.89 | −1.00 | +0.00 | −1.00 | +0.03 |
| 140 | Locke | −0.33 | −1.00 | −0.94 | +0.91 | −0.14 | −0.12 | +0.13 |
| 141 | Sett | −0.33 | −0.34 | −0.30 | −0.91 | −0.03 | +0.02 | +0.29 |
| 142 | Viktor | −0.33 | −1.00 | −1.00 | +1.00 | −0.07 | – | +0.18 |
| 143 | Naafiri | −0.34 | −1.00 | −0.98 | +1.00 | −0.05 | −0.38 | −0.02 |
| 144 | Bard | −0.35 | −0.16 | −0.19 | −1.00 | −0.15 | – | −0.19 |
| 145 | Elise | −0.36 | −1.00 | −1.00 | +1.00 | −0.11 | – | −0.20 |
| 146 | Akali | −0.43 | −0.67 | −0.48 | −0.57 | −0.04 | −0.23 | −0.03 |
| 147 | Vex | −0.45 | −1.00 | −1.00 | +0.52 | −0.06 | – | +0.02 |
| 148 | Morgana | −0.48 | −0.28 | −0.40 | −1.00 | −0.04 | −1.00 | −0.19 |
| 149 | Syndra | −0.51 | +0.00 | −1.00 | −1.00 | −0.01 | – | −0.07 |
| 150 | Nunu & Willump | −0.53 | −1.00 | −0.74 | +0.01 | +0.03 | −1.00 | −0.04 |
| 151 | Rakan | −0.61 | −1.00 | −1.00 | +0.03 | −0.15 | −1.00 | +0.26 |
| 152 | Janna | −0.64 | −1.00 | −1.00 | −0.24 | −0.06 | – | −0.30 |
| 153 | Nami | −0.70 | −0.75 | −1.00 | −1.00 | +0.05 | – | −0.01 |
| 154 | Soraka | −0.73 | −0.80 | −0.98 | −1.00 | −0.02 | – | −0.14 |
| 155 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.04 |
| 156 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.16 |
| 157 | Evelynn | −0.77 | −0.81 | −1.00 | −1.00 | −0.10 | −1.00 | −0.02 |
| 158 | Seraphine | −0.78 | −1.00 | −0.94 | −1.00 | −0.05 | – | −0.28 |
| 159 | Kha'Zix | −0.79 | −0.96 | −1.00 | −1.00 | −0.08 | −1.00 | +0.32 |
| 160 | Veigar | −0.79 | −1.00 | −1.00 | −0.98 | −0.05 | – | −0.08 |
| 161 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.14 |
| 162 | Amumu | −0.79 | −0.98 | −0.99 | −0.96 | −0.08 | −1.00 | −0.01 |
| 163 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.02 |
| 164 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.02 |
| 165 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.05 |
| 166 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.47 |
| 167 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.10 |
| 168 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.12 |
| 169 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.07 |
| 170 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.03 |
| 171 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.10 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Mel's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Mel's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Mel` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Master Yi (net +0.66)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Mel's Golden Eclipse. Untargetable for ?; Golden Eclipse takes 0.75 s to land, enough to react. (Master Yi Q Alpha Strike → Mel R Golden Eclipse)
- **0.49** untargetable: Alpha Strike makes Master Yi untargetable, dodging Mel's Solar Snare. Untargetable for ?; Solar Snare takes 1.16 s to land, enough to react. (Master Yi Q Alpha Strike → Mel E Solar Snare)
- **0.08** cc immunity: Highlander makes Master Yi immune to Mel's Solar Snare (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Mel E Solar Snare)
- Watch out: Mel's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range).

#### 2. Kayn (net +0.55)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Mel's Golden Eclipse. Untargetable for 0.25 s; Golden Eclipse takes 0.75 s to land, enough to react. (Kayn R Umbral Trespass → Mel R Golden Eclipse)
- **0.33** untargetable: Umbral Trespass makes Kayn untargetable, dodging Mel's Solar Snare. Untargetable for 0.25 s; Solar Snare takes 1.16 s to land, enough to react. (Kayn R Umbral Trespass → Mel E Solar Snare)
- Watch out: Mel's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range).

#### 3. Camille (net +0.54)

- **0.51** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Mel's Golden Eclipse. Untargetable for 0.5 s; Golden Eclipse takes 0.75 s to land, enough to react. (Camille R The Hextech Ultimatum → Mel R Golden Eclipse)
- **0.32** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Mel's Solar Snare. Untargetable for 0.5 s; Solar Snare takes 1.16 s to land, enough to react. (Camille R The Hextech Ultimatum → Mel E Solar Snare)
- Watch out: Mel's basic attacks reach 425 units farther than Camille's (550 vs 125 attack range).

#### 4. Fizz (net +0.45)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Mel's Solar Snare. Untargetable for 0.75 s; Solar Snare takes 1.16 s to land, enough to react. (Fizz E Playful → Mel E Solar Snare)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Mel's Golden Eclipse. Untargetable for 0.75 s; Golden Eclipse takes 0.75 s to land, enough to react. (Fizz E Playful → Mel R Golden Eclipse)
- Watch out: Rebuttal blocks part of Fizz's Chum the Waters, a projectile.

#### 5. Vladimir (net +0.43)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Mel's Golden Eclipse. Untargetable for 2 s, long enough to use ahead of Golden Eclipse. (Vladimir W Sanguine Pool → Mel R Golden Eclipse)
- **0.52** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Mel's Solar Snare. Untargetable for 2 s, long enough to use ahead of Solar Snare. (Vladimir W Sanguine Pool → Mel E Solar Snare)
- Watch out: Rebuttal blocks Vladimir's basic attacks, which are projectiles.

#### 6. Pantheon (net +0.42)

- **0.55** invulnerable: Aegis Assault makes Pantheon invulnerable to Mel's Golden Eclipse. Invulnerable for 1.5 s, long enough to use ahead of Golden Eclipse. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Mel R Golden Eclipse)
- **0.24** invulnerable: Aegis Assault makes Pantheon invulnerable to Mel's Solar Snare (its crowd control still applies). Invulnerable for 1.5 s, long enough to use ahead of Solar Snare. Only invulnerable to non-turret damage coming from a specific direction. (Pantheon E Aegis Assault → Mel E Solar Snare)
- Watch out: Mel's basic attacks reach 375 units farther than Pantheon's (550 vs 175 attack range).

#### 7. Yasuo (net +0.37)

- **0.50** projectile block: Wind Wall blocks Mel's Solar Snare, a projectile. Wind Wall for 4 s, long enough to use ahead of Solar Snare. (Yasuo W Wind Wall → Mel E Solar Snare)
- **0.29** projectile block: Wind Wall blocks Mel's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Mel basic attacks)
- **0.28** projectile block: Wind Wall blocks Mel's Radiant Volley, a projectile. Wind Wall for 4 s, long enough to use ahead of Radiant Volley. (Yasuo W Wind Wall → Mel Q Radiant Volley)
- Watch out: Rebuttal blocks part of Yasuo's Steel Tempest, a projectile.

#### 8. Xin Zhao (net +0.31)

- **0.48** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Mel's Golden Eclipse. Invulnerable for 4 s, long enough to use ahead of Golden Eclipse. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Mel R Golden Eclipse)
- **0.16** invulnerable: Crescent Guard makes Xin Zhao invulnerable to Mel's Solar Snare (its crowd control still applies). Invulnerable for 4 s, long enough to use ahead of Solar Snare. Only invulnerable to champions a certain distance away. (Xin Zhao R Crescent Guard → Mel E Solar Snare)
- Watch out: Mel's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range).

#### 9. Kayle (net +0.30)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Mel's Golden Eclipse. Invulnerable for 2.5 s, long enough to use ahead of Golden Eclipse. (Kayle R Divine Judgment → Mel R Golden Eclipse)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Mel's Solar Snare (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Solar Snare. (Kayle R Divine Judgment → Mel E Solar Snare)
- **0.14** range: Kayle's basic attacks reach 75 units farther than Mel's (625 vs 550 attack range). Mel has no dash or blink to close the gap. (Kayle basic attacks → Mel basic attacks)
- Watch out: Rebuttal blocks Kayle's basic attacks, which are projectiles.

#### 10. Fiora (net +0.29)

- **0.62** parry: Riposte parries Mel's Solar Snare and stuns back. Parry for 0.75 s; Solar Snare takes 1.16 s to land, enough to react. Negating Solar Snare's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Mel E Solar Snare)
- **0.55** parry: Riposte parries Mel's Golden Eclipse. Parry for 0.75 s; Golden Eclipse takes 0.75 s to land, enough to react. (Fiora W Riposte → Mel R Golden Eclipse)
- **0.06** attack speed slow: Riposte cuts Mel's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Mel basic attacks)
- Watch out: Rebuttal blocks Fiora's Riposte, a projectile.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Master Yi | +0.66 | 0.91 | 0.25 |  |
| 2 | Kayn | +0.55 | 0.72 | 0.17 |  |
| 3 | Camille | +0.54 | 0.67 | 0.13 |  |
| 4 | Fizz | +0.45 | 0.98 | 0.53 |  |
| 5 | Vladimir | +0.43 | 0.81 | 0.38 |  |
| 6 | Pantheon | +0.42 | 0.67 | 0.25 |  |
| 7 | Yasuo | +0.37 | 0.74 | 0.37 | projectile block (Wind Wall) |
| 8 | Xin Zhao | +0.31 | 0.56 | 0.25 |  |
| 9 | Kayle | +0.30 | 0.77 | 0.47 |  |
| 10 | Fiora | +0.29 | 0.91 | 0.62 |  |
| 11 | Shaco | +0.28 | 0.72 | 0.44 |  |
| 12 | Udyr | +0.28 | 0.70 | 0.42 |  |
| 13 | Bard | +0.27 | 0.72 | 0.45 |  |
| 14 | Evelynn | +0.27 | 0.72 | 0.45 |  |
| 15 | Rek'Sai | +0.27 | 0.72 | 0.45 |  |
| 16 | Aurora | +0.27 | 0.64 | 0.37 |  |
| 17 | Samira | +0.26 | 0.65 | 0.39 | projectile block (Blade Whirl) |
| 18 | Zed | +0.22 | 0.64 | 0.42 |  |
| 19 | Nocturne | +0.17 | 0.70 | 0.53 |  |
| 20 | Malzahar | +0.17 | 0.35 | 0.18 |  |
| 21 | Warwick | +0.15 | 0.33 | 0.18 |  |
| 22 | Xayah | +0.14 | 0.64 | 0.50 |  |
| 23 | Lissandra | +0.13 | 0.72 | 0.59 |  |
| 24 | Sivir | +0.12 | 0.67 | 0.55 |  |
| 25 | Yuumi | +0.11 | 0.98 | 0.87 |  |
| 26 | Nilah | +0.03 | 0.25 | 0.22 |  |
| 27 | Shen | +0.02 | 0.27 | 0.25 |  |
| 28 | Jax | +0.01 | 0.28 | 0.27 |  |
| 29 | Rammus | 0.00 | 0.27 | 0.27 |  |
| 30 | Alistar | -0.01 | 0.26 | 0.27 |  |
| 31 | Gwen | -0.02 | 0.80 | 0.82 |  |
| 32 | Jarvan IV | -0.13 | 0.00 | 0.13 |  |
| 33 | Morgana | -0.15 | 0.52 | 0.67 |  |
| 34 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 35 | Rell | -0.17 | 0.00 | 0.17 |  |
| 36 | Braum | -0.18 | 1.01 | 1.19 | projectile block (Unbreakable) |
| 37 | Garen | -0.18 | 0.32 | 0.50 |  |
| 38 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 39 | Aurelion Sol | -0.18 | 0.00 | 0.18 |  |
| 40 | Bel'Veth | -0.18 | 0.00 | 0.18 |  |
| 41 | Vi | -0.18 | 0.00 | 0.18 |  |
| 42 | Volibear | -0.18 | 0.00 | 0.18 |  |
| 43 | Kalista | -0.20 | 0.25 | 0.45 |  |
| 44 | Milio | -0.25 | 0.35 | 0.60 |  |
| 45 | Tryndamere | -0.25 | 0.00 | 0.25 |  |
| 46 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 47 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 48 | Sett | -0.27 | 0.00 | 0.27 |  |
| 49 | Annie | -0.28 | 0.08 | 0.36 |  |
| 50 | Sion | -0.29 | 0.34 | 0.63 |  |
| 51 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 52 | Zaahen | -0.31 | 0.33 | 0.64 |  |
| 53 | Nidalee | -0.31 | 0.00 | 0.31 |  |
| 54 | Gangplank | -0.32 | 0.44 | 0.76 |  |
| 55 | K'Sante | -0.32 | 0.00 | 0.32 |  |
| 56 | Lulu | -0.33 | 0.25 | 0.58 |  |
| 57 | Jayce | -0.33 | 0.00 | 0.33 |  |
| 58 | Karthus | -0.33 | 0.00 | 0.33 |  |
| 59 | Olaf | -0.34 | 0.33 | 0.67 |  |
| 60 | Malphite | -0.35 | 0.18 | 0.53 |  |
| 61 | Rakan | -0.36 | 0.00 | 0.36 |  |
| 62 | Ryze | -0.36 | 0.00 | 0.36 |  |
| 63 | Naafiri | -0.38 | 0.00 | 0.38 |  |
| 64 | Soraka | -0.38 | 0.00 | 0.38 |  |
| 65 | Yone | -0.38 | 0.00 | 0.38 |  |
| 66 | Maokai | -0.39 | 0.94 | 1.33 |  |
| 67 | Kennen | -0.39 | 0.00 | 0.39 |  |
| 68 | Teemo | -0.40 | 0.35 | 0.75 |  |
| 69 | Vel'Koz | -0.40 | 0.00 | 0.40 |  |
| 70 | Orianna | -0.41 | 0.00 | 0.41 |  |
| 71 | Illaoi | -0.42 | 0.00 | 0.42 |  |
| 72 | Lee Sin | -0.42 | 0.00 | 0.42 |  |
| 73 | Ekko | -0.43 | 0.00 | 0.43 |  |
| 74 | Galio | -0.43 | 0.00 | 0.43 |  |
| 75 | Viktor | -0.43 | 0.00 | 0.43 |  |
| 76 | Rengar | -0.44 | 0.53 | 0.97 |  |
| 77 | Mordekaiser | -0.44 | 0.06 | 0.50 |  |
| 78 | Karma | -0.44 | 0.00 | 0.44 |  |
| 79 | LeBlanc | -0.45 | 0.00 | 0.45 |  |
| 80 | Azir | -0.46 | 0.00 | 0.46 |  |
| 81 | Gnar | -0.46 | 0.00 | 0.46 |  |
| 82 | Quinn | -0.46 | 0.00 | 0.46 |  |
| 83 | Yunara | -0.48 | 0.00 | 0.48 |  |
| 84 | Kled | -0.49 | 0.31 | 0.80 |  |
| 85 | Kog'Maw | -0.49 | 0.00 | 0.49 |  |
| 86 | Darius | -0.50 | 0.00 | 0.50 |  |
| 87 | Trundle | -0.50 | 0.00 | 0.50 |  |
| 88 | Twitch | -0.50 | 0.00 | 0.50 |  |
| 89 | Cassiopeia | -0.51 | 0.00 | 0.51 |  |
| 90 | Kassadin | -0.52 | 0.00 | 0.52 |  |
| 91 | Kai'Sa | -0.53 | 0.00 | 0.53 |  |
| 92 | Miss Fortune | -0.53 | 0.00 | 0.53 |  |
| 93 | Riven | -0.53 | 0.00 | 0.53 |  |
| 94 | Shyvana | -0.53 | 0.00 | 0.53 |  |
| 95 | Taric | -0.53 | 0.00 | 0.53 |  |
| 96 | Twisted Fate | -0.53 | 0.00 | 0.53 |  |
| 97 | Zilean | -0.54 | 0.00 | 0.54 |  |
| 98 | Aatrox | -0.55 | 0.00 | 0.55 |  |
| 99 | Thresh | -0.56 | 0.00 | 0.56 |  |
| 100 | Zyra | -0.56 | 0.00 | 0.56 |  |
| 101 | Xerath | -0.57 | 0.00 | 0.57 |  |
| 102 | Anivia | -0.58 | 0.00 | 0.58 |  |
| 103 | Diana | -0.59 | 0.00 | 0.59 |  |
| 104 | Aphelios | -0.60 | 0.07 | 0.67 |  |
| 105 | Elise | -0.60 | 0.00 | 0.60 |  |
| 106 | Fiddlesticks | -0.60 | 0.00 | 0.60 |  |
| 107 | Neeko | -0.61 | 0.00 | 0.61 |  |
| 108 | Tahm Kench | -0.61 | 0.00 | 0.61 |  |
| 109 | Lux | -0.63 | 0.00 | 0.63 |  |
| 110 | Swain | -0.64 | 0.00 | 0.64 |  |
| 111 | Talon | -0.64 | 0.00 | 0.64 |  |
| 112 | Caitlyn | -0.65 | 0.18 | 0.83 |  |
| 113 | Vayne | -0.65 | 0.00 | 0.65 |  |
| 114 | Zac | -0.66 | 0.00 | 0.66 |  |
| 115 | Corki | -0.67 | 0.00 | 0.67 |  |
| 116 | Kindred | -0.67 | 0.00 | 0.67 |  |
| 117 | Locke | -0.67 | 0.00 | 0.67 |  |
| 118 | Pyke | -0.67 | 0.00 | 0.67 |  |
| 119 | Ivern | -0.68 | 0.00 | 0.68 |  |
| 120 | Kha'Zix | -0.69 | 0.00 | 0.69 |  |
| 121 | Viego | -0.70 | 0.00 | 0.70 |  |
| 122 | Skarner | -0.72 | 0.09 | 0.81 |  |
| 123 | Janna | -0.72 | 0.00 | 0.72 |  |
| 124 | Katarina | -0.73 | 0.00 | 0.73 |  |
| 125 | Syndra | -0.73 | 0.00 | 0.73 |  |
| 126 | Veigar | -0.74 | 0.00 | 0.74 |  |
| 127 | Zoe | -0.74 | 0.00 | 0.74 |  |
| 128 | Akali | -0.75 | 0.00 | 0.75 |  |
| 129 | Nautilus | -0.75 | 0.00 | 0.75 |  |
| 130 | Jinx | -0.76 | 0.00 | 0.76 |  |
| 131 | Sylas | -0.76 | 0.00 | 0.76 |  |
| 132 | Yorick | -0.76 | 0.00 | 0.76 |  |
| 133 | Tristana | -0.77 | 0.27 | 1.04 |  |
| 134 | Heimerdinger | -0.77 | 0.07 | 0.84 |  |
| 135 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 136 | Lucian | -0.78 | 0.00 | 0.78 |  |
| 137 | Senna | -0.78 | 0.00 | 0.78 |  |
| 138 | Brand | -0.79 | 0.00 | 0.79 |  |
| 139 | Smolder | -0.79 | 0.00 | 0.79 |  |
| 140 | Cho'Gath | -0.80 | 0.00 | 0.80 |  |
| 141 | Dr. Mundo | -0.80 | 0.00 | 0.80 |  |
| 142 | Leona | -0.81 | 0.00 | 0.81 |  |
| 143 | Qiyana | -0.82 | 0.00 | 0.82 |  |
| 144 | Singed | -0.85 | 0.00 | 0.85 |  |
| 145 | Ziggs | -0.85 | 0.00 | 0.85 |  |
| 146 | Akshan | -0.86 | 0.00 | 0.86 |  |
| 147 | Draven | -0.87 | 0.00 | 0.87 |  |
| 148 | Ezreal | -0.88 | 0.00 | 0.88 |  |
| 149 | Jhin | -0.89 | 0.00 | 0.89 |  |
| 150 | Nunu & Willump | -0.90 | 0.20 | 1.10 |  |
| 151 | Hwei | -0.94 | 0.00 | 0.94 |  |
| 152 | Amumu | -0.95 | 0.00 | 0.95 |  |
| 153 | Vex | -0.95 | 0.00 | 0.95 |  |
| 154 | Irelia | -1.00 | 0.00 | 1.00 |  |
| 155 | Sona | -1.01 | 0.00 | 1.01 |  |
| 156 | Ashe | -1.02 | 0.00 | 1.02 |  |
| 157 | Lillia | -1.02 | 0.00 | 1.02 |  |
| 158 | Ahri | -1.03 | 0.00 | 1.03 |  |
| 159 | Graves | -1.03 | 0.00 | 1.03 |  |
| 160 | Varus | -1.03 | 0.00 | 1.03 |  |
| 161 | Blitzcrank | -1.07 | 0.00 | 1.07 |  |
| 162 | Poppy | -1.07 | 0.00 | 1.07 |  |
| 163 | Nami | -1.10 | 0.00 | 1.10 |  |
| 164 | Seraphine | -1.12 | 0.00 | 1.12 |  |
| 165 | Urgot | -1.13 | 0.00 | 1.13 |  |
| 166 | Taliyah | -1.14 | 0.00 | 1.14 |  |
| 167 | Hecarim | -1.17 | 0.00 | 1.17 |  |
| 168 | Gragas | -1.19 | 0.00 | 1.19 |  |
| 169 | Renata Glasc | -1.19 | 0.00 | 1.19 |  |
| 170 | Briar | -1.23 | 0.00 | 1.23 |  |
| 171 | Sejuani | -1.25 | 0.00 | 1.25 |  |
| 172 | Ornn | -1.37 | 0.00 | 1.37 |  |
