import { useState, useEffect } from 'react'
import './Apps.css'
import { teamMembers } from '../../data/team'
import { techStack } from '../../data/techStack'

export function HomeApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// home.exe — SlashDot Club, IISER Kolkata</p>
      <div className="app-divider" />
      <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <img src="./slashdot_logo.png" alt="SlashDot" style={{ width: 90, marginBottom: 12, opacity: 0.95 }} />
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '0.15em' }}>SLASHDOT</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 4px' }}>The Coding & Designing Club of IISER Kolkata</p>
        <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>slashdot-iiserk.github.io</p>
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// explore</p>
      <div className="app-commands">
        {[
          ['open about',    'About the club'],
          ['open team',     'Office Bearers & Core Committee'],
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
      <div className="app-divider" />
      <p className="app-label yellow">// links</p>
      <div className="app-commands">
        {[
          ['GitHub',   'github.com/slashdot-iiserk'],
          ['Website',  'slashdot-iiserk.github.io'],
          ['Email',    'slashdot@iiserkol.ac.in'],
          ['IISER',    'iiserkol.ac.in'],
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
      <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.9, marginBottom: 12 }}>
        Hola! You've stepped into the cynosure for the perks of cool coding skills.
        SlashDot is the <span style={{ color: '#00ff46' }}>official coding and designing club</span> of the
        Indian Institute of Science Education and Research (IISER) Kolkata.
      </p>
      <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.9, marginBottom: 16 }}>
        Simplicity is the soul of efficiency. Our club loves to explore every nook and
        corner of the modern day coding world — learning how to think out of the box,
        starting from scratch. Grab your coffee, Devs!
      </p>
      <div className="app-divider" />
      <p className="app-label yellow">// what we do</p>
      <div className="app-commands">
        {[
          ['Workshops',     'Regular coding and design workshops for all batches'],
          ['Competitions',  'Inter-batch and external competitions'],
          ['Projects',      'Open source and collaborative club projects'],
          ['Showcase',      'Highlighting the best projects by members'],
          ['Events',        'Hackathons, talks, seminars and more'],
          ['Recruitment',   'Annual recruitment drives for new members'],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd">{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// about this website</p>
      <p style={{ color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7 }}>
        SlashDot OS is the official website of SlashDot Club, reimagined as a
        browser-based operating system. Built by the 25MS batch for the
        Inter-Batch Website Development Competition 2026.
        Navigate using the terminal or desktop icons.
      </p>
    </div>
  )
}

export function TeamApp() {
  return (
    <div className="app-body">
      <p className="app-label cyan">// team.db — Meet the Team</p>
      <div className="app-divider" />
      <p className="app-label yellow">// office bearers</p>
      <div className="app-commands" style={{ marginBottom: 16 }}>
        {[
          { name: 'Shuvam Banerji Seal', role: 'Office Bearer', batch: '22MS', email: 'sbs22ms076@iiserkol.ac.in' },
          { name: 'Anuprovo Debnath',    role: 'Office Bearer', batch: '23MS', email: 'ad23ms110@iiserkol.ac.in'  },
          { name: 'Abhinav Dhingra',     role: 'Office Bearer', batch: '24MS', email: 'ad24ms110@iiserkol.ac.in'  },
        ].map(function(member) {
          return (
            <div key={member.name} className="app-cmd-row" style={{ alignItems: 'flex-start', padding: '6px 0' }}>
              <div style={{ minWidth: 160 }}>
                <span className="app-cmd" style={{ color: '#ffd700' }}>{member.name}</span>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '2px 0 0' }}>[{member.batch}] {member.role}</p>
              </div>
              <span className="app-cmd-desc" style={{ fontSize: 10 }}>{member.email}</span>
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// 25ms developers (this website)</p>
      <div className="app-commands">
        {[
          { name: 'Sankhadeep Bera', role: 'Lead Developer', batch: '25MS', email: 'sb25ms227@iiserkol.ac.in' },
          { name: 'S. Bari',         role: 'Developer',      batch: '25MS', email: 'shayan.bari.0001@gmail.com' },
        ].map(function(member) {
          return (
            <div key={member.name} className="app-cmd-row" style={{ alignItems: 'flex-start', padding: '6px 0' }}>
              <div style={{ minWidth: 160 }}>
                <span className="app-cmd" style={{ color: '#00ff46' }}>{member.name}</span>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '2px 0 0' }}>[{member.batch}] {member.role}</p>
              </div>
              <span className="app-cmd-desc" style={{ fontSize: 10 }}>{member.email}</span>
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>
        Core committee members will be listed here once the recruitment is complete.
      </p>
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
      <p className="app-label yellow">// club contact</p>
      <div className="app-commands" style={{ marginBottom: 16 }}>
        {[
          ['Email',    'slashdot@iiserkol.ac.in'],
          ['GitHub',   'github.com/slashdot-iiserk'],
          ['Website',  'slashdot-iiserk.github.io'],
          ['Location', 'IISER Kolkata, Mohanpur, WB 741246'],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd">{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// office bearers contact</p>
      <div className="app-commands" style={{ marginBottom: 16 }}>
        {[
          ['Shuvam Banerji Seal', 'sbs22ms076@iiserkol.ac.in'],
          ['Anuprovo Debnath',    'ad23ms110@iiserkol.ac.in' ],
          ['Abhinav Dhingra',     'ad24ms110@iiserkol.ac.in' ],
        ].map(function(item) {
          return (
            <div key={item[0]} className="app-cmd-row">
              <span className="app-cmd">{item[0]}</span>
              <span className="app-cmd-desc">{item[1]}</span>
            </div>
          )
        })}
      </div>
      <div className="app-divider" />
      <p className="app-label yellow">// developer contact</p>
      <div className="app-commands">
        {[
          ['Sankhadeep Bera', 'sb25ms227@iiserkol.ac.in'],
          ['S. Bari',         'shayan.bari.0001@gmail.com'],
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

export function NeofetchApp() {
  const info = [
    ['OS',       'SlashDot OS 2026 — IISER Kolkata'],
    ['Club',     'SlashDot — Coding & Design Club'],
    ['Website',  'slashdot-iiserk.github.io'],
    ['GitHub',   'github.com/slashdot-iiserk'],
    ['Batch', '25MS — IISER Kolkata'],
    ['Shell', 'slashdot-sh 2026'],
    ['Terminal', 'xterm.js v5.5'],
    ['Theme', 'Terminal Green on Void Black'],
    ['CPU', 'Brain @ 3.0GHz (caffeine-cooled)'],
    ['Memory', '8GB (4GB used by browser tabs)'],
    ['Uptime', 'Since March 22, 2026'],
    ['Deadline', 'April 11, 2026'],
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