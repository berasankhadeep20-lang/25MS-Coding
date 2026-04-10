import { useState, useRef, useEffect, useCallback } from 'react'
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