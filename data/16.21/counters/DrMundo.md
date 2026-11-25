# Counters to Dr. Mundo (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Dr. Mundo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Dr. Mundo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> DrMundo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.15 |
| 2 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.10 |
| 3 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.03 |
| 4 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.33 |
| 5 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.28 |
| 6 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.15 |
| 7 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.17 |
| 8 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.55 |
| 9 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.48 |
| 10 | Olaf | +0.75 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.43 |
| 11 | Yorick | +0.38 | +0.30 | +0.24 | +1.00 | −0.01 | – | +0.19 |
| 12 | Ashe | +0.28 | +0.59 | +0.98 | −0.99 | +0.05 | +1.00 | −0.38 |
| 13 | Zac | +0.21 | +0.27 | +0.25 | +0.25 | +0.06 | – | −0.02 |
| 14 | Gnar | +0.05 | −0.17 | −0.12 | +0.65 | +0.05 | −0.03 | −0.24 |
| 15 | Taric | −0.01 | −0.04 | −0.02 | −0.01 | +0.12 | – | −0.21 |
| 16 | Anivia | −0.17 | −0.20 | −0.23 | −0.15 | −0.05 | −0.25 | −0.10 |
| 17 | Ivern | −0.19 | −0.41 | −0.16 | −0.09 | +0.03 | −0.11 | −0.48 |
| 18 | Maokai | −0.23 | −0.29 | −0.33 | −0.27 | +0.12 | – | −0.31 |
| 19 | Tahm Kench | −0.24 | −0.28 | −0.28 | −0.31 | −0.01 | – | −0.16 |
| 20 | Lillia | −0.28 | −0.38 | −0.28 | −0.64 | +0.10 | −0.07 | +0.12 |
| 21 | Zeri | −0.32 | −0.33 | −0.28 | −0.89 | −0.01 | +0.21 | −0.11 |
| 22 | Shyvana | −0.33 | −0.96 | −0.96 | +1.00 | +0.02 | – | −0.35 |
| 23 | Udyr | −0.43 | −0.57 | −0.30 | −0.93 | +0.04 | – | +0.27 |
| 24 | Karma | −0.48 | −0.62 | −0.41 | −0.96 | +0.07 | −0.40 | −0.09 |
| 25 | Mordekaiser | −0.60 | −1.00 | −0.94 | −0.29 | +0.03 | – | −0.07 |
| 26 | Kled | −0.60 | −0.75 | −0.93 | −0.74 | +0.22 | – | −0.15 |
| 27 | Aurora | −0.61 | −0.56 | −0.94 | −0.75 | +0.07 | −0.90 | −0.09 |
| 28 | Kalista | −0.64 | −0.95 | −0.80 | −0.97 | +0.10 | −0.09 | −0.37 |
| 29 | Sion | −0.65 | −1.00 | −0.59 | −1.00 | +0.05 | – | +0.12 |
| 30 | Lulu | −0.72 | −0.99 | −0.97 | −0.73 | +0.08 | −1.00 | −0.01 |
| 31 | Ambessa | −0.73 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.27 |
| 32 | Malphite | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.10 |
| 33 | Jayce | −0.74 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.11 |
| 34 | Yasuo | −0.74 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.16 |
| 35 | Master Yi | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.30 |
| 36 | Kassadin | −0.75 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.17 |
| 37 | Nocturne | −0.75 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.36 |
| 38 | Wukong | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.04 |
| 39 | Lee Sin | −0.76 | −1.00 | −0.87 | −1.00 | +0.01 | – | −0.26 |
| 40 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.16 |
| 41 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.19 | – | −0.25 |
| 42 | Singed | −0.76 | −1.00 | −0.91 | −1.00 | −0.04 | – | −0.04 |
| 43 | Morgana | −0.76 | −1.00 | −0.88 | −1.00 | +0.09 | −1.00 | −0.16 |
| 44 | Kayn | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 45 | Poppy | −0.77 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.23 |
| 46 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.14 |
| 47 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.21 |
| 48 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.02 |
| 49 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.06 |
| 50 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.15 |
| 51 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.07 |
| 52 | Yone | −0.77 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.34 |
| 53 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.20 |
| 54 | Trundle | −0.77 | −1.00 | −0.99 | −1.00 | +0.01 | – | +0.02 |
| 55 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.14 |
| 56 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.09 |
| 57 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.09 |
| 58 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.01 |
| 59 | Kayle | −0.78 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.05 |
| 60 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.31 |
| 61 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.11 |
| 62 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.25 |
| 63 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.18 |
| 64 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.33 |
| 65 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.36 |
| 66 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.16 |
| 67 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.08 |
| 68 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.28 |
| 69 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.20 |
| 70 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.07 |
| 71 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.04 |
| 72 | Sivir | −0.78 | −1.00 | −0.99 | −1.00 | +0.08 | −1.00 | +0.09 |
| 73 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.01 |
| 74 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.20 |
| 75 | Rengar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.02 |
| 76 | Renekton | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.33 |
| 77 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.12 |
| 78 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.20 |
| 79 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.21 |
| 80 | Hwei | −0.79 | −1.00 | −1.00 | −0.98 | +0.06 | −0.89 | −0.20 |
| 81 | Milio | −0.79 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.23 |
| 82 | Vi | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.25 |
| 83 | Nilah | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.01 |
| 84 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.14 |
| 85 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.09 |
| 86 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.19 |
| 87 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.14 |
| 88 | Tryndamere | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.07 |
| 89 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.13 |
| 90 | Illaoi | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.28 |
| 91 | Vel'Koz | −0.79 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.33 |
| 92 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.25 |
| 93 | Zilean | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −0.89 | −0.21 |
| 94 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.21 |
| 95 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.02 |
| 96 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 97 | Fizz | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.25 |
| 98 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.19 |
| 99 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.46 |
| 100 | Annie | −0.80 | −0.99 | −0.99 | −1.00 | +0.10 | −1.00 | −0.31 |
| 101 | Teemo | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.21 |
| 102 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.40 |
| 103 | Cho'Gath | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.49 |
| 104 | Jax | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.21 |
| 105 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.34 |
| 106 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.33 |
| 107 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 108 | Bel'Veth | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.66 |
| 109 | Twisted Fate | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.29 |
| 110 | Neeko | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.18 |
| 111 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.30 |
| 112 | Volibear | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.31 |
| 113 | Aurelion Sol | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.15 |
| 114 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.23 |
| 115 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.21 |
| 116 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.18 |
| 117 | Nunu & Willump | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.32 |
| 118 | Jinx | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.43 |
| 119 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.44 |
| 120 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.37 |
| 121 | Bard | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.25 |
| 122 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.30 |
| 123 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.34 |
| 124 | Ezreal | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.23 |
| 125 | Janna | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.41 |
| 126 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.39 |
| 127 | Garen | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.41 |
| 128 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.22 |
| 129 | Lux | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.40 |
| 130 | Corki | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.27 |
| 131 | Kog'Maw | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.47 |
| 132 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.44 |
| 133 | Xin Zhao | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.48 |
| 134 | Soraka | −0.81 | −0.98 | −0.99 | −0.99 | −0.01 | −1.00 | −0.35 |
| 135 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.39 |
| 136 | Heimerdinger | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.34 |
| 137 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.36 |
| 138 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.33 |
| 139 | Draven | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.43 |
| 140 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.37 |
| 141 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.23 |
| 142 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.35 |
| 143 | Yunara | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.48 |
| 144 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.45 |
| 145 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.37 |
| 146 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.68 |
| 147 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.61 |
| 148 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.44 |
| 149 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.49 |
| 150 | Brand | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.50 |
| 151 | Nami | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.49 |
| 152 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.37 |
| 153 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.44 |
| 154 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.56 |
| 155 | Aphelios | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.65 |
| 156 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.35 |
| 157 | Elise | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.65 |
| 158 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.58 |
| 159 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.48 |
| 160 | Smolder | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.59 |
| 161 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.32 |
| 162 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.58 |
| 163 | Quinn | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.69 |
| 164 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.58 |
| 165 | Tristana | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.34 |
| 166 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.80 |
| 167 | Varus | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.55 |
| 168 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.48 |
| 169 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.62 |
| 170 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.60 |
| 171 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.43 |
| 172 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.11 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Dr. Mundo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Dr. Mundo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> DrMundo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +1.26)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Teemo basic attacks → Dr. Mundo basic attacks)
- **0.43** blind: Blinding Dart's blind makes Dr. Mundo's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Dr. Mundo basic attacks)
- **0.30** blind: Blinding Dart's blind makes Dr. Mundo's Blunt Force Trauma, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Dr. Mundo E Blunt Force Trauma)

#### 2. Lulu (net +1.02)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Lulu basic attacks → Dr. Mundo basic attacks)
- **0.30** disarm: Whimsy disarms Dr. Mundo for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Dr. Mundo basic attacks)

#### 3. Xayah (net +0.97)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Dr. Mundo's (525 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Xayah basic attacks → Dr. Mundo basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for 1.5 s, long enough to use ahead of Blunt Force Trauma. (Xayah R Featherstorm → Dr. Mundo E Blunt Force Trauma)

#### 4. Kindred (net +0.94)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Kindred basic attacks → Dr. Mundo basic attacks)

#### 5. Sivir (net +0.94)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Sivir basic attacks → Dr. Mundo basic attacks)

#### 6. Bard (net +0.92)

- **0.72** range: Bard's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Bard basic attacks → Dr. Mundo basic attacks)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for 2.5 s, long enough to use ahead of Blunt Force Trauma. (Bard R Tempered Fate → Dr. Mundo E Blunt Force Trauma)

#### 7. Kayle (net +0.92)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Dr. Mundo's (625 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Kayle basic attacks → Dr. Mundo basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Dr. Mundo's Blunt Force Trauma. Invulnerable for 2.5 s, long enough to use ahead of Blunt Force Trauma. (Kayle R Divine Judgment → Dr. Mundo E Blunt Force Trauma)

#### 8. Yuumi (net +0.91)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Dr. Mundo's (425 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Yuumi basic attacks → Dr. Mundo basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for ?; Blunt Force Trauma lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Dr. Mundo E Blunt Force Trauma)

#### 9. Samira (net +0.89)

- **0.61** range: Samira's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Samira basic attacks → Dr. Mundo basic attacks)
- **0.28** projectile block: Blade Whirl blocks Dr. Mundo's Infected Bonesaw, a projectile. Blade Whirl for 0.75 s; Infected Bonesaw takes 0.78 s to land, enough to react. (Samira W Blade Whirl → Dr. Mundo Q Infected Bonesaw)

#### 10. Zeri (net +0.88)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Zeri basic attacks → Dr. Mundo basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +1.26 | 1.26 | 0.00 | range (attacks), blind (Blinding Dart) |
| 2 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 3 | Xayah | +0.97 | 0.97 | 0.00 | range (attacks) |
| 4 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 5 | Sivir | +0.94 | 0.94 | 0.00 | range (attacks) |
| 6 | Bard | +0.92 | 0.92 | 0.00 | range (attacks) |
| 7 | Kayle | +0.92 | 0.92 | 0.00 | range (attacks) |
| 8 | Yuumi | +0.91 | 0.91 | 0.00 | range (attacks) |
| 9 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 10 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 11 | Varus | +0.87 | 0.87 | 0.00 | range (attacks) |
| 12 | Twisted Fate | +0.86 | 0.86 | 0.00 | range (attacks) |
| 13 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 14 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 15 | Milio | +0.84 | 0.84 | 0.00 | range (attacks) |
| 16 | Aphelios | +0.83 | 0.83 | 0.00 | range (attacks) |
| 17 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 18 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 19 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 20 | Quinn | +0.77 | 0.77 | 0.00 | range (attacks) |
| 21 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 22 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Caitlyn | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Janna | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 28 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 29 | Aurora | +0.70 | 0.70 | 0.00 | range (attacks) |
| 30 | Kalista | +0.70 | 0.70 | 0.00 | range (attacks) |
| 31 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 32 | Nilah | +0.68 | 0.68 | 0.00 |  |
| 33 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 34 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 35 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 36 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 37 | Miss Fortune | +0.65 | 0.65 | 0.00 | range (attacks) |
| 38 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Lissandra | +0.64 | 0.64 | 0.00 |  |
| 44 | Vladimir | +0.64 | 0.64 | 0.00 |  |
| 45 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 47 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 48 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 50 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 51 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 52 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 53 | Jax | +0.53 | 0.53 | 0.00 |  |
| 54 | Jhin | +0.53 | 0.53 | 0.00 | range (attacks) |
| 55 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Taliyah | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Vel'Koz | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 60 | Xerath | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Shen | +0.51 | 0.51 | 0.00 |  |
| 63 | Singed | +0.51 | 0.51 | 0.00 |  |
| 64 | Graves | +0.49 | 0.49 | 0.00 |  |
| 65 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 66 | Malzahar | +0.48 | 0.48 | 0.00 |  |
| 67 | Ryze | +0.48 | 0.48 | 0.00 |  |
| 68 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 69 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 70 | Morgana | +0.47 | 0.47 | 0.00 |  |
| 71 | Heimerdinger | +0.46 | 0.46 | 0.00 |  |
| 72 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 73 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 74 | Annie | +0.44 | 0.44 | 0.00 |  |
| 75 | Aurelion Sol | +0.44 | 0.44 | 0.00 |  |
| 76 | Brand | +0.44 | 0.44 | 0.00 |  |
| 77 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 78 | Karma | +0.44 | 0.44 | 0.00 |  |
| 79 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 80 | Nami | +0.44 | 0.44 | 0.00 |  |
| 81 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 82 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 83 | Swain | +0.42 | 0.42 | 0.00 |  |
| 84 | Braum | +0.39 | 0.39 | 0.00 |  |
| 85 | Fiddlesticks | +0.39 | 0.39 | 0.00 |  |
| 86 | Karthus | +0.39 | 0.39 | 0.00 |  |
| 87 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 88 | Ivern | +0.38 | 0.38 | 0.00 |  |
| 89 | Katarina | +0.34 | 0.34 | 0.00 |  |
| 90 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 91 | Kled | +0.32 | 0.32 | 0.00 |  |
| 92 | Rammus | +0.32 | 0.32 | 0.00 |  |
| 93 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 94 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 95 | Pantheon | +0.27 | 0.27 | 0.00 |  |
| 96 | Master Yi | +0.25 | 0.25 | 0.00 |  |
| 97 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 98 | Fizz | +0.23 | 0.23 | 0.00 |  |
| 99 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 100 | Fiora | +0.21 | 0.21 | 0.00 |  |
| 101 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 102 | Maokai | +0.21 | 0.21 | 0.00 |  |
| 103 | Rek'Sai | +0.20 | 0.20 | 0.00 |  |
| 104 | Xin Zhao | +0.20 | 0.20 | 0.00 |  |
| 105 | Viego | +0.19 | 0.19 | 0.00 |  |
| 106 | Gwen | +0.16 | 0.16 | 0.00 |  |
| 107 | Nunu & Willump | +0.14 | 0.14 | 0.00 |  |
| 108 | Camille | +0.12 | 0.12 | 0.00 |  |
| 109 | Evelynn | +0.12 | 0.12 | 0.00 |  |
| 110 | Garen | +0.12 | 0.12 | 0.00 |  |
| 111 | Kayn | +0.12 | 0.12 | 0.00 |  |
| 112 | Shaco | +0.12 | 0.12 | 0.00 |  |
| 113 | Zed | +0.12 | 0.12 | 0.00 |  |
| 114 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 115 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 116 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 117 | Rengar | +0.07 | 0.07 | 0.00 |  |
| 118 | Skarner | +0.07 | 0.07 | 0.00 |  |
| 119 | Gangplank | +0.06 | 0.06 | 0.00 |  |
| 120 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 121 | Sion | +0.06 | 0.06 | 0.00 |  |
| 122 | Warwick | +0.06 | 0.06 | 0.00 |  |
| 123 | Zaahen | +0.06 | 0.06 | 0.00 |  |
| 124 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 125 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 126 | Akali | 0.00 | 0.00 | 0.00 |  |
| 127 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 128 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 129 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 130 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 131 | Briar | 0.00 | 0.00 | 0.00 |  |
| 132 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 133 | Darius | 0.00 | 0.00 | 0.00 |  |
| 134 | Diana | 0.00 | 0.00 | 0.00 |  |
| 135 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 136 | Galio | 0.00 | 0.00 | 0.00 |  |
| 137 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 138 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 139 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 140 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 144 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 145 | Leona | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 148 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 149 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 150 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 151 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 152 | Poppy | 0.00 | 0.00 | 0.00 |  |
| 153 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 154 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 155 | Rell | 0.00 | 0.00 | 0.00 |  |
| 156 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 157 | Riven | 0.00 | 0.00 | 0.00 |  |
| 158 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 159 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 160 | Sett | 0.00 | 0.00 | 0.00 |  |
| 161 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 162 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 163 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 164 | Talon | 0.00 | 0.00 | 0.00 |  |
| 165 | Taric | 0.00 | 0.00 | 0.00 |  |
| 166 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 167 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 168 | Vi | 0.00 | 0.00 | 0.00 |  |
| 169 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 170 | Yone | 0.00 | 0.00 | 0.00 |  |
| 171 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 172 | Zac | 0.00 | 0.00 | 0.00 |  |
