# Counters to Tahm Kench (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Tahm Kench: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Tahm Kench wins every time) to +1 (the champion does). Run `npm run duel -- <champion> TahmKench --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.89 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.96 |
| 2 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 3 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 4 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 5 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 6 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 8 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 9 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 10 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 11 | Gwen | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 12 | Yorick | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 13 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.23 | – | +0.00 |
| 14 | Udyr | +0.73 | +1.00 | +0.68 | +1.00 | +0.08 | +0.96 | +0.00 |
| 15 | Sylas | +0.59 | +1.00 | +1.00 | +0.00 | +0.19 | – | +0.00 |
| 16 | Shyvana | +0.58 | +1.00 | +1.00 | +1.00 | −0.11 | −1.00 | +0.00 |
| 17 | Illaoi | +0.57 | +0.06 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 18 | Camille | +0.56 | +1.00 | +1.00 | +0.00 | +0.03 | – | +0.00 |
| 19 | Yone | +0.56 | +1.00 | +1.00 | +0.00 | +0.00 | – | +0.00 |
| 20 | Bel'Veth | +0.53 | +0.09 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 21 | Zac | +0.45 | +0.69 | +0.69 | +0.40 | −0.13 | – | +0.00 |
| 22 | Nasus | +0.41 | +0.26 | +0.24 | +1.00 | −0.13 | +1.00 | +0.00 |
| 23 | Gnar | +0.37 | +0.65 | +0.25 | +0.33 | +0.12 | +0.66 | +0.00 |
| 24 | Briar | +0.29 | +1.00 | +1.00 | −1.00 | −0.29 | – | +0.00 |
| 25 | Cho'Gath | +0.28 | +0.09 | +0.09 | +1.00 | +0.04 | – | +0.00 |
| 26 | Mordekaiser | +0.28 | +0.11 | +0.15 | +0.97 | −0.04 | – | +0.00 |
| 27 | Xin Zhao | +0.28 | +0.19 | +0.43 | +0.53 | −0.07 | – | +0.00 |
| 28 | Nilah | +0.25 | +0.94 | +0.67 | −1.00 | +0.13 | – | +0.00 |
| 29 | Ivern | +0.24 | +0.33 | +0.34 | +0.21 | −0.01 | +0.28 | +0.00 |
| 30 | Dr. Mundo | +0.23 | +0.28 | +0.28 | +0.31 | +0.01 | – | +0.00 |
| 31 | Taric | +0.20 | +0.25 | +0.26 | +0.25 | +0.03 | – | +0.00 |
| 32 | Poppy | +0.13 | +0.12 | +0.14 | +0.13 | +0.16 | – | +0.00 |
| 33 | Quinn | +0.12 | +0.19 | +0.18 | −0.05 | +0.06 | +0.32 | +0.00 |
| 34 | Aurora | +0.12 | +0.17 | +0.17 | +0.16 | +0.05 | −0.03 | +0.00 |
| 35 | Volibear | +0.11 | +0.11 | +0.15 | +0.11 | +0.06 | – | +0.00 |
| 36 | Maokai | +0.09 | +0.15 | +0.07 | +0.15 | −0.07 | – | +0.00 |
| 37 | Swain | +0.08 | +0.12 | +0.12 | +0.02 | +0.04 | +0.12 | +0.00 |
| 38 | Morgana | +0.06 | +0.05 | +0.10 | +0.02 | +0.11 | +0.01 | +0.00 |
| 39 | Jayce | +0.05 | +0.53 | −0.03 | −0.47 | +0.12 | – | +0.00 |
| 40 | Singed | +0.04 | +0.05 | +0.03 | +0.05 | +0.02 | – | +0.00 |
| 41 | Shen | +0.03 | +0.01 | +0.01 | +0.09 | +0.03 | – | +0.00 |
| 42 | Sivir | +0.02 | +0.01 | −0.00 | +0.03 | +0.08 | +0.02 | +0.00 |
| 43 | Elise | +0.02 | +0.08 | +0.08 | +0.13 | +0.01 | −0.52 | +0.00 |
| 44 | Bard | +0.00 | +0.01 | +0.01 | −0.04 | +0.01 | +0.05 | +0.00 |
| 45 | Heimerdinger | +0.00 | −0.04 | −0.04 | +0.00 | +0.10 | +0.06 | +0.00 |
| 46 | Sett | −0.00 | −0.06 | +0.06 | −0.06 | +0.08 | – | +0.00 |
| 47 | Lillia | −0.01 | −0.01 | −0.01 | −0.03 | −0.04 | +0.07 | +0.00 |
| 48 | Kled | −0.01 | −0.05 | −0.05 | −0.03 | +0.13 | – | +0.00 |
| 49 | Karma | −0.01 | −0.06 | +0.07 | +0.06 | −0.14 | −0.03 | +0.00 |
| 50 | Teemo | −0.01 | −0.03 | −0.00 | −0.05 | +0.07 | −0.07 | +0.00 |
| 51 | Hwei | −0.02 | −0.03 | −0.03 | +0.03 | −0.10 | +0.07 | +0.00 |
| 52 | Braum | −0.02 | −0.06 | +0.03 | +0.02 | −0.08 | – | +0.00 |
| 53 | Lulu | −0.02 | +0.03 | +0.06 | −0.10 | +0.05 | −0.28 | +0.00 |
| 54 | Renekton | −0.03 | −0.02 | −0.04 | −0.02 | −0.07 | – | +0.00 |
| 55 | Milio | −0.04 | −0.06 | −0.06 | −0.05 | +0.04 | −0.02 | +0.00 |
| 56 | Neeko | −0.04 | −0.04 | −0.02 | +0.03 | −0.10 | −0.16 | +0.00 |
| 57 | Ornn | −0.04 | −0.06 | −0.03 | −0.05 | −0.04 | – | +0.00 |
| 58 | Diana | −0.04 | −0.07 | −0.09 | −0.07 | +0.09 | – | +0.00 |
| 59 | Anivia | −0.06 | −0.04 | −0.04 | −0.11 | −0.11 | −0.01 | +0.00 |
| 60 | Brand | −0.07 | −0.07 | −0.06 | −0.05 | −0.12 | −0.06 | +0.00 |
| 61 | Viktor | −0.07 | −0.05 | −0.04 | −0.08 | −0.17 | −0.03 | +0.00 |
| 62 | Lux | −0.07 | −0.14 | −0.14 | −0.05 | +0.07 | +0.01 | +0.00 |
| 63 | Rell | −0.07 | −0.11 | −0.10 | −0.10 | +0.08 | −0.10 | +0.00 |
| 64 | Urgot | −0.07 | −0.13 | −0.13 | −0.04 | +0.11 | −0.16 | +0.00 |
| 65 | Rek'Sai | −0.07 | −0.10 | −0.13 | −0.07 | +0.03 | – | +0.00 |
| 66 | Orianna | −0.08 | −0.08 | −0.08 | −0.16 | +0.04 | −0.14 | +0.00 |
| 67 | Mel | −0.08 | −0.14 | −0.14 | −0.13 | +0.12 | −0.03 | +0.00 |
| 68 | Kennen | −0.09 | −0.13 | −0.13 | −0.15 | +0.01 | +0.08 | +0.00 |
| 69 | Lee Sin | −0.09 | −0.14 | −0.12 | −0.05 | −0.01 | – | +0.00 |
| 70 | Nautilus | −0.09 | −0.10 | −0.09 | −0.11 | −0.05 | – | +0.00 |
| 71 | Sion | −0.09 | −0.11 | −0.09 | −0.16 | +0.00 | – | +0.00 |
| 72 | Zyra | −0.09 | −0.09 | −0.07 | −0.19 | −0.01 | −0.18 | +0.00 |
| 73 | Gragas | −0.10 | −0.14 | −0.14 | −0.16 | +0.08 | – | +0.00 |
| 74 | LeBlanc | −0.10 | −0.12 | −0.13 | −0.12 | −0.03 | −0.13 | +0.00 |
| 75 | Zeri | −0.11 | −0.24 | −0.03 | −0.10 | +0.03 | −0.24 | +0.00 |
| 76 | Skarner | −0.11 | −0.17 | −0.17 | −0.02 | −0.06 | – | +0.00 |
| 77 | Janna | −0.11 | −0.09 | −0.08 | −0.28 | +0.06 | −0.19 | +0.00 |
| 78 | Vel'Koz | −0.11 | −0.16 | −0.16 | −0.12 | −0.02 | −0.03 | +0.00 |
| 79 | Soraka | −0.12 | −0.17 | −0.13 | −0.16 | −0.01 | −0.10 | +0.00 |
| 80 | Zoe | −0.13 | −0.17 | −0.14 | −0.19 | +0.04 | −0.17 | +0.00 |
| 81 | Kayle | −0.14 | −0.58 | −0.59 | +1.00 | +0.11 | −0.58 | +0.00 |
| 82 | Lissandra | −0.14 | −0.17 | −0.18 | −0.25 | +0.10 | −0.17 | +0.00 |
| 83 | Nami | −0.15 | −0.16 | −0.16 | −0.15 | −0.11 | −0.22 | +0.00 |
| 84 | Ziggs | −0.16 | −0.20 | −0.21 | −0.21 | −0.00 | −0.15 | +0.00 |
| 85 | Malzahar | −0.17 | −0.21 | −0.22 | −0.23 | +0.07 | −0.23 | +0.00 |
| 86 | Karthus | −0.17 | −0.30 | +0.00 | −0.29 | −0.03 | −0.29 | +0.00 |
| 87 | Veigar | −0.18 | −0.23 | −0.23 | −0.15 | −0.11 | −0.17 | +0.00 |
| 88 | Galio | −0.18 | −0.12 | −0.10 | −0.55 | +0.01 | – | +0.00 |
| 89 | Vex | −0.19 | −0.26 | −0.26 | −0.10 | −0.14 | −0.23 | +0.00 |
| 90 | Ahri | −0.20 | −0.47 | −0.19 | −0.17 | +0.02 | −0.07 | +0.00 |
| 91 | Zilean | −0.21 | −0.59 | −0.11 | −0.02 | +0.02 | −0.33 | +0.00 |
| 92 | Annie | −0.21 | −0.37 | −0.45 | +0.02 | −0.03 | −0.11 | +0.00 |
| 93 | Jinx | −0.22 | −0.10 | −0.10 | −0.56 | −0.00 | −0.59 | +0.00 |
| 94 | Lucian | −0.24 | +0.00 | +0.02 | −0.89 | −0.11 | −0.55 | +0.00 |
| 95 | Sejuani | −0.25 | −0.20 | −0.20 | −0.57 | −0.07 | – | +0.00 |
| 96 | Corki | −0.25 | +1.00 | −0.83 | −1.00 | +0.02 | −0.95 | +0.00 |
| 97 | Taliyah | −0.30 | −0.28 | −0.29 | −0.35 | +0.07 | −0.96 | +0.00 |
| 98 | Senna | −0.30 | −0.54 | −0.54 | −0.20 | +0.09 | −0.04 | +0.00 |
| 99 | Rumble | −0.30 | −0.47 | −0.47 | −0.12 | −0.10 | – | +0.00 |
| 100 | Gangplank | −0.31 | −1.00 | −1.00 | +1.00 | +0.15 | – | +0.00 |
| 101 | Alistar | −0.34 | −0.17 | −0.93 | −0.17 | +0.01 | – | +0.00 |
| 102 | Rakan | −0.37 | −0.04 | −1.00 | −0.45 | −0.14 | −0.03 | +0.00 |
| 103 | Jhin | −0.38 | −0.13 | −0.13 | −1.00 | −0.07 | −1.00 | +0.00 |
| 104 | Syndra | −0.42 | −0.78 | −0.78 | −0.03 | −0.13 | −0.05 | +0.00 |
| 105 | Aphelios | −0.42 | −1.00 | −1.00 | +1.00 | −0.17 | −0.97 | +0.00 |
| 106 | Akshan | −0.46 | −0.30 | −0.30 | −0.98 | −0.13 | −0.98 | +0.00 |
| 107 | Akali | −0.49 | −0.25 | −0.65 | −1.00 | −0.10 | – | +0.00 |
| 108 | Garen | −0.50 | −1.00 | +0.05 | −1.00 | −0.06 | – | +0.00 |
| 109 | Nunu & Willump | −0.55 | −1.00 | −0.21 | −1.00 | +0.07 | – | +0.00 |
| 110 | Fiddlesticks | −0.57 | −1.00 | −1.00 | −0.13 | −0.17 | −0.17 | +0.00 |
| 111 | Ashe | −0.58 | −0.93 | −0.93 | −1.00 | +0.01 | +0.89 | +0.00 |
| 112 | Xayah | −0.60 | −0.95 | −0.74 | −0.61 | +0.04 | −0.61 | +0.00 |
| 113 | Xerath | −0.61 | −0.28 | −1.00 | −0.95 | −0.02 | −0.98 | +0.00 |
| 114 | Azir | −0.63 | −0.96 | −1.00 | −0.22 | −0.01 | −0.96 | +0.00 |
| 115 | Graves | −0.66 | −1.00 | −0.88 | −1.00 | +0.08 | −0.03 | +0.00 |
| 116 | Kalista | −0.68 | −0.91 | −0.90 | −0.97 | −0.13 | −0.14 | +0.00 |
| 117 | Twisted Fate | −0.68 | −0.81 | −0.81 | −0.96 | +0.04 | −0.92 | +0.00 |
| 118 | Amumu | −0.69 | −1.00 | −0.69 | −1.00 | +0.00 | – | +0.00 |
| 119 | Draven | −0.72 | −1.00 | −0.97 | −0.97 | −0.06 | −0.20 | +0.00 |
| 120 | Blitzcrank | −0.73 | −1.00 | −0.80 | −1.00 | −0.02 | – | +0.00 |
| 121 | Smolder | −0.73 | −0.99 | −0.99 | −0.61 | −0.06 | −1.00 | +0.00 |
| 122 | Malphite | −0.73 | −1.00 | −1.00 | −0.93 | +0.16 | – | +0.00 |
| 123 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 124 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 125 | Wukong | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 126 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 127 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 128 | Viego | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 129 | Leona | −0.77 | −0.94 | −0.94 | −1.00 | −0.12 | – | +0.00 |
| 130 | Ryze | −0.77 | −1.00 | −0.87 | −1.00 | +0.02 | −1.00 | +0.00 |
| 131 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 132 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 133 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 134 | Vi | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 135 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 136 | Varus | −0.78 | −0.98 | −0.98 | −1.00 | +0.06 | −1.00 | +0.00 |
| 137 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 138 | Rammus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 139 | Miss Fortune | −0.79 | −1.00 | −1.00 | −0.99 | +0.07 | −0.99 | +0.00 |
| 140 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 141 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 142 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 143 | Master Yi | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 144 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 145 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 146 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 147 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 148 | Yunara | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 149 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 150 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 151 | Cassiopeia | −0.80 | −1.00 | −0.97 | −1.00 | −0.09 | −0.97 | +0.00 |
| 152 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 153 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 154 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 155 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 156 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | −0.90 | +0.00 |
| 157 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 158 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 159 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −0.98 | +0.00 |
| 160 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 161 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −0.98 | +0.00 |
| 162 | Trundle | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −0.89 | +0.00 |
| 163 | Kog'Maw | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 164 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 165 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 166 | Aurelion Sol | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 167 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 168 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 169 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 170 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 171 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 172 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Tahm Kench's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Tahm Kench's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> TahmKench` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +2.26)

- **0.50** interrupt: Ferromancy: Crash Down's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Tahm Kench W Abyssal Dive)
- **0.50** interrupt: Ferromancy: Mount Up's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Tahm Kench W Abyssal Dive)
- **0.50** interrupt: Full Tilt's stun interrupts Tahm Kench's Abyssal Dive (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Tahm Kench W Abyssal Dive)

#### 2. Zaahen (net +2.07)

- **0.80** cc immunity: Grim Deliverance makes Zaahen immune to Tahm Kench's Devour (suppression). Immune for ?; Devour takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Tahm Kench R Devour)
- **0.50** interrupt: Dreaded Return's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Tahm Kench W Abyssal Dive)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Tahm Kench W Abyssal Dive)

#### 3. Alistar (net +1.85)

- **0.64** cleanse: Unbreakable Will cleanses Tahm Kench's Devour (suppression) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Tahm Kench R Devour)
- **0.50** interrupt: Pulverize's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Tahm Kench W Abyssal Dive)
- **0.50** interrupt: Trample's stun interrupts Tahm Kench's Abyssal Dive (movement channel). Trample must land during the channel. (Alistar E Trample → Tahm Kench W Abyssal Dive)

#### 4. Maokai (net +1.82)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Tahm Kench's Devour. Untargetable for 1.4 s; Devour takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Tahm Kench R Devour)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 1.4 s, timed to Regurgitate. (Maokai W Twisted Advance → Tahm Kench R Regurgitate)
- **0.50** interrupt: Bramble Smash's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Tahm Kench W Abyssal Dive)

#### 5. Nocturne (net +1.69)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Tahm Kench's Devour. Spell shield for 1.5 s, long enough to use ahead of Devour. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tahm Kench R Devour)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Tahm Kench's Abyssal Dive (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Tahm Kench W Abyssal Dive)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Tahm Kench's Tongue Lash. Spell shield for 1.5 s, long enough to use ahead of Tongue Lash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tahm Kench Q Tongue Lash)

#### 6. Fizz (net +1.60)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Tahm Kench's Devour. Untargetable for 0.75 s; Devour takes 0.25 s to land, enough to react. (Fizz E Playful → Tahm Kench R Devour)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 0.75 s, timed to Regurgitate. (Fizz E Playful → Tahm Kench R Regurgitate)
- **0.54** untargetable: Playful makes Fizz untargetable, dodging Tahm Kench's Tongue Lash. Untargetable for 0.75 s; Tongue Lash takes 0.57 s to land, enough to react. (Fizz E Playful → Tahm Kench Q Tongue Lash)

#### 7. Rek'Sai (net +1.59)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Tahm Kench's Devour. Untargetable for 1.5 s, long enough to use ahead of Devour. (Rek'Sai R Void Rush → Tahm Kench R Devour)
- **0.50** interrupt: Unburrow's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Void Rush makes Rek'Sai untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 1.5 s, long enough to use ahead of Regurgitate. (Rek'Sai R Void Rush → Tahm Kench R Regurgitate)

#### 8. Singed (net +1.58)

- **0.50** interrupt: Fling's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Fling must land during the channel. (Singed E Fling → Tahm Kench W Abyssal Dive)
- **0.49** grounding: Mega Adhesive grounds Tahm Kench, who then can't cast Abyssal Dive. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Tahm Kench W Abyssal Dive)
- **0.28** anti-heal: Insanity Potion's Grievous Wounds cuts Tahm Kench's healing from Tongue Lash by 40%. (Singed R Insanity Potion → Tahm Kench Q Tongue Lash)

#### 9. Evelynn (net +1.57)

- **0.80** untargetable: Last Caress makes Evelynn untargetable, dodging Tahm Kench's Devour. Untargetable for ?; Devour takes 0.25 s to land, enough to react. (Evelynn R Last Caress → Tahm Kench R Devour)
- **0.50** interrupt: Allure's charm interrupts Tahm Kench's Abyssal Dive (movement channel). Allure must land during the channel. (Evelynn W Allure → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Last Caress makes Evelynn untargetable, dodging Tahm Kench's Regurgitate. Untargetable for ?, timed to Regurgitate. (Evelynn R Last Caress → Tahm Kench R Regurgitate)

#### 10. Shaco (net +1.57)

- **0.80** untargetable: Hallucinate makes Shaco untargetable, dodging Tahm Kench's Devour. Untargetable for 0.5 s; Devour takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Tahm Kench R Devour)
- **0.50** interrupt: Jack in the Box's fear interrupts Tahm Kench's Abyssal Dive (movement channel). Jack in the Box must land during the channel. (Shaco W Jack in the Box → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Hallucinate makes Shaco untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 0.5 s, timed to Regurgitate. (Shaco R Hallucinate → Tahm Kench R Regurgitate)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.26 | 2.26 | 0.00 |  |
| 2 | Zaahen | +2.07 | 2.07 | 0.00 |  |
| 3 | Alistar | +1.85 | 1.85 | 0.00 |  |
| 4 | Maokai | +1.82 | 1.82 | 0.00 |  |
| 5 | Nocturne | +1.69 | 1.69 | 0.00 |  |
| 6 | Fizz | +1.60 | 1.60 | 0.00 |  |
| 7 | Rek'Sai | +1.59 | 1.59 | 0.00 |  |
| 8 | Singed | +1.58 | 1.58 | 0.00 | grounding (Mega Adhesive) |
| 9 | Evelynn | +1.57 | 1.57 | 0.00 |  |
| 10 | Shaco | +1.57 | 1.57 | 0.00 |  |
| 11 | Camille | +1.55 | 1.55 | 0.00 |  |
| 12 | Kled | +1.54 | 1.54 | 0.00 |  |
| 13 | Milio | +1.50 | 1.50 | 0.00 |  |
| 14 | Blitzcrank | +1.46 | 1.46 | 0.00 |  |
| 15 | K'Sante | +1.42 | 1.42 | 0.00 |  |
| 16 | Udyr | +1.42 | 1.42 | 0.00 |  |
| 17 | Bard | +1.41 | 1.41 | 0.00 |  |
| 18 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 19 | Fiora | +1.40 | 1.40 | 0.00 |  |
| 20 | Morgana | +1.37 | 1.37 | 0.00 |  |
| 21 | Lissandra | +1.31 | 1.31 | 0.00 |  |
| 22 | Xayah | +1.30 | 1.30 | 0.00 |  |
| 23 | Braum | +1.29 | 1.29 | 0.00 | projectile block (Unbreakable) |
| 24 | Yasuo | +1.27 | 1.27 | 0.00 | projectile block (Wind Wall) |
| 25 | Heimerdinger | +1.26 | 1.26 | 0.00 |  |
| 26 | Sejuani | +1.26 | 1.26 | 0.00 |  |
| 27 | Aurora | +1.25 | 1.25 | 0.00 |  |
| 28 | Anivia | +1.24 | 1.24 | 0.00 |  |
| 29 | Sion | +1.23 | 1.62 | 0.39 |  |
| 30 | Lulu | +1.22 | 1.22 | 0.00 |  |
| 31 | Gwen | +1.20 | 1.20 | 0.00 |  |
| 32 | Gnar | +1.16 | 1.16 | 0.00 |  |
| 33 | Thresh | +1.16 | 1.16 | 0.00 |  |
| 34 | Vladimir | +1.12 | 1.36 | 0.24 |  |
| 35 | Renata Glasc | +1.11 | 1.11 | 0.00 |  |
| 36 | Olaf | +1.07 | 1.07 | 0.00 |  |
| 37 | Rengar | +1.06 | 1.06 | 0.00 |  |
| 38 | Viktor | +1.04 | 1.04 | 0.00 |  |
| 39 | Kalista | +1.03 | 1.03 | 0.00 |  |
| 40 | Cho'Gath | +1.00 | 1.00 | 0.00 |  |
| 41 | Riven | +1.00 | 1.00 | 0.00 |  |
| 42 | Gangplank | +0.99 | 0.99 | 0.00 |  |
| 43 | Seraphine | +0.99 | 0.99 | 0.00 |  |
| 44 | Nami | +0.96 | 0.96 | 0.00 |  |
| 45 | Zed | +0.96 | 0.96 | 0.00 |  |
| 46 | Cassiopeia | +0.95 | 0.95 | 0.00 | grounding (Miasma) |
| 47 | Yone | +0.92 | 0.92 | 0.00 |  |
| 48 | Ornn | +0.91 | 0.91 | 0.00 |  |
| 49 | Vex | +0.91 | 0.91 | 0.00 |  |
| 50 | Vayne | +0.90 | 0.90 | 0.00 |  |
| 51 | Urgot | +0.89 | 0.89 | 0.00 |  |
| 52 | Xin Zhao | +0.88 | 0.88 | 0.00 |  |
| 53 | Rakan | +0.85 | 0.85 | 0.00 |  |
| 54 | Draven | +0.84 | 0.84 | 0.00 |  |
| 55 | Sett | +0.84 | 0.84 | 0.00 |  |
| 56 | Elise | +0.80 | 0.80 | 0.00 |  |
| 57 | Zilean | +0.80 | 0.80 | 0.00 |  |
| 58 | Zoe | +0.80 | 0.80 | 0.00 |  |
| 59 | Leona | +0.79 | 0.79 | 0.00 |  |
| 60 | Kennen | +0.77 | 0.77 | 0.00 |  |
| 61 | Jayce | +0.76 | 0.76 | 0.00 |  |
| 62 | Amumu | +0.75 | 0.75 | 0.00 |  |
| 63 | Soraka | +0.75 | 0.75 | 0.00 |  |
| 64 | Ziggs | +0.75 | 0.75 | 0.00 |  |
| 65 | Master Yi | +0.74 | 1.31 | 0.57 |  |
| 66 | Garen | +0.74 | 0.74 | 0.00 |  |
| 67 | Aurelion Sol | +0.72 | 0.96 | 0.24 |  |
| 68 | Annie | +0.72 | 0.72 | 0.00 |  |
| 69 | Veigar | +0.72 | 0.72 | 0.00 |  |
| 70 | Ahri | +0.71 | 0.71 | 0.00 |  |
| 71 | Brand | +0.71 | 0.71 | 0.00 |  |
| 72 | Hwei | +0.71 | 0.71 | 0.00 |  |
| 73 | Syndra | +0.71 | 0.71 | 0.00 |  |
| 74 | Swain | +0.68 | 0.68 | 0.00 |  |
| 75 | Teemo | +0.67 | 0.67 | 0.00 |  |
| 76 | Jax | +0.66 | 0.66 | 0.00 |  |
| 77 | Volibear | +0.66 | 0.66 | 0.00 |  |
| 78 | Ashe | +0.65 | 0.65 | 0.00 |  |
| 79 | Samira | +0.64 | 0.64 | 0.00 |  |
| 80 | Sona | +0.64 | 0.64 | 0.00 |  |
| 81 | Kayle | +0.63 | 0.63 | 0.00 |  |
| 82 | Mel | +0.61 | 0.61 | 0.00 |  |
| 83 | Tristana | +0.61 | 0.61 | 0.00 |  |
| 84 | Pyke | +0.59 | 1.00 | 0.41 |  |
| 85 | Shyvana | +0.58 | 0.58 | 0.00 |  |
| 86 | Mordekaiser | +0.57 | 0.57 | 0.00 |  |
| 87 | Nilah | +0.53 | 0.53 | 0.00 |  |
| 88 | Malphite | +0.52 | 0.52 | 0.00 |  |
| 89 | Rammus | +0.51 | 1.29 | 0.78 |  |
| 90 | Aatrox | +0.50 | 0.50 | 0.00 |  |
| 91 | Bel'Veth | +0.50 | 0.50 | 0.00 |  |
| 92 | Darius | +0.50 | 0.50 | 0.00 |  |
| 93 | Irelia | +0.50 | 0.50 | 0.00 |  |
| 94 | Kassadin | +0.50 | 0.50 | 0.00 |  |
| 95 | Renekton | +0.50 | 0.50 | 0.00 |  |
| 96 | Sylas | +0.50 | 0.50 | 0.00 |  |
| 97 | Taric | +0.50 | 0.50 | 0.00 |  |
| 98 | Trundle | +0.50 | 0.50 | 0.00 |  |
| 99 | Yorick | +0.50 | 0.50 | 0.00 |  |
| 100 | Zyra | +0.50 | 0.50 | 0.00 |  |
| 101 | Azir | +0.49 | 0.49 | 0.00 |  |
| 102 | Orianna | +0.49 | 0.49 | 0.00 |  |
| 103 | Neeko | +0.47 | 0.47 | 0.00 |  |
| 104 | Yuumi | +0.44 | 1.65 | 1.21 |  |
| 105 | Malzahar | +0.43 | 1.63 | 1.20 |  |
| 106 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 107 | Kindred | +0.41 | 0.41 | 0.00 |  |
| 108 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 109 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 110 | Varus | +0.38 | 0.66 | 0.28 |  |
| 111 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 112 | Skarner | +0.35 | 0.35 | 0.00 |  |
| 113 | Hecarim | +0.34 | 0.34 | 0.00 |  |
| 114 | Jarvan IV | +0.34 | 0.34 | 0.00 |  |
| 115 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 116 | Lillia | +0.33 | 0.33 | 0.00 |  |
| 117 | Senna | +0.32 | 0.32 | 0.00 |  |
| 118 | Corki | +0.30 | 0.30 | 0.00 |  |
| 119 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 120 | Smolder | +0.30 | 0.30 | 0.00 |  |
| 121 | Lee Sin | +0.29 | 0.29 | 0.00 |  |
| 122 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 123 | Gragas | +0.28 | 0.77 | 0.49 |  |
| 124 | Lux | +0.27 | 0.27 | 0.00 |  |
| 125 | Quinn | +0.26 | 0.84 | 0.58 |  |
| 126 | Briar | +0.26 | 0.26 | 0.00 |  |
| 127 | Diana | +0.26 | 0.26 | 0.00 |  |
| 128 | Wukong | +0.26 | 0.26 | 0.00 |  |
| 129 | Nautilus | +0.26 | 0.26 | 0.00 |  |
| 130 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 131 | Viego | +0.25 | 0.84 | 0.59 |  |
| 132 | Ambessa | +0.25 | 0.25 | 0.00 |  |
| 133 | Jinx | +0.25 | 0.25 | 0.00 |  |
| 134 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 135 | Qiyana | +0.24 | 0.24 | 0.00 |  |
| 136 | Kayn | +0.22 | 1.57 | 1.35 |  |
| 137 | Graves | +0.20 | 0.20 | 0.00 |  |
| 138 | Karma | +0.19 | 0.19 | 0.00 |  |
| 139 | LeBlanc | +0.19 | 0.19 | 0.00 |  |
| 140 | Illaoi | +0.16 | 0.16 | 0.00 |  |
| 141 | Zac | +0.06 | 1.26 | 1.20 |  |
| 142 | Taliyah | +0.03 | 1.47 | 1.44 |  |
| 143 | Akali | 0.00 | 0.00 | 0.00 |  |
| 144 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 145 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 146 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 147 | Locke | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Talon | 0.00 | 0.00 | 0.00 |  |
| 150 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 151 | Janna | -0.11 | 1.09 | 1.20 |  |
| 152 | Vel'Koz | -0.11 | 0.73 | 0.84 |  |
| 153 | Warwick | -0.13 | 1.77 | 1.90 |  |
| 154 | Fiddlesticks | -0.15 | 1.17 | 1.32 |  |
| 155 | Twisted Fate | -0.17 | 0.88 | 1.05 |  |
| 156 | Ivern | -0.21 | 0.16 | 0.37 |  |
| 157 | Xerath | -0.23 | 0.73 | 0.96 |  |
| 158 | Vi | -0.26 | 0.84 | 1.10 |  |
| 159 | Poppy | -0.35 | 0.25 | 0.60 |  |
| 160 | Katarina | -0.37 | 0.39 | 0.76 |  |
| 161 | Caitlyn | -0.48 | 0.36 | 0.84 |  |
| 162 | Galio | -0.49 | 1.24 | 1.73 |  |
| 163 | Akshan | -0.52 | 0.29 | 0.81 |  |
| 164 | Lucian | -0.53 | 0.31 | 0.84 |  |
| 165 | Miss Fortune | -0.54 | 0.30 | 0.84 |  |
| 166 | Shen | -0.56 | 0.79 | 1.35 |  |
| 167 | Jhin | -0.59 | 0.25 | 0.84 |  |
| 168 | Karthus | -0.68 | 0.16 | 0.84 |  |
| 169 | Nunu & Willump | -0.76 | 0.59 | 1.35 |  |
| 170 | Ryze | -0.83 | 0.22 | 1.05 |  |
| 171 | Pantheon | -1.09 | 0.39 | 1.48 |  |
| 172 | Naafiri | -1.35 | 0.00 | 1.35 |  |
