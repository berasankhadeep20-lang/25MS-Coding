import { useState, useEffect, useRef } from 'react'

// ─── ISS TRACKER ──────────────────────────────────────────────────────────────
export function ISSTrackerApp() {
  const [pos, setPos] = useState<{ lat: number; lng: number; timestamp: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<{ lat: number; lng: number }[]>([])

  async function fetchISS() {
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
      const data = await res.json()
      const p = { lat: data.latitude, lng: data.longitude, timestamp: data.timestamp }
      setPos(p)
      setHistory(h => [...h.slice(-29), { lat: p.lat, lng: p.lng }])
      setLoading(false)
    } catch { setError('Failed to fetch ISS position.'); setLoading(false) }
  }

  useEffect(() => { fetchISS(); const t = setInterval(fetchISS, 5000); return () => clearInterval(t) }, [])

  function toMapCoords(lat: number, lng: number, W: number, H: number) {
    return { x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H }
  }

  const W = 580, H = 280

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// iss.app — Live ISS Tracker</p>
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Fetching ISS position...</p>}
      {pos && (
        <>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '8px 14px', marginBottom: 12, display: 'flex', gap: 24 }}>
            <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Latitude</p><p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: 0 }}>{pos.lat.toFixed(4)}°</p></div>
            <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Longitude</p><p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: 0 }}>{pos.lng.toFixed(4)}°</p></div>
            <div><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Updated</p><p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: 0 }}>{new Date(pos.timestamp * 1000).toLocaleTimeString()}</p></div>
            <div style={{ marginLeft: 'auto' }}><p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>Speed</p><p style={{ color: '#c864ff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: 0 }}>~27,600 km/h</p></div>
          </div>
          <div style={{ position: 'relative', width: W, height: H, background: '#0d0d1a', border: '1px solid #1e1e1e', borderRadius: 8, overflow: 'hidden', margin: '0 auto' }}>
            {/* Grid lines */}
            {[-60,-30,0,30,60].map(lat => {
              const y = ((90 - lat) / 180) * H
              return <div key={lat} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 1, background: '#ffffff08' }} />
            })}
            {[-120,-60,0,60,120].map(lng => {
              const x = ((lng + 180) / 360) * W
              return <div key={lng} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 1, background: '#ffffff08' }} />
            })}
            {/* Equator */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: H/2, height: 1, background: '#ffffff15' }} />
            {/* Trail */}
            {history.map((p, i) => {
              const c = toMapCoords(p.lat, p.lng, W, H)
              return <div key={i} style={{ position: 'absolute', left: c.x - 1, top: c.y - 1, width: 3, height: 3, borderRadius: '50%', background: `rgba(0,200,255,${i/history.length * 0.5})` }} />
            })}
            {/* ISS */}
            {(() => {
              const c = toMapCoords(pos.lat, pos.lng, W, H)
              return (
                <div style={{ position: 'absolute', left: c.x - 8, top: c.y - 8, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  🛸
                  <div style={{ position: 'absolute', width: 24, height: 24, borderRadius: '50%', border: '1px solid #00c8ff40', animation: 'pulse 1s infinite' }} />
                </div>
              )
            })()}
            {/* IISER Kolkata */}
            {(() => {
              const iiserCoords = toMapCoords(22.97, 88.52, W, H)
              return <div style={{ position: 'absolute', left: iiserCoords.x - 3, top: iiserCoords.y - 3, width: 6, height: 6, borderRadius: '50%', background: '#ffd700' }} title="IISER Kolkata" />
            })()}
          </div>
          <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 6, textAlign: 'center' }}>🟡 IISER Kolkata • 🛸 ISS (updates every 5s) • Data: wheretheiss.at</p>
        </>
      )}
    </div>
  )
}

// ─── ASTRONOMY PICTURE OF THE DAY ─────────────────────────────────────────────
export function APODApp() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetch_apod() {
    setLoading(true); setError('')
    try {
      const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      const d = await res.json()
      setData(d)
    } catch { setError('Failed to load APOD. Try again later.') }
    setLoading(false)
  }

  useEffect(() => { fetch_apod() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// apod.app — NASA Astronomy Picture of the Day</p>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Loading from NASA API...</p>}
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      {data && (
        <>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{data.title}</p>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 10 }}>{data.date} • {data.copyright ?? 'NASA'}</p>
          {data.media_type === 'image' && (
            <img src={data.url} alt={data.title} style={{ width: '100%', borderRadius: 8, marginBottom: 12, maxHeight: 280, objectFit: 'cover' }} />
          )}
          {data.media_type === 'video' && (
            <div style={{ background: '#111', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Today's APOD is a video.</p>
              <a href={data.url} target="_blank" rel="noreferrer" style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Watch on YouTube →</a>
            </div>
          )}
          <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8 }}>{data.explanation?.slice(0, 400)}...</p>
          <button onClick={fetch_apod} style={{ marginTop: 10, padding: '5px 14px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>↺ Refresh</button>
        </>
      )}
    </div>
  )
}

// ─── OPEN LIBRARY BOOK SEARCH ─────────────────────────────────────────────────
export function BookSearchApp() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function search() {
    if (!query.trim()) return
    setLoading(true); setError(''); setBooks([])
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8&fields=title,author_name,first_publish_year,cover_i`)
      const d = await res.json()
      setBooks(d.docs ?? [])
    } catch { setError('Search failed. Check your connection.') }
    setLoading(false)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// books.app — Open Library Search</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') search() }}
          placeholder="Search books..."
          style={{ flex: 1, padding: '8px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={search} style={{ padding: '6px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Search</button>
      </div>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Searching Open Library...</p>}
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {books.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px', alignItems: 'flex-start' }}>
            {b.cover_i && <img src={`https://covers.openlibrary.org/b/id/${b.cover_i}-S.jpg`} alt="" style={{ width: 40, height: 56, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />}
            <div>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{b.title}</p>
              <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 2px' }}>{b.author_name?.slice(0, 2).join(', ')}</p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{b.first_publish_year}</p>
            </div>
          </div>
        ))}
        {!loading && books.length === 0 && query && <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12 }}>No results found.</p>}
      </div>
    </div>
  )
}

// ─── EXCHANGE RATES ───────────────────────────────────────────────────────────
export function ExchRateApp() {
  const [rates, setRates] = useState<Record<string, number>>({})
  const [base, setBase] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState('')

  async function fetchRates(b: string) {
    setLoading(true)
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${b}`)
      const d = await res.json()
      if (d.rates) { setRates(d.rates); setUpdated(new Date(d.time_last_update_unix * 1000).toLocaleDateString()) }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchRates(base) }, [base])

  const KEY_CURRENCIES = ['USD','EUR','GBP','INR','JPY','CAD','AUD','CHF','CNY','SGD','AED']

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// rates.app — Live Exchange Rates</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Base:</span>
        <select value={base} onChange={e => setBase(e.target.value)}
          style={{ padding: '4px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }}>
          {KEY_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {updated && <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Updated: {updated}</span>}
        <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginLeft: 'auto' }}>Source: open.er-api.com</span>
      </div>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Fetching live rates...</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {KEY_CURRENCIES.filter(c => c !== base).map(c => (
          <div key={c} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{c}</span>
            <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>{rates[c]?.toFixed(4) ?? '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── IP GEOLOCATION ──────────────────────────────────────────────────────────
export function IPGeoApp() {
  const [ip, setIp] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup(target: string = '') {
    setLoading(true); setError(''); setData(null)
    try {
      const url = target ? `https://ipapi.co/${target}/json/` : 'https://ipapi.co/json/'
      const res = await fetch(url)
      const d = await res.json()
      if (d.error) throw new Error(d.reason)
      setData(d)
    } catch (e: any) { setError(e.message || 'Lookup failed') }
    setLoading(false)
  }

  useEffect(() => { lookup() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// ip.app — IP Geolocation</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={ip} onChange={e => setIp(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') lookup(ip) }}
          placeholder="Enter IP address (leave blank for your IP)..."
          style={{ flex: 1, padding: '7px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={() => lookup(ip)} style={{ padding: '6px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Lookup</button>
        <button onClick={() => { setIp(''); lookup() }} style={{ padding: '6px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>My IP</button>
      </div>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Looking up...</p>}
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{error}</p>}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['IP Address', data.ip],
            ['City', data.city],
            ['Region', data.region],
            ['Country', `${data.country_name} ${data.country_flag_emoji ?? ''}`],
            ['Timezone', data.timezone],
            ['ISP', data.org],
            ['Coordinates', `${data.latitude}, ${data.longitude}`],
            ['Postal', data.postal],
          ].map(([k, v]) => v && (
            <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '7px 12px' }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{k}</span>
              <span style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── RANDOM USER GENERATOR ────────────────────────────────────────────────────
export function RandUserApp() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  async function fetchUser() {
    setLoading(true)
    try {
      const res = await fetch('https://randomuser.me/api/')
      const d = await res.json()
      setUser(d.results[0]); setCount(c => c + 1)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchUser() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// user.app — Random User Generator</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>Source: randomuser.me API — Real anonymized profiles</p>
      {loading && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Generating user...</p>}
      {user && (
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 12 }}>
            <img src={user.picture.large} alt="" style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #00ff46' }} />
            <div>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>
                {user.name.first} {user.name.last}
              </p>
              <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 2px' }}>{user.email}</p>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{user.location.city}, {user.location.country}</p>
            </div>
          </div>
          {[
            ['Username', user.login.username],
            ['Age', `${user.dob.age} years`],
            ['Gender', user.gender],
            ['Phone', user.phone],
            ['Nationality', user.nat],
          ].map(([k, v]) => (
            <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #0d0d0d' }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{k}</span>
              <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={fetchUser} disabled={loading}
          style={{ padding: '7px 20px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
          {loading ? 'Loading...' : '↺ Generate New User'}
        </button>
        {count > 0 && <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{count} generated</span>}
      </div>
    </div>
  )
}