# SlashDot OS — 25MS Batch

> A browser-based OS simulator built for the Inter-Batch Website Development Competition 2026.
> Organized by SlashDot Programming & Design Club, IISER Kolkata.

[![Deploy](https://github.com/berasankhadeep20-lang/25MS-Coding/actions/workflows/deploy.yml/badge.svg)](https://github.com/berasankhadeep20-lang/25MS-Coding/actions)

**Live Site:** https://berasankhadeep20-lang.github.io/25MS-Coding/

---

## What is this?

SlashDot OS turns the SlashDot club website into a fake operating system running entirely in your browser. Navigate using a real terminal emulator (xterm.js) or click desktop icons — every section of the site is an app you can open, move, and minimize like a real OS window.

---

## Features

### OS Core
- Full terminal emulator with command history, tab-complete, Ctrl+C, Ctrl+L
- Draggable, stackable, maximizable app windows
- Boot sequence with BIOS screen and animated ASCII art
- Virtual filesystem — `ls`, `cd`, `cat`, `pwd` all work
- Live clock in taskbar
- Right-click context menu on desktop
- Draggable desktop icons — 25+ icons in a clean grid
- Floating particle background with connection lines
- CRT scanline overlay for authentic retro feel
- Animated desktop background with glowing blobs
- IISER Kolkata + SlashDot logos on desktop corners
- Mobile support — full-screen terminal with bottom navigation
- Sound effects with mute toggle in taskbar
- Screensaver — Matrix rain after 60s idle
- Theme switcher — green, amber, blue, red, purple
- Fullscreen toggle from terminal
- Maximize/restore windows by clicking green button or double-clicking title bar
- **Ctrl+K Command Palette** — fuzzy search all commands and apps instantly
- **Toast notification system** — popups in top-right corner
- **Achievement system** — 25 unlockable achievements

### All 5 Mandatory Pages
- Homepage — `open home`
- About / Concept — `open about`
- Tech Stack — `open stack`
- Team — `open team`
- Contact — `open contact`

### Games
- **Asteroids** — shoot asteroids, 3 lives, levels get harder (arrow keys + space)
- **Pong** — 2 player, first to 7 wins (P1: W/S, P2: ↑/↓)
- **Flappy { }** — Flappy Bird with brackets, space to flap
- **Dungeon Crawler** — ASCII roguelike, WASD to move, bump enemies to attack, find the stairs
- **Conway's Game of Life** — click cells, presets, random fill
- **Typing Speed Test** — WPM, accuracy, random passages
- **Snake** — classic snake, arrow keys or WASD, speed slider

### Science Apps
- **Periodic Table** — click elements for info, search by name/symbol/number
- **Fourier Visualizer** — square/sawtooth/triangle waves, adjustable harmonics
- **Gravity Simulator** — N-body gravity, drag planets, add bodies
- **DNA Viewer** — sequence animation, codon translation, GC content
- **Graph Plotter** — plot any f(x), 8 presets, adjustable x range
- **Physics Simulator** — projectile motion, SHM, wave superposition
- **Molecular Viewer** — spinning 3D molecules (H₂O, CO₂, CH₄, C₆H₆ and more)
- **Matrix Calculator** — multiply, add, transpose, determinant, inverse

### Social / Fun Apps
- **Guestbook** — visitors leave messages (stored in session)
- **Poll** — 3 community polls with live voting
- **Joke Generator** — programming, science, IISER, math jokes
- **SlashDot AI** — fake AI chatbot that actually responds

---

## Terminal Commands
```bash
help              → all commands
ls / cd / cat     → navigate virtual filesystem
neofetch          → system info + logos
whoami            → user info
uname -a          → OS info
date              → current date/time
ping <host>       → ping a host
history           → command history
man <command>     → manual pages
fullscreen        → enter fullscreen
exit-fullscreen   → exit fullscreen
toggle-fullscreen → toggle fullscreen
clear             → clear terminal
uptime            → system uptime
cal               → current month calendar
tree              → file system tree
echo <text>       → print text
banner <text>     → big ASCII text
stats             → session statistics
setname <name>    → set your username (remembered on next visit)
visits            → live visitor counter
rain on/off       → toggle desktop rain effect
weather           → live weather from Open-Meteo API (real data!)
reset             → reset terminal
challenge         → Today daily coding challenge changes daily
alias name='cmd'  → Create command shortcuts (e.g. alias gs='git status')
Ctrl+R            → Search command history
pipe support      → ls | grep txt (basic pipe operator)
```

## Terminal Customization
```bash
cursor block/bar/underline  → change cursor style
theme green/amber/blue/red/purple → switch theme
font+                       → increase font size
font-                       → decrease font size
crt on/off                  → toggle CRT scanlines
wallpaper <name>            → change desktop background
```

## Apps
```bash
open home         → Homepage
open about        → About page
open team         → Team roster
open stack        → Tech stack
open contact      → Contact info
open blog         → SlashDot member blog (5 articles)
open resources    → Curated learning resources (7 categories)
open halloffame   → SlashDot Hall of Fame
open rules        → Club constitution
open newsletter   → SlashDot Newsletter (4 issues)
open clock        → Live clock with unix time
open asteroids    → Asteroids game
open pong         → Pong (2 player)
open typing       → Typing speed test
open periodic     → Interactive periodic table
open fourier      → Fourier transform visualizer
open gravity      → N-body gravity simulator
open dna          → DNA sequence viewer + translator
open grapher      → Mathematical function plotter
open physics      → Physics simulator
open molecular    → Molecular viewer (3D spinning)
open matrix-calc  → Matrix calculator
open guestbook    → Sign the guestbook
open poll         → Community voting polls
open jokes        → Random joke generator
open slashdotai   → Chat with SlashDot AI
open achievements → View achievements
open flappy       → Flappy { } game
open dungeon      → ASCII dungeon crawler RPG
open fileexplorer → Browse the virtual filesystem
open settings     → System settings (theme, font, cursor, wallpaper)
open snake        → Snake game (arrow keys / WASD)
open notepad      → Notepad with multiple notes
open taskmanager  → Task manager with kill support
open jsonformat   → JSON formatter & validator
open base64       → Base64 encoder/decoder
open markdown     → Markdown previewer (split pane)
open colorpicker  → Color picker with HEX/RGB/HSL
open passgen      → Password generator with strength meter
open diffview     → Diff viewer (paste two texts)
open coderunner   → Code runner (Python/JS/C, fake)
open lorem        → Lorem ipsum generator (with IISER flavor)
open hashgen      → Hash generator (MD5/SHA, demonstration)
open paint        → Paint app with brushes and colors
open asciiart     → ASCII art generator from text
open pixelart     → 16×16 pixel art editor
open calendar     → Calendar with event management
open pomodoro     → Pomodoro timer (25min work / 5min break)
open stopwatch    → Stopwatch with lap tracking
open currency     → Currency converter (12 currencies)
open bmi          → BMI calculator
open agecalc      → Age calculator
open habittracker → 7-day habit tracker
open calendar     → Calendar with event management
open pomodoro     → Pomodoro timer (25min work / 5min break)
open stopwatch    → Stopwatch with lap tracking
open currency     → Currency converter (12 currencies)
open bmi          → BMI calculator
open agecalc      → Age calculator
open habittracker → 7-day habit tracker
open faketwitter  → Fake IISER Twitter feed
open fakewhatsapp → WhatsApp chat with SlashDot Bot
open confession   → Anonymous confession wall
open compliment   → Compliment generator
open insult       → Friendly roast generator
open debate       → Two-sided debate arena with voting
open linuscall    → Fake phone call from Linus Torvalds
open cgpasim      → CGPA simulator (study more, get better grades)
open ratemycode   → Rate My Code (always 10/10)
open rickroll     → Rickroll detector (always detects one)
open excusegen    → Deadline excuse generator
open screensaver  → Screensaver gallery (starfield, DVD, plasma)
open fakeload     → Fake loading screen with presets
open fortunecook  → IISER fortune cookie
open fixbug       → Bug fix advisor
open kbtrainer    → Keyboard shortcut trainer
open syslog       → System logs viewer
open clipboard    → Terminal clipboard manager
open flashcard    → Flashcard quiz app
open budget       → Budget tracker with chart
open recipe       → IISER survival cookbook
open countdown    → Countdown timer with events
open mealgent     → Random IISER meal generator
open isstrack     → Live ISS position tracker (updates every 5s)
open apod         → NASA Astronomy Picture of the Day
open bookSearch   → Open Library book search
open exchRate     → Live exchange rates (12 currencies)
open ipgeo        → IP geolocation lookup
open randuser     → Random user profile generator
open sortvis      → Sorting algorithm visualizer (bubble, quick, merge)
open pathvis      → Pathfinding visualizer (A*, Dijkstra)
open binconv      → Binary/Hex/Decimal/Octal/ASCII converter
open truthtable   → Truth table generator (AND OR NOT XOR NAND NOR)
open eqsolver     → Quadratic and linear equation solver
open mandelbrot   → Mandelbrot fractal explorer (click to zoom)
open statsCalc    → Statistics calculator with histogram
open fibprime     → Fibonacci/prime number visualizer
open logicgate    → Logic gate simulator (10 gates, toggle inputs)
open studysched   → Weekly study schedule builder
open cellaut      → Cellular automaton (Rule 110, Langton's Ant)
open gameoflife   → Conway's Game of Life
```

## Easter Eggs (50+ hidden commands)
```bash
sudo party                     → confetti explosion
matrix                         → matrix rain effect
hack                           → fake hacking sequence
nyan                           → nyan cat
vim about.txt                  → fake vim editor
apt install <pkg>              → fake package manager
npm install                    → 999 packages, 3 vulnerabilities
ssh batch@iiserkol             → fake SSH into IISER server
git log                        → fake commit history
git blame                      → blame someone for bugs
git status                     → show working tree status
git push                       → fake push to GitHub
ls -la                         → hidden files revealed
cat /etc/passwd                → fake password file
import antigravity             → Python easter egg
sudo chmod 777 life            → full permissions to life
curl iiserkol.ac.in            → WiFi always fails
sudo apt-get install iiser-wifi → WiFi never installs
./run_exam.sh                  → fake exam paper
exam <subject>                 → subject-specific exam
cowsay <text>                  → a cow says things
sl                             → steam locomotive
fortune                        → random programming quote
quote                          → random IISER quote
procrastinate                  → fake SlashTube
weather                        → IISER campus weather
top                            → fake process manager
members                        → SlashDot office bearers
changelog                      → fake OS changelog
panic                          → kernel panic screen
reboot                         → recover from panic
leetcode                       → daily challenge
iiser wifi                     → ping test (always fails)
sudo give me marks             → perfect grades
sudo give me a job             → job offers from Google etc
sudo make me a sandwich        → xkcd reference
sudo make me coffee            → coffee brewing animation
sudo make me a cgpa            → perfect 10.0 CGPA
yes                            → spams yes
banner <text>                  → big ASCII banner
echo <text>                    → prints text
sudo give me a cgpa            → perfect 10.0 CGPA
clippy                         → summon Clippy the assistant
```

## Keyboard Shortcuts
```
Ctrl+K            → Command Palette (search all commands/apps)
Ctrl+C            → Cancel current terminal input
Ctrl+L            → Clear terminal
↑ / ↓             → Terminal command history
Tab               → Autocomplete command
Double-click icon → Open app
Double-click titlebar → Maximize/restore window
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework |
| Vite 5 | Build tool |
| xterm.js 5.5 | Terminal emulator |
| Framer Motion 11 | Window animations |
| Web Audio API | Sound effects |
| Canvas API | Games + visualizers |
| GitHub Actions | CI/CD |
| GitHub Pages | Deployment |

---

## Quick Start
```bash
git clone https://github.com/berasankhadeep20-lang/25MS-Coding.git
cd 25MS-Coding/slashdot-os
npm install
npm run dev
```

Open http://localhost:5173 in your browser. No backend required — pure static frontend.

---

## Project Structure
```
slashdot-os/
├── public/
│   ├── iiserkol_logo.png
│   └── slashdot_logo.png
├── src/
│   ├── components/
│   │   ├── Boot/              ← Boot sequence + animated ASCII
│   │   ├── Desktop/           ← Desktop, taskbar, particles, notifications
│   │   ├── Terminal/          ← xterm.js terminal
│   │   ├── WindowManager/     ← Draggable windows
│   │   └── Apps/              ← All 23 apps
│   ├── commands/              ← All terminal commands + easter eggs
│   ├── data/                  ← Team, tech stack, filesystem data
│   ├── hooks/                 ← useWindowManager, useBootSequence
│   ├── types/                 ← TypeScript types
│   └── utils/                 ← ASCII art, formatting, sounds, achievements
├── .github/workflows/         ← GitHub Actions CI/CD
└── README.md
```

---

## Team

| Name | Role | Batch | Email |
|------|------|-------|-------|
| Sankhadeep Bera | Lead Developer | 25MS | sb25ms227@iiserkol.ac.in |

---

## SlashDot Club — Office Bearers

| Name | Batch | Email |
|------|-------|-------|
| Shuvam Banerji Seal | 22MS | sbs22ms076@iiserkol.ac.in |
| Anuprovo Debnath | 23MS | ad23ms110@iiserkol.ac.in |
| Abhinav Dhingra | 24MS | ad24ms110@iiserkol.ac.in |

---

## Deployment

Auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.
```bash
npm run build
# dist/ is deployed automatically via .github/workflows/deploy.yml
```

---

## License

MIT — see [LICENSE](./LICENSE)

---

*SlashDot Programming & Design Club — IISER Kolkata*
*Inter-Batch Website Development Competition 2026*