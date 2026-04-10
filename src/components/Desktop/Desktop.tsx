import { useState, useEffect, useRef } from 'react'
import { AppId, WindowState } from '../../types'
import { toggleMute, isMuted } from '../../utils/sounds'
import { Particles } from './Particles'
import { DesktopRain } from './DesktopRain'
import './Desktop.css'

interface DesktopIcon {
  appId: AppId
  title: string
  label: string
  icon: string
}

const LEFT_ICONS: DesktopIcon[] = [
  // Row 1 — Games
  { appId: 'asteroids',   title: 'asteroids.exe',    label: 'Asteroids',   icon: '🚀'  },
  { appId: 'pong',        title: 'pong.exe',         label: 'Pong',        icon: '🏓'  },
  { appId: 'flappy',      title: 'flappy.exe',       label: 'Flappy {',   icon: '{}'  },
  { appId: 'snake',       title: 'snake.exe',        label: 'Snake',       icon: '🐍'  },
  { appId: 'dungeon',     title: 'dungeon.exe',      label: 'Dungeon',     icon: '⚔'   },
  { appId: 'gameoflife',  title: 'life.exe',         label: "Conway's",   icon: '🔲'  },
  { appId: 'typing',      title: 'typing.exe',       label: 'Typing',      icon: '⌨'   },
  // Row 2 — Science
  { appId: 'periodic',    title: 'periodic.app',     label: 'Periodic',    icon: '⚗'   },
  { appId: 'fourier',     title: 'fourier.app',      label: 'Fourier',     icon: '〜'  },
  { appId: 'gravity',     title: 'gravity.app',      label: 'Gravity',     icon: '🪐'  },
  { appId: 'dna',         title: 'dna.app',          label: 'DNA',         icon: '🧬'  },
  { appId: 'grapher',     title: 'grapher.app',      label: 'Grapher',     icon: 'f(x)'},
  { appId: 'physics',     title: 'physics.app',      label: 'Physics',     icon: '⚛'   },
  { appId: 'molecular',   title: 'molecular.app',    label: 'Molecule',    icon: '🔬'  },
  { appId: 'matrix-calc', title: 'matrix.app',       label: 'Matrix',      icon: '[M]' },
  { appId: 'sortvis',     title: 'sort.app',         label: 'Sort Vis',    icon: '⟨⟩'  },
  { appId: 'pathvis',     title: 'path.app',         label: 'Pathfind',    icon: '🗺'  },
  { appId: 'binconv',     title: 'binconv.app',      label: 'BinConv',     icon: '01'  },
  { appId: 'truthtable',  title: 'truth.app',        label: 'Truth Tbl',   icon: '⊕'   },
  { appId: 'eqsolver',    title: 'eq.app',           label: 'Eq Solver',   icon: '∑'   },
  { appId: 'mandelbrot',  title: 'mandel.app',       label: 'Mandelbrot',  icon: '🌀'  },
  { appId: 'cellaut',     title: 'cell.app',         label: 'Cell Aut',    icon: '⬛'  },
  { appId: 'statsCalc',   title: 'stats.app',        label: 'Statistics',  icon: 'σ'   },
  { appId: 'fibprime',    title: 'fib.app',          label: 'Fib/Prime',   icon: 'φ'   },
  { appId: 'logicgate',   title: 'logic.app',        label: 'Logic Gate',  icon: '⋀'   },
  // Row 3 — Dev Tools
  { appId: 'jsonformat',  title: 'json.app',         label: 'JSON',        icon: '{ }' },
  { appId: 'base64',      title: 'base64.app',       label: 'Base64',      icon: 'b64' },
  { appId: 'markdown',    title: 'markdown.app',     label: 'Markdown',    icon: '.md' },
  { appId: 'colorpicker', title: 'color.app',        label: 'Colors',      icon: '🎨'  },
  { appId: 'passgen',     title: 'passgen.app',      label: 'PassGen',     icon: '🔑'  },
  { appId: 'diffview',    title: 'diff.app',         label: 'Diff',        icon: '±'   },
  { appId: 'coderunner',  title: 'code.app',         label: 'Code',        icon: '▶'   },
  { appId: 'lorem',       title: 'lorem.app',        label: 'Lorem',       icon: 'Aa'  },
  { appId: 'hashgen',     title: 'hash.app',         label: 'Hash',        icon: '#'   },
  // Row 4 — Creative
  { appId: 'paint',       title: 'paint.app',        label: 'Paint',       icon: '🖌'  },
  { appId: 'asciiart',    title: 'ascii.app',        label: 'ASCII Art',   icon: 'A'   },
  { appId: 'pixelart',    title: 'pixel.app',        label: 'Pixel Art',   icon: '🟦'  },
  // Row 5 — API / Live
  { appId: 'isstrack',    title: 'iss.app',          label: 'ISS Track',   icon: '🛸'  },
  { appId: 'apod',        title: 'apod.app',         label: 'APOD',        icon: '🔭'  },
  { appId: 'bookSearch',  title: 'books.app',        label: 'Books',       icon: '📚'  },
  { appId: 'exchRate',    title: 'rates.app',        label: 'Ex Rates',    icon: '💹'  },
  { appId: 'ipgeo',       title: 'ip.app',           label: 'IP Lookup',   icon: '🌐'  },
  { appId: 'randuser',    title: 'user.app',         label: 'Rand User',   icon: '👤'  },
  { appId: 'githubstats', title: 'github.app',       label: 'GitHub',      icon: '🐙'  },
  { appId: 'wikipedia',   title: 'wiki.app',         label: 'Wikipedia',   icon: 'W'   },
  // Row 6 — Productivity
  { appId: 'calendar',    title: 'calendar.app',     label: 'Calendar',    icon: '📅'  },
  { appId: 'pomodoro',    title: 'pomodoro.app',     label: 'Pomodoro',    icon: '🍅'  },
  { appId: 'stopwatch',   title: 'stopwatch.app',    label: 'Stopwatch',   icon: '⏱'  },
  { appId: 'currency',    title: 'currency.app',     label: 'Currency',    icon: '💱'  },
  { appId: 'bmi',         title: 'bmi.app',          label: 'BMI',         icon: '⚖'   },
  { appId: 'agecalc',     title: 'age.app',          label: 'Age Calc',    icon: '🎂'  },
  { appId: 'habittracker',title: 'habits.app',       label: 'Habits',      icon: '✅'  },
  { appId: 'flashcard',   title: 'flash.app',        label: 'Flashcards',  icon: '🃏'  },
  { appId: 'budget',      title: 'budget.app',       label: 'Budget',      icon: '💰'  },
  { appId: 'recipe',      title: 'recipe.app',       label: 'Recipes',     icon: '🍜'  },
  { appId: 'countdown',   title: 'count.app',        label: 'Countdown',   icon: '⏳'  },
  { appId: 'mealgent',    title: 'meal.app',         label: 'Meal Gen',    icon: '🍱'  },
  { appId: 'studysched',  title: 'study.app',        label: 'Study Sched', icon: '📋'  },
  { appId: 'notepad',     title: 'notepad.app',      label: 'Notepad',     icon: '📝'  },
  // Row 7 — Social & Fun
  { appId: 'guestbook',   title: 'guestbook.app',    label: 'Guestbook',   icon: '📖'  },
  { appId: 'poll',        title: 'poll.app',         label: 'Poll',        icon: '📊'  },
  { appId: 'jokes',       title: 'jokes.app',        label: 'Jokes',       icon: '😂'  },
  { appId: 'slashdotai',  title: 'slashdot-ai.app',  label: 'AI Chat',     icon: '🤖'  },
  { appId: 'newsticker',  title: 'news.app',         label: 'News',        icon: '📰'  },
  { appId: 'leaderboard', title: 'leaderboard.app',  label: 'Leaderboard', icon: '🏆'  },
  { appId: 'faketwitter', title: 'twitter.app',      label: 'Twitter',     icon: '🐦'  },
  { appId: 'fakewhatsapp',title: 'whatsapp.app',     label: 'WhatsApp',    icon: '💬'  },
  { appId: 'confession',  title: 'confess.app',      label: 'Confessions', icon: '🤫'  },
  { appId: 'compliment',  title: 'compliment.app',   label: 'Compliments', icon: '💐'  },
  { appId: 'insult',      title: 'insult.app',       label: 'Roasts',      icon: '🔥'  },
  { appId: 'debate',      title: 'debate.app',       label: 'Debate',      icon: '⚖'   },
  { appId: 'tamagotchi',  title: 'tamagotchi.app',   label: 'Tamagotchi',  icon: '🐣'  },
  { appId: 'stocks',      title: 'stocks.app',       label: 'Stocks',      icon: '📈'  },
  { appId: 'horoscope',   title: 'horoscope.app',    label: 'Horoscope',   icon: '♈'  },
  { appId: 'lovecalc',    title: 'love.app',         label: 'Love Calc',   icon: '❤'   },
  { appId: 'magic8',      title: 'magic8.app',       label: 'Magic 8',     icon: '🎱'  },
  { appId: 'linuscall',   title: 'linus.app',        label: 'Linus Call',  icon: '📞'  },
  { appId: 'cgpasim',     title: 'cgpa.app',         label: 'CGPA Sim',    icon: '📊'  },
  { appId: 'ratemycode',  title: 'rate.app',         label: 'Rate Code',   icon: '⭐'  },
  { appId: 'rickroll',    title: 'rick.app',         label: 'Rickroll',    icon: '🎵'  },
  { appId: 'excusegen',   title: 'excuse.app',       label: 'Excuses',     icon: '🙏'  },
  { appId: 'screensaver', title: 'screen.app',       label: 'Screensaver', icon: '✨'  },
  { appId: 'fakeload',    title: 'load.app',         label: 'Fake Load',   icon: '⏰'  },
  { appId: 'fortunecook', title: 'fortune.app',      label: 'Fortune',     icon: '🥠'  },
  { appId: 'fixbug',      title: 'fixbug.app',       label: 'Fix Bug',     icon: '🐛'  },
  { appId: 'deployed',    title: 'deployed.app',     label: 'Deployed?',   icon: '🚀'  },
  // Row 8 — OS Tools
  { appId: 'fileexplorer',title: 'files.app',        label: 'Files',       icon: '📁'  },
  { appId: 'taskmanager', title: 'taskmanager.app',  label: 'Task Mgr',    icon: '[%]' },
  { appId: 'settings',    title: 'settings.app',     label: 'Settings',    icon: '⚙'   },
  { appId: 'clock',       title: 'clock.app',        label: 'Clock',       icon: '⏰'  },
  { appId: 'achievements',title: 'achievements.app', label: 'Achievements',icon: '🏆'  },
  { appId: 'kbtrainer',   title: 'kb.app',           label: 'KB Trainer',  icon: '⌨'   },
  { appId: 'syslog',      title: 'syslog.app',       label: 'Sys Logs',    icon: '📜'  },
  { appId: 'clipboard',   title: 'clipboard.app',    label: 'Clipboard',   icon: '📋'  },
]

const RIGHT_ICONS: DesktopIcon[] = [
  { appId: 'terminal',    title: 'terminal.sh',      label: 'Terminal',    icon: '>_'  },
  { appId: 'home',        title: 'home.exe',         label: 'Home',        icon: '⌂'   },
  { appId: 'about',       title: 'about.txt',        label: 'About',       icon: '📄'  },
  { appId: 'team',        title: 'team.db',          label: 'Team',        icon: '👥'  },
  { appId: 'stack',       title: 'stack.log',        label: 'Tech Stack',  icon: '⚙'   },
  { appId: 'contact',     title: 'contact.sh',       label: 'Contact',     icon: '@'   },
  { appId: 'neofetch',    title: 'neofetch',         label: 'Neofetch',    icon: '🖥'  },
  { appId: 'events',      title: 'events.app',       label: 'Events',      icon: '📅'  },
  { appId: 'showcase',    title: 'showcase.app',     label: 'Showcase',    icon: '🌟'  },
]

const ICONS: DesktopIcon[] = [...LEFT_ICONS, ...RIGHT_ICONS]

interface ContextMenu {
  x: number
  y: number
}

interface IconPosition {
  x: number
  y: number
}

interface Props {
  windows: WindowState[]
  onOpenWindow: (appId: AppId, title: string) => void
  onFocusWindow: (id: string) => void
  onRestoreWindow: (id: string) => void
}

export function Desktop({ windows, onOpenWindow, onFocusWindow, onRestoreWindow }: Props) {
  const [time, setTime] = useState(new Date())
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)
  const [muted, setMuted] = useState(false)
  const [raining, setRaining] = useState(false)
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
 const [iconPositions, setIconPositions] = useState<Record<string, IconPosition>>(() => {
    const positions: Record<string, IconPosition> = {}

    // Left side — all apps in a tight grid
    const COL_W = 66
    const ROW_H = 72
    const LEFT_COLS = 8
    const LEFT_START_X = 4
    const LEFT_START_Y = 4

    LEFT_ICONS.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: LEFT_START_X + (i % LEFT_COLS) * COL_W,
        y: LEFT_START_Y + Math.floor(i / LEFT_COLS) * ROW_H,
      }
    })

    // Right side — club pages stacked vertically on far right
    const RIGHT_START_X = window.innerWidth - 82
    const RIGHT_START_Y = 4
    const RIGHT_ROW_H = 70

    RIGHT_ICONS.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: RIGHT_START_X,
        y: RIGHT_START_Y + i * RIGHT_ROW_H,
      }
    })

    return positions
  })
  const draggingIcon = useRef<{ appId: string; startX: number; startY: number; origX: number; origY: number } | null>(null)

  useEffect(function() {
    const t = setInterval(function() { setTime(new Date()) }, 1000)
    return function() { clearInterval(t) }
  }, [])

  useEffect(function() {
    const handler = function(e: Event) {
      const { code } = (e as CustomEvent).detail
      setRaining(code >= 51)
    }
    window.addEventListener('slashdot-weather', handler)
    return function() { window.removeEventListener('slashdot-weather', handler) }
  }, [])

  useEffect(function() {
    fetch('https://api.countapi.xyz/get/slashdot-os-25ms/visits')
      .then(function(r) { return r.json() })
      .then(function(d) { setVisitorCount(d.value ?? 0) })
      .catch(function() {})
  }, [])

  useEffect(function() {
    const handler = function(e: MouseEvent) {
      const menu = document.getElementById('context-menu')
      if (menu && !menu.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return function() { document.removeEventListener('mousedown', handler) }
  }, [])

  function handleRightClick(e: React.MouseEvent) {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  function handleMenuClick(action: () => void) {
    action()
    setContextMenu(null)
  }

  function handleMuteToggle() {
    const nowMuted = toggleMute()
    setMuted(nowMuted)
  }

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })

  const minimized = windows.filter(function(w) { return w.isMinimized })
  const open = windows.filter(function(w) { return !w.isMinimized })

  return (
    <div className="desktop" onContextMenu={handleRightClick}>
      <Particles />
      {raining && <DesktopRain intensity={80} />}
      <div className="scanlines" />

      {/* IISER Kolkata logo — bottom left above taskbar */}
      <div style={{
        position: 'fixed',
        bottom: 44,
        left: 16,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        opacity: 0.35,
        
        transition: 'opacity 0.2s',
      }}
        onMouseEnter={function(e) { (e.currentTarget as HTMLElement).style.opacity = '0.9' }}
        onMouseLeave={function(e) { (e.currentTarget as HTMLElement).style.opacity = '0.35' }}
      >
        <img src="./iiserkol_logo.png" alt="IISER Kolkata" style={{ width: 56, height: 'auto', filter: 'brightness(0.9)' }} />
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.05em' }}>IISER Kolkata</span>
      </div>

      {/* SlashDot logo — bottom right above taskbar */}
      <div style={{
        position: 'fixed',
        bottom: 44,
        right: 16,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        opacity: 0.35,
        
        transition: 'opacity 0.2s',
      }}
        onMouseEnter={function(e) { (e.currentTarget as HTMLElement).style.opacity = '0.9' }}
        onMouseLeave={function(e) { (e.currentTarget as HTMLElement).style.opacity = '0.35' }}
      >
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 80, height: 'auto', filter: 'brightness(0.9)' }} />
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.05em' }}>SlashDot Club</span>
      </div>

      <div className="desktop-icons-layer">
        {ICONS.map(function(icon) {
          const pos = iconPositions[icon.appId] ?? { x: 16, y: 16 }
          return (
            <button
              key={icon.appId}
              className="desktop-icon"
              style={{ position: 'fixed', left: pos.x, top: pos.y }}
              onDoubleClick={function() { onOpenWindow(icon.appId, icon.title) }}
              title={'Double-click to open ' + icon.label}
              onMouseDown={function(e) {
                e.stopPropagation()
                draggingIcon.current = {
                  appId: icon.appId,
                  startX: e.clientX,
                  startY: e.clientY,
                  origX: pos.x,
                  origY: pos.y,
                }
                const onMove = function(me: MouseEvent) {
                  if (!draggingIcon.current) return
                  const dx = me.clientX - draggingIcon.current.startX
                  const dy = me.clientY - draggingIcon.current.startY
                  setIconPositions(prev => ({
                    ...prev,
                    [draggingIcon.current!.appId]: {
                      x: Math.max(0, draggingIcon.current!.origX + dx),
                      y: Math.max(0, draggingIcon.current!.origY + dy),
                    }
                  }))
                }
                const onUp = function() {
                  draggingIcon.current = null
                  document.removeEventListener('mousemove', onMove)
                  document.removeEventListener('mouseup', onUp)
                }
                document.addEventListener('mousemove', onMove)
                document.addEventListener('mouseup', onUp)
              }}
            >
              <span className="desktop-icon-glyph">{icon.icon}</span>
              <span className="desktop-icon-label">{icon.label}</span>
            </button>
          )
        })}
      </div>

      {contextMenu && (
        <div
          id="context-menu"
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="context-menu-header">SlashDot OS</div>
          <div className="context-divider" />
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('terminal', 'terminal.sh') }) }}>
            <span className="context-icon">&gt;_</span> Open Terminal
          </button>
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('home', 'home.exe') }) }}>
            <span className="context-icon">⌂</span> Open Home
          </button>
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('about', 'about.txt') }) }}>
            <span className="context-icon">📄</span> Open About
          </button>
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('team', 'team.db') }) }}>
            <span className="context-icon">👥</span> Open Team
          </button>
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('stack', 'stack.log') }) }}>
            <span className="context-icon">⚙</span> Open Tech Stack
          </button>
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('contact', 'contact.sh') }) }}>
            <span className="context-icon">@</span> Open Contact
          </button>
          <div className="context-divider" />
          <button className="context-item" onClick={function() { handleMenuClick(function() { onOpenWindow('neofetch', 'neofetch') }) }}>
            <span className="context-icon">🖥</span> Neofetch
          </button>
          <div className="context-divider" />
          <button className="context-item" onClick={function() { handleMenuClick(function() { window.location.reload() }) }}>
            <span className="context-icon">↺</span> Refresh Desktop
          </button>
          <button className="context-item" onClick={function() {
            handleMenuClick(function() {
              const el = document.documentElement
              if (el.requestFullscreen) el.requestFullscreen()
            })
          }}>
            <span className="context-icon">⛶</span> Fullscreen
          </button>
          <div className="context-divider" />
          <div className="context-item disabled">
            <span className="context-icon">ℹ</span> SlashDot OS v2026.1
          </div>
          <div className="context-item disabled">
            <span className="context-icon">👤</span> 25MS — IISER Kolkata
          </div>
        </div>
      )}

      <div className="taskbar">
        <div className="taskbar-left">
          <button
            className="taskbar-logo"
            onClick={function() { onOpenWindow('terminal', 'terminal.sh') }}
            title="Open Terminal"
          >
            <span className="taskbar-logo-text">SlashDot</span>
            <span className="taskbar-logo-badge">OS</span>
          </button>
          <button
            className="taskbar-minimize-all"
            onClick={function() {
              windows.forEach(function(w) {
                if (!w.isMinimized) onFocusWindow(w.id)
              })
              const event = new CustomEvent('slashdot-minimize-all')
              window.dispatchEvent(event)
            }}
            title="Minimize all windows"
          >
            ▂
          </button>
        </div>

        <div className="taskbar-center">
          {open.map(function(w) {
            return (
              <button
                key={w.id}
                className={'taskbar-item' + (w.isFocused ? ' active' : '')}
                onClick={function() { onFocusWindow(w.id) }}
              >
                {w.title}
              </button>
            )
          })}
          {minimized.map(function(w) {
            return (
              <button
                key={w.id}
                className="taskbar-item minimized"
                onClick={function() { onRestoreWindow(w.id) }}
                title={'Restore ' + w.title}
              >
                {w.title}
              </button>
            )
          })}
        </div>

        <div className="taskbar-right">
          {visitorCount !== null && (
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#555' }} title="Total visitors">
              👥 {visitorCount}
            </span>
          )}
          <span className="taskbar-wifi">▲ IISER-WiFi</span>
          <span className="taskbar-battery">🔋 25%</span>
          <button
            className={'mute-btn' + (muted ? ' muted' : '')}
            onClick={handleMuteToggle}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <span className="taskbar-date">{dateStr}</span>
          <span className="taskbar-time">{timeStr}</span>
        </div>
      </div>
    </div>
  )
}