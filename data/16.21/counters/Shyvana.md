# Counters to Shyvana (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Shyvana: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Shyvana wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Shyvana --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.60 | +1.00 | −0.08 |
| 2 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.51 |
| 3 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.28 |
| 4 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.17 |
| 5 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.12 | – | +1.00 |
| 6 | Sivir | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.38 |
| 7 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.46 |
| 8 | Yasuo | +0.77 | +0.93 | +0.92 | +0.93 | +0.11 | – | +0.64 |
| 9 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.30 |
| 10 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.55 |
| 11 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.09 |
| 12 | Illaoi | +0.76 | +1.00 | +1.00 | +0.97 | −0.00 | – | −0.22 |
| 13 | Lulu | +0.61 | +1.00 | +1.00 | +1.00 | +0.15 | −1.00 | −0.17 |
| 14 | Dr. Mundo | +0.33 | +0.96 | +0.96 | −1.00 | −0.02 | – | +0.35 |
| 15 | Olaf | +0.32 | +1.00 | +1.00 | −1.00 | −0.11 | – | +0.05 |
| 16 | Zaahen | +0.25 | −0.28 | +0.46 | +1.00 | −0.06 | – | −0.20 |
| 17 | Gangplank | +0.25 | +1.00 | −1.00 | +0.83 | +0.28 | – | +0.36 |
| 18 | Yorick | +0.25 | +1.00 | −1.00 | +1.00 | −0.06 | – | +0.57 |
| 19 | Kog'Maw | +0.24 | +0.00 | +1.00 | +0.00 | +0.09 | +0.00 | −0.47 |
| 20 | Elise | +0.22 | +1.00 | +1.00 | −1.00 | +0.14 | −1.00 | −0.10 |
| 21 | Quinn | +0.12 | +1.00 | +0.00 | −1.00 | +0.10 | +1.00 | −0.96 |
| 22 | Yunara | +0.11 | +0.85 | +0.82 | −1.00 | +0.22 | −1.00 | −0.79 |
| 23 | Vayne | +0.10 | −0.46 | +1.00 | −1.00 | +0.18 | +1.00 | +0.84 |
| 24 | Sion | +0.01 | +0.00 | +0.00 | +0.00 | −0.05 | – | +0.40 |
| 25 | Karma | −0.12 | −0.60 | −0.24 | +0.94 | +0.02 | −0.87 | −0.37 |
| 26 | Mordekaiser | −0.13 | −1.00 | +0.47 | +0.55 | −0.03 | −1.00 | −0.03 |
| 27 | Morgana | −0.16 | +0.85 | −0.34 | −0.97 | +0.17 | −0.98 | −0.33 |
| 28 | Anivia | −0.22 | +0.21 | −0.29 | −1.00 | −0.09 | +0.21 | −0.22 |
| 29 | Annie | −0.28 | −1.00 | −0.72 | +1.00 | +0.20 | −0.88 | +0.11 |
| 30 | Hwei | −0.32 | +0.65 | −1.00 | −0.72 | +0.09 | −1.00 | +0.02 |
| 31 | Heimerdinger | −0.41 | −1.00 | −1.00 | +1.00 | +0.16 | −1.00 | −0.61 |
| 32 | Corki | −0.50 | −1.00 | +0.28 | −1.00 | +0.07 | −1.00 | −0.70 |
| 33 | Milio | −0.52 | −1.00 | −1.00 | +0.37 | +0.29 | −1.00 | −0.80 |
| 34 | Nilah | −0.53 | −1.00 | −1.00 | +0.00 | +0.14 | – | +0.11 |
| 35 | Jax | −0.53 | −0.67 | −0.49 | −1.00 | +0.00 | – | +0.21 |
| 36 | Ambessa | −0.56 | −1.00 | −1.00 | −1.00 | +0.17 | +1.00 | +0.32 |
| 37 | Malphite | −0.58 | −1.00 | −1.00 | −1.00 | +0.04 | +1.00 | +0.33 |
| 38 | Jayce | −0.59 | −1.00 | −1.00 | −1.00 | +0.14 | +1.00 | −0.14 |
| 39 | Tahm Kench | −0.59 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | −0.14 |
| 40 | Zeri | −0.59 | −1.00 | −1.00 | −1.00 | +0.04 | +1.00 | +0.00 |
| 41 | Warwick | −0.60 | −1.00 | −1.00 | −1.00 | −0.00 | +1.00 | +0.03 |
| 42 | Alistar | −0.61 | −1.00 | −1.00 | −1.00 | −0.04 | +1.00 | −0.04 |
| 43 | Gnar | −0.63 | −1.00 | −1.00 | −1.00 | +0.18 | +0.33 | +0.27 |
| 44 | Kalista | −0.63 | −1.00 | −1.00 | −1.00 | +0.00 | +1.00 | −0.65 |
| 45 | Rammus | −0.64 | −1.00 | −1.00 | −1.00 | −0.25 | +1.00 | −0.06 |
| 46 | Udyr | −0.67 | −0.89 | −1.00 | −0.73 | −0.20 | – | +0.91 |
| 47 | Irelia | −0.68 | −1.00 | −1.00 | −1.00 | +0.15 | +0.23 | −0.47 |
| 48 | Poppy | −0.71 | −1.00 | −1.00 | −1.00 | +0.29 | – | +0.40 |
| 49 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.30 | – | −0.09 |
| 50 | Rell | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | −0.32 | −0.40 |
| 51 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.52 | −1.00 | −0.43 |
| 52 | Master Yi | −0.74 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.66 |
| 53 | Kennen | −0.75 | −1.00 | −1.00 | −1.00 | −0.07 | −0.46 | +0.21 |
| 54 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.19 |
| 55 | Xayah | −0.75 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.28 |
| 56 | Kha'Zix | −0.76 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.49 |
| 57 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.14 |
| 58 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.23 |
| 59 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.18 | – | −0.27 |
| 60 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.20 |
| 61 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.41 |
| 62 | Gwen | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.28 |
| 63 | Azir | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.27 |
| 64 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.53 |
| 65 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.41 |
| 66 | Rakan | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.49 |
| 67 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.26 |
| 68 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.41 |
| 69 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.36 |
| 70 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.22 |
| 71 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.29 |
| 72 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.28 |
| 73 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.21 |
| 74 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.04 |
| 75 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.27 |
| 76 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.16 |
| 77 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.11 |
| 78 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.31 |
| 79 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.35 |
| 80 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.01 |
| 81 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.28 |
| 82 | Nocturne | −0.79 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.25 |
| 83 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.02 |
| 84 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.17 |
| 85 | Wukong | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.42 |
| 86 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.28 |
| 87 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.17 |
| 88 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.08 |
| 89 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.15 |
| 90 | Ziggs | −0.80 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.81 |
| 91 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.27 |
| 92 | Volibear | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.08 |
| 93 | Taric | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.25 |
| 94 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.00 |
| 95 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.39 |
| 96 | Cho'Gath | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.65 |
| 97 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.26 |
| 98 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.55 |
| 99 | Lee Sin | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.32 |
| 100 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.33 |
| 101 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.57 |
| 102 | Zac | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.19 |
| 103 | Swain | −0.80 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.39 |
| 104 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.44 |
| 105 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.65 |
| 106 | Darius | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.45 |
| 107 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.45 |
| 108 | Kled | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.30 |
| 109 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.56 |
| 110 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.04 |
| 111 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.17 |
| 112 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.17 |
| 113 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.44 |
| 114 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.12 |
| 115 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.52 |
| 116 | Aphelios | −0.81 | −1.00 | −0.94 | −1.00 | +0.13 | −1.00 | −0.85 |
| 117 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.52 |
| 118 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.32 |
| 119 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.61 |
| 120 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.35 |
| 121 | Xin Zhao | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.47 |
| 122 | Vel'Koz | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.35 |
| 123 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.74 |
| 124 | Senna | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.53 |
| 125 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.82 |
| 126 | Yone | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.36 |
| 127 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.33 |
| 128 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.35 |
| 129 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −0.97 | −0.05 |
| 130 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.47 |
| 131 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.47 |
| 132 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.58 |
| 133 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.92 |
| 134 | Jinx | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.58 |
| 135 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.77 |
| 136 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.35 |
| 137 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.72 |
| 138 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.69 |
| 139 | Briar | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.54 |
| 140 | Twisted Fate | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.79 |
| 141 | Braum | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.29 |
| 142 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.58 |
| 143 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.71 |
| 144 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.70 |
| 145 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.65 |
| 146 | Bel'Veth | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.89 |
| 147 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.71 |
| 148 | Zilean | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.64 |
| 149 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.19 |
| 150 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.20 |
| 151 | Janna | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.99 |
| 152 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.89 |
| 153 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.54 |
| 154 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.80 |
| 155 | Fizz | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.27 |
| 156 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 157 | Skarner | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.60 |
| 158 | Lux | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.76 |
| 159 | Nami | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.99 |
| 160 | Tristana | −0.84 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.72 |
| 161 | Ezreal | −0.84 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.72 |
| 162 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.79 |
| 163 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.91 |
| 164 | Samira | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.72 |
| 165 | Draven | −0.84 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.87 |
| 166 | LeBlanc | −0.85 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.80 |
| 167 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.88 |
| 168 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.64 |
| 169 | Talon | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.63 |
| 170 | Katarina | −0.87 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.67 |
| 171 | Kai'Sa | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.97 |
| 172 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.79 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Shyvana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Shyvana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Shyvana` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.17)

- **0.73** spell shield: Spell Shield's spell shield blocks Shyvana's Dragon's Descent. Spell shield for 1.5 s, long enough to use ahead of Dragon's Descent. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Shyvana R Dragon's Descent)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Shyvana's (500 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Sivir basic attacks → Shyvana basic attacks)

#### 2. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Shyvana's Dragon's Descent (fear, slow). Immune for 1.5 s, long enough to use ahead of Dragon's Descent. (Udyr E Blazing Stampede → Shyvana R Dragon's Descent)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Shyvana's Molten Burst (slow). Immune for 1.5 s, long enough to use ahead of Molten Burst. (Udyr E Blazing Stampede → Shyvana E Molten Burst)

#### 3. Fizz (net +1.04)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 0.75 s; Dragon's Descent takes 0.25 s to land, enough to react. (Fizz E Playful → Shyvana R Dragon's Descent)
- **0.23** untargetable: Playful makes Fizz untargetable, dodging Shyvana's Emberstrike. Untargetable for 0.75 s; Emberstrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Shyvana Q Emberstrike)
- Watch out: Dragon's Descent is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

#### 4. Maokai (net +1.04)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 1.4 s; Dragon's Descent takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Shyvana R Dragon's Descent)
- **0.21** untargetable: Twisted Advance makes Maokai untargetable, dodging Shyvana's Emberstrike. Untargetable for 1.4 s; Emberstrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Shyvana Q Emberstrike)
- Watch out: Dragon's Descent is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 5. Yuumi (net +1.03)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Shyvana's Dragon's Descent. Untargetable for ?; Dragon's Descent takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Shyvana R Dragon's Descent)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Shyvana's (425 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Yuumi basic attacks → Shyvana basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Shyvana's Emberstrike. Untargetable for ?; Emberstrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Shyvana Q Emberstrike)
- Watch out: Dragon's Descent's fear interrupts Yuumi's Final Chapter (normal channel).

#### 6. Vladimir (net +1.00)

- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 2 s, long enough to use ahead of Dragon's Descent. (Vladimir W Sanguine Pool → Shyvana R Dragon's Descent)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Shyvana's Emberstrike. Untargetable for 2 s, long enough to use ahead of Emberstrike. (Vladimir W Sanguine Pool → Shyvana Q Emberstrike)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Shyvana's (450 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Vladimir basic attacks → Shyvana basic attacks)
- Watch out: Dragon's Descent's fear interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Morgana (net +1.00)

- **0.78** cc immunity: Black Shield makes Morgana immune to Shyvana's Dragon's Descent (fear, slow). Immune for 5 s, long enough to use ahead of Dragon's Descent. (Morgana E Black Shield → Shyvana R Dragon's Descent)
- **0.18** range: Morgana's basic attacks reach 300 units farther than Shyvana's (450 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Morgana basic attacks → Shyvana basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Shyvana's Molten Burst (slow). Immune for 5 s, long enough to use ahead of Molten Burst. (Morgana E Black Shield → Shyvana E Molten Burst)

#### 8. Fiora (net +0.98)

- **0.88** parry: Riposte parries Shyvana's Dragon's Descent and stuns back. Parry for 0.75 s; Dragon's Descent takes 0.25 s to land, enough to react. Negating Dragon's Descent's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Shyvana R Dragon's Descent)
- **0.17** parry: Riposte parries Shyvana's Emberstrike. Parry for 0.75 s; Emberstrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Shyvana Q Emberstrike)
- **0.07** attack speed slow: Riposte cuts Shyvana's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Shyvana basic attacks)

#### 9. Xayah (net +0.92)

- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Shyvana's Dragon's Descent. Untargetable for 1.5 s, long enough to use ahead of Dragon's Descent. (Xayah R Featherstorm → Shyvana R Dragon's Descent)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Shyvana's (525 vs 150 attack range). Shyvana closes the gap with Dragon's Descent. (Xayah basic attacks → Shyvana basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Shyvana's Emberstrike. Untargetable for 1.5 s, long enough to use ahead of Emberstrike. (Xayah R Featherstorm → Shyvana Q Emberstrike)

#### 10. Nocturne (net +0.90)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Shyvana's Dragon's Descent. Spell shield for 1.5 s, long enough to use ahead of Dragon's Descent. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Shyvana R Dragon's Descent)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 2 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 3 | Fizz | +1.04 | 1.12 | 0.08 |  |
| 4 | Maokai | +1.04 | 1.11 | 0.07 |  |
| 5 | Yuumi | +1.03 | 1.44 | 0.41 |  |
| 6 | Vladimir | +1.00 | 1.08 | 0.08 |  |
| 7 | Morgana | +1.00 | 1.00 | 0.00 |  |
| 8 | Fiora | +0.98 | 0.98 | 0.00 |  |
| 9 | Xayah | +0.92 | 0.92 | 0.00 |  |
| 10 | Nocturne | +0.90 | 0.90 | 0.00 |  |
| 11 | Bard | +0.84 | 0.92 | 0.08 |  |
| 12 | Rengar | +0.84 | 0.84 | 0.00 |  |
| 13 | Aurora | +0.81 | 0.81 | 0.00 |  |
| 14 | Gwen | +0.81 | 0.81 | 0.00 |  |
| 15 | Milio | +0.80 | 0.87 | 0.07 |  |
| 16 | Master Yi | +0.75 | 0.98 | 0.23 |  |
| 17 | Lissandra | +0.75 | 0.80 | 0.05 |  |
| 18 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 19 | Gangplank | +0.70 | 0.70 | 0.00 |  |
| 20 | Kayle | +0.70 | 0.70 | 0.00 |  |
| 21 | Teemo | +0.70 | 0.70 | 0.00 |  |
| 22 | Singed | +0.69 | 0.76 | 0.07 | grounding (Mega Adhesive) |
| 23 | Lulu | +0.55 | 0.63 | 0.08 |  |
| 24 | Evelynn | +0.54 | 0.54 | 0.00 |  |
| 25 | Shaco | +0.54 | 0.54 | 0.00 |  |
| 26 | Mel | +0.53 | 0.53 | 0.00 |  |
| 27 | Garen | +0.52 | 0.52 | 0.00 |  |
| 28 | Zed | +0.52 | 0.52 | 0.00 |  |
| 29 | Aphelios | +0.51 | 0.51 | 0.00 |  |
| 30 | Olaf | +0.51 | 0.51 | 0.00 |  |
| 31 | Kalista | +0.49 | 0.68 | 0.19 |  |
| 32 | Samira | +0.47 | 0.56 | 0.09 |  |
| 33 | Kindred | +0.44 | 0.44 | 0.00 |  |
| 34 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 35 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 36 | Rek'Sai | +0.42 | 0.58 | 0.16 |  |
| 37 | Sona | +0.41 | 0.41 | 0.00 |  |
| 38 | Camille | +0.38 | 0.53 | 0.15 |  |
| 39 | Braum | +0.37 | 0.45 | 0.08 | projectile block (Unbreakable) |
| 40 | Vayne | +0.36 | 0.43 | 0.07 |  |
| 41 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 42 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 43 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 44 | Kled | +0.34 | 0.58 | 0.24 |  |
| 45 | Sion | +0.34 | 0.53 | 0.19 |  |
| 46 | Varus | +0.34 | 0.45 | 0.11 |  |
| 47 | Zaahen | +0.33 | 0.51 | 0.18 |  |
| 48 | Heimerdinger | +0.33 | 0.33 | 0.00 |  |
| 49 | Corki | +0.32 | 0.32 | 0.00 |  |
| 50 | Elise | +0.32 | 0.32 | 0.00 |  |
| 51 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 52 | Senna | +0.32 | 0.32 | 0.00 |  |
| 53 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 54 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 55 | Renata Glasc | +0.31 | 0.38 | 0.07 |  |
| 56 | Jax | +0.31 | 0.31 | 0.00 |  |
| 57 | Malzahar | +0.29 | 0.72 | 0.43 |  |
| 58 | Draven | +0.29 | 0.36 | 0.07 |  |
| 59 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 60 | Lux | +0.29 | 0.29 | 0.00 |  |
| 61 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 62 | Alistar | +0.28 | 0.40 | 0.12 |  |
| 63 | Nilah | +0.28 | 0.36 | 0.08 |  |
| 64 | Tristana | +0.28 | 0.36 | 0.08 |  |
| 65 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 66 | Mordekaiser | +0.27 | 0.41 | 0.14 |  |
| 67 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 68 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 69 | Viktor | +0.26 | 0.30 | 0.04 |  |
| 70 | Zoe | +0.25 | 0.32 | 0.07 |  |
| 71 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 72 | Vex | +0.24 | 0.27 | 0.03 |  |
| 73 | Gnar | +0.23 | 0.31 | 0.08 |  |
| 74 | Jinx | +0.23 | 0.27 | 0.04 |  |
| 75 | Annie | +0.22 | 0.22 | 0.00 |  |
| 76 | Brand | +0.22 | 0.22 | 0.00 |  |
| 77 | Graves | +0.22 | 0.22 | 0.00 |  |
| 78 | Jayce | +0.21 | 0.28 | 0.07 |  |
| 79 | Karma | +0.21 | 0.21 | 0.00 |  |
| 80 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 81 | Veigar | +0.20 | 0.24 | 0.04 |  |
| 82 | Ahri | +0.18 | 0.22 | 0.04 |  |
| 83 | Orianna | +0.17 | 0.25 | 0.08 |  |
| 84 | Hwei | +0.16 | 0.23 | 0.07 |  |
| 85 | Xin Zhao | +0.15 | 0.33 | 0.18 |  |
| 86 | Syndra | +0.15 | 0.22 | 0.07 |  |
| 87 | Skarner | +0.15 | 0.15 | 0.00 |  |
| 88 | Neeko | +0.14 | 0.22 | 0.08 |  |
| 89 | Swain | +0.13 | 0.20 | 0.07 |  |
| 90 | Quinn | +0.12 | 0.36 | 0.24 |  |
| 91 | Ziggs | +0.10 | 0.27 | 0.17 |  |
| 92 | Anivia | +0.10 | 0.24 | 0.14 |  |
| 93 | Azir | +0.09 | 0.25 | 0.16 |  |
| 94 | Aurelion Sol | +0.09 | 0.22 | 0.13 |  |
| 95 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 96 | Zyra | +0.08 | 0.24 | 0.16 |  |
| 97 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 98 | Kayn | +0.05 | 0.54 | 0.49 |  |
| 99 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 100 | Thresh | +0.05 | 0.18 | 0.13 |  |
| 101 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 102 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 103 | Nami | +0.04 | 0.22 | 0.18 |  |
| 104 | Urgot | +0.04 | 0.13 | 0.09 |  |
| 105 | Yasuo | +0.03 | 0.31 | 0.28 |  |
| 106 | Ivern | +0.03 | 0.18 | 0.15 |  |
| 107 | Lillia | +0.02 | 0.10 | 0.08 |  |
| 108 | Pantheon | +0.01 | 0.51 | 0.50 |  |
| 109 | Akali | 0.00 | 0.00 | 0.00 |  |
| 110 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 111 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 112 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 113 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 114 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 115 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 116 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 117 | Leona | 0.00 | 0.00 | 0.00 |  |
| 118 | Locke | 0.00 | 0.00 | 0.00 |  |
| 119 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 120 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 121 | Talon | 0.00 | 0.00 | 0.00 |  |
| 122 | Taric | 0.00 | 0.00 | 0.00 |  |
| 123 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 124 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 125 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 126 | Malphite | -0.01 | 0.19 | 0.20 |  |
| 127 | Rammus | -0.04 | 0.29 | 0.33 |  |
| 128 | Amumu | -0.05 | 0.00 | 0.05 |  |
| 129 | Briar | -0.05 | 0.00 | 0.05 |  |
| 130 | Vel'Koz | -0.07 | 0.25 | 0.32 |  |
| 131 | Xerath | -0.07 | 0.25 | 0.32 |  |
| 132 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 133 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 134 | Darius | -0.07 | 0.00 | 0.07 |  |
| 135 | Sett | -0.07 | 0.00 | 0.07 |  |
| 136 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Hecarim | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 141 | Rakan | -0.09 | 0.11 | 0.20 |  |
| 142 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 143 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 144 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 145 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 146 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 147 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 148 | Warwick | -0.15 | 0.52 | 0.67 |  |
| 149 | Janna | -0.16 | 0.36 | 0.52 |  |
| 150 | Shen | -0.16 | 0.29 | 0.45 |  |
| 151 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 152 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 153 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 154 | K'Sante | -0.17 | 0.00 | 0.17 |  |
| 155 | Nunu & Willump | -0.18 | 0.33 | 0.51 |  |
| 156 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 157 | Pyke | -0.19 | 0.00 | 0.19 |  |
| 158 | Riven | -0.20 | 0.00 | 0.20 |  |
| 159 | Rell | -0.24 | 0.00 | 0.24 |  |
| 160 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 161 | Yone | -0.25 | 0.00 | 0.25 |  |
| 162 | Fiddlesticks | -0.27 | 0.18 | 0.45 |  |
| 163 | Gragas | -0.27 | 0.00 | 0.27 |  |
| 164 | Viego | -0.27 | 0.00 | 0.27 |  |
| 165 | Jarvan IV | -0.28 | 0.00 | 0.28 |  |
| 166 | Poppy | -0.30 | 0.00 | 0.30 |  |
| 167 | Taliyah | -0.37 | 0.25 | 0.62 |  |
| 168 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 169 | Vi | -0.51 | 0.00 | 0.51 |  |
| 170 | Zac | -0.55 | 0.00 | 0.55 |  |
| 171 | Tahm Kench | -0.58 | 0.00 | 0.58 |  |
| 172 | Galio | -0.67 | 0.00 | 0.67 |  |
