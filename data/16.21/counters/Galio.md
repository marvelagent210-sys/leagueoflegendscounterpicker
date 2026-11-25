# Counters to Galio (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Galio: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Galio wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Galio --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Gangplank | +0.88 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.64 |
| 2 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.75 |
| 3 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.75 |
| 4 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.36 | – | +0.47 |
| 5 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.74 |
| 6 | Ashe | +0.84 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.40 |
| 7 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.40 |
| 8 | Xayah | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.30 |
| 9 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.85 |
| 10 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.74 |
| 11 | Urgot | +0.82 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | −0.20 |
| 12 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.31 |
| 13 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.23 |
| 14 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.37 |
| 15 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.88 |
| 16 | Jarvan IV | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.54 |
| 17 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.18 |
| 18 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 19 | Akshan | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.15 |
| 20 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.33 |
| 21 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.56 |
| 22 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.25 |
| 23 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 24 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.56 |
| 25 | Sivir | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.15 |
| 26 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | −0.42 |
| 27 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.10 |
| 28 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.14 |
| 29 | Lucian | +0.81 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.26 |
| 30 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.12 |
| 31 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.08 |
| 32 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.00 |
| 33 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.32 |
| 34 | Tryndamere | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.42 |
| 35 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.08 |
| 36 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.01 |
| 37 | Darius | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.08 |
| 38 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.17 |
| 39 | Quinn | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.32 |
| 40 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.16 |
| 41 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.23 |
| 42 | Viego | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.08 |
| 43 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.22 |
| 44 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.25 |
| 45 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.15 |
| 46 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.08 |
| 47 | Morgana | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.05 |
| 48 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.59 |
| 49 | Varus | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +0.97 | −0.13 |
| 50 | Xin Zhao | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.13 |
| 51 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.23 |
| 52 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.07 |
| 53 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +0.97 | −0.12 |
| 54 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.31 |
| 55 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.16 |
| 56 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.19 |
| 57 | Twisted Fate | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.30 |
| 58 | Zed | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.41 |
| 59 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.15 |
| 60 | Yunara | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.30 |
| 61 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 62 | Sejuani | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.06 |
| 63 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.06 |
| 64 | Sion | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.27 |
| 65 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.64 |
| 66 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.47 |
| 67 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.18 |
| 68 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.09 |
| 69 | Irelia | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.08 |
| 70 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.15 |
| 71 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.10 |
| 72 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.17 |
| 73 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.13 |
| 74 | Kayn | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.16 |
| 75 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.16 |
| 76 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.08 |
| 77 | Shen | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.05 |
| 78 | Shaco | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.04 |
| 79 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.24 |
| 80 | Malphite | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.05 |
| 81 | Ezreal | +0.77 | +0.97 | +1.00 | +0.89 | +0.00 | +1.00 | −0.07 |
| 82 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.14 |
| 83 | Cho'Gath | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.16 |
| 84 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.20 |
| 85 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.04 |
| 86 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.28 |
| 87 | Aatrox | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.08 |
| 88 | Bel'Veth | +0.76 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.15 |
| 89 | Leona | +0.76 | +0.94 | +1.00 | +1.00 | −0.08 | – | +0.23 |
| 90 | Maokai | +0.76 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.30 |
| 91 | Zac | +0.76 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.05 |
| 92 | Jinx | +0.75 | +1.00 | +1.00 | +0.88 | −0.00 | +0.95 | −0.39 |
| 93 | Rumble | +0.74 | +0.94 | +1.00 | +1.00 | −0.14 | – | −0.07 |
| 94 | Draven | +0.70 | +1.00 | +1.00 | +1.00 | +0.01 | +0.00 | +0.04 |
| 95 | Jhin | +0.69 | +1.00 | +1.00 | +1.00 | +0.11 | −0.19 | −0.21 |
| 96 | Miss Fortune | +0.63 | +1.00 | +1.00 | +0.00 | +0.13 | +1.00 | +0.30 |
| 97 | Zilean | +0.56 | +0.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.01 |
| 98 | Smolder | +0.43 | +0.00 | +0.50 | +1.00 | +0.12 | +1.00 | −0.20 |
| 99 | Briar | +0.37 | +0.30 | +0.30 | +1.00 | −0.17 | – | +0.18 |
| 100 | Rakan | +0.32 | +0.00 | +0.00 | +1.00 | +0.05 | +1.00 | +0.32 |
| 101 | Malzahar | +0.29 | +1.00 | +1.00 | −1.00 | +0.01 | +0.00 | −0.23 |
| 102 | Skarner | +0.23 | −1.00 | +1.00 | +1.00 | +0.07 | – | −0.08 |
| 103 | Elise | +0.20 | +1.00 | +1.00 | −1.00 | −0.02 | −1.00 | +0.01 |
| 104 | Tahm Kench | +0.18 | +0.10 | +0.12 | +0.55 | −0.01 | – | −0.13 |
| 105 | Ornn | +0.10 | +0.13 | +0.13 | +0.13 | +0.02 | – | −0.04 |
| 106 | Vel'Koz | +0.07 | +0.03 | +1.00 | −1.00 | +0.12 | −0.05 | +0.03 |
| 107 | Karma | +0.01 | −0.02 | −0.01 | +0.09 | +0.00 | +0.10 | −0.15 |
| 108 | Bard | +0.01 | +0.20 | +0.28 | −1.00 | −0.05 | +1.00 | +0.00 |
| 109 | Lillia | −0.02 | −0.01 | −0.03 | −0.01 | −0.11 | +0.09 | +0.07 |
| 110 | Kennen | −0.07 | −0.84 | −0.25 | +1.00 | −0.11 | +0.13 | +0.10 |
| 111 | Singed | −0.08 | −0.10 | −0.10 | −0.11 | −0.01 | – | +0.00 |
| 112 | Anivia | −0.12 | −0.22 | −0.23 | +0.16 | −0.14 | −0.20 | +0.10 |
| 113 | Kassadin | −0.12 | +0.00 | +0.00 | −0.50 | −0.11 | – | +0.18 |
| 114 | Fizz | −0.20 | −0.50 | −1.00 | +1.00 | −0.05 | – | +0.11 |
| 115 | Hecarim | −0.20 | +1.00 | −1.00 | −1.00 | +0.07 | – | +0.23 |
| 116 | Senna | −0.20 | +0.00 | +0.00 | −1.00 | +0.09 | +0.00 | −0.27 |
| 117 | Karthus | −0.20 | −0.21 | −0.23 | −0.24 | −0.11 | −0.22 | −0.14 |
| 118 | Caitlyn | −0.22 | −0.90 | −0.89 | +1.00 | +0.06 | +0.32 | −0.27 |
| 119 | Kai'Sa | −0.26 | −0.50 | +0.00 | −1.00 | −0.10 | +1.00 | −0.34 |
| 120 | Akali | −0.31 | −1.00 | +0.85 | −1.00 | −0.26 | – | −0.07 |
| 121 | Nami | −0.31 | −1.00 | +1.00 | −1.00 | −0.01 | −1.00 | −0.25 |
| 122 | Heimerdinger | −0.34 | −0.64 | −0.28 | −0.14 | −0.09 | −0.61 | −0.15 |
| 123 | Amumu | −0.34 | −1.00 | −1.00 | +1.00 | −0.04 | – | −0.01 |
| 124 | Kindred | −0.39 | −1.00 | −1.00 | +1.00 | +0.10 | −1.00 | −0.09 |
| 125 | Brand | −0.45 | −0.12 | −0.41 | −1.00 | −0.03 | −1.00 | −0.23 |
| 126 | Janna | −0.55 | −0.50 | −0.50 | −1.00 | +0.08 | −1.00 | −0.27 |
| 127 | Annie | −0.58 | −1.00 | −0.11 | −1.00 | +0.01 | −1.00 | −0.16 |
| 128 | Twitch | −0.58 | −0.50 | −1.00 | −1.00 | +0.02 | +0.00 | −0.26 |
| 129 | Nautilus | −0.59 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | −0.05 |
| 130 | Viktor | −0.61 | −1.00 | −1.00 | +0.00 | −0.03 | −1.00 | −0.07 |
| 131 | Soraka | −0.61 | −1.00 | −1.00 | −0.02 | −0.03 | −1.00 | −0.03 |
| 132 | Zoe | −0.61 | −0.61 | −0.74 | −1.00 | −0.03 | −0.61 | −0.16 |
| 133 | Tristana | −0.61 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | −0.32 |
| 134 | Aurora | −0.71 | −1.00 | −1.00 | −1.00 | −0.04 | −0.03 | −0.09 |
| 135 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | −0.12 | −0.26 | +0.00 |
| 136 | Kha'Zix | −0.76 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.50 |
| 137 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.36 |
| 138 | Qiyana | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.22 |
| 139 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.04 |
| 140 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.08 |
| 141 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.01 |
| 142 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.07 |
| 143 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.11 |
| 144 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.01 |
| 145 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.02 |
| 146 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.05 |
| 147 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.09 |
| 148 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.20 |
| 149 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.06 |
| 150 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.01 |
| 151 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.03 |
| 152 | Mel | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.07 |
| 153 | Lux | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.16 |
| 154 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.16 |
| 155 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.20 |
| 156 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.13 |
| 157 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.09 |
| 158 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.01 |
| 159 | Azir | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.17 |
| 160 | Cassiopeia | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.26 |
| 161 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.17 |
| 162 | Ziggs | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 163 | Xerath | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.19 |
| 164 | Sylas | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.28 |
| 165 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.34 |
| 166 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.23 |
| 167 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.25 |
| 168 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.48 |
| 169 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.46 |
| 170 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.28 |
| 171 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.18 |
| 172 | Fiddlesticks | −0.85 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.24 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Galio's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Galio's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Galio` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +2.91)

- **0.50** interrupt: Ferromancy: Crash Down's airborne interrupts Galio's Hero's Entrance (movement channel). Ferromancy: Crash Down must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell W Ferromancy: Crash Down → Galio R Hero's Entrance)
- **0.50** interrupt: Ferromancy: Mount Up's airborne interrupts Galio's Hero's Entrance (movement channel). Ferromancy: Mount Up must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell W Ferromancy: Mount Up → Galio R Hero's Entrance)
- **0.50** interrupt: Full Tilt's stun interrupts Galio's Hero's Entrance (movement channel). Full Tilt must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rell E Full Tilt → Galio R Hero's Entrance)

#### 2. Nocturne (net +2.24)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Galio's Hero's Entrance. Spell shield for 1.5 s, long enough to use ahead of Hero's Entrance. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio R Hero's Entrance)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Galio's Shield of Durand. Spell shield for 1.5 s, long enough to use ahead of Shield of Durand. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Galio W Shield of Durand)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Galio's Hero's Entrance (movement channel). Unspeakable Horror must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Nocturne E Unspeakable Horror → Galio R Hero's Entrance)

#### 3. Alistar (net +2.23)

- **0.80** cleanse: Unbreakable Will cleanses Galio's Hero's Entrance (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Galio R Hero's Entrance)
- **0.50** interrupt: Pulverize's airborne interrupts Galio's Hero's Entrance (movement channel). Pulverize must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Alistar Q Pulverize → Galio R Hero's Entrance)
- **0.50** interrupt: Trample's stun interrupts Galio's Hero's Entrance (movement channel). Trample must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Alistar E Trample → Galio R Hero's Entrance)

#### 4. Zaahen (net +2.06)

- **0.60** cc immunity: Grim Deliverance makes Zaahen immune to Galio's Hero's Entrance (airborne). Immune for ?; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Galio R Hero's Entrance)
- **0.50** interrupt: Dreaded Return's airborne interrupts Galio's Hero's Entrance (movement channel). Dreaded Return must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Zaahen W Dreaded Return → Galio R Hero's Entrance)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Galio's Hero's Entrance (movement channel). The Darkin Glaive must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Zaahen Q The Darkin Glaive → Galio R Hero's Entrance)

#### 5. Rek'Sai (net +1.94)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.5 s, long enough to use ahead of Hero's Entrance. (Rek'Sai R Void Rush → Galio R Hero's Entrance)
- **0.50** interrupt: Unburrow's airborne interrupts Galio's Hero's Entrance (movement channel). Unburrow must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Rek'Sai W Unburrow → Galio R Hero's Entrance)
- **0.45** untargetable: Void Rush makes Rek'Sai untargetable, dodging Galio's Justice Punch. Untargetable for 1.5 s, long enough to use ahead of Justice Punch. (Rek'Sai R Void Rush → Galio E Justice Punch)

#### 6. K'Sante (net +1.92)

- **0.50** interrupt: All Out's airborne interrupts Galio's Hero's Entrance (movement channel). All Out must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante R All Out → Galio R Hero's Entrance)
- **0.50** interrupt: Ntofo Strikes's airborne interrupts Galio's Hero's Entrance (movement channel). Ntofo Strikes must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante Q Ntofo Strikes → Galio R Hero's Entrance)
- **0.50** interrupt: Path Maker's airborne interrupts Galio's Hero's Entrance (movement channel). Path Maker must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (K'Sante W Path Maker → Galio R Hero's Entrance)

#### 7. Fizz (net +1.88)

- **0.93** untargetable: Playful makes Fizz untargetable, dodging Galio's Justice Punch. Untargetable for 0.75 s; Justice Punch takes 0.51 s to land, enough to react. (Fizz E Playful → Galio E Justice Punch)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Galio's Hero's Entrance. Untargetable for 0.75 s; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Galio R Hero's Entrance)
- **0.50** interrupt: Chum the Waters's airborne interrupts Galio's Hero's Entrance (movement channel). Chum the Waters must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Fizz R Chum the Waters → Galio R Hero's Entrance)

#### 8. Maokai (net +1.82)

- **0.82** untargetable: Twisted Advance makes Maokai untargetable, dodging Galio's Justice Punch. Untargetable for 1.4 s; Justice Punch takes 0.51 s to land, enough to react. (Maokai W Twisted Advance → Galio E Justice Punch)
- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Galio's Hero's Entrance. Untargetable for 1.4 s; Hero's Entrance lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Galio R Hero's Entrance)
- **0.50** interrupt: Bramble Smash's airborne interrupts Galio's Hero's Entrance (movement channel). Bramble Smash must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Maokai Q Bramble Smash → Galio R Hero's Entrance)

#### 9. Udyr (net +1.75)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Hero's Entrance (airborne). Immune for 1.5 s, long enough to use ahead of Hero's Entrance. (Udyr E Blazing Stampede → Galio R Hero's Entrance)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Galio's Justice Punch (airborne). Immune for 1.5 s, long enough to use ahead of Justice Punch. (Udyr E Blazing Stampede → Galio E Justice Punch)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Galio's Shield of Durand (taunt, slow). Immune for 1.5 s, long enough to use ahead of Shield of Durand. (Udyr E Blazing Stampede → Galio W Shield of Durand)

#### 10. Blitzcrank (net +1.74)

- **0.50** interrupt: Power Fist's airborne interrupts Galio's Hero's Entrance (movement channel). Power Fist must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank E Power Fist → Galio R Hero's Entrance)
- **0.50** interrupt: Rocket Grab's airborne interrupts Galio's Hero's Entrance (movement channel). Rocket Grab must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank Q Rocket Grab → Galio R Hero's Entrance)
- **0.50** interrupt: Static Field's silence interrupts Galio's Hero's Entrance (movement channel). Static Field must land during the channel. Experimental Hexplate Overdrive, Fiendhunter Bolts Opening Barrage, and Zeke's Convergence Frostfire Tempest will activate at the end of Hero's Entrance's channel. The following table refers for interactions while Galio is channeling:. (Blitzcrank R Static Field → Galio R Hero's Entrance)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.91 | 2.91 | 0.00 |  |
| 2 | Nocturne | +2.24 | 2.24 | 0.00 |  |
| 3 | Alistar | +2.23 | 2.23 | 0.00 |  |
| 4 | Zaahen | +2.06 | 2.06 | 0.00 |  |
| 5 | Rek'Sai | +1.94 | 1.94 | 0.00 |  |
| 6 | K'Sante | +1.92 | 1.92 | 0.00 |  |
| 7 | Fizz | +1.88 | 1.88 | 0.00 |  |
| 8 | Maokai | +1.82 | 1.82 | 0.00 |  |
| 9 | Udyr | +1.75 | 1.75 | 0.00 |  |
| 10 | Blitzcrank | +1.74 | 1.74 | 0.00 |  |
| 11 | Sejuani | +1.73 | 1.73 | 0.00 |  |
| 12 | Sion | +1.66 | 2.01 | 0.35 |  |
| 13 | Kled | +1.65 | 1.65 | 0.00 |  |
| 14 | Bard | +1.63 | 1.63 | 0.00 |  |
| 15 | Morgana | +1.61 | 1.61 | 0.00 |  |
| 16 | Camille | +1.60 | 1.60 | 0.00 |  |
| 17 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 18 | Lissandra | +1.57 | 1.57 | 0.00 |  |
| 19 | Braum | +1.55 | 1.55 | 0.00 | projectile block (Unbreakable) |
| 20 | Xayah | +1.55 | 1.55 | 0.00 |  |
| 21 | Evelynn | +1.47 | 1.47 | 0.00 |  |
| 22 | Yone | +1.47 | 1.47 | 0.00 |  |
| 23 | Shaco | +1.46 | 1.46 | 0.00 |  |
| 24 | Lulu | +1.45 | 1.45 | 0.00 |  |
| 25 | Yasuo | +1.44 | 1.44 | 0.00 |  |
| 26 | Ornn | +1.43 | 1.43 | 0.00 |  |
| 27 | Xin Zhao | +1.42 | 1.42 | 0.00 |  |
| 28 | Cassiopeia | +1.41 | 1.41 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Vladimir | +1.39 | 1.60 | 0.21 |  |
| 30 | Heimerdinger | +1.38 | 1.38 | 0.00 |  |
| 31 | Renata Glasc | +1.38 | 1.38 | 0.00 |  |
| 32 | Viktor | +1.38 | 1.38 | 0.00 |  |
| 33 | Kalista | +1.37 | 1.37 | 0.00 |  |
| 34 | Gnar | +1.36 | 1.36 | 0.00 |  |
| 35 | Anivia | +1.33 | 1.33 | 0.00 |  |
| 36 | Singed | +1.33 | 1.33 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 37 | Olaf | +1.31 | 1.31 | 0.00 |  |
| 38 | Seraphine | +1.31 | 1.31 | 0.00 |  |
| 39 | Thresh | +1.30 | 1.30 | 0.00 |  |
| 40 | Nami | +1.28 | 1.28 | 0.00 |  |
| 41 | Rengar | +1.27 | 1.27 | 0.00 |  |
| 42 | Sett | +1.25 | 1.25 | 0.00 |  |
| 43 | Fiora | +1.24 | 1.24 | 0.00 |  |
| 44 | Gangplank | +1.22 | 1.22 | 0.00 |  |
| 45 | Urgot | +1.22 | 1.22 | 0.00 |  |
| 46 | Rakan | +1.20 | 1.20 | 0.00 |  |
| 47 | Milio | +1.19 | 1.19 | 0.00 |  |
| 48 | Cho'Gath | +1.18 | 1.18 | 0.00 |  |
| 49 | Riven | +1.18 | 1.18 | 0.00 |  |
| 50 | Amumu | +1.16 | 1.16 | 0.00 |  |
| 51 | Leona | +1.13 | 1.13 | 0.00 |  |
| 52 | Vex | +1.11 | 1.11 | 0.00 |  |
| 53 | Aurora | +1.10 | 1.10 | 0.00 |  |
| 54 | Aurelion Sol | +1.06 | 1.28 | 0.22 |  |
| 55 | Malzahar | +1.03 | 2.13 | 1.10 |  |
| 56 | Gwen | +1.02 | 1.02 | 0.00 |  |
| 57 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 58 | Mordekaiser | +0.89 | 0.89 | 0.00 |  |
| 59 | Volibear | +0.89 | 0.89 | 0.00 |  |
| 60 | Vayne | +0.88 | 0.88 | 0.00 |  |
| 61 | Zed | +0.87 | 0.87 | 0.00 |  |
| 62 | Nilah | +0.86 | 0.86 | 0.00 |  |
| 63 | Malphite | +0.84 | 0.84 | 0.00 |  |
| 64 | Draven | +0.83 | 0.83 | 0.00 |  |
| 65 | Elise | +0.81 | 0.81 | 0.00 |  |
| 66 | Garen | +0.81 | 0.81 | 0.00 |  |
| 67 | Sona | +0.81 | 0.81 | 0.00 |  |
| 68 | Zilean | +0.81 | 0.81 | 0.00 |  |
| 69 | Zoe | +0.81 | 0.81 | 0.00 |  |
| 70 | Hwei | +0.80 | 0.80 | 0.00 |  |
| 71 | Veigar | +0.80 | 0.80 | 0.00 |  |
| 72 | Pyke | +0.79 | 1.18 | 0.39 |  |
| 73 | Ahri | +0.79 | 0.79 | 0.00 |  |
| 74 | Ashe | +0.79 | 0.79 | 0.00 |  |
| 75 | Jayce | +0.78 | 0.78 | 0.00 |  |
| 76 | Kennen | +0.78 | 0.78 | 0.00 |  |
| 77 | Tristana | +0.78 | 0.78 | 0.00 |  |
| 78 | Ziggs | +0.77 | 0.77 | 0.00 |  |
| 79 | Soraka | +0.76 | 0.76 | 0.00 |  |
| 80 | Rammus | +0.75 | 1.45 | 0.70 |  |
| 81 | Annie | +0.74 | 0.74 | 0.00 |  |
| 82 | Brand | +0.74 | 0.74 | 0.00 |  |
| 83 | Syndra | +0.74 | 0.74 | 0.00 |  |
| 84 | Azir | +0.72 | 0.72 | 0.00 |  |
| 85 | Orianna | +0.72 | 0.72 | 0.00 |  |
| 86 | Swain | +0.72 | 0.72 | 0.00 |  |
| 87 | Gragas | +0.71 | 1.13 | 0.42 |  |
| 88 | Zyra | +0.71 | 0.71 | 0.00 |  |
| 89 | Viego | +0.70 | 1.25 | 0.55 |  |
| 90 | Neeko | +0.70 | 0.70 | 0.00 |  |
| 91 | Jax | +0.69 | 0.69 | 0.00 |  |
| 92 | Zac | +0.68 | 1.79 | 1.11 |  |
| 93 | Hecarim | +0.67 | 0.67 | 0.00 |  |
| 94 | Shyvana | +0.67 | 0.67 | 0.00 |  |
| 95 | Jarvan IV | +0.66 | 0.66 | 0.00 |  |
| 96 | Skarner | +0.64 | 0.64 | 0.00 |  |
| 97 | Master Yi | +0.62 | 1.14 | 0.52 |  |
| 98 | Lillia | +0.60 | 0.60 | 0.00 |  |
| 99 | Aatrox | +0.59 | 0.59 | 0.00 |  |
| 100 | Bel'Veth | +0.59 | 0.59 | 0.00 |  |
| 101 | Irelia | +0.59 | 0.59 | 0.00 |  |
| 102 | Kassadin | +0.59 | 0.59 | 0.00 |  |
| 103 | Renekton | +0.59 | 0.59 | 0.00 |  |
| 104 | Sylas | +0.59 | 0.59 | 0.00 |  |
| 105 | Taric | +0.59 | 0.59 | 0.00 |  |
| 106 | Trundle | +0.59 | 0.59 | 0.00 |  |
| 107 | Yorick | +0.59 | 0.59 | 0.00 |  |
| 108 | Darius | +0.58 | 0.58 | 0.00 |  |
| 109 | Teemo | +0.56 | 0.56 | 0.00 |  |
| 110 | Briar | +0.55 | 0.55 | 0.00 |  |
| 111 | Diana | +0.55 | 0.55 | 0.00 |  |
| 112 | Lee Sin | +0.55 | 0.55 | 0.00 |  |
| 113 | Wukong | +0.55 | 0.55 | 0.00 |  |
| 114 | Nautilus | +0.55 | 0.55 | 0.00 |  |
| 115 | Ambessa | +0.54 | 0.54 | 0.00 |  |
| 116 | Qiyana | +0.54 | 0.54 | 0.00 |  |
| 117 | Taliyah | +0.50 | 1.89 | 1.39 |  |
| 118 | Tahm Kench | +0.49 | 1.73 | 1.24 |  |
| 119 | Yuumi | +0.47 | 1.61 | 1.14 |  |
| 120 | Samira | +0.46 | 0.46 | 0.00 |  |
| 121 | Mel | +0.43 | 0.43 | 0.00 |  |
| 122 | Poppy | +0.41 | 0.98 | 0.57 |  |
| 123 | Jinx | +0.39 | 0.39 | 0.00 |  |
| 124 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 125 | Quinn | +0.32 | 0.83 | 0.51 |  |
| 126 | Illaoi | +0.30 | 0.30 | 0.00 |  |
| 127 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 128 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 129 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 130 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 131 | Vi | +0.25 | 1.25 | 1.00 |  |
| 132 | Kayn | +0.24 | 1.47 | 1.23 |  |
| 133 | Janna | +0.24 | 1.37 | 1.13 |  |
| 134 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 135 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 136 | Corki | +0.22 | 0.22 | 0.00 |  |
| 137 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 138 | Senna | +0.22 | 0.22 | 0.00 |  |
| 139 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 140 | Lux | +0.19 | 0.19 | 0.00 |  |
| 141 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 142 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 143 | Graves | +0.15 | 0.15 | 0.00 |  |
| 144 | Warwick | +0.14 | 1.89 | 1.75 |  |
| 145 | Karma | +0.14 | 0.14 | 0.00 |  |
| 146 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 147 | Fiddlesticks | +0.09 | 1.30 | 1.21 |  |
| 148 | Vel'Koz | 0.00 | 0.76 | 0.76 |  |
| 149 | Akali | 0.00 | 0.00 | 0.00 |  |
| 150 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 151 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 152 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 153 | Locke | 0.00 | 0.00 | 0.00 |  |
| 154 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 155 | Talon | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Varus | -0.08 | 0.18 | 0.26 |  |
| 158 | Xerath | -0.14 | 0.76 | 0.90 |  |
| 159 | Twisted Fate | -0.15 | 0.86 | 1.01 |  |
| 160 | Ivern | -0.22 | 0.12 | 0.34 |  |
| 161 | Shen | -0.49 | 0.86 | 1.35 |  |
| 162 | Caitlyn | -0.54 | 0.24 | 0.78 |  |
| 163 | Akshan | -0.54 | 0.21 | 0.75 |  |
| 164 | Lucian | -0.56 | 0.22 | 0.78 |  |
| 165 | Miss Fortune | -0.57 | 0.22 | 0.79 |  |
| 166 | Jhin | -0.60 | 0.18 | 0.78 |  |
| 167 | Nunu & Willump | -0.64 | 0.64 | 1.28 |  |
| 168 | Karthus | -0.72 | 0.12 | 0.84 |  |
| 169 | Katarina | -0.72 | 0.00 | 0.72 |  |
| 170 | Pantheon | -0.73 | 0.74 | 1.47 |  |
| 171 | Ryze | -0.89 | 0.16 | 1.05 |  |
| 172 | Naafiri | -1.23 | 0.00 | 1.23 |  |
