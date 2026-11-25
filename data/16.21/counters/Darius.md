# Counters to Darius (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Darius: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Darius wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Darius --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.78 |
| 2 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.19 |
| 3 | Ashe | +0.86 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.29 |
| 4 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.39 |
| 5 | Sivir | +0.84 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.29 |
| 6 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | −0.21 |
| 7 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.48 |
| 8 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.31 |
| 9 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.29 |
| 10 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.86 |
| 11 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.45 |
| 12 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.60 |
| 13 | Bard | +0.79 | +1.00 | +1.00 | +0.96 | +0.09 | +0.92 | −0.18 |
| 14 | Karma | +0.64 | +1.00 | +0.86 | +0.37 | +0.08 | +0.95 | −0.02 |
| 15 | Aphelios | +0.56 | +0.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.23 |
| 16 | Neeko | +0.49 | +0.86 | +0.05 | +0.76 | +0.15 | +0.88 | −0.07 |
| 17 | Orianna | +0.44 | +1.00 | +1.00 | −1.00 | +0.19 | +1.00 | +0.31 |
| 18 | Ivern | +0.44 | +0.86 | +0.47 | +1.00 | +0.03 | −1.00 | +0.01 |
| 19 | Yunara | +0.43 | +0.91 | +1.00 | −0.85 | +0.19 | +1.00 | −0.13 |
| 20 | Corki | +0.41 | +1.00 | +0.93 | −1.00 | +0.25 | +1.00 | −0.17 |
| 21 | Yorick | +0.35 | −0.82 | +1.00 | +1.00 | +0.20 | – | +0.86 |
| 22 | Zeri | +0.34 | +1.00 | −1.00 | +1.00 | +0.06 | +1.00 | +0.53 |
| 23 | Lulu | +0.32 | +1.00 | −1.00 | +1.00 | +0.13 | +1.00 | +0.04 |
| 24 | Xayah | +0.23 | −1.00 | +1.00 | +1.00 | +0.24 | +0.00 | −0.14 |
| 25 | Tryndamere | +0.22 | −1.00 | +1.00 | +1.00 | −0.02 | – | +0.10 |
| 26 | Fiora | +0.17 | +0.57 | −1.00 | +1.00 | +0.09 | – | +0.96 |
| 27 | Zaahen | +0.04 | +0.53 | −1.00 | +0.73 | +0.00 | – | +0.12 |
| 28 | Annie | +0.02 | −0.08 | +0.26 | −0.37 | +0.13 | +0.22 | +0.17 |
| 29 | Milio | +0.01 | +1.00 | −1.00 | −0.32 | +0.27 | +0.37 | −0.01 |
| 30 | Kai'Sa | −0.10 | +1.00 | −1.00 | −1.00 | +0.07 | +1.00 | −0.22 |
| 31 | Smolder | −0.11 | −1.00 | +0.00 | +1.00 | +0.27 | −1.00 | −0.04 |
| 32 | Seraphine | −0.14 | −1.00 | +0.89 | −1.00 | +0.14 | +0.71 | −0.12 |
| 33 | Sion | −0.21 | −1.00 | +1.00 | −1.00 | −0.06 | – | +0.43 |
| 34 | Hwei | −0.22 | −1.00 | +0.60 | −0.16 | +0.07 | −1.00 | +0.03 |
| 35 | Janna | −0.29 | −1.00 | +1.00 | −1.00 | +0.13 | −1.00 | −0.23 |
| 36 | Kled | −0.33 | −1.00 | −1.00 | +1.00 | −0.05 | – | +0.27 |
| 37 | Jinx | −0.33 | +0.73 | −1.00 | −1.00 | +0.20 | −0.78 | −0.25 |
| 38 | Tristana | −0.34 | +0.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.14 |
| 39 | Anivia | −0.40 | −1.00 | +0.13 | −1.00 | −0.15 | +0.24 | +0.27 |
| 40 | Lux | −0.44 | −0.15 | −1.00 | −0.98 | +0.13 | +0.30 | −0.06 |
| 41 | Gnar | −0.46 | −1.00 | +0.19 | −1.00 | +0.22 | −1.00 | +0.15 |
| 42 | Ahri | −0.48 | −0.52 | −1.00 | −0.28 | +0.04 | −0.58 | +0.18 |
| 43 | Ezreal | −0.50 | −0.01 | −1.00 | −1.00 | +0.07 | −0.55 | −0.03 |
| 44 | Vel'Koz | −0.51 | −0.17 | −1.00 | −1.00 | +0.32 | −0.69 | +0.10 |
| 45 | Heimerdinger | −0.51 | −1.00 | −0.23 | −0.68 | +0.19 | −0.95 | −0.05 |
| 46 | Nilah | −0.51 | −1.00 | −1.00 | +0.00 | +0.27 | – | −0.04 |
| 47 | Senna | −0.52 | −1.00 | +0.09 | −1.00 | +0.05 | −0.96 | −0.09 |
| 48 | Zyra | −0.52 | −1.00 | −1.00 | −0.07 | +0.11 | −0.20 | −0.09 |
| 49 | Twitch | −0.54 | +0.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.25 |
| 50 | Brand | −0.54 | −0.97 | −0.10 | −1.00 | +0.04 | −0.65 | −0.21 |
| 51 | Kalista | −0.57 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.28 |
| 52 | Zoe | −0.58 | −0.37 | −1.00 | −1.00 | +0.05 | −0.37 | −0.09 |
| 53 | Zilean | −0.58 | −1.00 | −1.00 | −1.00 | +0.16 | +1.00 | −0.02 |
| 54 | Rakan | −0.58 | −1.00 | −1.00 | +0.00 | +0.01 | −1.00 | +0.38 |
| 55 | Caitlyn | −0.60 | −0.26 | −1.00 | −1.00 | +0.09 | −0.86 | −0.26 |
| 56 | Varus | −0.60 | −1.00 | −1.00 | −1.00 | +0.04 | +0.87 | +0.04 |
| 57 | Illaoi | −0.62 | −1.00 | −0.49 | −1.00 | +0.04 | – | +0.16 |
| 58 | Kennen | −0.64 | −1.00 | −1.00 | −1.00 | +0.07 | +0.48 | +0.11 |
| 59 | Syndra | −0.67 | −1.00 | −1.00 | −1.00 | +0.16 | +0.06 | −0.02 |
| 60 | Rengar | −0.71 | −1.00 | −1.00 | −1.00 | +0.39 | – | +0.11 |
| 61 | Bel'Veth | −0.72 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.41 |
| 62 | Gangplank | −0.72 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.78 |
| 63 | Udyr | −0.73 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.76 |
| 64 | Jarvan IV | −0.74 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.54 |
| 65 | Riven | −0.74 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.31 |
| 66 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | −0.12 |
| 67 | Camille | −0.74 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.59 |
| 68 | Maokai | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.09 |
| 69 | Malphite | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.38 |
| 70 | Olaf | −0.74 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.80 |
| 71 | Poppy | −0.74 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.30 |
| 72 | Ornn | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.07 |
| 73 | Nunu & Willump | −0.74 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.15 |
| 74 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.10 |
| 75 | Soraka | −0.74 | −0.95 | −0.97 | −1.00 | +0.04 | −0.65 | −0.14 |
| 76 | Warwick | −0.75 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.26 |
| 77 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.38 |
| 78 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.46 |
| 79 | Jayce | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.25 |
| 80 | Viego | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.05 |
| 81 | Diana | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.18 |
| 82 | Mordekaiser | −0.75 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.33 |
| 83 | Fizz | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.23 |
| 84 | Taric | −0.75 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.14 |
| 85 | Dr. Mundo | −0.76 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.48 |
| 86 | Sejuani | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.26 |
| 87 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.07 |
| 88 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.13 |
| 89 | Lee Sin | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.19 |
| 90 | Draven | −0.76 | −1.00 | −0.91 | −1.00 | +0.11 | −1.00 | +0.07 |
| 91 | Amumu | −0.76 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.34 |
| 92 | Master Yi | −0.76 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.81 |
| 93 | Volibear | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.32 |
| 94 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.20 |
| 95 | Rumble | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.28 |
| 96 | Miss Fortune | −0.76 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.01 |
| 97 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.05 |
| 98 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.33 |
| 99 | Morgana | −0.77 | −1.00 | −0.94 | −1.00 | +0.05 | −0.96 | +0.15 |
| 100 | Gwen | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.50 |
| 101 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.05 |
| 102 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.42 |
| 103 | Alistar | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.12 |
| 104 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.03 |
| 105 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.33 |
| 106 | Cho'Gath | −0.77 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.12 |
| 107 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.19 |
| 108 | Gragas | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.20 |
| 109 | Tahm Kench | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.06 |
| 110 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.11 |
| 111 | Lillia | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.35 |
| 112 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.23 |
| 113 | Fiddlesticks | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.31 |
| 114 | Jax | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.33 |
| 115 | Nautilus | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.26 |
| 116 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.12 |
| 117 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.06 |
| 118 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.17 |
| 119 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.17 |
| 120 | Jhin | −0.78 | −1.00 | −0.98 | −1.00 | +0.16 | −1.00 | −0.11 |
| 121 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.02 |
| 122 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.14 |
| 123 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.07 |
| 124 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.37 |
| 125 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.01 |
| 126 | Nocturne | −0.78 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.40 |
| 127 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.01 |
| 128 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | −0.72 | −0.25 |
| 129 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.03 |
| 130 | Zac | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.04 |
| 131 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.24 |
| 132 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.01 |
| 133 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.18 |
| 134 | Aatrox | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.36 |
| 135 | Kayn | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.05 |
| 136 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.07 |
| 137 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.15 |
| 138 | Urgot | −0.79 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.17 |
| 139 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.03 |
| 140 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.11 |
| 141 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.14 |
| 142 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.04 |
| 143 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.02 |
| 144 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.03 |
| 145 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.01 |
| 146 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.01 |
| 147 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.00 |
| 148 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.05 |
| 149 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −0.98 | −0.15 |
| 150 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.23 |
| 151 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −0.98 | +0.14 |
| 152 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.09 |
| 153 | Pyke | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.23 |
| 154 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.05 |
| 155 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.12 |
| 156 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.28 |
| 157 | Nami | −0.80 | −0.99 | −1.00 | −0.99 | +0.04 | −1.00 | −0.19 |
| 158 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.08 |
| 159 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.07 |
| 160 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.10 |
| 161 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.10 |
| 162 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.27 |
| 163 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.22 |
| 164 | Renata Glasc | −0.81 | −1.00 | −1.00 | −0.99 | +0.06 | −1.00 | −0.32 |
| 165 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.23 |
| 166 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.02 |
| 167 | Ryze | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.50 |
| 168 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.85 |
| 169 | Samira | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.14 |
| 170 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.30 |
| 171 | Wukong | −0.85 | −1.00 | −1.00 | −1.00 | −0.44 | – | −0.01 |
| 172 | Briar | −0.88 | −1.00 | −1.00 | −1.00 | −0.59 | – | −0.09 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Darius's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Darius's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Darius` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.80)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Sivir basic attacks → Darius basic attacks)
- **0.65** spell shield: Spell Shield's spell shield blocks Darius's Apprehend. Spell shield for 1.5 s, long enough to use ahead of Apprehend. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius E Apprehend)
- **0.55** spell shield: Spell Shield's spell shield blocks Darius's Noxian Guillotine. Spell shield for 1.5 s, long enough to use ahead of Noxian Guillotine. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Darius R Noxian Guillotine)

#### 2. Bard (net +1.40)

- **0.62** range: Bard's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Bard basic attacks → Darius basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Bard R Tempered Fate → Darius R Noxian Guillotine)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Bard R Tempered Fate → Darius E Apprehend)

#### 3. Xayah (net +1.37)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Darius's (525 vs 175 attack range). Darius has no dash or blink to close the gap. (Xayah basic attacks → Darius basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Noxian Guillotine. Untargetable for 1.5 s, long enough to use ahead of Noxian Guillotine. (Xayah R Featherstorm → Darius R Noxian Guillotine)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Darius's Apprehend. Untargetable for 1.5 s, long enough to use ahead of Apprehend. (Xayah R Featherstorm → Darius E Apprehend)

#### 4. Kayle (net +1.32)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Darius's (625 vs 175 attack range). Darius has no dash or blink to close the gap. (Kayle basic attacks → Darius basic attacks)
- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Darius's Noxian Guillotine. Invulnerable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Kayle R Divine Judgment → Darius R Noxian Guillotine)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Darius's Crippling Strike (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Crippling Strike. (Kayle R Divine Judgment → Darius W Crippling Strike)

#### 5. Vladimir (net +1.27)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Apprehend. Untargetable for 2 s, long enough to use ahead of Apprehend. (Vladimir W Sanguine Pool → Darius E Apprehend)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2 s, long enough to use ahead of Noxian Guillotine. (Vladimir W Sanguine Pool → Darius R Noxian Guillotine)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Darius's (450 vs 175 attack range). Darius has no dash or blink to close the gap. (Vladimir basic attacks → Darius basic attacks)
- Watch out: Apprehend's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Aurora (net +1.23)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Aurora basic attacks → Darius basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Noxian Guillotine. Untargetable for 0.4 s; Noxian Guillotine takes 0.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius R Noxian Guillotine)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Darius's Apprehend. Untargetable for 0.4 s; Apprehend takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Darius E Apprehend)

#### 7. Teemo (net +1.21)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Darius's (500 vs 175 attack range). Darius has no dash or blink to close the gap. (Teemo basic attacks → Darius basic attacks)
- **0.47** blind: Blinding Dart's blind makes Darius's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Darius basic attacks)
- **0.30** blind: Blinding Dart's blind makes Darius's Crippling Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Darius W Crippling Strike)

#### 8. Yuumi (net +1.19)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Darius's Apprehend. Untargetable for ?; Apprehend takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Darius E Apprehend)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Darius's Noxian Guillotine. Untargetable for ?; Noxian Guillotine takes 0.37 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Darius R Noxian Guillotine)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Darius's (425 vs 175 attack range). Darius has no dash or blink to close the gap. (Yuumi basic attacks → Darius basic attacks)
- Watch out: Apprehend's airborne interrupts Yuumi's Final Chapter (normal channel).

#### 9. Lissandra (net +1.19)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Noxian Guillotine. Untargetable for 2.5 s, long enough to use ahead of Noxian Guillotine. (Lissandra R Frozen Tomb → Darius R Noxian Guillotine)
- **0.41** range: Lissandra's basic attacks reach 375 units farther than Darius's (550 vs 175 attack range). Darius has no dash or blink to close the gap. (Lissandra basic attacks → Darius basic attacks)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Darius's Apprehend. Untargetable for 2.5 s, long enough to use ahead of Apprehend. (Lissandra R Frozen Tomb → Darius E Apprehend)

#### 10. Fiora (net +1.13)

- **0.80** parry: Riposte parries Darius's Apprehend and stuns back. Parry for 0.75 s; Apprehend takes 0.25 s to land, enough to react. Negating Apprehend's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Darius E Apprehend)
- **0.55** parry: Riposte parries Darius's Noxian Guillotine. Parry for 0.75 s; Noxian Guillotine takes 0.37 s to land, enough to react. (Fiora W Riposte → Darius R Noxian Guillotine)
- **0.16** parry: Riposte parries Darius's Crippling Strike. Parry for 0.75 s; Crippling Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Darius W Crippling Strike)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.80 | 1.80 | 0.00 | range (attacks) |
| 2 | Bard | +1.40 | 1.40 | 0.00 | range (attacks) |
| 3 | Xayah | +1.37 | 1.37 | 0.00 | range (attacks) |
| 4 | Kayle | +1.32 | 1.32 | 0.00 | range (attacks) |
| 5 | Vladimir | +1.27 | 1.34 | 0.07 |  |
| 6 | Aurora | +1.23 | 1.23 | 0.00 | range (attacks) |
| 7 | Teemo | +1.21 | 1.21 | 0.00 | range (attacks), blind (Blinding Dart) |
| 8 | Yuumi | +1.19 | 1.58 | 0.39 | range (attacks) |
| 9 | Lissandra | +1.19 | 1.19 | 0.00 |  |
| 10 | Fiora | +1.13 | 1.13 | 0.00 |  |
| 11 | Nocturne | +1.12 | 1.12 | 0.00 |  |
| 12 | Morgana | +1.07 | 1.07 | 0.00 |  |
| 13 | Fizz | +1.03 | 1.03 | 0.00 |  |
| 14 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 15 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 16 | Gwen | +0.96 | 0.96 | 0.00 |  |
| 17 | Master Yi | +0.92 | 1.09 | 0.17 |  |
| 18 | Kalista | +0.86 | 0.86 | 0.00 | range (attacks) |
| 19 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 20 | Aphelios | +0.82 | 0.82 | 0.00 | range (attacks) |
| 21 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 22 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 23 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 24 | Rek'Sai | +0.79 | 0.79 | 0.00 |  |
| 25 | Milio | +0.78 | 0.78 | 0.00 | range (attacks) |
| 26 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 27 | Evelynn | +0.76 | 0.76 | 0.00 |  |
| 28 | Shaco | +0.76 | 0.76 | 0.00 |  |
| 29 | Udyr | +0.75 | 0.75 | 0.00 |  |
| 30 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Camille | +0.72 | 0.72 | 0.00 |  |
| 32 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Zed | +0.69 | 0.69 | 0.00 |  |
| 36 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 37 | Cassiopeia | +0.67 | 0.67 | 0.00 |  |
| 38 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 39 | Varus | +0.65 | 0.75 | 0.10 | range (attacks) |
| 40 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 42 | Elise | +0.61 | 0.61 | 0.00 | range (attacks) |
| 43 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 45 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 47 | Singed | +0.60 | 0.60 | 0.00 |  |
| 48 | Gangplank | +0.59 | 0.59 | 0.00 |  |
| 49 | Rengar | +0.59 | 0.59 | 0.00 |  |
| 50 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 51 | Vex | +0.57 | 0.57 | 0.00 | range (attacks) |
| 52 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 53 | Jax | +0.55 | 0.55 | 0.00 |  |
| 54 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 55 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 56 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Xin Zhao | +0.53 | 0.53 | 0.00 |  |
| 60 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 61 | Kled | +0.51 | 0.51 | 0.00 |  |
| 62 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 63 | Quinn | +0.50 | 0.67 | 0.17 | range (attacks) |
| 64 | Mel | +0.50 | 0.50 | 0.00 | range (attacks) |
| 65 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 66 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 67 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 68 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 69 | Azir | +0.47 | 0.47 | 0.00 |  |
| 70 | Heimerdinger | +0.47 | 0.47 | 0.00 |  |
| 71 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 72 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 73 | Nilah | +0.45 | 0.45 | 0.00 |  |
| 74 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 75 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 76 | Annie | +0.44 | 0.44 | 0.00 |  |
| 77 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 78 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 79 | Brand | +0.41 | 0.41 | 0.00 |  |
| 80 | Graves | +0.41 | 0.41 | 0.00 |  |
| 81 | Nami | +0.41 | 0.41 | 0.00 |  |
| 82 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 83 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 84 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 85 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 86 | Karma | +0.38 | 0.38 | 0.00 |  |
| 87 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 88 | Zaahen | +0.38 | 0.38 | 0.00 |  |
| 89 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 90 | Swain | +0.36 | 0.36 | 0.00 |  |
| 91 | Malzahar | +0.34 | 0.74 | 0.40 |  |
| 92 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 93 | Aurelion Sol | +0.34 | 0.41 | 0.07 |  |
| 94 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 95 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 96 | Kayn | +0.31 | 0.76 | 0.45 |  |
| 97 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 98 | Sion | +0.31 | 0.42 | 0.11 |  |
| 99 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 100 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 101 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 102 | Garen | +0.24 | 0.24 | 0.00 |  |
| 103 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 104 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 105 | Ivern | +0.21 | 0.33 | 0.12 |  |
| 106 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 107 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 108 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 109 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 110 | Rammus | +0.14 | 0.36 | 0.22 |  |
| 111 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 112 | Pantheon | +0.13 | 0.62 | 0.49 |  |
| 113 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 114 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 115 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 116 | Shen | +0.07 | 0.52 | 0.45 |  |
| 117 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 118 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 119 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 120 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 121 | Sett | +0.07 | 0.07 | 0.00 |  |
| 122 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 123 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 124 | Yone | +0.07 | 0.07 | 0.00 |  |
| 125 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 130 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 131 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 132 | Braum | 0.00 | 0.00 | 0.00 |  |
| 133 | Briar | 0.00 | 0.00 | 0.00 |  |
| 134 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 142 | Leona | 0.00 | 0.00 | 0.00 |  |
| 143 | Locke | 0.00 | 0.00 | 0.00 |  |
| 144 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 153 | Talon | 0.00 | 0.00 | 0.00 |  |
| 154 | Taric | 0.00 | 0.00 | 0.00 |  |
| 155 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 158 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 159 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 160 | Katarina | -0.06 | 0.22 | 0.28 |  |
| 161 | Fiddlesticks | -0.09 | 0.34 | 0.43 |  |
| 162 | Viego | -0.11 | 0.07 | 0.18 |  |
| 163 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 164 | Gragas | -0.13 | 0.00 | 0.13 |  |
| 165 | Warwick | -0.16 | 0.47 | 0.63 |  |
| 166 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 167 | Nunu & Willump | -0.22 | 0.24 | 0.46 |  |
| 168 | Vi | -0.24 | 0.07 | 0.31 |  |
| 169 | Zac | -0.37 | 0.00 | 0.37 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.58 | 0.00 | 0.58 |  |
