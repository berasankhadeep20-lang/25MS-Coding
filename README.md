# SlashDot OS

> **The official website of SlashDot** — The Coding & Designing Club of IISER Kolkata.
> Built as a browser-based operating system by the 25MS batch.

[![Deploy](https://github.com/berasankhadeep20-lang/25MS-Coding/actions/workflows/deploy.yml/badge.svg)](https://github.com/berasankhadeep20-lang/25MS-Coding/actions)

**Live Site:** https://berasankhadeep20-lang.github.io/25MS-Coding/
**Club Website:** https://slashdot-iiserk.github.io/
**Contact:** slashdot@iiserkol.ac.in

---

## About SlashDot

SlashDot is the official coding and designing club of IISER Kolkata. We build things, run workshops,
host hackathons, and celebrate programmers and designers of all skill levels.

> "Simplicity is the soul of efficiency."

---

## About This Website

SlashDot OS reimagines the club website as a fully functional browser-based operating system.
Every section of the website is an app window you can drag, resize, and minimize.
Navigate using the terminal or click the desktop icons.

This is the 25MS batch entry to the **Inter-Batch Website Development Competition 2026**.
It is now also the **official SlashDot Club website**.

---

## Office Bearers 2025-26

| Name               | Role      | Batch | Email                        |
|--------------------|-----------|-------|------------------------------|
| Shuvam Banerji Seal | President | 22MS  | sbs22ms076@iiserkol.ac.in    |
| Anuprovo Debnath   | Secretary | 23MS  | ad23ms110@iiserkol.ac.in     |
| Abhinav Dhingra    | Treasurer | 24MS  | ad24ms110@iiserkol.ac.in     |

## Website Developers (25MS Batch)

| Name             | Role             | Email                         |
|------------------|------------------|-------------------------------|
| Sankhadeep Bera  | Lead Developer   | sb25ms227@iiserkol.ac.in      |
| S. Bari          | Systems Developer | shayan.bari.0001@gmail.com   |

---

## Quick Start

```bash
git clone https://github.com/berasankhadeep20-lang/25MS-Coding.git
cd 25MS-Coding
npm install
npm run dev
```

**Note:** If you see stale UI after pulling, delete `node_modules/.vite` and restart dev server.

**Note:** All image paths use `./` relative paths for GitHub Pages compatibility.

---

## Tech Stack

| Tool              | Version | Purpose                              |
|-------------------|---------|--------------------------------------|
| React             | 18      | UI framework                         |
| TypeScript        | 5       | Type safety                          |
| Vite              | 5       | Build tool and dev server            |
| xterm.js          | 5.5     | Terminal emulator                    |
| Framer Motion     | 11      | Window animations                    |
| Canvas API        | -       | Games and science visualizers        |
| Web Audio API     | -       | Sound effects                        |
| Open-Meteo API    | -       | Live weather data (free, no key)     |
| GitHub Actions    | -       | CI/CD pipeline                       |
| GitHub Pages      | -       | Hosting                              |

---

## Club Pages

These are the main sections of the website, accessible via terminal or desktop icons.

```
open home          Club homepage with stats and quick links
open about         About SlashDot, what we do, membership info
open team          Office Bearers, developers, and alumni
open contact       Contact information and how to join
open events        Past and upcoming events (workshops, hackathons)
open showcase      Member project gallery
open blog          Articles written by SlashDot members
open resources     Curated learning resources (7 categories, 40+ links)
open halloffame    Competition winners and notable achievements
open rules         Club constitution (10 articles)
open newsletter    Monthly newsletter (4 issues)
open stack         Tech stack used to build this site
```

---

## All Apps

### Games

```
open asteroids     Asteroids — arrow keys to move, space to shoot
open pong          Pong 2-player — W/S for left, up/down for right
open flappy        Flappy { } — space bar to flap
open snake         Snake — arrow keys or WASD
```

### Science and Mathematics

```
open periodic      Interactive periodic table with element details
open fourier       Fourier transform visualizer
open gravity       N-body gravity simulator
open dna           DNA sequence viewer and analyzer
open physics       Physics simulator with multiple scenarios
open molecular     3D molecular structure viewer
open sortvis       Sorting algorithm visualizer (bubble, quick, merge)
open pathvis       Pathfinding visualizer (A-star and Dijkstra)
open binconv       Binary, Hex, Decimal, Octal, ASCII converter
open truthtable    Logic truth table generator (AND OR NOT XOR NAND NOR)
open statsCalc     Statistics calculator with histogram
open fibprime      Fibonacci and prime number visualizer
open logicgate     Logic gate simulator with 10 gate types
```

### Live Data (Real APIs)

```
open isstrack      Live ISS position tracker — updates every 5 seconds
open apod          NASA Astronomy Picture of the Day
open ipgeo         IP geolocation lookup
open randuser      Random user profile generator
open githubstats   Live GitHub repository statistics
open wikipedia     Wikipedia article search
```

### Social and Community

```
open guestbook     Sign the guestbook
open poll          Community polls
open jokes         Joke generator
open slashdotai    SlashDot AI chatbot
open newsticker    IISER campus news ticker
open leaderboard   Terminal user leaderboard
open horoscope     IISER horoscope (satirical)
open faketwitter   Fake IISER Twitter feed
open fakewhatsapp  WhatsApp chat with SlashDot Bot
open confession    Anonymous confession wall (session only)
open compliment    Compliment generator
open insult        Friendly roast generator
open screensaver   Screensaver gallery (starfield, DVD logo, plasma)
open fortunecook   IISER fortune cookie
open cgpasim       CGPA simulator
open excusegen     Deadline excuse generator
```

### Developer Tools

```
open base64        Base64 encoder and decoder
open markdown      Markdown previewer with live rendering
open colorpicker   Color picker with HEX, RGB, and HSL values
open hashgen       Hash generator (MD5, SHA256, SHA512)
open paint         Canvas paint application
open asciiart      ASCII art generator
open kbtrainer     Keyboard shortcut trainer with quiz mode
open syslog        System logs viewer (boot, errors, activity)
open clipboard     Terminal command clipboard manager
```

### Productivity

```
open calendar      Calendar with event management
open pomodoro      Pomodoro timer with work and break cycles
open stopwatch     Stopwatch with lap tracking
open countdown     Countdown timer with saved events
open mealgent      Random IISER meal plan generator
open studysched    Weekly study schedule builder
open flashcard     Flashcard quiz app with custom cards
open notepad       Notepad with multiple tabs
```

### OS Tools

```
open fileexplorer  Virtual filesystem explorer
open settings      System settings (theme, cursor, font, CRT)
open taskmanager   Running processes and system stats
open clock         Live analog and digital clock
```

---

## Terminal Commands

### Navigation

```bash
ls [path]          List directory contents
cd <path>          Change directory
pwd                Print working directory
cat <file>         Read a file
tree               Show directory tree
```

### System

```bash
neofetch           System info with ASCII art
whoami             Who are you?
setname <name>     Set your display name (remembered across visits)
date               Current date and time
uptime             System uptime
stats              Quick system stats
cal                Calendar for current month
```

### Club

```bash
members            SlashDot team and Office Bearers
register           How to join SlashDot
weather            Live weather at IISER Kolkata campus
visits             Live visitor counter
```

### Terminal Superpowers

```bash
alias name='cmd'   Create a command shortcut
alias              Show all current aliases
challenge          Today's daily coding challenge (changes every day)
history            Show command history
man <command>      Manual page for a command
```

### Aliases (Built-in)

```bash
ll                 Short for: ls -la
cls                Short for: clear
?                  Short for: help
gs                 Short for: git status
gl                 Short for: git log
```

### Pipe Support

```bash
ls | grep txt      Filter ls output for lines containing "txt"
help | grep open   Search help output
members | grep 25  Filter members list
```

### Customization

```bash
theme green        Switch terminal to green theme (default)
theme amber        Switch terminal to amber theme
theme blue         Switch terminal to blue theme
theme red          Switch terminal to red theme
theme purple       Switch terminal to purple theme
rain on            Enable desktop rain
rain off           Disable desktop rain
cursor block       Block cursor style
cursor bar         Bar cursor style
cursor underline   Underline cursor style
font+              Increase terminal font size
font-              Decrease terminal font size
crt                Toggle CRT scanline effect
```

### Utility

```bash
echo <text>        Print text to terminal
banner <text>      Print large ASCII banner
ping <host>        Fake ping command
clear              Clear the terminal screen
reset              Reset terminal session
```

---

## Keyboard Shortcuts

```
Ctrl+K             Open Command Palette (search all apps and commands)
Ctrl+C             Cancel current terminal input
Ctrl+L             Clear terminal screen
Ctrl+R             Show recent command history
Tab                Autocomplete command name
Up / Down arrows   Navigate command history
```

---

## Easter Eggs (50+)

There are over 50 hidden easter eggs. Some to get you started:

```
sudo party         Launch confetti cannon
matrix             Enter the Matrix
hack               Look like a movie hacker
nyan               Nyan cat in the terminal
vim                The authentic Vim experience
cowsay <text>      A cow says something
sl                 You probably meant ls
fortune            Random programming quote
quote              Another quote
clippy             Summon Clippy the assistant
sudo give me marks Academic desperation
iiser wifi         The definitive WiFi explanation
procrastinate      For when you need permission
changelog          Read the changelog
panic              Kernel panic (recoverable)
sudo rm -rf /      Classic mistake
```

Type random commands to discover the rest.

---

## Live Reactions

When any app is opened, a floating emoji reaction appears briefly on the desktop,
giving visitors a sense of what others are exploring.

## Daily Challenge

Every day a new coding challenge appears in the terminal when SlashDot OS boots.
Type `challenge` at any time to see today's problem.

---

## APIs Used

All APIs used are free and require no authentication keys.

| API                  | Used For                        |
|----------------------|---------------------------------|
| Open-Meteo           | Live weather at IISER Kolkata   |
| wheretheiss.at       | Real-time ISS position          |
| NASA APOD            | Astronomy picture of the day    |
| ipapi.co             | IP address geolocation          |
| randomuser.me        | Random user profile generation  |
| GitHub API           | Repository statistics           |
| Wikipedia API        | Article search and summaries    |
| CountAPI             | Visitor counter                 |

---

## Project Structure

```
src/
├── components/
│   ├── Boot/
│   │   └── BootScreen.tsx          Boot animation and loading sequence
│   ├── Desktop/
│   │   ├── Desktop.tsx             Main desktop with icon grid
│   │   ├── Desktop.css
│   │   ├── Particles.tsx           Background particle animation
│   │   ├── DesktopRain.tsx         Rain effect (weather-triggered)
│   │   ├── EasterEggs.tsx          Confetti and Matrix rain effects
│   │   ├── NotificationSystem.tsx  Toast notifications
│   │   ├── CommandPalette.tsx      Ctrl+K command palette
│   │   ├── Clippy.tsx              Clippy assistant
│   │   ├── LiveReactions.tsx       Floating emoji reactions
│   │   └── DailyChallenge.tsx      Daily coding challenge data
│   ├── Terminal/
│   │   ├── TerminalWindow.tsx      xterm.js terminal with superpowers
│   │   └── TerminalWindow.css
│   ├── WindowManager/
│   │   └── AppWindow.tsx           Draggable, resizable window manager
│   └── Apps/
│       ├── index.tsx               Home, About, Team, Contact, Neofetch, Clock
│       ├── Asteroids.tsx
│       ├── Pong.tsx
│       ├── FlappyBird.tsx
│       ├── Snake.tsx
│       ├── PeriodicTable.tsx
│       ├── FourierViz.tsx
│       ├── GravitySim.tsx
│       ├── DNAViewer.tsx
│       ├── PhysicsSim.tsx
│       ├── MolecularViewer.tsx
│       ├── ScienceApps2.tsx        Sort, Path, BinConv, TruthTable, Stats, Fib, Logic
│       ├── APIApps.tsx             ISS, APOD, IP, RandomUser
│       ├── DevTools.tsx            Base64, Markdown, ColorPicker, HashGen
│       ├── CreativeApps.tsx        Paint, ASCIIArt
│       ├── LifeApps.tsx            Calendar, Pomodoro, Stopwatch, Countdown, Meal, Study
│       ├── ProductivityApps2.tsx   Flashcard
│       ├── SocialFunApps.tsx       Twitter, WhatsApp, Confession, Compliment, etc.
│       ├── FunApps.tsx             News, Leaderboard, GitHub, Wikipedia, Horoscope
│       ├── ClubApps.tsx            Events, Showcase
│       └── ClubPages.tsx           Blog, Resources, Hall of Fame, Rules, Newsletter
├── commands/
│   ├── index.ts                    parseAndRun with pipe support
│   ├── systemCommands.ts           ls, cd, cat, help, alias, challenge, etc.
│   ├── appCommands.ts              open command and app registry
│   └── easterEggs.ts              50+ easter egg commands
├── data/
│   ├── team.ts                    Team member data
│   ├── techStack.ts               Tech stack entries
│   └── filesystem.ts              Virtual filesystem structure
├── hooks/
│   ├── useWindowManager.ts        Window state management
│   └── useBootSequence.ts         Boot animation logic
├── types/
│   └── index.ts                   TypeScript types including AppId
└── utils/
    ├── asciiArt.ts                ASCII art strings
    ├── formatOutput.ts            Terminal output formatting helpers
    ├── sounds.ts                  Web Audio API sound effects
    └── achievements.ts            Achievement system logic
```

---

## Mobile Support

SlashDot OS includes a fully mobile-optimized layout. On screens under 768px:

- The OS switches to a scrollable app grid organized by category
- All club pages are prominently featured at the top
- A bottom navigation bar provides quick access to key pages
- The terminal is available via a dedicated button
- All app content is touch-optimized and scrollable
- Safe area insets are handled for notched devices

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via GitHub Actions.

```bash
npm run build      Build for production
npm run preview    Preview production build locally
```

The `base` path in `vite.config.ts` is set to `/25MS-Coding/` for GitHub Pages compatibility.
All asset paths use `./` prefix to work correctly with the base path.

---

## Known Notes

- Delete `node_modules/.vite` if the dev server shows stale cached content after a pull
- The visitor counter uses CountAPI which has rate limits on the free tier
- NASA APOD uses `DEMO_KEY` which allows 30 requests per hour per IP
- The RISC-V emulator (S. Bari's project) runs RV32IMAF compiled to WASM via Emscripten

---

## License

GPL-3.0 — see LICENSE file

---

*SlashDot Coding and Design Club*
*IISER Kolkata, Mohanpur, West Bengal 741246*
*Inter-Batch Website Development Competition 2026*
*Built with React, TypeScript, and way too much caffeine*