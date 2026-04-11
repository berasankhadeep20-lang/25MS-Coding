import { CommandHandler, CommandResult } from '../types'
import { c, formatTable, formatHeader, formatSection, formatError } from '../utils/formatOutput'
import { filesystem, fileContents } from '../data/filesystem'

let cwd = '/home/slashdot'

export function getCwd() { return cwd }

export const systemCommands: Record<string, CommandHandler> = {
  help: (): CommandResult => ({
    output: [
      '',
      formatHeader('SlashDot OS — Command Reference'),
      `  ${c.gray}slashdot-iiserk.github.io  |  IISER Kolkata${c.reset}`,
      '',
      formatSection('Club Pages', [
        `${c.cyan}open home${c.reset}             ${c.gray}SlashDot homepage${c.reset}`,
        `${c.cyan}open about${c.reset}            ${c.gray}About the club${c.reset}`,
        `${c.cyan}open team${c.reset}             ${c.gray}Office Bearers & developers${c.reset}`,
        `${c.cyan}open memberlist${c.reset}       ${c.gray}Full members list (searchable)${c.reset}`,
        `${c.cyan}open recruitment${c.reset}      ${c.gray}Join SlashDot — how to apply${c.reset}`,
        `${c.cyan}open alumni${c.reset}           ${c.gray}Where are our alumni now?${c.reset}`,
        `${c.cyan}open gallery${c.reset}          ${c.gray}Photo gallery from events${c.reset}`,
        `${c.cyan}open contactform${c.reset}      ${c.gray}Contact us via form${c.reset}`,
        `${c.cyan}open contact${c.reset}          ${c.gray}Contact info${c.reset}`,
        `${c.cyan}open events${c.reset}           ${c.gray}Club events & hackathons${c.reset}`,
        `${c.cyan}open showcase${c.reset}         ${c.gray}Member project showcase${c.reset}`,
        `${c.cyan}open blog${c.reset}             ${c.gray}SlashDot member blog${c.reset}`,
        `${c.cyan}open resources${c.reset}        ${c.gray}Curated learning resources${c.reset}`,
        `${c.cyan}open halloffame${c.reset}       ${c.gray}SlashDot Hall of Fame${c.reset}`,
        `${c.cyan}open rules${c.reset}            ${c.gray}Club constitution${c.reset}`,
        `${c.cyan}open newsletter${c.reset}       ${c.gray}SlashDot newsletter${c.reset}`,
        `${c.cyan}open stack${c.reset}            ${c.gray}Tech stack${c.reset}`,
      ]),
      formatSection('Club Commands', [
        `${c.yellow}whois slashdot${c.reset}       ${c.gray}WHOIS record for SlashDot${c.reset}`,
        `${c.yellow}cal events${c.reset}           ${c.gray}SlashDot events calendar${c.reset}`,
        `${c.yellow}motd${c.reset}                 ${c.gray}Message of the day${c.reset}`,
        `${c.yellow}members${c.reset}              ${c.gray}Team & OBs in terminal${c.reset}`,
        `${c.yellow}register${c.reset}             ${c.gray}How to join SlashDot${c.reset}`,
        `${c.yellow}weather${c.reset}              ${c.gray}Live IISER campus weather${c.reset}`,
        `${c.yellow}visits${c.reset}               ${c.gray}Live visitor counter${c.reset}`,
        `${c.yellow}challenge${c.reset}            ${c.gray}Today's coding challenge${c.reset}`,
        `${c.yellow}alias name='cmd'${c.reset}     ${c.gray}Create command shortcut${c.reset}`,
      ]),
      formatSection('Games', [
        `${c.cyan}open asteroids${c.reset}        ${c.gray}Asteroids (arrow keys + space)${c.reset}`,
        `${c.cyan}open pong${c.reset}             ${c.gray}Pong 2-player (W/S vs ↑/↓)${c.reset}`,
        `${c.cyan}open flappy${c.reset}           ${c.gray}Flappy { } (space to flap)${c.reset}`,
        `${c.cyan}open snake${c.reset}            ${c.gray}Snake (arrow keys)${c.reset}`,
      ]),
      formatSection('Science & Math', [
        `${c.cyan}open periodic${c.reset}         ${c.gray}Interactive periodic table${c.reset}`,
        `${c.cyan}open fourier${c.reset}          ${c.gray}Fourier visualizer${c.reset}`,
        `${c.cyan}open gravity${c.reset}          ${c.gray}N-body gravity simulator${c.reset}`,
        `${c.cyan}open dna${c.reset}              ${c.gray}DNA sequence viewer${c.reset}`,
        `${c.cyan}open physics${c.reset}          ${c.gray}Physics simulator${c.reset}`,
        `${c.cyan}open molecular${c.reset}        ${c.gray}3D molecular viewer${c.reset}`,
        `${c.cyan}open sortvis${c.reset}          ${c.gray}Sorting algorithm visualizer${c.reset}`,
        `${c.cyan}open pathvis${c.reset}          ${c.gray}Pathfinding (A*, Dijkstra)${c.reset}`,
        `${c.cyan}open binconv${c.reset}          ${c.gray}Binary/Hex/Decimal converter${c.reset}`,
        `${c.cyan}open truthtable${c.reset}       ${c.gray}Logic truth table generator${c.reset}`,
        `${c.cyan}open statsCalc${c.reset}        ${c.gray}Statistics calculator${c.reset}`,
        `${c.cyan}open fibprime${c.reset}         ${c.gray}Fibonacci/prime visualizer${c.reset}`,
        `${c.cyan}open logicgate${c.reset}        ${c.gray}Logic gate simulator${c.reset}`,
      ]),
      formatSection('Live Data', [
        `${c.cyan}open isstrack${c.reset}         ${c.gray}Live ISS tracker${c.reset}`,
        `${c.cyan}open apod${c.reset}             ${c.gray}NASA picture of the day${c.reset}`,
        `${c.cyan}open ipgeo${c.reset}            ${c.gray}IP geolocation${c.reset}`,
        `${c.cyan}open randuser${c.reset}         ${c.gray}Random user generator${c.reset}`,
        `${c.cyan}open githubstats${c.reset}      ${c.gray}Live GitHub stats${c.reset}`,
        `${c.cyan}open wikipedia${c.reset}        ${c.gray}Wikipedia search${c.reset}`,
      ]),
      formatSection('Social', [
        `${c.cyan}open guestbook${c.reset}        ${c.gray}Sign the guestbook${c.reset}`,
        `${c.cyan}open poll${c.reset}             ${c.gray}Community polls${c.reset}`,
        `${c.cyan}open jokes${c.reset}            ${c.gray}Joke generator${c.reset}`,
        `${c.cyan}open slashdotai${c.reset}       ${c.gray}SlashDot AI chatbot${c.reset}`,
        `${c.cyan}open newsticker${c.reset}       ${c.gray}IISER campus news${c.reset}`,
        `${c.cyan}open leaderboard${c.reset}      ${c.gray}Terminal user leaderboard${c.reset}`,
        `${c.cyan}open horoscope${c.reset}        ${c.gray}IISER horoscope${c.reset}`,
        `${c.cyan}open faketwitter${c.reset}      ${c.gray}Fake IISER Twitter${c.reset}`,
        `${c.cyan}open fakewhatsapp${c.reset}     ${c.gray}WhatsApp with SlashDot Bot${c.reset}`,
        `${c.cyan}open confession${c.reset}       ${c.gray}Anonymous confession wall${c.reset}`,
        `${c.cyan}open compliment${c.reset}       ${c.gray}Compliment generator${c.reset}`,
        `${c.cyan}open insult${c.reset}           ${c.gray}Friendly roast generator${c.reset}`,
        `${c.cyan}open screensaver${c.reset}      ${c.gray}Screensaver gallery${c.reset}`,
        `${c.cyan}open fortunecook${c.reset}      ${c.gray}IISER fortune cookie${c.reset}`,
        `${c.cyan}open cgpasim${c.reset}          ${c.gray}CGPA simulator${c.reset}`,
        `${c.cyan}open excusegen${c.reset}        ${c.gray}Deadline excuse generator${c.reset}`,
      ]),
      formatSection('Dev Tools', [
        `${c.cyan}open base64${c.reset}           ${c.gray}Base64 encoder/decoder${c.reset}`,
        `${c.cyan}open markdown${c.reset}         ${c.gray}Markdown previewer${c.reset}`,
        `${c.cyan}open colorpicker${c.reset}      ${c.gray}Color picker${c.reset}`,
        `${c.cyan}open hashgen${c.reset}          ${c.gray}Hash generator (MD5/SHA)${c.reset}`,
        `${c.cyan}open paint${c.reset}            ${c.gray}Paint app${c.reset}`,
        `${c.cyan}open asciiart${c.reset}         ${c.gray}ASCII art generator${c.reset}`,
        `${c.cyan}open kbtrainer${c.reset}        ${c.gray}Keyboard shortcut trainer${c.reset}`,
        `${c.cyan}open syslog${c.reset}           ${c.gray}System logs viewer${c.reset}`,
        `${c.cyan}open clipboard${c.reset}        ${c.gray}Terminal clipboard manager${c.reset}`,
      ]),
      formatSection('Productivity', [
        `${c.cyan}open calendar${c.reset}         ${c.gray}Calendar${c.reset}`,
        `${c.cyan}open pomodoro${c.reset}         ${c.gray}Pomodoro timer${c.reset}`,
        `${c.cyan}open stopwatch${c.reset}        ${c.gray}Stopwatch with laps${c.reset}`,
        `${c.cyan}open countdown${c.reset}        ${c.gray}Countdown timer${c.reset}`,
        `${c.cyan}open mealgent${c.reset}         ${c.gray}IISER meal generator${c.reset}`,
        `${c.cyan}open studysched${c.reset}       ${c.gray}Study schedule builder${c.reset}`,
        `${c.cyan}open flashcard${c.reset}        ${c.gray}Flashcard quiz app${c.reset}`,
        `${c.cyan}open notepad${c.reset}          ${c.gray}Notepad${c.reset}`,
      ]),
      formatSection('OS Tools', [
        `${c.cyan}open fileexplorer${c.reset}     ${c.gray}Virtual file explorer${c.reset}`,
        `${c.cyan}open settings${c.reset}         ${c.gray}System settings${c.reset}`,
        `${c.cyan}open taskmanager${c.reset}      ${c.gray}Task manager${c.reset}`,
        `${c.cyan}open clock${c.reset}            ${c.gray}Live clock${c.reset}`,
      ]),
      formatSection('Terminal', [
        `${c.yellow}ls / cd / cat / pwd${c.reset}  ${c.gray}Virtual filesystem${c.reset}`,
        `${c.yellow}neofetch${c.reset}             ${c.gray}System info${c.reset}`,
        `${c.yellow}whoami${c.reset}               ${c.gray}Who are you?${c.reset}`,
        `${c.yellow}setname <name>${c.reset}       ${c.gray}Set your display name${c.reset}`,
        `${c.yellow}alias name='cmd'${c.reset}     ${c.gray}Create command shortcut${c.reset}`,
        `${c.yellow}challenge${c.reset}            ${c.gray}Today's coding challenge${c.reset}`,
        `${c.yellow}weather${c.reset}              ${c.gray}Live IISER campus weather${c.reset}`,
        `${c.yellow}visits${c.reset}               ${c.gray}Live visitor counter${c.reset}`,
        `${c.yellow}members${c.reset}              ${c.gray}SlashDot team & OBs${c.reset}`,
        `${c.yellow}register${c.reset}             ${c.gray}How to join SlashDot${c.reset}`,
        `${c.yellow}rain on/off${c.reset}          ${c.gray}Toggle desktop rain${c.reset}`,
        `${c.yellow}history${c.reset}              ${c.gray}Command history${c.reset}`,
        `${c.yellow}man <cmd>${c.reset}            ${c.gray}Manual pages${c.reset}`,
        `${c.yellow}banner <text>${c.reset}        ${c.gray}ASCII banner${c.reset}`,
      ]),
      formatSection('Keyboard Shortcuts', [
        `${c.green}Ctrl+K${c.reset}               ${c.gray}Command Palette${c.reset}`,
        `${c.green}Ctrl+C${c.reset}               ${c.gray}Cancel input${c.reset}`,
        `${c.green}Ctrl+L${c.reset}               ${c.gray}Clear terminal${c.reset}`,
        `${c.green}Ctrl+R${c.reset}               ${c.gray}Show recent history${c.reset}`,
        `${c.green}Tab${c.reset}                  ${c.gray}Autocomplete command${c.reset}`,
        `${c.green}↑ / ↓${c.reset}               ${c.gray}Navigate history${c.reset}`,
      ]),
      formatSection('Easter Eggs', [
        `${c.magenta}sudo party${c.reset}           ${c.gray}🎉 Party mode${c.reset}`,
        `${c.magenta}matrix${c.reset}               ${c.gray}Enter the matrix${c.reset}`,
        `${c.magenta}hack${c.reset}                 ${c.gray}Look like a hacker${c.reset}`,
        `${c.magenta}nyan${c.reset}                 ${c.gray}Nyan cat${c.reset}`,
        `${c.magenta}vim${c.reset}                  ${c.gray}The Vim experience${c.reset}`,
        `${c.magenta}fortune${c.reset}              ${c.gray}Random quote${c.reset}`,
        `${c.magenta}cowsay <text>${c.reset}        ${c.gray}Talking cow${c.reset}`,
        `${c.magenta}sl${c.reset}                   ${c.gray}You meant ls...${c.reset}`,
        `${c.magenta}clippy${c.reset}               ${c.gray}Summon Clippy${c.reset}`,
        `${c.magenta}sudo give me marks${c.reset}   ${c.gray}Worth a shot${c.reset}`,
        `${c.magenta}iiser wifi${c.reset}           ${c.gray}WiFi situation explained${c.reset}`,
        `${c.gray}...and 40+ more easter eggs to discover${c.reset}`,
      ]),
      '',
      `  ${c.gray}Pipe support: ls | grep txt  |  cmd | grep pattern${c.reset}`,
      `  ${c.gray}Aliases: alias gs='git status'  (persisted across sessions)${c.reset}`,
      '',
    ].join('\r\n'),
  }),

  ls: (args: string[]): CommandResult => {
    const path = args[0]
      ? (args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`.replace('//', '/'))
      : cwd
    const contents = filesystem[path]
    if (!contents) return { output: formatError(`ls: cannot access '${path}': No such file or directory`) }

    const formatted = contents.map(item => {
      const fullPath = `${path}/${item}`.replace('//', '/')
      const isDir = !!filesystem[fullPath]
      return isDir
        ? `${c.cyan}${c.bold}${item}/${c.reset}`
        : `${c.white}${item}${c.reset}`
    })

    return { output: '\r\n' + formatted.join('    ') + '\r\n' }
  },

  cd: (args: string[]): CommandResult => {
    if (!args[0] || args[0] === '~') {
      cwd = '/home/slashdot'
      return { output: '' }
    }
    const newPath = args[0].startsWith('/')
      ? args[0]
      : `${cwd}/${args[0]}`.replace('//', '/')
    const normalized = newPath.replace(/\/\.$/, '').replace(/\/[^/]+\/\.\.$/, '') || '/'

    if (filesystem[normalized]) {
      cwd = normalized
      return { output: '' }
    }
    return { output: formatError(`cd: ${args[0]}: No such file or directory`) }
  },

  pwd: (): CommandResult => ({ output: `\r\n${c.yellow}${cwd}${c.reset}\r\n` }),

  cat: (args: string[]): CommandResult => {
    if (!args[0]) return { output: formatError('cat: missing file operand') }
    const path = args[0].startsWith('/')
      ? args[0]
      : `${cwd}/${args[0]}`.replace('//', '/')
    const content = fileContents[path]
    if (!content) return { output: formatError(`cat: ${args[0]}: No such file or directory`) }
    return { output: `\r\n${c.white}${content}${c.reset}\r\n` }
  },

  whoami: (): CommandResult => {
    const mem = (() => { try { const r = localStorage.getItem('slashdot-os-memory'); return r ? JSON.parse(r) : null } catch { return null } })()
    const rows: [string, string][] = [
      ['User',     mem?.name || 'slashdot-user'],
      ['Batch',    '25MS — IISER Kolkata'],
      ['Club',     'SlashDot Programming & Design Club'],
      ['Role',     'Competitor — Inter-Batch Web Dev 2026'],
      ['Shell',    '/usr/bin/slashdot-sh'],
      ['Visits',   String(mem?.visits ?? 1)],
      ['Commands', String(mem?.commandCount ?? 0)],
      ['Since',    mem?.firstVisit ?? 'today'],
    ]
    return { output: ['\r\n', formatTable(rows), ''].join('\r\n') }
  },

  uname: (args: string[]): CommandResult => {
    const all = args.includes('-a')
    return {
      output: all
        ? `\r\n${c.cyan}SlashDot OS${c.reset} ${c.yellow}6.8.0-25ms${c.reset} ${c.white}SMP PREEMPT 2026 x86_64 GNU/Linux${c.reset}\r\n`
        : `\r\n${c.cyan}SlashDot OS${c.reset}\r\n`,
    }
  },

  'whois slashdot': (): CommandResult => ({
    output: [
      '',
      `${c.green}┌─────────────────────────────────────────────────────────┐${c.reset}`,
      `${c.green}│  WHOIS slashdot-iiserk.github.io                        │${c.reset}`,
      `${c.green}└─────────────────────────────────────────────────────────┘${c.reset}`,
      '',
      `  ${c.cyan}Domain Name${c.reset}      slashdot-iiserk.github.io`,
      `  ${c.cyan}Organisation${c.reset}     SlashDot — Coding & Design Club`,
      `  ${c.cyan}Type${c.reset}             Official Student Club`,
      `  ${c.cyan}Institute${c.reset}        IISER Kolkata, Mohanpur, WB 741246`,
      `  ${c.cyan}Founded${c.reset}          Long ago. Revived every year.`,
      `  ${c.cyan}Status${c.reset}           ${c.green}ACTIVE${c.reset}`,
      `  ${c.cyan}Members${c.reset}          50+ active members across 7+ batches`,
      `  ${c.cyan}President${c.reset}        Shuvam Banerji Seal (22MS)`,
      `  ${c.cyan}Secretary${c.reset}        Anuprovo Debnath (23MS)`,
      `  ${c.cyan}Treasurer${c.reset}        Abhinav Dhingra (24MS)`,
      `  ${c.cyan}Email${c.reset}            slashdot@iiserkol.ac.in`,
      `  ${c.cyan}GitHub${c.reset}           github.com/slashdot-iiserk`,
      `  ${c.cyan}Registrar${c.reset}        GitHub Pages`,
      `  ${c.cyan}DNS${c.reset}              Cloudflare`,
      `  ${c.cyan}SSL${c.reset}              Valid (Let's Encrypt via GitHub)`,
      `  ${c.cyan}Built With${c.reset}       React 18 · TypeScript · Vite 5 · xterm.js`,
      `  ${c.cyan}Caffeine Used${c.reset}    Immeasurable`,
      '',
      `  ${c.gray}>>> Record last updated: ${new Date().toLocaleDateString('en-IN')}${c.reset}`,
      '',
    ].join('\r\n'),
  }),

  'cal events': (): CommandResult => {
    const events = [
      { date: '2026-04-11', name: 'Inter-Batch Website Competition',  status: 'done',     emoji: '✅' },
      { date: '2026-08-20', name: 'SlashDot Recruitment — 26MS',      status: 'upcoming', emoji: '📅' },
      { date: '2026-09-15', name: 'Web Development Workshop',          status: 'upcoming', emoji: '📅' },
      { date: '2026-10-03', name: 'HackSlash 2026 (24-hour Hackathon)',status: 'upcoming', emoji: '⚡' },
      { date: '2026-11-05', name: 'Open Source Contribution Drive',    status: 'upcoming', emoji: '📅' },
      { date: '2026-11-25', name: 'UI/UX & Figma Workshop',            status: 'upcoming', emoji: '📅' },
      { date: '2026-12-10', name: 'Competitive Programming Bootcamp',  status: 'upcoming', emoji: '📅' },
      { date: '2027-01-15', name: 'AI/ML Workshop',                    status: 'upcoming', emoji: '📅' },
      { date: '2027-02-20', name: 'SlashDot Annual Showcase 2027',     status: 'upcoming', emoji: '🌟' },
    ]
    const now = new Date()
    return {
      output: [
        '',
        `${c.cyan}╔══════════════════════════════════════════════════════════╗${c.reset}`,
        `${c.cyan}║  SlashDot Events Calendar                                ║${c.reset}`,
        `${c.cyan}╚══════════════════════════════════════════════════════════╝${c.reset}`,
        '',
        ...events.map(e => {
          const d = new Date(e.date)
          const isPast = d < now
          const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          const color = isPast ? c.gray : d.getTime() - now.getTime() < 30 * 86400000 ? c.yellow : c.white
          return `  ${e.emoji}  ${color}${dateStr.padEnd(18)}${c.reset} ${isPast ? c.gray : c.white}${e.name}${c.reset}${isPast ? ` ${c.gray}(completed)${c.reset}` : ''}`
        }),
        '',
        `  ${c.gray}Type 'open events' for full event details${c.reset}`,
        '',
      ].join('\r\n'),
    }
  },

  motd: (): CommandResult => {
    const messages = [
      { title: 'Did you know?',       body: 'SlashDot OS has 50+ easter eggs hidden in the terminal. Type random commands to find them.' },
      { title: 'Tip of the day',      body: 'Press Ctrl+K to open the Command Palette and search all apps and commands instantly.' },
      { title: 'HackSlash 2026',      body: 'Our annual 24-hour hackathon is coming in October 2026. Start thinking of ideas now.' },
      { title: 'Join SlashDot',       body: 'Recruitment opens every August for the incoming batch. Type "register" for details.' },
      { title: 'Did you know?',       body: 'You can pipe commands together: try "help | grep open" to filter the help output.' },
      { title: 'Daily Challenge',     body: 'Type "challenge" to see today\'s coding problem. A new one appears every day.' },
      { title: 'Club Fact',           body: 'SlashDot has been running for 7+ batches. The name comes from the characters / and . in file paths.' },
      { title: 'Terminal Tip',        body: 'Use the ↑ arrow key to recall previous commands. Type "alias" to see command shortcuts.' },
      { title: 'GitHub',              body: 'SlashDot OS is open source! Check github.com/berasankhadeep20-lang/25MS-Coding' },
      { title: 'Weather',             body: 'Type "weather" to see live weather at IISER Kolkata campus right now.' },
    ]
    const idx = new Date().getDate() % messages.length
    const m = messages[idx]
    return {
      output: [
        '',
        `${c.yellow}╔══════════════════════════════════════════╗${c.reset}`,
        `${c.yellow}║  📋 Message of the Day                   ║${c.reset}`,
        `${c.yellow}╚══════════════════════════════════════════╝${c.reset}`,
        '',
        `  ${c.cyan}${m.title}${c.reset}`,
        `  ${c.white}${m.body}${c.reset}`,
        '',
        `  ${c.gray}${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}${c.reset}`,
        '',
      ].join('\r\n'),
    }
  },

  alias: (args: string[]): CommandResult => {
    if (args.length === 0) {
      const defaults = [
        ['ll',  'ls -la',     'List files with details'],
        ['cls', 'clear',      'Clear terminal'],
        ['?',   'help',       'Show help'],
        ['gs',  'git status', 'Git status shorthand'],
        ['gl',  'git log',    'Git log shorthand'],
      ]
      return {
        output: [
          '',
          `${c.cyan}Built-in aliases:${c.reset}`,
          ...defaults.map(([k, v, d]) => `  ${c.yellow}${k}${c.reset} = ${c.white}${v}${c.reset}  ${c.gray}${d}${c.reset}`),
          '',
          `${c.gray}Usage: alias name='command'${c.reset}`,
          `${c.gray}Example: alias myapp='open slashdotai'${c.reset}`,
          `${c.gray}Aliases are saved across sessions.${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }
    const raw = args.join(' ')
    const match = raw.match(/^(\w+)=["']?(.+?)["']?$/)
    if (!match) {
      return { output: `\r\n${c.red}Usage: alias name='command'${c.reset}\r\n${c.gray}Example: alias gs='git status'${c.reset}\r\n` }
    }
    window.dispatchEvent(new CustomEvent('slashdot-alias', { detail: { name: match[1], cmd: match[2] } }))
    return { output: `\r\n${c.green}✓ Alias created: ${c.yellow}${match[1]}${c.green} = ${c.white}${match[2]}${c.reset}\r\n${c.gray}Saved to session storage.${c.reset}\r\n` }
  },

  challenge: (): CommandResult => {
    try {
      const { getDailyChallengeText } = require('../components/Desktop/DailyChallenge')
      return { output: getDailyChallengeText() }
    } catch {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
      const challenges = [
        'Two Sum — Given array + target, return indices of two numbers that add up to target.',
        'Valid Parentheses — Given string of brackets, return true if valid.',
        'Binary Search — Find target in sorted array in O(log n).',
        'Maximum Subarray — Find contiguous subarray with largest sum (Kadane\'s).',
        'Number of Islands — Count islands in a 2D grid using BFS/DFS.',
        'CGPA Optimiser — Just attend class. O(1) solution.',
      ]
      const ch = challenges[dayOfYear % challenges.length]
      return {
        output: [
          '',
          `${c.cyan}╔══════════════════════════════════════════╗${c.reset}`,
          `${c.cyan}║  📅 Daily Coding Challenge                ║${c.reset}`,
          `${c.cyan}╚══════════════════════════════════════════╝${c.reset}`,
          '',
          `  ${c.white}${ch}${c.reset}`,
          '',
          `  ${c.gray}New challenge every day. Good luck!${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }
  },

  setname: (args: string[]): CommandResult => {
    const name = args.join(' ').trim()
    if (!name) return { output: `\r\n${c.red}Usage: setname <your name>${c.reset}\r\n` }
    try { const r = localStorage.getItem('slashdot-os-memory'); const m = r ? JSON.parse(r) : {}; localStorage.setItem('slashdot-os-memory', JSON.stringify({ ...m, name })) } catch {}
    return { output: `\r\n${c.green}✓ Name set to: ${name}${c.reset}\r\n${c.gray}Type 'whoami' to see your profile.${c.reset}\r\n` }
  },

  date: (): CommandResult => ({
    output: `\r\n${c.yellow}${new Date().toString()}${c.reset}\r\n`,
  }),

  man: (args: string[]): CommandResult => {
    const cmd = args[0]?.toLowerCase()

    const pages: Record<string, string[]> = {
      ls: [
        `${c.cyan}NAME${c.reset}`,
        `  ls — list directory contents`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  ls [path]`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Lists files and directories in the current or given path.`,
        `  Directories are shown in cyan with a trailing /.`,
        '',
        `${c.cyan}EXAMPLES${c.reset}`,
        `  ls                   list current directory`,
        `  ls /home/slashdot    list specific path`,
        `  ls team              list team folder`,
      ],
      cd: [
        `${c.cyan}NAME${c.reset}`,
        `  cd — change directory`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  cd [path]`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Changes the current working directory.`,
        `  Use ~ or no argument to go to home directory.`,
        '',
        `${c.cyan}EXAMPLES${c.reset}`,
        `  cd /home/slashdot    go to home`,
        `  cd ..                go up one level`,
        `  cd ~                 go to home`,
      ],
      cat: [
        `${c.cyan}NAME${c.reset}`,
        `  cat — read file contents`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  cat <file>`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Prints the contents of a file to the terminal.`,
        '',
        `${c.cyan}EXAMPLES${c.reset}`,
        `  cat about.txt        read about file`,
        `  cat README.md        read readme`,
        `  cat /etc/os-release  read OS info`,
      ],
      ping: [
        `${c.cyan}NAME${c.reset}`,
        `  ping — send ICMP packets to a host`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  ping <host>`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Sends fake ICMP packets and shows response times.`,
        `  Known hosts: slashdot, iiser, localhost, google.com`,
        '',
        `${c.cyan}EXAMPLES${c.reset}`,
        `  ping slashdot        ping SlashDot server`,
        `  ping iiser           ping IISER server`,
        `  ping google.com      ping Google`,
      ],
      neofetch: [
        `${c.cyan}NAME${c.reset}`,
        `  neofetch — display system information`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  neofetch`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Displays system info alongside ASCII art.`,
        `  Shows OS, batch, terminal, theme, and color palette.`,
        `  Also displays official IISER Kolkata and SlashDot logos.`,
      ],
      theme: [
        `${c.cyan}NAME${c.reset}`,
        `  theme — switch terminal color theme`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  theme <name>`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Changes the terminal accent color and prompt color.`,
        '',
        `${c.cyan}AVAILABLE THEMES${c.reset}`,
        `  green    Terminal Green (default)`,
        `  amber    Phosphor Amber`,
        `  blue     Cyan Blue`,
        `  red      Red Alert`,
        `  purple   Purple Haze`,
      ],
      vim: [
        `${c.cyan}NAME${c.reset}`,
        `  vim — fake text editor`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  vim [file]`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Opens a file in the fake vim editor.`,
        `  You cannot actually edit anything. This is a fake OS.`,
        '',
        `${c.cyan}COMMANDS${c.reset}`,
        `  :q     quit vim`,
        `  :wq    save and quit`,
        `  :wq!   force save and quit`,
        `  :q!    discard and quit`,
        '',
        `${c.cyan}KNOWN FILES${c.reset}`,
        `  about.txt    README.md    untitled`,
      ],
      ssh: [
        `${c.cyan}NAME${c.reset}`,
        `  ssh — fake secure shell client`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  ssh <user>@<host>`,
        '',
        `${c.cyan}DESCRIPTION${c.reset}`,
        `  Connects to a remote server over SSH (fake).`,
        `  Only iiserkol and 25ms hosts are supported.`,
        '',
        `${c.cyan}EXAMPLES${c.reset}`,
        `  ssh batch@iiserkol   connect to IISER server`,
        `  ssh batch@25ms       same as above`,
      ],
      git: [
        `${c.cyan}NAME${c.reset}`,
        `  git — fake version control`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  git <command>`,
        '',
        `${c.cyan}COMMANDS${c.reset}`,
        `  git log      show commit history`,
        `  git blame    blame someone for bugs`,
        `  git status   show working tree status`,
        `  git commit   record changes (fake)`,
        `  git push     push to remote (fake)`,
      ],
      open: [
        `${c.cyan}NAME${c.reset}`,
        `  open — open an application window`,
        '',
        `${c.cyan}SYNOPSIS${c.reset}`,
        `  open <app>`,
        '',
        `${c.cyan}AVAILABLE APPS${c.reset}`,
        `  home      Homepage`,
        `  about     About page`,
        `  team      Team page`,
        `  stack     Tech stack`,
        `  contact   Contact page`,
        `  clock     Clock app`,
      ],
    }

    if (!cmd) {
      return {
        output: [
          '',
          `${c.cyan}What manual page do you want?${c.reset}`,
          `${c.gray}Available: ${Object.keys(pages).join(', ')}${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }

    const page = pages[cmd]
    if (!page) {
      return {
        output: [
          '',
          `${c.red}No manual entry for ${cmd}${c.reset}`,
          `${c.gray}Available: ${Object.keys(pages).join(', ')}${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }

    return {
      output: [
        '',
        `${c.gray}SLASHDOT OS MANUAL — ${cmd.toUpperCase()}${c.reset}`,
        `${c.gray}${'─'.repeat(40)}${c.reset}`,
        '',
        ...page.map(l => `  ${l}`),
        '',
        `${c.gray}${'─'.repeat(40)}${c.reset}`,
        `${c.gray}SlashDot OS Manual  April 2026${c.reset}`,
        '',
      ].join('\r\n'),
    }
  },

  history: (): CommandResult => {
    const hist = ((window as any).__slashdotHistory as string[]) ?? []
    if (hist.length === 0) {
      return { output: `\r\n${c.gray}No commands in history yet.${c.reset}\r\n` }
    }
    return {
      output: [
        '',
        ...hist
          .slice()
          .reverse()
          .map((cmd: string, i: number) =>
            `  ${c.gray}${String(i + 1).padStart(3)}${c.reset}  ${c.white}${cmd}${c.reset}`
          ),
        '',
      ].join('\r\n'),
    }
  },

  ping: (args: string[]): CommandResult => {
    const host = args[0] || 'slashdot.iiserkol.ac.in'
    const knownHosts: Record<string, string> = {
      'slashdot.iiserkol.ac.in': '10.0.0.1',
      'slashdot':                '10.0.0.1',
      'iiserkol.ac.in':          '10.0.0.2',
      'iiser':                   '10.0.0.2',
      'localhost':               '127.0.0.1',
      '127.0.0.1':               '127.0.0.1',
      'google.com':              '142.250.195.46',
      'github.com':              '140.82.121.4',
    }
    const ip = knownHosts[host.toLowerCase()] ?? '192.168.1.1'
    const times = Array.from({ length: 4 }, () =>
      (Math.random() * 2 + 0.2).toFixed(3)
    )
    const avg = (times.reduce((a, b) => a + parseFloat(b), 0) / times.length).toFixed(3)
    return {
      output: [
        '',
        `${c.cyan}PING ${host} (${ip}) 56(84) bytes of data.${c.reset}`,
        ...times.map((t, i) =>
          `${c.white}64 bytes from ${ip}: icmp_seq=${i + 1} ttl=64 time=${t} ms${c.reset}`
        ),
        '',
        `${c.gray}--- ${host} ping statistics ---${c.reset}`,
        `${c.white}4 packets transmitted, 4 received, ${c.green}0% packet loss${c.reset}`,
        `${c.white}rtt min/avg/max = ${Math.min(...times.map(Number)).toFixed(3)}/${avg}/${Math.max(...times.map(Number)).toFixed(3)} ms${c.reset}`,
        '',
      ].join('\r\n'),
    }
  },

  // ── FULLSCREEN ──────────────────────────────────────────────────────────────
  fullscreen: (): CommandResult => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
      return {
        output: [
          '',
          `${c.green}✓ Entering fullscreen mode...${c.reset}`,
          `${c.gray}Type 'exit-fullscreen' or press Esc to exit.${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }
    return {
      output: `\r\n${c.red}Fullscreen not supported in this browser.${c.reset}\r\n`,
    }
  },

  'exit-fullscreen': (): CommandResult => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return {
        output: [
          '',
          `${c.yellow}Exiting fullscreen mode...${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }
    return {
      output: `\r\n${c.gray}Not currently in fullscreen mode.${c.reset}\r\n`,
    }
  },

  // ── TOGGLE FULLSCREEN ───────────────────────────────────────────────────────
  'toggle-fullscreen': (): CommandResult => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      return {
        output: `\r\n${c.green}✓ Fullscreen on${c.reset}\r\n`,
      }
    } else {
      document.exitFullscreen()
      return {
        output: `\r\n${c.yellow}Fullscreen off${c.reset}\r\n`,
      }
    }
  },
}
