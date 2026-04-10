import { useEffect, useRef, useState, useCallback } from 'react'

// ─── PAINT ────────────────────────────────────────────────────────────────────
export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const [color, setColor] = useState('#00ff46')
  const [size, setSize] = useState(4)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'fill'>('pen')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  function getPos(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onDown(e: React.MouseEvent<HTMLCanvasElement>) {
    drawing.current = true
    const pos = getPos(e)
    lastPos.current = pos
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    if (tool === 'fill') {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  function onMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing.current || tool === 'fill') return
    const ctx = canvasRef.current!.getContext('2d')!
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#111' : color
    ctx.lineWidth = tool === 'eraser' ? size * 3 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  function clear() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function download() {
    const canvas = canvasRef.current!
    const a = document.createElement('a')
    a.download = 'slashdot-paint.png'
    a.href = canvas.toDataURL()
    a.click()
  }

  const COLORS = ['#00ff46','#00c8ff','#ffd700','#ff5050','#c864ff','#ff8800','#ffffff','#888888','#ff69b4','#00ffff','#ff4500','#7cfc00']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {(['pen', 'eraser', 'fill'] as const).map(t => (
          <button key={t} onClick={() => setTool(t)}
            style={{ padding: '2px 10px', background: tool === t ? '#00ff4620' : 'transparent', border: `1px solid ${tool === t ? '#00ff46' : '#333'}`, borderRadius: 4, color: tool === t ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {t === 'pen' ? '✏ Pen' : t === 'eraser' ? '⬜ Eraser' : '🪣 Fill'}
          </button>
        ))}
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {COLORS.map(c => <button key={c} onClick={() => { setColor(c); setTool('pen') }} style={{ width: 18, height: 18, borderRadius: 3, background: c, border: `2px solid ${color === c ? '#fff' : 'transparent'}`, cursor: 'pointer' }} />)}
        </div>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Size: {size}</span>
        <input type="range" min={1} max={20} value={size} onChange={e => setSize(Number(e.target.value))} style={{ width: 70 }} />
        <button onClick={clear} style={{ padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Clear</button>
        <button onClick={download} style={{ padding: '2px 8px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>💾 Save</button>
      </div>
      <canvas ref={canvasRef} width={680} height={400}
        style={{ flex: 1, width: '100%', cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={() => { drawing.current = false }}
        onMouseLeave={() => { drawing.current = false }} />
    </div>
  )
}

// ─── ASCII ART GENERATOR ──────────────────────────────────────────────────────
const ASCII_CHARS = ['@','#','S','%','?','*','+',';',':',',','.',' ']
const FIGLET_FONTS: Record<string, Record<string, string[]>> = {
  block: {
    A:['  ██  ','  ██  ','██████','██  ██','██  ██'],
    B:['█████ ','██  ██','█████ ','██  ██','█████ '],
    C:[' █████','██    ','██    ','██    ',' █████'],
    D:['████  ','██  ██','██  ██','██  ██','████  '],
    E:['██████','██    ','████  ','██    ','██████'],
    F:['██████','██    ','████  ','██    ','██    '],
    G:[' █████','██    ','██  ██','██  ██',' █████'],
    H:['██  ██','██  ██','██████','██  ██','██  ██'],
    I:['██████','  ██  ','  ██  ','  ██  ','██████'],
    J:['██████','   ██ ','   ██ ','██ ██ ',' ███  '],
    K:['██  ██','██ ██ ','████  ','██ ██ ','██  ██'],
    L:['██    ','██    ','██    ','██    ','██████'],
    M:['██  ██','██████','██████','██  ██','██  ██'],
    N:['██  ██','███ ██','██████','██ ███','██  ██'],
    O:[' ████ ','██  ██','██  ██','██  ██',' ████ '],
    P:['█████ ','██  ██','█████ ','██    ','██    '],
    Q:[' ████ ','██  ██','██  ██','██ ███',' ████▌'],
    R:['█████ ','██  ██','█████ ','██ ██ ','██  ██'],
    S:[' █████','██    ','  ███ ','    ██','█████ '],
    T:['██████','  ██  ','  ██  ','  ██  ','  ██  '],
    U:['██  ██','██  ██','██  ██','██  ██',' ████ '],
    V:['██  ██','██  ██','██  ██',' ████ ','  ██  '],
    W:['██  ██','██  ██','██████','██████','██  ██'],
    X:['██  ██',' ████ ','  ██  ',' ████ ','██  ██'],
    Y:['██  ██',' ████ ','  ██  ','  ██  ','  ██  '],
    Z:['██████','   ██ ','  ██  ',' ██   ','██████'],
    ' ':['      ','      ','      ','      ','      '],
    '!':['  ██  ','  ██  ','  ██  ','      ','  ██  '],
    '?':['██████','    ██','  ███ ','      ','  ██  '],
    '.':['      ','      ','      ','      ','  ██  '],
  },
}

export function ASCIIArtApp() {
  const [text, setText] = useState('SLASH')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function generate() {
    const chars = text.toUpperCase().split('')
    const font = FIGLET_FONTS.block
    const rows = 5
    const lines = Array.from({ length: rows }, (_, row) =>
      chars.map(ch => (font[ch] ?? font[' '])[row] ?? '      ').join(' ')
    )
    setOutput(lines.join('\n'))
    setCopied(false)
  }

  useEffect(() => { generate() }, [])

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// ascii.app — ASCII Art Generator</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={text} onChange={e => setText(e.target.value.slice(0, 12))} maxLength={12}
          placeholder="Enter text (max 12 chars)..."
          style={{ flex: 1, padding: '6px 10px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, outline: 'none' }} />
        <button onClick={generate} style={{ padding: '6px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Generate</button>
      </div>
      {['SLASH','DOT','IISER','CODE','HACK'].map(preset => (
        <button key={preset} onClick={() => { setText(preset); setTimeout(generate, 10) }}
          style={{ margin: '0 4px 8px 0', padding: '2px 8px', background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
          {preset}
        </button>
      ))}
      {output && (
        <>
          <pre style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '16px', color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.4, overflowX: 'auto', marginBottom: 10, textShadow: '0 0 8px #00ff4640' }}>
            {output}
          </pre>
          <button onClick={() => { navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            style={{ padding: '5px 14px', background: copied ? '#00ff4620' : 'transparent', border: `1px solid ${copied ? '#00ff46' : '#333'}`, borderRadius: 6, color: copied ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </>
      )}
    </div>
  )
}
