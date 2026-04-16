# SlashDot OS

> The official website of **SlashDot — Coding & Design Club, IISER Kolkata**  
> Built by the 25MS batch for the **Inter-Batch Website Development Competition 2026**

**Live:** https://berasankhadeep20-lang.github.io/25MS-Coding/  
**Repo:** https://github.com/berasankhadeep20-lang/25MS-Coding

---

## What is this?

SlashDot OS is a browser-based operating system simulator that serves as the official club website. It features a real terminal emulator (xterm.js), 80+ apps, draggable windows, games, science tools, live data, and 50+ easter eggs — all wrapped in a hacker-aesthetic desktop environment.

Works on both desktop and mobile. On mobile it switches to a scrollable app grid with a touch-friendly terminal.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Terminal | xterm.js 5.5 + FitAddon + WebLinksAddon |
| Animations | Framer Motion |
| Games | Canvas API |
| Audio | Web Audio API |
| Deployment | GitHub Pages |

**APIs used (all free, no key required):**
Open-Meteo · NASA APOD (DEMO_KEY) · Hacker News Firebase · Wikipedia REST · wheretheiss.at · randomuser.me · ipapi.co · api.github.com · countapi.xyz

---

## Getting Started

```bash
git clone https://github.com/berasankhadeep20-lang/25MS-Coding.git
cd 25MS-Coding
npm install
npm run dev
```

Build and deploy:
```bash
npm run build
npm run deploy
```

> **Note:** Image paths use `./` not `/` for GitHub Pages subpath compatibility.  
> Vite cache issues? Delete `node_modules/.vite` and restart.

---

## Project Structure

```
src/
├── components/
│   ├── Apps/
│   │   ├── index.tsx              Home, About, Team, TechStack, Contact, Neofetch, Clock
│   │   ├── Asteroids.tsx          Touch zones + D-pad (fixed mobile)
│   │   ├── Pong.tsx               Drag controls on mobile
│   │   ├── Snake.tsx              Swipe + D-pad on mobile
│   │   ├── FlappyBird.tsx
│   │   ├── DungeonCrawler.tsx     ASCII RPG
│   │   ├── GameOfLife.tsx         Conway's Game of Life
│   │   ├── TypingTest.tsx
│   │   ├── Achievements.tsx
│   │   ├── PeriodicTable.tsx
│   │   ├── FourierViz.tsx
│   │   ├── GravitySim.tsx
│   │   ├── DNAViewer.tsx
│   │   ├── PhysicsSim.tsx
│   │   ├── MolecularViewer.tsx
│   │   ├── GraphPlotter.tsx
│   │   ├── MatrixCalc.tsx
│   │   ├── ScienceApps2.tsx       SortVis, PathVis, BinConv, TruthTable, EqSolver,
│   │   │                          Mandelbrot, CellAut, StatsCalc, FibPrime, LogicGate
│   │   ├── APIApps.tsx            ISS, APOD, BookSearch, ExchRate, IPGeo, RandUser
│   │   ├── DevTools.tsx           JSONFormat, Base64, Markdown, ColorPicker, PassGen,
│   │   │                          DiffViewer, CodeRunner, Lorem, HashGen
│   │   ├── CreativeApps.tsx       Paint (touch-fixed), ASCIIArt, PixelArt
│   │   ├── LifeApps.tsx           Calendar, Pomodoro, Stopwatch, Currency, BMI, AgeCalc, HabitTracker
│   │   ├── FunApps.tsx            NewsTicker, Leaderboard, GitHubStats, Wikipedia, Tamagotchi,
│   │   │                          Stocks, Horoscope, LoveCalc, Magic8, Deployed
│   │   ├── SocialFunApps.tsx      FakeTwitter, FakeWhatsApp, Confession, Compliment, Insult,
│   │   │                          Debate, LinusCall, CGPASim, RateMyCode, Rickroll, ExcuseGen,
│   │   │                          Screensaver, FakeLoad, FortuneCookie, FixBug, KBTrainer,
│   │   │                          SysLog, Clipboard
│   │   ├── ProductivityApps2.tsx  Flashcard, Budget, Recipe, Countdown, MealGen, StudySched
│   │   ├── ClubApps.tsx           Events, Showcase
│   │   ├── ClubPages.tsx          Blog, Resources, HallOfFame, Rules, Newsletter
│   │   ├── ClubExtra.tsx          MemberList, Recruitment, Alumni, Gallery, ContactForm
│   │   ├── LiveDataApps.tsx       GitHubContrib, TodayInCS, HackerNews, WikiRandom
│   │   ├── ClubUtils.tsx          CampusMap, LHCRooms, Timetable, Roadmap, SlashDotFAQ
│   │   └── FeedbackApp.tsx        ⭐ Feedback system
│   ├── Boot/BootScreen.tsx        Animated boot sequence
│   ├── Desktop/
│   │   ├── Desktop.tsx            Draggable icons, taskbar, right-click menu
│   │   ├── Particles.tsx
│   │   ├── DesktopRain.tsx
│   │   ├── EasterEggs.tsx         Confetti + Matrix rain
│   │   ├── NotificationSystem.tsx Toast notifications
│   │   ├── CommandPalette.tsx     Ctrl+K search
│   │   ├── Clippy.tsx
│   │   ├── LiveReactions.tsx
│   │   └── DailyChallenge.tsx
│   ├── Terminal/TerminalWindow.tsx xterm.js + mobile keyboard capture
│   └── WindowManager/AppWindow.tsx Draggable, resizable, minimizable windows
├── commands/
│   ├── index.ts                   parseAndRun — pipe support
│   ├── systemCommands.ts          All terminal commands
│   ├── appCommands.ts             open <app> command
│   └── easterEggs.ts              50+ easter eggs
├── data/
│   ├── team.ts
│   ├── techStack.ts
│   └── filesystem.ts              Virtual filesystem
├── hooks/
│   ├── useWindowManager.ts
│   └── useBootSequence.ts
├── types/index.ts                 AppId union type
└── utils/
    ├── asciiArt.ts
    ├── formatOutput.ts            Terminal color helpers
    ├── sounds.ts
    ├── achievements.ts
    └── memory.ts
```

---

## Club Pages

| App | Command | Description |
|-----|---------|-------------|
| Home | `open home` | Club homepage |
| About | `open about` | About SlashDot |
| Team | `open team` | Office Bearers + developers |
| Members | `open memberlist` | 24 members, searchable by batch/domain |
| Join Us | `open recruitment` | Recruitment timeline, FAQ accordion, perks |
| Alumni | `open alumni` | Where SlashDot alumni are now |
| Gallery | `open gallery` | Photo gallery (placeholder until OBs send photos) |
| Contact Form | `open contactform` | Pre-filled mailto form |
| **Feedback** | **`open feedback`** | **Star ratings, categories, helpful votes** |
| Events | `open events` | Club events and hackathons |
| Showcase | `open showcase` | Member project showcase |
| Blog | `open blog` | Member articles |
| Resources | `open resources` | Curated learning links |
| Hall of Fame | `open halloffame` | SlashDot Hall of Fame |
| Rules | `open rules` | Club constitution |
| Newsletter | `open newsletter` | Club newsletter |
| Tech Stack | `open stack` | This website's tech stack |
| Contact | `open contact` | Contact info |

---

## Feedback System

**File:** `src/components/Apps/FeedbackApp.tsx`  
**Desktop icon:** 3rd column from right (col2), below contactform  
**Mobile:** Club section grid  
**Terminal:** `feedback` or `open feedback`  
**Command Palette:** "Submit Feedback", "View Club Feedback"

### Features

**View tab:**
- All feedback cards with star ratings, category badge, relative timestamp
- "Helpful" upvote button (one per entry per browser, persisted)
- Filter by category · Sort by Recent / Rating / Helpful
- Rating distribution bar chart (5★ → 1★ breakdown)

**Submit tab:**
- Name field (optional) + anonymous checkbox
- 9-category dropdown
- Interactive 5-star rating with hover effect + label (Terrible / Poor / Okay / Good / Excellent)
- 500-character message with live counter
- Validation: requires rating + ≥10 char message
- Success screen with options to submit another or view all

**Categories:**
General Feedback · HackSlash / Hackathon · Workshop / Talk · Club Website · Events & Activities · Recruitment Process · Suggestion / Idea · Bug Report · Other

**Data storage (localStorage):**
```
slashdot-feedback           JSON array of FeedbackEntry objects
slashdot-feedback-helped    JSON array of voted entry IDs (prevent double-voting)
```

**Pre-seeded entries:** 5 realistic entries so the app never looks empty on first open.

**FeedbackEntry schema:**
```ts
{
  id: string           // unique ID
  name: string         // display name or "Anonymous"
  category: string     // one of the 9 categories
  rating: number       // 1–5
  message: string      // feedback text
  timestamp: string    // ISO date string
  helpful: number      // upvote count
}
```

---

## IISER Tools

| App | Command | Description |
|-----|---------|-------------|
| Campus Map | `open campusmap` / `map` | SVG map, 12 buildings, click for info |
| LHC Rooms | `open lhcrooms` / `lhc` / `rooms` | G01–G06, 101–109, 201–215 availability |
| Timetable | `open timetable` | Weekly builder, saved to localStorage |
| Roadmap | `open roadmap` | Kanban: Done / In Progress / Planned / Ideas |
| FAQ Bot | `open slashdotfaq` / `faq` | 10 pre-programmed club Q&A + chat UI |

**LHC Room numbering:** G-floor = G01–G06, 1st floor = 101–109, 2nd floor = 201–215.

---

## Live Data

| App | Command | API |
|-----|---------|-----|
| GitHub Contributions | `open githubcontrib` | Generated heatmap |
| Today in CS | `open todayincs` | Wikipedia REST API |
| Hacker News | `open hackernews` / `hn` | hacker-news.firebaseio.com |
| Wiki Random | `open wikirandom` / `wiki random` | Wikipedia REST API |
| ISS Tracker | `open isstrack` | wheretheiss.at |
| NASA APOD | `open apod` | api.nasa.gov (DEMO_KEY) |
| IP Lookup | `open ipgeo` | ipapi.co |

---

## Games

| Game | Mobile Controls |
|------|----------------|
| Asteroids | Top zone = thrust · Left/right zones = rotate · Centre = shoot · Double tap = shoot · D-pad buttons below canvas |
| Pong | Drag left half = P1 · Drag right half = P2 · ▲▼ button pairs as alternative |
| Snake | Swipe on canvas · D-pad buttons below canvas · Tap D-pad to restart when dead |
| Flappy { | Tap to flap |
| Dungeon Crawler | On-screen buttons |
| Game of Life | Touch to toggle cells |

---

## Terminal Reference

### Club
```bash
whois slashdot      WHOIS-style club record
cal events          Upcoming events calendar
motd                Message of the day (changes daily)
members             Team inline in terminal
register            How to join SlashDot
weather             Live IISER campus weather
visits              Live visitor counter
feedback            Open feedback app
challenge           Today coding challenge
open random         Random app
tree /club          ASCII file tree of all club pages
ascii slashdot      SlashDot ASCII logo
ls apps             All 80+ apps in a grid
hn                  Hacker News
wiki random         Random Wikipedia article
lhc / rooms         LHC room availability
map                 Campus map
faq                 FAQ bot
```

### System
```bash
ls / cd / pwd / cat / tree    Filesystem navigation
whoami / uname -a / date      System info
uptime / history / ping       More system info
neofetch                      System info + ASCII art
setname <name>                Set username
clear / cls / reset           Clear terminal
alias name='cmd'              Persistent command alias
theme <name>                  green amber blue red purple
cursor block/bar/underline    Cursor style
font+ / font-                 Font size
crt on/off                    CRT effect
fullscreen                    Enter fullscreen
Ctrl+K                        Command Palette
Ctrl+R                        Recent history
Tab                           Autocomplete
↑ ↓                           Command history
cmd | grep pattern            Pipe + filter
```

### Easter Eggs (50+)
```bash
sudo party · matrix · hack · nyan · vim <file> · npm install
git blame · ls -la · import antigravity · sudo make me coffee
sudo give me marks · leetcode · iiser wifi · sudo party
cowsay <text> · sl · fortune · procrastinate · panic
# ... and 40 more — explore!
```

---

## Office Bearers

| Name | Batch | Role | Email |
|------|-------|------|-------|
| Shuvam Banerji Seal | 22MS | President | sbs22ms076@iiserkol.ac.in |
| Anuprovo Debnath | 23MS | Secretary | ad23ms110@iiserkol.ac.in |
| Abhinav Dhingra | 24MS | Treasurer | ad24ms110@iiserkol.ac.in |
| Sankhadeep Bera | 25MS | Lead Developer | sb25ms227@iiserkol.ac.in |
| S. Bari | 25MS | Systems Developer | shayan.bari.0001@gmail.com |

---

## Desktop Icon Layout

**Left side — 7-column grid:**
Games · Science · API Apps · Social & Fun · Dev Tools · Productivity · OS Tools

**Right side — 3 columns:**
- Col 1 (rightmost): terminal, home, about, team, stack, contact, neofetch
- Col 2 (middle): events, showcase, blog, resources, halloffame, rules, newsletter
- Col 3 (leftmost): memberlist, recruitment, alumni, gallery, contactform, feedback

---

## Mobile Layout

**3 views:**
1. **Home** — scrollable grid: Club · Games · Science · Live Data · IISER Tools · Social · Tools
2. **Terminal** — xterm.js + mobile keyboard + quick-command bar
3. **App** — full-screen with back button + bottom nav bar

**Mobile terminal keyboard:**
- `onInput` captures all characters including space
- `onKeyDown` handles Enter/Backspace/Arrows
- `enterKeyHint="send"` shows Go button
- ↑ ↓ ↵ buttons for history + enter
- Quick commands: `help` `open home` `open events` `challenge` `weather` `members` `open showcase` `open blog`

---

## localStorage Keys

```
slashdot-os-memory          OS state: name, visits, firstVisit, lastVisit
slashdot-aliases            Custom terminal aliases (JSON object)
slashdot-timetable          Weekly timetable grid (JSON object)
slashdot-feedback           Feedback entries (JSON array)
slashdot-feedback-helped    Voted entry IDs (JSON array)
```

---

## Adding a New App (Checklist)

- [ ] Create `src/components/Apps/YourApp.tsx`, export `YourApp()`
- [ ] Add `'yourapp'` to `AppId` in `src/types/index.ts`
- [ ] Add `case 'yourapp': return <YourApp />` in `AppContent` in `App.tsx`
- [ ] Add import in `App.tsx`
- [ ] Add to `appMap` in `src/commands/appCommands.ts`
- [ ] Add icon to `LEFT_ICONS` or `RIGHT_ICONS` in `Desktop.tsx`
- [ ] Add button to mobile grid in `App.tsx`
- [ ] Add entry to `help` in `systemCommands.ts`
- [ ] Add entry to `ALL_COMMANDS` in `CommandPalette.tsx`

---

## Known Issues / TODOs

- [ ] OBs to send real team member photos for TeamApp
- [ ] OBs to populate real events in EventsApp
- [ ] OBs to add real projects to ShowcaseApp
- [ ] Persistent guestbook needs a backend (JSONBin or Firebase)
- [ ] GitHub contribution graph shows generated data (real API needs OAuth)
- [ ] PWA service worker needs verification after deploy
- [ ] `npm install html2canvas` for `screenshot` command

---

## License

MIT — built with ☕ and questionable sleep schedules by the 25MS batch.

**SlashDot · Coding & Design Club · IISER Kolkata**  
slashdot-iiserk.github.io · slashdot@iiserkol.ac.in