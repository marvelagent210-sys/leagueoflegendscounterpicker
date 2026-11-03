# Counters to Quinn (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Quinn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Quinn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Quinn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.87 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +1.00 |
| 2 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +1.00 |
| 3 | Zeri | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +1.00 |
| 4 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 5 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 6 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 7 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.56 |
| 8 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 9 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.13 |
| 10 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 11 | Jhin | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 12 | Vel'Koz | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 13 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.22 |
| 14 | Miss Fortune | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 15 | Tristana | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 16 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 17 | Kai'Sa | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 18 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 19 | Cassiopeia | +0.79 | +0.99 | +0.99 | +1.00 | +0.11 | – | +0.00 |
| 20 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 21 | Dr. Mundo | +0.78 | +0.98 | +0.98 | +1.00 | −0.04 | +1.00 | +0.00 |
| 22 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 23 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 24 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 25 | Twisted Fate | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 26 | Lulu | +0.72 | +0.78 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 27 | Master Yi | +0.69 | +1.00 | +1.00 | +0.14 | +0.10 | +1.00 | +1.00 |
| 28 | Akshan | +0.68 | +1.00 | +1.00 | +0.51 | +0.09 | – | +0.00 |
| 29 | Kennen | +0.55 | +0.61 | +0.61 | +1.00 | −0.04 | – | +0.00 |
| 30 | Jayce | +0.50 | +1.00 | +1.00 | +0.53 | −0.02 | −1.00 | +0.00 |
| 31 | Camille | +0.47 | +0.27 | +0.27 | +1.00 | −0.11 | +1.00 | +1.00 |
| 32 | Ziggs | +0.46 | +1.00 | −0.29 | +1.00 | +0.23 | – | +0.00 |
| 33 | Fiora | +0.44 | +1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +1.00 |
| 34 | Trundle | +0.43 | +1.00 | +1.00 | −1.00 | −0.12 | +1.00 | +1.00 |
| 35 | Samira | +0.40 | +0.31 | +0.29 | +1.00 | +0.09 | – | +0.00 |
| 36 | Orianna | +0.40 | +1.00 | +1.00 | −0.77 | +0.08 | – | +0.00 |
| 37 | Poppy | +0.39 | +0.00 | +1.00 | +0.07 | +0.20 | +1.00 | +0.00 |
| 38 | Aphelios | +0.35 | +1.00 | +1.00 | −1.00 | +0.10 | – | +0.00 |
| 39 | Draven | +0.34 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.00 |
| 40 | Malphite | +0.31 | −1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 41 | Kindred | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 42 | Neeko | +0.21 | +0.77 | +0.77 | −1.00 | +0.02 | – | +0.00 |
| 43 | Senna | +0.18 | +0.60 | −0.17 | +0.17 | +0.15 | – | +0.00 |
| 44 | Mel | +0.15 | +0.77 | +0.52 | −1.00 | +0.10 | – | +0.00 |
| 45 | Karma | +0.14 | +0.15 | +0.31 | +0.05 | +0.01 | – | +0.00 |
| 46 | Volibear | +0.11 | +0.78 | +0.78 | −0.79 | −0.13 | −1.00 | +0.00 |
| 47 | Milio | +0.09 | +0.36 | +0.36 | −0.66 | +0.22 | – | +0.00 |
| 48 | Yunara | +0.08 | −0.28 | −0.25 | +1.00 | +0.05 | – | +0.00 |
| 49 | Lux | +0.05 | −0.80 | +0.57 | +0.45 | +0.08 | – | +0.00 |
| 50 | Anivia | +0.02 | −0.01 | +0.07 | +0.05 | −0.04 | – | +0.00 |
| 51 | Smolder | −0.00 | +0.34 | +0.33 | −0.88 | +0.04 | – | +0.00 |
| 52 | Bel'Veth | −0.07 | −1.00 | +0.74 | −0.90 | +0.19 | +1.00 | +1.00 |
| 53 | Graves | −0.07 | −1.00 | +1.00 | −1.00 | +0.18 | +1.00 | +0.00 |
| 54 | Gangplank | −0.11 | +1.00 | −1.00 | −1.00 | −0.04 | +0.43 | +1.00 |
| 55 | Tahm Kench | −0.12 | −0.18 | −0.19 | +0.05 | −0.06 | −0.32 | +0.00 |
| 56 | Jinx | −0.14 | −0.77 | +1.00 | −1.00 | +0.10 | – | +0.00 |
| 57 | Taric | −0.15 | −0.17 | −0.14 | −0.21 | +0.06 | −0.34 | +0.00 |
| 58 | Sylas | −0.15 | −0.78 | −0.78 | +0.99 | +0.26 | +0.04 | +0.00 |
| 59 | Varus | −0.16 | −0.99 | +1.00 | −0.74 | +0.01 | – | +0.00 |
| 60 | Maokai | −0.20 | −1.00 | +0.50 | −1.00 | +0.17 | +1.00 | +0.00 |
| 61 | Azir | −0.22 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 62 | Tryndamere | −0.23 | −1.00 | −1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 63 | Twitch | −0.23 | +0.00 | −0.23 | −0.76 | +0.00 | – | +0.00 |
| 64 | Swain | −0.25 | −0.49 | −0.15 | −0.39 | +0.06 | – | +0.00 |
| 65 | Sion | −0.26 | −1.00 | −1.00 | +1.00 | −0.09 | +0.59 | +0.00 |
| 66 | Jarvan IV | −0.27 | −1.00 | −1.00 | +1.00 | +0.11 | +0.15 | +0.00 |
| 67 | Fizz | −0.30 | +1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 68 | Sejuani | −0.31 | +0.00 | −0.07 | −0.98 | +0.02 | −1.00 | +0.00 |
| 69 | Lucian | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 70 | Shyvana | −0.35 | −0.92 | −1.00 | +1.00 | −0.10 | −1.00 | +1.00 |
| 71 | Yone | −0.41 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | +0.00 |
| 72 | Kassadin | −0.41 | −1.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 73 | Mordekaiser | −0.43 | −0.80 | −0.80 | +0.35 | −0.02 | −1.00 | +0.00 |
| 74 | Lillia | −0.44 | −0.28 | −0.34 | −1.00 | +0.08 | −1.00 | +0.00 |
| 75 | Lee Sin | −0.44 | −1.00 | −1.00 | +0.00 | −0.06 | +0.64 | +0.00 |
| 76 | Riven | −0.48 | +0.00 | −1.00 | −1.00 | +0.13 | −1.00 | +1.00 |
| 77 | Renekton | −0.48 | −0.55 | −0.96 | −0.98 | −0.09 | +1.00 | +0.00 |
| 78 | Nautilus | −0.50 | +0.23 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 79 | Gwen | −0.51 | −1.00 | −1.00 | +0.63 | −0.24 | −1.00 | +0.00 |
| 80 | Gragas | −0.55 | +0.00 | −1.00 | −0.95 | −0.06 | −1.00 | +0.00 |
| 81 | Yasuo | −0.56 | −1.00 | −1.00 | +0.01 | −0.08 | −0.46 | +0.00 |
| 82 | Ryze | −0.58 | −0.66 | −0.67 | −1.00 | +0.09 | – | +0.00 |
| 83 | Rammus | −0.61 | −1.00 | −1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 84 | Jax | −0.61 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 85 | Nocturne | −0.61 | −1.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 86 | Xin Zhao | −0.62 | −0.71 | −1.00 | −0.85 | −0.01 | −0.22 | +0.00 |
| 87 | Brand | −0.63 | −0.61 | −0.86 | −1.00 | −0.01 | – | +0.00 |
| 88 | Rumble | −0.66 | −1.00 | −0.62 | −1.00 | −0.00 | −0.59 | +0.00 |
| 89 | Kled | −0.67 | −0.41 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 90 | Aurelion Sol | −0.70 | −1.00 | −1.00 | −1.00 | +0.50 | – | +0.00 |
| 91 | Sett | −0.70 | −0.91 | −1.00 | −1.00 | −0.15 | +0.03 | +0.00 |
| 92 | Bard | −0.70 | −1.00 | −1.00 | −0.65 | −0.02 | – | +0.00 |
| 93 | Pantheon | −0.71 | −1.00 | −1.00 | −1.00 | −0.07 | +0.00 | +0.00 |
| 94 | Illaoi | −0.73 | −1.00 | −1.00 | −1.00 | +0.06 | −0.35 | +0.00 |
| 95 | Zyra | −0.73 | −0.92 | −0.96 | −1.00 | +0.09 | – | +0.00 |
| 96 | Zed | −0.73 | −1.00 | −1.00 | −0.50 | −0.19 | −1.00 | +0.00 |
| 97 | Caitlyn | −0.74 | −1.00 | −0.82 | −1.00 | +0.07 | −1.00 | +0.00 |
| 98 | Zoe | −0.75 | −1.00 | −0.96 | −1.00 | +0.08 | – | +0.00 |
| 99 | Nunu & Willump | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 100 | Taliyah | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 101 | Hwei | −0.75 | −0.94 | −1.00 | −0.98 | +0.02 | – | +0.00 |
| 102 | Janna | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 103 | Viktor | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 104 | Urgot | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.00 |
| 105 | Morgana | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 106 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 107 | Ahri | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 108 | Karthus | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 109 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 110 | Aurora | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 111 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 112 | Seraphine | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 113 | Fiddlesticks | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 114 | Veigar | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 115 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 116 | Warwick | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 117 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 118 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 119 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 120 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 121 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 122 | Nilah | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | −0.87 | +0.00 |
| 123 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 124 | Thresh | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 125 | Rengar | −0.78 | −1.00 | −1.00 | −1.00 | −0.12 | −0.59 | +0.00 |
| 126 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 127 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 128 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 129 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 130 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 131 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 132 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 133 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 134 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 135 | Shen | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 136 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 137 | Ornn | −0.80 | −1.00 | −0.99 | −1.00 | +0.01 | −1.00 | +0.00 |
| 138 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 139 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 140 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 141 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 142 | Aatrox | −0.80 | −1.00 | −1.00 | −1.00 | −0.20 | −0.71 | +0.00 |
| 143 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 144 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 145 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 146 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 147 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 148 | Akali | −0.81 | −0.99 | −0.99 | −0.98 | −0.10 | −1.00 | +0.00 |
| 149 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 150 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 151 | Garen | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −0.98 | +0.00 |
| 152 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 155 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 156 | Rell | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 157 | Viego | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 158 | Ambessa | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 159 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 160 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 161 | Olaf | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 162 | Kayn | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 163 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 164 | Zaahen | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 165 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 166 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 167 | Zac | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 168 | Rek'Sai | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 169 | Wukong | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 170 | Singed | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 171 | Vi | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 172 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Quinn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Quinn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Quinn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +0.82)

- **0.68** spell shield: Shroud of Darkness's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn E Vault)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn R Skystrike)
- **0.18** interrupt: Unspeakable Horror's fear interrupts Quinn's Behind Enemy Lines (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 2. Yasuo (net +0.78)

- **0.41** projectile block: Wind Wall blocks Quinn's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Quinn basic attacks)
- **0.32** projectile block: Wind Wall blocks Quinn's Blinding Assault, a projectile. Wind Wall for 4 s, long enough to use ahead of Blinding Assault. (Yasuo W Wind Wall → Quinn Q Blinding Assault)
- **0.28** interrupt: Steel Tempest's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 3. Sivir (net +0.77)

- **0.57** spell shield: Spell Shield's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn E Vault)
- **0.40** spell shield: Spell Shield's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn R Skystrike)

#### 4. Braum (net +0.72)

- **0.54** projectile block: Unbreakable blocks Quinn's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Quinn basic attacks)
- **0.45** projectile block: Unbreakable blocks Quinn's Blinding Assault, a projectile. Unbreakable for 4 s, long enough to use ahead of Blinding Assault. (Braum E Unbreakable → Quinn Q Blinding Assault)
- **0.19** interrupt: Concussive Blows's stun interrupts Quinn's Behind Enemy Lines (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 5. Rell (net +0.69)

- **0.20** interrupt: Shattering Strike's stun interrupts Quinn's Behind Enemy Lines (normal channel). Shattering Strike must land during the channel. (Rell Q Shattering Strike → Quinn R Behind Enemy Lines)
- **0.19** interrupt: Ferromancy: Crash Down's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Quinn R Behind Enemy Lines)
- **0.19** interrupt: Ferromancy: Mount Up's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 6. Rek'Sai (net +0.65)

- **0.39** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Vault. Untargetable for 1.5 s, long enough to use ahead of Vault. (Rek'Sai R Void Rush → Quinn E Vault)
- **0.33** interrupt: Unburrow's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Quinn R Behind Enemy Lines)
- **0.26** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Skystrike. Untargetable for 1.5 s, long enough to use ahead of Skystrike. (Rek'Sai R Void Rush → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

#### 7. Fizz (net +0.65)

- **0.51** untargetable: Playful makes Fizz untargetable, dodging Quinn's Vault. Untargetable for 0.75 s; Vault lands within 0.24 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Quinn E Vault)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Quinn's Skystrike. Untargetable for 0.75 s; Skystrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Quinn R Skystrike)
- **0.14** interrupt: Chum the Waters's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 8. Udyr (net +0.61)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Vault (airborne, slow). Immune for 1.5 s, long enough to use ahead of Vault. (Udyr E Blazing Stampede → Quinn E Vault)
- **0.23** interrupt: Blazing Stampede's stun interrupts Quinn's Behind Enemy Lines (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Quinn R Behind Enemy Lines)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Blinding Assault (nearsight). Immune for 1.5 s, long enough to use ahead of Blinding Assault. (Udyr E Blazing Stampede → Quinn Q Blinding Assault)
- Watch out: Quinn's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

#### 9. Vladimir (net +0.59)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Vault. Untargetable for 2 s, long enough to use ahead of Vault. (Vladimir W Sanguine Pool → Quinn E Vault)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Skystrike. Untargetable for 2 s, long enough to use ahead of Skystrike. (Vladimir W Sanguine Pool → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 10. Lissandra (net +0.59)

- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Vault. Untargetable for 2.5 s, long enough to use ahead of Vault. (Lissandra R Frozen Tomb → Quinn E Vault)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Skystrike. Untargetable for 2.5 s, long enough to use ahead of Skystrike. (Lissandra R Frozen Tomb → Quinn R Skystrike)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Quinn's Vault mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Quinn E Vault)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +0.82 | 1.20 | 0.38 |  |
| 2 | Yasuo | +0.78 | 1.00 | 0.22 | projectile block (Wind Wall) |
| 3 | Sivir | +0.77 | 0.77 | 0.00 |  |
| 4 | Braum | +0.72 | 1.10 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Rell | +0.69 | 0.91 | 0.22 |  |
| 6 | Rek'Sai | +0.65 | 0.87 | 0.22 |  |
| 7 | Fizz | +0.65 | 0.82 | 0.17 |  |
| 8 | Udyr | +0.61 | 0.99 | 0.38 |  |
| 9 | Vladimir | +0.59 | 0.82 | 0.23 |  |
| 10 | Lissandra | +0.59 | 0.59 | 0.00 |  |
| 11 | Lulu | +0.58 | 0.58 | 0.00 |  |
| 12 | Malzahar | +0.56 | 0.96 | 0.40 |  |
| 13 | Bard | +0.56 | 0.56 | 0.00 |  |
| 14 | Viktor | +0.56 | 0.56 | 0.00 |  |
| 15 | K'Sante | +0.54 | 0.72 | 0.18 |  |
| 16 | Cassiopeia | +0.54 | 0.54 | 0.00 | grounding (Miasma) |
| 17 | Xayah | +0.51 | 0.51 | 0.00 |  |
| 18 | Morgana | +0.50 | 0.64 | 0.14 |  |
| 19 | Teemo | +0.50 | 0.50 | 0.00 | blind (Blinding Dart) |
| 20 | Maokai | +0.49 | 0.87 | 0.38 |  |
| 21 | Vex | +0.48 | 0.48 | 0.00 |  |
| 22 | Yone | +0.47 | 0.64 | 0.17 |  |
| 23 | Hwei | +0.47 | 0.47 | 0.00 |  |
| 24 | Samira | +0.47 | 0.47 | 0.00 |  |
| 25 | Mel | +0.46 | 0.46 | 0.00 |  |
| 26 | Zaahen | +0.45 | 0.67 | 0.22 |  |
| 27 | Heimerdinger | +0.45 | 0.45 | 0.00 |  |
| 28 | Kayle | +0.45 | 0.45 | 0.00 |  |
| 29 | Ahri | +0.43 | 0.43 | 0.00 |  |
| 30 | Anivia | +0.41 | 0.41 | 0.00 |  |
| 31 | Veigar | +0.41 | 0.41 | 0.00 |  |
| 32 | Kled | +0.39 | 0.52 | 0.13 |  |
| 33 | Kalista | +0.38 | 0.38 | 0.00 |  |
| 34 | Jinx | +0.37 | 0.37 | 0.00 |  |
| 35 | Gnar | +0.36 | 0.36 | 0.00 |  |
| 36 | Camille | +0.35 | 0.54 | 0.19 |  |
| 37 | Thresh | +0.34 | 0.39 | 0.05 |  |
| 38 | Nami | +0.34 | 0.34 | 0.00 |  |
| 39 | Alistar | +0.33 | 0.71 | 0.38 |  |
| 40 | Aurora | +0.33 | 0.33 | 0.00 |  |
| 41 | Renata Glasc | +0.31 | 0.31 | 0.00 |  |
| 42 | Seraphine | +0.31 | 0.31 | 0.00 |  |
| 43 | Milio | +0.30 | 0.30 | 0.00 |  |
| 44 | Tristana | +0.30 | 0.30 | 0.00 |  |
| 45 | Sejuani | +0.29 | 0.65 | 0.36 |  |
| 46 | Xin Zhao | +0.29 | 0.63 | 0.34 |  |
| 47 | Fiora | +0.25 | 0.61 | 0.36 |  |
| 48 | Aurelion Sol | +0.24 | 0.33 | 0.09 |  |
| 49 | Annie | +0.24 | 0.24 | 0.00 |  |
| 50 | Evelynn | +0.23 | 0.49 | 0.26 |  |
| 51 | Brand | +0.23 | 0.23 | 0.00 |  |
| 52 | Shaco | +0.22 | 0.48 | 0.26 |  |
| 53 | Ornn | +0.22 | 0.44 | 0.22 |  |
| 54 | Ashe | +0.21 | 0.21 | 0.00 |  |
| 55 | Nilah | +0.20 | 0.49 | 0.29 |  |
| 56 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 57 | Rakan | +0.19 | 0.33 | 0.14 |  |
| 58 | Elise | +0.19 | 0.19 | 0.00 |  |
| 59 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 60 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 61 | Swain | +0.19 | 0.19 | 0.00 |  |
| 62 | Draven | +0.18 | 0.18 | 0.00 |  |
| 63 | Vayne | +0.18 | 0.18 | 0.00 |  |
| 64 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 65 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 66 | Syndra | +0.17 | 0.17 | 0.00 |  |
| 67 | Zoe | +0.17 | 0.17 | 0.00 |  |
| 68 | Yuumi | +0.16 | 0.68 | 0.52 |  |
| 69 | Urgot | +0.14 | 0.31 | 0.17 |  |
| 70 | Azir | +0.14 | 0.14 | 0.00 |  |
| 71 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 72 | Orianna | +0.14 | 0.14 | 0.00 |  |
| 73 | Sona | +0.14 | 0.14 | 0.00 |  |
| 74 | Zyra | +0.14 | 0.14 | 0.00 |  |
| 75 | Jax | +0.13 | 0.51 | 0.38 | attack dodge (Counter Strike) |
| 76 | Riven | +0.13 | 0.39 | 0.26 |  |
| 77 | Rammus | +0.11 | 0.79 | 0.68 |  |
| 78 | Poppy | +0.10 | 0.68 | 0.58 | dash stop (Steadfast Presence) |
| 79 | Gwen | +0.10 | 0.46 | 0.36 |  |
| 80 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 81 | Amumu | +0.06 | 0.44 | 0.38 |  |
| 82 | Malphite | +0.06 | 0.44 | 0.38 |  |
| 83 | Senna | +0.06 | 0.06 | 0.00 |  |
| 84 | Zed | +0.05 | 0.31 | 0.26 |  |
| 85 | Volibear | +0.04 | 0.28 | 0.24 |  |
| 86 | Zac | +0.03 | 0.87 | 0.84 | dash stop (Stretching Strikes) |
| 87 | Master Yi | +0.03 | 0.60 | 0.57 |  |
| 88 | Taliyah | +0.02 | 0.50 | 0.48 |  |
| 89 | Jarvan IV | +0.02 | 0.19 | 0.17 |  |
| 90 | Sylas | +0.02 | 0.19 | 0.17 |  |
| 91 | Leona | +0.01 | 0.39 | 0.38 |  |
| 92 | Sett | 0.00 | 0.38 | 0.38 |  |
| 93 | Corki | 0.00 | 0.00 | 0.00 |  |
| 94 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 95 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 96 | Karma | 0.00 | 0.00 | 0.00 |  |
| 97 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 98 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 99 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 100 | Lux | 0.00 | 0.00 | 0.00 |  |
| 101 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 102 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 103 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 104 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 105 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 106 | Viego | -0.02 | 0.39 | 0.41 |  |
| 107 | Hecarim | -0.03 | 0.19 | 0.22 |  |
| 108 | Pyke | -0.04 | 0.38 | 0.42 |  |
| 109 | Bel'Veth | -0.04 | 0.20 | 0.24 |  |
| 110 | Briar | -0.05 | 0.14 | 0.19 |  |
| 111 | Lillia | -0.05 | 0.14 | 0.19 |  |
| 112 | Fiddlesticks | -0.06 | 0.41 | 0.47 |  |
| 113 | Graves | -0.06 | 0.00 | 0.06 |  |
| 114 | Wukong | -0.08 | 0.14 | 0.22 |  |
| 115 | Sion | -0.09 | 0.73 | 0.82 |  |
| 116 | Janna | -0.09 | 0.31 | 0.40 |  |
| 117 | Vel'Koz | -0.09 | 0.19 | 0.28 |  |
| 118 | Aatrox | -0.11 | 0.23 | 0.34 |  |
| 119 | Qiyana | -0.11 | 0.13 | 0.24 |  |
| 120 | Varus | -0.11 | 0.00 | 0.11 |  |
| 121 | Shyvana | -0.12 | 0.24 | 0.36 |  |
| 122 | Twisted Fate | -0.12 | 0.23 | 0.35 |  |
| 123 | Irelia | -0.12 | 0.19 | 0.31 |  |
| 124 | Ambessa | -0.12 | 0.14 | 0.26 |  |
| 125 | Lee Sin | -0.12 | 0.14 | 0.26 |  |
| 126 | Rengar | -0.13 | 0.64 | 0.77 |  |
| 127 | Shen | -0.13 | 0.58 | 0.71 |  |
| 128 | Singed | -0.15 | 0.62 | 0.77 | grounding (Mega Adhesive) |
| 129 | Kassadin | -0.15 | 0.21 | 0.36 |  |
| 130 | Xerath | -0.15 | 0.18 | 0.33 |  |
| 131 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 132 | Kayn | -0.16 | 0.51 | 0.67 |  |
| 133 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 134 | Renekton | -0.18 | 0.20 | 0.38 |  |
| 135 | Blitzcrank | -0.19 | 0.58 | 0.77 |  |
| 136 | Pantheon | -0.19 | 0.54 | 0.73 |  |
| 137 | Nautilus | -0.20 | 0.14 | 0.34 |  |
| 138 | Gangplank | -0.22 | 0.55 | 0.77 |  |
| 139 | Diana | -0.22 | 0.14 | 0.36 |  |
| 140 | Gragas | -0.23 | 0.32 | 0.55 |  |
| 141 | Tahm Kench | -0.26 | 0.58 | 0.84 |  |
| 142 | Akali | -0.26 | 0.00 | 0.26 |  |
| 143 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 144 | Talon | -0.26 | 0.00 | 0.26 |  |
| 145 | Vi | -0.27 | 0.42 | 0.69 |  |
| 146 | Warwick | -0.28 | 0.65 | 0.93 |  |
| 147 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 148 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 149 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 150 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 151 | Illaoi | -0.29 | 0.09 | 0.38 |  |
| 152 | Galio | -0.32 | 0.51 | 0.83 |  |
| 153 | Garen | -0.32 | 0.35 | 0.67 |  |
| 154 | Cho'Gath | -0.34 | 0.43 | 0.77 |  |
| 155 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 156 | Olaf | -0.35 | 0.42 | 0.77 |  |
| 157 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 158 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 159 | Mordekaiser | -0.38 | 0.29 | 0.67 |  |
| 160 | Kha'Zix | -0.38 | 0.00 | 0.38 |  |
| 161 | Locke | -0.38 | 0.00 | 0.38 |  |
| 162 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 163 | Skarner | -0.48 | 0.24 | 0.72 |  |
| 164 | Yorick | -0.49 | 0.18 | 0.67 |  |
| 165 | Darius | -0.50 | 0.17 | 0.67 |  |
| 166 | Trundle | -0.50 | 0.17 | 0.67 |  |
| 167 | Taric | -0.54 | 0.18 | 0.72 |  |
| 168 | Naafiri | -0.64 | 0.00 | 0.64 |  |
| 169 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 170 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 171 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 172 | Nunu & Willump | -0.96 | 0.30 | 1.26 |  |
