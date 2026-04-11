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
      home:        { appId: 'home',        title: 'home.exe',         preview: 'Opening homepage...'          },
      about:       { appId: 'about',       title: 'about.txt',        preview: 'Opening about page...'        },
      team:        { appId: 'team',        title: 'team.db',          preview: 'Loading team roster...'       },
      stack:       { appId: 'stack',       title: 'stack.log',        preview: 'Reading stack.log...'         },
      contact:     { appId: 'contact',     title: 'contact.sh',       preview: 'Executing contact.sh...'      },
      clock:       { appId: 'clock',       title: 'clock.app',        preview: 'Opening clock...'             },
      asteroids:   { appId: 'asteroids',   title: 'asteroids.exe',    preview: 'Loading Asteroids...'         },
      pong:        { appId: 'pong',        title: 'pong.exe',         preview: 'Loading Pong...'              },
      flappy:      { appId: 'flappy',      title: 'flappy.exe',       preview: 'Loading Flappy Bracket...'    },
      snake:       { appId: 'snake',       title: 'snake.exe',        preview: 'Loading Snake...'             },
      periodic:    { appId: 'periodic',    title: 'periodic.app',     preview: 'Loading Periodic Table...'    },
      fourier:     { appId: 'fourier',     title: 'fourier.app',      preview: 'Loading Fourier Visualizer...' },
      gravity:     { appId: 'gravity',     title: 'gravity.app',      preview: 'Loading Gravity Simulator...' },
      dna:         { appId: 'dna',         title: 'dna.app',          preview: 'Loading DNA Viewer...'        },
      physics:     { appId: 'physics',     title: 'physics.app',      preview: 'Loading Physics Simulator...' },
      molecular:   { appId: 'molecular',   title: 'molecular.app',    preview: 'Loading Molecular Viewer...'  },
      sortvis:     { appId: 'sortvis',     title: 'sort.app',         preview: 'Loading Sort Visualizer...'   },
      pathvis:     { appId: 'pathvis',     title: 'path.app',         preview: 'Loading Pathfinder...'        },
      binconv:     { appId: 'binconv',     title: 'binconv.app',      preview: 'Loading Converter...'         },
      truthtable:  { appId: 'truthtable',  title: 'truth.app',        preview: 'Loading Truth Table...'       },
      statsCalc:   { appId: 'statsCalc',   title: 'stats.app',        preview: 'Loading Statistics...'        },
      fibprime:    { appId: 'fibprime',    title: 'fib.app',          preview: 'Loading Fib/Prime...'         },
      logicgate:   { appId: 'logicgate',   title: 'logic.app',        preview: 'Loading Logic Gates...'       },
      isstrack:    { appId: 'isstrack',    title: 'iss.app',          preview: 'Tracking ISS...'              },
      apod:        { appId: 'apod',        title: 'apod.app',         preview: 'Loading APOD...'              },
      ipgeo:       { appId: 'ipgeo',       title: 'ip.app',           preview: 'Loading IP Lookup...'         },
      randuser:    { appId: 'randuser',    title: 'user.app',         preview: 'Loading User Generator...'    },
      guestbook:   { appId: 'guestbook',   title: 'guestbook.app',    preview: 'Loading Guestbook...'         },
      poll:        { appId: 'poll',        title: 'poll.app',         preview: 'Loading Poll...'              },
      jokes:       { appId: 'jokes',       title: 'jokes.app',        preview: 'Loading Jokes...'             },
      slashdotai:  { appId: 'slashdotai',  title: 'slashdot-ai.app',  preview: 'Booting SlashDot AI...'       },
      newsticker:  { appId: 'newsticker',  title: 'news.app',         preview: 'Loading News Ticker...'       },
       memberlist:  { appId: 'memberlist',  title: 'members.app',     preview: 'Loading Members...'           },
      recruitment: { appId: 'recruitment', title: 'recruit.app',     preview: 'Loading Recruitment...'       },
      alumni:      { appId: 'alumni',      title: 'alumni.app',      preview: 'Loading Alumni...'            },
      gallery:     { appId: 'gallery',     title: 'gallery.app',     preview: 'Loading Gallery...'           },
      contactform: { appId: 'contactform', title: 'contactform.app', preview: 'Loading Contact Form...'      },
      leaderboard: { appId: 'leaderboard', title: 'leaderboard.app',  preview: 'Loading Leaderboard...'       },
      githubstats: { appId: 'githubstats', title: 'github.app',       preview: 'Fetching GitHub stats...'     },
      wikipedia:   { appId: 'wikipedia',   title: 'wiki.app',         preview: 'Loading Wikipedia...'         },
      horoscope:   { appId: 'horoscope',   title: 'horoscope.app',    preview: 'Loading Horoscope...'         },
      excusegen:   { appId: 'excusegen',   title: 'excuse.app',       preview: 'Generating Excuse...'         },
      screensaver: { appId: 'screensaver', title: 'screen.app',       preview: 'Loading Screensaver...'       },
      fortunecook: { appId: 'fortunecook', title: 'fortune.app',      preview: 'Opening Fortune Cookie...'    },
      kbtrainer:   { appId: 'kbtrainer',   title: 'kb.app',           preview: 'Loading KB Trainer...'        },
      syslog:      { appId: 'syslog',      title: 'syslog.app',       preview: 'Loading System Logs...'       },
      clipboard:   { appId: 'clipboard',   title: 'clipboard.app',    preview: 'Loading Clipboard...'         },
      cgpasim:     { appId: 'cgpasim',     title: 'cgpa.app',         preview: 'Loading CGPA Sim...'          },
      insult:      { appId: 'insult',      title: 'insult.app',       preview: 'Loading Roasts...'            },
      compliment:  { appId: 'compliment',  title: 'compliment.app',   preview: 'Loading Compliments...'       },
      faketwitter: { appId: 'faketwitter', title: 'twitter.app',      preview: 'Loading Twitter...'           },
      fakewhatsapp:{ appId: 'fakewhatsapp',title: 'whatsapp.app',     preview: 'Loading WhatsApp...'          },
      confession:  { appId: 'confession',  title: 'confess.app',      preview: 'Loading Confessions...'       },
      base64:      { appId: 'base64',      title: 'base64.app',       preview: 'Loading Base64...'            },
      markdown:    { appId: 'markdown',    title: 'markdown.app',     preview: 'Loading Markdown...'          },
      colorpicker: { appId: 'colorpicker', title: 'color.app',        preview: 'Loading Color Picker...'      },
      hashgen:     { appId: 'hashgen',     title: 'hash.app',         preview: 'Loading Hash Generator...'    },
      paint:       { appId: 'paint',       title: 'paint.app',        preview: 'Loading Paint...'             },
      asciiart:    { appId: 'asciiart',    title: 'ascii.app',        preview: 'Loading ASCII Art...'         },
      calendar:    { appId: 'calendar',    title: 'calendar.app',     preview: 'Loading Calendar...'          },
      pomodoro:    { appId: 'pomodoro',    title: 'pomodoro.app',     preview: 'Loading Pomodoro...'          },
      stopwatch:   { appId: 'stopwatch',   title: 'stopwatch.app',    preview: 'Loading Stopwatch...'         },
      countdown:   { appId: 'countdown',   title: 'count.app',        preview: 'Loading Countdown...'         },
      mealgent:    { appId: 'mealgent',    title: 'meal.app',         preview: 'Generating Meal...'           },
      studysched:  { appId: 'studysched',  title: 'study.app',        preview: 'Loading Study Schedule...'    },
      flashcard:   { appId: 'flashcard',   title: 'flash.app',        preview: 'Loading Flashcards...'        },
      fileexplorer:{ appId: 'fileexplorer',title: 'files.app',        preview: 'Loading File Explorer...'     },
      settings:    { appId: 'settings',    title: 'settings.app',     preview: 'Loading Settings...'          },
      notepad:     { appId: 'notepad',     title: 'notepad.app',      preview: 'Loading Notepad...'           },
      taskmanager: { appId: 'taskmanager', title: 'taskmanager.app',  preview: 'Loading Task Manager...'      },
      events:      { appId: 'events',      title: 'events.app',       preview: 'Loading Events...'            },
      showcase:    { appId: 'showcase',    title: 'showcase.app',     preview: 'Loading Showcase...'          },
      blog:        { appId: 'blog',        title: 'blog.app',         preview: 'Loading Blog...'              },
      resources:   { appId: 'resources',   title: 'resources.app',    preview: 'Loading Resources...'         },
      halloffame:  { appId: 'halloffame',  title: 'fame.app',         preview: 'Loading Hall of Fame...'      },
      rules:       { appId: 'rules',       title: 'rules.app',        preview: 'Loading Constitution...'      },
      newsletter:  { appId: 'newsletter',  title: 'newsletter.app',   preview: 'Loading Newsletter...'        },
      githubcontrib: { appId: 'githubcontrib', title: 'github-contrib.app', preview: 'Loading GitHub Activity...'   },
      todayincs:     { appId: 'todayincs',     title: 'cs-history.app',    preview: 'Loading CS History...'        },
      hackernews:    { appId: 'hackernews',    title: 'hackernews.app',    preview: 'Loading Hacker News...'       },
      wikirandom:    { appId: 'wikirandom',    title: 'wiki-random.app',   preview: 'Loading Wikipedia...'         },
      campusmap:     { appId: 'campusmap',     title: 'campus-map.app',    preview: 'Loading Campus Map...'        },
      lhcrooms:      { appId: 'lhcrooms',      title: 'lhc-rooms.app',     preview: 'Loading LHC Room Status...'   },
      timetable:     { appId: 'timetable',     title: 'timetable.app',     preview: 'Loading Timetable...'         },
      roadmap:       { appId: 'roadmap',       title: 'roadmap.app',       preview: 'Loading Roadmap...'           },
      slashdotfaq:   { appId: 'slashdotfaq',   title: 'slashdot-faq.app',  preview: 'Loading FAQ Bot...'           },
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
