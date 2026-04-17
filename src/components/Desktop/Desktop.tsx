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
  // Games
  { appId: 'asteroids',   title: 'asteroids.exe',   label: 'Asteroids',   icon: '🚀' },
  { appId: 'pong',        title: 'pong.exe',         label: 'Pong',        icon: '🏓' },
  { appId: 'flappy',      title: 'flappy.exe',       label: 'Flappy {',   icon: '{}' },
  { appId: 'snake',       title: 'snake.exe',        label: 'Snake',       icon: '🐍' },
  // Science
  { appId: 'periodic',    title: 'periodic.app',     label: 'Periodic',    icon: '⚗'  },
  { appId: 'fourier',     title: 'fourier.app',      label: 'Fourier',     icon: '〜' },
  { appId: 'gravity',     title: 'gravity.app',      label: 'Gravity',     icon: '🪐' },
  { appId: 'dna',         title: 'dna.app',          label: 'DNA',         icon: '🧬' },
  { appId: 'physics',     title: 'physics.app',      label: 'Physics',     icon: '⚛'  },
  { appId: 'molecular',   title: 'molecular.app',    label: 'Molecule',    icon: '🔬' },
  { appId: 'sortvis',     title: 'sort.app',         label: 'Sort Vis',    icon: '⟨⟩' },
  { appId: 'pathvis',     title: 'path.app',         label: 'Pathfind',    icon: '🗺' },
  { appId: 'binconv',     title: 'binconv.app',      label: 'BinConv',     icon: '01' },
  { appId: 'truthtable',  title: 'truth.app',        label: 'Truth Tbl',   icon: '⊕'  },
  { appId: 'statsCalc',   title: 'stats.app',        label: 'Statistics',  icon: 'σ'  },
  { appId: 'fibprime',    title: 'fib.app',          label: 'Fib/Prime',   icon: 'φ'  },
  { appId: 'logicgate',   title: 'logic.app',        label: 'Logic Gate',  icon: '⋀'  },
  // Live Data
  { appId: 'githubcontrib', title: 'github-contrib.app', label: 'GH Contrib',  icon: '📊' },
  { appId: 'todayincs',     title: 'cs-history.app',    label: 'CS History',  icon: '📅' },
  { appId: 'hackernews',    title: 'hackernews.app',    label: 'Hacker News', icon: '🔥' },
  { appId: 'wikirandom',    title: 'wiki-random.app',   label: 'Wiki Random', icon: '🎲' },
  // Club Utilities
  { appId: 'campusmap',     title: 'campus-map.app',    label: 'Campus Map',  icon: '🗺' },
  { appId: 'lhcrooms',      title: 'lhc-rooms.app',     label: 'LHC Rooms',   icon: '🏫' },
  { appId: 'timetable',     title: 'timetable.app',     label: 'Timetable',   icon: '📋' },
  { appId: 'roadmap',       title: 'roadmap.app',       label: 'Roadmap',     icon: '🗺' },
  { appId: 'slashdotfaq',   title: 'slashdot-faq.app',  label: 'FAQ Bot',     icon: '🤖' },
  // API
  { appId: 'isstrack',    title: 'iss.app',          label: 'ISS Track',   icon: '🛸' },
  { appId: 'apod',        title: 'apod.app',         label: 'APOD',        icon: '🔭' },
  { appId: 'ipgeo',       title: 'ip.app',           label: 'IP Lookup',   icon: '🌐' },
  { appId: 'randuser',    title: 'user.app',         label: 'Rand User',   icon: '👤' },
  // Social
  { appId: 'guestbook',   title: 'guestbook.app',    label: 'Guestbook',   icon: '📖' },
  { appId: 'poll',        title: 'poll.app',         label: 'Poll',        icon: '📊' },
  { appId: 'jokes',       title: 'jokes.app',        label: 'Jokes',       icon: '😂' },
  { appId: 'slashdotai',  title: 'slashdot-ai.app',  label: 'AI Chat',     icon: '🤖' },
  { appId: 'newsticker',  title: 'news.app',         label: 'News',        icon: '📰' },
  { appId: 'leaderboard', title: 'leaderboard.app',  label: 'Leaderboard', icon: '🏆' },
  { appId: 'githubstats', title: 'github.app',       label: 'GitHub',      icon: '🐙' },
  { appId: 'wikipedia',   title: 'wiki.app',         label: 'Wikipedia',   icon: 'W'  },
  { appId: 'horoscope',   title: 'horoscope.app',    label: 'Horoscope',   icon: '♈' },
  { appId: 'excusegen',   title: 'excuse.app',       label: 'Excuses',     icon: '🙏' },
  { appId: 'screensaver', title: 'screen.app',       label: 'Screensaver', icon: '✨' },
  { appId: 'fortunecook', title: 'fortune.app',      label: 'Fortune',     icon: '🥠' },
  { appId: 'cgpasim',     title: 'cgpa.app',         label: 'CGPA Sim',    icon: '📊' },
  { appId: 'insult',      title: 'insult.app',       label: 'Roasts',      icon: '🔥' },
  { appId: 'compliment',  title: 'compliment.app',   label: 'Compliments', icon: '💐' },
  { appId: 'faketwitter', title: 'twitter.app',      label: 'Twitter',     icon: '🐦' },
  { appId: 'fakewhatsapp',title: 'whatsapp.app',     label: 'WhatsApp',    icon: '💬' },
  { appId: 'confession',  title: 'confess.app',      label: 'Confessions', icon: '🤫' },
  // Dev Tools
  { appId: 'base64',      title: 'base64.app',       label: 'Base64',      icon: 'b64'},
  { appId: 'markdown',    title: 'markdown.app',     label: 'Markdown',    icon: '.md'},
  { appId: 'colorpicker', title: 'color.app',        label: 'Colors',      icon: '🎨' },
  { appId: 'hashgen',     title: 'hash.app',         label: 'Hash',        icon: '#'  },
  { appId: 'paint',       title: 'paint.app',        label: 'Paint',       icon: '🖌' },
  { appId: 'asciiart',    title: 'ascii.app',        label: 'ASCII Art',   icon: 'A'  },
  { appId: 'kbtrainer',   title: 'kb.app',           label: 'KB Trainer',  icon: '⌨'  },
  { appId: 'syslog',      title: 'syslog.app',       label: 'Sys Logs',    icon: '📜' },
  { appId: 'clipboard',   title: 'clipboard.app',    label: 'Clipboard',   icon: '📋' },
  // Productivity
  { appId: 'calendar',    title: 'calendar.app',     label: 'Calendar',    icon: '📅' },
  { appId: 'pomodoro',    title: 'pomodoro.app',     label: 'Pomodoro',    icon: '🍅' },
  { appId: 'stopwatch',   title: 'stopwatch.app',    label: 'Stopwatch',   icon: '⏱' },
  { appId: 'countdown',   title: 'count.app',        label: 'Countdown',   icon: '⏳' },
  { appId: 'mealgent',    title: 'meal.app',         label: 'Meal Gen',    icon: '🍱' },
  { appId: 'studysched',  title: 'study.app',        label: 'Study Sched', icon: '📋' },
  { appId: 'flashcard',   title: 'flash.app',        label: 'Flashcards',  icon: '🃏' },
  // OS Tools
  { appId: 'fileexplorer',title: 'files.app',        label: 'Files',       icon: '📁' },
  { appId: 'settings',    title: 'settings.app',     label: 'Settings',    icon: '⚙'  },
  { appId: 'clock',       title: 'clock.app',        label: 'Clock',       icon: '⏰' },
  { appId: 'notepad',     title: 'notepad.app',      label: 'Notepad',     icon: '📝' },
  { appId: 'taskmanager', title: 'taskmanager.app',  label: 'Task Mgr',    icon: '[%]'},
]

const RIGHT_ICONS: DesktopIcon[] = [
  // Column 1 (rightmost) — main club nav
  { appId: 'terminal',    title: 'terminal.sh',      label: 'Terminal',    icon: '>_' },
  { appId: 'home',        title: 'home.exe',         label: 'Home',        icon: '⌂'  },
  { appId: 'about',       title: 'about.txt',        label: 'About',       icon: '📄' },
  { appId: 'team',        title: 'team.db',          label: 'Team',        icon: '👥' },
  { appId: 'stack',       title: 'stack.log',        label: 'Tech Stack',  icon: '⚙'  },
  { appId: 'contact',     title: 'contact.sh',       label: 'Contact',     icon: '@'  },
  { appId: 'neofetch',    title: 'neofetch',         label: 'Neofetch',    icon: '🖥' },
  // Column 2 — club content
  { appId: 'events',      title: 'events.app',       label: 'Events',      icon: '📅' },
  { appId: 'showcase',    title: 'showcase.app',     label: 'Showcase',    icon: '🌟' },
  { appId: 'blog',        title: 'blog.app',         label: 'Blog',        icon: '📰' },
  { appId: 'resources',   title: 'resources.app',    label: 'Resources',   icon: '📚' },
  { appId: 'halloffame',  title: 'fame.app',         label: 'Hall of Fame',icon: '🏆' },
  { appId: 'rules',       title: 'rules.app',        label: 'Rules',       icon: '📜' },
  { appId: 'newsletter',  title: 'newsletter.app',   label: 'Newsletter',  icon: '📬' },
  // Column 3 (new) — extra club pages
  { appId: 'memberlist',  title: 'members.app',      label: 'Members',     icon: '👤' },
  { appId: 'recruitment', title: 'recruit.app',      label: 'Join Us',     icon: '📝' },
  { appId: 'alumni',      title: 'alumni.app',       label: 'Alumni',      icon: '🎓' },
  { appId: 'gallery',     title: 'gallery.app',      label: 'Gallery',     icon: '📸' },
  { appId: 'contactform', title: 'contactform.app',  label: 'Contact Form',icon: '📧' },
  { appId: 'feedback',    title: 'feedback.app',    label: 'Feedback',     icon: '💬' },
  { appId: 'clubcommunity', title: 'clubcommunity.app', label: 'Club Community', icon: '🌐' }
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

    // Left side — tight 7-column grid
    const COL_W = 66
    const ROW_H = 72
    const LEFT_COLS = 7
    const LEFT_START_X = 4
    const LEFT_START_Y = 4

    LEFT_ICONS.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: LEFT_START_X + (i % LEFT_COLS) * COL_W,
        y: LEFT_START_Y + Math.floor(i / LEFT_COLS) * ROW_H,
      }
    })

    // Right side — 3 columns, column-by-column layout
    const RIGHT_COL_W = 68
    const RIGHT_ROW_H = 70
    const RIGHT_START_Y = 4
    const RIGHT_START_X = window.innerWidth - (RIGHT_COL_W * 3) - 4

    const col0 = RIGHT_ICONS.slice(0, 7)   // terminal → neofetch  (rightmost col)
    const col1 = RIGHT_ICONS.slice(7, 14)  // events → newsletter  (middle col)
    const col2 = RIGHT_ICONS.slice(14)     // memberlist → contactform (3rd from right)

    col0.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: RIGHT_START_X + 2 * RIGHT_COL_W,
        y: RIGHT_START_Y + i * RIGHT_ROW_H,
      }
    })
    col1.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: RIGHT_START_X + 1 * RIGHT_COL_W,
        y: RIGHT_START_Y + i * RIGHT_ROW_H,
      }
    })
    col2.forEach(function(icon, i) {
      positions[icon.appId] = {
        x: RIGHT_START_X + 0 * RIGHT_COL_W,
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

      {/* SlashDot logo — centred on desktop */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity: 0.12,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 220, height: 'auto', filter: 'brightness(1.2)' }} />
        <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, letterSpacing: '0.3em', fontWeight: 700 }}>
          SLASHDOT
        </span>
        <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.15em' }}>
          CODING & DESIGN CLUB • IISER KOLKATA
        </span>
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