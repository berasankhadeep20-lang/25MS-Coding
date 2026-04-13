import { useEffect, useRef, useState } from 'react'

const COLS = 24
const ROWS = 20
const CELL = 20

type Dir = 'up' | 'down' | 'left' | 'right'
type Pos = { x: number; y: number }

function randomFood(snake: Pos[]): Pos {
  let pos: Pos
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

export function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    snake: [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }] as Pos[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: { x: 18, y: 10 } as Pos,
    score: 0,
    best: 0,
    dead: false,
    started: false,
    frame: 0,
  })
  const frameRef = useRef<number>(0)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [display, setDisplay] = useState({ score: 0, best: 0, dead: false, started: false })
  const [speed, setSpeed] = useState(150)

  function reset() {
    const s = stateRef.current
    s.snake = [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }]
    s.dir = 'right'
    s.nextDir = 'right'
    s.food = randomFood(s.snake)
    s.score = 0
    s.dead = false
    s.started = true
    s.frame = 0
    setDisplay(d => ({ ...d, score: 0, dead: false, started: true }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current
      const map: Record<string, Dir> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
      }
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
      const newDir = map[e.key]
      if (!newDir) {
        if (e.key === 'Enter') { if (!s.started || s.dead) reset() }
        return
      }
      const opposites: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' }
      if (newDir !== opposites[s.dir]) s.nextDir = newDir
      if (!s.started) { s.started = true; setDisplay(d => ({ ...d, started: true })) }
    }
    window.addEventListener('keydown', onKey)
    // ── Mobile swipe ──────────────────────────────────────────────────────────
    let touchStartX = 0
    let touchStartY = 0

    function onTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - touchStartX
      const dy = e.changedTouches[0].clientY - touchStartY
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      if (Math.max(absDx, absDy) < 20) return
      if (absDx > absDy) {
        // horizontal
        if (dx > 0) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
        else         window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
      } else {
        // vertical
        if (dy > 0) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
        else         window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })

    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend',   onTouchEnd)

    function tick() {
      const s = stateRef.current
      if (!s.started || s.dead) return
      s.dir = s.nextDir
      const head = s.snake[0]
      const newHead: Pos = {
        up:    { x: head.x, y: head.y - 1 },
        down:  { x: head.x, y: head.y + 1 },
        left:  { x: head.x - 1, y: head.y },
        right: { x: head.x + 1, y: head.y },
      }[s.dir]

      if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS ||
          s.snake.some(p => p.x === newHead.x && p.y === newHead.y)) {
        s.dead = true
        if (s.score > s.best) s.best = s.score
        setDisplay(d => ({ ...d, dead: true, best: s.best }))
        return
      }

      s.snake.unshift(newHead)
      if (newHead.x === s.food.x && newHead.y === s.food.y) {
        s.score++
        s.food = randomFood(s.snake)
        setDisplay(d => ({ ...d, score: s.score }))
      } else {
        s.snake.pop()
      }
    }

    tickRef.current = setInterval(tick, speed)

    function draw() {
      const s = stateRef.current
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas!.width, canvas!.height)

      ctx.strokeStyle = '#111'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke() }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke() }

      if (!s.started) {
        ctx.fillStyle = '#00ff46'
        ctx.font = 'bold 20px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText('SNAKE', COLS * CELL / 2, ROWS * CELL / 2 - 20)
        ctx.fillStyle = '#aaa'
        ctx.font = '12px JetBrains Mono'
        ctx.fillText('Press arrow keys or WASD to start', COLS * CELL / 2, ROWS * CELL / 2 + 8)
        ctx.fillText('Press Enter to restart', COLS * CELL / 2, ROWS * CELL / 2 + 28)
      }

      if (s.dead) {
        ctx.fillStyle = 'rgba(0,0,0,0.65)'
        ctx.fillRect(0, 0, canvas!.width, canvas!.height)
        ctx.fillStyle = '#ff5050'
        ctx.font = 'bold 22px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', COLS * CELL / 2, ROWS * CELL / 2 - 16)
        ctx.fillStyle = '#ffd700'
        ctx.font = '13px JetBrains Mono'
        ctx.fillText(`Score: ${s.score}   Best: ${s.best}`, COLS * CELL / 2, ROWS * CELL / 2 + 12)
        ctx.fillStyle = '#aaa'
        ctx.font = '11px JetBrains Mono'
        ctx.fillText('Press Enter to restart', COLS * CELL / 2, ROWS * CELL / 2 + 36)
        frameRef.current = requestAnimationFrame(draw)
        return
      }

      // Food
      ctx.fillStyle = '#ff5050'
      ctx.shadowColor = '#ff5050'
      ctx.shadowBlur = 8
      ctx.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4)
      ctx.shadowBlur = 0

      // Snake
      s.snake.forEach((p, i) => {
        const isHead = i === 0
        ctx.fillStyle = isHead ? '#ffd700' : '#00ff46'
        ctx.shadowColor = isHead ? '#ffd700' : '#00ff46'
        ctx.shadowBlur = isHead ? 8 : 3
        ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2)
        ctx.shadowBlur = 0
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(frameRef.current)
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [speed])

  return (
    <div style={{ background: '#0a0a0a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700 }}>🐍 Snake</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: '#ffd700', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Score: {display.score}</span>
          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 12 }}>Best: {display.best}</span>
          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>Speed:</span>
          <input type="range" min={80} max={300} step={10} value={speed}
            onChange={e => { if (tickRef.current) clearInterval(tickRef.current); setSpeed(Number(e.target.value)) }}
            style={{ width: 70 }} />
        </div>
      </div>
      <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} style={{ flex: 1, width: '100%' }} tabIndex={0} />
      <div style={{ padding: '4px 16px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#333' }}>
        Arrow keys / WASD to move • Enter to restart
      </div>
    </div>
  )
}

{window.innerWidth < 768 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', background: '#0a0a0a', flexShrink: 0 }}>
          <button
            onTouchStart={e => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })) }}
            style={{ width: 54, height: 54, background: '#111', border: '1px solid #333', borderRadius: 10, color: '#00ff46', fontSize: 22, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>▲</button>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onTouchStart={e => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })) }}
              style={{ width: 54, height: 54, background: '#111', border: '1px solid #333', borderRadius: 10, color: '#00ff46', fontSize: 22, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>◀</button>
            <div style={{ width: 54, height: 54, background: '#0d0d0d', border: '1px solid #222', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>🐍</div>
            <button
              onTouchStart={e => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })) }}
              style={{ width: 54, height: 54, background: '#111', border: '1px solid #333', borderRadius: 10, color: '#00ff46', fontSize: 22, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>▶</button>
          </div>
          <button
            onTouchStart={e => { e.preventDefault(); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })) }}
            style={{ width: 54, height: 54, background: '#111', border: '1px solid #333', borderRadius: 10, color: '#00ff46', fontSize: 22, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>▼</button>
        </div>
      )}