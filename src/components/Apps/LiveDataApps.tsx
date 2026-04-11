import { useState, useEffect } from 'react'

// ─── GITHUB CONTRIBUTION GRAPH ────────────────────────────────────────────────
export function GitHubContribApp() {
  const [data, setData] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Generate realistic-looking contribution data
    // In production this would fetch from GitHub API
    const weeks: number[][] = []
    let t = 0
    for (let w = 0; w < 52; w++) {
      const days: number[] = []
      for (let d = 0; d < 7; d++) {
        // Simulate more activity on weekdays
        const isWeekend = d === 0 || d === 6
        const base = isWeekend ? 0.2 : 0.5
        const rand = Math.random()
        const count = rand < base ? 0 : rand < 0.7 ? 1 : rand < 0.85 ? 2 : rand < 0.95 ? 4 : 8
        days.push(count)
        t += count
      }
      weeks.push(days)
    }
    setData(weeks)
    setTotal(t)
    setLoading(false)
  }, [])

  function getColor(count: number): string {
    if (count === 0) return '#161b22'
    if (count === 1) return '#0e4429'
    if (count <= 3) return '#006d32'
    if (count <= 6) return '#26a641'
    return '#39d353'
  }

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const DAYS = ['','Mon','','Wed','','Fri','']

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// github-contrib.app — SlashDot GitHub Activity</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 14 }}>
        github.com/slashdot-iiserk · {total} contributions in the last year
      </p>
      {loading ? (
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Loading...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
            <div style={{ width: 24 }} />
            {data.map((_, i) => {
              const monthIdx = Math.floor(i / 4.33)
              const showLabel = i % 4 === 0 && monthIdx < 12
              return (
                <div key={i} style={{ width: 11, fontFamily: 'JetBrains Mono', fontSize: 8, color: '#555', textAlign: 'left' }}>
                  {showLabel ? MONTHS[monthIdx % 12] : ''}
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'space-around' }}>
              {DAYS.map((d, i) => (
                <div key={i} style={{ height: 11, fontFamily: 'JetBrains Mono', fontSize: 8, color: '#555', width: 20, textAlign: 'right', lineHeight: '11px' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              {data.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {week.map((count, di) => (
                    <div key={di} title={`${count} contributions`}
                      style={{ width: 11, height: 11, borderRadius: 2, background: getColor(count), cursor: 'default' }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9 }}>Less</span>
            {[0,1,3,5,8].map(n => (
              <div key={n} style={{ width: 11, height: 11, borderRadius: 2, background: getColor(n) }} />
            ))}
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9 }}>More</span>
          </div>
        </div>
      )}
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Repositories', value: '12', color: '#00ff46' },
          { label: 'Contributions', value: String(total), color: '#00c8ff' },
          { label: 'Members', value: '24+', color: '#ffd700' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
            <p style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── TODAY IN CS HISTORY ──────────────────────────────────────────────────────
const CS_HISTORY: Record<string, { year: number; event: string; significance: string }[]> = {
  '1-1':  [{ year: 1983, event: 'ARPANET switches to TCP/IP', significance: 'Birth of the modern internet' }],
  '1-7':  [{ year: 1979, event: 'VisiCalc, first spreadsheet, released', significance: 'Made personal computers useful for business' }],
  '1-14': [{ year: 1969, event: 'First ARPANET IMP installed at UCLA', significance: 'First node of what would become the internet' }],
  '2-3':  [{ year: 1966, event: 'First computer science PhD awarded in the US', significance: 'CS became an academic discipline' }],
  '2-14': [{ year: 1946, event: 'ENIAC unveiled at University of Pennsylvania', significance: 'First general-purpose electronic computer' }],
  '3-12': [{ year: 1989, event: 'Tim Berners-Lee proposes the World Wide Web', significance: 'Changed civilization forever' }],
  '4-4':  [{ year: 1975, event: 'Microsoft founded by Bill Gates and Paul Allen', significance: 'Software industry transformed' }],
  '4-7':  [{ year: 1964, event: 'IBM System/360 announced', significance: 'First compatible family of computers' }],
  '4-11': [{ year: 2005, event: 'YouTube launched', significance: 'User-generated video content revolutionized media' }],
  '4-12': [{ year: 1981, event: 'First IBM PC shipped', significance: 'Personal computing for everyone begins' }],
  '5-1':  [{ year: 1964, event: 'BASIC programming language created', significance: 'Made programming accessible to everyone' }],
  '6-1':  [{ year: 2009, event: 'Bitcoin network goes live', significance: 'First decentralized cryptocurrency' }],
  '6-29': [{ year: 2007, event: 'First iPhone released', significance: 'Smartphones and mobile computing transformed' }],
  '7-4':  [{ year: 2012, event: 'Higgs Boson confirmed at CERN', significance: 'Massive computing power enabled the discovery' }],
  '8-1':  [{ year: 1981, event: 'MS-DOS released', significance: 'Launched the PC software era' }],
  '8-6':  [{ year: 1991, event: 'First website goes live at CERN', significance: 'Public internet begins' }],
  '9-4':  [{ year: 1998, event: 'Google founded by Larry Page and Sergey Brin', significance: 'Changed how the world finds information' }],
  '10-4': [{ year: 1957, event: 'Sputnik launched, sparking the space + computing race', significance: 'Led to DARPA and the internet' }],
  '11-3': [{ year: 1988, event: 'Morris Worm — first major internet worm', significance: 'Cybersecurity became a real concern' }],
  '12-9': [{ year: 1968, event: 'Douglas Engelbart\'s "Mother of All Demos"', significance: 'Showed mouse, hypertext, video conf — 50 years early' }],
}

export function TodayInCSApp() {
  const [event, setEvent] = useState<{ year: number; event: string; significance: string } | null>(null)
  const [wikiSummary, setWikiSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [techFact, setTechFact] = useState('')

  const TECH_FACTS = [
    "The first computer bug was an actual moth found in a Harvard Mark II computer in 1947.",
    "The average smartphone today is 1 million times more powerful than all NASA's computing in 1969.",
    "Python was named after Monty Python, not the snake.",
    "The first YouTube video was uploaded on April 23, 2005 — 18 seconds of elephants at a zoo.",
    "Git was created by Linus Torvalds in 2005 in just 10 days.",
    "The @ symbol was chosen for email by Ray Tomlinson in 1971 because it wasn't in anyone's name.",
    "Stack Overflow gets 50+ million visitors per month. Most are looking at the same 10 answers.",
    "The first website is still live at info.cern.ch",
    "JavaScript was created in 10 days by Brendan Eich in 1995. It shows.",
    "Linux has 27 million+ lines of code. The original had 10,000.",
    "The term 'bug' in computing was popularized by Grace Hopper in 1947.",
    "More code is written today in a single day than existed in all computers in 1980.",
  ]

  useEffect(() => {
    const now = new Date()
    const key = `${now.getMonth() + 1}-${now.getDate()}`
    const found = CS_HISTORY[key]
    if (found && found.length > 0) {
      setEvent(found[0])
    } else {
      setEvent({ year: 1971, event: 'Email invented by Ray Tomlinson', significance: 'Changed communication forever' })
    }
    setTechFact(TECH_FACTS[now.getDate() % TECH_FACTS.length])
  }, [])

  async function fetchWiki() {
    if (!event) return
    setLoading(true)
    try {
      const q = event.event.split(' ').slice(0, 4).join(' ')
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`)
      const d = await res.json()
      if (d.extract) setWikiSummary(d.extract.slice(0, 300) + '...')
    } catch {}
    setLoading(false)
  }

  const now = new Date()

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// cs-history.app — Today in CS History</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 14 }}>
        {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>

      {event && (
        <div style={{ background: '#111', border: '1px solid #00ff4640', borderLeft: '3px solid #00ff46', borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 6px' }}>📅 On this day in {event.year}</p>
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.5 }}>{event.event}</p>
          <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 10px', lineHeight: 1.7 }}>{event.significance}</p>
          {!wikiSummary && (
            <button onClick={fetchWiki} disabled={loading}
              style={{ padding: '4px 12px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
              {loading ? 'Loading...' : '📖 Read more on Wikipedia'}
            </button>
          )}
          {wikiSummary && (
            <p style={{ color: '#666', fontFamily: 'JetBrains Mono', fontSize: 10, lineHeight: 1.7, marginTop: 8, borderTop: '1px solid #1a1a1a', paddingTop: 8 }}>{wikiSummary}</p>
          )}
        </div>
      )}

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px 14px' }}>
        <p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 6px', fontWeight: 700 }}>💡 Tech Fact of the Day</p>
        <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8, margin: 0 }}>{techFact}</p>
      </div>
    </div>
  )
}

// ─── HACKER NEWS ──────────────────────────────────────────────────────────────
interface HNStory {
  id: number
  title: string
  url: string
  score: number
  by: string
  descendants: number
}

export function HackerNewsApp() {
  const [stories, setStories] = useState<HNStory[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'top' | 'new' | 'ask'>('top')

  async function fetchStories(type: 'top' | 'new' | 'ask') {
    setLoading(true)
    setStories([])
    try {
      const endpoint = type === 'ask' ? 'askstories' : type === 'new' ? 'newstories' : 'topstories'
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`)
      const ids: number[] = await res.json()
      const top8 = ids.slice(0, 8)
      const storyData = await Promise.all(
        top8.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json()))
      )
      setStories(storyData.filter(Boolean))
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchStories('top') }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// hackernews.app — Hacker News</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(['top', 'new', 'ask'] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); fetchStories(t) }}
            style={{ padding: '3px 12px', background: tab === t ? '#ff550020' : 'transparent', border: `1px solid ${tab === t ? '#ff5500' : '#333'}`, borderRadius: 4, color: tab === t ? '#ff5500' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', textTransform: 'capitalize' }}>
            {t}
          </button>
        ))}
        <button onClick={() => fetchStories(tab)}
          style={{ marginLeft: 'auto', padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>↺</button>
      </div>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Fetching from Hacker News...</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {stories.map((s, i) => (
          <div key={s.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <span style={{ color: '#ff5500', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0, lineHeight: 1.5, flex: 1 }}>{s.title}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, paddingLeft: 28 }}>
              <span style={{ color: '#ff5500', fontFamily: 'JetBrains Mono', fontSize: 10 }}>▲ {s.score}</span>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>by {s.by}</span>
              <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>💬 {s.descendants ?? 0}</span>
              {s.url && (
                <a href={s.url} target="_blank" rel="noreferrer"
                  style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginLeft: 'auto', textDecoration: 'none' }}>
                  {new URL(s.url).hostname.replace('www.', '')} →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9, marginTop: 10, textAlign: 'center' }}>Data: news.ycombinator.com</p>
    </div>
  )
}

// ─── RANDOM WIKIPEDIA ─────────────────────────────────────────────────────────
export function WikiRandomApp() {
  const [article, setArticle] = useState<{ title: string; extract: string; thumbnail?: string; url: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchRandom() {
    setLoading(true)
    setArticle(null)
    try {
      const res = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary')
      const d = await res.json()
      setArticle({
        title: d.title,
        extract: d.extract?.slice(0, 400) + (d.extract?.length > 400 ? '...' : ''),
        thumbnail: d.thumbnail?.source,
        url: d.content_urls?.desktop?.page,
      })
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchRandom() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// wiki-random.app — Random Wikipedia Article</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        Discover something new every time.
      </p>

      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Fetching from Wikipedia...</p>}

      {article && (
        <div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px', marginBottom: 12 }}>
            {article.thumbnail && (
              <img src={article.thumbnail} alt={article.title}
                style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 6, marginBottom: 12 }} />
            )}
            <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, margin: '0 0 10px' }}>{article.title}</p>
            <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, margin: '0 0 12px' }}>{article.extract}</p>
            {article.url && (
              <a href={article.url} target="_blank" rel="noreferrer"
                style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
                Read full article on Wikipedia →
              </a>
            )}
          </div>
        </div>
      )}

      <button onClick={fetchRandom} disabled={loading}
        style={{ width: '100%', padding: '10px', background: '#00c8ff15', border: '1px solid #00c8ff40', borderRadius: 8, color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: loading ? 'wait' : 'pointer' }}>
        {loading ? 'Loading...' : '🎲 Random Article'}
      </button>
    </div>
  )
}