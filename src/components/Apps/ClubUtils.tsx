import { useState, useEffect, useRef } from 'react'

// ─── IISER CAMPUS MAP ─────────────────────────────────────────────────────────
const BUILDINGS = [
  { id: 'lhc', name: 'Lecture Hall Complex', short: 'LHC', x: 48, y: 35, w: 22, h: 16, color: '#00ff46', desc: 'All lecture halls and tutorial rooms. Home of LHC G05, 107, 213.' },
  { id: 'lb', name: 'Library', short: 'Library', x: 22, y: 30, w: 14, h: 12, color: '#00c8ff', desc: 'Central library. Best WiFi on campus (theoretically).' },
  { id: 'lab1', name: 'Biology Lab Complex', short: 'Bio Lab', x: 72, y: 20, w: 16, h: 12, color: '#c864ff', desc: 'Biology research and teaching labs.' },
  { id: 'lab2', name: 'Chemistry Block', short: 'Chem', x: 72, y: 42, w: 16, h: 12, color: '#ff8800', desc: 'Chemistry labs. Smells like science.' },
  { id: 'lab3', name: 'Physics Block', short: 'Physics', x: 50, y: 60, w: 16, h: 12, color: '#ffd700', desc: 'Physics labs and some dark offices.' },
  { id: 'cs', name: 'CS & Math Block', short: 'CS/Math', x: 28, y: 55, w: 14, h: 12, color: '#ff5050', desc: 'Where SlashDot members spend too much time.' },
  { id: 'hostel_a', name: 'Hostel A', short: 'Hostel A', x: 8, y: 55, w: 12, h: 10, color: '#888', desc: 'Rooms, WiFi battles, and 3am debugging sessions.' },
  { id: 'hostel_b', name: 'Hostel B', short: 'Hostel B', x: 8, y: 70, w: 12, h: 10, color: '#888', desc: 'More rooms. Same WiFi situation.' },
  { id: 'hostel_c', name: 'Hostel C', short: 'Hostel C', x: 22, y: 73, w: 12, h: 10, color: '#888', desc: 'Building C. The C stands for "Coffee needed".' },
  { id: 'canteen', name: 'Canteen', short: 'Canteen', x: 42, y: 78, w: 14, h: 8, color: '#ff5050', desc: 'Dal rice. Every day. Dal rice.' },
  { id: 'sports', name: 'Sports Complex', short: 'Sports', x: 78, y: 65, w: 14, h: 12, color: '#00c8ff', desc: 'Where non-SlashDot members spend time.' },
  { id: 'admin', name: 'Admin Block', short: 'Admin', x: 34, y: 15, w: 12, h: 12, color: '#aaa', desc: 'Where forms go to die.' },
]

export function CampusMapApp() {
  const [selected, setSelected] = useState<typeof BUILDINGS[0] | null>(null)
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e1e1e' }}>
        <p className="app-label cyan" style={{ margin: 0 }}>// campus-map.app — IISER Kolkata Campus</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '2px 0 0' }}>Click any building for info</p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* SVG Map */}
        <div style={{ flex: 1, position: 'relative', background: '#0d1a0d', overflow: 'hidden', minHeight: 200 }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
            {/* Background grid */}
            {Array.from({ length: 10 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#ffffff05" strokeWidth="0.2" />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#ffffff05" strokeWidth="0.2" />
            ))}
            {/* Roads */}
            <rect x="20" y="0" width="2" height="100" fill="#1a2a1a" />
            <rect x="0" y="48" width="100" height="2" fill="#1a2a1a" />
            <rect x="68" y="0" width="2" height="100" fill="#1a2a1a" />
            {/* Buildings */}
            {BUILDINGS.map(b => (
              <g key={b.id} onClick={() => setSelected(s => s?.id === b.id ? null : b)} style={{ cursor: 'pointer' }}>
                <rect
                  x={b.x} y={b.y} width={b.w} height={b.h}
                  fill={highlighted === b.id || selected?.id === b.id ? b.color + '60' : b.color + '25'}
                  stroke={selected?.id === b.id ? b.color : b.color + '80'}
                  strokeWidth={selected?.id === b.id ? 0.5 : 0.3}
                  rx="0.5"
                  onMouseEnter={() => setHighlighted(b.id)}
                  onMouseLeave={() => setHighlighted(null)}
                />
                <text
                  x={b.x + b.w / 2} y={b.y + b.h / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={b.color} fontSize="2.2" fontFamily="JetBrains Mono"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {b.short}
                </text>
              </g>
            ))}
            {/* SlashDot marker on CS block */}
            <circle cx="35" cy="61" r="1.5" fill="#00ff46" opacity="0.9" />
            <text x="35" y="57" textAnchor="middle" fill="#00ff46" fontSize="1.8" fontFamily="JetBrains Mono">📍</text>
          </svg>
        </div>
        {/* Info panel */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid #1e1e1e', background: '#0d0d0d', minHeight: 70 }}>
          {selected ? (
            <div>
              <p style={{ color: selected.color, fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{selected.name}</p>
              <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0, lineHeight: 1.6 }}>{selected.desc}</p>
            </div>
          ) : (
            <div>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>Click a building to learn about it.</p>
              <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '4px 0 0' }}>📍 = SlashDot territory (CS/Math Block)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── LHC ROOM STATUS ──────────────────────────────────────────────────────────
interface Room {
  id: string
  floor: string
  number: string
  capacity: number
  status: 'free' | 'occupied' | 'unknown'
  occupant?: string
  freeAt?: string
}

function getRoomStatus(roomId: string): 'free' | 'occupied' | 'unknown' {
  const now = new Date()
  const hour = now.getHours()
  const min = now.getMinutes()
  const day = now.getDay()
  // Weekends mostly free
  if (day === 0 || day === 6) return Math.random() > 0.8 ? 'occupied' : 'free'
  // Outside class hours
  if (hour < 8 || hour >= 18) return 'free'
  // Use room id as seed for deterministic-ish status
  const seed = roomId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const slotIdx = Math.floor((hour - 8) / 1) + (min >= 30 ? 0.5 : 0)
  const pseudo = (seed * 31 + slotIdx * 17) % 100
  return pseudo < 45 ? 'occupied' : 'free'
}

const COURSES = [
  'MTH101', 'PHY102', 'CHM103', 'BIO104', 'CS201', 'MTH201',
  'PHY203', 'CHM204', 'CS301', 'MTH301', 'PHY401', 'CS401',
  'BIO202', 'CHM301', 'MTH401', 'CS501',
]

const LHC_ROOMS: Room[] = [
  // Ground floor
  { id: 'G01', floor: 'Ground', number: 'G01', capacity: 120 },
  { id: 'G02', floor: 'Ground', number: 'G02', capacity: 120 },
  { id: 'G03', floor: 'Ground', number: 'G03', capacity: 80  },
  { id: 'G04', floor: 'Ground', number: 'G04', capacity: 60  },
  { id: 'G05', floor: 'Ground', number: 'G05', capacity: 60  },
  { id: 'G06', floor: 'Ground', number: 'G06', capacity: 40  },
  // First floor
  { id: '101', floor: 'First',  number: '101', capacity: 120 },
  { id: '102', floor: 'First',  number: '102', capacity: 80  },
  { id: '103', floor: 'First',  number: '103', capacity: 80  },
  { id: '107', floor: 'First',  number: '107', capacity: 60  },
  { id: '108', floor: 'First',  number: '108', capacity: 40  },
  { id: '109', floor: 'First',  number: '109', capacity: 40  },
  // Second floor
  { id: '201', floor: 'Second', number: '201', capacity: 80  },
  { id: '202', floor: 'Second', number: '202', capacity: 80  },
  { id: '213', floor: 'Second', number: '213', capacity: 60  },
  { id: '214', floor: 'Second', number: '214', capacity: 40  },
  { id: '215', floor: 'Second', number: '215', capacity: 40  },
].map(r => {
  const status = getRoomStatus(r.id)
  const seed = r.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return {
    ...r,
    status,
    occupant: status === 'occupied' ? COURSES[seed % COURSES.length] : undefined,
    freeAt: status === 'occupied'
      ? `${new Date().getHours() + 1}:00`
      : undefined,
  }
})

export function LHCRoomsApp() {
  const [rooms, setRooms] = useState<Room[]>(LHC_ROOMS)
  const [floor, setFloor] = useState<'All' | 'Ground' | 'First' | 'Second'>('All')
  const [lastUpdate, setLastUpdate] = useState(new Date())

  function refresh() {
    setRooms(LHC_ROOMS.map(r => {
      const status = getRoomStatus(r.id)
      const seed = r.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
      return {
        ...r,
        status,
        occupant: status === 'occupied' ? COURSES[seed % COURSES.length] : undefined,
        freeAt: status === 'occupied' ? `${new Date().getHours() + 1}:00` : undefined,
      }
    }))
    setLastUpdate(new Date())
  }

  const filtered = floor === 'All' ? rooms : rooms.filter(r => r.floor === floor)
  const freeCount = filtered.filter(r => r.status === 'free').length

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <p className="app-label cyan" style={{ margin: 0 }}>// lhc-rooms.app — LHC Room Status</p>
        <button onClick={refresh}
          style={{ background: 'transparent', border: 'none', color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>↺ Refresh</button>
      </div>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, marginBottom: 12 }}>
        Lecture Hall Complex · Updated {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {freeCount} rooms available
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Free Now', value: rooms.filter(r => r.status === 'free').length, color: '#00ff46' },
          { label: 'Occupied', value: rooms.filter(r => r.status === 'occupied').length, color: '#ff5050' },
          { label: 'Total', value: rooms.length, color: '#888' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
            <p style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {(['All', 'Ground', 'First', 'Second'] as const).map(f => (
          <button key={f} onClick={() => setFloor(f)}
            style={{ padding: '3px 10px', background: floor === f ? '#00ff4620' : 'transparent', border: `1px solid ${floor === f ? '#00ff46' : '#333'}`, borderRadius: 4, color: floor === f ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
            {f === 'All' ? 'All Floors' : `${f} Floor`}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filtered.map(room => (
          <div key={room.id} style={{
            background: '#111',
            border: `1px solid ${room.status === 'free' ? '#00ff4630' : room.status === 'occupied' ? '#ff505030' : '#1e1e1e'}`,
            borderLeft: `3px solid ${room.status === 'free' ? '#00ff46' : room.status === 'occupied' ? '#ff5050' : '#444'}`,
            borderRadius: 8, padding: '10px 12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>LHC {room.number}</span>
              <span style={{
                color: room.status === 'free' ? '#00ff46' : '#ff5050',
                fontFamily: 'JetBrains Mono', fontSize: 9,
                background: room.status === 'free' ? '#00ff4615' : '#ff505015',
                padding: '2px 6px', borderRadius: 10,
              }}>
                {room.status === 'free' ? '● FREE' : '● BUSY'}
              </span>
            </div>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '0 0 2px' }}>
              {room.floor} Floor · Cap: {room.capacity}
            </p>
            {room.status === 'occupied' && room.occupant && (
              <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '2px 0 0', fontWeight: 700 }}>
                {room.occupant} · Free at {room.freeAt}
              </p>
            )}
            {room.status === 'free' && (
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '2px 0 0' }}>
                Available now
              </p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '8px 12px' }}>
        <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>
          ⚠ Status is estimated based on typical timetables. Verify in person. Rooms: G01–G06 (ground), 101–109 (1st), 201–215 (2nd)
        </p>
      </div>
    </div>
  )
}

// ─── TIMETABLE BUILDER ────────────────────────────────────────────────────────
const SUBJECTS_LIST = [
  'MTH101', 'MTH201', 'MTH301', 'MTH401',
  'PHY101', 'PHY201', 'PHY301', 'PHY401',
  'CHM101', 'CHM201', 'CHM301',
  'BIO101', 'BIO201', 'BIO301',
  'CS101', 'CS201', 'CS301', 'CS401',
  'Earth Sci', 'Humanities', 'Research', 'Free',
]

const DAYS_T = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const SLOTS_T = ['8–9', '9–10', '10–11', '11–12', '12–1', '2–3', '3–4', '4–5', '5–6']

const SUBJ_COLORS: Record<string, string> = {
  MTH101: '#ff5050', MTH201: '#ff6060', MTH301: '#ff7070', MTH401: '#ff8080',
  PHY101: '#00c8ff', PHY201: '#20d8ff', PHY301: '#40e8ff', PHY401: '#60f8ff',
  CHM101: '#ffd700', CHM201: '#ffe020', CHM301: '#ffea40',
  BIO101: '#00ff46', BIO201: '#20ff56', BIO301: '#40ff66',
  CS101: '#c864ff', CS201: '#d874ff', CS301: '#e884ff', CS401: '#f894ff',
  'Earth Sci': '#ff8800', Humanities: '#aaa', Research: '#888', Free: '#333',
}

export function TimetableApp() {
  const [grid, setGrid] = useState<Record<string, Record<string, string>>>(() => {
    const saved = (() => { try { const r = localStorage.getItem('slashdot-timetable'); return r ? JSON.parse(r) : null } catch { return null } })()
    if (saved) return saved
    const g: Record<string, Record<string, string>> = {}
    DAYS_T.forEach(d => { g[d] = {}; SLOTS_T.forEach(s => { g[d][s] = '' }) })
    return g
  })
  const [selected, setSelected] = useState('CS201')

  function setCell(day: string, slot: string) {
    setGrid(prev => {
      const next = { ...prev, [day]: { ...prev[day], [slot]: prev[day][slot] === selected ? '' : selected } }
      try { localStorage.setItem('slashdot-timetable', JSON.stringify(next)) } catch {}
      return next
    })
  }

  function clearAll() {
    const g: Record<string, Record<string, string>> = {}
    DAYS_T.forEach(d => { g[d] = {}; SLOTS_T.forEach(s => { g[d][s] = '' }) })
    setGrid(g)
    try { localStorage.removeItem('slashdot-timetable') } catch {}
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <p className="app-label cyan" style={{ margin: 0 }}>// timetable.app — Study Schedule</p>
          <button onClick={clearAll}
            style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>Clear All</button>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {SUBJECTS_LIST.map(s => (
            <button key={s} onClick={() => setSelected(s)}
              style={{ padding: '2px 6px', background: selected === s ? (SUBJ_COLORS[s] ?? '#333') + '30' : 'transparent', border: `1px solid ${selected === s ? (SUBJ_COLORS[s] ?? '#333') : '#222'}`, borderRadius: 3, color: selected === s ? (SUBJ_COLORS[s] ?? '#fff') : '#444', fontFamily: 'JetBrains Mono', fontSize: 9, cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'JetBrains Mono', fontSize: 9, width: '100%' }}>
          <thead>
            <tr>
              <th style={{ color: '#555', padding: '4px 8px', textAlign: 'left', minWidth: 44 }}>Time</th>
              {DAYS_T.map(d => <th key={d} style={{ color: '#888', padding: '4px 6px', minWidth: 60 }}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {SLOTS_T.map(slot => (
              <tr key={slot}>
                <td style={{ color: '#555', padding: '2px 8px', fontSize: 8, whiteSpace: 'nowrap' }}>{slot}</td>
                {DAYS_T.map(day => {
                  const subj = grid[day]?.[slot] ?? ''
                  const color = SUBJ_COLORS[subj] ?? '#333'
                  return (
                    <td key={day} style={{ padding: 2 }}>
                      <div onClick={() => setCell(day, slot)}
                        style={{ height: 28, background: subj ? color + '25' : '#111', border: `1px solid ${subj ? color + '60' : '#1e1e1e'}`, borderRadius: 3, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: subj ? color : '#2a2a2a', fontSize: 8, fontFamily: 'JetBrains Mono', transition: 'all 0.1s', userSelect: 'none' }}>
                        {subj || '+'}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '4px 12px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 8, color: '#333' }}>
        Select a subject above → click cells to assign. Click again to clear. Auto-saved.
      </div>
    </div>
  )
}

// ─── CLUB PROJECT ROADMAP ─────────────────────────────────────────────────────
interface RoadmapItem {
  title: string
  desc: string
  status: 'done' | 'in-progress' | 'planned' | 'idea'
  assignee: string
  priority: 'high' | 'medium' | 'low'
}

const ROADMAP: Record<string, RoadmapItem[]> = {
  'Done ✅': [
    { title: 'SlashDot OS v1', desc: 'Browser-based OS as club website. 60+ apps, terminal, easter eggs.', status: 'done', assignee: 'Sankhadeep + S. Bari', priority: 'high' },
    { title: 'Mobile Optimization', desc: 'Full mobile layout with touch terminal and app grid.', status: 'done', assignee: 'Sankhadeep', priority: 'high' },
    { title: 'Club Pages', desc: 'Blog, Resources, Hall of Fame, Rules, Newsletter, Members, Recruitment, Alumni.', status: 'done', assignee: 'Sankhadeep', priority: 'high' },
    { title: 'RISC-V WASM Emulator', desc: 'RV32IMAF core compiled to WebAssembly running in browser.', status: 'done', assignee: 'S. Bari', priority: 'high' },
  ],
  'In Progress 🔄': [
    { title: 'PWA Support', desc: 'Install SlashDot OS as a phone/desktop app.', status: 'in-progress', assignee: 'Sankhadeep', priority: 'high' },
    { title: 'Real Member Photos', desc: 'Waiting on OBs to send photos for team page.', status: 'in-progress', assignee: 'OBs', priority: 'medium' },
    { title: 'Real Event Data', desc: 'OBs to confirm and populate event dates.', status: 'in-progress', assignee: 'OBs', priority: 'medium' },
  ],
  'Planned 📋': [
    { title: 'Persistent Guestbook', desc: 'Backend to store guestbook entries across visitors.', status: 'planned', assignee: 'TBD', priority: 'medium' },
    { title: 'SlashDot GitHub Org', desc: 'Set up proper GitHub org with all club projects.', status: 'planned', assignee: 'OBs', priority: 'low' },
    { title: 'Club Project Archive', desc: 'All past projects documented with source code and demos.', status: 'planned', assignee: 'Core Committee', priority: 'medium' },
    { title: 'Annual Magazine', desc: 'Digital version of annual SlashDot magazine/newsletter.', status: 'planned', assignee: 'Core Committee', priority: 'low' },
  ],
  'Ideas 💡': [
    { title: 'Multiplayer Terminal', desc: 'Two users type in same terminal via WebSocket.', status: 'idea', assignee: '?', priority: 'high' },
    { title: 'Voice Commands', desc: 'Web Speech API — say "open team" and it opens.', status: 'idea', assignee: '?', priority: 'medium' },
    { title: 'Club Discord Bot', desc: 'Bot that posts SlashDot OS daily challenge to Discord.', status: 'idea', assignee: '?', priority: 'low' },
    { title: 'Mobile App (React Native)', desc: 'Native mobile app version of SlashDot OS.', status: 'idea', assignee: '?', priority: 'low' },
  ],
}

const STATUS_COLORS = { done: '#00ff46', 'in-progress': '#ffd700', planned: '#00c8ff', idea: '#c864ff' }
const PRIORITY_COLORS = { high: '#ff5050', medium: '#ffd700', low: '#555' }

export function RoadmapApp() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function toggle(col: string) {
    setCollapsed(prev => ({ ...prev, [col]: !prev[col] }))
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// roadmap.app — SlashDot Project Roadmap</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>
        What we've built, what we're building, what's next.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(ROADMAP).map(([col, items]) => (
          <div key={col}>
            <button onClick={() => toggle(col)}
              style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', marginBottom: 6 }}>
              <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>{col}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{items.length} items</span>
                <span style={{ color: '#444', fontSize: 12 }}>{collapsed[col] ? '▼' : '▲'}</span>
              </div>
            </button>
            {!collapsed[col] && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item, i) => (
                  <div key={i} style={{ background: '#111', border: `1px solid ${STATUS_COLORS[item.status]}25`, borderLeft: `3px solid ${STATUS_COLORS[item.status]}`, borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0, flex: 1 }}>{item.title}</p>
                      <span style={{ color: PRIORITY_COLORS[item.priority], fontFamily: 'JetBrains Mono', fontSize: 8, padding: '1px 6px', border: `1px solid ${PRIORITY_COLORS[item.priority]}40`, borderRadius: 10, marginLeft: 8, flexShrink: 0 }}>
                        {item.priority}
                      </span>
                    </div>
                    <p style={{ color: '#777', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 6px', lineHeight: 1.6 }}>{item.desc}</p>
                    <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>Assignee: {item.assignee}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SLASHDOT FAQ BOT ─────────────────────────────────────────────────────────
const FAQS_BOT: { q: string; keywords: string[]; a: string }[] = [
  { q: 'How do I join SlashDot?', keywords: ['join', 'apply', 'register', 'membership', 'how to'], a: 'Recruitment happens every year when the new batch arrives (usually August). Fill the application form when it opens and come for the informal interaction. No experience required — just curiosity! Email slashdot@iiserkol.ac.in for more.' },
  { q: 'When is the next HackSlash?', keywords: ['hackslash', 'hackathon', 'hack', 'next event'], a: 'HackSlash 2026 is planned for October 2026. 24 hours, teams of 2-4, prizes for top 3. Watch out for the announcement! Type "open events" for the full events calendar.' },
  { q: 'What does SlashDot do?', keywords: ['what', 'does', 'activities', 'club do', 'about'], a: 'SlashDot runs workshops on web dev, ML, competitive programming, and design. We host HackSlash (annual hackathon), the Inter-Batch Competition, and casual coding sessions. We build things together. Type "open about" for more.' },
  { q: 'Who are the OBs?', keywords: ['ob', 'office bearer', 'president', 'secretary', 'treasurer', 'head'], a: 'Current OBs: Shuvam Banerji Seal (President, 22MS), Anuprovo Debnath (Secretary, 23MS), Abhinav Dhingra (Treasurer, 24MS). Type "open team" or "members" to see the full team.' },
  { q: 'How was SlashDot OS built?', keywords: ['built', 'how', 'technology', 'tech stack', 'framework', 'react'], a: 'SlashDot OS is built with React 18, TypeScript, Vite 5, and xterm.js. Games use the Canvas API, the terminal is a real xterm.js emulator, and S. Bari built a RISC-V emulator in C compiled to WASM. Type "open stack" for details.' },
  { q: 'What is the membership fee?', keywords: ['fee', 'cost', 'money', 'pay', 'price'], a: 'There is a nominal annual membership fee. The exact amount is announced during recruitment. Contact slashdot@iiserkol.ac.in or any OB for current rates. It covers workshop costs, events, and pizza.' },
  { q: 'Can I contribute to SlashDot OS?', keywords: ['contribute', 'github', 'open source', 'code', 'pr', 'pull request'], a: 'Yes! SlashDot OS is open source. Check github.com/berasankhadeep20-lang/25MS-Coding. Fork, improve, send a PR. Feature ideas and bug reports are also welcome.' },
  { q: 'What is the terminal for?', keywords: ['terminal', 'command', 'what can', 'commands'], a: 'The terminal is a real emulator powered by xterm.js. Type "help" to see all commands. You can navigate the virtual filesystem, open apps, see club info, run easter eggs, and even pipe commands. Try "members | grep OB".' },
  { q: 'When is recruitment?', keywords: ['recruitment', 'when', 'dates', 'deadline'], a: 'Recruitment opens every year after the new batch arrives, typically in August or September. Applications are open for 2-3 weeks. Follow us or contact the OBs to know the exact dates.' },
  { q: 'Is there a WhatsApp group?', keywords: ['whatsapp', 'group', 'chat', 'contact group'], a: 'Yes! Contact any OB to be added to the SlashDot WhatsApp group. Email: slashdot@iiserkol.ac.in — they will add you. Or talk to Shuvam (22MS), Anuprovo (23MS), or Abhinav (24MS) directly.' },
]

export function SlashDotFAQApp() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([
    { from: 'bot', text: 'Hi! I\'m the SlashDot FAQ Bot 🤖 Ask me anything about the club — joining, events, the website, OBs, hackathons, or anything else!' }
  ])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    const q = input.trim()
    if (!q) return
    setMessages(prev => [...prev, { from: 'user', text: q }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const lower = q.toLowerCase()
      let answer = "I don't have a specific answer for that, but you can email slashdot@iiserkol.ac.in or ask any OB directly. Try typing 'open contact' for contact info!"

      for (const faq of FAQS_BOT) {
        if (faq.keywords.some(k => lower.includes(k))) {
          answer = faq.a
          break
        }
      }

      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: answer }])
    }, 600 + Math.random() * 400)
  }

  const QUICK = ['How to join?', 'Next hackathon?', 'Who are the OBs?', 'Tech stack?', 'Membership fee?']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
        <p className="app-label cyan" style={{ margin: '0 0 2px' }}>// slashdot-faq.app — Ask SlashDot</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>Pre-programmed answers about the club</p>
      </div>

      {/* Quick questions */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 12px', overflowX: 'auto', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
        {QUICK.map(q => (
          <button key={q} onClick={() => { setInput(q); setTimeout(handleSend, 10) }}
            style={{ padding: '3px 10px', background: '#111', border: '1px solid #333', borderRadius: 12, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              background: m.from === 'user' ? '#00ff4620' : '#111',
              border: `1px solid ${m.from === 'user' ? '#00ff4640' : '#1e1e1e'}`,
              borderRadius: m.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              padding: '10px 14px', maxWidth: '85%',
            }}>
              {m.from === 'bot' && <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '0 0 4px', fontWeight: 700 }}>SlashDot Bot</p>}
              <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.7, margin: 0 }}>{m.text}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px 12px 12px 2px', padding: '10px 14px' }}>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0 }}>typing...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 8, background: '#0d0d0d' }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          placeholder="Ask anything about SlashDot..."
          style={{ flex: 1, padding: '8px 12px', background: '#111', border: '1px solid #222', borderRadius: 20, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={handleSend}
          style={{ width: 36, height: 36, borderRadius: '50%', background: '#00ff4620', border: '1px solid #00ff46', color: '#00ff46', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
          ➤
        </button>
      </div>
    </div>
  )
}