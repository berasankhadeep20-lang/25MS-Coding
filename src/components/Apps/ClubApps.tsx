import { useState } from 'react'

// ─── EVENTS APP ───────────────────────────────────────────────────────────────
interface Event {
  title: string
  date: string
  type: 'workshop' | 'competition' | 'hackathon' | 'talk' | 'social' | 'recruitment'
  description: string
  status: 'upcoming' | 'ongoing' | 'completed'
  registrationOpen?: boolean
}

const EVENTS: Event[] = [
  {
    title: 'Inter-Batch Website Development Competition 2026',
    date: '2026-04-11',
    type: 'competition',
    description: 'Annual competition where each batch builds a website for SlashDot Club. This OS you\'re using right now is the 25MS entry!',
    status: 'completed',
  },
  {
    title: 'SlashDot Recruitment Drive — 26MS',
    date: '2026-08-20',
    type: 'recruitment',
    description: 'Annual recruitment for the new 26MS batch. If you love coding or design, this is your sign. Applications open soon.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'Web Development Workshop',
    date: '2026-09-15',
    type: 'workshop',
    description: 'Hands-on workshop covering React, TypeScript, and modern web development practices. Open to all IISER Kolkata students.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'HackSlash 2026 — 24-hour Hackathon',
    date: '2026-10-01',
    type: 'hackathon',
    description: 'Our annual 24-hour hackathon. Build anything — web apps, games, tools, AI projects. Prizes for top 3 teams. Teams of 2-4.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'Open Source Contribution Drive',
    date: '2026-11-01',
    type: 'workshop',
    description: 'Learn how to contribute to open source projects. We\'ll walk through finding issues, making PRs, and getting your first contribution merged.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'Design Workshop — Figma & UI/UX',
    date: '2026-11-20',
    type: 'workshop',
    description: 'Introduction to UI/UX design using Figma. Learn design principles, prototyping, and how to make your apps look good.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'Competitive Programming Bootcamp',
    date: '2026-12-05',
    type: 'workshop',
    description: 'Intensive bootcamp covering data structures, algorithms, and competitive programming techniques. Preparation for ICPC and other competitions.',
    status: 'upcoming',
    registrationOpen: false,
  },
  {
    title: 'SlashDot Annual Showcase 2027',
    date: '2027-02-15',
    type: 'social',
    description: 'Annual showcase of the best projects built by SlashDot members. Open to the entire IISER Kolkata community.',
    status: 'upcoming',
    registrationOpen: false,
  },
]

const TYPE_COLORS: Record<string, string> = {
  workshop: '#00c8ff',
  competition: '#ff5050',
  hackathon: '#ffd700',
  talk: '#c864ff',
  social: '#00ff46',
  recruitment: '#ff8800',
}

const TYPE_ICONS: Record<string, string> = {
  workshop: '📚',
  competition: '🏆',
  hackathon: '⚡',
  talk: '🎤',
  social: '🎉',
  recruitment: '📝',
}

export function EventsApp() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  const filtered = EVENTS.filter(e => filter === 'all' || e.status === filter)
  const upcoming = EVENTS.filter(e => e.status === 'upcoming').length

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <p className="app-label cyan" style={{ margin: 0 }}>// events.app — SlashDot Events</p>
        {upcoming > 0 && (
          <span style={{ background: '#00ff4620', color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: '1px solid #00ff4640' }}>
            {upcoming} upcoming
          </span>
        )}
      </div>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        Events are added by the OBs. Check back regularly!
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {(['all', 'upcoming', 'completed'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '3px 12px', background: filter === f ? '#00ff4620' : 'transparent', border: `1px solid ${filter === f ? '#00ff46' : '#333'}`, borderRadius: 4, color: filter === f ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((event, i) => (
          <div key={i} style={{
            background: '#111',
            border: `1px solid ${event.status === 'upcoming' ? TYPE_COLORS[event.type] + '40' : '#1e1e1e'}`,
            borderLeft: `3px solid ${TYPE_COLORS[event.type]}`,
            borderRadius: 8, padding: '12px 14px',
            opacity: event.status === 'completed' ? 0.7 : 1,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14 }}>{TYPE_ICONS[event.type]}</span>
                  <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>{event.title}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ color: TYPE_COLORS[event.type], fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: `1px solid ${TYPE_COLORS[event.type]}40`, background: TYPE_COLORS[event.type] + '15', textTransform: 'uppercase' }}>
                    {event.type}
                  </span>
                  <span style={{ color: event.status === 'completed' ? '#555' : event.status === 'ongoing' ? '#ffd700' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: `1px solid ${event.status === 'completed' ? '#333' : '#00ff4640'}` }}>
                    {event.status}
                  </span>
                  {event.registrationOpen && (
                    <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: '1px solid #00ff46', background: '#00ff4615' }}>
                      Registration Open
                    </span>
                  )}
                </div>
              </div>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, whiteSpace: 'nowrap', marginLeft: 8 }}>
                📅 {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7, margin: 0 }}>
              {event.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0, lineHeight: 1.6 }}>
          📌 Events are managed by the SlashDot Office Bearers.<br />
          Contact <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span> for more information or to propose an event.
        </p>
      </div>
    </div>
  )
}

// ─── SHOWCASE APP ─────────────────────────────────────────────────────────────
interface Project {
  title: string
  author: string
  batch: string
  description: string
  tags: string[]
  link?: string
  highlight?: boolean
}

const PROJECTS: Project[] = [
  {
    title: 'SlashDot OS',
    author: 'Sankhadeep Bera & S. Bari',
    batch: '25MS',
    description: 'A browser-based OS simulator built as the official SlashDot website. Features a full terminal emulator, 100+ apps, games, science visualizers, and easter eggs. Built with React, TypeScript, and xterm.js.',
    tags: ['React', 'TypeScript', 'xterm.js', 'Canvas', 'Vite'],
    link: 'https://github.com/berasankhadeep20-lang/25MS-Coding',
    highlight: true,
  },
  {
    title: 'RISC-V Emulator in WASM',
    author: 'S. Bari',
    batch: '25MS',
    description: 'A full RV32IMAF RISC-V core written in C and compiled to WebAssembly via Emscripten. Runs real RISC-V ELF binaries in the browser with initramfs support.',
    tags: ['C', 'Emscripten', 'WASM', 'RISC-V', 'Assembly'],
    link: 'https://github.com/berasankhadeep20-lang/25MS-Coding',
    highlight: true,
  },
  {
    title: 'Your Project Here',
    author: 'SlashDot Member',
    batch: 'Any',
    description: 'This showcase will be populated with real projects by SlashDot members. If you\'ve built something cool, reach out to the OBs to get it featured here!',
    tags: ['Coming Soon'],
  },
  {
    title: 'Your Project Here',
    author: 'SlashDot Member',
    batch: 'Any',
    description: 'Projects from workshops, hackathons, personal projects — all are welcome. We celebrate builders of all skill levels.',
    tags: ['Coming Soon'],
  },
  {
    title: 'Your Project Here',
    author: 'SlashDot Member',
    batch: 'Any',
    description: 'The showcase is curated by the Office Bearers. Contact slashdot@iiserkol.ac.in to submit your project.',
    tags: ['Coming Soon'],
  },
]

const TAG_COLORS: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Python': '#ffd43b',
  'C': '#a8b9cc',
  'WASM': '#654ff0',
  'Canvas': '#00ff46',
  'Vite': '#ffd62e',
  'xterm.js': '#00c8ff',
  'Assembly': '#ff5050',
  'Emscripten': '#ff8800',
  'RISC-V': '#c864ff',
  'Coming Soon': '#444',
}

export function ShowcaseApp() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// showcase.app — Member Projects</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>
        Highlighted projects made by SlashDot members. Updated by the OBs.
      </p>

      {selected ? (
        <div>
          <button onClick={() => setSelected(null)}
            style={{ marginBottom: 12, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            ← Back
          </button>
          {selected.highlight && (
            <div style={{ background: '#ffd70010', border: '1px solid #ffd70040', borderRadius: 6, padding: '6px 12px', marginBottom: 12 }}>
              <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 10 }}>⭐ Featured Project</span>
            </div>
          )}
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{selected.title}</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>by {selected.author}</span>
            <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11 }}>•</span>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{selected.batch} Batch</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {selected.tags.map(tag => (
              <span key={tag} style={{ background: (TAG_COLORS[tag] ?? '#444') + '20', color: TAG_COLORS[tag] ?? '#888', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '2px 8px', borderRadius: 4, border: `1px solid ${(TAG_COLORS[tag] ?? '#444') + '40'}` }}>
                {tag}
              </span>
            ))}
          </div>
          <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, marginBottom: 16 }}>{selected.description}</p>
          {selected.link && (
            <a href={selected.link} target="_blank" rel="noreferrer"
              style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
              View on GitHub →
            </a>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROJECTS.map((p, i) => (
            <div key={i}
              onClick={() => setSelected(p)}
              style={{
                background: '#111',
                border: `1px solid ${p.highlight ? '#ffd70040' : '#1e1e1e'}`,
                borderLeft: p.highlight ? '3px solid #ffd700' : '3px solid #1e1e1e',
                borderRadius: 8, padding: '12px 14px', cursor: 'pointer',
                transition: 'border-color 0.1s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff4640' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = p.highlight ? '#ffd70040' : '#1e1e1e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {p.highlight && <span style={{ color: '#ffd700', fontSize: 12 }}>⭐</span>}
                    <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: 0 }}>{p.title}</p>
                  </div>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '2px 0 0' }}>
                    {p.author} • {p.batch}
                  </p>
                </div>
              </div>
              <p style={{ color: '#777', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.6, margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ background: (TAG_COLORS[tag] ?? '#333') + '20', color: TAG_COLORS[tag] ?? '#666', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 6px', borderRadius: 3 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 14px', marginTop: 4 }}>
            <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0, lineHeight: 1.6 }}>
              📌 To add your project to the showcase, contact the Office Bearers at{' '}
              <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}