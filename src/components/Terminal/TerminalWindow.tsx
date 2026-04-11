import { useEffect, useRef, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { parseAndRun, getCompletions } from '../../commands'
import { prompt } from '../../utils/formatOutput'
import { getCwd } from '../../commands/systemCommands'
import { AppId } from '../../types'
import { playKeyClick, playEnter } from '../../utils/sounds'
import '@xterm/xterm/css/xterm.css'
import './TerminalWindow.css'

interface MobileKeyboardProps {
  onChar: (ch: string) => void
  onEnter: () => void
  onBackspace: () => void
  onHistoryUp: () => void
  onHistoryDown: () => void
}

function MobileKeyboardCapture({ onChar, onEnter, onBackspace, onHistoryUp, onHistoryDown }: MobileKeyboardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function focus() {
    inputRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const t = setTimeout(focus, 300)
    return () => clearTimeout(t)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      onEnter()
      if (inputRef.current) inputRef.current.value = ''
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      e.stopPropagation()
      onBackspace()
      if (inputRef.current) inputRef.current.value = ''
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onHistoryUp()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onHistoryDown()
    }
  }

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    const val = e.currentTarget.value
    if (!val) return
    // Send each character to xterm
    for (const ch of val) {
      if (ch === ' ') onChar(' ')
      else if (ch.length === 1) onChar(ch)
    }
    // Always reset — xterm displays the actual input
    e.currentTarget.value = ''
  }

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      background: '#0d0d0d',
      borderTop: '1px solid #222',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 8px',
      paddingBottom: 'calc(6px + env(safe-area-inset-bottom))',
    }}>
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="send"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onBlur={() => setTimeout(focus, 200)}
        placeholder=">_ tap to type"
        style={{
          flex: 1,
          padding: '9px 12px',
          background: '#111',
          border: '1px solid #333',
          borderRadius: 8,
          color: '#00ff46',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          outline: 'none',
          minHeight: 38,
          WebkitAppearance: 'none',
        }}
      />
      <button
        onTouchStart={e => e.preventDefault()}
        onTouchEnd={e => { e.preventDefault(); onHistoryUp(); setTimeout(focus, 80) }}
        onMouseDown={e => { e.preventDefault(); onHistoryUp(); setTimeout(focus, 80) }}
        style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#888', width: 38, height: 38, fontFamily: 'JetBrains Mono', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >↑</button>
      <button
        onTouchStart={e => e.preventDefault()}
        onTouchEnd={e => { e.preventDefault(); onHistoryDown(); setTimeout(focus, 80) }}
        onMouseDown={e => { e.preventDefault(); onHistoryDown(); setTimeout(focus, 80) }}
        style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#888', width: 38, height: 38, fontFamily: 'JetBrains Mono', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >↓</button>
      <button
        onTouchStart={e => e.preventDefault()}
        onTouchEnd={e => {
          e.preventDefault()
          e.stopPropagation()
          onEnter()
          if (inputRef.current) inputRef.current.value = ''
          setTimeout(focus, 80)
        }}
        onMouseDown={e => {
          e.preventDefault()
          e.stopPropagation()
          onEnter()
          if (inputRef.current) inputRef.current.value = ''
          setTimeout(focus, 80)
        }}
        style={{ background: '#00ff4620', border: '1px solid #00ff46', borderRadius: 6, color: '#00ff46', width: 44, height: 38, fontFamily: 'JetBrains Mono', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >↵</button>
    </div>
  )
}

interface Props {
  onOpenWindow: (appId: AppId, title: string) => void
  onEasterEgg: (effect: string) => void
}

// Default built-in aliases
const DEFAULT_ALIASES: Record<string, string> = {
  'll':   'ls -la',
  'cls':  'clear',
  '?':    'help',
  'gs':   'git status',
  'gl':   'git log',
  'q':    'exit',
}

export function TerminalWindow({ onOpenWindow, onEasterEgg }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const inputRef = useRef('')
  const historyRef = useRef<string[]>([])
  const histIdxRef = useRef(-1)
  const aliasesRef = useRef<Record<string, string>>({ ...DEFAULT_ALIASES })

  // Load saved aliases from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('slashdot-aliases')
      if (saved) aliasesRef.current = { ...DEFAULT_ALIASES, ...JSON.parse(saved) }
    } catch {}
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const term = new Terminal({
      theme: {
        background:  '#0a0a0a',
        foreground:  '#d0d0d0',
        cursor:      '#00ff46',
        cursorAccent:'#000',
        selectionBackground: '#00ff4630',
        black:       '#1a1a1a',
        green:       '#00ff46',
        cyan:        '#00c8ff',
        yellow:      '#ffd700',
        magenta:     '#c864ff',
        red:         '#ff5050',
        white:       '#e0e0e0',
        brightBlack: '#555',
        brightGreen: '#39ff6a',
        brightCyan:  '#40d8ff',
        brightWhite: '#ffffff',
      },
      fontFamily: "'JetBrains Mono', 'Share Tech Mono', monospace",
      fontSize: window.innerWidth < 768 ? 11 : 13,
      lineHeight: 1.5,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      convertEol: true,
    })

    const fitAddon = new FitAddon()
    const linksAddon = new WebLinksAddon()
    term.loadAddon(fitAddon)
    term.loadAddon(linksAddon)
    term.open(containerRef.current)
    fitAddon.fit()
    // On mobile, prevent xterm from grabbing focus so our input keeps it
    if (window.innerWidth < 768) {
      const xtermScreen = containerRef.current?.querySelector('.xterm-screen')
      xtermScreen?.setAttribute('tabindex', '-1')
      const xtermHelper = containerRef.current?.querySelector('textarea.xterm-helper-textarea') as HTMLTextAreaElement | null
      if (xtermHelper) {
        xtermHelper.setAttribute('tabindex', '-1')
        xtermHelper.style.opacity = '0'
        xtermHelper.style.pointerEvents = 'none'
      }
    }

    // ── Event listeners ──────────────────────────────────────────────────────

    const writeHandler = (e: Event) => {
      const { text } = (e as CustomEvent).detail
      term.write(text)
      term.write('\r\n' + prompt(getCwd()))
    }
    window.addEventListener('slashdot-terminal-write', writeHandler)

    const cursorHandler = (e: Event) => {
      const { style } = (e as CustomEvent).detail
      term.options.cursorStyle = style as 'block' | 'bar' | 'underline'
    }
    window.addEventListener('slashdot-cursor', cursorHandler)

    const fontHandler = (e: Event) => {
      const { delta } = (e as CustomEvent).detail
      const current = term.options.fontSize ?? 13
      term.options.fontSize = Math.min(20, Math.max(8, current + delta))
      fitAddon.fit()
    }
    window.addEventListener('slashdot-font', fontHandler)

    const themeHandler = (e: Event) => {
      const { name } = (e as CustomEvent).detail
      const themeColors: Record<string, string> = {
        green:  '#00ff46',
        amber:  '#ffb000',
        blue:   '#00b4ff',
        red:    '#ff5050',
        purple: '#b464ff',
      }
      const col = themeColors[name] ?? '#00ff46'
      term.options.theme = { ...term.options.theme, cursor: col, green: col }
    }
    window.addEventListener('slashdot-theme', themeHandler)

    // Listen for alias updates from the alias command
    const aliasHandler = (e: Event) => {
      const { name, cmd } = (e as CustomEvent).detail
      aliasesRef.current[name] = cmd
      try {
        localStorage.setItem('slashdot-aliases', JSON.stringify(aliasesRef.current))
      } catch {}
    }
    window.addEventListener('slashdot-alias', aliasHandler)

    termRef.current = term
    fitAddonRef.current = fitAddon

    // ── Welcome message ──────────────────────────────────────────────────────
    const welcomeLines = [
      '\r\n\x1b[38;2;0;255;70m' +
      '  ____  _           _     ____        _    \r\n' +
      ' / ___|| | __ _ ___| |__ |  _ \\  ___ | |_  \r\n' +
      ' \\___ \\| |/ _` / __| \'_ \\| | | |/ _ \\| __| \r\n' +
      '  ___) | | (_| \\__ \\ | | | |_| | (_) | |_  \r\n' +
      ' |____/|_|\\__,_|___/_| |_|____/ \\___/ \\__| \r\n' +
      '\x1b[0m',
      '\x1b[38;2;0;200;255m  SlashDot OS v2026.1 — Official SlashDot Club Website\x1b[0m',
      '\x1b[38;2;120;120;120m  IISER Kolkata  |  slashdot-iiserk.github.io\x1b[0m',
      '',
      "\x1b[38;2;255;220;0m  Type 'help' for commands  |  Ctrl+K for command palette\x1b[0m",
      "\x1b[38;2;120;120;120m  Type 'challenge' for today's coding challenge\x1b[0m",
      '',
    ]
    welcomeLines.forEach(l => term.writeln(l))
    term.write(prompt(getCwd()))

    // ── Helper: resolve aliases and run with pipe support ────────────────────
    function resolveAndRun(raw: string) {
      const trimmed = raw.trim()

      // Check alias first (exact match on the whole input or just the command)
      const [firstWord, ...restWords] = trimmed.split(/\s+/)
      const aliasedCmd = aliasesRef.current[trimmed] ?? aliasesRef.current[firstWord]
      const resolved = aliasedCmd
        ? (restWords.length > 0 && aliasesRef.current[firstWord]
            ? `${aliasesRef.current[firstWord]} ${restWords.join(' ')}`
            : aliasedCmd)
        : trimmed

      // Basic pipe: cmd1 | grep pattern
      if (resolved.includes(' | grep ')) {
        const pipeIdx = resolved.indexOf(' | grep ')
        const leftCmd = resolved.slice(0, pipeIdx).trim()
        const grepPattern = resolved.slice(pipeIdx + 8).trim()
        const result = parseAndRun(leftCmd)
        if (result.output && grepPattern) {
          const lines = result.output.split('\r\n')
          const matched = lines.filter(l => l.includes(grepPattern))
          const output = matched.length > 0
            ? matched.join('\r\n')
            : `\x1b[90m(no matches for '${grepPattern}')\x1b[0m`
          return { ...result, output }
        }
        return result
      }

      return parseAndRun(resolved)
    }

    // ── Key handler ──────────────────────────────────────────────────────────
    term.onKey(function({ key, domEvent }) {
      const code = domEvent.keyCode

      // Enter
      if (code === 13) {
        playEnter()
        const input = inputRef.current.trim()
        term.writeln('')

        if (input) {
          historyRef.current.unshift(input)
          histIdxRef.current = -1
          ;(window as any).__slashdotHistory = historyRef.current

          // Handle inline alias command without going through parseAndRun
          if (input.startsWith('alias ')) {
            const raw = input.slice(6).trim()
            const match = raw.match(/^(\w+)=["']?(.+?)["']?$/)
            if (match) {
              aliasesRef.current[match[1]] = match[2]
              try { localStorage.setItem('slashdot-aliases', JSON.stringify(aliasesRef.current)) } catch {}
              term.write(`\r\n\x1b[32m✓ Alias set: ${match[1]} = ${match[2]}\x1b[0m\r\n`)
            } else {
              // Show current aliases
              const entries = Object.entries(aliasesRef.current)
              term.write('\r\n\x1b[36mCurrent aliases:\x1b[0m\r\n')
              entries.forEach(([k, v]) => term.write(`  \x1b[33m${k}\x1b[0m = ${v}\r\n`))
              term.write('\x1b[90mUsage: alias name=\'command\'\x1b[0m\r\n')
            }
          } else {
            const result = resolveAndRun(input)
            if (result.output) term.write(result.output)
            if (result.action) {
              if (result.action.type === 'open_window') {
                onOpenWindow(result.action.appId, result.action.title)
              } else if (result.action.type === 'clear') {
                term.clear()
              } else if (result.action.type === 'easter_egg') {
                onEasterEgg(result.action.effect)
              }
            }
          }
        }

        inputRef.current = ''
        term.write(prompt(getCwd()))
        return
      }

      // Backspace
      if (code === 8) {
        if (inputRef.current.length > 0) {
          inputRef.current = inputRef.current.slice(0, -1)
          term.write('\b \b')
          playKeyClick()
        }
        return
      }

      // Arrow Up — history
      if (code === 38) {
        const newIdx = Math.min(histIdxRef.current + 1, historyRef.current.length - 1)
        if (historyRef.current[newIdx] !== undefined) {
          term.write('\r' + prompt(getCwd()) + ' '.repeat(inputRef.current.length) + '\r' + prompt(getCwd()))
          histIdxRef.current = newIdx
          inputRef.current = historyRef.current[newIdx]
          term.write(inputRef.current)
        }
        return
      }

      // Arrow Down — history
      if (code === 40) {
        const newIdx = histIdxRef.current - 1
        term.write('\r' + prompt(getCwd()) + ' '.repeat(inputRef.current.length) + '\r' + prompt(getCwd()))
        if (newIdx < 0) {
          histIdxRef.current = -1
          inputRef.current = ''
        } else {
          histIdxRef.current = newIdx
          inputRef.current = historyRef.current[newIdx]
          term.write(inputRef.current)
        }
        return
      }

      // Tab — autocomplete
      if (code === 9) {
        domEvent.preventDefault()
        const completions = getCompletions(inputRef.current)
        if (completions.length === 1) {
          const suffix = completions[0].slice(inputRef.current.length)
          inputRef.current += suffix
          term.write(suffix)
        } else if (completions.length > 1) {
          term.writeln('')
          term.writeln('\x1b[38;2;120;120;120m' + completions.join('  ') + '\x1b[0m')
          term.write(prompt(getCwd()) + inputRef.current)
        }
        return
      }

      // Ctrl+C
      if (domEvent.ctrlKey && domEvent.key === 'c') {
        term.writeln('^C')
        inputRef.current = ''
        term.write(prompt(getCwd()))
        return
      }

      // Ctrl+L — clear
      if (domEvent.ctrlKey && domEvent.key === 'l') {
        term.clear()
        term.write(prompt(getCwd()))
        inputRef.current = ''
        return
      }

      // Ctrl+R — history search
      if (domEvent.ctrlKey && domEvent.key === 'r') {
        domEvent.preventDefault()
        term.writeln('')
        term.write('\x1b[36m(reverse-search) :\x1b[0m ')
        // Simple implementation: show last 5 matching entries
        const hist = historyRef.current
        if (hist.length === 0) {
          term.writeln('\x1b[90m(no history)\x1b[0m')
          term.write(prompt(getCwd()))
          return
        }
        term.writeln('')
        term.writeln('\x1b[90mRecent commands (type ↑↓ to navigate, Tab to select):\x1b[0m')
        hist.slice(0, 8).forEach((h, i) => {
          term.writeln(`  \x1b[33m${i + 1}.\x1b[0m ${h}`)
        })
        term.writeln('\x1b[90m(Press ↑↓ to recall commands from history)\x1b[0m')
        term.write(prompt(getCwd()))
        inputRef.current = ''
        return
      }

      // Ctrl+K — command palette
      if (domEvent.ctrlKey && domEvent.key === 'k') {
        domEvent.preventDefault()
        window.dispatchEvent(new CustomEvent('slashdot-palette-open'))
        return
      }

      // Regular printable characters
      if (!domEvent.ctrlKey && !domEvent.altKey && key.length === 1) {
        inputRef.current += key
        term.write(key)
        playKeyClick()

        // Auto-suggestion ghost text
        const ALL_CMDS = [
          'help','ls','cd','cat','clear','history','neofetch','whoami','date','ping',
          'uptime','cal','tree','echo','banner','stats','reset','setname','alias','challenge',
          'man','open','weather','visits','rain','theme','cursor','font+','font-','crt',
          'wallpaper','git','vim','ssh','sudo','apt','npm','matrix','hack','nyan',
          'fortune','quote','members','top','changelog','register','clippy',
        ]
        const cur = inputRef.current
        const suggest = ALL_CMDS.find(cmd => cmd.startsWith(cur) && cmd !== cur)
        if (suggest && cur.length >= 2) {
          const ghost = suggest.slice(cur.length)
          // Write ghost text in dim color, then move cursor back
          term.write(`\x1b[90m${ghost}\x1b[0m\x1b[${ghost.length}D`)
        }
      }
    })

    const ro = new ResizeObserver(() => fitAddon.fit())
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      term.dispose()
      window.removeEventListener('slashdot-terminal-write', writeHandler)
      window.removeEventListener('slashdot-cursor', cursorHandler)
      window.removeEventListener('slashdot-font', fontHandler)
      window.removeEventListener('slashdot-theme', themeHandler)
      window.removeEventListener('slashdot-alias', aliasHandler)
    }
  }, [onOpenWindow, onEasterEgg])

  return (
    <div className="terminal-container">
      <div ref={containerRef} className="xterm-wrapper" />
      {window.innerWidth < 768 && (
        <MobileKeyboardCapture
          onChar={(ch) => {
            inputRef.current += ch
            termRef.current?.write(ch)
            playKeyClick()
          }}
          onEnter={() => {
            const term = termRef.current
            if (!term) return
            playEnter()
            const input = inputRef.current.trim()
            term.writeln('')
            if (input) {
              historyRef.current.unshift(input)
              histIdxRef.current = -1
              ;(window as any).__slashdotHistory = historyRef.current
              if (input.startsWith('alias ')) {
                const raw = input.slice(6).trim()
                const match = raw.match(/^(\w+)=["']?(.+?)["']?$/)
                if (match) {
                  aliasesRef.current[match[1]] = match[2]
                  try { localStorage.setItem('slashdot-aliases', JSON.stringify(aliasesRef.current)) } catch {}
                  term.write(`\r\n\x1b[32m✓ Alias set: ${match[1]} = ${match[2]}\x1b[0m\r\n`)
                } else {
                  const entries = Object.entries(aliasesRef.current)
                  term.write('\r\n\x1b[36mCurrent aliases:\x1b[0m\r\n')
                  entries.forEach(([k, v]) => term.write(`  \x1b[33m${k}\x1b[0m = ${v}\r\n`))
                  term.write('\x1b[90mUsage: alias name=\'command\'\x1b[0m\r\n')
                }
              } else {
                const result = parseAndRun(input)
                if (result.output) term.write(result.output)
                if (result.action) {
                  if (result.action.type === 'open_window') onOpenWindow(result.action.appId, result.action.title)
                  else if (result.action.type === 'clear') term.clear()
                  else if (result.action.type === 'easter_egg') onEasterEgg(result.action.effect)
                }
              }
            }
            inputRef.current = ''
            term.write(prompt(getCwd()))
          }}
          onBackspace={() => {
            if (inputRef.current.length > 0) {
              inputRef.current = inputRef.current.slice(0, -1)
              termRef.current?.write('\b \b')
            }
          }}
          onHistoryUp={() => {
            const term = termRef.current
            if (!term) return
            const newIdx = Math.min(histIdxRef.current + 1, historyRef.current.length - 1)
            if (historyRef.current[newIdx] !== undefined) {
              term.write('\r' + prompt(getCwd()) + ' '.repeat(inputRef.current.length) + '\r' + prompt(getCwd()))
              histIdxRef.current = newIdx
              inputRef.current = historyRef.current[newIdx]
              term.write(inputRef.current)
            }
          }}
          onHistoryDown={() => {
            const term = termRef.current
            if (!term) return
            const newIdx = histIdxRef.current - 1
            term.write('\r' + prompt(getCwd()) + ' '.repeat(inputRef.current.length) + '\r' + prompt(getCwd()))
            if (newIdx < 0) {
              histIdxRef.current = -1
              inputRef.current = ''
            } else {
              histIdxRef.current = newIdx
              inputRef.current = historyRef.current[newIdx]
              term.write(inputRef.current)
            }
          }}
        />
      )}
    </div>
  )
}