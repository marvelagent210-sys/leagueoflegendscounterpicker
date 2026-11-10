# Counters to Kindred (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kindred: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kindred wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kindred --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.87 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +1.00 |
| 2 | Fiora | +0.86 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +1.00 |
| 3 | Shyvana | +0.85 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +1.00 |
| 4 | Gangplank | +0.85 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +1.00 |
| 5 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 6 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +1.00 |
| 7 | Nasus | +0.85 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +1.00 |
| 8 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 9 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +1.00 |
| 10 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +1.00 |
| 11 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 12 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +1.00 |
| 13 | Heimerdinger | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 14 | Jarvan IV | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 15 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 16 | Skarner | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 17 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 18 | Diana | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 19 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 20 | Jayce | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 21 | Gragas | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 22 | Irelia | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 23 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 24 | Shen | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 25 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 26 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 27 | Annie | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 28 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 29 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +0.98 | +0.00 |
| 30 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 31 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 32 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 33 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 34 | Yunara | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 35 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 36 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 37 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 38 | Alistar | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 39 | Pantheon | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 40 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 41 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 42 | Sejuani | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 43 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 44 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 45 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 46 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +0.92 | +0.00 |
| 47 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 48 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 49 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 50 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 51 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 52 | Cassiopeia | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 53 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 54 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 55 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 56 | Braum | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 57 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 58 | Warwick | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 59 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 60 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | +0.90 | +0.00 |
| 61 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 62 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 63 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 64 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 65 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 66 | Malzahar | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 67 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 68 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 69 | Elise | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 70 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 71 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 72 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 73 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 74 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 75 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 76 | Leona | +0.77 | +1.00 | +0.90 | +1.00 | −0.01 | +1.00 | +0.00 |
| 77 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 78 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.00 |
| 79 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 80 | Samira | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 81 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | +0.77 | +0.00 |
| 82 | Zac | +0.70 | +1.00 | +1.00 | +1.00 | −0.16 | +0.21 | +0.00 |
| 83 | Ezreal | +0.67 | +0.67 | +0.92 | +0.97 | +0.06 | – | +0.00 |
| 84 | Vel'Koz | +0.65 | +0.36 | +0.95 | +1.00 | +0.27 | +0.81 | +0.00 |
| 85 | Yone | +0.62 | +1.00 | +1.00 | +1.00 | −0.09 | −1.00 | +0.62 |
| 86 | Gnar | +0.60 | +1.00 | +1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 87 | Sett | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 88 | Olaf | +0.58 | +1.00 | +1.00 | +1.00 | −0.10 | −1.00 | +0.00 |
| 89 | Morgana | +0.58 | +0.38 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 90 | Zed | +0.53 | +1.00 | +0.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 91 | Volibear | +0.52 | +1.00 | +0.00 | +1.00 | −0.03 | +0.74 | +0.00 |
| 92 | Taric | +0.51 | +0.48 | +1.00 | +0.55 | +0.04 | +0.20 | +0.00 |
| 93 | Amumu | +0.48 | +0.61 | +0.94 | +1.00 | −0.03 | −1.00 | +0.00 |
| 94 | Rumble | +0.43 | −0.42 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 95 | Sylas | +0.43 | +1.00 | +1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 96 | Garen | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 97 | Kayn | +0.40 | +0.85 | +0.32 | +0.85 | −0.09 | −0.50 | +0.00 |
| 98 | Galio | +0.39 | +1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.00 |
| 99 | Swain | +0.34 | +0.94 | +1.00 | −1.00 | +0.14 | – | +0.00 |
| 100 | Varus | +0.34 | +1.00 | +1.00 | −1.00 | +0.03 | – | +0.00 |
| 101 | Orianna | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 102 | Azir | +0.33 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 103 | Zilean | +0.33 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 104 | Draven | +0.33 | +1.00 | +0.95 | −1.00 | +0.05 | – | +0.00 |
| 105 | Karma | +0.32 | +1.00 | +0.92 | −1.00 | +0.05 | – | +0.00 |
| 106 | Milio | +0.32 | +1.00 | +0.88 | −1.00 | +0.09 | – | +0.00 |
| 107 | Zyra | +0.28 | +0.95 | +0.89 | −1.00 | +0.02 | +0.18 | +0.00 |
| 108 | Hwei | +0.26 | −0.76 | +0.90 | +1.00 | +0.01 | – | +0.00 |
| 109 | Smolder | +0.22 | +0.00 | +0.00 | +1.00 | −0.00 | – | +0.00 |
| 110 | Kai'Sa | +0.21 | −1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 111 | Hecarim | +0.19 | −1.00 | +1.00 | +1.00 | −0.08 | +0.00 | +0.00 |
| 112 | Anivia | +0.13 | +0.06 | +0.22 | +0.35 | −0.19 | +0.21 | +0.00 |
| 113 | Singed | +0.10 | +1.00 | −1.00 | +1.00 | −0.00 | −1.00 | +0.00 |
| 114 | Rek'Sai | +0.09 | +0.00 | +0.00 | +1.00 | −0.07 | −1.00 | +0.00 |
| 115 | Ekko | +0.09 | +1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.00 |
| 116 | Jhin | +0.09 | +1.00 | +0.00 | −0.92 | +0.08 | – | +0.00 |
| 117 | Akali | +0.07 | +0.43 | +0.53 | −1.00 | −0.04 | +0.36 | +0.00 |
| 118 | Nautilus | −0.07 | +1.00 | −0.96 | +0.00 | +0.13 | −1.00 | +0.00 |
| 119 | Brand | −0.08 | +0.23 | −1.00 | +0.00 | +0.13 | +0.97 | +0.00 |
| 120 | Naafiri | −0.10 | −1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 121 | Talon | −0.11 | −1.00 | +1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 122 | Karthus | −0.13 | +0.00 | −0.04 | −0.50 | −0.03 | – | +0.00 |
| 123 | Fiddlesticks | −0.22 | +1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 124 | Quinn | −0.22 | −1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 125 | Lux | −0.25 | −0.68 | +0.51 | −1.00 | +0.10 | – | +0.00 |
| 126 | Lucian | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 127 | Lillia | −0.38 | +0.17 | −1.00 | −1.00 | −0.01 | +0.31 | +0.00 |
| 128 | Ornn | −0.39 | −0.92 | −1.00 | +1.00 | −0.05 | −1.00 | +0.00 |
| 129 | Neeko | −0.40 | −1.00 | −0.22 | −1.00 | +0.06 | +1.00 | +0.00 |
| 130 | Rengar | −0.55 | −1.00 | −1.00 | −1.00 | +0.35 | +1.00 | +0.00 |
| 131 | Kha'Zix | −0.58 | −1.00 | −0.50 | −1.00 | −0.01 | +0.00 | +0.00 |
| 132 | Aurelion Sol | −0.59 | −1.00 | −1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 133 | Briar | −0.60 | −1.00 | −1.00 | +0.26 | −0.32 | −1.00 | +0.00 |
| 134 | Senna | −0.62 | −0.70 | −0.66 | −1.00 | +0.12 | −1.00 | +0.00 |
| 135 | Zoe | −0.66 | −1.00 | −1.00 | −1.00 | +0.07 | +0.32 | +0.00 |
| 136 | Locke | −0.70 | −1.00 | −1.00 | −1.00 | −0.06 | +0.13 | +0.00 |
| 137 | Shaco | −0.70 | −1.00 | −1.00 | −1.00 | +0.01 | +0.00 | +0.00 |
| 138 | Ziggs | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 139 | Mel | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 140 | Veigar | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | −0.61 | +0.00 |
| 141 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 142 | Janna | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 143 | Ahri | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 144 | Vex | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 145 | Ryze | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | −0.82 | +0.00 |
| 146 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 147 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 148 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 149 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 150 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 151 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 152 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 153 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 154 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 155 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 156 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 157 | Yuumi | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 158 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 159 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 160 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 161 | Bard | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 162 | Vladimir | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 163 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 164 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 165 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 166 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 167 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 168 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 169 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 170 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 171 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | – | −1.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kindred's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kindred's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kindred` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +0.69)

- **0.42** projectile block: Blade Whirl blocks Kindred's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kindred basic attacks)
- **0.39** projectile block: Blade Whirl blocks Kindred's Dance of Arrows, a projectile. Blade Whirl for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Samira W Blade Whirl → Kindred Q Dance of Arrows)
- **0.28** projectile block: Blade Whirl blocks Kindred's Mounting Dread, a projectile. Blade Whirl for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Kindred E Mounting Dread)

#### 2. Mel (net +0.67)

- **0.42** projectile block: Rebuttal blocks Kindred's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Kindred basic attacks)
- **0.36** projectile block: Rebuttal blocks Kindred's Dance of Arrows, a projectile. Rebuttal for 0.75 s; Dance of Arrows takes 0.6 s to land, enough to react. (Mel W Rebuttal → Kindred Q Dance of Arrows)
- **0.26** projectile block: Rebuttal blocks Kindred's Mounting Dread, a projectile. Rebuttal for 0.75 s; Mounting Dread takes 0.25 s to land, enough to react. (Mel W Rebuttal → Kindred E Mounting Dread)

#### 3. Teemo (net +0.66)

- **0.66** blind: Blinding Dart's blind makes Kindred's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kindred basic attacks)

#### 4. Braum (net +0.64)

- **0.70** projectile block: Unbreakable blocks Kindred's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kindred basic attacks)
- **0.60** projectile block: Unbreakable blocks Kindred's Dance of Arrows, a projectile. Unbreakable for 4 s, long enough to use ahead of Dance of Arrows. (Braum E Unbreakable → Kindred Q Dance of Arrows)
- **0.45** projectile block: Unbreakable blocks Kindred's Mounting Dread, a projectile. Unbreakable for 4 s, long enough to use ahead of Mounting Dread. (Braum E Unbreakable → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 375 units farther than Braum's (500 vs 125 attack range).

#### 5. Yasuo (net +0.56)

- **0.54** projectile block: Wind Wall blocks Kindred's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Kindred basic attacks)
- **0.43** projectile block: Wind Wall blocks Kindred's Dance of Arrows, a projectile. Wind Wall for 4 s, long enough to use ahead of Dance of Arrows. (Yasuo W Wind Wall → Kindred Q Dance of Arrows)
- **0.31** projectile block: Wind Wall blocks Kindred's Mounting Dread, a projectile. Wind Wall for 4 s, long enough to use ahead of Mounting Dread. (Yasuo W Wind Wall → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 325 units farther than Yasuo's (500 vs 175 attack range).

#### 6. Lulu (net +0.47)

- **0.47** disarm: Whimsy disarms Kindred for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kindred basic attacks)

#### 7. Yuumi (net +0.36)

- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Kindred's Mounting Dread. Untargetable for ?; Mounting Dread takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Kindred E Mounting Dread)
- Watch out: Kindred's basic attacks reach 75 units farther than Yuumi's (500 vs 425 attack range).

#### 8. Varus (net +0.36)

- **0.22** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Lamb's Respite by 40%. (Varus E Hail of Arrows → Kindred R Lamb's Respite)
- **0.18** anti-heal: Hail of Arrows's Grievous Wounds cuts Kindred's healing from Wolf's Frenzy by 40%. (Varus E Hail of Arrows → Kindred W Wolf's Frenzy)
- **0.05** range: Varus's basic attacks reach 75 units farther than Kindred's (575 vs 500 attack range). Kindred closes the gap with Dance of Arrows. (Varus basic attacks → Kindred basic attacks)

#### 9. Vladimir (net +0.32)

- **0.32** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Kindred's Mounting Dread. Untargetable for 2 s, long enough to use ahead of Mounting Dread. (Vladimir W Sanguine Pool → Kindred E Mounting Dread)

#### 10. Sivir (net +0.30)

- **0.30** spell shield: Spell Shield's spell shield blocks Kindred's Mounting Dread. Spell shield for 1.5 s, long enough to use ahead of Mounting Dread. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kindred E Mounting Dread)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.69 | 0.69 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.67 | 0.67 | 0.00 | projectile block (Rebuttal) |
| 3 | Teemo | +0.66 | 0.66 | 0.00 | blind (Blinding Dart) |
| 4 | Braum | +0.64 | 1.11 | 0.47 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Yasuo | +0.56 | 0.83 | 0.27 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 6 | Lulu | +0.47 | 0.47 | 0.00 | disarm (Whimsy) |
| 7 | Yuumi | +0.36 | 0.45 | 0.09 |  |
| 8 | Varus | +0.36 | 0.36 | 0.00 |  |
| 9 | Vladimir | +0.32 | 0.32 | 0.00 |  |
| 10 | Sivir | +0.30 | 0.30 | 0.00 |  |
| 11 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 12 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 13 | Jinx | +0.28 | 0.28 | 0.00 |  |
| 14 | Lissandra | +0.28 | 0.28 | 0.00 |  |
| 15 | Ahri | +0.26 | 0.26 | 0.00 |  |
| 16 | Fizz | +0.25 | 0.45 | 0.20 |  |
| 17 | Veigar | +0.24 | 0.24 | 0.00 |  |
| 18 | Viktor | +0.24 | 0.24 | 0.00 |  |
| 19 | Vex | +0.22 | 0.22 | 0.00 |  |
| 20 | Bard | +0.21 | 0.21 | 0.00 |  |
| 21 | Kayle | +0.21 | 0.21 | 0.00 |  |
| 22 | Shen | +0.20 | 0.51 | 0.31 | attack block (Spirit's Refuge) |
| 23 | Aurora | +0.20 | 0.20 | 0.00 |  |
| 24 | Malzahar | +0.20 | 0.20 | 0.00 |  |
| 25 | Xayah | +0.20 | 0.20 | 0.00 |  |
| 26 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 27 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 28 | Nilah | +0.12 | 0.46 | 0.34 | attack dodge (Jubilant Veil) |
| 29 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 30 | Morgana | +0.08 | 0.08 | 0.00 |  |
| 31 | Senna | +0.08 | 0.08 | 0.00 |  |
| 32 | Annie | +0.07 | 0.07 | 0.00 |  |
| 33 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 34 | Jax | +0.06 | 0.53 | 0.47 | attack dodge (Counter Strike) |
| 35 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 36 | Milio | +0.06 | 0.06 | 0.00 |  |
| 37 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 38 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 39 | Kalista | +0.04 | 0.04 | 0.00 |  |
| 40 | Zyra | +0.04 | 0.04 | 0.00 |  |
| 41 | Rammus | +0.03 | 0.50 | 0.47 | attack reflect (Defensive Ball Curl) |
| 42 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 43 | Azir | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Elise | 0.00 | 0.00 | 0.00 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 51 | Janna | 0.00 | 0.00 | 0.00 |  |
| 52 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 53 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 54 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 55 | Karma | 0.00 | 0.00 | 0.00 |  |
| 56 | Karthus | 0.00 | 0.00 | 0.00 |  |
| 57 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 58 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 59 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 60 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 61 | Lux | 0.00 | 0.00 | 0.00 |  |
| 62 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 63 | Nami | 0.00 | 0.00 | 0.00 |  |
| 64 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 65 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 66 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 67 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 68 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 69 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 70 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 71 | Sona | 0.00 | 0.00 | 0.00 |  |
| 72 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 73 | Swain | 0.00 | 0.00 | 0.00 |  |
| 74 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 75 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 76 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 77 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 78 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 79 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 80 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 81 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 82 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 83 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 84 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 85 | Camille | -0.03 | 0.20 | 0.23 |  |
| 86 | Master Yi | -0.04 | 0.37 | 0.41 |  |
| 87 | Fiora | -0.06 | 0.38 | 0.44 |  |
| 88 | Kayn | -0.06 | 0.21 | 0.27 |  |
| 89 | Rek'Sai | -0.06 | 0.21 | 0.27 |  |
| 90 | Yone | -0.06 | 0.14 | 0.20 |  |
| 91 | Graves | -0.06 | 0.00 | 0.06 |  |
| 92 | Maokai | -0.07 | 0.40 | 0.47 |  |
| 93 | Poppy | -0.09 | 0.38 | 0.47 |  |
| 94 | Evelynn | -0.10 | 0.21 | 0.31 |  |
| 95 | Shaco | -0.10 | 0.21 | 0.31 |  |
| 96 | Nocturne | -0.11 | 0.36 | 0.47 |  |
| 97 | Zac | -0.11 | 0.30 | 0.41 |  |
| 98 | Zed | -0.11 | 0.20 | 0.31 |  |
| 99 | Kled | -0.11 | 0.05 | 0.16 |  |
| 100 | Pantheon | -0.12 | 0.15 | 0.27 |  |
| 101 | Malphite | -0.14 | 0.33 | 0.47 |  |
| 102 | Gwen | -0.14 | 0.30 | 0.44 |  |
| 103 | Warwick | -0.14 | 0.17 | 0.31 |  |
| 104 | Katarina | -0.16 | 0.31 | 0.47 |  |
| 105 | Singed | -0.17 | 0.77 | 0.94 |  |
| 106 | Aurelion Sol | -0.17 | 0.00 | 0.17 |  |
| 107 | Rakan | -0.17 | 0.00 | 0.17 |  |
| 108 | Smolder | -0.18 | 0.00 | 0.18 |  |
| 109 | Urgot | -0.19 | 0.00 | 0.19 |  |
| 110 | Viego | -0.19 | 0.00 | 0.19 |  |
| 111 | Jarvan IV | -0.20 | 0.00 | 0.20 |  |
| 112 | Sylas | -0.20 | 0.00 | 0.20 |  |
| 113 | Zaahen | -0.22 | 0.05 | 0.27 |  |
| 114 | K'Sante | -0.22 | 0.00 | 0.22 |  |
| 115 | Lillia | -0.22 | 0.00 | 0.22 |  |
| 116 | Briar | -0.23 | 0.00 | 0.23 |  |
| 117 | Naafiri | -0.23 | 0.00 | 0.23 |  |
| 118 | Hecarim | -0.27 | 0.00 | 0.27 |  |
| 119 | Wukong | -0.27 | 0.00 | 0.27 |  |
| 120 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 121 | Rell | -0.27 | 0.00 | 0.27 |  |
| 122 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 123 | Galio | -0.29 | 0.00 | 0.29 |  |
| 124 | Qiyana | -0.29 | 0.00 | 0.29 |  |
| 125 | Volibear | -0.29 | 0.00 | 0.29 |  |
| 126 | Xin Zhao | -0.31 | 0.10 | 0.41 |  |
| 127 | Akali | -0.31 | 0.00 | 0.31 |  |
| 128 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 129 | Ekko | -0.31 | 0.00 | 0.31 |  |
| 130 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 131 | Riven | -0.31 | 0.00 | 0.31 |  |
| 132 | Talon | -0.31 | 0.00 | 0.31 |  |
| 133 | Vi | -0.31 | 0.00 | 0.31 |  |
| 134 | Amumu | -0.33 | 0.14 | 0.47 |  |
| 135 | Draven | -0.35 | 0.00 | 0.35 |  |
| 136 | Syndra | -0.35 | 0.00 | 0.35 |  |
| 137 | Udyr | -0.36 | 0.11 | 0.47 |  |
| 138 | Irelia | -0.38 | 0.00 | 0.38 |  |
| 139 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 140 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 141 | Tahm Kench | -0.41 | 0.00 | 0.41 |  |
| 142 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 143 | Alistar | -0.43 | 0.04 | 0.47 |  |
| 144 | Nasus | -0.44 | 0.50 | 0.94 | attack speed slow (Wither) |
| 145 | Diana | -0.44 | 0.00 | 0.44 |  |
| 146 | Kassadin | -0.44 | 0.00 | 0.44 |  |
| 147 | Sejuani | -0.44 | 0.00 | 0.44 |  |
| 148 | Shyvana | -0.44 | 0.00 | 0.44 |  |
| 149 | Gragas | -0.47 | 0.00 | 0.47 |  |
| 150 | Illaoi | -0.47 | 0.00 | 0.47 |  |
| 151 | Kha'Zix | -0.47 | 0.00 | 0.47 |  |
| 152 | Leona | -0.47 | 0.00 | 0.47 |  |
| 153 | Renekton | -0.47 | 0.00 | 0.47 |  |
| 154 | Sett | -0.47 | 0.00 | 0.47 |  |
| 155 | Garen | -0.69 | 0.12 | 0.81 |  |
| 156 | Mordekaiser | -0.69 | 0.12 | 0.81 |  |
| 157 | Sion | -0.76 | 0.05 | 0.81 |  |
| 158 | Nunu & Willump | -0.81 | 0.13 | 0.94 |  |
| 159 | Darius | -0.81 | 0.00 | 0.81 |  |
| 160 | Trundle | -0.81 | 0.00 | 0.81 |  |
| 161 | Yorick | -0.81 | 0.00 | 0.81 |  |
| 162 | Skarner | -0.82 | 0.06 | 0.88 |  |
| 163 | Locke | -0.82 | 0.00 | 0.82 |  |
| 164 | Pyke | -0.83 | 0.00 | 0.83 |  |
| 165 | Rengar | -0.86 | 0.08 | 0.94 |  |
| 166 | Gangplank | -0.87 | 0.07 | 0.94 |  |
| 167 | Taric | -0.88 | 0.00 | 0.88 |  |
| 168 | Olaf | -0.89 | 0.05 | 0.94 |  |
| 169 | Blitzcrank | -0.94 | 0.00 | 0.94 |  |
| 170 | Cho'Gath | -0.94 | 0.00 | 0.94 |  |
| 171 | Dr. Mundo | -0.94 | 0.00 | 0.94 |  |
| 172 | Rumble | -0.94 | 0.00 | 0.94 |  |
