import { useState, useEffect } from 'react'

interface FeedbackEntry {
  id: string
  name: string
  category: string
  rating: number
  message: string
  timestamp: string
  helpful: number
}

const CATEGORIES = [
  'General Feedback',
  'HackSlash / Hackathon',
  'Workshop / Talk',
  'Club Website',
  'Events & Activities',
  'Recruitment Process',
  'Suggestion / Idea',
  'Bug Report',
  'Other',
]

const SEED_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'seed-1',
    name: 'Arjun M.',
    category: 'HackSlash / Hackathon',
    rating: 5,
    message: 'HackSlash 2025 was incredible! The problem statements were challenging but fair. The 24-hour format really pushed us. Would love more mentors during the night shift though!',
    timestamp: '2025-10-18T14:32:00.000Z',
    helpful: 12,
  },
  {
    id: 'seed-2',
    name: 'Priya S.',
    category: 'Workshop / Talk',
    rating: 4,
    message: 'The React workshop was super helpful. Sankhadeep explained things really clearly. Maybe add a hands-on project component next time?',
    timestamp: '2025-09-22T10:15:00.000Z',
    helpful: 8,
  },
  {
    id: 'seed-3',
    name: 'Anonymous',
    category: 'Club Website',
    rating: 5,
    message: 'SlashDot OS is genuinely impressive. The terminal easter eggs are hilarious. Type "sudo give me marks" 😂',
    timestamp: '2026-04-12T09:00:00.000Z',
    helpful: 21,
  },
  {
    id: 'seed-4',
    name: 'Rohit D.',
    category: 'Suggestion / Idea',
    rating: 4,
    message: 'Would love if SlashDot organized more competitive programming contests within IISER. Even just a monthly problem set would be great!',
    timestamp: '2026-02-05T16:45:00.000Z',
    helpful: 15,
  },
  {
    id: 'seed-5',
    name: 'Sneha P.',
    category: 'Recruitment Process',
    rating: 5,
    message: 'The informal interaction format during recruitment was great — it felt welcoming and non-intimidating. Much better than a written test.',
    timestamp: '2025-09-10T11:30:00.000Z',
    helpful: 9,
  },
]

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30)  return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function stars(n: number, color = '#ffd700') {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? color : '#333', fontSize: 14 }}>★</span>
      ))}
    </span>
  )
}

export function FeedbackApp() {
  const [tab, setTab]           = useState<'view' | 'submit'>('view')
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([])
  const [filter, setFilter]     = useState('All')
  const [sort, setSort]         = useState<'recent' | 'rating' | 'helpful'>('recent')
  const [helpedIds, setHelpedIds] = useState<Set<string>>(new Set())

  // Form state
  const [name, setName]         = useState('')
  const [anon, setAnon]         = useState(false)
  const [category, setCategory] = useState(CATEGORIES[0])
  const [rating, setRating]     = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [message, setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('slashdot-feedback')
      const helped = localStorage.getItem('slashdot-feedback-helped')
      const parsed: FeedbackEntry[] = saved ? JSON.parse(saved) : []
      // Merge seed feedback with saved (avoid duplicates by id)
      const ids = new Set(parsed.map(f => f.id))
      const merged = [...parsed, ...SEED_FEEDBACK.filter(s => !ids.has(s.id))]
      setFeedbacks(merged)
      if (helped) setHelpedIds(new Set(JSON.parse(helped)))
    } catch {
      setFeedbacks(SEED_FEEDBACK)
    }
  }, [])

  function saveFeedbacks(list: FeedbackEntry[]) {
    try { localStorage.setItem('slashdot-feedback', JSON.stringify(list)) } catch {}
  }

  function handleSubmit() {
    setError('')
    if (rating === 0) { setError('Please give a star rating.'); return }
    if (message.trim().length < 10) { setError('Please write at least 10 characters.'); return }

    const entry: FeedbackEntry = {
      id: `fb-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: anon ? 'Anonymous' : (name.trim() || 'Anonymous'),
      category,
      rating,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      helpful: 0,
    }
    const updated = [entry, ...feedbacks]
    setFeedbacks(updated)
    saveFeedbacks(updated)
    setSubmitted(true)
    // Reset form
    setName(''); setAnon(false); setRating(0); setMessage(''); setCategory(CATEGORIES[0])
  }

  function handleHelpful(id: string) {
    if (helpedIds.has(id)) return
    const updated = feedbacks.map(f => f.id === id ? { ...f, helpful: f.helpful + 1 } : f)
    const newHelped = new Set([...helpedIds, id])
    setFeedbacks(updated)
    setHelpedIds(newHelped)
    saveFeedbacks(updated)
    try { localStorage.setItem('slashdot-feedback-helped', JSON.stringify([...newHelped])) } catch {}
  }

  const allCategories = ['All', ...CATEGORIES]
  const filtered = feedbacks
    .filter(f => filter === 'All' || f.category === filter)
    .sort((a, b) => {
      if (sort === 'rating')  return b.rating - a.rating
      if (sort === 'helpful') return b.helpful - a.helpful
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : '—'

  const ratingDist = [5,4,3,2,1].map(r => ({
    r, count: feedbacks.filter(f => f.rating === r).length
  }))

  const inp: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 8,
    color: '#d0d0d0',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>

      {/* Header */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, margin: 0, fontWeight: 700 }}>
            // feedback.app — SlashDot Feedback
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['view', 'submit'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setSubmitted(false) }}
                style={{ padding: '4px 14px', background: tab === t ? '#00ff4620' : 'transparent', border: `1px solid ${tab === t ? '#00ff46' : '#333'}`, borderRadius: 6, color: tab === t ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', textTransform: 'capitalize' }}>
                {t === 'view' ? '📋 View' : '✏ Submit'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
            ★ {avgRating} avg
          </span>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
            {feedbacks.length} responses
          </span>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
            {feedbacks.filter(f => f.rating >= 4).length} positive
          </span>
        </div>
      </div>

      {/* ── VIEW TAB ── */}
      {tab === 'view' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>

          {/* Rating distribution */}
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 10px' }}>Rating Distribution</p>
            {ratingDist.map(({ r, count }) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, width: 14 }}>{r}</span>
                <span style={{ color: '#ffd700', fontSize: 10 }}>★</span>
                <div style={{ flex: 1, height: 6, background: '#1a1a1a', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: feedbacks.length ? `${(count / feedbacks.length) * 100}%` : '0%', background: '#ffd700', borderRadius: 3, transition: 'width 0.4s' }} />
                </div>
                <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, width: 20, textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {(['recent', 'rating', 'helpful'] as const).map(s => (
              <button key={s} onClick={() => setSort(s)}
                style={{ padding: '2px 10px', background: sort === s ? '#00c8ff20' : 'transparent', border: `1px solid ${sort === s ? '#00c8ff' : '#222'}`, borderRadius: 4, color: sort === s ? '#00c8ff' : '#444', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer', textTransform: 'capitalize' }}>
                {s === 'recent' ? '🕐 Recent' : s === 'rating' ? '★ Rating' : '👍 Helpful'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {allCategories.slice(0, 5).map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ padding: '2px 8px', background: filter === c ? '#00ff4615' : 'transparent', border: `1px solid ${filter === c ? '#00ff4660' : '#1e1e1e'}`, borderRadius: 4, color: filter === c ? '#00ff46' : '#444', fontFamily: 'JetBrains Mono', fontSize: 9, cursor: 'pointer' }}>
                {c === 'All' ? 'All' : c.split('/')[0].trim()}
              </button>
            ))}
          </div>

          {/* Feedback cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.length === 0 && (
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
                No feedback yet for this category.
              </p>
            )}
            {filtered.map(f => (
              <div key={f.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
                  <div>
                    <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>{f.name}</span>
                    <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, marginLeft: 8 }}>{f.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {stars(f.rating)}
                    <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{timeAgo(f.timestamp)}</span>
                  </div>
                </div>
                <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.7, margin: '0 0 10px' }}>
                  {f.message}
                </p>
                <button onClick={() => handleHelpful(f.id)}
                  style={{ padding: '2px 10px', background: helpedIds.has(f.id) ? '#00c8ff15' : 'transparent', border: `1px solid ${helpedIds.has(f.id) ? '#00c8ff60' : '#222'}`, borderRadius: 4, color: helpedIds.has(f.id) ? '#00c8ff' : '#444', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: helpedIds.has(f.id) ? 'default' : 'pointer' }}>
                  👍 Helpful ({f.helpful})
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: '10px 14px', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8 }}>
            <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
              Feedback is stored locally in your browser. To submit to the OBs directly, email{' '}
              <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span>
            </p>
          </div>
        </div>
      )}

      {/* ── SUBMIT TAB ── */}
      {tab === 'submit' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Thank you!
              </p>
              <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, marginBottom: 20 }}>
                Your feedback has been saved and will help SlashDot improve.<br />
                The OBs review all submissions regularly.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => setSubmitted(false)}
                  style={{ padding: '8px 18px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 8, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
                  Submit Another
                </button>
                <button onClick={() => setTab('view')}
                  style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
                  View All Feedback
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
                Your feedback helps us make SlashDot better. Be honest!
              </p>

              {/* Name */}
              <div>
                <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>
                  Your Name
                </label>
                <input value={anon ? '' : name} onChange={e => setName(e.target.value)}
                  placeholder={anon ? 'Posting anonymously' : 'Sankhadeep Bera (optional)'}
                  disabled={anon} style={{ ...inp, opacity: anon ? 0.4 : 1 }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, cursor: 'pointer' }}>
                  <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)}
                    style={{ accentColor: '#00ff46' }} />
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Post anonymously</span>
                </label>
              </div>

              {/* Category */}
              <div>
                <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>
                  Category *
                </label>
                <select value={category} onChange={e => setCategory(e.target.value)}
                  style={{ ...inp, cursor: 'pointer' }}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Star rating */}
              <div>
                <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 6 }}>
                  Rating *
                </label>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontSize: 28, color: n <= (hoverRating || rating) ? '#ffd700' : '#2a2a2a', transition: 'color 0.1s', WebkitTapHighlightColor: 'transparent' }}>
                      ★
                    </button>
                  ))}
                  {rating > 0 && (
                    <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, alignSelf: 'center', marginLeft: 8 }}>
                      {['','Terrible','Poor','Okay','Good','Excellent'][rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>
                  Your Feedback * <span style={{ color: '#333' }}>({message.length}/500)</span>
                </label>
                <textarea value={message} onChange={e => setMessage(e.target.value.slice(0, 500))}
                  rows={5} placeholder="Tell us what you think! Be specific — it helps us improve..."
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.7 }} />
              </div>

              {error && (
                <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>
                  ⚠ {error}
                </p>
              )}

              <button onClick={handleSubmit}
                style={{ padding: '11px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 8, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>
                ✓ Submit Feedback
              </button>

              <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
                <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0, lineHeight: 1.6 }}>
                  🔒 Feedback is stored in your browser locally. Anonymous submissions have no identifying info attached.
                  For urgent issues email <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}