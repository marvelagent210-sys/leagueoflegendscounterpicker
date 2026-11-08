# Counters to Kalista (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kalista: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kalista wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kalista --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.87 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +1.00 |
| 2 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 4 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 5 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 6 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +1.00 |
| 7 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 8 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 9 | Sylas | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 10 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 11 | Jhin | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 12 | Ziggs | +0.80 | +1.00 | +0.95 | +1.00 | +0.20 | – | +0.00 |
| 13 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 14 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 15 | Ashe | +0.79 | +1.00 | +0.98 | +1.00 | +0.14 | – | +0.00 |
| 16 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 17 | Corki | +0.78 | +0.98 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 18 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 19 | Kennen | +0.77 | +1.00 | +1.00 | +0.94 | +0.04 | – | +0.00 |
| 20 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 21 | Twisted Fate | +0.76 | +0.93 | +0.96 | +1.00 | +0.06 | – | +0.00 |
| 22 | Yunara | +0.74 | +0.97 | +0.96 | +0.87 | +0.10 | – | −0.09 |
| 23 | Rengar | +0.72 | +0.89 | +0.97 | +1.00 | +0.35 | −0.01 | +0.00 |
| 24 | Malphite | +0.70 | +1.00 | +1.00 | +1.00 | +0.09 | −0.16 | +0.00 |
| 25 | Tahm Kench | +0.68 | +0.90 | +0.91 | +0.97 | +0.13 | +0.14 | +0.00 |
| 26 | Rumble | +0.62 | +0.84 | +0.84 | +0.69 | −0.04 | +0.70 | +0.00 |
| 27 | Graves | +0.62 | +1.00 | +1.00 | +1.00 | +0.13 | −1.00 | +0.00 |
| 28 | Urgot | +0.61 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 29 | Orianna | +0.60 | +0.30 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 30 | Shyvana | +0.60 | +1.00 | +1.00 | +1.00 | +0.00 | −1.00 | +0.00 |
| 31 | Sett | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 32 | Varus | +0.59 | +0.32 | +0.96 | +1.00 | +0.07 | – | +0.00 |
| 33 | Darius | +0.59 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 34 | Dr. Mundo | +0.58 | +0.84 | +0.74 | +0.96 | −0.10 | +0.09 | +0.00 |
| 35 | Gwen | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 36 | Mordekaiser | +0.57 | +0.94 | +0.99 | +1.00 | −0.08 | −1.00 | +0.00 |
| 37 | Viego | +0.56 | +1.00 | +0.92 | +1.00 | −0.12 | −1.00 | +0.00 |
| 38 | Morgana | +0.56 | +0.80 | +0.63 | +0.78 | −0.04 | – | +0.00 |
| 39 | Jinx | +0.54 | +0.87 | +0.57 | +0.57 | +0.09 | – | +0.00 |
| 40 | Maokai | +0.41 | +1.00 | −0.64 | +1.00 | +0.16 | +1.00 | +0.00 |
| 41 | Nilah | +0.40 | +1.00 | +0.89 | +0.02 | +0.19 | −1.00 | +0.00 |
| 42 | Annie | +0.39 | +1.00 | −0.69 | +1.00 | +0.12 | +1.00 | +0.00 |
| 43 | Swain | +0.39 | +0.41 | +0.25 | +0.88 | +0.08 | – | +0.00 |
| 44 | Vex | +0.36 | −0.37 | +0.83 | +1.00 | +0.04 | – | +0.00 |
| 45 | Miss Fortune | +0.35 | +1.00 | +1.00 | −1.00 | +0.12 | – | +0.00 |
| 46 | Fiddlesticks | +0.35 | +1.00 | +1.00 | −1.00 | +0.07 | – | +0.00 |
| 47 | Azir | +0.34 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 48 | Xayah | +0.31 | +1.00 | −0.74 | +1.00 | +0.11 | – | +0.00 |
| 49 | Vel'Koz | +0.31 | −0.20 | +0.98 | +0.21 | +0.25 | – | +0.00 |
| 50 | Sion | +0.30 | −0.02 | +0.68 | +0.89 | −0.06 | −0.34 | +0.00 |
| 51 | Karma | +0.27 | +0.06 | +0.19 | +0.83 | +0.10 | – | +0.00 |
| 52 | Locke | +0.26 | −0.43 | +1.00 | +1.00 | −0.14 | −0.61 | +0.00 |
| 53 | Anivia | +0.26 | +0.35 | +0.38 | +0.31 | −0.08 | – | +0.00 |
| 54 | Zilean | +0.24 | −1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 55 | Yasuo | +0.23 | +1.00 | +0.69 | −0.43 | −0.01 | −1.00 | +0.00 |
| 56 | Brand | +0.20 | +0.19 | −0.02 | +0.68 | +0.04 | – | +0.00 |
| 57 | Yone | +0.18 | +1.00 | +1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 58 | Taric | +0.17 | +0.29 | +0.28 | +0.28 | +0.06 | −0.36 | +0.00 |
| 59 | Gnar | +0.14 | +0.27 | +0.10 | +0.66 | +0.07 | −1.00 | +0.00 |
| 60 | Zac | +0.13 | +0.20 | +1.00 | −0.70 | −0.10 | −0.16 | +0.00 |
| 61 | Zaahen | +0.11 | +0.04 | +0.39 | +0.63 | −0.13 | −1.00 | +0.00 |
| 62 | Neeko | +0.11 | +0.10 | −0.47 | +0.82 | +0.19 | – | +0.00 |
| 63 | Fiora | +0.09 | +1.00 | −1.00 | +1.00 | −0.42 | −1.00 | +1.00 |
| 64 | Tristana | +0.03 | +0.00 | −0.40 | +1.00 | +0.06 | −0.79 | +0.00 |
| 65 | Gragas | −0.07 | −0.73 | +0.87 | +0.00 | −0.03 | −1.00 | +0.00 |
| 66 | Jayce | −0.10 | −1.00 | +1.00 | −0.07 | +0.10 | −1.00 | +0.00 |
| 67 | Zeri | −0.15 | −0.71 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 68 | Udyr | −0.22 | −0.66 | +1.00 | −0.89 | −0.15 | −1.00 | +0.00 |
| 69 | Illaoi | −0.22 | −1.00 | +0.61 | −0.14 | +0.03 | −1.00 | +0.00 |
| 70 | Lux | −0.26 | −1.00 | −0.72 | +0.93 | +0.06 | – | +0.00 |
| 71 | Naafiri | −0.31 | +1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 72 | Fizz | −0.32 | +0.00 | +0.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 73 | Bel'Veth | −0.38 | −1.00 | −1.00 | +1.00 | +0.14 | −1.00 | +0.00 |
| 74 | Gangplank | −0.39 | −1.00 | −0.94 | +1.00 | −0.06 | −1.00 | +0.00 |
| 75 | Jax | −0.40 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 76 | Kled | −0.41 | −1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 77 | Twitch | −0.48 | −0.84 | −0.98 | +0.04 | +0.10 | – | +0.00 |
| 78 | Lillia | −0.49 | −0.39 | −0.38 | −1.00 | +0.04 | −1.00 | +0.00 |
| 79 | Lucian | −0.50 | −1.00 | +0.00 | −1.00 | +0.01 | – | +0.00 |
| 80 | Kai'Sa | −0.51 | −1.00 | −0.07 | −1.00 | +0.04 | – | +0.00 |
| 81 | Seraphine | −0.59 | −0.70 | −0.70 | −1.00 | +0.14 | – | +0.00 |
| 82 | Karthus | −0.60 | −0.89 | −0.48 | −1.00 | +0.04 | – | +0.00 |
| 83 | Caitlyn | −0.66 | −0.49 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 84 | Aurelion Sol | −0.70 | −1.00 | −1.00 | −1.00 | +0.45 | – | +0.00 |
| 85 | Ornn | −0.71 | −1.00 | −1.00 | −1.00 | +0.14 | −0.34 | +0.00 |
| 86 | Hwei | −0.72 | −0.94 | −0.85 | −1.00 | +0.00 | – | +0.00 |
| 87 | Thresh | −0.73 | −1.00 | −1.00 | −0.68 | −0.16 | – | +0.00 |
| 88 | Master Yi | −0.75 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +1.00 |
| 89 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.23 | – | −0.34 |
| 90 | Ryze | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 91 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 92 | Zyra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 93 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 94 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 95 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 96 | Camille | −0.77 | −0.79 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 97 | Veigar | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 98 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 99 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 100 | Kindred | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 101 | Draven | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 102 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 103 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 104 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 105 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 106 | Viktor | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 107 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 108 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 109 | Ezreal | −0.78 | −1.00 | −0.98 | −1.00 | −0.02 | – | +0.00 |
| 110 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 111 | Poppy | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 112 | Samira | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 113 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 114 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 115 | Quinn | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 116 | Bard | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 117 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 118 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 119 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 120 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 121 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 122 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 123 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 124 | Ambessa | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 125 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 126 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 127 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 128 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 129 | Warwick | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 130 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 131 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 132 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 133 | Garen | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 134 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 135 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 136 | Riven | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 137 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.18 | – | −0.95 |
| 138 | Cho'Gath | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 139 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 140 | Rek'Sai | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 141 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 142 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 143 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 144 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 145 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 146 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 147 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 148 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 149 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 150 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 151 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 152 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 153 | Nocturne | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 154 | Rammus | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 155 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 156 | Xin Zhao | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 157 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 158 | Rakan | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 159 | Lee Sin | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 160 | Vi | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 161 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 162 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 163 | Volibear | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 164 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 165 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 166 | Tryndamere | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 167 | Kha'Zix | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 168 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 169 | Aatrox | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.07 |
| 170 | Pantheon | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 171 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.47 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kalista's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kalista's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kalista` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.95)

- **0.95** spell shield: Spell Shield's spell shield blocks Kalista's Fate's Call. Spell shield for 1.5 s, long enough to use ahead of Fate's Call. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kalista R Fate's Call)

#### 2. Vladimir (net +0.87)

- **0.95** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kalista's Fate's Call. Untargetable for 2 s, long enough to use ahead of Fate's Call. (Vladimir W Sanguine Pool → Kalista R Fate's Call)
- **0.23** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kalista's Basic Attack. Untargetable for 2 s, long enough to use ahead of Basic Attack. (Vladimir W Sanguine Pool → Kalista basic attacks)
- Watch out: Kalista's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 3. Xayah (net +0.77)

- **0.95** untargetable: Featherstorm makes Xayah untargetable, dodging Kalista's Fate's Call. Untargetable for 1.5 s, long enough to use ahead of Fate's Call. (Xayah R Featherstorm → Kalista R Fate's Call)
- **0.14** untargetable: Featherstorm makes Xayah untargetable, dodging Kalista's Basic Attack. Untargetable for 1.5 s, long enough to use ahead of Basic Attack. (Xayah R Featherstorm → Kalista basic attacks)
- Watch out: Fate's Call cleanses Xayah's Bladecaller (root) after it lands.

#### 4. Rek'Sai (net +0.64)

- **0.95** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kalista's Fate's Call. Untargetable for 1.5 s, long enough to use ahead of Fate's Call. (Rek'Sai R Void Rush → Kalista R Fate's Call)
- **0.20** cc immunity: Void Rush is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Kalista R Fate's Call)
- **0.14** untargetable: Void Rush makes Rek'Sai untargetable, dodging Kalista's Basic Attack. Untargetable for 1.5 s, long enough to use ahead of Basic Attack. (Rek'Sai R Void Rush → Kalista basic attacks)
- Watch out: Fate's Call cleanses Rek'Sai's Unburrow (airborne) after it lands.

#### 5. Aurora (net +0.54)

- **0.57** untargetable: Between Worlds makes Aurora untargetable, dodging Kalista's Fate's Call. Untargetable for 0.4 s; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kalista R Fate's Call)
- **0.19** cc immunity: Between Worlds is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Kalista R Fate's Call)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Kalista's Basic Attack. Untargetable for 0.4 s, timed to Basic Attack. Does not destroy inbound projectiles. (Aurora R Between Worlds → Kalista basic attacks)
- Watch out: Fate's Call cleanses Aurora's Between Worlds (slow) after it lands.

#### 6. Nocturne (net +0.49)

- **0.95** spell shield: Shroud of Darkness's spell shield blocks Kalista's Fate's Call. Spell shield for 1.5 s, long enough to use ahead of Fate's Call. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Kalista R Fate's Call)
- **0.19** cc immunity: Paranoia is displacement immune, ignoring Kalista's Fate's Call (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Kalista R Fate's Call)
- Watch out: Kalista's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 7. Bard (net +0.42)

- **0.95** untargetable: Tempered Fate makes Bard untargetable, dodging Kalista's Fate's Call. Untargetable for 2.5 s, long enough to use ahead of Fate's Call. (Bard R Tempered Fate → Kalista R Fate's Call)
- **0.14** untargetable: Tempered Fate makes Bard untargetable, dodging Kalista's Basic Attack. Untargetable for 2.5 s, long enough to use ahead of Basic Attack. (Bard R Tempered Fate → Kalista basic attacks)
- Watch out: Fate's Call cleanses Bard's Tempered Fate (stun) after it lands.

#### 8. Lissandra (net +0.40)

- **0.95** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kalista's Fate's Call. Untargetable for 2.5 s, long enough to use ahead of Fate's Call. (Lissandra R Frozen Tomb → Kalista R Fate's Call)
- **0.14** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Kalista's Basic Attack. Untargetable for 2.5 s, long enough to use ahead of Basic Attack. (Lissandra R Frozen Tomb → Kalista basic attacks)
- **0.11** dash stop: Frozen Tomb's knockdown can stop Kalista's Martial Poise mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Kalista I Martial Poise)
- Watch out: Fate's Call cleanses Lissandra's Frozen Tomb (slow, stun) after it lands.

#### 9. Master Yi (net +0.37)

- **0.57** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kalista's Fate's Call. Untargetable for ?; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Kalista R Fate's Call)
- **0.22** untargetable: Alpha Strike makes Master Yi untargetable, dodging Kalista's Basic Attack. Untargetable for ?, timed to Basic Attack. (Master Yi Q Alpha Strike → Kalista basic attacks)
- **0.05** cc immunity: Highlander makes Master Yi immune to Kalista's Rend (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Kalista E Rend)
- Watch out: Kalista's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

#### 10. Zed (net +0.37)

- **0.57** untargetable: Death Mark makes Zed untargetable, dodging Kalista's Fate's Call. Untargetable for 0.6 s; Fate's Call lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Kalista R Fate's Call)
- **0.14** untargetable: Death Mark makes Zed untargetable, dodging Kalista's Basic Attack. Untargetable for 0.6 s, timed to Basic Attack. (Zed R Death Mark → Kalista basic attacks)
- Watch out: Kalista's basic attacks reach 400 units farther than Zed's (525 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 2 | Vladimir | +0.87 | 1.07 | 0.20 |  |
| 3 | Xayah | +0.77 | 1.02 | 0.25 |  |
| 4 | Rek'Sai | +0.64 | 1.09 | 0.45 |  |
| 5 | Aurora | +0.54 | 0.70 | 0.16 |  |
| 6 | Nocturne | +0.49 | 1.14 | 0.65 |  |
| 7 | Bard | +0.42 | 1.02 | 0.60 |  |
| 8 | Lissandra | +0.40 | 1.05 | 0.65 |  |
| 9 | Master Yi | +0.37 | 0.75 | 0.38 |  |
| 10 | Zed | +0.37 | 0.64 | 0.27 |  |
| 11 | Morgana | +0.34 | 0.99 | 0.65 |  |
| 12 | Fiora | +0.32 | 0.81 | 0.49 |  |
| 13 | Samira | +0.32 | 0.48 | 0.16 |  |
| 14 | Udyr | +0.31 | 1.00 | 0.69 |  |
| 15 | Teemo | +0.31 | 0.43 | 0.12 | blind (Blinding Dart) |
| 16 | Olaf | +0.29 | 0.98 | 0.69 |  |
| 17 | Gwen | +0.29 | 0.68 | 0.39 |  |
| 18 | Yuumi | +0.28 | 0.72 | 0.44 |  |
| 19 | Mel | +0.20 | 0.45 | 0.25 |  |
| 20 | Evelynn | +0.17 | 0.64 | 0.47 |  |
| 21 | Kayle | +0.16 | 0.20 | 0.04 |  |
| 22 | Shaco | +0.13 | 0.64 | 0.51 |  |
| 23 | Vex | +0.13 | 0.36 | 0.23 |  |
| 24 | Fizz | +0.03 | 0.72 | 0.69 |  |
| 25 | Zaahen | +0.03 | 0.60 | 0.57 |  |
| 26 | Gangplank | +0.02 | 0.80 | 0.78 |  |
| 27 | Corki | 0.00 | 0.00 | 0.00 |  |
| 28 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 29 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 30 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 31 | Alistar | -0.02 | 0.78 | 0.80 |  |
| 32 | Kayn | -0.04 | 0.64 | 0.68 |  |
| 33 | Kindred | -0.04 | 0.00 | 0.04 |  |
| 34 | Kog'Maw | -0.04 | 0.00 | 0.04 |  |
| 35 | Twitch | -0.04 | 0.00 | 0.04 |  |
| 36 | Zeri | -0.04 | 0.00 | 0.04 |  |
| 37 | Jinx | -0.06 | 0.22 | 0.28 |  |
| 38 | Ahri | -0.06 | 0.20 | 0.26 |  |
| 39 | Yunara | -0.06 | 0.00 | 0.06 |  |
| 40 | Malzahar | -0.07 | 0.62 | 0.69 |  |
| 41 | Veigar | -0.07 | 0.19 | 0.26 |  |
| 42 | Viktor | -0.07 | 0.19 | 0.26 |  |
| 43 | Graves | -0.09 | 0.00 | 0.09 |  |
| 44 | Rengar | -0.10 | 0.80 | 0.90 |  |
| 45 | Jax | -0.12 | 0.45 | 0.57 |  |
| 46 | Smolder | -0.12 | 0.00 | 0.12 |  |
| 47 | Annie | -0.16 | 0.04 | 0.20 |  |
| 48 | LeBlanc | -0.16 | 0.00 | 0.16 |  |
| 49 | Illaoi | -0.17 | 0.19 | 0.36 |  |
| 50 | Sion | -0.19 | 0.98 | 1.17 |  |
| 51 | Yasuo | -0.19 | 0.57 | 0.76 |  |
| 52 | Milio | -0.19 | 0.06 | 0.25 |  |
| 53 | Kennen | -0.20 | 0.00 | 0.20 |  |
| 54 | Hwei | -0.21 | 0.22 | 0.43 |  |
| 55 | Akshan | -0.21 | 0.00 | 0.21 |  |
| 56 | Senna | -0.23 | 0.04 | 0.27 |  |
| 57 | Lucian | -0.23 | 0.00 | 0.23 |  |
| 58 | Elise | -0.25 | 0.00 | 0.25 |  |
| 59 | Warwick | -0.26 | 0.83 | 1.09 |  |
| 60 | Braum | -0.26 | 0.75 | 1.01 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 61 | Akali | -0.26 | 0.00 | 0.26 |  |
| 62 | Draven | -0.26 | 0.00 | 0.26 |  |
| 63 | Talon | -0.26 | 0.00 | 0.26 |  |
| 64 | Vayne | -0.26 | 0.00 | 0.26 |  |
| 65 | Zoe | -0.26 | 0.00 | 0.26 |  |
| 66 | Lux | -0.27 | 0.00 | 0.27 |  |
| 67 | Miss Fortune | -0.27 | 0.00 | 0.27 |  |
| 68 | Zilean | -0.27 | 0.00 | 0.27 |  |
| 69 | Lulu | -0.28 | 0.30 | 0.58 |  |
| 70 | Brand | -0.28 | 0.00 | 0.28 |  |
| 71 | Jayce | -0.28 | 0.00 | 0.28 |  |
| 72 | Swain | -0.29 | 0.00 | 0.29 |  |
| 73 | Syndra | -0.29 | 0.00 | 0.29 |  |
| 74 | Cassiopeia | -0.30 | 0.21 | 0.51 |  |
| 75 | Soraka | -0.30 | 0.00 | 0.30 |  |
| 76 | Caitlyn | -0.31 | 0.07 | 0.38 |  |
| 77 | Tryndamere | -0.32 | 0.00 | 0.32 |  |
| 78 | Camille | -0.33 | 0.70 | 1.03 |  |
| 79 | Heimerdinger | -0.33 | 0.05 | 0.38 |  |
| 80 | Ziggs | -0.33 | 0.00 | 0.33 |  |
| 81 | Kassadin | -0.34 | 0.00 | 0.34 |  |
| 82 | Karma | -0.35 | 0.00 | 0.35 |  |
| 83 | Nasus | -0.36 | 0.33 | 0.69 |  |
| 84 | Ivern | -0.36 | 0.00 | 0.36 |  |
| 85 | Anivia | -0.37 | 0.03 | 0.40 |  |
| 86 | Nilah | -0.38 | 0.37 | 0.75 |  |
| 87 | Kha'Zix | -0.38 | 0.00 | 0.38 |  |
| 88 | Quinn | -0.38 | 0.00 | 0.38 |  |
| 89 | Maokai | -0.39 | 0.72 | 1.11 |  |
| 90 | Kled | -0.39 | 0.60 | 0.99 |  |
| 91 | Vel'Koz | -0.39 | 0.00 | 0.39 |  |
| 92 | Xerath | -0.39 | 0.00 | 0.39 |  |
| 93 | Jhin | -0.40 | 0.00 | 0.40 |  |
| 94 | Ekko | -0.41 | 0.00 | 0.41 |  |
| 95 | Ashe | -0.42 | 0.05 | 0.47 |  |
| 96 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 97 | Shen | -0.43 | 0.43 | 0.86 |  |
| 98 | Locke | -0.43 | 0.00 | 0.43 |  |
| 99 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 100 | Twisted Fate | -0.45 | 0.00 | 0.45 |  |
| 101 | Volibear | -0.47 | 0.19 | 0.66 |  |
| 102 | Ryze | -0.48 | 0.00 | 0.48 |  |
| 103 | Shyvana | -0.49 | 0.19 | 0.68 |  |
| 104 | Bel'Veth | -0.49 | 0.00 | 0.49 |  |
| 105 | Katarina | -0.49 | 0.00 | 0.49 |  |
| 106 | Thresh | -0.49 | 0.00 | 0.49 |  |
| 107 | Varus | -0.49 | 0.00 | 0.49 |  |
| 108 | Tristana | -0.50 | 0.11 | 0.61 |  |
| 109 | Gnar | -0.50 | 0.00 | 0.50 |  |
| 110 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 111 | Orianna | -0.53 | 0.00 | 0.53 |  |
| 112 | Garen | -0.55 | 0.12 | 0.67 |  |
| 113 | Azir | -0.56 | 0.00 | 0.56 |  |
| 114 | Irelia | -0.56 | 0.00 | 0.56 |  |
| 115 | Renekton | -0.57 | 0.00 | 0.57 |  |
| 116 | Sona | -0.58 | 0.00 | 0.58 |  |
| 117 | Naafiri | -0.59 | 0.00 | 0.59 |  |
| 118 | Pantheon | -0.61 | 0.22 | 0.83 |  |
| 119 | Aatrox | -0.61 | 0.00 | 0.61 |  |
| 120 | Yone | -0.65 | 0.30 | 0.95 |  |
| 121 | K'Sante | -0.66 | 0.38 | 1.04 |  |
| 122 | Aphelios | -0.66 | 0.05 | 0.71 |  |
| 123 | Malphite | -0.67 | 0.40 | 1.07 |  |
| 124 | Neeko | -0.67 | 0.00 | 0.67 |  |
| 125 | Zyra | -0.67 | 0.00 | 0.67 |  |
| 126 | Singed | -0.68 | 0.22 | 0.90 |  |
| 127 | Lee Sin | -0.69 | 0.00 | 0.69 |  |
| 128 | Dr. Mundo | -0.70 | 0.00 | 0.70 |  |
| 129 | Nami | -0.71 | 0.00 | 0.71 |  |
| 130 | Pyke | -0.71 | 0.00 | 0.71 |  |
| 131 | Riven | -0.71 | 0.00 | 0.71 |  |
| 132 | Wukong | -0.73 | 0.00 | 0.73 |  |
| 133 | Aurelion Sol | -0.74 | 0.00 | 0.74 |  |
| 134 | Renata Glasc | -0.76 | 0.00 | 0.76 |  |
| 135 | Rumble | -0.76 | 0.00 | 0.76 |  |
| 136 | Seraphine | -0.77 | 0.00 | 0.77 |  |
| 137 | Jarvan IV | -0.78 | 0.19 | 0.97 |  |
| 138 | Viego | -0.78 | 0.19 | 0.97 |  |
| 139 | Mordekaiser | -0.79 | 0.08 | 0.87 |  |
| 140 | Lillia | -0.79 | 0.00 | 0.79 |  |
| 141 | Urgot | -0.79 | 0.00 | 0.79 |  |
| 142 | Diana | -0.81 | 0.00 | 0.81 |  |
| 143 | Rammus | -0.82 | 0.32 | 1.14 |  |
| 144 | Poppy | -0.82 | 0.28 | 1.10 |  |
| 145 | Janna | -0.83 | 0.00 | 0.83 |  |
| 146 | Rakan | -0.84 | 0.00 | 0.84 |  |
| 147 | Yorick | -0.85 | 0.00 | 0.85 |  |
| 148 | Xin Zhao | -0.86 | 0.14 | 1.00 |  |
| 149 | Darius | -0.86 | 0.00 | 0.86 |  |
| 150 | Zac | -0.87 | 0.22 | 1.09 |  |
| 151 | Hecarim | -0.87 | 0.20 | 1.07 |  |
| 152 | Taric | -0.87 | 0.00 | 0.87 |  |
| 153 | Trundle | -0.87 | 0.00 | 0.87 |  |
| 154 | Sett | -0.90 | 0.19 | 1.09 |  |
| 155 | Ornn | -0.93 | 0.19 | 1.12 |  |
| 156 | Vi | -0.94 | 0.19 | 1.13 |  |
| 157 | Cho'Gath | -0.95 | 0.00 | 0.95 |  |
| 158 | Ambessa | -0.96 | 0.00 | 0.96 |  |
| 159 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 160 | Briar | -0.98 | 0.00 | 0.98 |  |
| 161 | Nunu & Willump | -0.99 | 0.13 | 1.12 |  |
| 162 | Amumu | -0.99 | 0.10 | 1.09 |  |
| 163 | Nautilus | -0.99 | 0.00 | 0.99 |  |
| 164 | Leona | -1.00 | 0.00 | 1.00 |  |
| 165 | Gragas | -1.02 | 0.00 | 1.02 |  |
| 166 | Rell | -1.02 | 0.00 | 1.02 |  |
| 167 | Tahm Kench | -1.03 | 0.00 | 1.03 |  |
| 168 | Blitzcrank | -1.07 | 0.00 | 1.07 |  |
| 169 | Sejuani | -1.10 | 0.00 | 1.10 |  |
| 170 | Taliyah | -1.10 | 0.00 | 1.10 |  |
| 171 | Skarner | -1.20 | 0.06 | 1.26 |  |
| 172 | Galio | -1.37 | 0.00 | 1.37 |  |
