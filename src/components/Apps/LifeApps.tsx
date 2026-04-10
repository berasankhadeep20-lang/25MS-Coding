import { useState, useEffect, useRef } from 'react'

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
interface CalEvent {
  date: string
  title: string
  color: string
}

export function CalendarApp() {
  const [now, setNow] = useState(new Date())
  const [events, setEvents] = useState<CalEvent[]>([
    { date: '2026-04-11', title: 'Competition Submission Deadline!', color: '#ff5050' },
    { date: '2026-04-15', title: 'SlashDot Club Meeting', color: '#00ff46' },
    { date: '2026-04-20', title: 'Hackathon', color: '#ffd700' },
  ])
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newColor, setNewColor] = useState('#00c8ff')

  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' })

  function addEvent() {
    if (!newTitle.trim() || !newDate) return
    setEvents(prev => [...prev, { date: newDate, title: newTitle.trim(), color: newColor }])
    setNewTitle('')
    setNewDate('')
  }

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// calendar.app</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => setNow(new Date(year, month - 1, 1))} style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer', padding: '2px 10px' }}>‹</button>
        <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>{monthName}</span>
        <button onClick={() => setNow(new Date(year, month + 1, 1))} style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer', padding: '2px 10px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 12 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} style={{ textAlign: 'center', color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '4px 0' }}>{d}</div>)}
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const dayEvents = events.filter(e => e.date === dateStr)
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
          return (
            <div key={day} style={{ textAlign: 'center', padding: '4px 2px', borderRadius: 4, background: isToday ? '#00ff4620' : 'transparent', border: `1px solid ${isToday ? '#00ff46' : 'transparent'}` }}>
              <span style={{ color: isToday ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{day}</span>
              {dayEvents.map((e, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: e.color, margin: '1px auto' }} />)}
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// events</p>
      <div style={{ maxHeight: 100, overflowY: 'auto', marginBottom: 10 }}>
        {events.sort((a,b) => a.date.localeCompare(b.date)).map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '3px 0', borderBottom: '1px solid #111' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 80 }}>{e.date}</span>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{e.title}</span>
            <button onClick={() => setEvents(prev => prev.filter((_, j) => j !== i))} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
          style={{ padding: '5px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Event title..."
          style={{ flex: 1, padding: '5px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }} />
        <button onClick={addEvent} style={{ padding: '5px 12px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>+ Add</button>
      </div>
    </div>
  )
}

// ─── POMODORO ─────────────────────────────────────────────────────────────────
export function PomodoroApp() {
  const [mode, setMode] = useState<'work' | 'break' | 'long'>('work')
  const [time, setTime] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const DURATIONS = { work: 25 * 60, break: 5 * 60, long: 15 * 60 }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(t => {
          if (t <= 1) {
            setRunning(false)
            if (mode === 'work') setCycles(c => c + 1)
            window.dispatchEvent(new CustomEvent('slashdot-notify', { detail: { message: `${mode === 'work' ? 'Work' : 'Break'} session complete!`, type: 'success' } }))
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, mode])

  function switchMode(m: typeof mode) {
    setMode(m); setTime(DURATIONS[m]); setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const mins = String(Math.floor(time / 60)).padStart(2, '0')
  const secs = String(time % 60).padStart(2, '0')
  const pct = ((DURATIONS[mode] - time) / DURATIONS[mode]) * 100
  const modeColor = mode === 'work' ? '#ff5050' : mode === 'break' ? '#00ff46' : '#00c8ff'

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// pomodoro.app</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {(['work', 'break', 'long'] as const).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            style={{ padding: '4px 14px', background: mode === m ? `${modeColor}20` : 'transparent', border: `1px solid ${mode === m ? modeColor : '#333'}`, borderRadius: 4, color: mode === m ? modeColor : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m === 'work' ? '🍅 Work' : m === 'break' ? '☕ Break' : '😴 Long Break'}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px' }}>
        <svg width={160} height={160} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx={80} cy={80} r={70} fill="none" stroke="#1a1a1a" strokeWidth={8} />
          <circle cx={80} cy={80} r={70} fill="none" stroke={modeColor} strokeWidth={8}
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - pct / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.5s', filter: `drop-shadow(0 0 6px ${modeColor})` }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: modeColor, fontFamily: 'JetBrains Mono', fontSize: 36, fontWeight: 700 }}>{mins}:{secs}</span>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{mode}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setRunning(r => !r)}
          style={{ padding: '8px 28px', background: `${modeColor}20`, border: `1px solid ${modeColor}`, borderRadius: 8, color: modeColor, fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer' }}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={() => { setTime(DURATIONS[mode]); setRunning(false) }}
          style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer' }}>
          ↺
        </button>
      </div>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>🍅 Cycles completed: {cycles}</p>
    </div>
  )
}

// ─── STOPWATCH ────────────────────────────────────────────────────────────────
export function StopwatchApp() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastLap = useRef(0)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 10), 10)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  function format(ms: number) {
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    const cs = Math.floor((ms % 1000) / 10)
    return `${h ? String(h).padStart(2,'0') + ':' : ''}${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`
  }

  function lap() {
    const lapTime = time - lastLap.current
    lastLap.current = time
    setLaps(prev => [lapTime, ...prev])
  }

  function reset() {
    setRunning(false); setTime(0); setLaps([]); lastLap.current = 0
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// stopwatch.app</p>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 48, fontWeight: 700, color: '#00ff46', margin: '20px 0', textShadow: '0 0 20px #00ff4640' }}>
        {format(time)}
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setRunning(r => !r)}
          style={{ padding: '8px 24px', background: running ? '#ff505020' : '#00ff4620', border: `1px solid ${running ? '#ff5050' : '#00ff46'}`, borderRadius: 8, color: running ? '#ff5050' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={lap} disabled={!running}
          style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: running ? '#ffd700' : '#444', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: running ? 'pointer' : 'default' }}>
          Lap
        </button>
        <button onClick={reset}
          style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>
          ↺ Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div style={{ maxHeight: 160, overflowY: 'auto', textAlign: 'left' }}>
          <p className="app-label yellow" style={{ textAlign: 'left', marginBottom: 6 }}>// laps</p>
          {laps.map((lap, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #111' }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Lap {laps.length - i}</span>
              <span style={{ color: i === 0 ? '#ffd700' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{format(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}