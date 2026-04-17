import { useState, useEffect, useRef } from 'react'
import { AppId } from '../../types'

const ALL_COMMANDS = [
  { label: 'Open Terminal',          action: 'open:terminal',    icon: '>_' },
  { label: 'Open Home',              action: 'open:home',        icon: '⌂'  },
  { label: 'About SlashDot',         action: 'open:about',       icon: '📄' },
  { label: 'Meet the Team',          action: 'open:team',        icon: '👥' },
  { label: 'Tech Stack',             action: 'open:stack',       icon: '⚙'  },
  { label: 'Contact SlashDot',       action: 'open:contact',     icon: '@'  },
  { label: 'Members List',         action: 'open:memberlist',  icon: '👤' },
  { label: 'Join SlashDot',        action: 'open:recruitment', icon: '📝' },
  { label: 'Alumni Network',       action: 'open:alumni',      icon: '🎓' },
  { label: 'Photo Gallery',        action: 'open:gallery',     icon: '📸' },
  { label: 'Contact Form',         action: 'open:contactform', icon: '📧' },
  { label: 'WHOIS SlashDot',       action: 'cmd:whois slashdot', icon: '🔍' },
  { label: 'Events Calendar',      action: 'cmd:cal events',   icon: '📅' },
  { label: 'Message of the Day',   action: 'cmd:motd',         icon: '📋' },
  { label: 'Neofetch',               action: 'open:neofetch',    icon: '🖥' },
  { label: 'Clock',                  action: 'open:clock',       icon: '⏰' },
  { label: 'SlashDot Events',        action: 'open:events',      icon: '📅' },
  { label: 'SlashDot Showcase',      action: 'open:showcase',    icon: '🌟' },
  { label: 'SlashDot Blog',          action: 'open:blog',        icon: '📰' },
  { label: 'Learning Resources',     action: 'open:resources',   icon: '📚' },
  { label: 'Hall of Fame',           action: 'open:halloffame',  icon: '🏆' },
  { label: 'Club Constitution',      action: 'open:rules',       icon: '📜' },
  { label: 'Newsletter',             action: 'open:newsletter',  icon: '📬' },
  { label: 'Submit Feedback',       action: 'open:feedback', icon: '💬' },
  { label: 'View Club Feedback',    action: 'open:feedback', icon: '📋' },
  { label: 'Asteroids',              action: 'open:asteroids',   icon: '🚀' },
  { label: 'Pong',                   action: 'open:pong',        icon: '🏓' },
  { label: 'Flappy { }',             action: 'open:flappy',      icon: '{}' },
  { label: 'Snake',                  action: 'open:snake',       icon: '🐍' },
  { label: 'Periodic Table',         action: 'open:periodic',    icon: '⚗'  },
  { label: 'Fourier Visualizer',     action: 'open:fourier',     icon: '〜' },
  { label: 'Gravity Simulator',      action: 'open:gravity',     icon: '🪐' },
  { label: 'DNA Viewer',             action: 'open:dna',         icon: '🧬' },
  { label: 'Physics Simulator',      action: 'open:physics',     icon: '⚛'  },
  { label: 'Molecular Viewer',       action: 'open:molecular',   icon: '🔬' },
  { label: 'Sort Visualizer',        action: 'open:sortvis',     icon: '⟨⟩' },
  { label: 'Pathfinding Visualizer', action: 'open:pathvis',     icon: '🗺' },
  { label: 'Binary Converter',       action: 'open:binconv',     icon: '01' },
  { label: 'Truth Table',            action: 'open:truthtable',  icon: '⊕'  },
  { label: 'Statistics Calc',        action: 'open:statsCalc',   icon: 'σ'  },
  { label: 'Fib & Primes',           action: 'open:fibprime',    icon: 'φ'  },
  { label: 'Logic Gate Sim',         action: 'open:logicgate',   icon: '⋀'  },
  { label: 'ISS Tracker',            action: 'open:isstrack',    icon: '🛸' },
  { label: 'NASA APOD',              action: 'open:apod',        icon: '🔭' },
  { label: 'IP Geolocation',         action: 'open:ipgeo',       icon: '🌐' },
  { label: 'Random User',            action: 'open:randuser',    icon: '👤' },
  { label: 'Guestbook',              action: 'open:guestbook',   icon: '📖' },
  { label: 'Poll',                   action: 'open:poll',        icon: '📊' },
  { label: 'Jokes',                  action: 'open:jokes',       icon: '😂' },
  { label: 'SlashDot AI',            action: 'open:slashdotai',  icon: '🤖' },
  { label: 'News Ticker',            action: 'open:newsticker',  icon: '📰' },
  { label: 'Leaderboard',           action: 'open:leaderboard',  icon: '🏆' },
  { label: 'GitHub Stats',           action: 'open:githubstats', icon: '🐙' },
  { label: 'Wikipedia',             action: 'open:wikipedia',    icon: 'W'  },
  { label: 'Horoscope',             action: 'open:horoscope',    icon: '♈' },
  { label: 'Excuse Generator',      action: 'open:excusegen',    icon: '🙏' },
  { label: 'Screensaver',           action: 'open:screensaver',  icon: '✨' },
  { label: 'Fortune Cookie',        action: 'open:fortunecook',  icon: '🥠' },
  { label: 'KB Shortcut Trainer',   action: 'open:kbtrainer',    icon: '⌨'  },
  { label: 'System Logs',           action: 'open:syslog',       icon: '📜' },
  { label: 'Clipboard Manager',     action: 'open:clipboard',    icon: '📋' },
  { label: 'CGPA Simulator',        action: 'open:cgpasim',      icon: '📊' },
  { label: 'Roast Generator',       action: 'open:insult',       icon: '🔥' },
  { label: 'Compliment Generator',  action: 'open:compliment',   icon: '💐' },
  { label: 'Fake Twitter',          action: 'open:faketwitter',  icon: '🐦' },
  { label: 'Fake WhatsApp',         action: 'open:fakewhatsapp', icon: '💬' },
  { label: 'Confession Wall',       action: 'open:confession',   icon: '🤫' },
  { label: 'Base64',                action: 'open:base64',       icon: 'b64'},
  { label: 'Markdown Previewer',    action: 'open:markdown',     icon: '.md'},
  { label: 'Color Picker',          action: 'open:colorpicker',  icon: '🎨' },
  { label: 'Hash Generator',        action: 'open:hashgen',      icon: '#'  },
  { label: 'Paint',                 action: 'open:paint',        icon: '🖌' },
  { label: 'ASCII Art',             action: 'open:asciiart',     icon: 'A'  },
  { label: 'Calendar',              action: 'open:calendar',     icon: '📅' },
  { label: 'Pomodoro',              action: 'open:pomodoro',     icon: '🍅' },
  { label: 'Stopwatch',             action: 'open:stopwatch',    icon: '⏱' },
  { label: 'Countdown Timer',       action: 'open:countdown',    icon: '⏳' },
  { label: 'Meal Generator',        action: 'open:mealgent',     icon: '🍱' },
  { label: 'Study Schedule',        action: 'open:studysched',   icon: '📋' },
  { label: 'Flashcards',            action: 'open:flashcard',    icon: '🃏' },
  { label: 'File Explorer',         action: 'open:fileexplorer', icon: '📁' },
  { label: 'Settings',              action: 'open:settings',     icon: '⚙'  },
  { label: 'Notepad',               action: 'open:notepad',      icon: '📝' },
  { label: 'Task Manager',          action: 'open:taskmanager',  icon: '[%]'},
  { label: 'Daily Challenge',       action: 'cmd:challenge',     icon: '📅' },
  { label: 'How to Join SlashDot',  action: 'cmd:register',      icon: '📝' },
  { label: 'Community Hub',          action: 'open:clubcommunity', icon: '🌐' },
  { label: 'Discussion Forum',       action: 'open:clubcommunity', icon: '💬' },
  { label: 'Project Collaboration',  action: 'open:clubcommunity', icon: '🚀' },
  { label: 'Community Events',       action: 'open:clubcommunity', icon: '📅' },
  { label: 'Community Members',      action: 'open:clubcommunity', icon: '👥' },
  { label: 'Show Members',          action: 'cmd:members',       icon: '👥' },
  { label: 'Live Weather',          action: 'cmd:weather',       icon: '🌍' },
  { label: 'Sudo Party 🎉',         action: 'cmd:sudo party',    icon: '🎉' },
  { label: 'Matrix Rain',           action: 'cmd:matrix',        icon: '🟩' },
  { label: 'Toggle Fullscreen',     action: 'cmd:fullscreen',    icon: '⛶'  },
  { label: 'Theme Green',           action: 'cmd:theme green',   icon: '🟢' },
  { label: 'Theme Amber',           action: 'cmd:theme amber',   icon: '🟡' },
  { label: 'Theme Blue',            action: 'cmd:theme blue',    icon: '🔵' },
  { label: 'Rain On',               action: 'cmd:rain on',       icon: '🌧' },
  { label: 'Rain Off',              action: 'cmd:rain off',      icon: '☀'  },
  { label: 'Visitor Counter',       action: 'cmd:visits',        icon: '👥' },
  { label: 'Summon Clippy',         action: 'cmd:clippy',        icon: '📎' },
  { label: 'Show Aliases',          action: 'cmd:alias',         icon: '⚡' },
  { label: 'GitHub Contributions',    action: 'open:githubcontrib', icon: '📊' },
  { label: 'Today in CS History',     action: 'open:todayincs',     icon: '📅' },
  { label: 'Hacker News',             action: 'open:hackernews',    icon: '🔥' },
  { label: 'Random Wikipedia',        action: 'open:wikirandom',    icon: '🎲' },
  { label: 'IISER Campus Map',        action: 'open:campusmap',     icon: '🗺' },
  { label: 'LHC Room Status',         action: 'open:lhcrooms',      icon: '🏫' },
  { label: 'Timetable Builder',       action: 'open:timetable',     icon: '📋' },
  { label: 'SlashDot Roadmap',        action: 'open:roadmap',       icon: '🗺' },
  { label: 'FAQ Bot — Ask SlashDot',  action: 'open:slashdotfaq',   icon: '🤖' },
  { label: 'Open Random App',         action: 'cmd:open random',    icon: '🎲' },
  { label: 'List All Apps',           action: 'cmd:ls apps',        icon: '📋' },
  { label: 'Club File Tree',          action: 'cmd:tree /club',     icon: '🌳' },
]

interface Props {
  onOpenWindow: (appId: AppId, title: string) => void
  onRunCommand: (cmd: string) => void
}

export function CommandPalette({ onOpenWindow, onRunCommand }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? ALL_COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : ALL_COMMANDS

  useEffect(function() {
    const handler = function(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return function() { window.removeEventListener('keydown', handler) }
  }, [])

  useEffect(function() {
    if (open) setTimeout(function() { inputRef.current?.focus() }, 50)
  }, [open])

  function execute(action: string) {
    setOpen(false)
    setQuery('')
    if (action.startsWith('open:')) {
      const appId = action.replace('open:', '') as AppId
      const titleMap: Record<string, string> = {
        terminal: 'terminal.sh', home: 'home.exe', about: 'about.txt',
        team: 'team.db', stack: 'stack.log', contact: 'contact.sh',
        neofetch: 'neofetch', clock: 'clock.app',
        asteroids: 'asteroids.exe', pong: 'pong.exe', flappy: 'flappy.exe', snake: 'snake.exe',
        periodic: 'periodic.app', fourier: 'fourier.app', gravity: 'gravity.app',
        dna: 'dna.app', physics: 'physics.app', molecular: 'molecular.app',
        sortvis: 'sort.app', pathvis: 'path.app', binconv: 'binconv.app',
        truthtable: 'truth.app', statsCalc: 'stats.app', fibprime: 'fib.app', logicgate: 'logic.app',
        isstrack: 'iss.app', apod: 'apod.app', ipgeo: 'ip.app', randuser: 'user.app',
        guestbook: 'guestbook.app', poll: 'poll.app', jokes: 'jokes.app', slashdotai: 'slashdot-ai.app',
        newsticker: 'news.app', leaderboard: 'leaderboard.app', githubstats: 'github.app', wikipedia: 'wiki.app',
        horoscope: 'horoscope.app', excusegen: 'excuse.app', screensaver: 'screen.app',
        fortunecook: 'fortune.app', kbtrainer: 'kb.app', syslog: 'syslog.app', clipboard: 'clipboard.app',
        cgpasim: 'cgpa.app', insult: 'insult.app', compliment: 'compliment.app',
        faketwitter: 'twitter.app', fakewhatsapp: 'whatsapp.app', confession: 'confess.app',
        base64: 'base64.app', markdown: 'markdown.app', colorpicker: 'color.app', hashgen: 'hash.app',
        paint: 'paint.app', asciiart: 'ascii.app',
        calendar: 'calendar.app', pomodoro: 'pomodoro.app', stopwatch: 'stopwatch.app',
        countdown: 'count.app', mealgent: 'meal.app', studysched: 'study.app', flashcard: 'flash.app',
        fileexplorer: 'files.app', settings: 'settings.app', notepad: 'notepad.app', taskmanager: 'taskmanager.app',
        events: 'events.app', showcase: 'showcase.app', blog: 'blog.app',
        resources: 'resources.app', halloffame: 'fame.app', rules: 'rules.app', newsletter: 'newsletter.app',
        memberlist: 'members.app', recruitment: 'recruit.app',
        alumni: 'alumni.app', gallery: 'gallery.app', contactform: 'contactform.app',
        githubcontrib: 'github-contrib.app', todayincs: 'cs-history.app',
        hackernews: 'hackernews.app', wikirandom: 'wiki-random.app',
        campusmap: 'campus-map.app', lhcrooms: 'lhc-rooms.app',
        timetable: 'timetable.app', roadmap: 'roadmap.app',
        slashdotfaq: 'slashdot-faq.app', feedback: 'feedback.app',
        clubcommunity: 'community.app',
      }
      
      onOpenWindow(appId, titleMap[appId] ?? appId)
    } else if (action.startsWith('cmd:')) {
      onRunCommand(action.replace('cmd:', ''))
    }
  }

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      zIndex: 9998, display: 'flex', alignItems: 'flex-start',
      justifyContent: 'center', paddingTop: '15vh',
    }} onClick={function() { setOpen(false) }}>
      <div style={{
        width: 520, background: '#111',
        border: '1px solid #00ff4640', borderRadius: 12,
        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
      }} onClick={function(e) { e.stopPropagation() }}>

        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #1e1e1e', gap: 10 }}>
          <span style={{ color: '#555', fontSize: 14 }}>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={function(e) { setQuery(e.target.value); setSelected(0) }}
            onKeyDown={function(e) {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
              if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
              if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected].action)
            }}
            placeholder="Search commands and apps..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 14 }}
          />
          <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>ESC to close</span>
        </div>

        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
          {filtered.slice(0, 12).map(function(cmd, i) {
            return (
              <div key={cmd.action}
                onClick={function() { execute(cmd.action) }}
                onMouseEnter={function() { setSelected(i) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 16px', cursor: 'pointer',
                  background: i === selected ? '#00ff4610' : 'transparent',
                  borderLeft: `2px solid ${i === selected ? '#00ff46' : 'transparent'}`,
                  transition: 'all 0.08s',
                }}>
                <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{cmd.icon}</span>
                <span style={{ color: i === selected ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 13 }}>{cmd.label}</span>
                {cmd.action.startsWith('open:') && <span style={{ marginLeft: 'auto', color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>APP</span>}
                {cmd.action.startsWith('cmd:') && <span style={{ marginLeft: 'auto', color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>CMD</span>}
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '20px 16px', color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12, textAlign: 'center' }}>
              No results for "{query}"
            </div>
          )}
        </div>

        <div style={{ padding: '8px 16px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 16 }}>
          <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>↑↓ navigate</span>
          <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>↵ select</span>
          <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Ctrl+K toggle</span>
        </div>
      </div>
    </div>
  )
}