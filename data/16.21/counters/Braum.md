# Counters to Braum (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Braum: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Braum wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Braum --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.68 |
| 2 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.88 |
| 3 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.62 |
| 4 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.85 |
| 5 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.49 |
| 6 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.28 |
| 7 | Shyvana | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.29 |
| 8 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.32 |
| 9 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.71 |
| 10 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.17 |
| 11 | Gnar | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.21 |
| 12 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.18 |
| 13 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 14 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.20 |
| 15 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.15 |
| 16 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.35 |
| 17 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.11 |
| 18 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.22 |
| 19 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.12 |
| 20 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.06 |
| 21 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.08 |
| 22 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.08 |
| 23 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | +0.15 | – | −0.31 |
| 24 | Mordekaiser | +0.79 | +1.00 | +1.00 | +0.94 | +0.05 | – | +0.24 |
| 25 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.02 |
| 26 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.09 |
| 27 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.12 |
| 28 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.16 |
| 29 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.14 |
| 30 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | +0.05 | +0.68 | −0.05 |
| 31 | Aphelios | +0.70 | +1.00 | +1.00 | +1.00 | +0.05 | +0.10 | −0.42 |
| 32 | Udyr | +0.69 | +0.99 | +0.92 | +0.43 | +0.02 | +0.96 | +0.55 |
| 33 | Elise | +0.66 | +1.00 | +0.97 | +1.00 | +0.02 | −0.31 | −0.03 |
| 34 | Quinn | +0.66 | +1.00 | +1.00 | +0.85 | +0.04 | +0.00 | −0.44 |
| 35 | Sivir | +0.61 | +1.00 | +1.00 | +0.06 | +0.04 | +0.90 | −0.02 |
| 36 | Jinx | +0.59 | +0.98 | +1.00 | +0.03 | +0.05 | +0.98 | −0.27 |
| 37 | Zeri | +0.59 | +1.00 | +1.00 | −0.17 | +0.04 | +1.00 | +0.26 |
| 38 | Zac | +0.57 | +0.40 | +0.95 | +0.98 | −0.08 | – | −0.14 |
| 39 | Aatrox | +0.55 | +1.00 | +1.00 | +0.06 | +0.07 | – | −0.48 |
| 40 | Twisted Fate | +0.53 | +1.00 | +0.45 | +0.37 | +0.02 | +1.00 | −0.14 |
| 41 | Rumble | +0.53 | +0.91 | +0.98 | +0.00 | +0.03 | – | +0.01 |
| 42 | Xin Zhao | +0.47 | +1.00 | +0.70 | +0.00 | +0.03 | – | −0.16 |
| 43 | Ezreal | +0.40 | +1.00 | +1.00 | −0.99 | +0.01 | +1.00 | +0.01 |
| 44 | Malzahar | +0.35 | +0.95 | +0.07 | +1.00 | +0.04 | −1.00 | −0.11 |
| 45 | Cho'Gath | +0.34 | +1.00 | +1.00 | −1.00 | +0.12 | – | −0.27 |
| 46 | Karma | +0.30 | +0.42 | +0.41 | +0.17 | +0.04 | +0.71 | −0.26 |
| 47 | Taric | +0.23 | +0.31 | +0.28 | +0.31 | −0.00 | – | −0.03 |
| 48 | Garen | +0.23 | +1.00 | −1.00 | +1.00 | +0.09 | – | −0.14 |
| 49 | Heimerdinger | +0.22 | +0.01 | +0.01 | +0.96 | +0.04 | +0.12 | +0.06 |
| 50 | Orianna | +0.19 | +0.88 | +0.91 | −1.00 | +0.03 | −0.59 | −0.05 |
| 51 | Morgana | +0.19 | +0.23 | +0.25 | +0.21 | +0.04 | +0.21 | +0.06 |
| 52 | Lillia | +0.17 | +0.10 | +0.06 | +0.03 | +0.05 | +1.00 | +0.35 |
| 53 | Maokai | +0.15 | +0.15 | +0.26 | +0.15 | +0.07 | – | −0.12 |
| 54 | Neeko | +0.15 | +0.21 | +0.18 | −0.21 | +0.04 | +0.83 | −0.00 |
| 55 | Milio | +0.13 | +0.35 | +0.51 | −0.59 | +0.08 | +0.27 | −0.08 |
| 56 | Hwei | +0.11 | +0.05 | +0.06 | −0.04 | +0.04 | +0.89 | −0.07 |
| 57 | Singed | +0.08 | +0.09 | +0.11 | +0.13 | −0.03 | – | +0.01 |
| 58 | Riven | +0.07 | −0.93 | +1.00 | +0.04 | +0.19 | – | +0.16 |
| 59 | Kog'Maw | +0.06 | +1.00 | +0.00 | −1.00 | +0.05 | +0.03 | −0.07 |
| 60 | Vel'Koz | +0.04 | +0.13 | +0.09 | −0.09 | +0.09 | −0.09 | −0.02 |
| 61 | Annie | +0.04 | −0.06 | +0.01 | +0.15 | +0.03 | +0.11 | +0.06 |
| 62 | Tahm Kench | +0.02 | −0.03 | +0.06 | −0.02 | +0.08 | – | +0.00 |
| 63 | Zilean | +0.00 | +0.25 | −0.18 | −0.49 | +0.03 | +0.72 | +0.21 |
| 64 | Shen | −0.00 | −0.07 | +0.01 | +0.07 | +0.00 | – | −0.00 |
| 65 | Syndra | −0.00 | −0.09 | +0.03 | +0.00 | +0.06 | +0.01 | −0.01 |
| 66 | Renekton | −0.01 | −0.03 | +0.02 | −0.03 | +0.00 | – | +0.04 |
| 67 | Malphite | −0.01 | −0.03 | −0.04 | −0.01 | +0.03 | – | +0.11 |
| 68 | Sion | −0.02 | −0.06 | −0.04 | −0.04 | +0.02 | – | +0.28 |
| 69 | Lux | −0.02 | +0.18 | +0.00 | −0.37 | +0.04 | +0.14 | −0.14 |
| 70 | Gragas | −0.02 | −0.04 | −0.02 | −0.12 | +0.12 | – | +0.15 |
| 71 | Soraka | −0.02 | +0.03 | +0.05 | −0.12 | +0.02 | −0.16 | −0.17 |
| 72 | Yone | −0.03 | +0.65 | +0.05 | −1.00 | +0.06 | – | −0.10 |
| 73 | Rammus | −0.03 | −0.05 | −0.05 | −0.07 | +0.06 | – | +0.07 |
| 74 | Ornn | −0.06 | −0.13 | −0.08 | −0.12 | +0.14 | – | −0.03 |
| 75 | Anivia | −0.06 | −0.03 | −0.03 | −0.21 | −0.11 | −0.01 | +0.19 |
| 76 | Nami | −0.07 | +0.01 | −0.07 | −0.24 | +0.02 | −0.06 | −0.16 |
| 77 | Swain | −0.09 | −0.22 | +0.01 | −0.08 | +0.06 | −0.22 | −0.10 |
| 78 | Brand | −0.09 | −0.05 | −0.26 | −0.01 | +0.02 | −0.01 | −0.26 |
| 79 | Rell | −0.09 | −0.14 | −0.10 | −0.12 | +0.07 | −0.12 | −0.16 |
| 80 | Mel | −0.18 | +0.03 | +0.00 | −0.99 | +0.05 | −0.01 | +0.11 |
| 81 | Zyra | −0.19 | −0.05 | +0.00 | −0.81 | +0.02 | −0.16 | −0.10 |
| 82 | Senna | −0.20 | −0.02 | −0.02 | −0.96 | +0.04 | +0.02 | −0.07 |
| 83 | Xayah | −0.25 | +1.00 | −0.94 | −0.91 | +0.04 | −0.80 | −0.12 |
| 84 | Bard | −0.28 | −0.46 | −0.61 | −0.54 | +0.03 | +1.00 | −0.10 |
| 85 | Veigar | −0.30 | −0.15 | −0.16 | −1.00 | +0.02 | −0.21 | −0.08 |
| 86 | Azir | −0.34 | +0.72 | −1.00 | −1.00 | +0.03 | −0.86 | +0.18 |
| 87 | Gwen | −0.39 | −0.79 | +0.04 | −1.00 | +0.10 | – | +0.45 |
| 88 | Karthus | −0.40 | −0.22 | −0.22 | −1.00 | +0.07 | −0.99 | −0.04 |
| 89 | Zoe | −0.40 | −0.26 | −0.78 | −0.56 | +0.03 | −0.26 | −0.14 |
| 90 | Lissandra | −0.44 | −0.34 | −0.98 | −0.63 | +0.03 | −0.04 | +0.23 |
| 91 | Aurora | −0.48 | −0.72 | −0.86 | −1.00 | +0.06 | +1.00 | +0.17 |
| 92 | Viego | −0.51 | −0.04 | −1.00 | −1.00 | +0.10 | – | −0.22 |
| 93 | Jhin | −0.51 | −0.71 | −0.29 | −1.00 | +0.01 | −0.54 | −0.22 |
| 94 | Lucian | −0.53 | −0.94 | −0.80 | −0.87 | +0.05 | +0.66 | +0.20 |
| 95 | Xerath | −0.53 | −0.50 | −0.42 | −1.00 | +0.02 | −0.99 | −0.03 |
| 96 | Nilah | −0.53 | −0.03 | −1.00 | −1.00 | +0.13 | −1.00 | +0.17 |
| 97 | Varus | −0.53 | −0.46 | −0.60 | −1.00 | +0.02 | −0.85 | +0.26 |
| 98 | Master Yi | −0.54 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.98 |
| 99 | Miss Fortune | −0.54 | −0.04 | −0.93 | −1.00 | +0.02 | −1.00 | −0.05 |
| 100 | Caitlyn | −0.57 | −0.47 | −0.86 | −1.00 | +0.03 | −0.28 | −0.40 |
| 101 | Viktor | −0.60 | −0.57 | −0.97 | −0.96 | +0.02 | −0.22 | +0.05 |
| 102 | Tristana | −0.62 | −1.00 | −1.00 | −1.00 | +0.06 | +0.73 | −0.10 |
| 103 | Graves | −0.68 | −0.95 | −1.00 | −0.96 | +0.10 | +0.12 | −0.46 |
| 104 | Kennen | −0.68 | −1.00 | −1.00 | −1.00 | +0.06 | +0.05 | +0.09 |
| 105 | Ahri | −0.69 | −0.85 | −0.95 | −0.86 | +0.02 | −0.76 | +0.12 |
| 106 | Aurelion Sol | −0.70 | −1.00 | −1.00 | −1.00 | +0.24 | −0.24 | −0.23 |
| 107 | Rengar | −0.71 | −1.00 | −1.00 | −1.00 | +0.41 | – | −0.02 |
| 108 | Smolder | −0.71 | −0.90 | −0.94 | −1.00 | +0.10 | −0.49 | −0.31 |
| 109 | Jayce | −0.73 | −1.00 | −1.00 | −0.96 | +0.11 | – | +0.33 |
| 110 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.27 |
| 111 | Nocturne | −0.74 | −0.99 | −0.99 | −1.00 | +0.01 | – | +0.51 |
| 112 | Jarvan IV | −0.74 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.40 |
| 113 | Sylas | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.12 |
| 114 | Seraphine | −0.75 | −0.98 | −1.00 | −1.00 | +0.02 | −0.45 | −0.30 |
| 115 | Ziggs | −0.75 | −1.00 | −1.00 | −1.00 | +0.05 | −0.61 | +0.01 |
| 116 | Camille | −0.75 | −1.00 | −0.99 | −1.00 | +0.02 | – | +0.33 |
| 117 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.02 |
| 118 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.32 |
| 119 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.04 |
| 120 | Vex | −0.76 | −0.93 | −0.95 | −0.99 | +0.01 | −0.98 | +0.08 |
| 121 | Zed | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.30 |
| 122 | Tryndamere | −0.76 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.31 |
| 123 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.19 |
| 124 | Sejuani | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.22 |
| 125 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.01 |
| 126 | Fizz | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.07 |
| 127 | Wukong | −0.76 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.15 |
| 128 | Nautilus | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.09 |
| 129 | Lee Sin | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.01 |
| 130 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.05 |
| 131 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.04 |
| 132 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.12 |
| 133 | Vi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.05 |
| 134 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.07 |
| 135 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.01 |
| 136 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.05 |
| 137 | Irelia | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.02 |
| 138 | Alistar | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.04 |
| 139 | Akshan | −0.77 | −1.00 | −0.99 | −1.00 | +0.04 | −0.72 | −0.14 |
| 140 | Qiyana | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.08 |
| 141 | Leona | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.09 |
| 142 | Akali | −0.77 | −1.00 | −0.99 | −1.00 | −0.00 | – | +0.04 |
| 143 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.03 |
| 144 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.13 |
| 145 | Samira | −0.78 | −1.00 | −1.00 | −0.97 | +0.02 | −0.89 | +0.06 |
| 146 | Kayn | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.04 |
| 147 | Twitch | −0.78 | −1.00 | −0.97 | −1.00 | +0.09 | −0.93 | −0.20 |
| 148 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.16 |
| 149 | Rakan | −0.78 | −1.00 | −1.00 | −0.98 | +0.02 | −1.00 | +0.22 |
| 150 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.13 |
| 151 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.75 | −0.36 |
| 152 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −0.95 | +0.01 |
| 153 | Pyke | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.08 |
| 154 | Cassiopeia | −0.79 | −0.99 | −0.99 | −1.00 | +0.06 | −1.00 | −0.09 |
| 155 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.07 |
| 156 | Briar | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.19 |
| 157 | Yunara | −0.80 | −0.99 | −1.00 | −0.96 | +0.04 | −1.00 | −0.25 |
| 158 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.24 |
| 159 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.14 |
| 160 | Draven | −0.80 | −0.95 | −1.00 | −1.00 | +0.03 | −1.00 | −0.28 |
| 161 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.08 |
| 162 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 163 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.14 |
| 164 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.26 |
| 165 | Janna | −0.80 | −1.00 | −0.99 | −1.00 | +0.04 | −1.00 | −0.21 |
| 166 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.22 |
| 167 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.24 |
| 168 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −0.99 | −0.28 |
| 169 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.37 |
| 170 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.18 |
| 171 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.59 |
| 172 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.69 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Braum's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Braum's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Braum` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Camille (net +0.84)

- **0.80** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Braum's Glacial Fissure. Untargetable for 0.5 s; Glacial Fissure takes 1.36 s to land, enough to react. (Camille R The Hextech Ultimatum → Braum R Glacial Fissure)
- **0.08** cc immunity: The Hextech Ultimatum is displacement immune, ignoring Braum's Glacial Fissure (airborne) during it. Only during The Hextech Ultimatum (0.5 s). (Camille R The Hextech Ultimatum → Braum R Glacial Fissure)

#### 2. Alistar (net +0.76)

- **0.64** cleanse: Unbreakable Will cleanses Braum's Glacial Fissure (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum R Glacial Fissure)
- **0.21** cleanse: Unbreakable Will cleanses Braum's Concussive Blows (stun) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum I Concussive Blows)
- **0.04** cleanse: Unbreakable Will cleanses Braum's Winter's Bite (slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Braum Q Winter's Bite)

#### 3. Udyr (net +0.72)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Braum's Glacial Fissure (airborne, slow). Immune for 1.5 s, long enough to use ahead of Glacial Fissure. (Udyr E Blazing Stampede → Braum R Glacial Fissure)
- **0.55** cc immunity: Blazing Stampede makes Udyr immune to Braum's Concussive Blows (stun). Immune for 1.5 s, long enough to use ahead of Concussive Blows. (Udyr E Blazing Stampede → Braum I Concussive Blows)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Braum's Winter's Bite (slow). Immune for 1.5 s, long enough to use ahead of Winter's Bite. (Udyr E Blazing Stampede → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Udyr's Wilding Claw, a projectile.

#### 4. Olaf (net +0.71)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Braum's Glacial Fissure (airborne, slow). Immune for 3 s, long enough to use ahead of Glacial Fissure. (Olaf R Ragnarok → Braum R Glacial Fissure)
- **0.26** cc immunity: Ragnarok makes Olaf immune to Braum's Concussive Blows (stun). Immune for 3 s, long enough to use ahead of Concussive Blows. (Olaf R Ragnarok → Braum I Concussive Blows)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Braum's Winter's Bite (slow). Immune for 3 s, long enough to use ahead of Winter's Bite. (Olaf R Ragnarok → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Olaf's Undertow, a projectile.

#### 5. Master Yi (net +0.69)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Braum's Glacial Fissure. Untargetable for ?; Glacial Fissure takes 1.36 s to land, enough to react. (Master Yi Q Alpha Strike → Braum R Glacial Fissure)
- **0.16** cleanse: Highlander cleanses Braum's Glacial Fissure (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Braum R Glacial Fissure)
- **0.09** cc immunity: Highlander makes Master Yi immune to Braum's Glacial Fissure (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Braum R Glacial Fissure)
- Watch out: Concussive Blows's stun interrupts Master Yi's Meditate (normal channel).

#### 6. Yasuo (net +0.66)

- **0.80** projectile block: Wind Wall blocks Braum's Glacial Fissure, a projectile. Wind Wall for 4 s, long enough to use ahead of Glacial Fissure. (Yasuo W Wind Wall → Braum R Glacial Fissure)
- **0.28** projectile block: Wind Wall blocks Braum's Winter's Bite, a projectile. Wind Wall for 4 s, long enough to use ahead of Winter's Bite. (Yasuo W Wind Wall → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Yasuo's Steel Tempest, a projectile.

#### 7. Samira (net +0.53)

- **0.80** projectile block: Blade Whirl blocks Braum's Glacial Fissure, a projectile. Blade Whirl for 0.75 s; Glacial Fissure takes 1.36 s to land, enough to react. (Samira W Blade Whirl → Braum R Glacial Fissure)
- **0.30** range: Samira's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range). Braum closes the gap with Stand Behind Me. (Samira basic attacks → Braum basic attacks)
- **0.25** projectile block: Blade Whirl blocks Braum's Winter's Bite, a projectile. Blade Whirl for 0.75 s; Winter's Bite takes 0.87 s to land, enough to react. (Samira W Blade Whirl → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Samira's basic attacks, which are projectiles.

#### 8. Sion (net +0.51)

- **0.80** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Glacial Fissure (airborne, slow). Immune for 8 s, long enough to use ahead of Glacial Fissure. (Sion R Unstoppable Onslaught → Braum R Glacial Fissure)
- **0.28** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Concussive Blows (stun). Immune for 8 s, long enough to use ahead of Concussive Blows. (Sion R Unstoppable Onslaught → Braum I Concussive Blows)
- **0.05** cc immunity: Unstoppable Onslaught makes Sion immune to Braum's Winter's Bite (slow). Immune for 8 s, long enough to use ahead of Winter's Bite. (Sion R Unstoppable Onslaught → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks part of Sion's Roar of the Slayer, a projectile.

#### 9. Gangplank (net +0.51)

- **0.64** cleanse: Remove Scurvy cleanses Braum's Glacial Fissure (airborne, slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum R Glacial Fissure)
- **0.36** cleanse: Remove Scurvy cleanses Braum's Concussive Blows (stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum I Concussive Blows)
- **0.06** cleanse: Remove Scurvy cleanses Braum's Winter's Bite (slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Braum Q Winter's Bite)
- Watch out: Unbreakable blocks Gangplank's Parrrley, a projectile.

#### 10. Aurora (net +0.50)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Braum's Glacial Fissure. Untargetable for 0.4 s; Glacial Fissure takes 1.36 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Braum R Glacial Fissure)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range). Braum closes the gap with Stand Behind Me. (Aurora basic attacks → Braum basic attacks)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Braum's Glacial Fissure (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Braum R Glacial Fissure)
- Watch out: Unbreakable blocks Aurora's Twofold Hex, a projectile.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Camille | +0.84 | 0.84 | 0.00 |  |
| 2 | Alistar | +0.76 | 0.76 | 0.00 |  |
| 3 | Udyr | +0.72 | 1.10 | 0.38 |  |
| 4 | Olaf | +0.71 | 0.94 | 0.23 |  |
| 5 | Master Yi | +0.69 | 1.02 | 0.33 |  |
| 6 | Yasuo | +0.66 | 0.94 | 0.28 | projectile block (Wind Wall) |
| 7 | Samira | +0.53 | 1.23 | 0.70 | projectile block (Blade Whirl) |
| 8 | Sion | +0.51 | 0.95 | 0.44 |  |
| 9 | Gangplank | +0.51 | 0.84 | 0.33 |  |
| 10 | Aurora | +0.50 | 1.13 | 0.63 |  |
| 11 | Fiora | +0.49 | 0.94 | 0.45 |  |
| 12 | Nocturne | +0.43 | 0.88 | 0.45 |  |
| 13 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 14 | Zed | +0.42 | 0.80 | 0.38 |  |
| 15 | Bard | +0.41 | 1.16 | 0.75 |  |
| 16 | Evelynn | +0.41 | 0.80 | 0.39 |  |
| 17 | Fizz | +0.40 | 0.80 | 0.40 |  |
| 18 | Xin Zhao | +0.40 | 0.40 | 0.00 |  |
| 19 | Rek'Sai | +0.39 | 0.84 | 0.45 |  |
| 20 | Garen | +0.37 | 0.37 | 0.00 |  |
| 21 | Morgana | +0.35 | 1.22 | 0.87 |  |
| 22 | Shaco | +0.35 | 0.80 | 0.45 |  |
| 23 | Jax | +0.35 | 0.35 | 0.00 |  |
| 24 | Sivir | +0.34 | 1.27 | 0.93 |  |
| 25 | Vladimir | +0.34 | 0.98 | 0.64 |  |
| 26 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 27 | Lissandra | +0.26 | 1.11 | 0.85 |  |
| 28 | Kalista | +0.26 | 1.01 | 0.75 |  |
| 29 | Gwen | +0.25 | 0.80 | 0.55 |  |
| 30 | Zaahen | +0.24 | 0.94 | 0.70 |  |
| 31 | Mel | +0.18 | 1.19 | 1.01 | projectile block (Rebuttal) |
| 32 | Rengar | +0.18 | 0.88 | 0.70 |  |
| 33 | Xayah | +0.11 | 1.18 | 1.07 |  |
| 34 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 35 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 36 | Sett | +0.08 | 0.08 | 0.00 |  |
| 37 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 38 | Zeri | +0.06 | 0.44 | 0.38 |  |
| 39 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 40 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 41 | Darius | 0.00 | 0.00 | 0.00 |  |
| 42 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 43 | Rell | 0.00 | 0.00 | 0.00 |  |
| 44 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 45 | Taric | 0.00 | 0.00 | 0.00 |  |
| 46 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 47 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 48 | Kayn | -0.05 | 0.80 | 0.85 |  |
| 49 | Kayle | -0.06 | 0.76 | 0.82 |  |
| 50 | Singed | -0.06 | 0.39 | 0.45 |  |
| 51 | Cassiopeia | -0.07 | 0.60 | 0.67 |  |
| 52 | Warwick | -0.08 | 1.07 | 1.15 |  |
| 53 | Viktor | -0.09 | 0.63 | 0.72 |  |
| 54 | Yone | -0.09 | 0.26 | 0.35 |  |
| 55 | Kled | -0.10 | 1.03 | 1.13 |  |
| 56 | Rammus | -0.10 | 0.32 | 0.42 |  |
| 57 | Malzahar | -0.11 | 0.95 | 1.06 |  |
| 58 | K'Sante | -0.11 | 0.16 | 0.27 |  |
| 59 | Teemo | -0.14 | 0.77 | 0.91 | blind (Blinding Dart) |
| 60 | Illaoi | -0.15 | 0.08 | 0.23 |  |
| 61 | Malphite | -0.16 | 0.29 | 0.45 |  |
| 62 | Lulu | -0.17 | 0.66 | 0.83 |  |
| 63 | Nidalee | -0.19 | 0.30 | 0.49 |  |
| 64 | Azir | -0.23 | 0.27 | 0.50 |  |
| 65 | Aurelion Sol | -0.23 | 0.22 | 0.45 |  |
| 66 | Jinx | -0.26 | 0.64 | 0.90 |  |
| 67 | Milio | -0.27 | 0.70 | 0.97 |  |
| 68 | Jayce | -0.27 | 0.30 | 0.57 |  |
| 69 | Veigar | -0.29 | 0.54 | 0.83 |  |
| 70 | Rakan | -0.29 | 0.13 | 0.42 |  |
| 71 | Soraka | -0.30 | 0.27 | 0.57 |  |
| 72 | Kennen | -0.32 | 0.29 | 0.61 |  |
| 73 | Skarner | -0.32 | 0.13 | 0.45 |  |
| 74 | Annie | -0.33 | 0.22 | 0.55 |  |
| 75 | Shyvana | -0.37 | 0.08 | 0.45 |  |
| 76 | Maokai | -0.38 | 0.80 | 1.18 |  |
| 77 | Lee Sin | -0.38 | 0.00 | 0.38 |  |
| 78 | Rumble | -0.38 | 0.00 | 0.38 |  |
| 79 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 80 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 81 | Twitch | -0.40 | 0.43 | 0.83 |  |
| 82 | Gnar | -0.41 | 0.33 | 0.74 |  |
| 83 | Orianna | -0.41 | 0.27 | 0.68 |  |
| 84 | Ekko | -0.42 | 0.00 | 0.42 |  |
| 85 | Kassadin | -0.42 | 0.00 | 0.42 |  |
| 86 | Vex | -0.44 | 0.63 | 1.07 |  |
| 87 | Aphelios | -0.45 | 0.49 | 0.94 |  |
| 88 | Aatrox | -0.45 | 0.00 | 0.45 |  |
| 89 | Yorick | -0.45 | 0.00 | 0.45 |  |
| 90 | Kai'Sa | -0.48 | 0.38 | 0.86 |  |
| 91 | Yunara | -0.48 | 0.36 | 0.84 |  |
| 92 | Karma | -0.48 | 0.22 | 0.70 |  |
| 93 | Kog'Maw | -0.49 | 0.27 | 0.76 |  |
| 94 | LeBlanc | -0.50 | 0.22 | 0.72 |  |
| 95 | Vi | -0.52 | 0.08 | 0.60 |  |
| 96 | Locke | -0.52 | 0.00 | 0.52 |  |
| 97 | Riven | -0.55 | 0.00 | 0.55 |  |
| 98 | Corki | -0.56 | 0.32 | 0.88 |  |
| 99 | Vayne | -0.57 | 0.43 | 1.00 |  |
| 100 | Syndra | -0.58 | 0.22 | 0.80 |  |
| 101 | Smolder | -0.61 | 0.32 | 0.93 |  |
| 102 | Zilean | -0.61 | 0.32 | 0.93 |  |
| 103 | Elise | -0.63 | 0.32 | 0.95 |  |
| 104 | Zyra | -0.63 | 0.24 | 0.87 |  |
| 105 | Yuumi | -0.64 | 1.12 | 1.76 |  |
| 106 | Kindred | -0.64 | 0.47 | 1.11 |  |
| 107 | Diana | -0.64 | 0.00 | 0.64 |  |
| 108 | Senna | -0.66 | 0.32 | 0.98 |  |
| 109 | Thresh | -0.66 | 0.19 | 0.85 |  |
| 110 | Ahri | -0.68 | 0.54 | 1.22 |  |
| 111 | Kha'Zix | -0.68 | 0.00 | 0.68 |  |
| 112 | Anivia | -0.69 | 0.24 | 0.93 |  |
| 113 | Hwei | -0.70 | 0.58 | 1.28 |  |
| 114 | Poppy | -0.70 | 0.50 | 1.20 | dash stop (Steadfast Presence) |
| 115 | Karthus | -0.70 | 0.19 | 0.89 |  |
| 116 | Blitzcrank | -0.70 | 0.00 | 0.70 |  |
| 117 | Quinn | -0.72 | 0.38 | 1.10 |  |
| 118 | Zoe | -0.73 | 0.32 | 1.05 |  |
| 119 | Brand | -0.73 | 0.22 | 0.95 |  |
| 120 | Shen | -0.74 | 0.33 | 1.07 |  |
| 121 | Ezreal | -0.74 | 0.32 | 1.06 |  |
| 122 | Lux | -0.74 | 0.29 | 1.03 |  |
| 123 | Talon | -0.76 | 0.00 | 0.76 |  |
| 124 | Draven | -0.77 | 0.36 | 1.13 |  |
| 125 | Neeko | -0.77 | 0.22 | 0.99 |  |
| 126 | Sona | -0.79 | 0.41 | 1.20 |  |
| 127 | Ashe | -0.79 | 0.36 | 1.15 |  |
| 128 | Tristana | -0.80 | 0.36 | 1.16 |  |
| 129 | Nautilus | -0.80 | 0.00 | 0.80 |  |
| 130 | Pantheon | -0.81 | 0.40 | 1.21 |  |
| 131 | Lillia | -0.81 | 0.11 | 0.92 |  |
| 132 | Graves | -0.82 | 0.24 | 1.06 |  |
| 133 | Amumu | -0.82 | 0.18 | 1.00 |  |
| 134 | Swain | -0.84 | 0.21 | 1.05 |  |
| 135 | Leona | -0.85 | 0.00 | 0.85 |  |
| 136 | Vel'Koz | -0.90 | 0.27 | 1.17 |  |
| 137 | Qiyana | -0.90 | 0.00 | 0.90 |  |
| 138 | Hecarim | -0.92 | 0.08 | 1.00 |  |
| 139 | Irelia | -0.93 | 0.05 | 0.98 |  |
| 140 | Heimerdinger | -0.94 | 0.31 | 1.25 |  |
| 141 | Akali | -0.94 | 0.00 | 0.94 |  |
| 142 | Ziggs | -0.95 | 0.27 | 1.22 |  |
| 143 | Renata Glasc | -0.96 | 0.38 | 1.34 |  |
| 144 | Zac | -1.00 | 0.40 | 1.40 | dash stop (Stretching Strikes) |
| 145 | Urgot | -1.00 | 0.15 | 1.15 |  |
| 146 | Sylas | -1.00 | 0.00 | 1.00 |  |
| 147 | Seraphine | -1.01 | 0.29 | 1.30 |  |
| 148 | Ryze | -1.01 | 0.24 | 1.25 |  |
| 149 | Sejuani | -1.01 | 0.00 | 1.01 |  |
| 150 | Ivern | -1.03 | 0.19 | 1.22 |  |
| 151 | Varus | -1.07 | 0.27 | 1.34 |  |
| 152 | Nami | -1.08 | 0.22 | 1.30 |  |
| 153 | Miss Fortune | -1.10 | 0.32 | 1.42 |  |
| 154 | Lucian | -1.11 | 0.36 | 1.47 |  |
| 155 | Viego | -1.16 | 0.17 | 1.33 |  |
| 156 | Akshan | -1.21 | 0.34 | 1.55 |  |
| 157 | Katarina | -1.22 | 0.00 | 1.22 |  |
| 158 | Caitlyn | -1.23 | 0.36 | 1.59 |  |
| 159 | Briar | -1.23 | 0.00 | 1.23 |  |
| 160 | Xerath | -1.24 | 0.27 | 1.51 |  |
| 161 | Ornn | -1.25 | 0.08 | 1.33 |  |
| 162 | Gragas | -1.25 | 0.00 | 1.25 |  |
| 163 | Twisted Fate | -1.26 | 0.43 | 1.69 |  |
| 164 | Naafiri | -1.27 | 0.00 | 1.27 |  |
| 165 | Tahm Kench | -1.29 | 0.00 | 1.29 |  |
| 166 | Jhin | -1.41 | 0.27 | 1.68 |  |
| 167 | Pyke | -1.41 | 0.00 | 1.41 |  |
| 168 | Nunu & Willump | -1.43 | 0.28 | 1.71 |  |
| 169 | Janna | -1.48 | 0.36 | 1.84 |  |
| 170 | Fiddlesticks | -1.50 | 0.20 | 1.70 |  |
| 171 | Galio | -1.55 | 0.00 | 1.55 |  |
| 172 | Taliyah | -1.91 | 0.27 | 2.18 |  |
