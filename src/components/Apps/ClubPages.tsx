import { useState } from 'react'

// ─── BLOG ─────────────────────────────────────────────────────────────────────
interface Article {
  title: string
  author: string
  batch: string
  date: string
  tag: string
  content: string[]
}

const ARTICLES: Article[] = [
  {
    title: 'How We Built SlashDot OS in 3 Weeks',
    author: 'Sankhadeep Bera',
    batch: '25MS',
    date: '2026-04-11',
    tag: 'Project',
    content: [
      "It started as a joke. \"What if the SlashDot website was a fake operating system?\" Sankhadeep said at 2am. S. Bari said \"okay\". That was the last rational decision made for the next three weeks.",
      "Week 1 was the terminal. We chose xterm.js because we wanted a real terminal, not a fake div with a blinking cursor. Within 3 days we had ls, cd, cat, and sudo party working. The sudo party command — which launches confetti — took longer to implement than the entire filesystem. Priorities.",
      "Week 2 was apps. We added one app, then another, then it became a competition with ourselves. Physics simulator. DNA viewer. Fourier visualizer. Snake game. Asteroids. At some point we stopped counting and just kept building.",
      "Week 3 was polish and panic. The submission deadline was April 11 at midnight. We pushed the final commit at 11:59:47 PM. This was not planned. The git log does not lie.",
      "The result: 100+ apps, 50+ easter eggs, a real RISC-V emulator, live weather, ISS tracking, and a Tamagotchi. Is it a website? Is it an OS? Is it a cry for help? Yes.",
      "Type 'open showcase' to see the full project. Type 'sudo party' if you just want confetti.",
    ],
  },
  {
    title: 'Why I Switched to Vim (And Why You Shouldn\'t)',
    author: 'Anonymous SlashDot Member',
    batch: '23MS',
    date: '2025-11-15',
    tag: 'Opinion',
    content: [
      "I switched to Vim in my second year. Not because it makes me more productive. Not because it's faster. I switched because I wanted to feel something.",
      "Vim is the only editor where opening a file feels like an achievement. The first time you successfully exit Vim (:wq), you feel a rush that no other software can replicate. Scientists call this 'learned helplessness relief'. I call it Thursday.",
      "The learning curve is not a curve. It's a cliff. Then a valley. Then another cliff. Then you emerge on the other side, a changed person, able to navigate files at the speed of thought and absolutely insufferable at parties.",
      "My advice: don't switch to Vim. Use VS Code. Be happy. But if you do switch, know that you will spend the first week just figuring out how to exit, and the second week explaining to everyone why you use Vim now.",
      "I have no regrets. My productivity is unchanged. My sense of self-worth is immeasurable. Type 'vim about.txt' in the terminal for the SlashDot OS experience.",
    ],
  },
  {
    title: '10 Things I Learned at HackSlash 2025',
    author: 'A Traumatized 24MS Student',
    batch: '24MS',
    date: '2025-10-14',
    tag: 'Event Recap',
    content: [
      "1. Your idea will change 3 times in the first hour. The final idea will be nothing like what you registered with. This is fine.",
      "2. The person who says 'I'll just handle the backend' will disappear for 6 hours and return with something that works perfectly. Do not question this.",
      "3. Free pizza has a 2-hour window before it becomes a geological layer on the table. Eat early.",
      "4. At hour 16, everyone speaks in code. Not programming code. Actual nonsense that makes perfect sense to your team. 'We need to butterfly the mongoose into the Redux' will be a sentence someone says.",
      "5. Sleep is a suggestion, not a requirement. The codebase agrees. It will also reflect this.",
      "6. The demo gods are real and they are petty. Whatever worked 10 minutes ago will not work during the demo. Budget 5 minutes for existential crisis.",
      "7. Someone on the team will have the idea that wins the hackathon at hour 22. This is not ideal timing but it is tradition.",
      "8. 'We can add that feature later' means it will never be added. This is a feature, not a bug.",
      "9. The relationships you make at 4am, debugging something that shouldn't be possible, are friendships for life.",
      "10. You will do it again next year. Willingly. Happily. What is wrong with us.",
    ],
  },
  {
    title: 'A Complete Guide to IISER Kolkata WiFi',
    author: 'The Entire IISER Community',
    batch: 'All',
    date: '2026-01-20',
    tag: 'Guide',
    content: [
      "Step 1: Connect to the network. Wait. Connect again. Restart your device. Connect. Wait. Accept that it will never connect and open your mobile hotspot.",
      "Step 2: On rare occasions, the WiFi will work. This will happen at 3am on a Tuesday when you are trying to sleep. Your laptop, sensing opportunity, will attempt to download all pending updates.",
      "Step 3: The library WiFi is better. The library also closes. These two facts are in constant conflict.",
      "Step 4: There is a spot near the canteen where the signal is inexplicably strong. Guard this knowledge with your life. Tell no one.",
      "Step 5: File an IT complaint. The complaint will be received. The complaint will be acknowledged. The WiFi will not change. But you will feel heard.",
      "Conclusion: Buy a good data plan. SlashDot recommends Jio. SlashDot is not sponsored by Jio. SlashDot wishes it was sponsored by Jio.",
      "P.S. Type 'iiser wifi' in the terminal for a live demonstration of this guide.",
    ],
  },
  {
    title: 'Getting Started with Competitive Programming',
    author: 'SlashDot Senior Member',
    batch: '22MS',
    date: '2025-09-01',
    tag: 'Tutorial',
    content: [
      "Competitive programming is the sport of solving algorithmic problems under time pressure. It is also the sport of questioning your life choices under time pressure. Both definitions are accurate.",
      "Start with Codeforces. Make an account. Do Div 3 problems. Accept that you will get WA (wrong answer) many times. This is normal. This is the process.",
      "Learn these topics in order: arrays and strings, sorting and searching, recursion and backtracking, dynamic programming (this one takes a while), graphs, and then whatever makes you feel unstoppable.",
      "Resources: CP-algorithms.com is the bible. USACO Guide is excellent for structured learning. The SlashDot resources app (type 'open resources') has a curated list.",
      "The most important tip: consistency beats intensity. 1 problem every day beats 10 problems on Sunday. Your brain needs time to build intuition.",
      "HackSlash has a competitive programming track every year. SlashDot runs prep sessions before. Show up. The sessions, not just the competition.",
    ],
  },
]

export function BlogApp() {
  const [selected, setSelected] = useState<Article | null>(null)

  const TAG_COLORS: Record<string, string> = {
    'Project': '#00ff46',
    'Opinion': '#ffd700',
    'Event Recap': '#ff8800',
    'Guide': '#00c8ff',
    'Tutorial': '#c864ff',
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// blog.app — SlashDot Blog</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
        Articles by SlashDot members. Want to contribute? Email slashdot@iiserkol.ac.in
      </p>

      {!selected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ARTICLES.map((a, i) => (
            <div key={i} onClick={() => setSelected(a)}
              style={{ background: '#111', border: '1px solid #1e1e1e', borderLeft: `3px solid ${TAG_COLORS[a.tag] ?? '#333'}`, borderRadius: 8, padding: '12px 14px', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff4640' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ background: (TAG_COLORS[a.tag] ?? '#333') + '20', color: TAG_COLORS[a.tag] ?? '#888', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: `1px solid ${(TAG_COLORS[a.tag] ?? '#333') + '40'}` }}>{a.tag}</span>
                <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{a.date}</span>
              </div>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '6px 0 4px' }}>{a.title}</p>
              <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 6px' }}>by {a.author} • {a.batch}</p>
              <p style={{ color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {a.content[0]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)}
            style={{ marginBottom: 12, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            ← Back
          </button>
          <span style={{ background: (TAG_COLORS[selected.tag] ?? '#333') + '20', color: TAG_COLORS[selected.tag] ?? '#888', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '2px 10px', borderRadius: 10, border: `1px solid ${(TAG_COLORS[selected.tag] ?? '#333') + '40'}` }}>{selected.tag}</span>
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, margin: '10px 0 4px' }}>{selected.title}</p>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>by {selected.author} • {selected.batch} • {selected.date}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selected.content.map((para, i) => (
              <p key={i} style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.9, margin: 0 }}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
interface Resource {
  name: string
  url: string
  desc: string
  free: boolean
}

interface ResourceCategory {
  cat: string
  icon: string
  color: string
  items: Resource[]
}

const RESOURCES: ResourceCategory[] = [
  {
    cat: 'Web Development',
    icon: '🌐',
    color: '#00c8ff',
    items: [
      { name: 'The Odin Project',     url: 'theodinproject.com',    desc: 'Full-stack web dev curriculum. Start here.',              free: true  },
      { name: 'MDN Web Docs',         url: 'developer.mozilla.org', desc: 'The definitive HTML/CSS/JS reference.',                   free: true  },
      { name: 'CSS Tricks',           url: 'css-tricks.com',        desc: 'Everything CSS. The flexbox guide is legendary.',          free: true  },
      { name: 'JavaScript.info',      url: 'javascript.info',       desc: 'Best JS tutorial on the internet. No debate.',            free: true  },
      { name: 'React Docs',           url: 'react.dev',             desc: 'Official React docs — actually good now.',                free: true  },
      { name: 'FreeCodeCamp',         url: 'freecodecamp.org',      desc: 'Structured curriculum with certifications.',              free: true  },
    ],
  },
  {
    cat: 'Competitive Programming',
    icon: '⚡',
    color: '#ffd700',
    items: [
      { name: 'Codeforces',           url: 'codeforces.com',        desc: 'The main arena. Start with Div 3.',                       free: true  },
      { name: 'CP-Algorithms',        url: 'cp-algorithms.com',     desc: 'The algorithm bible. Bookmark this now.',                 free: true  },
      { name: 'USACO Guide',          url: 'usaco.guide',           desc: 'Structured CP learning path. Excellent.',                 free: true  },
      { name: 'LeetCode',             url: 'leetcode.com',          desc: 'Interview prep. Do easy/mediums daily.',                  free: true  },
      { name: 'Competitive Programmer\'s Handbook', url: 'cses.fi/book/book.pdf', desc: 'Free PDF textbook by Antti Laaksonen.', free: true },
      { name: 'AtCoder',              url: 'atcoder.jp',            desc: 'Japanese CP site. Great problem quality.',                free: true  },
    ],
  },
  {
    cat: 'Machine Learning & AI',
    icon: '🤖',
    color: '#c864ff',
    items: [
      { name: 'fast.ai',              url: 'fast.ai',               desc: 'Top-down ML learning. Actually works.',                   free: true  },
      { name: 'Kaggle',               url: 'kaggle.com',            desc: 'Datasets, notebooks, competitions. Start here.',          free: true  },
      { name: '3Blue1Brown — Neural Networks', url: 'youtube.com/3b1b', desc: 'Best visual explanation of neural networks.',       free: true  },
      { name: 'Papers With Code',     url: 'paperswithcode.com',    desc: 'ML papers + implementation. Stay current.',              free: true  },
      { name: 'Andrej Karpathy\'s blog', url: 'karpathy.github.io', desc: 'Deep insights from an OG ML researcher.',               free: true  },
      { name: 'Hugging Face',         url: 'huggingface.co',        desc: 'Models, datasets, tutorials. The ML hub.',               free: true  },
    ],
  },
  {
    cat: 'System Programming & OS',
    icon: '⚙',
    color: '#ff5050',
    items: [
      { name: 'OSDev Wiki',           url: 'wiki.osdev.org',        desc: 'If you want to build an OS. We did this.',               free: true  },
      { name: 'Linux From Scratch',   url: 'linuxfromscratch.org',  desc: 'Build Linux from source. Not for the faint-hearted.',    free: true  },
      { name: 'Writing a C Compiler', url: 'norasandler.com/2017/11/29/Write-a-Compiler.html', desc: 'A compiler step by step.',   free: true  },
      { name: 'Crafting Interpreters', url: 'craftinginterpreters.com', desc: 'Free book on building programming languages.',       free: true  },
      { name: 'MIT 6.004 — CompArch', url: 'ocw.mit.edu',           desc: 'Computer architecture. Free MIT course.',               free: true  },
    ],
  },
  {
    cat: 'Design & UI/UX',
    icon: '🎨',
    color: '#00ff46',
    items: [
      { name: 'Figma',                url: 'figma.com',             desc: 'The design tool. Free for students.',                    free: true  },
      { name: 'Refactoring UI',       url: 'refactoringui.com',     desc: 'Turn ugly UIs into beautiful ones. A book.',            free: false },
      { name: 'Laws of UX',           url: 'lawsofux.com',          desc: 'Principles of good UX. Quick reads.',                   free: true  },
      { name: 'Dribbble',             url: 'dribbble.com',          desc: 'Design inspiration. Don\'t copy, get inspired.',        free: true  },
      { name: 'Google Fonts',         url: 'fonts.google.com',      desc: 'Free fonts for everything.',                            free: true  },
      { name: 'Coolors',              url: 'coolors.co',            desc: 'Color palette generator. Genuinely useful.',            free: true  },
    ],
  },
  {
    cat: 'Open Source & Git',
    icon: '🐙',
    color: '#ff8800',
    items: [
      { name: 'GitHub',               url: 'github.com',            desc: 'You know this. But are you using it well?',             free: true  },
      { name: 'First Contributions',  url: 'firstcontributions.github.io', desc: 'Your first open source PR. Do it today.',       free: true  },
      { name: 'Oh My Git!',           url: 'ohmygit.org',           desc: 'Learn git through a game. Yes really.',                 free: true  },
      { name: 'Git Visualization',    url: 'learngitbranching.js.org', desc: 'Interactive git branching tutorial.',               free: true  },
      { name: 'Choose a License',     url: 'choosealicense.com',    desc: 'Which open source license to use.',                    free: true  },
    ],
  },
  {
    cat: 'IISER Kolkata Specific',
    icon: '🏛',
    color: '#aaaaff',
    items: [
      { name: 'IISER Kolkata',        url: 'iiserkol.ac.in',        desc: 'The official institute website.',                       free: true  },
      { name: 'Students Gymkhana',    url: 'clubs.iiserkol.ac.in',  desc: 'All clubs and student activities.',                    free: true  },
      { name: 'SlashDot GitHub',      url: 'github.com/slashdot-iiserk', desc: 'Our GitHub org. Star our repos.',                free: true  },
      { name: 'This Website',         url: 'slashdot-iiserk.github.io', desc: 'You are here. Tell your friends.',                free: true  },
    ],
  },
]

export function ResourcesApp() {
  const [selected, setSelected] = useState<ResourceCategory | null>(null)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// resources.app — Learning Resources</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 14 }}>
        Curated by SlashDot members. All links are free unless marked otherwise.
      </p>

      {!selected ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {RESOURCES.map((cat, i) => (
            <div key={i} onClick={() => setSelected(cat)}
              style={{ background: '#111', border: `1px solid ${cat.color}30`, borderLeft: `3px solid ${cat.color}`, borderRadius: 8, padding: '12px 14px', cursor: 'pointer', transition: 'border-color 0.1s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color + '60' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color + '30' }}>
              <p style={{ fontSize: 20, margin: '0 0 4px' }}>{cat.icon}</p>
              <p style={{ color: cat.color, fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{cat.cat}</p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{cat.items.length} resources</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)}
            style={{ marginBottom: 12, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>{selected.icon}</span>
            <p style={{ color: selected.color, fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, margin: 0 }}>{selected.cat}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selected.items.map((item, i) => (
              <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                    <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>{item.name}</p>
                    {!item.free && <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 6px', border: '1px solid #ffd70040', borderRadius: 4 }}>PAID</span>}
                  </div>
                  <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 4px' }}>{item.desc}</p>
                  <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{item.url}</span>
                </div>
                <a href={`https://${item.url}`} target="_blank" rel="noreferrer"
                  style={{ color: selected.color, fontFamily: 'JetBrains Mono', fontSize: 10, textDecoration: 'none', flexShrink: 0, padding: '3px 8px', border: `1px solid ${selected.color}40`, borderRadius: 4 }}
                  onClick={e => e.stopPropagation()}>
                  Visit →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── HALL OF FAME ─────────────────────────────────────────────────────────────
interface FameEntry {
  title: string
  winner: string
  batch: string
  year: string
  event: string
  description: string
  trophy: string
}

const HALL: FameEntry[] = [
  { trophy: '🥇', title: 'Best Website — Inter-Batch Comp 2026', winner: 'Sankhadeep Bera & S. Bari', batch: '25MS', year: '2026', event: 'Inter-Batch Website Development Competition', description: 'Built SlashDot OS — a fully-featured browser-based OS simulator with 100+ apps, real terminal, games, and science visualizers. Submitted with 13 seconds to spare.' },
  { trophy: '🥇', title: 'HackSlash 2025 — Grand Prize', winner: 'Team canteen.io', batch: '24MS', year: '2025', event: 'HackSlash Annual Hackathon', description: 'Built a real-time canteen queue detector using Raspberry Pi + computer vision. Reduced average wait time estimation from "a really long time" to "precisely 14 minutes".' },
  { trophy: '🥈', title: 'HackSlash 2025 — Runner Up', winner: 'Team null pointer', batch: '23MS + 24MS', year: '2025', event: 'HackSlash Annual Hackathon', description: 'Built a smart study scheduler that integrates with your course timetable. Rejected by 3 team members who "work better under pressure anyway".' },
  { trophy: '🥉', title: 'HackSlash 2025 — Third Place', winner: 'Team git blame', batch: '25MS', year: '2025', event: 'HackSlash Annual Hackathon', description: 'An interactive IISER campus navigation app with WiFi strength heatmap. Heatmap was mostly red. Accurate.' },
  { trophy: '🏆', title: 'Best Website — Inter-Batch Comp 2025', winner: 'Unknown 24MS Developer', batch: '24MS', year: '2025', event: 'Inter-Batch Website Development Competition', description: 'Built a clean, elegant SlashDot website with animations. Later replaced by the 25MS OS. No hard feelings.' },
  { trophy: '🌟', title: 'Most Creative Project — 2025', winner: 'Anonymous', batch: '23MS', year: '2025', event: 'SlashDot Annual Showcase', description: 'A browser-based IISER simulator game where you play as a first-year student trying to find the library, get WiFi, and survive end-sems. 97% accuracy according to actual first-years.' },
  { trophy: '🎖', title: 'Open Source Contribution Award — 2025', winner: 'Multiple Members', batch: '22MS + 23MS', year: '2025', event: 'SlashDot Open Source Drive', description: 'Collectively made 47 merged PRs to various open source projects during the Open Source Contribution Drive. 12 of those PRs were fixing typos. We count them anyway.' },
  { trophy: '⭐', title: 'Your Name Here', winner: '??', batch: '??', year: '2027', event: 'Future Event', description: 'This slot is waiting for you. Join SlashDot, build something great, and earn your place in the Hall of Fame.' },
]

export function HallOfFameApp() {
  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// fame.app — SlashDot Hall of Fame</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>
        Celebrating the best projects, wins, and contributions by SlashDot members.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HALL.map((entry, i) => (
          <div key={i} style={{
            background: '#111',
            border: `1px solid ${i === 0 ? '#ffd70040' : '#1e1e1e'}`,
            borderLeft: `3px solid ${i === 0 ? '#ffd700' : i === 1 ? '#aaaaaa' : i === 2 ? '#ff8800' : '#1e1e1e'}`,
            borderRadius: 8,
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{entry.trophy}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{entry.title}</p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{entry.winner}</span>
                  <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>•</span>
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{entry.batch}</span>
                  <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>•</span>
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{entry.year}</span>
                </div>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '0 0 6px', fontStyle: 'italic' }}>{entry.event}</p>
                <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7, margin: 0 }}>{entry.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── RULES / CONSTITUTION ─────────────────────────────────────────────────────
const RULES = [
  {
    section: 'Preamble',
    content: 'We, the members of SlashDot, the Coding and Designing Club of IISER Kolkata, in order to form a more perfect union of nerds, establish justice for all debugging sessions, ensure the general welfare of caffeine supplies, and secure the blessings of merged PRs to ourselves and our posterity, do ordain and establish this Constitution for the SlashDot Club.',
  },
  {
    section: 'Article I — Name & Identity',
    content: 'The club shall be known as SlashDot. The name comes from the characters / and . which are fundamental to computing, file paths, and the general philosophy that things should be kept simple and composable. Anyone who calls it "SlashDot Club Club" shall be gently corrected.',
  },
  {
    section: 'Article II — Membership',
    content: 'Any student of IISER Kolkata may join SlashDot. There is no experience requirement. There is no minimum CGPA (thank the stars). There is no maximum number of bugs you have introduced. Enthusiasm is the only prerequisite. Membership fees shall be determined by the Office Bearers each year and shall remain reasonable.',
  },
  {
    section: 'Article III — Office Bearers',
    content: 'SlashDot shall be governed by Office Bearers elected annually. The OBs shall consist of a President, Secretary, and Treasurer. OBs shall have final say on club matters, event organisation, recruitment, and what counts as "done enough to demo". OBs serve for one academic year.',
  },
  {
    section: 'Article IV — Core Committee',
    content: 'A Core Committee of members shall assist the OBs. Core Committee roles include Webmaster, Design Lead, Content Manager, Events Manager, and Outreach. Core Committee members are selected by the OBs based on interest and contribution. Core Committee members are strongly encouraged to have opinions about dark mode.',
  },
  {
    section: 'Article V — Meetings',
    content: 'SlashDot shall hold regular meetings. Meeting attendance is encouraged but not mandatory. However, the pizza at meetings is mandatory to finish. Meeting minutes shall be kept. Meeting minutes shall be readable by at least one person other than the secretary.',
  },
  {
    section: 'Article VI — Events',
    content: 'SlashDot shall organise events including but not limited to: workshops, hackathons, talks, competitions, and the annual showcase. All events shall be open to the IISER Kolkata community unless specifically designated as members-only. Free food at events is a privilege, not a right, but we try our best.',
  },
  {
    section: 'Article VII — Projects',
    content: 'Members are encouraged to work on projects. Projects may be individual or collaborative. Projects may be serious or delightfully absurd. Projects that detect the canteen queue, simulate an OS, or make the WiFi situation worse are all equally valid. Projects should be documented. The README shall not be a single line.',
  },
  {
    section: 'Article VIII — The WiFi',
    content: 'SlashDot acknowledges the WiFi situation. SlashDot has no jurisdiction over the WiFi. SlashDot sympathises deeply. Members are encouraged to maintain a good mobile data plan. The club is not responsible for productivity lost to buffering.',
  },
  {
    section: 'Article IX — The Terminal',
    content: 'All club members are strongly encouraged to be comfortable with the command line. This does not mean you must use Vim. However, you must be able to exit Vim if accidentally opened. This is non-negotiable. There will be a test.',
  },
  {
    section: 'Article X — Amendments',
    content: 'This Constitution may be amended by a two-thirds majority of active members. Proposed amendments must be presented at a meeting, discussed, and then voted upon at the following meeting. Amendments to the WiFi article require a quorum and a moment of silence.',
  },
]

export function RulesApp() {
  const [expanded, setExpanded] = useState<string | null>('Preamble')

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
        <p className="app-label cyan" style={{ margin: 0 }}>// rules.app — SlashDot Constitution</p>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9 }}>v2026.1</span>
      </div>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 14 }}>
        The founding document of SlashDot. Mostly serious. Mostly.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {RULES.map((rule, i) => (
          <div key={i} style={{ background: '#111', border: `1px solid ${expanded === rule.section ? '#00ff4640' : '#1e1e1e'}`, borderRadius: 8, overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(expanded === rule.section ? null : rule.section)}
              style={{ width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: expanded === rule.section ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, textAlign: 'left' }}>{rule.section}</span>
              <span style={{ color: '#444', fontSize: 12 }}>{expanded === rule.section ? '▲' : '▼'}</span>
            </button>
            {expanded === rule.section && (
              <div style={{ padding: '0 14px 12px' }}>
                <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.8, margin: 0 }}>{rule.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
interface NewsletterIssue {
  issue: string
  date: string
  headline: string
  articles: { title: string; content: string }[]
}

const NEWSLETTERS: NewsletterIssue[] = [
  {
    issue: 'Issue #4 — April 2026',
    date: '2026-04-11',
    headline: '25MS Builds SlashDot OS — The Website is Now an Operating System',
    articles: [
      { title: '🚀 SlashDot OS Ships', content: 'In a move that surprised everyone including themselves, the 25MS batch built the entire SlashDot website as a browser-based operating system. Features include a real terminal, 100+ apps, games, science visualizers, and 50+ easter eggs. The site was submitted 13 seconds before the deadline. The developers are currently sleeping.' },
      { title: '💻 HackSlash 2026 Date Announced', content: 'Mark your calendars — HackSlash 2026 is happening on October 3rd. 24 hours. Free food. Prizes for top 3 teams. Register your team early. Last year we had to turn teams away. (We didn\'t. But we could have.)' },
      { title: '📢 Recruitment Opens in August', content: 'The 26MS batch arrives in August and SlashDot recruitment opens shortly after. If you know any incoming students, tell them about us. Tell them we\'re cool. We are cool. Probably.' },
      { title: '🎯 Tip of the Month', content: 'Did you know you can press Ctrl+K anywhere in SlashDot OS to open the Command Palette? It searches all apps, commands, and settings. Also try typing "sudo party" in the terminal. You\'ll thank us.' },
    ],
  },
  {
    issue: 'Issue #3 — November 2025',
    date: '2025-11-30',
    headline: 'HackSlash 2025 Recap: 12 Teams, 24 Hours, 1 Canteen Queue Detector',
    articles: [
      { title: '🏆 HackSlash 2025 Results', content: 'HackSlash 2025 was the biggest yet. 12 teams competed over 24 hours. First place went to Team canteen.io (24MS) for their Raspberry Pi queue detector. Second place to Team null pointer for their study scheduler. Third place to Team git blame for the campus navigation app with WiFi heatmap.' },
      { title: '📚 React Workshop Recap', content: 'The React workshop saw 35 attendees over 3 days. By the end, everyone had a running todo app. Some were more ambitious — one attendee built a full kanban board. Another built a todo app to remind them to finish the todo app. The spirit of recursion lives on.' },
      { title: '🌟 Member Spotlight: Open Source', content: 'Several SlashDot members made their first open source contributions this semester during the Open Source Drive. Collectively: 47 merged PRs across various repositories. A few were typo fixes but we\'re counting all of them.' },
    ],
  },
  {
    issue: 'Issue #2 — August 2025',
    date: '2025-08-31',
    headline: 'Welcome 25MS! + Git Workshop This Month',
    articles: [
      { title: '🎓 Welcome to the 25MS Batch', content: 'A warm SlashDot welcome to the 25MS batch! Recruitment is open. Find us at the Gymkhana stall. We have stickers. We will not use the stickers as bribery. But we have stickers.' },
      { title: '🔧 Git Workshop — September 5th', content: 'All-levels git workshop coming up. If you\'ve never used git: perfect, start here. If you\'ve used git but don\'t know what a rebase is: also perfect. If you already know everything about git: we will find edge cases that confuse you.' },
      { title: '💡 What is SlashDot?', content: 'SlashDot is IISER Kolkata\'s coding and designing club. We build things, break things, fix things, and then break them again. We host workshops, hackathons, and events. No experience required to join — just curiosity.' },
    ],
  },
  {
    issue: 'Issue #1 — January 2025',
    date: '2025-01-15',
    headline: 'SlashDot Newsletter Launches + Annual Showcase Announced',
    articles: [
      { title: '📰 The Newsletter Begins', content: 'Welcome to the first issue of the SlashDot Newsletter. We will publish this monthly or whenever we remember to. Whichever comes first. This issue you are reading right now is proof that we remembered.' },
      { title: '🌟 Annual Showcase 2025 — February', content: 'The annual project showcase is coming in February. If you\'ve built something this year — a web app, a game, a script, a robot, a philosophical framework — submit it. All skill levels welcome. The only requirement is that it must be yours.' },
      { title: '📅 Upcoming: Inter-Batch Competition', content: 'The Inter-Batch Website Development Competition launches soon. Each batch builds the official SlashDot website. Past winners have set a high bar. We expect this year\'s entries to be exceptional.' },
    ],
  },
]

export function NewsletterApp() {
  const [selected, setSelected] = useState<NewsletterIssue | null>(null)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// newsletter.app — SlashDot Newsletter</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 14 }}>
        Monthly (ish) updates from the club. Subscribe via slashdot@iiserkol.ac.in
      </p>

      {!selected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NEWSLETTERS.map((n, i) => (
            <div key={i} onClick={() => setSelected(n)}
              style={{ background: '#111', border: i === 0 ? '1px solid #00ff4640' : '1px solid #1e1e1e', borderRadius: 8, padding: '14px 16px', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff4640' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = i === 0 ? '#00ff4640' : '#1e1e1e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700 }}>{n.issue}</span>
                {i === 0 && <span style={{ background: '#00ff4620', color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9, padding: '1px 8px', borderRadius: 10, border: '1px solid #00ff4640' }}>Latest</span>}
              </div>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 4px', lineHeight: 1.5 }}>{n.headline}</p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{n.articles.length} articles • {n.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)}
            style={{ marginBottom: 14, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            ← Back
          </button>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, margin: '0 0 2px' }}>{selected.issue}</p>
          <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, margin: '0 0 4px', lineHeight: 1.5 }}>{selected.headline}</p>
          <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 16 }}>{selected.date}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {selected.articles.map((a, i) => (
              <div key={i} style={{ borderTop: '1px solid #1a1a1a', paddingTop: 12 }}>
                <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 8px' }}>{a.title}</p>
                <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, margin: 0 }}>{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}