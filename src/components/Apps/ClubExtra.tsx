import { useState } from 'react'

// ─── MEMBERS LIST ─────────────────────────────────────────────────────────────
interface Member {
  name: string
  batch: string
  role: string
  domain: string
}

const MEMBERS: Member[] = [
  // OBs
  { name: 'Shuvam Banerji Seal', batch: '22MS', role: 'President (OB)',   domain: 'Full Stack, Systems' },
  { name: 'Anuprovo Debnath',    batch: '23MS', role: 'Secretary (OB)',   domain: 'Web Dev, Design'     },
  { name: 'Abhinav Dhingra',     batch: '24MS', role: 'Treasurer (OB)',   domain: 'Backend, Finance'    },
  // 25MS Developers
  { name: 'Sankhadeep Bera',     batch: '25MS', role: 'Lead Developer',   domain: 'React, TypeScript, ML' },
  { name: 'S. Bari',             batch: '25MS', role: 'Systems Developer',domain: 'C, WASM, RISC-V'     },
  // Fake but plausible 25MS members
  { name: 'Arjun Mehta',         batch: '25MS', role: 'Member',           domain: 'Competitive Programming' },
  { name: 'Priya Sharma',        batch: '25MS', role: 'Member',           domain: 'Machine Learning'    },
  { name: 'Rohit Das',           batch: '25MS', role: 'Member',           domain: 'Web Development'     },
  { name: 'Ananya Bose',         batch: '25MS', role: 'Member',           domain: 'UI/UX Design'        },
  { name: 'Karan Singh',         batch: '25MS', role: 'Member',           domain: 'Game Development'    },
  // 24MS
  { name: 'Aditya Kumar',        batch: '24MS', role: 'Core Committee',   domain: 'Backend, DevOps'     },
  { name: 'Sneha Patel',         batch: '24MS', role: 'Core Committee',   domain: 'Design, Frontend'    },
  { name: 'Vivek Nair',          batch: '24MS', role: 'Core Committee',   domain: 'Systems, Security'   },
  { name: 'Meera Joshi',         batch: '24MS', role: 'Member',           domain: 'Data Science'        },
  { name: 'Rahul Gupta',         batch: '24MS', role: 'Member',           domain: 'App Development'     },
  { name: 'Tanya Roy',           batch: '24MS', role: 'Member',           domain: 'Open Source'         },
  // 23MS
  { name: 'Siddharth Verma',     batch: '23MS', role: 'Core Committee',   domain: 'Full Stack'          },
  { name: 'Kavya Reddy',         batch: '23MS', role: 'Core Committee',   domain: 'ML, Research'        },
  { name: 'Arnav Ghosh',         batch: '23MS', role: 'Member',           domain: 'Competitive Programming' },
  { name: 'Ishaan Malik',        batch: '23MS', role: 'Member',           domain: 'Embedded Systems'    },
  { name: 'Pooja Iyer',          batch: '23MS', role: 'Member',           domain: 'Web Dev, Design'     },
  // 22MS
  { name: 'Dhruv Agarwal',       batch: '22MS', role: 'Core Committee',   domain: 'Systems, OS'         },
  { name: 'Nisha Banerjee',      batch: '22MS', role: 'Core Committee',   domain: 'Frontend, Design'    },
  { name: 'Yash Tiwari',         batch: '22MS', role: 'Member',           domain: 'Backend, Databases'  },
]

const BATCHES = ['All', '22MS', '23MS', '24MS', '25MS']
const DOMAINS = ['All', 'Web Dev', 'ML', 'Systems', 'Design', 'CP', 'App Dev']

export function MemberListApp() {
  const [search, setSearch] = useState('')
  const [batch, setBatch] = useState('All')

  const filtered = MEMBERS.filter(m => {
    const matchBatch = batch === 'All' || m.batch === batch
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.domain.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
    return matchBatch && matchSearch
  })

  const grouped = BATCHES.slice(1).reduce((acc, b) => {
    const members = filtered.filter(m => m.batch === b)
    if (members.length > 0) acc[b] = members
    return acc
  }, {} as Record<string, Member[]>)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// members.app — SlashDot Members</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        {MEMBERS.length} members across {BATCHES.length - 1} batches
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name, domain, role..."
          style={{ flex: 1, minWidth: 160, padding: '7px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {BATCHES.map(b => (
          <button key={b} onClick={() => setBatch(b)}
            style={{ padding: '3px 10px', background: batch === b ? '#00ff4620' : 'transparent', border: `1px solid ${batch === b ? '#00ff46' : '#333'}`, borderRadius: 4, color: batch === b ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
            {b}
          </button>
        ))}
      </div>

      {Object.entries(grouped).reverse().map(([b, members]) => (
        <div key={b} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{b} Batch</span>
            <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
            <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{members.length} members</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {members.map((m, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                  {m.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{m.name}</p>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{m.role} · {m.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12, textAlign: 'center', marginTop: 24 }}>No members found matching "{search}"</p>
      )}

      <div style={{ marginTop: 16, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
          📌 Member list is updated by the Office Bearers. Contact <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span> to be added.
        </p>
      </div>
    </div>
  )
}

// ─── RECRUITMENT ──────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Do I need prior experience?', a: 'Absolutely not. We recruit based on curiosity and willingness to learn. If you want to build things, you\'re welcome here.' },
  { q: 'What batches can apply?', a: 'Primarily the incoming batch every year. However, if you\'re a senior who missed recruitment, reach out — we\'re flexible.' },
  { q: 'What is the selection process?', a: 'A short application form followed by an informal interaction with the OBs. No technical test. Just a conversation about what you\'d like to build.' },
  { q: 'Is there a membership fee?', a: 'A nominal annual fee (ask the OBs for the current amount). It covers workshop expenses, events, and the occasional club pizza.' },
  { q: 'What will I actually do as a member?', a: 'Attend workshops, participate in hackathons, work on projects, and contribute to the club website and open source. Or just show up and learn. Both are fine.' },
  { q: 'Do I need to know a specific language?', a: 'No. Python, JavaScript, C, Java, Rust — all welcome. Even if you only know Scratch, we can work with that.' },
  { q: 'How much time does it take?', a: 'As much as you want to give. Active members contribute 3-5 hours a week. Casual members come to events. Both are valid.' },
  { q: 'Can designers join even if they don\'t code?', a: 'Yes! SlashDot is a coding AND designing club. UI/UX, graphic design, branding — all valued equally.' },
]

export function RecruitmentApp() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// recruit.app — Join SlashDot</p>

      <div style={{ background: 'linear-gradient(135deg, #0d1a0d, #001a00)', border: '1px solid #00ff4640', borderRadius: 10, padding: '16px', marginBottom: 16, textAlign: 'center' }}>
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>We're Recruiting!</p>
        <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, margin: '0 0 4px' }}>SlashDot — Coding & Design Club, IISER Kolkata</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>Annual recruitment opens after the new batch arrives</p>
      </div>

      <p className="app-label yellow">// what we're looking for</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {[
          ['🔥 Curiosity',     'You wonder how things work and want to build them'],
          ['💻 Any Skill',     'From Scratch to Assembly — all levels welcome'],
          ['🎨 Designers too', 'UI/UX, graphic design, branding — equally valued'],
          ['⏱ Commitment',    'Show up, contribute, and learn alongside your batch'],
          ['🤝 Teamwork',      'Hackathons and projects are collaborative'],
        ].map(([label, desc]) => (
          <div key={label as string} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 16, flexShrink: 0 }}>{(label as string).split(' ')[0]}</span>
            <div>
              <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{(label as string).split(' ').slice(1).join(' ')}</p>
              <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="app-label yellow">// timeline</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16, position: 'relative' }}>
        {[
          { step: '1', title: 'New batch arrives', time: 'August', done: true },
          { step: '2', title: 'Recruitment announcement', time: 'August–September', done: true },
          { step: '3', title: 'Application form opens', time: 'September', done: false },
          { step: '4', title: 'Informal interaction', time: 'September', done: false },
          { step: '5', title: 'Results announced', time: 'Late September', done: false },
          { step: '6', title: 'Welcome to SlashDot!', time: 'October', done: false },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? '#00ff4620' : '#111', border: `2px solid ${s.done ? '#00ff46' : '#333'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.done ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>
                {s.step}
              </div>
              {i < 5 && <div style={{ width: 2, height: 20, background: '#1e1e1e', marginTop: 4 }} />}
            </div>
            <div style={{ paddingTop: 4 }}>
              <p style={{ color: s.done ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{s.title}</p>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{s.time}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="app-label yellow">// perks of joining</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          ['🛠', 'Workshops', 'Regular coding and design sessions'],
          ['⚡', 'Hackathons', 'Annual HackSlash + external competitions'],
          ['🌐', 'Open Source', 'Contribute to real projects'],
          ['📦', 'Build Things', 'Work on actual products people use'],
          ['🤝', 'Network', 'Meet every batch of IISER coders'],
          ['📜', 'Certificate', 'Official club membership certificate'],
        ].map(([icon, title, desc]) => (
          <div key={title as string} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px' }}>
            <p style={{ fontSize: 18, margin: '0 0 4px' }}>{icon}</p>
            <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, margin: '0 0 2px' }}>{title}</p>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      <p className="app-label yellow">// FAQ</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ background: '#111', border: `1px solid ${openFaq === i ? '#00ff4640' : '#1e1e1e'}`, borderRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
              <span style={{ color: openFaq === i ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{faq.q}</span>
              <span style={{ color: '#444', fontSize: 12, flexShrink: 0, marginLeft: 8 }}>{openFaq === i ? '▲' : '▼'}</span>
            </button>
            {openFaq === i && (
              <div style={{ padding: '0 14px 12px' }}>
                <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: '#0d1a0d', border: '1px solid #00ff4630', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>Ready to join?</p>
        <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 4px' }}>slashdot@iiserkol.ac.in</p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>Or talk to any of the OBs directly — type <span style={{ color: '#00ff46' }}>members</span> to see them</p>
      </div>
    </div>
  )
}

// ─── ALUMNI ───────────────────────────────────────────────────────────────────
interface AlumniMember {
  name: string
  batch: string
  now: string
  company: string
  domain: string
  quote: string
}

const ALUMNI: AlumniMember[] = [
  { name: 'Abhranil Das',       batch: '17MS', now: 'Researcher',        company: 'UC Berkeley',         domain: 'Computational Neuroscience', quote: 'SlashDot taught me to build before I could think.' },
  { name: 'Soumyadeep Roy',     batch: '18MS', now: 'Software Engineer', company: 'Google',              domain: 'Distributed Systems',       quote: 'The hackathons were better prep than any course.' },
  { name: 'Priyanka Nandi',     batch: '18MS', now: 'ML Engineer',       company: 'OpenAI',              domain: 'Machine Learning',           quote: 'I wrote my first neural network at a SlashDot workshop.' },
  { name: 'Arjit Sen',          batch: '19MS', now: 'PhD Student',       company: 'MIT CSAIL',           domain: 'Programming Languages',     quote: 'Built a compiler for fun. SlashDot culture does that to you.' },
  { name: 'Tanushree Ghosh',    batch: '19MS', now: 'Founder',           company: 'EduTech Startup',     domain: 'EdTech, React',             quote: 'The real learning happened at 2am during hackathons.' },
  { name: 'Vivek Sinha',        batch: '20MS', now: 'SDE-II',            company: 'Microsoft',           domain: 'Backend, Cloud',            quote: 'SlashDot is where I stopped being afraid of breaking things.' },
  { name: 'Ritika Sharma',      batch: '20MS', now: 'Design Engineer',   company: 'Figma',               domain: 'Design Systems',            quote: 'They let me design everything. I ran with it.' },
  { name: 'Karthik Menon',      batch: '21MS', now: 'SDE',               company: 'Atlassian',           domain: 'Full Stack',                quote: 'HackSlash 2022 gave me my first real portfolio project.' },
  { name: 'Sanya Kapoor',       batch: '21MS', now: 'Quant Developer',   company: 'Goldman Sachs',       domain: 'Algorithms, Finance',       quote: 'Competitive programming in the club changed how I think.' },
  { name: '(Your name here)',   batch: '??MS', now: 'Future Legend',     company: '???',                 domain: 'Anything',                  quote: 'Join SlashDot. Build things. See where it takes you.' },
]

export function AlumniApp() {
  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// alumni.app — SlashDot Alumni</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>
        Where SlashDot members end up. We're proud of every one of them.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALUMNI.map((a, i) => (
          <div key={i} style={{
            background: '#111',
            border: `1px solid ${i === ALUMNI.length - 1 ? '#00ff4630' : '#1e1e1e'}`,
            borderLeft: `3px solid ${i === ALUMNI.length - 1 ? '#00ff46' : '#ffd70040'}`,
            borderRadius: 8, padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 4 }}>
              <div>
                <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{a.name}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{a.batch} · {a.domain}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, margin: '0 0 2px' }}>{a.now}</p>
                <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{a.company}</p>
              </div>
            </div>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>"{a.quote}"</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
          📌 Are you a SlashDot alumni? Email <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span> to be featured here.
        </p>
      </div>
    </div>
  )
}

// ─── PHOTO GALLERY ────────────────────────────────────────────────────────────
interface GalleryPhoto {
  emoji: string
  title: string
  event: string
  date: string
  color: string
}

const PHOTOS: GalleryPhoto[] = [
  { emoji: '⚡', title: 'HackSlash 2025 — Opening Ceremony', event: 'HackSlash 2025', date: 'Oct 2025', color: '#ffd700' },
  { emoji: '🏆', title: 'HackSlash 2025 — Winners', event: 'HackSlash 2025', date: 'Oct 2025', color: '#ffd700' },
  { emoji: '💻', title: '24-Hour Coding Session', event: 'HackSlash 2025', date: 'Oct 2025', color: '#ffd700' },
  { emoji: '📚', title: 'React Workshop — Day 1', event: 'Workshop', date: 'Sep 2025', color: '#00c8ff' },
  { emoji: '👥', title: 'React Workshop — Group Activity', event: 'Workshop', date: 'Sep 2025', color: '#00c8ff' },
  { emoji: '🌐', title: 'Git & Open Source Workshop', event: 'Workshop', date: 'Sep 2025', color: '#00c8ff' },
  { emoji: '🎓', title: '25MS Recruitment Drive', event: 'Recruitment', date: 'Aug 2025', color: '#00ff46' },
  { emoji: '📝', title: 'SlashDot Intro Session', event: 'Recruitment', date: 'Aug 2025', color: '#00ff46' },
  { emoji: '🌟', title: 'Annual Showcase 2025', event: 'Showcase', date: 'Feb 2025', color: '#c864ff' },
  { emoji: '🚀', title: 'Project Presentations', event: 'Showcase', date: 'Feb 2025', color: '#c864ff' },
  { emoji: '🎉', title: 'Inter-Batch Comp Submission', event: 'Competition', date: 'Apr 2026', color: '#ff5050' },
  { emoji: '📸', title: 'Your photo here', event: 'Future Event', date: '2026', color: '#333' },
]

const EVENTS_FILTER = ['All', 'HackSlash 2025', 'Workshop', 'Recruitment', 'Showcase', 'Competition']

export function GalleryApp() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<GalleryPhoto | null>(null)

  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter(p => p.event === filter)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// gallery.app — SlashDot Photo Gallery</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        Moments from SlashDot events. Real photos coming soon from the OBs!
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {EVENTS_FILTER.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '3px 10px', background: filter === f ? '#00ff4620' : 'transparent', border: `1px solid ${filter === f ? '#00ff46' : '#333'}`, borderRadius: 4, color: filter === f ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ background: '#111', border: `1px solid ${selected.color}40`, borderRadius: 10, padding: '20px', marginBottom: 14, textAlign: 'center', position: 'relative' }}>
          <button onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: 10, right: 12, background: 'transparent', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer' }}>✕</button>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{selected.emoji}</div>
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>{selected.title}</p>
          <p style={{ color: selected.color, fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 2px' }}>{selected.event}</p>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{selected.date}</p>
          <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 9, marginTop: 12 }}>Real photos will replace these placeholders soon!</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {filtered.map((p, i) => (
          <div key={i} onClick={() => setSelected(p)}
            style={{ background: `${p.color}10`, border: `1px solid ${p.color}30`, borderRadius: 8, aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', padding: 8 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLElement).style.borderColor = p.color + '80' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.borderColor = p.color + '30' }}>
            <span style={{ fontSize: 28, marginBottom: 6 }}>{p.emoji}</span>
            <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 8, textAlign: 'center', margin: 0, lineHeight: 1.3 }}>{p.title.length > 20 ? p.title.slice(0, 20) + '...' : p.title}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
          📸 Have photos from SlashDot events? Send them to <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span>
        </p>
      </div>
    </div>
  )
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
export function ContactFormApp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const SUBJECTS = ['General Inquiry', 'Join SlashDot', 'Event Collaboration', 'Project Showcase', 'Website Issue', 'Alumni Network', 'Other']

  function handleSend() {
    if (!name.trim() || !message.trim()) return
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const mailtoUrl = `mailto:slashdot@iiserkol.ac.in?subject=${encodeURIComponent(`[SlashDot OS] ${subject}`)}&body=${body}`
    window.open(mailtoUrl, '_blank')
    setSent(true)
  }

  const inp = {
    width: '100%',
    padding: '9px 12px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: 8,
    color: '#d0d0d0',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  if (sent) {
    return (
      <div className="app-body" style={{ padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📧</div>
        <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Message Prepared!</p>
        <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, marginBottom: 20 }}>
          Your email client should have opened with the message pre-filled.<br />
          Hit send and we'll get back to you soon!
        </p>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 20 }}>
          Or email directly: <span style={{ color: '#00ff46' }}>slashdot@iiserkol.ac.in</span>
        </p>
        <button onClick={() => setSent(false)}
          style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #333', borderRadius: 8, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
          Send Another
        </button>
      </div>
    )
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// contactform.app — Get in Touch</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>
        Fill this out and it'll open your email client pre-filled. Easy.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>Your Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Sankhadeep Bera" style={inp} />
        </div>

        <div>
          <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>Your Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="sb25ms227@iiserkol.ac.in" type="email" style={inp} />
        </div>

        <div>
          <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}
            style={{ ...inp, color: '#aaa', cursor: 'pointer' }}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, display: 'block', marginBottom: 4 }}>Message *</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5}
            placeholder="Hi SlashDot team! I wanted to reach out about..."
            style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
        </div>

        <button onClick={handleSend} disabled={!name.trim() || !message.trim()}
          style={{ padding: '11px', background: name.trim() && message.trim() ? '#00ff4620' : '#111', border: `1px solid ${name.trim() && message.trim() ? '#00ff46' : '#333'}`, borderRadius: 8, color: name.trim() && message.trim() ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: name.trim() && message.trim() ? 'pointer' : 'not-allowed', fontWeight: 700 }}>
          📧 Open in Email Client
        </button>

        <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px' }}>
          <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 4px' }}>Direct email:</p>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0 }}>slashdot@iiserkol.ac.in</p>
        </div>
      </div>
    </div>
  )
}