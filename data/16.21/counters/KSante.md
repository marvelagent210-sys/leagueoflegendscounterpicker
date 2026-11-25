# Counters to K'Sante (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against K'Sante: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (K'Sante wins every time) to +1 (the champion does). Run `npm run duel -- <champion> KSante --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 2 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.28 |
| 3 | Trundle | +0.75 | +1.00 | +1.00 | +1.00 | −0.31 | +1.00 | +0.00 |
| 4 | Tryndamere | +0.60 | +1.00 | +1.00 | +1.00 | −0.25 | −1.00 | +0.81 |
| 5 | Nasus | +0.56 | +1.00 | +1.00 | +1.00 | −0.21 | −1.00 | −0.12 |
| 6 | Zac | +0.45 | +1.00 | +0.00 | +1.00 | −0.29 | – | −0.10 |
| 7 | Aphelios | +0.22 | +1.00 | +1.00 | −1.00 | +0.11 | −0.50 | −0.98 |
| 8 | Jax | +0.15 | +0.00 | +1.00 | +0.00 | −0.19 | −1.00 | +0.53 |
| 9 | Kog'Maw | −0.21 | +0.00 | +0.00 | −1.00 | +0.19 | +0.00 | −0.70 |
| 10 | Garen | −0.25 | −1.00 | +1.00 | −1.00 | −0.14 | – | +0.00 |
| 11 | Yorick | −0.30 | −1.00 | −1.00 | +1.00 | −0.09 | – | +0.81 |
| 12 | Heimerdinger | −0.32 | +1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.90 |
| 13 | Gangplank | −0.35 | +0.00 | −1.00 | +0.00 | +0.04 | −1.00 | −0.03 |
| 14 | Camille | −0.36 | −1.00 | −1.00 | +1.00 | −0.17 | – | +0.00 |
| 15 | Sivir | −0.43 | −1.00 | +0.05 | −1.00 | +0.04 | +0.05 | −0.03 |
| 16 | Annie | −0.62 | −1.00 | −1.00 | −1.00 | +0.03 | +1.00 | −0.59 |
| 17 | Twisted Fate | −0.63 | −1.00 | −1.00 | −1.00 | +0.14 | +1.00 | −1.00 |
| 18 | Evelynn | −0.72 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.70 |
| 19 | Ezreal | −0.73 | −1.00 | −1.00 | −1.00 | +0.03 | −0.33 | +0.02 |
| 20 | Jayce | −0.74 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.90 |
| 21 | Poppy | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.66 |
| 22 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.97 |
| 23 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.78 |
| 24 | Rek'Sai | −0.75 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.65 |
| 25 | Udyr | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.83 |
| 26 | Gnar | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.48 |
| 27 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.37 |
| 28 | Nocturne | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.72 |
| 29 | Aurelion Sol | −0.77 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | +0.03 |
| 30 | Yasuo | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.81 |
| 31 | Rakan | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.52 |
| 32 | Briar | −0.77 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.50 |
| 33 | Sion | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.48 |
| 34 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.63 |
| 35 | Vayne | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.56 |
| 36 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.09 |
| 37 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.43 |
| 38 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.08 |
| 39 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.13 |
| 40 | Corki | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.05 |
| 41 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.37 |
| 42 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.36 |
| 43 | Taric | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.19 |
| 44 | Xayah | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.02 |
| 45 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.14 |
| 46 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.09 |
| 47 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.23 |
| 48 | Warwick | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.24 |
| 49 | Mordekaiser | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.20 |
| 50 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.32 |
| 51 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.03 |
| 52 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 53 | Zaahen | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.05 |
| 54 | Riven | −0.80 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.27 |
| 55 | Bel'Veth | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.07 |
| 56 | Morgana | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.07 |
| 57 | Gwen | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.08 |
| 58 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.74 |
| 59 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 60 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.28 |
| 61 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.30 |
| 62 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.62 |
| 63 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.39 |
| 64 | Sylas | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.27 |
| 65 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.31 |
| 66 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 67 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.44 |
| 68 | Kennen | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.20 |
| 69 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.15 |
| 70 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.27 |
| 71 | Ashe | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.53 |
| 72 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.29 |
| 73 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.60 |
| 74 | Rengar | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.44 |
| 75 | Zeri | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.48 |
| 76 | Braum | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.32 |
| 77 | Volibear | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.25 |
| 78 | Illaoi | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.26 |
| 79 | Zilean | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.41 |
| 80 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.56 |
| 81 | Karma | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.63 |
| 82 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.97 |
| 83 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.66 |
| 84 | Shen | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.64 |
| 85 | Pantheon | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.40 |
| 86 | Fizz | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.34 |
| 87 | Teemo | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.64 |
| 88 | Darius | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.48 |
| 89 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.40 | – | +0.35 |
| 90 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.69 |
| 91 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.47 |
| 92 | Orianna | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.75 |
| 93 | Renekton | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.07 |
| 94 | Aurora | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.74 |
| 95 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.63 |
| 96 | Lux | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.81 |
| 97 | Syndra | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.81 |
| 98 | Elise | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.67 |
| 99 | Kayle | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.85 |
| 100 | Diana | −0.83 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.40 |
| 101 | Kled | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.19 |
| 102 | Vel'Koz | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.55 |
| 103 | Xerath | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.77 |
| 104 | Nilah | −0.83 | −1.00 | −1.00 | −1.00 | −0.29 | – | −0.07 |
| 105 | Milio | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 106 | Jhin | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.96 |
| 107 | Kayn | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | – | −0.29 |
| 108 | Dr. Mundo | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.10 |
| 109 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.45 |
| 110 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.66 |
| 111 | Singed | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.35 |
| 112 | Tristana | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.58 |
| 113 | Hwei | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.64 |
| 114 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.35 |
| 115 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.84 |
| 116 | Galio | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | – | −0.40 |
| 117 | Tahm Kench | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.52 |
| 118 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.80 |
| 119 | Viego | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.11 |
| 120 | Akshan | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.86 |
| 121 | Lee Sin | −0.84 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.34 |
| 122 | Caitlyn | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 123 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.78 |
| 124 | Lulu | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.80 |
| 125 | Shaco | −0.84 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.49 |
| 126 | Jinx | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.98 |
| 127 | Yunara | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.89 |
| 128 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.65 |
| 129 | Zyra | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.96 |
| 130 | Draven | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.82 |
| 131 | Akali | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.18 |
| 132 | Twitch | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.83 |
| 133 | Smolder | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.86 |
| 134 | Mel | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.94 |
| 135 | Cassiopeia | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.94 |
| 136 | Ivern | −0.84 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.80 |
| 137 | Neeko | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.96 |
| 138 | Fiddlesticks | −0.84 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.65 |
| 139 | Zoe | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.90 |
| 140 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 141 | Senna | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.89 |
| 142 | Lillia | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.53 |
| 143 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.99 |
| 144 | Seraphine | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.92 |
| 145 | Xin Zhao | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.15 |
| 146 | Vi | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.55 |
| 147 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.92 |
| 148 | Quinn | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.78 |
| 149 | Katarina | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | – | −0.45 |
| 150 | Rell | −0.84 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.42 |
| 151 | Azir | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.93 |
| 152 | Swain | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 153 | Brand | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.93 |
| 154 | Soraka | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.99 |
| 155 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.88 |
| 156 | Sett | −0.85 | −1.00 | −1.00 | −1.00 | −0.26 | – | −0.52 |
| 157 | Varus | −0.85 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.81 |
| 158 | Nidalee | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −1.00 |
| 159 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | – | −0.43 |
| 160 | Talon | −0.85 | −1.00 | −1.00 | −1.00 | −0.30 | – | −0.46 |
| 161 | Yone | −0.85 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.45 |
| 162 | Karthus | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.98 |
| 163 | Rumble | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.48 |
| 164 | Shyvana | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.51 |
| 165 | Kalista | −0.86 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.79 |
| 166 | Cho'Gath | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.73 |
| 167 | Aatrox | −0.86 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.87 |
| 168 | Anivia | −0.87 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.72 |
| 169 | Vladimir | −0.87 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.81 |
| 170 | Kai'Sa | −0.87 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.98 |
| 171 | Samira | −0.88 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.95 |
| 172 | Thresh | −0.89 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | −0.95 |

## Interaction ledger estimates

Every champion ranked by what its kit does against K'Sante's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in K'Sante's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> KSante` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.74)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks K'Sante's All Out. Spell shield for 1.5 s, long enough to use ahead of All Out. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante R All Out)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks K'Sante's Path Maker. Spell shield for 1.5 s, long enough to use ahead of Path Maker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante W Path Maker)
- **0.46** spell shield: Shroud of Darkness's spell shield blocks K'Sante's Ntofo Strikes. Spell shield for 1.5 s, long enough to use ahead of Ntofo Strikes. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → K'Sante Q Ntofo Strikes)

#### 2. Sivir (net +1.69)

- **1.00** spell shield: Spell Shield's spell shield blocks K'Sante's All Out. Spell shield for 1.5 s, long enough to use ahead of All Out. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante R All Out)
- **0.73** spell shield: Spell Shield's spell shield blocks K'Sante's Path Maker. Spell shield for 1.5 s, long enough to use ahead of Path Maker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante W Path Maker)
- **0.41** spell shield: Spell Shield's spell shield blocks K'Sante's Ntofo Strikes. Spell shield for 1.5 s, long enough to use ahead of Ntofo Strikes. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → K'Sante Q Ntofo Strikes)

#### 3. Udyr (net +1.65)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's All Out (airborne, root, stun). Immune for 1.5 s, long enough to use ahead of All Out. (Udyr E Blazing Stampede → K'Sante R All Out)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's Path Maker (airborne, stun). Immune for 1.5 s, long enough to use ahead of Path Maker. (Udyr E Blazing Stampede → K'Sante W Path Maker)
- **0.60** cc immunity: Blazing Stampede makes Udyr immune to K'Sante's Ntofo Strikes (airborne, slow, stun). Immune for 1.5 s, long enough to use ahead of Ntofo Strikes. (Udyr E Blazing Stampede → K'Sante Q Ntofo Strikes)

#### 4. Fiora (net +1.59)

- **1.00** parry: Riposte parries K'Sante's All Out and stuns back. Parry for 0.75 s; All Out takes 0.55 s to land, enough to react. Negating All Out's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante R All Out)
- **0.88** parry: Riposte parries K'Sante's Path Maker and stuns back. Parry for 0.75 s; Path Maker takes 0.35 s to land, enough to react. Negating Path Maker's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante W Path Maker)
- **0.53** parry: Riposte parries K'Sante's Ntofo Strikes and stuns back. Parry for 0.75 s; Ntofo Strikes takes 0.45 s to land, enough to react. Negating Ntofo Strikes's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → K'Sante Q Ntofo Strikes)

#### 5. Morgana (net +1.59)

- **1.00** cc immunity: Black Shield makes Morgana immune to K'Sante's All Out (airborne, root, stun). Immune for 5 s, long enough to use ahead of All Out. (Morgana E Black Shield → K'Sante R All Out)
- **0.78** cc immunity: Black Shield makes Morgana immune to K'Sante's Path Maker (airborne, stun). Immune for 5 s, long enough to use ahead of Path Maker. (Morgana E Black Shield → K'Sante W Path Maker)
- **0.43** cc immunity: Black Shield makes Morgana immune to K'Sante's Ntofo Strikes (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Ntofo Strikes. (Morgana E Black Shield → K'Sante Q Ntofo Strikes)

#### 6. Maokai (net +1.48)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's All Out. Untargetable for 1.4 s; All Out takes 0.55 s to land, enough to react. (Maokai W Twisted Advance → K'Sante R All Out)
- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's Path Maker. Untargetable for 1.4 s; Path Maker takes 0.35 s to land, enough to react. (Maokai W Twisted Advance → K'Sante W Path Maker)
- **0.49** untargetable: Twisted Advance makes Maokai untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 1.4 s; Ntofo Strikes takes 0.45 s to land, enough to react. (Maokai W Twisted Advance → K'Sante Q Ntofo Strikes)
- Watch out: All Out is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

#### 7. Fizz (net +1.47)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging K'Sante's All Out. Untargetable for 0.75 s; All Out takes 0.55 s to land, enough to react. (Fizz E Playful → K'Sante R All Out)
- **1.00** untargetable: Playful makes Fizz untargetable, dodging K'Sante's Path Maker. Untargetable for 0.75 s; Path Maker takes 0.35 s to land, enough to react. (Fizz E Playful → K'Sante W Path Maker)
- **0.53** untargetable: Playful makes Fizz untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 0.75 s; Ntofo Strikes takes 0.45 s to land, enough to react. (Fizz E Playful → K'Sante Q Ntofo Strikes)
- Watch out: All Out is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

#### 8. Gwen (net +1.47)

- **1.00** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's All Out. Untargetable for ?; All Out takes 0.55 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante R All Out)
- **0.73** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's Path Maker. Untargetable for ?; Path Maker takes 0.35 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante W Path Maker)
- **0.41** untargetable: Hallowed Mist makes Gwen untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for ?; Ntofo Strikes takes 0.45 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → K'Sante Q Ntofo Strikes)

#### 9. Xayah (net +1.38)

- **0.88** untargetable: Featherstorm makes Xayah untargetable, dodging K'Sante's All Out. Untargetable for 1.5 s, long enough to use ahead of All Out. (Xayah R Featherstorm → K'Sante R All Out)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging K'Sante's Path Maker. Untargetable for 1.5 s, long enough to use ahead of Path Maker. (Xayah R Featherstorm → K'Sante W Path Maker)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 1.5 s, long enough to use ahead of Ntofo Strikes. (Xayah R Featherstorm → K'Sante Q Ntofo Strikes)

#### 10. Lissandra (net +1.36)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging K'Sante's All Out. Untargetable for 2.5 s, long enough to use ahead of All Out. (Lissandra R Frozen Tomb → K'Sante R All Out)
- **0.48** untargetable: Frozen Tomb makes Lissandra untargetable, dodging K'Sante's Path Maker. Untargetable for 2.5 s, long enough to use ahead of Path Maker. (Lissandra R Frozen Tomb → K'Sante W Path Maker)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging K'Sante's Ntofo Strikes. Untargetable for 2.5 s, long enough to use ahead of Ntofo Strikes. (Lissandra R Frozen Tomb → K'Sante Q Ntofo Strikes)
- Watch out: All Out is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.74 | 1.74 | 0.00 |  |
| 2 | Sivir | +1.69 | 1.69 | 0.00 |  |
| 3 | Udyr | +1.65 | 1.65 | 0.00 |  |
| 4 | Fiora | +1.59 | 1.59 | 0.00 |  |
| 5 | Morgana | +1.59 | 1.59 | 0.00 |  |
| 6 | Maokai | +1.48 | 1.62 | 0.14 |  |
| 7 | Fizz | +1.47 | 1.63 | 0.16 |  |
| 8 | Gwen | +1.47 | 1.47 | 0.00 |  |
| 9 | Xayah | +1.38 | 1.38 | 0.00 |  |
| 10 | Lissandra | +1.36 | 1.46 | 0.10 |  |
| 11 | Aurora | +1.36 | 1.36 | 0.00 |  |
| 12 | Vladimir | +1.34 | 1.58 | 0.24 |  |
| 13 | Bard | +1.34 | 1.50 | 0.16 |  |
| 14 | Evelynn | +1.33 | 1.33 | 0.00 |  |
| 15 | Olaf | +1.33 | 1.33 | 0.00 |  |
| 16 | Shaco | +1.33 | 1.33 | 0.00 |  |
| 17 | Rengar | +1.30 | 1.30 | 0.00 |  |
| 18 | Gangplank | +1.22 | 1.22 | 0.00 |  |
| 19 | Zed | +1.20 | 1.20 | 0.00 |  |
| 20 | Rek'Sai | +1.03 | 1.35 | 0.32 |  |
| 21 | Master Yi | +1.02 | 1.59 | 0.57 |  |
| 22 | Zaahen | +0.98 | 1.33 | 0.35 |  |
| 23 | Camille | +0.97 | 1.27 | 0.30 |  |
| 24 | Milio | +0.97 | 1.11 | 0.14 |  |
| 25 | Cassiopeia | +0.84 | 0.84 | 0.00 | grounding (Miasma) |
| 26 | Kayle | +0.84 | 0.84 | 0.00 |  |
| 27 | Sion | +0.83 | 1.34 | 0.51 |  |
| 28 | Alistar | +0.83 | 1.06 | 0.23 |  |
| 29 | Kled | +0.73 | 1.20 | 0.47 |  |
| 30 | Teemo | +0.73 | 0.73 | 0.00 | blind (Blinding Dart) |
| 31 | Kalista | +0.66 | 1.04 | 0.38 |  |
| 32 | Yuumi | +0.64 | 1.85 | 1.21 |  |
| 33 | Singed | +0.61 | 0.75 | 0.14 | grounding (Mega Adhesive) |
| 34 | Garen | +0.55 | 0.55 | 0.00 |  |
| 35 | Vex | +0.52 | 0.58 | 0.06 |  |
| 36 | Jax | +0.46 | 0.46 | 0.00 | attack dodge (Counter Strike) |
| 37 | Nasus | +0.43 | 0.43 | 0.00 | attack speed slow (Wither) |
| 38 | Lulu | +0.42 | 0.58 | 0.16 | disarm (Whimsy) |
| 39 | Jinx | +0.41 | 0.49 | 0.08 |  |
| 40 | Viktor | +0.38 | 0.46 | 0.08 |  |
| 41 | Ahri | +0.35 | 0.43 | 0.08 |  |
| 42 | Veigar | +0.34 | 0.42 | 0.08 |  |
| 43 | Hwei | +0.32 | 0.46 | 0.14 |  |
| 44 | Mel | +0.32 | 0.32 | 0.00 |  |
| 45 | Nilah | +0.29 | 0.45 | 0.16 | attack dodge (Jubilant Veil) |
| 46 | Aphelios | +0.27 | 0.27 | 0.00 |  |
| 47 | Xin Zhao | +0.24 | 0.60 | 0.36 |  |
| 48 | Kindred | +0.22 | 0.22 | 0.00 |  |
| 49 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 50 | Sona | +0.21 | 0.21 | 0.00 |  |
| 51 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 52 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 53 | Heimerdinger | +0.18 | 0.18 | 0.00 |  |
| 54 | Kai'Sa | +0.18 | 0.18 | 0.00 |  |
| 55 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 56 | Illaoi | +0.17 | 0.17 | 0.00 |  |
| 57 | Shyvana | +0.17 | 0.17 | 0.00 |  |
| 58 | Volibear | +0.17 | 0.17 | 0.00 |  |
| 59 | Samira | +0.16 | 0.34 | 0.18 |  |
| 60 | Corki | +0.16 | 0.16 | 0.00 |  |
| 61 | Elise | +0.16 | 0.16 | 0.00 |  |
| 62 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 63 | Senna | +0.16 | 0.16 | 0.00 |  |
| 64 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 65 | Zilean | +0.16 | 0.16 | 0.00 |  |
| 66 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 67 | Lux | +0.14 | 0.14 | 0.00 |  |
| 68 | Nidalee | +0.14 | 0.14 | 0.00 |  |
| 69 | Seraphine | +0.14 | 0.14 | 0.00 |  |
| 70 | Kog'Maw | +0.13 | 0.13 | 0.00 |  |
| 71 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 72 | Braum | +0.11 | 0.27 | 0.16 |  |
| 73 | Annie | +0.11 | 0.11 | 0.00 |  |
| 74 | Brand | +0.11 | 0.11 | 0.00 |  |
| 75 | Graves | +0.11 | 0.11 | 0.00 |  |
| 76 | Karma | +0.10 | 0.10 | 0.00 |  |
| 77 | LeBlanc | +0.10 | 0.10 | 0.00 |  |
| 78 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 79 | Amumu | +0.08 | 0.18 | 0.10 |  |
| 80 | Vayne | +0.07 | 0.21 | 0.14 |  |
| 81 | Malphite | +0.05 | 0.45 | 0.40 |  |
| 82 | Renata Glasc | +0.05 | 0.19 | 0.14 |  |
| 83 | Draven | +0.04 | 0.18 | 0.14 |  |
| 84 | Sett | +0.03 | 0.17 | 0.14 |  |
| 85 | Tristana | +0.02 | 0.18 | 0.16 |  |
| 86 | Zoe | +0.02 | 0.16 | 0.14 |  |
| 87 | Hecarim | +0.01 | 0.17 | 0.16 |  |
| 88 | Jayce | 0.00 | 0.14 | 0.14 |  |
| 89 | Akali | 0.00 | 0.00 | 0.00 |  |
| 90 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 91 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 92 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 93 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 94 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 95 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 96 | Leona | 0.00 | 0.00 | 0.00 |  |
| 97 | Locke | 0.00 | 0.00 | 0.00 |  |
| 98 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 99 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 100 | Talon | 0.00 | 0.00 | 0.00 |  |
| 101 | Taric | 0.00 | 0.00 | 0.00 |  |
| 102 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 103 | Gnar | -0.01 | 0.15 | 0.16 |  |
| 104 | Orianna | -0.03 | 0.13 | 0.16 |  |
| 105 | Syndra | -0.03 | 0.11 | 0.14 |  |
| 106 | Swain | -0.04 | 0.10 | 0.14 |  |
| 107 | Neeko | -0.05 | 0.11 | 0.16 |  |
| 108 | Kayn | -0.09 | 1.33 | 1.42 |  |
| 109 | Briar | -0.10 | 0.00 | 0.10 |  |
| 110 | Urgot | -0.11 | 0.07 | 0.18 |  |
| 111 | Lillia | -0.11 | 0.05 | 0.16 |  |
| 112 | Malzahar | -0.12 | 1.13 | 1.25 |  |
| 113 | Bel'Veth | -0.14 | 0.00 | 0.14 |  |
| 114 | Cho'Gath | -0.14 | 0.00 | 0.14 |  |
| 115 | Darius | -0.14 | 0.00 | 0.14 |  |
| 116 | Trundle | -0.14 | 0.00 | 0.14 |  |
| 117 | Yone | -0.15 | 0.35 | 0.50 |  |
| 118 | Ornn | -0.15 | 0.17 | 0.32 |  |
| 119 | Varus | -0.15 | 0.13 | 0.28 |  |
| 120 | Anivia | -0.16 | 0.12 | 0.28 |  |
| 121 | Thresh | -0.16 | 0.09 | 0.25 |  |
| 122 | Diana | -0.16 | 0.00 | 0.16 |  |
| 123 | Lee Sin | -0.16 | 0.00 | 0.16 |  |
| 124 | Qiyana | -0.16 | 0.00 | 0.16 |  |
| 125 | Mordekaiser | -0.18 | 0.10 | 0.28 |  |
| 126 | Azir | -0.19 | 0.13 | 0.32 |  |
| 127 | Zyra | -0.20 | 0.12 | 0.32 |  |
| 128 | Sylas | -0.20 | 0.00 | 0.20 |  |
| 129 | Poppy | -0.21 | 0.59 | 0.80 | dash stop (Steadfast Presence) |
| 130 | Ziggs | -0.21 | 0.13 | 0.34 |  |
| 131 | Nautilus | -0.24 | 0.00 | 0.24 |  |
| 132 | Nami | -0.25 | 0.11 | 0.36 |  |
| 133 | Aurelion Sol | -0.26 | 0.11 | 0.37 |  |
| 134 | Ivern | -0.28 | 0.09 | 0.37 |  |
| 135 | Yorick | -0.28 | 0.00 | 0.28 |  |
| 136 | Wukong | -0.32 | 0.00 | 0.32 |  |
| 137 | Aatrox | -0.33 | 0.00 | 0.33 |  |
| 138 | Yasuo | -0.35 | 0.21 | 0.56 |  |
| 139 | Rakan | -0.35 | 0.05 | 0.40 |  |
| 140 | Blitzcrank | -0.35 | 0.00 | 0.35 |  |
| 141 | Jarvan IV | -0.39 | 0.17 | 0.56 |  |
| 142 | Riven | -0.40 | 0.00 | 0.40 |  |
| 143 | Warwick | -0.41 | 1.52 | 1.93 |  |
| 144 | Rell | -0.47 | 0.00 | 0.47 |  |
| 145 | Rammus | -0.48 | 0.43 | 0.91 | attack reflect (Defensive Ball Curl) |
| 146 | Pyke | -0.48 | 0.00 | 0.48 |  |
| 147 | Sejuani | -0.48 | 0.00 | 0.48 |  |
| 148 | Viego | -0.52 | 0.17 | 0.69 |  |
| 149 | Quinn | -0.54 | 0.18 | 0.72 |  |
| 150 | Akshan | -0.65 | 0.16 | 0.81 |  |
| 151 | Caitlyn | -0.66 | 0.18 | 0.84 |  |
| 152 | Lucian | -0.67 | 0.17 | 0.84 |  |
| 153 | Miss Fortune | -0.68 | 0.16 | 0.84 |  |
| 154 | Jhin | -0.71 | 0.13 | 0.84 |  |
| 155 | Gragas | -0.73 | 0.00 | 0.73 |  |
| 156 | Pantheon | -0.74 | 0.74 | 1.48 |  |
| 157 | Karthus | -0.75 | 0.09 | 0.84 |  |
| 158 | Katarina | -0.76 | 0.00 | 0.76 |  |
| 159 | Vel'Koz | -0.78 | 0.13 | 0.91 |  |
| 160 | Xerath | -0.83 | 0.13 | 0.96 |  |
| 161 | Twisted Fate | -0.85 | 0.20 | 1.05 |  |
| 162 | Shen | -0.92 | 0.43 | 1.35 | attack block (Spirit's Refuge) |
| 163 | Ryze | -0.93 | 0.12 | 1.05 |  |
| 164 | Zac | -0.96 | 0.40 | 1.36 | dash stop (Stretching Strikes) |
| 165 | Nunu & Willump | -1.17 | 0.22 | 1.39 |  |
| 166 | Vi | -1.18 | 0.17 | 1.35 |  |
| 167 | Fiddlesticks | -1.23 | 0.09 | 1.32 |  |
| 168 | Janna | -1.25 | 0.18 | 1.43 |  |
| 169 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 170 | Tahm Kench | -1.42 | 0.00 | 1.42 |  |
| 171 | Taliyah | -1.59 | 0.13 | 1.72 |  |
| 172 | Galio | -1.92 | 0.00 | 1.92 |  |
