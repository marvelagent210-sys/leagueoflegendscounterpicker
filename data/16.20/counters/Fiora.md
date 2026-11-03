# Counters to Fiora (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Fiora: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fiora wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fiora --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | – | +1.00 |
| 2 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 3 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 4 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 5 | Warwick | +0.73 | +1.00 | +1.00 | +1.00 | +0.03 | – | −1.00 |
| 6 | Nasus | +0.69 | +1.00 | +1.00 | +1.00 | −0.22 | – | −1.00 |
| 7 | Ashe | +0.20 | +1.00 | +1.00 | −1.00 | +0.33 | −1.00 | −1.00 |
| 8 | Kled | +0.18 | +1.00 | +0.00 | +0.00 | −0.23 | – | −1.00 |
| 9 | Zaahen | −0.02 | +0.20 | +0.01 | +0.01 | −0.19 | – | −1.00 |
| 10 | Kog'Maw | −0.04 | +0.00 | +1.00 | −1.00 | +0.39 | −1.00 | −1.00 |
| 11 | Darius | −0.08 | +1.00 | −0.57 | −0.57 | −0.09 | – | −1.00 |
| 12 | Kalista | −0.09 | +1.00 | −1.00 | −1.00 | +0.42 | +1.00 | −1.00 |
| 13 | Illaoi | −0.21 | −0.64 | −0.64 | +0.95 | −0.06 | – | −1.00 |
| 14 | Gangplank | −0.23 | −1.00 | +1.00 | −1.00 | −0.05 | – | +0.00 |
| 15 | Draven | −0.27 | +0.77 | −0.56 | −1.00 | +0.22 | −1.00 | −1.00 |
| 16 | Wukong | −0.28 | −1.00 | +1.00 | −1.00 | −0.01 | – | −1.00 |
| 17 | Poppy | −0.28 | −0.63 | −0.63 | +0.18 | +0.34 | – | −0.54 |
| 18 | Lulu | −0.43 | −0.31 | −0.99 | +0.00 | +0.30 | −1.00 | −1.00 |
| 19 | Quinn | −0.44 | −1.00 | −1.00 | +1.00 | +0.07 | −1.00 | −1.00 |
| 20 | Gnar | −0.47 | −0.29 | −0.29 | −1.00 | +0.17 | −1.00 | −1.00 |
| 21 | Taric | −0.48 | −1.00 | −0.60 | +0.00 | −0.23 | – | +0.00 |
| 22 | Aatrox | −0.67 | −1.00 | −1.00 | −0.15 | −0.17 | – | −1.00 |
| 23 | Aurelion Sol | −0.71 | −1.00 | −1.00 | −1.00 | +0.57 | −1.00 | +0.00 |
| 24 | Kayle | −0.72 | −0.99 | −0.99 | −1.00 | +0.20 | −0.03 | −1.00 |
| 25 | Master Yi | −0.72 | −1.00 | −1.00 | −1.00 | −0.01 | – | +1.00 |
| 26 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 27 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 28 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 29 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 30 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.05 |
| 31 | Yunara | −0.77 | −1.00 | −1.00 | −1.00 | +0.52 | −1.00 | −1.00 |
| 32 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 33 | Rengar | −0.78 | −1.00 | −1.00 | −1.00 | +0.32 | – | −1.00 |
| 34 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 35 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 36 | Zilean | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 37 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 38 | Riven | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | – | −1.00 |
| 39 | Garen | −0.79 | −1.00 | −1.00 | −1.00 | +0.28 | – | −1.00 |
| 40 | Volibear | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.03 |
| 41 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 42 | Yone | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.00 |
| 43 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.07 |
| 44 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | +0.35 | −1.00 | −1.00 |
| 45 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 46 | Aphelios | −0.80 | −1.00 | −1.00 | −1.00 | +0.35 | −1.00 | −1.00 |
| 47 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | +0.20 | – | −1.00 |
| 48 | Udyr | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.37 |
| 49 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 50 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | +0.33 | −1.00 | −1.00 |
| 51 | Nocturne | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 52 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.07 |
| 53 | Nilah | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.68 |
| 54 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 55 | Sivir | −0.81 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | −1.00 |
| 56 | Milio | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 57 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | – | −1.00 |
| 58 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 59 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | – | −1.00 |
| 60 | Diana | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | – | −1.00 |
| 61 | Azir | −0.81 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | −1.00 |
| 62 | Annie | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 63 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 64 | Teemo | −0.81 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −1.00 |
| 65 | Shyvana | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | – | −1.00 |
| 66 | Jayce | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 67 | Lillia | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.15 |
| 68 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | – | −1.00 |
| 69 | Alistar | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | – | −1.00 |
| 70 | Twisted Fate | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 71 | Irelia | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | – | −1.00 |
| 72 | Tristana | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 73 | Rell | −0.82 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −1.00 |
| 74 | Vel'Koz | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 75 | Maokai | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 76 | Orianna | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 77 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 78 | Caitlyn | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 79 | Lee Sin | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | – | −1.00 |
| 80 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | – | −1.00 |
| 81 | Corki | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 82 | Mel | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 83 | Lucian | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 84 | Sylas | −0.83 | −1.00 | −1.00 | −1.00 | +0.02 | – | −1.00 |
| 85 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 86 | Nautilus | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 87 | Lissandra | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 88 | Seraphine | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 89 | Dr. Mundo | −0.83 | −1.00 | −1.00 | −1.00 | −0.33 | – | +0.00 |
| 90 | Smolder | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 91 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 92 | Ezreal | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 93 | LeBlanc | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 94 | Cho'Gath | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 95 | Zoe | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 96 | Renekton | −0.84 | −1.00 | −1.00 | −1.00 | −0.03 | – | −1.00 |
| 97 | Shaco | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 98 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 99 | Xin Zhao | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −1.00 |
| 100 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 101 | Ziggs | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 102 | Sion | −0.84 | −1.00 | −1.00 | −1.00 | −0.38 | – | +0.00 |
| 103 | K'Sante | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.00 |
| 104 | Shen | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.50 |
| 105 | Jinx | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 106 | Qiyana | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −1.00 |
| 107 | Syndra | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 108 | Rek'Sai | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | – | −1.00 |
| 109 | Jhin | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 110 | Sona | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 111 | Rakan | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.00 |
| 112 | Twitch | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 113 | Neeko | −0.85 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.70 |
| 114 | Heimerdinger | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 115 | Ekko | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 116 | Olaf | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 117 | Brand | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 118 | Rammus | −0.85 | −1.00 | −1.00 | −1.00 | −0.42 | – | +0.00 |
| 119 | Viktor | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 120 | Karma | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −1.00 |
| 121 | Locke | −0.85 | −1.00 | −1.00 | −1.00 | −0.09 | – | −1.00 |
| 122 | Katarina | −0.85 | −1.00 | −1.00 | −1.00 | −0.09 | – | −1.00 |
| 123 | Ornn | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 124 | Braum | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 125 | Malzahar | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 126 | Varus | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 127 | Hwei | −0.85 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −1.00 |
| 128 | Nami | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 129 | Akshan | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 130 | Vi | −0.85 | −1.00 | −1.00 | −1.00 | −0.11 | – | −1.00 |
| 131 | Taliyah | −0.85 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.50 |
| 132 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.50 |
| 133 | Amumu | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 134 | Vladimir | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −1.00 |
| 135 | Rumble | −0.85 | −1.00 | −1.00 | −1.00 | −0.12 | – | −1.00 |
| 136 | Kindred | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −1.00 |
| 137 | Zac | −0.86 | −1.00 | −1.00 | −1.00 | −0.47 | – | +0.00 |
| 138 | Zeri | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −1.00 |
| 139 | Janna | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −1.00 |
| 140 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | – | −1.00 |
| 141 | Xerath | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 142 | Anivia | −0.86 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | +0.00 |
| 143 | Soraka | −0.86 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −1.00 |
| 144 | Nunu & Willump | −0.86 | −1.00 | −1.00 | −1.00 | −0.18 | – | −1.00 |
| 145 | Gragas | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.00 |
| 146 | Samira | −0.86 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −1.00 |
| 147 | Jarvan IV | −0.87 | −1.00 | −1.00 | −1.00 | −0.20 | – | −1.00 |
| 148 | Morgana | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 149 | Lux | −0.87 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −1.00 |
| 150 | Sejuani | −0.87 | −1.00 | −1.00 | −1.00 | −0.22 | – | −1.00 |
| 151 | Mordekaiser | −0.87 | −1.00 | −1.00 | −1.00 | −0.23 | – | −1.00 |
| 152 | Zyra | −0.87 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −1.00 |
| 153 | Renata Glasc | −0.88 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −1.00 |
| 154 | Urgot | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −1.00 |
| 155 | Bel'Veth | −0.88 | −1.00 | −1.00 | −1.00 | −0.61 | – | −0.02 |
| 156 | Kayn | −0.88 | −1.00 | −1.00 | −1.00 | −0.28 | – | −1.00 |
| 157 | Kai'Sa | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −1.00 |
| 158 | Akali | −0.88 | −1.00 | −1.00 | −1.00 | −0.29 | – | −1.00 |
| 159 | Galio | −0.88 | −1.00 | −1.00 | −1.00 | −0.31 | – | −1.00 |
| 160 | Tahm Kench | −0.89 | −1.00 | −1.00 | −1.00 | −0.33 | – | −0.96 |
| 161 | Ahri | −0.89 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | −0.96 |
| 162 | Ivern | −0.89 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | −1.00 |
| 163 | Blitzcrank | −0.89 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | −1.00 |
| 164 | Senna | −0.89 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | −1.00 |
| 165 | Pyke | −0.90 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | −1.00 |
| 166 | Nidalee | −0.90 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −1.00 |
| 167 | Elise | −0.90 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −1.00 |
| 168 | Vayne | −0.90 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −1.00 |
| 169 | Fiddlesticks | −0.90 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | −1.00 |
| 170 | Camille | −0.91 | −1.00 | −1.00 | −1.00 | −0.46 | – | −1.00 |
| 171 | Viego | −0.92 | −1.00 | −1.00 | −1.00 | −0.50 | – | −1.00 |
| 172 | Briar | −0.92 | −1.00 | −1.00 | −1.00 | −0.53 | – | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Fiora's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fiora's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fiora` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.81)

- **0.44** range: Sivir's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Sivir basic attacks → Fiora basic attacks)
- **0.42** spell shield: Spell Shield's spell shield blocks Fiora's Riposte. Spell shield for 1.5 s, long enough to use ahead of Riposte. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fiora W Riposte)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Fiora's Bladework. Spell shield for 1.5 s, long enough to use ahead of Bladework. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the slow from the first hit. (Sivir E Spell Shield → Fiora E Bladework)
- Watch out: Riposte cuts Sivir's attack speed by 25% for 2 s.

#### 2. Twitch (net +0.33)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Twitch basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Twitch's attack speed by 25% for 2 s.

#### 3. Kayle (net +0.31)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Fiora's (625 vs 150 attack range). Fiora closes the gap with Lunge. (Kayle basic attacks → Fiora basic attacks)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Fiora's Riposte (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Riposte. (Kayle R Divine Judgment → Fiora W Riposte)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Fiora's Bladework (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Bladework. (Kayle R Divine Judgment → Fiora E Bladework)
- Watch out: Riposte parries Kayle's Starfire Spellblade.

#### 4. Yuumi (net +0.29)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Fiora's Riposte. Untargetable for ?; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fiora W Riposte)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Fiora's (425 vs 150 attack range). Fiora closes the gap with Lunge. (Yuumi basic attacks → Fiora basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Fiora's Bladework. Untargetable for ?; Bladework lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fiora E Bladework)
- Watch out: Riposte parries Yuumi's Final Chapter.

#### 5. Vladimir (net +0.29)

- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiora's Riposte. Untargetable for 2 s, long enough to use ahead of Riposte. (Vladimir W Sanguine Pool → Fiora W Riposte)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fiora's Bladework. Untargetable for 2 s, long enough to use ahead of Bladework. (Vladimir W Sanguine Pool → Fiora E Bladework)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Fiora's (450 vs 150 attack range). Fiora closes the gap with Lunge. (Vladimir basic attacks → Fiora basic attacks)
- Watch out: Riposte parries Vladimir's Hemoplague.

#### 6. Kai'Sa (net +0.27)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range). Fiora closes the gap with Lunge. (Kai'Sa basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Kai'Sa's attack speed by 25% for 2 s.

#### 7. Yunara (net +0.27)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Fiora's (575 vs 150 attack range). Fiora closes the gap with Lunge. (Yunara basic attacks → Fiora basic attacks)
- Watch out: Riposte cuts Yunara's attack speed by 25% for 2 s.

#### 8. Aurora (net +0.12)

- **0.29** range: Aurora's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range). Fiora closes the gap with Lunge. (Aurora basic attacks → Fiora basic attacks)
- **0.22** untargetable: Between Worlds makes Aurora untargetable, dodging Fiora's Riposte. Untargetable for 0.4 s; Riposte takes 0.28 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fiora W Riposte)
- **0.12** untargetable: Between Worlds makes Aurora untargetable, dodging Fiora's Bladework. Untargetable for 0.4 s; Bladework lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fiora E Bladework)
- Watch out: Riposte parries Aurora's Between Worlds.

#### 9. Teemo (net +0.11)

- **0.43** blind: Blinding Dart's blind makes Fiora's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Fiora basic attacks)
- **0.32** range: Teemo's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range). Fiora closes the gap with Lunge. (Teemo basic attacks → Fiora basic attacks)
- **0.15** blind: Blinding Dart's blind makes Fiora's Bladework, an empowered attack, miss. Blind for 3 s. Spell shield will only block the slow from the first hit. Bladework's first basic attack will slow even if it is dodged, blocked or missed. (Teemo Q Blinding Dart → Fiora E Bladework)
- Watch out: Riposte parries Teemo's Noxious Trap.

#### 10. Xayah (net +0.10)

- **0.36** range: Xayah's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range). Fiora closes the gap with Lunge. (Xayah basic attacks → Fiora basic attacks)
- **0.22** untargetable: Featherstorm makes Xayah untargetable, dodging Fiora's Riposte. Untargetable for 1.5 s, long enough to use ahead of Riposte. (Xayah R Featherstorm → Fiora W Riposte)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Fiora's Bladework. Untargetable for 1.5 s, long enough to use ahead of Bladework. (Xayah R Featherstorm → Fiora E Bladework)
- Watch out: Riposte parries Xayah's Bladecaller and stuns back.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.81 | 0.93 | 0.12 |  |
| 2 | Twitch | +0.33 | 0.43 | 0.10 |  |
| 3 | Kayle | +0.31 | 0.53 | 0.22 |  |
| 4 | Yuumi | +0.29 | 0.89 | 0.60 |  |
| 5 | Vladimir | +0.29 | 0.76 | 0.47 |  |
| 6 | Kai'Sa | +0.27 | 0.36 | 0.09 |  |
| 7 | Yunara | +0.27 | 0.36 | 0.09 |  |
| 8 | Aurora | +0.12 | 0.57 | 0.45 |  |
| 9 | Teemo | +0.11 | 0.83 | 0.72 | blind (Blinding Dart) |
| 10 | Xayah | +0.10 | 0.68 | 0.58 |  |
| 11 | Master Yi | +0.07 | 0.60 | 0.53 |  |
| 12 | Kindred | +0.06 | 0.44 | 0.38 |  |
| 13 | Samira | +0.03 | 0.66 | 0.63 |  |
| 14 | Singed | 0.00 | 0.81 | 0.81 |  |
| 15 | Twisted Fate | -0.01 | 0.40 | 0.41 |  |
| 16 | Nidalee | -0.04 | 0.28 | 0.32 |  |
| 17 | Kog'Maw | -0.07 | 0.25 | 0.32 |  |
| 18 | Milio | -0.09 | 0.60 | 0.69 |  |
| 19 | Gwen | -0.09 | 0.51 | 0.60 |  |
| 20 | Olaf | -0.09 | 0.26 | 0.35 |  |
| 21 | Udyr | -0.10 | 0.51 | 0.61 |  |
| 22 | Tryndamere | -0.10 | 0.00 | 0.10 |  |
| 23 | Nasus | -0.15 | 0.33 | 0.48 |  |
| 24 | Zeri | -0.16 | 0.44 | 0.60 |  |
| 25 | Miss Fortune | -0.17 | 0.32 | 0.49 |  |
| 26 | Malzahar | -0.18 | 0.63 | 0.81 |  |
| 27 | Lulu | -0.20 | 0.66 | 0.86 |  |
| 28 | Jinx | -0.21 | 0.57 | 0.78 |  |
| 29 | Vex | -0.21 | 0.52 | 0.73 |  |
| 30 | Dr. Mundo | -0.21 | 0.00 | 0.21 |  |
| 31 | Katarina | -0.22 | 0.28 | 0.50 |  |
| 32 | Quinn | -0.25 | 0.36 | 0.61 |  |
| 33 | Corki | -0.27 | 0.32 | 0.59 |  |
| 34 | Akshan | -0.28 | 0.32 | 0.60 |  |
| 35 | Mel | -0.29 | 0.62 | 0.91 |  |
| 36 | Zed | -0.30 | 0.28 | 0.58 |  |
| 37 | Gangplank | -0.31 | 0.39 | 0.70 |  |
| 38 | Morgana | -0.32 | 0.67 | 0.99 |  |
| 39 | Kalista | -0.32 | 0.49 | 0.81 |  |
| 40 | Lucian | -0.36 | 0.34 | 0.70 |  |
| 41 | Jax | -0.37 | 0.56 | 0.93 |  |
| 42 | Varus | -0.38 | 0.55 | 0.93 |  |
| 43 | Smolder | -0.40 | 0.32 | 0.72 |  |
| 44 | Karthus | -0.40 | 0.18 | 0.58 |  |
| 45 | Ezreal | -0.41 | 0.32 | 0.73 |  |
| 46 | LeBlanc | -0.41 | 0.21 | 0.62 |  |
| 47 | Zilean | -0.42 | 0.32 | 0.74 |  |
| 48 | Rengar | -0.43 | 0.40 | 0.83 |  |
| 49 | Bard | -0.45 | 0.67 | 1.12 |  |
| 50 | Shen | -0.45 | 0.53 | 0.98 |  |
| 51 | Nilah | -0.46 | 0.54 | 1.00 |  |
| 52 | Vayne | -0.46 | 0.43 | 0.89 |  |
| 53 | Garen | -0.46 | 0.27 | 0.73 |  |
| 54 | Zoe | -0.47 | 0.32 | 0.79 |  |
| 55 | Braum | -0.49 | 0.45 | 0.94 | projectile block (Unbreakable) |
| 56 | Viktor | -0.50 | 0.57 | 1.07 |  |
| 57 | Sion | -0.50 | 0.28 | 0.78 |  |
| 58 | Lissandra | -0.51 | 0.60 | 1.11 |  |
| 59 | Pantheon | -0.51 | 0.28 | 0.79 |  |
| 60 | Taric | -0.51 | 0.00 | 0.51 |  |
| 61 | Jayce | -0.52 | 0.28 | 0.80 |  |
| 62 | Graves | -0.52 | 0.22 | 0.74 |  |
| 63 | Kha'Zix | -0.52 | 0.00 | 0.52 |  |
| 64 | Fizz | -0.53 | 0.57 | 1.10 |  |
| 65 | Ryze | -0.53 | 0.24 | 0.77 |  |
| 66 | Veigar | -0.54 | 0.50 | 1.04 |  |
| 67 | Kennen | -0.54 | 0.29 | 0.83 |  |
| 68 | Ahri | -0.56 | 0.50 | 1.06 |  |
| 69 | Soraka | -0.56 | 0.27 | 0.83 |  |
| 70 | Vel'Koz | -0.57 | 0.25 | 0.82 |  |
| 71 | Yorick | -0.57 | 0.00 | 0.57 |  |
| 72 | Caitlyn | -0.58 | 0.36 | 0.94 |  |
| 73 | Cassiopeia | -0.59 | 0.60 | 1.19 |  |
| 74 | Ashe | -0.59 | 0.36 | 0.95 |  |
| 75 | Elise | -0.59 | 0.32 | 0.91 |  |
| 76 | Rumble | -0.59 | 0.00 | 0.59 |  |
| 77 | Nocturne | -0.60 | 0.54 | 1.14 |  |
| 78 | Xerath | -0.60 | 0.25 | 0.85 |  |
| 79 | Sona | -0.61 | 0.41 | 1.02 |  |
| 80 | Kayn | -0.62 | 0.29 | 0.91 |  |
| 81 | Hwei | -0.64 | 0.53 | 1.17 |  |
| 82 | Yasuo | -0.64 | 0.43 | 1.07 | projectile block (Wind Wall) |
| 83 | Lux | -0.64 | 0.29 | 0.93 |  |
| 84 | Draven | -0.67 | 0.36 | 1.03 |  |
| 85 | Warwick | -0.67 | 0.34 | 1.01 |  |
| 86 | Karma | -0.68 | 0.21 | 0.89 |  |
| 87 | Ivern | -0.68 | 0.18 | 0.86 |  |
| 88 | Kassadin | -0.68 | 0.00 | 0.68 |  |
| 89 | Brand | -0.69 | 0.22 | 0.91 |  |
| 90 | Talon | -0.69 | 0.00 | 0.69 |  |
| 91 | Annie | -0.70 | 0.22 | 0.92 |  |
| 92 | Illaoi | -0.72 | 0.00 | 0.72 |  |
| 93 | Heimerdinger | -0.74 | 0.28 | 1.02 |  |
| 94 | Janna | -0.76 | 0.36 | 1.12 |  |
| 95 | Poppy | -0.77 | 0.50 | 1.27 | dash stop (Steadfast Presence) |
| 96 | Tristana | -0.77 | 0.36 | 1.13 |  |
| 97 | Senna | -0.77 | 0.32 | 1.09 |  |
| 98 | Shaco | -0.77 | 0.29 | 1.06 |  |
| 99 | Renekton | -0.77 | 0.00 | 0.77 |  |
| 100 | Jhin | -0.80 | 0.27 | 1.07 |  |
| 101 | Aatrox | -0.80 | 0.00 | 0.80 |  |
| 102 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 103 | Mordekaiser | -0.81 | 0.08 | 0.89 |  |
| 104 | Rek'Sai | -0.82 | 0.33 | 1.15 |  |
| 105 | Swain | -0.82 | 0.20 | 1.02 |  |
| 106 | Aphelios | -0.83 | 0.46 | 1.29 |  |
| 107 | Orianna | -0.83 | 0.25 | 1.08 |  |
| 108 | Lillia | -0.83 | 0.10 | 0.93 |  |
| 109 | Bel'Veth | -0.83 | 0.00 | 0.83 |  |
| 110 | Ziggs | -0.84 | 0.27 | 1.11 |  |
| 111 | Azir | -0.85 | 0.25 | 1.10 |  |
| 112 | Aurelion Sol | -0.85 | 0.22 | 1.07 |  |
| 113 | Fiddlesticks | -0.85 | 0.18 | 1.03 |  |
| 114 | Syndra | -0.88 | 0.22 | 1.10 |  |
| 115 | Gnar | -0.89 | 0.31 | 1.20 |  |
| 116 | Maokai | -0.92 | 0.56 | 1.48 |  |
| 117 | Locke | -0.92 | 0.00 | 0.92 |  |
| 118 | Lee Sin | -0.93 | 0.00 | 0.93 |  |
| 119 | Renata Glasc | -0.94 | 0.38 | 1.32 |  |
| 120 | Anivia | -0.94 | 0.24 | 1.18 |  |
| 121 | Akali | -0.94 | 0.00 | 0.94 |  |
| 122 | Cho'Gath | -0.94 | 0.00 | 0.94 |  |
| 123 | Naafiri | -0.94 | 0.00 | 0.94 |  |
| 124 | Alistar | -0.95 | 0.21 | 1.16 |  |
| 125 | Kled | -0.97 | 0.34 | 1.31 |  |
| 126 | Seraphine | -0.98 | 0.27 | 1.25 |  |
| 127 | Shyvana | -0.98 | 0.00 | 0.98 |  |
| 128 | Camille | -0.99 | 0.29 | 1.28 |  |
| 129 | Zyra | -1.01 | 0.24 | 1.25 |  |
| 130 | Neeko | -1.01 | 0.22 | 1.23 |  |
| 131 | Malphite | -1.01 | 0.21 | 1.22 |  |
| 132 | Thresh | -1.02 | 0.18 | 1.20 |  |
| 133 | Skarner | -1.02 | 0.09 | 1.11 |  |
| 134 | Nunu & Willump | -1.03 | 0.17 | 1.20 |  |
| 135 | Ambessa | -1.03 | 0.00 | 1.03 |  |
| 136 | Riven | -1.03 | 0.00 | 1.03 |  |
| 137 | Irelia | -1.05 | 0.00 | 1.05 |  |
| 138 | Sylas | -1.05 | 0.00 | 1.05 |  |
| 139 | Nami | -1.07 | 0.22 | 1.29 |  |
| 140 | Sett | -1.07 | 0.00 | 1.07 |  |
| 141 | Zaahen | -1.10 | 0.25 | 1.35 |  |
| 142 | Trundle | -1.10 | 0.00 | 1.10 |  |
| 143 | Rammus | -1.13 | 0.32 | 1.45 |  |
| 144 | Darius | -1.13 | 0.00 | 1.13 |  |
| 145 | Zac | -1.14 | 0.34 | 1.48 |  |
| 146 | Evelynn | -1.14 | 0.29 | 1.43 |  |
| 147 | Diana | -1.14 | 0.00 | 1.14 |  |
| 148 | Yone | -1.16 | 0.18 | 1.34 |  |
| 149 | Xin Zhao | -1.17 | 0.16 | 1.33 |  |
| 150 | Blitzcrank | -1.17 | 0.00 | 1.17 |  |
| 151 | Urgot | -1.23 | 0.13 | 1.36 |  |
| 152 | Amumu | -1.24 | 0.17 | 1.41 |  |
| 153 | Galio | -1.24 | 0.00 | 1.24 |  |
| 154 | Rakan | -1.25 | 0.11 | 1.36 |  |
| 155 | Ekko | -1.25 | 0.00 | 1.25 |  |
| 156 | Volibear | -1.26 | 0.00 | 1.26 |  |
| 157 | Taliyah | -1.28 | 0.25 | 1.53 |  |
| 158 | Nautilus | -1.28 | 0.00 | 1.28 |  |
| 159 | Vi | -1.30 | 0.00 | 1.30 |  |
| 160 | Hecarim | -1.31 | 0.00 | 1.31 |  |
| 161 | Jarvan IV | -1.32 | 0.00 | 1.32 |  |
| 162 | Pyke | -1.35 | 0.00 | 1.35 |  |
| 163 | Leona | -1.36 | 0.00 | 1.36 |  |
| 164 | Qiyana | -1.36 | 0.00 | 1.36 |  |
| 165 | Tahm Kench | -1.40 | 0.00 | 1.40 |  |
| 166 | Viego | -1.43 | 0.00 | 1.43 |  |
| 167 | Gragas | -1.45 | 0.00 | 1.45 |  |
| 168 | Briar | -1.47 | 0.00 | 1.47 |  |
| 169 | Sejuani | -1.53 | 0.00 | 1.53 |  |
| 170 | Ornn | -1.54 | 0.00 | 1.54 |  |
| 171 | K'Sante | -1.59 | 0.00 | 1.59 |  |
| 172 | Rell | -1.59 | 0.00 | 1.59 |  |
