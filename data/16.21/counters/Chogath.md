# Counters to Cho'Gath (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Cho'Gath: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Cho'Gath wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Chogath --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.85 |
| 2 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.73 |
| 3 | Ashe | +0.86 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.46 |
| 4 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.35 |
| 5 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.35 |
| 6 | Corki | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.05 |
| 7 | Aurora | +0.84 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.28 |
| 8 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.32 |
| 9 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.19 |
| 10 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.84 |
| 11 | Zilean | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.22 |
| 12 | Quinn | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.22 |
| 13 | Lulu | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.20 |
| 14 | Karma | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.16 |
| 15 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.27 |
| 16 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.37 |
| 17 | Aphelios | +0.82 | +1.00 | +1.00 | +0.92 | +0.13 | +1.00 | +0.32 |
| 18 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.81 |
| 19 | Ivern | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.24 |
| 20 | Twisted Fate | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.04 |
| 21 | Neeko | +0.81 | +0.99 | +0.99 | +1.00 | +0.08 | +1.00 | +0.06 |
| 22 | Aatrox | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.10 |
| 23 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.65 |
| 24 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.32 |
| 25 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.49 |
| 26 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.63 |
| 27 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.35 |
| 28 | Yasuo | +0.79 | +1.00 | +0.94 | +1.00 | +0.03 | – | +0.47 |
| 29 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.96 |
| 30 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.09 |
| 31 | Hwei | +0.78 | +0.90 | +0.96 | +0.97 | +0.07 | +1.00 | +0.16 |
| 32 | Bard | +0.77 | +0.96 | +0.96 | +0.95 | +0.08 | +0.88 | +0.09 |
| 33 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.12 |
| 34 | Zaahen | +0.77 | +0.99 | +1.00 | +1.00 | −0.13 | – | +0.27 |
| 35 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.31 |
| 36 | Jinx | +0.75 | +0.96 | +0.97 | +0.75 | +0.13 | +0.99 | +0.06 |
| 37 | Morgana | +0.75 | +0.97 | +0.93 | +0.75 | +0.10 | +1.00 | +0.17 |
| 38 | Volibear | +0.66 | +0.90 | +0.90 | +0.90 | −0.14 | – | −0.24 |
| 39 | Gwen | +0.65 | +0.70 | +0.71 | +1.00 | −0.03 | – | +0.73 |
| 40 | Annie | +0.62 | +1.00 | +1.00 | +0.00 | +0.09 | +1.00 | +0.16 |
| 41 | Diana | +0.53 | +1.00 | +0.00 | +1.00 | +0.09 | – | +0.26 |
| 42 | Heimerdinger | +0.47 | +0.09 | +0.95 | +0.89 | +0.13 | +0.11 | +0.08 |
| 43 | Kayle | +0.44 | +1.00 | +1.00 | −1.00 | +0.24 | +1.00 | +0.02 |
| 44 | Zeri | +0.41 | +1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.55 |
| 45 | Gnar | +0.39 | +0.89 | +0.89 | −1.00 | +0.20 | +1.00 | +0.44 |
| 46 | Nilah | +0.39 | +1.00 | +1.00 | −1.00 | +0.23 | – | +0.25 |
| 47 | Varus | +0.29 | +0.51 | +0.96 | −1.00 | +0.10 | +1.00 | +0.18 |
| 48 | Gangplank | +0.27 | −1.00 | +1.00 | +1.00 | +0.11 | – | +0.61 |
| 49 | Milio | +0.24 | +0.68 | +0.70 | −1.00 | +0.16 | +0.76 | −0.03 |
| 50 | Yunara | +0.18 | −0.02 | +0.96 | −1.00 | +0.25 | +1.00 | +0.09 |
| 51 | Nami | +0.17 | +0.22 | +0.20 | +0.19 | +0.07 | +0.07 | +0.13 |
| 52 | Orianna | +0.12 | −1.00 | +1.00 | +1.00 | +0.15 | −1.00 | −0.01 |
| 53 | Draven | +0.11 | +0.22 | +0.53 | −1.00 | +0.11 | +1.00 | +0.13 |
| 54 | Xin Zhao | +0.11 | +0.20 | +1.00 | −1.00 | +0.00 | – | −0.05 |
| 55 | Caitlyn | +0.10 | +0.78 | +0.40 | −0.82 | +0.17 | −0.48 | −0.04 |
| 56 | Master Yi | +0.06 | +1.00 | −1.00 | +0.03 | +0.06 | – | +0.81 |
| 57 | Anivia | +0.01 | +0.05 | −0.01 | −0.16 | +0.00 | +0.22 | +0.20 |
| 58 | Sion | +0.00 | +0.00 | +0.00 | +0.00 | −0.05 | – | +0.18 |
| 59 | Zyra | −0.02 | −0.02 | +0.04 | −0.14 | +0.03 | +0.05 | −0.08 |
| 60 | Singed | −0.03 | +0.02 | −0.05 | +0.08 | −0.23 | – | +0.04 |
| 61 | Twitch | −0.04 | +1.00 | +0.00 | −1.00 | +0.09 | −1.00 | +0.04 |
| 62 | Lucian | −0.07 | +1.00 | −1.00 | −1.00 | +0.11 | +1.00 | +0.32 |
| 63 | Vel'Koz | −0.07 | +0.20 | +0.16 | −1.00 | +0.28 | −0.01 | +0.02 |
| 64 | Soraka | −0.14 | −0.39 | −0.31 | +0.11 | +0.06 | −0.00 | +0.04 |
| 65 | Lux | −0.14 | −0.02 | −0.02 | −0.94 | +0.14 | +0.23 | +0.19 |
| 66 | Syndra | −0.17 | +0.21 | +0.17 | −1.00 | +0.12 | −1.00 | +0.32 |
| 67 | Viktor | −0.19 | +0.19 | +0.17 | −1.00 | +0.07 | −1.00 | +0.16 |
| 68 | Jayce | −0.20 | +1.00 | −1.00 | −1.00 | +0.05 | – | +0.32 |
| 69 | Zac | −0.20 | −0.96 | −0.39 | +0.85 | −0.10 | – | +0.03 |
| 70 | Ezreal | −0.20 | +0.22 | −0.32 | −1.00 | +0.09 | +0.06 | +0.04 |
| 71 | Aurelion Sol | −0.23 | −0.14 | −0.13 | −0.76 | +0.02 | −0.13 | +0.03 |
| 72 | Braum | −0.34 | −1.00 | −1.00 | +1.00 | −0.12 | – | +0.27 |
| 73 | Fiddlesticks | −0.34 | +0.86 | −1.00 | −1.00 | −0.04 | −1.00 | −0.04 |
| 74 | Brand | −0.46 | −1.00 | −0.11 | −1.00 | +0.10 | +0.05 | +0.06 |
| 75 | Mel | −0.46 | −1.00 | +0.29 | −1.00 | +0.10 | −1.00 | +0.09 |
| 76 | Swain | −0.51 | −0.22 | −1.00 | −1.00 | +0.09 | −0.22 | +0.14 |
| 77 | Rumble | −0.54 | −1.00 | −1.00 | +0.00 | −0.05 | – | +0.40 |
| 78 | Jax | −0.54 | −1.00 | −1.00 | +0.00 | −0.04 | – | +0.35 |
| 79 | Jhin | −0.55 | −0.99 | −0.79 | −0.13 | +0.13 | −0.89 | −0.22 |
| 80 | Kennen | −0.56 | −0.95 | −0.94 | −1.00 | +0.02 | +1.00 | +0.23 |
| 81 | Kai'Sa | −0.56 | −1.00 | −0.75 | −1.00 | −0.15 | +1.00 | −0.01 |
| 82 | Lillia | −0.56 | −1.00 | −1.00 | −1.00 | +0.07 | +1.00 | +0.52 |
| 83 | Azir | −0.57 | −1.00 | −1.00 | −1.00 | +0.12 | +1.00 | +0.19 |
| 84 | Rell | −0.57 | −1.00 | −1.00 | −1.00 | +0.13 | +1.00 | +0.15 |
| 85 | Yone | −0.60 | −1.00 | −0.33 | −1.00 | −0.05 | – | +0.07 |
| 86 | Rengar | −0.69 | −1.00 | −1.00 | −1.00 | +0.38 | – | +0.40 |
| 87 | Jarvan IV | −0.72 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.53 |
| 88 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.33 |
| 89 | Viego | −0.74 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.03 |
| 90 | Evelynn | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.32 |
| 91 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.23 |
| 92 | Kayn | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.32 |
| 93 | Malphite | −0.75 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.37 |
| 94 | Camille | −0.75 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.45 |
| 95 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.36 |
| 96 | Shen | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.18 |
| 97 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.43 |
| 98 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.36 |
| 99 | Sejuani | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.36 |
| 100 | Maokai | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.15 |
| 101 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.16 |
| 102 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.36 |
| 103 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.26 |
| 104 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.14 |
| 105 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.09 |
| 106 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.20 |
| 107 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.04 |
| 108 | Lee Sin | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.16 |
| 109 | Shaco | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.20 |
| 110 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.08 |
| 111 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.14 |
| 112 | Fizz | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.29 |
| 113 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.13 |
| 114 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.15 |
| 115 | Tahm Kench | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.17 |
| 116 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.32 |
| 117 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.71 |
| 118 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.04 |
| 119 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.10 |
| 120 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.17 |
| 121 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.32 |
| 122 | Wukong | −0.78 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.41 |
| 123 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.20 |
| 124 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.25 |
| 125 | Bel'Veth | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.03 |
| 126 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.19 |
| 127 | Qiyana | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.17 |
| 128 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.26 |
| 129 | Tristana | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.22 |
| 130 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.22 |
| 131 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.13 |
| 132 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.14 |
| 133 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.06 |
| 134 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.15 |
| 135 | Kindred | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.19 |
| 136 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.17 |
| 137 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.05 |
| 138 | Warwick | −0.78 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.34 |
| 139 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.14 |
| 140 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.12 |
| 141 | Rakan | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.19 |
| 142 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.04 |
| 143 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.17 |
| 144 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.01 |
| 145 | Nocturne | −0.79 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.43 |
| 146 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.01 |
| 147 | Olaf | −0.79 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.35 |
| 148 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.35 |
| 149 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.99 | +0.01 |
| 150 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.09 |
| 151 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.03 |
| 152 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.30 |
| 153 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.15 |
| 154 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.24 |
| 155 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.21 |
| 156 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.11 |
| 157 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.06 |
| 158 | Graves | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.34 |
| 159 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.04 |
| 160 | Rek'Sai | −0.80 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.23 |
| 161 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.18 |
| 162 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.20 |
| 163 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.29 |
| 164 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.27 |
| 165 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.08 |
| 166 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.10 |
| 167 | Ryze | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.47 |
| 168 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.15 |
| 169 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.04 |
| 170 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 171 | Vi | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | −0.16 |
| 172 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | −0.01 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Cho'Gath's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Cho'Gath's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Chogath` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.78)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Sivir basic attacks → Cho'Gath basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Cho'Gath's Feast. Spell shield for 1.5 s, long enough to use ahead of Feast. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cho'Gath R Feast)
- **0.42** spell shield: Spell Shield's spell shield blocks Cho'Gath's Rupture. Spell shield for 1.5 s, long enough to use ahead of Rupture. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Cho'Gath Q Rupture)

#### 2. Bard (net +1.43)

- **0.72** range: Bard's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Bard basic attacks → Cho'Gath basic attacks)
- **0.47** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Bard R Tempered Fate → Cho'Gath R Feast)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Bard R Tempered Fate → Cho'Gath Q Rupture)

#### 3. Xayah (net +1.43)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Cho'Gath's (525 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Xayah basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Feast. Untargetable for 1.5 s, long enough to use ahead of Feast. (Xayah R Featherstorm → Cho'Gath R Feast)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Cho'Gath's Rupture. Untargetable for 1.5 s, long enough to use ahead of Rupture. (Xayah R Featherstorm → Cho'Gath Q Rupture)

#### 4. Kayle (net +1.31)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Cho'Gath's (625 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Kayle basic attacks → Cho'Gath basic attacks)
- **0.47** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Feast. Invulnerable for 2.5 s, long enough to use ahead of Feast. (Kayle R Divine Judgment → Cho'Gath R Feast)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Cho'Gath's Rupture (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Rupture. (Kayle R Divine Judgment → Cho'Gath Q Rupture)

#### 5. Aurora (net +1.24)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Aurora basic attacks → Cho'Gath basic attacks)
- **0.42** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Feast. Untargetable for 0.4 s; Feast takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath R Feast)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.4 s; Rupture takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Cho'Gath Q Rupture)

#### 6. Lissandra (net +1.15)

- **0.47** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Feast. Untargetable for 2.5 s, long enough to use ahead of Feast. (Lissandra R Frozen Tomb → Cho'Gath R Feast)
- **0.44** range: Lissandra's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Lissandra basic attacks → Cho'Gath basic attacks)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Cho'Gath's Rupture. Untargetable for 2.5 s, long enough to use ahead of Rupture. (Lissandra R Frozen Tomb → Cho'Gath Q Rupture)

#### 7. Vladimir (net +1.07)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Feast. Untargetable for 2 s, long enough to use ahead of Feast. (Vladimir W Sanguine Pool → Cho'Gath R Feast)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Cho'Gath's Rupture. Untargetable for 2 s, long enough to use ahead of Rupture. (Vladimir W Sanguine Pool → Cho'Gath Q Rupture)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Cho'Gath's (450 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Vladimir basic attacks → Cho'Gath basic attacks)
- Watch out: Rupture's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 8. Teemo (net +1.06)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Cho'Gath's (500 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Teemo basic attacks → Cho'Gath basic attacks)
- **0.38** blind: Blinding Dart's blind makes Cho'Gath's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Cho'Gath basic attacks)

#### 9. Fizz (net +1.04)

- **0.60** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Rupture. Untargetable for 0.75 s; Rupture takes 0.5 s to land, enough to react. (Fizz E Playful → Cho'Gath Q Rupture)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Feast. Untargetable for 0.75 s; Feast takes 0.25 s to land, enough to react. (Fizz E Playful → Cho'Gath R Feast)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Cho'Gath's Feral Scream. Untargetable for 0.75 s; Feral Scream takes 0.5 s to land, enough to react. (Fizz E Playful → Cho'Gath W Feral Scream)

#### 10. Lulu (net +0.99)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Cho'Gath's (550 vs 125 attack range). Cho'Gath has no dash or blink to close the gap. (Lulu basic attacks → Cho'Gath basic attacks)
- **0.27** disarm: Whimsy disarms Cho'Gath for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Cho'Gath basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.78 | 1.78 | 0.00 | range (attacks) |
| 2 | Bard | +1.43 | 1.43 | 0.00 | range (attacks) |
| 3 | Xayah | +1.43 | 1.43 | 0.00 | range (attacks) |
| 4 | Kayle | +1.31 | 1.31 | 0.00 | range (attacks) |
| 5 | Aurora | +1.24 | 1.24 | 0.00 | range (attacks) |
| 6 | Lissandra | +1.15 | 1.15 | 0.00 |  |
| 7 | Vladimir | +1.07 | 1.25 | 0.18 |  |
| 8 | Teemo | +1.06 | 1.06 | 0.00 | range (attacks) |
| 9 | Fizz | +1.04 | 1.04 | 0.00 |  |
| 10 | Lulu | +0.99 | 0.99 | 0.00 | range (attacks) |
| 11 | Yuumi | +0.97 | 1.81 | 0.84 | range (attacks) |
| 12 | Maokai | +0.96 | 0.96 | 0.00 |  |
| 13 | Nocturne | +0.96 | 0.96 | 0.00 |  |
| 14 | Kalista | +0.95 | 0.95 | 0.00 | range (attacks) |
| 15 | Morgana | +0.95 | 0.95 | 0.00 |  |
| 16 | Fiora | +0.94 | 0.94 | 0.00 |  |
| 17 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 18 | Milio | +0.93 | 0.93 | 0.00 | range (attacks) |
| 19 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 20 | Gwen | +0.88 | 0.88 | 0.00 |  |
| 21 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 22 | Aphelios | +0.87 | 0.87 | 0.00 | range (attacks) |
| 23 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 24 | Udyr | +0.86 | 0.86 | 0.00 |  |
| 25 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 26 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 27 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 28 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 29 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 30 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Rek'Sai | +0.72 | 0.72 | 0.00 |  |
| 33 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 34 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 35 | Evelynn | +0.71 | 0.71 | 0.00 |  |
| 36 | Shaco | +0.71 | 0.71 | 0.00 |  |
| 37 | Camille | +0.68 | 0.68 | 0.00 |  |
| 38 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 39 | Zed | +0.66 | 0.66 | 0.00 |  |
| 40 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 44 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 45 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 46 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 47 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 48 | Kled | +0.64 | 0.64 | 0.00 |  |
| 49 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 50 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 51 | Vex | +0.60 | 0.60 | 0.00 | range (attacks) |
| 52 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 53 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 54 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 55 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 56 | Master Yi | +0.55 | 1.01 | 0.46 |  |
| 57 | Rengar | +0.55 | 0.55 | 0.00 |  |
| 58 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 59 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 60 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 64 | Nilah | +0.52 | 0.52 | 0.00 |  |
| 65 | Heimerdinger | +0.50 | 0.50 | 0.00 |  |
| 66 | Graves | +0.49 | 0.49 | 0.00 |  |
| 67 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 68 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 69 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 70 | Gangplank | +0.47 | 0.47 | 0.00 |  |
| 71 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 72 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 73 | Annie | +0.44 | 0.44 | 0.00 |  |
| 74 | Brand | +0.44 | 0.44 | 0.00 |  |
| 75 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 76 | Karma | +0.44 | 0.44 | 0.00 |  |
| 77 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 78 | Nami | +0.44 | 0.44 | 0.00 |  |
| 79 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 80 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 81 | Varus | +0.43 | 0.65 | 0.22 | range (attacks) |
| 82 | Swain | +0.42 | 0.42 | 0.00 |  |
| 83 | Braum | +0.39 | 0.39 | 0.00 |  |
| 84 | Olaf | +0.39 | 0.39 | 0.00 |  |
| 85 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 86 | Zaahen | +0.39 | 0.39 | 0.00 |  |
| 87 | Quinn | +0.34 | 0.77 | 0.43 | range (attacks) |
| 88 | Alistar | +0.31 | 0.31 | 0.00 |  |
| 89 | Jax | +0.31 | 0.31 | 0.00 |  |
| 90 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 91 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 92 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 93 | Garen | +0.27 | 0.27 | 0.00 |  |
| 94 | Aurelion Sol | +0.26 | 0.44 | 0.18 |  |
| 95 | Malphite | +0.26 | 0.26 | 0.00 |  |
| 96 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 97 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 98 | Singed | +0.18 | 0.18 | 0.00 |  |
| 99 | Twisted Fate | +0.16 | 0.86 | 0.70 | range (attacks) |
| 100 | Caitlyn | +0.16 | 0.72 | 0.56 | range (attacks) |
| 101 | Lucian | +0.16 | 0.72 | 0.56 | range (attacks) |
| 102 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 103 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 104 | Akshan | +0.12 | 0.68 | 0.56 | range (attacks) |
| 105 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 106 | Miss Fortune | +0.09 | 0.65 | 0.56 | range (attacks) |
| 107 | Sion | +0.08 | 0.40 | 0.32 |  |
| 108 | Ivern | +0.08 | 0.38 | 0.30 |  |
| 109 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 110 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 111 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 112 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 113 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 114 | Sett | +0.07 | 0.07 | 0.00 |  |
| 115 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 116 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 117 | Yone | +0.07 | 0.07 | 0.00 |  |
| 118 | Malzahar | +0.05 | 0.85 | 0.80 |  |
| 119 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 120 | Akali | 0.00 | 0.00 | 0.00 |  |
| 121 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 122 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 123 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 124 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 125 | Briar | 0.00 | 0.00 | 0.00 |  |
| 126 | Darius | 0.00 | 0.00 | 0.00 |  |
| 127 | Diana | 0.00 | 0.00 | 0.00 |  |
| 128 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 129 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 130 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 131 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 132 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 133 | Leona | 0.00 | 0.00 | 0.00 |  |
| 134 | Locke | 0.00 | 0.00 | 0.00 |  |
| 135 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 136 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 137 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 138 | Rell | 0.00 | 0.00 | 0.00 |  |
| 139 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 140 | Riven | 0.00 | 0.00 | 0.00 |  |
| 141 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 142 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 143 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 144 | Talon | 0.00 | 0.00 | 0.00 |  |
| 145 | Taric | 0.00 | 0.00 | 0.00 |  |
| 146 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 147 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 148 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 149 | Jhin | -0.03 | 0.53 | 0.56 | range (attacks) |
| 150 | Vel'Koz | -0.03 | 0.53 | 0.56 | range (attacks) |
| 151 | Janna | -0.08 | 0.72 | 0.80 | range (attacks) |
| 152 | Xerath | -0.12 | 0.53 | 0.65 | range (attacks) |
| 153 | Karthus | -0.17 | 0.39 | 0.56 |  |
| 154 | Kayn | -0.19 | 0.71 | 0.90 |  |
| 155 | Ryze | -0.22 | 0.48 | 0.70 |  |
| 156 | Viego | -0.22 | 0.26 | 0.48 |  |
| 157 | Pantheon | -0.30 | 0.71 | 1.01 |  |
| 158 | Rammus | -0.34 | 0.29 | 0.63 |  |
| 159 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 160 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 161 | Poppy | -0.40 | 0.00 | 0.40 |  |
| 162 | Taliyah | -0.43 | 0.53 | 0.96 | range (attacks) |
| 163 | Katarina | -0.44 | 0.12 | 0.56 |  |
| 164 | Fiddlesticks | -0.53 | 0.39 | 0.92 |  |
| 165 | Shen | -0.61 | 0.29 | 0.90 |  |
| 166 | Nunu & Willump | -0.75 | 0.23 | 0.98 |  |
| 167 | Vi | -0.83 | 0.07 | 0.90 |  |
| 168 | Warwick | -0.89 | 0.47 | 1.36 |  |
| 169 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 170 | Tahm Kench | -1.00 | 0.00 | 1.00 |  |
| 171 | Zac | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.18 | 0.00 | 1.18 |  |
