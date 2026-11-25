# Counters to Draven (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Draven: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Draven wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Draven --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Malphite | +0.87 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.52 |
| 2 | Gangplank | +0.87 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.92 |
| 3 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +1.00 |
| 4 | Sylas | +0.85 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.33 |
| 5 | Warwick | +0.85 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.46 |
| 6 | Shyvana | +0.84 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.87 |
| 7 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.82 |
| 8 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.95 |
| 9 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.79 |
| 10 | Nocturne | +0.83 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.80 |
| 11 | Sion | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.46 |
| 12 | Wukong | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.39 |
| 13 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.90 |
| 14 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.60 |
| 15 | Zeri | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.57 |
| 16 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.04 |
| 17 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.37 |
| 18 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.39 |
| 19 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.43 |
| 20 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.83 |
| 21 | Irelia | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.08 |
| 22 | Zed | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.55 |
| 23 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.48 |
| 24 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 25 | Jarvan IV | +0.81 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.54 |
| 26 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.31 |
| 27 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.29 |
| 28 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.36 |
| 29 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.24 |
| 30 | Yasuo | +0.80 | +0.99 | +0.99 | +1.00 | +0.01 | +1.00 | +0.08 |
| 31 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.30 |
| 32 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.30 |
| 33 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.42 |
| 34 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +0.90 |
| 35 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.48 |
| 36 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.29 |
| 37 | Braum | +0.80 | +1.00 | +0.95 | +1.00 | −0.03 | +1.00 | +0.28 |
| 38 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.33 |
| 39 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.07 |
| 40 | Tahm Kench | +0.79 | +0.98 | +1.00 | +0.97 | +0.06 | +0.91 | −0.05 |
| 41 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +0.71 | +0.46 |
| 42 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.04 |
| 43 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.00 |
| 44 | Aphelios | +0.78 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.18 |
| 45 | Tristana | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.24 |
| 46 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.11 |
| 47 | Darius | +0.76 | +0.91 | +1.00 | +1.00 | −0.11 | +1.00 | −0.07 |
| 48 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.11 |
| 49 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.27 |
| 50 | Kalista | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.24 |
| 51 | Ashe | +0.75 | +0.87 | +0.94 | +1.00 | +0.02 | – | +0.41 |
| 52 | Caitlyn | +0.75 | +1.00 | +0.94 | +0.84 | +0.04 | +1.00 | −0.17 |
| 53 | Kai'Sa | +0.75 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.30 |
| 54 | Jayce | +0.73 | +1.00 | +1.00 | +1.00 | −0.11 | +0.26 | +0.38 |
| 55 | Graves | +0.72 | +1.00 | +1.00 | +1.00 | +0.20 | +0.04 | −0.19 |
| 56 | Cassiopeia | +0.69 | +0.75 | +0.91 | +1.00 | +0.06 | – | −0.07 |
| 57 | Viego | +0.68 | +0.32 | +1.00 | +1.00 | +0.20 | +1.00 | +0.35 |
| 58 | Sejuani | +0.65 | +0.33 | +1.00 | +1.00 | −0.06 | +1.00 | +0.53 |
| 59 | Lillia | +0.63 | +0.77 | +0.88 | +0.51 | −0.03 | +1.00 | +0.44 |
| 60 | Orianna | +0.62 | +1.00 | +0.41 | +1.00 | +0.02 | – | +0.03 |
| 61 | Kassadin | +0.59 | +1.00 | +0.50 | +1.00 | −0.01 | +0.00 | +0.27 |
| 62 | Jhin | +0.55 | +1.00 | +0.19 | +1.00 | +0.02 | – | −0.08 |
| 63 | Zac | +0.53 | +1.00 | +0.86 | +0.48 | −0.12 | +0.05 | −0.29 |
| 64 | Kayn | +0.51 | +0.84 | +0.26 | +0.84 | −0.18 | +0.84 | +0.30 |
| 65 | Nautilus | +0.51 | +0.76 | +0.78 | +1.00 | +0.08 | −0.94 | +0.10 |
| 66 | Kled | +0.48 | +1.00 | +0.09 | +0.23 | +0.32 | +1.00 | +0.35 |
| 67 | Skarner | +0.47 | +0.68 | +0.83 | +0.97 | −0.04 | −1.00 | +0.00 |
| 68 | Rengar | +0.45 | +1.00 | +1.00 | −1.00 | +0.20 | +1.00 | +0.38 |
| 69 | Sett | +0.43 | +1.00 | −0.44 | +1.00 | −0.15 | +1.00 | +0.18 |
| 70 | Ziggs | +0.42 | +1.00 | +0.43 | +0.00 | +0.11 | – | +0.05 |
| 71 | Anivia | +0.40 | +0.15 | +0.53 | +1.00 | −0.09 | – | +0.11 |
| 72 | Fizz | +0.39 | +1.00 | +1.00 | −1.00 | −0.14 | +1.00 | +0.23 |
| 73 | Shaco | +0.35 | +0.89 | +1.00 | −1.00 | −0.12 | +1.00 | −0.13 |
| 74 | Lucian | +0.35 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.16 |
| 75 | Renekton | +0.34 | −0.05 | +1.00 | −0.01 | −0.07 | +1.00 | +0.28 |
| 76 | Twitch | +0.33 | +1.00 | +1.00 | −1.00 | −0.03 | – | +0.01 |
| 77 | Leona | +0.33 | +0.56 | +0.33 | +1.00 | −0.04 | −1.00 | +0.17 |
| 78 | Riven | +0.33 | +1.00 | −1.00 | +1.00 | +0.03 | +1.00 | +0.43 |
| 79 | Nilah | +0.29 | +1.00 | −0.30 | +0.00 | −0.05 | +1.00 | +0.40 |
| 80 | Fiora | +0.26 | +0.56 | −0.77 | +1.00 | −0.22 | +1.00 | +0.87 |
| 81 | Briar | +0.25 | +0.17 | +0.17 | +1.00 | −0.27 | +0.17 | −0.15 |
| 82 | Alistar | +0.25 | +1.00 | −0.43 | +1.00 | −0.03 | −1.00 | +0.20 |
| 83 | Zaahen | +0.20 | −0.07 | −0.37 | +1.00 | −0.03 | +1.00 | +0.27 |
| 84 | Illaoi | +0.19 | +0.62 | −0.75 | +1.00 | −0.02 | +0.22 | +0.07 |
| 85 | Yunara | +0.16 | +0.56 | +0.76 | −1.00 | +0.09 | – | +0.02 |
| 86 | Rell | +0.11 | +1.00 | −1.00 | +1.00 | +0.03 | −1.00 | +0.03 |
| 87 | Rek'Sai | +0.10 | +1.00 | −1.00 | +1.00 | −0.13 | −0.74 | −0.12 |
| 88 | Hecarim | +0.10 | −1.00 | +1.00 | +1.00 | −0.06 | −1.00 | +0.16 |
| 89 | Bel'Veth | +0.09 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.12 |
| 90 | Camille | +0.06 | +0.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.52 |
| 91 | Ambessa | +0.05 | −1.00 | +0.00 | +1.00 | −0.10 | +1.00 | +0.39 |
| 92 | Taric | +0.05 | +0.18 | −0.07 | +0.10 | +0.01 | −0.03 | +0.09 |
| 93 | Malzahar | +0.04 | −0.34 | −0.34 | +1.00 | −0.00 | – | +0.06 |
| 94 | Ornn | +0.04 | +0.11 | −0.11 | −0.03 | −0.02 | +0.41 | +0.06 |
| 95 | Olaf | −0.05 | −1.00 | −0.26 | +1.00 | −0.14 | +0.56 | +0.68 |
| 96 | Milio | −0.05 | −0.32 | −0.01 | +0.11 | +0.08 | – | −0.05 |
| 97 | Xin Zhao | −0.06 | −0.12 | −0.51 | +1.00 | −0.02 | −1.00 | +0.08 |
| 98 | Cho'Gath | −0.11 | −0.53 | −0.22 | +1.00 | −0.11 | −1.00 | −0.13 |
| 99 | Karthus | −0.12 | −0.18 | −0.16 | −0.13 | +0.00 | −0.10 | +0.07 |
| 100 | Azir | −0.20 | −0.87 | −0.65 | +1.00 | +0.01 | – | +0.01 |
| 101 | Miss Fortune | −0.21 | +1.00 | −1.00 | −1.00 | +0.05 | – | +0.13 |
| 102 | Pantheon | −0.21 | −1.00 | −1.00 | +1.00 | −0.12 | +1.00 | +0.17 |
| 103 | Aurora | −0.21 | −1.00 | +0.98 | −1.00 | +0.07 | – | +0.01 |
| 104 | Mel | −0.23 | −1.00 | +0.91 | −1.00 | +0.06 | – | +0.16 |
| 105 | Akali | −0.23 | −0.10 | −0.40 | −0.99 | +0.01 | +0.65 | +0.44 |
| 106 | Vel'Koz | −0.23 | −0.87 | −0.94 | +1.00 | +0.26 | – | +0.01 |
| 107 | Samira | −0.32 | −1.00 | −1.00 | +1.00 | +0.04 | – | +0.13 |
| 108 | Kindred | −0.32 | −0.95 | −1.00 | +1.00 | −0.05 | – | +0.10 |
| 109 | Ekko | −0.33 | +1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.14 |
| 110 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | +0.01 | – | −0.09 |
| 111 | Rakan | −0.35 | +0.00 | −1.00 | +0.00 | −0.15 | −1.00 | +0.47 |
| 112 | Nidalee | −0.35 | −1.00 | −1.00 | +1.00 | −0.04 | – | −0.23 |
| 113 | Neeko | −0.36 | −1.00 | −1.00 | +0.95 | −0.06 | – | +0.01 |
| 114 | Quinn | −0.36 | −1.00 | −1.00 | +1.00 | −0.06 | – | −0.27 |
| 115 | Amumu | −0.39 | −1.00 | −1.00 | +0.88 | −0.06 | −0.74 | +0.28 |
| 116 | Brand | −0.40 | −1.00 | −1.00 | +0.72 | −0.02 | – | −0.11 |
| 117 | Hwei | −0.46 | −1.00 | −1.00 | +0.41 | +0.00 | – | +0.05 |
| 118 | Swain | −0.47 | −0.86 | −0.07 | −1.00 | +0.07 | – | +0.06 |
| 119 | Kennen | −0.50 | −0.42 | −0.61 | −0.89 | −0.10 | – | −0.09 |
| 120 | Smolder | −0.55 | −0.97 | −1.00 | +0.00 | +0.00 | – | −0.10 |
| 121 | Jinx | −0.58 | −0.34 | −0.98 | −1.00 | +0.06 | – | −0.10 |
| 122 | Akshan | −0.58 | −0.32 | −1.00 | −1.00 | −0.01 | – | +0.07 |
| 123 | Locke | −0.59 | −0.60 | −0.61 | −1.00 | −0.04 | −1.00 | +0.35 |
| 124 | Evelynn | −0.68 | −1.00 | −1.00 | −1.00 | +0.16 | +0.00 | −0.03 |
| 125 | Ezreal | −0.69 | −0.98 | −0.91 | −0.72 | −0.00 | – | −0.07 |
| 126 | Galio | −0.70 | −1.00 | −1.00 | −1.00 | −0.01 | +0.00 | −0.04 |
| 127 | Ahri | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.27 |
| 128 | Xerath | −0.75 | −1.00 | −0.98 | −1.00 | +0.04 | – | +0.25 |
| 129 | Kha'Zix | −0.75 | −1.00 | −1.00 | −1.00 | −0.04 | −0.75 | +0.55 |
| 130 | Sivir | −0.75 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.43 |
| 131 | Lissandra | −0.75 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.27 |
| 132 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.23 |
| 133 | Sona | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.29 |
| 134 | Naafiri | −0.76 | −0.96 | −0.94 | −1.00 | +0.07 | −1.00 | +0.12 |
| 135 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | −0.09 | −0.48 | −0.05 |
| 136 | Varus | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.18 |
| 137 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.08 |
| 138 | Karma | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.12 |
| 139 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.08 |
| 140 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.03 |
| 141 | Viktor | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.12 |
| 142 | Zoe | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.02 |
| 143 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.20 |
| 144 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.06 |
| 145 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.02 |
| 146 | Zyra | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.08 |
| 147 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.14 |
| 148 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.21 |
| 149 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.06 |
| 150 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.02 |
| 151 | Bard | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.02 |
| 152 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.09 |
| 153 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.13 |
| 154 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.25 |
| 155 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.14 |
| 156 | Aurelion Sol | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.26 |
| 157 | Shen | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.25 |
| 158 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.31 |
| 159 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.11 |
| 160 | Gnar | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.01 |
| 161 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.06 |
| 162 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.02 |
| 163 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 164 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.24 |
| 165 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.32 |
| 166 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.13 |
| 167 | Yone | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.21 |
| 168 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.17 |
| 169 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.01 |
| 170 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.20 |
| 171 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.05 |
| 172 | Aatrox | −0.84 | −1.00 | −1.00 | −0.94 | −0.28 | −1.00 | −0.20 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Draven's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Draven's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Draven` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Kayle (net +0.98)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Draven's Whirling Death. Invulnerable for 2.5 s, long enough to use ahead of Whirling Death. (Kayle R Divine Judgment → Draven R Whirling Death)
- **0.44** death prevention: Draven's Whirling Death can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Draven R Whirling Death)
- **0.21** invulnerable: Divine Judgment makes Kayle invulnerable to Draven's Spinning Axe. Invulnerable for 2.5 s, long enough to use ahead of Spinning Axe. (Kayle R Divine Judgment → Draven Q Spinning Axe)

#### 2. Samira (net +0.89)

- **0.55** projectile block: Blade Whirl blocks Draven's Whirling Death, a projectile. Blade Whirl for 0.75 s; Whirling Death takes 0.5 s to land, enough to react. (Samira W Blade Whirl → Draven R Whirling Death)
- **0.51** projectile block: Blade Whirl blocks Draven's Stand Aside, a projectile. Blade Whirl for 0.75 s; Stand Aside takes 1.04 s to land, enough to react. (Samira W Blade Whirl → Draven E Stand Aside)
- **0.30** projectile block: Blade Whirl blocks Draven's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Draven basic attacks)

#### 3. Fizz (net +0.87)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Draven's Stand Aside. Untargetable for 0.75 s; Stand Aside takes 1.04 s to land, enough to react. (Fizz E Playful → Draven E Stand Aside)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Draven's Whirling Death. Untargetable for 0.75 s; Whirling Death takes 0.5 s to land, enough to react. (Fizz E Playful → Draven R Whirling Death)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Draven's Spinning Axe. Untargetable for 0.75 s; Spinning Axe lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Draven Q Spinning Axe)
- Watch out: Draven's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 4. Mel (net +0.87)

- **0.55** projectile block: Rebuttal blocks Draven's Whirling Death, a projectile. Rebuttal for 0.75 s; Whirling Death takes 0.5 s to land, enough to react. (Mel W Rebuttal → Draven R Whirling Death)
- **0.47** projectile block: Rebuttal blocks Draven's Stand Aside, a projectile. Rebuttal for 0.75 s; Stand Aside takes 1.04 s to land, enough to react. (Mel W Rebuttal → Draven E Stand Aside)
- **0.30** projectile block: Rebuttal blocks Draven's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Draven basic attacks)

#### 5. Braum (net +0.77)

- **0.70** projectile block: Unbreakable blocks Draven's Stand Aside, a projectile. Unbreakable for 4 s, long enough to use ahead of Stand Aside. (Braum E Unbreakable → Draven E Stand Aside)
- **0.55** projectile block: Unbreakable blocks Draven's Whirling Death, a projectile. Unbreakable for 4 s, long enough to use ahead of Whirling Death. (Braum E Unbreakable → Draven R Whirling Death)
- **0.50** projectile block: Unbreakable blocks Draven's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Draven basic attacks)
- Watch out: Draven's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 6. Bard (net +0.77)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Draven's Whirling Death. Untargetable for 2.5 s, long enough to use ahead of Whirling Death. (Bard R Tempered Fate → Draven R Whirling Death)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Draven's Stand Aside. Untargetable for 2.5 s, long enough to use ahead of Stand Aside. (Bard R Tempered Fate → Draven E Stand Aside)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Draven's Spinning Axe. Untargetable for 2.5 s, long enough to use ahead of Spinning Axe. (Bard R Tempered Fate → Draven Q Spinning Axe)

#### 7. Lissandra (net +0.77)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Draven's Whirling Death. Untargetable for 2.5 s, long enough to use ahead of Whirling Death. (Lissandra R Frozen Tomb → Draven R Whirling Death)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Draven's Stand Aside. Untargetable for 2.5 s, long enough to use ahead of Stand Aside. (Lissandra R Frozen Tomb → Draven E Stand Aside)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Draven's Spinning Axe. Untargetable for 2.5 s, long enough to use ahead of Spinning Axe. (Lissandra R Frozen Tomb → Draven Q Spinning Axe)

#### 8. Yasuo (net +0.75)

- **0.58** projectile block: Wind Wall blocks Draven's Stand Aside, a projectile. Wind Wall for 4 s, long enough to use ahead of Stand Aside. (Yasuo W Wind Wall → Draven E Stand Aside)
- **0.55** projectile block: Wind Wall blocks Draven's Whirling Death, a projectile. Wind Wall for 4 s, long enough to use ahead of Whirling Death. (Yasuo W Wind Wall → Draven R Whirling Death)
- **0.39** projectile block: Wind Wall blocks Draven's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Draven basic attacks)
- Watch out: Draven's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 9. Vladimir (net +0.71)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Draven's Stand Aside. Untargetable for 2 s, long enough to use ahead of Stand Aside. (Vladimir W Sanguine Pool → Draven E Stand Aside)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Draven's Whirling Death. Untargetable for 2 s, long enough to use ahead of Whirling Death. (Vladimir W Sanguine Pool → Draven R Whirling Death)
- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Draven's Spinning Axe. Untargetable for 2 s, long enough to use ahead of Spinning Axe. (Vladimir W Sanguine Pool → Draven Q Spinning Axe)
- Watch out: Draven's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 10. Sivir (net +0.70)

- **0.56** spell shield: Spell Shield's spell shield blocks Draven's Stand Aside. Spell shield for 1.5 s, long enough to use ahead of Stand Aside. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Draven E Stand Aside)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Draven's Whirling Death. Spell shield for 1.5 s, long enough to use ahead of Whirling Death. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block one instance of damage. (Sivir E Spell Shield → Draven R Whirling Death)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.98 | 0.98 | 0.00 |  |
| 2 | Samira | +0.89 | 0.89 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 3 | Fizz | +0.87 | 1.04 | 0.17 |  |
| 4 | Mel | +0.87 | 0.87 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 5 | Braum | +0.77 | 1.13 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 6 | Bard | +0.77 | 0.77 | 0.00 |  |
| 7 | Lissandra | +0.77 | 0.77 | 0.00 |  |
| 8 | Yasuo | +0.75 | 0.97 | 0.22 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 9 | Vladimir | +0.71 | 0.96 | 0.25 |  |
| 10 | Sivir | +0.70 | 0.70 | 0.00 |  |
| 11 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 12 | Aurora | +0.68 | 0.68 | 0.00 |  |
| 13 | Fiora | +0.67 | 1.03 | 0.36 |  |
| 14 | Maokai | +0.67 | 1.03 | 0.36 |  |
| 15 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 16 | Rek'Sai | +0.56 | 0.78 | 0.22 |  |
| 17 | Zaahen | +0.56 | 0.78 | 0.22 |  |
| 18 | Nocturne | +0.55 | 0.91 | 0.36 |  |
| 19 | Camille | +0.54 | 0.72 | 0.18 |  |
| 20 | Yuumi | +0.53 | 1.04 | 0.51 |  |
| 21 | Gwen | +0.52 | 0.88 | 0.36 |  |
| 22 | Evelynn | +0.51 | 0.75 | 0.24 |  |
| 23 | Shaco | +0.51 | 0.75 | 0.24 |  |
| 24 | Master Yi | +0.46 | 1.00 | 0.54 |  |
| 25 | Zed | +0.44 | 0.68 | 0.24 |  |
| 26 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 27 | Morgana | +0.42 | 0.60 | 0.18 |  |
| 28 | Xin Zhao | +0.41 | 0.75 | 0.34 |  |
| 29 | Kindred | +0.35 | 0.35 | 0.00 |  |
| 30 | Udyr | +0.34 | 0.70 | 0.36 |  |
| 31 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 32 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 33 | Anivia | +0.26 | 0.26 | 0.00 |  |
| 34 | Kalista | +0.26 | 0.26 | 0.00 |  |
| 35 | Jax | +0.25 | 0.61 | 0.36 | attack dodge (Counter Strike) |
| 36 | Kled | +0.19 | 0.33 | 0.14 |  |
| 37 | Nilah | +0.18 | 0.47 | 0.29 |  |
| 38 | Pantheon | +0.16 | 0.88 | 0.72 |  |
| 39 | Tryndamere | +0.10 | 0.44 | 0.34 |  |
| 40 | Milio | +0.09 | 0.09 | 0.00 |  |
| 41 | Kayn | +0.08 | 0.75 | 0.67 |  |
| 42 | Annie | +0.08 | 0.08 | 0.00 |  |
| 43 | Aphelios | +0.07 | 0.07 | 0.00 |  |
| 44 | Heimerdinger | +0.07 | 0.07 | 0.00 |  |
| 45 | Vex | +0.07 | 0.07 | 0.00 |  |
| 46 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 47 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 48 | Azir | 0.00 | 0.00 | 0.00 |  |
| 49 | Brand | 0.00 | 0.00 | 0.00 |  |
| 50 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 51 | Corki | 0.00 | 0.00 | 0.00 |  |
| 52 | Elise | 0.00 | 0.00 | 0.00 |  |
| 53 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 54 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 55 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 56 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 57 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 58 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 59 | Karma | 0.00 | 0.00 | 0.00 |  |
| 60 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 63 | Lux | 0.00 | 0.00 | 0.00 |  |
| 64 | Nami | 0.00 | 0.00 | 0.00 |  |
| 65 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 66 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 67 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Senna | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 72 | Sona | 0.00 | 0.00 | 0.00 |  |
| 73 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 77 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 78 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 79 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 80 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 84 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 85 | K'Sante | -0.04 | 0.14 | 0.18 |  |
| 86 | Malzahar | -0.05 | 0.35 | 0.40 |  |
| 87 | Malphite | -0.05 | 0.31 | 0.36 |  |
| 88 | Thresh | -0.06 | 0.00 | 0.06 |  |
| 89 | Graves | -0.07 | 0.00 | 0.07 |  |
| 90 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 91 | Alistar | -0.09 | 0.27 | 0.36 |  |
| 92 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 93 | Jarvan IV | -0.10 | 0.07 | 0.17 |  |
| 94 | Yone | -0.10 | 0.07 | 0.17 |  |
| 95 | Shen | -0.11 | 0.58 | 0.69 | attack block (Spirit's Refuge) |
| 96 | Varus | -0.11 | 0.00 | 0.11 |  |
| 97 | Hecarim | -0.15 | 0.07 | 0.22 |  |
| 98 | Ornn | -0.15 | 0.07 | 0.22 |  |
| 99 | Rakan | -0.15 | 0.00 | 0.15 |  |
| 100 | Rengar | -0.16 | 0.56 | 0.72 |  |
| 101 | Volibear | -0.17 | 0.07 | 0.24 |  |
| 102 | Sylas | -0.17 | 0.00 | 0.17 |  |
| 103 | Briar | -0.18 | 0.00 | 0.18 |  |
| 104 | Quinn | -0.18 | 0.00 | 0.18 |  |
| 105 | Urgot | -0.18 | 0.00 | 0.18 |  |
| 106 | Lillia | -0.20 | 0.00 | 0.20 |  |
| 107 | Gangplank | -0.21 | 0.51 | 0.72 |  |
| 108 | Ivern | -0.21 | 0.00 | 0.21 |  |
| 109 | Wukong | -0.22 | 0.00 | 0.22 |  |
| 110 | Rell | -0.22 | 0.00 | 0.22 |  |
| 111 | Rammus | -0.24 | 0.36 | 0.60 |  |
| 112 | Akali | -0.24 | 0.00 | 0.24 |  |
| 113 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 114 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 115 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 116 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 117 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 118 | Riven | -0.24 | 0.00 | 0.24 |  |
| 119 | Talon | -0.24 | 0.00 | 0.24 |  |
| 120 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 121 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 122 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 123 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 124 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 125 | Illaoi | -0.29 | 0.07 | 0.36 |  |
| 126 | Sett | -0.29 | 0.07 | 0.36 |  |
| 127 | Shyvana | -0.29 | 0.07 | 0.36 |  |
| 128 | Viego | -0.29 | 0.07 | 0.36 |  |
| 129 | Irelia | -0.32 | 0.00 | 0.32 |  |
| 130 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 131 | Aatrox | -0.34 | 0.00 | 0.34 |  |
| 132 | Nautilus | -0.34 | 0.00 | 0.34 |  |
| 133 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 134 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 135 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 136 | Amumu | -0.36 | 0.00 | 0.36 |  |
| 137 | Diana | -0.36 | 0.00 | 0.36 |  |
| 138 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 139 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 140 | Leona | -0.36 | 0.00 | 0.36 |  |
| 141 | Locke | -0.36 | 0.00 | 0.36 |  |
| 142 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 143 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 144 | Olaf | -0.38 | 0.34 | 0.72 |  |
| 145 | Pyke | -0.38 | 0.00 | 0.38 |  |
| 146 | Janna | -0.40 | 0.00 | 0.40 |  |
| 147 | Sion | -0.44 | 0.36 | 0.80 |  |
| 148 | Fiddlesticks | -0.44 | 0.00 | 0.44 |  |
| 149 | Warwick | -0.46 | 0.42 | 0.88 |  |
| 150 | Karthus | -0.46 | 0.00 | 0.46 |  |
| 151 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 152 | Garen | -0.49 | 0.19 | 0.68 |  |
| 153 | Gragas | -0.51 | 0.00 | 0.51 |  |
| 154 | Zac | -0.52 | 0.25 | 0.77 |  |
| 155 | Vi | -0.52 | 0.07 | 0.59 |  |
| 156 | Poppy | -0.56 | 0.00 | 0.56 |  |
| 157 | Mordekaiser | -0.59 | 0.09 | 0.68 |  |
| 158 | Skarner | -0.63 | 0.09 | 0.72 |  |
| 159 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 160 | Katarina | -0.64 | 0.00 | 0.64 |  |
| 161 | Darius | -0.68 | 0.00 | 0.68 |  |
| 162 | Trundle | -0.68 | 0.00 | 0.68 |  |
| 163 | Yorick | -0.68 | 0.00 | 0.68 |  |
| 164 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 165 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 166 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 167 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 168 | Singed | -0.72 | 0.00 | 0.72 |  |
| 169 | Taric | -0.72 | 0.00 | 0.72 |  |
| 170 | Galio | -0.83 | 0.00 | 0.83 |  |
| 171 | Tahm Kench | -0.84 | 0.00 | 0.84 |  |
| 172 | Nunu & Willump | -1.00 | 0.21 | 1.21 |  |
