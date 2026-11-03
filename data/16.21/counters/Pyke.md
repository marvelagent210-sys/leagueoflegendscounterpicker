# Counters to Pyke (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Pyke: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Pyke wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Pyke --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +1.00 |
| 2 | Master Yi | +0.88 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +1.00 |
| 3 | Rengar | +0.88 | +1.00 | +1.00 | +1.00 | +0.51 | +1.00 | +0.00 |
| 4 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.49 | +1.00 | +0.00 |
| 5 | Yorick | +0.86 | +1.00 | +1.00 | +1.00 | +0.19 | – | +1.00 |
| 6 | Nasus | +0.86 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +1.00 |
| 7 | Graves | +0.86 | +1.00 | +1.00 | +1.00 | +0.40 | +1.00 | +0.00 |
| 8 | Riven | +0.86 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.50 |
| 9 | Yunara | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.00 |
| 10 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.00 |
| 11 | Smolder | +0.86 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | +0.00 |
| 12 | Heimerdinger | +0.86 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | +0.00 |
| 13 | Ashe | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 14 | Cassiopeia | +0.86 | +1.00 | +1.00 | +1.00 | +0.37 | +1.00 | +0.00 |
| 15 | Trundle | +0.86 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +1.00 |
| 16 | Milio | +0.85 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.00 |
| 17 | Gnar | +0.85 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.00 |
| 18 | Neeko | +0.85 | +1.00 | +1.00 | +1.00 | +0.35 | +1.00 | +0.00 |
| 19 | Ambessa | +0.85 | +1.00 | +1.00 | +1.00 | +0.44 | – | +0.00 |
| 20 | Aphelios | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 21 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 22 | Sion | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 23 | Akshan | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 24 | Camille | +0.85 | +1.00 | +1.00 | +1.00 | +0.10 | – | +1.00 |
| 25 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 26 | Vel'Koz | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 27 | Miss Fortune | +0.85 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 28 | Seraphine | +0.85 | +1.00 | +0.96 | +1.00 | +0.38 | +1.00 | +0.00 |
| 29 | Cho'Gath | +0.84 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 30 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 31 | Kalista | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 32 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | +0.40 | – | +0.00 |
| 33 | Jayce | +0.84 | +1.00 | +1.00 | +1.00 | +0.39 | – | +0.00 |
| 34 | Lucian | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 35 | Jhin | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 36 | Lulu | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 37 | Urgot | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 38 | Janna | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 39 | Nilah | +0.84 | +1.00 | +1.00 | +1.00 | +0.37 | – | +0.00 |
| 40 | Ziggs | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 41 | Mel | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 42 | Orianna | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 43 | Corki | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 44 | Gangplank | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 45 | Xin Zhao | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 46 | Kled | +0.84 | +1.00 | +1.00 | +1.00 | +0.25 | +1.00 | +0.00 |
| 47 | Sylas | +0.84 | +1.00 | +1.00 | +1.00 | +0.35 | – | +0.00 |
| 48 | Viego | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 49 | Bel'Veth | +0.84 | +1.00 | +1.00 | +1.00 | +0.35 | – | +0.00 |
| 50 | Twisted Fate | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 51 | Morgana | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 52 | Pantheon | +0.84 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 53 | Garen | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 54 | Lissandra | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 55 | Zaahen | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 56 | Samira | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 57 | Varus | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 58 | Ryze | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 59 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 60 | Lux | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 61 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 62 | Jinx | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 63 | Tristana | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 64 | Brand | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 65 | Kindred | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 66 | Ornn | +0.83 | +1.00 | +1.00 | +1.00 | +0.32 | – | +0.00 |
| 67 | Nunu & Willump | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 68 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 69 | Karma | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 70 | Diana | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 71 | Hecarim | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 72 | Aurora | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 73 | Draven | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 74 | Rakan | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 75 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.00 |
| 76 | Senna | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 77 | Illaoi | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 78 | Kennen | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 79 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 80 | Swain | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 81 | Shaco | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 82 | Viktor | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 83 | Lee Sin | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 84 | Aatrox | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 85 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 86 | Maokai | +0.83 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 87 | Zyra | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 88 | Vex | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 89 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 90 | Warwick | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 91 | Veigar | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 92 | Yone | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 93 | Nami | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 94 | Nidalee | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 95 | Kai'Sa | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 96 | Twitch | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 97 | Syndra | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 98 | Zoe | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 99 | Hwei | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 100 | Lillia | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 101 | Azir | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 102 | Soraka | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 103 | Ahri | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 104 | Rumble | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 105 | Ivern | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 106 | Ezreal | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 107 | Gwen | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 108 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 109 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 110 | Jax | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 111 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 112 | Zed | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 113 | Renekton | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 114 | Zilean | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 115 | Bard | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 116 | Nautilus | +0.82 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.00 |
| 117 | Elise | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +0.99 | +0.00 |
| 118 | Jarvan IV | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 119 | Volibear | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.50 |
| 120 | Malzahar | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 121 | Irelia | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 122 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 123 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 124 | Wukong | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 125 | Kha'Zix | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 126 | Blitzcrank | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 127 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 128 | Naafiri | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 129 | Mordekaiser | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 130 | Tryndamere | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 131 | Singed | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 132 | Ekko | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 133 | Akali | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 134 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 135 | Kayn | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 136 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 137 | Amumu | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 138 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 139 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 140 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 141 | Leona | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 142 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 143 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 144 | Rek'Sai | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 145 | Kassadin | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 146 | Gragas | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 147 | Locke | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 148 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 149 | Talon | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 150 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 151 | Skarner | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 152 | Braum | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 153 | Vi | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 154 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 155 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 156 | Anivia | +0.75 | +0.80 | +1.00 | +1.00 | +0.01 | +0.96 | +0.00 |
| 157 | Sona | +0.74 | +1.00 | +1.00 | +1.00 | +0.25 | +0.00 | +0.00 |
| 158 | Karthus | +0.74 | +1.00 | +1.00 | +1.00 | +0.19 | +0.07 | +0.00 |
| 159 | Fiddlesticks | +0.62 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 160 | Yuumi | +0.59 | +0.03 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 161 | Vladimir | +0.55 | +0.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 162 | Xerath | +0.40 | −0.20 | +1.00 | +1.00 | +0.12 | −0.21 | +0.00 |
| 163 | Evelynn | +0.35 | +1.00 | +1.00 | −1.00 | +0.10 | – | +0.00 |
| 164 | Caitlyn | +0.33 | +1.00 | +1.00 | −0.97 | +0.20 | −0.04 | +0.00 |
| 165 | LeBlanc | +0.31 | +1.00 | −1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 166 | Qiyana | +0.24 | +1.00 | −1.00 | +1.00 | +0.11 | – | +0.00 |
| 167 | Briar | +0.20 | −0.31 | +0.17 | +1.00 | +0.09 | – | +0.00 |
| 168 | Aurelion Sol | +0.15 | +0.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 169 | Taliyah | −0.11 | +0.90 | −1.00 | −1.00 | +0.14 | +1.00 | +0.00 |
| 170 | Thresh | −0.61 | −0.67 | −0.67 | −1.00 | +0.19 | −1.00 | +0.00 |
| 171 | Renata Glasc | −0.76 | −0.99 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 172 | Katarina | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Pyke's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Pyke's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Pyke` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.76)

- **0.95** spell shield: Shroud of Darkness's spell shield blocks Pyke's Phantom Undertow. Spell shield for 1.5 s, long enough to use ahead of Phantom Undertow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke E Phantom Undertow)
- **0.90** spell shield: Shroud of Darkness's spell shield blocks Pyke's Death from Below. Spell shield for 1.5 s, long enough to use ahead of Death from Below. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke R Death from Below)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Pyke's Bone Skewer. Spell shield for 1.5 s, long enough to use ahead of Bone Skewer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pyke Q Bone Skewer)

#### 2. Sivir (net +1.69)

- **0.90** spell shield: Spell Shield's spell shield blocks Pyke's Death from Below. Spell shield for 1.5 s, long enough to use ahead of Death from Below. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke R Death from Below)
- **0.77** spell shield: Spell Shield's spell shield blocks Pyke's Phantom Undertow. Spell shield for 1.5 s, long enough to use ahead of Phantom Undertow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke E Phantom Undertow)
- **0.47** spell shield: Spell Shield's spell shield blocks Pyke's Bone Skewer. Spell shield for 1.5 s, long enough to use ahead of Bone Skewer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pyke Q Bone Skewer)

#### 3. Fizz (net +1.55)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Pyke's Death from Below. Untargetable for 0.75 s; Death from Below takes 0.5 s to land, enough to react. (Fizz E Playful → Pyke R Death from Below)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Pyke's Bone Skewer. Untargetable for 0.75 s; Bone Skewer takes 0.25 s to land, enough to react. (Fizz E Playful → Pyke Q Bone Skewer)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Pyke's Phantom Undertow. Untargetable for 0.75 s; Phantom Undertow lands within 0.18 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Pyke E Phantom Undertow)

#### 4. Maokai (net +1.54)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Death from Below. Untargetable for 1.4 s; Death from Below takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Pyke R Death from Below)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Bone Skewer. Untargetable for 1.4 s; Bone Skewer takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Pyke Q Bone Skewer)
- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Pyke's Phantom Undertow. Untargetable for 1.4 s; Phantom Undertow lands within 0.18 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Pyke E Phantom Undertow)

#### 5. Zaahen (net +1.51)

- **0.72** death prevention: Cultivation of War allows Zaahen to resurrect after fatal damage from Pyke's Death from Below. Cultivation of War lasts 4 s on a ? cooldown. Only after taking fatal damage. (Zaahen I Cultivation of War → Pyke R Death from Below)
- **0.32** cc immunity: Grim Deliverance makes Zaahen immune to Pyke's Bone Skewer (airborne, slow). Immune for ?; Bone Skewer takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Pyke Q Bone Skewer)
- **0.29** cc immunity: Grim Deliverance makes Zaahen immune to Pyke's Phantom Undertow (stun). Immune for ?; Phantom Undertow lands within 0.18 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Pyke E Phantom Undertow)

#### 6. Kayle (net +1.49)

- **0.83** invulnerable: Divine Judgment makes Kayle invulnerable to Pyke's Death from Below. Invulnerable for 2.5 s, long enough to use ahead of Death from Below. (Kayle R Divine Judgment → Pyke R Death from Below)
- **0.67** death prevention: Pyke's Death from Below can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Pyke R Death from Below)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Pyke's Phantom Undertow (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Phantom Undertow. (Kayle R Divine Judgment → Pyke E Phantom Undertow)

#### 7. Braum (net +1.41)

- **1.00** projectile block: Unbreakable blocks Pyke's Phantom Undertow, a projectile. Unbreakable for 4 s, long enough to use ahead of Phantom Undertow. (Braum E Unbreakable → Pyke E Phantom Undertow)
- **0.35** projectile block: Unbreakable blocks part of Pyke's Bone Skewer, a projectile. Unbreakable for 4 s, long enough to use ahead of Bone Skewer. Only part of the ability is a projectile. Only the charged version of Bone Skewer will be intercepted. The following table refers for interactions while Pyke is locked out from the harpoon being in flight:
  - The lockout ends as soon as the missile fizzles from hitting a target or reaching maximum range, or being intercepted. (Braum E Unbreakable → Pyke Q Bone Skewer)
- **0.15** interrupt: Concussive Blows's stun interrupts Pyke's Bone Skewer (charge-up). Concussive Blows must land during the charge-up. Pyke can release Bone Skewer early instead of charging it fully. (Braum I Concussive Blows → Pyke Q Bone Skewer)

#### 8. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Pyke's Phantom Undertow (stun). Immune for 1.5 s, long enough to use ahead of Phantom Undertow. (Udyr E Blazing Stampede → Pyke E Phantom Undertow)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Pyke's Bone Skewer (airborne, slow). Immune for 1.5 s, long enough to use ahead of Bone Skewer. (Udyr E Blazing Stampede → Pyke Q Bone Skewer)
- **0.18** interrupt: Blazing Stampede's stun interrupts Pyke's Bone Skewer (charge-up). Blazing Stampede must land during the charge-up. Pyke can release Bone Skewer early instead of charging it fully. (Udyr E Blazing Stampede → Pyke Q Bone Skewer)

#### 9. Bard (net +1.38)

- **0.83** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Death from Below. Untargetable for 2.5 s, long enough to use ahead of Death from Below. (Bard R Tempered Fate → Pyke R Death from Below)
- **0.48** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Phantom Undertow. Untargetable for 2.5 s, long enough to use ahead of Phantom Undertow. (Bard R Tempered Fate → Pyke E Phantom Undertow)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Pyke's Bone Skewer. Untargetable for 2.5 s, long enough to use ahead of Bone Skewer. (Bard R Tempered Fate → Pyke Q Bone Skewer)

#### 10. Vladimir (net +1.37)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Death from Below. Untargetable for 2 s, long enough to use ahead of Death from Below. (Vladimir W Sanguine Pool → Pyke R Death from Below)
- **0.81** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Phantom Undertow. Untargetable for 2 s, long enough to use ahead of Phantom Undertow. (Vladimir W Sanguine Pool → Pyke E Phantom Undertow)
- **0.49** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Pyke's Bone Skewer. Untargetable for 2 s, long enough to use ahead of Bone Skewer. (Vladimir W Sanguine Pool → Pyke Q Bone Skewer)
- Watch out: Bone Skewer's airborne interrupts Vladimir's Tides of Blood (charge-up).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.76 | 1.76 | 0.00 |  |
| 2 | Sivir | +1.69 | 1.69 | 0.00 |  |
| 3 | Fizz | +1.55 | 1.55 | 0.00 |  |
| 4 | Maokai | +1.54 | 1.54 | 0.00 |  |
| 5 | Zaahen | +1.51 | 1.51 | 0.00 |  |
| 6 | Kayle | +1.49 | 1.49 | 0.00 |  |
| 7 | Braum | +1.41 | 1.41 | 0.00 | projectile block (Unbreakable) |
| 8 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 9 | Bard | +1.38 | 1.38 | 0.00 |  |
| 10 | Vladimir | +1.37 | 1.54 | 0.17 |  |
| 11 | Fiora | +1.35 | 1.35 | 0.00 |  |
| 12 | Rek'Sai | +1.35 | 1.35 | 0.00 |  |
| 13 | Lissandra | +1.33 | 1.33 | 0.00 |  |
| 14 | Xin Zhao | +1.30 | 1.30 | 0.00 |  |
| 15 | Morgana | +1.29 | 1.29 | 0.00 |  |
| 16 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 17 | Rengar | +1.27 | 1.27 | 0.00 |  |
| 18 | Gwen | +1.25 | 1.25 | 0.00 |  |
| 19 | Yasuo | +1.25 | 1.25 | 0.00 | projectile block (Wind Wall) |
| 20 | Evelynn | +1.21 | 1.21 | 0.00 |  |
| 21 | Shaco | +1.19 | 1.19 | 0.00 |  |
| 22 | Camille | +1.17 | 1.17 | 0.00 |  |
| 23 | Aurora | +1.16 | 1.16 | 0.00 |  |
| 24 | Zilean | +1.12 | 1.12 | 0.00 |  |
| 25 | Singed | +1.07 | 1.07 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 26 | Zed | +0.97 | 0.97 | 0.00 |  |
| 27 | Hwei | +0.95 | 0.95 | 0.00 | dash stop (Grim Visage) |
| 28 | Cassiopeia | +0.93 | 0.93 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Master Yi | +0.92 | 1.36 | 0.44 |  |
| 30 | Gangplank | +0.91 | 0.91 | 0.00 |  |
| 31 | Milio | +0.91 | 0.91 | 0.00 |  |
| 32 | Kled | +0.90 | 0.90 | 0.00 |  |
| 33 | Anivia | +0.87 | 0.87 | 0.00 |  |
| 34 | Kindred | +0.83 | 0.83 | 0.00 |  |
| 35 | Alistar | +0.82 | 0.82 | 0.00 |  |
| 36 | Vex | +0.80 | 0.80 | 0.00 | dash stop (Doom 'n Gloom) |
| 37 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 38 | Yuumi | +0.78 | 1.60 | 0.82 |  |
| 39 | Lulu | +0.76 | 0.76 | 0.00 |  |
| 40 | Samira | +0.72 | 0.72 | 0.00 | projectile block (Blade Whirl) |
| 41 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 42 | Ahri | +0.70 | 0.70 | 0.00 | dash stop (Charm) |
| 43 | Rell | +0.69 | 0.69 | 0.00 |  |
| 44 | Jinx | +0.68 | 0.68 | 0.00 | dash stop (Flame Chompers!) |
| 45 | Mel | +0.67 | 0.67 | 0.00 |  |
| 46 | Tryndamere | +0.67 | 0.67 | 0.00 |  |
| 47 | Veigar | +0.67 | 0.67 | 0.00 | dash stop (Event Horizon) |
| 48 | Garen | +0.65 | 0.65 | 0.00 |  |
| 49 | Olaf | +0.64 | 0.64 | 0.00 |  |
| 50 | Sion | +0.60 | 0.88 | 0.28 |  |
| 51 | Teemo | +0.59 | 0.59 | 0.00 |  |
| 52 | Yone | +0.53 | 0.53 | 0.00 |  |
| 53 | Renata Glasc | +0.52 | 0.52 | 0.00 |  |
| 54 | Malzahar | +0.50 | 1.30 | 0.80 |  |
| 55 | Heimerdinger | +0.50 | 0.50 | 0.00 |  |
| 56 | Gnar | +0.49 | 0.49 | 0.00 |  |
| 57 | Thresh | +0.49 | 0.49 | 0.00 |  |
| 58 | K'Sante | +0.48 | 0.48 | 0.00 |  |
| 59 | Elise | +0.43 | 0.43 | 0.00 |  |
| 60 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 61 | Amumu | +0.41 | 0.41 | 0.00 |  |
| 62 | Blitzcrank | +0.41 | 0.41 | 0.00 |  |
| 63 | Nami | +0.41 | 0.41 | 0.00 |  |
| 64 | Nilah | +0.41 | 0.41 | 0.00 |  |
| 65 | Seraphine | +0.41 | 0.41 | 0.00 |  |
| 66 | Sejuani | +0.40 | 0.40 | 0.00 |  |
| 67 | Jax | +0.39 | 0.39 | 0.00 |  |
| 68 | Pantheon | +0.38 | 1.38 | 1.00 |  |
| 69 | Draven | +0.38 | 0.38 | 0.00 |  |
| 70 | Urgot | +0.37 | 0.37 | 0.00 |  |
| 71 | Poppy | +0.36 | 0.76 | 0.40 | dash stop (Steadfast Presence) |
| 72 | Karma | +0.36 | 0.36 | 0.00 |  |
| 73 | Kai'Sa | +0.35 | 0.35 | 0.00 |  |
| 74 | Sona | +0.35 | 0.35 | 0.00 |  |
| 75 | Zoe | +0.35 | 0.35 | 0.00 |  |
| 76 | Zyra | +0.35 | 0.35 | 0.00 |  |
| 77 | Kayn | +0.34 | 1.24 | 0.90 |  |
| 78 | Cho'Gath | +0.34 | 0.34 | 0.00 |  |
| 79 | Jayce | +0.34 | 0.34 | 0.00 |  |
| 80 | Kennen | +0.34 | 0.34 | 0.00 |  |
| 81 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 82 | Brand | +0.33 | 0.33 | 0.00 |  |
| 83 | Ornn | +0.33 | 0.33 | 0.00 |  |
| 84 | Ashe | +0.32 | 0.32 | 0.00 |  |
| 85 | Mordekaiser | +0.32 | 0.32 | 0.00 |  |
| 86 | Sett | +0.32 | 0.32 | 0.00 |  |
| 87 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 88 | Ziggs | +0.32 | 0.32 | 0.00 |  |
| 89 | Malphite | +0.31 | 0.31 | 0.00 |  |
| 90 | Riven | +0.31 | 0.31 | 0.00 |  |
| 91 | Skarner | +0.31 | 0.31 | 0.00 |  |
| 92 | Zac | +0.30 | 1.25 | 0.95 | dash stop (Stretching Strikes) |
| 93 | Annie | +0.30 | 0.30 | 0.00 |  |
| 94 | Lee Sin | +0.30 | 0.30 | 0.00 |  |
| 95 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 96 | Rakan | +0.30 | 0.30 | 0.00 |  |
| 97 | Soraka | +0.30 | 0.30 | 0.00 |  |
| 98 | Aatrox | +0.29 | 0.29 | 0.00 |  |
| 99 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 100 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 101 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 102 | Swain | +0.28 | 0.28 | 0.00 |  |
| 103 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 104 | Leona | +0.26 | 0.26 | 0.00 |  |
| 105 | Sylas | +0.26 | 0.26 | 0.00 |  |
| 106 | Azir | +0.25 | 0.25 | 0.00 |  |
| 107 | LeBlanc | +0.25 | 0.25 | 0.00 |  |
| 108 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 109 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 110 | Neeko | +0.23 | 0.23 | 0.00 |  |
| 111 | Corki | +0.22 | 0.22 | 0.00 |  |
| 112 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 113 | Senna | +0.22 | 0.22 | 0.00 |  |
| 114 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 115 | Volibear | +0.22 | 0.22 | 0.00 |  |
| 116 | Aurelion Sol | +0.21 | 0.38 | 0.17 |  |
| 117 | Lux | +0.19 | 0.19 | 0.00 |  |
| 118 | Shyvana | +0.19 | 0.19 | 0.00 |  |
| 119 | Bel'Veth | +0.18 | 0.18 | 0.00 |  |
| 120 | Illaoi | +0.18 | 0.18 | 0.00 |  |
| 121 | Kassadin | +0.18 | 0.18 | 0.00 |  |
| 122 | Renekton | +0.18 | 0.18 | 0.00 |  |
| 123 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 124 | Ambessa | +0.15 | 0.15 | 0.00 |  |
| 125 | Briar | +0.15 | 0.15 | 0.00 |  |
| 126 | Graves | +0.15 | 0.15 | 0.00 |  |
| 127 | Irelia | +0.15 | 0.15 | 0.00 |  |
| 128 | Lillia | +0.14 | 0.14 | 0.00 |  |
| 129 | Taric | +0.14 | 0.14 | 0.00 |  |
| 130 | Yorick | +0.14 | 0.14 | 0.00 |  |
| 131 | Trundle | +0.13 | 0.13 | 0.00 |  |
| 132 | Darius | +0.12 | 0.12 | 0.00 |  |
| 133 | Hecarim | +0.12 | 0.12 | 0.00 |  |
| 134 | Jarvan IV | +0.12 | 0.12 | 0.00 |  |
| 135 | Akali | +0.11 | 0.11 | 0.00 |  |
| 136 | Varus | +0.08 | 0.30 | 0.22 |  |
| 137 | Diana | +0.08 | 0.08 | 0.00 |  |
| 138 | Wukong | +0.08 | 0.08 | 0.00 |  |
| 139 | Nautilus | +0.08 | 0.08 | 0.00 |  |
| 140 | Qiyana | +0.08 | 0.08 | 0.00 |  |
| 141 | Rammus | +0.06 | 0.61 | 0.55 |  |
| 142 | Quinn | +0.04 | 0.42 | 0.38 |  |
| 143 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 144 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 145 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 148 | Talon | 0.00 | 0.00 | 0.00 |  |
| 149 | Caitlyn | -0.10 | 0.46 | 0.56 |  |
| 150 | Gragas | -0.10 | 0.22 | 0.32 |  |
| 151 | Twisted Fate | -0.14 | 0.56 | 0.70 |  |
| 152 | Viego | -0.16 | 0.30 | 0.46 |  |
| 153 | Ivern | -0.17 | 0.12 | 0.29 |  |
| 154 | Akshan | -0.24 | 0.32 | 0.56 |  |
| 155 | Vel'Koz | -0.24 | 0.32 | 0.56 |  |
| 156 | Fiddlesticks | -0.26 | 0.65 | 0.91 |  |
| 157 | Xerath | -0.33 | 0.32 | 0.65 |  |
| 158 | Lucian | -0.34 | 0.22 | 0.56 |  |
| 159 | Miss Fortune | -0.34 | 0.22 | 0.56 |  |
| 160 | Janna | -0.35 | 0.45 | 0.80 |  |
| 161 | Jhin | -0.38 | 0.18 | 0.56 |  |
| 162 | Taliyah | -0.40 | 0.56 | 0.96 |  |
| 163 | Vi | -0.44 | 0.35 | 0.79 |  |
| 164 | Karthus | -0.44 | 0.12 | 0.56 |  |
| 165 | Katarina | -0.44 | 0.12 | 0.56 |  |
| 166 | Shen | -0.46 | 0.44 | 0.90 |  |
| 167 | Warwick | -0.54 | 0.78 | 1.32 |  |
| 168 | Ryze | -0.54 | 0.16 | 0.70 |  |
| 169 | Tahm Kench | -0.59 | 0.41 | 1.00 |  |
| 170 | Nunu & Willump | -0.75 | 0.23 | 0.98 |  |
| 171 | Galio | -0.79 | 0.39 | 1.18 |  |
| 172 | Naafiri | -0.79 | 0.11 | 0.90 |  |
