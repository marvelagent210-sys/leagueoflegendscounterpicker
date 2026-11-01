# Counters to Sona (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Sona: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sona wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sona --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 2 | Aurelion Sol | +0.86 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.00 |
| 3 | Camille | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 4 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +1.00 |
| 5 | Sylas | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | +1.00 | +0.00 |
| 6 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 7 | Riven | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 8 | Yasuo | +0.84 | +0.99 | +0.99 | +1.00 | +0.07 | +1.00 | +0.75 |
| 9 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 10 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +1.00 |
| 11 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 12 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 13 | Vel'Koz | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 14 | Jarvan IV | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 15 | Skarner | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 16 | Tahm Kench | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 17 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 18 | Xin Zhao | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 19 | Diana | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 20 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 21 | Nautilus | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 22 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 23 | Naafiri | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 24 | Jax | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 25 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 26 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 27 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 28 | Ziggs | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 29 | Kayn | +0.80 | +0.99 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 30 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 31 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 32 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 33 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 34 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 35 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 36 | Zoe | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 37 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 38 | Braum | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 39 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 40 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 41 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 42 | Volibear | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 43 | Galio | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 44 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 45 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 46 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 47 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 48 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 49 | Fizz | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 50 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 51 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 52 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 53 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 54 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 55 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 56 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 57 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 58 | Locke | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 59 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 60 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 61 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 62 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 63 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 64 | Kennen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 65 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 66 | Samira | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 67 | Cassiopeia | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 68 | Swain | +0.78 | +0.98 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 69 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 70 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 71 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 72 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 73 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 74 | Miss Fortune | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 75 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 76 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 77 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.00 |
| 78 | Varus | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 79 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 80 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 81 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 82 | Aurora | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 83 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 84 | Gragas | +0.77 | +0.96 | +0.96 | +1.00 | −0.03 | +1.00 | +0.00 |
| 85 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 86 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 87 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 88 | Akshan | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 89 | Azir | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 90 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 91 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 92 | Kindred | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 93 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 94 | Twitch | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 95 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 96 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 97 | Gnar | +0.75 | +1.00 | +1.00 | +1.00 | −0.04 | +0.55 | +0.00 |
| 98 | Karma | +0.74 | +0.93 | +0.92 | +1.00 | +0.01 | – | +0.00 |
| 99 | Ashe | +0.64 | +0.51 | +0.99 | +1.00 | +0.01 | – | +0.00 |
| 100 | Rell | +0.58 | +1.00 | +0.05 | +1.00 | +0.12 | +1.00 | +0.00 |
| 101 | Garen | +0.53 | +1.00 | +0.25 | +1.00 | +0.10 | +0.00 | +0.00 |
| 102 | Nidalee | +0.52 | +0.17 | +0.94 | +1.00 | −0.05 | – | +0.00 |
| 103 | Hecarim | +0.49 | +1.00 | +1.00 | −0.50 | −0.05 | +1.00 | +0.00 |
| 104 | Anivia | +0.48 | −0.02 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 105 | Akali | +0.44 | +1.00 | +0.24 | +0.27 | −0.05 | +0.86 | +0.00 |
| 106 | Nilah | +0.40 | +1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 107 | Ryze | +0.39 | +0.26 | +0.26 | +1.00 | −0.04 | +0.69 | +0.00 |
| 108 | Aatrox | +0.39 | −0.17 | +0.59 | +1.00 | −0.12 | +1.00 | +0.00 |
| 109 | Xerath | +0.38 | −0.03 | +0.94 | +1.00 | +0.00 | −0.48 | +0.00 |
| 110 | Amumu | +0.33 | +0.10 | +0.09 | +1.00 | −0.02 | +0.90 | +0.00 |
| 111 | Kha'Zix | +0.32 | +0.00 | +0.06 | +1.00 | +0.02 | +1.00 | +0.00 |
| 112 | Graves | +0.32 | +0.00 | +0.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 113 | Singed | +0.31 | +1.00 | −0.93 | +1.00 | −0.04 | +1.00 | +0.00 |
| 114 | Katarina | +0.30 | +1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 115 | Pantheon | +0.29 | +1.00 | −1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 116 | Ambessa | +0.29 | −1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 117 | Bel'Veth | +0.27 | −1.00 | +1.00 | +0.89 | −0.04 | +1.00 | +0.00 |
| 118 | Milio | +0.26 | +0.04 | +0.04 | +1.00 | +0.11 | – | +0.00 |
| 119 | Renekton | +0.23 | +0.07 | +0.09 | +1.00 | −0.07 | +0.01 | +0.00 |
| 120 | Mel | +0.23 | −1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 121 | Illaoi | +0.23 | −0.13 | −0.09 | +0.95 | −0.03 | +1.00 | +0.00 |
| 122 | Olaf | +0.22 | −0.03 | −0.03 | +1.00 | −0.16 | +0.56 | +0.00 |
| 123 | Evelynn | +0.20 | +1.00 | +1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 124 | Zac | +0.19 | +0.28 | +0.17 | +0.12 | +0.08 | +0.42 | +0.00 |
| 125 | Shen | +0.19 | +0.05 | −0.06 | +1.00 | −0.00 | −0.06 | +0.00 |
| 126 | Zilean | +0.19 | +0.84 | −0.91 | +1.00 | −0.06 | – | +0.00 |
| 127 | Leona | +0.17 | −0.08 | −0.09 | +1.00 | −0.05 | +0.20 | +0.00 |
| 128 | Jinx | +0.13 | −0.06 | −0.29 | +1.00 | +0.05 | – | +0.00 |
| 129 | Bard | +0.12 | −0.15 | −0.17 | +1.00 | −0.10 | – | +0.00 |
| 130 | Rakan | +0.03 | −0.07 | −1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 131 | Hwei | +0.01 | +0.09 | −0.83 | +1.00 | −0.02 | – | +0.00 |
| 132 | Ahri | −0.04 | −1.00 | +0.06 | +1.00 | −0.04 | – | +0.00 |
| 133 | Ornn | −0.05 | −0.06 | −0.10 | −0.02 | −0.05 | +0.02 | +0.00 |
| 134 | Alistar | −0.05 | −0.08 | −0.04 | −0.08 | −0.01 | −0.05 | +0.00 |
| 135 | Briar | −0.08 | +1.00 | −1.00 | +0.22 | −0.18 | −1.00 | +0.00 |
| 136 | Nami | −0.09 | −0.15 | −0.16 | +0.00 | −0.01 | – | +0.00 |
| 137 | Ekko | −0.10 | −1.00 | −0.11 | +1.00 | −0.05 | −0.14 | +0.00 |
| 138 | Talon | −0.11 | −1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.00 |
| 139 | Taric | −0.12 | −0.22 | −0.06 | −0.21 | +0.01 | −0.07 | +0.00 |
| 140 | Urgot | −0.12 | −0.20 | −0.24 | −0.00 | −0.03 | −0.10 | +0.00 |
| 141 | Rek'Sai | −0.17 | −1.00 | −0.84 | +1.00 | −0.04 | +1.00 | +0.00 |
| 142 | Yone | −0.19 | −0.47 | −0.47 | +0.24 | −0.18 | +0.24 | +0.00 |
| 143 | Lux | −0.20 | −1.00 | −0.17 | +0.57 | +0.01 | – | +0.00 |
| 144 | Seraphine | −0.20 | −0.52 | −0.97 | +1.00 | −0.05 | – | +0.00 |
| 145 | Qiyana | −0.20 | −1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 146 | Fiddlesticks | −0.21 | −0.95 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 147 | Karthus | −0.26 | −0.36 | −0.36 | −0.27 | −0.01 | −0.23 | +0.00 |
| 148 | Elise | −0.33 | −1.00 | −1.00 | +1.00 | −0.00 | – | +0.00 |
| 149 | Ezreal | −0.34 | −0.77 | −0.16 | −0.35 | −0.01 | – | +0.00 |
| 150 | Viktor | −0.34 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 151 | Sivir | −0.35 | −1.00 | −1.00 | +1.00 | −0.09 | – | +0.00 |
| 152 | Caitlyn | −0.39 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 153 | Brand | −0.40 | −1.00 | −1.00 | +1.00 | −0.04 | −0.99 | +0.00 |
| 154 | Soraka | −0.47 | −0.98 | −0.77 | +0.07 | +0.01 | – | +0.00 |
| 155 | Veigar | −0.50 | −1.00 | −0.93 | +0.01 | −0.05 | −0.10 | +0.00 |
| 156 | Zyra | −0.60 | −1.00 | −1.00 | +0.00 | +0.02 | −1.00 | +0.00 |
| 157 | Pyke | −0.74 | −1.00 | −1.00 | −1.00 | −0.25 | +0.00 | +0.00 |
| 158 | Janna | −0.76 | −1.00 | −0.95 | −1.00 | −0.00 | – | +0.00 |
| 159 | Syndra | −0.77 | −1.00 | −0.95 | −1.00 | −0.01 | – | +0.00 |
| 160 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 161 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 162 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 163 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 164 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 165 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 166 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 167 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 168 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 169 | Morgana | −0.81 | −1.00 | −1.00 | −0.99 | −0.05 | −1.00 | +0.00 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 171 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 172 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sona's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sona's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sona` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +1.02)

- **0.80** projectile block: Blade Whirl blocks Sona's Crescendo, a projectile. Blade Whirl for 0.75 s; Crescendo takes 0.67 s to land, enough to react. (Samira W Blade Whirl → Sona R Crescendo)
- **0.35** projectile block: Blade Whirl blocks Sona's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Sona basic attacks)
- **0.17** projectile block: Blade Whirl blocks Sona's Hymn of Valor, a projectile. Blade Whirl for 0.75 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Sona Q Hymn of Valor)

#### 2. Mel (net +1.01)

- **0.80** projectile block: Rebuttal blocks Sona's Crescendo, a projectile. Rebuttal for 0.75 s; Crescendo takes 0.67 s to land, enough to react. (Mel W Rebuttal → Sona R Crescendo)
- **0.34** projectile block: Rebuttal blocks Sona's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Sona basic attacks)
- **0.16** projectile block: Rebuttal blocks Sona's Hymn of Valor, a projectile. Rebuttal for 0.75 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Sona Q Hymn of Valor)

#### 3. Sivir (net +0.95)

- **0.80** spell shield: Spell Shield's spell shield blocks Sona's Crescendo. Spell shield for 1.5 s, long enough to use ahead of Crescendo. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sona R Crescendo)
- **0.30** spell shield: Spell Shield's spell shield blocks Sona's Hymn of Valor. Spell shield for 1.5 s, long enough to use ahead of Hymn of Valor. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sona Q Hymn of Valor)

#### 4. Bard (net +0.91)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Sona's Crescendo. Untargetable for 2.5 s, long enough to use ahead of Crescendo. (Bard R Tempered Fate → Sona R Crescendo)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Sona's Hymn of Valor. Untargetable for 2.5 s, long enough to use ahead of Hymn of Valor. (Bard R Tempered Fate → Sona Q Hymn of Valor)

#### 5. Lissandra (net +0.91)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sona's Crescendo. Untargetable for 2.5 s, long enough to use ahead of Crescendo. (Lissandra R Frozen Tomb → Sona R Crescendo)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Sona's Hymn of Valor. Untargetable for 2.5 s, long enough to use ahead of Hymn of Valor. (Lissandra R Frozen Tomb → Sona Q Hymn of Valor)

#### 6. Xayah (net +0.90)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Sona's Crescendo. Untargetable for 1.5 s, long enough to use ahead of Crescendo. (Xayah R Featherstorm → Sona R Crescendo)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Sona's Hymn of Valor. Untargetable for 1.5 s, long enough to use ahead of Hymn of Valor. (Xayah R Featherstorm → Sona Q Hymn of Valor)

#### 7. Aurora (net +0.86)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Sona's Crescendo. Untargetable for 0.4 s; Crescendo takes 0.67 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sona R Crescendo)
- **0.12** untargetable: Between Worlds makes Aurora untargetable, dodging Sona's Hymn of Valor. Untargetable for 0.4 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sona Q Hymn of Valor)

#### 8. Yasuo (net +0.84)

- **0.80** projectile block: Wind Wall blocks Sona's Crescendo, a projectile. Wind Wall for 4 s, long enough to use ahead of Crescendo. (Yasuo W Wind Wall → Sona R Crescendo)
- **0.45** projectile block: Wind Wall blocks Sona's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Sona basic attacks)
- **0.31** projectile block: Wind Wall blocks Sona's Hymn of Valor, a projectile. Wind Wall for 4 s, long enough to use ahead of Hymn of Valor. (Yasuo W Wind Wall → Sona Q Hymn of Valor)
- Watch out: Sona's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 9. Braum (net +0.79)

- **0.80** projectile block: Unbreakable blocks Sona's Crescendo, a projectile. Unbreakable for 4 s, long enough to use ahead of Crescendo. (Braum E Unbreakable → Sona R Crescendo)
- **0.58** projectile block: Unbreakable blocks Sona's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Sona basic attacks)
- **0.45** projectile block: Unbreakable blocks Sona's Hymn of Valor, a projectile. Unbreakable for 4 s, long enough to use ahead of Hymn of Valor. (Braum E Unbreakable → Sona Q Hymn of Valor)
- Watch out: Sona's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 10. Fizz (net +0.75)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Sona's Crescendo. Untargetable for 0.75 s; Crescendo takes 0.67 s to land, enough to react. (Fizz E Playful → Sona R Crescendo)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Sona's Hymn of Valor. Untargetable for 0.75 s; Hymn of Valor lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Sona Q Hymn of Valor)
- Watch out: Sona's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +1.02 | 1.02 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +1.01 | 1.01 | 0.00 | projectile block (Rebuttal) |
| 3 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 4 | Bard | +0.91 | 0.91 | 0.00 |  |
| 5 | Lissandra | +0.91 | 0.91 | 0.00 |  |
| 6 | Xayah | +0.90 | 0.90 | 0.00 |  |
| 7 | Aurora | +0.86 | 0.86 | 0.00 |  |
| 8 | Yasuo | +0.84 | 1.10 | 0.26 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 9 | Braum | +0.79 | 1.20 | 0.41 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 10 | Fizz | +0.75 | 0.94 | 0.19 |  |
| 11 | Vladimir | +0.70 | 0.96 | 0.26 |  |
| 12 | Milio | +0.66 | 0.66 | 0.00 |  |
| 13 | Rek'Sai | +0.65 | 0.91 | 0.26 |  |
| 14 | Camille | +0.65 | 0.86 | 0.21 |  |
| 15 | Kayle | +0.65 | 0.65 | 0.00 |  |
| 16 | Fiora | +0.61 | 1.02 | 0.41 |  |
| 17 | Kled | +0.61 | 0.76 | 0.15 |  |
| 18 | Evelynn | +0.59 | 0.86 | 0.27 |  |
| 19 | Shaco | +0.59 | 0.86 | 0.27 |  |
| 20 | Zed | +0.59 | 0.86 | 0.27 |  |
| 21 | Morgana | +0.59 | 0.80 | 0.21 |  |
| 22 | Kalista | +0.58 | 0.58 | 0.00 |  |
| 23 | Nocturne | +0.57 | 0.98 | 0.41 |  |
| 24 | Zaahen | +0.54 | 0.80 | 0.26 |  |
| 25 | Teemo | +0.54 | 0.54 | 0.00 | blind (Blinding Dart) |
| 26 | Maokai | +0.51 | 0.92 | 0.41 |  |
| 27 | Gwen | +0.48 | 0.89 | 0.41 |  |
| 28 | Yuumi | +0.43 | 0.94 | 0.51 |  |
| 29 | Master Yi | +0.40 | 0.89 | 0.49 |  |
| 30 | Udyr | +0.39 | 0.80 | 0.41 |  |
| 31 | Lulu | +0.39 | 0.39 | 0.00 |  |
| 32 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 33 | Alistar | +0.23 | 0.64 | 0.41 |  |
| 34 | Kayn | +0.20 | 0.86 | 0.66 |  |
| 35 | Varus | +0.13 | 0.18 | 0.05 |  |
| 36 | Xin Zhao | +0.11 | 0.50 | 0.39 |  |
| 37 | Annie | +0.08 | 0.08 | 0.00 |  |
| 38 | Malzahar | +0.05 | 0.40 | 0.35 |  |
| 39 | Nilah | +0.04 | 0.38 | 0.34 |  |
| 40 | Warwick | +0.03 | 0.80 | 0.77 |  |
| 41 | Jax | +0.03 | 0.44 | 0.41 | attack dodge (Counter Strike) |
| 42 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 43 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 44 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 45 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 46 | Azir | 0.00 | 0.00 | 0.00 |  |
| 47 | Brand | 0.00 | 0.00 | 0.00 |  |
| 48 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 49 | Corki | 0.00 | 0.00 | 0.00 |  |
| 50 | Draven | 0.00 | 0.00 | 0.00 |  |
| 51 | Elise | 0.00 | 0.00 | 0.00 |  |
| 52 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 53 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 54 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 55 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 56 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 57 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 58 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 59 | Karma | 0.00 | 0.00 | 0.00 |  |
| 60 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 61 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 62 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 63 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 64 | Lux | 0.00 | 0.00 | 0.00 |  |
| 65 | Nami | 0.00 | 0.00 | 0.00 |  |
| 66 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 67 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 68 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 69 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 70 | Senna | 0.00 | 0.00 | 0.00 |  |
| 71 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 72 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 73 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 74 | Swain | 0.00 | 0.00 | 0.00 |  |
| 75 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 76 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 77 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 78 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 79 | Vex | 0.00 | 0.00 | 0.00 |  |
| 80 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 81 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 82 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 83 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 84 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 85 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 86 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 87 | Olaf | -0.03 | 0.80 | 0.83 |  |
| 88 | Sion | -0.05 | 0.80 | 0.85 |  |
| 89 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 90 | Thresh | -0.07 | 0.00 | 0.07 |  |
| 91 | Caitlyn | -0.08 | 0.18 | 0.26 |  |
| 92 | Graves | -0.09 | 0.00 | 0.09 |  |
| 93 | Malphite | -0.14 | 0.27 | 0.41 |  |
| 94 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 95 | Rammus | -0.15 | 0.41 | 0.56 | attack reflect (Defensive Ball Curl) |
| 96 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 97 | Rakan | -0.17 | 0.00 | 0.17 |  |
| 98 | Gangplank | -0.19 | 0.64 | 0.83 |  |
| 99 | Rengar | -0.19 | 0.64 | 0.83 |  |
| 100 | Pantheon | -0.19 | 0.55 | 0.74 |  |
| 101 | Jarvan IV | -0.19 | 0.00 | 0.19 |  |
| 102 | Sylas | -0.19 | 0.00 | 0.19 |  |
| 103 | Yone | -0.19 | 0.00 | 0.19 |  |
| 104 | Briar | -0.21 | 0.00 | 0.21 |  |
| 105 | K'Sante | -0.21 | 0.00 | 0.21 |  |
| 106 | Urgot | -0.21 | 0.00 | 0.21 |  |
| 107 | Akshan | -0.23 | 0.00 | 0.23 |  |
| 108 | Lillia | -0.23 | 0.00 | 0.23 |  |
| 109 | Vel'Koz | -0.24 | 0.00 | 0.24 |  |
| 110 | Hecarim | -0.26 | 0.00 | 0.26 |  |
| 111 | Jhin | -0.26 | 0.00 | 0.26 |  |
| 112 | Lucian | -0.26 | 0.00 | 0.26 |  |
| 113 | Wukong | -0.26 | 0.00 | 0.26 |  |
| 114 | Ornn | -0.26 | 0.00 | 0.26 |  |
| 115 | Rell | -0.26 | 0.00 | 0.26 |  |
| 116 | Akali | -0.27 | 0.00 | 0.27 |  |
| 117 | Ambessa | -0.27 | 0.00 | 0.27 |  |
| 118 | Bel'Veth | -0.27 | 0.00 | 0.27 |  |
| 119 | Ekko | -0.27 | 0.00 | 0.27 |  |
| 120 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 121 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 122 | Riven | -0.27 | 0.00 | 0.27 |  |
| 123 | Talon | -0.27 | 0.00 | 0.27 |  |
| 124 | Volibear | -0.27 | 0.00 | 0.27 |  |
| 125 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 126 | Viego | -0.29 | 0.00 | 0.29 |  |
| 127 | Shen | -0.30 | 0.42 | 0.72 | attack block (Spirit's Refuge) |
| 128 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 129 | Pyke | -0.35 | 0.00 | 0.35 |  |
| 130 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 131 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 132 | Fiddlesticks | -0.36 | 0.00 | 0.36 |  |
| 133 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 134 | Aatrox | -0.39 | 0.00 | 0.39 |  |
| 135 | Nautilus | -0.39 | 0.00 | 0.39 |  |
| 136 | Tryndamere | -0.39 | 0.00 | 0.39 |  |
| 137 | Janna | -0.40 | 0.00 | 0.40 |  |
| 138 | Nasus | -0.41 | 0.42 | 0.83 | attack speed slow (Wither) |
| 139 | Katarina | -0.41 | 0.18 | 0.59 |  |
| 140 | Amumu | -0.41 | 0.00 | 0.41 |  |
| 141 | Diana | -0.41 | 0.00 | 0.41 |  |
| 142 | Illaoi | -0.41 | 0.00 | 0.41 |  |
| 143 | Kassadin | -0.41 | 0.00 | 0.41 |  |
| 144 | Kha'Zix | -0.41 | 0.00 | 0.41 |  |
| 145 | Leona | -0.41 | 0.00 | 0.41 |  |
| 146 | Locke | -0.41 | 0.00 | 0.41 |  |
| 147 | Renekton | -0.41 | 0.00 | 0.41 |  |
| 148 | Sejuani | -0.41 | 0.00 | 0.41 |  |
| 149 | Sett | -0.41 | 0.00 | 0.41 |  |
| 150 | Shyvana | -0.41 | 0.00 | 0.41 |  |
| 151 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 152 | Karthus | -0.49 | 0.00 | 0.49 |  |
| 153 | Vi | -0.49 | 0.00 | 0.49 |  |
| 154 | Gragas | -0.51 | 0.00 | 0.51 |  |
| 155 | Singed | -0.56 | 0.27 | 0.83 |  |
| 156 | Garen | -0.56 | 0.21 | 0.77 |  |
| 157 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 158 | Poppy | -0.61 | 0.00 | 0.61 |  |
| 159 | Zac | -0.62 | 0.00 | 0.62 |  |
| 160 | Tahm Kench | -0.64 | 0.00 | 0.64 |  |
| 161 | Mordekaiser | -0.67 | 0.10 | 0.77 |  |
| 162 | Darius | -0.77 | 0.00 | 0.77 |  |
| 163 | Trundle | -0.77 | 0.00 | 0.77 |  |
| 164 | Yorick | -0.77 | 0.00 | 0.77 |  |
| 165 | Galio | -0.81 | 0.00 | 0.81 |  |
| 166 | Blitzcrank | -0.83 | 0.00 | 0.83 |  |
| 167 | Cho'Gath | -0.83 | 0.00 | 0.83 |  |
| 168 | Dr. Mundo | -0.83 | 0.00 | 0.83 |  |
| 169 | Rumble | -0.83 | 0.00 | 0.83 |  |
| 170 | Skarner | -0.83 | 0.00 | 0.83 |  |
| 171 | Taric | -0.83 | 0.00 | 0.83 |  |
| 172 | Nunu & Willump | -1.17 | 0.00 | 1.17 |  |
