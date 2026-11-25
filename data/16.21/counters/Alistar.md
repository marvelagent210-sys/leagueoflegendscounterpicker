# Counters to Alistar (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Alistar: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Alistar wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Alistar --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.86 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.48 |
| 2 | Olaf | +0.86 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.58 |
| 3 | Trundle | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.59 |
| 4 | Jayce | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.30 |
| 5 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.58 |
| 6 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.64 |
| 7 | Kog'Maw | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.28 |
| 8 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.34 |
| 9 | Zeri | +0.83 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.28 |
| 10 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.17 |
| 11 | Lulu | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.12 |
| 12 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.33 |
| 13 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.60 |
| 14 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.29 |
| 15 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.25 |
| 16 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.10 |
| 17 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.04 |
| 18 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.16 |
| 19 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 20 | Janna | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.12 |
| 21 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.44 |
| 22 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.30 |
| 23 | Urgot | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.14 |
| 24 | Orianna | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.01 |
| 25 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.23 |
| 26 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.02 |
| 27 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.13 |
| 28 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.28 |
| 29 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.05 |
| 30 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.03 |
| 31 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.69 |
| 32 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.33 |
| 33 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.15 |
| 34 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.14 |
| 35 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.22 |
| 36 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.14 |
| 37 | Kai'Sa | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.16 |
| 38 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.44 |
| 39 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.11 |
| 40 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.10 |
| 41 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.16 |
| 42 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.30 |
| 43 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.04 |
| 44 | Ezreal | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.13 |
| 45 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.12 |
| 46 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.33 |
| 47 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.33 |
| 48 | Karma | +0.79 | +0.99 | +0.96 | +1.00 | −0.02 | +1.00 | +0.09 |
| 49 | Quinn | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | −0.25 |
| 50 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.03 |
| 51 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.14 |
| 52 | Irelia | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.09 |
| 53 | Xin Zhao | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.01 |
| 54 | Rek'Sai | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.04 |
| 55 | Shen | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.03 |
| 56 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.13 |
| 57 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.01 |
| 58 | Yunara | +0.78 | +0.90 | +1.00 | +1.00 | +0.04 | +1.00 | −0.01 |
| 59 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.11 |
| 60 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.01 |
| 61 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.09 |
| 62 | Maokai | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.09 |
| 63 | Viego | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.01 |
| 64 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.04 |
| 65 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.12 |
| 66 | Bel'Veth | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.15 |
| 67 | Warwick | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.00 |
| 68 | Volibear | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.05 |
| 69 | Morgana | +0.75 | +1.00 | +0.91 | +0.91 | −0.02 | +1.00 | −0.11 |
| 70 | Zac | +0.73 | +1.00 | +1.00 | +1.00 | −0.21 | – | −0.15 |
| 71 | Elise | +0.68 | +1.00 | +1.00 | +1.00 | +0.03 | −0.14 | −0.20 |
| 72 | Smolder | +0.62 | +1.00 | +1.00 | +1.00 | +0.13 | −1.00 | −0.02 |
| 73 | Miss Fortune | +0.61 | +1.00 | +1.00 | +1.00 | +0.04 | −1.00 | +0.14 |
| 74 | Shyvana | +0.61 | +1.00 | +1.00 | +1.00 | +0.04 | −1.00 | +0.04 |
| 75 | Ornn | +0.54 | +0.11 | +1.00 | +1.00 | +0.09 | – | −0.05 |
| 76 | Jinx | +0.41 | +0.96 | +0.59 | +0.59 | +0.03 | −1.00 | −0.13 |
| 77 | Gragas | +0.39 | +0.03 | +0.58 | +1.00 | −0.01 | – | +0.08 |
| 78 | Tahm Kench | +0.33 | +0.93 | +0.17 | +0.17 | −0.01 | – | −0.17 |
| 79 | Caitlyn | +0.33 | +0.52 | +0.65 | +0.65 | +0.00 | −0.81 | −0.17 |
| 80 | Camille | +0.33 | +1.00 | +1.00 | −1.00 | −0.11 | – | +0.23 |
| 81 | Lucian | +0.32 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.42 |
| 82 | Sion | +0.27 | +1.00 | +0.00 | +0.00 | −0.07 | – | +0.06 |
| 83 | Samira | +0.25 | +0.76 | −1.00 | +1.00 | −0.00 | +1.00 | +0.18 |
| 84 | Sejuani | +0.23 | −1.00 | +1.00 | +1.00 | +0.04 | – | +0.06 |
| 85 | Kennen | +0.22 | −0.82 | +1.00 | +1.00 | −0.08 | −0.11 | +0.05 |
| 86 | Riven | +0.22 | −1.00 | +1.00 | +1.00 | −0.04 | – | +0.04 |
| 87 | Lillia | +0.17 | +0.01 | +0.10 | +0.10 | +0.09 | +1.00 | +0.23 |
| 88 | Nilah | +0.14 | −1.00 | +1.00 | +0.00 | +0.32 | +1.00 | −0.13 |
| 89 | Swain | +0.13 | +0.10 | +0.26 | +0.19 | −0.02 | +0.10 | −0.09 |
| 90 | Hwei | +0.09 | −0.09 | +0.07 | −0.05 | +0.04 | +1.00 | −0.03 |
| 91 | Twisted Fate | +0.09 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.22 |
| 92 | Singed | +0.08 | +0.09 | +0.16 | +0.08 | −0.06 | – | +0.01 |
| 93 | Yuumi | +0.07 | −1.00 | +1.00 | +1.00 | −0.07 | −1.00 | −0.33 |
| 94 | Annie | +0.07 | +0.20 | −0.02 | −0.02 | +0.05 | +0.21 | −0.04 |
| 95 | Syndra | +0.05 | −0.04 | +0.16 | −0.04 | +0.11 | +0.11 | +0.05 |
| 96 | Anivia | +0.04 | −0.19 | +0.24 | +0.23 | −0.09 | +0.00 | −0.02 |
| 97 | Zoe | −0.01 | +0.01 | −0.02 | −0.04 | +0.02 | +0.01 | −0.06 |
| 98 | Vel'Koz | −0.06 | +0.10 | +0.01 | −0.04 | +0.13 | −1.00 | +0.10 |
| 99 | Heimerdinger | −0.06 | +0.03 | +0.02 | +0.03 | +0.11 | −1.00 | +0.12 |
| 100 | Leona | −0.08 | −0.06 | −0.10 | −0.10 | −0.04 | – | −0.02 |
| 101 | Jhin | −0.09 | −1.00 | +1.00 | −0.87 | +0.03 | +0.88 | −0.08 |
| 102 | Varus | −0.11 | +1.00 | −1.00 | −1.00 | −0.02 | +1.00 | −0.07 |
| 103 | Soraka | −0.12 | −0.14 | −0.15 | −0.12 | +0.00 | −0.21 | −0.17 |
| 104 | Zyra | −0.13 | −0.00 | −0.06 | −0.08 | +0.02 | −1.00 | +0.01 |
| 105 | Karthus | −0.17 | −0.22 | −0.22 | −0.22 | +0.06 | −0.32 | +0.09 |
| 106 | Nami | −0.20 | −0.20 | −0.12 | −0.11 | +0.01 | −1.00 | −0.07 |
| 107 | Vi | −0.23 | +1.00 | −1.00 | −1.00 | −0.03 | – | −0.07 |
| 108 | Draven | −0.25 | +0.43 | −1.00 | −1.00 | +0.03 | +1.00 | −0.20 |
| 109 | Aatrox | −0.25 | −1.00 | +1.00 | −1.00 | −0.10 | – | −0.15 |
| 110 | Lux | −0.25 | −0.07 | −0.11 | −0.56 | −0.00 | −1.00 | +0.06 |
| 111 | Wukong | −0.37 | −1.00 | −1.00 | +1.00 | −0.14 | – | −0.27 |
| 112 | Yone | −0.39 | +0.45 | −1.00 | −1.00 | −0.08 | – | −0.05 |
| 113 | Twitch | −0.40 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | −0.06 |
| 114 | Zilean | −0.41 | −1.00 | −1.00 | +1.00 | −0.04 | −1.00 | −0.06 |
| 115 | Lissandra | −0.44 | −1.00 | −0.21 | −0.59 | −0.01 | −0.16 | −0.01 |
| 116 | Renata Glasc | −0.47 | +0.34 | −1.00 | −1.00 | +0.05 | −1.00 | −0.25 |
| 117 | Viktor | −0.53 | +0.04 | −1.00 | −1.00 | +0.03 | −1.00 | +0.10 |
| 118 | Master Yi | −0.58 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.45 |
| 119 | Veigar | −0.61 | −0.22 | −1.00 | −1.00 | −0.03 | −1.00 | −0.10 |
| 120 | Bard | −0.62 | −0.23 | −1.00 | −1.00 | −0.01 | −1.00 | −0.16 |
| 121 | Senna | −0.62 | −1.00 | −1.00 | −0.12 | +0.01 | −1.00 | −0.02 |
| 122 | Aurelion Sol | −0.69 | −1.00 | −1.00 | −1.00 | +0.25 | −0.23 | −0.07 |
| 123 | Vex | −0.70 | −0.98 | −0.59 | −1.00 | −0.01 | −1.00 | −0.06 |
| 124 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.31 |
| 125 | Ambessa | −0.72 | −1.00 | −1.00 | −1.00 | +0.36 | – | +0.06 |
| 126 | Fizz | −0.74 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.30 |
| 127 | Zed | −0.75 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.47 |
| 128 | Hecarim | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.07 |
| 129 | Kassadin | −0.75 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.26 |
| 130 | Kha'Zix | −0.75 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.48 |
| 131 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.17 |
| 132 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.10 |
| 133 | Rumble | −0.76 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.37 |
| 134 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.07 |
| 135 | Nocturne | −0.77 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.37 |
| 136 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.09 |
| 137 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 138 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.04 |
| 139 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.00 |
| 140 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.06 |
| 141 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.11 |
| 142 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.06 |
| 143 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.17 |
| 144 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.02 |
| 145 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 146 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.11 |
| 147 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.05 |
| 148 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.03 |
| 149 | Pyke | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.08 |
| 150 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.13 |
| 151 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.08 |
| 152 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.08 |
| 153 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.12 |
| 154 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.08 |
| 155 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.20 |
| 156 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.09 |
| 157 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.21 |
| 158 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.02 |
| 159 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.05 |
| 160 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.08 |
| 161 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.13 |
| 162 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.09 |
| 163 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.11 |
| 164 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.03 |
| 165 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.13 |
| 166 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.03 |
| 167 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.00 |
| 168 | Mel | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.17 |
| 169 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.21 |
| 170 | Ryze | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.32 |
| 171 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.26 |
| 172 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.41 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Alistar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Alistar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Alistar` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.38)

- **0.59** spell shield: Spell Shield's spell shield blocks Alistar's Headbutt. Spell shield for 1.5 s, long enough to use ahead of Headbutt. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Alistar W Headbutt)
- **0.51** spell shield: Spell Shield's spell shield blocks Alistar's Pulverize. Spell shield for 1.5 s, long enough to use ahead of Pulverize. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Alistar Q Pulverize)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Alistar's (500 vs 125 attack range). Alistar closes the gap with Headbutt. (Sivir basic attacks → Alistar basic attacks)

#### 2. Vladimir (net +0.97)

- **0.62** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Headbutt. Untargetable for 2 s, long enough to use ahead of Headbutt. (Vladimir W Sanguine Pool → Alistar W Headbutt)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Pulverize. Untargetable for 2 s, long enough to use ahead of Pulverize. (Vladimir W Sanguine Pool → Alistar Q Pulverize)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Alistar's Trample. Untargetable for 2 s, long enough to use ahead of Trample. (Vladimir W Sanguine Pool → Alistar E Trample)
- Watch out: Pulverize's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Fiora (net +0.95)

- **0.72** parry: Riposte parries Alistar's Headbutt and stuns back. Parry for 0.75 s; Headbutt takes 0.54 s to land, enough to react. Negating Headbutt's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar W Headbutt)
- **0.64** parry: Riposte parries Alistar's Pulverize and stuns back. Parry for 0.75 s; Pulverize takes 0.25 s to land, enough to react. Negating Pulverize's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar Q Pulverize)
- **0.43** parry: Riposte parries Alistar's Trample and stuns back. Parry for 0.75 s; Trample lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Trample's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Fiora's Riposte (cripple, slow, stun) after it lands.

#### 4. Udyr (net +0.94)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Headbutt (airborne, stun). Immune for 1.5 s, long enough to use ahead of Headbutt. (Udyr E Blazing Stampede → Alistar W Headbutt)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Pulverize (airborne, stun). Immune for 1.5 s, long enough to use ahead of Pulverize. (Udyr E Blazing Stampede → Alistar Q Pulverize)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Alistar's Trample (stun). Immune for 1.5 s, long enough to use ahead of Trample. (Udyr E Blazing Stampede → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Udyr's Blazing Stampede (stun) after it lands.

#### 5. Nocturne (net +0.87)

- **0.72** spell shield: Shroud of Darkness's spell shield blocks Alistar's Headbutt. Spell shield for 1.5 s, long enough to use ahead of Headbutt. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Alistar W Headbutt)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Alistar's Pulverize. Spell shield for 1.5 s, long enough to use ahead of Pulverize. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Alistar Q Pulverize)
- **0.32** spell shield: Shroud of Darkness's spell shield blocks part of Alistar's Trample. Spell shield for 1.5 s, long enough to use ahead of Trample. A spell shield blocks only the first enemy ability that reaches it. The on-hit effect can be blocked by spell shield, but the attack cannot. {{{{{1<noinclude>|Ability data</noinclude>}}}|Trample|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Alistar
|skill        = E
|icon         = Trample.png
|description  = {{sbc|Active:}} '''Alistar''' tramples the ground around him every {{fd|0.5}} seconds over 5 seconds, becoming {{tip|ghosted}} and dealing {{as|magic damage}} to nearby enemies. Each time this damages at least one enemy champion, he generates a {{tip|stack}} of ''Trample'' that lasts for the remaining duration, stacking up to 5 times.
|icon2        = Alistar Trample Indicator.png
|leveling     = {{st|Magic Damage Per Tick|{{ap|80/10 to 200/10}} {{as|(+ {{ap|70/10}}% AP)}}|Total Magic Damage|{{ap|80 to 200}} {{as|(+ 70% AP)}}}}
|description2 = At 5 stacks, '''Alistar's''' next {{tip|basic attack}} {{tip|on-hit}} against a {{tip|champion}} within 6 seconds ends ''Trample's'' effects to deal {{as|{{pplevel|20 to 275}} '''bonus''' magic damage}} and {{tip|stun}} the target for 1 second.
|effect radius= {{tip|cr|icononly = true}} 350
|cooldown     = {{ap|12 to 10}}
|cdstart      = on-cast
|cost         = {{ap|50 to 70}}
|costtype     = mana
|cast time    = none
|targeting    = Auto
|affects      = Self, Enemies
|damagetype   = Magic
|spellshield  = Special
|spelleffects = Special
|parry        = Special
|notes        = 
* The on-hit effect is single-use and '''Alistar's''' buff is removed as soon as it is consumed; it can only be applied once by the triggering attack instance.
** For example, {{iis|Guinsoo's Rageblade}} Phantom Hit can trigger it if the triggering attack did not, but cannot apply it again if the triggering attack consumed it.
* The on-hit effect can be blocked by {{tip|spell shield}}, but the attack cannot.
* The on-hit effect is consumed if the attack is {{tip|blocked}}, but not if it is {{tip|dodged}} or missed while '''Alistar''' is {{tip|blind|blinded}}. In all cases, the attack's effects are negated as normal.
<!-- Damage -->
|damage       = true
|damagedetails=
{{Infobox damage
|dtitle      = Alistar - Trample: Shockwave
|dtype       = m
|dtags       = ability,area,periodic
|dproperties = 
|dnotes      = 
}}
{{Infobox damage
|dtitle      = Alistar - Trample: Attack
|dtype       = p
|dtags       = basic
|dproperties = ApplyLifesteal = true, EnableCallForHelp = true , RespectDodge = true, TriggerOnHitEvents = true,
|dnotes       = * Refers to this alternative attack's main damage to the primary target, and thus copies all properties of the basic attack.
** It can {{tip|blind|miss}} if the user is blinded.
}}
{{Infobox damage
|dtitle      = Alistar - Trample: Bonus Damage
|dtype       = m
|dtags       = ability
|dproperties = 
|dnotes      = * Does not apply if the triggering attack is {{tip|dodge|dodged}}, {{tip|block|blocked}} or {{tip|blind|misses}}.
}}

<!-- Blurb -->
|blurb        = {{sbc|Active:}} {{ci|Alistar}} becomes {{tip|ghosted}} and continually deals {{as|magic damage}} to nearby enemies. He generates a stack of ''Trample'' each time this damages at least one {{tip|champion}}.
|blurb2       = At max stacks, his next {{tip|basic attack}} against a {{tip|champion}} within a few seconds will deal {{as|'''bonus''' magic damage}} and {{tip|stun}} them.
}}. (Nocturne W Shroud of Darkness → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Nocturne's Unspeakable Horror (fear, slow) after it lands.

#### 6. Gwen (net +0.81)

- **0.59** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Headbutt. Untargetable for ?; Headbutt takes 0.54 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar W Headbutt)
- **0.51** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Pulverize. Untargetable for ?; Pulverize takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar Q Pulverize)
- **0.31** untargetable: Hallowed Mist makes Gwen untargetable, dodging Alistar's Trample. Untargetable for ?; Trample lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Gwen's Needlework (slow) after it lands.

#### 7. Rengar (net +0.79)

- **0.64** cleanse: Battle Roar cleanses Alistar's Headbutt (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar W Headbutt)
- **0.56** cleanse: Battle Roar cleanses Alistar's Pulverize (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar Q Pulverize)
- **0.56** cleanse: Battle Roar cleanses Alistar's Trample (stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Rengar's Bola Strike (slow, root) after it lands.

#### 8. Teemo (net +0.76)

- **0.43** blind: Blinding Dart's blind makes Alistar's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Alistar basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Alistar's (500 vs 125 attack range). Alistar closes the gap with Headbutt. (Teemo basic attacks → Alistar basic attacks)
- **0.23** blind: Blinding Dart's blind makes Alistar's Trample, an empowered attack, miss. Blind for 3 s. The on-hit effect can be blocked by spell shield, but the attack cannot. The on-hit effect is consumed if the attack is blocked, but not if it is dodged or missed while Alistar is blinded. In all cases, the attack's effects are negated as normal. (Teemo Q Blinding Dart → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Teemo's Blinding Dart (blind) after it lands.

#### 9. Gangplank (net +0.75)

- **0.53** cleanse: Remove Scurvy cleanses Alistar's Headbutt (airborne, stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Alistar W Headbutt)
- **0.46** cleanse: Remove Scurvy cleanses Alistar's Pulverize (airborne, stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Alistar Q Pulverize)
- **0.46** cleanse: Remove Scurvy cleanses Alistar's Trample (stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Alistar E Trample)
- Watch out: Unbreakable Will cleanses Gangplank's Cannon Barrage (slow) after it lands.

#### 10. Xayah (net +0.73)

- **0.38** range: Xayah's basic attacks reach 400 units farther than Alistar's (525 vs 125 attack range). Alistar closes the gap with Headbutt. (Xayah basic attacks → Alistar basic attacks)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Alistar's Headbutt. Untargetable for 1.5 s, long enough to use ahead of Headbutt. (Xayah R Featherstorm → Alistar W Headbutt)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Alistar's Pulverize. Untargetable for 1.5 s, long enough to use ahead of Pulverize. (Xayah R Featherstorm → Alistar Q Pulverize)
- Watch out: Unbreakable Will cleanses Xayah's Bladecaller (root) after it lands.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.38 | 1.38 | 0.00 |  |
| 2 | Vladimir | +0.97 | 1.20 | 0.23 |  |
| 3 | Fiora | +0.95 | 1.16 | 0.21 |  |
| 4 | Udyr | +0.94 | 1.33 | 0.39 |  |
| 5 | Nocturne | +0.87 | 1.23 | 0.36 |  |
| 6 | Gwen | +0.81 | 0.92 | 0.11 |  |
| 7 | Rengar | +0.79 | 1.06 | 0.27 |  |
| 8 | Teemo | +0.76 | 0.89 | 0.13 | blind (Blinding Dart) |
| 9 | Gangplank | +0.75 | 0.88 | 0.13 |  |
| 10 | Xayah | +0.73 | 0.99 | 0.26 |  |
| 11 | Aurora | +0.71 | 0.88 | 0.17 |  |
| 12 | Yuumi | +0.64 | 1.58 | 0.94 |  |
| 13 | Morgana | +0.64 | 1.21 | 0.57 |  |
| 14 | Kayle | +0.64 | 0.68 | 0.04 |  |
| 15 | Milio | +0.63 | 0.90 | 0.27 |  |
| 16 | Olaf | +0.59 | 0.63 | 0.04 |  |
| 17 | Fizz | +0.57 | 1.25 | 0.68 |  |
| 18 | Zed | +0.53 | 0.58 | 0.05 |  |
| 19 | Master Yi | +0.46 | 0.92 | 0.46 |  |
| 20 | Vex | +0.45 | 0.70 | 0.25 |  |
| 21 | Kindred | +0.43 | 0.47 | 0.04 |  |
| 22 | Zeri | +0.40 | 0.44 | 0.04 |  |
| 23 | Jinx | +0.39 | 0.69 | 0.30 | dash stop (Flame Chompers!) |
| 24 | Twitch | +0.39 | 0.43 | 0.04 |  |
| 25 | Viktor | +0.38 | 0.66 | 0.28 |  |
| 26 | Rek'Sai | +0.38 | 0.64 | 0.26 |  |
| 27 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 28 | Singed | +0.37 | 0.63 | 0.26 |  |
| 29 | Maokai | +0.35 | 1.25 | 0.90 |  |
| 30 | Evelynn | +0.33 | 0.60 | 0.27 |  |
| 31 | Corki | +0.32 | 0.32 | 0.00 |  |
| 32 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 33 | Ahri | +0.31 | 0.58 | 0.27 |  |
| 34 | Yunara | +0.30 | 0.36 | 0.06 |  |
| 35 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 36 | Shaco | +0.29 | 0.60 | 0.31 |  |
| 37 | Veigar | +0.29 | 0.57 | 0.28 |  |
| 38 | Nasus | +0.29 | 0.33 | 0.04 |  |
| 39 | Bard | +0.26 | 0.99 | 0.73 |  |
| 40 | Jax | +0.26 | 0.52 | 0.26 |  |
| 41 | Garen | +0.25 | 0.35 | 0.10 |  |
| 42 | Kog'Maw | +0.23 | 0.27 | 0.04 |  |
| 43 | Zaahen | +0.20 | 0.60 | 0.40 |  |
| 44 | Smolder | +0.19 | 0.32 | 0.13 |  |
| 45 | Graves | +0.19 | 0.24 | 0.05 |  |
| 46 | Hwei | +0.17 | 0.63 | 0.46 | dash stop (Grim Visage) |
| 47 | Vayne | +0.16 | 0.43 | 0.27 |  |
| 48 | Samira | +0.13 | 0.30 | 0.17 |  |
| 49 | Draven | +0.09 | 0.36 | 0.27 |  |
| 50 | Lissandra | +0.08 | 0.87 | 0.79 |  |
| 51 | Kennen | +0.08 | 0.29 | 0.21 |  |
| 52 | Illaoi | +0.08 | 0.12 | 0.04 |  |
| 53 | Elise | +0.05 | 0.32 | 0.27 |  |
| 54 | LeBlanc | +0.05 | 0.22 | 0.17 |  |
| 55 | Zoe | +0.04 | 0.32 | 0.28 |  |
| 56 | Zilean | +0.03 | 0.32 | 0.29 |  |
| 57 | Kalista | +0.02 | 0.80 | 0.78 |  |
| 58 | Senna | +0.02 | 0.32 | 0.30 |  |
| 59 | Mel | +0.01 | 0.27 | 0.26 |  |
| 60 | Annie | +0.01 | 0.22 | 0.21 |  |
| 61 | Jayce | 0.00 | 0.30 | 0.30 |  |
| 62 | Lux | 0.00 | 0.29 | 0.29 |  |
| 63 | Cassiopeia | -0.04 | 0.60 | 0.64 |  |
| 64 | Talon | -0.04 | 0.00 | 0.04 |  |
| 65 | Lulu | -0.05 | 0.66 | 0.71 |  |
| 66 | Soraka | -0.05 | 0.27 | 0.32 |  |
| 67 | Akali | -0.05 | 0.00 | 0.05 |  |
| 68 | Dr. Mundo | -0.05 | 0.00 | 0.05 |  |
| 69 | Kassadin | -0.05 | 0.00 | 0.05 |  |
| 70 | Tryndamere | -0.05 | 0.00 | 0.05 |  |
| 71 | Kha'Zix | -0.06 | 0.00 | 0.06 |  |
| 72 | Nilah | -0.09 | 0.55 | 0.64 |  |
| 73 | Ziggs | -0.09 | 0.27 | 0.36 |  |
| 74 | Brand | -0.09 | 0.22 | 0.31 |  |
| 75 | Syndra | -0.09 | 0.22 | 0.31 |  |
| 76 | Swain | -0.10 | 0.21 | 0.31 |  |
| 77 | Locke | -0.13 | 0.00 | 0.13 |  |
| 78 | Rumble | -0.13 | 0.00 | 0.13 |  |
| 79 | Karma | -0.16 | 0.22 | 0.38 |  |
| 80 | Ashe | -0.20 | 0.36 | 0.56 |  |
| 81 | Lucian | -0.20 | 0.36 | 0.56 |  |
| 82 | Anivia | -0.20 | 0.24 | 0.44 |  |
| 83 | Ekko | -0.20 | 0.00 | 0.20 |  |
| 84 | Heimerdinger | -0.21 | 0.20 | 0.41 |  |
| 85 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 86 | Gnar | -0.22 | 0.33 | 0.55 |  |
| 87 | Kled | -0.23 | 0.70 | 0.93 |  |
| 88 | Sona | -0.23 | 0.41 | 0.64 |  |
| 89 | Mordekaiser | -0.24 | 0.08 | 0.32 |  |
| 90 | Renekton | -0.26 | 0.00 | 0.26 |  |
| 91 | Taric | -0.27 | 0.00 | 0.27 |  |
| 92 | Sion | -0.28 | 0.66 | 0.94 |  |
| 93 | Shyvana | -0.28 | 0.12 | 0.40 |  |
| 94 | Irelia | -0.28 | 0.05 | 0.33 |  |
| 95 | Miss Fortune | -0.29 | 0.32 | 0.61 |  |
| 96 | Thresh | -0.29 | 0.19 | 0.48 |  |
| 97 | Yorick | -0.29 | 0.00 | 0.29 |  |
| 98 | Bel'Veth | -0.30 | 0.00 | 0.30 |  |
| 99 | Tristana | -0.31 | 0.36 | 0.67 |  |
| 100 | Cho'Gath | -0.31 | 0.00 | 0.31 |  |
| 101 | Darius | -0.31 | 0.00 | 0.31 |  |
| 102 | Trundle | -0.32 | 0.00 | 0.32 |  |
| 103 | Quinn | -0.33 | 0.38 | 0.71 |  |
| 104 | Aatrox | -0.34 | 0.00 | 0.34 |  |
| 105 | Varus | -0.35 | 0.43 | 0.78 |  |
| 106 | Volibear | -0.36 | 0.12 | 0.48 |  |
| 107 | Azir | -0.39 | 0.27 | 0.66 |  |
| 108 | Orianna | -0.39 | 0.27 | 0.66 |  |
| 109 | Camille | -0.40 | 0.60 | 1.00 |  |
| 110 | Aphelios | -0.40 | 0.38 | 0.78 |  |
| 111 | Katarina | -0.40 | 0.16 | 0.56 |  |
| 112 | Sylas | -0.40 | 0.00 | 0.40 |  |
| 113 | Renata Glasc | -0.42 | 0.38 | 0.80 |  |
| 114 | Karthus | -0.42 | 0.19 | 0.61 |  |
| 115 | Malzahar | -0.43 | 1.06 | 1.49 |  |
| 116 | Ivern | -0.45 | 0.19 | 0.64 |  |
| 117 | Blitzcrank | -0.45 | 0.00 | 0.45 |  |
| 118 | Xin Zhao | -0.49 | 0.30 | 0.79 |  |
| 119 | Seraphine | -0.49 | 0.29 | 0.78 |  |
| 120 | Caitlyn | -0.50 | 0.36 | 0.86 |  |
| 121 | Malphite | -0.51 | 0.32 | 0.83 |  |
| 122 | Twisted Fate | -0.52 | 0.43 | 0.95 |  |
| 123 | Riven | -0.53 | 0.00 | 0.53 |  |
| 124 | Zyra | -0.54 | 0.24 | 0.78 |  |
| 125 | Nami | -0.55 | 0.22 | 0.77 |  |
| 126 | Lillia | -0.55 | 0.11 | 0.66 |  |
| 127 | Kayn | -0.56 | 0.60 | 1.16 |  |
| 128 | Neeko | -0.56 | 0.22 | 0.78 |  |
| 129 | Lee Sin | -0.56 | 0.00 | 0.56 |  |
| 130 | Urgot | -0.62 | 0.15 | 0.77 |  |
| 131 | Jhin | -0.63 | 0.27 | 0.90 |  |
| 132 | Vel'Koz | -0.63 | 0.27 | 0.90 |  |
| 133 | Diana | -0.64 | 0.00 | 0.64 |  |
| 134 | Wukong | -0.64 | 0.00 | 0.64 |  |
| 135 | Yasuo | -0.64 | 0.00 | 0.64 |  |
| 136 | Yone | -0.66 | 0.31 | 0.97 |  |
| 137 | Xerath | -0.66 | 0.27 | 0.93 |  |
| 138 | Amumu | -0.66 | 0.18 | 0.84 |  |
| 139 | Poppy | -0.70 | 0.50 | 1.20 | dash stop (Steadfast Presence) |
| 140 | Rakan | -0.70 | 0.13 | 0.83 |  |
| 141 | Ryze | -0.72 | 0.24 | 0.96 |  |
| 142 | Aurelion Sol | -0.73 | 0.22 | 0.95 |  |
| 143 | Skarner | -0.75 | 0.00 | 0.75 |  |
| 144 | Braum | -0.76 | 0.00 | 0.76 |  |
| 145 | Shen | -0.78 | 0.52 | 1.30 |  |
| 146 | Leona | -0.78 | 0.00 | 0.78 |  |
| 147 | Qiyana | -0.78 | 0.00 | 0.78 |  |
| 148 | Sett | -0.82 | 0.12 | 0.94 |  |
| 149 | Ambessa | -0.82 | 0.00 | 0.82 |  |
| 150 | Pyke | -0.82 | 0.00 | 0.82 |  |
| 151 | K'Sante | -0.83 | 0.23 | 1.06 |  |
| 152 | Jarvan IV | -0.83 | 0.12 | 0.95 |  |
| 153 | Hecarim | -0.85 | 0.12 | 0.97 |  |
| 154 | Nautilus | -0.85 | 0.00 | 0.85 |  |
| 155 | Pantheon | -0.90 | 0.49 | 1.39 |  |
| 156 | Ornn | -0.90 | 0.12 | 1.02 |  |
| 157 | Sejuani | -0.90 | 0.00 | 0.90 |  |
| 158 | Rell | -0.98 | 0.00 | 0.98 |  |
| 159 | Briar | -1.00 | 0.00 | 1.00 |  |
| 160 | Fiddlesticks | -1.03 | 0.20 | 1.23 |  |
| 161 | Naafiri | -1.08 | 0.00 | 1.08 |  |
| 162 | Gragas | -1.12 | 0.00 | 1.12 |  |
| 163 | Rammus | -1.14 | 0.32 | 1.46 |  |
| 164 | Viego | -1.22 | 0.21 | 1.43 |  |
| 165 | Janna | -1.23 | 0.36 | 1.59 |  |
| 166 | Warwick | -1.42 | 0.75 | 2.17 |  |
| 167 | Nunu & Willump | -1.42 | 0.00 | 1.42 |  |
| 168 | Zac | -1.43 | 0.40 | 1.83 | dash stop (Stretching Strikes) |
| 169 | Vi | -1.62 | 0.12 | 1.74 |  |
| 170 | Taliyah | -1.66 | 0.27 | 1.93 |  |
| 171 | Tahm Kench | -1.85 | 0.00 | 1.85 |  |
| 172 | Galio | -2.23 | 0.00 | 2.23 |  |
