# Counters to Jayce (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Jayce: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jayce wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jayce --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.92 |
| 2 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.50 |
| 3 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.58 |
| 4 | Yasuo | +0.81 | +1.00 | +1.00 | +0.98 | +0.07 | – | +0.38 |
| 5 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.27 |
| 6 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.07 |
| 7 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.13 |
| 8 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.59 |
| 9 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.39 |
| 10 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.45 |
| 11 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.54 |
| 12 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.15 |
| 13 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.06 |
| 14 | Ashe | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.56 |
| 15 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | −0.43 |
| 16 | Aphelios | +0.75 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.76 |
| 17 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.15 |
| 18 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.25 |
| 19 | Warwick | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.14 |
| 20 | Kled | +0.75 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.02 |
| 21 | Gangplank | +0.74 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.34 |
| 22 | Zaahen | +0.74 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.23 |
| 23 | Dr. Mundo | +0.74 | +1.00 | +1.00 | +1.00 | −0.18 | – | −0.11 |
| 24 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.29 |
| 25 | K'Sante | +0.74 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.90 |
| 26 | Lee Sin | +0.73 | +1.00 | +1.00 | +1.00 | −0.17 | – | −0.28 |
| 27 | Braum | +0.73 | +1.00 | +1.00 | +0.96 | −0.11 | – | −0.33 |
| 28 | Zac | +0.64 | +0.68 | +1.00 | +1.00 | −0.28 | – | −0.07 |
| 29 | Vayne | +0.63 | +1.00 | +1.00 | +0.00 | +0.12 | +1.00 | +0.18 |
| 30 | Mordekaiser | +0.62 | +1.00 | +0.55 | +1.00 | −0.14 | – | −0.13 |
| 31 | Jax | +0.59 | +1.00 | +1.00 | +1.00 | −0.04 | −1.00 | −0.05 |
| 32 | Shyvana | +0.59 | +1.00 | +1.00 | +1.00 | −0.14 | −1.00 | +0.14 |
| 33 | Irelia | +0.58 | +1.00 | +1.00 | +0.33 | −0.11 | – | −0.53 |
| 34 | Urgot | +0.58 | +1.00 | +1.00 | +0.96 | +0.06 | −1.00 | −0.41 |
| 35 | Diana | +0.56 | +1.00 | +1.00 | +0.00 | −0.01 | – | +0.06 |
| 36 | Maokai | +0.53 | +1.00 | +1.00 | +0.00 | −0.13 | – | −0.07 |
| 37 | Renekton | +0.52 | +1.00 | +1.00 | +0.00 | −0.08 | – | −0.38 |
| 38 | Tryndamere | +0.48 | +1.00 | +0.00 | +1.00 | −0.11 | – | +0.06 |
| 39 | Riven | +0.48 | +1.00 | +0.00 | +1.00 | −0.11 | – | −0.10 |
| 40 | Tahm Kench | +0.37 | +0.63 | +0.03 | +0.94 | −0.12 | – | −0.08 |
| 41 | Bel'Veth | +0.33 | +0.79 | +1.00 | −0.84 | +0.25 | – | −0.43 |
| 42 | Xin Zhao | +0.32 | +1.00 | +0.03 | +0.42 | −0.13 | – | −0.71 |
| 43 | Illaoi | +0.32 | −0.39 | +1.00 | +1.00 | −0.18 | +0.00 | −0.17 |
| 44 | Corki | +0.32 | +1.00 | +0.72 | −1.00 | +0.06 | +1.00 | −0.48 |
| 45 | Elise | +0.28 | +0.60 | +1.00 | −0.03 | +0.06 | −1.00 | −0.38 |
| 46 | Garen | +0.28 | +1.00 | +1.00 | −1.00 | −0.17 | – | −0.53 |
| 47 | Yone | +0.23 | +1.00 | +0.00 | +0.09 | −0.19 | – | −0.65 |
| 48 | Sion | +0.20 | +0.79 | −0.04 | +0.00 | −0.15 | – | +0.25 |
| 49 | Cho'Gath | +0.20 | +1.00 | −1.00 | +1.00 | −0.05 | – | −0.32 |
| 50 | Gwen | +0.16 | +0.99 | −1.00 | +0.95 | −0.40 | – | +0.33 |
| 51 | Anivia | +0.08 | −0.05 | +0.29 | +0.15 | −0.11 | −0.04 | +0.25 |
| 52 | Ivern | +0.07 | +1.00 | −1.00 | +1.00 | −0.10 | −1.00 | −0.25 |
| 53 | Malphite | +0.03 | +1.00 | −1.00 | +0.00 | +0.06 | – | +0.31 |
| 54 | Vi | −0.03 | +1.00 | −1.00 | +0.00 | −0.05 | – | −0.33 |
| 55 | Varus | −0.05 | +0.33 | −1.00 | +1.00 | −0.09 | −0.53 | −0.28 |
| 56 | Zeri | −0.10 | +1.00 | −1.00 | −1.00 | +0.00 | +1.00 | +0.03 |
| 57 | Twisted Fate | −0.11 | +1.00 | −1.00 | −0.90 | −0.07 | +1.00 | −0.37 |
| 58 | Smolder | −0.13 | +1.00 | −1.00 | −1.00 | +0.06 | +1.00 | −0.79 |
| 59 | Gnar | −0.13 | +1.00 | −1.00 | −0.57 | −0.00 | −0.17 | −0.06 |
| 60 | Yunara | −0.15 | +1.00 | −1.00 | −1.00 | −0.06 | +1.00 | −0.73 |
| 61 | Aurora | −0.20 | +0.62 | −1.00 | −1.00 | −0.05 | +1.00 | +0.04 |
| 62 | Annie | −0.21 | −0.49 | +0.83 | −1.00 | +0.04 | −0.96 | −0.16 |
| 63 | Skarner | −0.24 | +1.00 | −1.00 | −1.00 | −0.04 | – | −0.26 |
| 64 | Ambessa | −0.25 | +1.00 | −1.00 | −1.00 | −0.12 | – | −0.10 |
| 65 | Nocturne | −0.25 | +1.00 | −1.00 | −1.00 | −0.14 | – | −0.09 |
| 66 | Rengar | −0.28 | +0.64 | −1.00 | −1.00 | +0.28 | – | −0.12 |
| 67 | Fiddlesticks | −0.30 | +1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.23 |
| 68 | Nilah | −0.31 | −1.00 | +1.00 | −1.00 | −0.06 | −1.00 | −0.03 |
| 69 | Aatrox | −0.31 | −0.59 | −1.00 | +1.00 | −0.29 | – | −0.75 |
| 70 | Master Yi | −0.32 | +0.00 | −1.00 | +0.00 | −0.06 | −1.00 | +0.72 |
| 71 | Sett | −0.33 | −1.00 | −1.00 | +1.00 | +0.04 | – | −0.11 |
| 72 | Pantheon | −0.37 | +0.52 | −1.00 | −1.00 | −0.08 | – | +0.04 |
| 73 | Udyr | −0.39 | −1.00 | −1.00 | +1.00 | −0.22 | −1.00 | +0.85 |
| 74 | Viego | −0.48 | +0.22 | −1.00 | −1.00 | −0.06 | – | −0.50 |
| 75 | Kai'Sa | −0.50 | −1.00 | −0.02 | −1.00 | −0.02 | +0.00 | −0.82 |
| 76 | Sylas | −0.51 | +0.00 | −1.00 | −1.00 | −0.07 | – | +0.04 |
| 77 | Kalista | −0.53 | +0.30 | −1.00 | −1.00 | −0.10 | −1.00 | −0.72 |
| 78 | Shen | −0.55 | −1.00 | −1.00 | +0.00 | +0.05 | – | −0.07 |
| 79 | Neeko | −0.59 | −1.00 | −1.00 | −1.00 | +0.13 | +1.00 | −0.13 |
| 80 | Samira | −0.59 | −0.26 | −1.00 | −0.69 | −0.05 | −1.00 | −0.52 |
| 81 | Rakan | −0.59 | −0.18 | −1.00 | −1.00 | −0.09 | −1.00 | +0.32 |
| 82 | Rell | −0.64 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | −0.29 |
| 83 | Mel | −0.66 | −1.00 | −1.00 | −1.00 | +0.02 | +0.49 | −0.24 |
| 84 | Caitlyn | −0.70 | −0.93 | −1.00 | −0.94 | −0.06 | +0.16 | −0.66 |
| 85 | Jarvan IV | −0.73 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.51 |
| 86 | Draven | −0.73 | −1.00 | −1.00 | −1.00 | +0.11 | −0.26 | −0.38 |
| 87 | Hwei | −0.74 | −1.00 | −1.00 | −1.00 | +0.00 | −0.37 | −0.09 |
| 88 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.30 |
| 89 | Xayah | −0.77 | −1.00 | −1.00 | −1.00 | −0.00 | −0.63 | −0.21 |
| 90 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.05 |
| 91 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.41 |
| 92 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.48 |
| 93 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.18 |
| 94 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −0.91 | −0.15 |
| 95 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.12 |
| 96 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.24 |
| 97 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.32 |
| 98 | Aurelion Sol | −0.79 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.45 |
| 99 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.12 |
| 100 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.12 |
| 101 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.02 |
| 102 | Heimerdinger | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.16 |
| 103 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.14 |
| 104 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | −0.79 | −0.10 |
| 105 | Jhin | −0.80 | −1.00 | −0.94 | −1.00 | −0.01 | −0.85 | −0.51 |
| 106 | Milio | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.09 |
| 107 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.20 |
| 108 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.32 |
| 109 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.24 |
| 110 | Vel'Koz | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.37 |
| 111 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 112 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.08 |
| 113 | Lux | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −0.93 | −0.32 |
| 114 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.41 |
| 115 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.26 |
| 116 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.18 |
| 117 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.23 |
| 118 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | −0.01 |
| 119 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.21 |
| 120 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.25 |
| 121 | Orianna | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −0.92 | −0.46 |
| 122 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.17 |
| 123 | Morgana | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.27 |
| 124 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.14 |
| 125 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.21 |
| 126 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.12 |
| 127 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.48 |
| 128 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.24 |
| 129 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.14 |
| 130 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.30 |
| 131 | Swain | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −0.99 | −0.60 |
| 132 | Jinx | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.30 |
| 133 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.18 |
| 134 | Cassiopeia | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.23 |
| 135 | Karma | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.31 |
| 136 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | −0.05 |
| 137 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.31 |
| 138 | Lissandra | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.24 |
| 139 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.29 |
| 140 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.37 |
| 141 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.51 |
| 142 | Ezreal | −0.83 | −1.00 | −1.00 | −0.98 | −0.06 | −0.99 | −0.41 |
| 143 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.14 |
| 144 | Lillia | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.01 |
| 145 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.34 |
| 146 | Kayn | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.51 |
| 147 | Sivir | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.36 |
| 148 | Tristana | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −0.76 | −0.75 |
| 149 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.49 |
| 150 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.33 |
| 151 | Zoe | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.49 |
| 152 | Azir | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.36 |
| 153 | Karthus | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.52 |
| 154 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.63 |
| 155 | Soraka | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.59 |
| 156 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.69 |
| 157 | Zilean | −0.84 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.35 |
| 158 | Xerath | −0.84 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.61 |
| 159 | Quinn | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.81 |
| 160 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.43 |
| 161 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.66 |
| 162 | Katarina | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.44 |
| 163 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.48 |
| 164 | Alistar | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | – | −0.30 |
| 165 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.63 |
| 166 | Ekko | −0.85 | −1.00 | −1.00 | −1.00 | −0.20 | – | −0.68 |
| 167 | Kindred | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.66 |
| 168 | Renata Glasc | −0.85 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.89 |
| 169 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.79 |
| 170 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.56 |
| 171 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.38 | – | −0.49 |
| 172 | Briar | −0.88 | −1.00 | −1.00 | −1.00 | −0.46 | – | −0.54 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Jayce's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jayce's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jayce` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.78)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Jayce's Thundering Blow. Untargetable for 0.75 s; Thundering Blow takes 0.25 s to land, enough to react. (Fizz E Playful → Jayce E Thundering Blow)
- **0.31** untargetable: Playful makes Fizz untargetable, dodging Jayce's To the Skies!. Untargetable for 0.75 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Jayce Q To the Skies!)
- **0.21** untargetable: Playful makes Fizz untargetable, dodging Jayce's Hyper Charge. Untargetable for 0.75 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 325 units farther than Fizz's (500 vs 175 attack range).

#### 2. Vladimir (net +0.72)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's Thundering Blow. Untargetable for 2 s, long enough to use ahead of Thundering Blow. (Vladimir W Sanguine Pool → Jayce E Thundering Blow)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's To the Skies!. Untargetable for 2 s, long enough to use ahead of To the Skies!. (Vladimir W Sanguine Pool → Jayce Q To the Skies!)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's Hyper Charge. Untargetable for 2 s, long enough to use ahead of Hyper Charge. (Vladimir W Sanguine Pool → Jayce W Hyper Charge)
- Watch out: Thundering Blow's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Sivir (net +0.69)

- **0.51** spell shield: Spell Shield's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce E Thundering Blow)
- **0.36** spell shield: Spell Shield's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce Q To the Skies!)

#### 4. Nocturne (net +0.61)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce E Thundering Blow)
- **0.42** spell shield: Shroud of Darkness's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce Q To the Skies!)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Jayce's Thundering Blow (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Jayce E Thundering Blow)
- Watch out: Jayce's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range).

#### 5. Morgana (net +0.59)

- **0.54** cc immunity: Black Shield makes Morgana immune to Jayce's Thundering Blow (airborne, root). Immune for 5 s, long enough to use ahead of Thundering Blow. (Morgana E Black Shield → Jayce E Thundering Blow)
- **0.09** cc immunity: Black Shield makes Morgana immune to Jayce's To the Skies! (slow). Immune for 5 s, long enough to use ahead of To the Skies!. (Morgana E Black Shield → Jayce Q To the Skies!)

#### 6. Maokai (net +0.58)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's Thundering Blow. Untargetable for 1.4 s; Thundering Blow takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Jayce E Thundering Blow)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's To the Skies!. Untargetable for 1.4 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jayce Q To the Skies!)
- **0.19** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's Hyper Charge. Untargetable for 1.4 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 375 units farther than Maokai's (500 vs 125 attack range).

#### 7. Teemo (net +0.58)

- **0.43** blind: Blinding Dart's blind makes Jayce's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Jayce basic attacks)
- **0.30** blind: Blinding Dart's blind makes Jayce's Hyper Charge, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Jayce W Hyper Charge)

#### 8. Lissandra (net +0.53)

- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Lissandra R Frozen Tomb → Jayce E Thundering Blow)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Lissandra R Frozen Tomb → Jayce Q To the Skies!)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's Hyper Charge. Untargetable for 2.5 s, long enough to use ahead of Hyper Charge. (Lissandra R Frozen Tomb → Jayce W Hyper Charge)

#### 9. Fiora (net +0.52)

- **0.64** parry: Riposte parries Jayce's Thundering Blow and stuns back. Parry for 0.75 s; Thundering Blow takes 0.25 s to land, enough to react. Negating Thundering Blow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jayce E Thundering Blow)
- **0.22** parry: Riposte parries Jayce's To the Skies!. Parry for 0.75 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Jayce Q To the Skies!)
- **0.16** parry: Riposte parries Jayce's Hyper Charge. Parry for 0.75 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range).

#### 10. Bard (net +0.52)

- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Bard R Tempered Fate → Jayce E Thundering Blow)
- **0.27** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Bard R Tempered Fate → Jayce Q To the Skies!)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's Hyper Charge. Untargetable for 2.5 s, long enough to use ahead of Hyper Charge. (Bard R Tempered Fate → Jayce W Hyper Charge)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.78 | 0.91 | 0.13 |  |
| 2 | Vladimir | +0.72 | 0.80 | 0.08 |  |
| 3 | Sivir | +0.69 | 0.69 | 0.00 |  |
| 4 | Nocturne | +0.61 | 0.91 | 0.30 |  |
| 5 | Morgana | +0.59 | 0.59 | 0.00 |  |
| 6 | Maokai | +0.58 | 0.88 | 0.30 |  |
| 7 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 8 | Lissandra | +0.53 | 0.53 | 0.00 |  |
| 9 | Fiora | +0.52 | 0.80 | 0.28 |  |
| 10 | Bard | +0.52 | 0.52 | 0.00 |  |
| 11 | Xayah | +0.50 | 0.50 | 0.00 |  |
| 12 | Yuumi | +0.48 | 0.95 | 0.47 |  |
| 13 | Udyr | +0.47 | 0.77 | 0.30 |  |
| 14 | Aurora | +0.44 | 0.44 | 0.00 |  |
| 15 | Kayle | +0.43 | 0.43 | 0.00 |  |
| 16 | Gwen | +0.38 | 0.66 | 0.28 |  |
| 17 | Milio | +0.36 | 0.36 | 0.00 |  |
| 18 | Samira | +0.35 | 0.35 | 0.00 |  |
| 19 | Rek'Sai | +0.34 | 0.52 | 0.18 |  |
| 20 | Mel | +0.33 | 0.33 | 0.00 |  |
| 21 | Camille | +0.30 | 0.45 | 0.15 |  |
| 22 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 23 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 24 | Kalista | +0.28 | 0.28 | 0.00 |  |
| 25 | Braum | +0.27 | 0.57 | 0.30 | projectile block (Unbreakable) |
| 26 | Master Yi | +0.26 | 0.75 | 0.49 |  |
| 27 | Vex | +0.26 | 0.26 | 0.00 |  |
| 28 | Evelynn | +0.24 | 0.44 | 0.20 |  |
| 29 | Shaco | +0.24 | 0.44 | 0.20 |  |
| 30 | Kled | +0.24 | 0.34 | 0.10 |  |
| 31 | Zed | +0.23 | 0.43 | 0.20 |  |
| 32 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 33 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 34 | Jax | +0.22 | 0.52 | 0.30 |  |
| 35 | Yasuo | +0.22 | 0.40 | 0.18 |  |
| 36 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 37 | Nilah | +0.20 | 0.42 | 0.22 |  |
| 38 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 39 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 40 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 41 | Zaahen | +0.17 | 0.35 | 0.18 |  |
| 42 | Malzahar | +0.12 | 0.52 | 0.40 |  |
| 43 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 44 | Senna | +0.08 | 0.08 | 0.00 |  |
| 45 | Yone | +0.07 | 0.20 | 0.13 |  |
| 46 | Annie | +0.07 | 0.07 | 0.00 |  |
| 47 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 48 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 49 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 50 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 51 | Xin Zhao | +0.04 | 0.30 | 0.26 |  |
| 52 | Zyra | +0.04 | 0.04 | 0.00 |  |
| 53 | Rengar | 0.00 | 0.61 | 0.61 |  |
| 54 | Alistar | 0.00 | 0.30 | 0.30 |  |
| 55 | K'Sante | 0.00 | 0.14 | 0.14 |  |
| 56 | Azir | 0.00 | 0.00 | 0.00 |  |
| 57 | Brand | 0.00 | 0.00 | 0.00 |  |
| 58 | Corki | 0.00 | 0.00 | 0.00 |  |
| 59 | Draven | 0.00 | 0.00 | 0.00 |  |
| 60 | Elise | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 64 | Karma | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Nami | 0.00 | 0.00 | 0.00 |  |
| 71 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 72 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 73 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 82 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 83 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 84 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 85 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 86 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 87 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 88 | Malphite | -0.02 | 0.28 | 0.30 |  |
| 89 | Graves | -0.04 | 0.00 | 0.04 |  |
| 90 | Jarvan IV | -0.06 | 0.07 | 0.13 |  |
| 91 | Varus | -0.06 | 0.05 | 0.11 |  |
| 92 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 93 | Gangplank | -0.11 | 0.50 | 0.61 |  |
| 94 | Hecarim | -0.11 | 0.07 | 0.18 |  |
| 95 | Ornn | -0.11 | 0.07 | 0.18 |  |
| 96 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 97 | Poppy | -0.12 | 0.38 | 0.50 |  |
| 98 | Volibear | -0.12 | 0.07 | 0.19 |  |
| 99 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 100 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 101 | Caitlyn | -0.14 | 0.14 | 0.28 |  |
| 102 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 103 | Briar | -0.15 | 0.00 | 0.15 |  |
| 104 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 105 | Shen | -0.16 | 0.49 | 0.65 |  |
| 106 | Amumu | -0.17 | 0.13 | 0.30 |  |
| 107 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 108 | Rell | -0.18 | 0.00 | 0.18 |  |
| 109 | Kayn | -0.19 | 0.44 | 0.63 |  |
| 110 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 111 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 112 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 113 | Akali | -0.20 | 0.00 | 0.20 |  |
| 114 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 115 | Ekko | -0.20 | 0.00 | 0.20 |  |
| 116 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 117 | Riven | -0.20 | 0.00 | 0.20 |  |
| 118 | Talon | -0.20 | 0.00 | 0.20 |  |
| 119 | Shyvana | -0.21 | 0.07 | 0.28 |  |
| 120 | Garen | -0.23 | 0.30 | 0.53 |  |
| 121 | Illaoi | -0.23 | 0.07 | 0.30 |  |
| 122 | Sett | -0.23 | 0.07 | 0.30 |  |
| 123 | Pantheon | -0.24 | 0.44 | 0.68 |  |
| 124 | Olaf | -0.24 | 0.37 | 0.61 |  |
| 125 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 126 | Rammus | -0.25 | 0.32 | 0.57 |  |
| 127 | Aatrox | -0.26 | 0.00 | 0.26 |  |
| 128 | Nautilus | -0.26 | 0.00 | 0.26 |  |
| 129 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 130 | Sion | -0.27 | 0.39 | 0.66 |  |
| 131 | Viego | -0.27 | 0.07 | 0.34 |  |
| 132 | Nasus | -0.28 | 0.33 | 0.61 |  |
| 133 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 134 | Diana | -0.28 | 0.00 | 0.28 |  |
| 135 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 136 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 137 | Kassadin | -0.28 | 0.00 | 0.28 |  |
| 138 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Sejuani | -0.28 | 0.00 | 0.28 |  |
| 141 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 142 | Kha'Zix | -0.30 | 0.00 | 0.30 |  |
| 143 | Leona | -0.30 | 0.00 | 0.30 |  |
| 144 | Locke | -0.30 | 0.00 | 0.30 |  |
| 145 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 146 | Singed | -0.31 | 0.30 | 0.61 |  |
| 147 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 148 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 149 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 150 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 151 | Warwick | -0.36 | 0.49 | 0.85 |  |
| 152 | Janna | -0.40 | 0.00 | 0.40 |  |
| 153 | Mordekaiser | -0.45 | 0.08 | 0.53 |  |
| 154 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 155 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 156 | Zac | -0.47 | 0.26 | 0.73 |  |
| 157 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 158 | Skarner | -0.50 | 0.07 | 0.57 |  |
| 159 | Vi | -0.51 | 0.07 | 0.58 |  |
| 160 | Darius | -0.53 | 0.00 | 0.53 |  |
| 161 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 162 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 163 | Taric | -0.57 | 0.00 | 0.57 |  |
| 164 | Katarina | -0.58 | 0.00 | 0.58 |  |
| 165 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 166 | Blitzcrank | -0.61 | 0.00 | 0.61 |  |
| 167 | Cho'Gath | -0.61 | 0.00 | 0.61 |  |
| 168 | Dr. Mundo | -0.61 | 0.00 | 0.61 |  |
| 169 | Rumble | -0.61 | 0.00 | 0.61 |  |
| 170 | Tahm Kench | -0.76 | 0.00 | 0.76 |  |
| 171 | Galio | -0.78 | 0.00 | 0.78 |  |
| 172 | Nunu & Willump | -0.94 | 0.16 | 1.10 |  |
