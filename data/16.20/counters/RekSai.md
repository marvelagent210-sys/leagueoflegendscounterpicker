# Counters to Rek'Sai (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rek'Sai: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rek'Sai wins every time) to +1 (the champion does). Run `npm run duel -- <champion> RekSai --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Aphelios | +0.88 | +1.00 | +1.00 | +1.00 | +0.51 | +1.00 | +0.00 |
| 2 | Ashe | +0.87 | +1.00 | +1.00 | +1.00 | +0.48 | +1.00 | +0.00 |
| 3 | Malzahar | +0.87 | +1.00 | +1.00 | +1.00 | +0.47 | +1.00 | +0.00 |
| 4 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 5 | Milio | +0.85 | +0.96 | +1.00 | +1.00 | +0.46 | +0.96 | +0.00 |
| 6 | Neeko | +0.85 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.00 |
| 7 | Sivir | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 8 | Ambessa | +0.85 | +1.00 | +1.00 | +1.00 | +0.41 | – | +0.00 |
| 9 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 10 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 11 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.06 | – | +1.00 |
| 12 | Quinn | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 13 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | +0.02 | – | +1.00 |
| 14 | Corki | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 15 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 16 | Graves | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 17 | Bel'Veth | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 18 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 19 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 20 | Orianna | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 21 | Twisted Fate | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 22 | Karma | +0.82 | +1.00 | +0.98 | +0.98 | +0.18 | +1.00 | +0.00 |
| 23 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 24 | Cassiopeia | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 25 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 26 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 27 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 28 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 29 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 30 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 31 | Yone | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 32 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 33 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 34 | Yunara | +0.80 | +0.93 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 35 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 36 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 37 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 38 | Bard | +0.80 | +0.99 | +0.92 | +1.00 | +0.21 | +0.91 | +0.00 |
| 39 | Morgana | +0.80 | +1.00 | +0.94 | +0.92 | +0.19 | +0.99 | +0.00 |
| 40 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 41 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 42 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 43 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 44 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 45 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 46 | Aatrox | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 47 | Malphite | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 48 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 49 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 50 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 51 | Wukong | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 52 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 53 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 54 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 55 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 56 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 57 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 58 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 59 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 60 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 61 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 62 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 63 | Mordekaiser | +0.77 | +1.00 | +1.00 | +0.98 | −0.02 | – | +0.00 |
| 64 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 65 | Maokai | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 66 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 67 | Jax | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 68 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 69 | Gnar | +0.75 | +1.00 | +0.78 | +0.83 | +0.23 | +1.00 | +0.00 |
| 70 | Jinx | +0.71 | +0.88 | +0.90 | +0.81 | +0.08 | +0.90 | +0.00 |
| 71 | Elise | +0.67 | +1.00 | +1.00 | +1.00 | +0.10 | −0.43 | +0.00 |
| 72 | Ezreal | +0.58 | +0.99 | +0.52 | +0.52 | +0.02 | +1.00 | +0.00 |
| 73 | Lillia | +0.57 | +0.53 | +0.97 | +0.97 | +0.01 | +0.02 | +0.00 |
| 74 | Heimerdinger | +0.54 | +1.00 | +0.64 | +0.99 | +0.22 | −1.00 | +0.00 |
| 75 | Sion | +0.52 | +0.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 76 | Zac | +0.49 | +0.20 | +0.84 | +0.84 | +0.05 | – | +0.00 |
| 77 | Lux | +0.47 | +0.58 | +0.41 | +0.51 | +0.15 | +0.94 | +0.00 |
| 78 | Varus | +0.39 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.00 |
| 79 | Kennen | +0.35 | −1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 80 | Nilah | +0.33 | +1.00 | +0.00 | +0.00 | +0.34 | – | +0.00 |
| 81 | Syndra | +0.27 | +1.00 | −0.03 | +0.01 | +0.11 | +0.06 | +0.00 |
| 82 | Irelia | +0.22 | −1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 83 | Pantheon | +0.22 | −1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 84 | Kayn | +0.20 | −1.00 | +0.97 | +0.97 | −0.02 | – | +0.00 |
| 85 | Sona | +0.17 | +0.84 | +1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 86 | Singed | +0.12 | +0.16 | +0.18 | +0.16 | −0.04 | – | +0.00 |
| 87 | Tahm Kench | +0.07 | +0.13 | +0.10 | +0.07 | −0.03 | – | +0.00 |
| 88 | Swain | +0.07 | +0.09 | +0.08 | +0.08 | +0.04 | +0.09 | +0.00 |
| 89 | Vel'Koz | +0.03 | +0.64 | −0.20 | −0.54 | +0.22 | −0.09 | +0.00 |
| 90 | Senna | −0.02 | +0.89 | −1.00 | −0.01 | +0.04 | −0.00 | +0.00 |
| 91 | Hwei | −0.03 | −0.13 | +0.06 | −0.10 | +0.09 | −0.03 | +0.00 |
| 92 | Zilean | −0.05 | +1.00 | −1.00 | −1.00 | +0.31 | +1.00 | +0.00 |
| 93 | Anivia | −0.05 | +0.16 | −0.18 | −0.22 | −0.13 | +0.16 | +0.00 |
| 94 | Janna | −0.08 | +1.00 | −1.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 95 | Kindred | −0.09 | +0.00 | +0.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 96 | Nami | −0.10 | +0.09 | −0.26 | −0.26 | +0.00 | −0.06 | +0.00 |
| 97 | Draven | −0.11 | +1.00 | −1.00 | −1.00 | +0.13 | +0.74 | +0.00 |
| 98 | Zyra | −0.11 | −0.06 | −0.10 | −0.23 | +0.13 | −0.43 | +0.00 |
| 99 | Kai'Sa | −0.19 | +1.00 | −1.00 | −1.00 | −0.04 | +0.17 | +0.00 |
| 100 | Mel | −0.19 | +0.60 | −0.91 | −0.58 | +0.10 | −0.13 | +0.00 |
| 101 | Nocturne | −0.23 | +1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 102 | Zoe | −0.24 | −0.23 | −0.35 | −0.34 | −0.01 | −0.23 | +0.00 |
| 103 | Miss Fortune | −0.28 | +1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 104 | Urgot | −0.29 | −1.00 | +0.99 | −1.00 | +0.10 | −1.00 | +0.00 |
| 105 | Lucian | −0.29 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 106 | Samira | −0.30 | +1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 107 | Riven | −0.32 | −1.00 | −1.00 | +1.00 | +0.08 | – | +0.00 |
| 108 | Rumble | −0.32 | +0.69 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 109 | Soraka | −0.33 | −0.12 | −1.00 | −0.15 | +0.05 | −0.27 | +0.00 |
| 110 | Smolder | −0.41 | −1.00 | +0.00 | −1.00 | +0.29 | +0.00 | +0.00 |
| 111 | Karthus | −0.44 | −0.39 | −0.45 | −1.00 | +0.08 | −0.44 | +0.00 |
| 112 | Tristana | −0.54 | −1.00 | −1.00 | −1.00 | +0.37 | +1.00 | +0.00 |
| 113 | Brand | −0.56 | −0.01 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 114 | Master Yi | −0.56 | −1.00 | −1.00 | −1.00 | −0.04 | +1.00 | +1.00 |
| 115 | Veigar | −0.58 | −0.25 | −1.00 | −0.83 | −0.03 | −0.93 | +0.00 |
| 116 | Lissandra | −0.59 | −1.00 | −1.00 | −0.51 | +0.14 | −0.05 | +0.00 |
| 117 | Vex | −0.59 | −1.00 | −0.52 | −0.56 | +0.00 | −1.00 | +0.00 |
| 118 | Ryze | −0.61 | −0.30 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 119 | Seraphine | −0.62 | −1.00 | −1.00 | −1.00 | +0.17 | +0.55 | +0.00 |
| 120 | Nautilus | −0.67 | −1.00 | −1.00 | −1.00 | +0.00 | +0.31 | +0.00 |
| 121 | Rell | −0.68 | −1.00 | −1.00 | −1.00 | +0.16 | +0.00 | +0.00 |
| 122 | Ziggs | −0.68 | −1.00 | −1.00 | −1.00 | +0.13 | +0.00 | +0.00 |
| 123 | Annie | −0.69 | −1.00 | −1.00 | −1.00 | +0.14 | −0.06 | +0.00 |
| 124 | Azir | −0.70 | −1.00 | −1.00 | −1.00 | +0.01 | +0.00 | +0.00 |
| 125 | Blitzcrank | −0.70 | −1.00 | −1.00 | −1.00 | −0.03 | +0.00 | +0.00 |
| 126 | Viktor | −0.71 | −1.00 | −1.00 | −1.00 | +0.04 | −0.13 | +0.00 |
| 127 | Rengar | −0.71 | −1.00 | −1.00 | −1.00 | +0.41 | – | +0.00 |
| 128 | Sylas | −0.72 | −1.00 | −1.00 | −1.00 | +0.37 | – | +0.00 |
| 129 | Jhin | −0.72 | −0.88 | −0.94 | −0.94 | +0.16 | −1.00 | +0.00 |
| 130 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | +0.00 |
| 131 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 132 | Fizz | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 133 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 134 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 135 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 136 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 137 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 138 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | −0.87 | +0.00 |
| 139 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 140 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 141 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 142 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 143 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 144 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 145 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 146 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 147 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 148 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 149 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 150 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 151 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 152 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 153 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 154 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 155 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 156 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 157 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 158 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 159 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 160 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 161 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 162 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 163 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 164 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 165 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 166 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 167 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 168 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 169 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 170 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 171 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 172 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rek'Sai's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rek'Sai's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> RekSai` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.41)

- **0.90** spell shield: Spell Shield's spell shield blocks Rek'Sai's Void Rush. Spell shield for 1.5 s, long enough to use ahead of Void Rush. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rek'Sai R Void Rush)
- **0.35** spell shield: Spell Shield's spell shield blocks Rek'Sai's Unburrow. Spell shield for 1.5 s, long enough to use ahead of Unburrow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Rek'Sai W Unburrow)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Rek'Sai's (500 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Sivir basic attacks → Rek'Sai basic attacks)

#### 2. Fiora (net +0.82)

- **0.90** parry: Riposte parries Rek'Sai's Void Rush. Parry for 0.75 s; Void Rush takes 1.32 s to land, enough to react. (Fiora W Riposte → Rek'Sai R Void Rush)
- **0.31** parry: Riposte parries Rek'Sai's Unburrow and stuns back. Parry for 0.75 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unburrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rek'Sai W Unburrow)
- **0.28** parry: Riposte parries Rek'Sai's Furious Bite. Parry for 0.75 s; Furious Bite takes 0.25 s to land, enough to react. (Fiora W Riposte → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Fiora's Riposte.

#### 3. Kayle (net +0.68)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Void Rush (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Void Rush. (Kayle R Divine Judgment → Rek'Sai R Void Rush)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Rek'Sai's (625 vs 175 attack range). Rek'Sai closes the gap with Tunnel, Void Rush. (Kayle basic attacks → Rek'Sai basic attacks)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Rek'Sai's Queen's Wrath. Invulnerable for 2.5 s, long enough to use ahead of Queen's Wrath. (Kayle R Divine Judgment → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Kayle's Starfire Spellblade.

#### 4. Gwen (net +0.56)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai R Void Rush)
- **0.27** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai E Furious Bite)
- **0.21** untargetable: Hallowed Mist makes Gwen untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Gwen's Needlework.

#### 5. Xayah (net +0.54)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Void Rush. Untargetable for 1.5 s, long enough to use ahead of Void Rush. (Xayah R Featherstorm → Rek'Sai R Void Rush)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Unburrow. Untargetable for 1.5 s, long enough to use ahead of Unburrow. (Xayah R Featherstorm → Rek'Sai W Unburrow)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Rek'Sai's Queen's Wrath. Untargetable for 1.5 s, long enough to use ahead of Queen's Wrath. (Xayah R Featherstorm → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Xayah's Featherstorm.

#### 6. Vladimir (net +0.52)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Void Rush. Untargetable for 2 s, long enough to use ahead of Void Rush. (Vladimir W Sanguine Pool → Rek'Sai R Void Rush)
- **0.35** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Unburrow. Untargetable for 2 s, long enough to use ahead of Unburrow. (Vladimir W Sanguine Pool → Rek'Sai W Unburrow)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 2 s, long enough to use ahead of Furious Bite. (Vladimir W Sanguine Pool → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Vladimir's Hemoplague.

#### 7. Yuumi (net +0.49)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai R Void Rush)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai W Unburrow)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rek'Sai E Furious Bite)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Yuumi's Final Chapter.

#### 8. Bard (net +0.49)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Void Rush. Untargetable for 2.5 s, long enough to use ahead of Void Rush. (Bard R Tempered Fate → Rek'Sai R Void Rush)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Unburrow. Untargetable for 2.5 s, long enough to use ahead of Unburrow. (Bard R Tempered Fate → Rek'Sai W Unburrow)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Rek'Sai's Queen's Wrath. Untargetable for 2.5 s, long enough to use ahead of Queen's Wrath. (Bard R Tempered Fate → Rek'Sai Q Queen's Wrath)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Bard's Tempered Fate.

#### 9. Master Yi (net +0.45)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Void Rush. Untargetable for ?; Void Rush takes 1.32 s to land, enough to react. (Master Yi Q Alpha Strike → Rek'Sai R Void Rush)
- **0.27** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Furious Bite. Untargetable for ?; Furious Bite takes 0.25 s to land, enough to react. (Master Yi Q Alpha Strike → Rek'Sai E Furious Bite)
- **0.21** untargetable: Alpha Strike makes Master Yi untargetable, dodging Rek'Sai's Unburrow. Untargetable for ?; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Master Yi's Alpha Strike.

#### 10. Shaco (net +0.42)

- **0.90** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Void Rush. Untargetable for 0.5 s; Void Rush takes 1.32 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai R Void Rush)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Furious Bite. Untargetable for 0.5 s; Furious Bite takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Rek'Sai E Furious Bite)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Rek'Sai's Unburrow. Untargetable for 0.5 s; Unburrow lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Shaco R Hallucinate → Rek'Sai W Unburrow)
- Watch out: Void Rush makes Rek'Sai untargetable, dodging Shaco's Deceive.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 2 | Fiora | +0.82 | 1.15 | 0.33 |  |
| 3 | Kayle | +0.68 | 0.88 | 0.20 |  |
| 4 | Gwen | +0.56 | 1.11 | 0.55 |  |
| 5 | Xayah | +0.54 | 1.25 | 0.71 |  |
| 6 | Vladimir | +0.52 | 1.28 | 0.76 |  |
| 7 | Yuumi | +0.49 | 1.47 | 0.98 |  |
| 8 | Bard | +0.49 | 1.36 | 0.87 |  |
| 9 | Master Yi | +0.45 | 1.11 | 0.66 |  |
| 10 | Shaco | +0.42 | 1.07 | 0.65 |  |
| 11 | Aurora | +0.38 | 1.15 | 0.77 |  |
| 12 | Singed | +0.37 | 0.82 | 0.45 | grounding (Mega Adhesive) |
| 13 | Lissandra | +0.33 | 1.30 | 0.97 |  |
| 14 | Nocturne | +0.25 | 1.32 | 1.07 |  |
| 15 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 16 | Teemo | +0.23 | 0.67 | 0.44 |  |
| 17 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 18 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 19 | Fizz | +0.12 | 1.17 | 1.05 |  |
| 20 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 21 | Zed | +0.06 | 0.96 | 0.90 |  |
| 22 | Kindred | +0.06 | 0.27 | 0.21 |  |
| 23 | Samira | +0.05 | 0.48 | 0.43 |  |
| 24 | Maokai | +0.02 | 1.15 | 1.13 |  |
| 25 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 26 | Kayn | -0.01 | 1.07 | 1.08 |  |
| 27 | Vex | -0.02 | 0.70 | 0.72 |  |
| 28 | Jinx | -0.02 | 0.57 | 0.59 | dash stop (Flame Chompers!) |
| 29 | Nasus | -0.04 | 0.30 | 0.34 |  |
| 30 | Corki | -0.10 | 0.20 | 0.30 |  |
| 31 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 32 | Veigar | -0.11 | 0.55 | 0.66 | dash stop (Event Horizon) |
| 33 | Zilean | -0.11 | 0.20 | 0.31 |  |
| 34 | Evelynn | -0.14 | 1.07 | 1.21 |  |
| 35 | Milio | -0.15 | 0.22 | 0.37 |  |
| 36 | Udyr | -0.17 | 0.40 | 0.57 |  |
| 37 | Viktor | -0.19 | 0.59 | 0.78 | dash stop (Gravity Field) |
| 38 | Zoe | -0.19 | 0.20 | 0.39 |  |
| 39 | Nidalee | -0.19 | 0.18 | 0.37 |  |
| 40 | Soraka | -0.19 | 0.17 | 0.36 |  |
| 41 | Dr. Mundo | -0.20 | 0.00 | 0.20 |  |
| 42 | Cassiopeia | -0.21 | 0.76 | 0.97 | grounding (Miasma) |
| 43 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 44 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 45 | Camille | -0.26 | 1.02 | 1.28 |  |
| 46 | Morgana | -0.26 | 0.46 | 0.72 |  |
| 47 | Vayne | -0.26 | 0.27 | 0.53 |  |
| 48 | Mel | -0.27 | 0.45 | 0.72 |  |
| 49 | Hwei | -0.30 | 0.54 | 0.84 | dash stop (Grim Visage) |
| 50 | Karma | -0.31 | 0.13 | 0.44 |  |
| 51 | Elise | -0.32 | 0.20 | 0.52 |  |
| 52 | Ahri | -0.34 | 0.54 | 0.88 | dash stop (Charm) |
| 53 | Jayce | -0.34 | 0.18 | 0.52 |  |
| 54 | Taric | -0.34 | 0.00 | 0.34 |  |
| 55 | Gangplank | -0.37 | 0.28 | 0.65 |  |
| 56 | Alistar | -0.38 | 0.26 | 0.64 |  |
| 57 | Lux | -0.38 | 0.18 | 0.56 |  |
| 58 | Braum | -0.39 | 0.45 | 0.84 | projectile block (Unbreakable) |
| 59 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 60 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 61 | Twisted Fate | -0.41 | 0.25 | 0.66 |  |
| 62 | Shyvana | -0.42 | 0.16 | 0.58 |  |
| 63 | Jax | -0.44 | 0.40 | 0.84 |  |
| 64 | Ashe | -0.44 | 0.24 | 0.68 |  |
| 65 | Rengar | -0.46 | 0.29 | 0.75 |  |
| 66 | Ezreal | -0.46 | 0.20 | 0.66 |  |
| 67 | Graves | -0.46 | 0.14 | 0.60 |  |
| 68 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 69 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 70 | Lulu | -0.48 | 0.50 | 0.98 |  |
| 71 | Anivia | -0.48 | 0.16 | 0.64 |  |
| 72 | Varus | -0.49 | 0.30 | 0.79 |  |
| 73 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 74 | Kennen | -0.50 | 0.18 | 0.68 |  |
| 75 | Yorick | -0.50 | 0.00 | 0.50 |  |
| 76 | Xin Zhao | -0.51 | 0.59 | 1.10 |  |
| 77 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 78 | Ivern | -0.54 | 0.11 | 0.65 |  |
| 79 | Illaoi | -0.55 | 0.16 | 0.71 |  |
| 80 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 81 | Draven | -0.56 | 0.22 | 0.78 |  |
| 82 | Blitzcrank | -0.57 | 0.00 | 0.57 |  |
| 83 | Kassadin | -0.57 | 0.00 | 0.57 |  |
| 84 | Senna | -0.58 | 0.22 | 0.80 |  |
| 85 | Yasuo | -0.59 | 0.34 | 0.93 |  |
| 86 | Ziggs | -0.59 | 0.17 | 0.76 |  |
| 87 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 88 | Annie | -0.62 | 0.15 | 0.77 |  |
| 89 | Brand | -0.62 | 0.14 | 0.76 |  |
| 90 | Malzahar | -0.64 | 0.72 | 1.36 |  |
| 91 | Kalista | -0.64 | 0.45 | 1.09 |  |
| 92 | Tristana | -0.64 | 0.24 | 0.88 |  |
| 93 | Sona | -0.65 | 0.26 | 0.91 |  |
| 94 | Quinn | -0.65 | 0.22 | 0.87 |  |
| 95 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 96 | Syndra | -0.65 | 0.14 | 0.79 |  |
| 97 | Garen | -0.65 | 0.00 | 0.65 |  |
| 98 | Shen | -0.66 | 0.37 | 1.03 |  |
| 99 | Poppy | -0.67 | 0.57 | 1.24 | dash stop (Steadfast Presence) |
| 100 | Nilah | -0.67 | 0.35 | 1.02 |  |
| 101 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 102 | Katarina | -0.67 | 0.12 | 0.79 |  |
| 103 | Swain | -0.67 | 0.12 | 0.79 |  |
| 104 | Mordekaiser | -0.68 | 0.07 | 0.75 |  |
| 105 | Talon | -0.69 | 0.00 | 0.69 |  |
| 106 | Sion | -0.71 | 0.33 | 1.04 |  |
| 107 | Renekton | -0.71 | 0.00 | 0.71 |  |
| 108 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 109 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 110 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 111 | Lee Sin | -0.72 | 0.00 | 0.72 |  |
| 112 | Thresh | -0.74 | 0.11 | 0.85 |  |
| 113 | Locke | -0.74 | 0.00 | 0.74 |  |
| 114 | Miss Fortune | -0.75 | 0.20 | 0.95 |  |
| 115 | Riven | -0.75 | 0.00 | 0.75 |  |
| 116 | Aphelios | -0.76 | 0.24 | 1.00 |  |
| 117 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 118 | Renata Glasc | -0.76 | 0.24 | 1.00 |  |
| 119 | Irelia | -0.76 | 0.00 | 0.76 |  |
| 120 | Orianna | -0.77 | 0.16 | 0.93 |  |
| 121 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 122 | Darius | -0.79 | 0.00 | 0.79 |  |
| 123 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 124 | Trundle | -0.80 | 0.00 | 0.80 |  |
| 125 | Malphite | -0.82 | 0.36 | 1.18 |  |
| 126 | Akali | -0.83 | 0.00 | 0.83 |  |
| 127 | Azir | -0.84 | 0.16 | 1.00 |  |
| 128 | Vel'Koz | -0.85 | 0.16 | 1.01 |  |
| 129 | Zyra | -0.85 | 0.16 | 1.01 |  |
| 130 | Neeko | -0.86 | 0.14 | 1.00 |  |
| 131 | Amumu | -0.87 | 0.19 | 1.06 |  |
| 132 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 133 | Xerath | -0.90 | 0.16 | 1.06 |  |
| 134 | Nami | -0.90 | 0.14 | 1.04 |  |
| 135 | Urgot | -0.90 | 0.08 | 0.98 |  |
| 136 | Pantheon | -0.92 | 0.67 | 1.59 |  |
| 137 | Yone | -0.92 | 0.36 | 1.28 |  |
| 138 | Diana | -0.92 | 0.00 | 0.92 |  |
| 139 | Skarner | -0.92 | 0.00 | 0.92 |  |
| 140 | Ekko | -0.94 | 0.00 | 0.94 |  |
| 141 | Zaahen | -0.97 | 0.20 | 1.17 |  |
| 142 | Kled | -0.98 | 0.24 | 1.22 |  |
| 143 | Leona | -0.98 | 0.00 | 0.98 |  |
| 144 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 145 | Nautilus | -1.02 | 0.00 | 1.02 |  |
| 146 | K'Sante | -1.03 | 0.32 | 1.35 |  |
| 147 | Volibear | -1.03 | 0.16 | 1.19 |  |
| 148 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 149 | Hecarim | -1.06 | 0.17 | 1.23 |  |
| 150 | Sett | -1.06 | 0.16 | 1.22 |  |
| 151 | Aurelion Sol | -1.06 | 0.14 | 1.20 |  |
| 152 | Wukong | -1.07 | 0.00 | 1.07 |  |
| 153 | Jarvan IV | -1.09 | 0.16 | 1.25 |  |
| 154 | Qiyana | -1.09 | 0.00 | 1.09 |  |
| 155 | Ornn | -1.13 | 0.16 | 1.29 |  |
| 156 | Sejuani | -1.16 | 0.00 | 1.16 |  |
| 157 | Rammus | -1.21 | 0.30 | 1.51 |  |
| 158 | Zac | -1.23 | 0.40 | 1.63 | dash stop (Stretching Strikes) |
| 159 | Janna | -1.23 | 0.22 | 1.45 |  |
| 160 | Rell | -1.23 | 0.00 | 1.23 |  |
| 161 | Briar | -1.27 | 0.00 | 1.27 |  |
| 162 | Gragas | -1.29 | 0.00 | 1.29 |  |
| 163 | Fiddlesticks | -1.30 | 0.11 | 1.41 |  |
| 164 | Nunu & Willump | -1.33 | 0.00 | 1.33 |  |
| 165 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 166 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 167 | Viego | -1.36 | 0.16 | 1.52 |  |
| 168 | Warwick | -1.43 | 0.47 | 1.90 |  |
| 169 | Taliyah | -1.56 | 0.16 | 1.72 |  |
| 170 | Tahm Kench | -1.59 | 0.00 | 1.59 |  |
| 171 | Vi | -1.65 | 0.16 | 1.81 |  |
| 172 | Galio | -1.94 | 0.00 | 1.94 |  |
