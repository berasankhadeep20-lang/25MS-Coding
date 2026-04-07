import { useState } from 'react'

interface Setting {
  key: string
  label: string
  description: string
  type: 'toggle' | 'select' | 'slider' | 'action'
  value?: boolean | string | number
  options?: string[]
  min?: number
  max?: number
  action?: () => void
  actionLabel?: string
}

export function SettingsApp() {
  const [theme, setTheme] = useState('green')
  const [crt, setCrt] = useState(true)
  const [sounds, setSounds] = useState(true)
  const [particles, setParticles] = useState(true)
  const [fontSize, setFontSize] = useState(13)
  const [cursor, setCursor] = useState('block')
  const [wallpaper, setWallpaper] = useState('dark')
  const [saved, setSaved] = useState(false)

  function applyTheme(t: string) {
    setTheme(t)
    window.dispatchEvent(new CustomEvent('slashdot-theme', { detail: { name: t } }))
  }

  function applyCRT(val: boolean) {
    setCrt(val)
    const el = document.querySelector('.scanlines') as HTMLElement | null
    if (el) el.style.opacity = val ? '1' : '0'
  }

  function applyFontSize(size: number) {
    setFontSize(size)
    window.dispatchEvent(new CustomEvent('slashdot-font', { detail: { delta: 0, absolute: size } }))
  }

  function applyCursor(style: string) {
    setCursor(style)
    window.dispatchEvent(new CustomEvent('slashdot-cursor', { detail: { style } }))
  }

  function applyWallpaper(w: string) {
    setWallpaper(w)
    const el = document.querySelector('.desktop') as HTMLElement | null
    if (el) el.style.backgroundColor = ({
      dark: '#050505', green: '#001a00', blue: '#000d1a',
      purple: '#0d0014', red: '#1a0000', amber: '#1a0f00',
    })[w] ?? '#050505'
  }

  function saveSettings() {
    try {
      const raw = localStorage.getItem('slashdot-os-memory')
      const mem = raw ? JSON.parse(raw) : {}
      localStorage.setItem('slashdot-os-memory', JSON.stringify({ ...mem, theme, fontSize, cursor, wallpaper }))
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    window.dispatchEvent(new CustomEvent('slashdot-notify', { detail: { message: 'Settings saved!', type: 'success' } }))
  }

  function resetSettings() {
    applyTheme('green')
    applyCRT(true)
    applyFontSize(13)
    applyCursor('block')
    applyWallpaper('dark')
    setSounds(true)
    setParticles(true)
  }

  const sectionStyle = {
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: 8,
    padding: '14px 16px',
    marginBottom: 12,
  }

  const labelStyle = {
    color: '#d0d0d0',
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    fontWeight: 700,
  }

  const descStyle = {
    color: '#555',
    fontFamily: 'JetBrains Mono',
    fontSize: 10,
    marginTop: 2,
  }

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #1a1a1a',
  }

  function Toggle({ val, onChange }: { val: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        onClick={() => onChange(!val)}
        style={{
          width: 44, height: 22, borderRadius: 11,
          background: val ? '#00ff4630' : '#1a1a1a',
          border: `1px solid ${val ? '#00ff46' : '#333'}`,
          cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
        }}
      >
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: val ? '#00ff46' : '#444',
          position: 'absolute', top: 2,
          left: val ? 24 : 2, transition: 'all 0.15s',
        }} />
      </button>
    )
  }

  return (
    <div className="app-body" style={{ padding: '12px 16px' }}>
      <p className="app-label cyan">// settings.app — System Settings</p>

      {/* Appearance */}
      <div style={sectionStyle}>
        <p style={{ ...labelStyle, marginBottom: 8, color: '#ffd700' }}>🎨 Appearance</p>

        <div style={rowStyle}>
          <div><p style={labelStyle}>Theme</p><p style={descStyle}>Terminal accent color</p></div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['green', 'amber', 'blue', 'red', 'purple'].map(t => (
              <button key={t} onClick={() => applyTheme(t)}
                style={{
                  width: 20, height: 20, borderRadius: '50%', cursor: 'pointer', border: `2px solid ${theme === t ? '#fff' : 'transparent'}`,
                  background: ({ green: '#00ff46', amber: '#ffb000', blue: '#00c8ff', red: '#ff5050', purple: '#c864ff' })[t],
                }} />
            ))}
          </div>
        </div>

        <div style={rowStyle}>
          <div><p style={labelStyle}>Wallpaper</p><p style={descStyle}>Desktop background color</p></div>
          <select value={wallpaper} onChange={e => applyWallpaper(e.target.value)}
            style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, padding: '3px 8px', cursor: 'pointer' }}>
            {['dark', 'green', 'blue', 'purple', 'red', 'amber'].map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        <div style={rowStyle}>
          <div><p style={labelStyle}>CRT Scanlines</p><p style={descStyle}>Retro CRT screen effect</p></div>
          <Toggle val={crt} onChange={applyCRT} />
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div><p style={labelStyle}>Particles</p><p style={descStyle}>Background particle animation</p></div>
          <Toggle val={particles} onChange={setParticles} />
        </div>
      </div>

      {/* Terminal */}
      <div style={sectionStyle}>
        <p style={{ ...labelStyle, marginBottom: 8, color: '#ffd700' }}>⌨ Terminal</p>

        <div style={rowStyle}>
          <div><p style={labelStyle}>Font Size</p><p style={descStyle}>Terminal font size: {fontSize}px</p></div>
          <input type="range" min={10} max={18} value={fontSize}
            onChange={e => applyFontSize(Number(e.target.value))}
            style={{ width: 100 }} />
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div><p style={labelStyle}>Cursor Style</p><p style={descStyle}>Terminal cursor shape</p></div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['block', 'bar', 'underline'].map(s => (
              <button key={s} onClick={() => applyCursor(s)}
                style={{
                  padding: '2px 8px', background: cursor === s ? '#00ff4620' : 'transparent',
                  border: `1px solid ${cursor === s ? '#00ff46' : '#333'}`,
                  borderRadius: 4, color: cursor === s ? '#00ff46' : '#666',
                  fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sound */}
      <div style={sectionStyle}>
        <p style={{ ...labelStyle, marginBottom: 8, color: '#ffd700' }}>🔊 Sound</p>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div><p style={labelStyle}>Sound Effects</p><p style={descStyle}>Key clicks, window sounds</p></div>
          <Toggle val={sounds} onChange={setSounds} />
        </div>
      </div>

      {/* System */}
      <div style={sectionStyle}>
        <p style={{ ...labelStyle, marginBottom: 8, color: '#ffd700' }}>⚙ System</p>
        <div style={rowStyle}>
          <div><p style={labelStyle}>OS Version</p><p style={descStyle}>Current build</p></div>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>SlashDot OS 2026.1.0</span>
        </div>
        <div style={rowStyle}>
          <div><p style={labelStyle}>Built by</p><p style={descStyle}>Developers</p></div>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>25MS Batch</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div><p style={labelStyle}>Clear Memory</p><p style={descStyle}>Reset saved name and preferences</p></div>
          <button onClick={() => { localStorage.removeItem('slashdot-os-memory'); window.dispatchEvent(new CustomEvent('slashdot-notify', { detail: { message: 'Memory cleared!', type: 'info' } })) }}
            style={{ padding: '3px 10px', background: '#ff505015', border: '1px solid #ff505040', borderRadius: 4, color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
            Clear
          </button>
        </div>
      </div>

      {/* Save */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={saveSettings}
          style={{ flex: 1, padding: '9px', background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
          {saved ? '✓ Saved!' : '💾 Save Settings'}
        </button>
        <button onClick={resetSettings}
          style={{ padding: '9px 16px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#666', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer' }}>
          Reset
        </button>
      </div>
    </div>
  )
}