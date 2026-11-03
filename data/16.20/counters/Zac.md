# Counters to Zac (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Zac: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zac wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zac --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.47 | – | +0.00 |
| 2 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.00 |
| 3 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 4 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 5 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 6 | Bel'Veth | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 7 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 8 | Nilah | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 9 | Aphelios | +0.80 | +1.00 | +0.99 | +1.00 | −0.01 | +0.99 | +0.00 |
| 10 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 11 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 12 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 13 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 14 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 15 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 16 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 17 | Nocturne | +0.74 | +0.92 | +1.00 | +0.92 | −0.01 | – | +0.00 |
| 18 | Trundle | +0.67 | +0.76 | +1.00 | +0.78 | +0.02 | – | +0.00 |
| 19 | Yasuo | +0.65 | +0.99 | +0.49 | +1.00 | +0.10 | – | +0.00 |
| 20 | Warwick | +0.59 | +0.58 | +0.61 | +1.00 | +0.22 | – | +0.00 |
| 21 | Taric | +0.45 | +0.67 | +0.30 | +0.67 | +0.20 | – | +0.00 |
| 22 | Zeri | +0.41 | +0.10 | +0.84 | +0.75 | +0.10 | +0.10 | +0.00 |
| 23 | Cho'Gath | +0.38 | +0.35 | +0.96 | +0.00 | +0.10 | – | +0.00 |
| 24 | Twisted Fate | +0.33 | +0.34 | +0.34 | +0.50 | +0.17 | +0.33 | +0.00 |
| 25 | Corki | +0.25 | +0.69 | +0.83 | −1.00 | +0.25 | +0.34 | +0.00 |
| 26 | Xin Zhao | +0.23 | +0.05 | +0.04 | +0.91 | +0.00 | – | +0.00 |
| 27 | Singed | +0.18 | +0.15 | +0.19 | +0.21 | +0.24 | – | +0.00 |
| 28 | Ivern | +0.18 | +0.30 | +0.22 | +0.12 | +0.11 | +0.08 | +0.00 |
| 29 | Karma | +0.15 | +0.29 | +0.09 | +0.07 | +0.03 | +0.36 | +0.00 |
| 30 | Hwei | +0.14 | +0.26 | +0.12 | +0.02 | +0.19 | +0.09 | +0.00 |
| 31 | Poppy | +0.14 | +0.05 | +0.23 | +0.06 | +0.28 | – | +0.00 |
| 32 | Lee Sin | +0.12 | +0.14 | +0.14 | +0.08 | +0.14 | – | +0.00 |
| 33 | Maokai | +0.09 | +0.11 | −0.09 | +0.13 | +0.35 | – | +0.00 |
| 34 | Kled | +0.08 | +0.09 | +0.09 | −0.01 | +0.20 | – | +0.00 |
| 35 | Swain | +0.08 | +0.15 | +0.02 | −0.02 | +0.15 | +0.15 | +0.00 |
| 36 | Gwen | +0.08 | −0.32 | +0.70 | −0.23 | +0.13 | – | +0.00 |
| 37 | Yunara | +0.08 | +0.30 | +0.10 | −0.14 | −0.06 | +0.16 | +0.00 |
| 38 | Smolder | +0.06 | +0.02 | +0.02 | +0.10 | −0.10 | +0.46 | +0.00 |
| 39 | Rakan | +0.05 | +0.04 | +0.16 | −0.01 | +0.03 | +0.01 | +0.00 |
| 40 | Nasus | +0.03 | +0.01 | −0.04 | +0.04 | +0.19 | – | +0.00 |
| 41 | Morgana | +0.03 | −0.03 | −0.07 | −0.03 | +0.19 | +0.36 | +0.00 |
| 42 | Briar | +0.03 | −0.04 | −0.04 | −0.01 | +0.31 | – | +0.00 |
| 43 | Lulu | −0.00 | −0.14 | +0.12 | +0.16 | +0.10 | −0.47 | +0.00 |
| 44 | Gnar | −0.01 | −0.10 | −0.06 | −0.02 | +0.04 | +0.31 | +0.00 |
| 45 | Lillia | −0.01 | −0.02 | −0.02 | −0.03 | −0.08 | +0.18 | +0.00 |
| 46 | Soraka | −0.01 | −0.10 | +0.04 | −0.10 | +0.07 | +0.11 | +0.00 |
| 47 | Ezreal | −0.01 | +0.43 | +0.43 | −1.00 | +0.05 | −0.39 | +0.00 |
| 48 | Aurora | −0.03 | −0.01 | −0.08 | +0.02 | −0.04 | −0.13 | +0.00 |
| 49 | Lucian | −0.04 | −0.06 | −0.09 | −0.11 | +0.17 | −0.03 | +0.00 |
| 50 | Master Yi | −0.04 | −0.26 | +0.77 | −0.26 | −0.12 | −1.00 | +0.00 |
| 51 | Janna | −0.06 | −0.08 | −0.27 | −0.02 | +0.22 | +0.01 | +0.00 |
| 52 | Riven | −0.06 | −0.83 | +1.00 | −0.73 | +0.34 | – | +0.00 |
| 53 | Nami | −0.09 | −0.27 | −0.27 | +0.20 | −0.13 | +0.20 | +0.00 |
| 54 | Mel | −0.12 | −0.48 | +0.15 | −0.20 | +0.20 | −0.25 | +0.00 |
| 55 | Brand | −0.12 | −0.16 | −0.12 | −0.15 | −0.07 | −0.13 | +0.00 |
| 56 | Kalista | −0.13 | −1.00 | −0.20 | +0.70 | +0.10 | +0.16 | +0.00 |
| 57 | Malzahar | −0.13 | −0.13 | −0.19 | −0.28 | +0.11 | −0.13 | +0.00 |
| 58 | Senna | −0.14 | −0.13 | −0.13 | −0.21 | −0.11 | −0.10 | +0.00 |
| 59 | Viktor | −0.15 | −0.35 | −0.20 | +0.03 | −0.07 | −0.06 | +0.00 |
| 60 | Akshan | −0.15 | −0.20 | −0.20 | −0.27 | +0.08 | −0.10 | +0.00 |
| 61 | Lux | −0.18 | −0.26 | −0.26 | −0.27 | +0.14 | −0.17 | +0.00 |
| 62 | Sona | −0.19 | −0.17 | −0.28 | −0.12 | −0.08 | −0.42 | +0.00 |
| 63 | Camille | −0.20 | +0.64 | −0.75 | −0.88 | +0.15 | – | +0.00 |
| 64 | Teemo | −0.20 | +0.09 | −0.90 | −0.14 | +0.14 | +0.08 | +0.00 |
| 65 | Dr. Mundo | −0.21 | −0.25 | −0.27 | −0.25 | −0.06 | – | +0.00 |
| 66 | Sylas | −0.21 | −0.14 | +0.05 | −0.93 | +0.10 | – | +0.00 |
| 67 | Seraphine | −0.24 | −0.26 | −0.20 | −0.45 | +0.08 | −0.44 | +0.00 |
| 68 | Zyra | −0.24 | −0.24 | −0.32 | −0.47 | +0.15 | −0.30 | +0.00 |
| 69 | Milio | −0.26 | −0.72 | −0.74 | +0.24 | +0.20 | +0.31 | +0.00 |
| 70 | Neeko | −0.26 | −0.05 | −0.09 | −0.98 | +0.22 | −0.61 | +0.00 |
| 71 | Xayah | −0.27 | −0.94 | +0.02 | +0.14 | +0.22 | −0.97 | +0.00 |
| 72 | Elise | −0.27 | −0.95 | −0.03 | −0.16 | +0.13 | −0.10 | +0.00 |
| 73 | Zoe | −0.27 | −0.02 | −0.93 | −0.17 | +0.04 | −0.02 | +0.00 |
| 74 | Veigar | −0.27 | −0.46 | −0.44 | −0.16 | +0.02 | −0.16 | +0.00 |
| 75 | Sion | −0.27 | −0.30 | −0.34 | −0.64 | +0.28 | – | +0.00 |
| 76 | Volibear | −0.28 | −0.11 | −0.93 | −0.11 | +0.17 | – | +0.00 |
| 77 | Anivia | −0.30 | −0.27 | −0.44 | −0.41 | −0.02 | −0.34 | +0.00 |
| 78 | Bard | −0.33 | −0.85 | +0.58 | −0.98 | +0.20 | −0.99 | +0.00 |
| 79 | Annie | −0.35 | −1.00 | −0.01 | −0.12 | +0.18 | −1.00 | +0.00 |
| 80 | Karthus | −0.36 | −0.46 | −0.42 | −0.40 | −0.09 | −0.45 | +0.00 |
| 81 | Lissandra | −0.36 | −0.91 | −0.46 | −0.23 | +0.27 | −0.11 | +0.00 |
| 82 | Gragas | −0.37 | −0.34 | −0.34 | −1.00 | +0.25 | – | +0.00 |
| 83 | Draven | −0.38 | −0.49 | −1.00 | −0.14 | +0.12 | +0.03 | +0.00 |
| 84 | Ahri | −0.39 | −0.29 | −1.00 | −0.35 | +0.20 | −0.25 | +0.00 |
| 85 | Syndra | −0.39 | −1.00 | −0.94 | +0.22 | +0.18 | +0.17 | +0.00 |
| 86 | Yone | −0.40 | −0.99 | +0.24 | −0.99 | +0.17 | – | +0.00 |
| 87 | Vex | −0.43 | −0.43 | −0.43 | −0.53 | −0.07 | −0.98 | +0.00 |
| 88 | Leona | −0.44 | −0.39 | −0.39 | −1.00 | +0.01 | – | +0.00 |
| 89 | Tahm Kench | −0.45 | −0.69 | −0.69 | −0.40 | +0.13 | – | +0.00 |
| 90 | K'Sante | −0.45 | +0.00 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 91 | Ornn | −0.47 | −1.00 | −0.12 | −1.00 | +0.35 | – | +0.00 |
| 92 | Rell | −0.48 | −0.98 | −0.26 | −0.98 | +0.14 | −0.00 | +0.00 |
| 93 | Rek'Sai | −0.49 | −0.84 | −0.20 | −0.84 | −0.05 | – | +0.00 |
| 94 | Jax | −0.49 | −0.97 | +0.00 | −0.98 | −0.01 | – | +0.00 |
| 95 | Graves | −0.55 | −0.82 | −0.99 | −0.71 | +0.16 | +0.23 | +0.00 |
| 96 | Ziggs | −0.56 | −1.00 | −0.08 | −1.00 | +0.07 | −1.00 | +0.00 |
| 97 | Fiddlesticks | −0.56 | −1.00 | −0.18 | −1.00 | +0.20 | −0.98 | +0.00 |
| 98 | Braum | −0.58 | −0.95 | −0.40 | −0.98 | +0.08 | – | +0.00 |
| 99 | Jinx | −0.60 | −0.57 | −0.57 | −0.99 | −0.09 | −1.00 | +0.00 |
| 100 | Zilean | −0.61 | −0.89 | −0.61 | −0.71 | +0.06 | −1.00 | +0.00 |
| 101 | Kai'Sa | −0.61 | −0.87 | −0.87 | −0.39 | −0.02 | −0.96 | +0.00 |
| 102 | Orianna | −0.63 | −1.00 | −1.00 | −0.15 | +0.03 | −1.00 | +0.00 |
| 103 | Heimerdinger | −0.64 | −1.00 | −0.45 | −0.98 | +0.11 | −1.00 | +0.00 |
| 104 | Shen | −0.65 | −1.00 | −0.65 | −0.99 | +0.19 | – | +0.00 |
| 105 | Nautilus | −0.67 | −1.00 | −1.00 | −1.00 | +0.33 | −0.14 | +0.00 |
| 106 | Sivir | −0.68 | −0.79 | −0.79 | −0.87 | −0.13 | −0.89 | +0.00 |
| 107 | Blitzcrank | −0.68 | −1.00 | −1.00 | −1.00 | +0.27 | −0.23 | +0.00 |
| 108 | Kindred | −0.70 | −1.00 | −1.00 | −1.00 | +0.16 | −0.21 | +0.00 |
| 109 | Rengar | −0.70 | −0.88 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 110 | Kennen | −0.70 | −1.00 | −0.96 | −1.00 | −0.09 | +0.03 | +0.00 |
| 111 | LeBlanc | −0.71 | −1.00 | −1.00 | −1.00 | −0.01 | −0.04 | +0.00 |
| 112 | Wukong | −0.72 | −0.96 | −1.00 | −0.92 | +0.17 | – | +0.00 |
| 113 | Evelynn | −0.72 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.00 |
| 114 | Malphite | −0.72 | −1.00 | −1.00 | −1.00 | +0.33 | – | +0.00 |
| 115 | Rammus | −0.73 | −0.99 | −1.00 | −1.00 | +0.29 | – | +0.00 |
| 116 | Xerath | −0.73 | −1.00 | −1.00 | −1.00 | +0.17 | −0.53 | +0.00 |
| 117 | Jayce | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 118 | Alistar | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 119 | Kassadin | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 120 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 121 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 122 | Galio | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 123 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 124 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 125 | Garen | −0.76 | −0.98 | −1.00 | −0.98 | +0.04 | – | +0.00 |
| 126 | Mordekaiser | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 127 | Illaoi | −0.76 | −1.00 | −0.98 | −0.99 | +0.07 | – | +0.00 |
| 128 | Kog'Maw | −0.76 | −0.98 | −0.98 | −1.00 | +0.02 | −0.72 | +0.00 |
| 129 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 130 | Tristana | −0.77 | −1.00 | −1.00 | −0.98 | −0.14 | −0.49 | +0.00 |
| 131 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 132 | Kayn | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 133 | Thresh | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 134 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 135 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 136 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 137 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 138 | Rumble | −0.77 | −1.00 | −1.00 | −0.99 | +0.04 | – | +0.00 |
| 139 | Vi | −0.77 | −1.00 | −0.99 | −0.99 | +0.02 | – | +0.00 |
| 140 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 141 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 142 | Tryndamere | −0.77 | −1.00 | −0.98 | −1.00 | −0.02 | – | +0.00 |
| 143 | Ryze | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 144 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 145 | Samira | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −0.96 | +0.00 |
| 146 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 147 | Fizz | −0.78 | −1.00 | −0.99 | −1.00 | −0.01 | – | +0.00 |
| 148 | Renekton | −0.79 | −1.00 | −0.97 | −1.00 | −0.11 | – | +0.00 |
| 149 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 150 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 151 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 152 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 153 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 154 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 155 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 156 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 157 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 158 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 159 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 160 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 161 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 162 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 163 | Jhin | −0.80 | −0.99 | −0.99 | −1.00 | −0.04 | −1.00 | +0.00 |
| 164 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 165 | Cassiopeia | −0.81 | −1.00 | −1.00 | −0.99 | −0.09 | −0.98 | +0.00 |
| 166 | Vel'Koz | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −0.96 | +0.00 |
| 167 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 168 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 169 | Aurelion Sol | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 170 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 171 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 172 | Vladimir | −0.86 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zac's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zac's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zac` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +2.00)

- **0.94** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.4 s; Elastic Slingshot takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Zac E Elastic Slingshot)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.4 s; Let's Bounce! takes 0.3 s to land, enough to react. (Maokai W Twisted Advance → Zac R Let's Bounce!)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Stretching Strikes. Untargetable for 1.4 s; Stretching Strikes takes 0.62 s to land, enough to react. (Maokai W Twisted Advance → Zac Q Stretching Strikes)

#### 2. Nocturne (net +1.73)

- **0.85** spell shield: Shroud of Darkness's spell shield blocks Zac's Elastic Slingshot. Spell shield for 1.5 s, long enough to use ahead of Elastic Slingshot. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zac E Elastic Slingshot)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Zac's Elastic Slingshot (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Zac E Elastic Slingshot)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Zac's Let's Bounce!. Spell shield for 1.5 s, long enough to use ahead of Let's Bounce!. A spell shield blocks only the first enemy ability that reaches it. Spell shield only blocks a single instance of damage. (Nocturne W Shroud of Darkness → Zac R Let's Bounce!)

#### 3. Zaahen (net +1.65)

- **0.80** cc immunity: Grim Deliverance makes Zaahen immune to Zac's Let's Bounce! (airborne, slow). Immune for ?; Let's Bounce! takes 0.3 s to land, enough to react. (Zaahen R Grim Deliverance → Zac R Let's Bounce!)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Zac's Elastic Slingshot (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Zac E Elastic Slingshot)
- **0.47** cc immunity: Grim Deliverance makes Zaahen immune to Zac's Elastic Slingshot (airborne, stun). Immune for ?; Elastic Slingshot takes 1.33 s to land, enough to react. (Zaahen R Grim Deliverance → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Zaahen's Aureate Rush mid-dash.

#### 4. Udyr (net +1.64)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Zac's Elastic Slingshot (airborne, stun). Immune for 1.5 s, long enough to use ahead of Elastic Slingshot. (Udyr E Blazing Stampede → Zac E Elastic Slingshot)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Zac's Let's Bounce! (airborne, slow). Immune for 1.5 s, long enough to use ahead of Let's Bounce!. (Udyr E Blazing Stampede → Zac R Let's Bounce!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 1.5 s, long enough to use ahead of Stretching Strikes. (Udyr E Blazing Stampede → Zac Q Stretching Strikes)

#### 5. Rell (net +1.51)

- **0.50** interrupt: Shattering Strike's stun interrupts Zac's Elastic Slingshot (movement channel). Shattering Strike must land during the channel. (Rell Q Shattering Strike → Zac E Elastic Slingshot)
- **0.47** interrupt: Ferromancy: Crash Down's airborne interrupts Zac's Elastic Slingshot (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Zac E Elastic Slingshot)
- **0.47** interrupt: Ferromancy: Mount Up's airborne interrupts Zac's Elastic Slingshot (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Rell's Ferromancy: Crash Down mid-dash.

#### 6. Morgana (net +1.45)

- **0.80** cc immunity: Black Shield makes Morgana immune to Zac's Let's Bounce! (airborne, slow). Immune for 5 s, long enough to use ahead of Let's Bounce!. (Morgana E Black Shield → Zac R Let's Bounce!)
- **0.74** cc immunity: Black Shield makes Morgana immune to Zac's Elastic Slingshot (airborne, stun). Immune for 5 s, long enough to use ahead of Elastic Slingshot. (Morgana E Black Shield → Zac E Elastic Slingshot)
- **0.49** cc immunity: Black Shield makes Morgana immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 5 s, long enough to use ahead of Stretching Strikes. (Morgana E Black Shield → Zac Q Stretching Strikes)

#### 7. Alistar (net +1.43)

- **0.64** cleanse: Unbreakable Will cleanses Zac's Let's Bounce! (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Zac R Let's Bounce!)
- **0.47** interrupt: Pulverize's airborne interrupts Zac's Elastic Slingshot (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Zac E Elastic Slingshot)
- **0.47** interrupt: Trample's stun interrupts Zac's Elastic Slingshot (movement channel). Trample must land during the channel. (Alistar E Trample → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Alistar's Headbutt mid-dash.

#### 8. Milio (net +1.39)

- **0.47** interrupt: Ultra Mega Fire Kick's airborne interrupts Zac's Elastic Slingshot (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Zac E Elastic Slingshot)
- **0.35** cleanse: Breath of Life cleanses Zac's Elastic Slingshot (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Zac E Elastic Slingshot)
- **0.34** range: Milio's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Milio basic attacks → Zac basic attacks)

#### 9. Xayah (net +1.39)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.5 s, long enough to use ahead of Let's Bounce!. (Xayah R Featherstorm → Zac R Let's Bounce!)
- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.5 s, long enough to use ahead of Elastic Slingshot. (Xayah R Featherstorm → Zac E Elastic Slingshot)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Xayah basic attacks → Zac basic attacks)

#### 10. Lissandra (net +1.37)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Let's Bounce!. Untargetable for 2.5 s, long enough to use ahead of Let's Bounce!. (Lissandra R Frozen Tomb → Zac R Let's Bounce!)
- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Elastic Slingshot. Untargetable for 2.5 s, long enough to use ahead of Elastic Slingshot. (Lissandra R Frozen Tomb → Zac E Elastic Slingshot)
- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Zac's Stretching Strikes. Untargetable for 2.5 s, long enough to use ahead of Stretching Strikes. (Lissandra R Frozen Tomb → Zac Q Stretching Strikes)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +2.00 | 2.00 | 0.00 |  |
| 2 | Nocturne | +1.73 | 1.73 | 0.00 |  |
| 3 | Zaahen | +1.65 | 2.05 | 0.40 |  |
| 4 | Udyr | +1.64 | 1.64 | 0.00 |  |
| 5 | Rell | +1.51 | 2.14 | 0.63 |  |
| 6 | Morgana | +1.45 | 1.45 | 0.00 |  |
| 7 | Alistar | +1.43 | 1.83 | 0.40 |  |
| 8 | Milio | +1.39 | 1.39 | 0.00 |  |
| 9 | Xayah | +1.39 | 1.39 | 0.00 |  |
| 10 | Lissandra | +1.37 | 1.37 | 0.00 |  |
| 11 | Sivir | +1.37 | 1.37 | 0.00 |  |
| 12 | Shaco | +1.30 | 1.50 | 0.20 |  |
| 13 | Sion | +1.29 | 1.66 | 0.37 |  |
| 14 | Fizz | +1.24 | 1.81 | 0.57 |  |
| 15 | Rek'Sai | +1.23 | 1.63 | 0.40 |  |
| 16 | Vladimir | +1.22 | 1.44 | 0.22 |  |
| 17 | Blitzcrank | +1.21 | 1.21 | 0.00 |  |
| 18 | Heimerdinger | +1.21 | 1.21 | 0.00 |  |
| 19 | Singed | +1.17 | 1.17 | 0.00 | grounding (Mega Adhesive) |
| 20 | Bard | +1.15 | 1.45 | 0.30 |  |
| 21 | Fiora | +1.14 | 1.48 | 0.34 |  |
| 22 | Evelynn | +1.13 | 1.57 | 0.44 |  |
| 23 | Viktor | +1.13 | 1.13 | 0.00 | dash stop (Gravity Field) |
| 24 | Olaf | +1.12 | 1.12 | 0.00 |  |
| 25 | Anivia | +1.10 | 1.10 | 0.00 |  |
| 26 | Yasuo | +1.09 | 1.27 | 0.18 | projectile block (Wind Wall) |
| 27 | Gangplank | +1.06 | 1.06 | 0.00 |  |
| 28 | Lulu | +1.06 | 1.06 | 0.00 |  |
| 29 | Zed | +1.05 | 1.05 | 0.00 |  |
| 30 | Kled | +1.02 | 1.62 | 0.60 |  |
| 31 | Braum | +1.00 | 1.40 | 0.40 | projectile block (Unbreakable) |
| 32 | Cho'Gath | +1.00 | 1.00 | 0.00 |  |
| 33 | Garen | +0.98 | 0.98 | 0.00 |  |
| 34 | K'Sante | +0.96 | 1.36 | 0.40 |  |
| 35 | Vex | +0.96 | 0.96 | 0.00 |  |
| 36 | Renata Glasc | +0.95 | 0.95 | 0.00 |  |
| 37 | Nami | +0.94 | 0.94 | 0.00 |  |
| 38 | Master Yi | +0.93 | 1.50 | 0.57 |  |
| 39 | Camille | +0.92 | 1.62 | 0.70 |  |
| 40 | Cassiopeia | +0.92 | 0.92 | 0.00 | grounding (Miasma) |
| 41 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 42 | Seraphine | +0.92 | 0.92 | 0.00 |  |
| 43 | Hwei | +0.91 | 0.91 | 0.00 | dash stop (Grim Visage) |
| 44 | Gwen | +0.87 | 1.27 | 0.40 |  |
| 45 | Kalista | +0.87 | 1.09 | 0.22 |  |
| 46 | Teemo | +0.86 | 0.94 | 0.08 | blind (Blinding Dart) |
| 47 | Aurora | +0.85 | 1.34 | 0.49 |  |
| 48 | Veigar | +0.81 | 0.81 | 0.00 |  |
| 49 | Rengar | +0.80 | 1.19 | 0.39 |  |
| 50 | Zilean | +0.80 | 0.80 | 0.00 |  |
| 51 | Sett | +0.78 | 0.78 | 0.00 |  |
| 52 | Kennen | +0.74 | 0.74 | 0.00 |  |
| 53 | Jinx | +0.72 | 0.72 | 0.00 | dash stop (Flame Chompers!) |
| 54 | Brand | +0.71 | 0.71 | 0.00 |  |
| 55 | Annie | +0.69 | 0.69 | 0.00 |  |
| 56 | Zoe | +0.69 | 0.69 | 0.00 |  |
| 57 | Xin Zhao | +0.67 | 1.07 | 0.40 |  |
| 58 | Sejuani | +0.66 | 1.16 | 0.50 |  |
| 59 | Mel | +0.66 | 0.66 | 0.00 | projectile block (Rebuttal) |
| 60 | Yuumi | +0.65 | 1.85 | 1.20 |  |
| 61 | Yone | +0.65 | 1.00 | 0.35 |  |
| 62 | Swain | +0.65 | 0.65 | 0.00 |  |
| 63 | Malzahar | +0.64 | 1.81 | 1.17 |  |
| 64 | Jax | +0.64 | 0.98 | 0.34 | attack dodge (Counter Strike) |
| 65 | Gnar | +0.63 | 1.08 | 0.45 |  |
| 66 | Thresh | +0.62 | 1.13 | 0.51 |  |
| 67 | Sona | +0.62 | 0.62 | 0.00 |  |
| 68 | Soraka | +0.62 | 0.62 | 0.00 |  |
| 69 | Ashe | +0.61 | 0.61 | 0.00 |  |
| 70 | Vayne | +0.57 | 0.83 | 0.26 |  |
| 71 | Mordekaiser | +0.57 | 0.57 | 0.00 |  |
| 72 | Shyvana | +0.55 | 0.55 | 0.00 |  |
| 73 | Draven | +0.52 | 0.77 | 0.25 |  |
| 74 | Ahri | +0.51 | 0.86 | 0.35 | dash stop (Charm) |
| 75 | Elise | +0.51 | 0.77 | 0.26 |  |
| 76 | Kassadin | +0.50 | 0.50 | 0.00 |  |
| 77 | Malphite | +0.50 | 0.50 | 0.00 |  |
| 78 | Rammus | +0.49 | 1.22 | 0.73 |  |
| 79 | Aphelios | +0.48 | 0.48 | 0.00 |  |
| 80 | Jayce | +0.47 | 0.73 | 0.26 |  |
| 81 | Zyra | +0.47 | 0.47 | 0.00 |  |
| 82 | Orianna | +0.46 | 0.46 | 0.00 |  |
| 83 | Taric | +0.43 | 0.43 | 0.00 |  |
| 84 | Yorick | +0.43 | 0.43 | 0.00 |  |
| 85 | Nilah | +0.40 | 0.80 | 0.40 | attack dodge (Jubilant Veil) |
| 86 | Volibear | +0.38 | 0.63 | 0.25 |  |
| 87 | Skarner | +0.38 | 0.38 | 0.00 |  |
| 88 | Trundle | +0.38 | 0.38 | 0.00 |  |
| 89 | Darius | +0.37 | 0.37 | 0.00 |  |
| 90 | Syndra | +0.34 | 0.59 | 0.25 |  |
| 91 | Neeko | +0.33 | 0.44 | 0.11 |  |
| 92 | Leona | +0.32 | 0.75 | 0.43 |  |
| 93 | Urgot | +0.32 | 0.75 | 0.43 |  |
| 94 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 95 | Tristana | +0.29 | 0.59 | 0.30 |  |
| 96 | Twitch | +0.29 | 0.40 | 0.11 |  |
| 97 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 98 | Amumu | +0.28 | 0.78 | 0.50 |  |
| 99 | Samira | +0.28 | 0.69 | 0.41 | projectile block (Blade Whirl) |
| 100 | Aurelion Sol | +0.27 | 0.91 | 0.64 |  |
| 101 | Lux | +0.27 | 0.27 | 0.00 |  |
| 102 | Ziggs | +0.25 | 0.68 | 0.43 |  |
| 103 | Riven | +0.24 | 0.91 | 0.67 |  |
| 104 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 105 | Bel'Veth | +0.23 | 0.50 | 0.27 |  |
| 106 | Senna | +0.21 | 0.32 | 0.11 |  |
| 107 | Ornn | +0.19 | 0.89 | 0.70 |  |
| 108 | Aatrox | +0.19 | 0.50 | 0.31 |  |
| 109 | Karma | +0.19 | 0.19 | 0.00 |  |
| 110 | Kayn | +0.14 | 1.62 | 1.48 |  |
| 111 | Irelia | +0.13 | 0.47 | 0.34 |  |
| 112 | Varus | +0.12 | 0.39 | 0.27 |  |
| 113 | Smolder | +0.12 | 0.30 | 0.18 |  |
| 114 | Kindred | +0.11 | 0.41 | 0.30 |  |
| 115 | Zeri | +0.11 | 0.41 | 0.30 |  |
| 116 | Hecarim | +0.11 | 0.31 | 0.20 |  |
| 117 | Renekton | +0.10 | 0.50 | 0.40 |  |
| 118 | Rakan | +0.09 | 0.79 | 0.70 |  |
| 119 | Azir | +0.09 | 0.46 | 0.37 |  |
| 120 | Yunara | +0.06 | 0.36 | 0.30 |  |
| 121 | Corki | 0.00 | 0.30 | 0.30 |  |
| 122 | Lillia | 0.00 | 0.30 | 0.30 |  |
| 123 | Nidalee | 0.00 | 0.26 | 0.26 |  |
| 124 | Illaoi | 0.00 | 0.16 | 0.16 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 127 | Quinn | -0.03 | 0.84 | 0.87 |  |
| 128 | Poppy | -0.04 | 0.86 | 0.90 | dash stop (Steadfast Presence) |
| 129 | Tahm Kench | -0.06 | 1.20 | 1.26 |  |
| 130 | Warwick | -0.07 | 1.78 | 1.85 |  |
| 131 | Kai'Sa | -0.07 | 0.34 | 0.41 |  |
| 132 | Ambessa | -0.09 | 0.23 | 0.32 |  |
| 133 | Vel'Koz | -0.12 | 0.70 | 0.82 |  |
| 134 | Jarvan IV | -0.13 | 0.31 | 0.44 |  |
| 135 | Twisted Fate | -0.17 | 0.88 | 1.05 |  |
| 136 | Diana | -0.17 | 0.23 | 0.40 |  |
| 137 | Nautilus | -0.17 | 0.23 | 0.40 |  |
| 138 | Viego | -0.18 | 0.81 | 0.99 |  |
| 139 | Gragas | -0.19 | 0.67 | 0.86 |  |
| 140 | Fiddlesticks | -0.22 | 1.08 | 1.30 |  |
| 141 | LeBlanc | -0.22 | 0.19 | 0.41 |  |
| 142 | Janna | -0.24 | 0.96 | 1.20 |  |
| 143 | Xerath | -0.27 | 0.68 | 0.95 |  |
| 144 | Pyke | -0.30 | 0.95 | 1.25 |  |
| 145 | Graves | -0.30 | 0.20 | 0.50 |  |
| 146 | Sylas | -0.31 | 0.47 | 0.78 |  |
| 147 | Taliyah | -0.34 | 1.34 | 1.68 |  |
| 148 | Lee Sin | -0.34 | 0.25 | 0.59 |  |
| 149 | Briar | -0.37 | 0.23 | 0.60 |  |
| 150 | Ekko | -0.37 | 0.00 | 0.37 |  |
| 151 | Qiyana | -0.38 | 0.22 | 0.60 |  |
| 152 | Shen | -0.40 | 1.23 | 1.63 | attack block (Spirit's Refuge) |
| 153 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 154 | Wukong | -0.41 | 0.23 | 0.64 |  |
| 155 | Vi | -0.45 | 0.81 | 1.26 |  |
| 156 | Talon | -0.50 | 0.00 | 0.50 |  |
| 157 | Kha'Zix | -0.51 | 0.00 | 0.51 |  |
| 158 | Miss Fortune | -0.54 | 0.30 | 0.84 |  |
| 159 | Ivern | -0.57 | 0.16 | 0.73 |  |
| 160 | Jhin | -0.59 | 0.25 | 0.84 |  |
| 161 | Katarina | -0.63 | 0.12 | 0.75 |  |
| 162 | Caitlyn | -0.64 | 0.36 | 1.00 |  |
| 163 | Locke | -0.65 | 0.00 | 0.65 |  |
| 164 | Galio | -0.68 | 1.11 | 1.79 |  |
| 165 | Karthus | -0.68 | 0.16 | 0.84 |  |
| 166 | Akali | -0.68 | 0.00 | 0.68 |  |
| 167 | Lucian | -0.69 | 0.31 | 1.00 |  |
| 168 | Akshan | -0.71 | 0.29 | 1.00 |  |
| 169 | Nunu & Willump | -0.81 | 0.54 | 1.35 |  |
| 170 | Ryze | -0.83 | 0.22 | 1.05 |  |
| 171 | Pantheon | -1.03 | 0.63 | 1.66 |  |
| 172 | Naafiri | -1.64 | 0.00 | 1.64 |  |
