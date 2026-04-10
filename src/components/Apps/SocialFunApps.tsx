import { useState, useEffect, useRef } from 'react'

// ─── FAKE TWITTER ─────────────────────────────────────────────────────────────
const TWEETS = [
  { user: '@SlashDot_IISER', handle: 'SlashDot Club', avatar: '🟢', time: '2m', content: 'We just submitted our competition entry at 11:59:47 PM. This is fine. 🔥 #SlashDotOS #25MS', likes: 42, retweets: 12 },
  { user: '@IISER_Kolkata', handle: 'IISER Kolkata', avatar: '🔵', time: '15m', content: 'Reminder: The wifi will be down for maintenance tonight from 1am-5am. Plan your assignments accordingly.', likes: 3, retweets: 1 },
  { user: '@iiser_wifi', handle: 'IISER WiFi', avatar: '📶', time: '1h', content: 'Status: I tried my best. I really did. Love, WiFi.', likes: 892, retweets: 234 },
  { user: '@campus_food', handle: 'IISER Canteen', avatar: '🍽', time: '2h', content: 'Today\'s lunch: Mystery sabzi, Dal, Rice. Same as yesterday. Same as tomorrow.', likes: 67, retweets: 8 },
  { user: '@25ms_batch', handle: '25MS Batch', avatar: '🎓', time: '3h', content: 'PSA: If you see someone sleeping in the library tonight, please put a blanket on them. We\'re all in this together.', likes: 156, retweets: 43 },
  { user: '@sankhadeep', handle: 'Sankhadeep Bera', avatar: '💻', time: '5h', content: 'Day 3 of building the OS. Current status: it works on my machine. Good enough.', likes: 28, retweets: 3 },
  { user: '@exam_stress', handle: 'Exam Stress', avatar: '😰', time: '8h', content: 'Good morning! I\'m still here. I never left. Haha.', likes: 2847, retweets: 1203 },
  { user: '@library_cat', handle: 'Library Cat', avatar: '🐱', time: '12h', content: 'I have seen 47 students give up today. I have meowed at all of them. Keep going.', likes: 1337, retweets: 420 },
]

export function FakeTwitterApp() {
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState('')
  const [feed, setFeed] = useState(TWEETS)

  function like(i: number) { setLikes(prev => ({ ...prev, [i]: !prev[i] })) }

  function post() {
    if (!draft.trim()) return
    const tweet = { user: '@you', handle: 'You', avatar: '😊', time: 'now', content: draft.trim(), likes: 0, retweets: 0 }
    setFeed(prev => [tweet, ...prev])
    setDraft(''); setComposing(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700 }}>🐦 SlashTweet</span>
        <button onClick={() => setComposing(c => !c)} style={{ padding: '4px 14px', background: '#00c8ff20', border: '1px solid #00c8ff', borderRadius: 20, color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>+ Tweet</button>
      </div>
      {composing && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e1e1e' }}>
          <textarea value={draft} onChange={e => setDraft(e.target.value.slice(0, 280))} rows={3} placeholder="What's happening at IISER?"
            style={{ width: '100%', padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 8, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, resize: 'none', outline: 'none', marginBottom: 8 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: draft.length > 250 ? '#ff5050' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{280 - draft.length}</span>
            <button onClick={post} style={{ padding: '4px 16px', background: '#00c8ff20', border: '1px solid #00c8ff', borderRadius: 20, color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Post</button>
          </div>
        </div>
      )}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {feed.map((t, i) => (
          <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #0d0d0d' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{t.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>{t.handle}</span>
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{t.user}</span>
                  <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginLeft: 'auto' }}>{t.time}</span>
                </div>
                <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.6, margin: '0 0 8px' }}>{t.content}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => like(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: likes[i] ? '#ff5050' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
                    ♥ {t.likes + (likes[i] ? 1 : 0)}
                  </button>
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>🔁 {t.retweets}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FAKE WHATSAPP ────────────────────────────────────────────────────────────
const BOT_RESPONSES: Record<string, string> = {
  'hello': 'Hello! 👋 I am SlashDot Bot. How can I help you today?',
  'hi': 'Hi there! 😊 Type anything to chat!',
  'how are you': "I'm doing great! Just processing 10 billion parameters. You? 🤖",
  'what is slashdot': 'SlashDot is the official Coding & Designing Club of IISER Kolkata! 💚',
  'cgpa': 'Your CGPA is: good enough. Keep going! 📊',
  'help': 'I can answer questions about SlashDot, IISER, coding, and life! ✨',
  'deadline': 'The deadline is always NOW. Submit your work! ⏰',
  'wifi': 'Have you tried turning it off and on? 📶 Kidding, it never works.',
  'food': 'Dal rice. Always dal rice. 🍚',
  'bye': 'Goodbye! May your code compile on the first try! 👋',
  'love': 'Love is like CGPA — everyone claims to have it, few actually do. 💕',
  'iiser': 'IISER Kolkata — where sleep is a theory and coffee is a necessity! ☕',
}

interface WMsg { text: string; from: 'user' | 'bot'; time: string }

export function FakeWhatsAppApp() {
  const [messages, setMessages] = useState<WMsg[]>([
    { text: 'Hello! I am SlashDot Bot 🤖 Type anything to chat!', from: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function send() {
    if (!input.trim()) return
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: WMsg = { text: input.trim(), from: 'user', time: t }
    setMessages(prev => [...prev, userMsg])
    setInput(''); setTyping(true)

    const lower = input.toLowerCase()
    let response = "Interesting! 🤔 I don't have a specific answer for that, but I'm always learning!"
    for (const [key, val] of Object.entries(BOT_RESPONSES)) {
      if (lower.includes(key)) { response = val; break }
    }

    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { text: response, from: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 800 + Math.random() * 600)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 10, alignItems: 'center', background: '#111' }}>
        <span style={{ fontSize: 28 }}>🤖</span>
        <div>
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: 0 }}>SlashDot Bot</p>
          <p style={{ color: typing ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{typing ? 'typing...' : 'online'}</p>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#050505' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              background: msg.from === 'user' ? '#00ff4620' : '#111',
              border: `1px solid ${msg.from === 'user' ? '#00ff4640' : '#1e1e1e'}`,
              borderRadius: msg.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              padding: '8px 12px', maxWidth: '75%',
            }}>
              <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.5, margin: '0 0 4px' }}>{msg.text}</p>
              <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0, textAlign: 'right' }}>{msg.time} ✓✓</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 8, background: '#111' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send() }}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '8px 12px', background: '#1a1a1a', border: '1px solid #222', borderRadius: 20, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={send} style={{ width: 36, height: 36, borderRadius: '50%', background: '#00ff4620', border: '1px solid #00ff46', color: '#00ff46', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>➤</button>
      </div>
    </div>
  )
}

// ─── CONFESSION WALL ──────────────────────────────────────────────────────────
interface Confession { id: number; text: string; likes: number; time: string; tag: string }
let confId = 5
const INIT_CONF: Confession[] = [
  { id: 1, text: "I haven't attended a single 8am class this semester and I'm not sorry.", likes: 47, time: '2h ago', tag: '🎓 Academic' },
  { id: 2, text: "I Googled 'how to be productive' instead of being productive.", likes: 89, time: '3h ago', tag: '💭 Life' },
  { id: 3, text: "The only reason I go to the canteen is for the Wi-Fi, not the food.", likes: 34, time: '5h ago', tag: '📶 WiFi' },
  { id: 4, text: "I have restarted my code from scratch 4 times. The deadline is tomorrow.", likes: 156, time: '8h ago', tag: '💻 Coding' },
]

export function ConfessionApp() {
  const [confessions, setConfessions] = useState<Confession[]>(INIT_CONF)
  const [text, setText] = useState('')
  const [tag, setTag] = useState('💭 Life')
  const [liked, setLiked] = useState<number[]>([])
  const TAGS = ['💻 Coding', '🎓 Academic', '💭 Life', '📶 WiFi', '☕ Food', '😴 Sleep', '❤ Feelings']

  function submit() {
    if (!text.trim() || text.length < 10) return
    setConfessions(prev => [{
      id: ++confId, text: text.trim(), likes: 0,
      time: 'just now', tag,
    }, ...prev])
    setText('')
  }

  function like(id: number) {
    if (liked.includes(id)) return
    setLiked(prev => [...prev, id])
    setConfessions(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c))
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// confess.app — Anonymous Confession Wall</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>Anonymous. Stored in session only. No judgment.</p>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px', marginBottom: 14 }}>
        <textarea value={text} onChange={e => setText(e.target.value.slice(0, 280))} rows={3} placeholder="Confess your sins (IISER related only, please)..."
          style={{ width: '100%', padding: '6px', background: 'transparent', border: 'none', outline: 'none', color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, resize: 'none', marginBottom: 8 }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              style={{ padding: '2px 8px', background: tag === t ? '#ffffff15' : 'transparent', border: `1px solid ${tag === t ? '#888' : '#333'}`, borderRadius: 10, color: tag === t ? '#fff' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{280 - text.length} chars left</span>
          <button onClick={submit} style={{ padding: '4px 14px', background: '#ffffff10', border: '1px solid #333', borderRadius: 6, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Post Anonymously</button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {confessions.map(c => (
          <div key={c.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ background: '#ffffff10', color: '#888', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10 }}>{c.tag}</span>
              <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{c.time}</span>
            </div>
            <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.6, margin: '0 0 8px' }}>{c.text}</p>
            <button onClick={() => like(c.id)}
              style={{ background: 'transparent', border: 'none', cursor: liked.includes(c.id) ? 'default' : 'pointer', color: liked.includes(c.id) ? '#ff5050' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
              ♥ {c.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── COMPLIMENT GENERATOR ─────────────────────────────────────────────────────
const COMPLIMENTS = [
  "Your code is cleaner than the IISER hostel bathroom. That's the highest compliment.",
  "You're smarter than the average CGPA suggests. The system doesn't know what it has.",
  "Your git commit messages actually make sense. You're one in a million.",
  "You debugged that in under 10 minutes. You are built different.",
  "Your README is so good I actually read it. I never read READMEs.",
  "The way you handled that deadline was like watching poetry in motion. Frantic, last-minute poetry.",
  "You are the WiFi that always connects. Reliable. Rare. Beloved.",
  "Your variable names don't look like keyboard smashes. This is rare. Be proud.",
  "You asked a question in lecture that even the professor needed to think about. Legend.",
  "You're the reason the batch average exists. Pure carry energy.",
  "You remembered to push to GitHub before the deadline. You're a role model.",
  "Your error messages are actually informative. You're practically a senior dev already.",
]

export function ComplimentApp() {
  const [compliment, setCompliment] = useState('')
  const [animating, setAnimating] = useState(false)
  const [count, setCount] = useState(0)

  function generate() {
    setAnimating(true)
    setTimeout(() => {
      setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)])
      setCount(c => c + 1); setAnimating(false)
    }, 300)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// compliment.app — You Deserve This</p>
      <div style={{ fontSize: 64, marginBottom: 16 }}>💐</div>
      {compliment && (
        <div style={{ background: '#111', border: '1px solid #00ff4640', borderRadius: 12, padding: '24px', marginBottom: 20, opacity: animating ? 0 : 1, transition: 'opacity 0.3s' }}>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 14, lineHeight: 1.8, margin: 0 }}>"{compliment}"</p>
        </div>
      )}
      <button onClick={generate}
        style={{ padding: '10px 28px', background: '#00ff4620', border: '2px solid #00ff46', borderRadius: 10, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>
        {count === 0 ? '💐 Get a Compliment' : '💐 Another One'}
      </button>
      {count > 0 && <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 12 }}>You've been complimented {count} time{count !== 1 ? 's' : ''}. You deserve it.</p>}
    </div>
  )
}

// ─── INSULT / ROAST GENERATOR ─────────────────────────────────────────────────
const ROASTS = [
  "Your code has more bugs than a hostel mattress.",
  "I've seen better variable names in a toddler's drawing app.",
  "Your CGPA is like IISER WiFi — theoretically it exists.",
  "You write more TODO comments than actual code.",
  "Even Stack Overflow gave up on your question.",
  "Your commit history looks like you code during REM sleep.",
  "The console.log detective — 200 logs, 0 answers.",
  "You've been 'about to start' studying for 6 hours.",
  "Your code passes the vibe check but fails all actual checks.",
  "You call it 'refactoring', we call it 'deleting and starting over'.",
  "Your deadlines see you coming and start running.",
  "You have the organizational skills of a recursive function with no base case.",
]

export function InsultApp() {
  const [roast, setRoast] = useState('')
  const [count, setCount] = useState(0)

  function generate() {
    setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)])
    setCount(c => c + 1)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// insult.app — Friendly Roasts (with love)</p>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔥</div>
      {roast && (
        <div style={{ background: '#111', border: '1px solid #ff505040', borderRadius: 12, padding: '24px', marginBottom: 20 }}>
          <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 14, lineHeight: 1.8, margin: 0 }}>"{roast}"</p>
        </div>
      )}
      <button onClick={generate}
        style={{ padding: '10px 28px', background: '#ff505020', border: '2px solid #ff5050', borderRadius: 10, color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>
        {count === 0 ? '🔥 Roast Me' : '🔥 Again'}
      </button>
      <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 12 }}>All in good fun. You are actually great. ❤</p>
    </div>
  )
}

// ─── CGPA SIMULATOR ──────────────────────────────────────────────────────────
const COURSES = [
  { name: 'Mathematics I', credits: 4 },
  { name: 'Physics I', credits: 4 },
  { name: 'Chemistry I', credits: 4 },
  { name: 'Biology I', credits: 3 },
  { name: 'Programming', credits: 3 },
  { name: 'English', credits: 2 },
]

export function CGPASimApp() {
  const [grades, setGrades] = useState<Record<string, number>>(() => Object.fromEntries(COURSES.map(c => [c.name, 7.0])))
  const [hours, setHours] = useState<Record<string, number>>(() => Object.fromEntries(COURSES.map(c => [c.name, 2])))

  const cgpa = COURSES.reduce((sum, c) => sum + (grades[c.name] ?? 0) * c.credits, 0) / COURSES.reduce((s, c) => s + c.credits, 0)
  const totalHours = Object.values(hours).reduce((a, b) => a + b, 0)

  function studyMore(name: string) {
    const h = hours[name]
    const bonus = Math.random() * 0.3
    const newGrade = Math.min(10, (grades[name] ?? 7) + bonus)
    setGrades(prev => ({ ...prev, [name]: Math.round(newGrade * 10) / 10 }))
    setHours(prev => ({ ...prev, [name]: h + 1 }))
  }

  const gradeColor = (g: number) => g >= 9 ? '#00ff46' : g >= 7 ? '#ffd700' : '#ff5050'

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// cgpa.app — CGPA Simulator</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>What if you studied more? Find out.</p>
      <div style={{ background: '#111', border: '1px solid #ffd70040', borderRadius: 10, padding: '16px', textAlign: 'center', marginBottom: 16 }}>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 4px' }}>Current CGPA</p>
        <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 48, fontWeight: 700, margin: '0 0 4px', textShadow: '0 0 20px #ffd70040' }}>{cgpa.toFixed(2)}</p>
        <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>Total study hours: {totalHours}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {COURSES.map(c => (
          <div key={c.name} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 4px' }}>{c.name}</p>
              <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(grades[c.name] / 10) * 100}%`, background: gradeColor(grades[c.name]), borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
            </div>
            <span style={{ color: gradeColor(grades[c.name]), fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, minWidth: 36, textAlign: 'center' }}>{grades[c.name].toFixed(1)}</span>
            <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 40 }}>{hours[c.name]}h</span>
            <button onClick={() => studyMore(c.name)}
              style={{ padding: '3px 10px', background: '#00ff4615', border: '1px solid #00ff4440', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
              Study +1h
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


// ─── EXCUSE GENERATOR ─────────────────────────────────────────────────────────
const EXCUSES = [
  "My laptop ran out of battery and the power cut happened exactly at that moment.",
  "I submitted it but Git said 'everything up to date' which means it worked, right?",
  "I was going to submit at 11:58 but the WiFi died at 11:57. IISER WiFi, not me.",
  "My cat walked on my keyboard and deleted the entire project. I don't have a cat.",
  "I misread the deadline as next week. In my timezone. Which is UTC-9.",
  "My code was too good. The submission portal couldn't handle it.",
  "Stack Overflow was down for maintenance during my peak productivity window.",
  "My roommate was debugging and the emotional support I provided took priority.",
  "I was researching the topic so thoroughly that I ran out of time to write the assignment.",
  "npm install took 6 hours. The dependencies were very complex.",
  "I submitted at 11:59:59.999 PM but the server clock was running fast.",
  "My compiler issued a philosophical error I had to contemplate.",
]

export function ExcuseGenApp() {
  const [excuse, setExcuse] = useState('')
  const [copied, setCopied] = useState(false)
  const [count, setCount] = useState(0)

  function generate() {
    setExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)])
    setCount(c => c + 1); setCopied(false)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// excuse.app — Deadline Excuse Generator</p>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🙏</div>
      {excuse && (
        <div style={{ background: '#111', border: '1px solid #ffd70040', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.8, margin: '0 0 12px' }}>"{excuse}"</p>
          <button onClick={() => { navigator.clipboard.writeText(excuse).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            style={{ padding: '4px 14px', background: copied ? '#00ff4620' : 'transparent', border: `1px solid ${copied ? '#00ff46' : '#333'}`, borderRadius: 6, color: copied ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {copied ? '✓ Copied!' : 'Copy Excuse'}
          </button>
        </div>
      )}
      <button onClick={generate}
        style={{ padding: '10px 28px', background: '#ffd70020', border: '2px solid #ffd700', borderRadius: 10, color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>
        🎲 Generate Excuse
      </button>
      {count > 0 && <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 12 }}>{count} excuses generated. Use responsibly.</p>}
    </div>
  )
}

// ─── SCREENSAVER ──────────────────────────────────────────────────────────────
export function ScreensaverApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const [mode, setMode] = useState<'starfield' | 'dvd' | 'plasma'>('starfield')
  const modeRef = useRef<'starfield' | 'dvd' | 'plasma'>('starfield')

  useEffect(() => { modeRef.current = mode }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!; 
    const W = canvas.width, H = canvas.height

    // Starfield
    const stars = Array.from({ length: 200 }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * W, pz: 0 }))

    // DVD
    const dvd = { x: W/2, y: H/2, vx: 2, vy: 1.5, w: 80, h: 40, color: '#00ff46' }
    const colors = ['#00ff46','#00c8ff','#ffd700','#ff5050','#c864ff']
    let dvdColorIdx = 0

    let t = 0

    function draw() {
      const m = modeRef.current

      if (m === 'starfield') {
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.fillRect(0, 0, W, H)
        const cx = W/2, cy = H/2
        stars.forEach(s => {
          s.pz = s.z
          s.z -= 4
          if (s.z <= 0) { s.x = Math.random() * W - cx; s.y = Math.random() * H - cy; s.z = W; s.pz = s.z }
          const sx = (s.x / s.z) * W + cx, sy = (s.y / s.z) * H + cy
          const px = (s.x / s.pz) * W + cx, py = (s.y / s.pz) * H + cy
          const size = Math.max(0.1, (1 - s.z / W) * 3)
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(255,255,255,${1 - s.z/W})`; ctx.lineWidth = size; ctx.stroke()
        })
      } else if (m === 'dvd') {
        ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, W, H)
        dvd.x += dvd.vx; dvd.y += dvd.vy
        let bounced = false
        if (dvd.x <= 0 || dvd.x + dvd.w >= W) { dvd.vx *= -1; bounced = true }
        if (dvd.y <= 0 || dvd.y + dvd.h >= H) { dvd.vy *= -1; bounced = true }
        if (bounced) { dvdColorIdx = (dvdColorIdx + 1) % colors.length; dvd.color = colors[dvdColorIdx] }
        ctx.fillStyle = dvd.color; ctx.shadowColor = dvd.color; ctx.shadowBlur = 10
        ctx.fillRect(dvd.x, dvd.y, dvd.w, dvd.h)
        ctx.shadowBlur = 0
        ctx.fillStyle = '#000'; ctx.font = 'bold 16px JetBrains Mono'; ctx.textAlign = 'center'
        ctx.fillText('SlashDot', dvd.x + dvd.w/2, dvd.y + dvd.h/2 + 6)
      } else {
        const imageData = ctx.createImageData(W, H)
        for (let x = 0; x < W; x++) {
          for (let y = 0; y < H; y++) {
            const v = Math.sin(x/20 + t) + Math.sin(y/20 + t) + Math.sin((x+y)/30 + t)
            const r = Math.floor((Math.sin(v * Math.PI) + 1) * 127)
            const g = Math.floor((Math.cos(v * Math.PI * 1.3) + 1) * 127)
            const b = Math.floor((Math.sin(v * Math.PI * 0.7 + 2) + 1) * 127)
            const idx = (y * W + x) * 4
            imageData.data[idx] = r; imageData.data[idx+1] = g; imageData.data[idx+2] = b; imageData.data[idx+3] = 255
          }
        }
        ctx.putImageData(imageData, 0, 0)
        t += 0.03
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8 }}>
        {(['starfield', 'dvd', 'plasma'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: '2px 10px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} width={640} height={380} style={{ flex: 1, width: '100%' }} />
    </div>
  )
}

// ─── FORTUNE COOKIE ───────────────────────────────────────────────────────────
const FORTUNES = [
  'The bug you seek is in the last place you look. It always is.',
  'A late night commit message: "fix" — this is your destiny.',
  'Great things are coming. After the deadline passes.',
  'You will find love in the most unexpected place: the IISER library at 3am.',
  'Today is a good day to push to production. Just kidding. Never push on Friday.',
  'The answer to your problem is in the Stack Overflow question you closed.',
  'Your next idea will be your best one. Sleep on it first.',
  'The WiFi will connect when you stop trying. Like cats.',
  'Fortune favors the one who runs git pull first.',
  'You will achieve a CGPA of exactly enough. This is the way.',
  'Someone is thinking about your code right now. They are confused.',
  'The merge conflict you fear will resolve itself. Eventually.',
]

export function FortuneCookieApp() {
  const [open, setOpen] = useState(false)
  const [fortune, setFortune] = useState('')
  const [count, setCount] = useState(0)
  const [cracking, setCracking] = useState(false)

  function crack() {
    setCracking(true); setOpen(false); setFortune('')
    setTimeout(() => {
      setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)])
      setOpen(true); setCracking(false); setCount(c => c + 1)
    }, 600)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// fortune.app — IISER Fortune Cookie</p>
      <div style={{ fontSize: 80, margin: '16px 0', cursor: 'pointer', filter: cracking ? 'brightness(2)' : 'none', transition: 'filter 0.2s' }} onClick={crack}>🥠</div>
      {open && fortune && (
        <div style={{ background: '#111', border: '1px solid #ffd70040', borderRadius: 12, padding: '24px', marginBottom: 20, animation: 'fadeIn 0.5s' }}>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 14, lineHeight: 1.8, margin: '0 0 8px' }}>"{fortune}"</p>
          <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>— Your IISER Fortune Cookie</p>
        </div>
      )}
      <button onClick={crack} disabled={cracking}
        style={{ padding: '10px 28px', background: '#ffd70020', border: '2px solid #ffd700', borderRadius: 10, color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: cracking ? 'wait' : 'pointer' }}>
        {cracking ? '🥠 Cracking...' : count === 0 ? '🥠 Crack Cookie' : '🥠 Another Cookie'}
      </button>
      {count > 0 && <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 12 }}>{count} fortune{count !== 1 ? 's' : ''} received</p>}
    </div>
  )
}

// ─── KEYBOARD SHORTCUT TRAINER ────────────────────────────────────────────────
const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], action: 'Open Command Palette', category: 'SlashDot OS' },
  { keys: ['Ctrl', 'C'], action: 'Cancel terminal input', category: 'Terminal' },
  { keys: ['Ctrl', 'L'], action: 'Clear terminal', category: 'Terminal' },
  { keys: ['↑', '↓'], action: 'Navigate command history', category: 'Terminal' },
  { keys: ['Tab'], action: 'Autocomplete command', category: 'Terminal' },
  { keys: ['Ctrl', 'Z'], action: 'Undo (in editors)', category: 'General' },
  { keys: ['Ctrl', 'S'], action: 'Save file', category: 'General' },
  { keys: ['Ctrl', 'F'], action: 'Find in page/file', category: 'General' },
  { keys: ['Alt', 'Tab'], action: 'Switch windows', category: 'OS' },
  { keys: ['Ctrl', 'Shift', 'I'], action: 'Open DevTools', category: 'Browser' },
  { keys: ['Ctrl', 'R'], action: 'Reload page', category: 'Browser' },
  { keys: ['Ctrl', 'T'], action: 'New tab', category: 'Browser' },
  { keys: ['Ctrl', 'W'], action: 'Close tab', category: 'Browser' },
]

export function KBTrainerApp() {
  const [idx, setIdx] = useState(0)
  const [mode, setMode] = useState<'browse' | 'quiz'>('browse')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(SHORTCUTS.map(s => s.category)))]
  const filtered = filter === 'All' ? SHORTCUTS : SHORTCUTS.filter(s => s.category === filter)
  const current = filtered[idx % filtered.length]

  function next(correct?: boolean) {
    if (correct !== undefined) setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    setRevealed(false); setIdx(i => i + 1)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// kb.app — Keyboard Shortcut Trainer</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {(['browse', 'quiz'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setIdx(0); setRevealed(false); setScore({ correct: 0, total: 0 }) }}
            style={{ padding: '3px 12px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m === 'browse' ? '📖 Browse' : '🎓 Quiz'}
          </button>
        ))}
        <select value={filter} onChange={e => { setFilter(e.target.value); setIdx(0) }}
          style={{ padding: '3px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {mode === 'browse' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {s.keys.map(k => (
                  <span key={k} style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, padding: '2px 8px', color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{k}</span>
                ))}
              </div>
              <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, flex: 1 }}>{s.action}</span>
              <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{s.category}</span>
            </div>
          ))}
        </div>
      )}

      {mode === 'quiz' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 12 }}>
            ✓ {score.correct} / {score.total} • Card {(idx % filtered.length) + 1}/{filtered.length}
          </p>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '24px', marginBottom: 16, cursor: 'pointer' }} onClick={() => setRevealed(r => !r)}>
            {!revealed ? (
              <>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                  {current?.keys.map(k => (
                    <span key={k} style={{ background: '#1a1a1a', border: '2px solid #ffd700', borderRadius: 6, padding: '8px 16px', color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700 }}>{k}</span>
                  ))}
                </div>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Click to reveal what this shortcut does</p>
              </>
            ) : (
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700 }}>{current?.action}</p>
            )}
          </div>
          {revealed && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => next(true)} style={{ padding: '8px 24px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 8, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>✓ Knew it</button>
              <button onClick={() => next(false)} style={{ padding: '8px 24px', background: '#ff505020', border: '1px solid #ff5050', borderRadius: 8, color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>✗ Missed</button>
            </div>
          )}
          {!revealed && <button onClick={() => next()} style={{ padding: '6px 20px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Skip</button>}
        </div>
      )}
    </div>
  )
}

// ─── SYSTEM LOGS ──────────────────────────────────────────────────────────────
const BOOT_LOG = [
  '[0.000] SlashDot OS booting — IISER Kolkata',
  '[0.142] Loading club modules... OK',
  '[0.380] Mounting initramfs... OK',
  '[0.612] Starting RISC-V emulator core... OK',
  '[0.890] Initializing terminal subsystem... OK',
  '[1.120] Loading SlashDot assets... OK',
  '[1.340] Mounting virtual filesystem... OK',
  '[1.560] Starting window manager... OK',
  '[1.780] Booting desktop... OK',
  '[1.920] Starting notification system... OK',
  '[2.100] Loading achievements... OK',
  '[2.200] Boot complete. Welcome to SlashDot OS.',
]

const ERROR_LOG = [
  '[ERROR] WiFi: Connection refused (as always)',
  '[WARN]  exam_stress.exe: consuming 99.9% CPU',
  '[ERROR] sleep: process not found',
  '[WARN]  coffee: supply critically low',
  '[ERROR] deadline: approaching faster than expected',
  '[INFO]  npm: 847 vulnerabilities found (this is fine)',
  '[WARN]  CGPA: value outside expected range',
  '[ERROR] motivation: segmentation fault (core dumped)',
  '[INFO]  SlashDot OS: all systems nominal',
  '[WARN]  user: has not slept in 36 hours',
]

export function SysLogApp() {
  const [tab, setTab] = useState<'boot' | 'error' | 'activity'>('boot')
  const [activity, setActivity] = useState<string[]>([])

  useEffect(() => {
    const hist = ((window as any).__slashdotHistory as string[]) ?? []
    setActivity(hist.slice(-20).reverse().map((cmd, i) => `[${new Date(Date.now() - i * 60000).toLocaleTimeString()}] user@slashdot:~$ ${cmd}`))
  }, [tab])

  const logs: Record<string, string[]> = { boot: BOOT_LOG, error: ERROR_LOG, activity }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8 }}>
        {(['boot', 'error', 'activity'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '2px 10px', background: tab === t ? '#00ff4620' : 'transparent', border: `1px solid ${tab === t ? '#00ff46' : '#333'}`, borderRadius: 4, color: tab === t ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {t}
          </button>
        ))}
        <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, alignSelf: 'center', marginLeft: 'auto' }}>// syslog.app</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
        {logs[tab].map((line, i) => (
          <p key={i} style={{
            color: line.includes('[ERROR]') ? '#ff5050' : line.includes('[WARN]') ? '#ffd700' : line.includes('OK') ? '#00ff46' : '#888',
            margin: '2px 0', lineHeight: 1.6,
          }}>{line}</p>
        ))}
        {logs[tab].length === 0 && <p style={{ color: '#444' }}>No log entries yet. Use the terminal first.</p>}
      </div>
    </div>
  )
}

// ─── CLIPBOARD MANAGER ────────────────────────────────────────────────────────
export function ClipboardApp() {
  const [clips, setClips] = useState<{ text: string; time: string }[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  useEffect(() => {
    const hist = ((window as any).__slashdotHistory as string[]) ?? []
    setClips(hist.slice(-20).reverse().map((cmd, i) => ({
      text: cmd,
      time: new Date(Date.now() - i * 120000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })))
  }, [])

  function copy(text: string, i: number) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(i); setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// clipboard.app — Terminal Command History</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>Recent terminal commands — click to copy</p>
      {clips.length === 0 && <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12 }}>No commands yet. Use the terminal first!</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {clips.map((c, i) => (
          <div key={i} onClick={() => copy(c.text, i)}
            style={{ background: '#111', border: `1px solid ${copied === i ? '#00ff46' : '#1e1e1e'}`, borderRadius: 6, padding: '8px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.1s' }}>
            <span style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{c.text}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{c.time}</span>
              <span style={{ color: copied === i ? '#00ff46' : '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{copied === i ? '✓' : 'copy'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}