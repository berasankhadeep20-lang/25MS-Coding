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
import { GraphPlotterApp } from './components/Apps/GraphPlotter'
import { GuestbookApp } from './components/Apps/Guestbook'
import { PollApp } from './components/Apps/Poll'
import { JokeGeneratorApp } from './components/Apps/JokeGenerator'
import { SlashDotAIApp } from './components/Apps/SlashDotAI'
import { MatrixCalcApp } from './components/Apps/MatrixCalc'
import { PhysicsSimApp } from './components/Apps/PhysicsSim'
import { MolecularViewerApp } from './components/Apps/MolecularViewer'
import { GameOfLifeApp } from './components/Apps/GameOfLife'
import { TypingTestApp } from './components/Apps/TypingTest'
import { AchievementsApp } from './components/Apps/Achievements'
import { FlappyBirdApp } from './components/Apps/FlappyBird'
import { DungeonCrawlerApp } from './components/Apps/DungeonCrawler'
import { FileExplorerApp } from './components/Apps/FileExplorer'
import { SettingsApp } from './components/Apps/Settings'
import { SnakeApp } from './components/Apps/Snake'
import { NotepadApp } from './components/Apps/Notepad'
import { TaskManagerApp } from './components/Apps/TaskManager'
import { JSONFormatterApp, Base64App, MarkdownApp, ColorPickerApp, PasswordGenApp, DiffViewerApp, CodeRunnerApp, LoremApp, HashGenApp } from './components/Apps/DevTools'
import { PaintApp, ASCIIArtApp, PixelArtApp } from './components/Apps/CreativeApps'
import { CalendarApp, PomodoroApp, StopwatchApp, CurrencyApp, BMIApp, AgeCalcApp, HabitTrackerApp } from './components/Apps/LifeApps'
import { NewsTickerApp, LeaderboardApp, GitHubStatsApp, WikipediaApp, TamagotchiApp, StocksApp, HoroscopeApp, LoveCalcApp, Magic8App, DeployedApp } from './components/Apps/FunApps'
import { SortVisApp, PathVisApp, BinConvApp, TruthTableApp, EqSolverApp, MandelbrotApp, CellAutApp, StatsCalcApp, FibPrimeApp, LogicGateApp } from './components/Apps/ScienceApps2'
import { ISSTrackerApp, APODApp, BookSearchApp, ExchRateApp, IPGeoApp, RandUserApp } from './components/Apps/APIApps'
import { FlashcardApp, BudgetApp, RecipeApp, CountdownApp, MealGenApp, StudySchedApp } from './components/Apps/ProductivityApps2'
import { FakeTwitterApp, FakeWhatsAppApp, ConfessionApp, ComplimentApp, InsultApp, DebateApp, LinusCallApp, CGPASimApp, RateMyCodeApp, RickrollApp, ExcuseGenApp, ScreensaverApp, FakeLoadApp, FortuneCookieApp, FixBugApp, KBTrainerApp, SysLogApp, ClipboardApp } from './components/Apps/SocialFunApps'
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
    case 'home':     return <HomeApp />
    case 'about':    return <AboutApp />
    case 'team':     return <TeamApp />
    case 'stack':    return <TechStackApp />
    case 'contact':  return <ContactApp />
    case 'neofetch': return <NeofetchApp />
    case 'clock':     return <ClockApp />
    case 'asteroids': return <AsteroidsGame />
    case 'pong':       return <PongGame />
    case 'periodic':   return <PeriodicTableApp />
    case 'fourier':    return <FourierVizApp />
    case 'gravity':    return <GravitySimApp />
    case 'dna':        return <DNAViewerApp />
    case 'grapher':    return <GraphPlotterApp />
    case 'guestbook':  return <GuestbookApp />
    case 'poll':       return <PollApp />
    case 'jokes':      return <JokeGeneratorApp />
    case 'slashdotai':   return <SlashDotAIApp />
    case 'matrix-calc':  return <MatrixCalcApp />
    case 'physics':      return <PhysicsSimApp />
    case 'molecular':    return <MolecularViewerApp />
    case 'gameoflife':   return <GameOfLifeApp />
    case 'typing':       return <TypingTestApp />
    case 'achievements': return <AchievementsApp />
    case 'flappy':       return <FlappyBirdApp />
    case 'dungeon':      return <DungeonCrawlerApp />
    case 'fileexplorer': return <FileExplorerApp />
    case 'settings':     return <SettingsApp />
    case 'snake':        return <SnakeApp />
    case 'notepad':      return <NotepadApp />
    case 'taskmanager':  return <TaskManagerApp />
    case 'jsonformat':   return <JSONFormatterApp />
    case 'base64':       return <Base64App />
    case 'markdown':     return <MarkdownApp />
    case 'colorpicker':  return <ColorPickerApp />
    case 'passgen':      return <PasswordGenApp />
    case 'diffview':     return <DiffViewerApp />
    case 'coderunner':   return <CodeRunnerApp />
    case 'lorem':        return <LoremApp />
    case 'hashgen':      return <HashGenApp />
    case 'paint':        return <PaintApp />
    case 'asciiart':     return <ASCIIArtApp />
    case 'pixelart':     return <PixelArtApp />
    case 'calendar':     return <CalendarApp />
    case 'pomodoro':     return <PomodoroApp />
    case 'stopwatch':    return <StopwatchApp />
    case 'currency':     return <CurrencyApp />
    case 'bmi':          return <BMIApp />
    case 'agecalc':      return <AgeCalcApp />
    case 'habittracker': return <HabitTrackerApp />
    case 'newsticker':   return <NewsTickerApp />
    case 'leaderboard':  return <LeaderboardApp />
    case 'githubstats':  return <GitHubStatsApp />
    case 'wikipedia':    return <WikipediaApp />
    case 'tamagotchi':   return <TamagotchiApp />
    case 'stocks':       return <StocksApp />
    case 'horoscope':    return <HoroscopeApp />
    case 'lovecalc':     return <LoveCalcApp />
    case 'magic8':       return <Magic8App />
    case 'deployed':     return <DeployedApp />
    case 'sortvis':      return <SortVisApp />
    case 'pathvis':      return <PathVisApp />
    case 'binconv':      return <BinConvApp />
    case 'truthtable':   return <TruthTableApp />
    case 'eqsolver':     return <EqSolverApp />
    case 'mandelbrot':   return <MandelbrotApp />
    case 'cellaut':      return <CellAutApp />
    case 'statsCalc':    return <StatsCalcApp />
    case 'fibprime':     return <FibPrimeApp />
    case 'logicgate':    return <LogicGateApp />
    case 'isstrack':     return <ISSTrackerApp />
    case 'apod':         return <APODApp />
    case 'bookSearch':   return <BookSearchApp />
    case 'exchRate':     return <ExchRateApp />
    case 'ipgeo':        return <IPGeoApp />
    case 'randuser':     return <RandUserApp />
    case 'flashcard':    return <FlashcardApp />
    case 'budget':       return <BudgetApp />
    case 'recipe':       return <RecipeApp />
    case 'countdown':    return <CountdownApp />
    case 'mealgent':     return <MealGenApp />
    case 'studysched':   return <StudySchedApp />
    case 'faketwitter':  return <FakeTwitterApp />
    case 'fakewhatsapp': return <FakeWhatsAppApp />
    case 'confession':   return <ConfessionApp />
    case 'compliment':   return <ComplimentApp />
    case 'insult':       return <InsultApp />
    case 'debate':       return <DebateApp />
    case 'linuscall':    return <LinusCallApp />
    case 'cgpasim':      return <CGPASimApp />
    case 'ratemycode':   return <RateMyCodeApp />
    case 'rickroll':     return <RickrollApp />
    case 'excusegen':    return <ExcuseGenApp />
    case 'screensaver':  return <ScreensaverApp />
    case 'fakeload':     return <FakeLoadApp />
    case 'fortunecook':  return <FortuneCookieApp />
    case 'fixbug':       return <FixBugApp />
    case 'kbtrainer':    return <KBTrainerApp />
    case 'syslog':       return <SysLogApp />
    case 'clipboard':    return <ClipboardApp />
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
      setMobilePage(appId === 'terminal' ? null : appId)
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
      <div className="app-root">
        {mobilePage ? (
          // Mobile app view
          <div className="mobile-app-view">
            <div className="mobile-app-header">
              <button
                className="mobile-back-btn"
                onClick={function() { setMobilePage(null) }}
              >
                {'← back'}
              </button>
              <span className="mobile-app-title">{mobilePage}</span>
            </div>
            <div className="mobile-app-content">
              <AppContent appId={mobilePage} />
            </div>
          </div>
        ) : (
          // Mobile terminal view
          <div className="mobile-terminal-view">
            <div className="mobile-terminal-header">
              <span className="mobile-header-logo">SlashDot OS</span>
              <span className="mobile-header-badge">25MS</span>
            </div>
            <div className="mobile-terminal-body">
              <TerminalWindow
                onOpenWindow={handleOpenWindow}
                onEasterEgg={handleEasterEgg}
              />
            </div>
            <div className="mobile-nav">
              {([
                ['home',    '⌂',  'Home'],
                ['about',   '📄', 'About'],
                ['team',    '👥', 'Team'],
                ['stack',   '⚙',  'Stack'],
                ['contact', '@',  'Contact'],
              ] as [AppId, string, string][]).map(function(item) {
                return (
                  <button
                    key={item[0]}
                    className={'mobile-nav-btn' + (mobilePage === item[0] ? ' active' : '')}
                    onClick={function() { setMobilePage(item[0]) }}
                  >
                    <span className="mobile-nav-icon">{item[1]}</span>
                    <span className="mobile-nav-label">{item[2]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {easterEgg === 'confetti' && (
          <Confetti onDone={function() { setEasterEgg(null) }} />
        )}
        {easterEgg === 'matrix' && (
          <MatrixRain onDone={function() { setEasterEgg(null) }} />
        )}
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