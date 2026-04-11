import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BootScreen } from './components/Boot/BootScreen'
import { Desktop } from './components/Desktop/Desktop'
import { AppWindow } from './components/WindowManager/AppWindow'
import { TerminalWindow } from './components/Terminal/TerminalWindow'
import { Confetti, MatrixRain } from './components/Desktop/EasterEggs'
import { KernelPanic } from './components/Apps/KernelPanic'
import { NotificationSystem } from './components/Desktop/NotificationSystem'
import { CommandPalette } from './components/Desktop/CommandPalette'
import { Clippy } from './components/Desktop/Clippy'
import { getDailyChallengeText } from './components/Desktop/DailyChallenge'
import { LiveReactions } from './components/Desktop/LiveReactions'
import {
  HomeApp, AboutApp, TeamApp,
  TechStackApp, ContactApp, NeofetchApp, ClockApp,
} from './components/Apps/index'
import { AsteroidsGame } from './components/Apps/Asteroids'
import { PongGame } from './components/Apps/Pong'
import { PeriodicTableApp } from './components/Apps/PeriodicTable'
import { FourierVizApp } from './components/Apps/FourierViz'
import { GravitySimApp } from './components/Apps/GravitySim'
import { DNAViewerApp } from './components/Apps/DNAViewer'
import { GuestbookApp } from './components/Apps/Guestbook'
import { PollApp } from './components/Apps/Poll'
import { JokeGeneratorApp } from './components/Apps/JokeGenerator'
import { SlashDotAIApp } from './components/Apps/SlashDotAI'
import { PhysicsSimApp } from './components/Apps/PhysicsSim'
import { MolecularViewerApp } from './components/Apps/MolecularViewer'
import { FlappyBirdApp } from './components/Apps/FlappyBird'
import { FileExplorerApp } from './components/Apps/FileExplorer'
import { SettingsApp } from './components/Apps/Settings'
import { SnakeApp } from './components/Apps/Snake'
import { NotepadApp } from './components/Apps/Notepad'
import { TaskManagerApp } from './components/Apps/TaskManager'
import { Base64App, MarkdownApp, ColorPickerApp, HashGenApp } from './components/Apps/DevTools'
import { PaintApp, ASCIIArtApp } from './components/Apps/CreativeApps'
import { WikipediaApp , HoroscopeApp, NewsTickerApp, GitHubStatsApp, LeaderboardApp,  } from './components/Apps/FunApps'
import { StudySchedApp } from './components/Apps/ProductivityApps2'
import { CalendarApp, PomodoroApp, StopwatchApp,  } from './components/Apps/LifeApps'
import {ExcuseGenApp, ScreensaverApp, FortuneCookieApp, KBTrainerApp, SysLogApp, ClipboardApp, CGPASimApp, InsultApp, ComplimentApp, FakeTwitterApp, FakeWhatsAppApp, ConfessionApp } from './components/Apps/SocialFunApps'
import { SortVisApp, PathVisApp, BinConvApp, TruthTableApp, StatsCalcApp, FibPrimeApp, LogicGateApp } from './components/Apps/ScienceApps2'
import { ISSTrackerApp, APODApp, IPGeoApp, RandUserApp } from './components/Apps/APIApps'
import { MealGenApp, CountdownApp } from './components/Apps/ProductivityApps2'
import { FlashcardApp } from './components/Apps/ProductivityApps2'
import { EventsApp, ShowcaseApp } from './components/Apps/ClubApps'
import { BlogApp, ResourcesApp, HallOfFameApp, RulesApp, NewsletterApp } from './components/Apps/ClubPages'
import { useWindowManager } from './hooks/useWindowManager'
import { AppId } from './types'
import './App.css'

function LoadingBar() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <p style={{ color: '#00ff46', fontSize: 13 }}>Loading...</p>
      <div style={{
        width: 200,
        height: 4,
        background: '#1a1a1a',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: '#00ff46',
          borderRadius: 2,
          animation: 'loadbar 0.6s ease-out forwards',
          boxShadow: '0 0 8px #00ff4680',
        }} />
      </div>
    </div>
  )
}

function AppContentWithLoader({ appId }: { appId: AppId }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [appId])

  if (loading) return <LoadingBar />
  return <AppContent appId={appId} />
}

function AppContent({ appId }: { appId: AppId }) {
  switch (appId) {
    case 'home':         return <HomeApp />
    case 'about':        return <AboutApp />
    case 'team':         return <TeamApp />
    case 'stack':        return <TechStackApp />
    case 'contact':      return <ContactApp />
    case 'neofetch':     return <NeofetchApp />
    case 'clock':        return <ClockApp />
    case 'asteroids':    return <AsteroidsGame />
    case 'pong':         return <PongGame />
    case 'flappy':       return <FlappyBirdApp />
    case 'snake':        return <SnakeApp />
    case 'periodic':     return <PeriodicTableApp />
    case 'fourier':      return <FourierVizApp />
    case 'gravity':      return <GravitySimApp />
    case 'dna':          return <DNAViewerApp />
    case 'physics':      return <PhysicsSimApp />
    case 'molecular':    return <MolecularViewerApp />
    case 'sortvis':      return <SortVisApp />
    case 'pathvis':      return <PathVisApp />
    case 'binconv':      return <BinConvApp />
    case 'truthtable':   return <TruthTableApp />
    case 'statsCalc':    return <StatsCalcApp />
    case 'fibprime':     return <FibPrimeApp />
    case 'logicgate':    return <LogicGateApp />
    case 'isstrack':     return <ISSTrackerApp />
    case 'apod':         return <APODApp />
    case 'ipgeo':        return <IPGeoApp />
    case 'randuser':     return <RandUserApp />
    case 'guestbook':    return <GuestbookApp />
    case 'poll':         return <PollApp />
    case 'jokes':        return <JokeGeneratorApp />
    case 'slashdotai':   return <SlashDotAIApp />
    case 'newsticker':   return <NewsTickerApp />
    case 'leaderboard':  return <LeaderboardApp />
    case 'githubstats':  return <GitHubStatsApp />
    case 'wikipedia':    return <WikipediaApp />
    case 'horoscope':    return <HoroscopeApp />
    case 'excusegen':    return <ExcuseGenApp />
    case 'screensaver':  return <ScreensaverApp />
    case 'fortunecook':  return <FortuneCookieApp />
    case 'kbtrainer':    return <KBTrainerApp />
    case 'syslog':       return <SysLogApp />
    case 'clipboard':    return <ClipboardApp />
    case 'cgpasim':      return <CGPASimApp />
    case 'insult':       return <InsultApp />
    case 'compliment':   return <ComplimentApp />
    case 'faketwitter':  return <FakeTwitterApp />
    case 'fakewhatsapp': return <FakeWhatsAppApp />
    case 'confession':   return <ConfessionApp />
    case 'base64':       return <Base64App />
    case 'markdown':     return <MarkdownApp />
    case 'colorpicker':  return <ColorPickerApp />
    case 'hashgen':      return <HashGenApp />
    case 'paint':        return <PaintApp />
    case 'asciiart':     return <ASCIIArtApp />
    case 'calendar':     return <CalendarApp />
    case 'pomodoro':     return <PomodoroApp />
    case 'stopwatch':    return <StopwatchApp />
    case 'countdown':    return <CountdownApp />
    case 'mealgent':     return <MealGenApp />
    case 'studysched':   return <StudySchedApp />
    case 'flashcard':    return <FlashcardApp />
    case 'fileexplorer': return <FileExplorerApp />
    case 'settings':     return <SettingsApp />
    case 'notepad':      return <NotepadApp />
    case 'taskmanager':  return <TaskManagerApp />
    case 'events':       return <EventsApp />
    case 'showcase':     return <ShowcaseApp />
    case 'blog':         return <BlogApp />
    case 'resources':    return <ResourcesApp />
    case 'halloffame':   return <HallOfFameApp />
    case 'rules':        return <RulesApp />
    case 'newsletter':   return <NewsletterApp />
    default:             return null
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [easterEgg, setEasterEgg] = useState<string | null>(null)
  const [kernelPanic, setKernelPanic] = useState(false)
  const [mobilePage, setMobilePage] = useState<AppId | null>(null)
  const [mobileView, setMobileView] = useState<'home' | 'terminal'>('home')
  const isMobile = useIsMobile()

  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    updatePosition,
  } = useWindowManager()

  const handleOpenWindow = useCallback((appId: AppId, title: string) => {
    window.dispatchEvent(new CustomEvent('slashdot-app-opened', { detail: { appId } }))
    if (isMobile) {
      if (appId === 'terminal') {
        setMobilePage(null)
        setMobileView('terminal')
      } else {
        setMobilePage(appId)
        setMobileView('home')
      }
    } else {
      openWindow(appId, title)
    }
  }, [openWindow, isMobile])

  useEffect(() => {
    const handler = () => {
      windows.forEach(w => minimizeWindow(w.id))
    }
    window.addEventListener('slashdot-minimize-all', handler)
    return () => window.removeEventListener('slashdot-minimize-all', handler)
  }, [windows, minimizeWindow])

  const handleRunCommand = useCallback((cmd: string) => {
    window.dispatchEvent(new CustomEvent('slashdot-run-cmd', { detail: { cmd } }))
  }, [])

  const handleEasterEgg = useCallback((effect: string) => {
    if (effect === 'panic') {
      setKernelPanic(true)
    } else if (effect === 'reboot') {
      setKernelPanic(false)
      window.location.reload()
    } else if (effect === 'reset') {
      window.location.reload()
    } else {
      setEasterEgg(effect)
    }
  }, [])

  const handleRestoreWindow = useCallback((id: string) => {
    focusWindow(id)
    const w = windows.find(w => w.id === id)
    if (w) openWindow(w.appId, w.title)
  }, [windows, focusWindow, openWindow])

  // Screensaver — auto Matrix after 60s idle
  useEffect(() => {
    if (!booted) return
    let timer: ReturnType<typeof setTimeout>
    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setEasterEgg('matrix'), 60000)
    }
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart']
    events.forEach(e => window.addEventListener(e, reset))
    reset()
    return () => {
      clearTimeout(timer)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [booted])

  if (!booted) {
    return <BootScreen onDone={() => {
      setBooted(true)
      try {
        const raw = localStorage.getItem('slashdot-os-memory')
        const mem = raw ? JSON.parse(raw) : null
        const visits = (mem?.visits ?? 0) + 1
        localStorage.setItem('slashdot-os-memory', JSON.stringify({ ...(mem ?? {}), visits, lastVisit: new Date().toLocaleDateString(), firstVisit: mem?.firstVisit ?? new Date().toLocaleDateString() }))
        setTimeout(() => {
        if (mem?.name && visits > 1) {
          window.dispatchEvent(new CustomEvent('slashdot-notify', {
            detail: { message: `Welcome back, ${mem.name}! Visit #${visits}`, type: 'success' }
          }))
        } else {
          window.dispatchEvent(new CustomEvent('slashdot-notify', {
            detail: { message: 'Welcome to SlashDot OS! Type "challenge" for today\'s coding challenge.', type: 'info' }
          }))
        }
      }, 1000)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('slashdot-terminal-write', {
          detail: { text: getDailyChallengeText() }
        }))
      }, 3000)
      } catch {}
    }} />
  }

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="app-root mobile-root">
        <NotificationSystem />
        {easterEgg === 'confetti' && <Confetti onDone={() => setEasterEgg(null)} />}
        {easterEgg === 'matrix' && <MatrixRain onDone={() => setEasterEgg(null)} />}

        {mobilePage ? (
          <div className="mobile-app-view">
            <div className="mobile-app-header">
              <button className="mobile-back-btn" onClick={() => { setMobilePage(null); setMobileView('home') }}>
                ← Back
              </button>
              <span className="mobile-app-title">{mobilePage}.app</span>
            </div>
            <div className="mobile-app-content">
              <AppContentWithLoader appId={mobilePage} />
            </div>
          </div>
        ) : mobileView === 'terminal' ? (
          <div className="mobile-terminal-view" style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
            <div className="mobile-app-header">
              <button className="mobile-back-btn" onClick={() => setMobileView('home')}>
                ← Back
              </button>
              <span className="mobile-app-title">terminal.sh</span>
              <button
                className="mobile-palette-btn"
                style={{ marginLeft: 'auto' }}
                onClick={() => window.dispatchEvent(new CustomEvent('slashdot-palette-open'))}
              >
                ⌘
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <TerminalWindow
                onOpenWindow={handleOpenWindow}
                onEasterEgg={handleEasterEgg}
              />
            </div>
          </div>
        ) : (
          <div className="mobile-home">
            {/* Header */}
            <div className="mobile-header">
              <div className="mobile-header-left">
                <img src="./slashdot_logo.png" alt="SlashDot" className="mobile-logo" style={{ width: 44, height: 44 }} />
                <div>
                  <p className="mobile-header-title">SlashDot</p>
                  <p className="mobile-header-sub">IISER Kolkata</p>
                </div>
              </div>
              <button
                className="mobile-palette-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('slashdot-palette-open'))}
              >
                ⌘
              </button>
            </div>

            {/* Club quick links — most important */}
            <div className="mobile-section">
              <p className="mobile-section-label">// club</p>
              <div className="mobile-grid-2">
                {([
                  ['home',       '⌂',  'Home'],
                  ['about',      '📄', 'About'],
                  ['team',       '👥', 'Team'],
                  ['events',     '📅', 'Events'],
                  ['showcase',   '🌟', 'Showcase'],
                  ['blog',       '📰', 'Blog'],
                  ['resources',  '📚', 'Resources'],
                  ['halloffame', '🏆', 'Hall of Fame'],
                  ['rules',      '📜', 'Rules'],
                  ['newsletter', '📬', 'Newsletter'],
                  ['contact',    '@',  'Contact'],
                  ['stack',      '⚙',  'Tech Stack'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn club" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Games */}
            <div className="mobile-section">
              <p className="mobile-section-label">// games</p>
              <div className="mobile-grid-4">
                {([
                  ['asteroids', '🚀', 'Asteroids'],
                  ['pong',      '🏓', 'Pong'],
                  ['flappy',    '{}', 'Flappy'],
                  ['snake',     '🐍', 'Snake'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn game" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Science */}
            <div className="mobile-section">
              <p className="mobile-section-label">// science</p>
              <div className="mobile-grid-4">
                {([
                  ['periodic',  '⚗',  'Periodic'],
                  ['fourier',   '〜', 'Fourier'],
                  ['gravity',   '🪐', 'Gravity'],
                  ['dna',       '🧬', 'DNA'],
                  ['physics',   '⚛',  'Physics'],
                  ['molecular', '🔬', 'Molecule'],
                  ['sortvis',   '⟨⟩', 'Sort Vis'],
                  ['pathvis',   '🗺', 'Pathfind'],
                  ['binconv',   '01', 'BinConv'],
                  ['truthtable','⊕',  'Truth Tbl'],
                  ['statsCalc', 'σ',  'Statistics'],
                  ['logicgate', '⋀',  'Logic Gate'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn science" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live data */}
            <div className="mobile-section">
              <p className="mobile-section-label">// live data</p>
              <div className="mobile-grid-4">
                {([
                  ['isstrack',   '🛸', 'ISS'],
                  ['apod',       '🔭', 'APOD'],
                  ['ipgeo',      '🌐', 'IP Lookup'],
                  ['randuser',   '👤', 'Rand User'],
                  ['githubstats','🐙', 'GitHub'],
                  ['wikipedia',  'W',  'Wikipedia'],
                  ['newsticker', '📰', 'News'],
                  ['horoscope',  '♈', 'Horoscope'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn api" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="mobile-section">
              <p className="mobile-section-label">// social & fun</p>
              <div className="mobile-grid-4">
                {([
                  ['guestbook',   '📖', 'Guestbook'],
                  ['poll',        '📊', 'Poll'],
                  ['jokes',       '😂', 'Jokes'],
                  ['slashdotai',  '🤖', 'AI Chat'],
                  ['faketwitter', '🐦', 'Twitter'],
                  ['fakewhatsapp','💬', 'WhatsApp'],
                  ['confession',  '🤫', 'Confess'],
                  ['leaderboard', '🏆', 'Leaderboard'],
                  ['compliment',  '💐', 'Compliment'],
                  ['insult',      '🔥', 'Roast'],
                  ['fortunecook', '🥠', 'Fortune'],
                  ['screensaver', '✨', 'Screensaver'],
                  ['cgpasim',     '📊', 'CGPA Sim'],
                  ['excusegen',   '🙏', 'Excuses'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn social" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mobile-section">
              <p className="mobile-section-label">// tools & productivity</p>
              <div className="mobile-grid-4">
                {([
                  ['base64',      'b64','Base64'],
                  ['markdown',    '.md','Markdown'],
                  ['colorpicker', '🎨', 'Colors'],
                  ['hashgen',     '#',  'Hash'],
                  ['paint',       '🖌', 'Paint'],
                  ['asciiart',    'A',  'ASCII Art'],
                  ['calendar',    '📅', 'Calendar'],
                  ['pomodoro',    '🍅', 'Pomodoro'],
                  ['stopwatch',   '⏱', 'Stopwatch'],
                  ['countdown',   '⏳', 'Countdown'],
                  ['flashcard',   '🃏', 'Flashcards'],
                  ['notepad',     '📝', 'Notepad'],
                  ['mealgent',    '🍱', 'Meals'],
                  ['studysched',  '📋', 'Study'],
                  ['kbtrainer',   '⌨', 'KB Train'],
                  ['syslog',      '📜', 'Sys Log'],
                ] as [AppId, string, string][]).map(([id, icon, label]) => (
                  <button key={id} className="mobile-app-btn tool" onClick={() => setMobilePage(id)}>
                    <span className="mobile-btn-icon">{icon}</span>
                    <span className="mobile-btn-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal shortcut */}
            <div className="mobile-section">
              <button
                className="mobile-terminal-btn"
                onClick={() => { setMobilePage(null); setMobileView('terminal') }}
              >
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 18 }}>&gt;_</span>
                <span>Open Terminal</span>
                <span style={{ fontSize: 11, opacity: 0.5 }}>type 'help' for all commands</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mobile-footer">
              <p>SlashDot · Coding & Design Club · IISER Kolkata</p>
              <p>slashdot-iiserk.github.io</p>
            </div>
          </div>
        )}

        {/* Bottom nav — always visible */}
        {mobilePage && (
          <div className="mobile-bottom-nav">
            {([
              ['home',    '⌂',  'Home'],
              ['events',  '📅', 'Events'],
              ['showcase','🌟', 'Showcase'],
              ['blog',    '📰', 'Blog'],
              ['contact', '@',  'Contact'],
            ] as [AppId, string, string][]).map(([id, icon, label]) => (
              <button
                key={id}
                className={'mobile-nav-btn' + (mobilePage === id ? ' active' : '')}
                onClick={() => setMobilePage(id)}
              >
                <span className="mobile-nav-icon">{icon}</span>
                <span className="mobile-nav-label">{label}</span>
              </button>
            ))}
          </div>
        )}

        <CommandPalette onOpenWindow={handleOpenWindow} onRunCommand={handleRunCommand} />
      </div>
    )
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────
  return (
    <div className="app-root">
      <Desktop
        windows={windows}
        onOpenWindow={handleOpenWindow}
        onFocusWindow={focusWindow}
        onRestoreWindow={handleRestoreWindow}
      />
      <div className="window-layer">
        <AnimatePresence>
          {windows.map(win => (
            <AppWindow
              key={win.id}
              window={win}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={minimizeWindow}
              onMove={updatePosition}
            >
              {win.appId === 'terminal' ? (
                <TerminalWindow
                  onOpenWindow={handleOpenWindow}
                  onEasterEgg={handleEasterEgg}
                />
              ) : (
                <AppContentWithLoader appId={win.appId} />
              )}
            </AppWindow>
          ))}
        </AnimatePresence>
      </div>
      {easterEgg === 'confetti' && (
        <Confetti onDone={function() { setEasterEgg(null) }} />
      )}
      {easterEgg === 'matrix' && (
        <MatrixRain onDone={function() { setEasterEgg(null) }} />
      )}
      {kernelPanic && (
        <KernelPanic onRecover={function() { setKernelPanic(false) }} />
      )}
      <NotificationSystem />
      <CommandPalette onOpenWindow={handleOpenWindow} onRunCommand={handleRunCommand} />
      <Clippy />
      <LiveReactions />
    </div>
  )
}