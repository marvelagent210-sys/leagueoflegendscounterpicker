# Counters to Udyr (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Udyr: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Udyr wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Udyr --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | +1.00 | +0.00 |
| 2 | Jayce | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 3 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.00 |
| 4 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 5 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.06 |
| 6 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 7 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 8 | Mordekaiser | +0.81 | +1.00 | +0.99 | +0.97 | +0.15 | +0.97 | +0.00 |
| 9 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 10 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 11 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 12 | Cho'Gath | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 13 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 14 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 15 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.37 |
| 16 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 17 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 18 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 19 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 20 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 21 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 22 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 23 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 24 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 25 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.50 |
| 26 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 27 | Yasuo | +0.77 | +1.00 | +1.00 | +0.90 | +0.08 | – | +0.00 |
| 28 | Shyvana | +0.76 | +1.00 | +1.00 | +1.00 | +0.21 | – | −1.00 |
| 29 | Xin Zhao | +0.74 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.27 |
| 30 | Illaoi | +0.73 | +0.86 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 31 | Aatrox | +0.73 | +1.00 | +1.00 | +1.00 | +0.06 | – | −1.00 |
| 32 | Bel'Veth | +0.73 | +1.00 | +1.00 | +0.85 | −0.10 | – | +0.00 |
| 33 | Camille | +0.72 | +1.00 | +1.00 | +1.00 | −0.01 | – | −1.00 |
| 34 | Lulu | +0.72 | +1.00 | +1.00 | +1.00 | +0.09 | +0.03 | +0.00 |
| 35 | Yone | +0.70 | +1.00 | +1.00 | +1.00 | −0.11 | – | −1.00 |
| 36 | Ambessa | +0.64 | +1.00 | +1.00 | +1.00 | +0.29 | −1.00 | +0.00 |
| 37 | Kalista | +0.58 | +0.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 38 | Karma | +0.57 | +0.23 | +0.93 | +0.96 | +0.07 | +0.72 | +0.00 |
| 39 | Aphelios | +0.56 | +1.00 | +1.00 | +1.00 | +0.09 | −1.00 | −1.00 |
| 40 | Zaahen | +0.45 | +0.01 | +1.00 | +1.00 | −0.01 | – | −1.00 |
| 41 | Annie | +0.43 | +1.00 | +1.00 | −1.00 | +0.17 | +1.00 | +0.00 |
| 42 | Xayah | +0.38 | +1.00 | +1.00 | −1.00 | +0.22 | +1.00 | −1.00 |
| 43 | Rammus | +0.38 | +1.00 | +1.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 44 | Corki | +0.35 | −1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.00 |
| 45 | Malphite | +0.32 | −1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 46 | Gangplank | +0.30 | +1.00 | +1.00 | −1.00 | +0.11 | – | −1.00 |
| 47 | Vi | +0.29 | +1.00 | +1.00 | −1.00 | +0.07 | – | −1.00 |
| 48 | Vel'Koz | +0.26 | −0.03 | −0.05 | +0.69 | +0.25 | +1.00 | +0.00 |
| 49 | Braum | +0.23 | +0.82 | −0.53 | +0.96 | −0.01 | −0.36 | +0.00 |
| 50 | Brand | +0.21 | +0.86 | +0.49 | −1.00 | +0.10 | +0.60 | +0.00 |
| 51 | Twisted Fate | +0.21 | +1.00 | +1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 52 | Morgana | +0.21 | +0.92 | +0.34 | −1.00 | +0.06 | +0.84 | +0.00 |
| 53 | Zeri | +0.08 | −1.00 | +1.00 | +1.00 | +0.18 | −1.00 | −1.00 |
| 54 | Heimerdinger | +0.03 | −1.00 | +0.67 | +0.94 | +0.18 | −1.00 | +0.00 |
| 55 | Lee Sin | +0.01 | −1.00 | +1.00 | +0.00 | +0.04 | – | +0.00 |
| 56 | Sion | +0.00 | +0.00 | +0.00 | +0.00 | +0.01 | – | +0.00 |
| 57 | Kayle | −0.02 | +1.00 | −1.00 | −1.00 | +0.58 | +1.00 | −0.08 |
| 58 | Nocturne | −0.06 | −1.00 | +0.00 | +1.00 | −0.03 | – | +0.00 |
| 59 | Varus | −0.17 | +1.00 | −1.00 | −1.00 | +0.04 | +0.25 | +0.00 |
| 60 | Anivia | −0.23 | +0.02 | −1.00 | −0.00 | −0.22 | +0.49 | +0.00 |
| 61 | Kled | −0.24 | +1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 62 | Irelia | −0.25 | −0.84 | −0.87 | +1.00 | +0.12 | +0.06 | −0.94 |
| 63 | Ezreal | −0.26 | +0.77 | −1.00 | −1.00 | +0.04 | −0.07 | +0.00 |
| 64 | Yunara | −0.27 | +0.43 | −1.00 | −1.00 | +0.16 | +1.00 | −1.00 |
| 65 | Zilean | −0.28 | −1.00 | +1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 66 | Neeko | −0.28 | +1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 67 | Rumble | −0.34 | −1.00 | −1.00 | +0.93 | +0.07 | – | +0.00 |
| 68 | Orianna | −0.38 | −1.00 | −1.00 | +1.00 | +0.13 | −1.00 | +0.00 |
| 69 | Elise | −0.38 | −1.00 | −1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 70 | Viego | −0.39 | +0.65 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 71 | Milio | −0.42 | +0.37 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 72 | Bard | −0.44 | +0.36 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 73 | Lux | −0.50 | −0.10 | −1.00 | −1.00 | +0.08 | −0.41 | +0.00 |
| 74 | Nilah | −0.57 | −1.00 | −1.00 | +0.00 | +0.21 | −1.00 | +0.00 |
| 75 | Smolder | −0.61 | −1.00 | −1.00 | −1.00 | +0.28 | +1.00 | −1.00 |
| 76 | Jinx | −0.62 | −0.51 | −1.00 | −0.83 | +0.18 | −1.00 | +0.00 |
| 77 | Tahm Kench | −0.63 | −0.40 | −0.91 | −0.98 | −0.06 | −0.95 | +0.00 |
| 78 | Volibear | −0.64 | −0.79 | −0.76 | −0.79 | +0.11 | – | −1.00 |
| 79 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.00 |
| 80 | Kennen | −0.73 | −1.00 | −0.93 | −0.92 | +0.22 | −0.94 | +0.00 |
| 81 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.34 | −1.00 | +0.00 |
| 82 | Akali | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 83 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | – | −0.50 |
| 84 | Diana | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 85 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 86 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 87 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 88 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 89 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 90 | Maokai | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 91 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 92 | Kayn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 93 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 94 | Rell | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 95 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 96 | Gwen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 97 | Jhin | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 98 | Singed | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 99 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 100 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 101 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 102 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 103 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 104 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 105 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 106 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 107 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 108 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 109 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 110 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 111 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 112 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 113 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 114 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 115 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 116 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 117 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.16 |
| 118 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 119 | Ornn | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 120 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 121 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 122 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 123 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 124 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 125 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 126 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 127 | Shen | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 128 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 129 | Thresh | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 130 | Hwei | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 131 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 132 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 133 | Zac | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 134 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 135 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 136 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 137 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 138 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 139 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 140 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 141 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 142 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 143 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 144 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 145 | Master Yi | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 146 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 147 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 148 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 149 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 150 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 151 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | – | −1.00 |
| 153 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | +0.12 | – | −1.00 |
| 154 | Lillia | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.24 |
| 155 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 156 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 157 | Swain | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.62 |
| 158 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | – | −1.00 |
| 159 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 160 | Lucian | −0.83 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −1.00 |
| 161 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 162 | Fizz | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 163 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −1.00 |
| 164 | Quinn | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 165 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 166 | Evelynn | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 167 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −1.00 |
| 168 | Sivir | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −1.00 |
| 169 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 170 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.09 | – | −1.00 |
| 171 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −1.00 |
| 172 | Samira | −0.88 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Udyr's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Udyr's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Udyr` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.07)

- **0.60** spell shield: Spell Shield's spell shield blocks Udyr's Blazing Stampede. Spell shield for 1.5 s, long enough to use ahead of Blazing Stampede. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Udyr E Blazing Stampede)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Sivir basic attacks → Udyr basic attacks)

#### 2. Vladimir (net +0.79)

- **0.63** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Udyr's Blazing Stampede. Untargetable for 2 s, long enough to use ahead of Blazing Stampede. (Vladimir W Sanguine Pool → Udyr E Blazing Stampede)
- **0.34** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Udyr's Wingborne Storm. Untargetable for 2 s, long enough to use ahead of Wingborne Storm. (Vladimir W Sanguine Pool → Udyr R Wingborne Storm)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Udyr's (450 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Vladimir basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Vladimir's Sanguine Pool (slow).

#### 3. Yuumi (net +0.64)

- **0.60** untargetable: You and Me! makes Yuumi untargetable, dodging Udyr's Blazing Stampede. Untargetable for ?; Blazing Stampede lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Udyr E Blazing Stampede)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Udyr's Wingborne Storm. Untargetable for ?; Wingborne Storm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Udyr R Wingborne Storm)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Udyr's (425 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Yuumi basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede's stun interrupts Yuumi's Final Chapter (normal channel).

#### 4. Teemo (net +0.54)

- **0.54** blind: Blinding Dart's blind makes Udyr's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Udyr basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Teemo basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Teemo's Blinding Dart (blind).

#### 5. Kai'Sa (net +0.38)

- **0.38** range: Kai'Sa's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kai'Sa basic attacks → Udyr basic attacks)

#### 6. Gangplank (net +0.37)

- **0.53** cleanse: Remove Scurvy cleanses Udyr's Blazing Stampede (stun) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Udyr E Blazing Stampede)
- **0.07** cleanse: Remove Scurvy cleanses Udyr's Wingborne Storm (slow) after it lands. 14 s cooldown; usable while crowd controlled. (Gangplank W Remove Scurvy → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Gangplank's Cannon Barrage (slow).

#### 7. Kayle (net +0.37)

- **0.36** range: Kayle's basic attacks reach 500 units farther than Udyr's (625 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kayle basic attacks → Udyr basic attacks)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Udyr's Wingborne Storm (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Wingborne Storm. (Kayle R Divine Judgment → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Kayle's Radiant Blast (slow).

#### 8. Olaf (net +0.37)

- **0.45** cc immunity: Ragnarok makes Olaf immune to Udyr's Blazing Stampede (stun). Immune for 3 s, long enough to use ahead of Blazing Stampede. (Olaf R Ragnarok → Udyr E Blazing Stampede)
- **0.06** cc immunity: Ragnarok makes Olaf immune to Udyr's Wingborne Storm (slow). Immune for 3 s, long enough to use ahead of Wingborne Storm. (Olaf R Ragnarok → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Olaf's Undertow (slow).

#### 9. Aurora (net +0.36)

- **0.29** range: Aurora's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Aurora basic attacks → Udyr basic attacks)
- **0.26** untargetable: Between Worlds makes Aurora untargetable, dodging Udyr's Blazing Stampede. Untargetable for 0.4 s; Blazing Stampede lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Udyr E Blazing Stampede)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Udyr's Wingborne Storm. Untargetable for 0.4 s; Wingborne Storm lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Udyr R Wingborne Storm)
- Watch out: Blazing Stampede makes Udyr immune to Aurora's Between Worlds (slow).

#### 10. Kindred (net +0.36)

- **0.47** range: Kindred's basic attacks reach 375 units farther than Udyr's (500 vs 125 attack range). Udyr closes the gap with Blazing Stampede. (Kindred basic attacks → Udyr basic attacks)
- Watch out: Blazing Stampede makes Udyr immune to Kindred's Mounting Dread (slow).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.07 | 1.07 | 0.00 |  |
| 2 | Vladimir | +0.79 | 0.98 | 0.19 |  |
| 3 | Yuumi | +0.64 | 1.09 | 0.45 |  |
| 4 | Teemo | +0.54 | 0.88 | 0.34 | blind (Blinding Dart) |
| 5 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 6 | Gangplank | +0.37 | 0.57 | 0.20 |  |
| 7 | Kayle | +0.37 | 0.48 | 0.11 |  |
| 8 | Olaf | +0.37 | 0.48 | 0.11 |  |
| 9 | Aurora | +0.36 | 0.62 | 0.26 |  |
| 10 | Kindred | +0.36 | 0.47 | 0.11 |  |
| 11 | Zeri | +0.33 | 0.44 | 0.11 |  |
| 12 | Master Yi | +0.32 | 0.55 | 0.23 |  |
| 13 | Gwen | +0.32 | 0.46 | 0.14 |  |
| 14 | Twitch | +0.32 | 0.43 | 0.11 |  |
| 15 | Corki | +0.32 | 0.32 | 0.00 |  |
| 16 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 17 | Nasus | +0.31 | 0.42 | 0.11 | attack speed slow (Wither) |
| 18 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 19 | Xayah | +0.24 | 0.94 | 0.70 |  |
| 20 | Zed | +0.23 | 0.33 | 0.10 |  |
| 21 | Yunara | +0.19 | 0.36 | 0.17 |  |
| 22 | Milio | +0.17 | 0.87 | 0.70 |  |
| 23 | Rek'Sai | +0.17 | 0.57 | 0.40 |  |
| 24 | Kog'Maw | +0.16 | 0.27 | 0.11 |  |
| 25 | Graves | +0.13 | 0.24 | 0.11 |  |
| 26 | Smolder | +0.12 | 0.32 | 0.20 |  |
| 27 | Fiora | +0.10 | 0.61 | 0.51 |  |
| 28 | Garen | +0.10 | 0.37 | 0.27 |  |
| 29 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 30 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 31 | Jax | +0.05 | 0.75 | 0.70 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 32 | Samira | 0.00 | 0.45 | 0.45 |  |
| 33 | Miss Fortune | -0.02 | 0.32 | 0.34 |  |
| 34 | Rengar | -0.05 | 0.65 | 0.70 |  |
| 35 | Nilah | -0.07 | 0.73 | 0.80 |  |
| 36 | Akali | -0.08 | 0.00 | 0.08 |  |
| 37 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 38 | Morgana | -0.11 | 0.87 | 0.98 |  |
| 39 | Dr. Mundo | -0.11 | 0.00 | 0.11 |  |
| 40 | Illaoi | -0.11 | 0.00 | 0.11 |  |
| 41 | Talon | -0.11 | 0.00 | 0.11 |  |
| 42 | Tryndamere | -0.11 | 0.00 | 0.11 |  |
| 43 | Bard | -0.12 | 0.93 | 1.05 |  |
| 44 | Nocturne | -0.12 | 0.70 | 0.82 |  |
| 45 | Karthus | -0.15 | 0.19 | 0.34 |  |
| 46 | Kha'Zix | -0.15 | 0.00 | 0.15 |  |
| 47 | Locke | -0.20 | 0.00 | 0.20 |  |
| 48 | Rumble | -0.20 | 0.00 | 0.20 |  |
| 49 | Lulu | -0.21 | 0.75 | 0.96 |  |
| 50 | LeBlanc | -0.23 | 0.22 | 0.45 |  |
| 51 | Fizz | -0.25 | 0.65 | 0.90 |  |
| 52 | Kennen | -0.26 | 0.29 | 0.55 |  |
| 53 | Vayne | -0.27 | 0.43 | 0.70 |  |
| 54 | Mel | -0.28 | 0.42 | 0.70 |  |
| 55 | Kalista | -0.31 | 0.69 | 1.00 |  |
| 56 | Malzahar | -0.32 | 0.75 | 1.07 |  |
| 57 | Singed | -0.32 | 0.52 | 0.84 |  |
| 58 | Annie | -0.33 | 0.22 | 0.55 |  |
| 59 | Kassadin | -0.33 | 0.00 | 0.33 |  |
| 60 | Draven | -0.34 | 0.36 | 0.70 |  |
| 61 | Vex | -0.34 | 0.27 | 0.61 |  |
| 62 | Evelynn | -0.35 | 0.35 | 0.70 |  |
| 63 | Elise | -0.38 | 0.32 | 0.70 |  |
| 64 | Zoe | -0.38 | 0.32 | 0.70 |  |
| 65 | Lissandra | -0.39 | 0.79 | 1.18 |  |
| 66 | Sona | -0.39 | 0.41 | 0.80 |  |
| 67 | Shaco | -0.41 | 0.35 | 0.76 |  |
| 68 | Varus | -0.43 | 0.45 | 0.88 |  |
| 69 | Senna | -0.44 | 0.32 | 0.76 |  |
| 70 | Zilean | -0.44 | 0.32 | 0.76 |  |
| 71 | Twisted Fate | -0.45 | 0.43 | 0.88 |  |
| 72 | Veigar | -0.46 | 0.24 | 0.70 |  |
| 73 | Jayce | -0.47 | 0.30 | 0.77 |  |
| 74 | Jinx | -0.47 | 0.29 | 0.76 |  |
| 75 | Lux | -0.47 | 0.29 | 0.76 |  |
| 76 | Cassiopeia | -0.48 | 0.46 | 0.94 |  |
| 77 | Ashe | -0.48 | 0.36 | 0.84 |  |
| 78 | Ahri | -0.48 | 0.22 | 0.70 |  |
| 79 | Soraka | -0.49 | 0.27 | 0.76 |  |
| 80 | Ekko | -0.51 | 0.00 | 0.51 |  |
| 81 | Caitlyn | -0.52 | 0.36 | 0.88 |  |
| 82 | Tristana | -0.52 | 0.36 | 0.88 |  |
| 83 | Shen | -0.53 | 0.72 | 1.25 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 84 | Syndra | -0.54 | 0.22 | 0.76 |  |
| 85 | Viktor | -0.55 | 0.32 | 0.87 |  |
| 86 | Brand | -0.55 | 0.22 | 0.77 |  |
| 87 | Naafiri | -0.57 | 0.00 | 0.57 |  |
| 88 | Kayn | -0.58 | 0.35 | 0.93 |  |
| 89 | Azir | -0.59 | 0.27 | 0.86 |  |
| 90 | Orianna | -0.59 | 0.27 | 0.86 |  |
| 91 | Swain | -0.59 | 0.21 | 0.80 |  |
| 92 | Quinn | -0.61 | 0.38 | 0.99 |  |
| 93 | Xerath | -0.61 | 0.27 | 0.88 |  |
| 94 | Jhin | -0.62 | 0.27 | 0.89 |  |
| 95 | Vel'Koz | -0.62 | 0.27 | 0.89 |  |
| 96 | Ziggs | -0.64 | 0.27 | 0.91 |  |
| 97 | Ryze | -0.64 | 0.24 | 0.88 |  |
| 98 | Mordekaiser | -0.67 | 0.10 | 0.77 |  |
| 99 | Renekton | -0.70 | 0.00 | 0.70 |  |
| 100 | Taric | -0.70 | 0.00 | 0.70 |  |
| 101 | Sion | -0.72 | 0.49 | 1.21 |  |
| 102 | Braum | -0.72 | 0.38 | 1.10 |  |
| 103 | Irelia | -0.72 | 0.05 | 0.77 |  |
| 104 | Aphelios | -0.73 | 0.44 | 1.17 |  |
| 105 | Karma | -0.74 | 0.22 | 0.96 |  |
| 106 | Lillia | -0.75 | 0.11 | 0.86 |  |
| 107 | Darius | -0.75 | 0.00 | 0.75 |  |
| 108 | Trundle | -0.75 | 0.00 | 0.75 |  |
| 109 | Zaahen | -0.76 | 0.29 | 1.05 |  |
| 110 | Ivern | -0.76 | 0.19 | 0.95 |  |
| 111 | Bel'Veth | -0.76 | 0.00 | 0.76 |  |
| 112 | Yorick | -0.76 | 0.00 | 0.76 |  |
| 113 | Fiddlesticks | -0.77 | 0.20 | 0.97 |  |
| 114 | Heimerdinger | -0.79 | 0.26 | 1.05 |  |
| 115 | Renata Glasc | -0.80 | 0.38 | 1.18 |  |
| 116 | Diana | -0.80 | 0.00 | 0.80 |  |
| 117 | Wukong | -0.80 | 0.00 | 0.80 |  |
| 118 | Malphite | -0.81 | 0.27 | 1.08 |  |
| 119 | Anivia | -0.83 | 0.24 | 1.07 |  |
| 120 | Seraphine | -0.86 | 0.29 | 1.15 |  |
| 121 | Cho'Gath | -0.86 | 0.00 | 0.86 |  |
| 122 | Lee Sin | -0.86 | 0.00 | 0.86 |  |
| 123 | Gnar | -0.89 | 0.33 | 1.22 |  |
| 124 | Janna | -0.90 | 0.36 | 1.26 |  |
| 125 | Zyra | -0.91 | 0.24 | 1.15 |  |
| 126 | Nami | -0.93 | 0.22 | 1.15 |  |
| 127 | Neeko | -0.93 | 0.22 | 1.15 |  |
| 128 | Pantheon | -0.93 | 0.17 | 1.10 |  |
| 129 | Aatrox | -0.93 | 0.00 | 0.93 |  |
| 130 | Kled | -0.94 | 0.41 | 1.35 |  |
| 131 | Alistar | -0.94 | 0.39 | 1.33 |  |
| 132 | Hwei | -0.96 | 0.23 | 1.19 |  |
| 133 | Maokai | -0.98 | 0.59 | 1.57 |  |
| 134 | Skarner | -1.00 | 0.07 | 1.07 |  |
| 135 | Aurelion Sol | -1.02 | 0.22 | 1.24 |  |
| 136 | Nunu & Willump | -1.03 | 0.15 | 1.18 |  |
| 137 | Yasuo | -1.04 | 0.28 | 1.32 |  |
| 138 | Thresh | -1.04 | 0.19 | 1.23 |  |
| 139 | Rammus | -1.06 | 0.41 | 1.47 | attack reflect (Defensive Ball Curl) |
| 140 | Xin Zhao | -1.06 | 0.12 | 1.18 |  |
| 141 | Ambessa | -1.06 | 0.00 | 1.06 |  |
| 142 | Shyvana | -1.06 | 0.00 | 1.06 |  |
| 143 | Sylas | -1.06 | 0.00 | 1.06 |  |
| 144 | Blitzcrank | -1.10 | 0.00 | 1.10 |  |
| 145 | Urgot | -1.13 | 0.15 | 1.28 |  |
| 146 | Volibear | -1.14 | 0.00 | 1.14 |  |
| 147 | Qiyana | -1.15 | 0.00 | 1.15 |  |
| 148 | Camille | -1.19 | 0.34 | 1.53 |  |
| 149 | Warwick | -1.24 | 0.29 | 1.53 |  |
| 150 | Poppy | -1.26 | 0.00 | 1.26 |  |
| 151 | Taliyah | -1.27 | 0.27 | 1.54 |  |
| 152 | Rakan | -1.27 | 0.13 | 1.40 |  |
| 153 | Nautilus | -1.35 | 0.00 | 1.35 |  |
| 154 | Riven | -1.35 | 0.00 | 1.35 |  |
| 155 | Sett | -1.35 | 0.00 | 1.35 |  |
| 156 | Amumu | -1.40 | 0.00 | 1.40 |  |
| 157 | Hecarim | -1.40 | 0.00 | 1.40 |  |
| 158 | Pyke | -1.40 | 0.00 | 1.40 |  |
| 159 | Yone | -1.40 | 0.00 | 1.40 |  |
| 160 | Tahm Kench | -1.42 | 0.00 | 1.42 |  |
| 161 | Jarvan IV | -1.43 | 0.00 | 1.43 |  |
| 162 | Gragas | -1.46 | 0.00 | 1.46 |  |
| 163 | Viego | -1.47 | 0.09 | 1.56 |  |
| 164 | Briar | -1.51 | 0.00 | 1.51 |  |
| 165 | Sejuani | -1.52 | 0.00 | 1.52 |  |
| 166 | Leona | -1.56 | 0.00 | 1.56 |  |
| 167 | Ornn | -1.58 | 0.00 | 1.58 |  |
| 168 | Vi | -1.63 | 0.00 | 1.63 |  |
| 169 | Zac | -1.64 | 0.00 | 1.64 |  |
| 170 | K'Sante | -1.65 | 0.00 | 1.65 |  |
| 171 | Galio | -1.75 | 0.00 | 1.75 |  |
| 172 | Rell | -1.83 | 0.00 | 1.83 |  |
