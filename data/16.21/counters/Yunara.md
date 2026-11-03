# Counters to Yunara (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Yunara: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yunara wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yunara --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 2 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 3 | Zeri | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +1.00 |
| 4 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 5 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 6 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | – | +1.00 |
| 7 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 8 | Graves | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 9 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +1.00 |
| 10 | Heimerdinger | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 11 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 12 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 13 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 14 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 15 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 16 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 17 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 18 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 19 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 20 | Malphite | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 21 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 22 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 23 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 24 | Elise | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 25 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 26 | Cassiopeia | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 27 | Fiora | +0.77 | +1.00 | +1.00 | +1.00 | −0.52 | +1.00 | +1.00 |
| 28 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 29 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | +0.03 |
| 30 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 31 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 32 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 33 | Anivia | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 34 | Gwen | +0.72 | +1.00 | +1.00 | +1.00 | −0.52 | +1.00 | +0.00 |
| 35 | Riven | +0.62 | +1.00 | +1.00 | +1.00 | −0.07 | −1.00 | +0.50 |
| 36 | Nilah | +0.59 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 37 | Viego | +0.58 | +1.00 | +1.00 | +1.00 | −0.21 | −0.83 | +0.00 |
| 38 | Tristana | +0.56 | +1.00 | +0.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 39 | Varus | +0.56 | +0.21 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 40 | Wukong | +0.55 | +1.00 | +1.00 | +1.00 | −0.33 | −1.00 | +0.00 |
| 41 | Mordekaiser | +0.53 | +0.76 | +0.75 | +1.00 | −0.20 | −0.15 | +0.00 |
| 42 | Ashe | +0.49 | +0.24 | +0.68 | +1.00 | +0.03 | – | +0.14 |
| 43 | Volibear | +0.47 | +0.79 | +0.79 | +0.79 | −0.17 | −1.00 | +0.89 |
| 44 | Sejuani | +0.42 | +1.00 | +1.00 | −0.85 | −0.07 | +1.00 | +0.00 |
| 45 | Rammus | +0.41 | +1.00 | +1.00 | −0.80 | −0.22 | +1.00 | +0.00 |
| 46 | Yasuo | +0.37 | +0.89 | −0.64 | +0.90 | +0.03 | +0.82 | +0.88 |
| 47 | Sion | +0.35 | +0.98 | +0.80 | −0.92 | −0.06 | +0.94 | +0.00 |
| 48 | Gragas | +0.32 | +0.47 | +0.48 | +1.00 | −0.10 | −1.00 | +0.00 |
| 49 | Zaahen | +0.31 | +0.24 | +0.27 | +1.00 | −0.21 | +0.15 | +0.00 |
| 50 | Xin Zhao | +0.30 | −0.29 | +0.71 | +1.00 | +0.07 | −0.14 | +0.00 |
| 51 | Renekton | +0.29 | −0.92 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 52 | Kennen | +0.29 | +0.15 | +0.10 | +1.00 | −0.02 | – | +0.00 |
| 53 | Gangplank | +0.27 | −0.26 | +0.04 | +1.00 | +0.01 | +0.76 | +1.00 |
| 54 | Udyr | +0.27 | +1.00 | −0.43 | +1.00 | −0.15 | −1.00 | +1.00 |
| 55 | Neeko | +0.27 | +0.10 | +0.62 | +1.00 | −0.09 | −1.00 | +0.00 |
| 56 | Warwick | +0.27 | +0.04 | +0.04 | +1.00 | −0.38 | +1.00 | +0.00 |
| 57 | Sett | +0.26 | +1.00 | −0.52 | +1.00 | −0.14 | −0.41 | +0.00 |
| 58 | Vel'Koz | +0.25 | +0.38 | +0.07 | +1.00 | +0.29 | −1.00 | +0.00 |
| 59 | Sylas | +0.25 | +1.00 | +1.00 | −1.00 | +0.24 | −0.85 | +0.00 |
| 60 | Orianna | +0.17 | +0.06 | −0.25 | +1.00 | +0.02 | – | +0.00 |
| 61 | Jayce | +0.11 | +1.00 | −1.00 | +1.00 | +0.06 | −1.00 | +0.00 |
| 62 | Pantheon | +0.10 | +0.76 | +0.08 | −1.00 | −0.08 | +1.00 | +0.00 |
| 63 | Yone | +0.09 | −1.00 | +1.00 | +1.00 | −0.30 | −1.00 | +0.62 |
| 64 | Zed | +0.07 | +1.00 | −1.00 | +1.00 | −0.21 | −1.00 | +0.00 |
| 65 | Ivern | +0.01 | −0.56 | −0.50 | +1.00 | −0.19 | +1.00 | +0.00 |
| 66 | Lee Sin | −0.05 | −0.47 | −0.84 | +1.00 | −0.15 | +1.00 | +0.00 |
| 67 | Annie | −0.06 | −0.27 | −0.08 | +0.11 | +0.06 | – | +0.00 |
| 68 | Zac | −0.08 | −0.10 | −0.30 | +0.14 | +0.06 | −0.16 | +0.00 |
| 69 | Quinn | −0.08 | +0.25 | +0.28 | −1.00 | −0.05 | – | +0.00 |
| 70 | Shyvana | −0.10 | −0.82 | −0.85 | +1.00 | −0.22 | +1.00 | +1.00 |
| 71 | Bel'Veth | −0.13 | −1.00 | +0.12 | +1.00 | −0.06 | −1.00 | +0.00 |
| 72 | Teemo | −0.13 | −0.80 | −0.42 | +1.00 | −0.08 | – | +0.00 |
| 73 | Kassadin | −0.14 | −1.00 | +0.05 | +1.00 | −0.27 | −0.60 | +0.00 |
| 74 | Draven | −0.16 | −0.76 | −0.56 | +1.00 | −0.09 | – | +0.00 |
| 75 | Brand | −0.19 | +0.74 | −0.25 | −1.00 | −0.06 | −1.00 | +0.00 |
| 76 | Illaoi | −0.20 | −0.94 | −1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 77 | Ekko | −0.25 | +1.00 | −1.00 | −0.57 | −0.22 | −1.00 | +0.00 |
| 78 | Vi | −0.31 | −1.00 | +1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 79 | Ambessa | −0.34 | −0.86 | −0.86 | +1.00 | −0.12 | −0.86 | +0.00 |
| 80 | Karma | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 81 | Kai'Sa | −0.34 | −1.00 | −0.93 | +1.00 | −0.17 | – | +0.00 |
| 82 | Lucian | −0.36 | −1.00 | −1.00 | +1.00 | −0.17 | – | +0.00 |
| 83 | Rengar | −0.37 | −0.25 | −0.25 | −1.00 | +0.38 | −1.00 | +0.00 |
| 84 | Cho'Gath | −0.41 | −0.96 | −0.92 | +1.00 | −0.25 | −1.00 | +0.00 |
| 85 | Rumble | −0.41 | −0.91 | −1.00 | +0.92 | −0.14 | −0.95 | +0.00 |
| 86 | Olaf | −0.44 | −0.99 | −0.99 | +1.00 | −0.28 | −1.00 | +0.00 |
| 87 | Ziggs | −0.46 | +0.01 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 88 | Kled | −0.48 | −0.32 | −0.32 | −1.00 | −0.14 | −1.00 | +0.00 |
| 89 | Swain | −0.52 | −0.83 | −0.35 | −0.92 | +0.11 | – | +0.00 |
| 90 | Darius | −0.62 | −1.00 | −0.16 | −1.00 | −0.19 | −1.00 | +0.00 |
| 91 | Briar | −0.63 | −0.56 | −0.56 | −1.00 | −0.33 | −1.00 | +0.00 |
| 92 | Akali | −0.66 | −1.00 | −0.66 | −0.71 | −0.05 | −1.00 | +0.00 |
| 93 | Milio | −0.68 | −0.82 | −0.83 | −1.00 | +0.02 | – | +0.00 |
| 94 | Smolder | −0.68 | −0.60 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 95 | Singed | −0.69 | −1.00 | −0.81 | −0.56 | −0.17 | −1.00 | +0.00 |
| 96 | Samira | −0.71 | −0.88 | −0.90 | −1.00 | +0.01 | – | +0.00 |
| 97 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.47 | −1.00 | +0.00 |
| 98 | Kalista | −0.74 | −0.96 | −0.97 | −0.87 | −0.10 | – | +0.09 |
| 99 | Taric | −0.76 | −0.93 | −1.00 | −0.93 | +0.04 | −1.00 | +0.00 |
| 100 | Naafiri | −0.76 | −0.86 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 101 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 102 | Soraka | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 103 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 104 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 105 | Lux | −0.77 | −1.00 | −0.95 | −1.00 | −0.01 | – | +0.00 |
| 106 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 107 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 108 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 109 | Caitlyn | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 110 | Maokai | −0.77 | −0.97 | −0.93 | −1.00 | +0.00 | −1.00 | +0.00 |
| 111 | Morgana | −0.78 | −0.97 | −0.96 | −0.86 | −0.14 | −1.00 | +0.00 |
| 112 | Garen | −0.78 | −0.86 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 113 | Karthus | −0.78 | −1.00 | −1.00 | −0.93 | +0.06 | −0.99 | +0.00 |
| 114 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 115 | Fiddlesticks | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 116 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 117 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 118 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 119 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −0.98 | +0.09 | −1.00 | +0.00 |
| 120 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 122 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 123 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 124 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 125 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 126 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 127 | Jarvan IV | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 128 | Twitch | −0.79 | −0.98 | −0.99 | −1.00 | −0.10 | – | +0.00 |
| 129 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 130 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 131 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 132 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 133 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 134 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 135 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 136 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 137 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 138 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 139 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 140 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 141 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 142 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 143 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 144 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 145 | Rek'Sai | −0.80 | −1.00 | −0.93 | −1.00 | −0.15 | −1.00 | +0.00 |
| 146 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 147 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 148 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 149 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 150 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 151 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 153 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 155 | Sivir | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 156 | Gnar | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 157 | Hecarim | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 158 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 159 | Kayn | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 160 | Urgot | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 161 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 162 | Fizz | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 163 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 164 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 165 | Locke | −0.83 | −1.00 | −0.99 | −1.00 | −0.21 | −1.00 | +0.00 |
| 166 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 167 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −0.97 | +0.00 |
| 168 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 169 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 170 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 171 | Rakan | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 172 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Yunara's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yunara's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yunara` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Braum (net +0.48)

- **0.50** projectile block: Unbreakable blocks Yunara's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Yunara basic attacks)
- **0.45** projectile block: Unbreakable blocks Yunara's Arc of Judgment, a projectile. Unbreakable for 4 s, long enough to use ahead of Arc of Judgment. (Braum E Unbreakable → Yunara W Arc of Judgment)
- **0.45** projectile block: Unbreakable blocks Yunara's Cultivation of Spirit, a projectile. Unbreakable for 4 s, long enough to use ahead of Cultivation of Spirit. (Braum E Unbreakable → Yunara Q Cultivation of Spirit)
- Watch out: Yunara's basic attacks reach 450 units farther than Braum's (575 vs 125 attack range).

#### 2. Mel (net +0.48)

- **0.30** projectile block: Rebuttal blocks Yunara's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Yunara basic attacks)
- **0.28** projectile block: Rebuttal blocks Yunara's Arc of Judgment, a projectile. Rebuttal for 0.75 s; Arc of Judgment takes 0.98 s to land, enough to react. (Mel W Rebuttal → Yunara W Arc of Judgment)
- **0.17** projectile block: Rebuttal blocks Yunara's Cultivation of Spirit, a projectile. Rebuttal for 0.75 s; Cultivation of Spirit lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Yunara Q Cultivation of Spirit)

#### 3. Samira (net +0.44)

- **0.30** projectile block: Blade Whirl blocks Yunara's Arc of Judgment, a projectile. Blade Whirl for 0.75 s; Arc of Judgment takes 0.98 s to land, enough to react. (Samira W Blade Whirl → Yunara W Arc of Judgment)
- **0.30** projectile block: Blade Whirl blocks Yunara's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Yunara basic attacks)
- **0.18** projectile block: Blade Whirl blocks Yunara's Cultivation of Spirit, a projectile. Blade Whirl for 0.75 s; Cultivation of Spirit lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Yunara Q Cultivation of Spirit)
- Watch out: Yunara's basic attacks reach 75 units farther than Samira's (575 vs 500 attack range).

#### 4. Yasuo (net +0.41)

- **0.39** projectile block: Wind Wall blocks Yunara's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Yunara basic attacks)
- **0.34** projectile block: Wind Wall blocks Yunara's Arc of Judgment, a projectile. Wind Wall for 4 s, long enough to use ahead of Arc of Judgment. (Yasuo W Wind Wall → Yunara W Arc of Judgment)
- **0.34** projectile block: Wind Wall blocks Yunara's Cultivation of Spirit, a projectile. Wind Wall for 4 s, long enough to use ahead of Cultivation of Spirit. (Yasuo W Wind Wall → Yunara Q Cultivation of Spirit)
- Watch out: Yunara's basic attacks reach 400 units farther than Yasuo's (575 vs 175 attack range).

#### 5. Lulu (net +0.34)

- **0.34** disarm: Whimsy disarms Yunara for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Yunara basic attacks)

#### 6. Teemo (net +0.33)

- **0.47** blind: Blinding Dart's blind makes Yunara's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Yunara basic attacks)
- Watch out: Yunara's basic attacks reach 75 units farther than Teemo's (575 vs 500 attack range).

#### 7. Cassiopeia (net +0.29)

- **0.29** grounding: Miasma grounds Yunara, who then can't cast Untouchable Shadow. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Yunara E Untouchable Shadow)

#### 8. Hwei (net +0.28)

- **0.28** dash stop: Grim Visage's knockdown can stop Yunara's Untouchable Shadow mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Yunara E Untouchable Shadow)

#### 9. Jinx (net +0.28)

- **0.28** dash stop: Flame Chompers!'s knockdown can stop Yunara's Untouchable Shadow mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Yunara E Untouchable Shadow)

#### 10. Ahri (net +0.26)

- **0.26** dash stop: Charm's knockdown can stop Yunara's Untouchable Shadow mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Ahri E Charm → Yunara E Untouchable Shadow)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +0.48 | 0.84 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Mel | +0.48 | 0.48 | 0.00 |  |
| 3 | Samira | +0.44 | 0.49 | 0.05 |  |
| 4 | Yasuo | +0.41 | 0.65 | 0.24 |  |
| 5 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 6 | Teemo | +0.33 | 0.47 | 0.14 | blind (Blinding Dart) |
| 7 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 8 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 9 | Jinx | +0.28 | 0.28 | 0.00 |  |
| 10 | Ahri | +0.26 | 0.26 | 0.00 |  |
| 11 | Veigar | +0.24 | 0.24 | 0.00 |  |
| 12 | Viktor | +0.24 | 0.24 | 0.00 |  |
| 13 | Vex | +0.22 | 0.22 | 0.00 |  |
| 14 | Varus | +0.18 | 0.18 | 0.00 |  |
| 15 | Lissandra | +0.14 | 0.14 | 0.00 |  |
| 16 | Shen | +0.12 | 0.36 | 0.24 |  |
| 17 | Tristana | +0.11 | 0.11 | 0.00 |  |
| 18 | Malzahar | +0.09 | 0.23 | 0.14 |  |
| 19 | Aphelios | +0.08 | 0.08 | 0.00 |  |
| 20 | Heimerdinger | +0.08 | 0.08 | 0.00 |  |
| 21 | Caitlyn | +0.07 | 0.07 | 0.00 |  |
| 22 | Milio | +0.07 | 0.07 | 0.00 |  |
| 23 | Kalista | +0.06 | 0.06 | 0.00 |  |
| 24 | Jax | +0.02 | 0.38 | 0.36 |  |
| 25 | Poppy | +0.02 | 0.38 | 0.36 |  |
| 26 | Nilah | +0.01 | 0.33 | 0.32 |  |
| 27 | Rammus | 0.00 | 0.36 | 0.36 |  |
| 28 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 29 | Annie | 0.00 | 0.00 | 0.00 |  |
| 30 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 31 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 32 | Aurora | 0.00 | 0.00 | 0.00 |  |
| 33 | Azir | 0.00 | 0.00 | 0.00 |  |
| 34 | Brand | 0.00 | 0.00 | 0.00 |  |
| 35 | Corki | 0.00 | 0.00 | 0.00 |  |
| 36 | Draven | 0.00 | 0.00 | 0.00 |  |
| 37 | Elise | 0.00 | 0.00 | 0.00 |  |
| 38 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 39 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 40 | Janna | 0.00 | 0.00 | 0.00 |  |
| 41 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 42 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 43 | Karma | 0.00 | 0.00 | 0.00 |  |
| 44 | Kayle | 0.00 | 0.00 | 0.00 |  |
| 45 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 46 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 47 | Lux | 0.00 | 0.00 | 0.00 |  |
| 48 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 49 | Nami | 0.00 | 0.00 | 0.00 |  |
| 50 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 51 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 52 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 53 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 54 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 55 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 56 | Senna | 0.00 | 0.00 | 0.00 |  |
| 57 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 58 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 59 | Sona | 0.00 | 0.00 | 0.00 |  |
| 60 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 61 | Swain | 0.00 | 0.00 | 0.00 |  |
| 62 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 63 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 64 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 65 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 66 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 67 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 68 | Xayah | 0.00 | 0.00 | 0.00 |  |
| 69 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 70 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 71 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 72 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 73 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 74 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 75 | Yone | -0.04 | 0.14 | 0.18 |  |
| 76 | Zac | -0.06 | 0.30 | 0.36 |  |
| 77 | Warwick | -0.06 | 0.18 | 0.24 |  |
| 78 | Fiddlesticks | -0.06 | 0.00 | 0.06 |  |
| 79 | Kled | -0.07 | 0.08 | 0.15 |  |
| 80 | Akshan | -0.07 | 0.00 | 0.07 |  |
| 81 | Bard | -0.07 | 0.00 | 0.07 |  |
| 82 | Jayce | -0.07 | 0.00 | 0.07 |  |
| 83 | Kindred | -0.07 | 0.00 | 0.07 |  |
| 84 | Lucian | -0.07 | 0.00 | 0.07 |  |
| 85 | Thresh | -0.07 | 0.00 | 0.07 |  |
| 86 | Morgana | -0.08 | 0.14 | 0.22 |  |
| 87 | Graves | -0.09 | 0.00 | 0.09 |  |
| 88 | Ivern | -0.09 | 0.00 | 0.09 |  |
| 89 | Malphite | -0.12 | 0.24 | 0.36 |  |
| 90 | Kog'Maw | -0.14 | 0.00 | 0.14 |  |
| 91 | Sivir | -0.14 | 0.00 | 0.14 |  |
| 92 | Yuumi | -0.14 | 0.00 | 0.14 |  |
| 93 | Singed | -0.15 | 0.57 | 0.72 |  |
| 94 | Zaahen | -0.16 | 0.08 | 0.24 |  |
| 95 | Rakan | -0.16 | 0.00 | 0.16 |  |
| 96 | Viego | -0.17 | 0.00 | 0.17 |  |
| 97 | Katarina | -0.18 | 0.18 | 0.36 |  |
| 98 | Briar | -0.18 | 0.00 | 0.18 |  |
| 99 | Camille | -0.18 | 0.00 | 0.18 |  |
| 100 | Fizz | -0.18 | 0.00 | 0.18 |  |
| 101 | Jarvan IV | -0.18 | 0.00 | 0.18 |  |
| 102 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 103 | Naafiri | -0.18 | 0.00 | 0.18 |  |
| 104 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 105 | Udyr | -0.19 | 0.17 | 0.36 |  |
| 106 | Urgot | -0.20 | 0.00 | 0.20 |  |
| 107 | Amumu | -0.22 | 0.14 | 0.36 |  |
| 108 | Karthus | -0.22 | 0.00 | 0.22 |  |
| 109 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 110 | Vladimir | -0.22 | 0.00 | 0.22 |  |
| 111 | Akali | -0.24 | 0.00 | 0.24 |  |
| 112 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 113 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 114 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 115 | Evelynn | -0.24 | 0.00 | 0.24 |  |
| 116 | Galio | -0.24 | 0.00 | 0.24 |  |
| 117 | Hecarim | -0.24 | 0.00 | 0.24 |  |
| 118 | Kayn | -0.24 | 0.00 | 0.24 |  |
| 119 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 120 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 121 | Ornn | -0.24 | 0.00 | 0.24 |  |
| 122 | Pantheon | -0.24 | 0.00 | 0.24 |  |
| 123 | Pyke | -0.24 | 0.00 | 0.24 |  |
| 124 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 125 | Rek'Sai | -0.24 | 0.00 | 0.24 |  |
| 126 | Rell | -0.24 | 0.00 | 0.24 |  |
| 127 | Riven | -0.24 | 0.00 | 0.24 |  |
| 128 | Shaco | -0.24 | 0.00 | 0.24 |  |
| 129 | Talon | -0.24 | 0.00 | 0.24 |  |
| 130 | Vi | -0.24 | 0.00 | 0.24 |  |
| 131 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 132 | Zed | -0.24 | 0.00 | 0.24 |  |
| 133 | Fiora | -0.27 | 0.09 | 0.36 |  |
| 134 | Master Yi | -0.27 | 0.09 | 0.36 |  |
| 135 | Alistar | -0.30 | 0.06 | 0.36 |  |
| 136 | Irelia | -0.34 | 0.00 | 0.34 |  |
| 137 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 138 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 139 | Diana | -0.36 | 0.00 | 0.36 |  |
| 140 | Gragas | -0.36 | 0.00 | 0.36 |  |
| 141 | Gwen | -0.36 | 0.00 | 0.36 |  |
| 142 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 143 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 144 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 145 | Leona | -0.36 | 0.00 | 0.36 |  |
| 146 | Locke | -0.36 | 0.00 | 0.36 |  |
| 147 | Maokai | -0.36 | 0.00 | 0.36 |  |
| 148 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 149 | Nocturne | -0.36 | 0.00 | 0.36 |  |
| 150 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 151 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 152 | Sett | -0.36 | 0.00 | 0.36 |  |
| 153 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 154 | Tahm Kench | -0.36 | 0.00 | 0.36 |  |
| 155 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 156 | Xin Zhao | -0.36 | 0.00 | 0.36 |  |
| 157 | Garen | -0.54 | 0.18 | 0.72 |  |
| 158 | Nunu & Willump | -0.56 | 0.16 | 0.72 |  |
| 159 | Rengar | -0.58 | 0.14 | 0.72 |  |
| 160 | Gangplank | -0.61 | 0.11 | 0.72 |  |
| 161 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 162 | Sion | -0.63 | 0.09 | 0.72 |  |
| 163 | Skarner | -0.63 | 0.09 | 0.72 |  |
| 164 | Olaf | -0.64 | 0.08 | 0.72 |  |
| 165 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 166 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 167 | Darius | -0.72 | 0.00 | 0.72 |  |
| 168 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 169 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 170 | Taric | -0.72 | 0.00 | 0.72 |  |
| 171 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 172 | Yorick | -0.72 | 0.00 | 0.72 |  |
