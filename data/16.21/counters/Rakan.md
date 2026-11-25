# Counters to Rakan (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rakan: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rakan wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rakan --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Corki | +0.83 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | −0.09 |
| 2 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.33 |
| 3 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | −0.30 |
| 4 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | −0.25 |
| 5 | Warwick | +0.83 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | −0.22 |
| 6 | Kled | +0.83 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.31 |
| 7 | Kog'Maw | +0.82 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | −0.43 |
| 8 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | −0.37 |
| 9 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.08 |
| 10 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | −0.63 |
| 11 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.40 |
| 12 | Udyr | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.17 |
| 13 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.19 |
| 14 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.30 |
| 15 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.59 |
| 16 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.57 |
| 17 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.23 |
| 18 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.27 |
| 19 | Kayle | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.56 |
| 20 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.24 |
| 21 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.21 |
| 22 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.21 |
| 23 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.31 |
| 24 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.29 |
| 25 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.54 |
| 26 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.19 |
| 27 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.35 |
| 28 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.17 |
| 29 | Karma | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.38 |
| 30 | Braum | +0.78 | +1.00 | +1.00 | +0.98 | −0.02 | +1.00 | −0.22 |
| 31 | Gangplank | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.40 |
| 32 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.24 |
| 33 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.49 |
| 34 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | −0.18 |
| 35 | Urgot | +0.78 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.36 |
| 36 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | −0.26 |
| 37 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 38 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | −0.06 |
| 39 | K'Sante | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.52 |
| 40 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.49 |
| 41 | Yasuo | +0.77 | +0.92 | +1.00 | +1.00 | −0.02 | +0.94 | +0.00 |
| 42 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | −0.25 |
| 43 | Volibear | +0.76 | +1.00 | +1.00 | +0.94 | −0.03 | +1.00 | −0.40 |
| 44 | Zeri | +0.75 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | −0.52 |
| 45 | Olaf | +0.75 | +1.00 | +1.00 | +0.92 | −0.03 | +0.99 | −0.49 |
| 46 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | −0.38 |
| 47 | Camille | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | −0.51 |
| 48 | Malzahar | +0.74 | +0.81 | +1.00 | +1.00 | −0.00 | +1.00 | −0.27 |
| 49 | Diana | +0.69 | +1.00 | +1.00 | +1.00 | +0.03 | +0.00 | −0.31 |
| 50 | Quinn | +0.67 | +0.64 | +1.00 | +1.00 | −0.04 | +1.00 | −0.62 |
| 51 | Mordekaiser | +0.65 | +0.99 | +0.87 | +0.81 | +0.02 | +0.18 | +0.03 |
| 52 | Ezreal | +0.64 | +1.00 | +1.00 | +0.21 | −0.02 | +0.98 | −0.04 |
| 53 | Morgana | +0.62 | +1.00 | +1.00 | −0.01 | +0.19 | +1.00 | −0.23 |
| 54 | Akshan | +0.61 | +1.00 | +1.00 | +0.00 | +0.15 | +1.00 | −0.34 |
| 55 | Mel | +0.61 | +1.00 | +1.00 | −0.03 | +0.15 | +1.00 | −0.26 |
| 56 | Nilah | +0.60 | +1.00 | +1.00 | +0.00 | +0.41 | – | −0.38 |
| 57 | Smolder | +0.60 | +1.00 | +1.00 | +0.00 | +0.15 | +1.00 | −0.48 |
| 58 | Jinx | +0.59 | +1.00 | +1.00 | +0.31 | −0.04 | +0.65 | −0.51 |
| 59 | Varus | +0.59 | +1.00 | +1.00 | +0.00 | −0.02 | +1.00 | −0.04 |
| 60 | Jayce | +0.59 | +1.00 | +0.18 | +1.00 | +0.09 | +1.00 | −0.32 |
| 61 | Darius | +0.58 | +1.00 | +1.00 | +0.00 | −0.01 | +1.00 | −0.38 |
| 62 | Illaoi | +0.57 | +0.97 | +1.00 | +0.55 | −0.06 | −0.04 | −0.35 |
| 63 | Zaahen | +0.54 | +0.28 | +1.00 | +0.98 | −0.08 | +0.64 | −0.45 |
| 64 | Nocturne | +0.53 | +1.00 | +0.00 | +1.00 | −0.07 | +1.00 | −0.17 |
| 65 | Elise | +0.49 | +1.00 | +0.89 | +0.56 | +0.17 | −1.00 | −0.25 |
| 66 | Viego | +0.46 | +1.00 | +1.00 | +0.00 | −0.06 | −0.01 | −0.51 |
| 67 | Yunara | +0.44 | +0.57 | +1.00 | −0.30 | +0.30 | +1.00 | −0.63 |
| 68 | Zilean | +0.44 | +1.00 | +0.00 | +1.00 | +0.12 | +0.00 | −0.57 |
| 69 | Sion | +0.44 | +0.00 | +1.00 | +1.00 | −0.11 | +0.11 | −0.13 |
| 70 | Janna | +0.41 | +1.00 | +1.00 | −1.00 | +0.16 | +0.93 | −0.09 |
| 71 | Miss Fortune | +0.40 | +1.00 | +1.00 | +0.00 | +0.15 | −1.00 | −0.50 |
| 72 | Lee Sin | +0.39 | +1.00 | +1.00 | −1.00 | +0.04 | +1.00 | −0.28 |
| 73 | Samira | +0.38 | +1.00 | +1.00 | −1.00 | +0.00 | +0.98 | −0.39 |
| 74 | Tahm Kench | +0.35 | +1.00 | +0.04 | +0.45 | +0.13 | +0.03 | −0.36 |
| 75 | Draven | +0.35 | +1.00 | +0.00 | +0.00 | +0.15 | +1.00 | −0.47 |
| 76 | Heimerdinger | +0.26 | −1.00 | +0.73 | +1.00 | +0.30 | +1.00 | −0.31 |
| 77 | Tristana | +0.26 | −1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.57 |
| 78 | Ziggs | +0.11 | +1.00 | −1.00 | +0.00 | +0.09 | +1.00 | −0.10 |
| 79 | Milio | +0.08 | +1.00 | −1.00 | +0.92 | +0.10 | −1.00 | −0.45 |
| 80 | Shaco | +0.07 | −1.00 | +1.00 | +0.00 | −0.12 | +1.00 | −0.23 |
| 81 | Aatrox | +0.07 | −0.28 | +0.71 | −0.24 | −0.23 | +0.72 | −0.56 |
| 82 | Vel'Koz | +0.04 | +1.00 | −1.00 | +0.69 | +0.11 | −1.00 | −0.27 |
| 83 | Swain | +0.02 | −0.61 | +0.99 | +0.13 | −0.10 | −0.61 | −0.39 |
| 84 | Aurora | −0.02 | +0.05 | −0.08 | −0.06 | +0.06 | −0.05 | −0.19 |
| 85 | Zac | −0.05 | −0.14 | −0.03 | +0.04 | −0.03 | +0.00 | −0.21 |
| 86 | Brand | −0.08 | +0.39 | +0.55 | −1.00 | +0.01 | −1.00 | −0.38 |
| 87 | Yone | −0.09 | −0.90 | +0.56 | −0.42 | +0.01 | +1.00 | −0.47 |
| 88 | Jarvan IV | −0.12 | −1.00 | +1.00 | −1.00 | −0.12 | +1.00 | −0.13 |
| 89 | Anivia | −0.13 | −0.16 | −0.01 | −0.25 | −0.09 | −0.12 | −0.28 |
| 90 | Singed | −0.14 | −0.18 | −0.13 | −0.16 | −0.11 | −0.13 | −0.11 |
| 91 | Malphite | −0.14 | −0.18 | −0.15 | −0.20 | +0.00 | −0.24 | +0.12 |
| 92 | Vi | −0.15 | −1.00 | +1.00 | −1.00 | −0.22 | +1.00 | −0.28 |
| 93 | Taric | −0.16 | −0.08 | −0.38 | −0.11 | −0.04 | −0.09 | −0.18 |
| 94 | Ryze | −0.17 | +0.78 | −1.00 | −1.00 | +0.04 | +0.92 | −0.17 |
| 95 | Lucian | −0.18 | −1.00 | −1.00 | +1.00 | +0.14 | +1.00 | −0.04 |
| 96 | Shen | −0.19 | −0.23 | −0.24 | −0.18 | −0.02 | −0.21 | −0.20 |
| 97 | Ornn | −0.25 | −0.33 | −0.26 | −0.31 | −0.02 | −0.29 | −0.19 |
| 98 | Caitlyn | −0.26 | +1.00 | −0.99 | −1.00 | +0.21 | −0.87 | −0.14 |
| 99 | Rengar | −0.26 | −1.00 | +0.95 | −1.00 | +0.32 | −1.00 | +0.03 |
| 100 | Gwen | −0.27 | −0.75 | −0.11 | +0.33 | −0.07 | −1.00 | −0.17 |
| 101 | Ambessa | −0.29 | −1.00 | +1.00 | −1.00 | +0.07 | −1.00 | +0.09 |
| 102 | Gragas | −0.31 | −0.99 | −0.11 | −0.02 | −0.08 | −0.04 | −0.25 |
| 103 | Garen | −0.31 | −1.00 | +1.00 | −1.00 | +0.03 | −1.00 | −0.36 |
| 104 | Master Yi | −0.32 | −1.00 | +0.00 | +0.00 | +0.12 | −1.00 | +0.22 |
| 105 | Kassadin | −0.32 | −1.00 | +1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 106 | Galio | −0.32 | +0.00 | +0.00 | −1.00 | −0.05 | −1.00 | −0.32 |
| 107 | Rammus | −0.33 | −1.00 | +1.00 | −1.00 | −0.10 | −1.00 | −0.29 |
| 108 | Azir | −0.33 | −1.00 | +1.00 | −1.00 | −0.12 | −1.00 | −0.26 |
| 109 | Hwei | −0.37 | −0.10 | −1.00 | +0.04 | +0.01 | −0.98 | −0.14 |
| 110 | Karthus | −0.38 | −0.42 | −0.46 | −0.49 | −0.03 | −0.47 | −0.20 |
| 111 | Rumble | −0.39 | +0.79 | −1.00 | −1.00 | −0.08 | −1.00 | −0.42 |
| 112 | Syndra | −0.40 | −1.00 | −1.00 | +0.00 | +0.12 | +1.00 | −0.26 |
| 113 | Senna | −0.43 | +0.60 | −1.00 | −1.00 | −0.02 | −1.00 | −0.48 |
| 114 | Akali | −0.44 | −1.00 | +0.45 | −0.92 | −0.12 | −0.78 | −0.37 |
| 115 | Soraka | −0.52 | −0.37 | −0.44 | −1.00 | −0.01 | −1.00 | −0.40 |
| 116 | Sona | −0.55 | −1.00 | +0.07 | −1.00 | +0.04 | −1.00 | −0.55 |
| 117 | Rell | −0.56 | −1.00 | +0.00 | −1.00 | +0.06 | −1.00 | −0.35 |
| 118 | Seraphine | −0.57 | −0.09 | −1.00 | −1.00 | +0.14 | −1.00 | −0.42 |
| 119 | Lissandra | −0.58 | −1.00 | −1.00 | −1.00 | +0.21 | +0.86 | −0.03 |
| 120 | Annie | −0.59 | −1.00 | −1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 121 | Leona | −0.59 | −0.05 | −1.00 | −1.00 | −0.06 | −1.00 | −0.43 |
| 122 | Vex | −0.60 | −1.00 | −1.00 | +0.00 | +0.01 | −1.00 | −0.03 |
| 123 | Zoe | −0.60 | −1.00 | −0.09 | −1.00 | −0.08 | −1.00 | −0.33 |
| 124 | Nami | −0.62 | −0.18 | −1.00 | −1.00 | +0.01 | −1.00 | −0.43 |
| 125 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.02 | −0.25 | −0.10 |
| 126 | Lux | −0.73 | −0.66 | −1.00 | −1.00 | +0.04 | −1.00 | −0.40 |
| 127 | Lillia | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.04 |
| 128 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.12 |
| 129 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.94 | −0.01 |
| 130 | Irelia | −0.79 | −1.00 | −1.00 | −0.99 | +0.18 | −1.00 | −0.43 |
| 131 | Maokai | −0.80 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.45 |
| 132 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.16 |
| 133 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.15 |
| 134 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.29 |
| 135 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.46 |
| 136 | Xin Zhao | −0.80 | −1.00 | −1.00 | −0.85 | −0.01 | −1.00 | −0.54 |
| 137 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.43 |
| 138 | Nautilus | −0.80 | −0.98 | −1.00 | −1.00 | +0.07 | −1.00 | −0.32 |
| 139 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.39 |
| 140 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.30 |
| 141 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.07 |
| 142 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.20 |
| 143 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.41 |
| 144 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.31 |
| 145 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.10 |
| 146 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.29 |
| 147 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 148 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.49 |
| 149 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.26 |
| 150 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.54 |
| 151 | Hecarim | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.35 |
| 152 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.46 |
| 153 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.38 |
| 154 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.40 |
| 155 | Alistar | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.17 |
| 156 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 157 | Skarner | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.24 |
| 158 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.73 |
| 159 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.21 |
| 160 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.49 |
| 161 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.46 |
| 162 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.35 |
| 163 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.34 |
| 164 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.26 |
| 165 | Qiyana | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.14 |
| 166 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.46 |
| 167 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.75 |
| 168 | Katarina | −0.84 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.46 |
| 169 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.43 |
| 170 | Kindred | −0.85 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.55 |
| 171 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.45 |
| 172 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.56 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rakan's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rakan's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rakan` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.37)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Rakan's Grand Entrance. Spell shield for 1.5 s, long enough to use ahead of Grand Entrance. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rakan W Grand Entrance)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Rakan's The Quickness. Spell shield for 1.5 s, long enough to use ahead of The Quickness. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Rakan R The Quickness)
- **0.20** cc immunity: Paranoia is displacement immune, ignoring Rakan's Grand Entrance (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Rakan W Grand Entrance)
- Watch out: Rakan's basic attacks reach 175 units farther than Nocturne's (300 vs 125 attack range).

#### 2. Fizz (net +1.35)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Rakan's Grand Entrance. Untargetable for 0.75 s; Grand Entrance takes 0.38 s to land, enough to react. (Fizz E Playful → Rakan W Grand Entrance)
- **0.80** untargetable: Playful makes Fizz untargetable, dodging Rakan's The Quickness. Untargetable for 0.75 s; The Quickness takes 0.5 s to land, enough to react. (Fizz E Playful → Rakan R The Quickness)
- Watch out: Rakan's basic attacks reach 125 units farther than Fizz's (300 vs 175 attack range).

#### 3. Sivir (net +1.34)

- **0.80** spell shield: Spell Shield's spell shield blocks Rakan's The Quickness. Spell shield for 1.5 s, long enough to use ahead of The Quickness. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rakan R The Quickness)
- **0.73** spell shield: Spell Shield's spell shield blocks Rakan's Grand Entrance. Spell shield for 1.5 s, long enough to use ahead of Grand Entrance. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rakan W Grand Entrance)
- **0.17** range: Sivir's basic attacks reach 200 units farther than Rakan's (500 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Sivir basic attacks → Rakan basic attacks)

#### 4. Maokai (net +1.27)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Rakan's Grand Entrance. Untargetable for 1.4 s; Grand Entrance takes 0.38 s to land, enough to react. (Maokai W Twisted Advance → Rakan W Grand Entrance)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Rakan's The Quickness. Untargetable for 1.4 s; The Quickness takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Rakan R The Quickness)
- Watch out: Rakan's basic attacks reach 175 units farther than Maokai's (300 vs 125 attack range).

#### 5. Udyr (net +1.27)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Rakan's Grand Entrance (airborne). Immune for 1.5 s, long enough to use ahead of Grand Entrance. (Udyr E Blazing Stampede → Rakan W Grand Entrance)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Rakan's The Quickness (charm, slow). Immune for 1.5 s, long enough to use ahead of The Quickness. (Udyr E Blazing Stampede → Rakan R The Quickness)
- Watch out: Rakan's basic attacks reach 175 units farther than Udyr's (300 vs 125 attack range).

#### 6. Fiora (net +1.25)

- **0.90** parry: Riposte parries Rakan's The Quickness and stuns back. Parry for 0.75 s; The Quickness takes 0.5 s to land, enough to react. Negating The Quickness's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rakan R The Quickness)
- **0.88** parry: Riposte parries Rakan's Grand Entrance and stuns back. Parry for 0.75 s; Grand Entrance takes 0.38 s to land, enough to react. Negating Grand Entrance's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rakan W Grand Entrance)
- **0.07** attack speed slow: Riposte cuts Rakan's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Rakan basic attacks)
- Watch out: Rakan's basic attacks reach 150 units farther than Fiora's (300 vs 150 attack range).

#### 7. Morgana (net +1.25)

- **0.80** cc immunity: Black Shield makes Morgana immune to Rakan's The Quickness (charm, slow). Immune for 5 s, long enough to use ahead of The Quickness. (Morgana E Black Shield → Rakan R The Quickness)
- **0.78** cc immunity: Black Shield makes Morgana immune to Rakan's Grand Entrance (airborne). Immune for 5 s, long enough to use ahead of Grand Entrance. (Morgana E Black Shield → Rakan W Grand Entrance)
- **0.06** range: Morgana's basic attacks reach 150 units farther than Rakan's (450 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Morgana basic attacks → Rakan basic attacks)

#### 8. Lissandra (net +1.22)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rakan's The Quickness. Untargetable for 2.5 s, long enough to use ahead of The Quickness. (Lissandra R Frozen Tomb → Rakan R The Quickness)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rakan's Grand Entrance. Untargetable for 2.5 s, long enough to use ahead of Grand Entrance. (Lissandra R Frozen Tomb → Rakan W Grand Entrance)
- **0.24** dash stop: Frozen Tomb's knockdown can stop Rakan's Grand Entrance mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Rakan W Grand Entrance)

#### 9. Bard (net +1.17)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Rakan's The Quickness. Untargetable for 2.5 s, long enough to use ahead of The Quickness. (Bard R Tempered Fate → Rakan R The Quickness)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Rakan's Grand Entrance. Untargetable for 2.5 s, long enough to use ahead of Grand Entrance. (Bard R Tempered Fate → Rakan W Grand Entrance)
- **0.13** range: Bard's basic attacks reach 200 units farther than Rakan's (500 vs 300 attack range). Rakan closes the gap with Battle Dance, Grand Entrance. (Bard basic attacks → Rakan basic attacks)

#### 10. Aurora (net +1.15)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Rakan's The Quickness. Untargetable for 0.4 s; The Quickness takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Rakan R The Quickness)
- **0.46** untargetable: Between Worlds makes Aurora untargetable, dodging Rakan's Grand Entrance. Untargetable for 0.4 s; Grand Entrance takes 0.38 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Rakan W Grand Entrance)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Rakan's Grand Entrance (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Rakan W Grand Entrance)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.37 | 1.50 | 0.13 |  |
| 2 | Fizz | +1.35 | 1.40 | 0.05 |  |
| 3 | Sivir | +1.34 | 1.34 | 0.00 |  |
| 4 | Maokai | +1.27 | 1.40 | 0.13 |  |
| 5 | Udyr | +1.27 | 1.40 | 0.13 |  |
| 6 | Fiora | +1.25 | 1.36 | 0.11 |  |
| 7 | Morgana | +1.25 | 1.25 | 0.00 |  |
| 8 | Lissandra | +1.22 | 1.22 | 0.00 |  |
| 9 | Bard | +1.17 | 1.17 | 0.00 |  |
| 10 | Aurora | +1.15 | 1.15 | 0.00 |  |
| 11 | Xayah | +1.12 | 1.12 | 0.00 |  |
| 12 | Vladimir | +1.11 | 1.24 | 0.13 |  |
| 13 | Gwen | +1.06 | 1.17 | 0.11 |  |
| 14 | Camille | +1.03 | 1.09 | 0.06 |  |
| 15 | Rek'Sai | +1.03 | 1.09 | 0.06 |  |
| 16 | Zaahen | +0.98 | 1.04 | 0.06 |  |
| 17 | Evelynn | +0.96 | 1.04 | 0.08 |  |
| 18 | Shaco | +0.96 | 1.04 | 0.08 |  |
| 19 | Master Yi | +0.94 | 1.37 | 0.43 |  |
| 20 | Kled | +0.94 | 0.94 | 0.00 |  |
| 21 | Zed | +0.90 | 0.98 | 0.08 |  |
| 22 | Rengar | +0.87 | 1.12 | 0.25 |  |
| 23 | Vex | +0.87 | 0.87 | 0.00 |  |
| 24 | Kalista | +0.84 | 0.84 | 0.00 |  |
| 25 | Jinx | +0.81 | 0.81 | 0.00 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 26 | Olaf | +0.79 | 1.04 | 0.25 |  |
| 27 | Hwei | +0.79 | 0.79 | 0.00 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 28 | Milio | +0.77 | 0.77 | 0.00 |  |
| 29 | Cassiopeia | +0.76 | 0.76 | 0.00 | grounding (Miasma) |
| 30 | Ahri | +0.74 | 0.74 | 0.00 | dash stop (Charm), dash stop (Charm) |
| 31 | Viktor | +0.74 | 0.74 | 0.00 | dash stop (Gravity Field) |
| 32 | Gangplank | +0.73 | 0.98 | 0.25 |  |
| 33 | Yuumi | +0.71 | 1.49 | 0.78 |  |
| 34 | Singed | +0.71 | 0.96 | 0.25 | grounding (Mega Adhesive) |
| 35 | Kayle | +0.71 | 0.71 | 0.00 |  |
| 36 | Alistar | +0.70 | 0.83 | 0.13 |  |
| 37 | Veigar | +0.70 | 0.70 | 0.00 | dash stop (Event Horizon) |
| 38 | Sion | +0.66 | 1.05 | 0.39 |  |
| 39 | Teemo | +0.50 | 0.50 | 0.00 |  |
| 40 | Yone | +0.49 | 0.54 | 0.05 |  |
| 41 | Mordekaiser | +0.46 | 0.64 | 0.18 |  |
| 42 | Lulu | +0.42 | 0.42 | 0.00 |  |
| 43 | Xin Zhao | +0.41 | 0.50 | 0.09 |  |
| 44 | Samira | +0.38 | 0.38 | 0.00 |  |
| 45 | Mel | +0.36 | 0.36 | 0.00 |  |
| 46 | K'Sante | +0.35 | 0.40 | 0.05 |  |
| 47 | Malzahar | +0.34 | 1.11 | 0.77 |  |
| 48 | Braum | +0.29 | 0.42 | 0.13 | projectile block (Unbreakable) |
| 49 | Poppy | +0.26 | 0.79 | 0.53 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 50 | Malphite | +0.26 | 0.39 | 0.13 |  |
| 51 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 52 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 53 | Yasuo | +0.23 | 0.29 | 0.06 |  |
| 54 | Nilah | +0.22 | 0.27 | 0.05 |  |
| 55 | Amumu | +0.20 | 0.33 | 0.13 |  |
| 56 | Garen | +0.19 | 0.37 | 0.18 |  |
| 57 | Jax | +0.18 | 0.31 | 0.13 |  |
| 58 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 59 | Twitch | +0.18 | 0.18 | 0.00 |  |
| 60 | Vayne | +0.18 | 0.18 | 0.00 |  |
| 61 | Zeri | +0.18 | 0.18 | 0.00 |  |
| 62 | Kindred | +0.17 | 0.17 | 0.00 |  |
| 63 | Sona | +0.17 | 0.17 | 0.00 |  |
| 64 | Heimerdinger | +0.16 | 0.16 | 0.00 |  |
| 65 | Renata Glasc | +0.16 | 0.16 | 0.00 |  |
| 66 | Senna | +0.16 | 0.16 | 0.00 |  |
| 67 | Yunara | +0.16 | 0.16 | 0.00 |  |
| 68 | Hecarim | +0.15 | 0.21 | 0.06 |  |
| 69 | Jarvan IV | +0.15 | 0.20 | 0.05 |  |
| 70 | Draven | +0.15 | 0.15 | 0.00 |  |
| 71 | Varus | +0.14 | 0.30 | 0.16 |  |
| 72 | Ornn | +0.14 | 0.20 | 0.06 |  |
| 73 | Corki | +0.14 | 0.14 | 0.00 |  |
| 74 | Elise | +0.14 | 0.14 | 0.00 |  |
| 75 | Ezreal | +0.14 | 0.14 | 0.00 |  |
| 76 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 77 | Smolder | +0.14 | 0.14 | 0.00 |  |
| 78 | Zilean | +0.14 | 0.14 | 0.00 |  |
| 79 | Zoe | +0.14 | 0.14 | 0.00 |  |
| 80 | Volibear | +0.13 | 0.20 | 0.07 |  |
| 81 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 82 | Annie | +0.12 | 0.12 | 0.00 |  |
| 83 | Gnar | +0.12 | 0.12 | 0.00 |  |
| 84 | Kennen | +0.12 | 0.12 | 0.00 |  |
| 85 | Lux | +0.12 | 0.12 | 0.00 |  |
| 86 | Kayn | +0.11 | 1.04 | 0.93 |  |
| 87 | Jayce | +0.11 | 0.11 | 0.00 |  |
| 88 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 89 | Seraphine | +0.11 | 0.11 | 0.00 |  |
| 90 | Soraka | +0.11 | 0.11 | 0.00 |  |
| 91 | Ziggs | +0.11 | 0.11 | 0.00 |  |
| 92 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 93 | Azir | +0.10 | 0.10 | 0.00 |  |
| 94 | Kog'Maw | +0.10 | 0.10 | 0.00 |  |
| 95 | Orianna | +0.10 | 0.10 | 0.00 |  |
| 96 | Shyvana | +0.09 | 0.20 | 0.11 |  |
| 97 | Brand | +0.09 | 0.09 | 0.00 |  |
| 98 | Nami | +0.09 | 0.09 | 0.00 |  |
| 99 | Neeko | +0.09 | 0.09 | 0.00 |  |
| 100 | Syndra | +0.09 | 0.09 | 0.00 |  |
| 101 | Warwick | +0.08 | 1.33 | 1.25 |  |
| 102 | Karma | +0.08 | 0.08 | 0.00 |  |
| 103 | LeBlanc | +0.08 | 0.08 | 0.00 |  |
| 104 | Swain | +0.08 | 0.08 | 0.00 |  |
| 105 | Illaoi | +0.07 | 0.20 | 0.13 |  |
| 106 | Sett | +0.07 | 0.20 | 0.13 |  |
| 107 | Graves | +0.07 | 0.07 | 0.00 |  |
| 108 | Thresh | +0.06 | 0.06 | 0.00 |  |
| 109 | Nasus | +0.04 | 0.29 | 0.25 |  |
| 110 | Lillia | 0.00 | 0.00 | 0.00 |  |
| 111 | Urgot | 0.00 | 0.00 | 0.00 |  |
| 112 | Aurelion Sol | -0.05 | 0.09 | 0.14 |  |
| 113 | Sylas | -0.05 | 0.00 | 0.05 |  |
| 114 | Briar | -0.06 | 0.00 | 0.06 |  |
| 115 | Wukong | -0.06 | 0.00 | 0.06 |  |
| 116 | Rell | -0.06 | 0.00 | 0.06 |  |
| 117 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 118 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 119 | Qiyana | -0.07 | 0.00 | 0.07 |  |
| 120 | Akali | -0.08 | 0.00 | 0.08 |  |
| 121 | Ambessa | -0.08 | 0.00 | 0.08 |  |
| 122 | Ekko | -0.08 | 0.00 | 0.08 |  |
| 123 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 124 | Riven | -0.08 | 0.00 | 0.08 |  |
| 125 | Talon | -0.08 | 0.00 | 0.08 |  |
| 126 | Zac | -0.09 | 0.70 | 0.79 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 127 | Aatrox | -0.09 | 0.00 | 0.09 |  |
| 128 | Nautilus | -0.09 | 0.00 | 0.09 |  |
| 129 | Tryndamere | -0.09 | 0.00 | 0.09 |  |
| 130 | Diana | -0.11 | 0.00 | 0.11 |  |
| 131 | Kassadin | -0.11 | 0.00 | 0.11 |  |
| 132 | Sejuani | -0.11 | 0.00 | 0.11 |  |
| 133 | Skarner | -0.12 | 0.10 | 0.22 |  |
| 134 | Kha'Zix | -0.13 | 0.00 | 0.13 |  |
| 135 | Leona | -0.13 | 0.00 | 0.13 |  |
| 136 | Locke | -0.13 | 0.00 | 0.13 |  |
| 137 | Renekton | -0.13 | 0.00 | 0.13 |  |
| 138 | Ivern | -0.16 | 0.06 | 0.22 |  |
| 139 | Viego | -0.17 | 0.20 | 0.37 |  |
| 140 | Darius | -0.18 | 0.00 | 0.18 |  |
| 141 | Trundle | -0.18 | 0.00 | 0.18 |  |
| 142 | Yorick | -0.18 | 0.00 | 0.18 |  |
| 143 | Quinn | -0.19 | 0.14 | 0.33 |  |
| 144 | Taric | -0.22 | 0.00 | 0.22 |  |
| 145 | Blitzcrank | -0.25 | 0.00 | 0.25 |  |
| 146 | Cho'Gath | -0.25 | 0.00 | 0.25 |  |
| 147 | Dr. Mundo | -0.25 | 0.00 | 0.25 |  |
| 148 | Rumble | -0.25 | 0.00 | 0.25 |  |
| 149 | Rammus | -0.26 | 0.29 | 0.55 |  |
| 150 | Pyke | -0.30 | 0.00 | 0.30 |  |
| 151 | Caitlyn | -0.35 | 0.21 | 0.56 |  |
| 152 | Gragas | -0.39 | 0.00 | 0.39 |  |
| 153 | Akshan | -0.40 | 0.12 | 0.52 |  |
| 154 | Katarina | -0.42 | 0.18 | 0.60 |  |
| 155 | Miss Fortune | -0.42 | 0.14 | 0.56 |  |
| 156 | Lucian | -0.43 | 0.13 | 0.56 |  |
| 157 | Pantheon | -0.44 | 0.59 | 1.03 |  |
| 158 | Vel'Koz | -0.44 | 0.10 | 0.54 |  |
| 159 | Jhin | -0.45 | 0.11 | 0.56 |  |
| 160 | Vi | -0.48 | 0.20 | 0.68 |  |
| 161 | Karthus | -0.50 | 0.06 | 0.56 |  |
| 162 | Xerath | -0.53 | 0.10 | 0.63 |  |
| 163 | Twisted Fate | -0.54 | 0.16 | 0.70 |  |
| 164 | Ryze | -0.60 | 0.10 | 0.70 |  |
| 165 | Janna | -0.65 | 0.15 | 0.80 |  |
| 166 | Shen | -0.69 | 0.29 | 0.98 |  |
| 167 | Fiddlesticks | -0.76 | 0.07 | 0.83 |  |
| 168 | Tahm Kench | -0.85 | 0.00 | 0.85 |  |
| 169 | Nunu & Willump | -0.86 | 0.25 | 1.11 |  |
| 170 | Taliyah | -0.86 | 0.10 | 0.96 |  |
| 171 | Naafiri | -0.93 | 0.00 | 0.93 |  |
| 172 | Galio | -1.20 | 0.00 | 1.20 |  |
