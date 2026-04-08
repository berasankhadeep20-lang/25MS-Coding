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

// ─── CURRENCY CONVERTER ───────────────────────────────────────────────────────
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5, JPY: 149.2,
  CAD: 1.36, AUD: 1.53, CHF: 0.9, CNY: 7.24, SGD: 1.35,
  AED: 3.67, BTC: 0.000015,
}

export function CurrencyApp() {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')

  const result = (parseFloat(amount) / RATES[from]) * RATES[to]
  const currencies = Object.keys(RATES)

  const selectStyle = {
    padding: '6px 8px', background: '#111', border: '1px solid #222',
    borderRadius: 6, color: '#aaa', fontFamily: 'JetBrains Mono',
    fontSize: 12, outline: 'none', cursor: 'pointer',
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px' }}>
      <p className="app-label cyan">// currency.app — Currency Converter</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>⚠ Rates are approximate and fixed — not live data</p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
          style={{ width: 120, padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 14, outline: 'none' }} />
        <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
          {currencies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => { const t = from; setFrom(to); setTo(t) }}
          style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer' }}>⇄</button>
        <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
          {currencies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ background: '#111', border: '1px solid #00ff4640', borderRadius: 10, padding: '20px', textAlign: 'center', marginBottom: 16 }}>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 8px' }}>{amount} {from} =</p>
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 36, fontWeight: 700, margin: 0, textShadow: '0 0 20px #00ff4640' }}>
          {isNaN(result) ? '—' : result.toFixed(4)}
        </p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 14, margin: '8px 0 0' }}>{to}</p>
      </div>
      <p className="app-label yellow">// all conversions</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {currencies.filter(c => c !== from).map(c => (
          <div key={c} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '6px 10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{c}</span>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
              {((parseFloat(amount) / RATES[from]) * RATES[c]).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── BMI CALCULATOR ───────────────────────────────────────────────────────────
export function BMIApp() {
  const [weight, setWeight] = useState('70')
  const [height, setHeight] = useState('170')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')

  const bmi = unit === 'metric'
    ? parseFloat(weight) / ((parseFloat(height) / 100) ** 2)
    : (parseFloat(weight) * 703) / (parseFloat(height) ** 2)

  function category(): { label: string; color: string } {
    if (isNaN(bmi)) return { label: '—', color: '#555' }
    if (bmi < 18.5) return { label: 'Underweight', color: '#00c8ff' }
    if (bmi < 25)   return { label: 'Normal', color: '#00ff46' }
    if (bmi < 30)   return { label: 'Overweight', color: '#ffd700' }
    return { label: 'Obese', color: '#ff5050' }
  }

  const { label, color } = category()
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100))

  const inputStyle = {
    padding: '8px', background: '#111', border: '1px solid #222',
    borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono',
    fontSize: 14, outline: 'none', width: '100%',
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px' }}>
      <p className="app-label cyan">// bmi.app — BMI Calculator</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['metric', 'imperial'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)}
            style={{ padding: '4px 14px', background: unit === u ? '#00ff4620' : 'transparent', border: `1px solid ${unit === u ? '#00ff46' : '#333'}`, borderRadius: 4, color: unit === u ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {u}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 4 }}>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</p>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 4 }}>Height ({unit === 'metric' ? 'cm' : 'inches'})</p>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ background: '#111', border: `1px solid ${color}40`, borderRadius: 10, padding: '20px', textAlign: 'center', marginBottom: 16 }}>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 8px' }}>Your BMI</p>
        <p style={{ color, fontFamily: 'JetBrains Mono', fontSize: 48, fontWeight: 700, margin: '0 0 8px', textShadow: `0 0 20px ${color}40` }}>
          {isNaN(bmi) ? '—' : bmi.toFixed(1)}
        </p>
        <p style={{ color, fontFamily: 'JetBrains Mono', fontSize: 16, margin: 0, fontWeight: 700 }}>{label}</p>
      </div>
      <div style={{ height: 8, background: 'linear-gradient(to right, #00c8ff, #00ff46, #ffd700, #ff5050)', borderRadius: 4, marginBottom: 4, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -4, left: `${pct}%`, transform: 'translateX(-50%)', width: 16, height: 16, background: color, borderRadius: '50%', border: '2px solid #fff', transition: 'left 0.3s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#444' }}>
        <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
      </div>
    </div>
  )
}

// ─── AGE CALCULATOR ──────────────────────────────────────────────────────────
export function AgeCalcApp() {
  const [dob, setDob] = useState('2006-01-01')
  const now = new Date()
  const birth = new Date(dob)
  const diffMs = now.getTime() - birth.getTime()
  const years = Math.floor(diffMs / (365.25 * 24 * 3600 * 1000))
  const months = Math.floor((diffMs % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000))
  const days = Math.floor((diffMs % (30.44 * 24 * 3600 * 1000)) / (24 * 3600 * 1000))
  const hours = Math.floor((diffMs % (24 * 3600 * 1000)) / 3600000)
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1)
  const daysUntil = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000)

  return (
    <div className="app-body" style={{ padding: '20px 24px' }}>
      <p className="app-label cyan">// age.app — Age Calculator</p>
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12, marginBottom: 6 }}>Date of Birth</p>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)}
          style={{ padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 14, outline: 'none' }} />
      </div>
      {diffMs > 0 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Years', value: years, color: '#00ff46' },
              { label: 'Months', value: months, color: '#00c8ff' },
              { label: 'Days', value: days, color: '#ffd700' },
              { label: 'Hours', value: hours, color: '#c864ff' },
            ].map(item => (
              <div key={item.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
                <p style={{ color: item.color, fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, margin: '0 0 4px' }}>{item.value}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#111', border: '1px solid #ffd70030', borderRadius: 8, padding: '12px 16px' }}>
            <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 4px' }}>🎂 Next birthday in {daysUntil} day{daysUntil !== 1 ? 's' : ''}</p>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>
              Total: ~{Math.floor(diffMs / 86400000).toLocaleString()} days • ~{Math.floor(diffMs / 3600000).toLocaleString()} hours
            </p>
          </div>
        </>
      )}
    </div>
  )
}

// ─── HABIT TRACKER ─────────────────────────────────────────────────────────────
interface Habit {
  id: number
  name: string
  color: string
  done: Record<string, boolean>
}

let habitId = 3
const today = () => new Date().toISOString().split('T')[0]
const last7 = () => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d.toISOString().split('T')[0] })

export function HabitTrackerApp() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Code for 1 hour', color: '#00ff46', done: { [today()]: true } },
    { id: 2, name: 'Drink 8 glasses of water', color: '#00c8ff', done: {} },
  ])
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('#ffd700')
  const days = last7()

  function toggle(id: number, date: string) {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: { ...h.done, [date]: !h.done[date] } } : h))
  }

  function addHabit() {
    if (!newName.trim()) return
    setHabits(prev => [...prev, { id: ++habitId, name: newName.trim(), color: newColor, done: {} }])
    setNewName('')
  }

  function deleteHabit(id: number) { setHabits(prev => prev.filter(h => h.id !== id)) }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// habits.app — Habit Tracker</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
          <thead>
            <tr>
              <th style={{ color: '#555', textAlign: 'left', padding: '4px 8px', minWidth: 140 }}>Habit</th>
              {days.map(d => <th key={d} style={{ color: '#555', padding: '4px 8px', minWidth: 36, textAlign: 'center', fontSize: 9 }}>{d.slice(5)}</th>)}
              <th style={{ color: '#555', padding: '4px 8px', textAlign: 'center' }}>%</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {habits.map(h => {
              const streak = days.filter(d => h.done[d]).length
              return (
                <tr key={h.id}>
                  <td style={{ padding: '4px 8px', color: h.color, fontWeight: 700 }}>{h.name}</td>
                  {days.map(d => (
                    <td key={d} style={{ padding: '4px 8px', textAlign: 'center' }}>
                      <button onClick={() => toggle(h.id, d)}
                        style={{ width: 24, height: 24, borderRadius: 6, background: h.done[d] ? h.color : '#1a1a1a', border: `1px solid ${h.done[d] ? h.color : '#333'}`, cursor: 'pointer', boxShadow: h.done[d] ? `0 0 6px ${h.color}60` : 'none' }} />
                    </td>
                  ))}
                  <td style={{ padding: '4px 8px', textAlign: 'center', color: h.color, fontWeight: 700 }}>{Math.round(streak / 7 * 100)}%</td>
                  <td style={{ padding: '4px 8px' }}>
                    <button onClick={() => deleteHabit(h.id)} style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer' }}>✕</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addHabit() }} placeholder="New habit..."
          style={{ flex: 1, padding: '6px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }} />
        <button onClick={addHabit} style={{ padding: '6px 12px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>+ Add</button>
      </div>
    </div>
  )
}