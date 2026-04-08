import { useState, useRef, useEffect, useCallback } from 'react'

// ─── JSON FORMATTER ──────────────────────────────────────────────────────────
export function JSONFormatterApp() {
  const [input, setInput] = useState('{"name":"SlashDot","batch":"25MS","iiser":"Kolkata","awesome":true}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  function format() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  const inputStyle = {
    width: '100%', padding: '8px 10px', background: '#111',
    border: '1px solid #222', borderRadius: 6,
    color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11,
    resize: 'vertical' as const, outline: 'none',
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// json.app — JSON Formatter & Validator</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        <button onClick={format} style={{ padding: '5px 14px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Format</button>
        <button onClick={minify} style={{ padding: '5px 14px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>Minify</button>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Indent:</span>
        <input type="number" min={1} max={8} value={indent} onChange={e => setIndent(Number(e.target.value))} style={{ width: 40, padding: '4px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        {error && <span style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10 }}>✕ Invalid JSON</span>}
        {!error && output && <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10 }}>✓ Valid JSON</span>}
      </div>
      <div style={{ display: 'flex', gap: 10, height: 320 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Input</span>
          <textarea value={input} onChange={e => setInput(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Output</span>
          {error
            ? <div style={{ ...inputStyle, flex: 1, color: '#ff5050', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{error}</div>
            : <textarea value={output} readOnly style={{ ...inputStyle, flex: 1, color: '#00ff46' }} />
          }
        </div>
      </div>
    </div>
  )
}

// ─── BASE64 ──────────────────────────────────────────────────────────────────
export function Base64App() {
  const [input, setInput] = useState('Hello, SlashDot!')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  function process() {
    try {
      if (mode === 'encode') { setOutput(btoa(unescape(encodeURIComponent(input)))); setError('') }
      else { setOutput(decodeURIComponent(escape(atob(input)))); setError('') }
    } catch { setError(mode === 'decode' ? 'Invalid Base64 string' : 'Encoding error') }
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// base64.app — Base64 Encoder/Decoder</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(''); setError('') }}
            style={{ padding: '4px 14px', background: mode === m ? '#00ff4620' : 'transparent', border: `1px solid ${mode === m ? '#00ff46' : '#333'}`, borderRadius: 4, color: mode === m ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={5}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
        style={{ width: '100%', padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, resize: 'vertical', outline: 'none', marginBottom: 8 }} />
      <button onClick={process} style={{ padding: '6px 20px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer', marginBottom: 10 }}>
        {mode === 'encode' ? 'Encode →' : '← Decode'}
      </button>
      {error && <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 8 }}>{error}</p>}
      {output && (
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px', wordBreak: 'break-all', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#00ff46', lineHeight: 1.6 }}>
          {output}
        </div>
      )}
    </div>
  )
}

// ─── MARKDOWN PREVIEWER ──────────────────────────────────────────────────────
export function MarkdownApp() {
  const [md, setMd] = useState(`# SlashDot OS

**The** official website of SlashDot Club, IISER Kolkata.

## Features
- Terminal emulator
- 30+ apps
- Easter eggs

## Code
\`\`\`
sudo party
\`\`\`

> Built by the 25MS batch`)

  function renderMd(text: string): string {
    return text
      .replace(/^# (.+)$/gm, '<h1 style="color:#00ff46;font-size:20px;margin:8px 0">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 style="color:#00c8ff;font-size:16px;margin:8px 0">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 style="color:#ffd700;font-size:14px;margin:6px 0">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em style="color:#aaa">$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:#1a1a1a;color:#00ff46;padding:1px 4px;border-radius:3px">$1</code>')
      .replace(/```[\s\S]*?```/g, m => `<pre style="background:#111;padding:8px;border-radius:6px;border:1px solid #222;color:#d0d0d0;overflow-x:auto">${m.replace(/```\w*\n?/g, '')}</pre>`)
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #ffd700;padding-left:10px;color:#888;margin:4px 0">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li style="color:#d0d0d0;margin:2px 0;list-style:disc;margin-left:16px">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li style="color:#d0d0d0;margin:2px 0;list-style:decimal;margin-left:16px">$2</li>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#00c8ff" target="_blank">$1</a>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div style={{ display: 'flex', height: '100%', background: '#0a0a0a' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e1e1e' }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#555' }}>Markdown</div>
        <textarea value={md} onChange={e => setMd(e.target.value)}
          style={{ flex: 1, background: '#0a0a0a', border: 'none', outline: 'none', color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, padding: '12px', resize: 'none', lineHeight: 1.7 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#555' }}>Preview</div>
        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.7, color: '#d0d0d0' }}
          dangerouslySetInnerHTML={{ __html: renderMd(md) }} />
      </div>
    </div>
  )
}

// ─── COLOR PICKER ─────────────────────────────────────────────────────────────
export function ColorPickerApp() {
  const [hex, setHex] = useState('#00ff46')
  const [copied, setCopied] = useState('')

  function hexToRgb(h: string) {
    const r = parseInt(h.slice(1, 3), 16)
    const g = parseInt(h.slice(3, 5), 16)
    const b = parseInt(h.slice(5, 7), 16)
    return { r, g, b }
  }

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
      else if (max === g) h = (b - r) / d + 2
      else h = (r - g) / d + 4
      h /= 6
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  const rgb = hexToRgb(hex.length === 7 ? hex : '#00ff46')
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  const PALETTE = ['#00ff46','#00c8ff','#ffd700','#ff5050','#c864ff','#ff8800','#ffffff','#888888','#111111','#e91e63','#2196f3','#4caf50']

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// color.app — Color Picker</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
        <input type="color" value={hex} onChange={e => setHex(e.target.value)}
          style={{ width: 80, height: 80, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent' }} />
        <div style={{ flex: 1 }}>
          {[
            { label: 'HEX', value: hex.toUpperCase() },
            { label: 'RGB', value: rgbStr },
            { label: 'HSL', value: hslStr },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, width: 30 }}>{item.label}</span>
              <span style={{ flex: 1, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, background: '#111', padding: '4px 8px', borderRadius: 4, border: '1px solid #222' }}>{item.value}</span>
              <button onClick={() => copy(item.value, item.label)}
                style={{ padding: '3px 8px', background: copied === item.label ? '#00ff4620' : 'transparent', border: `1px solid ${copied === item.label ? '#00ff46' : '#333'}`, borderRadius: 4, color: copied === item.label ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
                {copied === item.label ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: '100%', height: 60, borderRadius: 8, background: hex, marginBottom: 12, boxShadow: `0 0 20px ${hex}60` }} />
      <p className="app-label yellow">// palette</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PALETTE.map(c => (
          <button key={c} onClick={() => setHex(c)}
            style={{ width: 32, height: 32, borderRadius: 6, background: c, border: `2px solid ${hex === c ? '#fff' : 'transparent'}`, cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  )
}

// ─── PASSWORD GENERATOR ───────────────────────────────────────────────────────
export function PasswordGenApp() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  function generate() {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums)  chars += '0123456789'
    if (syms)  chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) return
    const arr = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    const pw = arr.map(v => chars[v % chars.length]).join('')
    setPassword(pw)
    setHistory(h => [pw, ...h.slice(0, 4)])
    setCopied(false)
  }

  function strength(): { label: string; color: string; width: number } {
    if (!password) return { label: 'None', color: '#333', width: 0 }
    let score = 0
    if (password.length >= 12) score++
    if (password.length >= 20) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    if (score <= 2) return { label: 'Weak', color: '#ff5050', width: 25 }
    if (score <= 4) return { label: 'Fair', color: '#ffd700', width: 60 }
    return { label: 'Strong', color: '#00ff46', width: 100 }
  }

  const s = strength()

  function Toggle({ val, onChange, label }: { val: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <button onClick={() => onChange(!val)}
          style={{ width: 36, height: 18, borderRadius: 9, background: val ? '#00ff4630' : '#1a1a1a', border: `1px solid ${val ? '#00ff46' : '#333'}`, cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: val ? '#00ff46' : '#444', position: 'absolute', top: 2, left: val ? 20 : 2, transition: 'left 0.15s' }} />
        </button>
        <span style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{label}</span>
      </div>
    )
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// passgen.app — Password Generator</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Length: {length}</span>
            <input type="range" min={8} max={64} value={length} onChange={e => setLength(Number(e.target.value))} style={{ width: '100%', marginTop: 4 }} />
          </div>
          <Toggle val={upper} onChange={setUpper} label="Uppercase (A-Z)" />
          <Toggle val={lower} onChange={setLower} label="Lowercase (a-z)" />
          <Toggle val={nums}  onChange={setNums}  label="Numbers (0-9)" />
          <Toggle val={syms}  onChange={setSyms}  label="Symbols (!@#...)" />
          <button onClick={generate} style={{ width: '100%', padding: '8px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer', marginTop: 8 }}>
            Generate Password
          </button>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          {password && (
            <>
              <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px', marginBottom: 10, wordBreak: 'break-all', fontFamily: 'JetBrains Mono', fontSize: 13, color: '#ffd700', lineHeight: 1.6 }}>
                {password}
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Strength</span>
                  <span style={{ color: s.color, fontFamily: 'JetBrains Mono', fontSize: 10 }}>{s.label}</span>
                </div>
                <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.width}%`, background: s.color, borderRadius: 2, transition: 'width 0.3s' }} />
                </div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(password).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
                style={{ width: '100%', padding: '6px', background: copied ? '#00ff4620' : 'transparent', border: `1px solid ${copied ? '#00ff46' : '#333'}`, borderRadius: 6, color: copied ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </>
          )}
          {history.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <p className="app-label yellow" style={{ marginBottom: 6 }}>// recent</p>
              {history.map((h, i) => (
                <p key={i} style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── DIFF VIEWER ─────────────────────────────────────────────────────────────
export function DiffViewerApp() {
  const [left, setLeft] = useState('Hello World\nThis is line 2\nThis line stays\nOld line here\nFoo bar baz')
  const [right, setRight] = useState('Hello SlashDot\nThis is line 2\nThis line stays\nNew line here\nFoo bar baz\nExtra line added')

  const leftLines = left.split('\n')
  const rightLines = right.split('\n')
  const maxLen = Math.max(leftLines.length, rightLines.length)

  const taStyle = {
    flex: 1, padding: '8px', background: '#0a0a0a', border: 'none',
    outline: 'none', color: '#d0d0d0', fontFamily: 'JetBrains Mono',
    fontSize: 11, resize: 'none' as const, lineHeight: 1.6,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#00c8ff' }}>// diff.app — Diff Viewer</div>
      <div style={{ display: 'flex', flex: '0 0 160px', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e1e1e' }}>
          <div style={{ padding: '4px 8px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#ff5050' }}>Original</div>
          <textarea value={left} onChange={e => setLeft(e.target.value)} style={taStyle} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '4px 8px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#00ff46' }}>Modified</div>
          <textarea value={right} onChange={e => setRight(e.target.value)} style={taStyle} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
        <div style={{ padding: '4px 8px', borderBottom: '1px solid #111', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#555' }}>Diff Result</div>
        {Array.from({ length: maxLen }, (_, i) => {
          const l = leftLines[i] ?? ''
          const r = rightLines[i] ?? ''
          const same = l === r
          const onlyLeft = l && !r
          const onlyRight = !l && r
          return (
            <div key={i} style={{ display: 'flex', borderBottom: '1px solid #0d0d0d' }}>
              <div style={{ flex: 1, padding: '2px 8px', background: same ? 'transparent' : onlyLeft ? '#ff505015' : '#ff505010', color: same ? '#444' : '#ff5050', whiteSpace: 'pre' }}>
                {same ? '' : '- '}{l}
              </div>
              <div style={{ width: 1, background: '#1e1e1e' }} />
              <div style={{ flex: 1, padding: '2px 8px', background: same ? 'transparent' : onlyRight ? '#00ff4615' : '#00ff4610', color: same ? '#444' : '#00ff46', whiteSpace: 'pre' }}>
                {same ? '' : '+ '}{r}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── CODE RUNNER ─────────────────────────────────────────────────────────────
const CODE_SAMPLES: Record<string, string> = {
  python: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

fibonacci(10)`,
  javascript: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left  = arr.filter(x => x < pivot);
  const mid   = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...mid, ...quickSort(right)];
}

console.log(quickSort([3, 6, 8, 10, 1, 2, 1]));`,
  c: `#include <stdio.h>

int main() {
    printf("Hello from SlashDot OS!\\n");
    for (int i = 1; i <= 5; i++) {
        printf("Line %d\\n", i);
    }
    return 0;
}`,
}

const FAKE_OUTPUTS: Record<string, string[]> = {
  python: ['0 1 1 2 3 5 8 13 21 34 ', '\nProcess finished with exit code 0'],
  javascript: ['[1, 1, 2, 3, 6, 8, 10]', '\nProcess finished with exit code 0'],
  c: ['Hello from SlashDot OS!', 'Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5', '\nProcess finished with exit code 0'],
}

export function CodeRunnerApp() {
  const [lang, setLang] = useState<'python' | 'javascript' | 'c'>('python')
  const [code, setCode] = useState(CODE_SAMPLES.python)
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  function run() {
    setRunning(true)
    setOutput(['$ Running...'])
    let i = 0
    const lines = FAKE_OUTPUTS[lang]
    const interval = setInterval(() => {
      if (i >= lines.length) { clearInterval(interval); setRunning(false); return }
      setOutput(prev => [...prev, lines[i]])
      i++
    }, 300)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 12 }}>// code.app</span>
        {(['python', 'javascript', 'c'] as const).map(l => (
          <button key={l} onClick={() => { setLang(l); setCode(CODE_SAMPLES[l]); setOutput([]) }}
            style={{ padding: '2px 10px', background: lang === l ? '#00c8ff20' : 'transparent', border: `1px solid ${lang === l ? '#00c8ff' : '#333'}`, borderRadius: 4, color: lang === l ? '#00c8ff' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {l}
          </button>
        ))}
        <button onClick={run} disabled={running}
          style={{ marginLeft: 'auto', padding: '4px 16px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: running ? 'wait' : 'pointer' }}>
          {running ? '⏳ Running...' : '▶ Run'}
        </button>
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
        <textarea value={code} onChange={e => setCode(e.target.value)}
          style={{ flex: 1, background: '#0d0d0d', border: 'none', outline: 'none', color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12, padding: '12px', resize: 'none', lineHeight: 1.7 }} />
      </div>
      <div style={{ flex: 1, background: '#050505', borderTop: '1px solid #1e1e1e', padding: '8px 12px', overflowY: 'auto' }}>
        <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 6 }}>Output</p>
        {output.map((line, i) => (
          <p key={i} style={{ color: i === 0 ? '#ffd700' : '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, margin: '1px 0', lineHeight: 1.5 }}>{line}</p>
        ))}
        {!running && output.length === 0 && <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Press Run to execute</p>}
      </div>
    </div>
  )
}

// ─── LOREM IPSUM ─────────────────────────────────────────────────────────────
const LOREM_WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum']

const IISER_WORDS = ['slashdot','iiser','kolkata','terminal','deadline','cgpa','coffee','debugging','compiler','recursion','algorithm','bandwidth','dependency','hackathon','repository','bandwidth','segfault','malloc','pointer','regex','syntax','kernel','daemon','filesystem','protocol','latency','throughput']

export function LoremApp() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [flavor, setFlavor] = useState<'classic' | 'iiser'>('classic')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function generate() {
    const words = flavor === 'iiser' ? [...LOREM_WORDS, ...IISER_WORDS] : LOREM_WORDS
    const rw = () => words[Math.floor(Math.random() * words.length)]
    const sentence = () => {
      const len = Math.floor(Math.random() * 10) + 6
      const ws = Array.from({ length: len }, rw)
      ws[0] = ws[0].charAt(0).toUpperCase() + ws[0].slice(1)
      return ws.join(' ') + '.'
    }
    const paragraph = () => Array.from({ length: Math.floor(Math.random() * 4) + 3 }, sentence).join(' ')

    let result = ''
    if (type === 'words') result = Array.from({ length: count }, rw).join(' ')
    else if (type === 'sentences') result = Array.from({ length: count }, sentence).join(' ')
    else result = Array.from({ length: count }, paragraph).join('\n\n')
    setOutput(result)
    setCopied(false)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// lorem.app — Lorem Ipsum Generator</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="number" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))}
          style={{ width: 50, padding: '5px', background: '#111', border: '1px solid #222', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, outline: 'none' }} />
        {(['paragraphs', 'sentences', 'words'] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            style={{ padding: '3px 10px', background: type === t ? '#00ff4620' : 'transparent', border: `1px solid ${type === t ? '#00ff46' : '#333'}`, borderRadius: 4, color: type === t ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {t}
          </button>
        ))}
        {(['classic', 'iiser'] as const).map(f => (
          <button key={f} onClick={() => setFlavor(f)}
            style={{ padding: '3px 10px', background: flavor === f ? '#ffd70020' : 'transparent', border: `1px solid ${flavor === f ? '#ffd700' : '#333'}`, borderRadius: 4, color: flavor === f ? '#ffd700' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
        <button onClick={generate} style={{ padding: '5px 16px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>Generate</button>
      </div>
      {output && (
        <>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '12px', marginBottom: 10, maxHeight: 280, overflowY: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#aaa', lineHeight: 1.8 }}>
            {output}
          </div>
          <button onClick={() => { navigator.clipboard.writeText(output).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            style={{ padding: '6px 16px', background: copied ? '#00ff4620' : 'transparent', border: `1px solid ${copied ? '#00ff46' : '#333'}`, borderRadius: 6, color: copied ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </>
      )}
    </div>
  )
}

// ─── HASH GENERATOR ───────────────────────────────────────────────────────────
function fakeHash(input: string, len: number): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0
  const hex = Math.abs(hash).toString(16)
  let result = ''
  while (result.length < len) result += hex.split('').reverse().join('') + hex
  return result.slice(0, len)
}

export function HashGenApp() {
  const [input, setInput] = useState('SlashDot IISER Kolkata')
  const [copied, setCopied] = useState('')

  const hashes = [
    { algo: 'MD5',    hash: fakeHash(input + 'md5', 32)  },
    { algo: 'SHA-1',  hash: fakeHash(input + 'sha1', 40) },
    { algo: 'SHA-256',hash: fakeHash(input + 'sha256', 64) },
    { algo: 'SHA-512',hash: fakeHash(input + 'sha512', 128) },
  ]

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(label)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// hash.app — Hash Generator</p>
      <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 8 }}>⚠ For demonstration only — hashes are pseudo-random, not cryptographic</p>
      <textarea value={input} onChange={e => setInput(e.target.value)} rows={3}
        placeholder="Enter text to hash..."
        style={{ width: '100%', padding: '8px', background: '#111', border: '1px solid #222', borderRadius: 6, color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, resize: 'vertical', outline: 'none', marginBottom: 12 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {hashes.map(h => (
          <div key={h.algo} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>{h.algo}</span>
              <button onClick={() => copy(h.hash, h.algo)}
                style={{ padding: '2px 8px', background: copied === h.algo ? '#00ff4620' : 'transparent', border: `1px solid ${copied === h.algo ? '#00ff46' : '#333'}`, borderRadius: 4, color: copied === h.algo ? '#00ff46' : '#666', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
                {copied === h.algo ? '✓' : 'Copy'}
              </button>
            </div>
            <p style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 10, wordBreak: 'break-all', margin: 0, lineHeight: 1.5 }}>{h.hash}</p>
          </div>
        ))}
      </div>
    </div>
  )
}