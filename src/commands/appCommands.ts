import { CommandHandler } from '../types'
import { c, formatHeader, formatTable, formatSection } from '../utils/formatOutput'
import { NEOFETCH_ART } from '../utils/asciiArt'
import { teamMembers } from '../data/team'
import { techStack } from '../data/techStack'

export const appCommands: Record<string, CommandHandler> = {
  neofetch: () => ({
    output: [
      '',
      `${c.cyan}${NEOFETCH_ART}${c.reset}`,
      formatTable([
        ['OS',       'SlashDot OS 2026.1-LTS'],
        ['Batch',    '25MS — IISER Kolkata'],
        ['Club',     'SlashDot Programming & Design Club'],
        ['Shell',    'slashdot-sh 2026'],
        ['Terminal', 'xterm.js 5.3'],
        ['Theme',    'Terminal Green on Void Black'],
        ['Icons',    'ASCII Art Pack v3'],
        ['CPU',      'Brain @ 3.0GHz (caffeine-cooled)'],
        ['Memory',   '8GB (4GB used by browser tabs)'],
        ['Uptime',   'Since March 22, 2026'],
      ]),
      '',
      `  ${c.green}███${c.reset}${c.cyan}███${c.reset}${c.yellow}███${c.reset}${c.magenta}███${c.reset}${c.red}███${c.reset}${c.white}███${c.reset}`,
      '',
    ].join('\r\n'),
  }),

  open: (args) => {
    const target = args[0]?.toLowerCase()
    const appMap: Record<string, { appId: string; title: string; preview: string }> = {
      home:    { appId: 'home',    title: 'home.exe',    preview: 'Opening homepage...' },
      clock:     { appId: 'clock',     title: 'clock.app',     preview: 'Opening clock...' },
      asteroids: { appId: 'asteroids', title: 'asteroids.exe', preview: 'Loading Asteroids...' },
      pong:      { appId: 'pong',      title: 'pong.exe',         preview: 'Loading Pong...' },
      periodic:  { appId: 'periodic',  title: 'periodic.app',     preview: 'Loading Periodic Table...' },
      fourier:   { appId: 'fourier',   title: 'fourier.app',      preview: 'Loading Fourier Visualizer...' },
      gravity:   { appId: 'gravity',   title: 'gravity.app',      preview: 'Loading Gravity Simulator...' },
      dna:       { appId: 'dna',       title: 'dna.app',          preview: 'Loading DNA Viewer...' },
      grapher:   { appId: 'grapher',   title: 'grapher.app',      preview: 'Loading Graph Plotter...' },
      guestbook: { appId: 'guestbook', title: 'guestbook.app',    preview: 'Loading Guestbook...' },
      poll:      { appId: 'poll',      title: 'poll.app',         preview: 'Loading Poll...' },
      jokes:     { appId: 'jokes',     title: 'jokes.app',        preview: 'Loading Jokes...' },
      slashdotai:   { appId: 'slashdotai',   title: 'slashdot-ai.app',  preview: 'Booting SlashDot AI...' },
      'matrix-calc':{ appId: 'matrix-calc',  title: 'matrix.app',       preview: 'Loading Matrix Calculator...' },
      physics:      { appId: 'physics',      title: 'physics.app',      preview: 'Loading Physics Simulator...' },
      molecular:    { appId: 'molecular',    title: 'molecular.app',    preview: 'Loading Molecular Viewer...' },
      gameoflife:   { appId: 'gameoflife',   title: 'life.exe',         preview: 'Loading Game of Life...' },
      typing:       { appId: 'typing',       title: 'typing.exe',       preview: 'Loading Typing Test...' },
      achievements: { appId: 'achievements', title: 'achievements.app', preview: 'Loading Achievements...' },
      flappy:       { appId: 'flappy',       title: 'flappy.exe',       preview: 'Loading Flappy Bracket...' },
      dungeon:      { appId: 'dungeon',      title: 'dungeon.exe',        preview: 'Generating dungeon...'     },
      fileexplorer: { appId: 'fileexplorer', title: 'files.app',          preview: 'Loading File Explorer...'  },
      settings:     { appId: 'settings',     title: 'settings.app',       preview: 'Loading Settings...'       },
      snake:        { appId: 'snake',        title: 'snake.exe',          preview: 'Loading Snake...'          },
      notepad:      { appId: 'notepad',      title: 'notepad.app',        preview: 'Loading Notepad...'        },
      taskmanager:  { appId: 'taskmanager',   title: 'taskmanager.app',  preview: 'Loading Task Manager...'    },
      jsonformat:   { appId: 'jsonformat',    title: 'json.app',         preview: 'Loading JSON Formatter...'  },
      base64:       { appId: 'base64',        title: 'base64.app',       preview: 'Loading Base64...'          },
      markdown:     { appId: 'markdown',      title: 'markdown.app',     preview: 'Loading Markdown...'        },
      colorpicker:  { appId: 'colorpicker',   title: 'color.app',        preview: 'Loading Color Picker...'   },
      passgen:      { appId: 'passgen',       title: 'passgen.app',      preview: 'Loading Password Gen...'    },
      diffview:     { appId: 'diffview',      title: 'diff.app',         preview: 'Loading Diff Viewer...'     },
      coderunner:   { appId: 'coderunner',    title: 'code.app',         preview: 'Loading Code Runner...'     },
      lorem:        { appId: 'lorem',         title: 'lorem.app',        preview: 'Loading Lorem Ipsum...'     },
      hashgen:      { appId: 'hashgen',       title: 'hash.app',         preview: 'Loading Hash Generator...'  },
      paint:        { appId: 'paint',         title: 'paint.app',        preview: 'Loading Paint...'           },
      asciiart:     { appId: 'asciiart',      title: 'ascii.app',        preview: 'Loading ASCII Art...'       },
      pixelart:     { appId: 'pixelart',      title: 'pixel.app',        preview: 'Loading Pixel Art...'       },
      calendar:     { appId: 'calendar',      title: 'calendar.app',     preview: 'Loading Calendar...'        },
      pomodoro:     { appId: 'pomodoro',      title: 'pomodoro.app',     preview: 'Loading Pomodoro...'        },
      stopwatch:    { appId: 'stopwatch',     title: 'stopwatch.app',    preview: 'Loading Stopwatch...'       },
      currency:     { appId: 'currency',      title: 'currency.app',     preview: 'Loading Currency...'        },
      bmi:          { appId: 'bmi',           title: 'bmi.app',          preview: 'Loading BMI Calc...'        },
      agecalc:      { appId: 'agecalc',       title: 'age.app',          preview: 'Loading Age Calc...'        },
      habittracker: { appId: 'habittracker',  title: 'habits.app',       preview: 'Loading Habit Tracker...'   },
      newsticker:   { appId: 'newsticker',    title: 'news.app',         preview: 'Loading News Ticker...'     },
      leaderboard:  { appId: 'leaderboard',   title: 'leaderboard.app',  preview: 'Loading Leaderboard...'     },
      githubstats:  { appId: 'githubstats',   title: 'github.app',       preview: 'Fetching GitHub stats...'   },
      wikipedia:    { appId: 'wikipedia',     title: 'wiki.app',         preview: 'Loading Wikipedia...'       },
      tamagotchi:   { appId: 'tamagotchi',    title: 'tamagotchi.app',   preview: 'Loading Tamagotchi...'      },
      stocks:       { appId: 'stocks',        title: 'stocks.app',       preview: 'Loading Stocks...'          },
      horoscope:    { appId: 'horoscope',     title: 'horoscope.app',    preview: 'Loading Horoscope...'       },
      lovecalc:     { appId: 'lovecalc',      title: 'love.app',         preview: 'Loading Love Calc...'       },
      magic8:       { appId: 'magic8',        title: 'magic8.app',       preview: 'Loading Magic 8-Ball...'    },
      deployed:     { appId: 'deployed',      title: 'deployed.app',     preview: 'Checking deployment...'     },
      about:   { appId: 'about',   title: 'about.txt',   preview: 'Opening about page...' },
      team:    { appId: 'team',    title: 'team.db',     preview: 'Loading team roster...' },
      stack:   { appId: 'stack',   title: 'stack.log',   preview: 'Reading stack.log...' },
      contact: { appId: 'contact', title: 'contact.sh',  preview: 'Executing contact.sh...' },
    }

    if (!target || !appMap[target]) {
      return {
        output: [
          '',
          `${c.red}open: unknown application '${target}'${c.reset}`,
          `${c.gray}Available: ${Object.keys(appMap).join(', ')}${c.reset}`,
          '',
        ].join('\r\n'),
      }
    }

    const app = appMap[target]
    return {
      output: `\r\n${c.green}▶ ${app.preview}${c.reset}\r\n`,
      action: { type: 'open_window', appId: app.appId as any, title: app.title },
    }
  },

  // Shorthand aliases
  'cat about.txt': () => appCommands['open'](['about']),
  'ls team':       () => appCommands['open'](['team']),
  './contact.sh':  () => appCommands['open'](['contact']),

  // Inline team listing
  team: () => ({
    output: [
      '',
      formatHeader('25MS Team Roster'),
      '',
      ...teamMembers.map((m, i) =>
        [
          `  ${c.cyan}[${String(i + 1).padStart(2, '0')}]${c.reset} ${c.bold}${c.yellow}${m.name}${c.reset}`,
          `       ${c.gray}Role:${c.reset} ${c.white}${m.role}${c.reset}`,
          m.github ? `       ${c.gray}GitHub:${c.reset} ${c.cyan}@${m.github}${c.reset}` : '',
          `       ${c.gray}Fun fact:${c.reset} ${c.white}${m.fun_fact}${c.reset}`,
          '',
        ].filter(Boolean).join('\r\n')
      ),
    ].join('\r\n'),
    action: { type: 'open_window', appId: 'team', title: 'team.db' },
  }),

  stack: () => ({
    output: [
      '',
      formatHeader('Tech Stack — stack.log'),
      '',
      ...(['frontend', 'language', 'library', 'tooling'] as const).map(cat =>
        formatSection(cat.toUpperCase(), techStack
          .filter(t => t.category === cat)
          .map(t => `${c.cyan}${t.name}${t.version ? ` v${t.version}` : ''}${c.reset}  ${c.gray}${t.description}${c.reset}`)
        )
      ),
      '',
    ].join('\r\n'),
    action: { type: 'open_window', appId: 'stack', title: 'stack.log' },
  }),
}
