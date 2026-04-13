import { useState, useEffect } from 'react'
import './Apps.css'
import { teamMembers } from '../../data/team'
import { techStack } from '../../data/techStack'

export function HomeApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// home.exe — SlashDot Club</p>
      <div className="app-divider" />

      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 10, filter: 'drop-shadow(0 0 14px #00ff4650)' }} />
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.15em' }}>SLASHDOT</p>
        <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 2px' }}>The Coding & Designing Club of IISER Kolkata</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 12px' }}>Est. somewhere between 2 AM and 4 AM, over coffee</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {['github.com/slashdot-iiserk', 'slashdot-iiserk.github.io'].map(l => (
            <span key={l} style={{ background: '#00ff4610', border: '1px solid #00ff4630', color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '2px 8px', borderRadius: 10 }}>{l}</span>
          ))}
        </div>
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// quick stats</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Batches', value: '7+',    color: '#00ff46' },
          { label: 'Members', value: '50+',   color: '#00c8ff' },
          { label: 'Projects', value: '100+', color: '#ffd700' },
          { label: 'Events', value: '20+',    color: '#ff8800' },
          { label: 'Coffees', value: '∞',     color: '#c864ff' },
          { label: 'Bugs', value: '∞²',       color: '#ff5050' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
            <p style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// explore</p>
      <div className="app-commands">
        {[
          ['open about',    'About the club'],
          ['open team',     'Office Bearers & members'],
          ['open events',   'Upcoming events'],
          ['open showcase', 'Member projects'],
          ['open stack',    'Technologies we use'],
          ['open contact',  'Get in touch'],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd">{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function AboutApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// about.txt — About SlashDot</p>
      <div className="app-divider" />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 60, height: 60, objectFit: 'contain', filter: 'drop-shadow(0 0 10px #00ff4640)', opacity: 0.9 }} />
      </div>

      <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.9, marginBottom: 10 }}>
        Hola! You've stepped into the cynosure for the perks of cool coding skills.
        SlashDot is the <span style={{ color: '#00ff46', fontWeight: 700 }}>official coding and designing club</span> of
        the Indian Institute of Science Education and Research (IISER) Kolkata.
      </p>
      <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.9, marginBottom: 14 }}>
        Simplicity is the soul of efficiency. Our club loves to explore every nook and
        corner of the modern day coding world — learning how to think out of the box,
        starting from scratch. We cover programming, design, web development,
        competitive coding, open source, and everything in between.
        Grab your coffee, Devs!
      </p>

      <div className="app-divider" />
      <p className="app-label yellow">// what we do</p>
      <div className="app-commands" style={{ marginBottom: 14 }}>
        {[
          ['🛠 Workshops',       'Regular coding & design workshops open to all'],
          ['🏆 Competitions',    'Inter-batch and external competitions'],
          ['💻 Hackathons',      'Annual 24-hour HackSlash event'],
          ['🌐 Open Source',     'Contributing to real-world open source projects'],
          ['📦 Projects',        'Building cool things together'],
          ['🎨 Design',          'UI/UX, graphic design, branding'],
          ['📢 Talks & Seminars','Guest talks by seniors and industry folks'],
          ['📰 Showcase',        'Highlighting the best member projects'],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd" style={{ minWidth: 140 }}>{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// membership</p>
      <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8, marginBottom: 10 }}>
        Anyone who is a part of IISER Kolkata can join SlashDot. We recruit new members
        annually from the incoming batch. No prior experience required — just curiosity
        and the willingness to learn and build.
      </p>
      <div style={{ background: '#111', border: '1px solid #00ff4630', borderRadius: 8, padding: '10px 14px' }}>
        {[
          ['Recruitment',  'Every year after the new batch arrives'],
          ['Requirements', 'Curiosity + passion. That\'s it.'],
          ['Fee',          'Approximately ₹200/year (ask OBs for current rate)'],
          ['Benefits',     'Access to workshops, events, projects, and vibes'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, padding: '3px 0', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, minWidth: 100 }}>{k}</span>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// about this website</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7 }}>
        SlashDot OS is the official club website reimagined as a browser-based OS.
        Built by the 25MS batch (Sankhadeep Bera & S. Bari) for the Inter-Batch
        Website Development Competition 2026. Type{' '}
        <span style={{ color: '#00ff46' }}>help</span> in the terminal to explore.
      </p>
    </div>
  )
}

export function TeamApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// team.db — The SlashDot Team</p>
      <div className="app-divider" />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 52, height: 52, objectFit: 'contain', filter: 'drop-shadow(0 0 8px #ffd70030)', opacity: 0.85 }} />
      </div>

      <p className="app-label yellow">// office bearers 2025-26</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { name: 'Shuvam Banerji Seal', role: 'President / OB', batch: '22MS', email: 'sbs22ms076@iiserkol.ac.in',  fun: 'Writes code that compiles on first try. Suspected wizard.' },
          { name: 'Anuprovo Debnath',    role: 'Secretary / OB', batch: '23MS', email: 'ad23ms110@iiserkol.ac.in',   fun: 'Has never missed a deadline. An anomaly at IISER.'       },
          { name: 'Abhinav Dhingra',     role: 'Treasurer / OB', batch: '24MS', email: 'ad24ms110@iiserkol.ac.in',   fun: 'Manages funds better than he manages sleep.'             },
        ].map(function(m) {
          return (
            <div key={m.name} style={{ background: '#111', border: '1px solid #ffd70030', borderLeft: '3px solid #ffd700', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{m.name}</p>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{m.role} • {m.batch} Batch</p>
                </div>
                <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.email}</span>
              </div>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '6px 0 0', fontStyle: 'italic' }}>"{m.fun}"</p>
            </div>
          )
        })}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// core committee (25MS batch)</p>
      <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 10 }}>
        The 25MS core committee will be listed here after recruitment. Stay tuned!
      </p>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
        {[
          ['Recruitment', 'After the 25MS batch settles in'],
          ['Roles',       'Webmaster, Designer, Content, Outreach, Events'],
          ['Apply',       'slashdot@iiserkol.ac.in'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, padding: '3px 0', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, minWidth: 90 }}>{k}</span>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// website developers</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {[
          { name: 'Sankhadeep Bera', role: 'Lead Developer', batch: '25MS', email: 'sb25ms227@iiserkol.ac.in',    fun: 'Built a 100-app OS. Still thinks it\'s a small project.'   },
          { name: 'S. Bari',         role: 'Systems Developer', batch: '25MS', email: 'shayan.bari.0001@gmail.com', fun: 'Wrote a RISC-V emulator in C. Casually. For fun.'          },
        ].map(function(m) {
          return (
            <div key={m.name} style={{ background: '#111', border: '1px solid #00ff4630', borderLeft: '3px solid #00ff46', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{m.name}</p>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{m.role} • {m.batch}</p>
                </div>
                <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.email}</span>
              </div>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '6px 0 0', fontStyle: 'italic' }}>"{m.fun}"</p>
            </div>
          )
        })}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// notable alumni</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { name: 'Alumni A',  batch: '20MS', note: 'Now at Google. Still uses vim. Refuses to switch.'       },
          { name: 'Alumni B',  batch: '21MS', note: 'PhD at MIT. Research: making computers more confused.'    },
          { name: 'Alumni C',  batch: '19MS', note: 'Founded a startup. The startup is doing great. Maybe.'    },
          { name: 'Alumni D',  batch: '20MS', note: 'Software Engineer at a big tech firm. Name redacted.'     },
          { name: 'Alumni E',  batch: '21MS', note: 'Teaching the next generation to suffer through debugging.' },
          { name: '(You?)',    batch: '??MS', note: 'Join SlashDot and make history. Or at least make coffee.'  },
        ].map(function(a) {
          return (
            <div key={a.name} style={{ display: 'flex', gap: 12, padding: '5px 8px', borderBottom: '1px solid #0d0d0d', alignItems: 'flex-start' }}>
              <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11, minWidth: 80 }}>{a.name}</span>
              <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, minWidth: 40 }}>{a.batch}</span>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, fontStyle: 'italic' }}>{a.note}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TechStackApp() {
  const categories = ['frontend', 'language', 'library', 'tooling'] as const
  return (
    <div className="app-body">
      <p className="app-label cyan">// stack.log</p>
      <h2 className="app-heading">Tech Stack</h2>
      {categories.map(function(cat) {
        const items = techStack.filter(function(t) { return t.category === cat })
        return (
          <div key={cat} className="app-section">
            <p className="app-label yellow">{'// ' + cat}</p>
            <div className="stack-list">
              {items.map(function(t) {
                return (
                  <div key={t.name} className="stack-item">
                    <span className="stack-name">{t.name + (t.version ? ' v' + t.version : '')}</span>
                    <span className="stack-desc">{t.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="app-divider" />
      <p className="app-label cyan">// deployment</p>
      <p className="app-text">
        Pure static frontend — no backend required. Built with Vite, deployed via
        GitHub Pages using GitHub Actions CI/CD. Zero configuration needed to run.
      </p>
    </div>
  )
}

export function ContactApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// contact.sh — Get in Touch</p>
      <div className="app-divider" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 4px', gap: 4 }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 52, height: 52, objectFit: 'contain', filter: 'drop-shadow(0 0 8px #00ff4630)', opacity: 0.9 }} />
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>slashdot@iiserkol.ac.in</span>
      </div>

      <p className="app-label yellow">// club contact</p>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
        {[
          ['Email',    'slashdot@iiserkol.ac.in'],
          ['GitHub',   'github.com/slashdot-iiserk'],
          ['Website',  'slashdot-iiserk.github.io'],
          ['Location', 'IISER Kolkata, Mohanpur, West Bengal 741246'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, padding: '4px 0', borderBottom: '1px solid #0d0d0d' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, minWidth: 70 }}>{k}</span>
            <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// office bearers</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {[
          { name: 'Shuvam Banerji Seal', role: 'President',  email: 'sbs22ms076@iiserkol.ac.in'    },
          { name: 'Anuprovo Debnath',    role: 'Secretary',  email: 'ad23ms110@iiserkol.ac.in'     },
          { name: 'Abhinav Dhingra',     role: 'Treasurer',  email: 'ad24ms110@iiserkol.ac.in'     },
        ].map(function(m) {
          return (
            <div key={m.name} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>{m.name}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{m.role}</p>
              </div>
              <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.email}</span>
            </div>
          )
        })}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// for website issues</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {[
          { name: 'Sankhadeep Bera', email: 'sb25ms227@iiserkol.ac.in',    role: 'Lead Developer' },
          { name: 'S. Bari',         email: 'shayan.bari.0001@gmail.com',  role: 'Systems Developer' },
        ].map(function(m) {
          return (
            <div key={m.name} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>{m.name}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{m.role}</p>
              </div>
              <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.email}</span>
            </div>
          )
        })}
      </div>

      <div className="app-divider" />
      <p className="app-label yellow">// join us</p>
      <div style={{ background: '#111', border: '1px solid #00ff4630', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, margin: '0 0 8px' }}>
          Want to be part of SlashDot? We recruit every year. No experience needed —
          just love for code, design, or both.
        </p>
        {[
          ['Recruitment', 'Annually after new batch arrival'],
          ['Who can join', 'Any IISER Kolkata student'],
          ['Apply via',   'slashdot@iiserkol.ac.in'],
          ['Or just ask', 'Any of the OBs listed above'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 12, padding: '3px 0', borderTop: '1px solid #0d0d0d' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 90 }}>{k}</span>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NeofetchApp() {
  const info = [
    ['OS',       'SlashDot OS 2026.1.0'],
          ['Club',     'SlashDot — Coding & Design Club'],
          ['Website',  'slashdot-iiserk.github.io'],
          ['GitHub',   'github.com/slashdot-iiserk'],
          ['Email',    'slashdot@iiserkol.ac.in'],
          ['Location', 'IISER Kolkata, Mohanpur, WB'],
          ['Members',  '50+ active members'],
          ['Since',    'Est. long ago, revived every year'],
          ['Stack',    'React • TypeScript • Vite • Canvas'],
          ['Terminal', 'xterm.js 5.5'],
          ['Uptime',   'Since last power cut'],
          ['CPU',      'exam-stress.exe (99.9%)'],
          ['Memory',   'Full of unread papers'],
          ['Caffeine', '∞ cups and counting'],
  ]
  const colors = ['#1a1a1a', '#ff5050', '#00ff46', '#ffd700', '#00c8ff', '#c864ff', '#00d4d4', '#e0e0e0']
  const asciiLines = [
    '     ___   ___  ',
    '    /  _| /   \\ ',
    '    \\  \\  | . | ',
    '    _\\  \\ |   | ',
    '   /____/ \\___/ ',
    '   SlashDot OS  ',
    '   -------------',
    '   25MS  Batch  ',
  ]
  return (
    <div className="app-body neofetch">
      <div className="neofetch-layout">
        <pre className="neofetch-art green">
          {asciiLines.join('\n')}
        </pre>
        <div className="neofetch-info">
          <p className="neofetch-user cyan">
            {'slashdot'}
            <span className="gray">{'@'}</span>
            <span className="yellow blink">{'25ms-os'}</span>
          </p>
          <p className="neofetch-iiser blink-green">IISER KOLKATA</p>
          <p className="neofetch-sep gray">{'─'.repeat(22)}</p>
          {info.map(function(item) {
            return (
              <p key={item[0]} className="neofetch-row">
                <span className="neofetch-key cyan">{item[0]}</span>
                <span className="gray">{': '}</span>
                <span className="neofetch-val">{item[1]}</span>
              </p>
            )
          })}
          <br />
          <div className="neofetch-colors">
            {colors.map(function(col) {
              return <span key={col} className="color-block" style={{ background: col }} />
            })}
          </div>
        </div>
      </div>
      <div className="app-divider" />
      <div className="app-logos">
        <div className="logo-placeholder">
          <img src="./iiserkol_logo.png" alt="IISER Kolkata" className="logo-img" />
        </div>
        <div className="logo-placeholder">
          <img src="./slashdot_logo.png" alt="SlashDot" className="logo-img" />
        </div>
      </div>
    </div>
  )
}
export function ClockApp() {
  const [time, setTime] = useState(new Date())

  useEffect(function() {
    const t = setInterval(function() { setTime(new Date()) }, 1000)
    return function() { clearInterval(t) }
  }, [])

  const hours   = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')
  const date    = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const progress = (time.getSeconds() / 60) * 100

  return (
    <div className="app-body clock-app" style={{ background: '#0a0a0a', color: '#d0d0d0' }}>
      <p className="app-label cyan">// clock.app</p>
      <div className="clock-display">
        <span className="clock-hours">{hours}</span>
        <span className="clock-colon">:</span>
        <span className="clock-minutes">{minutes}</span>
        <span className="clock-colon">:</span>
        <span className="clock-seconds">{seconds}</span>
      </div>
      <div className="clock-progress">
        <div className="clock-progress-fill" style={{ width: progress + '%' }} />
      </div>
      <p className="clock-date">{date}</p>
      <div className="app-divider" />
      <div className="clock-stats">
        {[
          ['Timezone',  Intl.DateTimeFormat().resolvedOptions().timeZone],
          ['Unix time', String(Math.floor(time.getTime() / 1000))],
          ['Day of year', String(Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / 86400000))],
          ['Week',      String(Math.ceil((time.getDate() + new Date(time.getFullYear(), time.getMonth(), 1).getDay()) / 7))],
          ['Deadline',  'April 11, 2026 — Submit now!'],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd">{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}