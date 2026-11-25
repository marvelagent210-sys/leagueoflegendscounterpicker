# Counters to Xin Zhao (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Xin Zhao: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Xin Zhao wins every time) to +1 (the champion does). Run `npm run duel -- <champion> XinZhao --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.43 | +1.00 | +0.54 |
| 2 | Malphite | +0.85 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.74 |
| 3 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.43 |
| 4 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.15 |
| 5 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.64 |
| 6 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.77 |
| 7 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.33 |
| 8 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.82 |
| 9 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.69 |
| 10 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.64 |
| 11 | Warwick | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.31 |
| 12 | Nocturne | +0.81 | +1.00 | +0.98 | +1.00 | −0.01 | – | +0.75 |
| 13 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.48 |
| 14 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.47 |
| 15 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.20 |
| 16 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.53 |
| 17 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.01 |
| 18 | Kalista | +0.80 | +0.98 | +1.00 | +1.00 | +0.14 | +1.00 | −0.22 |
| 19 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.59 |
| 20 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.12 |
| 21 | Rakan | +0.80 | +1.00 | +1.00 | +0.85 | +0.01 | +1.00 | +0.54 |
| 22 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.21 |
| 23 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 24 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.05 |
| 25 | Udyr | +0.79 | +1.00 | +0.82 | +1.00 | +0.13 | – | +0.62 |
| 26 | Singed | +0.78 | +1.00 | +1.00 | +0.93 | +0.04 | – | +0.22 |
| 27 | Sivir | +0.78 | +0.97 | +1.00 | +0.94 | −0.06 | +1.00 | +0.09 |
| 28 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.41 |
| 29 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.07 |
| 30 | Ashe | +0.76 | +0.70 | +1.00 | +1.00 | +0.09 | +1.00 | +0.37 |
| 31 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 32 | Zaahen | +0.66 | +0.88 | +0.71 | +1.00 | +0.01 | – | −0.14 |
| 33 | Karma | +0.64 | +0.83 | +0.82 | +0.74 | −0.12 | +0.84 | +0.22 |
| 34 | Milio | +0.63 | +0.92 | +0.92 | +0.22 | +0.24 | +0.85 | +0.06 |
| 35 | Morgana | +0.62 | +0.78 | +0.60 | +0.97 | +0.08 | +0.43 | +0.41 |
| 36 | Ambessa | +0.58 | +1.00 | +1.00 | −0.28 | +0.35 | – | +0.47 |
| 37 | Kennen | +0.57 | +0.66 | +0.38 | +0.96 | +0.04 | +0.97 | +0.22 |
| 38 | Wukong | +0.56 | +1.00 | +1.00 | +0.00 | −0.11 | – | +0.43 |
| 39 | Taric | +0.55 | +0.85 | +0.22 | +1.00 | +0.10 | – | +0.17 |
| 40 | Lulu | +0.55 | +0.97 | +0.85 | +0.82 | +0.16 | −1.00 | −0.01 |
| 41 | Xayah | +0.51 | +0.50 | +1.00 | +0.12 | −0.01 | +1.00 | +0.35 |
| 42 | Pantheon | +0.45 | +0.00 | +0.76 | +1.00 | +0.17 | – | −0.16 |
| 43 | Neeko | +0.36 | +0.98 | +0.79 | −1.00 | +0.07 | +1.00 | +0.20 |
| 44 | Quinn | +0.36 | +0.88 | +0.99 | −0.23 | +0.01 | −0.60 | −0.15 |
| 45 | Twisted Fate | +0.32 | +0.50 | +0.73 | −0.13 | +0.06 | +0.31 | −0.14 |
| 46 | Elise | +0.29 | +0.58 | −0.16 | +1.00 | +0.15 | −0.79 | +0.74 |
| 47 | Graves | +0.21 | +1.00 | +1.00 | −1.00 | +0.23 | −0.93 | −0.66 |
| 48 | Vel'Koz | +0.20 | +0.84 | +1.00 | −1.00 | +0.20 | −1.00 | +0.29 |
| 49 | Zeri | +0.19 | +0.65 | +0.60 | −1.00 | −0.17 | +1.00 | −0.01 |
| 50 | Cassiopeia | +0.12 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.48 |
| 51 | Draven | +0.06 | +0.51 | +0.12 | −1.00 | +0.02 | +1.00 | −0.08 |
| 52 | Syndra | +0.01 | +0.60 | +0.63 | −1.00 | −0.04 | −1.00 | +0.16 |
| 53 | Anivia | −0.02 | −0.12 | +0.11 | −0.09 | −0.12 | +0.15 | +0.12 |
| 54 | Cho'Gath | −0.11 | −1.00 | −0.20 | +1.00 | −0.00 | – | +0.05 |
| 55 | Mordekaiser | −0.15 | +0.13 | −0.90 | +0.30 | −0.06 | – | +0.10 |
| 56 | Bel'Veth | −0.17 | −0.98 | −0.65 | +1.00 | +0.23 | – | +0.41 |
| 57 | Lucian | −0.17 | +0.14 | +0.10 | −1.00 | +0.01 | −0.63 | +0.58 |
| 58 | Gangplank | −0.17 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.73 |
| 59 | Volibear | −0.20 | +0.97 | −1.00 | −1.00 | +0.13 | – | +0.19 |
| 60 | Aurora | −0.20 | −1.00 | −1.00 | +1.00 | −0.04 | +1.00 | +0.10 |
| 61 | Sion | −0.22 | −0.51 | −0.28 | +0.00 | −0.06 | – | +0.24 |
| 62 | Zac | −0.23 | −0.06 | −0.05 | −0.94 | −0.00 | – | +0.27 |
| 63 | Brand | −0.25 | −0.25 | −0.14 | −0.78 | +0.00 | +0.04 | −0.01 |
| 64 | Hwei | −0.28 | −0.56 | −0.80 | −0.05 | −0.09 | +0.72 | +0.29 |
| 65 | Tahm Kench | −0.29 | −0.43 | −0.23 | −0.53 | +0.07 | – | +0.07 |
| 66 | Heimerdinger | −0.29 | −0.74 | −1.00 | +1.00 | +0.17 | −0.98 | +0.37 |
| 67 | Camille | −0.29 | +0.00 | −1.00 | +0.00 | +0.04 | – | −0.36 |
| 68 | Orianna | −0.31 | −0.78 | −1.00 | +1.00 | −0.02 | −0.63 | −0.01 |
| 69 | Jayce | −0.32 | −0.03 | −1.00 | −0.42 | +0.13 | – | +0.71 |
| 70 | Miss Fortune | −0.32 | +1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.24 |
| 71 | Zilean | −0.34 | +0.53 | −1.00 | −1.00 | −0.03 | −0.13 | −0.05 |
| 72 | Nilah | −0.38 | −0.54 | −0.64 | −0.54 | +0.27 | – | +0.38 |
| 73 | Janna | −0.39 | +0.05 | −1.00 | −1.00 | +0.12 | +0.16 | +0.28 |
| 74 | Bard | −0.42 | −0.39 | −0.44 | −1.00 | +0.12 | −0.40 | +0.23 |
| 75 | Corki | −0.44 | −1.00 | −0.22 | −0.16 | +0.10 | −1.00 | −0.32 |
| 76 | Braum | −0.47 | −0.70 | −1.00 | +0.00 | −0.03 | – | +0.16 |
| 77 | Lillia | −0.49 | −1.00 | −1.00 | −0.39 | +0.00 | +0.81 | +0.21 |
| 78 | Yunara | −0.50 | −0.71 | −0.43 | −1.00 | −0.07 | +0.14 | −0.26 |
| 79 | Jinx | −0.59 | −0.13 | −1.00 | −1.00 | +0.04 | −1.00 | −0.21 |
| 80 | Ezreal | −0.60 | −1.00 | −1.00 | −0.92 | +0.06 | +0.76 | +0.02 |
| 81 | Tristana | −0.64 | −1.00 | −1.00 | −1.00 | −0.05 | +0.82 | −0.24 |
| 82 | Ziggs | −0.66 | −1.00 | −1.00 | −1.00 | +0.06 | +0.31 | +0.08 |
| 83 | Ahri | −0.70 | −1.00 | −1.00 | −1.00 | +0.13 | −0.34 | +0.34 |
| 84 | Riven | −0.70 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.72 |
| 85 | Varus | −0.71 | −1.00 | −0.71 | −1.00 | +0.02 | −0.87 | +0.08 |
| 86 | Gnar | −0.71 | −1.00 | −1.00 | −1.00 | −0.05 | −0.23 | +0.37 |
| 87 | Jarvan IV | −0.71 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.77 |
| 88 | Ornn | −0.73 | −1.00 | −1.00 | −1.00 | +0.24 | – | +0.19 |
| 89 | Zed | −0.73 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.65 |
| 90 | Master Yi | −0.73 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.53 |
| 91 | Evelynn | −0.73 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.40 |
| 92 | Garen | −0.73 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.25 |
| 93 | Viego | −0.74 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.30 |
| 94 | Kayn | −0.74 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.33 |
| 95 | Gwen | −0.74 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.62 |
| 96 | Hecarim | −0.74 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.17 |
| 97 | Nunu & Willump | −0.74 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.30 |
| 98 | Skarner | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.09 |
| 99 | Yone | −0.75 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.50 |
| 100 | Rengar | −0.76 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.38 |
| 101 | Maokai | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.01 |
| 102 | Amumu | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.23 |
| 103 | Lee Sin | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.21 |
| 104 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.05 |
| 105 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.22 |
| 106 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.05 |
| 107 | Fizz | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.22 |
| 108 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.03 |
| 109 | Briar | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.07 |
| 110 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.23 |
| 111 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.18 |
| 112 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.32 |
| 113 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.18 |
| 114 | Annie | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.00 |
| 115 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.49 |
| 116 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.26 |
| 117 | Rell | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.04 |
| 118 | Leona | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.07 |
| 119 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.15 |
| 120 | Rammus | −0.78 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.35 |
| 121 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.20 |
| 122 | Vi | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.02 |
| 123 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.26 |
| 124 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.05 |
| 125 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.07 |
| 126 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.01 |
| 127 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.14 |
| 128 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.08 |
| 129 | Sett | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.09 |
| 130 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.13 |
| 131 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.01 |
| 132 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.05 |
| 133 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.14 |
| 134 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.09 |
| 135 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.11 |
| 136 | Jhin | −0.79 | −0.94 | −1.00 | −1.00 | −0.08 | −1.00 | +0.09 |
| 137 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.18 |
| 138 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.30 |
| 139 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.09 |
| 140 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.20 |
| 141 | Akshan | −0.80 | −0.95 | −1.00 | −1.00 | −0.04 | −1.00 | −0.10 |
| 142 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.01 |
| 143 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.29 |
| 144 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.08 |
| 145 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.31 |
| 146 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.01 |
| 147 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.28 |
| 148 | Aurelion Sol | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.10 |
| 149 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.17 |
| 150 | Azir | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.16 |
| 151 | Mel | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.04 |
| 152 | Lux | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.08 |
| 153 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.14 |
| 154 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.15 |
| 155 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.31 |
| 156 | Malzahar | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.02 |
| 157 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.07 |
| 158 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.17 |
| 159 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.03 |
| 160 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.19 |
| 161 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.27 |
| 162 | Nami | −0.82 | −1.00 | −0.99 | −1.00 | −0.07 | −1.00 | −0.18 |
| 163 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.23 |
| 164 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.14 |
| 165 | Vex | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.08 |
| 166 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.27 |
| 167 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.51 |
| 168 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.39 |
| 169 | Seraphine | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.35 |
| 170 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | −0.11 |
| 171 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.28 |
| 172 | Renata Glasc | −0.85 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.57 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Xin Zhao's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xin Zhao's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> XinZhao` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.57)

- **0.80** spell shield: Spell Shield's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao R Crescent Guard)
- **0.61** spell shield: Spell Shield's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xin Zhao E Audacious Charge)
- **0.41** range: Sivir's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Sivir basic attacks → Xin Zhao basic attacks)

#### 2. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 2.5 s, long enough to use ahead of Crescent Guard. (Bard R Tempered Fate → Xin Zhao R Crescent Guard)
- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 2.5 s, long enough to use ahead of Audacious Charge. (Bard R Tempered Fate → Xin Zhao E Audacious Charge)
- **0.31** range: Bard's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Bard basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Bard's Cosmic Binding (its crowd control still applies).

#### 3. Fiora (net +1.17)

- **0.90** parry: Riposte parries Xin Zhao's Crescent Guard and stuns back. Parry for 0.75 s; Crescent Guard takes 0.35 s to land, enough to react. Negating Crescent Guard's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao R Crescent Guard)
- **0.65** parry: Riposte parries Xin Zhao's Audacious Charge. Parry for 0.75 s; Audacious Charge takes 0.26 s to land, enough to react. (Fiora W Riposte → Xin Zhao E Audacious Charge)
- **0.35** parry: Riposte parries Xin Zhao's Three Talon Strike and stuns back. Parry for 0.75 s; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Three Talon Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Fiora's Riposte (its crowd control still applies).

#### 4. Udyr (net +1.06)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for 1.5 s, long enough to use ahead of Crescent Guard. (Udyr E Blazing Stampede → Xin Zhao R Crescent Guard)
- **0.63** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Three Talon Strike (airborne). Immune for 1.5 s, long enough to use ahead of Three Talon Strike. (Udyr E Blazing Stampede → Xin Zhao Q Three Talon Strike)
- **0.20** cc immunity: Blazing Stampede makes Udyr immune to Xin Zhao's Audacious Charge (slow). Immune for 1.5 s, long enough to use ahead of Audacious Charge. (Udyr E Blazing Stampede → Xin Zhao E Audacious Charge)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Udyr's Wingborne Storm (its crowd control still applies).

#### 5. Aurora (net +0.97)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 0.4 s; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao R Crescent Guard)
- **0.37** untargetable: Between Worlds makes Aurora untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 0.4 s; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Xin Zhao E Audacious Charge)
- **0.27** range: Aurora's basic attacks reach 375 units farther than Xin Zhao's (550 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Aurora basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Aurora's Between Worlds (its crowd control still applies).

#### 6. Kled (net +0.96)

- **0.76** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Crescent Guard (airborne, stun). Immune for ?; Crescent Guard takes 0.35 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao R Crescent Guard)
- **0.18** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Three Talon Strike (airborne). Immune for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kled R Chaaaaaaaarge!!! → Xin Zhao Q Three Talon Strike)
- **0.09** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Xin Zhao's Audacious Charge (slow). Immune for ?; Audacious Charge takes 0.26 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Xin Zhao E Audacious Charge)

#### 7. Gwen (net +0.93)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for ?; Crescent Guard takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao R Crescent Guard)
- **0.61** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for ?; Audacious Charge takes 0.26 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao E Audacious Charge)
- **0.24** untargetable: Hallowed Mist makes Gwen untargetable, dodging Xin Zhao's Three Talon Strike. Untargetable for ?; Three Talon Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Gwen's Needlework (its crowd control still applies).

#### 8. Teemo (net +0.90)

- **0.58** blind: Blinding Dart's blind makes Xin Zhao's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Xin Zhao basic attacks)
- **0.46** blind: Blinding Dart's blind makes Xin Zhao's Three Talon Strike, an empowered attack, miss. Blind for 3 s. Spell shield will only block the knock up. (Teemo Q Blinding Dart → Xin Zhao Q Three Talon Strike)
- **0.29** range: Teemo's basic attacks reach 325 units farther than Xin Zhao's (500 vs 175 attack range). Xin Zhao closes the gap with Audacious Charge. (Teemo basic attacks → Xin Zhao basic attacks)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Teemo's Noxious Trap (its crowd control still applies).

#### 9. Nocturne (net +0.89)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Crescent Guard. Spell shield for 1.5 s, long enough to use ahead of Crescent Guard. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao R Crescent Guard)
- **0.76** spell shield: Shroud of Darkness's spell shield blocks Xin Zhao's Audacious Charge. Spell shield for 1.5 s, long enough to use ahead of Audacious Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xin Zhao E Audacious Charge)
- **0.23** spell shield: Shroud of Darkness's spell shield blocks part of Xin Zhao's Three Talon Strike. Spell shield for 1.5 s, long enough to use ahead of Three Talon Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the knock up. (Nocturne W Shroud of Darkness → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Nocturne's Paranoia (its crowd control still applies).

#### 10. Lissandra (net +0.88)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Crescent Guard. Untargetable for 2.5 s, long enough to use ahead of Crescent Guard. (Lissandra R Frozen Tomb → Xin Zhao R Crescent Guard)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Audacious Charge. Untargetable for 2.5 s, long enough to use ahead of Audacious Charge. (Lissandra R Frozen Tomb → Xin Zhao E Audacious Charge)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xin Zhao's Three Talon Strike. Untargetable for 2.5 s, long enough to use ahead of Three Talon Strike. (Lissandra R Frozen Tomb → Xin Zhao Q Three Talon Strike)
- Watch out: Crescent Guard makes Xin Zhao invulnerable to Lissandra's Frozen Tomb (its crowd control still applies).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.57 | 1.57 | 0.00 |  |
| 2 | Bard | +1.28 | 1.38 | 0.10 |  |
| 3 | Fiora | +1.17 | 1.33 | 0.16 |  |
| 4 | Udyr | +1.06 | 1.18 | 0.12 |  |
| 5 | Aurora | +0.97 | 1.32 | 0.35 |  |
| 6 | Kled | +0.96 | 0.96 | 0.00 |  |
| 7 | Gwen | +0.93 | 1.17 | 0.24 |  |
| 8 | Teemo | +0.90 | 1.10 | 0.20 | blind (Blinding Dart), blind (Blinding Dart) |
| 9 | Nocturne | +0.89 | 1.42 | 0.53 |  |
| 10 | Lissandra | +0.88 | 1.31 | 0.43 |  |
| 11 | Milio | +0.87 | 1.03 | 0.16 |  |
| 12 | Morgana | +0.86 | 1.22 | 0.36 |  |
| 13 | Kalista | +0.86 | 1.00 | 0.14 |  |
| 14 | Olaf | +0.79 | 0.99 | 0.20 |  |
| 15 | Xayah | +0.77 | 1.40 | 0.63 |  |
| 16 | Maokai | +0.74 | 1.27 | 0.53 |  |
| 17 | Fizz | +0.70 | 1.28 | 0.58 |  |
| 18 | Kayle | +0.69 | 0.89 | 0.20 |  |
| 19 | Yuumi | +0.68 | 1.58 | 0.90 |  |
| 20 | Lulu | +0.65 | 0.75 | 0.10 | disarm (Whimsy) |
| 21 | Master Yi | +0.62 | 1.31 | 0.69 |  |
| 22 | Vladimir | +0.61 | 1.38 | 0.77 |  |
| 23 | Singed | +0.59 | 0.75 | 0.16 |  |
| 24 | Rengar | +0.57 | 0.89 | 0.32 |  |
| 25 | Shaco | +0.56 | 1.04 | 0.48 |  |
| 26 | Rek'Sai | +0.51 | 1.10 | 0.59 |  |
| 27 | Alistar | +0.49 | 0.79 | 0.30 |  |
| 28 | Gangplank | +0.47 | 0.85 | 0.38 |  |
| 29 | Camille | +0.43 | 1.06 | 0.63 |  |
| 30 | Sion | +0.42 | 0.99 | 0.57 |  |
| 31 | Vex | +0.41 | 0.76 | 0.35 |  |
| 32 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 33 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 34 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 35 | Kindred | +0.31 | 0.41 | 0.10 |  |
| 36 | Viktor | +0.30 | 0.64 | 0.34 |  |
| 37 | Nasus | +0.22 | 0.45 | 0.23 | attack speed slow (Wither) |
| 38 | Jinx | +0.20 | 0.65 | 0.45 | dash stop (Flame Chompers!) |
| 39 | Hwei | +0.20 | 0.61 | 0.41 | dash stop (Grim Visage) |
| 40 | Renata Glasc | +0.19 | 0.36 | 0.17 |  |
| 41 | Veigar | +0.15 | 0.57 | 0.42 |  |
| 42 | Zilean | +0.14 | 0.30 | 0.16 |  |
| 43 | Zed | +0.13 | 1.03 | 0.90 |  |
| 44 | Zoe | +0.13 | 0.30 | 0.17 |  |
| 45 | Garen | +0.11 | 0.45 | 0.34 |  |
| 46 | Cassiopeia | +0.10 | 0.59 | 0.49 |  |
| 47 | Soraka | +0.08 | 0.25 | 0.17 |  |
| 48 | Varus | +0.07 | 0.51 | 0.44 |  |
| 49 | Ashe | +0.06 | 0.36 | 0.30 |  |
| 50 | Heimerdinger | +0.06 | 0.30 | 0.24 |  |
| 51 | Nilah | +0.05 | 0.60 | 0.55 | attack dodge (Jubilant Veil) |
| 52 | Vayne | +0.02 | 0.40 | 0.38 |  |
| 53 | Zaahen | +0.01 | 0.92 | 0.91 |  |
| 54 | Corki | +0.01 | 0.30 | 0.29 |  |
| 55 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 56 | Evelynn | -0.01 | 1.04 | 1.05 |  |
| 57 | Malzahar | -0.01 | 0.98 | 0.99 |  |
| 58 | Jax | -0.02 | 0.75 | 0.77 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 59 | Gnar | -0.02 | 0.29 | 0.31 |  |
| 60 | Kog'Maw | -0.02 | 0.24 | 0.26 |  |
| 61 | Karma | -0.03 | 0.19 | 0.22 |  |
| 62 | Zeri | -0.04 | 0.41 | 0.45 |  |
| 63 | Jayce | -0.04 | 0.26 | 0.30 |  |
| 64 | Kayn | -0.05 | 1.04 | 1.09 |  |
| 65 | Aphelios | -0.05 | 0.47 | 0.52 |  |
| 66 | Mordekaiser | -0.05 | 0.11 | 0.16 |  |
| 67 | Elise | -0.06 | 0.30 | 0.36 |  |
| 68 | LeBlanc | -0.06 | 0.19 | 0.25 |  |
| 69 | Nidalee | -0.10 | 0.26 | 0.36 |  |
| 70 | Anivia | -0.10 | 0.24 | 0.34 |  |
| 71 | Sona | -0.11 | 0.39 | 0.50 |  |
| 72 | Smolder | -0.14 | 0.30 | 0.44 |  |
| 73 | Samira | -0.14 | 0.26 | 0.40 |  |
| 74 | Tristana | -0.15 | 0.36 | 0.51 |  |
| 75 | Shyvana | -0.15 | 0.18 | 0.33 |  |
| 76 | Malphite | -0.16 | 0.47 | 0.63 |  |
| 77 | Lux | -0.16 | 0.27 | 0.43 |  |
| 78 | Brand | -0.17 | 0.21 | 0.38 |  |
| 79 | Taric | -0.17 | 0.00 | 0.17 |  |
| 80 | Yone | -0.18 | 0.37 | 0.55 |  |
| 81 | Ahri | -0.19 | 0.59 | 0.78 |  |
| 82 | Dr. Mundo | -0.20 | 0.00 | 0.20 |  |
| 83 | Thresh | -0.21 | 0.16 | 0.37 |  |
| 84 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 85 | Zyra | -0.22 | 0.24 | 0.46 |  |
| 86 | Orianna | -0.22 | 0.23 | 0.45 |  |
| 87 | Seraphine | -0.23 | 0.25 | 0.48 |  |
| 88 | Yorick | -0.23 | 0.00 | 0.23 |  |
| 89 | K'Sante | -0.24 | 0.36 | 0.60 |  |
| 90 | Rumble | -0.24 | 0.00 | 0.24 |  |
| 91 | Poppy | -0.25 | 0.50 | 0.75 | dash stop (Steadfast Presence) |
| 92 | Neeko | -0.25 | 0.21 | 0.46 |  |
| 93 | Ivern | -0.26 | 0.16 | 0.42 |  |
| 94 | Warwick | -0.28 | 1.14 | 1.42 |  |
| 95 | Kennen | -0.28 | 0.27 | 0.55 |  |
| 96 | Bel'Veth | -0.28 | 0.00 | 0.28 |  |
| 97 | Blitzcrank | -0.28 | 0.00 | 0.28 |  |
| 98 | Quinn | -0.29 | 0.34 | 0.63 |  |
| 99 | Ziggs | -0.30 | 0.25 | 0.55 |  |
| 100 | Azir | -0.30 | 0.23 | 0.53 |  |
| 101 | Lee Sin | -0.30 | 0.00 | 0.30 |  |
| 102 | Caitlyn | -0.31 | 0.36 | 0.67 |  |
| 103 | Mel | -0.31 | 0.25 | 0.56 |  |
| 104 | Skarner | -0.31 | 0.13 | 0.44 |  |
| 105 | Shen | -0.32 | 0.72 | 1.04 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 106 | Ezreal | -0.32 | 0.30 | 0.62 |  |
| 107 | Urgot | -0.32 | 0.12 | 0.44 |  |
| 108 | Lillia | -0.32 | 0.08 | 0.40 |  |
| 109 | Graves | -0.33 | 0.20 | 0.53 |  |
| 110 | Amumu | -0.33 | 0.19 | 0.52 |  |
| 111 | Akshan | -0.34 | 0.29 | 0.63 |  |
| 112 | Nami | -0.34 | 0.21 | 0.55 |  |
| 113 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 114 | Senna | -0.36 | 0.32 | 0.68 |  |
| 115 | Jarvan IV | -0.37 | 0.18 | 0.55 |  |
| 116 | Katarina | -0.38 | 0.24 | 0.62 |  |
| 117 | Twisted Fate | -0.39 | 0.38 | 0.77 |  |
| 118 | Sett | -0.40 | 0.18 | 0.58 |  |
| 119 | Braum | -0.40 | 0.00 | 0.40 |  |
| 120 | Draven | -0.41 | 0.34 | 0.75 |  |
| 121 | Hecarim | -0.41 | 0.19 | 0.60 |  |
| 122 | Rakan | -0.41 | 0.09 | 0.50 |  |
| 123 | Riven | -0.41 | 0.00 | 0.41 |  |
| 124 | Volibear | -0.43 | 0.18 | 0.61 |  |
| 125 | Rammus | -0.44 | 0.44 | 0.88 | attack reflect (Defensive Ball Curl) |
| 126 | Aurelion Sol | -0.44 | 0.21 | 0.65 |  |
| 127 | Nautilus | -0.44 | 0.00 | 0.44 |  |
| 128 | Vel'Koz | -0.45 | 0.23 | 0.68 |  |
| 129 | Ornn | -0.45 | 0.18 | 0.63 |  |
| 130 | Leona | -0.45 | 0.00 | 0.45 |  |
| 131 | Illaoi | -0.46 | 0.18 | 0.64 |  |
| 132 | Sylas | -0.47 | 0.00 | 0.47 |  |
| 133 | Swain | -0.48 | 0.18 | 0.66 |  |
| 134 | Jhin | -0.50 | 0.25 | 0.75 |  |
| 135 | Annie | -0.50 | 0.22 | 0.72 |  |
| 136 | Ambessa | -0.50 | 0.00 | 0.50 |  |
| 137 | Syndra | -0.52 | 0.21 | 0.73 |  |
| 138 | Irelia | -0.52 | 0.00 | 0.52 |  |
| 139 | Darius | -0.53 | 0.00 | 0.53 |  |
| 140 | Cho'Gath | -0.54 | 0.00 | 0.54 |  |
| 141 | Kassadin | -0.54 | 0.00 | 0.54 |  |
| 142 | Sejuani | -0.54 | 0.00 | 0.54 |  |
| 143 | Trundle | -0.54 | 0.00 | 0.54 |  |
| 144 | Rell | -0.55 | 0.00 | 0.55 |  |
| 145 | Yasuo | -0.55 | 0.00 | 0.55 |  |
| 146 | Diana | -0.56 | 0.00 | 0.56 |  |
| 147 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 148 | Janna | -0.57 | 0.34 | 0.91 |  |
| 149 | Briar | -0.60 | 0.00 | 0.60 |  |
| 150 | Talon | -0.60 | 0.00 | 0.60 |  |
| 151 | Wukong | -0.61 | 0.00 | 0.61 |  |
| 152 | Pantheon | -0.62 | 0.61 | 1.23 |  |
| 153 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 154 | Ryze | -0.64 | 0.22 | 0.86 |  |
| 155 | Locke | -0.64 | 0.00 | 0.64 |  |
| 156 | Viego | -0.65 | 0.18 | 0.83 |  |
| 157 | Zac | -0.67 | 0.40 | 1.07 | dash stop (Stretching Strikes) |
| 158 | Lucian | -0.67 | 0.31 | 0.98 |  |
| 159 | Akali | -0.68 | 0.00 | 0.68 |  |
| 160 | Nunu & Willump | -0.70 | 0.27 | 0.97 |  |
| 161 | Miss Fortune | -0.73 | 0.30 | 1.03 |  |
| 162 | Gragas | -0.74 | 0.00 | 0.74 |  |
| 163 | Karthus | -0.81 | 0.16 | 0.97 |  |
| 164 | Taliyah | -0.82 | 0.23 | 1.05 |  |
| 165 | Ekko | -0.83 | 0.00 | 0.83 |  |
| 166 | Xerath | -0.84 | 0.23 | 1.07 |  |
| 167 | Tahm Kench | -0.88 | 0.00 | 0.88 |  |
| 168 | Vi | -0.98 | 0.18 | 1.16 |  |
| 169 | Naafiri | -1.05 | 0.00 | 1.05 |  |
| 170 | Fiddlesticks | -1.14 | 0.17 | 1.31 |  |
| 171 | Pyke | -1.30 | 0.00 | 1.30 |  |
| 172 | Galio | -1.42 | 0.00 | 1.42 |  |
