# SlashDot OS

> **The official website of SlashDot** — The Coding & Designing Club of IISER Kolkata.  
> Reimagined as a browser-based operating system.

[![Deploy](https://github.com/berasankhadeep20-lang/25MS-Coding/actions/workflows/deploy.yml/badge.svg)](https://github.com/berasankhadeep20-lang/25MS-Coding/actions)

**🌐 Live:** https://berasankhadeep20-lang.github.io/25MS-Coding/  
**🔗 Club:** https://slashdot-iiserk.github.io/  
**📧 Contact:** slashdot@iiserkol.ac.in

---

## About SlashDot

SlashDot is the official coding and designing club of IISER Kolkata. We build things, run workshops, host hackathons, and celebrate programmers and designers of all skill levels.

This website is our entry to the **Inter-Batch Website Development Competition 2026**, built by the 25MS batch. It's also now the **official SlashDot club website**.

---

## About This Website

SlashDot OS reimagines the club website as a fully functional browser OS. Every section — About, Team, Events, Showcase, Blog — is an app window. Navigate by clicking icons or using the terminal.

**Stack:** React 18 · TypeScript · Vite 5 · xterm.js 5.5 · Framer Motion · Canvas API · GitHub Pages

---

## Office Bearers 2025–26

| Name | Role | Batch | Email |
|------|------|-------|-------|
| Shuvam Banerji Seal | President | 22MS | sbs22ms076@iiserkol.ac.in |
| Anuprovo Debnath | Secretary | 23MS | ad23ms110@iiserkol.ac.in |
| Abhinav Dhingra | Treasurer | 24MS | ad24ms110@iiserkol.ac.in |

## Developers (25MS Batch)

| Name | Role | Email |
|------|------|-------|
| Sankhadeep Bera | Lead Developer | sb25ms227@iiserkol.ac.in |
| S. Bari | Systems Developer | shayan.bari.0001@gmail.com |

---

## Quick Start

```bash
git clone https://github.com/berasankhadeep20-lang/25MS-Coding.git
cd 25MS-Coding
npm install
npm run dev
```

> **Note:** If you see stale UI after pulling, delete `node_modules/.vite` and restart.

---

## Club Pages (Terminal Commands)
open home         → SlashDot homepage with stats
open about        → About the club, membership info
open team         → Office Bearers, developers, alumni
open contact      → Club contact info + how to join
open events       → Past and upcoming events
open showcase     → Member project gallery
open blog         → Articles by SlashDot members
open resources    → 7 categories, 40+ curated learning links
open halloffame   → Competition winners and achievements
open rules        → Club constitution (10 articles)
open newsletter   → Monthly newsletter (4 issues)
open stack        → Tech stack used to build this site

## Games
open asteroids    → Asteroids (arrow keys + space)
open pong         → Pong 2-player (W/S vs ↑/↓)
open flappy       → Flappy { } (space to flap)
open snake        → Snake (arrow keys)

## Science Apps
open periodic     → Interactive periodic table
open fourier      → Fourier transform visualizer
open gravity      → N-body gravity simulator
open dna          → DNA sequence viewer
open physics      → Physics simulator
open molecular    → 3D molecular viewer
open sortvis      → Sorting algorithm visualizer (bubble, quick, merge)
open pathvis      → Pathfinding visualizer (A*, Dijkstra)
open binconv      → Binary/Hex/Decimal/Octal/ASCII converter
open truthtable   → Logic truth table (AND OR NOT XOR NAND NOR)
open statsCalc    → Statistics calculator with histogram
open fibprime     → Fibonacci/prime number visualizer
open logicgate    → Logic gate simulator (10 gates)

## Live Data Apps
open isstrack     → Live ISS position tracker (updates every 5s)
open apod         → NASA Astronomy Picture of the Day
open ipgeo        → IP geolocation lookup
open randuser     → Random user profile generator
open githubstats  → Live GitHub repository stats
open wikipedia    → Wikipedia search

## Social & Fun
open guestbook    → Sign the guestbook
open poll         → Community polls
open jokes        → Joke generator
open slashdotai   → SlashDot AI chatbot
open newsticker   → IISER campus news ticker
open leaderboard  → Terminal user leaderboard
open horoscope    → IISER horoscope
open faketwitter  → Fake IISER Twitter feed
open fakewhatsapp → WhatsApp chat with SlashDot Bot
open confession   → Anonymous confession wall
open compliment   → Compliment generator
open insult       → Friendly roast generator
open screensaver  → Screensaver gallery (starfield, DVD, plasma)
open fortunecook  → IISER fortune cookie
open cgpasim      → CGPA simulator
open excusegen    → Deadline excuse generator

## Dev Tools
open base64       → Base64 encoder/decoder
open markdown     → Markdown previewer
open colorpicker  → Color picker (HEX/RGB/HSL)
open hashgen      → Hash generator (MD5/SHA256)
open paint        → Paint app
open asciiart     → ASCII art generator
open kbtrainer    → Keyboard shortcut trainer
open syslog       → System logs viewer
open clipboard    → Terminal clipboard manager

## Productivity
open calendar     → Calendar
open pomodoro     → Pomodoro timer
open stopwatch    → Stopwatch with laps
open countdown    → Countdown timer with events
open mealgent     → Random IISER meal generator
open studysched   → Weekly study schedule builder
open flashcard    → Flashcard quiz app
open notepad      → Notepad

## Terminal Commands

```bash
help              → All commands with descriptions
ls / cd / cat     → Virtual filesystem
neofetch          → System info + ASCII logo
whoami            → Who are you?
setname <name>    → Set your display name (remembered)
alias name='cmd'  → Create command shortcut (persisted)
challenge         → Today's daily coding challenge
weather           → Live IISER campus weather (Open-Meteo)
visits            → Live visitor counter
members           → SlashDot team & Office Bearers
register          → How to join SlashDot
rain on/off       → Toggle desktop rain
history           → Command history
man <command>     → Manual pages
banner <text>     → Large ASCII banner
```

## Keyboard Shortcuts
Ctrl+K   → Command Palette (search all apps + commands)
Ctrl+C   → Cancel terminal input
Ctrl+L   → Clear terminal
Ctrl+R   → Show recent command history
Tab      → Autocomplete command
↑ / ↓   → Navigate command history

## Pipe Support

```bash
ls | grep txt
help | grep open
members | grep 25MS
```

## Aliases

```bash
alias gs='git status'        # create alias
alias mysite='open home'     # open an app
ll                           # built-in: ls -la
cls                          # built-in: clear
?                            # built-in: help
```

## Easter Eggs (50+)
sudo party        matrix         hack           nyan
vim               cowsay         sl             fortune
quote             clippy         sudo give me marks
sudo make me coffee              iiser wifi
procrastinate     changelog      top            yes
banner            members        panic          sudo rm -rf /
...and many more. Type random things and see what happens.

---

## File Structure
src/
├── components/
│   ├── Boot/          ← Boot sequence
│   ├── Desktop/       ← Desktop, particles, reactions, daily challenge
│   ├── Terminal/      ← xterm.js terminal with superpowers
│   ├── WindowManager/ ← Draggable windows
│   └── Apps/
│       ├── index.tsx         ← Home, About, Team, Contact, Neofetch, Clock
│       ├── Asteroids.tsx     ← Asteroids game
│       ├── Pong.tsx          ← Pong game
│       ├── FlappyBird.tsx    ← Flappy { } game
│       ├── Snake.tsx         ← Snake game
│       ├── PeriodicTable.tsx ← Periodic table
│       ├── FourierViz.tsx    ← Fourier visualizer
│       ├── GravitySim.tsx    ← Gravity simulator
│       ├── DNAViewer.tsx     ← DNA viewer
│       ├── PhysicsSim.tsx    ← Physics simulator
│       ├── MolecularViewer.tsx
│       ├── ScienceApps2.tsx  ← Sort, pathvis, binconv, truth, stats, fib, logic
│       ├── APIApps.tsx       ← ISS, APOD, IP, random user
│       ├── DevTools.tsx      ← Base64, Markdown, ColorPicker, HashGen
│       ├── CreativeApps.tsx  ← Paint, ASCII art
│       ├── LifeApps.tsx      ← Calendar, Pomodoro, Stopwatch, Countdown, Meal, Study
│       ├── ProductivityApps2.tsx ← Flashcard
│       ├── SocialFunApps.tsx ← Twitter, WhatsApp, Confession, etc.
│       ├── FunApps.tsx       ← News, Leaderboard, GitHub, Wikipedia, Horoscope
│       ├── ClubApps.tsx      ← Events, Showcase
│       └── ClubPages.tsx     ← Blog, Resources, Hall of Fame, Rules, Newsletter
├── commands/
│   ├── index.ts        ← parseAndRun with pipe support
│   ├── systemCommands.ts
│   ├── appCommands.ts
│   └── easterEggs.ts   ← 50+ easter eggs
├── data/
│   ├── team.ts
│   ├── techStack.ts
│   └── filesystem.ts
└── utils/

---

## APIs Used (All Free)

| API | Purpose |
|-----|---------|
| Open-Meteo | Live weather at IISER Kolkata |
| wheretheiss.at | ISS real-time position |
| NASA APOD | Astronomy picture of the day |
| ipapi.co | IP geolocation |
| randomuser.me | Random user profiles |
| GitHub API | Repository statistics |
| Wikipedia | Article search |
| CountAPI | Visitor counter |

---

## License

GPL-3.0 · See [LICENSE](./LICENSE)

---

*SlashDot Coding & Design Club · IISER Kolkata · Inter-Batch Competition 2026*