import { useState, useEffect, useRef } from 'react'

// ─── NEWS TICKER ──────────────────────────────────────────────────────────────
const NEWS = [
  '🔴 BREAKING: IISER Kolkata WiFi reported stable for 3 minutes — students in shock',
  '📢 SlashDot Club announces website redesign, built by 25MS batch',
  '☕ Canteen runs out of coffee at 2am — emergency shipment requested',
  '💻 25MS student solves 5 LeetCode problems in one sitting, collapses immediately after',
  '📚 Library AC working perfectly — first time this semester',
  '🚀 SlashDot OS v2026.1.0 released — judges impressed, developers sleep-deprived',
  '🐛 Bug found in exam system — CGPA of all students temporarily set to 10.0',
  '⚡ Power cut during finals week — students resort to coding by phone flashlight',
  '🍕 Free pizza at SlashDot hackathon — attendance record broken',
  '🎓 IISER Kolkata ranked #1 for sleep deprivation among Indian research institutes',
  '💡 25MS batch submits competition entry 47 seconds before deadline',
  '🌧 Mohanpur receives heavy rain — students cheer, WiFi finally connects',
]

export function NewsTickerApp() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [category, setCategory] = useState<'all' | 'campus' | 'tech' | 'slashdot'>('all')

  const filtered = NEWS.filter(n => {
    if (category === 'all') return true
    if (category === 'slashdot') return n.includes('SlashDot') || n.includes('25MS')
    if (category === 'tech') return n.includes('💻') || n.includes('🐛') || n.includes('🚀')
    return true
  })

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % filtered.length), 4000)
    return () => clearInterval(t)
  }, [paused, filtered.length])

  const current = filtered[idx % filtered.length]

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// news.app — IISER Campus News</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(['all', 'campus', 'tech', 'slashdot'] as const).map(c => (
          <button key={c} onClick={() => setCategory(c)}
            style={{ padding: '2px 10px', background: category === c ? '#ff505020' : 'transparent', border: `1px solid ${category === c ? '#ff5050' : '#333'}`, borderRadius: 4, color: category === c ? '#ff5050' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ background: '#111', border: '1px solid #ff505040', borderRadius: 10, padding: '20px', marginBottom: 16, minHeight: 100, display: 'flex', alignItems: 'center' }}>
        <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{current}</p>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <button onClick={() => setIdx(i => (i - 1 + filtered.length) % filtered.length)}
          style={{ padding: '4px 12px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>‹</button>
        <button onClick={() => setPaused(p => !p)}
          style={{ padding: '4px 12px', background: paused ? '#00ff4620' : 'transparent', border: `1px solid ${paused ? '#00ff46' : '#333'}`, borderRadius: 4, color: paused ? '#00ff46' : '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
          {paused ? '▶ Play' : '⏸ Pause'}
        </button>
        <button onClick={() => setIdx(i => (i + 1) % filtered.length)}
          style={{ padding: '4px 12px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>›</button>
        <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginLeft: 'auto' }}>{(idx % filtered.length) + 1} / {filtered.length}</span>
      </div>
      <p className="app-label yellow">// all headlines</p>
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {filtered.map((n, i) => (
          <div key={i} onClick={() => setIdx(i)}
            style={{ padding: '6px 8px', cursor: 'pointer', borderBottom: '1px solid #111', background: i === idx % filtered.length ? '#ff505010' : 'transparent', borderLeft: `2px solid ${i === idx % filtered.length ? '#ff5050' : 'transparent'}` }}>
            <p style={{ color: i === idx % filtered.length ? '#fff' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>{n}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────
export function LeaderboardApp() {
  const [entries, setEntries] = useState([
    { name: 'Sankhadeep Bera', commands: 847, achievements: 24, batch: '25MS', badge: '👑' },
    { name: 'S. Bari',         commands: 612, achievements: 18, batch: '25MS', badge: '🥈' },
    { name: 'SlashDot Bot',    commands: 500, achievements: 25, batch: 'SYS',  badge: '🤖' },
    { name: 'Anonymous',       commands: 312, achievements: 12, batch: '??',   badge: '🥉' },
    { name: 'You',             commands: 0,   achievements: 0,  batch: '??',   badge: '🆕' },
  ])

  useEffect(() => {
    const hist = ((window as any).__slashdotHistory as string[]) ?? []
    const achs = Object.keys((window as any).__slashdotAchievements ?? {}).length
    const mem = (() => { try { const r = localStorage.getItem('slashdot-os-memory'); return r ? JSON.parse(r) : null } catch { return null } })()
    const name = mem?.name || 'You'
    setEntries(prev => prev.map(e =>
      e.name === 'You' ? { ...e, name, commands: hist.length, achievements: achs } : e
    ).sort((a, b) => b.commands - a.commands).map((e, i) => ({
      ...e, badge: i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : e.badge === '🤖' ? '🤖' : '🆕',
    })))
  }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// leaderboard.app — Top Terminal Users</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((e, i) => (
          <div key={e.name} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: e.name !== 'You' && i === 0 ? '#ffd70010' : '#111',
            border: `1px solid ${i === 0 ? '#ffd70040' : '#1e1e1e'}`,
            borderRadius: 8, padding: '10px 14px',
          }}>
            <span style={{ fontSize: 20 }}>{e.badge}</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: i === 0 ? '#ffd700' : '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{e.name}</p>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>Batch: {e.batch}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 2px' }}>{e.commands} cmds</p>
              <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{e.achievements} achievements</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 12 }}>Your stats update in real time based on your session.</p>
    </div>
  )
}

// ─── GITHUB STATS ─────────────────────────────────────────────────────────────
export function GitHubStatsApp() {
  const [stats, setStats] = useState<any>(null)
  const [commits, setCommits] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const REPO = 'berasankhadeep20-lang/Interbatch-Coding-2026-25MS'

  async function fetch_stats() {
    setLoading(true); setError('')
    try {
      const [repoRes, commitsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${REPO}`),
        fetch(`https://api.github.com/repos/${REPO}/commits?per_page=5`),
      ])
      const repo = await repoRes.json()
      const cms = await commitsRes.json()
      setStats(repo)
      setCommits(Array.isArray(cms) ? cms : [])
    } catch {
      setError('Failed to fetch GitHub stats. Check your internet connection.')
    }
    setLoading(false)
  }

  useEffect(() => { fetch_stats() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// github.app — Live GitHub Stats</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        Repo: <span style={{ color: '#00c8ff' }}>{REPO}</span>
      </p>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Fetching from GitHub API...</p>}
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      {stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Stars', value: stats.stargazers_count, color: '#ffd700', icon: '⭐' },
              { label: 'Forks', value: stats.forks_count, color: '#00c8ff', icon: '🍴' },
              { label: 'Watchers', value: stats.watchers_count, color: '#00ff46', icon: '👁' },
            ].map(s => (
              <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: 20, margin: '0 0 4px' }}>{s.icon}</p>
                <p style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, margin: '0 0 2px' }}>{s.value}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
            {[
              ['Language', stats.language ?? 'TypeScript'],
              ['Default branch', stats.default_branch],
              ['Open issues', stats.open_issues_count],
              ['Size', `${(stats.size / 1024).toFixed(1)} MB`],
              ['Created', new Date(stats.created_at).toLocaleDateString()],
              ['Updated', new Date(stats.updated_at).toLocaleDateString()],
            ].map(([k, v]) => (
              <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #0d0d0d' }}>
                <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{k}</span>
                <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
              </div>
            ))}
          </div>
          <p className="app-label yellow">// recent commits</p>
          {commits.map((c, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', marginBottom: 6 }}>
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 2px', fontWeight: 700 }}>{c.commit?.message?.split('\n')[0]?.slice(0, 60)}</p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
                {c.commit?.author?.name} • {new Date(c.commit?.author?.date).toLocaleDateString()} • {c.sha?.slice(0, 7)}
              </p>
            </div>
          ))}
          <button onClick={fetch_stats} style={{ marginTop: 8, padding: '5px 14px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>↺ Refresh</button>
        </>
      )}
    </div>
  )
}

// ─── WIKIPEDIA ────────────────────────────────────────────────────────────────
export function WikipediaApp() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [article, setArticle] = useState<{ title: string; extract: string; url: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function search() {
    if (!query.trim()) return
    setLoading(true); setError(''); setArticle(null); setResults([])
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=5&format=json&origin=*`)
      const [_, titles, __, urls] = await res.json()
      setResults((titles as string[]).map((t: string, i: number) => ({ title: t, url: (urls as string[])[i] })))
    } catch { setError('Search failed. Check your connection.') }
    setLoading(false)
  }

  async function openArticle(title: string, url: string) {
    setLoading(true); setArticle(null)
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`)
      const data = await res.json()
      const pages = data.query.pages
      const page = pages[Object.keys(pages)[0]]
      setArticle({ title: page.title, extract: page.extract?.slice(0, 1200) + '...', url })
    } catch { setError('Failed to load article.') }
    setLoading(false)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// wiki.app — Wikipedia Search</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') search() }}
          placeholder="Search Wikipedia..."
          style={{ flex: 1, padding: '8px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={search} style={{ padding: '6px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Search</button>
      </div>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Loading...</p>}
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      {!article && results.map((r, i) => (
        <div key={i} onClick={() => openArticle(r.title, r.url)}
          style={{ padding: '8px 12px', borderBottom: '1px solid #111', cursor: 'pointer', borderRadius: 4 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#111' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
          <p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0 }}>{r.title}</p>
        </div>
      ))}
      {article && (
        <div>
          <button onClick={() => { setArticle(null); setResults([]) }}
            style={{ marginBottom: 12, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            ← Back
          </button>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{article.title}</p>
          <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8, marginBottom: 12 }}>{article.extract}</p>
          <a href={article.url} target="_blank" rel="noreferrer"
            style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
            Read full article on Wikipedia →
          </a>
        </div>
      )}
    </div>
  )
}

// ─── HOROSCOPE ───────────────────────────────────────────────────────────────
const SIGNS = ['♈ Aries','♉ Taurus','♊ Gemini','♋ Cancer','♌ Leo','♍ Virgo','♎ Libra','♏ Scorpio','♐ Sagittarius','♑ Capricorn','♒ Aquarius','♓ Pisces']
const IISER_HOROSCOPES: Record<string, string[]> = {
  '♈ Aries': ['Mercury aligns with your deadline — submit now or regret later.', 'The stars suggest your CGPA will improve if you stop procrastinating.'],
  '♉ Taurus': ['Venus is in retrograde, much like the IISER WiFi.', 'A surprise awaits you in the canteen. Avoid the curry.'],
  '♊ Gemini': ['Your dual nature is perfect for debugging — one personality finds bugs, the other introduces them.', 'The twins suggest: attend class today. Just this once.'],
  '♋ Cancer': ['The moon weeps for your unsubmitted assignments.', 'A cancerian trait: retreating into your hostel room at 3am to code.'],
  '♌ Leo': ['Your code will run on the first try today. Just kidding — no one gets that.', 'The lion roars: your GPA is a number, not a measure of greatness.'],
  '♍ Virgo': ['Your perfectionism will cause you to rewrite the same function 7 times.', 'Mercury suggests: commit your code before the power cuts out.'],
  '♎ Libra': ['Balance is key. Sleep 4 hours. Code 20 hours. Maintain equilibrium.', 'Scales tip toward: attending that 8am lecture you have been skipping.'],
  '♏ Scorpio': ['Your intensity will help you finish the assignment due in 2 hours.', 'Pluto aligns: the segfault you have been fighting will be resolved by restarting.'],
  '♐ Sagittarius': ['Your wandering spirit will lead you to 5 different StackOverflow answers, none of which work.', 'Jupiter blesses your next hackathon submission.'],
  '♑ Capricorn': ['Saturn rewards discipline. Unfortunately, you have none. Try anyway.', 'Your capricorn ambition: 10 CGPA. Reality: 7.3. Stars are optimistic.'],
  '♒ Aquarius': ['The water bearer brings hydration. Drink water. Also fix your code.', 'Your innovative ideas will be stolen by a senior batch. Document everything.'],
  '♓ Pisces': ['You will swim through the sea of assignments. Doggy paddle if necessary.', 'The fish suggests: the answer to your research question is in the paper you have not read yet.'],
}

export function HoroscopeApp() {
  const [sign, setSign] = useState(SIGNS[0])
  const reading = IISER_HOROSCOPES[sign]?.[Math.floor(new Date().getDate() / 16)] ?? IISER_HOROSCOPES[sign]?.[0]
  const lucky = ['Coffee', 'Stack Overflow', 'Git push', 'Dark mode', 'Ctrl+Z', 'The janitor', '42'][new Date().getDay()]
  const unlucky = ['The WiFi', 'Mondays', 'Merge conflicts', 'Your ex (the codebase)', 'Pop quizzes'][new Date().getDay() % 5]

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// horoscope.app — IISER Horoscope</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {SIGNS.map(s => (
          <button key={s} onClick={() => setSign(s)}
            style={{ padding: '3px 10px', background: sign === s ? '#c864ff20' : 'transparent', border: `1px solid ${sign === s ? '#c864ff' : '#333'}`, borderRadius: 4, color: sign === s ? '#c864ff' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {s.split(' ')[0]}
          </button>
        ))}
      </div>
      <div style={{ background: '#111', border: '1px solid #c864ff40', borderRadius: 10, padding: '20px', marginBottom: 12 }}>
        <p style={{ color: '#c864ff', fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{sign}</p>
        <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.8, marginBottom: 12 }}>⭐ {reading}</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Lucky</p><p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0 }}>{lucky}</p></div>
          <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Avoid</p><p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0 }}>{unlucky}</p></div>
          <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Lucky #</p><p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0 }}>{Math.floor(Math.random() * 100)}</p></div>
        </div>
      </div>
      <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>⚠ For entertainment only. SlashDot OS is not responsible for academic decisions made based on horoscopes.</p>
    </div>
  )
}