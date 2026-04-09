import { useState, useEffect, useRef, useCallback } from 'react'

// ─── SORTING VISUALIZER ───────────────────────────────────────────────────────
export function SortVisApp() {
  const [arr, setArr] = useState<number[]>([])
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])
  const [algo, setAlgo] = useState<'bubble' | 'quick' | 'merge'>('bubble')
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(50)
  const stopRef = useRef(false)

  function randomArr() {
    setSorted([]); setComparing([])
    setArr(Array.from({ length: 40 }, () => Math.floor(Math.random() * 280) + 20))
  }

  useEffect(() => { randomArr() }, [])

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

  async function bubble(a: number[]) {
    const arr = [...a]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return
        setComparing([j, j + 1])
        if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; setArr([...arr]) }
        await delay(speed)
      }
      setSorted(s => [...s, arr.length - i - 1])
    }
  }

  async function quick(a: number[], lo = 0, hi = a.length - 1) {
    if (lo >= hi || stopRef.current) return
    const pivot = a[hi]; let i = lo
    for (let j = lo; j < hi; j++) {
      if (stopRef.current) return
      setComparing([j, hi])
      if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; setArr([...a]); i++ }
      await delay(speed)
    }
    [a[i], a[hi]] = [a[hi], a[i]]; setArr([...a])
    await quick(a, lo, i - 1)
    await quick(a, i + 1, hi)
  }

  async function mergeSort(a: number[], left = 0, right = a.length - 1) {
    if (left >= right || stopRef.current) return
    const mid = Math.floor((left + right) / 2)
    await mergeSort(a, left, mid)
    await mergeSort(a, mid + 1, right)
    const tmp = []
    let i = left, j = mid + 1
    while (i <= mid && j <= right) {
      setComparing([i, j])
      if (a[i] <= a[j]) tmp.push(a[i++])
      else tmp.push(a[j++])
      await delay(speed)
    }
    while (i <= mid) tmp.push(a[i++])
    while (j <= right) tmp.push(a[j++])
    for (let k = 0; k < tmp.length; k++) { a[left + k] = tmp[k]; setArr([...a]) }
  }

  async function run() {
    stopRef.current = false; setRunning(true); setSorted([]); setComparing([])
    const a = [...arr]
    if (algo === 'bubble') await bubble(a)
    else if (algo === 'quick') await quick(a)
    else await mergeSort(a)
    setComparing([]); setSorted(Array.from({ length: a.length }, (_, i) => i))
    setRunning(false)
  }

  function stop() { stopRef.current = true; setRunning(false); setComparing([]) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 12 }}>// sort.app</span>
        {(['bubble', 'quick', 'merge'] as const).map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            style={{ padding: '2px 10px', background: algo === a ? '#00ff4620' : 'transparent', border: `1px solid ${algo === a ? '#00ff46' : '#333'}`, borderRadius: 4, color: algo === a ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {a}
          </button>
        ))}
        <button onClick={randomArr} disabled={running} style={{ padding: '2px 10px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Shuffle</button>
        <button onClick={running ? stop : run}
          style={{ padding: '2px 14px', background: running ? '#ff505020' : '#00ff4620', border: `1px solid ${running ? '#ff5050' : '#00ff46'}`, borderRadius: 4, color: running ? '#ff5050' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
          {running ? '⏹ Stop' : '▶ Sort'}
        </button>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Speed:</span>
        <input type="range" min={10} max={200} value={speed} onChange={e => setSpeed(Number(e.target.value))} style={{ width: 80 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', padding: '8px 12px', gap: 2 }}>
        {arr.map((v, i) => (
          <div key={i} style={{
            flex: 1, height: v, borderRadius: '2px 2px 0 0', transition: 'height 0.05s',
            background: sorted.includes(i) ? '#00ff46' : comparing.includes(i) ? '#ff5050' : '#00c8ff',
            boxShadow: comparing.includes(i) ? '0 0 6px #ff505060' : 'none',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── PATHFINDING VISUALIZER ───────────────────────────────────────────────────
const ROWS = 18, COLS_P = 36
type Cell = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path'

export function PathVisApp() {
  const [grid, setGrid] = useState<Cell[][]>(() => Array.from({ length: ROWS }, () => Array(COLS_P).fill('empty' as Cell)))
  const [algo, setAlgo] = useState<'astar' | 'dijkstra'>('astar')
  const [drawing, setDrawing] = useState<'wall' | 'start' | 'end'>('wall')
  const [running, setRunning] = useState(false)
  const [stats, setStats] = useState({ visited: 0, path: 0 })
  const paintRef = useRef(false)
  const stopRef = useRef(false)

  function cellAt(g: Cell[][], r: number, c: number): Cell { return g[r]?.[c] ?? 'wall' }

  function setCell(r: number, c: number, type: Cell) {
    setGrid(prev => {
      const next = prev.map(row => [...row])
      if (type === 'start') { for (let i = 0; i < ROWS; i++) for (let j = 0; j < COLS_P; j++) if (next[i][j] === 'start') next[i][j] = 'empty' }
      if (type === 'end') { for (let i = 0; i < ROWS; i++) for (let j = 0; j < COLS_P; j++) if (next[i][j] === 'end') next[i][j] = 'empty' }
      next[r][c] = type
      return next
    })
  }

  function clearPaths() {
    setGrid(prev => prev.map(row => row.map(c => (c === 'visited' || c === 'path') ? 'empty' : c)))
  }

  function clearAll() { setGrid(Array.from({ length: ROWS }, () => Array(COLS_P).fill('empty' as Cell))); setStats({ visited: 0, path: 0 }) }

  async function solve() {
    stopRef.current = false; setRunning(true); clearPaths()
    await new Promise(r => setTimeout(r, 50))
    const g = grid.map(row => [...row])
    let start: [number, number] = [0, 0], end: [number, number] = [ROWS - 1, COLS_P - 1]
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS_P; c++) {
      if (g[r][c] === 'start') start = [r, c]
      if (g[r][c] === 'end') end = [r, c]
    }
    const dirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]]
    const dist: number[][] = Array.from({ length: ROWS }, () => Array(COLS_P).fill(Infinity))
    const prevMap: ([number, number] | null)[][] = Array.from({ length: ROWS }, () => Array(COLS_P).fill(null))
    const open: [number, number, number][] = [[0, start[0], start[1]]]
    dist[start[0]][start[1]] = 0
    let visitedCount = 0

    while (open.length > 0 && !stopRef.current) {
      open.sort((a, b) => a[0] - b[0])
      const [, r, c] = open.shift()!
      if (g[r][c] === 'visited') continue
      if (g[r][c] !== 'start' && g[r][c] !== 'end') {
        g[r][c] = 'visited'; visitedCount++
        setGrid(prev => { const next = prev.map(row => [...row]); if (next[r][c] !== 'start' && next[r][c] !== 'end') next[r][c] = 'visited'; return next })
        await new Promise<void>(resolve => setTimeout(resolve, 8))
      }
      if (r === end[0] && c === end[1]) break
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS_P) continue
        if (g[nr][nc] === 'wall') continue
        const h = algo === 'astar' ? Math.abs(nr - end[0]) + Math.abs(nc - end[1]) : 0
        const nd = dist[r][c] + 1
        if (nd < dist[nr][nc]) { dist[nr][nc] = nd; prevMap[nr][nc] = [r, c]; open.push([nd + h, nr, nc]) }
      }
    }

    let pathLen = 0
    let cur: [number, number] | null = end
    while (cur && !stopRef.current) {
      const pr: number = cur[0], pc: number = cur[1]
      if (g[pr][pc] !== 'start' && g[pr][pc] !== 'end') { setGrid(prev => { const next = prev.map(row => [...row]); next[pr][pc] = 'path'; return next }); pathLen++ }
      cur = prevMap[pr][pc]; await new Promise<void>(resolve => setTimeout(resolve, 15))
    }

    setStats({ visited: visitedCount, path: pathLen })
    setRunning(false)
  }

  const CELL_S = 16
  const COLOR: Record<Cell, string> = { empty: '#111', wall: '#444', start: '#00ff46', end: '#ff5050', visited: '#00c8ff30', path: '#ffd700' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 12 }}>// path.app</span>
        {(['astar', 'dijkstra'] as const).map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            style={{ padding: '2px 10px', background: algo === a ? '#00ff4620' : 'transparent', border: `1px solid ${algo === a ? '#00ff46' : '#333'}`, borderRadius: 4, color: algo === a ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {a === 'astar' ? 'A*' : 'Dijkstra'}
          </button>
        ))}
        {(['wall', 'start', 'end'] as const).map(d => (
          <button key={d} onClick={() => setDrawing(d)}
            style={{ padding: '2px 10px', background: drawing === d ? '#ffd70020' : 'transparent', border: `1px solid ${drawing === d ? '#ffd700' : '#333'}`, borderRadius: 4, color: drawing === d ? '#ffd700' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {d}
          </button>
        ))}
        <button onClick={running ? () => stopRef.current = true : solve}
          style={{ padding: '2px 14px', background: running ? '#ff505020' : '#00ff4620', border: `1px solid ${running ? '#ff5050' : '#00ff46'}`, borderRadius: 4, color: running ? '#ff5050' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
          {running ? '⏹ Stop' : '▶ Find Path'}
        </button>
        <button onClick={clearPaths} style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Clear Path</button>
        <button onClick={clearAll} style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Clear All</button>
        {stats.visited > 0 && <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Visited: {stats.visited} Path: {stats.path}</span>}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS_P}, ${CELL_S}px)`, gap: 1, cursor: 'crosshair' }}
          onMouseDown={() => { paintRef.current = true }}
          onMouseUp={() => { paintRef.current = false }}
          onMouseLeave={() => { paintRef.current = false }}
        >
          {grid.map((row, r) => row.map((cell, c) => (
            <div key={`${r}-${c}`}
              style={{ width: CELL_S, height: CELL_S, background: COLOR[cell], borderRadius: 2, transition: 'background 0.1s' }}
              onMouseDown={() => setCell(r, c, drawing)}
              onMouseEnter={() => { if (paintRef.current && drawing === 'wall') setCell(r, c, 'wall') }}
            />
          )))}
        </div>
      </div>
      <div style={{ padding: '4px 12px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#333', display: 'flex', gap: 16 }}>
        <span style={{ color: '#00ff46' }}>■ Start</span><span style={{ color: '#ff5050' }}>■ End</span><span style={{ color: '#444' }}>■ Wall</span><span style={{ color: '#00c8ff' }}>■ Visited</span><span style={{ color: '#ffd700' }}>■ Path</span>
      </div>
    </div>
  )
}

// ─── BINARY/HEX/DECIMAL CONVERTER ────────────────────────────────────────────
export function BinConvApp() {
  const [value, setValue] = useState('255')
  const [base, setBase] = useState<10 | 2 | 16>(10)

  function toDecimal(): number {
    try {
      if (base === 10) return parseInt(value) || 0
      if (base === 2) return parseInt(value, 2) || 0
      if (base === 16) return parseInt(value, 16) || 0
    } catch { return 0 }
    return 0
  }

  const dec = toDecimal()
  const conversions = [
    { label: 'Decimal', base: 10, value: isNaN(dec) ? '—' : dec.toString() },
    { label: 'Binary', base: 2, value: isNaN(dec) ? '—' : dec.toString(2) },
    { label: 'Hexadecimal', base: 16, value: isNaN(dec) ? '—' : dec.toString(16).toUpperCase() },
    { label: 'Octal', base: 8, value: isNaN(dec) ? '—' : dec.toString(8) },
    { label: 'ASCII', base: 0, value: dec >= 32 && dec <= 126 ? String.fromCharCode(dec) : '—' },
  ]

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// binconv.app — Number Base Converter</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {([10, 2, 16] as const).map(b => (
          <button key={b} onClick={() => { setValue(''); setBase(b) }}
            style={{ padding: '3px 12px', background: base === b ? '#00ff4620' : 'transparent', border: `1px solid ${base === b ? '#00ff46' : '#333'}`, borderRadius: 4, color: base === b ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {b === 10 ? 'Decimal' : b === 2 ? 'Binary' : 'Hex'}
          </button>
        ))}
      </div>
      <input value={value} onChange={e => setValue(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
        placeholder={base === 10 ? 'Enter decimal...' : base === 2 ? 'Enter binary (0/1)...' : 'Enter hex...'}
        style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid #222', borderRadius: 8, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 16, outline: 'none', marginBottom: 16 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {conversions.map(c => (
          <div key={c.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{c.label}</span>
            <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, wordBreak: 'break-all', maxWidth: '70%', textAlign: 'right' }}>{c.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 6 }}>Bit representation (8-bit)</p>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: 8 }, (_, i) => {
            const bit = (dec >> (7 - i)) & 1
            return <div key={i} style={{ flex: 1, height: 32, background: bit ? '#00ff46' : '#1a1a1a', border: `1px solid ${bit ? '#00ff46' : '#333'}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: bit ? '#000' : '#444', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>{bit}</div>
          })}
        </div>
      </div>
    </div>
  )
}

// ─── TRUTH TABLE ──────────────────────────────────────────────────────────────
export function TruthTableApp() {
  const [vars, setVars] = useState(2)
  const [expr, setExpr] = useState('A AND B')
  const [rows, setRows] = useState<{ inputs: Record<string, boolean>; output: boolean | null }[]>([])
  const [error, setError] = useState('')

  function evaluate(inputs: Record<string, boolean>, expression: string): boolean {
    let e = expression.toUpperCase()
    Object.entries(inputs).forEach(([k, v]) => { e = e.replace(new RegExp(`\\b${k}\\b`, 'g'), v ? 'true' : 'false') })
    e = e.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||').replace(/\bNOT\b/g, '!').replace(/\bXOR\b/g, '!==').replace(/\bNAND\b/g, '!&&').replace(/\bNOR\b/g, '!||')
    try { return !!Function(`'use strict'; return (${e})`)() } catch { throw new Error('Invalid expression') }
  }

  function generate() {
    const letters = ['A','B','C','D'].slice(0, vars)
    const total = Math.pow(2, vars)
    const newRows = []
    setError('')
    for (let i = 0; i < total; i++) {
      const inputs: Record<string, boolean> = {}
      letters.forEach((l, j) => { inputs[l] = !!((i >> (vars - 1 - j)) & 1) })
      try { newRows.push({ inputs, output: evaluate(inputs, expr) }) }
      catch (e: any) { setError(e.message); return }
    }
    setRows(newRows)
  }

  const letters = ['A','B','C','D'].slice(0, vars)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// truth.app — Truth Table Generator</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Variables:</span>
        {[2, 3, 4].map(n => (
          <button key={n} onClick={() => setVars(n)}
            style={{ padding: '2px 8px', background: vars === n ? '#00ff4620' : 'transparent', border: `1px solid ${vars === n ? '#00ff46' : '#333'}`, borderRadius: 4, color: vars === n ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {n}
          </button>
        ))}
        <input value={expr} onChange={e => setExpr(e.target.value)}
          style={{ flex: 1, padding: '5px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none', minWidth: 140 }} />
        <button onClick={generate} style={{ padding: '4px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Generate</button>
      </div>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 10 }}>Operators: AND OR NOT XOR NAND NOR</p>
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 8 }}>{error}</p>}
      {rows.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
            <thead>
              <tr>
                {letters.map(l => <th key={l} style={{ padding: '6px 12px', color: '#00c8ff', borderBottom: '1px solid #1e1e1e', textAlign: 'center' }}>{l}</th>)}
                <th style={{ padding: '6px 12px', color: '#ffd700', borderBottom: '1px solid #1e1e1e', textAlign: 'center' }}>Output</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: row.output ? '#00ff4608' : 'transparent' }}>
                  {letters.map(l => <td key={l} style={{ padding: '5px 12px', color: row.inputs[l] ? '#00ff46' : '#444', textAlign: 'center', borderBottom: '1px solid #0d0d0d' }}>{row.inputs[l] ? '1' : '0'}</td>)}
                  <td style={{ padding: '5px 12px', color: row.output ? '#ffd700' : '#ff5050', fontWeight: 700, textAlign: 'center', borderBottom: '1px solid #0d0d0d' }}>{row.output ? '1' : '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── EQUATION SOLVER ──────────────────────────────────────────────────────────
export function EqSolverApp() {
  const [mode, setMode] = useState<'quadratic' | 'linear'>('quadratic')
  const [a, setA] = useState('1'); const [b, setB] = useState('-3'); const [c, setC] = useState('2')
  const [a2, setA2] = useState('2'); const [b2, setB2] = useState('3')
  const [result, setResult] = useState<string[]>([])

  function solveQuadratic() {
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c)
    if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) { setResult(['A cannot be 0 for quadratic']); return }
    const disc = B * B - 4 * A * C
    if (disc > 0) {
      const x1 = (-B + Math.sqrt(disc)) / (2 * A)
      const x2 = (-B - Math.sqrt(disc)) / (2 * A)
      setResult([`Δ = ${disc.toFixed(4)} (two real roots)`, `x₁ = ${x1.toFixed(6)}`, `x₂ = ${x2.toFixed(6)}`])
    } else if (disc === 0) {
      setResult([`Δ = 0 (one repeated root)`, `x = ${(-B / (2 * A)).toFixed(6)}`])
    } else {
      const re = -B / (2 * A), im = Math.sqrt(-disc) / (2 * A)
      setResult([`Δ = ${disc.toFixed(4)} (complex roots)`, `x₁ = ${re.toFixed(4)} + ${im.toFixed(4)}i`, `x₂ = ${re.toFixed(4)} - ${im.toFixed(4)}i`])
    }
  }

  function solveLinear() {
    const A = parseFloat(a2), B = parseFloat(b2)
    if (isNaN(A) || isNaN(B) || A === 0) { setResult(['A cannot be 0']); return }
    setResult([`x = ${(-B / A).toFixed(6)}`])
  }

  const inp = { padding: '6px 8px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 13, outline: 'none', width: 70, textAlign: 'center' as const }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// eq.app — Equation Solver</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['quadratic', 'linear'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setResult([]) }}
            style={{ padding: '3px 14px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m}
          </button>
        ))}
      </div>
      {mode === 'quadratic' ? (
        <div>
          <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12, marginBottom: 12 }}>ax² + bx + c = 0</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input value={a} onChange={e => setA(e.target.value)} style={inp} /><span style={{ color: '#555', fontFamily: 'JetBrains Mono' }}>x² +</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input value={b} onChange={e => setB(e.target.value)} style={inp} /><span style={{ color: '#555', fontFamily: 'JetBrains Mono' }}>x +</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input value={c} onChange={e => setC(e.target.value)} style={inp} /><span style={{ color: '#555', fontFamily: 'JetBrains Mono' }}>= 0</span>
            </div>
            <button onClick={solveQuadratic} style={{ padding: '6px 16px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Solve</button>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 12, marginBottom: 12 }}>ax + b = 0</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <input value={a2} onChange={e => setA2(e.target.value)} style={inp} /><span style={{ color: '#555', fontFamily: 'JetBrains Mono' }}>x +</span>
            <input value={b2} onChange={e => setB2(e.target.value)} style={inp} /><span style={{ color: '#555', fontFamily: 'JetBrains Mono' }}>= 0</span>
            <button onClick={solveLinear} style={{ padding: '6px 16px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Solve</button>
          </div>
        </div>
      )}
      {result.map((r, i) => (
        <p key={i} style={{ color: i === 0 ? '#555' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: i === 0 ? 11 : 16, fontWeight: i > 0 ? 700 : 400, margin: '4px 0' }}>{r}</p>
      ))}
    </div>
  )
}

// ─── MANDELBROT ───────────────────────────────────────────────────────────────
export function MandelbrotApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState({ x: -0.5, y: 0 })
  const [maxIter, setMaxIter] = useState(80)
  const [rendering, setRendering] = useState(false)

  const render = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const W = canvas.width, H = canvas.height
    setRendering(true)
    const imageData = ctx.createImageData(W, H)
    const scale = 3 / (zoom * Math.min(W, H))
    for (let px = 0; px < W; px++) {
      for (let py = 0; py < H; py++) {
        const cx = center.x + (px - W / 2) * scale
        const cy = center.y + (py - H / 2) * scale
        let x = 0, y = 0, iter = 0
        while (x * x + y * y <= 4 && iter < maxIter) { const xt = x * x - y * y + cx; y = 2 * x * y + cy; x = xt; iter++ }
        const idx = (py * W + px) * 4
        if (iter === maxIter) { imageData.data[idx] = 0; imageData.data[idx+1] = 0; imageData.data[idx+2] = 0 }
        else {
          const t = iter / maxIter
          imageData.data[idx] = Math.floor(9 * (1-t) * t * t * t * 255)
          imageData.data[idx+1] = Math.floor(15 * (1-t) * (1-t) * t * t * 255)
          imageData.data[idx+2] = Math.floor(8.5 * (1-t) * (1-t) * (1-t) * t * 255)
        }
        imageData.data[idx+3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)
    setRendering(false)
  }, [zoom, center, maxIter])

  useEffect(() => { render() }, [render])

  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current; if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const W = canvas.width, H = canvas.height
    const scale = 3 / (zoom * Math.min(W, H))
    const cx = center.x + ((e.clientX - rect.left) * (W / rect.width) - W / 2) * scale
    const cy = center.y + ((e.clientY - rect.top) * (H / rect.height) - H / 2) * scale
    setCenter({ x: cx, y: cy }); setZoom(z => z * 2.5)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ color: '#c864ff', fontFamily: 'JetBrains Mono', fontSize: 12 }}>// mandelbrot.app</span>
        <button onClick={() => { setZoom(1); setCenter({ x: -0.5, y: 0 }) }} style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Reset</button>
        <button onClick={() => setZoom(z => z / 2)} style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Zoom Out</button>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Iter: {maxIter}</span>
        <input type="range" min={40} max={200} value={maxIter} onChange={e => setMaxIter(Number(e.target.value))} style={{ width: 80 }} />
        {rendering && <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Rendering...</span>}
        <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, marginLeft: 'auto' }}>Click to zoom in</span>
      </div>
      <canvas ref={canvasRef} width={640} height={380} style={{ flex: 1, width: '100%', cursor: 'crosshair' }} onClick={onClick} />
    </div>
  )
}

// ─── CELLULAR AUTOMATON ──────────────────────────────────────────────────────
export function CellAutApp() {
  const [rule, setRule] = useState(110)
  const [rows, setRows] = useState<number[][]>([])
  const [mode, setMode] = useState<'rule' | 'langton'>('rule')
  const COLS_C = 120, ROWS_C = 50, CELL_S = 10

  function generateRule() {
    const ruleBits = rule.toString(2).padStart(8, '0').split('').reverse().map(Number)
    const grid: number[][] = []
    let row = Array(COLS_C).fill(0)
    row[Math.floor(COLS_C / 2)] = 1
    grid.push([...row])
    for (let r = 1; r < ROWS_C; r++) {
      const next = Array(COLS_C).fill(0)
      for (let c = 0; c < COLS_C; c++) {
        const l = row[(c - 1 + COLS_C) % COLS_C], m = row[c], ri = row[(c + 1) % COLS_C]
        const idx = l * 4 + m * 2 + ri
        next[c] = ruleBits[idx]
      }
      row = next; grid.push([...row])
    }
    setRows(grid)
  }

  function generateLangton() {
    const size = 60
    const grid = Array.from({ length: size }, () => Array(size).fill(0))
    let r = size / 2, c = size / 2, dir = 0
    const dirs = [[-1,0],[0,1],[1,0],[0,-1]]
    const result: number[][] = []
    for (let step = 0; step < 5000; step++) {
      if (grid[r]?.[c] === undefined) break
      const cell = grid[r][c]
      dir = cell === 0 ? (dir + 1) % 4 : (dir + 3) % 4
      grid[r][c] = 1 - cell
      r += dirs[dir][0]; c += dirs[dir][1]
    }
    for (let i = 0; i < size; i++) result.push([...grid[i]])
    setRows(result)
  }

  useEffect(() => { generateRule() }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12 }}>// cell.app — Cellular Automaton</span>
        {(['rule', 'langton'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: '2px 10px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m === 'rule' ? '1D Rule' : "Langton's Ant"}
          </button>
        ))}
        {mode === 'rule' && (
          <>
            <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Rule: {rule}</span>
            <input type="range" min={0} max={255} value={rule} onChange={e => setRule(Number(e.target.value))} style={{ width: 100 }} />
            <button onClick={generateRule} style={{ padding: '2px 10px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Generate</button>
          </>
        )}
        {mode === 'langton' && (
          <button onClick={generateLangton} style={{ padding: '2px 10px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Run</button>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'flex', justifyContent: 'center' }}>
        <div>
          {rows.map((row, r) => (
            <div key={r} style={{ display: 'flex' }}>
              {row.map((cell, c) => (
                <div key={c} style={{ width: CELL_S, height: CELL_S, background: cell ? '#00ff46' : '#0a0a0a', boxSizing: 'border-box' }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── STATISTICS CALCULATOR ────────────────────────────────────────────────────
export function StatsCalcApp() {
  const [input, setInput] = useState('4, 8, 15, 16, 23, 42, 7, 3, 9, 12')
  const [stats, setStats] = useState<Record<string, string>>({})

  function calculate() {
    const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n))
    if (nums.length === 0) return
    const sorted = [...nums].sort((a, b) => a - b)
    const n = nums.length
    const mean = nums.reduce((a, b) => a + b, 0) / n
    const median = n % 2 === 0 ? (sorted[n/2-1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)]
    const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n
    const std = Math.sqrt(variance)
    const freq: Record<number, number> = {}
    nums.forEach(n => { freq[n] = (freq[n] || 0) + 1 })
    const maxFreq = Math.max(...Object.values(freq))
    const mode = Object.entries(freq).filter(([,v]) => v === maxFreq).map(([k]) => k).join(', ')
    setStats({
      Count: n.toString(),
      Sum: nums.reduce((a, b) => a + b, 0).toFixed(4),
      Mean: mean.toFixed(4),
      Median: median.toFixed(4),
      Mode: mode,
      'Std Dev': std.toFixed(4),
      Variance: variance.toFixed(4),
      Min: sorted[0].toString(),
      Max: sorted[n-1].toString(),
      Range: (sorted[n-1] - sorted[0]).toString(),
      Q1: sorted[Math.floor(n/4)].toString(),
      Q3: sorted[Math.floor(3*n/4)].toString(),
    })
  }

  const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n))
  const max = Math.max(...nums) || 1

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// stats.app — Statistics Calculator</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={3}
        placeholder="Enter numbers separated by commas or spaces..."
        style={{ width: '100%', padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, resize: 'vertical', outline: 'none', marginBottom: 8 }} />
      <button onClick={calculate} style={{ padding: '6px 16px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer', marginBottom: 12 }}>Calculate</button>
      {nums.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <p className="app-label yellow" style={{ marginBottom: 6 }}>// histogram</p>
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 60, background: '#111', borderRadius: 6, padding: 8 }}>
            {nums.map((n, i) => (
              <div key={i} style={{ flex: 1, height: `${(n / max) * 44}px`, background: '#00c8ff', borderRadius: '2px 2px 0 0', minWidth: 4 }} />
            ))}
          </div>
        </div>
      )}
      {Object.keys(stats).length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '6px 10px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{k}</span>
              <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FIBONACCI / PRIME VISUALIZER ─────────────────────────────────────────────
export function FibPrimeApp() {
  const [mode, setMode] = useState<'fib' | 'prime'>('fib')
  const [count, setCount] = useState(20)
  const [numbers, setNumbers] = useState<number[]>([])

  function generateFib() {
    const fibs = [0, 1]
    for (let i = 2; i < count; i++) fibs.push(fibs[i-1] + fibs[i-2])
    setNumbers(fibs.slice(0, count))
  }

  function generatePrimes() {
    const primes: number[] = []
    let n = 2
    while (primes.length < count) {
      if (primes.every(p => n % p !== 0)) primes.push(n)
      n++
    }
    setNumbers(primes)
  }

  useEffect(() => { mode === 'fib' ? generateFib() : generatePrimes() }, [mode, count])

  const max = Math.max(...numbers, 1)

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// fib.app — Fibonacci & Prime Visualizer</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        {(['fib', 'prime'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: '3px 12px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m === 'fib' ? 'Fibonacci' : 'Primes'}
          </button>
        ))}
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Count: {count}</span>
        <input type="range" min={5} max={40} value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: 100 }} />
      </div>
      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 140, background: '#111', borderRadius: 8, padding: '8px', marginBottom: 12, overflow: 'hidden' }}>
        {numbers.map((n, i) => (
          <div key={i} style={{ flex: 1, height: `${Math.max(4, (Math.log(n + 1) / Math.log(max + 1)) * 120)}px`, background: mode === 'fib' ? '#ffd700' : '#c864ff', borderRadius: '2px 2px 0 0', minWidth: 4, boxShadow: `0 0 4px ${mode === 'fib' ? '#ffd70060' : '#c864ff60'}` }} title={`${n}`} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {numbers.map((n, i) => (
          <span key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 4, padding: '3px 6px', color: mode === 'fib' ? '#ffd700' : '#c864ff', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{n}</span>
        ))}
      </div>
    </div>
  )
}

// ─── LOGIC GATE SIMULATOR ────────────────────────────────────────────────────
export function LogicGateApp() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  const gates = [
    { name: 'AND',  result: a && b,         symbol: '&',  desc: 'True only when both inputs are 1' },
    { name: 'OR',   result: a || b,         symbol: '≥1', desc: 'True when at least one input is 1' },
    { name: 'NOT A',result: !a,             symbol: '1',  desc: 'Inverts input A' },
    { name: 'NOT B',result: !b,             symbol: '1',  desc: 'Inverts input B' },
    { name: 'NAND', result: !(a && b),      symbol: '&⊕', desc: 'Opposite of AND' },
    { name: 'NOR',  result: !(a || b),      symbol: '≥1⊕',desc: 'Opposite of OR' },
    { name: 'XOR',  result: a !== b,        symbol: '=1', desc: 'True when inputs differ' },
    { name: 'XNOR', result: a === b,        symbol: '=1⊕',desc: 'True when inputs are equal' },
    { name: 'IMPLY',result: !a || b,        symbol: '→',  desc: 'A implies B' },
    { name: 'BUFFER',result: a,             symbol: '1',  desc: 'Passes input A through unchanged' },
  ]

  function Toggle({ label, val, onChange }: { label: string; val: boolean; onChange: (v: boolean) => void }) {
    return (
      <button onClick={() => onChange(!val)}
        style={{ padding: '10px 20px', background: val ? '#00ff4620' : '#1a1a1a', border: `2px solid ${val ? '#00ff46' : '#333'}`, borderRadius: 8, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
        <span style={{ color: val ? '#00ff46' : '#555', fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700 }}>{val ? '1' : '0'}</span>
        <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{label}</span>
      </button>
    )
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// logic.app — Logic Gate Simulator</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
        <Toggle label="Input A" val={a} onChange={setA} />
        <Toggle label="Input B" val={b} onChange={setB} />
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Click to toggle</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {gates.map(g => (
          <div key={g.name} style={{ background: '#111', border: `1px solid ${g.result ? '#00ff4640' : '#1e1e1e'}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: g.result ? '#00ff4620' : '#0d0d0d', border: `2px solid ${g.result ? '#00ff46' : '#333'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: g.result ? '#00ff46' : '#444', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {g.result ? '1' : '0'}
            </div>
            <div>
              <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 2px' }}>{g.name}</p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>{g.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}