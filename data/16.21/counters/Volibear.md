# Counters to Volibear (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Volibear: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Volibear wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Volibear --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.17 | – | +1.00 |
| 2 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | +0.00 |
| 3 | Trundle | +0.85 | +1.00 | +1.00 | +1.00 | +0.10 | – | +1.00 |
| 4 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 5 | Teemo | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 6 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 7 | Morgana | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 8 | Ivern | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 9 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 10 | Neeko | +0.82 | +1.00 | +0.96 | +0.96 | +0.26 | +1.00 | +0.00 |
| 11 | Ashe | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Sivir | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Karma | +0.80 | +1.00 | +0.99 | +1.00 | +0.06 | +0.96 | +0.00 |
| 14 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 15 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 16 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | −0.86 |
| 17 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.03 |
| 18 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 19 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 20 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 21 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 22 | Annie | +0.77 | +1.00 | +1.00 | +0.74 | +0.18 | +1.00 | +0.00 |
| 23 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 24 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 25 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.70 |
| 26 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 27 | Nocturne | +0.65 | +0.86 | +0.86 | +0.86 | −0.07 | – | +0.00 |
| 28 | Udyr | +0.64 | +0.76 | +0.79 | +0.79 | −0.11 | – | +1.00 |
| 29 | Lulu | +0.62 | +1.00 | +1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 30 | Jax | +0.61 | +0.30 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 31 | Zeri | +0.60 | +0.64 | +0.82 | +0.82 | +0.04 | +0.64 | +0.00 |
| 32 | Yone | +0.56 | +0.56 | +0.80 | +0.80 | +0.04 | – | +0.00 |
| 33 | Zilean | +0.53 | +0.19 | +1.00 | +1.00 | +0.24 | +0.00 | +0.00 |
| 34 | Wukong | +0.45 | +0.49 | +0.49 | +0.79 | +0.08 | – | −0.18 |
| 35 | Nilah | +0.41 | +1.00 | +0.20 | +0.20 | +0.21 | – | +0.00 |
| 36 | Lucian | +0.36 | +1.00 | −0.52 | +0.63 | +0.08 | +1.00 | +0.00 |
| 37 | Kog'Maw | +0.35 | +1.00 | +0.07 | +0.07 | +0.36 | +0.13 | +0.00 |
| 38 | Jinx | +0.31 | −0.08 | +0.75 | +0.76 | +0.03 | −0.14 | +0.00 |
| 39 | Zac | +0.28 | +0.93 | +0.11 | +0.11 | −0.17 | – | +0.00 |
| 40 | Heimerdinger | +0.27 | −0.20 | +0.61 | +1.00 | +0.25 | −0.74 | +0.00 |
| 41 | Xin Zhao | +0.21 | +1.00 | −0.97 | +1.00 | −0.13 | – | +0.00 |
| 42 | Taric | +0.11 | +0.11 | +0.18 | +0.11 | +0.05 | – | +0.00 |
| 43 | Singed | +0.08 | +0.23 | +0.05 | +0.05 | −0.03 | – | +0.00 |
| 44 | Brand | +0.08 | −0.64 | +0.45 | +0.45 | +0.05 | +0.28 | +0.00 |
| 45 | Anivia | +0.01 | +0.13 | +0.08 | −0.04 | −0.07 | −0.22 | +0.00 |
| 46 | Sion | −0.03 | −0.08 | +0.00 | +0.00 | −0.03 | – | +0.00 |
| 47 | Lux | −0.04 | −0.79 | +0.00 | +0.50 | +0.11 | +0.36 | +0.00 |
| 48 | Corki | −0.07 | +1.00 | −1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 49 | Tahm Kench | −0.11 | −0.15 | −0.11 | −0.11 | −0.06 | – | +0.00 |
| 50 | Quinn | −0.11 | −0.78 | −0.78 | +0.79 | +0.13 | +1.00 | +0.00 |
| 51 | Twisted Fate | −0.11 | +1.00 | −0.68 | −0.68 | +0.00 | −0.60 | +0.00 |
| 52 | Kennen | −0.13 | −0.83 | −0.82 | +0.90 | −0.00 | +1.00 | +0.00 |
| 53 | Gangplank | −0.13 | +1.00 | −1.00 | −1.00 | +0.20 | – | +1.00 |
| 54 | Jayce | −0.19 | +0.09 | −0.14 | −1.00 | +0.27 | – | +0.00 |
| 55 | Illaoi | −0.26 | +0.70 | −0.91 | −0.98 | +0.09 | – | +0.00 |
| 56 | Jhin | −0.29 | +1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 57 | Senna | −0.33 | +0.10 | −1.00 | −0.35 | +0.10 | −0.52 | +0.00 |
| 58 | Graves | −0.34 | +0.92 | −0.99 | −1.00 | +0.18 | −1.00 | −0.99 |
| 59 | Janna | −0.36 | −0.27 | −0.87 | −0.87 | +0.17 | +0.74 | +0.00 |
| 60 | Aurora | −0.40 | −0.52 | −0.84 | −0.84 | +0.06 | +1.00 | +0.00 |
| 61 | Ezreal | −0.44 | −0.85 | −0.55 | −0.45 | −0.05 | +0.09 | +0.00 |
| 62 | Yunara | −0.47 | −0.79 | −0.79 | −0.79 | +0.17 | +1.00 | −0.89 |
| 63 | Hwei | −0.48 | −1.00 | −0.60 | −0.21 | +0.16 | −0.60 | +0.00 |
| 64 | Olaf | −0.49 | +0.04 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 65 | Mordekaiser | −0.50 | −0.86 | −1.00 | +0.06 | +0.06 | – | +0.00 |
| 66 | Vel'Koz | −0.51 | +0.01 | −1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 67 | Kindred | −0.52 | +0.00 | −1.00 | −1.00 | +0.03 | −0.74 | +0.00 |
| 68 | Milio | −0.53 | −0.86 | −0.62 | −0.62 | +0.30 | −0.86 | +0.00 |
| 69 | Syndra | −0.54 | −0.84 | −1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 70 | Varus | −0.54 | −0.70 | −0.91 | −0.92 | +0.01 | +0.42 | +0.00 |
| 71 | LeBlanc | −0.60 | −1.00 | −1.00 | −1.00 | +0.08 | +0.84 | +0.00 |
| 72 | Bard | −0.61 | −0.83 | −0.75 | −0.82 | +0.13 | −0.74 | +0.00 |
| 73 | Camille | −0.62 | −0.55 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 74 | Aurelion Sol | −0.63 | −0.31 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 75 | Xayah | −0.63 | −0.74 | −0.91 | −0.91 | +0.14 | −0.60 | +0.00 |
| 76 | Gnar | −0.63 | −1.00 | −1.00 | −1.00 | +0.26 | +0.29 | +0.00 |
| 77 | Soraka | −0.64 | −0.83 | −0.99 | −0.43 | +0.00 | −1.00 | +0.00 |
| 78 | Zyra | −0.65 | −0.76 | −0.75 | −0.93 | +0.08 | −0.97 | +0.00 |
| 79 | Rakan | −0.65 | −0.61 | −0.88 | −0.93 | +0.03 | −1.00 | +0.00 |
| 80 | Karthus | −0.66 | −1.00 | −0.87 | −0.87 | +0.06 | −0.32 | +0.00 |
| 81 | Cho'Gath | −0.67 | −0.90 | −0.90 | −0.90 | +0.14 | – | +0.00 |
| 82 | Ryze | −0.68 | −0.89 | −0.85 | −0.85 | +0.14 | −0.92 | +0.00 |
| 83 | Samira | −0.68 | −0.48 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 84 | Pantheon | −0.70 | −0.82 | −0.94 | −1.00 | +0.09 | – | +0.00 |
| 85 | Irelia | −0.71 | −1.00 | −0.88 | −0.88 | +0.05 | – | +0.00 |
| 86 | Mel | −0.71 | −0.67 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 87 | Gwen | −0.72 | −0.96 | −0.96 | −0.96 | −0.14 | – | +1.00 |
| 88 | Riven | −0.72 | −1.00 | −1.00 | −0.79 | +0.21 | – | −0.39 |
| 89 | Ambessa | −0.73 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.00 |
| 90 | Viego | −0.73 | −0.78 | −1.00 | −1.00 | +0.16 | – | −0.74 |
| 91 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.25 | – | +0.00 |
| 92 | Poppy | −0.74 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.00 |
| 93 | Master Yi | −0.74 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +1.00 |
| 94 | Garen | −0.74 | −0.96 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 95 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 96 | Renekton | −0.74 | −1.00 | −0.90 | −1.00 | +0.03 | – | +0.00 |
| 97 | Alistar | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 98 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 99 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 100 | Warwick | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | – | −0.42 |
| 101 | Smolder | −0.76 | −0.99 | −0.91 | −0.91 | +0.28 | −0.99 | −0.87 |
| 102 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 103 | Sejuani | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 104 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 105 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 106 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 107 | Fizz | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 108 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 109 | Cassiopeia | −0.77 | −0.99 | −1.00 | −1.00 | +0.13 | −0.88 | +0.00 |
| 110 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 111 | Maokai | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 112 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 113 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 114 | Lee Sin | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 115 | Vi | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 116 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 117 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 118 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 119 | Akshan | −0.77 | −0.99 | −1.00 | −1.00 | +0.12 | −0.96 | +0.00 |
| 120 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 121 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 122 | Kayn | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 123 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 124 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 125 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | −0.88 | +0.00 |
| 126 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 127 | Elise | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 128 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 129 | Malzahar | −0.78 | −0.96 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 130 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 131 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 132 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 133 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 134 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 135 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 136 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 137 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 138 | Orianna | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 139 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 140 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 141 | Braum | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 142 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 143 | Zoe | −0.79 | −0.99 | −1.00 | −1.00 | +0.06 | −0.99 | +0.00 |
| 144 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 145 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 146 | Swain | −0.79 | −0.99 | −1.00 | −1.00 | +0.06 | −0.99 | +0.00 |
| 147 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 148 | Veigar | −0.79 | −0.95 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 149 | Azir | −0.79 | −0.98 | −1.00 | −1.00 | +0.02 | −0.98 | +0.00 |
| 150 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 151 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 152 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 153 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 154 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 155 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 156 | Thresh | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 157 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 158 | Viktor | −0.80 | −1.00 | −1.00 | −0.99 | +0.01 | −1.00 | +0.00 |
| 159 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 160 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 161 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 162 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 163 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 164 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −0.67 | −0.83 |
| 165 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 166 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 167 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 168 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 169 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.50 |
| 170 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −0.99 | −0.76 |
| 171 | Briar | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |
| 172 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.80 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Volibear's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Volibear's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Volibear` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.62)

- **0.90** spell shield: Spell Shield's spell shield blocks Volibear's Stormbringer. Spell shield for 1.5 s, long enough to use ahead of Stormbringer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Volibear R Stormbringer)
- **0.73** spell shield: Spell Shield's spell shield blocks Volibear's Thundering Smash. Spell shield for 1.5 s, long enough to use ahead of Thundering Smash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Volibear Q Thundering Smash)
- **0.29** range: Sivir's basic attacks reach 350 units farther than Volibear's (500 vs 150 attack range). Volibear closes the gap with Stormbringer, Thundering Smash. (Sivir basic attacks → Volibear basic attacks)

#### 2. Nocturne (net +1.42)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Volibear's Stormbringer. Spell shield for 1.5 s, long enough to use ahead of Stormbringer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear R Stormbringer)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Volibear's Thundering Smash. Spell shield for 1.5 s, long enough to use ahead of Thundering Smash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear Q Thundering Smash)
- **0.29** spell shield: Shroud of Darkness's spell shield blocks Volibear's Frenzied Maul. Spell shield for 1.5 s, long enough to use ahead of Frenzied Maul. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Volibear W Frenzied Maul)

#### 3. Xayah (net +1.42)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Volibear's Stormbringer. Untargetable for 1.5 s, long enough to use ahead of Stormbringer. (Xayah R Featherstorm → Volibear R Stormbringer)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Volibear's Thundering Smash. Untargetable for 1.5 s, long enough to use ahead of Thundering Smash. (Xayah R Featherstorm → Volibear Q Thundering Smash)
- **0.24** range: Xayah's basic attacks reach 375 units farther than Volibear's (525 vs 150 attack range). Volibear closes the gap with Stormbringer, Thundering Smash. (Xayah basic attacks → Volibear basic attacks)

#### 4. Vladimir (net +1.39)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Stormbringer. Untargetable for 2 s, long enough to use ahead of Stormbringer. (Vladimir W Sanguine Pool → Volibear R Stormbringer)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Thundering Smash. Untargetable for 2 s, long enough to use ahead of Thundering Smash. (Vladimir W Sanguine Pool → Volibear Q Thundering Smash)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Volibear's Frenzied Maul. Untargetable for 2 s, long enough to use ahead of Frenzied Maul. (Vladimir W Sanguine Pool → Volibear W Frenzied Maul)
- Watch out: Thundering Smash's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Bard (net +1.33)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Volibear's Stormbringer. Untargetable for 2.5 s, long enough to use ahead of Stormbringer. (Bard R Tempered Fate → Volibear R Stormbringer)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Volibear's Thundering Smash. Untargetable for 2.5 s, long enough to use ahead of Thundering Smash. (Bard R Tempered Fate → Volibear Q Thundering Smash)
- **0.22** range: Bard's basic attacks reach 350 units farther than Volibear's (500 vs 150 attack range). Volibear closes the gap with Stormbringer, Thundering Smash. (Bard basic attacks → Volibear basic attacks)
- Watch out: Stormbringer is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 6. Lissandra (net +1.31)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Stormbringer. Untargetable for 2.5 s, long enough to use ahead of Stormbringer. (Lissandra R Frozen Tomb → Volibear R Stormbringer)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Thundering Smash. Untargetable for 2.5 s, long enough to use ahead of Thundering Smash. (Lissandra R Frozen Tomb → Volibear Q Thundering Smash)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Volibear's Frenzied Maul. Untargetable for 2.5 s, long enough to use ahead of Frenzied Maul. (Lissandra R Frozen Tomb → Volibear W Frenzied Maul)
- Watch out: Stormbringer is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 7. Aurora (net +1.28)

- **0.90** untargetable: Between Worlds makes Aurora untargetable, dodging Volibear's Stormbringer. Untargetable for 0.4 s; Stormbringer takes 0.93 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Volibear R Stormbringer)
- **0.28** untargetable: Between Worlds makes Aurora untargetable, dodging Volibear's Thundering Smash. Untargetable for 0.4 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Volibear Q Thundering Smash)
- **0.19** range: Aurora's basic attacks reach 400 units farther than Volibear's (550 vs 150 attack range). Volibear closes the gap with Stormbringer, Thundering Smash. (Aurora basic attacks → Volibear basic attacks)

#### 8. Fiora (net +1.26)

- **0.90** parry: Riposte parries Volibear's Stormbringer. Parry for 0.75 s; Stormbringer takes 0.93 s to land, enough to react. (Fiora W Riposte → Volibear R Stormbringer)
- **0.56** parry: Riposte parries Volibear's Thundering Smash and stuns back. Parry for 0.75 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Thundering Smash's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Volibear Q Thundering Smash)
- **0.26** parry: Riposte parries Volibear's Frenzied Maul. Parry for 0.75 s; Frenzied Maul takes 0.25 s to land, enough to react. (Fiora W Riposte → Volibear W Frenzied Maul)

#### 9. Jax (net +1.22)

- **1.00** attack dodge: Counter Strike dodges Volibear's Thundering Smash, an empowered attack. Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Volibear Q Thundering Smash)
- **0.35** attack dodge: Counter Strike dodges Volibear's basic attacks (with The Relentless Storm). Counter Strike lasts 2 s on a 9 s cooldown. (Jax E Counter Strike → Volibear basic attacks)
- **0.17** attack dodge: Counter Strike dodges Volibear's Frenzied Maul, which applies on-hit effects. Counter Strike lasts 2 s on a 9 s cooldown. Frenzied Maul's bite heals even if it is blocked by spell shield. Frenzied Maul's strike can be dodged and blocked, but it cannot miss if Volibear is blinded. The Wound mark does not apply if dodged, but will otherwise do so regardless.
  - The bite can be blocked but Volibear still heals. It does not heal nor deal damage if the bite is dodged. The bite cannot miss if Volibear is blinded. (Jax E Counter Strike → Volibear W Frenzied Maul)

#### 10. Fizz (net +1.21)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Volibear's Stormbringer. Untargetable for 0.75 s; Stormbringer takes 0.93 s to land, enough to react. (Fizz E Playful → Volibear R Stormbringer)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Volibear's Thundering Smash. Untargetable for 0.75 s; Thundering Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Volibear Q Thundering Smash)
- **0.35** untargetable: Playful makes Fizz untargetable, dodging Volibear's Frenzied Maul. Untargetable for 0.75 s; Frenzied Maul takes 0.25 s to land, enough to react. (Fizz E Playful → Volibear W Frenzied Maul)
- Watch out: Stormbringer is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.62 | 1.62 | 0.00 |  |
| 2 | Nocturne | +1.42 | 1.42 | 0.00 |  |
| 3 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 4 | Vladimir | +1.39 | 1.47 | 0.08 |  |
| 5 | Bard | +1.33 | 1.41 | 0.08 |  |
| 6 | Lissandra | +1.31 | 1.36 | 0.05 |  |
| 7 | Aurora | +1.28 | 1.28 | 0.00 |  |
| 8 | Fiora | +1.26 | 1.26 | 0.00 |  |
| 9 | Jax | +1.22 | 1.22 | 0.00 | attack dodge (Counter Strike) |
| 10 | Fizz | +1.21 | 1.29 | 0.08 |  |
| 11 | Maokai | +1.21 | 1.28 | 0.07 |  |
| 12 | Master Yi | +1.20 | 1.43 | 0.23 |  |
| 13 | Gwen | +1.19 | 1.19 | 0.00 |  |
| 14 | Udyr | +1.14 | 1.14 | 0.00 |  |
| 15 | Singed | +1.11 | 1.18 | 0.07 | grounding (Mega Adhesive) |
| 16 | Yuumi | +1.10 | 1.51 | 0.41 |  |
| 17 | Evelynn | +1.10 | 1.10 | 0.00 |  |
| 18 | Shaco | +1.10 | 1.10 | 0.00 |  |
| 19 | Teemo | +1.09 | 1.09 | 0.00 | blind (Blinding Dart), blind (Blinding Dart) |
| 20 | Zed | +1.09 | 1.09 | 0.00 |  |
| 21 | Morgana | +1.04 | 1.04 | 0.00 |  |
| 22 | Rek'Sai | +1.03 | 1.19 | 0.16 |  |
| 23 | Camille | +0.94 | 1.09 | 0.15 |  |
| 24 | Rengar | +0.91 | 0.91 | 0.00 |  |
| 25 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 26 | Nilah | +0.83 | 0.91 | 0.08 | attack dodge (Jubilant Veil) |
| 27 | Gangplank | +0.77 | 0.77 | 0.00 |  |
| 28 | Shen | +0.76 | 1.21 | 0.45 | attack block (Spirit's Refuge) |
| 29 | Milio | +0.72 | 0.79 | 0.07 |  |
| 30 | Olaf | +0.61 | 0.61 | 0.00 |  |
| 31 | Kayn | +0.58 | 1.10 | 0.52 |  |
| 32 | Cassiopeia | +0.58 | 0.58 | 0.00 | grounding (Miasma) |
| 33 | Varus | +0.56 | 0.67 | 0.11 |  |
| 34 | Garen | +0.52 | 0.52 | 0.00 |  |
| 35 | Kalista | +0.47 | 0.66 | 0.19 |  |
| 36 | Lulu | +0.46 | 0.54 | 0.08 |  |
| 37 | Xin Zhao | +0.43 | 0.61 | 0.18 |  |
| 38 | Jinx | +0.39 | 0.43 | 0.04 |  |
| 39 | Sion | +0.38 | 0.63 | 0.25 |  |
| 40 | Viktor | +0.38 | 0.42 | 0.04 |  |
| 41 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 42 | Malzahar | +0.37 | 0.82 | 0.45 |  |
| 43 | Alistar | +0.36 | 0.48 | 0.12 |  |
| 44 | Ahri | +0.34 | 0.38 | 0.04 |  |
| 45 | Vex | +0.34 | 0.37 | 0.03 |  |
| 46 | Hwei | +0.33 | 0.40 | 0.07 |  |
| 47 | Veigar | +0.33 | 0.37 | 0.04 |  |
| 48 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 49 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 50 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 51 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 52 | Sona | +0.27 | 0.27 | 0.00 |  |
| 53 | Heimerdinger | +0.25 | 0.25 | 0.00 |  |
| 54 | Zaahen | +0.24 | 0.42 | 0.18 |  |
| 55 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 56 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 57 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 58 | Kled | +0.22 | 0.46 | 0.24 |  |
| 59 | Vayne | +0.22 | 0.29 | 0.07 |  |
| 60 | Corki | +0.22 | 0.22 | 0.00 |  |
| 61 | Elise | +0.22 | 0.22 | 0.00 |  |
| 62 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 63 | Senna | +0.22 | 0.22 | 0.00 |  |
| 64 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 65 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 66 | Katarina | +0.21 | 0.49 | 0.28 |  |
| 67 | Pantheon | +0.20 | 0.70 | 0.50 |  |
| 68 | Renata Glasc | +0.19 | 0.26 | 0.07 |  |
| 69 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 70 | Lux | +0.19 | 0.19 | 0.00 |  |
| 71 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 72 | Mel | +0.18 | 0.18 | 0.00 |  |
| 73 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 74 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 75 | Draven | +0.17 | 0.24 | 0.07 |  |
| 76 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 77 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 78 | Zoe | +0.15 | 0.22 | 0.07 |  |
| 79 | Annie | +0.15 | 0.15 | 0.00 |  |
| 80 | Brand | +0.15 | 0.15 | 0.00 |  |
| 81 | Graves | +0.15 | 0.15 | 0.00 |  |
| 82 | Karma | +0.14 | 0.14 | 0.00 |  |
| 83 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 84 | Skarner | +0.14 | 0.14 | 0.00 |  |
| 85 | Gnar | +0.13 | 0.21 | 0.08 |  |
| 86 | Jayce | +0.12 | 0.19 | 0.07 |  |
| 87 | Samira | +0.10 | 0.19 | 0.09 |  |
| 88 | Orianna | +0.09 | 0.17 | 0.08 |  |
| 89 | Syndra | +0.08 | 0.15 | 0.07 |  |
| 90 | Neeko | +0.07 | 0.15 | 0.08 |  |
| 91 | Amumu | +0.07 | 0.12 | 0.05 |  |
| 92 | Swain | +0.06 | 0.13 | 0.07 |  |
| 93 | Anivia | +0.02 | 0.16 | 0.14 |  |
| 94 | Malphite | +0.01 | 0.21 | 0.20 |  |
| 95 | Ziggs | +0.01 | 0.18 | 0.17 |  |
| 96 | Azir | +0.01 | 0.17 | 0.16 |  |
| 97 | Zyra | 0.00 | 0.16 | 0.16 |  |
| 98 | Urgot | 0.00 | 0.09 | 0.09 |  |
| 99 | Akali | 0.00 | 0.00 | 0.00 |  |
| 100 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 101 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 102 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 103 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 104 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 105 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 106 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 107 | Leona | 0.00 | 0.00 | 0.00 |  |
| 108 | Locke | 0.00 | 0.00 | 0.00 |  |
| 109 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 110 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 111 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 112 | Talon | 0.00 | 0.00 | 0.00 |  |
| 113 | Taric | 0.00 | 0.00 | 0.00 |  |
| 114 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 115 | Thresh | -0.01 | 0.12 | 0.13 |  |
| 116 | Aurelion Sol | -0.02 | 0.15 | 0.17 |  |
| 117 | Lillia | -0.02 | 0.06 | 0.08 |  |
| 118 | Poppy | -0.03 | 0.37 | 0.40 |  |
| 119 | Nami | -0.03 | 0.15 | 0.18 |  |
| 120 | Ivern | -0.03 | 0.12 | 0.15 |  |
| 121 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 122 | Quinn | -0.04 | 0.24 | 0.28 |  |
| 123 | Briar | -0.05 | 0.00 | 0.05 |  |
| 124 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 125 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 126 | Mordekaiser | -0.06 | 0.08 | 0.14 |  |
| 127 | Akshan | -0.07 | 0.21 | 0.28 |  |
| 128 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 129 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 130 | Darius | -0.07 | 0.00 | 0.07 |  |
| 131 | Sett | -0.07 | 0.00 | 0.07 |  |
| 132 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 133 | Rammus | -0.08 | 0.32 | 0.40 |  |
| 134 | Twisted Fate | -0.08 | 0.27 | 0.35 |  |
| 135 | Braum | -0.08 | 0.00 | 0.08 |  |
| 136 | Diana | -0.08 | 0.00 | 0.08 |  |
| 137 | Hecarim | -0.08 | 0.00 | 0.08 |  |
| 138 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 139 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 140 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 141 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 142 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 143 | Yone | -0.13 | 0.12 | 0.25 |  |
| 144 | Rakan | -0.13 | 0.07 | 0.20 |  |
| 145 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 146 | Xerath | -0.15 | 0.17 | 0.32 |  |
| 147 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 148 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 149 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 150 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 151 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 152 | Vel'Koz | -0.18 | 0.17 | 0.35 |  |
| 153 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 154 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 155 | Riven | -0.20 | 0.00 | 0.20 |  |
| 156 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 157 | Rell | -0.24 | 0.00 | 0.24 |  |
| 158 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 159 | Nunu & Willump | -0.25 | 0.31 | 0.56 |  |
| 160 | Warwick | -0.27 | 0.44 | 0.71 |  |
| 161 | Jarvan IV | -0.28 | 0.00 | 0.28 |  |
| 162 | Yasuo | -0.28 | 0.00 | 0.28 |  |
| 163 | Viego | -0.32 | 0.00 | 0.32 |  |
| 164 | Fiddlesticks | -0.33 | 0.12 | 0.45 |  |
| 165 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 166 | Zac | -0.38 | 0.25 | 0.63 |  |
| 167 | Janna | -0.39 | 0.24 | 0.63 |  |
| 168 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 169 | Taliyah | -0.59 | 0.17 | 0.76 |  |
| 170 | Vi | -0.63 | 0.00 | 0.63 |  |
| 171 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 172 | Galio | -0.89 | 0.00 | 0.89 |  |
