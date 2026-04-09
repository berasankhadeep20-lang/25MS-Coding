import { useState, useEffect, useRef } from 'react'

// ─── FLASHCARD APP ────────────────────────────────────────────────────────────
interface Card { id: number; q: string; a: string }
let cardId = 4
const INIT_CARDS: Card[] = [
  { id: 1, q: 'What does CPU stand for?', a: 'Central Processing Unit' },
  { id: 2, q: 'What is Big-O notation O(n log n)?', a: 'Linearithmic time — e.g. merge sort, heap sort' },
  { id: 3, q: 'What does IISER stand for?', a: 'Indian Institute of Science Education and Research' },
]

export function FlashcardApp() {
  const [cards, setCards] = useState<Card[]>(INIT_CARDS)
  const [mode, setMode] = useState<'edit' | 'quiz'>('edit')
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [newQ, setNewQ] = useState(''); const [newA, setNewA] = useState('')
  const [done, setDone] = useState<number[]>([])

  const current = cards[idx % cards.length]

  function addCard() {
    if (!newQ.trim() || !newA.trim()) return
    setCards(prev => [...prev, { id: ++cardId, q: newQ.trim(), a: newA.trim() }])
    setNewQ(''); setNewA('')
  }

  function startQuiz() { setMode('quiz'); setIdx(0); setFlipped(false); setScore({ correct: 0, wrong: 0 }); setDone([]) }

  function answer(correct: boolean) {
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setDone(d => [...d, current.id]); setFlipped(false)
    setIdx(i => i + 1)
  }

  const allDone = done.length >= cards.length

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// flash.app — Flashcards</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['edit', 'quiz'] as const).map(m => (
          <button key={m} onClick={() => m === 'quiz' ? startQuiz() : setMode(m)}
            style={{ padding: '3px 14px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m === 'edit' ? '✏ Edit Cards' : '🎓 Quiz Mode'}
          </button>
        ))}
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, alignSelf: 'center' }}>{cards.length} cards</span>
      </div>

      {mode === 'edit' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
            <input value={newQ} onChange={e => setNewQ(e.target.value)} placeholder="Question..."
              style={{ padding: '6px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
            <input value={newA} onChange={e => setNewA(e.target.value)} placeholder="Answer..."
              style={{ padding: '6px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
            <button onClick={addCard} style={{ padding: '5px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', alignSelf: 'flex-start' }}>+ Add Card</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 240, overflowY: 'auto' }}>
            {cards.map((c, i) => (
              <div key={c.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 12px', display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '0 0 2px' }}>Q: {c.q}</p>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>A: {c.a}</p>
                </div>
                <button onClick={() => setCards(prev => prev.filter(x => x.id !== c.id))} style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer' }}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'quiz' && !allDone && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 8 }}>
            Card {done.length + 1} / {cards.length} • ✓ {score.correct} ✗ {score.wrong}
          </p>
          <div
            onClick={() => setFlipped(f => !f)}
            style={{ background: '#111', border: '2px solid #00ff4640', borderRadius: 12, padding: '32px 20px', cursor: 'pointer', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'all 0.2s' }}>
            <p style={{ color: flipped ? '#00ff46' : '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {flipped ? current.a : current.q}
            </p>
          </div>
          <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>Click card to {flipped ? 'see question' : 'reveal answer'}</p>
          {flipped && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => answer(true)} style={{ padding: '8px 24px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 8, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>✓ Got it</button>
              <button onClick={() => answer(false)} style={{ padding: '8px 24px', background: '#ff505020', border: '1px solid #ff5050', borderRadius: 8, color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 13, cursor: 'pointer' }}>✗ Missed</button>
            </div>
          )}
        </div>
      )}

      {mode === 'quiz' && allDone && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Quiz Complete!</p>
          <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 16 }}>✓ {score.correct} correct</p>
          <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 16 }}>✗ {score.wrong} missed</p>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 14 }}>{Math.round(score.correct / cards.length * 100)}%</p>
          <button onClick={startQuiz} style={{ marginTop: 12, padding: '8px 20px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 8, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Try Again</button>
        </div>
      )}
    </div>
  )
}

// ─── BUDGET TRACKER ───────────────────────────────────────────────────────────
interface Transaction { id: number; desc: string; amount: number; type: 'income' | 'expense'; category: string; date: string }
let txId = 4
const INIT_TX: Transaction[] = [
  { id: 1, desc: 'Scholarship stipend', amount: 5000, type: 'income', category: 'Income', date: '2026-04-01' },
  { id: 2, desc: 'Canteen food', amount: 800, type: 'expense', category: 'Food', date: '2026-04-02' },
  { id: 3, desc: 'Books and stationery', amount: 400, type: 'expense', category: 'Education', date: '2026-04-03' },
]
const CATEGORIES = ['Food', 'Transport', 'Education', 'Entertainment', 'Health', 'Other', 'Income']

export function BudgetApp() {
  const [txs, setTxs] = useState<Transaction[]>(INIT_TX)
  const [desc, setDesc] = useState(''); const [amount, setAmount] = useState(''); const [type, setType] = useState<'income' | 'expense'>('expense'); const [cat, setCat] = useState('Food')

  const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expense

  function add() {
    if (!desc.trim() || !amount) return
    setTxs(prev => [{ id: ++txId, desc: desc.trim(), amount: parseFloat(amount), type, category: cat, date: new Date().toISOString().split('T')[0] }, ...prev])
    setDesc(''); setAmount('')
  }

  const catTotals = CATEGORIES.slice(0, -1).map(c => ({
    cat: c,
    total: txs.filter(t => t.category === c).reduce((s, t) => s + t.amount, 0),
  })).filter(c => c.total > 0)

  const maxCat = Math.max(...catTotals.map(c => c.total), 1)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// budget.app — Budget Tracker</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Balance', value: balance, color: balance >= 0 ? '#00ff46' : '#ff5050' },
          { label: 'Income', value: income, color: '#00ff46' },
          { label: 'Expenses', value: expense, color: '#ff5050' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
            <p style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, margin: '0 0 2px' }}>₹{s.value.toFixed(0)}</p>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description..."
          style={{ flex: 2, minWidth: 100, padding: '5px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount"
          style={{ width: 80, padding: '5px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        {(['income', 'expense'] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            style={{ padding: '4px 10px', background: type === t ? (t === 'income' ? '#00ff4620' : '#ff505020') : 'transparent', border: `1px solid ${type === t ? (t === 'income' ? '#00ff46' : '#ff5050') : '#333'}`, borderRadius: 4, color: type === t ? (t === 'income' ? '#00ff46' : '#ff5050') : '#666', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
            {t}
          </button>
        ))}
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ padding: '4px 6px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 10, outline: 'none' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={add} style={{ padding: '4px 12px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>+ Add</button>
      </div>
      {catTotals.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          {catTotals.map(c => (
            <div key={c.cat} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 80 }}>{c.cat}</span>
              <div style={{ flex: 1, height: 8, background: '#1a1a1a', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(c.total / maxCat) * 100}%`, background: '#00c8ff', borderRadius: 4 }} />
              </div>
              <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 50, textAlign: 'right' }}>₹{c.total}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ maxHeight: 160, overflowY: 'auto' }}>
        {txs.map(t => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #0d0d0d', alignItems: 'center' }}>
            <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{t.desc}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{t.category}</span>
              <span style={{ color: t.type === 'income' ? '#00ff46' : '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </span>
              <button onClick={() => setTxs(prev => prev.filter(x => x.id !== t.id))} style={{ background: 'transparent', border: 'none', color: '#333', cursor: 'pointer', fontSize: 10 }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── RECIPE BOOK ──────────────────────────────────────────────────────────────
const RECIPES = [
  { name: '🍜 Maggi Noodles', time: '5 mins', difficulty: 'Easy', ingredients: ['1 pack Maggi', '1.5 cups water', '1 tastemaker sachet', 'Optional: egg, veggies'], steps: ['Boil 1.5 cups of water.', 'Add noodles and tastemaker.', 'Cook for 2 minutes stirring.', 'Let water absorb. Serve hot.'], calories: 350 },
  { name: '☕ IISER Tea', time: '3 mins', difficulty: 'Expert', ingredients: ['Water', 'Tea leaves', 'Milk (if available)', 'Sugar', 'Patience'], steps: ['Boil water.', 'Add tea leaves.', 'Hope the hostel has milk.', 'Add sugar. Accept life.'], calories: 80 },
  { name: '🥚 Egg Bhurji', time: '10 mins', difficulty: 'Medium', ingredients: ['2 eggs', '1 onion chopped', '1 tomato', 'Salt, pepper, chilli', 'Oil'], steps: ['Heat oil in pan.', 'Sauté onions until golden.', 'Add tomatoes and spices.', 'Add eggs and scramble well.', 'Serve with bread.'], calories: 280 },
  { name: '🍚 Plain Rice + Dal', time: '20 mins', difficulty: 'Medium', ingredients: ['1 cup rice', '0.5 cup dal', '2 cups water', 'Salt', 'Turmeric'], steps: ['Wash rice and dal.', 'Pressure cook with water.', '3 whistles.', 'Let pressure release.', 'Serve with pickle.'], calories: 450 },
  { name: '🥪 Bread Butter', time: '1 min', difficulty: 'Easy', ingredients: ['2 slices bread', 'Butter', 'Optional: jam'], steps: ['Take bread.', 'Apply butter.', 'Eat. You are a culinary genius.'], calories: 200 },
  { name: '🍌 Banana + Peanut Butter', time: '30 secs', difficulty: 'Easy', ingredients: ['1 banana', 'Peanut butter'], steps: ['Peel banana.', 'Dip in peanut butter.', 'Question your life choices.', 'Enjoy anyway.'], calories: 320 },
]

export function RecipeApp() {
  const [selected, setSelected] = useState<typeof RECIPES[0] | null>(null)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// recipe.app — IISER Survival Cookbook</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>Meals you can actually make in a hostel room.</p>
      {!selected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RECIPES.map(r => (
            <div key={r.name} onClick={() => setSelected(r)}
              style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.1s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00ff4640' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e' }}>
              <div>
                <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{r.name}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>⏱ {r.time} • {r.calories} cal</p>
              </div>
              <span style={{ color: r.difficulty === 'Easy' ? '#00ff46' : r.difficulty === 'Medium' ? '#ffd700' : '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{r.difficulty}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)} style={{ marginBottom: 12, padding: '3px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>← Back</button>
          <p style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{selected.name}</p>
          <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>⏱ {selected.time} • {selected.difficulty} • {selected.calories} cal</p>
          <p className="app-label yellow" style={{ marginBottom: 6 }}>// ingredients</p>
          {selected.ingredients.map((ing, i) => <p key={i} style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '2px 0' }}>• {ing}</p>)}
          <p className="app-label yellow" style={{ margin: '12px 0 6px' }}>// steps</p>
          {selected.steps.map((step, i) => <p key={i} style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '4px 0' }}><span style={{ color: '#00ff46' }}>{i+1}.</span> {step}</p>)}
        </div>
      )}
    </div>
  )
}

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────────────────
export function CountdownApp() {
  const [target, setTarget] = useState('2026-04-11T23:59:59')
  const [label, setLabel] = useState('Competition Deadline')
  const [now, setNow] = useState(new Date())
  const [events, setEvents] = useState([
    { label: 'Competition Deadline', target: '2026-04-11T23:59:59', color: '#ff5050' },
    { label: 'Next Semester', target: '2026-07-01T00:00:00', color: '#00c8ff' },
    { label: "New Year's Eve", target: '2027-01-01T00:00:00', color: '#ffd700' },
  ])
  const [newLabel, setNewLabel] = useState(''); const [newTarget, setNewTarget] = useState('')

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  function diff(target: string) {
    const ms = new Date(target).getTime() - now.getTime()
    if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, past: true }
    return {
      d: Math.floor(ms / 86400000),
      h: Math.floor((ms % 86400000) / 3600000),
      m: Math.floor((ms % 3600000) / 60000),
      s: Math.floor((ms % 60000) / 1000),
      past: false,
    }
  }

  const main = diff(target)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// count.app — Countdown Timer</p>
      <div style={{ background: '#111', border: '1px solid #ff505040', borderRadius: 10, padding: '16px', marginBottom: 14, textAlign: 'center' }}>
        <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{label}</p>
        {main.past ? <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 20 }}>Time's up!</p> : (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {[['d', main.d], ['h', main.h], ['m', main.m], ['s', main.s]].map(([u, v]) => (
              <div key={u as string} style={{ textAlign: 'center' }}>
                <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 32, fontWeight: 700, margin: 0 }}>{String(v).padStart(2,'0')}</p>
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{u}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="app-label yellow">// saved countdowns</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {events.map((e, i) => {
          const d = diff(e.target)
          return (
            <div key={i} onClick={() => { setTarget(e.target); setLabel(e.label) }}
              style={{ background: '#111', border: `1px solid ${label === e.label ? e.color + '60' : '#1e1e1e'}`, borderRadius: 6, padding: '8px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: e.color, fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{e.label}</span>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{d.past ? 'Past' : `${d.d}d ${d.h}h ${d.m}m`}</span>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Event name..."
          style={{ flex: 1, padding: '5px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        <input type="datetime-local" value={newTarget} onChange={e => setNewTarget(e.target.value)}
          style={{ padding: '5px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 10, outline: 'none' }} />
        <button onClick={() => { if (newLabel && newTarget) { setEvents(prev => [...prev, { label: newLabel, target: newTarget, color: '#00c8ff' }]); setNewLabel(''); setNewTarget('') } }}
          style={{ padding: '5px 10px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>+</button>
      </div>
    </div>
  )
}

// ─── MEAL GENERATOR ───────────────────────────────────────────────────────────
const MEALS = {
  breakfast: ['Bread and butter (again)', 'Poha with tea', 'Idli sambhar', 'Cornflakes with questionable milk', 'Skipped (stayed up coding)'],
  lunch: ['Dal rice (always)', 'Chapati and sabzi', 'Rajma chawal (Monday special)', 'Canteen special (mystery meat)', 'Maggi because the queue was too long'],
  dinner: ['Same as lunch but colder', 'Egg bhurji and roti', 'Instant noodles again', 'Biryani (rare mythical event)', 'Skipped (deadline mode)'],
  snack: ['Samosa from canteen', 'Banana from mess', 'Biscuits from the store', 'Coffee (5th cup today)', 'Nothing (regret)'],
}

export function MealGenApp() {
  const [meal, setMeal] = useState<Record<string, string>>({})
  const [spinning, setSpinning] = useState(false)

  function generate() {
    setSpinning(true)
    setTimeout(() => {
      setMeal({
        breakfast: MEALS.breakfast[Math.floor(Math.random() * MEALS.breakfast.length)],
        lunch: MEALS.lunch[Math.floor(Math.random() * MEALS.lunch.length)],
        dinner: MEALS.dinner[Math.floor(Math.random() * MEALS.dinner.length)],
        snack: MEALS.snack[Math.floor(Math.random() * MEALS.snack.length)],
      })
      setSpinning(false)
    }, 600)
  }

  return (
    <div className="app-body" style={{ padding: '20px 24px', textAlign: 'center' }}>
      <p className="app-label cyan" style={{ textAlign: 'left' }}>// meal.app — IISER Meal Generator</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 20 }}>Can't decide what to eat? Let the OS decide for you.</p>
      <button onClick={generate} disabled={spinning}
        style={{ padding: '10px 28px', background: '#ffd70020', border: '2px solid #ffd700', borderRadius: 10, color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 14, cursor: 'pointer', marginBottom: 20 }}>
        {spinning ? '🎲 Generating...' : '🎲 Generate Meal Plan'}
      </button>
      {Object.keys(meal).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
          {Object.entries(meal).map(([time, food]) => (
            <div key={time} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, minWidth: 70, textTransform: 'capitalize' }}>{time}</span>
              <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>{food}</span>
            </div>
          ))}
          <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginTop: 8 }}>Nutritional value: questionable. Vibes: immaculate.</p>
        </div>
      )}
    </div>
  )
}

// ─── STUDY SCHEDULE BUILDER ───────────────────────────────────────────────────
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'CS', 'Research', 'Break', 'Sleep (maybe)']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SLOTS = ['8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24']
const COLORS: Record<string, string> = {
  Mathematics: '#ff5050', Physics: '#00c8ff', Chemistry: '#ffd700',
  Biology: '#00ff46', CS: '#c864ff', Research: '#ff8800',
  Break: '#333', 'Sleep (maybe)': '#1a1a1a',
}

export function StudySchedApp() {
  const [sched, setSched] = useState<Record<string, Record<string, string>>>(() => {
    const s: Record<string, Record<string, string>> = {}
    DAYS.forEach(d => { s[d] = {}; SLOTS.forEach(sl => { s[d][sl] = '' }) })
    return s
  })
  const [selected, setSelected] = useState('Mathematics')

  function setSlot(day: string, slot: string) {
    setSched(prev => {
      const next = { ...prev, [day]: { ...prev[day], [slot]: prev[day][slot] === selected ? '' : selected } }
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>// study.app</span>
        {SUBJECTS.map(s => (
          <button key={s} onClick={() => setSelected(s)}
            style={{ padding: '2px 8px', background: selected === s ? `${COLORS[s]}30` : 'transparent', border: `1px solid ${selected === s ? COLORS[s] : '#333'}`, borderRadius: 4, color: selected === s ? COLORS[s] : '#555', fontFamily: 'JetBrains Mono', fontSize: 9, cursor: 'pointer' }}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowX: 'auto', padding: 8 }}>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'JetBrains Mono', fontSize: 10 }}>
          <thead>
            <tr>
              <th style={{ color: '#555', padding: '4px 8px', textAlign: 'left', minWidth: 50 }}>Time</th>
              {DAYS.map(d => <th key={d} style={{ color: '#888', padding: '4px 10px', minWidth: 70 }}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map(slot => (
              <tr key={slot}>
                <td style={{ color: '#555', padding: '2px 8px', fontSize: 9 }}>{slot}</td>
                {DAYS.map(day => {
                  const subj = sched[day][slot]
                  return (
                    <td key={day} style={{ padding: 2 }}>
                      <div onClick={() => setSlot(day, slot)}
                        style={{ height: 28, background: subj ? `${COLORS[subj]}30` : '#111', border: `1px solid ${subj ? COLORS[subj] : '#1e1e1e'}`, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: subj ? COLORS[subj] : '#333', fontSize: 8, fontFamily: 'JetBrains Mono', transition: 'all 0.1s' }}>
                        {subj ? subj.slice(0, 4) : '+'}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '4px 12px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#333' }}>
        Select a subject above, then click cells to assign. Click again to clear.
      </div>
    </div>
  )
}