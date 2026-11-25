# Counters to Nilah (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nilah: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nilah wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nilah --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.89 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.66 |
| 2 | Urgot | +0.87 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.33 |
| 3 | Nocturne | +0.86 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.86 |
| 4 | Malphite | +0.85 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.42 |
| 5 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.57 |
| 6 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.76 |
| 7 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.29 | – | +0.07 |
| 8 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.23 |
| 9 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.01 |
| 10 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.76 |
| 11 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.41 |
| 12 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.15 |
| 13 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.13 |
| 14 | Cassiopeia | +0.81 | +0.95 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 15 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | −0.61 |
| 16 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.04 |
| 17 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.08 |
| 18 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.01 |
| 19 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.05 |
| 20 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.01 |
| 21 | Singed | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.09 |
| 22 | Illaoi | +0.77 | +1.00 | +0.82 | +1.00 | +0.21 | +0.94 | −0.17 |
| 23 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +0.38 |
| 24 | Graves | +0.77 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.82 |
| 25 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.76 |
| 26 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | −0.02 |
| 27 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.31 | +1.00 | +0.37 |
| 28 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | −0.17 |
| 29 | Fiora | +0.75 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.29 |
| 30 | Morgana | +0.75 | +1.00 | +1.00 | +1.00 | −0.07 | +0.66 | −0.10 |
| 31 | Olaf | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | +0.50 | +0.38 |
| 32 | Ivern | +0.72 | +1.00 | +1.00 | +1.00 | −0.33 | +1.00 | −0.57 |
| 33 | Diana | +0.72 | +1.00 | +1.00 | +1.00 | −0.32 | – | −0.10 |
| 34 | Tryndamere | +0.72 | +1.00 | +1.00 | +1.00 | −0.45 | – | +0.27 |
| 35 | Aatrox | +0.72 | +1.00 | +1.00 | +1.00 | −0.16 | – | −0.65 |
| 36 | Wukong | +0.71 | +1.00 | +1.00 | +1.00 | −0.51 | – | +0.38 |
| 37 | Kennen | +0.68 | +0.99 | +0.81 | +1.00 | −0.51 | +1.00 | +0.19 |
| 38 | Ambessa | +0.68 | +1.00 | +0.50 | +1.00 | −0.13 | +1.00 | +0.54 |
| 39 | Sion | +0.68 | +0.90 | +0.98 | +0.50 | +0.00 | – | +0.80 |
| 40 | Quinn | +0.65 | +1.00 | +1.00 | +1.00 | −0.08 | +0.00 | −0.70 |
| 41 | Ashe | +0.62 | +1.00 | +1.00 | +0.00 | +0.17 | +1.00 | −0.12 |
| 42 | Neeko | +0.62 | +1.00 | +1.00 | +0.00 | +0.13 | +1.00 | +0.01 |
| 43 | Yone | +0.62 | +0.52 | +1.00 | +1.00 | −0.08 | – | −0.29 |
| 44 | Aphelios | +0.58 | +1.00 | +1.00 | +0.00 | +0.11 | +1.00 | −0.72 |
| 45 | Jhin | +0.58 | +1.00 | +1.00 | +0.00 | −0.02 | +1.00 | −0.36 |
| 46 | Tristana | +0.58 | +1.00 | +1.00 | +0.00 | +0.06 | +1.00 | −0.59 |
| 47 | Braum | +0.53 | +1.00 | +0.03 | +1.00 | −0.13 | +1.00 | −0.17 |
| 48 | Shyvana | +0.53 | +1.00 | +1.00 | +0.00 | −0.14 | – | −0.11 |
| 49 | Darius | +0.51 | +1.00 | +1.00 | +0.00 | −0.27 | – | +0.04 |
| 50 | Lulu | +0.47 | +1.00 | +0.13 | +1.00 | +0.07 | −0.04 | −0.30 |
| 51 | Fiddlesticks | +0.42 | +1.00 | +1.00 | −1.00 | +0.09 | +1.00 | +0.22 |
| 52 | Miss Fortune | +0.41 | +1.00 | +1.00 | −1.00 | +0.09 | +1.00 | −0.12 |
| 53 | Milio | +0.40 | +1.00 | +1.00 | −1.00 | +0.03 | +0.96 | −0.06 |
| 54 | Viego | +0.40 | +1.00 | +1.00 | −0.50 | −0.22 | – | −0.22 |
| 55 | Xin Zhao | +0.38 | +0.64 | +0.54 | +0.54 | −0.27 | – | −0.38 |
| 56 | Brand | +0.36 | +0.86 | +0.58 | −0.24 | +0.07 | +0.55 | −0.35 |
| 57 | Jayce | +0.31 | −1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.03 |
| 58 | Sett | +0.29 | +1.00 | −1.00 | +1.00 | −0.03 | +1.00 | −0.05 |
| 59 | Gnar | +0.27 | +0.38 | +0.41 | +1.00 | −0.03 | −1.00 | −0.48 |
| 60 | Camille | +0.27 | +1.00 | −1.00 | +1.00 | −0.42 | +1.00 | +0.63 |
| 61 | Vi | +0.26 | +1.00 | −1.00 | +1.00 | −0.17 | +1.00 | −0.33 |
| 62 | Garen | +0.24 | +0.00 | +0.00 | +1.00 | +0.09 | – | +0.12 |
| 63 | Elise | +0.21 | +1.00 | +1.00 | −1.00 | +0.04 | −1.00 | +0.02 |
| 64 | Pantheon | +0.20 | −1.00 | +1.00 | +1.00 | −0.21 | – | +0.16 |
| 65 | Karma | +0.20 | −0.67 | +0.49 | +0.93 | +0.06 | +0.57 | −0.21 |
| 66 | Rammus | +0.17 | +1.00 | +1.00 | −1.00 | −0.19 | −1.00 | +0.02 |
| 67 | Samira | +0.16 | +0.00 | +0.00 | +1.00 | −0.04 | −0.14 | −0.47 |
| 68 | Varus | +0.11 | +0.21 | +0.71 | −1.00 | +0.01 | +1.00 | −0.56 |
| 69 | Malzahar | +0.09 | +1.00 | −1.00 | +0.00 | +0.04 | +0.97 | −0.17 |
| 70 | Vel'Koz | +0.08 | −0.11 | −0.28 | +0.77 | +0.27 | −0.16 | −0.09 |
| 71 | Anivia | +0.07 | +0.20 | +0.24 | −0.02 | −0.30 | −0.07 | +0.32 |
| 72 | Corki | −0.06 | +0.00 | −0.47 | +0.00 | +0.08 | +0.53 | −0.11 |
| 73 | Zilean | −0.07 | −1.00 | +0.00 | +1.00 | −0.02 | +0.00 | −0.34 |
| 74 | Mel | −0.12 | +0.25 | +0.07 | −1.00 | −0.05 | +0.32 | −0.47 |
| 75 | Alistar | −0.14 | −1.00 | +1.00 | +0.00 | −0.32 | −1.00 | +0.13 |
| 76 | Kai'Sa | −0.17 | −1.00 | +0.55 | +0.00 | −0.55 | +0.57 | −0.64 |
| 77 | Heimerdinger | −0.17 | −1.00 | −0.30 | +1.00 | +0.05 | −0.34 | −0.38 |
| 78 | Mordekaiser | −0.18 | −0.28 | +0.24 | −0.61 | −0.14 | – | −0.08 |
| 79 | Twitch | −0.21 | +1.00 | −0.50 | −1.00 | +0.02 | −1.00 | −0.76 |
| 80 | Hwei | −0.23 | −0.13 | +0.39 | −1.00 | +0.02 | −1.00 | +0.03 |
| 81 | Irelia | −0.23 | −1.00 | +0.57 | −0.50 | +0.05 | – | −0.20 |
| 82 | Karthus | −0.24 | +0.00 | +0.00 | −1.00 | −0.15 | +0.00 | −0.36 |
| 83 | Rumble | −0.25 | −1.00 | −1.00 | +0.83 | −0.12 | +0.99 | +0.13 |
| 84 | Akshan | −0.27 | +0.00 | −1.00 | +0.00 | +0.01 | +0.00 | −0.34 |
| 85 | Ziggs | −0.28 | +1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.23 |
| 86 | Draven | −0.29 | +0.30 | −1.00 | +0.00 | +0.05 | −1.00 | −0.40 |
| 87 | Veigar | −0.29 | −0.87 | +0.21 | −1.00 | −0.04 | +0.99 | −0.32 |
| 88 | Swain | −0.29 | −0.79 | −0.79 | +0.96 | +0.10 | −0.79 | −0.41 |
| 89 | Azir | −0.30 | +0.00 | +0.00 | −1.00 | +0.01 | −1.00 | −0.05 |
| 90 | Janna | −0.33 | −0.22 | −0.18 | −1.00 | +0.11 | −0.22 | −0.58 |
| 91 | Aurora | −0.33 | −1.00 | +0.00 | −0.98 | +0.08 | +1.00 | +0.04 |
| 92 | Tahm Kench | −0.34 | +0.67 | −1.00 | −1.00 | −0.19 | – | +0.07 |
| 93 | Zaahen | −0.35 | +0.00 | −1.00 | +0.00 | −0.39 | – | −0.14 |
| 94 | Zoe | −0.36 | −0.21 | −0.84 | −0.30 | +0.03 | −0.21 | −0.29 |
| 95 | Twisted Fate | −0.36 | +1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.84 |
| 96 | Bel'Veth | −0.37 | −1.00 | −1.00 | +1.00 | −0.07 | – | −0.43 |
| 97 | Cho'Gath | −0.39 | −1.00 | −1.00 | +1.00 | −0.23 | – | −0.25 |
| 98 | Orianna | −0.40 | −1.00 | −1.00 | +1.00 | +0.04 | −1.00 | −0.21 |
| 99 | Bard | −0.41 | −1.00 | −1.00 | +0.00 | −0.07 | +1.00 | −0.01 |
| 100 | Ahri | −0.41 | −1.00 | −1.00 | +0.52 | +0.02 | −0.29 | +0.19 |
| 101 | Syndra | −0.43 | −1.00 | +0.00 | −1.00 | +0.12 | +0.00 | +0.07 |
| 102 | Kalista | −0.44 | −0.89 | −1.00 | −0.02 | −0.23 | +1.00 | −0.48 |
| 103 | Zed | −0.52 | +0.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.66 |
| 104 | Caitlyn | −0.54 | −0.18 | −1.00 | −1.00 | −0.04 | −0.18 | −0.33 |
| 105 | Jinx | −0.56 | −0.38 | −1.00 | −1.00 | −0.01 | +0.24 | −0.76 |
| 106 | Zeri | −0.56 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | +0.37 |
| 107 | Lux | −0.57 | −1.00 | −0.25 | −1.00 | +0.06 | −0.35 | −0.59 |
| 108 | Kayn | −0.57 | −1.00 | −1.00 | +0.00 | −0.02 | – | −0.22 |
| 109 | Master Yi | −0.57 | −1.00 | −1.00 | +0.00 | −0.37 | −0.50 | +0.67 |
| 110 | Soraka | −0.57 | −1.00 | +0.05 | −1.00 | −0.02 | −1.00 | −0.63 |
| 111 | Ryze | −0.59 | −0.52 | −0.77 | −1.00 | +0.13 | −0.53 | −0.66 |
| 112 | Vex | −0.59 | −1.00 | −1.00 | +0.00 | −0.01 | −1.00 | +0.17 |
| 113 | Rakan | −0.60 | −1.00 | −1.00 | +0.00 | −0.41 | – | +0.38 |
| 114 | Nidalee | −0.62 | −1.00 | −0.13 | −1.00 | −0.06 | −1.00 | −0.64 |
| 115 | Yunara | −0.62 | −1.00 | −1.00 | −1.00 | +0.09 | +0.96 | −0.66 |
| 116 | Naafiri | −0.63 | −1.00 | −1.00 | +0.00 | −0.29 | −1.00 | +0.18 |
| 117 | Senna | −0.65 | −1.00 | −1.00 | −0.30 | +0.12 | −1.00 | −0.23 |
| 118 | Briar | −0.72 | −1.00 | −1.00 | +0.00 | −0.74 | −1.00 | −0.16 |
| 119 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.57 | −1.00 | −0.43 |
| 120 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.19 | – | −0.17 |
| 121 | Nami | −0.77 | −1.00 | −0.83 | −0.86 | −0.01 | −1.00 | −0.66 |
| 122 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.47 |
| 123 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.03 |
| 124 | Taric | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.09 |
| 125 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.17 |
| 126 | Yasuo | −0.79 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.51 |
| 127 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.45 |
| 128 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.04 |
| 129 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.36 | – | +0.73 |
| 130 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.09 |
| 131 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.10 |
| 132 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.21 |
| 133 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.01 |
| 134 | Akali | −0.81 | −1.00 | −0.96 | −1.00 | −0.19 | −1.00 | +0.23 |
| 135 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.33 |
| 136 | Ezreal | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.03 |
| 137 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.69 |
| 138 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.24 |
| 139 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.03 |
| 140 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.04 |
| 141 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.10 |
| 142 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.31 |
| 143 | Rengar | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.05 |
| 144 | Zac | −0.82 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.25 |
| 145 | Maokai | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.14 |
| 146 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.54 |
| 147 | Gragas | −0.82 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | +0.58 |
| 148 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.31 | – | +0.14 |
| 149 | Smolder | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.48 |
| 150 | Galio | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.31 |
| 151 | Lillia | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.18 |
| 152 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.47 |
| 153 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.44 | – | +0.37 |
| 154 | Skarner | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.32 |
| 155 | Taliyah | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.42 |
| 156 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.05 |
| 157 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.20 |
| 158 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.26 |
| 159 | Amumu | −0.84 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.14 |
| 160 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.85 |
| 161 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | −0.10 |
| 162 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.79 |
| 163 | Fizz | −0.85 | −1.00 | −1.00 | −1.00 | −0.38 | – | −0.22 |
| 164 | Leona | −0.86 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | −0.25 |
| 165 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | −0.24 |
| 166 | Kindred | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.54 |
| 167 | Thresh | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.53 |
| 168 | Volibear | −0.86 | −1.00 | −1.00 | −1.00 | −0.48 | – | −0.02 |
| 169 | Ekko | −0.86 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −0.25 |
| 170 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.54 | – | +0.05 |
| 171 | Rell | −0.87 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | −0.20 |
| 172 | Gwen | −0.87 | −1.00 | −1.00 | −1.00 | −0.52 | – | −0.11 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Nilah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nilah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nilah` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Lissandra (net +1.03)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nilah's Apotheosis. Untargetable for 2.5 s, long enough to use ahead of Apotheosis. (Lissandra R Frozen Tomb → Nilah R Apotheosis)
- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nilah's Slipstream. Untargetable for 2.5 s, long enough to use ahead of Slipstream. (Lissandra R Frozen Tomb → Nilah E Slipstream)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Nilah's Slipstream mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Nilah E Slipstream)
- Watch out: Jubilant Veil dodges Lissandra's basic attacks.

#### 2. Vladimir (net +1.01)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nilah's Apotheosis. Untargetable for 2 s, long enough to use ahead of Apotheosis. (Vladimir W Sanguine Pool → Nilah R Apotheosis)
- **0.68** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nilah's Slipstream. Untargetable for 2 s, long enough to use ahead of Slipstream. (Vladimir W Sanguine Pool → Nilah E Slipstream)
- **0.12** range: Vladimir's basic attacks reach 225 units farther than Nilah's (450 vs 225 attack range). Nilah closes the gap with Slipstream. (Vladimir basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Vladimir's basic attacks.

#### 3. Bard (net +0.91)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Nilah's Apotheosis. Untargetable for 2.5 s, long enough to use ahead of Apotheosis. (Bard R Tempered Fate → Nilah R Apotheosis)
- **0.39** untargetable: Tempered Fate makes Bard untargetable, dodging Nilah's Slipstream. Untargetable for 2.5 s, long enough to use ahead of Slipstream. (Bard R Tempered Fate → Nilah E Slipstream)
- **0.26** range: Bard's basic attacks reach 275 units farther than Nilah's (500 vs 225 attack range). Nilah closes the gap with Slipstream. (Bard basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Bard's basic attacks (with Traveler's Call).

#### 4. Xayah (net +0.83)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Nilah's Apotheosis. Untargetable for 1.5 s, long enough to use ahead of Apotheosis. (Xayah R Featherstorm → Nilah R Apotheosis)
- **0.38** untargetable: Featherstorm makes Xayah untargetable, dodging Nilah's Slipstream. Untargetable for 1.5 s, long enough to use ahead of Slipstream. (Xayah R Featherstorm → Nilah E Slipstream)
- **0.29** range: Xayah's basic attacks reach 300 units farther than Nilah's (525 vs 225 attack range). Nilah closes the gap with Slipstream. (Xayah basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Xayah's basic attacks (with Clean Cuts).

#### 5. Sivir (net +0.72)

- **0.64** spell shield: Spell Shield's spell shield blocks Nilah's Slipstream. Spell shield for 1.5 s, long enough to use ahead of Slipstream. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nilah E Slipstream)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Nilah's Apotheosis. Spell shield for 1.5 s, long enough to use ahead of Apotheosis. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the burst damage. (Sivir E Spell Shield → Nilah R Apotheosis)
- **0.34** range: Sivir's basic attacks reach 275 units farther than Nilah's (500 vs 225 attack range). Nilah closes the gap with Slipstream. (Sivir basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Sivir's basic attacks (with Fleet of Foot).

#### 6. Morgana (net +0.71)

- **0.80** cc immunity: Black Shield makes Morgana immune to Nilah's Apotheosis (airborne, slow). Immune for 5 s, long enough to use ahead of Apotheosis. (Morgana E Black Shield → Nilah R Apotheosis)
- **0.13** range: Morgana's basic attacks reach 225 units farther than Nilah's (450 vs 225 attack range). Nilah closes the gap with Slipstream. (Morgana basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Morgana's basic attacks.

#### 7. Rek'Sai (net +0.67)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nilah's Apotheosis. Untargetable for 1.5 s, long enough to use ahead of Apotheosis. (Rek'Sai R Void Rush → Nilah R Apotheosis)
- **0.39** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nilah's Slipstream. Untargetable for 1.5 s, long enough to use ahead of Slipstream. (Rek'Sai R Void Rush → Nilah E Slipstream)
- **0.08** cc immunity: Void Rush is displacement immune, ignoring Nilah's Apotheosis (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Rek'Sai's basic attacks (with Fury of the Xer'Sai).

#### 8. Maokai (net +0.66)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Nilah's Slipstream. Untargetable for 1.4 s; Slipstream takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Nilah E Slipstream)
- **0.48** untargetable: Twisted Advance makes Maokai untargetable, dodging Nilah's Apotheosis. Untargetable for 1.4 s; Apotheosis lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Maokai's basic attacks (with Sap Magic).

#### 9. Nocturne (net +0.60)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Nilah's Slipstream. Spell shield for 1.5 s, long enough to use ahead of Slipstream. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nilah E Slipstream)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Nilah's Apotheosis. Spell shield for 1.5 s, long enough to use ahead of Apotheosis. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the burst damage. (Nocturne W Shroud of Darkness → Nilah R Apotheosis)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Nilah's Apotheosis (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Nilah R Apotheosis)
- Watch out: Jubilant Veil dodges Nocturne's basic attacks (with Umbra Blades).

#### 10. Aurora (net +0.60)

- **0.42** untargetable: Between Worlds makes Aurora untargetable, dodging Nilah's Apotheosis. Untargetable for 0.4 s; Apotheosis lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nilah R Apotheosis)
- **0.38** untargetable: Between Worlds makes Aurora untargetable, dodging Nilah's Slipstream. Untargetable for 0.4 s; Slipstream takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nilah E Slipstream)
- **0.24** range: Aurora's basic attacks reach 325 units farther than Nilah's (550 vs 225 attack range). Nilah closes the gap with Slipstream. (Aurora basic attacks → Nilah basic attacks)
- Watch out: Jubilant Veil dodges Aurora's basic attacks (with Spirit Abjuration).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Lissandra | +1.03 | 1.23 | 0.20 |  |
| 2 | Vladimir | +1.01 | 1.26 | 0.25 |  |
| 3 | Bard | +0.91 | 1.26 | 0.35 |  |
| 4 | Xayah | +0.83 | 1.18 | 0.35 |  |
| 5 | Sivir | +0.72 | 1.18 | 0.46 |  |
| 6 | Morgana | +0.71 | 0.93 | 0.22 |  |
| 7 | Rek'Sai | +0.67 | 1.02 | 0.35 |  |
| 8 | Maokai | +0.66 | 1.04 | 0.38 |  |
| 9 | Nocturne | +0.60 | 1.08 | 0.48 |  |
| 10 | Aurora | +0.60 | 0.87 | 0.27 |  |
| 11 | Singed | +0.58 | 1.08 | 0.50 |  |
| 12 | Teemo | +0.58 | 0.91 | 0.33 | blind (Blinding Dart) |
| 13 | Kayle | +0.56 | 0.96 | 0.40 |  |
| 14 | Yuumi | +0.47 | 1.25 | 0.78 |  |
| 15 | Sion | +0.47 | 0.80 | 0.33 |  |
| 16 | Fiora | +0.46 | 1.00 | 0.54 |  |
| 17 | Gwen | +0.46 | 0.88 | 0.42 |  |
| 18 | Master Yi | +0.44 | 1.08 | 0.64 |  |
| 19 | Fizz | +0.43 | 1.04 | 0.61 |  |
| 20 | Lulu | +0.43 | 0.76 | 0.33 | disarm (Whimsy) |
| 21 | Vex | +0.39 | 0.64 | 0.25 |  |
| 22 | Kalista | +0.38 | 0.75 | 0.37 |  |
| 23 | Hwei | +0.38 | 0.59 | 0.21 | dash stop (Grim Visage) |
| 24 | Ahri | +0.38 | 0.58 | 0.20 | dash stop (Charm) |
| 25 | Cassiopeia | +0.36 | 0.56 | 0.20 |  |
| 26 | Jinx | +0.35 | 0.62 | 0.27 | dash stop (Flame Chompers!) |
| 27 | Veigar | +0.34 | 0.56 | 0.22 |  |
| 28 | Evelynn | +0.28 | 0.68 | 0.40 |  |
| 29 | Zed | +0.26 | 0.61 | 0.35 |  |
| 30 | Olaf | +0.20 | 0.80 | 0.60 |  |
| 31 | Viktor | +0.20 | 0.62 | 0.42 |  |
| 32 | Malzahar | +0.15 | 0.75 | 0.60 |  |
| 33 | Camille | +0.13 | 0.66 | 0.53 |  |
| 34 | Alistar | +0.09 | 0.64 | 0.55 |  |
| 35 | Milio | +0.09 | 0.44 | 0.35 |  |
| 36 | Udyr | +0.07 | 0.80 | 0.73 |  |
| 37 | Heimerdinger | +0.06 | 0.24 | 0.18 |  |
| 38 | Varus | +0.05 | 0.69 | 0.64 |  |
| 39 | Kled | +0.02 | 0.40 | 0.38 |  |
| 40 | Annie | +0.02 | 0.22 | 0.20 |  |
| 41 | Kayn | +0.01 | 0.68 | 0.67 |  |
| 42 | Ashe | +0.01 | 0.34 | 0.33 |  |
| 43 | Gangplank | 0.00 | 0.64 | 0.64 |  |
| 44 | Anivia | 0.00 | 0.22 | 0.22 |  |
| 45 | Yunara | -0.01 | 0.32 | 0.33 |  |
| 46 | Zyra | -0.01 | 0.21 | 0.22 |  |
| 47 | Jax | -0.02 | 0.62 | 0.64 | attack dodge (Counter Strike) |
| 48 | Brand | -0.02 | 0.18 | 0.20 |  |
| 49 | Nami | -0.02 | 0.18 | 0.20 |  |
| 50 | Neeko | -0.02 | 0.18 | 0.20 |  |
| 51 | Syndra | -0.02 | 0.18 | 0.20 |  |
| 52 | Kennen | -0.03 | 0.24 | 0.27 |  |
| 53 | Lux | -0.03 | 0.24 | 0.27 |  |
| 54 | Mel | -0.03 | 0.22 | 0.25 |  |
| 55 | Soraka | -0.03 | 0.22 | 0.25 |  |
| 56 | Ziggs | -0.03 | 0.22 | 0.25 |  |
| 57 | Swain | -0.03 | 0.16 | 0.19 |  |
| 58 | Sona | -0.04 | 0.34 | 0.38 |  |
| 59 | Renata Glasc | -0.04 | 0.31 | 0.35 |  |
| 60 | Corki | -0.04 | 0.26 | 0.30 |  |
| 61 | Zilean | -0.04 | 0.26 | 0.30 |  |
| 62 | Zoe | -0.04 | 0.26 | 0.30 |  |
| 63 | Karma | -0.04 | 0.16 | 0.20 |  |
| 64 | LeBlanc | -0.04 | 0.16 | 0.20 |  |
| 65 | Xin Zhao | -0.05 | 0.55 | 0.60 |  |
| 66 | Twitch | -0.05 | 0.35 | 0.40 |  |
| 67 | Seraphine | -0.05 | 0.22 | 0.27 |  |
| 68 | Orianna | -0.05 | 0.20 | 0.25 |  |
| 69 | Rammus | -0.06 | 0.50 | 0.56 | attack reflect (Defensive Ball Curl) |
| 70 | Zaahen | -0.06 | 0.48 | 0.54 |  |
| 71 | Tristana | -0.06 | 0.36 | 0.42 |  |
| 72 | Kai'Sa | -0.06 | 0.29 | 0.35 |  |
| 73 | Nidalee | -0.06 | 0.22 | 0.28 |  |
| 74 | Gnar | -0.07 | 0.24 | 0.31 |  |
| 75 | Poppy | -0.08 | 0.50 | 0.58 | dash stop (Steadfast Presence) |
| 76 | Samira | -0.08 | 0.22 | 0.30 |  |
| 77 | Aurelion Sol | -0.08 | 0.18 | 0.26 |  |
| 78 | Thresh | -0.09 | 0.13 | 0.22 |  |
| 79 | Senna | -0.10 | 0.30 | 0.40 |  |
| 80 | Yone | -0.10 | 0.28 | 0.38 |  |
| 81 | Shaco | -0.11 | 0.68 | 0.79 |  |
| 82 | Smolder | -0.11 | 0.26 | 0.37 |  |
| 83 | Kindred | -0.12 | 0.34 | 0.46 |  |
| 84 | Elise | -0.13 | 0.26 | 0.39 |  |
| 85 | Ivern | -0.13 | 0.14 | 0.27 |  |
| 86 | Malphite | -0.14 | 0.41 | 0.55 |  |
| 87 | Graves | -0.14 | 0.16 | 0.30 |  |
| 88 | Lillia | -0.15 | 0.05 | 0.20 |  |
| 89 | Ornn | -0.17 | 0.08 | 0.25 |  |
| 90 | Draven | -0.18 | 0.29 | 0.47 |  |
| 91 | Mordekaiser | -0.18 | 0.12 | 0.30 |  |
| 92 | Nasus | -0.19 | 0.50 | 0.69 | attack speed slow (Wither) |
| 93 | Ezreal | -0.19 | 0.26 | 0.45 |  |
| 94 | Amumu | -0.19 | 0.19 | 0.38 |  |
| 95 | Quinn | -0.20 | 0.29 | 0.49 |  |
| 96 | Jayce | -0.20 | 0.22 | 0.42 |  |
| 97 | Vayne | -0.21 | 0.35 | 0.56 |  |
| 98 | Rakan | -0.22 | 0.05 | 0.27 |  |
| 99 | Caitlyn | -0.25 | 0.36 | 0.61 |  |
| 100 | Jarvan IV | -0.25 | 0.08 | 0.33 |  |
| 101 | Azir | -0.27 | 0.20 | 0.47 |  |
| 102 | Sylas | -0.27 | 0.00 | 0.27 |  |
| 103 | Shyvana | -0.28 | 0.08 | 0.36 |  |
| 104 | Urgot | -0.28 | 0.08 | 0.36 |  |
| 105 | Aphelios | -0.29 | 0.39 | 0.68 |  |
| 106 | K'Sante | -0.29 | 0.16 | 0.45 |  |
| 107 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 108 | Pantheon | -0.31 | 0.84 | 1.15 |  |
| 109 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 110 | Katarina | -0.32 | 0.46 | 0.78 |  |
| 111 | Garen | -0.33 | 0.21 | 0.54 |  |
| 112 | Kog'Maw | -0.33 | 0.20 | 0.53 |  |
| 113 | Vel'Koz | -0.33 | 0.20 | 0.53 |  |
| 114 | Lee Sin | -0.33 | 0.00 | 0.33 |  |
| 115 | Rengar | -0.34 | 0.64 | 0.98 |  |
| 116 | Diana | -0.34 | 0.00 | 0.34 |  |
| 117 | Qiyana | -0.34 | 0.00 | 0.34 |  |
| 118 | Aatrox | -0.35 | 0.00 | 0.35 |  |
| 119 | Akali | -0.35 | 0.00 | 0.35 |  |
| 120 | Kha'Zix | -0.35 | 0.00 | 0.35 |  |
| 121 | Xerath | -0.36 | 0.20 | 0.56 |  |
| 122 | Lucian | -0.37 | 0.26 | 0.63 |  |
| 123 | Karthus | -0.37 | 0.13 | 0.50 |  |
| 124 | Yasuo | -0.37 | 0.00 | 0.37 |  |
| 125 | Ryze | -0.38 | 0.19 | 0.57 |  |
| 126 | Skarner | -0.39 | 0.10 | 0.49 |  |
| 127 | Sejuani | -0.39 | 0.00 | 0.39 |  |
| 128 | Shen | -0.40 | 0.60 | 1.00 | attack block (Spirit's Refuge) |
| 129 | Zac | -0.40 | 0.40 | 0.80 | dash stop (Stretching Strikes) |
| 130 | Hecarim | -0.40 | 0.08 | 0.48 |  |
| 131 | Leona | -0.40 | 0.00 | 0.40 |  |
| 132 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 133 | Zeri | -0.41 | 0.36 | 0.77 |  |
| 134 | Jhin | -0.41 | 0.22 | 0.63 |  |
| 135 | Sett | -0.41 | 0.08 | 0.49 |  |
| 136 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 137 | Talon | -0.41 | 0.00 | 0.41 |  |
| 138 | Braum | -0.43 | 0.00 | 0.43 |  |
| 139 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 140 | Riven | -0.43 | 0.00 | 0.43 |  |
| 141 | Janna | -0.44 | 0.29 | 0.73 |  |
| 142 | Illaoi | -0.44 | 0.08 | 0.52 |  |
| 143 | Darius | -0.45 | 0.00 | 0.45 |  |
| 144 | Trundle | -0.45 | 0.00 | 0.45 |  |
| 145 | Miss Fortune | -0.46 | 0.26 | 0.72 |  |
| 146 | Yorick | -0.49 | 0.00 | 0.49 |  |
| 147 | Cho'Gath | -0.52 | 0.00 | 0.52 |  |
| 148 | Rumble | -0.52 | 0.00 | 0.52 |  |
| 149 | Taliyah | -0.53 | 0.20 | 0.73 |  |
| 150 | Tahm Kench | -0.53 | 0.00 | 0.53 |  |
| 151 | Taric | -0.54 | 0.00 | 0.54 |  |
| 152 | Fiddlesticks | -0.56 | 0.14 | 0.70 |  |
| 153 | Irelia | -0.57 | 0.00 | 0.57 |  |
| 154 | Briar | -0.58 | 0.00 | 0.58 |  |
| 155 | Wukong | -0.59 | 0.00 | 0.59 |  |
| 156 | Akshan | -0.61 | 0.25 | 0.86 |  |
| 157 | Nunu & Willump | -0.62 | 0.25 | 0.87 |  |
| 158 | Bel'Veth | -0.62 | 0.00 | 0.62 |  |
| 159 | Gragas | -0.62 | 0.00 | 0.62 |  |
| 160 | Locke | -0.62 | 0.00 | 0.62 |  |
| 161 | Twisted Fate | -0.63 | 0.32 | 0.95 |  |
| 162 | Dr. Mundo | -0.68 | 0.00 | 0.68 |  |
| 163 | Vi | -0.69 | 0.08 | 0.77 |  |
| 164 | Ekko | -0.70 | 0.00 | 0.70 |  |
| 165 | Renekton | -0.71 | 0.00 | 0.71 |  |
| 166 | Naafiri | -0.78 | 0.00 | 0.78 |  |
| 167 | Viego | -0.80 | 0.08 | 0.88 |  |
| 168 | Volibear | -0.83 | 0.08 | 0.91 |  |
| 169 | Rell | -0.83 | 0.00 | 0.83 |  |
| 170 | Blitzcrank | -0.86 | 0.00 | 0.86 |  |
| 171 | Galio | -0.86 | 0.00 | 0.86 |  |
| 172 | Warwick | -1.28 | 0.66 | 1.94 |  |
